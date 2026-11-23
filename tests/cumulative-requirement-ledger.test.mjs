import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  checkGraphCoupledRegressions,
  mergeLedgerDelta,
  validateLedgerContinuity,
} from '../scripts/check-ledger-continuity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Multi-turn ledger merge preserves conservation and blocks silent drops (REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED)', () => {
  const v1 = {
    schemaVersion: '1.0.0',
    ledgerVersion: 1,
    baselineConfirmed: true,
    entries: [
      { id: 'REQ-01a', turn: 1, status: 'ACTIVE', verified: true, verificationEvidence: 'pass-1a' },
      { id: 'REQ-01b', turn: 1, status: 'ACTIVE', verified: true, verificationEvidence: 'pass-1b' },
    ],
  };

  // Valid incremental merge with explicit supersession
  const v2Valid = mergeLedgerDelta(
    v1,
    [
      {
        id: 'REQ-02a',
        turn: 2,
        supersedes: 'REQ-01b',
        verified: true,
        verificationEvidence: 'pass-2a',
      },
    ],
    { baselineConfirmed: true }
  );

  assert.equal(v2Valid.ledgerVersion, 2);
  assert.equal(v2Valid.entries.find((e) => e.id === 'REQ-01b').status, 'SUPERSEDED');
  assert.equal(validateLedgerContinuity(v2Valid, v1).valid, true);

  // Silent drop of REQ-01a triggers conservation violation
  const v2Broken = {
    schemaVersion: '1.0.0',
    ledgerVersion: 2,
    baselineConfirmed: true,
    entries: [{ id: 'REQ-01b', turn: 1, status: 'ACTIVE', verified: true, verificationEvidence: 'pass-1b' }],
  };
  const dropResult = validateLedgerContinuity(v2Broken, v1);
  assert.equal(dropResult.valid, false);
  assert.ok(dropResult.violations.some((v) => v.code === 'REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED'));
});

test('2. Lossy aggregation of compound defects is blocked (LOSSY_REQUIREMENT_AGGREGATION_BLOCKED)', () => {
  const bundledLedger = {
    schemaVersion: '1.0.0',
    ledgerVersion: 1,
    baselineConfirmed: true,
    entries: [
      {
        id: 'REQ-BUNDLE',
        turn: 1,
        status: 'ACTIVE',
        bundledItems: ['defect-1', 'defect-2', 'defect-3'],
        verified: true,
        verificationEvidence: 'partial-pass',
      },
    ],
  };

  const result = validateLedgerContinuity(bundledLedger);
  assert.equal(result.valid, false);
  assert.ok(result.violations.some((v) => v.code === 'LOSSY_REQUIREMENT_AGGREGATION_BLOCKED'));
});

test('3. Unconfirmed multi-turn scope drift blocks implementation (RE_GATING_REQUIRED_BLOCKED)', () => {
  const v1 = {
    schemaVersion: '1.0.0',
    ledgerVersion: 1,
    baselineConfirmed: true,
    entries: [{ id: 'REQ-01a', turn: 1, status: 'ACTIVE', verified: true, verificationEvidence: 'ok' }],
  };

  // Turn 2 adds a new requirement without user re-confirmation (baselineConfirmed defaults to false)
  const v2Pending = mergeLedgerDelta(v1, [{ id: 'REQ-02a', turn: 2, verified: false }]);
  const result = validateLedgerContinuity(v2Pending, v1, { requireVerified: false });
  assert.equal(result.valid, false);
  assert.ok(result.violations.some((v) => v.code === 'RE_GATING_REQUIRED_BLOCKED'));
});

test('4. End-to-end checkoff blocks delivery when active requirements lack verified evidence (CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED)', () => {
  const unverifiedLedger = {
    schemaVersion: '1.0.0',
    ledgerVersion: 2,
    baselineConfirmed: true,
    entries: [
      { id: 'REQ-01a', turn: 1, status: 'ACTIVE', verified: true, verificationEvidence: 'exit-0' },
      { id: 'REQ-02a', turn: 2, status: 'ADDED', verified: false, verificationEvidence: '' },
    ],
  };

  const result = validateLedgerContinuity(unverifiedLedger);
  assert.equal(result.valid, false);
  assert.ok(result.violations.some((v) => v.code === 'CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED'));
});

test('5. Graph-coupled multi-turn regression flags earlier active requirements on shared module edits', () => {
  const ledger = {
    schemaVersion: '1.0.0',
    ledgerVersion: 2,
    baselineConfirmed: true,
    entries: [
      { id: 'REQ-01a', turn: 1, graphModuleId: 'mod-parser', status: 'ACTIVE', verified: true, verificationEvidence: 'ok' },
      { id: 'REQ-01b', turn: 1, graphModuleId: 'mod-renderer', status: 'ACTIVE', verified: true, verificationEvidence: 'ok' },
      { id: 'REQ-01c', turn: 1, graphModuleId: 'mod-parser', status: 'SUPERSEDED', verified: false },
    ],
  };

  const impacted = checkGraphCoupledRegressions(ledger, ['mod-parser']);
  assert.deepEqual(impacted, ['REQ-01a']);
});

test('6. Repository .harness/requirement-ledger.json passes continuity check and Axiom 71 parity across three mirrors', () => {
  const ledgerPath = path.join(repoRoot, '.harness', 'requirement-ledger.json');
  assert.ok(existsSync(ledgerPath), '.harness/requirement-ledger.json must exist');
  const repoLedger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
  const validation = validateLedgerContinuity(repoLedger);
  assert.equal(validation.valid, true, `Ledger violations: ${JSON.stringify(validation.violations)}`);

  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM',
    'CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL',
    'ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD',
    'SCOPE_DRIFT_RE_GATING_MANDATE',
    'END_TO_END_CUMULATIVE_CHECKOFF_STANDARD',
    'AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD',
    'EXPLICIT_SUPERSESSION_&_CONFLICT_DETECTION_STANDARD',
    'GRAPH_COUPLED_MULTI_TURN_REGRESSION_STANDARD',
    'AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED',
    'LOSSY_REQUIREMENT_AGGREGATION_BLOCKED',
    'RE_GATING_REQUIRED_BLOCKED',
    'CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
