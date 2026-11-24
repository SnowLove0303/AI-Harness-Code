## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-5 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` covering upstream sync, ambiguity threshold gate, zero-fabricated-citation rule, and route map preservation.
- [x] Validate OpenSpec change assets with `npx openspec validate pstack-v01548-reframe-fusion --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Sync local upstream mirror `C:\Users\Administrator\.gemini\pstack-upstream\` to `v0.15.48` (`plugin.json`, `skills/reframe/SKILL.md`, `skills/statechart/` Windows fixes).
- [x] Create `scripts/check-pstack-sync.mjs` (upstream inspector, `evaluateReframeTrigger`, `validateCitations`) and register `guard:pstack-sync` in `package.json`.
- [x] Register `/reframe` under `companionSkills` in `docs/pstack-openspec-route-map.json` and update `skills/pstack-openspec/references/playbooks-catalog.md`.
- [x] Update `.harness/project-graph.json` to register `scripts/check-pstack-sync.mjs` and `tests/pstack-reframe-fusion.test.mjs`.
- [x] Codify Axiom 72 (`PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM`) in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 69).
- [x] Update `worker.md` with Section 1h (`/reframe` Disambiguation & Zero-Fabricated-Citation Discipline).
- [x] Author automated L2 test suite `tests/pstack-reframe-fusion.test.mjs` and add Axiom 72 regression tests to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:pstack-sync` and confirm Exit Code 0.
- [x] Execute `node tests/pstack-reframe-fusion.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards (`guard:graph`, `guard:ledger-continuity`, `guard:neutrality`, `guard:unslop`, `guard:workflow-spec`, `guard:invocation-purity`, `guard:issue-clearance`, `guard:portability`) and confirm Exit Code 0.
- [x] Run `node scripts/sync-to-global.mjs` to synchronize global and workspace anchors.
- [x] Validate and archive change with `npx openspec archive pstack-v01548-reframe-fusion --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
