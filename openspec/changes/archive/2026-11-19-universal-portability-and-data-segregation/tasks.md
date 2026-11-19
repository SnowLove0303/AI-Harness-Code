## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching all 6 user requirements.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with 6 added RFC 2119 requirements.
- [x] Create technical architecture design `design.md` establishing universal portability, DB migration resilience, and orthogonal data segregation.
- [x] Validate OpenSpec change assets with `npx openspec validate universal-portability-and-data-segregation --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Codify Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`) in `GEMINI.md`.
- [x] Synchronize Axiom 67 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md` (item 64).
- [x] Implement static linter guard `scripts/check-universal-portability.mjs` and register `"guard:portability"` in `package.json`.
- [x] Update `worker.md` to reinforce cross-device host decoupling, database migration resilience, and data segregation rules.
- [x] Author automated L2 test suite in `tests/universal-portability.test.mjs`.
- [x] Add regression test assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Update `scripts/sync-to-global.mjs` to include `'check-universal-portability.mjs'`.
- [x] Review all modified documents via VS Code native diff editor (`code --reuse-window --diff`).

## 4. Verification & Gate Closeout
- [x] Execute `node scripts/check-universal-portability.mjs` and confirm Exit Code 0.
- [x] Execute `node tests/universal-portability.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Execute `npx openspec validate universal-portability-and-data-segregation --strict` and confirm Exit Code 0.
- [x] Run domain neutrality guard `npm run guard:neutrality` and confirm Exit Code 0.
- [x] Run unslop guard `npm run guard:unslop` and confirm Exit Code 0.
- [x] Run workflow spec compliance guard `npm run guard:workflow-spec` and confirm Exit Code 0.
- [x] Run invocation purity guard `npm run guard:invocation-purity` and confirm Exit Code 0.
- [x] Run issue clearance guard `npm run guard:issue-clearance` and confirm Exit Code 0.
- [x] Run universal portability guard `npm run guard:portability` and confirm Exit Code 0.
- [x] Run global sync script `node scripts/sync-to-global.mjs` and confirm Exit Code 0.
- [-] Archive change with `npx openspec archive universal-portability-and-data-segregation --yes`.
- [ ] Perform Step 5 final 1:1 RTM physical checkoff and report measured evidence to user.
