const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) getFiles(fullPath, files);
        else if (fullPath.endsWith('.tsx')) files.push(fullPath);
    }
    return files;
}

const files = getFiles('src/components');
const texts = new Set();

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');

    // Extract text nodes between JSX tags
    const matches = content.match(/>([^<{}]+)</g);
    if (matches) {
        matches.forEach(m => {
            let text = m.slice(1, -1).trim();
            // filtering out pure numbers and pure symbols
            if (text && text.length > 2 && !text.match(/^[0-9.,%$+-]+$/)) {
                texts.add(text);
            }
        });
    }

    // Extract placeholders
    const placeholders = content.match(/placeholder=\"([^\"]+)\"/g);
    if (placeholders) {
        placeholders.forEach(p => {
            const match = p.match(/placeholder=\"([^\"]+)\"/);
            if (match && match[1]) {
                const text = match[1].trim();
                if (text && text.length > 2 && !text.match(/^[0-9.,%$+-]+$/)) {
                    texts.add(text);
                }
            }
        });
    }
});

console.log('Total unique strings before filtering:', texts.size);
fs.writeFileSync('extracted-strings.txt', Array.from(texts).sort().join('\n'));
