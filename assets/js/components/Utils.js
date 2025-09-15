/**
 * Utils Component - Polar Flows
 * Provides utility functions and helpers
 */

export class Utils {
  constructor() {
    this.isInitialized = false;
    this.debounceTimers = new Map();
    this.throttleTimers = new Map();
  }

  /**
   * Initialize the utils component
   */
  async init() {
    try {
      // Set up utility functions
      this.setupUtilityFunctions();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Utils component initialized
      
      return this;
      
    } catch (error) {
      console.error('Failed to initialize Utils component:', error);
      throw error;
    }
  }

  /**
   * Set up utility functions
   */
  setupUtilityFunctions() {
    // Add utility methods to window for global access
    window.PolarFlowsUtils = {
      debounce: this.debounce.bind(this),
      throttle: this.throttle.bind(this),
      formatNumber: this.formatNumber.bind(this),
      formatDate: this.formatDate.bind(this),
      copyToClipboard: this.copyToClipboard.bind(this),
      smoothScroll: this.smoothScroll.bind(this),
      isElementInViewport: this.isElementInViewport.bind(this),
      getElementOffset: this.getElementOffset.bind(this),
      addClass: this.addClass.bind(this),
      removeClass: this.removeClass.bind(this),
      toggleClass: this.toggleClass.bind(this),
      hasClass: this.hasClass.bind(this),
      getQueryParam: this.getQueryParam.bind(this),
      setQueryParam: this.setQueryParam.bind(this),
      removeQueryParam: this.removeQueryParam.bind(this),
      generateId: this.generateId.bind(this),
      deepClone: this.deepClone.bind(this),
      debounce: this.debounce.bind(this),
      throttle: this.throttle.bind(this)
    };
  }

  /**
   * Debounce function execution
   */
  debounce(func, wait, immediate = false) {
    const key = func.toString();
    
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key));
    }
    
    const timer = setTimeout(() => {
      if (!immediate) {
        func();
      }
      this.debounceTimers.delete(key);
    }, wait);
    
    this.debounceTimers.set(key, timer);
    
    if (immediate && !this.debounceTimers.has(key)) {
      func();
    }
  }

  /**
   * Throttle function execution
   */
  throttle(func, limit) {
    const key = func.toString();
    
    if (this.throttleTimers.has(key)) {
      return;
    }
    
    func();
    this.throttleTimers.set(key, true);
    
    setTimeout(() => {
      this.throttleTimers.delete(key);
    }, limit);
  }

  /**
   * Format number with locale
   */
  formatNumber(number, locale = 'en-US', options = {}) {
    try {
      return new Intl.NumberFormat(locale, options).format(number);
    } catch (error) {
      console.error('Error formatting number:', error);
      return number.toString();
    }
  }

  /**
   * Format date with locale
   */
  formatDate(date, locale = 'en-US', options = {}) {
    try {
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return date.toString();
    }
  }

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Smooth scroll to element
   */
  smoothScroll(target, options = {}) {
    const defaultOptions = {
      duration: 800,
      easing: 'easeInOutCubic',
      offset: 0
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    let targetElement;
    
    if (typeof target === 'string') {
      targetElement = document.querySelector(target);
    } else if (target instanceof Element) {
      targetElement = target;
    } else {
      console.error('Invalid target for smooth scroll');
      return;
    }
    
    if (!targetElement) {
      console.error('Target element not found');
      return;
    }
    
    const targetPosition = this.getElementOffset(targetElement).top + finalOptions.offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.ease(timeElapsed, startPosition, distance, finalOptions.duration, finalOptions.easing);
      window.scrollTo(0, run);
      
      if (timeElapsed < finalOptions.duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }

  /**
   * Easing functions for smooth scroll
   */
  ease(t, b, c, d, easing) {
    const easingFunctions = {
      easeInOutCubic: (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      },
      easeInCubic: (t, b, c, d) => {
        t /= d;
        return c * t * t * t + b;
      },
      easeOutCubic: (t, b, c, d) => {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      }
    };
    
    const easingFunc = easingFunctions[easing] || easingFunctions.easeInOutCubic;
    return easingFunc(t, b, c, d);
  }

  /**
   * Check if element is in viewport
   */
  isElementInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Get element offset from top of document
   */
  getElementOffset(element) {
    if (!element) return { top: 0, left: 0 };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  /**
   * Add class to element
   */
  addClass(element, className) {
    if (!element || !className) return;
    
    if (element.classList) {
      element.classList.add(className);
    } else {
      const classes = element.className.split(' ');
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        element.className = classes.join(' ');
      }
    }
  }

  /**
   * Remove class from element
   */
  removeClass(element, className) {
    if (!element || !className) return;
    
    if (element.classList) {
      element.classList.remove(className);
    } else {
      const classes = element.className.split(' ');
      const index = classes.indexOf(className);
      if (index > -1) {
        classes.splice(index, 1);
        element.className = classes.join(' ');
      }
    }
  }

  /**
   * Toggle class on element
   */
  toggleClass(element, className) {
    if (!element || !className) return;
    
    if (element.classList) {
      element.classList.toggle(className);
    } else {
      const classes = element.className.split(' ');
      const index = classes.indexOf(className);
      if (index > -1) {
        classes.splice(index, 1);
      } else {
        classes.push(className);
      }
      element.className = classes.join(' ');
    }
  }

  /**
   * Check if element has class
   */
  hasClass(element, className) {
    if (!element || !className) return false;
    
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      const classes = element.className.split(' ');
      return classes.indexOf(className) !== -1;
    }
  }

  /**
   * Get query parameter value
   */
  getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Set query parameter
   */
  setQueryParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
  }

  /**
   * Remove query parameter
   */
  removeQueryParam(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.replaceState({}, '', url);
  }

  /**
   * Generate unique ID
   */
  generateId(prefix = 'pf') {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `${prefix}-${timestamp}-${randomStr}`;
  }

  /**
   * Deep clone object
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }

  /**
   * Wait for element to be available
   */
  async waitForElement(selector, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Element ${selector} not found within ${timeout}ms`);
  }

  /**
   * Wait for multiple elements to be available
   */
  async waitForElements(selectors, timeout = 5000) {
    const startTime = Date.now();
    const elements = {};
    
    while (Date.now() - startTime < timeout) {
      let allFound = true;
      
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          elements[selector] = element;
        } else {
          allFound = false;
          break;
        }
      }
      
      if (allFound) {
        return elements;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Not all elements found within ${timeout}ms`);
  }

  /**
   * Create element with attributes
   */
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    // Add children
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });
    
    return element;
  }

  /**
   * Remove element from DOM
   */
  removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Insert element after reference element
   */
  insertAfter(newElement, referenceElement) {
    if (!referenceElement || !referenceElement.parentNode) return;
    
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
  }

  /**
   * Get computed style value
   */
  getComputedStyleValue(element, property) {
    if (!element) return '';
    
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.getPropertyValue(property);
  }

  /**
   * Set CSS custom property
   */
  setCSSProperty(element, property, value) {
    if (!element) return;
    
    element.style.setProperty(property, value);
  }

  /**
   * Get CSS custom property
   */
  getCSSProperty(element, property) {
    if (!element) return '';
    
    return this.getComputedStyleValue(element, property);
  }

  /**
   * Dispatch custom event
   */
  dispatchCustomEvent(element, eventName, detail = {}) {
    if (!element) return;
    
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    
    element.dispatchEvent(event);
  }

  /**
   * Add event listener with automatic cleanup
   */
  addEventListenerWithCleanup(element, event, handler, options = {}) {
    if (!element) return;
    
    element.addEventListener(event, handler, options);
    
    // Return cleanup function
    return () => {
      element.removeEventListener(event, handler, options);
    };
  }

  /**
   * Get component state
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      debounceTimers: this.debounceTimers.size,
      throttleTimers: this.throttleTimers.size
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Clear all timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    
    this.throttleTimers.clear();
    
    // Remove global utils
    if (window.PolarFlowsUtils) {
      delete window.PolarFlowsUtils;
    }
    
    // Reset state
    this.isInitialized = false;
    
    // Utils component destroyed
  }
}

/**
 * Initialize utils component
 */
export async function initUtils() {
  const utils = new Utils();
  return await utils.init();
}
