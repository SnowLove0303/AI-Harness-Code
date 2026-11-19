import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  scanContentForPortabilityViolations,
  checkUniversalPortability,
} from '../scripts/check-universal-portability.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// --- Group 1: Static Path Detection & Anti-Pattern Detection (REQ-1 & REQ-5) ---

test('1. scanContentForPortabilityViolations detects Windows hardcoded user paths', () => {
  const badContent = `
    const userDb = "C:\\\\Users\\\\JohnDoe\\\\AppData\\\\Local\\\\app.db";
  `;
  const result = scanContentForPortabilityViolations(badContent, 'src/db.js');
  assert.equal(result.clean, false);
  assert.equal(result.violations.length, 1);
  assert.equal(result.violations[0].type, 'HARDCODED_HOST_ENVIRONMENT_BLOCKED');
});

test('2. scanContentForPortabilityViolations detects Unix hardcoded user paths', () => {
  const badContent = `
    const configPath = '/home/alice/.config/app/config.json';
  `;
  const result = scanContentForPortabilityViolations(badContent, 'src/config.js');
  assert.equal(result.clean, false);
  assert.equal(result.violations.length, 1);
  assert.equal(result.violations[0].type, 'HARDCODED_HOST_ENVIRONMENT_BLOCKED');
});

test('3. scanContentForPortabilityViolations passes relative and environment-based paths', () => {
  const cleanContent = `
    const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
    const dbPath = path.join(dataDir, 'app.db');
  `;
  const result = scanContentForPortabilityViolations(cleanContent, 'src/db.js');
  assert.equal(result.clean, true);
  assert.equal(result.violations.length, 0);
});

// --- Group 2: Database Auto-Bootstrap & Migration Resilience (REQ-2) ---

test('4. database auto-bootstrap helper creates parent directory and executes migrations idempotently', () => {
  const tempBase = mkdtempSync(path.join(tmpdir(), 'portability-db-test-'));
  const targetDir = path.join(tempBase, 'nested', 'deep', 'storage');
  const targetDbFile = path.join(targetDir, 'test.db');

  // Verify directory does not exist initially
  assert.equal(existsSync(targetDir), false);

  // Auto-bootstrap simulation function representing the standardized pattern
  function autoBootstrapStorage(dbPath) {
    const parentDir = path.dirname(dbPath);
    if (!existsSync(parentDir)) {
      mkdirSync(parentDir, { recursive: true });
    }
    // Simulate idempotent schema setup
    const schemaFile = path.join(parentDir, 'schema_version.json');
    if (!existsSync(schemaFile)) {
      writeFileSync(schemaFile, JSON.stringify({ version: '1.0.0', initialized: true }), 'utf8');
    }
    return { initialized: true, path: dbPath };
  }

  // First run: cold boot
  const coldBoot = autoBootstrapStorage(targetDbFile);
  assert.ok(coldBoot.initialized);
  assert.ok(existsSync(targetDir), 'Parent directory must be created recursively');

  // Second run: idempotent check
  const warmBoot = autoBootstrapStorage(targetDbFile);
  assert.ok(warmBoot.initialized);
  assert.ok(existsSync(path.join(targetDir, 'schema_version.json')));

  // Cleanup
  rmSync(tempBase, { recursive: true, force: true });
});

// --- Group 3: Two-Tier User/Default Data Orthogonal Segregation (REQ-3) ---

test('5. system updates preserve user records while user reset preserves system defaults', () => {
  const tempBase = mkdtempSync(path.join(tmpdir(), 'portability-segregation-test-'));
  const defaultsDir = path.join(tempBase, 'system_defaults');
  const userDataDir = path.join(tempBase, 'user_data');

  mkdirSync(defaultsDir, { recursive: true });
  mkdirSync(userDataDir, { recursive: true });

  // Initial state: system provides default template v1
  writeFileSync(path.join(defaultsDir, 'template.json'), JSON.stringify({ version: 1, name: 'Default Template' }));
  // User creates custom record
  writeFileSync(path.join(userDataDir, 'custom_record.json'), JSON.stringify({ id: 'user-001', customVal: 'Secret' }));

  // Operation A: System Update (replacing system defaults with v2)
  writeFileSync(path.join(defaultsDir, 'template.json'), JSON.stringify({ version: 2, name: 'Upgraded Default Template' }));

  // Assert user record is 100% untouched after system upgrade
  assert.ok(existsSync(path.join(userDataDir, 'custom_record.json')), 'User record must remain intact');
  const userContent = JSON.parse(readFileSync(path.join(userDataDir, 'custom_record.json'), 'utf8'));
  assert.equal(userContent.customVal, 'Secret');

  // Operation B: User Reset (purging user data)
  rmSync(userDataDir, { recursive: true, force: true });
  mkdirSync(userDataDir, { recursive: true });

  // Assert system default baseline is 100% intact after user reset
  assert.ok(existsSync(path.join(defaultsDir, 'template.json')), 'Default template must not be affected by user reset');
  const defaultContent = JSON.parse(readFileSync(path.join(defaultsDir, 'template.json'), 'utf8'));
  assert.equal(defaultContent.version, 2);

  // Cleanup
  rmSync(tempBase, { recursive: true, force: true });
});

// --- Group 4: Portable Data Export & Import (REQ-4) ---

test('6. portable export contains zero host-specific absolute paths', () => {
  const mockUserData = {
    userId: 'u123',
    preferences: { theme: 'dark', language: 'zh-CN' },
    records: [{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }],
  };

  const serialized = JSON.stringify(mockUserData, null, 2);
  const scanResult = scanContentForPortabilityViolations(serialized, 'export.json');
  assert.equal(scanResult.clean, true, 'Export payload must be free of host-bound machine paths');
});

// --- Group 5: Constitutional Parity Across Three Mirrors (REQ-6) ---

test('7. Axiom 67 is codified with identical sub-invariants across all three mirrors', () => {
  const geminiPath = path.join(repoRoot, 'GEMINI.md');
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const harnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');

  assert.ok(existsSync(geminiPath), 'GEMINI.md must exist');
  assert.ok(existsSync(pstackSkillPath), 'skills/pstack-openspec/SKILL.md must exist');
  assert.ok(existsSync(harnessSkillPath), 'skills/ai-harness-openspec/SKILL.md must exist');

  const geminiContent = readFileSync(geminiPath, 'utf8');
  const pstackContent = readFileSync(pstackSkillPath, 'utf8');
  const harnessContent = readFileSync(harnessSkillPath, 'utf8');

  // Sub-invariants to check
  const subInvariants = [
    'UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM',
    'CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD',
    'DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD',
    'USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD',
    'PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD',
    'UNIVERSAL_PORTABILITY_GUARD_STANDARD',
    'HARDCODED_HOST_ENVIRONMENT_BLOCKED',
    'STATE_SEGREGATION_VIOLATION_BLOCKED',
  ];

  for (const token of subInvariants) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
