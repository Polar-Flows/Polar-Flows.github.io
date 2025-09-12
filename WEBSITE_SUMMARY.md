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

### Responsive Design Rules
- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**: 
  - Mobile: ?767px
  - Tablet: 768px-1023px  
  - Desktop: ?1024px
- **Logo Sizing**: Larger on mobile to ensure it's always bigger than title text
- **Button Optimization**: Compact sizing on small screens to prevent wrapping

### Section Background Colors
- **Main Page Only**: 
  - "Why Choose Polar Flows" (services): Blue background (`#d1e7ff`)
  - "Meet the Team": Blue background (`#d1e7ff`)
- **Other Pages**: White backgrounds for all sections
- **Implementation**: Uses `.index` class on main page body for specificity

### Navigation System
- **Mobile Menu**: Hamburger menu with smooth animations
- **Scroll Behavior**: Menu items scroll to sections with proper padding
- **Logo Integration**: Navbar logo appears when hero logo animation completes

### Form System
- **Custom Validation**: Replaces browser default alerts
- **Notifications**: Positioned above submit button
- **Error Messages**: User-friendly text instead of technical validation errors

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

### Expertise/Partnerships
- **15+ Technologies**: Azure, AWS, Databricks, Snowflake, dbt, Power BI, Tableau, etc.
- **Order**: Specific order maintained (Azure first, Fabric/Immuta last)
- **Styling**: Transparent boxes with minimal hover effects
- **Databricks Special**: Separate section with partner directory link

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

## Maintenance Notes
- **Logo Animation**: Core feature requiring careful scroll position handling
- **Mobile Testing**: Critical for logo sizing and button layout
- **Cross-Browser**: Test scroll behavior on different mobile browsers
- **Performance**: Monitor animation smoothness during resize events
- **Content Updates**: Team info, partnerships, and contact details may change

This website represents a modern, responsive data consultancy site with sophisticated animations and user experience optimizations.
