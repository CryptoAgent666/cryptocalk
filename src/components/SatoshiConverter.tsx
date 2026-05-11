import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    Zap,
    RefreshCw,
    Loader2,
    ArrowUpDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const SATS_PER_BTC = 100_000_000;

type InputMode = 'satoshi' | 'btc' | 'usd';
type FiatCurrency = 'usd' | 'eur';

const FIAT_LABELS: Record<FiatCurrency, string> = { usd: 'USD', eur: 'EUR' };
const FIAT_SYMBOLS: Record<FiatCurrency, string> = { usd: '$', eur: '\u20ac' };

const QUICK_SATS = [1000, 10_000, 100_000, 1_000_000, 10_000_000, 50_000_000];
const QUICK_USD = [1, 5, 10, 50, 100, 500];
const QUICK_BTC = [0.001, 0.01, 0.1, 0.25, 0.5, 1];

function SatoshiConverter({ lang = 'en' }: { lang?: string }) {
    const [inputMode, setInputMode] = useState<InputMode>('satoshi');
    const [amount, setAmount] = useState('');
    const [fiat, setFiat] = useState<FiatCurrency>('usd');

    const [btcPrice, setBtcPrice] = useState<Record<FiatCurrency, number | null>>({ usd: null, eur: null });
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Fetch BTC price
    const fetchPrice = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur&x_cg_demo_api_key=${import.meta.env.PUBLIC_COINGECKO_API_KEY || ''}`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            setBtcPrice({
                usd: data.bitcoin?.usd ?? null,
                eur: data.bitcoin?.eur ?? null,
            });
            setLastUpdated(new Date());
        } catch {
            // keep previous price on error
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPrice();
    }, [fetchPrice]);

    const currentPrice = btcPrice[fiat];
    const parsedAmount = parseFloat(amount) || 0;

    // Compute conversions based on input mode
    let sats = 0;
    let btc = 0;
    let fiatValue = 0;

    if (currentPrice && parsedAmount > 0) {
        if (inputMode === 'satoshi') {
            sats = parsedAmount;
            btc = sats / SATS_PER_BTC;
            fiatValue = btc * currentPrice;
        } else if (inputMode === 'btc') {
            btc = parsedAmount;
            sats = btc * SATS_PER_BTC;
            fiatValue = btc * currentPrice;
        } else {
            fiatValue = parsedAmount;
            btc = fiatValue / currentPrice;
            sats = btc * SATS_PER_BTC;
        }
    }

    const hasResult = parsedAmount > 0 && currentPrice !== null;

    // Quick reference: how many sats for $1, $10, $100, $1000
    const satsPerDollar = currentPrice ? SATS_PER_BTC / currentPrice : 0;
    const fiatAmounts = [1, 10, 100, 1000];
    const satAmounts = [1, 100, 1000, 10_000, 100_000, 1_000_000];

    const reset = () => {
        setAmount('');
        setInputMode('satoshi');
        setFiat('usd');
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatFiat = (n: number) => {
        if (n < 0.01 && n > 0) return `${FIAT_SYMBOLS[fiat]}${n.toFixed(8)}`;
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: n < 1 ? 8 : 2,
        }).format(n);
    };

    const formatSats = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            maximumFractionDigits: 0,
        }).format(Math.round(n));

    const formatBTC = (n: number) => {
        if (n === 0) return '0';
        if (n < 0.00000001) return n.toExponential(2);
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
        }).format(n);
    };

    const quickAmounts = inputMode === 'satoshi' ? QUICK_SATS : inputMode === 'btc' ? QUICK_BTC : QUICK_USD;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Input Panel */}
                <div className="calc-input-panel">
                    {/* Input Mode */}
                    <div className="input-group">
                        <label><Zap size={14} /> {getUiString(lang, 'Input Mode')}</label>
                        <div className="pills-row">
                            {(['satoshi', 'btc', 'usd'] as InputMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    className={`pill-btn ${inputMode === mode ? 'active' : ''}`}
                                    onClick={() => { setInputMode(mode); setAmount(''); }}
                                >
                                    {mode === 'satoshi' ? getUiString(lang, 'Satoshi') : mode === 'btc' ? 'BTC' : 'USD'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="input-group">
                        <label htmlFor="satoshi-amount">
                            <DollarSign size={14} />
                            {inputMode === 'satoshi' ? getUiString(lang, 'Amount (sats)') : inputMode === 'btc' ? getUiString(lang, 'Amount (BTC)') : getUiString(lang, 'Amount (USD)')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder=""
                                id="satoshi-amount"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Amounts')}</label>
                        <div className="pills-row" style={{ flexWrap: 'wrap' }}>
                            {quickAmounts.map((val) => (
                                <button
                                    key={val}
                                    className={`pill-btn ${amount === String(val) ? 'active' : ''}`}
                                    onClick={() => setAmount(String(val))}
                                >
                                    {inputMode === 'satoshi'
                                        ? val >= 1_000_000 ? `${val / 1_000_000}M` : val >= 1_000 ? `${val / 1_000}K` : String(val)
                                        : inputMode === 'usd'
                                            ? `$${val}`
                                            : String(val)
                                    }
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Fiat Currency */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Fiat Currency')}</label>
                        <div className="toggle-group">
                            {(['usd', 'eur'] as FiatCurrency[]).map((f) => (
                                <button
                                    key={f}
                                    className={`toggle-btn ${fiat === f ? 'active' : ''}`}
                                    onClick={() => setFiat(f)}
                                >
                                    {FIAT_LABELS[f]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BTC Price Display */}
                    <div className="input-group">
                        <label><RefreshCw size={14} /> {getUiString(lang, 'BTC Price')}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)' }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                                        <Loader2 size={14} className="spin-icon" /> {getUiString(lang, 'Fetching...')}
                                    </span>
                                ) : currentPrice ? (
                                    `${FIAT_SYMBOLS[fiat]}${new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US').format(currentPrice)}`
                                ) : (
                                    getUiString(lang, 'Unavailable')
                                )}
                            </span>
                            <button
                                onClick={fetchPrice}
                                style={{
                                    padding: '4px 8px', border: '1px solid var(--color-border)', borderRadius: '6px',
                                    background: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center',
                                    gap: '4px', fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontFamily: 'inherit',
                                }}
                                aria-label="Refresh price"
                            >
                                <RefreshCw size={12} /> {getUiString(lang, 'Refresh')}
                            </button>
                        </div>
                        {lastUpdated && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                {getUiString(lang, 'Updated')} {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                </div>

                {/* Results Panel */}
                <div className="calc-results-panel">
                    {hasResult ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero">
                                <span className="result-hero-label">{getUiString(lang, 'Conversion Result')}</span>
                                <span className="result-hero-value">
                                    <Zap size={28} />
                                    {inputMode === 'satoshi'
                                        ? `${FIAT_SYMBOLS[fiat]}${formatFiat(fiatValue)}`
                                        : inputMode === 'btc'
                                            ? `${formatSats(sats)} sats`
                                            : `${formatSats(sats)} sats`
                                    }
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    {inputMode === 'satoshi'
                                        ? `${formatSats(sats)} sats = ${formatBTC(btc)} BTC`
                                        : inputMode === 'btc'
                                            ? `${formatBTC(btc)} BTC = ${FIAT_SYMBOLS[fiat]}${formatFiat(fiatValue)}`
                                            : `${FIAT_SYMBOLS[fiat]}${formatFiat(fiatValue)} = ${formatBTC(btc)} BTC`
                                    }
                                </span>
                            </div>

                            {/* Full Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Satoshis')}</span>
                                    <span className="result-value">{formatSats(sats)} sats</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Bitcoin')}</span>
                                    <span className="result-value">{formatBTC(btc)} BTC</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{FIAT_LABELS[fiat]} {getUiString(lang, 'Value')}</span>
                                    <span className="result-value">{FIAT_SYMBOLS[fiat]}{formatFiat(fiatValue)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'BTC Price')}</span>
                                    <span className="result-value">{FIAT_SYMBOLS[fiat]}{new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US').format(currentPrice!)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, '1 Sat Value')}</span>
                                    <span className="result-value">{FIAT_SYMBOLS[fiat]}{(currentPrice! / SATS_PER_BTC).toFixed(8)}</span>
                                </div>
                            </div>

                            {/* Quick Reference: Fiat to Sats */}
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {FIAT_LABELS[fiat]} {getUiString(lang, 'to Satoshis')}
                                </h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{FIAT_LABELS[fiat]}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Satoshis')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'BTC')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fiatAmounts.map((val) => {
                                                const s = (val / currentPrice!) * SATS_PER_BTC;
                                                const b = val / currentPrice!;
                                                return (
                                                    <tr key={val} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px', fontWeight: 500 }}>{FIAT_SYMBOLS[fiat]}{val}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{formatSats(s)}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{formatBTC(b)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Quick Reference: Sats to Fiat */}
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Satoshis to')} {FIAT_LABELS[fiat]}
                                </h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Satoshis')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{FIAT_LABELS[fiat]}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'BTC')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {satAmounts.map((val) => {
                                                const b = val / SATS_PER_BTC;
                                                const f = b * currentPrice!;
                                                return (
                                                    <tr key={val} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px', fontWeight: 500 }}>{formatSats(val)} sats</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{FIAT_SYMBOLS[fiat]}{formatFiat(f)}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{formatBTC(b)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Prices from CoinGecko. For informational purposes only — not financial advice. Actual exchange rates may vary.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowUpDown size={40} /></div>
                            <h2>{getUiString(lang, 'Convert Satoshis')}</h2>
                            <p>{getUiString(lang, 'Enter an amount in Satoshis, BTC, or USD to see instant conversions with a live reference table.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(SatoshiConverter);
