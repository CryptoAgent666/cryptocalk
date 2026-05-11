import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    ArrowRight,
    Trophy,
    TrendingDown,
    BarChart3,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

type TradeType = 'spot' | 'futures';
type OrderType = 'maker' | 'taker';
type VolumeTier = '<10K' | '10K-50K' | '50K-1M' | '>1M';

interface ExchangeData {
    name: string;
    spot: { maker: number; taker: number };
    futures: { maker: number; taker: number };
    discount?: { token: string; percent: number };
}

const EXCHANGES: ExchangeData[] = [
    { name: 'Binance', spot: { maker: 0.10, taker: 0.10 }, futures: { maker: 0.02, taker: 0.05 }, discount: { token: 'BNB', percent: 25 } },
    { name: 'Bybit', spot: { maker: 0.10, taker: 0.10 }, futures: { maker: 0.02, taker: 0.055 } },
    { name: 'OKX', spot: { maker: 0.08, taker: 0.10 }, futures: { maker: 0.02, taker: 0.05 }, discount: { token: 'OKB', percent: 25 } },
    { name: 'Coinbase', spot: { maker: 0.40, taker: 0.60 }, futures: { maker: 0.02, taker: 0.05 } },
    { name: 'Kraken', spot: { maker: 0.25, taker: 0.40 }, futures: { maker: 0.02, taker: 0.05 } },
    { name: 'KuCoin', spot: { maker: 0.10, taker: 0.10 }, futures: { maker: 0.02, taker: 0.06 }, discount: { token: 'KCS', percent: 20 } },
    { name: 'Gate.io', spot: { maker: 0.20, taker: 0.20 }, futures: { maker: 0.015, taker: 0.05 }, discount: { token: 'GT', percent: 25 } },
    { name: 'Bitget', spot: { maker: 0.10, taker: 0.10 }, futures: { maker: 0.02, taker: 0.06 }, discount: { token: 'BGB', percent: 20 } },
    { name: 'MEXC', spot: { maker: 0.00, taker: 0.10 }, futures: { maker: 0.00, taker: 0.03 } },
    { name: 'HTX', spot: { maker: 0.20, taker: 0.20 }, futures: { maker: 0.02, taker: 0.05 }, discount: { token: 'HT', percent: 25 } },
];

const VOLUME_MULTIPLIERS: Record<VolumeTier, number> = {
    '<10K': 1.0,
    '10K-50K': 0.9,
    '50K-1M': 0.8,
    '>1M': 0.6,
};

const VOLUME_TIERS: { id: VolumeTier; label: string }[] = [
    { id: '<10K', label: '<$10K' },
    { id: '10K-50K', label: '$10K-$50K' },
    { id: '50K-1M', label: '$50K-$1M' },
    { id: '>1M', label: '>$1M' },
];

const AMOUNT_PRESETS = [100, 500, 1000, 5000, 10000, 50000];

function ExchangeFeeComparator({ lang = 'en' }: { lang?: string }) {
    const [tradeType, setTradeType] = useState<TradeType>('spot');
    const [orderType, setOrderType] = useState<OrderType>('taker');
    const [volumeTier, setVolumeTier] = useState<VolumeTier>('<10K');
    const [tradeAmount, setTradeAmount] = useState('1000');

    const amount = parseFloat(tradeAmount) || 0;
    const hasInputs = amount > 0;
    const tierMultiplier = VOLUME_MULTIPLIERS[volumeTier];

    // Calculate fees for each exchange
    const results = EXCHANGES.map((exchange) => {
        const baseFees = tradeType === 'spot' ? exchange.spot : exchange.futures;
        const baseRate = orderType === 'maker' ? baseFees.maker : baseFees.taker;
        const effectiveRate = baseRate * tierMultiplier;
        const feeAmount = amount * (effectiveRate / 100);

        let discountedFee: number | null = null;
        let discountedRate: number | null = null;
        if (exchange.discount) {
            const discountMult = 1 - exchange.discount.percent / 100;
            discountedRate = effectiveRate * discountMult;
            discountedFee = amount * (discountedRate / 100);
        }

        return {
            ...exchange,
            effectiveRate,
            feeAmount,
            discountedRate,
            discountedFee,
            bestFee: discountedFee !== null ? discountedFee : feeAmount,
        };
    }).sort((a, b) => a.bestFee - b.bestFee);

    const cheapest = results[0];
    const mostExpensive = results[results.length - 1];
    const savings = mostExpensive && cheapest ? mostExpensive.bestFee - cheapest.bestFee : 0;

    const reset = () => {
        setTradeType('spot');
        setOrderType('taker');
        setVolumeTier('<10K');
        setTradeAmount('1000');
    };

    const formatUSD = (n: number) => {
        if (n < 0.01 && n > 0) return `$${n.toFixed(6)}`;
        if (n < 1) return `$${n.toFixed(4)}`;
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const formatRate = (n: number) => `${n.toFixed(4)}%`;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    {/* Trade Type */}
                    <div className="input-group">
                        <label><BarChart3 size={14} /> {getUiString(lang, 'Trade Type')}</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${tradeType === 'spot' ? 'active' : ''}`}
                                onClick={() => setTradeType('spot')}
                            >
                                {getUiString(lang, 'Spot')}
                            </button>
                            <button
                                className={`toggle-btn ${tradeType === 'futures' ? 'active' : ''}`}
                                onClick={() => setTradeType('futures')}
                            >
                                {getUiString(lang, 'Futures')}
                            </button>
                        </div>
                    </div>

                    {/* Order Type */}
                    <div className="input-group">
                        <label><ArrowRight size={14} /> {getUiString(lang, 'Order Type')}</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${orderType === 'maker' ? 'active' : ''}`}
                                onClick={() => setOrderType('maker')}
                            >
                                {getUiString(lang, 'Maker')}
                            </button>
                            <button
                                className={`toggle-btn ${orderType === 'taker' ? 'active' : ''}`}
                                onClick={() => setOrderType('taker')}
                            >
                                {getUiString(lang, 'Taker')}
                            </button>
                        </div>
                    </div>

                    {/* 30-Day Volume Tier */}
                    <div className="input-group">
                        <label><TrendingDown size={14} /> {getUiString(lang, '30-Day Volume Tier')}</label>
                        <div className="pills-row">
                            {VOLUME_TIERS.map((tier) => (
                                <button
                                    key={tier.id}
                                    className={`pill-btn ${volumeTier === tier.id ? 'active' : ''}`}
                                    onClick={() => setVolumeTier(tier.id)}
                                >
                                    {getUiString(lang, tier.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trade Amount */}
                    <div className="input-group">
                        <label htmlFor="exchange-fee-amount"><DollarSign size={14} /> {getUiString(lang, 'Trade Amount')}</label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={tradeAmount}
                                onChange={(e) => setTradeAmount(e.target.value)}
                                placeholder=""
                                id="exchange-fee-amount"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row" style={{ marginTop: '8px' }}>
                            {AMOUNT_PRESETS.map((a) => (
                                <button
                                    key={a}
                                    className={`pill-btn ${tradeAmount === String(a) ? 'active' : ''}`}
                                    onClick={() => setTradeAmount(String(a))}
                                >
                                    ${a >= 1000 ? `${(a / 1000).toFixed(0)}K` : a}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Cheapest Exchange')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <Trophy size={28} />
                                    {cheapest.name}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                    {formatUSD(cheapest.bestFee)} {getUiString(lang, 'fee')} ({formatRate(cheapest.discountedRate !== null ? cheapest.discountedRate : cheapest.effectiveRate)})
                                </span>
                            </div>

                            {/* Savings banner */}
                            {savings > 0 && (
                                <div style={{
                                    padding: '10px 14px',
                                    background: 'rgba(34,197,94,0.1)',
                                    border: '1px solid rgba(34,197,94,0.3)',
                                    borderRadius: '10px', fontSize: '0.85rem',
                                    color: 'var(--color-accent-green)',
                                    display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0',
                                }}>
                                    <TrendingDown size={16} />
                                    {getUiString(lang, 'Save')} {formatUSD(savings)} {getUiString(lang, 'vs most expensive')} ({mostExpensive.name})
                                </div>
                            )}

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Trade Type')}</span>
                                    <span className="result-value" style={{ fontWeight: 600 }}>{tradeType === 'spot' ? getUiString(lang, 'Spot') : getUiString(lang, 'Futures')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Order Type')}</span>
                                    <span className="result-value">{orderType === 'maker' ? getUiString(lang, 'Maker') : getUiString(lang, 'Taker')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Volume Tier')}</span>
                                    <span className="result-value">{getUiString(lang, VOLUME_TIERS.find(t => t.id === volumeTier)?.label || '')} ({tierMultiplier}x)</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Trade Amount')}</span>
                                    <span className="result-value">{formatUSD(amount)}</span>
                                </div>
                            </div>

                            {/* Ranking Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Fee Comparison')} — {tradeType === 'spot' ? getUiString(lang, 'Spot') : getUiString(lang, 'Futures')} {orderType === 'maker' ? getUiString(lang, 'Maker') : getUiString(lang, 'Taker')}
                                </h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>#</th>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Exchange')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Fee Rate')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Fee ($)')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'With Discount')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((row, idx) => (
                                                <tr key={row.name} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: idx === 0 ? 'rgba(34,197,94,0.06)' : 'transparent',
                                                }}>
                                                    <td style={{
                                                        padding: '8px',
                                                        fontWeight: idx === 0 ? 700 : 400,
                                                        color: idx === 0 ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
                                                    }}>
                                                        {idx + 1}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px',
                                                        fontWeight: idx === 0 ? 600 : 400,
                                                        color: idx === 0 ? 'var(--color-accent-green)' : 'var(--color-text)',
                                                    }}>
                                                        {row.name}
                                                        {idx === 0 && ' 🏆'}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right',
                                                        color: 'var(--color-text-secondary)',
                                                    }}>
                                                        {formatRate(row.effectiveRate)}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 600,
                                                        color: idx === 0 ? 'var(--color-accent-green)' : row.feeAmount > amount * 0.003 ? 'var(--color-accent-red)' : 'var(--color-text)',
                                                    }}>
                                                        {formatUSD(row.feeAmount)}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right',
                                                        color: row.discountedFee !== null ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
                                                        fontSize: '0.78rem',
                                                    }}>
                                                        {row.discountedFee !== null
                                                            ? `${formatUSD(row.discountedFee)} (${row.discount!.token} -${row.discount!.percent}%)`
                                                            : '—'
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Fee rates may change. Check each exchange for current rates.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><BarChart3 size={40} /></div>
                            <h2>{getUiString(lang, 'Compare Exchange Fees')}</h2>
                            <p>{getUiString(lang, 'Enter your trade details to compare fees across 10 major exchanges. Find the cheapest place to trade.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(ExchangeFeeComparator);
