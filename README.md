# Found It! — landing site

Marketing site for **Found It!**, a macOS app that searches your files by *meaning*, not just their names. Live at **[found-it.me](https://found-it.me)**.

Built with **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**, deployed as a static export to **GitHub Pages** (custom domain via `CNAME`).

## Features

- Animated hero "portal" reveal and a scroll-driven features section
- Email **waitlist** capture
- `/download` page and legal pages (privacy, terms, refunds)
- Static export — no server required

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build      # static export to ./out
```

Pushing to `main` triggers the GitHub Pages deploy (`.github/workflows/deploy.yml`); the custom domain is set in `public/CNAME`.

## Project layout

```
src/app/            routes — landing page, /download, layout, global styles
src/components/     section + block components
src/lib/            waitlist + helpers
public/             static assets, legal pages, CNAME, favicon
```

## Related

- **Found It!** (the macOS app) — private repo.
