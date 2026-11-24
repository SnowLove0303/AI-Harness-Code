## ADDED Requirements

### Requirement: Dual-Gate Zero-Simplification & Atomic Problem Conservation (REQ-1, REQ-2, PROP-C)
In any Problem-Type Task, every reported issue SHALL be logged atomically (`[ISSUE-01]..[ISSUE-K]`) (`STRICT_ATOMIC_PROBLEM_LOGGING_MANDATE`), and transitioning from Gate 1 to Gate 2 SHALL preserve 100% of issue IDs and core constraint fidelity without truncation, ellipsis condensation, or silent deletion (`DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION`, `ISSUE_SEMANTIC_FIDELITY_PRESERVATION_GUARD`).

#### Scenario: Gate 2 simplifies or drops a Gate 1 issue
- **WHEN** `verifyZeroSimplificationBetweenGates` detects missing issue IDs, ellipsis truncation (`...`/`等`), or severe semantic shrinkage between Gate 1 and Gate 2
- **THEN** the guard SHALL fail with `ISSUE_GATE_SIMPLIFICATION_BLOCKED`.

### Requirement: Active Non-Mechanical Problem Verification (REQ-3)
After remediation, agents SHALL NOT rely solely on mechanical audit pass signals (`Exit Code 0`, linter pass, or self-authored unit tests) to close an issue; each `[ISSUE-xx]` SHALL carry an active real-output verification observation (`ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION`) confirming the defect is eliminated in the actual deliverable.

#### Scenario: Issue closure relying solely on mechanical exit code is blocked
- **WHEN** `verifyActiveNonMechanicalAndAntiRecurrence` inspects an issue entry whose verification contains only mechanical exit-code claims without `activeObservation`
- **THEN** the guard SHALL fail with `ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED`.

### Requirement: Root-Cause Anti-Recurrence Immunity & Pre-Fix Recall (REQ-4, PROP-D, PROP-E)
Before fixing a target module, the agent SHALL query `.harness/project-graph.json` for prior hotspots and guards (`GRAPH_COUPLED_PRE_FIX_RECALL_STANDARD`). Each resolved `[ISSUE-xx]` SHALL bind a concrete structural anti-recurrence defense classified under `L1_TYPE`, `L2_GUARD`, `GRAPH_HOTSPOT`, or `ALL_SITES_SWEEP` (`ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL`, `FOUR_TIER_ANTI_RECURRENCE_TAXONOMY`), rejecting vague prose promises.

#### Scenario: Missing or prose-only anti-recurrence defense blocks issue closure
- **WHEN** a resolved issue lacks a structural anti-recurrence category or uses non-binding prose
- **THEN** the guard SHALL fail with `ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED`.

### Requirement: Axiom 75 Constitutional Codification & GitHub-First Benchmarking Mandate (REQ-5)
The enhanced problem-task governance protocol SHALL be codified as **Axiom 75** (`PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 72) using pure universal software engineering abstractions (`AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`). Furthermore, any optimization or evolution of the Ps-openspec governance system SHALL first benchmark leading GitHub open-source agent engineering repositories (`GITHUB_FIRST_BENCHMARKING_MANDATE`) prior to Step 2 legislation.

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `tests/problem-task-anti-recurrence.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
