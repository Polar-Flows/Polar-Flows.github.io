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
        // Clear cached logo properties on resize since dimensions may have changed
        if (window.clearFinalLogoProperties) {
          window.clearFinalLogoProperties();
        }
        
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
   * Global function to get consistent logo dimensions and position
   * Used by: final logo position, fake logo, and small logo on non-home pages
   */
  getFinalLogoProperties() {
    const realNavbarLogo = document.querySelector('.navbar-logo');
    if (!realNavbarLogo) {
      return {
        top: 12.5,
        left: 16,
        height: 55,
        width: 202.797,
        opacity: 1
      };
    }

    // Temporarily make the real logo visible to get accurate dimensions
    const originalOpacity = realNavbarLogo.style.opacity;
    const originalVisibility = realNavbarLogo.style.visibility;
    realNavbarLogo.style.opacity = '1';
    realNavbarLogo.style.visibility = 'visible';
    
    // Force a reflow to ensure dimensions are calculated
    realNavbarLogo.offsetHeight;
    
    const computedStyle = window.getComputedStyle(realNavbarLogo);
    const rect = realNavbarLogo.getBoundingClientRect();
    
    // Get the actual image dimensions (excluding padding)
    const paddingTop = parseInt(computedStyle.paddingTop) || 10;
    const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
    
    // Calculate final properties
    const imageHeight = rect.height - paddingTop - paddingBottom; // Image height only
    const imageWidth = rect.width; // Use exact width to match aspect ratio
    const finalTop = rect.top + paddingTop; // Visual top position
    const finalLeft = rect.left;
    const finalOpacity = parseFloat(computedStyle.opacity) || 1;
    
    // Restore original visibility
    realNavbarLogo.style.opacity = originalOpacity;
    realNavbarLogo.style.visibility = originalVisibility;
    
    return {
      top: finalTop,
      left: finalLeft,
      height: imageHeight,
      width: imageWidth,
      opacity: finalOpacity
    };
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
    
    // Store the final logo properties (when progress = 1.00)
    let finalLogoProperties = null;
    
    // Make finalLogoProperties accessible to createTempLogo
    window.finalLogoProperties = finalLogoProperties;
    
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
    // Animation finishes much faster for smaller window heights - ultra-aggressive scaling (2x faster)
    // For 800px+ window height use 45%, for smaller windows use much less (down to 5% for very small)
    const dynamicPercentage = Math.max(0.05, 0.45 - (Math.max(0, 800 - viewportHeight) * 0.004));
    const maxScroll = (heroSectionHeight * dynamicPercentage) - earlyFinishPx;
    let isTransforming = false;

    this.handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate maxScroll dynamically to respond to window size changes
      const currentViewportHeight = window.innerHeight;
      const currentHeroSection = document.querySelector('.hero-section');
      const currentHeroSectionHeight = currentHeroSection ? currentHeroSection.offsetHeight : window.innerHeight;
      const currentDynamicPercentage = Math.max(0.05, 0.45 - (Math.max(0, 800 - currentViewportHeight) * 0.004));
      const currentMaxScroll = (currentHeroSectionHeight * currentDynamicPercentage) - earlyFinishPx;
      
      const scrollProgress = Math.min(scrollY / currentMaxScroll, 1); // 0 to 1
      
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
      // Use global function for final position to ensure consistency
      const globalLogoProps = window.getFinalLogoProperties();
      const currentTop = cssHeroTop + (globalLogoProps.top - cssHeroTop) * positionProgress;
      const currentLeft = cssHeroLeft + (globalLogoProps.left - cssHeroLeft) * positionProgress;
      
      // Apply the calculated values
      transitionLogo.style.top = `${currentTop}px`;
      transitionLogo.style.left = `${currentLeft}px`;
      transitionLogo.style.transform = 'translate(-50%, -50%)';
      
      // Calculate size based on linear scroll progress - smooth reduction from big to small
      // Start from the same size as CSS (100% with max-width constraint)
      const maxWidthPx = Math.min(600, viewportWidth * 0.7); // Same as CSS: min(600px, 70vw)
      const heroSize = (maxWidthPx / viewportWidth) * 100; // Convert to percentage
      
      // Use the same global function result for consistent final dimensions
      const navbarSize = globalLogoProps.height; // Final navbar height
      const navbarWidth = globalLogoProps.width; // Final navbar width
      
      // Calculate maximum safe size that fits in navbar with padding
      const navbarPadding = 20; // 10px padding on each side
      const maxSafeWidth = navbarWidth - navbarPadding; // Available width minus padding
      const maxSafeWidthPercent = (maxSafeWidth / window.innerWidth) * 100; // Convert to percentage
      
      // Use the smaller of: calculated size or maximum safe size
      const calculatedSize = Math.max((navbarSize / window.innerWidth) * 100 * 2.5, 8); // Minimum 8%, larger final size
      const finalWidthPercent = Math.min(calculatedSize, maxSafeWidthPercent); // Ensure it fits with padding
      
      // Size decreases linearly from start, reaches final size by progress = 0.7
      // Simple linear scaling: starts immediately, reaches final at 0.7
      const adjustedProgress = Math.min(sizeProgress / 0.7, 1); // Linear scaling to reach 1 at 0.7
      const smoothSize = heroSize - (heroSize - finalWidthPercent) * adjustedProgress;
      
      // Ensure minimum size and apply
      const finalSize = Math.max(smoothSize, 2);
      
      // Store final properties when progress = 1.00
      if (scrollProgress >= 1.00 && !finalLogoProperties) {
        // Use the global function to get consistent final logo properties
        const globalLogoProps = window.getFinalLogoProperties();
        finalLogoProperties = {
          top: globalLogoProps.top,
          left: globalLogoProps.left,
          size: finalSize,
          height: globalLogoProps.height,
          width: globalLogoProps.width
        };
        // Update the global reference
        window.finalLogoProperties = finalLogoProperties;
        console.log('Stored final logo properties using global function:', finalLogoProperties);
      }
      
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
      window.PolarFlowsUtils.throttle(this.handleScroll, 16) : this.handleScroll;

    // Add multiple scroll event listeners to ensure we catch all scroll events
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    document.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Also add a direct scroll listener as backup
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Add resize listener to recalculate positions when window is resized
    const handleResize = () => {
        console.log('Window resized - following correct sequence');
        
        // Clear stored final logo properties since dimensions have changed
        finalLogoProperties = null;
        window.clearFinalLogoProperties(); // Use the global function to clear cache
        console.log('Cleared stored final logo properties due to resize');
        
        // Step 1: Scroll up to reset animation state
        window.scrollTo(0, 0);
        console.log('Step 1: Scrolled to top');
        
        // Step 2: Recalculate positions and display immediately (no intermediate jump)
        if (transitionLogo) {
          // Recalculate max scroll dynamically based on new hero section dimensions
          const newViewportHeight = window.innerHeight;
          const newHeroSection = document.querySelector('.hero-section');
          const newHeroSectionHeight = newHeroSection ? newHeroSection.offsetHeight : window.innerHeight;
          // Use same dynamic percentage calculation (ultra-aggressive for smaller window heights - 2x faster)
          const newDynamicPercentage = Math.max(0.05, 0.45 - (Math.max(0, 800 - newViewportHeight) * 0.004));
          const newMaxScroll = (newHeroSectionHeight * newDynamicPercentage) - earlyFinishPx;
          console.log(`New hero section height: ${newHeroSectionHeight}px, New max scroll: ${newMaxScroll}px`);
          
          // Use the same calculation as handleScroll for consistency
          const newViewportWidth = window.innerWidth;
          const newLogoHeight = transitionLogo ? transitionLogo.offsetHeight : 0;
          const newCssHeroTop = (newHeroSectionHeight * 0.15) + (newLogoHeight / 2);
          const newCssHeroLeft = newViewportWidth * 0.5;
          
          console.log(`New calculated position: top=${newCssHeroTop}px, left=${newCssHeroLeft}px`);
          
          // Apply new calculated positions immediately
          transitionLogo.style.top = `${newCssHeroTop}px`;
          transitionLogo.style.left = `${newCssHeroLeft}px`;
          transitionLogo.style.transform = 'translate(-50%, -50%)';
          console.log('Step 2: Applied new calculated positions immediately');
          
          console.log('Resize complete - all steps executed in correct order');
        }
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
        const globalLogoProps = window.getFinalLogoProperties();
        
        // Use linear progress for both position and size
        const positionProgress = currentScrollProgress;
        const sizeProgress = currentScrollProgress;
        
        // Calculate and apply position using global function for consistency
        const currentTop = heroPos.top + (globalLogoProps.top - heroPos.top) * positionProgress;
        const currentLeft = heroPos.left + (globalLogoProps.left - heroPos.left) * positionProgress;
        
        transitionLogo.style.top = `${currentTop}px`;
        transitionLogo.style.left = `${currentLeft}px`;
        transitionLogo.style.transform = 'translate(-50%, -50%)';
        
        // Calculate and apply size
        // Start from the same size as CSS (100% with max-width constraint)
        const viewportWidth = window.innerWidth;
        const maxWidthPx = Math.min(600, viewportWidth * 0.7); // Same as CSS: min(600px, 70vw)
        const heroSize = (maxWidthPx / viewportWidth) * 100; // Convert to percentage
        
        // Use global function for consistent final dimensions
        const navbarSize = globalLogoProps.height; // Final navbar height
        const navbarWidth = globalLogoProps.width; // Final navbar width
        
        // Calculate maximum safe size that fits in navbar with padding
        const navbarPadding = 20; // 10px padding on each side
        const maxSafeWidth = navbarWidth - navbarPadding; // Available width minus padding
        const maxSafeWidthPercent = (maxSafeWidth / window.innerWidth) * 100; // Convert to percentage
        
        // Use the smaller of: calculated size or maximum safe size
        const calculatedSize = Math.max((navbarSize / window.innerWidth) * 100 * 2.5, 8); // Minimum 8%, larger final size
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
        // Page loaded at top - use calculated position (same as progress=0.00)
        console.log('Page loaded at top - using calculated position');
        
        // Calculate the same position as progress=0.00 in handleScroll
        const heroSection = document.querySelector('.hero-section');
        const heroSectionHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        const logoHeight = transitionLogo ? transitionLogo.offsetHeight : 0;
        const cssHeroTop = (heroSectionHeight * 0.15) + (logoHeight / 2);
        const cssHeroLeft = window.innerWidth * 0.5;
        
        // Set the calculated position
        transitionLogo.style.top = `${cssHeroTop}px`;
        transitionLogo.style.left = `${cssHeroLeft}px`;
        transitionLogo.style.transform = 'translate(-50%, -50%)';
      }
      
      // Always show the logo after position is calculated
      transitionLogo.style.opacity = '0.95';
    };
    
    // Set initial position immediately - prioritize logo appearance
    setInitialPosition();
    
    
    // Prevent scrolling and resizing when navbar menu is open
    this.preventScrollAndResizeWhenMenuOpen();
    
    console.log('Logo transformation initialized successfully');
    console.log(`Hero height: ${heroSectionHeight}px, Navbar height: ${navbarHeight}px, Total height: ${totalHeight}px, Max scroll: ${maxScroll}px`);
    
  }

  /**
   * Prevent scrolling and resizing when navbar menu is open
   */
  preventScrollAndResizeWhenMenuOpen() {
    const navbarNav = document.querySelector('.navbar-nav');
    if (!navbarNav) return;

    let isMenuOpen = false;
    let originalScrollY = 0;
    let originalOverflow = '';

    // Function to prevent scrolling
    const preventScroll = (e) => {
      if (isMenuOpen) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Function to prevent resizing
    const preventResize = (e) => {
      if (isMenuOpen) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Function to create temporary background
    const createTempBackground = () => {
      const tempBackground = document.createElement('div');
      tempBackground.className = 'temp-navbar-background';
      tempBackground.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('assets/img/polarflows/Stockholm_modif.jpg');
        background-size: cover;
        background-position: left center;
        background-attachment: fixed;
        z-index: 1015;
        pointer-events: none;
      `;
      
      // Add the same overlay as hero section
      const overlay = document.createElement('div');
      overlay.className = 'temp-background-overlay';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%);
        z-index: 1;
      `;
      tempBackground.appendChild(overlay);
      document.body.appendChild(tempBackground);
      
      // Hide the big logo completely by setting opacity to 0
      const transitionLogo = document.querySelector('.transition-logo');
      if (transitionLogo) {
        transitionLogo.style.setProperty('opacity', '0', 'important');
        transitionLogo.style.setProperty('visibility', 'hidden', 'important');
      }
      
      return tempBackground;
    };

    // Function to create temporary logo
    const createTempLogo = () => {
      const tempLogo = document.createElement('img');
      tempLogo.className = 'temp-navbar-logo';
      tempLogo.src = 'assets/img/polarflows/logo_v2_full_white.png';
      tempLogo.alt = 'Polar Flows';
      
      // Clear any cached properties to ensure fresh calculation
      window.clearFinalLogoProperties();
      
      // Use the global function to get consistent logo properties
      const logoProps = window.getFinalLogoProperties();
      console.log('Fake logo using global logo properties:', logoProps);
      console.log('Fake logo dimensions - width:', logoProps.width, 'height:', logoProps.height);
      
      tempLogo.style.cssText = `
        position: fixed;
        top: ${logoProps.top}px;
        left: ${logoProps.left}px;
        width: ${logoProps.width}px;
        height: ${logoProps.height}px;
        opacity: ${logoProps.opacity};
        transform: translate(-50%, -50%);
        z-index: 1020;
        pointer-events: none;
        padding: 10px 0 0 0 !important;
        margin: 0 !important;
        border: none !important;
        outline: none !important;
        box-sizing: border-box !important;
        display: block !important;
        object-fit: contain !important;
        max-width: none !important;
        min-width: auto !important;
        max-height: none !important;
        min-height: auto !important;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) !important;
      `;
      document.body.appendChild(tempLogo);
      
      // Debug: Check actual rendered dimensions
      setTimeout(() => {
        const rect = tempLogo.getBoundingClientRect();
        console.log('Fake logo actual rendered dimensions:', {
          expectedWidth: logoProps.width,
          expectedHeight: logoProps.height,
          actualWidth: rect.width,
          actualHeight: rect.height,
          difference: {
            width: rect.width - logoProps.width,
            height: rect.height - logoProps.height
          }
        });
      }, 100);
      
      return tempLogo;
    };

    // Function to close menu and clean up
    const closeMenuAndCleanup = () => {
      if (isMenuOpen) {
        // Remove temporary background
        const tempBackground = document.querySelector('.temp-navbar-background');
        if (tempBackground) {
          tempBackground.remove();
        }
        
        // Remove temporary logo
        const tempLogo = document.querySelector('.temp-navbar-logo');
        if (tempLogo) {
          tempLogo.remove();
        }
        
        // Restore the big logo visibility
        const transitionLogo = document.querySelector('.transition-logo');
        if (transitionLogo) {
          transitionLogo.style.opacity = '0.95';
          transitionLogo.style.visibility = 'visible';
        }
        
        // Close the navbar menu
        navbarNav.classList.remove('active');
        
        isMenuOpen = false;
        console.log('Menu closed and cleanup completed');
      }
    };

    // Observe navbar menu state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isActive = navbarNav.classList.contains('active');
          
          if (isActive && !isMenuOpen) {
            // Menu just opened
            isMenuOpen = true;
            originalScrollY = window.scrollY;
            originalOverflow = document.body.style.overflow;
            
            console.log('Menu opened - creating visual illusion');
            
            // 1. Menu is already expanded (handled by CSS)
            
            // 2. Make menu always in front
            navbarNav.style.zIndex = '1030';
            
            // 3. Add temporary background (second in order, behind menu)
            const tempBackground = createTempBackground();
            
            // 4. Add temporary logo (third in order, behind background)
            const tempLogo = createTempLogo();
            
            // 5. Hide the big logo (behind everything)
            const transitionLogo = document.querySelector('.transition-logo');
            if (transitionLogo) {
              transitionLogo.style.setProperty('opacity', '0', 'important');
              transitionLogo.style.visibility = 'hidden';
            }
            
            // 6. Lock scrolling and resizing
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            // Add event listeners to prevent scrolling and resizing
            const preventScroll = (e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            };
            
            const preventResize = (e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            };
            
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            window.addEventListener('keydown', (e) => {
              if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
                preventScroll(e);
              }
            });
            window.addEventListener('resize', preventResize);
            
            console.log('Menu opened - visual illusion created, scrolling locked');
          } else if (!isActive && isMenuOpen) {
            // Menu just closed
            closeMenuAndCleanup();
            
            // Restore scrolling
            document.body.style.overflow = originalOverflow || '';
            document.documentElement.style.overflow = originalOverflow || '';
            
            // Remove event listeners
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventScroll);
            window.removeEventListener('resize', preventResize);
            
            console.log('Menu closed - visual illusion removed, scrolling restored');
          }
        }
      });
    });

    // Start observing navbar menu state changes
    observer.observe(navbarNav, { attributes: true, attributeFilter: ['class'] });
  }
}

// Global variable to store final logo properties for reuse
window.finalLogoProperties = null;

// Global function to get consistent logo dimensions and position
// Used by: final logo position, fake logo, and small logo on non-home pages
window.getFinalLogoProperties = function() {
  // Return cached result if available
  if (window.finalLogoProperties) {
    return window.finalLogoProperties;
  }

  const navbarBrand = document.querySelector('.navbar-brand');
  if (!navbarBrand) {
    const fallbackResult = {
      top: 12.5,
      left: 16,
      height: 55,
      width: 202.797,
      opacity: 1
    };
    window.finalLogoProperties = fallbackResult;
    return fallbackResult;
  }

  // Get the actual logo image element inside navbar-brand
  const logoImg = navbarBrand.querySelector('.navbar-logo');
  if (!logoImg) {
    const fallbackResult = {
      top: 12.5,
      left: 16,
      height: 55,
      width: 202.797,
      opacity: 1
    };
    window.finalLogoProperties = fallbackResult;
    return fallbackResult;
  }
  
  // Get the actual logo image dimensions and position
  const logoRect = logoImg.getBoundingClientRect();
  const navbar = document.querySelector('.navbar');
  const actualNavbarHeight = navbar ? navbar.offsetHeight : 70; // Get actual navbar height
  
  // Use the actual logo image dimensions
  const logoHeight = logoRect.height;
  const logoWidth = logoRect.width;
  
  // Position the logo using the actual logo image position
  // The animation uses transform: translate(-50%, -50%), so we need to position the center of the logo
  const logoCenterY = logoRect.top + (logoRect.height / 2);
  const finalTop = logoCenterY; // Center vertically based on actual logo position
  
  // Position from the left edge of the actual logo with margin
  // Since transform centers the logo, we position the center point
  // Use negative margin on smaller screens for more left positioning
  const marginLeft = window.innerWidth <= 900 ? -16 : 4; // -16px margin on mobile (moves left), 4px on larger screens
  const finalLeft = logoRect.left + marginLeft + (logoWidth / 2); // Position center of logo
  
  const result = {
    top: finalTop,
    left: finalLeft,
    height: logoHeight,
    width: logoWidth,
    opacity: 1,
    // Include screen size info for debugging
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    calculatedAt: Date.now()
  };
  
  // Cache the result for reuse
  window.finalLogoProperties = result;
  
  console.log('getFinalLogoProperties calculated and cached:', result);
  console.log('Logo rect:', logoRect, 'Actual navbar height:', actualNavbarHeight, 'Logo height:', logoHeight);
  
  return result;
};

// Function to clear the cached logo properties (useful for window resize)
window.clearFinalLogoProperties = function() {
  window.finalLogoProperties = null;
  console.log('Final logo properties cache cleared');
};

// Function to force recalculation of logo properties (bypasses cache)
window.recalculateFinalLogoProperties = function() {
  window.finalLogoProperties = null; // Clear cache first
  const result = window.getFinalLogoProperties(); // Force recalculation
  console.log('Final logo properties recalculated:', result);
  return result;
};

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
