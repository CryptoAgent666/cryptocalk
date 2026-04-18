import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Info,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Presets & Constants                                                */
/* ------------------------------------------------------------------ */

const TARGET_PILLS = ['100000', '500000', '1000000', '5000000', '10000000'];
const RETURN_PILLS = ['10', '20', '50', '100'];
const ALLOCATION_PILLS = ['25', '50', '75', '100'];
const MILESTONES = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000];

const SCENARIOS = [
  { label: 'Conservative Saver', target: '1000000', portfolio: '5000', monthly: '500', annualReturn: '10', allocation: '50' },
  { label: 'Aggressive DCA', target: '1000000', portfolio: '10000', monthly: '2000', annualReturn: '50', allocation: '80' },
  { label: 'YOLO Moon', target: '10000000', portfolio: '1000', monthly: '1000', annualReturn: '100', allocation: '100' },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function MillionaireCalculator({ lang = 'en' }: { lang?: string }) {
  const [target, setTarget] = useState('1000000');
  const [portfolio, setPortfolio] = useState('5000');
  const [monthly, setMonthly] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('20');
  const [allocation, setAllocation] = useState('100');

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  };

  const results = useMemo(() => {
    const tgt = parseFloat(target) || 0;
    const port = parseFloat(portfolio) || 0;
    const mo = parseFloat(monthly) || 0;
    const rate = (parseFloat(annualReturn) || 0) / 100;
    const alloc = (parseFloat(allocation) || 100) / 100;
    if (tgt <= 0 || rate <= 0) return null;

    const effectiveRate = rate * alloc;
    const monthlyRate = effectiveRate / 12;

    // Simulate month-by-month to find years to goal and milestones
    let balance = port;
    let totalInvested = port;
    let months = 0;
    const maxMonths = 100 * 12; // cap at 100 years
    const milestoneMonths: Record<number, number | null> = {};
    MILESTONES.forEach(m => { milestoneMonths[m] = null; });

    while (balance < tgt && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + mo;
      totalInvested += mo;
      months++;
      for (const m of MILESTONES) {
        if (milestoneMonths[m] === null && balance >= m) {
          milestoneMonths[m] = months;
        }
      }
    }

    const years = months / 12;
    const totalGains = balance - totalInvested;
    const reachedGoal = balance >= tgt;

    // Required monthly investment to hit target in 5, 10, 20 years
    const requiredMonthly = (timeYears: number) => {
      const n = timeYears * 12;
      if (monthlyRate <= 0) return (tgt - port) / n;
      const fvPort = port * Math.pow(1 + monthlyRate, n);
      const remaining = tgt - fvPort;
      if (remaining <= 0) return 0;
      return remaining / ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
    };

    // Required annual return to hit target with current monthly in 10 years
    // Use binary search
    const findRequiredReturn = (timeYears: number) => {
      let lo = 0, hi = 10; // 0% to 1000%
      for (let i = 0; i < 50; i++) {
        const mid = (lo + hi) / 2;
        const mr = mid / 12;
        let bal = port;
        for (let m = 0; m < timeYears * 12; m++) {
          bal = bal * (1 + mr) + mo;
        }
        if (bal >= tgt) hi = mid; else lo = mid;
      }
      return ((lo + hi) / 2) * 100;
    };

    return {
      years,
      months,
      totalInvested,
      totalGains,
      finalBalance: balance,
      reachedGoal,
      milestoneMonths,
      requiredMonthly5y: requiredMonthly(5),
      requiredMonthly10y: requiredMonthly(10),
      requiredReturn10y: findRequiredReturn(10),
    };
  }, [target, portfolio, monthly, annualReturn, allocation]);

  const applyScenario = (s: typeof SCENARIOS[number]) => {
    setTarget(s.target);
    setPortfolio(s.portfolio);
    setMonthly(s.monthly);
    setAnnualReturn(s.annualReturn);
    setAllocation(s.allocation);
  };

  const reset = () => {
    setTarget('1000000');
    setPortfolio('5000');
    setMonthly('500');
    setAnnualReturn('20');
    setAllocation('100');
  };

  const isScenarioActive = (s: typeof SCENARIOS[number]) =>
    target === s.target && portfolio === s.portfolio && monthly === s.monthly &&
    annualReturn === s.annualReturn && allocation === s.allocation;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* Target Wealth */}
          <div className="input-group">
            <label htmlFor="mill-target"><Target size={14} /> {getUiString(lang, 'Target Wealth')}</label>
            <input type="number" inputMode="decimal" id="mill-target" value={target}
              onChange={e => setTarget(e.target.value)} min="1" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {TARGET_PILLS.map(v => (
                <button key={v} className={`pill-btn ${target === v ? 'active' : ''}`} onClick={() => setTarget(v)}>
                  {v === '1000000' ? '$1M' : v === '5000000' ? '$5M' : v === '10000000' ? '$10M' : '$' + (Number(v) / 1000) + 'K'}
                </button>
              ))}
            </div>
          </div>

          {/* Current Portfolio */}
          <div className="input-group">
            <label htmlFor="mill-portfolio"><DollarSign size={14} /> {getUiString(lang, 'Current Portfolio')}</label>
            <input type="number" inputMode="decimal" id="mill-portfolio" value={portfolio}
              onChange={e => setPortfolio(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Monthly Investment */}
          <div className="input-group">
            <label htmlFor="mill-monthly"><DollarSign size={14} /> {getUiString(lang, 'Monthly Investment')}</label>
            <input type="number" inputMode="decimal" id="mill-monthly" value={monthly}
              onChange={e => setMonthly(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Expected Annual Return */}
          <div className="input-group">
            <label htmlFor="mill-return"><Percent size={14} /> {getUiString(lang, 'Expected Annual Return')}</label>
            <input type="number" inputMode="decimal" id="mill-return" value={annualReturn}
              onChange={e => setAnnualReturn(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {RETURN_PILLS.map(v => (
                <button key={v} className={`pill-btn ${annualReturn === v ? 'active' : ''}`} onClick={() => setAnnualReturn(v)}>
                  {v}%
                </button>
              ))}
            </div>
          </div>

          {/* Crypto Allocation */}
          <div className="input-group">
            <label htmlFor="mill-alloc"><TrendingUp size={14} /> {getUiString(lang, 'Crypto Allocation')}</label>
            <input type="number" inputMode="decimal" id="mill-alloc" value={allocation}
              onChange={e => setAllocation(e.target.value)} min="0" max="100" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {ALLOCATION_PILLS.map(v => (
                <button key={v} className={`pill-btn ${allocation === v ? 'active' : ''}`} onClick={() => setAllocation(v)}>
                  {v}%
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s, i) => (
                <button key={i} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Adjust return rate and allocation to model different market scenarios.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              <div className="result-hero" style={{ borderColor: results.reachedGoal ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-orange, #f59e0b)' }}>
                <span className="result-hero-label">
                  <Trophy size={16} /> {getUiString(lang, 'Time to Reach Goal')}
                </span>
                <span className="result-hero-value" style={{ color: results.reachedGoal ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-orange, #f59e0b)' }}>
                  {results.reachedGoal
                    ? (results.years < 1
                      ? results.months + ' ' + getUiString(lang, 'months')
                      : results.years.toFixed(1) + ' ' + getUiString(lang, 'Years'))
                    : '100+ ' + getUiString(lang, 'Years')}
                </span>
                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'Target')}: {formatUSD(parseFloat(target) || 0)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total Invested')}</span>
                  <span className="result-value">{formatUSD(results.totalInvested)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total Gains')}</span>
                  <span className="result-value profit">{formatUSD(results.totalGains)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Final Balance')}</strong></span>
                  <span className="result-value"><strong>{formatUSD(results.finalBalance)}</strong></span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly Needed (5 yr)')}</span>
                  <span className="result-value">{results.requiredMonthly5y > 0 ? formatUSD(results.requiredMonthly5y) + '/mo' : '\u2014'}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly Needed (10 yr)')}</span>
                  <span className="result-value">{results.requiredMonthly10y > 0 ? formatUSD(results.requiredMonthly10y) + '/mo' : '\u2014'}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Required Return (10 yr)')}</span>
                  <span className="result-value">{results.requiredReturn10y.toFixed(1)}%</span>
                </div>
              </div>

              {/* Milestone Table */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  {getUiString(lang, 'Milestone Timeline')}
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Milestone')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Time to Reach')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MILESTONES.map(m => {
                        const mo = results.milestoneMonths[m];
                        return (
                          <tr key={m} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '8px', fontWeight: 600 }}>{formatUSD(m)}</td>
                            <td style={{ padding: '8px', textAlign: 'right', color: mo !== null ? 'var(--color-accent-green, #10b981)' : 'var(--color-text-muted)' }}>
                              {mo !== null
                                ? (mo < 12 ? mo + ' ' + getUiString(lang, 'months') : (mo / 12).toFixed(1) + ' ' + getUiString(lang, 'years'))
                                : getUiString(lang, 'Not reached')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'Projections assume constant returns and monthly contributions. Actual crypto returns vary significantly. Not financial advice.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Trophy size={40} /></div>
              <h3>{getUiString(lang, 'Plan Your Path to Wealth')}</h3>
              <p>{getUiString(lang, 'Enter your target wealth, current portfolio, and monthly investment to see how long it takes to reach your goal.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(MillionaireCalculator);
