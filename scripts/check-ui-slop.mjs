import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FRONTEND_EXTENSIONS = new Set(['.tsx', '.jsx', '.vue', '.svelte', '.html', '.css']);
const MODE_BADGE_BUDGET = {
  operate: 3,
  read: 2,
  persuade: 4,
};

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'bundle',
  'openspec',
  'tests',
  '.harness',
]);

/**
 * Inspects UI template/component source content for AI-slop anti-patterns
 * under mode-calibrated density budgets (operate / read / persuade).
 */
export function checkUiContent(content, filePath = 'component.tsx', options = {}) {
  const mode = MODE_BADGE_BUDGET[options.mode] ? options.mode : 'operate';
  const maxBadges = options.maxBadges ?? MODE_BADGE_BUDGET[mode];
  const violations = [];
  const text = String(content || '');

  // 1. Nested Cards (<Card>...<Card> or nested rounded-xl/lg border containers)
  const nestedCardTag = /<Card\b[^>]*>[\s\S]*?<Card\b/i.test(text);
  const nestedCardClass = /class(?:Name)?=["'][^"']*\bcard\b[^"']*["'][^>]*>[\s\S]*?class(?:Name)?=["'][^"']*\bcard\b/i.test(text);
  if (nestedCardTag || nestedCardClass) {
    violations.push({
      code: 'UI_SLOP_NESTED_CARD_BLOCKED',
      file: filePath,
      message: 'Nested card containers detected. Flatten hierarchy instead of wrapping cards inside cards.',
    });
  }

  // 2. Excessive Badge / Tag / Chip Clutter
  const badgeMatches = text.match(/<(?:Badge|Tag|Chip)\b|class(?:Name)?=["'][^"']*\b(?:badge|chip|pill-tag)\b[^"']*["']/gi) || [];
  if (badgeMatches.length > maxBadges) {
    violations.push({
      code: 'UI_SLOP_EXCESSIVE_BADGES_BLOCKED',
      file: filePath,
      message: `Found ${badgeMatches.length} badges/tags (mode '${mode}' budget max=${maxBadges}). Distill redundant status chips.`,
    });
  }

  // 3. Eyebrow / Kicker Label Clutter above headings
  const hasEyebrowClass = /\b(?:eyebrow|kicker|section-kicker)\b/i.test(text);
  const hasKickerMarkup = /<(?:span|p|div)[^>]*class(?:Name)?=["'][^"']*uppercase[^"']*tracking-(?:widest|wider)[^"']*["'][^>]*>[^<]{2,40}<\/(?:span|p|div)>\s*<h[1-6]\b/i.test(text);
  if (hasEyebrowClass || hasKickerMarkup) {
    violations.push({
      code: 'UI_SLOP_EYEBROW_CLUTTER_BLOCKED',
      file: filePath,
      message: 'Redundant eyebrow/kicker label detected above heading. Let the heading carry its own weight.',
    });
  }

  // 4. Verbose Explanatory Prose inside operational UI
  if (mode === 'operate') {
    const boilerplateProse = /用于对.{2,30}进行(?:集中)?(?:配置|管理|查看|维护)|Manage and configure your .{2,30} effortlessly|Click here to|Simply use this panel to/i.test(text);
    const longParagraphMatch = /<p\b[^>]*>([^<]{160,})<\/p>/i.test(text);
    if (boilerplateProse || longParagraphMatch) {
      violations.push({
        code: 'UI_SLOP_VERBOSE_PROSE_BLOCKED',
        file: filePath,
        message: 'Verbose explanatory prose detected in operational UI. Apply distill pass to strip textual crutches.',
      });
    }
  }

  // 5. Purple-Glow AI-Slop Gradient Cliché
  const hasPurpleGlow = /\bfrom-(?:purple|violet)-\d{3}[^"']*\bto-(?:indigo|fuchsia|pink)-\d{3}/i.test(text)
    || /shadow-(?:purple|violet)-500\/(?:40|50|60)/i.test(text);
  if (hasPurpleGlow) {
    violations.push({
      code: 'UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED',
      file: filePath,
      message: 'Default purple-glow gradient cliché detected. Replace with intentional semantic surface tokens.',
    });
  }

  return {
    valid: violations.length === 0,
    mode,
    violations,
  };
}

/**
 * Recursively scans a directory for frontend source files and aggregates UI-slop violations.
 */
export function scanUiDirectory(rootDir, options = {}) {
  const scannedFiles = [];
  const allViolations = [];

  function walk(dir) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (FRONTEND_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        scannedFiles.push(fullPath);
        const content = readFileSync(fullPath, 'utf8');
        const res = checkUiContent(content, path.relative(rootDir, fullPath), options);
        allViolations.push(...res.violations);
      }
    }
  }

  walk(rootDir);
  return {
    valid: allViolations.length === 0,
    scannedCount: scannedFiles.length,
    violations: allViolations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const result = scanUiDirectory(repoRoot);

  console.log('=== Automated L2 UI-Slop Static Guard (AUTOMATED_L2_UI_SLOP_GUARD_STANDARD) ===');
  if (!result.valid) {
    for (const v of result.violations) {
      console.error(`[FAIL] ${v.code} (${v.file}): ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Scanned ${result.scannedCount} frontend file(s), 0 UI-slop violations detected.`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
