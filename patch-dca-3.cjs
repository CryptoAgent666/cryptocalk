const fs = require("fs");
const file = "/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/src/i18n/ui-strings.ts";
let content = fs.readFileSync(file, "utf8");

const strings = {
    "Quick Scenarios": { es: "Escenarios Rápidos", pt: "Cenários Rápidos", tr: "Hızlı Senaryolar", hi: "त्वरित परिदृश्य", ru: "Быстрые сценарии" },
    "CRYPTOCURRENCY": { es: "CRIPTOMONEDA", pt: "CRIPTOMOEDA", tr: "KRİPTOPARA", hi: "क्रिप्टोकरेंसी", ru: "КРИПТОВАЛЮТА" },
    "Search cryptocurrency...": { es: "Buscar criptomoneda...", pt: "Pesquisar criptomoeda...", tr: "Kripto para ara...", hi: "क्रिप्टोकरेंसी खोजें...", ru: "Поиск криптовалюты..." },
    "No results": { es: "Sin resultados", pt: "Sem resultados", tr: "Sonuç yok", hi: "कोई परिणाम नहीं", ru: "Нет результатов" },
    "START DATE": { es: "FECHA DE INICIO", pt: "DATA DE INÍCIO", tr: "BAŞLANGIÇ TARİHİ", hi: "आरंभ तिथि", ru: "ДАТА НАЧАЛА" },
    "Y ago": { es: "A atrás", pt: "A atrás", tr: "Yıl önce", hi: "साल पहले", ru: "Г назад" },
    "FREQUENCY": { es: "FRECUENCIA", pt: "FREQUÊNCIA", tr: "SIKLIK", hi: "आवृत्ति", ru: "ЧАСТОТА" },
    "AMOUNT PER PURCHASE": { es: "MONTO POR COMPRA", pt: "VALOR POR COMPRA", tr: "SATIN ALMA BAŞINA MİKTAR", hi: "प्रति खरीद राशि", ru: "СУММА ПОКУПКИ" },
    "Calculate DCA Returns": { es: "Calcular Retornos DCA", pt: "Calcular Retornos DCA", tr: "DCA Getirilerini Hesapla", hi: "DCA रिटर्न की गणना करें", ru: "Рассчитать доходность DCA" },
    "Reset": { es: "Reiniciar", pt: "Redefinir", tr: "Sıfırla", hi: "रीसेट", ru: "Сброс" },
    "Pick coin, date, and amount presets, then tap Calculate DCA Returns.": { es: "Elige moneda, fecha y monto, luego toca Calcular.", pt: "Escolha moeda, data e valor, depois toque em Calcular.", tr: "Para, tarih ve miktar seçin, ardından Hesapla'ya dokunun.", hi: "सिक्का, तिथि और राशि चुनें, फिर गणना करें पर टैप करें।", ru: "Выберите монету, дату и сумму, затем нажмите Рассчитать." },
    "Portfolio Value": { es: "Valor del Portafolio", pt: "Valor do Portfólio", tr: "Portföy Değeri", hi: "पोर्टफोलियो मूल्य", ru: "Стоимость портфеля" },
    "Accumulation Zone": { es: "Zona de Acumulación", pt: "Zona de Acumulação", tr: "Birikim Bölgesi", hi: "संचय क्षेत्र", ru: "Зона накопления" },
    "FOMO Zone": { es: "Zona FOMO", pt: "Zona FOMO", tr: "FOMO Bölgesi", hi: "FOMO क्षेत्र", ru: "Зона FOMO" },
    "Profit / Loss": { es: "Ganancias / Pérdidas", pt: "Lucros / Perdas", tr: "Kar / Zarar", hi: "लाभ / हानि", ru: "Прибыль / Убыток" },
    "Average Buy Price": { es: "Precio Promedio de Compra", pt: "Preço Médio de Compra", tr: "Ortalama Alım Fiyatı", hi: "औसत खरीद मूल्य", ru: "Средняя цена покупки" },
    "Number of Purchases": { es: "Número de Compras", pt: "Número de Compras", tr: "Satın Alma Sayısı", hi: "खरीद की संख्या", ru: "Количество покупок" },
    "DCA vs Lump Sum": { es: "DCA vs Pago Único", pt: "DCA vs Pagamento Único", tr: "DCA vs Toplu Ödeme", hi: "DCA बनाम एकमुश्त", ru: "DCA против Единовременной суммы" },
    "DCA Strategy": { es: "Estrategia DCA", pt: "Estratégia DCA", tr: "DCA Stratejisi", hi: "DCA रणनीति", ru: "Стратегия DCA" },
    "Lump Sum": { es: "Pago Único", pt: "Pagamento Único", tr: "Toplu Ödeme", hi: "एकमुश्त", ru: "Единовременная сумма" },
    "✅ DCA outperformed lump sum in this period": { es: "✅ El DCA superó al pago único en este período", pt: "✅ DCA superou o valor fixo neste período", tr: "✅ DCA bu dönemde toplu yatırımdan daha iyi performans gösterdi", hi: "✅ इस अवधि में DCA ने एकमुश्त राशि को पीछे छोड़ दिया", ru: "✅ DCA превзошла единовременную покупку в этот период" },
    "📈 Lump sum outperformed DCA in this period (common in bull markets)": { es: "📈 El pago único superó al DCA en este período (común en mercados alcistas)", pt: "📈 Valor fixo superou DCA neste período (comum em mercados em alta)", tr: "📈 Toplu yatırım bu dönemde DCA'dan daha iyi performans gösterdi (boğa piyasalarında yaygındır)", hi: "📈 इस अवधि में एकमुश्त राशि ने DCA को पीछे छोड़ दिया (तेज बाजारों में आम है)", ru: "📈 Единовременная покупка превзошла DCA в этот период (часто бывает на бычьих рынках)" },
    "Set Up Automatic DCA on Coinbase →": { es: "Configurar DCA Automático en Coinbase →", pt: "Configurar DCA Automático na Coinbase →", tr: "Coinbase'de Otomatik DCA Ayarla →", hi: "Coinbase पर स्वचालित DCA सेट करें →", ru: "Настроить автоматический DCA на Coinbase →" },
    "Simulate DCA Strategy": { es: "Simular Estrategia DCA", pt: "Simular Estratégia DCA", tr: "DCA Stratejisini Simüle Et", hi: "DCA रणनीति का अनुकरण करें", ru: "Симулировать стратегию DCA" },
    "Select a cryptocurrency, choose your timeframe, and see how dollar-cost averaging would have performed.": { es: "Selecciona una criptomoneda, elige tu marco de tiempo y mira cómo habría funcionado el DCA.", pt: "Selecione uma criptomoeda, escolha seu período e veja como o DCA teria se saído.", tr: "Bir kripto para seçin, zaman diliminizi belirleyin ve DCA'nın nasıl performans göstereceğini görün.", hi: "एक क्रिप्टोकरेंसी चुनें, अपना समय सीमा चुनें, और देखें कि DCA ने कैसा प्रदर्शन किया होगा।", ru: "Выберите криптовалюту, укажите таймфрейм и посмотрите, как сработала бы стратегия DCA." },
    "Daily": { es: "Diario", pt: "Diário", tr: "Günlük", hi: "दैनिक", ru: "Ежедневно" },
    "Weekly": { es: "Semanal", pt: "Semanal", tr: "Haftalık", hi: "साप्ताहिक", ru: "Еженедельно" },
    "Bi-weekly": { es: "Quincenal", pt: "Quinzenal", tr: "İki Haftada Bir", hi: "द्विसाप्ताहिक", ru: "Раз в две недели" },
    "Monthly": { es: "Mensual", pt: "Mensal", tr: "Aylık", hi: "मासिक", ru: "Ежемесячно" },
    "Start date must be in the past": { es: "La fecha de inicio debe ser en el pasado", pt: "A data de início deve estar no passado", tr: "Başlangıç tarihi geçmişte olmalıdır", hi: "आरंभ तिथि अतीत में होनी चाहिए", ru: "Дата начала должна быть в прошлом" },
    "No price data available for this period": { es: "No hay datos de precios para este período", pt: "Sem dados de preços para este período", tr: "Bu dönem için fiyat verisi yok", hi: "इस अवधि के लिए conditional कोई मूल्य डेटा उपलब्ध नहीं है", ru: "Нет данных о ценах за этот период" },
    "Failed to calculate. Try again.": { es: "Error al calcular. Inténtalo de nuevo.", pt: "Falha ao calcular. Tente novamente.", tr: "Hesaplama başarısız. Tekrar deneyin.", hi: "गणना करने में विफल। पुनः प्रयास करें।", ru: "Ошибка расчета. Попробуйте еще раз." },
};

["es", "pt", "tr", "hi", "ru"].forEach(lang => {
    let langStr = "";
    for (const [enKey, translations] of Object.entries(strings)) {
        const val = translations[lang].replace(/'/g, "\\'");
        langStr += `        '${enKey}': '${val}',\n`;
    }

    content = content.replace(`\n    ${lang}: {\n`, `\n    ${lang}: {\n${langStr}`);
});

fs.writeFileSync(file, content);
console.log("Updated translation file accurately");
