// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const NON_DEFAULT_LANGS = new Set(['es', 'pt', 'tr', 'hi', 'ru']);
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
      // Exclude legacy localized calculator URLs (e.g. /es/profit-calculator)
      // and EN alias pages that canonical to a spec URL (e.g. /staking-rewards-calculator → /staking-calculator).
      filter: (pageUrl) => !isLegacyLocalizedSpecUrl(pageUrl) && !isAliasUrl(pageUrl),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
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
