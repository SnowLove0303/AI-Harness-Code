import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import {
  AXIOM_80_REQUIRED_TOKENS,
  mergeProblemLedgerDelta,
  validatePostTaskLedgerProofread,
  validateProblemLedgerRuling,
} from '../scripts/check-problem-ledger-ruling.mjs';

const REPO_ROOT = process.cwd();

test('mergeProblemLedgerDelta preserves all prior items and appends supplements incrementally', () => {
  const prev = [
    { id: '1', summary: 'Issue 1', status: 'pending_ruling' },
    { id: '2', summary: 'Issue 2', status: 'pending_ruling' },
    { id: '3', summary: 'Issue 3', status: 'pending_ruling' },
    { id: '4', summary: 'Issue 4', status: 'pending_ruling' },
  ];
  const merged = mergeProblemLedgerDelta(prev, [
    { id: '2', supplement: 'User clarified root context', explanationProvided: true },
    { id: '5', summary: 'New Issue 5' },
  ]);

  assert.equal(merged.length, 5);
  assert.deepEqual(
    merged.map((x) => x.id),
    ['1', '2', '3', '4', '5']
  );
  assert.deepEqual(merged[1].supplements, ['User clarified root context']);
});

test('validateProblemLedgerRuling blocks replacement/drop of prior ledger items', () => {
  const prev = [
    { id: '1', status: 'pending_ruling' },
    { id: '2', status: 'pending_ruling' },
    { id: '3', status: 'pending_ruling' },
    { id: '4', status: 'pending_ruling' },
  ];
  const replaced = [{ id: '2', status: 'approved_fix', disposition: 'fix' }];
  const res = validateProblemLedgerRuling(replaced, prev);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED'));
});

test('validateProblemLedgerRuling blocks partial ruling on item 2 and returns 1,3,4 for counter-questioning', () => {
  const ledger = [
    { id: '1', status: 'pending_ruling' },
    { id: '2', status: 'approved_fix', disposition: 'fix_in_place' },
    { id: '3', status: 'pending_ruling' },
    { id: '4', status: 'pending_ruling' },
  ];
  const res = validateProblemLedgerRuling(ledger);
  assert.equal(res.valid, false);
  assert.deepEqual(res.pendingIds, ['1', '3', '4']);
  assert.ok(res.violations.some((v) => v.code === 'UNRULING_LEDGER_ITEMS_PENDING_BLOCKED'));
});

test('validateProblemLedgerRuling blocks explained item lacking explicit disposition', () => {
  const ledger = [
    { id: '1', status: 'approved_fix', disposition: 'fix' },
    { id: '2', status: 'pending_ruling', explanationProvided: true, disposition: '' },
  ];
  const res = validateProblemLedgerRuling(ledger);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED'));
});

test('validateProblemLedgerRuling blocks bundled multi-defect IDs (One-Defect-One-ID)', () => {
  const bundledLedger = [
    {
      id: 'ISSUE-04',
      status: 'waived',
      waiverRationale: 'Topology rule',
      subIssues: ['sub-a: topology subheader', 'sub-b: missing colon'],
    },
  ];
  const res = validateProblemLedgerRuling(bundledLedger);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'BUNDLED_ISSUE_ID_BLOCKED'));
});

test('validateProblemLedgerRuling blocks non-zero set difference when multi-turn rewrite drops source atomic ID', () => {
  const sourceAtomicIds = ['ISSUE-01', 'ISSUE-02', 'ISSUE-03', 'ISSUE-04a', 'ISSUE-04b', 'ISSUE-07'];
  const driftedLedger = [
    { id: 'ISSUE-01', status: 'approved_fix', disposition: 'fix' },
    { id: 'ISSUE-02', status: 'approved_fix', disposition: 'fix' },
    { id: 'ISSUE-03', status: 'approved_fix', disposition: 'fix' },
    { id: 'ISSUE-04a', status: 'waived', waiverRationale: 'Topology supersedes content' },
    { id: 'ISSUE-04b', status: 'approved_fix', disposition: 'fix' },
    // ISSUE-07 silently evaporated after focusing on ISSUE-02
  ];
  const res = validateProblemLedgerRuling(driftedLedger, null, { sourceAtomicIds });
  assert.equal(res.valid, false);
  assert.deepEqual(res.missingFromSourceIds, ['ISSUE-07']);
  assert.ok(res.violations.some((v) => v.code === 'LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED'));
});

test('validateProblemLedgerRuling blocks waived atomic item without explicit waiverRationale and preserves unruled sibling', () => {
  const ledger = [
    { id: 'ISSUE-04a', status: 'waived', waiverRationale: '' },
    { id: 'ISSUE-04b', status: 'pending_ruling' },
  ];
  const res = validateProblemLedgerRuling(ledger);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED'));
  assert.deepEqual(res.pendingIds, ['ISSUE-04b']);
});

test('validateProblemLedgerRuling passes when 100% of atomic source items have explicit rulings', () => {
  const sourceAtomicIds = ['1', '2', '3', '4a', '4b'];
  const ledger = [
    { id: '1', status: 'approved_fix', disposition: 'fix' },
    { id: '2', status: 'approved_fix', disposition: 'fix' },
    { id: '3', status: 'deferred', disposition: 'defer_to_next_sprint' },
    { id: '4a', status: 'waived', waiverRationale: 'Canonical topology overrides' },
    { id: '4b', status: 'approved_fix', disposition: 'fix_colon' },
  ];
  const res = validateProblemLedgerRuling(ledger, ledger, { sourceAtomicIds });
  assert.equal(res.valid, true);
  assert.equal(res.violations.length, 0);
});

test('Axiom 80 parity across GEMINI.md, pstack-openspec, ai-harness-openspec, and worker.md', () => {
  for (const relPath of ['GEMINI.md', 'skills/pstack-openspec/SKILL.md', 'skills/ai-harness-openspec/SKILL.md']) {
    const content = readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    for (const token of AXIOM_80_REQUIRED_TOKENS) {
      assert.ok(content.includes(token), `${relPath} missing Axiom 80 token: ${token}`);
    }
  }
});

test('validatePostTaskLedgerProofread blocks completion when non-excluded initial issue is not resolved', () => {
  const sourceAtomicIds = ['1', '2', '3', '4'];
  const ledger = [
    { id: '1', status: 'resolved' },
    { id: '2', status: 'resolved' },
    { id: '3', status: 'approved_fix', disposition: 'fix' },
    { id: '4', status: 'waived', waiverRationale: 'Interactively excluded by user' },
  ];
  const res = validatePostTaskLedgerProofread(ledger, { sourceAtomicIds });
  assert.equal(res.valid, false);
  assert.deepEqual(res.unresolvedIds, ['3']);
  assert.ok(res.violations.some((v) => v.code === 'POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED'));
});

test('validatePostTaskLedgerProofread passes when all initial issues are resolved or interactively excluded', () => {
  const sourceAtomicIds = ['1', '2', '3', '4'];
  const ledger = [
    { id: '1', status: 'resolved' },
    { id: '2', status: 'resolved' },
    { id: '3', status: 'deferred', exclusionRationale: 'User deferred to next release' },
    { id: '4', status: 'waived', waiverRationale: 'Interactively excluded by user' },
  ];
  const res = validatePostTaskLedgerProofread(ledger, { sourceAtomicIds });
  assert.equal(res.valid, true);
  assert.equal(res.violations.length, 0);
});
