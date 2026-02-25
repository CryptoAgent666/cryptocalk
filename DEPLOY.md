# CryptoCalk — Deployment Guide

## Prerequisites

- Node.js 18+
- npm

## Build

```bash
npm run build
```

This generates a static site in `dist/` — current build output is **688 pages** across 6 languages (as of 2026-02-21).

---

## Cloudflare Pages

### Option A: Git Integration (Recommended)

1. Push the repo to GitHub/GitLab
2. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
3. **Create a project** → Connect your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` (Environment variable `NODE_VERSION=18`)
5. Deploy

### Option B: Direct Upload (CLI)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name cryptocalk
```

---

## Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect via [vercel.com](https://vercel.com) → Import Git repo. Astro is auto-detected.

---

## Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect via [netlify.com](https://app.netlify.com) → Import Git repo.
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

## Custom Domain

After deploying, add your domain (`cryptocalk.com`) in the platform's dashboard.
Update `site` in `astro.config.mjs` if the domain changes:

```js
site: 'https://your-domain.com',
```

---

## Environment Notes

- The site is **fully static** (no SSR), compatible with any static hosting
- Sitemap is auto-generated at `/sitemap-index.xml`
- Legacy localized calculator URLs are redirected via `dist/_redirects` (generated from `public/_redirects`)
- All 6 languages generate prefixed routes (`/es/`, `/pt/`, `/tr/`, `/hi/`, `/ru/`)
- English is at the root (`/`)

---

## Contact Form (Cloudflare Pages Function + Resend)

The contact pages (`/contact`, `/ru/contact`, etc.) now submit to `POST /api/contact` implemented in:

- `functions/api/contact.js`

### Required Secrets

Set these in **Cloudflare Pages → Project → Settings → Variables and Secrets**:

- `RESEND_API_KEY` (required)
- `CONTACT_FROM_EMAIL` (required in production, e.g. `CryptoCalk Contact <no-reply@cryptocalk.com>`)
- `CONTACT_TO_EMAIL` (optional, defaults to `support@cryptocalk.com`)
- `TURNSTILE_SECRET` (optional; only if Turnstile widget is enabled)

### Notes

- Do not commit API keys to the repository.
- For Resend, verify your sending domain before using a custom `CONTACT_FROM_EMAIL`.
- Built-in anti-spam includes a honeypot field and basic per-IP rate limiting.
- For local function testing, copy `.dev.vars.example` to `.dev.vars` and run:
  - `npm run build`
  - `wrangler pages dev dist`
