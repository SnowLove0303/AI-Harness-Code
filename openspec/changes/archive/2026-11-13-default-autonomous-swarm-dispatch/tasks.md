# Tasks: Default Autonomous Swarm Dispatch in Ps-openspec Tasks

## Phase 1: Specification and Legislation Phase
- [x] 1.1 Finalize OpenSpec proposal, delta specs, and design artifacts <!-- id: TASK-SWARM-AUTODISPATCH-01 -->
  - Author `proposal.md`, `specs/orbitstack-pstack-routing/spec.md`, and `design.md` with complete Spec-Kit 1:1 RTM mappings.
  - Verify zero-omission of REQ-01 through REQ-05.
  - Verification: `npx openspec validate default-autonomous-swarm-dispatch --strict`

## Phase 2: Constitutional Axiom 56 Amendment & Living Spec Codification
- [x] 2.1 Amend Axiom 56 in `GEMINI.md` <!-- id: TASK-SWARM-AUTODISPATCH-02 -->
  - Add zero-prompt auto-dispatch clause (`DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE` & `ZERO_PROMPT_SWARM_AUTO_DISPATCH_RULE`) and anti-monolithic degradation gate (`ANTI_MONOLITHIC_EXECUTION_BLOCKED`) to Axiom 56 in `GEMINI.md`.
  - Verification: `git diff GEMINI.md`
- [x] 2.2 Amend item 58 in `skills/pstack-openspec/SKILL.md` <!-- id: TASK-SWARM-AUTODISPATCH-03 -->
  - Register the zero-prompt auto-dispatch and anti-monolithic degradation rules in `skills/pstack-openspec/SKILL.md`.
  - Verification: `git diff skills/pstack-openspec/SKILL.md`
- [x] 2.3 Amend item 53 in `skills/ai-harness-openspec/SKILL.md` <!-- id: TASK-SWARM-AUTODISPATCH-04 -->
  - Synchronize the auto-dispatch clauses in `skills/ai-harness-openspec/SKILL.md`.
  - Verification: `git diff skills/ai-harness-openspec/SKILL.md`

## Phase 3: Automated L2 Invariant Linter & Regression Test Suite
- [x] 3.1 Implement automated test suite `tests/default-autonomous-swarm-dispatch.test.mjs` <!-- id: TASK-SWARM-AUTODISPATCH-05 -->
  - Implement comprehensive checks:
    1. Constitutional auto-dispatch invariant check;
    2. Living spec synchronization check;
    3. OpenSpec delta spec verification;
    4. Anti-monolithic execution degradation simulation;
    5. Domain neutrality audit (zero scenario-token leakage);
    6. Default Swarm task modeling and transparent UX contract verification.
  - Verification: `node tests/default-autonomous-swarm-dispatch.test.mjs`

## Phase 4: Swarm-Delegated Implementation & Live Verification
- [x] 4.1 Dispatch execution to Swarm Subagent Worker via shared message board <!-- id: TASK-SWARM-AUTODISPATCH-06 -->
  - Initialize Swarm session, brief worker with OpenSpec task IDs, and monitor board handoff.
  - Verification: Live board interaction on `sidecar://swarm/swarm_board/`
- [x] 4.2 Receive verified exit code 0 evidence from Swarm Worker <!-- id: TASK-SWARM-AUTODISPATCH-07 -->
  - Worker runs `node --test tests/default-autonomous-swarm-dispatch.test.mjs` and posts result capsule to `@coordinator`.
  - Verification: Board message with `[Measured] exit code 0`

## Phase 5: Main Spec Synchronization & Global Mirror Distribution
- [x] 5.1 Sync delta specification into main spec `openspec/specs/orbitstack-pstack-routing/spec.md` <!-- id: TASK-SWARM-AUTODISPATCH-08 -->
  - Merge the 5 new requirements into main specification.
  - Verification: `git diff openspec/specs/orbitstack-pstack-routing/spec.md`
- [x] 5.2 Distribute to global system mirrors in `~/.gemini/config/` <!-- id: TASK-SWARM-AUTODISPATCH-09 -->
  - Synchronize byte-for-byte to `C:/Users/Administrator/.gemini/config/skills/pstack-openspec/SKILL.md` and `ai-harness-openspec/SKILL.md`.
  - Verification: Node hash comparison script (SHA-256 match).
- [x] 5.3 Git commit atomic archive and validation <!-- id: TASK-SWARM-AUTODISPATCH-10 -->
  - Validate all OpenSpec specs via `npx openspec validate --all --strict`.
  - Create atomic Git commit with clean git status.
  - Verification: `git status`
