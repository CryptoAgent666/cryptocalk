import { getUiString } from '../i18n/ui-strings';
import { useState, useEffect, useRef } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Shield,
    Layers,
    TrendingUp,
    AlertTriangle,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const SCENARIOS = [
    {
        label: 'Conservative 1 AVS',
        ethStaked: '10',
        baseApy: '3.2',
        restakingApy: '2',
        avsCount: '1',
        avsRewardRate: '1.5',
        protocolFee: '10',
    },
    {
        label: 'Balanced 3 AVS',
        ethStaked: '32',
        baseApy: '3.2',
        restakingApy: '3.5',
        avsCount: '3',
        avsRewardRate: '2',
        protocolFee: '10',
    },
    {
        label: 'Aggressive 5 AVS',
        ethStaked: '32',
        baseApy: '3.2',
        restakingApy: '5',
        avsCount: '5',
        avsRewardRate: '3',
        protocolFee: '10',
    },
] as const;

const ETH_PILLS = ['1', '5', '10', '32', '100'];

function RestakingCalculator({ lang = 'en' }: { lang?: string }) {
    const [ethStaked, setEthStaked] = useState('32');
    const [baseApy, setBaseApy] = useState('3.2');
    const [restakingApy, setRestakingApy] = useState('3.5');
    const [avsCount, setAvsCount] = useState('3');
    const [avsRewardRate, setAvsRewardRate] = useState('2');
    const [protocolFee, setProtocolFee] = useState('10');
    const [ethPrice, setEthPrice] = useState('');
    const [fetchingPrice, setFetchingPrice] = useState(false);
    const [priceError, setPriceError] = useState('');
    const fetchedRef = useRef(false);

    const CG_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || 'REMOVED_COINGECKO_KEY';

    // Auto-fetch ETH price on mount
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        (async () => {
            setFetchingPrice(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`);
                if (!res.ok) throw new Error('fetch failed');
                const data = await res.json();
                if (data.ethereum?.usd) setEthPrice(String(data.ethereum.usd));
            } catch {
                setPriceError(getUiString(lang, 'Failed to fetch price. Please enter manually.'));
            }
            setFetchingPrice(false);
        })();
    }, []);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setEthStaked(s.ethStaked);
        setBaseApy(s.baseApy);
        setRestakingApy(s.restakingApy);
        setAvsCount(s.avsCount);
        setAvsRewardRate(s.avsRewardRate);
        setProtocolFee(s.protocolFee);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        ethStaked === s.ethStaked && baseApy === s.baseApy && restakingApy === s.restakingApy &&
        avsCount === s.avsCount && avsRewardRate === s.avsRewardRate && protocolFee === s.protocolFee;

    // Calculations
    const staked = parseFloat(ethStaked) || 0;
    const base = (parseFloat(baseApy) || 0) / 100;
    const restake = (parseFloat(restakingApy) || 0) / 100;
    const avs = parseFloat(avsCount) || 0;
    const avsRate = (parseFloat(avsRewardRate) || 0) / 100;
    const fee = (parseFloat(protocolFee) || 0) / 100;
    const price = parseFloat(ethPrice) || 0;

    const hasInputs = staked > 0 && base > 0;

    // Native staking only
    const nativeApy = base;
    const nativeAnnualEth = staked * nativeApy;
    const nativeAnnualUsd = nativeAnnualEth * price;

    // AVS rewards
    const totalAvsApy = avs * avsRate;

    // Combined restaking APY (base + restaking boost + AVS rewards) minus protocol fee on the extra yield
    const grossExtraApy = restake + totalAvsApy;
    const netExtraApy = grossExtraApy * (1 - fee);
    const combinedApy = nativeApy + netExtraApy;

    const annualEth = staked * combinedApy;
    const annualUsd = annualEth * price;
    const additionalEth = annualEth - nativeAnnualEth;
    const additionalUsd = additionalEth * price;

    // Slashing risk indicator (simplified: more AVS = higher risk)
    const riskLevel = avs <= 1 ? getUiString(lang, 'Low')
        : avs <= 3 ? getUiString(lang, 'Medium')
        : avs <= 5 ? getUiString(lang, 'High')
        : getUiString(lang, 'Very High');
    const riskColor = avs <= 1 ? 'var(--color-accent-green)'
        : avs <= 3 ? '#f59e0b'
        : '#ef4444';

    const reset = () => {
        setEthStaked('32'); setBaseApy('3.2'); setRestakingApy('3.5');
        setAvsCount('3'); setAvsRewardRate('2'); setProtocolFee('10');
        setEthPrice(''); setPriceError(''); fetchedRef.current = false;
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n) || price <= 0) return '\u2014';
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const formatEth = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        if (n >= 1) return n.toFixed(4);
        return n.toFixed(6);
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}>
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-staked"><Layers size={14} /> {getUiString(lang, 'ETH Staked')}</label>
                        <div className="pills-row">
                            {ETH_PILLS.map((v) => (
                                <button key={v} className={`pill-btn ${ethStaked === v ? 'active' : ''}`}
                                    onClick={() => setEthStaked(v)}>{v} ETH</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={ethStaked} onChange={(e) => setEthStaked(e.target.value)}
                            id="rst-staked" step="any" min="0" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-base-apy"><Percent size={14} /> {getUiString(lang, 'Base Staking APY (%)')}</label>
                        <div className="pills-row">
                            {['2.5', '3.0', '3.2', '3.5', '4.0'].map((v) => (
                                <button key={v} className={`pill-btn ${baseApy === v ? 'active' : ''}`}
                                    onClick={() => setBaseApy(v)}>{v}%</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={baseApy} onChange={(e) => setBaseApy(e.target.value)}
                            id="rst-base-apy" step="0.1" min="0" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-restaking-apy"><Percent size={14} /> {getUiString(lang, 'Restaking Boost APY (%)')}</label>
                        <div className="pills-row">
                            {['1', '2', '3', '4', '5'].map((v) => (
                                <button key={v} className={`pill-btn ${restakingApy === v ? 'active' : ''}`}
                                    onClick={() => setRestakingApy(v)}>{v}%</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={restakingApy} onChange={(e) => setRestakingApy(e.target.value)}
                            id="rst-restaking-apy" step="0.1" min="0" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-avs"><Shield size={14} /> {getUiString(lang, 'Number of AVS Secured')}</label>
                        <div className="pills-row">
                            {['1', '2', '3', '5', '10'].map((v) => (
                                <button key={v} className={`pill-btn ${avsCount === v ? 'active' : ''}`}
                                    onClick={() => setAvsCount(v)}>{v}</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={avsCount} onChange={(e) => setAvsCount(e.target.value)}
                            id="rst-avs" step="1" min="1" max="10" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-avs-rate"><Percent size={14} /> {getUiString(lang, 'AVS Reward Rate (%)')}</label>
                        <input type="number" inputMode="decimal" value={avsRewardRate} onChange={(e) => setAvsRewardRate(e.target.value)}
                            id="rst-avs-rate" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-fee"><Percent size={14} /> {getUiString(lang, 'Protocol Fee (%)')}</label>
                        <div className="pills-row">
                            {['5', '10', '15', '20'].map((v) => (
                                <button key={v} className={`pill-btn ${protocolFee === v ? 'active' : ''}`}
                                    onClick={() => setProtocolFee(v)}>{v}%</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={protocolFee} onChange={(e) => setProtocolFee(e.target.value)}
                            id="rst-fee" step="1" min="0" max="100" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="rst-price">
                            <DollarSign size={14} /> {getUiString(lang, 'ETH Price ($)')}
                            {fetchingPrice && <span className="label-hint">{getUiString(lang, 'Fetching...')}</span>}
                            {price > 0 && !fetchingPrice && <span className="label-hint">{getUiString(lang, 'Auto-fetched')}</span>}
                        </label>
                        <input type="number" inputMode="decimal" value={ethPrice} onChange={(e) => setEthPrice(e.target.value)}
                            id="rst-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                        {priceError && <span className="input-hint" style={{ color: '#f97316' }}>{priceError}</span>}
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. ETH price fetched from CoinGecko. Adjust AVS count to see risk/reward tradeoffs.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Total Combined APY')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <TrendingUp size={28} />
                                    {(combinedApy * 100).toFixed(2)}%
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                                    {getUiString(lang, 'vs')} {(nativeApy * 100).toFixed(2)}% {getUiString(lang, 'native staking')}
                                </span>
                            </div>

                            {/* Comparison grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                                <div style={{
                                    padding: '12px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {getUiString(lang, 'Native Staking')}
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700 }}>{formatEth(nativeAnnualEth)} ETH</div>
                                    {price > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{formatUSD(nativeAnnualUsd)}/{getUiString(lang, 'year')}</div>}
                                </div>
                                <div style={{
                                    padding: '12px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-accent-green)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-green)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {getUiString(lang, 'With Restaking')}
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>{formatEth(annualEth)} ETH</div>
                                    {price > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-green)' }}>{formatUSD(annualUsd)}/{getUiString(lang, 'year')}</div>}
                                </div>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Base Staking APY')}</span>
                                    <span className="result-value">{(nativeApy * 100).toFixed(2)}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Restaking Boost')}</span>
                                    <span className="result-value profit">+{(restake * 100).toFixed(2)}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'AVS Rewards')} ({avs} AVS)</span>
                                    <span className="result-value profit">+{(totalAvsApy * 100).toFixed(2)}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Protocol Fee')}</span>
                                    <span className="result-value fee">-{(fee * 100).toFixed(1)}% {getUiString(lang, 'on extra yield')}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Annual ETH Earned')}</strong></span>
                                    <span className="result-value profit"><strong>{formatEth(annualEth)} ETH</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Additional from Restaking')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatEth(additionalEth)} ETH</strong></span>
                                </div>
                                {price > 0 && (
                                    <div className="result-row">
                                        <span className="result-label"><strong>{getUiString(lang, 'Annual USD Earned')}</strong></span>
                                        <span className="result-value profit"><strong>{formatUSD(annualUsd)}</strong></span>
                                    </div>
                                )}
                            </div>

                            {/* Slashing Risk */}
                            <div style={{
                                padding: '12px 16px', background: 'var(--color-bg-card)',
                                border: `1px solid ${riskColor}`, borderRadius: '10px', marginTop: '8px',
                                display: 'flex', gap: '10px', alignItems: 'center',
                            }}>
                                <AlertTriangle size={18} style={{ flexShrink: 0, color: riskColor }} />
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: riskColor }}>
                                        {getUiString(lang, 'Slashing Risk')}: {riskLevel}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                        {getUiString(lang, 'More AVS secured increases yield but also slashing exposure if any AVS misbehaves.')}
                                    </div>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Restaking yields are variable and depend on AVS demand. Slashing risks are real. This is not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Layers size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Restaking Yield')}</h3>
                            <p>{getUiString(lang, 'Enter your ETH staking details to compare native staking vs restaking with AVS rewards.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(RestakingCalculator);
