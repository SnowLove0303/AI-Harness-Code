import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const AXIOM_79_REQUIRED_TOKENS = [
  'SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM',
  'POTETO_CORRECT_FOUR_TIER_ESCALATION_ROUTE',
  'ENCODE_LESSONS_IN_STRUCTURE_MANDATE',
  'PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE',
  'CONSECUTIVE_FAILURE_PREMISE_ATTACK_TRIGGER',
  'HISTORICAL_FAILURE_COUNTEREXAMPLE_PROOF_MANDATE',
  'AXIOM_79_PARITY_&_BRAINSTORM_ENFORCEMENT_STANDARD',
  'BRAINSTORM_LAYER_SKIPPED_BLOCKED',
  'UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED',
  'LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED',
  'HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED',
];

const REQUIRED_BRAINSTORM_DIMENSIONS = [
  'symptomToSystemicRootCause',
  'universalPrinciple',
  'analogousBlastRadius',
  'multiTierOptions',
  'controlPlaneBoundaryCheck',
];

const VALID_TIERS = new Set(['L1', 'L2', 'L3', 'L4']);

/**
 * Validates that a problem-handling record completed the 5-dimension systemic brainstorm,
 * audited mechanical-vs-cognitive pipeline boundaries, justified any tier below L1,
 * proved the check on a real historical failure, and falsified premises after >=2 failures.
 */
export function validateProblemBrainstormRecord(record) {
  const violations = [];
  if (!record || typeof record !== 'object') {
    violations.push({
      code: 'BRAINSTORM_LAYER_SKIPPED_BLOCKED',
      message: 'Problem-handling record must be an object containing the 5 brainstorm dimensions.',
    });
    return { valid: false, violations };
  }

  for (const dim of REQUIRED_BRAINSTORM_DIMENSIONS) {
    const val = record[dim];
    const hasContent = Array.isArray(val) ? val.length > 0 : Boolean(String(val || '').trim());
    if (!hasContent) {
      violations.push({
        code: 'BRAINSTORM_LAYER_SKIPPED_BLOCKED',
        message: `Missing required brainstorm dimension: ${dim}.`,
      });
    }
  }

  if (record.unattendedMechanicalSemanticPipeline === true && record.agentCognitiveGateAdded !== true) {
    violations.push({
      code: 'UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED',
      message: 'Semantic/judgment-sensitive stage cannot remain an unattended deterministic script pipeline; add an Agent Cognitive Gate.',
    });
  }

  const tier = String(record.selectedTier || '').trim().toUpperCase();
  if (!VALID_TIERS.has(tier)) {
    violations.push({
      code: 'LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED',
      message: `selectedTier must be one of L1, L2, L3, L4 (received: "${record.selectedTier || ''}").`,
    });
  } else if (tier !== 'L1' && !String(record.higherTierRejectionReason || '').trim()) {
    violations.push({
      code: 'LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED',
      message: `selectedTier ${tier} requires explicit higherTierRejectionReason explaining why L1 architecture could not eliminate the class.`,
    });
  }

  if (record.historicalCounterexampleProven !== true) {
    violations.push({
      code: 'HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED',
      message: 'New structural check must be proven to fail on a real historical failure sample.',
    });
  }

  if (Number(record.consecutiveFailures || 0) >= 2 && record.premiseFalsified !== true) {
    violations.push({
      code: 'BRAINSTORM_LAYER_SKIPPED_BLOCKED',
      message: 'Two or more consecutive failures sharing a premise require explicit premise falsification (attack-the-premise).',
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const mirrorPaths = [
    'GEMINI.md',
    'skills/pstack-openspec/SKILL.md',
    'skills/ai-harness-openspec/SKILL.md',
  ];
  const violations = [];

  for (const relPath of mirrorPaths) {
    const absPath = path.join(repoRoot, relPath);
    if (!existsSync(absPath)) {
      violations.push(`Missing constitutional mirror: ${relPath}`);
      continue;
    }
    const content = readFileSync(absPath, 'utf8');
    for (const token of AXIOM_79_REQUIRED_TOKENS) {
      if (!content.includes(token)) {
        violations.push(`${relPath} missing Axiom 79 token: ${token}`);
      }
    }
  }

  const workerPath = path.join(repoRoot, 'worker.md');
  if (!existsSync(workerPath)) {
    violations.push('Missing worker.md');
  } else {
    const workerContent = readFileSync(workerPath, 'utf8');
    for (const token of [
      'SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM',
      'PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE',
      'UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED',
      'LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED',
      'HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED',
    ]) {
      if (!workerContent.includes(token)) {
        violations.push(`worker.md missing Axiom 79 token: ${token}`);
      }
    }
  }

  console.log('=== Automated L2 Systemic Problem-Brainstorm & Structural Prevention Guard ===');
  if (violations.length > 0) {
    for (const v of violations) {
      console.error(`[FAIL] ${v}`);
    }
    process.exit(1);
  }

  console.log('[PASS] Axiom 79 parity & 5-dim brainstorm enforcement verified across 3 mirrors + worker.md (Exit Code 0).');
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
