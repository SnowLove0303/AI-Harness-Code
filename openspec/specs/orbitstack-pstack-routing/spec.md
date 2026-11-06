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

### Requirement: Gemini native task routing
The system SHALL route Gemini and Antigravity tasks through pinned upstream PStack `poteto-mode` and leaf skills. The route registry SHALL map all 23 playbooks to Gemini model tiers, native `invoke_subagent` workspaces, and `<appDataDir>\brain` context shielding.

**Invariant ID:** `INV-GEMINI-ROUTE-MAPPING`
**Origin:** `openspec/changes/gemini-harness-adapter/specs/orbitstack-pstack-routing/spec.md`
**Code anchors:** `orbitstack-gemini/SKILL.md`; `docs/pstack-openspec-route-map.json#routes`
**Expected behavior:** Every pinned playbook has a Gemini host mapping and model tier assignment, and the Gemini adapter routes tasks through PStack without mandatory confirmation loops on reversible work.
**Regression checks:** `node --test scripts/tests/gemini-adapter.test.mjs`

#### Scenario: Gemini subagent dispatch with isolated workspace
- **WHEN** a task requires delegated worker execution in a Gemini host
- **THEN** the parent agent dispatches a subagent via `invoke_subagent` using an isolated `branch` workspace and passes the machine-validated lossless handoff capsule generated from OpenSpec

#### Scenario: Gemini dynamic model tier mapping
- **WHEN** a PStack playbook is selected in Gemini
- **THEN** the adapter maps the playbook's reasoning requirement to the appropriate Gemini model tier (`flash_lite` for classification/linting, `flash` for standard features/bugfixes, `pro` for architecture/arena judging)

#### Scenario: Gemini artifact context shielding
- **WHEN** a delegated subagent or complex playbook generates extensive output, diffs, or logs
- **THEN** the output is preserved as a structured artifact in `<appDataDir>\brain\<conversation-id>` while the direct response to the parent remains a high-density summary under 2,000 tokens

#### Scenario: Gemini route inventory mapping
- **WHEN** the route registry is audited for Gemini capabilities
- **THEN** all 23 pinned playbooks contain explicit `geminiCapability` and `geminiModelTier` entries

#### Scenario: Gemini OpenSpec Explore phase tooling
- **WHEN** an Antigravity agent enters Phase 1 Explore mode
- **THEN** the agent executes in read-only mode, inspects context using `openspec context --json`, uses `openspec instructions` for schema guidance, and preserves architecture designs and Mermaid diagrams in `<appDataDir>\brain` artifacts before authoring `proposal.md`

### Requirement: Statutory Dual-Gate Entry Precondition and Anti-Premature Execution
The system SHALL strictly enforce the Statutory Dual-Gate Entry Precondition Axiom (`STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM`). Upon receiving any user task, defect report, or change directive, the agent SHALL NOT execute any file-modifying, code-writing, or pipeline-triggering tools in the initial turn. The agent SHALL first perform Step 0 (Spec-Kit requirement ingestion) and halt at Gate 1 by outputting the Requirement Confirmation Dossier and waiting for explicit user confirmation. The agent SHALL then author the OpenSpec specification and dual-checklist in Step 2 and halt at Gate 2, waiting for explicit user authorization before writing any implementation code. PStack inner-loop autonomy SHALL strictly apply only within Step 3 after single-focus task locking.

#### Scenario: Agent receives a new task or issue report
- **WHEN** an agent receives a new user instruction, problem report, or change request
- **THEN** it SHALL output the complete Spec-Kit Requirement Confirmation Dossier (Gate 1) and halt without calling code-writing, file-modifying, or pipeline-executing tools
- **AND** it SHALL wait for explicit user confirmation before initiating OpenSpec authoring.

#### Scenario: Agent prepares to implement code changes
- **WHEN** the agent finishes authoring the OpenSpec specification assets and dual-checklist (Gate 2)
- **THEN** it SHALL present the OpenSpec specification and dual-checklist to the user and halt
- **AND** it SHALL strictly wait for user authorization ("批准动工/执行/同意") before executing any implementation code in Step 3.

#### Scenario: Prevention of premature and unauthorized execution
- **WHEN** an agent attempts to execute changes without Gate 1 requirement alignment or Gate 2 authorization
- **THEN** the system SHALL treat the action as a statutory breach (`PREMATURE_EXECUTION_BLOCKED`) and require immediate halt and retraction.

### Requirement: Project Dual Blacklist-Whitelist Registry and False Positive Shield
The system SHALL mandate that each project audit system maintain an explicit dual registry comprising an authoritative Whitelist and a strict Blacklist. The Whitelist SHALL codify human-confirmed legitimate business structures, intentional exceptions, and golden master exemplars. Any code pattern or deliverable structure matching the Whitelist SHALL possess absolute immunity (`WHITELIST_SUPREME_IMMUNITY_AXIOM`) from defect classification. Any agent attempting to overhaul or refactor code based on an audit false-positive SHALL be blocked (`FALSE_POSITIVE_OVERHAUL_BLOCKED`).

#### Scenario: Agent audits a human-approved special pattern or syntax
- **WHEN** an audit rule encounters code or structure registered in the project Whitelist
- **THEN** the audit evaluation SHALL yield an immediate PASS verdict with immunity
- **AND** the agent SHALL NOT report a defect or propose speculative refactoring against that pattern.

### Requirement: Anti-False Negative Blacklist Enforcement and Leakage Blocker
The system SHALL mandate that all historical defect patterns, prohibited exogenous fabrications, and recurring regressions be codified into the project Blacklist (`BLACKLIST_MANDATORY_INTERCEPTION_AXIOM`). Blacklist patterns SHALL execute as deterministic AST, regex, or value-topology hard blockers with non-zero exit codes. Any release or delivery containing unflagged Blacklist patterns SHALL trigger an audit leakage breach (`AUDIT_LEAKAGE_DETECTED`).

#### Scenario: Agent encounters known defect pattern or exogenous hallucination
- **WHEN** code or deliverable structure matches any active entry in the project Blacklist
- **THEN** the audit engine SHALL trigger an unconditional FAIL verdict with exit code 1
- **AND** the agent SHALL NOT mark tasks complete until the offending pattern is completely eliminated.

### Requirement: Dual-Specimen Sanity Gate for Audit Rule Mutation
The system SHALL require that any addition, modification, or escalation of audit rules pass the Dual-Specimen Sanity Gate (`DUAL_SPECIMEN_SANITY_GATE`). The proposed rule MUST achieve zero false positives (100% pass) against the project's positive golden specimen suite, and zero false negatives (100% fail) against the project's negative fault mutant suite.

#### Scenario: Proposing a new or revised audit rule
- **WHEN** an agent proposes a new audit rule or updates an existing invariant
- **THEN** it SHALL execute the rule against both the positive specimen set and the negative mutant set
- **AND** if the rule fails either specimen suite, it SHALL be rejected (`UNVERIFIED_RULE_MUTATION_BLOCKED`).
