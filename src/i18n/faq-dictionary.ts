import type { Lang } from './utils';

export interface FaqItem {
  q: string;
  a: string;
}

export const defaultFaqByLang: Record<Lang, FaqItem[]> = {
  en: [
    {
      q: 'How does the {title} work?',
      a: 'The {title} combines your inputs with standard crypto formulas and outputs a practical result instantly. It is designed for fast planning and is updated live as you change values.',
    },
    {
      q: 'How accurate are the results?',
      a: 'Results are mathematically accurate based on your inputs and available market data. Live prices, fees, slippage, tax treatment, and execution conditions can change final real-world outcomes.',
    },
    {
      q: 'Can beginners use this calculator?',
      a: 'Yes. The interface is built for both beginners and advanced users, with clear labels, defaults, and practical interpretation guidance below the calculator.',
    },
    {
      q: 'Does this tool store my data?',
      a: 'No personal account is required. The calculator runs in your browser and is designed for privacy-first usage.',
    },
    {
      q: 'Can I use this for real trades or investing decisions?',
      a: 'Use it as a decision-support tool, not as guaranteed advice. Always validate risk, fees, and strategy assumptions before committing capital.',
    },
    {
      q: 'Which related calculators should I use next?',
      a: 'After using {title}, compare outcomes with Profit, ROI, Position Size, Tax, and Break-Even calculators to validate your full scenario end-to-end.',
    },
  ],
  es: [
    {
      q: '¿Cómo funciona la {title}?',
      a: 'La {title} combina tus datos con fórmulas cripto estándar y genera resultados prácticos al instante. Está diseñada para una planificación rápida y se actualiza en tiempo real al cambiar los valores.',
    },
    {
      q: '¿Qué tan precisos son los resultados?',
      a: 'Los resultados son matemáticamente exactos según tus datos y el mercado. Sin embargo, los precios en vivo, comisiones, deslizamiento (slippage) e impuestos pueden cambiar el resultado final real.',
    },
    {
      q: '¿Pueden los principiantes usar esta calculadora?',
      a: 'Sí. La interfaz está pensada tanto para principiantes como para usuarios avanzados, con etiquetas claras, valores predeterminados y guías prácticas debajo de la herramienta.',
    },
    {
      q: '¿Esta herramienta almacena mis datos?',
      a: 'No se requiere cuenta personal. La calculadora funciona íntegramente en tu navegador y está diseñada primando la privacidad.',
    },
    {
      q: '¿Puedo usar esto para decisiones reales de trading o inversión?',
      a: 'Úsala como una herramienta de apoyo, no como consejo garantizado. Valida siempre los riesgos, comisiones y suposiciones de tu estrategia antes de comprometer capital.',
    },
    {
      q: '¿Qué calculadoras relacionadas debería usar después?',
      a: 'Después de usar {title}, compara los resultados con las calculadoras de Ganancias, ROI, Tamaño de Posición, Impuestos y Punto de Equilibrio para validar todo tu escenario.',
    },
  ],
  pt: [
    {
      q: 'Como funciona a {title}?',
      a: 'A {title} combina seus dados com fórmulas cripto padrão e gera um resultado prático instantaneamente. É projetada para planejamento rápido e atualizada em tempo real ao alterar os valores.',
    },
    {
      q: 'Quão precisos são os resultados?',
      a: 'Os resultados são matematicamente exatos com base nos seus dados e no mercado. Contudo, preços ao vivo, taxas, slippage e impostos podem alterar o resultado final no mundo real.',
    },
    {
      q: 'Iniciantes podem usar esta calculadora?',
      a: 'Sim. A interface foi criada tanto para iniciantes quanto para usuários avançados, com rótulos claros, padrões úteis e guias de interpretação práticos abaixo da ferramenta.',
    },
    {
      q: 'Esta ferramenta armazena meus dados?',
      a: 'Nenhuma conta pessoal é necessária. A calculadora roda diretamente no seu navegador, sendo projetada com foco total em privacidade.',
    },
    {
      q: 'Posso usar isso para decisões reais de trade ou investimento?',
      a: 'Use-a como uma ferramenta de apoio à decisão, não como conselho garantido. Sempre valide o risco, as taxas e as premissas da estratégia antes de alocar capital.',
    },
    {
      q: 'Quais calculadoras relacionadas devo usar a seguir?',
      a: 'Após utilizar {title}, compare os resultados com as calculadoras de Lucro, ROI, Tamanho da Posição, Impostos e Ponto de Equilíbrio para validar seu cenário de ponta a ponta.',
    },
  ],
  tr: [
    {
      q: '{title} nasıl çalışır?',
      a: '{title}, girdilerinizi standart kripto formülleriyle birleştirir ve anında pratik bir sonuç üretir. Hızlı planlama için tasarlanmıştır ve değerleri değiştirdiğinizde anlık olarak güncellenir.',
    },
    {
      q: 'Sonuçlar ne kadar doğru?',
      a: 'Sonuçlar, girdilerinize ve mevcut piyasa verilerine göre matematiksel olarak doğrudur. Ancak anlık fiyatlar, işlem ücretleri, kayma (slippage) ve vergi oranları gerçek dünyadaki nihai sonuçları değiştirebilir.',
    },
    {
      q: 'Yeni başlayanlar bu hesaplayıcıyı kullanabilir mi?',
      a: 'Evet. Arayüz, hem yeni başlayanlar hem de ileri düzey kullanıcılar için net etiketler, varsayılan değerler ve aracın altında yer alan pratik yorumlama rehberleriyle tasarlanmıştır.',
    },
    {
      q: 'Bu araç verilerimi kaydediyor mu?',
      a: 'Kişisel bir hesaba gerek yoktur. Hesaplayıcı doğrudan tarayıcınızda çalışır ve tamamen gizlilik odaklı olarak tasarlanmıştır.',
    },
    {
      q: 'Bunu gerçek işlemler veya yatırım kararları için kullanabilir miyim?',
      a: 'Bunu garantili bir tavsiye olarak değil, bir karar destek aracı olarak kullanın. Sermayenizi riske atmadan önce her zaman riskleri, işlem ücretlerini ve strateji varsayımlarınızı doğrulayın.',
    },
    {
      q: 'Daha sonra hangi ilgili hesaplayıcıları kullanmalıyım?',
      a: '{title} aracını kullandıktan sonra, tüm senaryonuzu uçtan uca doğrulamak için sonuçları Kar/Zarar, ROI, Pozisyon Boyutu, Vergi ve Başa Baş (Break-Even) hesaplayıcılarıyla karşılaştırın.',
    },
  ],
  hi: [
    {
      q: '{title} कैसे काम करता है?',
      a: '{title} आपके इनपुट्स को स्टैंडर्ड क्रिप्टो फ़ार्मुलों के साथ मिलाता है और तुरंत व्यावहारिक परिणाम देता है। इसे तेज़ प्लानिंग के लिए डिज़ाइन किया गया है और मान बदलने पर यह रीयल-टाइम में अपडेट होता है।',
    },
    {
      q: 'परिणाम कितने सटीक हैं?',
      a: 'परिणाम आपके इनपुट्स और उपलब्ध मार्केट डेटा के आधार पर गणितीय रूप से सटीक हैं। हालांकि, लाइव मूल्य, फीस, स्लिपेज और टैक्स वास्तविक दुनिया के अंतिम परिणामों को बदल सकते हैं।',
    },
    {
      q: 'क्या नए लोग (beginners) इस कैलकुलेटर का उपयोग कर सकते हैं?',
      a: 'हाँ। इसका इंटरफ़ेस नए और अनुभवी दोनों तरह के यूज़र्स के लिए बनाया गया है, जिसमें स्पष्ट लेबल, डिफ़ॉल्ट मान और टूल के नीचे व्यावहारिक मार्गदर्शन दिया गया है।',
    },
    {
      q: 'क्या यह टूल मेरा डेटा स्टोर करता है?',
      a: 'किसी व्यक्तिगत खाते की आवश्यकता नहीं है। यह कैलकुलेटर सीधे आपके ब्राउज़र में काम करता है और इसे प्राइवेसी को ध्यान में रखकर डिज़ाइन किया गया है।',
    },
    {
      q: 'क्या मैं इसका इस्तेमाल वास्तविक ट्रेडिंग या निवेश निर्णयों के लिए कर सकता हूँ?',
      a: 'इसे एक निर्णय-समर्थन टूल के रूप में उपयोग करें, न कि गारंटीकृत सलाह के रूप में। पूंजी लगाने से पहले हमेशा जोखिम, फीस और अपनी रणनीति की जांच करें।',
    },
    {
      q: 'मुझे इसके बाद कौन से संबंधित कैलकुलेटर उपयोग करने चाहिए?',
      a: '{title} का उपयोग करने के बाद, अपने पूरे परिदृश्य को मान्य करने के लिए परिणामों की तुलना प्रॉफ़िट, ROI, पोज़िशन साइज़, टैक्स और ब्रेक-ईवन कैलकुलेटर से करें।',
    },
  ],
  ru: [
    {
      q: 'Как работает {title}?',
      a: '{title} объединяет ваши вводные данные со стандартными крипто-формулами и мгновенно выдает практический результат. Инструмент создан для быстрого планирования и обновляется в реальном времени при изменении значений.',
    },
    {
      q: 'Насколько точны результаты?',
      a: 'Результаты математически точны на основе ваших данных и рынка. Однако реальные цены, комиссии, проскальзывание (слиппидж) и налоги могут изменить итоговый результат в реальной сделке.',
    },
    {
      q: 'Могут ли новички использовать этот калькулятор?',
      a: 'Да. Интерфейс разработан как для новичков, так и для опытных пользователей, с понятными метками, значениями по умолчанию и практическим руководством под калькулятором.',
    },
    {
      q: 'Сохраняет ли этот инструмент мои данные?',
      a: 'Личный аккаунт не требуется. Калькулятор работает локально в вашем браузере и спроектирован с акцентом на приватность.',
    },
    {
      q: 'Могу ли я использовать это для реальных торговых или инвестиционных решений?',
      a: 'Используйте его как инструмент поддержки принятия решений, а не как финансовый совет. Всегда проверяйте риски, комиссии и допущения вашей стратегии перед входом в сделку.',
    },
    {
      q: 'Какие связанные калькуляторы мне стоит использовать после этого?',
      a: 'После использования {title}, сравните результаты с калькуляторами прибыли, ROI, размера позиции, налогов и безубыточности, чтобы проверить весь ваш сценарий от начала до конца.',
    },
  ],
};
