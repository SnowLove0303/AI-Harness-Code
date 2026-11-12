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

### Requirement: System Core vs. Peripheral Mutation Classification and Disambiguation
The system SHALL mandate that every task, proposal, and dual-checklist explicitly categorize proposed modifications into two mutually exclusive tiers (`SYSTEM_MUTATION_CLASSIFICATION_AXIOM`):
1. `[System Core Mutation]`: Modifications touching core engines, protocol handlers, global dispatchers, living specs, or fundamental state machines.
2. `[Peripheral Non-Core]`: Modifications restricted to documentation, project-level unit tests, project audit graph registries (whitelists/blacklists), and local configuration files.

#### Scenario: Agent prepares proposal and double checklist
- **WHEN** an agent evaluates candidate files for modification
- **THEN** it SHALL label every file as either `[System Core Mutation]` or `[Peripheral Non-Core]`
- **AND** if any file belongs to System Core, it SHALL activate the special approval protocol.

### Requirement: Statutory Dual-Gate Special Approval for System Core Mutation
The system SHALL require that any change categorized as `[System Core Mutation]` undergo dedicated dual-gate presentation and explicit user approval (`SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE`). The agent MUST provide a dedicated justification demonstrating why the requirement cannot be solved at the peripheral or policy layer, and submit a formal generality preservation proof before requesting execution authorization.

#### Scenario: Proposing modification to system core engines
- **WHEN** a change touches core system mechanics or cross-cutting runtime engines
- **THEN** the agent SHALL present a dedicated `【系统核心机制拟变专项说明】` in the dual-gate dossier
- **AND** the agent SHALL NOT modify any core files until the user explicitly authorizes the core mutation.

### Requirement: Generality Preservation and Anti-Scenario System Degradation
The system SHALL enforce that core system mechanics remain strictly domain-neutral and scenario-agnostic (`GENERALITY_PRESERVATION_AXIOM`). Any attempt to alter system core logic to satisfy a specific business scenario, hardcode single-scenario heuristics, or bypass an audit false-positive SHALL trigger an immediate static block (`SCENARIO_SYSTEM_MUTATION_BLOCKED`).

#### Scenario: Attempting to introduce single-scenario branch into core engine
- **WHEN** an agent attempts to insert scenario-specific branches or concrete business identifiers into a core system engine
- **THEN** the system SHALL reject the change with `SCENARIO_SYSTEM_MUTATION_BLOCKED`
- **AND** the agent SHALL redirect the requirement to the external calling policy or project whitelist.

### Requirement: Mechanism-Policy Decoupling and Orthogonal Architecture
The system SHALL mandate that system core components provide parameterizable, composable mechanisms only (`MECHANISM_POLICY_ORTHOGONAL_DECOUPLING`). All scenario-specific business logic, formatting rules, and audit triage decisions MUST reside in caller policies, project configurations, or project-level blacklist/whitelist registries.

#### Scenario: Handling edge-case formatting or validation request
- **WHEN** a specialized scenario demands custom behavior from a general-purpose engine
- **THEN** the agent SHALL configure or extend caller-level policy parameters
- **AND** the agent SHALL NOT mutate the internal mechanics of the general engine.

### Requirement: Lead Agent Systemic Governance and Fiduciary Duty
The system SHALL mandate that the Lead Agent (orchestrator / primary agent) and any agent responsible for modifying system architecture or project workflows uphold the Lead Agent Systemic Governance Role (`LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE`). The Lead Agent SHALL act as the primary architect and custodian of collective swarm safety, ensuring that all guardrails, invariants, and tooling protect every collaborating agent from fatal failure states.

#### Scenario: Lead Agent manages task or architectural modification
- **WHEN** a Lead Agent or architecture custodian agent plans or executes changes to project systems
- **THEN** it SHALL evaluate the impact not only on the immediate task, but on the long-term safety and reproducibility of the entire agent swarm
- **AND** it SHALL ensure all failure modes encountered are addressed systemically.

### Requirement: Lead Error Equals Swarm Inevitable Recurrence Invariant
The system SHALL enforce the Lead Error = Swarm Inevitable Recurrence Equivalence Theorem (`LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM`). Any error, assumption failure, or regression committed by the Lead Agent SHALL be formally classified as a systemic vulnerability in the environment's defense net, establishing that subordinate subagents and future agents will inevitably repeat the exact same mistake unless a mechanical barrier is deployed.

#### Scenario: Lead Agent commits a mistake or falls into a known trap
- **WHEN** an error or human correction is registered against the Lead Agent
- **THEN** the system SHALL treat the incident as a proof of systemic defense loophole across the entire swarm
- **AND** the Lead Agent SHALL NOT dismiss the error as a one-off slip or individual lapse.

### Requirement: Zero Tolerance for Superficial Apologies
The system SHALL enforce an absolute prohibition on superficial apologies, verbal repentance, and text-only promises (`SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE`). When an error is identified, the agent SHALL NOT output emotional or empty remorse phrases, and SHALL instead output objective engineering facts comprising failure mode specification, systemic causal analysis, and the proposed mechanical defense lever.

#### Scenario: Agent receives user correction or detects own error
- **WHEN** an agent is corrected by a user or discovers an execution failure
- **THEN** it SHALL omit all verbal apologies and empty promises
- **AND** it SHALL immediately deliver objective engineering facts and a concrete anti-recurrence plan.

### Requirement: Mechanical Defense Escalation for Recurrence Prevention
The system SHALL mandate that the primary objective of post-incident resolution is to engineer structural mechanisms that permanently prevent recurrence (`PREVENT_RECURRENCE_MECHANICAL_ESCALATION`). The agent MUST translate lessons learned into mechanical barriers (L1 state machine constraints, L2 AST/lint rules, L3 formal specifications, or L4 automated mutation test suites) that physically block all current and future agents from repeating the error.

#### Scenario: Post-incident resolution and defense hardening
- **WHEN** an agent addresses an error or correction incident
- **THEN** it SHALL construct a mechanical lever that enforces the invariant with exit code 1 on violation
- **AND** it SHALL verify that the new gate prevents all agents from repeating the same mistake.

### Requirement: Human-Decreed Specification Supremacy and Statutory Immunity
The system SHALL mandate that any explicit design, structure, formatting rule, or exception requested or confirmed by the human user holds supreme statutory immunity (`HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM`). Agents SHALL NOT re-classify human-decreed specifications as defects, nor repeatedly challenge, question, or attempt to refactor them based on external conventions or general pre-trained heuristics.

#### Scenario: Agent encounters human-confirmed custom design
- **WHEN** an agent evaluates code or deliverable structure confirmed by an explicit human decree
- **THEN** it SHALL grant immediate statutory immunity to that structure
- **AND** it SHALL NOT report a defect or propose unsolicited alterations against that design.

### Requirement: Governance System Domain-Agnostic Purity and Anti-Scenario Pollution
The system SHALL enforce that all meta-governance frameworks, living specifications, architectural rules, and linting guidelines remain 100% domain-neutral and scenario-agnostic (`GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM`). Agents modifying governance assets SHALL extract universal software engineering principles and agent behavioral constraints, and SHALL NOT inject any single-scenario business names, specific product identifiers, or document-specific section tokens (`SCENARIO_ANCHORING_LINT_BLOCKED`).

#### Scenario: Proposing updates to meta-governance specifications
- **WHEN** an agent authors or updates Ps-openspec, AI-Harness, or global rule assets
- **THEN** it SHALL formulate all rules using state machines, preconditions, AST nodes, and exit codes
- **AND** it SHALL reject any change containing concrete business scenario terms.

### Requirement: Anti-Common-Sense Arrogance and Whitelist Interception Gate
The system SHALL mandate that all audit and linting engines execute project whitelist interception prior to flagging defects (`PROJECT_WHITELIST_PHYSICAL_INTERCEPTION_GATE`). When an artifact matches an entry in the project whitelist, the audit engine SHALL short-circuit to an unconditional PASS verdict. Any agent attempting to override a whitelist entry using general pre-trained heuristics SHALL be blocked with `ANTI_COMMON_SENSE_ARROGANCE_BLOCKED`.

#### Scenario: Audit rule detects pattern matching project whitelist
- **WHEN** an evaluation pattern matches an active entry in the project whitelist
- **THEN** the audit engine SHALL emit an immediate IMMUNE_PASS verdict
- **AND** the agent SHALL NOT log a warning or failure for that pattern.

### Requirement: Real-Defect Attention Priority and False-Alarm Suppression
The system SHALL mandate that audit tools allocate their compute and attention budgets to detecting verified physical and structural defects (`REAL_DEFECT_ATTENTION_PRIORITY_GATE`). By suppressing false alarms against approved custom designs, the agent MUST focus on verifying physical render primitives, typography flags, bounding-box alignments, and binary data fidelity.

#### Scenario: Executing comprehensive quality verification
- **WHEN** an agent executes a quality audit on project deliverables
- **THEN** it SHALL verify physical styling, typography flags, and structural invariants
- **AND** it SHALL report only verified physical regressions rather than conceptual false positives.

### Requirement: Gate 1 Markdown Materialization and Dual-Section Layout
The system SHALL mandate that Step 0 Gate 1 physically generate an immutable Markdown asset (`.md`) prior to any downstream planning or implementation (`GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL`). The Markdown asset MUST contain two standardized sections: Section A (`来自于管理者的任务说明原文`), preserving 100% of the raw user instruction with SHA-256 fact fingerprint; and Section B (`第一门禁反馈`), containing comprehensive forensic root-cause analysis, fact reconciliation, and explicit acceptance criteria.

#### Scenario: Agent processes incoming user request in Turn 1
- **WHEN** an agent receives a new task, defect report, or change request
- **THEN** it SHALL generate a persistent `.md` document containing Section A and Section B
- **AND** it SHALL halt at Step 0 Gate 1 until the user explicitly confirms the document.

### Requirement: Gate 2 OpenSpec Zero Goal Loss Inheritance
The system SHALL require that Step 2 OpenSpec authoring directly inherit the confirmed Gate 1 Markdown asset (`GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE`). Every consensus item, constraint, and acceptance metric in Gate 1 MUST map 1:1 to an RFC 2119 specification requirement in `specs/` and an atomic task in `tasks.md`. Downstream proposals SHALL NOT summarize away, dilute, or omit any Gate 1 commitments.

#### Scenario: Transitioning from Gate 1 confirmation to Step 2 OpenSpec
- **WHEN** the user confirms the Gate 1 Markdown asset and enters Step 2
- **THEN** the agent SHALL ingest the Gate 1 `.md` file into OpenSpec `proposal.md`, `specs/`, `design.md`, and `tasks.md`
- **AND** the number of requirements and constraints SHALL remain strictly conserved without goal loss.

### Requirement: Execution-Phase Goal Invariance Lock and Capsule Handoff
The system SHALL mandate that execution in Step 3 (including delegation to subagents) strictly preserve the Gate 1-Gate 2 contract (`EXECUTION_PHASE_GOAL_INVARIANCE_LOCK`). The execution agent MUST receive the complete Gate 1 Markdown file and OpenSpec assets via the Four-in-One Handoff Capsule. A task in `tasks.md` SHALL NOT be marked complete until the specific acceptance criteria defined in Gate 1 for that requirement are proven with real exit code 0 evidence.

#### Scenario: Executing implementation tasks in Step 3
- **WHEN** an agent or subagent executes code changes under the single-focus lock `[-]`
- **THEN** it SHALL verify compliance against the original Gate 1 acceptance criteria
- **AND** it SHALL NOT mark tasks complete without verified test evidence.

### Requirement: Layered Goal Degradation Circuit Breaker and Omission Blocker
The system SHALL deploy an automated circuit breaker to prevent layered goal degradation (`GOAL_DEGRADATION_DETECTED`). If any requirement, boundary, or acceptance criterion from Gate 1 is omitted or contradicted in Gate 2 or Step 3, the pipeline SHALL immediately halt with `GOAL_DEGRADATION_DETECTED` and block delivery (`GATE1_GOAL_OMISSION_BLOCKED`).

#### Scenario: Static check detects omission of Gate 1 consensus item
- **WHEN** the delivery checkoff matrix or OpenSpec delta fails to account for any Gate 1 item
- **THEN** the system SHALL reject the change with `GOAL_DEGRADATION_DETECTED`
- **AND** the agent SHALL restore the omitted goal before proceeding.

### Requirement: Antigravity Universal Ps-openspec Coverage
The system SHALL mandate that all Antigravity tasks, sessions, and operational modes across the entire lifecycle unconditionally execute within the Ps-openspec governance framework (`ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM`). No task type—including feature engineering, defect repair, refactoring, codebase exploration, security/compliance audits, documentation, configuration, or ad-hoc inquiries—SHALL be exempted from Ps-openspec governance.

#### Scenario: Agent receives any task type or operational request
- **WHEN** an agent processes any task, inquiry, bug fix, or configuration request
- **THEN** it SHALL initiate the Ps-openspec lifecycle state machine
- **AND** it SHALL NOT execute ad-hoc, unmanaged code mutations outside the Ps-openspec framework.

### Requirement: Zero-Bypass Physical Circuit Breaker Gate
The system SHALL deploy a hard static circuit breaker against bypassing the Ps-openspec workflow (`BYPASS_PS_OPENSPEC_BLOCKED`). Any agent that attempts to modify code, execute mutating commands, or claim task completion without a verified physical Gate 1 Markdown asset (`PHYSICAL_GATE_ASSET_MANDATORY_INGESTION`) and explicit dual-gate approvals SHALL be immediately blocked with `BYPASS_PS_OPENSPEC_BLOCKED` and subject to atomic rollback.

#### Scenario: Agent attempts code modification without dual-gate clearance
- **WHEN** an agent attempts to invoke mutating tools before securing Gate 1 and Gate 2 clearances
- **THEN** the system SHALL reject the tool invocation with `BYPASS_PS_OPENSPEC_BLOCKED`
- **AND** it SHALL halt the pipeline until dual-gate requirements are physically met.

### Requirement: Physical Gate Asset Mandatory Ingestion Across All Tasks
The system SHALL mandate that every task in Antigravity generate and persist a physical Gate 1 Markdown asset in Step 0 (`PHYSICAL_GATE_ASSET_MANDATORY_INGESTION`). The asset MUST contain Section A (100% verbatim user instruction with SHA-256 fact fingerprint) and Section B (deep forensic feedback and RTM). Step 2 OpenSpec authoring MUST losslessly ingest the asset before code construction.

#### Scenario: Ingesting task requirements in Turn 1
- **WHEN** a task is initialized in Step 0
- **THEN** the system SHALL create a persistent Markdown file containing Section A and Section B
- **AND** Step 2 OpenSpec authoring SHALL bind its requirements directly to this physical asset.

### Requirement: Global Constitutional Supremacy and Swarm Homogeneity
The system SHALL legislate Ps-openspec as the supreme, immutable constitutional framework across all governing documents (`GEMINI.md`, `skills/pstack-openspec`, `skills/ai-harness-openspec`) and all agents in the swarm (`GLOBAL_CONSTITUTIONAL_SUPREME_STATUS`). All agent reasoning, subagent delegation, and tool invocations SHALL adhere to this unified governance baseline.

#### Scenario: Agent swarm coordinates across distributed subagents
- **WHEN** tasks are delegated or coordinated across multiple agents
- **THEN** all participating agents SHALL observe identical Ps-openspec constraints
- **AND** no subordinate agent SHALL operate under relaxed or ad-hoc rules.

### Requirement: Universal Engineering Language Standard
The system SHALL enforce that all governance definitions, blockers, and verification protocols use 100% pure software engineering and distributed system terminology (`UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD`). Any intrusion of concrete domain-specific or scenario-anchored terminology into system invariants SHALL be rejected.

#### Scenario: Verifying governance text and static invariants
- **WHEN** system rules, axioms, and tests are parsed or evaluated
- **THEN** they SHALL contain only domain-agnostic computer science constructs
- **AND** static analysis SHALL verify zero scenario-token leakage.

### Requirement: Project Canonical OpenSpec Gate 1 Dossier Directory Invariant
The system SHALL mandate that every project managed by an Agent maintain a dedicated, version-controlled directory under its `openspec/` root specifically designated for storing Gate 1 Markdown dossiers (`PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM`). The canonical path SHALL be `openspec/gate1-dossiers/` (or `openspec/gate1/`). No project lifecycle SHALL be deemed compliant without this standardized directory structure.

#### Scenario: Agent initializes or validates an OpenSpec-managed project
- **WHEN** an agent is assigned to or inspects any project
- **THEN** it SHALL verify that `openspec/gate1-dossiers/` exists under the project's OpenSpec root
- **AND** if the directory does not exist, the agent SHALL initialize it under version control.

### Requirement: Gate 1 Dossier Project Physical Storage Contract
The system SHALL mandate that all Step 0 Gate 1 Markdown documents be physically written to the project's canonical `openspec/gate1-dossiers/` directory (`GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT`). The file MUST contain Section A (100% verbatim raw instruction with SHA-256 fingerprint) and Section B (deep forensic feedback and 1:1 RTM). The file MUST be committed to Git alongside downstream code changes.

#### Scenario: Agent completes Step 0 requirement ingestion
- **WHEN** an agent formulates Gate 1 intent confirmation
- **THEN** it SHALL write the physical `.md` asset to `openspec/gate1-dossiers/<task-slug>-GATE1.md`
- **AND** it SHALL NOT rely solely on transient session-scoped storage.

### Requirement: Missing Project Gate 1 Directory Circuit Breaker
The system SHALL deploy a hard static circuit breaker against missing project-level Gate 1 directories or assets (`GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED`). If an agent attempts to proceed to Step 2 specification authoring or Step 3 execution without the Gate 1 dossier physically stored in the project's `openspec/gate1-dossiers/` folder, the tool gate SHALL immediately abort execution and trigger an atomic rollback.

#### Scenario: Agent attempts execution without project-level Gate 1 asset
- **WHEN** an agent attempts to invoke mutating tools or author specifications
- **THEN** the system SHALL verify that the physical `.md` file exists in `openspec/gate1-dossiers/`
- **AND** if the file or directory is missing, it SHALL abort with `GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED`.

### Requirement: Native Project Asset Inheritance and Bidirectional Tracing
The system SHALL require that Step 2 OpenSpec `proposal.md` and subsequent delivery checkoffs explicitly reference the project-relative path of the Gate 1 dossier (`GATE1_TO_OPENSPEC_PROJECT_INHERITANCE`). All consensus items, boundaries, and acceptance metrics defined in the project-canonical Gate 1 document MUST be inherited 1:1 into OpenSpec requirements and tasks.

#### Scenario: Authoring OpenSpec proposal and audit matrix
- **WHEN** an agent drafts OpenSpec assets in Step 2 or performs delivery checkoff in Step 5
- **THEN** it SHALL reference the Gate 1 dossier using its project-relative path
- **AND** it SHALL establish bidirectional verification against the project-grounded asset.

### Requirement: Universal Directory Governance Standard
The system SHALL enforce that all rules, blockers, and invariants governing project Gate 1 directories use 100% pure software engineering and filesystem topology terminology (`UNIVERSAL_GATE1_DIRECTORY_STANDARD`). The specification SHALL remain domain-neutral and scenario-agnostic.

#### Scenario: Validating directory governance invariants
- **WHEN** static analysis parses project directory rules
- **THEN** the specification SHALL contain only filesystem and distributed state machine concepts
- **AND** static analysis SHALL verify zero scenario-token leakage.

### Requirement: Tri-Phase Global Task Execution Strategy
The system SHALL mandate that all task execution across the entire lifecycle adhere to the Tri-Phase Global Task Execution Strategy (`TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM`). Every task MUST progress strictly through three sequential phases:
1. Phase 1: Objective enumeration of concrete business problems and empirical defects.
2. Phase 2: Upward abstraction of universal systemic flaws and resolution within system core mechanisms to prevent recurrence across all scenarios.
3. Phase 3: Resolution of the original concrete business problem using the generalized system capability and verification with real exit code 0 evidence.

#### Scenario: Agent initializes task execution planning
- **WHEN** an agent plans and implements changes for any task or defect
- **THEN** it SHALL formulate its proposal and tasks following Phase 1, Phase 2, and Phase 3
- **AND** it SHALL NOT skip universal abstraction to apply isolated symptom-level patches.

### Requirement: Universal Abstraction and Cross-Scenario Immunity
The system SHALL require that all system-level modifications abstract the underlying structural, state-machine, or syntactic defect into a universal mechanism (`UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL`). The solution MUST NOT be scoped exclusively to the immediate calling scenario, but MUST provide systemic immunity across all current and future scenarios.

#### Scenario: Agent analyzes root cause of concrete failure
- **WHEN** an agent investigates an observed failure mode
- **THEN** it SHALL perform upward causal penetration to identify the general failure class
- **AND** it SHALL engineer a generalized lever in system mechanisms that prevents that failure class across all scenarios.

### Requirement: System Mutation vs Scenario Policy Triage
The system SHALL enforce a deterministic decision boundary between system core mutations and scenario-specific policy resolutions (`SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM`):
1. System Core Mutation SHALL be selected ONLY when:
   - A structural mechanism is missing, a core state machine allows invalid transitions, or a universal invariant is violated across multiple scenarios;
   - The proposed change is 100% parameterizable, orthogonal, and domain-neutral.
2. Scenario Policy Resolution SHALL be selected when:
   - The requirement involves customer-specific formatting, single-case business rules, or user-decreed custom exceptions;
   - The change MUST be confined to caller configurations, project whitelists/blacklists, or local policies without mutating general engines.

#### Scenario: Agent determines change scope and blast radius
- **WHEN** an agent evaluates whether to modify core engines or caller policies
- **THEN** it SHALL apply the triage criteria and classify the proposed change
- **AND** it SHALL justify the selection in the OpenSpec proposal and double checklist.

### Requirement: Anti-Scenario System Narrowing Blocker
The system SHALL deploy a hard static circuit breaker against scenario-polluted system degradation (`ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED`). Any attempt to alter system core engines by injecting concrete business scenario identifiers, single-case hardcoded heuristics, or specialized branches that restrict general platform capabilities SHALL trigger an immediate static block and atomic rollback.

#### Scenario: Modification touches core engine with scenario-specific tokens
- **WHEN** static analysis detects scenario-specific tokens or specialized branch logic in core components
- **THEN** the system SHALL reject the modification with `ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED`
- **AND** it SHALL redirect the implementation to the scenario policy or project whitelist layer.

### Requirement: Universal Task Strategy Governance Standard
The system SHALL enforce that all rules, blockers, and invariants governing task execution strategy and system triage use 100% pure software engineering and distributed system terminology (`UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD`). The specification SHALL remain domain-neutral and scenario-agnostic.

#### Scenario: Validating task execution strategy specifications
- **WHEN** static analysis parses task strategy rules
- **THEN** the specification SHALL contain only formal software engineering concepts
- **AND** static analysis SHALL verify zero scenario-token leakage.

### Requirement: Pipeline Core Generality and Multi-Scenario Invariance
The system SHALL mandate that all underlying programs and shared engines powering pipeline tasks adhere to multi-scenario generality invariance (`PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM`). Agents SHALL NOT modify pipeline core mechanics, shared layout routines, or template infrastructures solely to satisfy a specific single-task context. Any modification to pipeline core engines MUST be proven to satisfy, preserve, and enhance multi-scenario compatibility across all existing and future pipeline instances.

#### Scenario: Agent modifies core pipeline component
- **WHEN** an agent proposes changes to underlying pipeline engines or shared formatters
- **THEN** it SHALL formulate the change as a generalized, parameterizable mechanism that accommodates multiple distinct task inputs
- **AND** it SHALL NOT implement single-case workarounds that restrict pipeline generality.

### Requirement: Zero Scenario-Pollution in System Core and Governance Documentation
The system SHALL strictly prohibit the introduction of specific task identifiers, concrete product codes, single-scenario batch numbers, or document-specific section tokens into system core code, shared templates, or governance documentation (`ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM`). Any commit, PR, or rule update containing concrete single-task names within system engines or system instructions SHALL be rejected with `SINGLE_TASK_HARDCODING_BLOCKED`.

#### Scenario: Static analysis scans system core and documentation
- **WHEN** changes to system core engines, rules, or living specs are evaluated
- **THEN** static analyzers SHALL verify that all expressions use purely domain-agnostic software engineering terminology
- **AND** any detected scenario-specific token SHALL trigger `SINGLE_TASK_HARDCODING_BLOCKED`.

### Requirement: Multi-Scenario Collaborative Regression Gate
The system SHALL mandate that any modification to underlying pipeline engines pass the Multi-Scenario Collaborative Regression Gate prior to delivery (`MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE`). The verification plane MUST execute regression testing not only against the active task specimen, but concurrently against at least two distinct golden benchmark specimens representing different pipeline configurations or input models, requiring exit code 0 and zero visual or structural degradation across all specimens.

#### Scenario: Verifying pipeline core modifications
- **WHEN** an agent completes modifications to a shared pipeline engine
- **THEN** the test harness SHALL execute the pipeline against the target task specimen and multiple reference golden specimens
- **AND** if any reference specimen experiences regressions or failures, the pipeline change SHALL be rejected.

### Requirement: Task Fact Parameterization and Core Engine Decoupling
The system SHALL enforce strict orthogonal decoupling between concrete task facts and core pipeline mechanisms (`TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM`). All model-specific metadata, customer parameters, and instance-level attributes MUST remain 100% encapsulated within external runtime payloads, input datasets, or caller configuration files. Core engines SHALL operate purely as parameter-driven interpreters and SHALL NOT contain conditional branches that hardcode specific input identifiers.

#### Scenario: Implementing model-specific behavior in pipeline
- **WHEN** a task requires specialized handling based on input characteristics
- **THEN** the agent SHALL express the specialization via parameterizable schema properties in the external payload
- **AND** the core engine SHALL evaluate the property generically without referencing the concrete task identity.

### Requirement: Universal Pipeline Generality Standard
The system SHALL enforce that all rules, blockers, and invariants governing pipeline task execution use 100% pure software engineering and distributed system terminology (`UNIVERSAL_PIPELINE_GENERALITY_STANDARD`). The specification SHALL remain domain-neutral and scenario-agnostic.

#### Scenario: Validating pipeline generality specifications
- **WHEN** static analysis parses pipeline governance rules
- **THEN** the specification SHALL contain only formal software engineering concepts
- **AND** static analysis SHALL verify zero scenario-token leakage.

### Requirement: Gate 1 and Gate 2 Dual-Scope Decoupling
The system SHALL mandate that Gate 1 (Intent Ingestion) and Gate 2 (Spec Legislation) explicitly distinguish between concrete issue instances and systemic low-level modifications (`GATE1_DUAL_SCOPE_DECOUPLING_RULE`). Gate 1 dossiers MUST define concrete issues under `[Concrete Issue]` with explicit reproduction procedures, failure manifestations, and targeted acceptance metrics, while categorizing any proposed system core or documentation adjustments strictly as unverified hypotheses (`[Inferred Hypothesis]`). The system SHALL NOT substitute systemic refactoring in place of resolving the concrete reported issue.

#### Scenario: Ingesting a user issue report in Gate 1
- **WHEN** a user reports a specific defect or unexpected behavior in an application scenario
- **THEN** Gate 1 SHALL register the concrete issue with dedicated reproduction and acceptance criteria
- **AND** any inferred systemic causes SHALL be marked as unverified hypotheses that cannot replace the concrete fix.

### Requirement: Phase 1 Targeted Concrete Resolution and Core Immunity Lock
The system SHALL mandate that tasks addressing concrete issues enforce a two-phase execution lifecycle (`PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK`). Phase 1 MUST prioritize targeted resolution of the concrete issue within minimal blast radius. During Phase 1, shared system core engines, generic frameworks, and meta-governance documentation SHALL remain locked under `SYSTEM_CORE_READONLY_LOCK`. The agent MUST produce empirical verification (`[Measured] Exit Code 0`) demonstrating that the concrete issue is resolved before proposing any core modifications.

#### Scenario: Executing Phase 1 concrete issue fix
- **WHEN** the agent implements the fix for the reported concrete issue
- **THEN** the single-focus execution lock SHALL apply only to target issue resolution within localized boundaries
- **AND** the system core engines SHALL remain untouched and immutable until measured proof is produced.

### Requirement: Human Stage Confirmation Collaborative Gate
The system SHALL establish an explicit human collaborative gate between Phase 1 and Phase 2 (`HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE`). Upon successfully verifying the concrete issue resolution with real exit code 0, the agent MUST present a stage resolution summary to the user. The agent SHALL NOT proceed to modify underlying system engines or shared meta-documentation without explicit human authorization confirming the concrete fix.

#### Scenario: Transitioning from Phase 1 to Phase 2
- **WHEN** Phase 1 completes with verified exit code 0 on the concrete issue reproduction test
- **THEN** the agent SHALL pause execution and report the empirical fix evidence to the user
- **AND** Phase 2 systemic consolidation SHALL activate only after the user explicitly approves the transition.

### Requirement: Phase 2 Ground-Truth-Driven Systemic Consolidation and Regression Net
The system SHALL mandate that Phase 2 systemic modifications derive strictly from empirical facts established during Phase 1 resolution rather than ungrounded cognitive hypotheses (`PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET`). Phase 2 core changes MUST undergo the Multi-Scenario Collaborative Regression Gate across the target task and at least two distinct golden reference specimens. If any reference specimen experiences degradation, the system SHALL execute immediate atomic rollback to the Phase 1 state.

#### Scenario: Consolidating systemic invariants in Phase 2
- **WHEN** the user confirms the concrete fix and authorizes Phase 2 systemic consolidation
- **THEN** the agent SHALL formulate generic architecture, lint, or type invariants grounded in the measured fix facts
- **AND** concurrent regression testing SHALL verify all reference specimens, aborting on any failure.

### Requirement: Universal Concrete-First Consolidation Standard
The system SHALL enforce that all rules, blockers, and invariants governing concrete issue priority and phased consolidation use 100% pure software engineering terminology (`UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD`). The specification SHALL remain domain-neutral, scenario-agnostic, and validated by automated test suites.

#### Scenario: Validating concrete-first consolidation specifications
- **WHEN** static analysis parses concrete-first and phased consolidation rules
- **THEN** the specification SHALL contain only formal software engineering concepts
- **AND** static analysis SHALL verify zero domain-specific token leakage.

### Requirement: REA Reverse Engineering MCP Server Integration
The system SHALL support and register the REA (Reverse Engineer Anything) MCP Server in system configurations (`mcp_config.json`). The server SHALL expose standard atomic tools for inspecting binary artifacts, extracting application assets, decompiling procedures, tracing cross-references, and generating canonical evidence bundles to AI coding agents.

#### Scenario: Agent invokes REA MCP tool
- **WHEN** an agent performs reverse engineering on a local binary or application
- **THEN** it SHALL invoke REA atomic MCP tools (e.g. `analyze`, `decompile`, `function`, `xrefs`, `search`)
- **AND** the tool SHALL return structured, evidence-backed inspection results.

### Requirement: REA Action Skill Governance Standard
The system SHALL provide a standardized Action Skill (`skills/rea-reverse-engineering/SKILL.md`) within the Ps-openspec tool layer. The skill SHALL define standard operating procedures (SOPs) for native binary analysis, JavaScript/Electron application reconstruction, Android APK inspection, and evidence-backed hypothesis validation under minimal blast radius constraints.

#### Scenario: Agent handles binary or closed-source application analysis
- **WHEN** a task requires inspecting or reverse-engineering an application without source code
- **THEN** the agent SHALL activate `skills/rea-reverse-engineering/SKILL.md`
- **AND** it SHALL execute the analysis in bounded, reproducible phases.

### Requirement: Action Skill Layer Constitutional Indexing for Reverse Engineering
The system SHALL index `rea-reverse-engineering` under Section 3.1 (`Action Skill Layer Index`) in `GEMINI.md` and `skills/pstack-openspec/SKILL.md`. Agents tackling reverse engineering or binary inspection tasks SHALL discover and activate the REA skill via graph routing before executing ad-hoc scripts.

#### Scenario: Graph router resolves reverse engineering capability
- **WHEN** the agent analyzes a task involving binary decompilation, Electron ASAR unpacking, or APK reverse engineering
- **THEN** the route map SHALL guide the agent to the `rea-reverse-engineering` action skill
- **AND** the constitutional index in `GEMINI.md` SHALL serve as the authoritative reference.

### Requirement: Evidence-Backed Invariant Validation for Reverse Engineering
The system SHALL require that all reverse engineering conclusions produced via REA adhere to evidence-backed validation (`[Measured]` proofs). Guesses regarding binary control flow, hidden APIs, or obfuscated algorithms SHALL NOT be asserted as ground truth without reproducible decompiler or disassembler evidence.

#### Scenario: Verifying reverse engineering findings
- **WHEN** an agent presents reverse engineering conclusions
- **THEN** every claim SHALL cite exact file offsets, symbol names, decompiled lines, or canonical evidence bundles
- **AND** unverified inferences SHALL remain explicitly labeled as hypotheses.

### Requirement: Universal Tooling and Domain Neutrality Standard
The specification and skill guidelines for REA SHALL remain 100% domain-neutral and scenario-agnostic, formulated purely in formal software security and reverse-engineering terms.

#### Scenario: Validating REA specification neutrality
- **WHEN** static analysis parses REA action skill rules and specifications
- **THEN** the specification SHALL contain only formal software engineering and binary analysis concepts
- **AND** static analysis SHALL verify zero domain-specific token leakage.

### Requirement: Canonical Entrypoint Invariance and Anti-Bypass Guardrail
The system SHALL mandate that every workflow, pipeline, or service interface define exactly one canonical entrypoint (such as a CLI runner, unified dispatcher, or standard MCP gateway) (`CANONICAL_ENTRYPOINT_INVARIANCE_RULE`). AI agents and execution harnesses SHALL route all operational requests, end-to-end verifications, and user-facing workflows through this canonical entrypoint. Agents SHALL NOT bypass the canonical frontdoor by executing private internal subroutines, unexported script files, or direct deep calls.

#### Scenario: Agent executes or verifies a workflow
- **WHEN** an agent executes, tests, or verifies a workflow or pipeline
- **THEN** it SHALL invoke the workflow via its declared canonical entrypoint
- **AND** it SHALL NOT bypass the frontdoor to invoke internal deep modules directly.

#### Scenario: Detecting ad-hoc or bypassed invocation
- **WHEN** static analysis or execution auditing detects an invocation bypassing the declared canonical entrypoint
- **THEN** the system SHALL reject the execution proof
- **AND** the agent SHALL re-execute the verification through the canonical frontdoor.

### Requirement: Throwaway Script Quarantine and Mandatory Crystallization / Purge Lifecycle
The system SHALL strictly prohibit scattering unmanaged, ad-hoc, or one-off temporary scripts across the repository root or business source directories (`ANTI_SCRIPT_PROLIFERATION_RULE`). If exploratory scratch scripts are necessary during investigative phases, they MUST remain strictly quarantined within designated sandboxed directories (e.g. `scratch/`). Before task completion and delivery, all temporary exploratory scripts MUST undergo mandatory disposition: either crystallizing their reusable logic into canonical entrypoints, official subcommands, or automated regression tests, or being permanently and cleanly purged.

#### Scenario: Exploratory scratch scripting during investigation
- **WHEN** an agent needs to create a temporary exploratory script to investigate a runtime behavior
- **THEN** it SHALL write the script strictly inside the designated sandboxed directory (e.g. `scratch/`)
- **AND** it SHALL NOT create throwaway scripts in the workspace root or production directories.

#### Scenario: Pre-delivery cleanup and crystallization
- **WHEN** an agent prepares to deliver a task or mark workflow verification complete
- **THEN** the agent SHALL ensure zero unmanaged temporary scripts reside in root or source trees
- **AND** any durable exploratory logic SHALL be crystallized into canonical commands or test suites, and temporary scratch files purged.

### Requirement: In-Place Core Hardening Convergence Standard
The system SHALL mandate that workflow optimizations, parameter expansions, and edge defect resolutions be applied in-place to the canonical entrypoint and core pipeline engine (`IN_PLACE_CORE_HARDENING_CONVERGENCE_RULE`). Agents SHALL NOT construct external wrapper scripts, ad-hoc pre-processors, or post-patch scripts to mask underlying pipeline defects. Core pipelines SHALL natively accommodate valid variations and recover gracefully from invalid input states.

#### Scenario: Resolving edge defects or extending parameters
- **WHEN** a workflow fails on edge parameters or unexpected input formats
- **THEN** the agent SHALL harden the canonical dispatcher and pipeline engine in-place
- **AND** the agent SHALL NOT generate an external wrapper script to patch inputs outside the core.

### Requirement: Canonical Entrypoint Empirical Witness Gate
The system SHALL require that task sign-off and verification checkoffs be grounded exclusively in empirical witness data produced via the canonical entrypoint (`CANONICAL_ENTRYPOINT_EMPIRICAL_WITNESS_GATE`). Proofs of correctness derived from isolated scratch scripts or bypassed subroutines SHALL be categorized as unverified claims and rejected. A verified exit code of 0 generated by the canonical entrypoint SHALL be a mandatory condition for task completion.

#### Scenario: Verifying and checking off workflow tasks
- **WHEN** an agent presents task completion evidence
- **THEN** all `[Measured]` verification proofs SHALL originate from the canonical entrypoint execution
- **AND** the recorded exit code SHALL be strictly 0 without suppressed errors or warnings.

### Requirement: Axiom 55 Constitutional Legislation and Universal Domain Neutrality
The system SHALL formally codify Axiom 55 (`CANONICAL_ENTRYPOINT_&_ANTI_SCRIPT_PROLIFERATION_AXIOM`) in Ps-openspec and AI-Harness constitutional documents (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_CANONICAL_ENTRYPOINT_STANDARD`). Automated Layer 2 linters and test suites SHALL enforce these invariants across the entire codebase.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 55 and its associated governance rules
- **THEN** the specification SHALL contain only formal software engineering and systems concepts
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Lead Agent Orchestration and Execution Decoupling Axiom
The system SHALL mandate that the Lead Agent (Coordinator) restrict its authority and operational scope strictly to governance, specification lifecycle, and final acceptance verification (`LEAD_AGENT_ORCHESTRATION_DECOUPLING_RULE`). The Lead Agent SHALL execute: Step 0 intent ingestion and Gate 1 dossier presentation; Step 1 architectural anchor and route resolution; Step 2 OpenSpec authoring and Gate 2 plan presentation; Swarm Worker dispatch; and Step 5 bidirectional physical checkoff and human final sign-off. The Lead Agent SHALL NOT write business implementation code or run heavy local debugging loops in Step 3.

#### Scenario: Lead Agent receives and plans a user task
- **WHEN** a user presents a task or bug report
- **THEN** the Lead Agent SHALL ingest the requirements into a Gate 1 dossier, author the OpenSpec specification assets, and obtain user authorization
- **AND** the Lead Agent SHALL NOT execute the implementation directly.

#### Scenario: Lead Agent attempts direct code modification in Step 3
- **WHEN** execution reaches Step 3 implementation
- **THEN** architectural guardrails SHALL prohibit the Lead Agent from performing direct implementation code edits
- **AND** the Lead Agent SHALL dispatch the work to designated Swarm Workers.

### Requirement: Mandatory Swarm Worker Delegation for Step 3 Implementation
The system SHALL mandate that all concrete task execution in Step 3 (including writing production code, refactoring modules, diagnosing compiler errors, and running automated test suites) be delegated to Swarm Subagent Workers (`SWARM_WORKER_DELEGATION_RULE`). Workers SHALL coordinate via structured briefs and `@mentions` on the shared message board, utilizing isolated workspaces (`inherit` or `branch`). Workers SHALL report milestone completion and measured verification evidence to `@coordinator`.

#### Scenario: Dispatching Step 3 implementation to Swarm
- **WHEN** an OpenSpec change is authorized for implementation
- **THEN** the Lead Agent SHALL spawn named Swarm Workers via the `swarm` interface with structured briefs
- **AND** the Workers SHALL execute the tasks and coordinate via the shared message board.

#### Scenario: Swarm Worker completes task and reports evidence
- **WHEN** a Swarm Worker finishes code changes and executes verification commands
- **THEN** it SHALL post the empirical exit code 0 evidence to the board addressed to `@coordinator`
- **AND** the Lead Agent SHALL inspect the evidence before updating OpenSpec task records.

### Requirement: Maximum Lead Agent Availability and Context Shield Architecture
The system SHALL enforce a double context shield to maximize the Lead Agent's availability and responsiveness (`LEAD_AGENT_HIGH_AVAILABILITY_RULE`). Detailed execution traces, voluminous test logs, and intermediate compiler diagnostics MUST remain encapsulated within Swarm Worker sessions and persistent artifact storage. The Lead Agent's context MUST remain lightweight and unblocked, allowing it to ingest, plan, and pipeline multiple concurrent user tasks without interface stalling.

#### Scenario: Ingesting concurrent user tasks
- **WHEN** the user submits new tasks while Swarm Workers are executing prior changes
- **THEN** the Lead Agent SHALL remain unblocked and capable of processing the new requests through Step 0 and Step 2
- **AND** the Lead Agent SHALL NOT be stalled by background worker execution logs.

#### Scenario: Swarm execution produces voluminous diagnostics
- **WHEN** a Swarm Worker executes a verbose build or test suite
- **THEN** the verbose output SHALL remain encapsulated in the Worker's private session
- **AND** only the concise result capsule SHALL be communicated to the Lead Agent.

### Requirement: OpenSpec Tasks and Swarm Focus-Lock Bidirectional Binding
The system SHALL mandate that Swarm Worker dispatch briefs be strictly derived from and bidirectionally bound to OpenSpec `tasks.md` (`OPENSPEC_SWARM_BIDIRECTIONAL_BINDING_RULE`). Each dispatched task SHALL correspond to an explicit atomic task ID and verification command. Swarm Workers SHALL hold the single-focus execution lock (`[-]`), and task checkoffs in `tasks.md` SHALL require verified `[Measured]` exit code 0 evidence returned by the Worker.

#### Scenario: Formulating Swarm Worker briefs
- **WHEN** the Lead Agent prepares a brief for a Swarm Worker
- **THEN** the brief SHALL cite the specific OpenSpec task ID, target boundaries, and verification criteria
- **AND** the Worker SHALL acknowledge and execute under the single-focus lock.

#### Scenario: Checking off OpenSpec tasks
- **WHEN** updating task status in `tasks.md`
- **THEN** the Lead Agent SHALL verify that the Swarm Worker produced a real exit code of 0 on the designated verification command
- **AND** the Lead Agent SHALL NOT mark tasks complete without empirical proof.

### Requirement: Axiom 56 Constitutional Legislation and Universal Domain Neutrality
The system SHALL formally codify Axiom 56 (`LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral software engineering and distributed multi-agent system terminology (`UNIVERSAL_SWARM_DECOUPLING_STANDARD`). Automated Layer 2 linters and test suites SHALL mechanically verify these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis audits Axiom 56 and its associated rules
- **THEN** the specification SHALL contain only formal software engineering, distributed systems, and agent orchestration terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.
