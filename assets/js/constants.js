/**
 * Constants and Configuration - Polar Flows
 * Centralized configuration for animations, timing, and responsive values
 */

export const ANIMATION_CONFIG = {
  // Logo Animation Constants
  DYNAMIC_PERCENTAGE: 0.35,           // Animation speed multiplier
  EARLY_FINISH_PX: 15,                // Animation completion threshold
  PROGRESS_THRESHOLD: 0.99,           // Animation completion threshold (not 1.0)
  
  // Hero Section Constants
  HERO_SECTION_HEIGHT: 800,           // CSS min-height: 800px
  TEXT_PADDING_OFFSET: 100,           // 100px padding above text
  
  // Scroll Thresholds
  SCROLL_INDICATOR_HIDE: 50,          // Hide scroll indicator after 50px scroll
  NAVBAR_SHOW_THRESHOLD: 50,          // Show navbar effects after 50px scroll
  BACK_TO_TOP_THRESHOLD: 300,         // Show back-to-top button after 300px scroll
  
  // Animation Timing
  RESIZE_DEBOUNCE: 100,               // Debounce resize events (reduced from 250ms)
  LOGO_POSITION_DELAY: 200,           // Delay for logo positioning calculations
  SCROLL_INDICATOR_ANIMATION: 20,     // Scroll indicator transform offset
  
  // Background Animation
  MAX_BACKGROUND_OFFSET: 50,          // Maximum background parallax offset
  
  // Logo Sizing
  REFERENCE_LOGO_HEIGHT: 100,         // Fixed reference height to prevent wiggling
  NAVBAR_LOGO_MULTIPLIER: 2.5,        // Navbar logo size multiplier
  MIN_LOGO_SIZE_PERCENT: 8,           // Minimum logo size percentage
};

export const RESPONSIVE_CONFIG = {
  // Logo Sizing
  MOBILE_LOGO_MIN_WIDTH: 350,         // Mobile logo minimum width
  MOBILE_LOGO_MAX_WIDTH: 700,         // Mobile logo maximum width
  
  // Content Constraints
  HERO_CONTENT_MAX_WIDTH: 800,        // Hero content maximum width
  
  // Button Optimization
  BUTTON_GAP_BREAKPOINT_MIN: 300,     // Minimum screen width for button gap optimization
  BUTTON_GAP_BREAKPOINT_MAX: 600,     // Maximum screen width for button gap optimization
  
  // Subtitle Breakpoint
  SUBTITLE_BREAKPOINT: 600,           // Force two-line subtitle below this width
};

export const TIMING_CONFIG = {
  // Animation Delays
  INITIALIZATION_DELAY: 100,          // Initial logo positioning delay
  AUTOFILL_VALIDATION_DELAY: 50,      // Autofill validation delay
  FORM_VALIDATION_DELAY: 200,         // Form validation fallback delay
  
  // Notification Timing
  SUCCESS_NOTIFICATION_DURATION: 5000, // Success notification auto-hide duration
  
  // Scroll Behavior
  SCROLL_PADDING_TOP: 100,            // Scroll padding for navbar offset
};

export const VALIDATION_CONFIG = {
  // Form Validation Rules
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  COMPANY_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
  PHONE_MIN_LENGTH: 7,
  PHONE_MAX_LENGTH: 20,
  
  // Email Validation
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[\+]?[0-9\s\-\(\)]{7,20}$/,
  NAME_PATTERN: /^[a-zA-Z\s'-]+$/,
};

export const SERVICE_WORKER_CONFIG = {
  CACHE_VERSION: 'v1.0.0',
  STATIC_CACHE_NAME: 'polar-flows-static-v1.0.0',
  DYNAMIC_CACHE_NAME: 'polar-flows-dynamic-v1.0.0',
};

export const CONTACT_CONFIG = {
  LOGIC_APP_URL: "https://prod-129.westeurope.logic.azure.com:443/workflows/c7b3bf9aade34af395b1675e1df507ea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wcTbcjNOz3OHrqhvXcr90GkvI8ri7GPOfueMuuC5UyM",
  RESPONSE_TIME_HOURS: 24,
};

// Export all constants as a single object for easy access
export const CONFIG = {
  ANIMATION: ANIMATION_CONFIG,
  RESPONSIVE: RESPONSIVE_CONFIG,
  TIMING: TIMING_CONFIG,
  VALIDATION: VALIDATION_CONFIG,
  SERVICE_WORKER: SERVICE_WORKER_CONFIG,
  CONTACT: CONTACT_CONFIG,
};

// Default export for convenience
export default CONFIG;
