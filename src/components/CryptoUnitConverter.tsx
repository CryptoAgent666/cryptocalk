import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ArrowRightLeft, Info, Layers, RotateCcw } from 'lucide-react';

type AssetKey = 'BTC' | 'ETH' | 'SOL' | 'USDT';

interface UnitDef {
  id: string;
  label: string;
  exponent: number;
}

const UNIT_MAP: Record<AssetKey, UnitDef[]> = {
  BTC: [
    { id: 'sat', label: 'Satoshi', exponent: 0 },
    { id: 'ubtc', label: 'uBTC (Bits)', exponent: 2 },
    { id: 'mbtc', label: 'mBTC', exponent: 5 },
    { id: 'btc', label: 'BTC', exponent: 8 },
  ],
  ETH: [
    { id: 'wei', label: 'Wei', exponent: 0 },
    { id: 'gwei', label: 'Gwei', exponent: 9 },
    { id: 'micro', label: 'Microether', exponent: 12 },
    { id: 'eth', label: 'Ether', exponent: 18 },
  ],
  SOL: [
    { id: 'lamport', label: 'Lamport', exponent: 0 },
    { id: 'sol', label: 'SOL', exponent: 9 },
  ],
  USDT: [
    { id: 'micro-usdt', label: 'Micro-USDT', exponent: 0 },
    { id: 'usdt', label: 'USDT', exponent: 6 },
  ],
};

function formatNum(value: number): string {
  if (!Number.isFinite(value)) return '0';
  if (Math.abs(value) >= 1_000_000) return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (Math.abs(value) >= 1) return value.toLocaleString('en-US', { maximumFractionDigits: 8 });
  return value.toLocaleString('en-US', { maximumFractionDigits: 12 });
}

export default function CryptoUnitConverter({ lang = 'en' }: { lang?: string }) {
  const [asset, setAsset] = useState<AssetKey>('BTC');
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('btc');
  const [toUnit, setToUnit] = useState('sat');

  const units = UNIT_MAP[asset];

  const conversion = useMemo(() => {
    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum)) return null;

    const from = units.find((u) => u.id === fromUnit) ?? units[0];
    const to = units.find((u) => u.id === toUnit) ?? units[0];

    const smallest = amountNum * Math.pow(10, from.exponent);
    const converted = smallest / Math.pow(10, to.exponent);

    const allUnits = units.map((unit) => ({
      ...unit,
      value: smallest / Math.pow(10, unit.exponent),
    }));

    return {
      from,
      to,
      converted,
      allUnits,
    };
  }, [amount, fromUnit, toUnit, units]);

  const reset = () => {
    setAmount('1');
    setFromUnit(units[units.length - 1].id);
    setToUnit(units[0].id);
  };

  const quickAmounts = ['0.1', '1', '10', '100', '1000'];

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label><Layers size={14} /> {getUiString(lang, 'Asset')}</label>
            <div className="pills-row">
              {(Object.keys(UNIT_MAP) as AssetKey[]).map((key) => (
                <button
                  key={key}
                  className={`pill-btn ${asset === key ? 'active' : ''}`}
                  onClick={() => {
                    setAsset(key);
                    const next = UNIT_MAP[key];
                    setFromUnit(next[next.length - 1].id);
                    setToUnit(next[0].id);
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Amount</label>
            <input
              type="number" inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="any"
              min="0"
              placeholder=""
              id="unit-converter-amount"
            />
            <div className="pills-row">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${amount === value ? 'active' : ''}`}
                  onClick={() => setAmount(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label><ArrowRightLeft size={14} /> From Unit</label>
            <div className="select-wrap">
              <select className="input-select" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} id="unit-from">
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>To Unit</label>
            <div className="select-wrap">
              <select className="input-select" value={toUnit} onChange={(e) => setToUnit(e.target.value)} id="unit-to">
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="calc-results-panel">
          {conversion ? (
            <>
              <div className="result-hero">
                <span className="result-hero-label">{getUiString(lang, 'Conversion Result')}</span>
                <span className="result-hero-value">
                  <ArrowRightLeft size={28} />
                  {formatNum(conversion.converted)} {conversion.to.label}
                </span>
                <span className="result-hero-roi">
                  {formatNum(Number(amount))} {conversion.from.label}
                </span>
              </div>

              <div className="result-breakdown">
                {conversion.allUnits.map((unit) => (
                  <div className="result-row" key={unit.id}>
                    <span className="result-label">{unit.label}</span>
                    <span className="result-value">{formatNum(unit.value)}</span>
                  </div>
                ))}
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'This converter uses denomination math only and does not fetch market prices. It converts units of the same asset.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
              <h3>{getUiString(lang, 'Enter a valid amount')}</h3>
              <p>{getUiString(lang, 'Pick a crypto asset and units to convert values instantly.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
