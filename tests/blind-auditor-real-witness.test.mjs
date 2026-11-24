import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateBlindAuditTrail } from '../scripts/check-blind-audit.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Self-audit by implementing agent is blocked (SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED)', () => {
  const selfAudit = {
    executorId: 'agent-1',
    auditorId: 'agent-1',
    mechanicalPassed: true,
    witnesses: [
      { requirementId: 'REQ-1', artifactPath: 'dist/out.js', observedSlice: 'export function run()', verdict: 'PASS' },
    ],
    adversarialProbes: [{ probeName: 'null-input', outcome: 'throws TypeError' }],
  };

  const res = validateBlindAuditTrail(selfAudit);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED'));
});

test('2. Proxy-only audit evidence is rejected (PROXY_ONLY_AUDIT_REJECTED)', () => {
  const proxyAudit = {
    executorId: 'agent-1',
    auditorId: 'blind-agent-2',
    mechanicalPassed: true,
    witnesses: [
      { requirementId: 'REQ-1', artifactPath: 'dist/out.js', observedSlice: 'Exit Code 0', verdict: 'PASS' },
    ],
    adversarialProbes: [{ probeName: 'edge-check', outcome: 'handled' }],
  };

  const res = validateBlindAuditTrail(proxyAudit);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'PROXY_ONLY_AUDIT_REJECTED'));
});

test('3. Missing adversarial probes triggers ADVERSARIAL_PROBE_MISSING_BLOCKED', () => {
  const passiveAudit = {
    executorId: 'agent-1',
    auditorId: 'blind-agent-2',
    mechanicalPassed: true,
    witnesses: [
      { requirementId: 'REQ-1', artifactPath: 'dist/out.js', observedSlice: 'const limit = 100;', verdict: 'PASS' },
    ],
    adversarialProbes: [],
  };

  const res = validateBlindAuditTrail(passiveAudit);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'ADVERSARIAL_PROBE_MISSING_BLOCKED'));
});

test('4. Green mechanical check with real-artifact defect requires mechanical escalation guard', () => {
  const unmitigatedBlindSpot = {
    executorId: 'agent-1',
    auditorId: 'blind-agent-2',
    mechanicalPassed: true,
    witnesses: [
      {
        requirementId: 'REQ-2',
        artifactPath: 'dist/out.js',
        observedSlice: 'rendered output truncated at column 4',
        verdict: 'FAIL',
      },
    ],
    adversarialProbes: [{ probeName: 'real-output-inspection', outcome: 'detected truncation' }],
  };

  const blocked = validateBlindAuditTrail(unmitigatedBlindSpot);
  assert.equal(blocked.valid, false);
  assert.ok(blocked.violations.some((v) => v.code === 'MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED'));

  unmitigatedBlindSpot.witnesses[0].mechanicalEscalationGuard = 'tests/truncation-regression.test.mjs';
  const mitigated = validateBlindAuditTrail(unmitigatedBlindSpot);
  assert.equal(mitigated.valid, true);
});

test('5. Repository .harness/blind-audit-trail.json passes validation and Axiom 74 parity across three mirrors', () => {
  const trailPath = path.join(repoRoot, '.harness', 'blind-audit-trail.json');
  assert.ok(existsSync(trailPath), '.harness/blind-audit-trail.json must exist');
  const trail = JSON.parse(readFileSync(trailPath, 'utf8'));
  const res = validateBlindAuditTrail(trail);
  assert.equal(res.valid, true, `Trail violations: ${JSON.stringify(res.violations)}`);

  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM',
    'BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE',
    'REAL_ARTIFACT_WITNESS_MANDATE',
    'STRUCTURED_REAL_ARTIFACT_TRAIL_STANDARD',
    'ADVERSARIAL_FALSIFICATION_&_ACCOUNTABILITY_PROTOCOL',
    'ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL',
    'AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD',
    'AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED',
    'PROXY_ONLY_AUDIT_REJECTED',
    'ADVERSARIAL_PROBE_MISSING_BLOCKED',
    'MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
