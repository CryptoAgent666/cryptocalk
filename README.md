# CryptoCalk

CryptoCalk ([cryptocalk.com](https://cryptocalk.com)) is a multilingual Astro + React calculator hub for crypto finance: profit, ROI, DCA, tax, mining, risk management, DeFi yield, and converters. ~128 calculators × 6 languages (`en` default, `es`, `pt`, `tr`, `hi`, `ru`). Also ships as an Android app (Capacitor) with self-hosted OTA web-bundle updates.

**License:** proprietary — published for transparency only, see [LICENSE](LICENSE).

## Stack
- Astro 5 (fully static output) + React 19 islands
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- CoinGecko API v3 (client-side, `PUBLIC_COINGECKO_API_KEY`) with CryptoCompare fallback
- Vitest (jsdom) — run by CI on every push
- Capacitor 8 + `@capgo/capacitor-updater` (self-hosted OTA, see `ota-backend-vps/`)

## Quick Start
```bash
npm install
npm run dev          # dev server on :4321
npm run build        # static build -> dist/ (~1300 pages)
npm run ci:check     # test + build + slug-migration & localized-styles verify
```

`dist/` is NOT committed — every deploy builds it locally.

## Key Architecture
- `src/pages/` — EN routes (no prefix); `src/pages/[lang]/` — localized routes.
  - New calculators get **localized slugs only**, served by `src/pages/[lang]/[...slug].astro`.
  - The `[lang]/<en-slug>.astro` files are a **frozen legacy** of the slug migration — never add new ones (enforced by `src/test/registry-invariants.test.ts`).
- `src/i18n/utils.ts` — slug registry (`SPEC_CALCULATOR_SLUGS`) + localized slug maps + path helpers. `astro.config.mjs` mirrors the slug list for sitemap filtering; the invariant tests keep the mirrors in sync (CI fails on drift).
- `src/components/` — React calculator islands (`*.tsx`, all wrapped in `withErrorBoundary`) + shared Astro shells (`LocalizedCalculatorPage.astro`).
- `src/layouts/Layout.astro` — SEO meta, canonical, hreflang, noindex (incl. prune set), OG.
- `src/utils/coingecko-fetch-client.ts` — 5-min TTL cache (memory + sessionStorage), in-flight dedup, 429/5xx retry with backoff, timeout + stale fallback. **All price fetches should go through `cryptoPriceService.ts`.**
- `src/data/prune-noindex.json` — generated SEO prune set (see DEPLOY.md → "Prune workflow").

## SEO & Trust Assets
- Structured data: `WebSite` + `Organization` + `SearchAction` on homepages, `WebPage` on trust pages, per-calculator schema with honest git-derived `dateModified`.
- Trust pages: `/privacy`, `/editorial-policy`, `/methodology` (+ localized variants).
- Technical: `public/robots.txt`, `public/llms.txt`, auto-generated sitemap with prune/alias filtering, `src/pages/404.astro`.

## Deployment
See [DEPLOY.md](DEPLOY.md). Short version: `bash scripts/deploy.sh` (builds first; `--no-build` to skip) uploads `dist/` over FTPS (credentials in gitignored `.ftp-credentials`) with hashed assets first, then purges Cloudflare cache and verifies chunks through the CDN. The Cloudflare Worker (`worker.js`, `wrangler.toml`) serves only `/api/contact` + contact routes. Android OTA: `npm run ota:publish`.

## Operational Rules
- Follow [AGENTS.md](AGENTS.md) (mandatory for AI agents).
- Every code change is logged in [CHANGELOG.md](CHANGELOG.md).
- Before release, run the checklist in [PREPUBLISH_CHECKLIST.md](PREPUBLISH_CHECKLIST.md).
- CI (`.github/workflows/ci.yml`) runs `ci:check` + a production-dependency audit on every push to `main`.
