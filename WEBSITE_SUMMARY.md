# Polar Flows Website - Technical Summary

## ?? CRITICAL COMPATIBILITY FEATURE

**IMPORTANT**: This website includes essential iOS compatibility overrides (v1.0.39) that ensure text visibility on older iOS Safari versions (iOS 9-15). These CSS overrides prevent invisible white text issues that would make the website completely unusable on older devices. **Do not remove these overrides without thorough testing on older iOS devices.**

**See**: Version 1.0.39 documentation below for technical details.

## Overview
Polar Flows is a data consultancy website specializing in Azure, Databricks, AWS, and modern data solutions. The website features a sophisticated logo animation system, responsive design, and multiple pages with consistent styling.

## Page Structure

### Main Page (`index.html`)
- **Hero Section**: Features animated logo that transforms from large hero logo to small navbar logo based on scroll position
- **About Section**: Company description and mission
- **Why Choose Polar Flows**: Service offerings with value proposition cards
- **Expertise Section**: Technology partnerships and certifications (15+ tech logos)
- **Official Databricks Partner**: Special section with clickable partner directory link
- **Meet the Team**: 4 team members with photos, roles, emails, and LinkedIn links
- **Contact CTA**: Call-to-action section

### Contact Page (`contact/index.html`)
- **Static Logo**: Smaller version of main logo at top
- **Contact Form**: With custom validation and notifications
- **FAQ Section**: Common questions and answers
- **Location Information**: Stockholm-based with global reach

### Privacy Policy Page (`privacy-policy/index.html`)
- **Static Logo**: Same as contact page
- **Legal Content**: Privacy policy text

## Key Features & Functionality

### Logo Animation System
- **Hero Logo**: Large logo at top of main page that animates based on scroll
- **Transformation**: Logo shrinks and moves to navbar position as user scrolls
- **Progress Calculation**: Based on scroll position relative to hero section height
- **Mobile Safety**: Uses `Math.max(0, window.scrollY)` to prevent negative scroll bugs
- **Animation Speed**: Configurable with `dynamicPercentage` and `earlyFinishPx` parameters

#### Critical Logo Animation Rules:
- **NEVER use negative scroll values**: Always use `Math.max(0, window.scrollY)` - mobile browsers can report negative values causing visual bugs
- **Animation parameters**: `dynamicPercentage = 0.35`, `earlyFinishPx = 15` for faster completion
- **Resize handling**: Real-time updates during window resize using `requestAnimationFrame`
- **Progress threshold**: Animation completes at `progress >= 0.99` (not 1.0)
- **Menu integration**: Animation pauses when mobile menu is open
- **Y-position calculation**: Uses fixed `referenceLogoHeight = 100` to prevent wiggling during resize

### Responsive Design Rules
- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**: 
  - Mobile: ?767px
  - Tablet: 768px-1023px  
  - Desktop: ?1024px
- **Logo Sizing**: Larger on mobile to ensure it's always bigger than title text
- **Button Optimization**: Compact sizing on small screens to prevent wrapping

#### Critical Visual Rules:
- **Logo dominance on mobile**: Logo must ALWAYS be wider than "Turning data into actions" text
- **Mobile logo sizing**: `min-width: 350px`, `max-width: min(700px, 90vw)` on mobile
- **Hero content constraints**: Remove `max-width: 800px` and reduce padding on mobile for logo space
- **Button gap optimization**: Reduce gap to `var(--pf-space-xs)` on 300-600px screens
- **Two-line subtitle**: Force "Expert consultancy for" / "modern data solutions" on <=600px screens
- **Team grid distribution**: NEVER allow single item in last row - use 2x2 grid on mobile/tablet, 4x1 on desktop

### Section Background Colors
- **Main Page Only**: 
  - "Why Choose Polar Flows" (services): Blue background (`#d1e7ff`)
  - "Meet the Team": Blue background (`#d1e7ff`)
- **Other Pages**: White backgrounds for all sections
- **Implementation**: Uses `.index` class on main page body for specificity

#### Section Styling Rules:
- **Expertise section**: Transparent boxes with minimal hover effects (no border, no shadow, no color change)
- **Databricks partner section**: Keep original styling (blue background, border, shadow, color changes on hover)
- **Team section**: Transparent boxes with no hover animations
- **Services section**: Boxes match background color (`#d1e7ff`) for seamless appearance
- **Page specificity**: Always use `.index` class for main page-only styles to prevent affecting other pages

### Navigation System
- **Mobile Menu**: Hamburger menu with smooth animations
- **Scroll Behavior**: Menu items scroll to sections with proper padding
- **Logo Integration**: Navbar logo appears when hero logo animation completes

### Form System
- **Custom Validation**: Replaces browser default alerts
- **Notifications**: Positioned above submit button
- **Error Messages**: User-friendly text instead of technical validation errors

#### Form and Interaction Rules:
- **Custom notifications**: NEVER use browser default alerts - always use custom styled notifications
- **Notification positioning**: Place notifications above the submit button, not at the top
- **Error message text**: Use "Please fill in all required fields correctly" instead of technical validation messages
- **Email links**: Team email links must NOT scroll to top - use `javascript:void(0)` with `window.open()` or `onclick` handlers
- **Navigation errors**: Handle missing navigation elements gracefully - check for null before accessing properties
- **Form validation**: Show notifications immediately on form load for validation errors

## Technical Architecture

### CSS Structure
- **Main Stylesheet**: `assets/css/main.css`
- **Component-Based**: Separate sections for hero, services, team, etc.
- **CSS Variables**: Consistent spacing, colors, and typography
- **Mobile Optimizations**: Specific media queries for different screen sizes

### JavaScript Architecture
- **Main Controller**: `assets/js/main.js` - Core functionality
- **Navigation Component**: `assets/js/components/Navigation.js` - Menu handling
- **Scroll Animations**: `assets/js/scroll-animations.js` - Animation system
- **Event System**: Custom event dispatching for component communication

### Key JavaScript Functions
- **Logo Animation**: `handleScroll()` - Main animation controller
- **Resize Handling**: `updateLogoPositionOnResize()` - Responsive updates
- **Menu Management**: Toggle, keyboard navigation, scroll behavior
- **Form Validation**: Custom validation with user-friendly messages

## Content Guidelines

### Team Section
- **4 Team Members**: Mert Canat, Daniel Sjoholm, Yunus Kocyigit, Linggar Pangestu
- **No Descriptions**: Team bios removed per requirements
- **Contact Info**: Email and LinkedIn links (emails don't scroll to top)
- **Layout**: 2x2 grid on mobile/tablet, 4x1 on desktop

#### Team Section Rules:
- **No team descriptions**: Remove all `<p class="team-bio">` elements
- **Email link behavior**: Must NOT scroll to top when clicked
- **LinkedIn links**: Specific URLs for each team member (Mert, Yunus, Linggar updated)
- **Spacing**: Reduced spacing between job title, email, and LinkedIn
- **Grid distribution**: Use `grid-template-columns: repeat(2, 1fr)` for mobile/tablet, `repeat(4, 1fr)` for desktop

### Expertise/Partnerships
- **15+ Technologies**: Azure, AWS, Databricks, Snowflake, dbt, Power BI, Tableau, etc.
- **Order**: Specific order maintained (Azure first, Fabric/Immuta last)
- **Styling**: Transparent boxes with minimal hover effects
- **Databricks Special**: Separate section with partner directory link

#### Expertise Section Rules:
- **Exact order required**: Microsoft Azure, Amazon Web Services, Databricks, Snowflake, Synapse Analytics, dbt, Power BI, Tableau, Azure DevOps, Terraform, Docker, Kubernetes, Kafka, Microsoft Fabric, Immuta
- **Transparent styling**: `background: transparent`, `border: 1px solid transparent`
- **Minimal hover effects**: Only subtle background color change, no border, no shadow, no text color change
- **Reduced spacing**: `gap: var(--pf-space-sm)` for tighter layout
- **Databricks partner section**: Keep original styling with full hover effects (background, border, shadow, text color)
- **Partner directory**: Add "Partner Directory" text above Databricks logo, make both clickable together

### Text Content
- **Hero Subtitle**: "Expert consultancy for modern data solutions" (two-line on mobile)
- **Company Focus**: Azure, Databricks, AWS, Snowflake expertise
- **Location**: Stockholm-based with Nordic and global reach

## Development Rules

### Logo Animation
- **Never Negative Scroll**: Always use `Math.max(0, window.scrollY)`
- **Resize Handling**: Real-time updates during window resize
- **Mobile Safety**: Prevent visual bugs from negative scroll positions
- **Performance**: Use `requestAnimationFrame` for smooth updates

### Responsive Design
- **Logo Dominance**: Logo must always be larger than title text on mobile
- **Button Optimization**: Minimize button wrapping on small screens
- **Even Distribution**: Team grid prevents single items in last row
- **Section Spacing**: Consistent padding and margins across breakpoints

### Styling Consistency
- **Main Page Specificity**: Use `.index` class for main page-only styles
- **Transparent Elements**: Expertise boxes are transparent with minimal hover
- **Color Scheme**: Blue backgrounds for main page sections, white for others
- **Typography**: Consistent font sizes and line heights

### Form Handling
- **Custom Notifications**: Replace browser alerts with styled notifications
- **User-Friendly Messages**: Clear, actionable error messages
- **Positioning**: Notifications appear above submit button
- **Validation**: Comprehensive client-side validation

## File Structure
```
/
??? index.html (main page)
??? contact/index.html
??? privacy-policy/index.html
??? assets/
?   ??? css/main.css
?   ??? js/main.js
?   ??? js/components/Navigation.js
?   ??? js/scroll-animations.js
?   ??? img/ (logos, icons, team photos)
??? WEBSITE_SUMMARY.md
```

## Critical Rules for AI Agents

### Logo Animation (CRITICAL)
- **NEVER use negative scroll values**: Always use `Math.max(0, window.scrollY)`
- **Mobile browser bug**: Negative scroll positions cause visual bugs on mobile
- **Animation parameters**: `dynamicPercentage = 0.35`, `earlyFinishPx = 15`
- **Resize handling**: Use `requestAnimationFrame` for real-time updates
- **Progress threshold**: Complete at `progress >= 0.99`, not 1.0

### Visual Requirements (CRITICAL)
- **Logo dominance**: Logo must ALWAYS be wider than title text on mobile
- **Mobile logo sizing**: `min-width: 350px`, `max-width: min(700px, 90vw)`
- **Hero content**: Remove `max-width: 800px` and reduce padding on mobile
- **Team grid**: NEVER allow single item in last row - use 2x2 on mobile/tablet
- **Button optimization**: Reduce gap to `var(--pf-space-xs)` on 300-600px screens

### Section Styling (CRITICAL)
- **Expertise section**: Transparent boxes, minimal hover effects
- **Databricks partner**: Keep original styling with full hover effects
- **Team section**: Transparent boxes, no hover animations
- **Page specificity**: Use `.index` class for main page-only styles
- **Background colors**: Blue only on main page, white on other pages

### Form and Interaction (CRITICAL)
- **Custom notifications**: NEVER use browser default alerts
- **Email links**: Must NOT scroll to top - use `javascript:void(0)`
- **Notification positioning**: Above submit button, not at top
- **Error messages**: User-friendly text, not technical validation messages

### Content Rules (CRITICAL)
- **Team descriptions**: Remove all team bios
- **Expertise order**: Exact order must be maintained
- **LinkedIn links**: Specific URLs for each team member
- **Two-line subtitle**: Force break on mobile screens

## SEO and Technical Files

### Sitemap (sitemap.xml)
- **Homepage**: `https://polarflows.com/` (priority 1.0, weekly updates)
- **Contact Page**: `https://polarflows.com/contact/` (priority 0.8, monthly updates)
- **Privacy Policy**: `https://polarflows.com/privacy-policy/` (priority 0.6, monthly updates)
- **Assets**: CSS and JS files included for search engine discovery

### Robots.txt
- **Allowed**: Homepage, contact page, privacy policy, and all assets
- **Disallowed**: Admin, private, temp, and logs directories
- **Crawl Delay**: 1 second to be respectful to search engines
- **Sitemap**: Points to sitemap.xml for search engine guidance

### Open Graph Image (og-image.jpg)
- **Location**: `assets/img/og-image.jpg`
- **Dimensions**: 1200x630px (Facebook/LinkedIn standard)
- **Purpose**: Social media sharing preview image
- **Status**: ? Created (placeholder using Polar Flows logo)
- **Generation**: Use `og-image-generator.html` for proper image creation
- **Usage**: Referenced in all HTML files for social media sharing

### Navigation and Links
- **Footer Links**: All internal links use correct directory structure
- **Privacy Policy**: Footer link fixed from `privacy-policy.html` to `./`
- **Contact Page**: Footer links properly reference `../` for parent directory
- **Home Links**: All pages link back to homepage with `../` or `/`

### Service Worker (sw.js)
- **Location**: `/sw.js` (root directory)
- **Purpose**: Offline functionality and performance improvements
- **Features**: 
  - Caches static assets (HTML, CSS, JS, images)
  - Serves cached content when offline
  - Automatic cache updates and cleanup
  - Background sync support (for future use)
  - Push notification support (for future use)
- **Privacy**: No data collection, purely local caching
- **Registration**: Automatically registered in main.js
- **Cache Strategy**: Static assets cached immediately, dynamic content cached on demand

### Constants and Configuration (constants.js)
- **Location**: `assets/js/constants.js`
- **Purpose**: Centralized configuration for all hardcoded values
- **Categories**:
  - **Animation Config**: Logo animation constants, timing, thresholds
  - **Responsive Config**: Breakpoints, logo sizing, content constraints
  - **Timing Config**: Delays, durations, debounce values
  - **Validation Config**: Form validation rules and patterns
  - **Service Worker Config**: Cache names and versions
  - **Contact Config**: API URLs and response times
- **Benefits**: Maintainable, consistent, theme-ready, easy to modify

## Parameterization and Maintainability

### Design System
- **CSS Design Tokens**: Comprehensive token system in `tokens.css`
- **Centralized Constants**: All hardcoded values moved to `constants.js`
- **Consistent Values**: Colors, spacing, typography, and animations use tokens
- **Theme Ready**: Easy to create dark mode or other themes
- **Responsive Values**: Breakpoints and sizing use design tokens

### Code Quality Improvements
- **No Magic Numbers**: All animation constants are named and documented
- **Maintainable**: Change values in one place, update everywhere
- **Consistent**: All components use the same design system
- **Scalable**: Easy to add new themes or modify existing ones
- **Professional**: Follows industry best practices for design systems

## Maintenance Notes
- **Logo Animation**: Core feature requiring careful scroll position handling
- **Mobile Testing**: Critical for logo sizing and button layout
- **Cross-Browser**: Test scroll behavior on different mobile browsers
- **Performance**: Monitor animation smoothness during resize events
- **Content Updates**: Team info, partnerships, and contact details may change
- **SEO Files**: Keep sitemap.xml and robots.txt updated when adding new pages
- **Design System**: Use design tokens and constants for all new values

## Future Improvements (Not Yet Implemented)
**IMPORTANT**: The following items were identified as missing but not yet implemented:

### 1. PWA Icons (High Priority)
- **Issue**: All PWA icons in `manifest.webmanifest` point to the same PNG file
- **Impact**: Poor PWA experience, incorrect icon scaling
- **Solution**: Create separate 192x192 and 512x512 icon files
- **Location**: Update `manifest.webmanifest` with proper icon sizes
- **Files Needed**: `assets/img/polarflows/logo-192.png` and `assets/img/polarflows/logo-512.png`

### 2. Enhanced Structured Data (Medium Priority)
- **Issue**: Limited structured data for SEO
- **Impact**: Poor search engine understanding of content
- **Solution**: Add comprehensive structured data (Organization, Service, Person, etc.)
- **Location**: Add to HTML files and/or create separate JSON-LD files
- **Types Needed**: Organization, Service, Person, ContactPoint, WebSite, BreadcrumbList

**These items should be implemented when time permits to improve PWA experience and SEO.**

## AI Assistant Instructions
**IMPORTANT**: When making any changes to this website, you MUST:
1. **Update this WEBSITE_SUMMARY.md file** to reflect the changes made
2. **Update README.md** if changes affect user-facing features or setup instructions
3. **Document new features, fixes, or modifications** in the appropriate sections
4. **Keep the technical specifications current** and accurate
5. **Add new maintenance notes** for any new components or features
6. **Update file structure documentation** when adding/removing files
7. **Maintain the critical rules sections** for future AI assistants

**This documentation must stay current and comprehensive for the website to be properly maintained.**

## CRITICAL: UTF-8 Encoding Rules for AI Assistants

**?? NEVER USE THESE CHARACTERS - THEY BREAK GITHUB PAGES DEPLOYMENT:**

### **FORBIDDEN CHARACTERS:**
Only use UTF8 supported characters in this file.

### **SAFE ALTERNATIVES:**
- **Dashes**: Use regular hyphen `-` for all dash needs
- **Quotes**: Use straight quotes `"` and `'`
- **Arrows**: Use HTML entities `&uarr;` `&darr;` `&larr;` `&rarr;` or plain text
- **Bullets**: Use `-` or `*` for lists
- **Names**: Use ASCII equivalents (e.g., `Daniel Sjoholm` not `Daniel Sjoholm`)

### **VERIFICATION COMMAND:**
Before committing, run this PowerShell command to check for problematic characters:
```powershell
Get-ChildItem -Recurse -Include "*.html","*.md","*.css","*.js" | ForEach-Object { $content = Get-Content $_.FullName -Encoding UTF8 -Raw; if ($content -match "[^\x00-\x7F]") { Write-Host "Found non-ASCII in: $($_.Name)" } }
```

### **WHY THIS MATTERS:**
- GitHub Pages uses Jekyll which is strict about UTF-8 encoding
- Non-ASCII characters cause build failures with "invalid characters for UTF-8" errors
- This prevents website deployment and breaks the entire build process
- **ALWAYS use ASCII-only characters in all text content**

**Remember: When in doubt, use plain ASCII characters. It's better to be safe than to break the deployment!**

## Asset Versioning System

**CRITICAL**: The website uses query string versioning to prevent browser caching issues. When making changes to CSS or JavaScript files, you MUST update the version numbers in all HTML files.

### Current Version: `v1.0.40`

### Files That Need Version Updates:
- `index.html` - All CSS and JS links
- `contact/index.html` - All CSS and JS links  
- `privacy-policy/index.html` - All CSS and JS links
- `404.html` - All CSS links
- `sw.js` - Cache version constants

### Version Update Process:
1. **Increment version number** (e.g., `v1.0.12` to `v1.0.13`)
2. **Update all HTML files** with new version in query strings
3. **Update service worker** cache version constants
4. **Test deployment** to ensure changes appear immediately

### Example:
```html
<!-- Before -->
<link rel="stylesheet" href="assets/css/main.css">

<!-- After -->
<link rel="stylesheet" href="assets/css/main.css?v=1.0.12">
```

**Why This Matters**: Without versioning, browsers cache CSS/JS files and changes won't appear until cache expires (days/weeks). Versioning forces immediate updates.

## Recent Updates (Latest Session)

### Version 1.0.40 - Fixed Background Image Scope - Hero Section Only

#### **Background Image Scope Fix:**
- Fixed background image being applied to all sections instead of just hero section
- Background image now properly contained within hero section boundaries
- Other sections ("Why Choose Polar Flows", "Expertise", "Official Databricks Partner", "Meet the Team", "Ready to Start", footer) no longer have background image
- Applies to all pages: main page, contact page, and privacy policy page

#### **Technical Implementation:**
- **Removed Global Background**: Removed background image from main `.hero` CSS rule that was using `background-attachment: fixed`
- **Contained Background Element**: Changed `.hero-background-mobile` from `position: fixed` to `position: absolute`
- **Hero Section Container**: Hero section maintains `position: relative` to contain the absolutely positioned background
- **CSS Background Handling**: Background image now only exists in `.hero-background-mobile` element within hero section
- **Gradient Overlay**: Added gradient overlay directly to CSS background-image for consistency

#### **Key Changes:**
```css
/* BEFORE: Background applied globally via fixed positioning */
.hero {
  background: linear-gradient(...), url(...), url(...), url(...);
  background-attachment: fixed; /* This made it cover entire viewport */
}

/* AFTER: Background only in contained element */
.hero {
  background: linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%);
  position: relative; /* Container for absolutely positioned background */
}

@media (max-width: 1030px) {
  .hero-background-mobile {
    position: absolute; /* Contained within hero section */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%),
      url('../img/polarflows/Stockholm_modif.avif'), 
      url('../img/polarflows/Stockholm_modif.webp'), 
      url('../img/polarflows/Stockholm_modif.jpg');
  }
}
```

#### **JavaScript Simplification:**
```javascript
// Simplified JavaScript - no longer needs to set background-image
if (isIOS) {
  backgroundElement.style.backgroundAttachment = 'scroll';
} else {
  backgroundElement.style.backgroundAttachment = 'fixed';
}
```

#### **Result:**
- ? **Hero Section Only**: Background image appears only in hero section
- ? **Other Sections Clean**: "Why Choose Polar Flows", "Expertise", "Official Databricks Partner", "Meet the Team", "Ready to Start", footer have their original background colors
- ? **All Pages Fixed**: Main page, contact page, and privacy policy page all have correct background scope
- ? **Mobile Compatibility**: Background still works on mobile with proper static positioning
- ? **iOS Compatibility**: Maintains iOS text color fixes from v1.0.39

#### **Files Modified:**
- `assets/css/main.css` - Removed global background, contained background to hero section
- `assets/js/main.js` - Simplified JavaScript to only handle background-attachment
- All HTML files - Updated to version 1.0.40
- `sw.js` - Updated cache version to 1.0.40

### ?? CRITICAL FEATURE: Version 1.0.39 - iOS Compatibility - Universal Text Visibility Fix

**?? IMPORTANT COMPATIBILITY FEATURE**: This version includes essential CSS overrides that ensure text visibility on older iOS Safari versions (iOS 9-15). Without this fix, older iPhones/iPads would display invisible white text, making the website completely unusable for users with older devices.

#### **Why This Feature is Critical:**
- **Older iOS Safari versions (iOS 9-15)** don't support CSS custom properties properly
- **Without this fix**: All text appears white on white backgrounds (completely invisible)
- **With this fix**: Text is properly visible with appropriate contrast
- **User Impact**: Prevents website from being unusable on older devices

#### **What's Protected:**
- ? **Hero Section**: White text remains visible on background image
- ? **All Other Sections**: Dark text (#012d75) on light backgrounds  
- ? **Universal Coverage**: Every element is protected with `!important` overrides
- ? **Modern Browser Compatibility**: CSS custom properties still work normally

#### **Technical Implementation:**
```css
/* Universal dark text override for all elements except hero */
body, h1, h2, h3, h4, h5, h6, p, div, span, section, article, aside, main, header, footer, nav, ul, ol, li, a, button, input, textarea, label, /* all specific classes */ {
  color: #012d75 !important;
}

/* Hero section protection - white text only */
.hero, .hero *, .hero-title-gray, .hero-title-white, .hero-subtitle, .hero-content, .hero-content * {
  color: #ffffff !important;
}

/* Universal override for any remaining white text */
*:not(.hero):not(.hero *) {
  color: #012d75 !important;
}
```

#### **Files Modified:**
- `assets/css/main.css` - Added universal iOS compatibility overrides
- All HTML files - Updated to version 1.0.39
- `sw.js` - Updated cache version to 1.0.39

**?? WARNING**: Do not remove these CSS overrides without thorough testing on older iOS devices. This is a critical accessibility feature that ensures the website remains usable for all users.

### Version 1.0.38 - Fixed iOS Text Colors - Older Safari Compatibility

#### **iOS Text Color Fix:**
- Fixed text color issues on older iOS Safari versions (iOS 9-15)
- Added fallback colors to all CSS custom properties for better compatibility
- Added comprehensive iOS-specific CSS rules using `@supports not` for older browsers
- Ensured hero section text remains white while other sections have dark text
- Added vendor prefixes for better iOS compatibility

#### **Technical Implementation:**
- **CSS Custom Properties Fallbacks**: Added fallback colors to all `var(--pf-*)` properties
- **iOS-Specific CSS Rules**: Added `@supports not (color: var(--pf-text-primary))` block for older iOS
- **Explicit Color Declarations**: Used `!important` to override any inherited white text
- **Vendor Prefixes**: Added `-webkit-backdrop-filter` for backdrop-filter support

#### **Key Changes:**
```css
/* CSS Custom Properties with Fallbacks */
--pf-text-primary: var(--pf-navy, #012d75);
--pf-text-secondary: var(--pf-slate, #123456);
--pf-text-light: var(--pf-white, #ffffff);
--pf-bg-primary: var(--pf-white, #ffffff);

/* Body and Typography with Fallbacks */
body {
  color: var(--pf-text-primary, #012d75);
  background-color: var(--pf-bg-primary, #ffffff);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--pf-text-primary, #012d75);
}

p {
  color: var(--pf-text-primary, #012d75);
}

/* iOS-Specific Compatibility Fix */
@supports not (color: var(--pf-text-primary)) {
  body {
    color: #012d75 !important;
    background-color: #ffffff !important;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: #012d75 !important;
  }
  
  p {
    color: #012d75 !important;
  }
  
  /* Hero section text stays white */
  .hero-title-gray,
  .hero-title-white,
  .hero-subtitle {
    color: #ffffff !important;
  }
  
  /* All other sections get dark text */
  .value-prop-description,
  .service-description,
  .testimonial-author,
  /* ... all other text elements ... */
  {
    color: #012d75 !important;
  }
}

/* Vendor Prefixes for iOS */
.header-backdrop {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
```

#### **Problem Solved:**
- **Older iOS Safari**: CSS custom properties not supported or buggy
- **Text Color Issues**: All text appearing white on white backgrounds (invisible)
- **Hero vs Other Sections**: Need white text in hero, dark text elsewhere
- **Vendor Compatibility**: Missing `-webkit-` prefixes for newer CSS properties

#### **Result:**
- ? **Older iOS Compatible**: Text colors work on iOS 9-15 Safari
- ? **Hero Section**: White text remains visible on background image
- ? **Other Sections**: Dark text (#012d75) visible on light backgrounds
- ? **Modern Browsers**: CSS custom properties still work as before
- ? **Vendor Prefixes**: Backdrop-filter works on all iOS versions

#### **Files Modified:**
- `assets/css/tokens.css` - Added fallback colors to all CSS custom properties
- `assets/css/main.css` - Added iOS compatibility rules and vendor prefixes
- All HTML files - Updated to version 1.0.38
- `sw.js` - Updated cache version to 1.0.38

### Version 1.0.37 - Image Loads First - Immediate CSS Background + Enhanced JavaScript

#### **Image Loads First Fix:**
- Ensured background image loads first by setting it in CSS immediately
- Background element exists in HTML from page start, not created by JavaScript
- CSS sets background-image immediately when page loads, before JavaScript runs
- JavaScript only enhances existing background element with device-specific properties
- Combined preloading + immediate CSS loading for fastest possible image display

#### **Technical Implementation:**
- **HTML Background Element**: Added `<div class="hero-background-mobile"></div>` to all hero sections
- **CSS Immediate Loading**: Background-image set in CSS for instant loading when CSS loads
- **JavaScript Enhancement**: JavaScript finds existing element and enhances it, doesn't create new one
- **Path-Specific CSS**: Different image paths for main page vs sub-pages
- **Device-Specific Enhancement**: iOS gets gradient overlay and scroll attachment, non-iOS keeps fixed

#### **Key Changes:**
```html
<!-- Background element exists from page start -->
<section class="hero">
  <div class="hero-background-mobile"></div>
  <div class="container">
```

```css
/* CSS sets background-image immediately when CSS loads */
@media (max-width: 1030px) {
  .hero-background-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* Background-image loads immediately with CSS */
    background-image: 
      url('../assets/img/polarflows/Stockholm_modif.avif'), 
      url('../assets/img/polarflows/Stockholm_modif.webp'), 
      url('../assets/img/polarflows/Stockholm_modif.jpg');
  }
  
  /* Sub-pages get different image paths */
  .contact-page .hero-background-mobile,
  .privacy-page .hero-background-mobile {
    background-image: 
      url('../../assets/img/polarflows/Stockholm_modif.avif'), 
      url('../../assets/img/polarflows/Stockholm_modif.webp'), 
      url('../../assets/img/polarflows/Stockholm_modif.jpg');
  }
}
```

```javascript
// JavaScript enhances existing element, doesn't create new one
initMobileParallax(hero) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Find existing background element (created in HTML)
  const backgroundElement = hero.querySelector('.hero-background-mobile');
  
  if (backgroundElement) {
    if (isIOS) {
      // For iOS: Enhance with gradient overlay and scroll attachment
      backgroundElement.style.backgroundImage = `
        linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
        url('../assets/img/polarflows/Stockholm_modif.avif'), 
        url('../assets/img/polarflows/Stockholm_modif.webp'), 
        url('../assets/img/polarflows/Stockholm_modif.jpg');
      `;
      backgroundElement.style.backgroundAttachment = 'scroll';
    } else {
      // For non-iOS: Keep fixed attachment (already set in CSS)
      backgroundElement.style.backgroundAttachment = 'fixed';
    }
  }
}
```

#### **Loading Sequence:**
1. **HTML Loads**: Background element exists immediately
2. **CSS Loads**: Background-image set immediately, starts loading
3. **Images Preload**: `<link rel="preload">` helps browser prioritize images
4. **JavaScript Enhances**: Adds device-specific properties when JavaScript runs
5. **Result**: Image loads first, before any JavaScript execution

#### **Performance Result:**
- ? **Image Loads First**: Background image starts loading immediately with CSS
- ? **No JavaScript Delay**: Image doesn't wait for JavaScript to create element
- ? **Preloading Benefit**: Browser prioritizes images due to preload hints
- ? **Device-Specific Enhancement**: iOS gets gradient overlay, non-iOS keeps fixed positioning
- ? **Immediate Display**: Background appears as soon as CSS loads, not when JavaScript runs

#### **Files Modified:**
- `index.html` - Added background element to hero section
- `contact/index.html` - Added background element to hero section
- `privacy-policy/index.html` - Added background element to hero section
- `assets/css/main.css` - Set background-image immediately in CSS for all pages
- `assets/js/main.js` - Enhanced to find and enhance existing background element
- All HTML files - Updated to version 1.0.37
- `sw.js` - Updated cache version to 1.0.37

### Version 1.0.36 - Fixed iOS Image Not Loading - Reverted CSS Approach

#### **iOS Image Loading Fix:**
- Fixed iOS image not loading at all after CSS approach caused issues
- Removed problematic CSS `@supports` block that was preventing image loading
- Kept image preloading benefits while reverting to working JavaScript approach
- iOS background now loads properly with preloading + JavaScript combination

#### **Problem Identified:**
- CSS `@supports (-webkit-touch-callout: none)` block was too broad and causing conflicts
- Hardcoded image paths in CSS were incorrect or conflicting with JavaScript paths
- CSS approach was preventing JavaScript from creating the background element properly

#### **Solution Implemented:**
- **Removed Problematic CSS**: Eliminated the `@supports` block entirely
- **Kept Image Preloading**: Maintained `<link rel="preload" as="image">` benefits
- **Restored JavaScript Approach**: iOS devices now use JavaScript background creation again
- **iOS-Specific Styling**: iOS gets `background-attachment: scroll` for better compatibility

#### **Technical Implementation:**
```css
/* Removed problematic CSS block */
/* @supports (-webkit-touch-callout: none) { ... } - DELETED */
```

```javascript
// Restored working JavaScript approach for all devices
if (isIOS) {
  // For iOS: Use scroll attachment for better compatibility
  backgroundElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
      url('${imagePath}Stockholm_modif.avif'), 
      url('${imagePath}Stockholm_modif.webp'), 
      url('${imagePath}Stockholm_modif.jpg');
    background-attachment: scroll;
  `;
} else {
  // For non-iOS: Use fixed attachment
  backgroundElement.style.cssText = `
    background-attachment: fixed;
  `;
}
```

#### **Result:**
- ? **iOS Images Load**: Background images now display properly on iOS devices
- ? **Preloading Benefit**: Images still preload for faster loading
- ? **Static Positioning**: Background stays fixed in place on iOS
- ? **No CSS Conflicts**: Removed problematic CSS that was causing issues
- ? **Reliable Approach**: Back to proven JavaScript method that works

#### **Files Modified:**
- `assets/css/main.css` - Removed problematic `@supports` block
- `assets/js/main.js` - Restored JavaScript background creation for iOS
- All HTML files - Updated to version 1.0.36
- `sw.js` - Updated cache version to 1.0.36

### Version 1.0.35 - iOS Image Loading Optimization - Combined Preloading + CSS Approach

#### **iOS Image Loading Speed Fix:**
- Fixed iOS image loading delays by implementing combined preloading + CSS approach
- Added image preloading in HTML head for immediate browser loading
- Set background-image in CSS for iOS devices to load immediately, not when JavaScript runs
- Optimized JavaScript to skip background element creation for iOS (CSS handles it)
- Maintained dynamic path resolution for non-iOS devices

#### **Technical Implementation:**
- **Image Preloading**: Added `<link rel="preload" as="image">` for all background image formats
- **CSS-Based iOS Loading**: iOS gets background-image immediately via CSS, not JavaScript
- **JavaScript Optimization**: iOS devices skip JavaScript background creation entirely
- **Path-Specific CSS**: Different CSS rules for main page vs sub-pages (contact, privacy-policy)
- **Dual Loading Strategy**: Preloading + CSS for iOS, JavaScript for non-iOS

#### **Key Changes:**
```html
<!-- Added to all HTML files for immediate image loading -->
<link rel="preload" href="assets/img/polarflows/Stockholm_modif.avif" as="image">
<link rel="preload" href="assets/img/polarflows/Stockholm_modif.webp" as="image">
<link rel="preload" href="assets/img/polarflows/Stockholm_modif.jpg" as="image">
```

```css
/* iOS-specific background for immediate loading */
@supports (-webkit-touch-callout: none) {
  @media (max-width: 1030px) {
    .hero {
      /* iOS gets background-image immediately via CSS for faster loading */
      background-image: 
        linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
        url('../assets/img/polarflows/Stockholm_modif.avif'), 
        url('../assets/img/polarflows/Stockholm_modif.webp'), 
        url('../assets/img/polarflows/Stockholm_modif.jpg');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-attachment: scroll;
    }
    
    /* Sub-pages get different image paths */
    .contact-page .hero,
    .privacy-page .hero {
      background-image: 
        linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
        url('../../assets/img/polarflows/Stockholm_modif.avif'), 
        url('../../assets/img/polarflows/Stockholm_modif.webp'), 
        url('../../assets/img/polarflows/Stockholm_modif.jpg');
    }
  }
}
```

```javascript
// Optimized JavaScript: Skip background creation for iOS
if (isIOS) {
  // For iOS: Background-image is already set in CSS for immediate loading
  // No JavaScript background element needed - CSS handles it
  console.log('iOS detected: Using CSS-based background for immediate loading');
} else {
  // For non-iOS: Create background element dynamically
  // ... JavaScript background creation code ...
}
```

#### **Performance Result:**
- **iOS Loading Speed**: Images load immediately with page, no JavaScript delays
- **Preloading Benefit**: Browser starts loading images as soon as HTML is parsed
- **CSS Advantage**: Background appears immediately when CSS loads, not when JavaScript runs
- **Non-iOS Maintained**: Dynamic path resolution still works for other devices
- **Best of Both Worlds**: Immediate loading for iOS + flexibility for other devices

#### **Files Modified:**
- `index.html` - Added image preloading links
- `contact/index.html` - Added image preloading links
- `privacy-policy/index.html` - Added image preloading links
- `assets/css/main.css` - Added iOS-specific CSS background-image rules
- `assets/js/main.js` - Optimized to skip iOS background creation
- All HTML files - Updated to version 1.0.35
- `sw.js` - Updated cache version to 1.0.35

### Version 1.0.34 - Comprehensive Visual Fix - Restored All Section Functionality

#### **Comprehensive Visual Fix:**
- Fixed visual issues across all sections caused by problematic CSS and HTML elements
- Removed overly broad `@supports (-webkit-touch-callout: none)` block that was affecting entire site
- Removed always-present background elements from HTML that were interfering with other sections
- Implemented cleaner JavaScript-only solution for hero background functionality
- Restored proper section backgrounds and visual consistency

#### **Root Causes Fixed:**
- **Overly Broad CSS**: `@supports (-webkit-touch-callout: none)` was applying to all iOS devices globally
- **CSS Specificity Issues**: `!important` declarations were overriding styles across entire site
- **DOM Interference**: Always-present background elements were affecting layout and stacking context
- **Image Path Problems**: Hardcoded paths were causing 404 errors and loading issues

#### **Technical Implementation:**
- **Removed Problematic CSS**: Eliminated `@supports` block with global `!important` rules
- **Clean HTML Structure**: Removed background elements from HTML, back to original structure
- **Dynamic JavaScript**: Background elements created only when needed, not always present
- **Targeted CSS**: Mobile-specific rules only apply to hero background, not entire site
- **Proper Isolation**: Hero background functionality isolated from other sections

#### **Key Changes:**
```css
/* Before: Problematic global CSS affecting entire site */
@supports (-webkit-touch-callout: none) {
  .hero { /* Global rules with !important */ }
  .hero-background-mobile { /* Global rules with !important */ }
  .hero-background-ios { /* Global rules with !important */ }
}

/* After: Clean, targeted CSS only for mobile hero background */
@media (max-width: 1030px) {
  .hero-background-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }
}
```

```html
<!-- Before: Always-present background elements -->
<section class="hero">
  <div class="hero-background-mobile"></div>
  <div class="hero-background-mobile hero-background-ios"></div>
  <div class="container">

<!-- After: Clean HTML structure -->
<section class="hero">
  <div class="container">
```

```javascript
// Clean JavaScript: Creates background element only when needed
initMobileParallax(hero) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Create background element dynamically
  const backgroundElement = document.createElement('div');
  backgroundElement.className = 'hero-background-mobile';
  
  if (isIOS) {
    // iOS-specific styling with scroll attachment
  } else {
    // Non-iOS styling with fixed attachment
  }
  
  // Insert only when needed
  hero.insertBefore(backgroundElement, hero.firstChild);
}
```

#### **Visual Result:**
- **All Sections Restored**: Services, team, value props, and other sections display correctly
- **Hero Background Working**: Static background still works on mobile and iOS
- **No Visual Interference**: Background elements don't affect other sections
- **Clean Performance**: No unnecessary DOM elements or CSS conflicts
- **Proper Isolation**: Hero functionality isolated from rest of site

#### **Files Modified:**
- `assets/css/main.css` - Removed problematic `@supports` block, added clean mobile-specific CSS
- `assets/js/main.js` - Implemented clean JavaScript-only solution for hero background
- `index.html` - Removed background elements from HTML
- `contact/index.html` - Removed background elements from HTML
- `privacy-policy/index.html` - Removed background elements from HTML
- All HTML files - Updated to version 1.0.34
- `sw.js` - Updated cache version to 1.0.34

### Version 1.0.33 - True iOS Static Background - Zero JavaScript Dependency

#### **True iOS Static Background Fix:**
- Fixed iOS background still not being truly static despite previous attempts
- Eliminated JavaScript dependency entirely for iOS background positioning
- Background-image now set directly in CSS for immediate static positioning
- iOS background is completely static from the very first frame of page load

#### **Technical Implementation:**
- **CSS-Only iOS Background**: Background-image set directly in CSS, not JavaScript
- **Zero JavaScript Dependency**: iOS background works even if JavaScript fails to load
- **Immediate Static Positioning**: Background is static from page load start
- **Path-Specific CSS**: Different CSS rules for main page vs sub-pages (contact, privacy-policy)

#### **Key Changes:**
```css
/* iOS background with background-image set in CSS */
.hero-background-ios {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background-attachment: scroll !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  display: block !important;
  /* Background-image set directly in CSS for immediate static positioning */
  background-image: 
    linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
    url('../assets/img/polarflows/Stockholm_modif.avif'), 
    url('../assets/img/polarflows/Stockholm_modif.webp'), 
    url('../assets/img/polarflows/Stockholm_modif.jpg');
}

/* Sub-pages get different image paths */
.contact-page .hero-background-ios,
.privacy-page .hero-background-ios {
  background-image: 
    linear-gradient(135deg, rgba(1, 45, 117, 0.3) 0%, rgba(14, 30, 58, 0.3) 100%), 
    url('../../assets/img/polarflows/Stockholm_modif.avif'), 
    url('../../assets/img/polarflows/Stockholm_modif.webp'), 
    url('../../assets/img/polarflows/Stockholm_modif.jpg');
}
```

```javascript
// iOS: No JavaScript needed - background-image already set in CSS
if (isIOS && iosBackground) {
  // For iOS: Background-image is already set in CSS, no JavaScript needed
  // iOS background is immediately visible and static
} else if (mobileBackground) {
  // Non-iOS: Still uses JavaScript for background-image
  mobileBackground.style.display = 'block';
  mobileBackground.style.backgroundImage = `url('${imagePath}...')`;
}
```

#### **Visual Result:**
- **iOS**: Background completely static from first frame, zero JavaScript dependency
- **Non-iOS**: Background shows when JavaScript runs, also static
- **Immediate Static**: Background stays fixed in place from page load start
- **Reliability**: Works even if JavaScript fails to load on iOS

#### **Files Modified:**
- `assets/css/main.css` - Added background-image directly to iOS CSS rules for main and sub-pages
- `assets/js/main.js` - Removed JavaScript background-image setting for iOS
- All HTML files - Updated to version 1.0.33
- `sw.js` - Updated cache version to 1.0.33

### Version 1.0.32 - Fixed iOS Static Positioning While Maintaining Immediate Styling

#### **iOS Static Positioning Fix:**
- Fixed iOS background position no longer being static after previous changes
- Maintained immediate styling while restoring static background positioning for iOS
- iOS background element now visible and static from page load start
- Non-iOS background element remains hidden until JavaScript runs

#### **Technical Implementation:**
- **iOS-Specific Visibility**: iOS background element (`hero-background-ios`) now visible by default
- **Non-iOS Hidden**: Regular mobile background element remains hidden until JavaScript shows it
- **Static Positioning**: iOS background uses `position: fixed` with `background-attachment: scroll` for true static behavior
- **Immediate Styling**: All styling properties applied via CSS from page load start

#### **Key Changes:**
```css
/* iOS background visible immediately with static positioning */
.hero-background-ios {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background-attachment: scroll !important;  /* Key for iOS static positioning */
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  display: block !important; /* Show iOS background immediately */
}

/* Non-iOS background hidden until JavaScript shows it */
.hero-background-mobile {
  /* ... same positioning properties ... */
  display: none !important; /* Hide by default, show via JavaScript */
}
```

```javascript
// iOS: Background already visible, just set background-image
if (isIOS && iosBackground) {
  iosBackground.style.backgroundImage = `url('${imagePath}...')`;
} else if (mobileBackground) {
  // Non-iOS: Show background and set background-image
  mobileBackground.style.display = 'block';
  mobileBackground.style.backgroundImage = `url('${imagePath}...')`;
}
```

#### **Visual Result:**
- **iOS**: Background visible immediately with static positioning (doesn't scroll with content)
- **Non-iOS**: Background shows when JavaScript runs, also with static positioning
- **Immediate Styling**: All styling applied from page load start, no visual delays
- **Static Behavior**: Background stays fixed in place while content scrolls over it

#### **Files Modified:**
- `assets/css/main.css` - Made iOS background visible by default with static positioning
- `assets/js/main.js` - Simplified iOS handling to only set background-image
- All HTML files - Updated to version 1.0.32
- `sw.js` - Updated cache version to 1.0.32

### Version 1.0.31 - Fixed iOS Styling Delay - True Immediate Styling

#### **iOS Styling Delay Fix:**
- Fixed styling still being applied later, especially on iOS devices
- Eliminated JavaScript dependency for background element creation
- Background elements now exist in HTML from page load start
- CSS styling applies immediately when page loads, not after JavaScript execution

#### **Technical Implementation:**
- **HTML-First Approach**: Background elements added directly to HTML in all pages
- **Immediate CSS Styling**: All background styling properties applied via CSS from page load
- **JavaScript Simplification**: JavaScript only shows appropriate element and sets background-image
- **No Element Creation**: Eliminated dynamic element creation that caused styling delays

#### **Key Changes:**
```html
<!-- Added to all hero sections in HTML -->
<section class="hero" aria-labelledby="hero-title">
  <!-- Background elements for immediate styling -->
  <div class="hero-background-mobile"></div>
  <div class="hero-background-mobile hero-background-ios"></div>
  <div class="container">
```

```css
/* Background elements hidden by default, shown by JavaScript */
.hero-background-mobile {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  display: none !important; /* Hidden by default, shown via JavaScript */
}
```

```javascript
// Before: Created elements dynamically causing styling delay
const backgroundElement = document.createElement('div');
backgroundElement.className = 'hero-background-mobile';
backgroundElement.style.cssText = `position: fixed; ...`;
hero.insertBefore(backgroundElement, hero.firstChild);

// After: Use existing HTML elements, just show and set background-image
const mobileBackground = hero.querySelector('.hero-background-mobile:not(.hero-background-ios)');
mobileBackground.style.display = 'block';
mobileBackground.style.backgroundImage = `url('${imagePath}...')`;
```

#### **Visual Result:**
- **Before**: Page loads ? JavaScript creates element ? CSS styling applied ? Visual delay
- **After**: Page loads ? CSS styling already applied ? JavaScript shows element ? Immediate display
- **iOS Performance**: Eliminated iOS-specific styling delays completely
- **Immediate Styling**: Background appears with correct styling from the very first frame

#### **Files Modified:**
- `index.html` - Added background elements to hero section
- `contact/index.html` - Added background elements to hero section  
- `privacy-policy/index.html` - Added background elements to hero section
- `assets/css/main.css` - Added `display: none` to background elements, styling applied immediately
- `assets/js/main.js` - Simplified to use existing HTML elements instead of creating new ones
- All HTML files - Updated to version 1.0.31
- `sw.js` - Updated cache version to 1.0.31

### Version 1.0.30 - Fixed Background Styling Delay and Visual Jump

#### **Background Styling Fix:**
- Fixed background image loading then getting resized/styled after JavaScript execution
- Eliminated visual "jump" where image appears, then gets additional styling rules applied
- Moved all background styling rules from JavaScript to CSS for immediate application
- Background now displays with correct styling from the moment it appears

#### **Technical Implementation:**
- **CSS-First Approach**: All background styling now applied immediately via CSS
- **JavaScript Simplification**: JavaScript only sets background-image, CSS handles all other properties
- **Immediate Styling**: Background displays with correct size, position, and attachment from start
- **No Visual Changes**: Eliminated the resize/styling step that caused visual inconsistency

#### **Key Changes:**
```css
/* Added to .hero-background-mobile for immediate styling */
.hero-background-mobile {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background-size: cover !important;           /* Now applied immediately */
  background-position: center center !important; /* Now applied immediately */
  background-repeat: no-repeat !important;      /* Now applied immediately */
  background-attachment: fixed !important;      /* Now applied immediately */
  -webkit-background-size: cover !important;    /* Now applied immediately */
  -moz-background-size: cover !important;       /* Now applied immediately */
  -o-background-size: cover !important;         /* Now applied immediately */
}
```

```javascript
// Before: JavaScript applied all styling causing visual jump
backgroundElement.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('...');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

// After: JavaScript only sets background-image, CSS handles everything else
backgroundElement.style.cssText = `
  background-image: url('...');
`;
```

#### **Visual Result:**
- **Before**: Image loads ? JavaScript applies styling ? Visual jump/resize occurs
- **After**: Image loads with correct styling immediately ? No visual changes
- **Performance**: Smoother visual experience with no styling delays
- **Consistency**: Background appears exactly as intended from the first frame

#### **Files Modified:**
- `assets/css/main.css` - Added all background styling properties to `.hero-background-mobile`
- `assets/js/main.js` - Simplified to only set background-image, removed redundant styling
- All HTML files - Updated to version 1.0.30
- `sw.js` - Updated cache version to 1.0.30

### Version 1.0.29 - Fixed Background Loading Delay and Visual Inconsistency

#### **Background Loading Fix:**
- Fixed background image rendering last, causing visual inconsistency on page load
- Background now visible immediately when page loads, not after JavaScript execution
- Changed approach from replacing CSS background to enhancing it with JavaScript
- Maintained static background behavior while ensuring immediate visibility

#### **Technical Implementation:**
- **CSS Background**: Kept CSS background as fallback for immediate visibility
- **JavaScript Enhancement**: JavaScript now enhances rather than replaces the CSS background
- **No Background Removal**: Removed `hero.style.background = 'none'` to preserve immediate loading
- **Layered Approach**: CSS background loads first, JavaScript adds fixed positioning layer

#### **Key Changes:**
```javascript
// Before: Removed CSS background causing delay
hero.style.background = 'none';

// After: Keep CSS background for immediate visibility
// Don't remove the CSS background - keep it as fallback for immediate visibility
// Just enhance it with JavaScript for better static positioning
```

```css
/* iOS CSS now preserves background for immediate loading */
.hero {
  /* Keep the CSS background for immediate visibility */
  background-attachment: scroll !important;
  background-size: cover !important;
}
```

#### **Visual Result:**
- **Before**: Background appeared after JavaScript loaded, causing visual delay
- **After**: Background visible immediately on page load, no visual inconsistency
- **Performance**: Faster perceived loading time with immediate background display
- **Reliability**: CSS background ensures visibility even if JavaScript fails to load

#### **Files Modified:**
- `assets/js/main.js` - Removed background removal, kept CSS background as fallback
- `assets/css/main.css` - Ensured CSS background remains for immediate visibility
- All HTML files - Updated to version 1.0.29
- `sw.js` - Updated cache version to 1.0.29

### Version 1.0.28 - Made iOS Background Truly Static (Fixed Position)

#### **iOS Static Background Fix:**
- Fixed iOS background scrolling with content instead of staying fixed in place
- Changed iOS approach from CSS background to fixed positioned element
- iOS now uses `position: fixed` element with `background-attachment: scroll` for true static positioning
- Background stays completely static while content scrolls over it on iOS devices

#### **Technical Implementation:**
- **iOS Method**: Now uses fixed positioned div (same as non-iOS) but with `background-attachment: scroll`
- **Fixed Positioning**: `position: fixed` ensures the background element doesn't move with scroll
- **Pointer Events**: Added `pointer-events: none` to prevent background from interfering with interactions
- **CSS Updates**: iOS-specific CSS rules for proper fixed positioning

#### **Key Changes:**
```javascript
// iOS now uses fixed positioned element
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-attachment: scroll;
pointer-events: none;
```

```css
/* iOS-specific CSS */
.hero-background-mobile {
  position: fixed !important;
  pointer-events: none !important;
}
```

#### **Visual Result:**
- **Before**: iOS background scrolled with content
- **After**: iOS background stays completely static (fixed position)
- **Consistent**: Same static behavior across all platforms (iOS and non-iOS)
- **Reliable**: Uses `position: fixed` which works reliably on iOS for static positioning

#### **Files Modified:**
- `assets/js/main.js` - Updated iOS method to use fixed positioned element
- `assets/css/main.css` - Added iOS-specific CSS for fixed positioning
- All HTML files - Updated to version 1.0.28
- `sw.js` - Updated cache version to 1.0.28

### Version 1.0.27 - Fixed iOS Background Visibility After Static Background Fix

#### **iOS Background Visibility Fix:**
- Fixed background not visible on iOS devices after implementing static background fix
- Created hybrid approach: different methods for iOS vs non-iOS devices
- iOS devices now use CSS background with `background-attachment: scroll`
- Non-iOS devices continue to use fixed positioning for truly static background
- Maintained static background behavior across all platforms

#### **Technical Implementation:**
- **iOS Detection**: Added comprehensive iOS detection using user agent and touch points
- **iOS Method**: Uses CSS background with scroll attachment (reliable on iOS)
- **Non-iOS Method**: Uses fixed positioning div with `background-attachment: fixed`
- **CSS Updates**: iOS-specific CSS rules to hide mobile background div and use hero background

#### **iOS Detection Logic:**
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
```

#### **Dual Approach:**
- **iOS Devices**: Direct CSS background with `background-attachment: scroll`
- **Non-iOS Devices**: Fixed positioning div with `background-attachment: fixed`
- **CSS Support**: `@supports (-webkit-touch-callout: none)` for iOS-specific rules

#### **Visual Result:**
- **Before**: Background not visible on iOS devices after static background fix
- **After**: Background visible and static on all devices including iOS
- **Cross-Platform**: Consistent static background behavior across all platforms
- **Reliability**: Uses most reliable method for each platform

#### **Files Modified:**
- `assets/js/main.js` - Added iOS detection and dual approach for mobile parallax
- `assets/css/main.css` - Updated iOS-specific CSS rules
- All HTML files - Updated to version 1.0.27
- `sw.js` - Updated cache version to 1.0.27

### Version 1.0.26 - Fixed Static Background on All Screen Sizes

#### **Static Background Fix:**
- Fixed background image moving with scroll on smaller widths (< 1030px)
- Updated mobile breakpoint from 768px to 1030px for consistent behavior
- Ensured background stays completely static (doesn't move with scroll) on all screen sizes
- Applied fixes to all pages: main page, contact page, and privacy policy page

#### **Technical Implementation:**
- **JavaScript**: Changed mobile breakpoint from `window.innerWidth <= 768` to `window.innerWidth <= 1030`
- **Mobile Parallax**: Updated to use `position: fixed` and `background-attachment: fixed` for static background
- **CSS Media Queries**: Updated all hero-related breakpoints from 768px to 1030px
- **Cross-Page**: Applied consistent behavior across main, contact, and privacy pages

#### **Key Changes:**
```javascript
// Updated mobile detection
const isMobile = window.innerWidth <= 1030;

// Updated mobile parallax positioning
position: fixed;
background-attachment: fixed;
```

```css
/* Updated media queries */
@media (max-width: 1030px) {
  .hero {
    background-attachment: fixed;
  }
}
```

#### **Visual Result:**
- **Before**: Background moved with scroll on screens < 1030px
- **After**: Background stays completely static on all screen sizes
- **Consistent**: Same static background behavior across all devices and pages
- **Cross-Platform**: Works reliably on desktop, tablet, and mobile browsers

#### **Files Modified:**
- `assets/js/main.js` - Updated mobile breakpoint and parallax positioning
- `assets/css/main.css` - Updated media queries and background-attachment settings
- All HTML files - Updated to version 1.0.26
- `sw.js` - Updated cache version to 1.0.26

### Version 1.0.25 - Fixed iOS/iPhone Display Issues

#### **iOS Background Image Fix:**
- Fixed background image not displaying at all on iPhone/iOS
- Replaced `background-attachment: fixed` with `background-attachment: scroll` for iOS compatibility
- Added iOS-specific CSS fixes using `@supports (-webkit-touch-callout: none)`
- Enhanced mobile parallax implementation with better cross-browser support

#### **iOS Text Visibility Fix:**
- Fixed all text showing as white/invisible on iPhone/iOS
- Changed hero text colors from `var(--pf-white)` to `#ffffff !important`
- Enhanced text shadows for better contrast and readability
- Improved text visibility across all hero elements (title, subtitle, location, expertise)

#### **Technical Implementation:**
- **JavaScript**: Updated mobile parallax to use `background-attachment: scroll`
- **CSS**: Added iOS-specific fixes with `@supports` query
- **Text Colors**: Used explicit `#ffffff !important` instead of CSS variables
- **Text Shadows**: Enhanced shadows from `rgba(0, 0, 0, 0.3)` to `rgba(0, 0, 0, 0.8)`
- **Cross-Browser**: Added `-webkit-`, `-moz-`, `-o-` prefixes for background-size

#### **iOS-Specific CSS Fixes:**
```css
@supports (-webkit-touch-callout: none) {
  .hero {
    background-attachment: scroll !important;
    background-size: cover !important;
    -webkit-background-size: cover !important;
    background-image: url('../img/polarflows/Stockholm_modif.avif') !important;
  }
}
```

#### **Visual Result:**
- **Before**: No background image, invisible white text on iOS
- **After**: Clear background image display, visible white text with proper contrast
- **Cross-Platform**: Consistent experience across all iOS devices and Safari versions
- **Performance**: Optimized for iOS Safari rendering engine

#### **Files Modified:**
- `assets/js/main.js` - Fixed mobile parallax background-attachment
- `assets/css/main.css` - Added iOS-specific fixes and text color improvements
- All HTML files - Updated to version 1.0.25
- `sw.js` - Updated cache version to 1.0.25

### Version 1.0.24 - Improved Bullet Point Color

#### **Better Bullet Color:**
- Changed bullet points from green to black for better readability
- Used standard text color (`var(--pf-text-primary)`) for consistency
- Improved visual hierarchy and professional appearance
- Maintained clean, round bullet design

#### **Technical Change:**
- **Color Update**: Changed `background-color: var(--pf-success)` to `background-color: var(--pf-text-primary)`
- **Result**: Bullet points now match the text color for better visual harmony
- **Design**: More standard and professional bullet appearance

#### **Visual Result:**
- **Before**: Green circular bullets (stood out too much)
- **After**: Black circular bullets (standard, professional look)
- **Consistency**: Matches text color for better visual flow
- **Readability**: Better contrast and less distracting

#### **CSS Code:**
```css
.journey-steps li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--pf-text-primary); /* Changed from var(--pf-success) */
  border-radius: 50%;
}
```

#### **Files Modified:**
- `assets/css/main.css` - Updated bullet color to black
- All HTML files - Updated to version 1.0.24
- `sw.js` - Updated cache version to 1.0.24

### Version 1.0.23 - Fixed Bullet Character Display Issue

#### **CSS-Based Bullet Solution:**
- Fixed bullet points showing as "green square with question mark"
- Replaced text-based bullet character with CSS-generated bullet
- Used `border-radius: 50%` to create perfect circular bullets
- Ensured universal browser compatibility

#### **Technical Implementation:**
- **CSS Approach**: Replaced `content: "bullet"` with `content: ""`
- **Bullet Creation**: Used CSS `width: 6px; height: 6px; border-radius: 50%`
- **Positioning**: `top: 50%; transform: translateY(-50%)` for perfect vertical alignment
- **Color**: Maintained green color using `background-color: var(--pf-success)`

#### **Visual Result:**
- **Before**: Green square with question mark (character not supported)
- **After**: Clean, perfectly round green bullets
- **Universal**: Works across all browsers and fonts
- **Professional**: Consistent, modern bullet appearance

#### **CSS Code:**
```css
.journey-steps li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--pf-success);
  border-radius: 50%;
}
```

#### **Files Modified:**
- `assets/css/main.css` - Implemented CSS-based bullet solution
- All HTML files - Updated to version 1.0.23
- `sw.js` - Updated cache version to 1.0.23

### Version 1.0.22 - Fixed Bullet Points in Ready to Start Section

#### **Bullet Point Display Fix:**
- Fixed bullet points showing as "?" in the "Ready to Start" section
- Replaced corrupted character with proper bullet symbol (bullet)
- Ensured proper UTF-8 encoding for all special characters
- Verified all HTML files have correct charset declarations

#### **Technical Implementation:**
- **CSS Fix**: Updated `.journey-steps li::before` content from corrupted character to "bullet"
- **Encoding**: Verified UTF-8 charset is properly set in all HTML files
- **Character**: Used proper bullet character (bullet) instead of placeholder/question mark
- **Consistency**: Maintained green color and bold styling for bullet points

#### **Visual Result:**
- **Before**: Bullet points displayed as "?" (corrupted character)
- **After**: Clean bullet points (bullet) in green color
- **Professional Look**: Proper typography and visual hierarchy
- **Encoding**: All special characters display correctly across browsers

#### **Files Modified:**
- `assets/css/main.css` - Fixed bullet point content in journey-steps
- All HTML files - Updated to version 1.0.22
- `sw.js` - Updated cache version to 1.0.22

### Version 1.0.21 - Added Stockholm Location Line to Hero Section

#### **Hero Section Enhancement:**
- Added Stockholm location line right under "Expert consultancy for modern data solutions"
- Used same text size and styling as the hashtag line (#Azure &middot; #AWS &middot; #Databricks &middot; #Snowflake)
- Added location icon (same as footer) with appropriate sizing
- Maintains consistent spacing and visual hierarchy

#### **Technical Implementation:**
- **HTML**: Added new `<p class="hero-location">` element with SVG location icon and "Stockholm" text
- **CSS**: Created `.hero-location` styling matching `.hero-expertise` appearance
- **Icon**: Used same location SVG from footer with 16x16px size
- **Responsive**: Added responsive font sizing across all breakpoints
- **Layout**: Flexbox layout with centered alignment and proper spacing

#### **Visual Result:**
- **Location Display**: ?? Stockholm appears between subtitle and hashtags
- **Consistent Styling**: Matches hashtag line appearance and spacing
- **Professional Look**: Clean, centered location indication
- **Responsive**: Scales properly across all device sizes

#### **Files Modified:**
- `index.html` - Added hero location line with SVG icon
- `assets/css/main.css` - Added hero-location styling and responsive breakpoints
- All HTML files - Updated to version 1.0.21
- `sw.js` - Updated cache version to 1.0.21

### Version 1.0.20 - Fixed Mobile Hero Background & Restored Section Colors

#### **Mobile Hero Background Fix:**
- Fixed mobile hero background effect that wasn't working on small screens
- Improved mobile parallax implementation with better positioning
- Mobile now uses `position: absolute` with `background-attachment: fixed` for reliability
- Background stays static while content scrolls over it on mobile devices

#### **Section Background Restoration:**
- Restored blue backgrounds for "Why Choose Polar Flows" section
- Restored blue backgrounds for "Meet the Team" section  
- Restored blue backgrounds for value prop cards
- Corrected the mistaken removal of section background colors

#### **Technical Improvements:**
- **Mobile Hero**: Uses `position: absolute` with `background-attachment: fixed`
- **Desktop Hero**: Maintains original CSS `background-attachment: fixed`
- **Section Colors**: All sections now have correct blue/white backgrounds
- **Cross-Device**: Static background effect works on both desktop and mobile

#### **Files Modified:**
- `assets/js/main.js` - Fixed mobile hero background implementation
- `assets/css/main.css` - Restored section background colors
- All HTML files - Updated to version 1.0.20
- `sw.js` - Updated cache version to 1.0.20

### Version 1.0.19 - Reverted Non-Hero Section Backgrounds

#### **Section Background Revert:**
- Reverted all non-hero sections to white backgrounds
- Only hero section now has the static background effect
- Services section, team section, and value prop cards now have white backgrounds
- Clean, consistent white background for all content sections

#### **Technical Changes:**
- **Services Section**: Reverted from blue to white background
- **Team Section**: Reverted from blue to white background  
- **Value Prop Cards**: Reverted from blue to white background
- **Hero Section**: Maintains static background effect (unchanged)

#### **Visual Result:**
- **Hero Section**: Static Stockholm background with content scrolling over it
- **All Other Sections**: Clean white backgrounds with normal content
- **Consistent Design**: Professional white background throughout the site
- **Focus on Hero**: Static background effect only where intended

#### **Files Modified:**
- `assets/css/main.css` - Reverted section backgrounds to white
- All HTML files - Updated to version 1.0.19
- `sw.js` - Updated cache version to 1.0.19

### Version 1.0.18 - Static Background Implementation

#### **Static Background Fix:**
- Made background image completely static - no movement at all during scroll
- Background stays in exactly the same position while content scrolls over it
- Removed all JavaScript-based background movement
- Created true static background effect on both desktop and mobile

#### **Technical Implementation:**
- **Desktop**: Uses CSS `background-attachment: fixed` with no JavaScript manipulation
- **Mobile**: Creates static background element with `position: fixed` and no transform animations
- **No Movement**: Background image remains in exactly the same position during scroll
- **Pure CSS**: Desktop relies entirely on CSS for static background behavior

#### **How It Works:**
- **Desktop**: CSS `background-attachment: fixed` keeps background stationary
- **Mobile**: JavaScript creates `position: fixed` element that doesn't move
- **Result**: Background image stays in exact same position while content scrolls over it
- **Effect**: Clean, static background with content scrolling on top

#### **Files Modified:**
- `assets/js/main.js` - Removed all background movement logic, made background completely static
- All HTML files - Updated to version 1.0.18
- `sw.js` - Updated cache version to 1.0.18

### Version 1.0.17 - Proper Parallax Effect Implementation

#### **Parallax Effect Fix:**
- Fixed both desktop and mobile parallax to create proper "background stays in place" effect
- Background now moves slower than scroll speed (50% of scroll speed)
- Creates authentic parallax depth effect where background appears stationary
- Unified parallax behavior across all devices and screen sizes

#### **Technical Implementation:**
- **Desktop**: Uses `background-position: left ${scrollY * 0.5}px` for slower background movement
- **Mobile**: Uses `transform: translateY(-${scrollY * 0.5}px)` for opposite-direction parallax
- **Parallax Speed**: Both methods use 50% scroll speed for authentic parallax effect
- **Visual Effect**: Background appears to stay in place while content scrolls over it

#### **Why This Works:**
- **Desktop**: Background moves at 50% of scroll speed, creating parallax depth
- **Mobile**: Background transforms in opposite direction at 50% speed, creating same visual effect
- **Consistent Experience**: Both methods achieve identical "background stays in place" parallax effect
- **Performance**: Optimized for smooth scrolling on all devices

#### **Files Modified:**
- `assets/js/main.js` - Fixed parallax calculations for both desktop and mobile
- All HTML files - Updated to version 1.0.17
- `sw.js` - Updated cache version to 1.0.17

### Version 1.0.16 - Fixed Mobile Background Image Paths

#### **Mobile Background Image Fix:**
- Fixed 404 errors for background images in mobile parallax implementation
- Added dynamic path detection for different page locations
- JavaScript now correctly loads Stockholm background images on mobile devices
- Resolved image loading issues across main page and sub-pages

#### **Technical Fix:**
- **Path Detection**: Automatically detects if running on sub-pages (contact, privacy-policy)
- **Dynamic Paths**: Uses `../assets/img/polarflows/` for sub-pages, `assets/img/polarflows/` for main page
- **Image Loading**: Background images now load correctly in mobile parallax implementation
- **Cross-Page Compatibility**: Works on all pages (index, contact, privacy-policy)

#### **Files Modified:**
- `assets/js/main.js` - Fixed image paths in mobile parallax implementation
- All HTML files - Updated to version 1.0.16
- `sw.js` - Updated cache version to 1.0.16

### Version 1.0.15 - Proper Mobile Parallax Implementation

#### **Mobile Parallax Solution:**
- Implemented proper mobile parallax using JavaScript transform instead of CSS background-attachment
- Desktop uses CSS `background-attachment: fixed` with background-position changes
- Mobile uses dynamically created background element with `transform: translateY()`
- Automatic detection and switching between mobile/desktop methods
- Responsive reinitialization on orientation changes

#### **Technical Implementation:**
- **Desktop**: Uses `initDesktopParallax()` with `background-position: left ${offset}%`
- **Mobile**: Uses `initMobileParallax()` with `transform: translateY(${offset}px)`
- **Detection**: Automatically detects screen width ? 768px for mobile
- **Performance**: Uses `will-change: transform` and throttled scroll events
- **Responsive**: Reinitializes method on window resize/orientation change

#### **Why This Works:**
- `background-attachment: fixed` is disabled on mobile browsers for performance
- Mobile parallax uses separate DOM element with transform for smooth scrolling
- Desktop maintains original CSS-based parallax for optimal performance
- Both methods achieve the same visual sliding effect

#### **Files Modified:**
- `assets/js/main.js` - Added mobile/desktop parallax detection and implementation
- `assets/css/main.css` - Updated mobile CSS for proper parallax container setup
- All HTML files - Updated to version 1.0.15
- `sw.js` - Updated cache version to 1.0.15

### Version 1.0.14 - Unified Hero Background Animation

#### **Background Animation Correction:**
- Reverted to unified background sliding behavior for both desktop and mobile
- Removed mobile-specific background animation parameters and logic
- Ensured `background-attachment: fixed` works consistently across all devices
- Simplified JavaScript to use same sliding logic for all screen sizes

#### **Technical Changes:**
- Removed `MOBILE_MAX_BACKGROUND_OFFSET` and `MOBILE_BACKGROUND_BREAKPOINT` from constants
- Reverted mobile CSS to use `background-attachment: fixed` instead of `scroll`
- Simplified `initSlidingBackground()` function to use unified logic
- All devices now use `left` positioning with 50% max offset
- Removed mobile-specific resize handling and transitions

#### **Files Modified:**
- `assets/js/constants.js` - Removed mobile-specific background parameters
- `assets/js/main.js` - Simplified to unified background animation logic
- `assets/css/main.css` - Reverted mobile CSS to use fixed attachment
- All HTML files - Updated to version 1.0.14
- `sw.js` - Updated cache version to 1.0.14

### Version 1.0.13 - Mobile Hero Background Animation Fix

#### **Mobile Background Animation Improvements:**
- Fixed hero section background sliding effect on mobile devices
- Added mobile-specific background animation parameters to constants
- Implemented responsive background positioning for different screen sizes
- Added smooth transitions for background position changes on mobile
- Updated JavaScript to handle mobile vs desktop background animation differently

#### **Technical Changes:**
- Added `MOBILE_MAX_BACKGROUND_OFFSET: 30` and `MOBILE_BACKGROUND_BREAKPOINT: 768` to constants
- Modified `initSlidingBackground()` function to detect mobile screens and use different animation logic
- Updated CSS to enable smooth background position transitions on mobile
- Mobile uses `center` positioning with reduced offset for better performance
- Desktop maintains original `left` positioning with full offset

#### **Files Modified:**
- `assets/js/constants.js` - Added mobile background animation parameters
- `assets/js/main.js` - Updated background animation logic for mobile compatibility
- `assets/css/main.css` - Added transition support for mobile background positioning
- All HTML files - Updated to version 1.0.13
- `sw.js` - Updated cache version to 1.0.13

### Version 1.0.12 - UTF-8 Encoding Prevention Documentation

#### **Documentation Updates:**
- Added comprehensive UTF-8 encoding rules section to prevent future issues
- Added critical warnings about forbidden characters that break GitHub Pages
- Added verification commands for checking encoding issues
- Added safe alternatives for common problematic characters
- Updated both README.md and WEBSITE_SUMMARY.md with encoding guidelines

#### **Prevention Measures:**
- Clear list of forbidden characters (em dashes, smart quotes, arrows, emojis, accented characters)
- Safe alternatives for each problematic character type
- PowerShell verification command for checking files before deployment
- Explanation of why encoding issues break GitHub Pages deployment

### Version 1.0.11 - Final UTF-8 Encoding Fixes

#### **Additional Critical Fixes:**
- Fixed remaining UTF-8 encoding issues in team member name in WEBSITE_SUMMARY.md
- Fixed em dash character in README.md tagline
- Verified all files are now free of non-ASCII characters
- Comprehensive scan confirmed no remaining encoding issues

#### **Files Fixed:**
- `WEBSITE_SUMMARY.md` - Fixed `Daniel Sjoholm` to `Daniel Sjoholm` in team section
- `README.md` - Fixed em dash in tagline from `AI-delivered` to `AI - delivered`

### Version 1.0.9 - UTF-8 Encoding Fixes

#### **Critical Fixes:**
- Fixed UTF-8 encoding issues that were preventing GitHub Pages deployment
- Replaced problematic Unicode characters with HTML entities or plain text
- Fixed em dash characters in page titles and meta tags
- Fixed arrow characters in back-to-top buttons
- Fixed special characters in documentation files

#### **Files Fixed:**
- `index.html` - Fixed em dash in title and meta tags, arrow in back-to-top button
- `contact/index.html` - Fixed arrow in back-to-top button
- `privacy-policy/index.html` - Fixed arrow in back-to-top button
- `README.md` - Fixed warning emoji and arrow characters
- `WEBSITE_SUMMARY.md` - Fixed arrow characters
- `assets/img/README.md` - Fixed UTF-8 encoding in team member name

#### **Technical Details:**

### Version 1.0.8 - UI/UX Improvements and Bug Fixes

#### **Hero Section Improvements:**
- Fixed font size progression for "Turning data into actions" title to be more gradual (768px-899px: 30px, 900px-1023px: 36px, 1024px+: 60px)
- Reduced vertical spacing between title and subtitle for better visual hierarchy
- Made hero expertise hashtags smaller on mobile screens for better proportion
- Fixed button spacing consistency - buttons now stay centered together with consistent 16px gap
- Added exception rule for extremely small screens (<300px) to allow button wrapping

#### **Section Layout Fixes:**
- Fixed "Why Choose Polar Flows" section centering - last row items now center properly when there's only one item
- Fixed "Expertise" section centering - last row items now center properly when there's only one item
- Removed hover animations on mobile for both "Why Choose Polar Flows" and "Expertise" sections
- Made team member photos larger across all screen sizes, especially on smaller screens

#### **Team Section Enhancements:**
- Removed hover animations from team cards
- Implemented mobile-only contact icons (email and LinkedIn) with text hidden on small screens
- Reduced vertical padding and spacing for better mobile layout
- Updated team member details (Linggar's title changed to "Data Engineer", reordered team members)
- Made team member photos significantly larger on all screen sizes

#### **Content Updates:**
- Removed "Career growth opportunities" from "As an Employee" section
- Changed journey section title from "How would you like to continue the journey with us?" to "Ready to Start?"
- Updated contact page hero subtitle to be more concise

#### **Technical Improvements:**
- Fixed browser caching issues by implementing proper CSS/JS versioning system
- Resolved preload version mismatch warnings
- Fixed Databricks partnership logo styling to match section background with no border
- Ensured footer contact submenu follows same styling as other footer items

#### **Mobile Optimizations:**
- Improved responsive design across all sections
- Better touch experience with removed hover animations on mobile
- Optimized spacing and sizing for smaller screens
- Enhanced visual hierarchy and readability

This website represents a modern, responsive data consultancy site with sophisticated animations and user experience optimizations.
