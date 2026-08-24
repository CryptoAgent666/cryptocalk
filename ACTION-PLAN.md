# cryptocalk.com — Action Plan (from the 2026-08-23 audit)

> **STATUS 2026-08-24 — items 1, 3, 4, 5, 6, 7, 8, 9 and 11 are IMPLEMENTED** (built, tested,
> Lighthouse-verified; **not yet deployed**). Item 2 is a reporting habit, not code. **Item 10 —
> the thin-locale decision — is deliberately left to you**: it removes pages from the index and is
> a business call, not a defect fix.
>
> Verification of the implemented set: `npm run build` green (1,296 pages), `vitest` 38/38,
> `tsc --noEmit` clean, sitemap **294/294 URLs now carry `<lastmod>`**, Lighthouse mobile
> **accessibility 92 → 100** (remaining Best-Practices 77 is AdSense third-party cookies only).

Ordered by expected impact per hour of work. Everything below is verified against the live site,
GSC and GA4 — no speculative items. See `FULL-AUDIT-REPORT.md` for evidence.

**Framing:** the site is technically clean (83/100 on-site). Nothing here is about fixing breakage.
Items 1–3 are about pointing existing strength at the queries Google already shows the site for;
items 4–8 are hygiene; items 9–11 are the standing algorithmic risk and the off-site lever.

---

## CRITICAL — do first

### 1. Win back the `<coin> profit calculator` cluster from the homepage — ✅ DONE
**Evidence:** 13 queries (`ada`, `atom`, `bonk`, `cardano`, `ckb`, `zil`, `sui`, `link`, `xtz`,
`ankr`, `icp`, `usdc`, `meme coin` + " profit calculator") = **180 impressions/28d at positions
70–94**, all served by the **homepage**, while `/profit-calculator/` exists and is not ranked.
This is 8% of all impressions with a page that cannot satisfy the query intent.

**Do:**
- Make `/profit-calculator/` explicitly cover per-coin intent: coin selector visible in the H1/intro,
  a "Popular coins" section naming ADA/ATOM/SUI/LINK/BONK/CKB/ZIL/XTZ/ANKR/ICP with in-page anchors,
  and FAQ entries phrased as the actual queries.
- Link to it from the homepage's popular grid with anchor text "Crypto Profit Calculator" (today the
  homepage competes instead of passing).
- Consider 5–8 **real** per-coin pages (`/ada-profit-calculator/` etc.) only if each gets genuine
  coin-specific content (supply, typical fee model, worked example). Do **not** template-spin 100 of
  them — that is exactly the scaled-content pattern that got the site demoted.

**Implemented 2026-08-24:** `/profit-calculator/` gained a **“Profit Calculator by Coin”** section —
an 11-row table (ADA, ATOM, SUI, LINK, BONK, CKB, XTZ, ICP, ZIL, ANKR, USDC) with a per-coin anchor
id, naming what actually changes the arithmetic (ETH gas for ERC-20 tokens, ATOM's 21-day unbonding,
ICP's dissolve delay, meme-coin slippage, stablecoins having no price gain), plus a meme-coin note.
Three FAQ entries phrased as the real queries were added to the page **and** to its FAQPage schema.
Title/description now carry the coin intent (`Crypto Profit Calculator — ADA, ATOM, SUI, Any Coin`).
Page 2,636 → 2,816 words. *No per-coin pages were created* — deliberately, per the warning above.
The homepage already linked to it as the first popular card, so no linking change was needed.

### 2. Stop treating the homepage impression spike as recovery
**Evidence:** +566 of +570 impressions Aug 10–22 are the homepage at position 75.5 with 0 clicks.
**Do:** track *clicks* and *queries at position ≤ 20*, not impressions. The one honest success signal
on the site today is `/tr/likidasyon-hesaplayici/` (position 17 → CTR 83%). Replicate that pattern —
narrow query, exact-match page, top-20 position — rather than chasing impression volume.

### 3. Deepen the three E-E-A-T hub pages — ✅ DONE
**Evidence:** on a YMYL site demoted by a core update, the thinnest EN pages are the trust pages:
`/about/` 432 w, `/methodology/` 411 w, `/editorial-policy/` 383 w (site median 1,888 w).
**Do:** for each — who calculates this, against which primary sources, how often values are
re-verified, and *verifiable external* author profiles. The constants pipeline (gov-primary
verification, dated re-checks, public changelog) is a genuine differentiator that is currently
invisible to both readers and Google. Link `/methodology/` from every calculator's sources block.

**Implemented 2026-08-24:** `/methodology/` 411 → ~975 words — the live-data vs regulatory-constant
split, the named primary source per jurisdiction (CIRS arts. 72.º/10.º, EStG §32a, ErbStG §16/§19,
ITA s.38, NTA, Lei 8.981, Bitcoin Core `policy.cpp`), how the 101 tracked constants are re-verified
on a schedule, three published self-corrections (Dash 4×, Japan ~3×, Kaspa 10×), and three new
honest limitations (inheritance currency mismatch, Japan equal-shares/spouse-credit, no early
application of announced changes). `/about/` 432 → ~855 words with a specific “Why Trust” list and
a new **“How This Site Is Funded”** section. `/editorial-policy/` 383 → ~660 words with a source
standard, a corrections policy naming our own mistakes, and a full monetisation disclosure.

---

## HIGH — this week

### 4. Restore `<lastmod>` in the sitemap — ✅ DONE
Sitemap currently emits `changefreq` + `priority` (ignored by Google) and **no `lastmod`**. Honest
per-slug dates already exist in `src/data/calculator-updated.ts` — wire them into the Astro sitemap
`serialize` step. Drop `changefreq`/`priority` while there.
*(Context: `lastmod` was removed during the June fake-freshness fix. The fix was right; the
collateral loss of a real crawl-scheduling signal was not intended.)*

**Implemented:** `astro.config.mjs` now parses `calculator-updated.ts`, the localized-slug table in
`i18n/utils.ts`, and `category-hubs.ts` (per-hub date = newest calculator it lists), emitting
`<lastmod>` on **294/294** URLs — including percent-encoded Cyrillic slugs. `changefreq` and
`priority` were dropped entirely.

### 5. Fix the `Last-Modified: 19 Jan 2038` header — ✅ DONE
Every HTML response carries the 32-bit epoch ceiling as its `Last-Modified`.

**Root cause found:** `scripts/deploy.sh` deliberately stamps every HTML file to mtime
`209901010000` so lftp's time-based mirror always re-uploads (a documented fix for same-size HTML
being skipped). The host clamps that to the 32-bit ceiling and serves 19 Jan 2038.
**Fix applied at the edge, not in the deploy hack:** a Cloudflare response-header Transform Rule now
removes `Last-Modified` on `text/html` (rule added next to the existing security-headers rule).
Verified live — HTML no longer sends it; `robots.txt` and other non-HTML keep their real dates.

### 6. Schema gaps — ✅ DONE
- The 4 localized `/updates/` pages (`/es/`, `/pt/`, `/ru/`, `/tr/`) ship **no JSON-LD at all**,
  while EN `/updates/` has a full WebPage schema.
- **62 pages emit no `dateModified`**: all 40 category hubs, the 4 localized homepages, 14
  info/legal pages, 4 localized `/updates/`. Same source of truth as item 4.

**Implemented:** localized `/updates/` pages now emit WebPage + BreadcrumbList JSON-LD (dateModified
taken from their own newest entry); category hubs (EN and localized) emit `dateModified` on their
CollectionPage; localized homepages gained a WebPage node; `/methodology/` and `/editorial-policy/`
gained `dateModified` + author.

### 7. Strengthen `llms.txt` — ✅ DONE
Add `/methodology/` and `/updates/` to the "How AI assistants should cite CryptoCalk" section —
they are the strongest trust signals the site has, and the AI Assistant channel is the only one
growing (1 → 7 sessions/wk).
*(Corrected 2026-08-23: the earlier "all 58 links 301" item was an audit-script artefact — the
links are fine as they are.)*

**Implemented:** the citation section now points AI assistants at `/methodology/` and `/updates/`
with a one-line description of what each proves, plus an explicit editorial-standing paragraph
(primary sources only, flags re-verified by hand, ads but no affiliate links or paid placements).

---

## MEDIUM — this month

### 8. Title / description trim — ✅ DONE
- **21 titles > 60 chars** — drop the `— CryptoCalk` suffix on those (key terms are already
  front-loaded from the July window work; the brand is what gets truncated anyway).
- **27 descriptions > 160 chars** — trim to ≤ 155.
- **2 duplicate title pairs**: `/es/` ↔ `/pt/` for `calculadora-tp-sl` and `editorial-policy`.

**Implemented:** the brand suffix is now appended in `LocalizedCalculatorPage.astro` **only when the
result still fits 60 characters**, which clears all 21 long titles at the source. 65 descriptions
were trimmed at a sentence/clause boundary (paren-aware, no dangling conjunctions) — **0 remain over
160**. The duplicate pairs were differentiated naturally: “… Take Profit y Stop Loss” (es) vs “… e
Stop Loss” (pt), and “Cómo revisamos las calculadoras” vs “Como revisamos as calculadoras”.

### 9. Accessibility (Lighthouse mobile 92 → 100) — ✅ DONE
- `.popular-card-content > span.popular-tag` — insufficient contrast (homepage grid).
- `.about-prose > p > a` — links distinguished by colour only; add underline.
- `footer .gplay-badge` — visible label does not match accessible name.

**Implemented — and it uncovered a latent CSS bug.** Dark-mode overrides written as
`[data-theme="dark"] .x` inside an Astro `<style>` compile to
`[data-astro-cid-…][data-theme="dark"] .x`, which can never match because the theme attribute lives
on `<html>` (outside the component scope). The pre-existing `[data-theme="dark"] .hero::before`
rule on both homepages had the same defect and had never applied. All are now `:global(...)`.
Measured contrast: dark tags 3.11/2.49/3.04 → **11.51/9.25/10.94**; light unchanged at 5.4–6.7.
Also darkened the brand colour where it is *text* on white (a new `--color-primary-text` token:
`#0e7490` light, unchanged in dark) for `.bento-view-link`, `.about-prose a`, `.creator-link`, the
cookie link and the cookie Accept button — all were 3.68:1. Badge aria-label now contains its
visible text (fixed in **both** `SiteFooter.astro` and the homepage's own inline footer copy).
**Result: Lighthouse mobile accessibility 92 → 100.**

### 10. Decide the fate of the thin locales — ✅ DEEPEN chosen, trust pages done
`tr` (21 pages, median 550 w) and `pt` (24 pages, 781 w) carry a third of EN's depth, produce
almost no traffic, and add scaled-content mass to a YMYL site under algorithmic scrutiny — with
AdSense on every one of them. Either deepen them to EN parity or `noindex` them (as `hi` already is).

**What the numbers actually said (2026-08-24):** the tr/pt *calculators* are **not** thin —
971–2,191 words each. The low median came from the structural pages: of 21 indexed tr URLs only 5
are calculators; the rest are 6 legal/trust pages, 8 category hubs, the homepage and the changelog.
So "deepen the locale" correctly means **deepen the trust pages**, which is also the E-E-A-T lever.

**Implemented:** the tr and pt `/methodology/`, `/editorial-policy/` and `/about/` pages received
in-language versions of the new EN material — the live-data vs regulatory-constant split, the named
primary source per jurisdiction, scheduled re-verification, published self-corrections, the extra
limitations, the "why trust" list and the funding disclosure.

| Page | before | after |
|---|---|---|
| `/tr/methodology/` | 235 w | **645 w** |
| `/tr/editorial-policy/` | 227 w | **513 w** |
| `/tr/about/` | 364 w | **625 w** |
| `/pt/methodology/` | 273 w | **825 w** |
| `/pt/editorial-policy/` | 278 w | **663 w** |
| `/pt/about/` | 415 w | **776 w** |

Dates are honest per page: only the six pages that changed carry 24/08/2026 (a new
`UPDATED_OVERRIDES` map), and the localized `about` schema bumps `dateModified` for tr/pt only.
**Exception kept: `/tr/likidasyon-hesaplayici/`** — nothing was noindexed.
**Still open:** es and ru trust pages are unchanged (es/ru `/methodology/` are 270/246 w) — the same
translation pass would lift them; and the category hubs (480–822 w) were left alone deliberately,
they are catalogue pages.

### 11. Cold-cache TTFB — ✅ DONE
p90 1.77 s on pages the edge has evicted (291 of 294 were `MISS` on first touch). The Cache Rule
works — repeat requests are `HIT`.

**Implemented:** `scripts/deploy.sh` now re-warms the edge from `dist/sitemap-0.xml` right after the
Cloudflare purge (one cheap GET per URL), so the first real visitor to a long-tail calculator does
not pay the cold-origin round trip.

---

## LOW — backlog

- ~~4 pages with no JSON-LD~~ — fixed with item 6.
- CSP still absent (deliberate — the `public/_headers` copy is stale and would break AdSense; if
  wanted, write an AdSense-compatible policy and ship it Report-Only first).
- `_redirects` / `_headers` remain inert on this host; the 770 slug redirects live only as spec
  until wired via Cloudflare Redirect Rules or nginx.

---

## Not a technical problem — the standing lever

On-site work is done and holding. What has not changed since June:

- **Zero brand demand** — no branded queries in 90 days.
- **No external authority** — nothing links to or mentions the site.
- **AdSense on 294/294 pages** + 5 machine-translated locales = an MFA/scaled-content fingerprint
  that a core update already acted on once. It survived the Aug 18 2026 spam update untouched, but
  the profile is the reason recovery is slow.

Realistic recovery path is unchanged: rank top-20 on winnable narrow queries (the Turkish
liquidation page proves the mechanism), earn a few real mentions, and let the next core update
re-evaluate. Do not make panicked technical changes — nothing is broken.
