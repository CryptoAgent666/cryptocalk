import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Shield,
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Search,
    X,
    AlertTriangle,
    Crosshair,
    Gauge,
    Building2,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    current_price?: number;
    thumb?: string;
}

interface Results {
    liquidationPrice: number;
    distanceToLiquidation: number;
    maintenanceMargin: number;
    marginRatio: number;
    initialMargin: number;
    pnlAtLiquidation: number;
    effectiveMMR: number;
    riskLevel: 'safe' | 'moderate' | 'danger' | 'extreme';
}

const EXCHANGES = [
    { id: 'binance', name: 'Binance', mmr: 0.004 },
    { id: 'bybit', name: 'Bybit', mmr: 0.005 },
    { id: 'okx', name: 'OKX', mmr: 0.005 },
] as const;

const LEVERAGE_PRESETS = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125];
const MARGIN_TYPES = ['isolated', 'cross'] as const;
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const WALLET_BALANCE_PILLS = ['1000', '5000', '10000', '25000'];
const LIQUIDATION_SCENARIOS = [
    {
        label: 'Long Isolated',
        exchange: 'binance',
        isShort: false,
        leverage: '10',
        entryPrice: '65000',
        positionSize: '10000',
        marginType: 'isolated',
        walletBalance: '',
    },
    {
        label: 'Short Isolated',
        exchange: 'bybit',
        isShort: true,
        leverage: '10',
        entryPrice: '65000',
        positionSize: '10000',
        marginType: 'isolated',
        walletBalance: '',
    },
    {
        label: 'Cross Buffer',
        exchange: 'binance',
        isShort: false,
        leverage: '20',
        entryPrice: '65000',
        positionSize: '10000',
        marginType: 'cross',
        walletBalance: '10000',
    },
] as const;

export default function LiquidationCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [exchange, setExchange] = useState('binance');
    const [isShort, setIsShort] = useState(false);
    const [leverage, setLeverage] = useState('10');
    const [entryPrice, setEntryPrice] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [marginType, setMarginType] = useState<typeof MARGIN_TYPES[number]>('isolated');
    const [walletBalance, setWalletBalance] = useState('');
    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const currentExchange = EXCHANGES.find((e) => e.id === exchange)!;

    // Search coins via CoinGecko
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`
            );
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            const coins = (data.coins || []).slice(0, 8).map((c: any) => ({
                id: c.id,
                name: c.name,
                symbol: c.symbol,
                thumb: c.thumb,
            }));
            setSuggestions(coins);
            setShowSuggestions(true);
        } catch {
            setSuggestions([]);
        }
        setLoading(false);
    }, []);

    const handleCoinSearch = (value: string) => {
        setCoinSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(value), 400);
    };

    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[coin.id]?.usd;
            if (price) {
                setEntryPrice(String(price));
            }
        } catch {
            // Silently fail
        }
    };

    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
    };
    const applyScenario = (scenario: (typeof LIQUIDATION_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setExchange(scenario.exchange);
        setIsShort(scenario.isShort);
        setLeverage(scenario.leverage);
        setEntryPrice(scenario.entryPrice);
        setPositionSize(scenario.positionSize);
        setMarginType(scenario.marginType);
        setWalletBalance(scenario.walletBalance);
    };
    const isScenarioActive = (scenario: (typeof LIQUIDATION_SCENARIOS)[number]) => (
        exchange === scenario.exchange
        && isShort === scenario.isShort
        && leverage === scenario.leverage
        && entryPrice === scenario.entryPrice
        && positionSize === scenario.positionSize
        && marginType === scenario.marginType
        && (scenario.marginType === 'cross' ? walletBalance === scenario.walletBalance : true)
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Calculate results
    const calculate = useCallback(() => {
        const entry = parseFloat(entryPrice);
        const size = parseFloat(positionSize);
        const lev = parseFloat(leverage) || 1;
        const mmr = currentExchange.mmr;

        if (isNaN(entry) || isNaN(size) || entry <= 0 || size <= 0 || lev < 1) {
            setResults(null);
            return;
        }

        // Initial margin
        const initialMargin = size / lev;

        // Maintenance margin
        const maintenanceMargin = size * mmr;

        let liquidationPrice: number;

        if (marginType === 'isolated') {
            // Isolated margin liquidation
            if (isShort) {
                // Short: liq = entry * (1 + (1/lev) - mmr)
                liquidationPrice = entry * (1 + (1 / lev) - mmr);
            } else {
                // Long: liq = entry * (1 - (1/lev) + mmr)
                liquidationPrice = entry * (1 - (1 / lev) + mmr);
            }
        } else {
            // Cross margin — uses wallet balance
            const wallet = parseFloat(walletBalance) || initialMargin;
            const qty = size / entry; // quantity in coins

            if (isShort) {
                // Short cross: liq = (entry * qty + wallet - maintenanceMargin) / qty
                liquidationPrice = (entry * qty + wallet - maintenanceMargin) / qty;
            } else {
                // Long cross: liq = (entry * qty - wallet + maintenanceMargin) / qty
                liquidationPrice = (entry * qty - wallet + maintenanceMargin) / qty;
            }
        }

        // Ensure liq price is positive
        liquidationPrice = Math.max(liquidationPrice, 0);

        // Distance to liquidation
        const distToLiq = Math.abs(entry - liquidationPrice);
        const distancePercent = (distToLiq / entry) * 100;

        // PnL at liquidation
        const qty = size / entry;
        let pnlAtLiquidation: number;
        if (isShort) {
            pnlAtLiquidation = (entry - liquidationPrice) * qty;
        } else {
            pnlAtLiquidation = (liquidationPrice - entry) * qty;
        }

        // Margin ratio (how close to liquidation)
        const marginRatio = (maintenanceMargin / initialMargin) * 100;

        // Risk level
        let riskLevel: Results['riskLevel'];
        if (distancePercent > 20) riskLevel = 'safe';
        else if (distancePercent > 10) riskLevel = 'moderate';
        else if (distancePercent > 5) riskLevel = 'danger';
        else riskLevel = 'extreme';

        setResults({
            liquidationPrice,
            distanceToLiquidation: distancePercent,
            maintenanceMargin,
            marginRatio,
            initialMargin,
            pnlAtLiquidation,
            effectiveMMR: mmr * 100,
            riskLevel,
        });
    }, [entryPrice, positionSize, leverage, exchange, isShort, marginType, walletBalance, currentExchange.mmr]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setEntryPrice('');
        setPositionSize('');
        setLeverage('10');
        setExchange('binance');
        setIsShort(false);
        setMarginType('isolated');
        setWalletBalance('');
        setResults(null);
        clearCoin();
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatPercent = (n: number) => `${n.toFixed(2)}%`;

    const lev = parseFloat(leverage) || 1;
    const highLev = lev > 20;

    const getRiskColor = (level: Results['riskLevel']) => {
        switch (level) {
            case 'safe': return 'var(--color-accent-green)';
            case 'moderate': return '#f59e0b';
            case 'danger': return '#f97316';
            case 'extreme': return '#ef4444';
        }
    };

    const getRiskLabel = (level: Results['riskLevel']) => {
        switch (level) {
            case 'safe': return getUiString(lang, 'Low Risk');
            case 'moderate': return getUiString(lang, 'Moderate Risk');
            case 'danger': return getUiString(lang, 'High Risk');
            case 'extreme': return getUiString(lang, 'Extreme Risk');
        }
    };

    const getSafetyTip = (level: Results['riskLevel']) => {
        switch (level) {
            case 'safe':
                return getUiString(lang, 'Your liquidation price has a comfortable buffer. Good risk management!');
            case 'moderate':
                return getUiString(lang, 'Consider reducing leverage or adding margin for extra safety.');
            case 'danger':
                return getUiString(lang, 'Your position is at high risk of liquidation. Consider reducing leverage.');
            case 'extreme':
                return '⚠️ ' + getUiString(lang, 'Extremely close to liquidation. Reduce leverage or add more margin immediately.');
        }
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {LIQUIDATION_SCENARIOS.map((scenario) => (
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
                        <label>
                            <Search size={14} />
                            Cryptocurrency (optional)
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={coinSearch}
                                onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder="Search coin (e.g. Bitcoin)..."
                                id="liq-coin-search"
                            />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear selection">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((coin) => (
                                    <button
                                        key={coin.id}
                                        className="suggestion-item"
                                        onClick={() => selectCoin(coin)}
                                    >
                                        {coin.thumb && (
                                            <img src={coin.thumb} alt="" width={20} height={20} />
                                        )}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Exchange */}
                    <div className="input-group">
                        <label>
                            <Building2 size={14} />
                            {getUiString(lang, 'Exchange')}
                        </label>
                        <div className="pills-row">
                            {EXCHANGES.map((ex) => (
                                <button
                                    key={ex.id}
                                    className={`pill-btn ${exchange === ex.id ? 'active' : ''}`}
                                    onClick={() => setExchange(ex.id)}
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>
                        <span className="input-hint" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            MMR: {(currentExchange.mmr * 100).toFixed(1)}%
                        </span>
                    </div>

                    {/* Position Type */}
                    <div className="input-group">
                        <label>Position Type</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${!isShort ? 'active' : ''}`}
                                onClick={() => setIsShort(false)}
                            >
                                <TrendingUp size={14} />
                                Long
                            </button>
                            <button
                                className={`toggle-btn toggle-short ${isShort ? 'active' : ''}`}
                                onClick={() => setIsShort(true)}
                            >
                                <TrendingDown size={14} />
                                Short
                            </button>
                        </div>
                    </div>

                    {/* Margin Type */}
                    <div className="input-group">
                        <label>
                            <Shield size={14} />
                            Margin Type
                        </label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${marginType === 'isolated' ? 'active' : ''}`}
                                onClick={() => setMarginType('isolated')}
                            >
                                Isolated
                            </button>
                            <button
                                className={`toggle-btn ${marginType === 'cross' ? 'active' : ''}`}
                                onClick={() => setMarginType('cross')}
                            >
                                Cross
                            </button>
                        </div>
                    </div>

                    {/* Leverage */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            {getUiString(lang, 'Leverage')}
                        </label>
                        <div className="pills-row">
                            {LEVERAGE_PRESETS.map((l) => (
                                <button
                                    key={l}
                                    className={`pill-btn ${leverage === String(l) ? 'active' : ''} ${l > 20 ? 'pill-danger' : ''}`}
                                    onClick={() => setLeverage(String(l))}
                                >
                                    {l}x
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={leverage}
                                onChange={(e) => setLeverage(e.target.value)}
                                placeholder=""
                                id="liq-leverage"
                                step="1"
                                min="1"
                                max="125"
                            />
                        </div>
                    </div>

                    {/* Entry Price */}
                    <div className="input-group">
                        <label>
                            <Crosshair size={14} />
                            Entry Price
                            {selectedCoin && (
                                <span className="label-hint">Auto-filled</span>
                            )}
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
                                placeholder=""
                                id="liq-entry-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Position Size */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Position Size (Total Value)
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
                                placeholder=""
                                id="liq-position-size"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Wallet Balance (Cross mode) */}
                    {marginType === 'cross' && (
                        <div className="input-group">
                            <label>
                                <DollarSign size={14} />
                                Wallet Balance
                            </label>
                            <div className="pills-row">
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
                                <input
                                    type="number" inputMode="decimal"
                                    value={walletBalance}
                                    onChange={(e) => setWalletBalance(e.target.value)}
                                    placeholder=""
                                    id="liq-wallet-balance"
                                    step="any"
                                    min="0"
                                />
                            </div>
                            <span className="input-hint" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                Your total available margin balance
                            </span>
                        </div>
                    )}

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Use entry, size, and wallet presets for a faster estimate.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* High Leverage Warning */}
                            {highLev && (
                                <div className="leverage-warning">
                                    <AlertTriangle size={16} />
                                    <span>{lev}x {getUiString(lang, 'leverage')} — {getUiString(lang, 'a')} {formatPercent(100 / lev)} {getUiString(lang, 'price move against you triggers liquidation!')}</span>
                                </div>
                            )}

                            {/* Main Result: Liquidation Price */}
                            <div className="result-hero" style={{ borderColor: getRiskColor(results.riskLevel) }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Liquidation Price')}
                                </span>
                                <span className="result-hero-value" style={{ color: getRiskColor(results.riskLevel) }}>
                                    <Gauge size={28} />
                                    {formatUSD(results.liquidationPrice)}
                                </span>
                                <span className="result-hero-roi" style={{ color: getRiskColor(results.riskLevel) }}>
                                    {formatPercent(results.distanceToLiquidation)} {getUiString(lang, 'from entry')} ({isShort ? getUiString(lang, 'above') : getUiString(lang, 'below')})
                                </span>
                            </div>

                            {/* Risk Gauge */}
                            <div className="liq-gauge" style={{ margin: '16px 0' }}>
                                <div className="liq-gauge-bar">
                                    <div className="liq-gauge-fill" style={{
                                        width: `${Math.min(Math.max(100 - results.distanceToLiquidation * 3, 5), 100)}%`,
                                        background: getRiskColor(results.riskLevel),
                                    }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '4px' }}>
                                    <span style={{ color: 'var(--color-accent-green)' }}>{getUiString(lang, 'Safe')}</span>
                                    <span style={{ fontWeight: 600, color: getRiskColor(results.riskLevel) }}>
                                        {getRiskLabel(results.riskLevel)}
                                    </span>
                                    <span style={{ color: '#ef4444' }}>{getUiString(lang, 'Danger')}</span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Exchange')}</span>
                                    <span className="result-value">{currentExchange.name}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Direction')}</span>
                                    <span className="result-value">{isShort ? '🔴 ' + getUiString(lang, 'Short') : '🟢 ' + getUiString(lang, 'Long')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Margin Type')}</span>
                                    <span className="result-value" style={{ textTransform: 'capitalize' }}>{marginType}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Price')}</span>
                                    <span className="result-value">{formatUSD(parseFloat(entryPrice))}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Liquidation Price')}</strong>
                                    </span>
                                    <span className="result-value fee">
                                        <strong>{formatUSD(results.liquidationPrice)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Distance to Liquidation')}</span>
                                    <span className="result-value" style={{ color: getRiskColor(results.riskLevel) }}>
                                        {formatPercent(results.distanceToLiquidation)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Leverage')}</span>
                                    <span className="result-value">{lev}x</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Margin')}</span>
                                    <span className="result-value">{formatUSD(results.initialMargin)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Maintenance Margin')}</span>
                                    <span className="result-value">{formatUSD(results.maintenanceMargin)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">MMR ({currentExchange.name})</span>
                                    <span className="result-value">{formatPercent(results.effectiveMMR)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Loss at Liquidation')}</span>
                                    <span className="result-value fee">
                                        <strong>{formatUSD(Math.abs(results.pnlAtLiquidation))}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Safety Tip */}
                            <div style={{
                                padding: '12px 16px',
                                background: `${getRiskColor(results.riskLevel)}15`,
                                border: `1px solid ${getRiskColor(results.riskLevel)}40`,
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                color: 'var(--color-text)',
                                marginTop: '8px',
                            }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <Shield size={16} style={{ flexShrink: 0, marginTop: '2px', color: getRiskColor(results.riskLevel) }} />
                                    <span>{getSafetyTip(results.riskLevel)}</span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Simplified estimate. Actual liquidation prices vary by exchange tier, funding, and fees. Always check your exchange for exact values.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Gauge size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Calculate Liquidation Price')}</h3>
                            <p>{getUiString(lang, 'Enter your leverage, entry price, and position size to see when your position would be liquidated.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
