import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    Target,
    DollarSign,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    BarChart3,
    ShieldAlert,
    Crosshair,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    rrRatio: number;
    riskAmount: number;
    rewardAmount: number;
    riskPercent: number;
    rewardPercent: number;
    requiredWinRate: number;
    riskDollars: number;
    rewardDollars: number;
    simulation: SimRow[];
    direction: 'long' | 'short';
}

interface SimRow {
    winRate: number;
    wins: number;
    losses: number;
    grossProfit: number;
    grossLoss: number;
    netPnl: number;
}

const WIN_RATES = [30, 40, 50, 60, 70, 80];
const TRADE_COUNT = 100;
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const STOP_LOSS_PERCENT_PRESETS = [1, 2, 3];
const TP_RR_PRESETS = [1, 2, 3];
const RISK_REWARD_SCENARIOS = [
    {
        label: 'Long 1:2',
        entryPrice: '65000',
        stopLoss: '63000',
        takeProfit: '69000',
        positionSize: '10000',
    },
    {
        label: 'Short 1:2',
        entryPrice: '65000',
        stopLoss: '67000',
        takeProfit: '61000',
        positionSize: '10000',
    },
    {
        label: 'Scalp 1:1',
        entryPrice: '30000',
        stopLoss: '29700',
        takeProfit: '30300',
        positionSize: '5000',
    },
] as const;

function RiskRewardCalculator({ lang = 'en' }: { lang?: string }) {
    const [entryPrice, setEntryPrice] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [takeProfit, setTakeProfit] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [results, setResults] = useState<Results | null>(null);
    const applyScenario = (scenario: (typeof RISK_REWARD_SCENARIOS)[number]) => {
        setEntryPrice(scenario.entryPrice);
        setStopLoss(scenario.stopLoss);
        setTakeProfit(scenario.takeProfit);
        setPositionSize(scenario.positionSize);
    };
    const isScenarioActive = (scenario: (typeof RISK_REWARD_SCENARIOS)[number]) => (
        entryPrice === scenario.entryPrice
        && stopLoss === scenario.stopLoss
        && takeProfit === scenario.takeProfit
        && positionSize === scenario.positionSize
    );

    const calculate = useCallback(() => {
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        const tp = parseFloat(takeProfit);
        const size = parseFloat(positionSize);

        if (isNaN(entry) || isNaN(sl) || isNaN(tp) || entry <= 0 || sl <= 0 || tp <= 0) {
            setResults(null);
            return;
        }

        // Determine direction automatically
        const direction: 'long' | 'short' = sl < entry ? 'long' : 'short';

        const riskAmount = Math.abs(entry - sl);
        const rewardAmount = Math.abs(tp - entry);

        if (riskAmount === 0) {
            setResults(null);
            return;
        }

        const rrRatio = rewardAmount / riskAmount;
        const riskPercent = (riskAmount / entry) * 100;
        const rewardPercent = (rewardAmount / entry) * 100;

        // Required win rate for break-even: WR = 1 / (1 + R:R)
        const requiredWinRate = (1 / (1 + rrRatio)) * 100;

        // Dollar amounts if position size is provided
        const hasSize = !isNaN(size) && size > 0;
        const riskDollars = hasSize ? (riskAmount / entry) * size : 0;
        const rewardDollars = hasSize ? (rewardAmount / entry) * size : 0;

        // Simulation table
        const simulation: SimRow[] = WIN_RATES.map((wr) => {
            const wins = Math.round(TRADE_COUNT * (wr / 100));
            const losses = TRADE_COUNT - wins;
            const grossProfit = hasSize ? wins * rewardDollars : wins * rewardAmount;
            const grossLoss = hasSize ? losses * riskDollars : losses * riskAmount;
            const netPnl = grossProfit - grossLoss;
            return { winRate: wr, wins, losses, grossProfit, grossLoss, netPnl };
        });

        setResults({
            rrRatio,
            riskAmount,
            rewardAmount,
            riskPercent,
            rewardPercent,
            requiredWinRate,
            riskDollars,
            rewardDollars,
            simulation,
            direction,
        });
    }, [entryPrice, stopLoss, takeProfit, positionSize]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setEntryPrice('');
        setStopLoss('');
        setTakeProfit('');
        setPositionSize('');
        setResults(null);
    };

    const applyStopLossPercent = (percent: number, isLong: boolean) => {
        const entry = parseFloat(entryPrice);
        if (isNaN(entry) || entry <= 0) return;
        const nextStopLoss = isLong
            ? entry * (1 - percent / 100)
            : entry * (1 + percent / 100);
        setStopLoss(nextStopLoss.toFixed(2));
    };

    const applyTakeProfitByRR = (rr: number) => {
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        if (isNaN(entry) || isNaN(sl) || entry <= 0 || sl <= 0) return;
        const riskDistance = Math.abs(entry - sl);
        if (riskDistance <= 0) return;
        const isLong = sl < entry;
        const nextTakeProfit = isLong
            ? entry + riskDistance * rr
            : entry - riskDistance * rr;
        if (nextTakeProfit > 0) {
            setTakeProfit(nextTakeProfit.toFixed(2));
        }
    };

    const formatUSD = (n: number) => {
        if (Math.abs(n) < 0.01 && n !== 0) {
            return '$' + n.toFixed(6);
        }
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPrice = (n: number) => {
        if (n >= 1) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (n >= 0.01) return '$' + n.toFixed(4);
        if (n >= 0.0001) return '$' + n.toFixed(6);
        return '$' + n.toFixed(8);
    };

    const formatPercent = (n: number) => `${n.toFixed(2)}%`;

    const getRRColor = (rr: number): string => {
        if (rr >= 2) return 'var(--color-accent-green)';
        if (rr >= 1) return '#f59e0b';
        return '#ef4444';
    };

    const getRRLabel = (rr: number): string => {
        if (rr >= 3) return getUiString(lang, 'Excellent ratio');
        if (rr >= 2) return getUiString(lang, 'Good ratio');
        if (rr >= 1) return getUiString(lang, 'Acceptable');
        return getUiString(lang, 'Poor — consider adjusting');
    };

    const getRRClass = (rr: number): string => {
        if (rr >= 2) return 'profit';
        if (rr >= 1) return '';
        return 'fee';
    };

    const hasSize = parseFloat(positionSize) > 0;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {RISK_REWARD_SCENARIOS.map((scenario) => (
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

                    {/* Entry Price */}
                    <div className="input-group">
                        <label htmlFor="rr-entry-price">
                            <Crosshair size={14} />
                            {getUiString(lang, 'Entry Price')}
                        </label>
                        <div className="pills-row">
                            {ENTRY_PRICE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${entryPrice === preset ? 'active' : ''}`}
                                    onClick={() => setEntryPrice(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={entryPrice}
                                onChange={(e) => setEntryPrice(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="rr-entry-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Stop-Loss Price */}
                    <div className="input-group">
                        <label htmlFor="rr-stop-loss">
                            <ShieldAlert size={14} />
                            {getUiString(lang, 'Stop-Loss Price')}
                        </label>
                        <div className="pills-row">
                            {STOP_LOSS_PERCENT_PRESETS.map((pct) => (
                                <button
                                    key={`long-${pct}`}
                                    className="pill-btn"
                                    onClick={() => applyStopLossPercent(pct, true)}
                                >
                                    -{pct}%
                                </button>
                            ))}
                            {STOP_LOSS_PERCENT_PRESETS.map((pct) => (
                                <button
                                    key={`short-${pct}`}
                                    className="pill-btn"
                                    onClick={() => applyStopLossPercent(pct, false)}
                                >
                                    +{pct}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={stopLoss}
                                onChange={(e) => setStopLoss(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="rr-stop-loss"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Take-Profit Price */}
                    <div className="input-group">
                        <label htmlFor="rr-take-profit">
                            <Target size={14} />
                            {getUiString(lang, 'Take-Profit Price')}
                        </label>
                        <div className="pills-row">
                            {TP_RR_PRESETS.map((rr) => (
                                <button
                                    key={rr}
                                    className="pill-btn"
                                    onClick={() => applyTakeProfitByRR(rr)}
                                >
                                    {rr}R
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={takeProfit}
                                onChange={(e) => setTakeProfit(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="rr-take-profit"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Position Size (Optional) */}
                    <div className="input-group">
                        <label htmlFor="rr-position-size">
                            <DollarSign size={14} />
                            {getUiString(lang, 'Position Size')}
                            <span className="label-hint">{getUiString(lang, 'Optional')}</span>
                        </label>
                        <div className="pills-row">
                            {POSITION_SIZE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${positionSize === preset ? 'active' : ''}`}
                                    onClick={() => setPositionSize(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={positionSize}
                                onChange={(e) => setPositionSize(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="rr-position-size"
                                step="any"
                                min="0"
                            />
                        </div>
                        <span className="input-hint">
                            {getUiString(lang, 'Direction auto-detects from Entry and Stop-Loss.')}
                        </span>
                    </div>

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Add position size to get USD risk/profit.')}
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Main Result: R:R Ratio */}
                            <div
                                className="result-hero"
                                style={{ borderColor: getRRColor(results.rrRatio) }}
                            >
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Risk : Reward Ratio')}
                                </span>
                                <span
                                    className="result-hero-value"
                                    style={{ color: getRRColor(results.rrRatio) }}
                                >
                                    <Target size={28} />
                                    1 : {results.rrRatio.toFixed(2)}
                                </span>
                                <span
                                    className="result-hero-roi"
                                    style={{ color: getRRColor(results.rrRatio) }}
                                >
                                    {getRRLabel(results.rrRatio)}
                                </span>
                            </div>

                            {/* Visual R:R Bar */}
                            <div className="rr-bar" style={{ margin: '16px 0' }}>
                                <div className="rr-bar-risk" style={{ flex: 1 }} />
                                <div className="rr-bar-reward" style={{ flex: Math.min(results.rrRatio, 10) }} />
                            </div>
                            <div className="rr-labels">
                                <span className="rr-label-risk">{getUiString(lang, 'Risk')} ({formatPercent(results.riskPercent)})</span>
                                <span className="rr-label-reward">{getUiString(lang, 'Reward')} ({results.rrRatio.toFixed(1)}x)</span>
                            </div>

                            {/* Required Win Rate */}
                            <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Required Win Rate')}</strong></span>
                                    <span className="result-value" style={{ color: getRRColor(results.rrRatio), fontWeight: 600 }}>
                                        {formatPercent(results.requiredWinRate)}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
                                    {getUiString(lang, 'Minimum win rate needed to break even with this R:R ratio')}
                                </p>
                            </div>

                            {/* Price Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Direction')}</span>
                                    <span className="result-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {results.direction === 'long' ? (
                                            <><TrendingUp size={14} /> {getUiString(lang, 'Long')}</>
                                        ) : (
                                            <><TrendingDown size={14} /> {getUiString(lang, 'Short')}</>
                                        )}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Price')}</span>
                                    <span className="result-value">{formatPrice(parseFloat(entryPrice))}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Stop-Loss Price')}</span>
                                    <span className="result-value fee">{formatPrice(parseFloat(stopLoss))}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'SL Distance')}</span>
                                    <span className="result-value fee">
                                        {formatPrice(results.riskAmount)} ({formatPercent(results.riskPercent)})
                                    </span>
                                </div>
                                {hasSize && (
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Potential Loss')}</span>
                                        <span className="result-value fee">-{formatUSD(results.riskDollars)}</span>
                                    </div>
                                )}
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Take-Profit Price')}</span>
                                    <span className="result-value profit">{formatPrice(parseFloat(takeProfit))}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'TP Distance')}</span>
                                    <span className="result-value profit">
                                        {formatPrice(results.rewardAmount)} ({formatPercent(results.rewardPercent)})
                                    </span>
                                </div>
                                {hasSize && (
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Potential Profit')}</span>
                                        <span className="result-value profit">+{formatUSD(results.rewardDollars)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Simulation Table: 100 Trades */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label"><strong><BarChart3 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{getUiString(lang, 'Simulation')}: {TRADE_COUNT} {getUiString(lang, 'Trades')}</strong></span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 12px' }}>
                                    {getUiString(lang, 'Expected P&L at different win rates with this R:R ratio')}{hasSize ? ` ${getUiString(lang, 'and')} ${formatUSD(parseFloat(positionSize))} ${getUiString(lang, 'position')}` : ''}
                                </p>
                                <div className="result-divider" />

                                {/* Table Header */}
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label" style={{ flex: '0 0 60px', fontWeight: 600, fontSize: '0.75rem' }}>{getUiString(lang, 'Win %')}</span>
                                    <span className="result-label" style={{ flex: '0 0 50px', fontWeight: 600, fontSize: '0.75rem', textAlign: 'center' }}>{getUiString(lang, 'W/L')}</span>
                                    <span className="result-value" style={{ fontWeight: 600, fontSize: '0.75rem', textAlign: 'right' }}>{getUiString(lang, 'Net P&L')}</span>
                                </div>
                                <div className="result-divider" />

                                {results.simulation.map((row) => {
                                    const isPositive = row.netPnl >= 0;
                                    return (
                                        <div className="result-row" key={row.winRate}>
                                            <span className="result-label" style={{ flex: '0 0 60px', fontWeight: row.winRate === 50 ? 600 : 400 }}>
                                                {row.winRate}%
                                            </span>
                                            <span className="result-label" style={{ flex: '0 0 50px', textAlign: 'center', fontSize: '0.8rem' }}>
                                                {row.wins}/{row.losses}
                                            </span>
                                            <span className={`result-value ${isPositive ? 'profit' : 'fee'}`} style={{ fontWeight: 600 }}>
                                                {isPositive ? '+' : ''}{hasSize ? formatUSD(row.netPnl) : formatPrice(row.netPnl)}
                                            </span>
                                        </div>
                                    );
                                })}
                                <div className="result-divider" />
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    {getUiString(lang, 'Break-even at')} {formatPercent(results.requiredWinRate)} {getUiString(lang, 'win rate.')} {hasSize ? getUiString(lang, 'Values in USD based on your position size.') : getUiString(lang, 'Values shown as price units. Enter a position size for USD values.')}
                                </p>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Past performance does not guarantee future results.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Target size={40} />
                            </div>
                            <h2>{getUiString(lang, 'Evaluate Your Trade Setup')}</h2>
                            <p>{getUiString(lang, 'Enter your entry price, stop-loss, and take-profit to calculate the risk-reward ratio, required win rate, and simulated outcomes.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(RiskRewardCalculator);
