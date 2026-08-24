// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Phase-1 prune: pathnames to drop from the sitemap (also noindexed in Layout.astro). See DATA_HUB/_cryptocalk_prune_set.py.
const PRUNE_NOINDEX = new Set(
  JSON.parse(fs.readFileSync(new URL('./src/data/prune-noindex.json', import.meta.url), 'utf-8')).paths,
);
/** @param {string} pageUrl */
function isPrunedUrl(pageUrl) {
  let { pathname } = new URL(pageUrl);
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  return PRUNE_NOINDEX.has(pathname);
}

// Honest per-URL <lastmod> (2026-08-23). Parsed — not imported — from the two TS modules that
// already hold the truth, so the sitemap cannot drift from what the pages themselves render:
//   src/data/calculator-updated.ts  slug -> real last content/logic change date (from git)
//   src/i18n/utils.ts               LOCALIZED_SPEC_SLUGS: lang -> baseSlug -> localized slug
// Omitting lastmod (the state since the June fake-freshness fix) threw away a real crawl-scheduling
// signal along with the fake one; stamping the build date would bring the fake one back.
const UPDATED_BY_SLUG = (() => {
  const src = fs.readFileSync(new URL('./src/data/calculator-updated.ts', import.meta.url), 'utf-8');
  /** @type {Record<string,string>} */
  const map = {};
  for (const m of src.matchAll(/"([^"]+)":\s*"(\d{4}-\d{2}-\d{2})"/g)) map[m[1]] = m[2];
  return map;
})();

/** lang -> localized slug -> base slug */
const BASE_SLUG_BY_LOCALIZED = (() => {
  const src = fs.readFileSync(new URL('./src/i18n/utils.ts', import.meta.url), 'utf-8');
  const block = src.slice(src.indexOf('const LOCALIZED_SPEC_SLUGS'));
  /** @type {Record<string, Record<string,string>>} */
  const out = {};
  let lang = null;
  for (const line of block.split('\n')) {
    const langMatch = line.match(/^\s{4}(es|pt|tr|hi|ru):\s*\{/);
    if (langMatch) { lang = langMatch[1]; out[lang] = {}; continue; }
    if (/^\s{4}\},?\s*$/.test(line)) { lang = null; continue; }
    const pair = lang ? line.match(/'([^']+)':\s*'([^']+)'/) : null;
    if (lang && pair) out[lang][pair[2]] = pair[1];
    if (line.startsWith('};')) break;
  }
  return out;
})();

/** category slug -> newest CALCULATOR_UPDATED date among the tools that hub lists */
const HUB_UPDATED = (() => {
  const src = fs.readFileSync(new URL('./src/data/category-hubs.ts', import.meta.url), 'utf-8');
  /** @type {Record<string,string>} */
  const out = {};
  let slug = null;
  for (const line of src.split('\n')) {
    const s = line.match(/^\s{4}slug:\s*'([a-z0-9-]+)'/);
    if (s) { slug = s[1]; continue; }
    const h = slug ? line.match(/href:\s*'\/([a-z0-9-]+)\/?'/) : null;
    if (slug && h) {
      const d = UPDATED_BY_SLUG[h[1]];
      if (d && (!out[slug] || d > out[slug])) out[slug] = d;
    }
  }
  return out;
})();

/**
 * Real last-modified date for a sitemap URL, or null when we have no honest date for it —
 * an omitted lastmod is valid; an invented one is not.
 * @param {string} path
 */
function lastmodFor(path) {
  // Cyrillic slugs arrive percent-encoded in the sitemap; the slug tables hold them decoded.
  const parts = path
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean)
    .map((seg) => {
      try { return decodeURIComponent(seg); } catch { return seg; }
    });
  let lang = 'en';
  if (parts.length && NON_DEFAULT_LANGS.has(parts[0])) lang = parts.shift() ?? 'en';
  if (parts.length === 0) return UPDATED_BY_SLUG['index'] ?? null;
  // /calculators/<category>/ (EN and localized): the hub is as fresh as the newest
  // calculator it lists — the same date its CollectionPage schema reports.
  if (parts.length === 2 && parts[0] === 'calculators') return HUB_UPDATED[parts[1]] ?? null;
  if (parts.length > 1) return null;
  const slug = parts[0];
  const base = lang === 'en' ? slug : (BASE_SLUG_BY_LOCALIZED[lang]?.[slug] ?? slug);
  return UPDATED_BY_SLUG[base] ?? null;
}

const NON_DEFAULT_LANGS = new Set(['es', 'pt', 'tr', 'hi', 'ru']);
// Mirror of SPEC_CALCULATOR_SLUGS in src/i18n/utils.ts.
// Kept in sync by src/test/registry-invariants.test.ts (CI fails on drift).
// Used to filter out localized EN-slug aliases (e.g. /es/profit-calculator)
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
  'depin-earnings-calculator',
  'lp-value-calculator',
  'trailing-stop-loss-calculator',
  'rwa-yield-calculator',
  'polymarket-odds-calculator',
  'crypto-card-cashback-calculator',
  'mining-coin-switcher-calculator',
  'ai-token-sector-calculator',
  'wallet-net-worth-calculator',
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
      filter: (pageUrl) => !isLegacyLocalizedSpecUrl(pageUrl) && !isAliasUrl(pageUrl) && !isPrunedUrl(pageUrl),
      // Only <lastmod>, and only where a real date exists. `priority` and `changefreq` were
      // dropped on 2026-08-23: Google ignores both, and hand-tuned crawl-budget hints on a site
      // this size were pure noise. The date is the same honest per-slug value the page renders
      // in its schema dateModified and byline — see lastmodFor() above.
      serialize(item) {
        const path = item.url.replace(/^https?:\/\/[^/]+/, '');
        delete item.priority;
        delete item.changefreq;
        const lastmod = lastmodFor(path);
        if (lastmod) item.lastmod = `${lastmod}T00:00:00+00:00`;
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
