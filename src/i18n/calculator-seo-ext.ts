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

  'profit-calculator': {
    en: {
      interpret: [
      `Net profit or loss is shown after subtracting total buy cost (price × quantity + buy fees) from total sell proceeds (price × quantity − sell fees). A positive number means a realized gain; a negative number is a loss. The percentage return uses your total investment as the denominator, so a small position with a large gain can look impressive in percentage terms while contributing little in dollar impact.`,
      `Pay attention to the fee impact column — for small trades under $500, fees often consume 1–3% of the profit. If your fee percentage exceeds your price gain, the trade is net negative regardless of price movement. The ROI figure includes fees by default; check whether your broker or exchange charges additional withdrawal or conversion fees not captured here.`
      ],
      scenarios: [
      `Realized P&L tracking: after each trade close, enter the exact fill prices and fees from your exchange history to log your actual profit or loss per position. This creates a running tally you can filter by asset or date range for performance review.`,
      `Pre-trade breakeven: enter your intended buy price, quantity, and total fees to find the minimum sell price needed to break even. Use this before entering a position to set a realistic minimum exit target and avoid trades where the required gain exceeds the realistic price move.`
      ],
      checklist: [
      `Before calculating: 1) Use actual fill prices from your exchange, not the price shown at time of entry. 2) Include ALL fees: maker/taker fee on buy, same on sell, and any network/withdrawal fees. 3) For multi-leg entries (multiple buys at different prices), calculate average cost basis first.`,
      `After calculating: verify the fee total looks realistic (typically 0.1–0.6% per side on spot markets). If the profit percentage looks extreme (>100% in a short period), double-check you haven't confused quantity and price fields — a common data-entry error.`
      ],
      mistakes: [
      `The most common error is omitting fees or using round-number approximations. Even a 0.1% maker fee on both legs of a $10,000 trade is $20 in fees — real money that inflates your apparent profit if ignored. Always enter the exact fee rate shown in your exchange's trade history.`,
      `Confusing unrealized and realized profit: the calculator computes realized P&L for a closed trade. Applying it to an open position using the current price gives an estimate, not a locked-in result. Markets can reverse; only use realized figures for accounting and tax reporting.`
      ],
      benchmarks: [
      `For active traders, a healthy win rate is 50–60% with an average win-to-loss ratio of 1.5:1 or better, meaning average profitable trades earn 50% more than average losers. If your average profit per winning trade from this calculator is smaller than your average loss, review your exit strategy before increasing position size.`,
      `Compare your net percentage returns to a benchmark buy-and-hold position in BTC over the same period. If active trading produces lower net returns than simply holding BTC, transaction costs or poor timing are eroding your edge. Use this calculator to measure that cost over 20+ trades before concluding.`
      ],
      execution: [
      `Recommended workflow: export trade history CSV from your exchange → for each closed trade, enter buy price, sell price, quantity, and fee rates → record the net P&L in a spreadsheet → aggregate weekly or monthly to identify trending performance.`,
      `For tax purposes: run this calculator for every trade in the tax year. Group results by asset. Separate short-term (held under 1 year) and long-term gains. Net your gains against losses before applying your jurisdiction's capital gains rate.`
      ],
      hygiene: [
      `Keep fee rates current — exchanges periodically change fee tiers. If your 30-day trading volume crosses a tier threshold, your effective rate drops. Re-enter trades using the new rate if you are comparing monthly performance.`,
      `Archive your input data (entry price, exit price, quantity, fee rate, date) alongside the calculated result. If your exchange deletes trade history after 6–12 months, you lose the ability to recalculate — critical for multi-year tax reporting.`
      ],
      validation: [
      `Cross-check the calculator result against your exchange's own P&L display for the same trade. Differences under 0.5% are typically rounding. Differences over 1% suggest a fee input error — re-enter the fee as a percentage (e.g., 0.1 not 10 for a 0.1% fee).`,
      `For large trades, verify by manual calculation: (Sell price × Qty) − (Buy price × Qty) − (Buy fee) − (Sell fee) = Net profit. If your manual result matches within $0.01, the calculator input is correct.`
      ],
    },
    es: {
      interpret: [
      `El beneficio o pérdida neta se muestra después de restar el coste total de compra (precio × cantidad + comisiones de compra) de los ingresos de venta (precio × cantidad − comisiones de venta). Un número positivo indica una ganancia realizada; uno negativo, una pérdida. El porcentaje de retorno usa tu inversión total como denominador, así que una posición pequeña con gran ganancia puede parecer impresionante porcentualmente aunque su impacto en dólares sea menor.`,
      `Presta atención a la columna de impacto de comisiones — para operaciones pequeñas bajo $500, las comisiones suelen consumir el 1–3% del beneficio. Si tu porcentaje de comisión supera tu ganancia de precio, la operación es neta negativa independientemente del movimiento del precio. La cifra de ROI incluye comisiones por defecto; verifica si tu bróker cobra comisiones adicionales de retiro o conversión no capturadas aquí.`
      ],
      scenarios: [
      `Seguimiento de P&L realizado: después de cerrar cada operación, introduce los precios de ejecución exactos y comisiones del historial de tu exchange para registrar tu beneficio o pérdida real por posición. Esto crea un registro acumulativo que puedes filtrar por activo o rango de fechas para revisar el rendimiento.`,
      `Punto de equilibrio previo a la operación: introduce el precio de compra previsto, cantidad y comisiones totales para encontrar el precio mínimo de venta necesario para alcanzar el punto de equilibrio. Úsalo antes de entrar en una posición para establecer un objetivo de salida mínimo realista.`
      ],
      checklist: [
      `Antes de calcular: 1) Usa precios de ejecución reales de tu exchange, no el precio mostrado al momento de entrada. 2) Incluye TODAS las comisiones: comisión maker/taker en compra y venta, y cualquier tarifa de red o retiro. 3) Para entradas multi-tramo, calcula primero el coste base promedio.`,
      `Después de calcular: verifica que el total de comisiones sea realista (típicamente 0.1–0.6% por lado en mercados spot). Si el porcentaje de beneficio parece extremo, revisa que no hayas confundido los campos de cantidad y precio.`
      ],
      mistakes: [
      `El error más común es omitir comisiones o usar aproximaciones de números redondos. Incluso una comisión maker del 0.1% en ambos lados de una operación de $10,000 son $20 en comisiones — dinero real que infla tu beneficio aparente si se ignora.`,
      `Confundir beneficio no realizado y realizado: el calculador computa P&L realizado para una operación cerrada. Aplicarlo a una posición abierta usando el precio actual da una estimación, no un resultado bloqueado. Solo usa cifras realizadas para contabilidad e informes fiscales.`
      ],
      benchmarks: [
      `Para traders activos, una tasa de victorias saludable es del 50–60% con una relación promedio ganancia/pérdida de 1.5:1 o mejor. Si tu ganancia promedio por operación ganadora es menor que tu pérdida promedio, revisa tu estrategia de salida.`,
      `Compara tus retornos netos porcentuales con una posición de compra y mantenimiento de BTC durante el mismo período. Si el trading activo produce retornos netos más bajos, los costes de transacción o el mal timing están erosionando tu ventaja.`
      ],
      execution: [
      `Flujo de trabajo recomendado: exporta el CSV del historial de operaciones de tu exchange → para cada operación cerrada, introduce precio de compra, precio de venta, cantidad y tasas de comisión → registra el P&L neto en una hoja de cálculo → agrega semanal o mensualmente.`,
      `Para propósitos fiscales: ejecuta este calculador para cada operación del año fiscal. Agrupa resultados por activo. Separa ganancias a corto plazo (menos de 1 año) y largo plazo. Compensa ganancias con pérdidas antes de aplicar la tasa de ganancias de capital de tu jurisdicción.`
      ],
      hygiene: [
      `Mantén las tasas de comisión actualizadas — los exchanges cambian periódicamente los niveles de comisión. Si tu volumen de trading de 30 días cruza un umbral de nivel, tu tasa efectiva baja. Vuelve a introducir las operaciones con la nueva tasa si comparas rendimiento mensual.`,
      `Archiva tus datos de entrada (precio de entrada, precio de salida, cantidad, tasa de comisión, fecha) junto con el resultado calculado. Si tu exchange elimina el historial de operaciones después de 6–12 meses, pierdes la capacidad de recalcular.`
      ],
      validation: [
      `Verifica el resultado del calculador con la pantalla de P&L de tu propio exchange para la misma operación. Diferencias bajo el 0.5% son típicamente redondeo. Diferencias sobre el 1% sugieren un error de entrada de comisión.`,
      `Para operaciones grandes, verifica con cálculo manual: (Precio de venta × Cant.) − (Precio de compra × Cant.) − (Comisión de compra) − (Comisión de venta) = Beneficio neto.`
      ],
    },
    pt: {
      interpret: [
      `O lucro ou perda líquida é mostrado após subtrair o custo total de compra (preço × quantidade + taxas de compra) dos rendimentos de venda (preço × quantidade − taxas de venda). Um número positivo indica um ganho realizado; um negativo, uma perda. A porcentagem de retorno usa seu investimento total como denominador.`,
      `Preste atenção à coluna de impacto das taxas — para negociações pequenas abaixo de $500, as taxas frequentemente consomem 1–3% do lucro. Se o percentual da taxa superar o ganho de preço, a negociação é líquida negativa independentemente do movimento do preço. A cifra de ROI inclui taxas por padrão.`
      ],
      scenarios: [
      `Rastreamento de P&L realizado: após fechar cada negociação, insira os preços de execução exatos e taxas do histórico da sua exchange para registrar seu lucro ou perda real por posição. Isso cria um registro acumulativo filtrável por ativo ou intervalo de datas.`,
      `Ponto de equilíbrio pré-negociação: insira o preço de compra pretendido, quantidade e taxas totais para encontrar o preço mínimo de venda necessário para atingir o equilíbrio. Use isso antes de entrar em uma posição para definir um alvo de saída mínimo realista.`
      ],
      checklist: [
      `Antes de calcular: 1) Use preços de execução reais da sua exchange. 2) Inclua TODAS as taxas: taxa maker/taker na compra e venda, e quaisquer taxas de rede ou saque. 3) Para entradas de múltiplos lotes, calcule primeiro o custo médio.`,
      `Após calcular: verifique se o total de taxas parece realista (tipicamente 0.1–0.6% por lado em mercados spot). Se a porcentagem de lucro parecer extrema, verifique se não confundiu os campos de quantidade e preço.`
      ],
      mistakes: [
      `O erro mais comum é omitir taxas ou usar aproximações de números redondos. Mesmo uma taxa maker de 0.1% em ambos os lados de uma negociação de $10.000 são $20 em taxas — dinheiro real que infla seu lucro aparente se ignorado.`,
      `Confundir lucro não realizado e realizado: a calculadora computa P&L realizado para uma negociação fechada. Aplicá-la a uma posição aberta usando o preço atual dá uma estimativa, não um resultado garantido.`
      ],
      benchmarks: [
      `Para traders ativos, uma taxa de vitória saudável é de 50–60% com uma relação média ganho/perda de 1.5:1 ou melhor. Se seu lucro médio por negociação vencedora for menor que sua perda média, revise sua estratégia de saída.`,
      `Compare seus retornos percentuais líquidos com uma posição de compra e manutenção de BTC durante o mesmo período. Se o trading ativo produz retornos líquidos mais baixos, os custos de transação ou mau timing estão erodindo sua vantagem.`
      ],
      execution: [
      `Fluxo de trabalho recomendado: exporte o CSV do histórico de negociações da sua exchange → para cada negociação fechada, insira preço de compra, preço de venda, quantidade e taxas → registre o P&L líquido em uma planilha → agregue semanalmente ou mensalmente.`,
      `Para fins fiscais: execute esta calculadora para cada negociação do ano fiscal. Agrupe resultados por ativo. Separe ganhos de curto prazo (menos de 1 ano) e longo prazo. Compense ganhos com perdas antes de aplicar a alíquota de ganhos de capital da sua jurisdição.`
      ],
      hygiene: [
      `Mantenha as taxas atualizadas — as exchanges periodicamente alteram as faixas de comissão. Se seu volume de 30 dias cruzar um limite de faixa, sua taxa efetiva cai. Reinsira negociações com a nova taxa se comparar desempenho mensal.`,
      `Archive seus dados de entrada (preço de entrada, preço de saída, quantidade, taxa, data) junto com o resultado calculado. Se sua exchange excluir o histórico após 6–12 meses, você perde a capacidade de recalcular.`
      ],
      validation: [
      `Verifique o resultado da calculadora com a exibição de P&L da própria exchange para a mesma negociação. Diferenças abaixo de 0.5% são tipicamente arredondamento. Diferenças acima de 1% sugerem erro de entrada de taxa.`,
      `Para negociações grandes, verifique por cálculo manual: (Preço de venda × Qtd.) − (Preço de compra × Qtd.) − (Taxa de compra) − (Taxa de venda) = Lucro líquido.`
      ],
    },
    tr: {
      interpret: [
      `Net kâr veya zarar, toplam satın alma maliyeti (fiyat × miktar + alım komisyonları) toplam satış gelirine (fiyat × miktar − satış komisyonları) göre çıkarıldıktan sonra gösterilir. Pozitif bir sayı gerçekleşmiş bir kazancı; negatif bir sayı kayıp anlamına gelir. Yüzde getiri toplam yatırımınızı pay olarak kullanır.`,
      `Komisyon etkisi sütununa dikkat edin — 500 dolar altındaki küçük işlemlerde komisyonlar genellikle kârın %1–3'ünü tüketir. Komisyon yüzdeniz fiyat kazancınızı aşarsa, fiyat hareketine bakılmaksızın işlem net negatiftir. ROI rakamı varsayılan olarak komisyonları içerir.`
      ],
      scenarios: [
      `Gerçekleşmiş P&L takibi: her işlemi kapattıktan sonra, pozisyon başına gerçek kâr veya zararınızı kaydetmek için borsa geçmişinizden tam gerçekleşme fiyatlarını ve komisyonları girin.`,
      `İşlem öncesi başabaş noktası: planlanan alım fiyatınızı, miktarını ve toplam komisyonları girerek başabaş için gereken minimum satış fiyatını bulun. Bir pozisyona girmeden önce gerçekçi bir minimum çıkış hedefi belirlemek için bunu kullanın.`
      ],
      checklist: [
      `Hesaplamadan önce: 1) Borsa geçmişinizden gerçek gerçekleşme fiyatlarını kullanın. 2) TÜM komisyonları dahil edin: alım ve satımda maker/taker ücreti, ağ/çekim ücretleri. 3) Çoklu giriş için önce ortalama maliyet tabanını hesaplayın.`,
      `Hesapladıktan sonra: komisyon toplamının gerçekçi göründüğünü doğrulayın (genellikle spot piyasalarda taraf başına %0.1–0.6). Kâr yüzdesi aşırı görünüyorsa, miktar ve fiyat alanlarını karıştırmadığınızı kontrol edin.`
      ],
      mistakes: [
      `En yaygın hata komisyonları atlamak veya yuvarlak sayı yaklaşımları kullanmaktır. 10.000 dolarlık bir işlemin her iki tarafında %0.1 maker ücreti bile $20 komisyon eder — görmezden gelinirse görünür kârınızı şişirir.`,
      `Gerçekleşmemiş ve gerçekleşmiş kârı karıştırmak: hesaplayıcı kapalı bir işlem için gerçekleşmiş P&L hesaplar. Mevcut fiyatı kullanarak açık bir pozisyona uygulamak kilitli bir sonuç değil, tahmindir.`
      ],
      benchmarks: [
      `Aktif yatırımcılar için sağlıklı bir kazanma oranı, 1.5:1 veya daha iyi ortalama kazanma/kaybetme oranıyla %50–60'tır. Kazanan işlem başına ortalama kârınız ortalama kayıptan küçükse, çıkış stratejinizi gözden geçirin.`,
      `Net yüzde getirilerinizi aynı dönemde BTC buy-and-hold pozisyonuyla karşılaştırın. Aktif trading daha düşük net getiri üretiyorsa, işlem maliyetleri avantajınızı aşındırıyordur.`
      ],
      execution: [
      `Önerilen iş akışı: borsanızdan işlem geçmişi CSV'sini dışa aktarın → her kapalı işlem için alım fiyatı, satış fiyatı, miktar ve komisyon oranlarını girin → net P&L'yi bir tabloya kaydedin → haftalık veya aylık toplayın.`,
      `Vergi amaçları için: vergi yılındaki her işlem için bu hesaplayıcıyı çalıştırın. Sonuçları varlığa göre gruplandırın. Kısa vadeli (1 yıldan az) ve uzun vadeli kazançları ayırın.`
      ],
      hygiene: [
      `Komisyon oranlarını güncel tutun — borsalar periyodik olarak komisyon katmanlarını değiştirir. 30 günlük işlem hacminiz bir katman eşiğini aşarsa efektif oranınız düşer.`,
      `Giriş verilerinizi (giriş fiyatı, çıkış fiyatı, miktar, komisyon oranı, tarih) hesaplanan sonucun yanında arşivleyin. Borsa işlem geçmişini 6–12 ay sonra silerse yeniden hesaplama kapasitesini kaybedersiniz.`
      ],
      validation: [
      `Hesaplayıcı sonucunu aynı işlem için borsanızın kendi P&L ekranıyla çapraz kontrol edin. %0.5'in altındaki farklar genellikle yuvarlamadır. %1'in üzerindeki farklar bir komisyon giriş hatası olduğunu gösterir.`,
      `Büyük işlemler için manuel hesaplamayla doğrulayın: (Satış fiyatı × Mikt.) − (Alım fiyatı × Mikt.) − (Alım komisyonu) − (Satış komisyonu) = Net kâr.`
      ],
    },
    hi: {
      interpret: [
      `नेट लाभ या हानि कुल खरीद लागत (मूल्य × मात्रा + खरीद शुल्क) को कुल बिक्री आय (मूल्य × मात्रा − बिक्री शुल्क) से घटाने के बाद दिखाया जाता है। सकारात्मक संख्या का मतलब है वास्तविक लाभ; नकारात्मक का मतलब है हानि। प्रतिशत रिटर्न आपके कुल निवेश को हर के रूप में उपयोग करता है।`,
      `शुल्क प्रभाव कॉलम पर ध्यान दें — $500 से कम के छोटे ट्रेड के लिए, शुल्क अक्सर लाभ का 1–3% खा जाता है। यदि आपका शुल्क प्रतिशत आपके मूल्य लाभ से अधिक है, तो ट्रेड शुद्ध रूप से नकारात्मक है। ROI का आंकड़ा डिफ़ॉल्ट रूप से शुल्क शामिल करता है।`
      ],
      scenarios: [
      `वास्तविक P&L ट्रैकिंग: प्रत्येक ट्रेड बंद करने के बाद, प्रति पोजीशन आपके वास्तविक लाभ या हानि को रिकॉर्ड करने के लिए एक्सचेंज हिस्ट्री से सटीक भरण मूल्य और शुल्क दर्ज करें।`,
      `पूर्व-ट्रेड ब्रेकईवन: ब्रेकईवन के लिए न्यूनतम बिक्री मूल्य खोजने के लिए अपना इरादा खरीद मूल्य, मात्रा और कुल शुल्क दर्ज करें। एक पोजीशन में प्रवेश करने से पहले वास्तविक न्यूनतम निकास लक्ष्य निर्धारित करने के लिए इसका उपयोग करें।`
      ],
      checklist: [
      `गणना से पहले: 1) एक्सचेंज से वास्तविक भरण मूल्यों का उपयोग करें। 2) सभी शुल्क शामिल करें: खरीद और बिक्री पर मेकर/टेकर शुल्क, नेटवर्क/निकासी शुल्क। 3) बहु-लेग प्रविष्टियों के लिए पहले औसत लागत आधार की गणना करें।`,
      `गणना के बाद: सत्यापित करें कि शुल्क कुल यथार्थवादी लगता है (आमतौर पर स्पॉट बाजारों में प्रति साइड 0.1–0.6%)। यदि लाभ प्रतिशत अत्यधिक लगता है, तो जांचें कि आपने मात्रा और मूल्य फ़ील्ड को भ्रमित नहीं किया है।`
      ],
      mistakes: [
      `सबसे आम गलती शुल्क को छोड़ना या गोल संख्या के अनुमान का उपयोग करना है। $10,000 के ट्रेड के दोनों तरफ भी 0.1% मेकर शुल्क $20 है — यदि इसे अनदेखा किया जाए तो यह आपके लाभ को बढ़ा-चढ़ाकर दिखाता है।`,
      `अवास्तविक और वास्तविक लाभ को भ्रमित करना: कैलकुलेटर बंद ट्रेड के लिए वास्तविक P&L की गणना करता है। वर्तमान मूल्य का उपयोग करके खुली पोजीशन पर इसे लागू करना एक अनुमान देता है, लॉक किया हुआ परिणाम नहीं।`
      ],
      benchmarks: [
      `सक्रिय ट्रेडर्स के लिए, 1.5:1 या बेहतर के औसत जीत-हानि अनुपात के साथ स्वस्थ जीत दर 50–60% है। यदि आपका प्रति जीतने वाले ट्रेड का औसत लाभ आपकी औसत हानि से कम है, तो अपनी निकास रणनीति की समीक्षा करें।`,
      `अपने नेट प्रतिशत रिटर्न की तुलना उसी अवधि के दौरान BTC buy-and-hold पोजीशन से करें। यदि सक्रिय ट्रेडिंग कम नेट रिटर्न देती है, तो लेनदेन लागत आपका फायदा खा रही है।`
      ],
      execution: [
      `अनुशंसित वर्कफ़्लो: एक्सचेंज से ट्रेड हिस्ट्री CSV निर्यात करें → प्रत्येक बंद ट्रेड के लिए खरीद मूल्य, बिक्री मूल्य, मात्रा और शुल्क दर दर्ज करें → नेट P&L को स्प्रेडशीट में रिकॉर्ड करें → साप्ताहिक या मासिक रूप से एकत्र करें।`,
      `कर उद्देश्यों के लिए: कर वर्ष में प्रत्येक ट्रेड के लिए यह कैलकुलेटर चलाएं। संपत्ति के अनुसार परिणाम समूहित करें। अल्पकालिक (1 वर्ष से कम) और दीर्घकालिक लाभ अलग करें।`
      ],
      hygiene: [
      `शुल्क दरों को अद्यतन रखें — एक्सचेंज समय-समय पर शुल्क स्तर बदलते हैं। यदि आपका 30-दिन का ट्रेडिंग वॉल्यूम एक स्तर सीमा पार करता है, तो आपकी प्रभावी दर कम हो जाती है।`,
      `अपने इनपुट डेटा (प्रवेश मूल्य, निकास मूल्य, मात्रा, शुल्क दर, तिथि) को परिकलित परिणाम के साथ संग्रहित करें। यदि आपका एक्सचेंज 6–12 महीनों के बाद ट्रेड हिस्ट्री हटा देता है, तो आप पुनर्गणना की क्षमता खो देते हैं।`
      ],
      validation: [
      `उसी ट्रेड के लिए अपने एक्सचेंज के P&L डिस्प्ले के विरुद्ध कैलकुलेटर परिणाम को क्रॉस-चेक करें। 0.5% से कम के अंतर आमतौर पर राउंडिंग हैं। 1% से अधिक के अंतर शुल्क इनपुट त्रुटि का सुझाव देते हैं।`,
      `बड़े ट्रेड के लिए, मैन्युअल गणना द्वारा सत्यापित करें: (बिक्री मूल्य × मात्रा) − (खरीद मूल्य × मात्रा) − (खरीद शुल्क) − (बिक्री शुल्क) = नेट लाभ।`
      ],
    },
    ru: {
      interpret: [
      `Чистая прибыль или убыток отображается после вычитания общей стоимости покупки (цена × количество + комиссии покупки) из выручки от продажи (цена × количество − комиссии продажи). Положительное число означает реализованную прибыль; отрицательное — убыток. Процентная доходность использует ваши общие инвестиции в качестве знаменателя.`,
      `Обращайте внимание на столбец влияния комиссий — для небольших сделок до $500 комиссии часто съедают 1–3% прибыли. Если ваш процент комиссии превышает прирост цены, сделка является чисто убыточной вне зависимости от движения цены. Показатель ROI по умолчанию включает комиссии.`
      ],
      scenarios: [
      `Учёт реализованного P&L: после закрытия каждой сделки вводите точные цены исполнения и комиссии из истории биржи для записи фактической прибыли или убытка по каждой позиции. Это создаёт накопительный учёт, фильтруемый по активу или диапазону дат.`,
      `Точка безубыточности перед сделкой: введите планируемую цену покупки, количество и общие комиссии, чтобы найти минимальную цену продажи для выхода в ноль. Используйте это перед входом в позицию для установки реалистичной минимальной цели выхода.`
      ],
      checklist: [
      `Перед расчётом: 1) Используйте фактические цены исполнения с биржи. 2) Включайте ВСЕ комиссии: мейкер/тейкер при покупке и продаже, сетевые и комиссии за вывод. 3) Для многоногих входов сначала рассчитайте среднюю себестоимость.`,
      `После расчёта: убедитесь, что итог комиссий выглядит реалистично (обычно 0.1–0.6% на сторону на спотовых рынках). Если процент прибыли выглядит экстремальным, проверьте, не перепутали ли вы поля количества и цены.`
      ],
      mistakes: [
      `Наиболее распространённая ошибка — пропуск комиссий или использование приближённых круглых чисел. Даже комиссия мейкера 0.1% с обеих сторон сделки на $10 000 — это $20 — реальные деньги, которые завышают видимую прибыль, если их игнорировать.`,
      `Путаница нереализованной и реализованной прибыли: калькулятор вычисляет реализованный P&L для закрытой сделки. Применение его к открытой позиции по текущей цене даёт оценку, а не зафиксированный результат. Используйте реализованные цифры только для бухгалтерии и налоговой отчётности.`
      ],
      benchmarks: [
      `Для активных трейдеров здоровый коэффициент побед составляет 50–60% при среднем соотношении выигрыш/проигрыш 1.5:1 или лучше. Если ваша средняя прибыль на выигрышную сделку меньше средних потерь, пересмотрите стратегию выхода.`,
      `Сравните свои чистые процентные доходы с позицией «купить и держать» BTC за тот же период. Если активная торговля даёт более низкие чистые доходы, транзакционные издержки или плохой тайминг съедают ваше преимущество.`
      ],
      execution: [
      `Рекомендуемый рабочий процесс: экспортируйте CSV истории сделок с биржи → для каждой закрытой сделки введите цену покупки, цену продажи, количество и ставки комиссий → записывайте чистый P&L в таблицу → агрегируйте еженедельно или ежемесячно.`,
      `Для налоговых целей: запускайте этот калькулятор для каждой сделки в налоговом году. Группируйте результаты по активу. Разделяйте краткосрочный (менее 1 года) и долгосрочный доход. Компенсируйте прибыль убытками перед применением ставки налога на прирост капитала.`
      ],
      hygiene: [
      `Держите ставки комиссий актуальными — биржи периодически меняют уровни комиссий. Если ваш 30-дневный объём торгов пересекает пороговое значение уровня, ваша эффективная ставка снижается.`,
      `Архивируйте входные данные (цена входа, цена выхода, количество, ставка комиссии, дата) вместе с рассчитанным результатом. Если биржа удаляет историю сделок через 6–12 месяцев, вы теряете возможность пересчёта.`
      ],
      validation: [
      `Сверьте результат калькулятора с отображением P&L вашей биржи для той же сделки. Различия менее 0.5% обычно являются погрешностью округления. Различия более 1% указывают на ошибку ввода комиссии.`,
      `Для крупных сделок проверьте вручную: (Цена продажи × Кол-во) − (Цена покупки × Кол-во) − (Комиссия покупки) − (Комиссия продажи) = Чистая прибыль.`
      ],
    },
  },
  'mining-calculator': {
    en: {
      interpret: [
      `Daily revenue is calculated as: (your hashrate / network total hashrate) × block reward × blocks per day × coin price. This assumes you consistently hold the same share of network hashrate — in reality, difficulty adjusts every 2016 blocks (≈2 weeks for Bitcoin), so your share changes as miners join or leave. Treat the output as a rolling average estimate, not a fixed daily income.`,
      `Pay close attention to the profit figure after electricity costs. If net daily profit is negative, your operation loses money at the current coin price even before hardware depreciation. The hardware payback period (months to ROI) is the most critical long-run metric — if it exceeds 18 months, price volatility makes recovery uncertain.`
      ],
      scenarios: [
      `Pre-purchase evaluation: before buying mining hardware, enter the miner's hashrate and power draw, your electricity rate, and current coin price. Compare the payback period across multiple coins to identify the most profitable option at current difficulty.`,
      `Threshold price analysis: run the calculator in reverse — fix your costs and find the minimum coin price needed to break even on electricity alone. This is your "shutdown price" — if the coin falls below it, mining at a loss destroys more value than simply buying and holding.`
      ],
      checklist: [
      `Before running the calculation: 1) Confirm your electricity rate in kWh — check your bill for the correct tariff including time-of-use charges. 2) Use your miner's real-world hashrate from monitoring software, not the spec sheet, since hashrate degrades with heat. 3) Factor in pool fees (typically 1–2%) which reduce gross revenue.`,
      `After calculating: add hardware depreciation to your cost model. ASICs lose 50–80% of value in the first year; GPUs 30–50%. Divide hardware cost by expected lifespan (months) and add it as a daily cost to get true daily profit after hardware amortization.`
      ],
      mistakes: [
      `Using the coin's current price without scenario-testing lower prices is the most dangerous mistake. Mining revenue is fixed in coin terms but your electricity bill is fixed in fiat. A 50% price drop can turn a profitable operation into a major cash drain within weeks. Always model at 50% and 30% of current price.`,
      `Ignoring difficulty increases: as more miners join a network after a price rise, difficulty increases and your effective hashrate share falls. For a rapidly growing network, conservatively add 5–15% monthly difficulty growth to your projection and recalculate expected revenue over 6 months.`
      ],
      benchmarks: [
      `A healthy mining operation achieves electricity cost below 60% of gross revenue, leaving 40%+ margin for hardware, overhead, and profit. If electricity alone consumes more than 80% of revenue, the operation is fragile and a 20% price drop will make it unprofitable.`,
      `Compare your cost per coin mined (total daily costs / coins mined per day) against the current spot price and the network's average mining cost (often published by on-chain analysts). If you're above the network average, your operation is below-average efficiency.`
      ],
      execution: [
      `Step-by-step process: 1) Get your miner's exact power draw with a kill-a-watt meter (not the spec). 2) Pull your current electricity rate from your latest bill. 3) Find the current network difficulty and block reward from a block explorer. 4) Enter all values. 5) Compare daily profit to a buy-the-coin alternative with the same budget.`,
      `Automate tracking: update the calculator weekly with fresh difficulty and price data. Plot daily profit over time to identify when the operation crosses into unprofitability before it becomes a cash problem.`
      ],
      hygiene: [
      `Recalculate after every network difficulty adjustment (every ~2 weeks for Bitcoin). A 10% difficulty increase reduces your daily coin output by ~10%. Staying current prevents false confidence in outdated profitability figures.`,
      `Keep records of your actual electricity bills and coin output from your pool dashboard. Compare monthly actuals to calculator estimates — consistent discrepancies reveal an error in your input assumptions worth correcting.`
      ],
      validation: [
      `Cross-check estimated daily coin output against your mining pool's reported shares and earnings for the same period. If your pool earnings are 10%+ below the calculator estimate, check for rejected shares, pool fees, or orphaned blocks reducing your effective output.`,
      `Validate electricity cost by comparing the calculated monthly cost (daily kWh × 30 × rate) against your actual electricity bill. A match within 5% confirms your power draw estimate is accurate.`
      ],
    },
    es: {
      interpret: [
      `Los ingresos diarios se calculan como: (tu hashrate / hashrate total de la red) × recompensa de bloque × bloques por día × precio de la moneda. Esto asume que mantienes consistentemente la misma participación del hashrate de la red. La dificultad se ajusta cada 2016 bloques (≈2 semanas para Bitcoin), por lo que tu participación cambia con el tiempo.`,
      `Presta especial atención a la cifra de beneficio después de los costes de electricidad. Si el beneficio diario neto es negativo, tu operación pierde dinero al precio actual de la moneda incluso antes de la depreciación del hardware. El período de recuperación del hardware es la métrica más crítica a largo plazo.`
      ],
      scenarios: [
      `Evaluación previa a la compra: antes de comprar hardware de minería, introduce el hashrate y consumo de energía del minero, tu tarifa eléctrica y el precio actual de la moneda. Compara el período de recuperación entre varias monedas para identificar la opción más rentable.`,
      `Análisis de precio umbral: ejecuta el calculador en reversa — fija tus costes y encuentra el precio mínimo de la moneda necesario para cubrir gastos solo de electricidad. Este es tu "precio de cierre" — si la moneda cae por debajo, minar a pérdidas destruye más valor que simplemente comprar y mantener.`
      ],
      checklist: [
      `Antes de ejecutar el cálculo: 1) Confirma tu tarifa eléctrica en kWh desde tu factura. 2) Usa el hashrate real de tu minero desde el software de monitoreo, no la ficha técnica. 3) Factoriza las comisiones del pool (típicamente 1–2%) que reducen los ingresos brutos.`,
      `Después de calcular: añade la depreciación del hardware a tu modelo de costes. Los ASICs pierden el 50–80% de su valor en el primer año; las GPUs el 30–50%. Divide el coste del hardware por la vida útil esperada y añádelo como coste diario.`
      ],
      mistakes: [
      `Usar el precio actual de la moneda sin probar escenarios de precios más bajos es el error más peligroso. Los ingresos de minería están fijos en términos de moneda pero tu factura eléctrica está fija en fiat. Siempre modela al 50% y 30% del precio actual.`,
      `Ignorar los aumentos de dificultad: a medida que más mineros se unen a una red tras una subida de precio, la dificultad aumenta y tu participación efectiva de hashrate cae. Añade conservadoramente un crecimiento de dificultad mensual del 5–15% a tu proyección.`
      ],
      benchmarks: [
      `Una operación de minería saludable logra un coste de electricidad por debajo del 60% de los ingresos brutos, dejando un margen del 40%+ para hardware, gastos generales y beneficio. Si la electricidad sola consume más del 80% de los ingresos, la operación es frágil.`,
      `Compara tu coste por moneda minada (costes diarios totales / monedas minadas por día) con el precio spot actual y el coste promedio de minería de la red. Si estás por encima del promedio de la red, tu operación tiene eficiencia por debajo del promedio.`
      ],
      execution: [
      `Proceso paso a paso: 1) Obtén el consumo exacto de tu minero con un medidor de energía. 2) Saca tu tarifa eléctrica actual de tu última factura. 3) Encuentra la dificultad de red actual y la recompensa de bloque en un explorador de bloques. 4) Ingresa todos los valores. 5) Compara el beneficio diario con la alternativa de comprar la moneda.`,
      `Automatiza el seguimiento: actualiza el calculador semanalmente con datos frescos de dificultad y precio. Traza el beneficio diario en el tiempo para identificar cuándo la operación cruza hacia la no rentabilidad.`
      ],
      hygiene: [
      `Recalcula después de cada ajuste de dificultad de red (cada ≈2 semanas para Bitcoin). Un aumento de dificultad del 10% reduce tu producción diaria de monedas en ≈10%. Mantenerse al día previene falsa confianza en cifras de rentabilidad desactualizadas.`,
      `Mantén registros de tus facturas eléctricas reales y la producción de monedas de tu panel de pool. Compara los datos mensuales reales con las estimaciones del calculador — las discrepancias consistentes revelan un error en tus suposiciones de entrada.`
      ],
      validation: [
      `Verifica la producción diaria estimada de monedas con las shares e ingresos reportados de tu pool de minería para el mismo período. Si los ingresos de tu pool están un 10%+ por debajo de la estimación del calculador, verifica shares rechazadas, comisiones del pool u bloques huérfanos.`,
      `Valida el coste de electricidad comparando el coste mensual calculado (kWh diarios × 30 × tarifa) con tu factura eléctrica real. Una coincidencia dentro del 5% confirma que tu estimación de consumo es precisa.`
      ],
    },
    pt: {
      interpret: [
      `A receita diária é calculada como: (seu hashrate / hashrate total da rede) × recompensa de bloco × blocos por dia × preço da moeda. Isso assume que você mantém consistentemente a mesma participação do hashrate da rede. A dificuldade se ajusta a cada 2016 blocos (≈2 semanas para Bitcoin).`,
      `Preste atenção especial à cifra de lucro após os custos de eletricidade. Se o lucro líquido diário for negativo, sua operação perde dinheiro ao preço atual da moeda, mesmo antes da depreciação do hardware. O período de payback do hardware é a métrica mais crítica no longo prazo.`
      ],
      scenarios: [
      `Avaliação pré-compra: antes de comprar hardware de mineração, insira o hashrate e o consumo de energia do minerador, sua tarifa de eletricidade e o preço atual da moeda. Compare o período de payback entre várias moedas para identificar a opção mais lucrativa.`,
      `Análise de preço limite: execute a calculadora ao contrário — fixe seus custos e encontre o preço mínimo da moeda necessário para cobrir apenas os custos de eletricidade. Este é seu "preço de encerramento".`
      ],
      checklist: [
      `Antes de calcular: 1) Confirme sua tarifa de eletricidade em kWh a partir de sua conta. 2) Use o hashrate real do seu minerador a partir de software de monitoramento. 3) Inclua as taxas do pool (tipicamente 1–2%) que reduzem a receita bruta.`,
      `Após calcular: adicione a depreciação do hardware ao seu modelo de custos. ASICs perdem 50–80% do valor no primeiro ano; GPUs 30–50%. Divida o custo do hardware pela vida útil esperada e adicione como custo diário.`
      ],
      mistakes: [
      `Usar o preço atual da moeda sem testar cenários de preços mais baixos é o erro mais perigoso. A receita de mineração é fixada em termos de moeda, mas sua conta de eletricidade é fixada em fiat. Sempre modele a 50% e 30% do preço atual.`,
      `Ignorar aumentos de dificuldade: à medida que mais mineradores entram na rede após uma alta de preço, a dificuldade aumenta e sua participação efetiva de hashrate cai. Adicione conservadoramente um crescimento mensal de dificuldade de 5–15% à sua projeção.`
      ],
      benchmarks: [
      `Uma operação de mineração saudável atinge custo de eletricidade abaixo de 60% da receita bruta, deixando 40%+ de margem para hardware, despesas gerais e lucro.`,
      `Compare seu custo por moeda minerada (custos diários totais / moedas mineradas por dia) com o preço spot atual e o custo médio de mineração da rede.`
      ],
      execution: [
      `Processo passo a passo: 1) Obtenha o consumo exato do seu minerador com um medidor de energia. 2) Retire sua tarifa de eletricidade atual de sua última conta. 3) Encontre a dificuldade atual da rede e a recompensa de bloco em um explorador de blocos. 4) Insira todos os valores.`,
      `Automatize o rastreamento: atualize a calculadora semanalmente com dados frescos de dificuldade e preço. Trace o lucro diário ao longo do tempo para identificar quando a operação cruza para a não lucratividade.`
      ],
      hygiene: [
      `Recalcule após cada ajuste de dificuldade da rede (a cada ≈2 semanas para Bitcoin). Um aumento de 10% na dificuldade reduz sua produção diária de moedas em ≈10%.`,
      `Mantenha registros de suas contas de eletricidade reais e produção de moedas do painel do pool. Compare os dados mensais reais com as estimativas da calculadora.`
      ],
      validation: [
      `Verifique a produção diária estimada de moedas com as shares e ganhos reportados do seu pool de mineração para o mesmo período.`,
      `Valide o custo de eletricidade comparando o custo mensal calculado (kWh diários × 30 × tarifa) com sua conta de eletricidade real.`
      ],
    },
    tr: {
      interpret: [
      `Günlük gelir şu şekilde hesaplanır: (hashrate'iniz / ağ toplam hashrate'i) × blok ödülü × günlük blok sayısı × coin fiyatı. Bu, ağ hashrate'inden tutarlı olarak aynı payı koruduğunuzu varsayar. Zorluk her 2016 blokta (Bitcoin için ≈2 haftada bir) ayarlanır.`,
      `Elektrik maliyetleri sonrasındaki kâr rakamına özellikle dikkat edin. Günlük net kâr negatifse, operasyonunuz mevcut coin fiyatında donanım amortismanından önce bile para kaybediyor demektir. Donanım geri ödeme süresi en kritik uzun vadeli metriktir.`
      ],
      scenarios: [
      `Satın alma öncesi değerlendirme: madenci donanımı satın almadan önce madencinin hashrate ve güç tüketimini, elektrik tarifinizi ve mevcut coin fiyatını girin. En karlı seçeneği belirlemek için birden fazla coin arasında geri ödeme süresini karşılaştırın.`,
      `Eşik fiyat analizi: hesaplayıcıyı ters çalıştırın — maliyetlerinizi sabitleyin ve yalnızca elektriği karşılamak için gereken minimum coin fiyatını bulun. Bu "kapatma fiyatınızdır".`
      ],
      checklist: [
      `Hesaplamadan önce: 1) kWh cinsinden elektrik tarifinizi faturanızdan onaylayın. 2) Madencinin gerçek dünya hashrate'ini teknik özellikler sayfasından değil, izleme yazılımından kullanın. 3) Brüt geliri azaltan havuz ücretlerini (genellikle %1–2) hesaba katın.`,
      `Hesapladıktan sonra: maliyet modelinize donanım amortismanı ekleyin. ASIC'ler ilk yılda değerlerinin %50–80'ini kaybeder; GPU'lar %30–50. Donanım maliyetini beklenen kullanım ömrüne bölün ve günlük maliyet olarak ekleyin.`
      ],
      mistakes: [
      `Daha düşük fiyat senaryolarını test etmeden coin'in mevcut fiyatını kullanmak en tehlikeli hatadır. Madencilik geliri coin cinsinden sabitdir ancak elektrik faturanız fiat cinsinden sabittir. Her zaman mevcut fiyatın %50 ve %30'unda modelleme yapın.`,
      `Zorluk artışlarını görmezden gelmek: fiyat yükselişinin ardından ağa daha fazla madenci katıldıkça zorluk artar ve efektif hashrate payınız düşer. Projecksiyonunuza muhafazakâr olarak aylık %5–15 zorluk büyümesi ekleyin.`
      ],
      benchmarks: [
      `Sağlıklı bir madencilik operasyonu, %40'tan fazla donanım, genel gider ve kâr için marj bırakarak brüt gelirin %60'ının altında elektrik maliyeti elde eder.`,
      `Çıkarılan coin başına maliyetinizi (toplam günlük maliyetler / günlük çıkarılan coin) mevcut spot fiyat ve ağın ortalama madencilik maliyetiyle karşılaştırın.`
      ],
      execution: [
      `Adım adım süreç: 1) Bir güç ölçer ile madenciğinizin tam güç tüketimini alın. 2) Son faturanızdan mevcut elektrik tarifinizi çekin. 3) Bir blok gezgininden mevcut ağ zorluğunu ve blok ödülünü bulun. 4) Tüm değerleri girin.`,
      `Takibi otomatikleştirin: hesaplayıcıyı haftalık olarak yeni zorluk ve fiyat verileriyle güncelleyin. Operasyonun kârsızlığa ne zaman geçtiğini belirlemek için günlük kârı zamanla çizin.`
      ],
      hygiene: [
      `Her ağ zorluk ayarlamasından sonra (Bitcoin için her ≈2 haftada bir) yeniden hesaplayın. %10'luk bir zorluk artışı günlük coin çıktınızı ≈%10 azaltır.`,
      `Gerçek elektrik faturalarınızın ve havuz panonuzdan coin çıktısının kayıtlarını tutun. Aylık gerçek verileri hesaplayıcı tahminleriyle karşılaştırın.`
      ],
      validation: [
      `Aynı dönem için tahmini günlük coin çıktısını madencilik havuzunuzun bildirilen shares ve kazançlarıyla çapraz kontrol edin.`,
      `Hesaplanan aylık maliyeti (günlük kWh × 30 × tarife) gerçek elektrik faturanızla karşılaştırarak elektrik maliyetini doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `दैनिक राजस्व की गणना इस प्रकार की जाती है: (आपका हैशरेट / नेटवर्क कुल हैशरेट) × ब्लॉक रिवार्ड × प्रति दिन ब्लॉक × कॉइन मूल्य। यह मानता है कि आप लगातार नेटवर्क हैशरेट का समान हिस्सा बनाए रखते हैं। कठिनाई हर 2016 ब्लॉक पर समायोजित होती है।`,
      `बिजली लागत के बाद लाभ आंकड़े पर विशेष ध्यान दें। यदि शुद्ध दैनिक लाभ नकारात्मक है, तो आपका ऑपरेशन हार्डवेयर मूल्यह्रास से पहले भी वर्तमान कॉइन मूल्य पर पैसा खो रहा है। हार्डवेयर पेबैक अवधि सबसे महत्वपूर्ण दीर्घकालिक मेट्रिक है।`
      ],
      scenarios: [
      `खरीद-पूर्व मूल्यांकन: माइनिंग हार्डवेयर खरीदने से पहले, माइनर का हैशरेट और पावर ड्रॉ, आपकी बिजली दर और वर्तमान कॉइन मूल्य दर्ज करें। सबसे लाभदायक विकल्प की पहचान करने के लिए कई कॉइनों में पेबैक अवधि की तुलना करें।`,
      `थ्रेशोल्ड मूल्य विश्लेषण: कैलकुलेटर को उलटा चलाएं — अपनी लागतें ठीक करें और केवल बिजली के लिए ब्रेकईवन के लिए आवश्यक न्यूनतम कॉइन मूल्य खोजें। यह आपका "शटडाउन मूल्य" है।`
      ],
      checklist: [
      `गणना चलाने से पहले: 1) kWh में अपनी बिजली दर अपने बिल से पुष्टि करें। 2) स्पेक शीट से नहीं, मॉनिटरिंग सॉफ़्टवेयर से अपने माइनर का वास्तविक हैशरेट उपयोग करें। 3) पूल शुल्क (आमतौर पर 1–2%) शामिल करें जो सकल राजस्व कम करता है।`,
      `गणना के बाद: अपने लागत मॉडल में हार्डवेयर मूल्यह्रास जोड़ें। ASICs पहले वर्ष में 50–80% मूल्य खो देते हैं; GPUs 30–50%।`
      ],
      mistakes: [
      `कम कीमत परिदृश्यों का परीक्षण किए बिना कॉइन की वर्तमान कीमत का उपयोग करना सबसे खतरनाक गलती है। माइनिंग राजस्व कॉइन संदर्भ में तय है लेकिन आपका बिजली बिल फिएट में तय है। हमेशा वर्तमान मूल्य के 50% और 30% पर मॉडल करें।`,
      `कठिनाई वृद्धि को नजरअंदाज करना: जैसे-जैसे कीमत बढ़ने के बाद अधिक माइनर नेटवर्क में शामिल होते हैं, कठिनाई बढ़ती है और आपका प्रभावी हैशरेट हिस्सा कम होता है।`
      ],
      benchmarks: [
      `एक स्वस्थ माइनिंग ऑपरेशन सकल राजस्व के 60% से नीचे बिजली लागत प्राप्त करता है, हार्डवेयर, ओवरहेड और लाभ के लिए 40%+ मार्जिन छोड़ता है।`,
      `आपकी प्रति कॉइन खनन लागत (कुल दैनिक लागत / प्रति दिन खनन किए गए कॉइन) की तुलना वर्तमान स्पॉट मूल्य और नेटवर्क की औसत खनन लागत से करें।`
      ],
      execution: [
      `चरण-दर-चरण प्रक्रिया: 1) किल-ए-वाट मीटर से अपने माइनर का सटीक पावर ड्रॉ प्राप्त करें। 2) अपनी नवीनतम बिल से वर्तमान बिजली दर निकालें। 3) ब्लॉक एक्सप्लोरर से वर्तमान नेटवर्क कठिनाई और ब्लॉक रिवार्ड खोजें।`,
      `ट्रैकिंग स्वचालित करें: ताजा कठिनाई और मूल्य डेटा के साथ साप्ताहिक रूप से कैलकुलेटर अपडेट करें।`
      ],
      hygiene: [
      `प्रत्येक नेटवर्क कठिनाई समायोजन (Bitcoin के लिए हर ≈2 सप्ताह) के बाद पुनः गणना करें। 10% कठिनाई वृद्धि आपके दैनिक कॉइन आउटपुट को ≈10% कम करती है।`,
      `अपने वास्तविक बिजली बिलों और पूल डैशबोर्ड से कॉइन आउटपुट के रिकॉर्ड रखें। मासिक वास्तविक की तुलना कैलकुलेटर अनुमानों से करें।`
      ],
      validation: [
      `उसी अवधि के लिए अपने माइनिंग पूल की रिपोर्ट की गई शेयर और आय के साथ अनुमानित दैनिक कॉइन आउटपुट को क्रॉस-चेक करें।`,
      `परिकलित मासिक लागत (दैनिक kWh × 30 × दर) की तुलना अपने वास्तविक बिजली बिल से करके बिजली लागत को मान्य करें।`
      ],
    },
    ru: {
      interpret: [
      `Суточный доход рассчитывается как: (ваш хешрейт / общий хешрейт сети) × вознаграждение за блок × блоков в день × цена монеты. Это предполагает, что вы последовательно сохраняете одинаковую долю хешрейта сети. Сложность корректируется каждые 2016 блоков (≈2 недели для Bitcoin).`,
      `Обращайте особое внимание на показатель прибыли после затрат на электроэнергию. Если чистая суточная прибыль отрицательна, ваша операция теряет деньги при текущей цене монеты даже до амортизации оборудования. Срок окупаемости оборудования — наиболее критичный долгосрочный показатель.`
      ],
      scenarios: [
      `Оценка перед покупкой: перед приобретением майнингового оборудования введите хешрейт и потребление энергии майнера, ваш тариф на электроэнергию и текущую цену монеты. Сравните сроки окупаемости по нескольким монетам, чтобы определить наиболее прибыльный вариант.`,
      `Анализ порогового цены: запустите калькулятор в обратном порядке — зафиксируйте затраты и найдите минимальную цену монеты, необходимую для безубыточности только по электроэнергии. Это ваша "цена отключения".`
      ],
      checklist: [
      `Перед расчётом: 1) Уточните тариф на электроэнергию в кВт·ч по своему счёту. 2) Используйте реальный хешрейт майнера из программы мониторинга. 3) Учтите комиссию пула (обычно 1–2%), которая уменьшает валовой доход.`,
      `После расчёта: добавьте амортизацию оборудования в модель затрат. ASIC-майнеры теряют 50–80% стоимости в первый год; GPU — 30–50%. Разделите стоимость оборудования на ожидаемый срок службы и добавьте как ежедневные затраты.`
      ],
      mistakes: [
      `Использование текущей цены монеты без тестирования сценариев более низких цен — наиболее опасная ошибка. Доход от майнинга фиксирован в монетах, но счёт за электроэнергию — в фиатных деньгах. Всегда моделируйте при 50% и 30% текущей цены.`,
      `Игнорирование роста сложности: по мере присоединения новых майнеров к сети после роста цены сложность увеличивается, а ваша эффективная доля хешрейта падает. Консервативно добавьте 5–15% ежемесячного роста сложности к прогнозу.`
      ],
      benchmarks: [
      `Здоровая майнинговая операция достигает стоимости электроэнергии ниже 60% валового дохода, оставляя более 40% маржи на оборудование, накладные расходы и прибыль.`,
      `Сравните свою стоимость за добытую монету (общие суточные затраты / монет добыто в сутки) с текущей спотовой ценой и средними затратами на майнинг в сети.`
      ],
      execution: [
      `Пошаговый процесс: 1) Получите точное потребление энергии майнера с ваттметром. 2) Узнайте текущий тариф из последнего счёта. 3) Найдите текущую сложность сети и вознаграждение за блок в блокчейн-обозревателе. 4) Введите все значения.`,
      `Автоматизируйте отслеживание: обновляйте калькулятор еженедельно со свежими данными о сложности и цене. Стройте график суточной прибыли во времени, чтобы заранее выявлять момент перехода в убыточность.`
      ],
      hygiene: [
      `Пересчитывайте после каждой корректировки сложности сети (раз в ≈2 недели для Bitcoin). Рост сложности на 10% снижает суточный объём добычи монет на ≈10%.`,
      `Ведите записи фактических счетов за электроэнергию и объёма добычи монет из дашборда пула. Сравнивайте фактические ежемесячные показатели с расчётными.`
      ],
      validation: [
      `Проверяйте расчётный суточный объём добычи монет, сверяя его с данными пула о шерах и доходе за тот же период.`,
      `Проверяйте стоимость электроэнергии, сравнивая расчётные ежемесячные затраты (суточные кВт·ч × 30 × тариф) с фактическим счётом.`
      ],
    },
  },


  'dca-calculator': {
    en: {
      interpret: [
      `The DCA summary shows your average purchase price across all buy periods, total coins accumulated, total invested, and current portfolio value versus total cost. The key metric is "average cost vs. current price" — if current price exceeds your average cost, you are in profit regardless of what price was during individual buy periods. This smoothing effect is the core advantage of DCA over lump-sum timing.`,
      `The chart line showing your average cost over time should gradually converge toward the current price from below during bull markets and provide a visual "floor" during bear markets. If your average cost is significantly above current price, it signals an extended bear market where continued DCA is mathematically adding coins at a discount, which is favorable for long-term return if price recovers.`
      ],
      scenarios: [
      `Long-term accumulation plan: set up a monthly DCA schedule with a fixed dollar amount. Use the calculator to project how many coins you would accumulate over 1, 2, and 5 years at current prices, and see how returns change if price grows at 10%, 20%, or 50% annually. This helps set realistic expectations.`,
      `Bear market buying assessment: during a market drawdown, enter all your historical buy dates and amounts to see your exact average cost. Compare to current price to know precisely how much recovery you need to break even — useful for deciding whether to continue, pause, or increase your DCA amount.`
      ],
      checklist: [
      `Before modeling a DCA plan: 1) Decide on a fixed interval (weekly/biweekly/monthly) and amount you can genuinely sustain without straining your budget. 2) Include the buy fee in each purchase — a 1.5% card fee on a $100 monthly buy is $1.50 per buy, $18 per year in friction. 3) Choose a realistic projection period of at least 2 years to capture a full market cycle.`,
      `After reviewing results: verify that the average cost figure matches your intuition — if you bought mostly during high prices, average cost should be near those highs, not artificially low. Cross-check total invested equals your planned monthly amount × number of months.`
      ],
      mistakes: [
      `The most common DCA mistake is abandoning the strategy during price drops out of fear. DCA's mathematical advantage only materializes if you continue buying at lower prices. Stopping when prices fall is equivalent to eliminating your cheapest purchases — exactly the worst time to stop.`,
      `Over-concentrating into one asset: DCA reduces timing risk but not asset risk. If the underlying coin fails, consistent DCA just increases your exposure to a failing asset. Diversify across 2–4 uncorrelated assets rather than applying maximum DCA to a single token.`
      ],
      benchmarks: [
      `Compare your DCA average cost to a lump-sum purchase at the start of the same period. In volatile markets, DCA typically achieves 5–20% lower average cost than a single entry at the beginning of a bull run, but may show a higher average cost than lump-sum if prices trended uniformly upward with little volatility.`,
      `A well-executed DCA strategy should outperform attempting to time the market for 80%+ of retail investors based on historical data. Use the calculator to measure whether your actual average cost over the past year beat a hypothetical single purchase at the start of that period.`
      ],
      execution: [
      `Setup workflow: 1) Choose exchange and payment method — bank transfer is cheapest (0.1–0.5% fee) vs. card (1.5–3.5%). 2) Enable recurring buy or schedule a calendar reminder. 3) Set up automatic withdrawal to a self-custody wallet monthly to reduce exchange risk. 4) Log each buy in a spreadsheet: date, amount, price, coins acquired.`,
      `Review cadence: recalculate your DCA summary quarterly. If portfolio value exceeds 2× your total invested, consider pausing new DCA and waiting for a retracement — this is optional but reduces risk of buying near peaks.`
      ],
      hygiene: [
      `Update the calculator with each new purchase to keep average cost accurate. Even one missed entry shifts your average significantly if that purchase was at an extreme price (high or low). Most errors come from forgetting to log buys made during market excitement.`,
      `Review your DCA amount annually relative to your income and financial goals. The amount should represent money you can genuinely afford to not access for at least 3–5 years, since forcing a sale during a bear market can crystallize losses that DCA was designed to average out.`
      ],
      validation: [
      `Verify your calculated average cost manually: sum (cost basis of each buy including fees) and divide by total coins accumulated. Compare to the calculator output — they should match within 0.1%. A discrepancy means a buy entry is wrong or missing.`,
      `Cross-check total invested: add up all cash put in (not counting current value). This should match your bank records of transfers to the exchange plus any fees. Use this to confirm no purchases were forgotten in the calculator input.`
      ],
    },
    es: {
      interpret: [
      `El resumen de DCA muestra tu precio de compra promedio en todos los períodos, el total de monedas acumuladas, el total invertido y el valor actual de la cartera versus el coste total. La métrica clave es "coste promedio vs. precio actual" — si el precio actual supera tu coste promedio, estás en ganancias.`,
      `La línea del gráfico que muestra tu coste promedio en el tiempo debe converger gradualmente hacia el precio actual desde abajo durante los mercados alcistas y proporcionar un "suelo" visual durante los bajistas. Si tu coste promedio está significativamente por encima del precio actual, señala un mercado bajista extendido donde continuar el DCA añade matemáticamente monedas a descuento.`
      ],
      scenarios: [
      `Plan de acumulación a largo plazo: configura un calendario de DCA mensual con una cantidad fija en dólares. Usa el calculador para proyectar cuántas monedas acumularías durante 1, 2 y 5 años a los precios actuales.`,
      `Evaluación de compras en mercado bajista: durante una caída del mercado, introduce todas tus fechas y montos históricos de compra para ver tu coste promedio exacto. Compara con el precio actual para saber precisamente cuánta recuperación necesitas para alcanzar el punto de equilibrio.`
      ],
      checklist: [
      `Antes de modelar un plan DCA: 1) Decide un intervalo fijo y un monto que puedas sostener genuinamente. 2) Incluye la comisión de compra en cada operación. 3) Elige un período de proyección realista de al menos 2 años para capturar un ciclo de mercado completo.`,
      `Después de revisar los resultados: verifica que la cifra de coste promedio coincida con tu intuición. Comprueba que el total invertido es igual a tu monto mensual planificado × número de meses.`
      ],
      mistakes: [
      `El error más común del DCA es abandonar la estrategia durante las caídas de precio por miedo. La ventaja matemática del DCA solo se materializa si continúas comprando a precios más bajos. Detenerse cuando los precios caen es equivalente a eliminar tus compras más baratas.`,
      `Concentración excesiva en un activo: el DCA reduce el riesgo de timing pero no el riesgo del activo. Diversifica entre 2–4 activos no correlacionados en lugar de aplicar el máximo DCA a un solo token.`
      ],
      benchmarks: [
      `Compara tu coste promedio DCA con una compra de suma global al inicio del mismo período. En mercados volátiles, el DCA típicamente logra un coste promedio 5–20% más bajo que una entrada única al comienzo de una tendencia alcista.`,
      `Una estrategia DCA bien ejecutada debería superar el intento de sincronizar el mercado para más del 80% de los inversores minoristas. Usa el calculador para medir si tu coste promedio real superó una compra hipotética única al inicio de ese período.`
      ],
      execution: [
      `Flujo de configuración: 1) Elige exchange y método de pago — la transferencia bancaria es más barata (0.1–0.5%) vs. tarjeta (1.5–3.5%). 2) Habilita la compra recurrente o programa un recordatorio en el calendario. 3) Registra cada compra: fecha, monto, precio, monedas adquiridas.`,
      `Cadencia de revisión: recalcula tu resumen DCA trimestralmente. Si el valor de la cartera supera 2× tu inversión total, considera pausar nuevas compras DCA y esperar una retracción.`
      ],
      hygiene: [
      `Actualiza el calculador con cada nueva compra para mantener el coste promedio preciso. Incluso una entrada omitida puede desplazar significativamente tu promedio si esa compra fue a un precio extremo.`,
      `Revisa tu monto de DCA anualmente en relación con tus ingresos y objetivos financieros. El monto debería representar dinero que puedes genuinamente dejar inaccesible durante al menos 3–5 años.`
      ],
      validation: [
      `Verifica tu coste promedio calculado manualmente: suma (base de coste de cada compra incluidas comisiones) y divide por el total de monedas acumuladas. Compara con la salida del calculador — deben coincidir dentro del 0.1%.`,
      `Verifica el total invertido: suma todo el efectivo aportado. Esto debe coincidir con tus registros bancarios de transferencias al exchange más cualquier comisión.`
      ],
    },
    pt: {
      interpret: [
      `O resumo do DCA mostra seu preço médio de compra em todos os períodos, total de moedas acumuladas, total investido e valor atual da carteira versus custo total. A métrica-chave é "custo médio vs. preço atual" — se o preço atual superar seu custo médio, você está no lucro.`,
      `A linha do gráfico mostrando seu custo médio ao longo do tempo deve convergir gradualmente para o preço atual de baixo durante mercados altistas e fornecer um "piso" visual durante mercados baixistas.`
      ],
      scenarios: [
      `Plano de acumulação de longo prazo: configure um cronograma de DCA mensal com um valor fixo em dólares. Use a calculadora para projetar quantas moedas acumularia ao longo de 1, 2 e 5 anos aos preços atuais.`,
      `Avaliação de compras em mercado baixista: durante uma queda do mercado, insira todas as suas datas e valores históricos de compra para ver seu custo médio exato.`
      ],
      checklist: [
      `Antes de modelar um plano DCA: 1) Decida um intervalo fixo e um valor que possa genuinamente manter. 2) Inclua a taxa de compra em cada transação. 3) Escolha um período de projeção realista de pelo menos 2 anos.`,
      `Após revisar os resultados: verifique se a cifra de custo médio corresponde à sua intuição. Confirme que o total investido equivale ao seu valor mensal planejado × número de meses.`
      ],
      mistakes: [
      `O erro mais comum do DCA é abandonar a estratégia durante quedas de preço por medo. A vantagem matemática do DCA só se materializa se você continuar comprando a preços mais baixos.`,
      `Concentração excessiva em um ativo: o DCA reduz o risco de timing mas não o risco do ativo. Diversifique entre 2–4 ativos não correlacionados.`
      ],
      benchmarks: [
      `Compare seu custo médio DCA com uma compra de soma única no início do mesmo período. Em mercados voláteis, o DCA tipicamente alcança um custo médio 5–20% menor do que uma única entrada.`,
      `Uma estratégia DCA bem executada deve superar a tentativa de cronometrar o mercado para mais de 80% dos investidores de varejo.`
      ],
      execution: [
      `Fluxo de configuração: 1) Escolha exchange e método de pagamento — transferência bancária é mais barata (0.1–0.5%) vs. cartão (1.5–3.5%). 2) Ative compra recorrente ou agende um lembrete no calendário. 3) Registre cada compra: data, valor, preço, moedas adquiridas.`,
      `Cadência de revisão: recalcule seu resumo DCA trimestralmente. Se o valor da carteira ultrapassar 2× seu total investido, considere pausar novas compras.`
      ],
      hygiene: [
      `Atualize a calculadora a cada nova compra para manter o custo médio preciso. Mesmo uma entrada omitida pode deslocar significativamente sua média.`,
      `Revise seu valor de DCA anualmente em relação à sua renda e objetivos financeiros.`
      ],
      validation: [
      `Verifique seu custo médio calculado manualmente: some (base de custo de cada compra incluindo taxas) e divida pelo total de moedas acumuladas.`,
      `Verifique o total investido: some todo o dinheiro colocado. Isso deve corresponder aos seus registros bancários de transferências para a exchange.`
      ],
    },
    tr: {
      interpret: [
      `DCA özeti, tüm satın alma dönemlerindeki ortalama satın alma fiyatınızı, toplam birikmiş coin miktarını, toplam yatırımı ve mevcut portföy değerini toplam maliyete karşı gösterir. Temel metrik "ortalama maliyet vs. mevcut fiyat"tır.`,
      `Zamanla ortalama maliyetinizi gösteren grafik çizgisi, boğa piyasalarında mevcut fiyata doğru aşağıdan yaklaşmalı ve ayı piyasalarında görsel bir "taban" sağlamalıdır.`
      ],
      scenarios: [
      `Uzun vadeli birikim planı: aylık sabit bir miktar içeren bir DCA takvimi kurun. Hesaplayıcıyı mevcut fiyatlarda 1, 2 ve 5 yıl içinde ne kadar coin biriktireceğinizi tahmin etmek için kullanın.`,
      `Ayı piyasası alım değerlendirmesi: piyasa düşüşü sırasında, tüm geçmiş alım tarihlerinizi ve tutarlarınızı girerek tam ortalama maliyetinizi görün.`
      ],
      checklist: [
      `Bir DCA planı modellemeden önce: 1) Gerçekten sürdürebileceğiniz sabit bir aralık ve miktar belirleyin. 2) Her satın almada alım ücretini dahil edin. 3) Tam bir piyasa döngüsünü yakalamak için en az 2 yıllık gerçekçi bir projeksiyon süresi seçin.`,
      `Sonuçları inceledikten sonra: ortalama maliyet rakamının sezginizle örtüştüğünü doğrulayın.`
      ],
      mistakes: [
      `En yaygın DCA hatası, fiyat düşüşleri sırasında korkuyla stratejiden vazgeçmektir. DCA'nın matematiksel avantajı yalnızca daha düşük fiyatlardan satın almaya devam ederseniz gerçekleşir.`,
      `Tek varlığa aşırı yoğunlaşma: DCA zamanlama riskini azaltır ancak varlık riskini azaltmaz. 2–4 korelasyonsuz varlık arasında çeşitlendirin.`
      ],
      benchmarks: [
      `DCA ortalama maliyetinizi aynı dönemin başında yapılan tek seferlik bir satın almayla karşılaştırın. Oynaklık piyasalarında DCA genellikle tek girişe göre %5–20 daha düşük ortalama maliyet elde eder.`,
      `İyi uygulanmış bir DCA stratejisi, perakende yatırımcıların %80'inden fazlası için piyasayı zamanlamaya çalışmaktan daha iyi performans göstermelidir.`
      ],
      execution: [
      `Kurulum iş akışı: 1) Borsa ve ödeme yöntemini seçin — banka havalesi en ucuz (%0.1–0.5 ücret) ve karta karşı (%1.5–3.5). 2) Tekrarlayan alımı etkinleştirin veya takvim hatırlatıcısı ayarlayın. 3) Her alımı kaydedin: tarih, tutar, fiyat, edinilen coin.`,
      `İnceleme kadansı: DCA özetinizi çeyreklik olarak yeniden hesaplayın.`
      ],
      hygiene: [
      `Ortalama maliyeti doğru tutmak için her yeni satın alımla hesaplayıcıyı güncelleyin.`,
      `DCA tutarınızı geliriniz ve finansal hedeflerinize göre yıllık olarak gözden geçirin.`
      ],
      validation: [
      `Hesaplanan ortalama maliyetinizi manuel olarak doğrulayın: (ücretler dahil her alımın maliyet tabanı) toplamını toplam biriken coin'e bölün.`,
      `Toplam yatırımı doğrulayın: yatırılan tüm nakit toplamını alın. Bu, borsaya yapılan transferlerin banka kayıtlarınızla eşleşmelidir.`
      ],
    },
    hi: {
      interpret: [
      `DCA सारांश सभी खरीद अवधियों में आपका औसत खरीद मूल्य, कुल संचित कॉइन, कुल निवेश और कुल लागत के विरुद्ध वर्तमान पोर्टफोलियो मूल्य दिखाता है। मुख्य मेट्रिक "औसत लागत बनाम वर्तमान मूल्य" है।`,
      `समय के साथ आपकी औसत लागत दिखाने वाली चार्ट लाइन बुल मार्केट के दौरान नीचे से वर्तमान मूल्य की ओर धीरे-धीरे अभिसरण करनी चाहिए और बेयर मार्केट के दौरान एक दृश्य "फर्श" प्रदान करनी चाहिए।`
      ],
      scenarios: [
      `दीर्घकालिक संचय योजना: निश्चित डॉलर राशि के साथ मासिक DCA शेड्यूल सेट करें। वर्तमान कीमतों पर 1, 2 और 5 वर्षों में आप कितने कॉइन जमा करेंगे इसका अनुमान लगाने के लिए कैलकुलेटर का उपयोग करें।`,
      `बेयर मार्केट खरीद मूल्यांकन: बाजार गिरावट के दौरान, अपनी सटीक औसत लागत देखने के लिए अपनी सभी ऐतिहासिक खरीद तारीखें और राशियां दर्ज करें।`
      ],
      checklist: [
      `DCA योजना मॉडल करने से पहले: 1) एक निश्चित अंतराल और राशि तय करें जो आप वास्तव में बनाए रख सकते हैं। 2) प्रत्येक खरीद में खरीद शुल्क शामिल करें। 3) एक पूर्ण बाजार चक्र को पकड़ने के लिए कम से कम 2 वर्षों की यथार्थवादी प्रक्षेपण अवधि चुनें।`,
      `परिणाम की समीक्षा के बाद: सत्यापित करें कि औसत लागत आंकड़ा आपकी सहज ज्ञान के साथ मेल खाता है।`
      ],
      mistakes: [
      `DCA की सबसे आम गलती मूल्य गिरावट के दौरान डर से रणनीति छोड़ना है। DCA का गणितीय फायदा तभी मिलता है जब आप कम कीमतों पर खरीदते रहते हैं।`,
      `एक संपत्ति में अत्यधिक केंद्रित करना: DCA समय जोखिम को कम करता है लेकिन संपत्ति जोखिम को नहीं। 2–4 असंबंधित संपत्तियों में विविधता लाएं।`
      ],
      benchmarks: [
      `उसी अवधि की शुरुआत में एकमुश्त खरीद के साथ अपनी DCA औसत लागत की तुलना करें। अस्थिर बाजारों में, DCA आमतौर पर एकल प्रवेश की तुलना में 5–20% कम औसत लागत प्राप्त करता है।`,
      `एक अच्छी तरह से निष्पादित DCA रणनीति 80%+ खुदरा निवेशकों के लिए बाजार को समय देने के प्रयास से बेहतर प्रदर्शन करनी चाहिए।`
      ],
      execution: [
      `सेटअप वर्कफ़्लो: 1) एक्सचेंज और भुगतान विधि चुनें — बैंक ट्रांसफर सबसे सस्ता (0.1–0.5% शुल्क) बनाम कार्ड (1.5–3.5%)। 2) आवर्ती खरीद सक्षम करें या कैलेंडर रिमाइंडर शेड्यूल करें। 3) प्रत्येक खरीद लॉग करें: तारीख, राशि, मूल्य, अर्जित कॉइन।`,
      `समीक्षा आवृत्ति: तिमाही में अपने DCA सारांश की पुनर्गणना करें।`
      ],
      hygiene: [
      `औसत लागत सटीक रखने के लिए प्रत्येक नई खरीद के साथ कैलकुलेटर अपडेट करें।`,
      `अपनी आय और वित्तीय लक्ष्यों के सापेक्ष वार्षिक रूप से अपनी DCA राशि की समीक्षा करें।`
      ],
      validation: [
      `अपनी परिकलित औसत लागत को मैन्युअल रूप से सत्यापित करें: (शुल्क सहित प्रत्येक खरीद का लागत आधार) का योग करें और कुल संचित कॉइन से विभाजित करें।`,
      `कुल निवेश की जांच करें: डाले गए सभी नकद का योग करें। यह एक्सचेंज में स्थानांतरण के आपके बैंक रिकॉर्ड से मेल खाना चाहिए।`
      ],
    },
    ru: {
      interpret: [
      `Сводка DCA показывает вашу среднюю цену покупки за все периоды, общее количество накопленных монет, общий объём инвестиций и текущую стоимость портфеля относительно общей стоимости. Ключевой метрик — "средняя стоимость vs. текущая цена".`,
      `Линия графика, отображающая среднюю стоимость с течением времени, должна постепенно приближаться к текущей цене снизу во время бычьего рынка и обеспечивать визуальный "пол" во время медвежьего.`
      ],
      scenarios: [
      `Долгосрочный план накопления: настройте ежемесячный DCA-график с фиксированной суммой в долларах. Используйте калькулятор для прогнозирования количества монет, накопленных за 1, 2 и 5 лет по текущим ценам.`,
      `Оценка покупок на медвежьем рынке: во время коррекции рынка введите все исторические даты и суммы покупок, чтобы увидеть точную среднюю стоимость. Сравните с текущей ценой, чтобы знать, какого восстановления нужно достичь для безубыточности.`
      ],
      checklist: [
      `Перед моделированием DCA-плана: 1) Определите фиксированный интервал и сумму, которую вы действительно можете поддерживать. 2) Включите комиссию за покупку в каждую сделку. 3) Выберите реалистичный период прогнозирования не менее 2 лет.`,
      `После ознакомления с результатами: убедитесь, что показатель средней стоимости соответствует интуиции. Проверьте, что общий вложенный объём равен плановой ежемесячной сумме × количество месяцев.`
      ],
      mistakes: [
      `Наиболее распространённая ошибка DCA — отказ от стратегии в период снижения цен из-за страха. Математическое преимущество DCA реализуется только при продолжении покупок по более низким ценам.`,
      `Избыточная концентрация в одном активе: DCA снижает временной риск, но не риск актива. Диверсифицируйте по 2–4 некоррелированным активам.`
      ],
      benchmarks: [
      `Сравните среднюю стоимость DCA с единовременной покупкой в начале того же периода. На волатильных рынках DCA обычно даёт среднюю стоимость на 5–20% ниже, чем единовременный вход.`,
      `Хорошо реализованная DCA-стратегия должна превосходить попытки угадать момент входа для более 80% розничных инвесторов.`
      ],
      execution: [
      `Рабочий процесс настройки: 1) Выберите биржу и способ оплаты — банковский перевод дешевле (0.1–0.5%) vs. карта (1.5–3.5%). 2) Включите повторяющуюся покупку или поставьте напоминание в календаре. 3) Записывайте каждую покупку: дата, сумма, цена, приобретённые монеты.`,
      `Цикл проверки: пересчитывайте сводку DCA ежеквартально. Если стоимость портфеля превышает 2× от общих вложений, рассмотрите паузу в новых покупках и ожидание коррекции.`
      ],
      hygiene: [
      `Обновляйте калькулятор при каждой новой покупке, чтобы поддерживать точность средней стоимости. Даже одна пропущенная запись может значительно сдвинуть среднее, если покупка была по экстремальной цене.`,
      `Пересматривайте размер DCA-взноса ежегодно с учётом дохода и финансовых целей. Это должны быть средства, которые вы реально можете не трогать минимум 3–5 лет.`
      ],
      validation: [
      `Проверьте расчётную среднюю стоимость вручную: сложите базовую стоимость каждой покупки (включая комиссии) и разделите на общее количество накопленных монет. Сравните с выводом калькулятора — расхождение не должно превышать 0.1%.`,
      `Проверьте общий объём вложений: сложите все внесённые средства. Это должно совпадать с выписками банка по переводам на биржу плюс комиссии.`
      ],
    },
  },
  'tax-calculator': {
    en: {
      interpret: [
      `The tax calculator outputs three numbers: short-term capital gain (held under 1 year, taxed as ordinary income in most jurisdictions), long-term capital gain (held over 1 year, lower rate), and total tax liability at the entered rate. The biggest leverage is the holding period: shifting a gain from short-term to long-term can reduce your tax bill by 10–20 percentage points in high-income brackets.`,
      `The effective tax amount is applied to the realized gain only, not the full sale proceeds. If you entered at $5,000 and exited at $8,000, the taxable gain is $3,000 — not $8,000. If the result shows a large liability on a small gain, verify you did not accidentally enter cost basis of zero or a purchase price far above the actual entry.`
      ],
      scenarios: [
      `Harvest planning: near year-end, enter positions with unrealized losses to see how much tax savings can be generated by selling and repurchasing (tax-loss harvesting). Compare the tax savings against the round-trip trading costs to confirm harvesting is net beneficial.`,
      `Disposal strategy: if you hold the same coin bought at multiple prices, use the calculator to compare FIFO vs. specific-lot disposal. Selecting the highest-cost lots first maximizes the cost basis, minimizing taxable gain — legal in many jurisdictions but requires specific identification at the time of sale.`
      ],
      checklist: [
      `Before calculating: 1) Confirm your jurisdiction's tax rate for short-term and long-term gains — these vary widely by country and income level. 2) Calculate the exact cost basis including fees paid at acquisition. 3) Determine the holding period precisely — one day short of 1 year means short-term rates apply.`,
      `After calculating: note whether the gain is realized (asset already sold) or unrealized (estimating future sale). Taxes are only owed on realized gains in most jurisdictions — keep position open if the short-term window closes in under 6 weeks to qualify for long-term rates.`
      ],
      mistakes: [
      `Using sale proceeds as the taxable amount instead of the gain is the most costly error. Your tax is on (proceeds − cost basis − fees), not on total proceeds. Re-read your jurisdiction's rules carefully — some countries tax on full proceeds for certain asset classes.`,
      `Ignoring fees in cost basis: transaction fees paid when buying increase your cost basis and therefore reduce taxable gain. On a $10,000 purchase with 0.5% fee ($50), your cost basis is $10,050 — missing this overstates your gain by $50 per transaction, compounding across many trades.`
      ],
      benchmarks: [
      `For US taxpayers, the 2024 long-term capital gains rate is 0% (income under $44,625), 15% ($44,626–$492,300), or 20% (above). Short-term gains are taxed as ordinary income (up to 37% federal + state). The tax advantage of holding 12+ months can easily exceed 15–20% of the gain.`,
      `Compare your realized crypto tax liability to your total portfolio returns. If taxes exceed 25% of gains, explore strategies like tax-loss harvesting, long-term holding, or tax-deferred accounts (where available) to improve net after-tax returns.`
      ],
      execution: [
      `Year-end process: 1) Download complete trade history from all exchanges. 2) Calculate cost basis for each disposal using FIFO or specific-lot method. 3) Separate short-term and long-term disposals. 4) Sum net gains and losses within each category. 5) Run this calculator to estimate liability before filing.`,
      `Use the calculator mid-year to project your annual tax liability. If you are in a high-gain year, consider realizing losses elsewhere in your portfolio to offset, or deferring additional disposals to next year if approaching a tax bracket threshold.`
      ],
      hygiene: [
      `Keep records of every trade: date, amount, cost basis, proceeds, fees, holding period. Many jurisdictions require 5–7 years of records. Cloud-backup all exchange statements — exchanges occasionally revoke API access or close accounts, making historical data retrieval impossible.`,
      `Update cost basis records after every staking reward, airdrop, or hard fork — these events create taxable income at the fair market value on the date received, which then becomes the new cost basis for future disposals.`
      ],
      validation: [
      `Cross-check against dedicated crypto tax software (Koinly, CoinTracker, TokenTax). If their total gain differs from your manual calculation by more than 2%, investigate the discrepancy — it often reveals a missing trade, incorrect cost basis, or exchange fee not captured.`,
      `Verify your cost basis by tracing back to the original exchange confirmation for each purchase. Imported CSV files sometimes contain errors — a single incorrect cost basis row can distort the entire year's calculation.`
      ],
    },
    es: {
      interpret: [
      `El calculador de impuestos produce tres cifras: ganancia de capital a corto plazo (mantenida menos de 1 año, gravada como ingresos ordinarios en la mayoría de jurisdicciones), ganancia de capital a largo plazo (mantenida más de 1 año, tasa menor) y obligación fiscal total a la tasa ingresada.`,
      `El monto del impuesto efectivo se aplica solo a la ganancia realizada, no a los ingresos totales de venta. Si entraste a $5,000 y saliste a $8,000, la ganancia imponible es $3,000 — no $8,000.`
      ],
      scenarios: [
      `Planificación de cosecha de pérdidas: cerca del fin de año, introduce posiciones con pérdidas no realizadas para ver cuánto ahorro fiscal puede generarse vendiendo y recomprando. Compara el ahorro fiscal con los costes de trading de ida y vuelta.`,
      `Estrategia de disposición: si tienes la misma moneda comprada a múltiples precios, usa el calculador para comparar la disposición FIFO versus lote específico. Seleccionar primero los lotes de mayor coste maximiza la base de coste, minimizando la ganancia imponible.`
      ],
      checklist: [
      `Antes de calcular: 1) Confirma la tasa impositiva de tu jurisdicción para ganancias a corto y largo plazo. 2) Calcula la base de coste exacta incluyendo comisiones pagadas en la adquisición. 3) Determina el período de tenencia con precisión.`,
      `Después de calcular: observa si la ganancia es realizada o no realizada. Los impuestos solo se deben sobre ganancias realizadas en la mayoría de jurisdicciones.`
      ],
      mistakes: [
      `Usar los ingresos de venta como monto imponible en lugar de la ganancia es el error más costoso. Tu impuesto es sobre (ingresos − base de coste − comisiones), no sobre los ingresos totales.`,
      `Ignorar las comisiones en la base de coste: las comisiones de transacción pagadas al comprar aumentan tu base de coste y por tanto reducen la ganancia imponible.`
      ],
      benchmarks: [
      `La ventaja fiscal de mantener 12+ meses puede fácilmente superar el 15–20% de la ganancia en jurisdicciones con tasas diferenciadas entre corto y largo plazo.`,
      `Compara tu obligación fiscal cripto realizada con tus retornos totales de cartera. Si los impuestos superan el 25% de las ganancias, explora estrategias como la cosecha de pérdidas fiscales o la tenencia a largo plazo.`
      ],
      execution: [
      `Proceso de fin de año: 1) Descarga el historial completo de operaciones de todos los exchanges. 2) Calcula la base de coste para cada disposición. 3) Separa disposiciones a corto y largo plazo. 4) Suma ganancias y pérdidas netas en cada categoría. 5) Ejecuta este calculador para estimar la obligación antes de declarar.`,
      `Usa el calculador a mitad de año para proyectar tu obligación fiscal anual. Si estás en un año de altas ganancias, considera realizar pérdidas en otro lugar de tu cartera para compensar.`
      ],
      hygiene: [
      `Mantén registros de cada operación: fecha, monto, base de coste, ingresos, comisiones, período de tenencia. Muchas jurisdicciones requieren registros de 5–7 años.`,
      `Actualiza los registros de base de coste después de cada recompensa de staking, airdrop o hard fork — estos eventos crean ingresos imponibles al valor justo de mercado en la fecha de recepción.`
      ],
      validation: [
      `Verifica con software dedicado de impuestos cripto. Si la ganancia total difiere de tu cálculo manual en más del 2%, investiga la discrepancia.`,
      `Verifica tu base de coste rastreando la confirmación original del exchange para cada compra.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de impostos produz três números: ganho de capital de curto prazo (mantido menos de 1 ano, tributado como renda ordinária na maioria das jurisdições), ganho de capital de longo prazo (mantido mais de 1 ano, alíquota menor) e obrigação fiscal total à alíquota inserida.`,
      `O valor efetivo do imposto é aplicado apenas ao ganho realizado, não à receita total da venda. Se você entrou a $5.000 e saiu a $8.000, o ganho tributável é $3.000 — não $8.000.`
      ],
      scenarios: [
      `Planejamento de coleta de perdas: perto do fim do ano, insira posições com perdas não realizadas para ver quanto em economia fiscal pode ser gerado vendendo e recomprando.`,
      `Estratégia de disposição: se você possui a mesma moeda comprada a vários preços, use a calculadora para comparar a disposição FIFO versus lote específico.`
      ],
      checklist: [
      `Antes de calcular: 1) Confirme a alíquota de imposto da sua jurisdição para ganhos de curto e longo prazo. 2) Calcule a base de custo exata incluindo taxas pagas na aquisição. 3) Determine o período de manutenção com precisão.`,
      `Após calcular: observe se o ganho é realizado ou não realizado. Os impostos são devidos apenas sobre ganhos realizados na maioria das jurisdições.`
      ],
      mistakes: [
      `Usar a receita da venda como valor tributável em vez do ganho é o erro mais caro. Seu imposto incide sobre (receita − base de custo − taxas), não sobre a receita total.`,
      `Ignorar taxas na base de custo: as taxas de transação pagas na compra aumentam sua base de custo e, portanto, reduzem o ganho tributável.`
      ],
      benchmarks: [
      `A vantagem fiscal de manter por 12+ meses pode facilmente superar 15–20% do ganho em jurisdições com alíquotas diferenciadas.`,
      `Compare sua obrigação fiscal realizada com seus retornos totais de carteira.`
      ],
      execution: [
      `Processo de fim de ano: 1) Baixe o histórico completo de negociações de todas as exchanges. 2) Calcule a base de custo para cada disposição. 3) Separe disposições de curto e longo prazo. 4) Some ganhos e perdas líquidos em cada categoria.`,
      `Use a calculadora no meio do ano para projetar sua obrigação fiscal anual.`
      ],
      hygiene: [
      `Mantenha registros de cada negociação: data, valor, base de custo, receita, taxas, período de manutenção. Muitas jurisdições exigem registros de 5–7 anos.`,
      `Atualize os registros de base de custo após cada recompensa de staking, airdrop ou hard fork.`
      ],
      validation: [
      `Verifique com software dedicado de impostos cripto. Se o ganho total diferir do seu cálculo manual em mais de 2%, investigue a discrepância.`,
      `Verifique sua base de custo rastreando a confirmação original da exchange para cada compra.`
      ],
    },
    tr: {
      interpret: [
      `Vergi hesaplayıcısı üç rakam üretir: kısa vadeli sermaye kazancı (1 yıldan az tutulan, çoğu ülkede olağan gelir olarak vergilendirilen), uzun vadeli sermaye kazancı (1 yıldan fazla tutulan, daha düşük oran) ve girilen oranda toplam vergi yükümlülüğü.`,
      `Efektif vergi tutarı yalnızca gerçekleşmiş kazanca uygulanır, toplam satış gelirine değil. 5.000 dolar girip 8.000 dolardan çıktıysanız, vergiye tabi kazanç 3.000 dolardır.`
      ],
      scenarios: [
      `Hasat planlaması: yıl sonuna yakın, gerçekleşmemiş zararları olan pozisyonları girerek satış ve yeniden satın almayla (vergi zararı hasadı) ne kadar vergi tasarrufu sağlanabileceğini görün.`,
      `Tasarruf stratejisi: aynı coin'i birden fazla fiyattan aldıysanız, FIFO ve spesifik lot tasarrufunu karşılaştırmak için hesaplayıcıyı kullanın.`
      ],
      checklist: [
      `Hesaplamadan önce: 1) Kısa ve uzun vadeli kazançlar için yargı alanınızın vergi oranını onaylayın. 2) Edinme sırasında ödenen ücretler dahil tam maliyet tabanını hesaplayın. 3) Elde tutma süresini kesin olarak belirleyin.`,
      `Hesapladıktan sonra: kazancın gerçekleşmiş mi yoksa gerçekleşmemiş mi olduğunu not edin.`
      ],
      mistakes: [
      `Kazanç yerine satış gelirini vergiye tabi tutar olarak kullanmak en maliyetli hatadır. Verginiz (gelir − maliyet tabanı − ücretler) üzerindendir, toplam gelir üzerinden değil.`,
      `Maliyet tabanındaki ücretleri görmezden gelmek: satın alırken ödenen işlem ücretleri maliyet tabanınızı artırır ve dolayısıyla vergiye tabi kazancı azaltır.`
      ],
      benchmarks: [
      `Farklılaştırılmış oranları olan yargı alanlarında 12+ ay tutmanın vergi avantajı kazancın %15–20'sini kolayca aşabilir.`,
      `Gerçekleşmiş kripto vergi yükümlülüğünüzü toplam portföy getirilerinizle karşılaştırın.`
      ],
      execution: [
      `Yıl sonu süreci: 1) Tüm borsalardan eksiksiz işlem geçmişini indirin. 2) Her elden çıkarma için maliyet tabanını hesaplayın. 3) Kısa ve uzun vadeli elden çıkarmaları ayırın. 4) Her kategorideki net kazanç ve zararları toplayın.`,
      `Yıllık vergi yükümlülüğünüzü tahmin etmek için hesaplayıcıyı yıl ortasında kullanın.`
      ],
      hygiene: [
      `Her işlemin kayıtlarını tutun: tarih, tutar, maliyet tabanı, gelir, ücretler, elde tutma süresi.`,
      `Her staking ödülü, airdrop veya hard fork'tan sonra maliyet tabanı kayıtlarını güncelleyin.`
      ],
      validation: [
      `Özel kripto vergi yazılımıyla çapraz kontrol yapın. Toplam kazanç manuel hesaplamamızdan %2'den fazla farklıysa, tutarsızlığı araştırın.`,
      `Her satın alım için orijinal borsa onayını takip ederek maliyet tabanınızı doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `टैक्स कैलकुलेटर तीन संख्याएं आउटपुट करता है: अल्पकालिक पूंजी लाभ (1 वर्ष से कम आयोजित, अधिकांश न्यायक्षेत्रों में सामान्य आय के रूप में कर योग्य), दीर्घकालिक पूंजी लाभ (1 वर्ष से अधिक आयोजित, कम दर) और दर्ज दर पर कुल कर देनदारी।`,
      `प्रभावी कर राशि केवल वास्तविक लाभ पर लागू होती है, कुल बिक्री आय पर नहीं। यदि आपने $5,000 पर प्रवेश किया और $8,000 पर बाहर निकले, तो कर योग्य लाभ $3,000 है — $8,000 नहीं।`
      ],
      scenarios: [
      `हार्वेस्ट योजना: वर्ष के अंत में, अवास्तविक हानि वाली पोजीशन दर्ज करें यह देखने के लिए कि बेचने और पुनर्खरीद (टैक्स-लॉस हार्वेस्टिंग) से कितनी कर बचत हो सकती है।`,
      `डिस्पोजल रणनीति: यदि आपके पास कई कीमतों पर खरीदे गए एक ही कॉइन हैं, तो FIFO बनाम विशिष्ट-लॉट डिस्पोजल की तुलना करने के लिए कैलकुलेटर का उपयोग करें।`
      ],
      checklist: [
      `गणना से पहले: 1) अल्पकालिक और दीर्घकालिक लाभ के लिए अपने न्यायक्षेत्र की कर दर की पुष्टि करें। 2) अधिग्रहण पर भुगतान किए गए शुल्क सहित सटीक लागत आधार की गणना करें। 3) होल्डिंग अवधि सटीक रूप से निर्धारित करें।`,
      `गणना के बाद: ध्यान दें कि लाभ वास्तविक है (संपत्ति पहले ही बेची गई) या अवास्तविक (भविष्य की बिक्री का अनुमान)।`
      ],
      mistakes: [
      `लाभ के बजाय बिक्री आय को कर योग्य राशि के रूप में उपयोग करना सबसे महंगी गलती है। आपका कर (आय − लागत आधार − शुल्क) पर है, कुल आय पर नहीं।`,
      `लागत आधार में शुल्क को नजरअंदाज करना: खरीदते समय भुगतान किए गए लेनदेन शुल्क आपके लागत आधार को बढ़ाते हैं और इसलिए कर योग्य लाभ को कम करते हैं।`
      ],
      benchmarks: [
      `विभेदित दरों वाले न्यायक्षेत्रों में 12+ महीने आयोजित करने का कर लाभ आसानी से लाभ के 15–20% से अधिक हो सकता है।`,
      `अपनी वास्तविक क्रिप्टो कर देनदारी की तुलना अपने कुल पोर्टफोलियो रिटर्न से करें।`
      ],
      execution: [
      `वर्ष-अंत प्रक्रिया: 1) सभी एक्सचेंज से पूर्ण ट्रेड हिस्ट्री डाउनलोड करें। 2) प्रत्येक डिस्पोजल के लिए लागत आधार की गणना करें। 3) अल्पकालिक और दीर्घकालिक डिस्पोजल अलग करें। 4) प्रत्येक श्रेणी में नेट लाभ और हानि योग करें।`,
      `वार्षिक कर देनदारी का अनुमान लगाने के लिए मध्य-वर्ष में कैलकुलेटर का उपयोग करें।`
      ],
      hygiene: [
      `प्रत्येक ट्रेड के रिकॉर्ड रखें: तारीख, राशि, लागत आधार, आय, शुल्क, होल्डिंग अवधि। कई न्यायक्षेत्रों में 5–7 वर्ष के रिकॉर्ड की आवश्यकता होती है।`,
      `प्रत्येक स्टेकिंग रिवार्ड, एयरड्रॉप या हार्ड फोर्क के बाद लागत आधार रिकॉर्ड अपडेट करें।`
      ],
      validation: [
      `समर्पित क्रिप्टो टैक्स सॉफ़्टवेयर के साथ क्रॉस-चेक करें। यदि कुल लाभ आपकी मैन्युअल गणना से 2% से अधिक भिन्न है, तो विसंगति की जांच करें।`,
      `प्रत्येक खरीद के लिए मूल एक्सचेंज पुष्टि को ट्रेस करके अपने लागत आधार को सत्यापित करें।`
      ],
    },
    ru: {
      interpret: [
      `Налоговый калькулятор выводит три показателя: краткосрочный прирост капитала (удерживается менее 1 года, облагается как обычный доход в большинстве юрисдикций), долгосрочный прирост капитала (удерживается более 1 года, более низкая ставка) и общее налоговое обязательство по введённой ставке.`,
      `Эффективная сумма налога применяется только к реализованной прибыли, а не к полной выручке от продажи. Если вы вошли по $5 000 и вышли по $8 000, налогооблагаемая прибыль равна $3 000 — не $8 000.`
      ],
      scenarios: [
      `Планирование убытков для снижения налогов: ближе к концу года вводите позиции с нереализованными убытками, чтобы рассчитать экономию на налогах от продажи и обратного выкупа (tax-loss harvesting). Сравните экономию с транзакционными издержками туда-обратно.`,
      `Стратегия реализации: если вы держите одну монету, купленную по нескольким ценам, используйте калькулятор для сравнения FIFO и метода конкретных лотов. Выбор лотов с наибольшей себестоимостью максимизирует базу и минимизирует налогооблагаемую прибыль.`
      ],
      checklist: [
      `Перед расчётом: 1) Уточните налоговую ставку для краткосрочных и долгосрочных доходов в своей юрисдикции. 2) Рассчитайте точную себестоимость с учётом комиссий, уплаченных при покупке. 3) Определите период владения с точностью до дня.`,
      `После расчёта: отметьте, является ли доход реализованным (актив уже продан) или нереализованным (оценка будущей продажи). Налоги начисляются только на реализованную прибыль в большинстве юрисдикций.`
      ],
      mistakes: [
      `Использование выручки от продажи в качестве налогооблагаемой суммы вместо прибыли — наиболее дорогостоящая ошибка. Налог начисляется на (выручка − себестоимость − комиссии), а не на всю выручку.`,
      `Игнорирование комиссий в себестоимости: транзакционные комиссии, уплаченные при покупке, увеличивают себестоимость и тем самым уменьшают налогооблагаемую прибыль. На покупке $10 000 с комиссией 0.5% ($50) себестоимость составляет $10 050.`
      ],
      benchmarks: [
      `Налоговое преимущество удержания более 12 месяцев в юрисдикциях с дифференцированными ставками легко может превысить 15–20% от прибыли.`,
      `Сравните реализованное налоговое обязательство по крипто с общей доходностью портфеля. Если налоги превышают 25% доходов, изучите стратегии снижения налоговой нагрузки.`
      ],
      execution: [
      `Процесс в конце года: 1) Загрузите полную историю сделок со всех бирж. 2) Рассчитайте себестоимость для каждой реализации. 3) Разделите краткосрочные и долгосрочные реализации. 4) Суммируйте чистые доходы и убытки по каждой категории. 5) Запустите калькулятор для оценки обязательства перед подачей декларации.`,
      `Используйте калькулятор в середине года для прогнозирования годового налогового обязательства. В случае высокодоходного года рассмотрите реализацию убытков в других частях портфеля для компенсации.`
      ],
      hygiene: [
      `Ведите записи каждой сделки: дата, сумма, себестоимость, выручка, комиссии, период владения. Многие юрисдикции требуют хранить записи 5–7 лет. Делайте облачные резервные копии всех выписок с бирж.`,
      `Обновляйте записи себестоимости после каждого вознаграждения от стейкинга, аирдропа или хард-форка — эти события создают налогооблагаемый доход по справедливой рыночной стоимости на дату получения.`
      ],
      validation: [
      `Сверьтесь с специализированным криптовалютным налоговым ПО (Koinly, CoinTracker, TokenTax). Если общая прибыль расходится с вашим расчётом более чем на 2%, выясните расхождение — это часто выявляет пропущенную сделку или неверную себестоимость.`,
      `Проверьте себестоимость, отследив исходное биржевое подтверждение для каждой покупки. Импортированные CSV-файлы иногда содержат ошибки.`
      ],
    },
  },
  'what-if': {
    en: {
      interpret: [
      `The what-if calculator shows the hypothetical value of a past investment: if you had invested $X in coin Y on date Z, your position would be worth $W today. The raw output is the current value and the percentage gain or loss. More useful is separating the price appreciation component from the compounding effect of time — a 10× return in 1 year is very different from 10× in 10 years in terms of implied annual return.`,
      `The annualized return (CAGR) is the single most comparable metric across different assets and timeframes. A 400% total return over 5 years equals a 38% CAGR — comparable to an S&P 500 year but over a multi-year crypto bull run. Use this to set realistic future expectations and compare crypto against alternative assets.`
      ],
      scenarios: [
      `Regret analysis and calibration: enter past dates when you researched but did not buy to quantify the missed opportunity cost. Use this not for regret, but to calibrate how much conviction justifies action and to identify which research signals preceded the best entries.`,
      `Alternative asset comparison: run the same hypothetical investment in BTC, ETH, and the S&P 500 over the same timeframe. This reveals the relative opportunity cost of holding one asset over another and helps set realistic expectations for future allocation decisions.`
      ],
      checklist: [
      `Before running a what-if scenario: 1) Choose a specific date with documented context (when you first heard about the coin, when a major event occurred). 2) Use a realistic investment amount — not artificially high to maximize the "regret figure." 3) Verify the historical price source is reliable — CoinGecko data is generally accurate to within 0.5% for major coins.`,
      `After reviewing the output: divide the total gain by the number of years held to get the implied annual return. Compare that annual return to what you actually achieved in your portfolio over the same period to identify the realistic opportunity cost.`
      ],
      mistakes: [
      `Survivor bias: running what-if scenarios only on successful coins (BTC at $1 in 2011) produces impossibly optimistic results. Balance your analysis by also running the same scenario on coins that failed or lost 90%+ of value during the same period to calibrate realistic expectations.`,
      `Using what-if results as the basis for current investment decisions is a logical error. Past performance of a specific coin during a specific macro regime (low interest rates, high liquidity) does not predict future performance in a different macro environment. Use it for calibration, not as a signal.`
      ],
      benchmarks: [
      `A fair benchmark is the S&P 500's CAGR of ≈10% over the same period. If a crypto what-if scenario shows a 10-year CAGR of 15–20%, that represents meaningful outperformance. If it shows 8% CAGR, a simple equity index fund would have performed comparably with much lower volatility.`,
      `Compare what-if returns to the risk taken: Bitcoin's maximum drawdown has exceeded 80% multiple times. If your 5-year BTC what-if shows a 200% return, calculate whether you could have actually held through an 80% drawdown — psychological tolerance for drawdowns is often the limiting factor for retail investors.`
      ],
      execution: [
      `Best use workflow: 1) Pick a date 1–5 years ago. 2) Enter the amount you could realistically have invested at that time. 3) Note the percentage return and CAGR. 4) Compare to actual portfolio performance in that period. 5) Identify what research signals preceded the good entry if any.`,
      `Future projection mode: if the calculator supports it, enter today as the start date and a future date, using an assumed annual growth rate. This converts the what-if tool into a portfolio goal calculator — useful for setting target dates and amounts for specific financial goals.`
      ],
      hygiene: [
      `Refresh historical price data if running the same scenario multiple times — CoinGecko occasionally corrects historical price anomalies (fat-finger trades, exchange errors). A recalculation days apart can show slightly different results for older dates.`,
      `Keep a personal log of your actual investment decisions with dates and amounts alongside what-if scenarios. This creates an objective record of decision quality over time, free from memory bias.`
      ],
      validation: [
      `Cross-check the historical price shown by the calculator against a reliable secondary source (Messari, CoinMarketCap) for the same date. A difference over 1% for major coins on liquid days warrants investigation — likely a timezone discrepancy in price snapshot timing.`,
      `Verify the growth calculation: (current price / entry price − 1) × 100 = percentage return. If that does not match the calculator output, check whether fees or other adjustments are being applied — some tools factor in estimated holding costs.`
      ],
    },
    es: {
      interpret: [
      `El calculador hipotético muestra el valor hipotético de una inversión pasada: si hubieras invertido $X en la moneda Y en la fecha Z, tu posición valdría $W hoy. El resultado bruto es el valor actual y el porcentaje de ganancia o pérdida.`,
      `El retorno anualizado (CAGR) es la métrica más comparable entre diferentes activos y marcos temporales. Un retorno total del 400% en 5 años equivale a un CAGR del 38% — comparable a un buen año del S&P 500 pero durante un mercado alcista cripto de varios años.`
      ],
      scenarios: [
      `Análisis de arrepentimiento y calibración: introduce fechas pasadas en las que investigaste pero no compraste para cuantificar el coste de oportunidad perdido. Úsalo para calibrar cuánta convicción justifica la acción.`,
      `Comparación de activos alternativos: ejecuta la misma inversión hipotética en BTC, ETH y el S&P 500 durante el mismo período. Esto revela el coste de oportunidad relativo de mantener un activo sobre otro.`
      ],
      checklist: [
      `Antes de ejecutar un escenario hipotético: 1) Elige una fecha específica con contexto documentado. 2) Usa un monto de inversión realista. 3) Verifica que la fuente de precios históricos sea confiable.`,
      `Después de revisar la salida: divide la ganancia total por el número de años mantenidos para obtener el retorno anual implícito. Compara ese retorno anual con lo que realmente lograste en tu cartera durante el mismo período.`
      ],
      mistakes: [
      `Sesgo de supervivencia: ejecutar escenarios hipotéticos solo en monedas exitosas produce resultados imposiblemente optimistas. Equilibra tu análisis ejecutando el mismo escenario en monedas que fallaron o perdieron más del 90% de su valor.`,
      `Usar los resultados hipotéticos como base para decisiones de inversión actuales es un error lógico. El rendimiento pasado de una moneda específica no predice el rendimiento futuro.`
      ],
      benchmarks: [
      `Un benchmark justo es el CAGR del S&P 500 de ≈10% durante el mismo período. Si un escenario hipotético cripto muestra un CAGR de 10 años del 15–20%, eso representa un rendimiento superior significativo.`,
      `Compara los retornos hipotéticos con el riesgo asumido: la caída máxima de Bitcoin ha superado el 80% varias veces.`
      ],
      execution: [
      `Mejor flujo de trabajo: 1) Elige una fecha de hace 1–5 años. 2) Introduce el monto que realísticamente podrías haber invertido. 3) Anota el porcentaje de retorno y el CAGR. 4) Compara con el rendimiento real de la cartera en ese período.`,
      `Modo de proyección futura: si el calculador lo soporta, introduce hoy como fecha de inicio y una fecha futura, usando una tasa de crecimiento anual asumida.`
      ],
      hygiene: [
      `Actualiza los datos de precios históricos si ejecutas el mismo escenario varias veces — CoinGecko ocasionalmente corrige anomalías de precios históricos.`,
      `Mantén un registro personal de tus decisiones reales de inversión con fechas y montos junto a los escenarios hipotéticos.`
      ],
      validation: [
      `Verifica el precio histórico mostrado por el calculador con una fuente secundaria confiable para la misma fecha.`,
      `Verifica el cálculo de crecimiento: (precio actual / precio de entrada − 1) × 100 = porcentaje de retorno.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora hipotética mostra o valor hipotético de um investimento passado: se você tivesse investido $X na moeda Y na data Z, sua posição valeria $W hoje. O resultado bruto é o valor atual e o percentual de ganho ou perda.`,
      `O retorno anualizado (CAGR) é a métrica mais comparável entre diferentes ativos e períodos. Um retorno total de 400% em 5 anos equivale a um CAGR de 38%.`
      ],
      scenarios: [
      `Análise de arrependimento e calibração: insira datas passadas em que pesquisou mas não comprou para quantificar o custo de oportunidade perdido.`,
      `Comparação de ativos alternativos: execute o mesmo investimento hipotético em BTC, ETH e S&P 500 durante o mesmo período.`
      ],
      checklist: [
      `Antes de executar um cenário hipotético: 1) Escolha uma data específica com contexto documentado. 2) Use um valor de investimento realista. 3) Verifique se a fonte de preços históricos é confiável.`,
      `Após revisar a saída: divida o ganho total pelo número de anos mantidos para obter o retorno anual implícito.`
      ],
      mistakes: [
      `Viés de sobrevivência: executar cenários hipotéticos apenas em moedas bem-sucedidas produz resultados impossívelmente otimistas. Equilibre sua análise executando o mesmo cenário em moedas que falharam.`,
      `Usar resultados hipotéticos como base para decisões de investimento atuais é um erro lógico.`
      ],
      benchmarks: [
      `Um benchmark justo é o CAGR do S&P 500 de ≈10% durante o mesmo período.`,
      `Compare os retornos hipotéticos com o risco assumido: o drawdown máximo do Bitcoin superou 80% várias vezes.`
      ],
      execution: [
      `Melhor fluxo de trabalho: 1) Escolha uma data de 1–5 anos atrás. 2) Insira o valor que você poderia realisticamente ter investido. 3) Anote o percentual de retorno e o CAGR. 4) Compare com o desempenho real da carteira nesse período.`,
      `Modo de projeção futura: se a calculadora suportar, insira hoje como data de início e uma data futura, usando uma taxa de crescimento anual assumida.`
      ],
      hygiene: [
      `Atualize os dados de preços históricos se executar o mesmo cenário várias vezes.`,
      `Mantenha um registro pessoal das suas decisões reais de investimento com datas e valores.`
      ],
      validation: [
      `Verifique o preço histórico mostrado pela calculadora com uma fonte secundária confiável para a mesma data.`,
      `Verifique o cálculo de crescimento: (preço atual / preço de entrada − 1) × 100 = percentual de retorno.`
      ],
    },
    tr: {
      interpret: [
      `Varsayım hesaplayıcısı, geçmiş bir yatırımın varsayımsal değerini gösterir: X tarihinde Y coin'e $Z yatırsaydınız, pozisyonunuz bugün $W değerinde olurdu.`,
      `Yıllık bileşik büyüme oranı (CAGR), farklı varlıklar ve zaman dilimleri arasında karşılaştırılabilir tek metriktir.`
      ],
      scenarios: [
      `Pişmanlık analizi ve kalibrasyon: araştırdığınız ancak satın almadığınız geçmiş tarihleri girerek kaçırılan fırsat maliyetini ölçün.`,
      `Alternatif varlık karşılaştırması: aynı dönemde BTC, ETH ve S&P 500'de aynı varsayımsal yatırımı çalıştırın.`
      ],
      checklist: [
      `Bir varsayım senaryosu çalıştırmadan önce: 1) Belgelenmiş bağlamı olan belirli bir tarih seçin. 2) Gerçekçi bir yatırım tutarı kullanın. 3) Tarihsel fiyat kaynağının güvenilir olduğunu doğrulayın.`,
      `Çıktıyı inceledikten sonra: zımni yıllık getiriyi elde etmek için toplam kazancı tutulan yıl sayısına bölün.`
      ],
      mistakes: [
      `Hayatta kalma önyargısı: varsayım senaryolarını yalnızca başarılı coin'lerde çalıştırmak olanaksız derecede iyimser sonuçlar üretir.`,
      `Varsayım sonuçlarını mevcut yatırım kararları için temel olarak kullanmak mantıksal bir hatadır.`
      ],
      benchmarks: [
      `Adil bir referans noktası, aynı dönemde S&P 500'ün ≈%10'luk CAGR'ıdır.`,
      `Varsayım getirilerini alınan riskle karşılaştırın: Bitcoin'in maksimum düşüşü birden fazla kez %80'i aştı.`
      ],
      execution: [
      `En iyi iş akışı: 1) 1–5 yıl önceki bir tarih seçin. 2) O dönemde gerçekçi olarak yatırabileceğiniz tutarı girin. 3) Yüzde getirisini ve CAGR'ı not edin.`,
      `Gelecek projeksiyon modu: hesaplayıcı destekliyorsa, başlangıç tarihi olarak bugünü ve gelecekteki bir tarihi, varsayılan bir yıllık büyüme oranı kullanarak girin.`
      ],
      hygiene: [
      `Aynı senaryoyu birden fazla kez çalıştırırsanız tarihsel fiyat verilerini yenileyin.`,
      `Gerçek yatırım kararlarınızın tarihler ve tutarlarla birlikte kişisel bir kaydını tutun.`
      ],
      validation: [
      `Hesaplayıcının gösterdiği tarihsel fiyatı aynı tarih için güvenilir ikincil bir kaynakla çapraz kontrol edin.`,
      `Büyüme hesaplamayı doğrulayın: (güncel fiyat / giriş fiyatı − 1) × 100 = yüzde getiri.`
      ],
    },
    hi: {
      interpret: [
      `वॉट-इफ कैलकुलेटर एक पिछले निवेश का काल्पनिक मूल्य दिखाता है: यदि आपने तारीख Z पर कॉइन Y में $X निवेश किया होता, तो आपकी पोजीशन आज $W होती।`,
      `वार्षिक रिटर्न (CAGR) विभिन्न संपत्तियों और समय-सीमाओं में सबसे तुलनीय मेट्रिक है।`
      ],
      scenarios: [
      `पछतावा विश्लेषण और अंशांकन: उन पिछली तारीखों को दर्ज करें जब आपने शोध किया लेकिन खरीदा नहीं, ताकि छूटी हुई अवसर लागत को मापा जा सके।`,
      `वैकल्पिक संपत्ति तुलना: उसी समय-सीमा में BTC, ETH और S&P 500 में वही काल्पनिक निवेश चलाएं।`
      ],
      checklist: [
      `वॉट-इफ परिदृश्य चलाने से पहले: 1) दस्तावेज़ीकृत संदर्भ वाली एक विशिष्ट तारीख चुनें। 2) यथार्थवादी निवेश राशि का उपयोग करें। 3) सत्यापित करें कि ऐतिहासिक मूल्य स्रोत विश्वसनीय है।`,
      `आउटपुट की समीक्षा के बाद: निहित वार्षिक रिटर्न प्राप्त करने के लिए कुल लाभ को आयोजित वर्षों की संख्या से विभाजित करें।`
      ],
      mistakes: [
      `उत्तरजीविता पूर्वाग्रह: केवल सफल कॉइनों पर वॉट-इफ परिदृश्य चलाना असंभव रूप से आशावादी परिणाम देता है।`,
      `वर्तमान निवेश निर्णयों के आधार के रूप में वॉट-इफ परिणामों का उपयोग करना एक तार्किक त्रुटि है।`
      ],
      benchmarks: [
      `एक उचित बेंचमार्क उसी अवधि में S&P 500 का ≈10% CAGR है।`,
      `काल्पनिक रिटर्न की तुलना लिए गए जोखिम से करें: Bitcoin का अधिकतम ड्रॉडाउन कई बार 80% से अधिक रहा है।`
      ],
      execution: [
      `सर्वोत्तम वर्कफ़्लो: 1) 1–5 साल पहले की एक तारीख चुनें। 2) उस समय आप जो यथार्थवादी रूप से निवेश कर सकते थे वह राशि दर्ज करें। 3) प्रतिशत रिटर्न और CAGR नोट करें।`,
      `भविष्य प्रक्षेपण मोड: यदि कैलकुलेटर समर्थन करता है, तो आज को प्रारंभ तारीख और एक भविष्य की तारीख दर्ज करें, एक माना हुआ वार्षिक विकास दर का उपयोग करके।`
      ],
      hygiene: [
      `यदि आप एक ही परिदृश्य कई बार चलाते हैं तो ऐतिहासिक मूल्य डेटा रीफ्रेश करें।`,
      `तारीखों और राशियों के साथ अपने वास्तविक निवेश निर्णयों का व्यक्तिगत लॉग रखें।`
      ],
      validation: [
      `एक विश्वसनीय द्वितीयक स्रोत के साथ उसी तारीख के लिए कैलकुलेटर द्वारा दिखाई गई ऐतिहासिक कीमत को क्रॉस-चेक करें।`,
      `विकास गणना को सत्यापित करें: (वर्तमान मूल्य / प्रवेश मूल्य − 1) × 100 = प्रतिशत रिटर्न।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор «что если» показывает гипотетическую стоимость прошлых инвестиций: если бы вы вложили $X в монету Y на дату Z, ваша позиция сейчас стоила бы $W. Необработанный вывод — текущая стоимость и процентный доход или убыток.`,
      `Годовая доходность (CAGR) — наиболее сопоставимый показатель по разным активам и временным интервалам. Полный доход 400% за 5 лет соответствует CAGR 38% — сравнимо с хорошим годом S&P 500, но на многолетнем крипто-бычьем рынке.`
      ],
      scenarios: [
      `Анализ упущенных возможностей: вводите прошлые даты, когда вы исследовали, но не покупали, чтобы количественно оценить стоимость упущенной возможности. Используйте это для калибровки, а не для сожалений.`,
      `Сравнение альтернативных активов: запустите одно и то же гипотетическое вложение в BTC, ETH и S&P 500 за тот же период. Это показывает относительные альтернативные издержки.`
      ],
      checklist: [
      `Перед запуском сценария: 1) Выберите конкретную дату с задокументированным контекстом. 2) Используйте реалистичную сумму инвестиций — не искусственно завышенную. 3) Убедитесь в надёжности источника исторических цен.`,
      `После ознакомления с результатом: разделите общий доход на количество лет владения, чтобы получить подразумеваемую годовую доходность. Сравните с реальной доходностью портфеля за тот же период.`
      ],
      mistakes: [
      `Выживательный уклон: запуск сценариев «что если» только на успешных монетах (BTC по $1 в 2011 г.) даёт нереалистично оптимистичные результаты. Для калибровки добавьте аналогичные сценарии для монет, которые потерпели неудачу или потеряли 90%+ стоимости.`,
      `Использование результатов «что если» как основы для текущих инвестиционных решений — логическая ошибка. Прошлая доходность конкретной монеты в конкретной макросреде не предсказывает будущей доходности.`
      ],
      benchmarks: [
      `Справедливый бенчмарк — CAGR S&P 500 ≈10% за тот же период. Если крипто-сценарий «что если» показывает 10-летний CAGR 15–20%, это представляет значительное превышение доходности.`,
      `Сравните гипотетические доходы с принятым риском: максимальная просадка Bitcoin неоднократно превышала 80%.`
      ],
      execution: [
      `Оптимальный рабочий процесс: 1) Выберите дату 1–5 лет назад. 2) Введите сумму, которую вы могли бы реально инвестировать тогда. 3) Запишите процентный доход и CAGR. 4) Сравните с реальной доходностью портфеля за тот период.`,
      `Режим прогнозирования: если калькулятор поддерживает, введите сегодня как начальную дату и будущую дату, задав предполагаемый ежегодный темп роста.`
      ],
      hygiene: [
      `Обновляйте исторические данные о ценах при повторном запуске того же сценария — CoinGecko периодически исправляет аномалии исторических цен.`,
      `Ведите личный журнал реальных инвестиционных решений с датами и суммами наряду со сценариями «что если».`
      ],
      validation: [
      `Проверьте историческую цену, показанную калькулятором, по надёжному вторичному источнику (Messari, CoinMarketCap) для той же даты. Разница более 1% для крупных монет в ликвидные дни требует изучения.`,
      `Проверьте расчёт роста: (текущая цена / цена входа − 1) × 100 = процентный доход. Если результат не совпадает с выводом калькулятора, проверьте, не применяются ли корректировки.`
      ],
    },
  },


  'position-size-calculator': {
    en: {
      interpret: [
      `The position size output tells you the maximum number of coins (or contracts) to buy given your account size, risk percentage, and stop-loss distance. The key output to act on is the dollar risk ($account × risk%). This number is fixed regardless of the trade result — if your stop is hit you lose exactly this amount, not more. The position size is derived to enforce this fixed-loss constraint.`,
      `Secondary outputs include the required margin at your chosen leverage and the potential profit at target (using your risk-reward ratio). The ratio of potential profit to risk shows whether the trade has positive expectancy. Below 2:1 reward-to-risk, a trade requires over 67% win rate to be profitable long-term — check this number before entering any position.`
      ],
      scenarios: [
      `New trader risk calibration: start with 0.5% account risk per trade for the first 3 months. Run every potential trade through this calculator before executing. When your win rate and risk-reward are documented over 50+ trades, you have the data to decide whether increasing risk to 1–2% is justified.`,
      `Volatility adjustment: during high-volatility events (earnings, protocol upgrades, macro news), widen your stop-loss to avoid being stopped out by noise, and simultaneously reduce position size to maintain the same dollar risk. This calculator lets you instantly see the adjusted position size for a wider stop.`
      ],
      checklist: [
      `Before sizing a position: 1) Confirm your total account value — use yesterday's close, not current value mid-session. 2) Set risk percent at 1% or below until you have 50+ documented trades showing positive expectancy. 3) Place your stop at a technically justified level (below support, above resistance) — never set a stop by desired dollar loss and then justify a technical level.`,
      `After calculating: verify the resulting position size fits within available margin at your preferred leverage. If it exceeds 3–5× your calculated minimum viable position, reconsider the trade size.`
      ],
      mistakes: [
      `Risking more than 2% per trade is the most common account-destroying mistake. Three consecutive losses at 2% risk = 5.88% drawdown. Three at 5% = 14.3% drawdown. Recovery math is asymmetric: a 20% loss requires a 25% gain to recover; a 50% loss requires a 100% gain. Keep risk small to stay in the game.`,
      `Using a round-number stop (e.g., "I'll stop out if it drops $500") instead of a technically justified level leads to arbitrary position sizing. Always determine your stop level first, then calculate position size — never the reverse.`
      ],
      benchmarks: [
      `Professional traders risk 0.5–1% per trade. Retail best practice is 1–2%. Anything above 2% per trade is considered high-risk speculation. If your calculated position size requires risking 3%+ to make a trade worth taking, the trade setup is not well-suited to your account size — skip it.`,
      `Your calculated maximum position should not exceed 10% of your total account value in any single asset when using spot (no leverage). With leverage, the notional position value should not exceed 5× your account for most strategies to maintain survivability through 80% drawdowns in the underlying.`
      ],
      execution: [
      `Standard pre-trade process: 1) Identify entry price and stop-loss level on the chart. 2) Open position size calculator. 3) Enter account balance, risk%, entry price, stop price. 4) Record the exact quantity the calculator outputs. 5) Enter that exact quantity into the exchange order form. Do not round up "to a nicer number" — rounding up violates your risk rule.`,
      `For DCA entries: if you plan to add to a position at lower prices, calculate position size using your average planned entry, not just the first entry. Over-sizing the first leg when you plan to add is a common error that can leave you fully invested before your best planned entry price.`
      ],
      hygiene: [
      `Recalculate account balance at the start of each trading week. A winning week means your dollar risk per trade increases (1% of a larger account). A losing week means it shrinks — this anti-martingale property of fixed-percentage risk is protective and requires updating the base balance regularly.`,
      `If you change your risk-reward requirements (e.g., only take 3:1 trades instead of 2:1), document this change in your trading journal and recalculate all pending trade setups to confirm they still meet the new standard.`
      ],
      validation: [
      `Verify: (position size in coins × stop distance in dollars) should equal your dollar risk ($account × risk%). If this calculation does not balance, there is an input error — recheck entry price and stop price for decimal alignment.`,
      `After placing the trade, confirm the exchange shows the exact quantity you calculated. If your exchange rounds to fewer decimal places, the actual risk may slightly exceed your target — acceptable if within 5% of plan.`
      ],
    },
    es: {
      interpret: [
      `La salida del tamaño de posición indica el número máximo de monedas (o contratos) a comprar dado el tamaño de tu cuenta, el porcentaje de riesgo y la distancia del stop-loss. El resultado clave es el riesgo en dólares ($cuenta × riesgo%). Este número es fijo independientemente del resultado de la operación.`,
      `Las salidas secundarias incluyen el margen requerido con tu apalancamiento elegido y el beneficio potencial en el objetivo. La relación entre el beneficio potencial y el riesgo muestra si la operación tiene expectativa positiva. Por debajo de 2:1 recompensa-riesgo, una operación requiere más del 67% de tasa de victorias para ser rentable a largo plazo.`
      ],
      scenarios: [
      `Calibración de riesgo para nuevos traders: comienza con un 0.5% de riesgo de cuenta por operación durante los primeros 3 meses. Ejecuta cada operación potencial a través de este calculador antes de ejecutarla.`,
      `Ajuste por volatilidad: durante eventos de alta volatilidad, amplía tu stop-loss para evitar ser expulsado por el ruido, y simultáneamente reduce el tamaño de posición para mantener el mismo riesgo en dólares.`
      ],
      checklist: [
      `Antes de dimensionar una posición: 1) Confirma el valor total de tu cuenta. 2) Fija el porcentaje de riesgo en 1% o menos hasta tener 50+ operaciones documentadas con expectativa positiva. 3) Coloca tu stop en un nivel técnicamente justificado.`,
      `Después de calcular: verifica que el tamaño de posición resultante encaje dentro del margen disponible con tu apalancamiento preferido.`
      ],
      mistakes: [
      `Arriesgar más del 2% por operación es el error más común que destruye cuentas. Tres pérdidas consecutivas al 2% = 5.88% de caída. Tres al 5% = 14.3% de caída.`,
      `Usar un stop de número redondo en lugar de un nivel técnicamente justificado lleva a un dimensionamiento de posición arbitrario.`
      ],
      benchmarks: [
      `Los traders profesionales arriesgan el 0.5–1% por operación. La mejor práctica para minoristas es del 1–2%. Cualquier cosa por encima del 2% por operación se considera especulación de alto riesgo.`,
      `Tu posición máxima calculada no debería superar el 10% del valor total de tu cuenta en un solo activo al operar en spot.`
      ],
      execution: [
      `Proceso estándar previo a la operación: 1) Identifica el precio de entrada y el nivel de stop-loss en el gráfico. 2) Abre el calculador de tamaño de posición. 3) Introduce el saldo de la cuenta, el riesgo%, el precio de entrada y el precio de stop. 4) Registra la cantidad exacta que el calculador produce.`,
      `Para entradas DCA: si planeas añadir a una posición a precios más bajos, calcula el tamaño de posición usando tu precio de entrada promedio planificado, no solo el primero.`
      ],
      hygiene: [
      `Recalcula el saldo de la cuenta al inicio de cada semana de trading. Una semana ganadora significa que tu riesgo en dólares por operación aumenta.`,
      `Si cambias tus requisitos de riesgo-recompensa, documenta este cambio en tu diario de trading y recalcula todas las configuraciones de operaciones pendientes.`
      ],
      validation: [
      `Verifica: (tamaño de posición en monedas × distancia de stop en dólares) debe ser igual a tu riesgo en dólares ($cuenta × riesgo%). Si este cálculo no cuadra, hay un error de entrada.`,
      `Después de colocar la operación, confirma que el exchange muestra la cantidad exacta que calculaste.`
      ],
    },
    pt: {
      interpret: [
      `A saída de tamanho de posição indica o número máximo de moedas (ou contratos) a comprar dado o tamanho da sua conta, o percentual de risco e a distância do stop-loss. O resultado-chave é o risco em dólares ($conta × risco%).`,
      `As saídas secundárias incluem a margem necessária com sua alavancagem escolhida e o lucro potencial no alvo. A relação entre lucro potencial e risco mostra se a operação tem expectativa positiva.`
      ],
      scenarios: [
      `Calibração de risco para novos traders: comece com 0.5% de risco de conta por operação durante os primeiros 3 meses. Execute cada operação potencial através desta calculadora antes de executá-la.`,
      `Ajuste de volatilidade: durante eventos de alta volatilidade, amplie seu stop-loss e simultaneamente reduza o tamanho da posição para manter o mesmo risco em dólares.`
      ],
      checklist: [
      `Antes de dimensionar uma posição: 1) Confirme o valor total da sua conta. 2) Defina o percentual de risco em 1% ou abaixo até ter 50+ operações documentadas com expectativa positiva. 3) Coloque seu stop em um nível tecnicamente justificado.`,
      `Após calcular: verifique se o tamanho de posição resultante cabe dentro da margem disponível com sua alavancagem preferida.`
      ],
      mistakes: [
      `Arriscar mais de 2% por operação é o erro mais comum que destrói contas. Três perdas consecutivas a 2% = 5.88% de queda.`,
      `Usar um stop de número redondo em vez de um nível tecnicamente justificado leva a dimensionamento de posição arbitrário.`
      ],
      benchmarks: [
      `Traders profissionais arriscam 0.5–1% por operação. A melhor prática para varejo é 1–2%. Qualquer coisa acima de 2% por operação é considerada especulação de alto risco.`,
      `Sua posição máxima calculada não deve exceder 10% do valor total da sua conta em um único ativo no spot.`
      ],
      execution: [
      `Processo padrão pré-operação: 1) Identifique o preço de entrada e o nível de stop-loss no gráfico. 2) Abra a calculadora de tamanho de posição. 3) Insira saldo da conta, risco%, preço de entrada e preço de stop. 4) Registre a quantidade exata que a calculadora produz.`,
      `Para entradas DCA: se planeja adicionar a uma posição a preços mais baixos, calcule o tamanho usando seu preço médio planejado de entrada, não apenas o primeiro.`
      ],
      hygiene: [
      `Recalcule o saldo da conta no início de cada semana de trading.`,
      `Se alterar seus requisitos de risco-recompensa, documente essa mudança no seu diário de trading.`
      ],
      validation: [
      `Verifique: (tamanho de posição em moedas × distância do stop em dólares) deve ser igual ao seu risco em dólares.`,
      `Após colocar a operação, confirme que a exchange mostra a quantidade exata que você calculou.`
      ],
    },
    tr: {
      interpret: [
      `Pozisyon büyüklüğü çıktısı, hesabınızın boyutu, risk yüzdesi ve stop-loss mesafesi göz önüne alındığında satın alınacak maksimum coin (veya sözleşme) sayısını söyler. Üzerinde işlem yapılacak temel çıktı, dolar riskidir ($hesap × risk%).`,
      `İkincil çıktılar, seçilen kaldıraçta gereken marjı ve hedefteki potansiyel kârı içerir. Potansiyel kâr-risk oranı, işlemin pozitif beklentiye sahip olup olmadığını gösterir.`
      ],
      scenarios: [
      `Yeni trader risk kalibrasyonu: ilk 3 ay boyunca işlem başına %0.5 hesap riski ile başlayın. Her potansiyel işlemi gerçekleştirmeden önce bu hesaplayıcıdan geçirin.`,
      `Oynaklık ayarlaması: yüksek oynaklık olaylarında stop-loss'u genişletin ve aynı dolar riskini korumak için aynı anda pozisyon büyüklüğünü azaltın.`
      ],
      checklist: [
      `Bir pozisyon boyutlandırmadan önce: 1) Toplam hesap değerini onaylayın. 2) Pozitif beklentiyi gösteren 50+ belgelenmiş işlem elde edene kadar risk yüzdesini %1 veya altında tutun. 3) Teknik olarak gerekçelendirilmiş bir düzeyde stop yerleştirin.`,
      `Hesapladıktan sonra: elde edilen pozisyon büyüklüğünün tercih edilen kaldıraçta mevcut marjına sığdığını doğrulayın.`
      ],
      mistakes: [
      `İşlem başına %2'den fazla risk almak hesabı yok eden en yaygın hatadır. %2 riskle üç ardışık kayıp = %5.88 düşüş.`,
      `Teknik olarak gerekçelendirilmiş bir düzey yerine yuvarlak sayılı bir stop kullanmak keyfi pozisyon boyutlandırmasına yol açar.`
      ],
      benchmarks: [
      `Profesyonel traderlar işlem başına %0.5–1 risk alır. Perakende için en iyi uygulama %1–2'dir. İşlem başına %2'nin üzerindeki her şey yüksek riskli spekülasyon olarak kabul edilir.`,
      `Hesaplanan maksimum pozisyonunuz spot işlemde tek bir varlıkta toplam hesap değerinizin %10'unu aşmamalıdır.`
      ],
      execution: [
      `Standart işlem öncesi süreç: 1) Grafikteki giriş fiyatını ve stop-loss düzeyini belirleyin. 2) Pozisyon büyüklüğü hesaplayıcısını açın. 3) Hesap bakiyesi, risk%, giriş fiyatı ve stop fiyatını girin. 4) Hesaplayıcının çıktısı olan tam miktarı kaydedin.`,
      `DCA girişleri için: daha düşük fiyatlardan pozisyona eklemeyi planlıyorsanız, yalnızca ilk giriş değil, planlanan ortalama giriş fiyatını kullanarak pozisyon büyüklüğünü hesaplayın.`
      ],
      hygiene: [
      `Her trading haftasının başında hesap bakiyesini yeniden hesaplayın.`,
      `Risk-ödül gereksinimlerinizi değiştirirseniz, bu değişikliği trading günlüğünüzde belgeleyin.`
      ],
      validation: [
      `Doğrulayın: (coin cinsinden pozisyon büyüklüğü × dolar cinsinden stop mesafesi) dolar riskinize eşit olmalıdır.`,
      `İşlemi yerleştirdikten sonra borsanın hesapladığınız tam miktarı gösterdiğini onaylayın.`
      ],
    },
    hi: {
      interpret: [
      `पोजीशन साइज आउटपुट आपको बताता है कि आपके खाते के आकार, जोखिम प्रतिशत और स्टॉप-लॉस दूरी को देखते हुए खरीदने के लिए अधिकतम कॉइन (या अनुबंध) की संख्या। मुख्य आउटपुट डॉलर जोखिम ($खाता × जोखिम%) है।`,
      `द्वितीयक आउटपुट में आपके चुने हुए उत्तोलन पर आवश्यक मार्जिन और लक्ष्य पर संभावित लाभ शामिल हैं। संभावित लाभ-से-जोखिम का अनुपात दिखाता है कि ट्रेड में सकारात्मक अपेक्षा है या नहीं।`
      ],
      scenarios: [
      `नए ट्रेडर जोखिम अंशांकन: पहले 3 महीनों के लिए प्रति ट्रेड 0.5% खाता जोखिम से शुरू करें। निष्पादित करने से पहले प्रत्येक संभावित ट्रेड को इस कैलकुलेटर के माध्यम से चलाएं।`,
      `अस्थिरता समायोजन: उच्च-अस्थिरता घटनाओं के दौरान, अपना स्टॉप-लॉस बढ़ाएं और एक साथ समान डॉलर जोखिम बनाए रखने के लिए पोजीशन साइज घटाएं।`
      ],
      checklist: [
      `पोजीशन साइज करने से पहले: 1) अपने कुल खाते के मूल्य की पुष्टि करें। 2) सकारात्मक अपेक्षा दिखाने वाले 50+ दस्तावेज़ीकृत ट्रेड होने तक जोखिम प्रतिशत 1% या उससे कम पर सेट करें। 3) अपना स्टॉप तकनीकी रूप से उचित स्तर पर रखें।`,
      `गणना के बाद: सत्यापित करें कि परिणामी पोजीशन साइज आपके पसंदीदा उत्तोलन पर उपलब्ध मार्जिन के भीतर फिट बैठता है।`
      ],
      mistakes: [
      `प्रति ट्रेड 2% से अधिक जोखिम लेना सबसे आम खाता-नष्ट करने वाली गलती है। 2% जोखिम पर तीन लगातार नुकसान = 5.88% ड्रॉडाउन।`,
      `तकनीकी रूप से उचित स्तर के बजाय गोल-नंबर स्टॉप का उपयोग करना मनमाने पोजीशन साइजिंग की ओर ले जाता है।`
      ],
      benchmarks: [
      `पेशेवर ट्रेडर प्रति ट्रेड 0.5–1% जोखिम लेते हैं। खुदरा सर्वोत्तम अभ्यास 1–2% है। प्रति ट्रेड 2% से अधिक कुछ भी उच्च-जोखिम सट्टा माना जाता है।`,
      `आपकी परिकलित अधिकतम पोजीशन स्पॉट में किसी एकल संपत्ति में आपके कुल खाता मूल्य के 10% से अधिक नहीं होनी चाहिए।`
      ],
      execution: [
      `मानक पूर्व-ट्रेड प्रक्रिया: 1) चार्ट पर प्रवेश मूल्य और स्टॉप-लॉस स्तर पहचानें। 2) पोजीशन साइज कैलकुलेटर खोलें। 3) खाता शेष, जोखिम%, प्रवेश मूल्य, स्टॉप मूल्य दर्ज करें। 4) कैलकुलेटर जो सटीक मात्रा देता है उसे रिकॉर्ड करें।`,
      `DCA प्रविष्टियों के लिए: यदि आप कम कीमतों पर पोजीशन में जोड़ने की योजना बनाते हैं, तो केवल पहले प्रवेश के बजाय अपने नियोजित औसत प्रवेश का उपयोग करके पोजीशन साइज की गणना करें।`
      ],
      hygiene: [
      `प्रत्येक ट्रेडिंग सप्ताह की शुरुआत में खाते के शेष की पुनः गणना करें।`,
      `यदि आप अपनी जोखिम-इनाम आवश्यकताओं को बदलते हैं, तो इस बदलाव को अपने ट्रेडिंग जर्नल में दस्तावेज़ित करें।`
      ],
      validation: [
      `सत्यापित करें: (कॉइन में पोजीशन साइज × डॉलर में स्टॉप दूरी) आपके डॉलर जोखिम ($खाता × जोखिम%) के बराबर होनी चाहिए।`,
      `ट्रेड रखने के बाद, पुष्टि करें कि एक्सचेंज आपके द्वारा गणना की गई सटीक मात्रा दिखाता है।`
      ],
    },
    ru: {
      interpret: [
      `Вывод размера позиции показывает максимальное количество монет (или контрактов) для покупки с учётом размера счёта, процента риска и расстояния до стоп-лосса. Ключевой показатель для действий — долларовый риск ($счёт × риск%). Это число фиксировано независимо от исхода сделки.`,
      `Вторичные выводы включают необходимую маржу при выбранном кредитном плече и потенциальную прибыль на целевом уровне. Соотношение потенциальной прибыли к риску показывает, обладает ли сделка положительным математическим ожиданием.`
      ],
      scenarios: [
      `Калибровка риска для новых трейдеров: начните с 0.5% риска счёта на сделку в первые 3 месяца. Прогоняйте каждую потенциальную сделку через этот калькулятор перед исполнением.`,
      `Корректировка на волатильность: в периоды высокой волатильности расширьте стоп-лосс, чтобы не быть выбитым шумом, и одновременно уменьшите размер позиции для сохранения того же долларового риска.`
      ],
      checklist: [
      `Перед расчётом размера позиции: 1) Уточните текущую стоимость счёта. 2) Устанавливайте процент риска на уровне 1% или ниже до получения 50+ задокументированных сделок с положительным ожиданием. 3) Размещайте стоп на технически обоснованном уровне — никогда не определяйте его исходя из желаемой суммы потерь.`,
      `После расчёта: убедитесь, что полученный размер позиции укладывается в доступную маржу при желаемом кредитном плече.`
      ],
      mistakes: [
      `Риск более 2% на сделку — наиболее распространённая ошибка, уничтожающая счёт. Три последовательных убытка при 2% риска = просадка 5.88%. При 5% — 14.3%. Восстановительная математика асимметрична: потеря 20% требует прибыли 25% для восстановления; потеря 50% — прибыли 100%.`,
      `Использование стопа "круглого числа" вместо технически обоснованного уровня приводит к произвольному расчёту размера позиции. Всегда сначала определяйте уровень стопа, затем рассчитывайте размер позиции — никогда в обратном порядке.`
      ],
      benchmarks: [
      `Профессиональные трейдеры рискуют 0.5–1% на сделку. Лучшая практика для розничных инвесторов — 1–2%. Всё, что выше 2% на сделку, считается высокорисковой спекуляцией.`,
      `Расчётная максимальная позиция не должна превышать 10% от общей стоимости счёта в одном активе при спотовой торговле.`
      ],
      execution: [
      `Стандартный процесс перед сделкой: 1) Определите цену входа и уровень стоп-лосса на графике. 2) Откройте калькулятор размера позиции. 3) Введите баланс счёта, риск%, цену входа, цену стопа. 4) Запишите точное количество, выданное калькулятором. 5) Введите именно это количество в форму ордера на бирже.`,
      `Для DCA-входов: если планируете добавлять к позиции по более низким ценам, рассчитывайте размер позиции, используя среднюю планируемую цену входа, а не только первую.`
      ],
      hygiene: [
      `Пересчитывайте баланс счёта в начале каждой торговой недели. Прибыльная неделя означает увеличение долларового риска на сделку (1% от большего счёта).`,
      `При изменении требований к соотношению риск/прибыль документируйте изменение в торговом журнале и пересчитайте все ожидающие торговые ситуации.`
      ],
      validation: [
      `Проверьте: (размер позиции в монетах × расстояние стопа в долларах) должно равняться долларовому риску ($счёт × риск%). Если расчёт не сходится, есть ошибка ввода.`,
      `После размещения сделки убедитесь, что биржа показывает точное количество, рассчитанное вами.`
      ],
    },
  },
  'liquidation-calculator': {
    en: {
      interpret: [
      `The liquidation price is the exact price at which your exchange will automatically close your position to prevent your account balance from going negative. At leverage of 10×, a 10% move against you eliminates 100% of your margin. The calculator outputs this price — memorize it before entering any leveraged trade. If the current price is within 15% of your liquidation price, your position is at high risk of forced closure on a routine volatility spike.`,
      `The liquidation buffer (distance from current price to liquidation price as a percentage) is more actionable than the liquidation price itself. A buffer under 10% means a single 2-sigma intraday move could trigger liquidation. Maintain at least 20–30% buffer to survive normal volatility. Adding margin to an underwater position widens this buffer but also increases your total dollar exposure.`
      ],
      scenarios: [
      `Pre-trade safety check: before entering any leveraged position, run this calculator to confirm your liquidation price. If it falls within a recent support/resistance zone that price has tested multiple times, adjust your leverage or position size to push the liquidation level past that technical zone.`,
      `Margin top-up decision: if a position moves against you, enter the current price and remaining margin to see how close you are to liquidation. Compare the cost of adding margin (to survive the dip) against the probability of recovery — if the position thesis is broken, closing voluntarily is almost always better than forced liquidation at the worst price.`
      ],
      checklist: [
      `Before opening a leveraged position: 1) Calculate liquidation price. 2) Mark that price on your chart — ensure it is below a major structural support (for longs) that has held at least twice. 3) Calculate the buffer percentage: if under 20%, reduce leverage. 4) Set a price alert at 15% above your liquidation price to get warning before forced closure.`,
      `After entering the position: monitor the buffer daily. If daily range is consistently reaching 50%+ of your buffer, the position is too large for the current volatility regime — reduce size.`
      ],
      mistakes: [
      `Using maximum allowed leverage (50×, 100×, 125×) on any position is almost always a mistake for non-institutional traders. At 100× leverage, a 1% adverse move causes 100% loss of margin. Market microstructure (bid-ask spread, slippage, funding fees) alone can create 0.5–1% of adverse friction on entry and exit.`,
      `Ignoring funding rates when holding leveraged positions overnight. On many derivatives exchanges, funding is paid every 8 hours. A 0.1% per 8h funding rate on a $10,000 notional position costs $3/8h = $9/day = $270/month — often exceeding the value of the trade at moderate leverage.`
      ],
      benchmarks: [
      `A reasonable liquidation buffer for long-term leveraged positions is 30–50% of the entry price (below for longs, above for shorts). For short-term trades (under 24 hours), a 15–20% buffer may be acceptable if you are monitoring actively.`,
      `Historically, Bitcoin has experienced intraday moves of 10–15% multiple times per year during volatile periods. ETH can move 15–20% intraday in high-volatility environments. Your liquidation buffer should exceed these historical extreme intraday ranges to avoid being stopped by normal volatility.`
      ],
      execution: [
      `Workflow before any leveraged trade: 1) Decide maximum loss in dollars. 2) Set position size so that stop-loss (not liquidation) hits that maximum loss. 3) Calculate liquidation price to ensure it is far below stop-loss. 4) Enter the trade. Never treat liquidation price as your de facto stop-loss — use an intentional stop order well above it.`,
      `Partial liquidation planning: some exchanges allow partial closes. If you sense a position moving against you, reduce to 50% size manually at a level you choose, rather than allowing the exchange to liquidate 100% at the worst possible price.`
      ],
      hygiene: [
      `Recalculate your liquidation price after adding or withdrawing margin, or after any partial close. The liquidation price shifts with every margin change — your cached liquidation figure from trade entry is stale after any modification.`,
      `Never add to a losing leveraged position purely to lower the liquidation price — this is "adding to a loser" which compounds both your loss exposure and the psychological tendency to hold too long.`
      ],
      validation: [
      `Cross-check your calculated liquidation price against the exchange's own display on the position panel. Any difference over 0.5% warrants investigation — the most common cause is a fee structure difference (maintenance margin rate) not captured in your inputs.`,
      `After computing the liquidation price, verify the buffer calculation: (liquidation price − current price) / current price × 100 for a long. If this does not match the calculator output, check which formula the exchange uses (some include initial margin in the calculation, others use maintenance margin only).`
      ],
    },
    es: {
      interpret: [
      `El precio de liquidación es el precio exacto al que tu exchange cerrará automáticamente tu posición para evitar que el saldo de tu cuenta se vuelva negativo. Con un apalancamiento de 10×, un movimiento del 10% en tu contra elimina el 100% de tu margen.`,
      `El margen de liquidación (distancia desde el precio actual hasta el precio de liquidación como porcentaje) es más accionable que el precio de liquidación en sí. Un margen inferior al 10% significa que un único movimiento de 2 sigma intradía podría desencadenar la liquidación.`
      ],
      scenarios: [
      `Verificación de seguridad previa a la operación: antes de entrar en cualquier posición apalancada, ejecuta este calculador para confirmar tu precio de liquidación. Si cae dentro de una zona de soporte/resistencia reciente que el precio ha probado varias veces, ajusta tu apalancamiento.`,
      `Decisión de recarga de margen: si una posición se mueve en tu contra, introduce el precio actual y el margen restante para ver cuán cerca estás de la liquidación.`
      ],
      checklist: [
      `Antes de abrir una posición apalancada: 1) Calcula el precio de liquidación. 2) Marca ese precio en tu gráfico. 3) Calcula el porcentaje de margen: si está por debajo del 20%, reduce el apalancamiento. 4) Establece una alerta de precio al 15% por encima de tu precio de liquidación.`,
      `Después de entrar en la posición: monitorea el margen diariamente.`
      ],
      mistakes: [
      `Usar el apalancamiento máximo permitido (50×, 100×, 125×) en cualquier posición es casi siempre un error para traders no institucionales. Con un apalancamiento de 100×, un movimiento adverso del 1% causa una pérdida del 100% del margen.`,
      `Ignorar las tasas de financiación al mantener posiciones apalancadas durante la noche. En muchos exchanges de derivados, la financiación se paga cada 8 horas.`
      ],
      benchmarks: [
      `Un margen de liquidación razonable para posiciones apalancadas a largo plazo es del 30–50% del precio de entrada.`,
      `Históricamente, Bitcoin ha experimentado movimientos intradía del 10–15% varias veces al año durante períodos volátiles. Tu margen de liquidación debe superar estos rangos intradía extremos históricos.`
      ],
      execution: [
      `Flujo de trabajo antes de cualquier operación apalancada: 1) Decide la pérdida máxima en dólares. 2) Establece el tamaño de posición para que el stop-loss (no la liquidación) alcance esa pérdida máxima. 3) Calcula el precio de liquidación para asegurarte de que esté muy por debajo del stop-loss.`,
      `Planificación de liquidación parcial: algunos exchanges permiten cierres parciales. Si percibes que una posición se mueve en tu contra, reduce al 50% del tamaño manualmente.`
      ],
      hygiene: [
      `Recalcula tu precio de liquidación después de agregar o retirar margen, o después de cualquier cierre parcial.`,
      `Nunca añadas a una posición apalancada perdedora puramente para bajar el precio de liquidación.`
      ],
      validation: [
      `Verifica tu precio de liquidación calculado con la pantalla propia del exchange en el panel de posición.`,
      `Después de calcular el precio de liquidación, verifica el cálculo del margen.`
      ],
    },
    pt: {
      interpret: [
      `O preço de liquidação é o preço exato no qual sua exchange fechará automaticamente sua posição para evitar que o saldo da sua conta fique negativo. Com alavancagem de 10×, um movimento de 10% contra você elimina 100% de sua margem.`,
      `O buffer de liquidação (distância do preço atual ao preço de liquidação como percentual) é mais acionável do que o preço de liquidação em si. Um buffer abaixo de 10% significa que um único movimento de 2 sigma intraday pode acionar a liquidação.`
      ],
      scenarios: [
      `Verificação de segurança pré-trade: antes de entrar em qualquer posição alavancada, execute esta calculadora para confirmar seu preço de liquidação.`,
      `Decisão de recarga de margem: se uma posição se mover contra você, insira o preço atual e a margem restante para ver o quão perto está da liquidação.`
      ],
      checklist: [
      `Antes de abrir uma posição alavancada: 1) Calcule o preço de liquidação. 2) Marque esse preço em seu gráfico. 3) Calcule o percentual de buffer: se abaixo de 20%, reduza a alavancagem. 4) Defina um alerta de preço a 15% acima do seu preço de liquidação.`,
      `Após entrar na posição: monitore o buffer diariamente.`
      ],
      mistakes: [
      `Usar alavancagem máxima permitida (50×, 100×, 125×) em qualquer posição é quase sempre um erro para traders não institucionais.`,
      `Ignorar as taxas de financiamento ao manter posições alavancadas durante a noite.`
      ],
      benchmarks: [
      `Um buffer de liquidação razoável para posições alavancadas de longo prazo é de 30–50% do preço de entrada.`,
      `Historicamente, o Bitcoin experimentou movimentos intraday de 10–15% várias vezes ao ano durante períodos voláteis.`
      ],
      execution: [
      `Fluxo de trabalho antes de qualquer trade alavancado: 1) Decida a perda máxima em dólares. 2) Defina o tamanho da posição para que o stop-loss atinja essa perda máxima. 3) Calcule o preço de liquidação para garantir que esteja bem abaixo do stop-loss.`,
      `Planejamento de liquidação parcial: algumas exchanges permitem fechamentos parciais.`
      ],
      hygiene: [
      `Recalcule seu preço de liquidação após adicionar ou retirar margem, ou após qualquer fechamento parcial.`,
      `Nunca adicione a uma posição alavancada perdedora puramente para baixar o preço de liquidação.`
      ],
      validation: [
      `Verifique seu preço de liquidação calculado com a própria exibição da exchange no painel de posição.`,
      `Após calcular o preço de liquidação, verifique o cálculo do buffer.`
      ],
    },
    tr: {
      interpret: [
      `Tasfiye fiyatı, hesap bakiyenizin negatife düşmesini önlemek için borsanızın pozisyonunuzu otomatik olarak kapatacağı tam fiyattır. 10× kaldıraçta, aleyhinize %10'luk bir hareket marjınızın %100'ünü siler.`,
      `Tasfiye tamponu (mevcut fiyattan tasfiye fiyatına yüzde olarak mesafe) tasfiye fiyatının kendisinden daha işlemsel bir değere sahiptir.`
      ],
      scenarios: [
      `İşlem öncesi güvenlik kontrolü: herhangi bir kaldıraçlı pozisyona girmeden önce tasfiye fiyatınızı onaylamak için bu hesaplayıcıyı çalıştırın.`,
      `Marjin yükleme kararı: bir pozisyon aleyhinize hareket ederse, tasfiyeye ne kadar yakın olduğunuzu görmek için mevcut fiyatı ve kalan marjini girin.`
      ],
      checklist: [
      `Kaldıraçlı bir pozisyon açmadan önce: 1) Tasfiye fiyatını hesaplayın. 2) O fiyatı grafiğinizde işaretleyin. 3) Tampon yüzdesini hesaplayın: %20'nin altındaysa kaldıracı azaltın. 4) Tasfiye fiyatınızın %15 üzerinde bir fiyat uyarısı ayarlayın.`,
      `Pozisyona girdikten sonra: tamponu günlük olarak izleyin.`
      ],
      mistakes: [
      `Herhangi bir pozisyonda maksimum izin verilen kaldıracı (50×, 100×, 125×) kullanmak kurumsal olmayan traderlar için neredeyse her zaman bir hatadır.`,
      `Kaldıraçlı pozisyonları gecelik tutarken fonlama oranlarını görmezden gelmek.`
      ],
      benchmarks: [
      `Uzun vadeli kaldıraçlı pozisyonlar için makul bir tasfiye tamponu, giriş fiyatının %30–50'sidir.`,
      `Tarihsel olarak Bitcoin, volatil dönemlerde yılda birçok kez %10–15'lik günlük hareketler yaşamıştır.`
      ],
      execution: [
      `Herhangi bir kaldıraçlı işlemden önce iş akışı: 1) Dolar cinsinden maksimum kaybı belirleyin. 2) Stop-loss'un (tasfiye değil) o maksimum kayba ulaşması için pozisyon büyüklüğünü ayarlayın. 3) Stop-loss'un çok altında olduğundan emin olmak için tasfiye fiyatını hesaplayın.`,
      `Kısmi tasfiye planlaması: bazı borsalar kısmi kapanışlara izin verir.`
      ],
      hygiene: [
      `Marjin ekledikten veya çektikten ya da herhangi bir kısmi kapanıştan sonra tasfiye fiyatınızı yeniden hesaplayın.`,
      `Tasfiye fiyatını düşürmek için yalnızca zarar eden kaldıraçlı bir pozisyona asla ekleme yapmayın.`
      ],
      validation: [
      `Hesaplanan tasfiye fiyatınızı borsa pozisyon panelindeki kendi ekranıyla çapraz kontrol edin.`,
      `Tasfiye fiyatını hesapladıktan sonra, tampon hesaplamayı doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `लिक्विडेशन मूल्य वह सटीक मूल्य है जिस पर आपका एक्सचेंज आपके खाते की शेष राशि को नकारात्मक होने से बचाने के लिए आपकी पोजीशन को स्वचालित रूप से बंद कर देगा। 10× उत्तोलन पर, आपके विरुद्ध 10% की चाल आपके 100% मार्जिन को समाप्त कर देती है।`,
      `लिक्विडेशन बफर (वर्तमान मूल्य से लिक्विडेशन मूल्य तक प्रतिशत के रूप में दूरी) लिक्विडेशन मूल्य से अधिक कार्रवाई योग्य है। 10% से कम बफर का मतलब है कि एक एकल 2-सिग्मा इंट्राडे मूव लिक्विडेशन को ट्रिगर कर सकता है।`
      ],
      scenarios: [
      `पूर्व-ट्रेड सुरक्षा जांच: किसी भी लीवरेज्ड पोजीशन में प्रवेश करने से पहले, अपने लिक्विडेशन मूल्य की पुष्टि करने के लिए यह कैलकुलेटर चलाएं।`,
      `मार्जिन टॉप-अप निर्णय: यदि कोई पोजीशन आपके विरुद्ध चलती है, तो लिक्विडेशन के कितने करीब हैं यह देखने के लिए वर्तमान मूल्य और शेष मार्जिन दर्ज करें।`
      ],
      checklist: [
      `लीवरेज्ड पोजीशन खोलने से पहले: 1) लिक्विडेशन मूल्य की गणना करें। 2) उस मूल्य को अपने चार्ट पर चिह्नित करें। 3) बफर प्रतिशत की गणना करें: 20% से कम होने पर उत्तोलन कम करें। 4) अपने लिक्विडेशन मूल्य से 15% ऊपर मूल्य अलर्ट सेट करें।`,
      `पोजीशन में प्रवेश करने के बाद: दैनिक रूप से बफर की निगरानी करें।`
      ],
      mistakes: [
      `किसी भी पोजीशन पर अधिकतम अनुमत उत्तोलन (50×, 100×, 125×) का उपयोग करना गैर-संस्थागत ट्रेडर्स के लिए लगभग हमेशा एक गलती है।`,
      `रात भर लीवरेज्ड पोजीशन रखते समय फंडिंग दरों को नजरअंदाज करना।`
      ],
      benchmarks: [
      `दीर्घकालिक लीवरेज्ड पोजीशन के लिए एक उचित लिक्विडेशन बफर प्रवेश मूल्य का 30–50% है।`,
      `ऐतिहासिक रूप से, Bitcoin ने अस्थिर अवधियों के दौरान वर्ष में कई बार 10–15% इंट्राडे मूव का अनुभव किया है।`
      ],
      execution: [
      `किसी भी लीवरेज्ड ट्रेड से पहले वर्कफ़्लो: 1) डॉलर में अधिकतम नुकसान तय करें। 2) पोजीशन साइज सेट करें ताकि स्टॉप-लॉस (लिक्विडेशन नहीं) उस अधिकतम नुकसान को हिट करे। 3) लिक्विडेशन मूल्य की गणना करें।`,
      `आंशिक लिक्विडेशन योजना: कुछ एक्सचेंज आंशिक बंद होने की अनुमति देते हैं।`
      ],
      hygiene: [
      `मार्जिन जोड़ने या निकालने के बाद, या किसी भी आंशिक बंद होने के बाद अपने लिक्विडेशन मूल्य की पुनः गणना करें।`,
      `लिक्विडेशन मूल्य को कम करने के लिए कभी भी एक हारने वाली लीवरेज्ड पोजीशन में जोड़ें नहीं।`
      ],
      validation: [
      `पोजीशन पैनल पर एक्सचेंज के अपने डिस्प्ले के साथ अपने परिकलित लिक्विडेशन मूल्य को क्रॉस-चेक करें।`,
      `लिक्विडेशन मूल्य की गणना करने के बाद, बफर गणना को सत्यापित करें।`
      ],
    },
    ru: {
      interpret: [
      `Цена ликвидации — это точная цена, при которой биржа автоматически закроет вашу позицию, чтобы баланс счёта не стал отрицательным. При плече 10× движение на 10% против вас уничтожает 100% маржи. Калькулятор выводит эту цену — запомните её перед входом в любую позицию с плечом.`,
      `Буфер ликвидации (расстояние от текущей цены до цены ликвидации в процентах) более применим на практике, чем сама цена ликвидации. Буфер менее 10% означает, что одно стандартное внутридневное движение 2σ может вызвать ликвидацию.`
      ],
      scenarios: [
      `Проверка безопасности перед сделкой: перед входом в любую позицию с плечом запустите этот калькулятор для подтверждения цены ликвидации. Если она попадает в зону поддержки/сопротивления, которую цена тестировала несколько раз, скорректируйте плечо или размер позиции.`,
      `Решение о пополнении маржи: если позиция движется против вас, введите текущую цену и оставшуюся маржу, чтобы оценить близость к ликвидации.`
      ],
      checklist: [
      `Перед открытием позиции с плечом: 1) Рассчитайте цену ликвидации. 2) Отметьте её на графике — убедитесь, что она ниже значимой поддержки. 3) Рассчитайте процент буфера: если ниже 20%, уменьшите плечо. 4) Установите ценовой алерт на 15% выше цены ликвидации.`,
      `После входа в позицию: ежедневно отслеживайте буфер.`
      ],
      mistakes: [
      `Использование максимально допустимого плеча (50×, 100×, 125×) для любой позиции — почти всегда ошибка для неинституциональных трейдеров. При плече 100× движение на 1% против вас приводит к 100% потере маржи.`,
      `Игнорирование ставок финансирования при удержании позиций с плечом на ночь. На многих деривативных биржах финансирование выплачивается каждые 8 часов.`
      ],
      benchmarks: [
      `Разумный буфер ликвидации для долгосрочных позиций с плечом — 30–50% от цены входа. Для краткосрочных сделок (менее 24 часов) при активном мониторинге допустим буфер 15–20%.`,
      `Исторически Bitcoin неоднократно в год демонстрировал внутридневные движения 10–15% в периоды высокой волатильности. Ваш буфер ликвидации должен превышать эти исторические экстремальные диапазоны.`
      ],
      execution: [
      `Рабочий процесс перед любой сделкой с плечом: 1) Определите максимальный убыток в долларах. 2) Установите размер позиции так, чтобы стоп-лосс (не ликвидация) достигал этого максимального убытка. 3) Рассчитайте цену ликвидации, чтобы убедиться, что она значительно ниже стоп-лосса. 4) Никогда не используйте цену ликвидации как фактический стоп-лосс.`,
      `Планирование частичной ликвидации: некоторые биржи позволяют частичные закрытия. Если позиция движется против вас, сократите её вручную до 50% на выбранном уровне, не дожидаясь принудительной ликвидации.`
      ],
      hygiene: [
      `Пересчитывайте цену ликвидации после каждого пополнения или вывода маржи, а также после частичного закрытия. Цена ликвидации меняется при каждом изменении маржи.`,
      `Никогда не добавляйте к убыточной позиции с плечом исключительно для снижения цены ликвидации — это "усреднение вниз", которое только увеличивает риск.`
      ],
      validation: [
      `Сверьте расчётную цену ликвидации с отображением на панели позиций самой биржи. Расхождение более 0.5% требует изучения — чаще всего это связано с различием в структуре комиссий.`,
      `После расчёта цены ликвидации проверьте расчёт буфера: (цена ликвидации − текущая цена) / текущая цена × 100 для лонга.`
      ],
    },
  },
  'funding-rate-calculator': {
    en: {
      interpret: [
      `The funding rate output shows the dollar cost (or income) of holding a perpetual futures position for a given period. A positive funding rate means longs pay shorts — if you are long, this is a periodic cost. A negative rate means shorts pay longs — a reward for being long in a bearish market. The annualized rate converts the per-period rate to a yearly figure for easy comparison against other yield opportunities.`,
      `When the annualized funding rate exceeds 30–50%, it signals extreme speculative bias on one side. Historically, funding rates above 100% annualized have preceded significant price corrections as the cost of maintaining leverage becomes unsustainable. Use this calculator to quantify whether your position's funding cost erodes profit potential before entering.`
      ],
      scenarios: [
      `Position cost budgeting: before entering a long perpetual futures position, calculate the daily and weekly funding cost. If a trade requires 7 days to play out and daily funding is $50 on your position, that's $350 in guaranteed cost before you even see price movement — factor this into your profit target calculation.`,
      `Funding arbitrage: when funding rates are high (longs paying shorts), there is an opportunity to simultaneously hold spot long and perpetual short. The funding income (from being short) can generate yield on the spot position while maintaining net-neutral market exposure. Calculate net annualized yield from this calculator to evaluate viability.`
      ],
      checklist: [
      `Before entering a perpetual position: 1) Check the current 8-hour funding rate on your exchange. 2) Estimate how many funding periods (every 8 hours) your trade is likely to last. 3) Multiply funding cost per period × position notional × number of periods to get total funding cost. 4) Confirm your profit target exceeds total funding cost by 2× or more.`,
      `After entering: set a calendar reminder to check funding rates every 24 hours for swing trades. Funding rates can change significantly in a few hours, especially near major events or when market sentiment shifts rapidly.`
      ],
      mistakes: [
      `Ignoring funding when holding a perpetual position for more than 48 hours is the most costly mistake. At a 0.1% rate per 8 hours (common during bull runs), holding a $10,000 long for 7 days costs $210 in funding alone — 2.1% of position size — before counting trading fees or any losses.`,
      `Assuming funding rates are stable: they change every 8 hours and can spike dramatically during market moves. A rate that was 0.01% yesterday can become 0.1% today — a 10× increase in daily cost. Monitor funding in real-time for large positions, especially during news events.`
      ],
      benchmarks: [
      `A "neutral" funding rate for major assets like BTC and ETH is 0.01% per 8 hours (0.03% per day, ≈10% annualized). Rates persistently above 0.05% per 8h (≈55% annualized) indicate overheated sentiment and elevated correction risk. Rates below -0.05% per 8h indicate heavy short bias.`,
      `Compare your position's annualized funding cost against available risk-free yield (e.g., stablecoin lending rates of 5–10% APY). If your funding cost exceeds the risk-free rate, you are paying a premium to hold a directional bet — quantify whether the price thesis justifies that premium.`
      ],
      execution: [
      `Pre-trade funding check: 1) Open the funding rate page on your exchange. 2) Note the current rate and the predicted rate for the next period. 3) Enter position size and holding period into this calculator. 4) Compare funding cost to your profit target — if funding exceeds 20% of your target profit, reconsider position size or time horizon.`,
      `For funding arbitrage: calculate the net yield as (funding income from short − borrowing cost for spot purchase − spot trading fees). If net yield exceeds 5% annualized with delta-neutral exposure, the trade is worth executing.`
      ],
      hygiene: [
      `Track historical funding rates for the assets you trade. Periods of consistently high positive funding (longs paying) historically correlate with market tops. This data, combined with this calculator, helps you avoid entering longs exactly when the carry cost is highest.`,
      `Keep a log of actual funding paid or received for each position. Compare against the estimated cost from this calculator. Consistent discrepancies may indicate a fee structure difference or that your position was partially liquidated or modified, affecting the effective rate.`
      ],
      validation: [
      `Verify the daily funding cost by cross-referencing with your exchange's funding history for the asset. The exact dollar paid should match (notional position × rate per period × number of periods). If your exchange shows different amounts, check for position size changes during the holding period.`,
      `Validate the annualized rate calculation: if the 8-hour rate is 0.01%, the daily rate is 0.03% (× 3), and annual is approximately 10.95% (daily rate × 365). The calculator should match within 0.1 percentage points.`
      ],
    },
    es: {
      interpret: [
      `La salida de la tasa de financiación muestra el coste (o ingreso) en dólares de mantener una posición de futuros perpetuos durante un período determinado. Una tasa de financiación positiva significa que los largos pagan a los cortos — si estás largo, este es un coste periódico.`,
      `Cuando la tasa de financiación anualizada supera el 30–50%, señala un sesgo especulativo extremo en un lado. Históricamente, las tasas de financiación por encima del 100% anualizado han precedido correcciones de precio significativas.`
      ],
      scenarios: [
      `Presupuesto de coste de posición: antes de entrar en una posición larga de futuros perpetuos, calcula el coste diario y semanal de financiación. Si una operación necesita 7 días para desarrollarse y la financiación diaria es de $50, eso es $350 en coste garantizado.`,
      `Arbitraje de financiación: cuando las tasas de financiación son altas, hay una oportunidad de mantener simultáneamente spot largo y perpetuo corto. El ingreso de financiación puede generar rendimiento en la posición spot mientras se mantiene exposición neutral al mercado.`
      ],
      checklist: [
      `Antes de entrar en una posición perpetua: 1) Comprueba la tasa de financiación actual de 8 horas en tu exchange. 2) Estima cuántos períodos de financiación (cada 8 horas) probablemente durará tu operación. 3) Multiplica coste de financiación por período × nocional de posición × número de períodos.`,
      `Después de entrar: establece un recordatorio de calendario para verificar las tasas de financiación cada 24 horas para operaciones swing.`
      ],
      mistakes: [
      `Ignorar la financiación al mantener una posición perpetua durante más de 48 horas es el error más costoso. Con una tasa del 0.1% por cada 8 horas (común durante mercados alcistas), mantener $10,000 en largo durante 7 días cuesta $210 solo en financiación.`,
      `Asumir que las tasas de financiación son estables: cambian cada 8 horas y pueden dispararse dramáticamente durante movimientos del mercado.`
      ],
      benchmarks: [
      `Una tasa de financiación "neutral" para activos principales como BTC y ETH es del 0.01% por 8 horas. Tasas persistentemente por encima del 0.05% por 8h indican sentimiento sobrecalentado.`,
      `Compara el coste de financiación anualizado de tu posición con el rendimiento disponible libre de riesgo (por ejemplo, tasas de préstamo de stablecoins del 5–10% APY).`
      ],
      execution: [
      `Verificación de financiación pre-operación: 1) Abre la página de tasas de financiación en tu exchange. 2) Observa la tasa actual y la prevista para el próximo período. 3) Introduce tamaño de posición y período de tenencia en este calculador. 4) Compara el coste de financiación con tu objetivo de beneficio.`,
      `Para arbitraje de financiación: calcula el rendimiento neto como (ingresos de financiación de corto − coste de préstamo para compra spot − comisiones de trading spot).`
      ],
      hygiene: [
      `Rastrea las tasas de financiación históricas para los activos que operas. Los períodos de financiación positiva consistentemente alta históricamente se correlacionan con los máximos del mercado.`,
      `Mantén un registro de la financiación real pagada o recibida por cada posición. Compara con el coste estimado de este calculador.`
      ],
      validation: [
      `Verifica el coste de financiación diario cruzando referencias con el historial de financiación de tu exchange para el activo.`,
      `Valida el cálculo de la tasa anualizada.`
      ],
    },
    pt: {
      interpret: [
      `A saída da taxa de financiamento mostra o custo (ou receita) em dólares de manter uma posição de futuros perpétuos por um período determinado. Uma taxa de financiamento positiva significa que os longs pagam os shorts.`,
      `Quando a taxa de financiamento anualizada ultrapassa 30–50%, sinaliza viés especulativo extremo em um lado. Historicamente, taxas acima de 100% ao ano precederam correções de preço significativas.`
      ],
      scenarios: [
      `Orçamento de custo de posição: antes de entrar em uma posição longa de futuros perpétuos, calcule o custo diário e semanal de financiamento.`,
      `Arbitragem de financiamento: quando as taxas de financiamento são altas, há oportunidade de manter simultaneamente spot longo e perpétuo curto.`
      ],
      checklist: [
      `Antes de entrar em uma posição perpétua: 1) Verifique a taxa de financiamento atual de 8 horas na sua exchange. 2) Estime quantos períodos de financiamento sua operação provavelmente durará. 3) Multiplique custo de financiamento por período × nocional de posição × número de períodos.`,
      `Após entrar: defina um lembrete de calendário para verificar as taxas de financiamento a cada 24 horas para operações swing.`
      ],
      mistakes: [
      `Ignorar o financiamento ao manter uma posição perpétua por mais de 48 horas é o erro mais caro.`,
      `Assumir que as taxas de financiamento são estáveis: elas mudam a cada 8 horas e podem disparar drasticamente durante movimentos de mercado.`
      ],
      benchmarks: [
      `Uma taxa de financiamento "neutra" para ativos principais como BTC e ETH é de 0.01% por 8 horas.`,
      `Compare o custo de financiamento anualizado da sua posição com o rendimento disponível livre de risco.`
      ],
      execution: [
      `Verificação de financiamento pré-operação: 1) Abra a página de taxas de financiamento na sua exchange. 2) Observe a taxa atual e a prevista para o próximo período. 3) Insira tamanho de posição e período de manutenção nesta calculadora.`,
      `Para arbitragem de financiamento: calcule o rendimento líquido como (receita de financiamento do short − custo de empréstimo para compra spot − taxas de trading spot).`
      ],
      hygiene: [
      `Rastreie as taxas de financiamento históricas para os ativos que você negocia.`,
      `Mantenha um registro do financiamento real pago ou recebido por cada posição.`
      ],
      validation: [
      `Verifique o custo diário de financiamento cruzando referências com o histórico de financiamento da sua exchange.`,
      `Valide o cálculo da taxa anualizada.`
      ],
    },
    tr: {
      interpret: [
      `Fonlama oranı çıktısı, belirli bir süre için sürekli vadeli işlem pozisyonu tutmanın dolar maliyetini (veya gelirini) gösterir. Pozitif fonlama oranı, longsların shortslara ödeme yaptığı anlamına gelir.`,
      `Yıllıklandırılmış fonlama oranı %30–50'yi aştığında, bir tarafta aşırı spekülatif önyargıya işaret eder.`
      ],
      scenarios: [
      `Pozisyon maliyet bütçelemesi: sürekli vadeli işlem uzun pozisyonuna girmeden önce günlük ve haftalık fonlama maliyetini hesaplayın.`,
      `Fonlama arbitrajı: fonlama oranları yüksek olduğunda, eş zamanlı olarak spot uzun ve sürekli kısa tutmak için bir fırsat vardır.`
      ],
      checklist: [
      `Sürekli vadeli işlem pozisyonuna girmeden önce: 1) Borsanızda mevcut 8 saatlik fonlama oranını kontrol edin. 2) İşleminizin muhtemelen kaç fonlama periyodu (her 8 saatte bir) süreceğini tahmin edin. 3) Periyot başına fonlama maliyeti × pozisyon nosyoneli × periyot sayısını çarpın.`,
      `Girdikten sonra: swing işlemler için fonlama oranlarını her 24 saatte bir kontrol etmek üzere takvim hatırlatıcısı ayarlayın.`
      ],
      mistakes: [
      `48 saatten fazla sürekli vadeli işlem pozisyonu tutarken fonlamayı görmezden gelmek en maliyetli hatadır.`,
      `Fonlama oranlarının sabit olduğunu varsaymak: her 8 saatte bir değişir ve piyasa hareketleri sırasında dramatik biçimde artabilir.`
      ],
      benchmarks: [
      `BTC ve ETH gibi büyük varlıklar için "nötr" fonlama oranı 8 saatte %0.01'dir.`,
      `Pozisyonunuzun yıllıklandırılmış fonlama maliyetini mevcut risksiz getiriyle karşılaştırın.`
      ],
      execution: [
      `İşlem öncesi fonlama kontrolü: 1) Borsanızda fonlama oranı sayfasını açın. 2) Mevcut oranı ve bir sonraki periyot için tahmin edilen oranı not edin. 3) Pozisyon büyüklüğü ve elde tutma süresini bu hesaplayıcıya girin.`,
      `Fonlama arbitrajı için: net getiriyi (short'tan fonlama geliri − spot alım için borçlanma maliyeti − spot işlem ücretleri) olarak hesaplayın.`
      ],
      hygiene: [
      `İşlem yaptığınız varlıklar için tarihsel fonlama oranlarını takip edin.`,
      `Her pozisyon için gerçekte ödenen veya alınan fonlamanın kaydını tutun.`
      ],
      validation: [
      `Günlük fonlama maliyetini varlık için borsanızın fonlama geçmişiyle çapraz referans alarak doğrulayın.`,
      `Yıllıklandırılmış oran hesaplamasını doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `फंडिंग रेट आउटपुट एक निश्चित अवधि के लिए परपेचुअल फ्यूचर्स पोजीशन रखने की डॉलर लागत (या आय) दिखाता है। सकारात्मक फंडिंग रेट का मतलब है लॉन्ग्स शॉर्ट्स को भुगतान करते हैं।`,
      `जब वार्षिक फंडिंग रेट 30–50% से अधिक हो जाती है, तो यह एक तरफ अत्यधिक सट्टा पूर्वाग्रह का संकेत देती है।`
      ],
      scenarios: [
      `पोजीशन लागत बजटिंग: परपेचुअल फ्यूचर्स लॉन्ग पोजीशन में प्रवेश करने से पहले, दैनिक और साप्ताहिक फंडिंग लागत की गणना करें।`,
      `फंडिंग आर्बिट्राज: जब फंडिंग रेट उच्च हो, तो एक साथ स्पॉट लॉन्ग और परपेचुअल शॉर्ट रखने का अवसर होता है।`
      ],
      checklist: [
      `परपेचुअल पोजीशन में प्रवेश करने से पहले: 1) अपने एक्सचेंज पर वर्तमान 8-घंटे की फंडिंग रेट जांचें। 2) अनुमान लगाएं कि आपका ट्रेड कितने फंडिंग पीरियड (हर 8 घंटे) तक चलेगा। 3) प्रति पीरियड फंडिंग लागत × पोजीशन नोशनल × पीरियड की संख्या गुणा करें।`,
      `प्रवेश करने के बाद: स्विंग ट्रेड के लिए हर 24 घंटे में फंडिंग रेट जांचने के लिए कैलेंडर रिमाइंडर सेट करें।`
      ],
      mistakes: [
      `48 घंटे से अधिक परपेचुअल पोजीशन रखते समय फंडिंग को नजरअंदाज करना सबसे महंगी गलती है।`,
      `यह मानना कि फंडिंग रेट स्थिर हैं: वे हर 8 घंटे बदलती हैं और बाजार चालों के दौरान नाटकीय रूप से बढ़ सकती हैं।`
      ],
      benchmarks: [
      `BTC और ETH जैसी प्रमुख संपत्तियों के लिए "तटस्थ" फंडिंग रेट 8 घंटे में 0.01% है।`,
      `अपनी पोजीशन की वार्षिक फंडिंग लागत की तुलना उपलब्ध जोखिम-मुक्त प्रतिफल से करें।`
      ],
      execution: [
      `पूर्व-ट्रेड फंडिंग जांच: 1) अपने एक्सचेंज पर फंडिंग रेट पेज खोलें। 2) वर्तमान रेट और अगले पीरियड के लिए अनुमानित रेट नोट करें। 3) इस कैलकुलेटर में पोजीशन साइज और होल्डिंग पीरियड दर्ज करें।`,
      `फंडिंग आर्बिट्राज के लिए: नेट यील्ड की गणना करें = (शॉर्ट से फंडिंग आय − स्पॉट खरीद के लिए उधार लागत − स्पॉट ट्रेडिंग शुल्क)।`
      ],
      hygiene: [
      `आप जो संपत्तियां ट्रेड करते हैं उनके लिए ऐतिहासिक फंडिंग रेट ट्रैक करें।`,
      `प्रत्येक पोजीशन के लिए वास्तव में भुगतान की गई या प्राप्त फंडिंग का लॉग रखें।`
      ],
      validation: [
      `संपत्ति के लिए अपने एक्सचेंज के फंडिंग इतिहास के साथ क्रॉस-रेफरेंसिंग करके दैनिक फंडिंग लागत को सत्यापित करें।`,
      `वार्षिक रेट गणना को मान्य करें।`
      ],
    },
    ru: {
      interpret: [
      `Вывод ставки финансирования показывает долларовые расходы (или доходы) на удержание позиции в бессрочных фьючерсах за заданный период. Положительная ставка финансирования означает, что лонги платят шортам. Отрицательная — шорты платят лонгам.`,
      `Когда годовая ставка финансирования превышает 30–50%, это сигнализирует о крайнем спекулятивном перекосе на одной стороне. Исторически ставки выше 100% годовых предшествовали значительным ценовым коррекциям.`
      ],
      scenarios: [
      `Планирование затрат на позицию: перед входом в лонг по бессрочному фьючерсу рассчитайте ежедневные и еженедельные затраты на финансирование. Если сделка рассчитана на 7 дней, а ежедневное финансирование составляет $50, это $350 гарантированных затрат.`,
      `Арбитраж по финансированию: при высоких ставках финансирования существует возможность одновременно держать спот-лонг и бессрочный шорт. Доход от финансирования (со стороны шорта) генерирует доходность на споте при нейтральной рыночной экспозиции.`
      ],
      checklist: [
      `Перед входом в бессрочную позицию: 1) Проверьте текущую 8-часовую ставку финансирования на бирже. 2) Оцените, сколько периодов финансирования (каждые 8 часов) продлится сделка. 3) Умножьте стоимость финансирования за период × номинал позиции × количество периодов.`,
      `После входа: установите напоминание в календаре для ежедневной проверки ставок финансирования по свинг-сделкам.`
      ],
      mistakes: [
      `Игнорирование финансирования при удержании бессрочной позиции более 48 часов — самая дорогостоящая ошибка. При ставке 0.1% каждые 8 часов (типично в бычьем рынке) удержание лонга на $10 000 в течение 7 дней стоит $210 только на финансировании.`,
      `Предположение о стабильности ставок финансирования: они меняются каждые 8 часов и могут резко вырасти во время рыночных движений.`
      ],
      benchmarks: [
      `"Нейтральная" ставка финансирования для основных активов (BTC, ETH) составляет 0.01% за 8 часов (≈10% годовых). Ставки устойчиво выше 0.05% за 8 ч (≈55% годовых) указывают на перегретый рыночный настрой.`,
      `Сравните годовую стоимость финансирования позиции с доступной безрисковой доходностью (например, ставки кредитования стейблкоинов 5–10% APY).`
      ],
      execution: [
      `Проверка финансирования перед сделкой: 1) Откройте страницу ставок финансирования на бирже. 2) Запишите текущую ставку и прогнозируемую для следующего периода. 3) Введите размер позиции и период удержания в этот калькулятор. 4) Сравните стоимость финансирования с целевой прибылью.`,
      `Для арбитража по финансированию: рассчитайте чистую доходность = (доход от финансирования с шорта − стоимость займа для покупки спота − комиссии спотовой торговли).`
      ],
      hygiene: [
      `Отслеживайте исторические ставки финансирования по торгуемым активам. Периоды устойчиво высокого положительного финансирования исторически коррелируют с рыночными вершинами.`,
      `Ведите журнал фактически выплаченного или полученного финансирования по каждой позиции. Сравнивайте с расчётной стоимостью из калькулятора.`
      ],
      validation: [
      `Проверьте суточные затраты на финансирование, сопоставив с историей финансирования биржи по данному активу. Точная выплаченная сумма должна совпадать с (номинал позиции × ставка за период × количество периодов).`,
      `Проверьте расчёт годовой ставки: если 8-часовая ставка равна 0.01%, суточная составляет 0.03% (× 3), а годовая — приблизительно 10.95% (суточная ставка × 365).`
      ],
    },
  },
  'tp-sl-calculator': {
    en: {
      interpret: [
      `The TP/SL calculator outputs the exact price levels for your take-profit and stop-loss orders, along with the dollar amounts won or lost if each triggers. The reward-to-risk ratio (R:R) at the bottom is the single most important number: it must exceed 2:1 for the trade to be viable at a 40% win rate, or exceed 1:1 at a 50% win rate. Below 1.5:1 R:R, only very high win rates (>60%) make the trade statistically profitable over a large sample.`,
      `The break-even win rate calculation shows the minimum win percentage needed to be profitable with these specific TP and SL levels. Use this to calibrate your strategy — if you believe you can win 55% of trades with this setup, a setup with 52% break-even win rate has a slim edge; one with 65% break-even has negative expectancy at your estimated win rate.`
      ],
      scenarios: [
      `Structured trade planning: before entering any trade, fill in entry, TP, and SL into this calculator to confirm R:R. Refuse to enter any trade where R:R is below your minimum threshold (recommended: 2:1 for new traders). This single habit eliminates the most common amateur mistake of setting stops too tight and targets too narrow.`,
      `Partial exit planning: enter two separate TP levels — a closer TP (1:1 R:R) for partial profit taking and a wider TP (3:1 R:R) for the remaining position. Calculate the blended average R:R across both exits to confirm overall expectancy remains positive even if the second target is only hit 30% of the time.`
      ],
      checklist: [
      `Before finalizing TP and SL levels: 1) Place SL at a technically justified level (below support for longs, above resistance for shorts) — not at an arbitrary distance. 2) Place TP at the next significant resistance level (for longs), not just "2:1 R:R from entry" if there is a wall of selling at 1.5:1. 3) Confirm R:R exceeds your strategy's required minimum.`,
      `After entering the trade: immediately place both TP and SL as OCO (one-cancels-other) orders on your exchange. Never rely on manual exit — slippage and emotional decision-making under pressure consistently produce worse outcomes than pre-committed orders.`
      ],
      mistakes: [
      `Moving the stop-loss further away ("giving it more room") when price approaches it is the single most destructive trading behavior. The initial SL was placed at the level where the trade thesis was wrong — if price reaches it, exit. Moving the stop converts a pre-planned loss into a panic-driven, larger loss.`,
      `Setting TP and SL at round numbers only (e.g., $30,000 BTC long, SL at $29,000, TP at $33,000) when the market structure suggests different levels. Always check whether significant support or resistance exists within 2% of your calculated levels — price frequently reverses exactly at those levels.`
      ],
      benchmarks: [
      `Minimum viable R:R for most systematic strategies is 2:1. Professional traders in trend-following strategies often target 3:1 or higher. In scalping or high-frequency strategies, 1.5:1 may be acceptable if the win rate is proven above 55% through backtesting.`,
      `Your average R:R across all trades should exceed 2:1 if your win rate is near 40–50%. If your strategy produces 2:1 R:R but only achieves 35% win rate, expectancy is marginally positive — increase R:R requirement or improve trade selection to boost win rate.`
      ],
      execution: [
      `Optimal TP/SL setting workflow: 1) Mark entry point. 2) Mark SL at the level where your trade thesis is invalidated. 3) Mark TP at the next significant resistance/support. 4) Calculate R:R with this calculator. 5) If R:R < 2:1, either widen TP (if realistic) or skip the trade. 6) Place OCO orders immediately after entry fill.`,
      `For volatile assets: use ATR (Average True Range) to set SL width. A SL of 1.5–2× daily ATR below entry provides a buffer against normal volatility while limiting maximum loss to a defined amount. Calculate the resulting R:R with this tool after placing SL at ATR-based level.`
      ],
      hygiene: [
      `Review your TP/SL placements weekly. If you are consistently being stopped out only to see price recover and hit your original TP, your SL is too tight relative to the asset's normal volatility. Widen SL and reduce position size to compensate (keeping dollar risk constant).`,
      `After each closed trade, log the actual exit price versus planned TP/SL. Consistent slippage on stops (filling worse than set) indicates high-volatility stops — use limit orders to close at SL level for tighter fills, accepting slightly higher hit rate on entry in exchange for better execution.`
      ],
      validation: [
      `Verify R:R calculation: (TP distance / SL distance). If TP is 6% above entry and SL is 2% below, R:R = 3:1. The calculator should show this ratio — if it does not, check whether entry, TP, and SL are entered in the correct fields without sign reversals.`,
      `Confirm dollar amounts: (position size in dollars × SL% distance) = maximum dollar loss. If you entered $10,000 position with 2% SL, maximum loss is $200. Cross-check this against your risk tolerance before confirming the trade.`
      ],
    },
    es: {
      interpret: [
      `El calculador de TP/SL produce los niveles de precio exactos para tus órdenes de take-profit y stop-loss, junto con las cantidades en dólares ganadas o perdidas si cada una se activa. La relación recompensa-riesgo (R:R) es el número más importante.`,
      `El cálculo de la tasa de victorias de equilibrio muestra el porcentaje mínimo de victorias necesario para ser rentable con estos niveles específicos de TP y SL.`
      ],
      scenarios: [
      `Planificación estructurada de operaciones: antes de entrar en cualquier operación, introduce entrada, TP y SL en este calculador para confirmar R:R. Rechaza entrar en cualquier operación donde R:R esté por debajo de tu umbral mínimo.`,
      `Planificación de salida parcial: introduce dos niveles de TP separados — un TP más cercano (1:1 R:R) para toma de beneficios parcial y un TP más amplio (3:1 R:R) para la posición restante.`
      ],
      checklist: [
      `Antes de finalizar los niveles de TP y SL: 1) Coloca el SL en un nivel técnicamente justificado. 2) Coloca el TP en el siguiente nivel de resistencia significativo. 3) Confirma que R:R supera el mínimo requerido de tu estrategia.`,
      `Después de entrar en la operación: coloca inmediatamente tanto TP como SL como órdenes OCO en tu exchange.`
      ],
      mistakes: [
      `Mover el stop-loss más lejos ("darle más espacio") cuando el precio se acerca es el comportamiento de trading más destructivo. El SL inicial se colocó en el nivel donde la tesis de la operación era incorrecta.`,
      `Establecer TP y SL solo en números redondos cuando la estructura del mercado sugiere niveles diferentes.`
      ],
      benchmarks: [
      `El R:R mínimo viable para la mayoría de las estrategias sistemáticas es 2:1. Los traders profesionales en estrategias de seguimiento de tendencias a menudo apuntan a 3:1 o más.`,
      `Tu R:R promedio en todas las operaciones debe superar 2:1 si tu tasa de victorias está cerca del 40–50%.`
      ],
      execution: [
      `Flujo de trabajo óptimo para establecer TP/SL: 1) Marca el punto de entrada. 2) Marca el SL en el nivel donde tu tesis de operación se invalida. 3) Marca el TP en la siguiente resistencia/soporte significativo. 4) Calcula R:R con este calculador. 5) Si R:R < 2:1, amplía el TP o salta la operación.`,
      `Para activos volátiles: usa ATR para establecer el ancho del SL.`
      ],
      hygiene: [
      `Revisa tus posicionamientos de TP/SL semanalmente. Si consistentemente te están expulsando solo para ver que el precio se recupera y alcanza tu TP original, tu SL está demasiado ajustado.`,
      `Después de cada operación cerrada, registra el precio de salida real versus TP/SL planificado.`
      ],
      validation: [
      `Verifica el cálculo de R:R: (distancia de TP / distancia de SL). Si el TP está un 6% por encima de la entrada y el SL está un 2% por debajo, R:R = 3:1.`,
      `Confirma los montos en dólares: (tamaño de posición en dólares × % de distancia de SL) = pérdida máxima en dólares.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora TP/SL produz os níveis de preço exatos para suas ordens de take-profit e stop-loss, junto com os valores em dólares ganhos ou perdidos se cada uma for acionada. A relação recompensa-risco (R:R) é o número mais importante.`,
      `O cálculo da taxa de vitórias de equilíbrio mostra o percentual mínimo de vitórias necessário para ser lucrativo com esses níveis específicos de TP e SL.`
      ],
      scenarios: [
      `Planejamento estruturado de operações: antes de entrar em qualquer operação, insira entrada, TP e SL nesta calculadora para confirmar R:R.`,
      `Planejamento de saída parcial: insira dois níveis de TP separados — um TP mais próximo (1:1 R:R) para tomada de lucro parcial e um TP mais amplo (3:1 R:R) para a posição restante.`
      ],
      checklist: [
      `Antes de finalizar os níveis de TP e SL: 1) Coloque o SL em um nível tecnicamente justificado. 2) Coloque o TP no próximo nível de resistência significativo. 3) Confirme que R:R supera o mínimo exigido pela sua estratégia.`,
      `Após entrar na operação: coloque imediatamente tanto TP quanto SL como ordens OCO na sua exchange.`
      ],
      mistakes: [
      `Mover o stop-loss mais para longe quando o preço se aproxima é o comportamento de trading mais destrutivo.`,
      `Definir TP e SL apenas em números redondos quando a estrutura de mercado sugere níveis diferentes.`
      ],
      benchmarks: [
      `O R:R mínimo viável para a maioria das estratégias sistemáticas é 2:1.`,
      `Seu R:R médio em todas as operações deve superar 2:1 se sua taxa de vitórias estiver próxima de 40–50%.`
      ],
      execution: [
      `Fluxo de trabalho ideal para definir TP/SL: 1) Marque o ponto de entrada. 2) Marque o SL no nível onde sua tese de operação é invalidada. 3) Marque o TP na próxima resistência/suporte significativo. 4) Calcule R:R com esta calculadora.`,
      `Para ativos voláteis: use ATR para definir a largura do SL.`
      ],
      hygiene: [
      `Revise seus posicionamentos de TP/SL semanalmente.`,
      `Após cada operação fechada, registre o preço de saída real versus TP/SL planejado.`
      ],
      validation: [
      `Verifique o cálculo de R:R: (distância do TP / distância do SL).`,
      `Confirme os valores em dólares: (tamanho da posição em dólares × % de distância do SL) = perda máxima em dólares.`
      ],
    },
    tr: {
      interpret: [
      `TP/SL hesaplayıcısı, kâr al ve zararı durdur emirleriniz için tam fiyat seviyelerini ve her biri tetiklendiğinde kazanılan veya kaybedilen dolar tutarlarını çıktılar. Ödül-risk oranı (R:R) en önemli sayıdır.`,
      `Başabaş kazanma oranı hesaplaması, bu belirli TP ve SL seviyeleriyle kârlı olmak için gereken minimum kazanma yüzdesini gösterir.`
      ],
      scenarios: [
      `Yapılandırılmış işlem planlaması: herhangi bir işleme girmeden önce R:R'yi onaylamak için giriş, TP ve SL'yi bu hesaplayıcıya girin.`,
      `Kısmi çıkış planlaması: iki ayrı TP seviyesi girin — kısmi kâr almak için daha yakın bir TP ve kalan pozisyon için daha geniş bir TP.`
      ],
      checklist: [
      `TP ve SL seviyelerini kesinleştirmeden önce: 1) SL'yi teknik olarak gerekçelendirilmiş bir seviyeye yerleştirin. 2) TP'yi bir sonraki önemli direnç seviyesine yerleştirin. 3) R:R'nin stratejinizin gereken minimumunu aştığını onaylayın.`,
      `İşleme girdikten sonra: borsanızda hem TP hem de SL'yi OCO emirleri olarak hemen yerleştirin.`
      ],
      mistakes: [
      `Fiyat yaklaştığında stop-loss'u daha da uzaklaştırmak ("daha fazla alan vermek") en yıkıcı trading davranışıdır.`,
      `Piyasa yapısı farklı seviyeleri önerdiğinde TP ve SL'yi yalnızca yuvarlak sayılarda belirlemek.`
      ],
      benchmarks: [
      `Çoğu sistematik strateji için minimum uygulanabilir R:R 2:1'dir.`,
      `Kazanma oranınız %40–50 civarındaysa tüm işlemlerdeki ortalama R:R'niz 2:1'i aşmalıdır.`
      ],
      execution: [
      `Optimal TP/SL ayar iş akışı: 1) Giriş noktasını işaretleyin. 2) İşlem tezinizin geçersiz kılındığı seviyede SL'yi işaretleyin. 3) Bir sonraki önemli direnç/destekte TP'yi işaretleyin. 4) Bu hesaplayıcı ile R:R'yi hesaplayın.`,
      `Oynak varlıklar için: SL genişliğini belirlemek üzere ATR kullanın.`
      ],
      hygiene: [
      `TP/SL yerleşimlerinizi haftalık olarak gözden geçirin.`,
      `Her kapalı işlemden sonra gerçek çıkış fiyatını planlanan TP/SL ile kaydedin.`
      ],
      validation: [
      `R:R hesaplamasını doğrulayın: (TP mesafesi / SL mesafesi).`,
      `Dolar tutarlarını onaylayın: (dolar cinsinden pozisyon büyüklüğü × SL % mesafesi) = maksimum dolar kaybı.`
      ],
    },
    hi: {
      interpret: [
      `TP/SL कैलकुलेटर आपके टेक-प्रॉफिट और स्टॉप-लॉस ऑर्डर के लिए सटीक मूल्य स्तर आउटपुट करता है, साथ ही प्रत्येक ट्रिगर होने पर जीती या हारी डॉलर राशि। रिवार्ड-टू-रिस्क अनुपात (R:R) सबसे महत्वपूर्ण संख्या है।`,
      `ब्रेक-ईवन विन रेट गणना इन विशिष्ट TP और SL स्तरों के साथ लाभदायक होने के लिए आवश्यक न्यूनतम जीत प्रतिशत दिखाती है।`
      ],
      scenarios: [
      `संरचित ट्रेड योजना: किसी भी ट्रेड में प्रवेश करने से पहले, R:R की पुष्टि करने के लिए इस कैलकुलेटर में प्रवेश, TP और SL दर्ज करें।`,
      `आंशिक निकास योजना: दो अलग TP स्तर दर्ज करें — आंशिक लाभ लेने के लिए करीबी TP (1:1 R:R) और शेष पोजीशन के लिए व्यापक TP (3:1 R:R)।`
      ],
      checklist: [
      `TP और SL स्तरों को अंतिम रूप देने से पहले: 1) SL को तकनीकी रूप से उचित स्तर पर रखें। 2) TP को अगले महत्वपूर्ण प्रतिरोध स्तर पर रखें। 3) पुष्टि करें कि R:R आपकी रणनीति की आवश्यक न्यूनतम से अधिक है।`,
      `ट्रेड में प्रवेश करने के बाद: तुरंत अपने एक्सचेंज पर TP और SL दोनों को OCO ऑर्डर के रूप में रखें।`
      ],
      mistakes: [
      `जब मूल्य पास आता है तो स्टॉप-लॉस को और दूर ले जाना ("अधिक जगह देना") सबसे विनाशकारी ट्रेडिंग व्यवहार है।`,
      `जब बाजार संरचना अलग स्तर सुझाती है तो TP और SL को केवल गोल संख्याओं पर सेट करना।`
      ],
      benchmarks: [
      `अधिकांश व्यवस्थित रणनीतियों के लिए न्यूनतम व्यवहार्य R:R 2:1 है।`,
      `यदि आपकी जीत दर 40–50% के करीब है तो सभी ट्रेड में आपका औसत R:R 2:1 से अधिक होना चाहिए।`
      ],
      execution: [
      `इष्टतम TP/SL सेटिंग वर्कफ़्लो: 1) प्रवेश बिंदु चिह्नित करें। 2) SL को उस स्तर पर चिह्नित करें जहां आपकी ट्रेड थीसिस अमान्य हो जाती है। 3) TP को अगले महत्वपूर्ण प्रतिरोध/समर्थन पर चिह्नित करें। 4) इस कैलकुलेटर से R:R की गणना करें।`,
      `अस्थिर संपत्तियों के लिए: SL चौड़ाई सेट करने के लिए ATR का उपयोग करें।`
      ],
      hygiene: [
      `अपनी TP/SL प्लेसमेंट की साप्ताहिक समीक्षा करें।`,
      `प्रत्येक बंद ट्रेड के बाद, नियोजित TP/SL के विरुद्ध वास्तविक निकास मूल्य लॉग करें।`
      ],
      validation: [
      `R:R गणना सत्यापित करें: (TP दूरी / SL दूरी)।`,
      `डॉलर राशि की पुष्टि करें: (डॉलर में पोजीशन साइज × SL% दूरी) = अधिकतम डॉलर हानि।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор TP/SL выводит точные ценовые уровни для ордеров тейк-профит и стоп-лосс, а также суммы в долларах, выигранные или проигранные при срабатывании каждого. Соотношение риск/прибыль (R:R) — самое важное число: оно должно превышать 2:1 при 40% успешных сделок.`,
      `Расчёт минимального процента побед для безубыточности показывает, при каком проценте выигрышей конкретные уровни TP и SL дают нулевое математическое ожидание. Используйте это для калибровки стратегии.`
      ],
      scenarios: [
      `Структурированное планирование сделки: перед входом в любую сделку введите точку входа, TP и SL в этот калькулятор для подтверждения R:R. Откажитесь от сделки, если R:R ниже вашего минимального порога (рекомендуется 2:1 для новых трейдеров).`,
      `Планирование частичного выхода: введите два отдельных уровня TP — ближний TP (1:1 R:R) для частичной фиксации и дальний TP (3:1 R:R) для оставшейся позиции. Рассчитайте смешанное среднее R:R по обоим выходам.`
      ],
      checklist: [
      `Перед установкой уровней TP и SL: 1) Размещайте SL на технически обоснованном уровне. 2) Размещайте TP на следующем значимом уровне сопротивления (для лонгов). 3) Убедитесь, что R:R превышает требуемый минимум стратегии.`,
      `После входа в сделку: немедленно разместите оба ордера TP и SL как OCO (один отменяет другой) на бирже.`
      ],
      mistakes: [
      `Перемещение стоп-лосса дальше ("давать больше пространства"), когда цена приближается к нему — самое разрушительное торговое поведение. Начальный SL был установлен там, где торговая идея оказывается неверной — достигнув его, нужно выходить.`,
      `Установка TP и SL только на круглых числах, когда рыночная структура предполагает иные уровни.`
      ],
      benchmarks: [
      `Минимально допустимое R:R для большинства систематических стратегий — 2:1. В трендовых стратегиях профессиональные трейдеры часто целятся в 3:1 и выше.`,
      `Среднее R:R по всем сделкам должно превышать 2:1, если коэффициент побед близок к 40–50%.`
      ],
      execution: [
      `Оптимальный процесс установки TP/SL: 1) Отметьте точку входа. 2) Отметьте SL на уровне, где торговая идея аннулируется. 3) Отметьте TP на следующем значимом сопротивлении/поддержке. 4) Рассчитайте R:R. 5) Если R:R < 2:1, либо расширяйте TP, либо пропускайте сделку. 6) Немедленно после заполнения входа разместите OCO-ордера.`,
      `Для волатильных активов: используйте ATR (средний истинный диапазон) для определения ширины SL. SL в 1.5–2× дневного ATR ниже входа обеспечивает буфер против нормальной волатильности.`
      ],
      hygiene: [
      `Еженедельно пересматривайте расстановку TP/SL. Если вас постоянно останавливают только для того, чтобы цена восстановилась и достигла исходного TP, SL слишком близкий — расширьте его и уменьшите размер позиции.`,
      `После каждой закрытой сделки фиксируйте фактическую цену выхода в сравнении с плановыми TP/SL. Постоянное проскальзывание на стопах указывает на необходимость использования лимитных ордеров.`
      ],
      validation: [
      `Проверьте расчёт R:R: (расстояние до TP / расстояние до SL). Если TP на 6% выше входа, а SL на 2% ниже, R:R = 3:1.`,
      `Подтвердите суммы в долларах: (размер позиции в долларах × % расстояния SL) = максимальные потери в долларах.`
      ],
    },
  },
  'margin-calculator': {
    en: {
      interpret: [
      `The margin calculator outputs the required initial margin (the collateral you must deposit) and maintenance margin (the minimum collateral to keep the position open) for a given leveraged position. The gap between initial and maintenance margin is your operational buffer — the amount the position can move against you before approaching liquidation. This buffer shrinks as leverage increases: at 20× leverage, even a small adverse move uses up most of this buffer.`,
      `The "available balance after margin" tells you how much free collateral remains in your account. This matters because it determines your capacity to open additional positions or to add margin if this position moves against you. Keeping 30–50% of your account as free margin (not committed to any position) is recommended to avoid margin calls during simultaneous position drawdowns.`
      ],
      scenarios: [
      `Portfolio margin planning: if you are running multiple positions, use this calculator for each one and sum the required margin. Compare the total against your account balance to ensure you maintain adequate free margin (at least 30%). Overleveraging multiple simultaneous positions is the fastest way to trigger a cascade of liquidations during a market move.`,
      `Cross-margin vs. isolated margin comparison: with cross margin, all account equity backs all positions; with isolated margin, only the amount allocated to the specific position is at risk. Use this calculator to see exactly how much each mode requires and choose isolated margin when you want to risk only a defined amount on a high-conviction trade.`
      ],
      checklist: [
      `Before opening a leveraged position: 1) Calculate required initial margin at your chosen leverage. 2) Subtract from account balance to confirm adequate free margin remains. 3) Check that maintenance margin is not more than 70% of initial margin (a very thin buffer). 4) Calculate what price move triggers the maintenance margin call.`,
      `After committing margin: do not open additional positions that bring total required margin above 60–70% of your account balance. Leave room for adverse moves in existing positions before new positions are added.`
      ],
      mistakes: [
      `Maxing out available margin across multiple positions is a compound risk error. If all positions correlate during a market panic (as crypto assets typically do), the simultaneous drawdown can trigger multiple liquidations before you can manually close any position.`,
      `Using isolated margin on a position and then manually adding margin multiple times to prevent liquidation without reassessing the trade thesis is equivalent to moving a stop-loss. Re-evaluate the original trade idea; if the thesis is broken, close the position — do not keep adding margin.`
      ],
      benchmarks: [
      `A conservative margin usage ratio is 30–40% of account equity committed to all open positions. A moderate ratio is 40–60%. Above 70% is high risk — a 30–40% adverse move in the underlying asset can trigger margin calls. Professional desk margin usage rarely exceeds 50% to preserve reaction capacity.`,
      `Effective leverage (total notional exposure / total account equity) should not exceed 3–5× for most non-professional traders. At 10× effective leverage, a 10% drawdown in your positions = 100% margin loss. Calculate your effective leverage across all open positions using this tool.`
      ],
      execution: [
      `Margin management workflow: 1) Calculate position margin before opening. 2) Record margin commitment in a spreadsheet. 3) After opening, monitor total margin usage daily. 4) If margin usage exceeds 60%, close the least-conviction position or reduce the largest position by 50%. 5) Never add to a position that already consumes more than 20% of your account margin.`,
      `For swing traders holding positions overnight: use isolated margin mode so unexpected events don't trigger liquidations across your entire portfolio from a single bad position. The cost is slightly higher, but the protection is worth it for multi-day holds.`
      ],
      hygiene: [
      `Check your total margin usage at the start of each trading session. Exchanges sometimes automatically adjust margin requirements after policy changes, which can unexpectedly increase the margin committed to existing positions.`,
      `Track your historical margin usage ratio (committed margin / total account). A rising ratio over weeks signals gradual over-leverage build-up — a leading indicator of the type of account vulnerability that triggers large drawdowns.`
      ],
      validation: [
      `Verify the initial margin calculation: (position notional value / leverage ratio). For a $10,000 BTC position at 10× leverage, initial margin should be $1,000. If your exchange shows a different amount, check whether it charges an opening fee that is added to the margin requirement.`,
      `Cross-check your calculated maintenance margin rate against the exchange's published specification (usually 0.5–1% of notional for major assets). If the calculator and exchange figures differ by more than 0.2%, update your inputs to use the exact rate from the exchange documentation.`
      ],
    },
    es: {
      interpret: [
      `El calculador de margen produce el margen inicial requerido (la garantía que debes depositar) y el margen de mantenimiento (la garantía mínima para mantener la posición abierta) para una posición apalancada dada.`,
      `El "saldo disponible después del margen" te indica cuánta garantía libre permanece en tu cuenta. Mantener el 30–50% de tu cuenta como margen libre es recomendable para evitar llamadas de margen durante caídas simultáneas de posición.`
      ],
      scenarios: [
      `Planificación de margen de cartera: si estás ejecutando múltiples posiciones, usa este calculador para cada una y suma el margen requerido. Compara el total con tu saldo de cuenta para asegurar un margen libre adecuado.`,
      `Comparación de margen cruzado vs. margen aislado: con margen cruzado, todo el patrimonio de la cuenta respalda todas las posiciones; con margen aislado, solo el monto asignado a la posición específica está en riesgo.`
      ],
      checklist: [
      `Antes de abrir una posición apalancada: 1) Calcula el margen inicial requerido con tu apalancamiento elegido. 2) Resta del saldo de la cuenta para confirmar que queda margen libre adecuado. 3) Comprueba que el margen de mantenimiento no sea más del 70% del margen inicial. 4) Calcula qué movimiento de precio desencadena la llamada de margen de mantenimiento.`,
      `Después de comprometer el margen: no abras posiciones adicionales que lleven el margen requerido total por encima del 60–70% del saldo de tu cuenta.`
      ],
      mistakes: [
      `Maximizar el margen disponible en múltiples posiciones es un error de riesgo compuesto. Si todas las posiciones se correlacionan durante un pánico del mercado, la caída simultánea puede desencadenar múltiples liquidaciones.`,
      `Usar margen aislado en una posición y luego agregar margen manualmente varias veces para evitar la liquidación sin reevaluar la tesis de la operación es equivalente a mover un stop-loss.`
      ],
      benchmarks: [
      `Un ratio de uso de margen conservador es el 30–40% del patrimonio de la cuenta comprometido con todas las posiciones abiertas. Un ratio moderado es el 40–60%.`,
      `El apalancamiento efectivo (exposición nocional total / patrimonio total de la cuenta) no debería superar 3–5× para la mayoría de los traders no profesionales.`
      ],
      execution: [
      `Flujo de trabajo de gestión de margen: 1) Calcula el margen de la posición antes de abrir. 2) Registra el compromiso de margen en una hoja de cálculo. 3) Después de abrir, monitoriza el uso total de margen diariamente. 4) Si el uso de margen supera el 60%, cierra la posición con menos convicción o reduce la mayor en un 50%.`,
      `Para traders swing que mantienen posiciones durante la noche: usa el modo de margen aislado para que eventos inesperados no desencadenen liquidaciones en toda tu cartera desde una sola posición mala.`
      ],
      hygiene: [
      `Comprueba el uso total de margen al inicio de cada sesión de trading.`,
      `Rastrea tu ratio histórico de uso de margen (margen comprometido / cuenta total). Un ratio creciente durante semanas indica una acumulación gradual de sobrepalanqueo.`
      ],
      validation: [
      `Verifica el cálculo del margen inicial: (valor nocional de la posición / ratio de apalancamiento).`,
      `Verifica tu tasa de margen de mantenimiento calculada con la especificación publicada por el exchange.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de margem produz a margem inicial necessária (o colateral que você deve depositar) e a margem de manutenção (o colateral mínimo para manter a posição aberta) para uma posição alavancada.`,
      `O "saldo disponível após margem" indica quanto colateral livre permanece na sua conta. Manter 30–50% da sua conta como margem livre é recomendável para evitar chamadas de margem durante quedas simultâneas de posição.`
      ],
      scenarios: [
      `Planejamento de margem de portfólio: se você está gerindo várias posições, use esta calculadora para cada uma e some a margem necessária.`,
      `Comparação de margem cruzada vs. margem isolada.`
      ],
      checklist: [
      `Antes de abrir uma posição alavancada: 1) Calcule a margem inicial necessária com sua alavancagem escolhida. 2) Subtraia do saldo da conta para confirmar que sobra margem livre adequada. 3) Verifique se a margem de manutenção não é mais de 70% da margem inicial.`,
      `Após comprometer margem: não abra posições adicionais que levem a margem total necessária acima de 60–70% do saldo da sua conta.`
      ],
      mistakes: [
      `Maximizar a margem disponível em várias posições é um erro de risco composto.`,
      `Usar margem isolada em uma posição e depois adicionar margem manualmente várias vezes para evitar liquidação sem reavaliar a tese da operação.`
      ],
      benchmarks: [
      `Uma relação de uso de margem conservadora é 30–40% do patrimônio da conta comprometido com todas as posições abertas.`,
      `A alavancagem efetiva (exposição nocional total / patrimônio total da conta) não deve exceder 3–5× para a maioria dos traders não profissionais.`
      ],
      execution: [
      `Fluxo de trabalho de gestão de margem: 1) Calcule a margem da posição antes de abrir. 2) Registre o compromisso de margem em uma planilha. 3) Após abrir, monitore o uso total de margem diariamente. 4) Se o uso de margem exceder 60%, feche a posição de menor convicção ou reduza a maior em 50%.`,
      `Para traders swing mantendo posições durante a noite: use o modo de margem isolada.`
      ],
      hygiene: [
      `Verifique o uso total de margem no início de cada sessão de trading.`,
      `Rastreie sua relação histórica de uso de margem.`
      ],
      validation: [
      `Verifique o cálculo da margem inicial: (valor nocional da posição / taxa de alavancagem).`,
      `Verifique sua taxa de margem de manutenção calculada com a especificação publicada pela exchange.`
      ],
    },
    tr: {
      interpret: [
      `Marjin hesaplayıcısı, belirli bir kaldıraçlı pozisyon için gerekli başlangıç marjini (yatırmanız gereken teminat) ve bakım marjinini (pozisyonu açık tutmak için minimum teminat) çıktılar.`,
      `"Marjin sonrası kullanılabilir bakiye", hesabınızda ne kadar serbest teminatın kaldığını söyler.`
      ],
      scenarios: [
      `Portföy marjin planlaması: birden fazla pozisyon yürütüyorsanız, her biri için bu hesaplayıcıyı kullanın ve gerekli marjini toplayın.`,
      `Çapraz marjin ve izole marjin karşılaştırması.`
      ],
      checklist: [
      `Kaldıraçlı bir pozisyon açmadan önce: 1) Seçilen kaldıraçta gerekli başlangıç marjinini hesaplayın. 2) Yeterli serbest marjin kaldığını onaylamak için hesap bakiyesinden çıkarın. 3) Bakım marjininin başlangıç marjininin %70'inden fazla olmadığını kontrol edin.`,
      `Marjin taahhüdünden sonra: toplam gerekli marjini hesap bakiyenizin %60–70'inin üzerine çıkaracak ek pozisyonlar açmayın.`
      ],
      mistakes: [
      `Birden fazla pozisyonda kullanılabilir marjini maksimize etmek bileşik bir risk hatasıdır.`,
      `İzole marjin kullanmak ve ardından işlem tezini yeniden değerlendirmeden tasfiyeyi önlemek için manuel olarak birden fazla kez marjin eklemek.`
      ],
      benchmarks: [
      `Muhafazakâr bir marjin kullanım oranı, tüm açık pozisyonlara bağlı hesap öz sermayesinin %30–40'ıdır.`,
      `Efektif kaldıraç (toplam nosyonel maruz kalma / toplam hesap öz sermayesi) çoğu profesyonel olmayan trader için 3–5×'i aşmamalıdır.`
      ],
      execution: [
      `Marjin yönetimi iş akışı: 1) Açmadan önce pozisyon marjinini hesaplayın. 2) Marjin taahhüdünü bir tabloya kaydedin. 3) Açtıktan sonra toplam marjin kullanımını günlük olarak izleyin.`,
      `Gecelik pozisyon tutan swing traderlar için: izole marjin modunu kullanın.`
      ],
      hygiene: [
      `Her trading seansının başında toplam marjin kullanımını kontrol edin.`,
      `Tarihsel marjin kullanım oranınızı (taahhüt edilen marjin / toplam hesap) takip edin.`
      ],
      validation: [
      `Başlangıç marjin hesaplamasını doğrulayın: (pozisyon nosyonel değeri / kaldıraç oranı).`,
      `Hesaplanan bakım marjin oranınızı borsanın yayınlanmış özelliğiyle çapraz kontrol edin.`
      ],
    },
    hi: {
      interpret: [
      `मार्जिन कैलकुलेटर एक दिए गए लीवरेज्ड पोजीशन के लिए आवश्यक प्रारंभिक मार्जिन (संपार्श्विक जो आपको जमा करना होगा) और रखरखाव मार्जिन (पोजीशन खुली रखने के लिए न्यूनतम संपार्श्विक) आउटपुट करता है।`,
      `"मार्जिन के बाद उपलब्ध शेष" बताता है कि आपके खाते में कितना मुफ्त संपार्श्विक शेष है।`
      ],
      scenarios: [
      `पोर्टफोलियो मार्जिन योजना: यदि आप कई पोजीशन चला रहे हैं, तो प्रत्येक के लिए इस कैलकुलेटर का उपयोग करें और आवश्यक मार्जिन जोड़ें।`,
      `क्रॉस-मार्जिन बनाम आइसोलेटेड मार्जिन तुलना।`
      ],
      checklist: [
      `लीवरेज्ड पोजीशन खोलने से पहले: 1) अपने चुने हुए उत्तोलन पर आवश्यक प्रारंभिक मार्जिन की गणना करें। 2) पर्याप्त मुफ्त मार्जिन शेष की पुष्टि करने के लिए खाते के शेष से घटाएं। 3) जांचें कि रखरखाव मार्जिन प्रारंभिक मार्जिन के 70% से अधिक नहीं है।`,
      `मार्जिन प्रतिबद्ध करने के बाद: अतिरिक्त पोजीशन न खोलें जो कुल आवश्यक मार्जिन को आपके खाते के शेष के 60–70% से अधिक ले जाए।`
      ],
      mistakes: [
      `कई पोजीशन में उपलब्ध मार्जिन को अधिकतम करना एक यौगिक जोखिम त्रुटि है।`,
      `एक पोजीशन पर आइसोलेटेड मार्जिन का उपयोग करना और फिर ट्रेड थीसिस का पुनर्मूल्यांकन किए बिना लिक्विडेशन को रोकने के लिए कई बार मैन्युअल रूप से मार्जिन जोड़ना।`
      ],
      benchmarks: [
      `एक रूढ़िवादी मार्जिन उपयोग अनुपात सभी खुली पोजीशन के लिए प्रतिबद्ध खाता इक्विटी का 30–40% है।`,
      `प्रभावी उत्तोलन (कुल नोशनल एक्सपोजर / कुल खाता इक्विटी) अधिकांश गैर-पेशेवर ट्रेडर्स के लिए 3–5× से अधिक नहीं होना चाहिए।`
      ],
      execution: [
      `मार्जिन प्रबंधन वर्कफ़्लो: 1) खोलने से पहले पोजीशन मार्जिन की गणना करें। 2) स्प्रेडशीट में मार्जिन प्रतिबद्धता रिकॉर्ड करें। 3) खोलने के बाद, दैनिक रूप से कुल मार्जिन उपयोग की निगरानी करें।`,
      `रात भर पोजीशन रखने वाले स्विंग ट्रेडर्स के लिए: आइसोलेटेड मार्जिन मोड का उपयोग करें।`
      ],
      hygiene: [
      `प्रत्येक ट्रेडिंग सत्र की शुरुआत में अपने कुल मार्जिन उपयोग की जांच करें।`,
      `अपने ऐतिहासिक मार्जिन उपयोग अनुपात (प्रतिबद्ध मार्जिन / कुल खाता) को ट्रैक करें।`
      ],
      validation: [
      `प्रारंभिक मार्जिन गणना को सत्यापित करें: (पोजीशन नोशनल मूल्य / उत्तोलन अनुपात)।`,
      `एक्सचेंज के प्रकाशित विनिर्देश के साथ अपनी परिकलित रखरखाव मार्जिन दर को क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор маржи выводит требуемую начальную маржу (обеспечение, которое необходимо внести) и поддерживающую маржу (минимальное обеспечение для сохранения позиции открытой) для заданной позиции с кредитным плечом.`,
      `"Свободный баланс после маржи" показывает, сколько свободного обеспечения остаётся на счёте. Хранение 30–50% счёта как свободной маржи рекомендуется для предотвращения маржин-коллов при одновременных просадках.`
      ],
      scenarios: [
      `Планирование маржи портфеля: при ведении нескольких позиций используйте этот калькулятор для каждой и суммируйте требуемую маржу. Сравните с балансом счёта для обеспечения адекватной свободной маржи (минимум 30%).`,
      `Сравнение кросс-маржи и изолированной маржи: при кросс-марже весь капитал счёта поддерживает все позиции; при изолированной — только сумма, выделенная для конкретной позиции.`
      ],
      checklist: [
      `Перед открытием позиции с кредитным плечом: 1) Рассчитайте требуемую начальную маржу при выбранном плече. 2) Вычтите из баланса счёта для подтверждения достаточной свободной маржи. 3) Убедитесь, что поддерживающая маржа не превышает 70% начальной маржи. 4) Рассчитайте, какое движение цены вызывает маржин-колл.`,
      `После внесения маржи: не открывайте дополнительные позиции, которые доведут общую требуемую маржу выше 60–70% от баланса счёта.`
      ],
      mistakes: [
      `Использование максимально доступной маржи по нескольким позициям — ошибка с составным риском. Если все позиции коррелируют во время рыночной паники (как обычно в крипто), одновременная просадка может вызвать каскад ликвидаций.`,
      `Использование изолированной маржи по позиции с последующим многократным ручным пополнением без переоценки торговой идеи эквивалентно сдвигу стоп-лосса.`
      ],
      benchmarks: [
      `Консервативный коэффициент использования маржи — 30–40% капитала счёта, задействованного во всех открытых позициях. Умеренный — 40–60%. Выше 70% — высокий риск.`,
      `Эффективное кредитное плечо (общий номинальный риск / общий капитал счёта) не должно превышать 3–5× для большинства непрофессиональных трейдеров.`
      ],
      execution: [
      `Процесс управления маржей: 1) Рассчитайте маржу позиции перед открытием. 2) Запишите обязательство по марже в таблицу. 3) После открытия ежедневно отслеживайте общее использование маржи. 4) Если использование маржи превышает 60%, закройте наименее убедительную позицию или сократите крупнейшую на 50%.`,
      `Для свинг-трейдеров, удерживающих позиции на ночь: используйте режим изолированной маржи, чтобы неожиданные события не спровоцировали ликвидации по всему портфелю.`
      ],
      hygiene: [
      `Проверяйте общее использование маржи в начале каждой торговой сессии. Биржи иногда автоматически корректируют требования к марже после изменений политики.`,
      `Отслеживайте исторический коэффициент использования маржи (задействованная маржа / общий счёт). Растущий показатель за недели — признак постепенного накопления чрезмерного кредитного плеча.`
      ],
      validation: [
      `Проверьте расчёт начальной маржи: (номинальная стоимость позиции / коэффициент кредитного плеча). Для позиции BTC на $10 000 при плече 10× начальная маржа должна составить $1 000.`,
      `Сверьте расчётную ставку поддерживающей маржи с опубликованной спецификацией биржи (обычно 0.5–1% номинала для основных активов).`
      ],
    },
  },


  'pip-calculator': {
    en: {
      interpret: [
      `The pip value output tells you exactly how much one minimum price movement (pip) is worth in your account currency for the position size and pair you entered. This number multiplied by the number of pips your stop-loss is away from entry gives your exact dollar risk per trade — making it the essential bridge between your chart analysis and your position sizing.`,
      `For crypto pairs priced in USD (BTC/USD, ETH/USD), pip value calculations are straightforward. For cross-pairs (ETH/BTC, ALT/ETH), the pip value is denominated in the quote currency (BTC or ETH), then converted to USD at current rates. If the output looks unexpectedly small or large, verify the quote currency conversion step and confirm the lot size is appropriate for your asset class.`
      ],
      scenarios: [
      `Pre-trade sizing: enter your intended trade size and the number of pips to your stop-loss, and the calculator returns your dollar risk. Adjust position size until dollar risk equals your target risk amount (e.g., 1% of account).`,
      `Volatility comparison across pairs: run this calculator for different trading pairs using the same position size. Pairs with higher pip values have higher inherent risk per unit of price movement — use this to compare risk-adjusted opportunity across assets before choosing which pair to trade.`
      ],
      checklist: [
      `Before calculating pip value: 1) Confirm the correct lot size for your asset (crypto typically uses 1 coin or fractional amounts, not the 100,000 unit forex lot). 2) Verify the quote currency — BTC/USD quote is USD, but ETH/BTC quote is BTC. 3) Use your exchange's exact minimum price increment, which may differ from standard pip definitions.`,
      `After calculating: multiply pip value × number of pips to stop = dollar risk. If this exceeds 1% of your account, reduce lot size proportionally and recalculate.`
      ],
      mistakes: [
      `Using the wrong lot size or pip definition for crypto markets. Crypto does not use standard forex lot sizes. A $10,000 BTC position has a pip value based on the $10,000 notional, not a 100,000-unit lot. Directly copying forex pip values into crypto trades can oversize positions by 10× or more.`,
      `Forgetting that pip value changes with exchange rates. A BTC/USD pip was worth much more in dollar terms when BTC was at $60,000 than when it was at $20,000. Recalculate pip value whenever you enter a new trade — do not carry over pip values from previous sessions.`
      ],
      benchmarks: [
      `For a $10,000 account with 1% risk per trade ($100 risk), targeting a 20-pip stop should produce a position size of $100/pip-value-per-pip. If your pip value is $0.50/pip, position size is $100/0.50 = 200 units. This calibration keeps you within risk tolerance regardless of market price level.`,
      `Compare your average pip cost per trade across different pairs to assess where you get the best risk-adjusted exposure for your risk budget.`
      ],
      execution: [
      `Standard workflow: 1) Identify trade setup and stop-loss level in pips. 2) Enter trade pair, position size, and stop distance into this calculator. 3) Verify dollar risk equals target risk amount. 4) Adjust position size if needed. 5) Execute trade.`,
      `For automation: store your per-pip value for each pair you trade regularly and update it when prices shift significantly. Many traders use a simple table of pair → pip value → recalculate threshold to streamline trade sizing.`
      ],
      hygiene: [
      `Recalculate pip value at the start of each week for pairs you trade actively. Large price movements (>20%) can shift pip values enough to distort your risk calculations from the prior week.`,
      `Log the pip value used for each trade alongside position size. During trade review, this helps identify trades where pip value had shifted but was not updated, leading to unintended oversizing.`
      ],
      validation: [
      `Manual check: pip value = (pip size × lot size) / exchange rate if quote currency is not USD. If all values are in USD, pip value = pip size × lot size. Compare to calculator output — if it differs by more than 0.1%, recheck the exchange rate used for conversion.`,
      `After a trade, verify that the actual dollar loss/gain per pip (from your exchange statement) matches the calculated pip value. Consistent differences indicate an incorrect lot size or pip definition in your inputs.`
      ],
    },
    es: {
      interpret: [
      `La salida del valor del pip te indica exactamente cuánto vale un movimiento mínimo de precio (pip) en la moneda de tu cuenta para el tamaño de posición y par que ingresaste. Este número multiplicado por el número de pips que tu stop-loss está lejos de la entrada te da tu riesgo exacto en dólares por operación.`,
      `Para pares de cripto cotizados en USD (BTC/USD, ETH/USD), los cálculos del valor del pip son directos. Para pares cruzados, el valor del pip está denominado en la moneda de cotización, luego convertido a USD.`
      ],
      scenarios: [
      `Dimensionamiento previo a la operación: introduce el tamaño de operación previsto y el número de pips hasta tu stop-loss, y el calculador devuelve tu riesgo en dólares.`,
      `Comparación de volatilidad entre pares: ejecuta este calculador para diferentes pares de trading usando el mismo tamaño de posición.`
      ],
      checklist: [
      `Antes de calcular el valor del pip: 1) Confirma el tamaño de lote correcto para tu activo. 2) Verifica la moneda de cotización. 3) Usa el incremento mínimo de precio exacto de tu exchange.`,
      `Después de calcular: multiplica valor del pip × número de pips hasta el stop = riesgo en dólares.`
      ],
      mistakes: [
      `Usar el tamaño de lote o la definición de pip incorrectos para los mercados cripto. Las criptomonedas no usan tamaños de lote forex estándar.`,
      `Olvidar que el valor del pip cambia con los tipos de cambio. Recalcula el valor del pip cada vez que entres en una nueva operación.`
      ],
      benchmarks: [
      `Para una cuenta de $10,000 con 1% de riesgo por operación ($100 de riesgo), apuntar a un stop de 20 pips debería producir un tamaño de posición de $100/valor-pip-por-pip.`,
      `Compara tu coste promedio de pip por operación entre diferentes pares para evaluar dónde obtienes la mejor exposición ajustada al riesgo.`
      ],
      execution: [
      `Flujo de trabajo estándar: 1) Identifica la configuración de operación y el nivel de stop-loss en pips. 2) Introduce par de trading, tamaño de posición y distancia de stop en este calculador. 3) Verifica que el riesgo en dólares es igual al monto de riesgo objetivo. 4) Ajusta el tamaño de posición si es necesario.`,
      `Para automatización: almacena tu valor por pip para cada par que operas regularmente y actualízalo cuando los precios cambien significativamente.`
      ],
      hygiene: [
      `Recalcula el valor del pip al inicio de cada semana para los pares que operas activamente.`,
      `Registra el valor del pip utilizado para cada operación junto al tamaño de posición.`
      ],
      validation: [
      `Verificación manual: valor del pip = (tamaño del pip × tamaño del lote) / tipo de cambio si la moneda de cotización no es USD.`,
      `Después de una operación, verifica que la pérdida/ganancia real en dólares por pip coincida con el valor del pip calculado.`
      ],
    },
    pt: {
      interpret: [
      `A saída do valor do pip indica exatamente quanto vale um movimento mínimo de preço (pip) na moeda da sua conta para o tamanho de posição e par inserido.`,
      `Para pares de cripto cotados em USD, os cálculos do valor do pip são diretos. Para pares cruzados, o valor do pip é denominado na moeda de cotação, depois convertido para USD.`
      ],
      scenarios: [
      `Dimensionamento pré-operação: insira o tamanho de operação pretendido e o número de pips até seu stop-loss, e a calculadora retorna seu risco em dólares.`,
      `Comparação de volatilidade entre pares: execute esta calculadora para diferentes pares de trading usando o mesmo tamanho de posição.`
      ],
      checklist: [
      `Antes de calcular o valor do pip: 1) Confirme o tamanho de lote correto para seu ativo. 2) Verifique a moeda de cotação. 3) Use o incremento mínimo de preço exato da sua exchange.`,
      `Após calcular: multiplique valor do pip × número de pips até o stop = risco em dólares.`
      ],
      mistakes: [
      `Usar o tamanho de lote ou definição de pip incorretos para mercados cripto.`,
      `Esquecer que o valor do pip muda com as taxas de câmbio.`
      ],
      benchmarks: [
      `Para uma conta de $10.000 com 1% de risco por operação, visar um stop de 20 pips deve produzir um tamanho de posição de $100/valor-pip-por-pip.`,
      `Compare seu custo médio de pip por operação entre diferentes pares.`
      ],
      execution: [
      `Fluxo de trabalho padrão: 1) Identifique a configuração de operação e o nível de stop-loss em pips. 2) Insira par de trading, tamanho de posição e distância do stop nesta calculadora. 3) Verifique se o risco em dólares equivale ao valor de risco alvo.`,
      `Para automação: armazene seu valor por pip para cada par que negocia regularmente.`
      ],
      hygiene: [
      `Recalcule o valor do pip no início de cada semana para os pares que negocia ativamente.`,
      `Registre o valor do pip usado para cada operação junto ao tamanho de posição.`
      ],
      validation: [
      `Verificação manual: valor do pip = (tamanho do pip × tamanho do lote) / taxa de câmbio se a moeda de cotação não for USD.`,
      `Após uma operação, verifique se a perda/ganância real em dólares por pip corresponde ao valor do pip calculado.`
      ],
    },
    tr: {
      interpret: [
      `Pip değeri çıktısı, girdiğiniz pozisyon büyüklüğü ve parite için bir minimum fiyat hareketinin (pip) hesabınızın para biriminde tam olarak ne kadar değer taşıdığını söyler.`,
      `USD cinsinden kotasyonlu kripto çiftleri için pip değeri hesaplamaları basittir. Çapraz çiftler için pip değeri kotasyon para biriminde hesaplanır, ardından USD'ye çevrilir.`
      ],
      scenarios: [
      `İşlem öncesi boyutlandırma: planlanan işlem büyüklüğünü ve stop-loss'a olan pip sayısını girin, hesaplayıcı dolar riskinizi döndürür.`,
      `Çiftler arasında volatilite karşılaştırması: aynı pozisyon büyüklüğünü kullanarak farklı trading çiftleri için bu hesaplayıcıyı çalıştırın.`
      ],
      checklist: [
      `Pip değeri hesaplamadan önce: 1) Varlığınız için doğru lot büyüklüğünü onaylayın. 2) Kotasyon para birimini doğrulayın. 3) Borsanızın tam minimum fiyat artışını kullanın.`,
      `Hesapladıktan sonra: pip değeri × stop'a pip sayısı = dolar riski.`
      ],
      mistakes: [
      `Kripto piyasaları için yanlış lot büyüklüğü veya pip tanımı kullanmak.`,
      `Pip değerinin döviz kurlarıyla değiştiğini unutmak.`
      ],
      benchmarks: [
      `İşlem başına %1 riskle ($100 risk) 20 piplik stop hedefleyen $10.000'lık bir hesap için pozisyon büyüklüğü $100/pip-değeri-per-pip olmalıdır.`,
      `Risk bütçeniz için en iyi riske göre düzeltilmiş maruziyeti nerede aldığınızı değerlendirmek için çiftler genelinde ortalama pip maliyetinizi karşılaştırın.`
      ],
      execution: [
      `Standart iş akışı: 1) İşlem kurulumunu ve pip cinsinden stop-loss seviyesini belirleyin. 2) Trading çifti, pozisyon büyüklüğü ve stop mesafesini bu hesaplayıcıya girin. 3) Dolar riskinin hedef risk tutarına eşit olduğunu doğrulayın.`,
      `Otomasyon için: düzenli olarak işlem yaptığınız her çift için pip başına değerinizi saklayın.`
      ],
      hygiene: [
      `Aktif olarak işlem yaptığınız çiftler için her haftanın başında pip değerini yeniden hesaplayın.`,
      `Her işlem için kullanılan pip değerini pozisyon büyüklüğünün yanında kaydedin.`
      ],
      validation: [
      `Manuel kontrol: kotasyon para birimi USD değilse pip değeri = (pip büyüklüğü × lot büyüklüğü) / döviz kuru.`,
      `Bir işlemden sonra, pip başına gerçek dolar kaybı/kazancının hesaplanan pip değeriyle eşleştiğini doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `पिप वैल्यू आउटपुट आपको बताता है कि आपने जो पोजीशन साइज और पेयर दर्ज किया है, उसके लिए एक न्यूनतम मूल्य आंदोलन (पिप) आपके खाते की मुद्रा में ठीक कितना मूल्य का है।`,
      `USD में कोट किए गए क्रिप्टो पेयर के लिए, पिप वैल्यू गणना सीधी है। क्रॉस-पेयर के लिए, पिप वैल्यू कोट मुद्रा में है, फिर USD में परिवर्तित होती है।`
      ],
      scenarios: [
      `पूर्व-ट्रेड साइजिंग: अपना इरादा ट्रेड साइज और स्टॉप-लॉस तक पिप की संख्या दर्ज करें, और कैलकुलेटर आपका डॉलर जोखिम लौटाता है।`,
      `पेयर के बीच अस्थिरता तुलना: समान पोजीशन साइज का उपयोग करके विभिन्न ट्रेडिंग पेयर के लिए यह कैलकुलेटर चलाएं।`
      ],
      checklist: [
      `पिप वैल्यू की गणना से पहले: 1) अपनी संपत्ति के लिए सही लॉट साइज की पुष्टि करें। 2) कोट मुद्रा सत्यापित करें। 3) अपने एक्सचेंज के सटीक न्यूनतम मूल्य वृद्धि का उपयोग करें।`,
      `गणना के बाद: पिप वैल्यू × स्टॉप तक पिप की संख्या = डॉलर जोखिम।`
      ],
      mistakes: [
      `क्रिप्टो बाजारों के लिए गलत लॉट साइज या पिप परिभाषा का उपयोग करना।`,
      `यह भूलना कि एक्सचेंज दरों के साथ पिप वैल्यू बदलती है।`
      ],
      benchmarks: [
      `प्रति ट्रेड 1% जोखिम ($100 जोखिम) वाले $10,000 खाते के लिए, 20-पिप स्टॉप को $100/पिप-वैल्यू-प्रति-पिप का पोजीशन साइज देना चाहिए।`,
      `सर्वोत्तम जोखिम-समायोजित एक्सपोजर का आकलन करने के लिए विभिन्न पेयर में प्रति ट्रेड अपनी औसत पिप लागत की तुलना करें।`
      ],
      execution: [
      `मानक वर्कफ़्लो: 1) ट्रेड सेटअप और पिप में स्टॉप-लॉस स्तर पहचानें। 2) इस कैलकुलेटर में ट्रेडिंग पेयर, पोजीशन साइज और स्टॉप दूरी दर्ज करें। 3) सत्यापित करें कि डॉलर जोखिम लक्ष्य जोखिम राशि के बराबर है।`,
      `स्वचालन के लिए: प्रत्येक पेयर के लिए अपना प्रति पिप मूल्य संग्रहित करें जिसे आप नियमित रूप से ट्रेड करते हैं।`
      ],
      hygiene: [
      `उन पेयर के लिए प्रत्येक सप्ताह की शुरुआत में पिप वैल्यू की पुनः गणना करें जिन्हें आप सक्रिय रूप से ट्रेड करते हैं।`,
      `प्रत्येक ट्रेड के लिए उपयोग की गई पिप वैल्यू को पोजीशन साइज के साथ लॉग करें।`
      ],
      validation: [
      `मैन्युअल जांच: यदि कोट मुद्रा USD नहीं है तो पिप वैल्यू = (पिप साइज × लॉट साइज) / एक्सचेंज दर।`,
      `एक ट्रेड के बाद, सत्यापित करें कि प्रति पिप वास्तविक डॉलर हानि/लाभ परिकलित पिप वैल्यू से मेल खाता है।`
      ],
    },
    ru: {
      interpret: [
      `Вывод значения пипса показывает, сколько стоит один минимальный шаг цены (пипс) в валюте вашего счёта для указанного размера позиции и торговой пары. Это число, умноженное на расстояние стоп-лосса в пипсах от точки входа, даёт точный долларовый риск на сделку.`,
      `Для крипто-пар, котируемых в USD (BTC/USD, ETH/USD), расчёты прямолинейны. Для кросс-пар (ETH/BTC, ALT/ETH) значение пипса выражено в валюте котировки, а затем конвертируется в USD по текущему курсу.`
      ],
      scenarios: [
      `Определение размера позиции перед сделкой: введите предполагаемый размер сделки и расстояние стоп-лосса в пипсах — калькулятор вернёт ваш долларовый риск. Скорректируйте размер позиции, пока долларовый риск не совпадёт с целевым.`,
      `Сравнение волатильности пар: запустите калькулятор для разных торговых пар с одинаковым размером позиции. Пары с более высоким значением пипса несут больший риск на единицу движения цены.`
      ],
      checklist: [
      `Перед расчётом значения пипса: 1) Подтвердите правильный размер лота для вашего актива. 2) Уточните валюту котировки. 3) Используйте точный минимальный шаг цены вашей биржи.`,
      `После расчёта: умножьте значение пипса × количество пипсов до стопа = долларовый риск.`
      ],
      mistakes: [
      `Использование неправильного размера лота или определения пипса для крипто-рынков. Криптовалюта не использует стандартные форекс-лоты по 100 000 единиц.`,
      `Забывание, что значение пипса меняется при изменении обменных курсов. Пересчитывайте значение пипса при каждом входе в новую сделку.`
      ],
      benchmarks: [
      `Для счёта $10 000 с риском 1% на сделку ($100 риска) и стопом 20 пипсов размер позиции должен составить $100 / значение-пипса-на-пипс. Эта калибровка удерживает вас в пределах риск-толерантности.`,
      `Сравните среднюю стоимость пипса на сделку по разным парам для оценки, где вы получаете наилучшую экспозицию с поправкой на риск.`
      ],
      execution: [
      `Стандартный процесс: 1) Определите торговую ситуацию и уровень стоп-лосса в пипсах. 2) Введите торговую пару, размер позиции и расстояние до стопа в калькулятор. 3) Убедитесь, что долларовый риск равен целевой сумме риска. 4) Скорректируйте размер позиции при необходимости.`,
      `Для автоматизации: сохраните значение пипса для каждой регулярно торгуемой пары и обновляйте при значительных ценовых изменениях.`
      ],
      hygiene: [
      `Пересчитывайте значение пипса в начале каждой недели для активно торгуемых пар. Крупные ценовые движения (>20%) могут смещать значения пипсов настолько, что расчёты риска прошлой недели становятся некорректными.`,
      `Записывайте использованное значение пипса для каждой сделки рядом с размером позиции.`
      ],
      validation: [
      `Ручная проверка: значение пипса = (размер пипса × размер лота) / обменный курс (если валюта котировки не USD). Если всё в USD: значение пипса = размер пипса × размер лота.`,
      `После сделки убедитесь, что фактическая прибыль/убыток в долларах на пипс совпадает с расчётным значением.`
      ],
    },
  },
  'break-even-calculator': {
    en: {
      interpret: [
      `The break-even price is the minimum price at which you need to sell an asset to recover all costs and exit with zero net gain or loss. It is calculated as: (total cost including all fees) / (quantity owned). If you bought 0.5 BTC for $15,000 with $150 in fees, your total cost is $15,150, and break-even price is $30,300 — not $30,000. The fee impact becomes more visible on small purchases where fees are a higher percentage of total cost.`,
      `The percentage gain required above your purchase price to break even is the key figure for planning exits. If your break-even is 1.5% above purchase price (fees inclusive), you need at least a 1.5% gain just to not lose money. For trades with high fees (card purchases, cross-chain bridges), this break-even percentage can reach 3–5%, making small price recoveries insufficient to justify selling.`
      ],
      scenarios: [
      `Post-purchase planning: immediately after buying, calculate the break-even price and set a limit sell order slightly above it as a safety floor. This ensures you never accidentally sell at a loss if you are temporarily absent from monitoring your portfolio.`,
      `Dollar-cost averaging break-even update: each time you add to a position, recalculate the new break-even price for the combined holding. This is different from simply averaging the purchase prices — it accounts for different quantities at different price points and all associated fees.`
      ],
      checklist: [
      `Before using the break-even price for decisions: 1) Confirm all fees are included: purchase fee, any conversion fee, gas fee (for on-chain transactions). 2) If using a stablecoin to buy, check if there was a spread on the stablecoin itself (USDT/USD spread can be 0.1–0.3%). 3) For DCA buys, calculate break-even as weighted average: Σ(price × quantity + fee) / total quantity.`,
      `After calculating: use the break-even price as the absolute minimum for a sell order, not as a profit target. Your actual target should be substantially above break-even to make the trade worthwhile.`
      ],
      mistakes: [
      `Ignoring fees in the break-even calculation is the most common mistake. A 1% purchase fee on a $10,000 buy means break-even is at $10,100 (plus the 1% sell fee takes it to $10,201). Selling at $10,050 thinking you profited $50 actually produces a net loss of $51.`,
      `Confusing average cost with break-even price. Average cost is the weighted mean of all purchase prices. Break-even includes fees paid on every transaction. These diverge significantly when fees are high or when many small transactions were made.`
      ],
      benchmarks: [
      `For spot purchases on major exchanges (0.1–0.5% fee), break-even is 0.2–1% above the purchase price (accounting for round-trip fees). For card purchases or DEX swaps (1.5–3.5%), break-even is 3–7% above the effective exchange price. Know your fee structure before assuming any price level is profitable.`,
      `For long-term holders: the break-even price on a position held through multiple DCA rounds should be well below current market price — typically 20–50% below for assets held through a full bear cycle. If your break-even is near current price, your DCA entries were mostly at market tops.`
      ],
      execution: [
      `Track break-even after every transaction: 1) After each buy, immediately enter the new price, quantity, and fee into the calculator. 2) Record the updated break-even price in your portfolio tracker. 3) Update any standing limit sell orders to respect the new break-even floor.`,
      `For tax purposes: break-even price equals your cost basis. Document it explicitly for each lot, as different tax jurisdictions require specific-lot reporting and the break-even price is the baseline for gain/loss calculations.`
      ],
      hygiene: [
      `Store break-even prices for all open positions in a central tracking file. If you use multiple wallets or exchanges, consolidate break-even calculations across all locations — your effective break-even is based on all holdings of an asset, not per-account.`,
      `Recalculate break-even anytime you receive an airdrop, staking reward, or fork token related to the asset. These additions have a cost basis of market value on receipt date, which adjusts your blended break-even for the combined position.`
      ],
      validation: [
      `Verify: break-even price × total quantity = total cost (all purchases + all fees). If this multiplication does not return your exact total outlay, there is a rounding or fee-entry error in the inputs.`,
      `Cross-check with your exchange's trade history: sum all purchase amounts and fees in your account currency, divide by total units acquired. The result should match the calculator's break-even output to within 0.01%.`
      ],
    },
    es: {
      interpret: [
      `El precio de equilibrio es el precio mínimo al que necesitas vender un activo para recuperar todos los costes y salir con una ganancia o pérdida neta de cero. Se calcula como: (coste total incluidas todas las comisiones) / (cantidad poseída).`,
      `El porcentaje de ganancia requerido por encima del precio de compra para alcanzar el equilibrio es la cifra clave para planificar salidas.`
      ],
      scenarios: [
      `Planificación post-compra: inmediatamente después de comprar, calcula el precio de equilibrio y establece una orden de venta limitada ligeramente por encima de él como suelo de seguridad.`,
      `Actualización del equilibrio de promediado de costes: cada vez que añadas a una posición, recalcula el nuevo precio de equilibrio para la tenencia combinada.`
      ],
      checklist: [
      `Antes de usar el precio de equilibrio para tomar decisiones: 1) Confirma que se incluyen todas las comisiones. 2) Si usas una stablecoin para comprar, comprueba si hubo un diferencial en la propia stablecoin. 3) Para compras DCA, calcula el equilibrio como promedio ponderado.`,
      `Después de calcular: usa el precio de equilibrio como el mínimo absoluto para una orden de venta, no como objetivo de beneficio.`
      ],
      mistakes: [
      `Ignorar las comisiones en el cálculo del equilibrio es el error más común.`,
      `Confundir el coste promedio con el precio de equilibrio.`
      ],
      benchmarks: [
      `Para compras spot en exchanges principales (comisión del 0.1–0.5%), el equilibrio es del 0.2–1% por encima del precio de compra. Para compras con tarjeta o intercambios DEX (1.5–3.5%), el equilibrio es del 3–7% por encima del precio de cambio efectivo.`,
      `Para tenedores a largo plazo: el precio de equilibrio en una posición mantenida a través de múltiples rondas de DCA debería estar muy por debajo del precio de mercado actual.`
      ],
      execution: [
      `Rastrea el equilibrio después de cada transacción: 1) Después de cada compra, introduce inmediatamente el nuevo precio, cantidad y comisión en el calculador. 2) Registra el precio de equilibrio actualizado en tu rastreador de cartera. 3) Actualiza cualquier orden de venta límite pendiente para respetar el nuevo suelo de equilibrio.`,
      `Para fines fiscales: el precio de equilibrio es igual a tu base de coste.`
      ],
      hygiene: [
      `Almacena los precios de equilibrio para todas las posiciones abiertas en un archivo de seguimiento central.`,
      `Recalcula el equilibrio cada vez que recibas un airdrop, recompensa de staking o token de fork relacionado con el activo.`
      ],
      validation: [
      `Verifica: precio de equilibrio × cantidad total = coste total (todas las compras + todas las comisiones).`,
      `Verifica con el historial de operaciones de tu exchange.`
      ],
    },
    pt: {
      interpret: [
      `O preço de equilíbrio é o preço mínimo pelo qual você precisa vender um ativo para recuperar todos os custos e sair com ganho ou perda líquida zero.`,
      `O percentual de ganho necessário acima do preço de compra para atingir o equilíbrio é a cifra-chave para planejar saídas.`
      ],
      scenarios: [
      `Planejamento pós-compra: imediatamente após comprar, calcule o preço de equilíbrio e defina uma ordem de venda limitada ligeiramente acima dele como piso de segurança.`,
      `Atualização do equilíbrio de custo médio: cada vez que adicionar a uma posição, recalcule o novo preço de equilíbrio para a participação combinada.`
      ],
      checklist: [
      `Antes de usar o preço de equilíbrio para decisões: 1) Confirme que todas as taxas estão incluídas. 2) Calcule o equilíbrio como média ponderada para compras DCA.`,
      `Após calcular: use o preço de equilíbrio como o mínimo absoluto para uma ordem de venda.`
      ],
      mistakes: [
      `Ignorar taxas no cálculo do equilíbrio é o erro mais comum.`,
      `Confundir custo médio com preço de equilíbrio.`
      ],
      benchmarks: [
      `Para compras spot em exchanges principais (taxa de 0.1–0.5%), o equilíbrio é de 0.2–1% acima do preço de compra.`,
      `Para holders de longo prazo: o preço de equilíbrio em uma posição mantida através de múltiplas rodadas de DCA deve estar bem abaixo do preço de mercado atual.`
      ],
      execution: [
      `Rastreie o equilíbrio após cada transação: 1) Após cada compra, insira imediatamente o novo preço, quantidade e taxa na calculadora. 2) Registre o preço de equilíbrio atualizado no rastreador de portfólio.`,
      `Para fins fiscais: o preço de equilíbrio equivale à sua base de custo.`
      ],
      hygiene: [
      `Armazene preços de equilíbrio para todas as posições abertas em um arquivo de rastreamento central.`,
      `Recalcule o equilíbrio sempre que receber um airdrop, recompensa de staking ou token de fork relacionado ao ativo.`
      ],
      validation: [
      `Verifique: preço de equilíbrio × quantidade total = custo total.`,
      `Verifique com o histórico de negociações da sua exchange.`
      ],
    },
    tr: {
      interpret: [
      `Başabaş fiyatı, tüm maliyetleri geri kazanmak ve net sıfır kazanç veya kayıpla çıkmak için bir varlığı satmanız gereken minimum fiyattır.`,
      `Başabaş için satın alma fiyatının üzerinde gereken kazanç yüzdesi, çıkışları planlamak için temel rakamdır.`
      ],
      scenarios: [
      `Satın alma sonrası planlama: satın aldıktan hemen sonra başabaş fiyatını hesaplayın ve emniyet tabanı olarak biraz üzerinde bir limit satış emri verin.`,
      `DCA başabaş güncellemesi: bir pozisyona her ekleme yaptığınızda, birleşik holding için yeni başabaş fiyatını yeniden hesaplayın.`
      ],
      checklist: [
      `Başabaş fiyatını kararlar için kullanmadan önce: 1) Tüm ücretlerin dahil edildiğini onaylayın. 2) DCA alımları için ağırlıklı ortalama olarak başabaşı hesaplayın.`,
      `Hesapladıktan sonra: başabaş fiyatını satış emri için mutlak minimum olarak kullanın, kâr hedefi olarak değil.`
      ],
      mistakes: [
      `Başabaş hesaplamasında ücretleri görmezden gelmek en yaygın hatadır.`,
      `Ortalama maliyeti başabaş fiyatıyla karıştırmak.`
      ],
      benchmarks: [
      `Büyük borsalardaki spot alımlar için (%0.1–0.5 ücret), başabaş satın alma fiyatının %0.2–1 üzerindedir.`,
      `Uzun vadeli tutucular için: birden fazla DCA turu boyunca tutulan bir pozisyondaki başabaş fiyatı mevcut piyasa fiyatının çok altında olmalıdır.`
      ],
      execution: [
      `Her işlemden sonra başabaşı takip edin: 1) Her alımdan sonra yeni fiyatı, miktarı ve ücreti hemen hesaplayıcıya girin. 2) Güncellenmiş başabaş fiyatını portföy takip sisteminize kaydedin.`,
      `Vergi amaçları için: başabaş fiyatı maliyet tabanınıza eşittir.`
      ],
      hygiene: [
      `Tüm açık pozisyonlar için başabaş fiyatlarını merkezi bir takip dosyasında saklayın.`,
      `Varlıkla ilgili bir airdrop, staking ödülü veya fork token aldığınızda başabaşı yeniden hesaplayın.`
      ],
      validation: [
      `Doğrulayın: başabaş fiyatı × toplam miktar = toplam maliyet.`,
      `Borsanızın işlem geçmişiyle çapraz kontrol yapın.`
      ],
    },
    hi: {
      interpret: [
      `ब्रेक-ईवन मूल्य वह न्यूनतम मूल्य है जिस पर आपको एक संपत्ति बेचनी होगी ताकि सभी लागतें वसूल की जा सकें और शुद्ध शून्य लाभ या हानि के साथ बाहर निकला जा सके।`,
      `ब्रेक-ईवन के लिए खरीद मूल्य से ऊपर आवश्यक प्रतिशत लाभ निकास की योजना बनाने के लिए मुख्य आंकड़ा है।`
      ],
      scenarios: [
      `खरीद के बाद योजना: खरीदने के तुरंत बाद, ब्रेक-ईवन मूल्य की गणना करें और सुरक्षा फर्श के रूप में थोड़ा ऊपर एक लिमिट सेल ऑर्डर सेट करें।`,
      `DCA ब्रेक-ईवन अपडेट: जब भी आप एक पोजीशन में जोड़ते हैं, संयुक्त होल्डिंग के लिए नए ब्रेक-ईवन मूल्य की पुनः गणना करें।`
      ],
      checklist: [
      `ब्रेक-ईवन मूल्य का निर्णयों के लिए उपयोग करने से पहले: 1) पुष्टि करें कि सभी शुल्क शामिल हैं। 2) DCA खरीद के लिए, ब्रेक-ईवन को भारित औसत के रूप में गणना करें।`,
      `गणना के बाद: ब्रेक-ईवन मूल्य का उपयोग बिक्री ऑर्डर के लिए पूर्ण न्यूनतम के रूप में करें, लाभ लक्ष्य के रूप में नहीं।`
      ],
      mistakes: [
      `ब्रेक-ईवन गणना में शुल्क को नजरअंदाज करना सबसे आम गलती है।`,
      `औसत लागत को ब्रेक-ईवन मूल्य के साथ भ्रमित करना।`
      ],
      benchmarks: [
      `प्रमुख एक्सचेंज पर स्पॉट खरीद के लिए (0.1–0.5% शुल्क), ब्रेक-ईवन खरीद मूल्य से 0.2–1% ऊपर है।`,
      `दीर्घकालिक धारकों के लिए: कई DCA राउंड के माध्यम से आयोजित पोजीशन पर ब्रेक-ईवन मूल्य वर्तमान बाजार मूल्य से काफी नीचे होना चाहिए।`
      ],
      execution: [
      `प्रत्येक लेनदेन के बाद ब्रेक-ईवन ट्रैक करें: 1) प्रत्येक खरीद के बाद, तुरंत कैलकुलेटर में नया मूल्य, मात्रा और शुल्क दर्ज करें। 2) अपने पोर्टफोलियो ट्रैकर में अपडेट किया गया ब्रेक-ईवन मूल्य रिकॉर्ड करें।`,
      `कर उद्देश्यों के लिए: ब्रेक-ईवन मूल्य आपके लागत आधार के बराबर है।`
      ],
      hygiene: [
      `सभी खुली पोजीशन के लिए ब्रेक-ईवन मूल्य एक केंद्रीय ट्रैकिंग फ़ाइल में संग्रहित करें।`,
      `जब भी आप संपत्ति से संबंधित एयरड्रॉप, स्टेकिंग रिवार्ड या फोर्क टोकन प्राप्त करें तो ब्रेक-ईवन की पुनः गणना करें।`
      ],
      validation: [
      `सत्यापित करें: ब्रेक-ईवन मूल्य × कुल मात्रा = कुल लागत।`,
      `अपने एक्सचेंज के ट्रेड हिस्ट्री के साथ क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Цена безубыточности — это минимальная цена, по которой вам нужно продать актив, чтобы возместить все затраты и выйти с нулевым чистым доходом или убытком. Рассчитывается как: (общая стоимость включая все комиссии) / (количество в наличии).`,
      `Процентный прирост цены выше цены покупки, необходимый для безубыточности — ключевой показатель для планирования выходов. При высоких комиссиях (карточные покупки, кросс-чейн бриджи) безубыточность может достигать 3–5%.`
      ],
      scenarios: [
      `Планирование после покупки: сразу после покупки рассчитайте цену безубыточности и установите лимитный ордер на продажу немного выше неё в качестве защитного минимума.`,
      `Обновление безубыточности при усреднении (DCA): каждый раз при добавлении к позиции пересчитывайте новую цену безубыточности для совокупного объёма.`
      ],
      checklist: [
      `Перед использованием цены безубыточности для принятия решений: 1) Убедитесь, что все комиссии включены. 2) Для DCA-покупок рассчитывайте безубыточность как взвешенное среднее: Σ(цена × количество + комиссия) / общее количество.`,
      `После расчёта: используйте цену безубыточности как абсолютный минимум для ордера на продажу, а не как цель по прибыли.`
      ],
      mistakes: [
      `Игнорирование комиссий в расчёте безубыточности — наиболее распространённая ошибка. Комиссия 1% при покупке $10 000 означает, что безубыточность составит $10 100 (плюс 1% комиссии на продажу — итого $10 201).`,
      `Путаница между средней ценой и ценой безубыточности. Средняя цена — это взвешенное среднее цен покупки. Безубыточность включает комиссии по каждой транзакции.`
      ],
      benchmarks: [
      `Для спотовых покупок на крупных биржах (комиссия 0.1–0.5%) безубыточность составляет 0.2–1% выше цены покупки. Для карточных покупок или DEX-свопов (1.5–3.5%) — 3–7% выше.`,
      `Для долгосрочных держателей: цена безубыточности по позиции, накопленной через несколько раундов DCA, должна быть значительно ниже текущей рыночной цены.`
      ],
      execution: [
      `Отслеживайте безубыточность после каждой транзакции: 1) После каждой покупки немедленно вводите новую цену, количество и комиссию в калькулятор. 2) Фиксируйте обновлённую цену безубыточности в трекере портфеля. 3) Обновляйте лимитные ордера на продажу с учётом нового минимума.`,
      `Для налоговых целей: цена безубыточности равна базе затрат.`
      ],
      hygiene: [
      `Храните цены безубыточности по всем открытым позициям в центральном файле учёта. При наличии нескольких кошельков или бирж объединяйте расчёты.`,
      `Пересчитывайте безубыточность при получении аирдропа, вознаграждения за стейкинг или токена форка.`
      ],
      validation: [
      `Проверьте: цена безубыточности × общее количество = общие затраты (все покупки + все комиссии).`,
      `Сверьтесь с историей сделок на бирже: сложите все суммы покупок и комиссии, разделите на общее количество единиц.`
      ],
    },
  },
  'risk-reward-calculator': {
    en: {
      interpret: [
      `The risk-reward ratio output (R:R) is the ratio of potential profit (distance to TP) to potential loss (distance to SL). A 3:1 R:R means you risk $1 to potentially gain $3. The break-even win rate (shown in the secondary output) is the mathematical minimum win percentage needed to be profitable with this ratio: for 3:1 R:R, break-even win rate = 1/(1+3) = 25%. This means even if you win only 26% of trades with this setup, you generate positive expectancy over a large sample.`,
      `The expected value per trade (EV) combines your win rate with the R:R: EV = (win rate × profit) − (loss rate × loss). A positive EV means the strategy is profitable over time. If your actual win rate is 45% and R:R is 2:1, EV = (0.45 × 2) − (0.55 × 1) = 0.9 − 0.55 = +0.35 per unit risk — a positive edge worth exploiting systematically.`
      ],
      scenarios: [
      `Trade filter: before entering any trade, use this calculator to confirm minimum R:R. If your analysis produces a setup where R:R is less than 1.5:1, pass on the trade. This single discipline eliminates many marginal trades that appear promising but statistically erode capital over time.`,
      `Strategy evaluation: after tracking 50+ trades, input your observed win rate and average R:R into the EV formula. If EV is negative or barely positive, your strategy needs improvement — either find better entries (to improve win rate), tighten stops (to improve R:R), or both.`
      ],
      checklist: [
      `Before finalizing a risk-reward setup: 1) Entry must be at a technically justified level (not random). 2) Stop-loss must be placed where the trade idea is proven wrong, not at arbitrary distance. 3) Take-profit must be at the next significant resistance (for longs) or support (for shorts) — not chosen to hit an exact R:R ratio.`,
      `After calculating: if R:R is 2:1 or better and your historical win rate on similar setups is 40%+, proceed. If win rate is unknown (new strategy), require R:R ≥ 3:1 to account for the uncertainty.`
      ],
      mistakes: [
      `Forcing trades to meet an arbitrary R:R threshold by moving TP to unrealistic levels. If the nearest resistance is 1.5:1 away but you need 2:1, moving TP beyond the resistance does not make the trade have a 67% chance of reaching it — it likely just reduces your win rate, potentially making EV negative.`,
      `Evaluating R:R without considering win rate. A 5:1 R:R setup where you win 10% of the time has EV = (0.1 × 5) − (0.9 × 1) = 0.5 − 0.9 = −0.4 — a losing strategy. Always combine R:R with realistic win rate estimates from backtesting.`
      ],
      benchmarks: [
      `Breakeven win rates by R:R: 1:1 requires 50% win rate; 2:1 requires 33%; 3:1 requires 25%; 4:1 requires 20%. Most retail traders achieve 40–55% win rates, making 2:1 R:R the practical minimum for positive expectancy.`,
      `Professional systematic traders often target 40% win rate with 2.5:1 average R:R, producing EV of +0.4 per unit risk. Compare your own tracked win rate and average R:R against this benchmark to calibrate your strategy's profitability.`
      ],
      execution: [
      `Pre-trade R:R assessment: 1) Mark entry, SL, and TP on chart. 2) Enter into calculator. 3) Check if R:R meets your minimum (e.g., 2:1). 4) Check historical win rate for similar setups. 5) Calculate EV = (win rate × R:R) − (1 − win rate). 6) Only proceed if EV > 0.`,
      `Trade journal integration: after each trade, log the planned R:R, the actual exit (whether TP or SL hit), and whether the setup matched your criteria. Review quarterly to identify which setup types produce the best R:R and win rate combination.`
      ],
      hygiene: [
      `Review your average R:R across closed trades monthly. A declining average R:R often indicates the psychological pressure to take profits early (reducing TP) or hold losses longer (increasing effective SL). Both behaviors degrade the R:R of otherwise sound strategies.`,
      `If your average actual R:R is consistently below your planned R:R, you are exiting too early. Consider using automatic limit orders for TP and SL to remove emotional bias from the exit decision.`
      ],
      validation: [
      `Verify R:R: TP distance / SL distance = R:R ratio. For a setup where TP is $300 above entry and SL is $100 below, R:R = 3:1. The calculator should confirm this — if it shows a different ratio, recheck the entry price is correctly placed between TP and SL in the input fields.`,
      `Back-test your R:R and win rate combination on at least 30 historical instances of your setup. If historical EV is negative even on paper, the setup does not have edge and real-money trading it will produce losses.`
      ],
    },
    es: {
      interpret: [
      `La salida de la relación riesgo-recompensa (R:R) es la relación entre el beneficio potencial (distancia hasta el TP) y la pérdida potencial (distancia hasta el SL). Un R:R de 3:1 significa que arriesgas $1 para potencialmente ganar $3.`,
      `El valor esperado por operación (EV) combina tu tasa de victorias con el R:R: EV = (tasa de victorias × beneficio) − (tasa de pérdidas × pérdida).`
      ],
      scenarios: [
      `Filtro de operaciones: antes de entrar en cualquier operación, usa este calculador para confirmar el R:R mínimo. Si tu análisis produce una configuración donde R:R es menor que 1.5:1, pasa la operación.`,
      `Evaluación de estrategia: después de rastrear 50+ operaciones, introduce tu tasa de victorias observada y el R:R promedio en la fórmula de EV.`
      ],
      checklist: [
      `Antes de finalizar una configuración riesgo-recompensa: 1) La entrada debe estar en un nivel técnicamente justificado. 2) El stop-loss debe colocarse donde se demuestra que la idea de operación es incorrecta. 3) El take-profit debe estar en la siguiente resistencia significativa.`,
      `Después de calcular: si R:R es 2:1 o mejor y tu tasa histórica de victorias en configuraciones similares es del 40%+, procede.`
      ],
      mistakes: [
      `Forzar operaciones para cumplir un umbral de R:R arbitrario moviendo el TP a niveles poco realistas.`,
      `Evaluar R:R sin considerar la tasa de victorias.`
      ],
      benchmarks: [
      `Tasas de victorias de equilibrio por R:R: 1:1 requiere 50% de victorias; 2:1 requiere 33%; 3:1 requiere 25%.`,
      `Los traders sistemáticos profesionales a menudo apuntan a una tasa de victorias del 40% con un R:R promedio de 2.5:1.`
      ],
      execution: [
      `Evaluación de R:R previa a la operación: 1) Marca entrada, SL y TP en el gráfico. 2) Introduce en el calculador. 3) Comprueba si R:R cumple tu mínimo. 4) Verifica la tasa histórica de victorias para configuraciones similares. 5) Calcula EV.`,
      `Integración del diario de operaciones: después de cada operación, registra el R:R planificado, la salida real y si la configuración coincidió con tus criterios.`
      ],
      hygiene: [
      `Revisa tu R:R promedio en las operaciones cerradas mensualmente.`,
      `Si tu R:R real promedio es consistentemente inferior al R:R planificado, estás saliendo demasiado pronto.`
      ],
      validation: [
      `Verifica R:R: distancia de TP / distancia de SL = ratio R:R.`,
      `Prueba retrospectiva de tu combinación de R:R y tasa de victorias en al menos 30 instancias históricas de tu configuración.`
      ],
    },
    pt: {
      interpret: [
      `A saída da relação risco-recompensa (R:R) é a relação entre o lucro potencial (distância até o TP) e a perda potencial (distância até o SL). Um R:R de 3:1 significa que você arrisca $1 para potencialmente ganhar $3.`,
      `O valor esperado por operação (EV) combina sua taxa de vitórias com o R:R: EV = (taxa de vitórias × lucro) − (taxa de perdas × perda).`
      ],
      scenarios: [
      `Filtro de operações: antes de entrar em qualquer operação, use esta calculadora para confirmar o R:R mínimo.`,
      `Avaliação de estratégia: após rastrear 50+ operações, insira sua taxa de vitórias observada e R:R médio na fórmula de EV.`
      ],
      checklist: [
      `Antes de finalizar uma configuração risco-recompensa: 1) A entrada deve estar em um nível tecnicamente justificado. 2) O stop-loss deve ser colocado onde a ideia de operação é provada errada. 3) O take-profit deve estar na próxima resistência significativa.`,
      `Após calcular: se R:R for 2:1 ou melhor e sua taxa histórica de vitórias em configurações similares for 40%+, prossiga.`
      ],
      mistakes: [
      `Forçar operações para atingir um limite de R:R arbitrário movendo o TP para níveis irrealistas.`,
      `Avaliar R:R sem considerar a taxa de vitórias.`
      ],
      benchmarks: [
      `Taxas de vitórias de equilíbrio por R:R: 1:1 requer 50%; 2:1 requer 33%; 3:1 requer 25%.`,
      `Traders sistemáticos profissionais frequentemente visam uma taxa de vitórias de 40% com R:R médio de 2.5:1.`
      ],
      execution: [
      `Avaliação de R:R pré-operação: 1) Marque entrada, SL e TP no gráfico. 2) Insira na calculadora. 3) Verifique se R:R atende ao seu mínimo. 4) Verifique taxa histórica de vitórias. 5) Calcule EV.`,
      `Integração do diário de operações: após cada operação, registre o R:R planejado e a saída real.`
      ],
      hygiene: [
      `Revise seu R:R médio em operações fechadas mensalmente.`,
      `Se seu R:R real médio for consistentemente abaixo do planejado, você está saindo cedo demais.`
      ],
      validation: [
      `Verifique R:R: distância do TP / distância do SL = relação R:R.`,
      `Faça backtesting da sua combinação de R:R e taxa de vitórias em pelo menos 30 instâncias históricas.`
      ],
    },
    tr: {
      interpret: [
      `Risk-ödül oranı (R:R) çıktısı, potansiyel kâr (TP'ye mesafe) ile potansiyel kayıp (SL'ye mesafe) oranıdır. 3:1 R:R, potansiyel olarak 3 dolar kazanmak için 1 dolar risk aldığınız anlamına gelir.`,
      `İşlem başına beklenen değer (EV), kazanma oranınızı R:R ile birleştirir: EV = (kazanma oranı × kâr) − (kaybetme oranı × kayıp).`
      ],
      scenarios: [
      `İşlem filtresi: herhangi bir işleme girmeden önce minimum R:R'yi onaylamak için bu hesaplayıcıyı kullanın.`,
      `Strateji değerlendirmesi: 50+ işlemi takip ettikten sonra gözlemlenen kazanma oranınızı ve ortalama R:R'yi EV formülüne girin.`
      ],
      checklist: [
      `Bir risk-ödül kurulumunu kesinleştirmeden önce: 1) Giriş teknik olarak gerekçelendirilmiş bir seviyede olmalıdır. 2) Stop-loss işlem fikrini yanlışlayan yere yerleştirilmelidir. 3) Kâr al bir sonraki önemli direnç/destek seviyesinde olmalıdır.`,
      `Hesapladıktan sonra: R:R 2:1 veya daha iyiyse ve benzer kurulumlardaki geçmiş kazanma oranınız %40'tan fazlaysa devam edin.`
      ],
      mistakes: [
      `TP'yi gerçekçi olmayan seviyelere taşıyarak işlemleri keyfi bir R:R eşiğini karşılamaya zorlamak.`,
      `Kazanma oranını göz önünde bulundurmadan R:R değerlendirmek.`
      ],
      benchmarks: [
      `R:R'ye göre başabaş kazanma oranları: 1:1 için %50 gerekir; 2:1 için %33; 3:1 için %25.`,
      `Profesyonel sistematik traderlar genellikle 2.5:1 ortalama R:R ile %40 kazanma oranı hedefler.`
      ],
      execution: [
      `İşlem öncesi R:R değerlendirmesi: 1) Grafikte giriş, SL ve TP'yi işaretleyin. 2) Hesaplayıcıya girin. 3) R:R'nin minimumu karşılayıp karşılamadığını kontrol edin. 4) Benzer kurulumlardaki geçmiş kazanma oranını kontrol edin. 5) EV'yi hesaplayın.`,
      `Trading günlüğü entegrasyonu: her işlemden sonra planlanan R:R'yi ve gerçek çıkışı kaydedin.`
      ],
      hygiene: [
      `Kapalı işlemlerde ortalama R:R'nizi aylık olarak gözden geçirin.`,
      `Gerçek ortalama R:R'niz tutarlı olarak planlanan R:R'nin altındaysa çok erken çıkıyorsunuzdur.`
      ],
      validation: [
      `R:R'yi doğrulayın: TP mesafesi / SL mesafesi = R:R oranı.`,
      `R:R ve kazanma oranı kombinasyonunuzu en az 30 geçmiş kurulum örneğinde geriye dönük test edin.`
      ],
    },
    hi: {
      interpret: [
      `जोखिम-इनाम अनुपात (R:R) आउटपुट संभावित लाभ (TP तक दूरी) से संभावित हानि (SL तक दूरी) का अनुपात है। 3:1 R:R का मतलब है कि आप संभावित रूप से $3 कमाने के लिए $1 जोखिम में डालते हैं।`,
      `प्रति ट्रेड अपेक्षित मूल्य (EV) आपकी जीत दर को R:R के साथ जोड़ता है: EV = (जीत दर × लाभ) − (हानि दर × हानि)।`
      ],
      scenarios: [
      `ट्रेड फिल्टर: किसी भी ट्रेड में प्रवेश करने से पहले, न्यूनतम R:R की पुष्टि करने के लिए इस कैलकुलेटर का उपयोग करें।`,
      `रणनीति मूल्यांकन: 50+ ट्रेड ट्रैक करने के बाद, EV फॉर्मूले में अपनी अनुभवी जीत दर और औसत R:R दर्ज करें।`
      ],
      checklist: [
      `जोखिम-इनाम सेटअप को अंतिम रूप देने से पहले: 1) प्रवेश तकनीकी रूप से उचित स्तर पर होना चाहिए। 2) स्टॉप-लॉस वहाँ रखा जाना चाहिए जहाँ ट्रेड आइडिया गलत साबित होती है। 3) टेक-प्रॉफिट अगले महत्वपूर्ण प्रतिरोध पर होना चाहिए।`,
      `गणना के बाद: यदि R:R 2:1 या बेहतर है और समान सेटअप में आपकी ऐतिहासिक जीत दर 40%+ है, तो आगे बढ़ें।`
      ],
      mistakes: [
      `TP को अवास्तविक स्तरों तक ले जाकर मनमाने R:R थ्रेशोल्ड को पूरा करने के लिए ट्रेड को मजबूर करना।`,
      `जीत दर पर विचार किए बिना R:R का मूल्यांकन करना।`
      ],
      benchmarks: [
      `R:R के अनुसार ब्रेकईवन जीत दरें: 1:1 को 50% जीत दर की आवश्यकता है; 2:1 को 33%; 3:1 को 25%।`,
      `पेशेवर व्यवस्थित ट्रेडर अक्सर 2.5:1 औसत R:R के साथ 40% जीत दर का लक्ष्य रखते हैं।`
      ],
      execution: [
      `पूर्व-ट्रेड R:R मूल्यांकन: 1) चार्ट पर प्रवेश, SL और TP चिह्नित करें। 2) कैलकुलेटर में दर्ज करें। 3) जांचें कि R:R आपके न्यूनतम को पूरा करता है। 4) समान सेटअप के लिए ऐतिहासिक जीत दर जांचें। 5) EV की गणना करें।`,
      `ट्रेडिंग जर्नल एकीकरण: प्रत्येक ट्रेड के बाद, नियोजित R:R और वास्तविक निकास लॉग करें।`
      ],
      hygiene: [
      `मासिक रूप से बंद ट्रेड में अपने औसत R:R की समीक्षा करें।`,
      `यदि आपका वास्तविक औसत R:R लगातार नियोजित R:R से कम है, तो आप बहुत जल्दी बाहर निकल रहे हैं।`
      ],
      validation: [
      `R:R को सत्यापित करें: TP दूरी / SL दूरी = R:R अनुपात।`,
      `कम से कम 30 ऐतिहासिक उदाहरणों पर अपने R:R और जीत दर संयोजन का बैक-टेस्ट करें।`
      ],
    },
    ru: {
      interpret: [
      `Вывод соотношения риска к прибыли (R:R) — это соотношение потенциальной прибыли (расстояние до TP) к потенциальному убытку (расстояние до SL). R:R 3:1 означает, что вы рискуете $1, чтобы потенциально заработать $3. Минимальный процент выигрышей для безубыточности: при R:R 3:1 — 25%.`,
      `Ожидаемое значение на сделку (EV) объединяет процент побед с R:R: EV = (% побед × прибыль) − (% поражений × убыток). Положительное EV означает, что стратегия прибыльна в долгосрочной перспективе.`
      ],
      scenarios: [
      `Фильтрация сделок: перед входом в любую сделку используйте этот калькулятор для подтверждения минимального R:R. Если анализ даёт R:R ниже 1.5:1 — пропустите сделку.`,
      `Оценка стратегии: после отслеживания 50+ сделок введите наблюдаемый процент побед и средний R:R в формулу EV. Отрицательное или едва положительное EV указывает на необходимость улучшения стратегии.`
      ],
      checklist: [
      `Перед окончательным определением параметров риска/прибыли: 1) Вход должен быть на технически обоснованном уровне. 2) Стоп-лосс — там, где торговая идея оказывается ошибочной. 3) Тейк-профит — на следующем значимом уровне сопротивления/поддержки.`,
      `После расчёта: если R:R ≥ 2:1 и исторический процент побед на аналогичных ситуациях ≥ 40%, продолжайте.`
      ],
      mistakes: [
      `Искусственное выставление TP на нереалистичных уровнях для достижения произвольного порога R:R. Сдвиг TP за уровень сопротивления не увеличивает вероятность его достижения — он лишь снижает процент побед.`,
      `Оценка R:R без учёта процента побед. Стратегия с R:R 5:1 и 10% побед имеет EV = 0.5 − 0.9 = -0.4 — убыточная стратегия.`
      ],
      benchmarks: [
      `Минимальный процент побед для безубыточности: при R:R 1:1 — 50%; при 2:1 — 33%; при 3:1 — 25%; при 4:1 — 20%. Большинство розничных трейдеров достигают 40–55% побед, что делает 2:1 практическим минимумом.`,
      `Профессиональные систематические трейдеры обычно нацелены на 40% побед при среднем R:R 2.5:1, что даёт EV +0.4 на единицу риска.`
      ],
      execution: [
      `Предсделочная оценка R:R: 1) Отметьте точку входа, SL и TP на графике. 2) Введите в калькулятор. 3) Проверьте, соответствует ли R:R минимальному порогу. 4) Оцените исторический процент побед для аналогичных ситуаций. 5) Рассчитайте EV. 6) Входите только при EV > 0.`,
      `Интеграция с торговым журналом: после каждой сделки фиксируйте плановый R:R, фактический выход и соответствие ситуации критериям.`
      ],
      hygiene: [
      `Ежемесячно проверяйте средний R:R по закрытым сделкам. Снижение среднего R:R часто указывает на психологическое давление — раннее закрытие прибыли или удержание убыточных позиций.`,
      `Если фактический средний R:R систематически ниже планового, вы выходите слишком рано. Используйте автоматические лимитные ордера для TP и SL.`
      ],
      validation: [
      `Проверьте R:R: расстояние до TP / расстояние до SL = соотношение R:R. Если TP на $300 выше входа, а SL на $100 ниже, R:R = 3:1.`,
      `Проведите бэктест комбинации R:R и процента побед на не менее 30 исторических примерах вашей ситуации. Если историческое EV отрицательно даже на бумаге, стратегия не имеет преимущества.`
      ],
    },
  },
  'staking-calculator': {
    en: {
      interpret: [
      `The staking rewards output shows estimated annual yield in both token quantity and USD value, based on the current network APY, your stake amount, and the current token price. The key insight: staking yield is denominated in the staked token, not in dollars. If the token price falls 50% but APY remains 10%, your dollar yield halves despite the same token output. Staking rewards do not protect you from price decline — they only increase your token quantity.`,
      `The compounding effect matters significantly for long-term stakes. An APY of 10% compounded monthly yields approximately 10.47% effectively. If your staking protocol auto-compounds (restakes rewards), the calculator's compounding output shows the benefit — for 100 tokens at 10% over 5 years with monthly compounding, you accumulate ≈164 tokens versus ≈150 without compounding. This 9% bonus is the core argument for choosing auto-compounding protocols over manual claim-and-restake.`
      ],
      scenarios: [
      `Yield optimization: compare staking APY across multiple validators or protocols for the same asset. Enter identical stake amounts and holding periods into this calculator for each option. Factor in validator commission (reduces your yield by their commission percentage) and minimum unstaking period, which affects your ability to exit during a price drop.`,
      `Staking vs. selling strategy: enter a large reward accumulation from a long staking period and compare the dollar value at current price vs. immediately reinvesting rewards into more of the same asset. If you believe in the asset's long-term price appreciation, holding and auto-compounding dominates a sell-and-hold-fiat strategy at rates above 8% APY.`
      ],
      checklist: [
      `Before staking: 1) Confirm the unstaking (unbonding) period — Ethereum has no lockup, but Cosmos chains require 14–21 days, Polkadot 28 days. 2) Verify the validator's uptime and slash history — a validator that was slashed once loses your principal, not just your rewards. 3) Check whether the quoted APY is pre-tax or post-tax in your jurisdiction.`,
      `After staking: note the reward claim frequency and whether rewards auto-compound. Calculate the annualized advantage of monthly vs. daily compounding for your stake size — for stakes under $1,000, the gas cost of frequent claiming may exceed the compounding benefit.`
      ],
      mistakes: [
      `Treating the APY as a guaranteed dollar return is the most common conceptual mistake. Staking yield is paid in the volatile asset itself. A 20% APY looks attractive, but if the token loses 60% of value during the year, your dollar return is (1.20 × 0.40) − 1 = −52%. Always model the dollar return at 30%, 50%, and 70% lower token prices.`,
      `Ignoring inflation dilution: some protocols have high nominal APY (20–30%) because they mint new tokens to pay rewards. This inflates the total supply and dilutes existing holders unless the protocol generates enough real revenue to absorb the inflation. A 20% APY on a protocol with 25% token inflation is a net negative real yield.`
      ],
      benchmarks: [
      `Reference yields by asset class: proof-of-stake layer-1 chains (ETH, SOL, DOT, ATOM) typically offer 3–12% APY. DeFi lending protocols offer 2–8% APY on stablecoins with lower risk. Newer protocols or liquidity mining programs offer 20–100%+ APY with high inflation risk and smart contract risk. Use this calculator to normalize these across your holding period.`,
      `Compare staking APY to the risk-free rate in your currency (e.g., US treasury yield of 4–5%). Staking yield above the risk-free rate must be justified by the expected price appreciation of the underlying asset plus the inherent volatility and smart contract risk. A 6% staking yield on an asset with 50% drawdown risk is not "safe yield."`
      ],
      execution: [
      `Staking workflow: 1) Choose a validator with 99%+ uptime and 0 slash history. 2) Check commission rate (5–10% is typical; avoid >15%). 3) Stake and record: date, amount staked, token price, APY at staking time. 4) Set a monthly reminder to check APY changes and validator status. 5) Decide reward compounding frequency based on gas cost vs. compounding benefit.`,
      `Unstaking decision: when unstaking, use this calculator to compare: a) staying staked through a price dip and recovering later, versus b) unstaking during the lockup period and selling at the current price. The lockup period means you can't act instantly — model the worst-case scenario where the price continues to drop during the unbonding period.`
      ],
      hygiene: [
      `Track your staking rewards monthly: date, token amount received, dollar value at receipt, cumulative yield. This creates the paper trail needed for tax reporting (staking rewards are typically taxable income at the fair market value on the date received in most jurisdictions).`,
      `Monitor APY changes quarterly. Network APY fluctuates with validator count, token supply, and protocol parameters. A protocol that offered 15% APY 6 months ago may now offer 8% as more stake enters the network. Recalculate your annualized return projection with updated APY to maintain accurate expectations.`
      ],
      validation: [
      `Estimate your expected reward: (stake amount × APY / 365 × days staked) = approximate token reward. Compare to actual rewards received from your validator. Consistent shortfalls (>5% below estimate) may indicate missed rewards, validator downtime, or slashing you were not notified about.`,
      `Cross-check the APY shown by the calculator against the validator's or protocol's current published APY. CoinGecko and protocol dashboards often show different APY due to calculation methodology differences (some include validator commission in the reported figure, some do not).`
      ],
    },
    es: {
      interpret: [
      `La salida de recompensas de staking muestra el rendimiento anual estimado tanto en cantidad de tokens como en valor USD, basado en el APY actual de la red, tu cantidad apostada y el precio actual del token. La información clave: el rendimiento de staking está denominado en el token apostado, no en dólares.`,
      `El efecto de capitalización importa significativamente para stakes a largo plazo. Un APY del 10% capitalizado mensualmente rinde aproximadamente un 10.47% efectivo.`
      ],
      scenarios: [
      `Optimización de rendimiento: compara el APY de staking entre múltiples validadores o protocolos para el mismo activo. Introduce montos e períodos de tenencia idénticos en este calculador para cada opción.`,
      `Estrategia de staking vs. venta: introduce una gran acumulación de recompensas de un largo período de staking y compara el valor en dólares al precio actual vs. reinvertir inmediatamente las recompensas.`
      ],
      checklist: [
      `Antes de hacer staking: 1) Confirma el período de desbloqueo. 2) Verifica el tiempo de actividad del validador y el historial de recortes. 3) Comprueba si el APY citado es antes o después de impuestos en tu jurisdicción.`,
      `Después de hacer staking: anota la frecuencia de reclamación de recompensas y si las recompensas se capitalizan automáticamente.`
      ],
      mistakes: [
      `Tratar el APY como un retorno garantizado en dólares es el error conceptual más común. El rendimiento de staking se paga en el activo volátil en sí.`,
      `Ignorar la dilución por inflación: algunos protocolos tienen un APY nominal alto porque acuñan nuevos tokens para pagar recompensas.`
      ],
      benchmarks: [
      `Rendimientos de referencia por clase de activos: cadenas de proof-of-stake de capa 1 típicamente ofrecen un 3–12% APY. Protocolos DeFi de préstamos ofrecen 2–8% APY en stablecoins.`,
      `Compara el APY de staking con la tasa libre de riesgo en tu moneda. El rendimiento de staking por encima de la tasa libre de riesgo debe estar justificado por la apreciación esperada del precio del activo subyacente.`
      ],
      execution: [
      `Flujo de trabajo de staking: 1) Elige un validador con 99%+ de tiempo de actividad y 0 historial de recortes. 2) Verifica la tasa de comisión (5–10% es típica). 3) Apuesta y registra: fecha, monto apostado, precio del token, APY al momento del staking. 4) Establece un recordatorio mensual para verificar cambios de APY y estado del validador.`,
      `Decisión de desbloqueo: cuando desbloquees, usa este calculador para comparar quedarse apostado a través de una caída de precio versus desapostar durante el período de bloqueo.`
      ],
      hygiene: [
      `Rastrea tus recompensas de staking mensualmente: fecha, monto de tokens recibidos, valor en dólares al momento de la recepción, rendimiento acumulado.`,
      `Monitorea los cambios de APY trimestralmente. El APY de la red fluctúa con el recuento de validadores, el suministro de tokens y los parámetros del protocolo.`
      ],
      validation: [
      `Estima tu recompensa esperada: (monto apostado × APY / 365 × días apostados) = recompensa aproximada en tokens. Compara con las recompensas reales recibidas de tu validador.`,
      `Verifica el APY mostrado por el calculador con el APY actual publicado por el validador o protocolo.`
      ],
    },
    pt: {
      interpret: [
      `A saída de recompensas de staking mostra o rendimento anual estimado em quantidade de tokens e valor USD, com base no APY atual da rede, seu valor apostado e o preço atual do token.`,
      `O efeito de capitalização importa significativamente para stakes de longo prazo.`
      ],
      scenarios: [
      `Otimização de rendimento: compare o APY de staking entre múltiplos validadores ou protocolos para o mesmo ativo.`,
      `Estratégia de staking vs. venda: insira uma grande acumulação de recompensas de um longo período de staking e compare o valor em dólares ao preço atual.`
      ],
      checklist: [
      `Antes de fazer staking: 1) Confirme o período de desbloqueio. 2) Verifique o uptime do validador e o histórico de cortes. 3) Verifique se o APY citado é antes ou depois de impostos.`,
      `Após fazer staking: anote a frequência de reivindicação de recompensas e se elas são compostas automaticamente.`
      ],
      mistakes: [
      `Tratar o APY como um retorno garantizado em dólares é o erro conceitual mais comum.`,
      `Ignorar a diluição por inflação.`
      ],
      benchmarks: [
      `Rendimentos de referência: cadeias proof-of-stake de camada 1 tipicamente oferecem 3–12% APY. Protocolos DeFi de empréstimos oferecem 2–8% APY em stablecoins.`,
      `Compare o APY de staking com a taxa livre de risco na sua moeda.`
      ],
      execution: [
      `Fluxo de trabalho de staking: 1) Escolha um validador com 99%+ de uptime e 0 histórico de cortes. 2) Verifique a taxa de comissão. 3) Aposte e registre: data, valor apostado, preço do token, APY no momento do staking.`,
      `Decisão de desbloqueio: ao desbloquear, use esta calculadora para comparar permanecer apostado versus desapostar durante o período de bloqueio.`
      ],
      hygiene: [
      `Rastreie suas recompensas de staking mensalmente: data, quantidade de tokens recebidos, valor em dólares no recebimento, rendimento acumulado.`,
      `Monitore as mudanças de APY trimestralmente.`
      ],
      validation: [
      `Estime sua recompensa esperada: (valor apostado × APY / 365 × dias apostados) = recompensa aproximada em tokens.`,
      `Verifique o APY mostrado pela calculadora com o APY publicado atualmente pelo validador ou protocolo.`
      ],
    },
    tr: {
      interpret: [
      `Staking ödülleri çıktısı, mevcut ağ APY'si, stake tutarınız ve mevcut token fiyatına göre hem token miktarı hem de USD değeri cinsinden tahmini yıllık getiriyi gösterir.`,
      `Bileşik faiz etkisi uzun vadeli stakeler için önemlidir.`
      ],
      scenarios: [
      `Getiri optimizasyonu: aynı varlık için birden fazla doğrulayıcı veya protokol arasında staking APY'sini karşılaştırın.`,
      `Staking ve satış stratejisi: uzun bir staking döneminden büyük bir ödül birikimini girin ve mevcut fiyattaki dolar değerini ödülleri hemen yeniden yatırmakla karşılaştırın.`
      ],
      checklist: [
      `Staking yapmadan önce: 1) Kilitleme (unbonding) süresini onaylayın. 2) Doğrulayıcının çalışma süresini ve slash geçmişini doğrulayın. 3) Alıntılanan APY'nin yargı alanınızda vergi öncesi mi yoksa sonrası mı olduğunu kontrol edin.`,
      `Staking sonrası: ödül talep sıklığını ve ödüllerin otomatik olarak bileşik oluşturup oluşturmadığını not edin.`
      ],
      mistakes: [
      `APY'yi garantili bir dolar getirisi olarak değerlendirmek en yaygın kavramsal hatadır.`,
      `Enflasyon seyreltmesini görmezden gelmek.`
      ],
      benchmarks: [
      `Varlık sınıfına göre referans getiriler: proof-of-stake katman-1 zincirleri tipik olarak %3–12 APY sunar. DeFi borç verme protokolleri stablecoin'lerde %2–8 APY sunar.`,
      `Staking APY'sini para biriminizde risksiz oranla karşılaştırın.`
      ],
      execution: [
      `Staking iş akışı: 1) %99+ çalışma süresi ve 0 slash geçmişine sahip bir doğrulayıcı seçin. 2) Komisyon oranını kontrol edin. 3) Stake yapın ve kaydedin: tarih, stake edilen tutar, token fiyatı, staking anındaki APY.`,
      `Unstaking kararı: unstaking yaparken, fiyat düşüşü boyunca stake etmeye devam etmek ile kilit süresi boyunca unstaking yapmayı karşılaştırmak için bu hesaplayıcıyı kullanın.`
      ],
      hygiene: [
      `Staking ödüllerinizi aylık olarak takip edin: tarih, alınan token miktarı, alım anındaki dolar değeri, birikimli getiri.`,
      `APY değişikliklerini çeyreklik olarak izleyin.`
      ],
      validation: [
      `Beklenen ödülünüzü tahmin edin: (stake tutarı × APY / 365 × stake günleri) = yaklaşık token ödülü.`,
      `Hesaplayıcının gösterdiği APY'yi doğrulayıcı veya protokolün yayımladığı mevcut APY ile çapraz kontrol edin.`
      ],
    },
    hi: {
      interpret: [
      `स्टेकिंग रिवार्ड आउटपुट वर्तमान नेटवर्क APY, आपकी स्टेक राशि और वर्तमान टोकन मूल्य के आधार पर टोकन मात्रा और USD मूल्य दोनों में अनुमानित वार्षिक उपज दिखाता है।`,
      `दीर्घकालिक स्टेक के लिए चक्रवृद्धि प्रभाव महत्वपूर्ण रूप से मायने रखता है।`
      ],
      scenarios: [
      `उपज अनुकूलन: उसी संपत्ति के लिए कई वैलिडेटर या प्रोटोकॉल में स्टेकिंग APY की तुलना करें।`,
      `स्टेकिंग बनाम बेचने की रणनीति: एक लंबी स्टेकिंग अवधि से बड़े रिवार्ड संचय को दर्ज करें और वर्तमान मूल्य पर डॉलर मूल्य की तुलना रिवार्ड को तुरंत पुनर्निवेश करने से करें।`
      ],
      checklist: [
      `स्टेकिंग से पहले: 1) अनस्टेकिंग (अनबॉन्डिंग) अवधि की पुष्टि करें। 2) वैलिडेटर की अपटाइम और स्लैश हिस्ट्री सत्यापित करें। 3) जांचें कि क्या उद्धृत APY आपके न्यायक्षेत्र में कर-पूर्व या कर-पश्चात है।`,
      `स्टेकिंग के बाद: रिवार्ड दावे की आवृत्ति और क्या रिवार्ड स्वतः चक्रवृद्धि होते हैं, नोट करें।`
      ],
      mistakes: [
      `APY को गारंटीड डॉलर रिटर्न के रूप में मानना सबसे आम वैचारिक गलती है।`,
      `मुद्रास्फीति कमजोरीकरण को नजरअंदाज करना।`
      ],
      benchmarks: [
      `संपत्ति वर्ग द्वारा संदर्भ उपज: proof-of-stake लेयर-1 चेन आमतौर पर 3–12% APY प्रदान करती हैं। DeFi ऋण देने के प्रोटोकॉल स्टेबलकॉइन पर 2–8% APY प्रदान करते हैं।`,
      `अपनी मुद्रा में जोखिम-मुक्त दर के साथ स्टेकिंग APY की तुलना करें।`
      ],
      execution: [
      `स्टेकिंग वर्कफ़्लो: 1) 99%+ अपटाइम और 0 स्लैश हिस्ट्री वाला वैलिडेटर चुनें। 2) कमीशन दर जांचें। 3) स्टेक करें और रिकॉर्ड करें: तारीख, स्टेक की गई राशि, टोकन मूल्य, स्टेकिंग समय पर APY।`,
      `अनस्टेकिंग निर्णय: अनस्टेक करते समय, मूल्य गिरावट के माध्यम से स्टेक में रहने और लॉकअप अवधि के दौरान अनस्टेक करने की तुलना करने के लिए इस कैलकुलेटर का उपयोग करें।`
      ],
      hygiene: [
      `अपने स्टेकिंग रिवार्ड मासिक रूप से ट्रैक करें: तारीख, प्राप्त टोकन राशि, रसीद पर डॉलर मूल्य, संचयी उपज।`,
      `तिमाही रूप से APY परिवर्तनों की निगरानी करें।`
      ],
      validation: [
      `अपने अपेक्षित रिवार्ड का अनुमान लगाएं: (स्टेक राशि × APY / 365 × स्टेक किए गए दिन) = अनुमानित टोकन रिवार्ड।`,
      `कैलकुलेटर द्वारा दिखाए गए APY को वैलिडेटर या प्रोटोकॉल के वर्तमान प्रकाशित APY के साथ क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Вывод вознаграждений за стейкинг показывает расчётную годовую доходность как в количестве токенов, так и в долларовом эквиваленте, на основе текущего APY сети, суммы вашего стейкинга и текущей цены токена. Ключевой момент: доходность от стейкинга номинирована в стейкнутом токене, а не в долларах.`,
      `Эффект компаундирования существенно важен для долгосрочных ставок. APY 10% при ежемесячном начислении даёт эффективно ≈10.47%.`
      ],
      scenarios: [
      `Оптимизация доходности: сравните APY стейкинга у нескольких валидаторов или протоколов для одного и того же актива. Введите одинаковые суммы и периоды удержания в калькулятор для каждого варианта.`,
      `Стратегия стейкинга vs. продажи: введите крупное накопление вознаграждений за длительный период стейкинга и сравните долларовую стоимость по текущей цене с немедленным реинвестированием вознаграждений.`
      ],
      checklist: [
      `Перед стейкингом: 1) Уточните период анстейкинга (анбондинга) — у Ethereum его нет, у Cosmos-сетей 14–21 день, у Polkadot 28 дней. 2) Проверьте аптайм валидатора и историю слэшинга. 3) Уточните, является ли указанный APY до или после налогов.`,
      `После стейкинга: обратите внимание на частоту получения вознаграждений и происходит ли автокомпаундинг.`
      ],
      mistakes: [
      `Восприятие APY как гарантированной долларовой доходности — наиболее распространённая концептуальная ошибка. Доходность от стейкинга выплачивается в волатильном активе. При APY 20% и падении цены токена на 60% долларовая доходность составит (1.20 × 0.40) − 1 = −52%.`,
      `Игнорирование инфляционного размывания: некоторые протоколы имеют высокий номинальный APY (20–30%), поскольку чеканят новые токены для выплаты вознаграждений, раздувая предложение.`
      ],
      benchmarks: [
      `Референсная доходность по классам активов: PoS-блокчейны первого уровня (ETH, SOL, DOT, ATOM) обычно предлагают 3–12% APY. DeFi-протоколы кредитования — 2–8% APY по стейблкоинам.`,
      `Сравните APY стейкинга с безрисковой ставкой в вашей валюте (например, доходность казначейских облигаций США 4–5%). Доходность стейкинга выше безрисковой ставки должна быть обоснована ожидаемым ростом цены актива.`
      ],
      execution: [
      `Процесс стейкинга: 1) Выберите валидатора с аптаймом 99%+ и нулевым слэшингом. 2) Проверьте комиссию (5–10% — типично; избегайте >15%). 3) Застейкайте и запишите: дата, сумма, цена токена, APY на момент стейкинга. 4) Установите ежемесячное напоминание для проверки изменений APY и статуса валидатора.`,
      `Решение об анстейкинге: при анстейкинге используйте калькулятор для сравнения сценариев: оставаться застейканным через просадку цены или выйти из позиции, учитывая период локапа.`
      ],
      hygiene: [
      `Ежемесячно отслеживайте вознаграждения за стейкинг: дата, количество полученных токенов, долларовая стоимость на момент получения, накопленная доходность. Это создаёт документацию для налоговой отчётности.`,
      `Ежеквартально отслеживайте изменения APY. APY сети колеблется в зависимости от количества валидаторов, предложения токенов и параметров протокола.`
      ],
      validation: [
      `Оцените ожидаемое вознаграждение: (сумма стейкинга × APY / 365 × дни стейкинга) ≈ количество токенов в виде вознаграждения. Сравните с фактически полученными вознаграждениями от валидатора.`,
      `Сверьте APY, показанный калькулятором, с текущим опубликованным APY валидатора или протокола.`
      ],
    },
  },

};
