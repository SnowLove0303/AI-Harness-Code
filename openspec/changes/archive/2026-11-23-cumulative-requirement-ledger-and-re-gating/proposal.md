# Change Proposal: Cumulative Requirement Ledger, Atomic Decomposition & Re-Gating Protocol (Axiom 71)

## Why
In multi-turn engineering sessions where users supply compound initial defects followed by incremental clarifications, scope changes, or supplementary constraints across subsequent turns, static one-shot Gate 1 snapshots suffer from four systemic failures: (1) context-window drift silently drops earlier requirements; (2) lossy aggregation bundles multiple distinct defects under coarse labels, causing partial fixes to be marked complete; (3) mid-execution error remediation overwrites previously satisfied constraints; and (4) scope drift bypasses re-confirmation. Establishing a machine-verifiable **Cumulative Requirement Ledger & Re-Gating Protocol** closes this gap with 100% pure universal software engineering abstractions.

## What Changes
1. **REQ-1 (Multi-Turn Cumulative Requirement Ledger & Version Evolution)**: Maintain an incrementally versioned ledger (`v1 -> v2 -> ... -> vN`) tracking every requirement status (`ACTIVE`, `MODIFIED`, `ADDED`, `SUPERSEDED`) with strict algebraic conservation across turns.
2. **REQ-2 (Mandatory Atomic Micro-Decomposition)**: Enforce decomposing compound user inputs into atomic single-verifiable-behavior entries (`REQ-01a`, `REQ-01b`, ...), prohibiting lossy macro-bundling.
3. **REQ-3 (Mandatory Re-Gating & Scope Baseline Lock)**: Trigger mandatory re-gating (`RE_GATING_REQUIRED_BLOCKED`) whenever requirements are added, altered, or refined post-Gate 1, locking the merged baseline before implementation continues.
4. **REQ-4 (End-to-End Cumulative Ledger Checkoff & Anti-Overwrite Regression)**: Mandate Step 5 physical verification of every `ACTIVE` atomic entry against the final build/output artifact, preventing mid-execution overwrites.
5. **PROP-C (Persistent Machine Ledger & L2 Continuity Guard)**: Persist the cumulative ledger in `.harness/requirement-ledger.json` (or structured dossier) and provide `scripts/check-ledger-continuity.mjs` (`npm run guard:ledger-continuity`) to enforce `activeCount === verifiedCount` and conservation invariants.
6. **PROP-D (Non-Supersession Default & Conflict Detection)**: Treat un-superseded historical requirements as permanently active; require explicit `[SUPERSEDES REQ-xx]` markers to retire constraints and halt on unresolvable semantic conflicts.
7. **PROP-E (Graph-Coupled Multi-Turn Module Regression)**: Couple with Axiom 70 `.harness/project-graph.json` so subsequent edits touching a previously modified module trigger re-verification of earlier requirements mapped to that module.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Multi-Turn Cumulative Requirement Ledger | `CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL` |
| REQ-2 | Mandatory Atomic Micro-Decomposition | `ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD` |
| REQ-3 | Mandatory Re-Gating on Scope Drift | `SCOPE_DRIFT_RE_GATING_MANDATE` |
| REQ-4 | End-to-End Cumulative Checkoff | `END_TO_END_CUMULATIVE_CHECKOFF_STANDARD` |
| PROP-C | L2 Ledger Continuity Guard | `AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD` |
| PROP-D | Explicit Supersession & Conflict Detection | `EXPLICIT_SUPERSESSION_&_CONFLICT_DETECTION_STANDARD` |
| PROP-E | Graph-Coupled Multi-Turn Regression | `GRAPH_COUPLED_MULTI_TURN_REGRESSION_STANDARD` |
