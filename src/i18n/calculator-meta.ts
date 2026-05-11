import type { Lang, SpecCalculatorSlug } from './utils';

export const CALCULATOR_META: Record<Lang, Record<SpecCalculatorSlug, { title: string; description: string }>> = {
  'en': {
    'converter': {
      title: 'Crypto Converter',
      description: 'Free Crypto Converter. Convert Bitcoin, Ethereum, and 500+ cryptocurrencies to USD, EUR, and 10+ fiat currencies with real-time CoinGecko prices.'
    },
    'profit-calculator': {
      title: 'Crypto Profit Calculator',
      description: 'Free Crypto Profit Calculator. Enter buy and sell prices to see ROI, total fees, and net profit for 500+ cryptocurrencies. No signup required.'
    },
    'mining-calculator': {
      title: 'Bitcoin Mining Calculator',
      description: 'Free Bitcoin Mining Calculator. Enter hashrate, power consumption, and electricity cost to estimate daily, monthly, and yearly BTC mining revenue.'
    },
    'dca-calculator': {
      title: 'DCA Calculator',
      description: 'Free DCA Calculator for Bitcoin, Ethereum, and 500+ cryptos. Simulate dollar-cost averaging with historical data and compare DCA vs lump sum.'
    },
    'tax-calculator': {
      title: 'Crypto Tax Calculator 2026 — US, UK, EU Capital Gains',
      description: 'Free 2026 crypto tax calculator for 17 countries. Estimate capital gains tax on Bitcoin, Ethereum, and altcoin trades. Compare short-term vs long-term rates for US, UK, Germany, Japan, and more.'
    },
    'what-if': {
      title: 'What If Calculator',
      description: 'Free What If Calculator. Backtest hypothetical crypto entries, evaluate opportunity cost, and compare alternative investment outcomes instantly.'
    },
    'position-size-calculator': {
      title: 'Position Size Calculator',
      description: 'Free Position Size Calculator for crypto traders. Determine optimal trade size based on balance, risk tolerance, and stop-loss. Up to 125x leverage.'
    },
    'liquidation-calculator': {
      title: 'Liquidation Calculator',
      description: 'Free Liquidation Price Calculator for crypto futures. Supports Binance, Bybit, OKX in Isolated and Cross margin. Know your liquidation price.'
    },
    'funding-rate-calculator': {
      title: 'Funding Rate Calculator — Perpetual Futures Cost',
      description: 'Free funding rate calculator for crypto perpetual futures (Binance, Bybit, OKX). Calculate the overnight, daily, weekly, monthly, and annual cost of holding a leveraged BTC, ETH, or altcoin position.'
    },
    'tp-sl-calculator': {
      title: 'TP / SL Calculator',
      description: 'Free TP/SL Calculator for crypto traders. Set optimal take-profit and stop-loss levels with R:R ratio, partial TPs, and visual price scale.'
    },
    'margin-calculator': {
      title: 'Margin Calculator',
      description: 'Free Margin Calculator for crypto futures. Calculate required collateral, available balance, and margin call price for Binance, Bybit, and OKX positions.'
    },
    'pip-calculator': {
      title: 'Pip / Tick Value Calculator',
      description: 'Free Pip and Tick Value Calculator for crypto traders. Calculate the dollar value of price movements for any position size across BTC, ETH, SOL, and 500+ coins.'
    },
    'break-even-calculator': {
      title: 'Break-Even Calculator',
      description: 'Free Break-Even Calculator. See how much gain you need to recover from a loss, or calculate the exit price that covers your trading fees.'
    },
    'risk-reward-calculator': {
      title: 'Risk / Reward Calculator',
      description: 'Free Risk-Reward Ratio Calculator for crypto traders. Calculate R:R ratio, required win rate, and simulate 100-trade outcomes for any setup.'
    },
    'staking-calculator': {
      title: 'Crypto Staking Calculator',
      description: 'Free Crypto Staking Calculator. Calculate daily, weekly, and annual staking rewards after validator commission and token-price assumptions.'
    },
    'impermanent-loss-calculator': {
      title: 'Impermanent Loss Calculator',
      description: 'Free Impermanent Loss Calculator for DeFi. Calculate IL for AMM liquidity pools, compare LP returns vs HODLing, and see if fee earnings overcome IL.'
    },
    'apy-apr-calculator': {
      title: 'APR to APY Calculator — Convert with Compounding',
      description: 'Free APR to APY converter and reverse APY to APR calculator. Compare daily, monthly, quarterly, and continuous compounding to find real DeFi yields and staking rewards.'
    },
    'yield-farming-calculator': {
      title: 'Yield Farming Calculator — Farm Profit & True APY',
      description: 'Free DeFi yield farming and farm profit calculator. Compute net APY after gas costs, impermanent loss, and harvest frequency for Uniswap, Curve, Aave, and Yearn pools.'
    },
    'gas-calculator': {
      title: 'Gas Fee Calculator — ETH, BSC, Polygon, Arbitrum',
      description: 'Free gas fee calculator for Ethereum, BSC, Polygon, Arbitrum, Base, and Optimism. Estimate swap, transfer, NFT mint, and DeFi costs in Gwei and USD before confirming.'
    },
    'uniswap-calculator': {
      title: 'Uniswap V3 Fee Calculator — LP Returns & IL',
      description: 'Free Uniswap V3 fee calculator. Estimate LP fee income, impermanent loss, break-even time, and net returns for concentrated liquidity ranges on any V3 pool pair.'
    },
    'bridge-comparator': {
      title: 'Bridge Cost Comparator',
      description: 'Free Bridge Cost Comparator. Compare crypto bridge routes by estimated total fee, speed, and security score across major L2 and multichain bridges.'
    },
    'lending-calculator': {
      title: 'Crypto Lending Calculator',
      description: 'Free Crypto Lending Calculator. Calculate projected lending returns using APY, compounding model, term length, and platform performance fees.'
    },
    'gpu-mining-calculator': {
      title: 'GPU Mining Calculator',
      description: 'Free GPU Mining Calculator. Estimate GPU mining profitability with live assumptions for hashrate, power draw, electricity rates, and pool fees.'
    },
    'asic-mining-calculator': {
      title: 'ASIC Miner Calculator — Profitability & Value',
      description: 'Free ASIC miner profitability calculator for Antminer S21, Whatsminer M66, and all top models. Calculate daily profit, electricity cost, ROI, ASIC value, and break-even time.'
    },
    'mining-roi-calculator': {
      title: 'Mining ROI Calculator',
      description: 'Free Mining ROI Calculator. Model mining hardware return on investment with scenario analysis for revenue, costs, and break-even timing.'
    },
    'electricity-cost-calculator': {
      title: 'Mining Electricity Cost Calculator',
      description: 'Free Mining Electricity Cost Calculator. Calculate power consumption and operating cost by device count, power usage, uptime, and local energy price.'
    },
    'difficulty-calculator': {
      title: 'Bitcoin Difficulty Estimator — Next Adjustment',
      description: 'Free Bitcoin mining difficulty estimator. Predict the next difficulty adjustment from current block intervals and see how it impacts mining revenue and breakeven hashrate.'
    },
    'hashrate-converter': {
      title: 'Hashrate Converter',
      description: 'Free Hashrate Converter. Convert mining hashrate units from H/s up to EH/s and compare typical ranges for ASIC and GPU hardware.'
    },
    'market-cap-calculator': {
      title: 'Crypto Market Cap Calculator — Price from Supply',
      description: 'Free crypto market cap calculator. Find token price from market cap and circulating supply, or calculate market cap from current price. Live data for BTC, ETH, SOL, and any altcoin.'
    },
    'market-cap-comparator': {
      title: 'Market Cap Comparator',
      description: 'Free Market Cap Comparator. Compare any cryptocurrency against top coins. Calculate hypothetical prices and growth multipliers across market cap scenarios.'
    },
    'roi-calculator': {
      title: 'ROI Calculator',
      description: 'Free Crypto ROI Calculator with annualized returns. Calculate total and annualized ROI and compare performance with S&P 500, Gold, and Real Estate.'
    },
    'reverse-roi': {
      title: 'Reverse ROI Calculator',
      description: 'Free Reverse ROI Calculator. Enter your investment and target profit to find the exact token price needed. See growth multiplier and milestone table.'
    },
    'hodl-vs-trade': {
      title: 'HODL vs Trade Calculator — Buy-and-Hold vs Active',
      description: 'Free HODL vs trading simulator for Bitcoin and crypto. Compare buy-and-hold with active trading strategies. Simulate scenarios with custom win rates, profit targets, fees, and tax impact.'
    },
    'rebalancing-calculator': {
      title: 'Crypto Portfolio Rebalancing Calculator — Lazy & Target',
      description: 'Free crypto portfolio rebalancing tool. Calculate exact buy/sell amounts to hit target allocations or use buy-only mode for lazy rebalancing. Works with BTC, ETH, and any altcoin.'
    },
    'compound-calculator': {
      title: 'Compound Interest Calculator (Crypto)',
      description: 'Free Compound Interest Calculator for crypto. Project compound growth for staking, yield farming, and savings with recurring contributions.'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI Calculator',
      description: 'Free ICO / IDO ROI Calculator. Calculate current and ATH ROI for ICO or IDO allocations using token amount, entry price, and market prices.'
    },
    'airdrop-calculator': {
      title: 'Airdrop Value Calculator',
      description: 'Free Airdrop Value Calculator. Calculate the value of received crypto airdrops, estimate tax liability, and track profit or loss after fees.'
    },
    'satoshi-converter': {
      title: 'Satoshi to USD Converter — Live BTC Sats Calculator',
      description: 'Free Satoshi to USD/EUR/BTC converter with live Bitcoin price. Convert 100, 1000, 50000, 100000 sats instantly. See sats per dollar and quick reference tables.'
    },
    'gwei-converter': {
      title: 'Gwei Converter',
      description: 'Free Gwei Converter. Convert Wei, Gwei, and Ether units instantly with live ETH price and practical gas cost examples for Ethereum transactions.'
    },
    'timestamp-converter': {
      title: 'Unix Timestamp Converter',
      description: 'Free Unix Timestamp Converter. Convert Unix timestamp to date/time and date/time to Unix format with UTC/local display and block-time estimates.'
    },
    'unit-converter': {
      title: 'Crypto Unit Converter',
      description: 'Free Crypto Unit Converter. Convert denomination units for BTC, ETH, SOL, and USDT including satoshi, gwei, lamport, and micro units.'
    },
    'exchange-fees': {
      title: 'Exchange Trading Fee Calculator',
      description: 'Free Exchange Trading Fee Calculator. Calculate total trading fees for any order size with maker/taker rates across Binance, Bybit, OKX, and more.'
    },
    'crypto-loan-calculator': {
      title: 'Crypto Loan Calculator',
      description: 'Free Crypto Loan Calculator. Estimate crypto-backed loan amount, interest costs, margin call threshold, and liquidation risk for DeFi and CeFi loans.'
    },
    'vesting-calculator': {
      title: 'Token Vesting Calculator',
      description: 'Free Token Vesting Calculator. Visualize unlock schedules with cliff periods, TGE unlocks, and monthly or quarterly vesting to plan your exit strategy.'
    },
    'nft-profit-calculator': {
      title: 'NFT Profit Calculator',
      description: 'Free NFT Profit Calculator. Calculate true NFT trading profit after marketplace fees, creator royalties, and gas costs across OpenSea, Blur, and more.'
    },
    'halving-calculator': {
      title: 'Bitcoin Halving Calculator',
      description: 'Free Bitcoin Halving Calculator with live countdown timer. See how the next BTC halving affects mining revenue with historical halving data and price analysis.'
    },
    'mev-calculator': {
      title: 'MEV Protection Calculator',
      description: 'Free MEV Protection Calculator. Estimate sandwich and frontrun risk and potential savings from MEV protection routes based on swap size and slippage.'
    },
    'gamefi-calculator': {
      title: 'GameFi ROI Calculator — Play-to-Earn Profitability',
      description: 'Free GameFi and play-to-earn (P2E) ROI calculator. Estimate payback period and annual return for crypto game strategies based on setup cost, token rewards, energy drops, and running expenses.'
    },
    'node-calculator': {
      title: 'Validator Node Calculator',
      description: 'Free Validator Node Calculator. Model validator node economics using staked amount, APR, commission, uptime, and infrastructure costs.'
    },
    'salary-calculator': {
      title: 'Crypto Salary Calculator',
      description: 'Free Crypto Salary Calculator. Convert your fiat salary to BTC, ETH, or USDT. Calculate crypto accumulation over time with pay frequency and fee estimates.'
    },
    'inflation-hedge': {
      title: 'Inflation Hedge Calculator',
      description: 'Free Inflation Hedge Calculator. Compare crypto, stablecoins, gold, and S&P 500 against inflation in Turkey, Argentina, Nigeria, USA, and more.'
    },
    'calmar-calculator': {
      title: 'Calmar Ratio Calculator',
      description: 'Calculate Calmar ratio from annual return and maximum drawdown to compare return efficiency per drawdown risk.'
    },
    'compound-interest-calculator': {
      title: 'Compound Interest Calculator',
      description: 'Free compound interest calculator for crypto staking and yield farming. See how daily, weekly, or monthly compounding grows your investment over time.'
    },
    'drawdown-calculator': {
      title: 'Drawdown Recovery Calculator',
      description: 'Measure portfolio drawdown, required recovery gain, and estimated recovery time based on expected monthly return.'
    },
    'gas-fee-calculator': {
      title: 'Gas Fee Calculator',
      description: 'Free gas fee calculator for Ethereum, Polygon, Arbitrum, Optimism, BNB Chain and more. Estimate transaction costs for swaps, transfers, and minting.'
    },
    'information-ratio-calculator': {
      title: 'Information Ratio Calculator',
      description: 'Compare active portfolio performance versus a benchmark using active return and tracking error. Identify whether your strategy justifies its fees.'
    },
    'kelly-calculator': {
      title: 'Kelly Criterion Calculator',
      description: 'Free Kelly Criterion calculator for crypto trading. Find optimal position sizing from win rate and payoff ratio with Kelly, half- and quarter-Kelly.'
    },
    'leverage-calculator': {
      title: 'Crypto Leverage Calculator — Position Size & Liquidation',
      description: 'Free crypto leverage trading calculator. See how 5x, 10x, 25x, 50x leverage amplifies gains and losses, find your liquidation distance, and compare PnL side-by-side.'
    },
    'loan-calculator': {
      title: 'Crypto Loan Repayment Calculator',
      description: 'Free crypto loan repayment calculator. Build amortization schedules, estimate monthly payments, and track principal vs. interest over the loan term.'
    },
    'portfolio-calculator': {
      title: 'Portfolio Allocation Calculator',
      description: 'Free portfolio allocation calculator. Visualize asset weights, set target allocations, and get rebalancing suggestions for your crypto portfolio.'
    },
    'risk-of-ruin-calculator': {
      title: 'Risk of Ruin Calculator',
      description: 'Estimate probability of account ruin from win rate, reward/risk profile, and fixed risk per trade. Essential for position sizing and bankroll management.'
    },
    'sharpe-calculator': {
      title: 'Sharpe Ratio Calculator',
      description: 'Evaluate risk-adjusted portfolio performance using expected return, volatility, and risk-free rate. Compare your Sharpe ratio to market benchmarks.'
    },
    'slippage-calculator': {
      title: 'DEX Slippage Calculator',
      description: 'Estimate swap slippage, minimum received amount, and total execution cost for DEX trades. Optimize your Uniswap and SushiSwap transactions.'
    },
    'sortino-calculator': {
      title: 'Sortino Ratio Calculator',
      description: 'Measure risk-adjusted portfolio performance with downside-volatility focus using the Sortino ratio. Better than Sharpe for asymmetric crypto returns.'
    },
    'staking-rewards-calculator': {
      title: 'Staking Rewards Calculator',
      description: 'Free staking rewards calculator. Estimate daily, weekly, and monthly earnings for ETH, SOL, DOT, ATOM and other PoS coins with commissions.'
    },
    'trade-expectancy-calculator': {
      title: 'Trade Expectancy Calculator',
      description: 'Free trade expectancy calculator. Estimate strategy edge per trade and project monthly outcomes using win rate, R-multiples, and risk per trade.'
    },
    'treynor-calculator': {
      title: 'Treynor Ratio Calculator',
      description: 'Measure return per unit of market risk (beta) and benchmark strategy efficiency against the risk-free rate.'
    },
    'var-calculator': {
      title: 'Value at Risk (VaR) Calculator',
      description: 'Estimate portfolio downside risk with parametric VaR and expected shortfall (CVaR) across confidence levels.'
    },
    'bitcoin-unit-converter': {
      title: 'Bitcoin Unit Converter',
      description: 'Free Bitcoin Unit Converter. Convert between BTC, mBTC, bits, and satoshis instantly. Includes live USD value and a quick-reference denomination table.'
    },
    'cross-chain-bridge-calculator': {
      title: 'Cross-Chain Bridge Calculator',
      description: 'Free Cross-Chain Bridge Calculator. Estimate bridge fees, transfer time, and slippage for moving tokens between Ethereum, Arbitrum, Solana, and 20+ chains.'
    },
    'crypto-correlation-calculator': {
      title: 'Crypto Correlation Calculator',
      description: 'Free Crypto Correlation Calculator. Measure price correlation between any two cryptocurrencies and build a diversified portfolio with lower overall risk.'
    },
    'crypto-index-fund-calculator': {
      title: 'Crypto Index Fund Calculator',
      description: 'Free Crypto Index Fund Calculator. Build a custom crypto index by market cap or equal weight, track allocations, and compare performance vs BTC.'
    },
    'crypto-inheritance-calculator': {
      title: 'Crypto Inheritance Calculator',
      description: 'Free Crypto Inheritance Calculator. Plan digital asset succession with multi-sig setup costs, estate tax estimates, and heir distribution modeling.'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'Crypto Portfolio Rebalance Calculator',
      description: 'Free Crypto Portfolio Rebalance Calculator. Enter current holdings and target weights to see exact buy/sell amounts needed to rebalance your portfolio.'
    },
    'crypto-sentiment-calculator': {
      title: 'Crypto Sentiment Calculator',
      description: 'Free Crypto Sentiment Calculator. Aggregate Fear & Greed index, social volume, and funding rates into a single composite sentiment score for any coin.'
    },
    'defi-yield-aggregator': {
      title: 'DeFi Yield Aggregator',
      description: 'Free DeFi Yield Aggregator. Compare real-time APY across Aave, Compound, Lido, and 50+ protocols. Filter by chain, asset, and TVL to find the best yield.'
    },
    'dust-attack-calculator': {
      title: 'Dust Attack Calculator',
      description: 'Free Dust Attack Calculator. Detect tiny unsolicited transactions in your wallet, estimate consolidation costs, and learn how to protect your privacy on-chain.'
    },
    'exchange-fee-comparator': {
      title: 'Exchange Fee Comparator',
      description: 'Free Exchange Fee Comparator. Side-by-side fee comparison for Binance, Coinbase, Kraken, OKX, and Bybit across spot, futures, and withdrawal fees.'
    },
    'flash-loan-calculator': {
      title: 'Flash Loan Calculator',
      description: 'Free Flash Loan Calculator. Estimate flash loan profitability including protocol fees, gas costs, and arbitrage spread for Aave, dYdX, and Uniswap.'
    },
    'gas-optimization-calculator': {
      title: 'Gas Optimization Calculator',
      description: 'Free Gas Optimization Calculator. Find the cheapest time to transact on Ethereum and L2s. Compare gas costs by hour, batch transactions, and save on fees.'
    },
    'governance-voting-calculator': {
      title: 'Governance Voting Calculator',
      description: 'Free Governance Voting Calculator. Estimate voting power, quorum requirements, and delegation impact for DAO proposals across major governance tokens.'
    },
    'nft-rarity-calculator': {
      title: 'NFT Rarity Calculator',
      description: 'Free NFT Rarity Calculator. Score trait rarity for any NFT collection using statistical rarity, average trait, and information-content methods.'
    },
    'token-unlock-calculator': {
      title: 'Token Unlock Calculator',
      description: 'Free Token Unlock Calculator. Track upcoming token unlock events, estimate sell pressure impact, and visualize vesting schedules for any project.'
    },
    'whale-alert-calculator': {
      title: 'Whale Alert Calculator',
      description: 'Free Whale Alert Calculator. Estimate market impact of large transfers, calculate slippage from whale-sized orders, and set custom alert thresholds.'
    },
    'arbitrage-calculator': {
      title: 'Crypto Arbitrage Calculator',
      description: 'Free Crypto Arbitrage Calculator. Calculate arbitrage profit between exchanges after trading fees and withdrawal costs.'
    },
    'stock-to-flow-calculator': {
      title: 'Bitcoin Stock-to-Flow Calculator',
      description: 'Free Bitcoin Stock-to-Flow Calculator. Evaluate Bitcoin scarcity with the S2F model and compare the real price with the model prediction.'
    },
    'options-calculator': {
      title: 'Crypto Options Calculator',
      description: 'Free Crypto Options Calculator. Calculate options P&L, break-even price, and payoff table for crypto calls and puts.'
    },
    'tax-loss-harvesting-calculator': {
      title: 'Tax Loss Harvesting Calculator',
      description: 'Free Tax Loss Harvesting Calculator. Identify harvestable crypto losses to offset capital gains and estimate tax savings.'
    },
    'restaking-calculator': {
      title: 'Restaking Calculator',
      description: 'Free Restaking Calculator. Estimate combined yield from native staking plus restaking protocols like EigenLayer.'
    },
    'liquid-staking-calculator': {
      title: 'Liquid Staking Calculator',
      description: 'Free Liquid Staking Calculator. Compare liquid staking protocols — Lido, Rocket Pool, Coinbase, Frax — by yield and fees.'
    },
    'perpetual-futures-calculator': {
      title: 'Perpetual Futures Calculator',
      description: 'Free Perpetual Futures Calculator. Calculate perp futures P&L with leverage, funding rate costs, and liquidation price.'
    },
    'payback-period-calculator': {
      title: 'Payback Period Calculator',
      description: 'Free Payback Period Calculator. Calculate how long it will take for your crypto investment to pay for itself based on expected returns.'
    },
    'dva-calculator': {
      title: 'DVA Calculator',
      description: 'Free DVA Calculator. Compare Dollar Value Averaging vs DCA — DVA adjusts investment amounts based on portfolio performance.'
    },
    'bitcoin-energy-calculator': {
      title: 'Bitcoin Energy Calculator',
      description: 'Free Bitcoin Energy Calculator. Estimate energy consumption, carbon footprint, and environmental cost of Bitcoin mining.'
    },
    'on-chain-metrics-calculator': {
      title: 'On-Chain Metrics Calculator',
      description: 'Free On-Chain Metrics Calculator. Analyze Bitcoin valuation with MVRV, NVT, and SOPR — on-chain signals of overbought or undervalued zones.'
    },
    'grid-trading-calculator': {
      title: 'Grid Trading Calculator',
      description: 'Free Grid Trading Calculator. Plan your grid trading bot strategy — calculate profit per grid and estimated annual return.'
    },
    'inheritance-tax-calculator': {
      title: 'Crypto Inheritance Tax Calculator',
      description: 'Free Crypto Inheritance Tax Calculator. Estimate inheritance tax on crypto assets in 8 countries with relationship-type exemptions.'
    },
    'validator-calculator': {
      title: 'Validator Economics Calculator',
      description: 'Free Validator Economics Calculator. Calculate PoS validator profitability — rewards, operating costs, ROI for Ethereum, Solana, and more.'
    },
    'token-valuation-calculator': {
      title: 'Token Valuation Calculator',
      description: 'Free Token Valuation Calculator. Analyze token FDV, market cap, dilution risk, and compare with established projects.'
    },
    'if-i-had-bought': {
      title: 'If I Had Bought Calculator',
      description: 'Free If I Had Bought Calculator. See how much your investment would be worth today if you had bought BTC, ETH, or other crypto at historical prices.'
    },
    'millionaire-calculator': {
      title: 'Crypto Millionaire Calculator',
      description: 'Free Crypto Millionaire Calculator. Plan your path to $1M — calculate how much and how long you need to invest to reach your goal.'
    },
    'pizza-day-calculator': {
      title: 'Bitcoin Pizza Day Calculator',
      description: 'Free Bitcoin Pizza Day Calculator. Calculate the current value of the famous 10,000 BTC pizza purchase and explore the opportunity cost.'
    },
    'retirement-calculator': {
      title: 'Crypto Retirement / FIRE Calculator',
      description: 'Free Crypto Retirement Calculator. Calculate how much crypto you need to retire early — FIRE number, portfolio growth, and years to financial independence.'
    },
    'rainbow-chart-calculator': {
      title: 'Bitcoin Rainbow Chart Calculator',
      description: 'Free Bitcoin Rainbow Chart Calculator. See where BTC sits on the logarithmic regression model with 9 price bands from Fire Sale to Maximum Bubble.'
    },
    'etf-fee-calculator': {
      title: 'Bitcoin ETF Fee Calculator',
      description: 'Free Bitcoin ETF Fee Calculator. Compare expense ratios of IBIT, FBTC, GBTC, ARKB, BITB and direct BTC over 1–30 years.'
    },
    'token-burn-calculator': {
      title: 'Token Burn Rate Calculator',
      description: 'Free Token Burn Calculator. Analyze deflationary token economics — burn rate, supply reduction timeline, and market cap impact over 1–5 years.'
    },
    'futures-basis-calculator': {
      title: 'Futures Basis Calculator',
      description: 'Free Futures Basis Calculator. Calculate spot-vs-futures spread, annualized basis, cash-and-carry yield, and arbitrage profit after fees.'
    },
    'defi-insurance-calculator': {
      title: 'DeFi Insurance Calculator',
      description: 'Free DeFi Insurance Calculator. Estimate whether DeFi insurance is worth the premium — break-even hack size, insured vs uninsured scenarios, yield impact.'
    },
    'mayer-multiple-calculator': {
      title: 'Mayer Multiple Calculator',
      description: 'Free Mayer Multiple Calculator. Compute BTC current price ÷ 200-day moving average. Above 2.4 = historical sell zone; below 1.0 = undervalued buy zone.'
    },
    'geometric-mean-return-calculator': {
      title: 'Geometric Mean Return Calculator',
      description: 'Free Geometric Mean Return Calculator. Compute true compound return vs arithmetic mean. Reveals volatility drag for crypto and other volatile assets.'
    },
    'mstr-mnav-calculator': {
      title: 'MicroStrategy mNAV Premium Calculator',
      description: 'Free MicroStrategy mNAV calculator. Compute Bitcoin treasury company premium — MSTR, MetaPlanet, Semler — vs pure BTC NAV. Detect overvaluation.'
    },
    'lightning-network-fee-calculator': {
      title: 'Lightning Network Fee Calculator',
      description: 'Free Lightning Network fee calculator. Compute routing fees with base + ppm rate per hop. Compare to on-chain Bitcoin fees and find break-even payment size.'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Pump.fun Bonding Curve Calculator',
      description: 'Free Pump.fun bonding curve calculator. Calculate tokens received per SOL invested, slippage, and distance to $69K graduation to Raydium DEX.'
    },
    'profit-factor-calculator': {
      title: 'Profit Factor Calculator',
      description: 'Free Profit Factor calculator for trading systems. Compute gross profit / gross loss ratio. Above 1.5 = solid edge; above 2.0 = excellent system.'
    },
    'covered-call-calculator': {
      title: 'Covered Call Calculator',
      description: 'Free Covered Call options calculator. Calculate premium yield, annualized return, breakeven, and assignment risk for selling calls on BTC, ETH holdings.'
    },
    'iron-condor-calculator': {
      title: 'Iron Condor Calculator',
      description: 'Free Iron Condor multi-leg options calculator. Compute net premium, max profit, max loss, breakevens and full payoff diagram for 4-leg strategy.'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'Perpetual Funding Arbitrage Calculator',
      description: 'Free perpetual funding rate arbitrage calculator. Long spot + short perp = delta-neutral funding harvest. Compute APR, fees, breakeven funding rate.'
    },
    'concentrated-liquidity-calculator': {
      title: 'Concentrated Liquidity (Uniswap V3) Calculator',
      description: 'Free Uniswap V3 concentrated liquidity calculator. Compute capital efficiency, fee income, IL at range edges. Compare tight vs wide range strategies.'
    },
    'looping-yield-calculator': {
      title: 'Looping / Recursive Lending Calculator',
      description: 'Free DeFi looping calculator. Recursive borrow → re-deposit for amplified yield. Compute effective leverage, net APR, and liquidation distance.'
    },
  },
  'es': {
    'converter': {
      title: 'Conversor de Criptomonedas',
      description: 'Conversor de Criptomonedas gratuito. Convierte Bitcoin, Ethereum y 500+ criptos a USD, EUR y 10+ monedas fiat con precios de CoinGecko en tiempo real.'
    },
    'profit-calculator': {
      title: 'Calculadora de Ganancias Cripto',
      description: 'Calculadora de Ganancias Cripto gratuita. Ingresa precios de compra y venta para ver ROI, comisiones totales y beneficio neto para 500+ criptomonedas.'
    },
    'mining-calculator': {
      title: 'Calculadora de Minería de Bitcoin',
      description: 'Calculadora de Minería de Bitcoin gratuita. Ingresa hashrate, consumo y coste eléctrico para estimar ingresos diarios, mensuales y anuales en BTC.'
    },
    'dca-calculator': {
      title: 'Calculadora DCA',
      description: 'Calculadora DCA gratuita para Bitcoin, Ethereum y 500+ criptos. Simula estrategias de inversión periódica con datos históricos y compara DCA vs inversión única.'
    },
    'tax-calculator': {
      title: 'Calculadora de Impuestos Cripto',
      description: 'Calculadora de Impuestos Cripto gratuita para 17 países. Estima impuestos sobre ganancias de capital y compara tasas a corto y largo plazo.'
    },
    'what-if': {
      title: 'Calculadora Y Si (What If)',
      description: 'Calculadora Y Si gratuita. Simula entradas hipotéticas en cripto, evalúa el coste de oportunidad y compara resultados de inversiones alternativas al instante.'
    },
    'position-size-calculator': {
      title: 'Calculadora de Tamaño de Posición',
      description: 'Calculadora de Tamaño de Posición gratuita para traders cripto. Determina el tamaño óptimo según balance, riesgo y stop-loss. Hasta 125x.'
    },
    'liquidation-calculator': {
      title: 'Calculadora de Liquidación',
      description: 'Calculadora de Precio de Liquidación gratuita para futuros cripto. Compatible con Binance, Bybit, OKX en modos Aislado y Cruzado.'
    },
    'funding-rate-calculator': {
      title: 'Calculadora de Tasa de Financiación',
      description: 'Calculadora de Funding Rate gratuita para futuros perpetuos. Calcula el coste diario, semanal, mensual y anual de mantener una posición apalancada.'
    },
    'tp-sl-calculator': {
      title: 'Calculadora TP / SL',
      description: 'Calculadora TP/SL gratuita para traders de cripto. Establece niveles óptimos de take-profit y stop-loss con ratio R:R, TPs parciales y escala visual de precios.'
    },
    'margin-calculator': {
      title: 'Calculadora de Margen',
      description: 'Calculadora de Margen gratuita para futuros cripto. Calcula margen requerido, nivel de margen, margen libre y precio de margin call en Binance, Bybit y OKX.'
    },
    'pip-calculator': {
      title: 'Calculadora de Valor de Pip',
      description: 'Calculadora de Valor de Pip gratuita para traders cripto. Calcula el valor en dólares de movimientos de precio para cualquier posición en BTC, ETH y más.'
    },
    'break-even-calculator': {
      title: 'Calculadora de Punto de Equilibrio',
      description: 'Calculadora de Punto de Equilibrio gratuita. Descubre cuánta ganancia necesitas para recuperarte de una pérdida o el precio de salida que cubre comisiones.'
    },
    'risk-reward-calculator': {
      title: 'Calculadora de Riesgo / Beneficio',
      description: 'Calculadora de Ratio Riesgo-Beneficio gratuita para traders cripto. Calcula el ratio R:R, tasa de acierto requerida y simula 100 operaciones.'
    },
    'staking-calculator': {
      title: 'Calculadora de Staking Cripto',
      description: 'Calculadora de Staking Cripto gratuita. Calcula recompensas diarias, semanales y anuales tras comisión del validador y proyecciones de precio.'
    },
    'impermanent-loss-calculator': {
      title: 'Calculadora de Pérdida Impermanente',
      description: 'Calculadora de Pérdida Impermanente gratuita para DeFi. Calcula IL para pools AMM, compara rendimientos LP vs HODL y evalúa si las comisiones compensan.'
    },
    'apy-apr-calculator': {
      title: 'Calculadora APY vs APR',
      description: 'Calculadora APY vs APR gratuita. Convierte entre APR y APY, compara frecuencias de capitalización y calcula ganancias reales en rendimientos DeFi y staking.'
    },
    'yield-farming-calculator': {
      title: 'Calculadora de Yield Farming',
      description: 'Calculadora de Yield Farming gratuita. Calcula beneficios netos de farming DeFi incluyendo gas, pérdida impermanente y frecuencia de cosecha.'
    },
    'gas-calculator': {
      title: 'Calculadora de Gas Cripto',
      description: 'Calculadora de Gas Cripto gratuita. Estima costes de gas en redes EVM principales para swaps, transferencias y acciones DeFi antes de confirmar transacciones.'
    },
    'uniswap-calculator': {
      title: 'Calculadora de Comisiones Uniswap',
      description: 'Calculadora de Comisiones Uniswap gratuita. Estima ingresos LP, impacto de pérdida impermanente, tiempo de recuperación y resultado neto del pool.'
    },
    'bridge-comparator': {
      title: 'Comparador de Costes de Bridge',
      description: 'Comparador de Costes de Bridge gratuito. Compara rutas de puentes cripto por comisión estimada, velocidad y seguridad entre bridges L2 y multichain.'
    },
    'lending-calculator': {
      title: 'Calculadora de Préstamos Cripto',
      description: 'Calculadora de Préstamos Cripto gratuita. Calcula rendimientos proyectados de lending usando APY, modelo de capitalización, plazo y comisiones de plataforma.'
    },
    'gpu-mining-calculator': {
      title: 'Calculadora de Minería GPU',
      description: 'Calculadora de Minería GPU gratuita. Estima la rentabilidad de minería con GPU usando hashrate, consumo eléctrico, tarifas de electricidad y comisiones de pool.'
    },
    'asic-mining-calculator': {
      title: 'Calculadora de Minería ASIC',
      description: 'Calculadora de Minería ASIC gratuita. Calcula rentabilidad de minería ASIC, coste eléctrico y período de recuperación para los principales modelos de hardware.'
    },
    'mining-roi-calculator': {
      title: 'Calculadora ROI de Minería',
      description: 'Calculadora ROI de Minería gratuita. Modela el retorno de inversión en hardware de minería con análisis de escenarios para ingresos y costes.'
    },
    'electricity-cost-calculator': {
      title: 'Calculadora de Coste Eléctrico de Minería',
      description: 'Calculadora de Coste Eléctrico de Minería gratuita. Calcula consumo energético y coste operativo por dispositivos, potencia, uptime y tarifa local.'
    },
    'difficulty-calculator': {
      title: 'Estimador de Dificultad de Minería',
      description: 'Estimador de Dificultad de Minería gratuito. Estima cómo el próximo ajuste de dificultad puede impactar tus ingresos y rentabilidad de minería proyectados.'
    },
    'hashrate-converter': {
      title: 'Conversor de Hashrate',
      description: 'Conversor de Hashrate gratuito. Convierte unidades de hashrate desde H/s hasta EH/s y compara rangos típicos para hardware ASIC y GPU.'
    },
    'market-cap-calculator': {
      title: 'Calculadora de Capitalización de Mercado',
      description: 'Calculadora de Capitalización de Mercado gratuita. Calcula precio del token desde market cap y suministro, o market cap desde el precio, con datos en vivo.'
    },
    'market-cap-comparator': {
      title: 'Comparador de Capitalización de Mercado',
      description: 'Comparador de Capitalización de Mercado gratuito. Compara cualquier cripto con las principales monedas. Calcula precios y multiplicadores hipotéticos.'
    },
    'roi-calculator': {
      title: 'Calculadora de ROI',
      description: 'Calculadora de ROI Cripto gratuita con rendimientos anualizados. Calcula ROI total y anualizado y compara rendimiento con S&P 500, Oro e Inmobiliario.'
    },
    'reverse-roi': {
      title: 'Calculadora de ROI Inverso',
      description: 'Calculadora de ROI Inverso gratuita. Ingresa tu inversión y beneficio objetivo para encontrar el precio exacto del token. Multiplicador y tabla de hitos.'
    },
    'hodl-vs-trade': {
      title: 'Calculadora HODL vs Trading',
      description: 'Simulador HODL vs Trading gratuito. Compara buy-and-hold con trading activo. Simula operaciones con tasas de acierto, objetivos y comisiones.'
    },
    'rebalancing-calculator': {
      title: 'Calculadora de Rebalanceo de Cartera',
      description: 'Calculadora de Rebalanceo de Cartera gratuita. Calcula acciones de compra/venta para rebalancear tu portafolio cripto hacia asignaciones objetivo.'
    },
    'compound-calculator': {
      title: 'Calculadora de Interés Compuesto (Cripto)',
      description: 'Calculadora de Interés Compuesto para cripto gratuita. Proyecta crecimiento compuesto para staking, yield farming y ahorros con aportaciones recurrentes.'
    },
    'ico-roi-calculator': {
      title: 'Calculadora de ROI de ICO / IDO',
      description: 'Calculadora de ROI de ICO/IDO gratuita. Calcula el ROI actual y en ATH para asignaciones de ICO o IDO usando cantidad de tokens y precio de entrada.'
    },
    'airdrop-calculator': {
      title: 'Calculadora de Valor de Airdrop',
      description: 'Calculadora de Valor de Airdrop gratuita. Calcula el valor de airdrops cripto recibidos, estima la obligación fiscal y rastrea ganancia o pérdida.'
    },
    'satoshi-converter': {
      title: 'Conversor de Satoshis',
      description: 'Conversor de Satoshis gratuito. Convierte entre Bitcoin, Satoshis y USD/EUR al instante. Sats por dólar, tablas de referencia y precio BTC en vivo.'
    },
    'gwei-converter': {
      title: 'Conversor de Gwei',
      description: 'Conversor de Gwei gratuito. Convierte unidades Wei, Gwei y Ether al instante con precio ETH en vivo y ejemplos prácticos de coste de gas para Ethereum.'
    },
    'timestamp-converter': {
      title: 'Conversor de Marca de Tiempo Unix',
      description: 'Conversor de Marca de Tiempo Unix gratuito. Convierte timestamp Unix a fecha/hora y viceversa con visualización UTC/local y estimaciones de tiempo de bloque.'
    },
    'unit-converter': {
      title: 'Conversor de Unidades Cripto',
      description: 'Conversor de Unidades Cripto gratuito. Convierte unidades de denominación para BTC, ETH, SOL y USDT incluyendo satoshi, gwei, lamport y micro unidades.'
    },
    'exchange-fees': {
      title: 'Comparador de Comisiones de Exchanges',
      description: 'Comparador de Comisiones de Exchanges gratuito. Compara comisiones en Binance, Bybit, OKX, Coinbase, Kraken y más con desglose maker/taker.'
    },
    'crypto-loan-calculator': {
      title: 'Calculadora de Préstamo Cripto',
      description: 'Calculadora de Préstamo Cripto gratuita. Estima monto del préstamo, costes de interés, umbral de margin call y riesgo de liquidación para préstamos DeFi y CeFi.'
    },
    'vesting-calculator': {
      title: 'Calculadora de Vesting de Tokens',
      description: 'Calculadora de Vesting de Tokens gratuita. Visualiza calendarios de desbloqueo con cliff, TGE y vesting mensual o trimestral para planificar tu salida.'
    },
    'nft-profit-calculator': {
      title: 'Calculadora de Ganancias NFT',
      description: 'Calculadora de Ganancias NFT gratuita. Calcula el beneficio real del trading de NFT tras comisiones del marketplace, regalías y costes de gas.'
    },
    'halving-calculator': {
      title: 'Calculadora de Halving de Bitcoin',
      description: 'Calculadora de Halving de Bitcoin gratuita con cuenta regresiva en vivo. Descubre cómo el próximo halving afecta la minería con datos históricos.'
    },
    'mev-calculator': {
      title: 'Calculadora de Protección MEV',
      description: 'Calculadora de Protección MEV gratuita. Estima riesgo de ataques sandwich y frontrun, y ahorros potenciales de rutas con protección MEV.'
    },
    'gamefi-calculator': {
      title: 'Calculadora ROI de GameFi',
      description: 'Calculadora ROI de GameFi gratuita. Estima período de recuperación y ROI anual para estrategias play-to-earn según coste de setup y recompensas.'
    },
    'node-calculator': {
      title: 'Calculadora de Nodo Validador',
      description: 'Calculadora de Nodo Validador gratuita. Modela la economía del nodo validador usando cantidad stakeada, APR, comisión, uptime y costes de infraestructura.'
    },
    'salary-calculator': {
      title: 'Calculadora de Salario Cripto',
      description: 'Calculadora de Salario Cripto gratuita. Convierte tu salario fiat a BTC, ETH o USDT. Calcula acumulación cripto con frecuencia de pago y comisiones.'
    },
    'inflation-hedge': {
      title: 'Calculadora de Cobertura de Inflación',
      description: 'Calculadora de Cobertura de Inflación gratuita. Compara cripto, stablecoins, oro y S&P 500 contra la inflación en Turquía, Argentina, Nigeria, EE.UU. y más.'
    },
    'calmar-calculator': {
      title: 'Calculadora de Ratio Calmar',
      description: 'Calcula el ratio Calmar a partir del rendimiento anual y el drawdown máximo para comparar la eficiencia del retorno por riesgo de caída.'
    },
    'compound-interest-calculator': {
      title: 'Calculadora de Interés Compuesto Cripto',
      description: 'Calculadora de interés compuesto gratuita para staking y yield farming. Mira cómo la capitalización diaria, semanal o mensual hace crecer tu inversión.'
    },
    'drawdown-calculator': {
      title: 'Calculadora de Recuperación de Drawdown',
      description: 'Mide el drawdown del portafolio, la ganancia de recuperación requerida y el tiempo estimado de recuperación según el rendimiento mensual esperado.'
    },
    'gas-fee-calculator': {
      title: 'Calculadora de Comisión de Gas',
      description: 'Calculadora de gas gratuita para Ethereum, Polygon, Arbitrum, Optimism, BNB Chain y más. Estima costes de transacción para swaps, transferencias y minting.'
    },
    'information-ratio-calculator': {
      title: 'Calculadora de Ratio de Información',
      description: 'Compara el rendimiento activo del portafolio frente a un benchmark usando retorno activo y tracking error.'
    },
    'kelly-calculator': {
      title: 'Calculadora del Criterio de Kelly',
      description: 'Encuentra el tamaño óptimo de posición a partir del win rate y ratio de pago usando modelos Kelly, half-Kelly y quarter-Kelly.'
    },
    'leverage-calculator': {
      title: 'Calculadora de Apalancamiento',
      description: 'Calculadora de apalancamiento gratuita para cripto. Mira cómo el apalancamiento amplifica ganancias y pérdidas con distancia de liquidación y tabla PnL.'
    },
    'loan-calculator': {
      title: 'Calculadora de Amortización de Préstamo Cripto',
      description: 'Calculadora de amortización de préstamo cripto gratuita. Genera calendarios de amortización, estima pagos mensuales y rastrea capital vs. interés.'
    },
    'portfolio-calculator': {
      title: 'Calculadora de Asignación de Cartera',
      description: 'Calculadora de asignación de cartera gratuita. Visualiza pesos de activos, establece asignaciones objetivo y obtén sugerencias de rebalanceo cripto.'
    },
    'risk-of-ruin-calculator': {
      title: 'Calculadora de Riesgo de Ruina',
      description: 'Estima la probabilidad de ruina de la cuenta a partir del win rate, perfil de riesgo/beneficio y riesgo fijo por operación.'
    },
    'sharpe-calculator': {
      title: 'Calculadora de Ratio de Sharpe',
      description: 'Evalúa el rendimiento ajustado al riesgo del portafolio usando retorno esperado, volatilidad y tasa libre de riesgo.'
    },
    'slippage-calculator': {
      title: 'Calculadora de Slippage DEX',
      description: 'Estima el slippage del swap, el monto mínimo recibido y el coste total de ejecución para operaciones en DEX.'
    },
    'sortino-calculator': {
      title: 'Calculadora de Ratio de Sortino',
      description: 'Mide el rendimiento ajustado al riesgo del portafolio con enfoque en volatilidad a la baja usando el ratio Sortino.'
    },
    'staking-rewards-calculator': {
      title: 'Calculadora de Recompensas de Staking',
      description: 'Calculadora de staking gratuita. Estima ganancias diarias, semanales y mensuales para Ethereum, Solana, Polkadot, Cosmos y otras monedas PoS.'
    },
    'trade-expectancy-calculator': {
      title: 'Calculadora de Expectativa de Trading',
      description: 'Estima la ventaja por operación y proyecta resultados mensuales usando win rate, múltiplos R y riesgo por operación.'
    },
    'treynor-calculator': {
      title: 'Calculadora de Ratio de Treynor',
      description: 'Mide el retorno por unidad de riesgo de mercado (beta) y evalúa la eficiencia de la estrategia frente a la tasa libre de riesgo.'
    },
    'var-calculator': {
      title: 'Calculadora de Valor en Riesgo (VaR)',
      description: 'Estima el riesgo a la baja del portafolio con VaR paramétrico y pérdida esperada (CVaR) en múltiples niveles de confianza.'
    },
    'bitcoin-unit-converter': {
      title: 'Conversor de Unidades Bitcoin',
      description: 'Conversor de Unidades Bitcoin gratuito. Convierte entre BTC, mBTC, bits y satoshis al instante con valor en USD en tiempo real y tabla de denominaciones.'
    },
    'cross-chain-bridge-calculator': {
      title: 'Calculadora de Puente Cross-Chain',
      description: 'Calculadora de Puente Cross-Chain gratuita. Estima comisiones, tiempo de transferencia y slippage al mover tokens entre Ethereum, Arbitrum, Solana y más.'
    },
    'crypto-correlation-calculator': {
      title: 'Calculadora de Correlación Cripto',
      description: 'Calculadora de Correlación Cripto gratuita. Mide la correlación de precios entre criptomonedas y construye un portafolio diversificado con menor riesgo.'
    },
    'crypto-index-fund-calculator': {
      title: 'Calculadora de Fondo Índice Cripto',
      description: 'Calculadora de Fondo Índice Cripto gratuita. Crea un índice personalizado por capitalización o peso igual, y compara rendimiento frente a BTC.'
    },
    'crypto-inheritance-calculator': {
      title: 'Calculadora de Herencia Cripto',
      description: 'Calculadora de Herencia Cripto gratuita. Planifica la sucesión de activos digitales con costes multi-firma, impuestos sucesorios y distribución a herederos.'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'Calculadora de Rebalanceo de Portafolio Cripto',
      description: 'Calculadora de Rebalanceo gratuita. Ingresa tus tenencias y pesos objetivo para ver las cantidades exactas de compra y venta necesarias.'
    },
    'crypto-sentiment-calculator': {
      title: 'Calculadora de Sentimiento Cripto',
      description: 'Calculadora de Sentimiento Cripto gratuita. Agrega el índice Fear & Greed, volumen social y tasas de funding en una puntuación compuesta de sentimiento.'
    },
    'defi-yield-aggregator': {
      title: 'Agregador de Rendimientos DeFi',
      description: 'Agregador de Rendimientos DeFi gratuito. Compara APY en tiempo real en Aave, Compound, Lido y 50+ protocolos. Filtra por cadena, activo y TVL.'
    },
    'dust-attack-calculator': {
      title: 'Calculadora de Ataque Dust',
      description: 'Calculadora de Ataque Dust gratuita. Detecta transacciones diminutas no solicitadas, estima costes de consolidación y protege tu privacidad on-chain.'
    },
    'exchange-fee-comparator': {
      title: 'Comparador de Comisiones de Exchange',
      description: 'Comparador de Comisiones gratuito. Compara comisiones de Binance, Coinbase, Kraken, OKX y Bybit en spot, futuros y retiros lado a lado.'
    },
    'flash-loan-calculator': {
      title: 'Calculadora de Préstamo Flash',
      description: 'Calculadora de Préstamo Flash gratuita. Estima la rentabilidad incluyendo comisiones del protocolo, gas y spread de arbitraje para Aave, dYdX y Uniswap.'
    },
    'gas-optimization-calculator': {
      title: 'Calculadora de Optimización de Gas',
      description: 'Calculadora de Optimización de Gas gratuita. Encuentra la hora más económica para operar en Ethereum y L2. Compara costes por hora y ahorra en comisiones.'
    },
    'governance-voting-calculator': {
      title: 'Calculadora de Votación de Gobernanza',
      description: 'Calculadora de Votación DAO gratuita. Estima poder de voto, requisitos de quórum e impacto de delegación para propuestas de gobernanza descentralizada.'
    },
    'nft-rarity-calculator': {
      title: 'Calculadora de Rareza NFT',
      description: 'Calculadora de Rareza NFT gratuita. Puntúa la rareza de atributos con métodos de rareza estadística, promedio de rasgos y contenido informacional.'
    },
    'token-unlock-calculator': {
      title: 'Calculadora de Desbloqueo de Tokens',
      description: 'Calculadora de Desbloqueo de Tokens gratuita. Rastrea próximos desbloqueos, estima la presión de venta y visualiza calendarios de vesting de cualquier proyecto.'
    },
    'whale-alert-calculator': {
      title: 'Calculadora de Alerta de Ballenas',
      description: 'Calculadora de Alerta de Ballenas gratuita. Estima el impacto de grandes transferencias, calcula slippage de órdenes masivas y configura umbrales de alerta.'
    },
    'arbitrage-calculator': {
      title: 'Calculadora de Arbitraje Cripto',
      description: 'Calcula el beneficio de arbitraje entre exchanges después de comisiones y costes de retiro.'
    },
    'stock-to-flow-calculator': {
      title: 'Calculadora Stock-to-Flow Bitcoin',
      description: 'Evalúa la escasez de Bitcoin con el modelo S2F y compara el precio real con la predicción del modelo.'
    },
    'options-calculator': {
      title: 'Calculadora de Opciones Cripto',
      description: 'Calcula P&L de opciones, precio de equilibrio y tabla de pagos para calls y puts cripto.'
    },
    'tax-loss-harvesting-calculator': {
      title: 'Calculadora de Cosecha de Pérdidas Fiscales',
      description: 'Identifica pérdidas fiscales cosechables en cripto para compensar ganancias de capital.'
    },
    'restaking-calculator': {
      title: 'Calculadora de Restaking',
      description: 'Estima el rendimiento combinado de staking nativo más protocolos de restaking como EigenLayer.'
    },
    'liquid-staking-calculator': {
      title: 'Calculadora de Staking Líquido',
      description: 'Compara protocolos de staking líquido — Lido, Rocket Pool, Coinbase, Frax — por rendimiento y comisiones.'
    },
    'perpetual-futures-calculator': {
      title: 'Calculadora de Futuros Perpetuos',
      description: 'Calcula P&L de futuros perpetuos con apalancamiento, costes de funding y precio de liquidación.'
    },
    'payback-period-calculator': {
      title: 'Calculadora de Período de Recuperación',
      description: 'Calcula cuánto tiempo tardará tu inversión en cripto en recuperarse según los rendimientos esperados.'
    },
    'dva-calculator': {
      title: 'Calculadora DVA',
      description: 'Compara Dollar Value Averaging vs DCA — DVA ajusta las cantidades de inversión según el rendimiento del portafolio.'
    },
    'bitcoin-energy-calculator': {
      title: 'Calculadora de Energía Bitcoin',
      description: 'Estima el consumo energético, huella de carbono y coste ambiental de la minería de Bitcoin.'
    },
    'on-chain-metrics-calculator': {
      title: 'Calculadora de Métricas On-Chain',
      description: 'Analiza la valoración de Bitcoin con MVRV, NVT y SOPR — señales on-chain de zonas de sobrecompra o infravaloración.'
    },
    'grid-trading-calculator': {
      title: 'Calculadora de Grid Trading',
      description: 'Planifica tu estrategia de bot de grid trading — calcula beneficio por grid y rendimiento anual estimado.'
    },
    'inheritance-tax-calculator': {
      title: 'Calculadora de Impuesto de Herencia Cripto',
      description: 'Estima el impuesto de herencia sobre activos cripto en 8 países con exenciones por tipo de relación.'
    },
    'validator-calculator': {
      title: 'Calculadora de Economía del Validador',
      description: 'Calcula la rentabilidad del validador PoS — recompensas, costes operativos, ROI para Ethereum, Solana y más.'
    },
    'token-valuation-calculator': {
      title: 'Calculadora de Valoración de Token',
      description: 'Analiza FDV del token, capitalización de mercado, riesgo de dilución y compara con proyectos establecidos.'
    },
    'if-i-had-bought': {
      title: 'Calculadora Si Hubiera Comprado',
      description: 'Descubre cuánto valdría tu inversión hoy si hubieras comprado Bitcoin, Ethereum u otras cripto a precios históricos.'
    },
    'millionaire-calculator': {
      title: 'Calculadora Millonario Cripto',
      description: 'Planifica tu camino a $1M — calcula cuánto y cuánto tiempo necesitas invertir para alcanzar tu meta.'
    },
    'pizza-day-calculator': {
      title: 'Calculadora del Día de la Pizza Bitcoin',
      description: 'Calcula el valor actual de la famosa compra de 10,000 BTC por pizza y explora el coste de oportunidad.'
    },
    'retirement-calculator': {
      title: 'Calculadora de Jubilación Cripto / FIRE',
      description: 'Calcula cuántas cripto necesitas para jubilarte. Número FIRE, crecimiento del portafolio y años hasta la independencia financiera.'
    },
    'rainbow-chart-calculator': {
      title: 'Calculadora del Gráfico Arcoíris de Bitcoin',
      description: 'Descubre en qué zona se encuentra Bitcoin en el gráfico arcoíris logarítmico con 9 bandas de precio.'
    },
    'etf-fee-calculator': {
      title: 'Calculadora de Comisiones ETF Bitcoin',
      description: 'Compara las comisiones de IBIT, FBTC, GBTC, ARKB, BITB y BTC directo. Visualiza cómo las comisiones afectan a lo largo de 1–30 años.'
    },
    'token-burn-calculator': {
      title: 'Calculadora de Quema de Tokens',
      description: 'Analiza la economía deflacionaria de tokens — tasa de quema, reducción de suministro y el impacto en la capitalización de mercado.'
    },
    'futures-basis-calculator': {
      title: 'Calculadora de Base de Futuros',
      description: 'Calcula el spread spot-futuros, base anualizada, rendimiento cash-and-carry y beneficio de arbitraje tras comisiones.'
    },
    'defi-insurance-calculator': {
      title: 'Calculadora de Seguro DeFi',
      description: 'Estima si el seguro DeFi vale la prima. Compara escenarios asegurados vs no asegurados, tamaño de hackeo de equilibrio e impacto en rendimiento.'
    },
    'mayer-multiple-calculator': {
      title: 'Calculadora del Múltiplo de Mayer',
      description: 'Calculadora del Múltiplo de Mayer: precio actual de BTC ÷ media móvil de 200 días. Por encima de 2,4 = zona de venta histórica; por debajo de 1,0 = zona de compra.'
    },
    'geometric-mean-return-calculator': {
      title: 'Calculadora de Media Geométrica de Retornos',
      description: 'Calcula el retorno compuesto verdadero vs media aritmética. Revela el "drag de volatilidad" en activos volátiles como las criptomonedas.'
    },
    'mstr-mnav-calculator': {
      title: 'Calculadora de Prima mNAV de MicroStrategy',
      description: 'Calcula la prima de empresas con tesorería en Bitcoin (MSTR, MetaPlanet, Semler) sobre el NAV puro de BTC. Detecta sobrevaloración.'
    },
    'lightning-network-fee-calculator': {
      title: 'Calculadora de Comisiones Lightning Network',
      description: 'Calcula comisiones de enrutamiento Lightning Network: base + ppm por salto. Compara con comisiones on-chain de Bitcoin.'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Calculadora de Curva Bonding de Pump.fun',
      description: 'Calculadora de curva bonding de Pump.fun: tokens recibidos por SOL invertido, slippage y distancia hasta los $69K para graduarse a Raydium.'
    },
    'profit-factor-calculator': {
      title: 'Calculadora de Factor de Beneficio',
      description: 'Calculadora de Profit Factor para sistemas de trading. Calcula la ratio beneficio bruto / pérdida bruta. Por encima de 1,5 = ventaja sólida.'
    },
    'covered-call-calculator': {
      title: 'Calculadora de Call Cubierta',
      description: 'Calculadora de Call Cubierta para opciones cripto. Calcula rendimiento de prima, retorno anualizado, breakeven y riesgo de asignación.'
    },
    'iron-condor-calculator': {
      title: 'Calculadora Iron Condor',
      description: 'Calculadora Iron Condor de 4 patas. Calcula prima neta, beneficio máx, pérdida máx, breakevens y diagrama de payoff completo.'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'Calculadora de Arbitraje de Funding Perpetuo',
      description: 'Calculadora de arbitraje de funding rate: long spot + short perp = delta-neutral. Calcula APR, comisiones y tasa de funding de equilibrio.'
    },
    'concentrated-liquidity-calculator': {
      title: 'Calculadora de Liquidez Concentrada (Uniswap V3)',
      description: 'Calculadora de liquidez concentrada Uniswap V3: eficiencia de capital, ingresos por comisiones, IL en bordes del rango.'
    },
    'looping-yield-calculator': {
      title: 'Calculadora de Looping / Préstamo Recursivo',
      description: 'Calculadora de looping DeFi: borrow → re-deposit recursivo para amplificar rendimiento. Calcula apalancamiento efectivo, APR neto y distancia a liquidación.'
    },
  },
  'pt': {
    'converter': {
      title: 'Conversor de Criptomoedas',
      description: 'Conversor de Criptomoedas gratuito. Converta Bitcoin, Ethereum e 500+ criptos para USD, EUR e 10+ moedas fiat com preços CoinGecko em tempo real.'
    },
    'profit-calculator': {
      title: 'Calculadora de Lucro Cripto',
      description: 'Calculadora de Lucro Cripto gratuita. Insira preços de compra e venda para ver ROI, taxas totais e lucro líquido para 500+ criptomoedas.'
    },
    'mining-calculator': {
      title: 'Calculadora de Mineração de Bitcoin',
      description: 'Calculadora de Mineração de Bitcoin gratuita. Insira hashrate, consumo de energia e custo de eletricidade para estimar receita diária, mensal e anual em BTC.'
    },
    'dca-calculator': {
      title: 'Calculadora DCA',
      description: 'Calculadora DCA gratuita para Bitcoin, Ethereum e 500+ criptos. Simule estratégias de investimento periódico com dados históricos e compare DCA.'
    },
    'tax-calculator': {
      title: 'Calculadora de Impostos Cripto',
      description: 'Calculadora de Impostos Cripto gratuita para 17 países. Estime impostos sobre ganhos de capital e compare taxas de curto e longo prazo.'
    },
    'what-if': {
      title: 'Calculadora E Se (What If)',
      description: 'Calculadora E Se gratuita. Simule entradas hipotéticas em cripto, avalie o custo de oportunidade e compare resultados de investimentos alternativos.'
    },
    'position-size-calculator': {
      title: 'Calculadora de Tamanho de Posição',
      description: 'Calculadora de Tamanho de Posição gratuita para traders cripto. Determine o tamanho ideal com base no saldo, risco e stop-loss. Até 125x.'
    },
    'liquidation-calculator': {
      title: 'Calculadora de Liquidação',
      description: 'Calculadora de Preço de Liquidação gratuita para futuros cripto. Compatível com Binance, Bybit, OKX nos modos Isolado e Cruzado.'
    },
    'funding-rate-calculator': {
      title: 'Calculadora de Taxa de Financiamento',
      description: 'Calculadora de Funding Rate gratuita para futuros perpétuos. Calcule o custo diário, semanal, mensal e anual de manter uma posição alavancada.'
    },
    'tp-sl-calculator': {
      title: 'Calculadora TP / SL',
      description: 'Calculadora TP/SL gratuita para traders de cripto. Defina níveis ideais de take-profit e stop-loss com razão R:R, TPs parciais e escala visual de preços.'
    },
    'margin-calculator': {
      title: 'Calculadora de Margem',
      description: 'Calculadora de Margem gratuita para futuros cripto. Calcule margem requerida, nível de margem, margem livre e preço de margin call na Binance, Bybit e OKX.'
    },
    'pip-calculator': {
      title: 'Calculadora de Valor de Pip',
      description: 'Calculadora de Valor de Pip gratuita para traders cripto. Calcule o valor em dólares dos movimentos de preço para qualquer posição em BTC, ETH e mais.'
    },
    'break-even-calculator': {
      title: 'Calculadora de Ponto de Equilíbrio',
      description: 'Calculadora de Ponto de Equilíbrio gratuita. Descubra quanto ganho você precisa para se recuperar de uma perda ou calcule o preço de saída que cobre suas taxas.'
    },
    'risk-reward-calculator': {
      title: 'Calculadora de Risco / Retorno',
      description: 'Calculadora de Razão Risco-Retorno gratuita para traders de cripto. Calcule a razão R:R, taxa de acerto necessária e simule 100 operações para qualquer setup.'
    },
    'staking-calculator': {
      title: 'Calculadora de Staking Cripto',
      description: 'Calculadora de Staking Cripto gratuita. Calcule recompensas diárias, semanais e anuais de staking após comissão do validador e projeções de preço do token.'
    },
    'impermanent-loss-calculator': {
      title: 'Calculadora de Perda Impermanente',
      description: 'Calculadora de Perda Impermanente gratuita para DeFi. Calcule IL para pools AMM, compare retornos LP vs HODL e avalie se as taxas compensam a perda.'
    },
    'apy-apr-calculator': {
      title: 'Calculadora APY vs APR',
      description: 'Calculadora APY vs APR gratuita. Converta entre APR e APY, compare frequências de capitalização e calcule ganhos reais em rendimentos DeFi e staking.'
    },
    'yield-farming-calculator': {
      title: 'Calculadora de Yield Farming',
      description: 'Calculadora de Yield Farming gratuita. Calcule lucros líquidos de farming DeFi incluindo gas, perda impermanente e frequência de colheita.'
    },
    'gas-calculator': {
      title: 'Calculadora de Gas Cripto',
      description: 'Calculadora de Gas Cripto gratuita. Estime custos de gas nas principais redes EVM para swaps, transferências e ações DeFi antes de confirmar transações.'
    },
    'uniswap-calculator': {
      title: 'Calculadora de Taxas Uniswap',
      description: 'Calculadora de Taxas Uniswap gratuita. Estime receita de taxas LP, impacto de perda impermanente, tempo de equilíbrio e resultado líquido do pool.'
    },
    'bridge-comparator': {
      title: 'Comparador de Custos de Bridge',
      description: 'Comparador de Custos de Bridge gratuito. Compare rotas de pontes cripto por taxa estimada, velocidade e segurança entre bridges L2 e multichain.'
    },
    'lending-calculator': {
      title: 'Calculadora de Empréstimos Cripto',
      description: 'Calculadora de Empréstimos Cripto gratuita. Calcule retornos projetados de lending usando APY, modelo de capitalização, prazo e taxas de plataforma.'
    },
    'gpu-mining-calculator': {
      title: 'Calculadora de Mineração GPU',
      description: 'Calculadora de Mineração GPU gratuita. Estime a rentabilidade da mineração com GPU usando hashrate, consumo de energia, tarifas de eletricidade e taxas de pool.'
    },
    'asic-mining-calculator': {
      title: 'Calculadora de Mineração ASIC',
      description: 'Calculadora de Mineração ASIC gratuita. Calcule rentabilidade de mineração ASIC, custo de eletricidade e período de retorno para os principais modelos.'
    },
    'mining-roi-calculator': {
      title: 'Calculadora ROI de Mineração',
      description: 'Calculadora ROI de Mineração gratuita. Modele o retorno sobre investimento em hardware de mineração com análise de cenários para receita e custos.'
    },
    'electricity-cost-calculator': {
      title: 'Calculadora de Custo de Eletricidade para Mineração',
      description: 'Calculadora de Custo de Eletricidade para Mineração gratuita. Calcule consumo de energia e custo operacional por dispositivos, potência, uptime e tarifa local.'
    },
    'difficulty-calculator': {
      title: 'Avaliador de Dificuldade de Mineração',
      description: 'Avaliador de Dificuldade de Mineração gratuito. Estime como o próximo ajuste de dificuldade pode impactar sua receita e rentabilidade de mineração projetadas.'
    },
    'hashrate-converter': {
      title: 'Conversor de Hashrate',
      description: 'Conversor de Hashrate gratuito. Converta unidades de hashrate de H/s até EH/s e compare faixas típicas para hardware ASIC e GPU.'
    },
    'market-cap-calculator': {
      title: 'Calculadora de Capitalização de Mercado',
      description: 'Calculadora de Capitalização de Mercado gratuita. Calcule preço do token pelo market cap e oferta, ou market cap pelo preço, com dados em tempo real.'
    },
    'market-cap-comparator': {
      title: 'Comparador de Capitalização de Mercado',
      description: 'Comparador de Capitalização de Mercado gratuito. Compare qualquer cripto com as principais moedas. Calcule preços hipotéticos e multiplicadores de crescimento.'
    },
    'roi-calculator': {
      title: 'Calculadora de ROI',
      description: 'Calculadora de ROI Cripto gratuita com retornos anualizados. Calcule ROI total e anualizado e compare desempenho com S&P 500, Ouro e Imóveis.'
    },
    'reverse-roi': {
      title: 'Calculadora de ROI Reverso',
      description: 'Calculadora de ROI Reverso gratuita. Insira investimento e lucro alvo para encontrar o preço exato do token. Multiplicador e tabela de marcos.'
    },
    'hodl-vs-trade': {
      title: 'Calculadora HODL vs Trading',
      description: 'Simulador HODL vs Trading gratuito. Compare buy-and-hold com trading ativo. Simule operações com taxas de acerto, alvos de lucro e comissões personalizadas.'
    },
    'rebalancing-calculator': {
      title: 'Calculadora de Rebalanceamento de Carteira',
      description: 'Calculadora de Rebalanceamento de Carteira gratuita. Calcule ações de compra/venda para rebalancear seu portfólio cripto para alocações alvo.'
    },
    'compound-calculator': {
      title: 'Calculadora de Juros Compostos (Cripto)',
      description: 'Calculadora de Juros Compostos para cripto gratuita. Projete crescimento composto para staking, yield farming e poupança com contribuições recorrentes.'
    },
    'ico-roi-calculator': {
      title: 'Calculadora de ROI de ICO / IDO',
      description: 'Calculadora de ROI de ICO/IDO gratuita. Calcule ROI atual e em ATH para alocações de ICO ou IDO usando quantidade de tokens e preço de entrada.'
    },
    'airdrop-calculator': {
      title: 'Calculadora de Valor de Airdrop',
      description: 'Calculadora de Valor de Airdrop gratuita. Calcule o valor de airdrops cripto recebidos, estime a obrigação fiscal e acompanhe lucro ou perda após taxas.'
    },
    'satoshi-converter': {
      title: 'Conversor de Satoshi',
      description: 'Conversor de Satoshi gratuito. Converta entre Bitcoin, Satoshis e USD/EUR instantaneamente. Sats por dólar, tabelas de referência e preço BTC ao vivo.'
    },
    'gwei-converter': {
      title: 'Conversor de Gwei',
      description: 'Conversor de Gwei gratuito. Converta unidades Wei, Gwei e Ether instantaneamente com preço ETH ao vivo e exemplos práticos de custo de gas para Ethereum.'
    },
    'timestamp-converter': {
      title: 'Conversor de Timestamp Unix',
      description: 'Conversor de Timestamp Unix gratuito. Converta timestamp Unix para data/hora e vice-versa com exibição UTC/local e estimativas de tempo de bloco.'
    },
    'unit-converter': {
      title: 'Conversor de Unidades Cripto',
      description: 'Conversor de Unidades Cripto gratuito. Converta unidades de denominação para BTC, ETH, SOL e USDT incluindo satoshi, gwei, lamport e micro unidades.'
    },
    'exchange-fees': {
      title: 'Comparador de Taxas de Exchanges',
      description: 'Comparador de Taxas de Exchanges gratuito. Compare taxas de trading na Binance, Bybit, OKX, Coinbase, Kraken e mais com detalhamento de tarifas maker/taker.'
    },
    'crypto-loan-calculator': {
      title: 'Calculadora de Empréstimo Cripto',
      description: 'Calculadora de Empréstimo Cripto gratuita. Estime valor do empréstimo, custos de juros, limite de margin call e risco de liquidação em DeFi e CeFi.'
    },
    'vesting-calculator': {
      title: 'Calculadora de Vesting de Tokens',
      description: 'Calculadora de Vesting de Tokens gratuita. Visualize cronogramas de desbloqueio com cliff, TGE e vesting mensal ou trimestral para planejar sua saída.'
    },
    'nft-profit-calculator': {
      title: 'Calculadora de Lucro NFT',
      description: 'Calculadora de Lucro NFT gratuita. Calcule o lucro real do trading de NFT após taxas do marketplace, royalties do criador e custos de gas.'
    },
    'halving-calculator': {
      title: 'Calculadora de Halving do Bitcoin',
      description: 'Calculadora de Halving do Bitcoin gratuita com contagem regressiva ao vivo. Veja como o próximo halving afeta a mineração com dados históricos.'
    },
    'mev-calculator': {
      title: 'Calculadora de Proteção MEV',
      description: 'Calculadora de Proteção MEV gratuita. Estime risco de ataques sandwich e frontrun, e economias potenciais de rotas com proteção MEV.'
    },
    'gamefi-calculator': {
      title: 'Calculadora de ROI GameFi',
      description: 'Calculadora de ROI GameFi gratuita. Estime período de retorno e ROI anual para estratégias play-to-earn com base no custo de setup e recompensas.'
    },
    'node-calculator': {
      title: 'Calculadora de Nó Validador',
      description: 'Calculadora de Nó Validador gratuita. Modele a economia do nó validador usando quantidade staked, APR, comissão, uptime e custos de infraestrutura.'
    },
    'salary-calculator': {
      title: 'Calculadora de Salário Cripto',
      description: 'Calculadora de Salário Cripto gratuita. Converta seu salário fiat para BTC, ETH ou USDT. Calcule acumulação cripto com frequência de pagamento e taxas.'
    },
    'inflation-hedge': {
      title: 'Calculadora de Proteção contra Inflação',
      description: 'Calculadora de Proteção contra Inflação gratuita. Compare cripto, stablecoins, ouro e S&P 500 contra a inflação na Turquia, Argentina, Nigéria, EUA e mais.'
    },
    'calmar-calculator': {
      title: 'Calculadora de Ratio Calmar',
      description: 'Calcule o ratio Calmar a partir do retorno anual e drawdown máximo para comparar a eficiência do retorno por risco de queda.'
    },
    'compound-interest-calculator': {
      title: 'Calculadora de Juros Compostos Cripto',
      description: 'Calculadora de juros compostos gratuita para staking e yield farming. Veja como a capitalização diária, semanal ou mensal faz seu investimento crescer.'
    },
    'drawdown-calculator': {
      title: 'Calculadora de Recuperação de Drawdown',
      description: 'Meça o drawdown do portfólio, o ganho de recuperação necessário e o tempo estimado de recuperação com base no retorno mensal esperado.'
    },
    'gas-fee-calculator': {
      title: 'Calculadora de Taxa de Gas',
      description: 'Calculadora de gas gratuita para Ethereum, Polygon, Arbitrum, Optimism, BNB Chain e mais. Estime custos de transação para swaps, transferências e minting.'
    },
    'information-ratio-calculator': {
      title: 'Calculadora de Ratio de Informação',
      description: 'Compare o desempenho ativo do portfólio versus um benchmark usando retorno ativo e tracking error.'
    },
    'kelly-calculator': {
      title: 'Calculadora do Critério de Kelly',
      description: 'Encontre o tamanho ideal de posição a partir do win rate e razão de payoff usando modelos Kelly, half-Kelly e quarter-Kelly.'
    },
    'leverage-calculator': {
      title: 'Calculadora de Alavancagem',
      description: 'Calculadora de alavancagem gratuita para cripto. Veja como a alavancagem amplifica ganhos e perdas com comparação, distância de liquidação e tabela PnL.'
    },
    'loan-calculator': {
      title: 'Calculadora de Amortização de Empréstimo Cripto',
      description: 'Calculadora de amortização de empréstimo cripto gratuita. Gere cronogramas de amortização, estime pagamentos mensais e acompanhe capital vs. juros.'
    },
    'portfolio-calculator': {
      title: 'Calculadora de Alocação de Carteira',
      description: 'Calculadora de alocação de carteira gratuita. Visualize pesos de ativos, defina alocações alvo e obtenha sugestões de rebalanceamento para seu portfólio cripto.'
    },
    'risk-of-ruin-calculator': {
      title: 'Calculadora de Risco de Ruína',
      description: 'Estime a probabilidade de ruína da conta a partir do win rate, perfil de risco/retorno e risco fixo por operação.'
    },
    'sharpe-calculator': {
      title: 'Calculadora de Ratio de Sharpe',
      description: 'Avalie o desempenho ajustado ao risco do portfólio usando retorno esperado, volatilidade e taxa livre de risco.'
    },
    'slippage-calculator': {
      title: 'Calculadora de Slippage DEX',
      description: 'Estime o slippage do swap, valor mínimo recebido e custo total de execução para operações em DEX.'
    },
    'sortino-calculator': {
      title: 'Calculadora de Ratio de Sortino',
      description: 'Meça o desempenho ajustado ao risco do portfólio com foco em volatilidade negativa usando o ratio Sortino.'
    },
    'staking-rewards-calculator': {
      title: 'Calculadora de Recompensas de Staking',
      description: 'Calculadora de staking gratuita. Estime ganhos diários, semanais e mensais para Ethereum, Solana, Polkadot, Cosmos e outras moedas PoS.'
    },
    'trade-expectancy-calculator': {
      title: 'Calculadora de Expectativa de Trade',
      description: 'Estime a vantagem por operação e projete resultados mensais usando win rate, múltiplos R e risco por operação.'
    },
    'treynor-calculator': {
      title: 'Calculadora de Ratio de Treynor',
      description: 'Meça o retorno por unidade de risco de mercado (beta) e avalie a eficiência da estratégia contra a taxa livre de risco.'
    },
    'var-calculator': {
      title: 'Calculadora de Valor em Risco (VaR)',
      description: 'Estime o risco de queda do portfólio com VaR paramétrico e perda esperada (CVaR) em múltiplos níveis de confiança.'
    },
    'bitcoin-unit-converter': {
      title: 'Conversor de Unidades Bitcoin',
      description: 'Conversor de Unidades Bitcoin gratuito. Converta entre BTC, mBTC, bits e satoshis instantaneamente com valor em USD ao vivo e tabela de denominações.'
    },
    'cross-chain-bridge-calculator': {
      title: 'Calculadora de Ponte Cross-Chain',
      description: 'Calculadora de Ponte Cross-Chain gratuita. Estime taxas de bridge, tempo de transferência e slippage ao mover tokens entre Ethereum, Arbitrum, Solana e mais.'
    },
    'crypto-correlation-calculator': {
      title: 'Calculadora de Correlação Cripto',
      description: 'Calculadora de Correlação Cripto gratuita. Meça a correlação de preços entre criptomoedas e construa um portfólio diversificado com menor risco geral.'
    },
    'crypto-index-fund-calculator': {
      title: 'Calculadora de Fundo Índice Cripto',
      description: 'Calculadora de Fundo Índice Cripto gratuita. Crie um índice personalizado por capitalização ou peso igual, e compare desempenho versus BTC.'
    },
    'crypto-inheritance-calculator': {
      title: 'Calculadora de Herança Cripto',
      description: 'Calculadora de Herança Cripto gratuita. Planeje a sucessão de ativos digitais com custos multi-sig, impostos sobre herança e distribuição aos herdeiros.'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'Calculadora de Rebalanceamento de Portfólio Cripto',
      description: 'Calculadora de Rebalanceamento gratuita. Insira suas posições e pesos-alvo para ver os valores exatos de compra e venda necessários.'
    },
    'crypto-sentiment-calculator': {
      title: 'Calculadora de Sentimento Cripto',
      description: 'Calculadora de Sentimento Cripto gratuita. Agregue o índice Fear & Greed, volume social e taxas de funding em uma pontuação composta de sentimento.'
    },
    'defi-yield-aggregator': {
      title: 'Agregador de Rendimentos DeFi',
      description: 'Agregador de Rendimentos DeFi gratuito. Compare APY em tempo real em Aave, Compound, Lido e 50+ protocolos. Filtre por rede, ativo e TVL.'
    },
    'dust-attack-calculator': {
      title: 'Calculadora de Ataque Dust',
      description: 'Calculadora de Ataque Dust gratuita. Detecte transações minúsculas não solicitadas, estime custos de consolidação e proteja sua privacidade on-chain.'
    },
    'exchange-fee-comparator': {
      title: 'Comparador de Taxas de Exchange',
      description: 'Comparador de Taxas gratuito. Compare taxas de Binance, Coinbase, Kraken, OKX e Bybit em spot, futuros e saques lado a lado.'
    },
    'flash-loan-calculator': {
      title: 'Calculadora de Empréstimo Flash',
      description: 'Calculadora de Empréstimo Flash gratuita. Estime a rentabilidade incluindo taxas do protocolo, gas e spread de arbitragem para Aave, dYdX e Uniswap.'
    },
    'gas-optimization-calculator': {
      title: 'Calculadora de Otimização de Gas',
      description: 'Calculadora de Otimização de Gas gratuita. Encontre o horário mais barato para transacionar no Ethereum e L2s. Compare custos por hora e economize em taxas.'
    },
    'governance-voting-calculator': {
      title: 'Calculadora de Votação de Governança',
      description: 'Calculadora de Votação DAO gratuita. Estime poder de voto, requisitos de quórum e impacto de delegação para propostas de governança descentralizada.'
    },
    'nft-rarity-calculator': {
      title: 'Calculadora de Raridade NFT',
      description: 'Calculadora de Raridade NFT gratuita. Pontue a raridade dos atributos com métodos de raridade estatística, média de traços e conteúdo informacional.'
    },
    'token-unlock-calculator': {
      title: 'Calculadora de Desbloqueio de Tokens',
      description: 'Calculadora de Desbloqueio de Tokens gratuita. Acompanhe próximos desbloqueios, estime pressão de venda e visualize cronogramas de vesting de qualquer projeto.'
    },
    'whale-alert-calculator': {
      title: 'Calculadora de Alerta de Baleias',
      description: 'Calculadora de Alerta de Baleias gratuita. Estime o impacto de grandes transferências, calcule slippage de ordens massivas e configure limites de alerta.'
    },
    'arbitrage-calculator': {
      title: 'Calculadora de Arbitragem Cripto',
      description: 'Calcule o lucro de arbitragem entre exchanges após taxas e custos de saque.'
    },
    'stock-to-flow-calculator': {
      title: 'Calculadora Stock-to-Flow Bitcoin',
      description: 'Avalie a escassez do Bitcoin com o modelo S2F e compare o preço real com a previsão do modelo.'
    },
    'options-calculator': {
      title: 'Calculadora de Opções Cripto',
      description: 'Calcule P&L de opções, preço de equilíbrio e tabela de payoff para calls e puts cripto.'
    },
    'tax-loss-harvesting-calculator': {
      title: 'Calculadora de Colheita de Prejuízos Fiscais',
      description: 'Identifique prejuízos fiscais colhíveis em cripto para compensar ganhos de capital.'
    },
    'restaking-calculator': {
      title: 'Calculadora de Restaking',
      description: 'Estime o rendimento combinado de staking nativo mais protocolos de restaking como EigenLayer.'
    },
    'liquid-staking-calculator': {
      title: 'Calculadora de Staking Líquido',
      description: 'Compare protocolos de staking líquido — Lido, Rocket Pool, Coinbase, Frax — por rendimento e taxas.'
    },
    'perpetual-futures-calculator': {
      title: 'Calculadora de Futuros Perpétuos',
      description: 'Calcule P&L de futuros perpétuos com alavancagem, custos de funding e preço de liquidação.'
    },
    'payback-period-calculator': {
      title: 'Calculadora de Período de Retorno',
      description: 'Calcule quanto tempo levará para seu investimento em cripto se pagar com base nos retornos esperados.'
    },
    'dva-calculator': {
      title: 'Calculadora DVA',
      description: 'Compare Dollar Value Averaging vs DCA — DVA ajusta valores de investimento com base no desempenho do portfólio.'
    },
    'bitcoin-energy-calculator': {
      title: 'Calculadora de Energia Bitcoin',
      description: 'Estime o consumo de energia, pegada de carbono e custo ambiental da mineração de Bitcoin.'
    },
    'on-chain-metrics-calculator': {
      title: 'Calculadora de Métricas On-Chain',
      description: 'Analise a avaliação do Bitcoin com MVRV, NVT e SOPR — sinais on-chain de zonas de sobrecompra ou subvalorização.'
    },
    'grid-trading-calculator': {
      title: 'Calculadora de Grid Trading',
      description: 'Planeje sua estratégia de bot grid trading — calcule lucro por grid e retorno anual estimado.'
    },
    'inheritance-tax-calculator': {
      title: 'Calculadora de Imposto sobre Herança Cripto',
      description: 'Estime o imposto sobre herança em ativos cripto em 8 países com isenções por tipo de relação.'
    },
    'validator-calculator': {
      title: 'Calculadora de Economia do Validador',
      description: 'Calcule a rentabilidade do validador PoS — recompensas, custos operacionais, ROI para Ethereum, Solana e mais.'
    },
    'token-valuation-calculator': {
      title: 'Calculadora de Avaliação de Token',
      description: 'Analise FDV do token, capitalização de mercado, risco de diluição e compare com projetos estabelecidos.'
    },
    'if-i-had-bought': {
      title: 'Calculadora Se Eu Tivesse Comprado',
      description: 'Descubra quanto seu investimento valeria hoje se tivesse comprado Bitcoin, Ethereum ou outras cripto a preços históricos.'
    },
    'millionaire-calculator': {
      title: 'Calculadora Milionário Cripto',
      description: 'Planeje seu caminho para $1M — calcule quanto e por quanto tempo investir para alcançar sua meta.'
    },
    'pizza-day-calculator': {
      title: 'Calculadora do Dia da Pizza Bitcoin',
      description: 'Calcule o valor atual da famosa compra de 10.000 BTC por pizza e explore o custo de oportunidade.'
    },
    'retirement-calculator': {
      title: 'Calculadora de Aposentadoria Cripto / FIRE',
      description: 'Calcule quanto em cripto você precisa para se aposentar cedo. Número FIRE, crescimento do portfólio e anos até a independência financeira.'
    },
    'rainbow-chart-calculator': {
      title: 'Calculadora do Gráfico Arco-Íris do Bitcoin',
      description: 'Veja em qual zona o Bitcoin está no gráfico arco-íris logarítmico com 9 faixas de preço.'
    },
    'etf-fee-calculator': {
      title: 'Calculadora de Taxas de ETF Bitcoin',
      description: 'Compare as taxas de IBIT, FBTC, GBTC, ARKB, BITB e BTC direto. Veja como as taxas se acumulam ao longo de 1–30 anos.'
    },
    'token-burn-calculator': {
      title: 'Calculadora de Queima de Tokens',
      description: 'Analise a economia deflacionária de tokens — taxa de queima, redução de oferta e impacto na capitalização de mercado.'
    },
    'futures-basis-calculator': {
      title: 'Calculadora de Base de Futuros',
      description: 'Calcule o spread spot-futuros, base anualizada, rendimento cash-and-carry e lucro de arbitragem após taxas.'
    },
    'defi-insurance-calculator': {
      title: 'Calculadora de Seguro DeFi',
      description: 'Avalie se o seguro DeFi vale o prêmio. Compare cenários segurados vs não segurados, tamanho de hack de equilíbrio e impacto no rendimento.'
    },
    'mayer-multiple-calculator': {
      title: 'Calculadora do Múltiplo de Mayer',
      description: 'Calculadora do Múltiplo de Mayer: preço atual do BTC ÷ média móvel de 200 dias. Acima de 2,4 = zona de venda histórica; abaixo de 1,0 = zona de compra.'
    },
    'geometric-mean-return-calculator': {
      title: 'Calculadora de Média Geométrica de Retornos',
      description: 'Calcule o retorno composto verdadeiro vs média aritmética. Revela o "drag de volatilidade" em ativos voláteis como criptomoedas.'
    },
    'mstr-mnav-calculator': {
      title: 'Calculadora de Prêmio mNAV da MicroStrategy',
      description: 'Calcule o prêmio de empresas com tesouraria em Bitcoin (MSTR, MetaPlanet, Semler) sobre o NAV puro de BTC.'
    },
    'lightning-network-fee-calculator': {
      title: 'Calculadora de Taxas Lightning Network',
      description: 'Calcule taxas de roteamento Lightning Network: base + ppm por salto. Compare com taxas on-chain do Bitcoin.'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Calculadora de Curva Bonding do Pump.fun',
      description: 'Calculadora da curva bonding do Pump.fun: tokens recebidos por SOL investido, slippage e distância para os $69K para graduar para Raydium.'
    },
    'profit-factor-calculator': {
      title: 'Calculadora de Fator de Lucro',
      description: 'Calculadora de Profit Factor para sistemas de trading. Calcule a razão lucro bruto / perda bruta. Acima de 1,5 = vantagem sólida.'
    },
    'covered-call-calculator': {
      title: 'Calculadora de Call Coberta',
      description: 'Calculadora de Call Coberta para opções cripto. Calcule rendimento de prêmio, retorno anualizado, breakeven e risco de atribuição.'
    },
    'iron-condor-calculator': {
      title: 'Calculadora Iron Condor',
      description: 'Calculadora Iron Condor de 4 pernas. Calcule prêmio líquido, lucro máx, perda máx, breakevens e diagrama de payoff completo.'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'Calculadora de Arbitragem de Funding Perpétuo',
      description: 'Calculadora de arbitragem de funding rate: long spot + short perp = delta-neutral. Calcule APR, taxas e funding rate de equilíbrio.'
    },
    'concentrated-liquidity-calculator': {
      title: 'Calculadora de Liquidez Concentrada (Uniswap V3)',
      description: 'Calculadora de liquidez concentrada Uniswap V3: eficiência de capital, receita de taxas, IL nas bordas do range.'
    },
    'looping-yield-calculator': {
      title: 'Calculadora de Looping / Empréstimo Recursivo',
      description: 'Calculadora de looping DeFi: borrow → re-deposit recursivo para amplificar rendimento. Calcule alavancagem efetiva, APR líquido e distância para liquidação.'
    },
  },
  'tr': {
    'converter': {
      title: 'Kripto Para Dönüştürücü',
      description: 'Ücretsiz Kripto Para Dönüştürücü. Bitcoin, Ethereum ve 500+ kripto parayı USD, EUR ve 10+ fiat para birimine gerçek zamanlı CoinGecko fiyatlarıyla dönüştürün.'
    },
    'profit-calculator': {
      title: 'Kripto Kar Hesaplayıcı',
      description: 'Ücretsiz Kripto Kar Hesaplayıcı. Alış ve satış fiyatlarını girerek 500+ kripto para için ROI, toplam komisyon ve net karı anında görün.'
    },
    'mining-calculator': {
      title: 'Bitcoin Madencilik Hesaplayıcı',
      description: 'Ücretsiz Bitcoin Madencilik Hesaplayıcı. Hashrate, güç tüketimi ve elektrik maliyetini girerek günlük, aylık ve yıllık BTC madencilik gelirini tahmin edin.'
    },
    'dca-calculator': {
      title: 'DCA Hesaplayıcı',
      description: 'Ücretsiz DCA Hesaplayıcı. Bitcoin, Ethereum ve 500+ kripto için düzenli yatırım stratejilerini geçmiş verilerle simüle edin ve karşılaştırın.'
    },
    'tax-calculator': {
      title: 'Kripto Vergi Hesaplayıcı',
      description: 'Ücretsiz Kripto Vergi Hesaplayıcı. 17 ülke için sermaye kazancı vergisini tahmin edin, kısa ve uzun vadeli oranları karşılaştırın.'
    },
    'what-if': {
      title: 'Ya Öyle Olsaydı Hesaplayıcı',
      description: 'Ücretsiz Ya Öyle Olsaydı Hesaplayıcı. Varsayımsal kripto girişlerini simüle edin, fırsat maliyetini değerlendirin ve alternatif sonuçları karşılaştırın.'
    },
    'position-size-calculator': {
      title: 'Pozisyon Boyutu Hesaplayıcı',
      description: 'Ücretsiz Pozisyon Boyutu Hesaplayıcı. Bakiye, risk toleransı ve stop-loss seviyesine göre optimal işlem boyutunu belirleyin. 125x kaldıraca kadar destek.'
    },
    'liquidation-calculator': {
      title: 'Likidasyon Hesaplayıcı',
      description: 'Ücretsiz Likidasyon Fiyatı Hesaplayıcı. Binance, Bybit, OKX ile İzole ve Çapraz marjin modlarında pozisyonunuzun ne zaman likide edileceğini öğrenin.'
    },
    'funding-rate-calculator': {
      title: 'Fonlama Oranı Hesaplayıcı',
      description: 'Ücretsiz Fonlama Oranı Hesaplayıcı. Kaldıraçlı pozisyon tutmanın günlük, haftalık, aylık ve yıllık maliyetini hesaplayın.'
    },
    'tp-sl-calculator': {
      title: 'TP / SL Hesaplayıcı',
      description: 'Ücretsiz TP/SL Hesaplayıcı. R:R oranı, kısmi TP seviyeleri ve görsel fiyat ölçeği ile optimal kar alma ve zarar durdurma seviyelerini belirleyin.'
    },
    'margin-calculator': {
      title: 'Marjin Hesaplayıcı',
      description: 'Ücretsiz Marjin Hesaplayıcı. Binance, Bybit ve OKX için gerekli marjin, marjin seviyesi, serbest marjin ve margin call fiyatını hesaplayın.'
    },
    'pip-calculator': {
      title: 'Pip / Tick Değeri Hesaplayıcı',
      description: 'Ücretsiz Pip/Tick Değeri Hesaplayıcı. BTC, ETH, SOL ve 500+ coin için herhangi bir pozisyon boyutundaki fiyat hareketinin dolar değerini hesaplayın.'
    },
    'break-even-calculator': {
      title: 'Başa Baş Hesaplayıcı',
      description: 'Ücretsiz Başa Baş Hesaplayıcı. Bir kayıptan kurtulmak için gereken kazancı öğrenin veya işlem komisyonlarınızı karşılayan çıkış fiyatını hesaplayın.'
    },
    'risk-reward-calculator': {
      title: 'Risk / Ödül Hesaplayıcı',
      description: 'Ücretsiz Risk/Ödül Oranı Hesaplayıcı. R:R oranını, gereken kazanma oranını hesaplayın ve herhangi bir kurulum için 100 işlem simülasyonu yapın.'
    },
    'staking-calculator': {
      title: 'Kripto Staking Hesaplayıcı',
      description: 'Ücretsiz Kripto Staking Hesaplayıcı. Validatör komisyonu ve token fiyat projeksiyonları sonrası günlük, haftalık ve yıllık staking ödüllerini hesaplayın.'
    },
    'impermanent-loss-calculator': {
      title: 'Geçici Kayıp Hesaplayıcı',
      description: 'Ücretsiz Geçici Kayıp Hesaplayıcı. AMM likidite havuzları için IL hesaplayın, LP getirilerini HODL ile karşılaştırın ve komisyon gelirini değerlendirin.'
    },
    'apy-apr-calculator': {
      title: 'APY ve APR Hesaplayıcı',
      description: 'Ücretsiz APY ve APR Hesaplayıcı. APR ve APY arasında dönüştürme yapın, bileşik faiz sıklıklarını karşılaştırın ve DeFi ile staking kazançlarınızı hesaplayın.'
    },
    'yield-farming-calculator': {
      title: 'Getiri Çiftçiliği Hesaplayıcı',
      description: 'Ücretsiz Getiri Çiftçiliği Hesaplayıcı. Gas maliyetleri, geçici kayıp ve hasat sıklığını dahil ederek gerçek DeFi farming APY ve net karınızı hesaplayın.'
    },
    'gas-calculator': {
      title: 'Kripto Gas Hesaplayıcı',
      description: 'Ücretsiz Kripto Gas Hesaplayıcı. Swap, transfer ve DeFi işlemleri için ana EVM ağlarındaki gas maliyetlerini işlem onaylamadan önce tahmin edin.'
    },
    'uniswap-calculator': {
      title: 'Uniswap Ücret Hesaplayıcı',
      description: 'Ücretsiz Uniswap Ücret Hesaplayıcı. LP komisyon gelirini, geçici kayıp etkisini, başa baş süresini ve havuz net sonucunu tahmin edin.'
    },
    'bridge-comparator': {
      title: 'Köprü Maliyet Karşılaştırıcı',
      description: 'Ücretsiz Köprü Maliyet Karşılaştırıcı. Kripto köprü rotalarını tahmini ücret, hız ve güvenlik puanına göre L2 ve multichain köprülerde karşılaştırın.'
    },
    'lending-calculator': {
      title: 'Kripto Borç Verme Hesaplayıcı',
      description: 'Ücretsiz Kripto Borç Verme Hesaplayıcı. APY, bileşik faiz modeli, vade ve platform komisyonlarını kullanarak öngörülen lending getirilerini hesaplayın.'
    },
    'gpu-mining-calculator': {
      title: 'GPU Madencilik Hesaplayıcı',
      description: 'Ücretsiz GPU Madencilik Hesaplayıcı. Hashrate, güç tüketimi, elektrik tarifeleri ve havuz komisyonlarıyla GPU madencilik karlılığını tahmin edin.'
    },
    'asic-mining-calculator': {
      title: 'ASIC Madencilik Hesaplayıcı',
      description: 'Ücretsiz ASIC Madencilik Hesaplayıcı. Önde gelen donanım modelleri için ASIC madencilik karlılığını, elektrik maliyetini ve geri ödeme süresini hesaplayın.'
    },
    'mining-roi-calculator': {
      title: 'Madencilik ROI Hesaplayıcı',
      description: 'Ücretsiz Madencilik ROI Hesaplayıcı. Gelir, maliyet ve başa baş zamanlaması için senaryo analiziyle madencilik donanımı yatırım getirisini modelleyin.'
    },
    'electricity-cost-calculator': {
      title: 'Madencilik Elektrik Maliyeti Hesaplayıcı',
      description: 'Ücretsiz Madencilik Elektrik Maliyeti Hesaplayıcı. Cihaz sayısı, güç kullanımı, çalışma süresi ve yerel enerji fiyatına göre maliyeti hesaplayın.'
    },
    'difficulty-calculator': {
      title: 'Madencilik Zorluk Tahmincisi',
      description: 'Ücretsiz Madencilik Zorluk Tahmincisi. Bir sonraki zorluk ayarlamasının öngörülen madencilik gelirinizi ve karlılığınızı nasıl etkileyebileceğini tahmin edin.'
    },
    'hashrate-converter': {
      title: 'Hashrate Dönüştürücü',
      description: 'Ücretsiz Hashrate Dönüştürücü. H/s ile EH/s arasında madencilik hashrate birimlerini dönüştürün ve ASIC ile GPU donanımları için tipik aralıkları karşılaştırın.'
    },
    'market-cap-calculator': {
      title: 'Piyasa Değeri Hesaplayıcı',
      description: 'Ücretsiz Piyasa Değeri Hesaplayıcı. Piyasa değeri ve arzdan token fiyatını veya token fiyatından piyasa değerini canlı kripto verileriyle hesaplayın.'
    },
    'market-cap-comparator': {
      title: 'Piyasa Değeri Karşılaştırıcı',
      description: 'Ücretsiz Piyasa Değeri Karşılaştırıcı. Herhangi bir kripto parayı en büyük coinlerle karşılaştırın. Varsayımsal fiyatları ve büyüme çarpanlarını hesaplayın.'
    },
    'roi-calculator': {
      title: 'ROI Hesaplayıcı',
      description: 'Ücretsiz Kripto ROI Hesaplayıcı. Toplam ve yıllık ROI hesaplayın, performansı S&P 500, Altın ve Gayrimenkul ile karşılaştırın.'
    },
    'reverse-roi': {
      title: 'Ters ROI Hesaplayıcı',
      description: 'Ücretsiz Ters ROI Hesaplayıcı. Yatırım ve hedef karı girerek gereken token fiyatını bulun. Büyüme çarpanı ve kilometre taşı tablosu dahil.'
    },
    'hodl-vs-trade': {
      title: 'HODL vs Trade Hesaplayıcı',
      description: 'Ücretsiz HODL vs Trade Simülatörü. Uzun vadeli tutma ile aktif ticareti karşılaştırın. Özel kazanma oranları, kar hedefleri ve komisyonlarla işlem simüle edin.'
    },
    'rebalancing-calculator': {
      title: 'Portföy Yeniden Dengeleme Hesaplayıcı',
      description: 'Ücretsiz Portföy Yeniden Dengeleme Hesaplayıcı. Kripto portföyünüzü hedef dağılımlara göre yeniden dengelemek için alım/satım eylemlerini hesaplayın.'
    },
    'compound-calculator': {
      title: 'Bileşik Faiz Hesaplayıcı (Kripto)',
      description: 'Ücretsiz Bileşik Faiz Hesaplayıcı. Staking, getiri çiftçiliği ve tasarruflar için düzenli katkılarla bileşik büyümeyi öngörün.'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI Hesaplayıcı',
      description: 'Ücretsiz ICO/IDO ROI Hesaplayıcı. Token miktarı, giriş fiyatı ve piyasa fiyatlarını kullanarak ICO veya IDO tahsisatları için güncel ve ATH ROI hesaplayın.'
    },
    'airdrop-calculator': {
      title: 'Airdrop Değer Hesaplayıcı',
      description: 'Ücretsiz Airdrop Değer Hesaplayıcı. Alınan kripto airdroplarının değerini hesaplayın, vergi yükümlülüğünü tahmin edin ve kar/zararı takip edin.'
    },
    'satoshi-converter': {
      title: 'Satoshi Dönüştürücü',
      description: 'Ücretsiz Satoshi Dönüştürücü. Bitcoin, Satoshi ve USD/EUR arasında anında dönüştürme yapın. Dolar başına sats, hızlı referans tabloları ve canlı BTC fiyatı.'
    },
    'gwei-converter': {
      title: 'Gwei Dönüştürücü',
      description: 'Ücretsiz Gwei Dönüştürücü. Wei, Gwei ve Ether birimlerini canlı ETH fiyatı ve Ethereum işlemleri için pratik gas maliyeti örnekleriyle anında dönüştürün.'
    },
    'timestamp-converter': {
      title: 'Unix Zaman Damgası Dönüştürücü',
      description: 'Ücretsiz Unix Zaman Damgası Dönüştürücü. Unix timestamp ile tarih/saat arasında UTC/yerel gösterimle ve blok süresi tahminleriyle dönüştürme yapın.'
    },
    'unit-converter': {
      title: 'Kripto Birim Dönüştürücü',
      description: 'Ücretsiz Kripto Birim Dönüştürücü. BTC, ETH, SOL ve USDT için satoshi, gwei, lamport ve mikro birimler dahil birim dönüştürmeleri yapın.'
    },
    'exchange-fees': {
      title: 'Borsa Ücret Karşılaştırıcı',
      description: 'Ücretsiz Borsa Ücret Karşılaştırıcı. Binance, Bybit, OKX, Coinbase, Kraken ve daha fazlasında maker/taker ücret dağılımıyla işlem komisyonlarını karşılaştırın.'
    },
    'crypto-loan-calculator': {
      title: 'Kripto Kredi Hesaplayıcı',
      description: 'Ücretsiz Kripto Kredi Hesaplayıcı. DeFi ve CeFi kredileri için kredi tutarını, faiz maliyetlerini, margin call eşiğini ve likidasyon riskini tahmin edin.'
    },
    'vesting-calculator': {
      title: 'Token Hak Ediş Hesaplayıcı',
      description: 'Ücretsiz Token Hak Ediş Hesaplayıcı. Cliff dönemleri, TGE kilidi açılışları ve aylık veya üç aylık vesting ile kilit açma takvimlerini görselleştirin.'
    },
    'nft-profit-calculator': {
      title: 'NFT Kar Hesaplayıcı',
      description: 'Ücretsiz NFT Kar Hesaplayıcı. Pazar yeri komisyonları, yaratıcı telif hakları ve gas maliyetleri sonrası gerçek NFT işlem karını hesaplayın.'
    },
    'halving-calculator': {
      title: 'Bitcoin Halving Hesaplayıcı',
      description: 'Ücretsiz Bitcoin Halving Hesaplayıcı. Canlı geri sayım ile sonraki BTC halving madencilik gelirini nasıl etkiler, geçmiş veriler ve fiyat analiziyle görün.'
    },
    'mev-calculator': {
      title: 'MEV Koruma Hesaplayıcı',
      description: 'Ücretsiz MEV Koruma Hesaplayıcı. Swap boyutu ve slippage bazında sandwich ve frontrun riskini, MEV korumalı rotaların potansiyel tasarruflarını tahmin edin.'
    },
    'gamefi-calculator': {
      title: 'GameFi ROI Hesaplayıcı',
      description: 'Ücretsiz GameFi ROI Hesaplayıcı. Kurulum maliyeti ve token ödüllerine dayalı play-to-earn stratejileri için geri ödeme süresi ve yıllık ROI tahmin edin.'
    },
    'node-calculator': {
      title: 'Doğrulayıcı Düğüm Hesaplayıcı',
      description: 'Ücretsiz Doğrulayıcı Düğüm Hesaplayıcı. Stake miktarı, APR, komisyon, çalışma süresi ve altyapı maliyetlerini kullanarak validatör düğüm ekonomisini modelleyin.'
    },
    'salary-calculator': {
      title: 'Kripto Maaş Hesaplayıcı',
      description: 'Ücretsiz Kripto Maaş Hesaplayıcı. Fiat maaşınızı BTC, ETH veya USDT olarak dönüştürün. Ödeme sıklığı ve komisyonlarla kripto birikimini hesaplayın.'
    },
    'inflation-hedge': {
      title: 'Enflasyon Koruması Hesaplayıcı',
      description: 'Ücretsiz Enflasyon Koruması Hesaplayıcı. Kripto, stablecoin, altın ve S&P 500 performansını Türkiye, Arjantin, ABD ve daha fazlasında karşılaştırın.'
    },
    'calmar-calculator': {
      title: 'Calmar Oranı Hesaplayıcı',
      description: 'Yıllık getiri ve maksimum düşüşten Calmar oranını hesaplayarak düşüş riskine göre getiri verimliliğini karşılaştırın.'
    },
    'compound-interest-calculator': {
      title: 'Kripto Bileşik Faiz Hesaplayıcı',
      description: 'Staking ve yield farming için ücretsiz bileşik faiz hesaplayıcı. Günlük, haftalık veya aylık bileşik faizin yatırımınızı nasıl büyüttüğünü görün.'
    },
    'drawdown-calculator': {
      title: 'Drawdown Toparlanma Hesaplayıcı',
      description: 'Portföy düşüşünü, gerekli toparlanma kazancını ve beklenen aylık getiriye göre tahmini toparlanma süresini ölçün.'
    },
    'gas-fee-calculator': {
      title: 'Gas Ücreti Hesaplayıcı',
      description: 'Ethereum, Polygon, Arbitrum, Optimism, BNB Chain ve daha fazlası için ücretsiz gas hesaplayıcı. Swap, transfer ve minting işlem maliyetlerini tahmin edin.'
    },
    'information-ratio-calculator': {
      title: 'Bilgi Oranı Hesaplayıcı',
      description: 'Aktif getiri ve takip hatası kullanarak aktif portföy performansını benchmark ile karşılaştırın.'
    },
    'kelly-calculator': {
      title: 'Kelly Kriteri Hesaplayıcı',
      description: 'Kazanma oranı ve ödeme oranından Kelly, yarım-Kelly ve çeyrek-Kelly modelleriyle optimal pozisyon boyutunu bulun.'
    },
    'leverage-calculator': {
      title: 'Kaldıraç Hesaplayıcı',
      description: 'Kripto için ücretsiz kaldıraç hesaplayıcı. Kaldıracın kazanç ve kayıpları nasıl büyüttüğünü, likidasyon mesafesini ve PnL tablosunu görün.'
    },
    'loan-calculator': {
      title: 'Kripto Kredi Geri Ödeme Hesaplayıcı',
      description: 'Ücretsiz kripto kredi geri ödeme hesaplayıcı. Amortisman planları oluşturun, aylık ödemeleri hesaplayın ve anapara ile faizi takip edin.'
    },
    'portfolio-calculator': {
      title: 'Portföy Dağılım Hesaplayıcı',
      description: 'Ücretsiz portföy dağılım hesaplayıcı. Varlık ağırlıklarını görselleştirin, hedef dağılımları belirleyin ve kripto portföyünüz için dengeleme önerileri alın.'
    },
    'risk-of-ruin-calculator': {
      title: 'İflas Riski Hesaplayıcı',
      description: 'Kazanma oranı, ödül/risk profili ve işlem başına sabit riskten hesap iflas olasılığını tahmin edin.'
    },
    'sharpe-calculator': {
      title: 'Sharpe Oranı Hesaplayıcı',
      description: 'Beklenen getiri, volatilite ve risksiz faiz oranı kullanarak riske göre düzeltilmiş portföy performansını değerlendirin.'
    },
    'slippage-calculator': {
      title: 'DEX Slippage Hesaplayıcı',
      description: 'DEX işlemleri için swap slippage, minimum alınan miktar ve toplam uygulama maliyetini tahmin edin.'
    },
    'sortino-calculator': {
      title: 'Sortino Oranı Hesaplayıcı',
      description: 'Sortino oranını kullanarak aşağı yönlü volatiliteye odaklanarak riske göre düzeltilmiş portföy performansını ölçün.'
    },
    'staking-rewards-calculator': {
      title: 'Staking Ödül Hesaplayıcı',
      description: 'Ücretsiz staking hesaplayıcı. Ethereum, Solana, Polkadot, Cosmos ve diğer PoS coinleri için günlük, haftalık ve aylık kazançları tahmin edin.'
    },
    'trade-expectancy-calculator': {
      title: 'İşlem Beklentisi Hesaplayıcı',
      description: 'İşlem başına strateji avantajını tahmin edin ve kazanma oranı, R-katları ve işlem başına riskle aylık sonuçları yansıtın.'
    },
    'treynor-calculator': {
      title: 'Treynor Oranı Hesaplayıcı',
      description: 'Piyasa riski (beta) birimi başına getiriyi ölçün ve strateji verimliliğini risksiz faiz oranına göre değerlendirin.'
    },
    'var-calculator': {
      title: 'Riske Maruz Değer (VaR) Hesaplayıcı',
      description: 'Parametrik VaR ve beklenen kayıp (CVaR) ile birden fazla güven düzeyinde portföy aşağı yönlü riskini tahmin edin.'
    },
    'bitcoin-unit-converter': {
      title: 'Bitcoin Birim Dönüştürücü',
      description: 'Ücretsiz Bitcoin Birim Dönüştürücü. BTC, mBTC, bits ve satoshi arasında anında dönüşüm yapın. Canlı USD değeri ve hızlı referans tablosu içerir.'
    },
    'cross-chain-bridge-calculator': {
      title: 'Cross-Chain Köprü Hesaplayıcı',
      description: 'Ücretsiz Cross-Chain Köprü Hesaplayıcı. Ethereum, Arbitrum, Solana ve 20+ zincir arasında token transferi için köprü ücreti, süre ve slippage tahmin edin.'
    },
    'crypto-correlation-calculator': {
      title: 'Kripto Korelasyon Hesaplayıcı',
      description: 'Ücretsiz Kripto Korelasyon Hesaplayıcı. İki kripto para arasındaki fiyat korelasyonunu ölçün ve daha düşük riskli çeşitlendirilmiş portföy oluşturun.'
    },
    'crypto-index-fund-calculator': {
      title: 'Kripto Endeks Fon Hesaplayıcı',
      description: 'Ücretsiz Kripto Endeks Fon Hesaplayıcı. Piyasa değeri veya eşit ağırlıklı özel kripto endeksi oluşturun ve performansı BTC ile karşılaştırın.'
    },
    'crypto-inheritance-calculator': {
      title: 'Kripto Miras Hesaplayıcı',
      description: 'Ücretsiz Kripto Miras Hesaplayıcı. Dijital varlık devir planlaması yapın: çoklu imza maliyetleri, veraset vergisi tahmini ve mirasçı dağılımı modelleme.'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'Kripto Portföy Dengeleme Hesaplayıcı',
      description: 'Ücretsiz Kripto Portföy Dengeleme Hesaplayıcı. Mevcut varlıklarınızı ve hedef ağırlıkları girerek gereken alım-satım miktarlarını hesaplayın.'
    },
    'crypto-sentiment-calculator': {
      title: 'Kripto Duygu Analizi Hesaplayıcı',
      description: 'Ücretsiz Kripto Duygu Analizi Hesaplayıcı. Fear & Greed endeksi, sosyal hacim ve fonlama oranlarını tek bir bileşik skor olarak birleştirin.'
    },
    'defi-yield-aggregator': {
      title: 'DeFi Getiri Toplayıcı',
      description: 'Ücretsiz DeFi Getiri Toplayıcı. Aave, Compound, Lido ve 50+ protokolde gerçek zamanlı APY karşılaştırın. Zincir, varlık ve TVL ile filtreleyin.'
    },
    'dust-attack-calculator': {
      title: 'Dust Saldırı Hesaplayıcı',
      description: 'Ücretsiz Dust Saldırı Hesaplayıcı. Cüzdanınızdaki küçük istenmeyen işlemleri tespit edin, birleştirme maliyetini hesaplayın ve gizliliğinizi koruyun.'
    },
    'exchange-fee-comparator': {
      title: 'Borsa Ücret Karşılaştırma Hesaplayıcı',
      description: 'Ücretsiz Borsa Ücret Karşılaştırma. Binance, Coinbase, Kraken, OKX ve Bybit ücretlerini spot, vadeli ve çekim bazında yan yana karşılaştırın.'
    },
    'flash-loan-calculator': {
      title: 'Flash Kredi Hesaplayıcı',
      description: 'Ücretsiz Flash Kredi Hesaplayıcı. Aave, dYdX ve Uniswap için protokol ücreti, gas maliyeti ve arbitraj spread dahil kârlılığı hesaplayın.'
    },
    'gas-optimization-calculator': {
      title: 'Gas Optimizasyon Hesaplayıcı',
      description: 'Ücretsiz Gas Optimizasyon Hesaplayıcı. Ethereum ve L2lerde en ucuz işlem saatini bulun. Saatlik gas maliyetlerini karşılaştırın ve ücretlerden tasarruf edin.'
    },
    'governance-voting-calculator': {
      title: 'Yönetişim Oylama Hesaplayıcı',
      description: 'Ücretsiz Yönetişim Oylama Hesaplayıcı. DAO teklifleri için oy gücü, yeter sayı gereksinimleri ve delegasyon etkisini tahmin edin.'
    },
    'nft-rarity-calculator': {
      title: 'NFT Nadirlik Hesaplayıcı',
      description: 'Ücretsiz NFT Nadirlik Hesaplayıcı. İstatistiksel nadirlik, ortalama özellik ve bilgi içeriği yöntemleriyle koleksiyon nadirliğini puanlayın.'
    },
    'token-unlock-calculator': {
      title: 'Token Kilit Açma Hesaplayıcı',
      description: 'Ücretsiz Token Kilit Açma Hesaplayıcı. Yaklaşan token açılışlarını takip edin, satış baskısını tahmin edin ve vesting takvimlerini görselleştirin.'
    },
    'whale-alert-calculator': {
      title: 'Balina Uyarı Hesaplayıcı',
      description: 'Ücretsiz Balina Uyarı Hesaplayıcı. Büyük transferlerin piyasa etkisini tahmin edin, balina slippage hesaplayın ve uyarı eşikleri belirleyin.'
    },
    'arbitrage-calculator': {
      title: 'Kripto Arbitraj Hesaplayıcı',
      description: 'Borsalar arası arbitraj kârını komisyonlar ve çekim ücretleri sonrasında hesaplayın.'
    },
    'stock-to-flow-calculator': {
      title: 'Bitcoin Stock-to-Flow Hesaplayıcı',
      description: 'S2F modeli ile Bitcoin kıtlığını değerlendirin ve gerçek fiyatı model tahminiyle karşılaştırın.'
    },
    'options-calculator': {
      title: 'Kripto Opsiyon Hesaplayıcı',
      description: 'Kripto call ve put opsiyonları için K/Z, başabaş fiyatı ve ödeme tablosu hesaplayın.'
    },
    'tax-loss-harvesting-calculator': {
      title: 'Vergi Zarar Hasatlama Hesaplayıcı',
      description: 'Sermaye kazançlarını dengelemek için hasat edilebilir kripto zararlarını belirleyin.'
    },
    'restaking-calculator': {
      title: 'Restaking Hesaplayıcı',
      description: 'EigenLayer gibi restaking protokolleriyle birleşik getiriyi hesaplayın.'
    },
    'liquid-staking-calculator': {
      title: 'Likit Staking Hesaplayıcı',
      description: 'Lido, Rocket Pool, Coinbase, Frax protokollerini getiri ve ücretlere göre karşılaştırın.'
    },
    'perpetual-futures-calculator': {
      title: 'Sürekli Vadeli İşlem Hesaplayıcı',
      description: 'Kaldıraç, fonlama maliyetleri ve likidasyon fiyatıyla vadeli işlem K/Z hesaplayın.'
    },
    'payback-period-calculator': {
      title: 'Geri Ödeme Süresi Hesaplayıcı',
      description: 'Beklenen getirilere göre kripto yatırımınızın kendini ne kadar sürede amorti edeceğini hesaplayın.'
    },
    'dva-calculator': {
      title: 'DVA Hesaplayıcı',
      description: 'Dollar Value Averaging ile DCA karşılaştırması — DVA portföy performansına göre yatırım miktarını ayarlar.'
    },
    'bitcoin-energy-calculator': {
      title: 'Bitcoin Enerji Hesaplayıcı',
      description: 'Bitcoin madenciliğinin enerji tüketimini, karbon ayak izini ve çevresel maliyetini hesaplayın.'
    },
    'on-chain-metrics-calculator': {
      title: 'On-Chain Metrik Hesaplayıcı',
      description: 'MVRV, NVT ve SOPR ile Bitcoin değerlemesini analiz edin — aşırı alım veya düşük değerleme bölgeleri.'
    },
    'grid-trading-calculator': {
      title: 'Grid Trading Hesaplayıcı',
      description: 'Grid trading bot stratejinizi planlayın — grid başına kâr ve tahmini yıllık getiriyi hesaplayın.'
    },
    'inheritance-tax-calculator': {
      title: 'Kripto Miras Vergisi Hesaplayıcı',
      description: '8 ülkede ilişki türüne göre muafiyetlerle kripto varlıklar üzerindeki miras vergisini hesaplayın.'
    },
    'validator-calculator': {
      title: 'Validatör Ekonomisi Hesaplayıcı',
      description: 'PoS validatör kârlılığını hesaplayın — ödüller, işletme maliyetleri, ROI — Ethereum, Solana ve daha fazlası.'
    },
    'token-valuation-calculator': {
      title: 'Token Değerleme Hesaplayıcı',
      description: 'Token FDV, piyasa değeri, dilüsyon riski analizi ve yerleşik projelerle karşılaştırma.'
    },
    'if-i-had-bought': {
      title: 'Eğer Alsaydım Hesaplayıcı',
      description: 'Bitcoin, Ethereum veya diğer kriptoları tarihi fiyatlardan alsaydınız bugün ne kadar değerli olacağını öğrenin.'
    },
    'millionaire-calculator': {
      title: 'Kripto Milyoner Hesaplayıcı',
      description: 'Hedefinize ulaşmak için ne kadar süre ve ne kadar yatırım yapmanız gerektiğini hesaplayın.'
    },
    'pizza-day-calculator': {
      title: 'Bitcoin Pizza Günü Hesaplayıcı',
      description: 'Ünlü 10.000 BTC pizza alışverişinin güncel değerini hesaplayın ve fırsat maliyetini keşfedin.'
    },
    'retirement-calculator': {
      title: 'Kripto Emeklilik / FIRE Hesaplayıcı',
      description: 'Erken emeklilik için ne kadar kripto gerektiğini hesaplayın. FIRE numarası, portföy büyümesi ve finansal bağımsızlığa kadar yıllar.'
    },
    'rainbow-chart-calculator': {
      title: 'Bitcoin Gökkuşağı Grafiği Hesaplayıcı',
      description: "Bitcoin'in 9 fiyat bandıyla logaritmik gökkuşağı grafiğinde nerede olduğunu görün."
    },
    'etf-fee-calculator': {
      title: 'Bitcoin ETF Ücret Hesaplayıcı',
      description: "IBIT, FBTC, GBTC, ARKB, BITB ve doğrudan BTC'nin ücretlerini karşılaştırın. Ücretlerin 1–30 yıl boyunca etkisini görün."
    },
    'token-burn-calculator': {
      title: 'Token Yakma Oranı Hesaplayıcı',
      description: 'Deflasyonist token ekonomisini analiz edin — yakma oranı, arz azaltma zaman çizelgesi ve piyasa değerine etkisi.'
    },
    'futures-basis-calculator': {
      title: 'Vadeli İşlem Baz Hesaplayıcı',
      description: 'Spot-vadeli işlem spreadini, yıllık bazı, cash-and-carry getirisini ve komisyon sonrası arbitraj kârını hesaplayın.'
    },
    'defi-insurance-calculator': {
      title: 'DeFi Sigorta Hesaplayıcı',
      description: 'DeFi sigortasının prim maliyetine değip değmediğini tahmin edin. Sigortalı ve sigortasız senaryoları, denge hack boyutunu karşılaştırın.'
    },
    'mayer-multiple-calculator': {
      title: 'Mayer Çarpanı Hesaplayıcı',
      description: 'Mayer Çarpanı: BTC güncel fiyatı ÷ 200 günlük hareketli ortalama. 2,4 üzeri = tarihsel satış bölgesi; 1,0 altı = düşük değerli alım bölgesi.'
    },
    'geometric-mean-return-calculator': {
      title: 'Geometrik Ortalama Getiri Hesaplayıcı',
      description: 'Aritmetik ortalamaya karşı gerçek bileşik getiriyi hesaplar. Volatil varlıklarda "volatilite sürtünmesini" ortaya koyar.'
    },
    'mstr-mnav-calculator': {
      title: 'MicroStrategy mNAV Primi Hesaplayıcı',
      description: 'Bitcoin hazine şirketlerinin (MSTR, MetaPlanet, Semler) saf BTC NAV üzerindeki primini hesaplar. Aşırı değerlemeyi tespit eder.'
    },
    'lightning-network-fee-calculator': {
      title: 'Lightning Network Ücret Hesaplayıcı',
      description: 'Lightning Network yönlendirme ücretlerini hesaplar: hop başına temel + ppm. Bitcoin on-chain ücretleriyle karşılaştırma.'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Pump.fun Bonding Eğrisi Hesaplayıcı',
      description: 'Pump.fun bonding eğrisi: yatırılan SOL başına alınan token, slippage ve Raydium\'a geçiş için $69K\'ya kalan mesafe.'
    },
    'profit-factor-calculator': {
      title: 'Kâr Faktörü Hesaplayıcı',
      description: 'Trading sistemleri için Profit Factor hesaplayıcı. Brüt kâr / brüt zarar oranı. 1,5 üzeri = sağlam avantaj.'
    },
    'covered-call-calculator': {
      title: 'Kapalı Call Hesaplayıcı',
      description: 'Kripto opsiyonları için Kapalı Call hesaplayıcı. Prim getirisi, yıllık getiri, başabaş ve atama riskini hesaplar.'
    },
    'iron-condor-calculator': {
      title: 'Iron Condor Hesaplayıcı',
      description: '4 bacaklı Iron Condor opsiyon stratejisi hesaplayıcı. Net prim, maks kâr, maks zarar, başabaş noktaları ve tam payoff diyagramı.'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'Perpetual Funding Arbitraj Hesaplayıcı',
      description: 'Funding rate arbitrajı: long spot + short perp = delta-nötr. APR, ücretler ve başabaş funding rate hesaplar.'
    },
    'concentrated-liquidity-calculator': {
      title: 'Yoğun Likidite (Uniswap V3) Hesaplayıcı',
      description: 'Uniswap V3 yoğun likidite hesaplayıcı: sermaye verimliliği, ücret geliri, range kenarlarında IL.'
    },
    'looping-yield-calculator': {
      title: 'Looping / Yinelemeli Borç Verme Hesaplayıcı',
      description: 'DeFi looping hesaplayıcı: yinelemeli borrow → re-deposit ile getiri amplifikasyonu. Etkin kaldıraç, net APR ve likidasyon mesafesi.'
    },
  },
  'hi': {
    'converter': {
      title: 'क्रिप्टो कनवर्टर',
      description: 'मुफ्त क्रिप्टो कनवर्टर। Bitcoin, Ethereum और 500+ क्रिप्टो को USD, EUR और 10+ फिएट मुद्राओं में रियल-टाइम CoinGecko कीमतों के साथ कन्वर्ट करें।'
    },
    'profit-calculator': {
      title: 'क्रिप्टो प्रॉफिट कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो प्रॉफिट कैलकुलेटर। 500+ क्रिप्टोकरेंसी के लिए ROI, कुल शुल्क और शुद्ध लाभ देखने के लिए खरीद और बिक्री मूल्य दर्ज करें।'
    },
    'mining-calculator': {
      title: 'बिटकॉइन माइनिंग कैलकुलेटर',
      description: 'मुफ्त बिटकॉइन माइनिंग कैलकुलेटर। दैनिक, मासिक और वार्षिक BTC माइनिंग आय का अनुमान लगाने के लिए हैशरेट, बिजली खपत और लागत दर्ज करें।'
    },
    'dca-calculator': {
      title: 'DCA कैलकुलेटर',
      description: 'मुफ्त DCA कैलकुलेटर। Bitcoin, Ethereum और 500+ क्रिप्टो के लिए ऐतिहासिक डेटा के साथ नियमित निवेश रणनीतियों का अनुकरण करें, DCA बनाम एकमुश्त निवेश की तुलना करें।'
    },
    'tax-calculator': {
      title: 'क्रिप्टो टैक्स कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो टैक्स कैलकुलेटर। 17 देशों के लिए पूंजीगत लाभ कर का अनुमान लगाएं, भारत, अमेरिका, जर्मनी और अन्य देशों की दरों की तुलना करें।'
    },
    'what-if': {
      title: 'व्हाट इफ कैलकुलेटर',
      description: 'मुफ्त व्हाट इफ कैलकुलेटर। काल्पनिक क्रिप्टो प्रवेशों का अनुकरण करें, अवसर लागत का मूल्यांकन करें और वैकल्पिक निवेश परिणामों की तुलना करें।'
    },
    'position-size-calculator': {
      title: 'पोज़िशन साइज़ कैलकुलेटर',
      description: 'मुफ्त पोज़िशन साइज़ कैलकुलेटर। खाता बैलेंस, जोखिम सहनशीलता और स्टॉप-लॉस के आधार पर इष्टतम ट्रेड आकार निर्धारित करें। 125x तक लीवरेज।'
    },
    'liquidation-calculator': {
      title: 'लिक्विडेशन कैलकुलेटर',
      description: 'मुफ्त लिक्विडेशन प्राइस कैलकुलेटर। Binance, Bybit, OKX पर Isolated और Cross मार्जिन मोड में जानें कि आपकी पोज़ीशन कब लिक्विडेट होगी।'
    },
    'funding-rate-calculator': {
      title: 'फंडिंग रेट कैलकुलेटर',
      description: 'मुफ्त फंडिंग रेट कैलकुलेटर। लीवरेज्ड पोज़ीशन रखने की दैनिक, साप्ताहिक, मासिक और वार्षिक लागत की गणना करें।'
    },
    'tp-sl-calculator': {
      title: 'टेक प्रॉफिट / स्टॉप लॉस कैलकुलेटर',
      description: 'मुफ्त TP/SL कैलकुलेटर। R:R अनुपात, आंशिक TP और विज़ुअल प्राइस स्केल के साथ इष्टतम टेक-प्रॉफिट और स्टॉप-लॉस स्तर सेट करें।'
    },
    'margin-calculator': {
      title: 'मार्जिन कैलकुलेटर',
      description: 'मुफ्त मार्जिन कैलकुलेटर। Binance, Bybit और OKX के लिए आवश्यक मार्जिन, मार्जिन स्तर, फ्री मार्जिन और मार्जिन कॉल प्राइस की गणना करें।'
    },
    'pip-calculator': {
      title: 'पिप वैल्यू कैलकुलेटर',
      description: 'मुफ्त पिप वैल्यू कैलकुलेटर। BTC, ETH, SOL और 500+ कॉइन्स में किसी भी पोज़ीशन साइज़ के लिए प्राइस मूवमेंट का डॉलर मूल्य कैलकुलेट करें।'
    },
    'break-even-calculator': {
      title: 'ब्रेक-ईवन कैलकुलेटर',
      description: 'मुफ्त ब्रेक-ईवन कैलकुलेटर। जानें कि नुकसान से उबरने के लिए कितना लाभ चाहिए, या ट्रेडिंग फीस को कवर करने वाली एग्ज़िट प्राइस कैलकुलेट करें।'
    },
    'risk-reward-calculator': {
      title: 'रिस्क रिवॉर्ड कैलकुलेटर',
      description: 'मुफ्त रिस्क-रिवॉर्ड रेशियो कैलकुलेटर। R:R अनुपात, आवश्यक जीत दर की गणना करें और किसी भी सेटअप के लिए 100 ट्रेड सिमुलेशन चलाएं।'
    },
    'staking-calculator': {
      title: 'क्रिप्टो स्टेकिंग कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो स्टेकिंग कैलकुलेटर। वैलिडेटर कमीशन और टोकन प्राइस अनुमानों के बाद दैनिक, साप्ताहिक और वार्षिक स्टेकिंग रिवॉर्ड कैलकुलेट करें।'
    },
    'impermanent-loss-calculator': {
      title: 'इम्परमानेंट लॉस कैलकुलेटर',
      description: 'मुफ्त इम्परमानेंट लॉस कैलकुलेटर। AMM लिक्विडिटी पूल के लिए IL कैलकुलेट करें, LP रिटर्न बनाम HODL की तुलना करें और फीस कमाई का आकलन करें।'
    },
    'apy-apr-calculator': {
      title: 'APY vs APR कैलकुलेटर',
      description: 'मुफ्त APY vs APR कैलकुलेटर। APR और APY के बीच कन्वर्ट करें, कंपाउंडिंग फ्रीक्वेंसी की तुलना करें और DeFi यील्ड व स्टेकिंग की वास्तविक कमाई कैलकुलेट करें।'
    },
    'yield-farming-calculator': {
      title: 'यील्ड फार्मिंग कैलकुलेटर',
      description: 'मुफ्त यील्ड फार्मिंग कैलकुलेटर। गैस लागत, इम्परमानेंट लॉस और हार्वेस्ट फ्रीक्वेंसी सहित नेट DeFi फार्मिंग प्रॉफिट और वास्तविक APY कैलकुलेट करें।'
    },
    'gas-calculator': {
      title: 'क्रिप्टो गैस कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो गैस कैलकुलेटर। ट्रांजैक्शन कन्फर्म करने से पहले स्वैप, ट्रांसफर और DeFi एक्शन के लिए प्रमुख EVM नेटवर्क पर गैस लागत का अनुमान लगाएं।'
    },
    'uniswap-calculator': {
      title: 'यूनिस्वैप फीस कैलकुलेटर',
      description: 'मुफ्त यूनिस्वैप फीस कैलकुलेटर। LP फीस इनकम, इम्परमानेंट लॉस प्रभाव, ब्रेक-ईवन टाइम और पूल के नेट आउटकम का अनुमान लगाएं।'
    },
    'bridge-comparator': {
      title: 'ब्रिज कॉस्ट तुलनित्र',
      description: 'मुफ्त ब्रिज कॉस्ट तुलनित्र। L2 और मल्टीचेन ब्रिज में अनुमानित कुल शुल्क, गति और सुरक्षा स्कोर के अनुसार क्रिप्टो ब्रिज रूट की तुलना करें।'
    },
    'lending-calculator': {
      title: 'क्रिप्टो लेंडिंग कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो लेंडिंग कैलकुलेटर। APY, कंपाउंडिंग मॉडल, अवधि और प्लेटफॉर्म शुल्क का उपयोग करके अनुमानित लेंडिंग रिटर्न कैलकुलेट करें।'
    },
    'gpu-mining-calculator': {
      title: 'GPU माइनिंग कैलकुलेटर',
      description: 'मुफ्त GPU माइनिंग कैलकुलेटर। हैशरेट, बिजली खपत, बिजली दर और पूल फीस के साथ GPU माइनिंग लाभप्रदता का अनुमान लगाएं।'
    },
    'asic-mining-calculator': {
      title: 'ASIC माइनिंग कैलकुलेटर',
      description: 'मुफ्त ASIC माइनिंग कैलकुलेटर। प्रमुख हार्डवेयर मॉडलों के लिए ASIC माइनिंग लाभप्रदता, बिजली लागत और ब्रेक-ईवन अवधि कैलकुलेट करें।'
    },
    'mining-roi-calculator': {
      title: 'माइनिंग ROI कैलकुलेटर',
      description: 'मुफ्त माइनिंग ROI कैलकुलेटर। राजस्व, लागत और ब्रेक-ईवन टाइमिंग के लिए परिदृश्य विश्लेषण के साथ माइनिंग हार्डवेयर ROI मॉडल करें।'
    },
    'electricity-cost-calculator': {
      title: 'माइनिंग बिजली लागत कैलकुलेटर',
      description: 'मुफ्त माइनिंग बिजली लागत कैलकुलेटर। डिवाइस संख्या, पावर उपयोग, अपटाइम और स्थानीय ऊर्जा मूल्य के अनुसार बिजली खपत और संचालन लागत कैलकुलेट करें।'
    },
    'difficulty-calculator': {
      title: 'माइनिंग कठिनाई अनुमानक',
      description: 'मुफ्त माइनिंग कठिनाई अनुमानक। अगला डिफिकल्टी एडजस्टमेंट आपकी अनुमानित माइनिंग आय और लाभप्रदता को कैसे प्रभावित कर सकता है, इसका अनुमान लगाएं।'
    },
    'hashrate-converter': {
      title: 'हैशरेट कनवर्टर',
      description: 'मुफ्त हैशरेट कनवर्टर। H/s से EH/s तक माइनिंग हैशरेट यूनिट कन्वर्ट करें और ASIC व GPU हार्डवेयर के लिए सामान्य रेंज की तुलना करें।'
    },
    'market-cap-calculator': {
      title: 'मार्केट कैप कैलकुलेटर',
      description: 'मुफ्त मार्केट कैप कैलकुलेटर। मार्केट कैप और सप्लाई से टोकन प्राइस, या टोकन प्राइस से मार्केट कैप कैलकुलेट करें, लाइव क्रिप्टो डेटा के साथ।'
    },
    'market-cap-comparator': {
      title: 'मार्केट कैप तुलनित्र',
      description: 'मुफ्त मार्केट कैप तुलनित्र। किसी भी क्रिप्टो की शीर्ष कॉइन्स से तुलना करें। काल्पनिक कीमतें और ग्रोथ मल्टीप्लायर कैलकुलेट करें।'
    },
    'roi-calculator': {
      title: 'ROI कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो ROI कैलकुलेटर। कुल और वार्षिक ROI कैलकुलेट करें और S&P 500, गोल्ड और रियल एस्टेट के साथ प्रदर्शन की तुलना करें।'
    },
    'reverse-roi': {
      title: 'रिवर्स ROI कैलकुलेटर',
      description: 'मुफ्त रिवर्स ROI कैलकुलेटर। अपना निवेश और लक्ष्य लाभ दर्ज करें और आवश्यक टोकन प्राइस पता करें। ग्रोथ मल्टीप्लायर और माइलस्टोन टेबल शामिल।'
    },
    'hodl-vs-trade': {
      title: 'HODL बनाम ट्रेड कैलकुलेटर',
      description: 'मुफ्त HODL बनाम ट्रेड सिम्युलेटर। बाय-एंड-होल्ड की एक्टिव ट्रेडिंग से तुलना करें। कस्टम विन रेट, प्रॉफिट टारगेट और फीस के साथ ट्रेड सिमुलेट करें।'
    },
    'rebalancing-calculator': {
      title: 'पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर',
      description: 'मुफ्त पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर। लक्ष्य आवंटन के अनुसार अपने क्रिप्टो पोर्टफोलियो को रीबैलेंस करने के लिए खरीद/बिक्री एक्शन कैलकुलेट करें।'
    },
    'compound-calculator': {
      title: 'चक्रवृद्धि ब्याज कैलकुलेटर (क्रिप्टो)',
      description: 'मुफ्त चक्रवृद्धि ब्याज कैलकुलेटर। स्टेकिंग, यील्ड फार्मिंग और सेविंग्स के लिए नियमित योगदान के साथ चक्रवृद्धि वृद्धि का अनुमान लगाएं।'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI कैलकुलेटर',
      description: 'मुफ्त ICO/IDO ROI कैलकुलेटर। टोकन राशि, एंट्री प्राइस और मार्केट प्राइस का उपयोग करके ICO या IDO आवंटन के लिए वर्तमान और ATH ROI कैलकुलेट करें।'
    },
    'airdrop-calculator': {
      title: 'एयरड्रॉप वैल्यू कैलकुलेटर',
      description: 'मुफ्त एयरड्रॉप वैल्यू कैलकुलेटर। प्राप्त क्रिप्टो एयरड्रॉप का मूल्य कैलकुलेट करें, कर दायित्व का अनुमान लगाएं और फीस के बाद लाभ या हानि ट्रैक करें।'
    },
    'satoshi-converter': {
      title: 'सातोशी कनवर्टर',
      description: 'मुफ्त सातोशी कनवर्टर। Bitcoin, Satoshi और USD/EUR के बीच तुरंत कन्वर्ट करें। प्रति डॉलर sats, क्विक रेफरेंस टेबल और लाइव BTC प्राइस देखें।'
    },
    'gwei-converter': {
      title: 'ग्वेई कनवर्टर',
      description: 'मुफ्त ग्वेई कनवर्टर। लाइव ETH प्राइस और Ethereum ट्रांजैक्शन के लिए व्यावहारिक गैस लागत उदाहरणों के साथ Wei, Gwei और Ether यूनिट तुरंत कन्वर्ट करें।'
    },
    'timestamp-converter': {
      title: 'यूनिक्स टाइमस्टैम्प कनवर्टर',
      description: 'मुफ्त यूनिक्स टाइमस्टैम्प कनवर्टर। UTC/लोकल डिस्प्ले और ब्लॉक-टाइम अनुमान के साथ Unix timestamp को तारीख/समय और तारीख/समय को Unix में कन्वर्ट करें।'
    },
    'unit-converter': {
      title: 'क्रिप्टो यूनिट कनवर्टर',
      description: 'मुफ्त क्रिप्टो यूनिट कनवर्टर। BTC, ETH, SOL और USDT के लिए satoshi, gwei, lamport और micro यूनिट सहित डिनॉमिनेशन यूनिट कन्वर्ट करें।'
    },
    'exchange-fees': {
      title: 'एक्सचेंज फीस तुलनित्र',
      description: 'मुफ्त एक्सचेंज फीस तुलनित्र। Binance, Bybit, OKX, Coinbase, Kraken और अन्य में maker/taker फीस ब्रेकडाउन के साथ ट्रेडिंग शुल्क की तुलना करें।'
    },
    'crypto-loan-calculator': {
      title: 'क्रिप्टो लोन कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो लोन कैलकुलेटर। DeFi और CeFi लोन के लिए लोन राशि, ब्याज लागत, मार्जिन कॉल थ्रेशोल्ड और लिक्विडेशन रिस्क का अनुमान लगाएं।'
    },
    'vesting-calculator': {
      title: 'टोकन वेस्टिंग कैलकुलेटर',
      description: 'मुफ्त टोकन वेस्टिंग कैलकुलेटर। क्लिफ पीरियड, TGE अनलॉक और मासिक या तिमाही वेस्टिंग के साथ अनलॉक शेड्यूल विज़ुअलाइज़ करें।'
    },
    'nft-profit-calculator': {
      title: 'NFT प्रॉफिट कैलकुलेटर',
      description: 'मुफ्त NFT प्रॉफिट कैलकुलेटर। OpenSea, Blur और अन्य पर मार्केटप्लेस फीस, क्रिएटर रॉयल्टी और गैस लागत के बाद वास्तविक NFT ट्रेडिंग प्रॉफिट कैलकुलेट करें।'
    },
    'halving-calculator': {
      title: 'बिटकॉइन हाल्विंग कैलकुलेटर',
      description: 'मुफ्त बिटकॉइन हाल्विंग कैलकुलेटर। लाइव काउंटडाउन टाइमर के साथ देखें कि अगला BTC हाल्विंग ऐतिहासिक डेटा और प्राइस विश्लेषण से माइनिंग आय को कैसे प्रभावित करेगा।'
    },
    'mev-calculator': {
      title: 'MEV प्रोटेक्शन कैलकुलेटर',
      description: 'मुफ्त MEV प्रोटेक्शन कैलकुलेटर। स्वैप साइज़ और स्लिपेज के आधार पर सैंडविच और फ्रंटरन जोखिम, तथा MEV प्रोटेक्शन रूट से संभावित बचत का अनुमान लगाएं।'
    },
    'gamefi-calculator': {
      title: 'गेमफाई ROI कैलकुलेटर',
      description: 'मुफ्त गेमफाई ROI कैलकुलेटर। सेटअप लागत, टोकन रिवॉर्ड और संचालन खर्चों के आधार पर प्ले-टू-अर्न रणनीतियों के लिए पेबैक पीरियड और वार्षिक ROI का अनुमान।'
    },
    'node-calculator': {
      title: 'वैलिडेटर नोड कैलकुलेटर',
      description: 'मुफ्त वैलिडेटर नोड कैलकुलेटर। स्टेक राशि, APR, कमीशन, अपटाइम और इन्फ्रास्ट्रक्चर लागत का उपयोग करके वैलिडेटर नोड इकोनॉमिक्स मॉडल करें।'
    },
    'salary-calculator': {
      title: 'क्रिप्टो सैलरी कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो सैलरी कैलकुलेटर। फिएट सैलरी को BTC, ETH या USDT में कन्वर्ट करें। भुगतान आवृत्ति और फीस के साथ क्रिप्टो संचय कैलकुलेट करें।'
    },
    'inflation-hedge': {
      title: 'मुद्रास्फीति बचाव कैलकुलेटर',
      description: 'मुफ्त मुद्रास्फीति बचाव कैलकुलेटर। मुद्रास्फीति के खिलाफ क्रिप्टो, स्टेबलकॉइन, गोल्ड और S&P 500 की तुलना करें। तुर्की, अमेरिका और अन्य देश।'
    },
    'calmar-calculator': {
      title: 'कैल्मर अनुपात कैलकुलेटर',
      description: 'वार्षिक रिटर्न और अधिकतम ड्रॉडाउन से कैल्मर अनुपात की गणना करें और ड्रॉडाउन जोखिम के अनुसार रिटर्न दक्षता की तुलना करें।'
    },
    'compound-interest-calculator': {
      title: 'क्रिप्टो चक्रवृद्धि ब्याज कैलकुलेटर',
      description: 'स्टेकिंग और यील्ड फार्मिंग के लिए मुफ्त चक्रवृद्धि ब्याज कैलकुलेटर। देखें कि दैनिक, साप्ताहिक या मासिक कंपाउंडिंग आपके निवेश को कैसे बढ़ाती है।'
    },
    'drawdown-calculator': {
      title: 'ड्रॉडाउन रिकवरी कैलकुलेटर',
      description: 'पोर्टफोलियो ड्रॉडाउन, आवश्यक रिकवरी लाभ और अपेक्षित मासिक रिटर्न के आधार पर अनुमानित रिकवरी समय मापें।'
    },
    'gas-fee-calculator': {
      title: 'गैस फीस कैलकुलेटर',
      description: 'Ethereum, Polygon, Arbitrum, Optimism, BNB Chain और अन्य के लिए मुफ्त गैस कैलकुलेटर। स्वैप, ट्रांसफर और मिंटिंग लागत का अनुमान लगाएं।'
    },
    'information-ratio-calculator': {
      title: 'इंफॉर्मेशन रेशियो कैलकुलेटर',
      description: 'एक्टिव रिटर्न और ट्रैकिंग एरर का उपयोग करके बेंचमार्क के विरुद्ध सक्रिय पोर्टफोलियो प्रदर्शन की तुलना करें।'
    },
    'kelly-calculator': {
      title: 'केली क्राइटेरियन कैलकुलेटर',
      description: 'विन रेट और पेऑफ रेशियो से Kelly, half-Kelly और quarter-Kelly मॉडल का उपयोग करके इष्टतम पोजीशन साइज ज्ञात करें।'
    },
    'leverage-calculator': {
      title: 'लीवरेज कैलकुलेटर',
      description: 'क्रिप्टो के लिए मुफ्त लीवरेज कैलकुलेटर। देखें कि लीवरेज लाभ और हानि को कैसे बढ़ाता है, लिक्विडेशन दूरी और PnL तालिका के साथ।'
    },
    'loan-calculator': {
      title: 'क्रिप्टो लोन पुनर्भुगतान कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो लोन पुनर्भुगतान कैलकुलेटर। अमॉर्टाइजेशन शेड्यूल बनाएं, मासिक भुगतान का अनुमान लगाएं और मूलधन बनाम ब्याज ट्रैक करें।'
    },
    'portfolio-calculator': {
      title: 'पोर्टफोलियो आवंटन कैलकुलेटर',
      description: 'मुफ्त पोर्टफोलियो आवंटन कैलकुलेटर। एसेट वेट देखें, लक्ष्य आवंटन सेट करें और अपने क्रिप्टो पोर्टफोलियो के लिए रीबैलेंसिंग सुझाव पाएं।'
    },
    'risk-of-ruin-calculator': {
      title: 'रिस्क ऑफ रुइन कैलकुलेटर',
      description: 'विन रेट, रिवॉर्ड/रिस्क प्रोफाइल और प्रति ट्रेड निश्चित जोखिम से खाता बर्बादी की संभावना का अनुमान लगाएं।'
    },
    'sharpe-calculator': {
      title: 'शार्प रेशियो कैलकुलेटर',
      description: 'अपेक्षित रिटर्न, अस्थिरता और जोखिम-मुक्त दर का उपयोग करके जोखिम-समायोजित पोर्टफोलियो प्रदर्शन का मूल्यांकन करें।'
    },
    'slippage-calculator': {
      title: 'DEX स्लिपेज कैलकुलेटर',
      description: 'DEX ट्रेड्स के लिए स्वैप स्लिपेज, न्यूनतम प्राप्त राशि और कुल निष्पादन लागत का अनुमान लगाएं।'
    },
    'sortino-calculator': {
      title: 'सॉर्टिनो रेशियो कैलकुलेटर',
      description: 'सॉर्टिनो रेशियो का उपयोग करके डाउनसाइड-वोलैटिलिटी फोकस के साथ जोखिम-समायोजित पोर्टफोलियो प्रदर्शन मापें।'
    },
    'staking-rewards-calculator': {
      title: 'स्टेकिंग रिवॉर्ड्स कैलकुलेटर',
      description: 'मुफ्त स्टेकिंग कैलकुलेटर। Ethereum, Solana, Polkadot, Cosmos और अन्य PoS कॉइन्स के लिए दैनिक, साप्ताहिक और मासिक कमाई का अनुमान लगाएं।'
    },
    'trade-expectancy-calculator': {
      title: 'ट्रेड एक्सपेक्टेंसी कैलकुलेटर',
      description: 'विन रेट, R-मल्टीपल्स और प्रति ट्रेड जोखिम का उपयोग करके प्रति ट्रेड रणनीति का लाभ और मासिक परिणाम प्रक्षेपित करें।'
    },
    'treynor-calculator': {
      title: 'ट्रेनर रेशियो कैलकुलेटर',
      description: 'बाजार जोखिम (बीटा) की प्रति इकाई रिटर्न मापें और जोखिम-मुक्त दर के विरुद्ध रणनीति दक्षता का मूल्यांकन करें।'
    },
    'var-calculator': {
      title: 'वैल्यू एट रिस्क (VaR) कैलकुलेटर',
      description: 'पैरामेट्रिक VaR और अपेक्षित शॉर्टफॉल (CVaR) के साथ विभिन्न विश्वास स्तरों पर पोर्टफोलियो डाउनसाइड जोखिम का अनुमान लगाएं।'
    },
    'bitcoin-unit-converter': {
      title: 'बिटकॉइन यूनिट कनवर्टर',
      description: 'मुफ्त बिटकॉइन यूनिट कनवर्टर। BTC, mBTC, bits और सतोशी के बीच तुरंत रूपांतरण करें। लाइव USD मूल्य और त्वरित संदर्भ तालिका शामिल है।'
    },
    'cross-chain-bridge-calculator': {
      title: 'क्रॉस-चेन ब्रिज कैलकुलेटर',
      description: 'मुफ्त क्रॉस-चेन ब्रिज कैलकुलेटर। Ethereum, Arbitrum, Solana और 20+ चेन के बीच टोकन ट्रांसफर के लिए ब्रिज शुल्क, समय और स्लिपेज का अनुमान लगाएं।'
    },
    'crypto-correlation-calculator': {
      title: 'क्रिप्टो कोरिलेशन कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो कोरिलेशन कैलकुलेटर। किन्हीं दो क्रिप्टोकरेंसी के बीच मूल्य सहसंबंध मापें और कम समग्र जोखिम वाला विविध पोर्टफोलियो बनाएं।'
    },
    'crypto-index-fund-calculator': {
      title: 'क्रिप्टो इंडेक्स फंड कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो इंडेक्स फंड कैलकुलेटर। मार्केट कैप या समान वज़न से कस्टम क्रिप्टो इंडेक्स बनाएं और BTC के मुकाबले प्रदर्शन की तुलना करें।'
    },
    'crypto-inheritance-calculator': {
      title: 'क्रिप्टो विरासत कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो विरासत कैलकुलेटर। मल्टी-सिग सेटअप लागत, संपत्ति कर अनुमान और उत्तराधिकारी वितरण मॉडलिंग के साथ डिजिटल संपत्ति उत्तराधिकार की योजना बनाएं।'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'क्रिप्टो पोर्टफोलियो रीबैलेंस कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो पोर्टफोलियो रीबैलेंस कैलकुलेटर। वर्तमान होल्डिंग्स और लक्ष्य वज़न दर्ज करें और रीबैलेंस के लिए सटीक खरीद-बिक्री राशि देखें।'
    },
    'crypto-sentiment-calculator': {
      title: 'क्रिप्टो सेंटिमेंट कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो सेंटिमेंट कैलकुलेटर। Fear & Greed इंडेक्स, सोशल वॉल्यूम और फंडिंग रेट को एक समग्र सेंटिमेंट स्कोर में एकत्रित करें।'
    },
    'defi-yield-aggregator': {
      title: 'DeFi यील्ड एग्रीगेटर',
      description: 'मुफ्त DeFi यील्ड एग्रीगेटर। Aave, Compound, Lido और 50+ प्रोटोकॉल पर रियल-टाइम APY की तुलना करें। चेन, एसेट और TVL से फ़िल्टर करें।'
    },
    'dust-attack-calculator': {
      title: 'डस्ट अटैक कैलकुलेटर',
      description: 'मुफ्त डस्ट अटैक कैलकुलेटर। अपने वॉलेट में छोटे अनचाहे लेनदेन का पता लगाएं, समेकन लागत का अनुमान लगाएं और ऑन-चेन प्राइवेसी सुरक्षित करें।'
    },
    'exchange-fee-comparator': {
      title: 'एक्सचेंज फीस कम्पेरेटर',
      description: 'मुफ्त एक्सचेंज फीस कम्पेरेटर। Binance, Coinbase, Kraken, OKX और Bybit की स्पॉट, फ्यूचर्स और निकासी शुल्क की साथ-साथ तुलना करें।'
    },
    'flash-loan-calculator': {
      title: 'फ्लैश लोन कैलकुलेटर',
      description: 'मुफ्त फ्लैश लोन कैलकुलेटर। Aave, dYdX और Uniswap के लिए प्रोटोकॉल शुल्क, गैस लागत और आर्बिट्राज स्प्रेड सहित लाभप्रदता का अनुमान लगाएं।'
    },
    'gas-optimization-calculator': {
      title: 'गैस ऑप्टिमाइज़ेशन कैलकुलेटर',
      description: 'मुफ्त गैस ऑप्टिमाइज़ेशन कैलकुलेटर। Ethereum और L2 पर सबसे सस्ते लेनदेन समय का पता लगाएं। घंटे के अनुसार गैस लागत तुलना करें और बचत करें।'
    },
    'governance-voting-calculator': {
      title: 'गवर्नेंस वोटिंग कैलकुलेटर',
      description: 'मुफ्त गवर्नेंस वोटिंग कैलकुलेटर। DAO प्रस्तावों के लिए मतदान शक्ति, कोरम आवश्यकताएं और प्रतिनिधिमंडल प्रभाव का अनुमान लगाएं।'
    },
    'nft-rarity-calculator': {
      title: 'NFT रेयरिटी कैलकुलेटर',
      description: 'मुफ्त NFT रेयरिटी कैलकुलेटर। सांख्यिकीय दुर्लभता, औसत विशेषता और सूचना-सामग्री विधियों से किसी भी NFT संग्रह की विशेषता दुर्लभता स्कोर करें।'
    },
    'token-unlock-calculator': {
      title: 'टोकन अनलॉक कैलकुलेटर',
      description: 'मुफ्त टोकन अनलॉक कैलकुलेटर। आगामी टोकन अनलॉक इवेंट ट्रैक करें, बिक्री दबाव प्रभाव का अनुमान लगाएं और वेस्टिंग शेड्यूल विज़ुअलाइज़ करें।'
    },
    'whale-alert-calculator': {
      title: 'व्हेल अलर्ट कैलकुलेटर',
      description: 'मुफ्त व्हेल अलर्ट कैलकुलेटर। बड़े ट्रांसफर के बाज़ार प्रभाव का अनुमान लगाएं, व्हेल ऑर्डर से स्लिपेज की गणना करें और कस्टम अलर्ट थ्रेशोल्ड सेट करें।'
    },
    'arbitrage-calculator': {
      title: 'क्रिप्टो आर्बिट्राज कैलकुलेटर',
      description: 'एक्सचेंजों के बीच फीस और निकासी लागत के बाद आर्बिट्राज लाभ की गणना करें।'
    },
    'stock-to-flow-calculator': {
      title: 'बिटकॉइन स्टॉक-टू-फ्लो कैलकुलेटर',
      description: 'S2F मॉडल से बिटकॉइन की कमी का मूल्यांकन करें और वास्तविक कीमत की मॉडल भविष्यवाणी से तुलना करें।'
    },
    'options-calculator': {
      title: 'क्रिप्टो ऑप्शन कैलकुलेटर',
      description: 'क्रिप्टो कॉल और पुट के लिए ऑप्शन P&L, ब्रेक-ईवन प्राइस और पेऑफ टेबल की गणना करें।'
    },
    'tax-loss-harvesting-calculator': {
      title: 'टैक्स लॉस हार्वेस्टिंग कैलकुलेटर',
      description: 'कैपिटल गेन्स ऑफसेट करने के लिए हार्वेस्ट योग्य क्रिप्टो हानियों की पहचान करें।'
    },
    'restaking-calculator': {
      title: 'रीस्टेकिंग कैलकुलेटर',
      description: 'EigenLayer जैसे रीस्टेकिंग प्रोटोकॉल से संयुक्त यील्ड का अनुमान लगाएं।'
    },
    'liquid-staking-calculator': {
      title: 'लिक्विड स्टेकिंग कैलकुलेटर',
      description: 'Lido, Rocket Pool, Coinbase, Frax प्रोटोकॉल की यील्ड और फीस की तुलना करें।'
    },
    'perpetual-futures-calculator': {
      title: 'परपेचुअल फ्यूचर्स कैलकुलेटर',
      description: 'लीवरेज, फंडिंग रेट लागत और लिक्विडेशन प्राइस के साथ परप फ्यूचर्स P&L गणना करें।'
    },
    'payback-period-calculator': {
      title: 'पेबैक पीरियड कैलकुलेटर',
      description: 'अपेक्षित रिटर्न के आधार पर आपके क्रिप्टो निवेश को वापस आने में कितना समय लगेगा।'
    },
    'dva-calculator': {
      title: 'DVA कैलकुलेटर',
      description: 'Dollar Value Averaging vs DCA की तुलना करें — DVA पोर्टफोलियो प्रदर्शन के आधार पर निवेश राशि समायोजित करता है।'
    },
    'bitcoin-energy-calculator': {
      title: 'बिटकॉइन एनर्जी कैलकुलेटर',
      description: 'बिटकॉइन माइनिंग की ऊर्जा खपत, कार्बन फुटप्रिंट और पर्यावरणीय लागत का अनुमान लगाएं।'
    },
    'on-chain-metrics-calculator': {
      title: 'ऑन-चेन मेट्रिक्स कैलकुलेटर',
      description: 'MVRV, NVT और SOPR से बिटकॉइन वैल्यूएशन का विश्लेषण करें — ओवरबॉट या अंडरवैल्यूड ज़ोन।'
    },
    'grid-trading-calculator': {
      title: 'ग्रिड ट्रेडिंग कैलकुलेटर',
      description: 'ग्रिड ट्रेडिंग बॉट रणनीति की योजना बनाएं — प्रति ग्रिड लाभ और अनुमानित वार्षिक रिटर्न गणना करें।'
    },
    'inheritance-tax-calculator': {
      title: 'क्रिप्टो विरासत कर कैलकुलेटर',
      description: '8 देशों में संबंध प्रकार के अनुसार छूट के साथ क्रिप्टो संपत्ति पर विरासत कर का अनुमान लगाएं।'
    },
    'validator-calculator': {
      title: 'वैलिडेटर इकोनॉमिक्स कैलकुलेटर',
      description: 'PoS वैलिडेटर लाभप्रदता की गणना करें — रिवॉर्ड, ऑपरेटिंग कॉस्ट, ROI — Ethereum, Solana और अधिक।'
    },
    'token-valuation-calculator': {
      title: 'टोकन वैल्यूएशन कैलकुलेटर',
      description: 'टोकन FDV, मार्केट कैप, डाइल्यूशन रिस्क का विश्लेषण करें और स्थापित प्रोजेक्ट से तुलना करें।'
    },
    'if-i-had-bought': {
      title: 'अगर मैंने खरीदा होता कैलकुलेटर',
      description: 'जानें कि अगर आपने ऐतिहासिक कीमतों पर Bitcoin, Ethereum या अन्य क्रिप्टो खरीदा होता तो आज कितना मूल्य होता।'
    },
    'millionaire-calculator': {
      title: 'क्रिप्टो करोड़पति कैलकुलेटर',
      description: 'अपने धन लक्ष्य तक पहुंचने के लिए कितना और कितने समय तक निवेश करना है, इसकी गणना करें।'
    },
    'pizza-day-calculator': {
      title: 'बिटकॉइन पिज्जा डे कैलकुलेटर',
      description: 'प्रसिद्ध 10,000 BTC पिज्जा खरीद का वर्तमान मूल्य गणना करें और अवसर लागत का पता लगाएं।'
    },
    'retirement-calculator': {
      title: 'क्रिप्टो रिटायरमेंट / FIRE कैलकुलेटर',
      description: 'जल्दी रिटायर होने के लिए कितनी क्रिप्टो चाहिए, गणना करें। FIRE नंबर, पोर्टफोलियो वृद्धि और वित्तीय स्वतंत्रता तक के वर्ष।'
    },
    'rainbow-chart-calculator': {
      title: 'बिटकॉइन रेनबो चार्ट कैलकुलेटर',
      description: '9 मूल्य बैंड वाले लॉगरिदमिक रेनबो चार्ट पर बिटकॉइन कहाँ है, देखें।'
    },
    'etf-fee-calculator': {
      title: 'बिटकॉइन ETF शुल्क कैलकुलेटर',
      description: 'IBIT, FBTC, GBTC, ARKB, BITB और सीधे BTC के शुल्क की तुलना करें। 1–30 वर्षों में शुल्क का प्रभाव देखें।'
    },
    'token-burn-calculator': {
      title: 'टोकन बर्न रेट कैलकुलेटर',
      description: 'डिफ्लेशनरी टोकन अर्थशास्त्र का विश्लेषण करें — बर्न रेट, सप्लाई कमी समयरेखा और मार्केट कैप पर प्रभाव।'
    },
    'futures-basis-calculator': {
      title: 'फ्यूचर्स बेसिस कैलकुलेटर',
      description: 'स्पॉट-फ्यूचर्स स्प्रेड, वार्षिक बेसिस, कैश-एंड-कैरी यील्ड और फीस के बाद आर्बिट्राज लाभ की गणना करें।'
    },
    'defi-insurance-calculator': {
      title: 'DeFi बीमा कैलकुलेटर',
      description: 'DeFi बीमा प्रीमियम के लायक है या नहीं, अनुमान लगाएं। बीमित बनाम अबीमित परिदृश्य, ब्रेक-ईवन हैक आकार की तुलना करें।'
    },
    'mayer-multiple-calculator': {
      title: 'Mayer मल्टीपल कैलकुलेटर',
      description: 'Mayer मल्टीपल: BTC वर्तमान कीमत ÷ 200-दिन का मूविंग एवरेज। 2.4 से ऊपर = ऐतिहासिक सेल जोन; 1.0 से नीचे = अंडरवैल्यूड बाय जोन।'
    },
    'geometric-mean-return-calculator': {
      title: 'जियोमेट्रिक मीन रिटर्न कैलकुलेटर',
      description: 'अंकगणितीय औसत बनाम सच्चा कंपाउंड रिटर्न गणना करता है। क्रिप्टो जैसे वोलाटाइल एसेट्स में "वोलाटिलिटी ड्रैग" प्रकट करता है।'
    },
    'mstr-mnav-calculator': {
      title: 'MicroStrategy mNAV प्रीमियम कैलकुलेटर',
      description: 'Bitcoin ट्रेज़री कंपनियों (MSTR, MetaPlanet, Semler) के शुद्ध BTC NAV पर प्रीमियम की गणना। ओवरवैल्यूएशन का पता लगाएं।'
    },
    'lightning-network-fee-calculator': {
      title: 'Lightning Network फीस कैलकुलेटर',
      description: 'Lightning Network रूटिंग फीस की गणना: प्रति हॉप बेस + ppm। Bitcoin ऑन-चेन फीस से तुलना।'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Pump.fun बॉन्डिंग कर्व कैलकुलेटर',
      description: 'Pump.fun बॉन्डिंग कर्व: निवेशित SOL प्रति प्राप्त टोकन, स्लिपेज और Raydium पर ग्रेजुएट होने तक $69K की दूरी।'
    },
    'profit-factor-calculator': {
      title: 'प्रॉफिट फैक्टर कैलकुलेटर',
      description: 'ट्रेडिंग सिस्टम के लिए Profit Factor कैलकुलेटर। ग्रॉस प्रॉफिट / ग्रॉस लॉस अनुपात। 1.5 से ऊपर = ठोस एज।'
    },
    'covered-call-calculator': {
      title: 'कवर्ड कॉल कैलकुलेटर',
      description: 'क्रिप्टो ऑप्शंस के लिए Covered Call कैलकुलेटर। प्रीमियम यील्ड, वार्षिक रिटर्न, ब्रेकईवन और असाइनमेंट रिस्क की गणना।'
    },
    'iron-condor-calculator': {
      title: 'Iron Condor कैलकुलेटर',
      description: '4-लेग्ड Iron Condor मल्टी-लेग ऑप्शन कैलकुलेटर। नेट प्रीमियम, मैक्स प्रॉफिट, मैक्स लॉस, ब्रेकईवन और पूरा पेऑफ डायग्राम।'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'पर्पेचुअल फंडिंग आर्बिट्राज कैलकुलेटर',
      description: 'फंडिंग रेट आर्बिट्राज: long spot + short perp = delta-न्यूट्रल। APR, फीस और ब्रेकईवन फंडिंग रेट की गणना।'
    },
    'concentrated-liquidity-calculator': {
      title: 'कॉन्सेंट्रेटेड लिक्विडिटी (Uniswap V3) कैलकुलेटर',
      description: 'Uniswap V3 कॉन्सेंट्रेटेड लिक्विडिटी कैलकुलेटर: कैपिटल एफिशिएंसी, फीस इनकम, रेंज एज पर IL।'
    },
    'looping-yield-calculator': {
      title: 'लूपिंग / रिकर्सिव लेंडिंग कैलकुलेटर',
      description: 'DeFi लूपिंग कैलकुलेटर: रिकर्सिव borrow → re-deposit एम्प्लीफाइड यील्ड के लिए। प्रभावी लीवरेज, नेट APR और लिक्विडेशन दूरी।'
    },
  },
  'ru': {
    'converter': {
      title: 'Конвертер криптовалют',
      description: 'Бесплатный конвертер криптовалют. Конвертируйте Bitcoin, Ethereum и 500+ криптовалют в USD, EUR и 10+ фиатных валют с ценами CoinGecko в реальном времени.'
    },
    'profit-calculator': {
      title: 'Калькулятор прибыли криптовалют',
      description: 'Бесплатный калькулятор прибыли. Введите цены покупки и продажи, чтобы увидеть ROI, общие комиссии и чистую прибыль для 500+ криптовалют.'
    },
    'mining-calculator': {
      title: 'Калькулятор майнинга биткоина',
      description: 'Бесплатный калькулятор майнинга биткоина. Введите хешрейт, энергопотребление и стоимость электричества для оценки дневного, месячного и годового дохода в BTC.'
    },
    'dca-calculator': {
      title: 'Калькулятор DCA',
      description: 'Бесплатный DCA-калькулятор для Bitcoin, Ethereum и 500+ криптовалют. Симулируйте стратегии усреднения с историческими данными и сравните DCA.'
    },
    'tax-calculator': {
      title: 'Калькулятор налогов на криптовалюту',
      description: 'Бесплатный калькулятор криптоналогов для 17 стран. Оцените налог на прирост капитала, сравните краткосрочные и долгосрочные ставки для США, России и других.'
    },
    'what-if': {
      title: 'Калькулятор Если бы',
      description: 'Бесплатный калькулятор «Что если». Симулируйте гипотетические входы в крипто, оцените альтернативную стоимость и сравните результаты альтернативных инвестиций.'
    },
    'position-size-calculator': {
      title: 'Калькулятор размера позиции',
      description: 'Бесплатный калькулятор размера позиции. Определите оптимальный размер сделки на основе баланса, риска и стоп-лосса. Плечо до 125x.'
    },
    'liquidation-calculator': {
      title: 'Калькулятор ликвидации',
      description: 'Бесплатный калькулятор цены ликвидации для криптофьючерсов. Поддержка Binance, Bybit, OKX с режимами Isolated и Cross маржи.'
    },
    'funding-rate-calculator': {
      title: 'Калькулятор ставки фондирования',
      description: 'Бесплатный калькулятор ставки фондирования для бессрочных фьючерсов. Рассчитайте дневную, недельную, месячную и годовую стоимость удержания позиции с плечом.'
    },
    'tp-sl-calculator': {
      title: 'Калькулятор Тейк-Профит / Стоп-Лосс',
      description: 'Бесплатный TP/SL-калькулятор. Установите оптимальные уровни тейк-профит и стоп-лосс с соотношением R:R, частичными TP и визуальной шкалой цен.'
    },
    'margin-calculator': {
      title: 'Калькулятор маржи',
      description: 'Бесплатный калькулятор маржи для криптофьючерсов. Рассчитайте требуемую маржу, уровень маржи, свободную маржу и цену маржин-колла на Binance, Bybit и OKX.'
    },
    'pip-calculator': {
      title: 'Калькулятор стоимости пункта (Пип/Тик)',
      description: 'Бесплатный калькулятор стоимости пипа. Рассчитайте долларовую стоимость движения цены для любого размера позиции по BTC, ETH, SOL и 500+ монетам.'
    },
    'break-even-calculator': {
      title: 'Калькулятор безубыточности',
      description: 'Бесплатный калькулятор безубыточности. Узнайте, какой рост нужен для восстановления после убытка, или рассчитайте цену выхода, покрывающую торговые комиссии.'
    },
    'risk-reward-calculator': {
      title: 'Калькулятор соотношения риска и прибыли',
      description: 'Бесплатный калькулятор соотношения риск/прибыль. Рассчитайте коэффициент R:R, необходимый процент выигрыша и симулируйте 100 сделок для любой стратегии.'
    },
    'staking-calculator': {
      title: 'Калькулятор стейкинга',
      description: 'Бесплатный калькулятор стейкинга. Рассчитайте дневные, недельные и годовые награды стейкинга с учётом комиссии валидатора и прогнозов цены токена.'
    },
    'impermanent-loss-calculator': {
      title: 'Калькулятор непостоянных потерь',
      description: 'Бесплатный калькулятор непостоянных потерь для DeFi. Рассчитайте IL для AMM-пулов, сравните доход LP vs HODL и оцените, покрывают ли комиссии убыток.'
    },
    'apy-apr-calculator': {
      title: 'Калькулятор APY и APR',
      description: 'Бесплатный калькулятор APY vs APR. Конвертируйте между APR и APY, сравните частоту начисления и рассчитайте реальный доход от DeFi-yield и стейкинга.'
    },
    'yield-farming-calculator': {
      title: 'Калькулятор фарминга доходности',
      description: 'Бесплатный калькулятор фарминга. Рассчитайте чистую прибыль DeFi-фарминга с учётом газа, непостоянных потерь и частоты сбора для определения реального APY.'
    },
    'gas-calculator': {
      title: 'Калькулятор газа криптовалют',
      description: 'Бесплатный калькулятор газа. Оцените стоимость газа на основных EVM-сетях для свопов, переводов и DeFi-операций перед подтверждением транзакций.'
    },
    'uniswap-calculator': {
      title: 'Калькулятор комиссий Uniswap',
      description: 'Бесплатный калькулятор комиссий Uniswap. Оцените доход LP от комиссий, влияние непостоянных потерь, время окупаемости и чистый результат пула.'
    },
    'bridge-comparator': {
      title: 'Сравнение стоимости мостов (Bridge)',
      description: 'Бесплатное сравнение стоимости мостов. Сравните маршруты криптомостов по общей комиссии, скорости и оценке безопасности среди L2 и мультичейн-мостов.'
    },
    'lending-calculator': {
      title: 'Калькулятор крипто-кредитования (Лендинг)',
      description: 'Бесплатный калькулятор крипто-лендинга. Рассчитайте прогнозируемый доход от кредитования с учётом APY, модели начисления, срока и комиссий платформы.'
    },
    'gpu-mining-calculator': {
      title: 'Калькулятор майнинга на видеокартах (GPU)',
      description: 'Бесплатный калькулятор GPU-майнинга. Оцените рентабельность майнинга на видеокартах с учётом хешрейта, энергопотребления, тарифов и комиссий пула.'
    },
    'asic-mining-calculator': {
      title: 'Калькулятор ASIC-майнинга',
      description: 'Бесплатный калькулятор ASIC-майнинга. Рассчитайте рентабельность ASIC-майнинга, стоимость электричества и срок окупаемости для ведущих моделей оборудования.'
    },
    'mining-roi-calculator': {
      title: 'Калькулятор окупаемости майнинга (ROI)',
      description: 'Бесплатный калькулятор ROI майнинга. Моделируйте возврат инвестиций в оборудование с анализом сценариев для дохода, расходов и точки безубыточности.'
    },
    'electricity-cost-calculator': {
      title: 'Калькулятор стоимости электроэнергии для майнинга',
      description: 'Бесплатный калькулятор электроэнергии для майнинга. Рассчитайте энергопотребление и расходы по количеству устройств, мощности и тарифу.'
    },
    'difficulty-calculator': {
      title: 'Калькулятор сложности майнинга',
      description: 'Бесплатный калькулятор сложности. Оцените, как следующая корректировка сложности может повлиять на прогнозируемый доход и рентабельность вашего майнинга.'
    },
    'hashrate-converter': {
      title: 'Конвертер хешрейта',
      description: 'Бесплатный конвертер хешрейта. Конвертируйте единицы хешрейта от H/s до EH/s и сравните типичные диапазоны для ASIC и GPU оборудования.'
    },
    'market-cap-calculator': {
      title: 'Калькулятор рыночной капитализации',
      description: 'Бесплатный калькулятор рыночной капитализации. Рассчитайте цену токена по капитализации и объёму, или капитализацию по цене, с актуальными крипто-данными.'
    },
    'market-cap-comparator': {
      title: 'Сравнение рыночной капитализации',
      description: 'Бесплатное сравнение рыночной капитализации. Сравните любую криптовалюту с топ-монетами. Рассчитайте гипотетические цены и мультипликаторы роста.'
    },
    'roi-calculator': {
      title: 'Калькулятор ROI (рентабельности)',
      description: 'Бесплатный калькулятор ROI с годовой доходностью. Рассчитайте общий и годовой ROI и сравните результат с S&P 500, золотом и недвижимостью.'
    },
    'reverse-roi': {
      title: 'Калькулятор обратного ROI',
      description: 'Бесплатный калькулятор обратного ROI. Введите инвестицию и целевую прибыль, чтобы найти нужную цену токена. Мультипликатор роста и таблица вех.'
    },
    'hodl-vs-trade': {
      title: 'Калькулятор HODL vs Трейдинг',
      description: 'Бесплатный симулятор HODL vs Трейдинг. Сравните стратегию удержания с активной торговлей. Симулируйте сделки с процентом побед, целями прибыли и комиссиями.'
    },
    'rebalancing-calculator': {
      title: 'Калькулятор ребалансировки портфеля',
      description: 'Бесплатный калькулятор ребалансировки портфеля. Рассчитайте действия покупки/продажи для ребалансировки вашего криптопортфеля к целевым распределениям.'
    },
    'compound-calculator': {
      title: 'Калькулятор сложного процента (Крипто)',
      description: 'Бесплатный калькулятор сложного процента. Спрогнозируйте рост капитала для стейкинга, фарминга и сбережений с регулярными взносами.'
    },
    'ico-roi-calculator': {
      title: 'Калькулятор ROI для ICO / IDO',
      description: 'Бесплатный калькулятор ROI для ICO/IDO. Рассчитайте текущий и ATH ROI для аллокаций ICO или IDO по количеству токенов, цене входа и рыночным ценам.'
    },
    'airdrop-calculator': {
      title: 'Калькулятор стоимости аирдропа',
      description: 'Бесплатный калькулятор стоимости аирдропа. Рассчитайте стоимость полученных криптоаирдропов, оцените налоговые обязательства и отслеживайте прибыль или убыток.'
    },
    'satoshi-converter': {
      title: 'Конвертер сатоши',
      description: 'Бесплатный конвертер сатоши. Мгновенно конвертируйте между Bitcoin, сатоши и USD/EUR. Сатоши за доллар, таблицы и курс BTC в реальном времени.'
    },
    'gwei-converter': {
      title: 'Конвертер Gwei',
      description: 'Бесплатный конвертер Gwei. Мгновенно конвертируйте единицы Wei, Gwei и Ether с актуальной ценой ETH и примерами стоимости газа для транзакций Ethereum.'
    },
    'timestamp-converter': {
      title: 'Конвертер Unix времени (Timestamp)',
      description: 'Бесплатный конвертер Unix времени. Конвертируйте Unix timestamp в дату/время и обратно с отображением UTC/локального времени и оценкой времени блока.'
    },
    'unit-converter': {
      title: 'Конвертер крипто-единиц',
      description: 'Бесплатный конвертер крипто-единиц. Конвертируйте единицы для BTC, ETH, SOL и USDT, включая сатоши, gwei, lamport и микро-единицы.'
    },
    'exchange-fees': {
      title: 'Калькулятор торговых комиссий биржи',
      description: 'Бесплатный калькулятор торговых комиссий. Рассчитайте итоговую комиссию для любого объёма ордера с тарифами мейкер/тейкер на Binance, Bybit и OKX.'
    },
    'crypto-loan-calculator': {
      title: 'Калькулятор крипто-ссуд',
      description: 'Бесплатный калькулятор криптозаймов. Оцените сумму кредита, процентные расходы, порог маржин-колла и риск ликвидации для DeFi и CeFi кредитов.'
    },
    'vesting-calculator': {
      title: 'Калькулятор вестинга токенов',
      description: 'Бесплатный калькулятор вестинга. Визуализируйте графики разблокировки с периодами клиффа, TGE и ежемесячным или квартальным вестингом.'
    },
    'nft-profit-calculator': {
      title: 'Калькулятор прибыли NFT',
      description: 'Бесплатный калькулятор прибыли NFT. Рассчитайте реальную прибыль от торговли NFT после комиссий маркетплейса, роялти создателя и стоимости газа.'
    },
    'halving-calculator': {
      title: 'Калькулятор халвинга биткоина',
      description: 'Бесплатный калькулятор халвинга с живым обратным отсчётом. Узнайте, как следующий халвинг BTC повлияет на доход от майнинга, с историей и анализом цен.'
    },
    'mev-calculator': {
      title: 'Калькулятор защиты от MEV',
      description: 'Бесплатный калькулятор защиты от MEV. Оцените риск сэндвич- и фронтран-атак и потенциальную экономию от маршрутов с MEV-защитой по размеру свопа и slippage.'
    },
    'gamefi-calculator': {
      title: 'Калькулятор ROI в GameFi',
      description: 'Бесплатный калькулятор ROI в GameFi. Оцените срок окупаемости и годовой ROI для play-to-earn стратегий на основе стоимости настройки, наград и расходов.'
    },
    'node-calculator': {
      title: 'Калькулятор валидаторной ноды',
      description: 'Бесплатный калькулятор валидаторной ноды. Моделируйте экономику валидатора с учётом суммы стейка, APR, комиссии, аптайма и затрат на инфраструктуру.'
    },
    'salary-calculator': {
      title: 'Калькулятор зарплаты в криптовалюте',
      description: 'Бесплатный калькулятор криптозарплаты. Конвертируйте фиатную зарплату в BTC, ETH или USDT. Рассчитайте накопление крипто с частотой выплат и комиссиями.'
    },
    'inflation-hedge': {
      title: 'Калькулятор хеджирования инфляции',
      description: 'Бесплатный калькулятор хеджирования инфляции. Сравните крипто, стейблкоины, золото и S&P 500 с инфляцией в Турции, Аргентине, Нигерии, США и других странах.'
    },
    'calmar-calculator': {
      title: 'Калькулятор коэффициента Кальмара',
      description: 'Калькулятор коэффициента Кальмара: соотношение годовой доходности к максимальной просадке для сравнения стратегий с поправкой на риск.'
    },
    'compound-interest-calculator': {
      title: 'Калькулятор сложного процента для крипто',
      description: 'Бесплатный калькулятор сложного процента для стейкинга и фарминга. Узнайте, как ежедневное, еженедельное или ежемесячное начисление увеличивает ваши вложения.'
    },
    'drawdown-calculator': {
      title: 'Калькулятор восстановления после просадки',
      description: 'Калькулятор просадки портфеля: глубина drawdown, прирост для восстановления и расчётное время восстановления на основе месячной доходности.'
    },
    'gas-fee-calculator': {
      title: 'Калькулятор комиссии газа',
      description: 'Бесплатный калькулятор газа для Ethereum, Polygon, Arbitrum, Optimism, BNB Chain и других. Оцените стоимость свопов, переводов и минтинга.'
    },
    'information-ratio-calculator': {
      title: 'Калькулятор информационного коэффициента',
      description: 'Калькулятор информационного коэффициента: сравните активную доходность портфеля с бенчмарком через активный доход и tracking error.'
    },
    'kelly-calculator': {
      title: 'Калькулятор критерия Келли',
      description: 'Калькулятор критерия Келли: оптимальный размер позиции по винрейту и payoff ratio с моделями full, half и quarter Kelly.'
    },
    'leverage-calculator': {
      title: 'Калькулятор кредитного плеча',
      description: 'Бесплатный калькулятор плеча для крипто. Узнайте, как плечо усиливает прибыль и убытки, с расстоянием до ликвидации и таблицей PnL.'
    },
    'loan-calculator': {
      title: 'Калькулятор погашения криптозайма',
      description: 'Бесплатный калькулятор погашения криптозайма. Составьте график амортизации, рассчитайте ежемесячные платежи и отследите основной долг vs. проценты.'
    },
    'portfolio-calculator': {
      title: 'Калькулятор распределения портфеля',
      description: 'Бесплатный калькулятор распределения портфеля. Визуализируйте веса активов, задайте целевые доли и получите рекомендации по ребалансировке.'
    },
    'risk-of-ruin-calculator': {
      title: 'Калькулятор риска разорения',
      description: 'Калькулятор риска разорения: вероятность потери счёта по винрейту, соотношению риск/доходность и фиксированному риску на сделку.'
    },
    'sharpe-calculator': {
      title: 'Калькулятор коэффициента Шарпа',
      description: 'Бесплатный калькулятор коэффициента Шарпа. Оцените доходность портфеля с поправкой на риск, используя ожидаемый доход, волатильность и безрисковую ставку.'
    },
    'slippage-calculator': {
      title: 'Калькулятор проскальзывания DEX',
      description: 'Калькулятор проскальзывания DEX: оцените слиппидж свопа, минимальную получаемую сумму и полную стоимость исполнения на Uniswap.'
    },
    'sortino-calculator': {
      title: 'Калькулятор коэффициента Сортино',
      description: 'Бесплатный калькулятор коэффициента Сортино. Измерьте доходность портфеля с поправкой на нисходящую волатильность и сравните с коэффициентом Шарпа.'
    },
    'staking-rewards-calculator': {
      title: 'Калькулятор наград за стейкинг',
      description: 'Бесплатный калькулятор стейкинга. Оцените ежедневный, еженедельный и ежемесячный заработок для Ethereum, Solana, Polkadot, Cosmos и других PoS-монет.'
    },
    'trade-expectancy-calculator': {
      title: 'Калькулятор ожидания сделки',
      description: 'Бесплатный калькулятор математического ожидания сделки. Оцените преимущество стратегии и спрогнозируйте месячные результаты по винрейту и R-мультипликаторам.'
    },
    'treynor-calculator': {
      title: 'Калькулятор коэффициента Трейнора',
      description: 'Калькулятор коэффициента Трейнора: доходность на единицу рыночного риска (бета) и эффективность стратегии относительно безрисковой ставки.'
    },
    'var-calculator': {
      title: 'Калькулятор стоимости под риском (VaR)',
      description: 'Бесплатный VaR-калькулятор. Оцените нисходящий риск портфеля с параметрическим VaR и ожидаемым дефицитом (CVaR) на разных уровнях доверия.'
    },
    'bitcoin-unit-converter': {
      title: 'Конвертер единиц биткоина',
      description: 'Бесплатный конвертер единиц биткоина. Мгновенно переводите между BTC, mBTC, bits и сатоши с актуальным курсом в USD и справочной таблицей номиналов.'
    },
    'cross-chain-bridge-calculator': {
      title: 'Калькулятор кроссчейн-моста',
      description: 'Бесплатный калькулятор кроссчейн-моста. Оцените комиссию, время перевода и проскальзывание при переводе токенов между Ethereum, Arbitrum, Solana и 20+ сетями.'
    },
    'crypto-correlation-calculator': {
      title: 'Калькулятор корреляции криптовалют',
      description: 'Бесплатный калькулятор корреляции криптовалют. Измерьте ценовую корреляцию между любыми двумя криптовалютами и создайте диверсифицированный портфель.'
    },
    'crypto-index-fund-calculator': {
      title: 'Калькулятор крипто-индексного фонда',
      description: 'Бесплатный калькулятор крипто-индексного фонда. Создайте индекс по рыночной капитализации или равным весам и сравните доходность с BTC.'
    },
    'crypto-inheritance-calculator': {
      title: 'Калькулятор наследования криптовалют',
      description: 'Бесплатный калькулятор наследования криптовалют. Планируйте передачу цифровых активов: мультиподпись, налоги на наследство и распределение между наследниками.'
    },
    'crypto-portfolio-rebalance-calculator': {
      title: 'Калькулятор ребалансировки крипто-портфеля',
      description: 'Бесплатный калькулятор ребалансировки портфеля. Введите текущие активы и целевые доли, чтобы увидеть точные суммы покупки и продажи.'
    },
    'crypto-sentiment-calculator': {
      title: 'Калькулятор настроений крипторынка',
      description: 'Бесплатный калькулятор настроений крипторынка. Агрегирует индекс Fear & Greed, социальные объёмы и ставки фандинга в единый составной показатель.'
    },
    'defi-yield-aggregator': {
      title: 'Агрегатор доходности DeFi',
      description: 'Бесплатный агрегатор доходности DeFi. Сравните APY в реальном времени на Aave, Compound, Lido и 50+ протоколах. Фильтр по сети, активу и TVL.'
    },
    'dust-attack-calculator': {
      title: 'Калькулятор dust-атаки',
      description: 'Бесплатный калькулятор dust-атаки. Обнаруживайте мелкие нежелательные транзакции, оцените стоимость консолидации и защитите приватность в блокчейне.'
    },
    'exchange-fee-comparator': {
      title: 'Сравнение комиссий бирж',
      description: 'Бесплатное сравнение комиссий бирж. Сравните тарифы Binance, Coinbase, Kraken, OKX и Bybit для спота, фьючерсов и вывода средств бок о бок.'
    },
    'flash-loan-calculator': {
      title: 'Калькулятор флеш-займа',
      description: 'Бесплатный калькулятор флеш-займа. Оцените прибыльность с учётом комиссий протокола, газа и арбитражного спреда для Aave, dYdX и Uniswap.'
    },
    'gas-optimization-calculator': {
      title: 'Калькулятор оптимизации газа',
      description: 'Бесплатный калькулятор оптимизации газа. Найдите самое дешёвое время для транзакций в Ethereum и L2. Сравните стоимость газа по часам и экономьте.'
    },
    'governance-voting-calculator': {
      title: 'Калькулятор голосования DAO',
      description: 'Бесплатный калькулятор голосования DAO. Оцените силу голоса, требования кворума и влияние делегирования для предложений децентрализованного управления.'
    },
    'nft-rarity-calculator': {
      title: 'Калькулятор редкости NFT',
      description: 'Бесплатный калькулятор редкости NFT. Оцените редкость атрибутов методами статистической редкости, среднего признака и информационного содержания.'
    },
    'token-unlock-calculator': {
      title: 'Калькулятор разблокировки токенов',
      description: 'Бесплатный калькулятор разблокировки токенов. Отслеживайте предстоящие анлоки, оцените давление продаж и визуализируйте график вестинга любого проекта.'
    },
    'whale-alert-calculator': {
      title: 'Калькулятор китовых операций',
      description: 'Бесплатный калькулятор китовых операций. Оцените влияние крупных переводов, рассчитайте проскальзывание и настройте пороги оповещений.'
    },
    'arbitrage-calculator': {
      title: 'Калькулятор арбитража криптовалют',
      description: 'Рассчитайте прибыль от арбитража между биржами с учётом комиссий и стоимости вывода.'
    },
    'stock-to-flow-calculator': {
      title: 'Калькулятор Stock-to-Flow Bitcoin',
      description: 'Оцените дефицитность биткоина по модели S2F и сравните реальную цену с прогнозом модели.'
    },
    'options-calculator': {
      title: 'Калькулятор крипто-опционов',
      description: 'Рассчитайте P&L опционов, цену безубыточности и таблицу выплат для крипто-колов и путов.'
    },
    'tax-loss-harvesting-calculator': {
      title: 'Калькулятор сбора налоговых убытков',
      description: 'Определите убытки от криптовалют для компенсации прироста капитала и оценки налоговой экономии.'
    },
    'restaking-calculator': {
      title: 'Калькулятор рестейкинга',
      description: 'Оцените совокупную доходность от нативного стейкинга и рестейкинга через EigenLayer.'
    },
    'liquid-staking-calculator': {
      title: 'Калькулятор ликвидного стейкинга',
      description: 'Сравните протоколы ликвидного стейкинга — Lido, Rocket Pool, Coinbase, Frax — по доходности и комиссиям.'
    },
    'perpetual-futures-calculator': {
      title: 'Калькулятор бессрочных фьючерсов',
      description: 'Рассчитайте P&L бессрочных фьючерсов с плечом, стоимостью фандинга и ценой ликвидации.'
    },
    'payback-period-calculator': {
      title: 'Калькулятор срока окупаемости',
      description: 'Рассчитайте, через сколько времени криптоинвестиция окупится при ожидаемой доходности.'
    },
    'dva-calculator': {
      title: 'Калькулятор DVA',
      description: 'Сравните Dollar Value Averaging с DCA — DVA корректирует суммы инвестиций на основе динамики портфеля.'
    },
    'bitcoin-energy-calculator': {
      title: 'Калькулятор энергии Bitcoin',
      description: 'Оцените энергопотребление, углеродный след и экологическую стоимость майнинга биткоина.'
    },
    'on-chain-metrics-calculator': {
      title: 'Калькулятор ончейн-метрик',
      description: 'Анализируйте оценку биткоина по MVRV, NVT и SOPR — ончейн-сигналы перекупленности или недооценки.'
    },
    'grid-trading-calculator': {
      title: 'Калькулятор грид-трейдинга',
      description: 'Спланируйте стратегию грид-бота — рассчитайте прибыль на сетку и ожидаемую годовую доходность.'
    },
    'inheritance-tax-calculator': {
      title: 'Калькулятор налога на наследство криптовалют',
      description: 'Оцените налог на наследство криптоактивов в 8 странах с учётом льгот по степени родства.'
    },
    'validator-calculator': {
      title: 'Калькулятор экономики валидатора',
      description: 'Рассчитайте прибыльность PoS-валидатора — вознаграждения, операционные расходы, ROI для Ethereum, Solana и др.'
    },
    'token-valuation-calculator': {
      title: 'Калькулятор оценки токена',
      description: 'Анализируйте FDV токена, рыночную капитализацию, риск размытия и сравнивайте с проектами-аналогами.'
    },
    'if-i-had-bought': {
      title: 'Калькулятор «Если бы я купил»',
      description: 'Узнайте, сколько бы стоили ваши инвестиции сегодня, если бы вы купили Bitcoin, Ethereum или другие криптовалюты.'
    },
    'millionaire-calculator': {
      title: 'Калькулятор крипто-миллионера',
      description: 'Спланируйте путь к $1M — рассчитайте, сколько и как долго инвестировать для достижения цели.'
    },
    'pizza-day-calculator': {
      title: 'Калькулятор Дня пиццы Bitcoin',
      description: 'Рассчитайте текущую стоимость знаменитой покупки пиццы за 10 000 BTC и альтернативные издержки.'
    },
    'retirement-calculator': {
      title: 'Калькулятор пенсии / FIRE для криптовалют',
      description: 'Рассчитайте, сколько криптовалюты нужно для ранней пенсии. Число FIRE, рост портфеля и годы до финансовой независимости.'
    },
    'rainbow-chart-calculator': {
      title: 'Калькулятор радужной диаграммы Bitcoin',
      description: 'Определите, в какой зоне находится Bitcoin на логарифмической радужной диаграмме с 9 ценовыми полосами.'
    },
    'etf-fee-calculator': {
      title: 'Калькулятор комиссий Bitcoin ETF',
      description: 'Сравните расходы IBIT, FBTC, GBTC, ARKB, BITB и прямой покупки BTC. Узнайте, как комиссии влияют за 1–30 лет.'
    },
    'token-burn-calculator': {
      title: 'Калькулятор сжигания токенов',
      description: 'Анализируйте дефляционную экономику — скорость сжигания, сокращение предложения и влияние на капитализацию за 1–5 лет.'
    },
    'futures-basis-calculator': {
      title: 'Калькулятор базиса фьючерсов',
      description: 'Рассчитайте спред спот-фьючерс, годовую доходность carry-trade и прибыль cash-and-carry после комиссий.'
    },
    'defi-insurance-calculator': {
      title: 'Калькулятор страхования DeFi',
      description: 'Оцените, стоит ли страхование DeFi своей премии. Сравните застрахованные и незастрахованные сценарии и влияние на доходность.'
    },
    'mayer-multiple-calculator': {
      title: 'Калькулятор коэффициента Майера',
      description: 'Коэффициент Майера: цена BTC ÷ 200-дневная скользящая средняя. Выше 2,4 = историческая зона продажи; ниже 1,0 = недооценённая зона покупки.'
    },
    'geometric-mean-return-calculator': {
      title: 'Калькулятор геометрической средней доходности',
      description: 'Истинная сложная доходность vs арифметическая средняя. Раскрывает «волатильное проседание» для криптовалют и других волатильных активов.'
    },
    'mstr-mnav-calculator': {
      title: 'Калькулятор премии mNAV MicroStrategy',
      description: 'Калькулятор премии Bitcoin-treasury компаний (MSTR, MetaPlanet, Semler) над чистым BTC NAV. Выявляйте переоценку.'
    },
    'lightning-network-fee-calculator': {
      title: 'Калькулятор комиссий Lightning Network',
      description: 'Расчёт комиссий маршрутизации Lightning: base + ppm на хоп. Сравнение с on-chain Bitcoin комиссиями.'
    },
    'pumpfun-bonding-curve-calculator': {
      title: 'Калькулятор бондинг-кривой Pump.fun',
      description: 'Бондинг-кривая Pump.fun: токенов на инвестированный SOL, проскальзывание и расстояние до $69K для перехода на Raydium.'
    },
    'profit-factor-calculator': {
      title: 'Калькулятор фактора прибыли',
      description: 'Калькулятор Profit Factor для торговых систем. Отношение валовая прибыль / валовый убыток. Выше 1,5 = надёжное преимущество.'
    },
    'covered-call-calculator': {
      title: 'Калькулятор покрытого колла',
      description: 'Калькулятор покрытого колла для крипто-опционов. Доходность от премии, годовая доходность, безубыточность и риск исполнения.'
    },
    'iron-condor-calculator': {
      title: 'Калькулятор Iron Condor',
      description: 'Калькулятор многоногой опционной стратегии Iron Condor (4 ноги). Чистая премия, макс прибыль/убыток, точки безубыточности и payoff.'
    },
    'perpetual-funding-arbitrage-calculator': {
      title: 'Калькулятор арбитража фандинга бессрочных фьючерсов',
      description: 'Арбитраж фандинга: long спот + short перп = дельта-нейтральный сбор фандинга. APR, комиссии и точка безубыточности.'
    },
    'concentrated-liquidity-calculator': {
      title: 'Калькулятор концентрированной ликвидности (Uniswap V3)',
      description: 'Калькулятор Uniswap V3 концентрированной ликвидности: эффективность капитала, доход с комиссий, IL на границах диапазона.'
    },
    'looping-yield-calculator': {
      title: 'Калькулятор Looping / рекурсивного кредитования',
      description: 'DeFi looping: рекурсивное borrow → re-deposit для усиления доходности. Эффективное плечо, чистый APR и расстояние до ликвидации.'
    },
  },
};
