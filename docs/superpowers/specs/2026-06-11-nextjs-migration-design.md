---
name: nextjs-migration-design
description: Design spec for migrating Laxora marketing site from plain HTML/CSS/JS to Next.js 14 App Router + Tailwind CSS v3 with static export for GitHub Pages
metadata:
  type: project
---

# Laxora Marketing Site — Next.js Migration Design

**Date:** 2026-06-11
**Branch:** feat/marketing-website
**Approach chosen:** Token-extended Tailwind config + flat React components + Framer Motion FadeUp wrapper

---

## 1. Why

The plain HTML/CSS/JS site lacked smooth scroll-triggered animations and was visually unattractive. The migration brings:

- Framer Motion `whileInView` scroll animations with staggered card grids
- Tailwind v3 for fast, consistent responsive design
- Next.js `output: 'export'` for a fully static build compatible with GitHub Pages + custom domain (laxora.ai)
- A maintainable component model going forward

GitHub Pages compatibility was verified before starting: `output: 'export'` generates plain HTML/CSS/JS in `out/`; no `basePath` needed since the custom domain serves from root; `images: { unoptimized: true }` bypasses Next.js image optimization (requires a server).

---

## 2. Directory structure

```
laxora/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← <html>, Geist font, metadata, globals.css
│   │   ├── page.tsx            ← imports all section components in order
│   │   └── globals.css         ← @layer base (body, font-smoothing), ring-pulse keyframe
│   └── components/
│       ├── Nav.tsx             ← 'use client' — scroll border + mobile menu
│       ├── Hero.tsx            ← server component — booking mock UI
│       ├── WhatWeDo.tsx        ← server component — 3 feature cards
│       ├── HowItWorks.tsx      ← server component — 3 numbered steps
│       ├── WhoWeServe.tsx      ← server component — 2 practice cards
│       ├── Team.tsx            ← server component — 2 team cards
│       ├── WaitlistForm.tsx    ← 'use client' — form state, validation, fetch POST
│       ├── Footer.tsx          ← server component — logo, copyright, nav links
│       └── FadeUp.tsx          ← 'use client' — Framer Motion whileInView wrapper
├── public/
│   ├── CNAME                   ← laxora.ai (preserves custom domain through deploy)
│   ├── favicon.svg
│   └── assets/
│       ├── apple-touch-icon.png
│       ├── og-image.png
│       └── team/
│           ├── akash.jpg
│           └── pratik.jpg
├── _legacy/                    ← old static site files (delete when confirmed working)
│   ├── index.html
│   ├── components/             ← 8 HTML partials
│   ├── styles.css
│   ├── main.js
│   └── scripts/
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 3. Component architecture

### Server vs. client split

| Component | Type | Reason |
|---|---|---|
| `layout.tsx` | Server | static shell |
| `page.tsx` | Server | static section assembly |
| `Nav.tsx` | **Client** | `useState` mobile menu, `useEffect` scroll border |
| `Hero.tsx` | Server | static markup + booking mock |
| `WhatWeDo.tsx` | Server | static 3-card grid |
| `HowItWorks.tsx` | Server | static 3-step layout |
| `WhoWeServe.tsx` | Server | static 2-card grid |
| `Team.tsx` | Server | static 2-card grid |
| `WaitlistForm.tsx` | **Client** | form state, validation, fetch POST |
| `Footer.tsx` | Server | static links |
| `FadeUp.tsx` | **Client** | Framer Motion `whileInView` |

### FadeUp wrapper

```tsx
// src/components/FadeUp.tsx
'use client'
// Props: children, delay? (seconds, default 0), className?
// - useReducedMotion() check: renders children directly if true
// - motion.div whileInView={{ opacity: 1, y: 0 }}
//   initial={{ opacity: 0, y: 20 }}
//   transition={{ duration: 0.4, ease: 'easeOut', delay }}
//   viewport={{ once: true, margin: '-32px' }}
```

Card grids pass `delay={index * 0.08}` to each `<FadeUp>` child for stagger.

---

## 4. Tailwind design tokens

Extended in `tailwind.config.ts` under `theme.extend`:

```ts
colors: {
  heading:        '#0f172a',
  body:           '#475569',
  muted:          '#94a3b8',
  accent:         '#0f766e',
  'accent-hover': '#0d6b62',
  border:         '#e2e8f0',
  'bg-alt':       '#fafaf8',
},
fontFamily: {
  geist: ['Geist', 'system-ui', 'sans-serif'],
},
borderRadius: {
  card: '10px',
  btn:  '8px',
},
maxWidth: {
  container: '1100px',
},
```

---

## 5. Animations

| Element | Mechanism | Detail |
|---|---|---|
| Section content | `<FadeUp>` | `y: 20→0`, `opacity: 0→1`, 400ms ease-out |
| Card grids | `<FadeUp delay={i * 0.08}>` | 80ms stagger per card |
| Nav scroll border | CSS transition in Nav.tsx | `border-bottom` transitions in 150ms on scroll > 8px |
| Button hover | Tailwind `transition-colors duration-150` | bg/border transitions |
| Booking mock pulse | CSS keyframe `ring-pulse` in globals.css | applied to the Laxora confirmation bubble div; single 1.2s ring, 0.4s delay, `animation-fill-mode: both`, fires once on page load |
| Form focus | Tailwind `transition-shadow duration-150` | border color + box-shadow on focus |
| prefers-reduced-motion | `useReducedMotion()` in FadeUp | children render immediately, no motion |

`ring-pulse` keyframe (in `globals.css` `@layer base`):
```css
@keyframes ring-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.35); }
  70%  { box-shadow: 0 0 0 8px rgba(15, 118, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0); }
}
```

---

## 6. Sections: content and responsive behaviour

### Nav
- Sticky top-0, `backdrop-blur`, white bg, border-bottom on scroll
- Logo: SVG mark + "Laxora" wordmark
- Links: What we do, How it works, Who we serve, Team (anchor hash links)
- CTA: "Join the waitlist" → `#waitlist`
- Mobile (<768px): hamburger toggle, links in dropdown disclosure
- Min tap target: 44px for toggle and all links

### Hero
- Two-column desktop (copy left, booking mock right), single-column mobile (mock above copy)
- Label: "AI front desk · Early access"
- H1: "The AI front desk for modern healthcare practices."
- Body: "Laxora answers patient calls and messages, books and reschedules appointments, and takes routine front-office work off your team's plate. Your staff stays focused on the people in the room."
- CTAs: "Join the waitlist" (primary) + "See how it works" (ghost)
- Reassurance: "Now onboarding early dental and physician practices."
- Booking mock: chat UI showing patient booking message → Laxora confirmation (with `ring-pulse`) → patient "Perfect, thanks!"

### What We Do (bg-alt)
- Label: "What we do"
- H2: "Three things your front desk spends most of its time on."
- 3 cards: Scheduling, Patient Q&A, Workflow automation
- Grid: 3-col → 2-col (768px) → 1-col (375px)

### How It Works (white)
- Label: "How it works"
- H2: "Simple to start, designed to stay out of your way."
- 3 steps: Connect, Automate, Focus
- Desktop: horizontal with connector line between step numbers
- Mobile: vertical stack, connector becomes vertical line

### Who We Serve (bg-alt)
- Label: "Who we serve"
- H2: "Built for the way practices actually run."
- 2 cards: Dental offices, Physician offices
- Grid: 2-col → 1-col

### Team (white)
- Label: "Team"
- H2: "Built by people who want it to work."
- Card 1: Pratik Lamsal, Co-founder Infrastructure, photo: `/assets/team/pratik.jpg`, LinkedIn: https://www.linkedin.com/in/pratiklam/ — no bio (render card without bio)
- Card 2: Akash Hadagali Persetti, Co-founder Engineering, photo: `/assets/team/akash.jpg`, LinkedIn: https://www.linkedin.com/in/akash-hp/, bio: "Lead of product engineering at Laxora, focused on building AI systems reliable enough for healthcare."
- Grid: 2-col → 1-col

### Waitlist Form (bg-alt)
- H2: "Get early access."
- Subtext: "Tell us about your practice and we will reach out as onboarding opens."
- 4 fields in 2×2 grid (2-col rows → 1-col on mobile):
  - Full name (text, required)
  - Office name (text, required)
  - Office type (select: Dental office / Physician office / Other, required)
  - Work email (email, required)
- Honeypot: `name="company_website"`, `tabIndex={-1}`, visually hidden
- Submit: "Request early access" / "Sending..." states
- Success state: checkmark SVG + "You're on the list." + "We'll reach out as onboarding opens."
- Form endpoint: `https://formspree.io/f/FORM_ID_TODO` (placeholder, logs console warning)
- Privacy note: "Built with patient privacy and data security as first principles."
- Validation: blur + live-re-validate if already invalid; focus first invalid field on submit

### Footer (white)
- Logo + "© 2026 Laxora"
- Nav links: What we do, How it works, Who we serve, Team, Join the waitlist

---

## 7. Technical config

### next.config.ts
```ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
export default nextConfig
```

### Font loading
Geist loaded via `next/font/google` in `layout.tsx` as a variable font (wght 100–900), applied as a CSS variable on `<html>` and referenced in `tailwind.config.ts` fontFamily.

### Metadata (layout.tsx)
```ts
title: 'Laxora — The AI front desk for healthcare practices'
description: 'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices. Join the waitlist for early access.'
canonical: 'https://laxora.ai/'
openGraph: { url, title, description, images: ['/assets/og-image.png'] }
twitter: { card: 'summary_large_image', ... }
icons: { icon: '/favicon.svg', apple: '/assets/apple-touch-icon.png' }
```

### tsconfig.json
Standard Next.js 14 tsconfig with `"paths": { "@/*": ["./src/*"] }`.

---

## 8. Deploy pipeline

### .github/workflows/deploy.yml
- Trigger: `push` to `main`
- Node: 22 (current LTS)
- Steps: checkout → `npm ci` → `npm run build` → deploy `./out` to `gh-pages` branch
- Uses `peaceiris/actions-gh-pages@v3` with `publish_dir: ./out` and `cname: laxora.ai`
- `public/CNAME` also retained as belt-and-suspenders

### Verification
After `npm run build`:
- `out/index.html` exists
- `out/CNAME` contains `laxora.ai`
- Zero TypeScript errors

---

## 9. Legacy cleanup

Move to `_legacy/` (do not delete until user confirms Next.js build is working):
- `index.html`
- `components/` (all 8 HTML partials)
- `styles.css`
- `main.js`
- `scripts/`

`.nojekyll` stays at repo root (still required by GitHub Pages).
`assets/` contents move to `public/assets/`.

---

## 10. Out of scope

- CMS, MDX, blog
- Authentication
- Analytics
- Copy changes (all copy comes verbatim from component HTML files)
- API routes, SSR, ISR
