import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Shield,
    Users,
    ChevronDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    taxOwed: number;
    netEstate: number;
    perBeneficiary: number;
    custodyRecommendation: string;
    multiSigSuggestion: string;
    effectiveTaxRate: number;
}

type CustodyMethod = 'Exchange' | 'Hardware Wallet' | 'Multi-sig';

const CUSTODY_METHODS: CustodyMethod[] = ['Exchange', 'Hardware Wallet', 'Multi-sig'];

const SCENARIOS = [
    {
        label: 'Small Estate $50K',
        totalValue: '50000', beneficiaries: '2', taxRate: '0',
        hasWill: true, custodyMethod: 'Exchange' as CustodyMethod,
    },
    {
        label: 'Medium $500K',
        totalValue: '500000', beneficiaries: '3', taxRate: '40',
        hasWill: true, custodyMethod: 'Hardware Wallet' as CustodyMethod,
    },
    {
        label: 'Large $2M',
        totalValue: '2000000', beneficiaries: '4', taxRate: '40',
        hasWill: true, custodyMethod: 'Multi-sig' as CustodyMethod,
    },
] as const;

function getCustodyRecommendation(method: CustodyMethod, totalValue: number, lang: string): string {
    if (totalValue > 1000000) {
        if (method === 'Exchange') {
            return getUiString(lang, 'High-value estates should avoid exchange custody. Consider multi-sig or institutional custody.');
        }
        if (method === 'Hardware Wallet') {
            return getUiString(lang, 'Hardware wallet is good but consider multi-sig for estates over $1M to eliminate single points of failure.');
        }
        return getUiString(lang, 'Multi-sig is recommended for high-value estates. Use a 2-of-3 or 3-of-5 setup with keys distributed to trusted parties.');
    }
    if (totalValue > 100000) {
        if (method === 'Exchange') {
            return getUiString(lang, 'Consider moving to a hardware wallet for better security and inheritance planning.');
        }
        return getUiString(lang, 'Good choice. Ensure backup seed phrases are stored securely and documented in your estate plan.');
    }
    return getUiString(lang, 'For smaller estates, ensure beneficiaries know how to access the crypto. Document wallet details securely.');
}

function getMultiSigSuggestion(totalValue: number, beneficiaries: number, lang: string): string {
    if (totalValue > 1000000) {
        return getUiString(lang, 'Recommended: 3-of-5 multi-sig. Give 1 key to estate attorney, 1 to each primary beneficiary, remainder to trusted backup.');
    }
    if (totalValue > 100000) {
        return getUiString(lang, 'Recommended: 2-of-3 multi-sig. One key with you, one with a trusted family member, one with an attorney.');
    }
    return getUiString(lang, 'A simple hardware wallet with documented seed phrase in a sealed envelope with your will may suffice.');
}

function CryptoInheritanceCalculator({ lang = 'en' }: { lang?: string }) {
    const loc = lang === 'en' ? 'en-US' : lang;
    const [totalValue, setTotalValue] = useState('');
    const [beneficiaries, setBeneficiaries] = useState('2');
    const [taxRate, setTaxRate] = useState('40');
    const [hasWill, setHasWill] = useState(true);
    const [custodyMethod, setCustodyMethod] = useState<CustodyMethod>('Hardware Wallet');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setTotalValue(s.totalValue);
        setBeneficiaries(s.beneficiaries);
        setTaxRate(s.taxRate);
        setHasWill(s.hasWill);
        setCustodyMethod(s.custodyMethod);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        totalValue === s.totalValue && beneficiaries === s.beneficiaries &&
        taxRate === s.taxRate && hasWill === s.hasWill && custodyMethod === s.custodyMethod;

    const calculate = useCallback(() => {
        const value = parseFloat(totalValue) || 0;
        const numBeneficiaries = parseInt(beneficiaries, 10) || 1;
        const rate = parseFloat(taxRate) || 0;
        if (value <= 0) { setResults(null); return; }

        const taxOwed = value * (rate / 100);
        const netEstate = value - taxOwed;
        const perBeneficiary = numBeneficiaries > 0 ? netEstate / numBeneficiaries : 0;
        const effectiveTaxRate = value > 0 ? (taxOwed / value) * 100 : 0;
        const custodyRecommendation = getCustodyRecommendation(custodyMethod, value, lang);
        const multiSigSuggestion = getMultiSigSuggestion(value, numBeneficiaries, lang);

        setResults({ taxOwed, netEstate, perBeneficiary, custodyRecommendation, multiSigSuggestion, effectiveTaxRate });
    }, [totalValue, beneficiaries, taxRate, hasWill, custodyMethod, lang]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setTotalValue(''); setBeneficiaries('2'); setTaxRate('40');
        setHasWill(true); setCustodyMethod('Hardware Wallet'); setResults(null);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
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
                        <label htmlFor="inherit-value"><DollarSign size={14} /> {getUiString(lang, 'Total Crypto Value ($)')}</label>
                        <input type="number" inputMode="decimal" value={totalValue} onChange={(e) => setTotalValue(e.target.value)}
                            id="inherit-value" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inherit-beneficiaries"><Users size={14} /> {getUiString(lang, 'Number of Beneficiaries')}</label>
                        <input type="number" inputMode="numeric" value={beneficiaries} onChange={(e) => setBeneficiaries(e.target.value)}
                            id="inherit-beneficiaries" step="1" min="1" max="20" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inherit-tax"><Percent size={14} /> {getUiString(lang, 'Estate Tax Rate (%)')}</label>
                        <input type="number" inputMode="decimal" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
                            id="inherit-tax" step="0.1" min="0" max="100" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label>{getUiString(lang, 'Has Will / Estate Plan')}</label>
                        <div className="pills-row">
                            <button className={`pill-btn ${hasWill ? 'active' : ''}`}
                                onClick={() => setHasWill(true)}>
                                {getUiString(lang, 'Yes')}
                            </button>
                            <button className={`pill-btn ${!hasWill ? 'active' : ''}`}
                                onClick={() => setHasWill(false)}>
                                {getUiString(lang, 'No')}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="inherit-custody"><ChevronDown size={14} /> {getUiString(lang, 'Custody Method')}</label>
                        <select id="inherit-custody" value={custodyMethod}
                            onChange={(e) => setCustodyMethod(e.target.value as CustodyMethod)}>
                            {CUSTODY_METHODS.map((m) => (
                                <option key={m} value={m}>{getUiString(lang, m)}</option>
                            ))}
                        </select>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Plan your crypto estate transfer and inheritance.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Net Inheritance per Beneficiary')}
                                </span>
                                <span className="result-hero-value">
                                    <Shield size={28} />
                                    {formatUSD(results.perBeneficiary)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Estate Value')}</span>
                                    <span className="result-value">{formatUSD(parseFloat(totalValue) || 0)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Estate Tax Owed')}</span>
                                    <span className="result-value fee">{formatUSD(results.taxOwed)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Tax Rate')}</span>
                                    <span className="result-value">{results.effectiveTaxRate.toFixed(1)}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net Estate')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(results.netEstate)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Beneficiaries')}</span>
                                    <span className="result-value">{beneficiaries}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Per Beneficiary')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(results.perBeneficiary)}</strong></span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Estate Plan')}</span>
                                    <span className="result-value">
                                        {hasWill ? getUiString(lang, 'Will in place') : getUiString(lang, 'No will \u2014 intestacy rules apply')}
                                    </span>
                                </div>
                            </div>

                            <div className="result-breakdown" style={{ marginTop: '1rem' }}>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Custody Recommendation')}</strong></span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', padding: '0 0.5rem', margin: '0.25rem 0' }}>
                                    {results.custodyRecommendation}
                                </p>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Multi-Sig Setup')}</strong></span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', padding: '0 0.5rem', margin: '0.25rem 0' }}>
                                    {results.multiSigSuggestion}
                                </p>
                            </div>

                            {!hasWill && (
                                <p className="calc-disclaimer" style={{ color: 'var(--color-loss, #ef4444)' }}>
                                    <Info size={12} />
                                    {getUiString(lang, 'Without a will, crypto assets may be subject to intestacy laws which vary by jurisdiction. Create an estate plan to protect your beneficiaries.')}
                                </p>
                            )}

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Estate tax rules vary by country and estate size. US estates under $12.92M are generally exempt. Consult an estate attorney for personalized advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Shield size={40} /></div>
                            <h2>{getUiString(lang, 'Plan Crypto Inheritance')}</h2>
                            <p>{getUiString(lang, 'Enter your crypto estate details to estimate taxes, per-beneficiary amounts, and get custody recommendations.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CryptoInheritanceCalculator);
