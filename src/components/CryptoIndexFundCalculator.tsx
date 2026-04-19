import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    PieChart,
    ChevronDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Allocation {
    asset: string;
    weightPct: number;
    amount: number;
}

interface Results {
    allocations: Allocation[];
    annualFee: number;
    totalInvested: number;
    btcOnlyValue: number;
    diversificationDelta: string;
}

const MARKET_WEIGHTS: { asset: string; weight: number }[] = [
    { asset: 'BTC', weight: 55.0 },
    { asset: 'ETH', weight: 18.0 },
    { asset: 'BNB', weight: 4.0 },
    { asset: 'SOL', weight: 3.5 },
    { asset: 'XRP', weight: 3.0 },
    { asset: 'ADA', weight: 2.0 },
    { asset: 'DOGE', weight: 1.8 },
    { asset: 'AVAX', weight: 1.5 },
    { asset: 'DOT', weight: 1.2 },
    { asset: 'LINK', weight: 1.2 },
    { asset: 'MATIC', weight: 1.0 },
    { asset: 'SHIB', weight: 0.8 },
    { asset: 'UNI', weight: 0.7 },
    { asset: 'LTC', weight: 0.7 },
    { asset: 'ATOM', weight: 0.6 },
    { asset: 'ETC', weight: 0.5 },
    { asset: 'FIL', weight: 0.5 },
    { asset: 'APT', weight: 0.5 },
    { asset: 'NEAR', weight: 0.4 },
    { asset: 'ARB', weight: 0.4 },
];

type AssetCount = 5 | 10 | 20;
type RebalanceFreq = 'Monthly' | 'Quarterly' | 'Annually';

const SCENARIOS = [
    {
        label: 'Top 5 Simple',
        investment: '10000', assetCount: 5 as AssetCount,
        rebalanceFreq: 'Quarterly' as RebalanceFreq, mgmtFee: '0.5',
    },
    {
        label: 'Top 10 Diversified',
        investment: '25000', assetCount: 10 as AssetCount,
        rebalanceFreq: 'Monthly' as RebalanceFreq, mgmtFee: '0.5',
    },
    {
        label: 'Top 20 Broad',
        investment: '50000', assetCount: 20 as AssetCount,
        rebalanceFreq: 'Annually' as RebalanceFreq, mgmtFee: '0.3',
    },
] as const;

function buildAllocations(assetCount: AssetCount, investment: number): Allocation[] {
    const selected = MARKET_WEIGHTS.slice(0, assetCount);
    const totalWeight = selected.reduce((sum, a) => sum + a.weight, 0);
    return selected.map((a) => {
        const normalizedWeight = totalWeight > 0 ? (a.weight / totalWeight) * 100 : 0;
        return {
            asset: a.asset,
            weightPct: normalizedWeight,
            amount: investment * (normalizedWeight / 100),
        };
    });
}

function CryptoIndexFundCalculator({ lang = 'en' }: { lang?: string }) {
    const loc = lang === 'en' ? 'en-US' : lang;
    const [investment, setInvestment] = useState('');
    const [assetCount, setAssetCount] = useState<AssetCount>(10);
    const [rebalanceFreq, setRebalanceFreq] = useState<RebalanceFreq>('Quarterly');
    const [mgmtFee, setMgmtFee] = useState('0.5');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setInvestment(s.investment);
        setAssetCount(s.assetCount);
        setRebalanceFreq(s.rebalanceFreq);
        setMgmtFee(s.mgmtFee);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        investment === s.investment && assetCount === s.assetCount &&
        rebalanceFreq === s.rebalanceFreq && mgmtFee === s.mgmtFee;

    const calculate = useCallback(() => {
        const inv = parseFloat(investment) || 0;
        const fee = parseFloat(mgmtFee) || 0;
        if (inv <= 0) { setResults(null); return; }

        const allocations = buildAllocations(assetCount, inv);
        const annualFee = inv * (fee / 100);
        const btcWeight = MARKET_WEIGHTS[0].weight;
        const btcAllocationInIndex = allocations.find((a) => a.asset === 'BTC');
        const btcPctInIndex = btcAllocationInIndex ? btcAllocationInIndex.weightPct : 0;
        const btcOnlyValue = inv;
        const diversificationDelta = btcPctInIndex < 100
            ? `${(100 - btcPctInIndex).toFixed(1)}% ${getUiString(lang, 'allocated beyond BTC')}`
            : getUiString(lang, 'No diversification (BTC only)');

        setResults({ allocations, annualFee, totalInvested: inv, btcOnlyValue, diversificationDelta });
    }, [investment, assetCount, rebalanceFreq, mgmtFee, lang]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setInvestment(''); setAssetCount(10); setRebalanceFreq('Quarterly');
        setMgmtFee('0.5'); setResults(null);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const REBALANCE_OPTIONS: RebalanceFreq[] = ['Monthly', 'Quarterly', 'Annually'];

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
                        <label htmlFor="index-investment"><DollarSign size={14} /> {getUiString(lang, 'Investment Amount ($)')}</label>
                        <input type="number" inputMode="decimal" value={investment} onChange={(e) => setInvestment(e.target.value)}
                            id="index-investment" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label>{getUiString(lang, 'Number of Assets')}</label>
                        <div className="pills-row">
                            {([5, 10, 20] as AssetCount[]).map((n) => (
                                <button key={n} className={`pill-btn ${assetCount === n ? 'active' : ''}`}
                                    onClick={() => setAssetCount(n)}>
                                    {getUiString(lang, 'Top')} {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="index-rebalance"><ChevronDown size={14} /> {getUiString(lang, 'Rebalancing Frequency')}</label>
                        <select id="index-rebalance" value={rebalanceFreq}
                            onChange={(e) => setRebalanceFreq(e.target.value as RebalanceFreq)}>
                            {REBALANCE_OPTIONS.map((f) => (
                                <option key={f} value={f}>{getUiString(lang, f)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="index-fee"><Percent size={14} /> {getUiString(lang, 'Management Fee (%)')}</label>
                        <input type="number" inputMode="decimal" value={mgmtFee} onChange={(e) => setMgmtFee(e.target.value)}
                            id="index-fee" step="0.01" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Build a market-cap-weighted crypto index portfolio.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Index Portfolio')}
                                </span>
                                <span className="result-hero-value">
                                    <PieChart size={28} />
                                    {formatUSD(results.totalInvested)}
                                </span>
                                <span className="result-hero-roi profit">
                                    {getUiString(lang, 'Top')} {assetCount} {getUiString(lang, 'by Market Cap')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Estimated Annual Fee')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(results.annualFee)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Rebalancing')}</span>
                                    <span className="result-value">{getUiString(lang, rebalanceFreq)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Diversification')}</span>
                                    <span className="result-value">{results.diversificationDelta}</span>
                                </div>
                            </div>

                            <div className="table-wrapper">
                                <table className="calc-table">
                                    <thead>
                                        <tr>
                                            <th>{getUiString(lang, 'Asset')}</th>
                                            <th>{getUiString(lang, 'Weight')}</th>
                                            <th>{getUiString(lang, 'Amount')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.allocations.map((a) => (
                                            <tr key={a.asset}>
                                                <td>{a.asset}</td>
                                                <td>{a.weightPct.toFixed(1)}%</td>
                                                <td>{formatUSD(a.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Market cap weights are approximate and change daily. This is a simplified model — real index funds have tracking error, slippage, and rebalancing costs.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><PieChart size={40} /></div>
                            <h3>{getUiString(lang, 'Build Crypto Index')}</h3>
                            <p>{getUiString(lang, 'Enter an investment amount to see a market-cap-weighted allocation across top crypto assets.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CryptoIndexFundCalculator);
