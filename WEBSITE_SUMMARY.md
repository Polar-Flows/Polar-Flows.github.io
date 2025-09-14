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

### Current Version: `v1.0.26`

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
