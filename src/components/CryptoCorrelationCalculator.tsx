import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    Info,
    RotateCcw,
    TrendingUp,
    BarChart3,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    correlation: number;
    rSquared: number;
    interpretation: string;
    diversificationBenefit: string;
}

const SCENARIOS = [
    {
        label: 'BTC vs ETH (High)',
        returnsA: '8.2,5.1,-3.4,12.0,-1.2,6.5,9.3,-4.1,7.8,3.2,-2.5,11.4',
        returnsB: '10.5,6.3,-4.8,15.2,-2.1,7.9,11.0,-5.6,9.1,4.0,-3.2,13.8',
    },
    {
        label: 'BTC vs Gold (Low)',
        returnsA: '8.2,5.1,-3.4,12.0,-1.2,6.5,9.3,-4.1,7.8,3.2,-2.5,11.4',
        returnsB: '1.2,0.8,2.1,-0.5,1.8,0.3,-1.0,2.5,0.6,1.4,1.9,-0.2',
    },
    {
        label: 'BTC vs S&P500 (Medium)',
        returnsA: '8.2,5.1,-3.4,12.0,-1.2,6.5,9.3,-4.1,7.8,3.2,-2.5,11.4',
        returnsB: '3.1,2.0,-1.8,4.5,1.2,2.8,3.5,-2.0,3.0,1.5,-0.9,4.2',
    },
] as const;

function pearsonCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    if (n < 2) return 0;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    if (denominator === 0) return 0;
    return numerator / denominator;
}

function getInterpretation(r: number, lang: string): string {
    const abs = Math.abs(r);
    if (abs >= 0.8) return r > 0 ? getUiString(lang, 'Strong Positive') : getUiString(lang, 'Strong Negative');
    if (abs >= 0.5) return r > 0 ? getUiString(lang, 'Moderate Positive') : getUiString(lang, 'Moderate Negative');
    if (abs >= 0.2) return r > 0 ? getUiString(lang, 'Weak Positive') : getUiString(lang, 'Weak Negative');
    return getUiString(lang, 'Very Weak / No Correlation');
}

function getDiversificationBenefit(r: number, lang: string): string {
    if (r < 0.2) return getUiString(lang, 'Excellent diversification benefit. Assets move independently.');
    if (r < 0.5) return getUiString(lang, 'Good diversification benefit. Moderate independence between assets.');
    if (r < 0.8) return getUiString(lang, 'Limited diversification. Assets tend to move together.');
    return getUiString(lang, 'Poor diversification. Assets are highly correlated.');
}

function parseReturns(str: string): number[] {
    return str.split(',')
        .map((s) => parseFloat(s.trim()))
        .filter((n) => isFinite(n));
}

function CryptoCorrelationCalculator({ lang = 'en' }: { lang?: string }) {
    const [returnsA, setReturnsA] = useState('');
    const [returnsB, setReturnsB] = useState('');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setReturnsA(s.returnsA);
        setReturnsB(s.returnsB);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        returnsA === s.returnsA && returnsB === s.returnsB;

    const calculate = useCallback(() => {
        const a = parseReturns(returnsA);
        const b = parseReturns(returnsB);
        const n = Math.min(a.length, b.length);
        if (n < 2) { setResults(null); return; }

        const correlation = pearsonCorrelation(a, b);
        const rSquared = correlation * correlation;
        const interpretation = getInterpretation(correlation, lang);
        const diversificationBenefit = getDiversificationBenefit(correlation, lang);

        setResults({ correlation, rSquared, interpretation, diversificationBenefit });
    }, [returnsA, returnsB, lang]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setReturnsA(''); setReturnsB(''); setResults(null);
    };

    const getCorrelationColor = (r: number): string => {
        if (r >= 0.5) return 'var(--color-profit, #22c55e)';
        if (r >= 0) return 'var(--color-warning, #f59e0b)';
        return 'var(--color-loss, #ef4444)';
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
                        <label htmlFor="corr-returns-a"><BarChart3 size={14} /> {getUiString(lang, 'Asset A Returns (%, comma-separated)')}</label>
                        <textarea
                            id="corr-returns-a"
                            value={returnsA}
                            onChange={(e) => setReturnsA(e.target.value)}
                            rows={3}
                            placeholder="8.2, 5.1, -3.4, 12.0, ..."
                            style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', padding: '0.5rem' }}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="corr-returns-b"><BarChart3 size={14} /> {getUiString(lang, 'Asset B Returns (%, comma-separated)')}</label>
                        <textarea
                            id="corr-returns-b"
                            value={returnsB}
                            onChange={(e) => setReturnsB(e.target.value)}
                            rows={3}
                            placeholder="10.5, 6.3, -4.8, 15.2, ..."
                            style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', padding: '0.5rem' }}
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-hint" style={{ display: 'block', marginTop: 0 }}>
                            {getUiString(lang, 'Data Points')}: {parseReturns(returnsA).length} / {parseReturns(returnsB).length}
                        </span>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Enter monthly return percentages to measure asset correlation.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Pearson Correlation')}
                                </span>
                                <span className="result-hero-value" style={{ color: getCorrelationColor(results.correlation) }}>
                                    <TrendingUp size={28} />
                                    {results.correlation.toFixed(4)}
                                </span>
                                <span className="result-hero-roi profit">
                                    {results.interpretation}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Correlation (r)')}</span>
                                    <span className="result-value">{results.correlation.toFixed(4)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'R-Squared (R\u00B2)')}</span>
                                    <span className="result-value">{(results.rSquared * 100).toFixed(2)}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Interpretation')}</span>
                                    <span className="result-value">{results.interpretation}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Diversification Benefit')}</strong></span>
                                    <span className="result-value" style={{ maxWidth: '60%', textAlign: 'right' }}>
                                        {results.diversificationBenefit}
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Correlation is based on historical data and does not guarantee future co-movement. Crypto correlations can shift rapidly during market stress.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><BarChart3 size={40} /></div>
                            <h2>{getUiString(lang, 'Calculate Asset Correlation')}</h2>
                            <p>{getUiString(lang, 'Enter monthly returns for two assets to compute their Pearson correlation coefficient.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CryptoCorrelationCalculator);
