import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Search,
    TrendingUp,
    TrendingDown,
    Loader2,
    RefreshCw,
} from 'lucide-react';

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
    current_price?: number;
    price_change_percentage_24h?: number;
}

const POPULAR_CRYPTOS: CoinData[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
];

const FIAT_CURRENCIES = [
    { id: 'usd', name: 'US Dollar', symbol: 'USD', flag: '🇺🇸' },
    { id: 'eur', name: 'Euro', symbol: 'EUR', flag: '🇪🇺' },
    { id: 'gbp', name: 'British Pound', symbol: 'GBP', flag: '🇬🇧' },
    { id: 'jpy', name: 'Japanese Yen', symbol: 'JPY', flag: '🇯🇵' },
    { id: 'aud', name: 'Australian Dollar', symbol: 'AUD', flag: '🇦🇺' },
    { id: 'cad', name: 'Canadian Dollar', symbol: 'CAD', flag: '🇨🇦' },
    { id: 'brl', name: 'Brazilian Real', symbol: 'BRL', flag: '🇧🇷' },
    { id: 'try', name: 'Turkish Lira', symbol: 'TRY', flag: '🇹🇷' },
    { id: 'inr', name: 'Indian Rupee', symbol: 'INR', flag: '🇮🇳' },
    { id: 'rub', name: 'Russian Ruble', symbol: 'RUB', flag: '🇷🇺' },
];

const QUICK_PAIRS = [
    { from: 'bitcoin', to: 'usd', label: 'BTC → USD' },
    { from: 'ethereum', to: 'usd', label: 'ETH → USD' },
    { from: 'solana', to: 'usd', label: 'SOL → USD' },
    { from: 'bitcoin', to: 'eur', label: 'BTC → EUR' },
    { from: 'ripple', to: 'usd', label: 'XRP → USD' },
    { from: 'dogecoin', to: 'usd', label: 'DOGE → USD' },
];

export default function CryptoConverter() {
    // State
    const [amount, setAmount] = useState('1');
    const [fromCoin, setFromCoin] = useState<CoinData>(POPULAR_CRYPTOS[0]);
    const [toCurrency, setToCurrency] = useState(FIAT_CURRENCIES[0]);
    const [searchFrom, setSearchFrom] = useState('');
    const [searchResults, setSearchResults] = useState<CoinData[]>([]);
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    const [conversionRate, setConversionRate] = useState<number | null>(null);
    const [change24h, setChange24h] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fromRef = useRef<HTMLDivElement>(null);
    const toRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
                setShowFromDropdown(false);
            }
            if (toRef.current && !toRef.current.contains(e.target as Node)) {
                setShowToDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Fetch conversion rate
    const fetchRate = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin.id}&vs_currencies=${toCurrency.id}&include_24hr_change=true&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const coinData = data[fromCoin.id];
            if (coinData) {
                setConversionRate(coinData[toCurrency.id] ?? null);
                setChange24h(coinData[`${toCurrency.id}_24h_change`] ?? null);
                setLastUpdated(new Date());
            }
        } catch {
            setConversionRate(null);
        }
        setLoading(false);
    }, [fromCoin.id, toCurrency.id]);

    // Fetch rate on coin/currency change
    useEffect(() => {
        fetchRate();
    }, [fetchRate]);

    // Search crypto
    const searchCrypto = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSearchResults(POPULAR_CRYPTOS);
            return;
        }
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
            );
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSearchResults(
                (data.coins || []).slice(0, 10).map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    symbol: c.symbol,
                    thumb: c.thumb,
                }))
            );
        } catch {
            setSearchResults([]);
        }
    }, []);

    const handleSearchFrom = (value: string) => {
        setSearchFrom(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCrypto(value), 350);
    };

    const selectFromCoin = (coin: CoinData) => {
        setFromCoin(coin);
        setSearchFrom('');
        setShowFromDropdown(false);
    };

    const selectQuickPair = (pair: typeof QUICK_PAIRS[0]) => {
        const coin = POPULAR_CRYPTOS.find((c) => c.id === pair.from);
        const fiat = FIAT_CURRENCIES.find((f) => f.id === pair.to);
        if (coin) setFromCoin(coin);
        if (fiat) setToCurrency(fiat);
    };

    // Calculated result
    const parsedAmount = parseFloat(amount);
    const convertedAmount =
        conversionRate !== null && !isNaN(parsedAmount) ? parsedAmount * conversionRate : null;

    const formatNumber = (n: number, decimals = 2) => {
        if (n >= 1) {
            return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            }).format(n);
        }
        // For small numbers, show more decimals
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
        }).format(n);
    };

    const FIAT_SYMBOLS: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹',
        RUB: '₽', BRL: 'R$', TRY: '₺', AUD: 'A$', CAD: 'C$',
    };

    const formatFiat = (n: number) => {
        const sym = FIAT_SYMBOLS[toCurrency.symbol] ?? (toCurrency.symbol + ' ');
        return `${sym}${formatNumber(n)}`;
    };

    return (
        <div className="converter-wrapper">
            {/* Quick Pairs */}
            <div className="quick-pairs">
                {QUICK_PAIRS.map((pair) => (
                    <button
                        key={`${pair.from}-${pair.to}`}
                        className={`quick-pair-btn ${fromCoin.id === pair.from && toCurrency.id === pair.to ? 'active' : ''
                            }`}
                        onClick={() => selectQuickPair(pair)}
                    >
                        {pair.label}
                    </button>
                ))}
            </div>

            {/* Main Converter Card */}
            <div className="converter-card">
                {/* Amount Input */}
                <div className="converter-row">
                    <label className="converter-label">Amount</label>
                    <div className="converter-amount-input">
                        <input
                            type="number" inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="1"
                            id="convert-amount"
                            step="any"
                            min="0"
                        />
                    </div>
                </div>

                {/* From Selector */}
                <div className="converter-row" ref={fromRef}>
                    <label className="converter-label">From</label>
                    <button
                        className="selector-btn"
                        onClick={() => {
                            setShowFromDropdown(!showFromDropdown);
                            setShowToDropdown(false);
                            setSearchResults(POPULAR_CRYPTOS);
                        }}
                        id="from-selector"
                    >
                        {fromCoin.thumb && (
                            <img src={fromCoin.thumb} alt="" width={24} height={24} className="selector-icon" />
                        )}
                        <span className="selector-name">{fromCoin.name}</span>
                        <span className="selector-symbol">{fromCoin.symbol.toUpperCase()}</span>
                    </button>
                    {showFromDropdown && (
                        <div className="selector-dropdown">
                            <div className="selector-search">
                                <Search size={14} />
                                <input
                                    type="text"
                                    value={searchFrom}
                                    onChange={(e) => handleSearchFrom(e.target.value)}
                                    placeholder="Search cryptocurrency..."
                                    autoFocus
                                />
                            </div>
                            <div className="selector-list">
                                {searchResults.map((coin) => (
                                    <button
                                        key={coin.id}
                                        className={`selector-option ${fromCoin.id === coin.id ? 'selected' : ''}`}
                                        onClick={() => selectFromCoin(coin)}
                                    >
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="option-name">{coin.name}</span>
                                        <span className="option-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Direction Marker */}
                <div className="swap-row">
                    <div className="swap-line" />
                    <span className="swap-label">Crypto to Fiat</span>
                    <div className="swap-line" />
                </div>

                {/* To Selector */}
                <div className="converter-row" ref={toRef}>
                    <label className="converter-label">To</label>
                    <button
                        className="selector-btn"
                        onClick={() => {
                            setShowToDropdown(!showToDropdown);
                            setShowFromDropdown(false);
                        }}
                        id="to-selector"
                    >
                        <span className="selector-flag">{toCurrency.flag}</span>
                        <span className="selector-name">{toCurrency.name}</span>
                        <span className="selector-symbol">{toCurrency.symbol}</span>
                    </button>
                    {showToDropdown && (
                        <div className="selector-dropdown">
                            <div className="selector-list">
                                {FIAT_CURRENCIES.map((fiat) => (
                                    <button
                                        key={fiat.id}
                                        className={`selector-option ${toCurrency.id === fiat.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            setToCurrency(fiat);
                                            setShowToDropdown(false);
                                        }}
                                    >
                                        <span className="option-flag">{fiat.flag}</span>
                                        <span className="option-name">{fiat.name}</span>
                                        <span className="option-symbol">{fiat.symbol}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Result */}
                <div className="converter-result">
                    {loading ? (
                        <div className="converter-loading">
                            <Loader2 size={20} className="spin-icon" />
                            <span>Fetching rate...</span>
                        </div>
                    ) : convertedAmount !== null ? (
                        <>
                            <div className="result-main">
                                <span className="result-from">{formatNumber(parseFloat(amount || '0'))} {fromCoin.symbol.toUpperCase()} =</span>
                                <span className="result-to">{formatFiat(convertedAmount)}</span>
                            </div>
                            <div className="result-meta">
                                <span className="result-rate">
                                    1 {fromCoin.symbol.toUpperCase()} = {formatFiat(conversionRate!)}
                                </span>
                                {change24h !== null && (
                                    <span className={`result-change ${change24h >= 0 ? 'up' : 'down'}`}>
                                        {change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}% (24h)
                                    </span>
                                )}
                            </div>
                            <div className="result-actions">
                                <button className="refresh-btn" onClick={fetchRate} aria-label="Refresh rate">
                                    <RefreshCw size={14} />
                                    Refresh
                                </button>
                                {lastUpdated && (
                                    <span className="last-updated">
                                        Updated {lastUpdated.toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="converter-loading">
                            <span>Enter an amount to convert</span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <a
                    href="https://www.binance.com"
                    target="_blank" rel="noopener noreferrer sponsored"
                    
                    className="converter-cta"
                >
                    Buy {fromCoin.symbol.toUpperCase()} on Binance →
                </a>
            </div>

            {/* Info Cards */}
            <div className="converter-info-grid">
                <div className="info-card">
                    <h3>Real-Time Prices</h3>
                    <p>Rates powered by CoinGecko API, updated in real-time. Click Refresh for the latest price.</p>
                </div>
                <div className="info-card">
                    <h3>500+ Cryptocurrencies</h3>
                    <p>Search and convert any cryptocurrency — from Bitcoin to the latest altcoins and meme tokens.</p>
                </div>
                <div className="info-card">
                    <h3>10+ Fiat Currencies</h3>
                    <p>Convert to USD, EUR, GBP, JPY, AUD, BRL, TRY, INR, RUB, and more local currencies.</p>
                </div>
            </div>
        </div>
    );
}
