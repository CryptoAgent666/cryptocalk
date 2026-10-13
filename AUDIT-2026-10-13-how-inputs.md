# How-to-use / inputs sweep — cryptocalk.com — 2026-10-13

Follow-up to `AUDIT-2026-10-13.md` (systemic finding 3, "Not done" item 2). **Not deployed.**

## Scope and method

- Every calculator slug in `src/i18n/calculator-seo-content.ts` (128 slugs × 6 languages, `how` + `inputs` =
  3,072 paragraphs) was compared with its React component: every `useState` bound to an input / select / toggle /
  preset, its label (`getUiString` key and the localized label), unit, default and option list, and every result
  row actually rendered. Each language was checked on its own — locale texts often diverged from EN.
- **Generic template fallback:** no calculator page falls back to `seoBodyText` for `how`/`inputs` — all 128
  slugs have their own text in all six languages, so the generic paragraphs are not shown in these two sections.
- 35 slugs have a hand-written EN page (`src/pages/<slug>.astro`) that does not render the `en` entry; those
  entries were fixed anyway (the locales are translations of them).
- Only the false sentences were rewritten; every other sentence is byte-identical. Numbers were changed only when
  they describe the tool itself and were recomputed from the component's own code:
  concentrated-liquidity capital efficiency on ±5% ~20× → **~39.5×** (±20% stays ~9.5×), ROI annualization of 50% in
  90 days ~380% → **~418%** (`(1.5)^(365/90) − 1`, the formula the tool uses), ETF default return 10% → **12%**.
  Market figures were not touched.

## Result

- **105 of 128 slugs** had at least one false claim; **1,436 paragraphs** rewritten (en 287 · es 235 · pt 230 · tr 229 ·
  hi 223 · ru 232). 1,346 of them are rendered (the rest are unrendered EN entries of hand-written EN pages).
- **Clean (23):** lp-value-calculator, position-size-calculator, apy-apr-calculator, risk-reward-calculator, market-cap-comparator, hashrate-converter, timestamp-converter, calmar-calculator, information-ratio-calculator, crypto-inheritance-calculator, dust-attack-calculator, stock-to-flow-calculator, inheritance-tax-calculator, ai-token-sector-calculator, rwa-yield-calculator, trailing-stop-loss-calculator, wallet-net-worth-calculator, covered-call-calculator, geometric-mean-return-calculator, iron-condor-calculator, lightning-network-fee-calculator, mayer-multiple-calculator, perpetual-funding-arbitrage-calculator.
- Build: 1,294 pages, `grep -rl '&lt;a href' dist` empty; every rendered rewrite found in `dist`, no replaced passage left.

## Mismatches fixed

| slug | langs | false claim (EN paraphrase) | what the component actually has |
|---|---|---|---|
| concentrated-liquidity-calculator | en es pt tr hi ru | Capital efficiency is "~20× on a ±5% range" | Replaying the code on the Tight ±5% preset (2280–2520 around 2400) gives **39.5×**. ~9.5× on ±20% is correct. |
| converter | en es pt tr hi ru | Converts into "another coin or fiat currency" | Crypto to fiat only. The To list has 10 fiat currencies (USD, EUR, GBP, JPY, AUD, CAD, BRL, TRY, INR, RUB) |
| converter | en es pt tr hi ru | You can enter the fiat amount you want to spend and get a coin amount, and compare several currencies at once | Amount is always in crypto, with one target currency at a time |
| converter | en es pt tr hi ru | Supports "all major fiat currencies" | 10 fiat currencies |
| converter | en es pt tr hi ru | Both fields accept crypto tickers and fiat | From is crypto only (popular list plus CoinGecko search). To is fiat only. |
| converter | en es pt | Prices "refresh automatically" | Fetched when the coin or currency changes, with a manual Refresh button. There is no periodic refresh. |
| profit-calculator | en es pt tr hi ru | Shows "gross profit" | No gross-profit row. Shows net P/L, ROI, Total Invested, Total Return, Entry/Exit/Total Fees, Effective Buy/Sell Price. |
| profit-calculator | en es pt tr hi ru | A blank exit price defaults to the live CoinGecko price | Blank gives no result. The live price fills Sell / Current Price only after you pick a coin in the optional search. |
| mining-calculator | en es pt tr hi ru | Enter the specs of the "ASIC or GPU" | Bitcoin SHA-256 ASICs only: hashrate in TH/s and an ASIC Miner list with 9 models plus Custom |
| mining-calculator | en es pt tr hi ru | Run a scenario at a 30% lower BTC price | The BTC price is live (CoinGecko, fallback $77,300) and cannot be edited. Replaced with a manual 70%-of-revenue tip. |
| mining-calculator | en es pt tr hi ru | Hashrate in MH/s or GH/s for GPU rigs | The field is TH/s only |
| mining-calculator | en es pt tr hi ru | Block reward and difficulty are pre-filled from live data and can be adjusted manually | Difficulty is live (blockchain.info) and block reward is a fixed 3.125. Neither can be edited. |
| mining-calculator | en | Multi-GPU rig advice | Reworded to "several machines" |
| dca-calculator | en | A results table lists each purchase date, amount, price and cumulative value | No per-purchase table. Outputs are a chart (value vs invested, accumulation/FOMO zones), summary rows (avg buy price, total coins, number of purchases) and DCA vs Lump Sum. |
| dca-calculator | en | The calculator flags limited history | No warning. It only errors when there is no price data at all. |
| tax-calculator | en es pt tr hi ru | Applies FIFO cost-basis matching across trades and gives a gain/loss per transaction | One sale per calculation: (sell − buy) × qty × preset rate. The FIFO/LIFO/HIFO buttons are display-only (`method` is not in the calculate deps, TaxCalculator.tsx:389). |
| tax-calculator | en es pt tr hi ru | Enter each trade with its date and asset | No date or asset fields. Inputs are Country (17), Income Bracket, Holding Period toggle, Buy Price, Sell Price and Quantity. |
| tax-calculator | en es pt tr hi ru | Run through your transaction history | No history or import. Sales are entered one at a time. |
| tax-calculator | en es pt tr hi ru | Export the results summary | No export. The how1 sentence was replaced with the real Short-Term vs Long-Term panel. |
| tax-calculator | en es pt tr hi ru | Tax-rate fields accept your local short- and long-term rates | No rate fields. Rates are presets per country × bracket × holding period. |
| tax-calculator | en | The holding period is calculated from the dates you enter | No dates. The user picks the holding period. |
| tax-calculator | en es pt tr hi ru | Include all fees | No fee field. The text now says to fold fees into the buy and sell prices. |
| tax-calculator | en es pt tr hi ru | "The calculator uses FIFO" | FIFO is only the default label and does not change the tax |
| what-if | en es pt tr hi ru | Bought X "at price Y" / a hypothetical purchase price input | The inputs are amount (USD), coin and past date. The historical price is looked up. |
| what-if | en es pt tr hi ru | Entry price can be typed manually | No price field |
| what-if | en es pt tr hi ru | Project forward with a custom future or "current" price | No such field. The tool only looks backward. |
| what-if | en es pt tr ru | Reverse calculation from a target value | Not available |
| what-if | en | Annualized return; a multiplier output (e.g. 4.2×) | Neither is shown. Outputs are value, ROI, Invested, Coins Bought, Price Then/Now, Profit/Loss, Purchased On, a chart and Share on X. |
| what-if | en | Results update in real time with no submit button | There is a Calculate button. Quick scenarios calculate immediately. |
| what-if | en pt | The current price "updates automatically" | Fetched once per Calculate |
| staking-calculator | en es pt tr hi ru | "Staking amount is the number of tokens" | Staking Amount is in **USD**. Tokens are only a conversion via Token Price once a coin is picked. |
| staking-calculator | en es pt tr hi ru | A "Price at end of period" field that is optional, with the current price used if blank | Does not exist. Rewards are projected in USD at constant value. |
| staking-calculator | en | Duration can be set in days, months or years | Staking Period is in days (presets 30d to 3y) |
| staking-rewards-calculator | en es pt tr hi ru | Choose a compounding frequency, including manual monthly restaking | Only an Auto-Compound toggle: Yes (daily) or No (simple) |
| staking-rewards-calculator | en es pt tr hi ru | Stake amount is the number of tokens | USD |
| staking-rewards-calculator | en es pt tr hi ru | Enter the APY net of validator commission | The tool subtracts Validator Commission itself (Effective APY = APY × (1 − fee)), so a net APY would double-count it. The EN inputs1 already said this, so the EN text contradicted itself. |
| staking-rewards-calculator | en es pt tr hi ru | The optional price field converts token rewards to USD and shows whether rewards outpace price depreciation | Token Price converts USD rewards into tokens. There is no price-change modelling. |
| staking-rewards-calculator | en tr | Duration in days, months or years | Days only |
| staking-rewards-calculator | en | An unstaking-period field | Does not exist. Replaced with the real Monthly Earnings Breakdown table (up to 36 months). |
| break-even-calculator | en es pt tr hi ru | A single "total fee %" field (enter 0.2% for 0.1% + 0.1%) | Separate Entry Fee (%) and Exit Fee (%) fields, 0.1% each by default. Trade mode also has Long/Short and Position Size (USD). |
| break-even-calculator | en | Accounts for "any other friction" | Fees only |
| break-even-calculator | en ru | Add funding to "the fee field" | Two fee fields. The text now points to Exit Fee. |
| impermanent-loss-calculator | en es pt ru | Enter an initial deposit ratio and the price change of the volatile vs the stable asset | The pool is fixed at 50/50. Inputs are Total Liquidity Provided (USD), Token A Price Change (%), Token B Price Change (%), Pool Fee APR and Holding Period. |
| impermanent-loss-calculator | en es pt tr hi ru | The price change is entered as a ratio (2×) | Inputs are percentages (enter 100 for 2×) |
| impermanent-loss-calculator | en | The reference range runs from 0.1× to 10× (+900%) | The table runs from −90% to +500%, which is 0.1× to 6× (ImpermanentLossCalculator.tsx:157) |
| impermanent-loss-calculator | en es pt tr hi ru | Initial pool value and token quantities are inputs | Only Total Liquidity Provided in USD. There are no quantity fields. |
| liquidation-calculator | en | Uses a standard maintenance-margin rate and lets you enter your exchange's figure | No MMR field. MMR is fixed by the Exchange pill: Binance 0.4%, Bybit 0.5%, OKX 0.5% (LiquidationCalculator.tsx:41-43). |
| funding-rate-calculator | en | Shows an "hourly" funding impact | Outputs are per interval, daily, weekly, monthly (30d), annual (365d) and a holding-period total |
| funding-rate-calculator | en | Position size can be entered in coins | USD only |
| market-cap-calculator | en | "Price per token is the current trading price" (as an input) | The input is Target Price. Current price, market cap and supply are auto-filled for reference after a coin search |
| market-cap-calculator | en, ru | "solves for any one variable given the other two" | Two modes only: What price? (target market cap → price) and What market cap? (target price → market cap). Circulating supply is always an input |
| market-cap-calculator | en | "supports both market cap and FDV calculations" | No max-supply or FDV input or output |
| roi-calculator | en | Buy price, sell price and investment-amount inputs; amount can be entered as a token quantity; enter a weighted-average cost basis | Initial Investment (USD), Current Value / Exit Value (USD, 1x–3x buttons), Holding Period (days, 1M–5Y presets), Total Fees Paid (optional) |
| roi-calculator | es, pt, tr, hi, ru | Per-token purchase and sale price fields (ru also: investment as a token quantity) | Same as above |
| roi-calculator | en | "multiplier" output | Outputs: Total ROI, Net Profit / Loss, Annualized ROI, Holding Period, Comparison with Traditional Assets |
| roi-calculator | en, es, pt, ru | Toggle between total and annualized ROI | Both are always shown |
| roi-calculator | en, es, pt, tr, hi, ru | 50% in 90 days ≈ 380% annualized | The tool's own formula gives +417.8% |
| compound-calculator | en | Principal "in USD or coin value" | USD only |
| compound-calculator | en | Frequencies daily/weekly/monthly/annually (4) | 5 options, including Quarterly |
| compound-calculator, compound-interest-calculator | en | Duration "in years or months" | Investment Period (years) only |
| compound-calculator | en | For DCA, put the total planned investment in the starting amount | Has a Monthly Contribution field (default $100), added every month |
| compound-interest-calculator | en, es, pt, tr, hi, ru | The rate is an APY, and "daily compounding at 8% APY beats annual at the same rate" | The field is Annual Interest Rate (APR): a nominal rate compounded n times a year |
| satoshi-converter | en, es, pt, tr, hi, ru | Converts between satoshis, bits, mBTC and BTC | Only Satoshi and BTC, plus a USD input mode |
| satoshi-converter | en, es, pt, tr, hi, ru | USD "or other fiat" | USD and EUR only |
| satoshi-converter | en, es, pt, tr, hi, ru | Type in any field and all other fields update | One Amount field plus an Input Mode switch |
| satoshi-converter | en | Millisatoshi (mSat) conversions supported | No mSat unit |
| satoshi-converter | en, es, ru | BTC price updates every 60 seconds | Fetched once on load, plus a manual Refresh button |
| gwei-converter | en, es, tr, hi, ru | Converts any denomination to its USD cost for a typical transaction | Shows the USD value of the entered amount. Transaction costs appear only in the Gas Cost Reference table at fixed levels of 1/5/10/20/50/100 gwei |
| gwei-converter | en | Enter base fee + priority fee to see the effective gas price | A single Amount field |
| gwei-converter | en, es, pt, tr, hi, ru | USD cost of a 21,000-gas transfer at the entered gas price | Only in the reference table, at fixed gwei levels |
| gwei-converter | en, es, pt, tr, hi, ru | Enter both gas price and gas limit | No gas limit field |
| gas-calculator | en | Three live tiers: slow (base fee), standard (small tip), fast (higher tip) | Transaction Speed has 4 multipliers on the entered price: Slow ×0.8, Standard ×1.0, Fast ×1.3, Instant ×1.8 |
| halving-calculator | en, es, pt, tr, hi, ru | "Exact" time and blocks remaining (en: "displays the current block height") | Estimated from block 840,000 on 20 Apr 2024 at 144 blocks/day (Current Block (est.)) |
| halving-calculator | en, es, pt, tr, hi, ru | "No manual inputs; the block height is fetched from the network" | Height is estimated, not fetched. Mining Impact Analysis has 4 inputs: Your Hashrate (TH/s), Electricity Cost per kWh, Power Consumption (W), Current BTC Price (auto-filled) |
| nft-profit-calculator | en | Purchase price includes gas; only sale-side gas | Buy Price (ETH), plus separate Gas Cost: Buy ($) and Gas Cost: Sell ($) |
| nft-profit-calculator | en, es, pt, tr, hi, ru | Buy price in ETH or USD, including gas | ETH only. Gas is entered separately, in USD |
| gpu-mining-calculator | en | Daily, weekly and monthly projections | Daily, Monthly, Yearly |
| gpu-mining-calculator | es, pt, tr, hi | "…and other GPU-mineable coins" | Exactly 4 coins: ETC, RVN, ERGO, KAS |
| gpu-mining-calculator | en, es, ru | Rerun at today's coin price and at 20% lower | Coin price comes from the live feed or fallback and cannot be edited |
| gpu-mining-calculator | en | Enter manual difficulty and block reward for coins not listed | No such fields |
| exchange-fees | en | Select maker/taker or VIP tier on each exchange | One Trade Type, one Order Type and one 30-Day Volume Tier, applied to all 10 exchanges. Table shows Fee Rate, Fee ($) and With Discount |
| vesting-calculator | en | Month-by-month or quarter-by-quarter table; USD value at current prices | The table is always monthly, plus a chart. Value ($) uses the manual Token Price |
| vesting-calculator | en, es, pt, tr, hi, ru | Token price auto-filled from CoinGecko for listed tokens | Manual Token Price (default $0.50). The component makes no fetch |
| margin-calculator | en, es, pt, tr, hi, ru | Computes maintenance margin and available leverage | Outputs: Required Margin, Free Margin, Margin Level, Margin Call Price, Max Loss Before Call |
| margin-calculator | en | Maintenance margin is typically 50% of initial margin | Maintenance Margin Rate as a % of position value (default 0.5%, presets 0.4/0.5/1.0). Empty Wallet Balance means isolated margin = required margin |
| hodl-vs-trade | en | Shows the break-even win rate needed to match HODL | Not shown. Shows Difference ($ and %), Total Trades, Total Fees Paid |
| hodl-vs-trade | en, es, pt, tr, hi, ru | HODL return auto-calculated from the coin's price change | You type Price Change (%) yourself. No coin selection, no price data |
| rebalancing-calculator | en | Shows the tax implications of each trade | The plan explicitly excludes taxes, fees, spreads and minimum order sizes |
| rebalancing-calculator | en, es, pt, tr, hi, ru | Supports up to 20 assets | No limit (Add Asset; at least 2 required) |
| rebalancing-calculator | en, es, pt, tr, hi | Validates that targets sum to 100% | Targets are scaled proportionally; the result shows a "Targets total" |
| rebalancing-calculator | en | A "rebalance by" field | Rebalance Mode (Buy + Sell / Buy Only) plus Additional Investment |
| rebalancing-calculator | en, es, ru | Deviation threshold field | None |
| rebalancing-calculator | en | Estimated fees per trade, and flags where cost exceeds benefit | None |
| tp-sl-calculator | en, es, tr (how0); all 6 (inputs0) | TP and SL are entered as % distances from entry ("15% means 1.15× entry") | Stop-Loss **Price** input (with −1/2/3/5% preset buttons); TP is computed from the Risk:Reward Ratio (presets 1:1, 1:1.5, 1:2, 1:3, 1:5) or typed as a price |
| tp-sl-calculator | en | target prices returned "in the coin's currency" | all prices and P&L in USD |
| tp-sl-calculator | en | for several TP tiers, run separate calculations | Take-Profit Levels: Single TP / 2 TPs / 3 TPs with 50/50 and 50/30/20 position splits |
| ico-roi-calculator | all 6 (inputs0), en (how0) | "Investment amount" input | Token Amount (number of tokens); initial investment = ICO price × tokens |
| ico-roi-calculator | en (how0, how1, inputs0); all 6 (how1) | vesting: post-vesting ROI, "% unlocked" input, realized vs unrealized, "wait for further unlocks" | no vesting at all; outputs Current ROI, Initial investment, Current value, ATH value, ATH ROI, ATH multiple |
| ico-roi-calculator | en | current price auto-filled for listed tokens | Current Price is typed in (no fetch) |
| ico-roi-calculator | en | compare multiple ICOs side-by-side | one calculation at a time; 3 quick scenarios |
| airdrop-calculator | all 6 (how0), en (inputs0) | net profit after claim gas fees; "gas fee to claim" input | no gas input; inputs: Tokens Received, Price at Receipt, Current Token Price, Sold?/Sell Price, Tax Jurisdiction |
| airdrop-calculator | all 6 (how1) | decides whether claiming is rational given current gas fees | no gas modelling |
| airdrop-calculator | en | break-even analysis: minimum token value to justify gas | none (there is a Notable Airdrops reference table) |
| airdrop-calculator | all 6 (inputs1) | enter qualifying-activity costs to see "true ROI" | no such input; outputs Income Tax on Airdrop, Capital Gains Tax, Total Tax Liability, Net Value After Tax (5 jurisdictions) |
| node-calculator | all 6 (how0) | payback period output | Break-even stake value (no payback period) |
| node-calculator | en (how0); all 6 (inputs1) | hardware cost field | only Monthly Infrastructure Cost (USD) |
| node-calculator | en | daily net income | net monthly + annual income, effective APR |
| node-calculator | all 6 (inputs0), en (how0) | "staking APY" / "Annual APY" input | Network APR (%) applied as a simple annual rate |
| node-calculator | en, ru (inputs1) | slashing-risk field lowers expected return | no slashing input; Validator Commission and Node Uptime reduce rewards |
| asic-mining-calculator | en (how1) | models break-even at current price and at 50% lower BTC price | coin price comes from live whattomine data (fallbacks), not an input |
| asic-mining-calculator | all 6 (inputs1) | models the next halving with pre/post-halving projections | no halving model |
| lending-calculator | all 6 (how0) | interest owed on borrowing positions; lending vs borrowing in one view | deposits only (Deposit Amount, Quoted APY, Term, Platform Performance Fee, Compounding Model) |
| lending-calculator | en (how1) | borrower view: total interest obligation, effective loan cost | none |
| lending-calculator | en | compare platforms side-by-side | one scenario at a time |
| lending-calculator | all 6 (inputs0; hi only principal) | principal = loan amount for borrowers / "in USD or crypto"; borrow APY | Deposit Amount (USD); Quoted APY (supply rate) |
| lending-calculator | en | duration in days, weeks, months or years | Term (months) only, presets 3/6/12/24 |
| lending-calculator | en (inputs1) | health-factor threshold field | none |
| leverage-calculator | all 6 (how0, inputs1) | liquidation price output / "liquidation price field" | Liquidation Distance in % (100 ÷ leverage); no price |
| leverage-calculator | all 6 (how0, inputs0) | "Collateral" input = your deposit | Position Size = full position value in USD; Initial Margin (collateral) is derived = size ÷ leverage |
| leverage-calculator | all 6 (how0) | target or stop-loss exit price input | Price Change (%) input with ±5/10/25/50% presets |
| leverage-calculator | all 6 (how0) | leverage range 2x–125x | presets 1x–125x |
| leverage-calculator | en, es, pt, tr, ru (inputs1) | break-even price including entry/exit fees | no fees or maintenance margin in the model |
| yield-farming-calculator | en (how0); all 6 (inputs0) | separate base-fee APR and reward-token APR inputs | one Pool rate field with an APY/APR toggle |
| yield-farming-calculator | en (how0, inputs1); all 6 (inputs1) | reward-token price input; model a 50%-lower price scenario | none (inputs: deposit, rate, gas entry/exit/per harvest, harvest frequency, expected IL, farming period) |
| salary-calculator | en (how0, inputs0) | salary entered as annual or monthly | Annual Salary only (Fiat → Crypto mode) |
| salary-calculator | en | payment currency "BTC, ETH, USDC, or any token" | BTC, ETH, USDT only |
| salary-calculator | all 6 (inputs0) | select a reference fiat currency | no selector: Fiat → Crypto is USD; Crypto → Fiat lists 7 currencies |
| salary-calculator | en (how1) | also calculate the value at 20% below current price | live price only, no price input |
| inflation-hedge | all 6 (how0), en (how1) | historical backtest over any period / "data-driven" 2014-to-today comparison | forward projection with fixed per-country inflation and fixed assumed asset returns |
| inflation-hedge | all 6 (inputs0) | starting month/year input | Time Period: 1, 3, 5 or 10 years |
| inflation-hedge | all 6 (inputs0) | country loads historical CPI, 30+ countries | 8 countries, one fixed rate each |
| inflation-hedge | all 6 (inputs1) | official CPI from statistics agencies; history back to the early-BTC era (USD/EUR/GBP/JPY) | built-in constants |
| inflation-hedge | en | cryptocurrency selection drives a price comparison | 5 toggles (BTC, ETH, USDC + Yield, Gold, S&P 500) with fixed assumed returns |
| reverse-roi | all 6 (how0, inputs0) | solves for the maximum buy price for a target ROI % | solves for the required future token price given Current Token Price, Investment and Target Profit ($) |
| reverse-roi | all 6 (inputs0) | Target ROI is a % input | Target Profit in dollars |
| reverse-roi | all 6 (inputs0) | current price can be the expected exit price | it is the entry price (auto-filled from the coin search or typed) |
| reverse-roi | all 6 (how1, inputs1) | averaging down / DCA: required average cost basis | none |
| reverse-roi | en, ru | fee field for round-trip costs | none |
| crypto-loan-calculator | en (how0); all 6 (inputs0) | collateral asset + crypto amount input (e.g. 1 BTC) | Collateral Value (USD) |
| crypto-loan-calculator | en | collateral value auto-filled at current price | typed in |
| crypto-loan-calculator | en (how0); all 6 (inputs0) | loan amount input | derived: collateral × LTV % |
| crypto-loan-calculator | en | effective APR output | Monthly/Total Interest, Total Repayment, Margin Call / Liquidation collateral values |
| loan-calculator | all 6 (how0) | full amortization table splitting each payment into principal and interest | Monthly Interest Schedule (interest-only), simple interest |
| loan-calculator | all 6 (how0, inputs1) | origination fee input | none |
| loan-calculator | all 6 (inputs0) | loan principal input | derived from Collateral Value × LTV; Platform presets (Nexo/Aave/Binance/Custom) |
| loan-calculator | all 6 (how1) | effective cost including fees | Total Interest + Total Repayment, no fees |
| loan-calculator | en | remaining balance falls; shorter term = higher monthly payment | balance constant (interest-only); monthly interest same for any term |
| loan-calculator | all 6 (inputs1) | collateral ratio field (150–200%) | LTV % input |
| pip-calculator | en (how1) | cross-rate to normalize to account currency | everything in USD |
| pip-calculator | en | cross pairs such as ETH/BTC | coin vs USD only (5 USDT quick pairs + search) |
| pip-calculator | all 6 (inputs0) | position size is a base-currency quantity | Position Size with USD/Coins toggle (default USD) |
| pip-calculator | en (inputs1) | choose the correct contract type | no contract-type setting |
| portfolio-calculator | all 6 (how0, inputs0) | purchase price, quantity, current price inputs; total P&L, % gain | name + current $ value + Target % per asset |
| portfolio-calculator | all 6 (inputs0) | live prices from CoinGecko | no price fetch |
| portfolio-calculator | all 6 (how1) | highlights any single asset above 30–40% | Diversification score: Good = ≥4 assets and largest <50%; Moderate = ≥3 and <60%; else Poor |
| portfolio-calculator | en, es, pt, ru (how1) | what-if by adjusting asset prices | edit the $ value of an asset |
| portfolio-calculator | all 6 (inputs1) | average cost basis field; summary with overall ROI and best/worst performers | Total Investment (feeds presets), allocation table (Value, Actual %, Target %, Rebalance $), Diversification score |
| mining-roi-calculator | en es pt tr hi ru | Pool fees are factored in or automatically calculated from a pool-fee % | No pool-fee field. Inputs: Equipment Cost ($), Monthly Mining Revenue ($), Monthly Expenses ($) ("Electricity, internet, maintenance"), Scenario, plus 3 Quick Scenarios |
| mining-roi-calculator | en | You enter a "projected mining duration" | The projection is fixed at 36 months |
| mining-roi-calculator | en es pt tr hi ru | Monthly electricity cost is calculated from hashrate, power consumption and tariff | Monthly Expenses is one typed-in USD figure (default 150) |
| mining-roi-calculator | en es pt tr hi ru | Monthly revenue is auto-calculated from hashrate, difficulty, block reward and coin price | Monthly Mining Revenue is typed in (default 300, presets $200–800) |
| mining-roi-calculator | en | An "expected difficulty change" field exists | No such field. Three revenue scenarios always run side by side: +20%/yr, flat, −20%/yr. The Scenario toggle only highlights a table row |
| mining-roi-calculator | en | Compares mining ROI with buy-and-hold | No comparison. Outputs: break-even (realistic), monthly profit, Simple ROI / Month, Scenario Comparison (break-even, after 1/2/3 yr), 36-month cumulative P&L chart, 12-month breakdown |
| electricity-cost-calculator | en | You enter one total power draw; hourly cost is shown | Inputs: Number of Devices × Power per Device (W), rate, Uptime (hours/day), optional Monthly Mining Revenue. Rows are Daily/Monthly/Yearly only |
| electricity-cost-calculator | en | An always-present "break-even electricity rate field" | This is the Max Profitable Rate result row. It appears only after the optional Monthly Mining Revenue is entered |
| difficulty-calculator | en es pt tr hi ru | The tool estimates/predicts the next difficulty adjustment | You type the Expected Difficulty Change (%). The tool applies it |
| difficulty-calculator | en | Computes the change from time since the last adjustment and block production rate | No block data is used |
| difficulty-calculator | en es pt tr hi ru | Block height and last-adjustment block are auto-fetched; average block time comes from recent blocks | Nothing is fetched. Inputs: Current Difficulty (T, default 145), Expected Difficulty Change (%, default 8), Current Daily Revenue (USD), Your Network Share (fraction; display only) |
| difficulty-calculator | en es pt tr hi ru | The projected change comes from expected/actual blocks | It is the user's input. Difficulty × (1+c); revenue ÷ (1+c) |
| unit-converter | en es pt tr hi ru | Converts all common denominations for multiple networks at the same time | 4 assets (BTC, ETH, SOL, USDT), one at a time. All units of the selected asset are listed |
| unit-converter | en | Handles ERC-20 token decimal conversions / lets you pick a specific ERC-20 token | Only USDT (6 decimals) is built in, alongside BTC, ETH and SOL units |
| unit-converter | en | Has a "custom decimals field" | None |
| unit-converter | en es pt tr hi ru | Has a "raw value field" and a "human-readable field" | One results list of every unit, plus the Conversion Result hero |
| uniswap-calculator | en es pt tr hi ru | A swap previewer (output amount, price impact, effective rate, v2/v3) | An LP calculator: Deposit Amount, Pool TVL, Pool Daily Volume, Fee Tier, Price Move, Farming Period → LP share, daily fee income, gross fees, impermanent loss, net, break-even days |
| uniswap-calculator | en es pt tr hi ru | Input token / output token / input amount fields | None of these fields exist |
| uniswap-calculator | en | Pool liquidity depth is auto-fetched on-chain | TVL and volume are typed in or chosen from presets |
| uniswap-calculator | en es pt tr hi ru | Fee tier selects which v3 pool to use (3 tiers) | It is the fee rate applied to volume. There are 4 tiers: 0.01/0.05/0.3/1% |
| uniswap-calculator | en es pt tr hi ru | Price impact % output; slippage and split-route mechanics | No price-impact or routing output |
| bridge-comparator | en | WBTC is an asset option | Options are USDC, USDT, ETH and DAI |
| bridge-comparator | en es pt tr ru | The amount picks a fee tier or minimums | Every bridge = flat % + fixed fee. No tiers or minimums (`maxAmount` is defined but unused) |
| bridge-comparator | en es pt tr hi ru | Connext is among the listed bridges | The five are Across, Stargate, Hop, Synapse and LayerZero OFT |
| bridge-comparator | en ru | Source and destination gas shown separately; slippage risk shown | One combined Network fee row, no slippage. Each bridge also gets a Security score /5 |
| bridge-comparator | en | Distinguishes liquidity-pool bridges from canonical bridges | One formula for all bridges |
| mev-calculator | en es pt tr hi ru | Calculates the cost of MEV protection services | Shows the loss With private orderflow (assumed 25% of the unprotected loss) and Potential savings. No protection cost |
| mev-calculator | en es pt tr hi ru | Risk depends on transaction type (swap/LP/arbitrage); pool liquidity depth is a driver | Inputs: Swap Amount, Slippage Tolerance (%), Network (4), DEX (3) |
| mev-calculator | en es pt tr hi ru | Shows the sandwich loss as % and $ | Shows a 0–100 MEV Risk Score (Low/Medium/High) and the loss in $ only |
| mev-calculator | en | Net savings = exposure − protection cost | Savings = unprotected loss − private-orderflow loss |
| gamefi-calculator | en es pt tr hi ru | Takes monthly operating costs | Takes Daily In-Game Expenses (USD) and a Marketplace / Claim Fee (%), plus Active Days per Month and Estimated Resale Value |
| gamefi-calculator | en ru | A "token price decay" field exists | None |
| gamefi-calculator | en | Token price is auto-filled for listed tokens | Always manual (or chosen from presets) |
| gas-fee-calculator | en (not rendered) es pt tr hi ru | Uses the EIP-1559 base fee + priority tip model | One gas price × Transaction Speed multiplier (0.8/1/1.3/1.8) |
| gas-fee-calculator | en (not rendered) | Each chain has its own gas mechanics | Switching chain only loads a default gas price and native-token price. The formula is the same everywhere |
| sharpe-calculator | en es pt tr hi ru | Return = total gain over the measurement period (EN also says it may be non-annualized) | The field is Expected Annual Return (%). All inputs are annual |
| sortino-calculator | en | Takes your returns, separates upside from downside moves, and computes downside deviation | Downside Deviation (%) is a typed-in input. The MAR is the Risk-Free Rate (%) field |
| sortino-calculator | es pt tr hi ru | "Enter returns and the MAR" | Inputs: Expected Annual Return, Risk-Free Rate (used as the MAR), Downside Deviation |
| sortino-calculator | en es pt tr hi ru | Returns must be periodic (daily/weekly/monthly) | Annual figures, not a return series |
| treynor-calculator | en es pt tr hi ru | Return = total return over the measurement period | Expected Annual Return (%) |
| kelly-calculator | en | Describes a "Win/loss ratio" input | Average Win (%) and Average Loss (%) inputs. The ratio b = win/loss is derived from them. |
| var-calculator | en, es, pt | Expected return should be entered alongside volatility | No expected-return input. The model is zero-mean and uses Daily Volatility (%) only. |
| var-calculator | en | Accounts for individual asset volatilities in multi-asset portfolios | One Daily Volatility (%) for the whole portfolio. Outputs are VaR $/% and CVaR $/%. |
| drawdown-calculator | en | Accepts an equity curve or a series of returns and outputs a separate maximum drawdown | Inputs are Peak Value, Current Value and Assumed Monthly Return (plus presets and "% of peak" buttons). Outputs are current drawdown %/$, required gain, risk level and months to recover. |
| drawdown-calculator | en | Recovery gain = trough / peak − 1 | Code uses peak / current − 1 |
| risk-of-ruin-calculator | en | Starting capital and number of trades are inputs | Inputs are Win Rate, Reward-to-Risk, Risk per Trade and Max Tolerable Drawdown. Loss units = MaxDD / risk. |
| risk-of-ruin-calculator | en | Runs a Monte Carlo simulation | Closed form: (q / (p·R))^(MaxDD/risk), and 100% when expectancy ≤ 0 |
| risk-of-ruin-calculator | es, pt, tr, hi, ru | Result is the probability of losing all capital | Probability of hitting the user-set Max Tolerable Drawdown (default 30%). The EN version already said "or a defined percentage". |
| slippage-calculator | en | Recommends an optimal tolerance from current pool conditions | No recommendation and no live data. It shows Within/Above tolerance and Minimum received. |
| trade-expectancy-calculator | en, es, tr, hi, ru | Expected dollar return from average winning/losing trade (implies dollar inputs) | Average Win/Loss are entered in R. Dollars = Account Size × Risk per Trade × expectancy R. |
| trade-expectancy-calculator | en | Shows an expectancy ratio (% of trade size) and annual projected profit | Shows risk $, expected P/L per trade/month/quarter, break-even win rate and profit factor. No annual figure. |
| bitcoin-unit-converter | all 6 | Every unit has its own field ("enter in any field") | One Amount field plus From Unit and To Unit selects (BTC/mBTC/μBTC/sat). A table shows all 4 units. |
| bitcoin-unit-converter | all 6 | USD from a live, auto-refreshing CoinGecko BTC price | BTC Price (USD) is a typed field with a fixed default (77,300) and no fetch |
| bitcoin-unit-converter | all 6 | Auto-detects pasted number formats including comma separators | Plain `type=number` input with parseFloat and no format detection |
| cross-chain-bridge-calculator | all 6 | Token field / "enter the token" | No token field. Transfer Amount ($) only. |
| cross-chain-bridge-calculator | en, es, pt, tr, ru | Tool estimates bridge and gas fees | The user types Bridge Fee (%), Gas Fee Source ($) and Gas Fee Destination ($). The tool sums them. |
| cross-chain-bridge-calculator | all 6 | Compares multiple bridging paths side by side | One route at a time |
| cross-chain-bridge-calculator | all 6 | 10+ supported networks | 8 chains: Ethereum, Arbitrum, Optimism, Polygon, BSC, Solana, Base, Avalanche |
| cross-chain-bridge-calculator | all 6 | Gas inputs default to current network averages | Fixed defaults of $5 / $0.50 |
| cross-chain-bridge-calculator | en, es, pt, tr, hi | Time output reflects 7-day native-bridge withdrawals vs 2–15 min | Fixed lookup per chain pair of about 5–20 min. 7 days is never shown. |
| crypto-correlation-calculator | all 6 | Enter two assets/tickers and pick a 7/30/90/365-day window | Two textareas of comma-separated % returns plus 3 sample pairs. No window selector. |
| crypto-correlation-calculator | all 6 | Fields accept any CoinGecko ticker (5,000+ coins). Uses daily closing prices. | No tickers and no price download. Lists are paired by order, the shorter list sets the count, and at least 2 points are needed. |
| crypto-correlation-calculator | all 6 | Scatter plot and rolling-correlation chart | No charts. Outputs are r, R², a strength label and a diversification note. |
| crypto-index-fund-calculator | all 6 | Historical backtest of a custom basket: 2–20 assets, custom weights, start date. Total/annualized return, max DD, Sharpe. | Top 5/10/20 from a fixed market-cap weight snapshot (20 coins). Outputs weights, $ per coin, annual fee and % beyond BTC. |
| crypto-index-fund-calculator | all 6 | "Use it to backtest" and shows the best risk-adjusted weighting scheme | No backtest and no return metrics |
| crypto-index-fund-calculator | all 6 | Asset rows with tickers and weights summing to 100%. Start/end dates. | No rows and no dates |
| crypto-index-fund-calculator | all 6 | Rebalancing options daily/weekly/monthly/quarterly | Monthly / Quarterly / Annually, and the choice is only echoed (no effect on the math) |
| crypto-index-fund-calculator | all 6 | Output compares the index vs a BTC-only benchmark | Only a "Diversification: X% allocated beyond BTC" row |
| crypto-portfolio-rebalance-calculator | all 6 | Editable fee field | Fixed 0.1% on total trade volume |
| crypto-portfolio-rebalance-calculator | all 6 | Minimum trade threshold ($) filters dust | No threshold. Within ±0.5 pp of target = "Hold". |
| crypto-sentiment-calculator | all 6 | Combines put/call ratio and on-chain flows into a real-time reading | 5 user-typed inputs: Fear & Greed, Social Media Volume, Funding Rate, RSI, Long/Short Ratio |
| crypto-sentiment-calculator | all 6 | Coin selector (default BTC) | None |
| crypto-sentiment-calculator | all 6 | Automatically fetches data for each component | Nothing is fetched. There are 3 presets. |
| crypto-sentiment-calculator | all 6 | Weight sliders (incl. on-chain) | Fixed weights 30/25/20/15/10 |
| crypto-sentiment-calculator | all 6 | 30/90/365-day historical chart | No chart. Outputs are the score, Signal, Contrarian Signal and component scores. |
| defi-yield-aggregator | all 6 | Built-in coverage of major protocols incl. Lido | Compares only the user's editable protocol list. The presets have no Lido. |
| defi-yield-aggregator | all 6 | Enter a token. Shows live APY, TVL, protocol age and audit status. | The user types name, APY, Low/Med/High risk and TVL. No age or audit data. |
| defi-yield-aggregator | all 6 | Models auto-compounding (12% APR → 12.75% APY) | Linear proration: amount × APY × days/365 |
| defi-yield-aggregator | all 6 | Estimates deposit/withdraw gas and break-even period | No gas at all |
| defi-yield-aggregator | all 6 | Token selector (ETH/WBTC/USDC/USDT/DAI/LP) | None. Investment Amount ($) and Investment Period (days). |
| defi-yield-aggregator | en, es, pt, tr, ru | Chain filter | None |
| defi-yield-aggregator | all 6 | Risk-tolerance slider filtering by audit, TVL and age | Per-protocol risk level scales APY by 1.0 / 0.7 / 0.4 |
| defi-yield-aggregator | all 6 | Conservative mode = audited, $100M+ TVL, 6+ months | A preset list (Aave, Compound, Maker DSR, Spark, all Low) |
| defi-yield-aggregator | en | Ranks by net APY after gas | Ranks by risk-adjusted return, plus an equal-split total |
| exchange-fee-comparator | en, es, pt, tr, hi, ru | Trading-pair selector | None. A Spot/Futures switch instead. |
| exchange-fee-comparator | all 6 | Shows withdrawal fees and round-trip cost | Fee on one trade only (rate, $ fee, token-discounted fee) |
| exchange-fee-comparator | en, es, pt | "The comparator factors in withdrawal fees" | Not included |
| exchange-fee-comparator | all 6 | Ranks by total cost (entry + exit + withdrawal) | Ranks by the single-trade fee with the exchange-token discount applied |
| exchange-fee-comparator | all 6 | Separate spread-cost column | None |
| exchange-fee-comparator | all 6 | Fiat on/off-ramp bank and card fees | None |
| flash-loan | all 6 | Gas cost is entered in gwei and converted using the ETH price and ~300k–500k gas units | `Gas Cost per Hop ($)` is typed in USD and multiplied by `Number of Hops` to give Total Gas Cost |
| flash-loan | all 6 | The protocol fee is preset or fixed by the lending protocol | `Protocol Fee (%)` is an editable input (default 0.09). The Quick Scenarios set it to 0.09 / 0 / 0.09 |
| flash-loan | all 6 | Calculates the maximum gas price you can pay and stay profitable | No such output. The tool shows Gross Profit, Protocol Fee, Total Gas Cost, Net Profit, ROI on Gas, Min Profitable Spread and Break-Even Loan Amount |
| gas-optimization | all 6 | Analyzes historical gas prices to find the cheapest time to transact (windows that are 30–60% cheaper) | There is no time or historical data. The tool compares sending transactions individually with batching them through a multicall contract (~30k gas overhead per batch) |
| gas-optimization | all 6 | Has a transaction-type input (transfer, ERC-20 approval, DEX swap, NFT mint, custom) | Inputs are Number of Transactions, Average Gas per Tx, Gas Price (Gwei), ETH Price ($) and Batch Size |
| gas-optimization | en | "The calculator shows you" a $12-at-peak vs $5-on-Sunday swap | The tool has no time dimension. The sentence was reworded as a plain example |
| gas-optimization | all 6 | Presets: ETH transfer 21k, ERC-20 65k, Uniswap V3 150–300k, NFT mint 100–200k | Three Quick Scenarios: Simple Transfers 21k, DeFi Swaps 150k, NFT Mints 200k. Each also sets 10 tx, 15 gwei, $2,400 ETH and batch size 5 |
| gas-optimization | all 6 | Output includes an hour/day-of-week heatmap and recommended execution windows | Output: Savings from Batching ($ and %), Individual and Batched totals and cost per tx, Number of Batches, Target Gas Price (for <$1/tx) |
| gas-optimization | all 6 | Has an L2 comparison section (Arbitrum, Optimism, Base, Polygon) | None |
| governance-voting | all 6 | Has a governance-token selector (UNI, AAVE, COMP…) and shows historical participation rates | Everything is typed in: Total Token Supply, Your Token Holdings, Current Token Price ($), Quorum Requirement (%), Proposal Threshold (tokens). There are 3 Quick Scenarios |
| governance-voting | all 6 | The calculator "shows" Uniswap's 2.5M threshold and 40M quorum | Those figures are the values of the Large DAO (Uniswap-scale) preset |
| governance-voting | en es pt tr ru | Fetches total and circulating supply and delegation data automatically | No data is fetched |
| governance-voting | all 6 | Flags whether self-delegation is needed | There is no delegation logic |
| governance-voting | all 6 | Output: your share of quorum, average voter turnout, top delegates, delegation amplification | Output: voting power %, Tokens Needed for Proposal, Tokens Needed for Quorum, Dollar Value of Quorum, two yes/no checks (submit proposal / block quorum alone) |
| nft-rarity | all 6 | Inputs are a collection name or contract address plus a token ID | Inputs are Collection Size plus manual trait rows (Trait Name and Items with trait), with Add/Remove and 3 Quick Scenarios |
| nft-rarity | all 6 | Scoring uses Information Content, −log2(frequency) | The score is the sum of 1/frequency (a 1% trait adds 100) |
| nft-rarity | all 6 | Fetches trait metadata from on-chain data and marketplace APIs; unrevealed collections are flagged | Nothing is fetched |
| nft-rarity | all 6 | Output: the real rank in the collection (#142 of 10,000) and the rarest trait highlighted | Output: Rarity Score, Rarity Tier, Estimated Rank (a band of the collection size, not a real rank), Statistical Rarity, Trait Breakdown. Nothing is highlighted |
| nft-rarity | all 6 | Compares with the floor price and recent sales of similarly ranked items | The tool has no price data. The text now advises the reader to make that comparison |
| token-unlock | all 6 | Enter a token name and see its full unlock schedule (dates, % of supply, recipients) | All values are typed in for a single unlock: circulating supply, total supply, unlock amount, days, price, sell pressure % |
| token-unlock | all 6 | Token selector covering 200+ tokens | None |
| token-unlock | all 6 | Date-range filter (30/90/365 days) and a cliff vs linear filter | None. `Days Until Unlock` exists but feeds no calculation |
| token-unlock | all 6 | Output timeline (date, amount, USD, recipient) and a supply-inflation chart | Output: Projected Price Impact and price, Post-Unlock Supply, Dilution, Unlock % of Circulating, Estimated Sell Pressure, Current Market Cap, New Market Cap, FDV |
| token-unlock | all 6 | Price impact comes from historical data on similar unlocks, relative to daily volume | Price impact = sold $ / market cap, applied as the same % drop |
| whale-alert | all 6 | The amount can be entered as a token quantity (5,000 BTC) or in USD | `Transaction Amount ($)` only |
| whale-alert | all 6 | Shows the time needed to liquidate without moving the market more than 2% | None. The tool shows Market Depth Needed to keep impact under 1% |
| whale-alert | all 6 | Compares against current market depth and order-book liquidity | Uses the Daily Trading Volume you type, multiplied by the Spread Impact Factor |
| whale-alert | en | Token selector covering all major coins | None |
| whale-alert | all 6 | Destination type (exchange deposit/withdrawal, wallet-to-wallet, cold storage) affects the analysis | Only a Buy/Sell Direction, which flips the sign |
| whale-alert | all 6 | Output: recommended TWAP time and 30-day history of similar transactions | Output: Estimated Price Impact, Transaction % of Daily Volume, Dollar Impact on Market Cap, Estimated Slippage, Market Depth Needed |
| whale-alert | all 6 | Alert severity rating Low/Medium/High/Critical | Whale Tier: Shrimp, Fish, Dolphin, Whale or Mega-Whale |
| arbitrage | all 6 | Optional transfer-time and slippage-tolerance fields | None. Instead there are Trade Amount pills ($1k–$10k) and 3 Quick Scenarios |
| arbitrage | all 6 | Annualized return estimate based on round-trips per day | None |
| options | en ru | The premium can be what you pay *or receive* (a written option) | The field is `Premium Paid ($)` and the model is long-only (max loss = premium) |
| options | en ru | P&L at expiry is shown per contract and in total | Only the total across contracts is shown |
| options | es pt tr hi | Risk-free rate field defaulting to the US Treasury yield (~4.3%) | None |
| options | es pt tr hi | Outputs call premium, put premium and five Greeks | Output: break-even, max loss, max profit, intrinsic and time value, P&L at expiry, payoff table (−50%…+50%) |
| options | pt tr hi | Judges over/undervaluation against a model and compares model IV with market IV | No model price or IV is shown |
| options | pt tr hi | Builds spreads and shows a combined P&L profile | Handles one bought option only |
| tax-loss-harvesting | all 6 | Inputs are total/realized capital gains (short- and long-term) plus a list of unrealized losses | Inputs: up to 5 positions (coin, buy price, current price, quantity), Filing Status, Tax Bracket (%), and an optional wash-sale date check |
| tax-loss-harvesting | all 6 | Outputs net taxable gain and the excess loss carried forward | None |
| tax-loss-harvesting | all 6 | Models short-term (≤37%) and long-term (15–20%) gains separately | One tax bracket is applied to everything |
| tax-loss-harvesting | all 6 | Optional fields for state tax rate, prior-year carry-forward losses and the $3,000 cap | None. The $3,000 limit is hard-coded |
| tax-loss-harvesting | all 6 | Output: effective tax rate reduction and a year-over-year carry-forward schedule | Output: Estimated Tax Savings, Position Breakdown, Total Harvestable Losses, Total Unrealized Gains, Net Portfolio Value |
| restaking | en | Compounded returns over a chosen time horizon | Simple one-year figures |
| restaking | en es pt tr ru | A risk-adjusted comparison against plain staking | A plain native-vs-restaking comparison, plus a separate Slashing Risk level |
| restaking | all 6 | Displays a worst-case loss scenario | Only a Slashing Risk level (Low…Very High) based on AVS count |
| restaking | all 6 | Time-horizon input that controls the compounding projection | None |
| restaking | all 6 | Slashing-risk toggle with a configurable loss % | None |
| restaking | en pt tr ru | Side-by-side comparison with liquid staking alternatives | Only native staking vs restaking |
| liquid-staking | all 6 | Shows the current LST exchange rate | The `LST Premium/Discount (%)` input comes from a preset and is editable; the tool outputs LST Tokens Received |
| liquid-staking | all 6 | Effective cost versus running your own validator | None |
| liquid-staking | all 6 | Total combined APY for the stacked strategy | The DeFi Composability Value is a separate ETH figure; there is no combined APY |
| liquid-staking | all 6 | Several "optional DeFi yield inputs" | There is one `DeFi Composability APY (%)` field, 5% by default and always applied |
| perpetual-futures | all 6 | Margin (collateral) input | `Position Size ($)` is notional; margin = size / leverage |
| perpetual-futures | all 6 | Computes notional exposure | Notional is the input. Outputs: Net P&L, ROE, liquidation price, funding |
| perpetual-futures | all 6 | Shows how many funding periods you can afford before margin runs out | Shows total funding cost and a Funding Cost by Day table |
| perpetual-futures | en | Compares with a quarterly futures contract or leveraged spot on margin | None |
| perpetual-futures | all 6 | Direction determines how funding flows affect your balance | Funding is always subtracted as a cost, whatever the direction |
| perpetual-futures | all 6 | Holding period entered in days | `Holding Period (hours)` |
| perpetual-futures | all 6 | Shows funding paid *or received* and an effective break-even price | Shows funding paid only. There is no break-even output |
| payback-period | all 6 | Yield entered as an annual % or a flat $ per day/month | `Expected Monthly Return (%)` only |
| payback-period | all 6 | Toggle between simple and compound interest (daily/monthly/annual) | Always compounds monthly. Instead there are Lump Sum/DCA and a Target Multiplier (2/3/5/10x) |
| payback-period | all 6 | Optional operating-cost, yield-decay and discount-rate fields | None |
| payback-period | all 6 | Output: payback in months, total return, ROI timeline chart | Output: years and months, Total Invested, Value at Payback, Monthly Return for 1yr Payback, Estimated Payback Date, Growth Milestones list (not a chart) |
| dva | all 6 | DVA invests "or sells" each period | It never sells, and each purchase is capped at 2× the base monthly amount |
| dva | all 6 | Inputs: target monthly (or biweekly) growth and starting portfolio; shows the required investment from actual performance | It is a simulation: Total Budget, Investment Period, Target Value Path (Linear/Aggressive), Base Monthly Investment, Asset Volatility, Starting Asset Price |
| dva | all 6 | The current asset price is used to compute tokens to buy or sell | The starting price seeds a fixed simulated price path |
| dva | all 6 | Output: required investment this period, current vs target value, comparison chart | Output: DVA vs DCA %, total invested, final value, average cost, months DVA invested more or less |
| bitcoin-energy | all 6 | Models the whole network from network hashrate (EH/s) and fleet J/TH | Models one miner or farm: Hashrate (TH/s), Power Consumption (W), Electricity Source, Hours/Day, Electricity Cost, Carbon Offset Price |
| bitcoin-energy | all 6 | Outputs network power draw, energy per transaction, energy per block and annual TWh | Output: daily kWh, annual MWh, annual CO2 (t), electricity cost, offset cost, energy cost per BTC, BTC/year, household equivalent |
| bitcoin-energy | all 6 | Compares with national energy use, VISA and gold mining | Only a Household Equivalent row |
| bitcoin-energy | all 6 | Renewable-mix % input (~55%) adjusts emissions | A 7-option Electricity Source selector with fixed CO2 factors |
| bitcoin-energy | all 6 | Electricity cost estimates the network's total spend | It gives your own Annual Electricity Cost and Energy Cost per BTC Mined |
| bitcoin-energy | all 6 | A daily-transactions input produces a per-transaction figure | None |
| on-chain-metrics-calculator | en es pt tr hi ru | Computes the MVRV **Z-score** | Plain MVRV ratio = market cap / realized cap |
| on-chain-metrics-calculator | en es pt tr hi ru | Computes SOPR | "SOPR Estimate" hard-derived from MVRV (1.02 / 1.00 / 0.97) |
| on-chain-metrics-calculator | en es pt tr hi | A "SOPR input" field | No SOPR input; inputs: BTC price, market cap, realized cap, 24h volume, active addresses, tx count (+3 scenarios) |
| on-chain-metrics-calculator | en es pt tr hi ru | Each metric shown with a historical percentile ranking + bull/bear/neutral signal | Zone labels (Undervalued…Overbought, etc.) and overall Buy/Hold/Sell signal; no percentiles |
| grid-trading-calculator | en es pt tr ru | Shows each order's price and size | Lists first 10 grid levels + "and N more"; one Investment per Grid figure |
| grid-trading-calculator | en es pt tr hi ru | Output: per-level buy/sell prices, order sizes, monthly returns | Annual Return, Max Profit, Price/Profit/Investment per Grid, Required Movement, Daily Fills, Total Fee Cost, Grid Levels (no monthly) |
| validator-calculator | en es pt tr hi ru | Outputs effective APY and time to recoup hardware/VPS investment | Annual Net Profit + ROI on stake value; Break-Even in months; no hardware-investment input |
| validator-calculator | en es pt tr hi ru | For ETH factors in consensus rewards + MEV tips | Rewards = user-entered APY × uptime × (1 − commission) for every network |
| validator-calculator | en es pt tr hi ru | Models effect of validator count on rewards | No validator-count input or model |
| validator-calculator | en es pt tr hi ru | Network selection determines the reward formula | Same formula; selection pre-fills price/APY/hardware and sets stake to network minimum (5 networks) |
| validator-calculator | en es pt tr hi ru | MEV-boost toggle (+0.5–1% APY) and electricity field | Neither exists; fields: stake, price, APY, hardware $/month, commission, uptime |
| validator-calculator | en es pt tr hi ru | Output: effective APY, ROI timeline for hardware | Net profit/ROI, gross/net rewards, operating costs, stake value, break-even, slashing rows, Self-Stake vs Delegate (10% fee) |
| token-valuation-calculator | en es pt tr hi ru | TVL-to-market-cap ratios, sector benchmarks | No TVL, no benchmarks; FDV vs MC, P/E, comparison with 1 of 8 reference market caps |
| token-valuation-calculator | en es pt tr hi ru | "Enter TVL for DeFi tokens" | No TVL field |
| token-valuation-calculator | en es pt tr hi ru | Sector selector (DeFi, L1/L2, GameFi, Infra) loading multiples | Only "Comparable Project" select (ETH, SOL, ARB, OP, UNI, AAVE, DOGE, SHIB) |
| token-valuation-calculator | en es pt tr hi ru | Unlock-schedule field (locked %, vesting timeline) | None; dilution = total vs circulating supply |
| token-valuation-calculator | en es pt tr hi ru | Output: sector-relative valuation score, fair price range | MC/FDV, MC/FDV ratio, Dilution Risk, Price at Target MC, Required Growth, Implied P/E, P/E Implied Price, comparable price/growth |
| if-i-had-bought | en es pt tr hi ru | Fetches real historical price for any picked date; multiplies by today's price | 9 preset moments with hardcoded approximate prices; "Price Now" is a stored snapshot (2026-05-03) |
| if-i-had-bought | en es pt tr hi ru | Comparison vs S&P 500 / stock index fund | None; only Tesla-shares and months-of-rent "fun comparisons" |
| if-i-had-bought | en es pt tr hi ru | Coin selector = all major coins on CoinGecko | 7 coins: BTC, ETH, SOL, BNB, ADA, DOT, DOGE |
| if-i-had-bought | en es pt tr hi ru | Any date back to listing (BTC from 2010 — en, ru) | Choice of 9 preset moments (from "Bitcoin Launch 2009") |
| if-i-had-bought | en | Price chart overlaying entry point; amount "or your local fiat" | No chart; USD only |
| millionaire-calculator | en es pt tr hi ru | Token+quantity → required price / budget → tokens needed modes | No token, quantity or price inputs; USD portfolio, monthly, return, allocation |
| millionaire-calculator | en es pt tr hi ru | Token selection and current price auto-filled from CoinGecko | No token picker, no fetch |
| millionaire-calculator | en es pt tr hi ru | Inflation-adjusted toggle | None |
| millionaire-calculator | en es pt tr hi ru | Output: tokens needed, price needed, growth chart with $100K/$250K/$500K/$1M markers | Time to goal, totals, Monthly Needed 5/10 yr, Required Return 10 yr, milestone table $100K/$500K/$1M/$5M/$10M; no chart |
| pizza-day-calculator | en es pt tr hi ru | Value per slice and per bite | Cost per pizza then (BTC) / now, satoshis per pizza, opportunity cost, pizzas you could buy today |
| pizza-day-calculator | en es pt tr hi ru | CAGR view toggle | None |
| pizza-day-calculator | en es pt tr hi ru | Purchase details hardcoded | Number of pizzas, pizza price, BTC amount are editable; only $0.0041/BTC is fixed |
| pizza-day-calculator | en es pt tr hi ru | Output: % gain, CAGR, Lamborghinis/houses/islands, timeline chart (en, ru) | None of these exist |
| retirement-calculator | en es pt tr hi ru | Stress-test "increasing monthly contributions over time" | One constant monthly contribution |
| rainbow-chart-calculator | en es pt tr hi ru | Overlays bands on BTC price history; chart updates (en) | No chart; band table + result rows for the entered price |
| rainbow-chart-calculator | en es pt tr hi ru | Investment amount models a purchase moving to higher bands / potential return | Shows BTC bought at entered price vs at model price only |
| rainbow-chart-calculator | en es pt tr hi ru | Current BTC price auto-filled from live data | Static default $77,300 |
| rainbow-chart-calculator | en es pt tr hi ru | Output: historical accuracy of band as buy/sell signal | None |
| etf-fee-calculator | en es pt tr hi ru | Select one or more ETFs | No selection; 14 fixed rows (7 BTC ETFs, 5 ETH ETFs, 2 self-custody) |
| etf-fee-calculator | en es pt tr hi ru | "Compare 2–6 funds" ETF Selection (incl. HODL — en) | No selection; HODL not listed (BTCO, Grayscale BTC Mini, ETH funds are) |
| etf-fee-calculator | en es pt tr hi ru | Expected return default 10% | Default 12% |
| etf-fee-calculator | en es pt tr hi ru | Custom expense-ratio field | None |
| etf-fee-calculator | en es pt tr hi ru | Ranked comparison chart, $ annual fee per fund | Table (ER, final value, fees paid, net return), unranked fee bars, gross value, GBTC drag, lowest-fee ETF, self-custody savings |
| etf-fee-calculator | en | Direct ownership modelled "with self-custody costs" | Self-custody rows at 0%, no costs |
| token-burn-calculator | en es pt tr hi ru | Burn input is an annual % rate | "Burn Rate per Month (tokens)" |
| token-burn-calculator | en es pt tr hi ru | Differentiates total-supply vs circulating-supply burns | Burns from circulating only; Total Supply unused in projections |
| token-burn-calculator | en es pt tr hi ru | Projection Period (1–20 years) input | Fixed 1/3/5-year rows |
| token-burn-calculator | en es pt tr hi ru | Supply curve, year-by-year burns, cumulative burned, 0–100 score, BNB/ETH comparison | Pressure label Low–Extreme, monthly/annual %, time to burn 10%/25%, supply + implied price at 1/3/5 yr, market cap |
| futures-basis-calculator | en es pt tr hi ru | Enter maker/taker fees for both spot and futures legs | One "Trading Fee per Side (%)" applied to both legs (+ Position Size) |
| futures-basis-calculator | es pt tr | The calculator itself compares basis across exchanges/maturities | One spot/futures pair at a time |
| defi-insurance-calculator | en es pt tr hi ru | Coverage-ratio input | Deductible (%) input; effective coverage = position − deductible |
| defi-insurance-calculator | en es pt tr hi ru | Break-even hack **probability**, cost/benefit over different horizons | Break-even hack **size** ($) for one coverage period; EV table at 5 fixed probabilities |
| defi-insurance-calculator | en es pt tr hi ru | Factors in claim success rates from historical data | Not modelled |
| defi-insurance-calculator | en es pt tr hi ru | Risk tier categorizes by audit status, TVL, age | 3 presets (Low/Medium/High with example protocols) that only pre-fill premium 2.5/5/10% |
| defi-insurance-calculator | en es pt tr hi ru | Claim-success-rate and alternative-yield fields; recommendation by risk tier | None; "Better" column in EV table only |
| crypto-card-cashback-calculator | en es pt tr hi ru | 1-, 5- and 10-year columns all compound at appreciation | 5-yr / 10-yr net rewards = net × years (no growth); only 1-yr value and 10-yr value apply appreciation |
| crypto-card-cashback-calculator | en es pt tr hi ru | Preset loads its "top bonus category" | Only the category's rate is loaded; category name never shown |
| crypto-card-cashback-calculator | en es pt tr hi ru | Rates capped at 0–10% | No cap in code (HTML max only); Crypto.com preset loads 100% |
| depin-earnings-calculator (how[1]) | en es pt tr hi ru | The rating list is Excellent (<6 mo) / Good (<12) / Acceptable / Negative carry, with Acceptable open-ended | Five ratings: Excellent ROI <6, Good ROI <12, Acceptable <24, **Slow payback** for 24+ months with positive net, and Negative carry when net is ≤ 0 (`DepinEarningsCalculator.tsx:72-76`) |
| depin-earnings-calculator (inputs[1]) | en es pt tr hi ru | "All values must be non-negative or the calculator shows an empty state" | Only daily tokens, token price and hardware cost are checked for negatives (`:45`). Annual Token Price Change has no minimum and can be negative (`:158-161`). Power, electricity and internet are not checked. |
| mining-coin-switcher-calculator (how[0]) | en es pt tr hi ru | Ranks the five coins for the rig you select | Only coins the rig has a hash rate for are ranked (`:61-68`, `:101-116`): 4 for a GPU (no BTC), 1 for each ASIC (S21→BTC, KS5→KAS) |
| polymarket-odds-calculator (inputs[1]) | en es pt tr hi ru | Prices must be "strictly between 0.01 and 0.99" | Any YES price with 0 < p < 1 is accepted, including 0.01 and 0.99. Bet size must be > 0 (`:34`). |
| looping-yield-calculator (how[1]) | en es pt tr hi ru | One-time gas is "two operations per loop" | `totalGas = gasPerLoop × loops`. The ×2 was removed, and the input is now the full per-loop cost (`:68`). |
| looping-yield-calculator (inputs[0]) | en es pt tr hi ru | Gas cost per loop is "counted as two operations per loop" | Same as above: the input is the whole loop's cost (borrow + re-deposit), multiplied by the loop count only |
| mstr-mnav-calculator (how[0]) | en es pt tr hi ru | Above 1.5× is a premium, below 1.0× is a discount | Zone labels are Discount to NAV <0.9×, Near NAV (Fair) 0.9–1.2×, Premium 1.2–2.0×, Extreme Premium ≥2.0× (`:75-78`) |
| mstr-mnav-calculator (how[1]) | en es pt tr hi ru | With debt it reports Enterprise NAV **and an enterprise mNAV** | `enterpriseMnav` is computed (`:66`) but never rendered. Only the "Enterprise NAV (− debt)" row is shown (`:185-188`). The headline mNAV is always market cap / BTC NAV. |
| profit-factor-calculator (inputs[1]) | en es pt tr hi ru | "Above a Profit Factor of 4 the tool warns of overfitting" (a conditional warning) | No conditional warning exists. A static benchmark disclaimer that mentions ">4 may indicate overfitting" shows under every result (`:181-183`). |
| pumpfun-bonding-curve-calculator (inputs[1]) | en es pt tr hi ru | "A large buy late in the curve shows heavy slippage" | Slippage = buy ÷ (30 + SOL already in curve) (`:41`, `:64`), so the same buy slips **less** late in the curve. 1 SOL gives about 3.3% at 0 SOL and about 0.9% at 85 SOL. |

## Not fixed — same defect class elsewhere on the page

1. **`quickAnswer`** (shown at the top of the page) repeats some of these claims; reported, not changed:

| slug | langs | claim | actual |
|---|---|---|---|
| lp-value-calculator | es pt tr hi ru | Example of a "$10,000 ETH/USDC position", with total LP return of +$346 (+3.46%) | The default preset is 5 ETH + 17,500 USDC ($35,000 now). The tool shows total LP return +$3,046 (+9.40%). +$346 (+1.07%) is the lead over HODL, not the total return. EN was already corrected. |
| converter | all 6 | Convert "between coins and fiat currencies" | Crypto to fiat only |
| position-size-calculator | all 6 | Risking 2% of $10,000 with a $500 stop distance "means a $400 position" | The formula gives 0.4 **coins** ($200 risk / $500 per coin). The tool's USD position at a $50,000 entry would be $20,000. |
| liquidation-calculator | all 6 | Formula Entry × (1 − 1/Leverage) | The tool adds the exchange MMR: Entry × (1 − 1/Lev + MMR). On Binance a $50,000 10× long gives $45,200 (the "~$45,000" is approximately right). Minor. |
| staking-rewards-calculator | all 6 | Example "Staking 32 ETH…" | The stake is entered in USD, not tokens. The figure (~0.94 ETH/yr with daily compounding) is reproducible once converted. Minor. |

| slug | langs | claim | actual |
|---|---|---|---|
| compound-interest-calculator | en, es, pt, tr, hi, ru | "$1,000 at 12% APY compounded daily becomes $1,127" | That is APR arithmetic. The tool's field is Annual Interest Rate (APR); 12% APY would give $1,120 |
| gpu-mining-calculator | es, pt, tr, hi | "RTX 4090 at 130 MH/s" | The RTX 4090 preset is 120 MH/s (`GPU_PRESETS`, GpuMiningCalculator.tsx:51) |
| hodl-vs-trade | en, es, pt, tr, hi, ru | "Factor in trading fees, tax implications, and time spent" | Only a per-trade fee. No tax or time inputs |
| nft-profit-calculator | en, es, pt, tr, hi, ru | Formula "Sale − (Buy + Gas + Marketplace Fee)"; 2 ETH / 1.2 ETH / 2.5% nets 0.75 ETH | The tool also deducts Creator Royalty (default 5%) and two gas fields, so its default output for this example is lower (minor) |

| slug | langs | quickAnswer claim | component |
|---|---|---|---|
| reverse-roi | all 6 | finds the maximum buy price for a target ROI ("buy at $36,850 or lower" for 100%) | solves for the required future price for a $ target profit |
| salary-calculator | all 6 | "estimate tax withholding" | no tax logic |
| inflation-hedge | all 6 | "$10,000 in USD from 2014 is worth ~$6,200 in real terms… BTC worth dramatically more" (historical) | forward projection from fixed assumptions, no historical data |
| yield-farming-calculator | all 6 | return = Principal × APY × Duration/365 − gas; $10,000 at 50% APY for 30 days ≈ $411 | APY is converted pro rata with compounding, (1.5)^(30/365) − 1 ≈ 3.39%, so ≈ $339 gross; IL is also deducted |
| leverage-calculator | all 6 | Leveraged P&L = Price Change % × Leverage × Position Size | Position Size is the full leveraged position: P&L = change × Position Size; leverage only scales ROI on margin |
| pip-calculator | all 6 | forex formula (One Pip / Exchange Rate) with a 100,000 EUR/USD example | crypto vs USD only; pip value = coins × tick size |
| lending-calculator | all 6 | example "8% APY for 90 days" | term is entered in whole months (minor) |

| slug | langs | claim | component |
|---|---|---|---|
| unit-converter | all 6 | "…and ERC-20 token decimals" | Only USDT (6 decimals) is built in. No arbitrary-decimals conversion |
| bridge-comparator | all 6 | "Estimate cross-chain bridge fees **and slippage**" | No slippage estimate. Outputs are fees, received amount, ETA and security score |
| gamefi-calculator | all 6 | "based on **play time** … 100 tokens/hour" | No play-time or hourly input. Uses Daily Token Rewards × Active Days per Month |
| uniswap-calculator | all 6 | Example "pool earning 20% APR in fees" | Soft mismatch: there is no APR input. Fees are derived from volume × fee tier × deposit/TVL. The QA's main sentence (LP fees + IL) is correct |
| mev-calculator | all 6 | "private mempools … can reduce this by 80–95%" | Soft mismatch: the tool hard-codes a 75% reduction (`protectedLoss = estLoss * 0.25`, MevProtectionCalculator.tsx) |

| slug | langs | claim | component |
|---|---|---|---|
| risk-of-ruin-calculator | all 6 | Formula "((1 − Edge)/(1 + Edge))^(Capital/Risk)" | The tool uses (q/(p·R))^(MaxDD/RiskPerTrade) and has no capital input |
| cross-chain-bridge-calculator | all 6 | "Estimate cross-chain bridge fees **and slippage**" | No slippage input or output |

| slug | langs | claim | component |
|---|---|---|---|
| gas-optimization | all 6 | "Optimize gas costs by timing transactions … off-peak hours save 30–60%" | Batching only; there is no timing feature |
| whale-alert | all 6 | "Track large crypto transactions … monitor exchange inflows" | It does not track anything; it is a manual impact estimator |
| options | all 6 | "Enter the option you actually bought **or sold** … and days to expiry" | Long-only (Premium Paid). Days to expiry does not change any displayed result |
| tax-loss-harvesting | all 6 | "$15,000 in realized gains and harvest $8,000 in losses" | There is no realized-gains input; gains come only from the unrealized gains of the entered positions |
| perpetual-futures | all 6 | "10x long BTC at $77,000 with **$5,000 margin** … liquidation ~$69,930" | The input is notional Position Size, not margin. The tool's formula gives 77,000 × (1 − 0.1 + 0.07%) ≈ $69,354 with default fees (≈$69,300 without), not $69,930 |
| payback-period | all 6 | "8% APY … 12.5 years without compounding, ~9 years with daily compounding" | Monthly % input only, always monthly compounding, no simple or daily option |
| dva | all 6 | "DVA targeting $500/month growth on a $10,000 BTC portfolio" | There are no starting-portfolio or growth-target inputs; it is a budget/period simulation |
| bitcoin-energy | all 6 | "Estimate Bitcoin's energy consumption per transaction, per block, and network-wide" | Per-miner footprint only. Also, "~150 J/TH" is inconsistent with the stated 130–180 TWh at 850 EH/s (that would be ~1,100 TWh; 15–25 J/TH fits) |
| restaking | en | "can **compound** to 6–10% total APY" | The tool uses simple annual APY with no compounding (minor) |

| slug | langs | claim | reality |
|---|---|---|---|
| on-chain-metrics-calculator | all 6 | "Analyze … MVRV Z-score, SOPR" | Plain MVRV ratio; SOPR is an MVRV-derived estimate |
| token-valuation-calculator | all 6 | "$50M TVL … 10x TVL, compare against sector median (5–15x)" | No TVL input and no sector benchmarks; no "fair value" output |
| millionaire-calculator | all 6 | "how much crypto you need … ~12.9 BTC or ~515 ETH" | No coin/price inputs; tool works in USD only |
| if-i-had-bought | all 6 | "$1,000 in Bitcoin on January 1, 2020 ($7,200)" | Jan 1 2020 is not one of the 9 preset dates (nearest: COVID Crash Mar 2020 at $5,000) |
| crypto-card-cashback-calculator | all 6 | "$3,000/mo at 1% base + 4% on 30% bonus earns $792 gross, ~0.0079 BTC, ~$950 after a year" | Tool applies base rate only to non-bonus spend: $684 gross, 0.00684 BTC, $820.80 (CryptoCardCashbackCalculator.tsx:56-66) |

| slug | langs | claim | component output |
|---|---|---|---|
| wallet-net-worth-calculator | en es pt tr hi ru | Example (0.25 BTC, 3 ETH, 50 SOL, 10 BNB, 5,000 USDC, 5,000 MATIC = $58,250) gives "HHI ~2,300 (Moderate), stablecoins about 11%" | For exactly those holdings the tool computes HHI ≈ 2,619, which reads **Concentrated** (>2,500, `WalletNetWorthCalculator.tsx:95-96`). Stablecoins are 5,000 / 58,250 = **8.6%**: MATIC is not on the stable list (`:87`). |

2. **`src/i18n/calculator-seo-ext.ts`** (the later sections: interpret, scenarios, checklist, mistakes, benchmarks,
   execution, hygiene, validation) was not in scope and carries the same class — e.g. mining-roi "resale value" and
   the "mining ROI vs buy-and-hold" output (EN lines ~5999–6027). Needs its own sweep.
3. **Hand-written EN pages:** `src/pages/exchange-fees.astro:82` describes a discount toggle that does not exist.

## Component issues seen in passing (not fixed)

- `StakingRewardsCalculator.tsx:173` compounds the entered **APY** daily as if it were an APR (7% → ~7.25%) — same
  class as the August yield-farming fix.
- `TaxCalculator.tsx:389` — FIFO/LIFO/HIFO buttons are display-only (not in the calculation deps).
- `MstrMnavCalculator.tsx:165` — on-screen note "Above 1.5 = premium, below 1.0 = discount" contradicts the tool's
  own zones (0.9 / 1.2 / 2.0).
- `InflationHedgeCalculator.tsx:405` — hint says BTC 50% / ETH 40%, the model uses 20% / 15%.
- `BridgeComparator` treats Amount as dollars whatever token is picked (1 ETH → ~$0 received).
- `CryptoCardCashbackCalculator.tsx:12/37` — Crypto.com preset loads a 100% bonus rate.
- `CompoundInterestCalculator.tsx:94` drops partial years; `SatoshiConverter.tsx:78/154` treats a USD-mode amount
  as EUR when EUR is selected; `LendingCalculator` re-compounds a quoted APY in Monthly/Daily mode.
- Inputs that change nothing: options Days to Expiry / IV, token-unlock Days Until Unlock, TLH Filing Status.
- Untranslated UI labels: NFT and whale tier names, several es scenario labels; `hi.ts:2588` mistranslates "Legendary".
- TLH: the page still says US crypto is exempt from the wash-sale rule while the tool disallows a 30-day rebuy
  (already open in the main audit).

## Reviewer notes (per batch, with file:line)

### Batch 1

- **Code issue, not text: StakingRewardsCalculator.tsx:173** compounds the entered **APY** daily (`Math.pow(1 + effectiveApy / 365, days)`), which treats it as a nominal APR. 7% "APY" with Auto-Compound yields about 7.25%. This is the same class of bug fixed in YieldFarmingCalculator on 24.08. Both staking slugs' inputs0 still say "APY already accounts for compounding". That statement is educational and true, but it contradicts what the code does with the number. I did not change it; the code should be fixed instead.
- **Code issue: TaxCalculator.tsx:389.** The FIFO/LIFO/HIFO selector is cosmetic and is not in the calculate dependencies. The text now says so honestly. Hiding the selector, or explaining it in the UI, is a separate decision.
- tax-calculator quickAnswer: "short-term gains taxed at 10–37%". The tool's US first bracket ($0–$50,400, TaxCalculator.tsx:40) applies 12%, so the 10% band is not modelled. This is a regulatory matter and was left untouched.
- mining-calculator quickAnswer: "140 TH/s at $0.06/kWh earns roughly $8–12/day". With the fallback data (BTC $77,300, difficulty 145T, block reward 3.125) the tool gives about $4.6/day revenue and about $0.3/day net. This is a market figure and was not changed, but it is far from what the tool shows.
- concentrated-liquidity: 39.5× was computed by re-running the component's own formula (node replica). Real V3 math for ±5% is also about 40×, so the old "~20×" was wrong on both counts.
- dca-calculator EN inputs1: "most major coins support up to 5 years of history" was **not changed**. The presets go up to 5Y, but the date picker has no lower bound and Binance/static history goes further back. I could not confirm this either way.
- dca-calculator inputs0 (all langs): "historical OHLC price data" was left as is. The service uses daily closes from OHLC klines (cryptoPriceService.ts:270-283), which is close enough.
- what-if inputs1: "fills the actual closing price for that day" was left as is. Static and Binance give the daily close, but the CoinGecko fallback returns a 00:00 UTC snapshot.
- impermanent-loss EN inputs1: "The fee APR field is optional" was left as is. The field is prefilled with 20% (ImpermanentLossCalculator.tsx:48), and blank gives 0, so it is not false.
- apy-apr how0: "across any compounding frequency" was left as is. There are 5 options, but this reads as vague rather than a count claim.
- mining how0 (all langs): "electricity and operational costs" was left as is. Only electricity is subtracted and the pool fee is taken out of revenue. It is vague rather than an invented field.
- tax inputs: the new text says amounts are "in the selected country's currency". Inputs have no unit label, but results are formatted with the country's currency symbol (formatCurrency in TaxCalculator.tsx).

### Batch 2

- **ROI 380% → 418%:** this is the only number about the tool that I changed. Under the paragraph's own formula, implemented at RoiCalculator.tsx:115, 1.5^(365/90) − 1 = 4.178. The tool would show +417.8%.
- **APY → APR (compound-interest-calculator, 18 paragraphs):**
  - Basis: the field label is `Annual Interest Rate (APR)` (CompoundInterestCalculator.tsx:194), and the code compounds it as a nominal rate, `principal * (1 + rate/n)^(n*t)` (:86).
  - The UI itself is inconsistent: the empty-state hint at :391 still says "…and APY to see…". Not changed (outside the seo-content file).
- **CompoundInterestCalculator.tsx:94:** the balance loop `for (y = 1; y <= Math.min(t, 30); y++)` only counts whole years. A 2.5-year period silently drops the half year, and anything over 30 years is capped. I wrote "years", not "whole years", to avoid documenting the bug.
- **VestingCalculator.tsx:108:** "Linear (daily)" produces exactly the same schedule as Monthly. EN inputs[0] "linear continuous vesting" was left, because the option exists.
- **GpuMiningCalculator.tsx:224–252:** one hashrate value (the presets are Ethash MH/s) is applied to all four coins in the Coin Profitability Ranking, even though they use different algorithms.
  - The live feed supplies network hashrate, block reward and price (:165–180), not "difficulty".
  - All 6 inputs[1] still say "network difficulty" is auto-filled. I treated that as a near-synonym and left it.
- **GasFeeCalculator.tsx:110:** switching network resets the native-token price to a hardcoded default; only Ethereum's price is fetched live on load. EN inputs[1] "ETH price is auto-filled from CoinGecko" was left, since it is true for the initial state.
  - EN how[1] calls Polygon and BNB Chain "layer-2". That is educational, and left.
- **SatoshiConverter.tsx:78 / :154:** in USD input mode with EUR selected, the typed amount is treated as EUR, but the label still reads "Amount (USD)". UI bug, not fixed.
- **ExchangeFeeComparator.tsx:30–31:** EN inputs[0] says "Binance, Coinbase, Kraken charge 0.04–0.10% maker / 0.06–0.20% taker". The tool's own table has Coinbase at 0.40/0.60 and Kraken at 0.25/0.40.
  - This is a market claim, so per the brief I did not change it. The text contradicts the tool's data, so worth a check.
- **src/pages/exchange-fees.astro:82** (hand-written EN page, outside this file): says "Toggle this option to see discounted rates", but there is no discount toggle (the With Discount column is always shown). It also lists MX among discount tokens, while MEXC has no discount in the component data. Not fixed.
- **HodlVsTradeCalculator.tsx:118:** inputs[1] (all 6) uses an example of "100 trades/year", but the input is Trades per Month, rounded to a whole number (so 8/month = 96/year). Left.
- **MarginCalculator.tsx:180:** EN inputs[1] defines margin ratio as maintenance / equity, with a call above 100%. The tool's Margin Level is balance / required margin, with the Margin Call Zone at ≤100%. That paragraph is educational and was left.
- **Hand-written EN pages:** for the slugs whose EN page is hand-written (`enTextRendered: false`), I grepped those pages for the same false phrases (auto-fetch, mBTC, 60 seconds, VIP, available leverage, auto-calculated, etc.). The only hit is the exchange-fees toggle above.

### Batch 3

- `src/components/InflationHedgeCalculator.tsx:405`: the UI hint says "Assumptions: BTC 50%, ETH 40%, …" but `ASSETS` (lines 45–46) uses BTC 20% and ETH 15%. This is a component bug. The new text deliberately states no rates.
- `src/components/LendingCalculator.tsx:73,76`: "Quoted APY" is compounded as if it were a nominal rate (APY/12 monthly, APY/365 daily), which overstates an APY that is already effective. Texts were not changed on this point.
- `src/components/LeverageCalculator.tsx:135–153`: Entry Price only gates the results and never enters any formula. The $ PnL with and without leverage is identical (both size × change); only ROI differs. The texts describe Entry Price as a field, which is true, so they were left.
- `src/components/ReverseRoiCalculator.tsx:104–110`: the likelihood labels (Very Likely … Extremely Unlikely) have no ui-strings translations, so they render in English on locale pages. Locale text says "likelihood label" rather than quoting them.
- `src/i18n/ui-strings/ru.ts:1019`: `'Amount': 'Количество'` is used as the $-amount aria-label in the Portfolio calculator. It is a mistranslation and should be «Сумма».
- Left as vague-but-true, not edited:
  - asic how1 "evaluate payback under different price scenarios" in all langs. Electricity and ASIC price can vary, coin price cannot. In EN only the explicit "the calculator models both [price levels]" sentence was fixed.
  - tp-sl ru how0 «целевые цены … в процентах от цены входа»: the results do show % distance.
  - crypto-loan inputs1 "maintenance LTV field": a synonym for the Liquidation LTV % input.
  - node how1 "justify the setup investment".
  - tp-sl en inputs1 "3:1 ratio" notation, where the tool displays "1 : 3.00".
- salary quickAnswer es/pt/tr/ru: "$100,000/yr at $73,700 → ~0,0259 BTC bi-weekly" is arithmetically wrong (≈0.0522). en/hi say 0.0498 at $77,300. This is a number, not a tool claim, so it was not touched.
- airdrop inputs0 "current token price is fetched automatically for listed tokens" was kept. It is true once the coin is picked in the Airdrop Token search (`AirdropCalculator.tsx:121–141`).

### Batch 4

- **mining-roi "resale value" and the full "buy-and-hold comparison output" claims are not in how/inputs.** They are in `src/i18n/calculator-seo-ext.ts`, mining-roi block at line 5996. The EN lines are 5999 (resale), 6000 (comparison output "mining ROI vs. buy-and-hold ROI"), 6003, 6011, 6019, 6020 and 6027 (resale, buy-and-hold). That file is out of this brief's scope and is NOT fixed. It needs the same treatment: the component has no resale input, no pool-fee input and no buy-and-hold output.
- mining-roi how[1] (all langs), "calculate ROI at three price points": left unchanged. It is advice, and the user can do it by scaling Monthly Mining Revenue, but there is no coin-price input.
- information-ratio-calculator inputs[0] EN, "Tracking error is computed from the series of period-by-period differences": left as a definition. In the tool, Tracking Error (%) is a typed-in input (InformationRatioCalculator.tsx:170). Borderline; rewrite it if you want parity with the Sortino fix.
- sharpe-calculator how[0] EN, "The calculator outputs a single number": an under-claim, left. The tool also shows excess return (% and USD) and 1σ downside/upside values.
- The sortino fix in es/pt/tr/hi/ru how[0] targets "Enter returns and MAR". That sentence is a shortened translation of the false EN sentence and names inputs that don't exist (a returns series, a MAR field).
- uniswap inputs[1] EN: all three sentences were replaced, not only the price-impact one. The original "slippage tolerance set separately in the Uniswap UI" and "for swaps with high price impact…" lines only make sense for a swap tool.
- Code issues seen in passing (not fixed, out of scope):
  - BridgeComparator.tsx:39/104: the Token pill does not affect the math, and Amount is treated and formatted as USD, so "1 ETH" shows about $0 received.
  - GamefiCalculator.tsx:104: break-even days = capital ÷ net per *active* day, not per calendar day.
  - MiningRoiCalculator.tsx:414: the Scenario pill labels (Optimistic/Realistic/Pessimistic) render raw English and are not passed through getUiString.
  - CryptoUnitConverter.tsx:39-41: numbers are always formatted `en-US`.
- gas-fee-calculator EN entry is not rendered (hand-written EN page). It was fixed anyway for consistency, as the brief asks.

### Batch 5

- **kelly-calculator, quickAnswer (all 6), arithmetic error, not a feature claim:** at a 55% win rate and 1.5:1 the formula gives (1.5·0.55 − 0.45)/1.5 = **25%**, not 18.3%. The how0 example (2:1 → 32.5%) is correct.
- **kelly-calculator:** Kelly is clamped at 0 (KellyCalculator.tsx:47), so the tool never displays a negative Kelly. "A negative Kelly means…" (inputs1, all langs) is educational, so it was left. The quoted "bankroll" input is Account Capital (USD); treated as a synonym.
- **risk-of-ruin-calculator, en inputs0:** "Ruin threshold… typically 50-100%" left as advice. The field is Max Tolerable Drawdown with presets 20–50 (RiskOfRuinCalculator.tsx:10).
- **var-calculator, en inputs1:** "10-day for swing traders" left. The presets are 1/7/30/90 (VarCalculator.tsx:14), but the field accepts 10.
- **slippage-calculator:**
  - en inputs0 lists fee tiers "(0.01%, 0.05%, 0.3%, 1%)". These are Uniswap's tiers. The presets are 0.05/0.1/0.3/1 (SlippageCalculator.tsx:9).
  - en how1 says the tool "shows the difference between your slippage tolerance setting and actual expected slippage". It actually shows a Within/Above label and Minimum received, not a numeric difference. Judged vague-but-true; left.
  - quickAnswer talks about order books and limit orders, while the tool models a constant-product AMM pool. This is not a feature claim.
- **trade-expectancy-calculator:** inputs0 still doesn't name the R unit; how0 now does. The how1 dollar example ($300/$100 → $60) was kept as a formula illustration.
- **bitcoin-unit-converter:**
  - "10,000 sats ≈ $7.37 at current rates" implies $73.7k. The tool's default BTC price is 77,300 (BitcoinUnitConverter.tsx:41). This is a market number, so it was left.
  - "mBTC uses 5 decimals… satoshis are always whole integers" was kept as a protocol fact. The tool itself formats every unit to up to 8 decimals and doesn't round sats (line 87).
- **cross-chain-bridge-calculator:**
  - how1 sentence 2 ("helps you decide whether speed or cost matter more") was kept. The time output depends only on the chain pair (CrossChainBridgeCalculator.tsx:43-47), so it can't tell a native bridge from a third-party one.
  - ru inputs1 sentence 2 ("native L2 bridges up to 7 days, liquidity bridges 2-15 min") is a general fact and doesn't claim to be tool output, so it was left.
  - quickAnswer "1 ETH … $2–10 gas" doesn't match the scenario defaults; this is a world figure.
- **crypto-correlation-calculator:** "Shorter windows (7-30 days)… longer windows (90-365 days)" and "when the rolling correlation diverges…" were kept as general advice. The tool's own hint suggests monthly returns.
- **crypto-index-fund-calculator:**
  - rebalanceFreq sits in the useCallback deps but is never used in the math (CryptoIndexFundCalculator.tsx:117).
  - The weight snapshot still lists MATIC (line 37).
  - quickAnswer "reducing single-asset risk by 40–60%" is an unverified world claim; the tool computes no risk.
  - "More frequent rebalancing captures momentum" is educational and arguably backwards (rebalancing is contrarian). Left.
- **crypto-portfolio-rebalance-calculator:**
  - inputs1 "(positive = buy, negative = sell)" was left as cosmetic. The tool shows unsigned amounts with Buy/Sell/Hold labels (line 290) and a signed deviation (line 298).
  - "Weights must sum to 100%" is advice. The code only requires the total to be above 0 (line 112).
  - Max 5 assets (line 97). Fee is fixed at 0.1% (line 134).
- **defi-yield-aggregator:**
  - inputs1 "Aggressive mode includes newer protocols…" was kept; it matches the "Aggressive (New protocols)" preset.
  - The quickAnswer gas break-even example ($15 gas, 14 days) is arithmetically right (5000·0.08/365 ≈ $1.10/day), but the tool has no gas input.
- **exchange-fee-comparator:**
  - inputs0 "VIP tier toggle…" was kept (vague-but-true). The actual control is "30-Day Volume Tier", which applies generic multipliers 1.0/0.9/0.8/0.6 to every exchange (ExchangeFeeComparator.tsx:39-43), not real per-exchange VIP schedules.
  - tr/hi/ru how1 "withdrawal fees vary $0–$25+" was kept; it is a general fact with no inclusion claim.
  - The how1 example "Coinbase Pro at 0.50%" differs from the tool's Coinbase spot taker of 0.60%. This is a world figure; left.
- **crypto-inheritance-calculator:** inputs1 says Has Will and Custody Method "drive the recommendations". Has Will actually only drives the Estate Plan row and the intestacy warning (line 232); the custody recommendation depends on Custody Method and value (line 103). Loose, judged acceptable.
- **Seen in passing, out of scope:** some UI keys have no locale translation, so the English label shows instead:
  - es: 'Converted Amount', 'R-Squared (R²)', the sentiment and DeFi preset labels, 'Strong Buy'/'Strong Sell'
  - ru: 'Strong Positive'
  - 'Risk Level' and 'Annually': missing in all 5 locales
  - tr: 'Top', and the index-fund disclaimer
- **Locale wording:** where an es preset label is untranslated in the UI, the es prose describes it in Spanish rather than quoting the English label.

### Batch 6

- **flash-loan how[1], all 6 languages (worked example, not changed):** "$100,000 … ~$9 flash loan fee". 0.09% of $100,000 is $90 (0.05% is $50), so $9 is an arithmetic error and the "$261 net" depends on it. I left it because it is an example number, not a description of the tool.
- **stock-to-flow inputs[1]:** "allows custom overrides for modeling other scarce assets (Litecoin, gold)". The fields are editable, so this is technically true. But the labels are BTC-specific ("Current BTC Supply") and the model price is PlanB's BTC regression (`StockToFlowCalculator.tsx`, `modelPrice`). Left as is.
- **options:** `Days to Expiry` and `Implied Volatility (%)` feed a Black-Scholes `fairValue`/`delta`/`impliedMispricing` that is computed but never rendered (`OptionsCalculator.tsx:158-165`). The texts now say these two inputs do not change the results; es/pt/tr/hi inputs[1] say it outright, and en/ru keep "IV is recorded for context". If the BS outputs are ever shown, update the texts.
- **token-unlock:** `Days Until Unlock` (`TokenUnlockCalculator.tsx:61`) is not used in any calculation. `Dilution` and `Unlock % of Circulating` are the same formula (`:94-95`).
- **tax-loss-harvesting:** `Filing Status` has no effect, because the limit is $3,000 for both options (`TaxLossHarvestingCalculator.tsx:103`); in reality married-filing-separately is $1,500. how[1] (all languages) still says crypto is not subject to wash-sale and you can rebuy immediately, while the tool disallows the loss on a rebuy within 30 days and shows a wash-sale warning (`:114`, `:364`). That is a legal statement, out of scope here, but the page now contradicts itself.
- **liquid-staking:** The initial `Native APY` state is 3.5 while the preselected Lido preset is 2.9 (`LiquidStakingCalculator.tsx:12,31`). The first render therefore does not match the Lido preset until a protocol pill is clicked. Protocol Comparison always uses the hard-coded presets, not the user's edits.
- **perpetual-futures:** Funding is always subtracted, even for a short with positive funding. Trading fees use the taker fee on both legs, and the maker fee only enters the liquidation formula (`PerpetualFuturesCalculator.tsx:54-63`).
- **dva:** "DVA vs DCA %" compares final values without adjusting for the different totals invested (`DvaCalculator.tsx:110`).
- **payback-period:** In DCA mode the target is initial × multiplier, not total invested × multiplier (`PaybackPeriodCalculator.tsx:43`).
- **i18n gaps that affect the wording I used:**
  - es.ts has no entries for these scenario labels, so they render in English and the es texts use the English names: gas (Simple Transfers…), governance (Small DAO…), NFT (Common…), token-unlock (Small Unlock (5%)…), whale (BTC Whale ($50M)…).
  - The NFT tiers (Common, Uncommon, Rare, Epic, Legendary) and whale tiers (Shrimp, Fish, Dolphin, Mega-Whale) are untranslated in all locales, so the locale texts use the English tier names.
  - hi.ts:2588 translates "Legendary" as "महापुरुष" ("great man"), so I left the scenario names out of the hi NFT text.

### Batch 7

- on-chain how1 keeps the educational "MVRV Z-score above 7 / below 0.1" sentence; the tool shows the plain ratio with its own zones (>3.5 Overbought, >2.5 Elevated, ≥1 Fair, <1 Undervalued — OnChainMetricsCalculator.tsx:88-93), so readers may misapply Z-score thresholds. Also "NVT Signal (90d)" is computed identically to NVT (line 85).
- if-i-had-bought how1: "$100 in ETH in January 2017 → $40,000+" is an unverified world figure (with the tool's stored ETH $2,419, IfIHadBoughtCalculator.tsx:29, it would be ~$30K); left unchanged.
- millionaire how1: "$500/month at 30% → millionaire in ~10–12 years"; the tool's own math gives ~12.5 years from the default $5,000 start (~13.3 from zero). Example number, left unchanged.
- token-valuation how1 "models the impact of token unlocks" left as vague-but-true (Dilution Risk / FDV), now that the false unlock-schedule field is removed.
- retirement inputs1: Inflation Rate does feed "Years Portfolio Lasts" (withdrawals indexed, RetirementCalculator.tsx ~l.78); the text only frames it as context for nominal figures — incomplete, not false, left.
- futures-basis inputs0: "(perpetual with funding)" / "use the 8-hour funding rate instead" — no funding input; read as advice, left.
- rainbow QA writes the model as ln/ln; code uses log10/log10 (a=5.84, b=−17.01) — same functional form. "$84,000 → Accumulate" verified for 2026-10-13 (model ≈ $179.6K, ratio ≈ 0.47).
- defi-insurance QA break-even "2.5% chance" ignores the default 10% deductible (tool-consistent break-even ≈ 2.78%); framed as economics, not a tool feature, so not listed above.
- Code issues seen (out of scope): CryptoCardCashbackCalculator.tsx:12/37 Crypto.com preset sets bonus rate 100% (with 30% spend share → absurd rewards), no upper bound in validation (l.54), `bonusCategory` state never rendered (l.21), 10-year value compounds all ten years of rewards for the full ten years (l.72). ValidatorCalculator.tsx:117 Break-Even = annual cost ÷ monthly profit (unit mix). TokenBurnCalculator.tsx: Total Supply only validated, never used. EtfFeeCalculator.tsx:284 bar colour `ticker === 'BTC'` now hits Grayscale Mini, not self-custody.
- Missing ui-strings (labels fall back to EN): 'Grayscale Bitcoin Mini (BTC)' and '6 Months Ago (Nov 2025)' in all 5 locales; 'vs GBTC over' (ru); 'Extreme' (tr); 'Low (Aave, Compound)', 'Medium (Uniswap, Curve)', 'High (New Protocols)' (es). Locale texts use natural translations for these.

### Batch 8

- **mining-coin-switcher how[1]** (en, hi, ru): calls the efficiency control a "slider" (hi "स्लाइडर", ru "ползунок"). It is actually a number input with min 50 and max 120 (`MiningCoinSwitcherCalculator.tsx:198-201`). es/pt/tr say "control"/"ayar". I left it alone because only the control type is wrong, not the feature.
- **mining-coin-switcher quickAnswer**: says "ERG at roughly −$0.68/day" with "RVN less than a cent behind". The tool shows ERG −$0.67 (−0.6746) and RVN −$0.68 (−0.6826). This is a rounding nit and was not reported as a mismatch.
- **rwa-yield inputs[0]**: says a preset will "auto-fill APY, management fee and minimum deposit". The code sets APY and fee, but only raises Deposit to the protocol minimum when the current deposit is below it (`RwaYieldCalculator.tsx:27-33`). There is no separate minimum-deposit field. The wording is loose but nothing is invented, so I left it.
- **looping-yield inputs[1]**: says "target LTV must sit between 0 and 95%". The code rejects only LTV ≤ 0 or ≥ 100% (`LoopingYieldCalculator.tsx:41`). 95 is just the field's HTML `max` (`:161`) and is also what the empty-state text says. I left it.
- **profit-factor how[1]**: the grading list (below 1 losing, 1.1–1.5 marginal, 1.5–2.0 good, above 2.0 excellent) leaves out the **Break-even** band at 1.0–1.1 (`ProfitFactorCalculator.tsx:38-43`). Each band it does state is correct, so this is an omission and I did not fix it.
- **mstr-mnav how[0]**: gives "Semler Scientific" as an example treasury stock, but the preset is now "Strive (ASST, incl. Semler)" (`MstrMnavCalculator.tsx:22`). That is a fact about the world, and inputs[0] already explains the merger, so I left it.
- **mstr-mnav code**: `enterpriseMnav` is dead code (computed at `:66`, never displayed). If an enterprise mNAV row is wanted, it belongs in the component. The text no longer promises it.
- **perpetual-funding-arbitrage code**: `dailyBreakdown` (`:81-87`) is computed but not rendered. The text never mentions it.
