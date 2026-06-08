# Prune Plan — cut the scaled-content footprint (core-update recovery)

**Date:** 2026-06-08 · **Why:** Google May 2026 Core Update (completed Jun 2) demoted cryptocalk.com ~97% impressions on Jun 3. Site-specific (all sibling calk.* sites are fine). Root profile = too many low/no-value programmatic + machine-translated pages dragging down sitewide quality. Recovery lever #1 = shrink the indexed footprint to pages that actually earn attention.

Data source: GSC page-level, pre-drop window 2026-05-02..2026-06-01 (when the site was visible). Executable keep-list: `prune-keep.json`.

## The footprint problem

| metric | count |
|---|--:|
| URLs in sitemap | ~858 |
| Pages Google showed ≥1× in a month | **340** |
| Pages that earned ≥1 click in a month | **69** |
| Pages with **0 impressions** in a month | **~518** |

~60% of the indexed site is invisible dead weight. That ratio is what a core update penalizes.

## Keep / noindex by locale

KEEP = pages Google actually showed (EN, the authority locale) or that earn clicks / ≥50 impr (other locales). Everything else → `noindex, follow` + drop from sitemap. Calculators stay fully functional (tool still works for direct/app users) — only their search-index eligibility changes.

| locale | sitemap | shown | **KEEP** | noindex |
|---|--:|--:|--:|--:|
| en | 140 | 113 | **113** | 0 (improve 64 zero-click pages instead) |
| ru | 144 | 69 | **21** | 48 shown + ~75 never-shown |
| es | 144 | 64 | **14** | 50 shown + ~80 never-shown |
| pt | 144 | 56 | **9** | 47 shown + ~88 never-shown |
| tr | 144 | 30 | **5** | 25 shown + ~114 never-shown |
| hi | 142 | 8 | **0 — drop whole locale** | 142 |

Resulting indexed core ≈ **162 proven pages** (+ optionally the zero-click EN pages kept for catalog completeness). Exact slugs to keep are in `prune-keep.json`.

## Mechanism (infra already exists)

- `src/layouts/Layout.astro` already has a `noindex` prop → emits `<meta name="robots" content="noindex, nofollow">` (use `noindex, follow` for prune so link equity flows — adjust the tag).
- `@astrojs/sitemap` in `astro.config.mjs` already filters noindex/alias pages out of the sitemap.
- Implementation: in `LocalizedCalculatorPage.astro` (and per-locale page wrappers), pass `noindex` when `(lang, slug)` is **not** in the keep-list. Load keep-list from `prune-keep.json` at build time.

## Phased rollout (risk-managed)

1. **Phase 1 — zero risk (do now):** noindex `hi` entirely + every page with 0 impressions/month + `tr` tail. These get literally no search traffic → no traffic to lose. Footprint ~858 → ~300.
2. **Measure 2–4 weeks** via `DATA_HUB/_cryptocalk_prune.py` re-run + impressions trend.
3. **Phase 2:** tighten `es`/`pt`/`tr` to winners only (per keep-list). Footprint → ~162.
4. **Keep & upgrade** `en` (140) and `ru` core: these earn — make them best-in-class (see exemplar work), don't just keep.

## Expected effect & measurement

- No traffic loss (pruned pages earn ~0 clicks today).
- Average indexed-page quality rises sharply → better sitewide signal for the next core update (where recovery typically lands).
- Track: total impressions trend, # pages with impressions (should stay ~flat while total page count drops → density up), and next-core-update recovery.
