const fs = require('fs');
const { translate } = require('@vitalets/google-translate-api');

async function main() {
    const keys = JSON.parse(fs.readFileSync('es-keys.json', 'utf-8'));
    const code = fs.readFileSync('src/i18n/ui-strings.ts', 'utf-8');
    
    const languages = [
        { code: 'pt', name: 'pt' },
        { code: 'tr', name: 'tr' },
        { code: 'hi', name: 'hi' },
        { code: 'ru', name: 'ru' }
    ];

    let newCode = code;

    for (const lang of languages) {
        console.log(`Processing ${lang.name}...`);
        
        // Find existing keys for this language
        const langRegex = new RegExp(`${lang.code}: \\{\\n([\\s\\S]*?)\\n    \\},`);
        const match = code.match(langRegex);
        
        let existingKeys = new Set();
        let currentLangContent = '';
        
        if (match) {
            currentLangContent = match[1];
            const lines = currentLangContent.split('\n');
            for (const line of lines) {
                const keyMatch = line.match(/^\s*'((?:\\'|[^'])*)':/);
                if (keyMatch) {
                    existingKeys.add(keyMatch[1]);
                }
            }
        }
        
        const missingKeys = keys.filter(k => !existingKeys.has(k));
        console.log(`Missing ${missingKeys.length} keys for ${lang.name}.`);
        
        if (missingKeys.length === 0) continue;
        
        let translatedLines = [];
        
        // Translate in chunks of 50 to avoid rate limits
        const chunkSize = 20;
        for (let i = 0; i < missingKeys.length; i += chunkSize) {
            const chunk = missingKeys.slice(i, i + chunkSize);
            console.log(`Translating chunk ${i / chunkSize + 1} / ${Math.ceil(missingKeys.length / chunkSize)} for ${lang.name}...`);
            
            try {
                // translate by joining with a special delimiter
                const textToTranslate = chunk.join(' |;| ');
                const res = await translate(textToTranslate, { to: lang.code });
                const translatedChunk = res.text.split(/ ?\|;\| ?/);
                
                for (let j = 0; j < chunk.length; j++) {
                    let translatedText = translatedChunk[j] || chunk[j];
                    // Fix quotes
                    translatedText = translatedText.replace(/'/g, "\\'");
                    const safeKey = chunk[j].replace(/'/g, "\\'");
                    translatedLines.push(`        '${safeKey}': '${translatedText}'`);
                }
                
                // sleep a bit to avoid rate limits
                await new Promise(r => setTimeout(r, 1000));
            } catch (err) {
                console.error(`Error translating chunk for ${lang.name}:`, err.message);
                // Fallback: use English
                for (let j = 0; j < chunk.length; j++) {
                    const safeKey = chunk[j].replace(/'/g, "\\'");
                    translatedLines.push(`        '${safeKey}': '${safeKey}'`);
                }
            }
        }
        
        // Append translated lines to existing content
        let updatedLangContent = currentLangContent;
        if (updatedLangContent && !updatedLangContent.endsWith(',')) {
            updatedLangContent += ',';
        }
        
        if (updatedLangContent) {
             updatedLangContent += '\n' + translatedLines.join(',\n');
        } else {
             updatedLangContent = translatedLines.join(',\n');
        }
        
        const replaceRegex = new RegExp(`${lang.code}: \\{\\n[\\s\\S]*?\\n    \\},`);
        newCode = newCode.replace(replaceRegex, `${lang.code}: {\n${updatedLangContent}\n    },`);
        
        fs.writeFileSync('src/i18n/ui-strings.ts', newCode);
        console.log(`Updated ${lang.name} in ui-strings.ts`);
    }
}

main().catch(console.error);
