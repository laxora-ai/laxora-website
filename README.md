# Laxora Website

Marketing site for [laxora.ai](https://laxora.ai) — an AI front desk platform for dental and physician offices.

Built with Next.js 14 App Router + Tailwind CSS v3. Statically exported and deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build

```bash
npm run build   # outputs to out/
npm run typecheck
```

## File map

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          Geist font, metadata/SEO, globals
│   │   ├── page.tsx            assembles all sections
│   │   └── globals.css         Tailwind directives, base styles
│   └── components/
│       ├── Nav.tsx             sticky nav, mobile menu
│       ├── Hero.tsx            headline, CTAs, booking mock UI
│       ├── WhatWeDo.tsx        3-card feature grid
│       ├── HowItWorks.tsx      3-step layout
│       ├── WhoWeServe.tsx      2-card practice grid
│       ├── Team.tsx            founder cards with photos
│       ├── WaitlistForm.tsx    form with validation and Formspree POST
│       ├── Footer.tsx          logo, copyright, nav links
│       └── FadeUp.tsx          Framer Motion scroll animation wrapper
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── apple-touch-icon.png
│       ├── og-image.png
│       └── team/
│           ├── akash.jpg
│           └── pratik.jpg
├── _legacy/                    old static HTML site (safe to delete)
├── .github/workflows/
│   └── deploy.yml              builds and deploys to gh-pages on push to main
├── next.config.mjs
├── tailwind.config.ts          design tokens (colors, font, radii, animations)
├── CNAME                       laxora.ai
└── .nojekyll
```

## Swapping team photos

Replace `public/assets/team/akash.jpg` and `public/assets/team/pratik.jpg` with real photos.

Requirements: **square crop, minimum 800×800 px, JPEG**.

## Configuring the waitlist form

Open `src/components/WaitlistForm.tsx` and replace the placeholder at the top:

```ts
const FORM_ENDPOINT = 'https://formspree.io/f/FORM_ID_TODO'
```

**Formspree (free, ~5 minutes):**
1. Go to [formspree.io](https://formspree.io), sign in, create a new form.
2. Copy the form ID (e.g. `xpwzqkrv`).
3. Replace `FORM_ID_TODO` with it.

Until configured, the form shows a success state but submissions are not captured. A warning appears in the browser console.

## Deploying

**Push to `main` = live.** GitHub Actions runs `npm run build` and deploys `out/` to the `gh-pages` branch automatically.

### One-time GitHub Pages setup

1. After the first push to `main`, go to **Settings → Pages → Source** → `gh-pages` branch, `/ (root)`
2. Custom domain: add `laxora.ai` once DNS is configured (see below)

### Custom domain (laxora.ai) — DNS setup

Once you have access to the DNS provider (Route 53 or similar):

1. Add A records on the apex domain pointing to GitHub Pages:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
2. Add a CNAME record: `www` → `laxora-ai.github.io`
3. In `public/CNAME`, confirm the file contains `laxora.ai`
4. In `.github/workflows/deploy.yml`, add `cname: laxora.ai` back to the deploy step and remove the `NEXT_PUBLIC_BASE_PATH` env var from the build step
5. In GitHub Settings → Pages → Custom domain, enter `laxora.ai` and enforce HTTPS

After DNS propagates, the site will be live at `https://laxora.ai`.

> **Note:** A privacy policy is needed before pushing the waitlist publicly. The form collects name, office name, office type, and work email.
