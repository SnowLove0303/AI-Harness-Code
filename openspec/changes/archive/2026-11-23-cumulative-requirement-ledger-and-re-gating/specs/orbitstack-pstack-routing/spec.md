## ADDED Requirements

### Requirement: Multi-Turn Cumulative Requirement Ledger (REQ-1, PROP-D)
Across multi-turn sessions, the agent SHALL maintain a monotonically versioned **Cumulative Requirement Ledger** (`CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL`) where every requirement carries an explicit lifecycle status (`ACTIVE`, `MODIFIED`, `ADDED`, `SUPERSEDED`). Historical requirements SHALL remain permanently active unless explicitly retired via `[SUPERSEDES REQ-xx]` (`EXPLICIT_SUPERSESSION_&_CONFLICT_DETECTION_STANDARD`).

#### Scenario: Silent drop of historical requirement during multi-turn update is blocked
- **WHEN** a subsequent turn adds or modifies requirements without preserving all un-superseded prior requirements
- **THEN** the ledger continuity check SHALL fail with `REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED`.

### Requirement: Mandatory Atomic Micro-Decomposition (REQ-2)
When ingesting compound user inputs containing multiple defects, sub-locations, or constraints, the agent SHALL decompose them into single-verifiable-behavior atomic entries (`ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD`) and SHALL NOT bundle distinct behaviors into coarse aggregate rows.

#### Scenario: Lossy aggregation of compound defects is rejected
- **WHEN** a Gate 1 or ledger entry bundles multiple independent verifiable behaviors under a single coarse summary without atomic sub-IDs
- **THEN** Gate 1 / Gate 2 validation SHALL reject the entry with `LOSSY_REQUIREMENT_AGGREGATION_BLOCKED`.

### Requirement: Mandatory Re-Gating on Scope Drift (REQ-3)
Whenever requirements are added, refined, or altered after initial Gate 1 confirmation, the agent SHALL halt implementation and execute **Re-Gating** (`SCOPE_DRIFT_RE_GATING_MANDATE`) by presenting the merged Cumulative Ledger Delta for explicit user confirmation before modifying code.

#### Scenario: Modifying code after unconfirmed scope drift is blocked
- **WHEN** a user introduces supplementary requirements mid-session and the agent attempts code edits without presenting an updated cumulative ledger
- **THEN** the governance protocol SHALL block execution with `RE_GATING_REQUIRED_BLOCKED`.

### Requirement: End-to-End Cumulative Checkoff & Graph-Coupled Regression (REQ-4, PROP-E)
Before Step 5 final delivery, the agent SHALL verify every `ACTIVE` atomic entry in the Cumulative Ledger against the final build/output artifact (`END_TO_END_CUMULATIVE_CHECKOFF_STANDARD`), and whenever multi-turn edits touch a previously modified Project Graph module, SHALL re-run all earlier assertions mapped to that module (`GRAPH_COUPLED_MULTI_TURN_REGRESSION_STANDARD`).

#### Scenario: Mid-execution overwrite leaves earlier active requirement unverified
- **WHEN** an active atomic requirement from an earlier turn lacks `[Measured]` verification against the final artifact or is regressed by a later edit to the same Graph module
- **THEN** final checkoff SHALL fail with `CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED`.

### Requirement: Automated L2 Ledger Continuity Guard & Axiom 71 Parity (PROP-C)
The repository SHALL provide a deterministic L2 guard (`scripts/check-ledger-continuity.mjs`, registered as `npm run guard:ledger-continuity`) validating cumulative ledger conservation, atomic decomposition, and `activeCount === verifiedCount` (`AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD`), and SHALL codify Axiom 71 (`CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 68) using 100% pure universal software engineering abstractions (`AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 guard catches unverified active requirement or mirror drift
- **WHEN** `npm run guard:ledger-continuity` runs against a ledger with unverified `ACTIVE` entries or when any constitutional mirror omits Axiom 71 tokens
- **THEN** the guard or test suite SHALL exit with Exit Code 1.
