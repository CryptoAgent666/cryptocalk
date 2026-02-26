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

// Some origins are configured to serve custom errors from /404 (not /404.html).
// Keep both paths in sync so branded 404 renders in either case.
const errorPageSource = path.join(DIST_DIR, '404.html');
if (fs.existsSync(errorPageSource)) {
  const errorPageDir = path.join(DIST_DIR, '404');
  fs.mkdirSync(errorPageDir, { recursive: true });

  const errorPageTarget = path.join(errorPageDir, 'index.html');
  fs.copyFileSync(errorPageSource, errorPageTarget);
  console.log('[postbuild] copied 404.html -> dist/404/index.html');
}
