# 🤖 AI Agent Instructions — CryptoCalk

> **MANDATORY**: Every AI agent working on this project MUST read this file in full before making any changes.

## 1. Always Reference the Project Specification

Before writing any code, read the project specification document:
- **Primary spec**: [cryptocalk-research-v2.md](file:///Users/konstantin/.gemini/antigravity/brain/cd887f19-473a-4654-9bce-27766ee77c23/cryptocalk-research-v2.md)

This document contains:
- Full list of calculators with input/output fields
- SEO architecture and URL structure
- Design strategy and UX decisions
- API strategy and caching rules
- Multilingual plan
- Monetization strategy
- Performance budget

**If you are unsure whether a feature or approach aligns with the spec — check first, then ask.**

## 2. Confirm Before Contradicting the Spec

If the user's request contradicts the project specification or these instructions:
1. **Do NOT silently proceed** with the contradicting approach.
2. **Explicitly inform the user** of the contradiction.
3. **Ask for confirmation** before making the change.
4. **Log the deviation** in `CHANGELOG.md` with the reason.

Examples of contradictions to flag:
- Adding a framework or library not in the approved stack
- Changing the URL structure defined in the spec
- Altering the design system (colors, typography, layout philosophy)
- Deviating from the SEO architecture
- Changing the performance budget targets

## 3. Maintain the Changelog

All code changes **must** be logged in `/CHANGELOG.md` in the project root.

### Format:
```markdown
## [YYYY-MM-DD]

### Added
- Description of new feature or file (by: Agent Name / Conversation ID)

### Changed
- Description of what was modified and why

### Fixed
- Description of bug fixes

### Deviated
- Any deviations from the spec, with justification and user approval status
```

**Create this file if it doesn't exist.** Update it with every session that modifies code.

## 4. Approved Technology Stack — No Exceptions Without Permission

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | 5.x |
| UI Islands | React | 19.x |
| Styling | Tailwind CSS | 4.x (via `@tailwindcss/vite`) |
| Icons | lucide-react | latest |
| Utilities | clsx | latest |
| Hosting | Cloudflare Pages | — |
| Primary API | CoinGecko API v3 | free tier |
| Charts | (TBD — Recharts or Lightweight Charts) | — |

### ⛔ Prohibited Without Explicit Approval:
- **No jQuery, Bootstrap, Material UI, Chakra UI, or similar UI libraries**
- **No Next.js, Nuxt, SvelteKit** — this is an Astro project
- **No `@astrojs/tailwind`** — we use `@tailwindcss/vite` directly (Tailwind v4)
- **No server-side databases** — all calculations are client-side
- **No paid APIs** without user approval
- **No analytics/tracking scripts** without user approval

If a task requires a technology not listed above:
1. **Stop and ask** the user for permission.
2. Explain **why** you need it and **what alternatives** exist in the approved stack.
3. Only proceed after explicit approval.

## 5. Design Rules

- **Default theme**: Light Mode
- **Dark mode**: Available via toggle, stored in `localStorage`
- **Style**: "Modern Utilitarian" — clean, high contrast, structured
- **Font**: Inter (Google Fonts)
- **CSS approach**: CSS variables defined in `src/styles/global.css`, scoped styles in `.astro` files
- **No inline styles in production components** (except dynamic values from props)
- **Mobile-first** responsive design
- **Performance budget**: < 150 KB per page, LCP < 1.5s

## 6. File Structure Conventions

```
CRYPTOCALK/
├── src/
│   ├── components/       # Reusable React (.tsx) and Astro (.astro) components
│   ├── layouts/           # Page layouts (Layout.astro)
│   ├── pages/             # Astro pages (file-based routing)
│   │   └── [lang]/        # i18n: /en/, /es/, /ru/, etc.
│   ├── styles/            # Global CSS and design tokens
│   ├── utils/             # Helper functions, API wrappers
│   └── data/              # Static data, calculator configs
├── public/                # Static assets (favicons, images)
├── AGENTS.md              # THIS FILE — agent instructions
├── CHANGELOG.md           # All changes log
└── astro.config.mjs       # Astro configuration
```

## 7. Code Quality Standards

- TypeScript for all React components (`.tsx`)
- Semantic HTML in Astro templates
- Meaningful `id` attributes on interactive elements (for testing)
- `alt` text on all images
- Accessibility: proper ARIA labels, keyboard navigation
- No `console.log` in production code
- Comments for non-obvious logic only

## 8. SEO Requirements

Every calculator page must include:
- Unique `<title>` and `<meta description>`
- Canonical URL
- Schema.org markup (`WebApplication` + `FAQPage`)
- `hreflang` tags for all language versions
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- 1500–2500 words of SEO content below the calculator

## 9. Localization Fix Plan (L10N)

> **STATUS**: In progress. Fixes are ordered by priority. Complete them sequentially. After each fix, run `npm run ci:check` and update CHANGELOG.md.

### Architecture Overview

Localized calculator pages are served via two path types:
1. **Individual pages**: `src/pages/[lang]/<slug>.astro` (e.g. `[lang]/profit-calculator.astro`)
2. **Dynamic catch-all**: `src/pages/[lang]/[...slug].astro` — generates localized slug URLs (e.g. `/ru/kalkulyator-pribyli-kripto/`)

Both use the shared template `src/components/LocalizedCalculatorPage.astro` which wraps:
- `src/layouts/Layout.astro` — base HTML shell (head, hreflang, OG, canonical)
- `src/i18n/utils.ts` — slug mapping, `getLocalizedCalculatorMeta()` for title/desc generation
- `src/i18n/translations.ts` — UI strings (header, footer, categories, nav labels)

### Current Problems

| # | Problem | File | Severity |
|---|---------|------|----------|
| L1 | Breadcrumb shows EN title on all languages | `LocalizedCalculatorPage.astro:270` | Low |
| L2 | Title/description generated from transliterated slug (gibberish) | `i18n/utils.ts:393-426` `getLocalizedCalculatorMeta()` | High |
| L3 | Default FAQ (6 items) hardcoded in English | `LocalizedCalculatorPage.astro:90-115` | Medium |
| L4 | SEO body text (10 paragraphs, ~2000 words) hardcoded in English | `LocalizedCalculatorPage.astro:289-465` | High |
| L5 | React calculator component UI labels all in English | All 64 `src/components/*.tsx` | Optional |

### Fix L1 — Breadcrumb (5 min)

**File**: `src/components/LocalizedCalculatorPage.astro`

**Line ~270**, change:
```astro
<a href={pagePath} aria-current="page">{title}</a>
```
to:
```astro
<a href={pagePath} aria-current="page">{localizedTitle}</a>
```

`localizedTitle` is already computed on line 32 from `getLocalizedCalculatorMeta()`. This change makes the breadcrumb display the localized name instead of the English title.

**Status**: [x] DONE (2026-02-24)

---

### Fix L2 — Title & Description Generation (Medium effort)

**Problem**: `getLocalizedCalculatorMeta()` in `src/i18n/utils.ts` line 393 calls `titleCaseFromSlug()` on the localized slug, producing gibberish like "Калькулятор Kalkulyator Pribyli Kripto".

**Solution**: Create a proper mapping of `slug → { title, description }` per language instead of deriving from slug text.

**File to modify**: `src/i18n/utils.ts`

**Steps**:
1. Create a new data structure `CALCULATOR_META` of type `Record<Lang, Record<SpecCalculatorSlug, { title: string; description: string }>>` — either in `utils.ts` or a new file `src/i18n/calculator-meta.ts`.
2. For English, titles are already defined in `[...slug].astro` `ALIAS_DEFINITIONS` (line 67). Reuse or duplicate.
3. For each of the 5 non-EN languages, provide proper human-quality titles and descriptions for all 51 calculator slugs. These should be **native-language names**, not transliterations. Example:
   - `profit-calculator` → ES: `{ title: "Calculadora de Ganancias Cripto", description: "Calcula tus ganancias y pérdidas..." }`
   - `profit-calculator` → RU: `{ title: "Калькулятор прибыли криптовалют", description: "Рассчитайте прибыль и убытки..." }`
4. Replace `getLocalizedCalculatorMeta()` body to look up from `CALCULATOR_META[lang][slug]` instead of using `titleCaseFromSlug`.
5. Fallback chain: `CALCULATOR_META[lang][slug]` → `CALCULATOR_META['en'][slug]` → current `titleCaseFromSlug` behavior.

**Volume**: 51 slugs × 5 languages = 255 title+description pairs.

**Status**: [x] DONE (2026-02-24)

---

### Fix L3 — Default FAQ Translation (Medium effort)

**File**: `src/components/LocalizedCalculatorPage.astro`

**Current code** (lines 90-115): `defaultFaq` array has 6 items in English.

**Steps**:
1. Create a `defaultFaqByLang` object of type `Record<Lang, FaqItem[]>` with 6 FAQ items per language.
2. The FAQ items are generic (how does it work, how accurate, can beginners use, data storage, real trades, related tools). Translate these 6 items into es, pt, tr, hi, ru.
3. Replace line 117: `const faqItems = faq.length ? faq : defaultFaq;` with:
   ```ts
   const faqItems = faq.length ? faq : (defaultFaqByLang[lang] || defaultFaqByLang.en);
   ```
4. The `{title}` interpolation in FAQ answers should use `localizedTitle` instead.

**Volume**: 6 FAQ items × 5 languages = 30 Q+A translations.

**Status**: [x] DONE (2026-02-24)

---

### Fix L4 — SEO Body Text Translation (High effort)

**File**: `src/components/LocalizedCalculatorPage.astro`

**Current code** (lines 289-465): 10 sections of generic SEO text, all in English. Headings (`h.how`, `h.inputs`, etc.) are already translated; only the `<p>` body text is not.

**Steps**:
1. Create a new file `src/i18n/seo-body-text.ts` exporting `seoBodyText` of type:
   ```ts
   Record<Lang, {
     how: string[];        // 2 paragraphs
     inputs: string[];     // 2 paragraphs
     interpret: string[];  // 2 paragraphs
     scenarios: string[];  // 2 paragraphs
     checklist: string[];  // 2 paragraphs
     mistakes: string[];   // 2 paragraphs
     benchmarks: string[]; // 2 paragraphs
     execution: string[];  // 2 paragraphs
     hygiene: string[];    // 2 paragraphs
     validation: string[]; // 2 paragraphs
   }>
   ```
2. Each section has exactly 2 paragraphs. Total: 20 paragraphs × 6 languages.
3. English text is already written inline — extract it into the data file first.
4. Translate for es, pt, tr, hi, ru. Keep same tone: professional, practical, action-oriented.
5. In `LocalizedCalculatorPage.astro`, import `seoBodyText` and replace inline `<p>` tags with:
   ```astro
   const body = seoBodyText[lang] || seoBodyText.en;
   ---
   <h2>{h.how}</h2>
   {body.how.map((p) => <p>{p}</p>)}
   ```
6. Similarly replace the `{title}` interpolations in SEO text with `localizedTitle`.

**Volume**: 20 paragraphs × 5 languages = 100 paragraph translations (~10,000 words total).

**Status**: [x] DONE (2026-02-24)

---

### Fix L5 — React Component UI Labels (Optional / Deferred)

**Scope**: All 64 React calculator components in `src/components/*.tsx`.

**Current state**: Every component has all UI strings (button labels, input labels, result headers, empty-state messages, disclaimers) hardcoded in English. No `lang` prop exists.

**Decision**: For tech/finance calculator tools, **English UI is an acceptable industry norm** (Bloomberg, TradingView, CoinGecko all use English UI globally). This fix is optional and can be deferred.

**If implementing**:
1. Add a `lang?: string` prop to each calculator component.
2. Create a per-component or shared `ui-strings.ts` dictionary.
3. Replace all hardcoded strings with dictionary lookups.
4. Pass `lang` from the Astro page: `<ProfitCalculator client:load lang={lang} />`.
5. Estimate: ~50-100 UI strings per component × 64 components × 5 languages.

**Status**: [x] DONE (2026-02-24) — Implemented via Hybrid Model (Outputs localized, Inputs in EN).

---

### Verification After Each Fix

```bash
npm run ci:check    # build + verify:slug-migration + verify:localized-styles
```

Expected: 736 pages, 0 errors, all verifications pass.

Also spot-check a built page:
```bash
# Check Russian profit calculator title:
grep '<title>' dist/ru/kalkulyator-pribyli-kripto/index.html
# Should show proper Russian title, NOT "Калькулятор Kalkulyator Pribyli Kripto"
```

---

*Last updated: 2026-02-24*
*Project owner: Konstantin*
