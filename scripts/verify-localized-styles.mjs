import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const EN_PAGES_DIR = path.join(ROOT, 'src', 'pages');
const LOCALIZED_PAGES_DIR = path.join(ROOT, 'src', 'pages', '[lang]');
const LANGS = ['es', 'pt', 'tr', 'hi', 'ru'];
const STYLE_BLOCK_RE = /<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g;

function extractStyleBlocks(source) {
  return Array.from(source.matchAll(STYLE_BLOCK_RE))
    .map((match) => match[1]?.trim() ?? '')
    .filter(Boolean);
}

function getFirstSelector(cssText) {
  const root = postcss.parse(cssText);
  let selector = null;

  root.walkRules((rule) => {
    if (selector) return;
    const parent = rule.parent;
    if (parent?.type === 'atrule' && /keyframes$/i.test(parent.name)) return;

    const selectors = postcss.list
      .comma(rule.selector)
      .map((entry) => entry.trim())
      .filter(Boolean);

    if (selectors.length > 0) {
      selector = selectors[0];
    }
  });

  return selector;
}

function readLocalizedSlugs() {
  return fs
    .readdirSync(LOCALIZED_PAGES_DIR)
    .filter((name) => name.endsWith('.astro'))
    .filter((name) => name !== 'index.astro' && name !== '[policy].astro')
    .filter((name) => !name.startsWith('['))
    .map((name) => name.replace(/\.astro$/, ''))
    .sort();
}

function verify() {
  const slugs = readLocalizedSlugs();
  const failures = [];
  let checked = 0;

  for (const slug of slugs) {
    const enSourcePath = path.join(EN_PAGES_DIR, `${slug}.astro`);
    if (!fs.existsSync(enSourcePath)) {
      failures.push({
        scope: slug,
        message: `Missing EN source page: ${path.relative(ROOT, enSourcePath)}`,
      });
      continue;
    }

    const enSource = fs.readFileSync(enSourcePath, 'utf-8');
    const styleBlocks = extractStyleBlocks(enSource);
    if (styleBlocks.length === 0) {
      failures.push({
        scope: slug,
        message: `No <style> blocks found in ${path.relative(ROOT, enSourcePath)}`,
      });
      continue;
    }

    const expectedMarkers = styleBlocks
      .map((block, index) => {
        try {
          const firstSelector = getFirstSelector(block);
          if (!firstSelector) return null;
          const scope = `.calc-scope[data-slug="${slug}"]`;
          return { marker: `${scope} ${firstSelector}`, blockIndex: index + 1 };
        } catch (error) {
          return {
            marker: null,
            blockIndex: index + 1,
            parseError: error instanceof Error ? error.message : String(error),
          };
        }
      });

    for (const lang of LANGS) {
      const htmlPath = path.join(DIST_DIR, lang, slug, 'index.html');
      const urlPath = `/${lang}/${slug}`;

      if (!fs.existsSync(htmlPath)) {
        failures.push({
          scope: urlPath,
          message: `Missing built page: ${path.relative(ROOT, htmlPath)}`,
        });
        continue;
      }

      const html = fs.readFileSync(htmlPath, 'utf-8');

      for (const entry of expectedMarkers) {
        if (!entry) continue;
        if (entry.parseError) {
          failures.push({
            scope: urlPath,
            message: `Style block #${entry.blockIndex} parse error in ${slug}: ${entry.parseError}`,
          });
          continue;
        }

        if (!html.includes(entry.marker)) {
          failures.push({
            scope: urlPath,
            message: `Missing scoped marker from style block #${entry.blockIndex}: ${entry.marker}`,
          });
        }
      }

      checked += 1;
    }
  }

  if (failures.length > 0) {
    console.error(`\n[verify-localized-styles] FAILED`);
    console.error(`Checked pages: ${checked}`);
    console.error(`Failures: ${failures.length}\n`);
    for (const failure of failures) {
      console.error(`- ${failure.scope}: ${failure.message}`);
    }
    process.exit(1);
  }

  console.log(
    `[verify-localized-styles] PASS — checked ${checked} localized calculator pages across ${LANGS.length} languages`
  );
}

verify();
