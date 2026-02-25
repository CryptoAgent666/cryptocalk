import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    TrendingDown,
    ArrowUpDown,
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    ChevronDown,
    Search,
    X,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    current_price?: number;
    thumb?: string;
}

interface Results {
    totalInvested: number;
    totalReturn: number;
    profitLoss: number;
    roi: number;
    entryFeeAmount: number;
    exitFeeAmount: number;
    totalFees: number;
    effectiveBuyPrice: number;
    effectiveSellPrice: number;
}

const BUY_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const SELL_PRICE_PILLS = ['1000', '30000', '65000', '100000'];
const INVESTMENT_PILLS = ['100', '500', '1000', '5000'];
const QUANTITY_PILLS = ['0.01', '0.1', '1', '5'];
const FEE_PILLS = ['0.05', '0.1', '0.2', '0.5'];
const PROFIT_SCENARIOS = [
    {
        label: 'BTC Long +20%',
        buyPrice: '50000',
        sellPrice: '60000',
        inputMode: 'investment' as const,
        investmentAmount: '1000',
        quantity: '',
        entryFee: '0.1',
        exitFee: '0.1',
        isShort: false,
    },
    {
        label: 'ETH Short',
        buyPrice: '3500',
        sellPrice: '3000',
        inputMode: 'investment' as const,
        investmentAmount: '5000',
        quantity: '',
        entryFee: '0.1',
        exitFee: '0.1',
        isShort: true,
    },
    {
        label: 'SOL Qty Trade',
        buyPrice: '100',
        sellPrice: '130',
        inputMode: 'quantity' as const,
        investmentAmount: '',
        quantity: '10',
        entryFee: '0.05',
        exitFee: '0.05',
        isShort: false,
    },
] as const;

export default function ProfitCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [inputMode, setInputMode] = useState<'quantity' | 'investment'>('investment');
    const [entryFee, setEntryFee] = useState('0.1');
    const [exitFee, setExitFee] = useState('0.1');
    const [isShort, setIsShort] = useState(false);
    const [showFees, setShowFees] = useState(false);
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
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
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

    // Handle coin search input
    const handleCoinSearch = (value: string) => {
        setCoinSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(value), 400);
    };

    // Select a coin and fetch its price
    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[coin.id]?.usd;
            if (price) {
                setSellPrice(String(price));
            }
        } catch {
            // Silently fail
        }
    };

    // Clear coin selection
    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
    };
    const applyScenario = (scenario: (typeof PROFIT_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setBuyPrice(scenario.buyPrice);
        setSellPrice(scenario.sellPrice);
        setInputMode(scenario.inputMode);
        setInvestmentAmount(scenario.investmentAmount);
        setQuantity(scenario.quantity);
        setEntryFee(scenario.entryFee);
        setExitFee(scenario.exitFee);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof PROFIT_SCENARIOS)[number]) => (
        buyPrice === scenario.buyPrice
        && sellPrice === scenario.sellPrice
        && inputMode === scenario.inputMode
        && investmentAmount === scenario.investmentAmount
        && quantity === scenario.quantity
        && entryFee === scenario.entryFee
        && exitFee === scenario.exitFee
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
        const buy = parseFloat(buyPrice);
        const sell = parseFloat(sellPrice);
        const entryFeePercent = parseFloat(entryFee) || 0;
        const exitFeePercent = parseFloat(exitFee) || 0;

        if (isNaN(buy) || isNaN(sell) || buy <= 0) {
            setResults(null);
            return;
        }

        let qty: number;
        let totalInvested: number;

        if (inputMode === 'investment') {
            const inv = parseFloat(investmentAmount);
            if (isNaN(inv) || inv <= 0) {
                setResults(null);
                return;
            }
            totalInvested = inv;
            qty = inv / buy;
        } else {
            qty = parseFloat(quantity);
            if (isNaN(qty) || qty <= 0) {
                setResults(null);
                return;
            }
            totalInvested = qty * buy;
        }

        const entryFeeAmount = totalInvested * (entryFeePercent / 100);
        const grossReturn = isShort
            ? qty * (buy - sell) + totalInvested
            : qty * sell;
        const exitFeeAmount = Math.abs(grossReturn) * (exitFeePercent / 100);
        const totalReturn = grossReturn - exitFeeAmount;
        const totalCost = totalInvested + entryFeeAmount;
        const profitLoss = totalReturn - totalCost;
        const roi = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;
        const totalFees = entryFeeAmount + exitFeeAmount;

        setResults({
            totalInvested: totalCost,
            totalReturn,
            profitLoss,
            roi,
            entryFeeAmount,
            exitFeeAmount,
            totalFees,
            effectiveBuyPrice: buy * (1 + entryFeePercent / 100),
            effectiveSellPrice: sell * (1 - exitFeePercent / 100),
        });
    }, [buyPrice, sellPrice, quantity, investmentAmount, inputMode, entryFee, exitFee, isShort]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setBuyPrice('');
        setSellPrice('');
        setQuantity('');
        setInvestmentAmount('');
        setEntryFee('0.1');
        setExitFee('0.1');
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

    const formatPercent = (n: number) =>
        `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    const isProfit = results ? results.profitLoss >= 0 : true;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {PROFIT_SCENARIOS.map((scenario) => (
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
                                id="coin-search"
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

                    {/* Buy Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {isShort ? 'Entry Price (Sell)' : 'Buy Price'}
                        </label>
                        <div className="pills-row">
                            {BUY_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${buyPrice === price ? 'active' : ''}`}
                                    onClick={() => setBuyPrice(price)}
                                >
                                    ${Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                placeholder=""
                                id="buy-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Sell Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {isShort ? 'Exit Price (Buy)' : 'Sell / Current Price'}
                            {selectedCoin && (
                                <span className="label-hint">Auto-filled</span>
                            )}
                        </label>
                        <div className="pills-row">
                            {SELL_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${sellPrice === price ? 'active' : ''}`}
                                    onClick={() => setSellPrice(price)}
                                >
                                    ${Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                placeholder=""
                                id="sell-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Quantity / Investment Toggle */}
                    <div className="input-group">
                        <label>Amount</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${inputMode === 'investment' ? 'active' : ''}`}
                                onClick={() => setInputMode('investment')}
                            >
                                <DollarSign size={14} />
                                Investment ($)
                            </button>
                            <button
                                className={`toggle-btn ${inputMode === 'quantity' ? 'active' : ''}`}
                                onClick={() => setInputMode('quantity')}
                            >
                                Quantity
                            </button>
                        </div>
                        <div className="pills-row">
                            {(inputMode === 'investment' ? INVESTMENT_PILLS : QUANTITY_PILLS).map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${(inputMode === 'investment' ? investmentAmount : quantity) === value ? 'active' : ''}`}
                                    onClick={() =>
                                        inputMode === 'investment'
                                            ? setInvestmentAmount(value)
                                            : setQuantity(value)
                                    }
                                >
                                    {inputMode === 'investment'
                                        ? `$${Number(value).toLocaleString('en-US')}`
                                        : value}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={inputMode === 'investment' ? investmentAmount : quantity}
                                onChange={(e) =>
                                    inputMode === 'investment'
                                        ? setInvestmentAmount(e.target.value)
                                        : setQuantity(e.target.value)
                                }
                                placeholder=""
                                id="amount-input"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Fees Toggle */}
                    <button
                        className="fees-toggle"
                        onClick={() => setShowFees(!showFees)}
                    >
                        <Percent size={14} />
                        Trading Fees
                        <ChevronDown
                            size={14}
                            style={{ transform: showFees ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        />
                    </button>

                    {showFees && (
                        <div className="fees-panel">
                            <div className="fees-row">
                                <div className="input-group compact">
                                    <label>Entry Fee (%)</label>
                                    <div className="pills-row">
                                        {FEE_PILLS.map((fee) => (
                                            <button
                                                key={`entry-${fee}`}
                                                className={`pill-btn ${entryFee === fee ? 'active' : ''}`}
                                                onClick={() => setEntryFee(fee)}
                                            >
                                                {fee}%
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number" inputMode="decimal"
                                        value={entryFee}
                                        onChange={(e) => setEntryFee(e.target.value)}
                                        placeholder=""
                                        id="entry-fee"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                                <div className="input-group compact">
                                    <label>Exit Fee (%)</label>
                                    <div className="pills-row">
                                        {FEE_PILLS.map((fee) => (
                                            <button
                                                key={`exit-${fee}`}
                                                className={`pill-btn ${exitFee === fee ? 'active' : ''}`}
                                                onClick={() => setExitFee(fee)}
                                            >
                                                {fee}%
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number" inputMode="decimal"
                                        value={exitFee}
                                        onChange={(e) => setExitFee(e.target.value)}
                                        placeholder=""
                                        id="exit-fee"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {results && (
                        <div className={`live-summary ${isProfit ? 'profit' : 'loss'}`}>
                            <span>{getUiString(lang, 'Live estimate')}</span>
                            <strong>
                                {isProfit ? '+' : '-'}
                                {formatUSD(Math.abs(results.profitLoss))} ({formatPercent(results.roi)})
                            </strong>
                        </div>
                    )}

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Choose amount mode first, then use presets for faster setup.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Main Result */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {isProfit ? 'Profit' : 'Loss'}
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {formatUSD(Math.abs(results.profitLoss))}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
                                    {formatPercent(results.roi)} ROI
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Invested')}</span>
                                    <span className="result-value">{formatUSD(results.totalInvested)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Return')}</span>
                                    <span className="result-value">{formatUSD(results.totalReturn)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.entryFeeAmount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Exit Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.exitFeeAmount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Total Fees')}</strong>
                                    </span>
                                    <span className="result-value fee">
                                        <strong>{formatUSD(results.totalFees)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Buy Price')}</span>
                                    <span className="result-value">{formatUSD(results.effectiveBuyPrice)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Sell Price')}</span>
                                    <span className="result-value">{formatUSD(results.effectiveSellPrice)}</span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Actual results may vary due to market conditions and additional fees.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <ArrowUpDown size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Enter Your Trade Details')}</h3>
                            <p>{getUiString(lang, 'Fill in the buy price, sell price, and amount to see your profit or loss.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
