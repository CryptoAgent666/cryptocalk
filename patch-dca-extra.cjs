const fs = require("fs");
const file = "/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/src/i18n/ui-strings.ts";
let content = fs.readFileSync(file, "utf8");

const strings = {
    "BTC Monthly": { es: "BTC Mensual", pt: "BTC Mensal", tr: "BTC Aylık", hi: "BTC मासिक", ru: "BTC Ежемесячно" },
    "ETH Weekly": { es: "ETH Semanal", pt: "ETH Semanal", tr: "ETH Haftalık", hi: "ETH साप्ताहिक", ru: "ETH Еженедельно" },
    "SOL Bi-weekly": { es: "SOL Quincenal", pt: "SOL Quinzenal", tr: "SOL İki Haftada Bir", hi: "SOL द्विसाप्ताहिक", ru: "SOL Раз в две недели" },
    "Calculating...": { es: "Calculando...", pt: "Calculando...", tr: "Hesaplanıyor...", hi: "गणना हो रही है...", ru: "Расчет..." },
    "Historical simulation only. Past performance does not guarantee future results. Data from CoinGecko.": {
        es: "Solo simulación histórica. El rendimiento pasado no garantiza resultados futuros. Datos de CoinGecko.",
        pt: "Apenas simulação histórica. O desempenho passado não garante resultados futuros. Dados da CoinGecko.",
        tr: "Sadece tarihsel simülasyon. Geçmiş performans gelecekteki sonuçları garanti etmez. Veriler CoinGecko'dan.",
        hi: "केवल ऐतिहासिक सिमुलेशन। पिछला प्रदर्शन भविष्य के परिणामों की गारंटी नहीं देता है। CoinGecko से डेटा।",
        ru: "Только историческая симуляция. Прошлые результаты не гарантируют будущих. Данные от CoinGecko."
    }
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
console.log("Injected extra strings.");
