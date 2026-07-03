# CryptoCalk — App Store listing (copy-paste into App Store Connect)

## App information
- **Name** (30): `CryptoCalk: Crypto Calculators`  *(30 chars — at the limit)*
- **Subtitle** (30): `DCA, staking, gas, mining, P&L`  *(30 chars)*
- **Bundle ID:** `com.cryptocalk.calculator`
- **SKU:** `cryptocalk-ios`
- **Primary category:** Finance  ·  **Secondary:** Utilities
- **Age rating:** 4+
- **Primary language:** English (U.S.)  ·  Localized UI also ships in ES, PT, TR, HI, RU

## URLs
- **Marketing:** https://cryptocalk.com/
- **Support:** https://cryptocalk.com/contact/
- **Privacy Policy:** https://cryptocalk.com/privacy/
- **Terms (optional EULA):** https://cryptocalk.com/terms/

## Promotional text (170, editable anytime without review)
```
128 free crypto calculators — DCA, staking, mining, gas, futures and tax. Works fully offline, no account, and updates itself when formulas or rates change.
```

## Keywords (100, comma-separated — do NOT repeat words used in Name/Subtitle)
```
bitcoin,ethereum,profit,roi,apy,apr,yield,defi,airdrop,futures,leverage,funding,converter,portfolio,tax
```

## Description
```
CryptoCalk puts 128 free crypto calculators in your pocket — for trading, DeFi, mining, taxes and portfolio planning. No sign-up, no paywall, no ads pushing tokens at you.

It works 100% offline: run any calculation on the train, in a meeting or out of range. And when a formula, fee schedule or network parameter changes, the app refreshes itself automatically — so your numbers stay current without waiting for a store update.

TRADING & P&L
• Profit/Loss, ROI and break-even
• Futures: liquidation price, leverage, funding rate, basis
• Position size and risk-per-trade
• Dollar-cost-averaging (DCA) and average entry

DEFI & YIELD
• APY/APR and compound interest
• Staking and yield-farming returns
• Impermanent loss and concentrated liquidity
• Airdrop, bridge and gas-fee tools

MINING & ON-CHAIN
• Mining profitability, ASIC ROI and electricity cost
• Difficulty and break-even estimators
• Energy and on-chain metric tools

PORTFOLIO, TAX & LIFE
• Portfolio rebalancing and correlation
• Crypto tax estimates and salary/DCA planning
• Converter across coins and fiat
• Inheritance, card-cashback and more

MADE FOR THE APP
• Fully offline calculations
• Light and dark mode
• Available in 6 languages (EN, ES, PT, TR, HI, RU)

Every tool shows a clear breakdown so you can see exactly how each number is worked out.

CryptoCalk is free to use. It provides estimates for general information only and is not financial, investment or tax advice. It does not connect to any exchange or wallet and never moves funds.
```

## What's New (v1.6 — first iOS release)
```
Welcome to CryptoCalk for iPhone and iPad — 128 free crypto calculators for trading, DeFi, mining, taxes and your portfolio. Works fully offline, in 6 languages, with light and dark mode. Calculator updates now arrive automatically. More tools on the way.
```

## Screenshots — sizes App Store Connect requires

**iPhone 6.9"/6.7" — 1290 × 2796** (covers all modern iPhones). Suggested order:
1. `01-hero.png`   — "128 crypto calculators" value prop
2. `02-pnl.png`    — Profit/Loss or futures liquidation
3. `03-offline.png`— works offline + auto-updates (our differentiator)
4. `04-defi.png`   — staking / APY / yield
5. `05-mining.png` — mining profitability
6. `06-categories.png` — breadth across categories

**iPad 13" — 2048 × 2732** (required: app is universal iPhone + iPad):
1. `01-hero.png`  2. `02-pnl.png`  3. `03-offline.png`  4. `04-categories.png`

> To skip iPad entirely, set `TARGETED_DEVICE_FAMILY = 1` in the Xcode target and rebuild —
> then the iPad screenshot tab disappears. Currently universal (`1,2`).

## Review notes (paste into "Notes" for the reviewer)
```
CryptoCalk is a free collection of cryptocurrency calculators (P&L, DeFi yield,
mining, tax, conversion). All calculations run on-device and work offline. The app
is informational only: it does NOT connect to any exchange or wallet, does not place
trades, and never holds or transfers funds or crypto.

The app loads its own bundled web content and can refresh that content (calculator
formulas/parameters) over the air via our own server — standard for Capacitor apps,
interpreted JS/HTML/CSS only, and it does not change the app's purpose (compliant with
Guidelines 2.5.2 and 3.3.2). No account or login is required.
```

## Notes for the publisher
- Apple Developer **Team:** SRKYS78RMQ (same as the rest of the Calk network) — already set in the Xcode project.
- Register the App ID `com.cryptocalk.calculator` in App Store Connect before first upload
  (automatic signing in Xcode will create it on first archive if you're signed in).
- Build/version: **MARKETING_VERSION 1.6 / build 1** (bump the build number on every re-upload).
- OTA: the iOS app uses the SAME endpoint as Android (`https://ota.cryptocalk.com/updates.php`)
  and the SAME web bundle — no separate backend. Next OTA push for either platform: `npm run ota:publish 1.6.1`.
