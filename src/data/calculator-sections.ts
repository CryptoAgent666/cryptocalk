/**
 * Controls which SEO sections are rendered for each calculator.
 * Defaults to all 10 sections when a slug is not listed.
 *
 * Section order matches the render order in LocalizedCalculatorPage.astro:
 * how → inputs → interpret → scenarios → checklist → mistakes →
 * benchmarks → execution → hygiene → validation
 */
export type SeoSection =
  | 'how'
  | 'inputs'
  | 'interpret'
  | 'scenarios'
  | 'checklist'
  | 'mistakes'
  | 'benchmarks'
  | 'execution'
  | 'hygiene'
  | 'validation'
  | 'faq'
  | 'related';

export const ALL_SECTIONS: SeoSection[] = [
  'how', 'inputs', 'interpret', 'scenarios', 'checklist',
  'mistakes', 'benchmarks', 'execution', 'hygiene', 'validation',
  'faq', 'related',
];

/**
 * Reduced section sets for calculators where generic sections
 * like "capital deployment validation" or "execution templates" are irrelevant.
 */
export const CALCULATOR_SECTIONS: Partial<Record<string, SeoSection[]>> = {
  // --- Converters: no risk/validation/benchmarks context ---
  'converter':           ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'satoshi-converter':   ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'gwei-converter':      ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'hashrate-converter':  ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'timestamp-converter': ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'unit-converter':      ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],

  // --- Tax calculators: compliance context; no execution/hygiene templates ---
  'tax-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],
  'airdrop-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],
  'salary-calculator':   ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],
  'vesting-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],

  // --- Simple informational tools ---
  'halving-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'market-cap-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'market-cap-comparator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'difficulty-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],

  // --- Mining: physical/operational context; all sections relevant ---
  'mining-calculator':            ALL_SECTIONS,
  'gpu-mining-calculator':        ALL_SECTIONS,
  'asic-mining-calculator':       ALL_SECTIONS,
  'mining-roi-calculator':        ALL_SECTIONS,
  'electricity-cost-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'faq', 'related'],

  // --- Gas/fee tools: transactional, not investment ---
  'gas-calculator':      ['how', 'inputs', 'interpret', 'mistakes', 'faq', 'related'],
  'exchange-fees':       ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'bridge-comparator':   ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'slippage-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],
  'mev-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],

  // --- DeFi tools: full set except execution templates ---
  'staking-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene', 'validation', 'faq', 'related'],
  'impermanent-loss-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene', 'faq', 'related'],
  'apy-apr-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'mistakes', 'faq', 'related'],
  'compound-calculator':         ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'faq', 'related'],
  'yield-farming-calculator':    ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene', 'faq', 'related'],
  'uniswap-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'faq', 'related'],
  'lending-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'faq', 'related'],
  'node-calculator':             ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'faq', 'related'],
  'crypto-loan-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene', 'faq', 'related'],
};

export function getActiveSections(slug: string): SeoSection[] {
  return CALCULATOR_SECTIONS[slug] ?? ALL_SECTIONS;
}
