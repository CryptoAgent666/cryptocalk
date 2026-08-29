/**
 * Build-time view over `regulatory-constants.canonical.json` for /methodology/.
 *
 * The ledger already records, per constant, the source it was verified against and when. That was
 * only ever an internal audit artifact; nothing on the site showed it, so the editorial claim
 * "primary sources only" had no visible evidence behind it — and, where a jurisdiction is in fact
 * still pinned to a secondary tax guide, no visible correction either. This module surfaces both.
 *
 * Source tiers are derived from the host, never asserted by hand:
 *   gov      — a tax authority, ministry or statute database
 *   protocol — the chain's own spec, client source or improvement proposal
 *   secondary— a tax-guide/news article: usable as a tripwire, not as a source of record
 */
import ledger from './regulatory-constants.canonical.json';

export type SourceTier = 'gov' | 'protocol' | 'secondary' | 'market';

interface RawConstant {
  id: string;
  calculator: string;
  key: string;
  value: unknown;
  unit?: string | null;
  jurisdiction?: string | null;
  law?: string | null;
  is_regulatory?: boolean;
  last_updated_hint?: string | null;
  source_url?: string | null;
  status?: string;
  notes?: string | null;
}

const CONSTANTS = (ledger as { constants: RawConstant[] }).constants;

const GOV_HOSTS = [
  '.gov', '.gob.', '.gc.ca', '.go.jp', 'europa.eu',
  'gesetze-im-internet.de', 'belastingdienst.nl', 'planalto.gov.br',
  'laws-lois.justice.gc.ca', 'agenciatributaria', 'portaldasfinancas',
  'canada.ca', 'hmrc.', 'nta.go.jp',
];
const PROTOCOL_HOSTS = [
  'github.com/bitcoin', 'zips.z.cash', 'ecips.ethereumclassic.org', 'docs.dash.org',
  'docs.ergoplatform.com', 'ethereum.org', 'build.avax.network', 'api.kaspa.org',
  'raw.githubusercontent.com',
];

export function tierOf(url: string | null | undefined, isRegulatory = true): SourceTier {
  // A value with no statutory or protocol source that is not a regulatory constant is a market
  // input, not an under-sourced law — calling it "secondary" would be a false accusation.
  if (!url) return isRegulatory ? 'secondary' : 'market';
  const u = url.toLowerCase();
  if (GOV_HOSTS.some((h) => u.includes(h))) return 'gov';
  if (PROTOCOL_HOSTS.some((h) => u.includes(h))) return 'protocol';
  return 'secondary';
}

export const TIER_LABEL: Record<SourceTier, string> = {
  gov: 'Government / statute',
  protocol: 'Protocol spec or client source',
  secondary: 'Secondary guide — queued for re-verification',
  market: 'Live market data or model assumption — not a legal or protocol constant',
};

function hostOf(url: string | null | undefined): string {
  if (!url) return '\u2014';
  try {
    const u = new URL(url);
    // raw.githubusercontent.com/bitcoin/bitcoin/... reads as noise; name the repo instead.
    if (u.host === 'raw.githubusercontent.com') {
      const [org, repo] = u.pathname.split('/').filter(Boolean);
      return org && repo ? `github.com/${org}/${repo}` : u.host;
    }
    return u.host.replace(/^www\./, '');
  } catch { return url; }
}

/** Only ISO dates are shown. Free-text hints ("2025/26", "updated Oct 2024 Budget") are not dates. */
function isoDate(hint: string | null | undefined): string | null {
  return hint && /^\d{4}-\d{2}-\d{2}$/.test(hint) ? hint : null;
}

/** Units in the ledger are free text ("percent", "JPY_per_year", "BTC per block"). Render the ones
 *  that read as a unit next to the number; skip the ones that are really notes. */
const CURRENCY_SIGN: Record<string, string> = { USD: '$', EUR: '\u20ac', GBP: '\u00a3', JPY: '\u00a5', KRW: '\u20a9' };

function withUnit(value: string, unit: string | null | undefined): string {
  if (!unit || !/^[\d.,\s]+$/.test(value)) return value;   // only decorate a bare number
  if (unit.startsWith('percent') || unit.startsWith('%')) return `${value}%`;
  const cur = unit.split('_')[0];
  if (CURRENCY_SIGN[cur]) {
    const suffix = unit.includes('_per_year') ? ' / year' : unit.includes('_per_person') ? ' / person' : '';
    return `${CURRENCY_SIGN[cur]}${value}${suffix}`;
  }
  if (/^[A-Z]{2,5}$/.test(unit)) return `${value} ${unit}`;   // BTC, ETH, AVAX…
  if (unit === 'satoshis' || unit === 'days' || unit === 'seconds' || unit === 'block height') return `${value} ${unit}`;
  return value;
}

/**
 * Ledger values are heterogeneous: plain numbers, "546 satoshis", and whole bracket tables stored
 * as JSON. Dumping truncated JSON into a table cell is noise, so structured values are summarised
 * by shape and plain numbers get thousands separators.
 */
function shortValue(v: unknown, key = ''): string {
  const raw = typeof v === 'string' ? v.trim() : JSON.stringify(v);
  const noun = /brackets?$/i.test(key) ? 'brackets' : /rates?$/i.test(key) ? 'bands' : 'entries';

  if (raw.startsWith('[')) {
    try {
      const arr = JSON.parse(raw.replace(/'/g, '"'));
      if (Array.isArray(arr)) return `${arr.length} ${noun}`;
    } catch { /* fall through to truncation */ }
    const rows = (raw.match(/\{/g) || []).length;
    if (rows > 1) return `${rows} ${noun}`;
  }
  if (raw.startsWith('{')) return 'table of values';

  // "1050000" -> "1,050,000"; "3.125 BTC" and "546 satoshis" are left alone apart from the number
  const num = raw.match(/^(\d{4,})(\s.*)?$/);
  if (num) return Number(num[1]).toLocaleString('en-US') + (num[2] ?? '');

  return raw.length > 70 ? `${raw.slice(0, 67)}…` : raw;
}

const JURISDICTION_NAMES: Record<string, string> = {
  AT: 'Austria', AU: 'Australia', BR: 'Brazil', CA: 'Canada', CH: 'Switzerland',
  DE: 'Germany', ES: 'Spain', FR: 'France', IN: 'India', IT: 'Italy', JP: 'Japan',
  KR: 'South Korea', NL: 'Netherlands', PL: 'Poland', PT: 'Portugal',
  UK: 'United Kingdom', US: 'United States',
};

export interface JurisdictionRow {
  code: string;
  name: string;
  /** number of tracked constants for this jurisdiction */
  tracked: number;
  /** the headline rule this jurisdiction is modelled by */
  headline: string;
  sourceUrl: string | null;
  sourceHost: string;
  tier: SourceTier;
  /** every distinct source host backing this jurisdiction, strongest tier first */
  sources: Array<{ host: string; url: string; tier: SourceTier }>;
  /** e.g. "2 statute · 1 secondary" — a jurisdiction is rarely uniform */
  tierSummary: string;
  verified: string | null;
}

const HEADLINE_PRIORITY = ['.flat_rate', '.brackets', '.longTermThreshold', '.iht_rate', '.estate_tax_rate'];

export const JURISDICTION_ROWS: JurisdictionRow[] = (() => {
  const byCode = new Map<string, RawConstant[]>();
  for (const c of CONSTANTS) {
    const j = (c.jurisdiction || '').trim();
    if (!c.is_regulatory || !JURISDICTION_NAMES[j]) continue;
    if (c.status === 'removed') continue;
    (byCode.get(j) ?? byCode.set(j, []).get(j)!).push(c);
  }
  return [...byCode.entries()]
    .map(([code, list]) => {
      const headline =
        HEADLINE_PRIORITY.map((suffix) => list.find((c) => c.key.endsWith(suffix))).find(Boolean) ?? list[0];
      const dates = list.map((c) => isoDate(c.last_updated_hint)).filter(Boolean) as string[];
      const ORDER: SourceTier[] = ['gov', 'protocol', 'secondary', 'market'];
      const seen = new Map<string, { host: string; url: string; tier: SourceTier }>();
      for (const c of list) {
        if (!c.source_url) continue;
        const host = hostOf(c.source_url);
        if (!seen.has(host)) seen.set(host, { host, url: c.source_url, tier: tierOf(c.source_url) });
      }
      const sources = [...seen.values()].sort((a, b) => ORDER.indexOf(a.tier) - ORDER.indexOf(b.tier));
      const counts = list.reduce<Record<SourceTier, number>>(
        (acc, c) => { acc[tierOf(c.source_url)] += 1; return acc; },
        { gov: 0, protocol: 0, secondary: 0, market: 0 },
      );
      const SHORT: Record<SourceTier, string> = { gov: 'statute', protocol: 'protocol', secondary: 'secondary', market: 'market' };
      const tierSummary = ORDER.filter((t) => counts[t] > 0).map((t) => `${counts[t]} ${SHORT[t]}`).join(' · ');
      return {
        code,
        name: JURISDICTION_NAMES[code],
        tracked: list.length,
        headline: (headline.law || headline.key).replace(/\s+/g, ' ').trim(),
        sourceUrl: headline.source_url ?? null,
        sourceHost: hostOf(headline.source_url),
        // The jurisdiction is only as strong as its weakest source of record.
        tier: counts.secondary > 0 ? 'secondary' : (counts.gov > 0 ? 'gov' : 'protocol'),
        sources,
        tierSummary,
        verified: dates.length ? dates.sort().slice(-1)[0] : null,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
})();

export interface ProtocolRow {
  what: string;
  value: string;
  sourceUrl: string | null;
  sourceHost: string;
  tier: SourceTier;
  verified: string | null;
}

/** A hand-picked set of protocol facts that people actually ask an AI assistant about. */
const PROTOCOL_KEYS: Array<[idFragment: string, label: string]> = [
  ['NETWORK_DATA.BTC.blockReward', 'Bitcoin block subsidy'],
  ['CURRENT_REWARD', 'Bitcoin block subsidy (halving model)'],
  ['NEXT_HALVING_BLOCK', 'Next Bitcoin halving block'],
  ['avgDustSats', 'Bitcoin dust relay threshold'],
  ['NETWORKS.ethereum.minStake', 'Ethereum validator activation balance'],
  ['NETWORKS.avalanche.minStake', 'Avalanche Primary Network validator minimum'],
  ['NETWORK_DATA.ZEC.blockReward', 'Zcash miner block reward'],
  ['NETWORK_DATA.DASH.blockReward', 'Dash miner block reward'],
];

export const PROTOCOL_ROWS: ProtocolRow[] = PROTOCOL_KEYS.flatMap(([frag, label]) => {
  const c = CONSTANTS.find((x) => x.id.includes(frag) || x.key === frag);
  if (!c || c.status === 'removed') return [];
  return [{
    what: label,
    value: withUnit(shortValue(c.value, c.key), c.unit),
    sourceUrl: c.source_url ?? null,
    sourceHost: hostOf(c.source_url),
    tier: tierOf(c.source_url, c.is_regulatory !== false),
    verified: isoDate(c.last_updated_hint),
  }];
});

export const LEDGER_STATS = {
  total: CONSTANTS.length,
  regulatory: CONSTANTS.filter((c) => c.is_regulatory).length,
  jurisdictions: JURISDICTION_ROWS.length,
  /** jurisdictions where EVERY tracked value is backed by a statute/authority page */
  govBacked: JURISDICTION_ROWS.filter((r) => r.tier === 'gov').length,
  /** jurisdictions with at least one value still pinned to a secondary guide */
  secondaryBacked: JURISDICTION_ROWS.filter((r) => r.tier === 'secondary').length,
};

/* ── Per-calculator view ─────────────────────────────────────────────────────
 * Used by <DataVerification>. Until now the ledger's per-value source and
 * verification date lived only in an internal JSON file: a reader had no way to see
 * that "Portugal 28%" was read out of the Código do IRS on a specific date. Surfacing
 * it also makes page freshness honest — when a value is re-verified, the block on the
 * page changes, so the page's dateModified moves because the page really changed.
 */

/** React component name in the ledger -> EN page slug. */
export const LEDGER_COMPONENT_BY_SLUG: Record<string, string> = {
  'tax-calculator': 'TaxCalculator',
  'inheritance-tax-calculator': 'InheritanceTaxCalculator',
  'crypto-inheritance-calculator': 'CryptoInheritanceCalculator',
  'tax-loss-harvesting-calculator': 'TaxLossHarvestingCalculator',
  'airdrop-calculator': 'AirdropCalculator',
  'asic-mining-calculator': 'AsicMiningCalculator',
  'gpu-mining-calculator': 'GpuMiningCalculator',
  'mining-calculator': 'MiningCalculator',
  'mining-coin-switcher-calculator': 'MiningCoinSwitcherCalculator',
  'bitcoin-energy-calculator': 'BitcoinEnergyCalculator',
  'halving-calculator': 'HalvingCalculator',
  'difficulty-calculator': 'DifficultyEstimatorCalculator',
  'stock-to-flow-calculator': 'StockToFlowCalculator',
  'dust-attack-calculator': 'DustAttackCalculator',
  'validator-calculator': 'ValidatorCalculator',
  'staking-rewards-calculator': 'StakingRewardsCalculator',
  'liquid-staking-calculator': 'LiquidStakingCalculator',
  'restaking-calculator': 'RestakingCalculator',
  'retirement-calculator': 'RetirementCalculator',
};

export interface CalcConstantRow {
  what: string;
  value: string;
  jurisdiction: string | null;
  sourceUrl: string | null;
  sourceHost: string;
  tier: SourceTier;
  verified: string | null;
}

/** Ledger `law` fields run to full sentences; a table cell needs a label. */
function shortLabel(text: string): string {
  const one = text.replace(/\s+/g, ' ').trim();
  if (one.length <= 88) return one;
  const cut = one.slice(0, 88);
  const stop = Math.max(cut.lastIndexOf(';'), cut.lastIndexOf(' ('), cut.lastIndexOf(' \u2014 '), cut.lastIndexOf(', '));
  return `${(stop > 40 ? cut.slice(0, stop) : cut).trim()}\u2026`;
}


export function constantsForComponent(component: string): CalcConstantRow[] {
  return CONSTANTS
    .filter((c) => c.calculator === component && c.status !== 'removed')
    .map((c) => {
      const juris = c.jurisdiction && JURISDICTION_NAMES[c.jurisdiction]
        ? JURISDICTION_NAMES[c.jurisdiction]
        : (c.jurisdiction || null);
      // The cell prints the jurisdiction in its own badge, so "Canada — Canada, no inheritance tax"
      // would say it twice.
      let label = (c.law || c.key).replace(/\s+/g, ' ').trim();
      if (juris && label.toLowerCase().startsWith(`${juris.toLowerCase()} `)) {
        label = label.slice(juris.length).replace(/^\s*[\u2014\u2013:,-]\s*/, '').trim();
      }
      return {
      what: shortLabel(label),
      value: withUnit(shortValue(c.value, c.key), c.unit),
      jurisdiction: juris,
      sourceUrl: c.source_url ?? null,
      sourceHost: hostOf(c.source_url),
      tier: tierOf(c.source_url, c.is_regulatory !== false),
      verified: isoDate(c.last_updated_hint),
      }; })
    // most recently verified first; undated rows last
    .sort((a, b) => (b.verified ?? '').localeCompare(a.verified ?? ''));
}

export interface CalcVerification {
  rows: CalcConstantRow[];
  total: number;
  jurisdictions: number;
  latest: string | null;
  govCount: number;
  protocolCount: number;
  secondaryCount: number;
}

export function verificationFor(component: string): CalcVerification | null {
  const rows = constantsForComponent(component);
  if (!rows.length) return null;
  const dates = rows.map((r) => r.verified).filter(Boolean) as string[];
  return {
    rows,
    total: rows.length,
    jurisdictions: new Set(rows.map((r) => r.jurisdiction).filter(Boolean)).size,
    latest: dates.length ? dates.sort().slice(-1)[0] : null,
    govCount: rows.filter((r) => r.tier === 'gov').length,
    protocolCount: rows.filter((r) => r.tier === 'protocol').length,
    secondaryCount: rows.filter((r) => r.tier === 'secondary').length,
  };
}

/** Latest recorded verification date for a page slug, or null. */
export function latestVerificationForSlug(slug: string): string | null {
  const component = LEDGER_COMPONENT_BY_SLUG[slug];
  return component ? (verificationFor(component)?.latest ?? null) : null;
}
