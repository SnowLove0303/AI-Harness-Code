import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  verifyActiveNonMechanicalAndAntiRecurrence,
  verifyZeroSimplificationBetweenGates,
} from '../scripts/check-issue-clearance.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Blocks Gate 1 -> Gate 2 issue deletion, ellipsis truncation, and severe shrinkage', () => {
  const gate1 = [
    { id: '[ISSUE-01]', description: 'Parser drops trailing semicolon when input spans multiple lines in strict mode' },
    { id: '[ISSUE-02]', description: 'Exporter fails to preserve UTF-8 header metadata during cross-host serialization' },
  ];

  const omittedGate2 = [gate1[0]];
  const resOmit = verifyZeroSimplificationBetweenGates(gate1, omittedGate2);
  assert.equal(resOmit.valid, false);
  assert.ok(resOmit.violations.some((v) => v.code === 'ISSUE_GATE_SIMPLIFICATION_BLOCKED' && v.issueId === '[ISSUE-02]'));

  const ellipsisGate2 = [
    gate1[0],
    { id: '[ISSUE-02]', description: 'Exporter fails on UTF-8 等类似' },
  ];
  const resEllipsis = verifyZeroSimplificationBetweenGates(gate1, ellipsisGate2);
  assert.equal(resEllipsis.valid, false);

  const shrunkGate2 = [
    gate1[0],
    { id: '[ISSUE-02]', description: 'UTF-8 fix' },
  ];
  const resShrunk = verifyZeroSimplificationBetweenGates(gate1, shrunkGate2);
  assert.equal(resShrunk.valid, false);

  const preservedGate2 = [...gate1];
  assert.equal(verifyZeroSimplificationBetweenGates(gate1, preservedGate2).valid, true);
});

test('2. Blocks issue closure relying solely on mechanical exit code without active real-output observation', () => {
  const mechanicalOnly = [
    {
      id: '[ISSUE-01]',
      activeObservation: 'Exit Code 0',
      antiRecurrenceDefense: { tier: 'L2_GUARD', targetRef: 'tests/parser.test.mjs' },
    },
  ];
  const res = verifyActiveNonMechanicalAndAntiRecurrence(mechanicalOnly);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED'));
});

test('3. Blocks issue closure lacking structured four-tier anti-recurrence defense', () => {
  const proseDefense = [
    {
      id: '[ISSUE-01]',
      activeObservation: 'Inspected dist/output.json line 12: trailing semicolon preserved intact',
      antiRecurrenceDefense: { tier: 'PROSE_PROMISE', targetRef: 'Will be careful next time' },
    },
  ];
  const res = verifyActiveNonMechanicalAndAntiRecurrence(proseDefense);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED'));
});

test('4. Passes when active non-mechanical observation and structural anti-recurrence defense are provided', () => {
  const compliant = [
    {
      id: '[ISSUE-01]',
      activeObservation: 'Inspected final rendered output at dist/output.json#L12: UTF-8 header intact',
      antiRecurrenceDefense: { tier: 'L2_GUARD', targetRef: 'scripts/check-issue-clearance.mjs' },
    },
  ];
  const res = verifyActiveNonMechanicalAndAntiRecurrence(compliant);
  assert.equal(res.valid, true, `Unexpected violations: ${JSON.stringify(res.violations)}`);
});

test('5. Axiom 75 is codified identically across all three constitutional mirrors', () => {
  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM',
    'STRICT_ATOMIC_PROBLEM_LOGGING_MANDATE',
    'DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION',
    'ISSUE_SEMANTIC_FIDELITY_PRESERVATION_GUARD',
    'ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION',
    'ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL',
    'FOUR_TIER_ANTI_RECURRENCE_TAXONOMY',
    'GRAPH_COUPLED_PRE_FIX_RECALL_STANDARD',
    'GITHUB_FIRST_BENCHMARKING_MANDATE',
    'AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'ISSUE_GATE_SIMPLIFICATION_BLOCKED',
    'ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED',
    'ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
