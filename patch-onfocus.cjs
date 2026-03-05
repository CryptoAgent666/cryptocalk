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
      
      content = content.replace(/<input\b([^>]*)>/g, (match, attrs) => {
        if (attrs.includes('type="number"') || attrs.includes('inputMode="decimal"')) {
          if (!attrs.includes('onFocus=')) {
            let inner = attrs.trimEnd();
            if (inner.endsWith('/')) {
              inner = inner.slice(0, -1);
              return `<input ${inner} onFocus={(e) => e.target.select()} />`;
            } else {
              return `<input ${inner} onFocus={(e) => e.target.select()}>`;
            }
          }
        }
        return match;
      });
      
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
