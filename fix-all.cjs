const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  let changedCount = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      changedCount += processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      
      let offset = 0;
      while (true) {
        let start = content.indexOf('<input', offset);
        if (start === -1) break;
        
        let innerEnd = content.indexOf('>', start);
        if (innerEnd !== -1) {
            let chunk = content.slice(start, innerEnd + 1);
            if ((chunk.includes('type="number"') || chunk.includes("type='number'") || chunk.includes('inputMode="decimal"') || chunk.includes("inputMode='decimal'")) && !chunk.includes('onFocus=')) {
                // Determine if it ends with /> or >
                if (chunk.endsWith('/>')) {
                    content = content.slice(0, innerEnd - 1) + ' onFocus={(e) => e.target.select()} />' + content.slice(innerEnd + 1);
                    offset = innerEnd + 35;
                } else {
                    content = content.slice(0, innerEnd) + ' onFocus={(e) => e.target.select()}>' + content.slice(innerEnd + 1);
                    offset = innerEnd + 35;
                }
            } else {
                offset = innerEnd + 1;
            }
        } else {
            offset = start + 6;
        }
      }
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
        changedCount++;
      }
    }
  }
  return changedCount;
}

const total = processDir(path.join(__dirname, 'src/components'));
console.log(`Total files updated: ${total}`);
