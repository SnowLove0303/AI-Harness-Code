import assert from 'node:assert/strict';
import test from 'node:test';

import {
  auditProtectedChanges,
  mergeProtectedInvariants,
  parseProtectedInvariants,
} from '../audit-protected-invariants.mjs';

const invariantSpec = `### Requirement: INV-PROTECTED-CACHE-ORDER Cache ordering stays stable
Protected behavior metadata.
**Invariant ID:** \`INV-PROTECTED-CACHE-ORDER\`
**Origin:** \`openspec/changes/archive/2026-10-01-fix-cache-ordering/\`, commit \`123abc\`
**Code anchors:** \`src/cache/order.ts#stableOrder\`
**Expected behavior:** The cache returns items in the existing stable order.
**Regression checks:** \`node --test scripts/tests/cache-order.test.mjs\`

#### Scenario: Stable order is preserved
- **WHEN** equal keys are present
- **THEN** the original stable ordering remains
`;

function metadata(action = 'preserve', checks = ['node --test scripts/tests/cache-order.test.mjs']) {
  return {
    taskId: '4.2',
    invariantActions: [{id: 'INV-PROTECTED-CACHE-ORDER', action, checks}],
  };
}

test('parses invariant identity, provenance, anchor, behavior, and regression evidence', () => {
  const [invariant] = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');

  assert.equal(invariant.id, 'INV-PROTECTED-CACHE-ORDER');
  assert.equal(invariant.anchors[0].path, 'src/cache/order.ts');
  assert.equal(invariant.anchors[0].symbol, 'stableOrder');
  assert.equal(invariant.checks[0], 'node --test scripts/tests/cache-order.test.mjs');
});

test('allows a touched invariant only when the OpenSpec task preserves it with the required check', () => {
  const invariants = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');

  const result = auditProtectedChanges({
    invariants,
    metadata: metadata(),
    changedPaths: ['src/cache/order.ts'],
    activeSpecText: '',
  });
  assert.equal(result.affected[0].id, 'INV-PROTECTED-CACHE-ORDER');
});

test('rejects an affected invariant with no explicit disposition', () => {
  const invariants = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');

  assert.throws(() => auditProtectedChanges({
    invariants,
    metadata: {taskId: '4.2', invariantActions: []},
    changedPaths: ['src/cache/order.ts'],
    activeSpecText: '',
  }), /no preserve or supersede action/i);
});

test('requires a superseding OpenSpec requirement and replacement check', () => {
  const invariants = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');
  const replacementSpec = `### Requirement: Cache order replacement
**Supersedes:** \`INV-PROTECTED-CACHE-ORDER\`
**Expected behavior:** The cache now sorts by explicit priority.
**Regression checks:** \`node --test scripts/tests/cache-order-replacement.test.mjs\`
`;

  assert.throws(() => auditProtectedChanges({
    invariants,
    metadata: metadata('supersede', ['node --test scripts/tests/cache-order-replacement.test.mjs']),
    changedPaths: ['src/cache/order.ts'],
    activeSpecText: '### Requirement: Cache order replacement\n**Supersedes:** `INV-PROTECTED-CACHE-ORDER`',
  }), /has no expected behavior/i);

  assert.throws(() => auditProtectedChanges({
    invariants,
    metadata: metadata('supersede', ['node --test scripts/tests/cache-order-other.test.mjs']),
    changedPaths: ['src/cache/order.ts'],
    activeSpecText: replacementSpec,
  }), /does not record replacement checks/i);

  const result = auditProtectedChanges({
    invariants,
    metadata: metadata('supersede', ['node --test scripts/tests/cache-order-replacement.test.mjs']),
    changedPaths: ['src/cache/order.ts'],
    activeSpecText: replacementSpec,
  });
  assert.equal(result.affected[0].action, 'supersede');
});

test('unrelated paths do not acquire unrelated protection gates', () => {
  const invariants = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');
  const result = auditProtectedChanges({
    invariants,
    metadata: {taskId: '4.2', invariantActions: []},
    changedPaths: ['src/ui/button.ts'],
    activeSpecText: '',
  });

  assert.deepEqual(result.affected, []);
});

test('active delta invariant records replace their synced main-spec version', () => {
  const [mainRecord] = parseProtectedInvariants(invariantSpec.replace('existing stable order', 'old stable order'), 'openspec/specs/cache/spec.md');
  const [deltaRecord] = parseProtectedInvariants(invariantSpec, 'openspec/changes/change/specs/cache/spec.md');
  const merged = mergeProtectedInvariants([mainRecord], [deltaRecord]);

  assert.equal(merged.length, 1);
  assert.equal(merged[0].sourcePath, 'openspec/changes/change/specs/cache/spec.md');
});

test('duplicate invariant IDs in independent main specs remain an error', () => {
  const [first] = parseProtectedInvariants(invariantSpec, 'openspec/specs/cache/spec.md');
  const [second] = parseProtectedInvariants(invariantSpec, 'openspec/specs/other-cache/spec.md');

  assert.throws(() => mergeProtectedInvariants([first, second], []), /duplicate invariant id in main specs/i);
});
