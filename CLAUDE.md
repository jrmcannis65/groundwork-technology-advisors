# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js version caveat

This project uses Next.js 16.2.3. **This version has breaking changes from what is in most training data.** Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build → outputs to /out (static export)
npm run lint     # ESLint
```

There are no tests. The build (`npm run build`) is the primary correctness check — run it after any change.

## Architecture

**Fully static site.** `next.config.ts` sets `output: "export"` and `trailingSlash: true`. There is no server, no API routes, no dynamic rendering. Everything must be serializable at build time.

**Critical constraint: no event handlers in Server Components.** All pages and most components are Server Components. `onMouseEnter`, `onClick`, etc. will cause a build-time prerender error. All hover and interactive states must be handled via CSS classes defined in `src/app/globals.css`. Only `Header.tsx` and `ContactForm.tsx` are `"use client"` components — keep it that way unless there is no CSS alternative.

**Brand system lives entirely in CSS.** `src/app/globals.css` is the single source of truth for the design system:
- CSS custom properties (`--color-navy`, `--color-blue`, `--color-ltblue`, etc.) defined in `@theme`
- Reusable utility classes for all interactive states: `.btn-primary`, `.btn-hero-outline`, `.btn-outline-blue`, `.nav-link`, `.footer-link`, `.service-card`, `.service-card-link`, `.link-blue`, `.link-ltblue`, `.section-label`
- Global `h1`/`h2`/`h3` rules set font-family, weight, and color — do not override these inline unless a specific element needs to differ (e.g., white heading on a dark background)
- Font stack is system fonts only (`Arial` for sans, `Georgia` for serif) — no Google Fonts

**Content and data flow:**
- `src/data/services.ts` is the single source of truth for all six services (id, title, descriptions, SVG icon path data). Both the home page grid and the `/services/` detail page read from this array.
- `src/lib/metadata.ts` exports `generatePageMetadata()` — use this for all inner pages. The home page sets metadata directly in `page.tsx`.

**Logo and assets in `public/`:**
- `gta_logo_horizontal.svg` — desktop nav (≥sm breakpoint)
- `gta_logo_mark.svg` — mobile nav + favicon
- `gta_logo_reversed.svg` — used in hero section (white-on-navy)
- `gta_logo_stacked.svg` — available, not currently placed
- `gta_capabilities_onepager.pdf` — linked from the home page services section

**Image rendering:** `next.config.ts` sets `images: { unoptimized: true }` for static export compatibility. Use `next/image` (`<Image>`) for all logo/asset rendering.

**Contact form:** `ContactForm.tsx` posts to Formspree. The endpoint `https://formspree.io/f/xaqanajg` is hardcoded in that component. This is the only runtime dependency of the site.
