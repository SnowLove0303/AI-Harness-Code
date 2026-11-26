# Change Proposal: Systemic Problem-Handling Brainstorming Layer & Poteto Structural Recurrence Prevention (Axiom 79)

## Why
When an issue, defect, or audit anomaly occurs, agents frequently jump straight to local symptom patching (e.g., patching a single output field or adding an ad-hoc rule) instead of stepping back to brainstorm why the system architecture allowed the failure to happen. As demonstrated by poteto's `pstack` (`/correct`, `/reflect`, `principle-encode-lessons-in-structure`, `principle-fix-root-causes`, `principle-attack-the-premise`), sustainable reliability requires:
1. A mandatory **5-Dimension Systemic Problem-Handling Brainstorming Layer** executed by the Agent *before* proposing a fix—explicitly inspecting whether a semantic/judgment-sensitive pipeline was left to unattended deterministic scripts without an Agent Cognitive Gate;
2. Escalating every recurring mistake class through the **4-Tier Structural Prevention Hierarchy** (L1 Architecture > L2 Types/Lint/CI > L3 Behavioral Tests > L4 Rules/Docs);
3. Proving every new structural check fails on a real historical failure sample and maintaining a Rule-to-Enforcer mapping.

## What Changes
1. **REQ-01 (Poteto Problem-Resolution & Recurrence-Prevention Codification)**: Codify `/correct` 4-tier escalation (`POTETO_CORRECT_FOUR_TIER_ESCALATION_ROUTE`), `ENCODE_LESSONS_IN_STRUCTURE_MANDATE`, root-cause state-legitimacy tracing, `CONSECUTIVE_FAILURE_PREMISE_ATTACK_TRIGGER`, and `/reflect` structural triage.
2. **REQ-02 (Mandatory 5-Dimension Problem-Handling Brainstorming Layer)**: Mandate `PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE` before any fix proposal—covering Symptom-to-Systemic Root Cause (including unattended deterministic-vs-cognitive pipeline boundary checks), Universal Principle Alignment, Analogous Blast Radius, L1–L4 Multi-Tier Remediation Options, and Convergence/Premise Check.
3. **REQ-03 (Tier Rationale, Historical Counterexample Proof & Rule-Enforcer Loop)**: Require explicit justification whenever a lower tier than L1 is chosen (`LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED`), historical failure counterexample proof (`HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED`), and Rule-to-Enforcer pairing.
4. **PROP-A (Structured 5-Dim Brainstorm Template)**: Standardize the brainstorm output dimensions in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, and `worker.md`.
5. **PROP-B (Consecutive-Failure Premise-Attack Trigger)**: Require explicit premise falsification when consecutive failures reach $\ge 2$.
6. **PROP-C (Automated L2 Guard & Three-Mirror Parity)**: Add `scripts/check-problem-brainstorm.mjs` (`npm run guard:problem-brainstorm`), `.harness/project-graph.json` registration, and `tests/problem-handling-brainstorm.test.mjs`.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 | Poteto 4-Tier Escalation & Structural Encoding | `POTETO_CORRECT_FOUR_TIER_ESCALATION_ROUTE` |
| REQ-02 | Mandatory 5-Dim Problem-Handling Brainstorming Layer | `PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE` |
| REQ-03 | Tier Rationale & Historical Counterexample Proof | `HISTORICAL_FAILURE_COUNTEREXAMPLE_PROOF_MANDATE` |
| PROP-A | Structured Brainstorm Dimensions & Axiom 79 | `SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM` |
| PROP-B | Consecutive-Failure Premise-Attack Trigger | `CONSECUTIVE_FAILURE_PREMISE_ATTACK_TRIGGER` |
| PROP-C | Automated L2 `guard:problem-brainstorm` & Parity | `AXIOM_79_PARITY_&_BRAINSTORM_ENFORCEMENT_STANDARD` |
