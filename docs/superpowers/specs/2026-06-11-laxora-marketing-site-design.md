# Laxora Marketing Website: Design Spec

**Date:** 2026-06-11
**Branch:** feat/marketing-website
**Status:** Approved — full spec provided by founder

---

## Palette (CSS custom properties)

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-alt` | `#FAFAF8` | Alternating section bands (slightly warm off-white) |
| `--text-head` | `#0F172A` | Headings, nav wordmark |
| `--text-body` | `#475569` | Body copy, card text |
| `--text-muted` | `#94A3B8` | Small labels, footer |
| `--accent` | `#0F766E` | CTAs, links, step highlights (sparingly, <12 uses) |
| `--accent-hover` | `#0D6B62` | Accent hover state |
| `--accent-text` | `#FFFFFF` | Text on accent backgrounds |
| `--border` | `#E2E8F0` | All borders, dividers |
| `--radius-card` | `10px` | Card corner radius |
| `--radius-btn` | `8px` | Button corner radius |

---

## Type Roles

| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| H1 (hero) | `clamp(2.5rem, 6vw, 4rem)` | 800 | -0.02em |
| H2 (section) | `clamp(1.75rem, 4vw, 2.5rem)` | 700 | -0.02em |
| H3 (card) | `1.125rem` | 600 | -0.01em |
| Body | `clamp(1rem, 1.5vw, 1.125rem)` | 400 | 0 |
| Small/label | `0.875rem` | 500 | 0.02em |
| Nav | `0.9375rem` | 500 | 0 |

Font: Inter variable (Google Fonts, display=swap), fallback: `system-ui, -apple-system, sans-serif`.

---

## Layout Concept

Single-column page, centered container (max 1100px), 16px horizontal padding. Sticky nav with solid/blurred background and 1px bottom border on scroll. Hero splits two-column on desktop (copy left, product mock right), stacks on mobile. Sections alternate `--bg` / `--bg-alt` for rhythm. Section padding: 112–140px desktop, 64px mobile. All spacing on 8px scale.

---

## Signature Element: The Booking Timeline

**What:** A pure HTML/CSS product mock in the hero showing the core workflow — not card stacks, not a dashboard. Three rows in a slim vertical timeline:

1. **Patient** — incoming message bubble: "Can I get a cleaning Thursday at 2?"
2. **Laxora** — parsing indicator → response: "Booked for Thursday at 2:00pm with Dr. Chen."
3. **Patient** — short confirmation reply: "Perfect, thanks"

Each row has a timestamp. The "Booked" confirmation row briefly highlights with a teal left-accent on load (CSS @keyframes, 300ms fade-in). The mock sits in a card with a very subtle shadow and a "Laxora" label in the header bar. On mobile it appears below the copy (order: 2).

**Why this works:** It shows exactly what the product does (AI booking a patient appointment) in a specific, believable scenario. It communicates "AI front desk" vs generic "AI assistant." Abstract enough to not promise a specific UI; concrete enough to be compelling.

---

## Sections

1. **Nav** — wordmark + anchor links + "Join the waitlist" CTA. Accessible mobile disclosure.
2. **Hero** — eyebrow, H1, supporting text, primary + ghost CTA, reassurance line, booking timeline mock.
3. **What we do** — 3 cards (Scheduling, Patient Q&A, Workflow automation) with inline SVG icons.
4. **How it works** — horizontal numbered flow on desktop, vertical on mobile.
5. **Who we serve** — 2-column card pair (Dental / Physician).
6. **Team** — 2 matching cards with placeholder photos, name, role, bio, LinkedIn.
7. **Waitlist form** — validated form with honeypot, aria-live status, submitting state, success state.
8. **Footer** — wordmark, copyright, anchor links, contact email.

---

## Motion

Fade-up on scroll via IntersectionObserver: `opacity 0 → 1`, `translateY 12px → 0`, `duration 400ms ease-out`. Siblings stagger by 80ms. Runs once per element. Fully disabled under `prefers-reduced-motion`. No other animations.

---

## Key Constraints

- Static HTML/CSS/JS only, no build step, no npm
- Deploys from repo root on GitHub Pages
- Total weight < 300 KB excluding fonts
- No fake claims, no compliance badges, no stock photos
- No banned vocabulary, no em dashes in body copy
- Form POSTs to Formspree (placeholder) or future API Gateway endpoint
