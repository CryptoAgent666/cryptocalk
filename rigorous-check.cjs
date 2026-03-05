const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  let missingFiles = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      missingFiles.push(...checkDir(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let inInput = false;
      let inputAttrs = '';
      for (let i = 0; i < content.length; i++) {
          if (!inInput && content.substring(i, i + 6) === '<input') {
              inInput = true;
              inputAttrs = '';
              i += 5;
          } else if (inInput) {
              if (content[i] === '>' && content.substring(i - 1, i + 1) !== '=>') {
                  // End of input tag
                  if ((inputAttrs.includes('type="number"') || inputAttrs.includes('inputMode="decimal"')) && !inputAttrs.includes('onFocus=')) {
                      missingFiles.push(path.basename(fullPath));
                  }
                  inInput = false;
              } else {
                  inputAttrs += content[i];
              }
          }
      }
    }
  }
  return missingFiles;
}

const missing = checkDir(path.join(__dirname, 'src/components'));
if (missing.length > 0) {
    console.log(`Missing onFocus in:\n${[...new Set(missing)].join('\n')}`);
} else {
    console.log('All number inputs correctly have onFocus!');
}
