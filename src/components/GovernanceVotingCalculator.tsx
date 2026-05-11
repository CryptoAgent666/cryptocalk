import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    RotateCcw,
    Info,
    Vote,
    Users,
    Percent,
    DollarSign,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    votingPowerPct: number;
    tokensForProposal: number;
    tokensForQuorum: number;
    quorumDollarValue: number;
    canSubmitProposal: boolean;
    canBlockQuorum: boolean;
}

const SCENARIOS = [
    {
        label: 'Small DAO',
        totalSupply: '10000000',
        holdings: '50000',
        tokenPrice: '0.50',
        quorumPct: '10',
        proposalThreshold: '10000',
    },
    {
        label: 'Mid-Cap DAO',
        totalSupply: '100000000',
        holdings: '100000',
        tokenPrice: '2.50',
        quorumPct: '5',
        proposalThreshold: '250000',
    },
    {
        label: 'Large DAO (Uniswap-scale)',
        totalSupply: '1000000000',
        holdings: '10000',
        tokenPrice: '7.50',
        quorumPct: '4',
        proposalThreshold: '2500000',
    },
] as const;

function GovernanceVotingCalculator({ lang = 'en' }: { lang?: string }) {
    const [totalSupply, setTotalSupply] = useState('1000000000');
    const [holdings, setHoldings] = useState('10000');
    const [tokenPrice, setTokenPrice] = useState('1');
    const [quorumPct, setQuorumPct] = useState('4');
    const [proposalThreshold, setProposalThreshold] = useState('100000');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setTotalSupply(s.totalSupply);
        setHoldings(s.holdings);
        setTokenPrice(s.tokenPrice);
        setQuorumPct(s.quorumPct);
        setProposalThreshold(s.proposalThreshold);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        totalSupply === s.totalSupply &&
        holdings === s.holdings &&
        tokenPrice === s.tokenPrice &&
        quorumPct === s.quorumPct &&
        proposalThreshold === s.proposalThreshold;

    const results = useMemo<Results | null>(() => {
        const supply = parseFloat(totalSupply) || 0;
        const hold = parseFloat(holdings) || 0;
        const price = parseFloat(tokenPrice) || 0;
        const quorum = parseFloat(quorumPct) || 0;
        const threshold = parseFloat(proposalThreshold) || 0;

        if (supply <= 0 || hold < 0 || price < 0 || quorum < 0) return null;

        const votingPowerPct = supply > 0 ? (hold / supply) * 100 : 0;
        const tokensForQuorum = (quorum / 100) * supply;
        const quorumDollarValue = tokensForQuorum * price;
        const canSubmitProposal = hold >= threshold;
        // Can block quorum if your holdings exceed (100% - quorum%) of supply
        // i.e., without your votes, quorum cannot be reached
        const canBlockQuorum = hold > supply - tokensForQuorum;

        return {
            votingPowerPct,
            tokensForProposal: threshold,
            tokensForQuorum,
            quorumDollarValue,
            canSubmitProposal,
            canBlockQuorum,
        };
    }, [totalSupply, holdings, tokenPrice, quorumPct, proposalThreshold]);

    const reset = () => {
        setTotalSupply('1000000000');
        setHoldings('10000');
        setTokenPrice('1');
        setQuorumPct('4');
        setProposalThreshold('100000');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatNumber = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            maximumFractionDigits: 0,
        }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return n < 0.001 && n > 0 ? '<0.001%' : `${n.toFixed(4)}%`;
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button
                                    key={s.label}
                                    className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}
                                >
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="gov-total-supply">
                            <Users size={14} /> {getUiString(lang, 'Total Token Supply')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={totalSupply}
                            onChange={(e) => setTotalSupply(e.target.value)}
                            id="gov-total-supply"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gov-holdings">
                            <Vote size={14} /> {getUiString(lang, 'Your Token Holdings')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={holdings}
                            onChange={(e) => setHoldings(e.target.value)}
                            id="gov-holdings"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gov-token-price">
                            <DollarSign size={14} /> {getUiString(lang, 'Current Token Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={tokenPrice}
                            onChange={(e) => setTokenPrice(e.target.value)}
                            id="gov-token-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gov-quorum">
                            <Percent size={14} /> {getUiString(lang, 'Quorum Requirement (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={quorumPct}
                            onChange={(e) => setQuorumPct(e.target.value)}
                            id="gov-quorum"
                            step="0.1"
                            min="0"
                            max="100"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gov-proposal-threshold">
                            <Vote size={14} /> {getUiString(lang, 'Proposal Threshold (tokens)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={proposalThreshold}
                            onChange={(e) => setProposalThreshold(e.target.value)}
                            id="gov-proposal-threshold"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Analyze your voting power and governance influence in any DAO.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Your Voting Power')}
                                </span>
                                <span className="result-hero-value">
                                    <Vote size={28} />
                                    {formatPercent(results.votingPowerPct)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tokens Needed for Proposal')}</span>
                                    <span className="result-value">{formatNumber(results.tokensForProposal)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tokens Needed for Quorum')}</span>
                                    <span className="result-value">{formatNumber(results.tokensForQuorum)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Dollar Value of Quorum')}</span>
                                    <span className="result-value">{formatUSD(results.quorumDollarValue)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Can You Submit Proposal?')}</strong>
                                    </span>
                                    <span className={`result-value ${results.canSubmitProposal ? 'profit' : 'fee'}`}>
                                        {results.canSubmitProposal ? (
                                            <><CheckCircle size={16} /> {getUiString(lang, 'Yes')}</>
                                        ) : (
                                            <><XCircle size={16} /> {getUiString(lang, 'No')}</>
                                        )}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Can You Block Quorum Alone?')}</strong>
                                    </span>
                                    <span className={`result-value ${results.canBlockQuorum ? 'profit' : 'fee'}`}>
                                        {results.canBlockQuorum ? (
                                            <><CheckCircle size={16} /> {getUiString(lang, 'Yes')}</>
                                        ) : (
                                            <><XCircle size={16} /> {getUiString(lang, 'No')}</>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Governance power may also depend on delegation, vote-escrowed tokens, and quorum participation rates. This is a simplified model.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Vote size={40} /></div>
                            <h2>{getUiString(lang, 'Analyze Governance Power')}</h2>
                            <p>{getUiString(lang, 'Enter your token holdings and DAO parameters to evaluate your voting influence.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(GovernanceVotingCalculator);
