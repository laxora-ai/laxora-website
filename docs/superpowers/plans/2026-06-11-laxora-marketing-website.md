# Laxora Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a single-page static marketing website for Laxora (laxora.ai) that explains the product and collects waitlist signups.

**Architecture:** One `index.html` page with anchor navigation; `styles.css` for all presentation; `main.js` for nav behavior, scroll animations, and form submission. All assets in `assets/`. Python scripts generate placeholder images. No build step, no frameworks, deploys directly from repo root on GitHub Pages.

**Tech Stack:** Semantic HTML5, CSS custom properties + clamp(), vanilla JS (ES2020), Inter variable font (Google Fonts), Python 3 + Pillow for image generation.

---

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Single page — all content, meta, landmark structure |
| `styles.css` | Design tokens (:root), reset, all component styles |
| `main.js` | Nav scroll/mobile, IntersectionObserver fade-up, form POST |
| `assets/favicon.svg` | "L" lettermark SVG |
| `assets/apple-touch-icon.png` | 180×180 PNG (generated) |
| `assets/og-image.png` | 1200×630 OG image (generated) |
| `assets/team/akash.jpg` | 800×800 placeholder (generated) |
| `assets/team/pratik.jpg` | 800×800 placeholder (generated) |
| `CNAME` | `laxora.ai` |
| `.nojekyll` | Disables Jekyll on GitHub Pages |
| `.gitignore` | Adds `screenshots/` and `.DS_Store` to existing file |
| `README.md` | Replaces existing minimal README |
| `scripts/generate-assets.py` | One-shot Python script to generate all PNG/image assets |

---

## Task 1: Scaffold — Repo Infrastructure

**Files:**
- Modify: `.gitignore`
- Create: `CNAME`, `.nojekyll`, `assets/.gitkeep`, `assets/team/.gitkeep`

- [ ] **Step 1: Add screenshots/ and .DS_Store to .gitignore**

Append to the end of the existing `.gitignore`:

```
# Project-specific
screenshots/
.DS_Store
```

- [ ] **Step 2: Create CNAME**

```
laxora.ai
```

(single line, no trailing newline issues — just the domain)

- [ ] **Step 3: Create .nojekyll**

Empty file. Tells GitHub Pages not to process with Jekyll.

```bash
touch .nojekyll
```

- [ ] **Step 4: Create asset directories**

```bash
mkdir -p assets/team
```

- [ ] **Step 5: Commit scaffold**

```bash
git add .gitignore CNAME .nojekyll
git commit -m "chore: scaffold github pages config and gitignore"
```

---

## Task 2: Design Tokens and Base Styles

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Write CSS with :root tokens, reset, and base typography**

```css
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --bg: #ffffff;
  --bg-alt: #fafaf8;
  --text-head: #0f172a;
  --text-body: #475569;
  --text-muted: #94a3b8;
  --accent: #0f766e;
  --accent-hover: #0d6b62;
  --accent-text: #ffffff;
  --border: #e2e8f0;
  --radius-card: 10px;
  --radius-btn: 8px;
  --container: 1100px;
  --pad-section: clamp(4rem, 10vw, 8.75rem);
  --pad-section-mobile: 4rem;
  --gap-8: 0.5rem;
  --gap-16: 1rem;
  --gap-24: 1.5rem;
  --gap-32: 2rem;
  --gap-48: 3rem;
  --gap-64: 4rem;
}

/* ============================================================
   RESET
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text-body);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; font: inherit; border: none; background: none; }
ul { list-style: none; }

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1, h2, h3, h4 {
  color: var(--text-head);
  letter-spacing: -0.02em;
  line-height: 1.15;
}
h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; }
h3 { font-size: 1.125rem; font-weight: 600; letter-spacing: -0.01em; }
p { max-width: 65ch; }

/* ============================================================
   LAYOUT
   ============================================================ */
.container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--gap-16);
}
section {
  padding-block: var(--pad-section);
}
.section-alt { background: var(--bg-alt); }

/* ============================================================
   SECTION LABELS
   ============================================================ */
.section-label {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--gap-16);
}
.section-intro {
  max-width: 52ch;
  margin-bottom: var(--gap-48);
}
.section-intro h2 { margin-bottom: var(--gap-16); }

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-8);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-btn);
  font-size: 0.9375rem;
  font-weight: 600;
  min-height: 44px;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
  white-space: nowrap;
}
.btn-primary {
  background: var(--accent);
  color: var(--accent-text);
}
.btn-primary:hover, .btn-primary:focus-visible {
  background: var(--accent-hover);
}
.btn-ghost {
  border: 1.5px solid var(--border);
  color: var(--text-head);
}
.btn-ghost:hover, .btn-ghost:focus-visible {
  border-color: var(--text-head);
}

/* ============================================================
   FOCUS STYLES
   ============================================================ */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ============================================================
   SCROLL ANIMATION SETUP
   ============================================================ */
.fade-up {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}
.fade-up.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .fade-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Serve and verify base renders**

```bash
cd /Users/akashhp/Developer/laxora && python3 -m http.server 8080
```

Open http://localhost:8080 — expect blank page with no console errors.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: design tokens, reset, and base styles"
```

---

## Task 3: Google Fonts and HTML Shell

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the HTML document shell**

Full file (meta, title, font preconnect, landmark structure — no section content yet):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Laxora — The AI front desk for healthcare practices</title>
  <meta name="description" content="Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices. Join the waitlist for early access." />
  <link rel="canonical" href="https://laxora.ai/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://laxora.ai/" />
  <meta property="og:title" content="Laxora — The AI front desk for healthcare practices" />
  <meta property="og:description" content="Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices." />
  <meta property="og:image" content="https://laxora.ai/assets/og-image.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Laxora — The AI front desk for healthcare practices" />
  <meta name="twitter:description" content="Laxora handles patient scheduling, messages, and front-office tasks for dental and physician practices." />
  <meta name="twitter:image" content="https://laxora.ai/assets/og-image.png" />

  <!-- Favicon -->
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <header class="site-header" role="banner">
    <nav class="nav container" aria-label="Main navigation">
      <!-- Task 4 -->
    </nav>
  </header>

  <main id="main-content">

    <section id="hero" class="hero" aria-labelledby="hero-heading">
      <!-- Task 5 -->
    </section>

    <section id="what-we-do" class="section-alt" aria-labelledby="what-heading">
      <!-- Task 6 -->
    </section>

    <section id="how-it-works" aria-labelledby="how-heading">
      <!-- Task 7 -->
    </section>

    <section id="who-we-serve" class="section-alt" aria-labelledby="who-heading">
      <!-- Task 8 -->
    </section>

    <section id="team" aria-labelledby="team-heading">
      <!-- Task 9 -->
    </section>

    <section id="waitlist" class="section-alt" aria-labelledby="waitlist-heading">
      <!-- Task 10 -->
    </section>

  </main>

  <footer class="site-footer" role="contentinfo">
    <!-- Task 11 -->
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create empty main.js placeholder**

```js
// main.js — Nav, animations, form (Tasks 12-13)
```

- [ ] **Step 3: Verify shell renders**

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. Expect: blank page, title "Laxora — The AI front desk…" in browser tab, no errors.

- [ ] **Step 4: Commit**

```bash
git add index.html main.js
git commit -m "feat: html shell with meta tags and landmark structure"
```

---

## Task 4: Nav Component

**Files:**
- Modify: `index.html` (nav block), `styles.css` (nav styles)

- [ ] **Step 1: Add nav HTML inside the nav element**

Replace the `<!-- Task 4 -->` comment:

```html
<a href="/" class="nav-logo" aria-label="Laxora home">
  <svg class="nav-logo-mark" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect width="28" height="28" rx="7" fill="#0F766E"/>
    <text x="14" y="20" font-family="Inter,system-ui,sans-serif" font-size="16" font-weight="800"
          fill="white" text-anchor="middle" dominant-baseline="auto">L</text>
  </svg>
  <span class="nav-wordmark">Laxora</span>
</a>

<button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open navigation menu">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect y="3" width="20" height="2" rx="1" fill="currentColor"/>
    <rect y="9" width="20" height="2" rx="1" fill="currentColor"/>
    <rect y="15" width="20" height="2" rx="1" fill="currentColor"/>
  </svg>
</button>

<ul class="nav-links" id="nav-links" role="list">
  <li><a href="#what-we-do">What we do</a></li>
  <li><a href="#how-it-works">How it works</a></li>
  <li><a href="#who-we-serve">Who we serve</a></li>
  <li><a href="#team">Team</a></li>
</ul>

<a href="#waitlist" class="btn btn-primary nav-cta">Join the waitlist</a>
```

- [ ] **Step 2: Add nav styles to styles.css**

```css
/* ============================================================
   NAV
   ============================================================ */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color 200ms ease;
}
.site-header.scrolled {
  border-bottom-color: var(--border);
}
.nav {
  display: flex;
  align-items: center;
  gap: var(--gap-32);
  padding-block: 1rem;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: auto;
  text-decoration: none;
}
.nav-wordmark {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-head);
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--gap-32);
}
.nav-links a {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-body);
  transition: color 150ms ease;
}
.nav-links a:hover { color: var(--text-head); }
.nav-cta { padding: 0.5rem 1.125rem; font-size: 0.9375rem; }
.nav-toggle {
  display: none;
  color: var(--text-head);
  padding: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .nav { flex-wrap: wrap; gap: var(--gap-16); }
  .nav-logo { flex: 1; }
  .nav-toggle { display: flex; }
  .nav-cta { display: none; }
  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    border-top: 1px solid var(--border);
    padding-top: var(--gap-16);
    padding-bottom: var(--gap-16);
  }
  .nav-links.open { display: flex; }
  .nav-links li { width: 100%; }
  .nav-links a {
    display: block;
    padding-block: 0.625rem;
    font-size: 1rem;
  }
}
```

- [ ] **Step 3: Verify nav renders at 375px and 1440px**

Resize browser. At 1440px: wordmark, 4 links, CTA button all visible on one line. At 375px: wordmark + hamburger visible, links hidden. No horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: nav with wordmark, anchor links, and mobile disclosure"
```

---

## Task 5: Hero Section

**Files:**
- Modify: `index.html` (hero section), `styles.css` (hero styles)

- [ ] **Step 1: Add hero HTML replacing `<!-- Task 5 -->`**

```html
<div class="container hero-inner">
  <div class="hero-copy fade-up">
    <p class="section-label">AI front desk · Early access</p>
    <h1 id="hero-heading">The AI front desk for modern healthcare practices.</h1>
    <p class="hero-body">Laxora answers patient calls and messages, books and reschedules appointments, and takes routine front-office work off your team's plate. Your staff stays focused on the people in the room.</p>
    <div class="hero-actions">
      <a href="#waitlist" class="btn btn-primary">Join the waitlist</a>
      <a href="#how-it-works" class="btn btn-ghost">See how it works</a>
    </div>
    <p class="hero-reassurance">Now onboarding early dental and physician practices.</p>
  </div>

  <div class="hero-visual fade-up" aria-hidden="true">
    <div class="booking-mock">
      <div class="mock-header">
        <div class="mock-dot mock-dot-red"></div>
        <div class="mock-dot mock-dot-yellow"></div>
        <div class="mock-dot mock-dot-green"></div>
        <span class="mock-title">Laxora</span>
      </div>
      <div class="mock-timeline">
        <div class="mock-row mock-row-patient">
          <div class="mock-avatar mock-avatar-patient">JS</div>
          <div class="mock-bubble mock-bubble-patient">
            <p class="mock-text">Can I get a cleaning Thursday at 2?</p>
            <span class="mock-time">2:14 PM</span>
          </div>
        </div>
        <div class="mock-row mock-row-laxora">
          <div class="mock-bubble mock-bubble-laxora mock-confirmed">
            <div class="mock-status">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6.25" stroke="#0F766E" stroke-width="1.5"/>
                <path d="M4 7l2 2 4-4" stroke="#0F766E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="mock-status-text">Appointment confirmed</span>
            </div>
            <p class="mock-text">Booked for Thursday at 2:00 PM with Dr. Chen. A reminder will go out Wednesday morning.</p>
            <span class="mock-time">2:14 PM · Laxora</span>
          </div>
        </div>
        <div class="mock-row mock-row-patient">
          <div class="mock-avatar mock-avatar-patient">JS</div>
          <div class="mock-bubble mock-bubble-patient">
            <p class="mock-text">Perfect, thanks!</p>
            <span class="mock-time">2:15 PM</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add hero styles to styles.css**

```css
/* ============================================================
   HERO
   ============================================================ */
.hero {
  padding-block: clamp(5rem, 12vw, 9rem);
  overflow: hidden;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-64);
  align-items: center;
}
.hero-copy h1 {
  margin-bottom: var(--gap-24);
}
.hero-body {
  font-size: clamp(1.0625rem, 2vw, 1.1875rem);
  color: var(--text-body);
  margin-bottom: var(--gap-32);
  max-width: 52ch;
}
.hero-actions {
  display: flex;
  gap: var(--gap-16);
  flex-wrap: wrap;
  margin-bottom: var(--gap-24);
}
.hero-reassurance {
  font-size: 0.875rem;
  color: var(--text-muted);
  max-width: none;
}
.hero-copy .fade-up { transition-delay: 0ms; }
.hero-visual.fade-up { transition-delay: 80ms; }

/* Booking mock */
.booking-mock {
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg);
  box-shadow: 0 4px 32px rgba(15, 23, 42, 0.07);
  overflow: hidden;
  max-width: 420px;
  margin-inline: auto;
}
.mock-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-alt);
}
.mock-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.mock-dot-red { background: #ff5f57; }
.mock-dot-yellow { background: #febc2e; }
.mock-dot-green { background: #28c840; }
.mock-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-body);
  margin-left: auto;
  margin-right: auto;
  padding-right: 34px; /* optical center accounting for dots */
}
.mock-timeline {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.mock-row {
  display: flex;
  gap: 0.625rem;
  align-items: flex-end;
}
.mock-row-laxora { flex-direction: column; padding-left: 0; }
.mock-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--border);
  color: var(--text-muted);
  font-size: 0.6875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mock-bubble {
  border-radius: 10px;
  padding: 0.625rem 0.875rem;
  max-width: 85%;
}
.mock-bubble-patient {
  background: var(--bg-alt);
  border: 1px solid var(--border);
}
.mock-bubble-laxora {
  background: #f0fdf9;
  border: 1px solid #99f6e4;
  width: 100%;
  max-width: 100%;
}
.mock-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.375rem;
}
.mock-status-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
}
.mock-text {
  font-size: 0.8125rem;
  color: var(--text-head);
  line-height: 1.5;
  max-width: none;
  margin-bottom: 0.25rem;
}
.mock-time {
  font-size: 0.6875rem;
  color: var(--text-muted);
  display: block;
}
.mock-confirmed {
  animation: confirm-pulse 600ms ease-out 500ms both;
}
@keyframes confirm-pulse {
  from { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.2); }
  to { box-shadow: 0 0 0 6px rgba(15, 118, 110, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .mock-confirmed { animation: none; }
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--gap-48);
  }
  .hero-visual { order: -1; }
  .booking-mock { max-width: 380px; }
}
@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
}
```

- [ ] **Step 3: Verify hero renders**

At 1440px: two-column layout, copy left, booking mock right. At 375px: mock appears above copy, both full-width. Booking mock has three rows, teal confirmed row, no overflow.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: hero section with booking timeline product mock"
```

---

## Task 6: What We Do Section (3 Cards)

**Files:**
- Modify: `index.html` (what-we-do section), `styles.css`

- [ ] **Step 1: Add What We Do HTML replacing `<!-- Task 6 -->`**

```html
<div class="container">
  <div class="section-intro fade-up">
    <span class="section-label">What we do</span>
    <h2 id="what-heading">Three things your front desk spends most of its time on.</h2>
  </div>
  <div class="cards-grid">
    <div class="card fade-up">
      <div class="card-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="18" height="17" rx="2"/>
          <path d="M7 1v4M15 1v4M2 9h18"/>
          <path d="M7 14h2M13 14h2M7 18h2"/>
        </svg>
      </div>
      <h3>Scheduling</h3>
      <p>Patients book, reschedule, and confirm visits at any hour. Your calendar stays full and your phones stay quiet.</p>
    </div>
    <div class="card fade-up">
      <div class="card-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3>Patient Q&A</h3>
      <p>Instant, accurate answers about hours, insurance, prep instructions, and follow-ups. Patients get help in the channels they already use.</p>
    </div>
    <div class="card fade-up">
      <div class="card-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <h3>Workflow automation</h3>
      <p>Intake, reminders, recalls, and routine follow-ups run on their own. Your team sets the rules and stays in control.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add card styles to styles.css**

```css
/* ============================================================
   CARDS GRID
   ============================================================ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-24);
}
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--gap-32);
  transition: box-shadow 200ms ease;
}
.card:hover {
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.07);
}
.card-icon {
  color: var(--accent);
  margin-bottom: var(--gap-16);
}
.card h3 { margin-bottom: var(--gap-8); }
.card p { color: var(--text-body); font-size: 0.9375rem; max-width: none; }

/* Stagger fade-up for card siblings */
.cards-grid .card:nth-child(1).fade-up { transition-delay: 0ms; }
.cards-grid .card:nth-child(2).fade-up { transition-delay: 80ms; }
.cards-grid .card:nth-child(3).fade-up { transition-delay: 160ms; }

@media (max-width: 900px) {
  .cards-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .cards-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify 3-column card layout at 1440px, 2-column at 768px, 1-column at 375px**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: what we do section with 3 feature cards"
```

---

## Task 7: How It Works Section

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add How It Works HTML replacing `<!-- Task 7 -->`**

```html
<div class="container">
  <div class="section-intro fade-up">
    <span class="section-label">How it works</span>
    <h2 id="how-heading">Simple to start, designed to stay out of your way.</h2>
  </div>
  <div class="steps">
    <div class="step fade-up">
      <div class="step-number" aria-hidden="true">1</div>
      <div class="step-connector" aria-hidden="true"></div>
      <h3>Connect</h3>
      <p>Laxora plugs into your scheduling system and phone lines.</p>
    </div>
    <div class="step fade-up">
      <div class="step-number" aria-hidden="true">2</div>
      <div class="step-connector" aria-hidden="true"></div>
      <h3>Automate</h3>
      <p>It starts answering, booking, and following up under rules you set.</p>
    </div>
    <div class="step fade-up">
      <div class="step-number" aria-hidden="true">3</div>
      <h3>Focus</h3>
      <p>Your front desk handles the exceptions and the human moments. Laxora handles the routine.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add steps styles to styles.css**

```css
/* ============================================================
   HOW IT WORKS (STEPS)
   ============================================================ */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-32);
  position: relative;
}
.step {
  position: relative;
  padding-top: var(--gap-48);
}
.step-number {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  z-index: 1;
}
.step-connector {
  position: absolute;
  top: 19px;
  left: 40px;
  right: calc(-1 * var(--gap-32) - 0px);
  height: 1px;
  background: var(--border);
}
.step:last-child .step-connector { display: none; }
.step h3 { margin-bottom: var(--gap-8); }
.step p { font-size: 0.9375rem; color: var(--text-body); max-width: none; }

.steps .step:nth-child(1).fade-up { transition-delay: 0ms; }
.steps .step:nth-child(2).fade-up { transition-delay: 80ms; }
.steps .step:nth-child(3).fade-up { transition-delay: 160ms; }

@media (max-width: 768px) {
  .steps { grid-template-columns: 1fr; gap: var(--gap-32); }
  .step { padding-top: 0; padding-left: 56px; }
  .step-number { top: 0; left: 0; }
  .step-connector {
    top: 40px;
    left: 19px;
    right: auto;
    width: 1px;
    height: calc(100% + var(--gap-32));
  }
}
```

- [ ] **Step 3: Verify horizontal 3-step flow on desktop, vertical stack on mobile**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: how it works section with connected steps"
```

---

## Task 8: Who We Serve Section

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add Who We Serve HTML replacing `<!-- Task 8 -->`**

```html
<div class="container">
  <div class="section-intro fade-up">
    <span class="section-label">Who we serve</span>
    <h2 id="who-heading">Built for the way practices actually run.</h2>
  </div>
  <div class="serve-grid">
    <div class="serve-card fade-up">
      <div class="serve-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 13 12 13 22"/>
        </svg>
      </div>
      <h3>Dental offices</h3>
      <p>From solo practices to multi-location groups. Recall reminders, hygiene scheduling, new-patient intake, and the daily call volume that keeps your front desk tied up.</p>
    </div>
    <div class="serve-card fade-up">
      <div class="serve-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <h3>Physician offices</h3>
      <p>Primary care and specialty clinics. Appointment management, refill and referral questions routed to the right place, and follow-ups that do not fall through the cracks.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add serve-grid styles to styles.css**

```css
/* ============================================================
   WHO WE SERVE
   ============================================================ */
.serve-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-24);
}
.serve-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--gap-32) var(--gap-32) var(--gap-48);
}
.serve-icon {
  color: var(--accent);
  margin-bottom: var(--gap-16);
}
.serve-card h3 { margin-bottom: var(--gap-8); }
.serve-card p { color: var(--text-body); font-size: 0.9375rem; max-width: none; }

.serve-grid .serve-card:nth-child(1).fade-up { transition-delay: 0ms; }
.serve-grid .serve-card:nth-child(2).fade-up { transition-delay: 80ms; }

@media (max-width: 640px) {
  .serve-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: who we serve section with dental and physician cards"
```

---

## Task 9: Team Section and Placeholder Photo Generation

**Files:**
- Modify: `index.html`, `styles.css`
- Create: `scripts/generate-assets.py`, `assets/team/akash.jpg`, `assets/team/pratik.jpg`

- [ ] **Step 1: Write the asset generation script**

Create `scripts/generate-assets.py`:

```python
#!/usr/bin/env python3
"""Generate placeholder team photos, favicon PNG, and OG image for Laxora website."""

from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
TEAM_DIR = os.path.join(OUT_DIR, "team")
os.makedirs(TEAM_DIR, exist_ok=True)

BG = (250, 250, 248)          # --bg-alt
HEAD = (15, 23, 42)           # --text-head
MUTED = (148, 163, 184)       # --text-muted
ACCENT = (15, 118, 110)       # --accent
WHITE = (255, 255, 255)

def get_font(size, bold=False):
    """Try to load Inter or fall back to default."""
    paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def team_placeholder(initials, filename):
    size = 800
    img = Image.new("RGB", (size, size), BG)
    d = ImageDraw.Draw(img)
    # Subtle circle
    margin = 120
    d.ellipse([margin, margin, size - margin, size - margin],
              outline=(*MUTED, 80), width=2)
    # Initials
    font = get_font(200, bold=True)
    bbox = d.textbbox((0, 0), initials, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1]),
           initials, fill=HEAD, font=font)
    path = os.path.join(TEAM_DIR, filename)
    img.save(path, "JPEG", quality=92)
    print(f"  Created {path}")

def og_image():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    # Accent bar top
    d.rectangle([0, 0, w, 6], fill=ACCENT)
    # Wordmark
    font_lg = get_font(80, bold=True)
    font_sm = get_font(34)
    d.text((80, 120), "Laxora", fill=HEAD, font=font_lg)
    d.text((80, 240), "The AI front desk for modern", fill=HEAD, font=font_sm)
    d.text((80, 290), "healthcare practices.", fill=HEAD, font=font_sm)
    # Accent dot
    d.ellipse([1100, 540, 1160, 600], fill=ACCENT)
    path = os.path.join(OUT_DIR, "og-image.png")
    img.save(path, "PNG")
    print(f"  Created {path}")

def apple_touch_icon():
    size = 180
    img = Image.new("RGB", (size, size), ACCENT)
    d = ImageDraw.Draw(img)
    font = get_font(110, bold=True)
    bbox = d.textbbox((0, 0), "L", font=font)
    bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - bw) / 2 - bbox[0], (size - bh) / 2 - bbox[1] - 4),
           "L", fill=WHITE, font=font)
    path = os.path.join(OUT_DIR, "apple-touch-icon.png")
    img.save(path, "PNG")
    print(f"  Created {path}")

if __name__ == "__main__":
    print("Generating assets...")
    team_placeholder("AH", "akash.jpg")
    team_placeholder("P", "pratik.jpg")
    og_image()
    apple_touch_icon()
    print("Done.")
```

- [ ] **Step 2: Install Pillow if needed and run the script**

```bash
pip3 install Pillow --quiet 2>/dev/null || pip install Pillow --quiet 2>/dev/null
python3 scripts/generate-assets.py
```

Expected output:
```
Generating assets...
  Created .../assets/team/akash.jpg
  Created .../assets/team/pratik.jpg
  Created .../assets/og-image.png
  Created .../assets/apple-touch-icon.png
Done.
```

- [ ] **Step 3: Add team HTML replacing `<!-- Task 9 -->`**

```html
<div class="container">
  <div class="section-intro fade-up">
    <span class="section-label">Team</span>
    <h2 id="team-heading">Built by people who want it to work.</h2>
  </div>
  <div class="team-grid">
    <div class="team-card fade-up">
      <img src="assets/team/akash.jpg"
           alt="Akash Hadagali Persetti"
           width="120" height="120"
           class="team-photo" />
      <div class="team-info">
        <h3>Akash Hadagali Persetti</h3>
        <p class="team-role">Co-founder, Engineering</p>
        <!-- TODO: Akash bio -->
        <a href="https://linkedin.com/in/akash-hadagali-persetti" class="team-linkedin" aria-label="Akash on LinkedIn" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
    <div class="team-card fade-up">
      <img src="assets/team/pratik.jpg"
           alt="Pratik"
           width="120" height="120"
           class="team-photo" />
      <div class="team-info">
        <!-- TODO: Pratik -->
        <h3>Pratik</h3>
        <p class="team-role">Co-founder<!-- TODO: Pratik role --></p>
        <!-- TODO: Pratik bio -->
        <a href="#" class="team-linkedin" aria-label="Pratik on LinkedIn" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Add team styles to styles.css**

```css
/* ============================================================
   TEAM
   ============================================================ */
.team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-24);
}
.team-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--gap-32);
  display: flex;
  gap: var(--gap-24);
  align-items: flex-start;
  background: var(--bg);
}
.team-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--border);
}
.team-info h3 { margin-bottom: 0.25rem; }
.team-role {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: var(--gap-16);
  max-width: none;
}
.team-linkedin {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  transition: color 150ms ease;
}
.team-linkedin:hover { color: var(--accent-hover); }

.team-grid .team-card:nth-child(1).fade-up { transition-delay: 0ms; }
.team-grid .team-card:nth-child(2).fade-up { transition-delay: 80ms; }

@media (max-width: 640px) {
  .team-grid { grid-template-columns: 1fr; }
  .team-card { flex-direction: column; }
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css scripts/ assets/team/ assets/og-image.png assets/apple-touch-icon.png
git commit -m "feat: team section and generated placeholder images"
```

---

## Task 10: Waitlist Form

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add form HTML replacing `<!-- Task 10 -->`**

```html
<div class="container">
  <div class="form-wrapper fade-up">
    <div class="form-intro">
      <h2 id="waitlist-heading">Get early access.</h2>
      <p>Tell us about your practice and we will reach out as onboarding opens.</p>
    </div>
    <div id="form-status" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>
    <form id="waitlist-form" class="waitlist-form" novalidate>
      <div class="form-row">
        <div class="field">
          <label for="full-name">Full name <span class="field-required" aria-hidden="true">*</span></label>
          <input type="text" id="full-name" name="full_name" autocomplete="name"
                 required aria-required="true"
                 aria-describedby="full-name-error" />
          <span id="full-name-error" class="field-error" role="alert" aria-live="polite"></span>
        </div>
        <div class="field">
          <label for="office-name">Office name <span class="field-required" aria-hidden="true">*</span></label>
          <input type="text" id="office-name" name="office_name" autocomplete="organization"
                 required aria-required="true"
                 aria-describedby="office-name-error" />
          <span id="office-name-error" class="field-error" role="alert" aria-live="polite"></span>
        </div>
      </div>
      <div class="form-row">
        <div class="field">
          <label for="office-type">Office type <span class="field-required" aria-hidden="true">*</span></label>
          <select id="office-type" name="office_type"
                  required aria-required="true"
                  aria-describedby="office-type-error">
            <option value="" disabled selected>Select office type</option>
            <option value="dental">Dental office</option>
            <option value="physician">Physician office</option>
            <option value="other">Other</option>
          </select>
          <span id="office-type-error" class="field-error" role="alert" aria-live="polite"></span>
        </div>
        <div class="field">
          <label for="work-email">Work email <span class="field-required" aria-hidden="true">*</span></label>
          <input type="email" id="work-email" name="work_email" autocomplete="email"
                 required aria-required="true"
                 aria-describedby="work-email-error" />
          <span id="work-email-error" class="field-error" role="alert" aria-live="polite"></span>
        </div>
      </div>
      <!-- Honeypot: hidden from users and screen readers -->
      <div class="field-honey" aria-hidden="true">
        <label for="company_website">Website</label>
        <input type="text" id="company_website" name="company_website"
               tabindex="-1" autocomplete="off" />
      </div>
      <div class="form-footer">
        <button type="submit" id="submit-btn" class="btn btn-primary form-submit">
          <span class="btn-label">Request early access</span>
          <span class="btn-submitting" hidden aria-hidden="true">Sending...</span>
        </button>
        <p class="form-privacy">Built with patient privacy and data security as first principles.</p>
      </div>
    </form>
    <div id="form-success" class="form-success" hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="19" stroke="#0F766E" stroke-width="2"/>
        <path d="M12 20l6 6 10-12" stroke="#0F766E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3>You're on the list.</h3>
      <p>We'll reach out as onboarding opens.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add form styles to styles.css**

```css
/* ============================================================
   WAITLIST FORM
   ============================================================ */
.form-wrapper {
  max-width: 680px;
  margin-inline: auto;
}
.form-intro { margin-bottom: var(--gap-32); }
.form-intro h2 { margin-bottom: var(--gap-8); }
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-24);
  margin-bottom: var(--gap-24);
}
.field { display: flex; flex-direction: column; gap: 0.375rem; }
label {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-head);
}
.field-required { color: var(--accent); }
input, select {
  padding: 0.6875rem 0.875rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-btn);
  font: inherit;
  font-size: 0.9375rem;
  color: var(--text-head);
  background: var(--bg);
  min-height: 44px;
  transition: border-color 150ms ease;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
}
input:focus, select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
}
input.invalid, select.invalid {
  border-color: #dc2626;
}
input.invalid:focus, select.invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
}
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M3 5l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  padding-right: 2.5rem;
}
.field-error {
  font-size: 0.8125rem;
  color: #dc2626;
  min-height: 1rem;
  display: block;
}
.field-honey {
  position: absolute;
  left: -9999px;
  top: -9999px;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  height: 0;
}
.form-footer {
  display: flex;
  align-items: center;
  gap: var(--gap-24);
  flex-wrap: wrap;
  margin-top: var(--gap-8);
}
.form-submit { min-width: 200px; justify-content: center; }
.form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
.form-privacy {
  font-size: 0.8125rem;
  color: var(--text-muted);
  max-width: 40ch;
}
.form-success {
  text-align: center;
  padding: var(--gap-48) var(--gap-32);
}
.form-success svg { margin-inline: auto; margin-bottom: var(--gap-16); }
.form-success h3 { margin-bottom: var(--gap-8); color: var(--text-head); }
.form-success p { color: var(--text-body); margin-inline: auto; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: flex-start; }
  .form-submit { width: 100%; }
}
```

- [ ] **Step 3: Verify form renders correctly at all breakpoints**

All four fields visible, labels associated, required markers, submit button at least 44px tall.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: waitlist form with accessible labels and validation UI"
```

---

## Task 11: Footer

**Files:**
- Modify: `index.html`, `styles.css`

- [ ] **Step 1: Add footer HTML replacing `<!-- Task 11 -->`**

```html
<div class="footer-inner container">
  <div class="footer-brand">
    <a href="/" class="nav-logo footer-logo" aria-label="Laxora home">
      <svg class="nav-logo-mark" width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#0F766E"/>
        <text x="14" y="20" font-family="Inter,system-ui,sans-serif" font-size="16" font-weight="800"
              fill="white" text-anchor="middle" dominant-baseline="auto">L</text>
      </svg>
      <span class="nav-wordmark">Laxora</span>
    </a>
    <p class="footer-copy">© 2026 Laxora</p>
  </div>
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="#what-we-do">What we do</a>
    <a href="#how-it-works">How it works</a>
    <a href="#who-we-serve">Who we serve</a>
    <a href="#team">Team</a>
    <a href="#waitlist">Join the waitlist</a>
  </nav>
  <div class="footer-contact">
    <!-- TODO: confirm mailbox exists -->
    <a href="mailto:hello@laxora.ai" class="footer-email">hello@laxora.ai</a>
  </div>
</div>
```

- [ ] **Step 2: Add footer styles to styles.css**

```css
/* ============================================================
   FOOTER
   ============================================================ */
.site-footer {
  border-top: 1px solid var(--border);
  padding-block: var(--gap-48);
  background: var(--bg);
}
.footer-inner {
  display: flex;
  align-items: center;
  gap: var(--gap-48);
  flex-wrap: wrap;
}
.footer-brand { display: flex; flex-direction: column; gap: var(--gap-8); }
.footer-logo { margin-right: 0; }
.footer-copy { font-size: 0.8125rem; color: var(--text-muted); max-width: none; }
.footer-links {
  display: flex;
  gap: var(--gap-24);
  flex-wrap: wrap;
  margin-inline: auto;
}
.footer-links a {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 150ms ease;
}
.footer-links a:hover { color: var(--text-body); }
.footer-email {
  font-size: 0.875rem;
  color: var(--accent);
  transition: color 150ms ease;
}
.footer-email:hover { color: var(--accent-hover); }

@media (max-width: 640px) {
  .footer-inner { flex-direction: column; align-items: flex-start; gap: var(--gap-32); }
  .footer-links { margin-inline: 0; flex-direction: column; gap: var(--gap-16); }
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: footer with wordmark, nav links, and contact email"
```

---

## Task 12: main.js — Nav, Animations, Form Submission

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Write full main.js**

```javascript
// ============================================================
// FORM ENDPOINT
// Swap "FORM_ID_TODO" with a real Formspree ID, or replace
// this URL with the future API Gateway endpoint.
// ============================================================
const FORM_ENDPOINT = "https://formspree.io/f/FORM_ID_TODO";

// ============================================================
// NAV: scrolled border + mobile disclosure
// ============================================================
(function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  // Add scrolled class for border
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    if (open) {
      // Move focus to first link
      links.querySelector("a")?.focus();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  // Close when a nav link is clicked (anchor nav)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// ============================================================
// SCROLL ANIMATIONS: fade-up via IntersectionObserver
// ============================================================
(function initAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
})();

// ============================================================
// FORM: validation, honeypot, submission
// ============================================================
(function initForm() {
  const form = document.getElementById("waitlist-form");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("form-status");
  const successEl = document.getElementById("form-success");
  const btnLabel = submitBtn.querySelector(".btn-label");
  const btnSubmitting = submitBtn.querySelector(".btn-submitting");

  // Validators
  const validators = {
    "full_name": (v) => v.trim().length >= 2 ? "" : "Please enter your full name.",
    "office_name": (v) => v.trim().length >= 2 ? "" : "Please enter your office name.",
    "office_type": (v) => v ? "" : "Please select an office type.",
    "work_email": (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid work email.",
  };

  function getField(name) {
    return form.querySelector(`[name="${name}"]`);
  }
  function getError(name) {
    return document.getElementById(`${name.replace(/_/g, "-")}-error`);
  }
  function showError(name, msg) {
    const el = getField(name);
    const err = getError(name);
    if (!el || !err) return;
    el.classList.toggle("invalid", !!msg);
    err.textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  function validateAll() {
    let valid = true;
    for (const [name, fn] of Object.entries(validators)) {
      const el = getField(name);
      if (!el) continue;
      const msg = fn(el.value);
      showError(name, msg);
      if (msg) valid = false;
    }
    return valid;
  }

  // Live validation on blur
  Object.keys(validators).forEach((name) => {
    const el = getField(name);
    if (!el) return;
    el.addEventListener("blur", () => {
      showError(name, validators[name](el.value));
    });
    el.addEventListener("input", () => {
      if (el.classList.contains("invalid")) {
        showError(name, validators[name](el.value));
      }
    });
  });

  function setSubmitting(state) {
    submitBtn.disabled = state;
    btnLabel.hidden = state;
    btnSubmitting.hidden = !state;
    if (state) btnSubmitting.removeAttribute("aria-hidden");
    else btnSubmitting.setAttribute("aria-hidden", "true");
  }

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    statusEl.textContent = "You're on the waitlist. We'll be in touch.";
    statusEl.classList.remove("sr-only");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = form.querySelector("[name='company_website']");
    if (honeypot && honeypot.value.trim()) {
      showSuccess();
      return;
    }

    if (!validateAll()) {
      // Focus first invalid field
      const firstInvalid = form.querySelector(".invalid");
      firstInvalid?.focus();
      statusEl.textContent = "Please fix the errors above before submitting.";
      return;
    }

    setSubmitting(true);

    // Check for placeholder endpoint
    if (FORM_ENDPOINT.includes("FORM_ID_TODO")) {
      console.warn("Laxora: FORM_ENDPOINT is not configured. Submissions are not being captured. " +
        "Set a real Formspree form ID or API Gateway URL in main.js.");
      await new Promise((r) => setTimeout(r, 600)); // fake latency
      showSuccess();
      setSubmitting(false);
      return;
    }

    const data = {
      full_name: getField("full_name").value.trim(),
      office_name: getField("office_name").value.trim(),
      office_type: getField("office_type").value,
      work_email: getField("work_email").value.trim(),
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showSuccess();
      } else {
        throw new Error(`Server responded ${res.status}`);
      }
    } catch (err) {
      statusEl.textContent = "Something went wrong. Please try again or email us at hello@laxora.ai.";
      statusEl.classList.remove("sr-only");
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  });
})();
```

- [ ] **Step 2: Verify form behavior**

1. Submit with empty fields: all 4 inline errors appear, focus goes to first invalid field.
2. Fill valid data, submit: sees FORM_ID_TODO warning in console, shows success state.
3. Fill honeypot field (via devtools), submit: shows success without console warn.
4. Nav hamburger: opens/closes on click, closes on Escape.
5. Scroll page: header border appears after 8px scroll.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: nav scroll behavior, fade-up animations, and form submission"
```

---

## Task 13: Favicon SVG and README

**Files:**
- Create: `assets/favicon.svg`, `README.md` (replace existing)

- [ ] **Step 1: Create favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0F766E"/>
  <text x="16" y="23" font-family="Inter,system-ui,sans-serif"
        font-size="20" font-weight="800" fill="white"
        text-anchor="middle" dominant-baseline="auto">L</text>
</svg>
```

- [ ] **Step 2: Write README.md (replaces the existing minimal README)**

```markdown
# Laxora Website

Marketing site for [laxora.ai](https://laxora.ai) — an AI front desk platform for dental and physician offices.

Static HTML + CSS + vanilla JS. No build step. Deploys from the repo root via GitHub Pages.

## Local preview

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## File map

```
/
├── index.html          — single page, all content
├── styles.css          — design tokens, layout, components
├── main.js             — nav behavior, scroll animations, form POST
├── assets/
│   ├── favicon.svg     — "L" lettermark (SVG)
│   ├── apple-touch-icon.png  — 180×180 home screen icon
│   ├── og-image.png    — 1200×630 Open Graph image
│   └── team/
│       ├── akash.jpg   — swap with real photo (see below)
│       └── pratik.jpg  — swap with real photo
├── CNAME               — laxora.ai
└── .nojekyll           — disables Jekyll on GitHub Pages
```

## Swapping team photos

Replace `assets/team/akash.jpg` and `assets/team/pratik.jpg` with real photos.

Requirements: square crop, minimum 800×800px, JPEG. The page renders them at 80×80px but higher resolution looks sharp on retina displays.

## Changing the form endpoint

Open `main.js` and update the constant at the top of the file:

```js
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

**Option A — Formspree (5-minute setup):**
1. Go to [formspree.io](https://formspree.io), sign in, create a new form.
2. Copy the form ID (looks like `xpwzqkrv`).
3. Replace `FORM_ID_TODO` in `main.js` with your ID.

**Option B — API Gateway:**
Replace the entire URL with the endpoint Pratik is building.

Until the endpoint is configured, the form shows a success message but submissions are not captured (a console warning appears in devtools).

## Editing copy

All page text is in `index.html`. Search for the section you want (`Ctrl+F` for the heading text). `<!-- TODO: -->` comments mark content that still needs to be filled in:

- `<!-- TODO: Akash bio -->` — one-line bio for Akash
- `<!-- TODO: Pratik -->` — last name, role, bio, LinkedIn URL
- `<!-- TODO: confirm mailbox exists -->` — verify hello@laxora.ai is live

## Deploying

Merge to `main`. GitHub Pages serves the repo root automatically once configured:

1. Repo Settings → Pages → Deploy from a branch → `main`, `/ (root)`
2. Custom domain: `laxora.ai`, then enforce HTTPS once the cert issues
3. Route 53 A records (apex): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Route 53 AAAA records: see [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the IPv6 addresses
5. CNAME record: `www` → `laxora-ai.github.io`

**Note:** A privacy policy is needed before pushing the waitlist hard. The current form collects name, office name, office type, and work email.
```

- [ ] **Step 3: Commit**

```bash
git add assets/favicon.svg README.md
git commit -m "feat: favicon svg and full readme"
```

---

## Task 14: Polish Pass and Acceptance Checklist

**Files:**
- Modify: `styles.css`, `index.html` as needed based on inspection

- [ ] **Step 1: Serve locally and do a full visual pass**

```bash
python3 -m http.server 8080
```

Check at 375px, 768px, 1024px, 1440px using browser devtools:

- [ ] One `h1`, logical heading order (h2 for each section, h3 for cards)
- [ ] No horizontal scroll at any breakpoint
- [ ] No layout overlap or card overflow
- [ ] Hero visual sits beside copy at 1024px+, above copy at 900px-
- [ ] Steps connector line renders correctly at all breakpoints
- [ ] Team cards are side-by-side at tablet, stacked on mobile

- [ ] **Step 2: Check keyboard navigation**

Tab through the entire page:
- [ ] Focus moves in logical DOM order
- [ ] Nav links, CTA, and hamburger all reachable
- [ ] Form fields, select, and submit button all reachable
- [ ] Footer links reachable
- [ ] Focus ring visible on every interactive element (teal outline)
- [ ] Hamburger toggle works with Enter/Space and Escape closes the menu

- [ ] **Step 3: Verify form states**

- [ ] Empty submit shows 4 inline errors, focus on first invalid field
- [ ] Blur empty required field shows single error
- [ ] Valid email clears error on input
- [ ] Submit with placeholder endpoint: shows success, console warns about FORM_ID_TODO
- [ ] No other console errors or warnings

- [ ] **Step 4: Check color contrast (manual)**

- [ ] `#475569` on `#FFFFFF`: ~5.9:1 (passes AA)
- [ ] `#475569` on `#FAFAF8`: passes AA
- [ ] `#FFFFFF` on `#0F766E` (button): ~5.1:1 (passes AA)
- [ ] `#94A3B8` used only for decorative/non-essential text (muted labels, timestamps)

- [ ] **Step 5: Verify no banned copy**

Search `index.html` for: seamless, leverage, empower, revolutionize, unlock, delve, robust, cutting-edge, game-changing, streamline, elevate, transformative, HIPAA, SOC 2, "—" (em dash in body), testimonial, star rating.

- [ ] **Step 6: Verify page weight**

```bash
find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs wc -c
du -sh assets/
```

Target: combined HTML + CSS + JS + images < 300 KB.

- [ ] **Step 7: Final polish commit**

```bash
git add -u
git commit -m "polish: final pass against acceptance checklist"
```

---

## Task 15: Push Branch and Open PR

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/marketing-website
```

- [ ] **Step 2: Open PR**

```bash
gh pr create \
  --title "feat: Laxora marketing website v1" \
  --body "$(cat <<'EOF'
## Summary

Static HTML/CSS/JS single-page marketing site for laxora.ai. No build step, no frameworks — deploys directly from the repo root on GitHub Pages.

Design direction: Stripe/Linear discipline adapted for a healthcare buyer. Serious, quiet, precise. Off-white background, deep teal accent used sparingly, Inter variable font with fluid type. Signature element: a pure-CSS booking timeline in the hero showing an AI front desk completing a real scheduling interaction.

## Screenshots

(Akash will attach from local screenshots/)

## Deploy checklist (Pratik)

- [ ] Repo Settings → Pages → Deploy from a branch → main, / (root)
- [ ] Custom domain: laxora.ai, then enforce HTTPS once the cert issues
- [ ] Route 53: A records on the apex → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (plus the matching AAAA records from the GitHub Pages docs)
- [ ] CNAME record: www → laxora-ai.github.io, and decide whether apex or www is canonical

## Open questions

1. Waitlist capture: create a Formspree form (free, 5 minutes) and send me the ID, or give me the API Gateway endpoint when the backend lands. Right now submissions show success but go nowhere.
2. Confirm hello@laxora.ai exists, or pick the contact address.
3. Pratik: last name, role line, one-line bio, and a square photo for the Team section.
4. We need a real privacy policy before pushing the waitlist hard.
5. Headline and copy sign-off.
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** All 6 content sections, nav, footer, form, meta/OG tags, CNAME, .nojekyll, README, team placeholders, favicon, and apple-touch-icon are covered by tasks above.
- **Copy:** All body copy from the spec is included verbatim in the HTML tasks. No em dashes, no banned vocabulary.
- **Fake claims:** No HIPAA/SOC 2 badges. Privacy line uses the approved phrasing "built with patient privacy and data security as first principles."
- **Deviations from spec noted for PR:** The existing .gitignore is a Node.js template (kept, extended); existing README replaced; LICENSE untouched.
- **Weight check:** HTML + CSS + JS should come in well under 100 KB. Generated images (OG 1200x630, two 800x800 team, 180px icon) will be the bulk — estimated ~200 KB total including images. Under 300 KB target.
