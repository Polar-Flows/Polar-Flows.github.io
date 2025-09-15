# Polar Flows Website - Technical Requirements

## Project Overview
Professional data consultancy website for Polar Flows, specializing in Azure, Databricks, AWS, and modern data solutions. Built with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

## Critical Requirements

### 1. Version Management
- **MANDATORY**: All CSS/JS changes require version bump in query strings
- **Files to update**: All HTML files and `sw.js`
- **Format**: `?v=1.x.x` (increment on any change)
- **Purpose**: Prevent browser caching issues

### 2. iOS Compatibility
- **CRITICAL**: Maintain iOS Safari compatibility overrides
- **Target**: iOS 9-15 (older versions with CSS custom property issues)
- **Implementation**: Universal text color overrides with `!important`
- **Risk**: Removing these breaks text visibility on older iOS devices

### 3. UTF-8 Character Policy
- **REQUIRED**: Use only UTF-8 compatible characters in all files
- **Avoid**: Em dashes, smart quotes, arrows, accented characters
- **Purpose**: Ensure GitHub Pages deployment compatibility

## Page Structure

### Main Page (`index.html`)
- **Hero Section**: Animated logo with scroll-based transformation
- **About**: Company mission and description
- **Services**: Value proposition cards
- **Expertise**: Technology partnerships (15+ logos)
- **Databricks Partner**: Special section with directory link
- **Team**: 4 members with photos, roles, contact info
- **Contact CTA**: Call-to-action section

### Contact Page (`contact/index.html`)
- **Static Logo**: Fixed logo at top
- **Contact Form**: Custom validation and notifications
- **FAQ**: Common questions and answers
- **Location**: Stockholm-based information

### Privacy Policy (`privacy-policy/index.html`)
- **Static Logo**: Same as contact page
- **Legal Content**: Privacy policy text

## Technical Architecture

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks, ES6+ features
- **Service Worker**: Offline functionality and caching

### Key Components

#### Logo Animation System
- **Hero Logo**: Large logo that transforms on scroll
- **Transformation**: Shrinks and moves to navbar position
- **Progress**: Based on scroll position relative to hero height
- **Mobile Safety**: Uses `Math.max(0, window.scrollY)` to prevent negative values
- **Parameters**: `dynamicPercentage = 0.35`, `earlyFinishPx = 15`

#### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 1030px, 899px, 770px, 480px
- **Viewport Units**: Uses `svh`, `dvh`, `lvh` with fallbacks
- **Touch-Friendly**: Large touch targets, proper spacing

#### Background System
- **Main Page**: Complex iOS background with color-to-image transition
- **Sub-Pages**: Simple CSS backgrounds with image fallbacks
- **Image Formats**: AVIF, WebP, JPG fallback chain
- **iOS Handling**: Special logic for iOS Safari compatibility

## File Structure
```
/
??? index.html                    # Main page
??? contact/index.html            # Contact page
??? privacy-policy/index.html     # Privacy policy
??? 404.html                      # Error page
??? assets/
?   ??? css/
?   ?   ??? main.css             # All styles
?   ?   ??? tokens.css           # CSS custom properties
?   ??? js/
?   ?   ??? main.js              # Main functionality
?   ?   ??? components/          # Modular components
?   ??? img/                     # Images and logos
??? sw.js                        # Service worker
??? serve.py                     # Local development server
```

## Development Guidelines

### CSS Architecture
- **Custom Properties**: Defined in `tokens.css`
- **Mobile-First**: Base styles for mobile, then desktop
- **iOS Overrides**: Specific rules for iOS Safari compatibility
- **Responsive**: Flexible layouts with proper breakpoints

### JavaScript Architecture
- **Modular**: Component-based structure
- **ES6+**: Modern JavaScript features
- **Performance**: Optimized for mobile devices
- **Debug Mode**: Configurable logging system

### Image Optimization
- **Formats**: AVIF, WebP, JPG fallback chain
- **Responsive**: Different sizes for different devices
- **Lazy Loading**: Implemented for performance
- **Alt Text**: Proper accessibility

## Performance Requirements

### Loading Speed
- **Target**: < 3 seconds on mobile
- **Optimization**: Minified CSS/JS, optimized images
- **Caching**: Service worker for offline functionality
- **CDN**: GitHub Pages hosting

### Mobile Experience
- **Touch Targets**: Minimum 44px
- **Responsive**: Works on all screen sizes
- **Performance**: Smooth animations and interactions
- **Accessibility**: Proper ARIA labels and semantic HTML

## Browser Support

### Primary Targets
- **Chrome**: Latest 2 versions
- **Safari**: Latest 2 versions (including iOS)
- **Firefox**: Latest 2 versions
- **Edge**: Latest 2 versions

### Legacy Support
- **iOS Safari**: iOS 9+ (with compatibility overrides)
- **Android**: Chrome 60+
- **Desktop**: IE11+ (with fallbacks)

## Content Management

### Team Information
- **4 Team Members**: Photos, roles, contact info
- **Contact Methods**: Email and LinkedIn links
- **Responsive**: Icons scale based on screen size

### Technology Showcase
- **15+ Technologies**: Azure, AWS, Databricks, etc.
- **Partnership Badges**: Official partner status
- **Logo Grid**: Responsive layout with proper spacing

## Security & Privacy

### Data Handling
- **Contact Form**: Client-side validation only
- **No Backend**: Static site, no server-side processing
- **Privacy Policy**: Comprehensive legal coverage
- **GDPR Compliance**: European data protection standards

### Performance Monitoring
- **Core Web Vitals**: Optimized for Google metrics
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structured data

## Deployment

### GitHub Pages
- **Automatic**: Deploys on push to main branch
- **Custom Domain**: polarflows.com
- **HTTPS**: SSL certificate included
- **CDN**: Global content delivery

### Local Development
- **Python Server**: `python -m http.server 8000`
- **Live Reload**: Manual refresh required
- **Testing**: Test on multiple devices and browsers

## Maintenance

### Regular Updates
- **Content**: Team info, services, contact details
- **Dependencies**: Keep technologies current
- **Performance**: Monitor and optimize
- **Security**: Regular security reviews

### Version Control
- **Git**: Proper commit messages
- **Branches**: Feature branches for major changes
- **Tags**: Version tags for releases
- **Documentation**: Keep this file updated

## Future Enhancements

### Potential Features
- **Blog**: Technical articles and case studies
- **Portfolio**: Project showcases
- **Client Portal**: Secure area for clients
- **Analytics**: Performance and usage tracking

### Technical Improvements
- **PWA**: Progressive Web App features
- **Performance**: Further optimization
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
