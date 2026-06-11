# Laxora Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Laxora marketing site from plain HTML/CSS/JS to Next.js 14 + Tailwind CSS v3 with static export deployed to GitHub Pages via GitHub Actions.

**Architecture:** Flat component tree under `src/components/` with server components for all static sections and three client components (Nav, WaitlistForm, FadeUp). Tailwind design tokens in `tailwind.config.ts` define the exact color palette. Framer Motion `whileInView` via a shared `FadeUp` wrapper. All legacy static files moved to `_legacy/` to be deleted after user confirmation.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS v3, Framer Motion v11, Geist font via `geist` npm package, peaceiris/actions-gh-pages@v3

---

## File Map

| File | Action |
|---|---|
| `package.json` | Create |
| `tsconfig.json` | Create |
| `next.config.ts` | Create |
| `tailwind.config.ts` | Create — all design tokens + ring-pulse keyframe |
| `postcss.config.mjs` | Create |
| `src/app/globals.css` | Create — @layer base, smooth scroll, antialiasing |
| `src/app/layout.tsx` | Create — Geist font, metadata/SEO, globals import |
| `src/app/page.tsx` | Create — assembles all sections |
| `src/components/FadeUp.tsx` | Create — Framer Motion whileInView wrapper, client |
| `src/components/Nav.tsx` | Create — sticky nav, scroll border, mobile menu, client |
| `src/components/Hero.tsx` | Create — headline, CTAs, booking mock UI, server |
| `src/components/WhatWeDo.tsx` | Create — 3-card feature grid, server |
| `src/components/HowItWorks.tsx` | Create — 3-step layout with connector, server |
| `src/components/WhoWeServe.tsx` | Create — 2-card practice grid, server |
| `src/components/Team.tsx` | Create — 2 team member cards, server |
| `src/components/WaitlistForm.tsx` | Create — form state, validation, Formspree POST, client |
| `src/components/Footer.tsx` | Create — logo, copyright, nav links, server |
| `public/CNAME` | Create — contains `laxora.ai` |
| `public/favicon.svg` | Copy from `assets/favicon.svg` |
| `public/assets/` | Copy from `assets/` |
| `_legacy/` | Create — move index.html, components/, styles.css, main.js, scripts/ |
| `.github/workflows/deploy.yml` | Create — build + deploy to gh-pages on push to main |

---

## Task 1: Initialize Next.js toolchain

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "laxora",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "framer-motion": "^11.3.0",
    "geist": "^1.3.0",
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Run `npm install`**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` written, no peer-dep errors.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "_legacy"]
}
```

- [ ] **Step 4: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 5: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
        geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
        btn:  '8px',
      },
      maxWidth: {
        container: '1100px',
      },
      keyframes: {
        'ring-pulse': {
          '0%':   { boxShadow: '0 0 0 0 rgba(15, 118, 110, 0.35)' },
          '70%':  { boxShadow: '0 0 0 8px rgba(15, 118, 110, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(15, 118, 110, 0)' },
        },
      },
      animation: {
        'ring-pulse': 'ring-pulse 1.2s ease-out 0.4s both',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default config
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs
git commit -m "feat: initialize Next.js 14 + Tailwind v3 toolchain"
```

---

## Task 2: App shell — globals, layout, placeholder page, first build

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (placeholder — replaced in Task 12)

- [ ] **Step 1: Create `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

- [ ] **Step 2: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Laxora — The AI front desk for healthcare practices',
  description:
    'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices. Join the waitlist for early access.',
  metadataBase: new URL('https://laxora.ai'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://laxora.ai/',
    title: 'Laxora — The AI front desk for healthcare practices',
    description:
      'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices.',
    images: [{ url: '/assets/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laxora — The AI front desk for healthcare practices',
    description:
      'Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices.',
    images: ['/assets/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/assets/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-geist antialiased text-body bg-white">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create placeholder `src/app/page.tsx`**

```tsx
export default function Home() {
  return <main />
}
```

- [ ] **Step 4: Run first build to confirm toolchain is wired correctly**

```bash
npm run build
```

Expected output ends with:
```
Route (app)     Size
┌ ○ /           ...
└ ○ /index.html ...
✓ Generating static pages
```

Confirm `out/index.html` exists:
```bash
ls out/index.html
```

Expected: file exists, no error.

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "feat: app shell — layout, globals, Geist font, metadata"
```

---

## Task 3: FadeUp animation wrapper

**Files:**
- Create: `src/components/FadeUp.tsx`

- [ ] **Step 1: Create `src/components/FadeUp.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/FadeUp.tsx
git commit -m "feat: FadeUp — Framer Motion whileInView wrapper with reduced-motion support"
```

---

## Task 4: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#who-we-serve', label: 'Who we serve' },
  { href: '#team', label: 'Team' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 bg-white transition-colors duration-150 ${
        scrolled ? 'border-b border-border' : ''
      }`}
    >
      <nav
        className="max-w-container mx-auto px-6 h-16 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Laxora home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
            <rect width="28" height="28" rx="7" fill="#0F766E" />
            <text
              x="14" y="20.5"
              fontFamily="var(--font-geist-sans),system-ui,sans-serif"
              fontSize="15" fontWeight="800"
              fill="white" textAnchor="middle"
            >
              L
            </text>
          </svg>
          <span className="text-heading font-semibold text-[15px] tracking-tight">Laxora</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-body hover:text-heading transition-colors duration-150"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-btn bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-150"
          >
            Join the waitlist
          </a>
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-heading"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect y="3" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="9" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="15" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-white px-6 py-3 flex flex-col"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-body hover:text-heading py-3 min-h-[44px] flex items-center transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 mb-3 inline-flex items-center justify-center h-11 px-4 rounded-btn bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-150"
            onClick={() => setMenuOpen(false)}
          >
            Join the waitlist
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: Nav — sticky header, scroll border, mobile hamburger menu"
```

---

## Task 5: Hero section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
import FadeUp from './FadeUp'

export default function Hero() {
  return (
    <section id="hero" className="py-20 md:py-28" aria-labelledby="hero-heading">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Copy */}
          <FadeUp className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              AI front desk · Early access
            </p>
            <h1
              id="hero-heading"
              className="text-[2.25rem] md:text-[2.75rem] font-bold text-heading leading-[1.15] tracking-tight mb-5"
            >
              The AI front desk for modern healthcare practices.
            </h1>
            <p className="text-body text-lg leading-relaxed mb-8 max-w-[520px]">
              Laxora answers patient calls and messages, books and reschedules appointments, and takes
              routine front-office work off your team&apos;s plate. Your staff stays focused on the
              people in the room.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center h-11 px-6 rounded-btn bg-accent hover:bg-accent-hover text-white font-medium transition-colors duration-150"
              >
                Join the waitlist
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-11 px-6 rounded-btn border border-border text-heading hover:border-heading font-medium transition-colors duration-150"
              >
                See how it works
              </a>
            </div>
            <p className="text-sm text-muted">
              Now onboarding early dental and physician practices.
            </p>
          </FadeUp>

          {/* Booking mock */}
          <FadeUp delay={0.1} className="flex-1 min-w-0 w-full max-w-[420px] md:max-w-none">
            <div className="rounded-card border border-border bg-white shadow-sm overflow-hidden" aria-hidden="true">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-bg-alt">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-medium text-muted">Laxora</span>
              </div>

              {/* Chat timeline */}
              <div className="p-5 flex flex-col gap-4">
                {/* Patient */}
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-body">JS</span>
                  </div>
                  <div className="bg-[#f1f5f9] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-heading">Can I get a cleaning Thursday at 2?</p>
                    <span className="text-[10px] text-muted mt-1 block">2:14 PM</span>
                  </div>
                </div>

                {/* Laxora confirmation — ring-pulse fires once on page load */}
                <div className="flex justify-end">
                  <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] animate-ring-pulse">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6.25" stroke="#0F766E" strokeWidth="1.5" />
                        <path d="M4 7l2 2 4-4" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs font-semibold text-accent">Appointment confirmed</span>
                    </div>
                    <p className="text-sm text-heading">
                      Booked for Thursday at 2:00 PM with Dr. Chen. A reminder will go out Wednesday morning.
                    </p>
                    <span className="text-[10px] text-muted mt-1 block">2:14 PM · Laxora</span>
                  </div>
                </div>

                {/* Patient reply */}
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-body">JS</span>
                  </div>
                  <div className="bg-[#f1f5f9] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-heading">Perfect, thanks!</p>
                    <span className="text-[10px] text-muted mt-1 block">2:15 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: Hero — headline, CTAs, booking mock with ring-pulse animation"
```

---

## Task 6: WhatWeDo section

**Files:**
- Create: `src/components/WhatWeDo.tsx`

- [ ] **Step 1: Create `src/components/WhatWeDo.tsx`**

```tsx
import FadeUp from './FadeUp'

const CARDS = [
  {
    title: 'Scheduling',
    description:
      'Patients book, reschedule, and confirm visits at any hour. Your calendar stays full and your phones stay quiet.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="3" width="18" height="17" rx="2" />
        <path d="M7 1v4M15 1v4M2 9h18" />
        <path d="M7 14h.01M11 14h.01M15 14h.01M7 18h.01M11 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Patient Q&A',
    description:
      'Instant, accurate answers about hours, insurance, prep instructions, and follow-ups. Patients get help in the channels they already use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Workflow automation',
    description:
      'Intake, reminders, recalls, and routine follow-ups run on their own. Your team sets the rules and stays in control.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 bg-bg-alt" aria-labelledby="what-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            What we do
          </span>
          <h2 id="what-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Three things your front desk spends most of its time on.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="bg-white rounded-card border border-border p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold text-heading mb-2">{card.title}</h3>
                <p className="text-sm text-body leading-relaxed">{card.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatWeDo.tsx
git commit -m "feat: WhatWeDo — 3-card feature grid with staggered FadeUp"
```

---

## Task 7: HowItWorks section

**Files:**
- Create: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Create `src/components/HowItWorks.tsx`**

The desktop layout uses a CSS grid with narrow connector columns between steps: `grid-cols-[1fr_48px_1fr_48px_1fr]`. The 48px columns hold a horizontal `<hr>`-style line aligned to the vertical center of the step-number circles. On mobile, the grid collapses to a single column; the connector divs are hidden via `hidden md:flex`.

```tsx
import { Fragment } from 'react'
import FadeUp from './FadeUp'

const STEPS = [
  {
    number: '1',
    title: 'Connect',
    description: 'Laxora plugs into your scheduling system and phone lines.',
  },
  {
    number: '2',
    title: 'Automate',
    description: 'It starts answering, booking, and following up under rules you set.',
  },
  {
    number: '3',
    title: 'Focus',
    description:
      'Your front desk handles the exceptions and the human moments. Laxora handles the routine.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" aria-labelledby="how-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            How it works
          </span>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Simple to start, designed to stay out of your way.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr_48px_1fr] items-start">
          {STEPS.map((step, i) => (
            <Fragment key={step.title}>
              <FadeUp
                delay={i * 0.08}
                className="flex flex-row md:flex-col items-start gap-5 pb-10 md:pb-0"
              >
                <div className="w-10 h-10 rounded-full border-2 border-accent text-accent font-bold text-sm flex items-center justify-center shrink-0">
                  {step.number}
                </div>
                <div className="md:mt-5">
                  <h3 className="text-base font-semibold text-heading mb-1">{step.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>

              {/* Horizontal connector (desktop only) — hidden between last two items */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:flex items-start justify-center pt-5"
                  aria-hidden="true"
                >
                  <div className="w-full h-px bg-border" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "feat: HowItWorks — 3-step layout with desktop connector line"
```

---

## Task 8: WhoWeServe section

**Files:**
- Create: `src/components/WhoWeServe.tsx`

- [ ] **Step 1: Create `src/components/WhoWeServe.tsx`**

```tsx
import FadeUp from './FadeUp'

const CARDS = [
  {
    title: 'Dental offices',
    description:
      'From solo practices to multi-location groups. Recall reminders, hygiene scheduling, new-patient intake, and the daily call volume that keeps your front desk tied up.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 13 12 13 22" />
      </svg>
    ),
  },
  {
    title: 'Physician offices',
    description:
      'Primary care and specialty clinics. Appointment management, refill and referral questions routed to the right place, and follow-ups that do not fall through the cracks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 bg-bg-alt" aria-labelledby="who-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Who we serve
          </span>
          <h2 id="who-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Built for the way practices actually run.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="bg-white rounded-card border border-border p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-heading mb-3">{card.title}</h3>
                <p className="text-body leading-relaxed">{card.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhoWeServe.tsx
git commit -m "feat: WhoWeServe — dental and physician office cards"
```

---

## Task 9: Team section

**Files:**
- Create: `src/components/Team.tsx`

- [ ] **Step 1: Create `src/components/Team.tsx`**

```tsx
import Image from 'next/image'
import FadeUp from './FadeUp'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TEAM = [
  {
    name: 'Pratik Lamsal',
    role: 'Co-founder, Infrastructure',
    photo: '/assets/team/pratik.jpg',
    bio: null as string | null,
    linkedin: 'https://www.linkedin.com/in/pratiklam/',
  },
  {
    name: 'Akash Hadagali Persetti',
    role: 'Co-founder, Engineering',
    photo: '/assets/team/akash.jpg',
    bio: 'Lead of product engineering at Laxora, focused on building AI systems reliable enough for healthcare.',
    linkedin: 'https://www.linkedin.com/in/akash-hp/',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20" aria-labelledby="team-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Team</span>
          <h2 id="team-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Built by people who want it to work.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.08}>
              <div className="rounded-card border border-border p-6 flex gap-5">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  width={96}
                  height={96}
                  className="rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-heading">{member.name}</h3>
                  <p className="text-sm text-muted mt-0.5 mb-2">{member.role}</p>
                  {member.bio && (
                    <p className="text-sm text-body leading-relaxed mb-3">{member.bio}</p>
                  )}
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors duration-150"
                    aria-label={`${member.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Team.tsx
git commit -m "feat: Team — Pratik and Akash cards with photos and LinkedIn links"
```

---

## Task 10: WaitlistForm component

**Files:**
- Create: `src/components/WaitlistForm.tsx`

- [ ] **Step 1: Create `src/components/WaitlistForm.tsx`**

```tsx
'use client'

import { useState, useRef } from 'react'

const FORM_ENDPOINT = 'https://formspree.io/f/FORM_ID_TODO'

type Fields = {
  full_name: string
  office_name: string
  office_type: string
  work_email: string
}

type Errors = Partial<Record<keyof Fields, string>>

const VALIDATORS: Record<keyof Fields, (v: string) => string> = {
  full_name:   (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
  office_name: (v) => v.trim().length >= 2 ? '' : 'Please enter your office name.',
  office_type: (v) => v ? '' : 'Please select an office type.',
  work_email:  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid work email.',
}

const EMPTY: Fields = { full_name: '', office_name: '', office_type: '', work_email: '' }

export default function WaitlistForm() {
  const [fields, setFields]       = useState<Fields>(EMPTY)
  const [errors, setErrors]       = useState<Errors>({})
  const [touched, setTouched]     = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [serverError, setServerError] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  function validate(name: keyof Fields, value: string) {
    return VALIDATORS[name](value)
  }

  function handleChange(name: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [name]: value }))
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validate(name, value) }))
  }

  function handleBlur(name: keyof Fields) {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: validate(name, fields[name]) }))
  }

  function validateAll(): boolean {
    const next: Errors = {}
    let valid = true
    for (const key of Object.keys(VALIDATORS) as (keyof Fields)[]) {
      const msg = validate(key, fields[key])
      next[key] = msg
      if (msg) valid = false
    }
    setErrors(next)
    setTouched({ full_name: true, office_name: true, office_type: true, work_email: true })
    return valid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (honeypotRef.current?.value.trim()) {
      setSuccess(true)
      return
    }

    if (!validateAll()) {
      const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setSubmitting(true)
    setServerError('')

    if (FORM_ENDPOINT.includes('FORM_ID_TODO')) {
      console.warn('[Laxora] FORM_ENDPOINT not configured — submissions not captured.')
      await new Promise((r) => setTimeout(r, 700))
      setSuccess(true)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name:   fields.full_name.trim(),
          office_name: fields.office_name.trim(),
          office_type: fields.office_type,
          work_email:  fields.work_email.trim(),
        }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        throw new Error(`Server responded ${res.status}`)
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again or email us at hello@laxora.ai.')
      console.error('[Laxora] Form submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  function fieldClass(name: keyof Fields) {
    const invalid = errors[name] && touched[name]
    return [
      'w-full h-11 px-3 rounded-btn border text-sm text-heading bg-white outline-none',
      'transition-all duration-150 focus:ring-2 focus:ring-accent/20',
      invalid
        ? 'border-red-400 focus:border-red-400'
        : 'border-border focus:border-accent',
    ].join(' ')
  }

  return (
    <section id="waitlist" className="py-20 bg-bg-alt" aria-labelledby="waitlist-heading">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto">

          {!success ? (
            <>
              <div className="mb-8 text-center">
                <h2 id="waitlist-heading" className="text-3xl font-bold text-heading tracking-tight">
                  Get early access.
                </h2>
                <p className="text-body mt-3">
                  Tell us about your practice and we will reach out as onboarding opens.
                </p>
              </div>

              {serverError && (
                <p role="alert" className="mb-4 text-sm text-red-600 text-center">
                  {serverError}
                </p>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Full name */}
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-heading mb-1.5">
                      Full name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text" id="full-name" name="full_name"
                      autoComplete="name" required aria-required="true"
                      aria-invalid={!!(errors.full_name && touched.full_name)}
                      aria-describedby="full-name-error"
                      value={fields.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      onBlur={() => handleBlur('full_name')}
                      className={fieldClass('full_name')}
                    />
                    {errors.full_name && touched.full_name && (
                      <span id="full-name-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.full_name}
                      </span>
                    )}
                  </div>

                  {/* Office name */}
                  <div>
                    <label htmlFor="office-name" className="block text-sm font-medium text-heading mb-1.5">
                      Office name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text" id="office-name" name="office_name"
                      autoComplete="organization" required aria-required="true"
                      aria-invalid={!!(errors.office_name && touched.office_name)}
                      aria-describedby="office-name-error"
                      value={fields.office_name}
                      onChange={(e) => handleChange('office_name', e.target.value)}
                      onBlur={() => handleBlur('office_name')}
                      className={fieldClass('office_name')}
                    />
                    {errors.office_name && touched.office_name && (
                      <span id="office-name-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.office_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Office type */}
                  <div>
                    <label htmlFor="office-type" className="block text-sm font-medium text-heading mb-1.5">
                      Office type <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="office-type" name="office_type"
                      required aria-required="true"
                      aria-invalid={!!(errors.office_type && touched.office_type)}
                      aria-describedby="office-type-error"
                      value={fields.office_type}
                      onChange={(e) => handleChange('office_type', e.target.value)}
                      onBlur={() => handleBlur('office_type')}
                      className={fieldClass('office_type')}
                    >
                      <option value="" disabled>Select office type</option>
                      <option value="dental">Dental office</option>
                      <option value="physician">Physician office</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.office_type && touched.office_type && (
                      <span id="office-type-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.office_type}
                      </span>
                    )}
                  </div>

                  {/* Work email */}
                  <div>
                    <label htmlFor="work-email" className="block text-sm font-medium text-heading mb-1.5">
                      Work email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email" id="work-email" name="work_email"
                      autoComplete="email" required aria-required="true"
                      aria-invalid={!!(errors.work_email && touched.work_email)}
                      aria-describedby="work-email-error"
                      value={fields.work_email}
                      onChange={(e) => handleChange('work_email', e.target.value)}
                      onBlur={() => handleBlur('work_email')}
                      className={fieldClass('work_email')}
                    />
                    {errors.work_email && touched.work_email && (
                      <span id="work-email-error" role="alert" className="text-xs text-red-500 mt-1 block">
                        {errors.work_email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Honeypot — hidden from users and screen readers */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website">Website</label>
                  <input
                    type="text" id="company_website" name="company_website"
                    ref={honeypotRef} tabIndex={-1} autoComplete="off"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-11 px-6 rounded-btn bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium transition-colors duration-150"
                  >
                    {submitting ? 'Sending…' : 'Request early access'}
                  </button>
                  <p className="text-xs text-muted">
                    Built with patient privacy and data security as first principles.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4" aria-hidden="true" focusable="false">
                <circle cx="24" cy="24" r="22" stroke="#0F766E" strokeWidth="2" />
                <path d="M14 24l7 7 13-14" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-xl font-bold text-heading mb-2">You&apos;re on the list.</h3>
              <p className="text-body">We&apos;ll reach out as onboarding opens.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WaitlistForm.tsx
git commit -m "feat: WaitlistForm — validation, honeypot, Formspree POST, success state"
```

---

## Task 11: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
const FOOTER_LINKS = [
  { href: '#what-we-do',   label: 'What we do' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#who-we-serve', label: 'Who we serve' },
  { href: '#team',         label: 'Team' },
  { href: '#waitlist',     label: 'Join the waitlist' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="max-w-container mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <a href="/" className="flex items-center gap-2 mb-2" aria-label="Laxora home">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
              <rect width="28" height="28" rx="7" fill="#0F766E" />
              <text
                x="14" y="20.5"
                fontFamily="var(--font-geist-sans),system-ui,sans-serif"
                fontSize="15" fontWeight="800"
                fill="white" textAnchor="middle"
              >
                L
              </text>
            </svg>
            <span className="text-heading font-semibold text-[15px] tracking-tight">Laxora</span>
          </a>
          <p className="text-xs text-muted">© 2026 Laxora</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-body hover:text-heading transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Footer — logo, copyright, nav links"
```

---

## Task 12: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx` (replace the placeholder from Task 2)

- [ ] **Step 1: Replace `src/app/page.tsx` with full assembly**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import HowItWorks from '@/components/HowItWorks'
import WhoWeServe from '@/components/WhoWeServe'
import Team from '@/components/Team'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <WhoWeServe />
        <Team />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: page.tsx — assemble all sections in order"
```

---

## Task 13: Public assets and legacy cleanup

**Files:**
- Create: `public/CNAME`
- Copy: `assets/favicon.svg` → `public/favicon.svg`
- Copy: `assets/` → `public/assets/`
- Move: `index.html`, `components/`, `styles.css`, `main.js`, `scripts/` → `_legacy/`

- [ ] **Step 1: Create `public/` directory and copy assets**

```bash
mkdir -p public/assets/team
cp CNAME public/CNAME
cp assets/favicon.svg public/favicon.svg
cp assets/apple-touch-icon.png public/assets/apple-touch-icon.png
cp assets/og-image.png public/assets/og-image.png
cp assets/team/akash.jpg public/assets/team/akash.jpg
cp assets/team/pratik.jpg public/assets/team/pratik.jpg
```

- [ ] **Step 2: Verify `public/CNAME` contains `laxora.ai`**

```bash
cat public/CNAME
```

Expected output: `laxora.ai`

- [ ] **Step 3: Move legacy static files to `_legacy/`**

```bash
mkdir -p _legacy
mv index.html _legacy/index.html
mv components _legacy/components
mv styles.css _legacy/styles.css
mv main.js _legacy/main.js
mv scripts _legacy/scripts
```

- [ ] **Step 4: Verify `.nojekyll` is still at repo root**

```bash
ls .nojekyll
```

Expected: file exists. If missing, create it: `touch .nojekyll`

- [ ] **Step 5: Commit**

```bash
git add public/ _legacy/ .nojekyll
git commit -m "chore: copy assets to public/, move legacy static files to _legacy/"
```

---

## Task 14: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          cname: laxora.ai
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: GitHub Actions deploy to gh-pages on push to main"
```

---

## Task 15: Full build verification

- [ ] **Step 1: Run full static build**

```bash
npm run build
```

Expected: build succeeds with zero TypeScript errors, output ends with:
```
✓ Generating static pages (1/1)
✓ Finalizing page optimization
Route (app)
└ ○ /    ...
```

- [ ] **Step 2: Confirm `out/` structure**

```bash
ls out/index.html out/CNAME out/favicon.svg out/assets/team/akash.jpg
```

Expected: all four paths exist without error.

- [ ] **Step 3: Confirm `out/CNAME` contains the custom domain**

```bash
cat out/CNAME
```

Expected output: `laxora.ai`

- [ ] **Step 4: Update `.gitignore` to exclude build output and Next.js cache**

Open `.gitignore` and confirm these lines are present (add if missing):

```
# Next.js
.next/
out/
node_modules/
```

- [ ] **Step 5: Final commit**

```bash
git add .gitignore
git commit -m "chore: verify build output, update .gitignore for Next.js artifacts"
```

---

## Self-Review Checklist

| Spec requirement | Task |
|---|---|
| Next.js 14 App Router + Tailwind v3 | Task 1 |
| `output: 'export'`, `trailingSlash`, `images: { unoptimized: true }` | Task 1 |
| Geist variable font (100–900) | Task 2 |
| Full metadata / OG / Twitter Card | Task 2 |
| FadeUp (whileInView, once, 400ms, prefers-reduced-motion) | Task 3 |
| Staggered card grids (80ms delay per card) | Tasks 6, 8, 9 |
| Nav sticky, scroll border, mobile hamburger | Task 4 |
| Hero headline, body, CTAs, booking mock | Task 5 |
| ring-pulse on confirmed bubble | Task 5 + tailwind.config in Task 1 |
| What We Do 3-card grid (3→2→1 col) | Task 6 |
| How It Works 3-step + connector (horizontal→vertical) | Task 7 |
| Who We Serve 2-card grid | Task 8 |
| Team 2-card grid, Pratik no bio, Akash with bio | Task 9 |
| Waitlist form — 4 fields, honeypot, validation, Formspree POST | Task 10 |
| Footer links | Task 11 |
| Page assembly in section order | Task 12 |
| CNAME in public/ → survives deploy | Task 13 |
| Legacy files in `_legacy/` | Task 13 |
| GitHub Actions deploy workflow | Task 14 |
| Build verification: out/index.html, out/CNAME | Task 15 |
| Design tokens: exact color palette | Task 1 (tailwind.config.ts) |
| All copy unchanged from component HTML files | Tasks 5–11 |
