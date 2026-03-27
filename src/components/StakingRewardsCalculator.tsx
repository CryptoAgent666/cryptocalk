import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Search,
    X,
    TrendingUp,
    Calendar,
    Coins,
    Lock,
    Zap,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

// APY & price defaults updated 2026-03-18.
const POPULAR_STAKES = [
    { name: 'Ethereum', symbol: 'ETH', apy: 3.2, id: 'ethereum' },
    { name: 'Solana', symbol: 'SOL', apy: 7.0, id: 'solana' },
    { name: 'Cardano', symbol: 'ADA', apy: 3.2, id: 'cardano' },
    { name: 'Polkadot', symbol: 'DOT', apy: 11.0, id: 'polkadot' },
    { name: 'Cosmos', symbol: 'ATOM', apy: 13.0, id: 'cosmos' },
    { name: 'Avalanche', symbol: 'AVAX', apy: 8.5, id: 'avalanche-2' },
];

const PERIOD_PRESETS = [30, 90, 180, 365, 730, 1095];
const STAKING_AMOUNT_PRESETS = ['500', '1000', '2500', '5000', '10000'];
const STAKING_SCENARIOS = [
    {
        label: 'ETH Conservative',
        stakingAmount: '1000',
        tokenPrice: '2327',
        stakingApy: '3.2',
        validatorFee: '5',
        stakingDays: '365',
        autoCompound: true,
    },
    {
        label: 'SOL Growth',
        stakingAmount: '2500',
        tokenPrice: '95',
        stakingApy: '7',
        validatorFee: '5',
        stakingDays: '365',
        autoCompound: true,
    },
    {
        label: 'High APY 180d',
        stakingAmount: '5000',
        tokenPrice: '10',
        stakingApy: '15',
        validatorFee: '8',
        stakingDays: '180',
        autoCompound: false,
    },
] as const;

function StakingRewardsCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [stakingAmount, setStakingAmount] = useState('1000');
    const [tokenPrice, setTokenPrice] = useState('');
    const [stakingApy, setStakingApy] = useState('7');
    const [validatorFee, setValidatorFee] = useState('5');
    const [stakingDays, setStakingDays] = useState('365');
    const [autoCompound, setAutoCompound] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const CG_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || 'REMOVED_COINGECKO_KEY';

    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setLoading(true);
        setSearchError('');
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=${CG_KEY}`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSuggestions((data.coins || []).slice(0, 8).map((c: { id: string; name: string; symbol: string; thumb: string }) => ({
                id: c.id, name: c.name, symbol: c.symbol, thumb: c.thumb,
            })));
            setShowSuggestions(true);
        } catch {
            setSuggestions([]);
            setSearchError(getUiString(lang, 'Failed to search coins. Please try again.'));
        }
        setLoading(false);
    }, [lang]);

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
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`);
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            if (data[coin.id]?.usd) setTokenPrice(String(data[coin.id].usd));
        } catch {
            setSearchError(getUiString(lang, 'Failed to fetch price. Please enter manually.'));
        }
        // Auto-fill APY from popular stakes
        const known = POPULAR_STAKES.find(s => s.id === coin.id);
        if (known) setStakingApy(String(known.apy));
    };

    const clearCoin = () => { setSelectedCoin(null); setCoinSearch(''); setSuggestions([]); setTokenPrice(''); };
    const applyScenario = (scenario: (typeof STAKING_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setStakingAmount(scenario.stakingAmount);
        setTokenPrice(scenario.tokenPrice);
        setStakingApy(scenario.stakingApy);
        setValidatorFee(scenario.validatorFee);
        setStakingDays(scenario.stakingDays);
        setAutoCompound(scenario.autoCompound);
    };
    const isScenarioActive = (scenario: (typeof STAKING_SCENARIOS)[number]) => (
        stakingAmount === scenario.stakingAmount
        && tokenPrice === scenario.tokenPrice
        && stakingApy === scenario.stakingApy
        && validatorFee === scenario.validatorFee
        && stakingDays === scenario.stakingDays
        && autoCompound === scenario.autoCompound
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
    const amount = parseFloat(stakingAmount) || 0;
    const price = parseFloat(tokenPrice) || 0;
    const apy = (parseFloat(stakingApy) || 0) / 100;
    const fee = (parseFloat(validatorFee) || 0) / 100;
    const days = parseFloat(stakingDays) || 365;
    const years = days / 365;

    const hasInputs = amount > 0 && apy > 0;

    const effectiveApy = apy * (1 - fee);
    const tokenAmount = price > 0 ? amount / price : 0;

    // With auto-compound (daily)
    let finalValueCompound = amount;
    if (autoCompound) {
        finalValueCompound = amount * Math.pow(1 + effectiveApy / 365, days);
    } else {
        finalValueCompound = amount * (1 + effectiveApy * years);
    }
    const rewardsEarned = finalValueCompound - amount;
    const tokensEarned = price > 0 ? rewardsEarned / price : 0;
    const effectiveROI = amount > 0 ? (rewardsEarned / amount) * 100 : 0;

    // Daily, monthly, yearly earnings
    const dailyReward = amount * effectiveApy / 365;
    const weeklyReward = dailyReward * 7;
    const monthlyReward = dailyReward * 30.44;
    const yearlyReward = amount * effectiveApy;

    // Fee cost: fee is applied to the gross rewards (before fee deduction)
    // Gross rewards = what you'd earn at full APY, then fee takes a cut
    const grossRewards = autoCompound
        ? amount * Math.pow(1 + apy / 365, days) - amount
        : amount * apy * years;
    const totalFees = grossRewards * fee;

    // Monthly breakdown (first 12 months or full period)
    const monthlyBreakdown: { month: number; balance: number; rewards: number; cumRewards: number }[] = [];
    let runBal = amount;
    let cumRewards = 0;
    const months = Math.min(Math.ceil(days / 30.44), 36);
    for (let m = 1; m <= months; m++) {
        const daysInMonth = 30.44;
        let monthReward: number;
        if (autoCompound) {
            const newBal = runBal * Math.pow(1 + effectiveApy / 365, daysInMonth);
            monthReward = newBal - runBal;
            runBal = newBal;
        } else {
            monthReward = amount * effectiveApy / 12;
            runBal += monthReward;
        }
        cumRewards += monthReward;
        monthlyBreakdown.push({ month: m, balance: runBal, rewards: monthReward, cumRewards });
    }

    const reset = () => {
        setStakingAmount('1000'); setTokenPrice(''); setStakingApy('7');
        setValidatorFee('5'); setStakingDays('365'); setAutoCompound(true); clearCoin();
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatTokens = (n: number) => {
        if (n >= 1000) return n.toFixed(2);
        if (n >= 1) return n.toFixed(4);
        return n.toFixed(6);
    };

    const sym = selectedCoin ? selectedCoin.symbol.toUpperCase() : '';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {STAKING_SCENARIOS.map((scenario) => (
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

                    {/* Quick Select */}
                    <div className="input-group">
                        <label><Zap size={14} /> {getUiString(lang, 'Quick Select')}</label>
                        <div className="pills-row">
                            {POPULAR_STAKES.map((s) => (
                                <button key={s.id}
                                    className={`pill-btn ${selectedCoin?.id === s.id ? 'active' : ''}`}
                                    onClick={() => selectCoin({ id: s.id, name: s.name, symbol: s.symbol })}>
                                    {s.symbol} ({s.apy}%)
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Search */}
                    <div className="input-group" ref={suggestionsRef}>
                        <label htmlFor="stk-coin-search"><Search size={14} /> {getUiString(lang, 'Or search any coin')}</label>
                        <div className="coin-search-wrapper">
                            <input type="text" value={coinSearch} onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder={getUiString(lang, 'Search coin...')} id="stk-coin-search" />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear"><X size={14} /></button>
                            )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
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
                        {loading && (
                            <span className="input-hint">{getUiString(lang, 'Searching coins...')}</span>
                        )}
                        {searchError && <span className="input-hint" style={{ color: '#f97316' }}>{searchError}</span>}
                    </div>

                    {/* Amount */}
                    <div className="input-group">
                        <label htmlFor="stk-amount"><DollarSign size={14} /> {getUiString(lang, 'Staking Amount (USD)')}</label>
                        <div className="pills-row">
                            {STAKING_AMOUNT_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${stakingAmount === value ? 'active' : ''}`}
                                    onClick={() => setStakingAmount(value)}
                                >
                                    ${Number(value).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={stakingAmount} onChange={(e) => setStakingAmount(e.target.value)}
                                placeholder="" id="stk-amount" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                        {tokenAmount > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>≈ {formatTokens(tokenAmount)} {sym}</span>}
                    </div>

                    {/* Token Price */}
                    {selectedCoin && (
                        <div className="input-group">
                            <label htmlFor="stk-price"><Coins size={14} /> {getUiString(lang, 'Token Price')}</label>
                            <div className="input-with-prefix">
                                <input type="number" inputMode="decimal" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)}
                                    placeholder={getUiString(lang, 'Auto')} id="stk-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                            </div>
                        </div>
                    )}

                    {/* APY */}
                    <div className="input-group">
                        <label htmlFor="stk-apy"><Percent size={14} /> {getUiString(lang, 'Staking APY')}</label>
                        <div className="pills-row">
                            {[3, 5, 7, 10, 15, 20].map((a) => (
                                <button key={a} className={`pill-btn ${stakingApy === String(a) ? 'active' : ''}`}
                                    onClick={() => setStakingApy(String(a))}>
                                    {a}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={stakingApy} onChange={(e) => setStakingApy(e.target.value)}
                                placeholder="" id="stk-apy" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Validator Fee */}
                    <div className="input-group">
                        <label htmlFor="stk-fee"><Lock size={14} /> {getUiString(lang, 'Validator Commission')}</label>
                        <div className="pills-row">
                            {[0, 2, 5, 8, 10].map((f) => (
                                <button key={f} className={`pill-btn ${validatorFee === String(f) ? 'active' : ''}`}
                                    onClick={() => setValidatorFee(String(f))}>
                                    {f}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={validatorFee} onChange={(e) => setValidatorFee(e.target.value)}
                                placeholder="" id="stk-fee" step="1" min="0" max="100" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Staking Period */}
                    <div className="input-group">
                        <label htmlFor="stk-days"><Calendar size={14} /> {getUiString(lang, 'Staking Period')}</label>
                        <div className="pills-row">
                            {PERIOD_PRESETS.map((d) => (
                                <button key={d} className={`pill-btn ${stakingDays === String(d) ? 'active' : ''}`}
                                    onClick={() => setStakingDays(String(d))}>
                                    {d >= 365 ? `${(d / 365).toFixed(0)}y` : `${d}d`}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={stakingDays} onChange={(e) => setStakingDays(e.target.value)}
                                placeholder="" id="stk-days" step="1" min="1" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Auto-compound toggle */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Auto-Compound')}</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${autoCompound ? 'active' : ''}`} onClick={() => setAutoCompound(true)}>
                                <TrendingUp size={14} /> {getUiString(lang, 'Yes (daily)')}
                            </button>
                            <button className={`toggle-btn ${!autoCompound ? 'active' : ''}`} onClick={() => setAutoCompound(false)}>
                                {getUiString(lang, 'No (simple)')}
                            </button>
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Start with a quick coin preset, then compare auto-compound vs simple rewards.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Total After')} {days >= 365 ? `${(days / 365).toFixed(1)} ${getUiString(lang, 'Years')}` : `${days} ${getUiString(lang, 'Days')}`}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <Coins size={28} />
                                    {formatUSD(finalValueCompound)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                    +{formatUSD(rewardsEarned)} {getUiString(lang, 'rewards')} ({effectiveROI.toFixed(2)}%)
                                    {tokensEarned > 0 && ` ≈ ${formatTokens(tokensEarned)} ${sym}`}
                                </span>
                            </div>

                            {/* Earnings Grid */}
                            <div className="staking-metrics-grid">
                                {[
                                    { label: getUiString(lang, 'Daily'), val: dailyReward },
                                    { label: getUiString(lang, 'Weekly'), val: weeklyReward },
                                    { label: getUiString(lang, 'Monthly'), val: monthlyReward },
                                    { label: getUiString(lang, 'Yearly'), val: yearlyReward },
                                ].map((e) => (
                                    <div key={e.label} style={{
                                        padding: '10px 8px', background: 'var(--color-bg-card)',
                                        border: '1px solid var(--color-border)', borderRadius: '10px', textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{e.label}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>+{formatUSD(e.val)}</div>
                                        {price > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{formatTokens(e.val / price)} {sym}</div>}
                                    </div>
                                ))}
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Staked Amount')}</span>
                                    <span className="result-value">{formatUSD(amount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Staking APY')}</span>
                                    <span className="result-value">{stakingApy}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Validator Commission')}</span>
                                    <span className="result-value fee">{validatorFee}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective APY')}</span>
                                    <span className="result-value profit">{(effectiveApy * 100).toFixed(2)}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Compounding')}</span>
                                    <span className="result-value">{autoCompound ? getUiString(lang, 'Daily (365×/yr)') : getUiString(lang, 'None (simple)')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Staking Period')}</span>
                                    <span className="result-value">{days} {getUiString(lang, 'days')} ({years.toFixed(1)} {getUiString(lang, 'years')})</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Rewards Earned')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatUSD(rewardsEarned)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Fees Paid to Validator')}</span>
                                    <span className="result-value fee">−{formatUSD(totalFees)}</span>
                                </div>
                            </div>

                            {/* Monthly Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Monthly Earnings Breakdown')}
                                </h4>
                                <div style={{ overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-bg)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Month')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Reward')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cumulative')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthlyBreakdown.map((row) => (
                                                <tr key={row.month} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 500 }}>{row.month}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)' }}>+{formatUSD(row.rewards)}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 500 }}>+{formatUSD(row.cumRewards)}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)' }}>{formatUSD(row.balance)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Staking yields vary over time. APY shown is an estimate. Validator commissions and unbonding periods may apply.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Coins size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Staking Rewards')}</h3>
                            <p>{getUiString(lang, 'Select a coin or enter staking details to see daily, weekly, monthly, and yearly rewards with compound growth.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(StakingRewardsCalculator);
