/**
 * Navigation Component - Polar Flows
 * Handles sticky navbar, mobile menu, and navigation functionality
 */

export class Navigation {
  constructor() {
    this.navbar = null;
    this.navbarToggle = null;
    this.navbarNav = null;
    this.isMobileMenuOpen = false;
    this.lastScrollY = 0;
    this.scrollThreshold = 50;
    this.isInitialized = false;
  }

  /**
   * Initialize the navigation component
   */
  async init() {
    try {
      // Wait for DOM elements to be available
      await this.waitForElements();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Initialize scroll handling
      this.setupScrollHandling();
      
      // Set up keyboard navigation
      this.setupKeyboardNavigation();
      
      // Mark as initialized
      this.isInitialized = true;
      
      console.log('Navigation component initialized');
      
      return this;
      
    } catch (error) {
      console.error('Failed to initialize Navigation component:', error);
      throw error;
    }
  }

  /**
   * Wait for required DOM elements to be available
   */
  async waitForElements() {
    const maxAttempts = 50;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      this.navbar = document.querySelector('.navbar');
      this.navbarToggle = document.querySelector('.navbar-toggle');
      this.navbarNav = document.querySelector('.navbar-nav');
      
      if (this.navbar && this.navbarToggle && this.navbarNav) {
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    throw new Error('Required navigation elements not found');
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    if (this.navbarToggle) {
      this.navbarToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMobileMenuOpen && !this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Handle app escape event
    document.addEventListener('app:escape', () => {
      this.closeMobileMenu();
    });
  }

  /**
   * Set up scroll handling
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
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
    
    // Update navbar appearance based on scroll
    if (currentScrollY > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    
    // Auto-hide navbar on scroll down (optional)
    if (scrollDirection === 'down' && currentScrollY > 100) {
      this.navbar.style.transform = 'translateY(-100%)';
    } else {
      this.navbar.style.transform = 'translateY(0)';
    }
    
    this.lastScrollY = currentScrollY;
  }

  /**
   * Set up keyboard navigation
   */
  setupKeyboardNavigation() {
    const navLinks = this.navbarNav.querySelectorAll('a');
    
    // Handle tab navigation
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
      
      // Set tabindex for better keyboard navigation
      link.setAttribute('tabindex', '0');
    });
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.navbarNav.classList.add('active');
    this.navbarToggle.classList.add('active');
    this.isMobileMenuOpen = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item
    const firstLink = this.navbarNav.querySelector('a');
    if (firstLink) {
      firstLink.focus();
    }
    
    // Announce to screen readers
    this.announceToScreenReader('Mobile menu opened');
    
    // Dispatch event
    this.dispatchEvent('navigation:mobileMenuOpened');
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.navbarNav.classList.remove('active');
    this.navbarToggle.classList.remove('active');
    this.isMobileMenuOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    if (this.navbarToggle) {
      this.navbarToggle.focus();
    }
    
    // Announce to screen readers
    this.announceToScreenReader('Mobile menu closed');
    
    // Dispatch event
    this.dispatchEvent('navigation:mobileMenuClosed');
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile menu on larger screens
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Announce changes to screen readers
   */
  announceToScreenReader(message) {
    // Create or update live region
    let liveRegion = document.getElementById('navigation-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'navigation-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
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
    
    this.navbar.dispatchEvent(event);
  }

  /**
   * Get navigation state
   */
  getState() {
    return {
      isMobileMenuOpen: this.isMobileMenuOpen,
      isInitialized: this.isInitialized,
      scrollY: this.lastScrollY
    };
  }

  /**
   * Update navigation items (for dynamic content)
   */
  updateNavigationItems(items) {
    if (!this.navbarNav) return;
    
    // Clear existing items
    this.navbarNav.innerHTML = '';
    
    // Add new items
    items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.text;
      link.setAttribute('tabindex', '0');
      
      if (item.external) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
      
      this.navbarNav.appendChild(link);
    });
    
    // Re-setup keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Add navigation item
   */
  addNavigationItem(item) {
    if (!this.navbarNav) return;
    
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    link.setAttribute('tabindex', '0');
    
    if (item.external) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    this.navbarNav.appendChild(link);
  }

  /**
   * Remove navigation item by href
   */
  removeNavigationItem(href) {
    if (!this.navbarNav) return;
    
    const link = this.navbarNav.querySelector(`a[href="${href}"]`);
    if (link) {
      link.remove();
    }
  }

  /**
   * Set active navigation item
   */
  setActiveItem(href) {
    if (!this.navbarNav) return;
    
    // Remove active class from all items
    this.navbarNav.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to matching item
    const activeLink = this.navbarNav.querySelector(`a[href="${href}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Remove event listeners
    if (this.navbarToggle) {
      this.navbarToggle.removeEventListener('click', this.toggleMobileMenu);
    }
    
    // Close mobile menu if open
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
    
    // Reset state
    this.isInitialized = false;
    this.isMobileMenuOpen = false;
    
    console.log('Navigation component destroyed');
  }
}

/**
 * Initialize navigation component
 */
export async function initNavigation() {
  const navigation = new Navigation();
  return await navigation.init();
}
