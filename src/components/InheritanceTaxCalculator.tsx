import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ChevronDown, Info, RotateCcw, Shield, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CountryRule {
  name: string;
  exemption: (rel: string) => number;
  rate: (taxable: number, rel: string) => number;
  stepUp: boolean;
  notes: string;
}

const COUNTRIES: Record<string, CountryRule> = {
  us: {
    name: 'United States',
    exemption: () => 13990000,
    rate: (taxable) => taxable > 0 ? 40 : 0,
    stepUp: true,
    notes: 'US estate tax applies above $13.99M exemption (2026 inflation-adjusted). Inherited assets receive a step-up in cost basis to FMV at death. Note: TCJA exemption sunsets after 2025 unless extended.',
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
        if (taxable <= 75000) return 30;
        if (taxable <= 300000) return 30;
        if (taxable <= 600000) return 30;
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
    exemption: () => 30000000 + 6000000,
    rate: (taxable) => {
      if (taxable <= 0) return 0;
      if (taxable <= 10000000) return 10;
      if (taxable <= 30000000) return 15;
      if (taxable <= 50000000) return 20;
      if (taxable <= 100000000) return 30;
      if (taxable <= 200000000) return 40;
      if (taxable <= 300000000) return 45;
      return 55;
    },
    stepUp: false,
    notes: 'Japan: basic exemption ¥30M + ¥6M per heir. Progressive rates 10%-55%. No step-up in basis; heirs inherit original cost basis.',
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

    const exemption = config.exemption(relationship);
    const taxableEstate = Math.max(0, value - exemption);
    const taxRate = config.rate(taxableEstate, relationship);
    const estimatedTax = taxableEstate * (taxRate / 100);
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
  }, [portfolioValue, country, relationship, costBasis, config]);

  const reset = () => {
    setPortfolioValue('500000'); setCountry('us'); setRelationship('child');
    setCostBasis('100000'); setHoldingYears('5');
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
                <span className={`result-hero-roi ${result.effectiveRate === 0 ? 'profit' : 'loss'}`}>{result.effectiveRate.toFixed(1)}% {getUiString(lang, 'effective rate')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Taxable Estate')}</span><span className="result-value">{fmtUSD(result.taxableEstate)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Exemption Applied')}</span><span className="result-value profit">{fmtUSD(result.exemption)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Tax Rate')}</span><span className="result-value">{result.taxRate}%</span></div>
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
              <h3>{getUiString(lang, 'Estimate Inheritance Tax')}</h3>
              <p>{getUiString(lang, 'Enter portfolio value, select country and relationship to estimate crypto inheritance tax liability.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(InheritanceTaxCalculator);
