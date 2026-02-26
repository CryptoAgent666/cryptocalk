import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const PLATFORM_FILES = ['_redirects', '_headers'];
const DIST_COPY_FILES = [{ from: 'sitemap-index.xml', to: 'sitemap.xml' }];

for (const filename of PLATFORM_FILES) {
  const from = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(from)) continue;

  const to = path.join(DIST_DIR, filename);
  fs.copyFileSync(from, to);
  console.log(`[postbuild] copied ${filename} -> dist/${filename}`);
}

for (const { from, to } of DIST_COPY_FILES) {
  const sourcePath = path.join(DIST_DIR, from);
  if (!fs.existsSync(sourcePath)) continue;

  const destinationPath = path.join(DIST_DIR, to);
  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`[postbuild] copied ${from} -> dist/${to}`);
}
