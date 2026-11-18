## 1. Specification & Gate Assets
- [x] Create change proposal `proposal.md` with 1:1 Spec-Kit RTM matching all 5 user requirements.
- [x] Create delta specification `specs/orbitstack-pstack-routing/spec.md` with 5 added RFC 2119 requirements.
- [x] Create technical architecture design `design.md` establishing `worker.md`, mechanical unslop, and statecharts.
- [x] Validate OpenSpec change assets with `npx openspec validate pstack-latest-evolution-fusion --strict`.

## 2. Gate 2 Statutory Authorization (Blocking)
- [x] Present Gate 2 proposal, delta spec, technical design, and statutory dual checklists.
- [x] Await explicit human authorization ("批准动工" / "执行") prior to modifying any code or constitutional files.

## 3. Step 3 Implementation (Autonomous Swarm Execution)
- [x] [Swarm: worker-axiom63] Codify constitutional Axiom 63 in `GEMINI.md`.
- [x] [Swarm: worker-axiom63] Synchronize Axiom 63 in `skills/pstack-openspec/SKILL.md` and `skills/ai-harness-openspec/SKILL.md`.
- [x] [Swarm: worker-worker-md] Author root-level `worker.md` subagent execution constitution.
- [x] [Swarm: worker-unslop] Author mechanical L2 guard script `scripts/check-unslop-purity.mjs` and register `guard:unslop` in `package.json`.
- [x] [Swarm: worker-test63] Implement automated L2 test suite in `tests/pstack-latest-evolution-fusion.test.mjs`.
- [x] [Swarm: worker-test63] Add regression test assertions to `scripts/tests/gemini-adapter.test.mjs`.
- [x] Review all modified documents via VS Code native diff editor (`code --reuse-window --diff`).

## 4. Verification & Gate Closeout
- [x] Execute `node scripts/check-unslop-purity.mjs` and confirm Exit Code 0.
- [x] Execute `node tests/pstack-latest-evolution-fusion.test.mjs` and confirm Exit Code 0.
- [x] Execute `node scripts/tests/gemini-adapter.test.mjs` and confirm Exit Code 0.
- [x] Execute `npx openspec validate pstack-latest-evolution-fusion --strict` and confirm Exit Code 0.
- [x] Run domain neutrality guard `npm run guard:neutrality` and confirm Exit Code 0.
- [x] Run global sync script `node scripts/sync-to-global.mjs` and confirm Exit Code 0.
- [ ] Perform Step 5 final 1:1 RTM physical checkoff and report measured evidence to user.
