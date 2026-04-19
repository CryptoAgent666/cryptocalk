import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Flame,
    RotateCcw,
    Info,
    Hash,
    DollarSign,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    monthlyBurnPct: number;
    annualBurnPct: number;
    monthsTo10Pct: number;
    monthsTo25Pct: number;
    supply1yr: number;
    supply3yr: number;
    supply5yr: number;
    mcap1yr: number;
    mcap3yr: number;
    mcap5yr: number;
    currentMcap: number;
    pressureScore: string;
}

const SCENARIOS = [
    {
        label: 'BNB Style',
        totalSupply: '200000000000',
        circulatingSupply: '145000000',
        burnRate: '2000000',
        tokenPrice: '600',
    },
    {
        label: 'ETH Deflationary',
        totalSupply: '120000000',
        circulatingSupply: '120000000',
        burnRate: '50000',
        tokenPrice: '2400',
    },
    {
        label: 'Aggressive Burn',
        totalSupply: '1000000000',
        circulatingSupply: '500000000',
        burnRate: '20000000',
        tokenPrice: '0.50',
    },
] as const;

function TokenBurnCalculator({ lang = 'en' }: { lang?: string }) {
    const [totalSupply, setTotalSupply] = useState('1000000000');
    const [circulatingSupply, setCirculatingSupply] = useState('500000000');
    const [burnRate, setBurnRate] = useState('5000000');
    const [tokenPrice, setTokenPrice] = useState('1.00');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setTotalSupply(s.totalSupply);
        setCirculatingSupply(s.circulatingSupply);
        setBurnRate(s.burnRate);
        setTokenPrice(s.tokenPrice);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        totalSupply === s.totalSupply &&
        circulatingSupply === s.circulatingSupply &&
        burnRate === s.burnRate &&
        tokenPrice === s.tokenPrice;

    const results = useMemo<Results | null>(() => {
        const total = parseFloat(totalSupply) || 0;
        const circ = parseFloat(circulatingSupply) || 0;
        const burn = parseFloat(burnRate) || 0;
        const price = parseFloat(tokenPrice) || 0;

        if (circ <= 0 || burn <= 0 || price <= 0 || total <= 0) return null;

        const monthlyBurnPct = (burn / circ) * 100;
        const annualBurnPct = ((burn * 12) / circ) * 100;

        // Months to burn X% of circulating supply (constant burn per month)
        const target10 = circ * 0.10;
        const target25 = circ * 0.25;
        const monthsTo10Pct = burn > 0 ? target10 / burn : Infinity;
        const monthsTo25Pct = burn > 0 ? target25 / burn : Infinity;

        // Projected circulating supply (capped at 0)
        const supply1yr = Math.max(circ - burn * 12, 0);
        const supply3yr = Math.max(circ - burn * 36, 0);
        const supply5yr = Math.max(circ - burn * 60, 0);

        // Market cap impact (price constant)
        const currentMcap = circ * price;
        const mcap1yr = supply1yr * price;
        const mcap3yr = supply3yr * price;
        const mcap5yr = supply5yr * price;

        // Deflationary pressure score
        let pressureScore: string;
        if (annualBurnPct >= 10) pressureScore = 'Extreme';
        else if (annualBurnPct >= 5) pressureScore = 'High';
        else if (annualBurnPct >= 1) pressureScore = 'Medium';
        else pressureScore = 'Low';

        return {
            monthlyBurnPct,
            annualBurnPct,
            monthsTo10Pct,
            monthsTo25Pct,
            supply1yr,
            supply3yr,
            supply5yr,
            mcap1yr,
            mcap3yr,
            mcap5yr,
            currentMcap,
            pressureScore,
        };
    }, [totalSupply, circulatingSupply, burnRate, tokenPrice]);

    const reset = () => {
        setTotalSupply('1000000000');
        setCirculatingSupply('500000000');
        setBurnRate('5000000');
        setTokenPrice('1.00');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatCompact = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            notation: 'compact',
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    const formatMonths = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        if (n > 1200) return '100+ ' + getUiString(lang, 'years');
        if (n >= 24) return `${(n / 12).toFixed(1)} ${getUiString(lang, 'years')}`;
        return `${n.toFixed(1)} ${getUiString(lang, 'months')}`;
    };

    const getPressureColor = (score: string) => {
        switch (score) {
            case 'Extreme': return '#ef4444';
            case 'High': return '#f97316';
            case 'Medium': return '#f59e0b';
            default: return 'var(--color-accent-green)';
        }
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
                        <label htmlFor="burn-total-supply">
                            <Hash size={14} /> {getUiString(lang, 'Total Supply')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={totalSupply}
                            onChange={(e) => setTotalSupply(e.target.value)}
                            id="burn-total-supply"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="burn-circ-supply">
                            <Hash size={14} /> {getUiString(lang, 'Circulating Supply')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={circulatingSupply}
                            onChange={(e) => setCirculatingSupply(e.target.value)}
                            id="burn-circ-supply"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="burn-rate">
                            <Flame size={14} /> {getUiString(lang, 'Burn Rate per Month (tokens)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={burnRate}
                            onChange={(e) => setBurnRate(e.target.value)}
                            id="burn-rate"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="burn-token-price">
                            <DollarSign size={14} /> {getUiString(lang, 'Current Token Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={tokenPrice}
                            onChange={(e) => setTokenPrice(e.target.value)}
                            id="burn-token-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Analyze how token burns affect circulating supply over time.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: getPressureColor(results.pressureScore) }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Deflationary Pressure')}
                                </span>
                                <span className="result-hero-value" style={{ color: getPressureColor(results.pressureScore) }}>
                                    <Flame size={28} />
                                    {getUiString(lang, results.pressureScore)}
                                </span>
                                <span className="result-hero-roi">
                                    {formatPercent(results.annualBurnPct)} {getUiString(lang, 'annual burn rate')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly Burn Rate')}</span>
                                    <span className="result-value">{formatPercent(results.monthlyBurnPct)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Annual Burn Rate')}</span>
                                    <span className="result-value">{formatPercent(results.annualBurnPct)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Time to Burn 10% of Supply')}</span>
                                    <span className="result-value">{formatMonths(results.monthsTo10Pct)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Time to Burn 25% of Supply')}</span>
                                    <span className="result-value">{formatMonths(results.monthsTo25Pct)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Projected Supply (1 Year)')}</strong>
                                    </span>
                                    <span className="result-value">
                                        <strong>{formatCompact(results.supply1yr)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Projected Supply (3 Years)')}</span>
                                    <span className="result-value">{formatCompact(results.supply3yr)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Projected Supply (5 Years)')}</span>
                                    <span className="result-value">{formatCompact(results.supply5yr)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Market Cap')}</span>
                                    <span className="result-value">{formatCompact(results.currentMcap)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Market Cap in 1 Year')}</span>
                                    <span className="result-value">{formatCompact(results.mcap1yr)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Market Cap in 3 Years')}</span>
                                    <span className="result-value">{formatCompact(results.mcap3yr)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Market Cap in 5 Years')}</span>
                                    <span className="result-value">{formatCompact(results.mcap5yr)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Assumes constant burn rate per month. Actual burn rates vary by protocol governance, transaction volume, and market conditions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Flame size={40} /></div>
                            <h3>{getUiString(lang, 'Analyze Token Burns')}</h3>
                            <p>{getUiString(lang, 'Enter supply and burn rate to see how deflationary mechanics affect token economics over time.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(TokenBurnCalculator);
