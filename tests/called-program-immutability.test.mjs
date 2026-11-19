import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
  scanDiffForEngineModifications,
  isInvocationTask,
  checkInvocationPurity,
  ENGINE_DIRECTORIES,
} from '../scripts/check-invocation-purity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Post-archive path fallback for delta spec
const CHANGE_SPEC_PATH = (() => {
  const activePath = path.join(
    REPO_ROOT,
    'openspec',
    'changes',
    'called-program-immutability-and-invocation-purity',
    'specs',
    'orbitstack-pstack-routing',
    'spec.md'
  );
  const archivePath = path.join(
    REPO_ROOT,
    'openspec',
    'specs',
    'orbitstack-pstack-routing',
    'spec.md'
  );
  return fs.existsSync(activePath) ? activePath : archivePath;
})();

// ───────────────────────────────────────────────────────────────
// 1. Constitutional presence: Axiom 66 in all 3 mirrors
// ───────────────────────────────────────────────────────────────
test('L2 Suite: Axiom 66 codified in GEMINI.md with all sub-invariants', () => {
  const geminiPath = path.join(REPO_ROOT, 'GEMINI.md');
  assert.ok(fs.existsSync(geminiPath), 'GEMINI.md must exist');
  const content = fs.readFileSync(geminiPath, 'utf8');

  assert.ok(content.includes('CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM'),
    'GEMINI.md must contain Axiom 66 identifier');
  assert.ok(content.includes('INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK'),
    'GEMINI.md must contain INVOCATION_TASK_CLASSIFICATION sub-invariant');
  assert.ok(content.includes('ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE'),
    'GEMINI.md must contain ANTI_EXPEDIENCY_MUTATION sub-invariant');
  assert.ok(content.includes('UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL'),
    'GEMINI.md must contain UPSTREAM_DEFECT_ISOLATION sub-invariant');
  assert.ok(content.includes('GATE2_CALLER_SCOPE_PHYSICAL_FENCE'),
    'GEMINI.md must contain GATE2_CALLER_SCOPE_PHYSICAL_FENCE sub-invariant');
  assert.ok(content.includes('INVOCATION_PURITY_GUARD_STANDARD'),
    'GEMINI.md must contain INVOCATION_PURITY_GUARD_STANDARD sub-invariant');
  assert.ok(content.includes('UNIVERSAL_INVOCATION_PURITY_STANDARD'),
    'GEMINI.md must contain UNIVERSAL_INVOCATION_PURITY_STANDARD sub-invariant');
  assert.ok(content.includes('CALLED_PROGRAM_READONLY_LOCK'),
    'GEMINI.md must contain CALLED_PROGRAM_READONLY_LOCK');
});

test('L2 Suite: Axiom 66 codified in skills/pstack-openspec/SKILL.md', () => {
  const skillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), 'pstack-openspec SKILL.md must exist');
  const content = fs.readFileSync(skillPath, 'utf8');

  assert.ok(content.includes('CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM'),
    'pstack-openspec must contain Axiom 66 identifier');
  assert.ok(content.includes('INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK'),
    'pstack-openspec must contain INVOCATION_TASK_CLASSIFICATION sub-invariant');
  assert.ok(content.includes('ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE'),
    'pstack-openspec must contain ANTI_EXPEDIENCY_MUTATION sub-invariant');
  assert.ok(content.includes('UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL'),
    'pstack-openspec must contain UPSTREAM_DEFECT_ISOLATION sub-invariant');
  assert.ok(content.includes('GATE2_CALLER_SCOPE_PHYSICAL_FENCE'),
    'pstack-openspec must contain GATE2_CALLER_SCOPE_PHYSICAL_FENCE sub-invariant');
  assert.ok(content.includes('INVOCATION_PURITY_GUARD_STANDARD'),
    'pstack-openspec must contain INVOCATION_PURITY_GUARD_STANDARD sub-invariant');
  assert.ok(content.includes('UNIVERSAL_INVOCATION_PURITY_STANDARD'),
    'pstack-openspec must contain UNIVERSAL_INVOCATION_PURITY_STANDARD sub-invariant');
});

test('L2 Suite: Axiom 66 codified in skills/ai-harness-openspec/SKILL.md', () => {
  const skillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), 'ai-harness-openspec SKILL.md must exist');
  const content = fs.readFileSync(skillPath, 'utf8');

  assert.ok(content.includes('CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM'),
    'ai-harness-openspec must contain Axiom 66 identifier');
  assert.ok(content.includes('INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK'),
    'ai-harness-openspec must contain INVOCATION_TASK_CLASSIFICATION sub-invariant');
  assert.ok(content.includes('ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE'),
    'ai-harness-openspec must contain ANTI_EXPEDIENCY_MUTATION sub-invariant');
  assert.ok(content.includes('UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL'),
    'ai-harness-openspec must contain UPSTREAM_DEFECT_ISOLATION sub-invariant');
  assert.ok(content.includes('GATE2_CALLER_SCOPE_PHYSICAL_FENCE'),
    'ai-harness-openspec must contain GATE2_CALLER_SCOPE_PHYSICAL_FENCE sub-invariant');
  assert.ok(content.includes('INVOCATION_PURITY_GUARD_STANDARD'),
    'ai-harness-openspec must contain INVOCATION_PURITY_GUARD_STANDARD sub-invariant');
  assert.ok(content.includes('UNIVERSAL_INVOCATION_PURITY_STANDARD'),
    'ai-harness-openspec must contain UNIVERSAL_INVOCATION_PURITY_STANDARD sub-invariant');
});

// ───────────────────────────────────────────────────────────────
// 2. worker.md invocation purity rules
// ───────────────────────────────────────────────────────────────
test('L2 Suite: worker.md contains invocation purity rules (CALLED_PROGRAM_READONLY_LOCK)', () => {
  const workerPath = path.join(REPO_ROOT, 'worker.md');
  assert.ok(fs.existsSync(workerPath), 'worker.md must exist');
  const content = fs.readFileSync(workerPath, 'utf8');

  assert.ok(content.includes('CALLED_PROGRAM_READONLY_LOCK'),
    'worker.md must contain CALLED_PROGRAM_READONLY_LOCK rule');
  assert.ok(content.includes('Invocation Task'),
    'worker.md must contain invocation task classification reference');
  assert.ok(content.includes('UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED'),
    'worker.md must contain UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED violation code');
});

// ───────────────────────────────────────────────────────────────
// 3. package.json guard registration
// ───────────────────────────────────────────────────────────────
test('L2 Suite: package.json registers guard:invocation-purity script', () => {
  const pkgPath = path.join(REPO_ROOT, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'package.json must exist');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  assert.ok(pkg.scripts && pkg.scripts['guard:invocation-purity'],
    'package.json must contain guard:invocation-purity script');
  assert.equal(pkg.scripts['guard:invocation-purity'],
    'node scripts/check-invocation-purity.mjs',
    'guard:invocation-purity must invoke check-invocation-purity.mjs');
});

// ───────────────────────────────────────────────────────────────
// 4. Unit tests: check-invocation-purity.mjs
// ───────────────────────────────────────────────────────────────
test('Unit: isInvocationTask returns false when INVOCATION_TASK env unset', () => {
  delete process.env.INVOCATION_TASK;
  const result = isInvocationTask(undefined);
  assert.equal(result, false, 'Should return false when env not set and no metadata file');
});

test('Unit: isInvocationTask returns true when INVOCATION_TASK=true', () => {
  process.env.INVOCATION_TASK = 'true';
  const result = isInvocationTask(undefined);
  delete process.env.INVOCATION_TASK;
  assert.equal(result, true, 'Should return true when env explicitly set to true');
});

test('Unit: scanDiffForEngineModifications returns clean on caller-only diff', () => {
  const callerDiff = [
    'diff --git a/caller/adapter.js b/caller/adapter.js',
    '--- a/caller/adapter.js',
    '+++ b/caller/adapter.js',
    '@@ -1,3 +1,4 @@',
    '+const x = 1;',
  ].join('\n');

  const result = scanDiffForEngineModifications(callerDiff);
  assert.ok(result.clean, 'Caller-only diff must be clean');
  assert.equal(result.violations.length, 0, 'Must have zero violations');
});

test('Unit: scanDiffForEngineModifications detects engine directory modification', () => {
  const engineDiff = [
    'diff --git a/src/core/engine.js b/src/core/engine.js',
    '--- a/src/core/engine.js',
    '+++ b/src/core/engine.js',
    '@@ -10,3 +10,4 @@',
    '+// tampered',
  ].join('\n');

  const result = scanDiffForEngineModifications(engineDiff);
  assert.ok(!result.clean, 'Engine directory modification must be detected as violation');
  assert.ok(result.violations.length > 0, 'Must report at least one violation');
});

test('Unit: checkInvocationPurity passes for non-invocation task', () => {
  delete process.env.INVOCATION_TASK;
  const result = checkInvocationPurity({ diffText: 'diff --git a/src/engine.js b/src/engine.js\n+++ b/src/engine.js' });
  assert.ok(result.passed, 'Non-invocation task must always pass the guard');
});

test('Unit: checkInvocationPurity passes for invocation task with caller-only changes', () => {
  process.env.INVOCATION_TASK = 'true';
  const callerDiff = [
    'diff --git a/caller/data.csv b/caller/data.csv',
    '--- a/caller/data.csv',
    '+++ b/caller/data.csv',
    '@@ -1 +1,2 @@',
    '+row,data',
  ].join('\n');
  const result = checkInvocationPurity({ diffText: callerDiff });
  delete process.env.INVOCATION_TASK;
  assert.ok(result.passed, 'Caller-only diff during invocation task must pass');
});

test('Unit: checkInvocationPurity fails for invocation task with engine modification — CALLED_PROGRAM_TAMPERING_DETECTED', () => {
  process.env.INVOCATION_TASK = 'true';
  const engineDiff = [
    'diff --git a/lib/core-utility.js b/lib/core-utility.js',
    '--- a/lib/core-utility.js',
    '+++ b/lib/core-utility.js',
    '@@ -5,3 +5,4 @@',
    '+// unauthorized patch',
  ].join('\n');
  const result = checkInvocationPurity({ diffText: engineDiff });
  delete process.env.INVOCATION_TASK;
  assert.ok(!result.passed, 'Engine modification during invocation task must fail guard');
  assert.ok(result.reason.includes('CALLED_PROGRAM_TAMPERING_DETECTED'),
    'Failure reason must include CALLED_PROGRAM_TAMPERING_DETECTED');
  assert.ok(result.violations.length > 0, 'Must report violations');
});

// ───────────────────────────────────────────────────────────────
// 5. Mutation test: tampering detection cannot be bypassed
// ───────────────────────────────────────────────────────────────
test('Mutation: engine directory list cannot be trivially bypassed with partial path prefix', () => {
  // A file at "src/engine/main.js" must be detected
  const diff = [
    '--- a/src/engine/main.js',
    '+++ b/src/engine/main.js',
  ].join('\n');
  const { violations } = scanDiffForEngineModifications(diff);
  assert.ok(violations.length > 0, 'src/engine/main.js must be flagged as engine directory violation');
});

test('Mutation: nested engine path detected via sub-path match', () => {
  // "packages/core-lib/util.js" must be caught because it starts with "packages/"
  const diff = [
    '+++ b/packages/core-lib/util.js',
  ].join('\n');
  const { violations } = scanDiffForEngineModifications(diff);
  assert.ok(violations.length > 0, 'packages/ nested path must be flagged');
});

test('Mutation: guard cannot be bypassed by passing empty diff when task is invocation', () => {
  process.env.INVOCATION_TASK = 'true';
  const result = checkInvocationPurity({ diffText: '' });
  delete process.env.INVOCATION_TASK;
  // Empty diff is clean — no tampering, guard passes correctly (this is correct behavior not a bypass)
  assert.ok(result.passed, 'Empty diff for invocation task must pass (no tampering)');
});

// ───────────────────────────────────────────────────────────────
// 6. Domain neutrality check
// ───────────────────────────────────────────────────────────────
test('Domain neutrality: check-invocation-purity.mjs must not contain domain-specific scenario tokens', () => {
  const guardPath = path.join(REPO_ROOT, 'scripts', 'check-invocation-purity.mjs');
  assert.ok(fs.existsSync(guardPath), 'Guard script must exist');
  const content = fs.readFileSync(guardPath, 'utf8');

  // These tokens would indicate domain/scenario leakage
  const forbiddenTokens = ['MSDS', 'DSH', 'DeepSeek', 'msds', 'docx', 'pdf-gen', 'export-cli'];
  for (const token of forbiddenTokens) {
    assert.ok(!content.includes(token),
      `Guard script must not contain domain-specific token: "${token}"`);
  }
});

// ───────────────────────────────────────────────────────────────
// 7. guard:invocation-purity CLI exit code 0 (non-invocation context)
// ───────────────────────────────────────────────────────────────
test('CLI: npm run guard:invocation-purity exits with code 0 in non-invocation context', () => {
  const result = spawnSync('node', ['scripts/check-invocation-purity.mjs'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    env: { ...process.env, INVOCATION_TASK: 'false' },
  });
  assert.equal(result.status, 0,
    `guard:invocation-purity must exit 0 in non-invocation context. stderr: ${result.stderr}`);
});
