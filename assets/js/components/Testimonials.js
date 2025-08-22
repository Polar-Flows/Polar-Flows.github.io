/**
 * Testimonials Component - Polar Flows
 * Handles testimonials slider with autoplay and pause on hover
 */

export class Testimonials {
  constructor() {
    this.container = null;
    this.testimonials = [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 seconds
    this.isPaused = false;
    this.isInitialized = false;
    this.testimonialData = [
      {
        text: "Polar Flows transformed our data infrastructure with their Azure expertise. They delivered a robust solution that scaled perfectly with our growth.",
        author: "Sarah Johnson",
        company: "TechCorp Inc."
      },
      {
        text: "The team's knowledge of Databricks and data governance is exceptional. They helped us achieve compliance while improving performance significantly.",
        author: "Michael Chen",
        company: "DataFlow Solutions"
      },
      {
        text: "Working with Polar Flows was a game-changer for our MLOps pipeline. Their approach to scalability and disaster recovery is world-class.",
        author: "Emily Rodriguez",
        company: "AI Innovations Ltd."
      },
      {
        text: "Cost optimization was our biggest challenge, and Polar Flows delivered beyond expectations. Their structured streaming implementation is flawless.",
        author: "David Thompson",
        company: "StreamTech"
      }
    ];
  }

  /**
   * Initialize the testimonials component
   */
  async init() {
    try {
      // Wait for DOM elements to be available
      await this.waitForElements();
      
      // Set up testimonials
      this.setupTestimonials();
      
      // Set up navigation
      this.setupNavigation();
      
      // Start autoplay
      this.startAutoplay();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Mark as initialized
      this.isInitialized = true;
      
      console.log('Testimonials component initialized');
      
      return this;
      
    } catch (error) {
      console.error('Failed to initialize Testimonials component:', error);
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
      this.container = document.querySelector('.testimonials-container');
      
      if (this.container) {
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    throw new Error('Testimonials container not found');
  }

  /**
   * Set up testimonials display
   */
  setupTestimonials() {
    // Create testimonials HTML
    this.testimonialData.forEach((testimonial, index) => {
      const testimonialElement = this.createTestimonialElement(testimonial, index);
      this.testimonials.push(testimonialElement);
    });
    
    // Show first testimonial
    this.showTestimonial(0);
  }

  /**
   * Create testimonial element
   */
  createTestimonialElement(testimonial, index) {
    const element = document.createElement('div');
    element.className = 'testimonial';
    element.style.display = index === 0 ? 'block' : 'none';
    element.setAttribute('data-index', index);
    
    element.innerHTML = `
      <blockquote class="testimonial-text">
        "${testimonial.text}"
      </blockquote>
      <div class="testimonial-author">${testimonial.author}</div>
      <div class="testimonial-company">${testimonial.company}</div>
    `;
    
    this.container.appendChild(element);
    
    return element;
  }

  /**
   * Set up navigation dots
   */
  setupNavigation() {
    const navContainer = document.createElement('div');
    navContainer.className = 'testimonial-nav';
    
    this.testimonialData.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.setAttribute('data-index', index);
      
      if (index === 0) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        this.goToTestimonial(index);
      });
      
      navContainer.appendChild(dot);
    });
    
    this.container.appendChild(navContainer);
  }

  /**
   * Show testimonial at specific index
   */
  showTestimonial(index) {
    // Hide all testimonials
    this.testimonials.forEach(testimonial => {
      testimonial.style.display = 'none';
    });
    
    // Show selected testimonial
    if (this.testimonials[index]) {
      this.testimonials[index].style.display = 'block';
    }
    
    // Update navigation dots
    const dots = this.container.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
    
    // Update current index
    this.currentIndex = index;
    
    // Dispatch event
    this.dispatchEvent('testimonials:changed', { index });
  }

  /**
   * Go to specific testimonial
   */
  goToTestimonial(index) {
    if (index >= 0 && index < this.testimonials.length) {
      this.showTestimonial(index);
      
      // Reset autoplay timer
      this.resetAutoplay();
    }
  }

  /**
   * Go to next testimonial
   */
  nextTestimonial() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.showTestimonial(nextIndex);
  }

  /**
   * Go to previous testimonial
   */
  previousTestimonial() {
    const prevIndex = this.currentIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentIndex - 1;
    this.showTestimonial(prevIndex);
  }

  /**
   * Start autoplay
   */
  startAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextTestimonial();
      }
    }, this.autoplayDelay);
  }

  /**
   * Stop autoplay
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Reset autoplay timer
   */
  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  /**
   * Pause autoplay
   */
  pauseAutoplay() {
    this.isPaused = true;
  }

  /**
   * Resume autoplay
   */
  resumeAutoplay() {
    this.isPaused = false;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.pauseAutoplay();
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.resumeAutoplay();
    });
    
    // Pause on focus (for accessibility)
    this.container.addEventListener('focusin', () => {
      this.pauseAutoplay();
    });
    
    this.container.addEventListener('focusout', () => {
      this.resumeAutoplay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.container.contains(document.activeElement)) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousTestimonial();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextTestimonial();
            break;
          case 'Home':
            e.preventDefault();
            this.goToTestimonial(0);
            break;
          case 'End':
            e.preventDefault();
            this.goToTestimonial(this.testimonials.length - 1);
            break;
        }
      }
    });
    
    // Touch/swipe support for mobile
    this.setupTouchSupport();
  }

  /**
   * Set up touch support for mobile devices
   */
  setupTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      this.handleSwipe();
    };
    
    this.container.addEventListener('touchstart', handleTouchStart, { passive: true });
    this.container.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  /**
   * Handle swipe gestures
   */
  handleSwipe() {
    const minSwipeDistance = 50;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Check if it's a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - go to previous
        this.previousTestimonial();
      } else {
        // Swipe left - go to next
        this.nextTestimonial();
      }
    }
  }

  /**
   * Add new testimonial
   */
  addTestimonial(testimonial) {
    const index = this.testimonials.length;
    const element = this.createTestimonialElement(testimonial, index);
    this.testimonials.push(element);
    
    // Add navigation dot
    this.addNavigationDot(index);
    
    // Update testimonial data
    this.testimonialData.push(testimonial);
  }

  /**
   * Add navigation dot for new testimonial
   */
  addNavigationDot(index) {
    const navContainer = this.container.querySelector('.testimonial-nav');
    if (!navContainer) return;
    
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.setAttribute('data-index', index);
    
    dot.addEventListener('click', () => {
      this.goToTestimonial(index);
    });
    
    navContainer.appendChild(dot);
  }

  /**
   * Remove testimonial by index
   */
  removeTestimonial(index) {
    if (index < 0 || index >= this.testimonials.length) return;
    
    // Remove element
    const element = this.testimonials[index];
    if (element) {
      element.remove();
    }
    
    // Remove from array
    this.testimonials.splice(index, 1);
    this.testimonialData.splice(index, 1);
    
    // Update remaining elements
    this.testimonials.forEach((testimonial, newIndex) => {
      testimonial.setAttribute('data-index', newIndex);
    });
    
    // Update navigation dots
    this.updateNavigationDots();
    
    // Adjust current index if necessary
    if (this.currentIndex >= this.testimonials.length) {
      this.currentIndex = Math.max(0, this.testimonials.length - 1);
    }
    
    // Show current testimonial
    this.showTestimonial(this.currentIndex);
  }

  /**
   * Update navigation dots after removal
   */
  updateNavigationDots() {
    const navContainer = this.container.querySelector('.testimonial-nav');
    if (!navContainer) return;
    
    // Clear existing dots
    navContainer.innerHTML = '';
    
    // Recreate dots
    this.testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.setAttribute('data-index', index);
      
      if (index === this.currentIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        this.goToTestimonial(index);
      });
      
      navContainer.appendChild(dot);
    });
  }

  /**
   * Set autoplay delay
   */
  setAutoplayDelay(delay) {
    this.autoplayDelay = delay;
    this.resetAutoplay();
  }

  /**
   * Get current state
   */
  getState() {
    return {
      currentIndex: this.currentIndex,
      totalTestimonials: this.testimonials.length,
      isPaused: this.isPaused,
      autoplayDelay: this.autoplayDelay,
      isInitialized: this.isInitialized
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
    
    this.container.dispatchEvent(event);
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Stop autoplay
    this.stopAutoplay();
    
    // Remove event listeners
    this.container.removeEventListener('mouseenter', this.pauseAutoplay);
    this.container.removeEventListener('mouseleave', this.resumeAutoplay);
    
    // Clear testimonials
    this.testimonials = [];
    
    // Reset state
    this.currentIndex = 0;
    this.isPaused = false;
    this.isInitialized = false;
    
    console.log('Testimonials component destroyed');
  }
}

/**
 * Initialize testimonials component
 */
export async function initTestimonials() {
  const testimonials = new Testimonials();
  return await testimonials.init();
}
