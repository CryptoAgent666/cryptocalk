import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Info,
  RotateCcw,
  Calendar,
  Wallet,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Presets & Constants                                                */
/* ------------------------------------------------------------------ */

const SCENARIOS = [
  { label: 'Conservative', annualReturn: '8', withdrawal: '40000', currentAge: '30', retirementAge: '55', portfolio: '50000', monthly: '500', inflation: '3' },
  { label: 'Moderate', annualReturn: '15', withdrawal: '50000', currentAge: '30', retirementAge: '55', portfolio: '50000', monthly: '500', inflation: '3' },
  { label: 'Aggressive', annualReturn: '25', withdrawal: '80000', currentAge: '30', retirementAge: '55', portfolio: '50000', monthly: '500', inflation: '3' },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function RetirementCalculator({ lang = 'en' }: { lang?: string }) {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('55');
  const [portfolio, setPortfolio] = useState('50000');
  const [monthly, setMonthly] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('15');
  const [withdrawal, setWithdrawal] = useState('50000');
  const [inflation, setInflation] = useState('3');

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  };

  const results = useMemo(() => {
    const age = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 0;
    const port = parseFloat(portfolio) || 0;
    const mo = parseFloat(monthly) || 0;
    const rate = (parseFloat(annualReturn) || 0) / 100;
    const withdraw = parseFloat(withdrawal) || 0;
    const infl = (parseFloat(inflation) || 0) / 100;

    if (age <= 0 || retAge <= age || rate <= 0) return null;

    const yearsToRetirement = retAge - age;
    const monthlyRate = rate / 12;

    // Accumulation phase: grow portfolio with monthly contributions
    let balance = port;
    for (let m = 0; m < yearsToRetirement * 12; m++) {
      balance = balance * (1 + monthlyRate) + mo;
    }
    const portfolioAtRetirement = balance;

    // Monthly passive income using 4% rule
    const monthlyPassiveIncome = portfolioAtRetirement * 0.04 / 12;

    // Years portfolio lasts in retirement (with inflation-adjusted withdrawals)
    let retBalance = portfolioAtRetirement;
    let retYears = 0;
    const maxRetYears = 100;
    let annualWithdraw = withdraw;

    while (retBalance > 0 && retYears < maxRetYears) {
      // Portfolio grows, then subtract annual withdrawal
      retBalance = retBalance * (1 + rate) - annualWithdraw;
      annualWithdraw = annualWithdraw * (1 + infl); // inflation-adjusted
      retYears++;
      if (retBalance <= 0) break;
    }

    const yearsPortfolioLasts = retBalance > 0 ? maxRetYears : retYears;
    const portfolioLastsForever = retBalance > 0;

    // FIRE number: portfolio needed so that 4% covers annual withdrawal
    const fireNumber = withdraw / 0.04;

    // Surplus or deficit vs FIRE number
    const surplusDeficit = portfolioAtRetirement - fireNumber;

    // Years to FIRE: when portfolio can sustain withdrawal via 4% rule
    let fireBalance = port;
    let fireMonths = 0;
    const maxFireMonths = 100 * 12;
    while (fireBalance * 0.04 < withdraw && fireMonths < maxFireMonths) {
      fireBalance = fireBalance * (1 + monthlyRate) + mo;
      fireMonths++;
    }
    const yearsToFire = fireMonths / 12;
    const fireReached = fireBalance * 0.04 >= withdraw;

    return {
      portfolioAtRetirement,
      yearsToFire,
      fireReached,
      monthlyPassiveIncome,
      yearsPortfolioLasts,
      portfolioLastsForever,
      surplusDeficit,
      fireNumber,
      yearsToRetirement,
    };
  }, [currentAge, retirementAge, portfolio, monthly, annualReturn, withdrawal, inflation]);

  const applyScenario = (s: typeof SCENARIOS[number]) => {
    setCurrentAge(s.currentAge);
    setRetirementAge(s.retirementAge);
    setPortfolio(s.portfolio);
    setMonthly(s.monthly);
    setAnnualReturn(s.annualReturn);
    setWithdrawal(s.withdrawal);
    setInflation(s.inflation);
  };

  const reset = () => {
    setCurrentAge('30');
    setRetirementAge('55');
    setPortfolio('50000');
    setMonthly('500');
    setAnnualReturn('15');
    setWithdrawal('50000');
    setInflation('3');
  };

  const isScenarioActive = (s: typeof SCENARIOS[number]) =>
    currentAge === s.currentAge && retirementAge === s.retirementAge &&
    portfolio === s.portfolio && monthly === s.monthly &&
    annualReturn === s.annualReturn && withdrawal === s.withdrawal &&
    inflation === s.inflation;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* Current Age */}
          <div className="input-group">
            <label htmlFor="ret-age"><Calendar size={14} /> {getUiString(lang, 'Current Age')}</label>
            <input type="number" inputMode="numeric" id="ret-age" value={currentAge}
              onChange={e => setCurrentAge(e.target.value)} min="1" max="100" step="1" onFocus={e => e.target.select()} />
          </div>

          {/* Target Retirement Age */}
          <div className="input-group">
            <label htmlFor="ret-retire-age"><Target size={14} /> {getUiString(lang, 'Target Retirement Age')}</label>
            <input type="number" inputMode="numeric" id="ret-retire-age" value={retirementAge}
              onChange={e => setRetirementAge(e.target.value)} min="1" max="120" step="1" onFocus={e => e.target.select()} />
          </div>

          {/* Current Portfolio Value */}
          <div className="input-group">
            <label htmlFor="ret-portfolio"><DollarSign size={14} /> {getUiString(lang, 'Current Portfolio Value')}</label>
            <input type="number" inputMode="decimal" id="ret-portfolio" value={portfolio}
              onChange={e => setPortfolio(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Monthly Contribution */}
          <div className="input-group">
            <label htmlFor="ret-monthly"><Wallet size={14} /> {getUiString(lang, 'Monthly Contribution')}</label>
            <input type="number" inputMode="decimal" id="ret-monthly" value={monthly}
              onChange={e => setMonthly(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Expected Annual Return */}
          <div className="input-group">
            <label htmlFor="ret-return"><Percent size={14} /> {getUiString(lang, 'Expected Annual Return')}</label>
            <input type="number" inputMode="decimal" id="ret-return" value={annualReturn}
              onChange={e => setAnnualReturn(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Annual Withdrawal in Retirement */}
          <div className="input-group">
            <label htmlFor="ret-withdrawal"><DollarSign size={14} /> {getUiString(lang, 'Annual Withdrawal in Retirement')}</label>
            <input type="number" inputMode="decimal" id="ret-withdrawal" value={withdrawal}
              onChange={e => setWithdrawal(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Inflation Rate */}
          <div className="input-group">
            <label htmlFor="ret-inflation"><TrendingUp size={14} /> {getUiString(lang, 'Inflation Rate')}</label>
            <input type="number" inputMode="decimal" id="ret-inflation" value={inflation}
              onChange={e => setInflation(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
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
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Adjust return rate and withdrawal to model different retirement scenarios.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              <div className="result-hero" style={{ borderColor: results.surplusDeficit >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-orange, #f59e0b)' }}>
                <span className="result-hero-label">
                  <Target size={16} /> {getUiString(lang, 'Portfolio at Retirement')}
                </span>
                <span className="result-hero-value" style={{ color: results.surplusDeficit >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-orange, #f59e0b)' }}>
                  {formatUSD(results.portfolioAtRetirement)}
                </span>
                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'FIRE Number')}: {formatUSD(results.fireNumber)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Years to FIRE')}</span>
                  <span className="result-value" style={{ color: results.fireReached ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-orange, #f59e0b)' }}>
                    {results.fireReached
                      ? (results.yearsToFire < 1
                        ? '<1 ' + getUiString(lang, 'year')
                        : results.yearsToFire.toFixed(1) + ' ' + getUiString(lang, 'years'))
                      : '100+ ' + getUiString(lang, 'years')}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly Passive Income (4% Rule)')}</span>
                  <span className="result-value profit">{formatUSD(results.monthlyPassiveIncome)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Years Portfolio Lasts')}</span>
                  <span className="result-value" style={{ color: results.portfolioLastsForever ? 'var(--color-accent-green, #10b981)' : 'var(--color-text)' }}>
                    {results.portfolioLastsForever
                      ? '100+ (' + getUiString(lang, 'Indefinite') + ')'
                      : results.yearsPortfolioLasts + ' ' + getUiString(lang, 'years')}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Surplus / Deficit vs FIRE')}</strong></span>
                  <span className="result-value" style={{ color: results.surplusDeficit >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-red, #ef4444)' }}>
                    <strong>{results.surplusDeficit >= 0 ? '+' : ''}{formatUSD(results.surplusDeficit)}</strong>
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Accumulation Period')}</span>
                  <span className="result-value">{results.yearsToRetirement} {getUiString(lang, 'years')}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'Projections assume constant returns and contributions. Actual crypto returns vary significantly. The 4% rule is a guideline, not a guarantee. Not financial advice.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Target size={40} /></div>
              <h2>{getUiString(lang, 'Plan Your Crypto Retirement')}</h2>
              <p>{getUiString(lang, 'Enter your age, portfolio, and goals to see when you can achieve financial independence with crypto.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(RetirementCalculator);
