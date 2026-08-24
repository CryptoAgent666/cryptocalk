import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ChevronDown, Info, RotateCcw, Shield, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';
import { loc, fmtPctValue } from '../i18n/format';

interface CountryRule {
  name: string;
  exemption: (rel: string, heirs: number) => number;
  rate: (taxable: number, rel: string, heirs: number) => number;
  /**
   * Statutory override for jurisdictions whose tax is NOT simply
   * `taxableEstate × rate`. Japan splits the taxable estate across the
   * statutory heirs and taxes each share separately, so a flat rate on the
   * whole estate overstates the bill. When absent, the flat model is used.
   */
  computeTax?: (taxable: number, rel: string, heirs: number) => number;
  /** Show the "statutory heirs" input — only meaningful where heirs affect the maths. */
  usesHeirCount?: boolean;
  stepUp: boolean;
  notes: string;
}

/**
 * Japan 相続税の速算表 (NTA No.4155): [upper bound of the heir's share, rate %, quick-calc deduction].
 * Applied per statutory heir's share, not to the whole estate.
 */
const JP_RATE_TABLE: ReadonlyArray<readonly [number, number, number]> = [
  [10_000_000, 10, 0],
  [30_000_000, 15, 500_000],
  [50_000_000, 20, 2_000_000],
  [100_000_000, 30, 7_000_000],
  [200_000_000, 40, 17_000_000],
  [300_000_000, 45, 27_000_000],
  [600_000_000, 50, 42_000_000],
  [Number.POSITIVE_INFINITY, 55, 72_000_000],
];

const jpBandFor = (share: number) =>
  JP_RATE_TABLE.find(([cap]) => share <= cap) ?? JP_RATE_TABLE[JP_RATE_TABLE.length - 1];

const COUNTRIES: Record<string, CountryRule> = {
  us: {
    name: 'United States',
    exemption: () => 15000000,
    rate: (taxable) => taxable > 0 ? 40 : 0,
    stepUp: true,
    notes: 'US estate tax applies above the $15M exemption (2026, made permanent by the One Big Beautiful Bill). Inherited assets receive a step-up in cost basis to FMV at death.',
  },
  uk: {
    name: 'United Kingdom',
    exemption: (rel) => rel === 'spouse' ? 1e15 : 325000,
    rate: (taxable) => taxable > 0 ? 40 : 0,
    stepUp: false,
    notes: 'UK IHT at 40% above £325K nil-rate band. Spouse transfers are fully exempt. No step-up in basis for CGT purposes.',
  },
  de: {
    name: 'Germany',
    exemption: (rel) => rel === 'spouse' ? 500000 : rel === 'child' ? 400000 : 20000,
    rate: (taxable, rel) => {
      if (taxable <= 0) return 0;
      if (rel === 'other') {
        // ErbStG §19 Steuerklasse III: flat 30% up to €6,000,000, then 50% above.
        if (taxable <= 6000000) return 30;
        return 50;
      }
      if (taxable <= 75000) return 7;
      if (taxable <= 300000) return 11;
      if (taxable <= 600000) return 15;
      if (taxable <= 6000000) return 19;
      if (taxable <= 13000000) return 23;
      if (taxable <= 26000000) return 27;
      return 30;
    },
    stepUp: true,
    notes: 'Germany: €400K-€500K exemption by relationship class. Spouse €500K, child €400K, others €20K. Progressive rates 7%-50%.',
  },
  jp: {
    name: 'Japan',
    // 基礎控除 = ¥30M + ¥6M × number of statutory heirs (NTA No.4152).
    exemption: (_rel, heirs) => 30000000 + 6000000 * heirs,
    // Marginal band of a single heir's statutory share — shown as "Tax Rate".
    rate: (taxable, _rel, heirs) => {
      if (taxable <= 0) return 0;
      return jpBandFor(taxable / Math.max(1, heirs))[1];
    },
    // 相続税の総額: split the taxable estate into statutory shares, tax each
    // share via the 速算表 (rate − quick-calc deduction), then sum (NTA No.4155).
    computeTax: (taxable, _rel, heirs) => {
      if (taxable <= 0) return 0;
      const n = Math.max(1, heirs);
      const share = taxable / n;
      const [, rate, deduction] = jpBandFor(share);
      return Math.max(0, share * (rate / 100) - deduction) * n;
    },
    usesHeirCount: true,
    stepUp: false,
    notes: 'Japan: basic exemption ¥30M + ¥6M per statutory heir. The taxable estate is split into statutory shares and each share is taxed at 10%-55% with the NTA quick-calc deduction. Assumes equal shares; the spouse tax credit (tax-free up to ¥160M or the statutory share) is not modelled, so a spouse\'s bill is lower in practice. No step-up in basis; heirs inherit original cost basis.',
  },
  au: {
    name: 'Australia',
    exemption: () => 0,
    rate: () => 0,
    stepUp: false,
    notes: 'Australia has no inheritance or estate tax. However, CGT may apply when heirs sell inherited crypto. Cost basis inherited from decedent.',
  },
  ca: {
    name: 'Canada',
    exemption: () => 0,
    rate: () => 0,
    stepUp: false,
    notes: 'Canada has no inheritance tax. A deemed disposition occurs at death — the estate pays capital gains tax on unrealized gains at the deceased\'s marginal rate.',
  },
  in: {
    name: 'India',
    exemption: () => 0,
    rate: () => 0,
    stepUp: false,
    notes: 'India abolished inheritance tax in 1985. No tax on receiving crypto inheritance. However, 30% tax applies when heirs sell (cost basis inherited).',
  },
  br: {
    name: 'Brazil',
    exemption: () => 0,
    rate: () => 8,
    stepUp: false,
    notes: 'Brazil: ITCMD (inheritance tax) varies by state, typically 4%-8% of asset value. No federal inheritance tax. Cost basis passes to heirs.',
  },
};

const SCENARIOS = [
  {
    label: 'US Large Estate',
    portfolioValue: '15000000',
    country: 'us',
    relationship: 'child',
    costBasis: '2000000',
    holdingYears: '5',
  },
  {
    label: 'UK Moderate',
    portfolioValue: '500000',
    country: 'uk',
    relationship: 'child',
    costBasis: '100000',
    holdingYears: '3',
  },
  {
    label: 'Germany Child',
    portfolioValue: '800000',
    country: 'de',
    relationship: 'child',
    costBasis: '200000',
    holdingYears: '4',
  },
] as const;

function InheritanceTaxCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (value: number): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(value);

  const [portfolioValue, setPortfolioValue] = useState('500000');
  const [country, setCountry] = useState('us');
  const [relationship, setRelationship] = useState('child');
  const [costBasis, setCostBasis] = useState('100000');
  const [holdingYears, setHoldingYears] = useState('5');
  const [heirCount, setHeirCount] = useState('1');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setPortfolioValue(s.portfolioValue); setCountry(s.country);
    setRelationship(s.relationship); setCostBasis(s.costBasis); setHoldingYears(s.holdingYears);
  };

  const isActive = (s: (typeof SCENARIOS)[number]) =>
    portfolioValue === s.portfolioValue && country === s.country && relationship === s.relationship &&
    costBasis === s.costBasis && holdingYears === s.holdingYears;

  const config = COUNTRIES[country];

  const result = useMemo(() => {
    const value = parseFloat(portfolioValue) || 0;
    const basis = parseFloat(costBasis) || 0;

    if (value <= 0) return null;

    const heirs = Math.max(1, Math.floor(parseFloat(heirCount) || 1));
    const exemption = config.exemption(relationship, heirs);
    const taxableEstate = Math.max(0, value - exemption);
    const taxRate = config.rate(taxableEstate, relationship, heirs);
    const estimatedTax = config.computeTax
      ? config.computeTax(taxableEstate, relationship, heirs)
      : taxableEstate * (taxRate / 100);
    const effectiveRate = value > 0 ? (estimatedTax / value) * 100 : 0;
    const netInheritance = value - estimatedTax;
    const stepUpBenefit = config.stepUp ? (value - basis) : 0;

    return {
      taxableEstate,
      exemption: Math.min(exemption, value),
      taxRate,
      estimatedTax,
      effectiveRate,
      netInheritance,
      stepUpBenefit,
      unrealizedGain: value - basis,
    };
  }, [portfolioValue, country, relationship, costBasis, heirCount, config]);

  const reset = () => {
    setPortfolioValue('500000'); setCountry('us'); setRelationship('child');
    setCostBasis('100000'); setHoldingYears('5'); setHeirCount('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="inh-value">{getUiString(lang, 'Portfolio Value (USD)')}</label>
            <input type="number" inputMode="decimal" id="inh-value" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="inh-country">{getUiString(lang, 'Country')}</label>
            <div className="select-wrap">
              <select id="inh-country" value={country} onChange={(e) => setCountry(e.target.value)} className="select-input">
                {Object.entries(COUNTRIES).map(([key, c]) => (
                  <option key={key} value={key}>{getUiString(lang, c.name)}</option>
                ))}
              </select>
              <ChevronDown size={14} className="select-icon" />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Relationship to Decedent')}</label>
            <div className="toggle-group" role="tablist" aria-label="Relationship">
              {(['spouse', 'child', 'other'] as const).map((r) => (
                <button key={r} type="button" className={`toggle-btn ${relationship === r ? 'active' : ''}`} onClick={() => setRelationship(r)}>
                  {getUiString(lang, r === 'spouse' ? 'Spouse' : r === 'child' ? 'Child' : 'Other')}
                </button>
              ))}
            </div>
          </div>

          {config.usesHeirCount && (
            <div className="input-group">
              <label htmlFor="inh-heirs">{getUiString(lang, 'Statutory Heirs')}</label>
              <input type="number" inputMode="numeric" id="inh-heirs" value={heirCount} onChange={(e) => setHeirCount(e.target.value)} min="1" step="1" onFocus={(e) => e.target.select()} />
              <span className="input-hint">{getUiString(lang, 'Raises the basic exemption by ¥6M each and splits the estate into statutory shares.')}</span>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="inh-basis">{getUiString(lang, 'Cost Basis (USD)')}</label>
            <input type="number" inputMode="decimal" id="inh-basis" value={costBasis} onChange={(e) => setCostBasis(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="inh-years">{getUiString(lang, 'Holding Period (years)')}</label>
            <input type="number" inputMode="decimal" id="inh-years" value={holdingYears} onChange={(e) => setHoldingYears(e.target.value)} min="0" step="1" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Tax rules are simplified estimates for comparison purposes.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.estimatedTax === 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Estimated Inheritance Tax')}</span>
                <span className="result-hero-value"><Shield size={28} />{fmtUSD(result.estimatedTax)}</span>
                <span className={`result-hero-roi ${result.effectiveRate === 0 ? 'profit' : 'loss'}`}>{result.effectiveRate.toLocaleString(loc(lang), { minimumFractionDigits: 1, maximumFractionDigits: 1 })}% {getUiString(lang, 'effective rate')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Taxable Estate')}</span><span className="result-value">{fmtUSD(result.taxableEstate)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Exemption Applied')}</span><span className="result-value profit">{fmtUSD(result.exemption)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Tax Rate')}</span><span className="result-value">{fmtPctValue(result.taxRate, lang)}%</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Net Inheritance')}</span><span className="result-value profit">{fmtUSD(result.netInheritance)}</span></div>
                {config.stepUp && result.stepUpBenefit > 0 && (
                  <div className="result-row"><span className="result-label">{getUiString(lang, 'Step-Up Benefit')}</span><span className="result-value profit">{fmtUSD(result.stepUpBenefit)}</span></div>
                )}
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Unrealized Gain')}</span><span className="result-value">{fmtUSD(result.unrealizedGain)}</span></div>
              </div>

              <div className="result-breakdown" style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  <Info size={12} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  {getUiString(lang, config.notes)}
                </p>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'This is a simplified estimate. Inheritance tax laws are complex and vary by jurisdiction. Consult an estate planning attorney for your specific situation.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Estimate Inheritance Tax')}</h2>
              <p>{getUiString(lang, 'Enter portfolio value, select country and relationship to estimate crypto inheritance tax liability.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(InheritanceTaxCalculator);
