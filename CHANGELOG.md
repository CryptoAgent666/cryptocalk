# Changelog — CryptoCalk

All notable changes to this project are documented here.

## [2026-03-18] (update 21) — Contextual internal links in calculator-seo-ext.ts EN sections

### Added
- **Contextual internal links in calculator-seo-ext.ts EN section**: Added 2-3 HTML anchor links per calculator entry across 32 calculator EN sections in the extended SEO content file. Total: 62 new internal links targeting 18 high-value calculator pages (profit, DCA, mining, tax, staking, converter, liquidation, position-size, impermanent-loss, gas, break-even, risk-reward, ROI, margin, TP/SL, funding-rate, halving, what-if, electricity-cost). Links are contextually relevant with descriptive anchor text, naturally placed within the existing content, spread across different sections (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation). No calculator links to itself. EN sections only — localized content untouched. Build verified: 754 pages, no errors.

### Calculators with new internal links (32 total)
converter, profit-calculator, mining-calculator, dca-calculator, tax-calculator, what-if, position-size-calculator, liquidation-calculator, staking-calculator, gas-calculator, break-even-calculator, funding-rate-calculator, tp-sl-calculator, margin-calculator, risk-reward-calculator, impermanent-loss-calculator, roi-calculator, halving-calculator, apy-apr-calculator, yield-farming-calculator, gpu-mining-calculator, asic-mining-calculator, mining-roi-calculator, electricity-cost-calculator, hodl-vs-trade, uniswap-calculator, pip-calculator, market-cap-calculator, vesting-calculator, difficulty-calculator, bridge-comparator, lending-calculator

## [2026-03-18] (update 20) — Custom FAQ for top 10 EN calculators

### Changed
- **profit-calculator.astro**: Replaced 6 generic FAQ Q&A pairs with search-targeted questions: "How much profit will I make if Bitcoin goes up 10%?", "How do I calculate my crypto profit and loss?", "What is a good ROI on crypto?", "Should I calculate profit before or after taxes?", "How do exchange fees affect my crypto profit?", "Can I calculate profit on short positions?". Updated both visible `<details>` FAQ and JSON-LD `FAQPage` schema.
- **mining-calculator.astro**: Replaced 6 FAQ pairs with 2026-relevant questions: "Is Bitcoin mining still profitable in 2026?", "How much does it cost to mine 1 Bitcoin?", "What is the best ASIC miner to buy right now?", "How much electricity does a Bitcoin miner use per month?", "How long does it take to break even on a mining rig?", "What happens to mining profitability after the next halving?".
- **dca-calculator.astro**: Replaced 6 FAQ pairs with DCA-specific questions: "What if I had invested $100 per month in Bitcoin for the last 5 years?", "Is DCA better than buying crypto all at once?", "How much should I invest in crypto per month?", "Should I DCA daily, weekly, or monthly?", "When should I stop dollar-cost averaging?", "Does DCA work for Ethereum and altcoins too?".
- **tax-calculator.astro**: Replaced 6 FAQ pairs with tax-focused queries: "How much tax do I pay on crypto profits in the US?", "Do I have to pay taxes if I convert Bitcoin to Ethereum?", "Which countries have zero crypto tax?", "Can I deduct crypto losses from my taxes?", "Are staking rewards and airdrops taxable?", "What is the difference between FIFO and LIFO for crypto taxes?".
- **staking-calculator.astro**: Added `faq` prop with 6 custom Q&A pairs (previously used generic template FAQ): "How much can I earn staking crypto per year?", "Is crypto staking worth it in 2026?", "What is the difference between APY and APR in staking?", "Are staking rewards taxable income?", "What is validator commission and how does it affect my rewards?", "Can I lose money staking crypto?".
- **liquidation-calculator.astro**: Replaced 6 FAQ pairs with liquidation-specific queries: "At what price will my Bitcoin futures position get liquidated?", "What is the difference between isolated and cross margin liquidation?", "How do I avoid getting liquidated on Binance or Bybit?", "Does leverage change how much I can lose?", "Why was I liquidated even though my stop-loss was set?", "How much margin do I need for a $10,000 Bitcoin futures position?".
- **position-size-calculator.astro**: Replaced 6 FAQ pairs with position sizing queries: "How do I calculate the right position size for a crypto trade?", "What percentage of my account should I risk per trade?", "Does leverage increase my risk in crypto trading?", "What is a good risk-to-reward ratio for crypto trading?", "How do I size my position when trading volatile altcoins?", "Can I use the same position size for every trade?".
- **converter.astro**: Replaced 6 FAQ pairs with conversion queries: "How much is 1 Bitcoin worth in US dollars right now?", "How do I convert Bitcoin to my local currency?", "Why is the crypto price different on this converter vs my exchange?", "How many satoshis are in 1 Bitcoin?", "Can I use this to convert Ethereum to USD?", "Does this converter account for exchange fees when buying crypto?".
- **gas-fee-calculator.astro**: Replaced 6 FAQ pairs with gas fee queries: "How much does it cost to send Ethereum right now?", "Why is swapping tokens so much more expensive than a simple transfer?", "Which blockchain has the cheapest gas fees?", "What is the best time to make Ethereum transactions?", "What is Gwei and how does it relate to ETH?", "How do I save money on Ethereum gas fees?".
- **break-even-calculator.astro**: Replaced 6 FAQ pairs with break-even queries: "How much do I need to gain to recover from a 50% crypto loss?", "What is my break-even price if I bought Bitcoin at different prices?", "How much do trading fees add to my break-even price?", "Should I buy more crypto to lower my average price?", "Why is my portfolio down 80% but the coin only needs to 5x to recover?", "How do I calculate break-even after accounting for taxes?".

Total: 60 new FAQ Q&A pairs across 10 calculators (6 per page), all targeting real search queries with specific numbers and examples. Both visible HTML `<details>` sections and JSON-LD `FAQPage` structured data updated in sync. Build verified: 754 pages, no errors.

## [2026-03-18] (update 19) — Fix stale data references in calculator-seo-ext.ts

### Fixed
- **Bitcoin hashrate references**: Updated all 7 occurrences of "≈600 EH/s" to "≈800 EH/s" across EN + 5 localized sections (es, pt, tr, hi, ru) in hashrate-converter benchmarks. Also updated inline network share math example (600M TH/s -> 800M TH/s, solo mining estimate 28 -> 38 years).
- **ETH current-price references**: Replaced "$3,000/ETH" with "$2,300/ETH" in 6 EN sections (converter validation, gas-fee validation, unit-converter interpret/scenarios, gas benchmarks, node-calculator scenario) plus all localized equivalents. Recalculated dependent math: gas cost benchmarks (e.g., ETH transfer $1.26 -> $0.97), validator staking economics ($96K -> $73.6K for 32 ETH), unit-converter DeFi cost example ($4.50 -> $3.45/call).
- **BTC current-price reference**: Updated ASIC mining benchmark from "$60,000 BTC" to "$73,000 BTC" with adjusted profitability range ($8-15/day -> $10-18/day).
- **Stale year labels**: Changed "Typical lending parameters (2024)" to "(2026)" and "Reference hashrate units by coin/algorithm (2024)" to "(2026)" in EN section.
- **MEV benchmarks**: Added 2024-2025 context note ("with 2024-2025 estimates surpassing $900 million annually") to the 2023 MEV extraction benchmark in the MEV calculator section.

### Not changed (correctly historical)
- Halving calculator "$60,000/BTC" references (describe pre-2024 halving conditions)
- Pip-value "$60,000" (illustrative historical comparison)
- Tax calculator "$3,000" (taxable gain math, not ETH price)
- Hardware cost "$3,000 ASIC" and "$500-$3,000" ranges
- Exchange-fees "$3,000" trade size examples

## [2026-03-18] (update 18) — Localized FAQ for 11 risk/analytics calculators (ES/PT/TR/HI/RU)

### Added
- **src/i18n/calculator-faq.ts**: New file containing custom localized FAQ for 11 risk/analytics calculators (sharpe, sortino, calmar, treynor, information-ratio, kelly, var, drawdown, risk-of-ruin, slippage, trade-expectancy) across 5 non-EN languages (ES, PT, TR, HI, RU). Each calculator has 6 Q&A pairs per language targeting real search queries. Total: 330 localized Q&A pairs.
- **LocalizedCalculatorPage.astro**: Updated FAQ resolution logic to check `CALCULATOR_FAQ[slug][lang]` before falling back to generic template FAQ from `faq-dictionary.ts`. EN pages are unaffected (they pass FAQ inline via props). Localized pages (55 total: 11 calcs x 5 langs) now display calculator-specific FAQ instead of generic boilerplate.

## [2026-03-18] (update 17) — Brand titles and unique meta descriptions for all 51 calculators x 6 languages

### Changed
- **EN title branding (calculator-meta.ts)**: Appended " | CryptoCalk" to all 51 EN calculator titles. All titles verified under 60-character limit. Longest: "Compound Interest Calculator (Crypto) | CryptoCalk" (51 chars).
- **EN meta descriptions**: Already unique and specific — no changes needed.
- **ES meta descriptions**: Replaced 51 boilerplate "Herramienta gratuita: [Tool]. Calcula resultados al instante con supuestos transparentes..." descriptions with unique, calculator-specific descriptions in Spanish.
- **PT meta descriptions**: Replaced 51 boilerplate "Ferramenta gratuita: [Tool]. Calcule resultados em segundos com premissas claras..." descriptions with unique, calculator-specific descriptions in Portuguese.
- **TR meta descriptions**: Replaced 51 boilerplate "Ücretsiz araç: [Tool]. Şeffaf varsayımlar ve güncel piyasa verileriyle..." descriptions with unique, calculator-specific descriptions in Turkish.
- **HI meta descriptions**: Replaced 51 boilerplate "मुफ्त टूल: [Tool]। पारदर्शी मान्यताओं और अपडेटेड मार्केट डेटा..." descriptions with unique, calculator-specific descriptions in Hindi.
- **RU meta descriptions**: Replaced 51 boilerplate "Бесплатный инструмент: [Tool]. Считайте результаты мгновенно с прозрачными допущениями..." descriptions with unique, calculator-specific descriptions in Russian.

Total: 51 titles branded + 255 boilerplate descriptions replaced (51 x 5 languages) with unique, SEO-optimized descriptions specific to each calculator's function.

## [2026-03-18] (update 16) — Add htmlFor accessibility attributes to 10 calculator components

### Fixed
- **Form label accessibility across 10 calculators**: Added `htmlFor` attributes to 55 `<label>` elements, properly associating each label with its corresponding `<input>`, `<select>`, or `<textarea>` element via matching `id`. This enables screen readers to announce the correct label when an input receives focus and allows users to click the label text to focus the input. Calculators updated: ProfitCalculator (6 labels), DCACalculator (3), MiningCalculator (6), TaxCalculator (5), StakingRewardsCalculator (6), RoiCalculator (4), BreakEvenCalculator (7), LiquidationCalculator (5), PositionSizeCalculator (8), GasFeeCalculator (5). Labels for toggle-button groups (Position Type, Margin Type, etc.) were intentionally skipped since they control button groups rather than focusable inputs.

## [2026-03-18] (update 15) — Update year references in localized seo-ext sections

### Changed
- **calculator-seo-ext.ts**: Updated 27 benchmark year references from "(2024)" to "(2026)" across all 5 localized language sections (es, pt, tr, hi, ru). Categories updated: bridge cost benchmarks (ES, RU), lending parameters (all 5 langs), GPU mining benchmarks (all 5), ASIC mining benchmarks (all 5), electricity cost benchmarks (all 5), hashrate reference units (all 5), crypto salary adoption (all 5). Historical references (e.g. "2024 halving", timestamp examples) preserved unchanged.

## [2026-03-18] (update 14) — Comprehensive quality audit implementation

### Added
- **Skip-to-content accessibility link**: Added `<a href="#main-content" class="skip-to-content">` as first element in `<body>` (Layout.astro). Visually hidden, appears on focus for keyboard navigation. Added `id="main-content"` to all 44 `<main>` elements across all page templates.
- **Vitest testing infrastructure**: Added vitest 4.1 + @testing-library/react + jsdom. Created 32 tests covering ErrorBoundary component (6 tests) and core calculator math formulas (26 tests: ROI, break-even, DCA, compound interest, liquidation price, impermanent loss). Added `npm run test` and `npm run test:watch` scripts.
- **Environment variable support for API keys**: Created `.env` and `.env.example` with `PUBLIC_COINGECKO_API_KEY` and `PUBLIC_CRYPTOCOMPARE_API_KEY`. Updated `cryptoPriceService.ts` to use `import.meta.env` with hardcoded fallbacks for zero-downtime migration.

### Changed
- **Sitemap lastmod removed**: Removed `serialize` function from astro.config.mjs that was setting identical `lastmod` dates on all 1,147 URLs (actively harmful for SEO). Astro now generates sitemap without misleading lastmod, which is better per Google's crawl efficiency guidelines.

## [2026-03-18] (update 11) — Fix TypeScript `any` types across 20 files

### Fixed
- **TypeScript strict typing in cryptoPriceService.ts**: Replaced 3 `any` annotations with proper inline types for CryptoCompare (`{ close: number; time: number }`) and CoinCap (`{ time: number; priceUsd: string }`) API response entries.
- **TypeScript strict typing in 16 calculator components**: Replaced `(c: any)` with `(c: { id: string; name: string; symbol: string; thumb: string })` in CoinGecko search response mapping across DCACalculator, CryptoConverter, FundingRateCalculator, LeverageCalculator, LiquidationCalculator, MarginCalculator, MarketCapCalculator, MarketCapComparator, PipCalculator, PositionSizeCalculator, ProfitCalculator, ReverseRoiCalculator, StakingRewardsCalculator, TpSlCalculator, ImpermanentLossCalculator, AirdropCalculator.
- **DCACalculator.tsx**: Changed event handler `(e: any)` to `(e: React.MouseEvent)`.
- **WhatIfCalculator.tsx**: Changed `(_: any, i: number)` to `(_: [number, number], i: number)` in chart price filter.
- **AsicMiningCalculator.tsx**: Replaced `as any` with typed inline interface `{ difficulty24?: number; difficulty?: number; block_reward24?: number; block_reward?: number; exchange_rate: number }`.
- **GpuMiningCalculator.tsx**: Replaced `as any` with typed inline interface `{ nethash?: number; block_reward24?: number; block_reward?: number; exchange_rate: number }`.

## [2026-03-18] (update 10) — Update stale year references in SEO content

### Changed
- **calculator-seo-ext.ts**: Updated 7 year references: Tax Calculator "2024" → "2025" (current tax year), Bridge Cost "2024" → "2026", GPU Mining "2024" → "2026" (2 instances), ASIC Mining "2024" → "2026", Mining Electricity "2024" → "2026", Crypto Salary "2024" → "2026".
- **ui-strings.ts**: Updated UK CGT exemption year from "(2024/25)" to "(2025/26)" across all 5 localized language sections (es, pt, tr, hi, ru) — 10 string occurrences total (key + value per language).

## [2026-03-18] (update 9) — Descriptive alt text on coin thumbnail images

### Fixed
- **Accessibility: coin thumbnail alt attributes across 17 calculator components (20 instances)**: Replaced empty `alt=""` with descriptive `alt={coin.name}` (or equivalent variable) on all coin thumbnail `<img>` elements in dropdown suggestion lists. Affected files: PipCalculator, DCACalculator, LeverageCalculator, CryptoConverter (2), PositionSizeCalculator, TpSlCalculator, MarginCalculator, ProfitCalculator, StakingRewardsCalculator, WhatIfCalculator, MarketCapComparator (2), ReverseRoiCalculator, ImpermanentLossCalculator (2), FundingRateCalculator, LiquidationCalculator, MarketCapCalculator, AirdropCalculator. Improves screen reader support and image SEO.

## [2026-03-18] (update 8) — ErrorBoundary wrapping for all calculators

### Added
- **ErrorBoundary HOC wrapping on all 64 calculator components**: Each calculator is now wrapped with `withErrorBoundary()` HOC from `ErrorBoundary.tsx`. If a calculator throws a runtime error during rendering, users see a friendly "Something went wrong" message with a Reload button instead of a white screen. Affected: all Calculator, Comparator, and Converter `.tsx` components. Non-calculator components (ThemeToggle, LanguageSwitcher) are excluded. Build verified: 754 pages, no errors.

## [2026-03-18] (update 7) — Calculator defaults refresh to March 2026

### Fixed
- **Mining**: BTC difficulty 100T→145T (+45%), price fallback→$73,700, added S21 Pro (234 TH/s), removed phantom S21 XP
- **ASIC Mining**: difficulty 85T→145T (+70%), price→$73,700, added S21 Pro
- **Gas Fee**: ETH gas 15→1 gwei (post-Dencun reality), ETH price $3,000→$2,327, BNB→$580, AVAX→$30
- **Tax**: UK CGT 10%/20%→18%/24% (Oct 2024 Budget), Canada 66.67% inclusion for gains >$250K (Jan 2026)
- **NFT**: removed X2Y2 (dead Apr 2025), OpenSea 2.5%→1%, LooksRare 2%→0.5%, gas $10-40→$1-10
- **Staking**: ATOM APY 18%→13%, ETH APY 3.5%→3.2%, SOL scenario $150→$95
- **Halving**: priceAfter18m filled ($126K Oct 2025 ATH), hashrate 700→800 EH/s
- **Profit**: BTC scenario $50K→$65K, ETH $3,500→$2,300
- **Leverage**: entry price $65K→$73K
- **Bridge**: ETH gas $4.50→$0.50, added Solana chain

## [2026-03-18] (update 6) — Localized category hub body copy

### Added
- **Localized bodyCopy for 40 category hub pages**: 8 categories × 5 languages (es, pt, tr, hi, ru), 3 paragraphs each. Previously these pages had no body prose, making them thinner than EN versions.

## [2026-03-18] (update 5) — FAQ, internal links, OG images

### Added
- **Custom FAQ for 11 risk calculators**: 6 keyword-rich Q&A per page replacing generic template FAQ
- **20 contextual internal links in seo-body-text.ts**: 2 per section across 10 EN generic sections
- **7 internal links in About page**: staking, tax, DCA, liquidation, mining, profit, converter
- **10 per-calculator OG images**: unique 1200x630 PNGs for top-10 calcs. Layout.astro auto-selects per-page image when available, falls back to default.

## [2026-03-18] (update 4) — Risk calculator unique content

### Added
- **Unique SEO content for 11 risk calculators**: calculator-seo-content.ts entries for Sharpe, Sortino, Calmar, Treynor, Information Ratio, Kelly, VaR, Drawdown, Risk of Ruin, Slippage, Trade Expectancy. All 6 languages, specific formulas and thresholds.

## [2026-03-18] (update 3) — Title + meta description SEO fixes

### Fixed
- **27 EN title tags shortened to < 60 chars**: Dropped secondary descriptors, standardized ` | CryptoCalk` separator. Longest: 48 chars. Previously 27 titles exceeded 60 chars (worst: 77).
- **51 boilerplate meta descriptions replaced**: All generic "Calculate crypto outcomes instantly with transparent assumptions..." patterns in `calculator-meta.ts` replaced with unique, keyword-rich descriptions per calculator. Each starts with "Free", includes the tool name, and describes specific functionality.

## [2026-03-18] (update 2) — SEO audit Phase 1+2 technical fixes

### Fixed
- **BreadcrumbList 2→3 levels on ~35 EN pages**: Home → Category → Calculator. Uses calculator-category-map lookup.
- **Sitemap `<lastmod>`**: All 1154 URLs now include modification date via serialize callback.
- **`twitter:site` / `twitter:creator`**: Added @yakovlevka3 on all pages.
- **Homepage H1**: "The Smartest Crypto Calculator Hub" → "50+ Free Crypto Calculators".
- **Category hub H1**: Now appends "Calculators" in all languages (e.g., "Investment Calculators").
- **About page BreadcrumbList**: Added Home → About schema. Updated dateModified.

## [2026-03-18] — Content quality audit fixes

### Fixed
- **About page rewrite**: Removed "Vibecoder" title — replaced with "Founder & Lead Developer". Expanded from ~300 words to ~1000 words with four new sections: Mission (3 paragraphs), Meet the Creator (verifiable credentials, since-2017 crypto experience, zanimaem.kz/calk.kz track record), How We Build Our Calculators (formula verification, real-time data, edge case testing, regular audits), and Why Trust CryptoCalk (open formulas, client-side execution, no ads, no signups, 6 languages, regular updates). Strengthens E-E-A-T for YMYL compliance.
- **Localized About pages (5 languages)**: Replaced all vibecoder/vibecoding/вайбкодинг/वाइबकोडिंग references with professional developer terminology across ES, PT, TR, HI, RU. Updated role titles, bios, and highlight descriptions.
- **calculator-seo-ext.ts phantom keys**: Fixed 20 slug keys that did not match actual calculator-meta slugs (e.g., `'market-cap'` → `'market-cap-calculator'`, `'ico-roi'` → `'ico-roi-calculator'`). These entries were effectively dead code — the content existed but was never loaded. All 51 calculators now have unique overrides for 8 sections (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation) in all 6 languages.
- **Content parity**: Previously 20 of 51 calculators fell back to generic template text for 8 out of 10 SEO sections. Now all 51 × 6 = 306 localized calculator pages receive unique content.

### Changed
- `src/pages/about.astro` — full rewrite with methodology and trust sections
- `src/pages/[lang]/about.astro` — updated all 5 language content blocks
- `src/i18n/calculator-seo-ext.ts` — fixed 20 phantom keys, added missing calculator entries

## [2026-03-09] (update 10) — React hydration fix + dark mode FOUC

### Fixed
- **React Error #418 (hydration mismatch)**: Корневая причина — `ThemeToggle.tsx` вызывал `getInitialTheme()` прямо в `useState(getInitialTheme)`, что читало `localStorage` при инициализации. SSR рендерил `'light'` (нет `window`), а клиент при гидрации получал `'dark'` — несовпадение. **Фикс**: убрана функция `getInitialTheme`, начальное состояние всегда `'light'`, реальное значение считывается в `useEffect`. Ошибка устранена на всех 754 страницах.
- **Dark mode FOUC (Flash Of Unstyled Content)**: Скрипт инициализации темы был расположен в конце `<head>` после шрифтов, фавиконов и GA-скриптов. Браузер успевал отрисовать страницу в светлой теме до применения `data-theme`. **Фикс**: скрипт перенесён на самый верх `<head>` (сразу после `<meta viewport>`), обёрнут в try/catch. Тема применяется до парсинга CSS.

## [2026-03-09] (update 9) — AdSense readiness fixes

### Changed
- **A1 — Privacy Policy: Google Ads/AdSense раздел**: Расширен раздел 4 "Cookies and Tracking" — добавлено подробное описание Google Analytics, Google AdSense, DoubleClick cookies и ссылки на opt-out. Старый раздел с CoinGecko перемещён в новый раздел 4.
- **A2 — Privacy Policy: email контакт**: В разделе "Contact" теперь явно указан адрес `support@cryptocalk.com` и ссылка на форму.
- **A1/A2 — Privacy Policy: дополнительные разделы**: Добавлены разделы "Children's Privacy", "Your Rights", "Changes to This Policy". Дата last updated обновлена до 09/03/2026.
- **A3 — 404: SiteFooter**: Добавлены импорт и рендер `<SiteFooter lang="en" />` на странице 404 для консистентной навигации.
- **A4 — Footer: Methodology ссылка**: В колонку "Trust & Legal" добавлена ссылка на `/methodology/` (`t.methodologyPolicy`).
- **A5 — Organization Schema: email**: В `organizationSchema` на `index.astro` добавлены поля `email` и `logo`. В `contactPoint` добавлен `email`.
- **A7 — Cookie Consent Banner (CMP)**: Полностью переписан `src/components/CookieBanner.astro` с поддержкой 6 языков, accept/decline кнопок, анимации slide-in/out. В `Layout.astro` добавлены consent defaults (`ad_storage: denied`) перед загрузкой GA — AdSense CMP compliance. Согласие сохраняется в `localStorage` и восстанавливается мгновенно при следующей загрузке страницы.

### Added
- Consent mode v2 defaults в `Layout.astro` (блокирует рекламные cookies до согласия пользователя).

## [2026-03-09] (update 8)

### Changed
- **N1 — Related заголовок обёрнут условием**: `<h2>Related</h2>` теперь не рендерится если нет ни related-ссылок, ни хаба категории.
- **N2 — FAQ/Related в систему has()**: Секции FAQ и Related теперь контролируются через `calculator-sections.ts` наравне со всеми остальными 10 SEO-секциями. По умолчанию — включены.
- **N3 — ShareCalculator + mobile CSS в 35 custom EN страницах**: Добавлен импорт `ShareCalculator` + обёртка `.calc-scope`, добавлены mobile media queries, исправлен `<SiteFooter lang="en" />` с пропом `lang`.
- **N4 — Убран мёртвый код `typeof lang`**: Во всех 137 файлах заменён `typeof lang !== 'undefined' ? lang : 'en'` на `'en'` (для root-страниц) или `lang` (для `[lang]`-страниц).
- **N5 — Hub backlink текст в translations.ts**: Добавлен ключ `allCategoryCalculators` для всех 6 языков. Тернарный каскад в шаблоне заменён на `t.allCategoryCalculators.replace('{category}', categoryName)`.
- **N7 — CSS дедупликация**: Создан `src/styles/calculator-page.css` с ~200 строками общих стилей (header, breadcrumb, calculator-section, seo-content, mobile breakpoints). Импортируется из шаблона + 35 custom EN страниц. Удалено ~500 строк дублированного CSS из `LocalizedCalculatorPage.astro` и ~180 строк из каждой custom EN страницы.

### Added
- `src/styles/calculator-page.css` — единый файл общих стилей для всех калькуляторных страниц.
- `allCategoryCalculators` ключ в `src/i18n/translations.ts` для 6 языков.
- `faq` и `related` как управляемые секции в `src/data/calculator-sections.ts`.

## [2026-03-09] (update 7)

### Changed
- **D1 — Убран дублирующий Related блок**: Удалён inline "See also" callout из `LocalizedCalculatorPage.astro` и из 10 custom EN страниц. Related calculators теперь отображается единожды — в конце страницы в полном виде.
- **D2 — ShareCalculator перенесён после калькулятора**: В `LocalizedCalculatorPage.astro` `<ShareCalculator>` теперь рендерится после `<slot name="calculator">`, а не до. Пользователь сначала пользуется инструментом, потом делится результатом.
- **D3 — Мобильный UX: уменьшен padding**: `calculator-section` padding снижен с 40px до 28px (десктоп) и 16px (мобиль). `calc-header` на мобиле выровнен по левому краю. Калькулятор теперь виден выше на смартфонах без скролла.
- **D4 — CategoryHubPage: карточки на мобиле, таблица на десктопе**: Убрано дублирование списка инструментов. `tools-mobile` (grid карточек) показывается при ширине < 860px; `tools-desktop` (таблица) — при ≥ 860px. Два варианта дополняют, а не дублируют друг друга.
- **D5 — headingMap использует localizedTitle**: Переработан в функцию `buildHeadings(localizedTitle, lang)`. Заголовок "How to use [Calculator Name]" теперь содержит локализованное название для всех 6 языков, а не EN-строку из props.
- **D6 — Ограничение SEO-секций по типу калькулятора**: Создан `src/data/calculator-sections.ts` с маппингом `slug → active sections[]`. Конвертеры показывают 4 секции вместо 10; налоговые — 6; simple tools — 5; DeFi — 8-9. Устраняет near-duplicate content risk.

### Added
- `src/data/calculator-sections.ts` — конфигурация активных SEO-секций для 25+ калькуляторов.

## [2026-03-09] (update 6)

### Added
- **calculator-category-map.ts** — маппинг всех 60+ слагов калькуляторов на категорию хаба + локализованные названия категорий на 6 языках.
- **category-hub-body.ts** — уникальный SEO-текст (~600 слов, 5 параграфов) для каждого из 8 хабов категорий (en). Рендерится в `CategoryHubPage.astro` как prose-секция перед сеткой инструментов.
- **11 новых записей в related-calculators.ts** — кластер risk/performance analytics: sharpe, sortino, calmar, treynor, information-ratio, drawdown, var, risk-of-ruin, kelly, slippage, trade-expectancy.

### Changed
- **3-уровневый breadcrumb (Home → Категория → Калькулятор)**: Обновлён `LocalizedCalculatorPage.astro` (HTML breadcrumb + BreadcrumbList JSON-LD schema), обновлены 35 custom EN .astro страниц через Python-скрипт. BreadcrumbList schema стала 3-элементной для всех калькуляторных страниц.
- **Обратные ссылки на хаб**: В `LocalizedCalculatorPage.astro` добавлена ссылка "All [Category] calculators" после Related блока. В 28 custom EN страниц добавлен hub-backlink в Related секцию.
- **Контекстные "See also" ссылки**: В шаблоне добавлен inline callout с первыми 3 related calculators после секции "How to use". В топ-10 custom EN страниц (profit, dca, mining, staking, liquidation, position-size, tax, converter, roi, risk-reward) добавлены inline "See also" блоки.
- **Формат checklist/mistakes**: В `LocalizedCalculatorPage.astro` секция checklist рендерится как нумерованный `<ol>` с пронумерованными кружками, mistakes — как `<ul>` с предупреждающими иконками.
- **Таблица инструментов в хабах**: В `CategoryHubPage.astro` добавлена таблица всех инструментов категории с прямыми ссылками (дополняет существующую сетку карточек).

## [2026-03-09] (update 5)

### Changed
- **SEO F1 — BreadcrumbList + enriched WebApplication schema на 35 EN страницах**: Добавлен `pageType="calculator"` prop в `Layout.astro` для авто-генерации `BreadcrumbList` JSON-LD. Все 35 EN `.astro` калькуляторных страниц обновлены. Кроме того, в каждую inline `WebApplication` схему добавлены `datePublished: "2025-11-01"`, `dateModified: "2026-03-09"`, `author: Person`. Итог: все EN страницы теперь имеют 3 схемы (BreadcrumbList + WebApplication + FAQPage), совпадая с локализованными версиями.
- **SEO F3 — og:locale на всех страницах**: Добавлен `<meta property="og:locale">` в `Layout.astro` с маппингом lang→locale (en→en_US, es→es_ES, pt→pt_BR, tr→tr_TR, hi→hi_IN, ru→ru_RU). Охватывает все 754 страницы.
- **SEO F4 — twitter:title + twitter:description**: Добавлены `<meta name="twitter:title">` и `<meta name="twitter:description">` в `Layout.astro`. Улучшает отображение в X/Twitter при шеринге.
- **SEO F5 — Meta description главной сокращена**: С 174 до 126 символов. Было: "Free online cryptocurrency calculators: profit & loss, mining profitability, DCA simulator, tax estimator, staking rewards, and 45+ more tools. Fast, accurate, no signup." Стало: "Free crypto calculators: profit & loss, mining, DCA, tax, staking, and 45+ more tools. Fast, accurate, no signup required."
- **SEO F6 — Title страницы About улучшен**: С "About Us | CryptoCalk" (21 симв.) до "About CryptoCalk — Free Crypto Calculators by Konstantin Iakovlev" (65 симв.). Содержит ключевые слова, выделяется в SERP.

## [2026-03-09] (update 4)

### Added
- **SEO: Батч 4 завершён — уникальный контент для калькуляторов 42-51**: Добавлен контент в `src/i18n/calculator-seo-ext.ts` для `exchange-fees`, `portfolio-rebalancer`, `tax-calculator`, `dollar-cost-averaging`, `break-even`, `position-size`, `liquidation-price`, `nft-rarity-price`, `leverage-calculator`, `inflation-hedge`. Все 6 языков, 8 секций каждый. Сборка: 754 страницы, 0 ошибок.
- **SEO: Батч 3 — уникальный контент для калькуляторов 29-41**: Добавлен контент для `market-cap`, `fully-diluted-valuation`, `token-unlock`, `vesting-schedule`, `airdrop-value`, `ico-roi`, `token-distribution`, `token-gating-access`, `tokenomics-modeling`, `dao-voting-power`, `wallet-address-balance`, `transaction-fees`, `unit-converter`.

## [2026-03-09] (update 3)

### Added
- **SEO: Уникальный контент для оставшихся 8 секций (Вариант C)**: Создан файл `src/i18n/calculator-seo-ext.ts` с уникальным контентом для секций `interpret`, `scenarios`, `checklist`, `mistakes`, `benchmarks`, `execution`, `hygiene`, `validation` для каждого из 51 калькулятора во всех 6 языках. Контент объединяется в `LocalizedCalculatorPage.astro` через merge: `genericTxt → calcOverride → calcExtOverride`.
- **Инфраструктура merger**: Обновлён `LocalizedCalculatorPage.astro` для импорта `calculatorSeoExt` и применения трёхуровневого слияния текстов.

## [2026-03-09] (update 2)

### Added
- **SEO: Уникальный контент для всех 51 калькулятора в 6 языках**: Создан файл `src/i18n/calculator-seo-content.ts` (~267 KB) с уникальными параграфами `how` (2 абзаца) и `inputs` (2 абзаца) для каждого из 51 калькулятора на всех 6 языках (en, es, pt, tr, hi, ru). Итого: 51 × 6 × 4 = 1224 уникальных параграфа. Устраняет проблему дублированного контента на ~300 локализованных страницах.
- **Инфраструктура лукапа**: `LocalizedCalculatorPage.astro` обновлён для приоритетного использования контента из `calculatorSeoContent[slug][lang]` с fallback на `seoBodyText[lang]`. Non-EN страницы никогда не получают английский контент.

## [2026-03-09]

### Added
- **SEO: BreadcrumbList JSON-LD на всех страницах калькуляторов**: Добавлена схема `BreadcrumbList` в `LocalizedCalculatorPage.astro` (Home → Калькулятор). Обеспечивает rich results хлебных крошек во всех 6 языках.
- **SEO: Person + ProfilePage схема на странице About**: Заменили `WebPage` на `ProfilePage` с вложенной `Person`-сущностью (имя, должность, soialLinks, knowsAbout). Укрепляет E-E-A-T entity graph.

### Changed
- **SEO: WebApplication schema обогащена**: Добавлены `datePublished` (2025-11-01), `dateModified` (2026-03-09) и `author` (Person) во все 300+ локализованных страниц калькуляторов через `LocalizedCalculatorPage.astro`.
- **SEO: Title главной страницы сокращён**: С 69 до 44 символов (`CryptoCalk — 50+ Free Crypto Calculators`) — теперь не обрезается в SERP.
- **SEO: SearchAction-схема удалена с главной**: Схема `potentialAction: SearchAction` была некорректна (поиск клиентский, URL `?q=` не индексируется). Удалена во избежание ошибок в GSC.
- **Perf: Google Fonts загружается неблокирующе**: Заменён `<link rel="stylesheet">` на `<link rel="preload" as="style" onload=...>` с `<noscript>`-фолбеком. Устраняет render-blocking ресурс, улучшает LCP.
- **Perf: loading=lazy на все изображения**: Добавлен `loading="lazy"` и явные `width`/`height` на аватар автора (about.astro, [lang]/about.astro) и все миниатюры монет в 20+ компонентах калькуляторов.
- **Tech: robots.txt очищен от дублирующей ссылки**: Оставлена одна ссылка `sitemap-index.xml` вместо двух.

## [2026-03-06]

### Added
- **i18n: localized remaining hardcoded strings in 10 calculators**: Replaced ~80 hardcoded English strings with `getUiString(lang, ...)` calls in Airdrop, FundingRate, Liquidation, Margin, MarketCapComparator, PositionSize, Profit, ReverseRoi, StakingRewards, and TpSl calculators. Added ~230 new translations to `ui-strings.ts` (es, pt, tr, hi, ru) covering labels, placeholders, toggles, hints, and button text.

### Fixed
- **P0 — DCA Calculator broken**: Replaced hardcoded CoinGecko API call with `cryptoPriceService.ts` fallback chain (CoinGecko → CryptoCompare → CoinCap). Fixes 401 errors from expired demo API key.
- **P1 — Right-column truncation on mobile (S1)**: Fixed `.result-value` being clipped on 375px viewports across ~15 calculators. Applied `flex-shrink: 0` to values and `text-overflow: ellipsis` to labels so values are always visible.
- **P2 — Long/Short toggle "Short" text hidden (S3)**: Added `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis` and tighter padding to `.toggle-btn` on mobile.
- **P2 — What-If Calculator button & result truncated (S5)**: Shortened button text from "Calculate What If" to "Calculate"; added `word-break` and responsive `font-size` to `.whatif-hero-value` and `.whatif-stat` for mobile.
- **P2 — Homepage search shows "2 results" for mining (S8)**: Updated search result count to show total calculator count (including tools within categories) instead of card count.
- **P3 — Footer disclaimer not localized (S7)**: Replaced hardcoded English disclaimer in `SiteFooter.astro` with `t.footerDisclaimer`; added translations for all 6 languages.
- **P3 — Hint text truncation (S2)**: Added `-webkit-line-clamp: 2` to `.input-hint` on mobile to gracefully truncate with ellipsis.
- **P3 — Pill mask clipping (S4)**: Adjusted gradient mask from 90% to 92% black to show more of the last pill.

### Changed
- `src/components/DCACalculator.tsx` — imports and uses `getPriceChart()` from `cryptoPriceService.ts`
- `src/styles/global.css` — mobile `.result-row`, `.result-label`, `.result-value`, `.toggle-btn`, `.input-hint`, `.pills-row` overrides
- `src/pages/what-if.astro` — responsive hero value and stat sizing
- `src/components/WhatIfCalculator.tsx` — shorter Calculate button text
- `src/pages/index.astro` — search result counting logic
- `src/components/SiteFooter.astro` — uses `t.footerDisclaimer`
- `src/i18n/translations.ts` — added `footerDisclaimer` key for all 6 languages
- `src/components/{AirdropCalculator,FundingRateCalculator,LiquidationCalculator,MarginCalculator,MarketCapComparator,PositionSizeCalculator,ProfitCalculator,ReverseRoiCalculator,StakingRewardsCalculator,TpSlCalculator}.tsx` — replaced hardcoded English with `getUiString()` calls
- `src/i18n/ui-strings.ts` — added ~230 new string translations for 5 locales

## [2026-03-04]

### Added
- Created `src/utils/cryptoPriceService.ts` — unified crypto price service with automatic fallback chain:
  - **CoinGecko → CryptoCompare → CoinCap** for historical price, current price, and chart data
  - Smart routing: dates older than 365 days skip CoinGecko (free tier limitation) and try CryptoCompare first
  - ID mapping for 30+ popular cryptocurrencies across all three API providers
  - Graceful degradation: chart returns empty array if all providers fail; prices throw with descriptive error

### Changed
- Refactored `src/components/WhatIfCalculator.tsx` to use `cryptoPriceService` instead of direct CoinGecko API calls:
  - Historical and current price now fetched in parallel via `Promise.all` (performance improvement)
  - Quick Scenarios dating back to 2013 (BTC), 2015 (ETH), 2017 (BNB, ADA) now work via CryptoCompare fallback
  - Coin search still uses CoinGecko search endpoint directly (not affected by historical data limits)

### Fixed
- Improved mobile UX and reliability across all calculators:
  - Added `onFocus` auto-selection to all number inputs across all 62 calculator components to prevent input appending errors (e.g. Airdrop, Yield Farming, Mining, Converters, Risk tools, etc.).
  - Added graceful 429 Rate Limit error handling to the DCA Calculator API requests.
  - Added horizontal scroll indicators (padding and gradient mask) to the Quick Scenarios pills row on mobile to improve discoverability.

## [2026-02-26]

### Changed
- Standardized trailing-slash URL behavior for localized routing and canonical generation:
  - `src/i18n/utils.ts`
  - `src/components/SiteFooter.astro`
  - `src/components/LocalizedCalculatorPage.astro`
  - `src/pages/[lang]/index.astro`
- Rebuilt `src/pages/404.astro` into a branded CryptoCalk error experience:
  - removed inline-style placeholder markup;
  - added responsive hero-style card with branded lockup, gradient background, CTA actions, and quick links to core calculators;
  - preserved `noindex` behavior for the error page.
- Installed production Google Analytics tag ID `G-BVPMVV27NH` in the global layout head script:
  - `src/layouts/Layout.astro`
- Aligned internal page links to trailing-slash format across core EN calculator pages and homepage/navigation templates to reduce avoidable `301` hops.
- Updated redirect targets to trailing-slash canonical destinations:
  - `public/_redirects`
- Updated robots sitemap declaration to `/sitemap.xml`:
  - `public/robots.txt`
- Added immutable/static cache policies for built assets and hourly freshness for crawl files:
  - `public/_headers`

### Added
- Added sitemap compatibility output so `dist/sitemap.xml` is generated from `dist/sitemap-index.xml` during build:
  - `scripts/postbuild-platform-files.mjs`
- Added `WebPage` JSON-LD on trust pages (EN + localized):
  - `src/pages/about.astro`
  - `src/pages/contact.astro`
  - `src/pages/terms.astro`
  - `src/pages/[lang]/about.astro`
  - `src/pages/[lang]/contact.astro`
  - `src/pages/[lang]/terms.astro`

### Fixed
- Marked custom 404 page as non-indexable via layout prop:
  - `src/pages/404.astro`
- Localized cookie-policy link generation now follows language path + trailing slash:
  - `src/components/CookieBanner.astro`
  - `src/layouts/Layout.astro`
- Fixed localized style verification scope to skip non-calculator localized static pages (`about`, `contact`, `terms`) to keep CI checks aligned with their intended target set:
  - `scripts/verify-localized-styles.mjs`

## [2026-02-25]

### Changed
- Removed the global `ChangeNowWidget.astro` ("Exchange Crypto Instantly") from the calculator shell to simplify the UI and remove third-party iframes per owner request.
- Globally applied CoinGecko Demo API key (`REMOVED_COINGECKO_KEY`) as a query parameter (`x_cg_demo_api_key`) to all 22 calculator components to securely fetch market data and bypass 401 Unauthorized limits.

## [2026-02-24]

### Added
- Created `src/i18n/calculator-meta.ts` dictionary containing 255 native-language titles and localized descriptions for all 51 calculators across 5 locales (`es`, `pt`, `tr`, `hi`, `ru`).
- Created `src/i18n/faq-dictionary.ts` capturing 30 localized FAQ items for 5 non-English languages to support global trust and credibility.

### Changed
- `getLocalizedCalculatorMeta()` in `src/i18n/utils.ts` now uses O(1) property lookup from `CALCULATOR_META` instead of procedurally title-casing URL slugs. This fixes the SEO title grammar (L2 localization fix).
- Replaced hardcoded English `defaultFaq` array in `LocalizedCalculatorPage.astro` with dynamic dictionary queries matching the request locale, completing the L3 default FAQ translation task.
- Replaced the large block of English SEO body text in `LocalizedCalculatorPage.astro` with a dynamic 6-language dictionary mapping from `src/i18n/seo-body-text.ts`, completing the L4 localization task.
- Implemented a hybrid React component UI localization model across all calculators, mapping the top 100 output strings and empty states into 5 languages via a new `ui-strings.ts` dictionary and passing the `lang` prop through Astro templates (L5 localization task).

## [2026-02-23]

### Changed
- Continued mobile UX optimization batch for DeFi calculators with one-tap `Quick Scenarios`:
  - `src/components/UniswapCalculator.tsx`
  - `src/components/SlippageCalculator.tsx`
  - `src/components/ImpermanentLossCalculator.tsx`
  - `src/components/ApyAprCalculator.tsx`
  - `src/components/YieldFarmingCalculator.tsx`
- Added scenario state helpers (`applyScenario` / `isScenarioActive`) in the above components to keep interactions consistent with previously updated calculators.
- Added `tradeSharePct` output to `SlippageCalculator` results so users can immediately see trade size relative to pool depth and estimate execution risk faster on mobile.
- Refactored repeated preset arrays in `ImpermanentLossCalculator` into named constants for cleaner maintenance and parity with the shared calculator UX pattern.
- Continued mobile UX optimization batch for investment/risk calculators with one-tap scenario presets:
  - `src/components/PortfolioCalculator.tsx`
  - `src/components/RebalancingCalculator.tsx`
  - `src/components/SharpeCalculator.tsx`
  - `src/components/CalmarCalculator.tsx`
  - `src/components/InflationHedgeCalculator.tsx`
- Added unified `Quick Scenarios` blocks and scenario state helpers in the above components to reduce manual mobile input.
- Improved `PortfolioCalculator` preset UX:
  - active-state highlighting for preset buttons;
  - default reset now restores the full baseline 4-asset allocation;
  - reusable allocation builder for consistent preset/scenario application.
- Improved `InflationHedgeCalculator` mobile preset readability by switching savings pills to compact `$1k / $5k / ...` labels.
- Continued mobile UX optimization batch for airdrop/alt-income calculators:
  - `src/components/AirdropCalculator.tsx`
  - `src/components/GamefiCalculator.tsx`
  - `src/components/IcoRoiCalculator.tsx`
  - `src/components/CryptoSalaryCalculator.tsx`
  - `src/components/NftProfitCalculator.tsx`
- Added consistent `Quick Scenarios` preset groups with active-state detection in the above calculators to reduce manual mobile input.
- Improved scenario consistency in `AirdropCalculator` by forcing manual token mode (clearing selected searched coin) when scenario presets are applied.
- Continued mobile UX optimization batch for mining calculators:
  - `src/components/AsicMiningCalculator.tsx`
  - `src/components/GpuMiningCalculator.tsx`
  - `src/components/MiningRoiCalculator.tsx`
  - `src/components/ElectricityCostCalculator.tsx`
  - `src/components/DifficultyEstimatorCalculator.tsx`
- Added one-tap `Quick Scenarios` blocks with shared helper flow (`applyScenario` / `isScenarioActive`) across the above mining calculators for faster mobile setup and easier assumption switching.
- Continued mobile UX optimization batch for strategy calculators:
  - `src/components/BreakEvenCalculator.tsx`
  - `src/components/CompoundInterestCalculator.tsx`
  - `src/components/DCACalculator.tsx`
  - `src/components/DrawdownCalculator.tsx`
  - `src/components/FundingRateCalculator.tsx`
- Added one-tap `Quick Scenarios` presets with active-state detection in the above components to reduce manual mobile input and speed up scenario comparison.
- Refactored DCA date presets to use shared `getDateYearsAgo(...)` helper for consistent default date/scenario date behavior.
- Continued mobile UX optimization batch for advanced trading calculators:
  - `src/components/HalvingCalculator.tsx`
  - `src/components/HodlVsTradeCalculator.tsx`
  - `src/components/KellyCalculator.tsx`
  - `src/components/LeverageCalculator.tsx`
  - `src/components/LiquidationCalculator.tsx`
- Added one-tap `Quick Scenarios` blocks and scenario helper parity (`applyScenario` / `isScenarioActive`) for the above calculators to standardize mobile interaction flow.
- Unified halving profile UX naming with the global pattern by migrating miner profile presets to the same `Quick Scenarios` section semantics.
- Continued mobile UX optimization batch for mixed core calculators:
  - `src/components/LoanCalculator.tsx`
  - `src/components/MarginCalculator.tsx`
  - `src/components/MarketCapCalculator.tsx`
  - `src/components/MiningCalculator.tsx`
  - `src/components/PipCalculator.tsx`
- Added one-tap `Quick Scenarios` blocks plus active-state helpers (`applyScenario` / `isScenarioActive`) in all five components to reduce manual mobile input and keep scenario switching behavior consistent.
- Continued mobile UX optimization batch for trading/risk calculators:
  - `src/components/PositionSizeCalculator.tsx`
  - `src/components/ProfitCalculator.tsx`
  - `src/components/ReverseRoiCalculator.tsx`
  - `src/components/RiskOfRuinCalculator.tsx`
  - `src/components/RiskRewardCalculator.tsx`
- Added one-tap `Quick Scenarios` blocks plus active-state helpers (`applyScenario` / `isScenarioActive`) in all five components for faster mobile setup and fewer manual edits per scenario.
- Completed the remaining mobile UX optimization batch:
  - `src/components/RoiCalculator.tsx`
  - `src/components/SortinoCalculator.tsx`
  - `src/components/StakingRewardsCalculator.tsx`
  - `src/components/TaxCalculator.tsx`
  - `src/components/TpSlCalculator.tsx`
  - `src/components/VarCalculator.tsx`
  - `src/components/VestingCalculator.tsx`
- Added one-tap `Quick Scenarios` blocks plus active-state helpers (`applyScenario` / `isScenarioActive`) in all remaining calculators from the rollout list, including multi-level TP scenario matching in `TpSlCalculator`.

## [2026-02-21]

### Added
- Added localized slug alias generation for all spec calculators in:
  - `src/pages/[lang]/[...slug].astro`
  - Generates localized route slugs for `es`, `pt`, `tr`, `hi`, and `ru` from the canonical calculator slug set.
- Added dedicated category hub data model and shared category-page template:
  - `src/data/category-hubs.ts`
  - `src/components/CategoryHubPage.astro`
  - Centralized category slugs, calculator mappings, localized UI copy, and reusable hub layout blocks.
- Added SEO indexable category routes (EN + localized):
  - `src/pages/calculators/[category].astro`
  - `src/pages/[lang]/calculators/[category].astro`
  - Published category landing pages with `CollectionPage`, `ItemList`, `FAQPage`, and `BreadcrumbList` JSON-LD.

### Changed
- Replaced dynamic calculator module loading in:
  - `src/pages/[lang]/[...slug].astro`
  - Switched to static component imports + explicit per-slug rendering branches so Astro can resolve hydration imports for islands.
- Preserved localized SEO path wiring for alias routes:
  - `src/pages/[lang]/[...slug].astro`
  - Alias pages continue to pass `pathOverride` and canonical slug into `LocalizedCalculatorPage` for localized metadata/canonical URL output.
- Synced release documentation with current build/deploy reality:
  - `DEPLOY.md`
  - `PREPUBLISH_CHECKLIST.md`
  - Updated build output reference to `688 pages` and moved checklist verification date to `2026-02-21`, including redirect-file validation in SEO baseline.
- Redesigned homepage discovery flow for both EN and localized roots:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Restored mobile search visibility in sticky header, added inline clear action, added search result feedback + explicit empty state, reduced “Popular Calculators” to curated high-intent set, and simplified footer information architecture into compact link groups.
- Improved keyboard and touch UX for global header controls:
  - `src/components/LanguageSwitcher.tsx`
  - `src/components/ThemeToggle.tsx`
  - `src/styles/global.css`
  - Added keyboard navigation for language dropdown (Arrow keys/Home/End/Escape), larger 44px+ touch targets, and replaced inline toggle styles with reusable global class.
- Increased baseline readability/contrast and focus visibility:
  - `src/styles/global.css`
  - Tuned light/dark text tokens, added global `:focus-visible` ring styles, and added `sr-only` utility class for accessible labels.
- Extended i18n dictionary for new homepage UX copy:
  - `src/i18n/translations.ts`
  - Added localized strings for search labels, clear action, result/empty-state messaging, stat labels, and localized “Popular/Trending” badges.
- Refactored homepage category cards to point to category hubs instead of single calculators:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Converted cards to semantic `article` blocks with direct links to both category hubs and top calculators inside each category.

### Deviated
- Expanded homepage URL architecture beyond the original calculator-only route plan by adding `/calculators/[category]` hubs.
  - Reason: user-approved UX/SEO decision to improve category discoverability, crawlability, and navigation clarity.

### Fixed
- Fixed Astro build error on localized alias pages:
  - `[NoMatchingImport] Could not render CalculatorComponent`
  - Example affected route: `/es/conversor-cripto/`.
- Fixed localized style verification false positive for dynamic alias route:
  - `scripts/verify-localized-styles.mjs`
  - Dynamic localized route files (for example `[...slug].astro`) are now excluded from EN source-style checks.
- Prevented duplicate-index risk for old localized calculator paths after slug localisation:
  - `src/layouts/Layout.astro`
  - Pages whose runtime path is not canonical now emit `<meta name="robots" content="noindex, nofollow">` automatically while preserving canonical URL tags.
- Prevented legacy localized calculator URLs from being published in sitemap:
  - `astro.config.mjs`
  - Added sitemap `filter` that excludes non-canonical locale paths like `/es/profit-calculator`, keeping only localized slug variants for spec calculators.
- Added explicit 301 redirects from legacy localized calculator URLs to localized slug URLs:
  - `public/_redirects`
  - Auto-generated 510 redirect rules (`255` source→target mappings with and without trailing slash) for `es`, `pt`, `tr`, `hi`, `ru`.
- Ensured platform routing files are present in production build output:
  - `scripts/postbuild-platform-files.mjs`
  - `package.json`
  - `npm run build` now copies `public/_redirects` (and `public/_headers` if present) into `dist/` after `astro build`.
- Added slug-migration regression guard for CI:
  - `scripts/verify-slug-migration.mjs`
  - `package.json`
  - Validates 3 conditions for localized calculator slug migration: canonical localized URLs are present in sitemap, legacy localized URLs are absent from sitemap, and both legacy path variants map to `301` redirects in `dist/_redirects`.
- Added prepublish check entry for slug migration validation:
  - `PREPUBLISH_CHECKLIST.md`
  - Requires `npm run verify:slug-migration` as part of SEO baseline release checks.
- Fixed mobile UX regression where homepage search/navigation controls were hidden below `768px`:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Mobile users now keep immediate access to tool discovery without scrolling through full page content.
- Fixed incomplete localization on homepage stats and tag labels:
  - `src/pages/[lang]/index.astro`
  - `src/i18n/translations.ts`
  - Replaced hardcoded EN labels (`Languages`, `Ads`, `Load`) and badge terms with locale-aware strings.

## [2026-02-20]

### Changed
- Finalized release verification snapshot in:
  - `PREPUBLISH_CHECKLIST.md`
  - Marked all prepublish checks as passed after build, route, SEO, i18n, data/UX, hydration, and governance validation.
- Corrected deployment documentation page-count note in:
  - `DEPLOY.md`
  - Updated build output reference from outdated value to `235 pages` across 6 languages (release-check checkpoint).
- Updated deployment documentation page-count note after calculator expansion in:
  - `DEPLOY.md`
  - Updated build output reference to current `277 pages` across 6 languages.
- Updated deployment documentation page-count note after second calculator batch in:
  - `DEPLOY.md`
  - Updated build output reference to current `307 pages` across 6 languages.
- Updated deployment documentation page-count note after third calculator batch in:
  - `DEPLOY.md`
  - Updated build output reference to current `325 pages` across 6 languages.
- Updated deployment documentation page-count note after fourth calculator batch in:
  - `DEPLOY.md`
  - Updated build output reference to current `343 pages` across 6 languages.
- Updated deployment documentation page-count note after SEO-route calculator expansion in:
  - `DEPLOY.md`
  - Updated build output reference to current `361 pages` across 6 languages.
- Updated deployment documentation page-count note after advanced risk/slippage calculator batch in:
  - `DEPLOY.md`
  - Updated build output reference to current `379 pages` across 6 languages.
- Updated deployment documentation page-count note after drawdown/sharpe/compound-route batch in:
  - `DEPLOY.md`
  - Updated build output reference to current `397 pages` across 6 languages.
- Updated deployment documentation page-count note after risk-metric and expectancy calculator expansion in:
  - `DEPLOY.md`
  - Updated build output reference to current `433 pages` across 6 languages.
- Added CI-style local validation command in:
  - `README.md`
  - Documented `npm run ci:check` for local pre-push checks.
- Added i18n regression guard check item in:
  - `PREPUBLISH_CHECKLIST.md`
  - Added `npm run verify:localized-styles` as mandatory localized styling check.
- Expanded calculator discovery on homepages in:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Updated category counts/lists, popular calculator cards, and footer links to include newly published tools.
- Added shared global calculator shell styles for newly added routes in:
  - `src/styles/global.css`
  - Added reusable global classes for two-column calculator layout, input/result cards, controls, and responsive behavior.

### Added
- Added localized calculator styling regression verifier:
  - `scripts/verify-localized-styles.mjs`
  - Verifies every localized calculator route in `dist/{lang}/{slug}/index.html` contains scoped CSS markers generated from EN calculator style blocks.
  - Fails with per-route diagnostics for missing style scope injection.
- Added CI workflow for build + localized style verification:
  - `.github/workflows/ci.yml`
  - Runs `npm ci`, `npm run build`, and `npm run verify:localized-styles` on `push` and `pull_request`.
- Added CI helper scripts:
  - `package.json`
  - Added `verify:localized-styles` and `ci:check`.
- Added 7 new calculator pages (EN + 5 localized languages) using existing React calculator islands:
  - EN routes in `src/pages/`:
    - `gwei-converter.astro`, `hashrate-converter.astro`, `gpu-mining-calculator.astro`
    - `asic-mining-calculator.astro`, `mining-roi-calculator.astro`, `electricity-cost-calculator.astro`
    - `market-cap-calculator.astro`
  - Localized routes in `src/pages/[lang]/` for each of the slugs above (`es`, `pt`, `tr`, `hi`, `ru`)
  - Wired to existing components:
    - `GweiConverter.tsx`, `HashrateConverter.tsx`, `GpuMiningCalculator.tsx`
    - `AsicMiningCalculator.tsx`, `MiningRoiCalculator.tsx`, `ElectricityCostCalculator.tsx`
    - `MarketCapCalculator.tsx`
  - Added shared calculator UI styling blocks to new EN pages so localized style-scoping/injection works with `LocalizedCalculatorPage.astro`.
- Added 5 new calculators (EN + 5 localized languages):
  - New components:
    - `src/components/TimestampConverter.tsx`
    - `src/components/CryptoUnitConverter.tsx`
    - `src/components/BridgeComparator.tsx`
    - `src/components/UniswapCalculator.tsx`
    - `src/components/RebalancingCalculator.tsx`
  - EN routes:
    - `src/pages/timestamp-converter.astro`
    - `src/pages/unit-converter.astro`
    - `src/pages/bridge-comparator.astro`
    - `src/pages/uniswap-calculator.astro`
    - `src/pages/rebalancing-calculator.astro`
  - Localized routes in `src/pages/[lang]/` (`es`, `pt`, `tr`, `hi`, `ru`) for all slugs above.
- Added 3 new calculators (EN + 5 localized languages):
  - New components:
    - `src/components/DifficultyEstimatorCalculator.tsx`
    - `src/components/IcoRoiCalculator.tsx`
    - `src/components/MevProtectionCalculator.tsx`
  - EN routes:
    - `src/pages/difficulty-calculator.astro`
    - `src/pages/ico-roi-calculator.astro`
    - `src/pages/mev-calculator.astro`
  - Localized routes in `src/pages/[lang]/` (`es`, `pt`, `tr`, `hi`, `ru`) for all slugs above.
  - Updated discovery in homepages:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `325 pages`
    - `npm run verify:localized-styles` passed (`250 localized calculator pages` checked)
- Added 3 new calculators (EN + 5 localized languages):
  - New components:
    - `src/components/LendingCalculator.tsx`
    - `src/components/NodeCalculator.tsx`
    - `src/components/GamefiCalculator.tsx`
  - EN routes:
    - `src/pages/lending-calculator.astro`
    - `src/pages/node-calculator.astro`
    - `src/pages/gamefi-calculator.astro`
  - Localized routes in `src/pages/[lang]/` (`es`, `pt`, `tr`, `hi`, `ru`) for all slugs above.
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `343 pages`
    - `npm run verify:localized-styles` passed (`265 localized calculator pages` checked)
- Added 3 new SEO calculator routes (EN + 5 localized languages) based on existing calculator islands:
  - EN routes:
    - `src/pages/crypto-loan-calculator.astro` (uses `LoanCalculator.tsx`)
    - `src/pages/staking-calculator.astro` (uses `StakingRewardsCalculator.tsx`)
    - `src/pages/gas-calculator.astro` (uses `GasFeeCalculator.tsx`)
  - Localized routes in `src/pages/[lang]/` (`es`, `pt`, `tr`, `hi`, `ru`) for all slugs above.
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `361 pages`
    - `npm run verify:localized-styles` passed (`280 localized calculator pages` checked)
- Added 3 new calculators (EN + 5 localized languages):
  - New components:
    - `src/components/SlippageCalculator.tsx`
    - `src/components/KellyCalculator.tsx`
    - `src/components/VarCalculator.tsx`
  - EN routes:
    - `src/pages/slippage-calculator.astro`
    - `src/pages/kelly-calculator.astro`
    - `src/pages/var-calculator.astro`
  - Localized routes in `src/pages/[lang]/` (`es`, `pt`, `tr`, `hi`, `ru`) for all slugs above.
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `379 pages`
    - `npm run verify:localized-styles` passed (`295 localized calculator pages` checked)
- Added 3 calculators/routes (EN + 5 localized languages):
  - New components:
    - `src/components/DrawdownCalculator.tsx`
    - `src/components/SharpeCalculator.tsx`
  - New EN routes:
    - `src/pages/drawdown-calculator.astro`
    - `src/pages/sharpe-calculator.astro`
    - `src/pages/compound-calculator.astro` (SEO alias route using `CompoundInterestCalculator.tsx`)
  - New localized routes:
    - `src/pages/[lang]/drawdown-calculator.astro`
    - `src/pages/[lang]/sharpe-calculator.astro`
    - `src/pages/[lang]/compound-calculator.astro`
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `397 pages`
    - `npm run verify:localized-styles` passed (`310 localized calculator pages` checked)
- Added 3 calculators/routes (EN + 5 localized languages):
  - New components:
    - `src/components/SortinoCalculator.tsx`
    - `src/components/CalmarCalculator.tsx`
    - `src/components/RiskOfRuinCalculator.tsx`
  - New EN routes:
    - `src/pages/sortino-calculator.astro`
    - `src/pages/calmar-calculator.astro`
    - `src/pages/risk-of-ruin-calculator.astro`
  - New localized routes:
    - `src/pages/[lang]/sortino-calculator.astro`
    - `src/pages/[lang]/calmar-calculator.astro`
    - `src/pages/[lang]/risk-of-ruin-calculator.astro`
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `415 pages`
    - `npm run verify:localized-styles` passed (`325 localized calculator pages` checked)
- Added 3 calculators/routes (EN + 5 localized languages):
  - New components:
    - `src/components/TreynorCalculator.tsx`
    - `src/components/InformationRatioCalculator.tsx`
    - `src/components/TradeExpectancyCalculator.tsx`
  - New EN routes:
    - `src/pages/treynor-calculator.astro`
    - `src/pages/information-ratio-calculator.astro`
    - `src/pages/trade-expectancy-calculator.astro`
  - New localized routes:
    - `src/pages/[lang]/treynor-calculator.astro`
    - `src/pages/[lang]/information-ratio-calculator.astro`
    - `src/pages/[lang]/trade-expectancy-calculator.astro`
  - Updated homepage discovery and footer links:
    - `src/pages/index.astro`
    - `src/pages/[lang]/index.astro`
  - Validation snapshot:
    - `npm run ci:check` passed
    - `npm run build` produced `433 pages`
    - `npm run verify:localized-styles` passed (`340 localized calculator pages` checked)

### Fixed
- Restored full calculator styling on localized calculator routes (`/es`, `/pt`, `/tr`, `/hi`, `/ru`) by loading and scoping calculator CSS from EN calculator pages inside:
  - `src/components/LocalizedCalculatorPage.astro`
  - Added slug-scoped style extraction across all `<style>` blocks in each EN calculator page.
  - Added in-memory cache for generated scoped CSS to avoid repeated parsing across locales and keep build time stable.

## [2026-02-19]

### Added
- Added release process checklist:
  - `PREPUBLISH_CHECKLIST.md`
  - Includes build, SEO, i18n, data, hydration, and governance gates

### Changed
- Replaced starter readme with project documentation:
  - `README.md`
  - Added architecture overview, SEO/trust summary, operational rules, and run instructions

### Added
- Added universal localized calculator template: `src/components/LocalizedCalculatorPage.astro`
  - Unified multilingual calculator shell with shared header/footer and breadcrumb
  - Added reusable long-form SEO block (1500+ words) below each localized calculator
  - Added built-in `WebApplication` + `FAQPage` JSON-LD generation for localized calculator routes
- Added 15 missing localized calculator routes under `src/pages/[lang]/`:
  - `airdrop-calculator.astro`, `apy-apr-calculator.astro`, `exchange-fees.astro`, `halving-calculator.astro`
  - `hodl-vs-trade.astro`, `inflation-hedge.astro`, `market-cap-comparator.astro`, `nft-profit-calculator.astro`
  - `reverse-roi.astro`, `risk-reward-calculator.astro`, `roi-calculator.astro`, `salary-calculator.astro`
  - `satoshi-converter.astro`, `vesting-calculator.astro`, `yield-farming-calculator.astro`

### Changed
- Refactored all localized calculator pages in `src/pages/[lang]/` to use `LocalizedCalculatorPage.astro`
  - Standardized metadata/title/description handling across localized routes
  - Standardized schema output for localized calculators
- Improved homepage UX search on both:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Added live client-side filtering for popular and category cards via `#search-input`

### Added
- Added global CoinGecko client fetch interceptor: `src/utils/coingecko-fetch-client.ts`
  - GET-only interception for `api.coingecko.com`
  - 5-minute TTL cache in memory + `sessionStorage` (spec-aligned client cache layer)
  - In-flight request deduplication per normalized URL
  - Retry/backoff logic for `429` and `5xx` responses
  - Request timeout handling with stale-cache fallback when network/API fails

### Changed
- Updated `src/layouts/Layout.astro` to install the CoinGecko fetch interceptor globally on all pages
- Reduced unnecessary hydration cost by removing `client:load` from static Lucide icons in Astro pages:
  - `src/pages/index.astro`, `src/pages/[lang]/index.astro`
  - All EN calculator pages under `src/pages/*.astro`
  - Shared localized shell `src/components/LocalizedCalculatorPage.astro`
  - Interactive islands (`ThemeToggle`, `LanguageSwitcher`, calculator components) keep `client:load`

### Fixed
- Removed unused `Table` icon import from `src/components/ApyAprCalculator.tsx` to clear build warning

### Added
- Added homepage structured data on both root and localized homepages:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Injected JSON-LD for `WebSite` + `Organization` with `SearchAction`
- Added technical SEO assets:
  - `public/robots.txt` with sitemap reference
  - `src/pages/404.astro` custom 404 page with recovery links

### Changed
- Extended `src/layouts/Layout.astro` with optional `noindex` prop and conditional robots meta for non-indexable pages

### Added
- Added trust and transparency pages:
  - `src/pages/privacy.astro`
  - `src/pages/editorial-policy.astro`
  - `src/pages/methodology.astro`
- Added internal trust-link cluster in homepage footers:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`

### Added
- Added localized policy pages for `es`, `pt`, `tr`, `hi`, `ru` via dynamic route:
  - `src/pages/[lang]/[policy].astro`
  - Routes include `/[lang]/privacy`, `/[lang]/editorial-policy`, `/[lang]/methodology`

### Changed
- Added `WebPage` JSON-LD to trust pages:
  - `src/pages/privacy.astro`
  - `src/pages/editorial-policy.astro`
  - `src/pages/methodology.astro`
  - `src/pages/[lang]/[policy].astro`
- Updated localized homepage footer links to localized trust routes:
  - `src/pages/[lang]/index.astro`

### Changed
- Improved homepage search UX to support shareable query URLs:
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - Search now pre-fills from `?q=...` on load and keeps URL query in sync while typing

### Changed
- Localized trust footer labels for all supported non-EN languages:
  - `src/i18n/translations.ts` (added `trustTitle`, `privacyPolicy`, `editorialPolicy`, `methodologyPolicy`)
  - `src/pages/[lang]/index.astro` (now renders trust links from language dictionary)

### Changed
- Deferred non-critical header island hydration from `client:load` to `client:idle` for `LanguageSwitcher` and `ThemeToggle`:
  - `src/components/LocalizedCalculatorPage.astro`
  - `src/pages/index.astro`
  - `src/pages/[lang]/index.astro`
  - All EN calculator pages under `src/pages/*.astro`

### Added
- Added Reverse ROI Calculator (`src/components/ReverseRoiCalculator.tsx`, `src/pages/reverse-roi.astro`)
  - Searchable coin selector with auto-price fetch from CoinGecko
  - Investment amount and target profit inputs with quick pills
  - Required token price and growth multiplier (Nx) calculation
  - Probability indicator (Very Likely → Extremely Unlikely) based on growth multiplier
  - Market cap analysis with comparison to top coins
  - Milestone table: portfolio value at 2x, 5x, 10x, 25x, 50x, 100x
  - Affiliate CTA (Binance)
  - SEO content with growth multiplier explanation, market cap analysis, historical examples, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Crypto Salary Calculator (`src/components/CryptoSalaryCalculator.tsx`, `src/pages/salary-calculator.astro`)
  - Two modes: Fiat→Crypto and Crypto→Fiat via toggle
  - Annual salary input with pay frequency (weekly/bi-weekly/monthly)
  - Crypto allocation % with conversion fee calculation
  - BTC/ETH/USDT price auto-fetch from CoinGecko
  - Coins per period and annual accumulation table (1-5 years)
  - Multi-currency fiat conversion (USD, EUR, GBP, BRL, TRY, INR, RUB)
  - Affiliate CTA (Bitwage)
  - SEO content with crypto payroll explanation, tax implications, DCA effect, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Token Vesting Calculator (`src/components/VestingCalculator.tsx`, `src/pages/vesting-calculator.astro`)
  - Total allocation, token price, TGE unlock %, cliff, vesting duration, unlock frequency inputs
  - SVG unlock schedule chart with step-function visualization
  - Full unlock schedule table with cumulative tokens and values
  - Sell pressure per unlock event calculation
  - Cliff end and TGE highlights on chart
  - Affiliate CTA (CryptoRank)
  - SEO content with vesting terms, common schedules table, trading strategies, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Airdrop Value Calculator (`src/components/AirdropCalculator.tsx`, `src/pages/airdrop-calculator.astro`)
  - Searchable coin selector with current price auto-fetch
  - Price at receipt and sold/unsold toggle
  - Multi-country tax jurisdiction (USA, UK, Germany, Australia, Canada)
  - Income tax on airdrop + capital gains tax calculation
  - Historical airdrops reference table (UNI, ENS, ARB, OP, JUP, STRK)
  - Net value after tax estimation
  - Affiliate CTA (CoinGecko)
  - SEO content with airdrop tax treatment by country, historical airdrops, strategies, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Updated homepage: added NFT Profit to Profit & Loss category, updated Tax category with Airdrop Calculator
- Added Yield Farming Calculator (`src/components/YieldFarmingCalculator.tsx`, `src/pages/yield-farming-calculator.astro`)
  - Deposit amount, pool APY/APR, gas costs (entry/exit/harvest), harvest frequency inputs
  - Impermanent loss estimation
  - Net yield calculation after gas + IL deductions
  - Optimal harvest frequency recommendation
  - Break-even period calculation
  - L2 vs L1 gas cost comparison note
  - Affiliate CTA (Beefy/Yearn)
  - SEO content with yield farming explanation, gas optimization, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added NFT Profit Calculator (`src/components/NftProfitCalculator.tsx`, `src/pages/nft-profit-calculator.astro`)
  - Buy/sell price in ETH with USD conversion
  - Marketplace fee presets (OpenSea 2.5%, Blur 0.5%, Magic Eden 2%, LooksRare 2%, X2Y2 0.5%)
  - Creator royalty input (0-10%)
  - Gas costs for buy and sell transactions
  - Net profit in ETH and USD, effective fee rate, break-even sell price
  - Affiliate CTA (OpenSea)
  - SEO content with NFT fee breakdown, marketplace comparison, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Bitcoin Halving Countdown & Impact Calculator (`src/components/HalvingCalculator.tsx`, `src/pages/halving-calculator.astro`)
  - Live countdown to next Bitcoin halving (~March 2028, block 1,050,000)
  - Current block height, block reward, blocks remaining
  - Mining impact calculator: revenue before vs after halving
  - Historical halving data (2012, 2016, 2020, 2024) with price performance
  - Price performance 6/12/18 months after each halving
  - Affiliate CTA (Bybit)
  - SEO content with halving explanation, Stock-to-Flow, miner preparation, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Inflation Hedge Calculator (`src/components/InflationHedgeCalculator.tsx`, `src/pages/inflation-hedge.astro`)
  - 8 country presets (Turkey 50%, Argentina 100%, Nigeria 30%, USA 3%, Russia 9%, India 5%, Brazil 4.5%, UK 4%)
  - Savings amount and time period (1-10 years) inputs
  - Toggle comparison assets: BTC, ETH, USDC+Yield, Gold, S&P 500
  - Fiat purchasing power erosion calculation
  - Comparison table with real return and vs-fiat differential
  - SVG line chart showing all assets over time
  - Country info card with crypto adoption rates
  - Affiliate CTA (Binance)
  - SEO content with inflation comparison, crypto as hedge, stablecoin yields, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Updated homepage: added Inflation Hedge to Investment category, added new tools to footer links

## [2026-02-18]

### Added
- Added Market Cap Comparator (`src/components/MarketCapComparator.tsx`, `src/pages/market-cap-comparator.astro`)
  - "What if [Coin A] had [Coin B]'s market cap?" viral comparison tool
  - Two searchable coin selectors with CoinGecko API integration
  - Quick scenario pills: DOGE→ETH, SOL→BTC, SHIB→BNB, ADA→ETH, XRP→BTC
  - Hypothetical price and growth multiplier (Nx) calculation
  - Top-10 coins comparison table with hypothetical prices
  - "Share on X" button with auto-generated tweet text
  - Affiliate CTA (Binance)
  - SEO content with market cap explanation, FDV vs circulating, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Crypto ROI Calculator (`src/components/RoiCalculator.tsx`, `src/pages/roi-calculator.astro`)
  - Total ROI and annualized ROI calculation
  - Holding period input for annualized return normalization
  - Fee deduction for accurate net returns
  - Comparison with traditional assets (S&P 500, Gold, Real Estate, Bonds, Savings)
  - Affiliate CTA (Bybit)
  - SEO content with ROI formulas, crypto vs traditional assets table, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added HODL vs Trade Calculator (`src/components/HodlVsTradeCalculator.tsx`, `src/pages/hodl-vs-trade.astro`)
  - Historical HODL simulation using CoinGecko market_chart API
  - Active trading simulation with configurable win rate, avg profit/loss, trades/month
  - Trading fee calculation per round-trip
  - Side-by-side final value comparison with winner highlight
  - Searchable coin selector (500+ cryptocurrencies)
  - Affiliate CTA (Bybit)
  - SEO content with HODL strategy, trading costs, win rate math, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Added Exchange Fee Comparator (`src/components/ExchangeFeeComparator.tsx`, `src/pages/exchange-fees.astro`)
  - 10+ exchanges: Binance, Bybit, OKX, Coinbase, Kraken, KuCoin, Gate.io, Bitget, MEXC, HTX
  - Spot and futures fee tiers with maker/taker rates
  - Volume tier selection for accurate fee lookup
  - Trade amount input with per-exchange cost comparison
  - Native token discount highlighting (BNB, KCS, etc.)
  - Sorted ranking from cheapest to most expensive
  - Individual affiliate CTAs per exchange
  - SEO content with maker/taker explanation, fee reduction tips, full comparison table, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Updated homepage: added Market Cap Comparator to popular calculators grid, added new tools to footer links

## [2026-02-17]

### Added
- Added Pip / Tick Value Calculator (`src/components/PipCalculator.tsx`, `src/pages/pip-calculator.astro`)
  - Quick-pair buttons for BTC, ETH, SOL, XRP, DOGE with auto-price fetch
  - Searchable coin selector (500+ cryptocurrencies via CoinGecko)
  - USD or Coins position size input toggle
  - Smart tick size presets that adapt to coin price magnitude
  - Long/Short direction toggle
  - P&L table for 1, 10, 50, 100, 500, 1000 pip moves
  - Quick reference table for common tick sizes
  - Affiliate CTA (Bybit)
  - SEO content with pip value formula, tick size table, FAQ (6 questions)
  - Schema.org WebApplication + FAQPage JSON-LD
- Updated homepage Trading Tools category to include Pip Value Calculator

## [2026-02-15]

### Added
- Initialized Astro 5.17 project with React 19 and Tailwind CSS 4
- Created design system (`src/styles/global.css`) with Light/Dark CSS variables
- Created base layout (`src/layouts/Layout.astro`) with SEO meta tags, Google Fonts, FOUC-free theme init
- Created ThemeToggle React component (`src/components/ThemeToggle.tsx`) with localStorage + system preference detection
- Built homepage (`src/pages/index.astro`): sticky header, hero section, popular calculators, 8-category bento grid, features section, footer
- Created `AGENTS.md` with AI agent instructions
- Created this `CHANGELOG.md`
- Added Crypto Profit Calculator (`src/components/ProfitCalculator.tsx`, `src/pages/profit-calculator.astro`)
  - CoinGecko coin search with auto-price fill
  - Long & Short position toggle
  - Investment ($) or Quantity input mode
  - Entry/Exit trading fee breakdown
  - Real-time calculation with ROI
  - SEO content section with FAQ accordions
  - Affiliate CTA (Bybit)
- Added Crypto Converter (`src/components/CryptoConverter.tsx`, `src/pages/converter.astro`)
  - Quick-pair buttons (BTC/ETH/SOL/XRP/DOGE → USD, BTC → EUR)
  - Searchable cryptocurrency selector (500+ coins via CoinGecko)
  - 10 fiat currencies (USD, EUR, GBP, JPY, AUD, CAD, BRL, TRY, INR, RUB)
  - Real-time conversion with 24h change indicator
  - Refresh rate button with timestamp
  - Affiliate CTA (Binance)
  - SEO content with FAQ accordions
- Added Bitcoin Mining Calculator (`src/components/MiningCalculator.tsx`, `src/pages/mining-calculator.astro`)
  - 9 ASIC miner presets (Antminer S21/S19, Whatsminer M60S/M56S/M50S, Avalon A1466)
  - Hashrate, power consumption, electricity cost, pool fee inputs
  - Auto-fetched BTC price from CoinGecko
  - Daily/Weekly/Monthly/Yearly profitability breakdown table
  - Break-even calculation with hardware cost
  - Network info bar (BTC Price, Block Reward, Difficulty)
  - Affiliate CTA (F2Pool)
  - SEO content with ASIC comparison table and FAQ
- Added DCA Calculator (`src/components/DCACalculator.tsx`, `src/pages/dca-calculator.astro`)
  - Historical price simulation via CoinGecko market_chart API
  - Searchable coin selector (500+ cryptocurrencies)
  - Frequency pills: daily, weekly, bi-weekly, monthly
  - Quick amount buttons ($50-$1000)
  - SVG chart: portfolio value vs total invested over time
  - DCA vs Lump Sum comparison with winner highlight
  - Breakdown: total invested, current value, P/L, avg buy price, total coins, purchases
  - Affiliate CTA (Coinbase)
  - SEO content with DCA strategy explanation and FAQ
- Added Crypto Tax Calculator (`src/components/TaxCalculator.tsx`, `src/pages/tax-calculator.astro`)
  - 6 country tax configs (US, UK, Germany, Australia, Canada, India)
  - Income bracket selector with local tax rates
  - Short-term vs Long-term holding period toggle
  - FIFO / LIFO accounting method pills
  - Capital gain/loss calculation with estimated tax
  - Short vs Long-term comparison with savings highlight
  - Country-specific tax notes and rules
  - Affiliate CTA (CoinLedger)
  - SEO content with country comparison table, FIFO vs LIFO, FAQ
- Added Crypto "What If" Calculator (`src/components/WhatIfCalculator.tsx`, `src/pages/what-if.astro`)
  - Historical price lookup via CoinGecko API (coins/history + market_chart/range)
  - Searchable coin selector (500+ cryptocurrencies)
  - 6 viral quick scenarios ($100 BTC 2013, $1K ETH 2015, $500 SOL 2020, etc.)
  - SVG growth chart: portfolio value over time
  - Share on X button with auto-generated tweet text
  - Stats grid: invested, coins bought, price then/now, profit, date
  - Affiliate CTA (Binance)
  - SEO content with notable crypto returns table and FAQ
