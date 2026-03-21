import type { Lang } from './utils';
import type { SeoBodyContent } from './seo-body-text';

type CalcOverride = Pick<SeoBodyContent, 'how' | 'inputs'>;
type CalcContent = Partial<Record<Lang, CalcOverride>>;

export const calculatorSeoContent: Partial<Record<string, CalcContent>> = {
  'converter': {
    en: {
      how: [
      `The Crypto Converter translates any cryptocurrency amount into another coin or fiat currency using real-time market prices. Select your source asset, type an amount, choose your target currency, and the result updates instantly. Use it before placing an order to confirm exactly how much of one asset equals your intended position in another — eliminating manual arithmetic and rounding errors.`,
      `For comparing value across multiple currencies at once, open the converter alongside your exchange order form. Enter the fiat equivalent you want to spend, copy the resulting coin amount directly into your trade ticket. The converter supports 500+ cryptocurrencies and all major fiat currencies, making it equally useful for spot conversions, invoice calculations, and portfolio bookkeeping.`
      ],
      inputs: [
      `The two required inputs are the source currency and the target currency. Both fields accept crypto tickers (BTC, ETH, SOL, USDT) and major fiat currencies (USD, EUR, GBP, JPY, CAD). The amount field supports any decimal value — from fractional satoshi amounts to large institutional positions. Prices are fetched live from CoinGecko and refresh automatically.`,
      `The converter displays mid-market rates, not bid/ask spread-adjusted exchange rates. Your actual execution will include a spread and possibly maker/taker fees. For a precise after-fee equivalent, apply your exchange fee to the converted output, or use the Profit Calculator which has a dedicated fee field. During high volatility, refresh before confirming any position size.`
      ],
    },
    es: {
      how: [
      `El Conversor Cripto traduce cualquier cantidad de criptomoneda a otra moneda digital o fiat usando precios de mercado en tiempo real. Selecciona tu activo de origen, escribe un importe, elige la moneda objetivo y el resultado se actualiza al instante. Úsalo antes de colocar una orden para confirmar exactamente cuánto equivale tu posición objetivo, eliminando errores aritméticos manuales.`,
      `Para comparar valores en varias monedas a la vez, abre el conversor junto con el formulario de orden de tu exchange. Introduce el equivalente en fiat que quieres gastar y copia el resultado directamente en tu ticket de trading. El conversor soporta más de 500 criptomonedas y todas las principales monedas fiat, siendo útil para conversiones spot, cálculos de facturas y contabilidad de cartera.`
      ],
      inputs: [
      `Los dos campos requeridos son la moneda de origen y la moneda de destino. Ambos aceptan tickers cripto (BTC, ETH, SOL, USDT) y monedas fiat principales (USD, EUR, GBP, JPY). El campo de importe acepta cualquier valor decimal. Los precios se obtienen en vivo desde CoinGecko y se actualizan automáticamente.`,
      `El conversor muestra tasas de mercado medio, no tasas ajustadas por spread bid/ask. Tu ejecución real incluirá un spread y posiblemente comisiones maker/taker. Para un equivalente preciso después de comisiones, aplica la tasa de tu exchange al resultado, o usa la Calculadora de Ganancias que incluye un campo dedicado para comisiones.`
      ],
    },
    pt: {
      how: [
      `O Conversor Cripto traduz qualquer valor de criptomoeda para outra moeda digital ou fiat usando preços de mercado em tempo real. Selecione seu ativo de origem, insira um valor, escolha a moeda de destino e o resultado é atualizado instantaneamente. Use-o antes de fazer um pedido para confirmar exatamente quanto equivale sua posição desejada.`,
      `Para comparar valores em várias moedas ao mesmo tempo, abra o conversor junto ao formulário de ordem da sua exchange. Insira o equivalente em fiat que deseja gastar e copie o resultado diretamente para o ticket de negociação. O conversor suporta mais de 500 criptomoedas e todas as principais moedas fiat.`
      ],
      inputs: [
      `Os dois campos obrigatórios são a moeda de origem e a moeda de destino. Ambos aceitam tickers cripto (BTC, ETH, SOL) e moedas fiat principais (USD, EUR, BRL). O campo de valor aceita qualquer decimal. Os preços são obtidos ao vivo do CoinGecko e atualizam automaticamente.`,
      `O conversor exibe taxas de mercado médio, não taxas ajustadas pelo spread bid/ask. Sua execução real incluirá um spread e possivelmente taxas maker/taker. Para um equivalente preciso após taxas, aplique a taxa da sua exchange ao resultado obtido.`
      ],
    },
    tr: {
      how: [
      `Kripto Dönüştürücü, gerçek zamanlı piyasa fiyatlarını kullanarak herhangi bir kripto para miktarını başka bir kripto veya fiat para birimine çevirir. Kaynak varlığınızı seçin, bir miktar girin, hedef para birimini belirleyin ve sonuç anında güncellenir. Bir emir vermeden önce, hedef pozisyonunuzun tam karşılığını doğrulamak için kullanın.`,
      `Aynı anda birden fazla para biriminde değer karşılaştırmak için dönüştürücüyü exchange emir formuyla birlikte açın. Harcamak istediğiniz fiat karşılığını girin ve sonucu doğrudan işlem biletinize kopyalayın. Dönüştürücü 500'den fazla kripto para ve tüm başlıca fiat para birimlerini destekler.`
      ],
      inputs: [
      `İki gerekli alan kaynak para birimi ve hedef para birimidir. Her ikisi de kripto tickerlarını (BTC, ETH, SOL) ve başlıca fiat para birimlerini (USD, EUR, TRY) kabul eder. Miktar alanı herhangi bir ondalık değeri destekler. Fiyatlar CoinGecko'dan canlı olarak alınır.`,
      `Dönüştürücü, bid/ask spread'i ayarlanmış oranlar değil, orta piyasa oranlarını gösterir. Gerçek işleminiz bir spread ve olası maker/taker ücretlerini içerecektir. Ücret sonrası kesin karşılık için, exchange ücret oranınızı dönüştürülen sonuca uygulayın.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो कन्वर्टर रियल-टाइम मार्केट प्राइस का उपयोग करके किसी भी क्रिप्टोकरेंसी को दूसरी कॉइन या फिएट करेंसी में बदलता है। अपना सोर्स एसेट चुनें, राशि टाइप करें, टार्गेट करेंसी चुनें और रिजल्ट तुरंत अपडेट हो जाता है। ऑर्डर देने से पहले इसका उपयोग करें।`,
      `एक साथ कई करेंसी में वैल्यू कम्पेयर करने के लिए, कन्वर्टर को अपने एक्सचेंज ऑर्डर फॉर्म के साथ खोलें। जो फिएट अमाउंट खर्च करना चाहते हैं वह दर्ज करें और रिजल्ट को सीधे ट्रेड टिकट में कॉपी करें। कन्वर्टर 500+ क्रिप्टोकरेंसी और सभी प्रमुख फिएट करेंसी सपोर्ट करता है।`
      ],
      inputs: [
      `दो जरूरी इनपुट सोर्स करेंसी और टार्गेट करेंसी हैं। दोनों फील्ड क्रिप्टो टिकर (BTC, ETH, SOL) और प्रमुख फिएट करेंसी (USD, EUR, INR) स्वीकार करते हैं। प्राइस CoinGecko से लाइव फेच होते हैं।`,
      `कन्वर्टर मिड-मार्केट रेट दिखाता है, bid/ask स्प्रेड-एडजस्टेड रेट नहीं। आपके असली एक्जीक्यूशन में स्प्रेड और maker/taker फीस शामिल होगी। सटीक after-fee इक्विवेलेंट के लिए, कन्वर्टेड आउटपुट पर अपनी एक्सचेंज फीस लगाएं।`
      ],
    },
    ru: {
      how: [
      `Крипто-конвертер переводит любую сумму криптовалюты в другую монету или фиатную валюту по актуальным рыночным ценам в реальном времени. Выберите исходный актив, введите сумму, укажите целевую валюту — результат обновляется мгновенно. Используйте перед размещением ордера, чтобы точно знать, сколько одного актива эквивалентно нужной позиции в другом.`,
      `Для одновременного сравнения стоимости в нескольких валютах откройте конвертер рядом с формой ордера на бирже. Введите фиатный эквивалент суммы, которую хотите потратить, и скопируйте результат прямо в тикет сделки. Конвертер поддерживает 500+ криптовалют и все основные фиатные валюты.`
      ],
      inputs: [
      `Два обязательных поля — исходная и целевая валюта. Оба принимают тикеры криптовалют (BTC, ETH, SOL, USDT) и основные фиатные валюты (USD, EUR, RUB). Поле суммы принимает любые дробные значения. Цены загружаются в реальном времени с CoinGecko.`,
      `Конвертер показывает среднерыночные курсы, а не курсы с учётом bid/ask спреда. Реальное исполнение ордера будет включать спред и комиссии maker/taker. Для точного значения после комиссий примените ставку комиссии биржи к полученному результату или воспользуйтесь Калькулятором прибыли со встроенным полем для комиссий.`
      ],
    },
  },
  'profit-calculator': {
    en: {
      how: [
      `The Crypto Profit Calculator computes your exact profit or loss from any trade by factoring in entry price, exit price, position size, and trading fees. Start by selecting Long or Short mode, then search for your coin to auto-fill the current market price or type a custom price manually. Toggle between Investment ($) mode and Quantity mode depending on how you think about your position size.`,
      `Enter your entry and exit prices, specify your investment or quantity, add your exchange fee percentages, and the calculator instantly returns gross profit, net profit after fees, ROI, and effective cost basis. Run two scenarios back-to-back — first with your target exit price and then with your stop-loss level — to compare the upside potential against the downside risk before committing to the trade.`
      ],
      inputs: [
      `Entry price and exit price are the core inputs; leaving exit price blank defaults to the current CoinGecko live price. The investment field accepts a dollar amount, while quantity mode accepts the number of tokens. The fee fields take percentage values matching your exchange's maker or taker rate — always include both entry and exit fees for an accurate net result.`,
      `For short positions, enter the price you opened the short as 'entry' and your closing target as 'exit' — the direction is handled automatically. The effective price fields reveal your true cost basis and net exit price after all fees. If you're analyzing a closed trade, enter the exact executed prices rather than the order prices to get precise historical profit or loss figures.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Ganancias Cripto calcula tu beneficio o pérdida exacta de cualquier operación considerando el precio de entrada, precio de salida, tamaño de posición y comisiones. Comienza seleccionando modo Largo o Corto, luego busca tu moneda para autocompletar el precio de mercado actual o escribe un precio personalizado.`,
      `Introduce los precios de entrada y salida, especifica tu inversión o cantidad, añade los porcentajes de comisión y la calculadora devuelve al instante el beneficio bruto, beneficio neto, ROI y precio de costo efectivo. Ejecuta dos escenarios seguidos — primero con tu precio objetivo y luego con tu nivel de stop-loss — para comparar el potencial alcista frente al riesgo bajista.`
      ],
      inputs: [
      `El precio de entrada y el precio de salida son los inputs principales; dejar el precio de salida en blanco usa el precio en tiempo real de CoinGecko. El campo de inversión acepta un importe en dólares, mientras que el modo de cantidad acepta el número de tokens. Los campos de comisión toman valores porcentuales.`,
      `Para posiciones cortas, introduce el precio al que abriste el corto como 'entrada' y tu objetivo de cierre como 'salida'. Los campos de precio efectivo muestran tu precio de costo real y precio de salida neto después de todas las comisiones.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Lucro Cripto calcula seu lucro ou prejuízo exato de qualquer negociação considerando preço de entrada, saída, tamanho da posição e taxas. Comece selecionando modo Compra ou Venda, depois pesquise sua moeda para preencher automaticamente o preço atual ou digite um preço personalizado.`,
      `Insira os preços de entrada e saída, especifique seu investimento ou quantidade, adicione as porcentagens de taxa e a calculadora retorna instantaneamente lucro bruto, lucro líquido, ROI e base de custo efetiva. Execute dois cenários — primeiro com seu preço alvo e depois com seu stop-loss — para comparar potencial de alta com risco de queda.`
      ],
      inputs: [
      `Preço de entrada e preço de saída são os inputs principais; deixar o preço de saída em branco usa o preço ao vivo do CoinGecko. O campo de investimento aceita um valor em dólar, enquanto o modo de quantidade aceita o número de tokens. Os campos de taxa aceitam valores percentuais.`,
      `Para posições vendidas, insira o preço que você abriu a venda como 'entrada' e seu alvo de fechamento como 'saída'. Os campos de preço efetivo revelam sua base de custo real e preço de saída líquido após todas as taxas.`
      ],
    },
    tr: {
      how: [
      `Kripto Kâr Hesaplayıcısı, giriş fiyatı, çıkış fiyatı, pozisyon büyüklüğü ve işlem ücretlerini dikkate alarak herhangi bir işlemden elde edeceğiniz kâr veya zararı hesaplar. Long veya Short modunu seçin, ardından güncel piyasa fiyatını otomatik doldurmak için coin'inizi arayın veya özel bir fiyat girin.`,
      `Giriş ve çıkış fiyatlarını, yatırım tutarını veya miktarı girin, exchange ücret yüzdelerinizi ekleyin; hesaplayıcı brüt kâr, net kâr, ROI ve efektif maliyet bazını anında gösterir. Hedef çıkış fiyatınızla ve stop-loss seviyenizle iki senaryo çalıştırın.`
      ],
      inputs: [
      `Giriş fiyatı ve çıkış fiyatı temel girdilerdir; çıkış fiyatını boş bırakmak CoinGecko canlı fiyatını kullanır. Yatırım alanı dolar tutarı kabul ederken miktar modu token sayısını kabul eder. Ücret alanları exchange'inizin maker veya taker oranıyla eşleşen yüzde değerlerini alır.`,
      `Short pozisyonlar için short'u açtığınız fiyatı 'giriş', kapanış hedefinizi 'çıkış' olarak girin. Efektif fiyat alanları, tüm ücretler dahil gerçek maliyet bazını ve net çıkış fiyatını gösterir.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो प्रॉफिट कैलकुलेटर एंट्री प्राइस, एग्जिट प्राइस, पोजीशन साइज और ट्रेडिंग फीस को ध्यान में रखते हुए किसी भी ट्रेड का सटीक प्रॉफिट या लॉस कैलकुलेट करता है। Long या Short मोड चुनें, फिर अपनी कॉइन सर्च करें।`,
      `एंट्री और एग्जिट प्राइस दर्ज करें, इनवेस्टमेंट या क्वांटिटी बताएं, एक्सचेंज फीस परसेंटेज जोड़ें — कैलकुलेटर तुरंत ग्रॉस प्रॉफिट, नेट प्रॉफिट, ROI और इफेक्टिव कॉस्ट बेसिस दिखाएगा।`
      ],
      inputs: [
      `एंट्री प्राइस और एग्जिट प्राइस मुख्य इनपुट हैं; एग्जिट प्राइस खाली छोड़ने पर CoinGecko का लाइव प्राइस उपयोग होता है। इनवेस्टमेंट फील्ड डॉलर अमाउंट स्वीकार करता है, क्वांटिटी मोड टोकन नंबर स्वीकार करता है।`,
      `Short पोजीशन के लिए, जिस प्राइस पर शॉर्ट ओपन किया वह 'एंट्री' में और क्लोजिंग टार्गेट 'एग्जिट' में डालें। इफेक्टिव प्राइस फील्ड सभी फीस के बाद असली कॉस्ट बेसिस दिखाते हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор прибыли криптовалют вычисляет точный доход или убыток по любой сделке с учётом цены входа, цены выхода, размера позиции и торговых комиссий. Выберите режим Лонг или Шорт, затем найдите монету для автоподстановки текущей рыночной цены или введите произвольную цену вручную.`,
      `Введите цены входа и выхода, укажите инвестицию или количество токенов, добавьте проценты комиссий — калькулятор мгновенно покажет валовую прибыль, чистую прибыль, ROI и эффективную себестоимость. Запустите два сценария: с целевой ценой выхода и с уровнем стоп-лосса, чтобы сравнить потенциал роста с риском падения.`
      ],
      inputs: [
      `Цена входа и цена выхода — ключевые поля; если оставить выход пустым, используется актуальная цена CoinGecko. Поле инвестиции принимает сумму в долларах, режим количества — число токенов. Поля комиссий принимают процентные значения соответственно тарифам вашей биржи.`,
      `Для шорт-позиций введите цену открытия шорта как «вход», а целевой уровень закрытия — как «выход»: направление учитывается автоматически. Поля эффективной цены показывают реальную себестоимость и чистую цену выхода с учётом всех комиссий.`
      ],
    },
  },
  'mining-calculator': {
    en: {
      how: [
      `The Mining Calculator shows whether your hardware setup is profitable by comparing estimated daily revenue against your electricity and operational costs. Enter your hashrate, power consumption in watts, electricity rate per kWh, and pool fee percentage — the calculator returns daily, weekly, and monthly profit or loss projections alongside a break-even timeline.`,
      `Use it to evaluate hardware purchases before buying: enter the specs of the ASIC or GPU you're considering and your local electricity rate to see the payback period. Run two scenarios with the current Bitcoin price and a conservative 30% lower price to stress-test profitability under market downturns. Revisit the calculator whenever difficulty adjusts or your power rate changes.`
      ],
      inputs: [
      `Hashrate must match the unit your hardware reports — TH/s for ASIC miners, MH/s or GH/s for GPU rigs. Power consumption in watts comes from hardware specs; add 10–15% overhead for PSU inefficiency and cooling. Electricity rate is your billing rate in $/kWh — use your actual utility bill figure rather than a national average for accurate results.`,
      `Pool fee typically ranges from 0% to 2% depending on your mining pool. Block reward and network difficulty are pre-filled from live data but can be adjusted manually to model future scenarios. For a multi-GPU rig, sum the combined wattage and total hashrate across all cards before entering the values.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Minería muestra si tu configuración de hardware es rentable comparando los ingresos diarios estimados con tus costos de electricidad y operativos. Introduce tu hashrate, consumo de energía en vatios, tarifa eléctrica por kWh y porcentaje de comisión del pool para obtener proyecciones de ganancias o pérdidas.`,
      `Úsala para evaluar compras de hardware antes de adquirirlas: introduce las especificaciones del ASIC o GPU que estás considerando y tu tarifa eléctrica local para ver el período de recuperación de la inversión. Ejecuta escenarios con el precio actual de Bitcoin y uno 30% más bajo para probar la rentabilidad en mercados bajistas.`
      ],
      inputs: [
      `El hashrate debe coincidir con la unidad que reporta tu hardware — TH/s para mineros ASIC, MH/s o GH/s para rigs de GPU. El consumo de energía en vatios proviene de las especificaciones del hardware; añade un 10-15% de sobrecarga por ineficiencia de la fuente de alimentación. La tarifa eléctrica es tu tarifa de facturación en $/kWh.`,
      `La comisión del pool varía típicamente entre 0% y 2%. La recompensa por bloque y la dificultad de red se rellenan con datos en tiempo real pero pueden ajustarse manualmente para modelar escenarios futuros.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Mineração mostra se sua configuração de hardware é lucrativa comparando a receita diária estimada com seus custos de eletricidade e operacionais. Insira seu hashrate, consumo de energia em watts, tarifa de eletricidade por kWh e porcentagem de taxa do pool.`,
      `Use-a para avaliar compras de hardware: insira as especificações do ASIC ou GPU que está considerando e sua tarifa elétrica local para ver o período de retorno do investimento. Execute cenários com o preço atual do Bitcoin e um 30% mais baixo para testar a lucratividade em quedas de mercado.`
      ],
      inputs: [
      `O hashrate deve corresponder à unidade que seu hardware reporta — TH/s para mineradores ASIC, MH/s ou GH/s para rigs de GPU. O consumo de energia em watts vem das especificações do hardware; adicione 10-15% de overhead para ineficiência da fonte de alimentação.`,
      `A taxa do pool varia tipicamente de 0% a 2%. A recompensa de bloco e a dificuldade de rede são preenchidas com dados ao vivo, mas podem ser ajustadas manualmente.`
      ],
    },
    tr: {
      how: [
      `Madencilik Hesaplayıcısı, tahmini günlük geliri elektrik ve operasyonel maliyetlerinizle karşılaştırarak donanım kurulumunuzun kârlı olup olmadığını gösterir. Hashrate'inizi, watt cinsinden güç tüketiminizi, kWh başına elektrik tarifinizi ve havuz ücreti yüzdesini girin.`,
      `Donanım satın almadan önce değerlendirmek için kullanın: düşündüğünüz ASIC veya GPU'nun özelliklerini ve yerel elektrik tarifinizi girerek geri ödeme süresini görün. Mevcut Bitcoin fiyatıyla ve %30 daha düşük fiyatla iki senaryo çalıştırın.`
      ],
      inputs: [
      `Hashrate, donanımınızın raporladığı birimle eşleşmelidir — ASIC madenciler için TH/s, GPU rigs için MH/s veya GH/s. Watt cinsinden güç tüketimi donanım özelliklerinden gelir; güç kaynağı verimsizliği için %10-15 ek yük ekleyin.`,
      `Havuz ücreti genellikle %0 ile %2 arasında değişir. Blok ödülü ve ağ zorluğu canlı verilerle önceden doldurulur ancak gelecekteki senaryoları modellemek için manuel olarak ayarlanabilir.`
      ],
    },
    hi: {
      how: [
      `माइनिंग कैलकुलेटर अनुमानित दैनिक राजस्व की तुलना आपकी बिजली और परिचालन लागत से करके दिखाता है कि आपका हार्डवेयर सेटअप लाभदायक है या नहीं। अपना हैशरेट, वाट में पावर कंजम्प्शन, प्रति kWh बिजली दर और पूल फीस प्रतिशत दर्ज करें।`,
      `हार्डवेयर खरीदने से पहले मूल्यांकन के लिए उपयोग करें: जिस ASIC या GPU पर विचार कर रहे हैं उसकी स्पेसिफिकेशन और अपनी स्थानीय बिजली दर दर्ज करें। वर्तमान Bitcoin मूल्य और 30% कम मूल्य के साथ दो परिदृश्य चलाएं।`
      ],
      inputs: [
      `हैशरेट वही यूनिट में होना चाहिए जो आपका हार्डवेयर रिपोर्ट करता है — ASIC माइनर्स के लिए TH/s, GPU रिग्स के लिए MH/s। वाट में पावर कंजम्प्शन हार्डवेयर स्पेक्स से आता है; PSU अक्षमता के लिए 10-15% ओवरहेड जोड़ें।`,
      `पूल फीस आमतौर पर 0% से 2% के बीच होती है। ब्लॉक रिवॉर्ड और नेटवर्क डिफिकल्टी लाइव डेटा से प्री-फिल होती है लेकिन भविष्य के परिदृश्यों के लिए मैन्युअली एडजस्ट की जा सकती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор майнинга показывает, прибыльна ли ваша конфигурация оборудования, сравнивая расчётный суточный доход с затратами на электроэнергию и операционными расходами. Введите хешрейт, потребляемую мощность в ваттах, тариф на электричество и процент комиссии пула.`,
      `Используйте для оценки покупки оборудования: введите характеристики рассматриваемого ASIC или GPU и ваш тариф на электроэнергию, чтобы увидеть срок окупаемости. Запустите сценарии при текущей цене Bitcoin и при цене на 30% ниже для стресс-теста прибыльности в медвежьем рынке.`
      ],
      inputs: [
      `Хешрейт должен соответствовать единице, которую выдаёт ваше оборудование — TH/s для ASIC, MH/s или GH/s для GPU-риг. Мощность потребления в ваттах берётся из характеристик оборудования; добавьте 10–15% накладных расходов на КПД блока питания.`,
      `Комиссия пула обычно составляет от 0% до 2%. Вознаграждение за блок и сложность сети заполняются автоматически из актуальных данных, но их можно скорректировать вручную для моделирования будущих сценариев.`
      ],
    },
  },
  'dca-calculator': {
    en: {
      how: [
      `The DCA Calculator backtests a dollar-cost averaging strategy against real historical price data, showing exactly how a recurring purchase plan would have performed over your chosen period. Select a cryptocurrency, set a start date, choose a purchase frequency (daily, weekly, bi-weekly, or monthly), and enter your recurring buy amount to see total invested, final portfolio value, average cost basis, and overall ROI.`,
      `Use preset buttons for popular coins and time horizons to quickly explore different scenarios. Compare a monthly DCA into Bitcoin over 3 years against a weekly DCA to understand how frequency affects average cost. The results table breaks down each purchase date, amount, coin price, and cumulative holding value so you can see exactly how volatility affected your average entry price.`
      ],
      inputs: [
      `The key inputs are the cryptocurrency (searched by name or ticker), start date (how far back to begin the simulation), purchase frequency, and recurring buy amount in USD. The calculator pulls historical OHLC price data to simulate actual purchase prices on each scheduled date rather than theoretical averages.`,
      `Start date coverage depends on when the asset was listed — most major coins support up to 5 years of history. If you set a start date before a coin's listing, the simulation begins from the actual listing date. For stablecoins or very new assets, historical data may be limited; the calculator flags this and adjusts the range automatically.`
      ],
    },
    es: {
      how: [
      `La Calculadora DCA realiza un backtest de una estrategia de promediado del costo en dólares contra datos históricos de precios reales, mostrando exactamente cómo habría funcionado un plan de compras recurrentes durante tu período elegido. Selecciona una criptomoneda, establece una fecha de inicio, elige una frecuencia de compra y introduce tu importe de compra recurrente.`,
      `Usa los botones predefinidos para monedas populares y horizontes temporales para explorar rápidamente diferentes escenarios. Compara un DCA mensual en Bitcoin durante 3 años contra uno semanal para entender cómo afecta la frecuencia al precio promedio de entrada.`
      ],
      inputs: [
      `Los inputs clave son la criptomoneda, la fecha de inicio, la frecuencia de compra y el importe de compra recurrente en USD. La calculadora utiliza datos históricos de precios OHLC para simular precios de compra reales en cada fecha programada.`,
      `La cobertura de la fecha de inicio depende de cuándo se listó el activo. Si estableces una fecha de inicio anterior al listado de una moneda, la simulación comienza desde la fecha de listado real.`
      ],
    },
    pt: {
      how: [
      `A Calculadora DCA faz um backtest de uma estratégia de custo médio em dólar contra dados históricos de preços reais, mostrando exatamente como um plano de compras recorrentes teria se saído durante o período escolhido. Selecione uma criptomoeda, defina uma data de início, escolha uma frequência de compra e insira seu valor de compra recorrente.`,
      `Use os botões predefinidos para moedas populares e horizontes de tempo para explorar rapidamente diferentes cenários. Compare um DCA mensal em Bitcoin ao longo de 3 anos com um semanal para entender como a frequência afeta o preço médio de entrada.`
      ],
      inputs: [
      `Os inputs principais são a criptomoeda, data de início, frequência de compra e valor de compra recorrente em USD. A calculadora usa dados históricos de preços OHLC para simular preços de compra reais em cada data programada.`,
      `A cobertura da data de início depende de quando o ativo foi listado. Se você definir uma data de início antes da listagem de uma moeda, a simulação começa a partir da data de listagem real.`
      ],
    },
    tr: {
      how: [
      `DCA Hesaplayıcısı, gerçek tarihsel fiyat verilerine karşı bir dolar maliyet ortalaması stratejisinin geriye dönük testini yaparak, seçtiğiniz dönem boyunca tekrarlayan bir satın alma planının nasıl performans gösterdiğini gösterir. Bir kripto para seçin, başlangıç tarihi belirleyin, satın alma sıklığı seçin ve tekrarlayan satın alma tutarınızı girin.`,
      `Farklı senaryoları hızla keşfetmek için popüler coinler ve zaman dilimleri için hazır ayar düğmelerini kullanın. 3 yıl boyunca Bitcoin'e yapılan aylık DCA'yı haftalık DCA ile karşılaştırarak sıklığın ortalama giriş fiyatını nasıl etkilediğini anlayın.`
      ],
      inputs: [
      `Temel girdiler kripto para, başlangıç tarihi, satın alma sıklığı ve USD cinsinden tekrarlayan satın alma tutarıdır. Hesaplayıcı, her planlanan tarihte gerçek satın alma fiyatlarını simüle etmek için tarihsel OHLC fiyat verilerini kullanır.`,
      `Başlangıç tarihi kapsamı varlığın ne zaman listelendiğine bağlıdır. Bir madeni paranın listelenmesinden önce bir başlangıç tarihi belirlerseniz, simülasyon gerçek listeleme tarihinden başlar.`
      ],
    },
    hi: {
      how: [
      `DCA कैलकुलेटर वास्तविक ऐतिहासिक मूल्य डेटा के खिलाफ डॉलर-कॉस्ट एवरेजिंग रणनीति का बैकटेस्ट करता है, दिखाता है कि आपके चुने गए अवधि में एक आवर्ती खरीद योजना कैसे प्रदर्शन करती। एक क्रिप्टोकरेंसी चुनें, स्टार्ट डेट सेट करें, खरीद फ्रीक्वेंसी चुनें और आवर्ती खरीद राशि दर्ज करें।`,
      `अलग-अलग परिदृश्यों को जल्दी एक्सप्लोर करने के लिए लोकप्रिय कॉइन और टाइम होराइजन के लिए प्रीसेट बटन का उपयोग करें। 3 साल में Bitcoin में मासिक DCA की तुलना साप्ताहिक DCA से करें।`
      ],
      inputs: [
      `मुख्य इनपुट हैं क्रिप्टोकरेंसी, स्टार्ट डेट, खरीद फ्रीक्वेंसी, और USD में आवर्ती खरीद राशि। कैलकुलेटर प्रत्येक शेड्यूल्ड डेट पर वास्तविक खरीद मूल्यों को सिमुलेट करने के लिए ऐतिहासिक OHLC मूल्य डेटा का उपयोग करता है।`,
      `स्टार्ट डेट कवरेज इस बात पर निर्भर करती है कि एसेट कब लिस्ट हुई। अगर आप किसी कॉइन की लिस्टिंग से पहले की तारीख सेट करते हैं, तो सिमुलेशन वास्तविक लिस्टिंग डेट से शुरू होती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор DCA тестирует стратегию усреднения долларовой стоимости на реальных исторических данных, показывая, как план регулярных покупок работал бы за выбранный период. Выберите криптовалюту, установите дату начала, частоту покупок и сумму каждой покупки.`,
      `Используйте предустановленные кнопки для популярных монет и временных горизонтов для быстрого сравнения сценариев. Сравните ежемесячный DCA в Bitcoin за 3 года с еженедельным, чтобы понять, как частота влияет на среднюю цену входа.`
      ],
      inputs: [
      `Ключевые поля: криптовалюта, дата начала, частота покупок и сумма разового пополнения в USD. Калькулятор использует исторические данные OHLC для симуляции реальных цен покупки на каждую запланированную дату.`,
      `Доступная история зависит от даты листинга актива. Если указать дату раньше листинга монеты, симуляция начнётся с фактической даты листинга.`
      ],
    },
  },
  'tax-calculator': {
    en: {
      how: [
      `The Crypto Tax Calculator estimates your capital gains or losses from cryptocurrency trades by applying FIFO (first-in, first-out) cost basis methodology. Enter each trade with its date, asset, buy price, sell price, and quantity to get a taxable gain or loss per transaction alongside short-term and long-term categorization based on your holding period.`,
      `Use it to prepare for tax season by running through your transaction history and seeing which trades generated the largest tax liability. For wash-sale planning, run hypothetical sell scenarios to see the estimated tax impact before executing. Export the results summary to cross-reference with your exchange's tax report or share with your accountant.`
      ],
      inputs: [
      `Each transaction requires an asset symbol, trade date, quantity, buy (cost basis) price, and sell price. The tax rate fields accept your local short-term and long-term capital gains rates — in the US, short-term gains are taxed as ordinary income and long-term gains use reduced rates for assets held over 12 months. The holding period is calculated automatically from the dates you enter.`,
      `For accurate results, include all fees paid during the purchase and sale as they reduce your taxable gain. The calculator uses FIFO by default, meaning the earliest-acquired coins are treated as sold first. If your jurisdiction allows LIFO or specific lot identification, adjust your entries accordingly. Always consult a qualified tax professional for jurisdiction-specific advice.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Impuestos Cripto estima tus ganancias o pérdidas de capital de operaciones con criptomonedas aplicando la metodología de costo base FIFO (primero en entrar, primero en salir). Introduce cada operación con su fecha, activo, precio de compra, precio de venta y cantidad.`,
      `Úsala para prepararte para la temporada fiscal ejecutando tu historial de transacciones y viendo qué operaciones generaron la mayor obligación fiscal. Exporta el resumen de resultados para cotejarlo con el informe fiscal de tu exchange.`
      ],
      inputs: [
      `Cada transacción requiere símbolo del activo, fecha de operación, cantidad, precio de compra (base de costo) y precio de venta. Los campos de tasa impositiva aceptan tus tasas locales de ganancias de capital a corto y largo plazo.`,
      `Para resultados precisos, incluye todas las comisiones pagadas durante la compra y venta, ya que reducen tu ganancia imponible. La calculadora usa FIFO de forma predeterminada. Siempre consulta a un profesional fiscal cualificado.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Impostos Cripto estima seus ganhos ou perdas de capital em negociações de criptomoedas aplicando a metodologia de base de custo FIFO. Insira cada negociação com sua data, ativo, preço de compra, preço de venda e quantidade.`,
      `Use-a para se preparar para a temporada fiscal executando seu histórico de transações e vendo quais negociações geraram maior obrigação fiscal. Exporte o resumo dos resultados para comparar com o relatório fiscal da sua exchange.`
      ],
      inputs: [
      `Cada transação requer símbolo do ativo, data da negociação, quantidade, preço de compra e preço de venda. Os campos de alíquota de imposto aceitam suas taxas locais de ganhos de capital de curto e longo prazo.`,
      `Para resultados precisos, inclua todas as taxas pagas durante a compra e venda, pois elas reduzem seu ganho tributável. A calculadora usa FIFO por padrão. Sempre consulte um profissional fiscal qualificado.`
      ],
    },
    tr: {
      how: [
      `Kripto Vergi Hesaplayıcısı, FIFO (ilk giren, ilk çıkar) maliyet tabanı metodolojisini uygulayarak kripto para işlemlerindeki sermaye kazancı veya kayıplarınızı tahmin eder. Her işlemi tarih, varlık, alış fiyatı, satış fiyatı ve miktarıyla girin.`,
      `Vergi dönemine hazırlanmak için işlem geçmişinizi çalıştırın ve hangi işlemlerin en büyük vergi yükümlülüğünü oluşturduğunu görün. Sonuç özetini exchange'inizin vergi raporu ile karşılaştırmak için dışa aktarın.`
      ],
      inputs: [
      `Her işlem için varlık sembolü, işlem tarihi, miktar, alış fiyatı ve satış fiyatı gereklidir. Vergi oranı alanları yerel kısa vadeli ve uzun vadeli sermaye kazancı oranlarınızı kabul eder.`,
      `Doğru sonuçlar için alım ve satım sırasında ödenen tüm ücretleri dahil edin, çünkü bunlar vergilendirilebilir kazancınızı azaltır. Hesaplayıcı varsayılan olarak FIFO kullanır.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो टैक्स कैलकुलेटर FIFO (फर्स्ट-इन, फर्स्ट-आउट) कॉस्ट बेसिस मेथडोलॉजी लागू करके क्रिप्टोकरेंसी ट्रेड्स से आपके कैपिटल गेन या लॉस का अनुमान लगाता है। प्रत्येक ट्रेड को उसकी तारीख, एसेट, खरीद मूल्य, बिक्री मूल्य और मात्रा के साथ दर्ज करें।`,
      `टैक्स सीजन की तैयारी के लिए अपना ट्रांजेक्शन हिस्ट्री चलाएं और देखें कि किन ट्रेड्स ने सबसे बड़ी टैक्स देनदारी उत्पन्न की। रिजल्ट सारांश को अपने एक्सचेंज की टैक्स रिपोर्ट के साथ क्रॉस-रेफरेंस करने के लिए एक्सपोर्ट करें।`
      ],
      inputs: [
      `प्रत्येक ट्रांजेक्शन के लिए एसेट सिंबल, ट्रेड डेट, क्वांटिटी, खरीद मूल्य और बिक्री मूल्य आवश्यक है। टैक्स रेट फील्ड आपकी स्थानीय शॉर्ट-टर्म और लॉन्ग-टर्म कैपिटल गेन दरें स्वीकार करते हैं।`,
      `सटीक परिणामों के लिए, खरीद और बिक्री के दौरान भुगतान की गई सभी फीस शामिल करें क्योंकि वे आपके कर योग्य लाभ को कम करती हैं। कैलकुलेटर डिफ़ॉल्ट रूप से FIFO का उपयोग करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор налогов на криптовалюту рассчитывает прирост или убыток капитала от криптосделок по методу FIFO (первым пришёл — первым продан). Введите каждую сделку с датой, активом, ценой покупки, ценой продажи и количеством.`,
      `Используйте для подготовки к налоговому сезону: проведите историю транзакций и увидите, какие сделки создали наибольшую налоговую нагрузку. Экспортируйте сводку результатов для сверки с налоговым отчётом биржи.`
      ],
      inputs: [
      `Каждая транзакция требует тикера актива, даты, количества, цены покупки и цены продажи. Поля налоговых ставок принимают ваши местные ставки краткосрочного и долгосрочного прироста капитала.`,
      `Для точных результатов включите все комиссии, уплаченные при покупке и продаже — они уменьшают налогооблагаемую прибыль. Калькулятор по умолчанию использует FIFO. Всегда консультируйтесь с квалифицированным налоговым специалистом.`
      ],
    },
  },
  'what-if': {
    en: {
      how: [
      `The What If Calculator answers the classic question: 'What would my investment be worth today if I had bought X at price Y?' Enter a cryptocurrency, a hypothetical purchase price (or a past date to auto-fill the historical price), and your investment amount to instantly see the current value, profit or loss, and ROI of that scenario.`,
      `Use it to explore missed opportunities, evaluate past decision-making, or project forward using a custom future price. You can also reverse the calculation — enter a target value and see what initial investment would have been needed to reach it. The results are displayed alongside the percentage change and an annualized return for multi-year scenarios.`
      ],
      inputs: [
      `Required inputs are the cryptocurrency, the entry price (either typed manually or pulled automatically from a selected past date), and the investment amount in USD. The current price is fetched live from CoinGecko and updates automatically. All three inputs update results in real time — no submit button needed.`,
      `For forward projections, enter a custom 'current' price higher than your entry price to model a target scenario. For historical analysis, use the date picker to select a specific past date and the calculator fills the actual closing price for that day. Results include gross profit, net ROI, and the multiplier (e.g., 4.2× your money).`
      ],
    },
    es: {
      how: [
      `La Calculadora ¿Y Si? responde la pregunta clásica: '¿Cuánto valdría mi inversión hoy si hubiera comprado X al precio Y?' Introduce una criptomoneda, un precio de compra hipotético y tu importe de inversión para ver al instante el valor actual, ganancia o pérdida y ROI.`,
      `Úsala para explorar oportunidades perdidas, evaluar decisiones pasadas o proyectar hacia adelante usando un precio futuro personalizado. También puedes invertir el cálculo: introduce un valor objetivo y ve qué inversión inicial habría sido necesaria.`
      ],
      inputs: [
      `Los inputs requeridos son la criptomoneda, el precio de entrada (escrito manualmente o extraído automáticamente de una fecha pasada seleccionada) y el importe de inversión en USD. El precio actual se obtiene en vivo de CoinGecko.`,
      `Para proyecciones hacia adelante, introduce un precio 'actual' personalizado más alto que tu precio de entrada para modelar un escenario objetivo. Para análisis histórico, usa el selector de fechas para seleccionar una fecha pasada específica.`
      ],
    },
    pt: {
      how: [
      `A Calculadora E Se? responde a pergunta clássica: 'Quanto valeria meu investimento hoje se eu tivesse comprado X ao preço Y?' Insira uma criptomoeda, um preço de compra hipotético e seu valor de investimento para ver instantaneamente o valor atual, lucro ou prejuízo e ROI.`,
      `Use-a para explorar oportunidades perdidas, avaliar decisões passadas ou projetar para frente usando um preço futuro personalizado. Você também pode inverter o cálculo — insira um valor alvo e veja qual investimento inicial teria sido necessário.`
      ],
      inputs: [
      `Os inputs necessários são a criptomoeda, o preço de entrada e o valor do investimento em USD. O preço atual é obtido ao vivo do CoinGecko e atualiza automaticamente.`,
      `Para projeções futuras, insira um preço 'atual' personalizado maior que seu preço de entrada para modelar um cenário alvo. Para análise histórica, use o seletor de datas para selecionar uma data específica do passado.`
      ],
    },
    tr: {
      how: [
      `Ya Öyle Olsaydı Hesaplayıcısı klasik soruyu yanıtlar: 'X'i Y fiyatından satın almış olsaydım, yatırımım bugün ne kadar değer olurdu?' Bir kripto para, varsayımsal bir satın alma fiyatı ve yatırım tutarınızı girerek mevcut değeri, kâr veya zararı ve ROI'yi anında görün.`,
      `Kaçırılan fırsatları keşfetmek, geçmiş kararları değerlendirmek veya özel bir gelecek fiyatı kullanarak ileriye yönelik projeksiyon yapmak için kullanın. Hesaplamayı tersine de çevirebilirsiniz — bir hedef değer girin ve buna ulaşmak için gereken başlangıç yatırımını görün.`
      ],
      inputs: [
      `Gerekli girdiler kripto para, giriş fiyatı (manuel girilmiş veya seçilen geçmiş tarihten otomatik doldurulmuş) ve USD cinsinden yatırım tutarıdır. Mevcut fiyat CoinGecko'dan canlı olarak alınır.`,
      `İleriye yönelik projeksiyonlar için, hedef senaryoyu modellemek üzere giriş fiyatınızdan daha yüksek özel bir 'mevcut' fiyat girin. Tarihsel analiz için tarih seçiciyi kullanarak belirli bir geçmiş tarihi seçin.`
      ],
    },
    hi: {
      how: [
      `What If कैलकुलेटर क्लासिक सवाल का जवाब देता है: 'अगर मैंने X को Y कीमत पर खरीदा होता तो मेरा निवेश आज कितना होता?' एक क्रिप्टोकरेंसी, एक काल्पनिक खरीद मूल्य और अपनी निवेश राशि दर्ज करें।`,
      `छूटे हुए अवसरों को एक्सप्लोर करने, पिछले निर्णयों का मूल्यांकन करने या कस्टम भविष्य की कीमत का उपयोग करके आगे प्रोजेक्ट करने के लिए उपयोग करें।`
      ],
      inputs: [
      `जरूरी इनपुट हैं क्रिप्टोकरेंसी, एंट्री प्राइस और USD में निवेश राशि। वर्तमान मूल्य CoinGecko से लाइव फेच होता है।`,
      `आगे के अनुमानों के लिए, लक्ष्य परिदृश्य को मॉडल करने के लिए अपने एंट्री प्राइस से अधिक कस्टम 'वर्तमान' मूल्य दर्ज करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор «Что если» отвечает на классический вопрос: «Сколько стоила бы моя инвестиция сегодня, если бы я купил X по цене Y?» Введите криптовалюту, гипотетическую цену покупки и сумму инвестиции.`,
      `Используйте для анализа упущенных возможностей, оценки прошлых решений или прогнозирования с произвольной целевой ценой. Можно обратить расчёт: ввести целевое значение и узнать, какая начальная инвестиция потребовалась бы для его достижения.`
      ],
      inputs: [
      `Обязательные поля: криптовалюта, цена входа (введённая вручную или подтянутая автоматически из выбранной даты) и сумма инвестиции в USD. Текущая цена загружается с CoinGecko в реальном времени.`,
      `Для перспективных прогнозов введите произвольную «текущую» цену выше цены входа, чтобы смоделировать целевой сценарий. Для исторического анализа выберите дату в прошлом, и калькулятор подставит фактическую цену закрытия за тот день.`
      ],
    },
  },
  'position-size-calculator': {
    en: {
      how: [
      `The Position Size Calculator tells you exactly how many coins or dollars to deploy per trade based on how much of your account you're willing to risk. Enter your account balance, your risk percentage per trade (typically 1–2%), your entry price, and your stop-loss price — the calculator returns the exact position size in both USD and coin quantity.`,
      `Use it before every trade to maintain consistent risk discipline regardless of market conditions or conviction level. For trades with tight stops close to the entry, the position size will be larger; for trades with wide stops, it will be smaller — ensuring each trade risks the same dollar amount. This prevents one bad trade from significantly damaging your account.`
      ],
      inputs: [
      `Account balance is your total trading capital in USD. Risk percentage is the maximum portion of your account you will lose if the trade hits the stop-loss — 1% per trade is a common conservative standard. Entry price is your planned buy price and stop-loss is the price at which you will exit if the trade goes wrong.`,
      `The distance between entry and stop-loss is the key risk variable: a stop that is 5% below entry requires twice the position size compared to a stop 10% below to achieve the same dollar risk. If you're trading a coin worth less than $1, ensure the quantity field is showing a realistic coin count — very cheap assets can produce very large nominal quantities.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Tamaño de Posición te dice exactamente cuántas monedas o dólares desplegar por operación según cuánto de tu cuenta estás dispuesto a arriesgar. Introduce tu saldo de cuenta, tu porcentaje de riesgo por operación, tu precio de entrada y tu precio de stop-loss.`,
      `Úsala antes de cada operación para mantener una disciplina de riesgo consistente. Para operaciones con stops ajustados cerca de la entrada, el tamaño de posición será mayor; para operaciones con stops amplios, será menor.`
      ],
      inputs: [
      `El saldo de cuenta es tu capital total de trading en USD. El porcentaje de riesgo es la porción máxima de tu cuenta que perderás si la operación alcanza el stop-loss. El precio de entrada es tu precio de compra planificado y el stop-loss es el precio al que saldrás si la operación va mal.`,
      `La distancia entre entrada y stop-loss es la variable de riesgo clave. Un stop que está un 5% por debajo de la entrada requiere el doble del tamaño de posición comparado con un stop al 10% para lograr el mismo riesgo en dólares.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Tamanho de Posição diz exatamente quantas moedas ou dólares implantar por negociação com base em quanto de sua conta você está disposto a arriscar. Insira seu saldo de conta, porcentagem de risco por negociação, preço de entrada e stop-loss.`,
      `Use-a antes de cada negociação para manter disciplina de risco consistente. Para negociações com stops próximos à entrada, o tamanho da posição será maior; para negociações com stops amplos, será menor.`
      ],
      inputs: [
      `O saldo da conta é seu capital total de negociação em USD. A porcentagem de risco é a porção máxima da sua conta que você perderá se a negociação atingir o stop-loss.`,
      `A distância entre entrada e stop-loss é a variável de risco chave. Um stop 5% abaixo da entrada requer o dobro do tamanho de posição comparado a um stop 10% abaixo para alcançar o mesmo risco em dólar.`
      ],
    },
    tr: {
      how: [
      `Pozisyon Boyutu Hesaplayıcısı, hesabınızın ne kadarını riske atmak istediğinize göre işlem başına tam olarak kaç coin veya dolar konuşlandıracağınızı söyler. Hesap bakiyenizi, işlem başına risk yüzdenizi, giriş fiyatınızı ve stop-loss fiyatınızı girin.`,
      `Tutarlı risk disiplinini korumak için her işlemden önce kullanın. Girişe yakın sıkı stopu olan işlemler için pozisyon boyutu daha büyük olacak; geniş stoplu işlemler için daha küçük olacaktır.`
      ],
      inputs: [
      `Hesap bakiyesi USD cinsinden toplam işlem sermayenizdir. Risk yüzdesi, işlem stop-loss'a ulaşırsa hesabınızın kaybedileceği maksimum kısmıdır. Giriş fiyatı planladığınız alış fiyatı, stop-loss ise işlem ters giderse çıkacağınız fiyattır.`,
      `Giriş ve stop-loss arasındaki mesafe temel risk değişkenidir. Girişin %5 altındaki bir stop, aynı dolar riskini elde etmek için %10 altındaki bir stop ile karşılaştırıldığında iki katı pozisyon boyutu gerektirir.`
      ],
    },
    hi: {
      how: [
      `पोजीशन साइज कैलकुलेटर आपको बताता है कि आप अपने अकाउंट का कितना हिस्सा रिस्क करने को तैयार हैं, उसके आधार पर प्रति ट्रेड कितने कॉइन या डॉलर लगाने हैं। अपना अकाउंट बैलेंस, प्रति ट्रेड रिस्क प्रतिशत, एंट्री प्राइस और स्टॉप-लॉस प्राइस दर्ज करें।`,
      `हर ट्रेड से पहले सुसंगत रिस्क डिसिप्लिन बनाए रखने के लिए इसका उपयोग करें। एंट्री के करीब टाइट स्टॉप वाले ट्रेड के लिए पोजीशन साइज बड़ा होगा; वाइड स्टॉप वाले ट्रेड के लिए छोटा।`
      ],
      inputs: [
      `अकाउंट बैलेंस USD में आपकी कुल ट्रेडिंग कैपिटल है। रिस्क प्रतिशत आपके अकाउंट का वह अधिकतम हिस्सा है जो ट्रेड स्टॉप-लॉस हिट होने पर खो जाएगा।`,
      `एंट्री और स्टॉप-लॉस के बीच की दूरी मुख्य रिस्क वेरिएबल है। एंट्री के 5% नीचे स्टॉप के लिए समान डॉलर रिस्क हासिल करने के लिए 10% नीचे स्टॉप की तुलना में दोगुने पोजीशन साइज की आवश्यकता होती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор размера позиции показывает, сколько монет или долларов выставлять на сделку, исходя из того, какой процент счёта вы готовы рискнуть. Введите баланс счёта, процент риска на сделку, цену входа и уровень стоп-лосса.`,
      `Используйте перед каждой сделкой для поддержания дисциплины риска. Для сделок с тесным стопом размер позиции будет больше; с широким — меньше. Это гарантирует одинаковую долларовую потерю при любом стопе.`
      ],
      inputs: [
      `Баланс счёта — общий торговый капитал в USD. Процент риска — максимальная доля счёта, которую вы потеряете при срабатывании стоп-лосса. Цена входа — планируемая цена покупки, стоп-лосс — уровень выхода при неблагоприятном движении.`,
      `Расстояние между входом и стоп-лоссом — ключевая переменная риска: стоп на 5% ниже входа требует вдвое большего размера позиции по сравнению со стопом на 10% ниже при одинаковом долларовом риске.`
      ],
    },
  },
  'liquidation-calculator': {
    en: {
      how: [
      `The Liquidation Calculator tells you the exact price at which your leveraged position will be forcibly closed by the exchange. Enter your entry price, leverage multiplier, and whether you're long or short — the calculator instantly returns the liquidation price along with the percentage move required to trigger liquidation from your entry.`,
      `Use it before opening any leveraged position to set appropriate stop-losses above the liquidation level. If the liquidation price is uncomfortably close to current market price, reduce your leverage or increase your margin. Run the calculator with different leverage levels (5×, 10×, 20×) to see how dramatically liquidation risk changes with each step up.`
      ],
      inputs: [
      `Entry price is the price at which you open the position. Leverage multiplier (e.g., 10× means 10:1 leverage) determines how amplified your exposure is. For cross-margin mode, the liquidation price is based on your total account balance; for isolated margin, only the margin allocated to this trade is at risk.`,
      `Maintenance margin rate varies by exchange and asset — most perpetual futures markets use 0.5% to 1% maintenance margin. If you're unsure of your exchange's rate, check the contract specifications page. The calculator uses a standard rate by default, but entering your exchange's actual figure improves accuracy significantly.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Liquidación te indica el precio exacto al que tu posición apalancada será cerrada forzosamente por el exchange. Introduce tu precio de entrada, multiplicador de apalancamiento y si eres largo o corto.`,
      `Úsala antes de abrir cualquier posición apalancada para establecer stop-losses apropiados por encima del nivel de liquidación. Si el precio de liquidación está incómodamente cerca del precio de mercado actual, reduce tu apalancamiento o aumenta tu margen.`
      ],
      inputs: [
      `El precio de entrada es el precio al que abres la posición. El multiplicador de apalancamiento determina cuánto está amplificada tu exposición. Para el modo de margen cruzado, el precio de liquidación se basa en el saldo total de tu cuenta.`,
      `La tasa de margen de mantenimiento varía según el exchange y el activo. Si no estás seguro de la tasa de tu exchange, consulta la página de especificaciones del contrato.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Liquidação informa o preço exato no qual sua posição alavancada será fechada forçosamente pela exchange. Insira seu preço de entrada, multiplicador de alavancagem e se você está comprado ou vendido.`,
      `Use-a antes de abrir qualquer posição alavancada para definir stop-losses apropriados acima do nível de liquidação. Se o preço de liquidação estiver perigosamente próximo ao preço de mercado atual, reduza sua alavancagem ou aumente sua margem.`
      ],
      inputs: [
      `O preço de entrada é o preço no qual você abre a posição. O multiplicador de alavancagem determina o quanto sua exposição está amplificada.`,
      `A taxa de margem de manutenção varia por exchange e ativo. Se não tiver certeza da taxa da sua exchange, verifique a página de especificações do contrato.`
      ],
    },
    tr: {
      how: [
      `Likidasyon Hesaplayıcısı, kaldıraçlı pozisyonunuzun exchange tarafından zorla kapatılacağı tam fiyatı söyler. Giriş fiyatınızı, kaldıraç çarpanını ve long mu short mu olduğunuzu girin.`,
      `Herhangi bir kaldıraçlı pozisyon açmadan önce likidasyon seviyesinin üzerinde uygun stop-loss'lar belirlemek için kullanın. Likidasyon fiyatı mevcut piyasa fiyatına çok yakınsa kaldıracınızı azaltın veya teminatınızı artırın.`
      ],
      inputs: [
      `Giriş fiyatı, pozisyonu açtığınız fiyattır. Kaldıraç çarpanı, maruziyetinizin ne kadar büyütüldüğünü belirler. Çapraz marj modu için likidasyon fiyatı toplam hesap bakiyenize göre hesaplanır.`,
      `Bakım marjı oranı exchange ve varlığa göre değişir. Exchange oranınızdan emin değilseniz, sözleşme özellikleri sayfasını kontrol edin.`
      ],
    },
    hi: {
      how: [
      `लिक्विडेशन कैलकुलेटर आपको वह सटीक मूल्य बताता है जिस पर एक्सचेंज आपकी लीवरेज्ड पोजीशन को जबरदस्ती बंद कर देगा। अपना एंट्री प्राइस, लीवरेज मल्टीप्लायर और Long या Short दर्ज करें।`,
      `किसी भी लीवरेज्ड पोजीशन खोलने से पहले लिक्विडेशन लेवल के ऊपर उचित स्टॉप-लॉस सेट करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `एंट्री प्राइस वह मूल्य है जिस पर आप पोजीशन खोलते हैं। लीवरेज मल्टीप्लायर निर्धारित करता है कि आपका एक्सपोजर कितना बढ़ा हुआ है।`,
      `मेंटेनेंस मार्जिन रेट एक्सचेंज और एसेट के अनुसार अलग-अलग होती है। अगर आप अपने एक्सचेंज की दर के बारे में अनिश्चित हैं, तो कॉन्ट्रैक्ट स्पेसिफिकेशन पेज देखें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ликвидации показывает точную цену, при которой биржа принудительно закроет вашу позицию с плечом. Введите цену входа, кратность плеча и направление позиции (лонг или шорт).`,
      `Используйте перед открытием любой позиции с плечом для установки стоп-лоссов выше уровня ликвидации. Если цена ликвидации слишком близка к текущей рыночной цене — снизьте плечо или увеличьте маржу.`
      ],
      inputs: [
      `Цена входа — это цена открытия позиции. Кратность плеча определяет степень усиления вашей экспозиции. При кросс-марже цена ликвидации рассчитывается от всего баланса счёта, при изолированной марже — только от маржи, выделенной на эту позицию.`,
      `Ставка поддерживающей маржи варьируется в зависимости от биржи и инструмента. Если не знаете точную ставку, проверьте страницу спецификации контракта на своей бирже.`
      ],
    },
  },
  'funding-rate-calculator': {
    en: {
      how: [
      `The Funding Rate Calculator computes the cost or income from holding a perpetual futures position over time. Funding payments are exchanged between longs and shorts every 8 hours on most exchanges — when the rate is positive, longs pay shorts; when negative, shorts pay longs. Enter your position size and the current funding rate to see your hourly, daily, weekly, and monthly funding impact.`,
      `Use it to evaluate whether carrying a long or short perpetual position is cost-effective for your time horizon. For trades held over weeks or months, accumulated funding can significantly erode profits even from a well-timed directional trade. Compare the expected funding cost against your profit target to ensure the trade has a positive net expected value.`
      ],
      inputs: [
      `Position size in USD (or in coins with your current price to convert) and the funding rate percentage are the two main inputs. Funding rates are quoted as 8-hour rates on most exchanges (Binance, Bybit, OKX) — the calculator shows both the 8-hour rate and the annualized equivalent. A funding rate of 0.01% per 8 hours equals approximately 10.95% per year.`,
      `Rates change every 8 hours based on market conditions, so the projected cost assumes a constant rate equal to the current rate. In trending markets, funding can spike significantly — check historical funding rate charts if you're planning a multi-week hold. Isolated margin positions have the same funding mechanics as cross-margin positions.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Tasa de Funding calcula el costo o ingreso de mantener una posición de futuros perpetuos en el tiempo. Los pagos de funding se intercambian entre largos y cortos cada 8 horas. Introduce el tamaño de tu posición y la tasa de funding actual.`,
      `Úsala para evaluar si mantener una posición perpetua larga o corta es rentable para tu horizonte temporal. Para operaciones mantenidas durante semanas o meses, el funding acumulado puede erosionar significativamente las ganancias.`
      ],
      inputs: [
      `El tamaño de posición en USD y el porcentaje de tasa de funding son los dos inputs principales. Las tasas de funding se cotizan como tasas de 8 horas en la mayoría de los exchanges.`,
      `Las tasas cambian cada 8 horas según las condiciones del mercado, por lo que el costo proyectado asume una tasa constante igual a la tasa actual.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Taxa de Funding calcula o custo ou receita de manter uma posição de futuros perpétuos ao longo do tempo. Os pagamentos de funding são trocados entre comprados e vendidos a cada 8 horas.`,
      `Use-a para avaliar se manter uma posição perpétua comprada ou vendida é econômico para seu horizonte de tempo. Para negociações mantidas por semanas ou meses, o funding acumulado pode corroer significativamente os lucros.`
      ],
      inputs: [
      `Tamanho da posição em USD e a porcentagem da taxa de funding são os dois inputs principais. As taxas de funding são cotadas como taxas de 8 horas na maioria das exchanges.`,
      `As taxas mudam a cada 8 horas com base nas condições do mercado, portanto o custo projetado assume uma taxa constante igual à taxa atual.`
      ],
    },
    tr: {
      how: [
      `Finansman Oranı Hesaplayıcısı, sürekli vadeli işlem pozisyonunu zaman içinde tutmanın maliyetini veya gelirini hesaplar. Finansman ödemeleri çoğu borsada her 8 saatte bir uzun ve kısa pozisyonlar arasında değiş tokuş edilir.`,
      `Uzun veya kısa sürekli vadeli işlem pozisyonu tutmanın zaman diliminiz için uygun maliyetli olup olmadığını değerlendirmek için kullanın.`
      ],
      inputs: [
      `USD cinsinden pozisyon büyüklüğü ve finansman oranı yüzdesi iki ana girdilerdir. Finansman oranları çoğu borsada 8 saatlik oranlar olarak verilir.`,
      `Oranlar piyasa koşullarına göre her 8 saatte bir değişir, bu nedenle öngörülen maliyet mevcut orana eşit sabit bir oran varsayar.`
      ],
    },
    hi: {
      how: [
      `फंडिंग रेट कैलकुलेटर समय के साथ पर्पेचुअल फ्यूचर्स पोजीशन रखने की लागत या आय की गणना करता है। फंडिंग पेमेंट हर 8 घंटे में लॉन्ग और शॉर्ट के बीच एक्सचेंज होती है।`,
      `यह मूल्यांकन करने के लिए उपयोग करें कि लॉन्ग या शॉर्ट पर्पेचुअल पोजीशन रखना आपके समय क्षितिज के लिए लागत-प्रभावी है या नहीं।`
      ],
      inputs: [
      `USD में पोजीशन साइज और फंडिंग रेट प्रतिशत दो मुख्य इनपुट हैं। अधिकांश एक्सचेंजों पर फंडिंग रेट 8-घंटे की दर के रूप में उद्धृत की जाती है।`,
      `रेट हर 8 घंटे में बाजार की स्थितियों के आधार पर बदलती है, इसलिए अनुमानित लागत वर्तमान दर के बराबर स्थिर दर मानती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ставки финансирования рассчитывает стоимость или доход от удержания позиции по бессрочному фьючерсу. Платежи финансирования обмениваются между лонгами и шортами каждые 8 часов. Введите размер позиции и текущую ставку финансирования.`,
      `Используйте для оценки, выгодно ли держать долгосрочную или короткую позицию по бессрочному контракту. Для сделок, удерживаемых неделями или месяцами, накопленное финансирование может существенно съесть прибыль.`
      ],
      inputs: [
      `Размер позиции в USD и процент ставки финансирования — два основных поля. На большинстве бирж ставки финансирования указываются как 8-часовые ставки.`,
      `Ставки меняются каждые 8 часов в зависимости от рыночных условий, поэтому расчётная стоимость предполагает постоянную ставку, равную текущей.`
      ],
    },
  },
  'staking-calculator': {
    en: {
      how: [
      `The Staking Rewards Calculator shows how much passive income your staked cryptocurrency will generate over time based on the current annual percentage yield (APY). Enter your staking amount, the APY offered by your validator or staking pool, and your intended staking duration to see projected rewards in both coin quantity and USD value.`,
      `Use it to compare different staking options: enter the same amount with different APY rates from various validators or platforms to find the most rewarding option. Run scenarios with a higher APY that compounds daily versus a simpler annual reward structure to understand how compounding frequency affects your final return.`
      ],
      inputs: [
      `Staking amount is the number of tokens you are staking. APY (Annual Percentage Yield) already accounts for compounding, while APR (Annual Percentage Rate) does not — if your platform quotes APR, use the APY/APR converter to get the compounded equivalent. Staking duration can be set in days, months, or years.`,
      `Price at end of period is optional but helps you see USD value of rewards assuming price appreciation. If left blank, current price is used. For Ethereum staking, note that the APY varies dynamically based on total ETH staked on the network — validator-specific rates may differ from the network average.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Recompensas de Staking muestra cuántos ingresos pasivos generará tu criptomoneda en staking con el tiempo basándose en el APY anual actual. Introduce tu cantidad en staking, el APY ofrecido por tu validador o pool y tu duración prevista de staking.`,
      `Úsala para comparar diferentes opciones de staking: introduce la misma cantidad con diferentes tasas APY de varios validadores o plataformas para encontrar la opción más rentable.`
      ],
      inputs: [
      `La cantidad en staking es el número de tokens que estás apostando. El APY (Rendimiento Porcentual Anual) ya tiene en cuenta el interés compuesto, mientras que el APR no lo hace.`,
      `El precio al final del período es opcional pero te ayuda a ver el valor en USD de las recompensas asumiendo apreciación del precio.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Recompensas de Staking mostra quanto renda passiva sua criptomoeda em staking irá gerar ao longo do tempo com base no APY anual atual. Insira seu valor em staking, o APY oferecido pelo seu validador ou pool e a duração pretendida de staking.`,
      `Use-a para comparar diferentes opções de staking: insira o mesmo valor com diferentes taxas APY de vários validadores ou plataformas para encontrar a opção mais rentável.`
      ],
      inputs: [
      `O valor em staking é o número de tokens que você está apostando. O APY (Rendimento Percentual Anual) já considera o capitalização composta, enquanto o APR não.`,
      `O preço no final do período é opcional, mas ajuda a ver o valor em USD das recompensas assumindo apreciação de preço.`
      ],
    },
    tr: {
      how: [
      `Staking Ödülleri Hesaplayıcısı, stake edilmiş kripto paranızın mevcut yıllık yüzde getirisi (APY) bazında zaman içinde ne kadar pasif gelir üreteceğini gösterir.`,
      `Farklı staking seçeneklerini karşılaştırmak için kullanın: aynı tutarı çeşitli doğrulayıcılar veya platformlardan farklı APY oranlarıyla girin.`
      ],
      inputs: [
      `Staking miktarı stake ettiğiniz token sayısıdır. APY (Yıllık Yüzde Getirisi) zaten bileşik faizi hesaba katarken APR bunu yapmaz.`,
      `Dönem sonu fiyatı isteğe bağlıdır ancak fiyat artışı varsayarak ödüllerin USD değerini görmenize yardımcı olur.`
      ],
    },
    hi: {
      how: [
      `स्टेकिंग रिवॉर्ड्स कैलकुलेटर दिखाता है कि वर्तमान वार्षिक प्रतिशत उपज (APY) के आधार पर आपकी स्टेक की गई क्रिप्टोकरेंसी समय के साथ कितनी पैसिव इनकम जनरेट करेगी।`,
      `विभिन्न स्टेकिंग विकल्पों की तुलना करने के लिए इसका उपयोग करें: सबसे फायदेमंद विकल्प खोजने के लिए विभिन्न वैलिडेटर या प्लेटफॉर्म से अलग-अलग APY दरों के साथ समान राशि दर्ज करें।`
      ],
      inputs: [
      `स्टेकिंग राशि आपके द्वारा स्टेक किए जा रहे टोकन की संख्या है। APY (वार्षिक प्रतिशत उपज) पहले से ही कंपाउंडिंग को ध्यान में रखती है जबकि APR नहीं।`,
      `अवधि के अंत में मूल्य वैकल्पिक है लेकिन मूल्य सराहना मानकर रिवॉर्ड का USD मूल्य देखने में मदद करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор вознаграждений за стейкинг показывает, сколько пассивного дохода принесут ваши застейканные токены на основе текущей годовой доходности (APY). Введите сумму стейкинга, APY вашего валидатора или пула и планируемый срок.`,
      `Используйте для сравнения различных вариантов стейкинга: введите одинаковую сумму с разными APY от различных валидаторов, чтобы найти наиболее выгодный вариант.`
      ],
      inputs: [
      `Сумма стейкинга — количество токенов в стейке. APY (Годовая процентная доходность) уже учитывает реинвестирование, тогда как APR — нет. Если платформа указывает APR, используйте конвертер APY/APR.`,
      `Цена на конец периода — необязательное поле, но помогает увидеть стоимость вознаграждений в USD при учёте роста цены актива.`
      ],
    },
  },
  'staking-rewards-calculator': {
    en: {
      how: [
        `The Staking Rewards Calculator projects your earnings from locking cryptocurrency in a proof-of-stake network or staking platform. Enter the amount you plan to stake, the annual reward rate (APY), your chosen compounding frequency, and the staking duration to see projected rewards in both tokens and their USD equivalent. The calculator factors in compounding to show how reinvesting rewards accelerates growth over time.`,
        `Use it to compare staking opportunities across different networks — Ethereum yields roughly 3-4% APY, Solana 6-8%, and Cosmos ecosystem chains 15-20%. The calculator also shows the impact of validator commission fees, which reduce your effective yield. Run scenarios with different lock-up periods to find the optimal balance between earning higher rewards and maintaining liquidity access.`
      ],
      inputs: [
        `Stake amount is the number of tokens you plan to lock. Annual reward rate (APY) should reflect the current network rate minus any validator commission — check your staking provider's dashboard for the exact figure. Compounding frequency models how often you claim and restake rewards: daily auto-compound produces the highest return, while manual monthly restaking is more common.`,
        `Staking duration sets the projection horizon in days, months, or years. The optional price field converts token rewards into USD value — useful for seeing whether staking rewards outpace potential price depreciation. Validator commission percentage (typically 5-10%) is deducted from the gross reward rate to calculate your net APY. The unstaking period field reminds you of the lock-up delay when exiting.`
      ],
    },
    es: { how: [`La Calculadora de Recompensas de Staking proyecta tus ganancias al bloquear criptomonedas en una red proof-of-stake. Introduce la cantidad a stakear, la tasa anual (APY), la frecuencia de capitalización y la duración para ver las recompensas proyectadas en tokens y su equivalente en USD.`, `Úsala para comparar oportunidades de staking entre redes — Ethereum rinde 3-4% APY, Solana 6-8%, cadenas del ecosistema Cosmos 15-20%. El calculador también muestra el impacto de las comisiones de validador.`], inputs: [`La cantidad a stakear es el número de tokens que planeas bloquear. La tasa anual (APY) debe reflejar la tasa actual de la red menos la comisión del validador. La frecuencia de capitalización modela con qué frecuencia reclamas y re-stakeas.`, `La duración establece el horizonte de proyección. El campo de precio opcional convierte recompensas en tokens a valor USD. La comisión del validador (típicamente 5-10%) se deduce de la tasa bruta para calcular tu APY neto.`] },
    pt: { how: [`A Calculadora de Recompensas de Staking projeta seus ganhos ao bloquear criptomoeda em uma rede proof-of-stake. Insira a quantidade a stakear, a taxa anual (APY), a frequência de capitalização e a duração para ver recompensas projetadas em tokens e equivalente em USD.`, `Use-a para comparar oportunidades de staking entre redes — Ethereum rende 3-4% APY, Solana 6-8%, cadeias do ecossistema Cosmos 15-20%. A calculadora também mostra o impacto das comissões de validador.`], inputs: [`A quantidade stakeada é o número de tokens que planeja bloquear. A taxa anual (APY) deve refletir a taxa atual da rede menos a comissão do validador. A frequência de capitalização modela com que frequência você reivindica e restakeia.`, `A duração define o horizonte de projeção. O campo de preço opcional converte recompensas em tokens para valor USD. A comissão do validador (tipicamente 5-10%) é deduzida da taxa bruta para calcular seu APY líquido.`] },
    tr: { how: [`Staking Ödül Hesaplayıcı, proof-of-stake ağında kripto para kilitlemenizden elde edeceğiniz kazançları projekte eder. Stake miktarını, yıllık ödül oranını (APY), bileşik frekansı ve süreyi girerek token ve USD cinsinden tahmini ödülleri görün.`, `Farklı ağlardaki staking fırsatlarını karşılaştırın — Ethereum %3-4 APY, Solana %6-8, Cosmos ekosistemi zincirleri %15-20. Hesaplayıcı ayrıca doğrulayıcı komisyon ücretlerinin etkisini gösterir.`], inputs: [`Stake miktarı, kilitlemeyi planladığınız token sayısıdır. Yıllık ödül oranı (APY) ağın mevcut oranından doğrulayıcı komisyonu düşülmüş halini yansıtmalıdır. Bileşik frekansı, ödülleri ne sıklıkla talep edip yeniden stake ettiğinizi modeller.`, `Süre, projeksiyon ufkunu gün, ay veya yıl olarak belirler. Opsiyonel fiyat alanı token ödüllerini USD değerine dönüştürür. Doğrulayıcı komisyonu (%5-10) brüt oranından düşülerek net APY hesaplanır.`] },
    hi: { how: [`स्टेकिंग रिवॉर्ड्स कैलकुलेटर प्रूफ-ऑफ-स्टेक नेटवर्क में क्रिप्टोकरेंसी लॉक करने से आपकी कमाई का अनुमान लगाता है। स्टेक राशि, वार्षिक रिवॉर्ड रेट (APY), कंपाउंडिंग फ्रीक्वेंसी और अवधि दर्ज करके टोकन और USD में अनुमानित रिवॉर्ड देखें।`, `विभिन्न नेटवर्क में स्टेकिंग अवसरों की तुलना करें — Ethereum लगभग 3-4% APY, Solana 6-8%, Cosmos इकोसिस्टम चेन 15-20% देती हैं। कैलकुलेटर वैलिडेटर कमीशन फीस का प्रभाव भी दिखाता है।`], inputs: [`स्टेक राशि वह टोकन संख्या है जिसे आप लॉक करने की योजना बनाते हैं। वार्षिक रिवॉर्ड रेट (APY) नेटवर्क की वर्तमान दर से वैलिडेटर कमीशन घटाकर दर्शानी चाहिए। कंपाउंडिंग फ्रीक्वेंसी मॉडल करती है कि आप कितनी बार क्लेम और री-स्टेक करते हैं।`, `अवधि प्रोजेक्शन हॉरिज़न सेट करती है। वैकल्पिक प्राइस फील्ड टोकन रिवॉर्ड को USD वैल्यू में कन्वर्ट करता है। वैलिडेटर कमीशन (आमतौर पर 5-10%) ग्रॉस रेट से काटा जाता है।`] },
    ru: { how: [`Калькулятор наград за стейкинг прогнозирует ваши заработки от блокировки криптовалюты в сети proof-of-stake. Введите сумму стейка, годовую ставку вознаграждения (APY), частоту капитализации и срок для просмотра прогнозируемых наград в токенах и их USD-эквиваленте.`, `Сравнивайте возможности стейкинга в разных сетях — Ethereum приносит 3-4% APY, Solana 6-8%, цепочки экосистемы Cosmos 15-20%. Калькулятор также показывает влияние комиссии валидатора.`], inputs: [`Сумма стейка — количество токенов для блокировки. Годовая ставка (APY) должна отражать текущую ставку сети за вычетом комиссии валидатора. Частота капитализации моделирует, как часто вы забираете и перестейкиваете награды.`, `Срок задаёт горизонт прогноза. Опциональное поле цены конвертирует токенные награды в USD. Комиссия валидатора (обычно 5-10%) вычитается из валовой ставки для расчёта чистого APY.`] },
  },
  'break-even-calculator': {
    en: {
      how: [
      `The Break-Even Calculator finds the exact price at which a trade becomes profitable after all costs — entry price, exit fees, and any other friction. Enter your entry price and your total fee percentage (entry + exit combined), and the calculator returns the minimum exit price required to break even before making any profit.`,
      `Use it to set realistic minimum profit targets. Many traders overlook that exchange fees of 0.1% each way mean you need a 0.2% price move just to cover costs. For leveraged positions, break-even is further affected by funding rates and interest. Run the calculator with your actual fee tier to understand your true profitability threshold.`
      ],
      inputs: [
      `Entry price is your purchase price or short open price. Fee percentage covers your combined round-trip cost: if you pay 0.1% to enter and 0.1% to exit, enter 0.2%. For limit orders using maker fees and market orders using taker fees, ensure you're using the right tier.`,
      `For short positions, the break-even price is below the entry price — the calculator adjusts direction automatically. If you're using leverage, add your expected funding rate cost to the fee field for a more accurate break-even point on positions held overnight or longer.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Punto de Equilibrio encuentra el precio exacto al que una operación se vuelve rentable después de todos los costos. Introduce tu precio de entrada y tu porcentaje total de comisión, y la calculadora devuelve el precio mínimo de salida necesario para alcanzar el punto de equilibrio.`,
      `Úsala para establecer objetivos de beneficio mínimos realistas. Muchos traders olvidan que las comisiones del exchange del 0.1% en cada sentido significan que necesitas un movimiento de precio del 0.2% solo para cubrir costos.`
      ],
      inputs: [
      `El precio de entrada es tu precio de compra o precio de apertura de corto. El porcentaje de comisión cubre tu costo total de ida y vuelta.`,
      `Para posiciones cortas, el precio de equilibrio está por debajo del precio de entrada — la calculadora ajusta la dirección automáticamente.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Ponto de Equilíbrio encontra o preço exato em que uma negociação se torna lucrativa após todos os custos. Insira seu preço de entrada e sua porcentagem total de taxa, e a calculadora retorna o preço mínimo de saída necessário para atingir o ponto de equilíbrio.`,
      `Use-a para definir alvos mínimos de lucro realistas. Muitos traders esquecem que taxas de exchange de 0,1% em cada direção significam que você precisa de um movimento de preço de 0,2% apenas para cobrir custos.`
      ],
      inputs: [
      `O preço de entrada é seu preço de compra ou preço de abertura de venda. A porcentagem de taxa cobre seu custo total de ida e volta.`,
      `Para posições vendidas, o preço de equilíbrio está abaixo do preço de entrada — a calculadora ajusta a direção automaticamente.`
      ],
    },
    tr: {
      how: [
      `Başa Baş Hesaplayıcısı, tüm maliyetlerden sonra bir işlemin kârlı hale geldiği tam fiyatı bulur. Giriş fiyatınızı ve toplam ücret yüzdenizi girin.`,
      `Gerçekçi minimum kâr hedefleri belirlemek için kullanın. Birçok trader, her yönde %0.1 exchange ücreti sadece maliyetleri karşılamak için %0.2'lik bir fiyat hareketine ihtiyaç duyduğunuzu unutur.`
      ],
      inputs: [
      `Giriş fiyatı alış fiyatınız veya short açma fiyatınızdır. Ücret yüzdesi toplam gidiş-dönüş maliyetinizi kapsar.`,
      `Short pozisyonlar için başa baş fiyatı giriş fiyatının altındadır — hesaplayıcı yönü otomatik olarak ayarlar.`
      ],
    },
    hi: {
      how: [
      `ब्रेक-ईवन कैलकुलेटर वह सटीक मूल्य खोजता है जिस पर सभी लागतों के बाद एक ट्रेड लाभदायक बन जाती है। अपना एंट्री प्राइस और कुल फीस प्रतिशत दर्ज करें।`,
      `यथार्थवादी न्यूनतम प्रॉफिट टार्गेट सेट करने के लिए इसका उपयोग करें। कई ट्रेडर भूल जाते हैं कि प्रत्येक दिशा में 0.1% एक्सचेंज फीस का मतलब है केवल लागत को कवर करने के लिए 0.2% मूल्य चाल की जरूरत है।`
      ],
      inputs: [
      `एंट्री प्राइस आपका खरीद मूल्य या शॉर्ट ओपन प्राइस है। फीस प्रतिशत आपकी कुल राउंड-ट्रिप लागत को कवर करता है।`,
      `Short पोजीशन के लिए, ब्रेक-ईवन प्राइस एंट्री प्राइस से नीचे है — कैलकुलेटर दिशा स्वचालित रूप से एडजस्ट करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор безубыточности находит точную цену, при которой сделка становится прибыльной после всех затрат. Введите цену входа и общий процент комиссии (вход + выход).`,
      `Используйте для установки реалистичных минимальных целей прибыли. Многие трейдеры забывают, что комиссии биржи 0,1% в каждую сторону означают необходимость движения цены на 0,2% только для покрытия издержек.`
      ],
      inputs: [
      `Цена входа — цена покупки или открытия шорта. Процент комиссии охватывает суммарные транзакционные издержки в обе стороны.`,
      `Для шорт-позиций цена безубыточности находится ниже цены входа — направление учитывается автоматически. При использовании плеча добавьте ожидаемую стоимость финансирования к полю комиссии.`
      ],
    },
  },
  'impermanent-loss-calculator': {
    en: {
      how: [
      `The Impermanent Loss Calculator quantifies the value difference between holding tokens in a liquidity pool versus simply holding them in a wallet. Enter your initial deposit ratio (e.g., 50% ETH / 50% USDC) and the price change of the volatile asset relative to the stable one — the calculator shows the exact dollar and percentage impermanent loss at any price point.`,
      `Use it before providing liquidity to understand your worst-case scenario. If ETH triples in price, you might expect to profit substantially, but impermanent loss reduces your gains versus simply holding ETH. The calculator helps you determine if the trading fee income from the pool is likely to outweigh the impermanent loss risk over your planned holding period.`
      ],
      inputs: [
      `The price change ratio is the key input: if ETH starts at $2,000 and you want to model it at $4,000, that's a 2× price change. For a 50/50 pool, a 2× price increase in one asset causes approximately 5.7% impermanent loss. The calculator shows impermanent loss across a range of price scenarios — from 0.1× (90% price drop) to 10× (900% price increase).`,
      `Initial pool value and token quantities are used to calculate the absolute dollar impact alongside the percentage. The fee APR field is optional: enter the annualized trading fee income from the pool (available on DEX analytics sites like Uniswap Info or DefiLlama) to see whether fee income compensates for the impermanent loss over your expected holding duration.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Pérdida Impermanente cuantifica la diferencia de valor entre mantener tokens en un pool de liquidez versus simplemente mantenerlos en una cartera. Introduce tu ratio de depósito inicial y el cambio de precio del activo volátil.`,
      `Úsala antes de proporcionar liquidez para entender tu peor escenario. Si ETH triplica su precio, podrías esperar ganancias sustanciales, pero la pérdida impermanente reduce tus ganancias versus simplemente mantener ETH.`
      ],
      inputs: [
      `El ratio de cambio de precio es el input clave: si ETH comienza en $2,000 y quieres modelarlo a $4,000, eso es un cambio de precio de 2×. Para un pool 50/50, un aumento de precio de 2× en un activo causa aproximadamente un 5.7% de pérdida impermanente.`,
      `El valor inicial del pool y las cantidades de tokens se usan para calcular el impacto absoluto en dólares junto con el porcentaje.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Perda Impermanente quantifica a diferença de valor entre manter tokens em um pool de liquidez versus simplesmente mantê-los em uma carteira. Insira sua proporção de depósito inicial e a mudança de preço do ativo volátil.`,
      `Use-a antes de fornecer liquidez para entender seu pior cenário. Se o ETH triplicar de preço, você pode esperar ganhos substanciais, mas a perda impermanente reduz seus ganhos versus simplesmente manter ETH.`
      ],
      inputs: [
      `A proporção de mudança de preço é o input chave: se o ETH começa em $2.000 e você quer modelá-lo a $4.000, isso é uma mudança de preço de 2×.`,
      `O valor inicial do pool e as quantidades de tokens são usados para calcular o impacto absoluto em dólar junto com a porcentagem.`
      ],
    },
    tr: {
      how: [
      `Kalıcı Olmayan Kayıp Hesaplayıcısı, tokenları bir likidite havuzunda tutmak ile onları bir cüzdanda tutmak arasındaki değer farkını hesaplar.`,
      `Likidite sağlamadan önce en kötü senaryonuzu anlamak için kullanın.`
      ],
      inputs: [
      `Fiyat değişim oranı temel girdilerdir: ETH $2.000'den başlayıp $4.000'i modellemek istiyorsanız, bu 2× fiyat değişimidir.`,
      `Başlangıç havuz değeri ve token miktarları, yüzdeyle birlikte mutlak dolar etkisini hesaplamak için kullanılır.`
      ],
    },
    hi: {
      how: [
      `इम्परमानेंट लॉस कैलकुलेटर लिक्विडिटी पूल में टोकन रखने और केवल वॉलेट में रखने के बीच मूल्य अंतर की मात्रा निर्धारित करता है।`,
      `लिक्विडिटी प्रदान करने से पहले अपने सबसे खराब परिदृश्य को समझने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `मूल्य परिवर्तन अनुपात मुख्य इनपुट है: अगर ETH $2,000 से शुरू होता है और आप इसे $4,000 पर मॉडल करना चाहते हैं, तो यह 2× मूल्य परिवर्तन है।`,
      `प्रारंभिक पूल मूल्य और टोकन मात्राएं प्रतिशत के साथ पूर्ण डॉलर प्रभाव की गणना के लिए उपयोग की जाती हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор непостоянных потерь рассчитывает разницу в стоимости между удержанием токенов в пуле ликвидности и простым хранением их в кошельке. Введите начальное соотношение депозита и изменение цены волатильного актива.`,
      `Используйте перед добавлением ликвидности для понимания наихудшего сценария. Рост цены ETH в 2 раза при пуле 50/50 вызывает примерно 5,7% непостоянных потерь.`
      ],
      inputs: [
      `Коэффициент изменения цены — ключевой параметр: если ETH начинает с $2000 и вы хотите смоделировать $4000, это изменение в 2×. Калькулятор показывает непостоянные потери для всего диапазона сценариев цены.`,
      `Начальная стоимость пула и количество токенов используются для расчёта абсолютного долларового воздействия. Поле APR комиссий позволяет оценить, перекрывают ли доходы от комиссий пула непостоянные потери.`
      ],
    },
  },
  'apy-apr-calculator': {
    en: {
      how: [
      `The APY/APR Calculator converts between Annual Percentage Yield (compounded) and Annual Percentage Rate (simple) across any compounding frequency. Platforms often quote either APR or APY without clearly distinguishing them — this calculator makes both figures transparent and comparable so you can make accurate comparisons between DeFi protocols, staking pools, and savings products.`,
      `Enter an APY to find the equivalent APR, or enter an APR with your compounding frequency to find the APY. Use it when comparing a protocol that quotes 12% APY against one that quotes 12% APR — they're not equal. At monthly compounding, 12% APR equals approximately 12.68% APY; daily compounding pushes it to 12.75%.`
      ],
      inputs: [
      `Input either APR or APY — the calculator solves for the missing one. Compounding frequency can be set to daily (365×), weekly (52×), monthly (12×), quarterly (4×), or annually (1×). The formula is: APY = (1 + APR/n)^n - 1, where n is the number of compounding periods per year.`,
      `For continuous compounding (used by some DeFi protocols), APY = e^APR - 1. A rate quoted as daily compound is the most aggressive compounding available — this matters most for high-APR protocols where the difference between daily and monthly compounding can be several percentage points. Always verify which convention your platform uses.`
      ],
    },
    es: {
      how: [
      `La Calculadora APY/APR convierte entre Rendimiento Porcentual Anual (compuesto) y Tasa Porcentual Anual (simple) en cualquier frecuencia de composición. Las plataformas a menudo citan APR o APY sin distinguirlos claramente.`,
      `Introduce un APY para encontrar el APR equivalente, o introduce un APR con tu frecuencia de composición para encontrar el APY. Úsala al comparar protocolos que citan diferentes métricas.`
      ],
      inputs: [
      `Introduce APR o APY — la calculadora resuelve el que falta. La frecuencia de composición puede ser diaria, semanal, mensual, trimestral o anual.`,
      `Para composición continua, APY = e^APR - 1. Siempre verifica qué convención usa tu plataforma.`
      ],
    },
    pt: {
      how: [
      `A Calculadora APY/APR converte entre Rendimento Percentual Anual (composto) e Taxa Percentual Anual (simples) em qualquer frequência de capitalização.`,
      `Insira um APY para encontrar o APR equivalente, ou insira um APR com sua frequência de capitalização para encontrar o APY.`
      ],
      inputs: [
      `Insira APR ou APY — a calculadora resolve o que falta. A frequência de capitalização pode ser diária, semanal, mensal, trimestral ou anual.`,
      `Para capitalização contínua, APY = e^APR - 1. Sempre verifique qual convenção sua plataforma usa.`
      ],
    },
    tr: {
      how: [
      `APY/APR Hesaplayıcısı, herhangi bir bileşik sıklığında Yıllık Yüzde Getirisi (bileşik) ve Yıllık Yüzde Oranı (basit) arasında dönüşüm yapar.`,
      `Bir APY girerek eşdeğer APR'yi bulun veya bileşik sıklığınızla bir APR girerek APY'yi bulun.`
      ],
      inputs: [
      `APR veya APY girin — hesaplayıcı eksik olanı çözer. Bileşik sıklığı günlük, haftalık, aylık, üç aylık veya yıllık olarak ayarlanabilir.`,
      `Sürekli bileşik için APY = e^APR - 1. Platformunuzun hangi kuralı kullandığını her zaman doğrulayın.`
      ],
    },
    hi: {
      how: [
      `APY/APR कैलकुलेटर किसी भी कंपाउंडिंग फ्रीक्वेंसी पर वार्षिक प्रतिशत उपज (कंपाउंडेड) और वार्षिक प्रतिशत दर (सरल) के बीच रूपांतरित करता है।`,
      `APY दर्ज करें तो समकक्ष APR मिलता है, या अपनी कंपाउंडिंग फ्रीक्वेंसी के साथ APR दर्ज करें तो APY मिलती है।`
      ],
      inputs: [
      `APR या APY दर्ज करें — कैलकुलेटर लापता को हल करता है। कंपाउंडिंग फ्रीक्वेंसी दैनिक, साप्ताहिक, मासिक, तिमाही या वार्षिक पर सेट की जा सकती है।`,
      `निरंतर कंपाउंडिंग के लिए, APY = e^APR - 1। हमेशा सत्यापित करें कि आपका प्लेटफॉर्म कौन सा कन्वेंशन उपयोग करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор APY/APR конвертирует между годовой процентной доходностью (с учётом реинвестирования) и годовой процентной ставкой (без реинвестирования) для любой частоты начисления.`,
      `Введите APY, чтобы найти эквивалентный APR, или введите APR с частотой начисления, чтобы найти APY. Полезно при сравнении DeFi-протоколов, публикующих разные метрики.`
      ],
      inputs: [
      `Введите APR или APY — калькулятор вычислит недостающий параметр. Частота начисления может быть ежедневной (365×), еженедельной (52×), ежемесячной (12×), ежеквартальной (4×) или ежегодной (1×).`,
      `Для непрерывного начисления APY = e^APR - 1. Это важно для высокодоходных протоколов, где разница между ежедневным и ежемесячным реинвестированием может составлять несколько процентных пунктов.`
      ],
    },
  },
  'market-cap-calculator': {
    en: {
      how: [
      `The Market Cap Calculator determines either the market capitalization from a price and supply, or the price that would result from a given market cap. Enter a cryptocurrency's current supply and price to calculate market cap, or enter a target market cap with the circulating supply to find the implied price per token.`,
      `Use the reverse calculation to answer 'what price would my coin be at if it had Bitcoin's market cap?' Enter Bitcoin's market cap and your coin's circulating supply to get a price target. This is the single most useful tool for identifying realistic price ceilings and floors based on market cap comparisons to established projects.`
      ],
      inputs: [
      `Circulating supply is the number of tokens currently in public circulation — not the total supply or max supply. You can find this on CoinGecko or CoinMarketCap for any listed token. Price per token is the current trading price. Market cap = price × circulating supply; the calculator solves for any one variable given the other two.`,
      `For tokens with significant locked or vested supply, use fully diluted valuation (FDV) for a more conservative comparison: FDV = price × max supply. Many early-stage tokens have 80–95% of supply still locked, making their FDV many times higher than their market cap. The calculator supports both market cap and FDV calculations.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Capitalización de Mercado determina la capitalización de mercado a partir de un precio y suministro, o el precio que resultaría de una capitalización de mercado dada.`,
      `Usa el cálculo inverso para responder '¿a qué precio estaría mi moneda si tuviera la capitalización de mercado de Bitcoin?'`
      ],
      inputs: [
      `El suministro circulante es el número de tokens actualmente en circulación pública. Capitalización de mercado = precio × suministro circulante.`,
      `Para tokens con suministro bloqueado significativo, usa la valoración completamente diluida (FDV) para una comparación más conservadora: FDV = precio × suministro máximo.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Capitalização de Mercado determina a capitalização de mercado a partir de um preço e fornecimento, ou o preço que resultaria de uma dada capitalização de mercado.`,
      `Use o cálculo inverso para responder 'a que preço estaria minha moeda se tivesse a capitalização de mercado do Bitcoin?'`
      ],
      inputs: [
      `O fornecimento circulante é o número de tokens atualmente em circulação pública. Capitalização de mercado = preço × fornecimento circulante.`,
      `Para tokens com fornecimento bloqueado significativo, use a avaliação totalmente diluída (FDV): FDV = preço × fornecimento máximo.`
      ],
    },
    tr: {
      how: [
      `Piyasa Değeri Hesaplayıcısı, bir fiyat ve arzdan piyasa değerini veya belirli bir piyasa değerinden elde edilen fiyatı belirler.`,
      `Ters hesaplama için kullanın: 'Bitcoin'in piyasa değerine sahip olsaydı madenim ne fiyatta olurdu?'`
      ],
      inputs: [
      `Dolaşımdaki arz, şu anda kamuya açık dolaşımda olan token sayısıdır. Piyasa değeri = fiyat × dolaşımdaki arz.`,
      `Kilitli arzı olan tokenlar için daha muhafazakâr bir karşılaştırma için tam seyreltilmiş değerlemeyi (FDV) kullanın: FDV = fiyat × maksimum arz.`
      ],
    },
    hi: {
      how: [
      `मार्केट कैप कैलकुलेटर किसी मूल्य और सप्लाई से मार्केट कैपिटलाइजेशन निर्धारित करता है, या दिए गए मार्केट कैप से परिणामी मूल्य।`,
      `रिवर्स कैलकुलेशन के लिए उपयोग करें: 'अगर मेरे कॉइन के पास Bitcoin का मार्केट कैप होता तो क्या कीमत होती?'`
      ],
      inputs: [
      `सर्कुलेटिंग सप्लाई वह टोकन की संख्या है जो वर्तमान में सार्वजनिक सर्कुलेशन में है। मार्केट कैप = प्राइस × सर्कुलेटिंग सप्लाई।`,
      `महत्वपूर्ण लॉक्ड सप्लाई वाले टोकन के लिए, अधिक रूढ़िवादी तुलना के लिए फुली डाइल्यूटेड वैल्यूएशन (FDV) का उपयोग करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор рыночной капитализации вычисляет капитализацию по цене и предложению, или цену при заданной капитализации. Введите текущее предложение и цену монеты, чтобы получить рыночную капитализацию.`,
      `Используйте обратный расчёт: «По какой цене была бы моя монета, если бы её рыночная капитализация равнялась капитализации Bitcoin?» — введите капитализацию Bitcoin и обращающееся предложение вашей монеты.`
      ],
      inputs: [
      `Обращающееся предложение — количество токенов в публичном обороте (не максимальное). Рыночная капитализация = цена × обращающееся предложение; калькулятор решает уравнение для любой переменной.`,
      `Для токенов с большим заблокированным или вестинговым предложением используйте полностью разводнённую стоимость (FDV) = цена × максимальное предложение для консервативного сравнения.`
      ],
    },
  },
  'roi-calculator': {
    en: {
      how: [
      `The ROI Calculator measures the return on any cryptocurrency investment as a percentage gain or loss relative to the initial amount invested. Enter your buy price, current or sell price, and investment amount to instantly see your profit, loss, ROI percentage, and the multiplier (e.g., 3.5× your money returned).`,
      `Use it to quickly benchmark performance across different assets in your portfolio. Compare a 6-month hold in ETH against a 6-month hold in SOL to see which delivered better percentage returns. Toggle between total ROI and annualized ROI to compare investments of different durations on an equal footing.`
      ],
      inputs: [
      `Buy price is your average cost basis per token. Sell price (or current price) is the exit or valuation price. Investment amount can be entered in USD or as a quantity of tokens. If you made multiple purchases at different prices, average them first and enter the weighted average cost basis.`,
      `For an annualized ROI calculation, the duration in days is required — the calculator converts total ROI to an annualized rate using the formula: Annualized ROI = (1 + Total ROI)^(365/days) - 1. A 50% total return in 90 days is equivalent to approximately 380% annualized, which provides a more useful benchmark for comparing different investments.`
      ],
    },
    es: {
      how: [
      `La Calculadora ROI mide el retorno de cualquier inversión en criptomonedas como ganancia o pérdida porcentual relativa al importe inicial invertido.`,
      `Úsala para evaluar rápidamente el rendimiento de diferentes activos en tu cartera. Activa o desactiva entre ROI total y ROI anualizado para comparar inversiones de diferentes duraciones en igualdad de condiciones.`
      ],
      inputs: [
      `El precio de compra es tu base de costo promedio por token. El precio de venta es el precio de salida o valoración.`,
      `Para un cálculo de ROI anualizado, se requiere la duración en días. Un retorno total del 50% en 90 días equivale a aproximadamente un 380% anualizado.`
      ],
    },
    pt: {
      how: [
      `A Calculadora ROI mede o retorno de qualquer investimento em criptomoedas como ganho ou perda percentual em relação ao valor inicialmente investido.`,
      `Use-a para comparar rapidamente o desempenho de diferentes ativos em seu portfólio. Alterne entre ROI total e ROI anualizado para comparar investimentos de durações diferentes.`
      ],
      inputs: [
      `O preço de compra é sua base de custo médio por token. O preço de venda é o preço de saída ou valoração.`,
      `Para um cálculo de ROI anualizado, a duração em dias é necessária. Um retorno total de 50% em 90 dias equivale a aproximadamente 380% ao ano.`
      ],
    },
    tr: {
      how: [
      `ROI Hesaplayıcısı, herhangi bir kripto para yatırımının getirisini yatırılan başlangıç tutarına göre yüzde kazanç veya kayıp olarak ölçer.`,
      `Portföyünüzdeki farklı varlıkların performansını hızla karşılaştırmak için kullanın.`
      ],
      inputs: [
      `Alış fiyatı, token başına ortalama maliyet bazınızdır. Satış fiyatı çıkış veya değerleme fiyatıdır.`,
      `Yıllık ROI hesabı için gün cinsinden süre gereklidir. 90 günde %50 toplam getiri yaklaşık %380 yıllık getiriye eşdeğerdir.`
      ],
    },
    hi: {
      how: [
      `ROI कैलकुलेटर किसी भी क्रिप्टोकरेंसी निवेश के रिटर्न को प्रारंभिक निवेश राशि के सापेक्ष प्रतिशत लाभ या हानि के रूप में मापता है।`,
      `अपने पोर्टफोलियो में विभिन्न एसेट के प्रदर्शन की तुलना करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `खरीद मूल्य प्रति टोकन आपकी औसत कॉस्ट बेसिस है। बिक्री मूल्य एग्जिट या वैल्यूएशन प्राइस है।`,
      `वार्षिक ROI गणना के लिए, दिनों में अवधि आवश्यक है। 90 दिनों में 50% कुल रिटर्न लगभग 380% वार्षिक के बराबर है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ROI измеряет доходность любой инвестиции в криптовалюту как процентный доход или убыток относительно начальной вложенной суммы.`,
      `Используйте для быстрого сравнения доходности разных активов в портфеле. Переключайтесь между общим ROI и аннуализированным ROI для сравнения инвестиций с разными сроками на равных условиях.`
      ],
      inputs: [
      `Цена покупки — средняя себестоимость за токен. Цена продажи — цена выхода или оценочная стоимость. Сумму инвестиции можно ввести в USD или как количество токенов.`,
      `Для расчёта аннуализированного ROI требуется срок в днях. Общая доходность 50% за 90 дней эквивалентна примерно 380% в годовом выражении.`
      ],
    },
  },
  'compound-calculator': {
    en: {
      how: [
      `The Compound Interest Calculator projects the growth of a cryptocurrency holding over time assuming periodic reinvestment of gains at a fixed rate. Enter your principal amount, annual interest or yield rate, compounding frequency, and investment duration to see the final value, total interest earned, and a year-by-year growth breakdown.`,
      `Use it to model staking, yield farming, or lending returns over multi-year periods. Compare daily compounding versus monthly to see the real-world impact of reinvestment frequency. For a DCA scenario, use the starting amount as your total planned investment and the expected average annual return rate to get a rough future value projection.`
      ],
      inputs: [
      `Principal is your starting investment amount in USD or coin value. Annual rate is the expected percentage gain per year — use historical averages conservatively. Compounding frequency determines how often gains are reinvested: daily (365), weekly (52), monthly (12), or annually (1). Duration is specified in years or months.`,
      `For cryptocurrency, rates are highly variable — the calculator assumes a constant rate which is a simplification. Use conservative estimates (e.g., 5–10% for major coins, 30–50% for DeFi staking) to avoid overoptimistic projections. Taxes on realized gains during each compounding period may reduce the effective return — factor in your local tax rate for a more accurate net projection.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Interés Compuesto proyecta el crecimiento de una tenencia de criptomonedas en el tiempo asumiendo la reinversión periódica de ganancias a una tasa fija.`,
      `Úsala para modelar rendimientos de staking, yield farming o préstamos durante períodos de varios años.`
      ],
      inputs: [
      `El principal es tu importe de inversión inicial en USD. La tasa anual es el porcentaje esperado de ganancia por año. La frecuencia de composición determina con qué frecuencia se reinvierten las ganancias.`,
      `Para criptomonedas, las tasas son muy variables — la calculadora asume una tasa constante que es una simplificación. Usa estimaciones conservadoras para evitar proyecciones demasiado optimistas.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Juros Compostos projeta o crescimento de uma participação em criptomoeda ao longo do tempo assumindo reinvestimento periódico de ganhos a uma taxa fixa.`,
      `Use-a para modelar retornos de staking, yield farming ou empréstimos durante períodos de vários anos.`
      ],
      inputs: [
      `O principal é seu valor de investimento inicial em USD. A taxa anual é o percentual esperado de ganho por ano. A frequência de capitalização determina com que frequência os ganhos são reinvestidos.`,
      `Para criptomoedas, as taxas são altamente variáveis — a calculadora assume uma taxa constante que é uma simplificação.`
      ],
    },
    tr: {
      how: [
      `Bileşik Faiz Hesaplayıcısı, belirli bir oranda kazançların periyodik olarak yeniden yatırılmasını varsayarak bir kripto para varlığının zaman içindeki büyümesini tahmin eder.`,
      `Staking, yield farming veya borç verme getirilerini çok yıllık dönemler için modellemek üzere kullanın.`
      ],
      inputs: [
      `Anapara, USD cinsinden başlangıç yatırım tutarınızdır. Yıllık oran, yıllık beklenen kazanç yüzdesidir. Bileşik sıklığı, kazançların ne sıklıkta yeniden yatırıldığını belirler.`,
      `Kripto para için oranlar oldukça değişkendir — hesaplayıcı sabit bir oran varsayar. Aşırı iyimser projeksiyonlardan kaçınmak için muhafazakâr tahminler kullanın.`
      ],
    },
    hi: {
      how: [
      `कंपाउंड इंटरेस्ट कैलकुलेटर एक निश्चित दर पर लाभ के आवधिक पुनर्निवेश मानते हुए समय के साथ क्रिप्टोकरेंसी होल्डिंग के विकास को प्रोजेक्ट करता है।`,
      `बहु-वर्षीय अवधियों में स्टेकिंग, यील्ड फार्मिंग या लेंडिंग रिटर्न मॉडल करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `प्रिंसिपल USD में आपकी शुरुआती निवेश राशि है। वार्षिक दर प्रति वर्ष अपेक्षित प्रतिशत लाभ है।`,
      `क्रिप्टोकरेंसी के लिए, दरें अत्यधिक परिवर्तनशील होती हैं — कैलकुलेटर एक स्थिर दर मानता है जो एक सरलीकरण है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор сложных процентов прогнозирует рост криптовалютной позиции с учётом периодического реинвестирования дохода по фиксированной ставке.`,
      `Используйте для моделирования доходов от стейкинга, фарминга или кредитования на несколько лет. Сравните ежедневное реинвестирование с ежемесячным для оценки реального эффекта.`
      ],
      inputs: [
      `Основная сумма — начальный размер инвестиции в USD. Годовая ставка — ожидаемый процентный доход в год. Частота реинвестирования определяет, как часто доход добавляется к основной сумме.`,
      `Для криптовалют ставки сильно варьируются — калькулятор предполагает постоянную ставку, что является упрощением. Используйте консервативные оценки для избегания чрезмерно оптимистичных прогнозов.`
      ],
    },
  },
  'compound-interest-calculator': {
    en: {
      how: [
        `The Compound Interest Calculator projects how a crypto investment grows when earned interest is reinvested back into the principal. Enter your initial deposit, the annual interest rate (APY), compounding frequency, and investment duration to see a detailed growth trajectory with totals for each period. The calculator breaks down how much of your final balance comes from your original deposit versus accumulated interest.`,
        `Use it to compare DeFi yield opportunities by testing different compounding frequencies — daily compounding at 8% APY produces meaningfully more than annual compounding at the same rate over multi-year horizons. The calculator also reveals the power of time: doubling your investment period often more than doubles total interest earned due to the exponential nature of compounding.`
      ],
      inputs: [
        `Initial deposit is the starting amount you plan to invest or stake. Annual interest rate (APY) should reflect the yield offered by your platform — staking rewards, lending rates, or liquidity pool returns. Compounding frequency determines how often earned interest is added back to the principal: daily, weekly, monthly, quarterly, or annually.`,
        `Investment duration sets the time horizon in months or years. Optional monthly contribution models a DCA approach where you add funds regularly on top of compounding returns. For volatile crypto assets, note that the calculator assumes a constant rate — real DeFi yields fluctuate, so use a conservative average rather than peak rates for realistic projections.`
      ],
    },
    es: { how: [`La Calculadora de Interés Compuesto proyecta cómo crece una inversión cripto cuando los intereses ganados se reinvierten en el capital. Introduce el depósito inicial, la tasa anual (APY), la frecuencia de capitalización y la duración para ver la trayectoria de crecimiento detallada.`, `Úsala para comparar oportunidades de rendimiento DeFi probando diferentes frecuencias de capitalización. La capitalización diaria al 8% APY produce significativamente más que la anual a la misma tasa en horizontes plurianuales.`], inputs: [`El depósito inicial es el monto que planeas invertir. La tasa anual (APY) debe reflejar el rendimiento ofrecido por tu plataforma. La frecuencia determina con qué periodicidad los intereses se suman al capital.`, `La duración establece el horizonte temporal. La aportación mensual opcional modela un enfoque DCA. Para activos cripto volátiles, usa promedios conservadores ya que los rendimientos DeFi reales fluctúan.`] },
    pt: { how: [`A Calculadora de Juros Compostos projeta como um investimento cripto cresce quando os juros ganhos são reinvestidos no principal. Insira o depósito inicial, a taxa anual (APY), a frequência de capitalização e a duração para ver a trajetória de crescimento detalhada.`, `Use-a para comparar oportunidades de rendimento DeFi testando diferentes frequências. A capitalização diária a 8% APY produz significativamente mais que a anual à mesma taxa em horizontes plurianuais.`], inputs: [`O depósito inicial é o valor que planeja investir. A taxa anual (APY) deve refletir o rendimento oferecido pela plataforma. A frequência determina com que periodicidade os juros são adicionados ao principal.`, `A duração define o horizonte temporal. A contribuição mensal opcional modela uma abordagem DCA. Para ativos cripto voláteis, use médias conservadoras pois rendimentos DeFi reais flutuam.`] },
    tr: { how: [`Bileşik Faiz Hesaplayıcı, kazanılan faizin ana paraya geri yatırıldığında bir kripto yatırımın nasıl büyüdüğünü projekte eder. Başlangıç tutarını, yıllık oranı (APY), bileşik frekansı ve süreyi girerek detaylı büyüme eğrisi görün.`, `Farklı bileşik frekanslarını test ederek DeFi getiri fırsatlarını karşılaştırın. %8 APY'de günlük bileşik, çok yıllık dönemlerde aynı oranda yıllıktan çok daha fazla üretir.`], inputs: [`Başlangıç tutarı yatırmayı planladığınız miktardır. Yıllık oran (APY) platformun sunduğu getiriyi yansıtmalıdır. Frekans, faizin ana paraya ne sıklıkla eklendiğini belirler.`, `Süre zaman ufkunu belirler. Opsiyonel aylık katkı DCA yaklaşımını modeller. Kripto varlıklar için gerçekçi projeksiyonlar adına pik oranlar yerine muhafazakâr ortalamalar kullanın.`] },
    hi: { how: [`कंपाउंड इंटरेस्ट कैलकुलेटर प्रोजेक्ट करता है कि कमाया गया ब्याज वापस प्रिंसिपल में निवेश करने पर क्रिप्टो निवेश कैसे बढ़ता है। प्रारंभिक जमा, वार्षिक दर (APY), कंपाउंडिंग फ्रीक्वेंसी और अवधि दर्ज करें।`, `विभिन्न कंपाउंडिंग फ्रीक्वेंसी का परीक्षण करके DeFi यील्ड अवसरों की तुलना करें। 8% APY पर दैनिक कंपाउंडिंग, बहु-वर्षीय अवधि में समान दर पर वार्षिक से काफी अधिक देती है।`], inputs: [`प्रारंभिक जमा वह राशि है जो आप निवेश करने की योजना बनाते हैं। वार्षिक दर (APY) आपके प्लेटफॉर्म द्वारा प्रदत्त यील्ड को दर्शानी चाहिए। फ्रीक्वेंसी निर्धारित करती है कि ब्याज कितनी बार प्रिंसिपल में जोड़ा जाता है।`, `अवधि टाइम हॉरिज़न सेट करती है। वैकल्पिक मासिक योगदान DCA दृष्टिकोण मॉडल करता है। अस्थिर क्रिप्टो एसेट्स के लिए, यथार्थवादी अनुमान हेतु पीक रेट की बजाय रूढ़िवादी औसत उपयोग करें।`] },
    ru: { how: [`Калькулятор сложных процентов прогнозирует, как растёт криптоинвестиция, когда заработанные проценты реинвестируются в основную сумму. Введите начальный депозит, годовую ставку (APY), частоту капитализации и срок для детальной траектории роста.`, `Сравнивайте возможности DeFi-доходности, тестируя разные частоты капитализации. Ежедневная капитализация при 8% APY приносит значительно больше, чем годовая при той же ставке на многолетних горизонтах.`], inputs: [`Начальный депозит — сумма, которую вы планируете инвестировать. Годовая ставка (APY) должна отражать доходность платформы. Частота определяет, как часто проценты добавляются к основной сумме.`, `Срок задаёт временной горизонт. Опциональный ежемесячный взнос моделирует подход DCA. Для волатильных криптоактивов используйте консервативные средние значения, а не пиковые ставки для реалистичных прогнозов.`] },
  },
  'satoshi-converter': {
    en: {
      how: [
      `The Satoshi Converter translates Bitcoin amounts between satoshis, bits, mBTC, and BTC, and converts any denomination into its current USD or fiat equivalent. Type an amount in any field and all other fields update simultaneously — making it fast to see that 1 satoshi equals 0.00000001 BTC, or that 100,000 satoshis equal 0.001 BTC.`,
      `Use it when reading Bitcoin transaction amounts quoted in satoshis (common in Lightning Network and on-chain inscriptions), or when setting fee rates quoted in sat/vByte. The calculator also converts to and from USD, EUR, and other fiat currencies using the live BTC price so you always know the real-world cost.`
      ],
      inputs: [
      `Enter a value in any denomination — satoshi, bit (100 satoshis), mBTC (100,000 satoshis), or BTC — and the others fill automatically. You can also type a fiat amount and see the BTC/satoshi equivalent at the current market price.`,
      `Satoshi values are always whole numbers since 1 satoshi is the smallest indivisible Bitcoin unit. For Lightning Network fee calculations, satoshis per millisatoshi (mSat) conversions are also supported — 1 satoshi = 1,000 millisatoshis. The BTC price updates from CoinGecko every 60 seconds.`
      ],
    },
    es: {
      how: [
      `El Conversor de Satoshi traduce cantidades de Bitcoin entre satoshis, bits, mBTC y BTC, y convierte cualquier denominación a su equivalente actual en USD u otra moneda fiat.`,
      `Úsalo al leer cantidades de transacciones de Bitcoin cotizadas en satoshis, o al establecer tasas de comisión cotizadas en sat/vByte.`
      ],
      inputs: [
      `Introduce un valor en cualquier denominación — satoshi, bit, mBTC o BTC — y los demás se rellenan automáticamente.`,
      `Los valores de satoshi son siempre números enteros ya que 1 satoshi es la unidad Bitcoin indivisible más pequeña. El precio BTC se actualiza desde CoinGecko cada 60 segundos.`
      ],
    },
    pt: {
      how: [
      `O Conversor de Satoshi traduz quantias de Bitcoin entre satoshis, bits, mBTC e BTC, e converte qualquer denominação para seu equivalente atual em USD ou outra moeda fiat.`,
      `Use-o ao ler valores de transações Bitcoin cotados em satoshis, ou ao definir taxas de comissão cotadas em sat/vByte.`
      ],
      inputs: [
      `Insira um valor em qualquer denominação — satoshi, bit, mBTC ou BTC — e os outros preenchem automaticamente.`,
      `Os valores de satoshi são sempre números inteiros já que 1 satoshi é a menor unidade indivisível do Bitcoin.`
      ],
    },
    tr: {
      how: [
      `Satoshi Dönüştürücüsü, Bitcoin miktarlarını satoshi, bit, mBTC ve BTC arasında dönüştürür ve herhangi bir denominasyonu mevcut USD veya fiat karşılığına çevirir.`,
      `Lightning Network ve zincir üstü yazıtlarda satoshi cinsinden belirtilen Bitcoin işlem tutarlarını okurken kullanın.`
      ],
      inputs: [
      `Herhangi bir denominasyonda bir değer girin — satoshi, bit, mBTC veya BTC — ve diğerleri otomatik olarak dolar.`,
      `Satoshi değerleri her zaman tam sayıdır çünkü 1 satoshi en küçük bölünemez Bitcoin birimidir.`
      ],
    },
    hi: {
      how: [
      `सतोशी कन्वर्टर Bitcoin राशियों को satoshis, bits, mBTC और BTC के बीच ट्रांसलेट करता है, और किसी भी डिनॉमिनेशन को उसके वर्तमान USD या फिएट इक्विवेलेंट में कन्वर्ट करता है।`,
      `Lightning Network और ऑन-चेन इंस्क्रिप्शन में satoshis में उद्धृत Bitcoin ट्रांजेक्शन राशियों को पढ़ते समय इसका उपयोग करें।`
      ],
      inputs: [
      `किसी भी डिनॉमिनेशन में एक मूल्य दर्ज करें — satoshi, bit, mBTC, या BTC — और बाकी स्वचालित रूप से भर जाते हैं।`,
      `Satoshi मान हमेशा पूर्ण संख्याएं होती हैं क्योंकि 1 satoshi सबसे छोटी अविभाज्य Bitcoin इकाई है।`
      ],
    },
    ru: {
      how: [
      `Конвертер сатоши переводит суммы Bitcoin между сатоши, битами, мBTC и BTC, а также конвертирует любой номинал в текущий эквивалент в USD или фиатной валюте.`,
      `Используйте при чтении сумм транзакций Bitcoin в сатошах (распространено в Lightning Network и надписях), или при установке комиссий в сат/vByte.`
      ],
      inputs: [
      `Введите значение в любом номинале — сатоши, бит, мBTC или BTC — и остальные поля заполнятся автоматически.`,
      `Значения в сатошах всегда целые числа, поскольку 1 сатоши — наименьшая неделимая единица Bitcoin. Цена BTC обновляется с CoinGecko каждые 60 секунд.`
      ],
    },
  },
  'gwei-converter': {
    en: {
      how: [
      `The Gwei Converter translates Ethereum gas price units between wei, gwei, and ETH, and converts any denomination to its current USD cost for a typical transaction. Understanding gwei is essential for Ethereum users — when you set a gas price of 20 gwei, you're specifying 20 × 10⁻⁹ ETH per unit of gas consumed.`,
      `Use it when MetaMask or your wallet shows a gas price in gwei and you want to understand the actual dollar cost. For EIP-1559 transactions, enter the base fee plus your priority fee (tip) to see the total effective gas price. The calculator also shows the total transaction cost for standard ETH transfers (21,000 gas) and ERC-20 token transfers (≈65,000 gas).`
      ],
      inputs: [
      `Enter a gas price in gwei to see the wei and ETH equivalents, plus the USD cost for a 21,000 gas transfer. Alternatively, enter an ETH amount and get the gwei conversion. The current ETH price is loaded automatically and used for all USD calculations.`,
      `For a complete gas cost estimate, enter both the gas price (gwei) and the gas limit (units of computation) — total fee = gas price × gas limit. A standard ETH transfer uses exactly 21,000 gas. A Uniswap swap typically uses 100,000–200,000 gas depending on complexity.`
      ],
    },
    es: {
      how: [
      `El Conversor de Gwei traduce las unidades de precio de gas de Ethereum entre wei, gwei y ETH, y convierte cualquier denominación a su costo actual en USD para una transacción típica.`,
      `Úsalo cuando MetaMask u otra cartera muestre un precio de gas en gwei y quieras entender el costo real en dólares.`
      ],
      inputs: [
      `Introduce un precio de gas en gwei para ver los equivalentes en wei y ETH, más el costo en USD para una transferencia de 21,000 de gas.`,
      `Para una estimación completa del costo de gas, introduce tanto el precio del gas (gwei) como el límite de gas. Una transferencia ETH estándar usa exactamente 21,000 de gas.`
      ],
    },
    pt: {
      how: [
      `O Conversor de Gwei traduz unidades de preço de gas do Ethereum entre wei, gwei e ETH, e converte qualquer denominação para seu custo atual em USD.`,
      `Use-o quando MetaMask ou sua carteira mostrar um preço de gas em gwei e você quiser entender o custo real em dólares.`
      ],
      inputs: [
      `Insira um preço de gas em gwei para ver os equivalentes em wei e ETH, mais o custo em USD para uma transferência de 21.000 de gas.`,
      `Para uma estimativa completa do custo de gas, insira tanto o preço do gas (gwei) quanto o limite de gas.`
      ],
    },
    tr: {
      how: [
      `Gwei Dönüştürücüsü, Ethereum gas fiyatı birimlerini wei, gwei ve ETH arasında dönüştürür ve tipik bir işlem için herhangi bir denominasyonu mevcut USD maliyetine çevirir.`,
      `MetaMask veya cüzdanınız gwei cinsinden bir gas fiyatı gösterdiğinde ve gerçek dolar maliyetini anlamak istediğinizde kullanın.`
      ],
      inputs: [
      `21.000 gas'lık bir transfer için wei ve ETH eşdeğerlerini ve USD maliyetini görmek üzere gwei cinsinden bir gas fiyatı girin.`,
      `Tam gas maliyeti tahmini için hem gas fiyatını (gwei) hem de gas limitini girin. Standart bir ETH transferi tam olarak 21.000 gas kullanır.`
      ],
    },
    hi: {
      how: [
      `Gwei कन्वर्टर Ethereum गैस प्राइस यूनिट को wei, gwei और ETH के बीच ट्रांसलेट करता है, और किसी भी डिनॉमिनेशन को एक विशिष्ट ट्रांजेक्शन के लिए उसकी वर्तमान USD लागत में कन्वर्ट करता है।`,
      `इसका उपयोग तब करें जब MetaMask या आपका वॉलेट gwei में गैस प्राइस दिखाए और आप वास्तविक डॉलर लागत समझना चाहें।`
      ],
      inputs: [
      `21,000 गैस ट्रांसफर के लिए wei और ETH इक्विवेलेंट और USD लागत देखने के लिए gwei में गैस प्राइस दर्ज करें।`,
      `पूर्ण गैस लागत अनुमान के लिए, गैस प्राइस (gwei) और गैस लिमिट दोनों दर्ज करें। एक स्टैंडर्ड ETH ट्रांसफर ठीक 21,000 गैस का उपयोग करता है।`
      ],
    },
    ru: {
      how: [
      `Конвертер Gwei переводит единицы цены газа Ethereum между wei, gwei и ETH, и конвертирует любой номинал в текущую стоимость в USD для типичной транзакции.`,
      `Используйте, когда MetaMask или ваш кошелёк показывает цену газа в gwei и вы хотите понять реальную стоимость в долларах.`
      ],
      inputs: [
      `Введите цену газа в gwei, чтобы увидеть эквиваленты в wei и ETH, а также стоимость в USD для перевода с 21 000 единиц газа.`,
      `Для полной оценки стоимости газа введите как цену газа (gwei), так и лимит газа. Стандартный перевод ETH использует ровно 21 000 единиц газа.`
      ],
    },
  },
  'gas-calculator': {
    en: {
      how: [
      `The Gas Calculator estimates the total transaction fee in USD for Ethereum and EVM-compatible network transactions. Enter the current gas price in gwei, the gas limit for your transaction type, and the current ETH price to instantly see the total fee — allowing you to decide whether to proceed now or wait for network congestion to ease.`,
      `Use it to compare transaction costs across different networks: enter the same gas limit with the native token price for Polygon, BNB Chain, or Arbitrum to see how much cheaper layer-2 transactions are compared to Ethereum mainnet. For time-sensitive trades, use the 'fast' gas preset; for non-urgent transfers, 'standard' saves significant fees during peak hours.`
      ],
      inputs: [
      `Gas price in gwei is the price you're willing to pay per unit of gas — this determines transaction priority. Current gas prices are shown in three tiers: slow (base fee only), standard (small tip), and fast (higher tip for quick inclusion). Gas limit is the maximum gas your transaction can consume: 21,000 for ETH transfers, 65,000 for ERC-20 transfers, 150,000–300,000 for DeFi interactions.`,
      `ETH price is auto-filled from CoinGecko. The total fee = gas price × gas limit ÷ 10⁹ (converting gwei to ETH) × ETH price in USD. For EIP-1559 transactions, actual cost = (base fee + priority fee) × gas used, where gas used ≤ gas limit. Setting gas limit too low causes transaction failure; setting it too high wastes no ETH (unused gas is refunded).`
      ],
    },
    es: {
      how: [
      `La Calculadora de Gas estima la comisión total de transacción en USD para transacciones en Ethereum y redes compatibles con EVM.`,
      `Úsala para comparar costos de transacción entre diferentes redes: introduce el mismo límite de gas con el precio del token nativo para Polygon, BNB Chain o Arbitrum.`
      ],
      inputs: [
      `El precio del gas en gwei es el precio que estás dispuesto a pagar por unidad de gas. El límite de gas es el máximo de gas que puede consumir tu transacción: 21,000 para transferencias ETH, 65,000 para transferencias ERC-20.`,
      `El precio ETH se rellena automáticamente desde CoinGecko. La comisión total = precio de gas × límite de gas ÷ 10⁹ × precio ETH en USD.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Gas estima a taxa de transação total em USD para transações Ethereum e redes compatíveis com EVM.`,
      `Use-a para comparar custos de transação entre diferentes redes: insira o mesmo limite de gas com o preço do token nativo para Polygon, BNB Chain ou Arbitrum.`
      ],
      inputs: [
      `O preço do gas em gwei é o preço que você está disposto a pagar por unidade de gas. O limite de gas é o máximo de gas que sua transação pode consumir.`,
      `O preço ETH é preenchido automaticamente do CoinGecko. A taxa total = preço do gas × limite de gas ÷ 10⁹ × preço ETH em USD.`
      ],
    },
    tr: {
      how: [
      `Gas Hesaplayıcısı, Ethereum ve EVM uyumlu ağ işlemleri için USD cinsinden toplam işlem ücretini tahmin eder.`,
      `Farklı ağlar arasındaki işlem maliyetlerini karşılaştırmak için kullanın: Polygon, BNB Chain veya Arbitrum için yerel token fiyatıyla aynı gas limitini girin.`
      ],
      inputs: [
      `Gwei cinsinden gas fiyatı, gas birimi başına ödemeye razı olduğunuz fiyattır. Gas limiti, işleminizin tüketebileceği maksimum gas miktarıdır.`,
      `ETH fiyatı CoinGecko'dan otomatik doldurulur. Toplam ücret = gas fiyatı × gas limiti ÷ 10⁹ × USD cinsinden ETH fiyatı.`
      ],
    },
    hi: {
      how: [
      `गैस कैलकुलेटर Ethereum और EVM-compatible नेटवर्क ट्रांजेक्शन के लिए USD में कुल ट्रांजेक्शन फीस का अनुमान लगाता है।`,
      `विभिन्न नेटवर्क पर ट्रांजेक्शन लागत की तुलना करने के लिए इसका उपयोग करें: Polygon, BNB Chain, या Arbitrum के लिए नेटिव टोकन मूल्य के साथ समान गैस लिमिट दर्ज करें।`
      ],
      inputs: [
      `gwei में गैस प्राइस वह मूल्य है जो आप गैस की प्रति यूनिट के लिए भुगतान करने को तैयार हैं। गैस लिमिट आपके ट्रांजेक्शन की अधिकतम गैस खपत है।`,
      `ETH प्राइस CoinGecko से स्वचालित रूप से भरती है। कुल फीस = गैस प्राइस × गैस लिमिट ÷ 10⁹ × USD में ETH प्राइस।`
      ],
    },
    ru: {
      how: [
      `Калькулятор газа оценивает общую стоимость транзакции в USD для Ethereum и EVM-совместимых сетей. Введите текущую цену газа в gwei, лимит газа и цену ETH.`,
      `Используйте для сравнения стоимости транзакций в разных сетях: введите одинаковый лимит газа с ценой нативного токена для Polygon, BNB Chain или Arbitrum.`
      ],
      inputs: [
      `Цена газа в gwei — цена за единицу газа, которую вы готовы заплатить. Лимит газа — максимальное потребление газа: 21 000 для переводов ETH, 65 000 для токенов ERC-20.`,
      `Цена ETH подставляется автоматически из CoinGecko. Итоговая комиссия = цена газа × лимит газа ÷ 10⁹ × цена ETH в USD.`
      ],
    },
  },
  'halving-calculator': {
    en: {
      how: [
      `The Bitcoin Halving Calculator counts down the exact time and blocks remaining until the next Bitcoin halving event, when the block reward paid to miners is cut in half. It displays the current block height, estimated next halving block, days remaining, estimated halving date, and the post-halving block reward.`,
      `Use it to track the halvings cycle for timing investment decisions or understanding supply dynamics. Bitcoin's inflation rate drops by 50% at each halving — historically, the 12–18 months following a halving have seen significant price appreciation as reduced supply issuance meets continued or growing demand. The calculator also shows historical halving dates and price data for context.`
      ],
      inputs: [
      `No manual inputs are required — the calculator auto-fetches the current Bitcoin block height from the network and calculates the remaining blocks until the next halving (halving occurs every 210,000 blocks). The estimated date assumes a 10-minute average block time, which may drift slightly based on current hash rate and difficulty.`,
      `Bitcoin blocks are not mined at a perfectly uniform rate — periods of high hash rate produce blocks faster than 10 minutes, shortening the countdown. The 2024 halving (block 840,000) reduced the reward from 6.25 to 3.125 BTC per block. After the 2028 halving, the reward will be 1.5625 BTC, and the total supply approaches but never exceeds 21 million BTC.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Halving de Bitcoin cuenta regresivamente el tiempo y bloques exactos restantes hasta el próximo evento de halving de Bitcoin, cuando la recompensa de bloque pagada a los mineros se reduce a la mitad.`,
      `Úsala para rastrear el ciclo de halvings para cronometrar decisiones de inversión. La tasa de inflación de Bitcoin se reduce a la mitad en cada halving.`
      ],
      inputs: [
      `No se requieren entradas manuales — la calculadora obtiene automáticamente la altura del bloque de Bitcoin actual y calcula los bloques restantes hasta el próximo halving (ocurre cada 210,000 bloques).`,
      `Los bloques de Bitcoin no se minan a una tasa perfectamente uniforme. El halving de 2024 (bloque 840,000) redujo la recompensa de 6.25 a 3.125 BTC por bloque.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Halving do Bitcoin conta regressivamente o tempo e blocos exatos restantes até o próximo evento de halving do Bitcoin, quando a recompensa de bloco paga aos mineradores é reduzida pela metade.`,
      `Use-a para acompanhar o ciclo de halvings para cronometrar decisões de investimento.`
      ],
      inputs: [
      `Nenhuma entrada manual é necessária — a calculadora busca automaticamente a altura atual do bloco Bitcoin e calcula os blocos restantes até o próximo halving (ocorre a cada 210.000 blocos).`,
      `Os blocos Bitcoin não são minerados a uma taxa perfeitamente uniforme. O halving de 2024 (bloco 840.000) reduziu a recompensa de 6,25 para 3,125 BTC por bloco.`
      ],
    },
    tr: {
      how: [
      `Bitcoin Halving Hesaplayıcısı, madencilere ödenen blok ödülünün yarıya indirildiği bir sonraki Bitcoin halving etkinliğine kadar kalan tam süreyi ve blokları geri sayar.`,
      `Yatırım kararlarını zamanlamak için halving döngüsünü takip etmek üzere kullanın.`
      ],
      inputs: [
      `Manuel giriş gerekmez — hesaplayıcı mevcut Bitcoin blok yüksekliğini otomatik olarak alır ve bir sonraki halvinge kadar kalan blokları hesaplar (her 210.000 blokta bir gerçekleşir).`,
      `Bitcoin blokları mükemmel biçimde eşit bir hızda üretilmez. 2024 halvinginde (blok 840.000) ödül 6.25'ten 3.125 BTC'ye düşürüldü.`
      ],
    },
    hi: {
      how: [
      `Bitcoin हाल्विंग कैलकुलेटर अगले Bitcoin हाल्विंग इवेंट तक बचे सटीक समय और ब्लॉक की काउंटडाउन करता है, जब माइनर्स को भुगतान की गई ब्लॉक रिवॉर्ड आधी हो जाती है।`,
      `निवेश निर्णयों के समय के लिए हाल्विंग साइकिल ट्रैक करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `कोई मैन्युअल इनपुट आवश्यक नहीं — कैलकुलेटर स्वचालित रूप से वर्तमान Bitcoin ब्लॉक हाइट फेच करता है और अगले हाल्विंग तक शेष ब्लॉक की गणना करता है (हर 210,000 ब्लॉक पर होता है)।`,
      `Bitcoin ब्लॉक पूरी तरह से एकसमान दर पर माइन नहीं होते। 2024 हाल्विंग (ब्लॉक 840,000) ने रिवॉर्ड 6.25 से 3.125 BTC प्रति ब्लॉक तक कम कर दिया।`
      ],
    },
    ru: {
      how: [
      `Калькулятор халвинга Bitcoin ведёт обратный отсчёт точного времени и блоков до следующего события халвинга, когда награда майнерам за блок уменьшается вдвое.`,
      `Используйте для отслеживания цикла халвингов при принятии инвестиционных решений. Уровень инфляции Bitcoin снижается вдвое на каждом халвинге.`
      ],
      inputs: [
      `Ручной ввод не требуется — калькулятор автоматически загружает текущую высоту блока Bitcoin и вычисляет оставшиеся блоки до следующего халвинга (каждые 210 000 блоков).`,
      `Блоки Bitcoin добываются не с идеально равномерной скоростью. Халвинг 2024 года (блок 840 000) снизил вознаграждение с 6,25 до 3,125 BTC за блок.`
      ],
    },
  },
  'nft-profit-calculator': {
    en: {
      how: [
      `The NFT Profit Calculator computes the net gain or loss from buying and selling an NFT after accounting for marketplace fees, gas costs, and royalties. Enter your purchase price (including gas), sale price, marketplace fee percentage, creator royalty percentage, and gas fees for the sale transaction to see your actual profit margin.`,
      `Use it before listing an NFT to determine the minimum sale price needed to break even or hit a profit target. With typical OpenSea fees of 2.5% and creator royalties of 5–10%, you need to sell at 7.5–12.5% above your purchase price just to break even. The calculator makes this threshold explicit and helps you avoid underpricing your listing.`
      ],
      inputs: [
      `Purchase price is the amount you paid for the NFT in ETH or USD, including any gas fees at the time of purchase. Sale price is your planned or actual sale price. Marketplace fee percentage varies by platform (OpenSea: 2.5%, Blur: 0.5%, LooksRare: 2%). Creator royalty is set by the NFT project and typically ranges from 0% to 10%.`,
      `Gas fees for the sale transaction are network-dependent — on Ethereum mainnet during peak periods, gas can add $20–100+ to your costs, while Polygon or Arbitrum gas is negligible. For collections trading on multiple marketplaces, compare the fee structures side by side using different fee percentages to find where selling is most profitable.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Ganancias NFT calcula la ganancia o pérdida neta de comprar y vender un NFT después de contabilizar las comisiones del marketplace, costos de gas y regalías.`,
      `Úsala antes de listar un NFT para determinar el precio mínimo de venta necesario para llegar al punto de equilibrio o alcanzar un objetivo de ganancia.`
      ],
      inputs: [
      `El precio de compra es el importe que pagaste por el NFT en ETH o USD, incluyendo cualquier tarifa de gas. Las comisiones del marketplace varían según la plataforma (OpenSea: 2.5%, Blur: 0.5%).`,
      `Las tarifas de gas para la transacción de venta dependen de la red. Para colecciones que se negocian en varios marketplaces, compara las estructuras de comisiones con diferentes porcentajes.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Lucro NFT calcula o ganho ou perda líquida de comprar e vender um NFT após contabilizar taxas de marketplace, custos de gas e royalties.`,
      `Use-a antes de listar um NFT para determinar o preço mínimo de venda necessário para atingir o ponto de equilíbrio ou uma meta de lucro.`
      ],
      inputs: [
      `O preço de compra é o valor que você pagou pelo NFT em ETH ou USD, incluindo taxas de gas. A taxa de marketplace varia por plataforma (OpenSea: 2,5%, Blur: 0,5%).`,
      `As taxas de gas para a transação de venda dependem da rede. Para coleções negociadas em múltiplos marketplaces, compare as estruturas de taxas.`
      ],
    },
    tr: {
      how: [
      `NFT Kâr Hesaplayıcısı, bir NFT'yi alıp satmaktan elde edilen net kazanç veya kaybı marketplace ücretleri, gas maliyetleri ve telif hakları dahil ederek hesaplar.`,
      `Minimum satış fiyatını belirlemek için bir NFT'yi listelemeden önce kullanın.`
      ],
      inputs: [
      `Alış fiyatı, gas ücretleri dahil ETH veya USD olarak NFT için ödediğiniz tutardır. Marketplace ücreti platforma göre değişir (OpenSea: %2.5, Blur: %0.5).`,
      `Satış işlemi için gas ücretleri ağa bağlıdır. Birden fazla marketplace'te işlem gören koleksiyonlar için farklı ücret yapılarını karşılaştırın.`
      ],
    },
    hi: {
      how: [
      `NFT प्रॉफिट कैलकुलेटर मार्केटप्लेस फीस, गैस कॉस्ट और रॉयल्टी का हिसाब लगाने के बाद NFT खरीदने और बेचने से नेट लाभ या हानि की गणना करता है।`,
      `न्यूनतम बिक्री मूल्य निर्धारित करने के लिए NFT लिस्ट करने से पहले इसका उपयोग करें।`
      ],
      inputs: [
      `खरीद मूल्य ETH या USD में NFT के लिए आपने जो भुगतान किया है वह राशि है, जिसमें गैस फीस शामिल है। मार्केटप्लेस फीस प्लेटफॉर्म के अनुसार भिन्न होती है।`,
      `बिक्री ट्रांजेक्शन के लिए गैस फीस नेटवर्क पर निर्भर है। कई मार्केटप्लेस पर ट्रेड होने वाले कलेक्शन के लिए, अलग-अलग फीस प्रतिशत का उपयोग करके फीस स्ट्रक्चर की तुलना करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор прибыли NFT вычисляет чистый доход или убыток от покупки и продажи NFT с учётом комиссий маркетплейса, стоимости газа и роялти.`,
      `Используйте перед выставлением NFT, чтобы определить минимальную цену продажи для выхода в ноль или достижения целевой прибыли.`
      ],
      inputs: [
      `Цена покупки — сумма, уплаченная за NFT в ETH или USD, включая комиссию за газ. Комиссия маркетплейса варьируется по платформам (OpenSea: 2,5%, Blur: 0,5%). Роялти — установлено создателем коллекции.`,
      `Стоимость газа при продаже зависит от сети. Для коллекций, торгующихся на нескольких маркетплейсах, сравните структуру комиссий, вводя разные процентные значения.`
      ],
    },
  },
  'gpu-mining-calculator': {
    en: {
      how: [
      `The GPU Mining Calculator estimates profitability for Ethereum Classic, Kaspa, Ravencoin, Ergo, and other GPU-mineable coins. Enter your GPU hashrate, power consumption, electricity rate, and pool fee to see daily, weekly, and monthly revenue and profit projections alongside a hardware payback period.`,
      `Use it to compare mining different coins with the same GPU setup — a 3080 Ti might earn more mining Kaspa than ETC depending on current difficulty and price. Run the calculator with today's coin price and a 20% lower price to ensure profitability holds up under moderate price decline. Factor in cooling overhead (typically 10–15% extra power consumption for enclosed rigs).`
      ],
      inputs: [
      `GPU hashrate must match the specific algorithm used by the target coin — your GPU may hash at 100 MH/s on Ethash but only 1.5 GH/s on KHeavyHash (Kaspa). Refer to benchmark databases like WhatToMine for algorithm-specific hashrates for your GPU model. Power consumption should include the full system draw, not just the GPU TDP.`,
      `Pool fee varies by pool — major pools like 2Miners, F2Pool, and Ethermine charge between 0.5% and 2%. The calculator auto-fills network difficulty and coin price from live data for the most popular GPU coins. For coins not listed, enter manual difficulty and block reward values from the coin's block explorer.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Minería GPU estima la rentabilidad para Ethereum Classic, Kaspa, Ravencoin, Ergo y otras monedas minables por GPU.`,
      `Úsala para comparar la minería de diferentes monedas con la misma configuración de GPU. Ejecuta con el precio de la moneda actual y un 20% más bajo para asegurar que la rentabilidad se mantiene.`
      ],
      inputs: [
      `El hashrate de la GPU debe coincidir con el algoritmo específico utilizado por la moneda objetivo. Consulta bases de datos de benchmarks como WhatToMine para hashrates específicos del algoritmo.`,
      `La comisión del pool varía según el pool. La calculadora rellena automáticamente la dificultad de red y el precio de la moneda con datos en tiempo real.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Mineração GPU estima a lucratividade para Ethereum Classic, Kaspa, Ravencoin, Ergo e outras moedas mineráveis por GPU.`,
      `Use-a para comparar a mineração de diferentes moedas com a mesma configuração de GPU.`
      ],
      inputs: [
      `O hashrate da GPU deve corresponder ao algoritmo específico usado pela moeda alvo. Consulte bases de dados de benchmarks como WhatToMine para hashrates específicos do algoritmo.`,
      `A taxa de pool varia por pool. A calculadora preenche automaticamente a dificuldade da rede e o preço da moeda com dados ao vivo.`
      ],
    },
    tr: {
      how: [
      `GPU Madencilik Hesaplayıcısı, Ethereum Classic, Kaspa, Ravencoin, Ergo ve diğer GPU ile madencilik yapılabilir coinler için kârlılığı tahmin eder.`,
      `Aynı GPU kurulumunda farklı coinlerin madenciliğini karşılaştırmak için kullanın.`
      ],
      inputs: [
      `GPU hashrate, hedef coin tarafından kullanılan belirli algoritmaya eşleşmelidir. Algoritma spesifik hashrateler için WhatToMine gibi kıyaslama veritabanlarına bakın.`,
      `Havuz ücreti havuza göre değişir. Hesaplayıcı en popüler GPU coinleri için ağ zorluğu ve coin fiyatını canlı verilerle otomatik doldurur.`
      ],
    },
    hi: {
      how: [
      `GPU माइनिंग कैलकुलेटर Ethereum Classic, Kaspa, Ravencoin, Ergo और अन्य GPU-माइनेबल कॉइन के लिए लाभप्रदता का अनुमान लगाता है।`,
      `एक ही GPU सेटअप के साथ विभिन्न कॉइन माइन करने की तुलना करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `GPU हैशरेट टार्गेट कॉइन द्वारा उपयोग किए गए विशिष्ट एल्गोरिदम से मेल खाना चाहिए। अपने GPU मॉडल के लिए एल्गोरिदम-विशिष्ट हैशरेट के लिए WhatToMine जैसे बेंचमार्क डेटाबेस देखें।`,
      `पूल फीस पूल के अनुसार अलग-अलग होती है। कैलकुलेटर सबसे लोकप्रिय GPU कॉइन के लिए नेटवर्क डिफिकल्टी और कॉइन प्राइस को लाइव डेटा से स्वचालित रूप से भरता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор майнинга на GPU оценивает прибыльность для Ethereum Classic, Kaspa, Ravencoin, Ergo и других монет, добываемых на видеокартах.`,
      `Используйте для сравнения майнинга разных монет на одинаковой конфигурации GPU. Протестируйте при текущей цене монеты и на 20% ниже, чтобы убедиться в устойчивости прибыльности.`
      ],
      inputs: [
      `Хешрейт GPU должен соответствовать конкретному алгоритму целевой монеты. Данные по хешрейту для каждого алгоритма можно найти на WhatToMine.`,
      `Комиссия пула варьируется. Для наиболее популярных GPU-монет калькулятор автоматически заполняет данные о сложности сети и цене монеты из актуальных источников.`
      ],
    },
  },
  'exchange-fees': {
    en: {
      how: [
      `The Exchange Fees Calculator compares the trading fee cost across multiple cryptocurrency exchanges for a given trade size. Enter your trade amount and select your trading tier (maker vs taker, or your VIP level) on each exchange to instantly see the fee in dollars and as a percentage — identifying which platform offers the best deal for your order type and volume.`,
      `Use it when deciding where to execute a large trade: a 0.1% fee difference on a $100,000 trade is $100 in direct cost. Also use it to evaluate whether holding an exchange's native token (like BNB on Binance or KCS on KuCoin) for a fee discount is worth the opportunity cost versus deploying that capital elsewhere.`
      ],
      inputs: [
      `Trade amount is the total value of your order in USD. Select maker fees for limit orders that add liquidity to the order book and taker fees for market orders that remove liquidity. Most tier 1 exchanges (Binance, Coinbase, Kraken) charge 0.04–0.10% for makers and 0.06–0.20% for takers at baseline.`,
      `Some exchanges offer flat fee structures (Coinbase Advanced), tiered volume discounts (Binance, OKX), or token-based discounts (BNB discount on Binance reduces fees by 25%). For high-frequency traders, the distinction between maker and taker is critical since maker fees are often zero or even negative (rebates) on the highest tiers.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Comisiones de Exchange compara el costo de comisiones de trading en múltiples exchanges de criptomonedas para un tamaño de operación dado.`,
      `Úsala cuando decidas dónde ejecutar una operación grande: una diferencia de comisión del 0.1% en una operación de $100,000 son $100 en costo directo.`
      ],
      inputs: [
      `El importe de la operación es el valor total de tu orden en USD. Selecciona comisiones de maker para órdenes limitadas que añaden liquidez al libro de órdenes y comisiones de taker para órdenes de mercado.`,
      `Algunos exchanges ofrecen estructuras de comisiones planas, descuentos por volumen por niveles o descuentos basados en tokens.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Taxas de Exchange compara o custo de taxas de negociação em múltiplas exchanges de criptomoedas para um determinado tamanho de negociação.`,
      `Use-a ao decidir onde executar uma negociação grande: uma diferença de taxa de 0,1% em uma negociação de $100.000 é $100 em custo direto.`
      ],
      inputs: [
      `O valor da negociação é o valor total do seu pedido em USD. Selecione taxas de maker para ordens limitadas que adicionam liquidez ao livro de ordens e taxas de taker para ordens de mercado.`,
      `Algumas exchanges oferecem estruturas de taxas planas, descontos por volume em camadas ou descontos baseados em tokens.`
      ],
    },
    tr: {
      how: [
      `Exchange Ücretleri Hesaplayıcısı, belirli bir işlem boyutu için birden fazla kripto para borsasındaki işlem ücreti maliyetini karşılaştırır.`,
      `Büyük bir işlemi nerede gerçekleştireceğinize karar verirken kullanın: 100.000 dolarlık bir işlemde %0.1 ücret farkı doğrudan 100 dolar maliyettir.`
      ],
      inputs: [
      `İşlem tutarı, USD cinsinden siparişinizin toplam değeridir. Sipariş defterine likidite ekleyen limit emirleri için maker ücretlerini, likiditeyi kaldıran piyasa emirleri için taker ücretlerini seçin.`,
      `Bazı borsalar sabit ücret yapıları, katmanlı hacim indirimleri veya token tabanlı indirimler sunar.`
      ],
    },
    hi: {
      how: [
      `एक्सचेंज फीस कैलकुलेटर दी गई ट्रेड साइज के लिए कई क्रिप्टोकरेंसी एक्सचेंज पर ट्रेडिंग फीस लागत की तुलना करता है।`,
      `बड़ा ट्रेड कहां एक्जीक्यूट करना है यह तय करते समय इसका उपयोग करें: $100,000 ट्रेड पर 0.1% फीस अंतर $100 की प्रत्यक्ष लागत है।`
      ],
      inputs: [
      `ट्रेड अमाउंट USD में आपके ऑर्डर का कुल मूल्य है। ऑर्डर बुक में लिक्विडिटी जोड़ने वाले लिमिट ऑर्डर के लिए मेकर फीस और मार्केट ऑर्डर के लिए टेकर फीस चुनें।`,
      `कुछ एक्सचेंज फ्लैट फीस स्ट्रक्चर, टियर्ड वॉल्यूम डिस्काउंट, या टोकन-आधारित डिस्काउंट प्रदान करते हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор комиссий биржи сравнивает стоимость торговых комиссий на нескольких криптовалютных биржах для заданного объёма сделки.`,
      `Используйте при выборе биржи для крупной сделки: разница в 0,1% комиссии при сделке на $100 000 — это $100 прямых затрат.`
      ],
      inputs: [
      `Объём сделки — общая стоимость ордера в USD. Выберите комиссии мейкера для лимитных ордеров, добавляющих ликвидность, и комиссии тейкера для рыночных ордеров.`,
      `Некоторые биржи предлагают фиксированные тарифы, уровневые скидки за объём или скидки при оплате нативным токеном (например, BNB снижает комиссии на Binance на 25%).`
      ],
    },
  },
  'vesting-calculator': {
    en: {
      how: [
      `The Vesting Calculator shows the token unlock schedule for a crypto project, breaking down exactly how many tokens become available at each vesting milestone. Enter the total token allocation, cliff period, vesting duration, and vesting frequency to see a month-by-month or quarter-by-quarter token release table alongside the USD value at current prices.`,
      `Use it before participating in an ICO, IDO, or token round to understand when your tokens will be liquid. For project tokens with large team or VC allocations vesting over 2–4 years, compare the scheduled unlock rate against daily trading volume — if monthly unlocks exceed 5% of daily volume, there may be consistent sell pressure at each vesting date.`
      ],
      inputs: [
      `Total allocation is the number of tokens you or a specific stakeholder group will receive. Cliff period is the initial lockup duration during which no tokens are released — typically 6–12 months for team allocations. Vesting duration is the total time over which tokens are released after the cliff. Frequency options include monthly, quarterly, or linear continuous vesting.`,
      `TGE (Token Generation Event) unlock percentage is the portion released immediately at launch — seed round investors often receive 5–10% at TGE with the remainder vesting over 12–24 months. Token price is auto-filled from live CoinGecko data for listed tokens. For unlisted tokens, enter the round price or target listing price manually.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Vesting muestra el calendario de desbloqueo de tokens para un proyecto cripto, desglosando exactamente cuántos tokens estarán disponibles en cada hito de vesting.`,
      `Úsala antes de participar en un ICO, IDO o ronda de tokens para entender cuándo serán líquidos tus tokens.`
      ],
      inputs: [
      `La asignación total es el número de tokens que recibirás. El período de cliff es la duración inicial de bloqueo durante la cual no se liberan tokens. La duración del vesting es el tiempo total durante el que se liberan los tokens después del cliff.`,
      `El porcentaje de desbloqueo en el TGE es la porción liberada inmediatamente en el lanzamiento. El precio del token se rellena automáticamente con datos en tiempo real de CoinGecko para tokens listados.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Vesting mostra o cronograma de desbloqueio de tokens para um projeto cripto, detalhando exatamente quantos tokens ficam disponíveis em cada marco de vesting.`,
      `Use-a antes de participar de um ICO, IDO ou rodada de tokens para entender quando seus tokens serão líquidos.`
      ],
      inputs: [
      `A alocação total é o número de tokens que você receberá. O período de cliff é a duração inicial de bloqueio durante a qual nenhum token é liberado. A duração do vesting é o tempo total ao longo do qual os tokens são liberados após o cliff.`,
      `A porcentagem de desbloqueio no TGE é a porção liberada imediatamente no lançamento. O preço do token é preenchido automaticamente com dados ao vivo do CoinGecko para tokens listados.`
      ],
    },
    tr: {
      how: [
      `Vesting Hesaplayıcısı, bir kripto proje için token kilit açma programını gösterir ve her vesting kilometre taşında tam olarak kaç tokenın kullanılabilir hale geldiğini ayrıştırır.`,
      `Token'larınızın ne zaman likit olacağını anlamak için bir ICO, IDO veya token turuna katılmadan önce kullanın.`
      ],
      inputs: [
      `Toplam tahsisat alacağınız token sayısıdır. Cliff süresi, hiçbir tokenın serbest bırakılmadığı ilk kilit süresidir. Vesting süresi, clifften sonra tokenların serbest bırakıldığı toplam süredir.`,
      `TGE kilit açma yüzdesi, başlatmada hemen serbest bırakılan kısımdır. Token fiyatı listelenen tokenlar için CoinGecko canlı verilerinden otomatik doldurulur.`
      ],
    },
    hi: {
      how: [
      `वेस्टिंग कैलकुलेटर किसी क्रिप्टो प्रोजेक्ट के लिए टोकन अनलॉक शेड्यूल दिखाता है, प्रत्येक वेस्टिंग मील स्टोन पर कितने टोकन उपलब्ध होते हैं यह विस्तार से बताता है।`,
      `ICO, IDO, या टोकन राउंड में भाग लेने से पहले यह समझने के लिए इसका उपयोग करें कि आपके टोकन कब लिक्विड होंगे।`
      ],
      inputs: [
      `कुल आवंटन टोकन की वह संख्या है जो आपको मिलेगी। क्लिफ पीरियड वह प्रारंभिक लॉकअप अवधि है जिसके दौरान कोई टोकन रिलीज नहीं होते।`,
      `TGE अनलॉक प्रतिशत वह हिस्सा है जो लॉन्च पर तुरंत रिलीज होता है। लिस्टेड टोकन के लिए टोकन प्राइस CoinGecko लाइव डेटा से स्वचालित रूप से भरती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор вестинга показывает расписание разблокировки токенов для криптопроекта с разбивкой по каждому вестинговому событию.`,
      `Используйте перед участием в ICO, IDO или токенраунде, чтобы понять, когда ваши токены станут ликвидными.`
      ],
      inputs: [
      `Общее распределение — количество токенов, которые вы получите. Клифф — начальный период блокировки без выпуска токенов. Период вестинга — полное время выпуска токенов после клиффа.`,
      `Процент разблокировки на TGE — доля, выпущенная сразу на старте. Цена токена автоматически подтягивается с CoinGecko для листинговых токенов. Для неразмещённых — введите цену раунда вручную.`
      ],
    },
  },
  'risk-reward-calculator': {
    en: {
      how: [
      `The Risk/Reward Calculator measures the ratio between your potential profit and potential loss for any trade setup. Enter your entry price, take profit target, and stop-loss level to instantly see the risk/reward ratio and whether the trade meets a minimum acceptable threshold. Most professional traders require at least a 1:2 risk/reward ratio before entering a trade.`,
      `Use it to filter out low-quality setups before they consume capital. A trade risking 5% to potentially gain 5% is a 1:1 ratio — break-even at best after fees. A trade risking 3% to potentially gain 12% is a 1:4 ratio — meaning you can be wrong 3 times and still profit from 1 win. Run every planned entry through this calculator before opening a position.`
      ],
      inputs: [
      `Entry price is your planned buy price. Take profit is your upside target where you plan to close the trade for a profit. Stop-loss is the downside level where you will exit if the trade moves against you. All three prices determine the ratio: reward = (take profit - entry) / entry, risk = (entry - stop loss) / entry.`,
      `The calculator also shows the dollar amounts at risk and potential profit given your position size. For short trades, the reward is below the entry price and the risk is above it — enter the values accordingly and the calculator adjusts. A risk/reward of 1:3 means you need a win rate above 25% to be profitable over time.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Riesgo/Recompensa mide la relación entre tu ganancia potencial y pérdida potencial para cualquier configuración de operación.`,
      `Úsala para filtrar configuraciones de baja calidad antes de que consuman capital. La mayoría de los traders profesionales requieren al menos una relación riesgo/recompensa de 1:2.`
      ],
      inputs: [
      `El precio de entrada es tu precio de compra planificado. El take profit es tu objetivo alcista. El stop-loss es el nivel bajista donde saldrás si la operación va en tu contra.`,
      `La calculadora también muestra los importes en dólares en riesgo y ganancia potencial dado el tamaño de tu posición.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Risco/Recompensa mede a relação entre seu lucro potencial e perda potencial para qualquer configuração de negociação.`,
      `Use-a para filtrar configurações de baixa qualidade antes que consumam capital.`
      ],
      inputs: [
      `O preço de entrada é seu preço de compra planejado. O take profit é seu alvo de alta. O stop-loss é o nível de baixa onde você sairá se a negociação ir contra você.`,
      `A calculadora também mostra os valores em dólar em risco e lucro potencial dado o tamanho da sua posição.`
      ],
    },
    tr: {
      how: [
      `Risk/Ödül Hesaplayıcısı, herhangi bir işlem kurulumu için potansiyel kârınız ile potansiyel kaybınız arasındaki oranı ölçer.`,
      `Sermaye tüketmeden önce düşük kaliteli kurulumları filtrelemek için kullanın.`
      ],
      inputs: [
      `Giriş fiyatı planladığınız alış fiyatıdır. Take profit yukarı yönlü hedefinizdir. Stop-loss, işlem aleyhinize giderse çıkacağınız aşağı yönlü seviyedir.`,
      `Hesaplayıcı ayrıca pozisyon büyüklüğünüz göz önüne alındığında risk altındaki ve potansiyel kârdaki dolar tutarlarını da gösterir.`
      ],
    },
    hi: {
      how: [
      `रिस्क/रिवॉर्ड कैलकुलेटर किसी भी ट्रेड सेटअप के लिए आपके संभावित प्रॉफिट और संभावित लॉस के बीच अनुपात को मापता है।`,
      `पूंजी खर्च करने से पहले कम-गुणवत्ता वाले सेटअप को फ़िल्टर करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `एंट्री प्राइस आपका नियोजित खरीद मूल्य है। टेक प्रॉफिट आपका अपसाइड टार्गेट है। स्टॉप-लॉस वह डाउनसाइड लेवल है जहां आप एग्जिट करेंगे।`,
      `कैलकुलेटर आपके पोजीशन साइज को देखते हुए जोखिम और संभावित प्रॉफिट में डॉलर राशि भी दिखाता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор риска/прибыли измеряет соотношение потенциальной прибыли к потенциальному убытку для любой торговой идеи.`,
      `Используйте для отсева низкокачественных сетапов до того, как они израсходуют капитал. Большинство профессиональных трейдеров требуют минимального соотношения 1:2.`
      ],
      inputs: [
      `Цена входа — планируемая цена покупки. Тейк-профит — целевой уровень для фиксации прибыли. Стоп-лосс — уровень выхода при неблагоприятном движении.`,
      `Калькулятор также показывает суммы в долларах, находящиеся под риском и в потенциальной прибыли, с учётом размера позиции.`
      ],
    },
  },
  'margin-calculator': {
    en: {
      how: [
      `The Margin Calculator computes the required initial margin, maintenance margin, and available leverage for any leveraged crypto position. Enter your account balance, desired position size, and leverage ratio to see the exact margin required to open the trade and how much buffer you have before a margin call.`,
      `Use it to plan positions that use a defined portion of your account margin — never over-allocating. For cross-margin accounts, factor in all open positions when calculating remaining available margin. For isolated-margin positions, the margin required is fixed at open regardless of your total account balance.`
      ],
      inputs: [
      `Account balance is your total margin account equity. Position size is the notional value of the trade (e.g., $50,000 worth of BTC). Leverage is the multiplier (e.g., 10× means you control $50,000 with $5,000 margin). Initial margin = position size / leverage. Maintenance margin is typically 50% of initial margin for most exchanges.`,
      `The margin ratio (maintenance margin / equity) triggers a margin call when it exceeds 100% — at that point, the exchange auto-liquidates. Monitor margin ratio in real time as price moves. A 1% adverse move with 10× leverage consumes 10% of your position margin.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Margen calcula el margen inicial requerido, el margen de mantenimiento y el apalancamiento disponible para cualquier posición cripto apalancada.`,
      `Úsala para planificar posiciones que usen una porción definida del margen de tu cuenta.`
      ],
      inputs: [
      `El saldo de cuenta es el patrimonio total de tu cuenta de margen. El tamaño de posición es el valor nocional de la operación. El margen inicial = tamaño de posición / apalancamiento.`,
      `La relación de margen desencadena una llamada de margen cuando supera el 100%. Un movimiento adverso del 1% con apalancamiento de 10× consume el 10% del margen de tu posición.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Margem calcula a margem inicial necessária, a margem de manutenção e a alavancagem disponível para qualquer posição cripto alavancada.`,
      `Use-a para planejar posições que usem uma porção definida da margem da sua conta.`
      ],
      inputs: [
      `O saldo da conta é o patrimônio total da sua conta de margem. O tamanho da posição é o valor nocional da negociação. Margem inicial = tamanho da posição / alavancagem.`,
      `A proporção de margem aciona uma chamada de margem quando excede 100%.`
      ],
    },
    tr: {
      how: [
      `Marj Hesaplayıcısı, herhangi bir kaldıraçlı kripto pozisyonu için gerekli başlangıç marjını, bakım marjını ve mevcut kaldıracı hesaplar.`,
      `Hesabınızın marjının belirli bir kısmını kullanan pozisyonları planlamak için kullanın.`
      ],
      inputs: [
      `Hesap bakiyesi toplam marj hesabı öz sermayenizdir. Pozisyon büyüklüğü işlemin nominal değeridir. Başlangıç marjı = pozisyon büyüklüğü / kaldıraç.`,
      `Marj oranı %100'ü aştığında marj çağrısını tetikler. 10× kaldıraçla %1'lik olumsuz bir hareket pozisyon marjınızın %10'unu tüketir.`
      ],
    },
    hi: {
      how: [
      `मार्जिन कैलकुलेटर किसी भी लीवरेज्ड क्रिप्टो पोजीशन के लिए आवश्यक प्रारंभिक मार्जिन, मेंटेनेंस मार्जिन और उपलब्ध लीवरेज की गणना करता है।`,
      `अपने अकाउंट मार्जिन के एक परिभाषित हिस्से का उपयोग करने वाली पोजीशन की योजना बनाने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `अकाउंट बैलेंस आपका कुल मार्जिन अकाउंट इक्विटी है। पोजीशन साइज ट्रेड का नॉशनल वैल्यू है। प्रारंभिक मार्जिन = पोजीशन साइज / लीवरेज।`,
      `मार्जिन अनुपात 100% से अधिक होने पर मार्जिन कॉल ट्रिगर होती है। 10× लीवरेज के साथ 1% प्रतिकूल चाल आपके पोजीशन मार्जिन का 10% खपत करती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор маржи рассчитывает требуемую начальную маржу, поддерживающую маржу и доступное плечо для любой позиции с кредитным плечом.`,
      `Используйте для планирования позиций, которые задействуют определённую долю маржи счёта — без избыточного использования.`
      ],
      inputs: [
      `Баланс счёта — суммарный капитал маржинального счёта. Размер позиции — номинальная стоимость сделки. Начальная маржа = размер позиции / плечо.`,
      `Маржевое требование выставляется, когда коэффициент маржи превышает 100%. Неблагоприятное движение в 1% при плече 10× потребляет 10% маржи позиции.`
      ],
    },
  },
  'hodl-vs-trade': {
    en: {
      how: [
      `The HODL vs Trade Calculator compares the final portfolio value of a buy-and-hold strategy against an active trading strategy over the same period. Enter the starting amount, the coin's price return over the period, and the simulated active trading performance (win rate, average gain/loss, number of trades) to see which approach would have outperformed.`,
      `Use it to reality-check whether active trading is worth the time and stress compared to simply holding. Most retail traders underperform buy-and-hold due to trading fees, emotional decisions, and opportunity costs. The calculator quantifies the performance gap and shows the breakeven active trading win rate needed to match holding.`
      ],
      inputs: [
      `Starting amount is your initial investment in USD. HODL performance is auto-calculated from the coin's price change over the specified period. For active trading simulation, enter your estimated win rate (%), average gain per winning trade (%), average loss per losing trade (%), number of trades, and fee percentage per trade.`,
      `A realistic active trading simulation might use 55% win rate, 5% average gain, 3% average loss, 100 trades/year, and 0.1% fee per trade. With these parameters, the calculator shows whether this trading performance exceeds or lags behind a simple HODL strategy for the same coin over the same period.`
      ],
    },
    es: {
      how: [
      `La Calculadora HODL vs Trading compara el valor final de la cartera de una estrategia de comprar y mantener contra una estrategia de trading activo durante el mismo período.`,
      `Úsala para verificar si el trading activo vale la pena comparado con simplemente mantener.`
      ],
      inputs: [
      `El importe inicial es tu inversión inicial en USD. El rendimiento HODL se calcula automáticamente desde el cambio de precio de la moneda durante el período especificado.`,
      `Una simulación realista de trading activo podría usar 55% de tasa de éxito, 5% de ganancia promedio, 3% de pérdida promedio, 100 operaciones/año y 0.1% de comisión por operación.`
      ],
    },
    pt: {
      how: [
      `A Calculadora HODL vs Trading compara o valor final do portfólio de uma estratégia de comprar e manter contra uma estratégia de negociação ativa durante o mesmo período.`,
      `Use-a para verificar se a negociação ativa vale a pena comparada a simplesmente manter.`
      ],
      inputs: [
      `O valor inicial é seu investimento inicial em USD. O desempenho HODL é calculado automaticamente a partir da mudança de preço da moeda durante o período especificado.`,
      `Uma simulação realista de negociação ativa pode usar 55% de taxa de acerto, 5% de ganho médio, 3% de perda média, 100 negociações/ano e 0,1% de taxa por negociação.`
      ],
    },
    tr: {
      how: [
      `HODL vs Ticaret Hesaplayıcısı, aynı dönem boyunca bir al ve tut stratejisinin nihai portföy değerini aktif bir ticaret stratejisiyle karşılaştırır.`,
      `Aktif ticaretin basitçe tutmaya kıyasla zaman ve stresi değer olup olmadığını gerçeklik testine tabi tutmak için kullanın.`
      ],
      inputs: [
      `Başlangıç tutarı USD cinsinden başlangıç yatırımınızdır. HODL performansı belirtilen dönem boyunca coinin fiyat değişiminden otomatik hesaplanır.`,
      `Gerçekçi bir aktif ticaret simülasyonu %55 kazanma oranı, %5 ortalama kazanç, %3 ortalama kayıp, yılda 100 işlem ve işlem başına %0.1 ücret kullanabilir.`
      ],
    },
    hi: {
      how: [
      `HODL vs ट्रेड कैलकुलेटर बाय-एंड-होल्ड रणनीति और सक्रिय ट्रेडिंग रणनीति के अंतिम पोर्टफोलियो मूल्य की तुलना करता है।`,
      `यह जांचने के लिए इसका उपयोग करें कि क्या सक्रिय ट्रेडिंग केवल होल्ड करने की तुलना में समय और तनाव के लायक है।`
      ],
      inputs: [
      `शुरुआती राशि USD में आपका प्रारंभिक निवेश है। HODL प्रदर्शन निर्दिष्ट अवधि में कॉइन के मूल्य परिवर्तन से स्वचालित रूप से गणना की जाती है।`,
      `एक यथार्थवादी सक्रिय ट्रेडिंग सिमुलेशन 55% विन रेट, 5% औसत लाभ, 3% औसत हानि, 100 ट्रेड/वर्ष और प्रति ट्रेड 0.1% फीस का उपयोग कर सकती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор HODL vs Trading сравнивает итоговую стоимость портфеля при стратегии «купил и держи» против активной торговли за один и тот же период.`,
      `Используйте для проверки реальности: стоит ли активная торговля временных и эмоциональных затрат по сравнению с простым удержанием.`
      ],
      inputs: [
      `Начальная сумма — ваши начальные инвестиции в USD. Доходность HODL рассчитывается автоматически по изменению цены монеты за указанный период.`,
      `Реалистичная симуляция активной торговли: процент прибыльных сделок 55%, средний доход по выигрышным сделкам 5%, средний убыток по проигрышным 3%, 100 сделок/год, комиссия 0,1% за сделку.`
      ],
    },
  },
  'rebalancing-calculator': {
    en: {
      how: [
      `The Portfolio Rebalancing Calculator shows how to restore your target asset allocation after market movements have caused your actual weights to drift. Enter each asset, its current value, and your target percentage allocation — the calculator shows exactly how much to buy or sell of each asset to return to your desired balance without adding or withdrawing capital.`,
      `Use it quarterly or whenever any asset drifts more than 5% from its target. Rebalancing forces disciplined sell-high/buy-low behavior: assets that have outperformed will be trimmed, and underperformers will be topped up. The calculator also shows the tax implications of each rebalancing trade, helping you minimize taxable events.`
      ],
      inputs: [
      `For each asset in your portfolio, enter the current market value and your target allocation percentage. The calculator supports up to 20 assets and automatically validates that target percentages sum to 100%. The 'rebalance by' field lets you choose between selling winners to buy laggards or adding new capital to underweight positions.`,
      `The deviation threshold field filters out trades below a minimum size — many investors ignore rebalancing signals for drifts under 2–3% to reduce transaction costs. The calculator shows estimated fees for each rebalancing trade and flags assets where the rebalancing cost exceeds the diversification benefit.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Rebalanceo de Cartera muestra cómo restaurar tu asignación de activos objetivo después de que los movimientos del mercado hayan causado que tus pesos reales se desvíen.`,
      `Úsala trimestralmente o cuando cualquier activo se desvíe más del 5% de su objetivo.`
      ],
      inputs: [
      `Para cada activo en tu cartera, introduce el valor de mercado actual y tu porcentaje de asignación objetivo. El campo de umbral de desviación filtra operaciones por debajo de un tamaño mínimo.`,
      `La calculadora admite hasta 20 activos y valida automáticamente que los porcentajes objetivo sumen 100%.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Rebalanceamento de Portfólio mostra como restaurar sua alocação de ativos alvo após movimentos de mercado terem causado desvio dos seus pesos reais.`,
      `Use-a trimestralmente ou sempre que qualquer ativo desviar mais de 5% do seu alvo.`
      ],
      inputs: [
      `Para cada ativo no seu portfólio, insira o valor de mercado atual e sua porcentagem de alocação alvo.`,
      `A calculadora suporta até 20 ativos e valida automaticamente que as porcentagens alvo somam 100%.`
      ],
    },
    tr: {
      how: [
      `Portföy Yeniden Dengeleme Hesaplayıcısı, piyasa hareketleri gerçek ağırlıklarınızın hedeften sapmasına neden olduktan sonra hedef varlık dağılımınızı nasıl geri yükleyeceğinizi gösterir.`,
      `Üç ayda bir veya herhangi bir varlık hedefinden %5'ten fazla saptığında kullanın.`
      ],
      inputs: [
      `Portföyünüzdeki her varlık için mevcut piyasa değerini ve hedef tahsis yüzdesini girin.`,
      `Hesaplayıcı 20'ye kadar varlığı destekler ve hedef yüzdelerin %100 topladığını otomatik olarak doğrular.`
      ],
    },
    hi: {
      how: [
      `पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर दिखाता है कि बाजार की चालों के बाद आपका टार्गेट एसेट एलोकेशन कैसे रिस्टोर करें।`,
      `तिमाही या जब भी कोई एसेट अपने लक्ष्य से 5% से अधिक विचलित हो तब इसका उपयोग करें।`
      ],
      inputs: [
      `अपने पोर्टफोलियो में प्रत्येक एसेट के लिए वर्तमान बाजार मूल्य और अपना लक्ष्य आवंटन प्रतिशत दर्ज करें।`,
      `कैलकुलेटर 20 तक एसेट सपोर्ट करता है और स्वचालित रूप से यह सत्यापित करता है कि लक्ष्य प्रतिशत 100% तक जुड़ते हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ребалансировки портфеля показывает, как восстановить целевое распределение активов после того, как рыночные движения изменили фактические веса.`,
      `Используйте ежеквартально или когда любой актив отклоняется от цели более чем на 5%.`
      ],
      inputs: [
      `Для каждого актива портфеля введите текущую рыночную стоимость и целевой процент распределения. Калькулятор поддерживает до 20 активов.`,
      `Поле порога отклонения фильтрует ребалансировочные операции ниже минимального размера — многие инвесторы игнорируют сигналы при отклонении менее 2–3% для экономии на комиссиях.`
      ],
    },
  },
  'tp-sl-calculator': {
    en: {
      how: [
      `The Take Profit / Stop Loss Calculator helps you set precise exit levels for your trades, showing the exact price targets for both your upside take-profit and downside stop-loss based on your desired percentage moves from entry. Enter your entry price and define your TP and SL as percentage distances from entry — the calculator returns the exact target prices in the coin's currency.`,
      `Use it to pre-calculate exit levels before entering a position, then place the orders immediately after opening the trade. Setting both exit orders simultaneously eliminates the emotional decision-making that causes traders to hold losing positions too long or exit winners too early. For multiple take-profit levels, run separate calculations for each TP tier.`
      ],
      inputs: [
      `Entry price is your position open price. Take profit percentage is how much you want the price to increase (for a long) before you exit — e.g., 15% means TP triggers at 1.15× entry. Stop loss percentage is how much adverse movement you'll tolerate — e.g., 5% means SL triggers at 0.95× entry for a long position.`,
      `For short positions, take profit is below the entry price and stop-loss is above it — toggle the Long/Short mode and the percentage directions reverse automatically. The risk/reward ratio is calculated automatically: a 15% TP and 5% SL gives a 3:1 ratio. This calculator pairs perfectly with the Position Size Calculator for complete trade planning.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Take Profit / Stop Loss te ayuda a establecer niveles de salida precisos para tus operaciones, mostrando los precios objetivo exactos basados en tus movimientos porcentuales deseados desde la entrada.`,
      `Úsala para precalcular niveles de salida antes de entrar en una posición, luego coloca las órdenes inmediatamente después de abrir la operación.`
      ],
      inputs: [
      `El precio de entrada es el precio de apertura de tu posición. El porcentaje de take profit es cuánto quieres que aumente el precio antes de salir. El porcentaje de stop loss es cuánto movimiento adverso tolerarás.`,
      `Para posiciones cortas, el take profit está por debajo del precio de entrada y el stop-loss está por encima — activa el modo Long/Short y las direcciones porcentuales se invierten automáticamente.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Take Profit / Stop Loss ajuda você a definir níveis precisos de saída para suas negociações.`,
      `Use-a para pré-calcular níveis de saída antes de entrar em uma posição, depois coloque as ordens imediatamente após abrir a negociação.`
      ],
      inputs: [
      `O preço de entrada é o preço de abertura da sua posição. A porcentagem de take profit é quanto você quer que o preço aumente antes de sair. A porcentagem de stop-loss é quanto movimento adverso você tolerará.`,
      `Para posições vendidas, o take profit está abaixo do preço de entrada e o stop-loss está acima — alterne o modo Long/Short e as direções de porcentagem se invertem automaticamente.`
      ],
    },
    tr: {
      how: [
      `Take Profit / Stop Loss Hesaplayıcısı, girişinizden istenen yüzde hareketlerine göre hem yukarı yönlü kar al hem de aşağı yönlü zarar durdur için tam fiyat hedeflerini göstererek işlemleriniz için kesin çıkış seviyeleri belirlemenize yardımcı olur.`,
      `Pozisyona girmeden önce çıkış seviyelerini önceden hesaplamak için kullanın, ardından işlemi açtıktan hemen sonra emirleri verin.`
      ],
      inputs: [
      `Giriş fiyatı pozisyon açma fiyatınızdır. Take profit yüzdesi çıkmadan önce fiyatın ne kadar artmasını istediğinizdir. Stop loss yüzdesi tolere edeceğiniz olumsuz harekettir.`,
      `Short pozisyonlar için take profit giriş fiyatının altında, stop-loss ise üzerindedir — Long/Short modunu açın ve yüzde yönleri otomatik olarak tersine döner.`
      ],
    },
    hi: {
      how: [
      `टेक प्रॉफिट / स्टॉप लॉस कैलकुलेटर आपको अपने ट्रेड के लिए सटीक एग्जिट लेवल सेट करने में मदद करता है।`,
      `पोजीशन में प्रवेश करने से पहले एग्जिट लेवल की पूर्व-गणना करने के लिए इसका उपयोग करें, फिर ट्रेड खोलने के तुरंत बाद ऑर्डर दें।`
      ],
      inputs: [
      `एंट्री प्राइस आपका पोजीशन ओपन प्राइस है। टेक प्रॉफिट प्रतिशत वह है जितना आप निकलने से पहले प्राइस बढ़ना चाहते हैं। स्टॉप लॉस प्रतिशत वह प्रतिकूल चाल है जो आप सहन करेंगे।`,
      `Short पोजीशन के लिए, टेक प्रॉफिट एंट्री प्राइस से नीचे और स्टॉप-लॉस ऊपर है — Long/Short मोड टॉगल करें और प्रतिशत दिशाएं स्वचालित रूप से उल्टी हो जाती हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор тейк-профита и стоп-лосса помогает установить точные уровни выхода из сделки, показывая целевые цены для тейк-профита и стоп-лосса в процентах от цены входа.`,
      `Используйте для предварительного расчёта уровней выхода перед открытием позиции, а затем сразу выставляйте ордера после открытия сделки.`
      ],
      inputs: [
      `Цена входа — цена открытия позиции. Процент тейк-профита — желаемый рост цены до выхода (для лонга). Процент стоп-лосса — допустимое неблагоприятное движение.`,
      `Для шорт-позиций тейк-профит ниже цены входа, а стоп-лосс выше — переключите режим и направления автоматически изменятся. Соотношение риска/прибыли рассчитывается автоматически.`
      ],
    },
  },
  'ico-roi-calculator': {
    en: {
      how: [
      `The ICO/IDO ROI Calculator measures the return on investment from participating in token launches — comparing the price paid at the offering stage (ICO, IDO, seed, or private round) against the current market price or a target exit price. Enter your investment amount, ICO price per token, and current/exit price to see both gross and post-vesting ROI.`,
      `Use it to evaluate whether a token allocation is worth claiming and selling, or whether waiting for further vesting unlocks is strategically better. For locked allocations, enter the percentage unlocked to date to see the realized versus unrealized portion of your return. Compare multiple ICO investments side-by-side to see which has the best remaining upside.`
      ],
      inputs: [
      `ICO price is the price per token at which you purchased during the raise. Investment amount is your total capital committed to the round. Current price is the live trading price (auto-filled for listed tokens) or your custom exit target. Vesting percentage unlocked determines how much of your allocation is currently liquid and sellable.`,
      `For multi-round investments (seed + private + public), calculate each round separately and compare ROIs to understand the value of early entry premium. If the token isn't listed yet, enter an expected listing price based on the project's valuation target and public round price to model your return at listing.`
      ],
    },
    es: {
      how: [
      `La Calculadora de ROI ICO/IDO mide el retorno de la inversión de participar en lanzamientos de tokens, comparando el precio pagado en la etapa de oferta contra el precio de mercado actual o un precio objetivo de salida.`,
      `Úsala para evaluar si una asignación de tokens vale la pena reclamar y vender, o si esperar a más desbloqueos de vesting es estratégicamente mejor.`
      ],
      inputs: [
      `El precio ICO es el precio por token al que compraste durante la recaudación. El importe de inversión es tu capital total comprometido en la ronda.`,
      `Para inversiones multi-ronda (seed + privada + pública), calcula cada ronda por separado y compara ROIs para entender el valor de la prima de entrada temprana.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de ROI ICO/IDO mede o retorno do investimento ao participar de lançamentos de tokens, comparando o preço pago na fase de oferta contra o preço de mercado atual.`,
      `Use-a para avaliar se uma alocação de tokens vale a pena reivindicar e vender, ou se esperar por mais desbloqueios de vesting é estrategicamente melhor.`
      ],
      inputs: [
      `O preço do ICO é o preço por token ao qual você comprou durante a arrecadação. O valor do investimento é seu capital total comprometido na rodada.`,
      `Para investimentos em múltiplas rodadas (seed + privada + pública), calcule cada rodada separadamente e compare ROIs.`
      ],
    },
    tr: {
      how: [
      `ICO/IDO ROI Hesaplayıcısı, teklif aşamasında ödenen fiyatı mevcut piyasa fiyatı veya hedef çıkış fiyatıyla karşılaştırarak token lansmanlarına katılmadan elde edilen yatırım getirisini ölçer.`,
      `Bir token tahsisinin talep edilip satılmaya değer olduğunu veya daha fazla vesting kilit açmasını beklemenin stratejik olarak daha iyi olduğunu değerlendirmek için kullanın.`
      ],
      inputs: [
      `ICO fiyatı, toplama sırasında satın aldığınız token başına fiyattır. Yatırım tutarı, turda taahhüt ettiğiniz toplam sermayedir.`,
      `Çok turlu yatırımlar için her turu ayrı ayrı hesaplayın ve erken giriş priminin değerini anlamak için ROI'leri karşılaştırın.`
      ],
    },
    hi: {
      how: [
      `ICO/IDO ROI कैलकुलेटर टोकन लॉन्च में भाग लेने से निवेश पर रिटर्न को मापता है — ऑफरिंग स्टेज पर भुगतान की गई कीमत की तुलना वर्तमान बाजार मूल्य से करता है।`,
      `यह मूल्यांकन करने के लिए इसका उपयोग करें कि क्या टोकन आवंटन का दावा करना और बेचना उचित है, या अधिक वेस्टिंग अनलॉक का इंतजार करना बेहतर है।`
      ],
      inputs: [
      `ICO प्राइस वह कीमत है जिस पर आपने राइज के दौरान प्रति टोकन खरीदा। निवेश राशि राउंड में आपकी कुल प्रतिबद्ध पूंजी है।`,
      `मल्टी-राउंड निवेश के लिए, प्रत्येक राउंड अलग से कैलकुलेट करें और अर्ली एंट्री प्रीमियम की वैल्यू समझने के लिए ROI की तुलना करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ROI ICO/IDO измеряет доходность от участия в токенсейлах — сравнивая цену покупки на этапе размещения с текущей рыночной ценой или целевой ценой выхода.`,
      `Используйте для оценки, стоит ли требовать и продавать выделенные токены или стратегически выгоднее ждать дальнейшего разблокирования вестинга.`
      ],
      inputs: [
      `Цена ICO — цена покупки токена на этапе сбора средств. Сумма инвестиции — общий вложенный капитал в раунде.`,
      `При участии в нескольких раундах рассчитывайте каждый отдельно и сравнивайте ROI для понимания ценности раннего входа.`
      ],
    },
  },
  'airdrop-calculator': {
    en: {
      how: [
      `The Airdrop Calculator values your airdrop token allocation in USD based on the current market price, and estimates your net profit after any gas fees paid to claim the tokens. Enter the number of tokens received, the current token price, and your gas cost to claim — the calculator shows gross value, net value, and ROI if you participated in a qualifying activity that had a known cost.`,
      `Use it to decide whether claiming an airdrop is economically rational given the current gas fees. When Ethereum gas is high ($50–200+ for complex claim transactions), small airdrops may not be worth claiming. The calculator breaks even analysis shows the minimum token value required to justify your gas cost.`
      ],
      inputs: [
      `Token quantity is the number of tokens in your airdrop allocation (check the project's claim portal for your exact amount). Current token price is fetched automatically for listed tokens or entered manually for pre-TGE airdrops. Gas fee to claim is the estimated cost of the claim transaction in USD — check current gas prices on Etherscan Gas Tracker before claiming.`,
      `If you completed qualifying activities (e.g., liquidity provision, governance votes, trading volumes) to earn the airdrop, enter the total costs you incurred to qualify. The calculator then shows your true ROI on the activity-based airdrop strategy, accounting for all costs from qualification through claiming.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Airdrop valora tu asignación de tokens de airdrop en USD basándose en el precio de mercado actual, y estima tu ganancia neta después de cualquier tarifa de gas pagada para reclamar los tokens.`,
      `Úsala para decidir si reclamar un airdrop es económicamente racional dado el costo actual de gas.`
      ],
      inputs: [
      `La cantidad de tokens es el número de tokens en tu asignación de airdrop. El precio actual del token se obtiene automáticamente para tokens listados o se introduce manualmente.`,
      `Si completaste actividades de calificación para ganar el airdrop, introduce los costos totales incurridos para calificar para ver tu ROI verdadero.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Airdrop avalia sua alocação de tokens de airdrop em USD com base no preço de mercado atual, e estima seu lucro líquido após quaisquer taxas de gas pagas para reivindicar os tokens.`,
      `Use-a para decidir se reivindicar um airdrop é economicamente racional dado o custo atual de gas.`
      ],
      inputs: [
      `A quantidade de tokens é o número de tokens em sua alocação de airdrop. O preço atual do token é obtido automaticamente para tokens listados.`,
      `Se você completou atividades de qualificação para ganhar o airdrop, insira os custos totais incorridos para qualificar para ver seu ROI verdadeiro.`
      ],
    },
    tr: {
      how: [
      `Airdrop Hesaplayıcısı, mevcut piyasa fiyatına göre airdrop token tahsisinizi USD cinsinden değerlendirir ve tokenları talep etmek için ödenen gas ücretlerinden sonra net kârınızı tahmin eder.`,
      `Mevcut gas maliyetleri göz önüne alındığında bir airdrop'u talep etmenin ekonomik açıdan mantıklı olup olmadığına karar vermek için kullanın.`
      ],
      inputs: [
      `Token miktarı, airdrop tahsisinizdeki token sayısıdır. Mevcut token fiyatı listelenen tokenlar için otomatik olarak alınır.`,
      `Airdrop'u kazanmak için nitelendirme faaliyetleri tamamladıysanız, gerçek ROI'nizi görmek için nitelendirme için katlandığınız toplam maliyetleri girin.`
      ],
    },
    hi: {
      how: [
      `एयरड्रॉप कैलकुलेटर वर्तमान बाजार मूल्य के आधार पर आपके एयरड्रॉप टोकन आवंटन को USD में मूल्यांकित करता है, और टोकन क्लेम करने के लिए भुगतान की गई गैस फीस के बाद आपका नेट प्रॉफिट अनुमानित करता है।`,
      `यह तय करने के लिए इसका उपयोग करें कि वर्तमान गैस लागत को देखते हुए एयरड्रॉप का दावा करना आर्थिक रूप से तर्कसंगत है या नहीं।`
      ],
      inputs: [
      `टोकन क्वांटिटी आपके एयरड्रॉप आवंटन में टोकन की संख्या है। लिस्टेड टोकन के लिए वर्तमान टोकन प्राइस स्वचालित रूप से फेच होती है।`,
      `अगर आपने एयरड्रॉप अर्जित करने के लिए योग्यता गतिविधियां पूरी कीं, तो अपना सच्चा ROI देखने के लिए योग्यता के लिए आपके द्वारा वहन की गई कुल लागत दर्ज करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор аирдропа оценивает ваш аллокейшн токенов в USD по текущей рыночной цене и рассчитывает чистую прибыль после комиссий за газ при получении токенов.`,
      `Используйте для оценки экономической целесообразности получения аирдропа с учётом текущих комиссий за газ.`
      ],
      inputs: [
      `Количество токенов — ваш аллокейшн в рамках аирдропа. Текущая цена токена подставляется автоматически для листинговых токенов или вводится вручную.`,
      `Если для получения аирдропа вы выполняли квалифицирующие действия (предоставление ликвидности, голосования и пр.), введите общие понесённые затраты для расчёта реального ROI всей стратегии.`
      ],
    },
  },
  'node-calculator': {
    en: {
      how: [
      `The Node / Validator Calculator estimates the profitability and payback period for running a blockchain validator node or masternode. Enter the required node collateral (stake), current staking APY, hardware and hosting costs, and the token price to see your daily, monthly, and annual net income after all operating expenses.`,
      `Use it to evaluate whether node economics justify the setup investment and ongoing costs. For proof-of-stake validators (Ethereum, Solana, Cardano), compare validator rewards against liquid staking alternatives (Lido, Rocket Pool) to see if the added complexity of self-custody validation is worth the premium return.`
      ],
      inputs: [
      `Node collateral is the required minimum stake to run the validator — 32 ETH for Ethereum, variable for Solana and other networks. Annual APY is the expected validator reward rate, which varies based on total network stake and validator count. Monthly hosting costs cover server, bandwidth, and optional monitoring services.`,
      `Hardware cost applies to home validation setups — enter the amortized monthly cost of your validator hardware. For cloud-hosted nodes, this is typically $50–200/month. The calculator also accounts for slashing risk exposure: validators that go offline or behave incorrectly lose a portion of their stake, so the slashing risk field adjusts the expected return downward by a probability-weighted penalty.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Nodo/Validador estima la rentabilidad y el período de recuperación para ejecutar un nodo validador de blockchain o masternode.`,
      `Úsala para evaluar si la economía del nodo justifica la inversión de configuración y los costos continuos.`
      ],
      inputs: [
      `El colateral del nodo es la participación mínima requerida para ejecutar el validador. El APY anual es la tasa esperada de recompensa del validador.`,
      `El costo de hardware se aplica a configuraciones de validación doméstica. Para nodos alojados en la nube, esto suele ser $50-200/mes.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Nó/Validador estima a lucratividade e o período de retorno para executar um nó validador de blockchain ou masternode.`,
      `Use-a para avaliar se a economia do nó justifica o investimento de configuração e os custos contínuos.`
      ],
      inputs: [
      `O colateral do nó é a participação mínima necessária para executar o validador. O APY anual é a taxa de recompensa esperada do validador.`,
      `O custo de hardware aplica-se a configurações de validação doméstica. Para nós hospedados na nuvem, isso geralmente é $50-200/mês.`
      ],
    },
    tr: {
      how: [
      `Düğüm/Doğrulayıcı Hesaplayıcısı, bir blockchain doğrulayıcı düğümü veya masternode çalıştırmanın kârlılığını ve geri ödeme süresini tahmin eder.`,
      `Düğüm ekonomisinin kurulum yatırımını ve devam eden maliyetleri haklı kılıp kılmadığını değerlendirmek için kullanın.`
      ],
      inputs: [
      `Düğüm teminatı, doğrulayıcıyı çalıştırmak için gereken minimum stakingtir. Yıllık APY, beklenen doğrulayıcı ödül oranıdır.`,
      `Donanım maliyeti ev doğrulama kurulumları için geçerlidir. Bulut barındırılan düğümler için bu genellikle ayda 50-200 dolar arasındadır.`
      ],
    },
    hi: {
      how: [
      `नोड/वैलिडेटर कैलकुलेटर ब्लॉकचेन वैलिडेटर नोड या मास्टरनोड चलाने के लिए लाभप्रदता और पेबैक पीरियड का अनुमान लगाता है।`,
      `यह मूल्यांकन करने के लिए इसका उपयोग करें कि क्या नोड इकोनॉमिक्स सेटअप निवेश और चल रही लागत को उचित ठहराती है।`
      ],
      inputs: [
      `नोड कोलैटरल वैलिडेटर चलाने के लिए आवश्यक न्यूनतम स्टेक है। वार्षिक APY अपेक्षित वैलिडेटर रिवॉर्ड रेट है।`,
      `हार्डवेयर लागत होम वैलिडेशन सेटअप पर लागू होती है। क्लाउड-होस्टेड नोड के लिए, यह आमतौर पर $50-200/माह है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ноды/валидатора оценивает доходность и срок окупаемости запуска валидаторской ноды или мастерноды блокчейна.`,
      `Используйте для оценки, оправдывают ли экономика ноды начальные инвестиции в настройку и текущие расходы.`
      ],
      inputs: [
      `Залог ноды — минимальный стейк для запуска валидатора (32 ETH для Ethereum, переменный для других сетей). Годовой APY — ожидаемая ставка вознаграждения валидатора.`,
      `Стоимость оборудования применима к домашней валидации. Для облачных нод это обычно $50–200/месяц. Поле риска слэшинга снижает ожидаемую доходность с учётом вероятности штрафных санкций.`
      ],
    },
  },
  'asic-mining-calculator': {
    en: {
      how: [
      `The ASIC Mining Calculator estimates profitability for Bitcoin and other ASIC-mineable coins based on your hardware's rated hashrate and power consumption. Enter the ASIC model's hashrate (TH/s for SHA-256), power draw in watts, electricity rate, pool fee, and the current hardware acquisition cost to get daily profit and break-even timeline.`,
      `Use it before purchasing ASIC hardware to evaluate payback periods under different price scenarios. An S21 Pro at current difficulty might break even in 6 months at current prices but require 18+ months at a 50% lower BTC price — the calculator models both. Always check the manufacturer's hashrate versus independently benchmarked community results, which often run 5–10% lower.`
      ],
      inputs: [
      `Hashrate for SHA-256 ASIC miners is measured in TH/s (terahashes per second). Modern top-tier miners range from 100 to 300+ TH/s. Power consumption is the rated TDP from the manufacturer's spec sheet — add 10% for PSU inefficiency. Pool fee is typically 1–2% for major Bitcoin pools (Foundry, Antpool, F2Pool).`,
      `Hardware cost is used to calculate the payback period and ROI. Enter the current used market price for a realistic payback estimate, since new ASIC prices vary significantly during bull and bear markets. The calculator also models the effect of the next Bitcoin halving on your hardware's future revenue, showing pre- and post-halving profit projections.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Minería ASIC estima la rentabilidad para Bitcoin y otras monedas minables por ASIC basándose en el hashrate y consumo de energía de tu hardware.`,
      `Úsala antes de comprar hardware ASIC para evaluar períodos de recuperación bajo diferentes escenarios de precio.`
      ],
      inputs: [
      `El hashrate para los mineros ASIC SHA-256 se mide en TH/s. El consumo de energía es el TDP nominal de la hoja de especificaciones del fabricante — añade un 10% por ineficiencia de la fuente de alimentación.`,
      `El costo de hardware se usa para calcular el período de recuperación. La calculadora también modela el efecto del próximo halving de Bitcoin en los ingresos futuros de tu hardware.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Mineração ASIC estima a lucratividade para Bitcoin e outras moedas mineráveis por ASIC com base no hashrate e consumo de energia do seu hardware.`,
      `Use-a antes de comprar hardware ASIC para avaliar períodos de retorno em diferentes cenários de preço.`
      ],
      inputs: [
      `O hashrate para mineradores ASIC SHA-256 é medido em TH/s. O consumo de energia é o TDP nominal da folha de especificações do fabricante — adicione 10% para ineficiência da fonte de alimentação.`,
      `O custo do hardware é usado para calcular o período de retorno. A calculadora também modela o efeito do próximo halving do Bitcoin na receita futura do seu hardware.`
      ],
    },
    tr: {
      how: [
      `ASIC Madencilik Hesaplayıcısı, Bitcoin ve diğer ASIC ile madencilik yapılabilir coinler için donanımınızın hashrate ve güç tüketimine göre kârlılığı tahmin eder.`,
      `Farklı fiyat senaryoları altında geri ödeme sürelerini değerlendirmek için ASIC donanımı satın almadan önce kullanın.`
      ],
      inputs: [
      `SHA-256 ASIC madencileri için hashrate TH/s olarak ölçülür. Güç tüketimi üreticinin özellik sayfasındaki nominal TDP'dir — güç kaynağı verimsizliği için %10 ekleyin.`,
      `Donanım maliyeti geri ödeme süresini hesaplamak için kullanılır. Hesaplayıcı ayrıca bir sonraki Bitcoin halvinginin donanımınızın gelecekteki geliri üzerindeki etkisini de modelleye bilir.`
      ],
    },
    hi: {
      how: [
      `ASIC माइनिंग कैलकुलेटर आपके हार्डवेयर के रेटेड हैशरेट और पावर कंजम्प्शन के आधार पर Bitcoin और अन्य ASIC-माइनेबल कॉइन के लिए लाभप्रदता का अनुमान लगाता है।`,
      `विभिन्न मूल्य परिदृश्यों के तहत पेबैक पीरियड का मूल्यांकन करने के लिए ASIC हार्डवेयर खरीदने से पहले इसका उपयोग करें।`
      ],
      inputs: [
      `SHA-256 ASIC माइनर्स के लिए हैशरेट TH/s में मापा जाता है। पावर कंजम्प्शन निर्माता की स्पेक शीट से नॉमिनल TDP है — PSU अक्षमता के लिए 10% जोड़ें।`,
      `हार्डवेयर लागत पेबैक पीरियड की गणना के लिए उपयोग की जाती है। कैलकुलेटर अगले Bitcoin हाल्विंग के आपके हार्डवेयर के भविष्य के राजस्व पर प्रभाव को भी मॉडल करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор майнинга ASIC оценивает прибыльность для Bitcoin и других монет на ASIC на основе хешрейта и энергопотребления вашего оборудования.`,
      `Используйте перед покупкой ASIC для оценки срока окупаемости при разных ценовых сценариях.`
      ],
      inputs: [
      `Хешрейт ASIC для SHA-256 измеряется в TH/s. Мощность потребления — номинальный TDP из спецификации производителя плюс 10% на КПД блока питания.`,
      `Стоимость оборудования используется для расчёта срока окупаемости. Калькулятор также моделирует влияние следующего халвинга Bitcoin на будущие доходы оборудования.`
      ],
    },
  },
  'lending-calculator': {
    en: {
      how: [
      `The Crypto Lending Calculator computes interest earned or owed for cryptocurrency lending and borrowing positions on DeFi protocols or CeFi platforms. Enter your principal, APY rate, duration, and compounding frequency to project final balance and total interest — comparing lending versus borrowing economics in one view.`,
      `Use it to evaluate whether depositing crypto on Aave, Compound, or Morpho at a given supply APY generates meaningful returns compared to simply holding. For borrowers, it shows the total interest obligation over the loan term and the effective annualized cost of the loan. Compare multiple platforms side-by-side to optimize your lending or borrowing allocation.`
      ],
      inputs: [
      `Principal is your deposit amount (for lenders) or loan amount (for borrowers) in USD or crypto value. APY is the supply APY for deposits or borrow APY for loans — these fluctuate based on utilization rates and are available on the protocol's dashboard. Duration can be set in days, weeks, months, or years.`,
      `For variable-rate protocols, the calculator uses the current APY as a constant approximation — actual earnings may vary as rates change. Compound interest mode reinvests accrued interest back into the principal each period. For borrowers, the health factor threshold field lets you see the collateral requirements and liquidation risk alongside the interest cost.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Préstamos Cripto calcula el interés ganado o adeudado para posiciones de préstamo y endeudamiento de criptomonedas en protocolos DeFi o plataformas CeFi.`,
      `Úsala para evaluar si depositar cripto en Aave, Compound o Morpho genera retornos significativos comparados con simplemente mantener.`
      ],
      inputs: [
      `El principal es tu importe de depósito (para prestamistas) o importe del préstamo (para prestatarios) en USD o valor cripto. El APY es el APY de suministro para depósitos o el APY de préstamo para préstamos.`,
      `Para protocolos de tasa variable, la calculadora usa el APY actual como aproximación constante. El modo de interés compuesto reinvierte el interés acumulado de vuelta al principal.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Empréstimos Cripto calcula os juros ganhos ou devidos para posições de empréstimo e tomada de empréstimos de criptomoeda em protocolos DeFi ou plataformas CeFi.`,
      `Use-a para avaliar se depositar cripto em Aave, Compound ou Morpho gera retornos significativos comparados a simplesmente manter.`
      ],
      inputs: [
      `O principal é seu valor de depósito (para credores) ou valor do empréstimo (para tomadores) em USD ou valor cripto. O APY é o APY de fornecimento para depósitos ou APY de empréstimo para empréstimos.`,
      `Para protocolos de taxa variável, a calculadora usa o APY atual como aproximação constante.`
      ],
    },
    tr: {
      how: [
      `Kripto Borç Verme Hesaplayıcısı, DeFi protokollerinde veya CeFi platformlarında kripto para borç verme ve borçlanma pozisyonları için kazanılan veya borçlu olunan faizi hesaplar.`,
      `Belirli bir arz APY'sinde Aave, Compound veya Morpho'da kripto para yatırmanın yalnızca tutmaya kıyasla anlamlı getiri sağlayıp sağlamadığını değerlendirmek için kullanın.`
      ],
      inputs: [
      `Anapara, USD veya kripto değeri olarak depozit tutarınızdır (borç verenler için) veya kredi tutarınızdır (borçlular için). APY, mevduatlar için arz APY'si veya krediler için borçlanma APY'sidir.`,
      `Değişken oranlı protokoller için, hesaplayıcı mevcut APY'yi sabit bir yaklaşım olarak kullanır.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो लेंडिंग कैलकुलेटर DeFi प्रोटोकॉल या CeFi प्लेटफॉर्म पर क्रिप्टोकरेंसी लेंडिंग और बोरोइंग पोजीशन के लिए अर्जित या बकाया ब्याज की गणना करता है।`,
      `यह मूल्यांकन करने के लिए इसका उपयोग करें कि क्या दिए गए सप्लाई APY पर Aave, Compound या Morpho में क्रिप्टो डिपॉजिट करना केवल होल्ड करने की तुलना में अर्थपूर्ण रिटर्न देता है।`
      ],
      inputs: [
      `प्रिंसिपल आपकी डिपॉजिट राशि (लेंडर्स के लिए) या लोन राशि (बॉरोअर्स के लिए) USD या क्रिप्टो वैल्यू में है।`,
      `वेरिएबल-रेट प्रोटोकॉल के लिए, कैलकुलेटर वर्तमान APY को स्थिर अनुमान के रूप में उपयोग करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор криптокредитования рассчитывает заработанные или начисленные проценты для позиций по кредитованию и заимствованию на DeFi-протоколах и CeFi-платформах.`,
      `Используйте для оценки, генерирует ли размещение криптовалюты на Aave, Compound или Morpho значимую доходность по сравнению с простым удержанием.`
      ],
      inputs: [
      `Основная сумма — ваш депозит (для кредиторов) или сумма займа (для заёмщиков) в USD или крипто. APY — ставка предложения для вкладов или ставка заимствования для займов.`,
      `Для протоколов с переменной ставкой калькулятор использует текущий APY как постоянное приближение. Режим сложных процентов реинвестирует начисленные проценты обратно в основную сумму.`
      ],
    },
  },
  'leverage-calculator': {
    en: {
      how: [
        `The Leverage Calculator shows the amplified profit, loss, and liquidation price for a leveraged crypto trade. Enter your collateral amount, leverage multiplier (2x–125x), entry price, and target or stop-loss exit price to see the magnified outcome compared to a spot position. The calculator instantly reveals your effective position size, margin requirement, and the exact price level where your entire collateral would be wiped out.`,
        `Use it before opening any leveraged position on exchanges like Binance, Bybit, or dYdX to understand the true risk. A 10x long that moves 5% against you loses 50% of your collateral — and a 10% adverse move triggers liquidation. The calculator makes these dynamics concrete by showing dollar amounts rather than abstract multipliers, helping you size leverage appropriately for your risk tolerance.`
      ],
      inputs: [
        `Collateral is the margin you deposit to open the position — your maximum possible loss. Leverage multiplier determines how much larger your effective position is versus your collateral: 10x on $1,000 collateral controls a $10,000 position. Entry price is the price at which you open the trade. Direction (long or short) determines which price movement is profitable.`,
        `The liquidation price field shows where the exchange will forcibly close your position to prevent losses exceeding your collateral. Maintenance margin rate varies by exchange and position size — typically 0.4–1% on major platforms. The calculator also outputs break-even price including the trading fee on entry and exit, since fees consume margin that would otherwise cushion against liquidation.`
      ],
    },
    es: { how: [`La Calculadora de Apalancamiento muestra el beneficio, la pérdida y el precio de liquidación amplificados para una operación cripto apalancada. Introduce tu colateral, multiplicador de apalancamiento (2x-125x), precio de entrada y precio objetivo para ver el resultado magnificado.`, `Úsala antes de abrir cualquier posición apalancada en exchanges como Binance, Bybit o dYdX. Un long 10x que se mueve un 5% en contra pierde el 50% de tu colateral, y un 10% activa la liquidación.`], inputs: [`El colateral es el margen que depositas — tu pérdida máxima posible. El multiplicador determina cuánto mayor es tu posición efectiva. El precio de entrada es donde abres la operación. La dirección (largo o corto) determina qué movimiento es rentable.`, `El precio de liquidación muestra dónde el exchange cerrará forzosamente tu posición. La tasa de margen de mantenimiento varía por exchange — típicamente 0,4-1% en plataformas principales. El calculador también muestra el punto de equilibrio incluyendo comisiones.`] },
    pt: { how: [`A Calculadora de Alavancagem mostra o lucro, a perda e o preço de liquidação amplificados para uma operação cripto alavancada. Insira seu colateral, multiplicador de alavancagem (2x-125x), preço de entrada e preço alvo para ver o resultado magnificado.`, `Use-a antes de abrir qualquer posição alavancada em exchanges como Binance, Bybit ou dYdX. Um long 10x que se move 5% contra você perde 50% do colateral, e 10% aciona liquidação.`], inputs: [`O colateral é a margem que você deposita — sua perda máxima possível. O multiplicador determina quão maior é sua posição efetiva. O preço de entrada é onde você abre a operação. A direção (compra ou venda) determina qual movimento é lucrativo.`, `O preço de liquidação mostra onde a exchange fechará forçosamente sua posição. A taxa de margem de manutenção varia por exchange — tipicamente 0,4-1% em plataformas principais. A calculadora também mostra o ponto de equilíbrio incluindo taxas.`] },
    tr: { how: [`Kaldıraç Hesaplayıcı, kaldıraçlı bir kripto işlemi için büyütülmüş kâr, zarar ve likidasyon fiyatını gösterir. Teminatınızı, kaldıraç çarpanını (2x-125x), giriş fiyatını ve hedef fiyatı girerek büyütülmüş sonucu görün.`, `Binance, Bybit veya dYdX gibi borsalarda kaldıraçlı pozisyon açmadan önce kullanın. %5 aleyhe hareket eden 10x long, teminatınızın %50'sini kaybeder; %10 hareket likidasyonu tetikler.`], inputs: [`Teminat, pozisyon açmak için yatırdığınız marjdır — mümkün olan maksimum kaybınız. Kaldıraç çarpanı, efektif pozisyonunuzun teminata göre ne kadar büyük olduğunu belirler.`, `Likidasyon fiyatı alanı, borsanın pozisyonunuzu zorla kapatacağı seviyeyi gösterir. Bakım marjı oranı borsaya göre değişir — genellikle %0,4-1. Hesaplayıcı giriş-çıkış ücretleri dahil başabaş fiyatını da gösterir.`] },
    hi: { how: [`लीवरेज कैलकुलेटर लीवरेज्ड क्रिप्टो ट्रेड के लिए बढ़े हुए प्रॉफिट, लॉस और लिक्विडेशन प्राइस दिखाता है। अपना कोलैटरल, लीवरेज मल्टीप्लायर (2x-125x), एंट्री प्राइस और टार्गेट प्राइस दर्ज करें।`, `Binance, Bybit या dYdX जैसे एक्सचेंज पर कोई भी लीवरेज्ड पोजीशन खोलने से पहले उपयोग करें। 10x लॉन्ग जो 5% विपरीत चलता है, आपके कोलैटरल का 50% खो देता है।`], inputs: [`कोलैटरल वह मार्जिन है जो आप पोजीशन खोलने के लिए जमा करते हैं — आपका अधिकतम संभव नुकसान। लीवरेज मल्टीप्लायर निर्धारित करता है कि आपकी इफेक्टिव पोजीशन कितनी बड़ी है।`, `लिक्विडेशन प्राइस फील्ड दिखाता है कि एक्सचेंज कहां आपकी पोजीशन जबरन बंद करेगा। मेंटेनेंस मार्जिन रेट एक्सचेंज के अनुसार भिन्न होता है — आमतौर पर प्रमुख प्लेटफॉर्म पर 0.4-1%।`] },
    ru: { how: [`Калькулятор кредитного плеча показывает увеличенную прибыль, убыток и цену ликвидации для маржинальной криптосделки. Введите залог, мультипликатор (2x–125x), цену входа и целевую цену для просмотра усиленного результата.`, `Используйте перед открытием любой позиции с плечом на Binance, Bybit или dYdX. Лонг 10x при движении на 5% против вас теряет 50% залога, а 10% запускает ликвидацию.`], inputs: [`Залог — маржа, которую вы вносите для открытия позиции — ваш максимально возможный убыток. Мультипликатор определяет, насколько больше ваша эффективная позиция по сравнению с залогом.`, `Поле цены ликвидации показывает, где биржа принудительно закроет позицию. Ставка поддерживающей маржи варьируется — обычно 0,4–1% на крупных площадках. Калькулятор также показывает точку безубыточности с учётом комиссий.`] },
  },
  'yield-farming-calculator': {
    en: {
      how: [
      `The Yield Farming Calculator projects the returns from depositing liquidity into DeFi protocols that offer additional token rewards on top of base trading fees. Enter your deposit amount, the base fee APR from trading activity, the reward token APR, current token price, and your expected duration to see total projected returns and the impact of compounding your rewards.`,
      `Use it to compare different farming opportunities across protocols: Uniswap v3 concentrated liquidity positions often offer higher base fee yields than Uniswap v2 but require active management. Factor in gas costs for claiming and compounding rewards — frequent compounding is only optimal above a certain minimum position size where gas doesn't erode gains.`
      ],
      inputs: [
      `Deposit amount is your total capital in the farming position. Base APR is the annualized fee income from trading activity in the pool. Reward APR is the additional incentive token yield distributed by the protocol. Both APR figures are typically shown in the protocol's UI or on DeFiLlama's yield page.`,
      `Token price for rewards is important when reward tokens are native governance tokens that may depreciate — model both current price and a 50% lower price scenario to see downside returns. Gas cost per compound shows how frequently you should harvest and reinvest rewards based on your position size, with the optimal compounding interval increasing as gas prices rise.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Yield Farming proyecta los retornos de depositar liquidez en protocolos DeFi que ofrecen recompensas de tokens adicionales además de las comisiones base de trading.`,
      `Úsala para comparar diferentes oportunidades de farming entre protocolos.`
      ],
      inputs: [
      `El importe de depósito es tu capital total en la posición de farming. El APR base es el ingreso anualizado de comisiones de actividad de trading en el pool. El APR de recompensas es el rendimiento adicional de tokens de incentivos.`,
      `El precio del token para recompensas es importante cuando los tokens de recompensa son tokens de gobernanza nativos que pueden depreciarse.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Yield Farming projeta os retornos de depositar liquidez em protocolos DeFi que oferecem recompensas adicionais de tokens além das taxas base de negociação.`,
      `Use-a para comparar diferentes oportunidades de farming entre protocolos.`
      ],
      inputs: [
      `O valor do depósito é seu capital total na posição de farming. O APR base é a renda anualizada de taxas da atividade de negociação no pool.`,
      `O preço do token para recompensas é importante quando os tokens de recompensa são tokens de governança nativos que podem depreciar.`
      ],
    },
    tr: {
      how: [
      `Yield Farming Hesaplayıcısı, temel işlem ücretlerinin üzerine ek token ödülleri sunan DeFi protokollerine likidite yatırmanın getirilerini tahmin eder.`,
      `Protokoller arasındaki farklı farming fırsatlarını karşılaştırmak için kullanın.`
      ],
      inputs: [
      `Depozit tutarı, farming pozisyonundaki toplam sermayenizdir. Temel APR, havuzdaki ticaret faaliyetinden elde edilen yıllık ücret geliridir.`,
      `Ödüller için token fiyatı, ödül tokenları değer kaybedebilecek yerel yönetim tokenları olduğunda önemlidir.`
      ],
    },
    hi: {
      how: [
      `यील्ड फार्मिंग कैलकुलेटर DeFi प्रोटोकॉल में लिक्विडिटी डिपॉजिट करने से रिटर्न का अनुमान लगाता है जो बेस ट्रेडिंग फीस के ऊपर अतिरिक्त टोकन रिवॉर्ड प्रदान करते हैं।`,
      `प्रोटोकॉल के बीच विभिन्न फार्मिंग अवसरों की तुलना करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `डिपॉजिट राशि फार्मिंग पोजीशन में आपकी कुल पूंजी है। बेस APR पूल में ट्रेडिंग गतिविधि से वार्षिक फीस आय है।`,
      `रिवॉर्ड के लिए टोकन प्राइस महत्वपूर्ण है जब रिवॉर्ड टोकन नेटिव गवर्नेंस टोकन हों जो मूल्यह्रास हो सकते हैं।`
      ],
    },
    ru: {
      how: [
      `Калькулятор yield farming прогнозирует доходность от предоставления ликвидности в DeFi-протоколы, которые предлагают дополнительные токенные вознаграждения сверх базовых торговых комиссий.`,
      `Используйте для сравнения разных возможностей фарминга на разных протоколах.`
      ],
      inputs: [
      `Сумма депозита — ваш общий капитал в позиции. Базовый APR — доходность от торговых комиссий пула. APR вознаграждений — дополнительный токенный инцентив от протокола.`,
      `Цена токена для вознаграждений важна, когда наградные токены — это нативные токены управления, которые могут обесцениться. Моделируйте как текущую цену, так и сценарий с ценой на 50% ниже.`
      ],
    },
  },
  'salary-calculator': {
    en: {
      how: [
      `The Crypto Salary Calculator converts a traditional fiat salary into its cryptocurrency equivalent, or shows how much fiat a given crypto salary is worth. Enter your fiat salary (annual or monthly), select a cryptocurrency, and see the equivalent in crypto at today's price — useful for employees or contractors paid in cryptocurrency or businesses offering crypto salary packages.`,
      `Use it to understand your real purchasing power when offered a salary in BTC, ETH, or stablecoins. For volatile assets like BTC or ETH, also calculate the value at 20% below current price to understand your downside risk. For stablecoin salaries (USDC, USDT), the conversion is near 1:1 with USD, providing predictable income.`
      ],
      inputs: [
      `Fiat salary amount is your gross pay before tax — enter either annual or monthly and the calculator converts. Select the payment currency (BTC, ETH, USDC, or any token) and the reference fiat currency. The exchange rate is auto-filled from live CoinGecko prices.`,
      `For tax planning purposes, note that cryptocurrency wages are typically taxed as income at the fair market value at the time of receipt in most jurisdictions. The calculator shows the monthly and annual value at current prices but does not account for tax withholding — consult your local tax authority for crypto salary tax treatment.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Salario Cripto convierte un salario fiat tradicional a su equivalente en criptomoneda, o muestra cuánto fiat vale un salario cripto dado.`,
      `Úsala para entender tu poder adquisitivo real cuando se te ofrece un salario en BTC, ETH o stablecoins.`
      ],
      inputs: [
      `El importe del salario fiat es tu pago bruto antes de impuestos. Selecciona la moneda de pago y la moneda fiat de referencia. El tipo de cambio se rellena automáticamente con precios en tiempo real de CoinGecko.`,
      `Para fines de planificación fiscal, los salarios en criptomonedas generalmente se gravan como ingresos al valor de mercado justo en el momento de la recepción.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Salário Cripto converte um salário fiat tradicional para seu equivalente em criptomoeda, ou mostra quanto fiat um determinado salário cripto vale.`,
      `Use-a para entender seu poder de compra real quando oferecido um salário em BTC, ETH ou stablecoins.`
      ],
      inputs: [
      `O valor do salário fiat é seu pagamento bruto antes de impostos. Selecione a moeda de pagamento e a moeda fiat de referência. A taxa de câmbio é preenchida automaticamente com preços ao vivo do CoinGecko.`,
      `Para fins de planejamento tributário, os salários em criptomoeda geralmente são tributados como renda pelo valor de mercado justo no momento do recebimento.`
      ],
    },
    tr: {
      how: [
      `Kripto Maaş Hesaplayıcısı, geleneksel bir fiat maaşını kripto para eşdeğerine dönüştürür veya belirli bir kripto para maaşının ne kadar fiat değerinde olduğunu gösterir.`,
      `BTC, ETH veya stablecoin cinsinden bir maaş teklif edildiğinde gerçek satın alma gücünüzü anlamak için kullanın.`
      ],
      inputs: [
      `Fiat maaş tutarı, vergi öncesi brüt ödemenizdir. Ödeme para birimini ve referans fiat para birimini seçin. Döviz kuru CoinGecko canlı fiyatlarından otomatik doldurulur.`,
      `Vergi planlaması açısından, kripto para maaşları çoğu yargı bölgesinde alındığı andaki adil piyasa değerinde gelir olarak vergilendirilir.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो सैलरी कैलकुलेटर एक पारंपरिक फिएट सैलरी को उसके क्रिप्टोकरेंसी इक्विवेलेंट में कन्वर्ट करता है, या दिखाता है कि दिए गए क्रिप्टो सैलरी की कितनी फिएट वैल्यू है।`,
      `BTC, ETH, या स्टेबलकॉइन में सैलरी ऑफर किए जाने पर अपनी वास्तविक क्रय शक्ति समझने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `फिएट सैलरी राशि टैक्स से पहले आपका ग्रॉस पे है। पेमेंट करेंसी और रेफरेंस फिएट करेंसी चुनें। एक्सचेंज रेट CoinGecko लाइव प्राइस से स्वचालित रूप से भरती है।`,
      `टैक्स प्लानिंग के लिए, ध्यान दें कि क्रिप्टोकरेंसी वेतन को अधिकांश क्षेत्राधिकारों में रसीद के समय उचित बाजार मूल्य पर आय के रूप में कर लगाया जाता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор зарплаты в криптовалюте переводит традиционную фиатную зарплату в её криптовалютный эквивалент, или показывает, сколько фиата стоит указанная крипто-зарплата.`,
      `Используйте для понимания реальной покупательной способности при зарплате в BTC, ETH или стейблкоинах.`
      ],
      inputs: [
      `Сумма фиатной зарплаты — ваша валовая зарплата до налогов. Выберите валюту выплаты и базовую фиатную валюту. Курс обмена подставляется автоматически из CoinGecko.`,
      `Для налогового планирования: в большинстве юрисдикций зарплата в криптовалюте облагается налогом как доход по справедливой рыночной стоимости на момент получения.`
      ],
    },
  },
  'inflation-hedge': {
    en: {
      how: [
      `The Inflation Hedge Calculator shows how much purchasing power you would have preserved — or gained — by holding cryptocurrency instead of fiat currency over any historical period. Enter a starting year or date, an initial fiat amount, select a country for inflation data, and choose a cryptocurrency to compare against — the calculator shows the inflation-adjusted fiat value versus the crypto value over the same period.`,
      `Use it to visualize the long-term argument for Bitcoin as digital gold or a store of value. If $10,000 held in USD in 2014 would be worth $6,200 in real purchasing power today due to inflation, while $10,000 in Bitcoin would be worth substantially more, the calculator makes this comparison concrete and data-driven rather than theoretical.`
      ],
      inputs: [
      `Starting period is the month and year of your hypothetical investment. Fiat amount is the initial capital. Country selection loads historical CPI (Consumer Price Index) data for accurate inflation rates — available for 30+ countries. Cryptocurrency selection determines the price comparison against the inflation-adjusted fiat value.`,
      `The calculator uses official CPI data from government statistical agencies for each country, providing a reliable inflation baseline. For USD, Euro, GBP, and JPY, historical data extends back to the early Bitcoin era. Results are displayed as both absolute values and real purchasing power equivalents, making the comparison immediate and intuitive.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Cobertura de Inflación muestra cuánto poder adquisitivo habrías preservado — o ganado — manteniendo criptomoneda en lugar de moneda fiat durante cualquier período histórico.`,
      `Úsala para visualizar el argumento a largo plazo de Bitcoin como oro digital o reserva de valor.`
      ],
      inputs: [
      `El período de inicio es el mes y año de tu inversión hipotética. La selección del país carga datos históricos del IPC para tasas de inflación precisas.`,
      `La calculadora utiliza datos oficiales del IPC de agencias estadísticas gubernamentales para cada país, proporcionando una línea base de inflación confiable.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Proteção contra Inflação mostra quanto poder de compra você teria preservado — ou ganho — mantendo criptomoeda em vez de moeda fiat durante qualquer período histórico.`,
      `Use-a para visualizar o argumento de longo prazo do Bitcoin como ouro digital ou reserva de valor.`
      ],
      inputs: [
      `O período inicial é o mês e ano do seu investimento hipotético. A seleção do país carrega dados históricos do IPCA para taxas de inflação precisas.`,
      `A calculadora usa dados oficiais do IPC de agências estatísticas governamentais para cada país, fornecendo uma linha de base de inflação confiável.`
      ],
    },
    tr: {
      how: [
      `Enflasyon Koruması Hesaplayıcısı, herhangi bir tarihsel dönemde fiat para birimi yerine kripto para tutarak ne kadar satın alma gücü koruduğunuzu — veya kazandığınızı — gösterir.`,
      `Bitcoin'in dijital altın veya değer deposu olarak uzun vadeli argümanını görselleştirmek için kullanın.`
      ],
      inputs: [
      `Başlangıç dönemi, varsayımsal yatırımınızın ay ve yılıdır. Ülke seçimi, doğru enflasyon oranları için tarihsel TÜFE verilerini yükler.`,
      `Hesaplayıcı, güvenilir bir enflasyon tabanı sağlamak için her ülkenin devlet istatistik kurumlarından resmi TÜFE verilerini kullanır.`
      ],
    },
    hi: {
      how: [
      `इन्फ्लेशन हेज कैलकुलेटर दिखाता है कि किसी भी ऐतिहासिक अवधि में फिएट करेंसी के बजाय क्रिप्टोकरेंसी रखकर आपने कितनी क्रय शक्ति संरक्षित की होती — या अर्जित की होती।`,
      `डिजिटल गोल्ड या वैल्यू स्टोर के रूप में Bitcoin के दीर्घकालिक तर्क को विजुअलाइज करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `शुरुआती अवधि आपके काल्पनिक निवेश का महीना और वर्ष है। देश चयन सटीक मुद्रास्फीति दरों के लिए ऐतिहासिक CPI डेटा लोड करता है।`,
      `कैलकुलेटर प्रत्येक देश के लिए सरकारी सांख्यिकीय एजेंसियों से आधिकारिक CPI डेटा का उपयोग करता है, जो एक विश्वसनीय मुद्रास्फीति आधार रेखा प्रदान करता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор хеджа от инфляции показывает, сколько покупательной способности вы бы сохранили — или выиграли — держа криптовалюту вместо фиатной валюты за любой исторический период.`,
      `Используйте для наглядного представления долгосрочного аргумента в пользу Bitcoin как цифрового золота или средства сбережения.`
      ],
      inputs: [
      `Начальный период — месяц и год гипотетической инвестиции. Выбор страны загружает исторические данные ИПЦ для точных ставок инфляции.`,
      `Калькулятор использует официальные данные ИПЦ государственных статистических ведомств каждой страны, обеспечивая надёжную базу для расчёта инфляции.`
      ],
    },
  },
  'market-cap-comparator': {
    en: {
      how: [
      `The Market Cap Comparator answers 'if Coin A had Coin B's market cap, what would its price be?' — the most common thought experiment in crypto investing. Select two cryptocurrencies and the calculator instantly shows what price Coin A would trade at if it reached Coin B's current market capitalization, given Coin A's circulating supply.`,
      `Use it to set realistic price targets for smaller coins by comparing them to established benchmarks. If you want to know what SOL would be worth at ETH's market cap, or what a small-cap altcoin would be worth if it 'flipped' a larger competitor, this calculator gives you the exact implied price.`
      ],
      inputs: [
      `Select Coin A (the coin whose hypothetical price you want to calculate) and Coin B (the coin whose market cap you want Coin A to reach). Both market caps and circulating supplies are automatically fetched from CoinGecko's live data.`,
      `The result is Coin A's implied price = Coin B's market cap / Coin A's circulating supply. Be aware that a coin's supply may differ significantly from the comparison target — a coin with 100 billion tokens reaching Bitcoin's market cap would have a very different per-token price than a coin with 21 million tokens.`
      ],
    },
    es: {
      how: [
      `El Comparador de Capitalización de Mercado responde '¿si la Moneda A tuviera la capitalización de mercado de la Moneda B, cuál sería su precio?' — el experimento mental más común en la inversión cripto.`,
      `Úsalo para establecer objetivos de precio realistas para monedas más pequeñas comparándolas con puntos de referencia establecidos.`
      ],
      inputs: [
      `Selecciona la Moneda A (la moneda cuyo precio hipotético quieres calcular) y la Moneda B (la moneda cuya capitalización de mercado quieres que alcance la Moneda A). Ambas capitalizaciones de mercado y suministros circulantes se obtienen automáticamente de los datos en tiempo real de CoinGecko.`,
      `El resultado es el precio implícito de la Moneda A = capitalización de mercado de la Moneda B / suministro circulante de la Moneda A.`
      ],
    },
    pt: {
      how: [
      `O Comparador de Capitalização de Mercado responde 'se a Moeda A tivesse a capitalização de mercado da Moeda B, qual seria seu preço?' — o experimento mental mais comum no investimento cripto.`,
      `Use-o para definir metas de preço realistas para moedas menores comparando-as com referências estabelecidas.`
      ],
      inputs: [
      `Selecione a Moeda A (a moeda cujo preço hipotético você quer calcular) e a Moeda B (a moeda cuja capitalização de mercado você quer que a Moeda A alcance). Ambas as capitalizações e fornecimentos circulantes são obtidos automaticamente do CoinGecko.`,
      `O resultado é o preço implícito da Moeda A = capitalização de mercado da Moeda B / fornecimento circulante da Moeda A.`
      ],
    },
    tr: {
      how: [
      `Piyasa Değeri Karşılaştırıcısı 'A Coin'in B Coin'in piyasa değerine sahip olsaydı fiyatı ne olurdu?' sorusunu yanıtlar — kripto yatırımındaki en yaygın düşünce deneyi.`,
      `Daha küçük coinler için gerçekçi fiyat hedefleri belirlemek amacıyla onları yerleşik kıyaslamalarla karşılaştırarak kullanın.`
      ],
      inputs: [
      `Coin A'yı (varsayımsal fiyatını hesaplamak istediğiniz coin) ve Coin B'yi (Coin A'nın ulaşmasını istediğiniz piyasa değerine sahip coin) seçin. Her iki piyasa değeri ve dolaşımdaki arzlar CoinGecko'nun canlı verilerinden otomatik olarak alınır.`,
      `Sonuç, A Coin'in zımni fiyatıdır = B Coin'in piyasa değeri / A Coin'in dolaşımdaki arzı.`
      ],
    },
    hi: {
      how: [
      `मार्केट कैप कम्पेरेटर जवाब देता है 'अगर कॉइन A के पास कॉइन B का मार्केट कैप होता, तो उसकी कीमत क्या होती?' — क्रिप्टो निवेश में सबसे आम थॉट एक्सपेरिमेंट।`,
      `स्थापित बेंचमार्क से तुलना करके छोटे कॉइन के लिए यथार्थवादी मूल्य लक्ष्य निर्धारित करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `कॉइन A (जिसका काल्पनिक मूल्य आप कैलकुलेट करना चाहते हैं) और कॉइन B (जिसका मार्केट कैप आप कॉइन A तक पहुंचना चाहते हैं) चुनें।`,
      `रिजल्ट कॉइन A का निहित मूल्य है = कॉइन B का मार्केट कैप / कॉइन A की सर्कुलेटिंग सप्लाई।`
      ],
    },
    ru: {
      how: [
      `Сравнитель рыночных капитализаций отвечает на вопрос: «Если бы монета A имела рыночную капитализацию монеты B, какова была бы её цена?» — самый распространённый мысленный эксперимент в криптоинвестировании.`,
      `Используйте для установки реалистичных ценовых целей для небольших монет, сравнивая их с устоявшимися ориентирами.`
      ],
      inputs: [
      `Выберите монету A (чью гипотетическую цену вы хотите рассчитать) и монету B (чью рыночную капитализацию должна достичь монета A). Данные о капитализации и предложении загружаются автоматически с CoinGecko.`,
      `Результат — подразумеваемая цена монеты A = рыночная капитализация монеты B / обращающееся предложение монеты A.`
      ],
    },
  },
  'reverse-roi': {
    en: {
      how: [
      `The Reverse ROI Calculator solves for the buy price required to achieve a target return. Instead of asking 'what is my ROI if I buy at X?', it asks 'what price must I buy at to achieve Y% ROI?' — working backwards from a desired outcome. Enter your target ROI percentage and the current price, and the calculator returns the maximum entry price.`,
      `Use it when averaging down into a falling position to find the required average cost basis needed to return to profitability. If you bought ETH at $3,500 and it's now at $2,200, entering your target breakeven ROI lets you see exactly what average price you need to achieve by buying more — validating whether doubling down makes mathematical sense.`
      ],
      inputs: [
      `Target ROI is the percentage return you are seeking — e.g., 100% means you want to double your money. Current price is the live market price (auto-filled) or the expected exit price at which you plan to sell. The calculator solves for the maximum buy price.`,
      `For dollar-cost averaging scenarios, enter your target profit percentage and the expected sell price, and the calculator shows the required average entry. You can also use it to find the required DCA price after factoring in fees — enter your total fee percentage in the fee field to include round-trip trading costs in the target entry calculation.`
      ],
    },
    es: {
      how: [
      `La Calculadora ROI Inversa resuelve para el precio de compra requerido para lograr un retorno objetivo. En lugar de preguntar '¿cuál es mi ROI si compro a X?', pregunta '¿a qué precio debo comprar para lograr un ROI del Y%?'`,
      `Úsala cuando promedias hacia abajo en una posición que cae para encontrar el precio de costo promedio requerido necesario para volver a la rentabilidad.`
      ],
      inputs: [
      `El ROI objetivo es el porcentaje de retorno que buscas. El precio actual es el precio de mercado en vivo (rellenado automáticamente) o el precio de salida esperado.`,
      `Para escenarios de promediado de costo en dólares, introduce tu porcentaje de beneficio objetivo y el precio de venta esperado, y la calculadora muestra la entrada promedio requerida.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de ROI Inverso resolve para o preço de compra necessário para alcançar um retorno alvo. Em vez de perguntar 'qual é meu ROI se eu comprar a X?', pergunta 'a que preço devo comprar para alcançar Y% de ROI?'`,
      `Use-a ao fazer média para baixo em uma posição em queda para encontrar o preço de custo médio necessário para retornar à lucratividade.`
      ],
      inputs: [
      `O ROI alvo é a porcentagem de retorno que você está buscando. O preço atual é o preço de mercado ao vivo (preenchido automaticamente) ou o preço de saída esperado.`,
      `Para cenários de custo médio em dólar, insira sua porcentagem de lucro alvo e o preço de venda esperado, e a calculadora mostra a entrada média necessária.`
      ],
    },
    tr: {
      how: [
      `Ters ROI Hesaplayıcısı, hedef bir getiri elde etmek için gereken alış fiyatını çözer. 'X'ten satın alırsam ROI'm nedir?' yerine 'Y% ROI elde etmek için hangi fiyattan satın almalıyım?' sorusunu sorar.`,
      `Kâra geri dönmek için gereken ortalama maliyet bazını bulmak amacıyla düşen bir pozisyona ortalama yaparken kullanın.`
      ],
      inputs: [
      `Hedef ROI, aradığınız getiri yüzdesidir. Mevcut fiyat, canlı piyasa fiyatıdır (otomatik doldurulur) veya satmayı planladığınız beklenen çıkış fiyatıdır.`,
      `Dolar maliyet ortalaması senaryoları için, hedef kâr yüzdenizi ve beklenen satış fiyatınızı girin; hesaplayıcı gerekli ortalama girişi gösterir.`
      ],
    },
    hi: {
      how: [
      `रिवर्स ROI कैलकुलेटर लक्ष्य रिटर्न प्राप्त करने के लिए आवश्यक खरीद मूल्य हल करता है। 'X पर खरीदने पर मेरा ROI क्या है?' पूछने के बजाय, यह पूछता है 'Y% ROI प्राप्त करने के लिए मुझे किस कीमत पर खरीदना होगा?'`,
      `गिरती हुई पोजीशन में औसत करते समय लाभप्रदता पर वापस आने के लिए आवश्यक औसत कॉस्ट बेसिस खोजने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `टार्गेट ROI वह प्रतिशत रिटर्न है जो आप चाहते हैं। वर्तमान मूल्य लाइव मार्केट प्राइस है (स्वचालित रूप से भरती है) या अपेक्षित एग्जिट प्राइस।`,
      `डॉलर-कॉस्ट एवरेजिंग परिदृश्यों के लिए, अपना लक्ष्य प्रॉफिट प्रतिशत और अपेक्षित बिक्री मूल्य दर्ज करें, और कैलकुलेटर आवश्यक औसत एंट्री दिखाएगा।`
      ],
    },
    ru: {
      how: [
      `Обратный калькулятор ROI находит цену покупки, необходимую для достижения целевой доходности. Вместо вопроса «каков ROI при покупке по X?» он отвечает на вопрос «по какой цене нужно купить, чтобы получить Y% ROI?»`,
      `Используйте при доливании в убыточную позицию, чтобы найти требуемую среднюю себестоимость для выхода в прибыль.`
      ],
      inputs: [
      `Целевой ROI — желаемый процент доходности. Текущая цена — рыночная цена в реальном времени (подставляется автоматически) или ожидаемая цена выхода.`,
      `Для сценариев усреднения введите целевой процент прибыли и ожидаемую цену продажи — калькулятор покажет требуемую среднюю цену входа с учётом комиссий.`
      ],
    },
  },
  'crypto-loan-calculator': {
    en: {
      how: [
      `The Crypto Loan Calculator computes the interest cost, liquidation price, and LTV (loan-to-value) dynamics for a cryptocurrency-backed loan. Enter your collateral asset and amount, the loan amount in USD or stablecoin, the annual interest rate, and your loan duration to see total interest owed, effective APR, and the collateral price level that would trigger liquidation.`,
      `Use it before taking a crypto loan on platforms like Nexo, BlockFi, or Compound to understand the true cost and risk of leverage. The liquidation price calculation is especially valuable — it shows how much your collateral can drop before the lender liquidates your position to cover the loan, helping you maintain a safe margin of safety.`
      ],
      inputs: [
      `Collateral amount is the crypto you're pledging as security (e.g., 1 BTC). Collateral value is auto-filled at current price. Loan amount in USD is how much you're borrowing. LTV ratio (loan amount / collateral value) typically must stay below 50–80% depending on the platform — the calculator shows your current LTV and the critical liquidation LTV threshold.`,
      `Annual interest rate varies by platform and collateral type — ranges from 6–18% for major assets on CeFi platforms to 2–5% on DeFi protocols. Loan duration determines total interest. The maintenance LTV field shows at what LTV ratio the lender will liquidate — typically 10–15% above your initial LTV to provide a buffer for market volatility.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Préstamo Cripto calcula el costo de interés, el precio de liquidación y la dinámica LTV para un préstamo respaldado por criptomonedas.`,
      `Úsala antes de tomar un préstamo cripto en plataformas como Nexo, BlockFi o Compound para entender el costo real y el riesgo del apalancamiento.`
      ],
      inputs: [
      `El importe del colateral es el cripto que estás dando como garantía. El importe del préstamo en USD es cuánto estás pidiendo prestado. La relación LTV debe mantenerse por debajo del 50-80% según la plataforma.`,
      `La tasa de interés anual varía según la plataforma y el tipo de colateral. El campo de LTV de mantenimiento muestra a qué ratio LTV el prestamista liquidará.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Empréstimo Cripto calcula o custo de juros, o preço de liquidação e a dinâmica LTV para um empréstimo garantido por criptomoeda.`,
      `Use-a antes de fazer um empréstimo cripto em plataformas como Nexo, BlockFi ou Compound para entender o custo real e o risco da alavancagem.`
      ],
      inputs: [
      `O valor do colateral é o cripto que você está dando como garantia. O valor do empréstimo em USD é quanto você está tomando emprestado. A relação LTV deve permanecer abaixo de 50-80% dependendo da plataforma.`,
      `A taxa de juros anual varia por plataforma e tipo de colateral. O campo de LTV de manutenção mostra em que proporção LTV o credor liquidará.`
      ],
    },
    tr: {
      how: [
      `Kripto Kredi Hesaplayıcısı, kripto para destekli bir kredi için faiz maliyetini, likidasyon fiyatını ve LTV dinamiklerini hesaplar.`,
      `Nexo, BlockFi veya Compound gibi platformlarda kripto kredi almadan önce kaldıracın gerçek maliyetini ve riskini anlamak için kullanın.`
      ],
      inputs: [
      `Teminat tutarı, güvence olarak taahhüt ettiğiniz kripto paradır. USD cinsinden kredi tutarı, ne kadar borç aldığınızdır. LTV oranı platforma bağlı olarak %50-80'in altında kalmalıdır.`,
      `Yıllık faiz oranı platforma ve teminat türüne göre değişir. Bakım LTV alanı, borç verenin hangi LTV oranında likide edeceğini gösterir.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो लोन कैलकुलेटर क्रिप्टोकरेंसी-बैक्ड लोन के लिए ब्याज लागत, लिक्विडेशन प्राइस और LTV डायनामिक्स की गणना करता है।`,
      `Nexo, BlockFi, या Compound जैसे प्लेटफॉर्म पर क्रिप्टो लोन लेने से पहले लीवरेज की वास्तविक लागत और जोखिम समझने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `कोलैटरल राशि वह क्रिप्टो है जिसे आप सुरक्षा के रूप में प्रतिज्ञा कर रहे हैं। USD में लोन राशि वह है जो आप उधार ले रहे हैं। LTV अनुपात प्लेटफॉर्म के आधार पर 50-80% से नीचे रहना चाहिए।`,
      `वार्षिक ब्याज दर प्लेटफॉर्म और कोलैटरल प्रकार के अनुसार भिन्न होती है। मेंटेनेंस LTV फील्ड दिखाता है कि किस LTV अनुपात पर लेंडर लिक्विडेट करेगा।`
      ],
    },
    ru: {
      how: [
      `Калькулятор криптозайма рассчитывает стоимость процентов, цену ликвидации и динамику LTV для займа под залог криптовалюты.`,
      `Используйте перед получением криптозайма на платформах Nexo, BlockFi или Compound для понимания реальной стоимости и рисков.`
      ],
      inputs: [
      `Сумма залога — криптовалюта, закладываемая в качестве обеспечения. Сумма займа в USD — сколько вы занимаете. Коэффициент LTV должен оставаться ниже 50–80% в зависимости от платформы.`,
      `Годовая процентная ставка варьируется в зависимости от платформы и типа залога. Поле поддерживающего LTV показывает, при каком LTV кредитор проведёт ликвидацию.`
      ],
    },
  },
  'loan-calculator': {
    en: {
      how: [
        `The Loan Calculator models a traditional repayment schedule for crypto-backed borrowing. Enter the loan principal, annual interest rate, repayment term in months, and any origination fee to generate a full amortization table showing each monthly payment split between principal and interest. Unlike simple interest estimates, this calculator uses standard amortization so you can see exactly how your balance decreases over time.`,
        `Use it to compare loan offers from different crypto lending platforms by entering each one's rate and term. The calculator also shows total interest paid over the life of the loan and the effective cost including fees. If you plan to repay early, check the remaining balance at your target payoff month to see how much interest you save versus carrying the loan to full term.`
      ],
      inputs: [
        `Loan principal is the total amount you are borrowing in USD or stablecoins. Annual interest rate (APR) reflects the lender's stated rate — CeFi platforms typically charge 6-15% for major collateral assets, while DeFi protocols offer variable rates from 2-8%. Loan term in months determines how many installments you make; shorter terms mean higher monthly payments but less total interest.`,
        `Origination fee is a one-time upfront charge some platforms apply, typically 1-3% of the loan amount. The collateral ratio field optionally shows how much crypto you need to pledge to secure the loan — most platforms require 150-200% overcollateralization. The amortization schedule output lets you verify any monthly payment amount before committing.`
      ],
    },
    es: { how: [`La Calculadora de Préstamo modela un calendario de amortización para préstamos con respaldo cripto. Introduce el capital, la tasa de interés anual, el plazo en meses y cualquier comisión de originación para generar una tabla completa mostrando cada cuota mensual dividida entre capital e intereses.`, `Úsala para comparar ofertas de préstamo de diferentes plataformas introduciendo la tasa y el plazo de cada una. El calculador muestra el interés total pagado y el costo efectivo incluyendo comisiones.`], inputs: [`El capital del préstamo es el monto total que estás pidiendo prestado. La tasa de interés anual refleja la tasa declarada del prestamista — plataformas CeFi cobran 6-15% para colaterales principales, protocolos DeFi ofrecen tasas variables del 2-8%.`, `La comisión de originación es un cargo único que algunas plataformas aplican, típicamente 1-3% del monto. El ratio de colateral muestra cuánto cripto necesitas como garantía — la mayoría requiere 150-200% de sobrecolateralización.`] },
    pt: { how: [`A Calculadora de Empréstimo modela um cronograma de amortização para empréstimos com garantia cripto. Insira o principal, a taxa de juros anual, o prazo em meses e qualquer taxa de originação para gerar uma tabela completa mostrando cada parcela mensal dividida entre principal e juros.`, `Use-a para comparar ofertas de empréstimo de diferentes plataformas inserindo a taxa e o prazo de cada uma. A calculadora mostra os juros totais pagos e o custo efetivo incluindo taxas.`], inputs: [`O principal do empréstimo é o valor total que você está tomando emprestado. A taxa de juros anual reflete a taxa declarada pelo credor — plataformas CeFi cobram 6-15% para colaterais principais, protocolos DeFi oferecem taxas variáveis de 2-8%.`, `A taxa de originação é uma cobrança única que algumas plataformas aplicam, tipicamente 1-3% do valor. O índice de colateral mostra quanto cripto você precisa penhorar — a maioria requer 150-200% de sobrecolateralização.`] },
    tr: { how: [`Kredi Hesaplayıcı, kripto teminatlı borçlanma için standart bir amortisman takvimi modeller. Kredi anaparasını, yıllık faiz oranını, vadeyi ve başlangıç ücretini girerek her aylık ödemenin anapara ve faiz dağılımını gösteren tam bir tablo oluşturun.`, `Farklı kripto kredi platformlarının tekliflerini her birinin oranını ve vadesini girerek karşılaştırın. Hesaplayıcı, ücretler dahil toplam faiz ve efektif maliyeti gösterir.`], inputs: [`Kredi anaparası, ödünç aldığınız toplam tutardır. Yıllık faiz oranı, borç verenin belirtilen oranını yansıtır — CeFi platformları %6-15, DeFi protokolleri %2-8 değişken oranlar sunar.`, `Başlangıç ücreti, bazı platformların uyguladığı tek seferlik masraftır, genellikle %1-3. Teminat oranı alanı, krediyi güvence altına almak için ne kadar kripto taahhüt etmeniz gerektiğini gösterir.`] },
    hi: { how: [`लोन कैलकुलेटर क्रिप्टो-बैक्ड उधारी के लिए एक मानक अमॉर्टाइजेशन शेड्यूल मॉडल करता है। लोन प्रिंसिपल, वार्षिक ब्याज दर, महीनों में अवधि और ओरिजिनेशन फीस दर्ज करके प्रत्येक मासिक भुगतान का प्रिंसिपल और ब्याज विभाजन दिखाने वाली पूर्ण तालिका बनाएं।`, `विभिन्न क्रिप्टो लेंडिंग प्लेटफॉर्म के ऑफर की तुलना करने के लिए प्रत्येक की दर और अवधि दर्ज करें। कैलकुलेटर फीस सहित कुल ब्याज और इफेक्टिव कॉस्ट दिखाता है।`], inputs: [`लोन प्रिंसिपल वह कुल राशि है जो आप उधार ले रहे हैं। वार्षिक ब्याज दर लेंडर की बताई गई दर को दर्शाती है — CeFi प्लेटफॉर्म प्रमुख कोलैटरल के लिए 6-15% चार्ज करते हैं, DeFi प्रोटोकॉल 2-8% वेरिएबल दर देते हैं।`, `ओरिजिनेशन फीस कुछ प्लेटफॉर्म द्वारा लगाया जाने वाला वन-टाइम चार्ज है, आमतौर पर 1-3%। कोलैटरल रेशियो दिखाता है कि आपको कितना क्रिप्टो गिरवी रखना होगा — अधिकांश को 150-200% ओवर-कोलैटरलाइजेशन चाहिए।`] },
    ru: { how: [`Кредитный калькулятор моделирует стандартный график амортизации для займа под залог криптовалюты. Введите основную сумму, годовую процентную ставку, срок в месяцах и комиссию за выдачу для генерации полной таблицы с разбивкой каждого платежа на основную сумму и проценты.`, `Сравнивайте предложения разных криптоплатформ, вводя ставку и срок каждой. Калькулятор показывает общие выплаченные проценты и эффективную стоимость включая комиссии.`], inputs: [`Основная сумма займа — сколько вы занимаете в USD или стейблкоинах. Годовая ставка отражает тариф кредитора — CeFi-платформы берут 6-15% для основных залогов, DeFi-протоколы предлагают плавающие 2-8%.`, `Комиссия за выдачу — разовый платёж некоторых платформ, обычно 1-3% от суммы. Поле коэффициента залога показывает, сколько криптовалюты нужно заложить — большинство платформ требуют 150-200% перезалога.`] },
  },
  'pip-calculator': {
    en: {
      how: [
      `The Pip Calculator determines the monetary value of a price movement (pip) for cryptocurrency trading pairs, translating raw price changes into dollar profit or loss for your position size. Enter the trading pair, lot size or position quantity, and pip size — the calculator returns the exact USD value per pip so you can accurately size your stop-loss distance.`,
      `Use it alongside the Position Size Calculator to convert your stop-loss distance in pips into a dollar risk amount, ensuring your position size aligns with your maximum acceptable loss. For crypto pairs not priced in USD, the calculator applies the cross-rate to normalize pip values to your account currency.`
      ],
      inputs: [
      `Trading pair specifies the base and quote currencies (e.g., BTC/USD, ETH/BTC). Position size is the quantity of the base currency you hold. Pip size is the minimum price increment for that pair — typically $1 for BTC/USD, $0.01 for ETH/USD, or 0.00001 for pairs with 5 decimal places.`,
      `For perpetual futures, pip value also depends on the contract size and whether it's a linear (USDT-margined) or inverse (coin-margined) contract. Linear contracts calculate P&L in USDT while inverse contracts calculate P&L in the base asset. Ensure you're using the correct contract type for accurate pip value calculations.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Pips determina el valor monetario de un movimiento de precio (pip) para pares de trading de criptomonedas, traduciendo cambios de precio brutos en ganancias o pérdidas en dólares para el tamaño de tu posición.`,
      `Úsala junto con la Calculadora de Tamaño de Posición para convertir la distancia de tu stop-loss en pips a una cantidad de riesgo en dólares.`
      ],
      inputs: [
      `El par de trading especifica las monedas base y cotización. El tamaño de posición es la cantidad de la moneda base que tienes. El tamaño del pip es el incremento mínimo de precio para ese par.`,
      `Para futuros perpetuos, el valor del pip también depende del tamaño del contrato y si es un contrato lineal (con margen en USDT) o inverso (con margen en la moneda base).`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Pips determina o valor monetário de um movimento de preço (pip) para pares de negociação de criptomoeda, traduzindo mudanças brutas de preço em lucro ou perda em dólar para seu tamanho de posição.`,
      `Use-a junto com a Calculadora de Tamanho de Posição para converter a distância do seu stop-loss em pips para um valor de risco em dólar.`
      ],
      inputs: [
      `O par de negociação especifica as moedas base e cotação. O tamanho da posição é a quantidade da moeda base que você detém. O tamanho do pip é o incremento mínimo de preço para esse par.`,
      `Para futuros perpétuos, o valor do pip também depende do tamanho do contrato e se é um contrato linear (com margem em USDT) ou inverso (com margem na moeda base).`
      ],
    },
    tr: {
      how: [
      `Pip Hesaplayıcısı, ham fiyat değişikliklerini pozisyon büyüklüğünüz için dolar kâr veya zararına dönüştürerek kripto para işlem çiftleri için bir fiyat hareketinin (pip) parasal değerini belirler.`,
      `Stop-loss mesafenizi pip cinsinden dolar risk tutarına dönüştürmek için Pozisyon Büyüklüğü Hesaplayıcısı ile birlikte kullanın.`
      ],
      inputs: [
      `İşlem çifti, temel ve kotasyon para birimlerini belirtir. Pozisyon büyüklüğü elinizdeki temel para birimi miktarıdır. Pip büyüklüğü, bu çift için minimum fiyat artışıdır.`,
      `Sürekli vadeli işlemler için pip değeri aynı zamanda sözleşme büyüklüğüne ve bunun doğrusal (USDT teminatlı) veya ters (coin teminatlı) sözleşme olup olmadığına da bağlıdır.`
      ],
    },
    hi: {
      how: [
      `पिप कैलकुलेटर क्रिप्टोकरेंसी ट्रेडिंग पेयर के लिए प्राइस मूवमेंट (पिप) का मौद्रिक मूल्य निर्धारित करता है, कच्चे मूल्य परिवर्तनों को आपके पोजीशन साइज के लिए डॉलर प्रॉफिट या लॉस में ट्रांसलेट करता है।`,
      `अपने स्टॉप-लॉस दूरी को पिप में डॉलर रिस्क अमाउंट में कन्वर्ट करने के लिए पोजीशन साइज कैलकुलेटर के साथ इसका उपयोग करें।`
      ],
      inputs: [
      `ट्रेडिंग पेयर बेस और कोट करेंसी निर्दिष्ट करती है। पोजीशन साइज आपके पास बेस करेंसी की मात्रा है। पिप साइज उस पेयर के लिए न्यूनतम मूल्य वृद्धि है।`,
      `पर्पेचुअल फ्यूचर्स के लिए, पिप वैल्यू कॉन्ट्रैक्ट साइज और यह लीनियर (USDT-margined) या इनवर्स (coin-margined) कॉन्ट्रैक्ट है इस पर भी निर्भर करती है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор пипса определяет денежную стоимость движения цены (пипс) для криптовалютных торговых пар, переводя изменения цены в долларовый результат для вашего размера позиции.`,
      `Используйте вместе с калькулятором размера позиции для перевода расстояния стоп-лосса в пипсах в сумму долларового риска.`
      ],
      inputs: [
      `Торговая пара определяет базовую и котируемую валюты. Размер позиции — количество базовой валюты в вашем распоряжении. Размер пипса — минимальный шаг цены для данной пары.`,
      `Для бессрочных фьючерсов стоимость пипса также зависит от размера контракта и типа: линейный (маржа в USDT) или инверсный (маржа в базовой монете).`
      ],
    },
  },
  'portfolio-calculator': {
    en: {
      how: [
        `The Portfolio Calculator tracks your entire crypto portfolio in one place by computing current value, total profit or loss, and allocation percentages across all your holdings. Add each asset with its purchase price, quantity, and current market price to see individual and aggregate performance. The calculator displays your portfolio's total value, unrealized P&L, percentage gain, and a visual allocation breakdown.`,
        `Use it to evaluate portfolio diversification and identify concentration risk. If a single asset represents more than 30-40% of your portfolio, the calculator highlights this imbalance. Run "what-if" scenarios by adjusting individual asset prices to see how a 50% drop in your largest position or a 2x gain in an altcoin would affect your total portfolio value and allocation weights.`
      ],
      inputs: [
        `For each holding, enter the asset name or ticker, the quantity you own, and your average purchase price. The calculator fetches live prices from CoinGecko to compute current value automatically. You can add unlimited assets — from major coins like BTC and ETH to small-cap altcoins and stablecoins — building a complete picture of your holdings.`,
        `The average cost basis field accepts either the exact price per unit or a total investment amount divided by quantity. For assets purchased in multiple batches at different prices, calculate your weighted average cost before entering. The portfolio summary shows overall ROI, best and worst performing assets, and allocation percentages to help inform rebalancing decisions.`
      ],
    },
    es: { how: [`La Calculadora de Portafolio rastrea tu cartera cripto completa calculando el valor actual, las ganancias o pérdidas totales y los porcentajes de asignación. Añade cada activo con su precio de compra, cantidad y precio actual para ver el rendimiento individual y agregado.`, `Úsala para evaluar la diversificación e identificar riesgo de concentración. Si un solo activo representa más del 30-40% de tu cartera, el calculador señala este desequilibrio. Prueba escenarios ajustando precios individuales.`], inputs: [`Para cada tenencia, introduce el nombre del activo, la cantidad que posees y tu precio medio de compra. El calculador obtiene precios en vivo de CoinGecko. Puedes añadir activos ilimitados.`, `El campo de base de costo promedio acepta el precio por unidad o el importe total dividido por la cantidad. El resumen del portafolio muestra ROI general, activos con mejor y peor rendimiento, y porcentajes de asignación para decisiones de rebalanceo.`] },
    pt: { how: [`A Calculadora de Portfólio rastreia sua carteira cripto completa calculando o valor atual, lucro ou prejuízo total e porcentagens de alocação. Adicione cada ativo com preço de compra, quantidade e preço atual para ver o desempenho individual e agregado.`, `Use-a para avaliar diversificação e identificar risco de concentração. Se um único ativo representa mais de 30-40% do portfólio, a calculadora destaca esse desequilíbrio. Teste cenários ajustando preços individuais.`], inputs: [`Para cada posição, insira o nome do ativo, a quantidade e seu preço médio de compra. A calculadora busca preços ao vivo do CoinGecko. Você pode adicionar ativos ilimitados.`, `O campo de base de custo médio aceita o preço por unidade ou o valor total dividido pela quantidade. O resumo do portfólio mostra ROI geral, ativos com melhor e pior desempenho, e porcentagens de alocação.`] },
    tr: { how: [`Portföy Hesaplayıcı, mevcut değeri, toplam kâr/zararı ve tüm varlıklarınızın dağılım yüzdelerini hesaplayarak kripto portföyünüzü tek yerden takip eder. Her varlığı alış fiyatı, miktar ve güncel fiyatla ekleyerek bireysel ve toplu performansı görün.`, `Çeşitlendirmeyi değerlendirmek ve konsantrasyon riskini belirlemek için kullanın. Tek bir varlık portföyünüzün %30-40'ından fazlasını temsil ediyorsa bu dengesizlik vurgulanır.`], inputs: [`Her varlık için adı, sahip olduğunuz miktarı ve ortalama alış fiyatınızı girin. Hesaplayıcı güncel fiyatları CoinGecko'dan canlı olarak çeker. Sınırsız varlık ekleyebilirsiniz.`, `Ortalama maliyet bazı alanı birim başına fiyatı veya toplam yatırımın miktara bölünmüşünü kabul eder. Portföy özeti genel ROI, en iyi/en kötü performansı ve yeniden dengeleme kararları için dağılım yüzdelerini gösterir.`] },
    hi: { how: [`पोर्टफोलियो कैलकुलेटर वर्तमान मूल्य, कुल प्रॉफिट या लॉस और सभी होल्डिंग्स में एलोकेशन प्रतिशत की गणना करके आपके पूरे क्रिप्टो पोर्टफोलियो को एक जगह ट्रैक करता है। प्रत्येक एसेट को खरीद मूल्य, मात्रा और वर्तमान प्राइस के साथ जोड़ें।`, `डायवर्सिफिकेशन का मूल्यांकन और कंसंट्रेशन रिस्क की पहचान के लिए उपयोग करें। यदि एक एसेट आपके पोर्टफोलियो का 30-40% से अधिक है, तो कैलकुलेटर इस असंतुलन को हाइलाइट करता है।`], inputs: [`प्रत्येक होल्डिंग के लिए एसेट का नाम, आपके पास मौजूद मात्रा और औसत खरीद मूल्य दर्ज करें। कैलकुलेटर CoinGecko से लाइव प्राइस फेच करता है। आप असीमित एसेट्स जोड़ सकते हैं।`, `औसत कॉस्ट बेसिस फील्ड प्रति यूनिट प्राइस या कुल निवेश को मात्रा से विभाजित स्वीकार करता है। पोर्टफोलियो समरी कुल ROI, सर्वश्रेष्ठ और सबसे खराब प्रदर्शन वाले एसेट्स और रीबैलेंसिंग के लिए एलोकेशन प्रतिशत दिखाता है।`] },
    ru: { how: [`Калькулятор портфеля отслеживает весь ваш криптопортфель, рассчитывая текущую стоимость, общую прибыль или убыток и процент распределения по всем активам. Добавьте каждый актив с ценой покупки, количеством и текущей рыночной ценой для просмотра индивидуальной и совокупной эффективности.`, `Используйте для оценки диверсификации и выявления концентрационного риска. Если один актив составляет более 30-40% портфеля, калькулятор подсветит этот дисбаланс. Тестируйте сценарии, корректируя цены отдельных активов.`], inputs: [`Для каждого актива введите название, количество и среднюю цену покупки. Калькулятор загружает актуальные цены с CoinGecko. Количество активов не ограничено.`, `Поле средней себестоимости принимает цену за единицу или общую сумму инвестиций, делённую на количество. Сводка портфеля показывает общий ROI, лучшие и худшие по доходности активы и процентное распределение для принятия решений о ребалансировке.`] },
  },
  'mining-roi-calculator': {
    en: {
      how: [
      `The Mining ROI Calculator measures the total return on investment for a mining operation, factoring in hardware acquisition cost, ongoing electricity expenses, pool fees, and revenue from mined coins. Enter all cost components and your projected mining duration to see cumulative profit, ROI percentage, and break-even timeline displayed month by month.`,
      `Use it to make the go/no-go decision on hardware purchases. A useful exercise is to calculate ROI at three price points: current coin price, 50% below, and 100% above — to see under what scenarios the hardware pays off. For large operations, compare the mining ROI against simply buying and holding the equivalent coin value to see which approach delivers better risk-adjusted returns.`
      ],
      inputs: [
      `Hardware cost is the total capital expenditure on mining equipment. Monthly electricity cost is calculated from your hashrate, power consumption, and electricity rate — or you can enter it directly if you already know your monthly power bill for the rig. Monthly pool fees are automatically calculated from your expected monthly revenue and pool fee percentage.`,
      `Expected monthly revenue is auto-calculated from your hashrate, current network difficulty, block reward, and coin price. Difficulty adjustment frequency varies by coin — Bitcoin adjusts every ~2 weeks, making it relatively predictable. Altcoins can see more dramatic difficulty changes. The calculator models difficulty as constant unless you manually adjust the 'expected difficulty change' field.`
      ],
    },
    es: {
      how: [
      `La Calculadora de ROI de Minería mide el retorno total de inversión para una operación de minería, considerando el costo de adquisición del hardware, los gastos continuos de electricidad, las comisiones del pool y los ingresos de las monedas minadas.`,
      `Úsala para tomar la decisión de compra de hardware. Un ejercicio útil es calcular el ROI en tres puntos de precio: precio actual, 50% por debajo y 100% por encima.`
      ],
      inputs: [
      `El costo de hardware es el gasto total de capital en equipos de minería. El costo mensual de electricidad se calcula a partir de tu hashrate, consumo de energía y tarifa eléctrica.`,
      `Los ingresos mensuales esperados se calculan automáticamente desde tu hashrate, la dificultad de red actual, la recompensa de bloque y el precio de la moneda.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de ROI de Mineração mede o retorno total do investimento para uma operação de mineração, considerando custo de aquisição de hardware, despesas contínuas de eletricidade, taxas de pool e receita de moedas mineradas.`,
      `Use-a para tomar a decisão de compra de hardware. Um exercício útil é calcular o ROI em três pontos de preço: preço atual, 50% abaixo e 100% acima.`
      ],
      inputs: [
      `O custo do hardware é o gasto total de capital em equipamentos de mineração. O custo mensal de eletricidade é calculado a partir do seu hashrate, consumo de energia e tarifa elétrica.`,
      `A receita mensal esperada é calculada automaticamente a partir do seu hashrate, dificuldade atual da rede, recompensa de bloco e preço da moeda.`
      ],
    },
    tr: {
      how: [
      `Madencilik ROI Hesaplayıcısı, donanım edinme maliyeti, devam eden elektrik giderleri, havuz ücretleri ve madencilik gelirini dikkate alarak bir madencilik operasyonunun toplam yatırım getirisini ölçer.`,
      `Donanım satın alma kararını vermek için kullanın. Mevcut coin fiyatında, %50 aşağısında ve %100 yukarısında ROI hesaplamak faydalı bir alıştırmadır.`
      ],
      inputs: [
      `Donanım maliyeti, madencilik ekipmanlarına yapılan toplam sermaye harcamasıdır. Aylık elektrik maliyeti, hashrate, güç tüketimi ve elektrik tarifenizden hesaplanır.`,
      `Beklenen aylık gelir, hashrate, mevcut ağ zorluğu, blok ödülü ve coin fiyatından otomatik hesaplanır.`
      ],
    },
    hi: {
      how: [
      `माइनिंग ROI कैलकुलेटर हार्डवेयर अधिग्रहण लागत, चल रही बिजली खर्च, पूल फीस और माइन किए गए कॉइन से राजस्व को ध्यान में रखते हुए माइनिंग ऑपरेशन के लिए कुल ROI मापता है।`,
      `हार्डवेयर खरीद निर्णय के लिए इसका उपयोग करें। तीन मूल्य बिंदुओं पर ROI कैलकुलेट करना एक उपयोगी अभ्यास है: वर्तमान कॉइन प्राइस, 50% नीचे और 100% ऊपर।`
      ],
      inputs: [
      `हार्डवेयर लागत माइनिंग उपकरण पर कुल पूंजीगत व्यय है। मासिक बिजली लागत आपके हैशरेट, पावर कंजम्प्शन और बिजली दर से गणना की जाती है।`,
      `अपेक्षित मासिक राजस्व आपके हैशरेट, वर्तमान नेटवर्क डिफिकल्टी, ब्लॉक रिवॉर्ड और कॉइन प्राइस से स्वचालित रूप से गणना होता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ROI майнинга измеряет общую доходность инвестиций в майнинговую операцию, учитывая стоимость оборудования, расходы на электроэнергию, комиссии пула и доход от добытых монет.`,
      `Используйте для принятия решения о покупке оборудования. Полезно рассчитать ROI при трёх ценовых сценариях: текущая цена, на 50% ниже и на 100% выше.`
      ],
      inputs: [
      `Стоимость оборудования — общие капиталовложения в майнинговое оборудование. Ежемесячные расходы на электроэнергию рассчитываются исходя из хешрейта, энергопотребления и тарифа.`,
      `Ожидаемый ежемесячный доход рассчитывается автоматически на основе хешрейта, текущей сложности сети, вознаграждения за блок и цены монеты.`
      ],
    },
  },
  'electricity-cost-calculator': {
    en: {
      how: [
      `The Electricity Cost Calculator determines the exact monthly and annual electricity expense for any mining rig or power-intensive crypto operation. Enter the total power draw in watts and your electricity rate in $/kWh to see hourly, daily, monthly, and annual electricity costs — the single largest operating expense for most miners.`,
      `Use it to compare mining economics across different geographic locations. A rig consuming 3,000 watts costs $131/month at $0.06/kWh in cheaper regions like Kazakhstan or parts of the US, versus $394/month at $0.18/kWh in high-cost electricity markets. The break-even electricity rate field shows the maximum rate at which your mining operation remains profitable.`
      ],
      inputs: [
      `Power consumption in watts is the total draw from the wall — not the GPU or ASIC rated TDP, but the actual system-level power including fans, frame, and PSU inefficiency. Use a smart plug power meter for accurate measurement. Electricity rate in $/kWh is your actual billing rate including delivery charges and taxes, not the advertised base rate.`,
      `For time-of-use pricing (where electricity is cheaper during off-peak hours), enter the weighted average rate based on your typical hours of operation. For large operations, industrial electricity contracts may offer lower rates but have minimum demand requirements — consult your utility for commercial rate schedules before assuming residential rates apply.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Costo de Electricidad determina el gasto exacto de electricidad mensual y anual para cualquier rig de minería u operación cripto de alto consumo energético.`,
      `Úsala para comparar la economía de la minería en diferentes ubicaciones geográficas.`
      ],
      inputs: [
      `El consumo de energía en vatios es el consumo total de la pared — no el TDP nominal de la GPU o ASIC, sino la potencia real a nivel del sistema. La tarifa eléctrica en $/kWh es tu tarifa de facturación real.`,
      `Para precios por tiempo de uso, introduce la tarifa promedio ponderada según tus horas típicas de operación.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Custo de Eletricidade determina a despesa exata de eletricidade mensal e anual para qualquer rig de mineração ou operação cripto com uso intensivo de energia.`,
      `Use-a para comparar a economia de mineração em diferentes localizações geográficas.`
      ],
      inputs: [
      `O consumo de energia em watts é o consumo total da tomada — não o TDP nominal da GPU ou ASIC, mas a energia real em nível de sistema. A tarifa de eletricidade em $/kWh é sua tarifa de cobrança real.`,
      `Para preços por tempo de uso, insira a tarifa média ponderada com base nas suas horas típicas de operação.`
      ],
    },
    tr: {
      how: [
      `Elektrik Maliyeti Hesaplayıcısı, herhangi bir madencilik rigi veya güç yoğun kripto operasyonu için tam aylık ve yıllık elektrik giderini belirler.`,
      `Farklı coğrafi konumlardaki madencilik ekonomisini karşılaştırmak için kullanın.`
      ],
      inputs: [
      `Watt cinsinden güç tüketimi, GPU veya ASIC nominal TDP'si değil, duvardan alınan toplam güçtür. $/kWh cinsinden elektrik oranı gerçek faturalandırma oranınızdır.`,
      `Kullanım zamanına göre fiyatlandırma için, tipik çalışma saatlerinize göre ağırlıklı ortalama oranı girin.`
      ],
    },
    hi: {
      how: [
      `बिजली लागत कैलकुलेटर किसी भी माइनिंग रिग या पावर-इंटेंसिव क्रिप्टो ऑपरेशन के लिए सटीक मासिक और वार्षिक बिजली खर्च निर्धारित करता है।`,
      `विभिन्न भौगोलिक स्थानों पर माइनिंग इकोनॉमिक्स की तुलना करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `वाट में पावर कंजम्प्शन वॉल से कुल ड्रॉ है — GPU या ASIC रेटेड TDP नहीं, बल्कि वास्तविक सिस्टम-लेवल पावर। $/kWh में बिजली दर आपकी वास्तविक बिलिंग दर है।`,
      `टाइम-ऑफ-यूज़ प्राइसिंग के लिए, अपने ऑपरेशन के विशिष्ट घंटों के आधार पर भारित औसत दर दर्ज करें।`
      ],
    },
    ru: {
      how: [
      `Калькулятор стоимости электроэнергии рассчитывает точные ежемесячные и годовые расходы на электроэнергию для любого майнинг-рига или энергоёмкой криптооперации.`,
      `Используйте для сравнения экономики майнинга в разных географических регионах.`
      ],
      inputs: [
      `Мощность потребления в ваттах — это общий ток из розетки, не номинальный TDP видеокарты или ASIC, а реальное системное потребление. Тариф в $/кВт·ч — ваш фактический счёт за электроэнергию.`,
      `При двухтарифном учёте введите средневзвешенный тариф исходя из типичных часов работы оборудования.`
      ],
    },
  },
  'difficulty-calculator': {
    en: {
      how: [
      `The Mining Difficulty Calculator estimates how Bitcoin's network difficulty will change at the next adjustment and projects its impact on your mining revenue. It calculates the expected difficulty adjustment percentage based on the time elapsed since the last adjustment and the current block production rate compared to the target 10-minute interval.`,
      `Use it to anticipate revenue changes before the next difficulty adjustment. If blocks are being mined faster than the 10-minute target, difficulty will increase and your share of the block reward will decrease proportionally. During rapid hash rate growth periods, difficulty can jump 5–10% per adjustment — the calculator helps you model this impact on profitability.`
      ],
      inputs: [
      `Current block height and last adjustment block are auto-fetched from the Bitcoin network. The expected block time (10 minutes for Bitcoin) is preset. Current average block time, derived from recent blocks, determines whether difficulty is expected to increase or decrease.`,
      `The projected difficulty change percentage is derived from the ratio: (expected blocks in period) / (actual blocks mined in period). A positive percentage means difficulty will increase; negative means it will decrease. This directly impacts your hashrate's share of the network and therefore your daily coin earnings.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Dificultad de Minería estima cómo cambiará la dificultad de red de Bitcoin en el próximo ajuste y proyecta su impacto en tus ingresos de minería.`,
      `Úsala para anticipar cambios de ingresos antes del próximo ajuste de dificultad.`
      ],
      inputs: [
      `La altura del bloque actual y el bloque del último ajuste se obtienen automáticamente de la red Bitcoin. El tiempo promedio de bloque actual determina si se espera que la dificultad aumente o disminuya.`,
      `El porcentaje de cambio de dificultad proyectado se deriva de la relación: (bloques esperados en el período) / (bloques realmente minados en el período).`
      ],
    },
    pt: {
      how: [
      `A Calculadora de Dificuldade de Mineração estima como a dificuldade de rede do Bitcoin mudará no próximo ajuste e projeta seu impacto na sua receita de mineração.`,
      `Use-a para antecipar mudanças de receita antes do próximo ajuste de dificuldade.`
      ],
      inputs: [
      `A altura do bloco atual e o bloco do último ajuste são obtidos automaticamente da rede Bitcoin. O tempo médio atual do bloco determina se a dificuldade deve aumentar ou diminuir.`,
      `A porcentagem de mudança de dificuldade projetada é derivada da proporção: (blocos esperados no período) / (blocos realmente minerados no período).`
      ],
    },
    tr: {
      how: [
      `Madencilik Zorluğu Hesaplayıcısı, Bitcoin'in ağ zorluğunun bir sonraki ayarlamada nasıl değişeceğini tahmin eder ve madencilik geliriniz üzerindeki etkisini öngörür.`,
      `Bir sonraki zorluk ayarlamasından önce gelir değişikliklerini öngörmek için kullanın.`
      ],
      inputs: [
      `Mevcut blok yüksekliği ve son ayarlama bloğu Bitcoin ağından otomatik olarak alınır. Mevcut ortalama blok süresi, zorluğun artması veya azalması beklenip beklenmediğini belirler.`,
      `Öngörülen zorluk değişim yüzdesi, oranından türetilir: (dönemdeki beklenen bloklar) / (dönemde gerçekten madencilik yapılan bloklar).`
      ],
    },
    hi: {
      how: [
      `माइनिंग डिफिकल्टी कैलकुलेटर अनुमान लगाता है कि Bitcoin का नेटवर्क डिफिकल्टी अगले एडजस्टमेंट पर कैसे बदलेगा और आपके माइनिंग राजस्व पर इसके प्रभाव का अनुमान लगाता है।`,
      `अगले डिफिकल्टी एडजस्टमेंट से पहले राजस्व परिवर्तनों का अनुमान लगाने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `वर्तमान ब्लॉक हाइट और अंतिम एडजस्टमेंट ब्लॉक Bitcoin नेटवर्क से स्वचालित रूप से फेच किए जाते हैं। वर्तमान औसत ब्लॉक समय निर्धारित करता है कि डिफिकल्टी बढ़ने या घटने की उम्मीद है।`,
      `अनुमानित डिफिकल्टी परिवर्तन प्रतिशत अनुपात से प्राप्त होता है: (अवधि में अपेक्षित ब्लॉक) / (अवधि में वास्तव में माइन किए गए ब्लॉक)।`
      ],
    },
    ru: {
      how: [
      `Калькулятор сложности майнинга прогнозирует изменение сложности сети Bitcoin на следующей корректировке и её влияние на ваш доход от майнинга.`,
      `Используйте для прогнозирования изменений дохода до следующей корректировки сложности.`
      ],
      inputs: [
      `Текущая высота блока и блок последней корректировки загружаются автоматически из сети Bitcoin. Текущее среднее время блока определяет, ожидается ли рост или снижение сложности.`,
      `Прогнозируемое изменение сложности рассчитывается как отношение: (ожидаемые блоки за период) / (фактически добытые блоки за период).`
      ],
    },
  },
  'hashrate-converter': {
    en: {
      how: [
      `The Hashrate Converter translates mining speed units between H/s, KH/s, MH/s, GH/s, TH/s, PH/s, and EH/s — eliminating confusion when comparing hardware that reports in different units. Enter a value in any unit and all other units update instantly, making it easy to convert a GPU rig's MH/s into the TH/s used by ASIC miners or network-level statistics.`,
      `Use it when reading pool statistics, block explorer data, or mining calculator inputs that use different units than your hardware reports. Bitcoin network hashrate is reported in EH/s (exahashes per second), while individual miners work in TH/s — knowing the conversion is essential for understanding your share of the network.`
      ],
      inputs: [
      `Enter a hashrate value in any unit — H/s (hashes/sec), KH/s (kilohashes), MH/s (megahashes), GH/s (gigahashes), TH/s (terahashes), PH/s (petahashes), EH/s (exahashes) — and all others fill automatically. The multiplier between each tier is exactly 1,000.`,
      `Different mining algorithms report hashrate in different units: Ethereum used MH/s, Bitcoin uses TH/s, Kaspa uses GH/s or TH/s, Monero uses KH/s or MH/s. Always verify the algorithm-specific unit to avoid entering a value that is 1,000× off from your actual hardware performance.`
      ],
    },
    es: {
      how: [
      `El Convertidor de Hashrate traduce unidades de velocidad de minería entre H/s, KH/s, MH/s, GH/s, TH/s, PH/s y EH/s.`,
      `Úsalo cuando leas estadísticas de pool, datos de explorador de bloques o inputs de calculadoras de minería que usen unidades diferentes a las que reporta tu hardware.`
      ],
      inputs: [
      `Introduce un valor de hashrate en cualquier unidad y los demás se rellenan automáticamente. El multiplicador entre cada nivel es exactamente 1,000.`,
      `Diferentes algoritmos de minería reportan hashrate en diferentes unidades. Siempre verifica la unidad específica del algoritmo para evitar ingresar un valor que sea 1,000× diferente.`
      ],
    },
    pt: {
      how: [
      `O Conversor de Hashrate traduz unidades de velocidade de mineração entre H/s, KH/s, MH/s, GH/s, TH/s, PH/s e EH/s.`,
      `Use-o ao ler estatísticas de pool, dados de explorador de blocos ou entradas de calculadoras de mineração que usam unidades diferentes das que seu hardware reporta.`
      ],
      inputs: [
      `Insira um valor de hashrate em qualquer unidade e os outros preenchem automaticamente. O multiplicador entre cada nível é exatamente 1.000.`,
      `Diferentes algoritmos de mineração reportam hashrate em diferentes unidades. Sempre verifique a unidade específica do algoritmo para evitar inserir um valor que seja 1.000× diferente.`
      ],
    },
    tr: {
      how: [
      `Hashrate Dönüştürücüsü, madencilik hızı birimlerini H/s, KH/s, MH/s, GH/s, TH/s, PH/s ve EH/s arasında dönüştürür.`,
      `Farklı birimler kullanan havuz istatistiklerini, blok gezgini verilerini veya madencilik hesaplayıcısı girdilerini okurken kullanın.`
      ],
      inputs: [
      `Herhangi bir birimdeki bir hashrate değeri girin ve diğerleri otomatik olarak dolar. Her katman arasındaki çarpan tam olarak 1.000'dir.`,
      `Farklı madencilik algoritmaları hashrate'i farklı birimlerde raporlar. Gerçek donanım performansınızdan 1.000× farklı bir değer girmemek için algoritmaya özgü birimi her zaman doğrulayın.`
      ],
    },
    hi: {
      how: [
      `हैशरेट कन्वर्टर H/s, KH/s, MH/s, GH/s, TH/s, PH/s और EH/s के बीच माइनिंग स्पीड यूनिट को ट्रांसलेट करता है।`,
      `पूल स्टैटिस्टिक्स, ब्लॉक एक्सप्लोरर डेटा, या माइनिंग कैलकुलेटर इनपुट पढ़ते समय इसका उपयोग करें जो आपके हार्डवेयर रिपोर्ट से अलग यूनिट का उपयोग करते हैं।`
      ],
      inputs: [
      `किसी भी यूनिट में हैशरेट मूल्य दर्ज करें और बाकी स्वचालित रूप से भर जाते हैं। प्रत्येक टियर के बीच गुणक ठीक 1,000 है।`,
      `अलग-अलग माइनिंग एल्गोरिदम अलग-अलग यूनिट में हैशरेट रिपोर्ट करते हैं। हमेशा एल्गोरिदम-विशिष्ट यूनिट सत्यापित करें।`
      ],
    },
    ru: {
      how: [
      `Конвертер хешрейта переводит единицы скорости майнинга между H/s, KH/s, MH/s, GH/s, TH/s, PH/s и EH/s.`,
      `Используйте при чтении статистики пула, данных блок-эксплорера или входных данных калькуляторов майнинга, использующих единицы, отличные от тех, что выдаёт ваше оборудование.`
      ],
      inputs: [
      `Введите значение хешрейта в любой единице — остальные заполнятся автоматически. Множитель между каждым уровнем ровно 1 000.`,
      `Разные алгоритмы майнинга используют разные единицы. Всегда уточняйте единицу измерения для конкретного алгоритма во избежание ошибки в 1 000 раз.`
      ],
    },
  },
  'timestamp-converter': {
    en: {
      how: [
      `The Timestamp Converter translates between Unix timestamps (seconds since January 1, 1970 UTC) and human-readable date/time formats. Blockchain data universally uses Unix timestamps — every transaction, block, and smart contract event stores time as a Unix integer. This calculator makes those timestamps immediately interpretable.`,
      `Use it when analyzing blockchain data in explorers, reading smart contract logs, or debugging transaction history exports. Paste a Unix timestamp from Etherscan, a DeFi contract, or a CSV export and instantly see the corresponding date and time in your local timezone or UTC.`
      ],
      inputs: [
      `Enter a Unix timestamp (integer seconds) to get the human-readable date and time, or enter a date and time to get the corresponding Unix timestamp. The calculator supports timestamps in both seconds (10 digits) and milliseconds (13 digits) — common in JavaScript-based applications and some exchange APIs.`,
      `The output displays time in UTC and optionally in your browser's local timezone. For smart contract interactions, Solidity uses seconds-based Unix timestamps while JavaScript uses milliseconds — dividing a 13-digit timestamp by 1,000 converts it to seconds format. The calculator auto-detects the format based on the input length.`
      ],
    },
    es: {
      how: [
      `El Convertidor de Timestamp traduce entre timestamps Unix (segundos desde el 1 de enero de 1970 UTC) y formatos de fecha/hora legibles por humanos.`,
      `Úsalo cuando analices datos de blockchain en exploradores, leas registros de contratos inteligentes o depures exportaciones de historial de transacciones.`
      ],
      inputs: [
      `Introduce un timestamp Unix para obtener la fecha y hora legibles por humanos, o introduce una fecha y hora para obtener el timestamp Unix correspondiente.`,
      `El calculador admite timestamps tanto en segundos (10 dígitos) como en milisegundos (13 dígitos). El formato se detecta automáticamente según la longitud de la entrada.`
      ],
    },
    pt: {
      how: [
      `O Conversor de Timestamp traduz entre timestamps Unix (segundos desde 1 de janeiro de 1970 UTC) e formatos de data/hora legíveis por humanos.`,
      `Use-o ao analisar dados de blockchain em exploradores, ler logs de contratos inteligentes ou depurar exportações de histórico de transações.`
      ],
      inputs: [
      `Insira um timestamp Unix para obter a data e hora legíveis por humanos, ou insira uma data e hora para obter o timestamp Unix correspondente.`,
      `A calculadora suporta timestamps em segundos (10 dígitos) e milissegundos (13 dígitos). O formato é detectado automaticamente com base no comprimento da entrada.`
      ],
    },
    tr: {
      how: [
      `Zaman Damgası Dönüştürücüsü, Unix zaman damgaları (1 Ocak 1970 UTC'den bu yana geçen saniyeler) ile insan tarafından okunabilir tarih/saat biçimleri arasında dönüştürme yapar.`,
      `Blockchain verilerini gezginlerde analiz ederken, akıllı sözleşme kayıtlarını okurken veya işlem geçmişi dışa aktarmalarında hata ayıklarken kullanın.`
      ],
      inputs: [
      `İnsan tarafından okunabilir tarih ve saati almak için bir Unix zaman damgası girin veya karşılık gelen Unix zaman damgasını almak için bir tarih ve saat girin.`,
      `Hesaplayıcı hem saniye (10 basamak) hem de milisaniye (13 basamak) formatındaki zaman damgalarını destekler.`
      ],
    },
    hi: {
      how: [
      `टाइमस्टैम्प कन्वर्टर Unix टाइमस्टैम्प (1 जनवरी 1970 UTC से सेकंड) और मानव-पठनीय दिनांक/समय प्रारूपों के बीच ट्रांसलेट करता है।`,
      `ब्लॉकचेन डेटा का ब्लॉक एक्सप्लोरर में विश्लेषण करते समय, स्मार्ट कॉन्ट्रैक्ट लॉग पढ़ते समय, या ट्रांजेक्शन हिस्ट्री एक्सपोर्ट डीबग करते समय इसका उपयोग करें।`
      ],
      inputs: [
      `मानव-पठनीय दिनांक और समय पाने के लिए Unix टाइमस्टैम्प दर्ज करें, या संबंधित Unix टाइमस्टैम्प पाने के लिए दिनांक और समय दर्ज करें।`,
      `कैलकुलेटर सेकंड (10 अंक) और मिलीसेकंड (13 अंक) दोनों में टाइमस्टैम्प सपोर्ट करता है।`
      ],
    },
    ru: {
      how: [
      `Конвертер меток времени переводит Unix-таймстампы (секунды с 1 января 1970 UTC) в человекочитаемые форматы даты и времени.`,
      `Используйте при анализе данных блокчейна в эксплорерах, чтении логов смарт-контрактов или разборе экспортов истории транзакций.`
      ],
      inputs: [
      `Введите Unix-таймстамп для получения читаемой даты и времени, или введите дату и время для получения соответствующего таймстампа.`,
      `Калькулятор поддерживает таймстампы в секундах (10 цифр) и миллисекундах (13 цифр). Формат определяется автоматически по длине входных данных.`
      ],
    },
  },
  'unit-converter': {
    en: {
      how: [
      `The Crypto Unit Converter handles conversions between all common cryptocurrency denominations for multiple blockchain networks simultaneously. It covers Bitcoin denomination units (BTC, mBTC, μBTC, satoshi), Ethereum units (ETH, gwei, wei), and common ERC-20 token decimal conversions — all in one place.`,
      `Use it when working with raw blockchain data, reading smart contract values, or verifying wallet amounts. Smart contracts store token amounts in their smallest denomination (wei for ETH, base units for ERC-20 tokens) — the converter translates these raw numbers into human-readable amounts and back again for debugging contract interactions.`
      ],
      inputs: [
      `Select the blockchain network (Bitcoin, Ethereum, or a specific ERC-20 token), then enter a value in any denomination. For ERC-20 tokens, the decimal precision varies by contract — most tokens use 18 decimals like ETH, but USDC and USDT use 6 decimals, and some tokens use non-standard values. Enter the token's decimal count in the custom decimals field.`,
      `The raw value field shows the integer representation used by the blockchain (e.g., 1 ETH = 1,000,000,000,000,000,000 wei). This is critical for smart contract interactions where the input must be in base units. The human-readable field shows the decimal-formatted value as displayed in wallets and exchanges.`
      ],
    },
    es: {
      how: [
      `El Convertidor de Unidades Cripto maneja conversiones entre todas las denominaciones comunes de criptomonedas para múltiples redes de blockchain simultáneamente.`,
      `Úsalo cuando trabajes con datos brutos de blockchain, leas valores de contratos inteligentes o verifiques cantidades de carteras.`
      ],
      inputs: [
      `Selecciona la red de blockchain, luego introduce un valor en cualquier denominación. Para tokens ERC-20, la precisión decimal varía según el contrato — la mayoría de los tokens usan 18 decimales como ETH, pero USDC y USDT usan 6 decimales.`,
      `El campo de valor bruto muestra la representación entera utilizada por el blockchain. Esto es crítico para interacciones con contratos inteligentes donde la entrada debe estar en unidades base.`
      ],
    },
    pt: {
      how: [
      `O Conversor de Unidades Cripto lida com conversões entre todas as denominações comuns de criptomoeda para múltiplas redes blockchain simultaneamente.`,
      `Use-o ao trabalhar com dados brutos de blockchain, ler valores de contratos inteligentes ou verificar valores de carteiras.`
      ],
      inputs: [
      `Selecione a rede blockchain, depois insira um valor em qualquer denominação. Para tokens ERC-20, a precisão decimal varia por contrato — a maioria dos tokens usa 18 decimais como ETH, mas USDC e USDT usam 6 decimais.`,
      `O campo de valor bruto mostra a representação inteira usada pelo blockchain. Isso é crítico para interações com contratos inteligentes.`
      ],
    },
    tr: {
      how: [
      `Kripto Birim Dönüştürücüsü, birden fazla blockchain ağı için tüm yaygın kripto para denominasyonları arasındaki dönüşümleri aynı anda gerçekleştirir.`,
      `Ham blockchain verileriyle çalışırken, akıllı sözleşme değerlerini okurken veya cüzdan tutarlarını doğrularken kullanın.`
      ],
      inputs: [
      `Blockchain ağını seçin, ardından herhangi bir denominasyonda bir değer girin. ERC-20 tokenlar için ondalık hassasiyet sözleşmeye göre değişir.`,
      `Ham değer alanı, blockchain tarafından kullanılan tamsayı gösterimini gösterir. Bu, girişin temel birimlerde olması gereken akıllı sözleşme etkileşimleri için kritiktir.`
      ],
    },
    hi: {
      how: [
      `क्रिप्टो यूनिट कन्वर्टर एक साथ कई ब्लॉकचेन नेटवर्क के लिए सभी सामान्य क्रिप्टोकरेंसी डिनॉमिनेशन के बीच कन्वर्जन संभालता है।`,
      `रॉ ब्लॉकचेन डेटा के साथ काम करते समय, स्मार्ट कॉन्ट्रैक्ट वैल्यू पढ़ते समय, या वॉलेट राशि सत्यापित करते समय इसका उपयोग करें।`
      ],
      inputs: [
      `ब्लॉकचेन नेटवर्क चुनें, फिर किसी भी डिनॉमिनेशन में मूल्य दर्ज करें। ERC-20 टोकन के लिए, दशमलव प्रेसिजन कॉन्ट्रैक्ट के अनुसार भिन्न होती है।`,
      `रॉ वैल्यू फील्ड ब्लॉकचेन द्वारा उपयोग किया गया इंटीजर रिप्रेजेंटेशन दिखाता है। यह स्मार्ट कॉन्ट्रैक्ट इंटरैक्शन के लिए महत्वपूर्ण है।`
      ],
    },
    ru: {
      how: [
      `Конвертер единиц криптовалют обеспечивает перевод между всеми распространёнными деноминациями для нескольких блокчейн-сетей одновременно.`,
      `Используйте при работе с «сырыми» данными блокчейна, чтении значений смарт-контрактов или проверке сумм в кошельке.`
      ],
      inputs: [
      `Выберите сеть блокчейна, затем введите значение в любой деноминации. Для токенов ERC-20 точность десятичных знаков варьируется по контракту — большинство токенов используют 18 знаков, USDC/USDT — 6.`,
      `Поле «сырого значения» показывает целочисленное представление, используемое блокчейном. Это критично для взаимодействия со смарт-контрактами, где вход должен быть в базовых единицах.`
      ],
    },
  },
  'uniswap-calculator': {
    en: {
      how: [
      `The Uniswap Calculator estimates the output amount, price impact, and effective exchange rate for a token swap on Uniswap v2 or v3, allowing you to preview the trade before executing it. Enter the input token, input amount, output token, and pool fee tier (0.05%, 0.3%, or 1%) to see your expected output and the slippage impact for your position size.`,
      `Use it to compare different fee tiers for the same pair — a 0.05% fee tier may have deeper liquidity and lower slippage for stablecoin pairs, while a 1% tier may be the only pool available for exotic pairs. For large trades, compare the price impact across different split routes to determine whether routing through multiple pools reduces your effective cost.`
      ],
      inputs: [
      `Input token and output token define the swap pair. Input amount is the quantity you want to sell. Pool fee tier determines which Uniswap v3 pool to use — 0.05% for stable pairs, 0.3% for standard pairs, and 1% for illiquid or exotic pairs. Pool liquidity depth is auto-fetched from on-chain data.`,
      `Price impact percentage shows how much your trade moves the pool price — above 3% is considered high impact and may indicate insufficient pool liquidity. Slippage tolerance (set separately in the Uniswap UI) determines the maximum price deterioration you'll accept. For swaps with high price impact, reduce the trade size or split across multiple transactions.`
      ],
    },
    es: {
      how: [
      `La Calculadora de Uniswap estima el monto de salida, el impacto en el precio y el tipo de cambio efectivo para un intercambio de tokens en Uniswap v2 o v3.`,
      `Úsala para comparar diferentes niveles de comisión para el mismo par — un nivel de comisión del 0.05% puede tener mayor liquidez y menor deslizamiento para pares de stablecoins.`
      ],
      inputs: [
      `El token de entrada y el token de salida definen el par de intercambio. El nivel de comisión del pool determina qué pool de Uniswap v3 usar — 0.05% para pares estables, 0.3% para pares estándar.`,
      `El porcentaje de impacto en el precio muestra cuánto mueve tu operación el precio del pool — por encima del 3% se considera alto impacto.`
      ],
    },
    pt: {
      how: [
      `A Calculadora Uniswap estima o valor de saída, o impacto no preço e a taxa de câmbio efetiva para uma troca de tokens no Uniswap v2 ou v3.`,
      `Use-a para comparar diferentes níveis de taxa para o mesmo par — um nível de taxa de 0,05% pode ter liquidez mais profunda e menor slippage para pares de stablecoins.`
      ],
      inputs: [
      `O token de entrada e o token de saída definem o par de troca. O nível de taxa do pool determina qual pool Uniswap v3 usar.`,
      `A porcentagem de impacto no preço mostra o quanto sua negociação move o preço do pool — acima de 3% é considerado alto impacto.`
      ],
    },
    tr: {
      how: [
      `Uniswap Hesaplayıcısı, Uniswap v2 veya v3'te bir token takası için çıkış tutarını, fiyat etkisini ve efektif döviz kurunu tahmin eder.`,
      `Aynı çift için farklı ücret katmanlarını karşılaştırmak için kullanın — %0.05 ücret katmanı, stablecoin çiftleri için daha derin likiditeye sahip olabilir.`
      ],
      inputs: [
      `Giriş token ve çıkış token, takas çiftini tanımlar. Havuz ücret katmanı, hangi Uniswap v3 havuzunun kullanılacağını belirler.`,
      `Fiyat etkisi yüzdesi, takasınızın havuz fiyatını ne kadar hareket ettirdiğini gösterir — %3'ün üzeri yüksek etki olarak kabul edilir.`
      ],
    },
    hi: {
      how: [
      `Uniswap कैलकुलेटर Uniswap v2 या v3 पर टोकन स्वैप के लिए आउटपुट राशि, मूल्य प्रभाव और प्रभावी एक्सचेंज रेट का अनुमान लगाता है।`,
      `एक ही पेयर के लिए विभिन्न फीस टियर की तुलना करने के लिए इसका उपयोग करें।`
      ],
      inputs: [
      `इनपुट टोकन और आउटपुट टोकन स्वैप पेयर परिभाषित करते हैं। पूल फीस टियर निर्धारित करता है कि कौन सा Uniswap v3 पूल उपयोग करना है।`,
      `मूल्य प्रभाव प्रतिशत दिखाता है कि आपका ट्रेड पूल मूल्य को कितना बदलता है — 3% से ऊपर उच्च प्रभाव माना जाता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор Uniswap оценивает выходную сумму, ценовое влияние и эффективный курс обмена для свопа токенов на Uniswap v2 или v3.`,
      `Используйте для сравнения разных уровней комиссии для одной пары — уровень 0,05% может иметь более глубокую ликвидность и меньший проскальзывание для стейблкоин-пар.`
      ],
      inputs: [
      `Входной и выходной токены определяют пару для свопа. Уровень комиссии пула определяет, какой пул Uniswap v3 использовать.`,
      `Процент ценового влияния показывает, насколько ваш своп сдвигает цену пула — выше 3% считается высоким влиянием.`
      ],
    },
  },
  'bridge-comparator': {
    en: {
      how: [
      `The Bridge Comparator calculates and compares the total cost of moving assets between blockchain networks across multiple bridge protocols, helping you identify the cheapest and fastest cross-chain transfer option. Enter your source network, destination network, asset, and amount to see a side-by-side comparison of bridge fees, estimated transfer times, and net amounts received.`,
      `Use it before every cross-chain move to avoid overpaying on bridge fees, which can range from under 0.05% to over 1% depending on the bridge and network congestion. For large transfers ($10,000+), even a 0.3% fee difference between bridges represents $30 in direct savings — always compare before bridging.`
      ],
      inputs: [
      `Source network and destination network define the bridge direction (e.g., Ethereum → Arbitrum, Polygon → Optimism). Asset is the token being transferred — USDC, ETH, WBTC, etc. Transfer amount determines the applicable fee tier, as some bridges have minimum amounts and tiered fee structures for larger transfers.`,
      `Bridge protocols listed include major options like Stargate, Across, Hop, Connext, and Synapse. Each shows gas fees on both source and destination chains, protocol fees, estimated transfer time, and any slippage risk. Some bridges use liquidity pools with variable fees while others use canonical bridges with fixed fees — the calculator distinguishes between these types.`
      ],
    },
    es: {
      how: [
      `El Comparador de Puentes calcula y compara el costo total de mover activos entre redes de blockchain en múltiples protocolos de puente, ayudándote a identificar la opción de transferencia entre cadenas más barata y rápida.`,
      `Úsalo antes de cada movimiento entre cadenas para evitar pagar de más en comisiones de puente.`
      ],
      inputs: [
      `La red de origen y la red de destino definen la dirección del puente. El activo es el token que se transfiere. El importe de transferencia determina el nivel de comisión aplicable.`,
      `Los protocolos de puente listados incluyen opciones principales como Stargate, Across, Hop, Connext y Synapse.`
      ],
    },
    pt: {
      how: [
      `O Comparador de Pontes calcula e compara o custo total de mover ativos entre redes blockchain em múltiplos protocolos de ponte, ajudando você a identificar a opção de transferência entre cadeias mais barata e rápida.`,
      `Use-o antes de cada movimentação entre cadeias para evitar pagar a mais em taxas de ponte.`
      ],
      inputs: [
      `A rede de origem e a rede de destino definem a direção da ponte. O ativo é o token sendo transferido. O valor da transferência determina o nível de taxa aplicável.`,
      `Os protocolos de ponte listados incluem opções principais como Stargate, Across, Hop, Connext e Synapse.`
      ],
    },
    tr: {
      how: [
      `Köprü Karşılaştırıcısı, en ucuz ve hızlı zincirler arası transfer seçeneğini belirlemenize yardımcı olmak için birden fazla köprü protokolü üzerinden blokzincir ağları arasında varlıkları taşımanın toplam maliyetini hesaplar ve karşılaştırır.`,
      `Köprü ücretlerinde fazla ödemekten kaçınmak için her zincirler arası hareketten önce kullanın.`
      ],
      inputs: [
      `Kaynak ağ ve hedef ağ, köprü yönünü tanımlar. Varlık, aktarılan tokendir. Transfer tutarı, uygulanabilir ücret katmanını belirler.`,
      `Listelenen köprü protokolleri Stargate, Across, Hop, Connext ve Synapse gibi büyük seçenekleri içerir.`
      ],
    },
    hi: {
      how: [
      `ब्रिज कम्पेरेटर कई ब्रिज प्रोटोकॉल पर ब्लॉकचेन नेटवर्क के बीच एसेट मूव करने की कुल लागत की गणना और तुलना करता है।`,
      `ब्रिज फीस पर अधिक भुगतान से बचने के लिए प्रत्येक क्रॉस-चेन मूव से पहले इसका उपयोग करें।`
      ],
      inputs: [
      `सोर्स नेटवर्क और डेस्टिनेशन नेटवर्क ब्रिज दिशा परिभाषित करते हैं। एसेट ट्रांसफर किया जा रहा टोकन है।`,
      `लिस्टेड ब्रिज प्रोटोकॉल में Stargate, Across, Hop, Connext और Synapse जैसे प्रमुख विकल्प शामिल हैं।`
      ],
    },
    ru: {
      how: [
      `Сравнитель мостов рассчитывает и сравнивает общую стоимость перевода активов между блокчейн-сетями через несколько протоколов мостов, помогая найти самый дешёвый и быстрый вариант кросс-чейн перевода.`,
      `Используйте перед каждым кросс-чейн перемещением, чтобы не переплачивать комиссии моста.`
      ],
      inputs: [
      `Исходная и целевая сети определяют направление моста. Актив — передаваемый токен. Сумма перевода определяет применимый уровень комиссии.`,
      `В список включены ведущие протоколы: Stargate, Across, Hop, Connext и Synapse с указанием комиссий на обоих концах, времени передачи и риска проскальзывания.`
      ],
    },
  },
  'mev-calculator': {
    en: {
      how: [
      `The MEV (Maximal Extractable Value) Calculator estimates the potential MEV exposure in your DeFi transactions and calculates the cost of MEV protection services. MEV bots can front-run, sandwich, or back-run your trades to extract value from price movements you trigger — this calculator quantifies that risk based on your transaction type and size.`,
      `Use it to decide whether to route your trade through MEV-protected infrastructure (like Flashbots Protect, MEV Blocker, or CoW Protocol) versus standard mempool submission. For large swaps on DEXes, the savings from MEV protection can significantly exceed the marginal cost of the protection service.`
      ],
      inputs: [
      `Transaction type (DEX swap, LP add/remove, arbitrage) determines MEV risk profile. Trade size and the pool's liquidity depth determine how much price impact your transaction creates and therefore how attractive it is to MEV bots. Token pair volatility is a secondary factor — more volatile pairs attract more sandwich attacks.`,
      `The calculator shows estimated sandwich attack loss as a percentage and dollar amount for unprotected mempool transactions. MEV protection cost is typically 0–0.05% of transaction value depending on the service. The net savings from protection equals estimated MEV exposure minus protection cost.`
      ],
    },
    es: {
      how: [
      `La Calculadora MEV estima la exposición potencial a MEV en tus transacciones DeFi y calcula el costo de los servicios de protección MEV.`,
      `Úsala para decidir si enrutar tu operación a través de infraestructura protegida contra MEV (como Flashbots Protect, MEV Blocker o CoW Protocol) versus envío estándar al mempool.`
      ],
      inputs: [
      `El tipo de transacción determina el perfil de riesgo MEV. El tamaño de la operación y la profundidad de liquidez del pool determinan cuánto impacto de precio crea tu transacción.`,
      `La calculadora muestra la pérdida estimada de ataque sandwich como porcentaje e importe en dólares para transacciones de mempool no protegidas.`
      ],
    },
    pt: {
      how: [
      `A Calculadora MEV estima a exposição potencial ao MEV em suas transações DeFi e calcula o custo dos serviços de proteção MEV.`,
      `Use-a para decidir se deve rotear sua negociação por infraestrutura protegida contra MEV versus envio padrão de mempool.`
      ],
      inputs: [
      `O tipo de transação determina o perfil de risco MEV. O tamanho da negociação e a profundidade de liquidez do pool determinam quanto impacto no preço sua transação cria.`,
      `A calculadora mostra a perda estimada de ataque sandwich como porcentagem e valor em dólar para transações de mempool não protegidas.`
      ],
    },
    tr: {
      how: [
      `MEV Hesaplayıcısı, DeFi işlemlerinizdeki potansiyel MEV maruziyetini tahmin eder ve MEV koruma hizmetlerinin maliyetini hesaplar.`,
      `İşleminizi MEV korumalı altyapı üzerinden (Flashbots Protect, MEV Blocker veya CoW Protocol gibi) yönlendirip yönlendirmemeye karar vermek için kullanın.`
      ],
      inputs: [
      `İşlem türü MEV risk profilini belirler. İşlem büyüklüğü ve havuzun likidite derinliği, işleminizin ne kadar fiyat etkisi yarattığını belirler.`,
      `Hesaplayıcı, korunmasız mempool işlemleri için tahmini sandviç saldırısı kaybını yüzde ve dolar tutarı olarak gösterir.`
      ],
    },
    hi: {
      how: [
      `MEV कैलकुलेटर आपके DeFi ट्रांजेक्शन में संभावित MEV एक्सपोजर का अनुमान लगाता है और MEV प्रोटेक्शन सेवाओं की लागत की गणना करता है।`,
      `यह तय करने के लिए इसका उपयोग करें कि अपने ट्रेड को MEV-protected इन्फ्रास्ट्रक्चर (जैसे Flashbots Protect, MEV Blocker) के माध्यम से रूट करना है या नहीं।`
      ],
      inputs: [
      `ट्रांजेक्शन प्रकार MEV जोखिम प्रोफाइल निर्धारित करता है। ट्रेड साइज और पूल की लिक्विडिटी डेप्थ निर्धारित करती है कि आपका ट्रांजेक्शन कितना मूल्य प्रभाव बनाता है।`,
      `कैलकुलेटर असुरक्षित मेमपूल ट्रांजेक्शन के लिए अनुमानित सैंडविच अटैक हानि प्रतिशत और डॉलर राशि के रूप में दिखाता है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор MEV оценивает потенциальное воздействие MEV на ваши DeFi-транзакции и рассчитывает стоимость услуг защиты от MEV.`,
      `Используйте для принятия решения о маршрутизации транзакции через MEV-защищённую инфраструктуру (Flashbots Protect, MEV Blocker, CoW Protocol) вместо стандартного мемпула.`
      ],
      inputs: [
      `Тип транзакции определяет профиль риска MEV. Размер сделки и глубина ликвидности пула определяют, насколько привлекательна ваша транзакция для MEV-ботов.`,
      `Калькулятор показывает оценочный убыток от сэндвич-атаки в процентах и долларах для незащищённых транзакций мемпула.`
      ],
    },
  },
  'gamefi-calculator': {
    en: {
      how: [
      `The GameFi ROI Calculator estimates your return from play-to-earn games by factoring in upfront NFT or asset costs, daily token earnings, token price, and monthly operating costs. Enter your starting investment, expected daily earnings in tokens, current token price, and any ongoing expenses to see your break-even timeline and monthly profit projection.`,
      `Use it before investing in a new GameFi project to evaluate whether the scholarship or player economics are viable. High token earning rates often decline as more players join and token supply inflates — the calculator includes a 'token price decay' field to model earnings under gradual price depreciation, giving a more realistic projection than assuming stable token prices.`
      ],
      inputs: [
      `Initial investment covers NFT purchase prices, in-game assets, and any equipment required to start playing. Daily token earnings are based on the game's current scholar rates or your own estimated play hours and efficiency. Token price is auto-filled for listed tokens or entered manually for newer projects.`,
      `Monthly costs include transaction fees for claiming rewards, any renewal or energy costs within the game, and time cost if you factor in the opportunity cost of playing time. The token price decay field lets you model a linear price decline over your investment horizon — many P2E tokens have historically declined 50–90% within their first year of launch.`
      ],
    },
    es: {
      how: [
      `La Calculadora de ROI GameFi estima tu retorno de los juegos de ganar mientras juegas considerando los costos iniciales de NFT o activos, las ganancias diarias de tokens, el precio del token y los costos operativos mensuales.`,
      `Úsala antes de invertir en un nuevo proyecto GameFi para evaluar si la economía del jugador o becario es viable.`
      ],
      inputs: [
      `La inversión inicial cubre los precios de compra de NFT, activos en el juego y cualquier equipo necesario para comenzar a jugar. Las ganancias diarias de tokens se basan en las tasas de becarios actuales del juego.`,
      `Los costos mensuales incluyen las tarifas de transacción para reclamar recompensas y cualquier costo de renovación o energía dentro del juego.`
      ],
    },
    pt: {
      how: [
      `A Calculadora de ROI GameFi estima seu retorno de jogos play-to-earn considerando custos iniciais de NFT ou ativos, ganhos diários de tokens, preço do token e custos operacionais mensais.`,
      `Use-a antes de investir em um novo projeto GameFi para avaliar se a economia do jogador ou bolsista é viável.`
      ],
      inputs: [
      `O investimento inicial cobre os preços de compra de NFT, ativos no jogo e qualquer equipamento necessário para começar a jogar. Os ganhos diários de tokens são baseados nas taxas de bolsistas atuais do jogo.`,
      `Os custos mensais incluem taxas de transação para reivindicar recompensas e quaisquer custos de renovação ou energia dentro do jogo.`
      ],
    },
    tr: {
      how: [
      `GameFi ROI Hesaplayıcısı, başlangıç NFT veya varlık maliyetleri, günlük token kazançları, token fiyatı ve aylık işletim maliyetlerini dikkate alarak play-to-earn oyunlarından elde ettiğiniz getiriyi tahmin eder.`,
      `Oyuncu veya bursyer ekonomisinin uygulanabilir olup olmadığını değerlendirmek için yeni bir GameFi projesine yatırım yapmadan önce kullanın.`
      ],
      inputs: [
      `Başlangıç yatırımı NFT satın alma fiyatlarını, oyun içi varlıkları ve oynamaya başlamak için gereken ekipmanı kapsar.`,
      `Aylık maliyetler, ödülleri talep etmek için işlem ücretlerini ve oyundaki yenileme veya enerji maliyetlerini içerir.`
      ],
    },
    hi: {
      how: [
      `GameFi ROI कैलकुलेटर अग्रिम NFT या एसेट लागत, दैनिक टोकन कमाई, टोकन प्राइस, और मासिक परिचालन लागत को ध्यान में रखते हुए play-to-earn गेम से आपके रिटर्न का अनुमान लगाता है।`,
      `नए GameFi प्रोजेक्ट में निवेश से पहले यह मूल्यांकन करने के लिए इसका उपयोग करें कि स्कॉलरशिप या खिलाड़ी अर्थशास्त्र व्यवहार्य है या नहीं।`
      ],
      inputs: [
      `प्रारंभिक निवेश में NFT खरीद मूल्य, इन-गेम एसेट और खेलना शुरू करने के लिए आवश्यक उपकरण शामिल हैं।`,
      `मासिक लागत में रिवॉर्ड क्लेम करने के लिए ट्रांजेक्शन फीस और गेम के भीतर किसी भी नवीनीकरण या ऊर्जा लागत शामिल है।`
      ],
    },
    ru: {
      how: [
      `Калькулятор ROI GameFi оценивает доходность от play-to-earn игр с учётом начальных вложений в NFT, дневного заработка токенов, цены токена и ежемесячных операционных расходов.`,
      `Используйте перед вложением в новый GameFi-проект для оценки жизнеспособности экономики игроков или стипендиатов.`
      ],
      inputs: [
      `Начальные инвестиции охватывают стоимость NFT, внутриигровых активов и оборудования. Ежедневный заработок в токенах основан на текущих ставках для стипендиатов или вашем личном игровом времени.`,
      `Ежемесячные расходы включают комиссии за транзакции при получении наград и любые затраты внутри игры. Поле «снижение цены токена» позволяет смоделировать линейное падение цены.`
      ],
    },
  },
  'gas-fee-calculator': {
    en: {
      how: [
        `The Gas Fee Calculator estimates the transaction cost on Ethereum and other EVM-compatible blockchains before you submit a transaction. Enter the current gas price in Gwei, the gas limit for your transaction type, and the native token's USD price to see the total fee in both the native currency and dollars. The calculator pre-fills live Ethereum gas prices from the Etherscan oracle and current ETH/USD from CoinGecko.`,
        `Use it to time transactions for lower fees — gas prices fluctuate throughout the day, often dropping 60-80% during off-peak hours. The calculator supports common transaction types (simple transfer, ERC-20 transfer, Uniswap swap, NFT mint) with pre-set gas limits, or enter a custom gas limit for contract interactions. Compare costs across networks like Ethereum, Polygon, Arbitrum, and BSC to find the cheapest execution path.`
      ],
      inputs: [
        `Gas price in Gwei is the per-unit cost of computation on the network — live data auto-fills for Ethereum. Gas limit is the maximum units of gas your transaction can consume: 21,000 for a simple ETH transfer, 65,000 for an ERC-20 transfer, and 150,000–300,000 for DEX swaps. The network selector switches between supported chains with their respective gas mechanics.`,
        `The ETH price field converts the gas cost from ETH into USD for easier comparison. For EIP-1559 transactions, the calculator uses the base fee plus priority tip model. During network congestion, actual gas prices may exceed the oracle reading — add a 10-20% buffer to estimates for time-sensitive transactions to avoid stuck pending transactions.`
      ],
    },
    es: { how: [`La Calculadora de Comisiones de Gas estima el costo de transacción en Ethereum y otras blockchains compatibles con EVM. Introduce el precio del gas en Gwei, el límite de gas y el precio del token nativo en USD para ver la comisión total en moneda nativa y en dólares.`, `Úsala para programar transacciones en horarios de menor costo — los precios del gas fluctúan durante el día, cayendo un 60-80% en horas valle. Compara costos entre Ethereum, Polygon, Arbitrum y BSC para encontrar la ruta más barata.`], inputs: [`El precio del gas en Gwei es el costo por unidad de computación. El límite de gas es el máximo de unidades que tu transacción puede consumir: 21.000 para una transferencia simple, 65.000 para ERC-20, 150.000-300.000 para swaps en DEX.`, `El campo de precio ETH convierte el costo de gas de ETH a USD. Para transacciones EIP-1559, se usa el modelo de tarifa base más propina de prioridad. Añade un 10-20% de margen en transacciones urgentes.`] },
    pt: { how: [`A Calculadora de Taxas de Gas estima o custo de transação no Ethereum e outras blockchains compatíveis com EVM. Insira o preço do gas em Gwei, o limite de gas e o preço do token nativo em USD para ver a taxa total em moeda nativa e em dólares.`, `Use-a para programar transações em horários de menor custo — os preços do gas flutuam ao longo do dia, caindo 60-80% nos horários de menor demanda. Compare custos entre Ethereum, Polygon, Arbitrum e BSC.`], inputs: [`O preço do gas em Gwei é o custo por unidade de computação. O limite de gas é o máximo de unidades que sua transação pode consumir: 21.000 para transferência simples, 65.000 para ERC-20, 150.000-300.000 para swaps em DEX.`, `O campo de preço ETH converte o custo de gas de ETH para USD. Para transações EIP-1559, utiliza o modelo de taxa base mais gorjeta de prioridade. Adicione 10-20% de margem em transações urgentes.`] },
    tr: { how: [`Gas Ücreti Hesaplayıcı, Ethereum ve diğer EVM uyumlu blokzincirlerde işlem maliyetini tahmin eder. Gwei cinsinden gas fiyatını, gas limitini ve yerel tokenin USD fiyatını girerek toplam ücreti hem yerel para hem dolar cinsinden görün.`, `İşlemleri daha düşük ücret dönemlerinde zamanlamak için kullanın — gas fiyatları gün içinde dalgalanır ve yoğun olmayan saatlerde %60-80 düşer. Ethereum, Polygon, Arbitrum ve BSC arasında maliyetleri karşılaştırın.`], inputs: [`Gwei cinsinden gas fiyatı, ağdaki hesaplama birimi başına maliyettir. Gas limiti, işleminizin tüketebileceği maksimum birimdir: basit transfer 21.000, ERC-20 transfer 65.000, DEX swap 150.000-300.000.`, `ETH fiyat alanı gas maliyetini ETH'den USD'ye dönüştürür. EIP-1559 işlemleri için baz ücret artı öncelik bahşişi modeli kullanılır. Acil işlemlerde %10-20 tampon ekleyin.`] },
    hi: { how: [`गैस फी कैलकुलेटर Ethereum और अन्य EVM-संगत ब्लॉकचेन पर ट्रांजैक्शन कॉस्ट का अनुमान लगाता है। Gwei में गैस प्राइस, गैस लिमिट और नेटिव टोकन का USD प्राइस दर्ज करके नेटिव करेंसी और डॉलर दोनों में कुल फीस देखें।`, `कम फीस के लिए ट्रांजैक्शन टाइमिंग तय करने हेतु उपयोग करें — गैस प्राइस दिन भर बदलते हैं और ऑफ-पीक घंटों में 60-80% गिर सकते हैं। Ethereum, Polygon, Arbitrum और BSC में कॉस्ट की तुलना करें।`], inputs: [`Gwei में गैस प्राइस नेटवर्क पर कंप्यूटेशन की प्रति-यूनिट लागत है। गैस लिमिट आपके ट्रांजैक्शन द्वारा उपभोग किए जाने वाले अधिकतम यूनिट है: सिंपल ट्रांसफर 21,000, ERC-20 ट्रांसफर 65,000, DEX स्वैप 150,000-300,000।`, `ETH प्राइस फील्ड गैस कॉस्ट को ETH से USD में कन्वर्ट करता है। EIP-1559 ट्रांजैक्शन के लिए बेस फीस प्लस प्रायोरिटी टिप मॉडल उपयोग होता है। अर्जेंट ट्रांजैक्शन में 10-20% बफर जोड़ें।`] },
    ru: { how: [`Калькулятор комиссий Gas оценивает стоимость транзакции в Ethereum и других EVM-совместимых блокчейнах. Введите цену газа в Gwei, лимит газа и цену нативного токена в USD, чтобы увидеть общую комиссию в нативной валюте и долларах.`, `Используйте для выбора времени транзакций с минимальными комиссиями — цены на газ колеблются в течение дня, снижаясь на 60-80% в непиковые часы. Сравнивайте стоимость между Ethereum, Polygon, Arbitrum и BSC.`], inputs: [`Цена газа в Gwei — стоимость единицы вычислений в сети. Лимит газа — максимум единиц, которые может потребить транзакция: 21 000 для простого перевода, 65 000 для ERC-20, 150 000–300 000 для свопов на DEX.`, `Поле цены ETH конвертирует стоимость газа из ETH в USD. Для транзакций EIP-1559 используется модель базовой комиссии плюс приоритетные чаевые. Для срочных транзакций добавляйте 10-20% запаса к оценкам.`] },
  },
  'sharpe-calculator': {
    en: {
      how: [
        `The Sharpe Ratio Calculator measures how much excess return you earn per unit of volatility. Enter your portfolio or strategy returns, the risk-free rate (typically a Treasury yield or stablecoin lending rate), and the observation period. The calculator outputs a single number: positive means your returns exceeded the risk-free benchmark after adjusting for volatility; negative means you took on risk for sub-benchmark results. In crypto, a Sharpe above 1.0 is considered solid, above 2.0 is excellent, and below 0.5 suggests the strategy does not compensate adequately for its risk.`,
        `Use this calculator to compare strategies on an apples-to-apples basis. A 200% annual return with extreme drawdowns may have a lower Sharpe than a steady 40% return with minimal volatility. The Sharpe Ratio penalizes both upside and downside volatility equally, which is why pairing it with the Sortino Ratio — which only penalizes downside — gives a more complete picture of risk-adjusted performance.`
      ],
      inputs: [
        `Portfolio return is the total percentage gain over the measurement period. Risk-free rate should match the same period — use annualized rates only if your return is also annualized. Standard deviation of returns captures the volatility of your strategy; if you track daily returns, use daily standard deviation and annualize by multiplying by the square root of 365.`,
        `For crypto-specific analysis, consider using a stablecoin lending rate (3-8% APY) as the risk-free proxy rather than traditional Treasury rates. The observation window matters: a 30-day Sharpe during a bull run will differ dramatically from a 12-month figure that spans a full cycle. Longer windows produce more reliable estimates.`
      ],
    },
    es: { how: [`La calculadora del Ratio de Sharpe mide cuánto rendimiento excedente obtienes por unidad de volatilidad. Ingresa los retornos, la tasa libre de riesgo y el período. Un Sharpe superior a 1.0 es sólido en cripto; superior a 2.0 es excelente.`, `Úsala para comparar estrategias de forma equitativa. Un retorno del 200% con drawdowns extremos puede tener menor Sharpe que un 40% estable. Combina con Sortino para una visión más completa.`], inputs: [`El retorno del portafolio es la ganancia total en el período medido. La tasa libre de riesgo debe coincidir con el mismo período. Usa la desviación estándar de los retornos.`, `Para cripto, usa tasas de préstamo de stablecoins (3-8% APY) como proxy libre de riesgo. Ventanas más largas producen estimaciones más fiables.`] },
    pt: { how: [`A calculadora do Índice de Sharpe mede quanto retorno excedente você ganha por unidade de volatilidade. Insira retornos, taxa livre de risco e período. Sharpe acima de 1.0 é sólido em cripto.`, `Use para comparar estratégias de forma justa. Um retorno de 200% com drawdowns extremos pode ter Sharpe menor que 40% estável. Combine com Sortino para visão completa.`], inputs: [`O retorno do portfólio é o ganho percentual total no período. A taxa livre de risco deve corresponder ao mesmo período.`, `Para cripto, use taxas de empréstimo de stablecoins como proxy livre de risco. Janelas mais longas produzem estimativas mais confiáveis.`] },
    tr: { how: [`Sharpe Oranı Hesaplayıcı, volatilite birimi başına ne kadar fazla getiri elde ettiğinizi ölçer. Getirileri, risksiz oranı ve dönemi girin. Kripto'da 1.0 üstü sağlam, 2.0 üstü mükemmeldir.`, `Stratejileri eşit koşullarda karşılaştırmak için kullanın. Sortino ile birleştirin.`], inputs: [`Portföy getirisi, ölçüm dönemindeki toplam yüzde kazançtır. Risksiz oran aynı döneme uymalıdır.`, `Kripto için risksiz vekil olarak stablecoin borç verme oranlarını kullanın.`] },
    hi: { how: [`शार्प रेशियो कैलकुलेटर मापता है कि आप प्रति अस्थिरता इकाई कितना अतिरिक्त रिटर्न कमाते हैं। रिटर्न, जोखिम-मुक्त दर और अवधि दर्ज करें। क्रिप्टो में 1.0 से ऊपर ठोस है।`, `रणनीतियों की समान आधार पर तुलना करने के लिए उपयोग करें। पूर्ण चित्र के लिए सोर्टिनो के साथ जोड़ें।`], inputs: [`पोर्टफोलियो रिटर्न मापी गई अवधि में कुल प्रतिशत लाभ है। जोखिम-मुक्त दर उसी अवधि से मेल खानी चाहिए।`, `क्रिप्टो के लिए जोखिम-मुक्त प्रॉक्सी के रूप में स्टेबलकॉइन लेंडिंग दरों का उपयोग करें।`] },
    ru: { how: [`Калькулятор коэффициента Шарпа измеряет, сколько избыточной доходности вы получаете на единицу волатильности. Введите доходность, безрисковую ставку и период. В крипто Шарп выше 1.0 — хорошо, выше 2.0 — отлично.`, `Используйте для сравнения стратегий на равных условиях. Сочетайте с Сортино для полной картины.`], inputs: [`Доходность портфеля — это общий процентный прирост за период. Безрисковая ставка должна соответствовать тому же периоду.`, `Для крипто используйте ставки кредитования стейблкоинов как безрисковый ориентир.`] },
  },
  'sortino-calculator': {
    en: {
      how: [
        `The Sortino Ratio Calculator refines the Sharpe Ratio by penalizing only downside volatility — the kind of risk investors actually fear. Enter your returns, a minimum acceptable return (MAR), and the calculator separates upside moves from downside moves, computing downside deviation instead of total standard deviation. This means a strategy with large positive spikes but controlled losses scores higher on Sortino than Sharpe, which treats all volatility as equally undesirable.`,
        `For crypto traders, Sortino is often more useful than Sharpe because crypto returns are heavily right-skewed — large upside moves are common during bull runs, and penalizing those as "risk" distorts the picture. A Sortino above 2.0 indicates strong downside risk management, while below 1.0 suggests the strategy fails to adequately protect against losses relative to the return it generates.`
      ],
      inputs: [
        `Portfolio returns should be periodic (daily, weekly, or monthly). The minimum acceptable return (MAR) is typically set to 0% or to the risk-free rate — it represents the threshold below which returns count as "bad." Downside deviation is calculated only from returns that fall below the MAR, ignoring positive returns entirely.`,
        `When comparing Sortino across strategies, use the same MAR and the same return frequency. A daily Sortino cannot be directly compared to a monthly one without annualization. For DeFi yield strategies, set MAR to the stablecoin baseline yield so Sortino measures excess risk-adjusted performance above the safe alternative.`
      ],
    },
    es: { how: [`La calculadora Sortino perfecciona Sharpe penalizando solo la volatilidad a la baja. Introduce retornos y retorno mínimo aceptable (MAR). Un Sortino superior a 2.0 indica buena gestión del riesgo bajista.`, `Para cripto, Sortino es más útil que Sharpe porque los retornos tienen sesgo positivo.`], inputs: [`Los retornos deben ser periódicos. El MAR típicamente es 0% o la tasa libre de riesgo.`, `Usa el mismo MAR y frecuencia al comparar estrategias.`] },
    pt: { how: [`A calculadora Sortino refina o Sharpe penalizando apenas volatilidade negativa. Insira retornos e retorno mínimo aceitável (MAR). Sortino acima de 2.0 indica boa gestão de risco.`, `Para cripto, Sortino é mais útil que Sharpe pois retornos são enviesados positivamente.`], inputs: [`Retornos devem ser periódicos. O MAR tipicamente é 0% ou a taxa livre de risco.`, `Use o mesmo MAR e frequência ao comparar estratégias.`] },
    tr: { how: [`Sortino Hesaplayıcı, yalnızca aşağı yönlü volatiliteyi cezalandırarak Sharpe'ı geliştirir. Getirileri ve minimum kabul edilebilir getiriyi girin.`, `Kripto için Sortino, Sharpe'dan daha faydalıdır çünkü getiriler sağa çarpıktır.`], inputs: [`Getiriler periyodik olmalıdır. MAR tipik olarak %0 veya risksiz orandır.`, `Stratejileri karşılaştırırken aynı MAR ve frekansı kullanın.`] },
    hi: { how: [`सोर्टिनो कैलकुलेटर केवल नकारात्मक अस्थिरता को दंडित करके शार्प को परिष्कृत करता है। रिटर्न और न्यूनतम स्वीकार्य रिटर्न दर्ज करें।`, `क्रिप्टो के लिए सोर्टिनो अधिक उपयोगी है क्योंकि रिटर्न दाईं ओर तिरछे होते हैं।`], inputs: [`रिटर्न आवधिक होने चाहिए। MAR आमतौर पर 0% या जोखिम-मुक्त दर है।`, `रणनीतियों की तुलना करते समय समान MAR और आवृत्ति का उपयोग करें।`] },
    ru: { how: [`Калькулятор Сортино совершенствует Шарпа, наказывая только нисходящую волатильность. Введите доходности и минимально приемлемую доходность (MAR).`, `Для крипто Сортино полезнее Шарпа, поскольку доходности имеют правый перекос.`], inputs: [`Доходности должны быть периодическими. MAR обычно 0% или безрисковая ставка.`, `Используйте одинаковый MAR и частоту при сравнении стратегий.`] },
  },
  'calmar-calculator': {
    en: {
      how: [
        `The Calmar Ratio Calculator divides your annualized return by your maximum drawdown, producing a single number that captures how well your strategy compensates for its worst historical loss. A Calmar of 3.0 means your annual return was three times greater than your deepest peak-to-trough decline — strong for any asset class. In crypto, where 50-80% drawdowns are common, a Calmar above 1.0 is respectable and above 2.0 is exceptional.`,
        `This ratio is particularly valuable for evaluating systematic trading strategies and managed funds over 3+ year horizons. Unlike Sharpe and Sortino which measure average volatility, Calmar focuses on the single worst event — the maximum drawdown. This makes it a better gauge of tail risk and survivability, answering the question: can this strategy survive its own worst-case scenario and still produce meaningful returns?`
      ],
      inputs: [
        `Annualized return is your compounded annual growth rate over the measurement period. Maximum drawdown is the largest percentage decline from a portfolio peak to a subsequent trough. Both should cover the same time window — typically 3 years minimum for a reliable Calmar.`,
        `Short measurement windows produce misleadingly high Calmar ratios because the strategy may not yet have experienced its worst drawdown. In crypto, a strategy that has not lived through a -70% bear market has an untested Calmar. Always check whether your measurement period includes at least one significant market correction.`
      ],
    },
    es: { how: [`La calculadora Calmar divide el retorno anualizado entre el drawdown máximo. Un Calmar de 3.0 significa que tu retorno anual fue tres veces mayor que tu peor caída. En cripto, superior a 1.0 es respetable.`, `Este ratio es especialmente valioso para evaluar estrategias a más de 3 años, enfocándose en el peor evento histórico.`], inputs: [`El retorno anualizado es tu CAGR durante el período. El drawdown máximo es la mayor caída porcentual desde un pico.`, `Ventanas cortas producen Calmar engañosamente altos. Incluye al menos una corrección significativa.`] },
    pt: { how: [`A calculadora Calmar divide o retorno anualizado pela queda máxima. Calmar de 3.0 significa retorno anual três vezes maior que a pior queda. Em cripto, acima de 1.0 é respeitável.`, `Este índice é valioso para avaliar estratégias em horizontes de 3+ anos, focando no pior evento.`], inputs: [`Retorno anualizado é seu CAGR no período. Queda máxima é a maior queda percentual desde um pico.`, `Janelas curtas produzem Calmar enganosamente altos.`] },
    tr: { how: [`Calmar Hesaplayıcı, yıllık getiriyi maksimum düşüşe böler. Kripto'da 1.0 üstü saygın, 2.0 üstü istisnaidir.`, `Bu oran kuyruk riskini ve hayatta kalabilirliği değerlendirir.`], inputs: [`Yıllık getiri, dönemdeki CAGR'dir. Maksimum düşüş en büyük yüzde düşüştür.`, `Kısa pencereler yanıltıcı yüksek Calmar üretir.`] },
    hi: { how: [`कैलमार कैलकुलेटर वार्षिक रिटर्न को अधिकतम ड्रॉडाउन से विभाजित करता है। क्रिप्टो में 1.0 से ऊपर सम्मानजनक है।`, `यह अनुपात टेल रिस्क और सर्वाइवेबिलिटी का बेहतर गेज है।`], inputs: [`वार्षिक रिटर्न अवधि में आपका CAGR है। अधिकतम ड्रॉडाउन किसी शिखर से सबसे बड़ी गिरावट है।`, `छोटी विंडो भ्रामक रूप से उच्च कैलमार उत्पन्न करती हैं।`] },
    ru: { how: [`Калькулятор Кальмара делит годовую доходность на максимальную просадку. В крипто выше 1.0 — достойно, выше 2.0 — исключительно.`, `Этот коэффициент оценивает хвостовой риск и выживаемость.`], inputs: [`Годовая доходность — ваш CAGR за период. Максимальная просадка — наибольшее падение от пика.`, `Короткие окна дают обманчиво высокий Кальмар.`] },
  },
  'treynor-calculator': {
    en: {
      how: [
        `The Treynor Ratio Calculator measures excess return per unit of systematic (market) risk, using beta instead of total volatility. Enter your portfolio return, the risk-free rate, and your portfolio's beta relative to a benchmark (typically Bitcoin or a crypto index). The result shows how efficiently you are being compensated for market exposure specifically, ignoring idiosyncratic volatility that can be diversified away.`,
        `Treynor is most useful when comparing diversified portfolios or funds. If two crypto portfolios have the same return but different betas, the one with lower beta (less market exposure) has a higher Treynor, indicating it generated alpha rather than simply riding the market wave. For concentrated single-asset positions, Sharpe or Sortino are more appropriate since beta measures systematic risk only.`
      ],
      inputs: [
        `Portfolio return is the total return over the measurement period. Risk-free rate should match the same timeframe. Beta measures your portfolio's sensitivity to the benchmark — a beta of 1.5 means your portfolio moves 1.5x for every 1x move in the market.`,
        `For crypto, use BTC as the benchmark if your portfolio is altcoin-heavy, or use a broad crypto index (e.g., CoinDesk 20) for diversified portfolios. Beta can be estimated from historical correlation and relative volatility using at least 60 data points.`
      ],
    },
    es: { how: [`La calculadora Treynor mide el retorno excedente por unidad de riesgo sistemático usando beta. Ingresa retorno, tasa libre de riesgo y beta del portafolio.`, `Treynor es más útil al comparar portafolios diversificados. Si dos tienen el mismo retorno pero distinto beta, el de menor beta generó alfa.`], inputs: [`El retorno es el retorno total del período. Beta mide la sensibilidad al benchmark.`, `Para cripto, usa BTC como benchmark para portafolios de altcoins.`] },
    pt: { how: [`A calculadora Treynor mede retorno excedente por unidade de risco sistemático usando beta. Insira retorno, taxa livre de risco e beta.`, `Treynor é mais útil ao comparar portfólios diversificados.`], inputs: [`Retorno é o retorno total do período. Beta mede sensibilidade ao benchmark.`, `Para cripto, use BTC como benchmark para portfólios de altcoins.`] },
    tr: { how: [`Treynor Hesaplayıcı, beta kullanarak sistematik risk birimi başına fazla getiriyi ölçer.`, `Çeşitlendirilmiş portföyleri karşılaştırırken en faydalıdır.`], inputs: [`Getiri, dönemin toplam getirisidir. Beta, kıyaslamaya duyarlılığı ölçer.`, `Kripto için altcoin portföylerinde BTC'yi kıyaslama olarak kullanın.`] },
    hi: { how: [`ट्रेनर कैलकुलेटर बीटा का उपयोग करके प्रति व्यवस्थित जोखिम इकाई अतिरिक्त रिटर्न मापता है।`, `विविध पोर्टफोलियो की तुलना में सबसे उपयोगी है।`], inputs: [`रिटर्न अवधि का कुल रिटर्न है। बीटा बेंचमार्क के प्रति संवेदनशीलता मापता है।`, `क्रिप्टो में ऑल्टकॉइन पोर्टफोलियो के लिए BTC को बेंचमार्क के रूप में उपयोग करें।`] },
    ru: { how: [`Калькулятор Трейнора измеряет избыточную доходность на единицу систематического риска через бету.`, `Наиболее полезен при сравнении диверсифицированных портфелей.`], inputs: [`Доходность — общая доходность за период. Бета измеряет чувствительность к бенчмарку.`, `Для крипто используйте BTC как бенчмарк для альткоин-портфелей.`] },
  },
  'information-ratio-calculator': {
    en: {
      how: [
        `The Information Ratio Calculator measures how consistently a portfolio outperforms its benchmark per unit of tracking error. It divides active return (portfolio return minus benchmark return) by tracking error (the standard deviation of active returns). A high IR indicates the portfolio reliably beats the benchmark rather than winning through lucky concentrated bets.`,
        `In crypto, use BTC or ETH as benchmarks to assess whether your altcoin picks or active trading add value beyond simply holding the major asset. An IR above 0.5 is good; above 1.0 is exceptional and rare even among professional fund managers.`
      ],
      inputs: [
        `Portfolio return and benchmark return should cover identical periods. Tracking error is computed from the series of period-by-period differences between portfolio and benchmark returns.`,
        `Higher IR with lower tracking error means the outperformance is consistent. High IR with high tracking error means returns are lumpy — some periods brilliant, others terrible. Use at least 12 monthly data points for meaningful results.`
      ],
    },
    es: { how: [`La calculadora del Ratio de Información mide cuán consistentemente un portafolio supera su benchmark por unidad de tracking error. Un IR superior a 0.5 es bueno; superior a 1.0 es excepcional.`, `En cripto, usa BTC o ETH como benchmark para evaluar si tus picks generan valor.`], inputs: [`Retornos del portafolio y benchmark deben cubrir períodos idénticos.`, `IR alto con tracking error bajo significa outperformance consistente.`] },
    pt: { how: [`A calculadora mede quão consistentemente um portfólio supera seu benchmark por unidade de tracking error. IR acima de 0.5 é bom; acima de 1.0 é excepcional.`, `Em cripto, use BTC ou ETH como benchmark.`], inputs: [`Retornos devem cobrir períodos idênticos.`, `IR alto com tracking error baixo significa superação consistente.`] },
    tr: { how: [`Bilgi Oranı Hesaplayıcı, bir portföyün kıyaslamasını ne kadar tutarlı geçtiğini ölçer. 0.5 üstü iyi, 1.0 üstü istisnaidir.`, `Kripto'da BTC veya ETH'yi kıyaslama olarak kullanın.`], inputs: [`Getiriler aynı dönemleri kapsamalıdır.`, `Yüksek IR düşük izleme hatasıyla tutarlı performans demektir.`] },
    hi: { how: [`इनफॉर्मेशन रेशियो कैलकुलेटर मापता है कि पोर्टफोलियो अपने बेंचमार्क को कितनी लगातार पछाड़ता है। 0.5 से ऊपर अच्छा, 1.0 से ऊपर असाधारण।`, `क्रिप्टो में BTC या ETH को बेंचमार्क के रूप में उपयोग करें।`], inputs: [`रिटर्न समान अवधि कवर करने चाहिए।`, `कम ट्रैकिंग एरर के साथ उच्च IR लगातार आउटपरफॉर्मेंस दर्शाता है।`] },
    ru: { how: [`Калькулятор Information Ratio измеряет, насколько стабильно портфель превосходит бенчмарк. IR выше 0.5 — хорошо, выше 1.0 — исключительно.`, `В крипто используйте BTC или ETH как бенчмарк.`], inputs: [`Доходности должны покрывать одинаковые периоды.`, `Высокий IR с низким tracking error означает стабильную альфу.`] },
  },
  'kelly-calculator': {
    en: {
      how: [
        `The Kelly Criterion Calculator computes the mathematically optimal fraction of your capital to risk on each trade, given your win rate and average win-to-loss ratio. The Kelly formula — f = (bp - q) / b, where b is the win/loss ratio, p is win probability, and q is loss probability — maximizes long-term compound growth while avoiding ruin. For a 55% win rate with 2:1 reward-to-risk, Kelly recommends risking ~32.5% of capital per trade.`,
        `In practice, most traders use fractional Kelly (25-50% of the full Kelly fraction) because the formula assumes perfect knowledge of your edge — which you rarely have. Full Kelly is extremely aggressive and leads to massive drawdowns even with a genuine edge. Half-Kelly typically achieves 75% of the growth with dramatically less volatility. This calculator shows both full and fractional Kelly values for comparison.`
      ],
      inputs: [
        `Win rate is the percentage of trades that are profitable over a statistically significant sample — use at least 100 trades for reliability. Win/loss ratio (or payoff ratio) is your average winning trade size divided by your average losing trade size.`,
        `If your win rate is below 50%, you need a higher win/loss ratio to get a positive Kelly output. A negative Kelly means your strategy has negative expected value and should not be traded. The "bankroll" input represents your total trading capital, from which the calculator computes the dollar amount to risk per trade.`
      ],
    },
    es: { how: [`La calculadora Kelly calcula la fracción óptima de capital a arriesgar en cada operación, dada tu tasa de acierto y ratio de ganancia/pérdida. La fórmula maximiza el crecimiento compuesto a largo plazo.`, `La mayoría usa Kelly fraccional (25-50% del Kelly completo) porque el Kelly completo es extremadamente agresivo. Medio Kelly logra el 75% del crecimiento con mucha menos volatilidad.`], inputs: [`La tasa de acierto es el porcentaje de operaciones rentables — usa al menos 100 operaciones.`, `Un Kelly negativo significa que la estrategia tiene valor esperado negativo y no debe operarse.`] },
    pt: { how: [`A calculadora Kelly computa a fração ótima do capital para arriscar por operação, dado taxa de acerto e razão ganho/perda.`, `A maioria usa Kelly fracionário (25-50%). Kelly completo é extremamente agressivo.`], inputs: [`Taxa de acerto é a porcentagem de operações lucrativas — use pelo menos 100 operações.`, `Kelly negativo significa valor esperado negativo.`] },
    tr: { how: [`Kelly Hesaplayıcı, kazanma oranı ve kazanç/kayıp oranına göre her işlemde riske edilecek optimal sermaye oranını hesaplar.`, `Çoğu trader kesirli Kelly (tam Kelly'nin %25-50'si) kullanır.`], inputs: [`Kazanma oranı karlı işlemlerin yüzdesidir — en az 100 işlem kullanın.`, `Negatif Kelly, stratejinin negatif beklenen değere sahip olduğu anlamına gelir.`] },
    hi: { how: [`केली कैलकुलेटर जीत दर और जीत/हार अनुपात के आधार पर प्रत्येक ट्रेड में जोखिम उठाने के लिए इष्टतम पूंजी अंश की गणना करता है।`, `अधिकांश ट्रेडर आंशिक केली (25-50%) का उपयोग करते हैं।`], inputs: [`जीत दर लाभदायक ट्रेडों का प्रतिशत है — कम से कम 100 ट्रेड उपयोग करें।`, `नकारात्मक केली का मतलब रणनीति का नकारात्मक अपेक्षित मूल्य है।`] },
    ru: { how: [`Калькулятор Келли вычисляет оптимальную долю капитала для риска в каждой сделке на основе винрейта и соотношения прибыль/убыток.`, `Большинство используют дробный Келли (25-50% от полного).`], inputs: [`Винрейт — процент прибыльных сделок. Используйте минимум 100 сделок.`, `Отрицательный Келли означает, что стратегия имеет отрицательное математическое ожидание.`] },
  },
  'var-calculator': {
    en: {
      how: [
        `The Value at Risk (VaR) Calculator estimates the maximum expected loss over a specific time period at a given confidence level. For example, a 1-day 95% VaR of $5,000 means there is a 95% probability that your portfolio will not lose more than $5,000 in a single day. The remaining 5% of the time, losses could exceed this threshold — VaR does not tell you how bad things can get in that tail.`,
        `This calculator supports parametric (variance-covariance) VaR, which assumes returns are normally distributed. In crypto, returns are fat-tailed and often non-normal, so VaR tends to underestimate extreme loss scenarios. Use it as a floor estimate, not a ceiling, and complement it with the Drawdown Calculator and Risk of Ruin Calculator for a complete risk assessment.`
      ],
      inputs: [
        `Portfolio value is your total position size in USD. Expected return and volatility (standard deviation) should be based on historical data for the same asset over a representative period. The confidence level — typically 95% or 99% — determines how extreme the loss scenario you are modeling.`,
        `Holding period defines the time horizon: 1-day VaR for active traders, 10-day for swing traders, 30-day for position holders. Longer periods amplify VaR proportionally to the square root of time. For multi-asset portfolios, the calculator accounts for individual asset volatilities.`
      ],
    },
    es: { how: [`VaR estima la pérdida máxima esperada en un período específico a un nivel de confianza dado. Un VaR del 95% de $5,000 a 1 día significa 95% de probabilidad de no perder más de $5,000.`, `En cripto, los retornos tienen colas gruesas, por lo que VaR tiende a subestimar escenarios extremos. Úsalo como estimación mínima.`], inputs: [`El valor del portafolio es tu posición total en USD. Retorno esperado y volatilidad deben basarse en datos históricos.`, `El período define el horizonte: 1 día para traders activos, 30 días para holders.`] },
    pt: { how: [`VaR estima a perda máxima esperada em um período específico a um nível de confiança. VaR 95% de $5.000 em 1 dia = 95% de probabilidade de não perder mais que $5.000.`, `Em cripto, retornos têm caudas gordas. Use VaR como estimativa mínima.`], inputs: [`Valor do portfólio é sua posição total em USD. Retorno e volatilidade devem ser baseados em dados históricos.`, `O período define o horizonte: 1 dia para traders ativos, 30 dias para holders.`] },
    tr: { how: [`VaR, belirli bir güven düzeyinde belirli bir süre içindeki beklenen maksimum kaybı tahmin eder.`, `Kripto'da getiriler kalın kuyrukludur, bu yüzden VaR aşırı kayıp senaryolarını hafife alır.`], inputs: [`Portföy değeri USD cinsinden toplam pozisyonunuzdur.`, `Süre ufku tanımlar: aktif traderlar için 1 gün, holder'lar için 30 gün.`] },
    hi: { how: [`VaR किसी विशिष्ट समय अवधि में दिए गए विश्वास स्तर पर अधिकतम अपेक्षित हानि का अनुमान लगाता है।`, `क्रिप्टो में रिटर्न फैट-टेल्ड होते हैं, इसलिए VaR चरम हानि को कम आंकता है।`], inputs: [`पोर्टफोलियो मूल्य USD में आपकी कुल स्थिति है।`, `अवधि समय क्षितिज को परिभाषित करती है।`] },
    ru: { how: [`VaR оценивает максимальный ожидаемый убыток за определённый период при заданном уровне доверия.`, `В крипто доходности имеют толстые хвосты, поэтому VaR склонен занижать экстремальные сценарии.`], inputs: [`Стоимость портфеля — ваша общая позиция в USD.`, `Период определяет горизонт: 1 день для активных трейдеров, 30 дней для холдеров.`] },
  },
  'drawdown-calculator': {
    en: {
      how: [
        `The Drawdown Calculator measures peak-to-trough portfolio declines and the time required to recover. Enter your portfolio's equity curve (high watermark and current value, or a series of returns) and the calculator outputs maximum drawdown percentage, current drawdown from the peak, and estimated recovery time based on your average return rate.`,
        `Maximum drawdown is arguably the most important risk metric for long-term investors because it answers a visceral question: how much did I lose at the worst moment, and how long did it take to recover? A strategy with 100% annual returns but an 80% maximum drawdown may be theoretically profitable but psychologically and financially unsurvivable for most participants.`
      ],
      inputs: [
        `Portfolio peak value is the highest equity your account has reached. Current or trough value is the lowest point after that peak. The calculator computes drawdown as (peak - trough) / peak × 100%. Recovery return needed is calculated as trough / peak - 1 — note that a 50% loss requires a 100% gain to recover.`,
        `Average return rate is used to estimate recovery time. If your strategy averages 2% monthly, recovering from a 50% drawdown takes approximately 35 months. This asymmetry — losses require disproportionately larger gains to recover — is why drawdown management is more important than return maximization.`
      ],
    },
    es: { how: [`La calculadora mide caídas pico-a-valle del portafolio y el tiempo de recuperación. La máxima caída es posiblemente la métrica de riesgo más importante para inversores a largo plazo.`, `Una estrategia con 100% de retorno anual pero 80% de drawdown máximo puede ser insuperable psicológicamente.`], inputs: [`El valor pico es el patrimonio más alto alcanzado. El drawdown se calcula como (pico - valle) / pico × 100%.`, `Una pérdida del 50% requiere una ganancia del 100% para recuperarse. Esta asimetría es clave.`] },
    pt: { how: [`A calculadora mede quedas pico-a-vale e tempo de recuperação. A queda máxima é possivelmente a métrica de risco mais importante.`, `Uma estratégia com 100% de retorno anual mas 80% de drawdown pode ser insuperável psicologicamente.`], inputs: [`Valor de pico é o patrimônio mais alto atingido.`, `Uma perda de 50% exige ganho de 100% para recuperação.`] },
    tr: { how: [`Hesaplayıcı, tepe-dip portföy düşüşlerini ve toparlanma süresini ölçer. Maksimum düşüş en önemli risk metriğidir.`, `%100 yıllık getiri ama %80 düşüş psikolojik olarak aşılamaz olabilir.`], inputs: [`Zirve değer, hesabınızın ulaştığı en yüksek değerdir.`, `%50 kayıp, toparlanmak için %100 kazanç gerektirir.`] },
    hi: { how: [`कैलकुलेटर शिखर-से-गर्त पोर्टफोलियो गिरावट और रिकवरी समय मापता है।`, `100% वार्षिक रिटर्न लेकिन 80% ड्रॉडाउन मनोवैज्ञानिक रूप से असहनीय हो सकता है।`], inputs: [`शिखर मूल्य आपके खाते का उच्चतम इक्विटी है।`, `50% हानि से उबरने के लिए 100% लाभ आवश्यक है।`] },
    ru: { how: [`Калькулятор измеряет просадки от пика до дна и время восстановления. Максимальная просадка — важнейшая метрика риска.`, `Стратегия с 100% годовой доходностью, но 80% просадкой может быть непереносимой.`], inputs: [`Пиковая стоимость — максимальный капитал. Просадка = (пик - дно) / пик × 100%.`, `Потеря 50% требует 100% прибыли для восстановления.`] },
  },
  'risk-of-ruin-calculator': {
    en: {
      how: [
        `The Risk of Ruin Calculator computes the probability of losing your entire trading capital (or a defined percentage of it) given your win rate, average win/loss size, and risk per trade. This is the ultimate survivability metric: even a positive-expectancy strategy can go bust if individual trade risk is too high and an unlucky streak occurs.`,
        `For example, risking 10% per trade with a 55% win rate and 1.5:1 reward-to-risk has a surprisingly high ruin probability. Reducing risk to 2% per trade drops ruin probability to near zero while only moderately reducing long-term growth. This calculator makes the tradeoff between aggression and survival explicit and quantifiable.`
      ],
      inputs: [
        `Win rate and payoff ratio define your strategy's expected value. Risk per trade is the percentage of capital risked on each position. Ruin threshold is the drawdown percentage at which you consider yourself "ruined" — typically 50-100% of capital.`,
        `Starting capital and number of trades matter for simulation accuracy. With more trades, the law of large numbers works in your favor if expected value is positive, but short-term streaks can still cause ruin if risk per trade is excessive. The calculator runs a Monte Carlo simulation to estimate ruin probability across thousands of possible trade sequences.`
      ],
    },
    es: { how: [`Calcula la probabilidad de perder todo tu capital dado tu tasa de acierto, ratio ganancia/pérdida y riesgo por operación.`, `Arriesgar 10% por operación con 55% de acierto tiene una probabilidad de ruina sorprendentemente alta. Reducir a 2% la lleva casi a cero.`], inputs: [`Tasa de acierto y ratio de pago definen el valor esperado. Riesgo por operación es el porcentaje arriesgado en cada posición.`, `El umbral de ruina es el drawdown al que te consideras arruinado.`] },
    pt: { how: [`Calcula a probabilidade de perder todo o capital dado taxa de acerto, razão ganho/perda e risco por operação.`, `Arriscar 10% por operação com 55% de acerto tem probabilidade de ruína surpreendentemente alta.`], inputs: [`Taxa de acerto e razão de pagamento definem o valor esperado.`, `O limiar de ruína é o drawdown em que se considera arruinado.`] },
    tr: { how: [`Kazanma oranı, kazanç/kayıp oranı ve işlem başına riske göre tüm sermayeyi kaybetme olasılığını hesaplar.`, `İşlem başına %10 risk, %55 kazanma oranıyla şaşırtıcı derecede yüksek yıkım olasılığına sahiptir.`], inputs: [`Kazanma oranı ve ödeme oranı beklenen değeri tanımlar.`, `Yıkım eşiği, kendinizi yıkılmış saydığınız düşüş yüzdesidir.`] },
    hi: { how: [`आपकी जीत दर, जीत/हार अनुपात और प्रति ट्रेड जोखिम को देखते हुए पूरी पूंजी खोने की संभावना की गणना करता है।`, `55% जीत दर के साथ 10% जोखिम की विनाश संभावना आश्चर्यजनक रूप से उच्च है।`], inputs: [`जीत दर और भुगतान अनुपात अपेक्षित मूल्य को परिभाषित करते हैं।`, `विनाश सीमा वह ड्रॉडाउन है जिस पर आप बर्बाद मानते हैं।`] },
    ru: { how: [`Вычисляет вероятность потери всего капитала при данном винрейте, соотношении прибыль/убыток и риске на сделку.`, `Риск 10% на сделку при 55% винрейте имеет удивительно высокую вероятность разорения.`], inputs: [`Винрейт и коэффициент выплат определяют мат. ожидание.`, `Порог разорения — просадка, при которой вы считаете себя разорённым.`] },
  },
  'slippage-calculator': {
    en: {
      how: [
        `The DEX Slippage Calculator estimates the price impact of your trade based on pool liquidity depth, trade size, and fee tier. On automated market makers like Uniswap, every trade moves the price along a bonding curve — larger trades relative to pool liquidity cause greater slippage. A $10,000 swap in a $50M pool has negligible impact, but the same swap in a $500K pool can cost 2%+ in price impact alone.`,
        `This calculator helps you decide whether to split a large trade into smaller chunks, use a DEX aggregator, or wait for deeper liquidity. It also shows the difference between your slippage tolerance setting and actual expected slippage, preventing costly situations where your tolerance is set too wide and you pay more than necessary.`
      ],
      inputs: [
        `Trade size is the USD value of your swap. Pool liquidity is the total value locked in the trading pair's pool — check the DEX interface or DeFi Llama for current figures. Fee tier (0.01%, 0.05%, 0.3%, 1%) affects the minimum cost floor of the trade.`,
        `Slippage tolerance is the maximum acceptable price deviation from the quoted price. Setting it too low causes failed transactions during volatile periods; setting it too high exposes you to sandwich attacks. The calculator recommends an optimal tolerance based on your trade size and current pool conditions.`
      ],
    },
    es: { how: [`La calculadora estima el impacto de precio de tu operación basándose en la liquidez del pool, tamaño de la operación y tier de comisiones.`, `Te ayuda a decidir si dividir una operación grande en partes más pequeñas o usar un agregador DEX.`], inputs: [`El tamaño es el valor en USD del swap. La liquidez del pool es el TVL del par de trading.`, `La tolerancia de slippage es la desviación máxima aceptable del precio cotizado.`] },
    pt: { how: [`A calculadora estima o impacto de preço da sua operação com base na liquidez do pool, tamanho e taxa.`, `Ajuda a decidir se deve dividir uma operação grande ou usar agregador DEX.`], inputs: [`Tamanho é o valor em USD do swap. Liquidez é o TVL do par.`, `Tolerância de slippage é o desvio máximo aceitável do preço cotado.`] },
    tr: { how: [`Hesaplayıcı, havuz likiditesi, işlem boyutu ve ücret katmanına göre fiyat etkisini tahmin eder.`, `Büyük işlemi bölmeniz, DEX toplayıcı kullanmanız veya daha derin likidite beklemeniz gerekip gerekmediğine karar vermenize yardımcı olur.`], inputs: [`İşlem boyutu swap'ın USD değeridir. Havuz likiditesi çiftin TVL'sidir.`, `Kayma toleransı, kotasyon fiyatından kabul edilebilir maksimum sapmadır.`] },
    hi: { how: [`कैलकुलेटर पूल लिक्विडिटी, ट्रेड साइज और फीस टियर के आधार पर प्राइस इम्पैक्ट का अनुमान लगाता है।`, `बड़े ट्रेड को छोटे हिस्सों में बांटना है या DEX एग्रीगेटर उपयोग करना है, यह तय करने में मदद करता है।`], inputs: [`ट्रेड साइज स्वैप का USD मूल्य है। पूल लिक्विडिटी पेयर का TVL है।`, `स्लिपेज टॉलरेंस कोटेड प्राइस से अधिकतम स्वीकार्य विचलन है।`] },
    ru: { how: [`Калькулятор оценивает ценовое влияние вашей сделки на основе ликвидности пула, размера сделки и тарифа.`, `Помогает решить, разбивать ли крупную сделку или использовать DEX-агрегатор.`], inputs: [`Размер сделки — USD-стоимость свопа. Ликвидность пула — TVL пары.`, `Допуск проскальзывания — максимальное отклонение от котируемой цены.`] },
  },
  'trade-expectancy-calculator': {
    en: {
      how: [
        `The Trade Expectancy Calculator computes the expected dollar return per trade based on your historical win rate, average winning trade, and average losing trade. The formula — Expectancy = (Win Rate × Average Win) - (Loss Rate × Average Loss) — produces a single number that tells you whether your trading system is profitable on a per-trade basis and by how much.`,
        `A positive expectancy means every trade has a statistical edge; a negative one means you are guaranteed to lose money over a large enough sample. For example, a 40% win rate with $300 average wins and $100 average losses yields: (0.4 × 300) - (0.6 × 100) = $60 per trade. Despite losing more often than winning, the system is profitable because wins are 3x larger than losses.`
      ],
      inputs: [
        `Win rate is determined from at least 50-100 historical trades — smaller samples produce unreliable estimates. Average winning trade and average losing trade are computed separately from your trade journal.`,
        `The calculator also shows expectancy as a percentage of average trade size (expectancy ratio) and the annual projected profit given your trade frequency. Combine with the Kelly Criterion Calculator to determine optimal position sizing once your expectancy is established, and with the Risk of Ruin Calculator to verify your risk per trade keeps ruin probability acceptably low.`
      ],
    },
    es: { how: [`Calcula el retorno esperado en dólares por operación basándose en tu tasa de acierto y operación promedio ganadora/perdedora. La fórmula: (Tasa × Ganancia media) - (Tasa pérdida × Pérdida media).`, `Un 40% de acierto con $300 de ganancia y $100 de pérdida media produce $60 por operación a pesar de perder más de lo que ganas.`], inputs: [`La tasa se determina con al menos 50-100 operaciones históricas.`, `Combina con Kelly y Risk of Ruin para sizing y verificación de supervivencia.`] },
    pt: { how: [`Calcula o retorno esperado por operação com base na taxa de acerto e operação média vencedora/perdedora.`, `40% de acerto com $300 de ganho e $100 de perda médios produz $60 por operação.`], inputs: [`A taxa se determina com pelo menos 50-100 operações.`, `Combine com Kelly e Risk of Ruin para sizing e verificação de sobrevivência.`] },
    tr: { how: [`Kazanma oranı ve ortalama kazanç/kayıp işlemine dayalı olarak işlem başına beklenen dolar getirisini hesaplar.`, `%40 kazanma oranı $300 kazanç ve $100 kayıpla işlem başına $60 üretir.`], inputs: [`Oran en az 50-100 tarihsel işlemden belirlenir.`, `Sizing için Kelly ile ve hayatta kalma doğrulaması için Risk of Ruin ile birleştirin.`] },
    hi: { how: [`जीत दर और औसत जीत/हार ट्रेड के आधार पर प्रति ट्रेड अपेक्षित डॉलर रिटर्न की गणना करता है।`, `40% जीत दर, $300 औसत जीत और $100 औसत हार के साथ प्रति ट्रेड $60 उत्पन्न होता है।`], inputs: [`दर कम से कम 50-100 ऐतिहासिक ट्रेडों से निर्धारित होती है।`, `साइजिंग के लिए केली और सर्वाइवल के लिए रिस्क ऑफ रुइन के साथ जोड़ें।`] },
    ru: { how: [`Вычисляет ожидаемый долларовый доход на сделку на основе винрейта и средней прибыльной/убыточной сделки.`, `40% винрейт с $300 средним выигрышем и $100 средним проигрышем даёт $60 на сделку.`], inputs: [`Винрейт определяется минимум по 50-100 сделкам.`, `Комбинируйте с Келли для сайзинга и Risk of Ruin для проверки выживаемости.`] },
  },
};