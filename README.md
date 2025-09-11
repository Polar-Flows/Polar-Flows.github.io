# Polar Flows - Static Website

A modern, responsive static website for Polar Flows boutique consultancy, built with vanilla HTML, CSS, and JavaScript.

## 🎯 Project Overview

**Polar Flows** is a boutique consultancy specializing in Azure & Databricks expertise, Data Governance & Compliance, Security & Networking, Cost Optimization, Ingestion & Structured Streaming, Scalability & DR, and DataOps & MLOps.

This website showcases our services, team, and provides a professional contact point for potential clients and employees.

## 🏗️ Project Structure

```
PolarFlows-Website/
├── index.html                 # Landing page with all main sections
├── contact.html              # Contact form and company information
├── assets/
│   ├── css/
│   │   ├── tokens.css        # CSS custom properties and design tokens
│   │   └── main.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Main JavaScript entry point
│   │   └── components/       # Modular component files
│   │       ├── Navigation.js # Sticky navbar and mobile menu
│   │       ├── Testimonials.js # Testimonials slider component
│   │       ├── Forms.js      # Form validation and handling
│   │       ├── Animations.js # Scroll animations and transitions
│   │       └── Utils.js      # Utility functions and helpers
│   └── img/                  # Images and logos
│       ├── logo.svg          # Main logo (SVG)
│       ├── logo-dark.svg     # Dark variant logo
│       ├── favicon.svg       # Favicon
│       └── placeholders/     # Placeholder images
├── robots.txt                # Search engine directives
├── sitemap.xml               # XML sitemap
├── manifest.webmanifest      # PWA manifest
├── .editorconfig             # Editor configuration
├── .prettierrc              # Prettier formatting rules
├── .eslintrc.json           # ESLint configuration
├── .stylelintrc.json        # Stylelint configuration
└── .gitignore               # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Local Development
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PolarFlows-Website
   ```

2. **Run locally:**
   - **Option 1:** Open `index.html` directly in your browser
   - **Option 2:** Use a local server for better development experience:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js
     npx serve .
     
     # PHP
     php -S localhost:8000
     ```

3. **Access the site:**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

### No Build Step Required
This project uses vanilla technologies and requires no build process, transpilation, or bundling. Simply edit the files and refresh your browser to see changes.

## 🎨 Customization

### Design Tokens
All colors, spacing, and typography are defined in `assets/css/tokens.css`:

```css
:root {
  --pf-blue: #187ef9;
  --pf-navy: #012d75;
  --pf-white: #ffffff;
  --pf-slate: #123456;
  --pf-azure: #0665d8;
  --pf-deep: #0140a8;
}
```

**To customize:**
1. Edit the color values in `tokens.css`
2. The site automatically generates light/dark variants
3. All components use these tokens for consistent theming

### Content Updates
- **Text content:** Edit directly in HTML files
- **Images:** Replace files in `assets/img/` (maintain same filenames)
- **Services:** Modify the value props section in `index.html`
- **Team members:** Edit the team section or hide completely

### Hiding Team Section
The team section can be easily hidden by setting `data-visible="false"` on the team container:

```html
<section class="team" data-visible="false">
  <!-- Team content -->
</section>
```

## 🧪 Testing & Quality

### Code Quality Tools
- **ESLint:** JavaScript linting and formatting
- **Stylelint:** CSS linting and formatting  
- **Prettier:** Code formatting
- **EditorConfig:** Consistent editor settings

### Performance & Accessibility
- **Lighthouse:** Run audits for performance, accessibility, SEO, and best practices
- **axe-core:** Accessibility testing
- **WebPageTest:** Performance benchmarking

### Manual Testing Checklist
- [ ] Responsive design across all breakpoints
- [ ] Keyboard navigation and focus states
- [ ] Screen reader compatibility
- [ ] Color contrast compliance (WCAG AA)
- [ ] Form validation and error handling
- [ ] Cross-browser compatibility

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm: 576px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 992px;   /* Large devices */
--breakpoint-xl: 1200px;  /* Extra large devices */
```

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: (leave empty - no build step)
3. Publish directory: `.` (root)
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. Framework preset: Other
3. Build command: (leave empty)
4. Output directory: `.` (root)

## 📊 Performance Targets

- **JavaScript:** ≤ 150 KB (minified)
- **CSS:** ≤ 120 KB (minified)
- **Images:** WebP/AVIF with fallbacks
- **Lighthouse Score:** ≥ 90 for all categories
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles where needed
- Skip-to-content link
- Focus management
- Color contrast compliance (WCAG AA)
- Reduced motion support
- Screen reader friendly

## 🔍 SEO Features

- Meta tags and descriptions
- Open Graph and Twitter Card tags
- Structured data (Organization + WebSite)
- XML sitemap
- robots.txt
- Canonical URLs
- Semantic HTML markup

## 🛠️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Guidelines

### Writing Style
- Professional yet approachable
- Clear value propositions
- Action-oriented CTAs
- Consistent terminology

### Image Guidelines
- Use SVG logos for scalability
- Optimize images for web
- Provide meaningful alt text
- Maintain brand consistency

## 🚨 Troubleshooting

### Common Issues
1. **Images not loading:** Check file paths and ensure images exist
2. **Styles not applying:** Verify CSS file paths and syntax
3. **JavaScript errors:** Check browser console for errors
4. **Mobile menu not working:** Ensure JavaScript is enabled

### Performance Issues
1. **Slow loading:** Optimize images and check file sizes
2. **Layout shifts:** Verify image dimensions are set
3. **Animation lag:** Check `prefers-reduced-motion` support

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript reference
- [Web.dev](https://web.dev/) - Performance and best practices
- [A11y Project](https://www.a11yproject.com/) - Accessibility guidelines
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques and tips

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Polar Flows. All rights reserved.

---

**Need help?** Contact the development team or refer to the inline code comments for implementation details.
