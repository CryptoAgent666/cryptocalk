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

      content = content.split('onChange={(e) = onFocus={(e) => e.target.select()}>').join('onChange={(e) =>');
      content = content.split('onChange={() = onFocus={(e) => e.target.select()}>').join('onChange={() =>');
      content = content.split('onChange={(val) = onFocus={(e) => e.target.select()}>').join('onChange={(val) =>');

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed corruption: ${fullPath}`);
        changedCount++;
      }
    }
  }
  return changedCount;
}

const total = processDir(path.join(__dirname, 'src/components'));
console.log(`Total files repaired: ${total}`);
