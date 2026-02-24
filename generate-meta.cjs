const fs = require('fs');

const SPEC_CALCULATOR_SLUGS = [
    'converter', 'profit-calculator', 'mining-calculator', 'dca-calculator', 'tax-calculator', 'what-if', 'position-size-calculator', 'liquidation-calculator', 'funding-rate-calculator', 'tp-sl-calculator', 'margin-calculator', 'pip-calculator', 'break-even-calculator', 'risk-reward-calculator', 'staking-calculator', 'impermanent-loss-calculator', 'apy-apr-calculator', 'yield-farming-calculator', 'gas-calculator', 'uniswap-calculator', 'bridge-comparator', 'lending-calculator', 'gpu-mining-calculator', 'asic-mining-calculator', 'mining-roi-calculator', 'electricity-cost-calculator', 'difficulty-calculator', 'hashrate-converter', 'market-cap-calculator', 'market-cap-comparator', 'roi-calculator', 'reverse-roi', 'hodl-vs-trade', 'rebalancing-calculator', 'compound-calculator', 'ico-roi-calculator', 'airdrop-calculator', 'satoshi-converter', 'gwei-converter', 'timestamp-converter', 'unit-converter', 'exchange-fees', 'crypto-loan-calculator', 'vesting-calculator', 'nft-profit-calculator', 'halving-calculator', 'mev-calculator', 'gamefi-calculator', 'node-calculator', 'salary-calculator', 'inflation-hedge'
];

const ALIAS_DEFINITIONS = {
  'converter': 'Crypto Converter',
  'profit-calculator': 'Crypto Profit Calculator',
  'mining-calculator': 'Bitcoin Mining Calculator',
  'dca-calculator': 'DCA Calculator',
  'tax-calculator': 'Crypto Tax Calculator',
  'what-if': 'What If Calculator',
  'position-size-calculator': 'Position Size Calculator',
  'liquidation-calculator': 'Liquidation Calculator',
  'funding-rate-calculator': 'Funding Rate Calculator',
  'tp-sl-calculator': 'TP / SL Calculator',
  'margin-calculator': 'Margin Calculator',
  'pip-calculator': 'Pip / Tick Value Calculator',
  'break-even-calculator': 'Break-Even Calculator',
  'risk-reward-calculator': 'Risk / Reward Calculator',
  'staking-calculator': 'Crypto Staking Calculator',
  'impermanent-loss-calculator': 'Impermanent Loss Calculator',
  'apy-apr-calculator': 'APY vs APR Calculator',
  'yield-farming-calculator': 'Yield Farming Calculator',
  'gas-calculator': 'Crypto Gas Calculator',
  'uniswap-calculator': 'Uniswap Fee Calculator',
  'bridge-comparator': 'Bridge Cost Comparator',
  'lending-calculator': 'Crypto Lending Calculator',
  'gpu-mining-calculator': 'GPU Mining Calculator',
  'asic-mining-calculator': 'ASIC Mining Calculator',
  'mining-roi-calculator': 'Mining ROI Calculator',
  'electricity-cost-calculator': 'Mining Electricity Cost Calculator',
  'difficulty-calculator': 'Mining Difficulty Estimator',
  'hashrate-converter': 'Hashrate Converter',
  'market-cap-calculator': 'Market Cap Calculator',
  'market-cap-comparator': 'Market Cap Comparator',
  'roi-calculator': 'ROI Calculator',
  'reverse-roi': 'Reverse ROI Calculator',
  'hodl-vs-trade': 'HODL vs Trade Calculator',
  'rebalancing-calculator': 'Portfolio Rebalancing Calculator',
  'compound-calculator': 'Compound Interest Calculator (Crypto)',
  'ico-roi-calculator': 'ICO / IDO ROI Calculator',
  'airdrop-calculator': 'Airdrop Value Calculator',
  'satoshi-converter': 'Satoshi Converter',
  'gwei-converter': 'Gwei Converter',
  'timestamp-converter': 'Unix Timestamp Converter',
  'unit-converter': 'Crypto Unit Converter',
  'exchange-fees': 'Exchange Fee Comparator',
  'crypto-loan-calculator': 'Crypto Loan Calculator',
  'vesting-calculator': 'Token Vesting Calculator',
  'nft-profit-calculator': 'NFT Profit Calculator',
  'halving-calculator': 'Bitcoin Halving Calculator',
  'mev-calculator': 'MEV Protection Calculator',
  'gamefi-calculator': 'GameFi ROI Calculator',
  'node-calculator': 'Validator Node Calculator',
  'salary-calculator': 'Crypto Salary Calculator',
  'inflation-hedge': 'Inflation Hedge Calculator'
};

const LANGS = ['en', 'es', 'pt', 'tr', 'hi', 'ru'];

// Dictionary for proper native translations
const translations = {
  'converter': {
    es: 'Conversor de Criptomonedas', pt: 'Conversor de Criptomoedas', tr: 'Kripto Para Dönüştürücü', hi: 'क्रिप्टो कनवर्टर', ru: 'Конвертер криптовалют'
  },
  'profit-calculator': {
    es: 'Calculadora de Ganancias Cripto', pt: 'Calculadora de Lucro Cripto', tr: 'Kripto Kar Hesaplayıcı', hi: 'क्रिप्टो प्रॉफिट कैलकुलेटर', ru: 'Калькулятор прибыли криптовалют'
  },
  'mining-calculator': {
    es: 'Calculadora de Minería de Bitcoin', pt: 'Calculadora de Mineração de Bitcoin', tr: 'Bitcoin Madencilik Hesaplayıcı', hi: 'बिटकॉइन माइनिंग कैलकुलेटर', ru: 'Калькулятор майнинга биткоина'
  },
  'dca-calculator': {
    es: 'Calculadora DCA', pt: 'Calculadora DCA', tr: 'DCA Hesaplayıcı', hi: 'DCA कैलकुलेटर', ru: 'Калькулятор DCA'
  },
  'tax-calculator': {
    es: 'Calculadora de Impuestos Cripto', pt: 'Calculadora de Impostos Cripto', tr: 'Kripto Vergi Hesaplayıcı', hi: 'क्रिप्टो टैक्स कैलकुलेटर', ru: 'Калькулятор налогов на криптовалюту'
  },
  'what-if': {
    es: 'Calculadora Y Si (What If)', pt: 'Calculadora E Se (What If)', tr: 'Ya Öyle Olsaydı Hesaplayıcı', hi: 'व्हाट इफ कैलकुलेटर', ru: 'Калькулятор Если бы'
  },
  'position-size-calculator': {
    es: 'Calculadora de Tamaño de Posición', pt: 'Calculadora de Tamanho de Posição', tr: 'Pozisyon Boyutu Hesaplayıcı', hi: 'पोज़िशन साइज़ कैलकुलेटर', ru: 'Калькулятор размера позиции'
  },
  'liquidation-calculator': {
    es: 'Calculadora de Liquidación', pt: 'Calculadora de Liquidação', tr: 'Likidasyon Hesaplayıcı', hi: 'लिक्विडेशन कैलकुलेटर', ru: 'Калькулятор ликвидации'
  },
  'funding-rate-calculator': {
    es: 'Calculadora de Tasa de Financiación', pt: 'Calculadora de Taxa de Financiamento', tr: 'Fonlama Oranı Hesaplayıcı', hi: 'फंडिंग रेट कैलकुलेटर', ru: 'Калькулятор ставки фондирования'
  },
  'tp-sl-calculator': {
    es: 'Calculadora TP / SL', pt: 'Calculadora TP / SL', tr: 'TP / SL Hesaplayıcı', hi: 'टेक प्रॉफिट / स्टॉप लॉस कैलकुलेटर', ru: 'Калькулятор Тейк-Профит / Стоп-Лосс'
  },
  'margin-calculator': {
    es: 'Calculadora de Margen', pt: 'Calculadora de Margem', tr: 'Marjin Hesaplayıcı', hi: 'मार्जिन कैलकुलेटर', ru: 'Калькулятор маржи'
  },
  'pip-calculator': {
    es: 'Calculadora de Valor de Pip', pt: 'Calculadora de Valor de Pip', tr: 'Pip / Tick Değeri Hesaplayıcı', hi: 'पिप वैल्यू कैलकुलेटर', ru: 'Калькулятор стоимости пункта (Пип/Тик)'
  },
  'break-even-calculator': {
    es: 'Calculadora de Punto de Equilibrio', pt: 'Calculadora de Ponto de Equilíbrio', tr: 'Başa Baş Hesaplayıcı', hi: 'ब्रेक-ईवन कैलकुलेटर', ru: 'Калькулятор безубыточности'
  },
  'risk-reward-calculator': {
    es: 'Calculadora de Riesgo / Beneficio', pt: 'Calculadora de Risco / Retorno', tr: 'Risk / Ödül Hesaplayıcı', hi: 'रिस्क रिवॉर्ड कैलकुलेटर', ru: 'Калькулятор соотношения риска и прибыли'
  },
  'staking-calculator': {
    es: 'Calculadora de Staking Cripto', pt: 'Calculadora de Staking Cripto', tr: 'Kripto Staking Hesaplayıcı', hi: 'क्रिप्टो स्टेकिंग कैलकुलेटर', ru: 'Калькулятор стейкинга'
  },
  'impermanent-loss-calculator': {
    es: 'Calculadora de Pérdida Impermanente', pt: 'Calculadora de Perda Impermanente', tr: 'Geçici Kayıp Hesaplayıcı', hi: 'इम्परमानेंट लॉस कैलकुलेटर', ru: 'Калькулятор непостоянных потерь'
  },
  'apy-apr-calculator': {
    es: 'Calculadora APY vs APR', pt: 'Calculadora APY vs APR', tr: 'APY ve APR Hesaplayıcı', hi: 'APY vs APR कैलकुलेटर', ru: 'Калькулятор APY и APR'
  },
  'yield-farming-calculator': {
    es: 'Calculadora de Yield Farming', pt: 'Calculadora de Yield Farming', tr: 'Getiri Çiftçiliği Hesaplayıcı', hi: 'यील्ड फार्मिंग कैलकुलेटर', ru: 'Калькулятор фарминга доходности'
  },
  'gas-calculator': {
    es: 'Calculadora de Gas Cripto', pt: 'Calculadora de Gas Cripto', tr: 'Kripto Gas Hesaplayıcı', hi: 'क्रिप्टो गैस कैलकुलेटर', ru: 'Калькулятор газа криптовалют'
  },
  'uniswap-calculator': {
    es: 'Calculadora de Comisiones Uniswap', pt: 'Calculadora de Taxas Uniswap', tr: 'Uniswap Ücret Hesaplayıcı', hi: 'यूनिस्वैप फीस कैलकुलेटर', ru: 'Калькулятор комиссий Uniswap'
  },
  'bridge-comparator': {
    es: 'Comparador de Costes de Bridge', pt: 'Comparador de Custos de Bridge', tr: 'Köprü Maliyet Karşılaştırıcı', hi: 'ब्रिज कॉस्ट तुलनित्र', ru: 'Сравнение стоимости мостов (Bridge)'
  },
  'lending-calculator': {
    es: 'Calculadora de Préstamos Cripto', pt: 'Calculadora de Empréstimos Cripto', tr: 'Kripto Borç Verme Hesaplayıcı', hi: 'क्रिप्टो लेंडिंग कैलकुलेटर', ru: 'Калькулятор крипто-кредитования (Лендинг)'
  },
  'gpu-mining-calculator': {
    es: 'Calculadora de Minería GPU', pt: 'Calculadora de Mineração GPU', tr: 'GPU Madencilik Hesaplayıcı', hi: 'GPU माइनिंग कैलकुलेटर', ru: 'Калькулятор майнинга на видеокартах (GPU)'
  },
  'asic-mining-calculator': {
    es: 'Calculadora de Minería ASIC', pt: 'Calculadora de Mineração ASIC', tr: 'ASIC Madencilik Hesaplayıcı', hi: 'ASIC माइनिंग कैलकुलेटर', ru: 'Калькулятор ASIC-майнинга'
  },
  'mining-roi-calculator': {
    es: 'Calculadora ROI de Minería', pt: 'Calculadora ROI de Mineração', tr: 'Madencilik ROI Hesaplayıcı', hi: 'माइनिंग ROI कैलकुलेटर', ru: 'Калькулятор окупаемости майнинга (ROI)'
  },
  'electricity-cost-calculator': {
    es: 'Calculadora de Coste Eléctrico de Minería', pt: 'Calculadora de Custo de Eletricidade para Mineração', tr: 'Madencilik Elektrik Maliyeti Hesaplayıcı', hi: 'माइनिंग बिजली लागत कैलकुलेटर', ru: 'Калькулятор стоимости электроэнергии для майнинга'
  },
  'difficulty-calculator': {
    es: 'Estimador de Dificultad de Minería', pt: 'Avaliador de Dificuldade de Mineração', tr: 'Madencilik Zorluk Tahmincisi', hi: 'माइनिंग कठिनाई अनुमानक', ru: 'Калькулятор сложности майнинга'
  },
  'hashrate-converter': {
    es: 'Conversor de Hashrate', pt: 'Conversor de Hashrate', tr: 'Hashrate Dönüştürücü', hi: 'हैशरेट कनवर्टर', ru: 'Конвертер хешрейта'
  },
  'market-cap-calculator': {
    es: 'Calculadora de Capitalización de Mercado', pt: 'Calculadora de Capitalização de Mercado', tr: 'Piyasa Değeri Hesaplayıcı', hi: 'मार्केट कैप कैलकुलेटर', ru: 'Калькулятор рыночной капитализации'
  },
  'market-cap-comparator': {
    es: 'Comparador de Capitalización de Mercado', pt: 'Comparador de Capitalização de Mercado', tr: 'Piyasa Değeri Karşılaştırıcı', hi: 'मार्केट कैप तुलनित्र', ru: 'Сравнение рыночной капитализации'
  },
  'roi-calculator': {
    es: 'Calculadora de ROI', pt: 'Calculadora de ROI', tr: 'ROI Hesaplayıcı', hi: 'ROI कैलकुलेटर', ru: 'Калькулятор ROI (рентабельности)'
  },
  'reverse-roi': {
    es: 'Calculadora de ROI Inverso', pt: 'Calculadora de ROI Reverso', tr: 'Ters ROI Hesaplayıcı', hi: 'रिवर्स ROI कैलकुलेटर', ru: 'Калькулятор обратного ROI'
  },
  'hodl-vs-trade': {
    es: 'Calculadora HODL vs Trading', pt: 'Calculadora HODL vs Trading', tr: 'HODL vs Trade Hesaplayıcı', hi: 'HODL बनाम ट्रेड कैलकुलेटर', ru: 'Калькулятор HODL vs Трейдинг'
  },
  'rebalancing-calculator': {
    es: 'Calculadora de Rebalanceo de Cartera', pt: 'Calculadora de Rebalanceamento de Carteira', tr: 'Portföy Yeniden Dengeleme Hesaplayıcı', hi: 'पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर', ru: 'Калькулятор ребалансировки портфеля'
  },
  'compound-calculator': {
    es: 'Calculadora de Interés Compuesto (Cripto)', pt: 'Calculadora de Juros Compostos (Cripto)', tr: 'Bileşik Faiz Hesaplayıcı (Kripto)', hi: 'चक्रवृद्धि ब्याज कैलकुलेटर (क्रिप्टो)', ru: 'Калькулятор сложного процента (Крипто)'
  },
  'ico-roi-calculator': {
    es: 'Calculadora de ROI de ICO / IDO', pt: 'Calculadora de ROI de ICO / IDO', tr: 'ICO / IDO ROI Hesaplayıcı', hi: 'ICO / IDO ROI कैलकुलेटर', ru: 'Калькулятор ROI для ICO / IDO'
  },
  'airdrop-calculator': {
    es: 'Calculadora de Valor de Airdrop', pt: 'Calculadora de Valor de Airdrop', tr: 'Airdrop Değer Hesaplayıcı', hi: 'एयरड्रॉप वैल्यू कैलकुलेटर', ru: 'Калькулятор стоимости аирдропа'
  },
  'satoshi-converter': {
    es: 'Conversor de Satoshis', pt: 'Conversor de Satoshi', tr: 'Satoshi Dönüştürücü', hi: 'सातोशी कनवर्टर', ru: 'Конвертер сатоши'
  },
  'gwei-converter': {
    es: 'Conversor de Gwei', pt: 'Conversor de Gwei', tr: 'Gwei Dönüştürücü', hi: 'ग्वेई कनवर्टर', ru: 'Конвертер Gwei'
  },
  'timestamp-converter': {
    es: 'Conversor de Marca de Tiempo Unix', pt: 'Conversor de Timestamp Unix', tr: 'Unix Zaman Damgası Dönüştürücü', hi: 'यूनिक्स टाइमस्टैम्प कनवर्टर', ru: 'Конвертер Unix времени (Timestamp)'
  },
  'unit-converter': {
    es: 'Conversor de Unidades Cripto', pt: 'Conversor de Unidades Cripto', tr: 'Kripto Birim Dönüştürücü', hi: 'क्रिप्टो यूनिट कनवर्टर', ru: 'Конвертер крипто-единиц'
  },
  'exchange-fees': {
    es: 'Comparador de Comisiones de Exchanges', pt: 'Comparador de Taxas de Exchanges', tr: 'Borsa Ücret Karşılaştırıcı', hi: 'एक्सचेंज फीस तुलनित्र', ru: 'Сравнение комиссий бирж'
  },
  'crypto-loan-calculator': {
    es: 'Calculadora de Préstamo Cripto', pt: 'Calculadora de Empréstimo Cripto', tr: 'Kripto Kredi Hesaplayıcı', hi: 'क्रिप्टो लोन कैलकुलेटर', ru: 'Калькулятор крипто-ссуд'
  },
  'vesting-calculator': {
    es: 'Calculadora de Vesting de Tokens', pt: 'Calculadora de Vesting de Tokens', tr: 'Token Hak Ediş Hesaplayıcı', hi: 'टोकन वेस्टिंग कैलकुलेटर', ru: 'Калькулятор вестинга токенов'
  },
  'nft-profit-calculator': {
    es: 'Calculadora de Ganancias NFT', pt: 'Calculadora de Lucro NFT', tr: 'NFT Kar Hesaplayıcı', hi: 'NFT प्रॉफिट कैलकुलेटर', ru: 'Калькулятор прибыли NFT'
  },
  'halving-calculator': {
    es: 'Calculadora de Halving de Bitcoin', pt: 'Calculadora de Halving do Bitcoin', tr: 'Bitcoin Halving Hesaplayıcı', hi: 'बिटकॉइन हाल्विंग कैलकुलेटर', ru: 'Калькулятор халвинга биткоина'
  },
  'mev-calculator': {
    es: 'Calculadora de Protección MEV', pt: 'Calculadora de Proteção MEV', tr: 'MEV Koruma Hesaplayıcı', hi: 'MEV प्रोटेक्शन कैलकुलेटर', ru: 'Калькулятор защиты от MEV'
  },
  'gamefi-calculator': {
    es: 'Calculadora ROI de GameFi', pt: 'Calculadora de ROI GameFi', tr: 'GameFi ROI Hesaplayıcı', hi: 'गेमफाई ROI कैलकुलेटर', ru: 'Калькулятор ROI в GameFi'
  },
  'node-calculator': {
    es: 'Calculadora de Nodo Validador', pt: 'Calculadora de Nó Validador', tr: 'Doğrulayıcı Düğüm Hesaplayıcı', hi: 'वैलिडेटर नोड कैलकुलेटर', ru: 'Калькулятор валидаторной ноды'
  },
  'salary-calculator': {
    es: 'Calculadora de Salario Cripto', pt: 'Calculadora de Salário Cripto', tr: 'Kripto Maaş Hesaplayıcı', hi: 'क्रिप्टो सैलरी कैलकुलेटर', ru: 'Калькулятор зарплаты в криптовалюте'
  },
  'inflation-hedge': {
    es: 'Calculadora de Cobertura de Inflación', pt: 'Calculadora de Proteção contra Inflação', tr: 'Enflasyon Koruması Hesaplayıcı', hi: 'मुद्रास्फीति बचाव कैलकुलेटर', ru: 'Калькулятор хеджирования инфляции'
  }
};

const templates = {
  es: "Herramienta gratuita para explorar herramientas de cripto. Calcula resultados de {topic} al instante con supuestos transparentes y datos actualizados.",
  pt: "Ferramenta gratuita para explorar opções de cripto. Calcule resultados de {topic} em segundos com premissas claras e dados atualizados.",
  tr: "Kripto araçları için ücretsiz platform. Şeffaf varsayımlar ve güncel verilerle {topic} sonuçlarını anında hesaplayın.",
  hi: "क्रिप्टो टूल्स के लिए मुफ्त वेबसाइट। पारदर्शी मान्यताओं और अपडेटेड डेटा के साथ {topic} के परिणाम तुरंत कैलकुलेट करें।",
  ru: "Бесплатный инструмент для работы с криптовалютой. Считайте {topic} мгновенно с прозрачными допущениями и актуальными рыночными данными.",
  en: "Free {topic}. Calculate crypto outcomes instantly with transparent assumptions and updated market data."
};

// Generate description helper
const descFixes = {
  es: (t) => t.toLowerCase(),
  pt: (t) => t.toLowerCase(),
  tr: (t) => t.toLowerCase(),
  hi: (t) => t, // Hindu characters are unchanged
  ru: (t) => t.replace('Калькулятор', 'данные').replace('Конвертер', 'значения').toLowerCase(),
  en: (t) => t
};

const output = [];
output.push(`import type { Lang, SpecCalculatorSlug } from './utils';`);
output.push(`\nexport const CALCULATOR_META: Record<Lang, Record<SpecCalculatorSlug, { title: string; description: string }>> = {`);

for (const lang of LANGS) {
  output.push(`  '${lang}': {`);
  for (const slug of SPEC_CALCULATOR_SLUGS) {
    let title = '';
    
    if (lang === 'en') {
      title = ALIAS_DEFINITIONS[slug];
    } else {
      title = translations[slug][lang];
    }

    let topic = title;
    // apply grammar fixes for descriptions
    topic = descFixes[lang](topic);
    
    // specialized nice descriptions
    let desc = '';
    if (lang === 'es') desc = `Herramienta gratuita: ${title}. Calcula resultados al instante con supuestos transparentes y datos de mercado actualizados.`;
    if (lang === 'pt') desc = `Ferramenta gratuita: ${title}. Calcule resultados em segundos com premissas claras e dados de mercado atualizados.`;
    if (lang === 'tr') desc = `Ücretsiz araç: ${title}. Şeffaf varsayımlar ve güncel piyasa verileriyle sonuçları anında hesaplayın.`;
    if (lang === 'hi') desc = `मुफ्त टूल: ${title}। पारदर्शी मान्यताओं और अपडेटेड मार्केट डेटा के साथ तुरंत परिणाम कैलकुलेट करें।`;
    if (lang === 'ru') desc = `Бесплатный инструмент: ${title}. Считайте результаты мгновенно с прозрачными допущениями и актуальными рыночными данными.`;
    if (lang === 'en') desc = `Free ${title}. Calculate crypto outcomes instantly with transparent assumptions and updated market data.`;

    output.push(`    '${slug}': {`);
    output.push(`      title: '${title.replace(/'/g, "\\'")}',`);
    output.push(`      description: '${desc.replace(/'/g, "\\'")}'`);
    output.push(`    },`);
  }
  output.push(`  },`);
}
output.push(`};\n`);

fs.writeFileSync('/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/src/i18n/calculator-meta.ts', output.join('\n'), 'utf-8');
console.log("Successfully generated calculator-meta.ts!");
