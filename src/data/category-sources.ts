// Category → authoritative external sources (E-E-A-T). Shared by the localized
// calculator template and the standalone EN pages (AuthoritativeSources.astro).
export const CATEGORY_SOURCES: Record<string, { name: string; url: string; note: string }[]> = {
  'tax-reporting': [
    { name: 'IRS — Virtual Currency Transactions FAQ', url: 'https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions', note: 'US official crypto tax guidance' },
    { name: 'IRS Notice 2014-21', url: 'https://www.irs.gov/pub/irs-drop/n-14-21.pdf', note: 'Foundational US tax treatment of crypto' },
    { name: 'HMRC — Cryptoassets Manual', url: 'https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual', note: 'UK official crypto tax guidance' },
  ],
  'mining': [
    { name: 'IRS — Mining Income Guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax treatment of mining rewards' },
    { name: 'US Energy Information Admin (EIA)', url: 'https://www.eia.gov/electricity/', note: 'Electricity rate data' },
  ],
  'defi-yield': [
    { name: 'IRS — Digital Assets Guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax treatment of staking and DeFi yields' },
    { name: 'SEC — DeFi Statement', url: 'https://www.sec.gov/news/statement/peirce-defi-2021-11-09', note: 'US securities perspective on DeFi' },
  ],
  'trading-tools': [
    { name: 'CFTC — Bitcoin & Virtual Currencies', url: 'https://www.cftc.gov/bitcoin/index.htm', note: 'US derivatives regulator on crypto' },
    { name: 'SEC — Investor Alerts on Crypto', url: 'https://www.sec.gov/investor/alerts', note: 'Risk warnings for crypto trading' },
  ],
  'investment': [
    { name: 'SEC — Investor.gov on Crypto', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/cryptocurrency', note: 'US investor education on crypto' },
    { name: 'US Treasury — Tokenization', url: 'https://home.treasury.gov/news/press-releases/jy2454', note: 'US Treasury on tokenized assets / RWA' },
    { name: 'IRS — Digital Assets', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'US tax basis for crypto investments' },
  ],
  'profit-loss': [
    { name: 'IRS — Capital Gains and Losses', url: 'https://www.irs.gov/taxtopics/tc409', note: 'US capital gains rules for crypto' },
    { name: 'IRS — Digital Assets', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets', note: 'Crypto tax basis tracking' },
  ],
  'gas-fees': [
    { name: 'Etherscan Gas Tracker', url: 'https://etherscan.io/gastracker', note: 'Live Ethereum gas reference' },
    { name: 'Federal Reserve — Faster Payments', url: 'https://www.federalreserve.gov/paymentsystems.htm', note: 'US central bank on transaction systems' },
  ],
  'converters': [
    { name: 'CoinGecko — Crypto Data', url: 'https://www.coingecko.com/en/api', note: 'Cryptocurrency market data source' },
    { name: 'Federal Reserve — FX Rates', url: 'https://www.federalreserve.gov/releases/h10/current/', note: 'US central bank FX reference' },
  ],
};

// The source NAMES are official document titles and stay in English; the NOTES are our own
// one-line descriptions, and they rendered untranslated on every ru/es/pt/tr page until
// 2026-08-24. Keyed by the English note so the data above stays untouched.
export const SOURCE_NOTE_I18N: Record<string, Partial<Record<string, string>>> = {
  'Crypto tax basis tracking': {
    es: 'Seguimiento de la base fiscal en cripto',
    pt: 'Acompanhamento da base fiscal em cripto',
    tr: 'Kriptoda vergi maliyet takibi',
    hi: 'क्रिप्टो टैक्स बेसिस ट्रैकिंग',
    ru: 'Учёт налоговой базы по криптоактивам',
  },
  'Cryptocurrency market data source': {
    es: 'Fuente de datos de mercado cripto',
    pt: 'Fonte de dados de mercado cripto',
    tr: 'Kripto piyasa verisi kaynağı',
    hi: 'क्रिप्टो मार्केट डेटा स्रोत',
    ru: 'Источник рыночных данных по криптовалютам',
  },
  'Electricity rate data': {
    es: 'Datos de tarifas eléctricas',
    pt: 'Dados de tarifas de eletricidade',
    tr: 'Elektrik tarifesi verileri',
    hi: 'बिजली दर डेटा',
    ru: 'Данные по тарифам на электроэнергию',
  },
  'Foundational US tax treatment of crypto': {
    es: 'Base del tratamiento fiscal cripto en EE. UU.',
    pt: 'Base do tratamento fiscal cripto nos EUA',
    tr: 'ABD\'de kripto vergilendirmesinin temeli',
    hi: 'अमेरिका में क्रिप्टो कर उपचार का आधार',
    ru: 'Основа налогового режима крипто в США',
  },
  'Live Ethereum gas reference': {
    es: 'Referencia de gas de Ethereum en vivo',
    pt: 'Referência de gas da Ethereum em tempo real',
    tr: 'Canlı Ethereum gas referansı',
    hi: 'लाइव Ethereum गैस संदर्भ',
    ru: 'Актуальные значения газа в Ethereum',
  },
  'Risk warnings for crypto trading': {
    es: 'Advertencias de riesgo para el trading cripto',
    pt: 'Avisos de risco para negociação de cripto',
    tr: 'Kripto işlemleri için risk uyarıları',
    hi: 'क्रिप्टो ट्रेडिंग के लिए जोखिम चेतावनियाँ',
    ru: 'Предупреждения о рисках крипто-трейдинга',
  },
  'UK official crypto tax guidance': {
    es: 'Guía fiscal oficial cripto del Reino Unido',
    pt: 'Orientação fiscal oficial cripto do Reino Unido',
    tr: 'Birleşik Krallık resmî kripto vergi rehberi',
    hi: 'यूके का आधिकारिक क्रिप्टो कर मार्गदर्शन',
    ru: 'Официальные налоговые разъяснения Великобритании',
  },
  'US Treasury on tokenized assets / RWA': {
    es: 'El Tesoro de EE. UU. sobre activos tokenizados (RWA)',
    pt: 'Tesouro dos EUA sobre ativos tokenizados (RWA)',
    tr: 'ABD Hazinesi: tokenize varlıklar (RWA)',
    hi: 'टोकनयुक्त संपत्तियों (RWA) पर अमेरिकी ट्रेजरी',
    ru: 'Минфин США о токенизированных активах (RWA)',
  },
  'US capital gains rules for crypto': {
    es: 'Reglas de ganancias de capital de EE. UU. para cripto',
    pt: 'Regras de mais-valias dos EUA para cripto',
    tr: 'ABD\'de kripto için sermaye kazancı kuralları',
    hi: 'क्रिप्टो पर अमेरिकी कैपिटल गेन नियम',
    ru: 'Правила прироста капитала США для крипто',
  },
  'US central bank FX reference': {
    es: 'Referencia de tipos de cambio del banco central de EE. UU.',
    pt: 'Referência cambial do banco central dos EUA',
    tr: 'ABD merkez bankası döviz kuru referansı',
    hi: 'अमेरिकी केंद्रीय बैंक विदेशी मुद्रा संदर्भ',
    ru: 'Курсы валют центрального банка США',
  },
  'US central bank on transaction systems': {
    es: 'El banco central de EE. UU. sobre sistemas de pago',
    pt: 'Banco central dos EUA sobre sistemas de pagamento',
    tr: 'ABD merkez bankası: ödeme sistemleri',
    hi: 'लेन-देन प्रणालियों पर अमेरिकी केंद्रीय बैंक',
    ru: 'Центральный банк США о платёжных системах',
  },
  'US derivatives regulator on crypto': {
    es: 'El regulador de derivados de EE. UU. sobre cripto',
    pt: 'Regulador de derivados dos EUA sobre cripto',
    tr: 'ABD türev piyasası düzenleyicisi: kripto',
    hi: 'क्रिप्टो पर अमेरिकी डेरिवेटिव नियामक',
    ru: 'Регулятор деривативов США о криптовалютах',
  },
  'US investor education on crypto': {
    es: 'Educación al inversor de EE. UU. sobre cripto',
    pt: 'Educação ao investidor dos EUA sobre cripto',
    tr: 'ABD yatırımcı eğitimi: kripto',
    hi: 'क्रिप्टो पर अमेरिकी निवेशक शिक्षा',
    ru: 'Просвещение инвесторов США о криптовалютах',
  },
  'US official crypto tax guidance': {
    es: 'Guía fiscal oficial cripto de EE. UU.',
    pt: 'Orientação fiscal oficial cripto dos EUA',
    tr: 'ABD resmî kripto vergi rehberi',
    hi: 'अमेरिका का आधिकारिक क्रिप्टो कर मार्गदर्शन',
    ru: 'Официальные налоговые разъяснения США',
  },
  'US securities perspective on DeFi': {
    es: 'Perspectiva de valores de EE. UU. sobre DeFi',
    pt: 'Perspetiva de valores mobiliários dos EUA sobre DeFi',
    tr: 'ABD menkul kıymetler bakışıyla DeFi',
    hi: 'DeFi पर अमेरिकी प्रतिभूति दृष्टिकोण',
    ru: 'Взгляд регулятора ценных бумаг США на DeFi',
  },
  'US tax basis for crypto investments': {
    es: 'Base fiscal de EE. UU. para inversiones cripto',
    pt: 'Base fiscal dos EUA para investimentos cripto',
    tr: 'ABD kripto yatırımlarında vergi maliyeti',
    hi: 'क्रिप्टो निवेश के लिए अमेरिकी टैक्स बेसिस',
    ru: 'Налоговая база США для криптоинвестиций',
  },
  'US tax treatment of mining rewards': {
    es: 'Tratamiento fiscal en EE. UU. de las recompensas de minería',
    pt: 'Tratamento fiscal dos EUA para recompensas de mineração',
    tr: 'ABD\'de madencilik ödüllerinin vergilendirilmesi',
    hi: 'माइनिंग रिवॉर्ड का अमेरिकी कर उपचार',
    ru: 'Налогообложение наград за майнинг в США',
  },
  'US tax treatment of staking and DeFi yields': {
    es: 'Tratamiento fiscal en EE. UU. del staking y los rendimientos DeFi',
    pt: 'Tratamento fiscal dos EUA para staking e rendimentos DeFi',
    tr: 'ABD\'de staking ve DeFi getirilerinin vergilendirilmesi',
    hi: 'स्टेकिंग और DeFi यील्ड का अमेरिकी कर उपचार',
    ru: 'Налогообложение стейкинга и доходов DeFi в США',
  },
};

/** Localized note for a source, falling back to the English original. */
export function localizedSourceNote(note: string, lang: string): string {
  if (lang === 'en') return note;
  return SOURCE_NOTE_I18N[note]?.[lang] ?? note;
}
