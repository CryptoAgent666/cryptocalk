import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const UTILS_FILE = path.join(ROOT, 'src', 'i18n', 'utils.ts');
const REDIRECTS_FILE = path.join(DIST_DIR, '_redirects');
const SITE_ORIGIN = 'https://cryptocalk.com';
const TARGET_LANGS = new Set(['es', 'pt', 'tr', 'hi', 'ru']);

function normalizePathname(pathname) {
  const cleaned = pathname.trim();
  if (!cleaned) return '/';
  const withLeadingSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  const collapsed = withLeadingSlash.replace(/\/+/g, '/');
  if (collapsed.length > 1 && collapsed.endsWith('/')) {
    return collapsed.slice(0, -1);
  }
  return collapsed;
}

function normalizeUrl(raw) {
  const url = new URL(raw, SITE_ORIGIN);
  return `${url.origin}${normalizePathname(url.pathname)}`;
}

function parseLocalizedMappings() {
  const lines = fs.readFileSync(UTILS_FILE, 'utf8').split('\n');
  const mappings = [];
  let currentLang = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const langMatch = line.match(/^(es|pt|tr|hi|ru):\s*\{$/);
    if (langMatch) {
      currentLang = langMatch[1];
      continue;
    }

    if (currentLang && line === '},') {
      currentLang = null;
      continue;
    }

    if (!currentLang || !TARGET_LANGS.has(currentLang)) continue;

    const entryMatch = line.match(/^'([^']+)':\s*'([^']+)',$/);
    if (!entryMatch) continue;

    const baseSlug = entryMatch[1];
    const localizedSlug = entryMatch[2];
    if (baseSlug === localizedSlug) continue;

    mappings.push({ lang: currentLang, baseSlug, localizedSlug });
  }

  return mappings.sort((a, b) => {
    if (a.lang !== b.lang) return a.lang.localeCompare(b.lang);
    return a.baseSlug.localeCompare(b.baseSlug);
  });
}

function getSitemapFiles() {
  return fs.readdirSync(DIST_DIR)
    .filter((name) => /^sitemap(?:-\d+)?\.xml$/.test(name))
    .sort();
}

function collectSitemapUrls(files) {
  const urls = [];
  const LOC_RE = /<loc>([^<]+)<\/loc>/g;

  for (const file of files) {
    const fullPath = path.join(DIST_DIR, file);
    const xml = fs.readFileSync(fullPath, 'utf8');
    const matches = xml.matchAll(LOC_RE);
    for (const match of matches) {
      urls.push(normalizeUrl(match[1]));
    }
  }

  return new Set(urls);
}

function parseRedirectRules() {
  if (!fs.existsSync(REDIRECTS_FILE)) {
    throw new Error(`Missing redirects file: ${path.relative(ROOT, REDIRECTS_FILE)}`);
  }

  const lines = fs.readFileSync(REDIRECTS_FILE, 'utf8').split('\n');
  const rules = new Map();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(/\s+/);
    if (parts.length < 3) continue;

    const [from, to, status] = parts;
    rules.set(from, { to, status });
  }

  return rules;
}

function verify() {
  const mappings = parseLocalizedMappings();
  const sitemapFiles = getSitemapFiles();
  const failures = [];

  if (mappings.length === 0) {
    console.error('\n[verify-slug-migration] FAILED');
    console.error('No localized slug mappings parsed from src/i18n/utils.ts');
    process.exit(1);
  }

  if (sitemapFiles.length === 0) {
    console.error('\n[verify-slug-migration] FAILED');
    console.error('No sitemap files found in dist/ (expected sitemap.xml or sitemap-*.xml)');
    process.exit(1);
  }

  const sitemapUrls = collectSitemapUrls(sitemapFiles);
  const redirectRules = parseRedirectRules();

  for (const mapping of mappings) {
    const legacyPath = `/${mapping.lang}/${mapping.baseSlug}`;
    const legacyPathWithSlash = `${legacyPath}/`;
    const canonicalPath = `/${mapping.lang}/${mapping.localizedSlug}`;

    const legacyUrl = normalizeUrl(`${SITE_ORIGIN}${legacyPath}`);
    const canonicalUrl = normalizeUrl(`${SITE_ORIGIN}${canonicalPath}`);

    if (!sitemapUrls.has(canonicalUrl)) {
      failures.push(`Missing canonical URL in sitemap: ${canonicalPath}`);
    }

    if (sitemapUrls.has(legacyUrl)) {
      failures.push(`Legacy URL still present in sitemap: ${legacyPath}`);
    }

    for (const fromPath of [legacyPath, legacyPathWithSlash]) {
      const rule = redirectRules.get(fromPath);
      if (!rule) {
        failures.push(`Missing redirect rule: ${fromPath} -> ${canonicalPath} (301)`);
        continue;
      }

      if (rule.status !== '301') {
        failures.push(`Redirect is not 301: ${fromPath} -> ${rule.to} (${rule.status})`);
      }

      if (normalizePathname(rule.to) !== normalizePathname(canonicalPath)) {
        failures.push(`Redirect target mismatch: ${fromPath} -> ${rule.to}, expected ${canonicalPath}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error('\n[verify-slug-migration] FAILED');
    console.error(`Checked mappings: ${mappings.length}`);
    console.error(`Sitemap files: ${sitemapFiles.length}`);
    console.error(`Failures: ${failures.length}\n`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(
    `[verify-slug-migration] PASS — ${mappings.length} mappings validated across ${sitemapFiles.length} sitemap file(s)`
  );
}

verify();
