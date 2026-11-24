## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-5 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` extending `scripts/check-issue-clearance.mjs`.
- [x] Validate OpenSpec change assets with `npx openspec validate problem-task-zero-loss-active-verify-anti-recurrence --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Extend `scripts/check-issue-clearance.mjs` with `verifyZeroSimplificationBetweenGates` and `verifyActiveNonMechanicalAndAntiRecurrence`.
- [x] Codify Axiom 75 (`PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 72).
- [x] Update `worker.md` with Section 1k (Zero-Simplification Dual-Gate, Active Non-Mechanical Check & Anti-Recurrence Discipline).
- [x] Author automated L2 test suite `tests/problem-task-anti-recurrence.test.mjs` and add Axiom 75 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `node tests/problem-task-anti-recurrence.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards (`guard:issue-clearance`, `guard:blind-audit`, `guard:ui-slop`, `guard:pstack-sync`, `guard:graph`, `guard:ledger-continuity`, `guard:neutrality`, `guard:unslop`, `guard:workflow-spec`, `guard:invocation-purity`, `guard:portability`) and `node scripts/sync-to-global.mjs`, confirming Exit Code 0.
- [x] Validate and archive change with `npx openspec archive problem-task-zero-loss-active-verify-anti-recurrence --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
