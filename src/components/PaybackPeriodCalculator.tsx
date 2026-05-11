import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Calendar, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const MULTIPLIER_OPTIONS = [2, 3, 5, 10] as const;

const SCENARIOS = [
  { label: 'Conservative 5%/mo', investment: '10000', monthlyReturn: '5', type: 'lump' as const, dcaAmount: '0', multiplier: 2 },
  { label: 'Moderate 10%/mo', investment: '10000', monthlyReturn: '10', type: 'lump' as const, dcaAmount: '0', multiplier: 3 },
  { label: 'Aggressive 20%/mo', investment: '5000', monthlyReturn: '20', type: 'lump' as const, dcaAmount: '0', multiplier: 5 },
] as const;

function PaybackPeriodCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (v: number) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

  const [investment, setInvestment] = useState('10000');
  const [monthlyReturn, setMonthlyReturn] = useState('5');
  const [type, setType] = useState<'lump' | 'dca'>('lump');
  const [dcaAmount, setDcaAmount] = useState('500');
  const [multiplier, setMultiplier] = useState(2);

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setInvestment(s.investment); setMonthlyReturn(s.monthlyReturn);
    setType(s.type); setDcaAmount(s.dcaAmount); setMultiplier(s.multiplier);
  };
  const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
    investment === s.investment && monthlyReturn === s.monthlyReturn &&
    type === s.type && dcaAmount === s.dcaAmount && multiplier === s.multiplier;

  const result = useMemo(() => {
    const inv = parseFloat(investment) || 0;
    const mr = parseFloat(monthlyReturn) || 0;
    const dca = parseFloat(dcaAmount) || 0;
    if (inv <= 0 || mr <= 0) return null;

    const target = inv * multiplier;
    const rate = mr / 100;
    const milestones: { month: number; invested: number; value: number }[] = [];
    let paybackMonth = 0;
    let totalInvested = inv;
    let value = inv;
    const maxMonths = 600;

    for (let m = 1; m <= maxMonths; m++) {
      value = value * (1 + rate);
      if (type === 'dca' && dca > 0) {
        value += dca;
        totalInvested += dca;
      }
      if (m <= 12 || m % 3 === 0 || (paybackMonth === 0 && value >= target)) {
        milestones.push({ month: m, invested: totalInvested, value });
      }
      if (paybackMonth === 0 && value >= target) {
        paybackMonth = m;
      }
      if (paybackMonth > 0 && m > paybackMonth + 12) break;
    }

    const years = paybackMonth > 0 ? Math.floor(paybackMonth / 12) : 0;
    const months = paybackMonth > 0 ? paybackMonth % 12 : 0;

    // Monthly return needed for 1-year payback
    const neededFor1yr = type === 'lump'
      ? (Math.pow(multiplier, 1 / 12) - 1) * 100
      : 0;

    const today = new Date();
    const breakEvenDate = paybackMonth > 0
      ? new Date(today.getFullYear(), today.getMonth() + paybackMonth, today.getDate())
      : null;

    return { paybackMonth, years, months, totalInvested, valueAtPayback: value, neededFor1yr, breakEvenDate, milestones: milestones.slice(0, 20) };
  }, [investment, monthlyReturn, type, dcaAmount, multiplier]);

  const reset = () => {
    setInvestment('10000'); setMonthlyReturn('5');
    setType('lump'); setDcaAmount('500'); setMultiplier(2);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pp-inv">{getUiString(lang, 'Initial Investment ($)')}</label>
            <div className="pills-row">
              {[1000, 5000, 10000, 50000].map((p) => (
                <button key={p} className={`pill-btn ${investment === String(p) ? 'active' : ''}`} onClick={() => setInvestment(String(p))}>${p >= 1000 ? `${p / 1000}k` : p}</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={investment} onChange={(e) => setInvestment(e.target.value)} min="0" step="any" id="pp-inv" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pp-return">{getUiString(lang, 'Expected Monthly Return (%)')}</label>
            <div className="pills-row">
              {[3, 5, 10, 15, 20].map((p) => (
                <button key={p} className={`pill-btn ${monthlyReturn === String(p) ? 'active' : ''}`} onClick={() => setMonthlyReturn(String(p))}>{p}%</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} min="0" step="any" id="pp-return" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Investment Type')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${type === 'lump' ? 'active' : ''}`} onClick={() => setType('lump')}>{getUiString(lang, 'Lump Sum')}</button>
              <button className={`pill-btn ${type === 'dca' ? 'active' : ''}`} onClick={() => setType('dca')}>DCA</button>
            </div>
          </div>

          {type === 'dca' && (
            <div className="input-group">
              <label htmlFor="pp-dca">{getUiString(lang, 'Monthly DCA Amount ($)')}</label>
              <div className="pills-row">
                {[100, 250, 500, 1000].map((p) => (
                  <button key={p} className={`pill-btn ${dcaAmount === String(p) ? 'active' : ''}`} onClick={() => setDcaAmount(String(p))}>${p}</button>
                ))}
              </div>
              <input type="number" inputMode="decimal" value={dcaAmount} onChange={(e) => setDcaAmount(e.target.value)} min="0" step="any" id="pp-dca" onFocus={(e) => e.target.select()} />
            </div>
          )}

          <div className="input-group">
            <label>{getUiString(lang, 'Target Multiplier')}</label>
            <div className="pills-row">
              {MULTIPLIER_OPTIONS.map((m) => (
                <button key={m} className={`pill-btn ${multiplier === m ? 'active' : ''}`} onClick={() => setMultiplier(m)}>{m}x</button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Assumes constant monthly return compounded.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero profit">
                <span className="result-hero-label">{getUiString(lang, 'Payback Period')}</span>
                <span className="result-hero-value">
                  <Calendar size={28} />
                  {result.paybackMonth > 0
                    ? `${result.years > 0 ? `${result.years}y ` : ''}${result.months}mo`
                    : getUiString(lang, 'Not reached')}
                </span>
                <span className="result-hero-roi profit">{multiplier}x {getUiString(lang, 'target')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Total Invested')}</span><span className="result-value">{fmtUSD(result.totalInvested)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Value at Payback')}</span><span className="result-value profit">{fmtUSD(result.valueAtPayback)}</span></div>
                {result.neededFor1yr > 0 && (
                  <>
                    <div className="result-divider" />
                    <div className="result-row"><span className="result-label">{getUiString(lang, 'Monthly Return for 1yr Payback')}</span><span className="result-value">{result.neededFor1yr.toFixed(2)}%</span></div>
                  </>
                )}
                {result.breakEvenDate && (
                  <div className="result-row"><span className="result-label">{getUiString(lang, 'Estimated Payback Date')}</span><span className="result-value">{result.breakEvenDate.toLocaleDateString(lang === 'en' ? 'en-US' : lang)}</span></div>
                )}
              </div>

              {result.milestones.length > 0 && (
                <>
                  <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 600 }}>{getUiString(lang, 'Growth Milestones')}</h4>
                  <div className="result-breakdown">
                    {result.milestones.map((m) => (
                      <div key={m.month} className="result-row">
                        <span className="result-label">{getUiString(lang, 'Month')} {m.month}</span>
                        <span className="result-value">{fmtUSD(m.value)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Assumes constant monthly returns. Real crypto returns are volatile and unpredictable. Not financial advice.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter investment parameters')}</h3>
              <p>{getUiString(lang, 'Set initial investment and expected return to calculate payback period.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PaybackPeriodCalculator);
