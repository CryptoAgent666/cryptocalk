import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Search,
    X,
    Target,
    Crosshair,
    Layers,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface TpLevel {
    price: string;
    percent: number; // % of position to close
}

const RR_PRESETS = [
    { label: '1:1', value: 1 },
    { label: '1:1.5', value: 1.5 },
    { label: '1:2', value: 2 },
    { label: '1:3', value: 3 },
    { label: '1:5', value: 5 },
];
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const STOP_LOSS_PERCENT_PRESETS = [1, 2, 3, 5];

const TP_LEVEL_CONFIGS = [
    { count: 1, splits: [100] },
    { count: 2, splits: [50, 50] },
    { count: 3, splits: [50, 30, 20] },
];
const TPSL_SCENARIOS = [
    {
        label: 'Long 1:2',
        entryPrice: '65000',
        positionSize: '10000',
        isShort: false,
        rrRatio: '2',
        stopLoss: '63000',
        tpLevelCount: 1,
        autoCalcTP: true,
        tpLevels: [{ price: '69000', percent: 100 }],
    },
    {
        label: 'Short 1:2',
        entryPrice: '65000',
        positionSize: '10000',
        isShort: true,
        rrRatio: '2',
        stopLoss: '67000',
        tpLevelCount: 1,
        autoCalcTP: true,
        tpLevels: [{ price: '61000', percent: 100 }],
    },
    {
        label: 'Long 3TP Scale',
        entryPrice: '65000',
        positionSize: '10000',
        isShort: false,
        rrRatio: '2',
        stopLoss: '64000',
        tpLevelCount: 3,
        autoCalcTP: false,
        tpLevels: [
            { price: '67000', percent: 50 },
            { price: '68500', percent: 30 },
            { price: '70000', percent: 20 },
        ],
    },
] as const;

export default function TpSlCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [entryPrice, setEntryPrice] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [rrRatio, setRrRatio] = useState('2');
    const [stopLoss, setStopLoss] = useState('');
    const [tpLevelCount, setTpLevelCount] = useState(1);
    const [tpLevels, setTpLevels] = useState<TpLevel[]>([{ price: '', percent: 100 }]);
    const [autoCalcTP, setAutoCalcTP] = useState(true);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Coin search
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setLoading(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSuggestions((data.coins || []).slice(0, 8).map((c: any) => ({
                id: c.id, name: c.name, symbol: c.symbol, thumb: c.thumb,
            })));
            setShowSuggestions(true);
        } catch { setSuggestions([]); }
        setLoading(false);
    }, []);

    const handleCoinSearch = (v: string) => {
        setCoinSearch(v);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(v), 400);
    };

    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`);
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            if (data[coin.id]?.usd) setEntryPrice(String(data[coin.id].usd));
        } catch { }
    };

    const clearCoin = () => { setSelectedCoin(null); setCoinSearch(''); setSuggestions([]); };
    const areTpLevelsEqual = (
        currentLevels: TpLevel[],
        scenarioLevels: readonly { price: string; percent: number }[]
    ) => {
        if (currentLevels.length !== scenarioLevels.length) return false;
        return currentLevels.every((level, idx) =>
            level.price === scenarioLevels[idx].price && level.percent === scenarioLevels[idx].percent
        );
    };
    const applyScenario = (scenario: (typeof TPSL_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setEntryPrice(scenario.entryPrice);
        setPositionSize(scenario.positionSize);
        setIsShort(scenario.isShort);
        setRrRatio(scenario.rrRatio);
        setStopLoss(scenario.stopLoss);
        setTpLevelCount(scenario.tpLevelCount);
        setAutoCalcTP(scenario.autoCalcTP);
        setTpLevels(scenario.tpLevels.map((level) => ({ ...level })));
    };
    const isScenarioActive = (scenario: (typeof TPSL_SCENARIOS)[number]) => (
        entryPrice === scenario.entryPrice
        && positionSize === scenario.positionSize
        && isShort === scenario.isShort
        && rrRatio === scenario.rrRatio
        && stopLoss === scenario.stopLoss
        && tpLevelCount === scenario.tpLevelCount
        && autoCalcTP === scenario.autoCalcTP
        && areTpLevelsEqual(tpLevels, scenario.tpLevels)
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node))
                setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Update TP levels when count changes
    useEffect(() => {
        const config = TP_LEVEL_CONFIGS.find(c => c.count === tpLevelCount) || TP_LEVEL_CONFIGS[0];
        const newLevels: TpLevel[] = config.splits.map((pct, i) => ({
            price: tpLevels[i]?.price || '',
            percent: pct,
        }));
        setTpLevels(newLevels);
    }, [tpLevelCount]);

    // Auto-calculate TP prices from R:R ratio
    useEffect(() => {
        if (!autoCalcTP) return;
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        const rr = parseFloat(rrRatio);
        if (isNaN(entry) || isNaN(sl) || isNaN(rr) || entry <= 0 || sl <= 0) return;

        const slDist = Math.abs(entry - sl);

        const newLevels = tpLevels.map((level, i) => {
            const multiplier = tpLevelCount === 1 ? rr : rr * (0.5 + (i + 1) * 0.5 / tpLevelCount * 2);
            const tpDist = slDist * multiplier;
            const tpPrice = isShort ? entry - tpDist : entry + tpDist;
            return { ...level, price: tpPrice > 0 ? tpPrice.toFixed(2) : '' };
        });
        setTpLevels(newLevels);
    }, [entryPrice, stopLoss, rrRatio, isShort, autoCalcTP, tpLevelCount]);

    // Calculated values
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const size = parseFloat(positionSize) || 0;
    const slDist = entry > 0 ? Math.abs(entry - sl) : 0;
    const slDistPercent = entry > 0 ? (slDist / entry) * 100 : 0;
    const slPnl = size > 0 && entry > 0 ? (slDist / entry) * size : 0;

    const tpResults = tpLevels.map((level) => {
        const tp = parseFloat(level.price) || 0;
        const tpDist = Math.abs(tp - entry);
        const tpDistPercent = entry > 0 ? (tpDist / entry) * 100 : 0;
        const tpPnl = size > 0 && entry > 0 ? (tpDist / entry) * size * (level.percent / 100) : 0;
        return { tp, tpDist, tpDistPercent, tpPnl, percent: level.percent };
    });

    const totalTpPnl = tpResults.reduce((sum, r) => sum + r.tpPnl, 0);
    const overallRR = slPnl > 0 ? totalTpPnl / slPnl : 0;

    const hasResults = entry > 0 && sl > 0 && tpLevels.some(l => parseFloat(l.price) > 0);

    const reset = () => {
        setEntryPrice(''); setPositionSize(''); setStopLoss('');
        setRrRatio('2'); setIsShort(false); setTpLevelCount(1);
        setTpLevels([{ price: '', percent: 100 }]);
        setAutoCalcTP(true); clearCoin();
    };

    const applyStopLossPercent = (percent: number) => {
        const entry = parseFloat(entryPrice);
        if (isNaN(entry) || entry <= 0) return;
        const nextStopLoss = isShort
            ? entry * (1 + percent / 100)
            : entry * (1 - percent / 100);
        setStopLoss(nextStopLoss.toFixed(2));
        setAutoCalcTP(true);
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n.toFixed(2)}%`;

    // Visual price scale
    const renderPriceScale = () => {
        if (!hasResults) return null;
        const allPrices = [entry, sl, ...tpResults.map(t => t.tp)].filter(p => p > 0);
        const minP = Math.min(...allPrices);
        const maxP = Math.max(...allPrices);
        const range = maxP - minP || 1;
        const pad = range * 0.1;
        const scaleMin = minP - pad;
        const scaleMax = maxP + pad;
        const scaleRange = scaleMax - scaleMin;

        const toPercent = (p: number) => ((p - scaleMin) / scaleRange) * 100;

        return (
            <div className="price-scale" style={{ position: 'relative', height: '240px', margin: '20px 0', borderRadius: '12px', overflow: 'hidden' }}>
                {/* SL zone */}
                <div style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    bottom: isShort ? `${toPercent(sl)}%` : '0',
                    height: isShort ? `${100 - toPercent(sl)}%` : `${toPercent(sl)}%`,
                    background: 'rgba(239,68,68,0.08)',
                    borderTop: isShort ? 'none' : undefined,
                    borderBottom: isShort ? undefined : 'none',
                }} />
                {/* TP zone */}
                <div style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    bottom: isShort ? '0' : `${toPercent(entry)}%`,
                    height: isShort ? `${toPercent(entry)}%` : `${100 - toPercent(entry)}%`,
                    background: 'rgba(34,197,94,0.08)',
                }} />

                {/* Entry line */}
                <div style={{
                    position: 'absolute', left: '60px', right: '10px',
                    bottom: `${toPercent(entry)}%`,
                    height: '2px', background: 'var(--color-primary)',
                }}>
                    <span style={{
                        position: 'absolute', left: '-60px', top: '-10px',
                        fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-primary)',
                        width: '55px', textAlign: 'right',
                    }}>Entry</span>
                    <span style={{
                        position: 'absolute', right: 0, top: '-10px',
                        fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-secondary)',
                    }}>${entry.toLocaleString()}</span>
                </div>

                {/* SL line */}
                <div style={{
                    position: 'absolute', left: '60px', right: '10px',
                    bottom: `${toPercent(sl)}%`,
                    height: '2px', background: '#ef4444',
                    borderStyle: 'dashed',
                }}>
                    <span style={{
                        position: 'absolute', left: '-60px', top: '-10px',
                        fontSize: '0.7rem', fontWeight: 600, color: '#ef4444',
                        width: '55px', textAlign: 'right',
                    }}>Stop Loss</span>
                    <span style={{
                        position: 'absolute', right: 0, top: '-10px',
                        fontSize: '0.7rem', fontWeight: 500, color: '#ef4444',
                    }}>${sl.toLocaleString()} (−{formatPercent(slDistPercent)})</span>
                </div>

                {/* TP lines */}
                {tpResults.map((tp, i) => tp.tp > 0 && (
                    <div key={i} style={{
                        position: 'absolute', left: '60px', right: '10px',
                        bottom: `${toPercent(tp.tp)}%`,
                        height: '2px', background: '#22c55e',
                    }}>
                        <span style={{
                            position: 'absolute', left: '-60px', top: '-10px',
                            fontSize: '0.7rem', fontWeight: 600, color: '#22c55e',
                            width: '55px', textAlign: 'right',
                        }}>TP{tpLevelCount > 1 ? i + 1 : ''}</span>
                        <span style={{
                            position: 'absolute', right: 0, top: '-10px',
                            fontSize: '0.7rem', fontWeight: 500, color: '#22c55e',
                        }}>${tp.tp.toLocaleString()} (+{formatPercent(tp.tpDistPercent)}) {tpLevelCount > 1 ? `[${tp.percent}%]` : ''}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {TPSL_SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.label}
                                    className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                                    onClick={() => applyScenario(scenario)}
                                >
                                    {scenario.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Search */}
                    <div className="input-group" ref={suggestionsRef}>
                        <label><Search size={14} /> Cryptocurrency (optional)</label>
                        <div className="coin-search-wrapper">
                            <input type="text" value={coinSearch} onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder="Search coin..." id="tpsl-coin-search" />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear"><X size={14} /></button>
                            )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectCoin(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Direction */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Direction')}</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${!isShort ? 'active' : ''}`} onClick={() => setIsShort(false)}>
                                <TrendingUp size={14} /> Long
                            </button>
                            <button className={`toggle-btn toggle-short ${isShort ? 'active' : ''}`} onClick={() => setIsShort(true)}>
                                <TrendingDown size={14} /> Short
                            </button>
                        </div>
                    </div>

                    {/* Entry Price */}
                    <div className="input-group">
                        <label><Crosshair size={14} /> Entry Price {selectedCoin && <span className="label-hint">Auto-filled</span>}</label>
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
                            <span className="input-prefix">$</span>
                            <input type="number" inputMode="decimal" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)}
                                placeholder="65,000" id="tpsl-entry" step="any" min="0" />
                        </div>
                    </div>

                    {/* Stop-Loss */}
                    <div className="input-group">
                        <label><Target size={14} /> Stop-Loss Price</label>
                        <div className="pills-row">
                            {STOP_LOSS_PERCENT_PRESETS.map((percent) => (
                                <button
                                    key={percent}
                                    className="pill-btn"
                                    onClick={() => applyStopLossPercent(percent)}
                                >
                                    {isShort ? '+' : '-'}{percent}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input type="number" inputMode="decimal" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)}
                                placeholder={isShort ? '67,000' : '63,000'} id="tpsl-sl" step="any" min="0" />
                        </div>
                    </div>

                    {/* Position Size */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Position Size</label>
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
                            <span className="input-prefix">$</span>
                            <input type="number" inputMode="decimal" value={positionSize} onChange={(e) => setPositionSize(e.target.value)}
                                placeholder="1,000" id="tpsl-size" step="any" min="0" />
                        </div>
                    </div>

                    {/* R:R Ratio */}
                    <div className="input-group">
                        <label><Percent size={14} /> Risk:Reward Ratio</label>
                        <div className="pills-row">
                            {RR_PRESETS.map((r) => (
                                <button key={r.value} className={`pill-btn ${rrRatio === String(r.value) ? 'active' : ''}`}
                                    onClick={() => { setRrRatio(String(r.value)); setAutoCalcTP(true); }}>
                                    {r.label}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">1:</span>
                            <input type="number" inputMode="decimal" value={rrRatio} onChange={(e) => { setRrRatio(e.target.value); setAutoCalcTP(true); }}
                                placeholder="2" id="tpsl-rr" step="0.1" min="0.1" />
                        </div>
                    </div>

                    {/* TP Level Count */}
                    <div className="input-group">
                        <label><Layers size={14} /> Take-Profit Levels</label>
                        <div className="pills-row">
                            {TP_LEVEL_CONFIGS.map((c) => (
                                <button key={c.count} className={`pill-btn ${tpLevelCount === c.count ? 'active' : ''}`}
                                    onClick={() => { setTpLevelCount(c.count); setAutoCalcTP(true); }}>
                                    {c.count === 1 ? 'Single TP' : `${c.count} TPs`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Manual TP override */}
                    {tpLevels.map((level, i) => (
                        <div className="input-group" key={i}>
                            <label>
                                TP{tpLevelCount > 1 ? ` ${i + 1}` : ''} Price
                                {tpLevelCount > 1 && <span className="label-hint">{level.percent}% of position</span>}
                            </label>
                            <div className="input-with-prefix">
                                <span className="input-prefix">$</span>
                                <input type="number" inputMode="decimal" value={level.price}
                                    onChange={(e) => {
                                        const newLevels = [...tpLevels];
                                        newLevels[i] = { ...newLevels[i], price: e.target.value };
                                        setTpLevels(newLevels);
                                        setAutoCalcTP(false);
                                    }}
                                    placeholder={isShort ? '60,000' : '70,000'}
                                    id={`tpsl-tp-${i}`} step="any" min="0" />
                            </div>
                        </div>
                    ))}

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-updates from entry, stop-loss, and R:R. Editing TP fields switches to manual TP mode.
                    </span>
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    {hasResults ? (
                        <>
                            {/* Overall R:R */}
                            <div className="result-hero" style={{ borderColor: overallRR >= 2 ? 'var(--color-accent-green)' : overallRR >= 1 ? '#f59e0b' : '#ef4444' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Risk : Reward Ratio')}</span>
                                <span className="result-hero-value" style={{
                                    color: overallRR >= 2 ? 'var(--color-accent-green)' : overallRR >= 1 ? '#f59e0b' : '#ef4444'
                                }}>
                                    <Target size={28} />
                                    1 : {overallRR.toFixed(2)}
                                </span>
                                <span className="result-hero-roi" style={{
                                    color: overallRR >= 2 ? 'var(--color-accent-green)' : overallRR >= 1 ? '#f59e0b' : '#ef4444'
                                }}>
                                    {overallRR >= 2 ? 'Excellent ratio' : overallRR >= 1.5 ? 'Good ratio' : overallRR >= 1 ? 'Acceptable' : 'Poor — consider adjusting'}
                                </span>
                            </div>

                            {/* R:R Bar */}
                            <div className="rr-bar" style={{ margin: '16px 0' }}>
                                <div className="rr-bar-risk" style={{ flex: 1 }} />
                                <div className="rr-bar-reward" style={{ flex: Math.min(overallRR, 10) }} />
                            </div>
                            <div className="rr-labels">
                                <span className="rr-label-risk">{getUiString(lang, 'Risk')}</span>
                                <span className="rr-label-reward">Reward ({overallRR.toFixed(1)}x)</span>
                            </div>

                            {/* Visual Price Scale */}
                            {renderPriceScale()}

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Price')}</span>
                                    <span className="result-value">{formatUSD(entry)}</span>
                                </div>
                                <div className="result-divider" />

                                {/* Stop Loss */}
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Stop-Loss')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(sl)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'SL Distance')}</span>
                                    <span className="result-value fee">{formatUSD(slDist)} ({formatPercent(slDistPercent)})</span>
                                </div>
                                {size > 0 && (
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Potential Loss')}</span>
                                        <span className="result-value fee">−{formatUSD(slPnl)}</span>
                                    </div>
                                )}
                                <div className="result-divider" />

                                {/* Take Profits */}
                                {tpResults.map((tp, i) => tp.tp > 0 && (
                                    <div key={i}>
                                        <div className="result-row">
                                            <span className="result-label">
                                                <strong>Take-Profit{tpLevelCount > 1 ? ` ${i + 1}` : ''}</strong>
                                                {tpLevelCount > 1 && <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}> ({tp.percent}%)</span>}
                                            </span>
                                            <span className="result-value profit"><strong>{formatUSD(tp.tp)}</strong></span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">TP{tpLevelCount > 1 ? ` ${i + 1}` : ''} Distance</span>
                                            <span className="result-value profit">{formatUSD(tp.tpDist)} ({formatPercent(tp.tpDistPercent)})</span>
                                        </div>
                                        {size > 0 && (
                                            <div className="result-row">
                                                <span className="result-label">{getUiString(lang, 'Potential Profit')}</span>
                                                <span className="result-value profit">+{formatUSD(tp.tpPnl)}</span>
                                            </div>
                                        )}
                                        {i < tpResults.length - 1 && <div className="result-divider" />}
                                    </div>
                                ))}

                                {size > 0 && tpLevelCount > 1 && (
                                    <>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label"><strong>{getUiString(lang, 'Total Potential Profit')}</strong></span>
                                            <span className="result-value profit"><strong>+{formatUSD(totalTpPnl)}</strong></span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="result-cta">
                                <a href="https://www.bybit.com" target="_blank" rel="noopener noreferrer sponsored"  className="cta-btn">
                                    Trade{selectedCoin ? ` ${selectedCoin.symbol.toUpperCase()}` : ''} on Bybit →
                                </a>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Always verify TP/SL levels on your exchange before placing orders.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Target size={40} /></div>
                            <h3>{getUiString(lang, 'Plan Your Trade')}</h3>
                            <p>{getUiString(lang, 'Enter entry price, stop-loss, and R:R ratio to calculate optimal take-profit levels with a visual price scale.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
