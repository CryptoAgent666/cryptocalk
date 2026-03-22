# Schema.org Structured Data Audit Report

**Site:** cryptocalk.com
**Date:** 2026-03-22
**Pages audited:** 6 (homepage, 2 EN calculators, about, 1 ES calculator, 1 category hub)
**Total site pages:** ~935 across 6 languages (en, es, pt, tr, hi, ru)

---

## Overall Score: 82 / 100

**Strengths:** Consistent JSON-LD across all pages, no Microdata/RDFa mixing, correct `@context`, all URLs absolute, good coverage of BreadcrumbList/WebApplication/FAQPage/Organization.
**Weaknesses:** Missing WebPage on calculator pages, static `dateModified` on EN pages, Organization logo uses SVG (not Google-recommended format), no `aggregateRating` or review signals, homepage missing BreadcrumbList for completeness.

---

## 1. Detection Summary

| Page | JSON-LD Blocks | @types Found |
|------|---------------|--------------|
| Homepage (`/`) | 1 block (array of 4) | WebSite, Organization, ItemList, WebApplication |
| Profit Calculator (`/profit-calculator`) | 3 blocks | BreadcrumbList, WebApplication, FAQPage |
| Mining Calculator (`/mining-calculator`) | 3 blocks | BreadcrumbList, WebApplication, FAQPage |
| About (`/about`) | 2 blocks | ProfilePage (with Person), BreadcrumbList |
| ES Profit (`/es/calculadora-beneficio-cripto/`) | 3 blocks | WebApplication, FAQPage, BreadcrumbList |
| Category Hub (`/calculators/profit-loss/`) | 1 block (array of 4) | CollectionPage, ItemList, FAQPage, BreadcrumbList |

**Format:** All pages use JSON-LD exclusively. No Microdata or RDFa detected on any page. This is the preferred format.

---

## 2. Per-Block Validation

### 2.1 Homepage (/)

#### Block: WebSite
| Check | Result |
|-------|--------|
| @context = "https://schema.org" | PASS |
| @type valid | PASS |
| name present | PASS |
| url present (absolute) | PASS |
| description present | PASS |
| inLanguage present | PASS |
| SearchAction present | PASS |
| SearchAction target.urlTemplate | PASS |
| query-input format | PASS |

**Verdict:** PASS. Well-structured. SearchAction enables Sitelinks Search Box eligibility.

#### Block: Organization
| Check | Result | Note |
|-------|--------|------|
| @context | PASS | |
| @type | PASS | |
| name | PASS | |
| url (absolute) | PASS | |
| logo (ImageObject) | PASS | Uses favicon.svg |
| logo format | WARNING | Google recommends raster formats (PNG/JPG), min 112x112px. SVG may not render in search results. |
| logo width/height | INFO | 200x200 declared, but SVG is resolution-independent |
| email | PASS | |
| sameAs (array) | PASS | 3 profiles (X, GitHub, LinkedIn) |
| contactPoint | PASS | |
| contactPoint.contactType | PASS | "customer support" |
| contactPoint.availableLanguage | PASS | 6 languages |

**Verdict:** PASS with warning. Logo should ideally be a PNG/JPG file for guaranteed Google rendering.

#### Block: ItemList
| Check | Result |
|-------|--------|
| @context | PASS |
| @type | PASS |
| name | PASS |
| numberOfItems matches array length | PASS (12 = 12) |
| All ListItems have position + name + url | PASS |
| All URLs absolute | PASS |

**Verdict:** PASS. Clean implementation.

#### Block: WebApplication
| Check | Result |
|-------|--------|
| @context | PASS |
| @type | PASS |
| name | PASS |
| url (absolute) | PASS |
| applicationCategory | PASS ("FinanceApplication") |
| operatingSystem | PASS |
| description | PASS |
| inLanguage | PASS |
| offers.price | PASS ("0") |
| offers.priceCurrency | PASS ("USD") |
| author (Person) | PASS |
| datePublished | MISSING |
| dateModified | MISSING |

**Verdict:** PASS. Missing datePublished/dateModified is non-critical for WebApplication but recommended for freshness signals.

---

### 2.2 Profit Calculator (/profit-calculator)

#### Block: BreadcrumbList
| Check | Result |
|-------|--------|
| @context | PASS |
| 3-level hierarchy (Home > Category > Page) | PASS |
| All ListItems have position + name + item | PASS |
| All URLs absolute with trailing slash | PASS |
| Positions sequential (1, 2, 3) | PASS |

**Verdict:** PASS. Correct 3-level breadcrumb.

#### Block: WebApplication
| Check | Result | Note |
|-------|--------|------|
| @context | PASS | |
| @type | PASS | |
| name | PASS | |
| url (absolute, trailing slash) | PASS | |
| applicationCategory | PASS | |
| operatingSystem | PASS | |
| offers | PASS | |
| description | PASS | |
| datePublished | PASS | "2025-11-01" (ISO 8601) |
| dateModified | WARNING | "2026-03-09" is hardcoded in source. Should be dynamic build date like localized pages. |
| author (Person with url) | PASS | |

**Verdict:** PASS with warning. dateModified is static/stale on EN pages (hardcoded in .astro source), while localized pages correctly use `new Date().toISOString().split('T')[0]`.

#### Block: FAQPage
| Check | Result |
|-------|--------|
| @context | PASS |
| @type | PASS |
| mainEntity array | PASS (6 questions) |
| All Question + Answer types correct | PASS |
| No placeholder text | PASS |
| Content quality (specific, keyword-rich) | PASS |

**Verdict:** PASS. Note: FAQPage rich results are restricted to government/healthcare sites since August 2023. However, keeping FAQPage schema is valid for AI/LLM citation discovery (GEO value). No action needed.

---

### 2.3 Mining Calculator (/mining-calculator)

Same structure as Profit Calculator. All checks PASS with the same dateModified warning (hardcoded "2026-03-09").

---

### 2.4 About Page (/about)

#### Block: ProfilePage
| Check | Result |
|-------|--------|
| @context | PASS |
| @type | PASS (ProfilePage) |
| name | PASS |
| description | PASS |
| url (absolute) | PASS |
| inLanguage | PASS |
| dateModified | PASS ("2026-03-18", ISO 8601) |
| mainEntity (@type Person) | PASS |
| Person.@id | PASS (fragment identifier) |
| Person.name | PASS |
| Person.jobTitle | PASS |
| Person.description | PASS |
| Person.url | PASS |
| Person.image (absolute URL) | PASS |
| Person.sameAs (3 profiles) | PASS |
| Person.worksFor (Organization) | PASS |
| Person.knowsAbout (array) | PASS |

**Verdict:** PASS. Excellent ProfilePage + Person implementation. Supports E-E-A-T signals.

#### Block: BreadcrumbList
| Check | Result |
|-------|--------|
| 2-level hierarchy (Home > About) | PASS |
| All properties present | PASS |

**Verdict:** PASS.

---

### 2.5 Spanish Profit Calculator (/es/calculadora-beneficio-cripto/)

#### Block: WebApplication
| Check | Result |
|-------|--------|
| @context | PASS |
| name (Spanish) | PASS |
| description (Spanish) | PASS |
| inLanguage | PASS ("es") |
| url (absolute, correct localized path) | PASS |
| dateModified | PASS ("2026-03-22", dynamic build date) |
| operatingSystem | INFO | "Web" (vs "All" on EN pages) -- inconsistency |
| author | PASS |

**Verdict:** PASS. Dynamic dateModified is better than EN pages' static date.

#### Block: FAQPage
| Check | Result |
|-------|--------|
| 6 Spanish questions | PASS |
| No English text leak | PASS |
| Proper Q&A structure | PASS |

**Verdict:** PASS.

#### Block: BreadcrumbList
| Check | Result |
|-------|--------|
| 3-level (CryptoCalk > Ganancias y Perdidas > Calculator) | PASS |
| URLs correctly localized | PASS |

**Verdict:** PASS.

---

### 2.6 Category Hub (/calculators/profit-loss/)

#### Block: CollectionPage
| Check | Result |
|-------|--------|
| @context | PASS |
| @type | PASS |
| name | PASS |
| description | PASS |
| url | PASS |
| inLanguage | PASS |
| isPartOf (WebSite) | PASS |
| dateModified | MISSING |

**Verdict:** PASS. Missing dateModified is minor but recommended.

#### Block: ItemList
| Check | Result |
|-------|--------|
| numberOfItems matches array | PASS (8 = 8) |
| itemListOrder | PASS |
| All ListItems correct | PASS |

**Verdict:** PASS.

#### Block: FAQPage
| Check | Result |
|-------|--------|
| 3 questions | PASS |
| Structure correct | PASS |

**Verdict:** PASS. Same GEO-value note as calculator FAQPage.

#### Block: BreadcrumbList
| Check | Result |
|-------|--------|
| 2-level (Home > Category) | PASS |

**Verdict:** PASS.

---

## 3. Issues Found (Prioritized)

### Critical (blocks rich results or causes validation errors)
None found. All schema blocks are structurally valid.

### High Priority (recommended for better search visibility)

| # | Issue | Affected Pages | Recommendation |
|---|-------|----------------|----------------|
| H1 | **EN calculator dateModified is hardcoded** | ~69 EN calculator .astro pages | EN pages use static `"2026-03-09"` while localized pages dynamically generate the build date. Stale dateModified can signal abandoned content. Use same `new Date().toISOString().split('T')[0]` approach or a build-time variable. |
| H2 | **Organization logo is SVG** | Homepage | Google's logo guidelines recommend raster images (PNG, JPG, WebP) at minimum 112x112px. SVG may not render in Knowledge Panel. Add a PNG version of the logo. |
| H3 | **Missing WebPage schema on calculator pages** | ~935 calculator pages | Calculator pages have WebApplication but no WebPage (or subtype). Adding WebPage with `speakable` property improves voice search and AI assistant eligibility. |

### Medium Priority (improves completeness and signals)

| # | Issue | Affected Pages | Recommendation |
|---|-------|----------------|----------------|
| M1 | **operatingSystem inconsistency** | All calculator pages | EN pages use `"All"`, localized pages use `"Web"`. Should be consistent. `"All"` is more accurate for a web app. |
| M2 | **Homepage missing dateModified/datePublished on WebApplication** | Homepage | Add dates for freshness signals. |
| M3 | **Category hub missing dateModified on CollectionPage** | 8 category hub pages | Add `dateModified` to CollectionPage schema. Already has `LAST_UPDATED` constant in source. |
| M4 | **No @id cross-references** | All pages | Using `@id` on Organization and WebSite schemas enables cross-referencing across pages (e.g., calculator author references Organization by @id). |

### Low Priority / Info

| # | Issue | Affected Pages | Recommendation |
|---|-------|----------------|----------------|
| L1 | **FAQPage on commercial site** | ~935+ pages | Google restricted FAQ rich results for commercial sites (Aug 2023). Current implementation is retained for GEO/AI citation value. No change needed unless schema maintenance becomes burdensome. |
| L2 | **No AggregateRating on WebApplication** | All calculator pages | If user ratings are collected in future, add AggregateRating. Not actionable now. |
| L3 | **Homepage BreadcrumbList missing** | Homepage | Single-item breadcrumbs are optional per Google. Not a real issue. |

---

## 4. Missing Schema Opportunities

### 4.1 WebPage on Calculator Pages (High Value)

Calculator pages currently have WebApplication + BreadcrumbList + FAQPage but lack a WebPage schema. Adding WebPage with the `speakable` property marks key content sections for Google Assistant and voice search.

**See:** `generated-schema.json` -- Template: "calculator-webpage"

### 4.2 SiteNavigationElement on Homepage (Medium Value)

The homepage has 8 category hubs. A `SiteNavigationElement` schema helps search engines understand site architecture.

**See:** `generated-schema.json` -- Template: "site-navigation"

### 4.3 Organization @id Pattern (Medium Value)

Using `@id` on the Organization schema (homepage) and referencing it from calculator pages via `publisher` creates a connected entity graph without duplicating Organization data on every page.

**See:** `generated-schema.json` -- Template: "organization-with-id"

---

## 5. Schema Coverage Matrix

| Schema Type | Homepage | EN Calcs | Localized Calcs | Category Hubs | About |
|-------------|----------|----------|-----------------|---------------|-------|
| WebSite | Yes | -- | -- | -- | -- |
| Organization | Yes | -- | -- | -- | -- |
| WebApplication | Yes | Yes | Yes | -- | -- |
| WebPage | -- | -- | -- | -- | -- |
| BreadcrumbList | -- | Yes | Yes | Yes | Yes |
| FAQPage | -- | Yes | Yes | Yes | -- |
| ItemList | Yes | -- | -- | Yes | -- |
| CollectionPage | -- | -- | -- | Yes | -- |
| ProfilePage + Person | -- | -- | -- | -- | Yes |
| SearchAction | Yes | -- | -- | -- | -- |

---

## 6. Recommendations Summary

1. **Make EN calculator dateModified dynamic** -- Match the localized page approach. Single-line fix per page or refactor to use a shared constant.
2. **Add PNG logo alongside SVG** -- Create a 200x200 PNG and reference it in Organization schema.
3. **Add WebPage schema to calculator pages** -- Use the template in `generated-schema.json`. Can be added to Layout.astro for EN pages and LocalizedCalculatorPage.astro for localized pages.
4. **Standardize operatingSystem to "All"** -- One-line change in LocalizedCalculatorPage.astro.
5. **Add dateModified to category CollectionPage** -- Wire existing `LAST_UPDATED` constant into schema.
6. **Add @id to Organization and use publisher references** -- Enables entity graph across pages.

---

## 7. What NOT to Add

- **HowTo**: Deprecated September 2023. Do not add.
- **SpecialAnnouncement**: Deprecated July 31, 2025. Do not add.
- **CourseInfo / EstimatedSalary / LearningVideo**: Retired June 2025. Do not add.
- **New FAQPage on non-healthcare/government pages**: No Google rich result benefit. Existing FAQPage is fine for GEO but do not invest in expanding it.
