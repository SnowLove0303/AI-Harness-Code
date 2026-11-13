# Tasks: Action Skill Layer Proactive Discovery & Mandatory Adoption Governance

## Phase 1: Specification and Legislation Phase
- [x] 1.1 Finalize OpenSpec proposal, delta specs, and design artifacts <!-- id: TASK-SKILL-DISCOVERY-01 -->
  - Author `proposal.md`, `specs/orbitstack-pstack-routing/spec.md`, and `design.md` with complete Spec-Kit 1:1 RTM mappings.
  - Verify zero-omission of REQ-01 through REQ-05.
  - Verification: `npx openspec validate action-skill-discovery-governance --strict`

## Phase 2: Constitutional Axiom 57 & Living Spec Codification
- [x] 2.1 Codify Axiom 57 in `GEMINI.md` <!-- id: TASK-SKILL-DISCOVERY-02 -->
  - Add Axiom 57 (`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`) to Section 2.1 in `GEMINI.md`.
  - Include semantic scan requirement, explicit gate declaration, mandatory SOP injection, and Swarm brief inheritance.
  - Verification: `git diff GEMINI.md`
- [x] 2.2 Codify Axiom 57 in `skills/pstack-openspec/SKILL.md` <!-- id: TASK-SKILL-DISCOVERY-03 -->
  - Register Axiom 57 in Section 2.1 and update the Layer 1 invariant inventory.
  - Verification: `git diff skills/pstack-openspec/SKILL.md`
- [x] 2.3 Codify Axiom 57 in `skills/ai-harness-openspec/SKILL.md` <!-- id: TASK-SKILL-DISCOVERY-04 -->
  - Synchronize Axiom 57 across companion workflow and harness skills.
  - Verification: `git diff skills/ai-harness-openspec/SKILL.md`

## Phase 3: Automated L2 Invariant Linter & Regression Test Suite
- [x] 3.1 Implement automated test suite `tests/action-skill-discovery-governance.test.mjs` <!-- id: TASK-SKILL-DISCOVERY-05 -->
  - Implement comprehensive checks:
    1. Constitutional Axiom 57 invariant check;
    2. Semantic matching engine simulation (verifying trigger discovery against Section 3.1 skills);
    3. OpenSpec delta spec verification;
    4. Domain neutrality audit (zero scenario-token leakage across Axiom 57 assets).
  - Verification: `node tests/action-skill-discovery-governance.test.mjs`

## Phase 4: Swarm-Delegated Implementation & Live Verification
- [x] 4.1 Dispatch execution to Swarm Subagent Worker via shared message board <!-- id: TASK-SKILL-DISCOVERY-06 -->
  - Initialize Swarm session, brief worker with OpenSpec task IDs, and monitor board handoff.
  - Verification: Live board interaction on `sidecar://swarm/swarm_board/`
- [x] 4.2 Receive verified exit code 0 evidence from Swarm Worker <!-- id: TASK-SKILL-DISCOVERY-07 -->
  - Worker runs `node --test tests/action-skill-discovery-governance.test.mjs` and posts result capsule to `@coordinator`.
  - Verification: Board message with `[Measured] exit code 0`

## Phase 5: Main Spec Synchronization & Global Mirror Distribution
- [x] 5.1 Sync delta specification into main spec `openspec/specs/orbitstack-pstack-routing/spec.md` <!-- id: TASK-SKILL-DISCOVERY-08 -->
  - Merge the 5 new requirements into main specification.
  - Verification: `git diff openspec/specs/orbitstack-pstack-routing/spec.md`
- [x] 5.2 Distribute to global system mirrors in `~/.gemini/config/` <!-- id: TASK-SKILL-DISCOVERY-09 -->
  - Synchronize byte-for-byte to `C:/Users/Administrator/.gemini/config/skills/pstack-openspec/SKILL.md` and `ai-harness-openspec/SKILL.md`.
  - Verification: Node hash comparison script (SHA-256 match).
- [x] 5.3 Git commit atomic archive and validation <!-- id: TASK-SKILL-DISCOVERY-10 -->
  - Validate all OpenSpec specs via `npx openspec validate --all --strict`.
  - Create atomic Git commit with clean git status.
  - Verification: `git status`
