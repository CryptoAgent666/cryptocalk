import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { AlertTriangle, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const MONTHLY_RETURN_PRESETS = [2, 5, 10, 15];
const DRAWDOWN_SCENARIOS = [
  { label: 'Mild Dip', peakValue: '10000', currentValue: '9000', monthlyReturn: '5' },
  { label: 'Bear Market', peakValue: '10000', currentValue: '7000', monthlyReturn: '5' },
  { label: 'Deep Drawdown', peakValue: '10000', currentValue: '5000', monthlyReturn: '10' },
] as const;

// formatUSD is defined inside the component to access `lang` prop

function DrawdownCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const [peakValue, setPeakValue] = useState('10000');
  const [currentValue, setCurrentValue] = useState('7000');
  const [monthlyReturn, setMonthlyReturn] = useState('5');
  const applyScenario = (scenario: (typeof DRAWDOWN_SCENARIOS)[number]) => {
    setPeakValue(scenario.peakValue);
    setCurrentValue(scenario.currentValue);
    setMonthlyReturn(scenario.monthlyReturn);
  };
  const isScenarioActive = (scenario: (typeof DRAWDOWN_SCENARIOS)[number]) => (
    peakValue === scenario.peakValue
    && currentValue === scenario.currentValue
    && monthlyReturn === scenario.monthlyReturn
  );

  const result = useMemo(() => {
    const peak = Number(peakValue);
    const current = Number(currentValue);
    const monthly = Number(monthlyReturn);

    if ([peak, current, monthly].some((v) => !Number.isFinite(v)) || peak <= 0 || current <= 0 || monthly < 0) {
      return null;
    }

    const drawdownAmount = Math.max(0, peak - current);
    const drawdownPct = peak > 0 ? (drawdownAmount / peak) * 100 : 0;
    const requiredGainPct = current < peak ? ((peak / current) - 1) * 100 : 0;
    const monthsToRecover = current < peak && monthly > 0
      ? Math.log(peak / current) / Math.log(1 + monthly / 100)
      : null;

    let severity: 'Low' | 'Medium' | 'High' = 'Low';
    if (drawdownPct >= 30) severity = 'High';
    else if (drawdownPct >= 15) severity = 'Medium';

    return {
      drawdownAmount,
      drawdownPct,
      requiredGainPct,
      monthsToRecover,
      severity,
    };
  }, [peakValue, currentValue, monthlyReturn]);

  const reset = () => {
    setPeakValue('10000');
    setCurrentValue('7000');
    setMonthlyReturn('5');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {DRAWDOWN_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {getUiString(lang, scenario.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="drawdown-peak">{getUiString(lang, 'Portfolio Peak Value (USD)')}</label>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={peakValue} onChange={(e) => setPeakValue(e.target.value)} min="0" step="any" id="drawdown-peak" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="drawdown-current">{getUiString(lang, 'Current Portfolio Value (USD)')}</label>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} min="0" step="any" id="drawdown-current" onFocus={(e) => e.target.select()} />
            </div>
            <div className="pills-row">
              {[90, 80, 70, 60, 50].map((pct) => {
                const peak = Number(peakValue);
                return (
                  <button
                    key={pct}
                    className="pill-btn"
                    onClick={() => {
                      if (Number.isFinite(peak) && peak > 0) {
                        setCurrentValue(String((peak * pct) / 100));
                      }
                    }}
                  >
                    {pct}% {getUiString(lang, 'of peak')}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="drawdown-monthly-return">{getUiString(lang, 'Assumed Monthly Return for Recovery (%)')}</label>
            <div className="pills-row">
              {MONTHLY_RETURN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${monthlyReturn === String(preset) ? 'active' : ''}`}
                  onClick={() => setMonthlyReturn(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} min="0" step="any" id="drawdown-monthly-return" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Large drawdowns require disproportionately higher recovery gains.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.drawdownPct > 0 ? 'loss' : 'profit'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Current Drawdown')}</span>
                <span className="result-hero-value"><AlertTriangle size={28} />{result.drawdownPct.toFixed(2)}%</span>
                <span className={`result-hero-roi ${result.drawdownPct > 0 ? 'loss' : 'profit'}`}>
                  {result.drawdownPct > 0 ? `-${formatUSD(result.drawdownAmount)}` : getUiString(lang, 'No drawdown')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Drawdown amount')}</span><span className={`result-value ${result.drawdownAmount > 0 ? 'loss' : 'profit'}`}>{result.drawdownAmount > 0 ? '-' : ''}{formatUSD(result.drawdownAmount)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Required gain to recover')}</span><span className={`result-value ${result.requiredGainPct > 0 ? 'fee' : 'profit'}`}>{result.requiredGainPct.toFixed(2)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Recovery risk level')}</span><span className={`result-value ${result.severity === 'High' ? 'loss' : result.severity === 'Medium' ? 'fee' : 'profit'}`}>{getUiString(lang, result.severity)}</span></div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Estimated months to recover')}</span>
                  <span className="result-value">
                    {result.monthsToRecover === null ? getUiString(lang, 'N/A (no positive monthly return)') : `${result.monthsToRecover.toFixed(1)} ${getUiString(lang, 'months')}`}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Large drawdowns require disproportionately larger gains. Recovery timing assumes stable monthly returns and no extra withdrawals.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h2>{getUiString(lang, 'Enter valid portfolio values')}</h2><p>{getUiString(lang, 'Set peak and current value to estimate drawdown and required recovery gain.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DrawdownCalculator);
