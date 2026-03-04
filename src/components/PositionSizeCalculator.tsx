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
    Target,
    Crosshair,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    current_price?: number;
    thumb?: string;
}

interface Results {
    positionSize: number;
    numberOfCoins: number;
    riskAmount: number;
    riskPercent: number;
    slDistance: number;
    slDistancePercent: number;
    leveragedPosition: number;
    requiredMargin: number;
    liquidationPrice: number;
    totalFees: number;
    effectiveRisk: number;
}

const RISK_PRESETS = [0.5, 1, 2, 3, 5];
const LEVERAGE_PRESETS = [1, 2, 5, 10, 25, 50, 100];
const ACCOUNT_BALANCE_PILLS = ['1000', '5000', '10000', '25000'];
const ENTRY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const EXCHANGE_FEE_PILLS = ['0.02', '0.05', '0.1', '0.2'];
const POSITION_SIZE_SCENARIOS = [
    {
        label: 'BTC Swing Long',
        accountBalance: '10000',
        riskPercent: '2',
        entryPrice: '65000',
        stopLoss: '63000',
        takeProfit: '70000',
        leverage: '1',
        exchangeFee: '0.1',
        isShort: false,
    },
    {
        label: 'BTC Short Setup',
        accountBalance: '5000',
        riskPercent: '1',
        entryPrice: '65000',
        stopLoss: '67000',
        takeProfit: '62000',
        leverage: '3',
        exchangeFee: '0.05',
        isShort: true,
    },
    {
        label: 'Leveraged Long 10x',
        accountBalance: '25000',
        riskPercent: '1',
        entryPrice: '65000',
        stopLoss: '64000',
        takeProfit: '68000',
        leverage: '10',
        exchangeFee: '0.1',
        isShort: false,
    },
] as const;

export default function PositionSizeCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [accountBalance, setAccountBalance] = useState('');
    const [riskPercent, setRiskPercent] = useState('2');
    const [entryPrice, setEntryPrice] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [takeProfit, setTakeProfit] = useState('');
    const [leverage, setLeverage] = useState('1');
    const [exchangeFee, setExchangeFee] = useState('0.1');
    const [isShort, setIsShort] = useState(false);
    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

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
    const applyScenario = (scenario: (typeof POSITION_SIZE_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setAccountBalance(scenario.accountBalance);
        setRiskPercent(scenario.riskPercent);
        setEntryPrice(scenario.entryPrice);
        setStopLoss(scenario.stopLoss);
        setTakeProfit(scenario.takeProfit);
        setLeverage(scenario.leverage);
        setExchangeFee(scenario.exchangeFee);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof POSITION_SIZE_SCENARIOS)[number]) => (
        accountBalance === scenario.accountBalance
        && riskPercent === scenario.riskPercent
        && entryPrice === scenario.entryPrice
        && stopLoss === scenario.stopLoss
        && takeProfit === scenario.takeProfit
        && leverage === scenario.leverage
        && exchangeFee === scenario.exchangeFee
        && isShort === scenario.isShort
    );

    // Close suggestions on outside click
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
        const balance = parseFloat(accountBalance);
        const risk = parseFloat(riskPercent);
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        const lev = parseFloat(leverage) || 1;
        const fee = parseFloat(exchangeFee) || 0;

        if (isNaN(balance) || isNaN(risk) || isNaN(entry) || isNaN(sl) || balance <= 0 || entry <= 0 || sl <= 0) {
            setResults(null);
            return;
        }

        // Validate SL direction
        if (!isShort && sl >= entry) {
            setResults(null);
            return;
        }
        if (isShort && sl <= entry) {
            setResults(null);
            return;
        }

        // Risk amount in dollars
        const riskAmount = balance * (risk / 100);

        // SL distance
        const slDistance = Math.abs(entry - sl);
        const slDistancePercent = (slDistance / entry) * 100;

        // Position size = Risk amount / SL distance %
        const positionSize = riskAmount / (slDistancePercent / 100);
        const numberOfCoins = positionSize / entry;

        // With leverage, the actual notional position is larger
        // positionSize is the margin-based position (risk / SL%)
        // requiredMargin = positionSize / leverage
        const requiredMargin = positionSize / lev;
        const leveragedPosition = positionSize;

        // Fees calculated on the full (leveraged) notional position
        const totalFees = positionSize * (fee / 100) * 2;

        // Effective risk (risk + fees)
        const effectiveRisk = riskAmount + totalFees;

        // Liquidation price estimate (simplified)
        let liquidationPrice: number;
        if (isShort) {
            liquidationPrice = entry * (1 + 1 / lev);
        } else {
            liquidationPrice = entry * (1 - 1 / lev);
        }

        setResults({
            positionSize,
            numberOfCoins,
            riskAmount,
            riskPercent: risk,
            slDistance,
            slDistancePercent,
            leveragedPosition,
            requiredMargin,
            liquidationPrice,
            totalFees,
            effectiveRisk,
        });
    }, [accountBalance, riskPercent, entryPrice, stopLoss, leverage, exchangeFee, isShort]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    // Risk:Reward ratio
    const getRiskReward = () => {
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        const tp = parseFloat(takeProfit);
        if (isNaN(entry) || isNaN(sl) || isNaN(tp) || entry <= 0) return null;
        const riskDist = Math.abs(entry - sl);
        const rewardDist = Math.abs(tp - entry);
        if (riskDist === 0) return null;
        return rewardDist / riskDist;
    };

    const reset = () => {
        setAccountBalance('');
        setRiskPercent('2');
        setEntryPrice('');
        setStopLoss('');
        setTakeProfit('');
        setLeverage('1');
        setExchangeFee('0.1');
        setIsShort(false);
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

    const formatCoins = (n: number) => {
        if (n >= 1) return n.toFixed(4);
        if (n >= 0.001) return n.toFixed(6);
        return n.toFixed(8);
    };

    const formatPercent = (n: number) => `${n.toFixed(2)}%`;

    const rr = getRiskReward();
    const lev = parseFloat(leverage) || 1;
    const highLeverage = lev > 20;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {POSITION_SIZE_SCENARIOS.map((scenario) => (
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
                                id="position-coin-search"
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

                    {/* Account Balance */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Account Balance
                        </label>
                        <div className="pills-row">
                            {ACCOUNT_BALANCE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${accountBalance === preset ? 'active' : ''}`}
                                    onClick={() => setAccountBalance(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={accountBalance}
                                onChange={(e) => setAccountBalance(e.target.value)}
                                placeholder=""
                                id="account-balance"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Risk Per Trade */}
                    <div className="input-group">
                        <label>
                            <Shield size={14} />
                            Risk Per Trade
                        </label>
                        <div className="pills-row">
                            {RISK_PRESETS.map((r) => (
                                <button
                                    key={r}
                                    className={`pill-btn ${riskPercent === String(r) ? 'active' : ''}`}
                                    onClick={() => setRiskPercent(String(r))}
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={riskPercent}
                                onChange={(e) => setRiskPercent(e.target.value)}
                                placeholder=""
                                id="risk-percent"
                                step="0.1"
                                min="0.1"
                                max="100"
                             onFocus={(e) => e.target.select()} />
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
                                id="entry-price"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Stop-Loss Price */}
                    <div className="input-group">
                        <label>
                            <Target size={14} />
                            Stop-Loss Price
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={stopLoss}
                                onChange={(e) => setStopLoss(e.target.value)}
                                placeholder=""
                                id="stop-loss-price"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Take-Profit Price (Optional) */}
                    <div className="input-group">
                        <label>
                            <TrendingUp size={14} />
                            Take-Profit Price (optional)
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={takeProfit}
                                onChange={(e) => setTakeProfit(e.target.value)}
                                placeholder=""
                                id="take-profit-price"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
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
                                id="leverage-input"
                                step="1"
                                min="1"
                                max="125"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Exchange Fee */}
                    <div className="input-group">
                        <label>Exchange Fee (per side)</label>
                        <div className="pills-row">
                            {EXCHANGE_FEE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${exchangeFee === preset ? 'active' : ''}`}
                                    onClick={() => setExchangeFee(preset)}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={exchangeFee}
                                onChange={(e) => setExchangeFee(e.target.value)}
                                placeholder=""
                                id="exchange-fee"
                                step="0.01"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">Use balance, entry, and fee presets for faster setup. Auto-calculates as you type.</span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* High Leverage Warning */}
                            {highLeverage && (
                                <div className="leverage-warning">
                                    <AlertTriangle size={16} />
                                    <span>{getUiString(lang, 'High leverage')} ({lev}x) {getUiString(lang, 'significantly increases liquidation risk. Consider reducing leverage.')}</span>
                                </div>
                            )}

                            {/* Main Result */}
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Recommended Position Size')}
                                </span>
                                <span className="result-hero-value">
                                    <Shield size={28} />
                                    {formatUSD(results.positionSize)}
                                </span>
                                <span className="result-hero-roi profit">
                                    {formatCoins(results.numberOfCoins)} {selectedCoin ? selectedCoin.symbol.toUpperCase() : getUiString(lang, 'coins')}
                                </span>
                            </div>

                            {/* Risk Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Risk Amount')}</span>
                                    <span className="result-value">{formatUSD(results.riskAmount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Risk of Balance')}</span>
                                    <span className="result-value">{formatPercent(results.riskPercent)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'SL Distance')}</span>
                                    <span className="result-value">{formatUSD(results.slDistance)} ({formatPercent(results.slDistancePercent)})</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Max Loss at SL')}</span>
                                    <span className="result-value fee">{formatUSD(results.riskAmount)}</span>
                                </div>

                                {lev > 1 && (
                                    <>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Leveraged Position')}</span>
                                            <span className="result-value">{formatUSD(results.leveragedPosition)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Required Margin')}</span>
                                            <span className="result-value">{formatUSD(results.requiredMargin)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">
                                                {getUiString(lang, 'Est. Liquidation Price')}
                                            </span>
                                            <span className="result-value fee">
                                                {formatUSD(results.liquidationPrice)}
                                            </span>
                                        </div>
                                    </>
                                )}

                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Est. Trading Fees')}</span>
                                    <span className="result-value fee">{formatUSD(results.totalFees)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Effective Risk (incl. fees)')}</strong>
                                    </span>
                                    <span className="result-value fee">
                                        <strong>{formatUSD(results.effectiveRisk)}</strong>
                                    </span>
                                </div>

                                {rr !== null && (
                                    <>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label">
                                                <strong>{getUiString(lang, 'Risk : Reward')}</strong>
                                            </span>
                                            <span className={`result-value ${rr >= 2 ? 'profit' : rr >= 1 ? '' : 'fee'}`}>
                                                <strong>1 : {rr.toFixed(2)}</strong>
                                            </span>
                                        </div>
                                        <div className="rr-bar">
                                            <div
                                                className="rr-bar-risk"
                                                style={{ flex: 1 }}
                                            />
                                            <div
                                                className="rr-bar-reward"
                                                style={{ flex: Math.min(rr, 10) }}
                                            />
                                        </div>
                                        <div className="rr-labels">
                                            <span className="rr-label-risk">{getUiString(lang, 'Risk')}</span>
                                            <span className="rr-label-reward">{getUiString(lang, 'Reward')} ({rr.toFixed(1)}x)</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Always use proper risk management and never risk more than you can afford to lose.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Shield size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Calculate Your Position Size')}</h3>
                            <p>{getUiString(lang, 'Enter your account balance, risk %, entry price, and stop-loss to see the optimal position size.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
