# Changelog — CryptoCalk

All notable changes to this project are documented here.

## [2026-04-19] (update 83) — feat: 6 new specialized calculators (87→93 total)

### Added
- **RetirementCalculator.tsx**: Crypto Retirement / FIRE calculator — current age, retirement age, portfolio, monthly contribution, expected return, withdrawal, inflation. 3 scenarios (Conservative/Moderate/Aggressive). Results: portfolio at retirement, years to FIRE, monthly passive income, years portfolio lasts, surplus/deficit
- **RainbowChartCalculator.tsx**: Bitcoin Rainbow Chart — logarithmic regression model (a=5.84, b=-17.01) with 9 color-coded price bands from "Fire Sale" to "Maximum Bubble". Shows current band, model price, deviation %, and BTC purchasable
- **EtfFeeCalculator.tsx**: Bitcoin ETF Fee Comparison — IBIT (0.25%), FBTC (0.25%), GBTC (1.50%), ARKB (0.21%), BITB (0.20%), Direct BTC (0%). Year-by-year fee drag table and savings summary
- **TokenBurnCalculator.tsx**: Token Burn Rate — total/circulating supply, monthly burn rate, token price. Projects supply at 1/3/5yr, months to burn 10%/25%, deflationary pressure score
- **FuturesBasisCalculator.tsx**: Futures Basis — spot vs futures spread, annualized basis, cash-and-carry yield, net profit, break-even days. Contango/backwardation detection
- **DefiInsuranceCalculator.tsx**: DeFi Insurance — premium cost, break-even hack size, insured vs uninsured loss comparison, yield impact, insurance recommendation based on expected value
- **6 EN standalone pages** (src/pages/retirement-calculator.astro, etc.) with breadcrumbs, byline, and ShareCalculator
- **6 localized page routes** registered in [lang]/[...slug].astro (imports, ALIAS_DEFINITIONS, rendering blocks)
- **30 localized slugs** added to src/i18n/utils.ts (6 calcs × 5 langs)
- **36 calculator-meta entries** added (6 calcs × 6 langs) with localized titles/descriptions
- **6 category-map entries**: retirement→investment, rainbow-chart→investment, etf-fee→gas-fees, token-burn→investment, futures-basis→trading-tools, defi-insurance→defi-yield
- **6 category-hub tool entries** + **30 TOOL_NAME_OVERRIDES** (6 calcs × 5 langs)
- **Updates page**: New "6 More Calculators" entry in EN + all 5 localized versions

### Changed
- **Calculator count**: 87 → 93 across all pages (index, about, updates, localized index/updates)
- **Page count**: 1,139 → 1,175 pages
- Build: 1,175 pages, 0 errors

## [2026-04-18] (update 82) — i18n: ~290 missing translations for 18 new calculators

### Added
- **~290 missing getUiString() keys translated** across all 5 ui-strings files (es.ts, pt.ts, tr.ts, hi.ts, ru.ts) for the 18 new calculator components added in update 79
- **Categories covered**: energy sources (Coal, Nuclear, Hydro, Solar, Wind, Grid Mix), on-chain metric labels (Fair Value, Overbought, Sell Signal, Buy Signal, etc.), grid types (Arithmetic, Geometric), filing status (Single, Married), relationship labels (Spouse, Child, Other), country names (8 countries), inheritance tax notes (8 country-specific legal explanations), date presets (Bitcoin Launch 2009, BTC $1 2011, ETH ICO 2015, COVID Crash, etc.), scenario labels (54 across 18 calculators), input labels, result labels, disclaimers, and helper text
- **Duplicate keys cleaned**: Removed 131 (es), 102 (pt), 106 (tr), 103 (hi), 96 (ru) duplicate keys that existed from partial earlier additions
- All translations are natural-language, locale-appropriate; brand names (BTC, ETH, Binance, CoinGecko, etc.) kept as-is
- Build: TypeScript compilation clean, 0 TS1117 errors

## [2026-04-18] (update 81) — fix: 3 bugs, 5 key mismatches, dead code from QA audit

### Fixed
- **PerpetualFuturesCalculator.tsx**: Operator precedence bug in `effectiveLev` — `margin + netPnl > 0` was parsed as `margin + (netPnl > 0)` adding a boolean. Added parentheses: `(margin + netPnl) > 0`
- **IfIHadBoughtCalculator.tsx**: Broken i18n string concatenation (`'Your $' + amount + ' would be worth'`) — replaced with `'Your investment of' + amount + 'would be worth'` using separate translatable keys
- **Hardcoded `'en-US'` locale**: Fixed in IfIHadBoughtCalculator, MillionaireCalculator, PizzaDayCalculator — now uses `lang === 'en' ? 'en-US' : lang` for number formatting
- **5 key mismatches**: Added correct key variants to all 5 ui-strings files: `'Profit per Grid'`, `'Starting Asset Price ($)'`, `'Funding Rate (% per 8h)'`, `'MC / FDV Ratio'`, `'DeFi Composability APY (%)'`
- **ValidatorCalculator.tsx**: Removed dead `breakEvenMonths` variable (line 114, unused — result used `breakEven` from line 116)
- **New i18n keys**: `'Your investment of'`, `'would be worth'` added to all 5 ui-strings files
- Build: 1,139 pages, 0 errors

## [2026-04-18] (update 80) — feat: Updates page in 6 languages, footer link

### Added
- **Updates page (EN)**: `src/pages/updates.astro` — user-facing changelog with 7 update entries covering new calculators, Android app, live market data, localization, mobile improvements, and launch
- **Updates page (localized)**: `src/pages/[lang]/updates.astro` — fully translated for es, pt, tr, hi, ru with localized dates, calculator links, and descriptions
- **Footer link**: Added "Updates" link to Trust & Legal column in `SiteFooter.astro`
- **Translation key**: `footerUpdates` added to all 6 languages in `translations.ts` (Updates, Novedades, Novidades, Yenilikler, अपडेट्स, Обновления)
- Build: 1,139 pages (+6), 0 errors

## [2026-04-18] (update 79) — feat: 18 new calculators, data refresh, total now 87 tools across 1,133 pages

### Added
- **18 new React calculator components**: ArbitrageCalculator, StockToFlowCalculator, OptionsCalculator, TaxLossHarvestingCalculator, RestakingCalculator, LiquidStakingCalculator, PerpetualFuturesCalculator, PaybackPeriodCalculator, DvaCalculator, BitcoinEnergyCalculator, OnChainMetricsCalculator, GridTradingCalculator, InheritanceTaxCalculator, ValidatorCalculator, TokenValuationCalculator, IfIHadBoughtCalculator, MillionaireCalculator, PizzaDayCalculator
- **36 Astro pages**: 18 EN standalone pages + 18 localized `[lang]` pages (×5 langs each)
- **Catch-all route updated**: `[lang]/[...slug].astro` — 18 new imports, ALIAS_DEFINITIONS entries, and conditional rendering blocks for localized slug routes
- **Registration**: 18 slugs in SPEC_CALCULATOR_SLUGS, 90 localized slugs (5 langs × 18), 18 category mappings, 108 calculator-meta entries (18 × 6 langs)
- **Category hubs**: 18 tools added to 6 categories (profit-loss, mining, defi-yield, tax-reporting, investment, trading-tools) + 90 TOOL_NAME_OVERRIDES
- **Homepage**: 3 new viral calculators (If I Had Bought, Pizza Day, Millionaire) added to popularCalculators with "New" tag
- **SEO content**: calculator-seo-content.ts entries for 18 calcs × 6 langs (how, inputs, quickAnswer)
- **UI strings**: ~300 new translation keys across 5 language files (es, pt, tr, hi, ru)

### Changed
- **Calculator count**: 69 → 87 across all references (homepage EN/localized, about page, schemas)
- **Page count**: 935 → 1,133 across all homepage references (6 langs)
- **Data refresh (April 18, 2026)**: BTC $77,300, ETH $2,419, BTC difficulty 136T, hashrate 856 EH/s, LTC $56, DASH $37, ZEC $337, ETC $8.75, SOL $89, inflation rates updated

## [2026-04-04] (update 78) — fix: external links open in system browser, remove 'no ads' claims

### Fixed
- **MainActivity.java**: Added `WebViewClient` that intercepts external URLs and opens them via `Intent.ACTION_VIEW` (system browser). Only `localhost` and `cryptocalk.com` stay in WebView. Prevents users getting trapped on external sites.
- **Layout.astro**: Added global JS click interceptor as fallback for external links.
- **"No ads" claims removed** from EN homepage (hero + "What Is" prose) and all 5 localized homepages (ES/PT/TR/HI/RU FAQ + prose). Conflicts with AdSense setup.

### Added
- blockchain.info, etherscan.io, codetabs.com, whattomine.com to `allowNavigation` and `network_security_config.xml`

## [2026-04-04] (update 77) — fix: missing API domains, window.open for Capacitor

### Fixed
- **capacitor.config.ts**: Added `*.blockchain.info`, `*.etherscan.io`, `*.codetabs.com`, `*.whattomine.com` to `allowNavigation`
- **network_security_config.xml**: Added 4 API domains for Mining/GasFee/ASIC/GPU calculators
- **MarketCapComparator + WhatIfCalculator**: `window.open('_blank')` → `'_system'` with try/catch fallback

## [2026-04-04] (update 76) — fix: broken UI for Capacitor local loading v1.3

### Fixed
- **ShareCalculator.astro**: Detect `capacitor://` or `localhost` origin, always share `cryptocalk.com` URLs instead of internal scheme
- **Service Worker v3**: Removed remote background fetch from cryptocalk.com (caused CORS errors in Capacitor). Simplified to pure cache-first.
- **Layout.astro**: Removed SW background update triggers (visibilitychange)
- **network_security_config.xml**: Added googleapis.com, gstatic.com, googletagmanager.com, google-analytics.com, corsproxy.io
- Version bumped to 1.3 (versionCode 4)

## [2026-04-04] (update 75) — refactor: trim About page bloat, fix stale data

### Changed
- **About page**: Mission 3→2 paragraphs, author bio 3→2, removed "How We Build" section entirely, "Why Trust" 5 paragraphs → 4 compact bullets
- Removed "SEO & Content Strategy" highlight, removed "no ads" claim
- Updated "60+" → "69" calculators, dateModified → 2026-04-04

## [2026-04-04] (update 74) — feat: switch to local loading + offline-first SW

### Changed
- **Capacitor**: Removed `server.url` — app now loads from local `dist/` files instead of remote cryptocalk.com
- **Service Worker v2**: Offline-first strategy with background updates from live site
- Version bumped to 1.2 (versionCode 3)

## [2026-04-04] (update 73) — fix: GpuMining blockTime in calculate(), dead code cleanup

### Fixed
- **GpuMiningCalculator.tsx**: Fixed second hardcoded `86400/60` in `calculate()` (main results). ETC was 4.6x too low, KAS 60x too low.
- **HodlVsTradeCalculator.tsx**: Removed dead `tradeSize` variable
- **CompoundInterestCalculator.tsx**: Fixed label "APY" → "APR" (code compounds nominal rate)

## [2026-04-04] (update 72) — fix: 17 issues across 13 calculators

### Fixed (Critical)
- **ImpermanentLossCalculator**: IL now computed as % of HODL value (not initial investment)
- **GpuMiningCalculator**: Added per-coin `blockTime` (ETC 13s, RVN 60s, ERGO 120s, KAS 1s, FLUX 120s). Was hardcoded 60s.

### Fixed (High)
- **HodlVsTradeCalculator**: Interleave wins/losses instead of all-wins-then-losses
- **RoiCalculator**: Guard against NaN when ROI < -100%

### Changed (Stale data)
- DifficultyEstimator 85T→113T, ElectricityCost USA $0.13→$0.17, InflationHedge BTC 50%→20%, ReverseRoi XRP $70B→$130B, GweiConverter ETH $3000→$2327, HashrateConverter 600→850 EH/s, PipCalculator prices updated, GpuMining coin prices updated, MATIC→POL

### Fixed (Minor)
- **StakingRewardsCalculator**: Fee display uses grossRewards−netRewards
- **YieldFarmingCalculator**: 2 hardcoded EN strings wrapped with getUiString()

## [2026-04-04] (update 71) — feat: AdSense compliance

### Added
- **Privacy policy**: New Section 5 "Advertising" with Google AdSense disclosure, DART cookie, opt-out links
- **ads.txt**: Created with placeholder publisher ID
- **robots.txt**: Added Mediapartners-Google, AdsBot-Google, AdsBot-Google-Mobile

### Changed
- **CookieBanner**: Updated text in 6 languages to mention "personalised advertising"
- Privacy policy renumbered sections 5-10 → 6-11

## [2026-04-04] (update 70) — fix: trim 22 meta descriptions, 10 title/H1 mismatches

### Fixed
- 22 meta descriptions trimmed from 162-189 chars to under 160 chars
- 9 title tags aligned with H1 (added "Crypto" prefix)
- what-if: removed stale "| CryptoCalk" brand suffix
- yield-farming-calculator: added author byline + quick-answer box

## [2026-04-04] (update 69) — fix: byline + quick-answer on 2 pages, meta descriptions

### Added
- **halving-calculator**: Author byline, quick-answer box, trimmed meta desc
- **impermanent-loss-calculator**: Byline, quick-answer, expanded title to 49ch

### Fixed
- funding-rate: title aligned with H1 ("Crypto Funding Rate Calculator"), meta desc trimmed
- kelly, trade-expectancy, staking-rewards: meta descriptions expanded from <120ch

## [2026-04-04] (update 68) — fix: hreflang codes aligned with html lang

### Fixed
- Replaced regional hreflang codes (es-419, pt-BR, tr-TR, hi-IN, ru-RU) with simple language codes (es, pt, tr, hi, ru) to match `<html lang>`. Fixes 588 "Hreflang annotation invalid" + 99 "Hreflang and HTML lang mismatch" errors from Semrush.

## [2026-03-31] (update 73) — fix: stale default values in 8 calculator components

### Changed
- **DifficultyEstimatorCalculator.tsx**: Default difficulty 85T → 113T, pills [70,85,100,120] → [85,100,113,130], scenario presets updated
- **ElectricityCostCalculator.tsx**: USA avg rate 0.13 → 0.17, Germany rate 0.35 → 0.30
- **InflationHedgeCalculator.tsx**: BTC annualReturn 0.50 → 0.20, ETH 0.40 → 0.15, Argentina inflation 1.00 → 0.30, Turkey 0.50 → 0.38, Russia 0.09 → 0.08
- **ReverseRoiCalculator.tsx**: Bitcoin cap 1.9T → 1.7T, Solana 80B → 65B, XRP 70B → 130B, reordered XRP above Solana
- **GweiConverter.tsx**: ETH fallback price 3000 → 2327
- **HashrateConverter.tsx**: Bitcoin network hashrate ~600 EH/s → ~850 EH/s
- **PipCalculator.tsx**: BTC scenario price 65000 → 83000, ETH 3500 → 2327, XRP 0.6 → 2.20
- **MarketCapComparator.tsx**: MATIC symbol → POL (Polygon rebrand)

## [2026-03-31] (update 72) — fix: i18n hardcoded strings + staking fee calculation

### Fixed
- **YieldFarmingCalculator.tsx**: Wrapped hardcoded "Reset" button label and "Auto-calculates as you type..." hint with `getUiString()` for proper localization
- **StakingRewardsCalculator.tsx**: Fixed "Fees Paid to Validator" calculation for compound mode. Previously used `grossRewards * feeRate` which is only correct for simple interest; now computes fees as `grossRewards - rewardsEarned` (difference between full-APY and effective-APY rewards), giving accurate fee display for both compound and simple modes

## [2026-03-31] (update 68) — fix: meta descriptions and title/H1 mismatches

### Fixed
- **22 meta descriptions trimmed to under 160 characters**: tax-calculator, mining-calculator, satoshi-converter, apy-apr-calculator, hodl-vs-trade, roi-calculator, inflation-hedge, vesting-calculator, airdrop-calculator, exchange-fees, converter, liquidation-calculator, reverse-roi, risk-reward-calculator, nft-profit-calculator, position-size-calculator, dca-calculator, market-cap-comparator, salary-calculator, yield-farming-calculator, pip-calculator, tp-sl-calculator. Removed filler words and redundant phrases while keeping core message and "Free" prefix.
- **9 title/H1 mismatches fixed**: Added "Crypto" keyword to break-even, compound-interest, gas-fee, leverage, pip, portfolio, position-size calculator titles. Changed risk-reward to "Risk-Reward Ratio Calculator". Changed vesting to "Token Vesting Schedule Calculator".
- **what-if.astro title**: Removed `| CryptoCalk` suffix (brand appended by Layout.astro already)

## [2026-03-27] (update 66) — fix: broken API endpoints (CORS proxy, CoinCap, live data)

### Fixed
- **CORS proxy fallback** in `AsicMiningCalculator.tsx` and `GpuMiningCalculator.tsx`: corsproxy.io blocked by Cloudflare for WhatToMine requests. Added `api.codetabs.com/v1/proxy` as primary CORS proxy with corsproxy.io as fallback. Hardcoded data still used if both fail.
- **CoinCap removed** from `cryptoPriceService.ts`: api.coincap.io domain is completely down. Removed all CoinCap functions, mapping tables, and fallback chain entries. Price service now uses CoinGecko → CryptoCompare 2-tier fallback.

### Added
- **Live ETH gas price** in `GasFeeCalculator.tsx`: Fetches Etherscan V2 gas oracle (`SafeGasPrice`) and CoinGecko ETH/USD on mount for Ethereum network. Shows "LIVE" badge when data is fetched. Falls back to hardcoded defaults (1 Gwei, $2327) on failure.
- **Live BTC difficulty** in `MiningCalculator.tsx`: Fetches `blockchain.info/q/getdifficulty` in parallel with BTC price on mount. Parses the plain-number response and uses it instead of hardcoded 145T. Falls back to 145T on failure.
- Build: 935 pages, 0 errors

## [2026-03-27] (update 65) — i18n: 195 missing RU translation keys bulk fill

### Added
- **195 Russian translation keys** added to `src/i18n/ui-strings/ru.ts` in a single `// === Missing keys bulk fill (update 65) ===` block
- Covers 30+ calculator components: GpuMining, RiskReward, Loan, ImpermanentLoss, CryptoSalary, YieldFarming, MarketCap, PositionSize, GameFi, Portfolio, Rebalancing, TpSl, ApyApr, GasFee, HodlVsTrade, Lending, Node, AsicMining, BreakEven, CompoundInterest, Drawdown, FundingRate, IcoRoi, InflationHedge, Margin, Pip, Calmar, Halving, InformationRatio, Kelly, Liquidation, TradeExpectancy, CryptoUnit, DifficultyEstimator, ElectricityCost, Leverage, MarketCapComparator, MevProtection, ReverseRoi, RiskOfRuin, Sharpe, Slippage + shared keys
- No duplicate keys introduced (verified against existing 1392 entries)
- Build: 935 pages, 0 errors

## [2026-03-27] (update 63) — i18n: add missing translations for ROI, Airdrop, Vesting calculators

### Fixed
- **17 missing translation keys added to all 5 ui-strings files** (es, pt, tr, hi, ru):
  - **RoiCalculator** (3 keys): `Current Value / Exit Value`, `Total Fees Paid (optional)`, `Use investment presets and value multipliers for quick ROI scenarios.`
  - **AirdropCalculator** (11 keys): `Airdrop Token`, `Search or enter manually`, `Price at Receipt ($)`, `When you received the airdrop`, `Current Token Price ($)`, `Auto-filled if coin selected`, `Sold?`, `Sell Price ($)`, `Tax Jurisdiction`, `Fetching price...`, `Failed to fetch price. You can enter it manually.`
  - **VestingCalculator** (1 key): `Auto-calculates as you type. Use presets for a quick base schedule, then fine-tune cliff and duration with custom months.`
- All 3 calculator .tsx files already had `getUiString()` wrapping — the issue was missing dictionary entries causing English fallback on localized pages
- Build: 935 pages, 0 errors

## [2026-03-27] (update 62) — i18n: wrap hardcoded strings in 4 calculator components

### Fixed
- **HashrateConverter.tsx**: Wrapped `row.device` in TYPICAL_HASHRATES reference table with `getUiString()` (6 device names rendered in table rows)
- **RoiCalculator.tsx**: Wrapped `comp.name` in TRADITIONAL_ASSETS comparison table with `getUiString()` (5 asset names: S&P 500, Gold, Real Estate, US Bonds, Savings Account)
- **InflationHedgeCalculator.tsx**: Wrapped `asset.label` in toggle buttons, table rows, chart legend, and best performer highlight with `getUiString()`. Wrapped `c.name` / `country.name` in country buttons and info card. Fixed hardcoded `'year'`/`'years'` in period buttons to use `getUiString()`.
- **AirdropCalculator.tsx**: Wrapped `c.label` in TAX_COUNTRIES pill buttons with `getUiString()` (USA, UK, Germany, Australia, Canada)

### New keys needing translations (5 langs)
- **HashrateConverter**: `CPU (RandomX / Monero)`, `RTX 4090 (KawPow)`, `GPU on Ethash`, `Antminer S21 Hyd (SHA-256)`, `Bitcoin ASIC (SHA-256)`, `Bitcoin Network Total`
- **RoiCalculator**: `S&P 500`, `Gold`, `Real Estate`, `US Bonds`, `Savings Account`
- **InflationHedgeCalculator**: `USDC + Yield`, `Gold`, `S&P 500`, `Turkey`, `Argentina`, `Nigeria`, `USA`, `Russia`, `India`, `Brazil`, `UK`
- **AirdropCalculator**: `USA`, `UK`, `Germany`, `Australia`, `Canada`
- Note: BTC/ETH stay untranslated (brand names). Country names and asset names like "Real Estate" and "Savings Account" need translations.
- Build: 935 pages, 0 errors

## [2026-03-27] (update 58) — TaxCalculator & GasFeeCalculator i18n

### Fixed
- **TaxCalculator.tsx**: Wrapped 5 hardcoded render points with `getUiString()`: country names in dropdown, shortTermLabel/longTermLabel in holding period buttons, country name in results breakdown, holdingPeriodLabel in results, and FIFO/LIFO method descriptions.
- **GasFeeCalculator.tsx**: Wrapped network labels (Ethereum, Polygon, Arbitrum, Optimism, BNB Chain, Avalanche, Base) with `getUiString()` at all 4 render points: network buttons, hero subtitle, breakdown row, and fee comparison heading.

### Added
- **55 new keys x 5 langs** in es.ts, pt.ts, tr.ts, hi.ts, ru.ts: 17 country names, 18 unique holding period labels, 2 FIFO/LIFO method descriptions, 17 country tax notes, 7 network labels (kept as-is since they are brand names).
- Build: 935 pages, 0 errors

## [2026-03-27] (update 61) — Fix false live-API claims in SEO content

### Fixed
- **gas-fee-calculator.astro**: Removed false claim "uses live Etherscan data" (GasFeeCalculator has no Etherscan fetch). Replaced with "uses standard gas benchmarks".
- **mining-calculator.astro**: Removed false claim "live data from blockchain.info" (MiningCalculator only fetches BTC price from CoinGecko, not difficulty). Replaced with "live BTC price data from CoinGecko and up-to-date difficulty benchmarks".
- **calculator-seo-content.ts (gas-fee EN)**: Removed "pre-fills live Ethereum gas prices from the Etherscan oracle" and "live data auto-fills for Ethereum". Replaced with accurate manual-entry descriptions.
- **calculator-seo-content.ts (gas-optimization EN)**: Removed "fetched live from Etherscan". Replaced with manual benchmark description.
- **calculator-faq.ts (gas-fee, 5 langs)**: Fixed 10 false FAQ answers across es/pt/tr/hi/ru claiming Etherscan API integration. Replaced with accurate descriptions stating the calculator uses standard benchmarks with manual gas price input.
- **index.astro (EN homepage)**: Removed "blockchain.info" from 3 locations (schema FAQ, visible FAQ, about prose). CoinGecko is the only live API source.
- **[lang]/index.astro (5 localized homepages)**: Removed "blockchain.info" from 10 locations (whatIsProse + FAQ answer in es/pt/tr/hi/ru). Replaced with accurate "CoinGecko for prices; benchmarks for other data" wording.
- Build: 935 pages, 0 errors

## [2026-03-27] (update 60) — Fix API proxies and HalvingCalculator silent failure

### Fixed
- **AsicMiningCalculator.tsx**: Replaced dead `api.allorigins.win` CORS proxy with `corsproxy.io`. Removed `JSON.parse(data.contents)` wrapper since corsproxy.io returns the response directly.
- **GpuMiningCalculator.tsx**: Same allorigins-to-corsproxy migration for both `asic.json` and `coins.json` WhatToMine endpoints. Removed double-parse of `contents` wrapper.
- **HalvingCalculator.tsx**: Added `networkError` state so users see a red "Price fetch failed — enter manually" hint next to the BTC Price input when CoinGecko fetch fails (was silently swallowed with `.catch(() => {})`).

### Added
- **1 new UI string key x 5 languages** (`Price fetch failed — enter manually`) in es.ts, pt.ts, tr.ts, hi.ts, ru.ts.
- Build: 935 pages, 0 errors

## [2026-03-27] (update 59) — i18n: SatoshiConverter, HashrateConverter, GweiConverter, ExchangeFeeComparator labels

### Fixed
- **SatoshiConverter.tsx**: Wrapped 11 hardcoded English labels with `getUiString()`: `Input Mode`, `Satoshi` (button), `Amount (sats)` / `Amount (BTC)` / `Amount (USD)`, `Quick Amounts`, `Fiat Currency`, `BTC Price` (label), `Fetching...`, `Unavailable`, `Refresh`, `Updated`, `Reset`.
- **HashrateConverter.tsx**: Wrapped 8 hardcoded English labels with `getUiString()`: `Hash Rate Value`, `Enter hash rate...` (placeholder), `Unit`, `Quick Fill — Typical Devices`, 4 device quick-fill buttons (`CPU (RandomX) — 10 KH/s`, `RTX 4090 (KawPow) — 60 MH/s`, `GPU on Ethash — 100 MH/s`, `Antminer S21 Hyd — 335 TH/s`), `Reset`.
- **GweiConverter.tsx**: Wrapped 7 hardcoded English labels with `getUiString()`: `Amount`, `Unit`, `Quick Gwei Values`, `ETH Price (USD)`, `fetching...`, `Reset`, plus gas operation labels in the table via `getUiString(lang, op.label)`.
- **ExchangeFeeComparator.tsx**: Wrapped 4 hardcoded toggle button labels with `getUiString()`: `Spot`, `Futures`, `Maker`, `Taker`.

### Added
- **22 new UI string keys x 5 languages** (110 translations) in es.ts, pt.ts, tr.ts, hi.ts, ru.ts: `Input Mode`, `Satoshi`, `Amount (sats)`, `Amount (BTC)`, `Amount (USD)`, `Quick Amounts`, `Fiat Currency`, `Fetching...`, `Unavailable`, `Hash Rate Value`, `Enter hash rate...`, `Unit`, `Quick Fill — Typical Devices`, 4 device labels, `Quick Gwei Values`, `ETH Price (USD)`, `fetching...`, `DEX Swap`.
- Build: 935 pages, 0 errors

## [2026-03-27] (update 58) — i18n: GasFee TX labels, Mining unit, Airdrop tax notes

### Fixed
- **GasFeeCalculator.tsx**: Wrapped 10 TX_TYPES labels (`ETH Transfer`, `ERC-20 Transfer`, `ERC-20 Approve`, `DEX Swap (simple)`, `DEX Swap (multi-hop)`, `NFT Transfer`, `Bridge Transfer`, `Stake/Unstake`, `Contract Deploy`, `Custom Gas`) with `getUiString()` in both `<option>` dropdown and comparison table rows. Wrapped `Price (USD)` label for native token price input. Result hero also shows localized TX type name.
- **MiningCalculator.tsx**: Wrapped `Watts` unit text and period labels (`Daily`, `Weekly`, `Monthly`, `Yearly`) in results table and mobile cards with `getUiString()`.
- **AirdropCalculator.tsx**: Wrapped `taxConfig.note` with `getUiString()` so 5 TAX_COUNTRIES note strings are localizable.
- **FundingRateCalculator.tsx**: Confirmed interval labels (`3x / 8h`, `1x / 24h`) and period labels (`1 Day`, `1 Week`, etc.) were already wrapped in prior batch. No changes needed.

### Added
- **17 new UI string keys x 5 languages** (85 translations) in es.ts, pt.ts, tr.ts, hi.ts, ru.ts: 10 TX type labels, `Price (USD)`, `Watts`, and 5 tax jurisdiction notes.

### Build
- 935 pages, 0 errors

## [2026-03-27] (update 55) — i18n fixes: schema labels, guide toggle, 37 helper translations

### Fixed
- **Category hub schema "Calculators" localized**: `[lang]/calculators/[category].astro` CollectionPage and ItemList schema `name` fields now use per-language label (es/pt: Calculadoras, tr: Hesaplayıcılar, hi: कैलकुलेटर, ru: Калькуляторы) instead of hardcoded English
- **"Read full guide" / "Hide full guide" toggle localized**: `Layout.astro` inline script now reads `document.documentElement.lang` and picks translated toggle labels for all 6 languages

### Added
- **37 missing helper-text translations**: Added 36 unique `Auto-calculates as you type...` keys + 1 `network share` key to all 5 non-EN ui-strings files (es, pt, tr, hi, ru). Covers SlippageCalculator, NodeCalculator, TradeExpectancyCalculator, ReverseRoiCalculator, HalvingCalculator, RebalancingCalculator, AsicMiningCalculator, KellyCalculator, SharpeCalculator, MarketCapCalculator, PipCalculator, HodlVsTradeCalculator, GamefiCalculator, MiningCalculator, GpuMiningCalculator, DifficultyEstimatorCalculator, SortinoCalculator, IcoRoiCalculator, CryptoSalaryCalculator, MiningRoiCalculator, MarginCalculator, DrawdownCalculator, LendingCalculator, RiskOfRuinCalculator, GasFeeCalculator, CompoundInterestCalculator, CalmarCalculator, InflationHedgeCalculator, InformationRatioCalculator, FundingRateCalculator, LeverageCalculator, ApyAprCalculator, MevProtectionCalculator, ElectricityCostCalculator, PortfolioCalculator, LoanCalculator

### Build
- 935 pages, 0 errors

## [2026-03-27] (update 54) — Localized homepage content blocks, hero count fix

### Added
- **"What Is CryptoCalk?" prose section** on all 5 localized homepages (es, pt, tr, hi, ru): ~200 words per language with internal links to key calculators (profit, mining, DCA, tax, staking, methodology)
- **FAQ section (5 questions)** on all 5 localized homepages with translated Q&A and `FAQPage` JSON-LD schema
- **Creator credibility card** on all 5 localized homepages with localized "Built by" label, name, meta, and link
- **ItemList schema** (12 popular calculators) added to localized homepage JSON-LD
- **Organization schema** enriched on localized homepages: added logo, email, sameAs, founder, @id (matching EN)
- **WebSite schema** enriched: added @id, publisher, EntryPoint target format (matching EN)

### Fixed
- **EN homepage hero**: "60+" updated to "69" in badge, h1, title, description, schema descriptions
- **Localized homepage hero stat**: "50+" updated to "69"; replaced stats bar with trust statement (matching EN)
- **Localized homepage schema**: Removed invalid `areaServed: { "@type": "Country", name: "Global" }`

### Build
- 935 pages, 0 errors

## [2026-03-27] (update 53) — Category hub i18n, ElectricityCost presets, multi-sig localization

### Fixed
- **177 category hub grid titles**: Added `TOOL_NAME_OVERRIDES` for es (44), pt (44), tr (44), hi (44) in `category-hubs.ts`. ES trading-tools hub had 11/20 titles in English — now all localized. Added missing RU `mev-calculator` override.
- **ElectricityCostCalculator preset labels**: Wrapped `scenario.label` in `getUiString()` — "Home Miner", "Small Farm", "Low-Cost Host" now translate on localized pages.
- **"multi-sig" localized in seo-ext**: Replaced in 5 non-EN crypto-inheritance-calculator blocks (es→multifirma, pt→multi-assinatura, tr→çoklu imza, hi→मल्टी-सिग, ru→мультиподпись).

### Build
- 935 pages, 0 errors

## [2026-03-27] (update 51) — i18n: NftProfit, Uniswap, CryptoSalary label localization

### Fixed
- **NftProfitCalculator.tsx**: Wrapped 12 hardcoded English labels with `getUiString()`: Buy Price, Sell Price, Marketplace, Marketplace Fee (%), Creator Royalty (%), Gas Cost: Buy/Sell, ETH Price, Reset, Quick Scenarios, scenario labels (Starter Flip, Low Fee, High Gas), Auto-filled, Auto-fetched, input hint
- **UniswapCalculator.tsx**: Wrapped 10 hardcoded English labels with `getUiString()`: Deposit Amount (USD), Pool TVL (USD), Pool Daily Volume (USD), Fee Tier, Price Move (%), Farming Period (days), Quick Scenarios, scenario labels (Stable Pair, Blue-Chip LP, High-Vol LP), Reset, input hint
- **CryptoSalaryCalculator.tsx**: Wrapped scenario labels (DCA BTC, ETH Heavy, USDT Payroll) and frequency labels (Weekly, Bi-weekly, Monthly) with `getUiString()`

### Added
- **23 new UI string keys x 5 langs** in es.ts, pt.ts, tr.ts, hi.ts, ru.ts: Sell Price, ETH Price, Auto-fetched, Starter Flip, Low Fee, High Gas, NFT hint text, Deposit Amount (USD), Pool TVL (USD), Pool Daily Volume (USD), Fee Tier, Farming Period (days), Stable Pair, Blue-Chip LP, High-Vol LP, Uniswap hint text, DCA BTC, ETH Heavy, USDT Payroll, Calculator Mode, Annual Salary, Pay Frequency, Refresh Prices

## [2026-03-27] (update 50) — Localized quickAnswer for 39 remaining calculators

### Added
- **195 localized quickAnswer strings**: Added es, pt, tr, hi, ru translations for all 39 calculators that had EN quickAnswer but were missing non-EN versions. Calculators: loan, pip, portfolio, mining-roi, electricity-cost, difficulty, hashrate-converter, timestamp-converter, unit-converter, uniswap, bridge-comparator, mev, gamefi, sortino, calmar, treynor, information-ratio, kelly, var, drawdown, risk-of-ruin, slippage, trade-expectancy, bitcoin-unit-converter, cross-chain-bridge, crypto-correlation, crypto-index-fund, crypto-inheritance, crypto-portfolio-rebalance, crypto-sentiment, defi-yield-aggregator, dust-attack, exchange-fee-comparator, flash-loan, gas-optimization, governance-voting, nft-rarity, token-unlock, whale-alert. Total quickAnswer entries now: 504 (84 EN × 6 languages). Build verified: 935 pages, 0 errors.

## [2026-03-27] (update 49) — i18n fixes: Calmar labels, HODL presets, 2 custom FAQs

### Fixed
- **Calmar Calculator scenario labels i18n**: Wrapped `scenario.label` with `getUiString()` in CalmarCalculator.tsx so "Defensive", "Balanced", "Growth", "High Risk" buttons display translated text on localized pages
- **Calmar Calculator rating labels i18n**: Added `Weak` and `Excellent` translations to all 5 ui-strings files (were missing, causing English fallback on RU/ES/PT/TR/HI pages)
- **HODL vs Trade preset labels i18n**: Wrapped `scenario.label` with `getUiString()` in HodlVsTradeCalculator.tsx so "Bull HODL", "Active Edge", "Choppy Tape" buttons display translated text

### Added
- **8 new UI string keys × 5 langs**: `Defensive`, `Balanced`, `Weak`, `Excellent`, `Bull HODL`, `Active Edge`, `Choppy Tape` added to es.ts, pt.ts, tr.ts, hi.ts, ru.ts
- **Custom FAQ for lending-calculator**: 6 EN questions + full translations for es, pt, tr, hi, ru (36 Q&A pairs total). Topics: safe LTV ratio, CeFi vs DeFi, liquidation mechanics, stablecoin yields, rate determination, tax treatment
- **Custom FAQ for compound-calculator**: 6 EN questions + full translations for es, pt, tr, hi, ru (36 Q&A pairs total). Topics: optimal compounding frequency, APY vs APR, daily vs monthly, compound interest risks, Rule of 72, gas fee impact

## [2026-03-27] (update 48) — Author bylines & Quick Answer boxes on 7 custom EN pages

### Added
- **Author byline on 7 custom EN pages**: Added `<div class="calc-byline">` with "By Konstantin Iakovlev · Updated {buildDate}" to funding-rate-calculator.astro, hodl-vs-trade.astro, inflation-hedge.astro, what-if.astro, exchange-fees.astro, nft-profit-calculator.astro, salary-calculator.astro
- **Quick Answer boxes on 7 custom EN pages**: Added `<div class="quick-answer">` with calculator-specific summaries (sourced from calculator-seo-content.ts) above the first SEO H2 on all 7 pages
- **buildDate constant**: Added `const buildDate = new Date().toISOString().split('T')[0];` to frontmatter of all 7 pages

## [2026-03-27] (update 47) — Localized Quick Answers, author bylines, UI string gaps

### Added
- **100 localized quickAnswer strings**: Added `quickAnswer` field in 5 non-EN languages (es, pt, tr, hi, ru) for top 20 calculators in `calculator-seo-content.ts`. Previously all ~866 non-EN pages showed English Quick Answer text. Calculators: profit, mining, DCA, tax, staking, ROI, converter, liquidation, position-size, break-even, gas-fee, impermanent-loss, compound-interest, margin, leverage, halving, risk-reward, tp-sl, staking-rewards, sharpe.
- **Author byline on 4 custom EN pages**: Added `<div class="calc-byline">` to profit-calculator.astro, mining-calculator.astro, dca-calculator.astro, tax-calculator.astro. These pages were created before the shared template got the byline feature.
- **7 missing UI string keys per language**: Added `ASIC Miner`, `Power Consumption`, `Electricity Cost`, `Hardware Cost (optional)`, `Quick Select`, `Or search any coin`, `Auto-Compound` to all 5 non-EN ui-strings files.

### Fixed
- **MiningCalculator.tsx hardcoded Reset**: Wrapped in `getUiString(lang, 'Reset')` so it translates on localized pages
- Total quickAnswer entries in file: 185 (69 EN + 100 non-EN + type definition)

### Build
- Type-check passes with 0 new errors

## [2026-03-27] (update 46) — Deep Russian translation quality audit & fixes

### Fixed
- **14 Cyrillic-slug 404 links** in calculator-seo-ext.ts: 5 RU calculator entries used Cyrillic URL slugs (e.g., `/ru/калькулятор-прибыли-криптовалют/`) that don't exist — replaced with correct Latin transliterated slugs (`/ru/kalkulyator-pribyli-kripto/`)
- **8 untranslated UPPERCASE TaxCalculator labels**: Added COUNTRY, INCOME BRACKET, HOLDING PERIOD, BUY/SELL PRICE, QUANTITY, ACCOUNTING METHOD + auto-calc hint to all 5 language files (es, pt, tr, hi, ru). Tax calculator form was showing English labels on all non-EN pages.
- **6 severely truncated RU ui-strings**: Restored full translations for trade-expectancy, LP model, staking, Uniswap, position-size, and market-cap disclaimers that had been reduced to generic stubs
- **11 short RU meta descriptions**: Expanded risk/analytics calculator descriptions from <100 chars to 130+ chars, added "Бесплатный" prefix for consistency with other 57 RU descriptions
- **Gender agreement error**: `меньший проскальзывание` → `меньшее проскальзывание` (neuter) in calculator-seo-content.ts
- **5 inaccurate RU translations**: "Рост цены" → "Изменение цены", "Ценность в USD" → "Стоимость в USD", "Время в пути" → "Ожидаемое время", "Здоровый" → "В норме", "Ваша месячная стоимость" → "Ваши ежемесячные расходы"
- **Anglicisms replaced**: "Лайв оценка" → "Оценка в реальном времени", "Крипто-аллокация" → "Распределение криптоактивов", "аллокейшн" → "распределение" (2x in seo-content), "круче" → "значительно эффективнее", "банковским холдом" → "удержанием позиции (buy-and-hold)", "индикатор" → "бенчмарк"
- **Redundant parentheticals removed**: "Газ (Gas)" → "Газ"

### Build
- 935 pages, 0 errors

## [2026-03-27] (update 45) — Translation quality audit & fixes (6 changes)

### Fixed
- **seo-body-text.ts PT garbled text**: Rewrote 7 of 10 Portuguese SEO body sections (scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation) that contained incoherent word salad. Replaced with proper Portuguese translations matching EN source text structure and meaning.
- **seo-body-text.ts HI foreign character leaks**: Replaced Korean character `외부` (U+C678 U+BD80) with Hindi `बाहरी` on line 220, and Bengali `বাঁচা` with Hindi `बचा` on line 224.
- **ui-strings/ru.ts empty translation**: Fixed `'a': ''` → `'a': 'а'` (was rendering blank text).
- **ui-strings/ru.ts duplicate key**: Removed duplicate `'This is a constant-product estimate...'` entry at line 881 (shorter truncated version); kept the full translation at line 44.
- **ui-strings/es.ts HTML entities**: Converted 7 `&rarr;` HTML entities to Unicode `→` (were rendering literally in React). Removed duplicate `'Join F2Pool Mining Pool'` key. Added missing `'Total Return': 'Retorno Total'` key.
- **calculator-seo-ext.ts 170 non-localized links**: Fixed internal `<a href>` links across 12 calculator entries × 5 non-EN languages that pointed to English URL paths (e.g., `/mining-calculator/`) instead of localized paths (e.g., `/es/calculadora-mineria-bitcoin/`). Affected calculators: halving, risk-of-ruin, slippage, trade-expectancy, sharpe, sortino, calmar, treynor, information-ratio, kelly, var, drawdown.

### Added
- **4 missing ui-string translations**: Propagated keys for MarginCalculator, CryptoSalaryCalculator, GasFeeCalculator, PortfolioCalculator disclaimers to pt.ts, tr.ts, ru.ts, hi.ts (were ES-only, other langs fell back to English).

### Build
- 935 pages, 0 errors

## [2026-03-22] (update 44) — Full SEO audit implementation (4 changes)

### Added
- **Quick Answer boxes on all 69 EN calculators**: Added `quickAnswer` field to `CalcOverride` type in `calculator-seo-content.ts`. Each of 69 calculators now has a 1-2 sentence extractable summary with concrete formulas/examples (e.g., "Crypto profit = (Sell − Buy) × Qty − Fees..."). Quick Answer renders above the first SEO section via `LocalizedCalculatorPage.astro`. Non-EN pages fall back to EN quick answer. CSS already existed in `calculator-page.css`.
- **Visible author bylines on all calculator pages**: Added `.calc-byline` div with "By Konstantin Iakovlev" linked to `/about/`, plus "Updated {buildDate}" — localized for all 6 languages (By/Por/Yazan/लेखक/Автор). Added `author` Person schema to `webPageSchema` in `LocalizedCalculatorPage.astro`. CSS in `calculator-page.css`.

### Changed
- **ui-strings split by language**: Broke monolithic 424KB `ui-strings.ts` into per-language modules (`ui-strings/es.ts`, `pt.ts`, `tr.ts`, `hi.ts`, `ru.ts`) + tiny `ui-string-registry.ts`. EN pages now load zero translation data. Localized pages get only their language inlined via `define:vars`. Net savings ~100KB gzipped per localized page.
- **6 missing calculator-seo-ext entries**: compound-interest, gas-fee, leverage, loan, portfolio, staking-rewards — 8 sections × 6 languages × 2 paragraphs = 576 new paragraphs. Eliminates 36 thin/template pages.

### Build
- 935 pages, 0 errors

## [2026-03-22] (update 43) — SEO extended content for 6 missing calculators

### Added
- **6 new calculator-seo-ext.ts entries**: compound-interest-calculator, gas-fee-calculator, leverage-calculator, loan-calculator, portfolio-calculator, staking-rewards-calculator. Each entry has 8 unique sections (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation) × 6 languages (en, es, pt, tr, hi, ru) = 576 new paragraphs total.
- **EN entries include 2-3 internal cross-links each**: Links to related calculators (profit, DCA, staking, liquidation, APY/APR, break-even, tax, position-size, mining, bridge, slippage, compound-interest, funding-rate). No self-links.
- **Localized entries use correct localized slugs** for internal links (e.g., `/es/calculadora-beneficio-cripto/`, `/pt/calculadora-recompensas-staking/`).
- Content covers concrete numbers (BTC $73,700, ETH $2,330, gas benchmarks 3 Gwei, DeFi rates 3-8% APY), actionable guidance, risk framing, and validation procedures.
- Build verified: 935 pages, 0 errors.

## [2026-03-22] (update 42) — Split monolithic ui-strings.ts into per-language modules

### Changed
- **ui-strings.ts split**: Broke the 5,151-line monolithic `ui-strings.ts` (424KB) into modular architecture:
  - `src/i18n/ui-string-registry.ts` — lightweight registry + `getUiString` function (230 bytes client-side)
  - `src/i18n/ui-strings/es.ts`, `pt.ts`, `tr.ts`, `hi.ts`, `ru.ts` — per-language dictionaries (~1,000 lines each)
  - `src/i18n/ui-strings-all.ts` — SSR-only barrel import for build-time rendering
  - `src/i18n/ui-strings.ts` — backward-compatible re-export shim (unchanged import path for 64 calculator components)
- **Client bundle reduction**: Eliminated the 424KB (120KB gzipped) shared `ui-translations` JS chunk. EN pages now load zero translation data. Localized pages get their language strings inlined in HTML via `define:vars` (~73KB uncompressed, ~15-20KB gzipped).
- **manualChunks updated**: Replaced single `ui-translations` chunk rule with per-language chunk rules + `ui-string-registry` in `astro.config.mjs`.
- **LocalizedCalculatorPage.astro**: Added SSR import of `ui-strings-all.ts`, per-language dict imports for serialization, and inline `<script>` that registers strings in `window.__uiStringRegistry` before React hydration.
- Build verified: 935 pages, 0 errors.

## [2026-03-22] (update 41) — Content quality & E-E-A-T audit fixes

### Fixed
- **Privacy policy**: Removed false AdSense/DoubleClick claims from Section 4 (site has no ads). Updated heading from "Cookies, Analytics and Advertising" to "Cookies and Analytics". Added Google Analytics opt-out link.
- **Privacy policy GDPR/CCPA**: Added explicit GDPR (EEA) and CCPA/CPRA (California) language to Section 8 (Your Rights). Added `dateModified` to WebPage schema. Updated lastUpdated to 22/03/2026.
- **H1→H3 heading skip**: Fixed `<h3>Worked Example</h3>` → `<h2>` on profit-calculator page.
- **Tax readability**: Shortened tax-loss harvesting section from 3 long paragraphs to 3 concise paragraphs. Reduced average sentence length.
- **Mining readability**: Shortened "How Mining Profitability Works" section. Replaced verbose sentences with shorter, clearer ones.

### Added
- **Tax disclaimer**: Added prominent "not tax/financial advice" disclaimer box on tax-calculator page before Capital Gains Formula section.
- **Quick Answer boxes**: Added to profit, mining, tax, and DCA calculator pages. Concise, AI-extractable summary at top of SEO content. Styled with `.quick-answer` class in calculator-page.css.
- **Source citations**: Added IRS links (Virtual Currency FAQ, Topic 409) on tax page. Added Vanguard study citation on DCA page (lump-sum vs DCA research). Added blockchain.info API link on mining page.
- **Homepage prose**: Added "What Is CryptoCalk?" section (~200 words) with quantified claims (69 calculators, 6 languages, 935 pages, client-side computation) and 7 contextual internal links.
- **Homepage FAQ**: Added 5-question FAQ section with FAQPage schema (free to use, privacy, accuracy, supported cryptos, creator). Both visible `<details>` and JSON-LD in sync.
- **Creator credibility card**: Added compact "Built by Konstantin Iakovlev — 10+ years in finance & crypto" card on homepage with link to About page.
- **Trading-tools hub FAQ**: Expanded from 3 to 6 questions (EN only). Added questions about position sizing for futures, Sharpe ratio benchmarks, and Kelly Criterion + position sizing workflow.
- **75 localized internal links**: Added contextual anchor links to 5 top calculators (converter, profit, mining, DCA, tax) across 5 non-EN languages (es, pt, tr, hi, ru). 3 links per calculator per language.
- **Section heading variation**: Added per-calculator heading overrides for 10 EN calculators (profit, mining, tax, DCA, staking, liquidation, converter, gas, position-size, break-even). Varies 2-3 section headings per calculator to reduce template uniformity signal across ~935 pages.

### Build
- 935 pages, 0 errors

## [2026-03-22] (update 40) — Localized internal links in calculator-seo-ext.ts

### Added
- **75 contextual internal links** across 5 top calculators (converter, profit, mining, DCA, tax) in 5 non-EN languages (es, pt, tr, hi, ru) — 3 links per calculator per language
- Links use correct localized slugs for each language (e.g., `/es/calculadora-beneficio-cripto/`, `/ru/калькулятор-прибыли-криптовалют/`)
- Links target related calculators: profit, tax, DCA, converter, staking, break-even
- Anchor text in each link is written in the appropriate language
- Links inserted naturally into existing paragraphs without changing meaning

### Build
- TypeScript: 0 new errors (file type-checks clean)

## [2026-03-22] (update 39) — Schema audit fixes (score 82→~90)

### Added
- `public/logo-200x200.png` — PNG raster logo (200×200) for Google Knowledge Panel (replaces SVG)
- **WebPage schema** with `speakable` on all ~935 calculator pages (EN via Layout.astro, localized via LocalizedCalculatorPage.astro)
- **@id cross-references** across Organization, WebSite, WebApplication, WebPage entities

### Fixed
- Organization `logo` → PNG raster (Google requires PNG/JPG, not SVG)
- Organization `founder` → linked Person with `@id` to About page
- WebSite `publisher` → linked Organization via `@id`
- Homepage WebApplication: added `datePublished`/`dateModified` (was missing)
- EN calculator `dateModified` → "2026-03-22" across 35 .astro pages (was hardcoded "2026-03-09")
- `operatingSystem` → "All" on localized pages (was "Web", inconsistent with EN)

### Build
- 935 pages, 0 errors

## [2026-03-22] (update 38) — Full SEO Audit implementation (score 75.6→~85)

### Added
- `public/llms.txt` — llms.txt file for AI search discoverability (GEO)
- `public/robots.txt` — explicit AI crawler rules: allow GPTBot/ClaudeBot/PerplexityBot, block CCBot/Google-Extended/Bytespider
- `public/.htaccess` — security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), immutable cache for hashed assets, HTML edge caching for Cloudflare
- `public/7397f0c5ed569a8e602961eac8858f4b.txt` — IndexNow API key
- `index.astro` — SoftwareApplication schema on homepage, Organization sameAs (X, GitHub, LinkedIn)
- `about.astro` — BreadcrumbList schema (Home > About Us)
- `calculator-faq.ts` — 25 new calculator FAQ entries × 5 languages = 750 Q&A pairs (476→1,526 lines)
- `calculator-seo-ext.ts` — 16 unique seo-ext entries × 6 languages = ~2,817 lines of unique content (9,701→12,518 lines). Eliminates duplicate-content issue on: bitcoin-unit-converter, cross-chain-bridge, correlation, index-fund, inheritance, portfolio-rebalance, sentiment, defi-yield-aggregator, dust-attack, exchange-fee-comparator, flash-loan, gas-optimization, governance-voting, nft-rarity, token-unlock, whale-alert

### Fixed
- **Security headers not served** — `_headers` file was ignored by Plesk; now using `.htaccess` rules
- **Organization logo** — changed from OG card (1200×630) to ImageObject with favicon.svg (200×200)
- **Organization areaServed** — removed invalid AdministrativeArea "Worldwide"
- **dateModified hardcoded** — LocalizedCalculatorPage now uses dynamic build date instead of "2026-03-09"
- **Sitemap lastmod** — removed identical-date lastmod (was misleading; Google ignores uniform dates)
- **Internal links in localized pages** — seo-body-text links now localized via getLocalizedPath() (was sending ES/PT/TR/HI/RU users to EN pages)
- **ASIC miner table date** — "2024-2025" → "2025-2026" in mining-calculator.astro
- **x-powered-by: PleskLin** — suppressed via .htaccess Header unset

### Changed
- **Hreflang** — updated to language-region codes: es→es-419, pt→pt-BR, tr→tr-TR, hi→hi-IN, ru→ru-RU
- **H2 heading anchors** — all 12 SEO section headings on ~800 localized pages now have slugified `id` attributes for deep linking / AI citation
- **Vite manualChunks** — isolated ui-translations into separate chunk to reduce ErrorBoundary mega-bundle (412KB → split)
- **Hashed asset cache** — max-age from 4 hours to 1 year (immutable) for content-hashed JS/CSS
- **HTML edge caching** — added s-maxage=86400 for Cloudflare CDN edge caching

### Reports
- `FULL-AUDIT-REPORT.md` — comprehensive 7-category SEO audit (score: 75.6/100)
- `ACTION-PLAN.md` — 28 prioritized recommendations

## [2026-03-22] (update 37) — 16 new seo-ext entries (all 6 languages)

### Added
- **16 calculator-seo-ext.ts entries**: bitcoin-unit-converter, cross-chain-bridge-calculator, crypto-correlation-calculator, crypto-index-fund-calculator, crypto-inheritance-calculator, crypto-portfolio-rebalance-calculator, crypto-sentiment-calculator, defi-yield-aggregator, dust-attack-calculator, exchange-fee-comparator, flash-loan-calculator, gas-optimization-calculator, governance-voting-calculator, nft-rarity-calculator, token-unlock-calculator, whale-alert-calculator
- Each entry has 8 unique sections (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation) × 6 languages (en, es, pt, tr, hi, ru)
- EN entries include 2–3 contextual internal links per calculator to related tools (profit, DCA, gas, tax, staking, position-size, etc.)
- All content uses specific numbers, benchmarks, and actionable advice — no generic filler
- File grew from 9,701 lines to 12,518 lines (62 → 78 calculator entries)

## [2026-03-22] (update 36) — Non-EN content quality audit

### Fixed
- **Turkish corrupted text** (ui-strings.ts:2117): Garbled "Ağ yoğunlk (Kzım T Cns..." replaced with proper Turkish translation for block estimate disclaimer
- **Hindi English leak** (ui-strings.ts:3138): Removed stray English word "conditional" from Hindi "No price data" string
- **Russian mixed script** (ui-strings.ts:4162): Fixed EN key containing Cyrillic "и" → "and"; rewrote incomplete Russian translation to fully cover routing, MEV, oracle lag, and liquidity changes

### Verified
- ES/PT: 600+ entries — 0 issues found, professional quality
- TR/HI/RU: 3 issues fixed, remaining content clean
- All 15 live pages (3 calcs × 5 langs) fully localized, 0 console errors
- Build: 935 pages, 0 errors

## [2026-03-22] (update 35) — UI/UX audit: performance, anti-patterns, accessibility

### Fixed — Performance (/optimize)
- **`transition: all` → specific properties**: 9 instances replaced with targeted `border-color`, `color`, `background-color`, `transform` transitions
- **`filter: blur(4px)` removed from `resultSnap` keyframe**: Eliminated expensive GPU compositing per frame
- **`will-change` added**: `transform, opacity` on `.result-hero-value`, `width` on `.liq-gauge-fill`
- **`backdrop-filter` reduced on mobile**: `blur(12px)` → `blur(8px)` for mobile viewports

### Fixed — Accessibility (/harden)
- **Touch target**: `.portfolio-asset-remove` now has `min-height: 44px; min-width: 44px` (was ~24px)

### Fixed — Theming (/normalize)
- **Hardcoded feature icon colors → CSS classes**: 4 inline `style` attributes in `index.astro` replaced with `.feature-icon--green/cyan/amber/pink` classes using CSS variables
- **Gauge gradient**: Replaced 2 hardcoded hex colors (`#f59e0b`, `#f97316`) with `var(--color-accent-amber)`, `var(--color-accent-orange)`
- **Duplicate `.legend-box` CSS removed**: First definition (hardcoded `#10b981`, `#ef4444`) deleted; second (CSS variables) kept

### Fixed — Anti-Patterns (/distill, /typeset)
- **Hero metrics bar removed**: "60+ / 6 / 0 / <1s" vanity stats replaced with trust statement "Free, open tools — no signup, no ads, no data collection."
- **Gradient text removed**: `.text-gradient` class deleted; "Crypto" heading now uses solid `.hero-accent` color
- **Fonts replaced**: Inter → DM Sans (body), Space Grotesk → Plus Jakarta Sans (display). Both distinctive, less AI-associated

### Fixed — Responsive (/adapt)
- **Small fonts 0.7rem → 0.75rem**: 6 instances (12px minimum) for labels, suffixes, asset headers

### Fixed — Polish
- **Gap spacing normalized**: `gap: 10px` → `gap: 12px` (11 instances, aligns with 4px grid)
- **`!important` removed**: ~25 instances in mobile media query section (background agent)

### Verified
- Build: 935 pages, 0 errors
- Zero console errors in preview
- New fonts load correctly (DM Sans, Plus Jakarta Sans)

## [2026-03-22] (update 34) — Deep audit: math bugs, a11y, SEO, title dedup

### Fixed
- **Division by zero in LiquidationCalculator**: `marginRatio` now guards `initialMargin > 0` (line 258)
- **Division by zero in BreakEvenCalculator**: `loss >= 100` returns Infinity with "∞ (unrecoverable)" display instead of NaN (lines 42, 62, 248, 271, 320)
- **Division by zero in ImpermanentLossCalculator**: Guarded `(1 + relativeRatio)` denominator (line 130)
- **NaN/Infinity in LiquidationCalculator**: `formatUSD()` and `formatPercent()` now return "—" for non-finite values
- **Brand duplication in 39 EN page titles**: Removed `| CryptoCalk` and `— CryptoCalk` from all 39 `.astro` files in `src/pages/`. Brand is handled by Layout.astro only.
- **5 short meta descriptions expanded**: information-ratio, risk-of-ruin, sharpe, slippage, sortino — all now 120+ chars in EN

### Added
- **`prefers-reduced-motion`**: Global CSS media query disables all animations and transitions for users with motion sensitivity (WCAG 2.1 Level A)
- **`aria-pressed`**: Added to Quick Scenario pill buttons and Long/Short toggle in ProfitCalculator.tsx for screen reader state announcement

### Verified
- Build: 935 pages, 0 errors (6.42s)
- Zero console errors in preview

## [2026-03-22] (update 33) — Content quality audit fixes

### Fixed
- **Timestamp example error**: Fixed `1711929600` conversion from "12:00 UTC" to correct "00:00 UTC" in `calculator-seo-ext.ts`
- **Cookie banner misleading AdSense text**: Removed "serve personalised ads via Google AdSense" from all 6 language variants in `CookieBanner.astro` — site has no ads. Text now says "improve your experience"
- **Halving #4 priceAfter18m**: Changed projected $126,000 to actual ~$84,000 (Oct 2025 is now historical) in `HalvingCalculator.tsx`
- **Gas cost wording**: Changed "typical in 2025–2026" to "low-congestion periods" for 3 Gwei gas benchmark in `calculator-seo-ext.ts`
- **Network hashrate**: Updated from 800 EH/s to 850 EH/s in `HalvingCalculator.tsx` constant + disclaimer, and all 5 language translations in `ui-strings.ts`

### Added
- **404 page i18n**: Client-side language detection from URL prefix (`/es/`, `/pt/`, etc.) swaps heading, copy, button labels, and link hrefs into es/pt/tr/hi/ru. Previously showed English on all localized 404s
- **Share Calculation button i18n**: Translated button label + "Copied to clipboard!" toast into all 6 languages via `ShareCalculator.astro` data attributes
- **Quick Scenario label i18n**: "BTC Long +20%", "ETH Short", "SOL Qty Trade" now pass through `getUiString()` with translations in all 5 non-EN languages in `ui-strings.ts`
- **Sitemap lastmod**: Added `serialize` option to `@astrojs/sitemap` in `astro.config.mjs` — all URLs now include `<lastmod>` date

### Verified
- Build: 935 pages, 0 errors
- TypeScript: clean compilation

## [2026-03-21] (update 32) — 16 missing seo-content entries for new calculators

### Added
- **16 new calculator-seo-content entries**: Added unique `how` + `inputs` content (2 paragraphs each, all 6 languages) for bitcoin-unit-converter, cross-chain-bridge-calculator, crypto-correlation-calculator, crypto-index-fund-calculator, crypto-inheritance-calculator, crypto-portfolio-rebalance-calculator, crypto-sentiment-calculator, defi-yield-aggregator, dust-attack-calculator, exchange-fee-comparator, flash-loan-calculator, gas-optimization-calculator, governance-voting-calculator, nft-rarity-calculator, token-unlock-calculator, whale-alert-calculator. Total entries: 69 → 85. Each entry includes specific numbers, practical advice, and calculator-specific terminology.

### Verified
- TypeScript: no new errors
- All 16 slugs match SPEC_CALCULATOR_SLUGS in utils.ts

## [2026-03-21] (update 31) — Comprehensive content audit fixes

### Fixed
- **Canonical link fix**: Replaced 3 broken `/staking-rewards-calculator/` links with `/staking-calculator/` in `seo-body-text.ts` and `about.astro`
- **English text leaks in seo-ext.ts**: Translated ~800 paragraphs across 10 calculators (hodl-vs-trade, satoshi-converter, timestamp-converter, crypto-loan, halving, mev, gamefi, node, salary, gwei-converter) in all 5 non-EN languages. Each had English text mixed with target-language boilerplate.

### Added
- **16 new localized calculator entries**: Added bitcoin-unit-converter, cross-chain-bridge, correlation, index-fund, inheritance, portfolio-rebalance, sentiment, defi-yield-aggregator, dust-attack, exchange-fee-comparator, flash-loan, gas-optimization, governance-voting, nft-rarity, token-unlock, whale-alert to CALCULATOR_META (96 title/desc pairs), utils.ts (localized URL slugs), alias definitions, category map, and related calculators. Build: 754 → 919 pages.
- **6 missing seo-content entries**: Added compound-interest, gas-fee, leverage, loan, portfolio, staking-rewards to calculator-seo-content.ts (63 → 69 entries, all 6 languages)
- **11 risk/analytics seo-ext entries**: sharpe, sortino, calmar, treynor, information-ratio, kelly, var, drawdown, risk-of-ruin, slippage, trade-expectancy (51 → 62 entries, 6 langs × 8 sections × 2 paragraphs each = ~1,056 new paragraphs)
- **2 missing tools in category hub**: Sharpe and Calmar added to trading-tools grid (18 → 20)

### Verified
- Build: 919 pages, 0 errors
- TypeScript: clean compilation
- All meta descriptions ≤ 160 characters (no fix needed)

## [2026-03-21] (update 30) — SEO extended content for 4 risk metric calculators

### Added
- **4 new entries in `calculator-seo-ext.ts`**: Added unique extended SEO content for `information-ratio-calculator`, `kelly-calculator`, `var-calculator`, and `drawdown-calculator`. Each entry covers all 6 languages (EN, ES, PT, TR, HI, RU) with 8 sections x 2 paragraphs per section. EN paragraphs include 2-3 contextual HTML links to related calculators (sharpe, drawdown, var, risk-reward, position-size, impermanent-loss, calmar). Non-EN paragraphs are fully translated with matching links. Content includes specific benchmark numbers (IR thresholds 0.2/0.5/1.0, Kelly fractional sizing 10-50%, VaR daily benchmarks 3-5% for BTC, drawdown history BTC 83%/54%/77%), practical crypto scenarios (DeFi yield farming IR, correlated bet Kelly adjustment, portfolio VaR budgeting, drawdown recovery asymmetry), and common mistakes (inappropriate benchmarks, win rate overestimation, normal distribution assumptions, unrealized loss blindness). Total calculator-seo-ext entries: 62 (was 58).

## [2026-03-21] (update 29) — SEO extended content for 4 ratio calculators

### Added
- **4 new entries in `calculator-seo-ext.ts`**: Added unique extended SEO content for `sharpe-calculator`, `sortino-calculator`, `calmar-calculator`, and `treynor-calculator`. Each entry covers all 6 languages (EN, ES, PT, TR, HI, RU) with 8 sections x 2 paragraphs per section. EN paragraphs include 2-3 contextual HTML links to related calculators (sortino, drawdown, risk-reward, calmar, dca, position-size, tp-sl, var). Non-EN paragraphs are fully translated with matching links. Content includes specific benchmark numbers (Sharpe 0.5 average / 1.0 good / 2.0+ hedge-fund tier, Sortino-to-Sharpe ratio interpretation, Calmar benchmarks by strategy type, Treynor with BTC beta examples), practical crypto portfolio scenarios, and common calculation mistakes (period mismatch, annualization errors, inappropriate benchmarks). Total calculator-seo-ext entries: 58 (was 54).

## [2026-03-21] (update 28) — SEO extended content for 3 trade risk calculators

### Added
- **3 new entries in `calculator-seo-ext.ts`**: Added unique extended SEO content for `risk-of-ruin-calculator`, `slippage-calculator`, and `trade-expectancy-calculator`. Each entry covers all 6 languages (EN, ES, PT, TR, HI, RU) with 8 sections x 2 paragraphs per section. EN paragraphs include 2-3 contextual HTML links to related calculators (kelly, drawdown, position-size, risk-reward, gas, exchange-fees, impermanent-loss). Non-EN paragraphs are fully translated with matching links. Content includes specific numbers, formulas, and practical crypto trading examples (e.g., ruin probability at different risk levels, slippage benchmarks by market cap tier, expectancy formula breakdowns). Total calculator-seo-ext entries: 54 (was 51).

## [2026-03-21] (update 27) — SEO content for 6 missing calculators

### Added
- **6 new entries in `calculator-seo-content.ts`**: Added localized `how` and `inputs` SEO sections for `compound-interest-calculator`, `gas-fee-calculator`, `leverage-calculator`, `loan-calculator`, `portfolio-calculator`, `staking-rewards-calculator`. Each entry covers all 6 languages (EN, ES, PT, TR, HI, RU) with calculator-specific content (60-120 words per section). EN entries have full two-paragraph format; non-EN entries use compact single-line format matching existing style. These calculators had EN pages but were missing from the SEO content map, meaning localized pages fell back to generic boilerplate text.

## [2026-03-21] (update 26) — 16 new calculator meta entries (i18n)

### Added
- **16 new calculator slugs in `utils.ts`**: Added `bitcoin-unit-converter`, `cross-chain-bridge-calculator`, `crypto-correlation-calculator`, `crypto-index-fund-calculator`, `crypto-inheritance-calculator`, `crypto-portfolio-rebalance-calculator`, `crypto-sentiment-calculator`, `defi-yield-aggregator`, `dust-attack-calculator`, `exchange-fee-comparator`, `flash-loan-calculator`, `gas-optimization-calculator`, `governance-voting-calculator`, `nft-rarity-calculator`, `token-unlock-calculator`, `whale-alert-calculator` to `SPEC_CALCULATOR_SLUGS`.
- **Localized URL slugs for 16 calculators x 5 languages**: Added natural-language URL slugs in `LOCALIZED_SPEC_SLUGS` for es, pt, tr, hi, ru. Examples: `calculadora-ataque-dust` (es), `calculadora-ponte-cross-chain` (pt), `kripto-korelasyon-hesaplayici` (tr), `flash-loan-calculator-hindi` (hi), `kalkulyator-dust-ataki` (ru).
- **CALCULATOR_META entries for 16 calculators x 6 languages** (96 title+description pairs): Each entry has a 130-160 character keyword-rich description with CTA. Covers EN, ES, PT, TR, HI, RU.
- **ALIAS_DEFINITIONS entries for 16 calculators** in `[lang]/[...slug].astro`: Enables localized page generation for new slugs (pages render with SEO content; calculator widgets to be added later).
- **RELATED_CALCULATORS entries for 16 new + 6 previously missing calculators** in `related-calculators.ts`: Each new calculator mapped to 4 topically related calculators.
- **CALCULATOR_CATEGORY entries for 16 new calculators** in `calculator-category-map.ts`: Mapped to appropriate category hubs for breadcrumb navigation.
- Build verified: 919 pages (up from 754), no errors.

## [2026-03-21] (update 25) — Design identity refresh

### Changed
- **Color system: Indigo → Teal/Cyan**: Replaced entire indigo primary color palette (`#6366f1`) with teal (`#0891b2` light / `#22d3ee` dark). Updated CSS custom properties in global.css, hardcoded RGBA values across 14 page files, and inline styles in 5 component files. Eliminates the most common "AI-generated design" visual marker.
- **Typography: Space Grotesk + JetBrains Mono**: Added Space Grotesk (600/700) as display font for all h1/h2/h3 headings — geometric, techy character vs generic Inter. Added JetBrains Mono (600/700) for calculator result values (`.result-hero-value`, `.result-value`, `.stat-value`) with `font-variant-numeric: tabular-nums`. Creates two-font visual hierarchy and "precision calculator" identity.
- **Accent gradient**: Updated `--color-accent-purple` from `#6d28d9` to `#0e7490` (deep teal) for cohesive gradient endpoints on CTA buttons and logo text.

### Added
- **Dot grid hero background**: Subtle radial-gradient dot pattern (`24px` grid, `opacity: 0.05` light / `0.07` dark) on homepage hero section via `::before` pseudo-element. Adds texture without clutter. Applied to both EN and localized homepages.
- **Result snap-in animation**: CSS `@keyframes resultSnap` with spring-curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on `.result-hero-value` and `.result-hero-roi`. Numbers slide up with slight overshoot and blur-to-sharp transition (0.4s). Works across all 57 calculators without any React component changes.

## [2026-03-19] (update 24) — Mobile usability audit fixes

### Fixed
- **Horizontal overflow on 59 calculator pages**: Added `max-width: 100%` and `overflow: hidden` to `.calc-input-panel` and `.calc-results-panel`. Form panels no longer expand beyond mobile viewport (375px).
- **Table overflow on ~40 pages**: Added `display: block; overflow-x: auto` to tables inside `.calc-mobile-ux .calculator-section`. Tables now scroll horizontally instead of breaking layout.
- **Breadcrumb wrapping on localized pages**: Made `.breadcrumb .section-container` horizontally scrollable with `white-space: nowrap; overflow-x: auto`. No more 74px-tall double-line breadcrumbs on ES/RU/HI/TR/PT pages.
- **Touch targets < 44px**: Increased `min-height: 44px` on breadcrumb links, footer links, and FAQ `<summary>` elements across all pages.
- **Tiny text (< 12px)**: Changed `fontSize: '0.65rem'` → `'0.75rem'` in 6 components (GweiConverter, LoanCalculator, PortfolioCalculator, StakingRewardsCalculator, ApyAprCalculator, MiningRoiCalculator). Changed `'0.6rem'` → `'0.7rem'` in LoanCalculator slider labels.

### Not an issue (confirmed OK)
- iOS Safari input zoom: all inputs already ≥ 16px font
- Dark mode on mobile: works correctly

## [2026-03-19] (update 23) — Homepage SEO & accessibility improvements

### Added
- **SearchAction schema**: Added `potentialAction: SearchAction` to WebSite JSON-LD schema with `?q={search_term_string}` URL template. Enables Google Sitelinks Search Box in SERP.
- **ItemList schema**: Added structured data listing 12 popular calculators with positions and URLs, improving rich result eligibility.
- **bento-featured 2-column span**: Featured category cards now span 2 grid columns on desktop for visual hierarchy. Responsive fallback to 1 column on mobile.

### Fixed
- **areaServed schema**: Removed invalid `"@type": "Country", "name": "Global"` from WebSite schema. Kept `AdministrativeArea: Worldwide` in Organization schema.
- **Emoji accessibility**: Added `aria-hidden="true"` to decorative emojis in "Popular Calculators" heading and 4 feature icon divs. Screen readers no longer announce "fire", "lock", etc.
- **Footer link**: Changed "All Categories" from `#categories` to `/#categories` (works from any page).

## [2026-03-19] (update 22) — Remove duplicate brand from calculator titles

### Fixed
- **Duplicate brand in titles**: Removed `| CryptoCalk` and `— CryptoCalk` from all 306 titles in `calculator-meta.ts`. Brand was appearing twice ("Calculator Name | CryptoCalk — CryptoCalk") because Layout.astro and LocalizedCalculatorPage.astro already append brand automatically. Affects all 6 languages × 51 calculators.

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
