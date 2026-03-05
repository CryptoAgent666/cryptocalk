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
    AlertTriangle,
    Scale,
    ArrowUpDown,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

const LEVERAGE_PRESETS = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125];
const PRICE_CHANGE_PRESETS = [-50, -25, -10, -5, 5, 10, 25, 50];
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const LEVERAGE_SCENARIOS = [
    {
        label: 'Long 10x',
        entryPrice: '65000',
        positionSize: '10000',
        leverage: '10',
        priceChange: '10',
        isShort: false,
    },
    {
        label: 'Short 10x',
        entryPrice: '65000',
        positionSize: '10000',
        leverage: '10',
        priceChange: '-10',
        isShort: true,
    },
    {
        label: 'High Risk 25x',
        entryPrice: '65000',
        positionSize: '5000',
        leverage: '25',
        priceChange: '5',
        isShort: false,
    },
] as const;

export default function LeverageCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [entryPrice, setEntryPrice] = useState('');
    const [positionSize, setPositionSize] = useState('1000');
    const [leverage, setLeverage] = useState('10');
    const [priceChange, setPriceChange] = useState('10');
    const [isShort, setIsShort] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Coin search
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setLoading(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`);
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
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`);
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            if (data[coin.id]?.usd) setEntryPrice(String(data[coin.id].usd));
        } catch { }
    };

    const clearCoin = () => { setSelectedCoin(null); setCoinSearch(''); setSuggestions([]); };
    const applyScenario = (scenario: (typeof LEVERAGE_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setEntryPrice(scenario.entryPrice);
        setPositionSize(scenario.positionSize);
        setLeverage(scenario.leverage);
        setPriceChange(scenario.priceChange);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof LEVERAGE_SCENARIOS)[number]) => (
        entryPrice === scenario.entryPrice
        && positionSize === scenario.positionSize
        && leverage === scenario.leverage
        && priceChange === scenario.priceChange
        && isShort === scenario.isShort
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node))
                setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Calculations
    const entry = parseFloat(entryPrice) || 0;
    const size = parseFloat(positionSize) || 0;
    const lev = parseFloat(leverage) || 1;
    const change = parseFloat(priceChange) || 0;
    const highLev = lev > 20;

    const hasInputs = entry > 0 && size > 0 && lev >= 1;

    // Without leverage
    const noLevPnl = size * (change / 100) * (isShort ? -1 : 1);
    const noLevRoi = change * (isShort ? -1 : 1);
    const noLevFinalBalance = size + noLevPnl;

    // With leverage
    const margin = size / lev;
    const leveragedPosition = size;
    const levPnl = size * (change / 100) * (isShort ? -1 : 1);
    const levRoi = noLevRoi * lev;
    const levFinalBalance = margin + levPnl;
    const isLiquidated = levFinalBalance <= 0;

    // Liquidation % move
    const liqPercent = 100 / lev;

    const reset = () => {
        setEntryPrice(''); setPositionSize('1000'); setLeverage('10');
        setPriceChange('10'); setIsShort(false); clearCoin();
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    // Comparison scenarios
    const scenarios = [-50, -25, -10, -5, 5, 10, 25, 50].map(pct => {
        const pnl = size * (pct / 100) * (isShort ? -1 : 1);
        const roi = pct * (isShort ? -1 : 1) * lev;
        const finalBalance = margin + pnl;
        return { pct, pnl, roi, finalBalance, liquidated: finalBalance <= 0 };
    });

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {LEVERAGE_SCENARIOS.map((scenario) => (
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
                        <label><Search size={14} /> {getUiString(lang, 'Cryptocurrency (optional)')}</label>
                        <div className="coin-search-wrapper">
                            <input type="text" value={coinSearch} onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder={getUiString(lang, 'Search coin...')} id="leverage-coin-search" />
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
                                <TrendingUp size={14} /> {getUiString(lang, 'Long')}
                            </button>
                            <button className={`toggle-btn toggle-short ${isShort ? 'active' : ''}`} onClick={() => setIsShort(true)}>
                                <TrendingDown size={14} /> {getUiString(lang, 'Short')}
                            </button>
                        </div>
                    </div>

                    {/* Entry Price */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> {getUiString(lang, 'Entry Price')}</label>
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
                            <input type="number" inputMode="decimal" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)}
                                placeholder="" id="lev-entry" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Position Size */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> {getUiString(lang, 'Position Size')}</label>
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
                            <input type="number" inputMode="decimal" value={positionSize} onChange={(e) => setPositionSize(e.target.value)}
                                placeholder="" id="lev-size" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Leverage */}
                    <div className="input-group">
                        <label>
                            <Scale size={14} /> {getUiString(lang, 'Leverage')}
                            {highLev && <span style={{ color: '#f97316', fontSize: '0.75rem', marginLeft: '6px' }}>⚠ {getUiString(lang, 'High risk')}</span>}
                        </label>
                        <div className="pills-row">
                            {LEVERAGE_PRESETS.map((l) => (
                                <button key={l} className={`pill-btn ${leverage === String(l) ? 'active' : ''} ${l > 20 ? 'pill-danger' : ''}`}
                                    onClick={() => setLeverage(String(l))}>
                                    {l}×
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={leverage} onChange={(e) => setLeverage(e.target.value)}
                                placeholder="" id="lev-leverage" step="1" min="1" max="200" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Price Change */}
                    <div className="input-group">
                        <label><ArrowUpDown size={14} /> {getUiString(lang, 'Price Change (%)')}</label>
                        <div className="pills-row">
                            {PRICE_CHANGE_PRESETS.map((p) => (
                                <button key={p} className={`pill-btn ${priceChange === String(p) ? 'active' : ''} ${p < 0 ? 'pill-danger' : ''}`}
                                    onClick={() => setPriceChange(String(p))}>
                                    {p > 0 ? '+' : ''}{p}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={priceChange} onChange={(e) => setPriceChange(e.target.value)}
                                placeholder="" id="lev-change" step="1" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use presets for fast stress-testing.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {highLev && (
                                <div style={{
                                    padding: '10px 14px', background: 'rgba(249,115,22,0.1)',
                                    border: '1px solid rgba(249,115,22,0.3)', borderRadius: '10px',
                                    fontSize: '0.85rem', color: '#f97316', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px',
                                }}>
                                    <AlertTriangle size={16} /> {getUiString(lang, 'Liquidation at just')} {liqPercent.toFixed(1)}% {getUiString(lang, 'price move against you.')}
                                </div>
                            )}

                            {/* Side by Side Comparison */}
                            <div className="compare-cards-grid">
                                {/* Without Leverage */}
                                <div style={{
                                    padding: '16px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '12px',
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {getUiString(lang, 'Without Leverage (1×)')}
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: noLevPnl >= 0 ? 'var(--color-accent-green)' : '#ef4444', marginBottom: '4px' }}>
                                        {noLevPnl >= 0 ? '+' : ''}{formatUSD(noLevPnl)}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: noLevRoi >= 0 ? 'var(--color-accent-green)' : '#ef4444' }}>
                                        ROI: {formatPercent(noLevRoi)}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                                        {getUiString(lang, 'Balance')}: {formatUSD(noLevFinalBalance)}
                                    </div>
                                </div>

                                {/* With Leverage */}
                                <div style={{
                                    padding: '16px', background: isLiquidated ? 'rgba(239,68,68,0.08)' : 'rgba(99,102,241,0.06)',
                                    border: `1px solid ${isLiquidated ? 'rgba(239,68,68,0.3)' : 'var(--color-primary)'}`,
                                    borderRadius: '12px',
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {getUiString(lang, 'With')} {lev}× {getUiString(lang, 'Leverage')}
                                    </div>
                                    {isLiquidated ? (
                                        <>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>
                                                {getUiString(lang, 'LIQUIDATED')}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#ef4444' }}>
                                                {getUiString(lang, 'Loss')}: −{formatUSD(margin)}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: levPnl >= 0 ? 'var(--color-accent-green)' : '#ef4444', marginBottom: '4px' }}>
                                                {levPnl >= 0 ? '+' : ''}{formatUSD(levPnl)}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: levRoi >= 0 ? 'var(--color-accent-green)' : '#ef4444' }}>
                                                ROI: {formatPercent(levRoi)}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                                                {getUiString(lang, 'Balance')}: {formatUSD(levFinalBalance)} ({getUiString(lang, 'margin')}: {formatUSD(margin)})
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Amplification */}
                            <div style={{
                                padding: '12px 16px', background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)', borderRadius: '10px',
                                textAlign: 'center', marginBottom: '16px',
                            }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{getUiString(lang, 'Leverage amplifies your PnL by')} </span>
                                <strong style={{ color: 'var(--color-primary)', fontSize: '1rem' }}>{lev}×</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}> {getUiString(lang, '— liquidation at')} <strong style={{ color: '#ef4444' }}>{liqPercent.toFixed(1)}%</strong> {getUiString(lang, 'move')}</span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Position Value')}</span>
                                    <span className="result-value">{formatUSD(size)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Margin (collateral)')}</span>
                                    <span className="result-value">{formatUSD(margin)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Leverage')}</span>
                                    <span className="result-value">{lev}×</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Price Change')}</span>
                                    <span className="result-value">{formatPercent(change)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Leveraged PnL')}</strong></span>
                                    <span className={`result-value ${levPnl >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{levPnl >= 0 ? '+' : ''}{formatUSD(levPnl)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Leveraged ROI')}</strong></span>
                                    <span className={`result-value ${levRoi >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{formatPercent(levRoi)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Liquidation Distance')}</span>
                                    <span className="result-value fee">{liqPercent.toFixed(2)}%</span>
                                </div>
                            </div>

                            {/* Scenarios Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'PnL at Different Price Moves')} ({lev}× {getUiString(lang, 'leverage')})
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{
                                        width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem',
                                    }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Price Δ')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'PnL')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'ROI')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scenarios.map((s) => (
                                                <tr key={s.pct} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: s.pct === change ? 'rgba(99,102,241,0.06)' : undefined,
                                                    opacity: s.liquidated ? 0.6 : 1,
                                                }}>
                                                    <td style={{ padding: '8px', fontWeight: s.pct === change ? 600 : 400 }}>
                                                        {s.pct > 0 ? '+' : ''}{s.pct}%
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 500,
                                                        color: s.liquidated ? '#ef4444' : s.pnl >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                                    }}>
                                                        {s.liquidated ? getUiString(lang, 'LIQUIDATED') : `${s.pnl >= 0 ? '+' : ''}${formatUSD(s.pnl)}`}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right',
                                                        color: s.liquidated ? '#ef4444' : s.roi >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                                    }}>
                                                        {s.liquidated ? '−100%' : formatPercent(s.roi)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                        {s.liquidated ? '$0.00' : formatUSD(s.finalBalance)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For educational purposes only. Leverage amplifies both gains and losses. Trade responsibly.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Scale size={40} /></div>
                            <h3>{getUiString(lang, 'See Leverage in Action')}</h3>
                            <p>{getUiString(lang, 'Enter position details and leverage to see a side-by-side comparison of leveraged vs unleveraged PnL with a scenario table.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
