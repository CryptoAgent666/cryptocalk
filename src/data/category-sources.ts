// Category → authoritative external sources (E-E-A-T). Shared by the localized
// calculator template and the standalone EN pages (AuthoritativeSources.astro).
export const CATEGORY_SOURCES: Record<string, { name: string; url: string; note: string }[]> = {
  'tax-reporting': [
    { name: 'IRS — Virtual Currency Transactions FAQ', url: 'https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions', note: 'US official crypto tax guidance' },
    { name: 'IRS Notice 2014-21', url: 'https://www.irs.gov/pub/irs-drop/n-14-21.pdf', note: 'Foundational US tax treatment of crypto' },
    { name: 'HMRC — Cryptoassets Manual', url: 'https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual', note: 'UK official crypto tax guidance' },
  ],
  'mining': [
    { name: 'IRS — Mining Income Guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax treatment of mining rewards' },
    { name: 'US Energy Information Admin (EIA)', url: 'https://www.eia.gov/electricity/', note: 'Electricity rate data' },
  ],
  'defi-yield': [
    { name: 'IRS — Digital Assets Guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax treatment of staking and DeFi yields' },
    { name: 'SEC — DeFi Statement', url: 'https://www.sec.gov/news/statement/peirce-defi-2021-11-09', note: 'US securities perspective on DeFi' },
  ],
  'trading-tools': [
    { name: 'CFTC — Bitcoin & Virtual Currencies', url: 'https://www.cftc.gov/bitcoin/index.htm', note: 'US derivatives regulator on crypto' },
    { name: 'SEC — Investor Alerts on Crypto', url: 'https://www.sec.gov/investor/alerts', note: 'Risk warnings for crypto trading' },
  ],
  'investment': [
    { name: 'SEC — Investor.gov on Crypto', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/cryptocurrency', note: 'US investor education on crypto' },
    { name: 'US Treasury — Tokenization', url: 'https://home.treasury.gov/news/press-releases/jy2454', note: 'US Treasury on tokenized assets / RWA' },
    { name: 'IRS — Digital Assets', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax basis for crypto investments' },
  ],
  'profit-loss': [
    { name: 'IRS — Capital Gains and Losses', url: 'https://www.irs.gov/taxtopics/tc409', note: 'US capital gains rules for crypto' },
    { name: 'IRS — Digital Assets', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'Crypto tax basis tracking' },
  ],
  'gas-fees': [
    { name: 'Etherscan Gas Tracker', url: 'https://etherscan.io/gastracker', note: 'Live Ethereum gas reference' },
    { name: 'Federal Reserve — Faster Payments', url: 'https://www.federalreserve.gov/paymentsystems.htm', note: 'US central bank on transaction systems' },
  ],
  'converters': [
    { name: 'CoinGecko — Crypto Data', url: 'https://www.coingecko.com/en/api', note: 'Cryptocurrency market data source' },
    { name: 'Federal Reserve — FX Rates', url: 'https://www.federalreserve.gov/releases/h10/current/', note: 'US central bank FX reference' },
  ],
};
