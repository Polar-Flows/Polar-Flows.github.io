/**
 * Main JavaScript Entry Point - Polar Flows
 * Initializes all components and handles global functionality
 */

import { initNavigation } from './components/Navigation.js';
import { initTestimonials } from './components/Testimonials.js';
import { initForms } from './components/Forms.js';
import { initAnimations } from './components/Animations.js';
import { initUtils } from './components/Utils.js';
import './scroll-animations.js';

/**
 * Main application class
 */
class PolarFlowsApp {
  constructor() {
    this.components = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize all components
      await this.initializeComponents();
      
      // Set up global event listeners
      this.setupGlobalListeners();
      
             // Team section is now handled directly in HTML
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Dispatch ready event
      this.dispatchEvent('app:ready');
      
      console.log('Polar Flows website initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Polar Flows website:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Initialize all components
   */
  async initializeComponents() {
    const componentInitializers = [
      { name: 'navigation', init: initNavigation },
      { name: 'testimonials', init: initTestimonials },
      { name: 'forms', init: initForms },
      { name: 'animations', init: initAnimations },
      { name: 'utils', init: initUtils }
    ];

    for (const { name, init } of componentInitializers) {
      try {
        const component = await init();
        this.components.set(name, component);
        console.log(`Component "${name}" initialized`);
      } catch (error) {
        console.error(`Failed to initialize component "${name}":`, error);
        // Continue with other components
      }
    }
  }

  /**
   * Set up global event listeners
   */
  setupGlobalListeners() {
    // Handle scroll events for navbar
    this.setupScrollHandling();
    
    // Handle back to top button
    this.setupBackToTop();
    
    // Handle keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    // Handle page visibility changes
    this.setupPageVisibility();
    
    // Handle resize events
    this.setupResizeHandling();
  }

  /**
   * Set up scroll handling for navbar and animations
   */
  setupScrollHandling() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScrollUpdate();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Handle scroll updates
   */
  handleScrollUpdate() {
    const scrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    // Update navbar appearance
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('nav--scrolled');
      } else {
        navbar.classList.remove('nav--scrolled');
      }
    }

    // Update back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Trigger scroll events for components
    this.dispatchEvent('app:scroll', { scrollY });
  }

  /**
   * Set up back to top functionality
   */
  setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToTop();
      });
    }
  }

  /**
   * Scroll to top of page
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Set up keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape key to close mobile menu
      if (e.key === 'Escape') {
        this.dispatchEvent('app:escape');
      }
      
      // Ctrl/Cmd + K to focus search (if implemented)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.dispatchEvent('app:search');
      }
    });
  }

  /**
   * Set up page visibility handling
   */
  setupPageVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.dispatchEvent('app:pagehidden');
      } else {
        this.dispatchEvent('app:pagevisible');
      }
    });
  }

  /**
   * Set up resize handling
   */
  setupResizeHandling() {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.dispatchEvent('app:resize', {
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
  }

  

  /**
   * Dispatch custom events
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    
    document.dispatchEvent(event);
  }

  /**
   * Get a component by name
   */
  getComponent(name) {
    return this.components.get(name);
  }

  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    // Show user-friendly error message
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = `
      <div class="error-message">
        <h3>Something went wrong</h3>
        <p>We're experiencing technical difficulties. Please refresh the page or try again later.</p>
        <button onclick="location.reload()">Refresh Page</button>
      </div>
    `;
    
    errorContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: white;
      text-align: center;
      padding: 20px;
    `;
    
    document.body.appendChild(errorContainer);
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Clean up components
    for (const [name, component] of this.components) {
      if (component && typeof component.destroy === 'function') {
        try {
          component.destroy();
        } catch (error) {
          console.error(`Error destroying component "${name}":`, error);
        }
      }
    }
    
    this.components.clear();
    this.isInitialized = false;
    
    console.log('Polar Flows website destroyed');
  }
}

/**
 * Performance monitoring
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  /**
   * Measure page load performance
   */
  measurePageLoad() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.pageLoad = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          total: navigation.loadEventEnd - navigation.navigationStart
        };
        
        console.log('Page load metrics:', this.metrics.pageLoad);
      }
    }
  }

  /**
   * Measure component initialization time
   */
  measureComponentInit(componentName, startTime) {
    const duration = performance.now() - startTime;
    this.metrics[componentName] = duration;
    
    if (duration > 100) {
      console.warn(`Component "${componentName}" took ${duration.toFixed(2)}ms to initialize`);
    }
  }
}

// Create global app instance
window.PolarFlowsApp = new PolarFlowsApp();

// Create performance monitor
window.PerformanceMonitor = new PerformanceMonitor();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.PolarFlowsApp.init();
  });
} else {
  window.PolarFlowsApp.init();
}

// Measure page load performance
window.addEventListener('load', () => {
  window.PerformanceMonitor.measurePageLoad();
});

// Export for module usage
export default window.PolarFlowsApp;
