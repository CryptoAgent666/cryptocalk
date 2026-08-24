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

### State as of 2026-08-19 (DATA_HUB recheck — 3 flagged, ALL current, 0 changes)
- **2026-08-19**: monitor flagged 2 sources / 3 constants (`au.brackets`; `pt.longTermThreshold` +
  `pt.short_term_rate`) → **both groups gov-verified CURRENT**, no `.tsx` edit, no deploy.
  **AU**: ATO 2026–27 resident table (read via `r.jina.ai`) = nil / **15c** / $4,020+30c / $31,020+37c /
  $51,370+45c — matches the `.tsx` (long-term = half, 50% CGT discount). **PT**: first read of the
  **consolidated CIRS PDF** (`info.portaldasfinancas.gov.pt/.../Cod_download/Documents/CIRS.pdf`,
  «Última atualização: Lei n.º 26/2026, de 3 de junho») — art. **72.º n.º 1 al. c) = 28%** autonomous rate
  on the mais-valias balance incl. al. k) of art. 10.º n.º 1, and art. **10.º n.º 22** = gains AND losses
  excluded at **≥365 days**. ⚠ Decreto-Lei 97/2026 de 20/05 renumbered art. 10.º (ex-n.º 19 → n.º 22).
  Watch (not law): BE/Livre proposals to tax >365-day crypto gains at 28%; real window = OE2027.
- ⚠️ **BUG CLASS — a "changed source" that was never read at all.** Both flags were WAF stub pages, and
  the extractor turned their rotating ids into "figures": ATO returns Akamai *Access Denied* (242 chars)
  whose `Reference #18.caa4c11.<epoch>.<id>` produced the alert's `068.178 / 740.286`; koinly returns
  Cloudflare *Just a moment...* (255 chars) whose ray-id flips the `txt:` hash every cycle. **Both pages
  block the server AND the Mac render-assist**, so those constants were blind spots masquerading as
  changes. Fixed 2026-08-19 on the server: (1) `constants_freshness_monitor.py` now classifies a body
  <400 chars, or a short body carrying a WAF marker, as `BLOCKED-*` (an error/blind spot) instead of a
  change — `blocked_reason()`, backup `.bak-20260819-blockpage`, **fleet-wide fix, verify it silences the
  same false flags on other domains**; (2) cryptocalk config: ato.gov.au + koinly dropped from `sources{}`
  (calendar-only), `pt.*` `source_url` repointed koinly → CIRS PDF, and `watch_dates` added for the two
  real dates — **1 Jul 2027** (AU 2nd band 15→14%, long 7.5→7%) and **1 Jan 2027** (PT OE2027 window).
  Dry-run after the patch: 0 changed, 31/32 hashed, action_needed=false.
- **Тот же прогон, шире (по запросу «давай всё»)**:
  - **render-assist (Mac, `~/.calk-manifest/render_assist.py`) чинил не то**: гейт `len(text) > 200`
    пропускал WAF-заглушки (236–269 симв.), поэтому **131 из 269** записей кэша были заглушками —
    servicesaustralia ×25, gov.uk ×16, fairwork ×7, revenuesa ×7, ATO ×6, revenue.act ×5, treasury.nt ×5…
    Патч (бэкап `.bak-20260819-wafstub`): порог 200→**400**, детект WAF-маркеров, **fallback на
    `r.jina.ai`** (он с резидентного IP Мака отдаёт реальный текст — проверено на
    servicesaustralia/fairwork/revenuesa 13k–34k симв.), «мёртвые» URL (прокси репортит 4xx цели)
    пишутся в `~/.calk-manifest/render-assist-dead.json`, безнадёжные — как честная слепая зона
    `{"blocked": …, "len": 0}` вместо мусорного хэша.
    **Результат форс-прогона 2026-08-19**: 131 заглушка вычищена, 112 URL перечитано,
    **96 спасено через прокси**; кэш стал **233 реальных страницы / 16 честных слепых зон / 0 заглушек**.
    Из них **5 URL реально мертвы (404)** — fairwork notice-of-termination, servicesaustralia
    ccs-activity-test, premier.sa.gov.au ×2, koinly PT — список в `~/.calk-manifest/render-assist-dead.json`
    (403 помечаются отдельно как `blocked-*`, это блок прокси, а НЕ мёртвый источник). Мёртвые URL
    относятся к calk-au/nz — чинить в их сессиях.
  - **Подпись Мака отстала от сервера**: сервер с 2026-08-10 на `val2:` (вырезание дат), Мак всё ещё
    слал `val:` без них → даты на assisted-страницах гоняли подпись. Синхронизировано.
  - **`val3:` — декодирование HTML-сущностей перед извлечением цифр** (сервер + Мак, бэкапы
    `.bak-20260819-val3`): gesetze-im-internet пишет `12&#160;348`, поэтому вся немецкая тарифная
    таблица была НЕВИДИМА для подписи и страница уходила на `txt:`-хэш прозы. Теперь оттуда
    извлекаются 12348 / 69878 / 277826. Смена схемы не алертит: ветки миграции обобщены до
    `sig_scheme(prev) != sig_scheme(new) → migrated` (val→val2→val3, cdp→val).
    ⚠️ Вместе с этим **`txt:` → `txt2:`**: страницы без цифр хэшируются как проза, и unescape сдвинул бы
    их хэш → **418 таких источников по флоту** дали бы разовый шквал ложных «changed». Бамп схемы гасит это
    молча. Побочный выигрыш: ErbStG §16 больше не проза-хэш, а реальные 500000/400000/200000/100000/20000 €.
  - **Ремонт мёртвых источников cryptocalk** (бэкап `.bak-20260819-deadsrc`): `docs.avax.network/...`
    404 → `build.avax.network/docs/primary-network/validate/how-to-stake` («2,000 AVAX»);
    `newsletter.brazilcrypto.io` SSL-fail → **planalto.gov.br l8981** (ст. 21, 15/17,5/20/22,5%);
    `canada.ca` news (таймаут/WAF) → **laws-lois ITA s.38** («1/2» inclusion); BMF §32a JS-оболочка
    106 симв. → **gesetze-im-internet `estg/__32a.html`**; nicehash RVN-countdown (168 симв., событие
    уже прошло) убран → `watch_date` на 3-й халвинг RVN ~11.01.2030 (1250 → 625).

### State as of 2026-07-06 (DATA_HUB recheck — 17 flagged, ALL current, 0 changes)
- **2026-07-06**: monitor flagged 17 → **8 skipped** (web-verified 2026-06-30: BTC 3.125, dust 546, KAS 2.49,
  au.inheritance 0, eth 32, uk.brackets — protocol/tax can't shift in 4 days). Remaining **4 groups (9 consts:
  US estate $15M/40%, India 30%+1% TDS+no-inheritance, Korea 22% delayed→2027, Brazil ITCMD 8%) LLM+adversarially
  re-verified → ALL CURRENT**. No `.tsx` change, no deploy. Fixed a monitor trap: `us.estate_tax_rate` source
  repointed off `irs.gov/newsroom/estate-and-gift-tax-faqs` (that FAQ page serves STALE pre-OBBBA $5M-revert text
  → false "changed" flag) to IR-2025-103. Watch: Korea possible 4th delay (not enacted; recheck late 2026).
- **2026-07-06 (later)**: 2 gov-verified DELTAS APPLIED + DEPLOYED (full `deploy.sh`): **AU** 2nd band 16→15% /
  8→7.5% long (ATO, eff 1 Jul 2026; ⚠ →14%/7% from 1 Jul 2027) + **DE inheritance** Steuerklasse III 50% threshold
  €600k→€6M (ErbStG §19 ×10 fix). **REJECTED** ES 30→28 (AEAT: top is 30% since 2025, requested change was wrong).
- **2026-07-06 (3rd run)**: monitor flagged 11 → 9 skipped (incl. FLUX = already REMOVED, prune from DATA_HUB config).
  2 new: **jp.brackets** (still 雑所得 15-55%; flat-20% is proposal, FIEA-gated, ~2028) + **us.wash_sale** (crypto still
  EXEMPT; OBBBA did NOT add it; S.2207/H.R.9172/PARITY pending) → BOTH CURRENT, no change. Watch both bills/reforms.
- **2026-07-20 (4th run)**: monitor flagged 9 → 5 skipped (verified 30.06/06.07). 4 new (CA inheritance, JP inheritance
  exemption + rates, JP filing threshold) gov-verified → **ALL CURRENT, 0 stale**; ledger sources repointed PwC →
  gov primaries (laws-lois.justice.gc.ca s.70/s.38, nta.go.jp 4152/4155/1900 — also hash-stable for the monitor).
  ⚠ **JP CORRECTION to the note above**: the flat-20% reform is no longer merely "proposal/Upper-House-pending" —
  改正所得税法 promulgated 2026-03-31 and 金商法改正 enacted 2026-07-15, but **entry into force is deferred**
  (改正法附則39①), so 申告分離課税 starts **1 Jan 2027 at the earliest, most likely 2028**; TY2026 is unaffected and
  jp.brackets (雑所得 15-55%) stays correct. Recheck once the 施行日 is fixed by cabinet order — a move to 申告分離課税
  would also retire the ¥200,000 filing rule for in-scope "specified crypto".
- **3 JP code defects found AND FIXED + DEPLOYED 2026-07-20** (correctness, NOT staleness): (1) JP 基礎控除 was hardcoded to
  ONE heir (¥36M) → now a **"Statutory Heirs" input** feeds `¥30M + ¥6M × N`; (2) the band rate was applied FLAT to the whole
  estate → now the **statutory method**: split into per-heir shares, tax each as `share×rate − 控除額` (NTA 速算表), then sum;
  (3) `TaxCalculator.tsx` ¥200,000 copy rewritten (salaried employees only; waives FILING not the tax; 住民税 still due).
  Verified against the NTA worked example: ¥100M estate + 3 heirs → **¥6,300,000** (was ¥19,200,000 — a ~3× overstatement).
  Implementation note: `CountryRule` gained optional `computeTax` (statutory override) + `usesHeirCount` (renders the input
  for JP only); other countries keep the flat `taxable × rate` model untouched. Documented simplifications in the JP UI note:
  equal statutory shares assumed, 配偶者の税額軽減 (spouse credit) not modelled.
- ⚠️ **Known cross-country limitation (pre-existing, NOT fixed)**: `InheritanceTaxCalculator` labels the input "Portfolio Value
  (USD)" but applies each country's thresholds in its LOCAL currency (JP ¥, DE/ES €, UK £). Fixing this needs an FX/currency
  model across all 8 countries — out of scope for the JP fix; flag before any "inheritance calculator accuracy" work.
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
- Monitored by DATA_HUB: Tier-1 weekly (`cryptocalk-monitor-config.json`, **78 constants** since FLUX removed) —
  realistically **calendar-driven** (tax = gov-WAF sources; protocol = halving calendar) + Tier-2 quarterly.
  Dashboard «Полный пилот». Loop: alert → fix `.tsx` → build → deploy.
- **Monitor de-noised 2026-07-20** (server `/opt/data_hub/calk-constants/monitor/cryptocalk-monitor-config.json`,
  backups `.bak-20260720-*`): the source-hash trigger sha256's third-party pages' visible text, so pages with live
  countdowns / rotating prices / editorial date-stamps re-flagged the SAME calendar-stable constants every cycle (4
  cycles, 0 real changes). Removed FLUX (dead constant + its altcoinsbox live-countdown source); dust source
  `github.com/…/blob/…/policy.cpp` → stable `raw.githubusercontent.com/…/policy.cpp`; dropped source-hash for 6
  dynamic secondary pages (cleartax IN, ethereum.org ×2, mailmate JP, uktax UK, taxfoundation US) — those constants
  now calendar-only (their real cadence). 10 gov_primary sources still hashed. Same noise likely hits other fleet
  domains (shared secondary sources) — propagate per-domain if asked.

## SEO-аудит 2026-08-23/24 (полный краул + GSC/GA4) — правки ВНЕСЕНЫ, НЕ ЗАДЕПЛОЕНЫ
Отчёты в репо: `FULL-AUDIT-REPORT.md` (оценка 83/100, доказательства) + `ACTION-PLAN.md` (11 пунктов,
статусы). Краул 294/294 URL — 200, 0 noindex, 0 редиректов, self-canonical везде.
- **Диагноз**: сайт технически чистый, но GSC за 28 дней = 2200 показов / **6 кликов**, поз. ~72.
  Августовский «рост» показов — это **одна главная** (511→1077, поз. 75.5, 0 кликов). 13 запросов
  `<coin> profit calculator` (180 показов, поз. 70–94) обслуживает главная, а не `/profit-calculator/`.
  Aug-18 spam update сайт НЕ задел. Единственная конвертящая страница — `/tr/likidasyon-hesaplayici/`
  (5 кликов, CTR 83%, поз. 17).
- **Сделано (9 из 11 пунктов)**: per-coin секция + FAQ + schema на `/profit-calculator/`;
  methodology/about/editorial-policy углублены (первоисточники по юрисдикциям, конвейер сверки,
  опубликованные собственные корректировки, дисклоуз «только реклама, без партнёрок»); `<lastmod>` на
  **294/294** URL (парсинг `calculator-updated.ts` + локализованных слагов + хабов; `changefreq`/
  `priority` убраны); JSON-LD на локализованных `/updates/`, `dateModified` на хабах и локальных
  главных; тайтлы >60 (бренд-суффикс теперь добавляется только если влезает) и 65 описаний >160;
  a11y **92→100**; прогрев кэша в `deploy.sh`; llms.txt → methodology/updates.
- ⚠️ **Класс багов (найден попутно)**: в Astro-компонентах правило `[data-theme="dark"] .x` внутри
  `<style>` компилируется в `[data-astro-cid-…][data-theme="dark"] .x` и **никогда не срабатывает**
  (атрибут темы на `<html>`, вне скоупа). Так молча не работали тёмные стили `.hero::before` на обеих
  главных. Лечится `:global([data-theme="dark"]) .x`. Проверять при любых тёмных правках.
- **Last-Modified 19 Jan 2038** на всех HTML: причина — `deploy.sh` штампует HTML mtime `209901010000`
  (осознанный фикс, чтобы lftp гарантированно перезалил страницы того же размера), хост режет до
  32-битного потолка. Деплой не трогали — заголовок снят **CF Transform Rule** (рядом с правилом
  security-headers, зона `2f8be98a…`), только для `text/html`.
- Новый токен `--color-primary-text` (#0e7490 light) — бренд-цвет как ТЕКСТ на белом давал 3.68:1.
- ⏸ **Оставлено юзеру**: судьба тонких локалей tr/pt (item 10) — это удаление страниц из индекса.
- **Локали tr/pt углублены (item 10, 24.08)**: цифры показали, что тонкие там не калькуляторы
  (971–2191 слов), а страницы доверия — из 21 индексируемого tr-URL калькуляторов всего 5.
  Переведены на tr/pt новые EN-блоки: `/methodology/` (tr 235→645, pt 273→825),
  `/editorial-policy/` (227→513, 278→663), `/about/` (364→625, 415→776). Даты честные: только у
  шести изменённых страниц 24/08/2026 (карта `UPDATED_OVERRIDES` в `[policy].astro`), у `about`
  схема бампается только для tr/pt. Ничего не заноиндексировано. **Осталось**: es/ru (их
  `/methodology/` = 270/246 слов) — тот же проход.

### Browser-QA батч 1 (24.08.2026, 15 страниц) — 5 багов найдено и исправлено, НЕ задеплоено
Проверено кликами/вводом: 6 EN-калькуляторов, хаб, contact, 3 ru, es/pt/tr, /es/, мобильный вьюпорт.
Математика пересчитана вручную везде — **расчёты верны** на liquidation (45 200 при 10× и MMR 0,4%),
margin (уровень 160%, call 50 700), position-size ES (5 000 $ / 0,1 BTC / R:R 3,0), funding-arb PT
(APR 52,80% нетто), Calmar TR (1,2), dust (381 vB), S2F RU (120,5 при 3,125 BTC/блок), LP-value.
- 🔴 **`YieldFarmingCalculator`: ветки APR и APY были перепутаны.** «APY» компаундил ставку ежедневно
  (50% на входе → 64,8% брутто, завышение ~30% во всех цифрах страницы), «APR» шёл плоско без
  компаундинга. Исправлено: APR (номинальная) компаундится, APY (уже эффективная) переводится
  pro-rata `(1+APY)^(d/365)`. Один хелпер `growth()` на 4 места расчёта. Проверено в браузере:
  50% APY → ровно $500 брутто, APR → $648,16.
- 🔴 **`/options-calculator/` описывал другой инструмент**: quick-answer и проза обещали Блэка-Шоулза,
  теоретические премии, «все пять греков» и ввод безрисковой ставки — а калькулятор считает только
  P&L/безубыток по премии, которую вводит пользователь. Переписаны quick-answer (все 6 локалей) и
  проза (en + ru полностью, es/pt/tr/hi — ложное первое утверждение). FAQ про Блэка-Шоулза оставлен:
  он корректно объясняет, откуда берётся премия, и не приписывает расчёт калькулятору.
- 🟡 **`/lp-value-calculator/`**: пример в quick-answer не сходился — дельту против HODL называл
  «total LP return», процент брал от другого размера позиции, а «+$242» не выводилось ниоткуда.
  Переписан по фактическому выводу калькулятора (+$3 046 / +9,40%, обгон HODL +$346 / +1,07%).
- 🟡 **Блок «Authoritative sources» был EN-only на всех локалях** (`SEC — … — Risk warnings for crypto
  trading` на ru/es/pt/tr). Добавлен `SOURCE_NOTE_I18N` (18 описаний × 5 языков) + `localizedSourceNote()`;
  названия документов остаются на английском — это их официальные заголовки.
- 🟡 **`/dust-attack-calculator/`**: копия писала «<546 сатоши», хотя 546 — порог релея, ниже которого
  выход не передаётся; дефолт самого калькулятора — ровно 546. Формулировка исправлена.
- 🟡 **ES/PT/RU: количество монет печаталось с точкой** («0.100000 monedas») рядом с «5000,00 US$».
  `formatCoins` переведён на `Intl.NumberFormat(loc(lang))`.
- ⚪ НЕ баг (осознанный консервативный риск-дизайн): в margin-калькуляторе статус danger при уровне
  <200% («близко к margin call» на 160%). Пороги не трогал.
Посещённые URL — `browser-qa-visited.txt` в скретчпаде сессии (15 из 294).

### Дизайн-правки 24.08.2026 (по запросу «правь всё») — вместе с QA-батчами
Три находки impeccable-хука, все — предсуществующее оформление, исправлены по прямому указанию:
- **Точечная сетка в hero убрана** (`radial-gradient` 1px по сетке 24×24 при opacity 0.05/0.07) на
  обеих главных; вместе с ней удалён и тёмный оверрайд, которому больше нечего менять.
- **Цветное свечение кнопки** `.btn-primary:hover` `0 4px 15px rgba(8,145,178,.4)` → нейтральная
  тень `0 4px 12px rgba(15,23,42,.18)` (подъём читается как подъём, а не как свечение).
- **Градиентный вордмарк «Calk»** → сплошной `var(--color-primary)`. ⚠️ Важно: правило живёт в
  ШЕСТИ местах (обе главные + SiteHeader/SiteFooter/SiteChrome + calculator-page.css) — правка
  только главных дала бы сплошной логотип на 2 страницах и градиентный на остальных 1290.
  После правки `webkit-text-fill-color: transparent` в src не осталось ни одного.

### Browser-QA батч 2 (24.08.2026, ещё 15 страниц) — 4 бага исправлено, НЕ задеплоено
Проверено: uniswap, token-burn, dca, impermanent-loss, ai-token-sector, correlation, nft-profit,
/updates/, 2 хаба (en+es), 3 ru, tr-ликвидация, pt-конвертер. Математика пересчитана вручную —
**всё верно**: Uniswap V3 (доля 0,2%, IL −41,41 $ при +20%, брейк-ивен 3,5 дня), IL-калькулятор
(−2,02% при r=1,5 и вся справочная таблица), DCA (25 покупок, средняя 84 049 $, lump sum +20,73% —
исторические цены реальные), NFT (брейк-ивен 1,2991 ETH сошёлся до 4-го знака), Sortino RU (1,667),
ликвидация TR (45 200 $), мосты RU, корреляция (r=±1,0000).
- 🔴 **`TokenBurnCalculator`: «Market Cap in N Years» при постоянной цене** — сжигание показывалось
  как падение капитализации 500M → 200M, то есть ровно наоборот смыслу дефляции (и quick-answer
  обещал «implied price impact», которого не было). Заменено на **implied price при неизменной
  капитализации**: 1 год $1,14 / 3 года $1,56 / 5 лет $2,50. +3 UI-строки × 5 языков.
- 🟡 **`CryptoCorrelationCalculator`: r = −1,0 описывался как «активы движутся независимо».**
  Отрицательная корреляция — это хедж, независимость это r≈0. Добавлены ветки ≤−0,5 и <−0,2
  («сильный/частичный хедж») + строки на 5 языков. Проверено: −1,0000 → «сильный хедж».
- 🟡 **`AiTokenSectorCalculator`: «AI sector market cap $22.30B»** суммируется из ЗАХАРДКОЖЕННЫХ
  капитализаций, а подавался как живая цифра → лейбл «(reference snapshot)» на 6 языках.
  ⚠️ Слияние ASI (AGIX/OCEAN → FET) в компоненте уже учтено — заменены на GRASS/VIRTUAL, не трогал.
- 🟡 **Часы в конвертерах**: `toLocaleTimeString()` без локали → на pt/es/ru страницах «2:26:04 PM»
  вместо 24-часового формата. Передан `loc(lang)` (CryptoConverter + SatoshiConverter).
- ⚪ НЕ баг: «Effective Fee Rate 18,95%» в NFT — это доля комиссий от ПРИБЫЛИ (не от суммы сделки),
  соседняя строка это поясняет; `valuemax="0"` в DCA-снапшоте a11y — артефакт дерева доступности,
  в DOM атрибута нет.

### ⚠️ Инцидент деплоя 24.08.2026 — НЕ запускать build во время деплоя
Первый прогон `deploy.sh` упал в середине: параллельно был запущен `npm run build` (для правок
локалей), который пересоздал `dist/` под работающим lftp → `mirror: Access failed: dist/ru/...`,
затем lftp убит сигналом 15. Прод остался рабочим (проверено: 10 страниц по локалям, все чанки 200),
но часть страниц осталась старой. Лечение: чистый `bash scripts/deploy.sh --no-build` из уже
собранного `dist/`, **без единой команды, трогающей `dist/`, до конца прогона** (полный mirror обоих
докрутов ~35 минут). **Правило: во время деплоя ничего не собирать.**
Там же вылез мой баг в новом шаге прогрева: sitemap отдаётся ОДНОЙ строкой, построчный `sed` выцепил
из неё один URL («Warmed 1 URLs»). Исправлено на `grep -o '<loc>[^<]*</loc>'` → 294 URL.

## Deploy — ТОЛЬКО через scripts/deploy.sh
- **Полный `bash scripts/deploy.sh`** (или `--no-build`) — mirror в ПРАВИЛЬНОМ порядке (ассеты → HTML,
  оба докрута `dist/` + `httpdocs/`, CF purge). **НИКОГДА не деплоить точечными `lftp put`:** `put` без
  `-o <полный remote-путь>` кладёт файл в удалённую CWD под своим basename. Так 23–30.06.2026 корневой
  `index.html` был затёрт копией `/es/calculadora-impuestos-cripto/index.html` (главная ≥10 дней отдавала
  Google испанский tax-калькулятор с canonical на ES; найдено и исправлено 2026-07-03).

## Mobile apps — iOS ⛔ 5.6 REVIEW SUSPENDED (июль 2026)
- **Apple убил app record**: «not eligible for resubmission», ресабмиты/ответы авто-отклоняются.
  Повторные similar-сабмиты → риск бана всего Developer Program (на аккаунте 8+ шаблонных аппок
  флота — **заморозить iOS-сабмиты других доменов до чистого аппрува чего-либо**).
- **Причины (диагностика 2026-07-10, ревьюер видел бинарь от ~13 июня, OTA в ревью НЕ видны)**:
  (1) 2.3.10 — Google Play-бейдж в `SiteFooter.astro` БЕЗ platform-gate → реклама Google Play на
  каждой странице iOS-аппки; (2) сломанный поиск в вшитом бандле (фикс уехал только OTA 1.6.7);
  (3) демо-GADApplicationIdentifier `ca-app-pub-3940256099942544~…` в `ios/App/App/Info.plist`;
  (4) куки-баннер в нативном билде (5.1.2); (5) студийные скриншоты с рамками (2.3.3).
- **Перед ЛЮБЫМ новым iOS-сабмитом** (только новый bundle ID / app record): прогнать ШАГ 0 skill
  `app-release` целиком; `npx cap sync ios` со СВЕЖИМ dist; platform-gate на футер-бейдж и куки;
  реальный AdMob ID или убрать плагин; нативные фичи против 4.2.2 (история/избранное/оффлайн).
- Android (Google Play) не затронут — живёт как раньше, OTA-канал работает.

### ⚠️ `blockReward` = MINER's share, not the block subsidy (bug class, fixed 2026-08-02)
Both mining calculators consume `blockReward` as **what the miner receives**: `AsicMiningCalculator`
does `(hashrate/(difficulty·2³²))·86400·blockReward` and `GpuMiningCalculator` does
`(hashrate/networkHashrate)·blockReward·(86400/blockTime)` — the first factor is already the miner's
*share of blocks*, so the second must be the miner's *share of one block*. The live override
(whattomine `block_reward`) is miner-facing too, so a fallback holding the full subsidy silently
disagrees with the live path. **When adding/refreshing a coin, ask: does this chain split the
subsidy?** Fixed 2026-08-02 after an on-chain audit (coinbase reads via blockchair + Dash Core
`validation.cpp`): **DASH 1.77 → 0.4426** (1.77 was the in-block coinbase = miner+masternode; miner
gets only 20% — masternodes 60%, treasury 20% → mining revenue was overstated **4×**, and the hardcoded
value contradicted the live whattomine ~0.44 in the same component); **ZEC 1.5625 → 1.25** (20% to the
ZIP-1015/NU6 dev fund → +25% overstatement); **ETC 2.048 → 1.6384** (pure staleness: ECIP-1017 era 6
began at block 25,000,000 on 22 Jul 2026). Sources repointed off **bitinfocharts** — its Dash figure
(~1.55) reconciles to no on-chain quantity. Verified-current in the same pass: Portugal 28%/365-day
(first primary-source check, CIRS art. 72.º/10.º — not koinly) and Avalanche 2,000 AVAX (ACP-77/Etna
freed L1 validators but left the Primary Network minimum).
- **Scheduled rollovers** (these values change on a calendar, which a source-hash monitor cannot see):
  DASH −7.14% every 210,240 blocks (~383 days). **Era 12 APPLIED + DEPLOYED 2026-08-18**: block 2,522,881
  was mined 2026-08-16T16:05:22Z, miner **0.4426 → 0.4109**. Next block 2,733,121 (~4 Sep 2027) → miner
  ~0.3816, handled by scheduled task `cryptocalk-dash-emission-2027-09` (verify-first, self-reschedules to
  ~Sep 2028); ETC era 7 at block 30,000,001 (~2028) → 1.31072; ZEC 3rd halving ~23 Nov 2028.
  **How to derive the Dash value (proven 2026-08-18, reuse it):** blockchair is unreachable from this
  machine — use `chainz.cryptoid.info/dash/api.dws?q=getblockhash&height=N` + `insight.dash.org/insight-api/`.
  `in_block_subsidy = coinbase valueOut − Σ fees of the block's non-coinbase txs` (identical across blocks =
  proof the fees are out), and `miner = in_block_subsidy / 4` — the miner's first coinbase vout is EXACTLY
  25% of valueOut on every block sampled (MN+Platform take 75%; the Platform credit-pool OP_RETURN is 37.5%
  of that). Era 12: in-block 1.64378041 → miner 0.41094510.

## Key crypto context
- BTC block reward **3.125** (4th halving Apr 2024, block 840,000); next halving block **1,050,000 → 1.5625**
  (~Apr 2028). Max supply 21M. ETH validator activation **32 ETH** (EIP-7251 raised MAX to 2048, not the floor).
- US: crypto = property; no wash-sale (currently); long-term ≥1yr. Germany: >1yr held = tax-free + €1,000
  Freibetrag. Canada: 50% inclusion (66.67% over $250k was cancelled 2025-03-21).
