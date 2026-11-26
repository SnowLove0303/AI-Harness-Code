# Design: Systemic Problem-Handling Brainstorming Layer & Poteto Structural Prevention (Axiom 79)

## Architecture
1. **Constitutional Layer (Three Mirrors + Worker)**:
   - Codify **Axiom 79** (`SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM`) identically in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 76), plus Section `1o` in `worker.md`.
   - Keep 100% pure universal software engineering abstractions (zero domain-specific scenario terms).
2. **L2 Static Guard (`scripts/check-problem-brainstorm.mjs`)**:
   - Export `validateProblemBrainstormRecord(record)` enforcing:
     - 5 brainstorm dimensions (`symptomToSystemicRootCause`, `universalPrinciple`, `analogousBlastRadius`, `multiTierOptions`, `controlPlaneBoundaryCheck`);
     - Detection of unattended deterministic pipelines on semantic stages (`UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED`);
     - Tier-downgrade justification when `selectedTier !== 'L1'` (`LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED`);
     - Historical counterexample proof (`HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED`);
     - Premise-attack check when `consecutiveFailures >= 2`.
   - CLI runner verifies Axiom 79 token parity across all 3 constitutional mirrors and `worker.md`.
3. **Verification & Graph Registration**:
   - Register `guard:problem-brainstorm` in `package.json` and `.harness/project-graph.json`.
   - Author `tests/problem-handling-brainstorm.test.mjs` and append Axiom 79 assertions to `scripts/tests/gemini-adapter.test.mjs`.
