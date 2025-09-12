# Polar Flows Website - Technical Summary

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
- **Two-line subtitle**: Force "Expert consultancy for" / "modern data solutions" on ?600px screens
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
- **4 Team Members**: Mert Canat, Daniel Sjöholm, Yunus Kocyigit, Linggar Pangestu
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

## Asset Versioning System

**CRITICAL**: The website uses query string versioning to prevent browser caching issues. When making changes to CSS or JavaScript files, you MUST update the version numbers in all HTML files.

### Current Version: `v1.0.8`

### Files That Need Version Updates:
- `index.html` - All CSS and JS links
- `contact/index.html` - All CSS and JS links  
- `privacy-policy/index.html` - All CSS and JS links
- `404.html` - All CSS links
- `sw.js` - Cache version constants

### Version Update Process:
1. **Increment version number** (e.g., `v1.0.8` ? `v1.0.9`)
2. **Update all HTML files** with new version in query strings
3. **Update service worker** cache version constants
4. **Test deployment** to ensure changes appear immediately

### Example:
```html
<!-- Before -->
<link rel="stylesheet" href="assets/css/main.css">

<!-- After -->
<link rel="stylesheet" href="assets/css/main.css?v=1.0.8">
```

**Why This Matters**: Without versioning, browsers cache CSS/JS files and changes won't appear until cache expires (days/weeks). Versioning forces immediate updates.

## Recent Updates (Latest Session)

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
