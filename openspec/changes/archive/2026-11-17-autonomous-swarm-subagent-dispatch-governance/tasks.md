## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching all 6 user requirements.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with 5 added RFC 2119 requirements.
- [x] Create technical architecture design `design.md` establishing dual-engine routing and zero-friction baselines.
- [x] Validate OpenSpec change assets with `npx openspec validate autonomous-swarm-subagent-dispatch-governance --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Swarm Execution)
- [x] [Swarm: worker-axiom61] Codify constitutional Axiom 61 in `GEMINI.md`.
- [x] [Swarm: worker-axiom61] Synchronize Axiom 61 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md`.
- [x] [Swarm: worker-test61] Implement automated L2 test suite in `tests/autonomous-swarm-subagent-dispatch-governance.test.mjs`.
- [x] [Swarm: worker-test61] Add regression test assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review all modified documents via VS Code native diff editor (`code --reuse-window --diff`).

## 4. Verification & Gate Closeout
- [x] Execute `node tests/autonomous-swarm-subagent-dispatch-governance.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Execute `npx openspec validate autonomous-swarm-subagent-dispatch-governance --strict` and confirm Exit Code 0.
- [x] Run domain neutrality guard `npm run guard:neutrality` and confirm Exit Code 0.
- [x] Run global sync script `node scripts/sync-to-global.mjs` and confirm Exit Code 0.
- [ ] Perform Step 5 final 1:1 RTM physical checkoff and report measured evidence to user.
