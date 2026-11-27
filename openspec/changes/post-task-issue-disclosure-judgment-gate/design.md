# Design: Universal Post-Task Mandatory Issue Disclosure & User Judgment Gate (Axiom 81)

1. **L2 Guard Extension (`scripts/check-problem-ledger-ruling.mjs`)**:
   - Export `validatePostTaskIssueDisclosure(record)`:
     - Checks `incidentsEncountered` vs `disclosedIncidents` (even if `status === 'resolved_mid_task'`); any undisclosed incident triggers `SILENT_INCIDENT_SUPPRESSION_BLOCKED`.
     - Checks `userJudgmentInvited === true` when `incidentsEncountered.length > 0`; otherwise triggers `USER_JUDGMENT_INVITATION_MISSING_BLOCKED`.
   - CLI runner verifies `AXIOM_81_REQUIRED_TOKENS` parity across the 3 constitutional mirrors + `worker.md`.
2. **Constitutional & Documentation Parity**:
   - Codify Axiom 81 in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md` (Item 78), `worker.md` (Section 1q), and `README.md`.
3. **Tests & Global Sync**:
   - Add positive/negative tests to `tests/problem-ledger-ruling.test.mjs` and Axiom 81 assertions to `scripts/tests/gemini-adapter.test.mjs`, run `sync-to-global.mjs`, all 17 `guard:*` + 5 test suites, archive, and push.
