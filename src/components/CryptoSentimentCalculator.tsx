import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Activity,
    RotateCcw,
    Info,
    TrendingUp,
    TrendingDown,
    BarChart3,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    compositeScore: number;
    signal: string;
    contrarianSignal: string;
    fearGreedScore: number;
    socialScore: number;
    fundingScore: number;
    rsiScore: number;
    lsRatioScore: number;
}

const SCENARIOS = [
    {
        label: 'Extreme Fear',
        fearGreed: '10',
        socialVolume: '1',
        fundingRate: '-0.05',
        rsi: '20',
        lsRatio: '0.6',
    },
    {
        label: 'Neutral',
        fearGreed: '50',
        socialVolume: '2',
        fundingRate: '0.01',
        rsi: '50',
        lsRatio: '1',
    },
    {
        label: 'Extreme Greed',
        fearGreed: '90',
        socialVolume: '4',
        fundingRate: '0.15',
        rsi: '80',
        lsRatio: '2.5',
    },
] as const;

function getSignal(score: number): string {
    if (score >= 80) return 'Strong Sell';
    if (score >= 60) return 'Sell';
    if (score >= 40) return 'Neutral';
    if (score >= 20) return 'Buy';
    return 'Strong Buy';
}

function getContrarianSignal(score: number): string {
    if (score >= 80) return 'Strong Buy';
    if (score >= 60) return 'Buy';
    if (score >= 40) return 'Neutral';
    if (score >= 20) return 'Sell';
    return 'Strong Sell';
}

function getSignalColor(signal: string): string {
    switch (signal) {
        case 'Strong Buy': return 'var(--color-accent-green, #22c55e)';
        case 'Buy': return '#4ade80';
        case 'Neutral': return '#f59e0b';
        case 'Sell': return '#f97316';
        case 'Strong Sell': return '#ef4444';
        default: return 'var(--color-text-muted, #94a3b8)';
    }
}

function CryptoSentimentCalculator({ lang = 'en' }: { lang?: string }) {
    const [fearGreed, setFearGreed] = useState('50');
    const [socialVolume, setSocialVolume] = useState('2');
    const [fundingRate, setFundingRate] = useState('0.01');
    const [rsi, setRsi] = useState('50');
    const [lsRatio, setLsRatio] = useState('1');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setFearGreed(s.fearGreed);
        setSocialVolume(s.socialVolume);
        setFundingRate(s.fundingRate);
        setRsi(s.rsi);
        setLsRatio(s.lsRatio);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        fearGreed === s.fearGreed &&
        socialVolume === s.socialVolume &&
        fundingRate === s.fundingRate &&
        rsi === s.rsi &&
        lsRatio === s.lsRatio;

    const socialVolumeLabels = ['Low', 'Medium', 'High', 'Extreme'];

    const results = useMemo<Results | null>(() => {
        const fg = parseFloat(fearGreed);
        const sv = parseFloat(socialVolume);
        const fr = parseFloat(fundingRate);
        const r = parseFloat(rsi);
        const ls = parseFloat(lsRatio);

        if (isNaN(fg) || isNaN(sv) || isNaN(fr) || isNaN(r) || isNaN(ls)) return null;

        // Normalize each factor to 0-100 (higher = more greedy/bullish)
        const fearGreedScore = Math.max(0, Math.min(100, fg));

        // Social volume: 1=Low(25), 2=Medium(50), 3=High(75), 4=Extreme(100)
        const socialScore = Math.max(0, Math.min(100, sv * 25));

        // Funding rate: -0.1 → 0, 0 → 50, 0.3 → 100
        const fundingScore = Math.max(0, Math.min(100, ((fr + 0.1) / 0.4) * 100));

        // RSI: direct mapping
        const rsiScore = Math.max(0, Math.min(100, r));

        // Long/Short ratio: 0.5 → 0, 1 → ~29, 3 → 100
        const lsRatioScore = Math.max(0, Math.min(100, ((ls - 0.5) / 2.5) * 100));

        // Weighted composite: Fear&Greed 30%, RSI 25%, Funding 20%, L/S 15%, Social 10%
        const compositeScore =
            fearGreedScore * 0.30 +
            rsiScore * 0.25 +
            fundingScore * 0.20 +
            lsRatioScore * 0.15 +
            socialScore * 0.10;

        const clampedScore = Math.max(0, Math.min(100, compositeScore));

        return {
            compositeScore: clampedScore,
            signal: getSignal(clampedScore),
            contrarianSignal: getContrarianSignal(clampedScore),
            fearGreedScore,
            socialScore,
            fundingScore,
            rsiScore,
            lsRatioScore,
        };
    }, [fearGreed, socialVolume, fundingRate, rsi, lsRatio]);

    const reset = () => {
        setFearGreed('50');
        setSocialVolume('2');
        setFundingRate('0.01');
        setRsi('50');
        setLsRatio('1');
    };

    const formatScore = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
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
                        <label htmlFor="sent-fear-greed">
                            <Activity size={14} /> {getUiString(lang, 'Fear & Greed Index (0-100)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={fearGreed}
                            onChange={(e) => setFearGreed(e.target.value)}
                            id="sent-fear-greed"
                            step="1"
                            min="0"
                            max="100"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="sent-social-volume">
                            <BarChart3 size={14} /> {getUiString(lang, 'Social Media Volume')}
                        </label>
                        <select
                            value={socialVolume}
                            onChange={(e) => setSocialVolume(e.target.value)}
                            id="sent-social-volume"
                        >
                            {socialVolumeLabels.map((label, i) => (
                                <option key={label} value={i + 1}>
                                    {getUiString(lang, label)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="sent-funding-rate">
                            <TrendingUp size={14} /> {getUiString(lang, 'Funding Rate (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={fundingRate}
                            onChange={(e) => setFundingRate(e.target.value)}
                            id="sent-funding-rate"
                            step="0.01"
                            min="-0.1"
                            max="0.3"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="sent-rsi">
                            <TrendingDown size={14} /> {getUiString(lang, 'RSI (0-100)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={rsi}
                            onChange={(e) => setRsi(e.target.value)}
                            id="sent-rsi"
                            step="1"
                            min="0"
                            max="100"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="sent-ls-ratio">
                            <BarChart3 size={14} /> {getUiString(lang, 'Long/Short Ratio')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={lsRatio}
                            onChange={(e) => setLsRatio(e.target.value)}
                            id="sent-ls-ratio"
                            step="0.1"
                            min="0.5"
                            max="3"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Combine multiple sentiment signals into a composite market score.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: getSignalColor(results.signal) }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Composite Sentiment Score')}
                                </span>
                                <span className="result-hero-value" style={{ color: getSignalColor(results.signal) }}>
                                    <Activity size={28} />
                                    {formatScore(results.compositeScore)} / 100
                                </span>
                                <span className="result-hero-roi">
                                    {getUiString(lang, 'Signal')}: {getUiString(lang, results.signal)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row" style={{ fontWeight: 600 }}>
                                    <span className="result-label">{getUiString(lang, 'Contrarian Signal')}</span>
                                    <span className="result-value" style={{ color: getSignalColor(results.contrarianSignal) }}>
                                        {getUiString(lang, results.contrarianSignal)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Fear & Greed')} (30%)</span>
                                    <span className="result-value">{formatScore(results.fearGreedScore)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'RSI')} (25%)</span>
                                    <span className="result-value">{formatScore(results.rsiScore)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Funding Rate')} (20%)</span>
                                    <span className="result-value">{formatScore(results.fundingScore)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Long/Short Ratio')} (15%)</span>
                                    <span className="result-value">{formatScore(results.lsRatioScore)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Social Volume')} (10%)</span>
                                    <span className="result-value">{formatScore(results.socialScore)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Sentiment analysis is not financial advice. Composite score combines multiple indicators with different weights. Market conditions can change rapidly.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Activity size={40} /></div>
                            <h3>{getUiString(lang, 'Analyze Market Sentiment')}</h3>
                            <p>{getUiString(lang, 'Enter sentiment indicators to generate a composite score and trading signal.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CryptoSentimentCalculator);
