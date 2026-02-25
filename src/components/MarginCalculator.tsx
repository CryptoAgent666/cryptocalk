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
    Shield,
    AlertTriangle,
    Scale,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface Results {
    requiredMargin: number;
    positionValue: number;
    marginLevel: number;
    freeMargin: number;
    marginCallPrice: number;
    maxLoss: number;
    effectiveLeverage: number;
    marginUsagePercent: number;
    healthStatus: 'healthy' | 'warning' | 'danger' | 'critical';
}

const LEVERAGE_PRESETS = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125];
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const WALLET_BALANCE_PILLS = ['1000', '5000', '10000', '25000'];
const MARGIN_SCENARIOS = [
    {
        label: 'Long 10x',
        entryPrice: '65000',
        positionSize: '10000',
        leverage: '10',
        walletBalance: '',
        maintenanceRate: '0.5',
        isShort: false,
    },
    {
        label: 'Short 10x',
        entryPrice: '65000',
        positionSize: '10000',
        leverage: '10',
        walletBalance: '',
        maintenanceRate: '0.5',
        isShort: true,
    },
    {
        label: 'Conservative 5x',
        entryPrice: '65000',
        positionSize: '10000',
        leverage: '5',
        walletBalance: '5000',
        maintenanceRate: '0.5',
        isShort: false,
    },
] as const;

export default function MarginCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [entryPrice, setEntryPrice] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [leverage, setLeverage] = useState('10');
    const [walletBalance, setWalletBalance] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [maintenanceRate, setMaintenanceRate] = useState('0.5');
    const [results, setResults] = useState<Results | null>(null);
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
    const applyScenario = (scenario: (typeof MARGIN_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setEntryPrice(scenario.entryPrice);
        setPositionSize(scenario.positionSize);
        setLeverage(scenario.leverage);
        setWalletBalance(scenario.walletBalance);
        setMaintenanceRate(scenario.maintenanceRate);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof MARGIN_SCENARIOS)[number]) => (
        entryPrice === scenario.entryPrice
        && positionSize === scenario.positionSize
        && leverage === scenario.leverage
        && walletBalance === scenario.walletBalance
        && maintenanceRate === scenario.maintenanceRate
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

    // Calculate
    const calculate = useCallback(() => {
        const entry = parseFloat(entryPrice);
        const size = parseFloat(positionSize);
        const lev = parseFloat(leverage) || 1;
        const wallet = parseFloat(walletBalance);
        const mmr = parseFloat(maintenanceRate) / 100;

        if (isNaN(entry) || isNaN(size) || entry <= 0 || size <= 0 || lev < 1) {
            setResults(null);
            return;
        }

        const positionValue = size;
        const requiredMargin = positionValue / lev;
        const effectiveBalance = isNaN(wallet) || wallet <= 0 ? requiredMargin : wallet;
        const maintenanceMargin = positionValue * mmr;
        const freeMargin = effectiveBalance - requiredMargin;
        const marginLevel = requiredMargin > 0 ? (effectiveBalance / requiredMargin) * 100 : 0;
        const marginUsagePercent = effectiveBalance > 0 ? (requiredMargin / effectiveBalance) * 100 : 0;

        // Margin call price (when equity = maintenance margin)
        const qty = positionValue / entry;
        let marginCallPrice: number;
        if (isShort) {
            marginCallPrice = entry + ((effectiveBalance - maintenanceMargin) / qty);
        } else {
            marginCallPrice = entry - ((effectiveBalance - maintenanceMargin) / qty);
        }
        marginCallPrice = Math.max(marginCallPrice, 0);

        // Max loss before margin call
        const maxLoss = effectiveBalance - maintenanceMargin;

        // Health status
        let healthStatus: Results['healthStatus'];
        if (marginLevel > 500) healthStatus = 'healthy';
        else if (marginLevel > 200) healthStatus = 'warning';
        else if (marginLevel > 100) healthStatus = 'danger';
        else healthStatus = 'critical';

        setResults({
            requiredMargin,
            positionValue,
            marginLevel,
            freeMargin,
            marginCallPrice,
            maxLoss: Math.max(maxLoss, 0),
            effectiveLeverage: lev,
            marginUsagePercent: Math.min(marginUsagePercent, 100),
            healthStatus,
        });
    }, [entryPrice, positionSize, leverage, walletBalance, isShort, maintenanceRate]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setEntryPrice(''); setPositionSize(''); setLeverage('10');
        setWalletBalance(''); setIsShort(false); setMaintenanceRate('0.5');
        setResults(null); clearCoin();
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n.toFixed(2)}%`;

    const lev = parseFloat(leverage) || 1;
    const highLev = lev > 20;

    const getHealthColor = (status: Results['healthStatus']) => {
        switch (status) {
            case 'healthy': return 'var(--color-accent-green)';
            case 'warning': return '#f59e0b';
            case 'danger': return '#f97316';
            case 'critical': return '#ef4444';
        }
    };

    const getHealthLabel = (status: Results['healthStatus']) => {
        switch (status) {
            case 'healthy': return 'Healthy';
            case 'warning': return 'Caution';
            case 'danger': return 'At Risk';
            case 'critical': return 'Margin Call Zone';
        }
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {MARGIN_SCENARIOS.map((scenario) => (
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
                                placeholder="Search coin..." id="margin-coin-search" />
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
                        <label>Position Type</label>
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
                                placeholder="" id="margin-entry" step="any" min="0" />
                        </div>
                    </div>

                    {/* Position Size */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Position Size (total value)</label>
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
                                placeholder="" id="margin-size" step="any" min="0" />
                        </div>
                    </div>

                    {/* Leverage */}
                    <div className="input-group">
                        <label>
                            <Scale size={14} /> Leverage
                            {highLev && <span style={{ color: '#f97316', fontSize: '0.75rem', marginLeft: '6px' }}>⚠ High risk</span>}
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
                                placeholder="" id="margin-leverage" step="1" min="1" max="200" />
                        </div>
                    </div>

                    {/* Wallet Balance */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Wallet Balance (optional)</label>
                        <div className="pills-row">
                            <button
                                className={`pill-btn ${walletBalance === '' ? 'active' : ''}`}
                                onClick={() => setWalletBalance('')}
                            >
                                Auto
                            </button>
                            {WALLET_BALANCE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${walletBalance === preset ? 'active' : ''}`}
                                    onClick={() => setWalletBalance(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={walletBalance} onChange={(e) => setWalletBalance(e.target.value)}
                                placeholder="Auto (= required margin)" id="margin-wallet" step="any" min="0" />
                        </div>
                        <span className="input-hint">
                            If empty, assumes isolated margin = required margin.
                        </span>
                    </div>

                    {/* Maintenance Margin Rate */}
                    <div className="input-group">
                        <label><Percent size={14} /> Maintenance Margin Rate</label>
                        <div className="pills-row">
                            {[0.4, 0.5, 1.0].map((r) => (
                                <button key={r} className={`pill-btn ${maintenanceRate === String(r) ? 'active' : ''}`}
                                    onClick={() => setMaintenanceRate(String(r))}>
                                    {r}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={maintenanceRate} onChange={(e) => setMaintenanceRate(e.target.value)}
                                placeholder="" id="margin-mmr" step="0.1" min="0" />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Leave wallet empty to estimate isolated margin.
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {highLev && (
                                <div style={{
                                    padding: '10px 14px', background: 'rgba(249,115,22,0.1)',
                                    border: '1px solid rgba(249,115,22,0.3)', borderRadius: '10px',
                                    fontSize: '0.85rem', color: '#f97316', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px',
                                }}>
                                    <AlertTriangle size={16} /> High leverage ({lev}×) significantly increases liquidation risk.
                                </div>
                            )}

                            {/* Required Margin */}
                            <div className="result-hero" style={{ borderColor: getHealthColor(results.healthStatus) }}>
                                <span className="result-hero-label">{getUiString(lang, 'Required Margin')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <Shield size={28} />
                                    {formatUSD(results.requiredMargin)}
                                </span>
                                <span className="result-hero-roi" style={{ color: getHealthColor(results.healthStatus) }}>
                                    {getHealthLabel(results.healthStatus)} — Margin Level {formatPercent(results.marginLevel)}
                                </span>
                            </div>

                            {/* Margin Usage Bar */}
                            <div style={{ margin: '16px 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                                    <span>{getUiString(lang, 'Margin Usage')}</span>
                                    <span style={{ color: getHealthColor(results.healthStatus), fontWeight: 600 }}>
                                        {formatPercent(results.marginUsagePercent)}
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%', height: '8px', borderRadius: '4px',
                                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                                }}>
                                    <div style={{
                                        width: `${Math.min(results.marginUsagePercent, 100)}%`,
                                        height: '100%', borderRadius: '4px',
                                        background: getHealthColor(results.healthStatus),
                                        transition: 'width 0.4s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Position Value')}</span>
                                    <span className="result-value">{formatUSD(results.positionValue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Leverage')}</span>
                                    <span className="result-value">{results.effectiveLeverage}×</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Required Margin')}</strong></span>
                                    <span className="result-value"><strong>{formatUSD(results.requiredMargin)}</strong></span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Free Margin')}</span>
                                    <span className={`result-value ${results.freeMargin >= 0 ? 'profit' : 'fee'}`}>
                                        {formatUSD(results.freeMargin)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Margin Level')}</span>
                                    <span className="result-value" style={{ color: getHealthColor(results.healthStatus) }}>
                                        {formatPercent(results.marginLevel)}
                                    </span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Margin Call Price')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(results.marginCallPrice)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Max Loss Before Call')}</span>
                                    <span className="result-value fee">{formatUSD(results.maxLoss)}</span>
                                </div>
                            </div>

                            {/* Health Tip */}
                            <div style={{
                                padding: '12px 16px', background: 'var(--color-bg-card)',
                                border: `1px solid ${getHealthColor(results.healthStatus)}30`,
                                borderRadius: '10px', fontSize: '0.85rem', lineHeight: 1.5,
                                color: 'var(--color-text-secondary)', marginTop: '8px',
                            }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <Info size={16} style={{ flexShrink: 0, marginTop: '2px', color: getHealthColor(results.healthStatus) }} />
                                    <span>
                                        {results.healthStatus === 'healthy' && 'Your margin level is healthy. You have sufficient buffer before a margin call.'}
                                        {results.healthStatus === 'warning' && 'Margin level is moderate. Consider reducing position size or adding margin for safety.'}
                                        {results.healthStatus === 'danger' && 'Margin level is low! You are close to a margin call. Reduce leverage or add funds.'}
                                        {results.healthStatus === 'critical' && 'Critical margin level! You are at or below the margin call threshold. Immediate action required.'}
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'This is an estimate. Actual margin requirements vary by exchange, tier level, and market conditions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Shield size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Required Margin')}</h3>
                            <p>{getUiString(lang, 'Enter position details and leverage to see how much margin is required and when you\'ll face a margin call.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
