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


  'impermanent-loss-calculator': {
    en: {
      interpret: [
      `Impermanent loss (IL) output shows the percentage value difference between holding tokens in a liquidity pool versus simply holding them in a wallet. The IL percentage increases non-linearly with price divergence: a 2× price change produces ≈5.7% IL, a 4× change produces ≈20% IL, and a 10× change produces ≈42.5% IL. The loss is "impermanent" only if you remain in the pool long enough for the price ratio to revert — if you exit when prices are diverged, the loss becomes permanent.`,
      `The fee income section shows the trading fees earned by the pool, which offset IL. The breakeven fee rate tells you the minimum fee income percentage needed to cover IL. If your pool earns more in fees than the IL percentage, providing liquidity is profitable versus holding. For volatile pairs during quiet markets, fees often exceed IL. For stable pairs (USDC/USDT, stablecoin pools), IL is near zero because prices stay pegged.`
      ],
      scenarios: [
      `Pre-provision assessment: before adding liquidity to any pool, enter the two token addresses and your planned deposit amount. Look at the historical price ratio chart and estimate how much the ratio has moved in the past 30 days. If the ratio moved 2–3×, expect the IL shown by the calculator to have occurred — compare it to 30-day fee income reported on Uniswap or the DEX dashboard.`,
      `Exit timing analysis: if you are already in a pool and prices have diverged, enter the current price ratio into the calculator to see your current IL. Compare to your accumulated fee income. If cumulative fees still exceed IL, staying in is rational. If IL exceeds fees and you do not expect prices to revert, exit and redeploy capital.`
      ],
      checklist: [
      `Before entering a liquidity pool: 1) Check the pool's 7-day fee APY from the DEX dashboard. 2) Enter both token's initial prices and estimate a realistic price divergence scenario (e.g., if ETH/USDC and ETH rises 50%, enter price ratio 1.5×). 3) Compare the IL at 1.5× to the expected fee income over your holding period.`,
      `After calculating IL: if the worst-case IL (2–3× price divergence) exceeds 30 days of fee income, the pool has insufficient fee rate to compensate for holding a volatile pair in concentrated liquidity.`
      ],
      mistakes: [
      `Ignoring IL when providing liquidity to pairs where both tokens are volatile (e.g., ETH/ALT). When both tokens move but in different directions, IL compounds rapidly. For maximum IL protection, provide liquidity to pairs where one asset is a stablecoin.`,
      `Assuming that high APY automatically compensates for IL. APY is calculated on current liquidity and fee rates, which change constantly. If the pool APY drops significantly, the previously-acceptable IL trade-off becomes unfavorable. Monitor both IL and fee income simultaneously.`
      ],
      benchmarks: [
      `For USDC/ETH pools on Uniswap v3 at 0.3% fee tier, historical fee APY ranges from 5–40% depending on ETH price volatility. Compare this to the IL generated by a 2× ETH price move (≈5.7%) to see whether the position is net positive over a typical 30-day holding period.`,
      `As a rule of thumb: only provide liquidity to volatile pairs if the pool's 7-day fee APY exceeds 15% annualized. Below this, static holding of the same tokens typically outperforms liquidity provision over market cycles with significant price movements.`
      ],
      execution: [
      `Liquidity provision workflow: 1) Check DEX pool analytics (Uniswap info, LP.finance, DeFiLlama). 2) Calculate IL at ±50% and ±100% price change scenarios. 3) Check the pool's realized 30-day fee income. 4) Only enter if fee income > worst-case IL for your intended holding period. 5) Set a calendar reminder to re-evaluate monthly.`,
      `Concentrated liquidity (Uniswap v3): when setting price ranges, the IL is amplified within the range. Use this calculator to model IL in your specific price band, not the full-range equivalent. A ±20% price range in Uniswap v3 earns 2–4× the fees but incurs IL much faster if price exits the range.`
      ],
      hygiene: [
      `Check your LP position's value weekly and compare to a pure hold of the same tokens. Track the cumulative fee income separately from the position value — most wallet interfaces show the combined value but not the components that determine whether IL has been overcome by fees.`,
      `When claiming rewards from farming on top of LP fees, record the market value of claimed tokens on the date of receipt for tax reporting. These are typically taxable income, separate from any gains or losses on the LP position itself.`
      ],
      validation: [
      `Manual IL check: IL = 2√(price ratio) / (1 + price ratio) − 1. For a 2× price ratio (one token doubles): IL = 2√2 / 3 − 1 = 2.828/3 − 1 = −0.0572 = −5.72%. Compare to the calculator output — any difference over 0.1% indicates an incorrect price ratio input.`,
      `Verify fee income estimate: (pool TVL × fee rate × daily volume / TVL) × your share × 365 = estimated annual fee income. Your share = (your liquidity / total pool liquidity). Cross-check against the pool's analytics dashboard for the same period.`
      ],
    },
    es: {
      interpret: [
      `La pérdida impermanente (IL) muestra la diferencia porcentual de valor entre mantener tokens en un pool de liquidez versus simplemente mantenerlos en una cartera. La IL aumenta de forma no lineal con la divergencia de precios: un cambio de precio de 2× produce ≈5.7% de IL.`,
      `La sección de ingresos por comisiones muestra las tarifas de trading ganadas por el pool, que compensan la IL. La tasa de comisión de equilibrio indica el porcentaje mínimo de ingresos por comisiones necesario para cubrir la IL.`
      ],
      scenarios: [
      `Evaluación previa a la provisión: antes de añadir liquidez a cualquier pool, introduce los dos tokens y tu monto de depósito planeado. Observa el gráfico histórico de la relación de precios y estima cuánto se ha movido la relación en los últimos 30 días.`,
      `Análisis del momento de salida: si ya estás en un pool y los precios han divergido, introduce la relación de precios actual en el calculador para ver tu IL actual.`
      ],
      checklist: [
      `Antes de entrar en un pool de liquidez: 1) Comprueba el APY de comisiones de 7 días del panel del DEX. 2) Introduce los precios iniciales de ambos tokens y estima un escenario realista de divergencia de precios. 3) Compara la IL con los ingresos de comisiones esperados durante tu período de tenencia.`,
      `Después de calcular la IL: si la IL en el peor caso supera los ingresos de comisiones de 30 días, el pool tiene una tasa de comisiones insuficiente para compensar.`
      ],
      mistakes: [
      `Ignorar la IL al proporcionar liquidez a pares donde ambos tokens son volátiles. Para la máxima protección contra IL, proporciona liquidez a pares donde un activo es una stablecoin.`,
      `Asumir que el alto APY compensa automáticamente la IL. El APY cambia constantemente y si cae significativamente, el compromiso de IL previamente aceptable se vuelve desfavorable.`
      ],
      benchmarks: [
      `Para pools USDC/ETH en Uniswap v3 con un nivel de comisión del 0.3%, el APY histórico de comisiones oscila entre el 5–40% dependiendo de la volatilidad del precio de ETH.`,
      `Como regla general: solo proporciona liquidez a pares volátiles si el APY de comisiones de 7 días del pool supera el 15% anualizado.`
      ],
      execution: [
      `Flujo de trabajo de provisión de liquidez: 1) Comprueba el análisis del pool DEX. 2) Calcula la IL en escenarios de cambio de precio de ±50% y ±100%. 3) Comprueba los ingresos de comisiones realizados a 30 días del pool. 4) Solo entra si los ingresos por comisiones superan la IL en el peor caso para tu período de tenencia previsto.`,
      `Liquidez concentrada (Uniswap v3): al establecer rangos de precios, la IL se amplifica dentro del rango. Usa este calculador para modelar la IL en tu banda de precios específica.`
      ],
      hygiene: [
      `Comprueba el valor de tu posición LP semanalmente y compáralo con un simple mantenimiento de los mismos tokens.`,
      `Al reclamar recompensas del farming además de las comisiones LP, registra el valor de mercado de los tokens reclamados en la fecha de recepción para la declaración fiscal.`
      ],
      validation: [
      `Verificación manual de IL: IL = 2√(relación de precios) / (1 + relación de precios) − 1. Para una relación de precios de 2×: IL = −5.72%.`,
      `Verifica la estimación de ingresos por comisiones comparando con el panel de análisis del pool para el mismo período.`
      ],
    },
    pt: {
      interpret: [
      `A perda impermanente (IL) mostra a diferença percentual de valor entre manter tokens em um pool de liquidez versus simplesmente mantê-los em uma carteira. A IL aumenta de forma não linear com a divergência de preços.`,
      `A seção de receita de taxas mostra as taxas de negociação ganhas pelo pool, que compensam a IL.`
      ],
      scenarios: [
      `Avaliação pré-provisão: antes de adicionar liquidez a qualquer pool, insira os dois tokens e seu valor de depósito planejado.`,
      `Análise do momento de saída: se você já está em um pool e os preços divergiram, insira a relação de preços atual na calculadora para ver sua IL atual.`
      ],
      checklist: [
      `Antes de entrar em um pool de liquidez: 1) Verifique o APY de taxas de 7 dias no painel do DEX. 2) Insira os preços iniciais de ambos os tokens e estime um cenário realista de divergência de preços.`,
      `Após calcular a IL: se a IL no pior caso exceder a receita de taxas de 30 dias, o pool tem taxa de taxas insuficiente para compensar.`
      ],
      mistakes: [
      `Ignorar a IL ao fornecer liquidez a pares onde ambos os tokens são voláteis.`,
      `Assumir que alto APY automaticamente compensa a IL.`
      ],
      benchmarks: [
      `Para pools USDC/ETH na Uniswap v3 com taxa de 0.3%, o APY histórico de taxas varia de 5–40%.`,
      `Como regra geral: forneça liquidez a pares voláteis apenas se o APY de taxas de 7 dias do pool superar 15% ao ano.`
      ],
      execution: [
      `Fluxo de trabalho de provisão de liquidez: 1) Verifique análises do pool DEX. 2) Calcule a IL em cenários de ±50% e ±100% de variação de preço. 3) Verifique a receita de taxas realizada de 30 dias. 4) Apenas entre se a receita de taxas exceder a IL no pior caso.`,
      `Liquidez concentrada (Uniswap v3): ao definir faixas de preços, a IL é amplificada dentro da faixa.`
      ],
      hygiene: [
      `Verifique o valor da sua posição LP semanalmente e compare com a manutenção simples dos mesmos tokens.`,
      `Ao reivindicar recompensas de farming, registre o valor de mercado dos tokens reivindicados na data de recebimento.`
      ],
      validation: [
      `Verificação manual de IL: IL = 2√(relação de preços) / (1 + relação de preços) − 1.`,
      `Verifique a estimativa de receita de taxas comparando com o painel de análise do pool.`
      ],
    },
    tr: {
      interpret: [
      `Kalıcı olmayan kayıp (IL), token'ları bir likidite havuzunda tutmak ile bunları cüzdanda tutmak arasındaki yüzde değer farkını gösterir. IL, fiyat sapmasıyla doğrusal olmayan şekilde artar.`,
      `Ücret geliri bölümü, havuz tarafından kazanılan IL'yi telafi eden ticaret ücretlerini gösterir.`
      ],
      scenarios: [
      `Sağlama öncesi değerlendirme: herhangi bir havuza likidite eklemeden önce iki tokeni ve planlanan yatırım tutarınızı girin.`,
      `Çıkış zamanlaması analizi: zaten bir havuzdaysanız ve fiyatlar ayrıştıysa, mevcut IL'nizi görmek için mevcut fiyat oranını hesaplayıcıya girin.`
      ],
      checklist: [
      `Bir likidite havuzuna girmeden önce: 1) DEX panosundan 7 günlük ücret APY'sini kontrol edin. 2) Her iki tokenin başlangıç fiyatlarını girin ve gerçekçi bir fiyat sapması senaryosu tahmin edin.`,
      `IL'yi hesapladıktan sonra: en kötü durumda IL 30 günlük ücret gelirini aşıyorsa, havuzun ücret oranı telafi için yetersizdir.`
      ],
      mistakes: [
      `Her iki token da değişken olduğunda çiftlere likidite sağlarken IL'yi görmezden gelmek.`,
      `Yüksek APY'nin otomatik olarak IL'yi telafi ettiğini varsaymak.`
      ],
      benchmarks: [
      `Uniswap v3'teki %0.3 ücret katmanında USDC/ETH havuzları için tarihsel ücret APY'si %5–40 arasında değişmektedir.`,
      `Genel kural olarak: yalnızca havuzun 7 günlük ücret APY'si yıllık %15'i aşıyorsa değişken çiftlere likidite sağlayın.`
      ],
      execution: [
      `Likidite sağlama iş akışı: 1) DEX havuz analizini kontrol edin. 2) ±%50 ve ±%100 fiyat değişimi senaryolarında IL'yi hesaplayın. 3) Havuzun 30 günlük gerçekleşmiş ücret gelirini kontrol edin. 4) Yalnızca ücret geliri en kötü durumda IL'yi aşıyorsa girin.`,
      `Konsantre likidite (Uniswap v3): fiyat aralıkları belirlerken IL, aralık içinde büyütülür.`
      ],
      hygiene: [
      `LP pozisyonunuzun değerini haftalık olarak kontrol edin ve aynı tokenleri tutmakla karşılaştırın.`,
      `Farming ödülleri talep ederken, talep edilen tokenlerin piyasa değerini alım tarihinde vergi raporlaması için kaydedin.`
      ],
      validation: [
      `Manuel IL kontrolü: IL = 2√(fiyat oranı) / (1 + fiyat oranı) − 1.`,
      `Ücret geliri tahmininizi aynı dönem için havuzun analiz panosuyla karşılaştırarak doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `अनित्य हानि (IL) एक लिक्विडिटी पूल में टोकन रखने बनाम उन्हें वॉलेट में रखने के बीच प्रतिशत मूल्य अंतर दिखाती है। IL मूल्य विचलन के साथ गैर-रैखिक रूप से बढ़ती है।`,
      `शुल्क आय अनुभाग पूल द्वारा अर्जित ट्रेडिंग शुल्क दिखाता है, जो IL की भरपाई करता है।`
      ],
      scenarios: [
      `पूर्व-प्रावधान मूल्यांकन: किसी भी पूल में लिक्विडिटी जोड़ने से पहले, दोनों टोकन और अपनी योजित जमा राशि दर्ज करें।`,
      `निकास समय विश्लेषण: यदि आप पहले से एक पूल में हैं और कीमतें विचलित हो गई हैं, तो अपनी वर्तमान IL देखने के लिए वर्तमान मूल्य अनुपात दर्ज करें।`
      ],
      checklist: [
      `लिक्विडिटी पूल में प्रवेश करने से पहले: 1) DEX डैशबोर्ड से 7-दिन का शुल्क APY जांचें। 2) दोनों टोकन के प्रारंभिक मूल्य दर्ज करें और यथार्थवादी मूल्य विचलन परिदृश्य का अनुमान लगाएं।`,
      `IL की गणना के बाद: यदि सबसे खराब स्थिति में IL 30 दिन की शुल्क आय से अधिक है, तो पूल की शुल्क दर भरपाई के लिए अपर्याप्त है।`
      ],
      mistakes: [
      `जब दोनों टोकन अस्थिर हों तो जोड़ों को लिक्विडिटी प्रदान करते समय IL को नजरअंदाज करना।`,
      `यह मानना कि उच्च APY स्वतः IL की भरपाई करता है।`
      ],
      benchmarks: [
      `Uniswap v3 पर 0.3% शुल्क स्तर पर USDC/ETH पूल के लिए, ऐतिहासिक शुल्क APY 5–40% की सीमा में है।`,
      `सामान्य नियम के रूप में: अस्थिर जोड़ों को लिक्विडिटी केवल तभी प्रदान करें जब पूल का 7-दिन का शुल्क APY 15% वार्षिक से अधिक हो।`
      ],
      execution: [
      `लिक्विडिटी प्रावधान वर्कफ़्लो: 1) DEX पूल एनालिटिक्स जांचें। 2) ±50% और ±100% मूल्य परिवर्तन परिदृश्यों में IL की गणना करें। 3) पूल की 30-दिन की वास्तविक शुल्क आय जांचें। 4) केवल तभी प्रवेश करें जब शुल्क आय सबसे खराब IL से अधिक हो।`,
      `केंद्रित लिक्विडिटी (Uniswap v3): मूल्य सीमाएं सेट करते समय, IL सीमा के भीतर बढ़ाई जाती है।`
      ],
      hygiene: [
      `अपनी LP पोजीशन की वैल्यू साप्ताहिक रूप से जांचें और उन्हीं टोकन को रखने से तुलना करें।`,
      `फार्मिंग रिवार्ड क्लेम करते समय, कर रिपोर्टिंग के लिए रसीद की तारीख पर क्लेम किए गए टोकन का बाजार मूल्य रिकॉर्ड करें।`
      ],
      validation: [
      `मैन्युअल IL जांच: IL = 2√(मूल्य अनुपात) / (1 + मूल्य अनुपात) − 1।`,
      `उसी अवधि के लिए पूल के एनालिटिक्स डैशबोर्ड के साथ तुलना करके शुल्क आय अनुमान सत्यापित करें।`
      ],
    },
    ru: {
      interpret: [
      `Непостоянные потери (IL) показывают разницу в процентах стоимости между удержанием токенов в пуле ликвидности и их хранением в кошельке. IL растёт нелинейно с расхождением цен: изменение цены в 2× даёт ≈5.7% IL, в 4× — ≈20%, в 10× — ≈42.5%.`,
      `Раздел дохода от комиссий показывает торговые комиссии пула, которые компенсируют IL. Минимальная ставка комиссий для безубыточности — это минимальный процент дохода от комиссий, необходимый для покрытия IL.`
      ],
      scenarios: [
      `Оценка перед предоставлением ликвидности: перед добавлением ликвидности в любой пул введите оба токена и планируемую сумму депозита. Изучите исторический график соотношения цен и оцените, насколько оно менялось за последние 30 дней.`,
      `Анализ момента выхода: если вы уже в пуле и цены разошлись, введите текущее соотношение цен в калькулятор, чтобы увидеть текущие IL. Сравните с накопленным доходом от комиссий.`
      ],
      checklist: [
      `Перед входом в пул ликвидности: 1) Проверьте 7-дневный APY от комиссий на дашборде DEX. 2) Введите начальные цены обоих токенов и оцените реалистичный сценарий расхождения цен. 3) Сравните IL с ожидаемым доходом от комиссий за период удержания.`,
      `После расчёта IL: если IL в худшем случае превышает 30-дневный доход от комиссий, ставка комиссий пула недостаточна для компенсации.`
      ],
      mistakes: [
      `Игнорирование IL при предоставлении ликвидности в пары, где оба токена волатильны. Для максимальной защиты от IL предоставляйте ликвидность парам, где один актив — стейблкоин.`,
      `Предположение, что высокий APY автоматически компенсирует IL. APY постоянно меняется — если он значительно снизится, ранее приемлемый компромисс с IL станет невыгодным.`
      ],
      benchmarks: [
      `Для пулов USDC/ETH на Uniswap v3 с комиссией 0.3% исторический APY от комиссий составляет 5–40% в зависимости от волатильности ETH. Сравните это с IL от 2× движения цены ETH (≈5.7%).`,
      `Практическое правило: предоставляйте ликвидность в волатильные пары только если 7-дневный APY от комиссий пула превышает 15% годовых.`
      ],
      execution: [
      `Процесс предоставления ликвидности: 1) Проверьте аналитику пула DEX. 2) Рассчитайте IL при сценариях ±50% и ±100% изменения цены. 3) Проверьте фактический доход от комиссий за 30 дней. 4) Входите только если доход от комиссий превышает IL в худшем случае за планируемый период.`,
      `Концентрированная ликвидность (Uniswap v3): при установке ценовых диапазонов IL внутри диапазона усиливается. Используйте калькулятор для моделирования IL в вашем конкретном диапазоне цен.`
      ],
      hygiene: [
      `Еженедельно проверяйте стоимость LP-позиции и сравнивайте с чистым холдингом тех же токенов. Большинство интерфейсов кошельков показывают суммарную стоимость, но не компоненты.`,
      `При получении вознаграждений от фарминга записывайте рыночную стоимость полученных токенов на дату получения для налоговой отчётности.`
      ],
      validation: [
      `Ручная проверка IL: IL = 2√(соотношение цен) / (1 + соотношение цен) − 1. При соотношении 2×: IL = −5.72%. Сравните с выводом калькулятора.`,
      `Проверьте оценку дохода от комиссий, сравнив с дашбордом аналитики пула за тот же период.`
      ],
    },
  },
  'apy-apr-calculator': {
    en: {
      interpret: [
      `APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding — reinvesting returns back into the principal. The calculator converts between them using: APY = (1 + APR/n)^n − 1, where n is the number of compounding periods per year. If a protocol quotes 12% APR with daily compounding, the effective APY is (1 + 0.12/365)^365 − 1 = 12.75%. This difference grows significantly at high rates: 100% APR daily compounds to ≈271% APY.`,
      `The compounding frequency matters most at high rates. At 5% APR, daily vs. monthly compounding yields only ≈0.06% additional APY. At 50% APR, daily vs. monthly produces a ≈1.5% additional APY — meaningful but not dominant. Understanding whether a protocol quotes APR or APY prevents you from double-counting the compounding effect when comparing yield sources.`
      ],
      scenarios: [
      `Yield source comparison: when comparing staking (typically quoted as APY) vs. lending protocols (typically APR), convert both to the same metric using this calculator. A 15% APR lending yield with daily compounding equals 16.18% APY — directly comparable to a 16% APY staking option, not a 15% vs. 16% comparison as it first appears.`,
      `Compounding strategy planning: enter your protocol's APR and test different compounding frequencies. If the protocol allows manual claim-and-reinvest, calculate whether weekly compounding (vs. daily) meaningfully reduces your APY, accounting for gas costs. For low APR strategies (5–10%), compounding frequency matters little; for high APR (30%+), daily compounding can add 3–5% additional APY.`
      ],
      checklist: [
      `Before comparing yields: 1) Confirm whether each protocol quotes APR or APY — this is often unclear in DeFi dashboards. 2) Check the compounding frequency for APY quotes: is it auto-compounded, or does it require manual claiming? 3) Account for gas costs when calculating effective APY — frequent claiming on Ethereum mainnet at high gas prices can negate the compounding benefit for small positions.`,
      `After converting: use the APY figure for all long-term comparisons and the APR figure for short-term (under 30 days) comparisons, since compounding has minimal effect over short periods.`
      ],
      mistakes: [
      `Assuming all protocols quote the same metric. DeFi protocols frequently mix APR and APY in the same dashboard, sometimes showing the higher number prominently. Always check the fine print or documentation to confirm which metric is displayed.`,
      `Applying the APY formula to a protocol that does not auto-compound. If you need to manually claim and reinvest, you are implementing APR, not APY, unless you actually reinvest on schedule. A protocol offering 20% APY that you claim only annually gives you ≈20% APR, not 20% APY.`
      ],
      benchmarks: [
      `Reference ranges: stable yield from blue-chip protocols (Aave, Compound) is typically 2–8% APY on stablecoins and 1–5% APY on ETH. High-yield opportunities (20–100%+ APY) carry proportionally higher risk from token inflation, smart contract exploits, or liquidity depth. Use the APY/APR calculator to normalize stated yields before risk comparison.`,
      `A 10% APY from a stablecoin pool equals roughly 9.53% APR with daily compounding. Compare this to US Treasury yields (4–5% annual) to calibrate the risk premium you are accepting for DeFi yield over a risk-free rate.`
      ],
      execution: [
      `Systematic comparison workflow: 1) List all yield sources under consideration. 2) Record whether each quotes APR or APY and the compounding frequency. 3) Convert all to APY using this calculator. 4) Rank by APY. 5) Adjust for risk (smart contract risk, inflation risk, liquidity risk) before allocating capital.`,
      `For auto-compounding vaults: verify the vault's reported APY matches the formula output for the underlying APR and compounding interval. If the vault shows significantly higher APY than the formula predicts, investigate — it may include token emissions or reward bonuses in the APY figure that carry additional risk.`
      ],
      hygiene: [
      `Re-run this calculation monthly for active yield positions. APR changes as pool utilization, liquidity depth, and token emissions change. What was 15% APY last month may be 8% APY today. Stale APY figures lead to poor capital allocation decisions.`,
      `Keep a record of the APY at the time you entered each yield position. Compare this to the actual return realized when you exit. Persistent underperformance versus stated APY often indicates a problem with the compounding mechanism or unexpected fee deductions.`
      ],
      validation: [
      `Check the APR-to-APY conversion: for 12% APR daily compounded: APY = (1 + 0.12/365)^365 − 1 = 12.7475%. The calculator should match this to 4 decimal places.`,
      `Verify the reverse: for 12.7475% APY daily compounded, APR = 365 × ((1 + 0.127475)^(1/365) − 1) = 12.00%. If the calculator's round-trip conversion deviates by more than 0.01%, there is a rounding error in the implementation.`
      ],
    },
    es: {
      interpret: [
      `APR (Tasa de Porcentaje Anual) es la tasa de interés simple sin capitalización. APY (Rendimiento de Porcentaje Anual) incluye el efecto de la capitalización — reinvertir los rendimientos de vuelta en el principal.`,
      `La frecuencia de capitalización importa más con tasas altas. A un 5% de APR, la capitalización diaria vs. mensual produce solo ≈0.06% de APY adicional.`
      ],
      scenarios: [
      `Comparación de fuentes de rendimiento: al comparar staking (típicamente cotizado como APY) vs. protocolos de préstamo (típicamente APR), convierte ambos a la misma métrica usando este calculador.`,
      `Planificación de estrategia de capitalización: introduce el APR de tu protocolo y prueba diferentes frecuencias de capitalización.`
      ],
      checklist: [
      `Antes de comparar rendimientos: 1) Confirma si cada protocolo cotiza APR o APY. 2) Comprueba la frecuencia de capitalización para las cotizaciones de APY. 3) Considera los costes de gas al calcular el APY efectivo.`,
      `Después de convertir: usa la cifra APY para todas las comparaciones a largo plazo y la cifra APR para comparaciones a corto plazo (menos de 30 días).`
      ],
      mistakes: [
      `Asumir que todos los protocolos citan la misma métrica. Los protocolos DeFi mezclan frecuentemente APR y APY en el mismo panel.`,
      `Aplicar la fórmula APY a un protocolo que no capitaliza automáticamente.`
      ],
      benchmarks: [
      `Rangos de referencia: rendimiento estable de protocolos blue-chip es típicamente 2–8% APY en stablecoins. Las oportunidades de alto rendimiento (20–100%+ APY) conllevan un riesgo proporcionalmente mayor.`,
      `Un 10% APY de un pool de stablecoins equivale a aproximadamente 9.53% APR con capitalización diaria.`
      ],
      execution: [
      `Flujo de trabajo de comparación sistemática: 1) Lista todas las fuentes de rendimiento en consideración. 2) Registra si cada una cita APR o APY y la frecuencia de capitalización. 3) Convierte todas a APY usando este calculador. 4) Clasifica por APY. 5) Ajusta por riesgo antes de asignar capital.`,
      `Para bóvedas de capitalización automática: verifica que el APY reportado de la bóveda coincida con el resultado de la fórmula para el APR subyacente y el intervalo de capitalización.`
      ],
      hygiene: [
      `Vuelve a ejecutar este cálculo mensualmente para posiciones de rendimiento activas.`,
      `Mantén un registro del APY en el momento en que entraste en cada posición de rendimiento.`
      ],
      validation: [
      `Comprueba la conversión de APR a APY: para 12% APR capitalizado diariamente: APY = (1 + 0.12/365)^365 − 1 = 12.7475%.`,
      `Verifica el inverso para comprobar que la conversión de ida y vuelta del calculador no se desvía más de 0.01%.`
      ],
    },
    pt: {
      interpret: [
      `APR (Taxa Percentual Anual) é a taxa de juros simples sem capitalização. APY (Rendimento Percentual Anual) inclui o efeito da capitalização — reinvestindo os retornos de volta no principal.`,
      `A frequência de capitalização importa mais em taxas altas.`
      ],
      scenarios: [
      `Comparação de fontes de rendimento: ao comparar staking (tipicamente cotado como APY) vs. protocolos de empréstimo (tipicamente APR), converta ambos para a mesma métrica usando esta calculadora.`,
      `Planejamento de estratégia de capitalização: insira o APR do seu protocolo e teste diferentes frequências de capitalização.`
      ],
      checklist: [
      `Antes de comparar rendimentos: 1) Confirme se cada protocolo cita APR ou APY. 2) Verifique a frequência de capitalização para cotações de APY. 3) Considere os custos de gás ao calcular o APY efetivo.`,
      `Após converter: use a cifra APY para todas as comparações de longo prazo.`
      ],
      mistakes: [
      `Assumir que todos os protocolos citam a mesma métrica.`,
      `Aplicar a fórmula APY a um protocolo que não capitaliza automaticamente.`
      ],
      benchmarks: [
      `Faixas de referência: rendimento estável de protocolos blue-chip é tipicamente 2–8% APY em stablecoins.`,
      `Um APY de 10% de um pool de stablecoins equivale a aproximadamente 9.53% APR com capitalização diária.`
      ],
      execution: [
      `Fluxo de trabalho de comparação sistemática: 1) Liste todas as fontes de rendimento em consideração. 2) Registre se cada uma cita APR ou APY. 3) Converta todas para APY. 4) Classifique por APY. 5) Ajuste pelo risco antes de alocar capital.`,
      `Para vaults de capitalização automática: verifique se o APY reportado corresponde à saída da fórmula para o APR subjacente.`
      ],
      hygiene: [
      `Execute novamente este cálculo mensalmente para posições de rendimento ativas.`,
      `Mantenha um registro do APY no momento em que entrou em cada posição de rendimento.`
      ],
      validation: [
      `Verifique a conversão de APR para APY: para 12% APR capitalizado diariamente: APY = 12.7475%.`,
      `Verifique o inverso para confirmar que a conversão de ida e volta não desvia mais de 0.01%.`
      ],
    },
    tr: {
      interpret: [
      `APR (Yıllık Yüzde Oranı), bileşiksiz basit faiz oranıdır. APY (Yıllık Yüzde Getirisi), bileşik faiz etkisini içerir.`,
      `Bileşik faiz sıklığı en çok yüksek oranlarda önemlidir.`
      ],
      scenarios: [
      `Getiri kaynağı karşılaştırması: staking (tipik olarak APY olarak kotasyonlanır) ile borç verme protokollerini (tipik olarak APR) karşılaştırırken, bu hesaplayıcıyı kullanarak ikisini aynı metriğe dönüştürün.`,
      `Bileşik strateji planlaması: protokolünüzün APR'sini girin ve farklı bileşik sıklıklarını test edin.`
      ],
      checklist: [
      `Getirileri karşılaştırmadan önce: 1) Her protokolün APR mi yoksa APY mi kotasyonladığını onaylayın. 2) APY kotasyonları için bileşik sıklığını kontrol edin. 3) Efektif APY hesaplanırken gaz maliyetlerini göz önünde bulundurun.`,
      `Dönüştürdükten sonra: tüm uzun vadeli karşılaştırmalar için APY rakamını kullanın.`
      ],
      mistakes: [
      `Tüm protokollerin aynı metriği kotasyonladığını varsaymak.`,
      `APY formülünü otomatik olarak bileşik faiz uygulamayan bir protokole uygulamak.`
      ],
      benchmarks: [
      `Referans aralıkları: blue-chip protokollerden (Aave, Compound) kararlı getiri, stablecoin'lerde tipik olarak %2–8 APY'dir.`,
      `Bir stablecoin havuzundan %10 APY, günlük bileşik faizle yaklaşık %9.53 APR'ye eşittir.`
      ],
      execution: [
      `Sistematik karşılaştırma iş akışı: 1) Değerlendirmedeki tüm getiri kaynaklarını listeleyin. 2) Her birinin APR mi yoksa APY mi kotasyonladığını ve bileşik sıklığını kaydedin. 3) Tümünü bu hesaplayıcıyı kullanarak APY'ye dönüştürün.`,
      `Otomatik bileşik kasalar için: kasanın bildirilen APY'sinin temel APR ve bileşik aralığı için formül çıktısıyla eşleştiğini doğrulayın.`
      ],
      hygiene: [
      `Aktif getiri pozisyonları için bu hesaplamayı aylık olarak yeniden çalıştırın.`,
      `Her getiri pozisyonuna girdiğiniz andaki APY'nin kaydını tutun.`
      ],
      validation: [
      `APR'den APY'ye dönüşümü kontrol edin: günlük bileşik faizli %12 APR için: APY = %12.7475.`,
      `Hesaplayıcının gidiş-dönüş dönüşümünün %0.01'den fazla sapmaması için tersi doğrulayın.`
      ],
    },
    hi: {
      interpret: [
      `APR (वार्षिक प्रतिशत दर) बिना चक्रवृद्धि के साधारण ब्याज दर है। APY (वार्षिक प्रतिशत उपज) में चक्रवृद्धि का प्रभाव शामिल है।`,
      `चक्रवृद्धि आवृत्ति उच्च दरों पर सबसे अधिक मायने रखती है।`
      ],
      scenarios: [
      `उपज स्रोत तुलना: स्टेकिंग (आमतौर पर APY के रूप में उद्धृत) बनाम ऋण प्रोटोकॉल (आमतौर पर APR) की तुलना करते समय, इस कैलकुलेटर का उपयोग करके दोनों को एक ही मेट्रिक में परिवर्तित करें।`,
      `चक्रवृद्धि रणनीति योजना: अपने प्रोटोकॉल का APR दर्ज करें और विभिन्न चक्रवृद्धि आवृत्तियों का परीक्षण करें।`
      ],
      checklist: [
      `उपज की तुलना करने से पहले: 1) पुष्टि करें कि प्रत्येक प्रोटोकॉल APR या APY उद्धृत करता है। 2) APY उद्धरणों के लिए चक्रवृद्धि आवृत्ति जांचें। 3) प्रभावी APY की गणना करते समय गैस लागत के लिए खाता करें।`,
      `परिवर्तित करने के बाद: सभी दीर्घकालिक तुलनाओं के लिए APY आंकड़े का उपयोग करें।`
      ],
      mistakes: [
      `यह मानना कि सभी प्रोटोकॉल एक ही मेट्रिक उद्धृत करते हैं।`,
      `APY फॉर्मूला एक ऐसे प्रोटोकॉल पर लागू करना जो स्वतः चक्रवृद्धि नहीं करता।`
      ],
      benchmarks: [
      `संदर्भ सीमाएं: blue-chip प्रोटोकॉल से स्थिर उपज आमतौर पर स्टेबलकॉइन पर 2–8% APY है।`,
      `स्टेबलकॉइन पूल से 10% APY दैनिक चक्रवृद्धि के साथ लगभग 9.53% APR के बराबर है।`
      ],
      execution: [
      `व्यवस्थित तुलना वर्कफ़्लो: 1) विचार की जा रही सभी उपज स्रोतों की सूची बनाएं। 2) रिकॉर्ड करें कि प्रत्येक APR या APY उद्धृत करता है। 3) इस कैलकुलेटर का उपयोग करके सभी को APY में परिवर्तित करें। 4) APY द्वारा रैंक करें।`,
      `स्वतः-चक्रवृद्धि वॉल्ट के लिए: सत्यापित करें कि वॉल्ट का रिपोर्ट किया गया APY मूल APR और चक्रवृद्धि अंतराल के लिए फॉर्मूला आउटपुट से मेल खाता है।`
      ],
      hygiene: [
      `सक्रिय उपज पोजीशन के लिए इस गणना को मासिक रूप से पुनः चलाएं।`,
      `प्रत्येक उपज पोजीशन में प्रवेश के समय APY का रिकॉर्ड रखें।`
      ],
      validation: [
      `APR-से-APY रूपांतरण जांचें: दैनिक चक्रवृद्धि के साथ 12% APR के लिए: APY = 12.7475%।`,
      `गोल-ट्रिप रूपांतरण 0.01% से अधिक विचलित नहीं होने की पुष्टि करने के लिए उलटा सत्यापित करें।`
      ],
    },
    ru: {
      interpret: [
      `APR (Годовая процентная ставка) — это простая процентная ставка без начисления сложных процентов. APY (Годовая процентная доходность) включает эффект компаундирования — реинвестирования доходов обратно в основную сумму. Формула: APY = (1 + APR/n)^n − 1, где n — количество периодов начисления в год.`,
      `Частота компаундирования наиболее важна при высоких ставках. При 5% APR суточное vs. ежемесячное компаундирование даёт лишь ≈0.06% дополнительного APY. При 50% APR разница уже ≈1.5%.`
      ],
      scenarios: [
      `Сравнение источников доходности: при сравнении стейкинга (обычно цитируется как APY) и протоколов кредитования (обычно APR) конвертируйте оба в одну метрику с помощью этого калькулятора.`,
      `Планирование стратегии компаундирования: введите APR вашего протокола и протестируйте разные частоты компаундирования. Рассчитайте, перевешивает ли преимущество компаундирования стоимость газа.`
      ],
      checklist: [
      `Перед сравнением доходностей: 1) Уточните, цитирует ли каждый протокол APR или APY. 2) Проверьте частоту компаундирования для цитат APY. 3) Учитывайте стоимость газа при расчёте эффективного APY.`,
      `После конвертации: используйте показатель APY для всех долгосрочных сравнений.`
      ],
      mistakes: [
      `Предположение, что все протоколы цитируют одну и ту же метрику. DeFi-протоколы часто смешивают APR и APY на одном дашборде.`,
      `Применение формулы APY к протоколу, который не делает автокомпаундинг.`
      ],
      benchmarks: [
      `Референсные диапазоны: стабильная доходность от blue-chip протоколов (Aave, Compound) обычно составляет 2–8% APY по стейблкоинам. Высокодоходные возможности (20–100%+ APY) несут пропорционально более высокий риск.`,
      `10% APY от пула стейблкоинов равны примерно 9.53% APR при ежедневном компаундировании.`
      ],
      execution: [
      `Систематический процесс сравнения: 1) Перечислите все рассматриваемые источники доходности. 2) Зафиксируйте, цитирует ли каждый APR или APY и частоту компаундирования. 3) Конвертируйте все в APY с помощью калькулятора. 4) Ранжируйте по APY. 5) Скорректируйте на риск перед распределением капитала.`,
      `Для хранилищ с автокомпаундингом: проверьте, соответствует ли указанный APY формульному выводу для базового APR и интервала компаундирования.`
      ],
      hygiene: [
      `Ежемесячно пересчитывайте для активных позиций с доходностью. APR меняется по мере изменения загрузки пула, глубины ликвидности и выбросов токенов.`,
      `Ведите запись APY на момент входа в каждую доходную позицию. Сравнивайте с фактическим доходом при выходе.`
      ],
      validation: [
      `Проверьте конвертацию APR→APY: для 12% APR с ежедневным начислением: APY = 12.7475%. Калькулятор должен совпасть с точностью до 4 знаков после запятой.`,
      `Проверьте обратную конвертацию: для APY 12.7475% APR = 12.00%. Расхождение более 0.01% указывает на ошибку округления.`
      ],
    },
  },
  'yield-farming-calculator': {
    en: {
      interpret: [
      `The yield farming output shows total projected return combining trading fee income, protocol token emissions (farmed rewards), and any additional liquidity mining bonuses. The critical distinction is between sustainable yield (trading fees, which persist as long as the pool has volume) and emission-based yield (protocol token rewards, which depend on the protocol's token having positive price trajectory). High APY from emissions can vanish if the reward token price drops, which often coincides with farm saturation.`,
      `The impermanent loss estimate is the most important offsetting factor. If the two pooled assets diverge in price, IL erodes your principal. At high emission APYs (50%+), IL is often overlooked but can be substantial — a 4× price ratio difference produces ≈20% IL that eliminates 73 days of farming at 10% APY. Always view the net farming yield (APY − IL rate) as the realistic return.`
      ],
      scenarios: [
      `New farm evaluation: when a new farm launches with high initial APY, enter the current APY, expected IL for the token pair, and an estimated holding period. Project the return assuming APY compresses 50% and 80% over the holding period (which typically happens as TVL grows). The resulting compressed APY should still exceed IL + gas costs to justify entry.`,
      `Exit timing calculator: as a farm matures and APY declines, recalculate weekly: compare current net APY (fees + rewards − IL rate) against the opportunity cost of capital in an alternative position. When your farm's net APY drops below 10–15%, rotating to a new or better opportunity is often rational.`
      ],
      checklist: [
      `Before entering a yield farm: 1) Identify the source of yield — is it trading fees, token emissions, or both? 2) Check the reward token's market cap and circulating supply — high emissions on a low-cap token create selling pressure that can rapidly deflate the token's price. 3) Verify the smart contract has been audited by a reputable security firm.`,
      `After calculating net APY: run the IL calculator for the same token pair to get the combined view. If net yield after IL is under 15% APY, the risk/reward of farming this pair is rarely justified versus safer alternatives.`
      ],
      mistakes: [
      `Chasing the highest APY farms without understanding the source. Unsustainably high APYs (500%+) almost always rely on aggressive token emissions. Early entrants profit; late entrants (who see the high APY) typically enter when the token is near peak emission and sell pressure subsequently crashes both the reward token and the underlying farm APY.`,
      `Ignoring gas costs for small farms. On Ethereum mainnet, claiming and reinvesting rewards costs $10–50+ in gas per transaction. If your farm generates $5/day in rewards and reinvesting costs $30 in gas, you are net negative on compounding. Either farm with larger capital (>$10,000 for Ethereum mainnet to justify daily compounding) or use L2/alternative chains with lower gas.`
      ],
      benchmarks: [
      `Sustainable yield farming benchmarks: fee-only (no emissions) pools on major DEXes generate 5–30% APY for volatile pairs and 1–5% for stablecoin pairs. Adding emissions can temporarily boost this by 2–5× before the emission schedule creates sell pressure. Any APY above 50% should be treated as temporary and modeled at 10–20% for your long-term projection.`,
      `Net farming APY (after gas and IL) of 15–25% in a stable farming environment is considered strong performance. If your calculation shows net APY below 10% after accounting for all costs, the capital is better deployed in simpler strategies like lending protocols or staking.`
      ],
      execution: [
      `Farm entry workflow: 1) Check pool TVL trend (rising = APY compressing soon, falling = APY rising but risk of exodus). 2) Calculate IL for worst-case price scenario using the IL calculator. 3) Enter farm APY into this calculator with expected holding period. 4) Subtract IL estimate from projected yield. 5) Only enter if net return beats your hurdle rate (typically 15% APY for a risky farm).`,
      `Reward compounding: if the reward token is the same as one of your pooled assets, compounding rewards back into the pool amplifies both gains and IL. If the reward token is a separate governance token, consider whether to hold, sell, or compound separately — selling rewards immediately into stablecoins is the most conservative approach.`
      ],
      hygiene: [
      `Track your farming position daily during the first week to catch any smart contract issues early. Unusual TVL drops (>20% in a day) or sudden APY spikes (indicating exodus) are early warning signs of farm problems.`,
      `Recalculate net APY weekly and compare to the initial projection. Farms typically show APY compression of 30–70% in the first 30 days as capital flows in. If net APY is compressing faster than expected, reevaluate the exit threshold.`
      ],
      validation: [
      `Verify total return estimate: (farming period in days × daily APY / 365) + compounding bonus − IL estimate − gas costs = net return. Each component should be individually verifiable from the pool's analytics dashboard.`,
      `Cross-check the stated farm APY against the raw calculation: (daily reward tokens × reward token price × 365) / total TVL = reward APY. If the farm dashboard shows a different number, check whether bonuses, vesting schedules, or lock-up periods are being included or excluded.`
      ],
    },
    es: {
      interpret: [
      `La salida de yield farming muestra el retorno total proyectado combinando ingresos por comisiones de trading, emisiones de tokens del protocolo y cualquier bono adicional de minería de liquidez.`,
      `La estimación de pérdida impermanente es el factor de compensación más importante.`
      ],
      scenarios: [
      `Evaluación de nueva granja: cuando se lanza una nueva granja con alto APY inicial, introduce el APY actual, la IL esperada para el par de tokens y un período de tenencia estimado.`,
      `Calculador de tiempo de salida: a medida que una granja madura y el APY disminuye, recalcula semanalmente.`
      ],
      checklist: [
      `Antes de entrar en una granja de rendimiento: 1) Identifica la fuente de rendimiento. 2) Comprueba la capitalización de mercado del token de recompensa y el suministro circulante. 3) Verifica que el contrato inteligente haya sido auditado.`,
      `Después de calcular el APY neto: ejecuta el calculador de IL para el mismo par de tokens para obtener la visión combinada.`
      ],
      mistakes: [
      `Perseguir las granjas con el APY más alto sin entender la fuente.`,
      `Ignorar los costes de gas para granjas pequeñas.`
      ],
      benchmarks: [
      `Benchmarks sostenibles de yield farming: pools sin emisiones en DEXes principales generan 5–30% APY para pares volátiles y 1–5% para pares de stablecoins.`,
      `Un APY neto de farming (después de gas e IL) del 15–25% en un entorno de farming estable se considera un rendimiento fuerte.`
      ],
      execution: [
      `Flujo de trabajo de entrada a la granja: 1) Comprueba la tendencia del TVL del pool. 2) Calcula la IL para el escenario de precio en el peor caso. 3) Introduce el APY de la granja en este calculador con el período de tenencia esperado. 4) Resta la estimación de IL del rendimiento proyectado.`,
      `Capitalización de recompensas: si el token de recompensa es el mismo que uno de tus activos agrupados, capitalizar las recompensas de vuelta al pool amplifica tanto las ganancias como la IL.`
      ],
      hygiene: [
      `Rastrea tu posición de farming diariamente durante la primera semana para detectar cualquier problema de contrato inteligente temprano.`,
      `Recalcula el APY neto semanalmente y compáralo con la proyección inicial.`
      ],
      validation: [
      `Verifica la estimación total de retorno: (período de farming en días × APY diario / 365) + bono de capitalización − estimación de IL − costes de gas = retorno neto.`,
      `Verifica el APY de la granja declarado con el cálculo bruto.`
      ],
    },
    pt: {
      interpret: [
      `A saída de yield farming mostra o retorno total projetado combinando receita de taxas de negociação, emissões de tokens do protocolo e quaisquer bônus adicionais de mineração de liquidez.`,
      `A estimativa de perda impermanente é o fator de compensação mais importante.`
      ],
      scenarios: [
      `Avaliação de nova fazenda: quando uma nova fazenda é lançada com alto APY inicial, insira o APY atual, a IL esperada para o par de tokens e um período de manutenção estimado.`,
      `Calculadora de tempo de saída: à medida que uma fazenda amadurece e o APY diminui, recalcule semanalmente.`
      ],
      checklist: [
      `Antes de entrar em uma fazenda de rendimento: 1) Identifique a fonte de rendimento. 2) Verifique a capitalização de mercado do token de recompensa. 3) Verifique se o contrato inteligente foi auditado.`,
      `Após calcular o APY líquido: execute a calculadora de IL para o mesmo par de tokens.`
      ],
      mistakes: [
      `Perseguir as fazendas com o APY mais alto sem entender a fonte.`,
      `Ignorar os custos de gás para fazendas pequenas.`
      ],
      benchmarks: [
      `Benchmarks sustentáveis de yield farming: pools sem emissões em DEXes principais geram 5–30% APY para pares voláteis e 1–5% para pares de stablecoins.`,
      `Um APY líquido de farming (após gás e IL) de 15–25% em um ambiente de farming estável é considerado forte desempenho.`
      ],
      execution: [
      `Fluxo de trabalho de entrada na fazenda: 1) Verifique a tendência de TVL do pool. 2) Calcule a IL para o pior cenário de preço. 3) Insira o APY da fazenda nesta calculadora com o período de manutenção esperado. 4) Subtraia a estimativa de IL do rendimento projetado.`,
      `Capitalização de recompensas: se o token de recompensa for o mesmo que um dos seus ativos agrupados, capitalizar as recompensas de volta ao pool amplifica tanto os ganhos quanto a IL.`
      ],
      hygiene: [
      `Acompanhe sua posição de farming diariamente durante a primeira semana.`,
      `Recalcule o APY líquido semanalmente e compare com a projeção inicial.`
      ],
      validation: [
      `Verifique a estimativa de retorno total: (período de farming em dias × APY diário / 365) + bônus de capitalização − estimativa de IL − custos de gás = retorno líquido.`,
      `Verifique o APY declarado da fazenda com o cálculo bruto.`
      ],
    },
    tr: {
      interpret: [
      `Yield farming çıktısı, trading ücret geliri, protokol token emisyonları ve ek likidite madenciliği bonuslarını birleştiren toplam tahmini getiriyi gösterir.`,
      `Kalıcı olmayan kayıp tahmini en önemli dengeleyici faktördür.`
      ],
      scenarios: [
      `Yeni çiftlik değerlendirmesi: yüksek başlangıç APY'siyle yeni bir çiftlik başladığında mevcut APY'yi, token çifti için beklenen IL'yi ve tahmini bir elde tutma süresini girin.`,
      `Çıkış zamanlaması hesaplayıcısı: bir çiftlik olgunlaştıkça ve APY düştükçe haftalık olarak yeniden hesaplayın.`
      ],
      checklist: [
      `Bir yield çiftliğine girmeden önce: 1) Getiri kaynağını belirleyin. 2) Ödül tokeninin piyasa değerini ve dolaşımdaki arzını kontrol edin. 3) Akıllı sözleşmenin denetlendiğini doğrulayın.`,
      `Net APY'yi hesapladıktan sonra: kombine görünümü elde etmek için aynı token çifti için IL hesaplayıcısını çalıştırın.`
      ],
      mistakes: [
      `Kaynağı anlamadan en yüksek APY çiftliklerini kovalamak.`,
      `Küçük çiftlikler için gaz maliyetlerini görmezden gelmek.`
      ],
      benchmarks: [
      `Sürdürülebilir yield farming kıyaslamaları: büyük DEX'lerdeki emisyonsuz havuzlar, değişken çiftler için %5–30 APY ve stablecoin çiftleri için %1–5 üretir.`,
      `Stabil bir farming ortamında (gaz ve IL sonrası) %15–25 net farming APY güçlü performans olarak kabul edilir.`
      ],
      execution: [
      `Çiftlik girişi iş akışı: 1) Havuz TVL trendini kontrol edin. 2) En kötü fiyat senaryosu için IL hesaplayın. 3) Beklenen elde tutma süresiyle çiftlik APY'sini bu hesaplayıcıya girin. 4) IL tahminini tahmini getiriden çıkarın.`,
      `Ödül bileşiği: ödül tokeni havuzlanmış varlıklarınızdan biriyle aynıysa, ödülleri havuza geri bileştirmek hem kazanımları hem de IL'yi büyütür.`
      ],
      hygiene: [
      `İlk hafta boyunca farming pozisyonunuzu günlük olarak takip edin.`,
      `Net APY'yi haftalık olarak yeniden hesaplayın ve başlangıç projeksiyonuyla karşılaştırın.`
      ],
      validation: [
      `Toplam getiri tahminini doğrulayın: (gün cinsinden farming süresi × günlük APY / 365) + bileşik bonusu − IL tahmini − gaz maliyetleri = net getiri.`,
      `Belirtilen çiftlik APY'sini ham hesaplamayla çapraz kontrol edin.`
      ],
    },
    hi: {
      interpret: [
      `यील्ड फार्मिंग आउटपुट ट्रेडिंग शुल्क आय, प्रोटोकॉल टोकन उत्सर्जन और किसी भी अतिरिक्त लिक्विडिटी माइनिंग बोनस को मिलाकर कुल अनुमानित रिटर्न दिखाता है।`,
      `अनित्य हानि अनुमान सबसे महत्वपूर्ण ऑफसेटिंग कारक है।`
      ],
      scenarios: [
      `नए फार्म का मूल्यांकन: जब उच्च प्रारंभिक APY के साथ एक नया फार्म लॉन्च होता है, तो वर्तमान APY, टोकन पेयर के लिए अपेक्षित IL और अनुमानित होल्डिंग अवधि दर्ज करें।`,
      `निकास समय कैलकुलेटर: जैसे-जैसे फार्म परिपक्व होता है और APY कम होता है, साप्ताहिक रूप से पुनः गणना करें।`
      ],
      checklist: [
      `यील्ड फार्म में प्रवेश करने से पहले: 1) उपज का स्रोत पहचानें। 2) रिवार्ड टोकन का मार्केट कैप और सर्कुलेटिंग सप्लाई जांचें। 3) सत्यापित करें कि स्मार्ट कॉन्ट्रैक्ट का ऑडिट किया गया है।`,
      `नेट APY की गणना के बाद: संयुक्त दृश्य पाने के लिए उसी टोकन पेयर के लिए IL कैलकुलेटर चलाएं।`
      ],
      mistakes: [
      `स्रोत को समझे बिना उच्चतम APY फार्म का पीछा करना।`,
      `छोटे फार्म के लिए गैस लागत को नजरअंदाज करना।`
      ],
      benchmarks: [
      `टिकाऊ यील्ड फार्मिंग बेंचमार्क: प्रमुख DEX पर एमिशन-रहित पूल अस्थिर जोड़ों के लिए 5–30% APY और स्टेबलकॉइन जोड़ों के लिए 1–5% उत्पन्न करते हैं।`,
      `एक स्थिर फार्मिंग वातावरण में (गैस और IL के बाद) 15–25% नेट फार्मिंग APY मजबूत प्रदर्शन माना जाता है।`
      ],
      execution: [
      `फार्म प्रवेश वर्कफ़्लो: 1) पूल TVL ट्रेंड जांचें। 2) सबसे खराब मूल्य परिदृश्य के लिए IL की गणना करें। 3) अपेक्षित होल्डिंग अवधि के साथ इस कैलकुलेटर में फार्म APY दर्ज करें। 4) अनुमानित उपज से IL अनुमान घटाएं।`,
      `रिवार्ड चक्रवृद्धि: यदि रिवार्ड टोकन आपके पूल किए गए संपत्तियों में से एक के समान है, तो रिवार्ड को पूल में वापस चक्रवृद्धि करने से लाभ और IL दोनों बढ़ जाते हैं।`
      ],
      hygiene: [
      `किसी भी स्मार्ट कॉन्ट्रैक्ट समस्या को जल्दी पकड़ने के लिए पहले सप्ताह के दौरान दैनिक रूप से अपनी फार्मिंग पोजीशन ट्रैक करें।`,
      `नेट APY की साप्ताहिक पुनः गणना करें और प्रारंभिक अनुमान से तुलना करें।`
      ],
      validation: [
      `कुल रिटर्न अनुमान सत्यापित करें: (दिनों में फार्मिंग अवधि × दैनिक APY / 365) + चक्रवृद्धि बोनस − IL अनुमान − गैस लागत = नेट रिटर्न।`,
      `कच्ची गणना के साथ घोषित फार्म APY को क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Вывод yield farming показывает общий прогнозируемый доход, объединяющий доход от торговых комиссий, выбросы токенов протокола и любые дополнительные бонусы за добычу ликвидности. Критически важное различие: устойчивый доход (торговые комиссии) vs. доход от эмиссии (токены наград, зависящие от цены).`,
      `Оценка непостоянных потерь — наиболее важный компенсирующий фактор. При высоких APY от эмиссий (50%+) IL часто игнорируется, но может быть существенной — расхождение цен в 4× даёт ≈20% IL, что уничтожает 73 дня фарминга при 10% APY.`
      ],
      scenarios: [
      `Оценка нового фарма: когда запускается новый фарм с высоким начальным APY, введите текущий APY, ожидаемые IL для пары токенов и примерный период удержания. Спроектируйте доход при сжатии APY на 50% и 80%.`,
      `Калькулятор времени выхода: по мере созревания фарма и снижения APY еженедельно пересчитывайте: сравнивайте текущий чистый APY с альтернативной стоимостью капитала.`
      ],
      checklist: [
      `Перед входом в фарм: 1) Определите источник доходности — торговые комиссии, выбросы токенов или оба. 2) Проверьте рыночную капитализацию токена наград и объём в обращении. 3) Убедитесь, что смарт-контракт прошёл аудит.`,
      `После расчёта чистого APY: запустите калькулятор IL для той же пары токенов. Если чистый доход после IL менее 15% APY, риск/вознаграждение редко оправдывает фарминг.`
      ],
      mistakes: [
      `Погоня за фармами с наивысшим APY без понимания источника. Неустойчивые высокие APY (500%+) почти всегда опираются на агрессивную эмиссию токенов.`,
      `Игнорирование стоимости газа для небольших фармов. На основном Ethereum один клейм и реинвест стоит $10–50+ в газе.`
      ],
      benchmarks: [
      `Устойчивые ориентиры yield farming: пулы без эмиссий на крупных DEX генерируют 5–30% APY для волатильных пар и 1–5% для стейблкоин-пар.`,
      `Чистый APY от фарминга (после газа и IL) 15–25% в стабильной среде считается хорошим результатом.`
      ],
      execution: [
      `Процесс входа в фарм: 1) Проверьте тренд TVL пула. 2) Рассчитайте IL для наихудшего сценария. 3) Введите APY фарма в калькулятор с ожидаемым периодом удержания. 4) Вычтите оценку IL из прогнозируемого дохода. 5) Входите только если чистый доход превышает пороговую ставку (обычно 15% APY).`,
      `Компаундинг наград: если токен награды совпадает с одним из активов в пуле, реинвест наград обратно в пул усиливает как прибыль, так и IL.`
      ],
      hygiene: [
      `Ежедневно отслеживайте позицию фарминга в первую неделю для раннего выявления проблем со смарт-контрактами. Необычные падения TVL (>20% за день) — ранние предупреждающие знаки.`,
      `Еженедельно пересчитывайте чистый APY и сравнивайте с начальным прогнозом. Фармы обычно показывают сжатие APY на 30–70% в первые 30 дней.`
      ],
      validation: [
      `Проверьте оценку общего дохода: (период фарминга в днях × суточный APY / 365) + бонус компаундинга − оценка IL − стоимость газа = чистый доход.`,
      `Сверьте заявленный APY фарма с базовым расчётом: (суточные токены наград × цена токена × 365) / общий TVL = APY от наград.`
      ],
    },
  },
  'gas-calculator': {
    en: {
      interpret: [
      `The gas fee output shows the total transaction cost in both ETH and USD for a given gas limit at the current or specified gas price (in Gwei). The key output to act on is the USD cost — this tells you whether the transaction is economically viable for your intended use. Sending $10 worth of crypto with a $15 gas fee is clearly not rational; paying $5 to bridge $5,000 is reasonable. The ratio of gas fee to transaction value is your efficiency metric.`,
      `The urgency multiplier section shows the gas price premium needed to land in the next 1, 3, or 10 blocks. During network congestion, the priority fee (miner tip) is the primary variable — the base fee is protocol-determined and everyone pays the same base fee in the same block. Adding a higher priority fee increases your probability of being included in the next block but does not change your base fee.`
      ],
      scenarios: [
      `Transaction batching decision: if you have multiple operations to execute, use the gas calculator to compare sending them individually (e.g., 3 × $20 gas = $60 total) versus batching through a multi-call contract ($20 once) or waiting for low-gas periods (Sunday night UTC typically has 50–80% lower gas than weekday peaks). This comparison often reveals significant savings for DeFi power users.`,
      `Bridge cost analysis: before bridging to an L2 or another chain, enter the gas cost of the bridge transaction plus the gas cost on the destination chain to see the full round-trip cost. Compare this against the savings from lower L2 gas for your planned activities to determine the break-even number of L2 transactions that justifies the bridge cost.`
      ],
      checklist: [
      `Before submitting any transaction: 1) Check current gas prices on Etherscan gas tracker or L2fees.info. 2) Identify if this is a time-sensitive transaction (price change dependent) or flexible (can wait for lower gas). 3) For DeFi, check if the protocol supports EIP-2929 gas optimizations. 4) Set a max fee that includes a 20% buffer above current gas for spikes.`,
      `After calculating: if the gas cost exceeds 1% of the transaction value, reconsider transaction timing or consolidate with other operations to reduce the effective gas burden.`
      ],
      mistakes: [
      `Setting max gas fee equal to current gas price with zero priority fee during congestion. Without a priority fee, miners have no incentive to include your transaction over others paying a priority fee — your transaction may be stuck in the mempool for hours or days. Always include at least 1–2 Gwei of priority fee for non-urgent transactions and 2–5 Gwei for urgent ones.`,
      `Not checking gas price before a complex DeFi interaction with a fixed deadline. Limit orders, options expiries, and liquidation thresholds have deadlines. Submitting with low gas during a congestion event means your time-sensitive transaction arrives too late.`
      ],
      benchmarks: [
      `Ethereum gas benchmarks: simple ETH transfer = 21,000 gas; ERC-20 transfer = 45,000–65,000 gas; Uniswap swap = 120,000–200,000 gas; complex DeFi interaction = 300,000–500,000+ gas. At 30 Gwei gas price, a simple transfer costs ≈$1.89 and a complex DeFi tx costs ≈$14–28. At 100 Gwei (peak congestion), multiply by ≈3.3×.`,
      `L2 gas cost benchmarks: Arbitrum and Optimism transactions typically cost $0.10–0.50 for simple transfers and $0.50–2.00 for DeFi operations, making them 10–50× cheaper than Ethereum mainnet at normal gas prices. The break-even point where mainnet is economical is when you are doing 1–2 large, complex transactions per quarter.`
      ],
      execution: [
      `Gas optimization workflow: 1) Check gas tracker (Etherscan, GasNow) for current and historical gas trend. 2) Identify your transaction's urgency (can wait hours? days?). 3) Calculate gas cost at the current price and at a lower gas price (e.g., 25% below current) to quantify your savings from waiting. 4) If savings exceed $5–10, set a gas alert and wait. 5) Submit with appropriate priority fee for your urgency level.`,
      `For batched DeFi operations: use protocols like 1inch Fusion or Uniswap Universal Router that optimize gas by combining multiple steps into a single transaction. Calculate the per-operation gas cost with and without batching using this calculator.`
      ],
      hygiene: [
      `Check gas prices before starting any complex transaction sequence, not during. Gas prices can spike 3–5× within minutes during major market events. Starting a multi-step operation at low gas and seeing it spike mid-sequence can leave you in a partial position.`,
      `For recurring transactions (weekly DCA, weekly claims), identify the historically lowest gas windows for your chain. For Ethereum mainnet, Sunday 00:00–06:00 UTC is typically the cheapest. For BSC, low gas windows are less pronounced but still exist.`
      ],
      validation: [
      `Verify the gas cost calculation: gas limit × gas price (in ETH) = total ETH gas cost. 21,000 gas × 30 Gwei = 21,000 × 30 × 10^-9 ETH = 0.00063 ETH. At $3,000/ETH, this equals $1.89. Match to calculator output — any difference over $0.01 indicates a unit conversion error.`,
      `After submitting a transaction, check the actual gas used (not the gas limit) on Etherscan. Most transactions use 70–95% of the gas limit — the unused portion is refunded. If your transaction is consistently hitting the gas limit (100% used), the limit is set too low and future similar transactions will fail.`
      ],
    },
    es: {
      interpret: [
      `La salida de comisiones de gas muestra el coste total de la transacción tanto en ETH como en USD para un límite de gas dado al precio de gas actual o especificado.`,
      `La sección del multiplicador de urgencia muestra la prima del precio de gas necesaria para incluirse en el próximo 1, 3 o 10 bloques.`
      ],
      scenarios: [
      `Decisión de agrupación de transacciones: si tienes múltiples operaciones a ejecutar, usa el calculador de gas para comparar enviarlas individualmente versus agruparlas o esperar períodos de bajo gas.`,
      `Análisis de coste de puente: antes de hacer puente a una L2 u otra cadena, introduce el coste de gas de la transacción de puente más el coste en la cadena de destino.`
      ],
      checklist: [
      `Antes de enviar cualquier transacción: 1) Comprueba los precios de gas actuales. 2) Identifica si es urgente o flexible. 3) Para DeFi, comprueba si el protocolo soporta optimizaciones de gas EIP-2929. 4) Establece una tarifa máxima con un 20% de margen.`,
      `Después de calcular: si el coste de gas supera el 1% del valor de la transacción, reconsidera el momento o consolida con otras operaciones.`
      ],
      mistakes: [
      `Establecer la comisión máxima de gas igual al precio de gas actual sin tarifa de prioridad durante la congestión.`,
      `No comprobar el precio del gas antes de una interacción DeFi compleja con un plazo fijo.`
      ],
      benchmarks: [
      `Benchmarks de gas de Ethereum: transferencia ETH simple = 21,000 gas; transferencia ERC-20 = 45,000–65,000 gas; intercambio Uniswap = 120,000–200,000 gas; interacción DeFi compleja = 300,000–500,000+ gas.`,
      `Benchmarks de coste de gas L2: las transacciones de Arbitrum y Optimism cuestan típicamente $0.10–0.50 para transferencias simples.`
      ],
      execution: [
      `Flujo de trabajo de optimización de gas: 1) Comprueba el rastreador de gas para la tendencia actual e histórica. 2) Identifica la urgencia de tu transacción. 3) Calcula el coste de gas al precio actual y a un precio más bajo. 4) Si el ahorro supera $5–10, establece una alerta de gas y espera.`,
      `Para operaciones DeFi agrupadas: usa protocolos como 1inch Fusion o Uniswap Universal Router que optimizan el gas.`
      ],
      hygiene: [
      `Comprueba los precios de gas antes de iniciar cualquier secuencia de transacciones complejas, no durante.`,
      `Para transacciones recurrentes, identifica las ventanas de gas históricamente más bajas para tu cadena.`
      ],
      validation: [
      `Verifica el cálculo del coste de gas: límite de gas × precio de gas (en ETH) = coste total de gas ETH.`,
      `Después de enviar una transacción, comprueba el gas real utilizado (no el límite de gas) en Etherscan.`
      ],
    },
    pt: {
      interpret: [
      `A saída de taxas de gás mostra o custo total da transação tanto em ETH quanto em USD para um limite de gás dado ao preço de gás atual ou especificado.`,
      `A seção do multiplicador de urgência mostra o prêmio de preço de gás necessário para ser incluído nos próximos 1, 3 ou 10 blocos.`
      ],
      scenarios: [
      `Decisão de agrupamento de transações: se você tem múltiplas operações a executar, use a calculadora de gás para comparar enviá-las individualmente versus agrupá-las.`,
      `Análise de custo de bridge: antes de fazer bridge para uma L2 ou outra cadeia, insira o custo de gás da transação de bridge mais o custo na cadeia de destino.`
      ],
      checklist: [
      `Antes de enviar qualquer transação: 1) Verifique os preços de gás atuais. 2) Identifique se é urgente ou flexível. 3) Defina uma taxa máxima com 20% de buffer.`,
      `Após calcular: se o custo de gás exceder 1% do valor da transação, reconsidere o momento ou consolide com outras operações.`
      ],
      mistakes: [
      `Definir a taxa máxima de gás igual ao preço atual sem taxa de prioridade durante a congestão.`,
      `Não verificar o preço do gás antes de uma interação DeFi complexa com prazo fixo.`
      ],
      benchmarks: [
      `Benchmarks de gás do Ethereum: transferência ETH simples = 21.000 gás; transferência ERC-20 = 45.000–65.000 gás; swap Uniswap = 120.000–200.000 gás.`,
      `Benchmarks de custo de gás L2: transações Arbitrum e Optimism custam tipicamente $0.10–0.50 para transferências simples.`
      ],
      execution: [
      `Fluxo de trabalho de otimização de gás: 1) Verifique o rastreador de gás. 2) Identifique a urgência da transação. 3) Calcule o custo de gás ao preço atual e a um preço mais baixo. 4) Se a economia superar $5–10, defina um alerta de gás e aguarde.`,
      `Para operações DeFi agrupadas: use protocolos como 1inch Fusion ou Uniswap Universal Router.`
      ],
      hygiene: [
      `Verifique os preços de gás antes de iniciar qualquer sequência de transações complexas, não durante.`,
      `Para transações recorrentes, identifique as janelas de gás historicamente mais baixas para sua cadeia.`
      ],
      validation: [
      `Verifique o cálculo do custo de gás: limite de gás × preço de gás (em ETH) = custo total de gás ETH.`,
      `Após enviar uma transação, verifique o gás real usado no Etherscan.`
      ],
    },
    tr: {
      interpret: [
      `Gaz ücreti çıktısı, belirli bir gaz limiti için mevcut veya belirtilen gaz fiyatında (Gwei cinsinden) hem ETH hem de USD cinsinden toplam işlem maliyetini gösterir.`,
      `Aciliyet çarpanı bölümü, sonraki 1, 3 veya 10 bloğa dahil olmak için gereken gaz fiyatı primini gösterir.`
      ],
      scenarios: [
      `İşlem toplu işleme kararı: yürütülecek birden fazla işlem varsa, bunları ayrı ayrı göndermeyi toplu işlemeyle veya düşük gaz dönemlerini beklemeyle karşılaştırmak için gaz hesaplayıcıyı kullanın.`,
      `Köprü maliyet analizi: bir L2'ye veya başka bir zincire köprü kurmadan önce, köprü işleminin gaz maliyetini artı hedef zincirdeki maliyeti girin.`
      ],
      checklist: [
      `Herhangi bir işlem göndermeden önce: 1) Mevcut gaz fiyatlarını kontrol edin. 2) Acil mi yoksa esnek mi olduğunu belirleyin. 3) %20 tamponlu bir maksimum ücret belirleyin.`,
      `Hesapladıktan sonra: gaz maliyeti işlem değerinin %1'ini aşıyorsa, zamanlamayı yeniden değerlendirin.`
      ],
      mistakes: [
      `Yoğunluk sırasında öncelik ücreti olmadan maksimum gaz ücretini mevcut gaz fiyatına eşit olarak ayarlamak.`,
      `Sabit son tarihli karmaşık bir DeFi etkileşiminden önce gaz fiyatını kontrol etmemek.`
      ],
      benchmarks: [
      `Ethereum gaz kıyaslamaları: basit ETH transferi = 21.000 gaz; ERC-20 transferi = 45.000–65.000 gaz; Uniswap swap = 120.000–200.000 gaz.`,
      `L2 gaz maliyet kıyaslamaları: Arbitrum ve Optimism işlemleri basit transferler için genellikle 0.10–0.50 dolara mal olur.`
      ],
      execution: [
      `Gaz optimizasyon iş akışı: 1) Mevcut ve geçmiş gaz trendini görmek için gaz izleyicisini kontrol edin. 2) İşleminizin aciliyetini belirleyin. 3) Gaz maliyetini mevcut fiyatta ve daha düşük bir fiyatta hesaplayın. 4) Tasarruf 5–10 doları aşıyorsa, gaz uyarısı ayarlayın ve bekleyin.`,
      `Toplu DeFi işlemleri için: birden fazla adımı tek bir işlemde birleştiren 1inch Fusion veya Uniswap Universal Router gibi protokoller kullanın.`
      ],
      hygiene: [
      `Herhangi bir karmaşık işlem dizisine başlamadan önce gaz fiyatlarını kontrol edin, sırasında değil.`,
      `Yinelenen işlemler için, zinciriniz için tarihsel olarak en düşük gaz pencerelerini belirleyin.`
      ],
      validation: [
      `Gaz maliyet hesaplamasını doğrulayın: gaz limiti × gaz fiyatı (ETH cinsinden) = toplam ETH gaz maliyeti.`,
      `Bir işlem gönderdikten sonra, Etherscan'da gerçekte kullanılan gazı (gaz limitini değil) kontrol edin.`
      ],
    },
    hi: {
      interpret: [
      `गैस शुल्क आउटपुट किसी दिए गए गैस लिमिट के लिए वर्तमान या निर्दिष्ट गैस मूल्य (Gwei में) पर ETH और USD दोनों में कुल लेनदेन लागत दिखाता है।`,
      `अर्जेंसी मल्टीप्लायर अनुभाग अगले 1, 3 या 10 ब्लॉक में शामिल होने के लिए आवश्यक गैस मूल्य प्रीमियम दिखाता है।`
      ],
      scenarios: [
      `लेनदेन बैचिंग निर्णय: यदि आपके पास निष्पादित करने के लिए कई ऑपरेशन हैं, तो उन्हें व्यक्तिगत रूप से भेजने बनाम बैचिंग या कम गैस अवधियों की प्रतीक्षा करने की तुलना करने के लिए गैस कैलकुलेटर का उपयोग करें।`,
      `ब्रिज लागत विश्लेषण: L2 या किसी अन्य चेन पर ब्रिज करने से पहले, ब्रिज लेनदेन की गैस लागत और गंतव्य चेन पर लागत दर्ज करें।`
      ],
      checklist: [
      `कोई भी लेनदेन सबमिट करने से पहले: 1) वर्तमान गैस मूल्य जांचें। 2) पहचानें कि यह समय-संवेदनशील है या लचीला। 3) 20% बफर के साथ अधिकतम शुल्क सेट करें।`,
      `गणना के बाद: यदि गैस लागत लेनदेन मूल्य के 1% से अधिक है, तो समय पर पुनर्विचार करें।`
      ],
      mistakes: [
      `भीड़ के दौरान शून्य प्राथमिकता शुल्क के साथ अधिकतम गैस शुल्क वर्तमान गैस मूल्य के बराबर सेट करना।`,
      `निश्चित समय सीमा के साथ जटिल DeFi इंटरैक्शन से पहले गैस मूल्य न जांचना।`
      ],
      benchmarks: [
      `Ethereum गैस बेंचमार्क: सरल ETH ट्रांसफर = 21,000 गैस; ERC-20 ट्रांसफर = 45,000–65,000 गैस; Uniswap स्वैप = 120,000–200,000 गैस।`,
      `L2 गैस लागत बेंचमार्क: Arbitrum और Optimism लेनदेन आमतौर पर सरल ट्रांसफर के लिए $0.10–0.50 लागत करते हैं।`
      ],
      execution: [
      `गैस अनुकूलन वर्कफ़्लो: 1) वर्तमान और ऐतिहासिक गैस ट्रेंड के लिए गैस ट्रैकर जांचें। 2) अपने लेनदेन की अर्जेंसी पहचानें। 3) वर्तमान मूल्य और कम मूल्य पर गैस लागत की गणना करें। 4) यदि बचत $5–10 से अधिक है, तो गैस अलर्ट सेट करें और प्रतीक्षा करें।`,
      `बैच किए गए DeFi ऑपरेशन के लिए: 1inch Fusion या Uniswap Universal Router जैसे प्रोटोकॉल का उपयोग करें।`
      ],
      hygiene: [
      `किसी भी जटिल लेनदेन अनुक्रम शुरू करने से पहले गैस मूल्य जांचें, इसके दौरान नहीं।`,
      `आवर्ती लेनदेन के लिए, अपनी चेन के लिए ऐतिहासिक रूप से सबसे कम गैस विंडो पहचानें।`
      ],
      validation: [
      `गैस लागत गणना सत्यापित करें: गैस लिमिट × गैस मूल्य (ETH में) = कुल ETH गैस लागत।`,
      `लेनदेन सबमिट करने के बाद, Etherscan पर वास्तव में उपयोग किया गया गैस (गैस लिमिट नहीं) जांचें।`
      ],
    },
    ru: {
      interpret: [
      `Вывод расходов на газ показывает общую стоимость транзакции как в ETH, так и в USD для заданного газового лимита при текущей или указанной цене газа (в Gwei). Ключевой показатель — стоимость в USD: он определяет, экономически ли оправдана транзакция для вашего использования.`,
      `Раздел множителя срочности показывает ценовую надбавку за газ, необходимую для включения в следующий 1, 3 или 10 блок. Во время перегруженности сети приоритетный сбор (чаевые майнеру) — главная переменная.`
      ],
      scenarios: [
      `Решение о пакетировании транзакций: при наличии нескольких операций для выполнения используйте калькулятор газа для сравнения отдельных транзакций (например, 3 × $20 газа = $60) vs. пакетирования через мультиколл-контракт ($20 один раз) или ожидания периодов низкого газа.`,
      `Анализ стоимости бриджа: перед бриджингом на L2 или другую сеть введите стоимость газа для бридж-транзакции плюс стоимость в сети назначения.`
      ],
      checklist: [
      `Перед отправкой транзакции: 1) Проверьте текущие цены на газ на Etherscan gas tracker. 2) Определите срочность транзакции. 3) Для DeFi проверьте поддержку оптимизаций EIP-2929. 4) Установите максимальный сбор с 20% буфером.`,
      `После расчёта: если стоимость газа превышает 1% от суммы транзакции, пересмотрите время или объедините с другими операциями.`
      ],
      mistakes: [
      `Установка максимального сбора за газ равным текущей цене без приоритетного сбора во время перегрузки. Без приоритетного сбора майнеры не имеют стимула включать вашу транзакцию.`,
      `Игнорирование цены газа перед сложной DeFi-операцией с фиксированным дедлайном.`
      ],
      benchmarks: [
      `Ориентиры по газу Ethereum: простой перевод ETH = 21 000 газа; перевод ERC-20 = 45 000–65 000 газа; своп Uniswap = 120 000–200 000 газа; сложная DeFi-операция = 300 000–500 000+ газа.`,
      `Ориентиры для L2: транзакции Arbitrum и Optimism обычно стоят $0.10–0.50 для простых переводов, что в 10–50× дешевле основного Ethereum при нормальных ценах газа.`
      ],
      execution: [
      `Процесс оптимизации газа: 1) Проверьте трекер газа для текущего и исторического тренда. 2) Определите срочность транзакции. 3) Рассчитайте стоимость при текущей и более низкой цене газа. 4) Если экономия превышает $5–10, установите газовый алерт и подождите.`,
      `Для пакетированных DeFi-операций: используйте протоколы вроде 1inch Fusion или Uniswap Universal Router, объединяющие несколько шагов в одну транзакцию.`
      ],
      hygiene: [
      `Проверяйте цену газа перед началом любой сложной последовательности транзакций, а не в процессе. Цены на газ могут вырасти в 3–5× за несколько минут при крупных рыночных событиях.`,
      `Для регулярных транзакций определите исторически наиболее дешёвые временные окна. Для Ethereum mainnet это обычно воскресенье 00:00–06:00 UTC.`
      ],
      validation: [
      `Проверьте расчёт стоимости газа: газовый лимит × цена газа (в ETH) = общая стоимость газа в ETH. 21 000 газа × 30 Gwei = 0.00063 ETH. При $3 000/ETH = $1.89. Сравните с выводом калькулятора.`,
      `После отправки транзакции проверьте фактически использованный газ (не газовый лимит) на Etherscan. Если транзакция постоянно достигает газового лимита (100%), он установлен слишком низко.`
      ],
    },
  },
  'uniswap-calculator': {
    en: {
      interpret: [
      `The Uniswap fee calculator outputs projected annual fee income for your liquidity position based on your capital, price range (for v3), and pool utilization metrics. The fee income per day is calculated as: (your liquidity share × pool daily volume × fee rate). In concentrated liquidity (v3), your effective fee share within your active range is higher than your nominal pool share — this is the leverage of concentrated liquidity.`,
      `The "in-range vs. out-of-range" status is the most actionable output for v3 positions. When price exits your range, you earn zero fees. Your fee APY is thus an average of the high rate (when in range) and zero (when out of range). For volatile pairs, price exits a ±20% range approximately 30–40% of the time based on historical data — meaning a wide range is often more capital-efficient than a very narrow range for volatile assets.`
      ],
      scenarios: [
      `Range selection optimization: for ETH/USDC, test three range configurations in the calculator: full range (like v2, captures all fees but diluted), ±20% range (moderate concentration), and ±5% range (highest fee rate when in-range, but frequent out-of-range). Compare the blended APY (fee rate × in-range time) to find the sweet spot for your risk tolerance.`,
      `Capital efficiency analysis: enter a $10,000 position in v2 (full range) vs. $10,000 concentrated in a ±15% band in v3. The v3 position earns fees on the equivalent of $30,000–50,000 of capital within its range, effectively providing 3–5× capital efficiency — but earns nothing when price exits. Calculate whether this leverage is worth the management overhead for your pair.`
      ],
      checklist: [
      `Before providing Uniswap v3 liquidity: 1) Verify the pool exists and has sufficient volume (>$500K/day) to generate meaningful fee income. 2) Review the price range's historical in-range percentage using a tool like Revert.finance. 3) Calculate IL for the worst-case scenario within your range.`,
      `After calculating fee income: compare to the fee APY of a simpler position (full range or v2 equivalent) and the IL generated by both. Only choose concentrated ranges if the blended APY (fee × in-range time) significantly exceeds the full-range fee income after accounting for the higher IL risk.`
      ],
      mistakes: [
      `Setting ranges too narrow on volatile pairs (±5% for ETH/BTC) leads to constant out-of-range time and frequent rebalancing gas costs that exceed the fee income. For assets with 5–10% daily volatility, a ±5% range will be out of range 50%+ of the time — halving your effective APY.`,
      `Not accounting for IL when comparing v3 fee income to v2. In a narrow v3 range, IL is amplified proportionally to the concentration factor. A ±10% range with 5× concentration earns 5× more fees but also experiences 5× more IL for the same price movement within the range.`
      ],
      benchmarks: [
      `Realistic fee APY for Uniswap v3 by pair type: ETH/USDC 0.05% tier, ±10% range: 8–25% APY historically. ETH/BTC 0.3% tier, ±15% range: 5–15% APY. Long-tail altcoin/ETH 1% tier, ±30% range: 20–60% APY but high IL risk. Actual returns vary significantly with volume and position management frequency.`,
      `Compare fee income to the cost of managing the position: each range rebalance on Ethereum mainnet costs $20–50+ in gas. If your position earns $50/month in fees but requires monthly rebalancing, your net fee income is $0–30/month. Calculate the number of rebalances your projected fee income can absorb before the position becomes uneconomical.`
      ],
      execution: [
      `LP position setup: 1) Determine fee tier (0.01%, 0.05%, 0.3%, or 1%). 2) Select price range based on historical volatility (use 30-day price chart to estimate plausible range). 3) Enter into the calculator to estimate fee APY at different range widths. 4) Select the range that maximizes fee APY × expected in-range time. 5) Monitor weekly and rebalance when price exits range by >30%.`,
      `For stablecoin pairs (USDC/USDT, USDC/DAI): use 0.01% fee tier and a very tight range (±0.1–0.3% from peg). These pairs rarely deviate from peg; the concentrated liquidity earns extremely high capital efficiency with near-zero IL risk.`
      ],
      hygiene: [
      `Check your v3 position's in-range status daily for volatile pairs. When price exits your range, you are no longer earning fees — the position just holds the token in excess (whichever direction price moved). Decide in advance whether you will rebalance immediately or wait for price to return.`,
      `Track your realized fee income versus projected fee income monthly. Persistent underperformance (>30% below projection) suggests your range is capturing less volume than expected — which may indicate routing preference for different fee tiers or that volume has shifted to aggregators that use alternate pools.`
      ],
      validation: [
      `Verify fee income estimate: your pool share (%) × pool daily volume × fee rate = daily fee income in USD. At $1M daily volume, 1% pool share, 0.3% fee tier: $1,000,000 × 0.01 × 0.003 = $30/day = $10,950/year (31% fee APY on $10,000 position). Cross-check against pool analytics dashboards (Uniswap info, Revert.finance).`,
      `After providing liquidity, compare the calculator's projected daily fee income against actual fees credited to your LP position on the pool dashboard. Consistent shortfalls may indicate accumulated fees are not being displayed (require claiming) or that your position was out of range longer than expected.`
      ],
    },
    es: {
      interpret: [
      `El calculador de comisiones de Uniswap produce ingresos de comisiones anuales proyectados para tu posición de liquidez basándose en tu capital, rango de precios (para v3) y métricas de utilización del pool.`,
      `El estado "dentro-del-rango vs. fuera-del-rango" es la salida más accionable para las posiciones v3.`
      ],
      scenarios: [
      `Optimización de selección de rango: para ETH/USDC, prueba tres configuraciones de rango en el calculador: rango completo, rango ±20% y rango ±5%.`,
      `Análisis de eficiencia de capital: introduce una posición de $10,000 en v2 (rango completo) vs. $10,000 concentrados en una banda ±15% en v3.`
      ],
      checklist: [
      `Antes de proporcionar liquidez en Uniswap v3: 1) Verifica que el pool existe y tiene volumen suficiente. 2) Revisa el porcentaje histórico dentro del rango de precios. 3) Calcula la IL para el peor caso dentro de tu rango.`,
      `Después de calcular los ingresos de comisiones: compara con el APY de comisiones de una posición más sencilla.`
      ],
      mistakes: [
      `Establecer rangos demasiado estrechos en pares volátiles (±5% para ETH/BTC) lleva a tiempo constante fuera del rango.`,
      `No contabilizar la IL al comparar los ingresos de comisiones v3 con v2.`
      ],
      benchmarks: [
      `APY de comisiones realista para Uniswap v3 por tipo de par: ETH/USDC nivel 0.05%, rango ±10%: 8–25% APY históricamente.`,
      `Compara los ingresos de comisiones con el coste de gestionar la posición: cada reequilibrio de rango en Ethereum mainnet cuesta $20–50+ en gas.`
      ],
      execution: [
      `Configuración de posición LP: 1) Determina el nivel de comisión. 2) Selecciona el rango de precios basándote en la volatilidad histórica. 3) Introduce en el calculador para estimar el APY de comisiones. 4) Selecciona el rango que maximiza el APY de comisiones × tiempo esperado dentro del rango.`,
      `Para pares de stablecoins: usa el nivel de comisión del 0.01% y un rango muy estrecho.`
      ],
      hygiene: [
      `Comprueba el estado dentro del rango de tu posición v3 diariamente para pares volátiles.`,
      `Rastrea tus ingresos de comisiones realizados frente a los proyectados mensualmente.`
      ],
      validation: [
      `Verifica la estimación de ingresos de comisiones: tu participación en el pool (%) × volumen diario del pool × tasa de comisión = ingresos de comisiones diarios en USD.`,
      `Después de proporcionar liquidez, compara los ingresos de comisiones diarios proyectados por el calculador con las comisiones reales acreditadas en tu posición LP.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de taxas Uniswap produz renda de taxas anual projetada para sua posição de liquidez com base em seu capital, faixa de preços (para v3) e métricas de utilização do pool.`,
      `O status "dentro-da-faixa vs. fora-da-faixa" é a saída mais acionável para posições v3.`
      ],
      scenarios: [
      `Otimização de seleção de faixa: para ETH/USDC, teste três configurações de faixa na calculadora: faixa completa, faixa ±20% e faixa ±5%.`,
      `Análise de eficiência de capital: insira uma posição de $10.000 em v2 (faixa completa) vs. $10.000 concentrados em uma banda ±15% em v3.`
      ],
      checklist: [
      `Antes de fornecer liquidez na Uniswap v3: 1) Verifique se o pool existe e tem volume suficiente. 2) Revise o percentual histórico dentro da faixa de preços. 3) Calcule a IL para o pior cenário dentro da sua faixa.`,
      `Após calcular a renda de taxas: compare com o APY de taxas de uma posição mais simples.`
      ],
      mistakes: [
      `Definir faixas muito estreitas em pares voláteis leva a tempo constante fora da faixa.`,
      `Não contabilizar a IL ao comparar receita de taxas v3 vs. v2.`
      ],
      benchmarks: [
      `APY de taxas realista para Uniswap v3 por tipo de par: ETH/USDC nível 0.05%, faixa ±10%: 8–25% APY historicamente.`,
      `Compare a renda de taxas com o custo de gerenciar a posição: cada rebalanceamento de faixa na mainnet Ethereum custa $20–50+ em gás.`
      ],
      execution: [
      `Configuração de posição LP: 1) Determine o nível de taxa. 2) Selecione a faixa de preços com base na volatilidade histórica. 3) Insira na calculadora para estimar o APY de taxas. 4) Selecione a faixa que maximiza APY de taxas × tempo esperado dentro da faixa.`,
      `Para pares de stablecoins: use o nível de taxa de 0.01% e uma faixa muito estreita.`
      ],
      hygiene: [
      `Verifique o status dentro da faixa da sua posição v3 diariamente para pares voláteis.`,
      `Acompanhe sua renda de taxas realizada versus projetada mensalmente.`
      ],
      validation: [
      `Verifique a estimativa de renda de taxas: sua participação no pool (%) × volume diário do pool × taxa = renda diária de taxas em USD.`,
      `Após fornecer liquidez, compare a renda diária projetada de taxas com as taxas reais creditadas à sua posição LP.`
      ],
    },
    tr: {
      interpret: [
      `Uniswap ücret hesaplayıcısı, sermayenize, fiyat aralığınıza (v3 için) ve havuz kullanım metriklerine göre likidite pozisyonunuz için tahmini yıllık ücret gelirini çıktılar.`,
      `"Aralıkta vs. aralık dışı" durumu, v3 pozisyonları için en işlemsel çıktıdır.`
      ],
      scenarios: [
      `Aralık seçimi optimizasyonu: ETH/USDC için hesaplayıcıda üç aralık yapılandırmasını test edin: tam aralık, ±%20 aralık ve ±%5 aralık.`,
      `Sermaye verimliliği analizi: v2'de 10.000 dolarlık bir pozisyon (tam aralık) ile v3'te ±%15'lik bir bantta konsantre edilmiş 10.000 dolarlık bir pozisyonu girin.`
      ],
      checklist: [
      `Uniswap v3 likiditesi sağlamadan önce: 1) Havuzun var olduğunu ve yeterli hacme sahip olduğunu doğrulayın. 2) Fiyat aralığının tarihsel "aralıkta" yüzdesini inceleyin. 3) Aralığınız içindeki en kötü durum senaryosu için IL hesaplayın.`,
      `Ücret gelirini hesapladıktan sonra: daha basit bir pozisyonun ücret APY'siyle karşılaştırın.`
      ],
      mistakes: [
      `Değişken çiftlerde çok dar aralıklar belirlemek (ETH/BTC için ±%5) sürekli aralık dışı zamana yol açar.`,
      `v3 ücret gelirini v2 ile karşılaştırırken IL'yi hesaba katmamak.`
      ],
      benchmarks: [
      `Uniswap v3 için çift türüne göre gerçekçi ücret APY'si: ETH/USDC %0.05 katmanı, ±%10 aralık: tarihsel olarak %8–25 APY.`,
      `Ücret gelirini pozisyonu yönetme maliyetiyle karşılaştırın: Ethereum mainnet'te her aralık yeniden dengeleme işlemi gaz olarak 20–50+ dolara mal olur.`
      ],
      execution: [
      `LP pozisyon kurulumu: 1) Ücret katmanını belirleyin. 2) Tarihsel volatiliteye göre fiyat aralığı seçin. 3) Farklı aralık genişliklerinde ücret APY'sini tahmin etmek için hesaplayıcıya girin. 4) Ücret APY'si × beklenen aralıkta zaman'ı maksimize eden aralığı seçin.`,
      `Stablecoin çiftleri için: %0.01 ücret katmanı ve çok dar bir aralık kullanın.`
      ],
      hygiene: [
      `Değişken çiftler için v3 pozisyonunuzun aralıkta durumunu günlük olarak kontrol edin.`,
      `Gerçekleşen ücret gelirinizi aylık bazda tahmini gelirinizle karşılaştırın.`
      ],
      validation: [
      `Ücret geliri tahminini doğrulayın: havuz payınız (%) × günlük havuz hacmi × ücret oranı = USD cinsinden günlük ücret geliri.`,
      `Likidite sağladıktan sonra, hesaplayıcının tahmini günlük ücret gelirini LP pozisyonunuza yatırılan gerçek ücretlerle karşılaştırın.`
      ],
    },
    hi: {
      interpret: [
      `Uniswap शुल्क कैलकुलेटर आपकी पूंजी, मूल्य सीमा (v3 के लिए) और पूल उपयोग मेट्रिक्स के आधार पर आपकी लिक्विडिटी पोजीशन के लिए अनुमानित वार्षिक शुल्क आय आउटपुट करता है।`,
      `"इन-रेंज बनाम आउट-ऑफ-रेंज" स्थिति v3 पोजीशन के लिए सबसे कार्रवाई योग्य आउटपुट है।`
      ],
      scenarios: [
      `रेंज चयन अनुकूलन: ETH/USDC के लिए, कैलकुलेटर में तीन रेंज कॉन्फ़िगरेशन का परीक्षण करें: पूर्ण रेंज, ±20% रेंज और ±5% रेंज।`,
      `पूंजी दक्षता विश्लेषण: v2 में $10,000 की पोजीशन (पूर्ण रेंज) बनाम v3 में ±15% बैंड में केंद्रित $10,000 दर्ज करें।`
      ],
      checklist: [
      `Uniswap v3 लिक्विडिटी प्रदान करने से पहले: 1) सत्यापित करें कि पूल मौजूद है और पर्याप्त वॉल्यूम है। 2) ऐतिहासिक इन-रेंज प्रतिशत की समीक्षा करें। 3) अपनी रेंज के भीतर सबसे खराब परिदृश्य के लिए IL की गणना करें।`,
      `शुल्क आय की गणना के बाद: एक सरल पोजीशन के शुल्क APY से तुलना करें।`
      ],
      mistakes: [
      `अस्थिर पेयर पर बहुत संकीर्ण रेंज सेट करना (ETH/BTC के लिए ±5%) लगातार आउट-ऑफ-रेंज समय की ओर ले जाता है।`,
      `v3 शुल्क आय की v2 से तुलना करते समय IL के लिए खाता न करना।`
      ],
      benchmarks: [
      `Uniswap v3 के लिए पेयर प्रकार के अनुसार यथार्थवादी शुल्क APY: ETH/USDC 0.05% टीयर, ±10% रेंज: ऐतिहासिक रूप से 8–25% APY।`,
      `शुल्क आय की तुलना पोजीशन प्रबंधन की लागत से करें: Ethereum mainnet पर प्रत्येक रेंज रीबैलेंस में $20–50+ गैस में लागत आती है।`
      ],
      execution: [
      `LP पोजीशन सेटअप: 1) शुल्क टीयर निर्धारित करें। 2) ऐतिहासिक अस्थिरता के आधार पर मूल्य सीमा चुनें। 3) विभिन्न रेंज चौड़ाई पर शुल्क APY का अनुमान लगाने के लिए कैलकुलेटर में दर्ज करें। 4) वह रेंज चुनें जो शुल्क APY × अपेक्षित इन-रेंज समय को अधिकतम करती है।`,
      `स्टेबलकॉइन पेयर के लिए: 0.01% शुल्क टीयर और बहुत तंग रेंज (±0.1–0.3%) का उपयोग करें।`
      ],
      hygiene: [
      `अस्थिर पेयर के लिए अपनी v3 पोजीशन की इन-रेंज स्थिति दैनिक रूप से जांचें।`,
      `मासिक आधार पर अपनी वास्तविक शुल्क आय की तुलना अनुमानित शुल्क आय से करें।`
      ],
      validation: [
      `शुल्क आय अनुमान सत्यापित करें: आपका पूल हिस्सा (%) × पूल दैनिक वॉल्यूम × शुल्क दर = USD में दैनिक शुल्क आय।`,
      `लिक्विडिटी प्रदान करने के बाद, कैलकुलेटर की अनुमानित दैनिक शुल्क आय की तुलना पूल डैशबोर्ड पर आपकी LP पोजीशन में जमा वास्तविक शुल्क से करें।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор комиссий Uniswap выводит прогнозируемый годовой доход от комиссий для вашей позиции ликвидности на основе вашего капитала, ценового диапазона (для v3) и метрик использования пула. Доход от комиссий в сутки рассчитывается как: (ваша доля ликвидности × суточный объём пула × ставка комиссий).`,
      `Статус "в диапазоне vs. вне диапазона" — наиболее практически значимый вывод для позиций v3. Когда цена выходит за пределы вашего диапазона, вы не зарабатываете комиссии.`
      ],
      scenarios: [
      `Оптимизация выбора диапазона: для ETH/USDC протестируйте три конфигурации в калькуляторе: полный диапазон (как v2), ±20% (умеренная концентрация) и ±5% (максимальная ставка в диапазоне, но частые выходы за его пределы).`,
      `Анализ эффективности капитала: введите позицию $10 000 в v2 (полный диапазон) vs. $10 000, сконцентрированных в полосе ±15% в v3.`
      ],
      checklist: [
      `Перед предоставлением ликвидности в Uniswap v3: 1) Убедитесь, что пул существует и имеет достаточный объём (>$500K/день). 2) Изучите исторический процент нахождения в диапазоне. 3) Рассчитайте IL для наихудшего сценария в вашем диапазоне.`,
      `После расчёта дохода от комиссий: сравните с APY от комиссий более простой позиции и IL обоих вариантов.`
      ],
      mistakes: [
      `Установка слишком узких диапазонов для волатильных пар (±5% для ETH/BTC) приводит к постоянному выходу цены за диапазон и частым расходам на газ при ребалансировке.`,
      `Игнорирование IL при сравнении дохода от комиссий v3 и v2. В узком диапазоне v3 IL усиливается пропорционально коэффициенту концентрации.`
      ],
      benchmarks: [
      `Реалистичный APY от комиссий на Uniswap v3 по типу пары: ETH/USDC, уровень 0.05%, диапазон ±10%: исторически 8–25% APY. ETH/BTC, 0.3%, ±15%: 5–15% APY.`,
      `Сравните доход от комиссий с затратами на управление позицией: каждая ребалансировка диапазона на основном Ethereum стоит $20–50+ в газе.`
      ],
      execution: [
      `Настройка LP-позиции: 1) Определите уровень комиссий. 2) Выберите ценовой диапазон на основе исторической волатильности. 3) Введите данные в калькулятор для оценки APY при разных ширинах диапазона. 4) Выберите диапазон, максимизирующий APY × ожидаемое время в диапазоне.`,
      `Для стейблкоин-пар (USDC/USDT, USDC/DAI): используйте уровень 0.01% и очень узкий диапазон (±0.1–0.3% от пега).`
      ],
      hygiene: [
      `Ежедневно проверяйте статус "в диапазоне" для волатильных пар. Когда цена выходит за диапазон, вы не зарабатываете комиссии — позиция просто удерживает токен в избытке.`,
      `Ежемесячно сравнивайте фактический доход от комиссий с прогнозируемым.`
      ],
      validation: [
      `Проверьте оценку дохода от комиссий: ваша доля пула (%) × суточный объём пула × ставка комиссий = суточный доход в USD. При $1M суточного объёма, 1% доле и комиссии 0.3%: $30/день = $10 950/год (31% APY на $10 000).`,
      `После предоставления ликвидности сравните прогнозируемый суточный доход от комиссий с фактически начисленными комиссиями на дашборде пула.`
      ],
    },
  },


  'bridge-comparator': {
    en: {
      interpret: [
      `The bridge cost comparator shows the total cost of moving tokens from one chain to another across multiple bridge options. The total cost includes: source chain gas (to approve + deposit), bridge protocol fee (percentage of amount bridged), destination chain gas (to finalize), and any slippage on AMM-based bridges. The cheapest bridge is not always best — also evaluate speed (time-to-finality) and security model (trusted vs. trustless).`,
      `The "net received" amount is the critical figure: this is what you actually get on the destination chain after all costs. Compare this across bridges, not the quoted fee, as some bridges show low percentage fees but apply hidden slippage or deliver fewer tokens than the stated amount due to pool depth limitations on large transfers.`
      ],
      scenarios: [
      `Large transfer optimization: for amounts over $10,000, the bridge fee percentage dominates total cost. A bridge with 0.04% fee is $4 cheaper than one with 0.1% fee on a $10,000 transfer — minor. But on $100,000, the difference is $60. Calculate the crossover point where a faster but more expensive bridge becomes rational (e.g., saving 30 minutes of wait time vs. $20 more in fees).`,
      `Frequent small transfer routing: for users bridging small amounts ($100–500) frequently (weekly DCA to L2), source chain gas can be the dominant cost. Calculate the monthly total cost across different routing strategies: mainnet→L2 bridge vs. CEX withdrawal to L2 vs. native L2 onramp. The CEX withdrawal route often has lower gas but requires KYC.`
      ],
      checklist: [
      `Before bridging: 1) Verify the bridge is audited and has not experienced a recent exploit — bridge hacks account for >$2B in losses historically. 2) Confirm the destination chain has the token you are bridging (native vs. wrapped distinction). 3) Check if you need gas token on the destination chain to use the bridged funds.`,
      `After calculating: verify the "minimum received" on AMM bridges accounts for slippage tolerance. For large amounts, test a small transfer first to confirm the actual received amount matches the calculator estimate.`
      ],
      mistakes: [
      `Bridging large amounts through AMM-based bridges without checking liquidity depth. A $50,000 USDC bridge through a pool with $200,000 USDC depth will cause significant slippage — you receive fewer USDC than the stated fee implies. Always check pool depth for amounts >5% of pool TVL.`,
      `Ignoring destination chain gas requirements. Some bridges charge no protocol fee but deliver to an address that needs native gas token to interact with any contract. Receiving $1,000 USDC on a chain where you have zero ETH (for gas) means you cannot use the funds until you acquire gas separately.`
      ],
      benchmarks: [
      `Current bridge cost benchmarks (2024): Ethereum→Arbitrum: 0.03–0.1% + $2–8 source gas. Ethereum→Optimism: similar. BSC→ETH: 0.05–0.15% + <$1 source gas. Cross-L2 (Arbitrum→Optimism): typically $0.10–0.50 total. The cheapest route for standard amounts ($1K–$10K) is typically native bridge (slower, more secure) or Hop Protocol / Stargate (faster).`,
      `Bridge speed benchmarks: native Arbitrum bridge = 7 days exit, 10 minutes entry. Fast bridges (Hop, Stargate, Across) = 1–5 minutes both ways. Security model: native bridges have strongest guarantees; fast bridges rely on liquidity providers and may have counterparty risk. Your decision threshold: for amounts under $10,000, fast bridges are typically rational; above $50,000, the security premium of native bridges is worth the wait.`
      ],
      execution: [
      `Bridge comparison workflow: 1) Enter source chain, destination chain, token, and amount into this comparator. 2) Sort results by "net received" descending (highest net amount = best deal). 3) For the top 2 options, check their security audit status and recent exploit history. 4) Verify the destination chain gas requirement. 5) Execute with the optimal bridge.`,
      `For recurring bridges (weekly): bookmark the best bridge for your specific route. Routes can change in ranking as liquidity shifts — recheck monthly using this comparator.`
      ],
      hygiene: [
      `After each bridge transaction, record: source chain tx hash, destination tx hash, amount sent, amount received, total cost in USD. This creates a trail for tax reporting (bridges are often non-taxable transfers, but realized fees are a cost basis component).`,
      `Check the bridge's official announcement channels before use. Bridge UI often works even during exploits or maintenance, but funds may be at risk. A 5-minute check of the bridge's Twitter/Discord can prevent catastrophic loss.`
      ],
      validation: [
      `Verify the "net received" estimate by comparing to the bridge's own quote page with the same amount. Differences over 0.5% warrant investigating the fee structure — some bridges have dynamic fees not shown in the headline rate.`,
      `After bridging, confirm the received amount on the destination chain explorer matches the calculator estimate within 0.5%. Consistent shortfalls on a specific bridge indicate hidden fees or slippage not captured in the calculator's model.`
      ],
    },
    es: {
      interpret: [
      `El comparador de costes de puente muestra el coste total de mover tokens de una cadena a otra a través de múltiples opciones de puente. El coste total incluye: gas de la cadena fuente, comisión del protocolo de puente, gas de la cadena destino y cualquier deslizamiento.`,
      `La cantidad "neta recibida" es la cifra crítica: esto es lo que realmente obtienes en la cadena de destino después de todos los costes.`
      ],
      scenarios: [
      `Optimización de transferencias grandes: para cantidades superiores a $10,000, el porcentaje de comisión del puente domina el coste total.`,
      `Enrutamiento de transferencias pequeñas frecuentes: para usuarios que hacen puente de cantidades pequeñas ($100–500) frecuentemente, el gas de la cadena fuente puede ser el coste dominante.`
      ],
      checklist: [
      `Antes de hacer puente: 1) Verifica que el puente está auditado y no ha experimentado un exploit reciente. 2) Confirma que la cadena de destino tiene el token que estás transfiriendo. 3) Comprueba si necesitas token de gas en la cadena de destino.`,
      `Después de calcular: verifica que el "mínimo recibido" en puentes AMM tenga en cuenta la tolerancia al deslizamiento.`
      ],
      mistakes: [
      `Transferir grandes cantidades a través de puentes basados en AMM sin comprobar la profundidad de liquidez.`,
      `Ignorar los requisitos de gas de la cadena de destino.`
      ],
      benchmarks: [
      `Benchmarks actuales de costes de puente (2024): Ethereum→Arbitrum: 0.03–0.1% + $2–8 de gas en la fuente.`,
      `Benchmarks de velocidad de puente: puente nativo de Arbitrum = 7 días de salida. Puentes rápidos (Hop, Stargate, Across) = 1–5 minutos en ambas direcciones.`
      ],
      execution: [
      `Flujo de trabajo de comparación de puentes: 1) Introduce cadena fuente, cadena destino, token y monto en este comparador. 2) Ordena los resultados por "neto recibido" en orden descendente. 3) Para las 2 mejores opciones, comprueba su estado de auditoría. 4) Verifica el requisito de gas de la cadena de destino.`,
      `Para puentes recurrentes: marca el mejor puente para tu ruta específica.`
      ],
      hygiene: [
      `Después de cada transacción de puente, registra: hash de transacción de cadena fuente, hash de cadena destino, cantidad enviada, cantidad recibida, coste total en USD.`,
      `Comprueba los canales de anuncios oficiales del puente antes de usarlo.`
      ],
      validation: [
      `Verifica la estimación de "neto recibido" comparando con la propia página de cotización del puente con la misma cantidad.`,
      `Después de hacer el puente, confirma que la cantidad recibida en el explorador de la cadena destino coincide con la estimación del calculador.`
      ],
    },
    pt: {
      interpret: [
      `O comparador de custos de bridge mostra o custo total de mover tokens de uma cadeia para outra através de múltiplas opções de bridge.`,
      `O valor "líquido recebido" é a cifra crítica: é o que você realmente recebe na cadeia de destino após todos os custos.`
      ],
      scenarios: [
      `Otimização de transferências grandes: para valores acima de $10.000, o percentual de taxa do bridge domina o custo total.`,
      `Roteamento de transferências pequenas frequentes: para usuários que fazem bridge de pequenas quantias frequentemente, o gás da cadeia de origem pode ser o custo dominante.`
      ],
      checklist: [
      `Antes de fazer bridge: 1) Verifique se o bridge foi auditado. 2) Confirme que a cadeia de destino tem o token. 3) Verifique se você precisa de token de gás na cadeia de destino.`,
      `Após calcular: verifique se o "mínimo recebido" em bridges AMM considera a tolerância ao deslizamento.`
      ],
      mistakes: [
      `Transferir grandes quantias por bridges baseados em AMM sem verificar a profundidade de liquidez.`,
      `Ignorar os requisitos de gás da cadeia de destino.`
      ],
      benchmarks: [
      `Benchmarks atuais de custos de bridge: Ethereum→Arbitrum: 0.03–0.1% + $2–8 de gás na origem.`,
      `Benchmarks de velocidade: bridge nativo Arbitrum = 7 dias de saída. Bridges rápidos = 1–5 minutos.`
      ],
      execution: [
      `Fluxo de trabalho de comparação de bridges: 1) Insira cadeia de origem, destino, token e valor. 2) Classifique por "líquido recebido" em ordem decrescente. 3) Para as 2 melhores opções, verifique o status de auditoria. 4) Verifique o requisito de gás da cadeia de destino.`,
      `Para bridges recorrentes: marque o melhor bridge para sua rota específica.`
      ],
      hygiene: [
      `Após cada transação de bridge, registre: hash da transação na cadeia de origem, hash na cadeia de destino, valor enviado, valor recebido, custo total em USD.`,
      `Verifique os canais de anúncios oficiais do bridge antes de usar.`
      ],
      validation: [
      `Verifique a estimativa de "líquido recebido" comparando com a própria página de cotação do bridge.`,
      `Após fazer bridge, confirme se o valor recebido corresponde à estimativa da calculadora.`
      ],
    },
    tr: {
      interpret: [
      `Köprü maliyet karşılaştırıcısı, token'ları birden fazla köprü seçeneği aracılığıyla bir zincirden diğerine taşımanın toplam maliyetini gösterir.`,
      `"Net alınan" tutar kritik rakamdır: tüm maliyetlerden sonra hedef zincirde gerçekte elde ettiğiniz budur.`
      ],
      scenarios: [
      `Büyük transfer optimizasyonu: 10.000 doların üzerindeki tutarlar için köprü ücreti yüzdesi toplam maliyete hakimdir.`,
      `Sık küçük transfer yönlendirme: küçük miktarları sık sık köprüleyen kullanıcılar için kaynak zincir gazı baskın maliyet olabilir.`
      ],
      checklist: [
      `Köprülemeden önce: 1) Köprünün denetlendiğini ve yakın zamanda saldırıya uğramadığını doğrulayın. 2) Hedef zincirin köprülediğiniz tokeni olduğunu onaylayın. 3) Hedef zincirde gaz tokenine ihtiyacınız olup olmadığını kontrol edin.`,
      `Hesapladıktan sonra: AMM köprülerinde "minimum alınan" değerinin kayma toleransını hesaba kattığını doğrulayın.`
      ],
      mistakes: [
      `Likidite derinliğini kontrol etmeden AMM tabanlı köprüler aracılığıyla büyük miktarlar köprülemek.`,
      `Hedef zincir gaz gereksinimlerini görmezden gelmek.`
      ],
      benchmarks: [
      `Mevcut köprü maliyet kıyaslamaları: Ethereum→Arbitrum: %0.03–0.1 + kaynak gaz $2–8.`,
      `Köprü hız kıyaslamaları: yerel Arbitrum köprüsü = 7 gün çıkış. Hızlı köprüler = 1–5 dakika.`
      ],
      execution: [
      `Köprü karşılaştırma iş akışı: 1) Kaynak zinciri, hedef zinciri, tokeni ve tutarı bu karşılaştırıcıya girin. 2) Sonuçları "net alınan" değere göre azalan sırayla sıralayın. 3) En iyi 2 seçenek için denetim durumunu kontrol edin.`,
      `Tekrarlayan köprüler için: belirli rotanız için en iyi köprüyü yer işaretleyin.`
      ],
      hygiene: [
      `Her köprü işleminden sonra kaydedin: kaynak zincir tx hash'i, hedef tx hash'i, gönderilen tutar, alınan tutar, USD cinsinden toplam maliyet.`,
      `Kullanmadan önce köprünün resmi duyuru kanallarını kontrol edin.`
      ],
      validation: [
      `"Net alınan" tahminini aynı tutarla köprünün kendi teklif sayfasıyla karşılaştırarak doğrulayın.`,
      `Köprüledikten sonra, alınan tutarın hedef zincir gezgininde hesaplayıcı tahminiyle eşleştiğini onaylayın.`
      ],
    },
    hi: {
      interpret: [
      `ब्रिज लागत तुलनाकर्ता कई ब्रिज विकल्पों के माध्यम से एक चेन से दूसरी चेन पर टोकन ले जाने की कुल लागत दिखाता है।`,
      `"नेट प्राप्त" राशि महत्वपूर्ण आंकड़ा है: सभी लागतों के बाद गंतव्य चेन पर आप वास्तव में यही प्राप्त करते हैं।`
      ],
      scenarios: [
      `बड़े ट्रांसफर अनुकूलन: $10,000 से अधिक राशि के लिए, ब्रिज शुल्क प्रतिशत कुल लागत पर हावी होता है।`,
      `बार-बार छोटे ट्रांसफर रूटिंग: बार-बार छोटी राशियां ब्रिज करने वाले उपयोगकर्ताओं के लिए, सोर्स चेन गैस प्रमुख लागत हो सकती है।`
      ],
      checklist: [
      `ब्रिजिंग से पहले: 1) सत्यापित करें कि ब्रिज का ऑडिट किया गया है। 2) पुष्टि करें कि गंतव्य चेन में आप जो टोकन ब्रिज कर रहे हैं वह है। 3) जांचें कि क्या आपको गंतव्य चेन पर गैस टोकन की आवश्यकता है।`,
      `गणना के बाद: AMM ब्रिज पर "न्यूनतम प्राप्त" स्लिपेज सहिष्णुता के लिए खाता रखता है, सत्यापित करें।`
      ],
      mistakes: [
      `लिक्विडिटी गहराई जांचे बिना AMM-आधारित ब्रिज के माध्यम से बड़ी राशि ब्रिज करना।`,
      `गंतव्य चेन गैस आवश्यकताओं को नजरअंदाज करना।`
      ],
      benchmarks: [
      `वर्तमान ब्रिज लागत बेंचमार्क: Ethereum→Arbitrum: 0.03–0.1% + $2–8 सोर्स गैस।`,
      `ब्रिज स्पीड बेंचमार्क: नेटिव Arbitrum ब्रिज = 7 दिन निकास। तेज ब्रिज = 1–5 मिनट।`
      ],
      execution: [
      `ब्रिज तुलना वर्कफ़्लो: 1) इस तुलनाकर्ता में सोर्स चेन, डेस्टिनेशन चेन, टोकन और राशि दर्ज करें। 2) "नेट प्राप्त" के अनुसार घटते क्रम में परिणाम क्रमबद्ध करें। 3) शीर्ष 2 विकल्पों के लिए ऑडिट स्थिति जांचें।`,
      `आवर्ती ब्रिज के लिए: अपने विशिष्ट मार्ग के लिए सबसे अच्छा ब्रिज बुकमार्क करें।`
      ],
      hygiene: [
      `प्रत्येक ब्रिज लेनदेन के बाद रिकॉर्ड करें: सोर्स चेन tx हैश, डेस्टिनेशन tx हैश, भेजी गई राशि, प्राप्त राशि, USD में कुल लागत।`,
      `उपयोग करने से पहले ब्रिज के आधिकारिक घोषणा चैनल जांचें।`
      ],
      validation: [
      `उसी राशि के साथ ब्रिज के अपने उद्धरण पृष्ठ के साथ तुलना करके "नेट प्राप्त" अनुमान सत्यापित करें।`,
      `ब्रिजिंग के बाद, पुष्टि करें कि डेस्टिनेशन चेन एक्सप्लोरर पर प्राप्त राशि कैलकुलेटर अनुमान से मेल खाती है।`
      ],
    },
    ru: {
      interpret: [
      `Сравнитель стоимости бриджа показывает общую стоимость перемещения токенов с одной цепи на другую через несколько вариантов бриджа. Общая стоимость включает: газ исходной цепи, комиссию протокола бриджа, газ целевой цепи и любое проскальзывание для AMM-бриджей.`,
      `Сумма "чисто получено" — ключевой показатель: именно столько вы фактически получаете в целевой цепи после всех расходов.`
      ],
      scenarios: [
      `Оптимизация крупных переводов: для сумм свыше $10 000 процент комиссии бриджа доминирует в общей стоимости.`,
      `Маршрутизация частых небольших переводов: для пользователей, часто бриджащих небольшие суммы, газ исходной цепи может быть основным расходом.`
      ],
      checklist: [
      `Перед бриджингом: 1) Убедитесь, что бридж прошёл аудит и не подвергался эксплойтам. 2) Подтвердите, что в целевой цепи есть нужный токен. 3) Проверьте требование к газовому токену в целевой цепи.`,
      `После расчёта: убедитесь, что "минимум полученного" на AMM-бриджах учитывает допустимое проскальзывание.`
      ],
      mistakes: [
      `Бриджинг крупных сумм через AMM-бриджи без проверки глубины ликвидности. Бридж $50 000 USDC через пул с $200 000 USDC вызовет значительное проскальзывание.`,
      `Игнорирование требований к газовому токену в целевой цепи.`
      ],
      benchmarks: [
      `Текущие ориентиры стоимости бриджей (2024): Ethereum→Arbitrum: 0.03–0.1% + $2–8 газа в источнике. Быстрые бриджи (Hop, Stargate, Across): 1–5 минут в оба направления.`,
      `Ориентиры по скорости: нативный бридж Arbitrum = 7 дней на вывод, 10 минут на ввод. Для сумм до $10 000 быстрые бриджи рациональны; выше $50 000 — преимущество безопасности нативных бриджей оправдывает ожидание.`
      ],
      execution: [
      `Процесс сравнения бриджей: 1) Введите исходную цепь, целевую цепь, токен и сумму. 2) Отсортируйте результаты по "чисто получено" по убыванию. 3) Для 2 лучших вариантов проверьте статус аудита. 4) Убедитесь в наличии газа в целевой цепи.`,
      `Для регулярных бриджей: добавьте лучший бридж для вашего конкретного маршрута в закладки.`
      ],
      hygiene: [
      `После каждой бридж-транзакции записывайте: хэш транзакции в исходной цепи, хэш в целевой, сумму отправки и получения, общую стоимость в USD.`,
      `Перед использованием проверяйте официальные каналы объявлений бриджа.`
      ],
      validation: [
      `Проверьте оценку "чисто получено", сравнив с собственной страницей котировки бриджа для той же суммы.`,
      `После бриджинга подтвердите, что полученная сумма в обозревателе целевой цепи совпадает с оценкой калькулятора в пределах 0.5%.`
      ],
    },
  },
  'lending-calculator': {
    en: {
      interpret: [
      `The crypto lending calculator outputs two perspectives: borrower cost (interest paid on the borrowed amount) and lender yield (interest earned on deposited collateral). For borrowers, the key metric is the effective annual borrowing rate — compare this to the expected return from what you are funding with the borrowed capital. If you borrow at 8% APR to earn 15% yield elsewhere, the arbitrage spread is positive. If the funded position yields less than the borrow rate, the position loses money on carry.`,
      `The health factor is the most critical lending metric: it represents how close your position is to liquidation. Health factor = (collateral value × liquidation threshold) / borrow value. A health factor of 1.0 means liquidation. Protocol-specific safe thresholds vary but staying above 1.5 provides an adequate buffer for normal volatility. The calculator shows how much collateral price decline brings you to the liquidation threshold.`
      ],
      scenarios: [
      `Collateral loan-to-value planning: before depositing collateral and borrowing, use this calculator to find the safe borrowing amount. Enter your collateral value, the protocol's liquidation threshold for your collateral asset, and your desired health factor (minimum 1.5). The calculator returns the maximum safe borrow amount that keeps you above your target health factor.`,
      `Interest arbitrage calculation: deposit a stablecoin as collateral, borrow another stablecoin, and redeploy the borrowed funds in a higher-yield protocol. Enter the borrow APR and the destination yield APY into this calculator to see if the spread is positive after accounting for the health factor buffer required.`
      ],
      checklist: [
      `Before taking a crypto-backed loan: 1) Verify the collateral asset's liquidation threshold on the specific protocol (ETH may have 80% LTV on Aave, but only 70% for smaller tokens). 2) Calculate your health factor at current prices and at 30% lower collateral price. 3) Set up price alerts to notify you when health factor drops below 1.5.`,
      `After borrowing: never let health factor drop below 1.2 without actively managing the position. At 1.2, a 5–10% collateral price drop triggers liquidation, and liquidation penalties are typically 5–15% of the collateral — a significant additional loss.`
      ],
      mistakes: [
      `Borrowing at maximum LTV (health factor near 1.2) and then not monitoring. Crypto collateral can drop 20–30% in a single day. At 80% LTV with ETH collateral, a 25% ETH price drop takes health factor below 1.0 and triggers liquidation even before you can react — especially during volatile overnight moves.`,
      `Using volatile assets as collateral to borrow stablecoins and then deploying the stablecoins into yield strategies without accounting for the margin maintenance cost. If ETH drops 40% and your health factor hits liquidation, you lose the ETH collateral penalty on top of any yield losses from the deployed stablecoins.`
      ],
      benchmarks: [
      `Typical lending parameters (2024): Aave v3 ETH collateral: 80% LTV, 82.5% liquidation threshold, 5% liquidation bonus. Compound v3 USDC borrow: 4–8% APR variable. Aave USDC supply yield: 3–6% APY. The typical carry trade spread (borrow ETH-backed stablecoin, lend stablecoin) is 2–5% APY net of borrow costs, with liquidation risk as the primary risk.`,
      `Safe health factor benchmarks: 1.5 = conservative (can absorb 25% collateral decline for most LTV ratios). 2.0 = very safe (can absorb 40%+ decline). 3.0+ = over-collateralized with minimal liquidation risk but poor capital efficiency. Most experienced DeFi users target 1.5–2.0 health factor.`
      ],
      execution: [
      `Lending position setup: 1) Calculate safe borrow amount for target health factor 1.5+. 2) Supply collateral to the protocol. 3) Borrow the calculated amount (not the maximum). 4) Set a price alert for collateral at (current price × (1 − 20%)) as an early warning. 5) Monitor health factor daily during high-volatility periods.`,
      `Repayment planning: use the calculator to project total interest paid over your planned borrowing period. Compare to the yield generated by your deployed borrowed funds. Schedule a repayment before the interest cost erodes the yield advantage.`
      ],
      hygiene: [
      `Check your health factor daily during market volatility. Many lending protocols send email/push alerts for low health factor — enable them immediately after opening a position. Missing a liquidation alert is the most common cause of large, preventable losses in DeFi lending.`,
      `Update the calculator monthly with current interest rates, which are variable in most protocols. Borrow rates on Aave can swing from 2% to 20%+ during periods of high demand for stablecoins. A rate spike from 5% to 15% while you are leveraged can quickly make a previously profitable position a net loser.`
      ],
      validation: [
      `Verify health factor: (collateral in USD × liquidation threshold%) / (total borrowed in USD) = health factor. For $10,000 ETH collateral at 82.5% liquidation threshold and $6,000 USDC borrowed: ($10,000 × 0.825) / $6,000 = 1.375. If the calculator shows a different value, check whether it applies the max LTV or liquidation threshold — these are different numbers.`,
      `Verify interest calculation: principal × (APR / 365) × days = simple interest accrued. For $5,000 borrowed at 6% APR for 30 days: $5,000 × (0.06/365) × 30 = $24.66. Match to calculator output within $0.10.`
      ],
    },
    es: {
      interpret: [
      `El calculador de préstamos cripto produce dos perspectivas: coste del prestatario (interés pagado sobre el monto prestado) e ingresos del prestamista (interés ganado sobre el colateral depositado).`,
      `El factor de salud es la métrica de préstamo más crítica: representa cuán cerca está tu posición de la liquidación.`
      ],
      scenarios: [
      `Planificación de préstamo-valor del colateral: antes de depositar colateral y pedir prestado, usa este calculador para encontrar el monto seguro de préstamo.`,
      `Cálculo de arbitraje de intereses: deposita una stablecoin como colateral, pide prestada otra stablecoin y redistribuye los fondos prestados en un protocolo de mayor rendimiento.`
      ],
      checklist: [
      `Antes de tomar un préstamo respaldado por criptomonedas: 1) Verifica el umbral de liquidación del activo de colateral en el protocolo específico. 2) Calcula tu factor de salud al precio actual y al 30% más bajo. 3) Configura alertas de precio.`,
      `Después de pedir prestado: nunca dejes que el factor de salud caiga por debajo de 1.2 sin gestionar activamente la posición.`
      ],
      mistakes: [
      `Pedir prestado al LTV máximo y luego no monitorear.`,
      `Usar activos volátiles como colateral para pedir stablecoins prestadas y luego desplegar las stablecoins en estrategias de rendimiento sin contabilizar el coste de mantenimiento del margen.`
      ],
      benchmarks: [
      `Parámetros típicos de préstamo (2024): Aave v3 colateral ETH: 80% LTV, 82.5% umbral de liquidación, 5% bono de liquidación.`,
      `Benchmarks de factor de salud seguro: 1.5 = conservador; 2.0 = muy seguro; 3.0+ = sobre-colateralizado.`
      ],
      execution: [
      `Configuración de posición de préstamo: 1) Calcula el monto seguro de préstamo para un factor de salud objetivo de 1.5+. 2) Suministra colateral al protocolo. 3) Pide prestado el monto calculado (no el máximo). 4) Establece una alerta de precio para el colateral.`,
      `Planificación de reembolso: usa el calculador para proyectar el interés total pagado durante tu período de préstamo planificado.`
      ],
      hygiene: [
      `Comprueba tu factor de salud diariamente durante la volatilidad del mercado.`,
      `Actualiza el calculador mensualmente con las tasas de interés actuales, que son variables en la mayoría de los protocolos.`
      ],
      validation: [
      `Verifica el factor de salud: (colateral en USD × umbral de liquidación%) / (total prestado en USD) = factor de salud.`,
      `Verifica el cálculo de intereses: principal × (APR / 365) × días = interés simple acumulado.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de empréstimos cripto produz duas perspectivas: custo do mutuário e rendimento do credor.`,
      `O fator de saúde é a métrica de empréstimo mais crítica: representa o quão próximo sua posição está da liquidação.`
      ],
      scenarios: [
      `Planejamento de empréstimo-valor do colateral: antes de depositar colateral e tomar emprestado, use esta calculadora para encontrar o valor seguro de empréstimo.`,
      `Cálculo de arbitragem de juros: deposite uma stablecoin como colateral, pegue emprestado outra stablecoin e reimplante os fundos em um protocolo de maior rendimento.`
      ],
      checklist: [
      `Antes de tomar um empréstimo com garantia cripto: 1) Verifique o limiar de liquidação do ativo de colateral no protocolo específico. 2) Calcule seu fator de saúde ao preço atual e 30% abaixo. 3) Configure alertas de preço.`,
      `Após tomar emprestado: nunca deixe o fator de saúde cair abaixo de 1.2 sem gerenciar ativamente a posição.`
      ],
      mistakes: [
      `Tomar emprestado no LTV máximo e depois não monitorar.`,
      `Usar ativos voláteis como colateral para tomar stablecoins emprestadas sem contabilizar o custo de manutenção da margem.`
      ],
      benchmarks: [
      `Parâmetros típicos de empréstimo (2024): Aave v3 colateral ETH: 80% LTV, 82.5% limiar de liquidação.`,
      `Benchmarks de fator de saúde seguro: 1.5 = conservador; 2.0 = muito seguro.`
      ],
      execution: [
      `Configuração de posição de empréstimo: 1) Calcule o valor seguro de empréstimo para fator de saúde alvo 1.5+. 2) Forneça colateral ao protocolo. 3) Tome emprestado o valor calculado (não o máximo). 4) Configure um alerta de preço para o colateral.`,
      `Planejamento de reembolso: use a calculadora para projetar o total de juros pagos durante o período de empréstimo planejado.`
      ],
      hygiene: [
      `Verifique seu fator de saúde diariamente durante a volatilidade do mercado.`,
      `Atualize a calculadora mensalmente com as taxas de juros atuais, que são variáveis na maioria dos protocolos.`
      ],
      validation: [
      `Verifique o fator de saúde: (colateral em USD × limiar de liquidação%) / (total emprestado em USD) = fator de saúde.`,
      `Verifique o cálculo de juros: principal × (APR / 365) × dias = juros simples acumulados.`
      ],
    },
    tr: {
      interpret: [
      `Kripto kredi hesaplayıcısı iki perspektif çıktılar: borçlu maliyeti (ödenen faiz) ve borç veren getirisi (yatırılan teminat üzerinden kazanılan faiz).`,
      `Sağlık faktörü en kritik kredi metriğidir: pozisyonunuzun tasfiyeye ne kadar yakın olduğunu temsil eder.`
      ],
      scenarios: [
      `Teminat kredi-değer planlaması: teminat yatırmadan ve ödünç almadan önce, güvenli ödünç alma miktarını bulmak için bu hesaplayıcıyı kullanın.`,
      `Faiz arbitrajı hesaplaması: teminat olarak bir stablecoin yatırın, başka bir stablecoin ödünç alın ve ödünç alınan fonları daha yüksek getirili bir protokolde yeniden konuşlandırın.`
      ],
      checklist: [
      `Kripto destekli kredi almadan önce: 1) Belirli protokoldeki teminat varlığının tasfiye eşiğini doğrulayın. 2) Mevcut fiyatlarda ve %30 daha düşük fiyatlarda sağlık faktörünüzü hesaplayın. 3) Fiyat uyarıları kurun.`,
      `Ödünç aldıktan sonra: pozisyonu aktif olarak yönetmeden sağlık faktörünün 1.2'nin altına düşmesine asla izin vermeyin.`
      ],
      mistakes: [
      `Maksimum LTV'de ödünç almak ve ardından izlememek.`,
      `Marjin bakım maliyetini hesaba katmadan stablecoin borçlanmak için değişken varlıkları teminat olarak kullanmak.`
      ],
      benchmarks: [
      `Tipik kredi parametreleri (2024): Aave v3 ETH teminatı: %80 LTV, %82.5 tasfiye eşiği.`,
      `Güvenli sağlık faktörü kıyaslamaları: 1.5 = muhafazakâr; 2.0 = çok güvenli.`
      ],
      execution: [
      `Kredi pozisyon kurulumu: 1) Hedef sağlık faktörü 1.5+ için güvenli ödünç alma tutarını hesaplayın. 2) Protokole teminat sağlayın. 3) Hesaplanan tutarı ödünç alın (maksimumu değil). 4) Teminat için fiyat uyarısı kurun.`,
      `Geri ödeme planlaması: planlanan borçlanma süreniz boyunca ödenen toplam faizi tahmin etmek için hesaplayıcıyı kullanın.`
      ],
      hygiene: [
      `Piyasa volatilitesi sırasında sağlık faktörünüzü günlük olarak kontrol edin.`,
      `Çoğu protokolde değişken olan güncel faiz oranlarıyla hesaplayıcıyı aylık olarak güncelleyin.`
      ],
      validation: [
      `Sağlık faktörünü doğrulayın: (USD cinsinden teminat × tasfiye eşiği%) / (USD cinsinden toplam ödünç alınan) = sağlık faktörü.`,
      `Faiz hesaplamasını doğrulayın: anapara × (APR / 365) × günler = tahakkuk eden basit faiz.`
      ],
    },
    hi: {
      interpret: [
      `क्रिप्टो लेंडिंग कैलकुलेटर दो दृष्टिकोण आउटपुट करता है: उधारकर्ता लागत (उधार की गई राशि पर भुगतान ब्याज) और ऋणदाता उपज (जमा संपार्श्विक पर अर्जित ब्याज)।`,
      `हेल्थ फैक्टर सबसे महत्वपूर्ण लेंडिंग मेट्रिक है: यह दर्शाता है कि आपकी पोजीशन लिक्विडेशन के कितनी करीब है।`
      ],
      scenarios: [
      `संपार्श्विक लोन-टू-वैल्यू योजना: संपार्श्विक जमा करने और उधार लेने से पहले, सुरक्षित उधार राशि खोजने के लिए इस कैलकुलेटर का उपयोग करें।`,
      `ब्याज आर्बिट्राज गणना: एक स्टेबलकॉइन को संपार्श्विक के रूप में जमा करें, दूसरा स्टेबलकॉइन उधार लें और उधार लिए गए फंड को उच्च-उपज प्रोटोकॉल में तैनात करें।`
      ],
      checklist: [
      `क्रिप्टो-समर्थित ऋण लेने से पहले: 1) विशिष्ट प्रोटोकॉल पर संपार्श्विक संपत्ति के लिक्विडेशन थ्रेशोल्ड को सत्यापित करें। 2) वर्तमान कीमतों पर और 30% कम संपार्श्विक मूल्य पर अपने हेल्थ फैक्टर की गणना करें। 3) मूल्य अलर्ट सेट करें।`,
      `उधार लेने के बाद: पोजीशन को सक्रिय रूप से प्रबंधित किए बिना कभी भी हेल्थ फैक्टर को 1.2 से नीचे न जाने दें।`
      ],
      mistakes: [
      `अधिकतम LTV पर उधार लेना और फिर निगरानी न करना।`,
      `मार्जिन रखरखाव लागत के लिए खाता किए बिना स्टेबलकॉइन उधार लेने के लिए अस्थिर संपत्तियों को संपार्श्विक के रूप में उपयोग करना।`
      ],
      benchmarks: [
      `सामान्य लेंडिंग पैरामीटर (2024): Aave v3 ETH संपार्श्विक: 80% LTV, 82.5% लिक्विडेशन थ्रेशोल्ड।`,
      `सुरक्षित हेल्थ फैक्टर बेंचमार्क: 1.5 = रूढ़िवादी; 2.0 = बहुत सुरक्षित।`
      ],
      execution: [
      `लेंडिंग पोजीशन सेटअप: 1) लक्ष्य हेल्थ फैक्टर 1.5+ के लिए सुरक्षित उधार राशि की गणना करें। 2) प्रोटोकॉल को संपार्श्विक आपूर्ति करें। 3) परिकलित राशि उधार लें (अधिकतम नहीं)। 4) संपार्श्विक के लिए मूल्य अलर्ट सेट करें।`,
      `पुनर्भुगतान योजना: अपनी नियोजित उधार अवधि के दौरान कुल भुगतान किए गए ब्याज का अनुमान लगाने के लिए कैलकुलेटर का उपयोग करें।`
      ],
      hygiene: [
      `बाजार अस्थिरता के दौरान अपने हेल्थ फैक्टर की दैनिक जांच करें।`,
      `अधिकांश प्रोटोकॉल में परिवर्तनशील होने वाली वर्तमान ब्याज दरों के साथ कैलकुलेटर मासिक रूप से अपडेट करें।`
      ],
      validation: [
      `हेल्थ फैक्टर सत्यापित करें: (USD में संपार्श्विक × लिक्विडेशन थ्रेशोल्ड%) / (USD में कुल उधार लिया गया) = हेल्थ फैक्टर।`,
      `ब्याज गणना सत्यापित करें: मूलधन × (APR / 365) × दिन = संचित सरल ब्याज।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор крипто-кредитования выводит два ракурса: стоимость для заёмщика (выплачиваемые проценты) и доходность для кредитора (проценты на депонированное обеспечение). Для заёмщиков ключевой метрик — эффективная годовая ставка заимствования.`,
      `Коэффициент здоровья (health factor) — наиболее критичный показатель в кредитовании: он отражает, насколько далеко ваша позиция от ликвидации. HF = (стоимость обеспечения × порог ликвидации) / сумма займа. Значение 1.0 означает ликвидацию.`
      ],
      scenarios: [
      `Планирование соотношения займа к обеспечению: перед депозитом обеспечения и получением займа используйте калькулятор для нахождения безопасной суммы займа при целевом HF ≥ 1.5.`,
      `Расчёт процентного арбитража: депонируйте стейблкоин в качестве обеспечения, займите другой стейблкоин и разместите заёмные средства в протоколе с более высокой доходностью.`
      ],
      checklist: [
      `Перед получением криптозалогового кредита: 1) Уточните порог ликвидации залогового актива в конкретном протоколе. 2) Рассчитайте HF при текущих ценах и при снижении стоимости обеспечения на 30%. 3) Настройте ценовые алерты.`,
      `После получения займа: не допускайте падения HF ниже 1.2 без активного управления позицией.`
      ],
      mistakes: [
      `Займ при максимальном LTV (HF ≈ 1.2) без последующего мониторинга. Криптовалютное обеспечение может упасть на 20–30% за один день.`,
      `Использование волатильных активов в качестве залога для займа стейблкоинов и их последующего размещения в доходных стратегиях без учёта стоимости поддержания маржи.`
      ],
      benchmarks: [
      `Типовые параметры кредитования (2024): Aave v3, обеспечение ETH — LTV 80%, порог ликвидации 82.5%, штраф за ликвидацию 5%. Ставка займа USDC на Compound v3: 4–8% APR.`,
      `Безопасные ориентиры HF: 1.5 = консервативный (выдерживает 25% снижение обеспечения). 2.0 = очень безопасный. 3.0+ = избыточное обеспечение с минимальным риском ликвидации.`
      ],
      execution: [
      `Открытие кредитной позиции: 1) Рассчитайте безопасную сумму займа для целевого HF ≥ 1.5. 2) Внесите обеспечение в протокол. 3) Займите рассчитанную сумму (не максимум). 4) Установите ценовой алерт на уровне (текущая цена × 0.80). 5) Ежедневно отслеживайте HF в периоды высокой волатильности.`,
      `Планирование погашения: используйте калькулятор для прогнозирования суммарных выплаченных процентов за планируемый период займа.`
      ],
      hygiene: [
      `Ежедневно проверяйте HF в периоды волатильности. Большинство протоколов кредитования отправляют уведомления при низком HF — активируйте их сразу после открытия позиции.`,
      `Ежемесячно обновляйте калькулятор актуальными процентными ставками, которые в большинстве протоколов переменные.`
      ],
      validation: [
      `Проверьте HF: (стоимость обеспечения в USD × порог ликвидации%) / (сумма займа в USD) = HF. Для $10 000 ETH при пороге 82.5% и займе $6 000: ($10 000 × 0.825) / $6 000 = 1.375.`,
      `Проверьте начисление процентов: основная сумма × (APR / 365) × дни = начисленные простые проценты. Для $5 000 займа под 6% APR на 30 дней: $24.66.`
      ],
    },
  },
  'gpu-mining-calculator': {
    en: {
      interpret: [
      `The GPU mining calculator outputs daily, monthly, and annual revenue and profit for your GPU setup, accounting for hashrate, power consumption, electricity cost, and pool fees. Unlike ASIC calculators, GPU mining profitability changes dramatically with the market — GPUs can switch between Ethereum Classic, Ravencoin, Ergo, and other algorithms. The calculator's "algorithm selector" allows profitability comparison across mineable coins for your specific GPU model.`,
      `The payback period (months to ROI) is the most important figure for GPU investment decisions. GPU hardware retains significant resale value (50–70% after 1 year vs. ASICs at 20–30%), which changes the break-even math. The "effective cost" for profitability analysis should be (GPU purchase price − estimated resale value after mining period), not the full purchase price.`
      ],
      scenarios: [
      `GPU purchase decision: before buying a GPU for mining, enter the purchase price, expected hashrate for the target algorithm, power consumption, and your electricity rate. Compare the ROI period across 3–4 target coins. If the ROI period exceeds 12 months, the GPU must continue mining for over a year just to break even — a significant risk given market volatility.`,
      `Algorithm switching analysis: when a new coin's difficulty is low at launch, early mining captures above-average block rewards. Run this calculator for the new coin's current network parameters and compare profitability to your current algorithm. Factor in the switching overhead (software reconfiguration, rig instability risk) when evaluating whether to switch.`
      ],
      checklist: [
      `Before starting GPU mining: 1) Confirm your electricity rate — GPU mining is extremely electricity-sensitive; a 10% rate difference can swing profitability from positive to negative. 2) Measure actual GPU power draw at wall (not spec sheet TDP), since mining power draw can be 20–30% higher than gaming draw. 3) Calculate cooling overhead cost — GPUs run hot; increased AC cost should be included.`,
      `After calculating: compare to the alternative of simply buying and holding the coin you would have mined. At equal electricity cost per coin, buying is simpler; mining only adds value if you have cheap electricity or undervalued hardware.`
      ],
      mistakes: [
      `Using the GPU manufacturer's TDP spec for power consumption. Mining-optimized GPUs push hardware harder than spec. Measure actual wall draw using a kill-a-watt meter — the true figure can be 15–30% higher than spec, significantly impacting electricity cost projections.`,
      `Mining a single coin regardless of profitability changes. Algorithm switching rigs can be 20–40% more profitable annually by following profitability signals. Use this calculator weekly and compare the top 3–5 algorithms for your GPU to identify switching opportunities.`
      ],
      benchmarks: [
      `GPU mining profitability benchmarks (2024): high-end gaming GPUs (RTX 4090, RX 7900 XTX) at $0.05/kWh produce $3–8/day mining Ethereum Classic or Kaspa. At $0.10/kWh, profitability halves. At $0.15/kWh, most GPUs mine at a loss at current difficulty levels.`,
      `Capital efficiency comparison: a GPU rig costing $5,000 producing $5/day = 1000-day payback (2.7 years). At $3/day, payback is 1667 days (4.6 years). For profitable GPU mining in 2024 and beyond, electricity below $0.06/kWh is the practical requirement.`
      ],
      execution: [
      `GPU mining setup workflow: 1) Benchmark GPU hashrate using dedicated mining software (not manufacturer specs). 2) Measure wall power draw at 100% mining load. 3) Enter values into this calculator for your target coin. 4) Compare net daily profit to alternative uses of the GPU (gaming PC rental, AI inference). 5) Deploy if ROI < 12 months at current prices.`,
      `Profitability maintenance: check the calculator weekly and compare current mining coin to top alternatives. Use nicehash profitability estimator or WhatToMine as cross-references. Switching algorithms costs 5–15 minutes of downtime — factor this in only if the profitability gain exceeds the switch overhead cost.`
      ],
      hygiene: [
      `Monitor GPU temperatures during extended mining runs — sustained operation above 85°C (junction temp) degrades VRAM and GPU lifespan. Optimize fan curves and consider undervolting (reduce power by 15–20% while maintaining 95%+ hashrate) to extend hardware life and reduce electricity cost simultaneously.`,
      `Log your actual earnings from pool dashboard weekly and compare to the calculator's prediction. Consistent underperformance (>10%) suggests network difficulty increased faster than modeled, or pool efficiency/orphan rate is higher than assumed. Update calculator inputs with actual pool earnings for better forecasting.`
      ],
      validation: [
      `Verify daily coin output: (hashrate / network hashrate) × block reward × blocks per day = daily coin output. Compare to pool dashboard — pool efficiency should be 98–99.5% of theoretical. Significant underperformance indicates high orphan rate or pool inefficiency.`,
      `Validate electricity cost: (GPU wattage / 1000) × 24 × electricity rate = daily electricity cost. For a 300W GPU at $0.10/kWh: 0.3 × 24 × $0.10 = $0.72/day. Verify this matches the calculator's electricity cost output.`
      ],
    },
    es: {
      interpret: [
      `El calculador de minería GPU produce ingresos y beneficios diarios, mensuales y anuales para tu configuración de GPU, teniendo en cuenta el hashrate, el consumo de energía, el coste de electricidad y las comisiones del pool.`,
      `El período de recuperación (meses hasta el ROI) es la cifra más importante para las decisiones de inversión en GPU.`
      ],
      scenarios: [
      `Decisión de compra de GPU: antes de comprar una GPU para minar, introduce el precio de compra, el hashrate esperado para el algoritmo objetivo, el consumo de energía y tu tarifa eléctrica.`,
      `Análisis de cambio de algoritmo: cuando la dificultad de una nueva moneda es baja en el lanzamiento, la minería temprana captura recompensas de bloque por encima del promedio.`
      ],
      checklist: [
      `Antes de comenzar la minería con GPU: 1) Confirma tu tarifa eléctrica. 2) Mide el consumo real de energía de la GPU en la pared. 3) Calcula el coste de refrigeración adicional.`,
      `Después de calcular: compara con la alternativa de simplemente comprar y mantener la moneda que habrías minado.`
      ],
      mistakes: [
      `Usar las especificaciones TDP del fabricante de GPU para el consumo de energía.`,
      `Minar una sola moneda independientemente de los cambios de rentabilidad.`
      ],
      benchmarks: [
      `Benchmarks de rentabilidad de minería GPU (2024): GPUs de gama alta a $0.05/kWh producen $3–8/día minando Ethereum Classic o Kaspa.`,
      `Comparación de eficiencia de capital: un rig de GPU que cuesta $5,000 produciendo $5/día = 1000 días de recuperación.`
      ],
      execution: [
      `Flujo de trabajo de configuración de minería GPU: 1) Benchmarkea el hashrate de la GPU usando software de minería dedicado. 2) Mide el consumo de energía en la pared. 3) Introduce los valores en este calculador. 4) Compara el beneficio neto diario con usos alternativos de la GPU.`,
      `Mantenimiento de rentabilidad: comprueba el calculador semanalmente y compara la moneda minada actual con las mejores alternativas.`
      ],
      hygiene: [
      `Monitoriza las temperaturas de la GPU durante las ejecuciones de minería extendidas.`,
      `Registra tus ganancias reales del panel de pool semanalmente y compara con la predicción del calculador.`
      ],
      validation: [
      `Verifica la producción diaria de monedas: (hashrate / hashrate de red) × recompensa de bloque × bloques por día = producción diaria de monedas.`,
      `Valida el coste de electricidad: (vatios de GPU / 1000) × 24 × tarifa eléctrica = coste diario de electricidad.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de mineração GPU produz receita e lucro diários, mensais e anuais para sua configuração de GPU.`,
      `O período de payback (meses até o ROI) é a cifra mais importante para decisões de investimento em GPU.`
      ],
      scenarios: [
      `Decisão de compra de GPU: antes de comprar uma GPU para minerar, insira o preço de compra, hashrate esperado, consumo de energia e sua tarifa de eletricidade.`,
      `Análise de troca de algoritmo: quando a dificuldade de uma nova moeda é baixa no lançamento, a mineração precoce captura recompensas de bloco acima da média.`
      ],
      checklist: [
      `Antes de começar a mineração com GPU: 1) Confirme sua tarifa de eletricidade. 2) Meça o consumo real de energia da GPU na tomada. 3) Calcule o custo adicional de refrigeração.`,
      `Após calcular: compare com a alternativa de simplesmente comprar e manter a moeda que você teria minerado.`
      ],
      mistakes: [
      `Usar as especificações TDP do fabricante de GPU para consumo de energia.`,
      `Minerar uma única moeda independentemente das mudanças de lucratividade.`
      ],
      benchmarks: [
      `Benchmarks de lucratividade de mineração GPU (2024): GPUs de última geração a $0.05/kWh produzem $3–8/dia minerando Ethereum Classic ou Kaspa.`,
      `Comparação de eficiência de capital: um rig de GPU custando $5.000 produzindo $5/dia = 1000 dias de payback.`
      ],
      execution: [
      `Fluxo de trabalho de configuração de mineração GPU: 1) Faça benchmark do hashrate da GPU usando software de mineração dedicado. 2) Meça o consumo de energia na tomada. 3) Insira os valores nesta calculadora. 4) Compare o lucro líquido diário com usos alternativos da GPU.`,
      `Manutenção de lucratividade: verifique a calculadora semanalmente e compare a moeda minerada atual com as melhores alternativas.`
      ],
      hygiene: [
      `Monitore as temperaturas da GPU durante execuções de mineração prolongadas.`,
      `Registre seus ganhos reais no painel do pool semanalmente e compare com a previsão da calculadora.`
      ],
      validation: [
      `Verifique a produção diária de moedas: (hashrate / hashrate da rede) × recompensa de bloco × blocos por dia = produção diária de moedas.`,
      `Valide o custo de eletricidade: (watts da GPU / 1000) × 24 × tarifa de eletricidade = custo diário de eletricidade.`
      ],
    },
    tr: {
      interpret: [
      `GPU madencilik hesaplayıcısı, hashrate, güç tüketimi, elektrik maliyeti ve havuz ücretlerini hesaba katarak GPU kurulumunuz için günlük, aylık ve yıllık gelir ve kâr çıktılar.`,
      `Geri ödeme süresi (ROI'ye kadar aylar) GPU yatırım kararları için en önemli rakamdır.`
      ],
      scenarios: [
      `GPU satın alma kararı: madencilik için GPU satın almadan önce, satın alma fiyatını, hedef algoritma için beklenen hashrate'i, güç tüketimini ve elektrik tarifenizi girin.`,
      `Algoritma değiştirme analizi: yeni bir coin'in zorluğu lansmanında düşük olduğunda, erken madencilik ortalamanın üzerinde blok ödülleri yakalar.`
      ],
      checklist: [
      `GPU madenciliğe başlamadan önce: 1) Elektrik tarifinizi onaylayın. 2) GPU'nun gerçek duvar güç çekimini ölçün. 3) Ek soğutma maliyetini hesaplayın.`,
      `Hesapladıktan sonra: basitçe madencilik yapacağınız coini satın alıp tutma alternatifiyle karşılaştırın.`
      ],
      mistakes: [
      `GPU üreticisinin TDP spesifikasyonunu güç tüketimi için kullanmak.`,
      `Karlılık değişikliklerine bakılmaksızın tek bir coin madenciliği yapmak.`
      ],
      benchmarks: [
      `GPU madencilik karlılık kıyaslamaları (2024): 0.05 $/kWh'de üst düzey GPU'lar Ethereum Classic veya Kaspa madenciliğinde günlük 3–8 dolar üretir.`,
      `Sermaye verimliliği karşılaştırması: 5.000 dolarlık GPU kulübesi günlük 5 dolar üretirse = 1000 günlük geri ödeme.`
      ],
      execution: [
      `GPU madencilik kurulum iş akışı: 1) Özel madencilik yazılımını kullanarak GPU hashrate'ini kıyaslayın. 2) Tam madencilik yükünde duvar güç tüketimini ölçün. 3) Değerleri bu hesaplayıcıya girin. 4) Net günlük kârı GPU'nun alternatif kullanımlarıyla karşılaştırın.`,
      `Karlılık bakımı: hesaplayıcıyı haftalık olarak kontrol edin ve mevcut madencilik coin'ini en iyi alternatiflerle karşılaştırın.`
      ],
      hygiene: [
      `Uzun süreli madencilik çalışmaları sırasında GPU sıcaklıklarını izleyin.`,
      `Havuz panosundan gerçek kazançlarınızı haftalık olarak kaydedin ve hesaplayıcı tahminiyle karşılaştırın.`
      ],
      validation: [
      `Günlük coin çıktısını doğrulayın: (hashrate / ağ hashrate) × blok ödülü × günlük blok sayısı = günlük coin çıktısı.`,
      `Elektrik maliyetini doğrulayın: (GPU wattı / 1000) × 24 × elektrik tarifesi = günlük elektrik maliyeti.`
      ],
    },
    hi: {
      interpret: [
      `GPU माइनिंग कैलकुलेटर हैशरेट, पावर खपत, बिजली लागत और पूल शुल्क के लिए खाते करते हुए आपके GPU सेटअप के लिए दैनिक, मासिक और वार्षिक राजस्व और लाभ आउटपुट करता है।`,
      `पेबैक अवधि (ROI तक महीने) GPU निवेश निर्णयों के लिए सबसे महत्वपूर्ण आंकड़ा है।`
      ],
      scenarios: [
      `GPU खरीद निर्णय: माइनिंग के लिए GPU खरीदने से पहले, खरीद मूल्य, लक्ष्य एल्गोरिदम के लिए अपेक्षित हैशरेट, पावर खपत और आपकी बिजली दर दर्ज करें।`,
      `एल्गोरिदम स्विचिंग विश्लेषण: जब किसी नए कॉइन की कठिनाई लॉन्च पर कम होती है, तो शुरुआती माइनिंग औसत से ऊपर ब्लॉक रिवार्ड कैप्चर करती है।`
      ],
      checklist: [
      `GPU माइनिंग शुरू करने से पहले: 1) अपनी बिजली दर की पुष्टि करें। 2) वॉल पर GPU की वास्तविक पावर ड्रॉ मापें। 3) अतिरिक्त कूलिंग लागत की गणना करें।`,
      `गणना के बाद: उस कॉइन को खरीदने और रखने के विकल्प से तुलना करें जिसे आपने माइन किया होता।`
      ],
      mistakes: [
      `पावर खपत के लिए GPU निर्माता के TDP स्पेक का उपयोग करना।`,
      `लाभप्रदता परिवर्तनों की परवाह किए बिना एकल कॉइन माइन करना।`
      ],
      benchmarks: [
      `GPU माइनिंग लाभप्रदता बेंचमार्क (2024): $0.05/kWh पर उच्च-अंत GPU Ethereum Classic या Kaspa माइन करके $3–8/दिन उत्पन्न करते हैं।`,
      `पूंजी दक्षता तुलना: $5,000 लागत का GPU रिग $5/दिन उत्पन्न करता है = 1000-दिन पेबैक।`
      ],
      execution: [
      `GPU माइनिंग सेटअप वर्कफ़्लो: 1) समर्पित माइनिंग सॉफ़्टवेयर का उपयोग करके GPU हैशरेट बेंचमार्क करें। 2) पूर्ण माइनिंग लोड पर वॉल पावर ड्रॉ मापें। 3) इस कैलकुलेटर में मान दर्ज करें। 4) नेट दैनिक लाभ की तुलना GPU के वैकल्पिक उपयोगों से करें।`,
      `लाभप्रदता रखरखाव: साप्ताहिक रूप से कैलकुलेटर जांचें और वर्तमान माइनिंग कॉइन की तुलना शीर्ष विकल्पों से करें।`
      ],
      hygiene: [
      `विस्तारित माइनिंग रन के दौरान GPU तापमान की निगरानी करें।`,
      `पूल डैशबोर्ड से अपनी वास्तविक कमाई साप्ताहिक रूप से लॉग करें और कैलकुलेटर की भविष्यवाणी से तुलना करें।`
      ],
      validation: [
      `दैनिक कॉइन आउटपुट सत्यापित करें: (हैशरेट / नेटवर्क हैशरेट) × ब्लॉक रिवार्ड × प्रति दिन ब्लॉक = दैनिक कॉइन आउटपुट।`,
      `बिजली लागत को मान्य करें: (GPU वाट / 1000) × 24 × बिजली दर = दैनिक बिजली लागत।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор GPU-майнинга выводит суточный, месячный и годовой доход и прибыль для вашей GPU-установки с учётом хешрейта, потребления энергии, стоимости электроэнергии и комиссий пула.`,
      `Срок окупаемости (месяцы до ROI) — наиболее важный показатель для инвестиционных решений по GPU.`
      ],
      scenarios: [
      `Решение о покупке GPU: перед приобретением GPU для майнинга введите цену покупки, ожидаемый хешрейт для целевого алгоритма, потребление энергии и ваш тариф на электроэнергию.`,
      `Анализ переключения алгоритмов: когда сложность новой монеты низка при запуске, ранний майнинг захватывает вознаграждения выше среднего.`
      ],
      checklist: [
      `Перед началом GPU-майнинга: 1) Уточните тариф на электроэнергию. 2) Измерьте фактическое потребление GPU от розетки. 3) Рассчитайте дополнительные затраты на охлаждение.`,
      `После расчёта: сравните с альтернативой — просто купить и держать монету, которую вы бы добыли.`
      ],
      mistakes: [
      `Использование TDP-спецификации производителя GPU для расчёта потребления. Реальное потребление при майнинге может быть на 15–30% выше.`,
      `Майнинг одной монеты вне зависимости от изменений доходности.`
      ],
      benchmarks: [
      `Ориентиры доходности GPU-майнинга (2024): высокопроизводительные GPU при $0.05/кВт·ч дают $3–8/сутки при майнинге Ethereum Classic или Kaspa. При $0.10/кВт·ч доходность вдвое ниже.`,
      `Сравнение эффективности капитала: rig стоимостью $5 000 при доходности $5/сутки = 1000 дней окупаемости.`
      ],
      execution: [
      `Процесс настройки GPU-майнинга: 1) Измерьте хешрейт GPU специализированным ПО. 2) Измерьте потребление от розетки при полной нагрузке. 3) Введите данные в калькулятор. 4) Сравните чистую суточную прибыль с альтернативным использованием GPU.`,
      `Поддержание доходности: еженедельно проверяйте калькулятор и сравнивайте текущую монету с топ-3–5 альтернативными алгоритмами.`
      ],
      hygiene: [
      `Следите за температурой GPU при длительном майнинге. Оптимизируйте кривые вентилятора и рассмотрите андервольтинг.`,
      `Еженедельно фиксируйте фактические заработки из дашборда пула и сравнивайте с прогнозом калькулятора.`
      ],
      validation: [
      `Проверьте суточный объём добычи монет: (хешрейт / хешрейт сети) × вознаграждение за блок × блоков в сутки = суточный объём монет. Сравните с дашбордом пула.`,
      `Проверьте стоимость электроэнергии: (Вт GPU / 1000) × 24 × тариф = суточные затраты на электроэнергию.`
      ],
    },
  },
  'asic-mining-calculator': {
    en: {
      interpret: [
      `The ASIC mining calculator outputs profitability for application-specific integrated circuit miners, which are purpose-built for a single hashing algorithm (SHA-256 for Bitcoin, Scrypt for Litecoin, X11 for Dash, etc.). Unlike GPU miners, ASICs cannot switch algorithms — their profitability is entirely dependent on one coin's price, difficulty, and block reward. The calculator's primary output is daily net profit after electricity, which tells you how many dollars per day the machine earns at current conditions.`,
      `The "days to break even" metric is the most actionable for ASIC investment decisions. Hardware pays for itself when (daily net profit × days) = hardware purchase price. At current conditions, if break-even exceeds 18 months, the investment carries significant risk because: 1) coin price may fall further; 2) network difficulty will increase as more ASICs deploy; 3) the next halving may cut block rewards. Always model break-even at 50% current coin price.`
      ],
      scenarios: [
      `New ASIC purchase evaluation: enter the miner's hashrate (TH/s for Bitcoin, GH/s for Litecoin, etc.), power consumption, purchase price, and your electricity rate. Run the break-even analysis at current price, 50% below current, and 30% below current. If break-even exceeds 24 months even at current price, the investment is highly speculative.`,
      `Existing ASIC shutdown threshold: for miners you already own, the shutdown price is the coin price at which electricity cost equals mining revenue. Below this price, you pay more in electricity than you earn — mining is destroying capital. Calculate this threshold and set a price alert to notify you when to power down.`
      ],
      checklist: [
      `Before buying an ASIC: 1) Verify ASIC availability — secondary market prices often reflect manufacturer MSRP plus significant premium during bull markets. 2) Calculate the network's current hash difficulty growth rate (published monthly by mining analytics sites). 3) Factor in the next halving date and its impact on block rewards for the target coin.`,
      `After calculating initial profitability: run a 6-month and 12-month projection assuming 5% monthly difficulty growth. If 12-month average profit remains positive after this growth assumption, the investment maintains reasonable return.`
      ],
      mistakes: [
      `Buying ASICs at market cycle peaks when prices and profitability are highest. ASICs ordered during bull markets often arrive 3–6 months later (manufacturer lead times), by which time the coin may be in a bear market and profitability negative. Time ASIC purchases to coin bear markets when hardware prices are depressed.`,
      `Ignoring ASIC resale depreciation in ROI calculations. Bitcoin ASICs lose 70–90% of value in the first 18–24 months as newer, more efficient models release. Factor this depreciation into your total cost model — the machine's value at the end of your mining period matters.`
      ],
      benchmarks: [
      `Bitcoin ASIC efficiency benchmarks (2024): frontier machines (Antminer S21, WhatsMiner M60) achieve 16–22 J/TH efficiency. Previous generation (Antminer S19 Pro) runs at 29.5 J/TH. At $0.05/kWh, S21-class miners generate $8–15/day net profit per unit at $60,000 BTC. At $0.10/kWh, profitability halves.`,
      `For institutional viability, break-even under 12 months at current prices is the industry benchmark. Retail miners with higher electricity rates (above $0.08/kWh) find it difficult to compete with industrial operations at $0.02–0.04/kWh, which become profitable even in bear markets.`
      ],
      execution: [
      `ASIC profitability workflow: 1) Get exact specs (hashrate, power draw) from the manufacturer test report, not marketing materials. 2) Confirm your electricity rate including demand charges if applicable. 3) Enter current network difficulty and projection. 4) Calculate break-even at current and 50% lower price. 5) Compare to buying and holding equivalent BTC for the same capital.`,
      `Halving preparation: 6 months before the next halving, re-run this calculator with 50% block reward as input. If profitability at halved reward + expected difficulty reduction is still positive at your electricity rate, mining through the halving is rational; otherwise, plan to sell the ASIC before the halving, when market prices are still inflated.`
      ],
      hygiene: [
      `Monitor actual power consumption monthly using smart plugs with energy monitoring. ASIC power draw can creep up 5–10% as chips age and thermal paste degrades — recalibrate your electricity cost estimate accordingly.`,
      `Track hashrate output daily via pool dashboard. A sudden hashrate drop (>5%) without hardware changes indicates chip degradation, overheating, or firmware issues. Addressing these early prevents permanent efficiency loss.`
      ],
      validation: [
      `Verify miner output: connect the ASIC to a mining pool and check the pool's reported hashrate against the manufacturer spec. Consistent 5%+ variance below spec indicates miner issues. Cross-check against the calculator's daily coin output for the same pool efficiency factor.`,
      `Validate break-even formula: (hardware cost) / (daily net profit) = days to break even. For a $3,000 ASIC earning $10/day net: 3,000/10 = 300 days. Confirm the calculator shows the same figure.`
      ],
    },
    es: {
      interpret: [
      `El calculador de minería ASIC produce rentabilidad para mineros de circuito integrado de aplicación específica, que están construidos específicamente para un único algoritmo de hashing.`,
      `El "días para recuperar la inversión" es la métrica más accionable para las decisiones de inversión en ASIC.`
      ],
      scenarios: [
      `Evaluación de compra de nuevo ASIC: introduce el hashrate del minero, el consumo de energía, el precio de compra y tu tarifa eléctrica. Ejecuta el análisis de recuperación al precio actual, un 50% por debajo y un 30% por debajo.`,
      `Umbral de apagado del ASIC existente: el precio de apagado es el precio de la moneda al que el coste de electricidad es igual a los ingresos de minería.`
      ],
      checklist: [
      `Antes de comprar un ASIC: 1) Verifica la disponibilidad del ASIC. 2) Calcula la tasa de crecimiento de dificultad de hash de la red actual. 3) Ten en cuenta la próxima fecha de halving y su impacto en las recompensas de bloque.`,
      `Después de calcular la rentabilidad inicial: ejecuta una proyección de 6 meses y 12 meses asumiendo un crecimiento de dificultad mensual del 5%.`
      ],
      mistakes: [
      `Comprar ASICs en los picos del ciclo de mercado cuando los precios y la rentabilidad son más altos.`,
      `Ignorar la depreciación de reventa del ASIC en los cálculos de ROI.`
      ],
      benchmarks: [
      `Benchmarks de eficiencia de ASIC de Bitcoin (2024): máquinas de frontera logran una eficiencia de 16–22 J/TH.`,
      `Para viabilidad institucional, la recuperación en menos de 12 meses al precio actual es el benchmark de la industria.`
      ],
      execution: [
      `Flujo de trabajo de rentabilidad de ASIC: 1) Obtén especificaciones exactas del informe de prueba del fabricante. 2) Confirma tu tarifa eléctrica. 3) Introduce la dificultad de red actual y la proyección. 4) Calcula la recuperación al precio actual y un 50% por debajo.`,
      `Preparación para el halving: 6 meses antes del próximo halving, vuelve a ejecutar este calculador con el 50% de la recompensa de bloque como entrada.`
      ],
      hygiene: [
      `Monitoriza el consumo real de energía mensualmente usando enchufes inteligentes con monitoreo de energía.`,
      `Rastrea la producción de hashrate diariamente a través del panel del pool.`
      ],
      validation: [
      `Verifica la producción del minero: conecta el ASIC a un pool de minería y comprueba el hashrate reportado por el pool.`,
      `Valida la fórmula de recuperación: (coste de hardware) / (beneficio neto diario) = días para recuperar la inversión.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de mineração ASIC produz lucratividade para mineradores de circuito integrado de aplicação específica, construídos especificamente para um único algoritmo de hashing.`,
      `A métrica "dias para recuperar o investimento" é a mais acionável para decisões de investimento em ASIC.`
      ],
      scenarios: [
      `Avaliação de compra de novo ASIC: insira o hashrate do minerador, consumo de energia, preço de compra e sua tarifa de eletricidade.`,
      `Limiar de desligamento do ASIC existente: o preço de desligamento é o preço da moeda no qual o custo de eletricidade iguala a receita de mineração.`
      ],
      checklist: [
      `Antes de comprar um ASIC: 1) Verifique a disponibilidade do ASIC. 2) Calcule a taxa de crescimento de dificuldade de hash da rede atual. 3) Considere a próxima data de halving.`,
      `Após calcular a lucratividade inicial: execute uma projeção de 6 e 12 meses assumindo crescimento mensal de 5% na dificuldade.`
      ],
      mistakes: [
      `Comprar ASICs nos picos do ciclo de mercado.`,
      `Ignorar a depreciação de revenda do ASIC nos cálculos de ROI.`
      ],
      benchmarks: [
      `Benchmarks de eficiência de ASIC Bitcoin (2024): máquinas de fronteira alcançam eficiência de 16–22 J/TH.`,
      `Para viabilidade institucional, payback abaixo de 12 meses ao preço atual é o benchmark da indústria.`
      ],
      execution: [
      `Fluxo de trabalho de lucratividade ASIC: 1) Obtenha especificações exatas do relatório de teste do fabricante. 2) Confirme sua tarifa de eletricidade. 3) Insira a dificuldade atual da rede e projeção. 4) Calcule o payback ao preço atual e 50% abaixo.`,
      `Preparação para o halving: 6 meses antes do próximo halving, execute novamente esta calculadora com 50% da recompensa de bloco.`
      ],
      hygiene: [
      `Monitore o consumo real de energia mensalmente usando tomadas inteligentes.`,
      `Acompanhe a produção de hashrate diariamente pelo painel do pool.`
      ],
      validation: [
      `Verifique a produção do minerador conectando o ASIC a um pool de mineração.`,
      `Valide a fórmula de payback: (custo de hardware) / (lucro líquido diário) = dias para payback.`
      ],
    },
    tr: {
      interpret: [
      `ASIC madencilik hesaplayıcısı, tek bir hash algoritması için özel olarak üretilmiş uygulama özel entegre devre madencilerin karlılığını çıktılar.`,
      `"Başabaşa ulaşma günleri" metriği, ASIC yatırım kararları için en işlemsel olanıdır.`
      ],
      scenarios: [
      `Yeni ASIC satın alma değerlendirmesi: madencinin hashrate'ini, güç tüketimini, satın alma fiyatını ve elektrik tarifinizi girin. Mevcut fiyatta, %50 düşükte ve %30 düşükte başabaş analizini çalıştırın.`,
      `Mevcut ASIC kapatma eşiği: kapatma fiyatı, elektrik maliyetinin madencilik gelirine eşit olduğu coin fiyatıdır.`
      ],
      checklist: [
      `ASIC satın almadan önce: 1) ASIC kullanılabilirliğini doğrulayın. 2) Ağın mevcut hash zorluğu büyüme oranını hesaplayın. 3) Sonraki halving tarihini ve blok ödülleri üzerindeki etkisini hesaba katın.`,
      `Başlangıç karlılığını hesapladıktan sonra: aylık %5 zorluk büyümesi varsayarak 6 aylık ve 12 aylık bir projeksiyon çalıştırın.`
      ],
      mistakes: [
      `Fiyatlar ve karlılık en yüksek olduğunda piyasa döngüsü zirvelerinde ASIC satın almak.`,
      `ROI hesaplamalarında ASIC ikinci el değer kaybını görmezden gelmek.`
      ],
      benchmarks: [
      `Bitcoin ASIC verimlilik kıyaslamaları (2024): sınır makineleri %16–22 J/TH verimliliği elde eder.`,
      `Kurumsal uygulanabilirlik için mevcut fiyatlarda 12 ayın altında başabaş sektör kıyaslamasıdır.`
      ],
      execution: [
      `ASIC karlılık iş akışı: 1) Üreticinin test raporundan tam özellikleri alın. 2) Elektrik tarifinizi onaylayın. 3) Mevcut ağ zorluğunu ve projeksiyonu girin. 4) Mevcut ve %50 daha düşük fiyatta başabaşı hesaplayın.`,
      `Halving hazırlığı: bir sonraki halving'den 6 ay önce, blok ödülünün %50'si giriş olarak bu hesaplayıcıyı yeniden çalıştırın.`
      ],
      hygiene: [
      `Enerji izleme özellikli akıllı fiş kullanarak gerçek güç tüketimini aylık olarak izleyin.`,
      `Havuz panosu aracılığıyla hashrate çıktısını günlük olarak takip edin.`
      ],
      validation: [
      `Madenci çıktısını doğrulayın: ASIC'i bir madencilik havuzuna bağlayın ve havuzun bildirilen hashrate'ini üretici spesifikasyonuyla karşılaştırın.`,
      `Başabaş formülünü doğrulayın: (donanım maliyeti) / (günlük net kâr) = başabaşa ulaşma günleri.`
      ],
    },
    hi: {
      interpret: [
      `ASIC माइनिंग कैलकुलेटर एप्लिकेशन-स्पेसिफिक इंटीग्रेटेड सर्किट माइनर्स के लिए लाभप्रदता आउटपुट करता है, जो एकल हैशिंग एल्गोरिदम के लिए उद्देश्य-निर्मित हैं।`,
      `"ब्रेक इवन के लिए दिन" मेट्रिक ASIC निवेश निर्णयों के लिए सबसे कार्रवाई योग्य है।`
      ],
      scenarios: [
      `नए ASIC खरीद मूल्यांकन: माइनर का हैशरेट, पावर खपत, खरीद मूल्य और आपकी बिजली दर दर्ज करें। वर्तमान मूल्य, 50% नीचे और 30% नीचे ब्रेक-ईवन विश्लेषण चलाएं।`,
      `मौजूदा ASIC शटडाउन थ्रेशोल्ड: शटडाउन मूल्य वह कॉइन मूल्य है जिस पर बिजली लागत माइनिंग राजस्व के बराबर होती है।`
      ],
      checklist: [
      `ASIC खरीदने से पहले: 1) ASIC उपलब्धता सत्यापित करें। 2) नेटवर्क के वर्तमान हैश कठिनाई वृद्धि दर की गणना करें। 3) अगली हाल्विंग तारीख और ब्लॉक रिवार्ड पर इसके प्रभाव के लिए खाता करें।`,
      `प्रारंभिक लाभप्रदता की गणना के बाद: 5% मासिक कठिनाई वृद्धि मानते हुए 6-महीने और 12-महीने का अनुमान चलाएं।`
      ],
      mistakes: [
      `बाजार चक्र के शिखर पर ASIC खरीदना जब कीमतें और लाभप्रदता सबसे अधिक हो।`,
      `ROI गणनाओं में ASIC पुनर्बिक्री मूल्यह्रास को नजरअंदाज करना।`
      ],
      benchmarks: [
      `Bitcoin ASIC दक्षता बेंचमार्क (2024): फ्रंटियर मशीनें 16–22 J/TH दक्षता प्राप्त करती हैं।`,
      `संस्थागत व्यवहार्यता के लिए, वर्तमान कीमतों पर 12 महीनों से कम में ब्रेक-ईवन उद्योग बेंचमार्क है।`
      ],
      execution: [
      `ASIC लाभप्रदता वर्कफ़्लो: 1) निर्माता परीक्षण रिपोर्ट से सटीक स्पेक प्राप्त करें। 2) अपनी बिजली दर की पुष्टि करें। 3) वर्तमान नेटवर्क कठिनाई और प्रक्षेपण दर्ज करें। 4) वर्तमान और 50% कम मूल्य पर ब्रेक-ईवन की गणना करें।`,
      `हाल्विंग तैयारी: अगली हाल्विंग से 6 महीने पहले, इनपुट के रूप में 50% ब्लॉक रिवार्ड के साथ इस कैलकुलेटर को पुनः चलाएं।`
      ],
      hygiene: [
      `एनर्जी मॉनिटरिंग के साथ स्मार्ट प्लग का उपयोग करके वास्तविक पावर खपत मासिक रूप से निगरानी करें।`,
      `पूल डैशबोर्ड के माध्यम से दैनिक रूप से हैशरेट आउटपुट ट्रैक करें।`
      ],
      validation: [
      `माइनर आउटपुट सत्यापित करें: ASIC को माइनिंग पूल से कनेक्ट करें और पूल के रिपोर्ट किए गए हैशरेट को निर्माता स्पेक के विरुद्ध जांचें।`,
      `ब्रेक-ईवन फॉर्मूला मान्य करें: (हार्डवेयर लागत) / (दैनिक नेट लाभ) = ब्रेक-ईवन के लिए दिन।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор ASIC-майнинга выводит доходность для специализированных интегральных схем, предназначенных для единственного алгоритма хеширования (SHA-256 для Bitcoin и т.д.). В отличие от GPU, ASIC не могут переключаться — их доходность полностью зависит от цены одной монеты, сложности и вознаграждения за блок.`,
      `Метрика "дней до окупаемости" наиболее важна для инвестиционных решений по ASIC. Оборудование окупается, когда (чистая суточная прибыль × дни) = цена покупки. При ожидании окупаемости свыше 18 месяцев инвестиция несёт значительный риск.`
      ],
      scenarios: [
      `Оценка покупки нового ASIC: введите хешрейт, потребление энергии, цену покупки и тариф на электроэнергию. Запустите анализ окупаемости при текущей цене, -50% и -30%.`,
      `Порог отключения существующего ASIC: это цена монеты, при которой стоимость электроэнергии равна доходу от майнинга.`
      ],
      checklist: [
      `Перед покупкой ASIC: 1) Проверьте наличие ASIC. 2) Рассчитайте текущий темп роста сложности сети. 3) Учтите следующую дату халвинга и его влияние на вознаграждения за блок.`,
      `После расчёта начальной доходности: выполните 6- и 12-месячный прогноз, предполагая 5% ежемесячный рост сложности.`
      ],
      mistakes: [
      `Покупка ASIC на пиках рыночного цикла, когда цены и доходность максимальны. ASIC, заказанные во время бычьего рынка, часто поступают через 3–6 месяцев, когда монета может уже находиться в медвежьем рынке.`,
      `Игнорирование амортизации ASIC при расчёте ROI. Bitcoin ASIC теряют 70–90% стоимости в первые 18–24 месяца.`
      ],
      benchmarks: [
      `Ориентиры эффективности Bitcoin ASIC (2024): передовые машины (Antminer S21, WhatsMiner M60) достигают 16–22 Дж/ТХ. При $0.05/кВт·ч генерируют $8–15/сут чистой прибыли на единицу при BTC $60 000.`,
      `Для институциональной жизнеспособности, окупаемость менее 12 месяцев при текущих ценах — отраслевой ориентир.`
      ],
      execution: [
      `Процесс оценки доходности ASIC: 1) Получите точные характеристики из протокола испытаний производителя. 2) Подтвердите тариф на электроэнергию. 3) Введите текущую сложность сети и прогноз. 4) Рассчитайте окупаемость при текущей и 50% более низкой цене.`,
      `Подготовка к халвингу: за 6 месяцев до следующего халвинга запустите калькулятор с 50% вознаграждения за блок.`
      ],
      hygiene: [
      `Ежемесячно контролируйте фактическое потребление энергии с помощью умных розеток с мониторингом энергопотребления.`,
      `Ежедневно отслеживайте хешрейт через дашборд пула.`
      ],
      validation: [
      `Проверьте вывод майнера: подключите ASIC к майнинговому пулу и сравните сообщаемый хешрейт со спецификацией производителя.`,
      `Проверьте формулу окупаемости: (стоимость оборудования) / (чистая суточная прибыль) = дней до окупаемости.`
      ],
    },
  },
  'mining-roi-calculator': {
    en: {
      interpret: [
      `The mining ROI calculator computes your total return on mining investment over a specified period, combining revenue earned, electricity costs paid, hardware depreciation, and pool fees. Unlike simple profitability calculators, ROI analysis accounts for the full lifecycle of the investment: you begin with a hardware cost outlay and end with (revenue − all operating costs + hardware resale value). The final ROI percentage tells you whether mining outperformed simply buying and holding the same coin.`,
      `The comparison output (mining ROI vs. buy-and-hold ROI) is the most strategically valuable metric. If coin price increased 3× over your mining period and your mining ROI is only 50%, buy-and-hold significantly outperformed. This comparison shifts based on electricity rate: at very low electricity rates, mining can outperform holding because you acquire coins at below-market cost through operational leverage.`
      ],
      scenarios: [
      `Full lifecycle ROI analysis: enter your initial hardware cost, 12–24 months of projected electricity cost, pool fees, and estimated hardware resale value at end of period. The ROI comparison to buy-and-hold (using the same starting capital) reveals whether your mining operation created alpha or merely tracked coin price with operational complexity.`,
      `Sensitivity analysis: run the ROI calculation at three coin price scenarios (current, +50%, -50%) and three electricity rate scenarios ($0.05, $0.08, $0.12/kWh). This 3×3 matrix reveals which combinations produce positive ROI and how resilient your operation is to adverse price or cost changes.`
      ],
      checklist: [
      `For accurate ROI calculation: 1) Include all one-time setup costs (cooling equipment, racking, facility modifications). 2) Include ongoing costs beyond electricity: internet, replacement parts, maintenance labor. 3) Use conservative hardware resale value estimates (40–50% of new price after 12 months for ASICs; 60–70% for GPUs).`,
      `After calculating ROI: compare to the risk-free return over the same period (treasury bill rate × period). If mining ROI is below the risk-free rate, the investment created negative alpha relative to the safest alternative.`
      ],
      mistakes: [
      `Using optimistic hardware resale values. The secondary market for mining hardware is highly cyclical — hardware sells at premium prices during bull markets but may be worth 20–30% of new price in a bear market when the entire mining industry is distressed. Use a conservative 30–40% resale assumption for multi-year ROI modeling.`,
      `Not including setup costs in ROI. If you spent $500 on a cooling upgrade, $200 on network equipment, and 20 hours of setup labor (opportunity cost), these reduce your total ROI. Omitting them overstates the return.`
      ],
      benchmarks: [
      `Historical mining ROI benchmarks: Bitcoin miners who started operations at the 2020 halving earned 300–1000% ROI over 2 years due to price appreciation. Miners who started at 2021 peak often had negative ROI by 2022. The variance is extremely high — mining ROI is more dependent on timing than operational efficiency.`,
      `Target ROI thresholds: for retail miners (higher electricity cost), target ROI above 100% (double your investment) over 18 months to justify the risk. Institutional miners with $0.02–0.04/kWh electricity can profitably mine at lower price levels and still achieve 50%+ ROI over 12 months.`
      ],
      execution: [
      `ROI tracking workflow: 1) Record all capital expenditures at start (hardware, setup). 2) Log monthly operating expenses (electricity, pool fees, maintenance). 3) Record monthly revenue from mining (in both coin and USD). 4) At end of period, add hardware resale value. 5) Calculate: (total revenue + resale − total costs) / initial capital = ROI percentage.`,
      `Compare to buy-and-hold: calculate what the initial capital (hardware + setup cost) would be worth today if you had bought the mined coin instead on day 1. If mining ROI < buy-and-hold ROI by more than 20%, the operational complexity of mining was not justified.`
      ],
      hygiene: [
      `Update the ROI projection monthly with actual (not estimated) electricity bills and pool earnings. Reality diverges from initial projections — typically electricity costs more and revenue is slightly less than calculated due to network difficulty growth.`,
      `Document all hardware maintenance events (chip replacement, PSU failure, cooling fixes) with costs and downtime. These are often excluded from initial ROI models but can represent 5–15% of hardware cost over a 2-year operation.`
      ],
      validation: [
      `Verify ROI formula: (net profit over period + hardware resale value − hardware purchase price) / hardware purchase price = ROI. For a $3,000 ASIC that earned $4,200 net over 18 months and sold for $800: ($4,200 + $800 − $3,000) / $3,000 = 66.7% ROI. Match to calculator output.`,
      `Cross-check against your actual bank account delta: (ending bank balance − beginning bank balance for mining-related accounts) = realized net profit. This real-money figure should approximately match the calculator's net profit output if all costs and revenues were captured correctly.`
      ],
    },
    es: {
      interpret: [
      `El calculador de ROI de minería calcula tu retorno total sobre la inversión en minería durante un período especificado, combinando ingresos ganados, costes de electricidad pagados, depreciación de hardware y comisiones del pool.`,
      `La salida de comparación (ROI de minería vs. ROI de compra y mantenimiento) es la métrica más valiosa estratégicamente.`
      ],
      scenarios: [
      `Análisis de ROI del ciclo de vida completo: introduce tu coste inicial de hardware, los costes de electricidad proyectados de 12–24 meses, las comisiones del pool y el valor de reventa estimado del hardware al final del período.`,
      `Análisis de sensibilidad: ejecuta el cálculo de ROI en tres escenarios de precio de moneda y tres escenarios de tarifa eléctrica.`
      ],
      checklist: [
      `Para un cálculo preciso del ROI: 1) Incluye todos los costes de configuración únicos. 2) Incluye costes continuos más allá de la electricidad. 3) Usa estimaciones conservadoras de valor de reventa de hardware.`,
      `Después de calcular el ROI: compara con el retorno libre de riesgo durante el mismo período.`
      ],
      mistakes: [
      `Usar valores de reventa de hardware optimistas.`,
      `No incluir los costes de configuración en el ROI.`
      ],
      benchmarks: [
      `Benchmarks históricos de ROI de minería: los mineros de Bitcoin que comenzaron operaciones en el halving de 2020 ganaron un ROI del 300–1000% en 2 años debido a la apreciación del precio.`,
      `Umbrales de ROI objetivo: para mineros minoristas, apunta a un ROI superior al 100% en 18 meses para justificar el riesgo.`
      ],
      execution: [
      `Flujo de trabajo de seguimiento del ROI: 1) Registra todos los gastos de capital al inicio. 2) Registra los gastos operativos mensuales. 3) Registra los ingresos mensuales de la minería. 4) Al final del período, añade el valor de reventa del hardware.`,
      `Compara con compra y mantenimiento: calcula cuánto valdría el capital inicial si hubieras comprado la moneda minada el día 1.`
      ],
      hygiene: [
      `Actualiza la proyección de ROI mensualmente con facturas de electricidad y ganancias del pool reales.`,
      `Documenta todos los eventos de mantenimiento de hardware con costes y tiempo de inactividad.`
      ],
      validation: [
      `Verifica la fórmula de ROI: (beneficio neto durante el período + valor de reventa del hardware − precio de compra del hardware) / precio de compra del hardware = ROI.`,
      `Verifica con el delta real de tu cuenta bancaria.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de ROI de mineração calcula seu retorno total sobre o investimento em mineração durante um período especificado.`,
      `A saída de comparação (ROI de mineração vs. ROI de compra e manutenção) é a métrica mais estrategicamente valiosa.`
      ],
      scenarios: [
      `Análise de ROI do ciclo de vida completo: insira seu custo inicial de hardware, custos de eletricidade projetados de 12–24 meses, taxas do pool e valor de revenda estimado do hardware.`,
      `Análise de sensibilidade: execute o cálculo de ROI em três cenários de preço de moeda e três cenários de tarifa de eletricidade.`
      ],
      checklist: [
      `Para cálculo preciso de ROI: 1) Inclua todos os custos únicos de configuração. 2) Inclua custos contínuos além da eletricidade. 3) Use estimativas conservadoras de valor de revenda de hardware.`,
      `Após calcular o ROI: compare com o retorno livre de risco durante o mesmo período.`
      ],
      mistakes: [
      `Usar valores de revenda de hardware otimistas.`,
      `Não incluir custos de configuração no ROI.`
      ],
      benchmarks: [
      `Benchmarks históricos de ROI de mineração: mineradores de Bitcoin que iniciaram operações no halving de 2020 ganharam ROI de 300–1000% em 2 anos.`,
      `Limiares de ROI alvo: para mineradores de varejo, vise ROI acima de 100% em 18 meses para justificar o risco.`
      ],
      execution: [
      `Fluxo de trabalho de rastreamento de ROI: 1) Registre todas as despesas de capital no início. 2) Registre despesas operacionais mensais. 3) Registre receita mensal de mineração. 4) No final do período, adicione o valor de revenda do hardware.`,
      `Compare com compra e manutenção: calcule quanto valeria o capital inicial se você tivesse comprado a moeda minerada no dia 1.`
      ],
      hygiene: [
      `Atualize a projeção de ROI mensalmente com contas de eletricidade reais e ganhos do pool.`,
      `Documente todos os eventos de manutenção de hardware com custos e tempo de inatividade.`
      ],
      validation: [
      `Verifique a fórmula de ROI: (lucro líquido no período + valor de revenda do hardware − preço de compra do hardware) / preço de compra do hardware = ROI.`,
      `Verifique com o delta real da sua conta bancária.`
      ],
    },
    tr: {
      interpret: [
      `Madencilik ROI hesaplayıcısı, kazanılan geliri, ödenen elektrik maliyetlerini, donanım amortismanını ve havuz ücretlerini birleştirerek belirli bir süre boyunca madencilik yatırımınızın toplam getirisini hesaplar.`,
      `Karşılaştırma çıktısı (madencilik ROI'si ile satın al ve tut ROI'si) en stratejik açıdan değerli metriktir.`
      ],
      scenarios: [
      `Tam yaşam döngüsü ROI analizi: başlangıç donanım maliyetinizi, 12–24 aylık tahmini elektrik maliyetini, havuz ücretlerini ve dönem sonunda tahmini donanım ikinci el değerini girin.`,
      `Duyarlılık analizi: üç coin fiyatı senaryosu ve üç elektrik tarihi senaryosunda ROI hesaplamasını çalıştırın.`
      ],
      checklist: [
      `Doğru ROI hesabı için: 1) Tüm tek seferlik kurulum maliyetlerini dahil edin. 2) Elektriğin ötesindeki devam eden maliyetleri dahil edin. 3) Muhafazakâr donanım ikinci el değeri tahminleri kullanın.`,
      `ROI'yi hesapladıktan sonra: aynı dönemde risksiz getiriyle karşılaştırın.`
      ],
      mistakes: [
      `İyimser donanım ikinci el değerleri kullanmak.`,
      `ROI'ye kurulum maliyetlerini dahil etmemek.`
      ],
      benchmarks: [
      `Tarihsel madencilik ROI kıyaslamaları: 2020 halvinginde operasyona başlayan Bitcoin madencileri, fiyat değerlenmesi nedeniyle 2 yılda %300–1000 ROI kazandı.`,
      `Hedef ROI eşikleri: perakende madenciler için riski haklı çıkarmak adına 18 ayda %100'ün üzerinde ROI hedefleyin.`
      ],
      execution: [
      `ROI takip iş akışı: 1) Başlangıçta tüm sermaye harcamalarını kaydedin. 2) Aylık işletme giderlerini kaydedin. 3) Aylık madencilik gelirini kaydedin. 4) Dönem sonunda donanım ikinci el değerini ekleyin.`,
      `Satın al ve tut ile karşılaştırın: başlangıç sermayesini 1. gün maden edilen coini satın almak için kullansaydınız ne kadar değerinde olacağını hesaplayın.`
      ],
      hygiene: [
      `ROI projeksiyonunu gerçek elektrik faturaları ve havuz kazançlarıyla aylık olarak güncelleyin.`,
      `Tüm donanım bakım olaylarını maliyetler ve kesinti süresiyle belgeleyin.`
      ],
      validation: [
      `ROI formülünü doğrulayın: (dönem boyunca net kâr + donanım ikinci el değeri − donanım satın alma fiyatı) / donanım satın alma fiyatı = ROI.`,
      `Gerçek banka hesabı deltanızla çapraz kontrol yapın.`
      ],
    },
    hi: {
      interpret: [
      `माइनिंग ROI कैलकुलेटर अर्जित राजस्व, भुगतान की गई बिजली लागत, हार्डवेयर मूल्यह्रास और पूल शुल्क को मिलाकर एक निर्दिष्ट अवधि में आपके माइनिंग निवेश पर कुल रिटर्न की गणना करता है।`,
      `तुलना आउटपुट (माइनिंग ROI बनाम बाय-एंड-होल्ड ROI) सबसे रणनीतिक रूप से मूल्यवान मेट्रिक है।`
      ],
      scenarios: [
      `पूर्ण जीवनचक्र ROI विश्लेषण: अपनी प्रारंभिक हार्डवेयर लागत, 12–24 महीनों की अनुमानित बिजली लागत, पूल शुल्क और अवधि के अंत में अनुमानित हार्डवेयर पुनर्बिक्री मूल्य दर्ज करें।`,
      `संवेदनशीलता विश्लेषण: तीन कॉइन मूल्य परिदृश्यों और तीन बिजली दर परिदृश्यों में ROI गणना चलाएं।`
      ],
      checklist: [
      `सटीक ROI गणना के लिए: 1) सभी एकमुश्त सेटअप लागतें शामिल करें। 2) बिजली से परे चल रही लागतें शामिल करें। 3) रूढ़िवादी हार्डवेयर पुनर्बिक्री मूल्य अनुमानों का उपयोग करें।`,
      `ROI की गणना के बाद: उसी अवधि में जोखिम-मुक्त रिटर्न से तुलना करें।`
      ],
      mistakes: [
      `आशावादी हार्डवेयर पुनर्बिक्री मूल्यों का उपयोग करना।`,
      `ROI में सेटअप लागत शामिल न करना।`
      ],
      benchmarks: [
      `ऐतिहासिक माइनिंग ROI बेंचमार्क: जिन Bitcoin माइनर्स ने 2020 हाल्विंग पर ऑपरेशन शुरू किया, उन्होंने मूल्य वृद्धि के कारण 2 वर्षों में 300–1000% ROI अर्जित किया।`,
      `लक्ष्य ROI थ्रेशोल्ड: खुदरा माइनर्स के लिए, जोखिम को उचित ठहराने के लिए 18 महीनों में 100% से ऊपर ROI का लक्ष्य रखें।`
      ],
      execution: [
      `ROI ट्रैकिंग वर्कफ़्लो: 1) शुरुआत में सभी पूंजी व्यय रिकॉर्ड करें। 2) मासिक परिचालन खर्च लॉग करें। 3) माइनिंग से मासिक राजस्व रिकॉर्ड करें। 4) अवधि के अंत में हार्डवेयर पुनर्बिक्री मूल्य जोड़ें।`,
      `बाय-एंड-होल्ड से तुलना करें: गणना करें कि यदि आपने दिन 1 पर माइन किए गए कॉइन को खरीदा होता तो प्रारंभिक पूंजी कितनी होती।`
      ],
      hygiene: [
      `वास्तविक बिजली बिलों और पूल कमाई के साथ ROI अनुमान मासिक रूप से अपडेट करें।`,
      `सभी हार्डवेयर रखरखाव घटनाओं को लागत और डाउनटाइम के साथ दस्तावेज़ित करें।`
      ],
      validation: [
      `ROI फॉर्मूला सत्यापित करें: (अवधि में नेट लाभ + हार्डवेयर पुनर्बिक्री मूल्य − हार्डवेयर खरीद मूल्य) / हार्डवेयर खरीद मूल्य = ROI।`,
      `अपने वास्तविक बैंक खाते के डेल्टा के साथ क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор ROI майнинга вычисляет общий доход от майнинговых инвестиций за указанный период, объединяя заработанный доход, расходы на электроэнергию, амортизацию оборудования и комиссии пула.`,
      `Вывод сравнения (ROI майнинга vs. ROI "купи и держи") — наиболее стратегически ценный показатель.`
      ],
      scenarios: [
      `Анализ ROI полного жизненного цикла: введите начальную стоимость оборудования, прогнозируемые затраты на электроэнергию за 12–24 месяца, комиссии пула и ожидаемую стоимость перепродажи оборудования.`,
      `Анализ чувствительности: запустите расчёт ROI при трёх ценовых сценариях и трёх тарифах на электроэнергию.`
      ],
      checklist: [
      `Для точного расчёта ROI: 1) Включите все единовременные расходы на запуск. 2) Учтите регулярные расходы сверх электроэнергии. 3) Используйте консервативные оценки стоимости перепродажи оборудования.`,
      `После расчёта ROI: сравните с безрисковой доходностью за тот же период.`
      ],
      mistakes: [
      `Использование оптимистичных оценок стоимости перепродажи оборудования. Вторичный рынок для майнингового оборудования высоко цикличен.`,
      `Отсутствие затрат на запуск в расчёте ROI.`
      ],
      benchmarks: [
      `Исторические ориентиры ROI майнинга: Bitcoin-майнеры, начавшие работу на халвинге 2020 г., заработали 300–1000% ROI за 2 года благодаря росту цены. Майнеры, начавшие на пике 2021 г., часто имели отрицательный ROI к 2022 г.`,
      `Целевые пороги ROI: для розничных майнеров (более высокий тариф) цельтесь в ROI выше 100% за 18 месяцев.`
      ],
      execution: [
      `Процесс отслеживания ROI: 1) Зафиксируйте все капитальные расходы на старте. 2) Ежемесячно записывайте операционные расходы. 3) Ежемесячно фиксируйте доход от майнинга. 4) В конце периода добавьте стоимость перепродажи оборудования. 5) ROI = (суммарный доход + перепродажа − суммарные затраты) / начальный капитал.`,
      `Сравните с "купи и держи": рассчитайте, сколько бы стоил начальный капитал (оборудование + запуск), если бы вы купили майнимую монету в день 1.`
      ],
      hygiene: [
      `Ежемесячно обновляйте прогноз ROI фактическими счетами за электроэнергию и доходами пула.`,
      `Документируйте все события технического обслуживания оборудования с затратами и простоем.`
      ],
      validation: [
      `Проверьте формулу ROI: (чистая прибыль за период + стоимость перепродажи − стоимость покупки) / стоимость покупки = ROI.`,
      `Сверьте с фактическим изменением банковского баланса по майнинговым счетам.`
      ],
    },
  },
  'electricity-cost-calculator': {
    en: {
      interpret: [
      `The electricity cost calculator outputs the daily, monthly, and annual power cost for your mining or staking hardware at your specified kWh rate. The key output to maximize is the "cost per coin mined" — this is your effective acquisition cost for each coin through mining operations. Compare this to the coin's current market price: if cost per coin exceeds market price, you are mining at a loss and would be better served purchasing coins directly.`,
      `The efficiency ratio (electricity cost / total revenue) is the most critical operational health metric. An efficiency ratio below 50% means the operation is profitable. Above 70%, the margin is dangerously thin — a 15% price decline turns the operation into a net loser. World-class operations target below 40% electricity-to-revenue ratio.`
      ],
      scenarios: [
      `Multi-device cost estimation: enter your total fleet's power draw (sum of all ASICs or GPUs), your electricity rate, and operating hours per day. The result gives you the monthly electricity budget for the entire operation — useful for cash flow planning and comparing to monthly mining revenue.`,
      `Electricity rate optimization: if you have time-of-use (TOU) pricing, calculate the weighted average rate by entering peak hours (e.g., 6PM–10PM at $0.20/kWh) and off-peak hours ($0.06/kWh) into separate calculations and weighting by actual operating hours. This reveals whether running miners 24/7 or only off-peak hours maximizes profit.`
      ],
      checklist: [
      `Before using electricity cost for profitability: 1) Verify your rate includes all charges: base rate, delivery charge, demand charge (if applicable), taxes. 2) Measure actual device power at wall using a kill-a-watt meter, not device specs. 3) Include overhead power: cooling, networking, lighting consume additional electricity not attributed to miners directly.`,
      `After calculating monthly cost: compare to your actual electricity bill for the same month. Reconcile any difference by accounting for household loads or other equipment sharing the same meter.`
      ],
      mistakes: [
      `Using only the energy charge rate and ignoring demand charges (relevant for commercial accounts). Demand charges bill the peak 15-minute power draw in a billing period at a separate rate per kW. A facility running 20 ASICs at 3.5 kW each (70 kW total) can face demand charges of $15–25/kW/month = $1,050–1,750/month just in demand charges, dramatically changing the effective electricity rate.`,
      `Not accounting for efficiency losses in the power supply unit (PSU). Mining hardware PSUs are typically 90–93% efficient — so a miner rated at 3,000W from the miner specification actually draws 3,000/0.92 ≈ 3,261W at the wall. Using the device specification overstates efficiency and understates electricity cost.`
      ],
      benchmarks: [
      `Electricity cost benchmarks by region (2024): US residential average: $0.12/kWh. US industrial: $0.07/kWh. China industrial (Sichuan wet season): $0.02–0.04/kWh. Nordic hydro power: $0.03–0.06/kWh. US Sun Belt (natural gas generation): $0.05–0.07/kWh. Mining profitability is heavily geographically dependent.`,
      `At $0.05/kWh (favorable rate), a 3,500W ASIC costs $0.175/hour = $4.20/day = $126/month in electricity. At $0.10/kWh, the same machine costs $252/month. A $126 difference can be the entire profit margin for many machines, underscoring why electricity cost is the primary determinant of mining viability.`
      ],
      execution: [
      `Power cost optimization workflow: 1) Audit all devices drawing power in the mining facility. 2) Measure each device's actual wall draw. 3) Enter into this calculator to identify the highest power consumers. 4) Apply undervolting/overclocking optimizations to reduce power without proportional hashrate loss. 5) Recalculate after optimization to quantify the electricity savings.`,
      `For operations considering solar or alternative energy: enter a blended rate (average of grid + solar production cost). Solar typically has $0.03–0.06/kWh levelized cost over 25 years; blending with grid rate at your solar capacity factor gives your effective rate. If blended rate drops below $0.05/kWh, profitability significantly improves.`
      ],
      hygiene: [
      `Reconcile calculated electricity cost against actual bills monthly. If your calculated cost consistently exceeds the bill by 10%+, your power draw estimate is too high (good news — you are more efficient than assumed). If it is consistently lower, you have an unaccounted power drain to identify.`,
      `Update the calculator when you add or remove devices, when electricity rates change (typically quarterly for commercial accounts), or when seasonal TOU rates switch (summer/winter rate structures are common).`
      ],
      validation: [
      `Verify daily electricity cost: (total wattage / 1000) × 24 × rate = daily cost. For 10 GPUs × 250W each = 2,500W total: 2.5 kW × 24h × $0.10/kWh = $6/day = $180/month. Confirm calculator matches this formula result.`,
      `After comparing to actual bill: calculate implied effective rate (actual bill / actual kWh consumed). If this effective rate differs from your input rate by more than 5%, you are not capturing all fee components — adjust inputs to match the implied effective rate.`
      ],
    },
    es: {
      interpret: [
      `El calculador de coste de electricidad produce el coste diario, mensual y anual de energía para tu hardware de minería o staking a tu tarifa kWh especificada.`,
      `La relación de eficiencia (coste de electricidad / ingresos totales) es la métrica de salud operativa más crítica.`
      ],
      scenarios: [
      `Estimación de coste de múltiples dispositivos: introduce el consumo de energía total de tu flota, tu tarifa eléctrica y las horas de operación por día.`,
      `Optimización de tarifa eléctrica: si tienes precios de uso horario (TOU), calcula la tarifa promedio ponderada.`
      ],
      checklist: [
      `Antes de usar el coste de electricidad para la rentabilidad: 1) Verifica que tu tarifa incluye todos los cargos. 2) Mide el consumo real del dispositivo en la pared usando un medidor kill-a-watt. 3) Incluye la energía de sobrecarga: enfriamiento, red, iluminación.`,
      `Después de calcular el coste mensual: compara con tu factura de electricidad real del mismo mes.`
      ],
      mistakes: [
      `Usar solo la tarifa de carga de energía e ignorar los cargos por demanda (relevante para cuentas comerciales).`,
      `No tener en cuenta las pérdidas de eficiencia en la unidad de fuente de alimentación (PSU).`
      ],
      benchmarks: [
      `Benchmarks de coste de electricidad por región (2024): EE.UU. residencial promedio: $0.12/kWh. EE.UU. industrial: $0.07/kWh. Energía hidroeléctrica nórdica: $0.03–0.06/kWh.`,
      `A $0.05/kWh (tarifa favorable), un ASIC de 3,500W cuesta $126/mes en electricidad.`
      ],
      execution: [
      `Flujo de trabajo de optimización de costes de energía: 1) Audita todos los dispositivos que consumen energía en la instalación de minería. 2) Mide el consumo real en la pared de cada dispositivo. 3) Introduce en este calculador para identificar los mayores consumidores.`,
      `Para operaciones que consideran energía solar o alternativa: introduce una tarifa combinada.`
      ],
      hygiene: [
      `Reconcilia el coste de electricidad calculado con las facturas reales mensualmente.`,
      `Actualiza el calculador cuando añadas o elimines dispositivos, cuando cambien las tarifas eléctricas o cuando cambien las tarifas TOU estacionales.`
      ],
      validation: [
      `Verifica el coste diario de electricidad: (vataje total / 1000) × 24 × tarifa = coste diario.`,
      `Después de comparar con la factura real: calcula la tarifa efectiva implícita (factura real / kWh real consumidos).`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de custo de eletricidade produz o custo diário, mensal e anual de energia para seu hardware de mineração ou staking à sua tarifa kWh especificada.`,
      `A relação de eficiência (custo de eletricidade / receita total) é a métrica de saúde operacional mais crítica.`
      ],
      scenarios: [
      `Estimativa de custo de múltiplos dispositivos: insira o consumo total de energia de sua frota, sua tarifa de eletricidade e horas de operação por dia.`,
      `Otimização de tarifa de eletricidade: se você tem preços de uso horário (TOU), calcule a tarifa média ponderada.`
      ],
      checklist: [
      `Antes de usar o custo de eletricidade para lucratividade: 1) Verifique se sua tarifa inclui todas as cobranças. 2) Meça o consumo real do dispositivo na tomada. 3) Inclua a energia de sobrecarga: resfriamento, rede, iluminação.`,
      `Após calcular o custo mensal: compare com sua conta de eletricidade real do mesmo mês.`
      ],
      mistakes: [
      `Usar apenas a taxa de carga de energia e ignorar as cobranças de demanda.`,
      `Não contabilizar as perdas de eficiência na unidade de fonte de alimentação (PSU).`
      ],
      benchmarks: [
      `Benchmarks de custo de eletricidade por região (2024): média residencial dos EUA: $0.12/kWh. Industrial nos EUA: $0.07/kWh. Energia hidrelétrica nórdica: $0.03–0.06/kWh.`,
      `A $0.05/kWh (tarifa favorável), um ASIC de 3.500W custa $126/mês em eletricidade.`
      ],
      execution: [
      `Fluxo de trabalho de otimização de custo de energia: 1) Audite todos os dispositivos consumindo energia na instalação de mineração. 2) Meça o consumo real de cada dispositivo na tomada. 3) Insira nesta calculadora para identificar os maiores consumidores.`,
      `Para operações considerando energia solar ou alternativa: insira uma tarifa combinada.`
      ],
      hygiene: [
      `Reconcilie o custo de eletricidade calculado com as contas reais mensalmente.`,
      `Atualize a calculadora ao adicionar ou remover dispositivos, quando as tarifas de eletricidade mudarem.`
      ],
      validation: [
      `Verifique o custo diário de eletricidade: (wattagem total / 1000) × 24 × tarifa = custo diário.`,
      `Após comparar com a conta real: calcule a tarifa efetiva implícita.`
      ],
    },
    tr: {
      interpret: [
      `Elektrik maliyeti hesaplayıcısı, belirlenen kWh tarifinizde madencilik veya staking donanımınız için günlük, aylık ve yıllık güç maliyetini çıktılar.`,
      `Verimlilik oranı (elektrik maliyeti / toplam gelir) en kritik operasyonel sağlık metriğidir.`
      ],
      scenarios: [
      `Çoklu cihaz maliyet tahmini: filonuzun toplam güç tüketimini, elektrik tarifinizi ve günlük çalışma saatlerini girin.`,
      `Elektrik tarifesi optimizasyonu: kullanım saatine göre fiyatlandırmanız (TOU) varsa, ağırlıklı ortalama tarifeyi hesaplayın.`
      ],
      checklist: [
      `Elektrik maliyetini karlılık için kullanmadan önce: 1) Tarifinizin tüm ücretleri içerdiğini doğrulayın. 2) Bir kill-a-watt ölçer kullanarak cihazın gerçek duvar güç tüketimini ölçün. 3) Genel güç tüketimini dahil edin: soğutma, ağ, aydınlatma.`,
      `Aylık maliyeti hesapladıktan sonra: gerçek elektrik faturasıyla karşılaştırın.`
      ],
      mistakes: [
      `Sadece enerji yükü tarifesini kullanmak ve talep ücretlerini görmezden gelmek.`,
      `Güç kaynağı birimindeki (PSU) verimlilik kayıplarını hesaba katmamak.`
      ],
      benchmarks: [
      `Bölgeye göre elektrik maliyeti kıyaslamaları (2024): ABD konut ortalaması: 0.12 $/kWh. ABD endüstriyel: 0.07 $/kWh. İskandinav hidroelektrik gücü: 0.03–0.06 $/kWh.`,
      `0.05 $/kWh'de (avantajlı tarife), 3.500W'lık bir ASIC elektrikte aylık 126 dolara mal olur.`
      ],
      execution: [
      `Güç maliyeti optimizasyon iş akışı: 1) Madencilik tesisindeki güç çeken tüm cihazları denetleyin. 2) Her cihazın gerçek duvar güç tüketimini ölçün. 3) En yüksek güç tüketicilerini belirlemek için bu hesaplayıcıya girin.`,
      `Güneş enerjisi veya alternatif enerji düşünen operasyonlar için: karışık bir tarife girin.`
      ],
      hygiene: [
      `Hesaplanan elektrik maliyetini gerçek faturalarla aylık olarak mutabık kılın.`,
      `Cihaz ekler veya çıkarırken, elektrik tarifeleri değiştiğinde hesaplayıcıyı güncelleyin.`
      ],
      validation: [
      `Günlük elektrik maliyetini doğrulayın: (toplam watt / 1000) × 24 × tarife = günlük maliyet.`,
      `Gerçek faturayla karşılaştırdıktan sonra: zımni efektif tarifeyi hesaplayın.`
      ],
    },
    hi: {
      interpret: [
      `बिजली लागत कैलकुलेटर आपकी निर्दिष्ट kWh दर पर आपके माइनिंग या स्टेकिंग हार्डवेयर के लिए दैनिक, मासिक और वार्षिक पावर लागत आउटपुट करता है।`,
      `दक्षता अनुपात (बिजली लागत / कुल राजस्व) सबसे महत्वपूर्ण परिचालन स्वास्थ्य मेट्रिक है।`
      ],
      scenarios: [
      `बहु-डिवाइस लागत अनुमान: अपने पूरे फ्लीट का कुल पावर ड्रॉ, आपकी बिजली दर और प्रति दिन ऑपरेटिंग घंटे दर्ज करें।`,
      `बिजली दर अनुकूलन: यदि आपके पास टाइम-ऑफ-यूज (TOU) मूल्य निर्धारण है, तो भारित औसत दर की गणना करें।`
      ],
      checklist: [
      `बिजली लागत का उपयोग लाभप्रदता के लिए करने से पहले: 1) सत्यापित करें कि आपकी दर सभी शुल्क शामिल करती है। 2) किल-ए-वाट मीटर का उपयोग करके दीवार पर वास्तविक डिवाइस पावर मापें। 3) ओवरहेड पावर शामिल करें: कूलिंग, नेटवर्किंग, प्रकाश।`,
      `मासिक लागत की गणना के बाद: उसी महीने के अपने वास्तविक बिजली बिल से तुलना करें।`
      ],
      mistakes: [
      `केवल ऊर्जा चार्ज दर का उपयोग करना और डिमांड चार्ज को नजरअंदाज करना।`,
      `पावर सप्लाई यूनिट (PSU) में दक्षता हानि के लिए खाता न करना।`
      ],
      benchmarks: [
      `क्षेत्र के अनुसार बिजली लागत बेंचमार्क (2024): US आवासीय औसत: $0.12/kWh। US औद्योगिक: $0.07/kWh। नॉर्डिक हाइड्रो पावर: $0.03–0.06/kWh।`,
      `$0.05/kWh (अनुकूल दर) पर, 3,500W ASIC बिजली में $126/माह खर्च करता है।`
      ],
      execution: [
      `पावर लागत अनुकूलन वर्कफ़्लो: 1) माइनिंग सुविधा में पावर खींचने वाले सभी उपकरणों का ऑडिट करें। 2) प्रत्येक डिवाइस का वास्तविक वॉल ड्रॉ मापें। 3) सर्वोच्च पावर उपभोक्ताओं की पहचान करने के लिए इस कैलकुलेटर में दर्ज करें।`,
      `सोलर या वैकल्पिक ऊर्जा पर विचार करने वाले ऑपरेशन के लिए: एक मिश्रित दर दर्ज करें।`
      ],
      hygiene: [
      `परिकलित बिजली लागत को वास्तविक बिलों के साथ मासिक रूप से मिलाएं।`,
      `जब आप डिवाइस जोड़ते या हटाते हैं, जब बिजली दरें बदलती हैं तो कैलकुलेटर अपडेट करें।`
      ],
      validation: [
      `दैनिक बिजली लागत सत्यापित करें: (कुल वाट / 1000) × 24 × दर = दैनिक लागत।`,
      `वास्तविक बिल से तुलना करने के बाद: निहित प्रभावी दर की गणना करें।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор стоимости электроэнергии выводит суточные, месячные и годовые расходы на электроэнергию для майнингового или стейкингового оборудования по вашему тарифу kWh. Ключевой показатель — "стоимость за добытую монету": это ваша эффективная цена приобретения монеты через майнинг.`,
      `Коэффициент эффективности (стоимость электроэнергии / общий доход) — наиболее критичный показатель операционного здоровья. Ниже 50% — операция прибыльна. Выше 70% — маржа опасно тонкая.`
      ],
      scenarios: [
      `Оценка стоимости для нескольких устройств: введите общее потребление энергии всего парка, ваш тариф и часы работы в сутки.`,
      `Оптимизация тарифа: при дифференцированном тарифе рассчитайте средневзвешенную ставку по часам пиковой и непиковой нагрузки.`
      ],
      checklist: [
      `Перед использованием стоимости электроэнергии для расчёта доходности: 1) Убедитесь, что тариф включает все сборы. 2) Измерьте фактическое потребление устройств у розетки ваттметром. 3) Учтите вспомогательное потребление: охлаждение, сеть, освещение.`,
      `После расчёта ежемесячной стоимости: сравните с фактическим счётом за тот же месяц.`
      ],
      mistakes: [
      `Использование только тарифа на потреблённую энергию без учёта сборов за мощность (актуально для коммерческих клиентов).`,
      `Игнорирование потерь эффективности блока питания (PSU). Майнинговые PSU имеют КПД 90–93%, что означает более высокое фактическое потребление от розетки.`
      ],
      benchmarks: [
      `Ориентиры стоимости электроэнергии по регионам (2024): средний жилой тариф в США: $0.12/кВт·ч. Промышленный в США: $0.07/кВт·ч. Скандинавская гидроэлектростанция: $0.03–0.06/кВт·ч.`,
      `При $0.05/кВт·ч (благоприятный тариф) ASIC мощностью 3 500 Вт обходится в $126/мес. на электроэнергию.`
      ],
      execution: [
      `Процесс оптимизации расходов на электроэнергию: 1) Проведите аудит всех потребляющих мощностей устройств в объекте. 2) Измерьте реальное потребление каждого устройства у розетки. 3) Введите в калькулятор для определения наибольших потребителей. 4) Примените андервольтинг/оверклокинг для снижения потребления.`,
      `Для объектов, рассматривающих солнечную энергию: введите смешанный тариф (среднее сетевого + стоимость солнечной генерации).`
      ],
      hygiene: [
      `Ежемесячно сверяйте расчётную стоимость электроэнергии с фактическими счетами.`,
      `Обновляйте калькулятор при добавлении/удалении устройств, при изменении тарифов.`
      ],
      validation: [
      `Проверьте суточную стоимость: (суммарная мощность / 1000) × 24 × тариф = суточная стоимость. Для 10 GPU × 250 Вт = 2 500 Вт: 2.5 кВт × 24ч × $0.10 = $6/сут.`,
      `После сравнения с реальным счётом рассчитайте подразумеваемый эффективный тариф (реальный счёт / реальное kWh потребление).`
      ],
    },
  },
  'difficulty-calculator': {
    en: {
      interpret: [
      `The mining difficulty calculator shows how network difficulty changes affect your share of block rewards. The key output is the "difficulty-adjusted daily coin yield" — how many coins you mine per day at the new difficulty compared to the old. If difficulty increases 10%, your daily coin yield decreases by approximately 9.09% (1 − 1/1.1). The calculator shows this adjustment in both percentage terms and absolute coin quantities.`,
      `The projected revenue impact shows the dollar-denominated effect of the difficulty change on your mining income. If difficulty rises 15% and coin price stays flat, your daily revenue falls by approximately 13%. This is why difficulty trend is as important as price trend for profitability modeling: a coin's price can rise 30% while network difficulty rises 50%, making actual mining profitability decline despite the nominal price increase.`
      ],
      scenarios: [
      `Next difficulty epoch planning (Bitcoin): Bitcoin adjusts difficulty every 2016 blocks (approximately 2 weeks). Estimate the next adjustment using the current block time average: if average block time is 9.5 minutes (versus target 10 minutes), difficulty will increase approximately 5.26% in the next epoch. Enter this into the calculator to project how your next two weeks of mining revenue will change.`,
      `New entrant impact analysis: when a new, more efficient ASIC model ships and many miners upgrade, network hashrate can increase 20–30% over 2–3 months. Use this calculator to model how successive difficulty increases (5% per epoch × 3 epochs = 15.76% total increase) compress your mining revenue over a quarter, informing whether to upgrade hardware or exit.`
      ],
      checklist: [
      `Before projecting difficulty impact: 1) Check the current block time average from a real-time blockchain explorer (not historical). 2) Identify if any major ASIC releases are imminent (typically announced 3–6 months in advance). 3) Check for network events (halvings, protocol upgrades) that affect block reward or hashrate incentives.`,
      `After projecting revenue impact: update your break-even price calculation using the difficulty-adjusted yield. If your break-even price rises above 70% of current market price after difficulty adjustment, your operation is approaching vulnerability to normal market corrections.`
      ],
      mistakes: [
      `Assuming difficulty grows at a constant percentage when coin prices are volatile. Difficulty growth follows hashrate growth, which follows profitability. If coin price drops 30%, many miners shut down, hashrate falls, and difficulty decreases — actually improving profitability for remaining miners. Model difficulty as responsive to price, not as a constant growth rate.`,
      `Using Ethereum's historical difficulty increase patterns for Bitcoin or other coins. Each coin has unique difficulty adjustment algorithms and timing (Ethereum moved to PoS, Bitcoin adjusts every 2016 blocks, Litecoin every 2016 blocks, others every 24 hours). Use coin-specific adjustment parameters in the calculator.`
      ],
      benchmarks: [
      `Bitcoin difficulty growth rate benchmarks: 2020–2021 (bull market, post-halving): +5–15% per 2-week epoch. 2022 (bear market): -5% to +2% per epoch. 2023–2024 (recovery): +3–8% per epoch. As a conservative annual projection, +50–100% difficulty growth annually during bull markets and +0–20% during bear markets.`,
      `Difficulty decrease triggers: if block time rises above 12 minutes for an epoch, expect a difficulty decrease of approximately -20%. This typically happens when 15–20% of network hashrate goes offline suddenly (major exchange collapse causing miner liquidations, regulatory crackdown in a major mining region, extreme electricity price spikes).`
      ],
      execution: [
      `Difficulty projection workflow: 1) Note the current network hashrate from a block explorer. 2) Research any pending ASIC releases or regulatory events that affect network hashrate. 3) Enter projected hashrate increase into the calculator. 4) Observe the difficulty-adjusted daily revenue. 5) Calculate your new break-even price.`,
      `For quarterly planning: estimate 3 difficulty epochs (6 weeks) using the trailing average epoch growth rate. Multiply current revenue by (1 − growth rate)^3 to get 6-week projection. If this projected revenue is below your electricity cost, plan an exit strategy.`
      ],
      hygiene: [
      `Track actual vs. projected difficulty monthly. If real difficulty growth consistently exceeds your projections, your models are too conservative and you should update your growth rate assumption. Persistent underestimation leads to unexpected profitability compression.`,
      `After each difficulty adjustment, recalculate your actual share of network hashrate: (your hashrate / total network hashrate) = your share. This confirms whether your hardware is holding its competitive position or falling behind the network average.`
      ],
      validation: [
      `Verify difficulty impact: new daily coin yield = old daily coin yield × (old difficulty / new difficulty). For 1% daily yield at old difficulty and a 10% difficulty increase: new yield = 1% × (1/1.1) = 0.909%. The calculator should show this result precisely.`,
      `Cross-check difficulty projections against sites like BTC.com, Blockchain.info, or CoinWarz which publish live difficulty and projected next adjustment. If your estimate diverges by more than 2% from these sources, your block time average input may be using a different measurement window.`
      ],
    },
    es: {
      interpret: [
      `El calculador de dificultad de minería muestra cómo los cambios en la dificultad de la red afectan tu participación en las recompensas de bloque.`,
      `El impacto en los ingresos proyectados muestra el efecto en términos de dólares del cambio de dificultad en tus ingresos de minería.`
      ],
      scenarios: [
      `Planificación del próximo epoch de dificultad (Bitcoin): Bitcoin ajusta la dificultad cada 2016 bloques (aproximadamente 2 semanas). Estima el próximo ajuste usando el tiempo de bloque promedio actual.`,
      `Análisis del impacto de nuevos participantes: cuando un nuevo modelo de ASIC más eficiente se lanza y muchos mineros actualizan, el hashrate de la red puede aumentar un 20–30% en 2–3 meses.`
      ],
      checklist: [
      `Antes de proyectar el impacto de la dificultad: 1) Comprueba el tiempo de bloque promedio actual desde un explorador de blockchain en tiempo real. 2) Identifica si hay lanzamientos de ASIC inminentes. 3) Comprueba si hay eventos de red que afecten la recompensa de bloque o los incentivos de hashrate.`,
      `Después de proyectar el impacto en los ingresos: actualiza tu cálculo de precio de equilibrio usando el rendimiento ajustado por dificultad.`
      ],
      mistakes: [
      `Asumir que la dificultad crece a un porcentaje constante cuando los precios de las monedas son volátiles.`,
      `Usar los patrones históricos de aumento de dificultad de Ethereum para Bitcoin u otras monedas.`
      ],
      benchmarks: [
      `Benchmarks de tasa de crecimiento de dificultad de Bitcoin: 2020–2021 (mercado alcista): +5–15% por epoch de 2 semanas. 2022 (mercado bajista): -5% a +2% por epoch.`,
      `Disparadores de disminución de dificultad: si el tiempo de bloque supera los 12 minutos durante un epoch, espera una disminución de dificultad de aproximadamente -20%.`
      ],
      execution: [
      `Flujo de trabajo de proyección de dificultad: 1) Anota el hashrate de red actual de un explorador de bloques. 2) Investiga cualquier lanzamiento de ASIC pendiente. 3) Introduce el aumento de hashrate proyectado en el calculador. 4) Observa el ingreso diario ajustado por dificultad.`,
      `Para la planificación trimestral: estima 3 epochs de dificultad (6 semanas) usando la tasa de crecimiento de epoch promedio.`
      ],
      hygiene: [
      `Rastrea la dificultad real vs. proyectada mensualmente.`,
      `Después de cada ajuste de dificultad, recalcula tu participación real en el hashrate de red.`
      ],
      validation: [
      `Verifica el impacto de la dificultad: nuevo rendimiento diario de monedas = rendimiento diario antiguo × (dificultad antigua / nueva dificultad).`,
      `Verifica las proyecciones de dificultad con sitios como BTC.com o CoinWarz que publican la dificultad en vivo y el próximo ajuste proyectado.`
      ],
    },
    pt: {
      interpret: [
      `A calculadora de dificuldade de mineração mostra como as mudanças na dificuldade da rede afetam sua parcela nas recompensas de bloco.`,
      `O impacto na receita projetada mostra o efeito em termos de dólares da mudança de dificuldade em sua receita de mineração.`
      ],
      scenarios: [
      `Planejamento do próximo epoch de dificuldade (Bitcoin): Bitcoin ajusta a dificuldade a cada 2016 blocos.`,
      `Análise de impacto de novos entrantes: quando um novo modelo ASIC mais eficiente é lançado, o hashrate da rede pode aumentar 20–30% em 2–3 meses.`
      ],
      checklist: [
      `Antes de projetar o impacto da dificuldade: 1) Verifique o tempo médio de bloco atual de um explorador blockchain em tempo real. 2) Identifique lançamentos de ASIC iminentes. 3) Verifique eventos de rede que afetam recompensas de bloco.`,
      `Após projetar o impacto na receita: atualize seu cálculo de preço de equilíbrio usando o rendimento ajustado pela dificuldade.`
      ],
      mistakes: [
      `Assumir que a dificuldade cresce a uma porcentagem constante quando os preços das moedas são voláteis.`,
      `Usar padrões históricos de aumento de dificuldade do Ethereum para Bitcoin ou outras moedas.`
      ],
      benchmarks: [
      `Benchmarks de taxa de crescimento de dificuldade do Bitcoin: 2020–2021 (mercado altista): +5–15% por epoch de 2 semanas. 2022 (mercado baixista): -5% a +2% por epoch.`,
      `Gatilhos de diminuição de dificuldade: se o tempo de bloco superar 12 minutos por um epoch, espere uma diminuição de dificuldade de aproximadamente -20%.`
      ],
      execution: [
      `Fluxo de trabalho de projeção de dificuldade: 1) Anote o hashrate atual da rede de um explorador de blocos. 2) Pesquise lançamentos de ASIC pendentes. 3) Insira o aumento de hashrate projetado na calculadora. 4) Observe a receita diária ajustada pela dificuldade.`,
      `Para planejamento trimestral: estime 3 epochs de dificuldade usando a taxa de crescimento média.`
      ],
      hygiene: [
      `Rastreie dificuldade real vs. projetada mensalmente.`,
      `Após cada ajuste de dificuldade, recalcule sua participação real no hashrate da rede.`
      ],
      validation: [
      `Verifique o impacto da dificuldade: novo rendimento diário de moedas = rendimento diário antigo × (dificuldade antiga / nova dificuldade).`,
      `Verifique as projeções de dificuldade com sites como BTC.com ou CoinWarz.`
      ],
    },
    tr: {
      interpret: [
      `Madencilik zorluğu hesaplayıcısı, ağ zorluğu değişikliklerinin blok ödüllerindeki payınızı nasıl etkilediğini gösterir.`,
      `Tahmini gelir etkisi, zorluk değişikliğinin madencilik geliriniz üzerindeki dolar bazındaki etkisini gösterir.`
      ],
      scenarios: [
      `Sonraki zorluk epoch planlaması (Bitcoin): Bitcoin her 2016 blokta (yaklaşık 2 haftada bir) zorluğu ayarlar. Mevcut ortalama blok süresini kullanarak bir sonraki ayarlamayı tahmin edin.`,
      `Yeni katılımcı etki analizi: yeni, daha verimli bir ASIC modeli çıktığında ve birçok madenci yükseltme yaptığında, ağ hashrate'i 2–3 ayda %20–30 artabilir.`
      ],
      checklist: [
      `Zorluk etkisini tahmin etmeden önce: 1) Gerçek zamanlı bir blockchain gezgininden mevcut ortalama blok süresini kontrol edin. 2) Yakında olacak ASIC sürümlerini belirleyin. 3) Blok ödülünü veya hashrate teşviklerini etkileyen ağ olaylarını kontrol edin.`,
      `Gelir etkisini tahmin ettikten sonra: zorluk ayarlı getiri kullanarak başabaş fiyat hesaplamanızı güncelleyin.`
      ],
      mistakes: [
      `Coin fiyatları değişken olduğunda zorluğun sabit bir yüzdeyle büyüdüğünü varsaymak.`,
      `Ethereum'un tarihsel zorluk artış modellerini Bitcoin veya diğer coinler için kullanmak.`
      ],
      benchmarks: [
      `Bitcoin zorluk büyüme oranı kıyaslamaları: 2020–2021 (boğa piyasası): 2 haftalık epoch başına +%5–15. 2022 (ayı piyasası): epoch başına -%5 ile +%2.`,
      `Zorluk azalma tetikleyicileri: blok süresi bir epoch için 12 dakikayı aşarsa, yaklaşık -%20'lik bir zorluk azalması bekleyin.`
      ],
      execution: [
      `Zorluk projeksiyon iş akışı: 1) Bir blok gezgininden mevcut ağ hashrate'ini not edin. 2) Bekleyen ASIC sürümlerini araştırın. 3) Tahmini hashrate artışını hesaplayıcıya girin. 4) Zorluğa göre ayarlanmış günlük geliri gözlemleyin.`,
      `Üç aylık planlama için: 3 zorluk epoch'unu (6 hafta) tahmin edin.`
      ],
      hygiene: [
      `Gerçek ile tahmini zorluğu aylık olarak takip edin.`,
      `Her zorluk ayarlamasından sonra ağ hashrate'indeki gerçek payınızı yeniden hesaplayın.`
      ],
      validation: [
      `Zorluk etkisini doğrulayın: yeni günlük coin getirisi = eski günlük coin getirisi × (eski zorluk / yeni zorluk).`,
      `Zorluk projeksiyonlarını BTC.com veya CoinWarz gibi sitelerle çapraz kontrol edin.`
      ],
    },
    hi: {
      interpret: [
      `माइनिंग कठिनाई कैलकुलेटर दिखाता है कि नेटवर्क कठिनाई परिवर्तन ब्लॉक रिवार्ड में आपकी हिस्सेदारी को कैसे प्रभावित करते हैं।`,
      `अनुमानित राजस्व प्रभाव आपकी माइनिंग आय पर कठिनाई परिवर्तन का डॉलर-मूल्यवर्गित प्रभाव दिखाता है।`
      ],
      scenarios: [
      `अगले कठिनाई युग योजना (Bitcoin): Bitcoin हर 2016 ब्लॉक (लगभग 2 सप्ताह) में कठिनाई समायोजित करता है। वर्तमान ब्लॉक समय औसत का उपयोग करके अगले समायोजन का अनुमान लगाएं।`,
      `नए प्रवेशकर्ता प्रभाव विश्लेषण: जब एक नया, अधिक कुशल ASIC मॉडल शिप होता है और कई माइनर्स अपग्रेड करते हैं, तो नेटवर्क हैशरेट 2–3 महीनों में 20–30% बढ़ सकता है।`
      ],
      checklist: [
      `कठिनाई प्रभाव का अनुमान लगाने से पहले: 1) एक रीयल-टाइम ब्लॉकचेन एक्सप्लोरर से वर्तमान ब्लॉक समय औसत जांचें। 2) किसी आसन्न ASIC रिलीज की पहचान करें। 3) नेटवर्क इवेंट की जांच करें जो ब्लॉक रिवार्ड या हैशरेट प्रोत्साहन को प्रभावित करते हैं।`,
      `राजस्व प्रभाव का अनुमान लगाने के बाद: कठिनाई-समायोजित उपज का उपयोग करके अपनी ब्रेक-ईवन मूल्य गणना अपडेट करें।`
      ],
      mistakes: [
      `यह मानना कि जब कॉइन की कीमतें अस्थिर हों तो कठिनाई निरंतर प्रतिशत पर बढ़ती है।`,
      `Bitcoin या अन्य कॉइन के लिए Ethereum के ऐतिहासिक कठिनाई वृद्धि पैटर्न का उपयोग करना।`
      ],
      benchmarks: [
      `Bitcoin कठिनाई वृद्धि दर बेंचमार्क: 2020–2021 (बुल मार्केट): 2-सप्ताह के प्रति युग +5–15%। 2022 (बेयर मार्केट): प्रति युग -5% से +2%।`,
      `कठिनाई में कमी के ट्रिगर: यदि एक युग के लिए ब्लॉक समय 12 मिनट से अधिक हो जाता है, तो लगभग -20% की कठिनाई कमी की उम्मीद करें।`
      ],
      execution: [
      `कठिनाई प्रक्षेपण वर्कफ़्लो: 1) ब्लॉक एक्सप्लोरर से वर्तमान नेटवर्क हैशरेट नोट करें। 2) लंबित ASIC रिलीज का अनुसंधान करें। 3) कैलकुलेटर में अनुमानित हैशरेट वृद्धि दर्ज करें। 4) कठिनाई-समायोजित दैनिक राजस्व का निरीक्षण करें।`,
      `त्रैमासिक योजना के लिए: 3 कठिनाई युगों (6 सप्ताह) का अनुमान लगाएं।`
      ],
      hygiene: [
      `वास्तविक बनाम अनुमानित कठिनाई मासिक रूप से ट्रैक करें।`,
      `प्रत्येक कठिनाई समायोजन के बाद, नेटवर्क हैशरेट में आपकी वास्तविक हिस्सेदारी की पुनः गणना करें।`
      ],
      validation: [
      `कठिनाई प्रभाव सत्यापित करें: नई दैनिक कॉइन उपज = पुरानी दैनिक कॉइन उपज × (पुरानी कठिनाई / नई कठिनाई)।`,
      `BTC.com या CoinWarz जैसी साइटों के विरुद्ध कठिनाई अनुमानों को क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Калькулятор сложности майнинга показывает, как изменения сложности сети влияют на вашу долю в вознаграждениях за блок. Ключевой вывод — "скорректированный по сложности суточный объём монет". При росте сложности на 10% суточный объём снижается примерно на 9.09% (1 − 1/1.1).`,
      `Прогнозируемое влияние на выручку показывает долларовый эффект изменения сложности на ваш майнинговый доход.`
      ],
      scenarios: [
      `Планирование следующей эпохи сложности (Bitcoin): Bitcoin корректирует сложность каждые 2016 блоков (≈2 недели). Оцените следующую корректировку по среднему времени блока: если среднее время 9.5 мин (против целевых 10 мин), сложность вырастет примерно на 5.26%.`,
      `Анализ влияния новых участников: при появлении нового эффективного ASIC и массовом обновлении майнеров хешрейт сети может вырасти на 20–30% за 2–3 месяца.`
      ],
      checklist: [
      `Перед прогнозированием влияния сложности: 1) Проверьте текущее среднее время блока в реальном времени через блокчейн-обозреватель. 2) Выясните, ожидаются ли крупные релизы ASIC. 3) Проверьте сетевые события (халвинги, обновления протокола), влияющие на вознаграждение за блок.`,
      `После прогноза влияния на выручку: обновите расчёт цены безубыточности с учётом скорректированной по сложности доходности.`
      ],
      mistakes: [
      `Предположение о постоянном процентном росте сложности при волатильных ценах монет. Рост сложности следует за хешрейтом, который следует за доходностью.`,
      `Применение исторических паттернов роста сложности Ethereum к Bitcoin или другим монетам. У каждой монеты свои алгоритмы и интервалы корректировки.`
      ],
      benchmarks: [
      `Ориентиры темпа роста сложности Bitcoin: 2020–2021 (бычий рынок): +5–15% за 2-недельную эпоху. 2022 (медвежий рынок): от -5% до +2% за эпоху.`,
      `Триггеры снижения сложности: если время блока превышает 12 минут за эпоху, ожидайте снижения сложности примерно на -20%.`
      ],
      execution: [
      `Процесс прогнозирования сложности: 1) Запишите текущий хешрейт сети из блок-обозревателя. 2) Изучите ожидаемые релизы ASIC. 3) Введите прогнозируемый рост хешрейта в калькулятор. 4) Посмотрите скорректированный суточный доход.`,
      `Для квартального планирования: оцените 3 эпохи сложности (6 недель), используя среднюю скорость роста за последние эпохи.`
      ],
      hygiene: [
      `Ежемесячно отслеживайте фактическую vs. прогнозируемую сложность. Если реальный рост постоянно превышает прогнозы, обновите предположение о темпе роста.`,
      `После каждой корректировки сложности пересчитайте фактическую долю в хешрейте сети.`
      ],
      validation: [
      `Проверьте влияние сложности: новый суточный объём = старый × (старая сложность / новая сложность). При 1% суточной доходности и росте сложности на 10%: новая доходность = 1% × (1/1.1) = 0.909%.`,
      `Сверьте прогнозы сложности с сайтами BTC.com, Blockchain.info или CoinWarz, публикующими актуальную сложность и прогнозируемую следующую корректировку.`
      ],
    },
  },
  'hashrate-converter': {
    en: {
      interpret: [
      `The hashrate converter translates between different hashing power units: H/s (hashes per second), KH/s (kilohashes), MH/s (megahashes), GH/s (gigahashes), TH/s (terahashes), PH/s (petahashes), and EH/s (exahashes). Each step is a 1000× increase. Bitcoin network hashrate is currently measured in EH/s (exahashes), while individual GPU miners might operate at MH/s, and ASICs at TH/s. Misreading the unit prefix by one step is a 1000× error that completely invalidates profitability calculations.`,
      `The "network share" output shows what percentage of the total network hashrate your hardware represents, which directly determines your expected block reward share. A single S21 ASIC at 200 TH/s against a 600 EH/s Bitcoin network has a share of 200 TH/s / 600,000,000 TH/s = 0.0000000333%, meaning you statistically earn one block reward every 28 years solo mining — demonstrating why pool mining is essential for predictable income.`
      ],
      scenarios: [
      `Pool comparison: mining pools report contributed hashrate in different units. Use this converter to normalize all pool contributors to the same unit (TH/s) before comparing your contribution across pools and verifying the pool's reported hashrate matches your hardware's expected output.`,
      `Network hashrate growth analysis: track Bitcoin network hashrate growth in EH/s over months. When converting to PH/s for comparison with 2020 data (when the network was smaller), the converter ensures you're comparing the same units. A 200 EH/s network is 200,000 PH/s — direct comparison to a 2020 baseline of 120,000 PH/s shows 67% growth.`
      ],
      checklist: [
      `Before using hashrate in profitability calculations: 1) Confirm the unit displayed by your mining software (HiveOS, NiceHash, etc.) matches the unit you are entering into the profitability calculator. 2) Check that the network hashrate comparison uses the same base unit. 3) Verify your pool's reported hashrate for your workers is in a unit you can verify against your hardware spec.`,
      `After converting: cross-check by converting back to the original unit. If the round-trip conversion does not match exactly, there is a display rounding in the converter — use the more precise intermediate value for profitability calculations.`
      ],
      mistakes: [
      `Confusing MH/s (megahash) with TH/s (terahash) for GPU vs. ASIC comparisons. A GPU mining Ethereum Classic might achieve 60 MH/s = 0.00006 TH/s. An ASIC might achieve 110 TH/s. These are 1,833,000× different. Entering GPU hashrate in TH/s by accident overstates profitability by a factor of millions.`,
      `Using the wrong algorithm's hashrate unit for the mining calculator. Bitcoin uses SHA-256 (TH/s), Ethereum Classic uses Ethash (MH/s), Monero uses RandomX (KH/s or MH/s), Kaspa uses kHeavyHash (GH/s). The profitability calculator for each coin expects hashrate in that coin's algorithm's conventional unit.`
      ],
      benchmarks: [
      `Reference hashrate units by coin/algorithm (2024): Bitcoin (SHA-256): network ≈600 EH/s; top ASIC ≈200 TH/s; GPU: negligible. Ethereum Classic (ETHhash): top GPU ≈60 MH/s; no viable ASIC. Kaspa (kHeavyHash): network ≈800 PH/s; top ASIC ≈100 TH/s. Monero (RandomX): network ≈3 GH/s; consumer CPU ≈1–12 KH/s.`,
      `For context: 1 EH/s = 1,000 PH/s = 1,000,000 TH/s = 1,000,000,000 GH/s = 10^18 H/s. Bitcoin's entire historical blockchain has been secured by progressively more hashrate over 15 years, from kilohashe in 2009 to exahashes today — a 10^15× (quadrillion-fold) increase in network security.`
      ],
      execution: [
      `Standard conversion workflow: 1) Identify the input unit (from mining software or hardware spec). 2) Identify the target unit (for profitability calculator or network comparison). 3) Enter the value and select both units in the converter. 4) Use the output value in your calculation. 5) Write down the unit alongside the value to prevent future confusion.`,
      `For monitoring: many mining monitoring tools let you set the display unit. Standardize to TH/s for ASIC monitoring and MH/s for GPU monitoring across all tools to eliminate unit mismatch errors in your daily review.`
      ],
      hygiene: [
      `Annotate all hashrate figures in your tracking documents with their units (e.g., "200 TH/s", not just "200"). Unit-bare numbers are meaningless and cause 1000× errors when documents are reviewed or shared weeks later.`,
      `When comparing hashrate over time, normalize all historical data to a single unit (e.g., TH/s) before plotting trends. Mixed units in charts produce misleading visualizations where a switch from GH/s to TH/s data appears as a 1000× jump.`
      ],
      validation: [
      `Verify the conversion: 1 TH/s = 1000 GH/s = 1,000,000 MH/s = 1,000,000,000 KH/s. For a 200 TH/s ASIC: in GH/s = 200,000 GH/s; in MH/s = 200,000,000 MH/s. Confirm the calculator output matches these manual calculations exactly.`,
      `Cross-check with your mining pool's reported hashrate: if your hardware spec is 200 TH/s and the pool reports 185 TH/s effective, you have 7.5% hashrate loss to rejected shares, hardware efficiency degradation, or measurement window differences — investigate if the gap exceeds 10%.`
      ],
    },
    es: {
      interpret: [
      `El conversor de hashrate traduce entre diferentes unidades de potencia de hashing: H/s, KH/s, MH/s, GH/s, TH/s, PH/s y EH/s. Cada paso es un aumento de 1000×.`,
      `La salida de "cuota de red" muestra qué porcentaje del hashrate total de la red representa tu hardware, lo que determina directamente tu parte esperada de recompensa de bloque.`
      ],
      scenarios: [
      `Comparación de pools: los pools de minería reportan el hashrate contribuido en diferentes unidades. Usa este conversor para normalizar todos los contribuidores del pool a la misma unidad.`,
      `Análisis del crecimiento del hashrate de red: rastrea el crecimiento del hashrate de red de Bitcoin en EH/s durante meses.`
      ],
      checklist: [
      `Antes de usar el hashrate en cálculos de rentabilidad: 1) Confirma que la unidad mostrada por tu software de minería coincide con la unidad que estás introduciendo en el calculador de rentabilidad. 2) Comprueba que la comparación de hashrate de red usa la misma unidad base.`,
      `Después de convertir: comprueba convirtiendo de vuelta a la unidad original.`
      ],
      mistakes: [
      `Confundir MH/s (megahash) con TH/s (terahash) para comparaciones GPU vs. ASIC.`,
      `Usar la unidad de hashrate del algoritmo incorrecto para el calculador de minería.`
      ],
      benchmarks: [
      `Unidades de hashrate de referencia por moneda/algoritmo (2024): Bitcoin (SHA-256): red ≈600 EH/s; ASIC superior ≈200 TH/s. Ethereum Classic (ETHhash): GPU superior ≈60 MH/s. Kaspa (kHeavyHash): ASIC superior ≈100 TH/s.`,
      `Para contexto: 1 EH/s = 1.000 PH/s = 1.000.000 TH/s = 10^18 H/s.`
      ],
      execution: [
      `Flujo de trabajo de conversión estándar: 1) Identifica la unidad de entrada. 2) Identifica la unidad objetivo. 3) Introduce el valor y selecciona ambas unidades en el conversor. 4) Usa el valor de salida en tu cálculo.`,
      `Para monitorización: estandariza en TH/s para monitorización de ASIC y MH/s para monitorización de GPU.`
      ],
      hygiene: [
      `Anota todas las cifras de hashrate en tus documentos de seguimiento con sus unidades.`,
      `Al comparar el hashrate a lo largo del tiempo, normaliza todos los datos históricos a una única unidad antes de trazar tendencias.`
      ],
      validation: [
      `Verifica la conversión: 1 TH/s = 1000 GH/s = 1.000.000 MH/s.`,
      `Verifica con el hashrate reportado por tu pool de minería: si tu especificación de hardware es de 200 TH/s y el pool reporta 185 TH/s efectivos, tienes un 7.5% de pérdida de hashrate.`
      ],
    },
    pt: {
      interpret: [
      `O conversor de hashrate traduz entre diferentes unidades de potência de hashing: H/s, KH/s, MH/s, GH/s, TH/s, PH/s e EH/s. Cada passo é um aumento de 1000×.`,
      `A saída de "participação na rede" mostra qual porcentagem do hashrate total da rede seu hardware representa.`
      ],
      scenarios: [
      `Comparação de pools: os pools de mineração reportam o hashrate contribuído em unidades diferentes. Use este conversor para normalizar todos os contribuidores para a mesma unidade.`,
      `Análise de crescimento do hashrate da rede: rastreie o crescimento do hashrate da rede Bitcoin em EH/s durante meses.`
      ],
      checklist: [
      `Antes de usar o hashrate em cálculos de lucratividade: 1) Confirme que a unidade exibida pelo seu software de mineração corresponde à unidade que está inserindo na calculadora. 2) Verifique que a comparação de hashrate da rede usa a mesma unidade base.`,
      `Após converter: verifique convertendo de volta para a unidade original.`
      ],
      mistakes: [
      `Confundir MH/s com TH/s para comparações GPU vs. ASIC.`,
      `Usar a unidade de hashrate do algoritmo incorreto para a calculadora de mineração.`
      ],
      benchmarks: [
      `Unidades de hashrate de referência por moeda/algoritmo (2024): Bitcoin (SHA-256): rede ≈600 EH/s; ASIC superior ≈200 TH/s.`,
      `Para contexto: 1 EH/s = 1.000 PH/s = 1.000.000 TH/s = 10^18 H/s.`
      ],
      execution: [
      `Fluxo de trabalho de conversão padrão: 1) Identifique a unidade de entrada. 2) Identifique a unidade alvo. 3) Insira o valor e selecione ambas as unidades no conversor. 4) Use o valor de saída no seu cálculo.`,
      `Para monitoramento: padronize em TH/s para monitoramento de ASIC e MH/s para GPU.`
      ],
      hygiene: [
      `Anote todas as cifras de hashrate em seus documentos de rastreamento com suas unidades.`,
      `Ao comparar hashrate ao longo do tempo, normalize todos os dados históricos para uma única unidade.`
      ],
      validation: [
      `Verifique a conversão: 1 TH/s = 1000 GH/s = 1.000.000 MH/s.`,
      `Verifique com o hashrate reportado pelo seu pool de mineração.`
      ],
    },
    tr: {
      interpret: [
      `Hashrate dönüştürücü, farklı hash gücü birimleri arasında dönüştürme yapar: H/s, KH/s, MH/s, GH/s, TH/s, PH/s ve EH/s. Her adım 1000× artıştır.`,
      `"Ağ payı" çıktısı, donanımınızın toplam ağ hashrate'inin yüzde kaçını temsil ettiğini gösterir.`
      ],
      scenarios: [
      `Havuz karşılaştırması: madencilik havuzları katkıda bulunulan hashrate'i farklı birimlerde raporlar. Tüm havuz katkıcılarını aynı birime normalleştirmek için bu dönüştürücüyü kullanın.`,
      `Ağ hashrate büyüme analizi: Bitcoin ağ hashrate büyümesini aylarca EH/s cinsinden takip edin.`
      ],
      checklist: [
      `Karlılık hesaplamalarında hashrate kullanmadan önce: 1) Madencilik yazılımınızın gösterdiği birimin karlılık hesaplayıcısına girdiğiniz birimle eşleştiğini onaylayın. 2) Ağ hashrate karşılaştırmasının aynı temel birimi kullandığını kontrol edin.`,
      `Dönüştürdükten sonra: orijinal birime geri dönüştürerek kontrol edin.`
      ],
      mistakes: [
      `GPU ile ASIC karşılaştırmaları için MH/s (megahash) ile TH/s (terahash) karıştırmak.`,
      `Madencilik hesaplayıcısı için yanlış algoritmanın hashrate birimini kullanmak.`
      ],
      benchmarks: [
      `Coin/algoritmaya göre referans hashrate birimleri (2024): Bitcoin (SHA-256): ağ ≈600 EH/s; üst ASIC ≈200 TH/s.`,
      `Bağlam için: 1 EH/s = 1.000 PH/s = 1.000.000 TH/s = 10^18 H/s.`
      ],
      execution: [
      `Standart dönüştürme iş akışı: 1) Giriş birimini belirleyin. 2) Hedef birimi belirleyin. 3) Değeri girin ve dönüştürücüde her iki birimi seçin. 4) Hesaplamanızda çıktı değerini kullanın.`,
      `İzleme için: ASIC izlemesinde TH/s ve GPU izlemesinde MH/s olarak standartlaştırın.`
      ],
      hygiene: [
      `Takip belgelerinizdeki tüm hashrate rakamlarını birimleriyle birlikte not edin.`,
      `Zaman içinde hashrate karşılaştırırken, trendleri çizmeden önce tüm tarihsel verileri tek bir birime normalleştirin.`
      ],
      validation: [
      `Dönüşümü doğrulayın: 1 TH/s = 1000 GH/s = 1.000.000 MH/s.`,
      `Madencilik havuzunuzun raporladığı hashrate ile çapraz kontrol yapın.`
      ],
    },
    hi: {
      interpret: [
      `हैशरेट कनवर्टर विभिन्न हैशिंग पावर इकाइयों के बीच अनुवाद करता है: H/s, KH/s, MH/s, GH/s, TH/s, PH/s और EH/s। प्रत्येक चरण 1000× की वृद्धि है।`,
      `"नेटवर्क शेयर" आउटपुट दिखाता है कि आपका हार्डवेयर कुल नेटवर्क हैशरेट का कितना प्रतिशत प्रतिनिधित्व करता है।`
      ],
      scenarios: [
      `पूल तुलना: माइनिंग पूल योगदान किए गए हैशरेट को विभिन्न इकाइयों में रिपोर्ट करते हैं। पूल के सभी योगदानकर्ताओं को एक ही इकाई में सामान्य बनाने के लिए इस कनवर्टर का उपयोग करें।`,
      `नेटवर्क हैशरेट वृद्धि विश्लेषण: महीनों में EH/s में Bitcoin नेटवर्क हैशरेट वृद्धि ट्रैक करें।`
      ],
      checklist: [
      `लाभप्रदता गणनाओं में हैशरेट का उपयोग करने से पहले: 1) पुष्टि करें कि आपके माइनिंग सॉफ़्टवेयर द्वारा प्रदर्शित इकाई लाभप्रदता कैलकुलेटर में दर्ज की जा रही इकाई से मेल खाती है। 2) जांचें कि नेटवर्क हैशरेट तुलना एक ही बेस इकाई का उपयोग करती है।`,
      `परिवर्तित करने के बाद: मूल इकाई में वापस परिवर्तित करके क्रॉस-चेक करें।`
      ],
      mistakes: [
      `GPU बनाम ASIC तुलना के लिए MH/s (मेगाहैश) को TH/s (टेराहैश) से भ्रमित करना।`,
      `माइनिंग कैलकुलेटर के लिए गलत एल्गोरिदम की हैशरेट इकाई का उपयोग करना।`
      ],
      benchmarks: [
      `कॉइन/एल्गोरिदम के अनुसार संदर्भ हैशरेट इकाइयां (2024): Bitcoin (SHA-256): नेटवर्क ≈600 EH/s; शीर्ष ASIC ≈200 TH/s।`,
      `संदर्भ के लिए: 1 EH/s = 1,000 PH/s = 1,000,000 TH/s = 10^18 H/s।`
      ],
      execution: [
      `मानक रूपांतरण वर्कफ़्लो: 1) इनपुट इकाई पहचानें। 2) लक्ष्य इकाई पहचानें। 3) कनवर्टर में मान दर्ज करें और दोनों इकाइयां चुनें। 4) अपनी गणना में आउटपुट मूल्य का उपयोग करें।`,
      `निगरानी के लिए: ASIC निगरानी के लिए TH/s और GPU निगरानी के लिए MH/s पर मानकीकृत करें।`
      ],
      hygiene: [
      `अपने ट्रैकिंग दस्तावेजों में सभी हैशरेट आंकड़ों को उनकी इकाइयों के साथ टिप्पणी दें।`,
      `समय के साथ हैशरेट की तुलना करते समय, ट्रेंड प्लॉट करने से पहले सभी ऐतिहासिक डेटा को एकल इकाई में सामान्य बनाएं।`
      ],
      validation: [
      `रूपांतरण सत्यापित करें: 1 TH/s = 1000 GH/s = 1,000,000 MH/s।`,
      `अपने माइनिंग पूल के रिपोर्ट किए गए हैशरेट के साथ क्रॉस-चेक करें।`
      ],
    },
    ru: {
      interpret: [
      `Конвертер хешрейта переводит между различными единицами вычислительной мощности: H/s, KH/s, MH/s, GH/s, TH/s, PH/s и EH/s. Каждый шаг — увеличение в 1000 раз. Ошибка в одну единицу префикса означает ошибку в 1000 раз.`,
      `Вывод "доля в сети" показывает, какой процент от общего хешрейта сети представляет ваше оборудование, что непосредственно определяет ожидаемую долю в вознаграждениях за блок.`
      ],
      scenarios: [
      `Сравнение пулов: майнинг-пулы сообщают внесённый хешрейт в разных единицах. Используйте конвертер для нормализации всех участников к единой единице перед сравнением.`,
      `Анализ роста хешрейта сети: отслеживайте рост хешрейта сети Bitcoin в EH/s за месяцы.`
      ],
      checklist: [
      `Перед использованием хешрейта в расчётах доходности: 1) Убедитесь, что единица, отображаемая майнинговым ПО, совпадает с единицей, вводимой в калькулятор доходности. 2) Проверьте, что сравнение с хешрейтом сети использует одну базовую единицу.`,
      `После конвертации: выполните обратную конвертацию для проверки.`
      ],
      mistakes: [
      `Путаница MH/s и TH/s при сравнении GPU и ASIC. GPU при майнинге Ethereum Classic даёт ≈60 MH/s = 0.00006 TH/s. ASIC может давать 110 TH/s. Разница в 1 833 000 раз.`,
      `Использование единиц хешрейта неправильного алгоритма. Bitcoin (SHA-256): TH/s; Ethereum Classic (ETHash): MH/s; Monero (RandomX): KH/s или MH/s.`
      ],
      benchmarks: [
      `Референсные единицы хешрейта по монетам/алгоритмам (2024): Bitcoin: сеть ≈600 EH/s, топ ASIC ≈200 TH/s. Ethereum Classic: топ GPU ≈60 MH/s. Kaspa: топ ASIC ≈100 TH/s. Monero: сеть ≈3 GH/s.`,
      `Для контекста: 1 EH/s = 1 000 PH/s = 1 000 000 TH/s = 10^18 H/s.`
      ],
      execution: [
      `Стандартный процесс конвертации: 1) Определите входную единицу. 2) Определите целевую единицу. 3) Введите значение и выберите обе единицы. 4) Используйте выходное значение в расчётах. 5) Записывайте единицу рядом с числом.`,
      `Для мониторинга: стандартизируйте на TH/s для ASIC и MH/s для GPU во всех инструментах.`
      ],
      hygiene: [
      `Аннотируйте все значения хешрейта в документах с указанием единиц (например, "200 TH/s", а не просто "200").`,
      `При сравнении хешрейта во времени нормализуйте все исторические данные к единой единице перед построением трендов.`
      ],
      validation: [
      `Проверьте конвертацию: 1 TH/s = 1 000 GH/s = 1 000 000 MH/s. Для 200 TH/s: в GH/s = 200 000 GH/s; в MH/s = 200 000 000 MH/s.`,
      `Сверьте с хешрейтом, сообщаемым пулом. Если спецификация 200 TH/s, а пул сообщает 185 TH/s — исследуйте потерю 7.5%.`
      ],
    },
  },


  'market-cap': {
    en: {
      interpret: [
        "Market capitalization figures give you a snapshot of how the market collectively values a crypto asset at a specific moment. A rising market cap typically signals growing investor confidence and capital inflows, while a declining market cap often points to profit-taking, fear, or reduced network activity. Context matters enormously: a $500 million market cap project in a niche sector may be a dominant player, while the same figure in a crowded category could indicate an underperformer. Always compare market cap changes against trading volume — large market cap moves on thin volume can be misleading.",
        "When interpreting results, pay attention to the relationship between circulating supply and total supply. A coin with 10% of its tokens in circulation will have a very different market cap trajectory than one with 90% circulating. Low circulating supply creates potential for future dilution that the market cap number alone won't reveal. For a complete picture, pair market cap data with fully diluted valuation (FDV) to understand the project's theoretical ceiling if all tokens were released today."
      ],
      scenarios: [
        "A DeFi protocol launches with a $2 million market cap and gains $800,000 in TVL over three weeks. Investors watch the market cap-to-TVL ratio compress from 2.5x to 1.8x, signaling improving fundamental value. This ratio tightening attracts value-oriented buyers who see the protocol becoming more efficiently priced relative to its actual usage and locked capital.",
        "A layer-1 blockchain has a $40 billion market cap but only 15% of tokens are circulating. Its FDV stands at $267 billion, exceeding many established blockchain networks. A sophisticated investor recognizes this as a red flag: once vesting schedules release the remaining 85%, enormous sell pressure could materialize, potentially collapsing the price even if the project executes flawlessly on its roadmap."
      ],
      checklist: [
        "Before acting on market cap data, verify you're using circulating supply (not total supply) for the calculation, check whether the current figure represents a multi-month high or low, and cross-reference with on-chain data to confirm the supply figures reported by price aggregators are accurate and up-to-date.",
        "Evaluate market cap in relation to at least three other metrics: FDV ratio, price-to-earnings equivalent for yield-generating protocols, and market cap dominance within the asset's sector. A single market cap figure without these comparisons provides limited actionable insight and can lead to poorly timed entry or exit decisions."
      ],
      mistakes: [
        "Treating market cap as equivalent to the total money invested in a project is a fundamental misunderstanding. If a token has 100,000 units and trades at $10, its $1 million market cap doesn't mean $1 million of cash flowed into it — it might have required just a few thousand dollars of buying pressure to move the last price to that level. This illusion of size fools many investors into overestimating project liquidity and stability.",
        "Ignoring sector context when evaluating market cap leads to poor comparisons. Comparing a DeFi token's market cap to a Layer-1 blockchain's market cap without adjusting for fundamentals, revenue, and user metrics produces meaningless rankings. Projects in different sectors have entirely different valuation multiples — applying uniform standards across sectors distorts your analysis."
      ],
      benchmarks: [
        "Large-cap cryptocurrencies (above $10 billion) historically exhibit lower volatility and better liquidity than mid-caps ($1–10 billion) and small-caps (below $1 billion). During the 2021 bull market, large-caps averaged 4x–8x gains from trough to peak, while small-caps frequently delivered 20x–100x — with correspondingly higher drawdowns of 90%+ during subsequent corrections.",
        "Market cap dominance metrics show Bitcoin typically capturing 40%–60% of total crypto market cap during consolidation phases, often rising to 65%–70% during bear market capitulation. Altcoin seasons historically begin when Bitcoin dominance drops below 45% and altcoin market caps collectively expand. Monitoring these dominance ratios helps time sector rotation between Bitcoin and altcoins."
      ],
      execution: [
        "When using market cap data to time entries, focus on market cap relative to recent peaks rather than absolute values. Buying at 30%–50% below a 90-day market cap high has historically provided better risk-adjusted returns than chasing tokens near all-time-high market caps. Set price alerts at key market cap thresholds — round numbers like $1B, $5B, and $10B often act as psychological resistance levels.",
        "For portfolio sizing based on market cap tiers, consider allocating the majority of crypto exposure to large-caps for stability, a smaller portion to mid-caps for growth, and a limited allocation to small-caps for asymmetric upside. Rebalance when individual positions exceed target allocations by more than 25%, selling into strength and buying on weakness to maintain intended risk levels."
      ],
      hygiene: [
        "Refresh market cap data at minimum every 24 hours for long-term positions, and every few minutes for active trading decisions. Stale data during fast-moving markets can lead to decisions based on prices that are 5%–15% off from reality. Use aggregator APIs with WebSocket streaming support for real-time market cap tracking during periods of high volatility.",
        "Maintain a log of market cap readings at key dates — project announcements, token unlock events, and major news — to build your own historical reference database. This record helps you identify whether the market has already priced in anticipated events or whether the market cap reflects outdated information. Personal data logs also reduce reliance on third-party historical data that may be inconsistent."
      ],
      validation: [
        "Validate market cap calculations by cross-referencing at least two independent data sources: CoinGecko, CoinMarketCap, or on-chain analytics platforms. Discrepancies of more than 2%–3% in circulating supply figures warrant investigation — sometimes tokens are burned, locked in smart contracts, or incorrectly counted as circulating. Verify supply data directly from blockchain explorers when precision matters.",
        "Test your market cap thesis against historical scenarios: would your investment rationale have held during the 2018 crypto winter when market caps fell 80%–95%? Would it have survived the March 2020 COVID crash? Stress-testing your thesis against these historical events reveals whether your market cap analysis accounts for tail risks or relies entirely on continued favorable conditions."
      ]
    },
    es: {
      interpret: [
        "La capitalización de mercado proporciona una instantánea del valor colectivo que el mercado asigna a un activo criptográfico en un momento específico. Un aumento de la capitalización generalmente señala creciente confianza inversora y flujos de capital, mientras que una caída suele indicar toma de ganancias, miedo o reducción de actividad en la red. El contexto es fundamental: una capitalización de $500 millones en un sector de nicho puede representar al jugador dominante, mientras que la misma cifra en una categoría saturada podría indicar bajo rendimiento.",
        "Al interpretar los resultados, presta atención a la relación entre la oferta circulante y la oferta total. Una moneda con el 10% de sus tokens en circulación tendrá una trayectoria de capitalización muy diferente a una con el 90% circulando. La baja oferta circulante crea el potencial de una dilución futura que el número de capitalización por sí solo no revelará. Para una imagen completa, combina datos de capitalización con la valoración completamente diluida (FDV)."
      ],
      scenarios: [
        "Un protocolo DeFi lanza con una capitalización de $2 millones y gana $800,000 en TVL en tres semanas. Los inversores observan cómo la relación capitalización-TVL se comprime de 2.5x a 1.8x, señalando una mejora en el valor fundamental. Esta compresión atrae compradores orientados al valor que ven el protocolo valorándose de manera más eficiente en relación con su uso real.",
        "Una blockchain de capa 1 tiene una capitalización de $40 mil millones, pero solo el 15% de los tokens están en circulación. Su FDV asciende a $267 mil millones, superando a muchas redes blockchain establecidas. Un inversor sofisticado reconoce esto como una señal de alerta: una vez que los calendarios de adquisición liberen el 85% restante, podría materializarse una enorme presión vendedora."
      ],
      checklist: [
        "Antes de actuar sobre datos de capitalización, verifica que estás usando la oferta circulante (no la oferta total) para el cálculo, comprueba si la cifra actual representa un máximo o mínimo de varios meses, y contrasta con datos on-chain para confirmar que las cifras de oferta reportadas por los agregadores de precios sean precisas y actualizadas.",
        "Evalúa la capitalización en relación con al menos otros tres métricas: ratio FDV, equivalente precio-ganancias para protocolos que generan rendimiento, y dominancia de capitalización dentro del sector del activo. Una sola cifra de capitalización sin estas comparaciones proporciona información accionable limitada."
      ],
      mistakes: [
        "Tratar la capitalización de mercado como equivalente al dinero total invertido en un proyecto es un malentendido fundamental. Si un token tiene 100,000 unidades y cotiza a $10, su capitalización de $1 millón no significa que $1 millón de efectivo fluyó hacia él — podría haber requerido solo unos pocos miles de dólares de presión compradora para mover el último precio a ese nivel.",
        "Ignorar el contexto sectorial al evaluar la capitalización lleva a comparaciones pobres. Comparar la capitalización de un token DeFi con la de una blockchain de Capa 1 sin ajustar por fundamentos, ingresos y métricas de usuarios produce rankings sin sentido. Los proyectos en diferentes sectores tienen múltiplos de valoración completamente diferentes."
      ],
      benchmarks: [
        "Las criptomonedas de gran capitalización (más de $10 mil millones) históricamente exhiben menor volatilidad y mejor liquidez que las de mediana ($1–10 mil millones) y pequeña capitalización (menos de $1 mil millones). Durante el mercado alcista de 2021, las de gran capitalización promediaron ganancias de 4x–8x desde el mínimo al máximo, mientras que las de pequeña capitalización frecuentemente entregaron 20x–100x.",
        "Las métricas de dominancia de capitalización muestran que Bitcoin típicamente captura el 40%–60% de la capitalización total del mercado cripto durante fases de consolidación, a menudo subiendo al 65%–70% durante la capitulación del mercado bajista. Las temporadas altcoin históricamente comienzan cuando la dominancia de Bitcoin cae por debajo del 45%."
      ],
      execution: [
        "Al usar datos de capitalización para temporizar entradas, enfócate en la capitalización relativa a picos recientes en lugar de valores absolutos. Comprar al 30%–50% por debajo de un máximo de capitalización de 90 días históricamente ha proporcionado mejores retornos ajustados al riesgo que perseguir tokens cerca de máximos históricos de capitalización.",
        "Para el dimensionamiento de cartera basado en niveles de capitalización, considera asignar la mayoría de la exposición cripto a grandes capitalizaciones para estabilidad, una porción menor a medianas capitalizaciones para crecimiento, y una asignación limitada a pequeñas capitalizaciones para potencial alcista asimétrico."
      ],
      hygiene: [
        "Actualiza los datos de capitalización al menos cada 24 horas para posiciones a largo plazo, y cada pocos minutos para decisiones de trading activo. Los datos obsoletos durante mercados de rápido movimiento pueden llevar a decisiones basadas en precios que difieren un 5%–15% de la realidad.",
        "Mantén un registro de lecturas de capitalización en fechas clave — anuncios del proyecto, eventos de desbloqueo de tokens y noticias importantes — para construir tu propia base de datos de referencia histórica. Este registro te ayuda a identificar si el mercado ya ha descontado eventos anticipados."
      ],
      validation: [
        "Valida los cálculos de capitalización cruzando al menos dos fuentes de datos independientes: CoinGecko, CoinMarketCap o plataformas de análisis on-chain. Discrepancias superiores al 2%–3% en las cifras de oferta circulante justifican investigación — a veces los tokens se queman, se bloquean en contratos inteligentes o se cuentan incorrectamente.",
        "Prueba tu tesis de capitalización contra escenarios históricos: ¿habría mantenido tu razonamiento de inversión durante el invierno cripto de 2018 cuando las capitalizaciones cayeron un 80%–95%? ¿Habría sobrevivido al crash de COVID de marzo de 2020? Estas pruebas de estrés revelan si tu análisis tiene en cuenta riesgos extremos."
      ]
    },
    pt: {
      interpret: [
        "A capitalização de mercado fornece um instantâneo do valor coletivo que o mercado atribui a um ativo criptográfico em um momento específico. Uma capitalização crescente tipicamente sinaliza crescente confiança dos investidores e influxos de capital, enquanto uma capitalização em declínio frequentemente aponta para realização de lucros, medo ou redução da atividade da rede. O contexto importa enormemente: uma capitalização de $500 milhões em um setor de nicho pode representar o player dominante.",
        "Ao interpretar os resultados, preste atenção ao relacionamento entre o fornecimento circulante e o fornecimento total. Uma moeda com 10% de seus tokens em circulação terá uma trajetória de capitalização muito diferente de uma com 90% circulando. Baixo fornecimento circulante cria potencial para diluição futura que o número de capitalização sozinho não revelará."
      ],
      scenarios: [
        "Um protocolo DeFi lança com uma capitalização de $2 milhões e ganha $800.000 em TVL em três semanas. Os investidores observam a relação capitalização-TVL comprimir de 2,5x para 1,8x, sinalizando melhoria do valor fundamental. Esta compressão da relação atrai compradores orientados ao valor.",
        "Uma blockchain de camada 1 tem uma capitalização de $40 bilhões, mas apenas 15% dos tokens estão em circulação. Seu FDV fica em $267 bilhões, superando muitas redes blockchain estabelecidas. Um investidor sofisticado reconhece isso como um sinal de alerta: uma vez que os cronogramas de vesting liberem os 85% restantes, enorme pressão de venda pode se materializar."
      ],
      checklist: [
        "Antes de agir sobre dados de capitalização, verifique se está usando o fornecimento circulante (não o fornecimento total) para o cálculo, verifique se a figura atual representa um máximo ou mínimo de vários meses, e faça referência cruzada com dados on-chain para confirmar que as figuras de fornecimento reportadas pelos agregadores de preços são precisas.",
        "Avalie a capitalização em relação a pelo menos três outras métricas: razão FDV, equivalente preço-lucro para protocolos geradores de rendimento, e dominância de capitalização dentro do setor do ativo. Uma única figura de capitalização sem essas comparações fornece insight acionável limitado."
      ],
      mistakes: [
        "Tratar a capitalização de mercado como equivalente ao dinheiro total investido em um projeto é um mal-entendido fundamental. Se um token tem 100.000 unidades e negocia a $10, sua capitalização de $1 milhão não significa que $1 milhão de dinheiro fluiu para ele — pode ter exigido apenas alguns milhares de dólares de pressão de compra para mover o último preço a esse nível.",
        "Ignorar o contexto setorial ao avaliar a capitalização leva a comparações pobres. Comparar a capitalização de um token DeFi com a de uma blockchain de Camada 1 sem ajustar por fundamentos, receitas e métricas de usuários produz rankings sem sentido. Projetos em diferentes setores têm múltiplos de avaliação completamente diferentes."
      ],
      benchmarks: [
        "Criptomoedas de grande capitalização (acima de $10 bilhões) historicamente exibem menor volatilidade e melhor liquidez do que as de média ($1–10 bilhões) e pequena capitalização (abaixo de $1 bilhão). Durante o mercado em alta de 2021, as de grande capitalização tiveram ganhos médios de 4x–8x do fundo ao pico.",
        "Métricas de dominância de capitalização mostram que o Bitcoin tipicamente captura 40%–60% da capitalização total do mercado cripto durante fases de consolidação, frequentemente subindo para 65%–70% durante a capitulação do mercado de baixa. Temporadas de altcoins historicamente começam quando a dominância do Bitcoin cai abaixo de 45%."
      ],
      execution: [
        "Ao usar dados de capitalização para temporizar entradas, concentre-se na capitalização relativa a picos recentes em vez de valores absolutos. Comprar a 30%–50% abaixo de um máximo de capitalização de 90 dias historicamente proporcionou melhores retornos ajustados ao risco do que perseguir tokens perto de capitalizações de máximos históricos.",
        "Para dimensionamento de portfólio com base em níveis de capitalização, considere alocar a maioria da exposição cripto para grandes capitalizações para estabilidade, uma porção menor para capitalizações médias para crescimento, e uma alocação limitada para pequenas capitalizações para potencial de alta assimétrico."
      ],
      hygiene: [
        "Atualize os dados de capitalização no mínimo a cada 24 horas para posições de longo prazo, e a cada poucos minutos para decisões de trading ativo. Dados obsoletos durante mercados de movimento rápido podem levar a decisões baseadas em preços que diferem 5%–15% da realidade.",
        "Mantenha um registro das leituras de capitalização em datas-chave — anúncios do projeto, eventos de desbloqueio de tokens e notícias importantes — para construir seu próprio banco de dados de referência histórica. Este registro ajuda a identificar se o mercado já precificou eventos antecipados."
      ],
      validation: [
        "Valide os cálculos de capitalização cruzando pelo menos duas fontes de dados independentes: CoinGecko, CoinMarketCap ou plataformas de análise on-chain. Discrepâncias de mais de 2%–3% nas figuras de fornecimento circulante justificam investigação — às vezes os tokens são queimados, bloqueados em contratos inteligentes ou incorretamente contabilizados.",
        "Teste sua tese de capitalização contra cenários históricos: seu raciocínio de investimento teria se sustentado durante o inverno cripto de 2018 quando as capitalizações caíram 80%–95%? Teria sobrevivido ao crash COVID de março de 2020? O teste de estresse de sua tese contra esses eventos históricos revela se sua análise leva em conta riscos extremos."
      ]
    },
    tr: {
      interpret: [
        "Piyasa değeri rakamları, piyasanın belirli bir anda bir kripto varlığına kolektif olarak atadığı değerin anlık görüntüsünü sağlar. Artan bir piyasa değeri genellikle büyüyen yatırımcı güvenini ve sermaye girişlerini işaret ederken, düşen bir piyasa değeri genellikle kâr realizasyonuna, korku veya azalan ağ aktivitesine işaret eder. Bağlam büyük önem taşır: niş bir sektörde 500 milyon dolarlık piyasa değeri baskın oyuncuyu temsil edebilir.",
        "Sonuçları yorumlarken, dolaşımdaki arz ile toplam arz arasındaki ilişkiye dikkat edin. Tokenlerinin %10'u dolaşımda olan bir coin, %90'ı dolaşımda olana göre çok farklı bir piyasa değeri yörüngesine sahip olacaktır. Düşük dolaşımdaki arz, piyasa değeri rakamının tek başına ortaya koymayacağı gelecekteki seyreltme potansiyeli yaratır."
      ],
      scenarios: [
        "Bir DeFi protokolü 2 milyon dolarlık piyasa değeriyle başlatılır ve üç haftada 800.000 dolar TVL kazanır. Yatırımcılar piyasa değeri-TVL oranının 2.5x'ten 1.8x'e sıkışmasını izler; bu, temel değerde iyileşmeye işaret eder. Bu oran sıkışması, protokolün gerçek kullanımına göre daha verimli fiyatlandırıldığını gören değer odaklı alıcıları çeker.",
        "Bir Layer-1 blockchain'in piyasa değeri 40 milyar dolar ancak tokenlerinin yalnızca %15'i dolaşımda. FDV'si 267 milyar dolara yükseliyor, pek çok köklü blockchain ağını geçiyor. Deneyimli bir yatırımcı bunu kırmızı bayrak olarak tanır: vesting takvimi kalan %85'i serbest bıraktığında, muazzam satış baskısı ortaya çıkabilir."
      ],
      checklist: [
        "Piyasa değeri verilerine göre işlem yapmadan önce, hesaplama için dolaşımdaki arzı (toplam arzı değil) kullandığınızı doğrulayın, mevcut rakamin birkaç aylık yüksek veya düşük seviyeyi temsil edip etmediğini kontrol edin ve fiyat toplayıcıları tarafından bildirilen arz rakamlarının doğru olduğunu doğrulamak için zincir üstü verilerle çapraz referans yapın.",
        "Piyasa değerini en az üç diğer metrikle ilişkili olarak değerlendirin: FDV oranı, getiri sağlayan protokoller için fiyat-kazanç eşdeğeri ve varlığın sektörü içindeki piyasa değeri baskınlığı. Bu karşılaştırmalar olmaksızın tek bir piyasa değeri rakamı sınırlı eyleme geçirilebilir içgörü sağlar."
      ],
      mistakes: [
        "Piyasa değerini bir projeye yatırılan toplam parayla eşdeğer olarak ele almak temel bir yanlış anlamadır. Bir tokenin 100.000 birimi varsa ve 10 dolara işlem görüyorsa, 1 milyon dolarlık piyasa değeri 1 milyon doların ona aktığı anlamına gelmez — son fiyatı o seviyeye taşımak için yalnızca birkaç bin dolarlık alım baskısı gerekmiş olabilir.",
        "Piyasa değerini değerlendirirken sektör bağlamını görmezden gelmek zayıf karşılaştırmalara yol açar. Bir DeFi tokeninin piyasa değerini bir Layer-1 blockchain'inkiyle temeller, gelirler ve kullanıcı metrikleri açısından ayarlamadan karşılaştırmak anlamsız sıralamalar üretir."
      ],
      benchmarks: [
        "Büyük piyasa değerli kripto paralar (10 milyar doların üzerinde) tarihsel olarak orta (1–10 milyar dolar) ve küçük piyasa değerlilerine (1 milyar doların altında) kıyasla daha düşük oynaklık ve daha iyi likidite göstermektedir. 2021 boğa piyasasında, büyük piyasa değerliler dipten tepeye ortalama 4x–8x kazanç sağladı.",
        "Piyasa değeri baskınlığı metrikleri, Bitcoin'in konsolidasyon aşamalarında genellikle toplam kripto piyasa değerinin %40–%60'ını yakaladığını gösteriyor; bu oran ayı piyasası kapitülasyonu sırasında genellikle %65–%70'e yükseliyor. Altcoin sezonları tarihsel olarak Bitcoin baskınlığı %45'in altına düştüğünde başlar."
      ],
      execution: [
        "Girişleri zamanlamak için piyasa değeri verilerini kullanırken, mutlak değerler yerine son zirvelere göre piyasa değerine odaklanın. 90 günlük piyasa değeri zirvesinin %30–%50 altından almak, tarihsel olarak tüm zamanların yüksek piyasa değerlerine yakın token kovalamaktan daha iyi risk-ayarlı getiriler sağlamıştır.",
        "Piyasa değeri katmanlarına dayalı portföy boyutlandırması için, kripto maruziyetinin büyük bölümünü stabilite için büyük piyasa değerlilerine, daha küçük bir bölümünü büyüme için orta piyasa değerlilerine ve asimetrik yükseliş potansiyeli için sınırlı bir miktarını küçük piyasa değerlilerine tahsis etmeyi düşünün."
      ],
      hygiene: [
        "Uzun vadeli pozisyonlar için piyasa değeri verilerini en az 24 saatte bir, aktif işlem kararları için ise birkaç dakikada bir yenileyin. Hızlı hareket eden piyasalardaki eski veriler, gerçeklikten %5–%15 uzakta fiyatlara dayalı kararlara yol açabilir.",
        "Önemli tarihler için piyasa değeri okumalarının kaydını tutun — proje duyuruları, token kilidi açma etkinlikleri ve büyük haberler — kendi tarihsel referans veri tabanınızı oluşturmak için. Bu kayıt, piyasanın beklenen olayları zaten fiyatlandırıp fiyatlandırmadığını belirlemenize yardımcı olur."
      ],
      validation: [
        "Piyasa değeri hesaplamalarını en az iki bağımsız veri kaynağı ile çapraz referans yaparak doğrulayın: CoinGecko, CoinMarketCap veya zincir üstü analitik platformlar. Dolaşımdaki arz rakamlarında %2–%3'ü aşan tutarsızlıklar araştırma gerektirir.",
        "Piyasa değeri tezinizi tarihsel senaryolara karşı test edin: yatırım gerekçeniz piyasa değerlerinin %80–%95 düştüğü 2018 kripto kışında ayakta kalır mıydı? Mart 2020 COVID çöküşünden sağ çıkabilir miydi?"
      ]
    },
    hi: {
      interpret: [
        "मार्केट कैपिटलाइज़ेशन के आंकड़े यह दिखाते हैं कि बाज़ार किसी क्रिप्टो संपत्ति को किसी विशेष समय पर सामूहिक रूप से कितना मूल्यवान समझता है। बढ़ती मार्केट कैप आमतौर पर निवेशकों का बढ़ता विश्वास और पूंजी प्रवाह दर्शाती है, जबकि गिरती मार्केट कैप अक्सर मुनाफावसूली, डर या नेटवर्क गतिविधि में कमी का संकेत देती है। संदर्भ बहुत महत्वपूर्ण है: एक आला क्षेत्र में $500 मिलियन की मार्केट कैप प्रमुख खिलाड़ी हो सकती है।",
        "परिणामों की व्याख्या करते समय, सर्कुलेटिंग सप्लाई और कुल सप्लाई के बीच संबंध पर ध्यान दें। जिस कॉइन के 10% टोकन सर्कुलेशन में हैं, उसकी मार्केट कैप का रास्ता 90% सर्कुलेट करने वाले कॉइन से बहुत अलग होगा। कम सर्कुलेटिंग सप्लाई भविष्य के डाइल्यूशन की संभावना बनाती है जो अकेले मार्केट कैप नंबर से नहीं दिखती।"
      ],
      scenarios: [
        "एक DeFi प्रोटोकॉल $2 मिलियन की मार्केट कैप के साथ लॉन्च होता है और तीन हफ्तों में $800,000 TVL हासिल करता है। निवेशक देखते हैं कि मार्केट कैप-TVL अनुपात 2.5x से 1.8x तक सिकुड़ गया है, जो मूलभूत मूल्य में सुधार का संकेत है। यह अनुपात का सिकुड़ना उन मूल्य-उन्मुख खरीदारों को आकर्षित करता है जो देखते हैं कि प्रोटोकॉल अपने वास्तविक उपयोग के सापेक्ष अधिक कुशलतापूर्वक मूल्यांकित हो रहा है।",
        "एक Layer-1 ब्लॉकचेन में $40 बिलियन की मार्केट कैप है लेकिन केवल 15% टोकन सर्कुलेशन में हैं। इसका FDV $267 बिलियन है, जो कई स्थापित ब्लॉकचेन नेटवर्क से अधिक है। एक परिष्कृत निवेशक इसे चेतावनी संकेत के रूप में पहचानता है: एक बार जब वेस्टिंग शेड्यूल शेष 85% जारी करते हैं, तो भारी बिक्री दबाव आ सकता है।"
      ],
      checklist: [
        "मार्केट कैप डेटा पर कार्रवाई करने से पहले, सत्यापित करें कि आप गणना के लिए सर्कुलेटिंग सप्लाई (कुल सप्लाई नहीं) का उपयोग कर रहे हैं, जांचें कि मौजूदा आंकड़ा कई महीनों के उच्च या निम्न को दर्शाता है, और ऑन-चेन डेटा से क्रॉस-रेफरेंस करें।",
        "मार्केट कैप का मूल्यांकन कम से कम तीन अन्य मेट्रिक्स के संबंध में करें: FDV अनुपात, उपज-उत्पन्न करने वाले प्रोटोकॉल के लिए मूल्य-आय समकक्ष, और संपत्ति के क्षेत्र के भीतर मार्केट कैप प्रभुत्व। इन तुलनाओं के बिना एकल मार्केट कैप आंकड़ा सीमित उपयोगी जानकारी प्रदान करता है।"
      ],
      mistakes: [
        "मार्केट कैप को किसी प्रोजेक्ट में निवेश की गई कुल राशि के बराबर मानना एक मूलभूत गलतफहमी है। यदि एक टोकन की 100,000 इकाइयाँ हैं और यह $10 पर ट्रेड होता है, तो इसकी $1 मिलियन की मार्केट कैप का मतलब यह नहीं है कि $1 मिलियन नकद उसमें प्रवाहित हुआ।",
        "मार्केट कैप का मूल्यांकन करते समय क्षेत्र के संदर्भ को नजरअंदाज करना खराब तुलनाओं की ओर ले जाता है। DeFi टोकन की मार्केट कैप की तुलना Layer-1 ब्लॉकचेन की मार्केट कैप से मूल बातों, राजस्व और उपयोगकर्ता मेट्रिक्स को समायोजित किए बिना करना अर्थहीन रैंकिंग उत्पन्न करता है।"
      ],
      benchmarks: [
        "बड़े मार्केट कैप क्रिप्टोकरेंसी (10 बिलियन डॉलर से ऊपर) ऐतिहासिक रूप से मध्यम ($1–10 बिलियन) और छोटे मार्केट कैप (1 बिलियन डॉलर से नीचे) की तुलना में कम अस्थिरता और बेहतर तरलता प्रदर्शित करती हैं। 2021 के बुल मार्केट में, बड़े मार्केट कैप ने ट्रफ से शिखर तक औसतन 4x–8x लाभ दिया।",
        "मार्केट कैप प्रभुत्व मेट्रिक्स दिखाते हैं कि बिटकॉइन आमतौर पर समेकन चरणों के दौरान कुल क्रिप्टो मार्केट कैप का 40%–60% पकड़ता है, अक्सर बेयर मार्केट कैपिटुलेशन के दौरान 65%–70% तक बढ़ जाता है।"
      ],
      execution: [
        "प्रवेश को समय देने के लिए मार्केट कैप डेटा का उपयोग करते समय, निरपेक्ष मूल्यों के बजाय हाल के शिखरों के सापेक्ष मार्केट कैप पर ध्यान केंद्रित करें। 90-दिन के मार्केट कैप उच्च से 30%–50% नीचे खरीदना ऐतिहासिक रूप से सर्वकालिक उच्च मार्केट कैप के पास टोकन का पीछा करने की तुलना में बेहतर जोखिम-समायोजित रिटर्न प्रदान करता है।",
        "मार्केट कैप स्तरों के आधार पर पोर्टफोलियो आकार के लिए, स्थिरता के लिए अधिकांश क्रिप्टो एक्सपोज़र बड़े मार्केट कैप को, विकास के लिए एक छोटा हिस्सा मध्य मार्केट कैप को, और असममित ऊपरी क्षमता के लिए सीमित आवंटन छोटे मार्केट कैप को देने पर विचार करें।"
      ],
      hygiene: [
        "दीर्घकालिक पोजीशन के लिए कम से कम हर 24 घंटे में और सक्रिय ट्रेडिंग निर्णयों के लिए हर कुछ मिनटों में मार्केट कैप डेटा को रीफ्रेश करें। तेजी से बदलते बाज़ारों में पुराना डेटा उन कीमतों पर आधारित निर्णयों की ओर ले जा सकता है जो वास्तविकता से 5%–15% दूर हैं।",
        "प्रमुख तारीखों पर मार्केट कैप रीडिंग का लॉग बनाए रखें — प्रोजेक्ट घोषणाएं, टोकन अनलॉक इवेंट और प्रमुख समाचार — अपना खुद का ऐतिहासिक संदर्भ डेटाबेस बनाने के लिए।"
      ],
      validation: [
        "कम से कम दो स्वतंत्र डेटा स्रोतों को क्रॉस-रेफरेंस करके मार्केट कैप गणनाओं को मान्य करें: CoinGecko, CoinMarketCap, या ऑन-चेन एनालिटिक्स प्लेटफॉर्म। सर्कुलेटिंग सप्लाई आंकड़ों में 2%–3% से अधिक की विसंगतियां जांच की मांग करती हैं।",
        "अपनी मार्केट कैप थीसिस को ऐतिहासिक परिदृश्यों के विरुद्ध परखें: क्या आपका निवेश तर्क 2018 के क्रिप्टो शीतकाल में टिका होता जब मार्केट कैप 80%–95% गिरी? क्या यह मार्च 2020 COVID क्रैश से बच सकता था?"
      ]
    },
    ru: {
      interpret: [
        "Показатели рыночной капитализации дают мгновенный снимок того, как рынок коллективно оценивает криптоактив в конкретный момент. Растущая капитализация обычно сигнализирует о росте доверия инвесторов и притоке капитала, тогда как снижающаяся часто указывает на фиксацию прибыли, страх или снижение активности сети. Контекст имеет огромное значение: капитализация в $500 млн в нишевом секторе может представлять доминирующего игрока.",
        "При интерпретации результатов обратите внимание на соотношение между обращающимся предложением и общим предложением. Монета с 10% токенов в обращении будет иметь совершенно иную траекторию капитализации, чем та, где в обращении находится 90%. Низкое обращающееся предложение создаёт потенциал будущего размывания, которое одно число капитализации не раскроет."
      ],
      scenarios: [
        "DeFi-протокол запускается с капитализацией $2 млн и за три недели набирает $800 тыс. TVL. Инвесторы наблюдают, как соотношение капитализации к TVL сжимается с 2,5x до 1,8x, сигнализируя об улучшении фундаментальной ценности. Это сжатие привлекает ценностно-ориентированных покупателей, которые видят, что протокол становится более эффективно оценённым.",
        "Блокчейн первого уровня имеет капитализацию $40 млрд, но в обращении находится лишь 15% токенов. Его FDV составляет $267 млрд, превышая многие устоявшиеся блокчейн-сети. Опытный инвестор распознаёт в этом красный флаг: как только графики вестинга высвободят оставшиеся 85%, может материализоваться огромное давление продавцов."
      ],
      checklist: [
        "Перед принятием решений на основе данных о капитализации убедитесь, что используете обращающееся предложение (а не общее) для расчёта, проверьте, является ли текущая цифра многомесячным максимумом или минимумом, и сверьтесь с данными on-chain для подтверждения точности цифр предложения.",
        "Оценивайте капитализацию в соотношении как минимум с тремя другими метриками: коэффициент FDV, аналог P/E для протоколов, генерирующих доход, и доминирование капитализации внутри сектора актива. Единственное число капитализации без этих сравнений даёт ограниченные полезные выводы."
      ],
      mistakes: [
        "Отождествление рыночной капитализации с общей суммой вложенных в проект денег — фундаментальное заблуждение. Если токен имеет 100 000 единиц и торгуется по $10, его капитализация $1 млн не означает, что в него вложен $1 млн — возможно, потребовалось лишь несколько тысяч долларов покупательного давления, чтобы поднять цену до этого уровня.",
        "Игнорирование отраслевого контекста при оценке капитализации приводит к некорректным сравнениям. Сравнение капитализации DeFi-токена с капитализацией блокчейна первого уровня без учёта фундаментальных показателей, выручки и пользовательских метрик даёт бессмысленные рейтинги."
      ],
      benchmarks: [
        "Крупные криптовалюты (выше $10 млрд) исторически демонстрируют меньшую волатильность и лучшую ликвидность по сравнению со средними ($1–10 млрд) и малыми (ниже $1 млрд). В бычьем рынке 2021 года крупные выросли в среднем в 4–8 раз от минимума до максимума.",
        "Метрики доминирования показывают, что Bitcoin обычно захватывает 40–60% общей капитализации крипторынка в фазах консолидации, нередко поднимаясь до 65–70% во время капитуляции медвежьего рынка. Сезоны альткоинов исторически начинаются, когда доминирование Bitcoin опускается ниже 45%."
      ],
      execution: [
        "При использовании данных о капитализации для выбора момента входа ориентируйтесь на капитализацию относительно недавних пиков, а не на абсолютные значения. Покупка при снижении на 30–50% от 90-дневного максимума капитализации исторически давала лучший результат с поправкой на риск, чем погоня за токенами вблизи исторических максимумов.",
        "При распределении портфеля по уровням капитализации рассмотрите выделение большей части крипто-экспозиции в крупные (для стабильности), меньшей — в средние (для роста) и ограниченной доли — в малые (для асимметричного потенциала роста)."
      ],
      hygiene: [
        "Обновляйте данные о капитализации не реже одного раза в 24 часа для долгосрочных позиций и каждые несколько минут для активной торговли. Устаревшие данные в быстро меняющихся рынках могут приводить к решениям, основанным на ценах, которые отличаются от реальных на 5–15%.",
        "Ведите журнал показателей капитализации на ключевые даты — объявления проекта, события разблокировки токенов, крупные новости — для формирования собственной базы исторических данных. Этот журнал помогает определить, заложил ли рынок ожидаемые события в цену."
      ],
      validation: [
        "Проверяйте расчёты капитализации, сверяясь не менее чем с двумя независимыми источниками: CoinGecko, CoinMarketCap или платформами on-chain аналитики. Расхождения в цифрах обращающегося предложения более 2–3% требуют выяснения — иногда токены сожжены, заблокированы в смарт-контрактах или неправильно учтены.",
        "Проверяйте вашу теорию капитализации на исторических сценариях: выстоял бы ваш инвестиционный аргумент в криптозиму 2018 года, когда капитализации упали на 80–95%? Пережил бы обвал COVID в марте 2020 года? Стресс-тестирование показывает, учитывает ли ваш анализ хвостовые риски."
      ]
    }
  },
  'fully-diluted-valuation': {
    en: {
      interpret: [
        "Fully diluted valuation (FDV) represents the maximum possible market cap if every token that will ever exist — including those locked in vesting schedules, team allocations, and future emissions — were circulating and priced at the current rate. A high FDV relative to current market cap signals massive future supply that could dilute existing holders. When FDV is 5x–10x the market cap, it means the market is valuing only a fraction of the total project, and future token releases will exert sustained sell pressure unless demand grows proportionally.",
        "The FDV-to-market-cap ratio tells a critical story about supply dynamics. A ratio of 1.0 means all tokens are already circulating — there's no hidden dilution risk. A ratio of 10x means 90% of tokens haven't entered the market yet. Projects often choose low initial circulating supply to inflate price metrics and attract headline-chasing investors. Sophisticated analysis requires adjusting for anticipated unlock schedules and modeling the price impact of each major release event."
      ],
      scenarios: [
        "A new DeFi protocol launches with 5% of total tokens circulating, priced at $2 each. Its market cap is $10 million, but FDV is $200 million. Six months later, team vesting unlocks an additional 20% of supply. If demand doesn't increase proportionally, basic supply-demand mechanics suggest the price could fall 15%–25% around the unlock date. Investors who modeled this FDV scenario entered at a discount and positioned short-term hedges to protect gains.",
        "A governance token with FDV of $8 billion launches when comparable governance tokens have market caps of $300–500 million. The protocol is unproven, has minimal TVL, and its roadmap shows three years of continuous token emissions. The $8 billion FDV implies the market is pricing in extraordinary future growth that most comparable projects never achieved. This scenario warns of significant overvaluation relative to fundamentals."
      ],
      checklist: [
        "Before investing in any project, verify the complete token unlock schedule, identify all vesting cliffs (sudden large releases), and calculate the monthly token inflation rate. If a project releases 20%+ of supply in a single month, assess whether protocol revenue and user growth realistically justify the associated demand that would absorb that supply without significant price impact.",
        "Compare FDV to total value locked (TVL), annualized protocol revenue, and unique active wallets. For DeFi projects, an FDV-to-TVL ratio below 1x suggests potential undervaluation. An FDV-to-revenue multiple above 100x suggests extreme growth priced in that may not materialize — assess whether projected growth rates are consistent with comparable protocol benchmarks."
      ],
      mistakes: [
        "Ignoring FDV and focusing only on market cap is one of the most expensive mistakes in crypto investing. Many retail investors bought tokens appearing 'cheap' by market cap without realizing the 95% of tokens held by team and VCs would hit the market within 12–18 months, eliminating any price gains. Always model the token supply schedule as thoroughly as you model the technology.",
        "Assuming FDV is a price ceiling is another common error. FDV is calculated using the current price — if demand surges, the price increases and so does FDV. Some high-FDV projects have delivered strong returns when adoption significantly exceeded token emission rates. The key is evaluating whether the project's growth trajectory can outpace dilution — not treating FDV as an automatic rejection criterion."
      ],
      benchmarks: [
        "During the 2021 cycle, many successful DeFi protocols maintained FDV-to-TVL ratios between 0.5x and 2x at their growth phase. Projects above 5x FDV-to-TVL frequently underperformed as token unlocks consistently outpaced organic demand growth. Using this ratio as a screening tool would have eliminated many of the worst-performing tokens from candidate lists.",
        "Venture-backed tokens with FDV above $1 billion at launch have historically underperformed compared to lower-FDV alternatives over 12-month holding periods. This pattern reflects the structural reality that early investors and teams need liquidity events, and high-FDV launches make these exits more impactful on price. Projects launching at sub-$100 million FDV with strong fundamentals have shown the best risk-adjusted returns over 24-month periods."
      ],
      execution: [
        "Build a token release model in a spreadsheet before committing significant capital. Map every known unlock event with date, quantity, and current dollar value at time of expected release. Model three scenarios: base case (price unchanged), bull case (price up 50%), and bear case (price down 50%). This exercise reveals the actual financial impact of each unlock and helps you decide whether to hold through events or reduce exposure beforehand.",
        "Set calendar reminders for major unlock events 30 days and 7 days in advance. In the weeks before significant vesting cliffs, monitor on-chain activity for team and VC wallet addresses. If large addresses are moving tokens to exchanges, this on-chain intelligence can signal imminent selling pressure. Respond by either reducing exposure or implementing options hedges if available on the asset."
      ],
      hygiene: [
        "Maintain a vesting calendar for every project in your portfolio. This document should include: total token supply, current circulating supply, monthly inflation rate, and dates of each unlock greater than 1% of total supply. Review this calendar monthly and recalculate FDV at current prices to track how the dilution risk evolves as token price changes.",
        "Cross-reference vesting information from at least three sources: the project's official tokenomics documentation, a blockchain explorer showing actual token contract data, and a third-party tracker like TokenUnlocks or Vestlab. Discrepancies between official documentation and on-chain reality are rare but critically important to identify — projects have occasionally misrepresented their vesting schedules."
      ],
      validation: [
        "Verify FDV calculations using blockchain data rather than relying solely on price aggregators. Read the token contract to confirm max supply, check the actual distribution across addresses, and identify large unlocked wallets that haven't moved tokens yet. This ground-truth verification often reveals token supply realities that differ from what project documentation states.",
        "Test your FDV analysis by modeling historical unlock events. Take a project where you can access historical price data alongside known unlock dates. Calculate whether price actually declined around major vesting cliffs and by how much. If historical events match your model predictions, it validates your methodology. If reality consistently differed from your model, identify which variables you're systematically underestimating."
      ]
    },
    es: {
      interpret: [
        "La valoración completamente diluida (FDV) representa la capitalización de mercado máxima posible si todos los tokens que existirán alguna vez —incluidos los bloqueados en calendarios de adquisición, asignaciones de equipo y emisiones futuras— estuvieran en circulación y valorados al precio actual. Una FDV alta en relación con la capitalización actual señala una oferta futura masiva que podría diluir a los tenedores existentes.",
        "La relación FDV-capitalización de mercado cuenta una historia crítica sobre las dinámicas de oferta. Un ratio de 1,0 significa que todos los tokens ya están en circulación: no hay riesgo de dilución oculto. Un ratio de 10x significa que el 90% de los tokens aún no ha entrado al mercado. Los proyectos a menudo eligen una oferta circulante inicial baja para inflar las métricas de precio y atraer a inversores que persiguen titulares."
      ],
      scenarios: [
        "Un nuevo protocolo DeFi lanza con el 5% del total de tokens en circulación, a $2 cada uno. Su capitalización es de $10 millones, pero la FDV es de $200 millones. Seis meses después, el vesting del equipo desbloquea un 20% adicional de la oferta. Si la demanda no aumenta proporcionalmente, la mecánica básica de oferta-demanda sugiere que el precio podría caer un 15%–25% en torno a la fecha de desbloqueo.",
        "Un token de gobernanza con FDV de $8 mil millones lanza cuando los tokens de gobernanza comparables tienen capitalizaciones de $300–500 millones. El protocolo no está probado, tiene TVL mínimo y su hoja de ruta muestra tres años de emisiones continuas de tokens. La FDV de $8 mil millones implica que el mercado está valorando un crecimiento futuro extraordinario que la mayoría de los proyectos comparables nunca lograron."
      ],
      checklist: [
        "Antes de invertir en cualquier proyecto, verifica el calendario completo de desbloqueo de tokens, identifica todos los acantilados de vesting (liberaciones repentinas grandes) y calcula la tasa mensual de inflación de tokens. Si un proyecto libera más del 20% de la oferta en un solo mes, evalúa si el crecimiento de los ingresos del protocolo y los usuarios justifica realistamente la demanda asociada.",
        "Compara la FDV con el valor total bloqueado (TVL), los ingresos anualizados del protocolo y las billeteras activas únicas. Para proyectos DeFi, una relación FDV-TVL por debajo de 1x sugiere una posible infravaloración. Un múltiplo FDV-ingresos superior a 100x sugiere un crecimiento extremo incorporado que puede no materializarse."
      ],
      mistakes: [
        "Ignorar la FDV y centrarse solo en la capitalización de mercado es uno de los errores más costosos en la inversión en criptomonedas. Muchos inversores minoristas compraron tokens que parecían 'baratos' por capitalización sin darse cuenta de que el 95% de los tokens en manos del equipo y los VCs llegarían al mercado en 12–18 meses, eliminando cualquier ganancia de precio.",
        "Asumir que la FDV es un techo de precio es otro error común. La FDV se calcula usando el precio actual — si la demanda aumenta, el precio sube y también la FDV. Algunos proyectos de alta FDV han entregado fuertes retornos cuando la adopción superó significativamente las tasas de emisión de tokens."
      ],
      benchmarks: [
        "Durante el ciclo de 2021, muchos protocolos DeFi exitosos mantuvieron ratios FDV-TVL entre 0,5x y 2x en su fase de crecimiento. Los proyectos por encima de 5x FDV-TVL frecuentemente tuvieron un rendimiento inferior ya que los desbloqueos de tokens superaron consistentemente el crecimiento de demanda orgánica.",
        "Los tokens respaldados por capital de riesgo con FDV superior a $1 mil millones en el lanzamiento históricamente han tenido un rendimiento inferior en comparación con alternativas de menor FDV durante períodos de tenencia de 12 meses. Este patrón refleja la realidad estructural de que los inversores tempranos y los equipos necesitan eventos de liquidez."
      ],
      execution: [
        "Construye un modelo de liberación de tokens en una hoja de cálculo antes de comprometer capital significativo. Mapea cada evento de desbloqueo conocido con fecha, cantidad y valor en dólares actuales en el momento del lanzamiento esperado. Modela tres escenarios: caso base (precio sin cambios), caso alcista (precio sube 50%) y caso bajista (precio baja 50%).",
        "Establece recordatorios de calendario para los principales eventos de desbloqueo con 30 y 7 días de antelación. En las semanas previas a los acantilados de vesting significativos, monitorea la actividad on-chain para las direcciones de carteras del equipo y VC. Si las direcciones grandes están moviendo tokens a los intercambios, esta inteligencia on-chain puede señalar presión de venta inminente."
      ],
      hygiene: [
        "Mantén un calendario de vesting para cada proyecto en tu cartera. Este documento debe incluir: oferta total de tokens, oferta circulante actual, tasa de inflación mensual y fechas de cada desbloqueo superior al 1% del suministro total. Revisa este calendario mensualmente y recalcula la FDV a los precios actuales.",
        "Contrarresta la información de vesting de al menos tres fuentes: la documentación oficial de tokenomics del proyecto, un explorador de blockchain que muestre los datos reales del contrato de tokens y un rastreador de terceros como TokenUnlocks o Vestlab."
      ],
      validation: [
        "Verifica los cálculos de FDV usando datos de blockchain en lugar de depender únicamente de agregadores de precios. Lee el contrato de tokens para confirmar la oferta máxima, verifica la distribución real entre direcciones e identifica las grandes carteras desbloqueadas que aún no han movido tokens.",
        "Prueba tu análisis de FDV modelando eventos de desbloqueo históricos. Toma un proyecto donde puedas acceder a datos históricos de precios junto con fechas de desbloqueo conocidas. Calcula si el precio realmente disminuyó alrededor de los principales acantilados de vesting y en qué medida."
      ]
    },
    pt: {
      interpret: [
        "A avaliação totalmente diluída (FDV) representa a capitalização de mercado máxima possível se todos os tokens que existirão — incluindo aqueles bloqueados em cronogramas de vesting, alocações de equipe e emissões futuras — estivessem circulando e precificados à taxa atual. Um FDV alto em relação à capitalização atual sinaliza fornecimento futuro massivo que pode diluir os detentores existentes.",
        "A relação FDV-capitalização de mercado conta uma história crítica sobre as dinâmicas de fornecimento. Uma razão de 1,0 significa que todos os tokens já estão circulando — não há risco de diluição oculto. Uma razão de 10x significa que 90% dos tokens ainda não entraram no mercado. Os projetos frequentemente escolhem baixo fornecimento circulante inicial para inflar métricas de preço."
      ],
      scenarios: [
        "Um novo protocolo DeFi lança com 5% do total de tokens circulando, precificado a $2 cada. Sua capitalização é de $10 milhões, mas o FDV é de $200 milhões. Seis meses depois, o vesting da equipe desbloqueia 20% adicionais do fornecimento. Se a demanda não aumentar proporcionalmente, a mecânica básica de oferta-demanda sugere que o preço pode cair 15%–25%.",
        "Um token de governança com FDV de $8 bilhões lança quando tokens de governança comparáveis têm capitalizações de $300–500 milhões. O protocolo é não comprovado, tem TVL mínimo e seu roteiro mostra três anos de emissões contínuas de tokens. O FDV de $8 bilhões implica que o mercado está precificando crescimento futuro extraordinário."
      ],
      checklist: [
        "Antes de investir em qualquer projeto, verifique o cronograma completo de desbloqueio de tokens, identifique todos os vesting cliffs (liberações grandes repentinas) e calcule a taxa mensal de inflação de tokens.",
        "Compare o FDV com o valor total bloqueado (TVL), receita anualizada do protocolo e carteiras ativas únicas. Para projetos DeFi, uma razão FDV-TVL abaixo de 1x sugere possível subavaliação. Um múltiplo FDV-receita acima de 100x sugere crescimento extremo precificado que pode não se materializar."
      ],
      mistakes: [
        "Ignorar o FDV e focar apenas na capitalização de mercado é um dos erros mais caros em investimentos em cripto. Muitos investidores de varejo compraram tokens parecendo 'baratos' pela capitalização sem perceber que 95% dos tokens mantidos pela equipe e VCs chegariam ao mercado em 12–18 meses.",
        "Assumir que o FDV é um teto de preço é outro erro comum. O FDV é calculado usando o preço atual — se a demanda aumentar, o preço sobe e o FDV também. Alguns projetos de alto FDV entregaram retornos fortes quando a adoção superou significativamente as taxas de emissão de tokens."
      ],
      benchmarks: [
        "Durante o ciclo de 2021, muitos protocolos DeFi bem-sucedidos mantiveram razões FDV-TVL entre 0,5x e 2x em sua fase de crescimento. Projetos acima de 5x FDV-TVL frequentemente tiveram desempenho inferior à medida que os desbloqueios de tokens superavam consistentemente o crescimento orgânico da demanda.",
        "Tokens com suporte de capital de risco com FDV acima de $1 bilhão no lançamento historicamente tiveram desempenho inferior em comparação com alternativas de FDV mais baixo durante períodos de detenção de 12 meses."
      ],
      execution: [
        "Construa um modelo de liberação de tokens em uma planilha antes de comprometer capital significativo. Mapeie cada evento de desbloqueio conhecido com data, quantidade e valor em dólares atuais no momento do lançamento esperado. Modele três cenários: caso base, caso otimista e caso pessimista.",
        "Defina lembretes de calendário para eventos importantes de desbloqueio com 30 e 7 dias de antecedência. Nas semanas antes de vesting cliffs significativos, monitore a atividade on-chain para endereços de carteiras da equipe e VC."
      ],
      hygiene: [
        "Mantenha um calendário de vesting para cada projeto em seu portfólio. Este documento deve incluir: fornecimento total de tokens, fornecimento circulante atual, taxa de inflação mensal e datas de cada desbloqueio maior que 1% do fornecimento total.",
        "Contrarreste informações de vesting de pelo menos três fontes: a documentação oficial de tokenomics do projeto, um explorador de blockchain mostrando dados reais do contrato de tokens e um rastreador de terceiros."
      ],
      validation: [
        "Verifique os cálculos de FDV usando dados de blockchain em vez de depender apenas de agregadores de preços. Leia o contrato de tokens para confirmar o fornecimento máximo, verifique a distribuição real entre endereços.",
        "Teste sua análise de FDV modelando eventos de desbloqueio históricos. Pegue um projeto onde você pode acessar dados históricos de preços ao lado de datas de desbloqueio conhecidas."
      ]
    },
    tr: {
      interpret: [
        "Tam seyreltilmiş değerleme (FDV), varlık tahsisleri, ekip tahsisleri ve gelecekteki emisyonlar dahil olmak üzere var olacak her token dolaşımda olsaydı ve mevcut fiyattan değerlenseydi mümkün olan maksimum piyasa değerini temsil eder. Mevcut piyasa değerine göre yüksek bir FDV, mevcut sahipleri seyreltebilecek büyük bir gelecek arzına işaret eder.",
        "FDV-piyasa değeri oranı, arz dinamikleri hakkında kritik bir hikaye anlatır. 1,0 oranı, tüm tokenlerin zaten dolaşımda olduğu anlamına gelir — gizli bir seyreltme riski yoktur. 10x oranı, tokenlerin %90'ının henüz piyasaya girmediği anlamına gelir."
      ],
      scenarios: [
        "Yeni bir DeFi protokolü, toplam tokenlerin %5'i dolaşımda, her biri 2 dolara fiyatlanarak başlatılır. Piyasa değeri 10 milyon dolar iken FDV 200 milyon dolardır. Altı ay sonra ekip vestingi ek %20 arzı açar. Talep orantılı olarak artmazsa temel arz-talep mekaniği, kilit açma tarihi civarında fiyatın %15–%25 düşebileceğini gösteriyor.",
        "8 milyar dolarlık FDV'ye sahip bir yönetişim tokeni, karşılaştırılabilir yönetişim tokenlerinin 300–500 milyon dolarlık piyasa değerine sahip olduğu dönemde başlatılıyor. Protokol kanıtlanmamış, minimum TVL'ye sahip ve yol haritası üç yıllık sürekli token emisyonlarını gösteriyor."
      ],
      checklist: [
        "Herhangi bir projeye yatırım yapmadan önce, tam token kilit açma takvimini doğrulayın, tüm vesting uçurumlarını (ani büyük sürümler) belirleyin ve aylık token enflasyon oranını hesaplayın.",
        "FDV'yi toplam kilitli değer (TVL), yıllık protokol geliri ve benzersiz aktif cüzdanlarla karşılaştırın. DeFi projeleri için 1x'in altında bir FDV-TVL oranı potansiyel düşük değerlemeye işaret eder."
      ],
      mistakes: [
        "FDV'yi görmezden gelmek ve yalnızca piyasa değerine odaklanmak, kripto yatırımcılığındaki en pahalı hatalardan biridir. Pek çok perakende yatırımcı, ekip ve VC'lerin elindeki tokenlerin %95'inin 12–18 ay içinde piyasaya çıkacağını fark etmeden piyasa değeri açısından 'ucuz' görünen tokenler satın aldı.",
        "FDV'nin bir fiyat tavanı olduğunu varsaymak da yaygın bir hatadır. FDV, mevcut fiyat kullanılarak hesaplanır — talep artarsa fiyat da artar ve FDV de artar."
      ],
      benchmarks: [
        "2021 döngüsünde birçok başarılı DeFi protokolü, büyüme aşamalarında 0,5x ile 2x arasında FDV-TVL oranlarını korudu. 5x FDV-TVL'nin üzerindeki projeler, token kilidi açmaları organik talep büyümesini sürekli olarak aştığı için sıklıkla daha düşük performans gösterdi.",
        "Lansmanında 1 milyar doların üzerinde FDV'ye sahip risk sermayesi destekli tokenler, tarihsel olarak 12 aylık elde tutma dönemlerinde daha düşük FDV alternatiflerine kıyasla daha düşük performans gösterdi."
      ],
      execution: [
        "Önemli sermaye taahhüt etmeden önce bir e-tabloda token serbest bırakma modeli oluşturun. Her bilinen kilit açma olayını tarih, miktar ve beklenen serbest bırakma sırasındaki mevcut dolar değeriyle eşleştirin.",
        "Önemli kilit açma olayları için 30 gün ve 7 gün öncesinden takvim hatırlatıcıları ayarlayın. Önemli vesting uçurumlarından önceki haftalarda, ekip ve VC cüzdan adresleri için zincir üstü aktiviteyi izleyin."
      ],
      hygiene: [
        "Portföyünüzdeki her proje için bir vesting takvimi tutun. Bu belge şunları içermelidir: toplam token arzı, mevcut dolaşımdaki arz, aylık enflasyon oranı ve toplam arzın %1'inden fazlasını kapsayan her kilit açma tarihi.",
        "En az üç kaynaktan vesting bilgilerini çapraz referans alın: projenin resmi tokenomics belgeleri, gerçek token sözleşme verilerini gösteren bir blockchain gezgini ve üçüncü taraf bir takipçi."
      ],
      validation: [
        "FDV hesaplamalarını yalnızca fiyat toplayıcılara güvenmek yerine blockchain verilerini kullanarak doğrulayın. Maksimum arzı onaylamak için token sözleşmesini okuyun, adresler arasındaki gerçek dağılımı kontrol edin.",
        "Tarihsel kilit açma olaylarını modelleyerek FDV analizinizi test edin. Bilinen kilit açma tarihleriyle birlikte tarihi fiyat verilerine erişebildiğiniz bir proje seçin."
      ]
    },
    hi: {
      interpret: [
        "फुली डाइल्यूटेड वैल्यूएशन (FDV) वह अधिकतम संभावित मार्केट कैप दर्शाता है जो तब होगी जब हर टोकन जो कभी अस्तित्व में आएगा — वेस्टिंग शेड्यूल में बंद, टीम आवंटन, और भविष्य की एमिशन सहित — सर्कुलेट हो रहा होगा और वर्तमान दर पर मूल्यांकित होगा। वर्तमान मार्केट कैप के सापेक्ष उच्च FDV भविष्य में विशाल सप्लाई का संकेत देता है।",
        "FDV-टू-मार्केट-कैप अनुपात सप्लाई डायनामिक्स के बारे में एक महत्वपूर्ण कहानी बताता है। 1.0 का अनुपात का मतलब है कि सभी टोकन पहले से सर्कुलेट हो रहे हैं — कोई छिपा हुआ डाइल्यूशन जोखिम नहीं है। 10x का अनुपात का मतलब है कि 90% टोकन अभी बाजार में नहीं आए हैं।"
      ],
      scenarios: [
        "एक नया DeFi प्रोटोकॉल कुल टोकन के 5% सर्कुलेशन के साथ लॉन्च होता है, प्रत्येक $2 पर मूल्यांकित। इसकी मार्केट कैप $10 मिलियन है, लेकिन FDV $200 मिलियन है। छह महीने बाद, टीम वेस्टिंग अतिरिक्त 20% सप्लाई अनलॉक करती है।",
        "$8 बिलियन FDV वाला एक गवर्नेंस टोकन उस समय लॉन्च होता है जब तुलनीय गवर्नेंस टोकन की मार्केट कैप $300–500 मिलियन है। प्रोटोकॉल अप्रमाणित है, न्यूनतम TVL है, और रोडमैप तीन साल के निरंतर टोकन एमिशन दिखाता है।"
      ],
      checklist: [
        "किसी भी प्रोजेक्ट में निवेश करने से पहले, पूरे टोकन अनलॉक शेड्यूल को सत्यापित करें, सभी वेस्टिंग क्लिफ (अचानक बड़ी रिलीज) की पहचान करें, और मासिक टोकन मुद्रास्फीति दर की गणना करें।",
        "FDV की तुलना कुल वैल्यू लॉक्ड (TVL), वार्षिक प्रोटोकॉल राजस्व और अद्वितीय सक्रिय वॉलेट से करें। DeFi प्रोजेक्ट के लिए, 1x से नीचे FDV-TVL अनुपात संभावित अंडरवैल्यूएशन का सुझाव देता है।"
      ],
      mistakes: [
        "FDV को नजरअंदाज करना और केवल मार्केट कैप पर ध्यान देना क्रिप्टो निवेश में सबसे महंगी गलतियों में से एक है। कई रिटेल निवेशकों ने मार्केट कैप से 'सस्ते' दिखने वाले टोकन खरीदे, बिना यह जाने कि टीम और VC के पास 95% टोकन 12–18 महीनों में बाजार में आ जाएंगे।",
        "FDV को मूल्य की छत मानना एक और सामान्य गलती है। FDV की गणना वर्तमान मूल्य का उपयोग करके की जाती है — अगर मांग बढ़ती है, तो कीमत बढ़ती है और FDV भी बढ़ता है।"
      ],
      benchmarks: [
        "2021 के चक्र के दौरान, कई सफल DeFi प्रोटोकॉल ने अपने विकास चरण में 0.5x से 2x के बीच FDV-TVL अनुपात बनाए रखा। 5x FDV-TVL से ऊपर के प्रोजेक्ट अक्सर कम प्रदर्शन करते थे।",
        "लॉन्च पर $1 बिलियन से ऊपर FDV वाले वेंचर-समर्थित टोकन ऐतिहासिक रूप से 12 महीने की होल्डिंग अवधि में कम FDV विकल्पों की तुलना में कम प्रदर्शन करते रहे हैं।"
      ],
      execution: [
        "महत्वपूर्ण पूंजी लगाने से पहले एक स्प्रेडशीट में टोकन रिलीज़ मॉडल बनाएं। प्रत्येक ज्ञात अनलॉक इवेंट को तारीख, मात्रा और अपेक्षित रिलीज़ के समय वर्तमान डॉलर मूल्य के साथ मैप करें।",
        "प्रमुख अनलॉक इवेंट से 30 दिन और 7 दिन पहले कैलेंडर रिमाइंडर सेट करें। महत्वपूर्ण वेस्टिंग क्लिफ से पहले के हफ्तों में, टीम और VC वॉलेट पते के लिए ऑन-चेन गतिविधि की निगरानी करें।"
      ],
      hygiene: [
        "अपने पोर्टफोलियो में प्रत्येक प्रोजेक्ट के लिए एक वेस्टिंग कैलेंडर बनाए रखें। इस दस्तावेज़ में शामिल होना चाहिए: कुल टोकन सप्लाई, वर्तमान सर्कुलेटिंग सप्लाई, मासिक मुद्रास्फीति दर, और प्रत्येक अनलॉक की तारीखें।",
        "कम से कम तीन स्रोतों से वेस्टिंग जानकारी को क्रॉस-रेफरेंस करें: प्रोजेक्ट का आधिकारिक टोकनोमिक्स दस्तावेज़ीकरण, ब्लॉकचेन एक्सप्लोरर, और तृतीय-पक्ष ट्रैकर।"
      ],
      validation: [
        "केवल प्राइस एग्रीगेटर पर निर्भर न रहकर ब्लॉकचेन डेटा का उपयोग करके FDV गणनाओं को सत्यापित करें। अधिकतम सप्लाई की पुष्टि के लिए टोकन कॉन्ट्रैक्ट पढ़ें।",
        "ऐतिहासिक अनलॉक इवेंट को मॉडल करके अपने FDV विश्लेषण का परीक्षण करें। ऐसा प्रोजेक्ट लें जहां आप ज्ञात अनलॉक तारीखों के साथ ऐतिहासिक मूल्य डेटा एक्सेस कर सकते हैं।"
      ]
    },
    ru: {
      interpret: [
        "Полностью размытая оценка (FDV) представляет максимально возможную рыночную капитализацию, если бы каждый токен, который когда-либо будет существовать — включая заблокированные по графикам вестинга, командные аллокации и будущие эмиссии — находился бы в обращении и оценивался по текущей цене. Высокий FDV относительно текущей капитализации сигнализирует о масштабном будущем предложении, способном размыть существующих держателей.",
        "Соотношение FDV к рыночной капитализации раскрывает критически важную картину динамики предложения. Коэффициент 1,0 означает, что все токены уже в обращении — скрытого риска размывания нет. Коэффициент 10x означает, что 90% токенов ещё не вышли на рынок."
      ],
      scenarios: [
        "Новый DeFi-протокол запускается с 5% токенов в обращении по $2 каждый. Его рыночная капитализация составляет $10 млн, но FDV — $200 млн. Через шесть месяцев вестинг команды разблокирует дополнительные 20% предложения. Если спрос не вырастет пропорционально, базовая механика спроса-предложения предполагает снижение цены на 15–25% вокруг даты разблокировки.",
        "Токен управления с FDV $8 млрд выходит в момент, когда сопоставимые токены управления имеют капитализации $300–500 млн. Протокол не проверен, имеет минимальный TVL, а дорожная карта предусматривает три года непрерывной эмиссии токенов."
      ],
      checklist: [
        "Перед инвестированием в любой проект проверьте полный график разблокировки токенов, определите все вестинг-клиффы (внезапные крупные выпуски) и рассчитайте ежемесячный уровень инфляции токенов.",
        "Сравните FDV с общей заблокированной стоимостью (TVL), годовой выручкой протокола и уникальными активными кошельками. Для DeFi-проектов соотношение FDV-TVL ниже 1x указывает на возможную недооценку."
      ],
      mistakes: [
        "Игнорирование FDV и концентрация только на рыночной капитализации — одна из самых дорогостоящих ошибок в криптоинвестировании. Многие розничные инвесторы покупали токены, казавшиеся «дешёвыми» по капитализации, не осознавая, что 95% токенов у команды и венчурных фондов выйдут на рынок в течение 12–18 месяцев.",
        "Принятие FDV за потолок цены — ещё одна распространённая ошибка. FDV рассчитывается по текущей цене: если спрос растёт, цена растёт, а вместе с ней и FDV."
      ],
      benchmarks: [
        "В цикле 2021 года многие успешные DeFi-протоколы поддерживали соотношение FDV-TVL от 0,5x до 2x на этапе роста. Проекты с FDV-TVL выше 5x зачастую показывали худшие результаты, поскольку разблокировки токенов постоянно опережали органический рост спроса.",
        "Токены при венчурной поддержке с FDV выше $1 млрд на запуске исторически уступали альтернативам с более низким FDV за 12-месячные периоды удержания."
      ],
      execution: [
        "До вложения значительного капитала создайте модель выпуска токенов в таблице. Нанесите на карту каждое известное событие разблокировки с датой, количеством и текущей долларовой стоимостью на момент ожидаемого выпуска.",
        "Устанавливайте напоминания за 30 и 7 дней до крупных событий разблокировки. В недели перед значительными вестинг-клиффами отслеживайте активность on-chain по адресам кошельков команды и венчурных фондов."
      ],
      hygiene: [
        "Ведите календарь вестинга для каждого проекта в портфеле. Документ должен включать: общее предложение токенов, текущее обращающееся предложение, ежемесячный уровень инфляции и даты каждой разблокировки более 1% общего предложения.",
        "Сверяйте информацию о вестинге не менее чем по трём источникам: официальная документация по токеномике, блокчейн-эксплорер с данными реального контракта токена и сторонний трекер."
      ],
      validation: [
        "Проверяйте расчёты FDV с использованием данных блокчейна, а не полагаясь только на агрегаторы цен. Прочитайте контракт токена для подтверждения максимального предложения, проверьте фактическое распределение по адресам.",
        "Тестируйте анализ FDV, моделируя исторические события разблокировки. Возьмите проект, для которого доступны исторические ценовые данные наряду с известными датами разблокировки."
      ]
    }
  },

  'token-unlock': {
    en: {
      interpret: [
        "Token unlock events are scheduled moments when previously locked tokens become transferable, introducing new supply into the market. When you model an unlock event, the most critical question isn't the quantity of tokens unlocking — it's the financial motivation of the entities receiving them. Team and advisor tokens unlock after vesting periods designed to align incentives during development, but once vested, economic pressure to take profits can be substantial, especially if the token price has appreciated significantly since initial allocation.",
        "The market impact of an unlock depends on two counterbalancing forces: selling pressure from newly liquid holders versus buy pressure from investors who see the unlock as a non-event (or already priced in). Large, sudden unlock events at major vesting cliffs tend to create price weakness 7–14 days before the date as sophisticated traders anticipate selling, and potential price recovery 30+ days after if actual selling was less than feared. Monitor the ratio of total unlock value to 30-day average trading volume to estimate potential market impact."
      ],
      scenarios: [
        "A gaming protocol has 200 million tokens unlocking in 30 days, valued at $0.15 each ($30 million total). The token's 30-day average daily volume is $5 million. The unlock amount represents 6 days of typical trading volume, suggesting meaningful but manageable sell pressure. An investor models that if just 30% of newly liquid tokens are sold (typical for team allocations), that's $9 million of selling spread over 2–4 weeks — roughly 25% of daily volume per day, enough to create 10%–20% price downward pressure.",
        "A DeFi protocol's investor unlock is worth $400 million at current prices. The investors paid $0.002 per token; the current price is $0.50 — a 250x gain. Even if investors sell only 5% of their position immediately, that's $20 million hitting the market. Given daily volume of $8 million, this represents 2.5 days of volume in a single liquidation event. Historical data shows that when unlock-to-volume ratios exceed 1:1, prices typically correct 25%–45% in the 30 days following the unlock date."
      ],
      checklist: [
        "For each unlock event, calculate: (1) total dollar value at current price, (2) percentage of total supply being unlocked, (3) ratio of unlock value to 30-day average daily volume, (4) percentage gain for unlock recipients since initial allocation. When unlock recipients are sitting on 50x+ gains, sell pressure likelihood increases significantly. When they're at or below their cost basis, organic holding is more likely.",
        "Examine on-chain wallet behavior in the 7 days immediately before major unlock events. If wallets that received token allocations are already moving tokens to exchanges before the official unlock, this indicates pre-positioning for sales — potentially a contract exploit or OTC deal being executed. This advance on-chain movement is a stronger signal than the unlock date itself."
      ],
      mistakes: [
        "Assuming that 'team tokens unlocking means the team will sell' is an oversimplification that misses market nuance. Many team members and advisors believe deeply in their projects and hold long-term, especially if they're receiving ongoing project revenue. The actual sell pressure depends on individual financial circumstances, tax obligations, and personal conviction levels — not just that tokens unlocked. Behavioral data shows that founders typically sell less than investors do at unlock events.",
        "Focusing only on single unlock events while missing the cumulative unlock schedule is a common modeling error. A project might have a manageable single unlock of 2% of supply monthly, but if this pattern continues for 36 months, the total dilution is enormous. Always model the complete 12-to-24-month emission schedule, not just the next unlock date, to understand the sustained headwind to price appreciation."
      ],
      benchmarks: [
        "Analysis of 50+ token unlock events from 2020–2023 shows that tokens with unlock-to-daily-volume ratios above 5:1 (unlock worth more than 5x average daily volume) experienced median price declines of 28% in the 30 days following the event. Below 1:1, median price impact was near zero, with high variance in both directions — suggesting the market had successfully priced in anticipated selling.",
        "Investor unlock events (VCs and private sale participants) historically produce 40%–60% larger price impacts than equivalent-sized team unlocks. This reflects the profit-maximizing behavior of financial investors compared to founders who often prioritize project success. Foundation and ecosystem unlocks produce the smallest price impacts, as these tokens typically enter liquidity pools or ecosystem grants rather than immediate exchange sales."
      ],
      execution: [
        "30 days before a major unlock, reduce position size to your minimum comfortable allocation — ideally 50%–70% of your peak position. Use the proceeds to set limit buy orders at your target re-entry prices post-unlock. This strategy lets you benefit from anticipated selling pressure without attempting to time the exact bottom, while also protecting accumulated gains from an event with predictable downward pressure.",
        "Consider structured options strategies if available on the unlocking token: buying put options 45 days before the unlock with a 30-day expiration can provide downside protection at relatively affordable implied volatility. If puts are unavailable, holding a cash reserve equivalent to 20%–30% of your exposure gives you dry powder to buy the post-unlock dip rather than riding it down fully."
      ],
      hygiene: [
        "Subscribe to token unlock tracking services that send notifications 90, 30, and 7 days before scheduled events. Services like TokenUnlocks.app provide calendar views across hundreds of projects. Set personal rules around how much exposure you'll carry through different sizes of unlock events — and stick to those rules without making exception-based decisions in the heat of the moment.",
        "After each unlock event passes, document the actual price impact versus your model prediction. Build a personal database of unlock impact data over time. This institutional memory improves your modeling accuracy and helps you calibrate expectations for future events. The most valuable insight you can develop is a calibrated sense of which unlock scenarios produce the most reliable price impacts."
      ],
      validation: [
        "Verify unlock dates and quantities by reading the actual smart contract vesting logic, not just the project's stated documentation. Some projects have modified their vesting schedules after launch — a change that may not be prominently disclosed. Tools like Etherscan's token contract reader can show the actual vesting contract parameters that govern when tokens can be transferred.",
        "Cross-validate your modeling by finding a comparable historical unlock from a similar project (same sector, similar market cap, similar unlock size relative to volume) and checking how the price actually behaved. If your model predicted a 20% decline and the historical comparable showed 5%, recalibrate your assumptions. If your model predicted 20% and reality was 35%, identify which factors you underweighted."
      ]
    },
    es: {
      interpret: [
        "Los eventos de desbloqueo de tokens son momentos programados en que los tokens previamente bloqueados se vuelven transferibles, introduciendo nueva oferta al mercado. Al modelar un evento de desbloqueo, la pregunta más crítica no es la cantidad de tokens que se desbloquean — sino la motivación financiera de las entidades que los reciben.",
        "El impacto en el mercado de un desbloqueo depende de dos fuerzas contrarrestantes: presión vendedora de los nuevos tenedores líquidos versus presión compradora de inversores que ven el desbloqueo como un no-evento. Los grandes eventos de desbloqueo repentinos en los principales acantilados de vesting tienden a crear debilidad de precios 7–14 días antes de la fecha."
      ],
      scenarios: [
        "Un protocolo de juegos tiene 200 millones de tokens desbloqueándose en 30 días, valorados en $0,15 cada uno ($30 millones en total). El volumen diario promedio de 30 días del token es de $5 millones. La cantidad del desbloqueo representa 6 días de volumen de negociación típico, lo que sugiere una presión vendedora significativa pero manejable.",
        "El desbloqueo de inversores de un protocolo DeFi vale $400 millones a los precios actuales. Los inversores pagaron $0,002 por token; el precio actual es $0,50 — una ganancia de 250x. Incluso si los inversores venden solo el 5% de su posición inmediatamente, eso son $20 millones llegando al mercado."
      ],
      checklist: [
        "Para cada evento de desbloqueo, calcula: (1) valor total en dólares al precio actual, (2) porcentaje del suministro total que se desbloquea, (3) relación del valor del desbloqueo con el volumen diario promedio de 30 días, (4) ganancia porcentual para los receptores del desbloqueo desde la asignación inicial.",
        "Examina el comportamiento de las billeteras on-chain en los 7 días inmediatamente anteriores a los principales eventos de desbloqueo. Si las billeteras que recibieron asignaciones de tokens ya están moviendo tokens a los intercambios antes del desbloqueo oficial, esto indica un pre-posicionamiento para ventas."
      ],
      mistakes: [
        "Asumir que 'los tokens del equipo que se desbloquean significa que el equipo venderá' es una simplificación excesiva. Muchos miembros del equipo y asesores creen profundamente en sus proyectos y mantienen a largo plazo. La presión de venta real depende de las circunstancias financieras individuales, las obligaciones fiscales y los niveles de convicción personal.",
        "Centrarse solo en eventos de desbloqueo individuales mientras se pierde el calendario de desbloqueo acumulativo es un error de modelado común. Un proyecto podría tener un desbloqueo mensual manejable del 2% del suministro, pero si este patrón continúa durante 36 meses, la dilución total es enorme."
      ],
      benchmarks: [
        "El análisis de más de 50 eventos de desbloqueo de tokens de 2020–2023 muestra que los tokens con ratios de desbloqueo a volumen diario superiores a 5:1 experimentaron caídas de precios medianas del 28% en los 30 días posteriores al evento.",
        "Los eventos de desbloqueo de inversores (VCs y participantes en ventas privadas) históricamente producen impactos en los precios un 40%–60% mayores que los desbloqueos del equipo de tamaño equivalente."
      ],
      execution: [
        "30 días antes de un desbloqueo importante, reduce el tamaño de la posición a tu asignación mínima cómoda — idealmente el 50%–70% de tu posición máxima. Usa los ingresos para establecer órdenes de compra límite a tus precios de reentrada objetivo después del desbloqueo.",
        "Considera estrategias de opciones estructuradas si están disponibles en el token que se desbloquea: comprar opciones de venta 45 días antes del desbloqueo con vencimiento de 30 días puede proporcionar protección a la baja a una volatilidad implícita relativamente asequible."
      ],
      hygiene: [
        "Suscríbete a servicios de seguimiento de desbloqueo de tokens que envíen notificaciones 90, 30 y 7 días antes de los eventos programados. Servicios como TokenUnlocks.app proporcionan vistas de calendario en cientos de proyectos.",
        "Después de que pase cada evento de desbloqueo, documenta el impacto real en el precio versus tu predicción del modelo. Construye una base de datos personal de datos de impacto de desbloqueo con el tiempo."
      ],
      validation: [
        "Verifica las fechas y cantidades de desbloqueo leyendo la lógica real de vesting del contrato inteligente, no solo la documentación declarada del proyecto.",
        "Valida cruzadamente tu modelado encontrando un desbloqueo histórico comparable de un proyecto similar (mismo sector, capitalización similar, tamaño de desbloqueo similar relativo al volumen) y verificando cómo se comportó realmente el precio."
      ]
    },
    pt: {
      interpret: [
        "Eventos de desbloqueio de tokens são momentos agendados em que tokens anteriormente bloqueados se tornam transferíveis, introduzindo novo fornecimento no mercado. Ao modelar um evento de desbloqueio, a questão mais crítica não é a quantidade de tokens sendo desbloqueados — é a motivação financeira das entidades que os recebem.",
        "O impacto de mercado de um desbloqueio depende de duas forças contrabalanceadoras: pressão de venda de detentores recém-líquidos versus pressão de compra de investidores que veem o desbloqueio como um não-evento. Grandes eventos de desbloqueio repentinos em vesting cliffs importantes tendem a criar fraqueza de preço 7–14 dias antes da data."
      ],
      scenarios: [
        "Um protocolo de jogos tem 200 milhões de tokens sendo desbloqueados em 30 dias, avaliados em $0,15 cada ($30 milhões no total). O volume diário médio de 30 dias do token é de $5 milhões. A quantidade de desbloqueio representa 6 dias de volume de negociação típico.",
        "O desbloqueio de investidores de um protocolo DeFi vale $400 milhões aos preços atuais. Os investidores pagaram $0,002 por token; o preço atual é $0,50 — um ganho de 250x. Mesmo que os investidores vendam apenas 5% de sua posição imediatamente, isso são $20 milhões chegando ao mercado."
      ],
      checklist: [
        "Para cada evento de desbloqueio, calcule: (1) valor total em dólares ao preço atual, (2) percentagem do fornecimento total sendo desbloqueado, (3) razão do valor de desbloqueio para o volume diário médio de 30 dias.",
        "Examine o comportamento das carteiras on-chain nos 7 dias imediatamente antes dos principais eventos de desbloqueio. Se as carteiras que receberam alocações de tokens já estão movendo tokens para exchanges antes do desbloqueio oficial, isso indica pré-posicionamento para vendas."
      ],
      mistakes: [
        "Supor que 'tokens da equipe sendo desbloqueados significa que a equipe venderá' é uma simplificação excessiva. Muitos membros da equipe e consultores acreditam profundamente em seus projetos e mantêm a longo prazo.",
        "Focar apenas em eventos de desbloqueio únicos enquanto perde o cronograma de desbloqueio cumulativo é um erro de modelagem comum. Um projeto pode ter um desbloqueio mensal gerenciável de 2% do fornecimento, mas se esse padrão continuar por 36 meses, a diluição total é enorme."
      ],
      benchmarks: [
        "Análise de mais de 50 eventos de desbloqueio de tokens de 2020–2023 mostra que tokens com razões de desbloqueio para volume diário acima de 5:1 experimentaram quedas medianas de preço de 28% nos 30 dias após o evento.",
        "Eventos de desbloqueio de investidores historicamente produzem impactos no preço 40%–60% maiores do que desbloqueios de equipe de tamanho equivalente."
      ],
      execution: [
        "30 dias antes de um grande desbloqueio, reduza o tamanho da posição para sua alocação mínima confortável — idealmente 50%–70% de sua posição de pico. Use os recursos para definir ordens de compra limite nos preços-alvo de reentrada pós-desbloqueio.",
        "Considere estratégias de opções estruturadas se disponíveis no token sendo desbloqueado: comprar opções de venda 45 dias antes do desbloqueio com vencimento de 30 dias pode fornecer proteção contra baixas."
      ],
      hygiene: [
        "Assine serviços de rastreamento de desbloqueio de tokens que enviem notificações 90, 30 e 7 dias antes de eventos agendados.",
        "Após cada evento de desbloqueio, documente o impacto real no preço versus sua previsão do modelo. Construa um banco de dados pessoal de dados de impacto de desbloqueio ao longo do tempo."
      ],
      validation: [
        "Verifique datas e quantidades de desbloqueio lendo a lógica real de vesting do contrato inteligente, não apenas a documentação declarada do projeto.",
        "Valide cruzadamente sua modelagem encontrando um desbloqueio histórico comparável de um projeto similar e verificando como o preço realmente se comportou."
      ]
    },
    tr: {
      interpret: [
        "Token kilit açma olayları, daha önce kilitlenmiş tokenlerin transfere edilebilir hale geldiği ve piyasaya yeni arz getirdiği planlanmış anlardır. Bir kilit açma olayını modellerken en kritik soru, açılan tokenlerin miktarı değil — onları alan varlıkların finansal motivasyonudur.",
        "Kilit açma olayının piyasa üzerindeki etkisi, iki dengeleyici kuvvete bağlıdır: yeni likit sahiplerden gelen satış baskısı ile kilit açmayı bir olaysızlık olarak gören yatırımcılardan gelen alım baskısı."
      ],
      scenarios: [
        "Bir oyun protokolünün 30 gün içinde 200 milyon tokeni açılıyor, her biri 0,15 dolara değerleniyor (toplam 30 milyon dolar). Tokenin 30 günlük ortalama günlük hacmi 5 milyon dolar. Kilit açma miktarı tipik işlem hacminin 6 gününü temsil ediyor.",
        "Bir DeFi protokolünün yatırımcı kilit açması mevcut fiyatlarla 400 milyon dolar değerinde. Yatırımcılar token başına 0,002 dolar ödedi; mevcut fiyat 0,50 dolar — 250 katlık bir kazanç."
      ],
      checklist: [
        "Her kilit açma olayı için şunları hesaplayın: (1) mevcut fiyatta toplam dolar değeri, (2) açılan toplam arzın yüzdesi, (3) kilit açma değerinin 30 günlük ortalama günlük hacme oranı.",
        "Büyük kilit açma olaylarından hemen önce 7 gün boyunca zincir üstü cüzdan davranışını inceleyin. Token tahsisi almış cüzdanlar resmi kilit açmadan önce tokenları exchange'lere taşıyorsa, bu satışlar için ön konumlandırmayı gösterir."
      ],
      mistakes: [
        "'Ekip tokenlarının açılması, ekibin sateceği anlamına gelir' varsayımı, piyasa nüansını kaçıran aşırı bir basitleştirmedir. Pek çok ekip üyesi ve danışman, projelerine derinden inanır ve uzun vadeli tutar.",
        "Yalnızca tek kilit açma olaylarına odaklanmak ve kümülatif kilit açma takvimini kaçırmak yaygın bir modelleme hatasıdır."
      ],
      benchmarks: [
        "2020–2023 arası 50'den fazla token kilit açma olayının analizi, 5:1'in üzerinde kilit açma-günlük hacim oranına sahip tokenlerin olaydan sonraki 30 günde ortalama %28 fiyat düşüşü yaşadığını gösteriyor.",
        "Yatırımcı kilit açma olayları (VCs ve özel satış katılımcıları) tarihsel olarak eşdeğer boyuttaki ekip kilit açmalarından %40–%60 daha büyük fiyat etkileri üretir."
      ],
      execution: [
        "Büyük bir kilit açmadan 30 gün önce, pozisyon büyüklüğünü minimum rahat tahsisinize indirin — ideal olarak tepe pozisyonunuzun %50–%70'i. Gelirleri kilit açma sonrası hedef yeniden giriş fiyatlarınızda limit alış emirleri ayarlamak için kullanın.",
        "Açılmakta olan token için mevcut yapılandırılmış opsiyon stratejilerini düşünün: kilit açmadan 45 gün önce 30 günlük vadeli satım opsiyonu satın almak görece uygun fiyatlı ima edilmiş oynaklıkta aşağı yönlü koruma sağlayabilir."
      ],
      hygiene: [
        "Planlanan etkinliklerden 90, 30 ve 7 gün önce bildirim gönderen token kilit açma takip servislerine abone olun.",
        "Her kilit açma olayı geçtikten sonra, gerçek fiyat etkisini model öngörünüzle karşılaştırarak belgeleyin."
      ],
      validation: [
        "Kilit açma tarihlerini ve miktarlarını, yalnızca projenin beyan edilen belgelerine değil, gerçek akıllı sözleşme vesting mantığını okuyarak doğrulayın.",
        "Modelinizi, benzer bir projeden (aynı sektör, benzer piyasa değeri) karşılaştırılabilir bir tarihsel kilit açma bularak ve fiyatın gerçekte nasıl davrandığını kontrol ederek çapraz olarak doğrulayın."
      ]
    },
    hi: {
      interpret: [
        "टोकन अनलॉक इवेंट निर्धारित क्षण होते हैं जब पहले से लॉक किए गए टोकन ट्रांसफर योग्य हो जाते हैं, बाजार में नई सप्लाई लाते हैं। जब आप एक अनलॉक इवेंट को मॉडल करते हैं, तो सबसे महत्वपूर्ण प्रश्न अनलॉक होने वाले टोकन की मात्रा नहीं है — यह उन्हें प्राप्त करने वाली संस्थाओं की वित्तीय प्रेरणा है।",
        "एक अनलॉक का बाजार प्रभाव दो संतुलन करने वाली शक्तियों पर निर्भर करता है: नए तरल धारकों से बिक्री दबाव बनाम उन निवेशकों से खरीद दबाव जो अनलॉक को गैर-घटना के रूप में देखते हैं।"
      ],
      scenarios: [
        "एक गेमिंग प्रोटोकॉल के 30 दिनों में 200 मिलियन टोकन अनलॉक हो रहे हैं, प्रत्येक $0.15 मूल्य के (कुल $30 मिलियन)। टोकन का 30-दिन का औसत दैनिक वॉल्यूम $5 मिलियन है।",
        "एक DeFi प्रोटोकॉल का निवेशक अनलॉक वर्तमान कीमतों पर $400 मिलियन मूल्य का है। निवेशकों ने $0.002 प्रति टोकन चुकाया; वर्तमान मूल्य $0.50 है — 250x का लाभ।"
      ],
      checklist: [
        "प्रत्येक अनलॉक इवेंट के लिए गणना करें: (1) वर्तमान मूल्य पर कुल डॉलर मूल्य, (2) अनलॉक हो रही कुल सप्लाई का प्रतिशत, (3) अनलॉक मूल्य का 30-दिन के औसत दैनिक वॉल्यूम से अनुपात।",
        "प्रमुख अनलॉक इवेंट से ठीक पहले 7 दिनों में ऑन-चेन वॉलेट व्यवहार की जांच करें।"
      ],
      mistakes: [
        "यह मानना कि 'टीम टोकन अनलॉक होने का मतलब है टीम बेचेगी' एक अत्यधिक सरलीकरण है जो बाजार की बारीकियों को चूकता है।",
        "केवल एकल अनलॉक इवेंट पर ध्यान केंद्रित करते हुए संचयी अनलॉक शेड्यूल को मिस करना एक सामान्य मॉडलिंग त्रुटि है।"
      ],
      benchmarks: [
        "2020–2023 से 50+ टोकन अनलॉक इवेंट के विश्लेषण से पता चलता है कि 5:1 से ऊपर के अनलॉक-टू-डेली-वॉल्यूम अनुपात वाले टोकन ने इवेंट के बाद 30 दिनों में औसतन 28% मूल्य गिरावट का अनुभव किया।",
        "निवेशक अनलॉक इवेंट ऐतिहासिक रूप से समकक्ष आकार के टीम अनलॉक की तुलना में 40%–60% बड़े मूल्य प्रभाव उत्पन्न करते हैं।"
      ],
      execution: [
        "एक बड़े अनलॉक से 30 दिन पहले, पोजीशन का आकार अपनी न्यूनतम आरामदायक आवंटन तक कम करें — आदर्श रूप से अपनी पीक पोजीशन का 50%–70%।",
        "यदि अनलॉक होने वाले टोकन पर उपलब्ध हो तो संरचित ऑप्शन रणनीतियों पर विचार करें।"
      ],
      hygiene: [
        "टोकन अनलॉक ट्रैकिंग सेवाओं की सदस्यता लें जो निर्धारित इवेंट से 90, 30 और 7 दिन पहले नोटिफिकेशन भेजती हैं।",
        "प्रत्येक अनलॉक इवेंट के बाद, वास्तविक मूल्य प्रभाव को अपनी मॉडल भविष्यवाणी के खिलाफ दस्तावेज़ करें।"
      ],
      validation: [
        "केवल प्रोजेक्ट की बताई गई दस्तावेज़ीकरण पर निर्भर न रहकर वास्तविक स्मार्ट कॉन्ट्रैक्ट वेस्टिंग लॉजिक पढ़कर अनलॉक तारीखों और मात्राओं को सत्यापित करें।",
        "एक समान ऐतिहासिक अनलॉक खोजकर और मूल्य वास्तव में कैसे व्यवहार किया यह जांचकर अपनी मॉडलिंग को क्रॉस-वैलिडेट करें।"
      ]
    },
    ru: {
      interpret: [
        "События разблокировки токенов — это запланированные моменты, когда ранее заблокированные токены становятся передаваемыми, вводя на рынок новое предложение. При моделировании события разблокировки наиболее критичный вопрос — не количество разблокируемых токенов, а финансовая мотивация получающих их субъектов.",
        "Рыночное воздействие разблокировки определяется двумя противодействующими силами: давлением продаж со стороны новых ликвидных держателей и давлением покупок со стороны инвесторов, расценивающих разблокировку как несобытие."
      ],
      scenarios: [
        "У игрового протокола через 30 дней разблокируется 200 млн токенов стоимостью $0,15 каждый ($30 млн итого). Средний дневной объём торгов за 30 дней составляет $5 млн. Объём разблокировки эквивалентен 6 дням типичного торгового оборота.",
        "Разблокировка инвесторов DeFi-протокола оценивается в $400 млн по текущим ценам. Инвесторы платили $0,002 за токен; текущая цена — $0,50 — рост в 250 раз."
      ],
      checklist: [
        "Для каждого события разблокировки рассчитайте: (1) общую стоимость в долларах по текущей цене, (2) процент общего предложения, разблокируемого за раз, (3) соотношение объёма разблокировки к среднедневному за 30 дней.",
        "Изучайте поведение on-chain кошельков в 7 дней, непосредственно предшествующих крупным событиям разблокировки."
      ],
      mistakes: [
        "Предположение о том, что «разблокировка токенов команды означает, что команда будет продавать», — это чрезмерное упрощение, не учитывающее рыночных нюансов.",
        "Фокусирование только на одиночных событиях разблокировки, пропуская совокупный график — распространённая ошибка моделирования."
      ],
      benchmarks: [
        "Анализ 50+ событий разблокировки токенов за 2020–2023 годы показывает, что токены с соотношением разблокировки к среднедневному объёму выше 5:1 испытывали медианное снижение цены на 28% в течение 30 дней после события.",
        "События разблокировки для инвесторов исторически производят на 40–60% больший ценовой эффект, чем сопоставимые по объёму разблокировки для команды."
      ],
      execution: [
        "За 30 дней до крупной разблокировки сократите размер позиции до минимально комфортного уровня — в идеале 50–70% от пиковой позиции. Используйте высвободившиеся средства для выставления лимитных ордеров на покупку по целевым ценам после разблокировки.",
        "Рассмотрите структурированные опционные стратегии, если они доступны: покупка пут-опционов за 45 дней до разблокировки со сроком истечения 30 дней обеспечивает защиту от снижения при относительно умеренной подразумеваемой волатильности."
      ],
      hygiene: [
        "Подпишитесь на сервисы отслеживания разблокировок, отправляющие уведомления за 90, 30 и 7 дней до запланированных событий.",
        "После каждого прошедшего события разблокировки документируйте фактическое ценовое воздействие в сравнении с прогнозом вашей модели."
      ],
      validation: [
        "Проверяйте даты и объёмы разблокировки, читая реальную логику вестинга смарт-контракта, а не только официальную документацию проекта.",
        "Перекрёстно проверяйте моделирование, находя исторически сопоставимое событие разблокировки аналогичного проекта и проверяя, как цена вела себя на самом деле."
      ]
    }
  },
  'vesting-schedule': {
    en: {
      interpret: [
        "A vesting schedule defines the timeline over which token holders — primarily teams, investors, and advisors — gain full ownership of their allocated tokens. When analyzing a vesting schedule, look beyond the stated percentages and focus on the economic implications: at current market price, what is the dollar value of tokens becoming liquid each month? How does that compare to the project's daily trading volume? Projects with monthly unlock values exceeding 30 days of average trading volume face structural selling headwinds that are difficult to overcome with organic buyer demand alone.",
        "The shape of the vesting curve matters as much as the total duration. Cliff-based vesting — where no tokens unlock for 6–12 months, then a large percentage unlocks at once — creates episodic risk that's predictable but concentrated. Linear daily vesting creates constant, low-level sell pressure that can be less impactful but sustained. Back-loaded vesting (heavier unlocks in years 2–4) is most founder-friendly and least disruptive to early price discovery. Map the specific monthly release amounts over a 36-month horizon to understand the complete supply dynamics."
      ],
      scenarios: [
        "A Layer-2 protocol has the following vesting: Team (20% of supply): 1-year cliff, then linear over 24 months. Investors (15%): 6-month cliff, then linear over 18 months. Ecosystem fund (30%): 3-year linear with no cliff. Foundation (10%): 5-year linear. Public sale (25%): fully liquid at launch. At current price, the ecosystem and foundation unlocks average $2.5M per month for 36 months — a persistent source of selling pressure that project growth must outpace to maintain price appreciation.",
        "An NFT marketplace token has aggressive vesting: the team's 35% allocation vests over just 12 months with no cliff. In month 13, the full 35% of circulating supply equivalent is available for sale — if the market cap has grown to $500M, that's $175M potentially hitting the market. Historically, tokens with such aggressive team vesting have underperformed sector benchmarks by 40%–60% in the 12–18 months following team unlock completion."
      ],
      checklist: [
        "Build a complete month-by-month vesting model in a spreadsheet: list every category (team, investors, advisors, ecosystem, foundation, public sale), its percentage of total supply, cliff date, and linear release schedule. Sum all monthly releases to get total monthly inflation. Divide monthly inflation by average daily volume × 30 to get a monthly impact ratio — values above 0.5 represent significant structural headwinds.",
        "Identify the top 5 largest single-month unlock events in the next 24 months. For each, calculate the dollar value at current price and as a multiple of average daily volume. These are your highest-risk calendar dates. Plan position sizing and hedge strategies specifically around these 5 dates rather than trying to manage the full 24-month schedule uniformly."
      ],
      mistakes: [
        "Overlooking the distinction between cliff vesting and linear vesting leads to systematic miscalculation of risk timing. A project that says '4-year vesting' might mean very different things: 25% at cliff, then nothing for 3 years (extremely back-loaded) versus equal monthly releases over 48 months. Always model the actual release cadence, not just the headline vesting duration.",
        "Failing to account for accelerated vesting clauses in team and investor agreements. Some vesting schedules include provisions for early release upon token listing on major exchanges, project acquisition, or reaching certain price targets. If such clauses exist and trigger, the announced vesting schedule becomes irrelevant — tracking on-chain token movements from team/investor wallets provides earlier warning than official announcements."
      ],
      benchmarks: [
        "Industry best practices for team token vesting have evolved to: 1-year cliff followed by 36-month linear release. Projects deviating significantly from this standard — shorter cliffs, faster vesting, larger team allocations above 20% — have historically correlated with worse long-term price performance. This isn't causal, but reflects that aggressive vesting often accompanies weaker tokenomics design overall.",
        "Investor vesting best practices: 6-month to 1-year cliff, then 12–24 month linear release. Investor allocations above 25% of total supply, combined with short vesting, represent the most toxic combination for retail holders. Projects with these characteristics have historically produced negative returns for investors who bought at or after listing, regardless of project quality."
      ],
      execution: [
        "Use your vesting model to identify 'value windows' — periods when sell pressure from vesting decreases significantly. These windows often represent the best risk-adjusted entry points. For example, if a major 12-month investor unlock ends in month 18 and the next large unlock isn't until month 36, months 19–35 may represent lower structural headwind periods that enable cleaner price appreciation.",
        "For projects already in your portfolio, review the remaining vesting schedule quarterly and adjust position size based on upcoming unlock concentrations. If the next quarter contains 3x your normal monthly unlock volume, consider reducing exposure by 20%–30% heading into that quarter and rebuilding after the concentrated selling pressure has cleared."
      ],
      hygiene: [
        "Create a shared vesting calendar that integrates with your portfolio tracking system. Tag each major unlock event with its estimated dollar value at current price, and set up automated alerts when that value exceeds predefined thresholds (e.g., >$10M for large positions, >$1M for smaller ones). This systematic approach prevents individual events from being overlooked during busy market periods.",
        "Annually reconcile your vesting models against actual token releases. Compare your projected release amounts to actual on-chain token movements from team and investor wallets. Discrepancies reveal whether the project is following its stated schedule — significant deviations (early or delayed releases) warrant investigation of project health and potential changes to your position."
      ],
      validation: [
        "Verify vesting schedules by reviewing the project's smart contract code directly, not just the published tokenomics documentation. Look for hardcoded unlock dates, cliff logic, and linear release functions. Third-party audits of vesting contracts provide additional assurance that the on-chain logic matches stated schedules. Be especially cautious of upgradeable vesting contracts where admins can modify the schedule post-deployment.",
        "Cross-validate stated vesting by monitoring large wallet addresses associated with team and investors. If the project claims tokens are locked until a specific date but on-chain data shows these wallets receiving tokens earlier, the stated vesting schedule is inaccurate. Set up wallet tracking alerts using services like Nansen or Dune Analytics to monitor these addresses continuously."
      ]
    },
    es: {
      interpret: [
        "Un calendario de adquisición define el cronograma durante el cual los tenedores de tokens —principalmente equipos, inversores y asesores— obtienen la propiedad total de sus tokens asignados. Al analizar un calendario de adquisición, mira más allá de los porcentajes declarados y concéntrate en las implicaciones económicas: al precio actual del mercado, ¿cuál es el valor en dólares de los tokens que se vuelven líquidos cada mes?",
        "La forma de la curva de adquisición importa tanto como la duración total. La adquisición basada en acantilados —donde no se desbloquean tokens durante 6–12 meses, luego un gran porcentaje se desbloquea de una vez— crea riesgo episódico predecible pero concentrado. La adquisición lineal diaria crea una presión vendedora constante y de bajo nivel."
      ],
      scenarios: [
        "Un protocolo de Capa 2 tiene el siguiente vesting: Equipo (20% del suministro): acantilado de 1 año, luego lineal durante 24 meses. Inversores (15%): acantilado de 6 meses, luego lineal durante 18 meses. Fondo del ecosistema (30%): lineal de 3 años sin acantilado. Al precio actual, los desbloqueos del ecosistema y la fundación promedian $2,5M por mes durante 36 meses.",
        "Un token de mercado NFT tiene un vesting agresivo: la asignación del 35% del equipo se adquiere en solo 12 meses sin acantilado. En el mes 13, el equivalente al 35% completo del suministro en circulación está disponible para la venta."
      ],
      checklist: [
        "Construye un modelo de vesting completo mes a mes en una hoja de cálculo: lista cada categoría (equipo, inversores, asesores, ecosistema, fundación, venta pública), su porcentaje del suministro total, fecha del acantilado y calendario de lanzamiento lineal.",
        "Identifica los 5 eventos de desbloqueo de mes único más grandes en los próximos 24 meses. Para cada uno, calcula el valor en dólares al precio actual y como múltiplo del volumen diario promedio."
      ],
      mistakes: [
        "Pasar por alto la distinción entre el vesting de acantilado y el vesting lineal lleva a un cálculo sistemático erróneo del tiempo del riesgo. Siempre modela la cadencia de lanzamiento real, no solo la duración del vesting titular.",
        "No tener en cuenta las cláusulas de vesting acelerado en los acuerdos de equipo e inversores. Algunos calendarios de adquisición incluyen disposiciones para lanzamiento anticipado al cotizar en los principales exchanges."
      ],
      benchmarks: [
        "Las mejores prácticas de la industria para el vesting de tokens de equipo han evolucionado a: acantilado de 1 año seguido de lanzamiento lineal de 36 meses. Los proyectos que se desvían significativamente de este estándar han correlacionado históricamente con peor rendimiento de precios a largo plazo.",
        "Las mejores prácticas de vesting para inversores: acantilado de 6 meses a 1 año, luego lanzamiento lineal de 12–24 meses."
      ],
      execution: [
        "Usa tu modelo de vesting para identificar 'ventanas de valor' — períodos en que la presión vendedora del vesting disminuye significativamente. Estas ventanas a menudo representan los mejores puntos de entrada ajustados al riesgo.",
        "Para proyectos ya en tu cartera, revisa el calendario de vesting restante trimestralmente y ajusta el tamaño de la posición según las próximas concentraciones de desbloqueo."
      ],
      hygiene: [
        "Crea un calendario de vesting compartido que se integre con tu sistema de seguimiento de cartera. Etiqueta cada evento de desbloqueo importante con su valor estimado en dólares al precio actual.",
        "Reconcilia anualmente tus modelos de vesting con las liberaciones reales de tokens. Compara tus montos de lanzamiento proyectados con los movimientos reales de tokens on-chain de las billeteras del equipo e inversores."
      ],
      validation: [
        "Verifica los calendarios de vesting revisando directamente el código del contrato inteligente del proyecto, no solo la documentación de tokenomics publicada.",
        "Valida cruzadamente el vesting declarado monitoreando las grandes direcciones de billetera asociadas con el equipo y los inversores."
      ]
    },
    pt: {
      interpret: [
        "Um cronograma de vesting define o prazo durante o qual os detentores de tokens — principalmente equipes, investidores e consultores — obtêm propriedade total de seus tokens alocados. Ao analisar um cronograma de vesting, olhe além dos percentuais declarados e foque nas implicações econômicas.",
        "A forma da curva de vesting importa tanto quanto a duração total. Vesting baseado em cliff — onde nenhum token é desbloqueado por 6–12 meses, depois uma grande porcentagem é desbloqueada de uma vez — cria risco episódico que é previsível, mas concentrado."
      ],
      scenarios: [
        "Um protocolo Layer-2 tem o seguinte vesting: Equipe (20% do fornecimento): cliff de 1 ano, depois linear por 24 meses. Investidores (15%): cliff de 6 meses, depois linear por 18 meses. Fundo do ecossistema (30%): linear de 3 anos sem cliff.",
        "Um token de mercado NFT tem vesting agressivo: a alocação de 35% da equipe veste em apenas 12 meses sem cliff. No mês 13, o equivalente completo de 35% do fornecimento circulante está disponível para venda."
      ],
      checklist: [
        "Construa um modelo de vesting completo mês a mês em uma planilha: liste cada categoria (equipe, investidores, consultores, ecossistema, fundação, venda pública), seu percentual do fornecimento total, data do cliff e cronograma de lançamento linear.",
        "Identifique os 5 maiores eventos de desbloqueio de um único mês nos próximos 24 meses. Para cada um, calcule o valor em dólares ao preço atual e como múltiplo do volume diário médio."
      ],
      mistakes: [
        "Ignorar a distinção entre vesting cliff e vesting linear leva a erros sistemáticos no cálculo do timing de risco.",
        "Deixar de contabilizar cláusulas de vesting acelerado em acordos de equipe e investidores."
      ],
      benchmarks: [
        "As melhores práticas do setor para vesting de tokens de equipe evoluíram para: cliff de 1 ano seguido de lançamento linear de 36 meses.",
        "Melhores práticas de vesting para investidores: cliff de 6 meses a 1 ano, depois lançamento linear de 12–24 meses."
      ],
      execution: [
        "Use seu modelo de vesting para identificar 'janelas de valor' — períodos em que a pressão de venda do vesting diminui significativamente.",
        "Para projetos já em seu portfólio, revise o cronograma de vesting restante trimestralmente e ajuste o tamanho da posição com base nas próximas concentrações de desbloqueio."
      ],
      hygiene: [
        "Crie um calendário de vesting compartilhado que se integre ao seu sistema de rastreamento de portfólio.",
        "Reconcilie anualmente seus modelos de vesting com as liberações reais de tokens."
      ],
      validation: [
        "Verifique os cronogramas de vesting revisando o código do contrato inteligente do projeto diretamente.",
        "Valide cruzadamente o vesting declarado monitorando grandes endereços de carteira associados à equipe e investidores."
      ]
    },
    tr: {
      interpret: [
        "Bir vesting takvimi, token sahiplerinin — öncelikle ekipler, yatırımcılar ve danışmanlar — tahsis edilen tokenlarının tam sahipliğini kazandığı zaman çizelgesini tanımlar. Bir vesting takvimini analiz ederken, belirtilen yüzdeler ötesine bakın ve ekonomik çıkarımları odaklanın.",
        "Vesting eğrisinin şekli, toplam süresi kadar önem taşır. Uçurum tabanlı vesting — 6–12 ay boyunca hiç token açılmadığında, ardından tek seferde büyük bir yüzde açıldığında — öngörülebilir ancak yoğunlaşmış episodik risk yaratır."
      ],
      scenarios: [
        "Bir Layer-2 protokolü şu şekilde vesting'e sahip: Ekip (%20 arz): 1 yıl uçurum, ardından 24 ay boyunca doğrusal. Yatırımcılar (%15): 6 ay uçurum, ardından 18 ay boyunca doğrusal. Ekosistem fonu (%30): Uçurum olmaksızın 3 yıllık doğrusal.",
        "Bir NFT pazaryeri tokeni agresif vesting'e sahip: ekibin %35 tahsisi uçurum olmaksızın yalnızca 12 ayda kazanılıyor."
      ],
      checklist: [
        "Bir elektronik tabloda eksiksiz bir aylık vesting modeli oluşturun: her kategoriyi (ekip, yatırımcılar, danışmanlar, ekosistem, vakıf, halka satış) listeleyin.",
        "Önümüzdeki 24 aydaki en büyük 5 tek aylık kilit açma olayını belirleyin."
      ],
      mistakes: [
        "Uçurum vesting ile doğrusal vesting arasındaki farkı gözden kaçırmak, risk zamanlamasının sistematik olarak yanlış hesaplanmasına yol açar.",
        "Ekip ve yatırımcı anlaşmalarındaki hızlandırılmış vesting maddelerini hesaba katmamak."
      ],
      benchmarks: [
        "Ekip token vesting'i için sektör en iyi uygulamaları şu şekilde gelişti: 1 yıl uçurum, ardından 36 aylık doğrusal yayın.",
        "Yatırımcı vesting için en iyi uygulamalar: 6 ay ile 1 yıl arası uçurum, ardından 12–24 aylık doğrusal yayın."
      ],
      execution: [
        "Vesting modelinizi 'değer pencereleri' — vesting'den kaynaklanan satış baskısının önemli ölçüde azaldığı dönemleri — belirlemek için kullanın.",
        "Portföyünüzdeki projeler için kalan vesting takvimini üç ayda bir gözden geçirin."
      ],
      hygiene: [
        "Portföy takip sisteminizle entegre olan paylaşımlı bir vesting takvimi oluşturun.",
        "Vesting modellerinizi yıllık olarak gerçek token sürümleriyle mutabık hale getirin."
      ],
      validation: [
        "Vesting takvimlerini yalnızca yayınlanan tokenomics belgelerine değil, projenin akıllı sözleşme kodunu doğrudan inceleyerek doğrulayın.",
        "Ekip ve yatırımcılarla ilişkili büyük cüzdan adreslerini izleyerek beyan edilen vesting'i çapraz olarak doğrulayın."
      ]
    },
    hi: {
      interpret: [
        "एक वेस्टिंग शेड्यूल वह समयरेखा परिभाषित करता है जिस पर टोकन धारक — मुख्य रूप से टीम, निवेशक और सलाहकार — अपने आवंटित टोकन का पूर्ण स्वामित्व प्राप्त करते हैं। वेस्टिंग शेड्यूल का विश्लेषण करते समय, बताए गए प्रतिशत से परे देखें और आर्थिक प्रभावों पर ध्यान दें।",
        "वेस्टिंग वक्र का आकार कुल अवधि जितना ही महत्वपूर्ण है। क्लिफ-आधारित वेस्टिंग — जहां 6–12 महीनों के लिए कोई टोकन अनलॉक नहीं होता, फिर एक बड़ा प्रतिशत एक बार में अनलॉक होता है — भविष्यवाणी योग्य लेकिन केंद्रित एपिसोडिक जोखिम बनाता है।"
      ],
      scenarios: [
        "एक Layer-2 प्रोटोकॉल में निम्नलिखित वेस्टिंग है: टीम (सप्लाई का 20%): 1-वर्ष क्लिफ, फिर 24 महीनों में लीनियर। निवेशक (15%): 6-महीने क्लिफ, फिर 18 महीनों में लीनियर। इकोसिस्टम फंड (30%): बिना क्लिफ के 3-वर्ष लीनियर।",
        "एक NFT मार्केटप्लेस टोकन में आक्रामक वेस्टिंग है: टीम का 35% आवंटन बिना क्लिफ के मात्र 12 महीनों में वेस्ट होता है।"
      ],
      checklist: [
        "एक स्प्रेडशीट में महीने-दर-महीने पूर्ण वेस्टिंग मॉडल बनाएं: प्रत्येक श्रेणी (टीम, निवेशक, सलाहकार, इकोसिस्टम, फाउंडेशन, पब्लिक सेल) को सूचीबद्ध करें।",
        "अगले 24 महीनों में 5 सबसे बड़े एकल-माह अनलॉक इवेंट की पहचान करें।"
      ],
      mistakes: [
        "क्लिफ वेस्टिंग और लीनियर वेस्टिंग के बीच के अंतर को नजरअंदाज करना जोखिम के समय की व्यवस्थित गणना में गलतियां करने की ओर ले जाता है।",
        "टीम और निवेशक समझौतों में त्वरित वेस्टिंग खंडों का हिसाब न रखना।"
      ],
      benchmarks: [
        "टीम टोकन वेस्टिंग के लिए उद्योग की सर्वोत्तम प्रथाएं: 1-वर्ष क्लिफ के बाद 36-महीने का लीनियर रिलीज।",
        "निवेशक वेस्टिंग के लिए सर्वोत्तम प्रथाएं: 6-महीने से 1-वर्ष का क्लिफ, फिर 12–24 महीने का लीनियर रिलीज।"
      ],
      execution: [
        "अपने वेस्टिंग मॉडल का उपयोग 'वैल्यू विंडो' — ऐसी अवधि जब वेस्टिंग से बिक्री दबाव काफी कम हो जाता है — पहचानने के लिए करें।",
        "पहले से अपने पोर्टफोलियो में मौजूद प्रोजेक्ट के लिए, त्रैमासिक रूप से शेष वेस्टिंग शेड्यूल की समीक्षा करें।"
      ],
      hygiene: [
        "एक साझा वेस्टिंग कैलेंडर बनाएं जो आपके पोर्टफोलियो ट्रैकिंग सिस्टम के साथ एकीकृत हो।",
        "वास्तविक टोकन रिलीज के खिलाफ अपने वेस्टिंग मॉडल को वार्षिक रूप से मिलाएं।"
      ],
      validation: [
        "केवल प्रकाशित टोकनोमिक्स दस्तावेज़ीकरण पर नहीं, बल्कि प्रोजेक्ट के स्मार्ट कॉन्ट्रैक्ट कोड की सीधे समीक्षा करके वेस्टिंग शेड्यूल सत्यापित करें।",
        "टीम और निवेशकों से जुड़े बड़े वॉलेट पते की निगरानी करके बताए गए वेस्टिंग को क्रॉस-वैलिडेट करें।"
      ]
    },
    ru: {
      interpret: [
        "График вестинга определяет временные рамки, в течение которых держатели токенов — прежде всего команды, инвесторы и советники — получают полное право собственности на свои аллоцированные токены. Анализируя график вестинга, смотрите не только на объявленные проценты — изучайте экономические последствия.",
        "Форма кривой вестинга не менее важна, чем общая продолжительность. Клиффовый вестинг — когда токены не высвобождаются в течение 6–12 месяцев, а затем единовременно разблокируется большой процент — создаёт предсказуемый, но концентрированный эпизодический риск."
      ],
      scenarios: [
        "Протокол второго уровня имеет следующий вестинг: Команда (20% предложения): клифф 1 год, затем линейно 24 месяца. Инвесторы (15%): клифф 6 месяцев, затем линейно 18 месяцев. Экосистемный фонд (30%): линейно 3 года без клиффа.",
        "Токен NFT-маркетплейса имеет агрессивный вестинг: аллокация команды в 35% вестится всего за 12 месяцев без клиффа."
      ],
      checklist: [
        "Постройте полную помесячную модель вестинга в таблице: укажите каждую категорию (команда, инвесторы, советники, экосистема, фонд, публичная продажа), её долю в общем предложении, дату клиффа и график линейного высвобождения.",
        "Определите 5 крупнейших разблокировок в единственный месяц в ближайшие 24 месяца."
      ],
      mistakes: [
        "Непонимание различия между клиффовым и линейным вестингом приводит к систематическим ошибкам в оценке временных рисков.",
        "Игнорирование условий об ускоренном вестинге в соглашениях с командой и инвесторами."
      ],
      benchmarks: [
        "Лучшие отраслевые практики вестинга токенов команды: клифф 1 год, затем линейный выпуск 36 месяцев.",
        "Лучшие практики вестинга для инвесторов: клифф от 6 месяцев до 1 года, затем линейный выпуск 12–24 месяца."
      ],
      execution: [
        "Используйте модель вестинга для выявления «ценных окон» — периодов, когда давление продаж от вестинга значительно снижается.",
        "Для проектов в портфеле ежеквартально пересматривайте оставшийся график вестинга и корректируйте размер позиции."
      ],
      hygiene: [
        "Создайте общий календарь вестинга, интегрированный с системой отслеживания портфеля.",
        "Ежегодно сверяйте модели вестинга с фактическими выпусками токенов."
      ],
      validation: [
        "Проверяйте графики вестинга, просматривая исходный код смарт-контракта проекта напрямую, а не только опубликованную документацию.",
        "Перекрёстно проверяйте заявленный вестинг, отслеживая крупные адреса кошельков команды и инвесторов."
      ]
    }
  },
  'airdrop-value': {
    en: {
      interpret: [
        "Airdrop value calculations represent the potential dollar value of tokens distributed to qualifying addresses — but interpreting this value requires understanding the gap between nominal allocation and realizable value. The price at which an airdrop is announced and the price at which recipients can actually sell are often dramatically different. Large airdrops to many wallets create simultaneous selling pressure at the moment of claim: if 500,000 wallets each receive $200 worth of tokens and all sell on day one, that's $100M of selling pressure hitting the market instantly — typically collapsing the price below the announced value.",
        "The quality of airdrop value depends on the distribution design. Airdrops with cliff periods before claiming, graduated release schedules, or activity-based vesting create a more favorable demand-supply dynamic than cliff-free immediate claims. Similarly, airdrops targeting users with demonstrated long-term engagement (6+ month usage history, multiple protocol interactions) produce higher-quality recipients who are more likely to hold than speculative farmers who qualified through minimal cost basis transactions."
      ],
      scenarios: [
        "A DEX airdrop distributes 5% of token supply to historical users. At launch price, total airdrop value is $150M across 800,000 wallets, averaging $187 per wallet. However, 60% of wallets contain addresses that only performed 1–2 transactions to qualify (typical airdrop farming behavior). On day one, approximately 480,000 farmers sell their full allocation. If only 40% of remaining genuine users sell, total day-one selling is $100M+ against a token with $2M daily trading volume — price declines 40%–70% within hours.",
        "A Layer-2 network's airdrop explicitly excludes addresses with fewer than 5 distinct protocol interactions and minimum 3-month usage. Only 120,000 wallets qualify for an average of $1,200 each. Farmer exclusions eliminate the majority of mercenary capital. Day-one selling pressure is 30%–40% of recipients × $1,200 average × 120,000 wallets = $43–$58M against $15M daily volume — still meaningful but manageable without catastrophic price collapse."
      ],
      checklist: [
        "Before claiming an airdrop, calculate your realistic sell price rather than the announced value. If you're receiving $5,000 worth of tokens at announcement, and the token has $500K daily volume with 200,000 total airdrop recipients, your realistic sell price may be 30%–60% below announcement price. Use this adjusted figure for financial planning rather than the nominal allocation value.",
        "Review the airdrop's claim design: is there a claim window (reducing simultaneous selling pressure)? Are tokens immediately liquid or subject to a lock-up? Are there bonus allocations for long-term holders? These design choices dramatically affect actual realized value. Airdrops with 30–90 day claim windows allow price discovery to stabilize before the full recipient pool has acted."
      ],
      mistakes: [
        "Treating airdrop announcements as confirmed wealth before price discovery occurs. Many projects announce airdrops when their token hasn't yet launched publicly — the $X value calculation uses a hypothetical launch price that may be 10x higher or lower than where the token actually trades once liquidity is established. Airdrop value is theoretical until you've successfully sold at or near the expected price.",
        "Ignoring tax implications of airdrop value. In most jurisdictions, received airdrops are taxable income at fair market value on the date of receipt or claim. If you receive $10,000 in airdrop value but don't sell immediately, and the price drops 80% before you sell, you may still owe taxes on the original $10,000 income basis. Always consult tax professionals before making airdrop claiming and selling decisions."
      ],
      benchmarks: [
        "Historical airdrop price data shows that 70%+ of airdrops trade at or below their day-one high within 30 days of launch. The median airdrop token loses 45%–65% of initial value within 6 months of distribution. Notable exceptions include protocols with strong fundamentals, active development, and genuine user bases — UNI, DYDX, ENS, and ARB represent cases where airdrop recipients who held long-term realized 3x–10x on their initial allocation.",
        "Airdrop farming ROI has declined significantly as protocols implement increasingly sophisticated anti-farming filters. In 2020–2021, $50–$200 of on-chain activity could yield $10,000–$50,000 in airdrops. By 2023–2024, the same spend typically generates $500–$2,000 in airdrop value after accounting for gas costs, time spent, and the probability of failing eligibility filters. This declining ROI has reduced the mercenary capital problem somewhat."
      ],
      execution: [
        "Develop a claim-and-sell strategy before claiming any airdrop worth more than $1,000. Decide in advance what percentage you'll sell immediately (for tax and liquidity purposes), what percentage you'll convert to stablecoins (market-neutral retention), and what percentage you'll hold as a long-term position. Making this decision before emotional market movements influence you produces better outcomes than deciding ad hoc in real-time.",
        "If you believe in a project's long-term prospects, sell 50%–70% of your airdrop on day one to cover taxes and crystallize some profit, then hold the remaining 30%–50% as a cost-free speculative position. This strategy eliminates regret in both scenarios: if the token rises, you participated; if it falls, you already captured value. Never hold 100% of a large airdrop without deliberate conviction about the project."
      ],
      hygiene: [
        "Track airdrop claims in a dedicated tax register with date of receipt, quantity received, fair market value at receipt, and subsequent sales with prices and dates. This documentation is legally required in most jurisdictions and prevents scrambled record-keeping when tax season arrives. For high-volume airdrop farmers, dedicated crypto tax software with airdrop tracking features becomes essential.",
        "Set realistic expectations by researching how previous airdrops from the same team or sector performed. A team that previously ran an airdrop that collapsed 90% in 30 days may repeat the pattern — while a team with a track record of post-airdrop price appreciation and active development provides better holding signals. Historical performance of the team's previous airdrop is often more predictive than the project's current fundamentals."
      ],
      validation: [
        "Before claiming, verify airdrop legitimacy through official channels only — the project's verified Twitter account, official website, and Discord announcements. Phishing attacks disguised as airdrop claims steal private keys or drain wallets by requesting approval of malicious smart contracts. Never connect your primary wallet to unverified claim sites. Use a dedicated secondary wallet for claiming airdrops from new or unvetted projects.",
        "Verify your airdrop allocation before the claim window closes by checking the official eligibility checker or Merkle proof verification system. Some airdrops have technical requirements (holding tokens, active positions, governance participation) that may disqualify late-checkers who assumed they qualified. Missing the claim window due to oversight permanently forfeits the allocation."
      ]
    },
    es: {
      interpret: [
        "Los cálculos de valor de airdrop representan el valor potencial en dólares de los tokens distribuidos a las direcciones calificadas — pero interpretar este valor requiere comprender la brecha entre la asignación nominal y el valor realizable. El precio en que se anuncia un airdrop y el precio al que los destinatarios pueden realmente vender son a menudo dramáticamente diferentes.",
        "La calidad del valor del airdrop depende del diseño de la distribución. Los airdrops con períodos de espera antes de reclamar, calendarios de lanzamiento graduado o vesting basado en actividad crean una dinámica de oferta-demanda más favorable que las reclamaciones inmediatas sin espera."
      ],
      scenarios: [
        "Un airdrop de DEX distribuye el 5% del suministro de tokens a usuarios históricos. Al precio de lanzamiento, el valor total del airdrop es de $150M en 800,000 billeteras, con un promedio de $187 por billetera. Sin embargo, el 60% de las billeteras contienen direcciones que solo realizaron 1–2 transacciones para calificar.",
        "El airdrop de una red Layer-2 excluye explícitamente las direcciones con menos de 5 interacciones de protocolo distintas y un uso mínimo de 3 meses. Solo 120,000 billeteras califican para un promedio de $1,200 cada una."
      ],
      checklist: [
        "Antes de reclamar un airdrop, calcula tu precio de venta realista en lugar del valor anunciado. Si recibes $5,000 en tokens al anuncio, y el token tiene un volumen diario de $500K con 200,000 destinatarios totales de airdrop, tu precio de venta realista puede ser un 30%–60% por debajo del precio de anuncio.",
        "Revisa el diseño de reclamación del airdrop: ¿hay una ventana de reclamación (que reduce la presión vendedora simultánea)? ¿Los tokens son inmediatamente líquidos o están sujetos a un período de bloqueo?"
      ],
      mistakes: [
        "Tratar los anuncios de airdrop como riqueza confirmada antes de que ocurra el descubrimiento de precios. Muchos proyectos anuncian airdrops cuando su token aún no se ha lanzado públicamente — el cálculo de valor de $X usa un precio de lanzamiento hipotético.",
        "Ignorar las implicaciones fiscales del valor del airdrop. En la mayoría de las jurisdicciones, los airdrops recibidos son ingresos gravables al valor de mercado justo en la fecha de recepción o reclamación."
      ],
      benchmarks: [
        "Los datos históricos de precios de airdrop muestran que más del 70% de los airdrops cotizan al nivel de su máximo del primer día o por debajo dentro de los 30 días posteriores al lanzamiento. El token airdrop mediano pierde el 45%–65% del valor inicial dentro de los 6 meses de la distribución.",
        "El ROI del farming de airdrops ha disminuido significativamente a medida que los protocolos implementan filtros anti-farming cada vez más sofisticados."
      ],
      execution: [
        "Desarrolla una estrategia de reclamar y vender antes de reclamar cualquier airdrop que valga más de $1,000. Decide de antemano qué porcentaje venderás inmediatamente, qué porcentaje convertirás en stablecoins y qué porcentaje mantendrás como posición a largo plazo.",
        "Si crees en las perspectivas a largo plazo de un proyecto, vende el 50%–70% de tu airdrop el primer día para cubrir impuestos y cristalizar alguna ganancia, luego mantén el 30%–50% restante como posición especulativa de costo cero."
      ],
      hygiene: [
        "Registra las reclamaciones de airdrop en un registro fiscal dedicado con fecha de recepción, cantidad recibida, valor de mercado justo al momento de la recepción y ventas posteriores con precios y fechas.",
        "Establece expectativas realistas investigando cómo se desempeñaron los airdrops anteriores del mismo equipo o sector."
      ],
      validation: [
        "Antes de reclamar, verifica la legitimidad del airdrop solo a través de canales oficiales — la cuenta de Twitter verificada del proyecto, el sitio web oficial y los anuncios de Discord.",
        "Verifica tu asignación de airdrop antes de que se cierre la ventana de reclamación comprobando el verificador de elegibilidad oficial o el sistema de verificación de prueba Merkle."
      ]
    },
    pt: {
      interpret: [
        "Os cálculos de valor de airdrop representam o valor potencial em dólares dos tokens distribuídos para endereços qualificados — mas interpretar esse valor requer entender a lacuna entre a alocação nominal e o valor realizável.",
        "A qualidade do valor do airdrop depende do design da distribuição. Airdrops com períodos de espera antes da reivindicação, cronogramas de lançamento graduados ou vesting baseado em atividade criam uma dinâmica de oferta-demanda mais favorável."
      ],
      scenarios: [
        "Um airdrop de DEX distribui 5% do fornecimento de tokens para usuários históricos. Ao preço de lançamento, o valor total do airdrop é de $150M em 800.000 carteiras, com média de $187 por carteira.",
        "O airdrop de uma rede Layer-2 exclui explicitamente endereços com menos de 5 interações de protocolo distintas e uso mínimo de 3 meses. Apenas 120.000 carteiras se qualificam para uma média de $1.200 cada."
      ],
      checklist: [
        "Antes de reivindicar um airdrop, calcule seu preço de venda realista em vez do valor anunciado.",
        "Revise o design de reivindicação do airdrop: há uma janela de reivindicação? Os tokens são imediatamente líquidos ou sujeitos a um período de bloqueio?"
      ],
      mistakes: [
        "Tratar anúncios de airdrop como riqueza confirmada antes que a descoberta de preço ocorra.",
        "Ignorar as implicações fiscais do valor do airdrop."
      ],
      benchmarks: [
        "Os dados históricos de preços de airdrop mostram que mais de 70% dos airdrops são negociados abaixo de seu máximo do dia um dentro de 30 dias após o lançamento.",
        "O ROI do farming de airdrops diminuiu significativamente à medida que os protocolos implementam filtros anti-farming cada vez mais sofisticados."
      ],
      execution: [
        "Desenvolva uma estratégia de reivindicar e vender antes de reivindicar qualquer airdrop que valha mais de $1.000.",
        "Se você acredita nas perspectivas de longo prazo de um projeto, venda 50%–70% de seu airdrop no primeiro dia para cobrir impostos e cristalizar algum lucro."
      ],
      hygiene: [
        "Registre as reivindicações de airdrop em um registro fiscal dedicado com data de recebimento, quantidade recebida, valor justo de mercado no recebimento e vendas subsequentes.",
        "Defina expectativas realistas pesquisando como airdrops anteriores da mesma equipe ou setor se saíram."
      ],
      validation: [
        "Antes de reivindicar, verifique a legitimidade do airdrop apenas por canais oficiais.",
        "Verifique sua alocação de airdrop antes que a janela de reivindicação feche."
      ]
    },
    tr: {
      interpret: [
        "Airdrop değeri hesaplamaları, uygun adreslere dağıtılan tokenlerin potansiyel dolar değerini temsil eder — ancak bu değeri yorumlamak, nominal tahsis ile gerçekleştirilebilir değer arasındaki boşluğu anlamayı gerektirir.",
        "Airdrop değerinin kalitesi dağıtım tasarımına bağlıdır. Talep etmeden önce uçurum süreleri olan, kademeli serbest bırakma takvimleri olan veya aktiviteye dayalı vesting'e sahip airdropslar, anında talep olmaksızın daha olumlu bir arz-talep dinamiği yaratır."
      ],
      scenarios: [
        "Bir DEX airdropu, geçmiş kullanıcılara token arzının %5'ini dağıtıyor. Lansman fiyatında toplam airdrop değeri, ortalama 187 dolar olan 800.000 cüzdanda 150 milyon dolardır.",
        "Bir Layer-2 ağının airdrop'u, 5'ten az farklı protokol etkileşimine sahip ve minimum 3 aylık kullanımı olan adresleri açıkça dışlıyor. Yalnızca 120.000 cüzdan, her biri ortalama 1.200 dolar için uygun."
      ],
      checklist: [
        "Bir airdrop talep etmeden önce, duyurulan değer yerine gerçekçi satış fiyatınızı hesaplayın.",
        "Airdrop'un talep tasarımını inceleyin: bir talep penceresi var mı? Tokenlar anında likit mi yoksa bir kilitlenme süresine mi tabi?"
      ],
      mistakes: [
        "Fiyat keşfi gerçekleşmeden airdrop duyurularını teyit edilmiş servet olarak değerlendirmek.",
        "Airdrop değerinin vergi etkilerini göz ardı etmek."
      ],
      benchmarks: [
        "Tarihsel airdrop fiyat verileri, airdropsların %70'inden fazlasının lansmanın 30 günü içinde ilk gün yüksek seviyelerinde veya altında işlem gördüğünü gösteriyor.",
        "Airdrop farming ROI'si, protokollerin giderek daha sofistike anti-farming filtreleri uygulamasıyla önemli ölçüde düştü."
      ],
      execution: [
        "1.000 doların üzerinde herhangi bir airdrop talep etmeden önce bir talep et ve sat stratejisi geliştirin.",
        "Bir projenin uzun vadeli beklentilerine inanıyorsanız, vergileri karşılamak ve bir miktar kâr elde etmek için airdrop'unuzun %50–%70'ini ilk gün satın."
      ],
      hygiene: [
        "Airdrop taleplerini, alım tarihi, alınan miktar, alım tarihindeki adil piyasa değeri ve sonraki satışları içeren özel bir vergi kaydında takip edin.",
        "Aynı ekibin veya sektörün önceki airdroplarının nasıl performans gösterdiğini araştırarak gerçekçi beklentiler belirleyin."
      ],
      validation: [
        "Talep etmeden önce airdrop meşruiyetini yalnızca resmi kanallar aracılığıyla doğrulayın.",
        "Talep penceresi kapanmadan önce resmi uygunluk denetleyicisini kontrol ederek airdrop tahsisinizi doğrulayın."
      ]
    },
    hi: {
      interpret: [
        "एयरड्रॉप वैल्यू गणनाएं योग्य पते पर वितरित टोकन के संभावित डॉलर मूल्य का प्रतिनिधित्व करती हैं — लेकिन इस मूल्य की व्याख्या करने के लिए नाममात्र आवंटन और वास्तविक मूल्य के बीच के अंतर को समझना आवश्यक है।",
        "एयरड्रॉप मूल्य की गुणवत्ता वितरण डिज़ाइन पर निर्भर करती है। क्लेम करने से पहले क्लिफ पीरियड, क्रमिक रिलीज शेड्यूल, या गतिविधि-आधारित वेस्टिंग वाले एयरड्रॉप अधिक अनुकूल सप्लाई-डिमांड डायनामिक बनाते हैं।"
      ],
      scenarios: [
        "एक DEX एयरड्रॉप ऐतिहासिक उपयोगकर्ताओं को टोकन सप्लाई का 5% वितरित करता है। लॉन्च मूल्य पर, 800,000 वॉलेट में कुल एयरड्रॉप मूल्य $150M है, प्रति वॉलेट औसत $187।",
        "एक Layer-2 नेटवर्क का एयरड्रॉप 5 से कम अलग प्रोटोकॉल इंटरैक्शन और न्यूनतम 3 महीने के उपयोग वाले पते को स्पष्ट रूप से बाहर करता है। केवल 120,000 वॉलेट प्रत्येक औसत $1,200 के लिए योग्य हैं।"
      ],
      checklist: [
        "एयरड्रॉप क्लेम करने से पहले, घोषित मूल्य के बजाय अपना यथार्थवादी बिक्री मूल्य गणना करें।",
        "एयरड्रॉप के क्लेम डिज़ाइन की समीक्षा करें: क्या कोई क्लेम विंडो है? क्या टोकन तुरंत लिक्विड हैं या किसी लॉक-अप के अधीन हैं?"
      ],
      mistakes: [
        "मूल्य खोज होने से पहले एयरड्रॉप घोषणाओं को पुष्टि की गई संपत्ति मानना।",
        "एयरड्रॉप मूल्य के कर प्रभावों को नजरअंदाज करना।"
      ],
      benchmarks: [
        "ऐतिहासिक एयरड्रॉप मूल्य डेटा दिखाता है कि 70%+ एयरड्रॉप लॉन्च के 30 दिनों के भीतर अपने पहले दिन के उच्च स्तर पर या उससे नीचे ट्रेड करते हैं।",
        "एयरड्रॉप फार्मिंग ROI में काफी गिरावट आई है क्योंकि प्रोटोकॉल तेजी से परिष्कृत एंटी-फार्मिंग फिल्टर लागू करते हैं।"
      ],
      execution: [
        "$1,000 से अधिक मूल्य के किसी भी एयरड्रॉप को क्लेम करने से पहले क्लेम-एंड-सेल रणनीति विकसित करें।",
        "यदि आप किसी प्रोजेक्ट की दीर्घकालिक संभावनाओं में विश्वास करते हैं, तो करों को कवर करने और कुछ लाभ क्रिस्टलाइज़ करने के लिए पहले दिन अपने एयरड्रॉप का 50%–70% बेचें।"
      ],
      hygiene: [
        "एयरड्रॉप क्लेम को प्राप्ति की तारीख, प्राप्त मात्रा, प्राप्ति पर उचित बाजार मूल्य और बाद की बिक्री के साथ एक समर्पित कर रजिस्टर में ट्रैक करें।",
        "उसी टीम या क्षेत्र के पिछले एयरड्रॉप के प्रदर्शन की जांच करके यथार्थवादी अपेक्षाएं निर्धारित करें।"
      ],
      validation: [
        "क्लेम करने से पहले, केवल आधिकारिक चैनलों के माध्यम से एयरड्रॉप की वैधता सत्यापित करें।",
        "क्लेम विंडो बंद होने से पहले आधिकारिक पात्रता जांचकर्ता की जांच करके अपना एयरड्रॉप आवंटन सत्यापित करें।"
      ]
    },
    ru: {
      interpret: [
        "Расчёты ценности аирдропа представляют потенциальную стоимость в долларах токенов, распределяемых по подходящим адресам — но интерпретация этой ценности требует понимания разрыва между номинальной аллокацией и реализуемой стоимостью.",
        "Качество ценности аирдропа зависит от дизайна распределения. Аирдропы с клифф-периодами перед клеймингом, постепенными графиками выпуска или вестингом на основе активности создают более благоприятную динамику спроса-предложения."
      ],
      scenarios: [
        "Аирдроп DEX распределяет 5% общего предложения токенов среди исторических пользователей. По цене запуска общая стоимость аирдропа составляет $150 млн по 800 000 кошелькам, в среднем $187 на кошелёк.",
        "Аирдроп сети второго уровня явно исключает адреса с менее чем 5 различными взаимодействиями с протоколом и минимальным 3-месячным использованием. Только 120 000 кошельков соответствуют требованиям со средним значением $1 200 каждый."
      ],
      checklist: [
        "Перед клеймингом аирдропа рассчитайте реалистичную цену продажи, а не объявленную стоимость.",
        "Изучите дизайн клейминга аирдропа: есть ли окно клейминга? Токены немедленно ликвидны или подлежат локап-периоду?"
      ],
      mistakes: [
        "Восприятие объявлений об аирдропе как подтверждённого богатства до того, как произошло ценовое открытие.",
        "Игнорирование налоговых последствий стоимости аирдропа."
      ],
      benchmarks: [
        "Исторические данные о ценах аирдропов показывают, что более 70% аирдропов торгуются на уровне своего максимума первого дня или ниже в течение 30 дней после запуска.",
        "Доходность фарминга аирдропов значительно снизилась по мере того, как протоколы внедряют всё более сложные анти-фарминговые фильтры."
      ],
      execution: [
        "Разработайте стратегию «заклеймить и продать» до того, как клеймить любой аирдроп стоимостью более $1 000.",
        "Если вы верите в долгосрочные перспективы проекта, продайте 50–70% аирдропа в первый день для покрытия налогов и фиксации прибыли, затем удерживайте оставшиеся 30–50% как бесплатную спекулятивную позицию."
      ],
      hygiene: [
        "Отслеживайте клеймы аирдропов в специальном налоговом реестре с датой получения, количеством, справедливой рыночной стоимостью на дату получения и последующими продажами.",
        "Формируйте реалистичные ожидания, исследуя результаты предыдущих аирдропов той же команды или сектора."
      ],
      validation: [
        "Перед клеймингом проверяйте легитимность аирдропа только через официальные каналы.",
        "Проверьте свою аллокацию аирдропа до закрытия окна клейминга через официальный проверочный инструмент."
      ]
    }
  },
  'ico-roi': {
    en: {
      interpret: [
        "ICO ROI calculations measure the return on investment from initial coin offering participation relative to current market price. A positive ICO ROI figure means early investors are currently sitting on unrealized gains — but this calculation is backward-looking and tells you nothing about future performance. The more relevant question is whether the project's current market price reflects fair value relative to its progress since the ICO: has development delivered on roadmap promises? Has user adoption grown proportionally to the ICO valuation implied?",
        "When analyzing ICO ROI data across a portfolio or comparing projects, adjust for time elapsed since the ICO. A 500% ROI achieved in 18 months represents dramatically different risk-adjusted performance than the same return achieved in 5 years. Annualized ICO ROI — calculated as (current_return)^(1/years_held) - 1 — normalizes for time and enables meaningful cross-project comparison. Many ICO investors focus on total return percentages without accounting for the 3–7 years of capital lockup that many investments actually required."
      ],
      scenarios: [
        "An investor participated in three ICOs in 2020: Project A at $0.01 (current price $0.18, ROI: 1,700%), Project B at $0.50 (current price $0.08, ROI: -84%), Project C at $2.00 (current price $4.50, ROI: 125%). Portfolio average ROI is 580%, but capital-weighted analysis tells a different story — if Project B received 60% of capital allocation, the portfolio is actually slightly negative in dollar terms despite the headline positive average. Always weight ROI by actual capital deployed, not by equal-weight averaging.",
        "A DeFi protocol ICO raised $8M at $0.004 per token in 2021. Today the token trades at $0.12 — an ROI of 2,900%. However, during this period the protocol generated $3.2M in cumulative fees, suggesting the current price implies a price-to-earnings multiple of 45x on annualized fee revenue — reasonable for a growing DeFi protocol. An investor using this ROI to decide whether to hold must assess whether 45x P/E is justified by growth rate, or whether early ICO participants are simply still sitting on inflated positions."
      ],
      checklist: [
        "When calculating ICO ROI for decision-making purposes, include all costs: ICO token price, transaction fees during purchase, any currency conversion costs if you bought with BTC or ETH, and tax events triggered by any interim sales or swaps. Your true cost basis may be 5%–15% higher than the raw ICO price, meaningfully reducing calculated ROI. For accurate comparison, use actual cost basis not the ICO list price.",
        "Segment your ICO portfolio by vintage year (2017, 2018, 2019, 2020, 2021) and measure performance against relevant benchmarks: Bitcoin total return and Ethereum total return for the same periods. Many ICO investments that show positive absolute ROI are actually negative in BTC or ETH terms — meaning you would have done better simply buying and holding Bitcoin. This benchmark comparison separates genuine alpha from the beta of general crypto market appreciation."
      ],
      mistakes: [
        "Conflating ICO ROI with investment merit. A token that has risen 10,000% from its ICO price may now be significantly overvalued relative to fundamentals — high ICO ROI is backward-looking information that says the ICO was a good deal at the time, not that the current price represents a buying opportunity. Always evaluate the token against current fundamentals and comparable projects, regardless of where you personally are in your ICO P&L.",
        "Selling ICO holdings purely based on hitting round-number ROI targets (10x, 50x, 100x) without fundamental analysis. This price-anchoring to ICO cost basis creates arbitrary selling decisions disconnected from project valuation. The correct question is: 'At today's price, is this the best use of this capital?' not 'Have I made enough profit relative to my ICO price?' The opportunity cost of holding vs. redeploying is the relevant consideration."
      ],
      benchmarks: [
        "Comprehensive studies of 2017–2018 ICOs show that 90%+ of projects are below their ICO price six years after raising. Of those, 40%+ represent total losses (project abandoned, exit scammed, or token delisted). The top 10% of performers account for the majority of aggregate ICO investor returns — a power-law distribution where winners compensate for many losers. This data supports sizing ICO participation as a portfolio of small bets rather than concentrated positions.",
        "2020–2021 ICO vintage data is more favorable: approximately 60% of projects from this period show positive returns, reflecting the stronger market environment. However, performance is highly correlated with sector: DeFi and Layer-2 ICOs from this period averaged 800%+ returns, while NFT gaming and metaverse ICOs averaged -30% as of 2024. Sector selection at ICO stage is more predictive of returns than individual project fundamentals."
      ],
      execution: [
        "Set a tiered exit strategy before ICO tokens unlock: sell 20%–25% at 3x ROI (recovering initial investment and locking a 200% profit), sell another 20%–25% at 10x ROI, and hold the remaining 50%–60% as a free-ride position with no forced exit. This strategy creates a self-funding ICO portfolio where profits from winners are recycled into new positions without requiring additional capital.",
        "For ICO positions with large unrealized gains, model the tax-optimal liquidation schedule. In many jurisdictions, spreading sales across tax years can reduce effective tax rates significantly. For example, selling 25% in December and 25% in January creates two separate tax events that may each fall in lower marginal rate brackets compared to a single large sale. Coordinate with a crypto-aware accountant to structure exits for tax efficiency."
      ],
      hygiene: [
        "Maintain a dedicated ICO ledger with the following fields for each investment: ICO date, project name, token symbol, amount invested, ICO price, tokens received, vesting unlock schedule, current token balance, current price, current value, realized gains from partial sales, and unrealized gain/loss. Update this ledger monthly and use it as the source of truth for portfolio performance reporting.",
        "Review your ICO investment thesis annually for each active position. Compare current project status against the original whitepaper promises: What milestones were achieved? What was delayed or abandoned? Does the team composition remain? Is TVL/user growth tracking with projections? This structured review prevents 'hope holding' — staying in positions based on sunk cost rather than current merit."
      ],
      validation: [
        "Verify ICO ROI calculations by reconciling token quantities against blockchain data. Confirm that your expected token allocation was fully delivered — some ICOs delivered partial allocations or experienced smart contract issues during distribution. Use a blockchain explorer to verify that the tokens in your wallet match the allocation stated in your ICO participation confirmation.",
        "Cross-validate ROI calculations using multiple price data sources for both ICO price and current price. ICO prices can vary across different exchanges where the token first listed — using the wrong reference price can overstate or understate your actual ROI. Always use the price at which you actually purchased (your confirmed cost basis) rather than an average ICO price that may differ from your specific transaction."
      ]
    },
    es: {
      interpret: [
        "Los cálculos de ROI de ICO miden el retorno de inversión de la participación en ofertas iniciales de monedas en relación con el precio de mercado actual. Una cifra positiva de ROI de ICO significa que los primeros inversores actualmente tienen ganancias no realizadas — pero este cálculo mira hacia atrás y no te dice nada sobre el rendimiento futuro.",
        "Al analizar datos de ROI de ICO en una cartera o comparar proyectos, ajusta por el tiempo transcurrido desde la ICO. Un ROI del 500% logrado en 18 meses representa un rendimiento ajustado al riesgo dramáticamente diferente al mismo retorno logrado en 5 años."
      ],
      scenarios: [
        "Un inversor participó en tres ICOs en 2020: Proyecto A a $0,01 (precio actual $0,18, ROI: 1,700%), Proyecto B a $0,50 (precio actual $0,08, ROI: -84%), Proyecto C a $2,00 (precio actual $4,50, ROI: 125%). El ROI promedio de cartera es del 580%, pero el análisis ponderado por capital cuenta una historia diferente.",
        "Una ICO de protocolo DeFi recaudó $8M a $0,004 por token en 2021. Hoy el token cotiza a $0,12 — un ROI del 2,900%. Sin embargo, durante este período el protocolo generó $3,2M en comisiones acumuladas."
      ],
      checklist: [
        "Al calcular el ROI de ICO para tomar decisiones, incluye todos los costos: precio del token ICO, comisiones de transacción durante la compra, cualquier costo de conversión de moneda si compraste con BTC o ETH, y eventos fiscales desencadenados por ventas o intercambios intermedios.",
        "Segmenta tu cartera de ICO por año de inversión (2017, 2018, 2019, 2020, 2021) y mide el rendimiento frente a referencias relevantes: retorno total de Bitcoin y retorno total de Ethereum para los mismos períodos."
      ],
      mistakes: [
        "Confundir el ROI de ICO con el mérito de inversión. Un token que ha subido un 10,000% desde su precio de ICO puede estar ahora significativamente sobrevalorado en relación con los fundamentos.",
        "Vender participaciones en ICO basándose únicamente en alcanzar objetivos de ROI de números redondos (10x, 50x, 100x) sin análisis fundamental."
      ],
      benchmarks: [
        "Estudios completos de ICOs de 2017–2018 muestran que más del 90% de los proyectos están por debajo de su precio de ICO seis años después de recaudar.",
        "Los datos del vintage de ICO de 2020–2021 son más favorables: aproximadamente el 60% de los proyectos de este período muestran retornos positivos."
      ],
      execution: [
        "Establece una estrategia de salida escalonada antes de que se desbloqueen los tokens ICO: vende el 20%–25% en 3x ROI, vende otro 20%–25% en 10x ROI, y mantén el 50%–60% restante como posición de paseo libre.",
        "Para posiciones de ICO con grandes ganancias no realizadas, modela el calendario de liquidación óptimo desde el punto de vista fiscal."
      ],
      hygiene: [
        "Mantén un libro de ICO dedicado con los siguientes campos para cada inversión: fecha de ICO, nombre del proyecto, símbolo del token, monto invertido, precio ICO, tokens recibidos, calendario de desbloqueo de vesting, saldo actual de tokens, precio actual, valor actual, ganancias realizadas por ventas parciales y ganancia/pérdida no realizada.",
        "Revisa anualmente tu tesis de inversión en ICO para cada posición activa. Compara el estado actual del proyecto con las promesas del whitepaper original."
      ],
      validation: [
        "Verifica los cálculos de ROI de ICO reconciliando las cantidades de tokens con los datos de blockchain.",
        "Valida cruzadamente los cálculos de ROI usando múltiples fuentes de datos de precios tanto para el precio ICO como para el precio actual."
      ]
    },
    pt: {
      interpret: [
        "Os cálculos de ROI de ICO medem o retorno sobre o investimento da participação em ofertas iniciais de moedas em relação ao preço de mercado atual. Uma figura positiva de ROI de ICO significa que os primeiros investidores estão atualmente com ganhos não realizados.",
        "Ao analisar dados de ROI de ICO em um portfólio ou comparar projetos, ajuste pelo tempo decorrido desde o ICO. Um ROI de 500% alcançado em 18 meses representa desempenho ajustado ao risco dramaticamente diferente do mesmo retorno alcançado em 5 anos."
      ],
      scenarios: [
        "Um investidor participou de três ICOs em 2020: Projeto A a $0,01 (preço atual $0,18, ROI: 1.700%), Projeto B a $0,50 (preço atual $0,08, ROI: -84%), Projeto C a $2,00 (preço atual $4,50, ROI: 125%).",
        "Um ICO de protocolo DeFi arrecadou $8M a $0,004 por token em 2021. Hoje o token é negociado a $0,12 — um ROI de 2.900%."
      ],
      checklist: [
        "Ao calcular o ROI de ICO para fins de tomada de decisão, inclua todos os custos: preço do token ICO, taxas de transação durante a compra, quaisquer custos de conversão de moeda.",
        "Segmente seu portfólio de ICO por ano de vintage (2017, 2018, 2019, 2020, 2021) e meça o desempenho em relação a benchmarks relevantes."
      ],
      mistakes: [
        "Confundir o ROI de ICO com mérito de investimento.",
        "Vender participações de ICO puramente com base em atingir metas de ROI de números redondos sem análise fundamental."
      ],
      benchmarks: [
        "Estudos abrangentes de ICOs de 2017–2018 mostram que mais de 90% dos projetos estão abaixo de seu preço de ICO seis anos após a captação.",
        "Os dados de vintage de ICO de 2020–2021 são mais favoráveis: aproximadamente 60% dos projetos deste período mostram retornos positivos."
      ],
      execution: [
        "Defina uma estratégia de saída em níveis antes que os tokens ICO sejam desbloqueados.",
        "Para posições de ICO com grandes ganhos não realizados, modele o cronograma de liquidação otimizado para impostos."
      ],
      hygiene: [
        "Mantenha um livro de ICO dedicado com os seguintes campos para cada investimento: data do ICO, nome do projeto, símbolo do token, valor investido, preço ICO, tokens recebidos.",
        "Revise anualmente sua tese de investimento em ICO para cada posição ativa."
      ],
      validation: [
        "Verifique os cálculos de ROI de ICO reconciliando as quantidades de tokens com os dados de blockchain.",
        "Valide cruzadamente os cálculos de ROI usando múltiplas fontes de dados de preços."
      ]
    },
    tr: {
      interpret: [
        "ICO ROI hesaplamaları, ilk coin teklifine katılımın getirisini mevcut piyasa fiyatına göre ölçer. Pozitif bir ICO ROI rakamı, erken yatırımcıların şu anda gerçekleşmemiş kazançlara sahip olduğu anlamına gelir — ancak bu hesaplama geçmişe dönük olup gelecekteki performans hakkında hiçbir şey söylemiyor.",
        "Bir portföyde ICO ROI verilerini analiz ederken veya projeleri karşılaştırırken ICO'dan bu yana geçen süreyi düzeltin. 18 ayda elde edilen %500 ROI, 5 yılda elde edilen aynı getiriden dramatik biçimde farklı bir risk-ayarlı performansı temsil eder."
      ],
      scenarios: [
        "Bir yatırımcı 2020'de üç ICO'ya katıldı: Proje A 0,01 dolardan (mevcut fiyat 0,18 dolar, ROI: %1.700), Proje B 0,50 dolardan (mevcut fiyat 0,08 dolar, ROI: -%84), Proje C 2,00 dolardan (mevcut fiyat 4,50 dolar, ROI: %125).",
        "Bir DeFi protokolü ICO'su 2021'de token başına 0,004 dolardan 8 milyon dolar topladı. Bugün token 0,12 dolardan işlem görüyor — %2.900 ROI."
      ],
      checklist: [
        "Karar alma amacıyla ICO ROI hesaplarken tüm maliyetleri dahil edin: ICO token fiyatı, satın alma sırasındaki işlem ücretleri, BTC veya ETH ile satın aldıysanız herhangi bir para birimi dönüştürme maliyeti.",
        "ICO portföyünüzü vintage yılına (2017, 2018, 2019, 2020, 2021) göre segmentleyin ve performansı ilgili kıyaslamalarla ölçün."
      ],
      mistakes: [
        "ICO ROI'yi yatırım değeriyle karıştırmak.",
        "Temel analiz yapmaksızın yalnızca yuvarlak sayı ROI hedeflerine ulaşmaya dayanarak ICO varlıklarını satmak."
      ],
      benchmarks: [
        "2017–2018 ICO'larının kapsamlı çalışmaları, projelerin %90'ından fazlasının toplamadan altı yıl sonra ICO fiyatlarının altında olduğunu gösteriyor.",
        "2020–2021 ICO vintage verileri daha olumludur: bu dönemdeki projelerin yaklaşık %60'ı pozitif getiri gösteriyor."
      ],
      execution: [
        "ICO tokenleri açılmadan önce kademeli bir çıkış stratejisi belirleyin.",
        "Büyük gerçekleşmemiş kazançlara sahip ICO pozisyonları için vergi açısından en uygun tasfiye takvimini modelleyin."
      ],
      hygiene: [
        "Her yatırım için şu alanları içeren özel bir ICO defteri tutun: ICO tarihi, proje adı, token sembolü, yatırılan miktar, ICO fiyatı, alınan tokenlar.",
        "Her aktif pozisyon için ICO yatırım tezisinizi yıllık olarak gözden geçirin."
      ],
      validation: [
        "ICO ROI hesaplamalarını blockchain verileriyle token miktarlarını mutabık hale getirerek doğrulayın.",
        "Hem ICO fiyatı hem de mevcut fiyat için birden fazla fiyat veri kaynağı kullanarak ROI hesaplamalarını çapraz olarak doğrulayın."
      ]
    },
    hi: {
      interpret: [
        "ICO ROI गणनाएं वर्तमान बाजार मूल्य के सापेक्ष प्रारंभिक सिक्का पेशकश भागीदारी से निवेश पर रिटर्न मापती हैं। एक सकारात्मक ICO ROI आंकड़े का मतलब है कि शुरुआती निवेशक वर्तमान में अप्राप्त लाभ पर बैठे हैं।",
        "किसी पोर्टफोलियो में ICO ROI डेटा का विश्लेषण करते समय या परियोजनाओं की तुलना करते समय, ICO के बाद बीते समय के लिए समायोजित करें। 18 महीनों में हासिल किए गए 500% ROI का जोखिम-समायोजित प्रदर्शन 5 साल में हासिल किए गए समान रिटर्न से नाटकीय रूप से अलग होता है।"
      ],
      scenarios: [
        "एक निवेशक ने 2020 में तीन ICO में भाग लिया: प्रोजेक्ट A $0.01 पर (वर्तमान मूल्य $0.18, ROI: 1,700%), प्रोजेक्ट B $0.50 पर (वर्तमान मूल्य $0.08, ROI: -84%), प्रोजेक्ट C $2.00 पर (वर्तमान मूल्य $4.50, ROI: 125%)।",
        "एक DeFi प्रोटोकॉल ICO ने 2021 में $0.004 प्रति टोकन पर $8M जुटाए। आज टोकन $0.12 पर ट्रेड होता है — 2,900% का ROI।"
      ],
      checklist: [
        "निर्णय लेने के उद्देश्यों के लिए ICO ROI की गणना करते समय, सभी लागतें शामिल करें: ICO टोकन मूल्य, खरीद के दौरान लेनदेन शुल्क।",
        "अपने ICO पोर्टफोलियो को विंटेज वर्ष (2017, 2018, 2019, 2020, 2021) द्वारा विभाजित करें और प्रासंगिक बेंचमार्क के खिलाफ प्रदर्शन मापें।"
      ],
      mistakes: [
        "ICO ROI को निवेश मेरिट के साथ भ्रमित करना।",
        "मूलभूत विश्लेषण के बिना केवल राउंड-नंबर ROI लक्ष्य (10x, 50x, 100x) तक पहुंचने के आधार पर ICO होल्डिंग बेचना।"
      ],
      benchmarks: [
        "2017–2018 ICO के व्यापक अध्ययन दिखाते हैं कि 90%+ परियोजनाएं अपने ICO मूल्य से छह साल बाद नीचे हैं।",
        "2020–2021 ICO विंटेज डेटा अधिक अनुकूल है: इस अवधि की लगभग 60% परियोजनाएं सकारात्मक रिटर्न दिखाती हैं।"
      ],
      execution: [
        "ICO टोकन अनलॉक होने से पहले एक स्तरीय निकास रणनीति निर्धारित करें।",
        "बड़े अप्राप्त लाभ वाले ICO पोजीशन के लिए, कर-इष्टतम परिसमापन शेड्यूल को मॉडल करें।"
      ],
      hygiene: [
        "प्रत्येक निवेश के लिए निम्नलिखित फ़ील्ड के साथ एक समर्पित ICO लेज़र बनाए रखें: ICO तिथि, प्रोजेक्ट नाम, टोकन प्रतीक, निवेश राशि, ICO मूल्य, प्राप्त टोकन।",
        "प्रत्येक सक्रिय पोजीशन के लिए वार्षिक रूप से अपनी ICO निवेश थीसिस की समीक्षा करें।"
      ],
      validation: [
        "ब्लॉकचेन डेटा के साथ टोकन मात्राओं का मिलान करके ICO ROI गणनाओं को सत्यापित करें।",
        "ICO मूल्य और वर्तमान मूल्य दोनों के लिए कई मूल्य डेटा स्रोतों का उपयोग करके ROI गणनाओं को क्रॉस-वैलिडेट करें।"
      ]
    },
    ru: {
      interpret: [
        "Расчёты ROI ICO измеряют возврат инвестиций от участия в первичном предложении монет относительно текущей рыночной цены. Положительный показатель ROI ICO означает, что ранние инвесторы в настоящее время имеют нереализованную прибыль.",
        "При анализе данных ROI ICO по портфелю или при сравнении проектов делайте поправку на время, прошедшее с момента ICO. ROI в 500%, достигнутый за 18 месяцев, представляет собой кардинально иную результативность с поправкой на риск, чем тот же доход за 5 лет."
      ],
      scenarios: [
        "Инвестор участвовал в трёх ICO в 2020 году: Проект A по $0,01 (текущая цена $0,18, ROI: 1 700%), Проект B по $0,50 (текущая цена $0,08, ROI: -84%), Проект C по $2,00 (текущая цена $4,50, ROI: 125%).",
        "ICO DeFi-протокола привлекло $8 млн по $0,004 за токен в 2021 году. Сегодня токен торгуется по $0,12 — ROI 2 900%."
      ],
      checklist: [
        "При расчёте ROI ICO для принятия решений включайте все затраты: цену токена на ICO, комиссии за транзакции при покупке, любые расходы на конвертацию валюты.",
        "Сегментируйте свой ICO-портфель по году инвестирования (2017, 2018, 2019, 2020, 2021) и измеряйте результативность относительно соответствующих бенчмарков."
      ],
      mistakes: [
        "Смешение ROI ICO с инвестиционными достоинствами проекта.",
        "Продажа позиций ICO исключительно на основе достижения целевых показателей ROI в круглых числах без фундаментального анализа."
      ],
      benchmarks: [
        "Всестороннее исследование ICO 2017–2018 годов показывает, что более 90% проектов торгуются ниже цены ICO через шесть лет после привлечения средств.",
        "Данные ICO 2020–2021 годов более обнадёживающие: около 60% проектов этого периода демонстрируют положительную доходность."
      ],
      execution: [
        "Установите поэтапную стратегию выхода до разблокировки токенов ICO.",
        "Для позиций ICO с большой нереализованной прибылью смоделируйте оптимальный с точки зрения налогов график ликвидации."
      ],
      hygiene: [
        "Ведите специальный реестр ICO со следующими полями для каждой инвестиции: дата ICO, название проекта, тикер токена, вложенная сумма, цена ICO, полученные токены.",
        "Ежегодно пересматривайте инвестиционный тезис ICO для каждой активной позиции."
      ],
      validation: [
        "Проверяйте расчёты ROI ICO, сверяя количество токенов с данными блокчейна.",
        "Перекрёстно проверяйте расчёты ROI с использованием нескольких источников данных о ценах как для цены ICO, так и для текущей цены."
      ]
    }
  },

  'token-distribution': {
    en: {
      interpret: [
        "Token distribution analysis reveals how ownership is concentrated or dispersed across wallet addresses, providing a critical lens on governance risk, sell pressure potential, and project decentralization claims. A distribution where the top 10 wallets hold 60%+ of supply indicates high centralization — even if the team claims decentralization as a core value. Concentrated distributions create significant price risk: a single large holder deciding to exit can move markets dramatically. Evaluate distributions in the context of who holds the concentrated positions: known team wallets are different from anonymous concentrated holders who may represent undisclosed insiders or early whales.",
        "Healthy token distribution typically shows a large number of wallets with meaningful (but not overwhelming) allocations across diverse holder categories: small retail holders, medium active users, institutional holders, and project treasury. The Gini coefficient — a measure of inequality from 0 (perfect equality) to 1 (one entity holds everything) — provides a single comparable metric. Most successful protocols hover between 0.6–0.8 Gini coefficient at maturity; values above 0.9 indicate problematic concentration worth investigating further."
      ],
      scenarios: [
        "A new Layer-1 blockchain claims to be fully decentralized but its token distribution shows: top wallet holds 22% (team multisig), next 5 wallets average 8% each (VC firms), next 44 wallets hold 1%–3% each (angel investors), and 50,000+ wallets hold less than 0.01% combined. Effective governance is controlled by fewer than 50 entities. A governance proposal requires 10% vote — something the top holder can veto unilaterally. The decentralization claim is marketing, not reality.",
        "An established DEX has been distributing tokens through liquidity mining for 3 years. Current distribution: top 100 wallets hold 35% (down from 80% at launch), next 10,000 wallets hold 40%, and 200,000+ wallets hold the remaining 25%. The distribution is improving — becoming more dispersed through continuous LM rewards. Governance is competitive with no single dominant faction. This distribution profile supports the protocol's decentralization narrative and reduces single-point-of-failure risk."
      ],
      checklist: [
        "Before investing in any token, run a distribution analysis using a blockchain explorer or analytics platform. Calculate: percentage held by top 10 wallets, percentage held by top 100 wallets, number of wallets holding more than 1% of supply, and whether large wallet addresses are publicly identified (team, VCs) or anonymous. Anonymous large holders represent unknown risk that identified holders don't.",
        "Evaluate distribution changes over time: is the token becoming more or less decentralized? A project where the top-10 wallet percentage has declined from 70% to 40% over 2 years is demonstrating healthy distribution through its reward mechanisms. A project where concentration has remained static or increased suggests that token emissions are recycling to existing whales rather than reaching new participants."
      ],
      mistakes: [
        "Equating number of wallets with decentralization. A token with 1 million wallets but 80% held by the top 20 addresses is effectively as centralized as a token with 1,000 wallets where the top 20 hold 80%. Wallet count is a vanity metric — distribution by percentage is the actual decentralization measure. Projects sometimes highlight large wallet counts to obscure highly concentrated ownership.",
        "Assuming exchange cold wallets represent diverse ownership. Many top-10 token holders are exchange custody wallets (Binance, Coinbase, Kraken) that represent thousands of individual customers pooled in a single address. These should be excluded from concentration analysis or treated separately — exchange holdings don't represent the same governance or selling risk as equivalent holdings in a single individual's wallet."
      ],
      benchmarks: [
        "Mature Layer-1 blockchains (Ethereum, Solana, Avalanche) at 3+ years of operation typically show top-10 wallet concentration of 20%–35%, with exchange wallets accounting for 30%–50% of that. DeFi protocols with active liquidity mining show faster decentralization, often reaching below 40% top-10 concentration within 12–18 months. Newly launched tokens under 6 months old often show 70%–90% top-10 concentration — this is expected and not inherently alarming if it's declining.",
        "Historical data shows a strong correlation between token distribution concentration and price volatility. Tokens with top-10 concentration above 60% show average 30-day price volatility that is 2.5x higher than tokens with top-10 concentration below 30%. This reflects the market impact potential of concentrated holders moving positions — a structural risk that broad-based distribution eliminates over time."
      ],
      execution: [
        "Use distribution data to identify potential sell walls before they materialize. Monitor large wallet addresses (holding >1% of supply) monthly using on-chain analytics tools. When these addresses begin transferring tokens to exchanges, it's an early signal of upcoming selling pressure — typically 3–7 days before market impact. This early warning gives you time to reduce exposure before the sell-off hits.",
        "Factor distribution concentration into your position sizing decisions. For tokens with top-10 concentration above 50%, apply a 30%–40% reduction to your standard position size to account for elevated single-holder risk. Restore full position sizing only after distribution metrics improve to below 40% top-10 concentration, indicating the structural risk has diminished."
      ],
      hygiene: [
        "Run distribution analyses quarterly for all tokens in your portfolio exceeding 5% of your total crypto allocation. Use Nansen, Etherscan's rich list, or similar tools to capture the current distribution snapshot. Store historical snapshots to track whether distribution is improving (decentralizing) or worsening (concentrating) over time. Consistent concentration increases are red flags requiring immediate investigation.",
        "Distinguish between different types of concentrated holders when interpreting distribution data: team wallets (expected, monitored through vesting), exchange custody wallets (neutral — pooled customer funds), protocol treasury (positive — fund future development), and unknown large holders (investigate — could be undisclosed insiders or market manipulators)."
      ],
      validation: [
        "Verify distribution data by pulling fresh on-chain data rather than relying on cached analytics. Token distribution can change rapidly after major events — liquidity mining launches, large OTC deals, or protocol migrations. Analytics platforms sometimes display 24–72 hour delayed data. For time-sensitive decisions, query the blockchain directly using tools like The Graph or direct RPC calls.",
        "Cross-check distribution interpretation against community governance participation data. If a protocol has 200,000 token holders but only 300 unique addresses participate in governance votes, true engaged ownership is far more concentrated than distribution numbers suggest. Low governance participation relative to holder count indicates apathetic small holders who may not buffer against large-holder decisions."
      ]
    },
    es: {
      interpret: [
        "El análisis de distribución de tokens revela cómo se concentra o dispersa la propiedad entre las direcciones de billeteras, proporcionando una lente crítica sobre el riesgo de gobernanza, el potencial de presión vendedora y las afirmaciones de descentralización del proyecto.",
        "Una distribución de tokens saludable típicamente muestra un gran número de billeteras con asignaciones significativas (pero no abrumadoras) en diversas categorías de tenedores. El coeficiente de Gini proporciona una única métrica comparable."
      ],
      scenarios: [
        "Una nueva blockchain de Capa 1 afirma ser completamente descentralizada, pero su distribución de tokens muestra: la billetera principal tiene el 22% (multisig del equipo), las siguientes 5 billeteras promedian el 8% cada una (firmas de VC).",
        "Un DEX establecido ha distribuido tokens a través de minería de liquidez durante 3 años. Distribución actual: las 100 billeteras principales tienen el 35% (frente al 80% en el lanzamiento), las siguientes 10,000 billeteras tienen el 40%."
      ],
      checklist: [
        "Antes de invertir en cualquier token, realiza un análisis de distribución usando un explorador de blockchain o una plataforma de análisis. Calcula: porcentaje en manos de las 10 principales billeteras, porcentaje en manos de las 100 principales billeteras.",
        "Evalúa los cambios de distribución a lo largo del tiempo: ¿el token se está volviendo más o menos descentralizado?"
      ],
      mistakes: [
        "Equiparar el número de billeteras con la descentralización. Un token con 1 millón de billeteras pero el 80% en manos de las 20 principales direcciones es efectivamente tan centralizado como un token con 1,000 billeteras.",
        "Asumir que las billeteras frías de los exchanges representan una propiedad diversa."
      ],
      benchmarks: [
        "Las blockchains de Capa 1 maduras (Ethereum, Solana, Avalanche) con 3+ años de operación típicamente muestran una concentración en las 10 principales billeteras del 20%–35%.",
        "Los datos históricos muestran una fuerte correlación entre la concentración de distribución de tokens y la volatilidad de precios."
      ],
      execution: [
        "Usa los datos de distribución para identificar posibles paredes de venta antes de que se materialicen. Monitorea las grandes direcciones de billetera (con más del 1% del suministro) mensualmente usando herramientas de análisis on-chain.",
        "Factoriza la concentración de distribución en tus decisiones de dimensionamiento de posición."
      ],
      hygiene: [
        "Realiza análisis de distribución trimestralmente para todos los tokens en tu cartera que superen el 5% de tu asignación total de criptomonedas.",
        "Distingue entre diferentes tipos de tenedores concentrados cuando interpretes datos de distribución."
      ],
      validation: [
        "Verifica los datos de distribución obteniendo datos on-chain frescos en lugar de depender de análisis en caché.",
        "Contrasta la interpretación de la distribución con los datos de participación en la gobernanza de la comunidad."
      ]
    },
    pt: {
      interpret: [
        "A análise de distribuição de tokens revela como a propriedade está concentrada ou dispersa entre endereços de carteiras, fornecendo uma lente crítica sobre risco de governança, potencial de pressão de venda e reivindicações de descentralização do projeto.",
        "A distribuição saudável de tokens tipicamente mostra um grande número de carteiras com alocações significativas (mas não esmagadoras) em diversas categorias de detentores."
      ],
      scenarios: [
        "Uma nova blockchain Layer-1 afirma ser totalmente descentralizada, mas sua distribuição de tokens mostra: a carteira principal detém 22% (multisig da equipe), as próximas 5 carteiras têm em média 8% cada (firmas de VC).",
        "Uma DEX estabelecida tem distribuído tokens através de mineração de liquidez por 3 anos. Distribuição atual: as 100 principais carteiras detêm 35% (abaixo de 80% no lançamento)."
      ],
      checklist: [
        "Antes de investir em qualquer token, execute uma análise de distribuição usando um explorador de blockchain ou plataforma de análise.",
        "Avalie as mudanças de distribuição ao longo do tempo: o token está se tornando mais ou menos descentralizado?"
      ],
      mistakes: [
        "Equiparar o número de carteiras com descentralização.",
        "Assumir que carteiras frias de exchanges representam propriedade diversa."
      ],
      benchmarks: [
        "Blockchains Layer-1 maduras (Ethereum, Solana, Avalanche) com 3+ anos de operação tipicamente mostram concentração nas 10 principais carteiras de 20%–35%.",
        "Dados históricos mostram forte correlação entre concentração de distribuição de tokens e volatilidade de preços."
      ],
      execution: [
        "Use dados de distribuição para identificar paredes de venda potenciais antes que se materializem.",
        "Considere a concentração de distribuição em suas decisões de dimensionamento de posição."
      ],
      hygiene: [
        "Execute análises de distribuição trimestralmente para todos os tokens em seu portfólio que excedam 5% de sua alocação total de cripto.",
        "Distinga entre diferentes tipos de detentores concentrados ao interpretar dados de distribuição."
      ],
      validation: [
        "Verifique os dados de distribuição obtendo dados on-chain frescos em vez de depender de análises em cache.",
        "Contraste a interpretação da distribuição com dados de participação em governança da comunidade."
      ]
    },
    tr: {
      interpret: [
        "Token dağılımı analizi, sahipliğin cüzdan adresleri arasında nasıl yoğunlaştığını veya dağıldığını ortaya koyarak yönetişim riski, satış baskısı potansiyeli ve projenin merkeziyetsizlik iddiaları hakkında kritik bir mercek sağlar.",
        "Sağlıklı token dağılımı tipik olarak çeşitli tutucu kategorilerinde anlamlı (ancak bunaltıcı olmayan) tahsislerle çok sayıda cüzdan gösterir."
      ],
      scenarios: [
        "Yeni bir Layer-1 blockchain tamamen merkeziyetsiz olduğunu iddia ediyor ancak token dağılımı şunu gösteriyor: en büyük cüzdan %22 tutuyor (ekip multisig), sonraki 5 cüzdan ortalama her biri %8 tutuyor (VC firmaları).",
        "Köklü bir DEX, 3 yıl boyunca likidite madenciliği aracılığıyla tokenları dağıtıyor. Mevcut dağılım: ilk 100 cüzdan %35 tutuyor (lansmandaki %80'den düşüş)."
      ],
      checklist: [
        "Herhangi bir tokena yatırım yapmadan önce bir blockchain gezgini veya analitik platform kullanarak dağılım analizi yapın.",
        "Zaman içinde dağılım değişikliklerini değerlendirin: token giderek daha az mı yoksa daha fazla mı merkeziyetsizleşiyor?"
      ],
      mistakes: [
        "Cüzdan sayısını merkeziyetsizlikle eşitleştirmek.",
        "Exchange soğuk cüzdanlarının çeşitlendirilmiş mülkiyeti temsil ettiğini varsaymak."
      ],
      benchmarks: [
        "3+ yıllık olgun Layer-1 blockchainler tipik olarak ilk 10 cüzdanda %20–%35 yoğunlaşma gösterir.",
        "Tarihsel veriler token dağılımı yoğunlaşması ile fiyat oynaklığı arasında güçlü bir korelasyon gösteriyor."
      ],
      execution: [
        "Potansiyel satış duvarlarını gerçekleşmeden önce belirlemek için dağılım verilerini kullanın.",
        "Pozisyon boyutlandırma kararlarınıza dağılım yoğunlaşmasını dahil edin."
      ],
      hygiene: [
        "Toplam kripto tahsisinizin %5'ini aşan tüm tokenlar için üç ayda bir dağılım analizi yapın.",
        "Dağılım verilerini yorumlarken farklı yoğunlaşmış tutucu türlerini birbirinden ayırın."
      ],
      validation: [
        "Önbelleğe alınmış analitiğe güvenmek yerine taze zincir üstü verileri çekerek dağılım verilerini doğrulayın.",
        "Dağılım yorumunu topluluk yönetişim katılım verileriyle çapraz olarak kontrol edin."
      ]
    },
    hi: {
      interpret: [
        "टोकन वितरण विश्लेषण प्रकट करता है कि वॉलेट पते में स्वामित्व कैसे केंद्रित या फैला हुआ है, शासन जोखिम, बिक्री दबाव क्षमता और परियोजना विकेंद्रीकरण दावों पर एक महत्वपूर्ण दृष्टिकोण प्रदान करता है।",
        "स्वस्थ टोकन वितरण आमतौर पर विविध धारक श्रेणियों में महत्वपूर्ण (लेकिन अत्यधिक नहीं) आवंटन के साथ बड़ी संख्या में वॉलेट दिखाता है।"
      ],
      scenarios: [
        "एक नई Layer-1 ब्लॉकचेन पूरी तरह से विकेंद्रीकृत होने का दावा करती है लेकिन इसका टोकन वितरण दिखाता है: शीर्ष वॉलेट 22% रखता है (टीम मल्टीसिग)।",
        "एक स्थापित DEX 3 साल से लिक्विडिटी माइनिंग के माध्यम से टोकन वितरित कर रहा है। वर्तमान वितरण: शीर्ष 100 वॉलेट 35% रखते हैं (लॉन्च पर 80% से नीचे)।"
      ],
      checklist: [
        "किसी भी टोकन में निवेश करने से पहले, ब्लॉकचेन एक्सप्लोरर या एनालिटिक्स प्लेटफॉर्म का उपयोग करके वितरण विश्लेषण चलाएं।",
        "समय के साथ वितरण परिवर्तनों का मूल्यांकन करें: क्या टोकन अधिक या कम विकेंद्रीकृत हो रहा है?"
      ],
      mistakes: [
        "वॉलेट की संख्या को विकेंद्रीकरण के बराबर मानना।",
        "यह मानना कि एक्सचेंज कोल्ड वॉलेट विविध स्वामित्व का प्रतिनिधित्व करते हैं।"
      ],
      benchmarks: [
        "परिपक्व Layer-1 ब्लॉकचेन (Ethereum, Solana, Avalanche) 3+ वर्षों के संचालन पर आमतौर पर शीर्ष 10 वॉलेट एकाग्रता 20%–35% दिखाते हैं।",
        "ऐतिहासिक डेटा टोकन वितरण एकाग्रता और मूल्य अस्थिरता के बीच मजबूत सहसंबंध दिखाता है।"
      ],
      execution: [
        "बिक्री दीवारों को भौतिक होने से पहले पहचानने के लिए वितरण डेटा का उपयोग करें।",
        "अपने पोजीशन साइजिंग निर्णयों में वितरण एकाग्रता को शामिल करें।"
      ],
      hygiene: [
        "अपने कुल क्रिप्टो आवंटन के 5% से अधिक वाले सभी टोकन के लिए त्रैमासिक वितरण विश्लेषण चलाएं।",
        "वितरण डेटा की व्याख्या करते समय विभिन्न प्रकार के केंद्रित धारकों के बीच अंतर करें।"
      ],
      validation: [
        "कैश किए गए एनालिटिक्स पर निर्भर रहने के बजाय ताजा ऑन-चेन डेटा खींचकर वितरण डेटा सत्यापित करें।",
        "समुदाय शासन भागीदारी डेटा के खिलाफ वितरण व्याख्या को क्रॉस-चेक करें।"
      ]
    },
    ru: {
      interpret: [
        "Анализ распределения токенов показывает, насколько сосредоточена или рассредоточена собственность по адресам кошельков, обеспечивая критически важный взгляд на риск управления, потенциал давления продаж и заявления о децентрализации проекта.",
        "Здоровое распределение токенов обычно характеризуется большим количеством кошельков со значимыми (но не чрезмерными) аллокациями в различных категориях держателей."
      ],
      scenarios: [
        "Новый блокчейн первого уровня заявляет о полной децентрализации, но распределение токенов показывает: топ-кошелёк держит 22% (мультисиг команды), следующие 5 кошельков в среднем по 8% (венчурные фирмы).",
        "Устоявшаяся DEX три года распределяет токены через майнинг ликвидности. Текущее распределение: топ-100 кошельков держат 35% (снижение с 80% при запуске)."
      ],
      checklist: [
        "Перед инвестированием в любой токен проведите анализ распределения с помощью блокчейн-эксплорера или аналитической платформы.",
        "Отслеживайте изменения распределения во времени: становится ли токен более или менее децентрализованным?"
      ],
      mistakes: [
        "Приравнивание количества кошельков к децентрализации.",
        "Допущение, что холодные кошельки бирж представляют разнообразное владение."
      ],
      benchmarks: [
        "Зрелые блокчейны первого уровня (Ethereum, Solana, Avalanche) при 3+ годах работы обычно показывают концентрацию в топ-10 кошельков 20–35%.",
        "Исторические данные демонстрируют сильную корреляцию между концентрацией распределения токенов и ценовой волатильностью."
      ],
      execution: [
        "Используйте данные распределения для заблаговременного выявления потенциальных стен продаж.",
        "Учитывайте концентрацию распределения в решениях о размере позиции."
      ],
      hygiene: [
        "Ежеквартально проводите анализ распределения по всем токенам в портфеле, превышающим 5% общей крипто-аллокации.",
        "При интерпретации данных распределения разграничивайте различные типы концентрированных держателей."
      ],
      validation: [
        "Проверяйте данные распределения, получая свежие on-chain данные, а не полагаясь на кэшированную аналитику.",
        "Сопоставляйте интерпретацию распределения с данными об участии сообщества в управлении."
      ]
    }
  },
  'token-gating-access': {
    en: {
      interpret: [
        "Token gating analysis determines the minimum token holding required to access specific features, communities, or content — and the implied dollar cost of that access threshold. When evaluating token gating setups, consider both the current dollar cost of the required tokens and the price volatility that could make access unpredictable for users. A gating threshold set at 100 tokens when the token was $0.50 creates $50 access cost; the same threshold when the token rises to $5.00 becomes $500 — potentially pricing out the core user base that was intended to benefit from the gated feature.",
        "From an investment angle, token gating creates structural holding demand — users who need access must maintain their positions, creating price support. The strength of this demand depends on how valuable the gated content is perceived to be: exclusive tools, alpha communities, and governance rights create stronger demand than cosmetic features. Analyze gating mechanics across comparable protocols to assess whether this project's gating design creates authentic holding utility or superficial demand that evaporates when user interest wanes."
      ],
      scenarios: [
        "A research platform gates premium crypto analysis behind a 500-token holding requirement. At launch ($0.20/token), access costs $100 — accessible to most users. After 18 months, the token rises to $2.50, making access cost $1,250. New user acquisition collapses as the cost exceeds the perceived value of the research. The protocol must either lower the threshold (diluting existing gated access value) or accept declining growth — a design tension inherent in fixed-threshold token gating.",
        "A DeFi protocol gates its institutional-grade analytics dashboard behind a tiered system: 1,000 tokens for basic access, 10,000 for intermediate, 100,000 for full suite. At $0.05/token, these tiers cost $50, $500, and $5,000 respectively — aligned with the value each tier delivers. This tiered approach creates three distinct holder categories with different economic incentives, distributing buy pressure across multiple access points rather than concentrating it at a single threshold."
      ],
      checklist: [
        "Evaluate token gating requirements by calculating the current dollar cost of each tier and assessing whether that cost aligns with the perceived value of access. If the cheapest gating tier costs more than comparable subscription-based alternatives, the gating mechanism creates friction rather than value, and users will seek alternatives. Gating is most effective when it provides exclusive benefits genuinely unavailable elsewhere.",
        "Analyze the sensitivity of gating economics to price changes. Model what happens to access costs if the token price triples or drops by 70%. If your protocol's gating thresholds become either inaccessible (too expensive) or trivially cheap (no signal value) under realistic price scenarios, the fixed-threshold design may need dynamic adjustment mechanisms tied to dollar value rather than token quantity."
      ],
      mistakes: [
        "Setting token gating thresholds based on current price without building in adjustment mechanisms. Static token quantity thresholds become economically misaligned as price changes. Best-practice designs use USD-denominated thresholds ('$50 equivalent in tokens') with automatic adjustment, or governance mechanisms that allow the community to adjust thresholds as market conditions change without requiring a full protocol upgrade.",
        "Overestimating the holding incentive created by token gating. Many users who need gated access prefer to rent tokens via DeFi borrowing protocols rather than permanently holding, bypassing the intended holding demand. When token borrowing rates are low (1%–3% annually), the economic cost of temporary gating access through borrowing is negligible — meaning the protocol captures little permanent buy pressure from its gating mechanics."
      ],
      benchmarks: [
        "Successful token-gated communities typically show 60%–80% of gated access users maintaining their positions for 6+ months, suggesting genuine value perception in the exclusive content. Communities with retention below 40% indicate that users are accessing, consuming, and leaving — the gating mechanism creates a one-time purchase rather than sustained holding demand. Monitor retention rates as a key performance indicator of gating utility.",
        "Token gating has proven most effective for protocols where the gated access is non-replicable: exclusive governance rights, early protocol access, real-world event access, or private communities with high-value participants. Gated access to content that's eventually made public shows much lower retention rates — users access during the exclusivity window then reduce positions once content becomes freely available."
      ],
      execution: [
        "If participating in a token-gated ecosystem, optimize your holding position around gating tiers. Holding just enough tokens to access the highest valuable tier (and no more) maximizes the ROI of your capital allocation: you get full access benefits with minimum capital tied up in the gating requirement. Review quarterly whether your tier requirements have changed and adjust positions accordingly.",
        "For protocol designers, implement dynamic gating thresholds using on-chain oracle price feeds. Set gating in USD-equivalent terms ($100 worth of tokens) rather than fixed quantities. This ensures access costs remain stable for users as token price fluctuates, maintaining consistent user acquisition economics and preventing the price-appreciation access problem."
      ],
      hygiene: [
        "If you hold tokens specifically for gating access, track these positions separately in your portfolio as 'utility holdings' distinct from speculative positions. Apply different decision criteria: utility holdings should be evaluated based on whether the gated access continues to deliver value exceeding the opportunity cost of the capital, not on price appreciation potential.",
        "Set alerts for your gating threshold positions: if the token price rises to the point where your holding value exceeds 5x the annual value of gated access, consider whether it makes economic sense to sell some tokens and replace gating access with alternative methods (borrowing, subscriptions, or reduced tier access)."
      ],
      validation: [
        "Verify token gating mechanics by testing the actual access controls on the platform. Sometimes announced gating requirements differ from implemented smart contract logic — testing with a wallet that holds exactly the minimum required tokens confirms the mechanism works as documented. Check whether the access control checks are real-time (continuous holding required) or snapshot-based (one-time verification).",
        "Cross-validate the claimed benefits of gated access against actual user testimonials and on-chain data. If a protocol claims premium research access drives superior returns, check whether gated-access user wallets show measurably different trading performance than non-gated wallets. Real value creation should be demonstrable through on-chain behavior patterns."
      ]
    },
    es: { interpret: ["El análisis de acceso con token gating determina el mínimo de tokens requeridos para acceder a características específicas, comunidades o contenido — y el costo implícito en dólares de ese umbral de acceso.", "Desde un ángulo de inversión, el token gating crea demanda estructural de tenencia — los usuarios que necesitan acceso deben mantener sus posiciones, creando soporte de precio."], scenarios: ["Una plataforma de investigación cierra el análisis cripto premium detrás de un requisito de tenencia de 500 tokens. Al lanzamiento ($0,20/token), el acceso cuesta $100 — accesible para la mayoría de los usuarios.", "Un protocolo DeFi cierra su panel de análisis de grado institucional detrás de un sistema escalonado: 1,000 tokens para acceso básico, 10,000 para intermedio, 100,000 para la suite completa."], checklist: ["Evalúa los requisitos de token gating calculando el costo actual en dólares de cada nivel y evaluando si ese costo está alineado con el valor percibido del acceso.", "Analiza la sensibilidad de la economía del gating a los cambios de precio."], mistakes: ["Establecer umbrales de token gating basados en el precio actual sin mecanismos de ajuste incorporados.", "Sobreestimar el incentivo de tenencia creado por el token gating."], benchmarks: ["Las comunidades exitosas con token gating típicamente muestran que el 60%–80% de los usuarios con acceso cerrado mantienen sus posiciones durante 6+ meses.", "El token gating ha demostrado ser más efectivo para protocolos donde el acceso cerrado no es replicable."], execution: ["Si participas en un ecosistema con token gating, optimiza tu posición de tenencia alrededor de los niveles de acceso.", "Para los diseñadores de protocolos, implementa umbrales de gating dinámicos usando feeds de precios de oráculos on-chain."], hygiene: ["Si tienes tokens específicamente para acceso de gating, realiza un seguimiento de estas posiciones por separado en tu cartera como 'tenencias de utilidad'.", "Establece alertas para tus posiciones de umbral de gating."], validation: ["Verifica los mecanismos de token gating probando los controles de acceso reales en la plataforma.", "Valida cruzadamente los beneficios declarados del acceso cerrado contra los testimonios reales de usuarios y datos on-chain."] },
    pt: { interpret: ["A análise de acesso por token gating determina o mínimo de tokens necessários para acessar recursos específicos, comunidades ou conteúdo — e o custo implícito em dólares desse limite de acesso.", "Do ponto de vista do investimento, o token gating cria demanda estrutural de detenção."], scenarios: ["Uma plataforma de pesquisa bloqueia análises premium de cripto por trás de um requisito de detenção de 500 tokens.", "Um protocolo DeFi bloqueia seu painel de análise de grau institucional por trás de um sistema em camadas."], checklist: ["Avalie os requisitos de token gating calculando o custo atual em dólares de cada camada.", "Analise a sensibilidade da economia de gating a mudanças de preço."], mistakes: ["Definir limites de token gating com base no preço atual sem mecanismos de ajuste.", "Superestimar o incentivo de detenção criado pelo token gating."], benchmarks: ["Comunidades bem-sucedidas com token gating tipicamente mostram que 60%–80% dos usuários com acesso bloqueado mantêm suas posições por 6+ meses.", "O token gating provou ser mais eficaz para protocolos onde o acesso bloqueado não é replicável."], execution: ["Se participar de um ecossistema com token gating, otimize sua posição de detenção em torno das camadas de acesso.", "Para designers de protocolos, implemente limites de gating dinâmicos usando feeds de preço de oráculos on-chain."], hygiene: ["Se você detém tokens especificamente para acesso de gating, rastreie essas posições separadamente em seu portfólio.", "Defina alertas para suas posições de limite de gating."], validation: ["Verifique os mecanismos de token gating testando os controles de acesso reais na plataforma.", "Valide cruzadamente os benefícios declarados do acesso bloqueado contra depoimentos reais de usuários e dados on-chain."] },
    tr: { interpret: ["Token gating erişim analizi, belirli özelliklere, topluluklara veya içeriklere erişmek için gereken minimum token tutumunu — ve bu erişim eşiğinin ima edilen dolar maliyetini — belirler.", "Yatırım açısından bakıldığında, token gating yapısal tutma talebi yaratır."], scenarios: ["Bir araştırma platformu, 500 token tutma gereksinimiyle premium kripto analizini kilitliyor.", "Bir DeFi protokolü, kurumsal düzeydeki analitik panosunu kademeli bir sistemin arkasına kilitliyor."], checklist: ["Token gating gereksinimlerini her katmanın mevcut dolar maliyetini hesaplayarak ve bu maliyetin erişimin algılanan değeriyle uyumlu olup olmadığını değerlendirerek değerlendirin.", "Gating ekonomisinin fiyat değişikliklerine duyarlılığını analiz edin."], mistakes: ["Ayarlama mekanizmaları oluşturmadan mevcut fiyata dayalı token gating eşikleri belirlemek.", "Token gating tarafından oluşturulan tutma teşvikini abartmak."], benchmarks: ["Başarılı token-gated topluluklarda gated erişim kullanıcılarının %60–%80'i 6+ ay boyunca pozisyonlarını korumaktadır.", "Token gating en çok, gated erişimin çoğaltılamaz olduğu protokollerde etkili olduğunu kanıtlamıştır."], execution: ["Token gated bir ekosisteme katılıyorsanız tutma pozisyonunuzu gating katmanları etrafında optimize edin.", "Protokol tasarımcıları için, zincir üstü kehanet fiyat akışlarını kullanarak dinamik gating eşikleri uygulayın."], hygiene: ["Özellikle gating erişimi için token tutuyorsanız, bu pozisyonları portföyünüzde 'yardımcı program tutumları' olarak ayrı takip edin.", "Gating eşiği pozisyonlarınız için uyarılar ayarlayın."], validation: ["Token gating mekanizmalarını platformdaki gerçek erişim kontrollerini test ederek doğrulayın.", "Gated erişimin iddia edilen faydalarını gerçek kullanıcı yorumları ve zincir üstü verilerle çapraz olarak doğrulayın."] },
    hi: { interpret: ["टोकन गेटिंग एक्सेस विश्लेषण निर्धारित करता है कि विशिष्ट सुविधाओं, समुदायों या सामग्री तक पहुंचने के लिए न्यूनतम कितने टोकन की आवश्यकता है।", "निवेश के दृष्टिकोण से, टोकन गेटिंग संरचनात्मक होल्डिंग मांग बनाता है।"], scenarios: ["एक रिसर्च प्लेटफॉर्म 500-टोकन होल्डिंग आवश्यकता के पीछे प्रीमियम क्रिप्टो विश्लेषण को गेट करता है।", "एक DeFi प्रोटोकॉल अपने संस्थागत-ग्रेड एनालिटिक्स डैशबोर्ड को एक स्तरीय प्रणाली के पीछे गेट करता है।"], checklist: ["प्रत्येक स्तर की वर्तमान डॉलर लागत की गणना करके और यह आकलन करके टोकन गेटिंग आवश्यकताओं का मूल्यांकन करें कि वह लागत एक्सेस के कथित मूल्य के साथ संरेखित है या नहीं।", "मूल्य परिवर्तनों के प्रति गेटिंग अर्थशास्त्र की संवेदनशीलता का विश्लेषण करें।"], mistakes: ["समायोजन तंत्र बनाए बिना वर्तमान मूल्य के आधार पर टोकन गेटिंग थ्रेशोल्ड निर्धारित करना।", "टोकन गेटिंग द्वारा बनाई गई होल्डिंग प्रोत्साहना को अधिक अनुमानित करना।"], benchmarks: ["सफल टोकन-गेटेड समुदाय आमतौर पर 60%–80% गेटेड एक्सेस उपयोगकर्ताओं को 6+ महीने तक पोजीशन बनाए रखते हुए दिखाते हैं।", "टोकन गेटिंग उन प्रोटोकॉल के लिए सबसे प्रभावी साबित हुआ है जहां गेटेड एक्सेस गैर-प्रतिकृति योग्य है।"], execution: ["यदि टोकन-गेटेड इकोसिस्टम में भाग लेते हैं, तो गेटिंग स्तरों के आसपास अपनी होल्डिंग पोजीशन को अनुकूलित करें।", "प्रोटोकॉल डिजाइनरों के लिए, ऑन-चेन ओरेकल प्राइस फीड का उपयोग करके डायनामिक गेटिंग थ्रेशोल्ड लागू करें।"], hygiene: ["यदि आप विशेष रूप से गेटिंग एक्सेस के लिए टोकन रखते हैं, तो इन पोजीशन को अपने पोर्टफोलियो में 'यूटिलिटी होल्डिंग' के रूप में अलग से ट्रैक करें।", "अपनी गेटिंग थ्रेशोल्ड पोजीशन के लिए अलर्ट सेट करें।"], validation: ["प्लेटफॉर्म पर वास्तविक एक्सेस नियंत्रणों का परीक्षण करके टोकन गेटिंग मेकेनिज्म को सत्यापित करें।", "गेटेड एक्सेस के दावा किए गए लाभों को वास्तविक उपयोगकर्ता प्रशंसापत्र और ऑन-चेन डेटा के खिलाफ क्रॉस-वैलिडेट करें।"] },
    ru: { interpret: ["Анализ токен-гейтинга определяет минимальное количество токенов, необходимое для доступа к определённым функциям, сообществам или контенту, а также подразумеваемую долларовую стоимость этого порогового значения.", "С инвестиционной точки зрения, токен-гейтинг создаёт структурный спрос на удержание."], scenarios: ["Исследовательская платформа закрывает премиум-аналитику за требованием держать 500 токенов.", "DeFi-протокол закрывает институциональный аналитический дашборд за многоуровневой системой."], checklist: ["Оценивайте требования токен-гейтинга, рассчитывая текущую долларовую стоимость каждого уровня и сопоставляя её с воспринимаемой ценностью доступа.", "Анализируйте чувствительность экономики гейтинга к изменениям цены."], mistakes: ["Установка порогов без механизмов корректировки на основе текущей цены.", "Переоценка стимула к удержанию, создаваемого токен-гейтингом."], benchmarks: ["Успешные сообщества с токен-гейтингом обычно удерживают 60–80% пользователей в позициях 6+ месяцев.", "Токен-гейтинг наиболее эффективен для протоколов с нереплицируемым закрытым доступом."], execution: ["При участии в экосистеме с токен-гейтингом оптимизируйте позицию под нужный уровень доступа.", "Для разработчиков протоколов — внедряйте динамические пороги с привязкой к on-chain оракулам цен."], hygiene: ["Если вы держите токены исключительно для гейтинга, учитывайте эти позиции отдельно как «утилитарные холдинги».", "Установите алерты по пороговым позициям гейтинга."], validation: ["Проверяйте механику токен-гейтинга, тестируя фактические контроли доступа на платформе.", "Сопоставляйте заявленные преимущества закрытого доступа с реальными отзывами пользователей и on-chain данными."] }
  },
  'tokenomics-modeling': {
    en: {
      interpret: ["Tokenomics modeling output tells you whether a project's economic design creates sustainable value alignment between protocol users, token holders, and the development team — or whether structural incentives create inevitable value destruction over time. The most important signal from a tokenomics model is the relationship between token emission (supply growth) and protocol value capture (demand drivers): if a protocol emits 20% new tokens annually but only generates 5% annual value growth in TVL and fees, token holders face persistent dilution that price appreciation cannot fully compensate.", "Good tokenomics models demonstrate positive feedback loops: more users → more protocol revenue → more value distributed to token holders → more token holding incentive → more liquidity → more users. Red flag models show reverse feedback: high token emissions attract yield farmers → emissions stop → farmers exit → liquidity collapses → TVL falls → fundamentals weaken → price corrects. Identify which type of loop your target protocol exhibits before committing capital."],
      scenarios: ["A lending protocol emits 15% of token supply annually as liquidity mining rewards. At $100M TVL, this emission costs $3M annually (3% of TVL). The protocol earns $4M annually in fees, of which 50% goes to token stakers. Net value to stakers: $2M fee income - $3M emission cost = -$1M annual value destruction per $100M TVL. This protocol's tokenomics mathematically destroy value at current parameters — price appreciation requires continuous new capital inflow to compensate.", "A decentralized exchange models its tokenomics showing: 2% annual token emission for 5 years, 100% of trading fees distributed to veToken lockers, veToken locking averages 2.5-year duration. At $500M annual volume, the protocol generates $1.5M in fees. With 40M tokens locked for an average 2.5 years and 10M tokens emitted annually, the emission-to-locked ratio is 25% — meaning emissions don't significantly dilute locked holders. This model creates genuine value accrual for long-term participants."],
      checklist: ["When analyzing any token model, explicitly map out: (1) all emission sources and their annual rates, (2) all value capture mechanisms and their magnitudes, (3) who receives what value flows, and (4) under what conditions does the model remain sustainable. A model that only works above certain TVL or price thresholds has structural fragility — model the break-even point explicitly.", "Stress-test tokenomics models against bear market scenarios. If the model requires continued price appreciation to sustain emissions, it's a Ponzi structure — emissions are paid for by new buyers, not protocol revenue. Ask: 'If the token price drops 80% tomorrow, does the protocol still create value for users and generate enough fee revenue to justify continued operation?' Models that answer 'yes' have genuine utility; those that answer 'no' are speculation vehicles."],
      mistakes: ["Confusing token price appreciation with tokenomics quality. A token can double in price due to market sentiment while having fundamentally unsustainable tokenomics. Price performance and tokenomics quality are independent variables — high price despite poor tokenomics indicates speculative demand that eventually corrects to fundamental value. Conversely, good tokenomics with low current price may represent the better risk-adjusted opportunity.", "Failing to account for governance token dilution effects on value per token. Even if a protocol generates $10M annual fees and distributes them to governance token holders, if the token supply grows 30% annually through emissions, each individual token's share of future fee distributions shrinks by 30% per year. Value per token must be calculated using future diluted supply, not current supply, to accurately assess investment merit."],
      benchmarks: ["Sustainable DeFi protocol tokenomics typically show: emission rates below 10% annually at maturity, fee distribution above 50% of gross revenue to token holders, and TVL-to-market-cap ratios between 0.3x and 3x. Protocols with emission rates above 20% at maturity and TVL-to-market-cap ratios above 5x are typically in an unsustainable growth phase that requires constant new capital to maintain.", "veToken models (pioneered by Curve Finance) have shown superior long-term price resilience compared to linear distribution models. Projects implementing veToken mechanics show 30%–50% higher token retention rates than comparable projects with simpler distributions, reflecting stronger alignment between long-term holders and protocol success."],
      execution: ["Build a 3-year tokenomics projection model before investing in any protocol with complex emission schedules. Project token supply growth, fee revenue growth at different TVL scenarios, and the resulting yield for token holders at each price point. Identify the price and TVL thresholds below which token holder ROI becomes negative — these are your exit triggers if the market approaches these levels.", "For veToken protocols, model the additional return from lock-up voting versus simple holding. Calculate: annual emission APR × your allocation vs. veToken boost multiplier × lock-adjusted emission. If the veToken lock increases your emission income by 2.5x and the unlock opportunity cost is 0.5% annually in lost flexibility, locking is economically rational for any investment horizon above 6 months."],
      hygiene: ["Review protocol tokenomics documentation for changes quarterly. Teams frequently adjust emission schedules, fee distribution parameters, and lock-up mechanics through governance votes — these changes can significantly alter the economic value proposition for token holders. Set up governance notification alerts to ensure you're aware of proposed parameter changes before they're enacted.", "Maintain a running yield calculation for each protocol position: current annual emissions at today's price vs. current annual fee distributions vs. token price change. This three-component yield analysis gives you a realistic total return figure that you can compare against alternatives to assess whether the position continues to deserve capital allocation."],
      validation: ["Verify tokenomics claims by reading the actual smart contract parameters, not just the documentation. Emission rates, fee splits, and lock-up mechanics are encoded in contract logic that may differ from stated documentation — especially for protocols that have made governance updates. Use blockchain analytics to track actual emission rates over the past 3–6 months and compare against stated parameters.", "Test tokenomics model assumptions against actual historical data. If the model assumes $50M TVL generates $500K in fees, verify this relationship against historical protocol data. If actual fee generation consistently underperforms model assumptions, the tokenomics are less favorable than represented — adjust your valuation and expected yield accordingly."]
    },
    es: { interpret: ["La salida del modelo de tokenomics te dice si el diseño económico de un proyecto crea una alineación de valor sostenible entre los usuarios del protocolo, los tenedores de tokens y el equipo de desarrollo.", "Los buenos modelos de tokenomics demuestran bucles de retroalimentación positivos."], scenarios: ["Un protocolo de préstamos emite el 15% del suministro de tokens anualmente como recompensas de minería de liquidez.", "Un intercambio descentralizado modela su tokenomics mostrando: 2% de emisión anual de tokens durante 5 años, 100% de las comisiones de negociación distribuidas a los bloqueadores de veToken."], checklist: ["Al analizar cualquier modelo de tokens, mapea explícitamente: (1) todas las fuentes de emisión y sus tasas anuales, (2) todos los mecanismos de captura de valor y sus magnitudes.", "Realiza pruebas de estrés a los modelos de tokenomics frente a escenarios de mercado bajista."], mistakes: ["Confundir la apreciación del precio del token con la calidad de los tokenomics.", "No tener en cuenta los efectos de dilución de los tokens de gobernanza en el valor por token."], benchmarks: ["Los tokenomics de protocolos DeFi sostenibles típicamente muestran: tasas de emisión inferiores al 10% anualmente en la madurez, distribución de comisiones superior al 50% de los ingresos brutos a los tenedores de tokens.", "Los modelos veToken han mostrado una resistencia de precios a largo plazo superior en comparación con los modelos de distribución lineal."], execution: ["Construye un modelo de proyección de tokenomics de 3 años antes de invertir en cualquier protocolo con calendarios de emisión complejos.", "Para protocolos veToken, modela el rendimiento adicional del bloqueo de votación versus la tenencia simple."], hygiene: ["Revisa la documentación de tokenomics del protocolo en busca de cambios trimestralmente.", "Mantén un cálculo de rendimiento en curso para cada posición del protocolo."], validation: ["Verifica las afirmaciones de tokenomics leyendo los parámetros reales del contrato inteligente, no solo la documentación.", "Prueba los supuestos del modelo de tokenomics frente a datos históricos reales."] },
    pt: { interpret: ["A saída do modelo de tokenomics diz se o design econômico de um projeto cria alinhamento de valor sustentável entre usuários do protocolo, detentores de tokens e a equipe de desenvolvimento.", "Bons modelos de tokenomics demonstram loops de feedback positivos."], scenarios: ["Um protocolo de empréstimos emite 15% do fornecimento de tokens anualmente como recompensas de mineração de liquidez.", "Uma exchange descentralizada modela sua tokenomics mostrando: 2% de emissão anual de tokens por 5 anos."], checklist: ["Ao analisar qualquer modelo de token, mapeie explicitamente: (1) todas as fontes de emissão e suas taxas anuais, (2) todos os mecanismos de captura de valor.", "Faça testes de estresse em modelos de tokenomics contra cenários de mercado de baixa."], mistakes: ["Confundir apreciação do preço do token com qualidade de tokenomics.", "Deixar de contabilizar os efeitos de diluição dos tokens de governança no valor por token."], benchmarks: ["Tokenomics sustentáveis de protocolos DeFi tipicamente mostram: taxas de emissão abaixo de 10% anualmente na maturidade.", "Modelos veToken mostraram resiliência de preço de longo prazo superior em comparação com modelos de distribuição linear."], execution: ["Construa um modelo de projeção de tokenomics de 3 anos antes de investir em qualquer protocolo com cronogramas de emissão complexos.", "Para protocolos veToken, modele o retorno adicional do bloqueio de votação versus detenção simples."], hygiene: ["Revise a documentação de tokenomics do protocolo para mudanças trimestralmente.", "Mantenha um cálculo de rendimento em andamento para cada posição de protocolo."], validation: ["Verifique as alegações de tokenomics lendo os parâmetros reais do contrato inteligente.", "Teste os pressupostos do modelo de tokenomics contra dados históricos reais."] },
    tr: { interpret: ["Tokenomics modelleme çıktısı, bir projenin ekonomik tasarımının protokol kullanıcıları, token sahipleri ve geliştirme ekibi arasında sürdürülebilir değer uyumu yaratıp yaratmadığını söyler.", "İyi tokenomics modelleri pozitif geri bildirim döngüleri gösterir."], scenarios: ["Bir borç verme protokolü, likidite madenciliği ödülleri olarak token arzının %15'ini yıllık olarak yayıyor.", "Bir merkezi olmayan borsa tokenomics'ini şöyle modelliyor: 5 yıl için yıllık %2 token emisyonu."], checklist: ["Herhangi bir token modelini analiz ederken açıkça şunları haritalayın: (1) tüm emisyon kaynakları ve yıllık oranları, (2) tüm değer yakalama mekanizmaları ve büyüklükleri.", "Tokenomics modellerini ayı piyasası senaryolarına karşı stres testi yapın."], mistakes: ["Token fiyat takdirini tokenomics kalitesiyle karıştırmak.", "Yönetişim token seyreltme etkilerini değer başına tokena dahil etmemek."], benchmarks: ["Sürdürülebilir DeFi protokolü tokenomics'leri tipik olarak şunu gösterir: olgunlukta yıllık %10'un altında emisyon oranları.", "veToken modelleri doğrusal dağıtım modellerine kıyasla uzun vadeli fiyat dayanıklılığında üstün olduğunu kanıtladı."], execution: ["Karmaşık emisyon takvimlerine sahip herhangi bir protokole yatırım yapmadan önce 3 yıllık bir tokenomics projeksiyon modeli oluşturun.", "veToken protokolleri için, oylama kilitleme ile basit tutmanın ek getirisini modelleyin."], hygiene: ["Protokol tokenomics belgelerini değişiklikler için üç ayda bir gözden geçirin.", "Her protokol pozisyonu için çalışan bir verim hesabı tutun."], validation: ["Tokenomics iddialarını yalnızca belgelere değil, gerçek akıllı sözleşme parametrelerini okuyarak doğrulayın.", "Tokenomics modeli varsayımlarını gerçek tarihsel verilere karşı test edin."] },
    hi: { interpret: ["टोकनोमिक्स मॉडलिंग आउटपुट आपको बताता है कि क्या किसी परियोजना का आर्थिक डिज़ाइन प्रोटोकॉल उपयोगकर्ताओं, टोकन धारकों और विकास टीम के बीच टिकाऊ मूल्य संरेखण बनाता है।", "अच्छे टोकनोमिक्स मॉडल सकारात्मक फीडबैक लूप प्रदर्शित करते हैं।"], scenarios: ["एक लेंडिंग प्रोटोकॉल तरलता खनन पुरस्कार के रूप में सालाना टोकन सप्लाई का 15% एमिट करता है।", "एक विकेंद्रीकृत एक्सचेंज अपनी टोकनोमिक्स को मॉडल करता है: 5 वर्षों के लिए वार्षिक 2% टोकन एमिशन।"], checklist: ["किसी भी टोकन मॉडल का विश्लेषण करते समय, स्पष्ट रूप से मैप करें: (1) सभी एमिशन स्रोत और उनकी वार्षिक दरें, (2) सभी मूल्य कैप्चर तंत्र।", "टोकनोमिक्स मॉडल को बेयर मार्केट परिदृश्यों के खिलाफ तनाव-परीक्षण करें।"], mistakes: ["टोकन मूल्य प्रशंसा को टोकनोमिक्स गुणवत्ता के साथ भ्रमित करना।", "प्रति टोकन मूल्य पर गवर्नेंस टोकन डाइल्यूशन प्रभावों का हिसाब न रखना।"], benchmarks: ["टिकाऊ DeFi प्रोटोकॉल टोकनोमिक्स आमतौर पर दिखाते हैं: परिपक्वता पर सालाना 10% से कम एमिशन दरें।", "veToken मॉडल ने लीनियर वितरण मॉडल की तुलना में बेहतर दीर्घकालिक मूल्य लचीलापन दिखाया है।"], execution: ["जटिल एमिशन शेड्यूल वाले किसी भी प्रोटोकॉल में निवेश करने से पहले 3-वर्ष का टोकनोमिक्स प्रोजेक्शन मॉडल बनाएं।", "veToken प्रोटोकॉल के लिए, लॉक-अप वोटिंग बनाम सरल होल्डिंग से अतिरिक्त रिटर्न मॉडल करें।"], hygiene: ["त्रैमासिक रूप से परिवर्तनों के लिए प्रोटोकॉल टोकनोमिक्स दस्तावेज़ीकरण की समीक्षा करें।", "प्रत्येक प्रोटोकॉल पोजीशन के लिए एक रनिंग यील्ड गणना बनाए रखें।"], validation: ["केवल दस्तावेज़ीकरण पर नहीं, बल्कि वास्तविक स्मार्ट कॉन्ट्रैक्ट पैरामीटर पढ़कर टोकनोमिक्स दावों को सत्यापित करें।", "ऐतिहासिक वास्तविक डेटा के खिलाफ टोकनोमिक्स मॉडल मान्यताओं का परीक्षण करें।"] },
    ru: { interpret: ["Результаты моделирования токеномики говорят о том, создаёт ли экономическая конструкция проекта устойчивое согласование интересов пользователей протокола, держателей токенов и команды разработчиков.", "Качественные модели токеномики демонстрируют положительные обратные связи."], scenarios: ["Лендинг-протокол ежегодно эмитирует 15% предложения токенов в качестве вознаграждений за майнинг ликвидности.", "Децентрализованная биржа моделирует токеномику: годовая эмиссия 2% токенов в течение 5 лет."], checklist: ["При анализе любой токен-модели явно составьте карту: (1) всех источников эмиссии и их годовых ставок, (2) всех механизмов захвата ценности.", "Проводите стресс-тестирование моделей токеномики в медвежьих рыночных сценариях."], mistakes: ["Смешение роста цены токена с качеством токеномики.", "Неучёт эффектов размывания токенов управления на стоимость одного токена."], benchmarks: ["Устойчивая токеномика DeFi-протоколов обычно характеризуется: ставками эмиссии ниже 10% в год на этапе зрелости.", "Модели veToken демонстрируют более высокую долгосрочную ценовую устойчивость по сравнению с линейными моделями распределения."], execution: ["Перед инвестированием в любой протокол со сложными графиками эмиссии стройте 3-летнюю проекционную модель токеномики.", "Для протоколов veToken моделируйте дополнительный доход от лок-апа с правом голоса по сравнению с простым удержанием."], hygiene: ["Ежеквартально проверяйте документацию по токеномике на предмет изменений.", "Ведите текущий расчёт доходности для каждой позиции в протоколе."], validation: ["Проверяйте заявления о токеномике, читая реальные параметры смарт-контракта, а не только документацию.", "Тестируйте допущения модели токеномики против реальных исторических данных."] }
  },
  'dao-voting-power': {
    en: {
      interpret: ["DAO voting power calculations reveal how influence is distributed across token holders in a governance system. A governance architecture where the top 10 wallets control 60%+ of voting power is effectively an oligarchy — regardless of how democratic the DAO process appears. Meaningful decentralization requires that no single entity can unilaterally pass proposals and that a diverse coalition of perspectives must converge for governance actions to succeed. Evaluate governance power distribution with the same rigor as financial distribution: concentration risks apply equally to governance outcomes as to market price.", "The relationship between token holdings and voting power isn't always 1:1. Quadratic voting reduces the power of large holders by weighting votes as the square root of tokens held. Conviction voting time-weights votes to reward long-term participation. Delegation systems allow token holders to assign their votes to subject-matter experts. Understand the specific voting mechanics before calculating governance influence — the same token holdings can represent dramatically different voting power across different DAO frameworks."],
      scenarios: ["A protocol DAO has 50M tokens in governance. Top wallet: 12M tokens (24% voting power). Next 4 wallets: 4M each (8% each). Quorum requirement: 10M votes. A coalition of the top wallet and any one of the next four can reach quorum and pass any proposal. In practice, this means two entities control governance outcomes — every DAO 'vote' is effectively a negotiation between these major players, with small holders providing democratic theater.", "A quadratic voting DAO has identical token distribution but calculates voting power as sqrt(tokens). Top wallet: sqrt(12M) = 3,464 votes. Next 4 wallets: sqrt(4M) = 2,000 each. Quorum: sqrt(10M) = 3,162 votes. Now the top wallet alone can reach quorum — but passing a proposal still requires majority of votes cast. The 46M tokens held by smaller wallets produce 6,781 aggregate votes (>2x the top holder), giving the distributed small holders actual decisive influence over governance outcomes."],
      checklist: ["Before participating in or building on a DAO, map the actual governance power distribution: what percentage of voting power is needed for quorum, what percentage to pass a proposal, and how many independent entities currently control enough tokens to meet each threshold. This analysis reveals whether governance is genuinely contested or effectively controlled by a small number of actors.", "Evaluate the delegation system if one exists: are votes being concentrated through delegation to a few addresses? A DAO with 10,000 token holders but 80% of voting power delegated to 5 delegates creates de facto oligarchy. Monitor delegation concentrations alongside raw token concentrations to get a complete picture of governance power."],
      mistakes: ["Equating on-chain governance participation with meaningful decentralization. A DAO can have 1,000 proposals and 500 votes per proposal while still being controlled by 3 whale wallets. The volume of governance activity is less important than the distribution of effective voting power. Low voter turnout with concentrated holdings is the most common pattern — small holders rarely participate because their individual votes rarely affect outcomes.", "Ignoring governance attack vectors when analyzing voting power. 51% attacks in DAO governance don't require a majority of all tokens — they require a majority of tokens participating in any specific vote. If typical turnout is 15% of tokens, an attacker needs just 8% of total supply to control governance outcomes during low-participation periods. Model the governance security under realistic turnout assumptions, not theoretical maximum participation."],
      benchmarks: ["Healthy governance participation in established DAOs averages 3%–8% of total token supply per vote, with peak controversial proposals reaching 15%–25%. DAOs with consistent participation below 2% face governance legitimacy risks — decisions made with minimal participation can be challenged as unrepresentative. Building minimum participation thresholds (5% of tokens must vote for a proposal to pass) provides governance legitimacy protection.", "Governance power concentration correlates with protocol age: newly launched DAOs often show 85%+% top-10 concentration, while mature protocols (3+ years) average 40%–60% top-10 concentration. The trajectory matters: protocols actively working to disperse governance power through delegation tools, governance mining, and participation incentives show healthier long-term decentralization trends."],
      execution: ["If you're a significant token holder in a DAO, engage with governance by voting or delegating to aligned representatives. Passive large holders who don't vote effectively cede their governance power to active participants — often resulting in governance outcomes misaligned with your interests. Even holding a $10,000 position, engaging in governance provides disproportionate benefit if your vote tips outcomes on proposals affecting your investment.", "For DAOs with delegation, carefully evaluate potential delegates before assigning voting power. Assess their voting history: are they consistent with their stated values? Do they vote in ways that protect token holder interests? Have they taken positions you would endorse? High-quality delegates who represent aligned values can amplify your governance influence beyond what your token holdings alone would provide."],
      hygiene: ["Monitor governance proposals weekly for any DAO where you hold significant positions. Governance changes — fee adjustments, emission schedule changes, treasury allocations, parameter updates — can significantly affect your returns. A single governance proposal that changes protocol fees from 0.3% to 0.1% can reduce your yield position by 67% overnight if you're positioned in fee-bearing assets.", "Track governance power concentration monthly using analytics tools. If a previously healthy distribution suddenly concentrates (due to large OTC purchases, delegation aggregation, or whale accumulation), this signals elevated governance attack risk. Concentration increases above 20% in a single month warrant immediate investigation of who the new concentrated holder is and what their governance history indicates."],
      validation: ["Verify voting power calculations by querying the governance contract directly rather than relying on DAO dashboards, which may show outdated snapshots or use different calculation methodologies. The governance contract holds the definitive source of truth for voting power at any block height. Particularly important for snapshot-based voting systems where historical holdings determine current voting power.", "Test DAO governance security by simulating potential attacks: 'If I wanted to pass a malicious proposal without community consent, how much capital would I need and what would it cost at current market prices?' This analysis reveals actual governance security levels — DAOs where a governance attack costs less than the potential extraction from a malicious proposal are fundamentally insecure regardless of how decentralized they appear."]
    },
    es: { interpret: ["Los cálculos del poder de voto en DAO revelan cómo se distribuye la influencia entre los tenedores de tokens en un sistema de gobernanza.", "La relación entre los tokens en poder y el poder de voto no siempre es 1:1."], scenarios: ["Un DAO de protocolo tiene 50M de tokens en gobernanza. La cartera principal: 12M de tokens (24% del poder de voto).", "Un DAO de votación cuadrática tiene una distribución de tokens idéntica pero calcula el poder de voto como sqrt(tokens)."], checklist: ["Antes de participar en un DAO, mapea la distribución real del poder de gobernanza.", "Evalúa el sistema de delegación si existe uno."], mistakes: ["Equiparar la participación en la gobernanza on-chain con una descentralización significativa.", "Ignorar los vectores de ataque de gobernanza al analizar el poder de voto."], benchmarks: ["La participación saludable en la gobernanza en DAOs establecidos promedia el 3%–8% del suministro total de tokens por voto.", "La concentración del poder de gobernanza se correlaciona con la edad del protocolo."], execution: ["Si eres un tenedor significativo de tokens en un DAO, participa en la gobernanza votando o delegando a representantes alineados.", "Para DAOs con delegación, evalúa cuidadosamente a los posibles delegados antes de asignar el poder de voto."], hygiene: ["Monitorea las propuestas de gobernanza semanalmente para cualquier DAO donde tengas posiciones significativas.", "Rastrea la concentración del poder de gobernanza mensualmente utilizando herramientas de análisis."], validation: ["Verifica los cálculos del poder de voto consultando directamente el contrato de gobernanza.", "Prueba la seguridad de la gobernanza de la DAO simulando posibles ataques."] },
    pt: { interpret: ["Os cálculos de poder de voto em DAO revelam como a influência é distribuída entre os detentores de tokens em um sistema de governança.", "A relação entre holdings de tokens e poder de voto nem sempre é 1:1."], scenarios: ["Um DAO de protocolo tem 50M de tokens em governança. Carteira principal: 12M de tokens (24% do poder de voto).", "Um DAO de votação quadrática tem distribuição de tokens idêntica, mas calcula o poder de voto como sqrt(tokens)."], checklist: ["Antes de participar de um DAO, mapeie a distribuição real do poder de governança.", "Avalie o sistema de delegação, se existir."], mistakes: ["Equiparar a participação na governança on-chain com descentralização significativa.", "Ignorar vetores de ataque de governança ao analisar o poder de voto."], benchmarks: ["A participação saudável na governança em DAOs estabelecidos tem em média 3%–8% do fornecimento total de tokens por voto.", "A concentração de poder de governança correlaciona-se com a idade do protocolo."], execution: ["Se você for um detentor significativo de tokens em um DAO, envolva-se com a governança votando ou delegando a representantes alinhados.", "Para DAOs com delegação, avalie cuidadosamente possíveis delegados antes de atribuir poder de voto."], hygiene: ["Monitore propostas de governança semanalmente para qualquer DAO onde você detém posições significativas.", "Rastreie a concentração de poder de governança mensualmente usando ferramentas de análise."], validation: ["Verifique os cálculos de poder de voto consultando o contrato de governança diretamente.", "Teste a segurança da governança do DAO simulando ataques potenciais."] },
    tr: { interpret: ["DAO oylama gücü hesaplamaları, bir yönetişim sisteminde token sahipleri arasında etkinin nasıl dağıldığını ortaya koyar.", "Token tutumları ile oy gücü arasındaki ilişki her zaman 1:1 değildir."], scenarios: ["Bir protokol DAO'sunda 50M token yönetişimde. En büyük cüzdan: 12M token (%24 oy gücü).", "Kuadratik oy kullanımı DAO'su, token dağılımı aynı olmasına karşın oy gücünü sqrt(token) olarak hesaplar."], checklist: ["Bir DAO'ya katılmadan önce gerçek yönetişim güç dağılımını haritalayın.", "Varsa delegasyon sistemini değerlendirin."], mistakes: ["Zincir üstü yönetişim katılımını anlamlı merkeziyetsizlikle eşitleştirmek.", "Oy gücünü analiz ederken yönetişim saldırı vektörlerini görmezden gelmek."], benchmarks: ["Köklü DAO'larda sağlıklı yönetişim katılımı, oy başına toplam token arzının ortalama %3–%8'ine denk gelmektedir.", "Yönetişim güç yoğunlaşması protokol yaşıyla ilişkilidir."], execution: ["DAO'da önemli bir token sahibiyseniz, oylama yaparak veya uyumlu temsilcilere delege ederek yönetişime katılın.", "Delegasyonlu DAO'lar için oy gücü atamadan önce potansiyel delegeleri dikkatlice değerlendirin."], hygiene: ["Önemli pozisyonlara sahip olduğunuz her DAO için yönetişim önerilerini haftalık izleyin.", "Yönetişim güç yoğunlaşmasını analitik araçları kullanarak aylık izleyin."], validation: ["Oy gücü hesaplamalarını DAO gösterge tablolarına güvenmek yerine yönetişim sözleşmesini doğrudan sorgulayarak doğrulayın.", "Potansiyel saldırıları simüle ederek DAO yönetişim güvenliğini test edin."] },
    hi: { interpret: ["DAO वोटिंग पावर गणनाएं प्रकट करती हैं कि एक शासन प्रणाली में टोकन धारकों में प्रभाव कैसे वितरित किया जाता है।", "टोकन होल्डिंग और वोटिंग पावर के बीच संबंध हमेशा 1:1 नहीं होता।"], scenarios: ["एक प्रोटोकॉल DAO में गवर्नेंस में 50M टोकन हैं। शीर्ष वॉलेट: 12M टोकन (24% वोटिंग पावर)।", "एक क्वाड्रेटिक वोटिंग DAO में समान टोकन वितरण है लेकिन वोटिंग पावर की गणना sqrt(tokens) के रूप में करता है।"], checklist: ["किसी DAO में भाग लेने से पहले, वास्तविक शासन शक्ति वितरण को मैप करें।", "यदि कोई प्रत्यायोजन प्रणाली मौजूद है तो उसका मूल्यांकन करें।"], mistakes: ["ऑन-चेन शासन भागीदारी को सार्थक विकेंद्रीकरण के बराबर मानना।", "वोटिंग पावर का विश्लेषण करते समय शासन हमले के वेक्टर को नजरअंदाज करना।"], benchmarks: ["स्थापित DAO में स्वस्थ शासन भागीदारी प्रति वोट कुल टोकन सप्लाई के औसतन 3%–8% है।", "शासन शक्ति एकाग्रता प्रोटोकॉल आयु के साथ सहसंबद्ध है।"], execution: ["यदि आप किसी DAO में महत्वपूर्ण टोकन धारक हैं, तो वोट करके या संरेखित प्रतिनिधियों को प्रत्यायोजित करके शासन में संलग्न हों।", "प्रत्यायोजन वाले DAO के लिए, वोटिंग पावर असाइन करने से पहले संभावित प्रत्यायोजितों का सावधानीपूर्वक मूल्यांकन करें।"], hygiene: ["किसी भी DAO जहां आपके पास महत्वपूर्ण पोजीशन हैं, उसके लिए साप्ताहिक शासन प्रस्तावों की निगरानी करें।", "एनालिटिक्स टूल का उपयोग करके मासिक रूप से शासन शक्ति एकाग्रता को ट्रैक करें।"], validation: ["DAO डैशबोर्ड पर निर्भर रहने के बजाय शासन अनुबंध को सीधे क्वेरी करके वोटिंग पावर गणनाओं को सत्यापित करें।", "संभावित हमलों का अनुकरण करके DAO शासन सुरक्षा का परीक्षण करें।"] },
    ru: { interpret: ["Расчёты голосовательной силы в DAO показывают, как распределено влияние между держателями токенов в системе управления.", "Соотношение между долей токенов и голосовательной силой не всегда 1:1."], scenarios: ["Протокольный DAO имеет 50 млн токенов в управлении. Топ-кошелёк: 12 млн токенов (24% голосовательной силы).", "DAO с квадратичным голосованием имеет идентичное распределение токенов, но рассчитывает голосовательную силу как sqrt(токены)."], checklist: ["Перед участием в DAO составьте карту фактического распределения управленческой власти.", "Оцените систему делегирования, если она существует."], mistakes: ["Приравнивание участия в on-chain-управлении к реальной децентрализации.", "Игнорирование векторов атак на управление при анализе голосовательной силы."], benchmarks: ["Здоровое участие в управлении устоявшихся DAO в среднем составляет 3–8% общего предложения токенов на голосование.", "Концентрация управленческой власти коррелирует с возрастом протокола."], execution: ["Если вы являетесь значимым держателем токенов в DAO, участвуйте в управлении путём голосования или делегирования согласованным представителям.", "Для DAO с делегированием тщательно оценивайте потенциальных делегатов перед передачей голосовательной силы."], hygiene: ["Еженедельно отслеживайте предложения по управлению для любого DAO, где у вас есть значимые позиции.", "Ежемесячно отслеживайте концентрацию управленческой власти с помощью аналитических инструментов."], validation: ["Проверяйте расчёты голосовательной силы, напрямую запрашивая контракт управления, а не полагаясь на дашборды DAO.", "Тестируйте безопасность управления DAO, моделируя потенциальные атаки."] }
  },
  'wallet-address-balance': {
    en: {
      interpret: ["Wallet balance analysis goes beyond simply knowing your current holdings — it provides context for portfolio risk management, tax planning, and performance attribution. A wallet holding 20 different assets with highly correlated price movements has lower effective diversification than the asset count suggests. Calculate the correlation-adjusted portfolio exposure to understand how concentrated your risk actually is across different market conditions. Bitcoin and Ethereum, despite being different assets, historically move within 0.7–0.9 correlation during both bull and bear phases, meaning a portfolio of only BTC and ETH is effectively a single-factor bet.", "When reviewing wallet balances, assess not just current dollar value but historical performance contribution. Which positions have contributed positively? Which have been net drags? This attribution analysis reveals whether your portfolio is thriving because of your selection decisions or simply because the entire market rose. Assets that underperformed the general market during bull phases while correlating fully on the downside are doubly punishing — they reduce gains and amplify losses."],
      scenarios: ["A crypto wallet shows: BTC ($15,000), ETH ($8,000), SOL ($5,000), AVAX ($3,000), and 12 DeFi tokens totaling $9,000. Total: $40,000. Despite appearing diversified across 15+ assets, BTC, ETH, and SOL account for 70% of value. During the May 2022 correction, all three dropped 40%–55%, and the DeFi tokens dropped 65%–85%. Effective diversification was minimal — the portfolio declined 52% average despite appearing widely spread across multiple blockchains.", "A DeFi investor's wallet shows: 60% in stablecoin LP positions, 30% in ETH, and 10% in governance tokens. This distribution appears conservative, but the stablecoin LP positions have smart contract risk exposure. A protocol hack or depeg event affecting any LP position could impact the 60% stablecoin allocation just as severely as a price crash would impact ETH. True risk assessment requires modeling non-price risks alongside market risks."],
      checklist: ["For each wallet you manage, calculate: (1) total dollar value across all assets, (2) percentage allocation by asset, (3) correlation-adjusted effective concentration, (4) percentage in high-risk vs. lower-risk positions, and (5) estimated tax liability from unrealized gains. This five-factor assessment gives a complete risk picture that raw balance figures don't provide alone.", "Identify your single largest source of risk — the position whose adverse movement would cause the most portfolio damage. If this position represents more than 40% of portfolio value, it dominates your portfolio returns in both directions. Deliberate about whether this concentration is intentional (you have high conviction) or accidental (the position grew through appreciation without active management)."],
      mistakes: ["Ignoring gas wallet allocation as a portfolio component. Many DeFi investors hold ETH specifically for gas costs but don't track it as part of their portfolio — leading to underreported holdings and incorrect allocation percentages. Every crypto asset in every connected wallet should be included in portfolio tracking, including native tokens held for network fees.", "Treating wallet balance as a static figure when DeFi positions are dynamic. LP positions, staking positions, and yield farming allocations change continuously as fees accumulate, rewards compound, and impermanent loss materializes. A point-in-time balance snapshot may misrepresent actual holdings by 5%–15% compared to the true liquidation value of all positions. Use portfolio trackers that account for dynamic position values, not just static token balances."],
      benchmarks: ["Institutional crypto portfolio management standards suggest: no single asset above 40% of portfolio, minimum 3 asset classes (Layer-1s, DeFi, stablecoins), and a risk-adjusted volatility target of 50%–70% of Bitcoin volatility for diversified portfolios. Portfolios with these characteristics historically show better Sharpe ratios than concentrated single-asset holdings over 3+ year periods.", "Average crypto retail portfolio concentration data shows that 60%+ of retail investors hold 80%+ of their crypto value in a single asset (usually BTC or ETH). While this reflects genuine conviction beliefs, it also represents high idiosyncratic risk. Adding just 2–3 non-correlated assets to a single-asset portfolio historically improved risk-adjusted returns by 15%–25% without meaningfully reducing upside exposure."],
      execution: ["Review your complete wallet balance across all wallets and chains monthly. Consolidate a unified portfolio view using tools like DeBank, Zapper, or Zerion that aggregate balances across EVM chains, Solana, and other ecosystems. Identify the full picture of your crypto exposure before making any new investment decisions — it's common for investors to hold significant positions they've forgotten about in wallets from previous cycles.", "Set rebalancing triggers based on asset allocation percentages rather than absolute dollar values. If you target a 40% BTC / 30% ETH / 30% altcoin split, trigger rebalancing whenever any single allocation drifts more than 15 percentage points from target. Percentage-based rebalancing automatically sells into appreciation and buys into weakness — implementing a systematic rule that outperforms most emotional decision-making."],
      hygiene: ["Maintain a master record of all wallet addresses you control across all blockchains, including hardware wallets, software wallets, and exchange accounts. This master list is essential for: complete portfolio tracking, tax reporting, security audits (ensuring all wallets are properly backed up), and inheritance planning. Update this record whenever you create new wallets or decommission old ones.", "Perform a quarterly security audit of all active wallets: review token approvals using Revoke.cash or similar tools and revoke any unused permissions, verify hardware wallet firmware is current, ensure seed phrases are securely backed up in at least two separate physical locations, and scan for dust attacks or address poisoning attempts in transaction history."],
      validation: ["Verify wallet balances by querying blockchain data directly through a block explorer rather than relying solely on wallet application displays. Wallet interfaces can fail to display pending transactions, recently received assets, or assets on chain forks. Direct blockchain queries provide ground-truth balance information that matches what's actually recorded on-chain.", "Cross-validate portfolio value calculations by comparing the aggregated wallet balance output with your own manual calculation for at least your top 5 holdings. Aggregation tools sometimes misidentify tokens (treating wrapped versions as original, or including defunct tokens with incorrect prices) — manual spot-checking ensures the automated summary accurately reflects your actual holdings."]
    },
    es: { interpret: ["El análisis de saldo de billeteras va más allá de conocer simplemente tus tenencias actuales — proporciona contexto para la gestión de riesgos de cartera, la planificación fiscal y la atribución de rendimiento.", "Al revisar los saldos de billeteras, evalúa no solo el valor actual en dólares sino también la contribución al rendimiento histórico."], scenarios: ["Una billetera cripto muestra: BTC ($15,000), ETH ($8,000), SOL ($5,000), AVAX ($3,000) y 12 tokens DeFi que suman $9,000.", "La billetera de un inversor DeFi muestra: 60% en posiciones LP de stablecoins, 30% en ETH, y 10% en tokens de gobernanza."], checklist: ["Para cada billetera que gestionas, calcula: (1) valor total en dólares en todos los activos, (2) porcentaje de asignación por activo.", "Identifica tu mayor fuente única de riesgo."], mistakes: ["Ignorar la asignación de la billetera de gas como componente de cartera.", "Tratar el saldo de la billetera como una cifra estática cuando las posiciones DeFi son dinámicas."], benchmarks: ["Los estándares de gestión de carteras cripto institucionales sugieren: ningún activo único por encima del 40% de la cartera.", "Los datos de concentración de cartera cripto minorista promedio muestran que más del 60% de los inversores minoristas tienen más del 80% de su valor cripto en un solo activo."], execution: ["Revisa el saldo completo de tu billetera en todas las billeteras y cadenas mensualmente.", "Establece disparadores de reequilibrio basados en porcentajes de asignación de activos en lugar de valores absolutos en dólares."], hygiene: ["Mantén un registro maestro de todas las direcciones de billetera que controlas en todas las blockchains.", "Realiza una auditoría de seguridad trimestral de todas las billeteras activas."], validation: ["Verifica los saldos de la billetera consultando los datos de blockchain directamente a través de un explorador de bloques.", "Valida cruzadamente los cálculos del valor de cartera comparando el resultado del saldo de billetera agregado con tu propio cálculo manual."] },
    pt: { interpret: ["A análise de saldo de carteiras vai além de simplesmente conhecer suas participações atuais — fornece contexto para gestão de risco de portfólio, planejamento tributário e atribuição de desempenho.", "Ao revisar os saldos de carteiras, avalie não apenas o valor atual em dólares, mas a contribuição histórica de desempenho."], scenarios: ["Uma carteira de cripto mostra: BTC ($15.000), ETH ($8.000), SOL ($5.000), AVAX ($3.000) e 12 tokens DeFi totalizando $9.000.", "A carteira de um investidor DeFi mostra: 60% em posições LP de stablecoin, 30% em ETH e 10% em tokens de governança."], checklist: ["Para cada carteira que você gerencia, calcule: (1) valor total em dólares em todos os ativos, (2) percentual de alocação por ativo.", "Identifique sua maior fonte única de risco."], mistakes: ["Ignorar a alocação da carteira de gas como componente de portfólio.", "Tratar o saldo da carteira como uma figura estática quando as posições DeFi são dinâmicas."], benchmarks: ["Os padrões de gestão de portfólio institucional de cripto sugerem: nenhum único ativo acima de 40% do portfólio.", "Os dados médios de concentração de portfólio cripto varejo mostram que mais de 60% dos investidores varejo mantêm mais de 80% de seu valor cripto em um único ativo."], execution: ["Revise o saldo completo de sua carteira em todas as carteiras e cadeias mensalmente.", "Defina gatilhos de rebalanceamento com base em percentuais de alocação de ativos em vez de valores absolutos em dólares."], hygiene: ["Mantenha um registro mestre de todos os endereços de carteira que você controla em todas as blockchains.", "Realize uma auditoria de segurança trimestral de todas as carteiras ativas."], validation: ["Verifique os saldos de carteira consultando os dados de blockchain diretamente através de um explorador de blocos.", "Valide cruzadamente os cálculos de valor de portfólio comparando a saída de saldo de carteira agregado com seu próprio cálculo manual."] },
    tr: { interpret: ["Cüzdan bakiye analizi, mevcut tutumlarınızı bilmenin ötesine geçer — portföy risk yönetimi, vergi planlaması ve performans atfı için bağlam sağlar.", "Cüzdan bakiyelerini incelerken, yalnızca mevcut dolar değerini değil, geçmiş performans katkısını da değerlendirin."], scenarios: ["Bir kripto cüzdanı şunu gösteriyor: BTC (15.000 dolar), ETH (8.000 dolar), SOL (5.000 dolar), AVAX (3.000 dolar) ve toplam 9.000 dolar tutan 12 DeFi tokeni.", "Bir DeFi yatırımcısının cüzdanı şunu gösteriyor: %60 stablecoin LP pozisyonlarında, %30 ETH'de ve %10 yönetişim tokenlerinde."], checklist: ["Yönettiğiniz her cüzdan için şunları hesaplayın: (1) tüm varlıklardaki toplam dolar değeri, (2) varlığa göre yüzde tahsisi.", "En büyük tek risk kaynağınızı belirleyin."], mistakes: ["Gas cüzdan tahsisini portföy bileşeni olarak görmezden gelmek.", "DeFi pozisyonları dinamikken cüzdan bakiyesini statik bir rakam olarak ele almak."], benchmarks: ["Kurumsal kripto portföy yönetimi standartları şunu öneriyor: portföyün %40'ının üzerinde tek bir varlık olmamalı.", "Ortalama kripto perakende portföy yoğunlaşma verileri, perakende yatırımcıların %60'ından fazlasının kripto değerlerinin %80'inden fazlasını tek bir varlıkta tuttuğunu gösteriyor."], execution: ["Tüm cüzdanlarınızda ve zincirlerde aylık tam cüzdan bakiyenizi gözden geçirin.", "Mutlak dolar değerleri yerine varlık tahsis yüzdelerine dayalı yeniden dengeleme tetikleyicileri belirleyin."], hygiene: ["Tüm blockchainlerde kontrol ettiğiniz tüm cüzdan adreslerinin ana kaydını tutun.", "Tüm aktif cüzdanların üç aylık güvenlik denetimini gerçekleştirin."], validation: ["Cüzdan bakiyelerini yalnızca cüzdan uygulama ekranlarına güvenmek yerine bir blok gezgini aracılığıyla blockchain verilerini doğrudan sorgulayarak doğrulayın.", "Portföy değeri hesaplamalarını, en az ilk 5 tutumunuz için toplanmış cüzdan bakiye çıktısını kendi manuel hesaplamanızla karşılaştırarak çapraz olarak doğrulayın."] },
    hi: { interpret: ["वॉलेट बैलेंस विश्लेषण केवल अपनी वर्तमान होल्डिंग जानने से परे है — यह पोर्टफोलियो जोखिम प्रबंधन, कर नियोजन और प्रदर्शन एट्रीब्यूशन के लिए संदर्भ प्रदान करता है।", "वॉलेट बैलेंस की समीक्षा करते समय, न केवल वर्तमान डॉलर मूल्य का मूल्यांकन करें बल्कि ऐतिहासिक प्रदर्शन योगदान का भी।"], scenarios: ["एक क्रिप्टो वॉलेट दिखाता है: BTC ($15,000), ETH ($8,000), SOL ($5,000), AVAX ($3,000) और 12 DeFi टोकन कुल $9,000।", "एक DeFi निवेशक के वॉलेट में: 60% स्टेबलकॉइन LP पोजीशन में, 30% ETH में, और 10% गवर्नेंस टोकन में।"], checklist: ["प्रत्येक वॉलेट के लिए गणना करें: (1) सभी संपत्तियों में कुल डॉलर मूल्य, (2) संपत्ति द्वारा प्रतिशत आवंटन।", "जोखिम के अपने एकल सबसे बड़े स्रोत की पहचान करें।"], mistakes: ["गैस वॉलेट आवंटन को पोर्टफोलियो घटक के रूप में नजरअंदाज करना।", "जब DeFi पोजीशन गतिशील हों तो वॉलेट बैलेंस को स्थिर आंकड़े के रूप में मानना।"], benchmarks: ["संस्थागत क्रिप्टो पोर्टफोलियो प्रबंधन मानक सुझाते हैं: कोई एकल संपत्ति पोर्टफोलियो के 40% से ऊपर नहीं।", "औसत क्रिप्टो रिटेल पोर्टफोलियो एकाग्रता डेटा दिखाता है कि 60%+ रिटेल निवेशक एकल संपत्ति में अपने क्रिप्टो मूल्य का 80%+ रखते हैं।"], execution: ["मासिक रूप से सभी वॉलेट और चेन में अपना पूरा वॉलेट बैलेंस समीक्षा करें।", "निरपेक्ष डॉलर मूल्यों के बजाय संपत्ति आवंटन प्रतिशत के आधार पर रीबैलेंसिंग ट्रिगर सेट करें।"], hygiene: ["सभी ब्लॉकचेन में आपके नियंत्रण में सभी वॉलेट पते का मास्टर रिकॉर्ड बनाए रखें।", "सभी सक्रिय वॉलेट का त्रैमासिक सुरक्षा ऑडिट करें।"], validation: ["वॉलेट एप्लिकेशन डिस्प्ले पर निर्भर रहने के बजाय ब्लॉक एक्सप्लोरर के माध्यम से सीधे ब्लॉकचेन डेटा क्वेरी करके वॉलेट बैलेंस सत्यापित करें।", "कम से कम शीर्ष 5 होल्डिंग के लिए एग्रीगेटेड वॉलेट बैलेंस आउटपुट को अपनी मैनुअल गणना से तुलना करके पोर्टफोलियो मूल्य गणनाओं को क्रॉस-वैलिडेट करें।"] },
    ru: { interpret: ["Анализ баланса кошелька выходит за рамки простого знания текущих активов — он обеспечивает контекст для управления рисками портфеля, налогового планирования и атрибуции доходности.", "При просмотре балансов кошельков оценивайте не только текущую стоимость в долларах, но и вклад в историческую доходность."], scenarios: ["Крипто-кошелёк показывает: BTC ($15 000), ETH ($8 000), SOL ($5 000), AVAX ($3 000) и 12 DeFi-токенов на $9 000.", "Кошелёк DeFi-инвестора показывает: 60% в стейблкоин LP-позициях, 30% в ETH и 10% в токенах управления."], checklist: ["Для каждого кошелька рассчитайте: (1) общую стоимость в долларах по всем активам, (2) процентное распределение по активу.", "Определите свой единственный крупнейший источник риска."], mistakes: ["Игнорирование газ-кошелька как компонента портфеля.", "Рассмотрение баланса кошелька как статической величины, когда DeFi-позиции динамичны."], benchmarks: ["Институциональные стандарты управления крипто-портфелем предполагают: ни один актив не должен превышать 40% портфеля.", "Данные о среднем розничном крипто-портфеле показывают, что более 60% розничных инвесторов держат 80%+ своей крипто-стоимости в одном активе."], execution: ["Ежемесячно проверяйте полный баланс кошелька по всем кошелькам и чейнам.", "Устанавливайте триггеры ребалансировки на основе процентов распределения активов, а не абсолютных долларовых значений."], hygiene: ["Ведите мастер-реестр всех адресов кошельков, которыми управляете, по всем блокчейнам.", "Ежеквартально проводите аудит безопасности всех активных кошельков."], validation: ["Проверяйте балансы кошельков, напрямую запрашивая данные блокчейна через эксплорер, а не полагаясь только на отображение в приложении кошелька.", "Перекрёстно проверяйте расчёты стоимости портфеля, сравнивая агрегированные балансы с собственными ручными расчётами как минимум по топ-5 позициям."] }
  },
  'transaction-fees': {
    en: {
      interpret: ["Transaction fee analysis reveals the true cost of on-chain activity and its impact on your investment returns. A trade that appears profitable on price movement alone may be unprofitable once gas costs, exchange fees, bridge fees, and slippage are factored in. For small positions, transaction costs can consume 5%–20% of the trade value — a significant drag that requires proportionally higher price movement to achieve the same net return. Always calculate the break-even price movement required to cover all transaction costs before entering any trade.", "Fee structures vary dramatically across blockchains and protocols: Ethereum mainnet gas can spike to $100+ during congestion, while Layer-2 transactions on Arbitrum or Optimism cost cents. Cross-chain bridge fees range from 0.05% to 0.5% of transferred value, plus underlying network fees. DEX fees add 0.01%–1% per trade depending on pool tier. Frequent traders accumulate fee drags that compound over time — a trader making 100 trades annually at 0.5% per trade pays the equivalent of 50% of position size in aggregate fees."],
      scenarios: ["A trader wants to move $5,000 from Ethereum to a DeFi protocol on Arbitrum, swap for a specific token, add liquidity, and stake the LP tokens. Cost breakdown: ETH bridge fee ($0.50 Arbitrum gas + 0.05% of $5,000 = $2.50 bridge fee = $3), Arbitrum swap fee (0.3% of $5,000 = $15), LP addition gas ($0.30), staking gas ($0.20). Total fees: ~$18.50, or 0.37% of position. Break-even on the staking yield requires earning at least 0.37% before this trade becomes profitable — achievable at typical DeFi yields, but meaningful for sizing decisions.", "A day trader on Ethereum mainnet makes 20 trades in a day, each $2,000 in size. Average gas cost per trade: $15. Average DEX fee: 0.3% = $6 per trade. Total daily fee: (15 + 6) × 20 = $420. To break even on fees alone, average trades must generate at least 1.05% return per trade. Given that most intraday crypto price movements are smaller than this, the trader is likely fee-negative on average — a mathematical guarantee of long-term losses regardless of directional accuracy."],
      checklist: ["Before any transaction, explicitly calculate total fee costs: network gas estimate, protocol trading fee percentage, bridge fee if applicable, and estimated slippage at current liquidity depth. Sum these and calculate as a percentage of transaction size. If total fees exceed 1% of transaction value for a non-yield-bearing trade, question whether the position size justifies the cost, or whether waiting for lower gas or consolidating transactions reduces the fee burden.", "Compare fee costs across alternative execution routes. For the same trade: direct DEX vs. DEX aggregator (1inch, Paraswap) may offer different gas and slippage; on-chain execution vs. CEX with withdrawal may differ by 0.1%–0.5%; bridge A vs. bridge B may differ by 0.2%–0.3%. Mapping these alternatives before executing identifies the optimal route that minimizes fee drag on your returns."],
      mistakes: ["Executing transactions without checking current gas prices. Gas prices on Ethereum can vary 10x–20x between peak and off-peak hours. A transaction costing $80 at 8am EST may cost $8 at 3am EST — for non-urgent transactions, scheduling execution during historically low-gas periods saves meaningful amounts over many transactions. Use tools like Etherscan Gas Tracker to identify optimal timing windows.", "Ignoring slippage as a fee component. For large trades relative to pool liquidity, price slippage can far exceed the stated trading fee. A $100,000 swap in a $500,000 liquidity pool may show 0.3% stated fee but incur 2%–5% actual slippage — making the effective fee 2.3%–5.3%. Always check the price impact percentage in DEX interfaces and split large trades across multiple blocks if slippage exceeds 0.5%."],
      benchmarks: ["Optimal fee burden targets for different trading strategies: DeFi yield farming — fees should not exceed 10% of expected annual yield; swing trading — fees should not exceed 0.5% per round trip; active DeFi strategies — annualized fee cost should be below 2% of capital managed. These benchmarks help you assess whether your current fee structure is compatible with your strategy's return profile.", "Cross-chain fee comparison at representative values: Ethereum mainnet averages $5–$50 per transaction. Arbitrum/Optimism: $0.05–$0.50. Polygon: $0.01–$0.05. Solana: $0.00025–$0.005. BNB Chain: $0.20–$2.00. For strategies involving many small transactions, chain selection dramatically affects total fee costs — the same 1,000 transactions cost $10,000–$50,000 on Ethereum vs. $25–$250 on Solana."],
      execution: ["Batch multiple transactions where protocol design allows. Many DeFi interactions can be combined using multicall contracts: approve + swap + stake in a single transaction costs 40%–60% less gas than three separate transactions. Research whether your target protocols support batching, or use wallet interfaces (Rabby, Frame) that automatically identify batching opportunities.", "Set gas price strategies based on transaction urgency. For non-time-sensitive transactions (moving assets to cold storage, claiming rewards weekly), use slow/economy gas settings that may take 10–30 minutes to confirm but cost 40%–70% less than fast gas. Reserve high gas settings for time-sensitive arbitrage, liquidation protection, and NFT mints — contexts where speed genuinely justifies premium cost."],
      hygiene: ["Track all transaction fees in your crypto tax records. Transaction fees paid in ETH or other native tokens are typically tax-deductible against crypto gains in most jurisdictions — failing to track these deductions means overpaying taxes. Use crypto tax software that automatically imports and categorizes gas costs from your wallet transaction history.", "Monitor your monthly total fee expenditure across all chains. If you're paying more than 2% of your active portfolio value in fees monthly, your trading frequency is likely excessive relative to your strategy's expected alpha. This fee awareness metric prevents the common trap of active trading with positive gross returns but negative net returns after fee deduction."],
      validation: ["After every significant transaction, compare the actual fee paid to your pre-transaction estimate. If actuals consistently exceed estimates by more than 20%, your estimation methodology needs refinement — common causes include underestimating gas limits, not accounting for MEV fees, or missing protocol-specific fee tiers. Accurate estimation prevents budget overruns and informs strategy sizing.", "Periodically audit the fee efficiency of your DeFi strategies. Calculate total fees paid over the past 90 days and compare against total returns generated in the same period. If fee ratio exceeds 30% of gross returns, the strategy's alpha is being consumed by friction costs — either execution optimization (better routing, batching, timing) or strategy re-evaluation is warranted."]
    },
    es: { interpret: ["El análisis de comisiones de transacción revela el costo real de la actividad on-chain y su impacto en los retornos de inversión. Una operación que parece rentable solo por el movimiento de precios puede ser no rentable una vez que se consideran los costos de gas, comisiones de intercambio, comisiones de puente y deslizamiento.", "Las estructuras de comisiones varían dramáticamente entre blockchains y protocolos."], scenarios: ["Un trader quiere mover $5,000 de Ethereum a un protocolo DeFi en Arbitrum, intercambiar por un token específico, agregar liquidez y apostar los tokens LP.", "Un trader diario en Ethereum mainnet realiza 20 operaciones en un día, cada una de $2,000 en tamaño."], checklist: ["Antes de cualquier transacción, calcula explícitamente los costos totales de comisiones.", "Compara los costos de comisiones en rutas de ejecución alternativas."], mistakes: ["Ejecutar transacciones sin verificar los precios actuales del gas.", "Ignorar el deslizamiento como componente de comisión."], benchmarks: ["Objetivos óptimos de carga de comisiones para diferentes estrategias de negociación.", "Comparación de comisiones entre cadenas a valores representativos."], execution: ["Agrupa múltiples transacciones donde el diseño del protocolo lo permita.", "Establece estrategias de precio de gas basadas en la urgencia de la transacción."], hygiene: ["Registra todas las comisiones de transacción en tus registros fiscales de cripto.", "Monitorea tu gasto total mensual en comisiones en todas las cadenas."], validation: ["Después de cada transacción significativa, compara la comisión real pagada con tu estimación previa.", "Audita periódicamente la eficiencia de comisiones de tus estrategias DeFi."] },
    pt: { interpret: ["A análise de taxas de transação revela o custo real da atividade on-chain e seu impacto nos retornos de investimento.", "As estruturas de taxas variam dramaticamente entre blockchains e protocolos."], scenarios: ["Um trader quer mover $5.000 do Ethereum para um protocolo DeFi no Arbitrum.", "Um day trader na mainnet Ethereum faz 20 negociações em um dia, cada uma de $2.000."], checklist: ["Antes de qualquer transação, calcule explicitamente os custos totais de taxas.", "Compare os custos de taxas em rotas de execução alternativas."], mistakes: ["Executar transações sem verificar os preços atuais de gas.", "Ignorar o slippage como componente de taxa."], benchmarks: ["Metas ideais de carga de taxa para diferentes estratégias de negociação.", "Comparação de taxas entre cadeias a valores representativos."], execution: ["Agrupe múltiplas transações onde o design do protocolo permitir.", "Defina estratégias de preço de gas com base na urgência da transação."], hygiene: ["Rastreie todas as taxas de transação em seus registros fiscais de cripto.", "Monitore seus gastos mensais totais em taxas em todas as cadeias."], validation: ["Após cada transação significativa, compare a taxa real paga com sua estimativa pré-transação.", "Periodicamente audite a eficiência de taxas de suas estratégias DeFi."] },
    tr: { interpret: ["İşlem ücreti analizi, zincir üstü aktivitenin gerçek maliyetini ve yatırım getirilerine etkisini ortaya koyar.", "Ücret yapıları, blockchainler ve protokoller arasında dramatik biçimde farklılık gösterir."], scenarios: ["Bir trader, 5.000 doları Ethereum'dan Arbitrum'daki bir DeFi protokolüne taşımak, belirli bir token için takas yapmak, likidite eklemek ve LP tokenlerini stake etmek istiyor.", "Ethereum mainnet'te bir günlük trader, günde 20 işlem yapıyor, her biri 2.000 dolar büyüklüğünde."], checklist: ["Herhangi bir işlemden önce, toplam ücret maliyetlerini açıkça hesaplayın.", "Alternatif yürütme güzergahlarında ücret maliyetlerini karşılaştırın."], mistakes: ["Mevcut gas fiyatlarını kontrol etmeden işlem yapmak.", "Kayma maliyetini ücret bileşeni olarak görmezden gelmek."], benchmarks: ["Farklı ticaret stratejileri için optimal ücret yükü hedefleri.", "Temsili değerlerde zincirler arası ücret karşılaştırması."], execution: ["Protokol tasarımının izin verdiği durumlarda birden fazla işlemi toplu yapın.", "İşlem aciliyetine göre gas fiyatı stratejileri belirleyin."], hygiene: ["Tüm işlem ücretlerini kripto vergi kayıtlarınızda takip edin.", "Tüm zincirlerdeki aylık toplam ücret harcamalarınızı izleyin."], validation: ["Her önemli işlemden sonra ödenen gerçek ücreti işlem öncesi tahmininizle karşılaştırın.", "DeFi stratejilerinizin ücret verimliliğini periyodik olarak denetleyin."] },
    hi: { interpret: ["लेनदेन शुल्क विश्लेषण ऑन-चेन गतिविधि की वास्तविक लागत और निवेश रिटर्न पर इसके प्रभाव को प्रकट करता है।", "शुल्क संरचनाएं ब्लॉकचेन और प्रोटोकॉल में नाटकीय रूप से भिन्न होती हैं।"], scenarios: ["एक ट्रेडर $5,000 को Ethereum से Arbitrum पर एक DeFi प्रोटोकॉल में ले जाना, एक विशिष्ट टोकन के लिए स्वैप करना, तरलता जोड़ना और LP टोकन को स्टेक करना चाहता है।", "Ethereum मेननेट पर एक दिवसीय ट्रेडर एक दिन में 20 ट्रेड करता है, प्रत्येक $2,000 आकार में।"], checklist: ["किसी भी लेनदेन से पहले, कुल शुल्क लागतों की स्पष्ट रूप से गणना करें।", "वैकल्पिक निष्पादन मार्गों में शुल्क लागतों की तुलना करें।"], mistakes: ["वर्तमान गैस मूल्यों की जांच किए बिना लेनदेन निष्पादित करना।", "स्लिपेज को शुल्क घटक के रूप में नजरअंदाज करना।"], benchmarks: ["विभिन्न ट्रेडिंग रणनीतियों के लिए इष्टतम शुल्क बोझ लक्ष्य।", "प्रतिनिधि मूल्यों पर क्रॉस-चेन शुल्क तुलना।"], execution: ["जहां प्रोटोकॉल डिज़ाइन अनुमति देता है वहां कई लेनदेन बैच करें।", "लेनदेन की तात्कालिकता के आधार पर गैस मूल्य रणनीतियां सेट करें।"], hygiene: ["अपने क्रिप्टो कर रिकॉर्ड में सभी लेनदेन शुल्कों को ट्रैक करें।", "सभी चेन में अपने मासिक कुल शुल्क व्यय की निगरानी करें।"], validation: ["प्रत्येक महत्वपूर्ण लेनदेन के बाद, वास्तविक भुगतान किए गए शुल्क की अपनी पूर्व-लेनदेन अनुमान से तुलना करें।", "अपनी DeFi रणनीतियों की शुल्क दक्षता का समय-समय पर ऑडिट करें।"] },
    ru: { interpret: ["Анализ комиссий за транзакции раскрывает реальную стоимость on-chain активности и её влияние на инвестиционные доходы.", "Структура комиссий кардинально различается между блокчейнами и протоколами."], scenarios: ["Трейдер хочет перевести $5 000 с Ethereum в DeFi-протокол на Arbitrum, обменять на конкретный токен, добавить ликвидность и застейкать LP-токены.", "Дей-трейдер в основной сети Ethereum делает 20 сделок в день по $2 000 каждая."], checklist: ["Перед любой транзакцией явно рассчитайте совокупные комиссионные затраты.", "Сравните комиссии по альтернативным маршрутам исполнения."], mistakes: ["Выполнение транзакций без проверки текущих цен на газ.", "Игнорирование проскальзывания как составляющей комиссии."], benchmarks: ["Оптимальные целевые уровни комиссионной нагрузки для различных торговых стратегий.", "Сравнение комиссий между чейнами при репрезентативных значениях."], execution: ["Пакетируйте несколько транзакций там, где это позволяет дизайн протокола.", "Устанавливайте стратегии цены газа в зависимости от срочности транзакции."], hygiene: ["Отслеживайте все комиссии за транзакции в крипто-налоговых записях.", "Отслеживайте ежемесячные совокупные расходы на комиссии по всем чейнам."], validation: ["После каждой значимой транзакции сравнивайте фактически уплаченную комиссию с доп-транзакционной оценкой.", "Периодически проверяйте эффективность затрат на комиссии в ваших DeFi-стратегиях."] }
  },
  'unit-converter': {
    en: {
      interpret: ["Cryptocurrency unit conversions reveal the underlying scale of blockchain systems and help contextualize value transfers across drastically different denominations. When you see 0.00001 BTC, converting to satoshis (1,000 sats) makes the quantity immediately tangible. When evaluating Ethereum gas costs in gwei, converting to USD at current ETH price transforms abstract technical metrics into economic reality. The ability to fluidly convert between denominations is essential for comparing value across networks: 1 MATIC at $0.80 vs. 1 SOL at $150 vs. 1 ETH at $3,000 require common units to enable meaningful comparison of transaction cost efficiency.", "Denomination differences create persistent confusion for new crypto participants. Bitcoin's 8-decimal precision (1 BTC = 100,000,000 satoshis) enables microtransactions at the satoshi level while maintaining the psychological significance of whole-BTC milestones. Ethereum's 18-decimal precision (1 ETH = 10^18 wei) serves different technical purposes — gas calculations require granular unit precision to properly price computational resources. Understanding why each network chose its denomination structure provides insight into the network's design philosophy and intended use cases."],
      scenarios: ["A developer is estimating the gas cost of a smart contract function. The function costs 50,000 gas units. Current gas price: 30 gwei. Calculation: 50,000 × 30 gwei = 1,500,000 gwei = 0.0015 ETH. At $3,000/ETH, this = $4.50 per call. For a DeFi protocol expecting 1,000 calls per day, this is $4,500 daily gas cost — a critical business viability metric that unit conversion makes immediately apparent.", "An investor is comparing the unit economics of two payment networks: Network A charges 0.001 BTC per transaction (1,000 sats). Network B charges 0.0001 ETH per transaction (100,000 gwei). At BTC = $50,000 and ETH = $3,000: Network A = $0.05 per tx. Network B = $0.30 per tx. Without unit conversion to common dollar terms, these fee structures appear incomparable — the conversion reveals Network A is 6x cheaper per transaction at current prices."],
      checklist: ["When presenting converted values, always include: (1) the source value and unit, (2) the conversion rate used (with timestamp), (3) the converted value and target unit. This three-component format ensures the conversion is reproducible and verifiable, preventing confusion when rates change or when values are referenced later without context.", "For cross-chain comparisons, standardize on USD as the common unit with explicit conversion rates. When comparing fee structures across Ethereum, Solana, and Polygon, convert all fees to USD at current rates to enable apples-to-apples comparison. Include the underlying native token price as context for how conversion rates may change as token prices fluctuate."],
      mistakes: ["Conflating different token units when comparing 'amounts.' Saying '1 ETH worth of tokens' means dramatically different things depending on whether you're discussing WETH, ETH2, stETH, or rETH — all of which may have slightly different values. Similarly, '1 BTC' on different chains (WBTC on Ethereum, BTC on Bitcoin, renBTC on various chains) may have fractional price discrepancies due to minting/redemption dynamics. Always specify the exact token contract when precision matters.", "Using stale conversion rates for financial calculations. In a market that moves 5%–10% daily, a rate from even 4 hours ago can be meaningfully inaccurate. For tax calculations, always use the market price at the exact transaction timestamp. For investment decisions, use real-time rates from reliable oracles. Never use memory or approximation for conversion rates in any financial context."],
      benchmarks: ["Common unit conversion reference points worth memorizing: 1 BTC = 100,000,000 satoshis; 1 ETH = 10^9 gwei = 10^18 wei; 1 SOL = 10^9 lamports; 1 DOT = 10^10 plancks. These base relationships enable rapid mental estimates without calculator dependency — useful for quick sanity checks during time-sensitive trading decisions.", "Practical fee benchmarks by transaction type: simple token transfer on ETH mainnet ≈ 21,000 gas; ERC-20 approval ≈ 45,000 gas; DEX swap ≈ 100,000–200,000 gas; complex DeFi interaction ≈ 300,000–500,000 gas. Multiplying these by current gwei prices gives immediate cost estimates for any contemplated on-chain action."],
      execution: ["Integrate unit conversion tools into your regular workflow. Bookmark reliable conversion utilities (CoinGecko's conversion tool, blockchain explorers with unit calculators) and reference them before every on-chain interaction involving unfamiliar denominations. The time investment in accurate pre-trade conversion calculation is trivially small compared to the cost of errors from denomination confusion.", "For DeFi development, implement unit tests that verify all conversion calculations across the full range of expected inputs, including edge cases near minimum and maximum values, and inputs with maximum decimal precision. Smart contract bugs arising from integer overflow or precision loss in unit conversions have caused millions in losses — rigorous unit testing prevents these vulnerabilities."],
      hygiene: ["When recording crypto transactions for tax or accounting purposes, always document both the original native token amount and the USD equivalent at time of transaction. This dual-denomination record eliminates ambiguity when preparing tax filings months later, when native token prices may have changed substantially from transaction-time values.", "Update your mental models for 'standard' unit values quarterly. As crypto adoption grows and network upgrades change fee economics, what constituted a 'normal' gas price in 2021 (50–100 gwei) may be dramatically different from the normal in 2024 (10–20 gwei). Recalibrating your intuitive reference points prevents systematic overestimation or underestimation of network costs."],
      validation: ["Verify unit conversions for large-value transactions using two independent sources before executing. A conversion error of one decimal place changes the transaction value by 10x — catastrophic for transfers above a few thousand dollars. Cross-reference your calculated amount in the sending application with the preview shown by the receiving protocol to catch any input errors before confirming.", "For protocol integrations involving unit conversions, validate that your conversion logic handles all token decimal configurations correctly. Not all ERC-20 tokens use 18 decimals — USDC uses 6 decimals, WBTC uses 8, and some tokens use non-standard decimals that break generic conversion logic. Test against tokens with 6, 8, and 18 decimal places before deploying any conversion-dependent code to production."]
    },
    es: { interpret: ["Las conversiones de unidades de criptomonedas revelan la escala subyacente de los sistemas blockchain y ayudan a contextualizar las transferencias de valor entre denominaciones drásticamente diferentes.", "Las diferencias de denominación crean una confusión persistente para los nuevos participantes en cripto."], scenarios: ["Un desarrollador está estimando el costo de gas de una función de contrato inteligente. La función cuesta 50,000 unidades de gas.", "Un inversor está comparando la economía de unidades de dos redes de pago."], checklist: ["Al presentar valores convertidos, incluye siempre: (1) el valor fuente y la unidad, (2) la tasa de conversión utilizada (con marca de tiempo), (3) el valor convertido y la unidad destino.", "Para comparaciones entre cadenas, estandariza en USD como la unidad común con tasas de conversión explícitas."], mistakes: ["Confundir diferentes unidades de token al comparar 'cantidades'.", "Usar tasas de conversión obsoletas para cálculos financieros."], benchmarks: ["Puntos de referencia de conversión de unidades comunes que vale la pena memorizar.", "Puntos de referencia prácticos de comisiones por tipo de transacción."], execution: ["Integra herramientas de conversión de unidades en tu flujo de trabajo regular.", "Para el desarrollo DeFi, implementa pruebas unitarias que verifiquen todos los cálculos de conversión."], hygiene: ["Al registrar transacciones cripto para fines fiscales o contables, documenta siempre tanto el monto nativo del token original como el equivalente en USD en el momento de la transacción.", "Actualiza tus modelos mentales para los valores de unidades 'estándar' trimestralmente."], validation: ["Verifica las conversiones de unidades para transacciones de alto valor usando dos fuentes independientes antes de ejecutar.", "Para integraciones de protocolo que involucren conversiones de unidades, valida que tu lógica de conversión maneje correctamente todas las configuraciones decimales de tokens."] },
    pt: { interpret: ["As conversões de unidades de criptomoedas revelam a escala subjacente dos sistemas blockchain e ajudam a contextualizar transferências de valor entre denominações drasticamente diferentes.", "As diferenças de denominação criam confusão persistente para novos participantes de cripto."], scenarios: ["Um desenvolvedor está estimando o custo de gas de uma função de contrato inteligente. A função custa 50.000 unidades de gas.", "Um investidor está comparando a economia de unidades de duas redes de pagamento."], checklist: ["Ao apresentar valores convertidos, sempre inclua: (1) o valor fonte e unidade, (2) a taxa de conversão usada (com timestamp), (3) o valor convertido e unidade alvo.", "Para comparações entre cadeias, padronize em USD como a unidade comum com taxas de conversão explícitas."], mistakes: ["Confundir diferentes unidades de token ao comparar 'quantidades'.", "Usar taxas de conversão obsoletas para cálculos financeiros."], benchmarks: ["Pontos de referência de conversão de unidades comuns que vale a pena memorizar.", "Benchmarks práticos de taxas por tipo de transação."], execution: ["Integre ferramentas de conversão de unidades em seu fluxo de trabalho regular.", "Para desenvolvimento DeFi, implemente testes unitários que verifiquem todos os cálculos de conversão."], hygiene: ["Ao registrar transações de cripto para fins fiscais ou contábeis, sempre documente tanto o valor nativo do token original quanto o equivalente em USD no momento da transação.", "Atualize seus modelos mentais para valores de unidades 'padrão' trimestralmente."], validation: ["Verifique as conversões de unidades para transações de alto valor usando duas fontes independentes antes de executar.", "Para integrações de protocolo envolvendo conversões de unidades, valide que sua lógica de conversão lida corretamente com todas as configurações decimais de tokens."] },
    tr: { interpret: ["Kripto para birimi birim dönüşümleri, blockchain sistemlerinin temel ölçeğini ortaya koyar ve çarpıcı biçimde farklı birimler arasındaki değer transferlerini bağlamlandırmaya yardımcı olur.", "Birim farklılıkları, kripto alanına yeni katılanlar için kalıcı bir kafa karışıklığı yaratır."], scenarios: ["Bir geliştirici, bir akıllı sözleşme işlevinin gas maliyetini tahmin ediyor. Fonksiyon 50.000 gas birimi harcıyor.", "Bir yatırımcı, iki ödeme ağının birim ekonomilerini karşılaştırıyor."], checklist: ["Dönüştürülmüş değerleri sunarken her zaman şunları ekleyin: (1) kaynak değer ve birimi, (2) kullanılan dönüşüm oranı (zaman damgasıyla), (3) dönüştürülmüş değer ve hedef birimi.", "Zincirler arası karşılaştırmalar için açık dönüşüm oranlarıyla USD'yi ortak birim olarak standartlaştırın."], mistakes: ["'Miktarları' karşılaştırırken farklı token birimlerini karıştırmak.", "Finansal hesaplamalar için güncel olmayan dönüşüm oranları kullanmak."], benchmarks: ["Ezberlemek için değerli yaygın birim dönüşümü referans noktaları.", "İşlem türüne göre pratik ücret kıyaslamaları."], execution: ["Birim dönüşüm araçlarını düzenli iş akışınıza entegre edin.", "DeFi geliştirmesi için tüm dönüşüm hesaplamalarını doğrulayan birim testleri uygulayın."], hygiene: ["Vergi veya muhasebe amaçlı kripto işlemlerini kaydederken her zaman hem orijinal yerel token miktarını hem de işlem anındaki USD karşılığını belgeleyin.", "Üç ayda bir 'standart' birim değerleri için zihinsel modellerinizi güncelleyin."], validation: ["Yüksek değerli işlemler için birim dönüşümlerini yürütmeden önce iki bağımsız kaynakla doğrulayın.", "Birim dönüşümleri içeren protokol entegrasyonları için dönüşüm mantığınızın tüm token ondalık yapılandırmalarını doğru şekilde işlediğini doğrulayın."] },
    hi: { interpret: ["क्रिप्टोकरेंसी यूनिट रूपांतरण ब्लॉकचेन सिस्टम के अंतर्निहित पैमाने को प्रकट करते हैं और नाटकीय रूप से अलग-अलग मूल्यवर्ग में मूल्य हस्तांतरण को संदर्भित करने में मदद करते हैं।", "मूल्यवर्ग के अंतर नए क्रिप्टो प्रतिभागियों के लिए लगातार भ्रम पैदा करते हैं।"], scenarios: ["एक डेवलपर एक स्मार्ट कॉन्ट्रैक्ट फ़ंक्शन की गैस लागत का अनुमान लगा रहा है।", "एक निवेशक दो भुगतान नेटवर्क की इकाई अर्थशास्त्र की तुलना कर रहा है।"], checklist: ["परिवर्तित मूल्य प्रस्तुत करते समय हमेशा शामिल करें: (1) स्रोत मूल्य और इकाई, (2) उपयोग की गई रूपांतरण दर (टाइमस्टैम्प के साथ), (3) परिवर्तित मूल्य और लक्ष्य इकाई।", "क्रॉस-चेन तुलनाओं के लिए, स्पष्ट रूपांतरण दरों के साथ USD को सामान्य इकाई के रूप में मानकीकृत करें।"], mistakes: ["'मात्राओं' की तुलना करते समय विभिन्न टोकन इकाइयों को भ्रमित करना।", "वित्तीय गणनाओं के लिए पुरानी रूपांतरण दरों का उपयोग करना।"], benchmarks: ["सामान्य यूनिट रूपांतरण संदर्भ बिंदु जो याद करने योग्य हैं।", "लेनदेन प्रकार के आधार पर व्यावहारिक शुल्क बेंचमार्क।"], execution: ["यूनिट रूपांतरण टूल को अपने नियमित वर्कफ़्लो में एकीकृत करें।", "DeFi विकास के लिए, ऐसे यूनिट टेस्ट लागू करें जो सभी रूपांतरण गणनाओं को सत्यापित करें।"], hygiene: ["कर या लेखांकन उद्देश्यों के लिए क्रिप्टो लेनदेन रिकॉर्ड करते समय, हमेशा मूल नेटिव टोकन राशि और लेनदेन के समय USD समकक्ष दोनों को दस्तावेज़ करें।", "त्रैमासिक रूप से 'मानक' इकाई मूल्यों के लिए अपने मानसिक मॉडल को अपडेट करें।"], validation: ["निष्पादन से पहले दो स्वतंत्र स्रोतों का उपयोग करके उच्च-मूल्य लेनदेन के लिए यूनिट रूपांतरण सत्यापित करें।", "यूनिट रूपांतरण शामिल करने वाले प्रोटोकॉल एकीकरण के लिए, सत्यापित करें कि आपका रूपांतरण तर्क सभी टोकन दशमलव कॉन्फ़िगरेशन को सही ढंग से संभालता है।"] },
    ru: { interpret: ["Конвертация единиц криптовалют раскрывает базовый масштаб блокчейн-систем и помогает контекстуализировать передачу ценности между кардинально разными деноминациями.", "Различия в деноминациях создают постоянную путаницу у новых участников крипторынка."], scenarios: ["Разработчик оценивает стоимость газа для функции смарт-контракта. Функция потребляет 50 000 единиц газа.", "Инвестор сравнивает экономику единиц двух платёжных сетей."], checklist: ["При представлении конвертированных значений всегда указывайте: (1) исходное значение и единицу, (2) использованный курс конвертации (с временной меткой), (3) конвертированное значение и целевую единицу.", "Для межсетевых сравнений стандартизируйте на USD как общую единицу с явными курсами конвертации."], mistakes: ["Смешение различных единиц токенов при сравнении «количеств».", "Использование устаревших курсов конвертации для финансовых расчётов."], benchmarks: ["Общие ориентиры конвертации единиц, которые стоит запомнить.", "Практические ориентиры комиссий по типу транзакции."], execution: ["Интегрируйте инструменты конвертации единиц в свой обычный рабочий процесс.", "Для разработки DeFi реализуйте юнит-тесты, проверяющие все расчёты конвертации."], hygiene: ["При записи крипто-транзакций для налоговых или бухгалтерских целей всегда документируйте как исходную сумму в нативном токене, так и эквивалент в USD на момент транзакции.", "Ежеквартально обновляйте ментальные модели «стандартных» значений единиц."], validation: ["Для транзакций с высокой стоимостью проверяйте конвертацию единиц с помощью двух независимых источников перед выполнением.", "Для интеграций протоколов, включающих конвертацию единиц, убедитесь, что ваша логика конвертации корректно обрабатывает все конфигурации десятичных знаков токенов."] }
  },
};
