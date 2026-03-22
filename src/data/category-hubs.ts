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
    heroBadge: 'चुना हुआ कैलकुलेटर कलेक्शन',
    backToHome: 'होम पर वापस जाएं',
    backToCategories: 'सभी कैटेगरी',
    toolsTitle: 'इस कैटेगरी के टूल्स',
    toolsSubtitle: 'साफ assumptions के साथ शुरू करने के लिए कोई भी कैलकुलेटर चुनें।',
    openCalculator: 'कैलकुलेटर खोलें',
    faqTitle: 'कैटेगरी FAQ',
    faqSubtitle: 'पहला scenario चलाने से पहले जल्दी जवाब।',
    relatedTitle: 'संबंधित कैटेगरी देखें',
    relatedSubtitle: 'हब छोड़े बिना पास के workflows खोलें।',
    calculatorCountSuffix: 'कैलकुलेटर',
    viewCategory: 'कैटेगरी खोलें',
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
      return `${description}. Seffaf formulere sahip ${count} araci ucretsiz kullanin.`;
    case 'hi':
      return `${description}. ${count} tools ko transparent formulas ke saath free use karein.`;
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
          question: `Que puedo calcular en la categoria ${title}?`,
          answer: `Esta categoria agrupa calculadoras practicas de ${title.toLowerCase()}. Te permite comparar varias herramientas sin saltar entre muchas paginas.`,
        },
        {
          question: 'Con que calculadora deberia empezar?',
          answer: `Empieza con ${firstTool}. Luego prueba una herramienta cercana para validar tus supuestos.`,
        },
        {
          question: 'Estas herramientas son gratis y privadas?',
          answer: 'Si. Las calculadoras de CryptoCalk son gratuitas, funcionan en tu navegador y no requieren registro.',
        },
      ];
    case 'pt':
      return [
        {
          question: `O que posso calcular na categoria ${title}?`,
          answer: `Esta categoria agrupa calculadoras praticas de ${title.toLowerCase()}. Assim voce compara varias ferramentas sem pular entre paginas.`,
        },
        {
          question: 'Com qual calculadora devo comecar?',
          answer: `Comece com ${firstTool} e depois valide os mesmos dados em uma ferramenta proxima.`,
        },
        {
          question: 'As ferramentas sao gratuitas e privadas?',
          answer: 'Sim. As calculadoras da CryptoCalk sao gratuitas, rodam no navegador e nao exigem cadastro.',
        },
      ];
    case 'tr':
      return [
        {
          question: `${title} kategorisinde neleri hesaplayabilirim?`,
          answer: `Bu kategori ${title.toLowerCase()} odakli pratik hesaplayicilari bir araya getirir. Farkli araclari hizlica yan yana karsilastirabilirsiniz.`,
        },
        {
          question: 'Hangi hesaplayici ile baslamaliyim?',
          answer: `${firstTool} ile baslayin. Sonra varsayimlari test etmek icin ayni kategoriden bir araci daha calistirin.`,
        },
        {
          question: 'Bu araclar ucretsiz ve ozel mi?',
          answer: 'Evet. CryptoCalk araclari ucretsizdir, tarayicida calisir ve hesap acmanizi istemez.',
        },
      ];
    case 'hi':
      return [
        {
          question: `${title} category me kya calculate kar sakta hoon?`,
          answer: `Ye category ${title.toLowerCase()} se jude practical calculators ko ek jagah rakhti hai, taki aap tools ko asani se compare kar saken.`,
        },
        {
          question: 'Mujhe sabse pehle kaunsa calculator use karna chahiye?',
          answer: `${firstTool} se start karein. Fir same category ke ek aur tool se assumptions verify karein.`,
        },
        {
          question: 'Kya ye tools free aur private hain?',
          answer: 'Haan. CryptoCalk calculators free hain, browser me chalte hain, aur signup nahi mangte.',
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
