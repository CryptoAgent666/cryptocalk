import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    RotateCcw,
    Info,
    Fish,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowUpDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    pctOfDailyVolume: number;
    estimatedPriceImpact: number;
    whaleTier: string;
    estimatedSlippage: number;
    marketDepthNeeded: number;
    dollarImpact: number;
}

const SCENARIOS = [
    {
        label: 'BTC Whale ($50M)',
        txAmount: '50000000',
        marketCap: '1500000000000',
        dailyVolume: '30000000000',
        direction: 'sell' as const,
        spreadFactor: '0.1',
    },
    {
        label: 'ETH Whale ($10M)',
        txAmount: '10000000',
        marketCap: '280000000000',
        dailyVolume: '12000000000',
        direction: 'buy' as const,
        spreadFactor: '0.15',
    },
    {
        label: 'Altcoin Whale ($1M)',
        txAmount: '1000000',
        marketCap: '500000000',
        dailyVolume: '50000000',
        direction: 'sell' as const,
        spreadFactor: '0.5',
    },
] as const;

function getWhaleTier(amount: number): string {
    if (amount >= 100000000) return 'Mega-Whale';
    if (amount >= 10000000) return 'Whale';
    if (amount >= 1000000) return 'Dolphin';
    if (amount >= 100000) return 'Fish';
    return 'Shrimp';
}

function WhaleAlertCalculator({ lang = 'en' }: { lang?: string }) {
    const [txAmount, setTxAmount] = useState('10000000');
    const [marketCap, setMarketCap] = useState('500000000000');
    const [dailyVolume, setDailyVolume] = useState('30000000000');
    const [direction, setDirection] = useState<'buy' | 'sell'>('sell');
    const [spreadFactor, setSpreadFactor] = useState('0.1');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setTxAmount(s.txAmount);
        setMarketCap(s.marketCap);
        setDailyVolume(s.dailyVolume);
        setDirection(s.direction);
        setSpreadFactor(s.spreadFactor);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        txAmount === s.txAmount &&
        marketCap === s.marketCap &&
        dailyVolume === s.dailyVolume &&
        direction === s.direction &&
        spreadFactor === s.spreadFactor;

    const results = useMemo<Results | null>(() => {
        const amount = parseFloat(txAmount) || 0;
        const mcap = parseFloat(marketCap) || 0;
        const volume = parseFloat(dailyVolume) || 0;
        const factor = parseFloat(spreadFactor) || 0;

        if (amount <= 0 || mcap <= 0 || volume <= 0 || factor <= 0) return null;

        const pctOfDailyVolume = (amount / volume) * 100;

        // Kyle's Lambda model simplified: price impact = spread_factor * (amount / volume)
        // This gives a realistic % price impact based on the liquidity
        const estimatedPriceImpact = factor * (amount / volume) * 100;

        const whaleTier = getWhaleTier(amount);

        // Slippage: approximately half of price impact for market orders
        const estimatedSlippage = estimatedPriceImpact * 0.5;

        // Market depth needed = amount of liquidity on the opposite side of the book
        // to absorb this order without more than 1% impact
        const marketDepthNeeded = amount / (0.01 / factor);

        // Dollar impact on market cap
        const dollarImpact = mcap * (estimatedPriceImpact / 100);

        return {
            pctOfDailyVolume,
            estimatedPriceImpact,
            whaleTier,
            estimatedSlippage,
            marketDepthNeeded,
            dollarImpact,
        };
    }, [txAmount, marketCap, dailyVolume, direction, spreadFactor]);

    const reset = () => {
        setTxAmount('10000000');
        setMarketCap('500000000000');
        setDailyVolume('30000000000');
        setDirection('sell');
        setSpreadFactor('0.1');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        if (Math.abs(n) >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
        if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
        if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
        if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(4)}%`;
    };

    const tierEmoji = (tier: string) => {
        switch (tier) {
            case 'Mega-Whale': return '\u{1F433}';  // whale
            case 'Whale': return '\u{1F40B}';        // whale
            case 'Dolphin': return '\u{1F42C}';      // dolphin
            case 'Fish': return '\u{1F41F}';          // fish
            default: return '\u{1F990}';              // shrimp
        }
    };

    const isSell = direction === 'sell';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button
                                    key={s.label}
                                    className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}
                                >
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="whale-tx-amount">
                            <DollarSign size={14} /> {getUiString(lang, 'Transaction Amount ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={txAmount}
                            onChange={(e) => setTxAmount(e.target.value)}
                            id="whale-tx-amount"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="whale-market-cap">
                            <DollarSign size={14} /> {getUiString(lang, 'Asset Market Cap ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={marketCap}
                            onChange={(e) => setMarketCap(e.target.value)}
                            id="whale-market-cap"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="whale-daily-volume">
                            <DollarSign size={14} /> {getUiString(lang, 'Daily Trading Volume ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={dailyVolume}
                            onChange={(e) => setDailyVolume(e.target.value)}
                            id="whale-daily-volume"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label>{getUiString(lang, 'Direction')}</label>
                        <div className="pills-row">
                            <button
                                className={`pill-btn ${direction === 'buy' ? 'active' : ''}`}
                                onClick={() => setDirection('buy')}
                                aria-pressed={direction === 'buy'}
                            >
                                <TrendingUp size={14} /> {getUiString(lang, 'Buy')}
                            </button>
                            <button
                                className={`pill-btn ${direction === 'sell' ? 'active' : ''}`}
                                onClick={() => setDirection('sell')}
                                aria-pressed={direction === 'sell'}
                            >
                                <TrendingDown size={14} /> {getUiString(lang, 'Sell')}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="whale-spread-factor">
                            <ArrowUpDown size={14} /> {getUiString(lang, 'Spread Impact Factor (0.01-1)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={spreadFactor}
                            onChange={(e) => setSpreadFactor(e.target.value)}
                            id="whale-spread-factor"
                            step="0.01"
                            min="0.01"
                            max="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Analyze the market impact of large cryptocurrency transactions.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className={`result-hero ${isSell ? 'loss' : 'profit'}`}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Estimated Price Impact')}
                                </span>
                                <span className="result-hero-value">
                                    <Fish size={28} />
                                    {isSell ? '-' : '+'}{formatPercent(results.estimatedPriceImpact)}
                                </span>
                                <span className="result-hero-roi">
                                    {tierEmoji(results.whaleTier)} {getUiString(lang, results.whaleTier)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Transaction % of Daily Volume')}</span>
                                    <span className="result-value">{formatPercent(results.pctOfDailyVolume)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Estimated Price Impact')}</strong>
                                    </span>
                                    <span className={`result-value ${isSell ? 'fee' : 'profit'}`}>
                                        <strong>{isSell ? '-' : '+'}{formatPercent(results.estimatedPriceImpact)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Dollar Impact on Market Cap')}</span>
                                    <span className={`result-value ${isSell ? 'fee' : 'profit'}`}>
                                        {isSell ? '-' : '+'}{formatUSD(results.dollarImpact)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Estimated Slippage')}</span>
                                    <span className="result-value fee">{formatPercent(results.estimatedSlippage)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Market Depth Needed')}</span>
                                    <span className="result-value">{formatUSD(results.marketDepthNeeded)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Whale Tier')}</strong>
                                    </span>
                                    <span className="result-value">
                                        <strong>{tierEmoji(results.whaleTier)} {getUiString(lang, results.whaleTier)}</strong>
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Price impact estimates are simplified models. Actual impact depends on order book depth, execution strategy (TWAP, iceberg orders), and real-time market conditions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Fish size={40} /></div>
                            <h3>{getUiString(lang, 'Analyze Whale Transaction')}</h3>
                            <p>{getUiString(lang, 'Enter transaction details to estimate the market impact of large cryptocurrency trades.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(WhaleAlertCalculator);
