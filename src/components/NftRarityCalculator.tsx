import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    RotateCcw,
    Info,
    Gem,
    Hash,
    Plus,
    Trash2,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Trait {
    id: number;
    name: string;
    count: string; // items with this trait
}

interface Results {
    rarityScore: number;
    statisticalRarity: number;
    rarityRankEstimate: number;
    rarityTier: string;
    traitBreakdown: { name: string; frequency: number; contribution: number }[];
}

let traitIdCounter = 5;

const SCENARIOS = [
    {
        label: 'Common (all 30%+ traits)',
        collectionSize: '10000',
        traits: [
            { id: 100, name: 'Background', count: '3500' },
            { id: 101, name: 'Body', count: '4000' },
            { id: 102, name: 'Eyes', count: '3200' },
            { id: 103, name: 'Mouth', count: '3800' },
            { id: 104, name: 'Hat', count: '3000' },
        ],
    },
    {
        label: 'Rare (one 1% trait)',
        collectionSize: '10000',
        traits: [
            { id: 200, name: 'Background', count: '2500' },
            { id: 201, name: 'Body', count: '2000' },
            { id: 202, name: 'Eyes', count: '100' },
            { id: 203, name: 'Mouth', count: '1500' },
            { id: 204, name: 'Hat', count: '2000' },
        ],
    },
    {
        label: 'Legendary (two <0.5% traits)',
        collectionSize: '10000',
        traits: [
            { id: 300, name: 'Background', count: '30' },
            { id: 301, name: 'Body', count: '1500' },
            { id: 302, name: 'Eyes', count: '40' },
            { id: 303, name: 'Mouth', count: '2000' },
            { id: 304, name: 'Hat', count: '1000' },
        ],
    },
] as const;

function getRarityTier(score: number, numTraits: number): string {
    // Normalize score by number of traits for tier calculation
    // Each trait contributes 1/frequency, so a perfectly common NFT with all 50% traits scores numTraits * 2
    const avgContribution = numTraits > 0 ? score / numTraits : 0;
    if (avgContribution >= 100) return 'Legendary';
    if (avgContribution >= 20) return 'Epic';
    if (avgContribution >= 10) return 'Rare';
    if (avgContribution >= 5) return 'Uncommon';
    return 'Common';
}

function NftRarityCalculator({ lang = 'en' }: { lang?: string }) {
    const [collectionSize, setCollectionSize] = useState('10000');
    const [traits, setTraits] = useState<Trait[]>([
        { id: 0, name: 'Background', count: '2500' },
        { id: 1, name: 'Body', count: '1500' },
        { id: 2, name: 'Eyes', count: '800' },
        { id: 3, name: 'Mouth', count: '2000' },
        { id: 4, name: 'Hat', count: '500' },
    ]);

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setCollectionSize(s.collectionSize);
        setTraits(s.traits.map((t) => ({ ...t })));
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        collectionSize === s.collectionSize &&
        traits.length === s.traits.length &&
        traits.every((t, i) => t.name === s.traits[i]?.name && t.count === String(s.traits[i]?.count));

    const updateTrait = (id: number, field: 'name' | 'count', value: string) => {
        setTraits((prev) =>
            prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        );
    };

    const addTrait = () => {
        traitIdCounter += 1;
        setTraits((prev) => [...prev, { id: traitIdCounter, name: '', count: '' }]);
    };

    const removeTrait = (id: number) => {
        setTraits((prev) => prev.filter((t) => t.id !== id));
    };

    const results = useMemo<Results | null>(() => {
        const size = parseFloat(collectionSize) || 0;
        if (size <= 0 || traits.length === 0) return null;

        const validTraits = traits.filter((t) => {
            const count = parseFloat(t.count) || 0;
            return count > 0 && count <= size;
        });

        if (validTraits.length === 0) return null;

        let rarityScore = 0;
        let statisticalRarity = 1;
        const traitBreakdown: { name: string; frequency: number; contribution: number }[] = [];

        for (const t of validTraits) {
            const count = parseFloat(t.count) || 0;
            const frequency = count / size;
            const contribution = frequency > 0 ? 1 / frequency : 0;
            rarityScore += contribution;
            statisticalRarity *= frequency;
            traitBreakdown.push({
                name: t.name || getUiString(lang, 'Unnamed Trait'),
                frequency: frequency * 100,
                contribution,
            });
        }

        // Estimate rank: percentage position in a normal distribution of rarity scores
        // Higher score = rarer = lower rank number
        const avgContribution = rarityScore / validTraits.length;
        let rankPercentile: number;
        if (avgContribution >= 100) rankPercentile = 0.001;
        else if (avgContribution >= 50) rankPercentile = 0.005;
        else if (avgContribution >= 20) rankPercentile = 0.02;
        else if (avgContribution >= 10) rankPercentile = 0.10;
        else if (avgContribution >= 5) rankPercentile = 0.30;
        else rankPercentile = 0.60;

        const rarityRankEstimate = Math.max(1, Math.round(size * rankPercentile));
        const rarityTier = getRarityTier(rarityScore, validTraits.length);

        return {
            rarityScore,
            statisticalRarity,
            rarityRankEstimate,
            rarityTier,
            traitBreakdown,
        };
    }, [collectionSize, traits, lang]);

    const reset = () => {
        setCollectionSize('10000');
        setTraits([
            { id: 0, name: 'Background', count: '2500' },
            { id: 1, name: 'Body', count: '1500' },
            { id: 2, name: 'Eyes', count: '800' },
            { id: 3, name: 'Mouth', count: '2000' },
            { id: 4, name: 'Hat', count: '500' },
        ]);
    };

    const formatNumber = (n: number, decimals = 2) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(n);
    };

    const formatScientific = (n: number) => {
        if (!Number.isFinite(n) || n === 0) return '\u2014';
        if (n < 0.0001) return n.toExponential(4);
        return `${(n * 100).toFixed(6)}%`;
    };

    const tierColor = (tier: string) => {
        switch (tier) {
            case 'Legendary': return '#ffd700';
            case 'Epic': return '#a855f7';
            case 'Rare': return '#3b82f6';
            case 'Uncommon': return '#22c55e';
            default: return '#9ca3af';
        }
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
                        <label htmlFor="nft-collection-size">
                            <Hash size={14} /> {getUiString(lang, 'Collection Size')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={collectionSize}
                            onChange={(e) => setCollectionSize(e.target.value)}
                            id="nft-collection-size"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label>
                            <Gem size={14} /> {getUiString(lang, 'Traits')}
                        </label>
                        {traits.map((t) => (
                            <div key={t.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    value={t.name}
                                    onChange={(e) => updateTrait(t.id, 'name', e.target.value)}
                                    placeholder={getUiString(lang, 'Trait Name')}
                                    style={{ flex: 1 }}
                                />
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    value={t.count}
                                    onChange={(e) => updateTrait(t.id, 'count', e.target.value)}
                                    placeholder={getUiString(lang, 'Items with trait')}
                                    style={{ width: '120px' }}
                                    min="0"
                                    onFocus={(e) => e.target.select()}
                                />
                                {traits.length > 1 && (
                                    <button
                                        className="pill-btn"
                                        onClick={() => removeTrait(t.id)}
                                        style={{ padding: '6px', minWidth: '36px' }}
                                        aria-label={getUiString(lang, 'Remove trait')}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="pill-btn" onClick={addTrait} style={{ marginTop: '4px' }}>
                            <Plus size={14} /> {getUiString(lang, 'Add Trait')}
                        </button>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Enter trait counts to calculate NFT rarity score and ranking.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Rarity Score')}
                                </span>
                                <span className="result-hero-value">
                                    <Gem size={28} />
                                    {formatNumber(results.rarityScore)}
                                </span>
                                <span className="result-hero-roi" style={{ color: tierColor(results.rarityTier) }}>
                                    {getUiString(lang, results.rarityTier)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Estimated Rank')}</span>
                                    <span className="result-value">
                                        #{formatNumber(results.rarityRankEstimate, 0)} / {formatNumber(parseFloat(collectionSize), 0)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Statistical Rarity')}</span>
                                    <span className="result-value">{formatScientific(results.statisticalRarity)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Rarity Tier')}</strong>
                                    </span>
                                    <span className="result-value" style={{ color: tierColor(results.rarityTier) }}>
                                        <strong>{getUiString(lang, results.rarityTier)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Trait Breakdown')}</strong>
                                    </span>
                                    <span className="result-value" />
                                </div>
                                {results.traitBreakdown.map((tb) => (
                                    <div className="result-row" key={tb.name} style={{ paddingLeft: '12px' }}>
                                        <span className="result-label">{tb.name} ({formatNumber(tb.frequency)}%)</span>
                                        <span className="result-value">+{formatNumber(tb.contribution)}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Rarity scores are estimates. Actual marketplace rankings may use different algorithms (weighted traits, rarity.tools methodology, etc.).')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Gem size={40} /></div>
                            <h2>{getUiString(lang, 'Calculate NFT Rarity')}</h2>
                            <p>{getUiString(lang, 'Enter collection size and trait data to calculate rarity score and rank estimate.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(NftRarityCalculator);
