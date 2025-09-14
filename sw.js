/**
 * Service Worker for Polar Flows Website
 * Provides offline functionality and performance improvements
 */

// Import constants (Note: Service workers can't use ES6 imports, so we'll define them here)
const CACHE_VERSION = 'v1.0.34';
const STATIC_CACHE_NAME = 'polar-flows-static-v1.0.34';
const DYNAMIC_CACHE_NAME = 'polar-flows-dynamic-v1.0.34';

// Files to cache immediately (critical resources)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/contact/',
  '/contact/index.html',
  '/privacy-policy/',
  '/privacy-policy/index.html',
  '/assets/css/main.css',
  '/assets/css/tokens.css',
  '/assets/js/main.js',
  '/assets/js/scroll-animations.js',
  '/assets/js/components/Navigation.js',
  '/assets/js/components/Forms.js',
  '/assets/js/components/Animations.js',
  '/assets/js/components/Testimonials.js',
  '/assets/js/components/Utils.js',
  '/assets/img/polarflows/logo_v2_full_white.png',
  '/assets/img/polarflows/Polarflows-logo.png',
  '/assets/img/polarflows/Polarflows-logo-favicon.png',
  '/assets/img/og-image.jpg',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old caches that don't match current version
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (only cache our own domain)
  if (url.origin !== location.origin) {
    return;
  }
  
  // Skip requests to Azure Logic App (contact form)
  if (url.hostname.includes('logic.azure.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        console.log('Service Worker: Fetching from network', request.url);
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response (streams can only be read once)
            const responseToCache = response.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.log('Service Worker: Network request failed', request.url, error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Return a fallback for other requests
            throw error;
          });
      })
  );
});

// Handle background sync (for future use)
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(
      // Handle offline form submissions here if needed
      console.log('Service Worker: Handling contact form sync')
    );
  }
});

// Handle push notifications (for future use)
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Polar Flows',
    icon: '/assets/img/polarflows/Polarflows-logo-favicon.png',
    badge: '/assets/img/polarflows/Polarflows-logo-favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Visit Website',
        icon: '/assets/img/polarflows/Polarflows-logo-favicon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/img/polarflows/Polarflows-logo-favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Polar Flows', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Service Worker: Script loaded successfully');
