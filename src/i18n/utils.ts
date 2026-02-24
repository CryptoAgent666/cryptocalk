import { CALCULATOR_META } from './calculator-meta';

export const LANGUAGES = {
    en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    pt: { name: 'Português', flag: '🇧🇷', dir: 'ltr' },
    tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
} as const;

export type Lang = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Lang = 'en';
export const SUPPORTED_LANGS = Object.keys(LANGUAGES) as Lang[];
export const NON_DEFAULT_LANGS = SUPPORTED_LANGS.filter((lang) => lang !== DEFAULT_LANG) as Exclude<Lang, 'en'>[];

export const SPEC_CALCULATOR_SLUGS = [
    'converter',
    'profit-calculator',
    'mining-calculator',
    'dca-calculator',
    'tax-calculator',
    'what-if',
    'position-size-calculator',
    'liquidation-calculator',
    'funding-rate-calculator',
    'tp-sl-calculator',
    'margin-calculator',
    'pip-calculator',
    'break-even-calculator',
    'risk-reward-calculator',
    'staking-calculator',
    'impermanent-loss-calculator',
    'apy-apr-calculator',
    'yield-farming-calculator',
    'gas-calculator',
    'uniswap-calculator',
    'bridge-comparator',
    'lending-calculator',
    'gpu-mining-calculator',
    'asic-mining-calculator',
    'mining-roi-calculator',
    'electricity-cost-calculator',
    'difficulty-calculator',
    'hashrate-converter',
    'market-cap-calculator',
    'market-cap-comparator',
    'roi-calculator',
    'reverse-roi',
    'hodl-vs-trade',
    'rebalancing-calculator',
    'compound-calculator',
    'ico-roi-calculator',
    'airdrop-calculator',
    'satoshi-converter',
    'gwei-converter',
    'timestamp-converter',
    'unit-converter',
    'exchange-fees',
    'crypto-loan-calculator',
    'vesting-calculator',
    'nft-profit-calculator',
    'halving-calculator',
    'mev-calculator',
    'gamefi-calculator',
    'node-calculator',
    'salary-calculator',
    'inflation-hedge',
] as const;

export type SpecCalculatorSlug = (typeof SPEC_CALCULATOR_SLUGS)[number];

const LOCALIZED_SPEC_SLUGS: Record<Exclude<Lang, 'en'>, Record<SpecCalculatorSlug, string>> = {
    es: {
        'converter': 'conversor-cripto',
        'profit-calculator': 'calculadora-beneficio-cripto',
        'mining-calculator': 'calculadora-mineria-bitcoin',
        'dca-calculator': 'calculadora-dca',
        'tax-calculator': 'calculadora-impuestos-cripto',
        'what-if': 'calculadora-y-si',
        'position-size-calculator': 'calculadora-tamano-posicion',
        'liquidation-calculator': 'calculadora-liquidacion',
        'funding-rate-calculator': 'calculadora-tasa-funding',
        'tp-sl-calculator': 'calculadora-tp-sl',
        'margin-calculator': 'calculadora-margen',
        'pip-calculator': 'calculadora-valor-pip',
        'break-even-calculator': 'calculadora-punto-equilibrio',
        'risk-reward-calculator': 'calculadora-riesgo-beneficio',
        'staking-calculator': 'calculadora-staking',
        'impermanent-loss-calculator': 'calculadora-perdida-impermanente',
        'apy-apr-calculator': 'calculadora-apy-apr',
        'yield-farming-calculator': 'calculadora-yield-farming',
        'gas-calculator': 'calculadora-gas-cripto',
        'uniswap-calculator': 'calculadora-comisiones-uniswap',
        'bridge-comparator': 'comparador-coste-bridge',
        'lending-calculator': 'calculadora-prestamos-lending',
        'gpu-mining-calculator': 'calculadora-mineria-gpu',
        'asic-mining-calculator': 'calculadora-mineria-asic',
        'mining-roi-calculator': 'calculadora-roi-mineria',
        'electricity-cost-calculator': 'calculadora-coste-electricidad-mineria',
        'difficulty-calculator': 'calculadora-dificultad-mineria',
        'hashrate-converter': 'conversor-hashrate',
        'market-cap-calculator': 'calculadora-capitalizacion-mercado',
        'market-cap-comparator': 'comparador-capitalizacion-mercado',
        'roi-calculator': 'calculadora-roi',
        'reverse-roi': 'calculadora-roi-inverso',
        'hodl-vs-trade': 'calculadora-hodl-vs-trading',
        'rebalancing-calculator': 'calculadora-rebalanceo-cartera',
        'compound-calculator': 'calculadora-interes-compuesto',
        'ico-roi-calculator': 'calculadora-roi-ico-ido',
        'airdrop-calculator': 'calculadora-valor-airdrop',
        'satoshi-converter': 'conversor-satoshis',
        'gwei-converter': 'conversor-gwei',
        'timestamp-converter': 'conversor-timestamp-unix',
        'unit-converter': 'conversor-unidades-cripto',
        'exchange-fees': 'comparador-comisiones-exchanges',
        'crypto-loan-calculator': 'calculadora-prestamo-cripto',
        'vesting-calculator': 'calculadora-vesting-tokens',
        'nft-profit-calculator': 'calculadora-beneficio-nft',
        'halving-calculator': 'calculadora-halving-bitcoin',
        'mev-calculator': 'calculadora-proteccion-mev',
        'gamefi-calculator': 'calculadora-roi-gamefi',
        'node-calculator': 'calculadora-rentabilidad-nodo',
        'salary-calculator': 'calculadora-salario-cripto',
        'inflation-hedge': 'calculadora-cobertura-inflacion',
    },
    pt: {
        'converter': 'conversor-cripto',
        'profit-calculator': 'calculadora-lucro-cripto',
        'mining-calculator': 'calculadora-mineracao-bitcoin',
        'dca-calculator': 'calculadora-dca',
        'tax-calculator': 'calculadora-impostos-cripto',
        'what-if': 'calculadora-e-se',
        'position-size-calculator': 'calculadora-tamanho-posicao',
        'liquidation-calculator': 'calculadora-liquidacao',
        'funding-rate-calculator': 'calculadora-taxa-funding',
        'tp-sl-calculator': 'calculadora-tp-sl',
        'margin-calculator': 'calculadora-margem',
        'pip-calculator': 'calculadora-valor-pip',
        'break-even-calculator': 'calculadora-ponto-equilibrio',
        'risk-reward-calculator': 'calculadora-risco-retorno',
        'staking-calculator': 'calculadora-staking',
        'impermanent-loss-calculator': 'calculadora-perda-impermanente',
        'apy-apr-calculator': 'calculadora-apy-apr',
        'yield-farming-calculator': 'calculadora-yield-farming',
        'gas-calculator': 'calculadora-gas-cripto',
        'uniswap-calculator': 'calculadora-taxas-uniswap',
        'bridge-comparator': 'comparador-custo-bridge',
        'lending-calculator': 'calculadora-emprestimo-lending',
        'gpu-mining-calculator': 'calculadora-mineracao-gpu',
        'asic-mining-calculator': 'calculadora-mineracao-asic',
        'mining-roi-calculator': 'calculadora-roi-mineracao',
        'electricity-cost-calculator': 'calculadora-custo-eletricidade-mineracao',
        'difficulty-calculator': 'calculadora-dificuldade-mineracao',
        'hashrate-converter': 'conversor-hashrate',
        'market-cap-calculator': 'calculadora-capitalizacao-mercado',
        'market-cap-comparator': 'comparador-capitalizacao-mercado',
        'roi-calculator': 'calculadora-roi',
        'reverse-roi': 'calculadora-roi-reverso',
        'hodl-vs-trade': 'calculadora-hodl-vs-trade',
        'rebalancing-calculator': 'calculadora-rebalanceamento-carteira',
        'compound-calculator': 'calculadora-juros-compostos',
        'ico-roi-calculator': 'calculadora-roi-ico-ido',
        'airdrop-calculator': 'calculadora-valor-airdrop',
        'satoshi-converter': 'conversor-satoshi',
        'gwei-converter': 'conversor-gwei',
        'timestamp-converter': 'conversor-timestamp-unix',
        'unit-converter': 'conversor-unidades-cripto',
        'exchange-fees': 'comparador-taxas-exchanges',
        'crypto-loan-calculator': 'calculadora-emprestimo-cripto',
        'vesting-calculator': 'calculadora-vesting-tokens',
        'nft-profit-calculator': 'calculadora-lucro-nft',
        'halving-calculator': 'calculadora-halving-bitcoin',
        'mev-calculator': 'calculadora-protecao-mev',
        'gamefi-calculator': 'calculadora-roi-gamefi',
        'node-calculator': 'calculadora-rentabilidade-node',
        'salary-calculator': 'calculadora-salario-cripto',
        'inflation-hedge': 'calculadora-protecao-inflacao',
    },
    tr: {
        'converter': 'kripto-donusturucu',
        'profit-calculator': 'kripto-kar-hesaplayici',
        'mining-calculator': 'bitcoin-madencilik-hesaplayici',
        'dca-calculator': 'dca-hesaplayici',
        'tax-calculator': 'kripto-vergi-hesaplayici',
        'what-if': 'ya-oyle-olsaydi',
        'position-size-calculator': 'pozisyon-boyutu-hesaplayici',
        'liquidation-calculator': 'likidasyon-hesaplayici',
        'funding-rate-calculator': 'funding-orani-hesaplayici',
        'tp-sl-calculator': 'tp-sl-hesaplayici',
        'margin-calculator': 'marjin-hesaplayici',
        'pip-calculator': 'pip-degeri-hesaplayici',
        'break-even-calculator': 'basa-bas-hesaplayici',
        'risk-reward-calculator': 'risk-odul-hesaplayici',
        'staking-calculator': 'staking-hesaplayici',
        'impermanent-loss-calculator': 'gecici-kayip-hesaplayici',
        'apy-apr-calculator': 'apy-apr-hesaplayici',
        'yield-farming-calculator': 'getiri-ciftciligi-hesaplayici',
        'gas-calculator': 'gas-ucreti-hesaplayici',
        'uniswap-calculator': 'uniswap-ucret-hesaplayici',
        'bridge-comparator': 'kopru-maliyet-karsilastirici',
        'lending-calculator': 'kripto-borc-verme-hesaplayici',
        'gpu-mining-calculator': 'gpu-madencilik-hesaplayici',
        'asic-mining-calculator': 'asic-madencilik-hesaplayici',
        'mining-roi-calculator': 'madencilik-roi-hesaplayici',
        'electricity-cost-calculator': 'elektrik-maliyeti-hesaplayici',
        'difficulty-calculator': 'zorluk-hesaplayici',
        'hashrate-converter': 'hashrate-donusturucu',
        'market-cap-calculator': 'piyasa-degeri-hesaplayici',
        'market-cap-comparator': 'piyasa-degeri-karsilastirici',
        'roi-calculator': 'roi-hesaplayici',
        'reverse-roi': 'ters-roi-hesaplayici',
        'hodl-vs-trade': 'hodl-vs-trade-karsilastirma',
        'rebalancing-calculator': 'portfoy-dengeleme-hesaplayici',
        'compound-calculator': 'bilesik-faiz-hesaplayici',
        'ico-roi-calculator': 'ico-ido-roi-hesaplayici',
        'airdrop-calculator': 'airdrop-deger-hesaplayici',
        'satoshi-converter': 'satoshi-donusturucu',
        'gwei-converter': 'gwei-donusturucu',
        'timestamp-converter': 'unix-zaman-donusturucu',
        'unit-converter': 'kripto-birim-donusturucu',
        'exchange-fees': 'borsa-ucret-karsilastirici',
        'crypto-loan-calculator': 'kripto-kredi-hesaplayici',
        'vesting-calculator': 'token-vesting-hesaplayici',
        'nft-profit-calculator': 'nft-kar-hesaplayici',
        'halving-calculator': 'bitcoin-halving-hesaplayici',
        'mev-calculator': 'mev-koruma-hesaplayici',
        'gamefi-calculator': 'gamefi-roi-hesaplayici',
        'node-calculator': 'validator-node-hesaplayici',
        'salary-calculator': 'kripto-maas-hesaplayici',
        'inflation-hedge': 'enflasyon-koruma-hesaplayici',
    },
    hi: {
        'converter': 'kripto-converter-hindi',
        'profit-calculator': 'kripto-labh-calculator-hindi',
        'mining-calculator': 'bitcoin-mining-calculator-hindi',
        'dca-calculator': 'dca-calculator-hindi',
        'tax-calculator': 'kripto-tax-calculator-hindi',
        'what-if': 'agar-aisa-hota',
        'position-size-calculator': 'position-size-calculator-hindi',
        'liquidation-calculator': 'liquidation-calculator-hindi',
        'funding-rate-calculator': 'funding-rate-calculator-hindi',
        'tp-sl-calculator': 'tp-sl-calculator-hindi',
        'margin-calculator': 'margin-calculator-hindi',
        'pip-calculator': 'pip-value-calculator-hindi',
        'break-even-calculator': 'break-even-calculator-hindi',
        'risk-reward-calculator': 'risk-reward-calculator-hindi',
        'staking-calculator': 'staking-calculator-hindi',
        'impermanent-loss-calculator': 'impermanent-loss-calculator-hindi',
        'apy-apr-calculator': 'apy-apr-calculator-hindi',
        'yield-farming-calculator': 'yield-farming-calculator-hindi',
        'gas-calculator': 'gas-fee-calculator-hindi',
        'uniswap-calculator': 'uniswap-fee-calculator-hindi',
        'bridge-comparator': 'bridge-cost-comparator-hindi',
        'lending-calculator': 'lending-calculator-hindi',
        'gpu-mining-calculator': 'gpu-mining-calculator-hindi',
        'asic-mining-calculator': 'asic-mining-calculator-hindi',
        'mining-roi-calculator': 'mining-roi-calculator-hindi',
        'electricity-cost-calculator': 'electricity-cost-calculator-hindi',
        'difficulty-calculator': 'difficulty-calculator-hindi',
        'hashrate-converter': 'hashrate-converter-hindi',
        'market-cap-calculator': 'market-cap-calculator-hindi',
        'market-cap-comparator': 'market-cap-comparator-hindi',
        'roi-calculator': 'roi-calculator-hindi',
        'reverse-roi': 'reverse-roi-calculator-hindi',
        'hodl-vs-trade': 'hodl-vs-trade-calculator-hindi',
        'rebalancing-calculator': 'rebalancing-calculator-hindi',
        'compound-calculator': 'compound-interest-calculator-hindi',
        'ico-roi-calculator': 'ico-roi-calculator-hindi',
        'airdrop-calculator': 'airdrop-value-calculator-hindi',
        'satoshi-converter': 'satoshi-converter-hindi',
        'gwei-converter': 'gwei-converter-hindi',
        'timestamp-converter': 'unix-timestamp-converter-hindi',
        'unit-converter': 'crypto-unit-converter-hindi',
        'exchange-fees': 'exchange-fee-comparator-hindi',
        'crypto-loan-calculator': 'crypto-loan-calculator-hindi',
        'vesting-calculator': 'token-vesting-calculator-hindi',
        'nft-profit-calculator': 'nft-profit-calculator-hindi',
        'halving-calculator': 'bitcoin-halving-calculator-hindi',
        'mev-calculator': 'mev-protection-calculator-hindi',
        'gamefi-calculator': 'gamefi-roi-calculator-hindi',
        'node-calculator': 'validator-node-calculator-hindi',
        'salary-calculator': 'crypto-salary-calculator-hindi',
        'inflation-hedge': 'inflation-hedge-calculator-hindi',
    },
    ru: {
        'converter': 'kripto-konverter',
        'profit-calculator': 'kalkulyator-pribyli-kripto',
        'mining-calculator': 'kalkulyator-mayninga-bitkoin',
        'dca-calculator': 'kalkulyator-dca',
        'tax-calculator': 'kalkulyator-nalogov-kripto',
        'what-if': 'chto-esli',
        'position-size-calculator': 'kalkulyator-razmera-pozicii',
        'liquidation-calculator': 'kalkulyator-likvidacii',
        'funding-rate-calculator': 'kalkulyator-stavki-fandinga',
        'tp-sl-calculator': 'kalkulyator-tp-sl',
        'margin-calculator': 'kalkulyator-marzhi',
        'pip-calculator': 'kalkulyator-stoimosti-pipa',
        'break-even-calculator': 'kalkulyator-bezubytochnosti',
        'risk-reward-calculator': 'kalkulyator-risk-dohodnost',
        'staking-calculator': 'kalkulyator-stakinga',
        'impermanent-loss-calculator': 'kalkulyator-nepostoyannogo-ubytka',
        'apy-apr-calculator': 'kalkulyator-apy-apr',
        'yield-farming-calculator': 'kalkulyator-yield-farming',
        'gas-calculator': 'kalkulyator-gas-komissii',
        'uniswap-calculator': 'kalkulyator-komissii-uniswap',
        'bridge-comparator': 'sravnenie-stoimosti-bridzhey',
        'lending-calculator': 'kalkulyator-kripto-lendinga',
        'gpu-mining-calculator': 'kalkulyator-gpu-mayninga',
        'asic-mining-calculator': 'kalkulyator-asic-mayninga',
        'mining-roi-calculator': 'kalkulyator-roi-mayninga',
        'electricity-cost-calculator': 'kalkulyator-stoimosti-elektroenergii',
        'difficulty-calculator': 'kalkulyator-slozhnosti-mayninga',
        'hashrate-converter': 'konverter-heshreyta',
        'market-cap-calculator': 'kalkulyator-rynochnoy-kapitalizacii',
        'market-cap-comparator': 'sravnenie-rynochnoy-kapitalizacii',
        'roi-calculator': 'kalkulyator-roi',
        'reverse-roi': 'kalkulyator-obratnogo-roi',
        'hodl-vs-trade': 'sravnenie-hodl-i-treydinga',
        'rebalancing-calculator': 'kalkulyator-rebalansirovki-portfelya',
        'compound-calculator': 'kalkulyator-slozhnogo-procenta',
        'ico-roi-calculator': 'kalkulyator-roi-ico-ido',
        'airdrop-calculator': 'kalkulyator-stoimosti-airdropa',
        'satoshi-converter': 'konverter-satoshi',
        'gwei-converter': 'konverter-gwei',
        'timestamp-converter': 'konverter-unix-vremeni',
        'unit-converter': 'konverter-kripto-edinic',
        'exchange-fees': 'sravnenie-komissiy-birzh',
        'crypto-loan-calculator': 'kalkulyator-kripto-zayma',
        'vesting-calculator': 'kalkulyator-vestinga-tokenov',
        'nft-profit-calculator': 'kalkulyator-pribyli-nft',
        'halving-calculator': 'kalkulyator-khalvinga-bitkoina',
        'mev-calculator': 'kalkulyator-zashity-ot-mev',
        'gamefi-calculator': 'kalkulyator-roi-gamefi',
        'node-calculator': 'kalkulyator-validatornoy-nody',
        'salary-calculator': 'kalkulyator-kripto-zarplaty',
        'inflation-hedge': 'kalkulyator-zashity-ot-inflyacii',
    },
};

const LOCALIZED_TO_BASE_SPEC_SLUGS: Record<Exclude<Lang, 'en'>, Record<string, SpecCalculatorSlug>> = NON_DEFAULT_LANGS
    .reduce((acc, lang) => {
        acc[lang] = Object.entries(LOCALIZED_SPEC_SLUGS[lang]).reduce((inner, [baseSlug, localizedSlug]) => {
            inner[localizedSlug] = baseSlug as SpecCalculatorSlug;
            return inner;
        }, {} as Record<string, SpecCalculatorSlug>);
        return acc;
    }, {} as Record<Exclude<Lang, 'en'>, Record<string, SpecCalculatorSlug>>);

function normalizePath(path: string): string {
    const cleaned = path.trim();
    if (!cleaned) return '/';
    const withLeadingSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    const collapsed = withLeadingSlash.replace(/\/+/g, '/');
    const withoutTrailingSlash = collapsed.length > 1 && collapsed.endsWith('/')
        ? collapsed.slice(0, -1)
        : collapsed;
    return withoutTrailingSlash || '/';
}

function splitPath(path: string): string[] {
    return path.split('/').filter(Boolean);
}

function titleCaseFromSlug(slug: string): string {
    return slug
        .split('-')
        .filter(Boolean)
        .map((part) => {
            if (part.length <= 3 && /^[a-z0-9]+$/i.test(part)) return part.toUpperCase();
            return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
        })
        .join(' ');
}

export function getLocalizedSlug(baseSlug: string, lang: Lang): string {
    if (lang === DEFAULT_LANG) return baseSlug;
    const mapping = LOCALIZED_SPEC_SLUGS[lang as Exclude<Lang, 'en'>];
    return mapping[baseSlug as SpecCalculatorSlug] ?? baseSlug;
}

export function getCanonicalSlug(slug: string, lang: Lang): string {
    if (lang === DEFAULT_LANG) return slug;
    return LOCALIZED_TO_BASE_SPEC_SLUGS[lang as Exclude<Lang, 'en'>][slug] ?? slug;
}

function getCanonicalSlugFromAnyLanguage(slug: string): string {
    for (const lang of NON_DEFAULT_LANGS) {
        const canonical = LOCALIZED_TO_BASE_SPEC_SLUGS[lang][slug];
        if (canonical) return canonical;
    }
    return slug;
}

export function getLocalizedCalculatorMeta(
    slug: string,
    lang: Lang,
    fallbackTitle: string,
    fallbackDescription: string
): { title: string; description: string } {
    // Return statically translated mappings from L2 Fix
    const metaData = CALCULATOR_META[lang]?.[slug as SpecCalculatorSlug];
    if (metaData) {
        return metaData;
    }

    if (lang === DEFAULT_LANG) {
        return { title: fallbackTitle, description: fallbackDescription };
    }

    // Fallback behavior if slug is somehow missing from translation map
    const localizedSlug = getLocalizedSlug(slug, lang);
    const localizedTopic = titleCaseFromSlug(localizedSlug);
    return {
        title: `Calculator ${localizedTopic}`,
        description: fallbackDescription,
    };
}

/**
 * Extract language code from a URL pathname.
 * E.g. /es/profit-calculator → 'es', /profit-calculator → 'en'
 */
export function getLangFromUrl(url: URL): Lang {
    const [, maybeLang] = url.pathname.split('/');
    if (maybeLang && maybeLang in LANGUAGES) {
        return maybeLang as Lang;
    }
    return DEFAULT_LANG;
}

/**
 * Build a localized path. For EN (default), returns /path.
 * For other langs, returns /lang/path.
 */
export function getLocalizedPath(path: string, lang: Lang): string {
    const normalized = normalizePath(path);
    const rawSegments = splitPath(normalized);
    const segments = rawSegments[0] && rawSegments[0] in LANGUAGES
        ? rawSegments.slice(1)
        : rawSegments;
    const [first, ...rest] = segments;

    const baseFirst = first ? getCanonicalSlugFromAnyLanguage(first) : '';
    const localizedFirst = baseFirst ? getLocalizedSlug(baseFirst, lang) : '';

    const localizedSegments = localizedFirst ? [localizedFirst, ...rest] : rest;
    const localizedPath = localizedSegments.length > 0 ? `/${localizedSegments.join('/')}` : '/';

    if (lang === DEFAULT_LANG) {
        return localizedPath;
    }

    return localizedPath === '/' ? `/${lang}` : `/${lang}${localizedPath}`;
}

/**
 * Get the current page path without lang prefix.
 * E.g. /es/profit-calculator → /profit-calculator
 */
export function getPathWithoutLang(pathname: string): string {
    const normalized = normalizePath(pathname);
    const segments = splitPath(normalized);
    if (segments.length === 0) return '/';

    const maybeLang = segments[0];
    const hasLangPrefix = maybeLang in LANGUAGES;
    const lang = (hasLangPrefix ? maybeLang : DEFAULT_LANG) as Lang;
    const routeSegments = hasLangPrefix ? segments.slice(1) : segments;

    if (routeSegments.length === 0) return '/';

    routeSegments[0] = getCanonicalSlug(routeSegments[0], lang);
    return `/${routeSegments.join('/')}`;
}
