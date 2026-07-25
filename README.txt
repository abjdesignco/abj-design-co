ABJ DESIGN CO. — SHARED DESIGN SYSTEM BUILD

STRUCTURE
/
  index.html
  services.html
  portfolio.html
  about.html
  contact.html

/styles
  tokens.css            Global brand, spacing, radius, and motion tokens
  core.css              Shared navigation polish, accessibility, layout, and interactions
  /pages
    index.css
    services.css
    portfolio.css
    about.css
    contact.css

/scripts
  app.js                Theme, navigation, reveal animation, FAQ, and portfolio filtering

/images
  abj-icon-mark.png

WHAT CHANGED
- Removed all inline CSS from the five HTML pages.
- Removed duplicated inline JavaScript from every page.
- Added one shared theme/navigation/animation runtime.
- Added centralized ABJ design tokens.
- Preserved page-specific styling in organized page stylesheets.
- Kept the existing visual design and responsive behavior.
- Included existing sitemap, robots, and Google verification files.

GITHUB UPLOAD
Replace the existing five HTML files, then upload the styles and scripts folders
without changing their names or paths.

CONTACT FORM
The form still uses Netlify form attributes. GitHub Pages does not process Netlify
Forms. Connect the form to Formspree, Basin, Web3Forms, or a custom endpoint before
relying on public submissions.
