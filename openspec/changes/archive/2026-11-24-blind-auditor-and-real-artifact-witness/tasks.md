## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-4 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` aligned with `@poteto` `prove-it-works`, `show-me-your-work`, and `interrogate`.
- [x] Validate OpenSpec change assets with `npx openspec validate blind-auditor-and-real-artifact-witness --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Create deterministic L2 blind audit & real-artifact witness guard `scripts/check-blind-audit.mjs` and register `guard:blind-audit` in `package.json`.
- [x] Create `.harness/blind-audit-trail.json` demonstrating real-artifact witness slicing for this repository.
- [x] Update `.harness/project-graph.json` to register `scripts/check-blind-audit.mjs` and `tests/blind-auditor-real-witness.test.mjs`.
- [x] Codify Axiom 74 (`BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 71).
- [x] Update `worker.md` with Section 1j (Blind Auditor Isolation & Real-Artifact Witness Discipline).
- [x] Author automated L2 test suite `tests/blind-auditor-real-witness.test.mjs` and add Axiom 74 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:blind-audit` and confirm Exit Code 0.
- [x] Execute `node tests/blind-auditor-real-witness.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards and `node scripts/sync-to-global.mjs`, confirming Exit Code 0.
- [x] Validate and archive change with `npx openspec archive blind-auditor-and-real-artifact-witness --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
