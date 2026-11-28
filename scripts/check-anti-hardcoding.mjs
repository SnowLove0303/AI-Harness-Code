import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SPECIAL_CASE_LITERAL_RE = /if\s*\([^)]*(?:===|!==|\.includes\()\s*['"](?:case[-_]|issue[-_]|ticket[-_]|sample[-_]|test[-_]?case[-_]|bug[-_])[^'"]+['"]/i;
const ELSE_IF_LITERAL_RE = /else\s+if\s*\(\s*(?!typeof\b)[^)]*===\s*['"][^'"]+['"]\s*\)/g;
const STATIC_STRING_ARRAY_RE = /\bconst\s+[A-Z0-9_]+\s*=\s*\[([\s\S]*?)\]/g;
const STATIC_STRING_MAP_RE = /\bconst\s+[A-Z0-9_]+\s*=\s*\{([\s\S]*?)\}/g;
const STRING_LITERAL_RE = /['"][^'"\r\n]{2,}['"]/g;
const KV_LITERAL_PAIR_RE = /['"][^'"\r\n]+['"]\s*:\s*['"][^'"\r\n]+['"]/g;
const FIXTURE_OR_SCHEMA_PATH_RE = /(?:^|[\\/])(?:tests?|fixtures?|schemas?|__tests__|mocks?)(?:[\\/]|$)/i;

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

/**
 * Classifies whether a proposed modification is allowed in engine source code
 * based on Problem Class (A/B/C/D) and System Content Category.
 */
export function classifyMutationBoundary({
  problemClass,
  targetCategory,
  userApprovedEmbedding = false,
} = {}) {
  const cls = String(problemClass || '').toUpperCase();
  const cat = String(targetCategory || '').toLowerCase();

  if (cat === 'user_data' && !userApprovedEmbedding) {
    return {
      allowed: false,
      zone: 'red',
      code: 'UNAPPROVED_USER_DATA_EMBEDDING_BLOCKED',
      reason: 'User/instance data must not be embedded in source code without explicit user approval.',
    };
  }
  if (cat === 'protocol_invariant') {
    return {
      allowed: true,
      zone: 'green',
      code: 'PROTOCOL_INVARIANT_WHITELISTED',
      reason: 'Protocol and standard invariants are whitelisted in source code.',
    };
  }
  if ((cls === 'A' || cls === 'B') && (cat === 'pluggable_schema' || cat === 'sample_fixture')) {
    return {
      allowed: true,
      zone: 'green',
      code: 'EXTERNAL_SCHEMA_OR_FIXTURE_ALLOWED',
      reason: 'Class A/B variations belong in external pluggable schemas or isolated sample fixtures.',
    };
  }
  if (cls === 'A' && cat === 'engine_primitive') {
    return {
      allowed: false,
      zone: 'red',
      code: 'INSTANCE_DATA_IN_ENGINE_BLOCKED',
      reason: 'Class A instance/template-specific issues must not modify generic engine source.',
    };
  }
  if (cls === 'B' && cat === 'engine_primitive') {
    return {
      allowed: false,
      zone: 'red',
      code: 'POLICY_IN_ENGINE_BLOCKED',
      reason: 'Class B policy/mapping differences must be injected via pluggable Schema, not engine source.',
    };
  }
  if (cls === 'C' && cat === 'engine_primitive') {
    return {
      allowed: false,
      zone: 'red',
      code: 'ACL_BYPASS_TO_ENGINE_BLOCKED',
      reason: 'Class C boundary noise must be normalized in the ACL layer, not core engine source.',
    };
  }
  if (cls === 'C' && cat === 'acl') {
    return {
      allowed: true,
      zone: 'yellow',
      code: 'ACL_BOUNDARY_ADAPTATION_ALLOWED',
      reason: 'Class C heterogeneous input normalization is permitted within the boundary ACL layer.',
    };
  }
  if (cls === 'D' && cat === 'engine_primitive') {
    return {
      allowed: true,
      zone: 'green',
      code: 'UNIVERSAL_PRIMITIVE_EVOLUTION_ALLOWED',
      reason: 'Class D generic primitive gaps may update engine source with zero-scenario-wording and cross-scenario invariance.',
    };
  }

  return {
    allowed: false,
    zone: 'red',
    code: 'UNCLASSIFIED_MUTATION_BLOCKED',
    reason: `Unrecognized or mismatched boundary combination: class=${cls || 'unknown'}, category=${cat || 'unknown'}.`,
  };
}

/**
 * Scans non-fixture source files for large embedded static literal lists or
 * key-value mapping tables that should be externalized into a pluggable Schema.
 */
export function scanForStaticDataEmbedding(
  sourceCode,
  filePath = 'module.mjs',
  { threshold = 8 } = {}
) {
  const violations = [];
  const code = String(sourceCode || '');

  if (
    FIXTURE_OR_SCHEMA_PATH_RE.test(filePath) ||
    code.includes('@PROTOCOL_INVARIANT_ALLOWLIST')
  ) {
    return { valid: true, violations };
  }

  for (const match of code.matchAll(STATIC_STRING_ARRAY_RE)) {
    const items = match[1].match(STRING_LITERAL_RE) || [];
    if (items.length >= threshold) {
      violations.push({
        code: 'STATIC_DATA_EMBEDDING_DETECTED',
        file: filePath,
        message: `Detected static string array with ${items.length} literals (>= ${threshold}). Externalize instance lists into a pluggable Schema or mark protocol invariants.`,
      });
    }
  }

  for (const match of code.matchAll(STATIC_STRING_MAP_RE)) {
    const pairs = match[1].match(KV_LITERAL_PAIR_RE) || [];
    if (pairs.length >= threshold) {
      violations.push({
        code: 'STATIC_DATA_EMBEDDING_DETECTED',
        file: filePath,
        message: `Detected static string mapping table with ${pairs.length} entries (>= ${threshold}). Externalize mappings into a pluggable Schema.`,
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

const AUDITABLE_EXT_RE = /\.(?:mjs|cjs|js|ts|tsx|py)$/i;

/**
 * Audits a concrete list of changed/target files for both special-case overfitting
 * and static user/instance data embedding in generic source layers.
 */
export function auditFilesForHardcoding(filePaths, repoRoot = process.cwd()) {
  const allViolations = [];
  let scanned = 0;

  for (const relOrAbs of filePaths || []) {
    const relPath = path.isAbsolute(relOrAbs)
      ? path.relative(repoRoot, relOrAbs)
      : relOrAbs;
    const normalized = relPath.replace(/\\/g, '/');
    if (
      !AUDITABLE_EXT_RE.test(normalized) ||
      FIXTURE_OR_SCHEMA_PATH_RE.test(normalized) ||
      normalized.endsWith('check-anti-hardcoding.mjs')
    ) {
      continue;
    }
    const fullPath = path.resolve(repoRoot, relPath);
    if (!existsSync(fullPath)) continue;

    scanned++;
    const content = readFileSync(fullPath, 'utf8');
    const specialRes = scanCodeForSpecialCasing(content, normalized);
    const staticRes = scanForStaticDataEmbedding(content, normalized);
    allViolations.push(...specialRes.violations, ...staticRes.violations);
  }

  return {
    valid: allViolations.length === 0,
    scanned,
    violations: allViolations,
  };
}

function getGitChangedFiles(repoRoot) {
  try {
    const out = execSync('git status --porcelain', {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    return out
      .split(/\r?\n/)
      .filter((line) => line.length > 3)
      .map((line) => line.slice(3).trim().replace(/^"|"$/g, '').split(' -> ').pop());
  } catch {
    return [];
  }
}

function runCli() {
  const repoRoot = process.cwd();
  const useGitDiff = process.argv.includes('--git-diff');

  console.log('=== Automated L2 Anti-Hardcoding & Generalization Guard (AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD) ===');

  if (useGitDiff) {
    const changedFiles = getGitChangedFiles(repoRoot);
    const res = auditFilesForHardcoding(changedFiles, repoRoot);
    if (!res.valid) {
      for (const v of res.violations) {
        console.error(`[FAIL] ${v.code} (${v.file}): ${v.message}`);
      }
      process.exit(1);
    }
    console.log(`[PASS] Audited ${res.scanned} changed source file(s) from git working tree, 0 hardcoding/embedding violations detected.`);
    process.exit(0);
  }

  const targetIdx = process.argv.indexOf('--target');
  const targetRel =
    targetIdx !== -1 && process.argv[targetIdx + 1]
      ? process.argv[targetIdx + 1]
      : 'scripts';
  const scriptsDir = path.resolve(repoRoot, targetRel);
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
