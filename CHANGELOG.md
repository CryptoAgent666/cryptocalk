# Changelog — CryptoCalk

All notable changes to this project are documented here.

## [2026-02-26]

### Changed
- Standardized trailing-slash URL behavior for localized routing and canonical generation:
  - `src/i18n/utils.ts`
  - `src/components/SiteFooter.astro`
  - `src/components/LocalizedCalculatorPage.astro`
  - `src/pages/[lang]/index.astro`
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
- Globally applied CoinGecko Demo API key (`CG-Zeo2WrX3r7J1oUoX1kSnutmz`) as a query parameter (`x_cg_demo_api_key`) to all 22 calculator components to securely fetch market data and bypass 401 Unauthorized limits.

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
