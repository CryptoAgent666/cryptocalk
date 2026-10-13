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
// 2026-10-13 (copy fix): asic-mining-calculator's explanation rewritten in all 6 languages. It claimed a
// pre/post-halving projection and difficulty / block-reward inputs the calculator does not have (those come
// from the live feed), the EN subtitle promised an "ASIC value" output and EN validation a daily coin amount.
// Rendered text changed; the date was already 2026-10-13; updates is too.
export const CALCULATOR_UPDATED: Record<string, string> = {
  "404": "2026-05-11",
  "about": "2026-08-25",
  "ai-token-sector-calculator": "2026-08-25",
  "airdrop-calculator": "2026-10-13",
  "apy-apr-calculator": "2026-08-25",
  "arbitrage-calculator": "2026-08-25",
  "asic-mining-calculator": "2026-10-13",
  "bitcoin-energy-calculator": "2026-08-25",
  "bitcoin-unit-converter": "2026-08-25",
  "break-even-calculator": "2026-08-25",
  "bridge-comparator": "2026-08-25",
  "calmar-calculator": "2026-08-25",
  "compare": "2026-05-22",
  "compound-calculator": "2026-08-25",
  "compound-interest-calculator": "2026-08-25",
  "concentrated-liquidity-calculator": "2026-08-25",
  "contact": "2026-05-11",
  "converter": "2026-08-25",
  "covered-call-calculator": "2026-08-25",
  "cross-chain-bridge-calculator": "2026-08-25",
  "crypto-card-cashback-calculator": "2026-08-25",
  "crypto-correlation-calculator": "2026-08-25",
  "crypto-index-fund-calculator": "2026-08-25",
  "crypto-inheritance-calculator": "2026-10-13",
  "crypto-loan-calculator": "2026-08-25",
  "crypto-portfolio-rebalance-calculator": "2026-08-25",
  "crypto-sentiment-calculator": "2026-08-25",
  "dca-calculator": "2026-08-25",
  "defi-insurance-calculator": "2026-08-25",
  "defi-yield-aggregator": "2026-08-25",
  "depin-earnings-calculator": "2026-08-25",
  "difficulty-calculator": "2026-08-25",
  "drawdown-calculator": "2026-08-25",
  "dust-attack-calculator": "2026-08-25",
  "dva-calculator": "2026-08-25",
  "editorial-policy": "2026-08-25",
  "electricity-cost-calculator": "2026-10-13",
  "etf-fee-calculator": "2026-10-13",
  "exchange-fee-comparator": "2026-08-25",
  "exchange-fees": "2026-08-25",
  "flash-loan-calculator": "2026-08-25",
  "funding-rate-calculator": "2026-08-25",
  "futures-basis-calculator": "2026-08-25",
  "gamefi-calculator": "2026-08-25",
  "gas-calculator": "2026-08-25",
  "gas-fee-calculator": "2026-08-25",
  "gas-optimization-calculator": "2026-08-25",
  "geometric-mean-return-calculator": "2026-08-25",
  "governance-voting-calculator": "2026-08-25",
  "gpu-mining-calculator": "2026-10-13",
  "grid-trading-calculator": "2026-08-25",
  "gwei-converter": "2026-08-25",
  "halving-calculator": "2026-10-13",
  "hashrate-converter": "2026-10-13",
  "hodl-vs-trade": "2026-08-25",
  "ico-roi-calculator": "2026-08-25",
  "if-i-had-bought": "2026-08-25",
  "impermanent-loss-calculator": "2026-08-25",
  "index": "2026-08-25",
  "inflation-hedge": "2026-08-25",
  "information-ratio-calculator": "2026-08-25",
  "inheritance-tax-calculator": "2026-10-13",
  "iron-condor-calculator": "2026-08-25",
  "kelly-calculator": "2026-08-25",
  "lending-calculator": "2026-08-25",
  "leverage-calculator": "2026-08-25",
  "lightning-network-fee-calculator": "2026-10-13",
  "liquid-staking-calculator": "2026-08-25",
  "liquidation-calculator": "2026-08-25",
  "loan-calculator": "2026-08-25",
  "looping-yield-calculator": "2026-08-25",
  "lp-value-calculator": "2026-08-25",
  "margin-calculator": "2026-08-25",
  "market-cap-calculator": "2026-08-25",
  "market-cap-comparator": "2026-08-25",
  "mayer-multiple-calculator": "2026-08-25",
  "methodology": "2026-10-13",
  "mev-calculator": "2026-08-25",
  "millionaire-calculator": "2026-08-25",
  "mining-calculator": "2026-08-25",
  "mining-coin-switcher-calculator": "2026-10-06",
  "mining-roi-calculator": "2026-08-25",
  "mstr-mnav-calculator": "2026-10-13",
  "nft-profit-calculator": "2026-08-25",
  "nft-rarity-calculator": "2026-08-25",
  "node-calculator": "2026-08-25",
  "on-chain-metrics-calculator": "2026-08-25",
  "options-calculator": "2026-08-25",
  "payback-period-calculator": "2026-08-25",
  "perpetual-funding-arbitrage-calculator": "2026-08-25",
  "perpetual-futures-calculator": "2026-08-25",
  "pip-calculator": "2026-08-25",
  "pizza-day-calculator": "2026-08-25",
  "polymarket-odds-calculator": "2026-08-25",
  "portfolio-calculator": "2026-08-25",
  "position-size-calculator": "2026-08-25",
  "privacy": "2026-05-17",
  "profit-calculator": "2026-08-25",
  "profit-factor-calculator": "2026-08-25",
  "pumpfun-bonding-curve-calculator": "2026-08-25",
  "rainbow-chart-calculator": "2026-08-25",
  "rebalancing-calculator": "2026-08-25",
  "restaking-calculator": "2026-08-25",
  "retirement-calculator": "2026-10-13",
  "reverse-roi": "2026-08-25",
  "risk-of-ruin-calculator": "2026-08-25",
  "risk-reward-calculator": "2026-08-25",
  "roi-calculator": "2026-08-25",
  "rwa-yield-calculator": "2026-08-25",
  "salary-calculator": "2026-08-25",
  "satoshi-converter": "2026-08-25",
  "sharpe-calculator": "2026-08-25",
  "slippage-calculator": "2026-08-25",
  "sortino-calculator": "2026-08-25",
  "staking-calculator": "2026-10-13",
  "staking-rewards-calculator": "2026-08-25",
  "stock-to-flow-calculator": "2026-08-25",
  "tax-calculator": "2026-10-13",
  "tax-loss-harvesting-calculator": "2026-10-13",
  "terms": "2026-05-17",
  "timestamp-converter": "2026-08-25",
  "token-burn-calculator": "2026-08-25",
  "token-unlock-calculator": "2026-08-25",
  "token-valuation-calculator": "2026-08-25",
  "tp-sl-calculator": "2026-08-25",
  "trade-expectancy-calculator": "2026-08-25",
  "trailing-stop-loss-calculator": "2026-08-25",
  "treynor-calculator": "2026-08-25",
  "uniswap-calculator": "2026-08-25",
  "unit-converter": "2026-08-25",
  "updates": "2026-10-13",
  "validator-calculator": "2026-10-13",
  "var-calculator": "2026-08-25",
  "vesting-calculator": "2026-08-25",
  "wallet-net-worth-calculator": "2026-08-25",
  "whale-alert-calculator": "2026-08-25",
  "what-if": "2026-08-25",
  "yield-farming-calculator": "2026-08-25",
};
