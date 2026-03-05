const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  let missingCount = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      missingCount += checkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let offset = 0;
      while (true) {
        let start = content.indexOf('<input', offset);
        if (start === -1) break;
        
        let innerEnd = content.indexOf('>', start);
        if (innerEnd !== -1) {
            let chunk = content.slice(start, innerEnd + 1);
            if ((chunk.includes('type="number"') || chunk.includes("type='number'") || chunk.includes('inputMode="decimal"') || chunk.includes("inputMode='decimal'")) && !chunk.includes('onFocus=')) {
                console.warn(`Missing onFocus in ${fullPath}`);
                missingCount++;
            }
            offset = innerEnd + 1;
        } else {
            offset = start + 6;
        }
      }
    }
  }
  return missingCount;
}

const totalMissing = checkDir(path.join(__dirname, 'src/components'));
console.log(`Total missing: ${totalMissing}`);
