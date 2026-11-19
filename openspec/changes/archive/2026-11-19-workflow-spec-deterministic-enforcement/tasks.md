## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching all 6 user requirements.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with 6 added RFC 2119 requirements.
- [x] Create technical architecture design `design.md` establishing the atomic spec schema, completion hooks, and compliance guard.
- [x] Validate OpenSpec change assets with `npx openspec validate workflow-spec-deterministic-enforcement --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Swarm Execution)
- [x] [Swarm: worker-axiom65] Codify constitutional Axiom 65 in `GEMINI.md` with all statutory sub-invariants.
- [x] [Swarm: worker-axiom65] Synchronize Axiom 65 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md`.
- [x] [Swarm: worker-compliance] Author mechanical L2 guard script `scripts/check-workflow-spec-compliance.mjs` and register `guard:workflow-spec` in `package.json`.
- [x] [Swarm: worker-worker-md] Update `worker.md` to reinforce completion hook and atomic rule compliance standards.
- [x] [Swarm: worker-test65] Implement automated L2 test suite in `tests/workflow-spec-deterministic-enforcement.test.mjs`.
- [x] [Swarm: worker-test65] Add regression test assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] [Swarm: worker-sync] Update `scripts/sync-to-global.mjs` to include `scripts/check-workflow-spec-compliance.mjs`.
- [x] Review all modified documents via VS Code native diff editor (`code --reuse-window --diff`).

## 4. Verification & Gate Closeout
- [x] Execute `node scripts/check-workflow-spec-compliance.mjs` and confirm Exit Code 0.
- [x] Execute `node tests/workflow-spec-deterministic-enforcement.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Execute `npx openspec validate workflow-spec-deterministic-enforcement --strict` and confirm Exit Code 0.
- [x] Run domain neutrality guard `npm run guard:neutrality` and confirm Exit Code 0.
- [x] Run unslop guard `npm run guard:unslop` and confirm Exit Code 0.
- [x] Run workflow spec compliance guard `npm run guard:workflow-spec` and confirm Exit Code 0.
- [x] Run global sync script `node scripts/sync-to-global.mjs` and confirm Exit Code 0.
- [ ] Perform Step 5 final 1:1 RTM physical checkoff and report measured evidence to user.
