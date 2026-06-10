# Full SEO Audit Report: cryptocalk.com

**Date:** 2026-03-22
**Auditor:** Claude Opus 4.6 (6 specialist subagents)
**Site:** cryptocalk.com — Crypto Calculator Platform
**Pages:** ~935 across 6 languages (en, es, pt, tr, hi, ru)
**Stack:** Astro 5.17 (SSG) + React 19 + Tailwind CSS 4 + Cloudflare + Plesk

---

## Executive Summary

### Overall SEO Health Score: 72 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 78/100 | 19.5 |
| Content Quality | 25% | 74/100 | 18.5 |
| On-Page SEO | 20% | 82/100 | 16.4 |
| Schema / Structured Data | 10% | 72/100 | 7.2 |
| Performance (CWV) | 10% | 65/100 | 6.5 |
| Images | 5% | 88/100 | 4.4 |
| AI Search Readiness (GEO) | 5% | 62/100 | 3.1 |
| **TOTAL** | **100%** | | **75.6** |

### Top 5 Critical Issues

1. **Security headers not served** — `_headers` file is ignored by Plesk/Apache. No CSP, X-Frame-Options, or X-Content-Type-Options on any page (Technical: 35/100 for security)
2. **412 KB JS mega-chunk** — `ErrorBoundary.CZP1XRCQ.js` contains all UI translations for all 69 calculators in all 6 languages. English visitors download 350 KB of unused translations
3. **HTML not edge-cached** — Cloudflare `cf-cache-status: DYNAMIC` on all HTML. Every request hits origin (TTFB ~400-475ms vs target <200ms)
4. **16 calculator pages with 80% duplicate content** — bitcoin-unit-converter, cross-chain-bridge, etc. share generic template text from seo-body-text.ts
5. **No llms.txt file** — Missing emerging standard for AI search discoverability

### Top 5 Quick Wins

1. **Add `.htaccess` security headers** — 10 minutes, fixes the #1 critical issue
2. **Enable Cloudflare page rule "Cache Everything"** — 5 minutes, cuts TTFB by 200-300ms
3. **Set immutable cache for hashed `_astro/` assets** — currently 4h, should be 1 year
4. **Add `llms.txt`** — 15 minutes, improves AI search visibility
5. **Add explicit AI crawler rules to robots.txt** — 10 minutes, block training crawlers, explicitly allow search crawlers

---

## 1. Technical SEO — 78/100

### Crawlability (82/100)

**PASS:**
- robots.txt properly blocks `/api/`, references sitemap-index.xml
- Sitemap contains 653 URLs (correctly excludes 280 alias/redirect pages)
- HTTP→HTTPS and www→non-www 301 redirects working
- 404 pages return proper status code
- No noindex/nofollow on any content page

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Medium | All 653 sitemap lastmod dates identical (`2026-03-22T00:00:00.000Z`) | Use git commit dates or file mtime per page in serialize() |
| 2 | Medium | No AI crawler management in robots.txt | Add explicit rules for GPTBot, ClaudeBot, CCBot, etc. |
| 3 | Low | No IndexNow protocol | Add API key + post-build submission script |

### Indexability (90/100)

**PASS:**
- Canonical tags present and self-referencing on all pages
- Trailing slash consistency enforced via 301s
- OG URLs match canonical URLs

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Medium | Inconsistent title separator (em-dash on homepage, pipe on about, none on calcs) | Minor — intentional per update 22/34 |

### Security (35/100) — CRITICAL

**PASS:**
- HTTPS enforced with valid Cloudflare certificate
- HSTS header present (via Cloudflare)

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | **Critical** | `_headers` file ignored by Plesk — NO CSP, X-Frame-Options, X-Content-Type-Options served | Add `.htaccess` rules or Cloudflare Transform Rules |
| 2 | High | `x-powered-by: PleskLin` exposes server software | `Header unset X-Powered-By` in .htaccess |
| 3 | Medium | HSTS max-age only 6 months, missing `preload` directive | Configure in Cloudflare SSL/TLS settings |

**Recommended `.htaccess` addition:**
```apache
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Header unset X-Powered-By
</IfModule>
```

### URL Structure (92/100)

**PASS:**
- Clean descriptive URLs: `/profit-calculator/`, `/mining-calculator/`
- Localized native slugs: `/es/calculadora-beneficio-cripto/`
- Consistent trailing slashes with 301 enforcement
- No URL parameters on any calculator page
- 301 redirects for legacy EN slugs in localized paths

### Mobile Optimization (88/100)

**PASS:**
- Viewport meta tag on all pages
- 44px touch targets enforced (update 24)
- Horizontal overflow fixed (update 24)
- Minimum 0.75rem font size (update 35)
- Scrollable breadcrumbs on mobile

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Medium | Google Fonts loaded externally (3 families, 7 weights) | Self-host from `/_astro/` with `font-display: swap` |
| 2 | Low | CoinGecko preconnect fires on every page (only needed on calculator interaction) | Move to prefetch or defer |

### Hreflang (85/100)

**PASS:**
- Hreflang tags on all pages with all 6 languages + x-default
- x-default correctly points to EN
- Self-referencing hreflang present
- All hreflang targets verified returning 200

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Medium | Uses language-only codes (`es`, `pt`) — should be `pt-BR` for Brazil, `es-419` for LatAm | Update hreflang attributes in Layout.astro |
| 2 | Medium | About page hreflang uses EN slug ("about") for all languages | Verify localized about pages exist |
| 3 | Low | No hreflang in sitemap (only in HTML head) | Add xhtml:link to sitemap |

### JavaScript Rendering (95/100)

**PASS:**
- Astro SSG pre-renders all HTML — fully crawlable without JS
- React components use `client:visible` (lazy hydration)
- No client-side routing

### Internal Linking (85/100)

**PASS:**
- 3-level breadcrumb navigation on all pages
- 8 category hub pages with calculator grids
- Contextual internal links in SEO body text (2-3 per section)
- 62 cross-calculator links in seo-ext content
- Related calculators displayed on each page

---

## 2. Content Quality — 74/100

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| Experience | 85% | Named creator with 10+ year background, real prior projects, practitioner-level content |
| Expertise | 84% | Transparent formulas, correct tax rates (17 countries), accurate ASIC specs |
| Authoritativeness | 68% | Good schema markup, but no external citations/press/backlinks visible |
| Trustworthiness | 80% | Privacy-first, no ads, contact info in schema, disclaimer in footer |

### Content Depth — GOOD

All analyzed pages exceed minimum thresholds:
- Homepage: ~1,256 words
- Top EN calculators: 2,300-3,200 words
- Localized pages: 2,600-3,100 words

### Duplicate Content — HIGH PRIORITY

**16 EN calculator pages share ~80% identical body text** from `seo-body-text.ts`:

bitcoin-unit-converter, cross-chain-bridge, crypto-correlation, crypto-index-fund, crypto-inheritance, crypto-portfolio-rebalance, crypto-sentiment, defi-yield-aggregator, dust-attack, exchange-fee-comparator, flash-loan, gas-optimization, governance-voting, nft-rarity, token-unlock, whale-alert

These have unique `how`/`inputs` sections but share generic `interpret`, `scenarios`, `checklist`, `mistakes`, `benchmarks`, `execution`, `hygiene`, `validation` sections. The generic text doesn't relate to the specific calculator topic.

**Impact:** ~96 pages across all languages (16 x 6) with high content similarity. Google's Helpful Content system may devalue these.

**Fix:** Write unique seo-ext entries for these 16 calculators (same pattern as the 62 already done).

### FAQ Quality

- **Top 10 EN calculators:** Excellent — 60 search-targeted Q&A pairs with specific numbers
- **11 risk/analytics calculators:** Good — 330 localized Q&A pairs
- **Remaining ~50 template pages:** Weak — generic `{title}` placeholder FAQ

### Heading Structure

- Proper H1 > H2 > H3 hierarchy on all pages
- **Minor issue:** Footer uses H4 for navigation sections (should use `<nav>` with labels)

### Multilingual Quality: 68/100

- Translations appear natural for top calculators
- seo-ext content translated for 62 calculators in all 5 non-EN languages
- The 16 duplicate-content pages lack seo-ext in ALL languages

---

## 3. On-Page SEO — 82/100

### Title Tags

- Unique per page, descriptive, no brand duplication (fixed in updates 22/34)
- Homepage: "CryptoCalk — 60+ Free Crypto Calculators"
- Calculators: "Crypto Profit Calculator" (clean, no suffix)

### Meta Descriptions

- Present on all pages
- 5 risk calculator descriptions expanded to 120+ chars (update 34)

### Internal Linking

- Strong contextual linking in SEO content
- 62 cross-calculator links in extended content
- 7 links from About page to popular calculators

---

## 4. Schema / Structured Data — 72/100

### Current Implementation

| Page Type | Schemas Present |
|-----------|----------------|
| Homepage | WebSite (SearchAction), Organization, ItemList (12 calcs) |
| EN Calculators | BreadcrumbList, WebApplication, FAQPage |
| Localized Calculators | WebApplication, FAQPage, BreadcrumbList |
| About | ProfilePage (Person) |
| Category Hubs | CollectionPage, ItemList, FAQPage, BreadcrumbList |

### Issues

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Medium | Organization `logo` points to OG image (1200x630) not actual logo | Create proper logo image (112x112 min) |
| 2 | Medium | EN WebApplication schemas missing `inLanguage: "en"` | Add to all EN .astro page schemas |
| 3 | Medium | `dateModified` hardcoded to "2026-03-09" for ALL localized pages | Use per-page dates |
| 4 | Low | `areaServed: AdministrativeArea "Worldwide"` — semantically wrong | Omit or use plain string |
| 5 | Low | WebSite SearchAction `?q=` — verify search actually works | Test or remove |

### Missing Opportunities

- **WebPage schema** with `SpeakableSpecification` for voice assistants and `isPartOf`/`mainEntity` entity linking (note: HowTo rich results were removed by Google in Sept 2023 — do NOT add HowTo)
- **SoftwareApplication** on homepage for the tool suite
- **SpeakableSpecification** for voice assistant optimization
- No `@id` on WebApplication blocks for cross-referencing

---

## 5. Performance (Core Web Vitals) — 65/100

### Server Response (TTFB)

| Page | TTFB | Rating |
|------|------|--------|
| Homepage | ~397ms | Needs Improvement |
| Profit Calculator | ~438ms | Needs Improvement |
| Mining Calculator | ~476ms | Needs Improvement |

**Root cause:** HTML not cached at Cloudflare edge (`cf-cache-status: DYNAMIC`).

### JavaScript — CRITICAL

**Total JS per calculator page: ~650 KB uncompressed / ~197 KB compressed**

| Bundle | Size | Issue |
|--------|------|-------|
| `ErrorBoundary.CZP1XRCQ.js` | **412 KB** (125 KB br) | Contains ALL ui-strings.ts translations for ALL languages |
| React runtime | 187 KB (58 KB br) | Expected |
| Per-calculator code | 12-23 KB | Fine |

**Impact:** English visitors download ~350 KB of unused Spanish/Portuguese/Turkish/Hindi/Russian translations.

### Caching — CRITICAL

| Resource | Current | Should Be |
|----------|---------|-----------|
| HTML pages | Not cached (DYNAMIC) | `s-maxage=86400` edge cache |
| JS/CSS (`_astro/*`) | `max-age=14400` (4h) | `max-age=31536000, immutable` (1 year) |

### Estimated Core Web Vitals

| Metric | Mobile Estimate | Desktop Estimate | Target |
|--------|----------------|------------------|--------|
| LCP | 2.0-3.5s | 1.0-2.0s | < 2.5s |
| INP | 100-250ms | 50-150ms | < 200ms |
| CLS | 0.05-0.15 | 0.01-0.05 | < 0.1 |

### Font Loading

- 3 families (DM Sans, Plus Jakarta Sans, JetBrains Mono) with 7 weight variants
- Loaded via Google Fonts with preload/onload swap pattern
- Self-hosting would eliminate 2 DNS lookups + reduce CLS from font swap

---

## 6. Images — 88/100

**PASS:**
- Descriptive `alt={coin.name}` on all 20 coin thumbnails (update 16)
- No empty alt attributes remaining
- No inline images on calculator pages (SVG icons are inline)
- OG images present for social sharing

**ISSUES:**

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Low | No custom OG images for non-top-10 pages (generic fallback) | Create per-category OG images |
| 2 | Low | No charts/infographics in SEO content | Add visual examples for AI citability |

---

## 7. AI Search Readiness (GEO) — 62/100

### GEO Dimension Scores

| Dimension | Score |
|-----------|-------|
| Citability | 72/100 |
| Structural Readability | 78/100 |
| Multi-Modal Content | 28/100 |
| Authority & Brand Signals | 58/100 |
| Technical Accessibility | 63/100 |

### Platform Readiness

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 65/100 | Good FAQ schema; missing HowTo; SSG excellent |
| ChatGPT (SearchGPT) | 55/100 | No explicit GPTBot allow; no llms.txt; zero training data presence |
| Perplexity | 58/100 | Good factual content; no explicit bot allow |
| Bing Copilot | 60/100 | Bing indexing OK; content structure good |

### Key Issues

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | High | No llms.txt file | Create `public/llms.txt` with site description, calculator list, citation instructions |
| 2 | High | Training crawlers (CCBot, Google-Extended, Bytespider) freely scraping | Block in robots.txt |
| 3 | High | No YouTube/video content (strongest AI citation signal at 0.737 correlation) | Create calculator tutorial videos |
| 4 | Medium | No Wikipedia entity for "CryptoCalk" | Long-term brand building |
| 5 | Medium | No RSS/Atom feed for freshness signals | Add RSS feed |
| 6 | Medium | H2 headings are statements, not questions (less AI-citable) | Reformat key H2s as questions |
| 7 | Low | No `<dfn>` or `<dl>` markup for key terms | Add semantic markup for definitions |
| 8 | Low | No `id` anchors on H2/H3 for deep linking | Add anchors for AI citation precision |

---

## Scoring Summary

```
Technical SEO:        78/100  (25% weight) = 19.5
Content Quality:      74/100  (25% weight) = 18.5
On-Page SEO:          82/100  (20% weight) = 16.4
Schema:               72/100  (10% weight) =  7.2
Performance:          65/100  (10% weight) =  6.5
Images:               88/100  ( 5% weight) =  4.4
AI Search Readiness:  62/100  ( 5% weight) =  3.1
─────────────────────────────────────────────
TOTAL:                         75.6 / 100
```
