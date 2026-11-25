## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-4 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` covering lifecycle decision engine and Axiom 30/61 supersession.
- [x] Validate OpenSpec change assets with `npx openspec validate controlled-agent-sprawl-reuse-lifecycle --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Create `scripts/check-agent-lifecycle.mjs` (`evaluateAgentLifecycleAction`) and register `guard:agent-lifecycle` in `package.json`.
- [x] Update `.harness/project-graph.json` to register `scripts/check-agent-lifecycle.mjs` and `tests/controlled-agent-lifecycle.test.mjs`.
- [x] Annotate Axiom 30 & 61 supersession notices and codify Axiom 77 (`ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 74).
- [x] Update `worker.md` with Section 1m (Anti-Sprawl, Role-Pinned Reuse & Termination Lock).
- [x] Author automated L2 test suite `tests/controlled-agent-lifecycle.test.mjs` and add Axiom 77 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:agent-lifecycle` and confirm Exit Code 0.
- [x] Execute `node tests/controlled-agent-lifecycle.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards and `node scripts/sync-to-global.mjs`, confirming Exit Code 0.
- [x] Validate and archive change with `npx openspec archive controlled-agent-sprawl-reuse-lifecycle --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
