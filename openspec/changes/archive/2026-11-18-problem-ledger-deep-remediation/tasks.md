## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching all 6 user requirements.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with 6 added RFC 2119 requirements.
- [x] Create technical architecture design `design.md` establishing the problem ledger, bijective tasks, and mechanical circuit breaker.
- [x] Validate OpenSpec change assets with `npx openspec validate problem-ledger-deep-remediation --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Swarm Execution)
- [x] [Swarm: worker-axiom64] Codify constitutional Axiom 64 in `GEMINI.md` with all 5 statutory sub-invariants.
- [x] [Swarm: worker-axiom64] Synchronize Axiom 64 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md`.
- [x] [Swarm: worker-clearance] Author mechanical L2 guard script `scripts/check-issue-clearance.mjs` and register `guard:issue-clearance` in `package.json`.
- [x] [Swarm: worker-worker-md] Update `worker.md` to reinforce single-issue focus lock and anti-bundle execution discipline.
- [x] [Swarm: worker-test64] Implement automated L2 test suite in `tests/problem-ledger-deep-remediation.test.mjs`.
- [x] [Swarm: worker-test64] Add regression test assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] [Swarm: worker-sync] Update `scripts/sync-to-global.mjs` to include `scripts/check-issue-clearance.mjs`.
- [x] Review all modified documents via VS Code native diff editor (`code --reuse-window --diff`).

## 4. Verification & Gate Closeout
- [x] Execute `node scripts/check-issue-clearance.mjs` and confirm Exit Code 0.
- [x] Execute `node tests/problem-ledger-deep-remediation.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Execute `npx openspec validate problem-ledger-deep-remediation --strict` and confirm Exit Code 0.
- [x] Run domain neutrality guard `npm run guard:neutrality` and confirm Exit Code 0.
- [x] Run unslop guard `npm run guard:unslop` and confirm Exit Code 0.
- [x] Run global sync script `node scripts/sync-to-global.mjs` and confirm Exit Code 0.
- [ ] Perform Step 5 final 1:1 RTM physical checkoff and report measured evidence to user.
