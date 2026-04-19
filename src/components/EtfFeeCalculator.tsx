import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
  DollarSign,
  Percent,
  Info,
  RotateCcw,
  BarChart3,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  ETF Data                                                           */
/* ------------------------------------------------------------------ */

interface EtfEntry {
  ticker: string;
  name: string;
  expenseRatio: number; // as decimal, e.g. 0.0025
}

const ETF_DATA: EtfEntry[] = [
  { ticker: 'IBIT', name: 'BlackRock', expenseRatio: 0.0025 },
  { ticker: 'FBTC', name: 'Fidelity', expenseRatio: 0.0025 },
  { ticker: 'GBTC', name: 'Grayscale', expenseRatio: 0.0150 },
  { ticker: 'ARKB', name: 'ARK/21Shares', expenseRatio: 0.0021 },
  { ticker: 'BITB', name: 'Bitwise', expenseRatio: 0.0020 },
  { ticker: 'BTC', name: 'Direct BTC (Self-Custody)', expenseRatio: 0 },
];

const PERIOD_PILLS = ['1', '5', '10', '20', '30'];

const SCENARIOS = [
  { label: 'Small Investor', investment: '5000', holdingPeriod: '5', annualReturn: '12' },
  { label: 'Moderate', investment: '25000', holdingPeriod: '10', annualReturn: '12' },
  { label: 'Whale', investment: '100000', holdingPeriod: '20', annualReturn: '12' },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function EtfFeeCalculator({ lang = 'en' }: { lang?: string }) {
  const [investment, setInvestment] = useState('10000');
  const [holdingPeriod, setHoldingPeriod] = useState('10');
  const [annualReturn, setAnnualReturn] = useState('12');

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  };

  const formatUSDExact = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
  };

  const results = useMemo(() => {
    const invest = parseFloat(investment) || 0;
    const years = parseFloat(holdingPeriod) || 0;
    const grossReturn = (parseFloat(annualReturn) || 0) / 100;

    if (invest <= 0 || years <= 0) return null;

    const etfResults = ETF_DATA.map(etf => {
      const netReturn = grossReturn - etf.expenseRatio;
      const finalValueGross = invest * Math.pow(1 + grossReturn, years);
      const finalValueNet = invest * Math.pow(1 + Math.max(netReturn, 0), years);
      const totalFees = finalValueGross - finalValueNet;
      const feeDragPct = finalValueGross > 0 ? (totalFees / finalValueGross) * 100 : 0;
      const netReturnPct = invest > 0 ? ((finalValueNet - invest) / invest) * 100 : 0;

      return {
        ticker: etf.ticker,
        name: etf.name,
        expenseRatio: etf.expenseRatio,
        finalValue: finalValueNet,
        totalFees,
        feeDragPct,
        netReturnPct,
      };
    });

    // Find direct BTC result and GBTC result for comparison
    const directBtc = etfResults.find(e => e.ticker === 'BTC');
    const gbtc = etfResults.find(e => e.ticker === 'GBTC');
    const savingsVsGbtc = directBtc && gbtc ? gbtc.totalFees : 0;

    // Find the max fee for the bar visualization
    const maxFee = Math.max(...etfResults.map(e => e.totalFees), 1);

    return {
      etfResults,
      savingsVsGbtc,
      maxFee,
      grossFinalValue: invest * Math.pow(1 + grossReturn, years),
    };
  }, [investment, holdingPeriod, annualReturn]);

  const applyScenario = (s: typeof SCENARIOS[number]) => {
    setInvestment(s.investment);
    setHoldingPeriod(s.holdingPeriod);
    setAnnualReturn(s.annualReturn);
  };

  const reset = () => {
    setInvestment('10000');
    setHoldingPeriod('10');
    setAnnualReturn('12');
  };

  const isScenarioActive = (s: typeof SCENARIOS[number]) =>
    investment === s.investment && holdingPeriod === s.holdingPeriod &&
    annualReturn === s.annualReturn;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* Investment Amount */}
          <div className="input-group">
            <label htmlFor="etf-invest"><DollarSign size={14} /> {getUiString(lang, 'Investment Amount')}</label>
            <input type="number" inputMode="decimal" id="etf-invest" value={investment}
              onChange={e => setInvestment(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Holding Period */}
          <div className="input-group">
            <label htmlFor="etf-period"><Calendar size={14} /> {getUiString(lang, 'Holding Period (Years)')}</label>
            <input type="range" id="etf-period" value={holdingPeriod} min="1" max="30" step="1"
              onChange={e => setHoldingPeriod(e.target.value)} />
            <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
              {holdingPeriod} {getUiString(lang, 'years')}
            </div>
            <div className="pills-row">
              {PERIOD_PILLS.map(v => (
                <button key={v} className={`pill-btn ${holdingPeriod === v ? 'active' : ''}`} onClick={() => setHoldingPeriod(v)}>
                  {v}{getUiString(lang, 'yr')}
                </button>
              ))}
            </div>
          </div>

          {/* Expected Annual Return */}
          <div className="input-group">
            <label htmlFor="etf-return"><Percent size={14} /> {getUiString(lang, 'Expected Annual Return')}</label>
            <input type="number" inputMode="decimal" id="etf-return" value={annualReturn}
              onChange={e => setAnnualReturn(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
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
          <span className="input-hint">{getUiString(lang, 'Compare how expense ratios eat into your returns over time. Fees compound just like returns.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              {/* Savings Highlight */}
              <div className="result-hero" style={{ borderColor: 'var(--color-accent-green, #10b981)' }}>
                <span className="result-hero-label">
                  <TrendingUp size={16} /> {getUiString(lang, 'Self-Custody Saves You')}
                </span>
                <span className="result-hero-value" style={{ color: 'var(--color-accent-green, #10b981)' }}>
                  {formatUSD(results.savingsVsGbtc)}
                </span>
                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'vs GBTC over')} {holdingPeriod} {getUiString(lang, 'years')}
                </span>
              </div>

              {/* Comparison Table */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  <BarChart3 size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {getUiString(lang, 'ETF Fee Comparison')}
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'ETF')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Fee')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Final Value')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Fees Paid')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Net Return')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.etfResults.map((etf) => (
                        <tr key={etf.ticker} style={{
                          borderBottom: '1px solid var(--color-border)',
                          background: etf.ticker === 'BTC' ? 'rgba(16, 185, 129, 0.05)' : etf.ticker === 'GBTC' ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                        }}>
                          <td style={{ padding: '8px', fontWeight: 600 }}>
                            {etf.ticker}
                            <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '4px', fontSize: '0.75rem' }}>
                              {getUiString(lang, etf.name)}
                            </span>
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>{(etf.expenseRatio * 100).toFixed(2)}%</td>
                          <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>{formatUSD(etf.finalValue)}</td>
                          <td style={{ padding: '8px', textAlign: 'right', color: etf.totalFees > 0 ? 'var(--color-accent-red, #ef4444)' : 'var(--color-accent-green, #10b981)' }}>
                            {etf.totalFees > 0 ? '-' + formatUSD(etf.totalFees) : formatUSD(0)}
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green, #10b981)' }}>
                            +{etf.netReturnPct.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fee Accumulation Bars */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  {getUiString(lang, 'Fee Accumulation')}
                </h4>
                {results.etfResults.map((etf) => {
                  const barWidth = results.maxFee > 0 ? (etf.totalFees / results.maxFee) * 100 : 0;
                  return (
                    <div key={etf.ticker} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 600 }}>{etf.ticker}</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{formatUSDExact(etf.totalFees)}</span>
                      </div>
                      <div style={{
                        height: '8px',
                        borderRadius: '4px',
                        background: 'var(--color-border)',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: barWidth + '%',
                          borderRadius: '4px',
                          background: etf.ticker === 'GBTC'
                            ? 'var(--color-accent-red, #ef4444)'
                            : etf.ticker === 'BTC'
                              ? 'var(--color-accent-green, #10b981)'
                              : 'var(--color-accent-orange, #f59e0b)',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Stats */}
              <div className="result-breakdown" style={{ marginTop: '16px' }}>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Gross Final Value (No Fees)')}</span>
                  <span className="result-value">{formatUSD(results.grossFinalValue)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'GBTC Fee Drag')}</span>
                  <span className="result-value" style={{ color: 'var(--color-accent-red, #ef4444)' }}>
                    {(results.etfResults.find(e => e.ticker === 'GBTC')?.feeDragPct ?? 0).toFixed(1)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Lowest-Fee ETF')}</strong></span>
                  <span className="result-value"><strong>BITB (0.20%)</strong></span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'Expense ratios are as of early 2026 and may change. Self-custody involves its own risks (key management, security). ETF fees are deducted from NAV daily. Not financial advice.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><BarChart3 size={40} /></div>
              <h3>{getUiString(lang, 'Compare Crypto ETF Fees')}</h3>
              <p>{getUiString(lang, 'Enter your investment amount and holding period to see how different ETF expense ratios impact your returns over time.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(EtfFeeCalculator);
