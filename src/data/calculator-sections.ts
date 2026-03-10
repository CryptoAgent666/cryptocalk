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
  'converter':           ['how', 'inputs', 'interpret', 'mistakes'],
  'satoshi-converter':   ['how', 'inputs', 'interpret', 'mistakes'],
  'gwei-converter':      ['how', 'inputs', 'interpret', 'mistakes'],
  'hashrate-converter':  ['how', 'inputs', 'interpret', 'mistakes'],
  'timestamp-converter': ['how', 'inputs', 'interpret', 'mistakes'],
  'unit-converter':      ['how', 'inputs', 'interpret', 'mistakes'],

  // --- Tax calculators: compliance context; no execution/hygiene templates ---
  'tax-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],
  'airdrop-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],
  'salary-calculator':   ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],
  'vesting-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],

  // --- Simple informational tools ---
  'halving-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'market-cap-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'market-cap-comparator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'difficulty-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],

  // --- Mining: physical/operational context; all sections relevant ---
  'mining-calculator':            ALL_SECTIONS,
  'gpu-mining-calculator':        ALL_SECTIONS,
  'asic-mining-calculator':       ALL_SECTIONS,
  'mining-roi-calculator':        ALL_SECTIONS,
  'electricity-cost-calculator':  ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks'],

  // --- Gas/fee tools: transactional, not investment ---
  'gas-calculator':      ['how', 'inputs', 'interpret', 'mistakes'],
  'exchange-fees':       ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'bridge-comparator':   ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'slippage-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],
  'mev-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],

  // --- DeFi tools: full set except execution templates ---
  'staking-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene', 'validation'],
  'impermanent-loss-calculator': ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene'],
  'apy-apr-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'mistakes'],
  'compound-calculator':         ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks'],
  'yield-farming-calculator':    ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene'],
  'uniswap-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes'],
  'lending-calculator':          ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks'],
  'node-calculator':             ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks'],
  'crypto-loan-calculator':      ['how', 'inputs', 'interpret', 'scenarios', 'checklist', 'mistakes', 'benchmarks', 'hygiene'],
};

export function getActiveSections(slug: string): SeoSection[] {
  return CALCULATOR_SECTIONS[slug] ?? ALL_SECTIONS;
}
