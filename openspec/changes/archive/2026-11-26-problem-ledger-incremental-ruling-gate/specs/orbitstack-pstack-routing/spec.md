## ADDED Requirements

### Requirement: Problem Ledger Incremental Merge Without Replacement (REQ-01)
For both task-generated and user-provided problem ledgers, any user supplement or clarification SHALL be merged incrementally (`PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE`), preserving every existing item ID and preventing replacement or silent deletion (`PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED`).

#### Scenario: Dropping prior ledger items during an update is blocked
- **WHEN** `validateProblemLedgerRuling` compares an updated ledger against a prior ledger `[1, 2, 3, 4]` and detects any missing prior item ID
- **THEN** it SHALL fail with `PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED`.

### Requirement: Partial-Reply Counter-Questioning & Per-Item Final Ruling Gate (REQ-02, PROP-A)
When a user supplements or explains only a subset of a multi-item problem ledger (e.g., item `2` out of `[1, 2, 3, 4]`), the agent SHALL NOT close or execute only that subset; it SHALL interactively clarify disposition when an explanation lacks a concrete action (`DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED`) and counter-question the user on all remaining `pending_ruling` items (`1, 3, 4`) until 100% of items hold explicit final rulings (`PARTIAL_REPLY_COUNTER_QUESTIONING_GATE`, `UNRULING_LEDGER_ITEMS_PENDING_BLOCKED`).

#### Scenario: Partial ruling on item 2 while items 1, 3, 4 remain pending is blocked
- **WHEN** `validateProblemLedgerRuling` inspects a 4-item ledger where only item `2` has a final ruling and `1, 3, 4` remain `pending_ruling`
- **THEN** it SHALL fail with `UNRULING_LEDGER_ITEMS_PENDING_BLOCKED` and list `[1, 3, 4]` for counter-questioning.

### Requirement: Automated L2 Guard & Axiom 80 Constitutional Parity (REQ-03, PROP-B, PROP-C)
The repository SHALL provide `scripts/check-problem-ledger-ruling.mjs` (`npm run guard:problem-ruling`) and codify **Axiom 80** (`PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 77), plus `worker.md` Section 1p (`AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD`).

#### Scenario: Missing Axiom 80 mirror token fails with Exit Code 1
- **WHEN** `npm run guard:problem-ruling` detects any missing Axiom 80 token across the constitutional mirrors or `worker.md`
- **THEN** it SHALL exit with Exit Code 1.
