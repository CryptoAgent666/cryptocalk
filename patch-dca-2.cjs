const fs = require("fs");
const file = "/Users/konstantin/.gemini/antigravity/scratch/CRYPTOCALK/src/i18n/ui-strings.ts";
let content = fs.readFileSync(file, "utf8");

const strings = {
    "✅ DCA outperformed lump sum in this period": { es: "✅ El DCA superó al pago único en este período", pt: "✅ DCA superou o valor fixo neste período", tr: "✅ DCA bu dönemde toplu yatırımdan daha iyi performans gösterdi", hi: "✅ इस अवधि में DCA ने एकमुश्त राशि को पीछे छोड़ दिया", ru: "✅ DCA превзошла единовременную покупку в этот период" },
    "📈 Lump sum outperformed DCA in this period (common in bull markets)": { es: "📈 El pago único superó al DCA en este período (común en mercados alcistas)", pt: "📈 Valor fixo superou DCA neste período (comum em mercados em alta)", tr: "📈 Toplu yatırım bu dönemde DCA'dan daha iyi performans gösterdi (boğa piyasalarında yaygındır)", hi: "📈 इस अवधि में एकमुश्त राशि ने DCA को पीछे छोड़ दिया (तेज बाजारों में आम है)", ru: "📈 Единовременная покупка превзошла DCA в этот период (часто бывает на бычьих рынках)" },
};

["es", "pt", "tr", "hi", "ru"].forEach(lang => {
    let langStr = "";
    for (const [enKey, translations] of Object.entries(strings)) {
        const val = translations[lang].replace(/'/g, "\\'");
        langStr += `        '${enKey}': '${val}',\n`;
    }
    const regex = new RegExp(`(${lang}: \\{)`, "g");
    content = content.replace(regex, `$1\n${langStr}`);
});
fs.writeFileSync(file, content);
console.log("Updated translation file 2");
