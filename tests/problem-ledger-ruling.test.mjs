import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import {
  AXIOM_80_REQUIRED_TOKENS,
  mergeProblemLedgerDelta,
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

test('validateProblemLedgerRuling passes when 100% of items have explicit final rulings', () => {
  const ledger = [
    { id: '1', status: 'approved_fix', disposition: 'fix' },
    { id: '2', status: 'approved_fix', disposition: 'fix' },
    { id: '3', status: 'deferred', disposition: 'defer_to_next_sprint' },
    { id: '4', status: 'waived', disposition: 'accepted_risk' },
  ];
  const res = validateProblemLedgerRuling(ledger, ledger);
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
