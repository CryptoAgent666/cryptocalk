import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BadgeDollarSign, Info, RotateCcw, TrendingUp } from 'lucide-react';

type CompoundingMode = 'simple' | 'monthly' | 'daily';

const DEPOSIT_PRESETS = [1000, 5000, 10000, 25000];
const APY_PRESETS = [4, 8, 12, 20];
const TERM_PRESETS = [3, 6, 12, 24];
const FEE_PRESETS = [0, 5, 10, 20];
const LENDING_SCENARIOS: Array<{
  label: string;
  principal: string;
  apy: string;
  termMonths: string;
  platformFee: string;
  compounding: CompoundingMode;
}> = [
  { label: 'Conservative', principal: '5000', apy: '4', termMonths: '12', platformFee: '20', compounding: 'simple' },
  { label: 'Balanced', principal: '10000', apy: '8', termMonths: '12', platformFee: '10', compounding: 'monthly' },
  { label: 'Growth', principal: '25000', apy: '12', termMonths: '24', platformFee: '5', compounding: 'daily' },
];

function formatUSD(value: number): string {
  return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function LendingCalculator({ lang = 'en' }: { lang?: string }) {
  const [principal, setPrincipal] = useState('5000');
  const [apy, setApy] = useState('8');
  const [termMonths, setTermMonths] = useState('12');
  const [platformFee, setPlatformFee] = useState('10');
  const [compounding, setCompounding] = useState<CompoundingMode>('monthly');
  const applyScenario = (scenario: (typeof LENDING_SCENARIOS)[number]) => {
    setPrincipal(scenario.principal);
    setApy(scenario.apy);
    setTermMonths(scenario.termMonths);
    setPlatformFee(scenario.platformFee);
    setCompounding(scenario.compounding);
  };
  const isScenarioActive = (scenario: (typeof LENDING_SCENARIOS)[number]) => (
    principal === scenario.principal
    && apy === scenario.apy
    && termMonths === scenario.termMonths
    && platformFee === scenario.platformFee
    && compounding === scenario.compounding
  );

  const result = useMemo(() => {
    const p = Number(principal);
    const annualRate = Number(apy);
    const months = Number(termMonths);
    const fee = Number(platformFee);

    if ([p, annualRate, months, fee].some((v) => !Number.isFinite(v)) || p <= 0 || annualRate < 0 || months <= 0 || fee < 0) {
      return null;
    }

    const yearlyRate = annualRate / 100;
    let grossFinal = p;

    if (compounding === 'simple') {
      grossFinal = p * (1 + yearlyRate * (months / 12));
    } else if (compounding === 'monthly') {
      grossFinal = p * Math.pow(1 + yearlyRate / 12, months);
    } else {
      const dayCount = months * 30.4375;
      grossFinal = p * Math.pow(1 + yearlyRate / 365, dayCount);
    }

    const grossInterest = grossFinal - p;
    const feeCost = grossInterest * (fee / 100);
    const netInterest = grossInterest - feeCost;
    const netFinal = p + netInterest;
    const annualizedReturn = Math.pow(netFinal / p, 12 / months) - 1;

    return {
      grossFinal,
      grossInterest,
      feeCost,
      netInterest,
      netFinal,
      annualizedReturn,
    };
  }, [principal, apy, termMonths, platformFee, compounding]);

  const reset = () => {
    setPrincipal('5000');
    setApy('8');
    setTermMonths('12');
    setPlatformFee('10');
    setCompounding('monthly');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {LENDING_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Deposit Amount (USD)</label>
            <div className="pills-row">
              {DEPOSIT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${principal === String(preset) ? 'active' : ''}`}
                  onClick={() => setPrincipal(String(preset))}
                >
                  ${preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="0" step="any" id="lending-principal" />
            </div>
          </div>

          <div className="input-group">
            <label>Quoted APY (%)</label>
            <div className="pills-row">
              {APY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${apy === String(preset) ? 'active' : ''}`}
                  onClick={() => setApy(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={apy} onChange={(e) => setApy(e.target.value)} min="0" step="any" id="lending-apy" />
            </div>
          </div>

          <div className="input-group">
            <label>Term (months)</label>
            <div className="pills-row">
              {TERM_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${termMonths === String(preset) ? 'active' : ''}`}
                  onClick={() => setTermMonths(String(preset))}
                >
                  {preset}mo
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} min="1" step="1" id="lending-term" />
          </div>

          <div className="input-group">
            <label>Platform Performance Fee (%)</label>
            <div className="pills-row">
              {FEE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${platformFee === String(preset) ? 'active' : ''}`}
                  onClick={() => setPlatformFee(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={platformFee} onChange={(e) => setPlatformFee(e.target.value)} min="0" step="any" id="lending-fee" />
            </div>
          </div>

          <div className="input-group">
            <label>Compounding Model</label>
            <div className="toggle-group" role="tablist" aria-label="Compounding model">
              <button type="button" className={`toggle-btn ${compounding === 'simple' ? 'active' : ''}`} onClick={() => setCompounding('simple')}>
                Simple
              </button>
              <button type="button" className={`toggle-btn ${compounding === 'monthly' ? 'active' : ''}`} onClick={() => setCompounding('monthly')}>
                Monthly
              </button>
              <button type="button" className={`toggle-btn ${compounding === 'daily' ? 'active' : ''}`} onClick={() => setCompounding('daily')}>
                Daily
              </button>
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> Reset</button>
          <span className="input-hint">
            Auto-calculates as you type. Compare net return across compounding models after platform fee.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netInterest >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Projected Final Balance')}</span>
                <span className="result-hero-value"><BadgeDollarSign size={28} />{formatUSD(result.netFinal)}</span>
                <span className={`result-hero-roi ${result.netInterest >= 0 ? 'profit' : 'loss'}`}>
                  Net interest {result.netInterest >= 0 ? '+' : ''}{formatUSD(result.netInterest)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross final balance')}</span><span className="result-value">{formatUSD(result.grossFinal)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross interest')}</span><span className="result-value">{formatUSD(result.grossInterest)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Performance fee')}</span><span className="result-value fee">-{formatUSD(result.feeCost)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label"><strong>{getUiString(lang, 'Net final balance')}</strong></span><span className="result-value"><strong>{formatUSD(result.netFinal)}</strong></span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Annualized net APY')}</span><span className={`result-value ${result.annualizedReturn >= 0 ? 'profit' : 'loss'}`}>{(result.annualizedReturn * 100).toFixed(2)}%</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Rates, lock periods, and real payout schedules vary by protocol and platform. Use conservative assumptions for planning.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid lending inputs')}</h3><p>{getUiString(lang, 'Set deposit amount, APY, and duration to model your net lending return.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
