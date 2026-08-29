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

---

## Russian listing (ru-RU)

> Moved here from the former root-level `play-store-listing.md` (2026-08-25) so there is a single
> source of truth. The old file claimed "69+ калькуляторов / без рекламы" — both were wrong for the
> shipped build and were being quoted back by AI search engines.

**Short description (80 chars max)**
```
128 бесплатных крипто-калькуляторов: P&L, DeFi, майнинг, налоги. Офлайн.
```

**Full description (4000 chars max)**
```
CryptoCalk — 128 бесплатных калькуляторов для всего, что связано с криптовалютами: прибыль и убыток, майнинг, DCA, налоги, стейкинг, газовые комиссии, ликвидация, конвертеры и многое другое.

Без регистрации и без платных тарифов. Все вычисления выполняются прямо на вашем устройстве, поэтому приложение работает полностью офлайн. Когда меняется формула или сетевой параметр, приложение обновляет себя автоматически.

ПРИБЫЛЬ И УБЫТОК
• Калькулятор прибыли/убытка, ROI и точки безубыточности
• Фьючерсы: цена ликвидации, плечо, ставка финансирования
• Размер позиции и риск на сделку
• Усреднение (DCA) и средняя цена входа

СТЕЙКИНГ И DEFI
• APY / APR и сложные проценты
• Награды за стейкинг и yield farming
• Непостоянный убыток и предоставление ликвидности
• Стоимость аирдропа, мосты и газовые комиссии

МАЙНИНГ И ON-CHAIN
• Прибыльность майнинга, ROI ASIC и стоимость электроэнергии
• Оценка сложности и точки безубыточности
• Газовые комиссии и on-chain метрики

ПОРТФЕЛЬ И НАЛОГИ
• Ребалансировка портфеля и корреляция
• Оценка налога на криптовалюту
• Конвертер монет и фиатных валют
• И многое другое — всего 9 категорий

ДЛЯ МОБИЛЬНЫХ
• Полностью офлайн — ваши цифры не покидают устройство
• Светлая и тёмная темы
• Подробная разбивка: видно, как получено каждое число
• 6 языков: английский, испанский, португальский, турецкий, хинди, русский

РЕКЛАМА И ДАННЫЕ
Приложение бесплатное и содержит рекламу (AdMob: баннер и межстраничная). Рекламный идентификатор используется для показа рекламы. Введённые вами значения расчётов остаются на устройстве и никуда не отправляются.

CryptoCalk даёт оценки исключительно в информационных целях и не является финансовой, инвестиционной или налоговой рекомендацией. Приложение не подключается к биржам и кошелькам и никогда не хранит и не перемещает ваши средства.
```

## Keywords / tags

crypto calculator · bitcoin calculator · DCA calculator · crypto profit calculator · crypto tax calculator

**Primary category:** Finance  ·  **Secondary tag:** Tools

---

## Release notes — 1.7 (versionCode 12), 2026-08-25

> Play limit: 500 characters per language. Paste into Play Console → Release → What's new.

**en** (426 chars)
```
What's new in 1.7
• Calculators based on tax law or protocol rules now show where each number came from and when it was last verified
• In the EEA, UK and Switzerland the app now asks for ad consent, with an "Ad privacy settings" button to change it any time
• Corrected our own wording: free, no sign-up, no paywall — funded by ads
• Mining rewards updated for Dash, Zcash and Ethereum Classic
• Search fixes and faster pages
```

**es** (461 chars)
```
Novedades de la 1.7
• Las calculadoras basadas en normativa fiscal o de protocolo ahora muestran de dónde sale cada cifra y cuándo se verificó
• En el EEE, Reino Unido y Suiza pedimos tu consentimiento para los anuncios, con un botón para cambiarlo cuando quieras
• Corregimos nuestra descripción: gratis, sin registro ni muro de pago, financiada con publicidad
• Recompensas de minería actualizadas (Dash, Zcash, ETC)
• Búsqueda corregida y páginas más rápidas
```

**pt** (443 chars)
```
Novidades da 1.7
• Calculadoras baseadas em lei tributária ou regras de protocolo agora mostram de onde vem cada número e quando foi verificado
• No EEE, Reino Unido e Suíça pedimos seu consentimento para anúncios, com um botão para alterá-lo quando quiser
• Corrigimos nossa descrição: grátis, sem cadastro nem paywall, financiado por anúncios
• Recompensas de mineração atualizadas (Dash, Zcash, ETC)
• Busca corrigida e páginas mais rápidas
```

**tr** (455 chars)
```
1.7 sürümündeki yenilikler
• Vergi hukukuna veya protokol kurallarına dayanan hesaplayıcılar artık her sayının kaynağını ve doğrulama tarihini gösteriyor
• AEA, Birleşik Krallık ve İsviçre'de reklam onayı soruyoruz; istediğiniz zaman değiştirebileceğiniz bir düğme var
• Tanımımızı düzelttik: ücretsiz, kayıt ve ödeme duvarı yok, reklamlarla finanse ediliyor
• Madencilik ödülleri güncellendi (Dash, Zcash, ETC)
• Arama düzeltmeleri ve daha hızlı sayfalar
```

**hi** (399 chars)
```
1.7 में नया क्या है
• कर कानून या प्रोटोकॉल नियमों पर आधारित कैलकुलेटर अब दिखाते हैं कि हर आंकड़ा कहाँ से आया और आखिरी बार कब जाँचा गया
• EEA, यूके और स्विट्ज़रलैंड में अब विज्ञापन सहमति माँगी जाती है, जिसे «विज्ञापन गोपनीयता सेटिंग्स» से कभी भी बदला जा सकता है
• विवरण सुधारा: मुफ़्त, बिना साइनअप और पेवॉल, विज्ञापनों से वित्तपोषित
• माइनिंग रिवॉर्ड अपडेट (Dash, Zcash, ETC)
• खोज सुधार और तेज़ पेज
```

**ru** (450 chars)
```
Что нового в 1.7
• Калькуляторы на основе налогового права и правил протокола теперь показывают, откуда взята каждая цифра и когда её проверяли
• В ЕЭЗ, Великобритании и Швейцарии спрашиваем согласие на рекламу; изменить решение можно в любой момент кнопкой
• Исправили собственное описание: бесплатно, без регистрации и подписки, зарабатываем на рекламе
• Обновлены награды за майнинг (Dash, Zcash, ETC)
• Исправления поиска и более быстрые страницы
```
