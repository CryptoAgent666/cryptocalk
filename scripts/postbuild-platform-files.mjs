import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const PLATFORM_FILES = ['_redirects', '_headers'];

for (const filename of PLATFORM_FILES) {
  const from = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(from)) continue;

  const to = path.join(DIST_DIR, filename);
  fs.copyFileSync(from, to);
  console.log(`[postbuild] copied ${filename} -> dist/${filename}`);
}
