import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Building2, Info, RotateCcw, Landmark } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const RWA_PROTOCOLS = [
  { id: 'ondo-usdy', label: 'Ondo USDY', apy: '4.85', minDeposit: '500', mgmtFee: '0', riskScore: 'low', category: 'treasuries' },
  { id: 'blackrock-buidl', label: 'BlackRock BUIDL', apy: '4.50', minDeposit: '5000000', mgmtFee: '0.50', riskScore: 'low', category: 'treasuries' },
  { id: 'maker-dsr', label: 'Maker DSR', apy: '5.00', minDeposit: '0', mgmtFee: '0', riskScore: 'low', category: 'treasuries' },
  { id: 'maple-finance', label: 'Maple Finance', apy: '11.50', minDeposit: '50000', mgmtFee: '0.75', riskScore: 'medium', category: 'private-credit' },
  { id: 'centrifuge', label: 'Centrifuge', apy: '8.50', minDeposit: '5000', mgmtFee: '1.00', riskScore: 'medium', category: 'private-credit' },
  { id: 'goldfinch', label: 'Goldfinch', apy: '12.00', minDeposit: '10000', mgmtFee: '1.50', riskScore: 'high', category: 'private-credit' },
  { id: 'realt', label: 'RealT (Real Estate)', apy: '9.50', minDeposit: '50', mgmtFee: '2.00', riskScore: 'medium', category: 'real-estate' },
  { id: 'paxg', label: 'PAXG (Gold)', apy: '0.00', minDeposit: '0', mgmtFee: '0.02', riskScore: 'low', category: 'commodities' },
] as const;

function RwaYieldCalculator({ lang = 'en' }: { lang?: string }) {
  const [protocol, setProtocol] = useState<typeof RWA_PROTOCOLS[number]['id']>('ondo-usdy');
  const [deposit, setDeposit] = useState('10000');
  const [apy, setApy] = useState('4.85');
  const [mgmtFee, setMgmtFee] = useState('0');
  const [years, setYears] = useState('5');
  const [taxRate, setTaxRate] = useState('22');
  const [compoundFreq, setCompoundFreq] = useState<'1' | '12' | '52' | '365'>('365');

  const applyProtocol = (id: typeof RWA_PROTOCOLS[number]['id']) => {
    const p = RWA_PROTOCOLS.find((x) => x.id === id);
    if (!p) return;
    setProtocol(id);
    setApy(p.apy); setMgmtFee(p.mgmtFee);
    if (Number(deposit) < Number(p.minDeposit)) setDeposit(p.minDeposit);
  };

  const result = useMemo(() => {
    const d = Number(deposit);
    const a = Number(apy) / 100;
    const fee = Number(mgmtFee) / 100;
    const yrs = Number(years);
    const tx = Number(taxRate) / 100;
    const n = Number(compoundFreq);

    if (![d, a, fee, yrs, tx, n].every(Number.isFinite)) return null;
    if (d <= 0 || yrs <= 0 || n <= 0 || a < 0) return null;

    const netApy = a - fee;
    const futureValue = d * Math.pow(1 + netApy / n, n * yrs);
    const totalGain = futureValue - d;
    const totalGainPct = (totalGain / d) * 100;
    const cagr = Math.pow(futureValue / d, 1 / yrs) - 1;

    const annualGrossInterest = d * a;
    const annualMgmtFee = d * fee;
    const annualNetInterest = annualGrossInterest - annualMgmtFee;
    const monthlyNet = annualNetInterest / 12;
    const dailyNet = annualNetInterest / 365;

    const taxOwed = totalGain * tx;
    const afterTaxGain = totalGain - taxOwed;
    const afterTaxValue = d + afterTaxGain;
    const afterTaxApy = Math.pow(afterTaxValue / d, 1 / yrs) - 1;

    // Risk-adjusted return (Sharpe-like, RFR=4.5% T-bills)
    const rfr = 0.045;
    const excessReturn = netApy - rfr;
    const riskScore = RWA_PROTOCOLS.find((x) => x.id === protocol)?.riskScore || 'medium';
    const assumedVol = riskScore === 'low' ? 0.02 : riskScore === 'medium' ? 0.08 : 0.18;
    const sharpe = assumedVol > 0 ? excessReturn / assumedVol : 0;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (sharpe > 0.8) { zone = 'profit'; rating = 'Excellent risk-adj return'; }
    else if (sharpe > 0.4) { zone = 'profit'; rating = 'Good risk-adj return'; }
    else if (sharpe > 0) { zone = 'neutral'; rating = 'Marginal vs T-bills'; }
    else { zone = 'loss'; rating = 'Below T-bill rate'; }

    return {
      netApy: netApy * 100, futureValue, totalGain, totalGainPct, cagr: cagr * 100,
      annualGrossInterest, annualMgmtFee, annualNetInterest, monthlyNet, dailyNet,
      taxOwed, afterTaxGain, afterTaxValue, afterTaxApy: afterTaxApy * 100,
      excessReturn: excessReturn * 100, sharpe, zone, rating, riskScore,
    };
  }, [deposit, apy, mgmtFee, years, taxRate, compoundFreq, protocol]);

  const reset = () => { applyProtocol('ondo-usdy'); setDeposit('10000'); setYears('5'); setTaxRate('22'); setCompoundFreq('365'); };

  const formatUSD = (v: number) => {
    if (!Number.isFinite(v)) return '—';
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(v);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'RWA Protocol')}</label>
            <div className="pills-row">
              {RWA_PROTOCOLS.map((p) => (
                <button key={p.id}
                  className={`pill-btn ${protocol === p.id ? 'active' : ''}`}
                  onClick={() => applyProtocol(p.id)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="rwa-deposit">{getUiString(lang, 'Deposit Amount')} (USD)</label>
            <input type="number" inputMode="decimal" id="rwa-deposit" value={deposit}
              onChange={(e) => setDeposit(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="rwa-apy">{getUiString(lang, 'Gross APY')} (%)</label>
            <input type="number" inputMode="decimal" id="rwa-apy" value={apy}
              onChange={(e) => setApy(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="rwa-fee">{getUiString(lang, 'Management Fee')} (%)</label>
            <input type="number" inputMode="decimal" id="rwa-fee" value={mgmtFee}
              onChange={(e) => setMgmtFee(e.target.value)} min="0" max="10" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="rwa-years">{getUiString(lang, 'Holding Period')} ({getUiString(lang, 'years')})</label>
            <div className="pills-row">
              {['1', '3', '5', '10', '20'].map((p) => (
                <button key={p}
                  className={`pill-btn ${years === p ? 'active' : ''}`}
                  onClick={() => setYears(p)}>
                  {p}y
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="rwa-years" value={years}
              onChange={(e) => setYears(e.target.value)} min="0.1" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="rwa-comp">{getUiString(lang, 'Compounding Frequency')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${compoundFreq === '1' ? 'active' : ''}`} onClick={() => setCompoundFreq('1')}>{getUiString(lang, 'Annual')}</button>
              <button className={`pill-btn ${compoundFreq === '12' ? 'active' : ''}`} onClick={() => setCompoundFreq('12')}>{getUiString(lang, 'Monthly')}</button>
              <button className={`pill-btn ${compoundFreq === '52' ? 'active' : ''}`} onClick={() => setCompoundFreq('52')}>{getUiString(lang, 'Weekly')}</button>
              <button className={`pill-btn ${compoundFreq === '365' ? 'active' : ''}`} onClick={() => setCompoundFreq('365')}>{getUiString(lang, 'Daily')}</button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="rwa-tax">{getUiString(lang, 'Income Tax Rate')} (%)</label>
            <input type="number" inputMode="decimal" id="rwa-tax" value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)} min="0" max="60" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'RWA yields are typically taxed as ordinary income (interest), not capital gains. Some protocols are restricted to accredited or non-US investors.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'After-Tax Future Value')}</span>
                <span className="result-hero-value"><Landmark size={28} />
                  {formatUSD(result.afterTaxValue)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.afterTaxApy.toFixed(2)}% APY · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net APY (after fees)')}</span>
                  <span className="result-value">{result.netApy.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'CAGR (with compounding)')}</span>
                  <span className="result-value">{result.cagr.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual gross interest')}</span>
                  <span className="result-value profit">+{formatUSD(result.annualGrossInterest)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual management fee')}</span>
                  <span className="result-value fee">−{formatUSD(result.annualMgmtFee)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual net interest')}</span>
                  <span className="result-value profit">+{formatUSD(result.annualNetInterest)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly cash flow')}</span>
                  <span className="result-value">{formatUSD(result.monthlyNet)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily cash flow')}</span>
                  <span className="result-value">{formatUSD(result.dailyNet)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Future value (pre-tax)')}</span>
                  <span className="result-value">{formatUSD(result.futureValue)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total gain (pre-tax)')}</span>
                  <span className="result-value profit">+{formatUSD(result.totalGain)} ({result.totalGainPct.toFixed(2)}%)</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Tax owed')}</span>
                  <span className="result-value fee">−{formatUSD(result.taxOwed)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'After-tax gain')}</span>
                  <span className="result-value profit">+{formatUSD(result.afterTaxGain)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Excess vs T-bills (4.5%)')}</span>
                  <span className={`result-value ${result.excessReturn > 0 ? 'profit' : 'loss'}`}>
                    {result.excessReturn >= 0 ? '+' : ''}{result.excessReturn.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Risk-adjusted return (Sharpe est.)')}</span>
                  <span className={`result-value ${result.sharpe > 0.5 ? 'profit' : result.sharpe > 0 ? '' : 'loss'}`}>
                    {result.sharpe.toFixed(2)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Risk category')}</span>
                  <span className="result-value">{getUiString(lang, result.riskScore.charAt(0).toUpperCase() + result.riskScore.slice(1))}</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'RWA protocols carry smart contract risk, custody risk, and credit risk (private credit). Treasuries are backed by the issuing fund, not FDIC-insured. Yields shown are gross of price changes in underlying assets.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Building2 size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Deposit, APY, and holding period must be positive numbers.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(RwaYieldCalculator);
