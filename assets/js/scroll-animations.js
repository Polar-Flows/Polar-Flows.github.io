/**
 * Scroll Animations - Polar Flows Website
 * Handles smooth scrolling and section animations
 */

class ScrollAnimations {
  constructor() {
    this.animatedElements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.addScrollClasses();
  }

  setupIntersectionObserver() {
    // Create intersection observer for scroll animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Remove observer after animation to improve performance
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
      this.observer.observe(el);
    });
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  addScrollClasses() {
    // Add scroll animation classes to various sections
    this.addAnimationToSection('value-props', '.value-prop-card', 'scroll-animate-scale');
    this.addAnimationToSection('services', '.service-card', 'scroll-animate');
    this.addAnimationToSection('team', '.team-card', 'scroll-animate-scale');
    this.addAnimationToSection('journey', '.journey-card', 'scroll-animate');
    
    // Add staggered animations to grid items
    this.addStaggeredAnimations();
  }

  addAnimationToSection(sectionId, selector, animationClass) {
    const section = document.getElementById(sectionId);
    if (section) {
      const elements = section.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.classList.add('scroll-animate', animationClass);
        if (index < 6) { // Limit to 6 stagger delays
          el.classList.add(`stagger-${index + 1}`);
        }
      });
    }
  }

  addStaggeredAnimations() {
    // Add staggered animations to grid layouts
    const grids = document.querySelectorAll('.grid, .grid-2, .grid-3, .grid-4');
    grids.forEach(grid => {
      const items = grid.querySelectorAll('.scroll-animate');
      items.forEach((item, index) => {
        if (index < 6) {
          item.classList.add(`stagger-${index + 1}`);
        }
      });
    });
  }

  // Method to refresh animations (useful for dynamic content)
  refresh() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.setupIntersectionObserver();
  }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
});

// Refresh animations when content changes (for dynamic content)
if (window.scrollAnimations) {
  window.scrollAnimations.refresh();
}
