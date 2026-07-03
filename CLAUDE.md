# CRYPTOCALK (cryptocalk.com) — project context

Crypto calculator site. **Astro 5 + React 19**, multilingual (`src/pages/[lang]`, `src/i18n/ui-strings/*`).
~131 calculators. Hosting: static (Astro build). 9th fleet site on the constants pipeline.

## Changelog / updates page (ALWAYS keep current)
- **After every user-facing data fix or new feature on the site, add a short changelog entry** (if
  appropriate — i.e. users would notice/care; skip purely internal/infra changes). Two surfaces, keep in sync:
  - **EN:** `src/pages/updates.astro` — plain-HTML `<article class="update-entry">`, newest at the top.
  - **Locales (es/pt/tr/hi/ru):** `src/pages/[lang]/updates.astro` — add an `UpdateEntry` object
    (`{date, dateLabel, title, body, items?, footer?}`) at the top of EACH locale's `updates: [` array (translate).
  - Bump `dateModified` in `updates.astro`'s `webPageSchema`. Write for end users (plain language), not devs.
  - Do NOT falsify historical totals/dates; add a new dated entry rather than rewriting old ones.

## Architecture — where constants live
- **Calculator logic + constants are in `src/components/*.tsx`** (React islands), NOT the `src/pages/*.astro`
  pages (those are SEO/markup shells that mount the components). **Apply value fixes to the `.tsx`.**
- Live market data (BTC price, difficulty, mining yields) comes from APIs (`src/utils/cryptoPriceService.ts`,
  whattomine/CoinGecko) — not static constants.

## Regulatory constants (tax rates, protocol facts)
**READ `CONSTANTS-PILOT-2026-06.md` before touching any constant.**

- **Inventory / ledger:** `src/data/regulatory-constants.canonical.json` — **101 constants** (79 regulatory,
  22 formula/market). ⚠️ Audit ledger — **NOT imported by the site**; fix the `.tsx`, then reconcile.
- **The regulatory surface is narrow.** Most calculators are pure-math/trading (Kelly, VaR, drawdown, Sharpe,
  margin, ROI) or live-market — **no regulatory constants**. The regulatory core is just two kinds:
  1. **Per-country crypto TAX rules** (17 jurisdictions): `TaxCalculator.tsx` (`COUNTRIES` config),
     `TaxLossHarvestingCalculator`, `InheritanceTaxCalculator` (8 countries), `CryptoInheritanceCalculator`,
     and a hidden `TAX_COUNTRIES` table in `AirdropCalculator.tsx`.
  2. **BTC/ETH/altcoin PROTOCOL facts**: `MiningCalculator`, `HalvingCalculator`, `Asic/GpuMiningCalculator`,
     `MiningRoiCalculator`, `ValidatorCalculator`, `StockToFlowCalculator`, `DustAttackCalculator`,
     `StakingRewardsCalculator` (block reward, halving schedule, 21M supply, 32-ETH validator, dust 546).

### State as of 2026-06-30 (DATA_HUB recheck — 9 flagged, LLM-verified + adversarial)
- **2026-06-30**: monitor flagged 9 sources → workflow web-verified all. **7 current, 2 stale fixed + DEPLOYED**:
  **KAS** blockReward `0.2596 → 2.49` (the 2026-06-23 value was 10× too low — `~2.596` is the per-BLOCK
  reward at 10 BPS, NOT per-second; corrected); **FLUX removed** from GpuMiningCalculator (PoUW v2 hard fork
  at block 2,020,000 ~Oct 2025 eliminated GPU mining entirely; Flux now Proof-of-Nodes, 14 FLUX/30s).
  Cosmetic: UK CGT note year `2025/26 → 2026/27`. Ledger reconciled (FLUX status=removed, us.brackets synced
  to 2026). Confirmed current: BTC 3.125, dust 546, AU no-inheritance, ETH 32, UK 18/24%, US 2026 brackets,
  AU 12-mo CGT discount (⚠ 50% discount to be replaced by CPI-indexation + 30% min tax from 1 Jul 2027 —
  announced, recheck before then). minerstat shows anomalous KAS ~55 / FLUX ~7 — monitor should key off
  whattomine, not minerstat.
### State as of 2026-06-23 (Tier-2 RE-VERIFIED + FIXED + DEPLOYED)
- **79 regulatory web-verified**: now **78 current · 1 uncertain** (+22 formula/market not verifiable).
- **All 21 Tier-2 "stale" re-verified via web, fixed in the `.tsx`, and DEPLOYED 2026-06-23** — site
  (cryptocalk.com) + OTA 1.6.4; ledger `regulatory-constants.canonical.json` reconciled (0 stale remaining).
  Fixed: US estate $13.99M→$15M (OBBBA) & CryptoInheritance $12.92M→$15M; US 2026 single-filer brackets;
  FR 30→31.4; IT 26→33; DE/NL 2026 brackets (DE €12,348/€69,879; NL €59,357 / 2.16%); CA 66.67%-cancelled→50;
  BR 17.5% flat (MP1303 rejected Oct 2025)→progressive 15–22.5%; KR ₩50M→₩2.5M; JP inheritance +50% band
  (¥300–600M); airdrop UK CGT 20→24; 7 altcoin block rewards (ZEC 1.5625, RVN 1250, ERGO 3, ETC 2.048,
  FLUX 18.75, DASH 1.77, KAS 0.2596 @ 10 BPS post-Crescendo). **BTC/ETH core protocol = all current.**
- Monitored by DATA_HUB: Tier-1 weekly (`cryptocalk-monitor-config.json`, 79 constants) — realistically
  **calendar-driven** (tax = gov-WAF sources; protocol = halving calendar) + Tier-2 quarterly (next 8 Jul 2026).
  Dashboard «Полный пилот». Loop: alert → fix `.tsx` → build → deploy.

## Deploy — ТОЛЬКО через scripts/deploy.sh
- **Полный `bash scripts/deploy.sh`** (или `--no-build`) — mirror в ПРАВИЛЬНОМ порядке (ассеты → HTML,
  оба докрута `dist/` + `httpdocs/`, CF purge). **НИКОГДА не деплоить точечными `lftp put`:** `put` без
  `-o <полный remote-путь>` кладёт файл в удалённую CWD под своим basename. Так 23–30.06.2026 корневой
  `index.html` был затёрт копией `/es/calculadora-impuestos-cripto/index.html` (главная ≥10 дней отдавала
  Google испанский tax-калькулятор с canonical на ES; найдено и исправлено 2026-07-03).

## Key crypto context
- BTC block reward **3.125** (4th halving Apr 2024, block 840,000); next halving block **1,050,000 → 1.5625**
  (~Apr 2028). Max supply 21M. ETH validator activation **32 ETH** (EIP-7251 raised MAX to 2048, not the floor).
- US: crypto = property; no wash-sale (currently); long-term ≥1yr. Germany: >1yr held = tax-free + €1,000
  Freibetrag. Canada: 50% inclusion (66.67% over $250k was cancelled 2025-03-21).
