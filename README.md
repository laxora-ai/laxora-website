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
├── index.html                  single page, all content
├── styles.css                  design tokens, layout, components
├── main.js                     nav behavior, scroll animations, form POST
├── assets/
│   ├── favicon.svg             "L" lettermark (SVG, teal on white)
│   ├── apple-touch-icon.png    180×180 home screen icon
│   ├── og-image.png            1200×630 Open Graph / Twitter card image
│   └── team/
│       ├── akash.jpg           swap with real photo (see below)
│       └── pratik.jpg          swap with real photo
├── scripts/
│   └── generate-assets.py     regenerates placeholder images (requires Pillow)
├── CNAME                       laxora.ai
└── .nojekyll                   disables Jekyll on GitHub Pages
```

## Swapping team photos

Replace `assets/team/akash.jpg` and `assets/team/pratik.jpg` with real photos.

Requirements: **square crop, minimum 800×800 px, JPEG**. The page renders them at 80×80 CSS px but higher resolution looks sharp on retina displays.

## Changing the form endpoint

Open `main.js` and update the constant at the top:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

**Option A — Formspree (free, ~5 minutes):**
1. Go to [formspree.io](https://formspree.io), sign in, create a new form.
2. Copy the form ID (looks like `xpwzqkrv`).
3. Replace `FORM_ID_TODO` in the constant above.

**Option B — API Gateway (Pratik's backend):**
Replace the entire URL string with the endpoint URL once it is available.

Until the endpoint is configured, the form shows a success state but submissions are not captured. A `[Laxora] FORM_ENDPOINT is not configured` warning appears in the browser console.

## Filling in TODO comments

Search `index.html` for `<!-- TODO:` to find content still needing attention:

| Comment | What to add |
|---------|-------------|
| `<!-- TODO: Akash bio -->` | One-line bio for Akash |
| `<!-- TODO: Pratik -->` | Last name, role, bio, LinkedIn URL |
| `<!-- TODO: Pratik role -->` | Role line (e.g., "Co-founder, Infrastructure") |
| `<!-- TODO: confirm mailbox exists -->` | Verify hello@laxora.ai is live before launch |

## Editing copy

All page text is in `index.html`. Search for the heading of the section you want to edit.

## Deploying

**One-time GitHub Pages setup (Pratik):**

1. Repo Settings → Pages → Deploy from a branch → `main`, `/ (root)`
2. Custom domain: `laxora.ai`, then enforce HTTPS once the cert issues (usually a few minutes)
3. Route 53 — A records on the apex:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. Route 53 — AAAA records: see [GitHub Pages IP addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain) for the IPv6 addresses
5. Route 53 — CNAME record: `www` → `laxora-ai.github.io`
6. Decide whether the apex (`laxora.ai`) or `www` is canonical and set up a redirect for the other

After that: **merge to `main` = live**. No build or deploy step needed.

> **Note:** A privacy policy is needed before pushing the waitlist hard. The form collects name, office name, office type, and work email.
