# Tasks: Canonical Entrypoint Invariance & Anti-Script Proliferation Governance

## Phase 1: Specification and Legislation Phase
- [x] 1.1 Finalize OpenSpec proposal, delta specs, and design artifacts <!-- id: TASK-CANONICAL-01 -->
  - Author `proposal.md`, `specs/orbitstack-pstack-routing/spec.md`, and `design.md` with complete Spec-Kit 1:1 RTM mappings.
  - Verify zero-omission of REQ-01 through REQ-05.
  - Verification: `npx openspec validate canonical-entrypoint-governance --strict`

## Phase 2: Constitutional Axiom 55 & Living Spec Codification
- [x] 2.1 Codify Axiom 55 in `GEMINI.md` <!-- id: TASK-CANONICAL-02 -->
  - Add Axiom 55 (`CANONICAL_ENTRYPOINT_&_ANTI_SCRIPT_PROLIFERATION_AXIOM`) to Section 2.1 in `GEMINI.md`.
  - Include canonical frontdoor exclusivity, scratch quarantine, mandatory crystallization/purge, and in-place core hardening principles.
  - Verification: `git diff GEMINI.md`
- [x] 2.2 Codify Axiom 55 in `skills/pstack-openspec/SKILL.md` <!-- id: TASK-CANONICAL-03 -->
  - Register Axiom 55 in Section 2.1 and update the Layer 1 invariant inventory.
  - Verification: `git diff skills/pstack-openspec/SKILL.md`
- [x] 2.3 Codify Axiom 55 in `skills/ai-harness-openspec/SKILL.md` & `spec-driven-workflow/SKILL.md` <!-- id: TASK-CANONICAL-04 -->
  - Synchronize Axiom 55 across companion workflow and harness skills.
  - Verification: `git diff skills/ai-harness-openspec/SKILL.md`

## Phase 3: Automated L2 Invariant Linter & Regression Test Suite
- [x] 3.1 Implement automated test suite `tests/canonical-entrypoint-governance.test.mjs` <!-- id: TASK-CANONICAL-05 -->
  - Implement comprehensive checks:
    1. Loose script audit (scanning root/src for unmanaged throwaway scripts);
    2. In-place core hardening invariant check (verifying core dispatcher ownership);
    3. Canonical routing invariant check (verifying frontdoor entrypoint contracts);
    4. Domain neutrality audit (verifying zero scenario-token leakage across Axiom 55 assets).
  - Verification: `node tests/canonical-entrypoint-governance.test.mjs`
- [x] 3.2 Execute automated test suite with exit code 0 <!-- id: TASK-CANONICAL-06 -->
  - Run the test suite and verify 100% clean passing with zero errors and zero warnings.
  - Verification: `node --test tests/canonical-entrypoint-governance.test.mjs`

## Phase 4: Main Spec Synchronization & Global Mirror Distribution
- [x] 4.1 Sync delta specification into main spec `openspec/specs/orbitstack-pstack-routing/spec.md` <!-- id: TASK-CANONICAL-07 -->
  - Merge the 5 new requirements into main specification.
  - Verification: `git diff openspec/specs/orbitstack-pstack-routing/spec.md`
- [x] 4.2 Distribute to global system mirrors in `~/.gemini/config/` <!-- id: TASK-CANONICAL-08 -->
  - Synchronize byte-for-byte to `C:/Users/Administrator/.gemini/config/skills/pstack-openspec/SKILL.md`, `ai-harness-openspec/SKILL.md`, and `spec-driven-workflow/SKILL.md`.
  - Verification: Node hash comparison script (SHA-256 match).
- [x] 4.3 Git commit atomic archive and validation <!-- id: TASK-CANONICAL-09 -->
  - Validate all OpenSpec specs via `npx openspec validate --all --strict`.
  - Create atomic Git commit with clean git status.
  - Verification: `git status`
