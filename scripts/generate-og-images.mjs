/**
 * Generate per-calculator OG images (1200x630 PNG) using Sharp.
 * Run: node scripts/generate-og-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'og');
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const CALCS = [
  { slug: 'profit-calculator', title: 'Crypto Profit\nCalculator', icon: '💰', color: '#10b981' },
  { slug: 'dca-calculator', title: 'DCA\nCalculator', icon: '📊', color: '#6366f1' },
  { slug: 'mining-calculator', title: 'Bitcoin Mining\nCalculator', icon: '⛏️', color: '#f59e0b' },
  { slug: 'tax-calculator', title: 'Crypto Tax\nCalculator', icon: '🧾', color: '#ef4444' },
  { slug: 'staking-calculator', title: 'Staking Rewards\nCalculator', icon: '🥩', color: '#8b5cf6' },
  { slug: 'converter', title: 'Crypto\nConverter', icon: '🔄', color: '#06b6d4' },
  { slug: 'liquidation-calculator', title: 'Liquidation Price\nCalculator', icon: '⚠️', color: '#dc2626' },
  { slug: 'position-size-calculator', title: 'Position Size\nCalculator', icon: '📐', color: '#0ea5e9' },
  { slug: 'impermanent-loss-calculator', title: 'Impermanent Loss\nCalculator', icon: '💧', color: '#a855f7' },
  { slug: 'gas-calculator', title: 'Gas Fee\nCalculator', icon: '⛽', color: '#f97316' },
];

async function generateOG(calc) {
  const lines = calc.title.split('\n');
  const line1 = lines[0];
  const line2 = lines[1] || '';

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${calc.color}"/>
      <stop offset="100%" stop-color="${calc.color}88"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="6" height="630" fill="${calc.color}"/>
  <rect x="60" y="520" width="120" height="4" rx="2" fill="url(#accent)"/>
  <text x="60" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="white" letter-spacing="-2">${line1}</text>
  <text x="60" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="${calc.color}" letter-spacing="-2">${line2}</text>
  <text x="60" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#94a3b8">Free, fast, privacy-first. No signup required.</text>
  <text x="60" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="white">Crypto<tspan fill="${calc.color}">Calk</tspan></text>
  <text x="1140" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#64748b" text-anchor="end">cryptocalk.com</text>
</svg>`;

  const outPath = join(OUT_DIR, `${calc.slug}.png`);
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outPath);
  console.log(`  ${calc.slug}.png`);
}

console.log('Generating OG images...');
for (const calc of CALCS) {
  await generateOG(calc);
}
console.log(`Done! ${CALCS.length} images in public/og/`);
