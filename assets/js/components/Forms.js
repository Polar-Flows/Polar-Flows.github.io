/**
 * Forms Component - Polar Flows
 * Handles form validation, submission, and user feedback
 */

import { CONFIG } from '../constants.js';

export class Forms {
  constructor() {
    this.forms = new Map();
    this.validationRules = new Map();
    this.isInitialized = false;
    
    // Default validation rules
    this.setupDefaultValidationRules();
  }

  /**
   * Initialize the forms component
   */
  async init() {
    try {
      // Find all forms on the page
      this.findForms();
      
      // Set up form validation and submission
      this.setupForms();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Forms component initialized
      
      return this;
      
    } catch (error) {
      console.error('Failed to initialize Forms component:', error);
      throw error;
    }
  }

  /**
   * Set up default validation rules
   */
  setupDefaultValidationRules() {
    this.validationRules.set('name', {
      required: true,
      minLength: CONFIG.VALIDATION.NAME_MIN_LENGTH,
      maxLength: CONFIG.VALIDATION.NAME_MAX_LENGTH,
      pattern: CONFIG.VALIDATION.NAME_PATTERN,
      message: `Please enter a valid name (${CONFIG.VALIDATION.NAME_MIN_LENGTH}-${CONFIG.VALIDATION.NAME_MAX_LENGTH} characters, letters only)`
    });
    
    this.validationRules.set('email', {
      required: true,
      pattern: CONFIG.VALIDATION.EMAIL_PATTERN,
      message: 'Please enter a valid email address'
    });
    
    this.validationRules.set('company', {
      required: false,
      maxLength: CONFIG.VALIDATION.COMPANY_MAX_LENGTH,
      message: `Company name must be less than ${CONFIG.VALIDATION.COMPANY_MAX_LENGTH} characters`
    });
    
    this.validationRules.set('message', {
      required: true,
      minLength: CONFIG.VALIDATION.MESSAGE_MIN_LENGTH,
      maxLength: CONFIG.VALIDATION.MESSAGE_MAX_LENGTH,
      message: `Message must be between ${CONFIG.VALIDATION.MESSAGE_MIN_LENGTH} and ${CONFIG.VALIDATION.MESSAGE_MAX_LENGTH} characters`
    });
    
    this.validationRules.set('phone', {
      required: false,
      pattern: CONFIG.VALIDATION.PHONE_PATTERN,
      message: 'Please enter a valid phone number (Swedish: 07X XXX XX XX or international: +46)'
    });
  }

  /**
   * Find all forms on the page
   */
  findForms() {
    const formElements = document.querySelectorAll('form');
    
    formElements.forEach((form, index) => {
      const formId = form.id || `form-${index}`;
      this.forms.set(formId, form);
    });
  }

  /**
   * Set up forms with validation and submission
   */
  setupForms() {
    for (const [formId, form] of this.forms) {
      this.setupForm(form, formId);
    }
  }

  /**
   * Set up individual form
   */
  setupForm(form, formId) {
    // Skip contact-form as it has its own Logic App submission handler
    if (formId === 'contact-form') {
      // Only set up validation and accessibility, not submission
      this.setupRealTimeValidation(form);
      this.setupFormReset(form);
      this.addAccessibilityAttributes(form);
      return;
    }
    
    // Add form ID if not present
    if (!form.id) {
      form.id = formId;
    }
    
    // Set up form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form, formId);
    });
    
    // Set up real-time validation
    this.setupRealTimeValidation(form);
    
    // Set up form reset
    this.setupFormReset(form);
    
    // Add accessibility attributes
    this.addAccessibilityAttributes(form);
  }

  /**
   * Set up real-time validation
   */
  setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      // Validate on input (for some fields)
      if (input.type === 'email' || input.type === 'text') {
        input.addEventListener('input', () => {
          this.clearFieldError(input);
        });
      }
    });
  }

  /**
   * Set up form reset functionality
   */
  setupFormReset(form) {
    const resetButton = form.querySelector('button[type="reset"]');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        setTimeout(() => {
          this.clearAllErrors(form);
        }, 100);
      });
    }
  }

  /**
   * Add accessibility attributes to form
   */
  addAccessibilityAttributes(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input, index) => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      
      if (label) {
        // Ensure proper labeling
        if (!input.id) {
          input.id = `input-${index}`;
          label.setAttribute('for', input.id);
        }
        
        // Add aria-describedby for error messages
        const errorId = `error-${input.id}`;
        input.setAttribute('aria-describedby', errorId);
      }
    });
  }

  /**
   * Validate a single field
   */
  validateField(field) {
    const fieldName = field.name || field.id;
    const rules = this.validationRules.get(fieldName);
    
    if (!rules) {
      return true; // No validation rules for this field
    }
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check required
    if (rules.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Check min length
    if (isValid && rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `Minimum length is ${rules.minLength} characters`;
    }
    
    // Check max length
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = `Maximum length is ${rules.maxLength} characters`;
    }
    
    // Check pattern
    if (isValid && rules.pattern && !rules.pattern.test(value)) {
      isValid = false;
      errorMessage = rules.message || 'Invalid format';
    }
    
    // Show or hide error
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }
    
    return isValid;
  }

  /**
   * Validate entire form
   */
  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  /**
   * Show field error
   */
  showFieldError(field, message) {
    // Remove existing error
    this.clearFieldError(field);
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.id = `error-${field.id || field.name}`;
    errorElement.textContent = message;
    
    // Add error styling to field
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Insert error after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Announce to screen readers
    this.announceToScreenReader(`Error: ${message}`);
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
    
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  }

  /**
   * Clear all errors in a form
   */
  clearAllErrors(form) {
    const errors = form.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    });
  }

  /**
   * Handle form submission
   */
  async handleFormSubmission(form, formId) {
    try {
      // Validate form
      if (!this.validateForm(form)) {
        this.showFormError(form, 'Please correct the errors above');
        return;
      }
      
      // Show loading state
      this.showFormLoading(form);
      
      // Collect form data
      const formData = this.collectFormData(form);
      
      // Submit form
      await this.submitForm(formData, formId);
      
      // Show success
      this.showFormSuccess(form);
      
      // Reset form
      this.resetForm(form);
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormError(form, 'An error occurred. Please try again.');
    } finally {
      this.hideFormLoading(form);
    }
  }

  /**
   * Collect form data
   */
  collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  /**
   * Submit form data
   */
  async submitForm(data, formId) {
    // For now, we'll use mailto as fallback
    // In a real implementation, this would send to a server
    
    if (formId === 'contact-form') {
      // Create mailto link
      const subject = encodeURIComponent('Contact from Polar Flows Website');
      const body = encodeURIComponent(this.formatEmailBody(data));
      const mailtoLink = `mailto:contact@polarflows.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Also copy to clipboard as fallback
      await this.copyToClipboard(this.formatEmailBody(data));
      
      return { success: true, method: 'mailto' };
    }
    
    // Default success response
    return { success: true };
  }

  /**
   * Format email body
   */
  formatEmailBody(data) {
    return `
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Company: ${data.company || 'Not provided'}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message || 'No message provided'}

---
Sent from Polar Flows website contact form
    `.trim();
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
   * Show form loading state
   */
  showFormLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
    }
  }

  /**
   * Hide form loading state
   */
  hideFormLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = submitButton.getAttribute('data-original-text') || 'Send Message';
    }
  }

  /**
   * Show form success message
   */
  showFormSuccess(form) {
    this.showFormMessage(form, 'Message sent successfully!', 'success');
    
    // Announce to screen readers
    this.announceToScreenReader('Form submitted successfully');
  }

  /**
   * Show form error message
   */
  showFormError(form, message) {
    this.showFormMessage(form, message, 'error');
    
    // Announce to screen readers
    this.announceToScreenReader(`Form error: ${message}`);
  }

  /**
   * Show form message
   */
  showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-${type}`;
    messageElement.textContent = message;
    
    // Insert at top of form
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  /**
   * Reset form
   */
  resetForm(form) {
    form.reset();
    this.clearAllErrors(form);
    
    // Reset any custom styling
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.classList.remove('error', 'success');
      input.setAttribute('aria-invalid', 'false');
    });
  }

  /**
   * Add custom validation rule
   */
  addValidationRule(fieldName, rules) {
    this.validationRules.set(fieldName, {
      ...this.validationRules.get(fieldName),
      ...rules
    });
  }

  /**
   * Remove validation rule
   */
  removeValidationRule(fieldName) {
    this.validationRules.delete(fieldName);
  }

  /**
   * Get form validation state
   */
  getFormValidationState(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    const state = {};
    
    inputs.forEach(input => {
      const fieldName = input.name || input.id;
      state[fieldName] = {
        isValid: !input.classList.contains('error'),
        hasError: input.classList.contains('error'),
        value: input.value,
        errorMessage: input.parentNode.querySelector('.form-error')?.textContent || ''
      };
    });
    
    return state;
  }

  /**
   * Announce to screen readers
   */
  announceToScreenReader(message) {
    // Create or update live region
    let liveRegion = document.getElementById('forms-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'forms-live-region';
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
    
    document.dispatchEvent(event);
  }

  /**
   * Get component state
   */
  getState() {
    return {
      totalForms: this.forms.size,
      validationRules: Object.fromEntries(this.validationRules),
      isInitialized: this.isInitialized
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Remove event listeners from all forms
    for (const [formId, form] of this.forms) {
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.removeEventListener('blur', this.validateField);
        input.removeEventListener('input', this.clearFieldError);
      });
      
      form.removeEventListener('submit', this.handleFormSubmission);
    }
    
    // Clear forms map
    this.forms.clear();
    
    // Reset state
    this.isInitialized = false;
    
    // Forms component destroyed
  }
}

/**
 * Initialize forms component
 */
export async function initForms() {
  const forms = new Forms();
  return await forms.init();
}
