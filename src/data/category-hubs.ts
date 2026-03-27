import { getTranslations, type Translations } from '../i18n/translations';
import {
  DEFAULT_LANG,
  getLocalizedPath,
  type Lang,
} from '../i18n/utils';

type CalculatorTranslationKey =
  | 'profitCalculator'
  | 'cryptoConverter'
  | 'miningCalculator'
  | 'dcaCalculator'
  | 'taxCalculator'
  | 'whatIfCalculator'
  | 'positionSizeCalculator'
  | 'liquidationCalculator'
  | 'fundingRateCalculator'
  | 'tpSlCalculator'
  | 'marginCalculator'
  | 'leverageCalculator'
  | 'ilCalculator'
  | 'compoundCalculator'
  | 'stakingCalculator'
  | 'gasCalculator'
  | 'portfolioCalculator'
  | 'loanCalculator'
  | 'breakEvenCalculator'
  | 'pipCalculator';

type CategoryIcon =
  | 'TrendingUp'
  | 'ArrowLeftRight'
  | 'Pickaxe'
  | 'Sparkles'
  | 'Receipt'
  | 'PiggyBank'
  | 'BarChart3'
  | 'Zap';

interface CategoryToolConfig {
  name: string;
  href: `/${string}`;
  translationKey?: CalculatorTranslationKey;
}

interface CategoryConfig {
  slug:
    | 'profit-loss'
    | 'converters'
    | 'mining'
    | 'defi-yield'
    | 'tax-reporting'
    | 'investment'
    | 'trading-tools'
    | 'gas-fees';
  icon: CategoryIcon;
  color: string;
  featured: boolean;
  title: (t: Translations) => string;
  description: (t: Translations) => string;
  tools: CategoryToolConfig[];
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    slug: 'profit-loss',
    icon: 'TrendingUp',
    color: '#10b981',
    featured: true,
    title: (t) => t.catProfitLoss,
    description: (t) => t.catProfitLossDesc,
    tools: [
      { name: 'Profit Calculator', href: '/profit-calculator', translationKey: 'profitCalculator' },
      { name: 'ROI Calculator', href: '/roi-calculator' },
      { name: 'Reverse ROI Calculator', href: '/reverse-roi' },
      { name: 'HODL vs Trade Calculator', href: '/hodl-vs-trade' },
      { name: 'NFT Profit Calculator', href: '/nft-profit-calculator' },
      { name: 'ICO ROI Calculator', href: '/ico-roi-calculator' },
      { name: 'What If Calculator', href: '/what-if', translationKey: 'whatIfCalculator' },
      { name: 'Break-Even Calculator', href: '/break-even-calculator', translationKey: 'breakEvenCalculator' },
    ],
  },
  {
    slug: 'converters',
    icon: 'ArrowLeftRight',
    color: '#3b82f6',
    featured: true,
    title: (t) => t.catConverters,
    description: (t) => t.catConvertersDesc,
    tools: [
      { name: 'Crypto Converter', href: '/converter', translationKey: 'cryptoConverter' },
      { name: 'Satoshi Converter', href: '/satoshi-converter' },
      { name: 'Gwei Converter', href: '/gwei-converter' },
      { name: 'Hashrate Converter', href: '/hashrate-converter' },
      { name: 'Timestamp Converter', href: '/timestamp-converter' },
      { name: 'Unit Converter', href: '/unit-converter' },
    ],
  },
  {
    slug: 'mining',
    icon: 'Pickaxe',
    color: '#f59e0b',
    featured: true,
    title: (t) => t.catMining,
    description: (t) => t.catMiningDesc,
    tools: [
      { name: 'Bitcoin Mining Calculator', href: '/mining-calculator', translationKey: 'miningCalculator' },
      { name: 'GPU Mining Calculator', href: '/gpu-mining-calculator' },
      { name: 'ASIC Mining Calculator', href: '/asic-mining-calculator' },
      { name: 'Mining ROI Calculator', href: '/mining-roi-calculator' },
      { name: 'Electricity Cost Calculator', href: '/electricity-cost-calculator' },
      { name: 'Difficulty Calculator', href: '/difficulty-calculator' },
      { name: 'Hashrate Converter', href: '/hashrate-converter' },
      { name: 'Bitcoin Halving Calculator', href: '/halving-calculator' },
    ],
  },
  {
    slug: 'defi-yield',
    icon: 'Sparkles',
    color: '#8b5cf6',
    featured: true,
    title: (t) => t.catDefiYield,
    description: (t) => t.catDefiYieldDesc,
    tools: [
      { name: 'Staking Rewards Calculator', href: '/staking-calculator', translationKey: 'stakingCalculator' },
      { name: 'Impermanent Loss Calculator', href: '/impermanent-loss-calculator', translationKey: 'ilCalculator' },
      { name: 'Compound Interest Calculator', href: '/compound-calculator', translationKey: 'compoundCalculator' },
      { name: 'APY vs APR Calculator', href: '/apy-apr-calculator' },
      { name: 'Yield Farming Calculator', href: '/yield-farming-calculator' },
      { name: 'Uniswap Fee Calculator', href: '/uniswap-calculator' },
      { name: 'Lending Yield Calculator', href: '/lending-calculator' },
      { name: 'Node Yield Calculator', href: '/node-calculator' },
      { name: 'Crypto Loan Calculator', href: '/crypto-loan-calculator', translationKey: 'loanCalculator' },
    ],
  },
  {
    slug: 'tax-reporting',
    icon: 'Receipt',
    color: '#ef4444',
    featured: false,
    title: (t) => t.catTaxReporting,
    description: (t) => t.catTaxReportingDesc,
    tools: [
      { name: 'Crypto Tax Calculator', href: '/tax-calculator', translationKey: 'taxCalculator' },
      { name: 'Airdrop Calculator', href: '/airdrop-calculator' },
      { name: 'Crypto Salary Calculator', href: '/salary-calculator' },
    ],
  },
  {
    slug: 'investment',
    icon: 'PiggyBank',
    color: '#14b8a6',
    featured: false,
    title: (t) => t.catInvestment,
    description: (t) => t.catInvestmentDesc,
    tools: [
      { name: 'DCA Calculator', href: '/dca-calculator', translationKey: 'dcaCalculator' },
      { name: 'Portfolio Allocation Calculator', href: '/portfolio-calculator', translationKey: 'portfolioCalculator' },
      { name: 'Rebalancing Calculator', href: '/rebalancing-calculator' },
      { name: 'Market Cap Calculator', href: '/market-cap-calculator' },
      { name: 'Market Cap Comparator', href: '/market-cap-comparator' },
      { name: 'GameFi ROI Calculator', href: '/gamefi-calculator' },
      { name: 'Inflation Hedge Calculator', href: '/inflation-hedge' },
      { name: 'What If Calculator', href: '/what-if', translationKey: 'whatIfCalculator' },
    ],
  },
  {
    slug: 'trading-tools',
    icon: 'BarChart3',
    color: '#ec4899',
    featured: false,
    title: (t) => t.catTradingTools,
    description: (t) => t.catTradingToolsDesc,
    tools: [
      { name: 'Position Size Calculator', href: '/position-size-calculator', translationKey: 'positionSizeCalculator' },
      { name: 'Liquidation Calculator', href: '/liquidation-calculator', translationKey: 'liquidationCalculator' },
      { name: 'Funding Rate Calculator', href: '/funding-rate-calculator', translationKey: 'fundingRateCalculator' },
      { name: 'TP/SL Calculator', href: '/tp-sl-calculator', translationKey: 'tpSlCalculator' },
      { name: 'Margin Calculator', href: '/margin-calculator', translationKey: 'marginCalculator' },
      { name: 'Leverage Calculator', href: '/leverage-calculator', translationKey: 'leverageCalculator' },
      { name: 'Pip / Tick Value Calculator', href: '/pip-calculator', translationKey: 'pipCalculator' },
      { name: 'Break-Even Calculator', href: '/break-even-calculator', translationKey: 'breakEvenCalculator' },
      { name: 'Risk/Reward Calculator', href: '/risk-reward-calculator' },
      { name: 'Kelly Criterion Calculator', href: '/kelly-calculator' },
      { name: 'Portfolio VaR Calculator', href: '/var-calculator' },
      { name: 'Drawdown Recovery Calculator', href: '/drawdown-calculator' },
      { name: 'Sharpe Ratio Calculator', href: '/sharpe-calculator' },
      { name: 'Sortino Ratio Calculator', href: '/sortino-calculator' },
      { name: 'Calmar Ratio Calculator', href: '/calmar-calculator' },
      { name: 'Risk of Ruin Calculator', href: '/risk-of-ruin-calculator' },
      { name: 'Treynor Ratio Calculator', href: '/treynor-calculator' },
      { name: 'Information Ratio Calculator', href: '/information-ratio-calculator' },
      { name: 'Trade Expectancy Calculator', href: '/trade-expectancy-calculator' },
      { name: 'MEV Protection Calculator', href: '/mev-calculator' },
    ],
  },
  {
    slug: 'gas-fees',
    icon: 'Zap',
    color: '#f97316',
    featured: false,
    title: (t) => t.catGasFees,
    description: (t) => t.catGasFeesDesc,
    tools: [
      { name: 'Gas Fee Calculator', href: '/gas-calculator', translationKey: 'gasCalculator' },
      { name: 'Exchange Fee Comparator', href: '/exchange-fees' },
      { name: 'Bridge Comparator', href: '/bridge-comparator' },
      { name: 'Gwei Converter', href: '/gwei-converter' },
      { name: 'DEX Slippage Calculator', href: '/slippage-calculator' },
    ],
  },
];

const TRANSLATION_KEYS: ReadonlySet<CalculatorTranslationKey> = new Set([
  'profitCalculator',
  'cryptoConverter',
  'miningCalculator',
  'dcaCalculator',
  'taxCalculator',
  'whatIfCalculator',
  'positionSizeCalculator',
  'liquidationCalculator',
  'fundingRateCalculator',
  'tpSlCalculator',
  'marginCalculator',
  'leverageCalculator',
  'ilCalculator',
  'compoundCalculator',
  'stakingCalculator',
  'gasCalculator',
  'portfolioCalculator',
  'loanCalculator',
  'breakEvenCalculator',
  'pipCalculator',
]);

export type CategorySlug = (typeof CATEGORY_CONFIGS)[number]['slug'];
export type CategoryIconName = CategoryIcon;

export interface CategoryTool {
  name: string;
  href: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryHub {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: CategoryIcon;
  color: string;
  featured: boolean;
  count: number;
  href: string;
  tools: CategoryTool[];
  intro: string;
  metaTitle: string;
  metaDescription: string;
  faq: CategoryFaq[];
}

export interface HomepageCategory {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: CategoryIcon;
  color: string;
  featured: boolean;
  count: number;
  href: string;
  calculators: CategoryTool[];
}

export interface CategoryHubUiCopy {
  heroBadge: string;
  backToHome: string;
  backToCategories: string;
  toolsTitle: string;
  toolsSubtitle: string;
  openCalculator: string;
  faqTitle: string;
  faqSubtitle: string;
  relatedTitle: string;
  relatedSubtitle: string;
  calculatorCountSuffix: string;
  viewCategory: string;
  lastUpdated: string;
}

const CATEGORY_UI_COPY: Record<Lang, CategoryHubUiCopy> = {
  en: {
    heroBadge: 'Curated calculator collection',
    backToHome: 'Back to Home',
    backToCategories: 'All Categories',
    toolsTitle: 'Tools in this category',
    toolsSubtitle: 'Pick any calculator to start a scenario with clear assumptions.',
    openCalculator: 'Open calculator',
    faqTitle: 'Category FAQ',
    faqSubtitle: 'Quick answers before you run your first scenario.',
    relatedTitle: 'Explore related categories',
    relatedSubtitle: 'Jump into nearby workflows without leaving the hub.',
    calculatorCountSuffix: 'calculators',
    viewCategory: 'View category',
    lastUpdated: 'Last updated',
  },
  es: {
    heroBadge: 'Colección curada de calculadoras',
    backToHome: 'Volver al inicio',
    backToCategories: 'Todas las categorías',
    toolsTitle: 'Herramientas de esta categoría',
    toolsSubtitle: 'Elige cualquier calculadora para empezar con supuestos claros.',
    openCalculator: 'Abrir calculadora',
    faqTitle: 'Preguntas frecuentes',
    faqSubtitle: 'Respuestas rápidas antes de ejecutar tu primer escenario.',
    relatedTitle: 'Explorar categorías relacionadas',
    relatedSubtitle: 'Salta a flujos cercanos sin salir del hub.',
    calculatorCountSuffix: 'calculadoras',
    viewCategory: 'Ver categoría',
    lastUpdated: 'Última actualización',
  },
  pt: {
    heroBadge: 'Coleção selecionada de calculadoras',
    backToHome: 'Voltar ao início',
    backToCategories: 'Todas as categorias',
    toolsTitle: 'Ferramentas desta categoria',
    toolsSubtitle: 'Escolha qualquer calculadora para começar com suposições claras.',
    openCalculator: 'Abrir calculadora',
    faqTitle: 'Perguntas frequentes',
    faqSubtitle: 'Respostas rápidas antes do primeiro cenário.',
    relatedTitle: 'Explorar categorias relacionadas',
    relatedSubtitle: 'Navegue para fluxos próximos sem sair do hub.',
    calculatorCountSuffix: 'calculadoras',
    viewCategory: 'Ver categoria',
    lastUpdated: 'Última atualização',
  },
  tr: {
    heroBadge: 'Seçilmiş hesaplayıcı koleksiyonu',
    backToHome: 'Ana sayfaya dön',
    backToCategories: 'Tüm kategoriler',
    toolsTitle: 'Bu kategorideki araçlar',
    toolsSubtitle: 'Net varsayımlarla başlamak için bir hesaplayıcı seçin.',
    openCalculator: 'Hesaplayıcıyı aç',
    faqTitle: 'Kategori SSS',
    faqSubtitle: 'İlk senaryodan önce hızlı yanıtlar.',
    relatedTitle: 'İlgili kategorileri keşfet',
    relatedSubtitle: 'Hubdan ayrılmadan yakın iş akışlarına geçin.',
    calculatorCountSuffix: 'hesaplayıcı',
    viewCategory: 'Kategoriyi görüntüle',
    lastUpdated: 'Son güncelleme',
  },
  hi: {
    heroBadge: 'चुना हुआ कैलकुलेटर संग्रह',
    backToHome: 'होम पर वापस जाएं',
    backToCategories: 'सभी श्रेणियाँ',
    toolsTitle: 'इस श्रेणी के उपकरण',
    toolsSubtitle: 'स्पष्ट मान्यताओं के साथ शुरू करने के लिए कोई भी कैलकुलेटर चुनें।',
    openCalculator: 'कैलकुलेटर खोलें',
    faqTitle: 'श्रेणी FAQ',
    faqSubtitle: 'पहला परिदृश्य चलाने से पहले त्वरित उत्तर।',
    relatedTitle: 'संबंधित श्रेणियाँ देखें',
    relatedSubtitle: 'इस हब को छोड़े बिना निकटवर्ती कार्यप्रवाह खोलें।',
    calculatorCountSuffix: 'कैलकुलेटर',
    viewCategory: 'श्रेणी खोलें',
    lastUpdated: 'आखिरी अपडेट',
  },
  ru: {
    heroBadge: 'Подборка калькуляторов по категории',
    backToHome: 'На главную',
    backToCategories: 'Все категории',
    toolsTitle: 'Инструменты в этой категории',
    toolsSubtitle: 'Выберите любой калькулятор и начните сценарий с прозрачными допущениями.',
    openCalculator: 'Открыть калькулятор',
    faqTitle: 'FAQ по категории',
    faqSubtitle: 'Краткие ответы перед первым расчётом.',
    relatedTitle: 'Похожие категории',
    relatedSubtitle: 'Переключайтесь на соседние задачи, не выходя из хаба.',
    calculatorCountSuffix: 'калькуляторов',
    viewCategory: 'Открыть категорию',
    lastUpdated: 'Обновлено',
  },
};

function resolveToolName(tool: CategoryToolConfig, t: Translations): string {
  if (!tool.translationKey) return tool.name;
  if (!TRANSLATION_KEYS.has(tool.translationKey)) return tool.name;
  return t[tool.translationKey];
}

const TOOL_NAME_OVERRIDES: Partial<Record<Lang, Record<string, string>>> = {
  es: {
    'roi-calculator': 'Calculadora de ROI',
    'reverse-roi': 'Calculadora de ROI Inverso',
    'hodl-vs-trade': 'Calculadora HODL vs Trading',
    'nft-profit-calculator': 'Calculadora de Ganancias NFT',
    'ico-roi-calculator': 'Calculadora de ROI de ICO / IDO',
    'satoshi-converter': 'Conversor de Satoshis',
    'gwei-converter': 'Conversor de Gwei',
    'hashrate-converter': 'Conversor de Hashrate',
    'timestamp-converter': 'Conversor de Marca de Tiempo Unix',
    'unit-converter': 'Conversor de Unidades Cripto',
    'gpu-mining-calculator': 'Calculadora de Minería GPU',
    'asic-mining-calculator': 'Calculadora de Minería ASIC',
    'mining-roi-calculator': 'Calculadora ROI de Minería',
    'electricity-cost-calculator': 'Calculadora de Coste Eléctrico de Minería',
    'difficulty-calculator': 'Estimador de Dificultad de Minería',
    'halving-calculator': 'Calculadora de Halving de Bitcoin',
    'apy-apr-calculator': 'Calculadora APY vs APR',
    'yield-farming-calculator': 'Calculadora de Yield Farming',
    'uniswap-calculator': 'Calculadora de Comisiones Uniswap',
    'lending-calculator': 'Calculadora de Lending Cripto',
    'node-calculator': 'Calculadora de Nodo Validador',
    'crypto-loan-calculator': 'Calculadora de Préstamo Cripto',
    'airdrop-calculator': 'Calculadora de Valor de Airdrop',
    'salary-calculator': 'Calculadora de Salario Cripto',
    'rebalancing-calculator': 'Calculadora de Rebalanceo de Cartera',
    'market-cap-calculator': 'Calculadora de Capitalización de Mercado',
    'market-cap-comparator': 'Comparador de Capitalización de Mercado',
    'gamefi-calculator': 'Calculadora ROI de GameFi',
    'inflation-hedge': 'Calculadora de Cobertura de Inflación',
    'risk-reward-calculator': 'Calculadora de Riesgo / Beneficio',
    'kelly-calculator': 'Calculadora del Criterio de Kelly',
    'var-calculator': 'Calculadora de Valor en Riesgo (VaR)',
    'drawdown-calculator': 'Calculadora de Recuperación de Drawdown',
    'sharpe-calculator': 'Calculadora de Ratio de Sharpe',
    'sortino-calculator': 'Calculadora de Ratio de Sortino',
    'calmar-calculator': 'Calculadora de Ratio Calmar',
    'risk-of-ruin-calculator': 'Calculadora de Riesgo de Ruina',
    'treynor-calculator': 'Calculadora de Ratio de Treynor',
    'information-ratio-calculator': 'Calculadora de Ratio de Información',
    'trade-expectancy-calculator': 'Calculadora de Expectativa de Trading',
    'mev-calculator': 'Calculadora de Protección MEV',
    'exchange-fees': 'Comparador de Comisiones de Exchanges',
    'bridge-comparator': 'Comparador de Costos de Bridge',
    'slippage-calculator': 'Calculadora de Slippage DEX',
  },
  pt: {
    'roi-calculator': 'Calculadora de ROI',
    'reverse-roi': 'Calculadora de ROI Reverso',
    'hodl-vs-trade': 'Calculadora HODL vs Trading',
    'nft-profit-calculator': 'Calculadora de Lucro NFT',
    'ico-roi-calculator': 'Calculadora de ROI de ICO / IDO',
    'satoshi-converter': 'Conversor de Satoshi',
    'gwei-converter': 'Conversor de Gwei',
    'hashrate-converter': 'Conversor de Hashrate',
    'timestamp-converter': 'Conversor de Timestamp Unix',
    'unit-converter': 'Conversor de Unidades Cripto',
    'gpu-mining-calculator': 'Calculadora de Mineração GPU',
    'asic-mining-calculator': 'Calculadora de Mineração ASIC',
    'mining-roi-calculator': 'Calculadora ROI de Mineração',
    'electricity-cost-calculator': 'Calculadora de Custo de Eletricidade',
    'difficulty-calculator': 'Avaliador de Dificuldade de Mineração',
    'halving-calculator': 'Calculadora de Halving do Bitcoin',
    'apy-apr-calculator': 'Calculadora APY vs APR',
    'yield-farming-calculator': 'Calculadora de Yield Farming',
    'uniswap-calculator': 'Calculadora de Taxas Uniswap',
    'lending-calculator': 'Calculadora de Empréstimos Cripto',
    'node-calculator': 'Calculadora de Nó Validador',
    'crypto-loan-calculator': 'Calculadora de Empréstimo Cripto',
    'airdrop-calculator': 'Calculadora de Valor de Airdrop',
    'salary-calculator': 'Calculadora de Salário Cripto',
    'rebalancing-calculator': 'Calculadora de Rebalanceamento de Carteira',
    'market-cap-calculator': 'Calculadora de Capitalização de Mercado',
    'market-cap-comparator': 'Comparador de Capitalização de Mercado',
    'gamefi-calculator': 'Calculadora de ROI GameFi',
    'inflation-hedge': 'Calculadora de Proteção contra Inflação',
    'risk-reward-calculator': 'Calculadora de Risco / Retorno',
    'kelly-calculator': 'Calculadora do Critério de Kelly',
    'var-calculator': 'Calculadora de Valor em Risco (VaR)',
    'drawdown-calculator': 'Calculadora de Recuperação de Drawdown',
    'sharpe-calculator': 'Calculadora de Ratio de Sharpe',
    'sortino-calculator': 'Calculadora de Ratio de Sortino',
    'calmar-calculator': 'Calculadora de Ratio Calmar',
    'risk-of-ruin-calculator': 'Calculadora de Risco de Ruína',
    'treynor-calculator': 'Calculadora de Ratio de Treynor',
    'information-ratio-calculator': 'Calculadora de Ratio de Informação',
    'trade-expectancy-calculator': 'Calculadora de Expectativa de Trade',
    'mev-calculator': 'Calculadora de Proteção MEV',
    'exchange-fees': 'Comparador de Taxas de Exchanges',
    'bridge-comparator': 'Comparador de Custos de Bridge',
    'slippage-calculator': 'Calculadora de Slippage DEX',
  },
  tr: {
    'roi-calculator': 'ROI Hesaplayıcı',
    'reverse-roi': 'Ters ROI Hesaplayıcı',
    'hodl-vs-trade': 'HODL vs Trade Hesaplayıcı',
    'nft-profit-calculator': 'NFT Kar Hesaplayıcı',
    'ico-roi-calculator': 'ICO / IDO ROI Hesaplayıcı',
    'satoshi-converter': 'Satoshi Dönüştürücü',
    'gwei-converter': 'Gwei Dönüştürücü',
    'hashrate-converter': 'Hashrate Dönüştürücü',
    'timestamp-converter': 'Unix Zaman Damgası Dönüştürücü',
    'unit-converter': 'Kripto Birim Dönüştürücü',
    'gpu-mining-calculator': 'GPU Madencilik Hesaplayıcı',
    'asic-mining-calculator': 'ASIC Madencilik Hesaplayıcı',
    'mining-roi-calculator': 'Madencilik ROI Hesaplayıcı',
    'electricity-cost-calculator': 'Madencilik Elektrik Maliyeti Hesaplayıcı',
    'difficulty-calculator': 'Madencilik Zorluk Tahmincisi',
    'halving-calculator': 'Bitcoin Halving Hesaplayıcı',
    'apy-apr-calculator': 'APY ve APR Hesaplayıcı',
    'yield-farming-calculator': 'Getiri Çiftçiliği Hesaplayıcı',
    'uniswap-calculator': 'Uniswap Ücret Hesaplayıcı',
    'lending-calculator': 'Kripto Borç Verme Hesaplayıcı',
    'node-calculator': 'Doğrulayıcı Düğüm Hesaplayıcı',
    'crypto-loan-calculator': 'Kripto Kredi Hesaplayıcı',
    'airdrop-calculator': 'Airdrop Değer Hesaplayıcı',
    'salary-calculator': 'Kripto Maaş Hesaplayıcı',
    'rebalancing-calculator': 'Portföy Yeniden Dengeleme Hesaplayıcı',
    'market-cap-calculator': 'Piyasa Değeri Hesaplayıcı',
    'market-cap-comparator': 'Piyasa Değeri Karşılaştırıcı',
    'gamefi-calculator': 'GameFi ROI Hesaplayıcı',
    'inflation-hedge': 'Enflasyon Koruması Hesaplayıcı',
    'risk-reward-calculator': 'Risk / Ödül Hesaplayıcı',
    'kelly-calculator': 'Kelly Kriteri Hesaplayıcı',
    'var-calculator': 'Riske Maruz Değer (VaR) Hesaplayıcı',
    'drawdown-calculator': 'Drawdown Toparlanma Hesaplayıcı',
    'sharpe-calculator': 'Sharpe Oranı Hesaplayıcı',
    'sortino-calculator': 'Sortino Oranı Hesaplayıcı',
    'calmar-calculator': 'Calmar Oranı Hesaplayıcı',
    'risk-of-ruin-calculator': 'İflas Riski Hesaplayıcı',
    'treynor-calculator': 'Treynor Oranı Hesaplayıcı',
    'information-ratio-calculator': 'Bilgi Oranı Hesaplayıcı',
    'trade-expectancy-calculator': 'İşlem Beklentisi Hesaplayıcı',
    'mev-calculator': 'MEV Koruma Hesaplayıcı',
    'exchange-fees': 'Borsa Ücret Karşılaştırıcı',
    'bridge-comparator': 'Köprü Maliyet Karşılaştırıcı',
    'slippage-calculator': 'DEX Slippage Hesaplayıcı',
  },
  hi: {
    'roi-calculator': 'ROI कैलकुलेटर',
    'reverse-roi': 'रिवर्स ROI कैलकुलेटर',
    'hodl-vs-trade': 'HODL बनाम ट्रेड कैलकुलेटर',
    'nft-profit-calculator': 'NFT प्रॉफिट कैलकुलेटर',
    'ico-roi-calculator': 'ICO / IDO ROI कैलकुलेटर',
    'satoshi-converter': 'सातोशी कनवर्टर',
    'gwei-converter': 'ग्वेई कनवर्टर',
    'hashrate-converter': 'हैशरेट कनवर्टर',
    'timestamp-converter': 'यूनिक्स टाइमस्टैम्प कनवर्टर',
    'unit-converter': 'क्रिप्टो यूनिट कनवर्टर',
    'gpu-mining-calculator': 'GPU माइनिंग कैलकुलेटर',
    'asic-mining-calculator': 'ASIC माइनिंग कैलकुलेटर',
    'mining-roi-calculator': 'माइनिंग ROI कैलकुलेटर',
    'electricity-cost-calculator': 'माइनिंग बिजली लागत कैलकुलेटर',
    'difficulty-calculator': 'माइनिंग कठिनाई अनुमानक',
    'halving-calculator': 'बिटकॉइन हाल्विंग कैलकुलेटर',
    'apy-apr-calculator': 'APY vs APR कैलकुलेटर',
    'yield-farming-calculator': 'यील्ड फार्मिंग कैलकुलेटर',
    'uniswap-calculator': 'यूनिस्वैप फीस कैलकुलेटर',
    'lending-calculator': 'क्रिप्टो लेंडिंग कैलकुलेटर',
    'node-calculator': 'वैलिडेटर नोड कैलकुलेटर',
    'crypto-loan-calculator': 'क्रिप्टो लोन कैलकुलेटर',
    'airdrop-calculator': 'एयरड्रॉप वैल्यू कैलकुलेटर',
    'salary-calculator': 'क्रिप्टो सैलरी कैलकुलेटर',
    'rebalancing-calculator': 'पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर',
    'market-cap-calculator': 'मार्केट कैप कैलकुलेटर',
    'market-cap-comparator': 'मार्केट कैप तुलनित्र',
    'gamefi-calculator': 'गेमफाई ROI कैलकुलेटर',
    'inflation-hedge': 'मुद्रास्फीति बचाव कैलकुलेटर',
    'risk-reward-calculator': 'रिस्क रिवॉर्ड कैलकुलेटर',
    'kelly-calculator': 'केली क्राइटेरियन कैलकुलेटर',
    'var-calculator': 'वैल्यू एट रिस्क (VaR) कैलकुलेटर',
    'drawdown-calculator': 'ड्रॉडाउन रिकवरी कैलकुलेटर',
    'sharpe-calculator': 'शार्प रेशियो कैलकुलेटर',
    'sortino-calculator': 'सॉर्टिनो रेशियो कैलकुलेटर',
    'calmar-calculator': 'कैल्मर अनुपात कैलकुलेटर',
    'risk-of-ruin-calculator': 'रिस्क ऑफ रुइन कैलकुलेटर',
    'treynor-calculator': 'ट्रेनर रेशियो कैलकुलेटर',
    'information-ratio-calculator': 'इंफॉर्मेशन रेशियो कैलकुलेटर',
    'trade-expectancy-calculator': 'ट्रेड एक्सपेक्टेंसी कैलकुलेटर',
    'mev-calculator': 'MEV प्रोटेक्शन कैलकुलेटर',
    'exchange-fees': 'एक्सचेंज फीस तुलनित्र',
    'bridge-comparator': 'ब्रिज कॉस्ट तुलनित्र',
    'slippage-calculator': 'DEX स्लिपेज कैलकुलेटर',
  },
  ru: {
    'roi-calculator': 'Калькулятор ROI',
    'reverse-roi': 'Калькулятор Обратного ROI',
    'hodl-vs-trade': 'Сравнение HODL и Трейдинга',
    'nft-profit-calculator': 'Калькулятор Прибыли NFT',
    'ico-roi-calculator': 'Калькулятор ROI ICO/IDO',
    'satoshi-converter': 'Конвертер Сатоши',
    'gwei-converter': 'Конвертер Gwei',
    'hashrate-converter': 'Конвертер Хешрейта',
    'timestamp-converter': 'Конвертер Unix Времени',
    'unit-converter': 'Конвертер Единиц',
    'gpu-mining-calculator': 'Калькулятор GPU Майнинга',
    'asic-mining-calculator': 'Калькулятор ASIC Майнинга',
    'mining-roi-calculator': 'Калькулятор ROI Майнинга',
    'electricity-cost-calculator': 'Калькулятор Стоимости Электроэнергии',
    'difficulty-calculator': 'Калькулятор Сложности Майнинга',
    'halving-calculator': 'Калькулятор Халвинга Биткоина',
    'apy-apr-calculator': 'Калькулятор APY vs APR',
    'yield-farming-calculator': 'Калькулятор Yield Farming',
    'uniswap-calculator': 'Калькулятор Комиссий Uniswap',
    'lending-calculator': 'Калькулятор Доходности Lending',
    'node-calculator': 'Калькулятор Доходности Ноды',
    'airdrop-calculator': 'Калькулятор Стоимости Airdrop',
    'salary-calculator': 'Калькулятор Крипто Зарплаты',
    'rebalancing-calculator': 'Калькулятор Ребалансировки',
    'market-cap-calculator': 'Калькулятор Рыночной Капитализации',
    'market-cap-comparator': 'Сравнение Рыночной Капитализации',
    'gamefi-calculator': 'Калькулятор ROI GameFi',
    'inflation-hedge': 'Калькулятор Защиты от Инфляции',
    'risk-reward-calculator': 'Калькулятор Риск/Доходность',
    'kelly-calculator': 'Калькулятор Критерия Келли',
    'var-calculator': 'Калькулятор VaR Портфеля',
    'drawdown-calculator': 'Калькулятор Восстановления после Просадки',
    'sharpe-calculator': 'Калькулятор Коэффициента Шарпа',
    'sortino-calculator': 'Калькулятор Коэффициента Сортино',
    'calmar-calculator': 'Калькулятор Коэффициента Кальмара',
    'risk-of-ruin-calculator': 'Калькулятор Риска Разорения',
    'treynor-calculator': 'Калькулятор Коэффициента Трейнора',
    'information-ratio-calculator': 'Калькулятор Information Ratio',
    'trade-expectancy-calculator': 'Калькулятор Математического Ожидания',
    'exchange-fees': 'Сравнение Комиссий Бирж',
    'bridge-comparator': 'Сравнение Стоимости Бриджей',
    'mev-calculator': 'Калькулятор Защиты от MEV',
    'slippage-calculator': 'Калькулятор Проскальзывания DEX',
  },
};

function getToolSlug(href: string): string {
  return href.replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
}

function localizeToolNameBySlug(name: string, href: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return name;
  const slug = getToolSlug(href);
  return TOOL_NAME_OVERRIDES[lang]?.[slug] ?? name;
}

function buildIntro(description: string, toolNames: string[], lang: Lang): string {
  const highlights = toolNames.slice(0, 3).join(', ');
  switch (lang) {
    case 'es':
      return `${description}. Empieza con ${highlights} y compara resultados en varios escenarios.`;
    case 'pt':
      return `${description}. Comece com ${highlights} e compare resultados em varios cenarios.`;
    case 'tr':
      return `${description}. ${highlights} ile baslayin ve farkli senaryolari hizlica karsilastirin.`;
    case 'hi':
      return `${description}. ${highlights} se shuru karein aur alag scenarios ko compare karein.`;
    case 'ru':
      return `${description}. Начните с ${highlights} и сравните результаты в нескольких сценариях.`;
    case 'en':
    default:
      return `${description}. Start with ${highlights} and compare outcomes across multiple scenarios.`;
  }
}

function buildMetaDescription(description: string, count: number, lang: Lang): string {
  switch (lang) {
    case 'es':
      return `${description}. Explora ${count} herramientas con formulas transparentes y uso gratuito.`;
    case 'pt':
      return `${description}. Explore ${count} ferramentas com formulas transparentes e uso gratuito.`;
    case 'tr':
      return `${description}. Şeffaf formüllere sahip ${count} aracı ücretsiz kullanın.`;
    case 'hi':
      return `${description}. पारदर्शी सूत्रों के साथ ${count} उपकरण निःशुल्क उपयोग करें।`;
    case 'ru':
      return `${description}. Изучите ${count} инструментов с прозрачными формулами и бесплатным доступом.`;
    case 'en':
    default:
      return `${description}. Explore ${count} tools with transparent formulas, scenario testing, and no signup required.`;
  }
}

function buildFaq(title: string, firstTool: string, lang: Lang): CategoryFaq[] {
  switch (lang) {
    case 'es':
      return [
        {
          question: `¿Qué puedo calcular en la categoría ${title}?`,
          answer: `Esta categoría agrupa calculadoras prácticas de ${title.toLowerCase()}. Te permite comparar varias herramientas sin saltar entre muchas páginas.`,
        },
        {
          question: '¿Con qué calculadora debería empezar?',
          answer: `Empieza con ${firstTool}. Luego prueba una herramienta cercana para validar tus supuestos.`,
        },
        {
          question: '¿Estas herramientas son gratis y privadas?',
          answer: 'Sí. Las calculadoras de CryptoCalk son gratuitas, funcionan en tu navegador y no requieren registro.',
        },
      ];
    case 'pt':
      return [
        {
          question: `O que posso calcular na categoria ${title}?`,
          answer: `Esta categoria agrupa calculadoras práticas de ${title.toLowerCase()}. Assim você compara várias ferramentas sem pular entre páginas.`,
        },
        {
          question: 'Com qual calculadora devo começar?',
          answer: `Comece com ${firstTool} e depois valide os mesmos dados em uma ferramenta próxima.`,
        },
        {
          question: 'As ferramentas são gratuitas e privadas?',
          answer: 'Sim. As calculadoras da CryptoCalk são gratuitas, rodam no navegador e não exigem cadastro.',
        },
      ];
    case 'tr':
      return [
        {
          question: `${title} kategorisinde neleri hesaplayabilirim?`,
          answer: `Bu kategori ${title.toLowerCase()} odaklı pratik hesaplayıcıları bir araya getirir. Farklı araçları hızlıca yan yana karşılaştırabilirsiniz.`,
        },
        {
          question: 'Hangi hesaplayıcı ile başlamalıyım?',
          answer: `${firstTool} ile başlayın. Sonra varsayımları test etmek için aynı kategoriden bir aracı daha çalıştırın.`,
        },
        {
          question: 'Bu araçlar ücretsiz ve özel mi?',
          answer: 'Evet. CryptoCalk araçları ücretsizdir, tarayıcıda çalışır ve hesap açmanızı istemez.',
        },
      ];
    case 'hi':
      return [
        {
          question: `${title} श्रेणी में क्या गणना कर सकता हूँ?`,
          answer: `यह श्रेणी ${title.toLowerCase()} से जुड़े व्यावहारिक कैलकुलेटर को एक जगह रखती है, ताकि आप उपकरणों की तुलना आसानी से कर सकें।`,
        },
        {
          question: 'मुझे सबसे पहले कौन सा कैलकुलेटर उपयोग करना चाहिए?',
          answer: `${firstTool} से शुरुआत करें। फिर इसी श्रेणी के किसी अन्य उपकरण से मान्यताएँ सत्यापित करें।`,
        },
        {
          question: 'क्या ये उपकरण निःशुल्क और निजी हैं?',
          answer: 'हाँ। CryptoCalk कैलकुलेटर निःशुल्क हैं, ब्राउज़र में चलते हैं, और साइन अप की आवश्यकता नहीं है।',
        },
      ];
    case 'ru':
      return [
        {
          question: `Что можно рассчитать в категории «${title}»?`,
          answer: `Эта категория объединяет практичные калькуляторы по теме «${title.toLowerCase()}». Так проще быстро сравнить несколько инструментов, не переходя по десяткам страниц.`,
        },
        {
          question: 'С какого калькулятора лучше начать?',
          answer: `Начните с ${firstTool}. Затем проверьте те же допущения в соседнем инструменте этой категории.`,
        },
        {
          question: 'Эти инструменты бесплатные и приватные?',
          answer: 'Да. Калькуляторы CryptoCalk бесплатны, работают в браузере и не требуют регистрации.',
        },
      ];
    case 'en':
    default:
      return [
        {
          question: `What can I calculate in the ${title} category?`,
          answer: `This category groups practical calculators around ${title.toLowerCase()}. It helps you compare several tools quickly instead of jumping page by page.`,
        },
        {
          question: 'Which calculator should I start with?',
          answer: `Start with ${firstTool}. Then run at least one adjacent tool in the same category to stress-test your assumptions.`,
        },
        {
          question: 'Are these tools free and private?',
          answer: 'Yes. CryptoCalk calculators are free to use, run directly in your browser, and do not require account signup.',
        },
      ];
  }
}

function createHub(config: CategoryConfig, lang: Lang, t: Translations): CategoryHub {
  const tools = config.tools.map((tool) => {
    const resolvedName = resolveToolName(tool, t);
    return {
      name: localizeToolNameBySlug(resolvedName, tool.href, lang),
      href: getLocalizedPath(tool.href, lang),
    };
  });
  const title = config.title(t);
  const description = config.description(t);
  const count = tools.length;
  const href = getLocalizedPath(`/calculators/${config.slug}`, lang);
  const intro = buildIntro(description, tools.map((tool) => tool.name), lang);
  const metaTitle = `${title} Calculators | CryptoCalk`;
  const metaDescription = buildMetaDescription(description, count, lang);
  let faq = buildFaq(title, tools[0]?.name ?? 'a core calculator', lang);

  // Extra FAQ for trading-tools (EN only — localized versions use the generic 3)
  if (config.slug === 'trading-tools' && lang === 'en') {
    faq = [
      ...faq,
      {
        question: 'How do I calculate position size for crypto futures?',
        answer: 'Divide your maximum acceptable loss (e.g., 1-2% of account equity) by the distance between your entry price and stop-loss. This gives you the number of units to trade. Use the Position Size Calculator to automate this with your exact risk parameters.',
      },
      {
        question: 'What is an acceptable Sharpe ratio for crypto trading?',
        answer: 'A Sharpe ratio above 1.0 is considered acceptable, above 2.0 is very good, and above 3.0 is excellent. In volatile crypto markets, a consistent Sharpe of 1.5+ across 6-12 months of trading indicates a strong risk-adjusted strategy. Calculate yours with the Sharpe Ratio Calculator.',
      },
      {
        question: 'How do Kelly Criterion and position sizing work together?',
        answer: 'Kelly Criterion calculates the mathematically optimal bet size based on your win rate and reward-to-risk ratio. Most traders use fractional Kelly (25-50%) to reduce volatility. Pair it with the Position Size Calculator: use Kelly to determine your risk percentage, then position sizing to convert that into a specific trade size.',
      },
    ];
  }

  return {
    slug: config.slug,
    title,
    description,
    icon: config.icon,
    color: config.color,
    featured: config.featured,
    count,
    href,
    tools,
    intro,
    metaTitle,
    metaDescription,
    faq,
  };
}

export function getCategorySlugs(): CategorySlug[] {
  return CATEGORY_CONFIGS.map((category) => category.slug);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORY_CONFIGS.some((category) => category.slug === value);
}

export function getCategoryHubs(lang: Lang = DEFAULT_LANG): CategoryHub[] {
  const t = getTranslations(lang);
  return CATEGORY_CONFIGS.map((category) => createHub(category, lang, t));
}

export function getCategoryHubBySlug(slug: string, lang: Lang = DEFAULT_LANG): CategoryHub | undefined {
  if (!isCategorySlug(slug)) return undefined;
  return getCategoryHubs(lang).find((category) => category.slug === slug);
}

export function getHomepageCategories(lang: Lang = DEFAULT_LANG): HomepageCategory[] {
  return getCategoryHubs(lang).map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    icon: category.icon,
    color: category.color,
    featured: category.featured,
    count: category.count,
    href: category.href,
    calculators: category.tools,
  }));
}

export function getCategoryHubUiCopy(lang: Lang = DEFAULT_LANG): CategoryHubUiCopy {
  return CATEGORY_UI_COPY[lang] ?? CATEGORY_UI_COPY.en;
}
