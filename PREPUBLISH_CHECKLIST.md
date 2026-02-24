# Prepublish Checklist — CryptoCalk

Use this checklist before every production release.

## Last Verified
- Release check date: `2026-02-21`
- Status: `PASS`

## 1. Build & Routing
- [x] `npm run build` completes without errors.
- [x] Critical pages open in preview:
  - `/`
  - `/profit-calculator`
  - `/converter`
  - `/[lang]/` for each supported language (`es`, `pt`, `tr`, `hi`, `ru`).
- [x] `404.html` is present in `dist`.

## 2. SEO Baseline
- [x] Homepages include JSON-LD (`WebSite`, `Organization`, `SearchAction`).
- [x] Trust pages include JSON-LD (`WebPage`).
- [x] `robots.txt` exists and points to `sitemap-index.xml`.
- [x] `dist/_redirects` exists and includes 301 mappings for legacy localized calculator slugs.
- [x] Canonical and hreflang tags render correctly.
- [x] `npm run verify:slug-migration` passes (localized slug migration guard: sitemap + redirects).

## 3. Internationalization
- [x] EN and localized homepages render translated UI labels.
- [x] Localized trust routes work:
  - `/{lang}/privacy`
  - `/{lang}/editorial-policy`
  - `/{lang}/methodology`
- [x] Language switcher routes correctly from calculator pages.
- [x] `npm run verify:localized-styles` passes (localized calculator styling regression guard).

## 4. Data & UX
- [x] CoinGecko requests work in calculators that use live prices.
- [x] Homepage search:
  - filters cards on input
  - loads from `?q=` on page load
  - keeps URL query in sync while typing

## 5. Performance & Hydration
- [x] `ThemeToggle` and `LanguageSwitcher` hydrate with `client:idle` (not `client:load`).
- [x] Static icons are not hydrated unnecessarily.
- [x] No new unexpected heavy client bundles were introduced.

## 6. Governance
- [x] `CHANGELOG.md` updated for all code changes in this release.
- [x] Changes comply with `AGENTS.md` constraints.
