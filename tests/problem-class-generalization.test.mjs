import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import {
  scanCodeForSpecialCasing,
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

test('Axiom 78 parity across GEMINI.md, pstack-openspec, ai-harness-openspec, and worker.md', () => {
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
    'GEMINI.md',
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
