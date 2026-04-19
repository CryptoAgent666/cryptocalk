import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    ArrowRightLeft,
    ChevronDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

type BtcUnit = 'BTC' | 'mBTC' | 'μBTC' | 'sat';

interface Results {
    convertedAmount: number;
    usdValue: number;
    btcAmount: number;
    refTable: { unit: BtcUnit; amount: number }[];
}

const UNIT_TO_BTC: Record<BtcUnit, number> = {
    BTC: 1,
    mBTC: 1e-3,
    'μBTC': 1e-6,
    sat: 1e-8,
};

const UNIT_LABELS: BtcUnit[] = ['BTC', 'mBTC', 'μBTC', 'sat'];

const SCENARIOS = [
    { label: '1 BTC', amount: '1', fromUnit: 'BTC' as BtcUnit, toUnit: 'sat' as BtcUnit },
    { label: '100K sats', amount: '100000', fromUnit: 'sat' as BtcUnit, toUnit: 'BTC' as BtcUnit },
    { label: '1M sats', amount: '1000000', fromUnit: 'sat' as BtcUnit, toUnit: 'BTC' as BtcUnit },
] as const;

function BitcoinUnitConverter({ lang = 'en' }: { lang?: string }) {
    const loc = lang === 'en' ? 'en-US' : lang;
    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState<BtcUnit>('BTC');
    const [toUnit, setToUnit] = useState<BtcUnit>('sat');
    const [btcPrice, setBtcPrice] = useState('77300');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setAmount(s.amount);
        setFromUnit(s.fromUnit);
        setToUnit(s.toUnit);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        amount === s.amount && fromUnit === s.fromUnit && toUnit === s.toUnit;

    const calculate = useCallback(() => {
        const amt = parseFloat(amount) || 0;
        const price = parseFloat(btcPrice) || 0;
        if (amt <= 0) { setResults(null); return; }

        const btcAmount = amt * UNIT_TO_BTC[fromUnit];
        const toFactor = UNIT_TO_BTC[toUnit];
        const convertedAmount = toFactor > 0 ? btcAmount / toFactor : 0;
        const usdValue = btcAmount * price;

        const refTable = UNIT_LABELS.map((unit) => ({
            unit,
            amount: UNIT_TO_BTC[unit] > 0 ? btcAmount / UNIT_TO_BTC[unit] : 0,
        }));

        setResults({ convertedAmount, usdValue, btcAmount, refTable });
    }, [amount, fromUnit, toUnit, btcPrice]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setAmount(''); setFromUnit('BTC'); setToUnit('sat');
        setBtcPrice('77300'); setResults(null);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const formatNumber = (n: number, decimals = 8) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            minimumFractionDigits: 0, maximumFractionDigits: decimals,
        }).format(n);
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}>
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="btcunit-amount">{getUiString(lang, 'Amount')}</label>
                        <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)}
                            id="btcunit-amount" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="btcunit-from"><ChevronDown size={14} /> {getUiString(lang, 'From Unit')}</label>
                        <select id="btcunit-from" value={fromUnit} onChange={(e) => setFromUnit(e.target.value as BtcUnit)}>
                            {UNIT_LABELS.map((u) => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="btcunit-to"><ChevronDown size={14} /> {getUiString(lang, 'To Unit')}</label>
                        <select id="btcunit-to" value={toUnit} onChange={(e) => setToUnit(e.target.value as BtcUnit)}>
                            {UNIT_LABELS.map((u) => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="btcunit-price"><DollarSign size={14} /> {getUiString(lang, 'BTC Price (USD)')}</label>
                        <input type="number" inputMode="decimal" value={btcPrice} onChange={(e) => setBtcPrice(e.target.value)}
                            id="btcunit-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Convert between Bitcoin denominations instantly.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Converted Amount')}
                                </span>
                                <span className="result-hero-value">
                                    <ArrowRightLeft size={28} />
                                    {formatNumber(results.convertedAmount)} {toUnit}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'BTC Equivalent')}</span>
                                    <span className="result-value">{formatNumber(results.btcAmount)} BTC</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'USD Value')}</span>
                                    <span className="result-value">{formatUSD(results.usdValue)}</span>
                                </div>
                                <div className="result-divider" />
                            </div>

                            <div className="table-wrapper">
                                <table className="calc-table">
                                    <thead>
                                        <tr>
                                            <th>{getUiString(lang, 'Unit')}</th>
                                            <th>{getUiString(lang, 'Amount')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.refTable.map((row) => (
                                            <tr key={row.unit}>
                                                <td>{row.unit}</td>
                                                <td>{formatNumber(row.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'BTC price is used for USD conversion only. 1 BTC = 1,000 mBTC = 1,000,000 bits = 100,000,000 satoshis.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
                            <h3>{getUiString(lang, 'Convert Bitcoin Units')}</h3>
                            <p>{getUiString(lang, 'Enter an amount and select units to convert between BTC, mBTC, bits, and satoshis.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(BitcoinUnitConverter);
