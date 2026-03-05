const fs = require('fs');
const path = require('path');

function fixDir(dir) {
    const files = fs.readdirSync(dir);
    let changedCount = 0;
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            changedCount += fixDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            const original = content;

            // Fix broken onChange and other handlers
            // The broken pattern is: [EventHandler]={(e) = onFocus={(e) => e.target.select()}>
            content = content.replace(/=\{\(e\) = onFocus=\{\(e\) => e\.target\.select\(\)\}>/g, '={(e) =>');
            content = content.replace(/=\{\(\) = onFocus=\{\(e\) => e\.target\.select\(\)\}>/g, '={() =>');
            content = content.replace(/=\{\(val\) = onFocus=\{\(e\) => e\.target\.select\(\)\}>/g, '={(val) =>');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed: ${fullPath}`);
                changedCount++;
            }
        }
    }
    return changedCount;
}

const totalFixed = fixDir(path.join(__dirname, 'src/components'));
console.log(`Total files fixed: ${totalFixed}`);
