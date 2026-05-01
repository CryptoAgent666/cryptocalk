import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
    Search,
    DollarSign,
    Coins,
    TrendingUp,
    TrendingDown,
    Info,
    RotateCcw,
    X,
    Loader2,
    Globe,
    Gift,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface TaxCountry {
    label: string;
    incomeTaxRate: number;
    capitalGainsRate: number;
    note: string;
}

const TAX_COUNTRIES: Record<string, TaxCountry> = {
    usa: { label: 'USA', incomeTaxRate: 37, capitalGainsRate: 20, note: 'Max federal bracket (37% income, 20% LTCG)' },
    uk: { label: 'UK', incomeTaxRate: 20, capitalGainsRate: 20, note: '20% higher rate for income & CGT' },
    germany: { label: 'Germany', incomeTaxRate: 45, capitalGainsRate: 0, note: '0% capital gains if held >1yr, else income tax' },
    australia: { label: 'Australia', incomeTaxRate: 45, capitalGainsRate: 22.5, note: 'Max 45% income; 50% CGT discount if held >12mo' },
    canada: { label: 'Canada', incomeTaxRate: 33, capitalGainsRate: 16.5, note: '50% inclusion rate on capital gains' },
};

const HISTORICAL_AIRDROPS = [
    { name: 'UNI', date: 'Sep 2020', avgTokens: '400 UNI', athValue: '$17,600' },
    { name: 'ENS', date: 'Nov 2021', avgTokens: '200 ENS', athValue: '$16,000' },
    { name: 'ARB', date: 'Mar 2023', avgTokens: '1,250 ARB', athValue: '$2,500' },
    { name: 'OP', date: 'Jun 2022', avgTokens: '1,000 OP', athValue: '$4,000' },
    { name: 'JUP', date: 'Jan 2024', avgTokens: '500 JUP', athValue: '$1,000' },
    { name: 'STRK', date: 'Feb 2024', avgTokens: '800 STRK', athValue: '$2,400' },
];

const TOKEN_AMOUNT_PILLS = ['100', '400', '1000', '2500'];
const RECEIPT_PRICE_PILLS = ['0.5', '1', '5', '10'];
const CURRENT_PRICE_PILLS = ['1', '5', '10', '20'];
const SELL_PRICE_PILLS = ['2', '8', '15', '25'];
const AIRDROP_SCENARIOS = [
    { label: 'Early Claim', tokenAmount: '400', priceAtReceipt: '1', currentPrice: '5', sold: false, sellPrice: '', taxCountry: 'usa' },
    { label: 'Sold Winner', tokenAmount: '1000', priceAtReceipt: '0.5', currentPrice: '10', sold: true, sellPrice: '8', taxCountry: 'usa' },
    { label: 'Underwater Bag', tokenAmount: '2500', priceAtReceipt: '10', currentPrice: '2', sold: false, sellPrice: '', taxCountry: 'germany' },
] as const;

function AirdropCalculator({ lang = 'en' }: { lang?: string }) {
    // Coin search state
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [fetchingPrice, setFetchingPrice] = useState(false);
    const [searchError, setSearchError] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
    const CG_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || '';

    // Input state
    const [tokenAmount, setTokenAmount] = useState('');
    const [priceAtReceipt, setPriceAtReceipt] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [sold, setSold] = useState(false);
    const [sellPrice, setSellPrice] = useState('');
    const [taxCountry, setTaxCountry] = useState('usa');

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

    // Debounced coin search
    const searchCoins = useCallback((query: string) => {
        setSearchQuery(query);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (query.length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        searchTimeout.current = setTimeout(async () => {
            try {
                setSearchError('');
                const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=${CG_KEY}`);
                if (!res.ok) throw new Error('Search failed');
                const data = await res.json();
                setSuggestions((data.coins || []).slice(0, 8).map((c: { id: string; name: string; symbol: string; thumb: string }) => ({
                    id: c.id,
                    name: c.name,
                    symbol: c.symbol,
                    thumb: c.thumb,
                })));
                setShowDropdown(true);
            } catch {
                setSuggestions([]);
                setSearchError(getUiString(lang, 'Failed to search. Check your connection and try again.'));
            }
        }, 300);
    }, []);

    // Select coin and fetch current price
    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setSearchQuery(coin.name);
        setShowDropdown(false);
        setFetchingPrice(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`
            );
            if (res.ok) {
                const data = await res.json();
                const price = data[coin.id]?.usd;
                if (price !== undefined) {
                    setCurrentPrice(String(price));
                }
            }
        } catch {
            setSearchError(getUiString(lang, 'Failed to fetch price. You can enter it manually.'));
        }
        setFetchingPrice(false);
    };

    const clearCoin = () => {
        setSelectedCoin(null);
        setSearchQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setCurrentPrice('');
    };
    const applyScenario = (scenario: (typeof AIRDROP_SCENARIOS)[number]) => {
        setSelectedCoin(null);
        setSearchQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setTokenAmount(scenario.tokenAmount);
        setPriceAtReceipt(scenario.priceAtReceipt);
        setCurrentPrice(scenario.currentPrice);
        setSold(scenario.sold);
        setSellPrice(scenario.sellPrice);
        setTaxCountry(scenario.taxCountry);
    };
    const isScenarioActive = (scenario: (typeof AIRDROP_SCENARIOS)[number]) => (
        tokenAmount === scenario.tokenAmount
        && priceAtReceipt === scenario.priceAtReceipt
        && currentPrice === scenario.currentPrice
        && sold === scenario.sold
        && taxCountry === scenario.taxCountry
        && (scenario.sold ? sellPrice === scenario.sellPrice : true)
    );

    // Calculations
    const taxConfig = TAX_COUNTRIES[taxCountry];

    const results = useMemo(() => {
        const amount = parseFloat(tokenAmount);
        const receiptPrice = parseFloat(priceAtReceipt);
        const curPrice = parseFloat(currentPrice);
        const solPrice = parseFloat(sellPrice);

        if (isNaN(amount) || amount <= 0 || isNaN(receiptPrice) || receiptPrice <= 0) {
            return null;
        }

        const valueAtReceipt = amount * receiptPrice;

        // Use sell price if sold, otherwise current price
        const effectivePrice = sold ? (isNaN(solPrice) ? 0 : solPrice) : (isNaN(curPrice) ? 0 : curPrice);
        if (effectivePrice <= 0) return null;

        const currentValue = amount * effectivePrice;
        const profitLoss = currentValue - valueAtReceipt;
        const profitPct = (profitLoss / valueAtReceipt) * 100;

        // Tax on receipt (airdrop treated as income)
        const incomeTax = valueAtReceipt * (taxConfig.incomeTaxRate / 100);

        // Capital gains tax (only if sold at profit)
        let capitalGains = 0;
        let capitalGainsTax = 0;
        if (sold && profitLoss > 0) {
            capitalGains = profitLoss;
            capitalGainsTax = capitalGains * (taxConfig.capitalGainsRate / 100);
        }

        const totalTax = incomeTax + capitalGainsTax;
        const netValue = currentValue - totalTax;

        return {
            amount,
            valueAtReceipt,
            currentValue,
            profitLoss,
            profitPct,
            incomeTax,
            capitalGains,
            capitalGainsTax,
            totalTax,
            netValue,
            effectivePrice,
        };
    }, [tokenAmount, priceAtReceipt, currentPrice, sellPrice, sold, taxConfig]);

    const reset = () => {
        clearCoin();
        setTokenAmount('');
        setPriceAtReceipt('');
        setCurrentPrice('');
        setSold(false);
        setSellPrice('');
        setTaxCountry('usa');
    };

    const formatUSD = (n: number) =>
        '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const isProfit = results ? results.profitLoss >= 0 : true;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* ===== Left: Input Panel ===== */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {AIRDROP_SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.label}
                                    className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                                    onClick={() => applyScenario(scenario)}
                                >
                                    {getUiString(lang, scenario.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Search */}
                    <div className="input-group" ref={dropdownRef}>
                        <label>
                            <Search size={14} />
                            {getUiString(lang, 'Airdrop Token')}
                            <span className="label-hint">{getUiString(lang, 'Search or enter manually')}</span>
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => searchCoins(e.target.value)}
                                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                                placeholder={getUiString(lang, 'Search coin (e.g. Uniswap)...')}
                                id="airdrop-coin-search"
                            />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showDropdown && suggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectCoin(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt={coin.name} width={20} height={20} loading="lazy" />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {fetchingPrice && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Loader2 size={12} className="spin" /> {getUiString(lang, 'Fetching price...')}
                            </div>
                        )}
                        {searchError && <span className="input-hint" style={{ color: '#f97316' }}>{searchError}</span>}
                    </div>

                    {/* Token Amount */}
                    <div className="input-group">
                        <label>
                            <Coins size={14} />
                            {getUiString(lang, 'Tokens Received')}
                        </label>
                        <div className="pills-row">
                            {TOKEN_AMOUNT_PILLS.map((amount) => (
                                <button
                                    key={amount}
                                    className={`pill-btn ${tokenAmount === amount ? 'active' : ''}`}
                                    onClick={() => setTokenAmount(amount)}
                                >
                                    {Number(amount).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tokenAmount}
                                onChange={(e) => setTokenAmount(e.target.value)}
                                placeholder=""
                                id="airdrop-amount"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Price at Receipt */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Price at Receipt ($)')}
                            <span className="label-hint">{getUiString(lang, 'When you received the airdrop')}</span>
                        </label>
                        <div className="pills-row">
                            {RECEIPT_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${priceAtReceipt === price ? 'active' : ''}`}
                                    onClick={() => setPriceAtReceipt(price)}
                                >
                                    ${price}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={priceAtReceipt}
                                onChange={(e) => setPriceAtReceipt(e.target.value)}
                                placeholder=""
                                id="airdrop-receipt-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Current Token Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Current Token Price ($)')}
                            <span className="label-hint">{getUiString(lang, 'Auto-filled if coin selected')}</span>
                        </label>
                        <div className="pills-row">
                            {CURRENT_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${currentPrice === price ? 'active' : ''}`}
                                    onClick={() => setCurrentPrice(price)}
                                >
                                    ${price}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                placeholder=""
                                id="airdrop-current-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Sold Toggle */}
                    <div className="input-group">
                        <label>
                            {getUiString(lang, 'Sold?')}
                        </label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${!sold ? 'active' : ''}`}
                                onClick={() => setSold(false)}
                            >
                                {getUiString(lang, 'No')}
                            </button>
                            <button
                                className={`toggle-btn ${sold ? 'active' : ''}`}
                                onClick={() => setSold(true)}
                            >
                                {getUiString(lang, 'Yes')}
                            </button>
                        </div>
                    </div>

                    {/* Sell Price (conditional) */}
                    {sold && (
                        <div className="input-group">
                            <label>
                                <DollarSign size={14} />
                                {getUiString(lang, 'Sell Price ($)')}
                            </label>
                            <div className="pills-row">
                                {SELL_PRICE_PILLS.map((price) => (
                                    <button
                                        key={price}
                                        className={`pill-btn ${sellPrice === price ? 'active' : ''}`}
                                        onClick={() => setSellPrice(price)}
                                    >
                                        ${price}
                                    </button>
                                ))}
                            </div>
                            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                                <input
                                    type="number" inputMode="decimal"
                                    value={sellPrice}
                                    onChange={(e) => setSellPrice(e.target.value)}
                                    placeholder=""
                                    id="airdrop-sell-price"
                                    step="any"
                                    min="0"
                                    onFocus={(e) => e.target.select()} />
                            </div>
                        </div>
                    )}

                    {/* Tax Country */}
                    <div className="input-group">
                        <label>
                            <Globe size={14} />
                            {getUiString(lang, 'Tax Jurisdiction')}
                        </label>
                        <div className="pills-row">
                            {Object.entries(TAX_COUNTRIES).map(([key, c]) => (
                                <button
                                    key={key}
                                    className={`pill-btn ${taxCountry === key ? 'active' : ''}`}
                                    onClick={() => setTaxCountry(key)}
                                    title={c.note}
                                >
                                    {getUiString(lang, c.label)}
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {getUiString(lang, taxConfig.note)}
                        </p>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Start with receipt and current price presets for a quick tax scenario.')}
                    </span>
                </div>

                {/* ===== Right: Results Panel ===== */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Hero */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {sold ? getUiString(lang, 'Sold Value') : getUiString(lang, 'Current Value')}
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {formatUSD(results.currentValue)}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'fee'}`}>
                                    {isProfit ? '+' : '-'}{formatUSD(results.profitLoss)} ({isProfit ? '+' : ''}{results.profitPct.toFixed(1)}%)
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tokens Received')}</span>
                                    <span className="result-value">
                                        {results.amount.toLocaleString('en-US')} {selectedCoin ? selectedCoin.symbol.toUpperCase() : 'tokens'}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Value at Receipt')}</span>
                                    <span className="result-value">{formatUSD(results.valueAtReceipt)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{sold ? getUiString(lang, 'Sold Value') : getUiString(lang, 'Current Value')}</span>
                                    <span className="result-value">{formatUSD(results.currentValue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{sold ? getUiString(lang, 'Realized P&L') : getUiString(lang, 'Unrealized P&L')}</span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'fee'}`}>
                                        {isProfit ? '+' : '-'}{formatUSD(results.profitLoss)} ({isProfit ? '+' : ''}{results.profitPct.toFixed(1)}%)
                                    </span>
                                </div>

                                <div className="result-divider" />

                                {/* Tax Section */}
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Income Tax on Airdrop')} ({taxConfig.incomeTaxRate}%)</span>
                                    <span className="result-value fee">{formatUSD(results.incomeTax)}</span>
                                </div>
                                {sold && results.capitalGains > 0 && (
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Capital Gains Tax')} ({taxConfig.capitalGainsRate}%)</span>
                                        <span className="result-value fee">{formatUSD(results.capitalGainsTax)}</span>
                                    </div>
                                )}
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Tax Liability')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(results.totalTax)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net Value After Tax')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(results.netValue)}</strong></span>
                                </div>
                            </div>

                            {/* Historical Airdrops Reference Table */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label">
                                        <strong>
                                            <Gift size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {getUiString(lang, 'Notable Airdrops')}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Airdrop')}</th>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Date')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Avg Tokens')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'ATH Value')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {HISTORICAL_AIRDROPS.map((a) => (
                                                <tr key={a.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 600 }}>{a.name}</td>
                                                    <td style={{ padding: '8px', color: 'var(--color-text-muted)' }}>{a.date}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right' }}>{a.avgTokens}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green, #10b981)', fontWeight: 500 }}>{a.athValue}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Tax rates are approximate. Consult a tax professional.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Gift size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Airdrop Value Calculator')}</h3>
                            <p>
                                {getUiString(lang, 'Enter your airdrop details to calculate current value, profit/loss, and estimated tax liability across different jurisdictions.')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(AirdropCalculator);
