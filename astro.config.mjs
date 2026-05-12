// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

const ChangeFreq = {
  DAILY: ChangeFreqEnum.DAILY,
  WEEKLY: ChangeFreqEnum.WEEKLY,
  MONTHLY: ChangeFreqEnum.MONTHLY,
};

const NON_DEFAULT_LANGS = new Set(['es', 'pt', 'tr', 'hi', 'ru']);
// Mirror of SPEC_CALCULATOR_SLUGS in src/i18n/utils.ts (93 slugs).
// Keep this list in sync — it's used to filter out localized EN-slug aliases (e.g. /es/profit-calculator)
// from the sitemap, since they are noindex and canonical to the localized slug.
const SPEC_CALCULATOR_SLUGS = new Set([
  'converter',
  'profit-calculator',
  'mining-calculator',
  'dca-calculator',
  'tax-calculator',
  'what-if',
  'position-size-calculator',
  'liquidation-calculator',
  'funding-rate-calculator',
  'tp-sl-calculator',
  'margin-calculator',
  'pip-calculator',
  'break-even-calculator',
  'risk-reward-calculator',
  'staking-calculator',
  'impermanent-loss-calculator',
  'apy-apr-calculator',
  'yield-farming-calculator',
  'gas-calculator',
  'uniswap-calculator',
  'bridge-comparator',
  'lending-calculator',
  'gpu-mining-calculator',
  'asic-mining-calculator',
  'mining-roi-calculator',
  'electricity-cost-calculator',
  'difficulty-calculator',
  'hashrate-converter',
  'market-cap-calculator',
  'market-cap-comparator',
  'roi-calculator',
  'reverse-roi',
  'hodl-vs-trade',
  'rebalancing-calculator',
  'compound-calculator',
  'ico-roi-calculator',
  'airdrop-calculator',
  'satoshi-converter',
  'gwei-converter',
  'timestamp-converter',
  'unit-converter',
  'exchange-fees',
  'crypto-loan-calculator',
  'vesting-calculator',
  'nft-profit-calculator',
  'halving-calculator',
  'mev-calculator',
  'gamefi-calculator',
  'node-calculator',
  'salary-calculator',
  'inflation-hedge',
  'calmar-calculator',
  'compound-interest-calculator',
  'drawdown-calculator',
  'gas-fee-calculator',
  'information-ratio-calculator',
  'kelly-calculator',
  'leverage-calculator',
  'loan-calculator',
  'portfolio-calculator',
  'risk-of-ruin-calculator',
  'sharpe-calculator',
  'slippage-calculator',
  'sortino-calculator',
  'staking-rewards-calculator',
  'trade-expectancy-calculator',
  'treynor-calculator',
  'var-calculator',
  'bitcoin-unit-converter',
  'cross-chain-bridge-calculator',
  'crypto-correlation-calculator',
  'crypto-index-fund-calculator',
  'crypto-inheritance-calculator',
  'crypto-portfolio-rebalance-calculator',
  'crypto-sentiment-calculator',
  'defi-yield-aggregator',
  'dust-attack-calculator',
  'exchange-fee-comparator',
  'flash-loan-calculator',
  'gas-optimization-calculator',
  'governance-voting-calculator',
  'nft-rarity-calculator',
  'token-unlock-calculator',
  'whale-alert-calculator',
  'arbitrage-calculator',
  'stock-to-flow-calculator',
  'options-calculator',
  'tax-loss-harvesting-calculator',
  'restaking-calculator',
  'liquid-staking-calculator',
  'perpetual-futures-calculator',
  'payback-period-calculator',
  'dva-calculator',
  'bitcoin-energy-calculator',
  'on-chain-metrics-calculator',
  'grid-trading-calculator',
  'inheritance-tax-calculator',
  'validator-calculator',
  'token-valuation-calculator',
  'if-i-had-bought',
  'millionaire-calculator',
  'pizza-day-calculator',
  'retirement-calculator',
  'rainbow-chart-calculator',
  'etf-fee-calculator',
  'token-burn-calculator',
  'futures-basis-calculator',
  'defi-insurance-calculator',
  'mayer-multiple-calculator',
  'geometric-mean-return-calculator',
  'mstr-mnav-calculator',
  'lightning-network-fee-calculator',
  'pumpfun-bonding-curve-calculator',
  'profit-factor-calculator',
  'covered-call-calculator',
  'iron-condor-calculator',
  'perpetual-funding-arbitrage-calculator',
  'concentrated-liquidity-calculator',
  'looping-yield-calculator',
]);

// EN alias pages that have a canonical spec URL (kept for rich SEO content but not indexed separately)
const EN_ALIAS_SLUGS = new Set([
  'staking-rewards-calculator',
  'gas-fee-calculator',
  'compound-interest-calculator',
  'loan-calculator',
]);

/** @param {string} pageUrl */
function isLegacyLocalizedSpecUrl(pageUrl) {
  const { pathname } = new URL(pageUrl);
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2) return false;

  const [lang, slug] = segments;
  return NON_DEFAULT_LANGS.has(lang) && SPEC_CALCULATOR_SLUGS.has(slug);
}

/** @param {string} pageUrl */
function isAliasUrl(pageUrl) {
  const { pathname } = new URL(pageUrl);
  const segments = pathname.split('/').filter(Boolean);
  // EN alias: /staking-rewards-calculator
  if (segments.length === 1 && EN_ALIAS_SLUGS.has(segments[0])) return true;
  // Localized alias: /es/staking-rewards-calculator (exact EN slug under a lang prefix)
  if (segments.length === 2 && NON_DEFAULT_LANGS.has(segments[0]) && EN_ALIAS_SLUGS.has(segments[1])) return true;
  return false;
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap({
      filter: (pageUrl) => !isLegacyLocalizedSpecUrl(pageUrl) && !isAliasUrl(pageUrl),
      // Per-page priority + changefreq for crawl-budget hints.
      // Homepage = 1.0, top calc pages = 0.8, localized calc = 0.7, info = 0.5, others = 0.5.
      serialize(item) {
        const url = item.url;
        const path = url.replace(/^https?:\/\/[^/]+/, '');
        // Homepage (EN or localized)
        if (path === '/' || /^\/[a-z]{2}\/$/.test(path)) {
          item.priority = 1.0;
          item.changefreq = ChangeFreq.DAILY;
        }
        // Category hubs
        else if (path.includes('/calculators/')) {
          item.priority = 0.8;
          item.changefreq = ChangeFreq.WEEKLY;
        }
        // Top-tier EN calc pages (high-traffic, no /lang/ prefix)
        else if (/^\/[a-z][a-z0-9-]+-calculator\/$/.test(path) || /^\/(converter|hodl-vs-trade|what-if|inflation-hedge|exchange-fees|if-i-had-bought|reverse-roi|rainbow-chart-calculator|pizza-day-calculator|millionaire-calculator)\/$/.test(path)) {
          item.priority = 0.8;
          item.changefreq = ChangeFreq.WEEKLY;
        }
        // Localized calculator pages
        else if (/^\/[a-z]{2}\//.test(path)) {
          item.priority = 0.7;
          item.changefreq = ChangeFreq.WEEKLY;
        }
        // Info/legal pages
        else if (/(about|contact|privacy|terms|methodology|editorial-policy|updates)/.test(path)) {
          item.priority = 0.4;
          item.changefreq = ChangeFreq.MONTHLY;
        } else {
          item.priority = 0.6;
          item.changefreq = ChangeFreq.WEEKLY;
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split UI translation dictionaries into per-language chunks.
            // Each localized page loads only its language (~80KB instead of ~424KB).
            // EN pages load zero translation data (getUiString returns the key directly).
            if (id.includes('ui-strings/es')) return 'ui-strings-es';
            if (id.includes('ui-strings/pt')) return 'ui-strings-pt';
            if (id.includes('ui-strings/tr')) return 'ui-strings-tr';
            if (id.includes('ui-strings/hi')) return 'ui-strings-hi';
            if (id.includes('ui-strings/ru')) return 'ui-strings-ru';
            if (id.includes('ui-string-registry')) return 'ui-string-registry';
          },
        },
      },
    },
  },
  site: 'https://cryptocalk.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'tr', 'hi', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
