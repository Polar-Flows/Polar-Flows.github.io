/**
 * Animations Component - Polar Flows
 * Handles scroll animations, transitions, and IntersectionObserver functionality
 */

export class Animations {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.isInitialized = false;
    this.reducedMotion = false;
    
    // Animation options
    this.defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      triggerOnce: true
    };
  }

  /**
   * Initialize the animations component
   */
  async init() {
    try {
      // Check for reduced motion preference
      this.checkReducedMotion();
      
      // Set up intersection observers
      this.setupIntersectionObservers();
      
      // Set up scroll animations
      this.setupScrollAnimations();
      
      // Set up hover animations
      this.setupHoverAnimations();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Animations component initialized
      
      return this;
      
    } catch (error) {
      console.error('Failed to initialize Animations component:', error);
      throw error;
    }
  }

  /**
   * Check for reduced motion preference
   */
  checkReducedMotion() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      this.updateAnimations();
    });
  }

  /**
   * Set up intersection observers for scroll animations
   */
  setupIntersectionObservers() {
    // Fade in animations
    this.createObserver('fade-in', {
      ...this.defaultOptions,
      callback: (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateFadeIn(entry.target);
          }
        });
      }
    });
    
    // Fade in up animations
    this.createObserver('fade-in-up', {
      ...this.defaultOptions,
      callback: (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateFadeInUp(entry.target);
          }
        });
      }
    });
    
    // Slide in animations
    this.createObserver('slide-in-left', {
      ...this.defaultOptions,
      callback: (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSlideInLeft(entry.target);
          }
        });
      }
    });
    
    this.createObserver('slide-in-right', {
      ...this.defaultOptions,
      callback: (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSlideInRight(entry.target);
          }
        });
      }
    });
    
    // Scale in animations
    this.createObserver('scale-in', {
      ...this.defaultOptions,
      callback: (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateScaleIn(entry.target);
          }
        });
      }
    });
  }

  /**
   * Create an intersection observer
   */
  createObserver(className, options) {
    const elements = document.querySelectorAll(`.${className}`);
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver(options.callback, {
      threshold: options.threshold,
      rootMargin: options.rootMargin
    });
    
    elements.forEach(element => {
      observer.observe(element);
      this.animatedElements.add(element);
    });
    
    this.observers.set(className, observer);
  }

  /**
   * Set up scroll animations
   */
  setupScrollAnimations() {
    // Parallax effects
    this.setupParallaxEffects();
    
    // Sticky animations
    this.setupStickyAnimations();
    
    // Progress indicators
    this.setupProgressIndicators();
  }

  /**
   * Set up parallax effects
   */
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0 || this.reducedMotion) return;
    
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Set up sticky animations
   */
  setupStickyAnimations() {
    const stickyElements = document.querySelectorAll('[data-sticky]');
    
    if (stickyElements.length === 0) return;
    
    let ticking = false;
    
    const updateSticky = () => {
      const scrolled = window.pageYOffset;
      
      stickyElements.forEach(element => {
        const offset = parseInt(element.dataset.sticky) || 0;
        const rect = element.getBoundingClientRect();
        
        if (scrolled > offset) {
          element.classList.add('sticky-active');
        } else {
          element.classList.remove('sticky-active');
        }
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateSticky);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Set up progress indicators
   */
  setupProgressIndicators() {
    const progressBars = document.querySelectorAll('[data-progress]');
    
    if (progressBars.length === 0) return;
    
    const updateProgress = () => {
      progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(100, Math.max(0, 
            ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
          ));
          
          bar.style.width = `${progress}%`;
        }
      });
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial update
  }

  /**
   * Set up hover animations
   */
  setupHoverAnimations() {
    if (this.reducedMotion) return;
    
    // Card hover effects
    const cards = document.querySelectorAll('.value-prop-card, .service-card, .journey-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateCardHover(card, 'in');
      });
      
      card.addEventListener('mouseleave', () => {
        this.animateCardHover(card, 'out');
      });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        this.animateButtonHover(button, 'in');
      });
      
      button.addEventListener('mouseleave', () => {
        this.animateButtonHover(button, 'out');
      });
    });
  }

  /**
   * Animate fade in
   */
  animateFadeIn(element) {
    if (this.reducedMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.transition = 'opacity 0.6s ease-out';
    element.style.opacity = '1';
    
    if (this.defaultOptions.triggerOnce) {
      element.classList.remove('fade-in');
    }
  }

  /**
   * Animate fade in up
   */
  animateFadeInUp(element) {
    if (this.reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }
    
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    if (this.defaultOptions.triggerOnce) {
      element.classList.remove('fade-in-up');
    }
  }

  /**
   * Animate slide in left
   */
  animateSlideInLeft(element) {
    if (this.reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
    
    if (this.defaultOptions.triggerOnce) {
      element.classList.remove('slide-in-left');
    }
  }

  /**
   * Animate slide in right
   */
  animateSlideInRight(element) {
    if (this.reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
    
    if (this.defaultOptions.triggerOnce) {
      element.classList.remove('slide-in-right');
    }
  }

  /**
   * Animate scale in
   */
  animateScaleIn(element) {
    if (this.reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      return;
    }
    
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    
    if (this.defaultOptions.triggerOnce) {
      element.classList.remove('scale-in');
    }
  }

  /**
   * Animate card hover
   */
  animateCardHover(card, direction) {
    if (this.reducedMotion) return;
    
    const duration = '0.3s';
    
    if (direction === 'in') {
      card.style.transition = `transform ${duration} ease-out, box-shadow ${duration} ease-out`;
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = 'var(--pf-shadow-xl)';
    } else {
      card.style.transition = `transform ${duration} ease-out, box-shadow ${duration} ease-out`;
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = 'var(--pf-shadow-sm)';
    }
  }

  /**
   * Animate button hover
   */
  animateButtonHover(button, direction) {
    if (this.reducedMotion) return;
    
    const duration = '0.2s';
    
    if (direction === 'in') {
      button.style.transition = `transform ${duration} ease-out`;
      button.style.transform = 'translateY(-2px)';
    } else {
      button.style.transition = `transform ${duration} ease-out`;
      button.style.transform = 'translateY(0)';
    }
  }

  /**
   * Add animation class to element
   */
  addAnimationClass(element, className) {
    element.classList.add(className);
    
    // Set initial state
    switch (className) {
      case 'fade-in':
        element.style.opacity = '0';
        break;
      case 'fade-in-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'slide-in-left':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'slide-in-right':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
      case 'scale-in':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        break;
    }
  }

  /**
   * Remove animation class from element
   */
  removeAnimationClass(element, className) {
    element.classList.remove(className);
    element.style.opacity = '';
    element.style.transform = '';
    element.style.transition = '';
  }

  /**
   * Update animations based on reduced motion preference
   */
  updateAnimations() {
    if (this.reducedMotion) {
      // Disable all animations
      this.animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.transition = 'none';
      });
    } else {
      // Re-enable animations
      this.animatedElements.forEach(element => {
        element.style.transition = '';
      });
    }
  }

  /**
   * Add element to animations
   */
  addElement(element, animationClass) {
    if (!element || !animationClass) return;
    
    this.addAnimationClass(element, animationClass);
    this.animatedElements.add(element);
    
    // Add to appropriate observer
    const observer = this.observers.get(animationClass);
    if (observer) {
      observer.observe(element);
    }
  }

  /**
   * Remove element from animations
   */
  removeElement(element) {
    if (!element) return;
    
    this.animatedElements.delete(element);
    
    // Remove from all observers
    this.observers.forEach(observer => {
      observer.unobserve(element);
    });
  }

  /**
   * Trigger animation manually
   */
  triggerAnimation(element, animationClass) {
    if (!element || !animationClass) return;
    
    // Add animation class temporarily
    this.addAnimationClass(element, animationClass);
    
    // Trigger animation
    requestAnimationFrame(() => {
      switch (animationClass) {
        case 'fade-in':
          this.animateFadeIn(element);
          break;
        case 'fade-in-up':
          this.animateFadeInUp(element);
          break;
        case 'slide-in-left':
          this.animateSlideInLeft(element);
          break;
        case 'slide-in-right':
          this.animateSlideInRight(element);
          break;
        case 'scale-in':
          this.animateScaleIn(element);
          break;
      }
    });
  }

  /**
   * Get animation state
   */
  getAnimationState(element) {
    if (!element) return null;
    
    const classes = Array.from(element.classList);
    const animationClasses = classes.filter(cls => 
      ['fade-in', 'fade-in-up', 'slide-in-left', 'slide-in-right', 'scale-in'].includes(cls)
    );
    
    return {
      hasAnimations: animationClasses.length > 0,
      animationClasses,
      isAnimated: this.animatedElements.has(element),
      reducedMotion: this.reducedMotion
    };
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
   * Get component state
   */
  getState() {
    return {
      totalObservers: this.observers.size,
      totalAnimatedElements: this.animatedElements.size,
      reducedMotion: this.reducedMotion,
      isInitialized: this.isInitialized
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Disconnect all observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    
    this.observers.clear();
    this.animatedElements.clear();
    
    // Reset state
    this.isInitialized = false;
    
    // Animations component destroyed
  }
}

/**
 * Initialize animations component
 */
export async function initAnimations() {
  const animations = new Animations();
  return await animations.init();
}
