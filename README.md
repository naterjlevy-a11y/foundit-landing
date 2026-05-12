<div align="center">

<img src="https://img.shields.io/badge/live-found--it.me-0A84FF?style=flat-square" />
<img src="https://img.shields.io/badge/HTML-5-E34F26?style=flat-square&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS-3-1572B6?style=flat-square&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />

# Found It — Landing Page

Marketing site for **[Found It!](https://found-it.me)** — the menu bar app for natural-language file search on macOS.

**[found-it.me →](https://found-it.me)**

</div>

---

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `index.html` | Hero, features, how it works, pricing, about |
| Privacy Policy | `privacy.html` | Full privacy policy |
| Terms of Service | `terms.html` | Terms and conditions |
| Refund Policy | `refunds.html` | Refund and cancellation policy |
| Cookie Policy | `cookies.html` | Cookie usage disclosure |
| Contact | `contact.html` | Support contact form |
| About | `about.html` | About the product and team |

---

## Stack

- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript
- **No build step** — open `index.html` in a browser and it works
- **Inter Tight + JetBrains Mono** — loaded from Google Fonts
- **SVG assets** — all icons and illustrations are SVG for sharp rendering at any resolution

---

## Project Structure

```
foundit-landing/
├── index.html          # Main marketing page
├── privacy.html
├── terms.html
├── refunds.html
├── cookies.html
├── contact.html
├── about.html
├── css/
│   └── styles.css      # All styles (custom properties, no framework)
├── js/
│   └── main.js         # Scroll progress, nav behavior, animations
└── assets/
    ├── favicon.svg
    ├── logo-mark.svg
    ├── app-search.png  # OG image / hero screenshot
    └── ...
```

---

## Design Decisions

- **Dark-first aesthetic** — matches the macOS menu-bar app's dark UI
- **Scroll progress bar** — thin indicator at the top of the viewport
- **Sticky nav** with active section highlighting — `data-nav-target` attributes map links to sections
- **Accessible** — skip-link, `aria-label`s, semantic HTML throughout
- **Performance** — no JS frameworks, no tracking pixels, no external scripts beyond Google Fonts

---

## Running Locally

No build step required:

```bash
open index.html
# or
npx serve .
```

For live reload during development:

```bash
npx browser-sync start --server --files "**/*.html, css/*.css, js/*.js"
```

---

## Deployment

The site is deployed as a static site. Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

Set the canonical URL and OG metadata in each page's `<head>` to match your domain:

```html
<link rel="canonical" href="https://found-it.me/" />
<meta property="og:url" content="https://found-it.me/" />
```

---

## Related

- **[foundit-macos](../Foundit!)** — the macOS SwiftUI app itself
- **[found-it.me](https://found-it.me)** — live site

---

<div align="center">
  <sub>Static HTML/CSS/JS · No build step · No tracking</sub>
</div>
