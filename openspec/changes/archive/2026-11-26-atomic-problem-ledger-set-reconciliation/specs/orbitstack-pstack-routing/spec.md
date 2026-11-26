## ADDED Requirements

### Requirement: Atomic One-Defect-One-ID & Anti-Bundling Mandate (REQ-01)
Every entry in a problem ledger SHALL represent a single atomic defect (one root cause and one location) (`ATOMIC_ONE_DEFECT_ONE_ID_MANDATE`). Bundled entries containing multiple distinct sub-issues SHALL be rejected with `BUNDLED_ISSUE_ID_BLOCKED`.

#### Scenario: Bundled multi-subissue entry is blocked
- **WHEN** `validateProblemLedgerRuling` inspects a ledger containing an entry with `isBundled === true` or `subIssues.length > 1`
- **THEN** it SHALL fail with `BUNDLED_ISSUE_ID_BLOCKED`.

### Requirement: Append-Only Set-Difference Reconciliation & Per-Atomic Waiver Rationale (REQ-02, PROP-A, PROP-B)
Before presenting a remediation plan or authoring OpenSpec specifications, the agent SHALL verify zero set difference against the original atomic source set (`APPEND_ONLY_SET_DIFFERENCE_RECONCILIATION_GATE`, `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED`) and SHALL require an explicit `waiverRationale` on every `waived` atomic ID (`PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`).

#### Scenario: Missing source atomic ID or unsubstantiated waiver is blocked
- **WHEN** `validateProblemLedgerRuling` detects a missing ID from `sourceAtomicIds` or a `waived` entry without `waiverRationale`
- **THEN** it SHALL fail with `LEDGER_SET_DIFFERENCE_NON_ZERO_BLOCKED` or `PER_ATOMIC_WAIVER_RATIONALE_REQUIRED_BLOCKED`.

### Requirement: Enhanced Axiom 80 Parity & Historical Funnel Counterexample Verification (REQ-03, PROP-C)
The enhanced Axiom 80 tokens SHALL be codified identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, and `worker.md`, verified by `npm run guard:problem-ruling` and `tests/problem-ledger-ruling.test.mjs`.

#### Scenario: Full guard and test suite pass after enhancement
- **WHEN** `npm run guard:problem-ruling` and `node tests/problem-ledger-ruling.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
