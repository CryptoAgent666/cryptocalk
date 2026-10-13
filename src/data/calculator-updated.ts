// AUTO-GENERATED from git history — last meaningful content/logic change per calculator slug.
// Regenerate when needed; do not hand-edit. Used for honest schema dateModified + visible byline.
//
// 2026-08-25: 133 slugs moved to 2026-08-25. NOT a build-date stamp — each of these pages had its
// visible content change in the GEO pass: template H2s rewritten to question form, the widened
// authoritative-sources list, the new per-calculator "Where these numbers come from" block, and the
// two SVG diagrams on /profit-calculator/. The 5 slugs left alone are the ones where nothing on the
// rendered page changed; they were verified by scanning the built HTML for those markers, not assumed.
//
// 2026-09-05: gpu-mining-calculator + updates moved to 2026-09-05. Kaspa's monthly emission step
// changed the KAS fallback block reward (2.3125 -> 2.18267645), which is rendered on the GPU mining
// page both in the calculator and in its "Where these numbers come from" block; /updates/ gained a
// new entry. Both are real rendered-content changes, not a build stamp.
// 2026-10-06: gpu-mining-calculator, mining-coin-switcher-calculator + updates moved to 2026-10-06.
// Kaspa emission month 53 (2.18267645 -> 2.06017223) changed the rendered KAS reward on both pages;
// the switcher's five per-hash yields and prices were re-derived, which moved its results, its FAQ
// and its "Where these numbers come from" block; /updates/ gained a new entry.
// 2026-10-13: 17 slugs moved to 2026-10-13 after a calkcheck data-currency pass changed their rendered
// content: stale regulatory/market values corrected (Canada 2026 brackets in the tax calculator and the
// country table, US estate exemption $15M and gift exclusion $19k, UK CGT 18/24%, halving price history and
// hashrate, ASIC profitability, Lightning on-chain benchmark, ETF lowest-fee fund + the $0 hero bug, MSTR
// snapshot), methodology counts made ledger-driven. Other template pages only had raw <a href> text start
// rendering as links — a markup fix, deliberately NOT treated as a content change here.
// 2026-10-13 (later): gpu-mining-calculator moved to 2026-10-13. The ASIC and GPU calculators read live
// whattomine data again (own Worker at /api/whattomine instead of two dead public CORS proxies), and the GPU
// fallback snapshot was refreshed with its network hashrates corrected to MH/s; both change the numbers the
// page shows and its "Where these numbers come from" block. asic-mining-calculator was already 2026-10-13.
// 2026-10-13 (later still): asic-mining-calculator changed again the same day — Zcash difficulty factor
// 2^32 -> 2^13 and Scrypt/X11 read in GH/s. The server-rendered model list now reads "16 GH/s" / "1770 GH/s"
// and the difficulty-factor row of its "Where these numbers come from" block changed; the Z15 and D9
// profits change once the calculator runs. The date was already 2026-10-13; updates is too.
// 2026-10-13 (second pass): 101 slugs moved to 2026-10-13 because their "How to use" / "What do the inputs
// mean?" text was rewritten. On 105 of the 128 calculators that text described fields, toggles, outputs or
// features the calculator does not have (end-price fields, MEV-boost toggles, per-trade entry and export, live
// fetches of values the user actually types in, wrong defaults and units); 1,436 paragraphs across 6 languages
// now name only the real inputs and results. Four touched slugs are NOT bumped (dca-calculator,
// liquidation-calculator, funding-rate-calculator, exchange-fees): their only fixes were in the English entry,
// which their hand-written EN pages do not render, so no rendered page changed. For the 27 bumped slugs whose
// EN page is hand-written, the change is on the five locale pages; the date is per slug, so it moves for EN too.
// 2026-10-13 (third pass): 86 slugs moved to 2026-10-13 because the later prose sections from
// calculator-seo-ext.ts (interpret, scenarios, checklist, mistakes, benchmarks, execution, hygiene, validation)
// were checked against the components the same way: 1,065 paragraphs in 90 slugs named outputs, fields, modes or
// live data the calculator does not have, or attributed figures to it that its own formula does not produce.
// Four touched slugs are NOT bumped (reverse-roi, portfolio-calculator, funding-rate-calculator,
// apy-apr-calculator): only their unrendered English entries changed. asic-mining-calculator is excluded here (its
// copy was rewritten on a separate branch). The two dead Hindi links repaired in the same pass are a link fix, not a
// content change, so converter (whose only change it was) keeps its date.
// 2026-10-13 (copy fix): asic-mining-calculator's explanation rewritten in all 6 languages. It claimed a
// pre/post-halving projection and difficulty / block-reward inputs the calculator does not have (those come
// from the live feed), the EN subtitle promised an "ASIC value" output and EN validation a daily coin amount.
// Rendered text changed; the date was already 2026-10-13; updates is too.
// Same evening: DOGE merged mining for the L9 (new "Merged Mining" pills, LTC + DOGE revenue rows, own /updates/ entry) and two
// DOGE rows in the "Where these numbers come from" block. Still 2026-10-13. /methodology/ and the pt/tr
// editorial-policy pages print the ledger total, which ticked 108 -> 110; that counter is not treated as an
// editorial change, so their dates were left alone.
// 2026-10-14: compound-calculator, nft-profit-calculator + updates moved to 2026-10-14. Both pages' later prose
// sections (seo-ext) were about a different tool (leverage trading; NFT rarity) and were rewritten for their own
// calculator in 6 languages; the compound-calculator FAQ's daily-vs-monthly figures were corrected; the hand-written
// EN nft-profit page now shows the calculator's fee presets (OpenSea 1%) instead of 2.5% / SOL / X2Y2; /updates/ gained
// an entry.
// 2026-10-14: 19 slugs + updates moved to 2026-10-14 after the second calkcheck data-currency pass changed their
// rendered content: Polymarket fee/odds/legal text, card-cashback preset bugs and 10-year formula, validator-node
// yields/slashing/Rocket Pool, the "if I had bought" price snapshot and holding periods, mining/difficulty/energy
// network figures and fallbacks, gas/bridge/loan costs at 2026 gas prices, Kraken and Coinbase fee schedules,
// restaking base yield, retirement/salary/rebalance/pizza figures and the RWA T-bill reference (4.5% -> 4.1%).
export const CALCULATOR_UPDATED: Record<string, string> = {
  "404": "2026-05-11",
  "about": "2026-08-25",
  "ai-token-sector-calculator": "2026-10-13",
  "airdrop-calculator": "2026-10-13",
  "apy-apr-calculator": "2026-08-25",
  "arbitrage-calculator": "2026-10-13",
  "asic-mining-calculator": "2026-10-13",
  "bitcoin-energy-calculator": "2026-10-14",
  "bitcoin-unit-converter": "2026-10-13",
  "break-even-calculator": "2026-10-13",
  "bridge-comparator": "2026-10-14",
  "calmar-calculator": "2026-08-25",
  "compare": "2026-05-22",
  "compound-calculator": "2026-10-14",
  "compound-interest-calculator": "2026-10-13",
  "concentrated-liquidity-calculator": "2026-10-13",
  "contact": "2026-05-11",
  "converter": "2026-10-13",
  "covered-call-calculator": "2026-08-25",
  "cross-chain-bridge-calculator": "2026-10-14",
  "crypto-card-cashback-calculator": "2026-10-14",
  "crypto-correlation-calculator": "2026-10-13",
  "crypto-index-fund-calculator": "2026-10-13",
  "crypto-inheritance-calculator": "2026-10-13",
  "crypto-loan-calculator": "2026-10-14",
  "crypto-portfolio-rebalance-calculator": "2026-10-14",
  "crypto-sentiment-calculator": "2026-10-13",
  "dca-calculator": "2026-10-13",
  "defi-insurance-calculator": "2026-10-13",
  "defi-yield-aggregator": "2026-10-13",
  "depin-earnings-calculator": "2026-10-13",
  "difficulty-calculator": "2026-10-14",
  "drawdown-calculator": "2026-10-13",
  "dust-attack-calculator": "2026-10-13",
  "dva-calculator": "2026-10-13",
  "editorial-policy": "2026-08-25",
  "electricity-cost-calculator": "2026-10-13",
  "etf-fee-calculator": "2026-10-13",
  "exchange-fee-comparator": "2026-10-14",
  "exchange-fees": "2026-10-14",
  "flash-loan-calculator": "2026-10-13",
  "funding-rate-calculator": "2026-08-25",
  "futures-basis-calculator": "2026-10-13",
  "gamefi-calculator": "2026-10-13",
  "gas-calculator": "2026-10-14",
  "gas-fee-calculator": "2026-10-13",
  "gas-optimization-calculator": "2026-10-13",
  "geometric-mean-return-calculator": "2026-10-13",
  "governance-voting-calculator": "2026-10-13",
  "gpu-mining-calculator": "2026-10-13",
  "grid-trading-calculator": "2026-10-13",
  "gwei-converter": "2026-10-13",
  "halving-calculator": "2026-10-13",
  "hashrate-converter": "2026-10-13",
  "hodl-vs-trade": "2026-10-13",
  "ico-roi-calculator": "2026-10-13",
  "if-i-had-bought": "2026-10-14",
  "impermanent-loss-calculator": "2026-10-13",
  "index": "2026-08-25",
  "inflation-hedge": "2026-10-13",
  "information-ratio-calculator": "2026-08-25",
  "inheritance-tax-calculator": "2026-10-13",
  "iron-condor-calculator": "2026-08-25",
  "kelly-calculator": "2026-10-13",
  "lending-calculator": "2026-10-13",
  "leverage-calculator": "2026-10-13",
  "lightning-network-fee-calculator": "2026-10-13",
  "liquid-staking-calculator": "2026-10-13",
  "liquidation-calculator": "2026-10-13",
  "loan-calculator": "2026-10-13",
  "looping-yield-calculator": "2026-10-13",
  "lp-value-calculator": "2026-10-13",
  "margin-calculator": "2026-10-13",
  "market-cap-calculator": "2026-10-13",
  "market-cap-comparator": "2026-08-25",
  "mayer-multiple-calculator": "2026-08-25",
  "methodology": "2026-10-13",
  "mev-calculator": "2026-10-13",
  "millionaire-calculator": "2026-10-13",
  "mining-calculator": "2026-10-14",
  "mining-coin-switcher-calculator": "2026-10-13",
  "mining-roi-calculator": "2026-10-13",
  "mstr-mnav-calculator": "2026-10-13",
  "nft-profit-calculator": "2026-10-14",
  "nft-rarity-calculator": "2026-10-13",
  "node-calculator": "2026-10-14",
  "on-chain-metrics-calculator": "2026-10-13",
  "options-calculator": "2026-10-13",
  "payback-period-calculator": "2026-10-13",
  "perpetual-funding-arbitrage-calculator": "2026-10-13",
  "perpetual-futures-calculator": "2026-10-13",
  "pip-calculator": "2026-10-13",
  "pizza-day-calculator": "2026-10-14",
  "polymarket-odds-calculator": "2026-10-14",
  "portfolio-calculator": "2026-10-13",
  "position-size-calculator": "2026-10-13",
  "privacy": "2026-05-17",
  "profit-calculator": "2026-10-13",
  "profit-factor-calculator": "2026-10-13",
  "pumpfun-bonding-curve-calculator": "2026-10-13",
  "rainbow-chart-calculator": "2026-10-13",
  "rebalancing-calculator": "2026-10-13",
  "restaking-calculator": "2026-10-14",
  "retirement-calculator": "2026-10-14",
  "reverse-roi": "2026-10-13",
  "risk-of-ruin-calculator": "2026-10-13",
  "risk-reward-calculator": "2026-08-25",
  "roi-calculator": "2026-10-13",
  "rwa-yield-calculator": "2026-10-14",
  "salary-calculator": "2026-10-14",
  "satoshi-converter": "2026-10-13",
  "sharpe-calculator": "2026-10-13",
  "slippage-calculator": "2026-10-13",
  "sortino-calculator": "2026-10-13",
  "staking-calculator": "2026-10-13",
  "staking-rewards-calculator": "2026-10-13",
  "stock-to-flow-calculator": "2026-10-13",
  "tax-calculator": "2026-10-13",
  "tax-loss-harvesting-calculator": "2026-10-13",
  "terms": "2026-05-17",
  "timestamp-converter": "2026-08-25",
  "token-burn-calculator": "2026-10-13",
  "token-unlock-calculator": "2026-10-13",
  "token-valuation-calculator": "2026-10-13",
  "tp-sl-calculator": "2026-10-13",
  "trade-expectancy-calculator": "2026-10-13",
  "trailing-stop-loss-calculator": "2026-10-13",
  "treynor-calculator": "2026-10-13",
  "uniswap-calculator": "2026-10-13",
  "unit-converter": "2026-10-13",
  "updates": "2026-10-14",
  "validator-calculator": "2026-10-13",
  "var-calculator": "2026-10-13",
  "vesting-calculator": "2026-10-13",
  "wallet-net-worth-calculator": "2026-10-13",
  "whale-alert-calculator": "2026-10-13",
  "what-if": "2026-10-13",
  "yield-farming-calculator": "2026-10-13",
};
