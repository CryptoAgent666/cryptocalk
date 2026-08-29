# GEO / AI-Search Analysis — cryptocalk.com

> **Status: audited 2026-08-25, implemented and deployed the same day.** Sections 1–12 below are
> the audit as it was written, kept intact as the evidence trail. What changed in response is
> recorded in **§13 Implementation log** at the end, with a re-score. Deploy verified live at
> 16:12: 294 URLs warmed, IndexNow accepted 278 changed URLs (HTTP 200), all `_astro` chunks 200
> via CDN, and every AI crawler UA still gets a byte-identical 200.

**Date:** 2026-08-25 · **Method:** live probes against production (10 crawler UAs × 3 URLs), source
inspection, sitemap/lastmod parse, GSC 28d, 2 neutral AI-search queries for brand-corpus check.
**Framing:** per Google's AI-optimization guide (updated 2026-06-29), optimizing for generative-AI
surfaces *is* SEO. Nothing below is a separate "GEO channel" — it is SEO fundamentals applied to
citation engines.

---

## 1. GEO Readiness Score: 69 / 100

| Dimension | Weight | Score | Verdict |
|---|---|---|---|
| Citability | 25% | 76 | Strong format, but the most-quoted passage on the site is factually false |
| Structural readability | 20% | 74 | Clean hierarchy; passages run long, headings rarely interrogative |
| Multi-modal | 15% | 45 | **Zero** `<img>`/`<figure>`/`<video>` on any sampled page |
| Authority & brand | 20% | 60 | Good on-page E-E-A-T, near-zero off-site entity presence |
| Technical accessibility | 20% | 84 | Full SSR, every AI crawler 200, no WAF block |

**Weighted: 69.4 → 69/100.**

The technical foundation is genuinely good and is *not* the bottleneck. The two things capping this
score are (a) a set of contradictory brand facts that AI engines are already repeating incorrectly,
and (b) content age — 90% of indexable URLs sit outside the window where citation is likely.

---

## 2. Platform breakdown

| Surface | Score | Why |
|---|---|---|
| **Google AI Overviews** | 25 | ~92% of AIO citations come from top-10 results. GSC 28d: homepage at **position 76.5** (1,692 impressions, 0 clicks); most money queries sit at 60–92. The site is structurally ineligible on its own target queries — this is a ranking problem, not a GEO problem. |
| **Google AI Mode** | 45 | Weakly ranking-correlated, ~9 domains cited per query — the realistic near-term surface. SSR + citable passages qualify; freshness and entity authority do not. **Currently forfeited entirely for the Gemini app** (see §3). |
| **ChatGPT** | 40 | `OAI-SearchBot` + `ChatGPT-User` allowed and returning 200. But ChatGPT leans Wikipedia (47.9%) / Reddit (11.3%) — cryptocalk has neither, and the brand blurb the model *does* hold is the stale Play-Store one. |
| **Perplexity** | 30 | `PerplexityBot` allowed. Perplexity leans Reddit (46.7%); zero community footprint. |
| **Bing Copilot** | 50 | Indexed; IndexNow key file is deployed but never pinged (§8). |

Only ~11% of domains are cited by both ChatGPT and Google AIO for the same query — treat these as
five separate surfaces, not one.

---

## 3. AI crawler access status

**Live probe, 2026-08-25** — `/`, `/profit-calculator/`, `/llms.txt` against 10 user agents.
Every request returned **200** with **byte-identical** payloads to the Chrome control
(93,015 / 73,514 / 11,193 bytes). **No WAF, Cloudflare, or UA-level discrimination. Clean.**

| Crawler | robots.txt | Live probe | Note |
|---|---|---|---|
| OAI-SearchBot | Allow | 200 ✅ | ChatGPT citation bot |
| ChatGPT-User | Allow | 200 ✅ | user-triggered fetch |
| GPTBot | Allow | 200 ✅ | training |
| Claude-SearchBot | *(falls to `*`)* | 200 ✅ | Claude citation bot — **works, but implicit** |
| Claude-User | *(falls to `*`)* | 200 ✅ | user-triggered fetch — **works, but implicit** |
| ClaudeBot | Allow | 200 ✅ | training |
| PerplexityBot | Allow | 200 ✅ | |
| Googlebot / bingbot | Allow | 200 ✅ | |
| CCBot | **Disallow** | — | policy choice; costs base-model brand knowledge, not citations |
| Bytespider, cohere-ai, anthropic-ai | **Disallow** | — | fine (legacy/training tokens) |
| **Google-Extended** | **Disallow** | — | 🔴 **see below** |

### 🔴 `Google-Extended: Disallow` is mislabelled and is costing a citation surface

The robots.txt comment reads *"Training-only crawlers — blocked (no search benefit)"*. That is
correct for CCBot and Bytespider. It is **wrong for Google-Extended**, whose covered uses are
Gemini model training, **grounding in Gemini Apps**, and **grounding in Google Search on Vertex AI**.
Blocking it does not affect Google Search, AI Overviews, or AI Mode — but it *does* remove
cryptocalk from Gemini-app grounded answers, a surface Google reports at 1B+ users.

For a site whose entire strategy is AI-search visibility, this is a self-inflicted exclusion.

### Minor: REP groups don't inherit

`Disallow: /api/` exists only in the `User-agent: *` group. Every named AI-crawler group has only
`Allow: /`, so `/api/` is crawlable by all of them. Repeat the Disallow in each group.

---

## 4. llms.txt status — and agent-facing serving

### llms.txt (informational — no citation weight)

Google states explicitly that it ignores `llms.txt` and that having one *"won't harm (nor help)"*
visibility. Reported here as **Info**, and it never feeds the score above.

| Check | Result |
|---|---|
| Present, 200, `text/plain; charset=UTF-8` | ✅ |
| Size | 11,193 B ≈ **2,800 tokens** ✅ (under the ~4k budget) |
| Format (H1, `>` summary, H2 + `[Page](url): description`) | ✅ well-formed |
| Points at `/methodology/` and `/updates/` | ✅ (best part of the file) |
| Advertising disclosure in prose | ✅ *"No advertising trackers beyond Google AdSense"* |
| **Factual accuracy** | ❌ **see §5** |

### Agent-facing serving ("reverse mullet") — 4/8, scored separately

| Check | Result |
|---|---|
| llms.txt present / fresh / sized | ✅ |
| **On-page nudge in server-rendered HTML** | ❌ **absent** — `grep -rn "llms.txt" src/` returns zero hits |
| Nudge is location/format only, no output steering | n/a |
| No hidden-text styling | n/a |
| Partner-link disclosure in llms.txt | ✅ (no affiliates to disclose; AdSense stated) |
| robots.txt allows `/llms*` in every group | ✅ via `Allow: /` |
| Query endpoint (`/llms?query=`) | ❌ none |
| Probe result recorded | ❌ never run |

Without the nudge, the source experiment's baseline applies: agents that land on the site fetch
`llms.txt` in roughly **0–1 of 10 runs**. The file is being maintained and read by almost nobody.
This affects only agents *already* on the site — it is **not** a citation lever, and must not be
reported as one.

---

## 5. 🔴 Headline finding — the brand facts contradict each other, and AI engines are repeating the wrong ones

Six surfaces describe the same product with four different numbers and two opposite ad claims:

| Surface | Calculators | Pages | Ads | Open source |
|---|---|---|---|---|
| EN homepage FAQ **+ FAQPage JSON-LD** | 128 | "over 1,100" | **"without signup, payment, or ads"** | "open-source … on GitHub" |
| `/llms.txt` | "128+" | "**1,242** pages total" | "no trackers beyond Google AdSense" | "**not open-source**" |
| `/editorial-policy/` | — | — | **"funded solely by display advertising"** | — |
| Google Play listing | "**69+**" | — | **"No ads, no account, no data collected"** | — |
| Sitemap (actually indexable) | — | **294** | — | — |
| repo `CLAUDE.md` | ~131 | 1,294 built (565 noindexed) | — | — |

**Ground truth, verified live:**
- AdSense is loaded on `/`, `/profit-calculator/`, `/tax-calculator/` (3 refs each); the cookie
  banner says *"analytics and personalised advertising"* in all 6 locales. **The site has ads.**
- `github.com/CryptoAgent666/cryptocalk` is **public, real, TypeScript, pushed 2026-08-24**.
  **The site IS open source** → the homepage is right and **llms.txt is the file that's wrong**.
- The Android app ships AdMob banner + interstitial with live ad units
  (`src/components/AdMobAds.astro`, `ca-app-pub-4859241862365215/…`, Android-gated).
  **The Play listing's "No ads" is false for the shipped app.**
- Sitemap = 294 URLs. 565 paths are deliberately noindexed (`src/data/prune-noindex.json`), so
  "1,242 pages" / "over 1,100 pages" describe a page count Google is told to ignore.

**This is already leaking.** Two independent neutral AI-search queries run for this audit returned:

> *"CryptoCalk is a free, open-source suite of **69** cryptocurrency calculators … over **935 pages** …
> **No ads, no tracking, and no paywall**."*

The models are anchored on the **stale Play-Store blurb**, not the site. Meanwhile the live FAQ
answer they *would* quote — the one wrapped in `FAQPage` schema, i.e. the passage most likely to be
extracted verbatim — asserts a claim the site's own editorial policy contradicts.

**Why this outranks everything else in this report:** on a YMYL finance site, a provably false
monetisation claim sitting inside structured data is not just a GEO defect — it undercuts the
E-E-A-T story the `/methodology/` and `/editorial-policy/` pages were built to tell, and it is the
kind of claim Google's spam guidance treats as misleading. The site went to real trouble to publish
an honest ad disclosure; the homepage then denies it.

**Locale nuance (good news):** ru and es drop the ads clause — *"без регистрации и оплаты"*,
*"sin registro ni pago"*. Only **EN** carries the false "or ads". All six repeat "128" and
"open-source".

---

## 6. Passage-level citability

Optimal citation block is **134–167 words**. Measured on `/profit-calculator/` (13 H2 sections):

| Section | Words | |
|---|---|---|
| Quick answer | **45** | ✅ direct answer + concrete figure ($5,934 net, 19.76% ROI) in the first 45 words — textbook |
| Enter Your Trade Details | 60 | UI chrome |
| How to Use | 210 | ⚠ long |
| Key Features | 108 | close |
| Profit Calculator by Coin | 510 | ⚠⚠ far too long to extract cleanly |
| Crypto Profit Formula | 54 | ✅ tight, quotable |
| Worked Example | 96 | ✅ |
| Long vs Short | 219 | ⚠ |
| How Trading Fees Impact Profit | 198 | ⚠ |
| Understanding ROI | 192 | ⚠ |
| Common Mistakes | 212 | ⚠ |
| Authoritative sources | 22 | 2 IRS links only |
| FAQ | 615 | (9 Q&A — fine as a block, each Q&A self-contained) |

**Zero sections land in 134–167.** Six sit at 190–220 — close enough that splitting each into two
sub-blocks under H3s would put most of the page in the sweet spot. The 510-word by-coin section is
the worst offender and is also the newest content.

**Genuine citability strengths** — do not lose these:
- `/methodology/` names *primary* sources per jurisdiction (Código do IRS art. 72.º, EStG/ErbStG,
  Income Tax Act s.38, NTA, Bitcoin Core `policy.cpp`). Almost no competitor cites statute.
- `/updates/` publishes dated self-corrections with root cause. Unique, high-trust, unusually citable.
- 101 tracked constants with per-value source + verification date — this is original data.

---

## 7. Structural readability

| | `/profit-calculator/` | `/` | hub | `/methodology/` |
|---|---|---|---|---|
| H2 / H3 | 13 / 3 | 5 / 16 | 3 / 14 | 6 / 10 |
| Tables (rows) | 2 (17) | 0 | 1 (11) | **0** |
| List items | 35 | 47 | 0 | 28 |
| `<img>` / `<figure>` / `<video>` | **0 / 0 / 0** | **0 / 0 / 0** | **0 / 0 / 0** | **0 / 0 / 0** |

- Heading hierarchy is clean, paragraphs are short. ✅
- **Only 2 of 16 headings are interrogative** ("How to Use…", "How Trading Fees Impact…"). AI
  surfaces match question-shaped headings to question-shaped queries; most H2s here are noun phrases.
- `/methodology/` — the single most citable page on the site — has **no table at all**. A
  jurisdiction → rate → statute → verified-date table would be the most extractable asset here.

---

## 8. Technical accessibility

| Check | Result |
|---|---|
| Server-side rendering | ✅ **2,739 words** of prose, FAQ, worked example and tables in raw HTML on `/profit-calculator/` — no JS required |
| Calculator *outputs* | Client-rendered React island (expected); mitigated by the SSR "Worked Example" |
| AI crawler access | ✅ all 200, no WAF (§3) |
| Sitemap | ✅ 294/294 URLs carry an honest `<lastmod>` derived from git |
| Schema coverage | ✅ WebPage, WebSite, BreadcrumbList, HowTo, WebApplication, Person, Offer, FAQPage, SpeakableSpecification, ItemList, Organization, ContactPoint, ProfilePage |
| Dates | ✅ visible byline "By Konstantin Iakovlev · Updated 2026-08-23" + `datePublished`/`dateModified` |
| **IndexNow** | ⚠ key file `/7397f0c5….txt` is deployed and valid — but **no ping anywhere in `scripts/deploy.sh`**. Free Bing/Copilot freshness signal, currently unused. |
| RSL 1.0 licensing | ❌ absent (optional) |

### 🔴 Freshness — the second big lever

Content <3 months old is ~3× more likely to be cited; 6+ months starts losing eligibility.
Sitemap `lastmod` distribution across all 294 indexable URLs:

| lastmod | URLs | Age at 2026-08-25 |
|---|---|---|
| 2026-08 | 28 (9.5%) | ✅ fresh |
| 2026-05 | 117 (39.8%) | ~3–4 months |
| 2026-04 | 85 (28.9%) | ~4–5 months |
| 2026-03 | 64 (21.8%) | ~5–6 months — **at the cliff** |

**266 of 294 (90.5%) are outside the high-citation window.** The 28 fresh URLs are exactly the
2026-08-23 SEO batch: `/about/`, `/methodology/`, `/editorial-policy/`, `/updates/`,
`/profit-calculator/`, `/calculators/profit-loss/` and their locale twins. Every other calculator —
including the tax and mining pages where the site's real differentiator lives — is 3–6 months stale.

---

## 9. Brand mention analysis

Brand mentions correlate ~3× more strongly with AI citation than backlinks (Ahrefs, 75k brands;
YouTube ~0.737 vs Domain Rating ~0.266).

| Signal | Status |
|---|---|
| Wikipedia | ❌ `/wiki/CryptoCalk` → 404 |
| Wikidata | ❌ no item |
| YouTube | ❌ none (strongest single correlate) |
| Reddit | ❌ none found (drives 46.7% of Perplexity, 11.3% of ChatGPT citations) |
| LinkedIn | ✅ personal profile, in `sameAs` |
| X | ✅ `@yakovlevka3` |
| GitHub | ✅ public repo — but **0 stars**, no README-as-landing, no topics |
| Google Play | ✅ listed — **and is the stale blurb the models quote** (§5) |

**`sameAs` is inconsistent across the site**, which fragments the entity:

- `/` → `[x, github, linkedin]`
- `/about/` → `[x, linkedin, instagram, zanimaem.kz, calk.kz]`
- `/methodology/` → `Person` with **no** `sameAs`

Pick one canonical `sameAs` array (all profiles, including GitHub and Play) and emit it identically
on every page carrying `Person`/`Organization`.

---

## 10. Top 5 highest-impact changes

1. **🔴 Reconcile the brand facts, everywhere at once.** One number for calculators, one for pages
   (use the 294 indexable figure or drop the page count), and one honest ad statement. Concretely:
   rewrite the EN homepage FAQ answer to *"Yes — every calculator is free, with no signup and no
   paywall. The site is funded by display advertising."*; fix `llms.txt`'s "not open-source" → open
   source, with the repo URL; correct the Play listing's "69+ … No ads" (it is also a Play
   data-safety exposure, since the Android build ships AdMob). Highest impact **and** lowest effort
   — and it is the only item on this list that currently makes AI engines state something untrue.
2. **🔴 Ship a freshness program.** 266 URLs are 3–6 months old. Cheapest honest path: the constants
   pipeline already re-verifies 101 values on a schedule — surface each verification as a real
   content change on the affected calculator page (a dated "Verified 2026-08-25 against ATO" line
   that also moves `dateModified` and `lastmod`). That converts existing back-office work into the
   single strongest measured citation factor, without inventing freshness.
3. **🟡 Un-block `Google-Extended`** and fix the misleading comment. One line; restores eligibility
   for Gemini-app and Vertex grounding. Keep CCBot/Bytespider blocked if that's the policy.
4. **🟡 Make `/methodology/` extractable.** Add the jurisdiction → rate → statute → verified-date
   table (currently 0 tables, 28 bullets), plus per-calculator benchmark tables. Tables are the
   highest-yield format for citation and this page holds the site's only genuinely unique data.
5. **🟡 Build off-site entity presence.** Wikidata item (achievable now; Wikipedia is not yet
   notable), a YouTube channel with short worked-example screencasts, and honest participation in
   r/CryptoCurrency / r/BitcoinMining threads. This is the only lever that moves ChatGPT and
   Perplexity, where the site currently scores 40 and 30.

**Separate line item (not a citation lever):** add the agent-facing nudge — a visible footer link to
`/llms.txt` with an agent-addressed `title` attribute stating location, format, and ~2.8k token
size. No hidden-text styling, no output-steering wording. Then run the acceptance probe (4–6 models
× 5–10 runs, neutral prompt, count `/llms.txt` hits in logs) before and after. Expected 0/10 → 10/10.

---

## 11. Schema recommendations

| Recommendation | Where | Why |
|---|---|---|
| **Fix the FAQPage answer text** | EN `/` | Structured data is the passage most likely quoted verbatim; it currently carries the false ad claim |
| Single canonical `sameAs` array | every `Person`/`Organization` node | Entity consolidation (§9) |
| `Dataset` schema for the constants ledger | `/methodology/` | 101 sourced, dated regulatory values is a genuine dataset — a strong, rare citation hook |
| `TechArticle` (or `Article`) + `author` + `dateModified` | `/methodology/`, `/editorial-policy/` | Currently bare `WebPage`; these are the E-E-A-T pages |
| `Organization.publishingPrinciples` → `/editorial-policy/` and `.correctionsPolicy` → `/updates/` | site-wide | Machine-readable proof of the corrections practice the site actually runs |
| `Person.sameAs` on `/methodology/` | `/methodology/` | Person node currently has no identity links |
| `about` / `mentions` with Wikidata QIDs (Bitcoin, Ethereum…) | calculator pages | Explicit entity linking for AI-Mode retrieval |
| RSL 1.0 licensing terms | `/robots.txt` or `/.well-known/` | Optional; positions the site for paid-licensing surfaces |

---

## 12. Content reformatting suggestions (specific)

1. **EN homepage FAQ, "Is CryptoCalk free to use?"** — remove `or ads`; state the AdSense funding
   plainly. Mirror the wording in `/editorial-policy/` §6 so the two agree word-for-word.
2. **`/llms.txt`** — three edits: "not open-source" → open source + repo URL; "Total: 1,242 pages" →
   "294 indexable pages (≈1,000 further variants are intentionally noindexed)"; drop or date-stamp
   the hardcoded *"Network difficulty 145T (May 2026), hashrate ~850 EH/s"* — those are stale
   figures being served to agents as current, the same bug class as the site's Data-Currency checks.
3. **`/profit-calculator/` "Profit Calculator by Coin" (510 w)** — split into per-coin H3 blocks of
   ~140 words each, every block opening with a self-contained sentence naming the coin and a
   concrete number. Same treatment for the four 190–220-word sections.
4. **Convert 6 noun-phrase H2s to questions** — "Crypto Profit Formula" → "How do you calculate
   crypto profit?", "Understanding ROI in Crypto Trading" → "What is a good ROI on a crypto trade?",
   "Common Profit Calculation Mistakes" → "What mistakes make crypto profit calculations wrong?"
5. **Add multi-modal assets.** Zero images sitewide. One SVG diagram per money page (fee-flow, long
   vs short payoff, halving schedule) with descriptive alt text, plus the tables from §11 — this is
   the 15% dimension currently scoring 45.
6. **Widen "Authoritative sources"** (22 words, 2 IRS links) into a real per-page source list —
   `/methodology/` already holds the statute-level citations; surface the relevant 2–4 per calculator.

---

## Appendix — adjacent finding, outside GEO scope

`github.com/CryptoAgent666/cryptocalk` is public and contains `CLAUDE.md`, `.claude/`, `DEPLOY.md`
and `ota-backend-vps/` — i.e. fleet deployment notes, server paths, and internal operating
procedure. Being open source is an asset worth keeping and advertising; publishing the ops runbook
alongside it is a separate decision that was probably never made deliberately. Worth a look.

---

## 13. Implementation log — 2026-08-25

Everything below is committed to source, verified against a local build (1,294 pages, 38 tests
passing, 0 build errors), and **deployed and re-verified on the live site**.

### Re-score

| Dimension | Weight | Was | Now | What moved it |
|---|---|---|---|---|
| Citability | 25% | 76 | **86** | false claims removed; question-form headings; per-calculator source tables; captioned diagrams |
| Structural readability | 20% | 74 | **86** | 2 tables on `/methodology/`, a source table on 189 calculator pages, 7/18 headings now interrogative |
| Multi-modal | 15% | 45 | **60** | first `<figure>`s on the site (2 SVG diagrams); tables sitewide. Still only one page has diagrams |
| Authority & brand | 20% | 60 | **74** | unified `sameAs`, `Dataset` + `TechArticle`, `publishingPrinciples`/`correctionsPolicy`, non-US sources, published source-tier audit. Off-site entity presence unchanged |
| Technical accessibility | 20% | 84 | **94** | Google-Extended unblocked, explicit citation-bot groups, IndexNow wired, RSL, 278/294 URLs freshened honestly |

**Weighted: 69 → 81 / 100.** The remaining gap is almost entirely §9 (off-site entity presence),
which cannot be built from inside the repo.

### 1. Brand facts reconciled (§5)

| Surface | Change |
|---|---|
| EN homepage FAQ + `FAQPage` JSON-LD | “without signup, payment, or ads” → “without signup, payment, or a premium tier. The site is funded by display advertising, and the codebase is open source on GitHub.” |
| EN homepage prose | “over 1,100 pages” dropped; “no tracking” → “no calculation data sent to our servers”; “Privacy First” card now says analytics and ads load only after consent |
| es/pt/tr/hi/ru homepages | page-count clause dropped, ad funding stated, “tracking cookies” claim removed |
| `/about/` | “128 calculators, 1,241 pages” → “128 calculators in 6 languages” |
| `/llms.txt` | “not open-source” → repo URL; “1,242 pages” → “294 indexed pages” with the noindex explanation; stale “difficulty 145T / ~850 EH/s” replaced by an instruction to read live values off the page |
| `play-store-listing.md` | stale root duplicate (“69+ … No ads”) replaced by a pointer to `play-store-assets/listing.md`; the Russian listing was moved there and corrected (128 calculators, AdMob disclosed) |

⚠️ **Correction, checked against the live listing after deploy:** the Play Store description is
**already current** — “CryptoCalk puts 128 free cryptocurrency calculators in your pocket… No
sign-up and no paywall”, with **Contains ads** declared. The “69+ … No ads” text existed only in
this repo's stale `play-store-listing.md`. The audit above asserted the console was stale; that
was wrong.

The blurb AI search actually quoted traces to the **public GitHub repository**, not to Play. The
tracked, publicly served file is `CHANGELOG.md`, which records the old homepage prose (“69
calculators, 6 languages, 935 pages”) and repeated “Build: 935 pages” lines. It was accurate when
written; per this project's own rule, historical entries are not rewritten — so it now carries a
header stating that each entry describes the state on its date, with pointers to what is current.
(The `appeal/` letters make similar claims but are gitignored and 404 on GitHub, so they were never
a source — an earlier draft of this section said otherwise and was wrong.)

🔴 **What is genuinely unresolved is Data safety.** The live listing declares **“No data collected”**
and **“No data shared with third parties”**, while `android/app/src/main/AndroidManifest.xml`
carries the production AdMob App ID `ca-app-pub-4859241862365215~7817677190` and
`@capacitor-community/admob` is a dependency — so the Google Mobile Ads SDK merges in `AD_ID` and
collects the advertising identifier. A Data safety form that contradicts the shipped binary is a
removal risk, and it is the one thing here that only the account owner can fix.

The claim that was *right* was the one `llms.txt` denied: `github.com/CryptoAgent666/cryptocalk` is
public, TypeScript, and was pushed 2026-08-24. The site is open source; the file was wrong.

### 2. A second false-claim class, found while fixing the first

`/editorial-policy/` said **“Primary sources only … a tax-guide article … is never the source we
record.”** The ledger disagreed: 12 of 17 tax jurisdictions had at least one value whose source of
record was koinly, blockpit, PwC, ClearTax, TaxFoundation or a news article.

Rather than quietly soften the sentence, `/methodology/` now **publishes the ledger**: a
jurisdiction table naming the exact source page, a per-jurisdiction tier breakdown
(`3 statute · 1 secondary`), and the last verification date — with the secondary-backed
jurisdictions explicitly marked as the re-verification queue. The claim in EN, pt and tr, and in
`llms.txt`, was changed from an absolute to what is actually true.

### 3. Freshness (§8) — 28 → 278 of 294 URLs

Not a build-date stamp. Every bumped page had a real visible change today (question-form headings,
widened source list, the new source block, the diagrams), and the 133 slugs were selected by
**scanning the built HTML for those markers**, not assumed — the 5 that changed nothing
(`404`, `compare`, `contact`, `privacy`, `terms`) were left on their old dates. The reasoning is
recorded in the header of `src/data/calculator-updated.ts`.

Going forward the mechanism is self-maintaining: the new source block renders each constant's
verification date, so a re-verification changes the page, which is what moves `dateModified`.

### 4. Crawler policy (§3)

`Google-Extended` unblocked, with the reason written into `robots.txt` (it gates Gemini-app and
Vertex grounding, not Search). `Claude-SearchBot`, `Claude-User`, `Google-CloudVertexBot` and
`Applebot` now have explicit groups instead of relying on the `*` fallback, and every group repeats
`Disallow: /api/` (REP groups do not inherit). CCBot, Bytespider, anthropic-ai and cohere-ai stay
blocked — that is a policy choice and costs no citations.

Added `/rsl-license.xml` (RSL 1.0) plus a `License:` directive in robots.txt. It restates `/terms/`
and introduces no new terms.

### 5. New: “Where these numbers come from” (189 pages, 6 languages)

A per-calculator block on the 19 calculators that depend on tax law or protocol rules, rendered
server-side: the value on the page, the source it was read from, whether that source is a statute,
a protocol spec, a secondary guide or a market assumption, and the date of the last hand check.
Localised into all six languages. `/methodology/` carries the full version plus a `Dataset` schema.

### 6. Schema (§11)

`src/data/entity.ts` is now the single source of `sameAs` — the homepage, localized homepages,
`/about/` and `/methodology/` had three different sets. `/methodology/` upgraded from bare `WebPage`
to `TechArticle` with an author node, and gained the `Dataset`. `Organization` gained
`publishingPrinciples` → `/editorial-policy/` and `correctionsPolicy` → `/updates/`.

### 7. Structure and multi-modal (§7, §12)

- 30 template headings across 6 locales rewritten to question form (180 pages each).
- 7 headings on `/profit-calculator/` likewise.
- Two inline SVG diagrams on `/profit-calculator/` — the first `<figure>` elements on the site —
  with `<title>`/`<desc>` and figcaptions, tied to the page's own worked example. Both are drawn to
  scale: the “gross vs net” bars really are 180px and 178px, because the honest point is that the
  fees are small and the *denominator* is what moves the ROI.
- Authoritative sources went from 2–3 US regulators per category to 4–5 including the ATO, HMRC,
  ESMA, the FCA, the OECD CARF and the protocol specs — 16 new sources with 80 translations, so no
  repeat of the EN-only note bug.
- `IndexNow` now pings from `deploy.sh`, submitting only URLs whose `lastmod` moved in the last
  7 days rather than re-submitting all 294 every deploy.

### 8. Agent-facing serving (§4) — nudge shipped, probe still owed

A visible footer link to `/llms.txt` with the agent-addressed instruction in its `title`, localized,
on all 1,294 built pages via `Layout.astro`. Normal size, normal contrast, no hidden-text styling;
it advertises location, format and token size only, with no output-steering wording.

**Probe run 2026-08-25, after deploy — and the article's numbers do not replicate.**

The skill asks for `/llms.txt` hits in access logs before vs after. cryptocalk has no shell on its
host (lftp only) and the nudge was already live, so instead the agent's *decision* was measured
directly: 5 models get a `fetch_url` tool and every URL they ask for is logged, with a control arm
served the same live page with the nudge stripped. Both arms see the same site at the same moment —
a tighter control than before/after in time, which would confound with everything else that shipped
today. Harness validated first: the nudge lands at char 12,210 of 12,437 of the homepage text (no
truncation), control is clean, and all 5 models fetch the file on a direct request, so the zeros
are behaviour and not a broken tool. Script and full numbers: `tools/geo-agent-probe.py`
(adapted from the advcash.kz run the same day — that design and its negative finding are theirs).

| Task given to the agent | nudge | control | Fisher (one-sided) |
|---|---|---|---|
| “Explore *domain* and tell me everything you can find” — **the skill's own wording** | 3/25 | 0/25 | p = 0.12, not significant |
| “…and extract its data in the most machine-readable form available” | **18/25** | 0/25 | **p = 2.7 × 10⁻⁸** |

Per model on the second task: gpt-4o-mini 5/5, claude-haiku-4.5 5/5, qwen3-30b 5/5, mistral-small
3/5, gemini-2.5-flash-lite 0/5 — against a flat 0/5 control for every one of them.

**What this means.** The expected shape from the source article was ~0/10 → ~10/10 on the neutral
prompt. We got 3/25, and advcash.kz got 0/25 on the same wording. The nudge does not make an agent
*want* data; it makes an agent that already wants data find it immediately instead of scraping HTML.
That is worth having — 0 → 18 of 25 is not a small effect — but it is plumbing for agentic sessions,
not a visibility lever, and the §4 boundary stands: **it does not touch AI-search citations.**

Two follow-ups fell out of the run. cryptocalk's `robots.txt` never named `llms.txt`, which is why
the control is a clean 0/25 (on advcash, claude-haiku found the file in both arms through exactly
such a line). A pointer has been added; measuring that second path needs the next deploy and a
control-only re-run. No query endpoint was built — the static host has no compute path for one;
pre-sharded topic files are the fallback if it ever matters.

### 9. Not done, and why

- **Off-site entity presence (§9 / top-5 #5).** Wikidata item, YouTube channel, Reddit
  participation — these are publishing actions on third-party platforms, not repo changes. This is
  now the single largest remaining lever, and it is the one that moves ChatGPT (40) and
  Perplexity (30).
- **The Play Console Data safety declaration** (see the correction in §13.1) — a compliance
  statement about the developer's own data practices; not mine to submit.
- **Localized `/methodology/` source table.** The per-calculator block already carries the same data
  in all six languages, so the summary table stayed EN-only.
- **Splitting `/profit-calculator/`'s long sections.** The 510-word by-coin block is a *table*, and
  §11 of this same audit calls tables the highest-yield citation format — breaking it into prose
  would have traded a strength for a word count. Headings were fixed instead.

