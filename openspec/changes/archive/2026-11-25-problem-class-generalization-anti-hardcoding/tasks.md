## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-4 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` covering `scanCodeForSpecialCasing` and `validateGeneralizationEvidence`.
- [x] Validate OpenSpec change assets with `npx openspec validate problem-class-generalization-anti-hardcoding --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [-] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Create `scripts/check-anti-hardcoding.mjs` and register `guard:anti-hardcoding` in `package.json`.
- [x] Update `.harness/project-graph.json` to register `scripts/check-anti-hardcoding.mjs`.
- [x] Codify Axiom 78 (`UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 75).
- [x] Update `worker.md` with Section 1n (Problem-Class Generalization, Analogous Sweep & Anti-Special-Casing).
- [x] Author automated L2 test suite `tests/problem-class-generalization.test.mjs` and add Axiom 78 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [ ] Execute `npm run guard:anti-hardcoding` and confirm Exit Code 0.
- [ ] Execute `node tests/problem-class-generalization.test.mjs` and confirm Exit Code 0.
- [ ] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [ ] Run all existing guards and `node scripts/sync-to-global.mjs`, confirming Exit Code 0.
- [ ] Validate and archive change with `npx openspec archive problem-class-generalization-anti-hardcoding --yes`.
- [ ] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
