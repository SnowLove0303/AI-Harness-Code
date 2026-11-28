import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  auditFilesForHardcoding,
  classifyMutationBoundary,
  scanCodeForSpecialCasing,
  scanForStaticDataEmbedding,
  validateGeneralizationEvidence,
} from '../scripts/check-anti-hardcoding.mjs';

const REPO_ROOT = process.cwd();

test('scanCodeForSpecialCasing blocks instance-specific literal overfitting', () => {
  const dirty = `
    export function resolveItem(item) {
      if (item.id === 'ticket-1042') {
        return 'override';
      }
      return item.defaultValue;
    }
  `;
  const res = scanCodeForSpecialCasing(dirty, 'sample.mjs');
  assert.equal(res.valid, false);
  assert.ok(
    res.violations.some((v) => v.code === 'SPECIAL_CASE_OVERFITTING_BLOCKED'),
    'Must emit SPECIAL_CASE_OVERFITTING_BLOCKED for instance-specific literal branch'
  );
});

test('scanCodeForSpecialCasing requires table-driven refactoring at >=3 literal branches', () => {
  const branchChain = `
    export function mapMode(mode) {
      if (mode === 'alpha') return 1;
      else if (mode === 'beta') return 2;
      else if (mode === 'gamma') return 3;
      return 0;
    }
  `;
  const res = scanCodeForSpecialCasing(branchChain, 'modes.mjs');
  assert.equal(res.valid, false);
  assert.ok(
    res.violations.some((v) => v.code === 'TABLE_DRIVEN_REFACTOR_REQUIRED'),
    'Must emit TABLE_DRIVEN_REFACTOR_REQUIRED when >=3 literal branches exist'
  );
});

test('scanCodeForSpecialCasing accepts clean table-driven parameterized dispatch', () => {
  const clean = `
    const MODE_TABLE = new Map([['alpha', 1], ['beta', 2], ['gamma', 3]]);
    export function mapMode(mode) {
      return MODE_TABLE.get(mode) ?? 0;
    }
  `;
  const res = scanCodeForSpecialCasing(clean, 'clean.mjs');
  assert.equal(res.valid, true);
  assert.equal(res.violations.length, 0);
});

test('validateGeneralizationEvidence enforces problemClass, analogousSitesChecked, and >=2 orthogonalVariants', () => {
  const missingClass = validateGeneralizationEvidence({
    problemClass: '',
    analogousSitesChecked: null,
    orthogonalVariants: ['variant-a', 'variant-b'],
  });
  assert.equal(missingClass.valid, false);
  assert.ok(
    missingClass.violations.some((v) => v.code === 'PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED')
  );

  const deficitVariants = validateGeneralizationEvidence({
    problemClass: 'Boundary null-coalescing across state transitions',
    analogousSitesChecked: ['src/a.mjs', 'src/b.mjs'],
    orthogonalVariants: ['single-variant-only'],
  });
  assert.equal(deficitVariants.valid, false);
  assert.ok(
    deficitVariants.violations.some((v) => v.code === 'VARIANT_QUOTA_DEFICIT_BLOCKED')
  );

  const validRecord = validateGeneralizationEvidence({
    problemClass: 'Boundary null-coalescing across state transitions',
    analogousSitesChecked: ['src/a.mjs', 'src/b.mjs'],
    orthogonalVariants: ['empty-input-variant', 'concurrent-mutation-variant'],
  });
  assert.equal(validRecord.valid, true);
  assert.equal(validRecord.violations.length, 0);
});

test('Axiom 78 parity across operating-invariants-full, pstack-openspec, ai-harness-openspec, and worker.md', () => {
  const requiredTokens = [
    'UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM',
    'PROBLEM_CLASS_ABSTRACTION_MANDATE',
    'ANALOGOUS_PATTERN_SWEEP_MANDATE',
    'ANTI_SPECIAL_CASING_GENERALIZATION_STANDARD',
    'TABLE_DRIVEN_REFACTOR_TRIGGER_THRESHOLD',
    'PROPERTY_BASED_VARIANT_QUOTA_STANDARD',
    'AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD',
    'AXIOM_78_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'SPECIAL_CASE_OVERFITTING_BLOCKED',
    'TABLE_DRIVEN_REFACTOR_REQUIRED',
    'PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED',
    'VARIANT_QUOTA_DEFICIT_BLOCKED',
  ];

  const mirrorFiles = [
    'skills/pstack-openspec/references/operating-invariants-full.md',
    'skills/pstack-openspec/SKILL.md',
    'skills/ai-harness-openspec/SKILL.md',
  ];

  for (const relPath of mirrorFiles) {
    const content = readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    for (const token of requiredTokens) {
      assert.ok(content.includes(token), `${relPath} missing Axiom 78 token: ${token}`);
    }
  }

  const workerContent = readFileSync(path.join(REPO_ROOT, 'worker.md'), 'utf8');
  for (const token of [
    'UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM',
    'PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED',
    'SPECIAL_CASE_OVERFITTING_BLOCKED',
    'TABLE_DRIVEN_REFACTOR_REQUIRED',
    'VARIANT_QUOTA_DEFICIT_BLOCKED',
  ]) {
    assert.ok(workerContent.includes(token), `worker.md missing token: ${token}`);
  }
});

test('classifyMutationBoundary enforces Red-Light / Green-Light rules across Class A-D', () => {
  const classAEngine = classifyMutationBoundary({
    problemClass: 'A',
    targetCategory: 'engine_primitive',
  });
  assert.equal(classAEngine.allowed, false);
  assert.equal(classAEngine.zone, 'red');
  assert.equal(classAEngine.code, 'INSTANCE_DATA_IN_ENGINE_BLOCKED');

  const classBSchema = classifyMutationBoundary({
    problemClass: 'B',
    targetCategory: 'pluggable_schema',
  });
  assert.equal(classBSchema.allowed, true);
  assert.equal(classBSchema.zone, 'green');

  const classCAcl = classifyMutationBoundary({
    problemClass: 'C',
    targetCategory: 'acl',
  });
  assert.equal(classCAcl.allowed, true);
  assert.equal(classCAcl.zone, 'yellow');

  const classDEngine = classifyMutationBoundary({
    problemClass: 'D',
    targetCategory: 'engine_primitive',
  });
  assert.equal(classDEngine.allowed, true);
  assert.equal(classDEngine.zone, 'green');

  const protocolInvariant = classifyMutationBoundary({
    problemClass: 'D',
    targetCategory: 'protocol_invariant',
  });
  assert.equal(protocolInvariant.allowed, true);
  assert.equal(protocolInvariant.code, 'PROTOCOL_INVARIANT_WHITELISTED');
});

test('scanForStaticDataEmbedding flags large embedded static maps while allowing schemas and protocol allowlists', () => {
  const embeddedMap = `
    const FIELD_MAP = {
      'field_a': 'col_1',
      'field_b': 'col_2',
      'field_c': 'col_3',
      'field_d': 'col_4',
      'field_e': 'col_5',
      'field_f': 'col_6',
      'field_g': 'col_7',
      'field_h': 'col_8'
    };
  `;
  const dirtyRes = scanForStaticDataEmbedding(embeddedMap, 'src/parser.mjs');
  assert.equal(dirtyRes.valid, false);
  assert.equal(dirtyRes.violations[0].code, 'STATIC_DATA_EMBEDDING_DETECTED');

  const schemaRes = scanForStaticDataEmbedding(embeddedMap, 'schemas/default-map.mjs');
  assert.equal(schemaRes.valid, true);

  const allowlistedRes = scanForStaticDataEmbedding(
    `// @PROTOCOL_INVARIANT_ALLOWLIST\n${embeddedMap}`,
    'src/protocol.mjs'
  );
  assert.equal(allowlistedRes.valid, true);
});

test('auditFilesForHardcoding audits changed source files while exempting external schemas', () => {
  const tmpRoot = mkdtempSync(path.join(os.tmpdir(), 'hardcoding-audit-'));
  try {
    mkdirSync(path.join(tmpRoot, 'src'), { recursive: true });
    mkdirSync(path.join(tmpRoot, 'schemas'), { recursive: true });

    const dirtyEngine = `
      const TEMPLATE_FIELDS = ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'];
      export function parse() { return TEMPLATE_FIELDS; }
    `;
    writeFileSync(path.join(tmpRoot, 'src', 'engine.mjs'), dirtyEngine, 'utf8');
    writeFileSync(path.join(tmpRoot, 'schemas', 'template.mjs'), dirtyEngine, 'utf8');

    const blocked = auditFilesForHardcoding(['src/engine.mjs'], tmpRoot);
    assert.equal(blocked.valid, false);
    assert.equal(blocked.scanned, 1);
    assert.equal(blocked.violations[0].code, 'STATIC_DATA_EMBEDDING_DETECTED');

    const schemaClean = auditFilesForHardcoding(['schemas/template.mjs'], tmpRoot);
    assert.equal(schemaClean.valid, true);
    assert.equal(schemaClean.scanned, 0);
  } finally {
    rmSync(tmpRoot, { recursive: true, force: true });
  }
});
