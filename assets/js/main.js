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

      // Initialize logo transformation FIRST - prioritize logo appearance
      this.initLogoTransformation();
      
      // Initialize all components
      await this.initializeComponents();
      
      // Set up global event listeners
      this.setupGlobalListeners();
      
      // Initialize sliding background effect
      this.initSlidingBackground();
      
      // Initialize scroll indicator
      this.initScrollIndicator();
      
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
   * Initialize sliding background effect for hero section
   */
  initSlidingBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const maxScroll = heroHeight;
      
      // Calculate the background position based on scroll
      // Start at top (0%) and move down as user scrolls
      const backgroundPosition = Math.min(scrollY / maxScroll * 50, 50);
      
      // Apply the sliding effect (maintain left alignment)
      hero.style.backgroundPosition = `left ${backgroundPosition}%`;
    };

    // Initial call
    handleScroll();
    
    // Add scroll listener with throttling
    window.addEventListener('scroll', () => {
      if (window.PolarFlowsUtils && window.PolarFlowsUtils.throttle) {
        window.PolarFlowsUtils.throttle(handleScroll, 16);
      } else {
        // Fallback if utils not available
        handleScroll();
      }
    });
  }

  /**
   * Initialize scroll indicator functionality
   */
  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    // Make scroll indicator clickable
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('#about');
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    // Hide scroll indicator when user starts scrolling
    let hasScrolled = false;
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        hasScrolled = true;
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        scrollIndicator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      } else if (window.scrollY <= 50 && hasScrolled) {
        hasScrolled = false;
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', () => {
      if (window.PolarFlowsUtils && window.PolarFlowsUtils.throttle) {
        window.PolarFlowsUtils.throttle(handleScroll, 16);
      } else {
        handleScroll();
      }
    });
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

  /**
   * Initialize logo transformation effect
   */
  initLogoTransformation() {
    console.log('Initializing logo transformation...');
    
    // Only apply to main page
    if (!document.body.classList.contains('home-page')) {
      console.log('Not home page, skipping logo transformation');
      return;
    }

    const transitionLogo = document.querySelector('.transition-logo');
    const navbarLogo = document.querySelector('.navbar-logo');
    const navbarBrand = document.querySelector('.navbar-brand');
    
    console.log('Transition logo found:', !!transitionLogo);
    console.log('Navbar logo found:', !!navbarLogo);
    console.log('Navbar brand found:', !!navbarBrand);
    
    if (!transitionLogo || !navbarLogo || !navbarBrand) {
      console.log('Missing logo elements, skipping transformation');
      return;
    }

    // Get navbar logo dimensions and position dynamically
    const getNavbarLogoPosition = () => {
      const navbarRect = navbarBrand.getBoundingClientRect();
      const navbarHeight = navbarRect.height;
      const navbarTop = navbarRect.top + (navbarHeight / 2); // Center vertically
      const navbarLeft = navbarRect.left + (navbarRect.width / 2); // Center horizontally
      
      return {
        top: navbarTop,
        left: navbarLeft,
        height: navbarHeight,
        width: navbarRect.width
      };
    };

    // Get hero logo initial position (convert to pixels)
    const getHeroLogoPosition = () => {
      const viewportWidth = window.innerWidth;
      
      // Get the actual hero section dimensions
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) {
        // Fallback if hero section not found - use same logic as hero section
        const navbarHeight = 70; // Fixed navbar height from CSS
        const navbarBottom = navbarHeight + 50; // 50px padding below navbar
        const cssHeroSectionHeight = 800; // CSS min-height: 800px
        const textTop = cssHeroSectionHeight * 0.6; // Text is around 60% down in hero section
        const textTopWithPadding = textTop - 100; // 100px padding above text
        
        const safeAreaTop = navbarBottom;
        const safeAreaBottom = textTopWithPadding;
        const safeAreaHeight = safeAreaBottom - safeAreaTop;
        
        const logoPositionInSafeArea = 0.75; // 75% down in the safe area
        const safeTop = safeAreaTop + (safeAreaHeight * logoPositionInSafeArea);
        
        return {
          top: safeTop, // Same positioning logic as hero section
          left: viewportWidth * 0.5,
          size: 100
        };
      }
      
      // Use CSS-defined height instead of actual rendered height for consistent positioning
      const cssHeroSectionHeight = 800; // CSS min-height: 800px
      
      // Calculate hero section position once and use fixed offset (consistent positioning)
      const heroSectionTop = heroSection.offsetTop; // Use offsetTop instead of getBoundingClientRect
      
      // Get navbar height to ensure no overlap
      const navbarHeight = 70; // Fixed navbar height from CSS
      
      // Calculate safe area: below navbar + padding, above text + padding
      const navbarBottom = navbarHeight + 50; // 50px padding below navbar
      const textTop = heroSectionTop + (cssHeroSectionHeight * 0.6); // Text is around 60% down in hero section
      const textTopWithPadding = textTop - 100; // 100px padding above text
      
      // Calculate the middle of the safe area (between navbar and text)
      const safeAreaTop = navbarBottom;
      const safeAreaBottom = textTopWithPadding;
      const safeAreaHeight = safeAreaBottom - safeAreaTop;
      
      // Position logo in the bottom part of the safe area (75% down in safe area)
      const logoPositionInSafeArea = 0.75; // 75% down in the safe area
      const safeTop = safeAreaTop + (safeAreaHeight * logoPositionInSafeArea);
      
      console.log(`Dynamic positioning: Hero height: ${heroSectionHeight}px, Navbar bottom: ${navbarBottom}px, Text top: ${textTopWithPadding}px, Safe area: ${safeAreaHeight}px, Logo position: ${safeTop}px`);
      
      return {
        top: safeTop, // Positioned in bottom part of safe area
        left: viewportWidth * 0.5, // 50% from left in pixels
        size: 100 // 100% width
      };
    };

    // Calculate the total height (hero section + navbar)
    const navbarHeight = 70; // Fixed navbar height from CSS
    const heroSectionHeight = window.innerHeight;
    const totalHeight = heroSectionHeight + navbarHeight;
    
    // Dynamic maxScroll - calculate based on viewport dimensions
    // Animation completes when user scrolls a percentage of the viewport height, minus a small amount
    const viewportHeight = window.innerHeight;
    const earlyFinishPx = 10; // Finish 10px sooner (a bit sooner)
    // Calculate proportional maxScroll: 350px at your resolution, scaled to current viewport
    const maxScrollBase = 350; // Your desired maxScroll at your resolution (reduced from 500)
    const maxScroll = (maxScrollBase * (viewportHeight / 800)) - earlyFinishPx; // Proportional to viewport heightI
    let isTransforming = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / maxScroll, 1); // 0 to 1
      
      if (scrollY > 0 && !isTransforming) {
        console.log('Starting transformation');
        isTransforming = true;
        navbarLogo.style.opacity = '0';
        navbarLogo.style.visibility = 'hidden';
      } else if (scrollY <= 0 && isTransforming) {
        console.log('Stopping transformation');
        isTransforming = false;
        navbarLogo.style.opacity = '0';
        navbarLogo.style.visibility = 'hidden';
      }
      
      // Get current positions dynamically
      const navbarPos = getNavbarLogoPosition();
      
      // Get the CSS-defined initial position (15% from top, 50% from left)
      const viewportWidth = window.innerWidth;
      
      // Use CSS initial position (15% from top, 50% from left) for progress = 0, moved down by half logo height
      const heroSection = document.querySelector('.hero-section');
      const heroSectionHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      const logoHeight = transitionLogo ? transitionLogo.offsetHeight : 0;
      const cssHeroTop = (heroSectionHeight * 0.15) + (logoHeight / 2); // CSS: top: 15% + half logo height
      const cssHeroLeft = viewportWidth * 0.5; // CSS: left: 50%
      
      // Use linear progress for both position and size (smoother overall animation)
      const positionProgress = scrollProgress;
      const sizeProgress = scrollProgress;
      
      // Interpolate between CSS hero position and navbar positions with linear movement
      // Start at navbar bottom + padding, end at navbar logo center
      const currentTop = cssHeroTop + (navbarPos.top - cssHeroTop) * positionProgress;
      const currentLeft = cssHeroLeft + (navbarPos.left - cssHeroLeft) * positionProgress;
      
      // Apply the calculated values
      transitionLogo.style.top = `${currentTop}px`;
      transitionLogo.style.left = `${currentLeft}px`;
      transitionLogo.style.transform = 'translate(-50%, -50%)';
      
      // Calculate size based on linear scroll progress - smooth reduction from big to small
      // Start from the same size as CSS (100% with max-width constraint)
      const maxWidthPx = Math.min(600, viewportWidth * 0.7); // Same as CSS: min(600px, 70vw)
      const heroSize = (maxWidthPx / viewportWidth) * 100; // Convert to percentage
      
      const navbarSize = navbarPos.height; // Final navbar height
      const navbarWidth = navbarPos.width; // Final navbar width
      
      // Calculate maximum safe size that fits in navbar with padding
      const navbarPadding = 20; // 10px padding on each side
      const maxSafeWidth = navbarWidth - navbarPadding; // Available width minus padding
      const maxSafeWidthPercent = (maxSafeWidth / window.innerWidth) * 100; // Convert to percentage
      
      // Use the smaller of: calculated size or maximum safe size
      const calculatedSize = Math.max((navbarSize / window.innerWidth) * 100 * 2.0, 8); // Minimum 8%
      const finalWidthPercent = Math.min(calculatedSize, maxSafeWidthPercent); // Ensure it fits with padding
      
      // Size decreases linearly from start, reaches final size by progress = 0.7
      // Simple linear scaling: starts immediately, reaches final at 0.7
      const adjustedProgress = Math.min(sizeProgress / 0.7, 1); // Linear scaling to reach 1 at 0.7
      const smoothSize = heroSize - (heroSize - finalWidthPercent) * adjustedProgress;
      
      // Ensure minimum size and apply
      const finalSize = Math.max(smoothSize, 2);
      
      // Log the size information with CSS debugging
      console.log(`Scroll: ${scrollY}px, Progress: ${scrollProgress.toFixed(2)}, MaxScroll: ${maxScroll}px, Size: ${finalSize.toFixed(1)}%`);
      
      // Apply size with more specific CSS overrides
      transitionLogo.style.width = `${finalSize}%`;
      transitionLogo.style.height = 'auto';
      transitionLogo.style.maxWidth = 'none'; // Remove max-width constraint
      transitionLogo.style.minWidth = 'auto'; // Remove min-width constraint
      transitionLogo.style.flexShrink = '0'; // Prevent flex shrinking
      transitionLogo.style.flexGrow = '0'; // Prevent flex growing
    };

    // Use throttled version if available, otherwise use regular
    const throttledHandleScroll = window.PolarFlowsUtils?.throttle ? 
      window.PolarFlowsUtils.throttle(handleScroll, 16) : handleScroll;

    // Add multiple scroll event listeners to ensure we catch all scroll events
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    document.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Also add a direct scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add resize listener to recalculate positions when window is resized
    const handleResize = window.PolarFlowsUtils?.throttle ? 
      window.PolarFlowsUtils.throttle(() => {
        console.log('Window resized - following correct sequence');
        
        // Step 1: Scroll up to reset animation state
        window.scrollTo(0, 0);
        console.log('Step 1: Scrolled to top');
        
        // Step 2: Reset animation to original position immediately
        if (transitionLogo) {
          // Reset to original hero position and size
          transitionLogo.style.top = '15%';
          transitionLogo.style.left = '50%';
          transitionLogo.style.transform = 'translate(-50%, -50%)';
          transitionLogo.style.width = '100%';
          transitionLogo.style.maxWidth = 'min(600px, 70vw)';
          transitionLogo.style.minWidth = '200px';
          transitionLogo.style.height = 'auto';
          transitionLogo.style.opacity = '0.95';
          console.log('Step 2: Reset animation to original position');
        }
        
        // Step 3: Recalculate positions and display
        setTimeout(() => {
          // Recalculate max scroll dynamically based on new viewport dimensions
          const newViewportHeight = window.innerHeight;
          const newMaxScroll = (maxScrollBase * (newViewportHeight / 800)) - earlyFinishPx;
          console.log(`New viewport height: ${newViewportHeight}px, New max scroll: ${newMaxScroll}px`);
          
          // Recalculate all positions with new dimensions
          const newNavbarPos = getNavbarLogoPosition();
          const newHeroPos = getHeroLogoPosition();
          
          console.log(`New hero position: top=${newHeroPos.top}px, left=${newHeroPos.left}px`);
          console.log(`New navbar position: top=${newNavbarPos.top}px, left=${newNavbarPos.left}px`);
          
          // Apply new calculated positions
          if (transitionLogo) {
            transitionLogo.style.top = `${newHeroPos.top}px`;
            transitionLogo.style.left = `${newHeroPos.left}px`;
            console.log('Step 3: Applied new calculated positions');
          }
          
          console.log('Resize complete - all steps executed in correct order');
        }, 100);
        
      }, 100) : () => {
        console.log('Window resized - following correct sequence');
        // Step 1: Scroll up
        window.scrollTo(0, 0);
        // Step 2: Reset animation
        if (transitionLogo) {
          transitionLogo.style.top = '15%';
          transitionLogo.style.left = '50%';
          transitionLogo.style.transform = 'translate(-50%, -50%)';
        }
        // Step 3: Recalculate and display
        setTimeout(() => setInitialPosition(), 100);
      };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Set initial position based on current scroll position
    const setInitialPosition = () => {
      const currentScrollY = window.scrollY;
      const currentScrollProgress = Math.min(currentScrollY / maxScroll, 1);
      
      console.log(`Initial scroll: ${currentScrollY}px, Progress: ${currentScrollProgress.toFixed(2)}`);
      
      if (currentScrollProgress > 0) {
        // Page was refreshed while scrolled - hide navbar logo and position transition logo
        navbarLogo.style.opacity = '0';
        navbarLogo.style.visibility = 'hidden';
        isTransforming = true;
        
        // Get current positions and apply them immediately
        const heroPos = getHeroLogoPosition();
        const navbarPos = getNavbarLogoPosition();
        
        // Use linear progress for both position and size
        const positionProgress = currentScrollProgress;
        const sizeProgress = currentScrollProgress;
        
        // Calculate and apply position
        const currentTop = heroPos.top + (navbarPos.top - heroPos.top) * positionProgress;
        const currentLeft = heroPos.left + (navbarPos.left - heroPos.left) * positionProgress;
        
        transitionLogo.style.top = `${currentTop}px`;
        transitionLogo.style.left = `${currentLeft}px`;
        transitionLogo.style.transform = 'translate(-50%, -50%)';
        
        // Calculate and apply size
        // Start from the same size as CSS (100% with max-width constraint)
        const viewportWidth = window.innerWidth;
        const maxWidthPx = Math.min(600, viewportWidth * 0.7); // Same as CSS: min(600px, 70vw)
        const heroSize = (maxWidthPx / viewportWidth) * 100; // Convert to percentage
        
        const navbarSize = navbarPos.height; // Final navbar height
        const navbarWidth = navbarPos.width; // Final navbar width
        
        // Calculate maximum safe size that fits in navbar with padding
        const navbarPadding = 20; // 10px padding on each side
        const maxSafeWidth = navbarWidth - navbarPadding; // Available width minus padding
        const maxSafeWidthPercent = (maxSafeWidth / window.innerWidth) * 100; // Convert to percentage
        
        // Use the smaller of: calculated size or maximum safe size
        const calculatedSize = Math.max((navbarSize / window.innerWidth) * 100 * 2.0, 8); // Minimum 8%
        const finalWidthPercent = Math.min(calculatedSize, maxSafeWidthPercent); // Ensure it fits with padding
        
        // Size decreases linearly from start, reaches final size by progress = 0.7
        // Simple linear scaling: starts immediately, reaches final at 0.7
        const adjustedProgress = Math.min(sizeProgress / 0.7, 1); // Linear scaling to reach 1 at 0.7
        const smoothSize = heroSize - (heroSize - finalWidthPercent) * adjustedProgress;
        
        // Ensure minimum size and apply
        const finalSize = Math.max(smoothSize, 2);
        
        // Apply size with more specific CSS overrides
        transitionLogo.style.width = `${finalSize}%`;
        transitionLogo.style.height = 'auto';
        transitionLogo.style.maxWidth = 'none'; // Remove max-width constraint
        transitionLogo.style.minWidth = 'auto'; // Remove min-width constraint
        transitionLogo.style.flexShrink = '0'; // Prevent flex shrinking
        transitionLogo.style.flexGrow = '0'; // Prevent flex growing
        
        console.log('Initial position set based on scroll position');
      } else {
        // Page loaded at top - let CSS handle the initial position
        // Don't override the CSS position, just make it visible
        console.log('Page loaded at top - using CSS initial position');
      }
      
      // Always show the logo after position is calculated
      transitionLogo.style.opacity = '0.95';
    };
    
    // Set initial position immediately - prioritize logo appearance
    setInitialPosition();
    
    console.log('Logo transformation initialized successfully');
    console.log(`Hero height: ${heroSectionHeight}px, Navbar height: ${navbarHeight}px, Total height: ${totalHeight}px, Max scroll: ${maxScroll}px`);
    
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
