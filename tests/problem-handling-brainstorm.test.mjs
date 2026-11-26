import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import {
  AXIOM_79_REQUIRED_TOKENS,
  validateProblemBrainstormRecord,
} from '../scripts/check-problem-brainstorm.mjs';

const REPO_ROOT = process.cwd();

test('validateProblemBrainstormRecord blocks skipped brainstorm dimensions', () => {
  const res = validateProblemBrainstormRecord({
    symptomToSystemicRootCause: '',
    universalPrinciple: 'Separation of deterministic scripts and cognitive gates',
    analogousBlastRadius: ['stage-b'],
    multiTierOptions: ['L1 gate', 'L2 guard'],
    controlPlaneBoundaryCheck: 'Checked',
    selectedTier: 'L1',
    historicalCounterexampleProven: true,
  });
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'BRAINSTORM_LAYER_SKIPPED_BLOCKED'));
});

test('validateProblemBrainstormRecord blocks unattended mechanical semantic pipelines', () => {
  const res = validateProblemBrainstormRecord({
    symptomToSystemicRootCause: 'Script emitted final artifact without semantic checkpoint',
    universalPrinciple: 'Agent Cognitive Gate before persistence',
    analogousBlastRadius: ['pipeline-a'],
    multiTierOptions: ['L1 cognitive gate'],
    controlPlaneBoundaryCheck: 'Unattended script on semantic stage',
    unattendedMechanicalSemanticPipeline: true,
    agentCognitiveGateAdded: false,
    selectedTier: 'L1',
    historicalCounterexampleProven: true,
  });
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED'));
});

test('validateProblemBrainstormRecord blocks unjustified tier downgrade and unproven historical counterexample', () => {
  const res = validateProblemBrainstormRecord({
    symptomToSystemicRootCause: 'Missing boundary validation',
    universalPrinciple: 'Boundary Discipline',
    analogousBlastRadius: ['module-x'],
    multiTierOptions: ['L2 static guard'],
    controlPlaneBoundaryCheck: 'Verified',
    selectedTier: 'L2',
    higherTierRejectionReason: '',
    historicalCounterexampleProven: false,
  });
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED'));
  assert.ok(res.violations.some((v) => v.code === 'HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED'));
});

test('validateProblemBrainstormRecord blocks >=2 consecutive failures without premise falsification', () => {
  const res = validateProblemBrainstormRecord({
    symptomToSystemicRootCause: 'Repeated failure on same premise',
    universalPrinciple: 'Attack the Premise',
    analogousBlastRadius: ['module-y'],
    multiTierOptions: ['L1 redesign'],
    controlPlaneBoundaryCheck: 'Verified',
    selectedTier: 'L1',
    historicalCounterexampleProven: true,
    consecutiveFailures: 2,
    premiseFalsified: false,
  });
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'BRAINSTORM_LAYER_SKIPPED_BLOCKED'));
});

test('validateProblemBrainstormRecord accepts complete L1 brainstorm record with cognitive gate', () => {
  const res = validateProblemBrainstormRecord({
    symptomToSystemicRootCause: 'Unattended script bypassed semantic verification',
    universalPrinciple: 'Deterministic execution vs cognitive judgment separation',
    analogousBlastRadius: ['pipeline-a', 'pipeline-b'],
    multiTierOptions: ['L1 cognitive gate', 'L2 static guard'],
    controlPlaneBoundaryCheck: 'Added mandatory Agent Cognitive Gate before persistence',
    unattendedMechanicalSemanticPipeline: true,
    agentCognitiveGateAdded: true,
    selectedTier: 'L1',
    historicalCounterexampleProven: true,
    consecutiveFailures: 2,
    premiseFalsified: true,
  });
  assert.equal(res.valid, true);
  assert.equal(res.violations.length, 0);
});

test('Axiom 79 parity across GEMINI.md, pstack-openspec, ai-harness-openspec, and worker.md', () => {
  for (const relPath of ['GEMINI.md', 'skills/pstack-openspec/SKILL.md', 'skills/ai-harness-openspec/SKILL.md']) {
    const content = readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    for (const token of AXIOM_79_REQUIRED_TOKENS) {
      assert.ok(content.includes(token), `${relPath} missing Axiom 79 token: ${token}`);
    }
  }
});
