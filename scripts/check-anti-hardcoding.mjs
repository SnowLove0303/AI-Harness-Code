import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SPECIAL_CASE_LITERAL_RE = /if\s*\([^)]*(?:===|!==|\.includes\()\s*['"](?:case[-_]|issue[-_]|ticket[-_]|sample[-_]|test[-_]?case[-_]|bug[-_])[^'"]+['"]/i;
const ELSE_IF_LITERAL_RE = /else\s+if\s*\(\s*(?!typeof\b)[^)]*===\s*['"][^'"]+['"]\s*\)/g;

/**
 * Scans generic module source code for instance-specific special-case overfitting
 * and accumulated literal branching that should be table-driven.
 */
export function scanCodeForSpecialCasing(sourceCode, filePath = 'module.mjs') {
  const violations = [];
  const code = String(sourceCode || '');

  if (SPECIAL_CASE_LITERAL_RE.test(code)) {
    violations.push({
      code: 'SPECIAL_CASE_OVERFITTING_BLOCKED',
      file: filePath,
      message: 'Instance-specific literal conditional branch detected in generic code path. Generalize via problem-class logic or external declarative tables.',
    });
  }

  const elseIfMatches = code.match(ELSE_IF_LITERAL_RE) || [];
  if (elseIfMatches.length >= 2) {
    violations.push({
      code: 'TABLE_DRIVEN_REFACTOR_REQUIRED',
      file: filePath,
      message: `Detected ${elseIfMatches.length + 1} chained literal special-case branches. Refactor to table-driven or parameterized dispatch.`,
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Validates that a remediation record abstracts the issue into a general Problem Class,
 * sweeps analogous sibling sites, and tests at least 2 orthogonal variants.
 */
export function validateGeneralizationEvidence(record) {
  const violations = [];
  if (!record || typeof record !== 'object') {
    violations.push({
      code: 'PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED',
      message: 'Generalization evidence must be an object.',
    });
    return { valid: false, violations };
  }

  if (!String(record.problemClass || '').trim() || !Array.isArray(record.analogousSitesChecked)) {
    violations.push({
      code: 'PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED',
      message: 'Remediation must declare problemClass and analogousSitesChecked list (analogous pattern sweep).',
    });
  }

  const variants = Array.isArray(record.orthogonalVariants) ? record.orthogonalVariants : [];
  if (variants.length < 2) {
    violations.push({
      code: 'VARIANT_QUOTA_DEFICIT_BLOCKED',
      message: `Expected at least 2 orthogonal variant tests beyond original repro, got ${variants.length}.`,
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const scriptsDir = path.join(repoRoot, 'scripts');
  const allViolations = [];
  let scanned = 0;

  if (existsSync(scriptsDir)) {
    for (const entry of readdirSync(scriptsDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.mjs') && entry.name !== 'check-anti-hardcoding.mjs') {
        scanned++;
        const fullPath = path.join(scriptsDir, entry.name);
        const res = scanCodeForSpecialCasing(readFileSync(fullPath, 'utf8'), path.join('scripts', entry.name));
        allViolations.push(...res.violations);
      }
    }
  }

  console.log('=== Automated L2 Anti-Hardcoding & Generalization Guard (AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD) ===');
  if (allViolations.length > 0) {
    for (const v of allViolations) {
      console.error(`[FAIL] ${v.code} (${v.file}): ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Scanned ${scanned} script module(s), 0 special-case overfitting violations detected.`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
