# SEO Action Plan: cryptocalk.com

**Generated:** 2026-03-22 | **Current Score: 75.6/100**

---

## Critical — Fix Immediately

### 1. Add security headers via .htaccess
**Impact:** Security score 35→80 | **Effort:** 10 min
**Category:** Technical SEO

The `dist/_headers` file is ignored by Plesk/Apache. Add to `public/.htaccess`:
```apache
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Header unset X-Powered-By
</IfModule>
```

### 2. Enable Cloudflare edge caching for HTML
**Impact:** TTFB 400ms→100ms, LCP improvement | **Effort:** 10 min
**Category:** Performance

Option A: Cloudflare Dashboard → Rules → Page Rules → `cryptocalk.com/*` → Cache Level: Cache Everything, Edge TTL: 1 day

Option B: Add to `.htaccess`:
```apache
<FilesMatch "\.(html)$">
  Header set Cache-Control "public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600"
</FilesMatch>
```

### 3. Set immutable cache for hashed Astro assets
**Impact:** Returning visitor load time improvement | **Effort:** 5 min
**Category:** Performance

Add to `.htaccess`:
```apache
<FilesMatch "\.([a-f0-9]{8})\.(js|css)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```
Currently `max-age=14400` (4h) for content-hashed files that should be cached 1 year.

---

## High — Fix Within 1 Week

### 4. Split the ErrorBoundary mega-chunk (412 KB → ~60 KB for EN)
**Impact:** -100-200ms INP, -150ms LCP on mobile | **Effort:** 2-4 hours
**Category:** Performance

The `ErrorBoundary.CZP1XRCQ.js` chunk contains ALL `ui-strings.ts` translations. Options:
- **Best:** Split ui-strings.ts into per-language files, dynamic import only needed language
- **Medium:** Use Vite `manualChunks` to isolate translations into a separate chunk
- **Quick:** Move translations to JSON, fetch() only for non-EN pages

### 5. Write unique seo-ext content for 16 remaining calculators
**Impact:** Eliminates 96 duplicate-content pages | **Effort:** 4-8 hours
**Category:** Content Quality

These 16 pages share 80% identical generic text:
bitcoin-unit-converter, cross-chain-bridge, crypto-correlation, crypto-index-fund, crypto-inheritance, crypto-portfolio-rebalance, crypto-sentiment, defi-yield-aggregator, dust-attack, exchange-fee-comparator, flash-loan, gas-optimization, governance-voting, nft-rarity, token-unlock, whale-alert

Write 8 unique sections per calculator (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation) following the pattern in calculator-seo-ext.ts.

### 6. Create llms.txt file
**Impact:** AI search visibility improvement | **Effort:** 15 min
**Category:** GEO

Create `public/llms.txt` with:
- Site name and purpose
- List of all calculator categories with URLs
- Preferred citation format
- Data freshness indicators
- Contact for corrections

### 7. Add explicit AI crawler rules to robots.txt
**Impact:** Protect content from training, ensure search crawler access | **Effort:** 10 min
**Category:** GEO / Technical

```
# Search-oriented AI crawlers (ALLOW)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Training-only crawlers (BLOCK)
User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /
```

### 8. Fix Organization logo in schema
**Impact:** Valid schema for Google Knowledge Panel | **Effort:** 15 min
**Category:** Schema

Current `logo` points to OG image (1200x630). Create a proper logo image (min 112x112px) and update homepage schema.

### 9. Fix dateModified on localized pages
**Impact:** Accurate freshness signals | **Effort:** 1 hour
**Category:** Schema / Content

`LocalizedCalculatorPage.astro` line 257 hardcodes `dateModified: "2026-03-09"` for ALL pages. Should use per-page dates from git history or a build-time data file.

---

## Medium — Fix Within 1 Month

### 10. Fix sitemap lastmod dates
**Impact:** Better crawl prioritization | **Effort:** 1-2 hours
**Category:** Sitemap

Replace `new Date()` in `astro.config.mjs` serialize() with per-page git commit dates. The identical-date pattern causes Google to ignore lastmod entirely.

### 11. Self-host Google Fonts
**Impact:** -100-200ms mobile render, reduced CLS | **Effort:** 1 hour
**Category:** Performance

Download DM Sans, Plus Jakarta Sans, JetBrains Mono woff2 files. Host from `public/fonts/`. Add `@font-face` with `font-display: swap` and `size-adjust` for fallback matching.

### 12. Add WebPage schema with SpeakableSpecification
**Impact:** Better entity linking + voice assistant optimization | **Effort:** 2 hours
**Category:** Schema / GEO

Add `WebPage` JSON-LD with `isPartOf: WebSite`, `mainEntity` linking to the WebApplication, and `SpeakableSpecification` pointing to `.seo-content h2` and `.faq-section`. Note: do NOT add HowTo schema — Google removed HowTo rich results in September 2023.

### 13. Add `inLanguage: "en"` to EN WebApplication schemas
**Impact:** Consistent language signals | **Effort:** 30 min
**Category:** Schema

EN .astro pages define WebApplication inline without `inLanguage`. The localized template adds it correctly. Add `"inLanguage": "en"` to all 20 custom EN page schemas.

### 14. Update hreflang to language-region codes
**Impact:** Better regional SERP targeting | **Effort:** 30 min
**Category:** Technical SEO

Change `pt` → `pt-BR`, consider `es` → `es-419` (Latin America) based on target audience.

### 15. Add RSS/Atom feed
**Impact:** Content freshness signals for AI systems | **Effort:** 1 hour
**Category:** GEO

Create an RSS feed listing calculator pages with proper dates, descriptions, and categories.

### 16. Reformat key H2 headings as questions
**Impact:** Better AI citation extraction | **Effort:** 2 hours
**Category:** GEO / Content

Change "How Trading Fees Impact Your Profit" → "How Do Trading Fees Impact My Crypto Profit?" for top calculator pages. Question-format headings are more citable by AI systems.

### 17. Fix internal links in localized seo-body-text.ts
**Impact:** Localized users currently get sent to English pages | **Effort:** 1-2 hours
**Category:** Content Quality / i18n

Internal links in generic SEO body text hardcode English paths (`/profit-calculator/`). On Spanish/Portuguese/Turkish/Hindi/Russian pages, these should point to the localized version. Use `getLocalizedPath()` at render time.

### 18. Fix ASIC miner table date "2024-2025" → "2025-2026"
**Impact:** Stale data signal hurts expertise | **Effort:** 5 min
**Category:** Content Quality

File: `src/pages/mining-calculator.astro`, line 96.

### 19. Write unique FAQ for remaining ~50 template pages
**Impact:** Replace generic `{title}` placeholder FAQ | **Effort:** 4-6 hours
**Category:** Content Quality

The generic fallback FAQ produces awkward questions. Write calculator-specific FAQ for pages not yet covered by custom FAQ.

---

## Low — Backlog

### 18. Add IndexNow protocol
**Effort:** 1 hour | Instant indexing for Bing, Yandex, Naver

### 19. Add `id` anchors to H2/H3 headings
**Effort:** 1 hour | Enables deep linking for AI citations

### 20. Add `<dfn>` markup for key terms
**Effort:** 2 hours | Semantic markup for definitions (hashrate, DCA, ROI)

### 21. Add `<table>` caption elements
**Effort:** 1 hour | AI systems benefit from labeled tables

### 22. Add hreflang to sitemap (xhtml:link)
**Effort:** 1-2 hours | Secondary hreflang signal for Google

### 23. Create per-category OG images
**Effort:** 2 hours | Better social sharing CTR for non-top-10 pages

### 24. Add SoftwareApplication schema to homepage
**Effort:** 15 min | Strengthens entity signals for the tool suite

### 25. Fix HSTS to max-age 1 year + preload
**Effort:** 10 min | Configure in Cloudflare SSL/TLS settings

### 26. Consider video content (YouTube)
**Effort:** Ongoing | Strongest AI citation correlation signal (0.737)

---

## Expected Score After Fixes

| Category | Current | After Critical | After High | After All |
|----------|---------|---------------|------------|-----------|
| Technical SEO | 78 | 82 | 87 | 90 |
| Content Quality | 74 | 74 | 82 | 88 |
| On-Page SEO | 82 | 82 | 84 | 88 |
| Schema | 72 | 72 | 80 | 88 |
| Performance | 65 | 78 | 85 | 90 |
| Images | 88 | 88 | 88 | 92 |
| GEO | 62 | 62 | 75 | 82 |
| **Weighted Total** | **75.6** | **79.3** | **84.5** | **89.2** |
