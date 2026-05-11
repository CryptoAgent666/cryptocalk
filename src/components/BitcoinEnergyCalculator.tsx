import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Info, Leaf, RotateCcw, Zap } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const ENERGY_SOURCES = ['Coal', 'Gas', 'Nuclear', 'Hydro', 'Solar', 'Wind', 'Grid Mix'] as const;
type EnergySource = (typeof ENERGY_SOURCES)[number];

// kg CO2 per kWh
const CO2_PER_KWH: Record<EnergySource, number> = {
  Coal: 0.95, Gas: 0.45, Nuclear: 0.012, Hydro: 0.024,
  Solar: 0.041, Wind: 0.011, 'Grid Mix': 0.42,
};

// Average US household uses ~10,632 kWh/year
const HOUSEHOLD_KWH_YEAR = 10632;
// Rough estimate: network hashrate 850 EH/s, ~450 BTC/day
const NETWORK_HASHRATE_THS = 850_000_000;
const BTC_PER_DAY_NETWORK = 450;

const SCENARIOS = [
  { label: 'Home Miner Solar', hashrate: '140', power: '3400', source: 'Solar' as EnergySource, hoursPerDay: '24', offsetPrice: '15' },
  { label: 'Farm Coal China', hashrate: '14000', power: '340000', source: 'Coal' as EnergySource, hoursPerDay: '24', offsetPrice: '8' },
  { label: 'Hydro Iceland', hashrate: '5000', power: '120000', source: 'Hydro' as EnergySource, hoursPerDay: '24', offsetPrice: '20' },
] as const;

function BitcoinEnergyCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtNum = (v: number, d = 2) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const fmtUSD = (v: number) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

  const [hashrate, setHashrate] = useState('140');
  const [power, setPower] = useState('3400');
  const [source, setSource] = useState<EnergySource>('Solar');
  const [hoursPerDay, setHoursPerDay] = useState('24');
  const [offsetPrice, setOffsetPrice] = useState('15');
  const [elecCost, setElecCost] = useState('0.10');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setHashrate(s.hashrate); setPower(s.power); setSource(s.source);
    setHoursPerDay(s.hoursPerDay); setOffsetPrice(s.offsetPrice);
  };
  const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
    hashrate === s.hashrate && power === s.power && source === s.source &&
    hoursPerDay === s.hoursPerDay && offsetPrice === s.offsetPrice;

  const result = useMemo(() => {
    const hr = parseFloat(hashrate) || 0;
    const pw = parseFloat(power) || 0;
    const hpd = parseFloat(hoursPerDay) || 0;
    const op = parseFloat(offsetPrice) || 0;
    const ec = parseFloat(elecCost) || 0;
    if (hr <= 0 || pw <= 0 || hpd <= 0) return null;

    const dailyKwh = (pw / 1000) * hpd;
    const annualKwh = dailyKwh * 365;
    const annualMwh = annualKwh / 1000;

    const co2Factor = CO2_PER_KWH[source];
    const annualCo2Kg = annualKwh * co2Factor;
    const annualCo2Tons = annualCo2Kg / 1000;

    const carbonOffsetCost = annualCo2Tons * op;

    // BTC mined estimate
    const minerSharePerDay = hr / NETWORK_HASHRATE_THS;
    const btcPerDay = minerSharePerDay * BTC_PER_DAY_NETWORK;
    const btcPerYear = btcPerDay * 365;
    const energyCostPerBtc = btcPerDay > 0 ? (dailyKwh * ec) / btcPerDay : 0;

    const householdEquiv = annualKwh / HOUSEHOLD_KWH_YEAR;

    const annualElecCost = annualKwh * ec;

    return { dailyKwh, annualMwh, annualCo2Tons, carbonOffsetCost, energyCostPerBtc, householdEquiv, btcPerYear, annualElecCost, co2Factor };
  }, [hashrate, power, source, hoursPerDay, offsetPrice, elecCost]);

  const reset = () => {
    setHashrate('140'); setPower('3400'); setSource('Solar');
    setHoursPerDay('24'); setOffsetPrice('15'); setElecCost('0.10');
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
            <label htmlFor="be-hash">{getUiString(lang, 'Hashrate (TH/s)')}</label>
            <div className="pills-row">
              {[140, 500, 5000, 14000].map((p) => (
                <button key={p} className={`pill-btn ${hashrate === String(p) ? 'active' : ''}`} onClick={() => setHashrate(String(p))}>{p >= 1000 ? `${p / 1000}k` : p}</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={hashrate} onChange={(e) => setHashrate(e.target.value)} min="0" step="any" id="be-hash" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="be-power">{getUiString(lang, 'Power Consumption (W)')}</label>
            <input type="number" inputMode="decimal" value={power} onChange={(e) => setPower(e.target.value)} min="0" step="any" id="be-power" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Electricity Source')}</label>
            <div className="pills-row" style={{ flexWrap: 'wrap' }}>
              {ENERGY_SOURCES.map((s) => (
                <button key={s} className={`pill-btn ${source === s ? 'active' : ''}`} onClick={() => setSource(s)}>
                  {getUiString(lang, s)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="be-hours">{getUiString(lang, 'Hours of Operation per Day')}</label>
            <div className="pills-row">
              {[8, 12, 18, 24].map((h) => (
                <button key={h} className={`pill-btn ${hoursPerDay === String(h) ? 'active' : ''}`} onClick={() => setHoursPerDay(String(h))}>{h}h</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} min="1" max="24" step="1" id="be-hours" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="be-elec">{getUiString(lang, 'Electricity Cost ($/kWh)')}</label>
            <div className="pills-row">
              {[0.05, 0.08, 0.10, 0.15].map((p) => (
                <button key={p} className={`pill-btn ${elecCost === String(p) ? 'active' : ''}`} onClick={() => setElecCost(String(p))}>${p}</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={elecCost} onChange={(e) => setElecCost(e.target.value)} min="0" step="any" id="be-elec" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="be-offset">{getUiString(lang, 'Carbon Offset Price ($/ton)')}</label>
            <input type="number" inputMode="decimal" value={offsetPrice} onChange={(e) => setOffsetPrice(e.target.value)} min="0" step="any" id="be-offset" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. CO2 factors from lifecycle emission studies.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.annualCo2Tons < 1 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Annual CO2 Emissions')}</span>
                <span className="result-hero-value"><Leaf size={28} />{fmtNum(result.annualCo2Tons)} {getUiString(lang, 'tons')}</span>
                <span className="result-hero-roi">{fmtNum(result.co2Factor, 3)} kg/{getUiString(lang, 'kWh')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Daily Energy')}</span><span className="result-value">{fmtNum(result.dailyKwh)} {getUiString(lang, 'kWh')}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Annual Energy')}</span><span className="result-value">{fmtNum(result.annualMwh)} {getUiString(lang, 'MWh')}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Annual Electricity Cost')}</span><span className="result-value loss">{fmtUSD(result.annualElecCost)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Carbon Offset Cost')}</span><span className="result-value">{fmtUSD(result.carbonOffsetCost)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Energy Cost per BTC Mined')}</span><span className="result-value">{fmtUSD(result.energyCostPerBtc)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Est. BTC Mined per Year')}</span><span className="result-value">{fmtNum(result.btcPerYear, 6)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Household Equivalent')}</span><span className="result-value">{fmtNum(result.householdEquiv, 1)} {getUiString(lang, 'homes')}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'CO2 emission factors are lifecycle averages. Actual emissions vary by region and equipment. Network hashrate assumed at 850 EH/s.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Zap size={40} /></div>
              <h3>{getUiString(lang, 'Enter mining parameters')}</h3>
              <p>{getUiString(lang, 'Set hashrate, power consumption, and energy source to calculate carbon footprint.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(BitcoinEnergyCalculator);
