## ADDED Requirements

### Requirement: Poteto 4-Tier Structural Escalation & Lesson Encoding (REQ-01, PROP-B)
When resolving recurring defects or operator corrections, agents SHALL follow the poteto `/correct` 4-tier escalation hierarchy (`POTETO_CORRECT_FOUR_TIER_ESCALATION_ROUTE`: L1 Architecture > L2 Types/Lint/CI > L3 Behavioral Tests > L4 Rules/Docs) and encode any repeated lesson into executable structure (`ENCODE_LESSONS_IN_STRUCTURE_MANDATE`). When two or more fixes sharing a premise fail, agents SHALL halt and falsify the premise before attempting another fix (`CONSECUTIVE_FAILURE_PREMISE_ATTACK_TRIGGER`).

#### Scenario: Consecutive failed fixes without premise falsification are blocked
- **WHEN** `validateProblemBrainstormRecord` inspects a remediation record with `consecutiveFailures >= 2` and missing `premiseFalsified`
- **THEN** it SHALL fail with `BRAINSTORM_LAYER_SKIPPED_BLOCKED`.

### Requirement: Mandatory 5-Dimension Pre-Remediation Brainstorming Layer (REQ-02, PROP-A)
Before proposing or implementing any fix for an occurred defect, audit finding, or execution failure, agents SHALL execute the 5-Dimension Systemic Problem-Handling Brainstorm (`PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE`), explicitly auditing whether a semantic or judgment-sensitive workflow stage was delegated to an unattended deterministic script without an Agent Cognitive Gate (`UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED`).

#### Scenario: Unattended deterministic pipeline on semantic stage or skipped brainstorm is blocked
- **WHEN** a problem-handling record omits any required brainstorm dimension or leaves an unattended mechanical semantic pipeline unaddressed
- **THEN** `validateProblemBrainstormRecord` SHALL fail with `BRAINSTORM_LAYER_SKIPPED_BLOCKED` or `UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED`.

### Requirement: Tier Selection Rationale, Historical Counterexample Proof & Axiom 79 Parity (REQ-03, PROP-C)
Every structural remediation choosing a defense tier lower than L1 SHALL state why higher tiers were insufficient (`LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED`), prove the new check fails on a real historical failure sample (`HISTORICAL_FAILURE_COUNTEREXAMPLE_PROOF_MANDATE`), and maintain identical Axiom 79 (`SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM`) codification across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 76) (`AXIOM_79_PARITY_&_BRAINSTORM_ENFORCEMENT_STANDARD`).

#### Scenario: Unjustified tier downgrade or unproven historical counterexample fails with Exit Code 1
- **WHEN** `validateProblemBrainstormRecord` detects `selectedTier !== 'L1'` without `higherTierRejectionReason`, or `historicalCounterexampleProven !== true`, or missing mirror tokens
- **THEN** it SHALL fail with `LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED` or `HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED`.
