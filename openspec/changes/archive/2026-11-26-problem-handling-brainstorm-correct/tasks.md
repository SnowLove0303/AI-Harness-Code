## 1. Step 0 Gate 1
- [x] Create Gate 1 dossier `openspec/gate1-dossiers/2026-11-26-problem-handling-brainstorm-correct-GATE1.md` and obtain user confirmation.

## 2. Step 2 OpenSpec & Gate 2
- [x] Author `proposal.md`, `specs/orbitstack-pstack-routing/spec.md`, `design.md`, `tasks.md` and validate via `npx openspec validate problem-handling-brainstorm-correct --strict`.
- [x] Create Gate 2 dossier and obtain user approval before editing code.

## 3. Step 3 Implementation (Single-Focus Lock)
- [x] Create `scripts/check-problem-brainstorm.mjs` and register `guard:problem-brainstorm` in `package.json`.
- [x] Update `.harness/project-graph.json` to register `scripts/check-problem-brainstorm.mjs`.
- [x] Codify Axiom 79 (`SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM`) identically in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 76), plus `worker.md` Section 1o.
- [x] Author `tests/problem-handling-brainstorm.test.mjs` and add Axiom 79 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Run all 15 `guard:*` scripts, test suites, and `node scripts/sync-to-global.mjs`.
- [x] Open modified core files in VS Code for tactile review.

## 4. Step 4 & Step 5 Archival
- [x] Validate, archive OpenSpec change, commit & push to `origin/release/ps-openspec-v2.00`, and write Step 5 dossier.
