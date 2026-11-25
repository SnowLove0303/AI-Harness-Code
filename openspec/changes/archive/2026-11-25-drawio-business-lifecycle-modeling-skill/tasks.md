## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-4 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` covering Swimlane Grid Compiler and Diagram-as-Test XML validator.
- [x] Validate OpenSpec change assets with `npx openspec validate drawio-business-lifecycle-modeling-skill --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Create `scripts/check-drawio-model.mjs` (Swimlane Grid Compiler + Diagram-as-Test XML validator) and register `guard:drawio-model` in `package.json`.
- [x] Create/upgrade `skills/drawio-mcp/SKILL.md` with enterprise lifecycle swimlane, Stage-Gate, L0/L1 multi-page, and `libavoid` guidelines.
- [x] Update `.harness/project-graph.json` to register `scripts/check-drawio-model.mjs` and `skills/drawio-mcp/SKILL.md`.
- [x] Codify Axiom 76 (`DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 73).
- [x] Update `worker.md` with Section 1l (Draw.io Business Lifecycle Modeling & Diagram-as-Test Discipline).
- [x] Author automated L2 test suite `tests/drawio-business-modeling.test.mjs` and add Axiom 76 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:drawio-model` and confirm Exit Code 0.
- [x] Execute `node tests/drawio-business-modeling.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards and `node scripts/sync-to-global.mjs`, confirming Exit Code 0.
- [x] Validate and archive change with `npx openspec archive drawio-business-lifecycle-modeling-skill --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
