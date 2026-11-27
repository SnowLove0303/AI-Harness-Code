## ADDED Requirements

### Requirement: Universal Post-Task Incident Disclosure & User Judgment Gate (REQ-01, PROP-A, PROP-B)
Across all task types, whenever any issue, error, blocker, or execution friction occurs during execution—even if resolved or worked around mid-task—agents SHALL proactively disclose all encountered issues (phenomenon/phase, root cause, in-task handling, systemic prevention impact) at task completion (`UNIVERSAL_TASK_INCIDENT_DISCLOSURE_MANDATE`, `SILENT_INCIDENT_SUPPRESSION_BLOCKED`) and explicitly invite the user's judgment (`USER_JUDGMENT_INVITATION_MISSING_BLOCKED`).

#### Scenario: Silently omitting a resolved mid-task incident or failing to invite user judgment is blocked
- **WHEN** `validatePostTaskIssueDisclosure` inspects a task record with `incidentsEncountered.length > 0` where any incident is omitted from `disclosedIncidents` or `userJudgmentInvited !== true`
- **THEN** it SHALL fail with `SILENT_INCIDENT_SUPPRESSION_BLOCKED` or `USER_JUDGMENT_INVITATION_MISSING_BLOCKED`.

### Requirement: Axiom 81 Constitutional Parity & Verification (REQ-02, PROP-C)
**Axiom 81** (`POST_TASK_MANDATORY_ISSUE_DISCLOSURE_&_JUDGMENT_AXIOM`) SHALL be codified identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 78), and `worker.md` (Section 1q) (`AXIOM_81_PARITY_&_DISCLOSURE_STANDARD`), verified by `npm run guard:problem-ruling`, `tests/problem-ledger-ruling.test.mjs`, and `scripts/tests/gemini-adapter.test.mjs`.

#### Scenario: All guards and tests pass after Axiom 81 codification
- **WHEN** the full guard and test suite executes
- **THEN** every check SHALL pass with Exit Code 0.
