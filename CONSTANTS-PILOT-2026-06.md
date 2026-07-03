# cryptocalk.com — Constants pilot & 2026 freshness (handoff)

Session log + living reference for the regulatory-constants pilot run **2026-06-23** from the
DATA_HUB session. Repo: `CRYPTOCALK` (**Astro 5 + React 19**, multilingual). **Ninth fleet site on
the full pipeline** (after calk24.de, calk-usa.com, calk.kz, calk-au.com, calk.nz, calk-ca.com,
calks.uk, calk.kg). Special case: **crypto + cross-jurisdiction** (per-country tax + protocol facts).

---

## TL;DR — current state

| Thing | State |
|---|---|
| Constants | **101** canonical (`src/data/regulatory-constants.canonical.json`) — sweep of the in-scope components (3 agents). **79 regulatory**, 22 formula/market. |
| ⚠️ Surface is narrow | cryptocalk is mostly **formula/market calculators** (Kelly, VaR, drawdown, margin, Sharpe, ROI…) with NO regulatory constants. The regulatory core = **per-country crypto TAX rules** (17 jurisdictions: TaxCalculator/TaxLossHarvesting/InheritanceTax/CryptoInheritance + a hidden `TAX_COUNTRIES` in AirdropCalculator) + **BTC/ETH/altcoin PROTOCOL** facts (Mining/Halving/Asic/Gpu/Validator/StockToFlow/DustAttack). |
| Where values live | **`src/components/*.tsx`** (React islands). The `src/pages/*.astro` are SEO shells — NOT where the math/constants are. Apply fixes to the `.tsx` components. |
| Freshness | **79 regulatory web-verified** (5 source-topic agents vs 2026 IRS/HMRC/BMF/ATO/NTA/CRA + BTC/ETH consensus): **57 current · 21 stale · 1 uncertain**. The 22 formula/market are not single-value-verifiable. |
| Monitoring | Tier-1 weekly server monitor (`cryptocalk-monitor-config.json`, 79 constants / 53 sources). NB most tax sources are the same gov-WAF sites (irs.gov/gov.uk/ato/canada.ca) → **largely calendar-only in practice**; protocol/altcoin best tracked by **halving calendar** + Tier-2. + Tier-2 quarterly. |
| Dashboard | cryptocalk.com = **«Полный пилот»** (9th), `pipeline=full`, `monitored=true`. |
| **Deployed?** | ❌ **NOT deployed.** Verification only — no fixes applied. Verdicts saved in `.tier2-verify-2026-06-23/verdicts.json`. |

## 1. The 21 stale (fix targets — all in `src/components/*.tsx`)

**Altcoin block rewards (8)** — halved/decayed since coded (overwritten by live API when it responds; surface on fallback):
- `AsicMiningCalculator` ZEC 2.5→**1.5625**, DASH 2.31→**~1.55**
- `GpuMiningCalculator` RVN 2500→**1250** (halved 15 Jan 2026), ERGO 27→**~3** (tail floor), ETC 2.56→**2.048**, FLUX 37.5→**18.75**, KAS 200→**~55**

**2026 tax changes (US/EU):**
- US estate-tax exemption **$13.99M (2025) → $15,000,000** (OBBBA, permanent from 2026) — wrong in BOTH `InheritanceTaxCalculator` AND `CryptoInheritanceCalculator` (latter still has 2023 $12.92M).
- `TaxCalculator` US brackets = 2025 thresholds → 2026 (12%→$50,400 … 37%→$640,601).
- France PFU 30→**31.4%** (PLFSS 2026), Italy 26→**33%** (Bilancio 2026), NL Box-3 threshold 57684→**59357** + rate 2.12→**2.16**, Germany Grundfreibetrag 12084→**12348** + 42% band → 69879.

**APAC/Americas:**
- Canada `ca.brackets` + `ca.capital_gains_inclusion_rate`: the 66.67%-over-$250k tier was **CANCELLED 2025-03-21** → 50% inclusion (2 keys).
- Brazil `br.flat_rate` 17.5% **never enacted** (PM 1303 rejected) → progressive 15–22.5%.
- Korea `kr.annual_exemption` ₩50M → **₩2.5M** (₩50M is the listed-stock deduction).
- Japan `InheritanceTaxCalculator` rates missing the **50% bracket** (¥300M–600M).
- `AirdropCalculator` TAX_COUNTRIES: UK CGT → **24%**.

**1 uncertain:** `InheritanceTaxCalculator` DE Steuerklasse III 30%→50% breakpoint shown at €600k vs ErbStG §19 **€6,000,000** (likely config typo — verify).

## 2. What's CURRENT (don't touch)
BTC/ETH core protocol all confirmed: block reward 3.125 (4th halving, block 840,000), next halving block 1,050,000 → 1.5625 (~Apr 2028), 21M supply, 144 blocks/day, ETH 32-ETH validator activation (EIP-7251 raised MAX balance to 2048 but not the 32 floor), dust 546 sats. UK 18/24% + £3,000 AEA, Germany 1-yr rule + €1,000 Freibetrag, Australia 50% CGT discount, India 30%+1% TDS+4% cess, Japan misc-income 15–55% (20% flat is only a proposal), Korea 22% delayed to 2027.

## 3. Monitoring (DATA_HUB server)
- **Tier-1 weekly** (`constants_freshness_monitor.py`): `cryptocalk-monitor-config.json` (79 constants, 51 annual tax / 28 rare protocol). Realistically **calendar-driven** — the tax sources are gov-WAF sites; protocol = halving calendar (next BTC halving ~Apr 2028; altcoin halvings have known heights).
- **Tier-2 quarterly** (8 Jan/Apr/Jul/Oct): add cryptocalk.com to the fleet verify SITES list. Next **8 Jul 2026**.
- Dashboard: mydatahub.duckdns.org/dashboard → 🧮 Calculators (cryptocalk.com = «Полный пилот»).
- Loop: alert/drift → fix in the `.tsx` component → build → deploy.

## 4. Pending / TODO
- [ ] **Apply the 21 fixes** to `src/components/*.tsx` (Phase 4). Verdicts + official values in `.tier2-verify-2026-06-23/verdicts.json`. Priority: the 2026 tax changes (US estate $15M, FR/IT/CA/BR) and the inheritance $12.92M→$15M inconsistency; altcoin rewards self-heal when the live mining API responds but are wrong on fallback.
- [ ] **Deploy** after fixes.
- [ ] Verify the DE inheritance €600k vs €6M breakpoint (uncertain).
