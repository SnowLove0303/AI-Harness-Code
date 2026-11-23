## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching REQ-1 ~ REQ-4 and PROP-C ~ PROP-E.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with RFC 2119 requirements.
- [x] Create technical architecture design `design.md` covering Cumulative Ledger, Re-Gating statechart, and Graph-coupled regression.
- [x] Validate OpenSpec change assets with `npx openspec validate cumulative-requirement-ledger-and-re-gating --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Single-Focus Execution)
- [x] Create L2 ledger continuity & Graph-coupled regression guard `scripts/check-ledger-continuity.mjs` and register `guard:ledger-continuity` in `package.json`.
- [x] Create canonical `.harness/requirement-ledger.json` for this change to dogfood the cumulative ledger standard.
- [x] Update `.harness/project-graph.json` to register `scripts/check-ledger-continuity.mjs` and `tests/cumulative-requirement-ledger.test.mjs` in `mod-guards-and-sync` and `mod-verification-suites`.
- [x] Codify Axiom 71 (`CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM`) in `GEMINI.md`.
- [x] Synchronize Axiom 71 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md` (Invariant 68).
- [x] Update `worker.md` with Section 1g (Cumulative Requirement Ledger & Re-Gating Discipline).
- [x] Author automated L2 test suite `tests/cumulative-requirement-ledger.test.mjs`.
- [x] Add Axiom 71 regression assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review modified files via VS Code (`open_in_vscode`).

## 4. Verification & Gate Closeout
- [x] Execute `npm run guard:ledger-continuity` and confirm Exit Code 0.
- [x] Execute `npm run guard:graph` and confirm Exit Code 0.
- [x] Execute `node tests/cumulative-requirement-ledger.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Run all existing guards (`guard:neutrality`, `guard:unslop`, `guard:workflow-spec`, `guard:invocation-purity`, `guard:issue-clearance`, `guard:portability`) and confirm Exit Code 0.
- [x] Run `node scripts/sync-to-global.mjs` to synchronize global and workspace anchors.
- [x] Validate and archive change with `npx openspec archive cumulative-requirement-ledger-and-re-gating --yes`.
- [x] Deliver Step 5 1:1 RTM physical checkoff with `[Measured]` Exit Code 0 evidence.
