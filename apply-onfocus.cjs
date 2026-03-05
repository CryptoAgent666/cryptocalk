const fs = require('fs');
const path = require('path');

function applyOnFocus(dir) {
    let changedCount = 0;
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            changedCount += applyOnFocus(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;

            let offset = 0;
            while (true) {
                let start = content.indexOf('<input', offset);
                if (start === -1) break;

                let innerEnd = content.indexOf('/>', start);
                if (innerEnd !== -1) {
                    let chunk = content.slice(start, innerEnd);

                    // Also need to make sure we don't accidentally match a '/>' from a completely different tag 
                    // if this <input> was actually NOT self-closing (e.g. <input></input>).
                    // But React strictly enforces <input />.

                    // Check if there's another '<' between `<input` and `/>` just to be safe it's the same tag
                    // Wait, `<` can be in arrow functions: `value < 0 ? ...` inside JSX bindings.
                    // So we can't strictly assert no `<`.

                    if ((chunk.includes('type="number"') || chunk.includes("type='number'") || chunk.includes('inputMode="decimal"') || chunk.includes("inputMode='decimal'")) && !chunk.includes('onFocus=')) {
                        content = content.slice(0, innerEnd) + ' onFocus={(e) => e.target.select()} ' + content.slice(innerEnd);
                        offset = innerEnd + 35; // skip the new text
                    } else {
                        offset = innerEnd + 2;
                    }
                } else {
                    // maybe it ends with </input>? Very rare in React, but let's skip
                    offset = start + 6;
                }
            }

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`Added onFocus to: ${fullPath}`);
                changedCount++;
            }
        }
    }
    return changedCount;
}

const totalUpdated = applyOnFocus(path.join(__dirname, 'src/components'));
console.log(`Total files updated: ${totalUpdated}`);
