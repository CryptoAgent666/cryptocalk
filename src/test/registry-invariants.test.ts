import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  SPEC_CALCULATOR_SLUGS,
  NON_DEFAULT_LANGS,
  getLocalizedSlug,
  getCanonicalSlug,
} from '../i18n/utils';

/**
 * Cross-file consistency guards for the calculator registry.
 *
 * The slug registry is currently mirrored across several files that have no
 * import relationship (astro.config.mjs cannot import src/i18n/utils.ts because
 * the config is evaluated before the TS pipeline). Until a single-source
 * registry module exists, these tests are the sync mechanism: if any mirror
 * drifts, CI fails with the exact missing slugs.
 */

const ROOT = path.resolve(__dirname, '..', '..');

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf-8');
}

/** Extract quoted slugs from a delimited section of a source file. */
function slugsBetween(src: string, startMarker: string, endMarker: string): string[] {
  const start = src.indexOf(startMarker);
  expect(start, `marker "${startMarker}" not found`).toBeGreaterThan(-1);
  const end = src.indexOf(endMarker, start);
  expect(end, `marker "${endMarker}" not found after "${startMarker}"`).toBeGreaterThan(start);
  return [...src.slice(start, end).matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
}

function diff(a: Iterable<string>, b: Set<string>): string[] {
  return [...a].filter((x) => !b.has(x)).sort();
}

const SPEC_SET = new Set<string>(SPEC_CALCULATOR_SLUGS);

describe('calculator slug registry stays in sync across files', () => {
  it('astro.config.mjs SPEC_CALCULATOR_SLUGS matches src/i18n/utils.ts', () => {
    const config = read('astro.config.mjs');
    const configSlugs = slugsBetween(config, 'const SPEC_CALCULATOR_SLUGS', ']);');
    expect(diff(SPEC_SET, new Set(configSlugs)), 'slugs missing from astro.config.mjs').toEqual([]);
    expect(diff(configSlugs, SPEC_SET), 'stale slugs in astro.config.mjs').toEqual([]);
  });

  it('[...slug].astro ALIAS_DEFINITIONS covers every spec slug', () => {
    const route = read('src/pages/[lang]/[...slug].astro');
    const section = route.slice(route.indexOf('const ALIAS_DEFINITIONS'));
    const defined = new Set(
      [...section.matchAll(/^\s{2}'([a-z0-9-]+)':/gm)].map((m) => m[1]),
    );
    expect(diff(SPEC_SET, defined), 'slugs missing from ALIAS_DEFINITIONS').toEqual([]);
    expect(diff(defined, SPEC_SET), 'stale slugs in ALIAS_DEFINITIONS').toEqual([]);
  });

  it('every spec slug has a localized mapping for every non-default language', () => {
    const utils = read('src/i18n/utils.ts');
    const section = utils.slice(
      utils.indexOf('const LOCALIZED_SPEC_SLUGS'),
      utils.indexOf('const LOCALIZED_TO_BASE_SPEC_SLUGS'),
    );
    for (const lang of NON_DEFAULT_LANGS) {
      const langStart = section.search(new RegExp(`^\\s+${lang}: \\{`, 'm'));
      expect(langStart, `language block "${lang}" not found`).toBeGreaterThan(-1);
      const langEnd = section.indexOf('},', langStart);
      const keys = new Set(
        [...section.slice(langStart, langEnd).matchAll(/'([a-z0-9-]+)':/g)].map((m) => m[1]),
      );
      expect(diff(SPEC_SET, keys), `slugs missing localized mapping for "${lang}"`).toEqual([]);
    }
  });

  it('localized slugs round-trip back to their canonical slug', () => {
    // Alias calculators (see SLUG_ALIASES in Layout.astro) may share a localized
    // slug with their canonical counterpart. Known case: in `hi`,
    // gas-fee-calculator/gas-calculator and compound-interest-calculator/
    // compound-calculator collide on one localized slug, so the reverse lookup
    // returns the alias. Accepted while `hi` is fully noindexed (prune policy);
    // revisit if the locale is ever re-indexed.
    const ALIAS_TO_CANONICAL: Record<string, string> = {
      'gas-fee-calculator': 'gas-calculator',
      'staking-rewards-calculator': 'staking-calculator',
      'compound-interest-calculator': 'compound-calculator',
      'loan-calculator': 'crypto-loan-calculator',
    };
    const samePair = (a: string, b: string) =>
      a === b || ALIAS_TO_CANONICAL[a] === b || ALIAS_TO_CANONICAL[b] === a;
    for (const lang of NON_DEFAULT_LANGS) {
      for (const slug of SPEC_CALCULATOR_SLUGS) {
        const roundTripped = getCanonicalSlug(getLocalizedSlug(slug, lang), lang);
        expect(
          samePair(roundTripped, slug),
          `round-trip failed for ${slug} (${lang}): got ${roundTripped}`,
        ).toBe(true);
      }
    }
  });

  it('EN_ALIAS_SLUGS in astro.config.mjs matches SLUG_ALIASES in Layout.astro', () => {
    const config = read('astro.config.mjs');
    const layout = read('src/layouts/Layout.astro');
    const configAliases = new Set(slugsBetween(config, 'const EN_ALIAS_SLUGS', ']);'));
    // SLUG_ALIASES maps alias -> canonical; its keys are the alias slugs.
    const aliasSection = layout.slice(
      layout.indexOf('const SLUG_ALIASES'),
      layout.indexOf('};', layout.indexOf('const SLUG_ALIASES')),
    );
    const layoutKeys = new Set([...aliasSection.matchAll(/'([a-z0-9-]+)':/g)].map((m) => m[1]));
    expect(diff(configAliases, layoutKeys), 'aliases in astro.config but not Layout').toEqual([]);
    expect(diff(layoutKeys, configAliases), 'aliases in Layout but not astro.config').toEqual([]);
  });
});

/**
 * The /{lang}/{en-slug} alias pages under src/pages/[lang]/ are a frozen legacy
 * of the original slug migration. Calculators added after the migration get
 * localized slugs only (served by [...slug].astro); creating a new EN-slug page
 * under [lang]/ would put a noindex'd URL into the sitemap. This list must
 * never grow — shrinking it (deleting legacy aliases) is fine.
 */
const FROZEN_LEGACY_ALIAS_PAGES = new Set([
  'airdrop-calculator', 'apy-apr-calculator', 'arbitrage-calculator', 'asic-mining-calculator',
  'bitcoin-energy-calculator', 'break-even-calculator', 'bridge-comparator', 'calmar-calculator',
  'compound-calculator', 'compound-interest-calculator', 'converter', 'crypto-loan-calculator',
  'dca-calculator', 'difficulty-calculator', 'drawdown-calculator', 'dva-calculator',
  'electricity-cost-calculator', 'exchange-fees', 'funding-rate-calculator', 'gamefi-calculator',
  'gas-calculator', 'gas-fee-calculator', 'gpu-mining-calculator', 'grid-trading-calculator',
  'gwei-converter', 'halving-calculator', 'hashrate-converter', 'hodl-vs-trade',
  'ico-roi-calculator', 'if-i-had-bought', 'impermanent-loss-calculator', 'inflation-hedge',
  'information-ratio-calculator', 'inheritance-tax-calculator', 'kelly-calculator',
  'lending-calculator', 'leverage-calculator', 'liquid-staking-calculator',
  'liquidation-calculator', 'loan-calculator', 'margin-calculator', 'market-cap-calculator',
  'market-cap-comparator', 'mev-calculator', 'millionaire-calculator', 'mining-calculator',
  'mining-roi-calculator', 'nft-profit-calculator', 'node-calculator',
  'on-chain-metrics-calculator', 'options-calculator', 'payback-period-calculator',
  'perpetual-futures-calculator', 'pip-calculator', 'pizza-day-calculator',
  'portfolio-calculator', 'position-size-calculator', 'profit-calculator',
  'rebalancing-calculator', 'restaking-calculator', 'reverse-roi', 'risk-of-ruin-calculator',
  'risk-reward-calculator', 'roi-calculator', 'salary-calculator', 'satoshi-converter',
  'sharpe-calculator', 'slippage-calculator', 'sortino-calculator', 'staking-calculator',
  'staking-rewards-calculator', 'stock-to-flow-calculator', 'tax-calculator',
  'tax-loss-harvesting-calculator', 'timestamp-converter', 'token-valuation-calculator',
  'tp-sl-calculator', 'trade-expectancy-calculator', 'treynor-calculator',
  'uniswap-calculator', 'unit-converter', 'validator-calculator', 'var-calculator',
  'vesting-calculator', 'what-if', 'yield-farming-calculator',
]);

describe('legacy EN-slug alias pages stay frozen', () => {
  it('no new /{lang}/{en-slug}.astro page is added for a spec calculator', () => {
    const files = fs
      .readdirSync(path.join(ROOT, 'src', 'pages', '[lang]'))
      .filter((f) => f.endsWith('.astro'))
      .map((f) => f.replace(/\.astro$/, ''));
    const aliasPages = files.filter((f) => SPEC_SET.has(f));
    const newcomers = aliasPages.filter((f) => !FROZEN_LEGACY_ALIAS_PAGES.has(f)).sort();
    expect(
      newcomers,
      'New [lang]/<en-slug>.astro alias pages are forbidden — new calculators are served by [...slug].astro with localized slugs only',
    ).toEqual([]);
  });
});
