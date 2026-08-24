# cryptocalk.com — Full SEO Audit (2026-08-23)

Crawl: **294/294 sitemap URLs fetched, all HTTP 200** (crawler with browser UA, 5 concurrent).
Live data: GSC `sc-domain:cryptocalk.com` (2026-07-26 → 2026-08-23), GA4 property 526077128,
Lighthouse mobile + a Chrome performance trace on the homepage.

> **Post-audit note (2026-08-24):** nine of the eleven items in `ACTION-PLAN.md` have since been
> implemented and verified in the build — sitemap `<lastmod>` on 294/294 URLs, the bogus
> `Last-Modified` stripped at the edge, schema gaps closed, titles/descriptions within limits,
> per-coin targeting on `/profit-calculator/`, the three trust pages deepened, deploy-time cache
> warming, and **Lighthouse mobile accessibility 92 → 100**. Nothing is deployed yet. The scores
> below describe the site *as audited*, before those fixes.

---

## Executive Summary

### SEO Health Score: **83 / 100**

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 88 | Clean crawl, valid sitemap, 5/6 security headers; no `lastmod`, bogus `Last-Modified` |
| Content Quality | 25% | 68 | EN deep (1,888 w median), locales thin (tr 550 w); scaled-content + 100% AdSense profile |
| On-Page SEO | 20% | 80 | All titles/descs/H1s present & near-unique; homepage/`/profit-calculator/` targeting clash |
| Schema | 10% | 92 | WebApplication + FAQPage + HowTo + BreadcrumbList + Person on ~all pages |
| Performance | 10% | 90 | Lab LCP 75 ms, CLS 0.01; cold-cache TTFB p90 1.77 s; no CrUX field data |
| Images | 5% | 100 | 5 images sitewide, 0 missing alt (SVG-driven UI) |
| AI Search Readiness | 5% | 92 | llms.txt clean, AI crawlers allowed, quick-answers on 221 pages |

> **Read the score correctly.** 83/100 measures *on-site quality*, and on-site the work of June–July
> is holding: nothing is broken, nothing is blocked, schema and internal linking are strong. The
> site's problem is not on this page — it is that Google shows it at **average position 72 with
> ~0 clicks**. This is a demand-side / algorithmic-trust problem, not a technical one.

**Business type detected:** YMYL (crypto-financial) programmatic calculator/tool site, 128 EN
calculators + 5 machine-translated locales, monetised by AdSense on 100% of pages, no e-commerce,
no lead capture.

### Top 5 critical issues

1. **Search performance is still ≈ zero.** 2,200 impressions / **6 clicks** in 28 days, CTR 0.27%,
   avg position 71–74. No recovery from the May 2026 core-update demotion.
2. **The August "recovery" is an illusion.** Impressions doubled (Aug 10–22 vs Jul 27–Aug 9) but
   **+566 of the +570 came from the homepage alone** (511 → 1,077, position 75.5, **0 clicks**).
   More impressions at page 8 is not recovery.
3. **Query→page mismatch on the money cluster.** 13 `<coin> profit calculator` queries
   (180 impressions, positions 70–94) all resolve to the **homepage**, while a dedicated
   `/profit-calculator/` page exists and is not the one being ranked.
4. **Scaled-content / MFA profile persists** — 294 indexable pages, AdSense on **294/294**, and
   locales at a third of EN's depth (tr median 550 w, pt 781 w, es 969 w vs en 1,888 w). This is
   precisely the profile the **Aug 18 2026 spam update** targeted. *(Good news: the site was not
   hit — impressions rose straight through Aug 18. The profile remains the standing risk.)*
5. **Zero brand demand** (unchanged since June): no branded queries, no CrUX field data, real
   traffic ≈ 20 GA4 sessions/day arriving mostly from Bing/DDG/Yandex/AI assistants, not Google.

### Top 5 quick wins

1. **4 localized `/updates/` pages ship no JSON-LD at all** (`/es/`, `/pt/`, `/ru/`, `/tr/`), and
   **62 pages emit no `dateModified`** — all 40 category hubs, the localized homepages, and the
   info/legal set.
2. **Sitemap has no `<lastmod>` at all** — yet honest per-slug dates already exist in
   `src/data/calculator-updated.ts`. Emitting them restores a crawl-scheduling signal that was
   thrown away with the fake-freshness fix.
3. **`Last-Modified: Tue, 19 Jan 2038 03:14:07 GMT`** on every page (the 32-bit epoch ceiling) —
   a nonsense value that caches and crawlers can only mistrust.
4. **21 titles exceed 60 characters** purely because of the `— CryptoCalk` suffix; SERP truncates
   the brand, so drop the suffix on those pages.
5. Three Lighthouse a11y failures on the homepage (contrast on `.popular-tag`, colour-only links
   in `.about-prose`, accessible-name mismatch on the Play-store badge).

---

## Technical SEO — 88

**Clean:**
- 294/294 sitemap URLs return 200, **0 redirects, 0 errors, 0 noindex, 294/294 self-canonical**.
- `robots.txt` correct and deliberate: AI *search* crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Applebot-Extended) allowed; training-only crawlers (CCBot, Google-Extended,
  Bytespider, anthropic-ai, cohere-ai) blocked; `/api/` disallowed; sitemap declared.
- GSC: both sitemaps **Valid**, 294 URLs, 0 errors / 0 warnings, last downloaded 2026-08-16.
- hreflang on 100% of pages (3.9 alternates/page avg), OG + Twitter cards on 100%.
- Security headers live: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy (**5/6** — CSP still deliberately absent, see below).
- Cloudflare edge cache is working: repeat fetches return `cf-cache-status: HIT` with a real `age`.

**Issues:**

| Sev | Issue | Evidence |
|---|---|---|
| High | Sitemap ships **no `<lastmod>`** (only `changefreq`+`priority`, which Google ignores) | `sitemap-0.xml`: `lastmod present: False` |
| High | `Last-Modified: Tue, 19 Jan 2038 03:14:07 GMT` on every HTML response | `curl -I https://cryptocalk.com/` |
| Med | Cold-cache TTFB: median 0.75 s, **p90 1.77 s** across the 294-page crawl (291 were `MISS`) | low-traffic URLs get evicted; warm hits are ~0.1 s |
| Med | No CSP | known, deliberate: the one in `public/_headers` is stale and would break AdSense |
| Low | `_redirects` / `_headers` remain inert on this host (nginx + Cloudflare, not CF Pages) | pre-existing, documented |
| Low | 4 pages carry no JSON-LD at all | of 294 |

---

## Content Quality — 68

| Locale | Pages | Median words |
|---|---|---|
| en | 141 | **1,888** |
| ru | 80 | 1,148 |
| es | 28 | 969 |
| pt | 24 | 781 |
| tr | 21 | **550** |

- **EN is genuinely deep** — median 1,888 words, quick-answer blocks on every EN calculator page
  (only the 9 structural pages lack one, correctly), authoritative-source blocks, honest per-slug
  `dateModified`. The June anti-spam finding still holds: *do not rewrite EN prose.*
- **17 pages under 300 words**, all structural (contact/privacy/editorial-policy/methodology per
  locale) — acceptable in kind, but see the next point.
- **The E-E-A-T hub pages are the thinnest EN pages on the site**: `/about/` 432 w,
  `/methodology/` 411 w, `/editorial-policy/` 383 w. For a YMYL site recovering from a core-update
  demotion, these are the *worst* pages to leave thin.
- **62 pages emit no `dateModified`** (40 category hubs, 4 localized homepages, 14 info/legal,
  4 localized `/updates/`), and the 4 localized `/updates/` pages carry no JSON-LD at all.
- **AdSense on 294/294 pages.** Combined with 5 machine-translated locales at a third of EN depth,
  this is the classic "made-for-advertising + scaled content" fingerprint. The Aug 18 2026 spam
  update did not hit the site, but nothing about the profile has changed since June.

---

## On-Page SEO — 80

- Titles: 0 missing, **2 duplicate pairs** (`/es/calculadora-tp-sl/` ↔ `/pt/calculadora-tp-sl/`,
  `/es/editorial-policy/` ↔ `/pt/editorial-policy/` — cross-locale, hreflang mitigates).
  **21 over 60 chars**, 24 under 30.
- Meta descriptions: 0 missing, **0 duplicates**, 27 over 160 chars, 5 under 70.
- Headings: **exactly one H1 on all 294 pages**, H2s everywhere. Clean.
- Internal linking: median **38 internal links/page**; homepage carries 126.
- **The targeting problem:** the homepage (`title: CryptoCalk — 128 Free Crypto Calculators`,
  940 words) collects **1,625 of the site's 2,200 impressions (74%)** at position 76, including
  the whole `<coin> profit calculator` cluster — queries that `/profit-calculator/` should own.

---

## Schema & Structured Data — 92

Present across the corpus: `WebSite` (260), `FAQPage` + `Question` + `Answer` (258),
`BreadcrumbList` + `ListItem` (256/261), `WebPage` (243), `Person` (219), `WebApplication` + `Offer`
(214), `HowTo` + `HowToStep` (213). Homepage adds `Organization`, `SearchAction`, `ItemList`,
`ContactPoint`, `ImageObject`.

Gaps: 4 pages with no JSON-LD; 62 pages with no `dateModified`. No validation errors observed in
the emitted types.

---

## Performance — 90

- Chrome trace, homepage (desktop, warm cache): **LCP 75 ms** (TTFB 3 ms + 73 ms render delay),
  **CLS 0.01**. Lighthouse mobile: **SEO 100**, Accessibility 92, Best Practices 77,
  Agentic Browsing 100.
- Best Practices 77 is **entirely AdSense third-party cookies** (`__mggpc__`, `IDE`, `ar_debug`
  from doubleclick) — not fixable without dropping ads.
- **No CrUX field data** — the site does not have enough real traffic to generate it.
- HTML weight: median 63 KB, max 90 KB (homepage). Reasonable.
- Cold-cache origin fetches are the only slow path (p90 1.77 s).

---

## Images — 100

Five `<img>` elements sitewide, **all with alt text**; the UI is SVG/CSS-driven. Nothing to fix.

---

## AI Search Readiness — 92

**Strong:** `llms.txt` (10 KB, structured by category, with an explicit "how AI assistants should
cite CryptoCalk" section); AI search crawlers explicitly allowed while training-only crawlers are
blocked; quick-answer blocks on 221/294 pages; FAQPage schema on 258 pages; GA4 shows the
**AI Assistant channel growing 1 → 7 sessions week-over-week**.

**Fix:** `/methodology/` and `/updates/` are absent from the citation section — they are the two
pages that most justify citing this site (primary-source verification, dated change log), and the
AI Assistant channel is the only one currently growing.

*(Correction, 2026-08-23: an earlier draft of this report claimed all 58 `llms.txt` links lacked
trailing slashes and 301'd. That was an artefact of the audit script stripping the slashes before
testing — verified: all 58 links already carry the trailing slash and resolve 200. The "malformed
backtick link" was likewise just a markdown code span in prose.)*

---

## Search performance — the actual bottleneck

**GSC, 2026-07-26 → 2026-08-23:** 2,200 impressions · **6 clicks** · CTR 0.27% · avg position ~72.

| Period | Impressions | Clicks | Position |
|---|---|---|---|
| Jul 27 – Aug 9 | 743 | 4 | 78.7 (homepage) |
| Aug 10 – Aug 22 | 1,457 | 2 | 75.5 (homepage) |

The homepage went 511 → 1,077 impressions (**+111%**) and produced **0 clicks**. Every other page
moved by single digits. The one page that actually converts is
**`/tr/likidasyon-hesaplayici/` — 5 clicks, CTR 83%, position 17** on Turkish liquidation queries:
proof that when this site ranks in the top 20, users do click it.

**GA4:** ~20 sessions/day, stable-to-rising; last 7d vs prior 7d — Organic Search 81 → 85,
Direct 58 → 77, AI Assistant 1 → 7, Cross-network 0 → 6. Real users exist; Google is not sending
them.

**Aug 18 2026 spam update:** no damage — impressions on Aug 18–22 were the highest of the window
(146/130/142/131/114). The June prune + honest-dates work continues to pass spam review.
