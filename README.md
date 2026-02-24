# CryptoCalk

CryptoCalk is a multilingual Astro + React calculator hub for crypto finance use cases: profit, ROI, DCA, tax, mining, risk management, DeFi yield, and converters.

## Stack
- `Astro 5`
- `React 19` (islands)
- `Tailwind CSS 4` (via `@tailwindcss/vite`)
- `CoinGecko API v3` (client-side data)
- `@astrojs/sitemap`

## Quick Start
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

CI-style local check:
```bash
npm run ci:check
```

## Key Architecture
- `src/pages/`:
  - EN routes (default locale, no prefix)
  - `src/pages/[lang]/` localized routes (`es`, `pt`, `tr`, `hi`, `ru`)
- `src/components/`:
  - React calculator islands (`*.tsx`)
  - shared Astro shells (for example `LocalizedCalculatorPage.astro`)
- `src/layouts/Layout.astro`:
  - SEO meta, hreflang, OG
  - optional `noindex`
  - global CoinGecko fetch interceptor init
- `src/utils/coingecko-fetch-client.ts`:
  - 5-min TTL cache (`memory` + `sessionStorage`)
  - in-flight deduplication
  - retry/backoff for `429/5xx`
  - timeout + stale fallback

## SEO & Trust Assets
- Structured data on homepages:
  - `WebSite`
  - `Organization`
  - `SearchAction`
- Structured data on trust pages:
  - `WebPage`
- Technical SEO files:
  - `public/robots.txt`
  - `src/pages/404.astro`
- Trust pages:
  - `/privacy`
  - `/editorial-policy`
  - `/methodology`
  - localized variants under `/{lang}/...`

## Operational Rules
- Always follow `/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/AGENTS.md`.
- Every code change must be logged in `/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/CHANGELOG.md`.
- Before release, run the checklist in `/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/PREPUBLISH_CHECKLIST.md`.
