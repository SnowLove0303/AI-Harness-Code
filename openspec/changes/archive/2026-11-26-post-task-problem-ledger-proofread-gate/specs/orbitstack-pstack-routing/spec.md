## ADDED Requirements

### Requirement: Post-Task Problem Ledger Final Proofread Gate (REQ-01, PROP-A, PROP-B)
Upon completing remediation and prior to declaring task completion, agents SHALL proofread the current problem ledger against the initial atomic issue set (`POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE`), verifying that every initial item is `resolved` unless explicitly excluded via interactive user ruling (`waived` or `deferred` with explicit `waiverRationale`/`exclusionRationale`). Any non-excluded unresolved item SHALL trigger `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED`.

#### Scenario: Declaring completion with an unresolved non-excluded initial issue is blocked
- **WHEN** `validatePostTaskLedgerProofread` inspects an initial 4-item ledger `[1, 2, 3, 4]` where `1, 2` are `resolved`, `4` is interactively `waived` with rationale, and `3` remains `approved_fix` (not `resolved`)
- **THEN** it SHALL fail with `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` and report `unresolvedIds: ['3']`.

### Requirement: Axiom 80 Post-Task Proofread Parity & Verification (REQ-02, PROP-C)
`POST_TASK_PROBLEM_LEDGER_PROOFREAD_MANDATE` and `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` SHALL be codified identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`, and `worker.md`, and verified by `npm run guard:problem-ruling` and `tests/problem-ledger-ruling.test.mjs`.

#### Scenario: Guard and test suite pass after post-task proofread codification
- **WHEN** `npm run guard:problem-ruling` and `node tests/problem-ledger-ruling.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
