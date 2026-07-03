# CryptoCalk — Google Play listing (copy-paste into Play Console → Main store listing)

## App details
- **App name** (30 chars): `CryptoCalk: Crypto Calculators`  *(30 — at the limit)*
- **Package:** `com.cryptocalk.calculator`
- **Category:** Finance  ·  **Tags:** calculators, cryptocurrency, finance
- **Content rating:** Everyone
- **Default language:** English (United States)  ·  also localized: ES, PT, TR, HI, RU
- **Contains ads:** Yes (AdMob — banner + interstitial)  ·  **In-app purchases:** No

## Short description (80 chars max)
```
128 free crypto calculators: P&L, DeFi, mining, tax. Offline, no sign-up.
```
*(73 chars)*

## Full description (4000 chars max)
```
CryptoCalk puts 128 free cryptocurrency calculators in your pocket — for trading, DeFi, mining, taxes and portfolio planning. No sign-up and no paywall.

Everything runs entirely on your device, so it works 100% offline — crunch numbers on the train, in a meeting or out of range. And when a formula or network parameter changes, the app updates itself automatically, so your numbers stay current without waiting for a store update.

📈 TRADING & P&L
• Profit / Loss, ROI and break-even
• Futures: liquidation price, leverage, funding rate
• Position size and risk-per-trade
• Dollar-cost-averaging (DCA) and average entry

🌾 DEFI & YIELD
• APY / APR and compound interest
• Staking and yield-farming returns
• Impermanent loss and liquidity provision
• Airdrop value, bridge and gas-fee tools

⛏️ MINING & ON-CHAIN
• Mining profitability, ASIC ROI and electricity cost
• Difficulty and break-even estimators
• Gas fees and on-chain metrics

📊 PORTFOLIO & TAX
• Portfolio rebalancing and correlation
• Crypto tax estimates
• Converter across coins and fiat
• And many more across 9 categories

✨ MADE FOR MOBILE
• 100% offline — your numbers never leave your device
• Light and dark mode
• Clean breakdowns that show exactly how each number is worked out
• Available in 6 languages (English, Spanish, Portuguese, Turkish, Hindi, Russian)

CryptoCalk is free to use. It provides estimates for general information only and is not financial, investment or tax advice. It does not connect to any exchange or wallet, and it never holds or moves your funds or crypto.
```

## Graphics (upload separately in Play Console)
- **App icon (512×512):** `hi-res-icon-512x512.png`
- **Feature graphic (1024×500):** `feature-graphic-1024x500.png`  *(regenerate to match the new brand/count if desired)*
- **Phone screenshots (1242×2208, 9:16):** `screenshots-android/` — 6 shots:
  1. `01-hero` — 128 crypto calculators / value prop
  2. `02-profit` — Profit / Loss (ROI 46.4%)
  3. `03-offline` — works offline + auto-updates
  4. `04-app-features` — save / favorite / share / dark mode
  5. `05-yield` — staking / APY
  6. `06-categories` — 9 categories, 128 calculators

  > Play requires 2–8 phone screenshots, PNG/JPEG, each side 320–3840px, max aspect 2:1.
  > 1242×2208 (1.78:1) is compliant. The older `screenshot-*.png` / `0X-*.png` in this
  > folder are the previous set — replace them with `screenshots-android/`.

## Release notes (What's new) for v1.6 / versionCode 11
6-language notes (EN/ES/PT/TR/HI/RU). EN (do NOT claim "no ads" — the app now serves AdMob):
```
What's new in 1.6
• Fixed calculation accuracy in several tools (on-chain metrics, looping yield, sentiment & more)
• Correct number formatting and translations across all languages
• Smoother, faster pages — display glitches fixed
• Improvements now arrive automatically, so fixes reach you sooner
```

## Notes
- Title/short/full above are the DEFAULT (en-US). Localized listings (es/pt/tr/hi/ru) can be
  translated later; the app UI itself is already localized.
- Ads: the Android app uses **AdMob** (banner + interstitial) via @capacitor-community/admob —
  App ID `ca-app-pub-4859241862365215~7817677190`; ad units in `src/components/AdMobAds.astro`.
  Set **Contains ads = Yes**, and in **Data safety** declare the Advertising ID + usage data
  collected for "Advertising or marketing". (Web-only AdSense was removed from the app.)
- iOS does NOT show ads yet — gated off until a real iOS AdMob app ID + ad units exist.
- Recommended before scaling: add a UMP/GDPR consent message in AdMob for EEA/UK users.
