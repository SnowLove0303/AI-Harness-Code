# Change Proposal: Universal Post-Task Mandatory Issue Disclosure & User Judgment Gate (Axiom 81)

## Why
Across all task types, agents frequently encounter errors, anomalies, blockers, or execution friction mid-task, resolve or work around them locally, and then report only "Task completed" without disclosing what went wrong. This hides systemic risks and deprives the human operator of the chance to judge whether the fix is acceptable or requires deeper architectural prevention.

## What Changes
1. **REQ-01 & PROP-A/B (Universal Issue Disclosure & Judgment Gate)**: Codify **Axiom 81** (`POST_TASK_MANDATORY_ISSUE_DISCLOSURE_&_JUDGMENT_AXIOM`), mandating that whenever any issue occurs during any task—even if resolved mid-task—the agent MUST proactively disclose all 4 structured elements (phenomenon & phase, root cause, in-task handling, systemic prevention options) at task completion (`SILENT_INCIDENT_SUPPRESSION_BLOCKED`) and explicitly invite the user's judgment (`USER_JUDGMENT_INVITATION_MISSING_BLOCKED`).
2. **REQ-02 & PROP-C (L2 Guard, Mirrors & Verification)**: Add `validatePostTaskIssueDisclosure(record)` and `AXIOM_81_REQUIRED_TOKENS` parity check to `scripts/check-problem-ledger-ruling.mjs`, codify Axiom 81 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 78), `worker.md` (Section 1q), and `README.md`, and add unit/regression tests in `tests/problem-ledger-ruling.test.mjs` and `scripts/tests/gemini-adapter.test.mjs`.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-01 & PROP-A/B | Universal Task Incident Disclosure & User Judgment | `UNIVERSAL_TASK_INCIDENT_DISCLOSURE_MANDATE` |
| REQ-02 & PROP-C | Axiom 81 Parity, L2 Guard & Regression Tests | `AXIOM_81_PARITY_&_DISCLOSURE_STANDARD` |
