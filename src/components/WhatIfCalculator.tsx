import { useState, useCallback, useRef, useEffect } from 'react';
import {
    Search,
    Calendar,
    DollarSign,
    TrendingUp,
    Loader2,
    RotateCcw,
    Info,
    X,
    Share2,
    Sparkles,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    symbol: string;
    name: string;
    thumb?: string;
}

interface WhatIfResult {
    coinsBought: number;
    priceThen: number;
    priceNow: number;
    investedAmount: number;
    currentValue: number;
    profit: number;
    roi: number;
    coinName: string;
    coinSymbol: string;
    datePurchased: string;
    priceHistory: { date: string; value: number }[];
}

const QUICK_SCENARIOS = [
    { label: '$100 in BTC (2013)', amount: 100, coinId: 'bitcoin', coinName: 'Bitcoin', coinSymbol: 'BTC', date: '2013-01-01' },
    { label: '$1,000 in ETH (2015)', amount: 1000, coinId: 'ethereum', coinName: 'Ethereum', coinSymbol: 'ETH', date: '2015-08-07' },
    { label: '$500 in SOL (2020)', amount: 500, coinId: 'solana', coinName: 'Solana', coinSymbol: 'SOL', date: '2020-04-10' },
    { label: '$200 in BNB (2017)', amount: 200, coinId: 'binancecoin', coinName: 'BNB', coinSymbol: 'BNB', date: '2017-07-25' },
    { label: '$100 in DOGE (2019)', amount: 100, coinId: 'dogecoin', coinName: 'Dogecoin', coinSymbol: 'DOGE', date: '2019-01-01' },
    { label: '$1,000 in ADA (2017)', amount: 1000, coinId: 'cardano', coinName: 'Cardano', coinSymbol: 'ADA', date: '2017-10-01' },
];
const AMOUNT_PILLS = ['100', '500', '1000', '5000', '10000'];
const DATE_PRESET_YEARS = [1, 2, 3, 5, 10];
const EARLIEST_DATE = '2010-07-17';

export default function WhatIfCalculator() {
    const [amount, setAmount] = useState('');
    const [coinId, setCoinId] = useState('bitcoin');
    const [coinName, setCoinName] = useState('Bitcoin');
    const [coinSymbol, setCoinSymbol] = useState('BTC');
    const [date, setDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<WhatIfResult | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>();
    const maxDate = new Date().toISOString().split('T')[0];

    const formatISODate = (value: Date) => value.toISOString().split('T')[0];

    const setDateYearsAgo = (years: number) => {
        const presetDate = new Date();
        presetDate.setFullYear(presetDate.getFullYear() - years);
        const lowerBound = new Date(EARLIEST_DATE);
        const clamped = presetDate < lowerBound ? lowerBound : presetDate;
        setDate(formatISODate(clamped));
        setResult(null);
        setError('');
    };

    // Click outside to close dropdown
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Coin search
    const searchCoins = useCallback((query: string) => {
        setSearchQuery(query);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (query.length < 2) { setSuggestions([]); setShowDropdown(false); return; }
        searchTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
                if (!res.ok) throw new Error('Search failed');
                const data = await res.json();
                setSuggestions((data.coins || []).slice(0, 8));
                setShowDropdown(true);
            } catch {
                setSuggestions([]);
            }
        }, 300);
    }, []);

    const selectCoin = (coin: CoinSuggestion) => {
        setCoinId(coin.id);
        setCoinName(coin.name);
        setCoinSymbol(coin.symbol.toUpperCase());
        setSearchQuery('');
        setShowDropdown(false);
        setResult(null);
    };

    const calculate = useCallback(async (overrideAmount?: number, overrideCoinId?: string, overrideDate?: string) => {
        const amt = overrideAmount || parseFloat(amount);
        const cid = overrideCoinId || coinId;
        const dt = overrideDate || date;

        if (!amt || !cid || !dt) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Parse date parts
            const [yyyy, mm, dd] = dt.split('-');
            const dateFormatted = `${dd}-${mm}-${yyyy}`;

            // Get historical price
            const histRes = await fetch(
                `https://api.coingecko.com/api/v3/coins/${cid}/history?date=${dateFormatted}&localization=false`
            );
            if (!histRes.ok) throw new Error('Could not fetch historical price. Please try a different date.');
            const histData = await histRes.json();
            const priceThen = histData.market_data?.current_price?.usd;
            if (!priceThen) throw new Error('No price data available for this date. Try a more recent date.');

            // Get current price
            const curRes = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cid}&vs_currencies=usd`
            );
            if (!curRes.ok) throw new Error('Could not fetch current price.');
            const curData = await curRes.json();
            const priceNow = curData[cid]?.usd;
            if (!priceNow) throw new Error('Current price not available.');

            // Get price chart for the period
            const startTs = Math.floor(new Date(dt).getTime() / 1000);
            const endTs = Math.floor(Date.now() / 1000);
            const chartRes = await fetch(
                `https://api.coingecko.com/api/v3/coins/${cid}/market_chart/range?vs_currency=usd&from=${startTs}&to=${endTs}`
            );
            let priceHistory: { date: string; value: number }[] = [];
            if (chartRes.ok) {
                const chartData = await chartRes.json();
                const prices = chartData.prices || [];
                // Sample ~60 points for the chart
                const step = Math.max(1, Math.floor(prices.length / 60));
                priceHistory = prices
                    .filter((_: any, i: number) => i % step === 0 || i === prices.length - 1)
                    .map(([ts, price]: [number, number]) => ({
                        date: new Date(ts).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                        value: (amt / priceThen) * price,
                    }));
            }

            const coinsBought = amt / priceThen;
            const currentValue = coinsBought * priceNow;
            const profit = currentValue - amt;
            const roi = ((currentValue - amt) / amt) * 100;

            // Get name and symbol from the scenario or current state
            const finalName = overrideCoinId
                ? QUICK_SCENARIOS.find(s => s.coinId === overrideCoinId)?.coinName || coinName
                : coinName;
            const finalSymbol = overrideCoinId
                ? QUICK_SCENARIOS.find(s => s.coinId === overrideCoinId)?.coinSymbol || coinSymbol
                : coinSymbol;

            setResult({
                coinsBought,
                priceThen,
                priceNow,
                investedAmount: amt,
                currentValue,
                profit,
                roi,
                coinName: finalName,
                coinSymbol: finalSymbol,
                datePurchased: dt,
                priceHistory,
            });
        } catch (e: any) {
            setError(e.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }, [amount, coinId, coinName, coinSymbol, date]);

    const handleQuickScenario = (s: typeof QUICK_SCENARIOS[0]) => {
        setAmount(s.amount.toString());
        setCoinId(s.coinId);
        setCoinName(s.coinName);
        setCoinSymbol(s.coinSymbol);
        setDate(s.date);
        calculate(s.amount, s.coinId, s.date);
    };

    const reset = () => {
        setAmount('');
        setDate('');
        setResult(null);
        setError('');
    };

    const shareOnX = () => {
        if (!result) return;
        const text = `If I had invested $${result.investedAmount.toLocaleString()} in ${result.coinName} on ${new Date(result.datePurchased).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, it would be worth $${result.currentValue.toLocaleString('en-US', { maximumFractionDigits: 0 })} today! 🚀 (${result.roi >= 0 ? '+' : ''}${result.roi.toFixed(0)}% ROI)\n\nCheck yours at CryptoCalk.com`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const formatPrice = (n: number) => {
        if (n >= 1) return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        if (n >= 0.01) return `$${n.toFixed(4)}`;
        return `$${n.toFixed(8)}`;
    };

    const formatBig = (n: number) => {
        if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
        if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
        if (n >= 1000) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
        return `$${n.toFixed(2)}`;
    };

    // SVG Chart
    const renderChart = () => {
        if (!result || result.priceHistory.length < 2) return null;

        const data = result.priceHistory;
        const W = 540, H = 200, padX = 0, padY = 20;
        const values = data.map(d => d.value);
        const maxV = Math.max(...values);
        const minV = Math.min(...values);
        const range = maxV - minV || 1;

        const points = data.map((d, i) => ({
            x: padX + (i / (data.length - 1)) * (W - padX * 2),
            y: padY + (1 - (d.value - minV) / range) * (H - padY * 2),
        }));

        const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');
        const gradientPoints = `${points[0].x},${H} ${linePoints} ${points[points.length - 1].x},${H}`;
        const isPositive = result.roi >= 0;

        return (
            <div className="whatif-chart">
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="whatif-svg">
                    <defs>
                        <linearGradient id="whatifGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <polygon points={gradientPoints} fill="url(#whatifGrad)" />
                    <polyline
                        points={linePoints}
                        fill="none"
                        stroke={isPositive ? '#10b981' : '#ef4444'}
                        strokeWidth="2"
                    />
                    {/* Invested line */}
                    {(() => {
                        const investedY = padY + (1 - (result.investedAmount - minV) / range) * (H - padY * 2);
                        return (
                            <line
                                x1={padX} y1={investedY} x2={W - padX} y2={investedY}
                                stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
                            />
                        );
                    })()}
                </svg>
                <div className="chart-labels">
                    <span>{data[0].date}</span>
                    <span style={{ opacity: 0.5 }}>── invested</span>
                    <span>{data[data.length - 1].date}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="whatif-wrapper">
            <div className="whatif-grid">
                {/* Left: Inputs */}
                <div className="whatif-input-panel">
                    <p className="whatif-prompt">If I had invested...</p>

                    {/* Amount */}
                    <div className="input-group">
                        <label className="input-label">
                            <DollarSign size={14} />
                            INVESTMENT AMOUNT
                        </label>
                        <div className="pills-row">
                            {AMOUNT_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${amount === preset ? 'active' : ''}`}
                                    onClick={() => {
                                        setAmount(preset);
                                        setResult(null);
                                        setError('');
                                    }}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => { setAmount(e.target.value); setResult(null); }}
                                placeholder="1,000"
                                id="whatif-amount"
                                min="1"
                                step="any"
                            />
                        </div>
                    </div>

                    {/* Coin */}
                    <div className="input-group" ref={dropdownRef}>
                        <label className="input-label">
                            <Search size={14} />
                            IN CRYPTOCURRENCY
                        </label>
                        <div className="coin-selected">
                            <span className="coin-selected-name">{coinName} ({coinSymbol})</span>
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => searchCoins(e.target.value)}
                                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                                placeholder="Search another coin..."
                                id="whatif-coin-search"
                            />
                            {searchQuery && (
                                <button className="input-clear" onClick={() => { setSearchQuery(''); setSuggestions([]); setShowDropdown(false); }}>
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showDropdown && suggestions.length > 0 && (
                            <div className="coin-dropdown">
                                {suggestions.map(c => (
                                    <button key={c.id} className="coin-option" onClick={() => selectCoin(c)}>
                                        {c.thumb && <img src={c.thumb} alt="" width={20} height={20} />}
                                        <span className="coin-option-name">{c.name}</span>
                                        <span className="coin-option-symbol">{c.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="input-group">
                        <label className="input-label">
                            <Calendar size={14} />
                            ON DATE
                        </label>
                        <div className="pills-row">
                            {DATE_PRESET_YEARS.map((years) => {
                                const now = new Date();
                                now.setFullYear(now.getFullYear() - years);
                                const presetValue = formatISODate(now < new Date(EARLIEST_DATE) ? new Date(EARLIEST_DATE) : now);
                                return (
                                    <button
                                        key={years}
                                        className={`pill-btn ${date === presetValue ? 'active' : ''}`}
                                        onClick={() => setDateYearsAgo(years)}
                                    >
                                        {years}Y ago
                                    </button>
                                );
                            })}
                        </div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => { setDate(e.target.value); setResult(null); }}
                            max={maxDate}
                            min={EARLIEST_DATE}
                            className="date-input"
                            id="whatif-date"
                            style={{ marginTop: '8px' }}
                        />
                    </div>

                    {/* Calculate */}
                    <div className="btn-row">
                        <button className="calculate-btn" onClick={() => calculate()} disabled={loading}>
                            {loading ? <><Loader2 size={16} className="spin" /> Calculating...</> : <>
                                <Sparkles size={16} />
                                Calculate What If
                            </>}
                        </button>

                        <button className="reset-btn" onClick={reset}>
                            <RotateCcw size={14} />
                            Reset
                        </button>
                    </div>
                    <span className="input-hint">
                        Use amount and date presets for quick setup, or pick a scenario and tap Calculate What If.
                    </span>

                    {error && <p className="calc-error">{error}</p>}

                    {/* Quick Scenarios */}
                    <div className="quick-scenarios">
                        <label className="input-label">
                            ⚡ QUICK SCENARIOS
                        </label>
                        <div className="scenario-chips">
                            {QUICK_SCENARIOS.map((s, i) => (
                                <button key={i} className="scenario-chip" onClick={() => handleQuickScenario(s)}>
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Results */}
                <div className="whatif-results-panel">
                    {result ? (
                        <>
                            {/* Hero */}
                            <div className={`whatif-hero ${result.roi >= 0 ? 'gain' : 'loss'}`}>
                                <span className="whatif-hero-label">Your ${result.investedAmount.toLocaleString()} would be worth</span>
                                <span className="whatif-hero-value">{formatBig(result.currentValue)}</span>
                                <span className={`whatif-hero-roi ${result.roi >= 0 ? 'positive' : 'negative'}`}>
                                    {result.roi >= 0 ? <TrendingUp size={16} /> : null}
                                    {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(1)}% ROI
                                </span>
                            </div>

                            {/* Chart */}
                            {renderChart()}

                            {/* Stats Grid */}
                            <div className="whatif-stats">
                                <div className="whatif-stat">
                                    <span className="stat-label">Invested</span>
                                    <span className="stat-value">${result.investedAmount.toLocaleString()}</span>
                                </div>
                                <div className="whatif-stat">
                                    <span className="stat-label">Coins Bought</span>
                                    <span className="stat-value">{result.coinsBought < 1 ? result.coinsBought.toFixed(6) : result.coinsBought.toFixed(4)} {result.coinSymbol}</span>
                                </div>
                                <div className="whatif-stat">
                                    <span className="stat-label">Price Then</span>
                                    <span className="stat-value">{formatPrice(result.priceThen)}</span>
                                </div>
                                <div className="whatif-stat">
                                    <span className="stat-label">Price Now</span>
                                    <span className="stat-value">{formatPrice(result.priceNow)}</span>
                                </div>
                                <div className="whatif-stat">
                                    <span className="stat-label">{result.profit >= 0 ? 'Profit' : 'Loss'}</span>
                                    <span className={`stat-value ${result.profit >= 0 ? 'text-profit' : 'text-loss'}`}>
                                        {result.profit >= 0 ? '+' : '−'}{formatBig(Math.abs(result.profit))}
                                    </span>
                                </div>
                                <div className="whatif-stat">
                                    <span className="stat-label">Purchased On</span>
                                    <span className="stat-value">{new Date(result.datePurchased).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>

                            {/* Share */}
                            <button className="share-btn" onClick={shareOnX}>
                                <Share2 size={14} />
                                Share Result on X
                            </button>

                            {/* CTA */}
                            <a
                                href="https://www.binance.com/en/register"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="whatif-cta"
                            >
                                It's Not Too Late — Buy {result.coinSymbol} on Binance →
                            </a>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                Past performance does not guarantee future results. This is for educational purposes only.
                            </p>
                        </>
                    ) : (
                        <div className="whatif-empty">
                            <Sparkles size={40} strokeWidth={1} />
                            <h3>Travel Back in Time</h3>
                            <p>See what your investment would be worth if you had bought crypto in the past. Try a quick scenario or enter your own!</p>
                            <div className="whatif-features">
                                <span>🕰️ Historical prices</span>
                                <span>📈 Growth chart</span>
                                <span>🐦 Share on X</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
