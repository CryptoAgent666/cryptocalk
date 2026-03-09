import type { Lang } from './utils';
import type { SeoBodyContent } from './seo-body-text';

type ExtOverride = Pick<SeoBodyContent,
  'interpret' | 'scenarios' | 'checklist' | 'mistakes' |
  'benchmarks' | 'execution' | 'hygiene' | 'validation'
>;
type ExtContent = Partial<Record<Lang, ExtOverride>>;

export const calculatorSeoExt: Partial<Record<string, ExtContent>> = {
  'converter': {
    en: {
      interpret: [
      `The converter's primary output is the mid-market rate — compare it to your exchange's actual quote before trading. A gap over 0.5% signals stale data or high spread; refresh the page and recheck. Watch direction: if the converted amount looks unexpectedly large or small, verify the decimal placement and that both currency fields show your intended assets.`,
      `Use the converted value as a sanity check, not an execution price. For large orders, multiply the output by your expected slippage percentage (0.05–0.3% for liquid pairs, 0.5–2% for thin markets) to estimate the actual fill cost. For tokens priced below $0.01, small rounding differences can represent meaningful percentage errors — verify with a higher-precision source.`
      ],
      scenarios: [
      `Pre-trade sizing: convert your planned fiat budget to coin quantity before entering the exchange order form to avoid decimal errors under time pressure. Invoice payments: when billing a client in crypto, use the converter to lock in the fiat equivalent on the invoice date and document the rate for accounting records.`,
      `Portfolio valuation: run each holding through the converter to a common fiat base (USD or EUR) to see total current portfolio value without logging into every exchange. Tax reporting: convert the value of crypto received on a specific date to fiat to establish the cost basis required for tax filings.`
      ],
      checklist: [
      `Before using the converted value: 1) Confirm the price was fetched within the last 60 seconds. 2) Verify both currency fields show the correct asset — USDC and USDT look identical but are different tokens. 3) Check that the amount field decimal is correct — a misplaced decimal changes the result by 10× or 100×.`,
      `After conversion: add your exchange's spread to estimate actual fill price. For major pairs this is 0.05–0.2%; for altcoins 0.5–3%. Do not submit a trade order using the raw converter output as the expected price — treat it as a pre-trade estimate.`
      ],
      mistakes: [
      `The most frequent mistake is treating the mid-market rate as the execution price. All exchanges apply a spread — the gap between buy and sell — which means you pay slightly more buying and receive slightly less selling. For illiquid altcoins the spread can be 1–5%, making the converter output a significant underestimate of actual costs.`,
      `Another common error is converting at one price and executing minutes later after the market moved. In fast markets, even a 30-second delay can result in a materially different fill. Refresh the converter immediately before entering the order value into your exchange, especially during news events or when price moves exceed 1% in 5 minutes.`
      ],
      benchmarks: [
      `Compare the converter's CoinGecko rate to your exchange's mid-market rate for the same asset. For major pairs (BTC/USD, ETH/USD), the difference should be under 0.2%. If it exceeds 0.5%, CoinGecko data may be slightly delayed — acceptable for planning but not for precise execution pricing.`,
      `For fiat-to-crypto conversions, benchmark the output against your exchange's 'buy' price. Card purchase fees on exchanges typically run 1.5–3.5% above mid-market — seeing this premium quantified helps you decide whether to fund via bank transfer and trade (usually 0.1–0.3% cost) versus paying the card convenience fee.`
      ],
      execution: [
      `Standard pre-trade workflow: open converter → enter fiat budget → note coin quantity → switch to exchange → enter that quantity as order size → compare exchange quote to converter rate → proceed if within 0.2%, refresh if difference exceeds 0.5%. This 30-second step eliminates mis-sized orders and protects against decimal errors.`,
      `For recurring conversions (monthly DCA, recurring invoice payments), record each converted rate with a timestamp. Over time, this log serves dual purposes: it documents your cost basis for tax reporting and reveals whether your recurring purchases are timed effectively or consistently catching unfavorable intraday prices.`
      ],
      hygiene: [
      `CoinGecko prices refresh every 30–60 seconds. Reload the converter between each use during high-volatility sessions to avoid working with stale data. Bookmark the converter on your phone for quick access during time-sensitive situations.`,
      `For tax and accounting purposes, screenshot or export each conversion used for a transaction, capturing the date, time, pair, amounts, and mid-market rate. This audit trail supports cost basis documentation and fiat-equivalent calculations required in most tax jurisdictions.`
      ],
      validation: [
      `Final validation before using a conversion result: confirm the asset symbol matches your intended asset (e.g., BTC vs WBTC, USDC vs USDT). Verify the output via mental math — 0.1 ETH at $3,000/ETH should show $300, not $30 or $3,000. If the numbers don't match, re-enter the amount carefully.`,
      `After conversion, validate against a secondary source (your exchange's spot price or another tracker). If two sources agree within 0.2%, proceed confidently. If they differ by more than 1%, investigate before placing any order.`
      ],
    },
    es: {
      interpret: [
      `La salida principal del convertidor es la tasa de mercado medio — compárala con la cotización real de tu exchange antes de operar. Una diferencia superior al 0,5% indica datos obsoletos o spread alto; actualiza la página.`,
      `Usa el valor convertido como verificación previa, no como precio de ejecución. Para órdenes grandes, multiplica la salida por tu porcentaje de deslizamiento esperado para estimar el costo real de ejecución.`
      ],
      scenarios: [
      `Dimensionamiento pre-operación: convierte tu presupuesto fiat planificado antes de introducir la orden en el exchange. Pagos de facturas: usa el convertidor para fijar el equivalente fiat en la fecha de la factura.`,
      `Valoración de cartera: ejecuta cada tenencia a través del convertidor a una base fiat común. Declaración de impuestos: convierte el valor de cripto recibido en una fecha específica a fiat para establecer la base de costo.`
      ],
      checklist: [
      `Antes de usar el valor convertido: 1) Confirma que el precio se obtuvo en los últimos 60 segundos. 2) Verifica que ambos campos muestren el activo correcto. 3) Comprueba que el decimal sea correcto.`,
      `Después de la conversión: añade el spread de tu exchange para estimar el precio de ejecución real. Para pares principales esto es 0,05–0,2%; para altcoins 0,5–3%.`
      ],
      mistakes: [
      `El error más frecuente es tratar la tasa de mercado medio como precio de ejecución. Todos los exchanges aplican un spread que significa que pagas ligeramente más al comprar.`,
      `Otro error común es convertir a un precio y ejecutar minutos después cuando el mercado se ha movido. Actualiza el convertidor inmediatamente antes de introducir el valor de la orden en tu exchange.`
      ],
      benchmarks: [
      `Compara la tasa de CoinGecko del convertidor con la tasa de mercado medio de tu exchange para el mismo activo. Para pares principales la diferencia debería ser inferior al 0,2%.`,
      `Para conversiones fiat a cripto, compara la salida con el precio de compra de tu exchange.`
      ],
      execution: [
      `Flujo de trabajo pre-operación estándar: abre el convertidor → introduce el presupuesto fiat → anota la cantidad de monedas → cambia al exchange → introduce esa cantidad como tamaño de orden → compara cotización con tasa del convertidor.`,
      `Para conversiones recurrentes, registra cada tasa convertida con marca de tiempo para documentar la base de costo fiscal.`
      ],
      hygiene: [
      `Los precios de CoinGecko se actualizan cada 30–60 segundos. Recarga el convertidor entre cada uso durante sesiones de alta volatilidad.`,
      `Para fines fiscales, captura de pantalla o exporta cada conversión con fecha, hora, par, importes y tasa de mercado medio.`
      ],
      validation: [
      `Validación final: confirma que el símbolo del activo coincide con el activo previsto. Verifica la salida mediante cálculo mental.`,
      `Después de la conversión, valida contra una fuente secundaria. Si dos fuentes están de acuerdo en un 0,2%, procede con confianza.`
      ],
    },
    pt: {
      interpret: [
      `A saída principal do conversor é a taxa de mercado médio — compare-a com a cotação real da sua exchange. Uma diferença acima de 0,5% sinaliza dados obsoletos ou spread alto.`,
      `Use o valor convertido como verificação prévia, não como preço de execução. Para ordens grandes, multiplique a saída pela porcentagem de slippage esperada.`
      ],
      scenarios: [
      `Dimensionamento pré-negociação: converta seu orçamento fiat antes de inserir a ordem na exchange. Pagamentos de faturas: use o conversor para fixar o equivalente fiat na data da fatura.`,
      `Avaliação de portfólio: execute cada holding pelo conversor para uma base fiat comum. Declaração de impostos: converta o valor de cripto recebido para fiat para estabelecer a base de custo.`
      ],
      checklist: [
      `Antes de usar o valor convertido: 1) Confirme que o preço foi obtido nos últimos 60 segundos. 2) Verifique se ambos os campos mostram o ativo correto. 3) Verifique o decimal.`,
      `Após a conversão: adicione o spread da sua exchange para estimar o preço real de execução.`
      ],
      mistakes: [
      `O erro mais frequente é tratar a taxa de mercado médio como preço de execução. Todas as exchanges aplicam um spread.`,
      `Outro erro comum é converter a um preço e executar minutos depois quando o mercado se moveu.`
      ],
      benchmarks: [
      `Compare a taxa CoinGecko com a taxa de mercado médio da sua exchange para o mesmo ativo. Para pares principais a diferença deve ser inferior a 0,2%.`,
      `Para conversões fiat para cripto, compare a saída com o preço de compra da sua exchange.`
      ],
      execution: [
      `Fluxo de trabalho padrão: abra o conversor → insira o orçamento fiat → anote a quantidade de moedas → mude para a exchange → insira essa quantidade como tamanho da ordem.`,
      `Para conversões recorrentes, registre cada taxa com um timestamp para documentação fiscal.`
      ],
      hygiene: [
      `Os preços do CoinGecko são atualizados a cada 30–60 segundos. Recarregue o conversor entre cada uso durante alta volatilidade.`,
      `Para fins fiscais, capture ou exporte cada conversão com data, hora, par e taxa de mercado médio.`
      ],
      validation: [
      `Validação final: confirme que o símbolo do ativo corresponde ao ativo pretendido. Verifique via cálculo mental.`,
      `Após a conversão, valide em uma fonte secundária. Se concordam dentro de 0,2%, prossiga com confiança.`
      ],
    },
    tr: {
      interpret: [
      `Dönüştürücünün birincil çıktısı orta piyasa oranıdır — işlem yapmadan önce bunu exchange'inizin gerçek teklifleriyle karşılaştırın. 0,5%'ten fazla fark eski verilere işaret eder.`,
      `Dönüştürülen değeri yürütme fiyatı olarak değil ön kontrol olarak kullanın. Büyük emirler için çıktıyı beklenen kayma yüzdenizle çarpın.`
      ],
      scenarios: [
      `İşlem öncesi boyutlandırma: planlanan fiat bütçenizi exchange emir formuna girmeden önce coin miktarına dönüştürün. Fatura ödemeleri: kripto ile fatura keserken fatura tarihindeki fiat karşılığını kilitleyin.`,
      `Portföy değerleme: toplam güncel portföy değerini görmek için her varlığı ortak bir fiat tabanına dönüştürün.`
      ],
      checklist: [
      `Dönüştürülen değeri kullanmadan önce: 1) Fiyatın son 60 saniyede alındığını onaylayın. 2) Her iki para birimi alanının doğru varlığı gösterdiğini doğrulayın. 3) Ondalığın doğru olduğunu kontrol edin.`,
      `Dönüşümden sonra: gerçek yürütme fiyatını tahmin etmek için exchange spread'ini ekleyin.`
      ],
      mistakes: [
      `En sık yapılan hata orta piyasa oranını yürütme fiyatı olarak değerlendirmektir. Tüm exchange'ler bir spread uygular.`,
      `Bir diğer yaygın hata, bir fiyattan dönüştürüp piyasa hareket ettikten sonra işlem gerçekleştirmektir.`
      ],
      benchmarks: [
      `Dönüştürücünün CoinGecko oranını aynı varlık için exchange'inizin orta piyasa oranıyla karşılaştırın. Ana çiftler için fark %0,2'nin altında olmalıdır.`,
      `Fiat-kripto dönüşümler için çıktıyı exchange'inizin alış fiyatıyla karşılaştırın.`
      ],
      execution: [
      `Standart iş akışı: dönüştürücüyü açın → fiat bütçeyi girin → coin miktarını not edin → exchange'e geçin → o miktarı emir büyüklüğü olarak girin.`,
      `Tekrarlayan dönüşümler için her oranı zaman damgasıyla kaydedin.`
      ],
      hygiene: [
      `CoinGecko fiyatları her 30–60 saniyede bir yenilenir. Yüksek oynaklık dönemlerinde her kullanım arasında yenileyin.`,
      `Vergi amaçları için her dönüşümün ekran görüntüsünü alın veya dışa aktarın.`
      ],
      validation: [
      `Son doğrulama: varlık sembolünün amaçlanan varlıkla eşleştiğini onaylayın. Çıktıyı zihinsel hesaplamayla doğrulayın.`,
      `Dönüşümden sonra ikincil bir kaynakla doğrulayın. İki kaynak %0,2 içinde hemfikirse güvenle devam edin.`
      ],
    },
    hi: {
      interpret: [
      `कन्वर्टर का प्राथमिक आउटपुट मिड-मार्केट रेट है — ट्रेडिंग से पहले इसे अपने एक्सचेंज की वास्तविक कोट से तुलना करें। 0.5% से अधिक अंतर पुराने डेटा को दर्शाता है।`,
      `कन्वर्टेड वैल्यू को एक्जीक्यूशन प्राइस नहीं बल्कि प्री-चेक के रूप में उपयोग करें।`
      ],
      scenarios: [
      `प्री-ट्रेड साइजिंग: ऑर्डर फॉर्म में दर्ज करने से पहले फिएट बजट को कॉइन क्वांटिटी में कन्वर्ट करें। इनवॉइस पेमेंट: क्रिप्टो में बिलिंग करते समय फिएट इक्विवेलेंट लॉक करें।`,
      `पोर्टफोलियो वैल्यूएशन: कुल मूल्य देखने के लिए प्रत्येक होल्डिंग को साझा फिएट बेस पर कन्वर्ट करें।`
      ],
      checklist: [
      `कन्वर्टेड वैल्यू उपयोग करने से पहले: 1) पुष्टि करें कि प्राइस 60 सेकंड के भीतर फेच हुई थी। 2) दोनों करेंसी फील्ड सही एसेट दिखा रहे हैं। 3) दशमलव सही है।`,
      `कन्वर्जन के बाद: वास्तविक एक्जीक्यूशन प्राइस के लिए एक्सचेंज का स्प्रेड जोड़ें।`
      ],
      mistakes: [
      `सबसे सामान्य गलती मिड-मार्केट रेट को एक्जीक्यूशन प्राइस मानना है। सभी एक्सचेंज स्प्रेड लगाते हैं।`,
      `एक और सामान्य गलती एक कीमत पर कन्वर्ट करना और बाद में मार्केट मूव होने पर एक्जीक्यूट करना है।`
      ],
      benchmarks: [
      `उसी एसेट के लिए कन्वर्टर की CoinGecko रेट की तुलना एक्सचेंज की मिड-मार्केट रेट से करें। प्रमुख पेयर के लिए अंतर 0.2% से कम होना चाहिए।`,
      `फिएट-टू-क्रिप्टो कन्वर्जन के लिए आउटपुट की तुलना एक्सचेंज की बाय प्राइस से करें।`
      ],
      execution: [
      `स्टैंडर्ड वर्कफ्लो: कन्वर्टर खोलें → फिएट बजट दर्ज करें → कॉइन क्वांटिटी नोट करें → एक्सचेंज पर जाएं → वह क्वांटिटी ऑर्डर साइज के रूप में दर्ज करें।`,
      `आवर्ती कन्वर्जन के लिए प्रत्येक रेट को टाइमस्टैम्प के साथ रिकॉर्ड करें।`
      ],
      hygiene: [
      `हाई-वोलेटिलिटी के दौरान प्रत्येक उपयोग के बीच कन्वर्टर रीलोड करें।`,
      `टैक्स के लिए प्रत्येक कन्वर्जन का स्क्रीनशॉट लें।`
      ],
      validation: [
      `अंतिम सत्यापन: एसेट सिंबल सही है और दशमलव सही है यह कन्फर्म करें।`,
      `सेकेंडरी सोर्स से सत्यापित करें — अगर 0.2% के भीतर सहमत हैं तो आगे बढ़ें।`
      ],
    },
    ru: {
      interpret: [
      `Основной выход конвертера — среднерыночный курс. Сравните его с реальной котировкой биржи перед торговлей. Разница свыше 0,5% сигнализирует об устаревших данных или широком спреде — обновите страницу.`,
      `Используйте конвертированное значение как ориентир, а не как цену исполнения. Для крупных ордеров умножьте результат на ожидаемый процент проскальзывания для оценки реальной стоимости исполнения.`
      ],
      scenarios: [
      `Предторговый расчёт размера: переведите запланированный фиатный бюджет в количество монет до ввода ордера — это устранит ошибки десятичных знаков. Оплата счетов: зафиксируйте фиатный эквивалент на дату счёта для бухгалтерии.`,
      `Оценка портфеля: переведите каждую позицию в общую фиатную базу для просмотра совокупной стоимости без входа на каждую биржу. Налоговая отчётность: переводите стоимость полученных криптоактивов в фиат для определения базовой стоимости.`
      ],
      checklist: [
      `Перед использованием результата: 1) убедитесь, что цена загружена не более 60 секунд назад; 2) проверьте, что оба поля отображают нужные активы; 3) проверьте правильность десятичной точки.`,
      `После конвертации: прибавьте спред биржи для оценки реальной цены исполнения. Для основных пар — 0,05–0,2%; для альткоинов — 0,5–3%.`
      ],
      mistakes: [
      `Наиболее частая ошибка — принимать среднерыночный курс за цену исполнения. Все биржи применяют спред. Для малоликвидных альткоинов спред может составлять 1–5%.`,
      `Другая ошибка — конвертировать по одной цене, а исполнить сделку позже после движения рынка. Обновляйте конвертер непосредственно перед вводом суммы на бирже.`
      ],
      benchmarks: [
      `Сравните курс CoinGecko с среднерыночным курсом вашей биржи для того же актива. Для основных пар расхождение не должно превышать 0,2%.`,
      `Для конвертации фиата в криптовалюту сравните результат с ценой «купить» на бирже. Комиссии при покупке картой обычно на 1,5–3,5% выше среднерыночного курса.`
      ],
      execution: [
      `Стандартный процесс: открыть конвертер → ввести фиатный бюджет → записать количество монет → перейти на биржу → ввести это количество как размер ордера → сравнить котировку с курсом конвертера.`,
      `Для регулярных конвертаций фиксируйте каждый курс с временной меткой для документации базовой стоимости и налоговой отчётности.`
      ],
      hygiene: [
      `Цены CoinGecko обновляются каждые 30–60 секунд. Перезагружайте конвертер в периоды высокой волатильности. Добавьте его в закладки на телефоне.`,
      `Для налоговых целей сохраняйте скриншот каждой конвертации с датой, временем, парой, суммами и курсом.`
      ],
      validation: [
      `Финальная проверка: убедитесь, что символ актива соответствует нужному активу. Проверьте результат мысленным подсчётом.`,
      `После конвертации сверьтесь с дополнительным источником. При расхождении более 1% выясните причину перед размещением ордера.`
      ],
    },
  },
};