# orbitstack-pstack-routing Specification

## Purpose
Provide complete upstream PStack capability through a Codex-compatible adapter while keeping OpenSpec the only durable project change lifecycle.

## Requirements

### Requirement: Codex task routing
The system SHALL route Codex tasks through the pinned upstream PStack `poteto-mode`, the selected playbook, and applicable leaf skills. PStack SHALL remain the primary execution method. A versioned registry SHALL map every upstream playbook to its source, representative fixture, OpenSpec action, authorization boundary, Codex capability or fallback, per-route durable task source, supporting skills, and verification evidence. Behavior evaluation SHALL record expected and observed routes and actual gate behavior. Structural inventory checks alone MUST NOT count as behavior proof.

**Invariant ID:** `INV-PSTACK-ROUTE-SOURCE`
**Origin:** `docs/pstack-openspec-route-map.json`, baseline commit `9317068ecab93f291cf36cab95b37deb95080eba`
**Code anchors:** `docs/pstack-openspec-route-map.json#routes`; `scripts/audit-pstack-openspec-routing.ps1#routeAudit`
**Expected behavior:** Every pinned playbook has one complete route entry and the global Codex registry matches the source.
**Regression checks:** `scripts/audit-pstack-openspec-routing.ps1`

#### Scenario: Host capability unavailable
- **WHEN** an upstream playbook requests a Cursor-only model route, agent type, UI, or automation
- **THEN** the adapter selects an available Codex equivalent or records the exact unavailable step and safe fallback while preserving the playbook's objective and verification

#### Scenario: Complete playbook inventory is mapped
- **WHEN** the pinned PStack upstream inventory is audited
- **THEN** each upstream playbook has exactly one route registry entry with source, OpenSpec action, authorization boundary, task source, host mapping, supporting skills, and evidence requirements, with no missing or duplicate playbook IDs

#### Scenario: Every route is behaviorally evaluated
- **WHEN** an organic fixture for each PStack playbook is dispatched through the Codex entrypoint
- **THEN** the evaluation records the expected and observed route, OpenSpec action, gate behavior, transcript evidence, and verdict using PStack's blinded Eval procedure

#### Scenario: OpenSpec remains the only durable task source
- **WHEN** a PStack playbook creates an execution checklist
- **THEN** implementation progress and completion evidence are recorded in the active OpenSpec `tasks.md`, and no parallel persistent PStack task ledger or Blackboard is created

#### Scenario: PStack execution steps persist in OpenSpec
- **WHEN** an implementation task uses a PStack playbook
- **THEN** the playbook's steps are copied verbatim into the active OpenSpec `tasks.md` before task-specific additions

#### Scenario: PStack and OrbitStack instructions conflict
- **WHEN** an OrbitStack instruction conflicts with the selected PStack playbook or principle
- **THEN** the PStack rule controls, except where the user gave a direct task instruction or a safety boundary requires a pause

#### Scenario: Independent execution continues when a helper is unavailable
- **WHEN** Code Review Graph or another optional helper is unavailable
- **THEN** the agent uses the documented PStack verification and deterministic fallback checks, continues independent work, and does not claim the unavailable step ran

### Requirement: Initial routing audit
The system SHALL include a structural inventory audit and a PStack-compliant blinded behavior evaluation that record expected and observed playbook, OpenSpec action, PStack-defined authorization boundaries, host fallbacks, and verification evidence.

#### Scenario: Audit each representative task
- **WHEN** the routing audit evaluates representative task classes
- **THEN** investigation, bug fix, feature, refactor, performance, prototype, multi-phase, PR follow-up, and skill/eval tasks each have a documented expected route and pass/fail evidence

#### Scenario: Audit every playbook route
- **WHEN** the pinned PStack route set is evaluated
- **THEN** each fixture records its expected route, observed route, executed steps, host fallbacks, transcript evidence, and independent judge verdict; structural file checks alone do not count as behavior proof

### Requirement: OpenSpec single durable lifecycle
The system SHALL use the actual project OpenSpec root and its active change as the sole durable record for change intent, requirements, tasks, verification status, and archive history. The Codex adapter and installer SHALL configure OpenSpec's supported Codex skills without overwriting existing project specs, instructions, or build facts.

**Invariant ID:** `INV-OPEN-SPEC-SINGLE-SOURCE`
**Origin:** `openspec/specs/orbitstack-pstack-routing/spec.md`, baseline commit `9317068ecab93f291cf36cab95b37deb95080eba`
**Code anchors:** `orbitstack-codex/SKILL.md#OpenSpec lifecycle`; `scripts/pstack-handoff.mjs#generateHandoffFromOpenSpec`
**Expected behavior:** OpenSpec is the only persistent task-state source; no parallel Blackboard or checklist is created.
**Regression checks:** `node --test scripts/tests/pstack-handoff.test.mjs`; `openspec validate --all --strict`

#### Scenario: Existing change exists
- **WHEN** a task maps to an existing active OpenSpec change
- **THEN** PStack routing continues within that change and does not create a parallel plan, task ledger, or second change

#### Scenario: No active change exists
- **WHEN** implementation changes project behavior
- **THEN** the system creates one OpenSpec change with proposal, applicable delta specs, design when needed, and tasks before implementation

#### Scenario: Existing OpenSpec project
- **WHEN** the target project already has OpenSpec configuration, specs, or changes
- **THEN** the installer preserves them, resolves the actual root, and updates only OpenSpec-managed Codex skills through the OpenSpec CLI

#### Scenario: New OpenSpec project
- **WHEN** the target project has no OpenSpec root and the CLI is available
- **THEN** setup runs `openspec init --tools codex` from the verified project root and confirms the resulting context and Codex skills

#### Scenario: OpenSpec CLI prerequisites are unavailable
- **WHEN** the target environment cannot run the OpenSpec CLI
- **THEN** setup reports the concrete prerequisite and recovery command without claiming initialization succeeded or overwriting project instructions

### Requirement: Lossless PStack subagent handoff
The system SHALL use PStack's Fresh Subagents and Consolidated Scope methods for delegated work. The handoff capsule SHALL retain the original user request verbatim, all appended directives in order, the OpenSpec change and task IDs, the selected PStack playbook and its copied steps, prior work and Git state, allowed and read-only scope, protected behaviors, non-goals, and acceptance evidence. The capsule SHALL be derived from OpenSpec artifacts and the current worktree; it MUST NOT establish a parallel durable task ledger.

**Invariant ID:** `INV-PSTACK-HANDOFF-ORIGINAL-INTENT`
**Origin:** `OpenSpec change pstack-first-lossless-handoff, proposal artifact retained in archive`
**Code anchors:** `scripts/pstack-handoff.mjs#createHandoffCapsule`; `scripts/tests/pstack-handoff.test.mjs#verbatimIntentTests`
**Expected behavior:** Original user intent and later directives survive handoff exactly and in order, with a digest that changes when source instructions change.
**Regression checks:** `node --test scripts/tests/pstack-handoff.test.mjs`

#### Scenario: Original intent reaches a subagent
- **WHEN** a parent Agent delegates an OpenSpec task
- **THEN** the capsule includes the complete original request and each later directive without substituting a paraphrase, and carries a stable digest that the receiving Agent acknowledges

#### Scenario: Delegated scope is auditable
- **WHEN** a subagent returns work
- **THEN** the parent checks the returned task ID, digest, branch, changed paths, and acceptance evidence against the capsule before updating OpenSpec task status

#### Scenario: Shared task state has one writer
- **WHEN** multiple subagents work in parallel
- **THEN** each has an isolated branch or worktree, and the parent Agent alone updates the shared OpenSpec change artifacts

### Requirement: Historical fixes and accepted optimizations remain protected
The system SHALL record accepted behaviors that must survive future changes in OpenSpec specifications with stable invariant IDs, provenance, implementation anchors, and regression evidence. A change that affects a protected behavior MUST explicitly supersede or revise its OpenSpec requirement and prove the replacement behavior before the old protection is removed.

**Invariant ID:** `INV-HISTORICAL-REGRESSION-GUARD`
**Origin:** `OpenSpec change pstack-first-lossless-handoff, proposal artifact retained in archive`
**Code anchors:** `scripts/audit-protected-invariants.mjs#auditProtectedChanges`; `scripts/tests/protected-invariants.test.mjs#protectedInvariantTests`
**Expected behavior:** Changes that affect a previously accepted fix or optimization identify its invariant and pass the recorded regression checks; behavior replacement requires explicit supersession.
**Regression checks:** `node --test scripts/tests/protected-invariants.test.mjs`

#### Scenario: New change touches a protected code path
- **WHEN** a changed symbol or affected flow maps to a protected invariant
- **THEN** the audit identifies its source change, expected behavior, and regression checks; the change cannot pass while required checks fail or the OpenSpec change lacks an explicit supersession decision

#### Scenario: Unrelated change has no protected impact
- **WHEN** Graph and deterministic path checks show no relationship to a protected invariant
- **THEN** the task proceeds under its selected PStack playbook without unrelated gates

#### Scenario: Graph is missing or stale
- **WHEN** the Code Review Graph is unavailable or reports stale data
- **THEN** the audit rebuilds it when possible and uses `git diff`, symbol search, and mapped regression checks as a documented fallback; the graph limitation does not cancel independent task work

### Requirement: Protected invariant records are machine-auditable
Each protected behavior SHALL be recorded as an OpenSpec requirement with the metadata labels `Invariant ID`, `Origin`, `Code anchors`, `Expected behavior`, and `Regression checks`. An affected task SHALL classify each touched invariant as preserved or superseded and name its verification command. The invariant record SHALL remain in OpenSpec and MUST NOT be copied into a parallel registry.

#### Scenario: Protected invariant is touched
- **WHEN** a task changes a path or symbol linked to a protected invariant
- **THEN** its OpenSpec task metadata classifies that invariant as preserved or superseded and includes the check that proves the disposition

#### Scenario: Protected behavior is replaced
- **WHEN** a user-authorized change intentionally replaces protected behavior
- **THEN** the active OpenSpec delta names the superseded invariant, defines the replacement behavior, and records passing replacement evidence before archive

### Requirement: OrbitStack extensions do not duplicate PStack
The system SHALL retain only the two OrbitStack extensions that close gaps in PStack: lossless original-intent handoff and graph-assisted protection of accepted historical behavior. Existing PStack equivalents SHALL be reused instead of maintaining duplicate workflows. Graph data SHALL remain a derived code-relationship view, not a source of user intent or task state.

#### Scenario: OrbitStack rule duplicates PStack
- **WHEN** an OrbitStack guide restates a PStack playbook or principle without adding a user-specific constraint
- **THEN** the PStack source remains authoritative and the duplicate guidance is removed or reduced to a pointer

#### Scenario: Graph reports an impact
- **WHEN** Code Review Graph identifies changed symbols, callers, or flows
- **THEN** the result informs review and points to OpenSpec invariant IDs; OpenSpec remains the authority for why behavior is protected and what may change
