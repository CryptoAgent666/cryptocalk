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

### Монитор 2026-08-31 — 2 флага, ОБА ложные (SVG-координаты как «суммы»)
- Алерт: `at.flat_rate` и `fr.annual_exemption` «изменились». 🚩 Первый признак подделки — у **двух
  несвязанных страниц** (AT и FR) совпало «было» побайтно: `€199, €2,395, €2,395, 300.000`.
  Две разные налоговые страницы не могут содержать одинаковый набор цифр.
- 🔴 **Класс багов: экстрактор читал координаты SVG-путей как денежные суммы.** «Новая» цифра
  `14.894` — это фрагмент `C12.7852 14.894 13.2357 15.0441` из атрибута `d` иконки. MONEY_RE ловит
  `14.894` своей веткой разрядных групп (1–3 цифры, разделитель, 3 цифры). Одинаковые «было» у AT и
  FR — потому что у страниц общий набор иконок.
- Две дыры, обе закрыты в `constants_freshness_monitor.py` (бэкап `.bak-20260829-svgpath`):
  (1) `html_text` вырезал `<script>/<style>`, но **не `<svg>`**;
  (2) `value_signature` зовёт `html.unescape` **после** снятия тегов, поэтому экранированная
  разметка из JSON-полезной нагрузки превращалась в настоящие теги уже внутри подписи. Теперь
  после unescape разметка снимается повторно.
  **Схема поднята `val3→val4`, `txt2→txt3`** — иначе фикс дал бы разовый шквал ложных «changed» на
  каждой странице с иконками; смена схемы распознаётся как НАША и мигрирует молча.
  Проверено на живых URL: AT теперь отдаёт `27.5%` ×6 и брекеты, FR — `30%/12.8%/17.2%/€305`.
  ⚠️ Фикс общефлотовый — проверить, что он гасит такой же шум на других доменах.
- **Обе константы верны и переверифицированы по первоисточникам** (это настоящее чтение, поэтому
  `verified_date: 2026-08-31` проставлен честно):
  **AT 27,5%** — EStG § 27a Abs. 1 Z 2, «in allen anderen Fällen einem besonderen Steuersatz von
  27,5%»; Kryptowährungen в этом же параграфе. Ставка 25% (Z 1) — только банковские вклады.
  ⚠️ RIS отдаёт **503** и нам, и с сервера DATA_HUB — читается только через `r.jina.ai`; сервер-
  читаемого австрийского первоисточника не нашлось (BMF 404, findok 301), поэтому монитор
  продолжает хэшировать вторичный гайд, а RIS записан как авторитет в notes.
  **FR €305** — BOFiP `BOI-RPPM-PVBMC-30-30`, «cessions dont la somme des prix n'excède pas 305 €»,
  со ссылкой на CGI art. 150 VH bis, B du II. **Источник переведён blockpit → BOFiP**
  (`gov_primary: True`, 200 с сервера) — выполнено правило скилла о миграции источника за сессию.

### State as of 2026-08-29 (`/calk-constants-check` — anti-ledger-lag reconcile, 0 code changes)
- Триггер: коммит `8623eb629` (`merge_drift_into_ledger`, фронт флота 29.08) добавил в реестр поле
  `official_value` — и обнажил **10 записей, где `value` ≠ `official_value`**, плюс 3 с `conflict`.
  По правилу скилла такие записи пере-флагаются каждым аудитом и loop-closer'ом вечно.
- **Проверил все 10 против живых `.tsx` — устаревшего кода НЕТ, это лаг реестра. Деплой не делался.**
  Содержательные (реестр хранил отменённые/старые значения, код правильный):
  **BR** `value` 17.5 (отклонённый MP 1303) → в коде прогрессивные 15/17,5/20/22,5;
  **UK airdrop CGT** `value` 20 → в коде 24 (чинили 23.06);
  **CA inclusion** `value` содержал отменённый тир `above_250k_from_2026: 66.67` → в коде его нет
  (только прозой как отменённый). Остальные — расхождение формулировки при одинаковом числе.
- ⚠️ **Грабля, на которую сам наступил:** сначала записал в `official_value` пояснительную прозу
  («0.41094510 — miner share, era 12…»). Число то же, но строковое сравнение всё равно расходится —
  6 записей продолжали бы флагаться. **`official_value` должен совпадать с `value` побайтно**, а
  вывод и деривация живут в `notes`. Итог: 10 → **0** лага, 3 → **0** конфликтов.
- `verified_date` намеренно НЕ проставлял: это сверка с применённым кодом, а не свежее чтение
  первоисточника. Ставить сегодняшнюю дату верификации источнику, который никто не открывал, —
  ровно тот класс нечестности, против которого этот реестр и заведён.
- 22 записи `unverified` — это ровно те же 22 с `is_regulatory: false` (формульные/рыночные), они
  не верифицируются по определению; не путать с «непроверенными регуляторными».
- 🔔 **KAS — не халвинг, а ежемесячный шаг эмиссии** («хроматический халвинг»), поэтому константа
  протухает каждый месяц и никакой source-hash монитор этого не увидит. Записанный следующий шаг —
  **04.09.2026 → 2.18267645** (сейчас 2.3125). Заведена verify-first задача
  `cryptocalk-kaspa-emission-2026-09` (читает `api.kaspa.org/info/blockreward`, применяет, деплоит,
  публикует OTA **1.7.1+**, синхронизирует реестр и пересоздаёт себя на следующий месяц).

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

## GEO / AI-search пасс 25.08.2026 (`/seo-geo` → «внедри всё») — ВНЕДРЕНО + ЗАДЕПЛОЕНО
Отчёт `GEO-ANALYSIS.md` (аудит §1–12 + журнал внедрения §13). Оценка **69 → 81/100**.
Краулеры проверены живыми пробами: 10 UA × 3 URL, **все 200, побайтно равны** Chrome — WAF не режет.

- 🔴 **Главная находка — класс багов «сайт врёт о себе, и ИИ это повторяет».** EN-главная в FAQ
  (и внутри `FAQPage` JSON-LD!) утверждала «without signup, payment, **or ads**», тогда как
  `/editorial-policy/` на том же сайте пишет «funded solely by display advertising», а AdSense
  грузится на всех страницах. Два нейтральных ИИ-поиска в ходе аудита вернули **устаревший блёрб
  из Google Play**: «69 calculators, 935 pages, no ads, no tracking, open-source». Правки: FAQ (6
  локалей), `llms.txt`, `/about/`, счётчик страниц (1 100/1 241/1 242 → **294 индексируемых**).
  ⚠️ **ПОПРАВКА 25.08 (проверено по живому листингу):** в Play Console текст УЖЕ актуальный —
  «128 free cryptocurrency calculators… No sign-up and no paywall», «Contains ads» проставлено.
  Старое «69+ … No ads» лежало ТОЛЬКО в репо (`play-store-listing.md`, заменён на указатель).
  Источник блёрба, который цитируют ИИ, — **публичный GitHub-репозиторий**, файл `CHANGELOG.md`
  («69 calculators, 6 languages, 935 pages» + строки «Build: 935 pages»). Историю не переписывать —
  добавлена шапка «каждая запись описывает состояние на свою дату» + ссылки на актуальное.
  ⚠️ `appeal/` в `.gitignore` и на GitHub 404 — эти письма НЕ публичны и источником не были
  (в первом черновике я написал обратное — неверно).
  🔴 **Реальная незакрытая проблема — Data safety**: живой листинг декларирует «No data collected»
  и «No data shared with third parties», при том что в `AndroidManifest.xml` прописан боевой
  AdMob App ID `ca-app-pub-4859241862365215~7817677190` и стоит `@capacitor-community/admob`,
  т.е. Google Mobile Ads SDK домердживает `AD_ID` и собирает рекламный идентификатор. Это
  расхождение декларации с приложением — риск снятия с публикации. Правится только в Console.
  `play-store-listing.md` в корне был устаревшим дублем → заменён на указатель, единственный
  источник правды теперь `play-store-assets/listing.md` (туда же перенесён исправленный RU-листинг).
- 🔴 **Тот же класс, второй случай**: `/editorial-policy/` заявлял «Primary sources **only** … a
  tax-guide article … is **never** the source we record», а в реестре у **12 из 17** юрисдикций
  хотя бы одно значение висело на koinly / blockpit / PwC / ClearTax / TaxFoundation. Вместо
  смягчения формулировки — **опубликован сам реестр**: на `/methodology/` таблица юрисдикций
  (источник, разбивка тиров вида «3 statute · 1 secondary», дата проверки) + таблица протокольных
  констант. Вторичные явно помечены как очередь на переверификацию.
- **Новый блок «Where these numbers come from»** (`DataVerification.astro`, 6 языков, **189
  страниц**): для 19 калькуляторов, зависящих от налогового права/протокола, — значение, страница-
  источник, тир (statute / protocol / secondary / market) и дата ручной проверки. Данные из
  `regulatory-constants.canonical.json` через новый `src/data/source-ledger.ts`. **Это же —
  механизм свежести**: переверификация меняет отрендеренный блок, поэтому `dateModified` двигается
  честно.
- **Свежесть 28 → 278 из 294 URL.** НЕ штамп даты сборки: 133 слага выбраны **сканированием
  собранного HTML** на маркеры реальных правок; 5 (`404/compare/contact/privacy/terms`) не тронуты.
  Обоснование записано в шапку `calculator-updated.ts`.
- **robots.txt**: `Google-Extended` **разблокирован** (он гейтит grounding в Gemini Apps и Vertex,
  а НЕ Search/AIO/AI Mode — старый комментарий «training-only, no search benefit» был неверен);
  добавлены явные группы `Claude-SearchBot`, `Claude-User`, `Google-CloudVertexBot`, `Applebot`;
  `Disallow: /api/` продублирован в каждой группе (группы REP не наследуются). CCBot / Bytespider /
  anthropic-ai / cohere-ai остаются закрыты. Добавлен `/rsl-license.xml` (RSL 1.0) + `License:`.
- **Агентский нидж** (`AgentNudge.astro` в `Layout.astro` → все 1294 страницы, 6 языков): видимая
  ссылка на `/llms.txt` с инструкцией для агентов в `title`. Без скрытого текста, без формулировок,
  управляющих выводом модели. **Проба проведена 25.08 после деплоя** (`tools/geo-agent-probe.py`,
  адаптирован из advcash-версии флота; логов у хоста нет — меряется решение агента: модели дают
  инструмент `fetch_url` и логируют запрошенные URL, контроль = та же живая страница с вырезанным
  ниджем). Обвязка сначала провалидирована (`MODE=verify`): нидж доходит на позиции 12210/12437,
  обрезки нет, в контроле вырезан, все 5 моделей берут файл по прямой просьбе.
  **Результат — методичка не воспроизводится.** Формулировка из скилла «расскажи всё»: nudge
  **3/25** vs control 0/25 (p=0,12, незначимо; на advcash было 0/25). Задание «извлеки данные в
  машиночитаемом виде»: nudge **18/25** vs control 0/25, **p=2,7e-08** (gpt-4o-mini 5/5,
  claude-haiku 5/5, qwen3 5/5, mistral 3/5, gemini-flash-lite 0/5).
  ⚠️ **Вывод: нидж не создаёт спрос на данные, он сокращает путь агенту, который их УЖЕ ищет.**
  Это сантехника для агентских сессий, НЕ рычаг цитируемости — в отчётах не смешивать.
  Побочно: в robots.txt cryptocalk не было строки про llms.txt (поэтому контроль чистый 0/25, а на
  advcash claude-haiku находил файл в ОБОИХ рукавах через такую строку) — строка добавлена
  25.08 **после** прогона, замер второго пути = следующий деплой + прогон только контроля.
  Query-эндпоинта нет (статик-хостинг).
- **Схема**: `src/data/entity.ts` — единственный источник `sameAs` (было ТРИ разных набора:
  главная / `/about/` / `/methodology/`); `/methodology/` из голого `WebPage` → `TechArticle` +
  `Dataset` (реестр 101 константы); `Organization` получил `publishingPrinciples` и
  `correctionsPolicy`.
- **Структура/мультимодальность**: 30 заголовков шаблона × 6 локалей и 7 на `/profit-calculator/`
  переписаны в вопросительную форму (было 2/16 вопросов, стало 7/18); первые на сайте `<figure>` —
  2 инлайновых SVG на `/profit-calculator/`, **в масштабе** (столбцы 180 и 178 px: суть в том, что
  комиссии малы, а меняется знаменатель ROI); «Authoritative sources» с 2–3 регуляторов США до 4–5
  включая ATO, HMRC, ESMA, FCA, OECD CARF и спеки протоколов (16 источников + 80 переводов).
- **IndexNow**: ключ `/7397f0c5….txt` лежал на сайте с настройки Bing, но **никто никогда не
  пинговал API**. Шаг добавлен в `deploy.sh` — отправляются ТОЛЬКО URL, у которых `<lastmod>`
  сдвинулся за 7 дней (не все 294 на каждый деплой).
- ⏸ **Осталось юзеру (вне репозитория)**: сущностное присутствие — Wikidata, YouTube, Reddit.
  Это единственный оставшийся крупный рычаг и единственное, что двигает ChatGPT (40) и
  Perplexity (30). Плюс исправление Data safety в Play Console (описание уже верное).

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

## Android-приложение: состояние на 25.08.2026 (OTA 1.6.9)

- 🔴 **Класс багов «приложение отстало от сайта».** Правки сайта НЕ доезжают до приложения сами —
  только через `bash scripts/ota-publish.sh <версия>`. 25.08 обнаружено: бандл **1.6.8** и вшитая
  в APK сборка (**13 июня**) всё ещё содержали ложное «работают без регистрации, оплаты **или
  рекламы**», исправленное на сайте тем же утром. В приложении это хуже, чем на вебе: фраза висела
  **на одном экране с баннером AdMob**. Опубликован **1.6.9** (чексумма
  `25acd5a7244a710700bf2f09ff5a7025754185dbde4382e12ae9bec34c0a8a16`, 1294 страницы, проверено
  скачиванием бандла). **Правило: после каждого деплоя сайта с пользовательскими правками —
  публиковать OTA, иначе приложение месяцами показывает старый текст.**
- 🚀 **1.7 / versionCode 12 В ПРОДЕ с 25.08.2026** (moderation passed; проверено по API:
  `production vc=['12'] status=completed`, vc10 сменился). Загружено через Play Developer API
  скриптом `scripts/play-upload.py` статусом draft, публикацию нажимал пользователь.
  ⚠️ **Реклама в приложении показывается ВПЕРВЫЕ** — AdMob приехал коммитом `1736e130b` от
  03.07, а прошлый прод-релиз vc10 был от 13.06, то есть до него. Поток согласия UMP тоже
  отрабатывает впервые. На 25.08 AdMob по CryptoCalk показов не отдаёт — в треке было 9 установок
  и раскатка только началась; отчётность AdMob отстаёт на несколько часов. **Проверить через сутки.**
  ⚠️ **Публичная страница в Play на момент публикации всё ещё отдавала «No data collected»**, хотя
  очередь ревью пуста и «Last published 25 August». Это кэш листинга. **Проверить через 24–48 ч:**
  если Data safety на странице по-прежнему без «Device or other IDs», значит анкета не сохранила
  новые ответы — перепроверять в консоли.
  ⚠️ **Следующая OTA — только 1.7.1+** (проверено на живом эндпоинте: бинарь 1.6 → отдаёт 1.7.0,
  бинарь 1.7 → `{}`; `cmp_versions` дополняет нулями, поэтому 1.7.0 == 1.7).
- ✅ **AAB 1.7 / versionCode 12 собран 25.08.2026** — вшитая сборка больше не июньская.
  `android/app/release/cryptocalk-1.7-vc12.aab`, sha256 `818b32c2…5091ec`. Проверено по бинарю:
  подпись = тот же ключ, что у vc11 (sha256 блока `META-INF/CRYPTOCA.RSA` `281ef1f0…558f7c`),
  UMP 31 класс в dex, `AD_ID` в манифесте, боевой AdMob App ID, демо-ID `3940256099942544` в
  Android-части ОТСУТСТВУЕТ (в `ios/App/App/Info.plist` остаётся — iOS заморожен), вшитый бандл от
  25.08 с исправленной формулировкой и кнопкой приватности. Release notes на 6 языков (≤500 симв.)
  — в `play-store-assets/listing.md`. **Заливает в Play пользователь.**
  ⚠️ Грабля сборки: `npx cap sync` требует TypeScript **5.x** в devDependencies; TS вообще не было
  в зависимостях, а установка `typescript@latest` (7.0.2) валит Capacitor CLI —
  `Cannot read properties of undefined (reading 'CommonJS')`, в семёрке нет `ts.ModuleKind`.
  Зафиксирован `typescript@^5`.
  ⚠️ **Следующая OTA — только 1.7.1+**: `cmp_versions` в updates.php дополняет нулями, поэтому
  бинарю с versionName 1.7 бандл 1.7.0 не предлагается (проверено на живом эндпоинте).
- **Баннер установки приложения (31.08)** — `AppInstallBanner.astro` в `Layout.astro`, все 1294
  страницы, 6 языков, по умолчанию `hidden`. Показывается ТОЛЬКО при совпадении всех условий:
  UA содержит `Android` (**iOS-приложения не существует** — app record убит, слать айфон в Play
  бессмысленно), нет `data-native` (внутри приложения реклама стора = паттерн реджекта 2.3.10),
  куки-баннер не на экране (иначе две полосы внизу друг на друге), и его раньше не закрывали
  (`localStorage: cc_app_banner_dismissed`).
  🔴 **Это полоса, а НЕ попап — сознательно.** Google в «avoid intrusive interstitials» прямо
  называет небольшой app-install баннер допустимым, а перекрывающий контент диалог на мобильных —
  сигналом понижения. Ставить попап после сессии, посвящённой SEO/GEO, значило бы обнулить её часть.
  Пока баннер виден, `body` получает `padding-bottom` = его высоте, поэтому контент не закрывается.
  Замерено: **63px = 8% экрана**, тапы 104×44 и 40×44.
  ⚠️ Грабли вёрстки (все три ловились замером, не на глаз): `hidden` перебивается `display:flex` —
  нужен явный `.cc-app-banner[hidden]{display:none}`; на 375px заголовок на ru/hi обрезался до
  «CryptoCalk для …», то есть терялось слово Android — ради него под 410px скрыты подзаголовок и
  декоративная иконка (`alt=""`); хинди влезал ровно 178 из 178px, поэтому шрифт заголовка снижен
  до 0.83rem для запаса.
  Ссылка несёт `referrer=utm_source%3Dcryptocalk.com%26utm_medium%3Dweb_banner` — установки будут
  атрибутироваться сайту, а не «organic».
- **Гейт нативной платформы (введён 25.08)**: `Layout.astro` в том же синхронном блоке, что и тема,
  ставит `data-native="1"` на `<html>`, если `Capacitor.isNativePlatform()`. На это повешено:
  `.gplay-badge` (бейдж Google Play был на **1247 страницах** без гейта — ровно паттерн iOS-реджекта
  2.3.10) и `.native-hide` (CTA «Скачать в Google Play» в чейнджлоге). Правило в `global.css`.
  Проверено вживую: бейдж `inline-flex` → `none` при выставленном атрибуте.
- **Куки-баннер выключен в нативе** (`CookieBanner.astro`): в приложении GA и AdSense не грузятся
  (`Layout.astro`, `if (isNativeApp) return`), то есть баннер спрашивал согласие на то, чего нет,
  а **AdMob, который РАБОТАЕТ, им не покрыт**. Был среди причин iOS-реджекта 5.1.2.
- **UMP/GDPR consent — код готов 25.08, ждёт публикации сообщения в консоли AdMob.**
  ⚠️ **ПОПРАВКА 25.08 (после заливки в Play):** живой прод-релиз — **versionCode 10**, а июньская
  сборка **vc11 в прод НИКОГДА не уходила** (проверено через API: production vc=10 completed,
  alpha vc=2). Поэтому утверждение «UMP уже в опубликованном APK, новый AAB не нужен» было
  НЕВЕРНЫМ: UMP лежал в собранном, но не опубликованном бинаре. Урок: наличие AAB в
  `build/outputs/` НЕ значит, что он в проде — проверять треки через
  `androidpublisher .../edits/{id}/tracks`, а не по локальным артефактам.
  Практических последствий нет: код согласия безопасен в обоих случаях — если у vc10 плагина нет,
  срабатывает внешний catch; если есть (плагин v8 принёс AdMob и UMP одним коммитом), поток
  согласия отрабатывает штатно. Но если vc10 показывал рекламу, OTA 1.7.0 её на этих устройствах
  уже выключила — до публикации vc12.
  Сверено по июньскому AAB (`android/app/build/outputs/bundle/release/app-release.aab`):
  **31** вхождение `com/google/android/ump`, 981 — `com/google/android/gms/ads`, `AD_ID` в
  манифесте (это же независимо подтвердило пункт Data safety). Значит согласие уезжает **через
  OTA, новый AAB не нужен**. Способ проверки: питоном пройти по `*.dex` внутри .aab и считать
  вхождения строк пакетов — в `namelist()` классов не видно, они внутри dex.
  Реализация в `AdMobAds.astro`: `requestConsentInfo()` → при `REQUIRED` и доступной форме
  `showConsentForm()` → и только потом `initialize()` + показ. Ни одного запроса рекламы до
  разрешения согласия. **Ошибка UMP (офлайн / сообщение не опубликовано) → реклама НЕ
  показывается** — сознательно строже дефолта Google: закэшированного согласия у приложения нет,
  цена ошибки в одну сторону — сессия без рекламы, в другую — нарушение.
  Постоянная точка входа (её требует Google) — кнопка `#cc-ad-privacy`, 6 языков, `hidden` по
  умолчанию, всплывает только при `privacyOptionsRequirementStatus === REQUIRED`.
  ⚠️ Грабля при вёрстке такой кнопки: `.cc-ad-privacy { display: block }` перебивает атрибут
  `hidden` — нужен явный `.cc-ad-privacy[hidden] { display: none }`, иначе кнопка высыпается на
  все 1294 страницы сайта. Проверено в браузере: `hidden` → `none`, без него `block`, 44px.
  🔴 **ПОРЯДОК: сначала сообщение в AdMob (Privacy & messaging → European regulations, targeting
  «Countries subject to GDPR», кнопка Do not consent ВКЛ, privacy policy URL, Publish — не draft),
  потом OTA.** Наоборот — европейский трафик останется без рекламы до публикации.
- **Политика приватности дополнена 25.08**: раньше `/privacy/` описывал только AdSense на сайте —
  ни AdMob, ни рекламного ID, ни приложения. Добавлен раздел 5a (EN) + раздел «Реклама и
  приложение для Android» в 5 локализованных политиках, где раздела про рекламу **не было
  вообще**, хотя AdSense показывается и там.
- **Data safety в Play (25.08)**: живой листинг декларировал «No data collected / No data shared»
  при работающем AdMob — расхождение декларации с бинарником. Что декларировать (сверено с
  developers.google.com/admob/android/privacy/play-data-disclosure): **Device or other IDs**,
  **App activity → App interactions**, **App info and performance → Crash logs/Diagnostics**,
  **Location → Approximate location** (спорная строка: в форме нет поля «IP», Google в своей
  таблице пишет, что SDK собирает и передаёт IP) — все Collected + Shared, purpose Advertising or
  marketing / Analytics / Fraud prevention, сбор **required** (пока нет UMP). Шифрование в
  транзите — **Yes** (`usesCleartextTraffic="false"`, `network_security_config` без исключений,
  `androidScheme: 'https'`, плюс TLS у самого Mobile Ads SDK). Аккаунтов нет → «My app does not
  allow users to create an account».
  ⚪ **Capgo OTA декларировать НЕ надо**: плагин шлёт `device_id`, но `ota-backend-vps/public/updates.php`
  читает только `app_id`/`version_name`/`version_build`, не логирует и не пишет в БД — это
  ephemeral processing по определению Google.

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
