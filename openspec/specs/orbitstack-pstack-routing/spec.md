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

### Requirement: Task-Time Action Skill Discovery and Semantic Matching Axiom
The system SHALL mandate that when an agent receives any user task, it SHALL analyze the task description and extract domain semantic keywords to scan against Ps-openspec's execution layer skills (`skills/` and Section 3.1 in `GEMINI.md`) (`ACTION_SKILL_DISCOVERY_RULE`). The system SHALL automatically evaluate whether the incoming task falls within the domain of an existing specialized Action Skill.

#### Scenario: Ingesting task requirements and scanning skill registry
- **WHEN** an agent receives a task in Step 0
- **THEN** it SHALL perform an automated semantic scan across Section 3.1 action skills
- **AND** it SHALL determine if any specialized skill matches the task scope.

#### Scenario: Evaluating candidate action skill matches
- **WHEN** task keywords match triggers of registered action skills (e.g. reverse engineering, desktop application, UI/UX design)
- **THEN** the system SHALL mark the matching action skill as candidate
- **AND** it SHALL record the rationale for applying the specialized skill.

---

### Requirement: Explicit Skill Match Declaration in Gate 1 and Gate 2
The system SHALL mandate that Gate 1 dossiers (`GATE1.md`) and Gate 2 OpenSpec proposals (`proposal.md`) include an explicit statutory section titled `## Action Skill Match Declaration` (`EXPLICIT_SKILL_MATCH_DECLARATION_RULE`). The declaration MUST explicitly list the matched action skill identifier, source path, and target capability. If no specialized skill in the execution layer matches the task, the agent MUST explicitly declare `[None - Standard Engineering Playbook]`. Silent omission of the skill declaration SHALL constitute a gate validation failure.

#### Scenario: Compiling Gate 1 dossier and Gate 2 proposal
- **WHEN** the agent prepares Gate 1 or Gate 2 deliverables
- **THEN** it SHALL include the explicit Action Skill Match Declaration section
- **AND** it SHALL name the matched skill or declare `[None - Standard Engineering Playbook]`.

#### Scenario: Attempting silent skip of skill match declaration
- **WHEN** Gate 1 or Gate 2 assets omit the Action Skill Match Declaration section
- **THEN** static analysis SHALL reject the deliverable as incomplete
- **AND** the agent SHALL add the explicit declaration before requesting approval.

---

### Requirement: Mandatory Active Adoption and Constraint Injection Gate
The system SHALL mandate that whenever a specialized Action Skill is matched, the agent MUST proactively adopt and bind the skill to the execution plan (`MANDATORY_ACTION_SKILL_ADOPTION_GATE`). The agent SHALL inject the skill's Standard Operating Procedures (SOPs), MCP toolchains, and quality assertions into OpenSpec `tasks.md`. Agents SHALL NOT bypass matching Action Skills to implement unvetted ad-hoc workarounds.

#### Scenario: Task matches an action skill in the registry
- **WHEN** a task is matched to an Action Skill
- **THEN** the agent SHALL map the skill's SOP phases directly into `tasks.md`
- **AND** the agent SHALL NOT devise competing ad-hoc workflows.

#### Scenario: Detecting skill bypass attempts
- **WHEN** an agent attempts to implement a task without adopting a matched specialized skill
- **THEN** architectural linters SHALL flag a `SKILL_BYPASS_BLOCKED` violation
- **AND** the agent SHALL incorporate the required skill SOP into the task plan.

---

### Requirement: Swarm Worker Brief Skill Inheritance
The system SHALL mandate that when the Lead Agent dispatches implementation tasks to Swarm Workers, the dispatch brief MUST inherit and cite the matched Action Skill (`SWARM_BRIEF_SKILL_INHERITANCE_RULE`). The brief SHALL include the mandatory directive `🚨 [MANDATORY ACTION SKILL: <name>]`. Swarm Workers SHALL load the designated skill instructions and execute under its specialized quality contracts.

#### Scenario: Formulating Swarm Worker briefs for skill-backed tasks
- **WHEN** the Lead Agent prepares a brief for an Action Skill-backed task
- **THEN** it SHALL inject the skill identifier and execution constraints into the brief
- **AND** the Worker SHALL acknowledge and execute under the skill's SOP.

#### Scenario: Swarm Worker verifies task with skill-specific criteria
- **WHEN** a Swarm Worker completes implementation under a specialized Action Skill
- **THEN** its reported verification evidence SHALL satisfy the skill's specific quality criteria
- **AND** the Lead Agent SHALL verify compliance before marking the task complete.

---

### Requirement: Axiom 57 Constitutional Legislation and Universal Domain Neutrality
The system SHALL formally codify Axiom 57 (`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral software engineering terminology (`UNIVERSAL_SKILL_DISCOVERY_STANDARD`). Automated Layer 2 linters and test suites SHALL mechanically verify these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis audits Axiom 57 and its associated rules
- **THEN** the specification SHALL contain only formal software engineering, tool discovery, and skill orchestration terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Zero-Prompt Swarm Auto-Dispatch Invariance
The system SHALL mandate that when any agent operating under Ps-openspec receives an approved task and enters Step 3 implementation, it SHALL automatically and by default initiate Swarm multi-agent orchestration (`DEFAULT_AUTONOMOUS_SWARM_DISPATCH_RULE`). The system SHALL NOT require, expect, or wait for explicit user prompt keywords (such as "use swarm", "启用蜂群", or "open swarm") to trigger Swarm execution. Swarm delegation SHALL be the intrinsic, default, and sole legitimate execution path for Step 3 implementation.

#### Scenario: User provides generic execution command
- **WHEN** the user provides an execution confirmation (e.g. "执行", "同意", "approve") without mentioning Swarm
- **THEN** the Lead Agent SHALL automatically initialize a Swarm session and board
- **AND** the Lead Agent SHALL dispatch implementation tasks to Swarm Subagent Workers.

#### Scenario: User issues a task with no architectural keywords
- **WHEN** the user requests a code change or bug fix without specifying tooling
- **THEN** the system SHALL formulate the OpenSpec change and Step 3 plan with default Swarm delegation
- **AND** the system SHALL NOT degrade to monolithic single-agent execution.

---

### Requirement: Default Swarm Task Modeling in OpenSpec
The system SHALL mandate that during Step 2 OpenSpec authoring, all Step 3 concrete implementation and empirical verification tasks in `tasks.md` MUST be modeled and structured as Swarm-delegated operations (`DEFAULT_SWARM_TASK_MODELING_RULE`). Each execution task SHALL define a structured dispatch brief contract, single-focus execution lock (`[-]`), and empirical verification requirement. Agents SHALL NOT author tasks that assume the Lead Agent will execute code modifications directly.

#### Scenario: Authoring Step 3 tasks in OpenSpec
- **WHEN** an agent authors tasks in `tasks.md` for Step 3 implementation
- **THEN** each concrete implementation task SHALL be designated for Swarm delegation
- **AND** the tasks SHALL specify worker brief parameters and empirical exit code 0 verification criteria.

#### Scenario: Evaluating task structure compliance
- **WHEN** an OpenSpec change is submitted to Gate 2 review
- **THEN** static linters SHALL verify that Step 3 implementation phases specify Swarm delegation
- **AND** any task assuming monolithic Lead Agent implementation SHALL be rejected.

---

### Requirement: Anti-Monolithic Execution Degradation Gate
The system SHALL enforce a strict architectural barrier against monolithic execution degradation (`ANTI_MONOLITHIC_EXECUTION_BLOCKED`). If a Lead Agent attempts to execute Step 3 code modifications, manual debugging loops, or heavy test runs directly in its primary conversation context without dispatching to a Swarm Worker, the system SHALL immediately trigger an `ANTI_MONOLITHIC_EXECUTION_BLOCKED` fault and halt the unmediated operation.

#### Scenario: Lead Agent attempts direct code modification in Step 3
- **WHEN** execution reaches Step 3 and the Lead Agent attempts direct file edits without Swarm delegation
- **THEN** governance linters SHALL flag an `ANTI_MONOLITHIC_EXECUTION_BLOCKED` violation
- **AND** execution SHALL halt until tasks are dispatched to a Swarm Worker.

#### Scenario: Rationale for monolithic execution is presented
- **WHEN** an agent attempts to bypass Swarm claiming the task is minor or trivial
- **THEN** the governance gate SHALL reject the exemption
- **AND** all Step 3 concrete implementation tasks SHALL proceed through Swarm workers.

---

### Requirement: Transparent Swarm UX and Seamless Collaboration
The system SHALL maintain a seamless, zero-overhead user experience where Swarm orchestration details remain encapsulated behind standard Ps-openspec gate interactions (`TRANSPARENT_SWARM_UX_PROTOCOL`). The user SHALL interact exclusively through Step 0 requirement alignment, Step 2 plan approval, and Step 5 empirical checkoff. Background Swarm board creation, worker spawning, watchdog monitoring, and board message passing SHALL operate autonomously without demanding manual user intervention.

#### Scenario: User observes system progress during Step 3
- **WHEN** Swarm Workers execute tasks in isolated workspaces
- **THEN** verbose execution logs and intermediate build diagnostics SHALL remain shielded from the user's primary context
- **AND** the Lead Agent SHALL report clear, consolidated milestone updates and empirical exit code 0 evidence.

#### Scenario: Swarm Worker completes task execution
- **WHEN** a Swarm Worker finishes work and posts results to `@coordinator`
- **THEN** the Lead Agent SHALL verify the empirical exit code 0 evidence and update `tasks.md`
- **AND** the Lead Agent SHALL present the final physical checkoff matrix to the user.

---

### Requirement: Axiom 56 Autonomous Dispatch Amendment and Domain Neutrality
The system SHALL formally amend Axiom 56 (`LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM`) across all constitutional documents (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) to incorporate the zero-prompt auto-dispatch invariant (`UNIVERSAL_SWARM_AUTO_ACTIVATION_STANDARD`). The specification SHALL use 100% domain-neutral, scenario-agnostic software engineering terminology, and automated Layer 2 linters SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 56 and its auto-dispatch clauses
- **THEN** the specification SHALL contain only formal software engineering, distributed systems, and agent orchestration terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Direct-to-User Session Lead Identity Invariance
The system SHALL mandate that any agent instance instantiated within or communicating directly through the primary user session window SHALL irrevocably possess the statutory role and identity of Lead Agent / Coordinator (`@coordinator`) (`DIRECT_USER_SESSION_IS_LEAD_COORDINATOR_RULE`). The agent SHALL NOT undergo identity drift or consider itself a generic individual contributor, ad-hoc coder, or standalone worker. The Lead Agent identity SHALL remain exclusive, immutable, and continuous throughout the entire session lifecycle.

#### Scenario: Agent receives direct user input
- **WHEN** the agent processes a message received directly from the user
- **THEN** it SHALL anchor its self-identity as `@coordinator`
- **AND** it SHALL execute under the governance constraints of the Lead Agent role.

#### Scenario: Agent assesses execution permissions
- **WHEN** the agent evaluates whether it can perform concrete Step 3 code modifications
- **THEN** its anchored Lead Agent identity SHALL prohibit direct implementation
- **AND** it SHALL restrict its actions to specification, dispatch, and empirical sign-off.

---

### Requirement: Task-Time Identity Self-Reflection Protocol
The system SHALL mandate that the Lead Agent perform an active identity self-reflection across every step of the Ps-openspec lifecycle (`TASK_TIME_IDENTITY_SELF_REFLECTION_PROTOCOL`). In Step 0 and Step 1, the agent SHALL verify its role as Chief Architect and Gate 1 presenter; in Step 2, as Specifier and Gate 2 planner; in Step 3, as Dispatcher and Supervisor strictly delegating work to Swarm Workers; and in Step 5, as Final Judge reconciling physical evidence.

#### Scenario: Transitioning from Step 2 to Step 3
- **WHEN** Gate 2 is approved and execution transitions to Step 3
- **THEN** the Lead Agent SHALL execute the identity self-reflection check
- **AND** the check SHALL confirm: "I am @coordinator; I MUST NOT edit production code; I MUST dispatch to Swarm Workers."

#### Scenario: Detecting monolithic execution impulses
- **WHEN** the agent considers editing files or running test scripts directly in Step 3
- **THEN** the self-reflection protocol SHALL intervene
- **AND** it SHALL force the agent to formulate a Swarm Worker brief instead.

---

### Requirement: Identity Drift and Direct Implementation Hard Gate
The system SHALL enforce a strict architectural barrier against identity drift and monolithic role regression (`IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED`). If an agent in a direct-to-user session attempts to modify production codebase files or execute heavy local test loops directly in its primary conversation context during Step 3, the system SHALL immediately flag an `IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED` violation and abort the unmediated execution.

#### Scenario: Direct-to-user agent attempts code modification in Step 3
- **WHEN** an agent in the primary user session invokes file modification tools in Step 3 without Swarm delegation
- **THEN** governance linters SHALL flag an `IDENTITY_DRIFT_&_ROLE_REGRESSION_BLOCKED` fault
- **AND** the system SHALL reject the modification and instruct the agent to dispatch a Swarm Worker.

#### Scenario: Agent attempts to justify direct modification
- **WHEN** an agent attempts to bypass Swarm claiming task brevity or urgency
- **THEN** the circuit breaker SHALL deny the exception
- **AND** the agent SHALL restore its `@coordinator` identity and delegate through Swarm.

---

### Requirement: Statutory Coordinator Board Role Authority
The system SHALL establish that within the Swarm multi-agent communication graph, the Lead Agent alone SHALL hold the statutory identity `@coordinator` with exclusive authority over board creation, title configuration, worker dispatch, and final sign-off (`COORDINATOR_ROLE_BOARD_AUTHORITY`). Subagents spawned by the coordinator SHALL operate exclusively as `@worker-N` or specialized peers (e.g. `@tester`, `@scanner`, `@watchdog`) in isolated branches or workspaces.

#### Scenario: Coordinator posts task assignments to the board
- **WHEN** the Lead Agent prepares work for Swarm execution
- **THEN** it SHALL post the structured brief under the verified author identity `@coordinator`
- **AND** only named Workers SHALL claim and execute the implementation.

#### Scenario: Swarm Worker completes task execution
- **WHEN** a Swarm Worker finishes work in its isolated workspace
- **THEN** it SHALL report measured exit code 0 evidence addressed to `@coordinator`
- **AND** the `@coordinator` alone SHALL have the authority to update OpenSpec task records.

---

### Requirement: Axiom 58 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 58 (`LEAD_AGENT_IDENTITY_SELF_AWARENESS_&_STATUTORY_COORDINATOR_UNIQUENESS_AXIOM`) across all constitutional documents (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_LEAD_IDENTITY_STANDARD`). Automated Layer 2 linters and test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 58 and its identity rules
- **THEN** the specification SHALL contain only formal software engineering, distributed systems, and multi-agent persona terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Explicit Issue as Tip of Iceberg Axiom
The system SHALL mandate that whenever a user points out a specific defect, anomaly, or execution failure, the system SHALL treat the cited issue as an explicit sentinel probe representing a broader category of submerged vulnerabilities (`EXPLICIT_ISSUE_ICEBERG_PROBE_RULE`). Agents SHALL NOT evaluate user feedback as an isolated local exception. The system SHALL automatically assume that the underlying failure mode possesses deeper structural causality and potential sibling instances across the codebase.

#### Scenario: User provides feedback on a specific defect
- **WHEN** the user identifies a specific error, misbehavior, or omission
- **THEN** the system SHALL classify the finding as an explicit Iceberg Probe
- **AND** the system SHALL NOT restrict analysis to the cited symptom alone.

#### Scenario: Evaluating defect scope
- **WHEN** an agent assesses the blast radius and remediation scope of a reported issue
- **THEN** it SHALL mandate both vertical depth penetration and horizontal breadth sweeps
- **AND** it SHALL reject superficial, single-point workarounds.

---

### Requirement: Vertical Depth 5-Whys Penetration Protocol
The system SHALL mandate that when processing any identified defect, the agent MUST execute a formal 5-Whys root cause penetration protocol (`DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL`). The penetration SHALL trace from the immediate runtime symptom through logic omissions, type and assertion blind spots, planning and gate failures, up to constitutional architecture gaps. The agent SHALL NOT finalize remediation proposals without documenting this complete causal chain.

#### Scenario: Agent traces failure causality
- **WHEN** an agent investigates an identified defect
- **THEN** it SHALL formulate the 5-Whys causal progression
- **AND** it SHALL identify the systemic design weakness that permitted the defect to materialize.

#### Scenario: Formulating architectural remediation
- **WHEN** the 5-Whys penetration reveals a structural invariant gap
- **THEN** the remediation plan SHALL target the root constitutional layer
- **AND** the agent SHALL NOT rely on localized conditionals or symptom suppression.

---

### Requirement: Horizontal Exhaustive Sibling Sweep Protocol
The system SHALL mandate that upon identifying a defect pattern, the agent MUST perform an exhaustive horizontal sweep across all homologous modules, lifecycle steps (Step 0 through Step 5), and companion specification mirrors (`HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL`). The agent SHALL assemble an explicit sibling inventory and remediate all discovered co-occurring or homologous vulnerabilities within the same change cycle.

#### Scenario: Scanning for homologous vulnerabilities
- **WHEN** a defect pattern is extracted from an identified issue
- **THEN** the system SHALL scan all structurally similar components, lifecycle gates, and specification documents
- **AND** it SHALL catalog all matching sibling vulnerabilities.

#### Scenario: Resolving sibling vulnerabilities
- **WHEN** sibling instances of a defect pattern are identified
- **THEN** the task plan SHALL incorporate fixes for all cataloged instances
- **AND** the agent SHALL verify remediation across all affected modules before closure.

---

### Requirement: Single-Point Failure Triggers Systemic Hardening Gate
The system SHALL enforce a mandatory systemic hardening gate requiring that every resolved failure mode descend into permanent, machine-enforced defenses (`SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE`). Remediation SHALL NOT be deemed complete solely by resolving the immediate symptom; the agent MUST establish Layer 1 architectural constraints, Layer 2 automated linter assertions (with measured exit code 0), or Layer 3 constitutional invariants, supported by generalized regression suites.

#### Scenario: Finalizing defect remediation
- **WHEN** implementation of a defect fix is completed
- **THEN** the system SHALL verify that a corresponding automated L2 test or static assertion is introduced
- **AND** the gate SHALL block completion if systemic invariant defenses are absent.

#### Scenario: Preventing regression across defect categories
- **WHEN** automated test suites run during regression verification
- **THEN** the suite SHALL execute both positive defense tests and negative mutation anti-fraud checks
- **AND** any recurrence of the defect pattern SHALL trigger a hard build block.

---

### Requirement: Axiom 59 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 59 (`PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM`) in the repository-owned `GEMINI.md` and `skills/ai-harness-openspec/SKILL.md`, and SHALL assess any separately maintained global or upstream mirrors as discovered homologous surfaces without modifying them absent explicit authorization. The rule SHALL use domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_ICEBERG_PROBE_STANDARD`). Automated Layer 2 regression assertions SHALL mechanically enforce the repository-owned invariants and report any unaddressed mirror drift.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 59 and its associated penetration rules
- **THEN** the specification SHALL contain only formal software engineering, causal analysis, and systemic auditing terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: User-Centric Behavioral Paradigm Axiom
The system SHALL mandate that whenever investigating or verifying defects involving user-facing features, user interfaces, controls, workflows, or interactive elements, the system SHALL evaluate correctness strictly from the external observational vantage point of user interaction and sensory feedback (`USER_OBSERVATIONAL_VANTAGE_RULE`). Agents SHALL NOT declare an issue non-existent or resolved based solely on internal implementation details, syntactic validity, or unrendered code logic when the observable interaction remains defective.

#### Scenario: Agent receives user defect report on interactive feature
- **WHEN** the user reports an anomaly, failure, or unexpected behavior in an interactive control or feature
- **THEN** the system SHALL reject purely internal code analysis as sufficient proof of correctness
- **AND** the system SHALL mandate verification against user-observable states and accessibility semantics.

#### Scenario: Assessing interactive element interactability
- **WHEN** an agent evaluates whether an action or control is functioning
- **THEN** it SHALL verify interactability preconditions (pointer visibility, non-occlusion, disabled status, and event propagation)
- **AND** it SHALL NOT treat component function existence alone as evidence of functional accessibility.

---

### Requirement: Behavioral Emulation Pre-Repair Reproduction Protocol
The system SHALL enforce a mandatory pre-repair reproduction protocol requiring that prior to applying modifications to production business logic for an interactive defect, the agent MUST formulate a minimal behavioral emulation reproducing the reported interaction failure (`BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL`). Modification of production code SHALL be blocked until the failure is deterministically reproduced in an interaction harness or verified reproduction ticket.

#### Scenario: Agent attempts code modification for interactive defect
- **WHEN** an agent plans to edit production code addressing an interaction failure
- **THEN** the system SHALL check for a verified reproduction test or emulation trace
- **AND** the system SHALL block premature execution if behavioral reproduction is absent.

#### Scenario: Resolving interactive defects
- **WHEN** implementation of a defect fix is completed
- **THEN** the agent MUST rerun the behavioral emulation
- **AND** the defect SHALL only be marked resolved when the behavioral emulation achieves measured exit code 0.

---

### Requirement: Headless In-Memory Zero-Intrusion Standard
The system SHALL mandate that behavioral emulation and user-centric testing execute via headless, in-memory DOM and AST-level query inspection (`HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD`). The emulation harness SHALL simulate realistic user action cascades (e.g., hover, focus, pointer down, click, and DOM mutation) within memory, completing execution within millisecond benchmarks without creating desktop window popups, visual focus stealing, or disruption to ongoing user workflows.

#### Scenario: Running behavioral emulation tests
- **WHEN** automated interaction emulation suites execute during development or CI
- **THEN** tests SHALL run completely headlessly in memory (via virtual DOM / AST query inspection)
- **AND** the execution SHALL produce zero intrusive desktop windows or UI interruptions.

---

### Requirement: Parallel Multi-Tiered Verification Gate Invariant
The system SHALL mandate that user-centric behavioral emulation operates as an additive, non-substitutive mandatory verification gate alongside all existing verification layers (`MULTI_TIERED_COEXISTENT_VERIFICATION_GATE`). The system SHALL NOT deprecate, bypass, or replace compiler checks, static linters, pure unit tests, or human review gates. Acceptance SHALL strictly require coexistent passage of: (1) Compiler & linter checks with zero warnings, (2) Core logic and state machine unit tests, (3) User-centric behavioral emulation tests, and (4) Human visual diff tactile review.

#### Scenario: Verification pipeline execution
- **WHEN** a change undergoes pre-commit or completion verification
- **THEN** the verification pipeline SHALL execute all coexistent tiers in sequence
- **AND** a failure in any tier (compiler, unit test, behavioral emulation, or linter) SHALL block completion.

---

### Requirement: Axiom 60 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 60 (`USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM`) across all engineering constitutions (`GEMINI.md` and `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD`). Automated Layer 2 linters and test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 60 and its associated emulation rules
- **THEN** the specification SHALL contain only formal software engineering, event emulation, accessibility tree, and gate verification terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Proactive Autonomous Delegation Invariant
The system SHALL mandate that the Lead Agent, as the statutory coordinator and architect, MUST proactively and autonomously delegate implementation, debugging, and verification tasks to Swarm workers or specialized Subagents without awaiting explicit user prompting (`PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT`). Monolithic self-implementation by the Lead Agent during Step 3 SHALL be strictly forbidden.

#### Scenario: Lead Agent transitions from Step 2 to Step 3
- **WHEN** Gate 2 receives user approval and enters Step 3 implementation
- **THEN** the Lead Agent SHALL automatically initiate autonomous worker dispatch
- **AND** the Lead Agent SHALL NOT execute direct production code edits in the primary context.

#### Scenario: Assessing task delegation compliance
- **WHEN** an implementation task is executed
- **THEN** the system SHALL verify that execution occurs within a dispatched Swarm worker or Subagent
- **AND** direct implementation by the Lead Agent SHALL trigger role regression blocking.

---

### Requirement: Dual-Engine Deterministic Dispatch Routing Protocol
The system SHALL enforce a deterministic, non-overlapping dual-engine dispatch routing standard separating subagent delegation tools based on task category (`DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL`):
1. **Interactive Browser & Visual Validation Engine**: All tasks involving live browser navigation, UI interaction reproduction, DOM visual inspection, and client-rendered verification SHALL route to `invoke_subagent` utilizing the `browser` subagent.
2. **Code Implementation & Engineering Swarm Engine**: All tasks involving codebase implementation, multi-file refactoring, test suite authoring, and adversarial auditing SHALL route to `swarm` utilizing named workers with structured task briefs.

#### Scenario: Task involves UI button interaction and DOM reproduction
- **WHEN** a task requires reproducing a user interface failure or checking visual rendering
- **THEN** the system SHALL automatically route the assignment to `invoke_subagent(TypeName="browser")`
- **AND** the system SHALL NOT dispatch code-only CLI workers for visual reproduction.

#### Scenario: Task involves modifying repository code and running test suites
- **WHEN** a task requires writing, editing, or testing repository code
- **THEN** the system SHALL automatically route the assignment to `swarm(action="add", ...)`
- **AND** the system SHALL NOT execute monolithic editing in the primary session.

---

### Requirement: Zero-Friction Default Dispatch Standard
The system SHALL mandate zero-friction default parameter configurations for Swarm worker dispatch (`ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD`):
1. **Workspace Mode**: Swarm workers SHALL default to `workspace="inherit"` for standard repository modifications to eliminate VCS worktree creation failures, unless isolated branch execution is explicitly mandated.
2. **Model Selection**: Dispatch requests SHALL default to omitting the `model` parameter (inheriting the coordinator's current model tier) or binding directly to fast, high-quota models, eliminating model choice hesitation.
3. **Structured Brief Format**: The dispatch brief SHALL follow a standardized four-part structure: (1) Owned files, (2) Reference context, (3) Exact exit criteria, and (4) Communication tag (`@coordinator`).

#### Scenario: Dispatching a Swarm worker
- **WHEN** the coordinator dispatches an implementation worker
- **THEN** the dispatch call SHALL utilize `workspace="inherit"` by default
- **AND** the dispatch call SHALL avoid manual parameter hesitation.

---

### Requirement: Mandatory Delegation Ticketing Invariant
The system SHALL enforce that when constructing `tasks.md` during Step 2 OpenSpec authoring, every single implementation and verification task MUST be explicitly formatted as a delegation ticket (`MANDATORY_DELEGATION_TICKETING_INVARIANT`). Task items SHALL explicitly specify the target engine and worker identity (e.g., `[-] [Swarm: <worker-name>] <task-description>` or `[-] [Subagent: browser] <task-description>`). Any `tasks.md` containing untargeted or monolithic task descriptions SHALL fail statutory OpenSpec validation.

#### Scenario: OpenSpec authoring in Step 2
- **WHEN** the agent authors `tasks.md` for an approved change
- **THEN** all implementation task entries SHALL include structured delegation annotations
- **AND** tasks lacking worker targeting SHALL be rejected by static gate checks.

---

### Requirement: Anti-Monolithic Pre-Execution Hook Gate
The system SHALL enforce an active pre-execution hook gate that intercepts any direct modification tool invocation (`edit_file`, `write_file`) attempted by the Lead Agent during Step 3 on production assets (`ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE`). Upon interception, the system SHALL block execution and emit an explicit prompt requiring immediate worker delegation via `swarm` or `invoke_subagent`.

#### Scenario: Lead Agent invokes direct editing tool during Step 3
- **WHEN** the primary coordinator calls a file modification tool on a production source file
- **THEN** the system SHALL evaluate whether the call is executed by an authorized worker
- **AND** if executed by the Lead Agent, the call SHALL be halted with role regression violation.

---

### Requirement: Axiom 61 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 61 (`AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD`). Automated Layer 2 test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 61 and its associated dispatch protocols
- **THEN** the specification SHALL contain only formal distributed coordination, dual-engine routing, and architectural gate terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Dual-Track Deconstruction Engine Standard
The system SHALL mandate a dual-track deconstruction engine methodology for reverse engineering and analyzing mature software applications (`DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD`). The system SHALL combine:
1. **Dynamic Black-Box Behavioral Tracing**: Capturing user event cascades, accessibility tree interactions, DOM mutations, and network protocol payload deltas via live or simulated execution.
2. **Static White-Box Architectural Modeling**: Reconstructing abstract syntax trees (ASTs), schema hierarchies, transaction statecharts, and data persistence models.
Agents SHALL NOT evaluate or deconstruct complex applications based solely on superficial visual appearances.

#### Scenario: Agent initiates reverse deconstruction of a mature application
- **WHEN** an agent is tasked with analyzing, cloning, or referencing a mature application
- **THEN** the system SHALL mandate execution of both dynamic behavioral tracing and static structural modeling
- **AND** the system SHALL reject single-layer visual-only analysis.

#### Scenario: Capturing interaction and data protocols
- **WHEN** the agent investigates application feature execution
- **THEN** it SHALL extract the full event cascade from user trigger down to protocol delta updates
- **AND** it SHALL map the state transition in a formal statechart specification.

---

### Requirement: Document Application Deconstruction Benchmark
The system SHALL enforce an exhaustive deconstruction standard for rich text, block-based, and collaborative document applications (`DOCUMENT_APP_DECONSTRUCTION_BENCHMARK`). When deconstructing document suites, the agent MUST extract and model:
1. **Block Hierarchy & Node Schema**: Full catalog of structural blocks (paragraphs, lists, tables, canvas/whiteboard elements, embeds).
2. **Selection & Range State Machine**: Modeling cursor position, multi-block selection, fractional indexing, and boundary traversal.
3. **Transaction & Immutable Step Engine**: Step-based mutations, undo/redo inverse operations, and state immutability.
4. **Interaction & Command Surface**: Slash `/` menu registries, markdown inline shortcuts, keyboard bindings, and drag-and-drop handles.
5. **Collaboration & Persistence Protocol**: Yjs / CRDT delta serialization, local storage persistence, and conflict-resolution rules.

#### Scenario: Deconstructing a mature document editor
- **WHEN** an agent analyzes a production document application
- **THEN** the output SHALL include all five structural tiers (Block, Selection, Transaction, Command, Collaboration)
- **AND** any deconstruction omitting block schemas or transaction statecharts SHALL be flagged as incomplete.

---

### Requirement: Action Skill Layer Crystallization
The system SHALL establish `skills/app-reverse-deconstruction/SKILL.md` as an authoritative action skill within the Ps-openspec action layer (`ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT`). The skill SHALL define standard operating procedures (SOPs), toolchain bindings with REA MCP tools (such as `analyze-javascript-application`, `recover-javascript-sources`, `evidence-export`), and trigger keywords enabling any Lead or Subagent to activate reverse deconstruction on demand.

#### Scenario: Agent requires deep application deconstruction
- **WHEN** a task requires structural feature extraction from an existing software application
- **THEN** the system SHALL proactively discover and adopt `app-reverse-deconstruction`
- **AND** the agent SHALL execute the codified four-phase deconstruction SOP.

---

### Requirement: Clean-Room Specification & Immutable Evidence Gate
The system SHALL enforce that all reverse deconstruction activities terminate in a standardized Clean-Room Specification (`DECONSTRUCT_SPEC.md`) paired with a tamper-evident Evidence graph (`CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE`). The specification SHALL isolate functional behavior, data contracts, and statecharts from proprietary source code, enabling compliant clean-room re-implementation.

#### Scenario: Concluding deconstruction analysis
- **WHEN** deconstruction of an application is completed
- **THEN** the agent SHALL output a validated `DECONSTRUCT_SPEC.md`
- **AND** the output SHALL include reproducible evidence artifacts verifying functional parity.

---

### Requirement: Axiom 62 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 62 (`MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD`). Automated Layer 2 test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 62 and its associated deconstruction protocols
- **THEN** the specification SHALL contain only formal reverse engineering, clean-room design, statechart, and evidence verification terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Standalone Worker Constitution Standard
The system SHALL establish a standardized, repository-root `worker.md` specification governing all dispatched Swarm workers and asynchronous subagents (`STANDALONE_WORKER_CONSTITUTION_STANDARD`). The Lead Agent SHALL mandate that all subagent dispatch briefs begin with an explicit instruction to review `worker.md`. The specification SHALL enforce:
1. **Autonomous Reversible Decision Authority**: Workers SHALL make independent, reversible implementation choices without blocking the coordinator for trivial approvals.
2. **Mechanical Exit Code 0 Baseline**: Workers SHALL NOT report completion without achieving real measured process exit code 0 under strict linter and test suite runs.
3. **PR-Ready Clean Deliverable Standard**: Output SHALL be strictly formatted, devoid of unverified comments, debugging statements, or conversational slop.

#### Scenario: Dispatching a Swarm worker
- **WHEN** the coordinator dispatches any subagent worker
- **THEN** the initial line of the brief SHALL reference `worker.md`
- **AND** the worker SHALL govern execution according to its autonomous baseline.

#### Scenario: Subagent encounters an implementation detail
- **WHEN** a worker reaches a reversible implementation choice
- **THEN** it SHALL resolve the choice autonomously
- **AND** it SHALL NOT halt execution to poll the coordinator.

---

### Requirement: Mechanical L2 Unslop Assertion Gate
The system SHALL enforce a mechanical Layer 2 static analysis gate via an automated script (`scripts/check-unslop-purity.mjs`) checking for AI conversational filler and ungrounded prose (`MECHANICAL_L2_UNSLOP_ASSERTION_GATE`). The assertion dictionary SHALL reject:
1. Ungrounded participial clauses (e.g. trailing `ensuring...`, `highlighting...` without facts).
2. Known high-frequency AI buzzwords (e.g. `delve`, `crucial`, `landscape`, `pivotal`, `testament`, `underscore`, `vibrant`).
Any detected violation in checked documents SHALL trigger exit code 1 and halt CI/commit workflows.

#### Scenario: Running static unslop purity check
- **WHEN** the unslop validation script executes on shipped documentation and commit messages
- **THEN** it SHALL scan for banned patterns and filler syntax
- **AND** any match SHALL result in process exit code 1.

#### Scenario: Clean text validation
- **WHEN** text containing purely factual engineering descriptions is evaluated
- **THEN** the script SHALL pass with exit code 0.

---

### Requirement: Formal Statechart Shortest Path Protocol
The system SHALL mandate formal statechart verification standards for multi-state, concurrent, or transactional workflows (`FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL`). When architecting or refactoring complex state transitions, the agent MUST model states and transitions in a formal statechart, explicitly evaluate reachability invariants, and calculate the shortest path to potential invariant violations or deadlocks.

#### Scenario: Modeling complex state machine
- **WHEN** an agent designs a state machine
- **THEN** it SHALL formulate state transitions with explicit invariant constraints
- **AND** it SHALL prove that no reachable path violates terminal invariants.

---

### Requirement: All-Sites Defect Remediation Mandate
The system SHALL enforce an all-sites defect remediation mandate extending Axiom 59 (`ALL_SITES_DEFECT_REMEDIATION_MANDATE`). Whenever a specific fault pattern is resolved, the agent MUST execute a comprehensive search across all files, lifecycle phases, and mirrored specifications for identical or homologous fault patterns, documenting an exhaustive resolution ledger before change closure.

#### Scenario: Resolving a defect pattern
- **WHEN** a bug is diagnosed and resolved at a specific location
- **THEN** the agent SHALL search for all co-occurring instances across the codebase
- **AND** all confirmed homologous instances SHALL be resolved in the same change cycle.

---

### Requirement: Axiom 63 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 63 (`PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_PSTACK_FUSION_STANDARD`). Automated Layer 2 test suites SHALL mechanically enforce these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 63 and its associated protocols
- **THEN** the specification SHALL contain only formal distributed delegation, AST linting, statechart verification, and regression terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.

### Requirement: Master Problem Ledger Ingestion Protocol
When an engineering task references an external problem document, audit report, or defect list, the system SHALL automatically classify the task as a Problem/Issue Remediation Task in Step 0.
The system SHALL atomize all defects identified in the source document into distinct, immutable entries designated as `[ISSUE-01]` through `[ISSUE-K]`, establishing a Master Problem Ledger in the Gate 1 dossier.
Each entry in the Master Problem Ledger SHALL define:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Defect Title, Observed Symptom, and Source Code Anchor
3. Initial Reproduction Command or Failing Test Specimen (Witness)
4. Causal Classification (`[Root Source]` or `[Consumer Sink]`)
5. Independent Acceptance Assertion Criteria

The ledger item count $N_{\text{Ledger}}$ SHALL strictly equal the count $K$ of atomic issues in the source document ($N_{\text{Ledger}} \equiv K$). Any omission or compression of source issues SHALL trigger a `PROBLEM_INGESTION_COMPRESSION_BLOCKED` circuit breaker.

#### Scenario: Problem Document Ingestion Conservation
- **GIVEN** an external audit Markdown document containing 4 distinct defects
- **WHEN** the agent processes the user instruction to resolve defects according to the document
- **THEN** the Gate 1 dossier SHALL generate a Master Problem Ledger containing exactly 4 entries (`[ISSUE-01]` to `[ISSUE-04]`)
- **AND** the agent SHALL NOT truncate or aggregate the defects into a single generic item.

---

### Requirement: Issue-to-Task Bijective Invariant
In Step 2 of the Ps-openspec lifecycle, task decomposition in `tasks.md` SHALL maintain a 1:1 bijective relationship with the Master Problem Ledger.
Every canonical issue `[ISSUE-xx]` SHALL correspond to an independent, dedicated task block in `tasks.md`.
The system is FORBIDDEN from bundling or aggregating multiple distinct issues into a single composite task (`BUNDLED_ISSUE_TASK_FORBIDDEN`).
Each issue task block SHALL contain discrete sub-tasks covering failing reproduction, root cause remediation, structural immunity, verified passing, and sibling sweeps.

#### Scenario: Bijective Task Structure Enforcement
- **GIVEN** a Master Problem Ledger containing $K$ entries
- **WHEN** the agent authors `tasks.md` for Gate 2 approval
- **THEN** `tasks.md` SHALL contain at least $K$ dedicated issue task groups
- **AND** any task definition attempting to group two or more disparate issues SHALL trigger `BUNDLED_ISSUE_TASK_FORBIDDEN` and be rejected.

---

### Requirement: Four-Tier Deep Remediation Ladder
During implementation of each issue in Step 3, the agent SHALL strictly progress through a four-tier deep remediation ladder:
1. **Tier 1 (Red Witness)**: The agent SHALL establish a failing reproduction test or witness command demonstrating an Exit Code $\ne 0$ prior to modifying production code. Ad-hoc editing without failing reproduction is FORBIDDEN.
2. **Tier 2 (Origin Tracing)**: The agent SHALL trace data flow to the Origin Producer. Remediation MUST repair the Origin Producer; patching only the Consumer Sink with defensive fallbacks SHALL trigger `SINK_PATCHING_BLOCKED`.
3. **Tier 3 (Structural Immunity)**: The agent SHALL enforce structural invariants at the type level, state machine level, or AST/Lint level to make the illegal state unrepresentable.
4. **Tier 4 (All-Sites Sweep)**: The agent SHALL perform a repository-wide sweep for identical anti-patterns per the All-Sites remediation mandate.

#### Scenario: Rejection of Consumer Sink Fallback Patching
- **GIVEN** an issue where an unvalidated null value causes a downstream crash
- **WHEN** the agent attempts to resolve the issue merely by inserting `if (!val) return;` at the sink
- **THEN** the gate SHALL reject the proposed modification as a superficial band-aid (`SINK_PATCHING_BLOCKED`)
- **AND** require tracing the invalid null to its originating producer.

---

### Requirement: Single-Issue Focus Lock Standard
During Step 3 execution, the single-task focus lock (`[-] lock`) SHALL operate at the granularity of a single canonical issue.
Only one issue may hold the `[-]` active execution lock at any given moment.
An issue lock SHALL NOT be unlocked or marked complete (`[x]`) until its dedicated reproducer test passes with Exit Code 0 and its All-Sites sweep is clean.
Transitioning to the subsequent issue is strictly forbidden while the current issue remains unresolved.
Swarm dispatch briefs SHALL encapsulate single-issue scopes, prohibiting multi-issue dumping on individual subagents.

#### Scenario: Strict Sequential Issue Lock Progression
- **GIVEN** issues `[ISSUE-01]` and `[ISSUE-02]` in `tasks.md`
- **WHEN** the agent is actively executing `[ISSUE-01]`
- **THEN** `[ISSUE-01]` SHALL hold the `[-]` lock
- **AND** `[ISSUE-02]` SHALL remain pending (`[ ]`) until `[ISSUE-01]` passes verification and transitions to `[x]`.

---

### Requirement: Zero-Omission Problem Circuit Breaker
The system SHALL provide an automated static guard script (`scripts/check-issue-clearance.mjs`) registered as `npm run guard:issue-clearance`.
The clearance guard SHALL parse the Master Problem Ledger from the Step 0 Gate 1 dossier, extract all $K$ issue identifiers, and verify that:
1. Each issue identifier maps to a dedicated automated test case or assertion in the test suite.
2. Each issue is documented in the final Step 5 clearance report with an empirical `[Measured] Exit Code 0` test execution record.
If the count of verified issues $N_{\text{verified}} < K$, the script SHALL exit with code 1 and emit `PROBLEM_OMISSION_CIRCUIT_BREAKER`, blocking pull requests, archiving, and release.

#### Scenario: Blocked Archiving on Unproven Issue
- **GIVEN** a task with 4 ingested issues where issue `[ISSUE-04]` lacks a dedicated test assertion
- **WHEN** `npm run guard:issue-clearance` is executed
- **THEN** the command SHALL exit with code 1
- **AND** report `PROBLEM_OMISSION_CIRCUIT_BREAKER: [ISSUE-04] missing verified test assertion`.

---

### Requirement: Axiom 64 Constitutional Legislation and Domain Neutrality
The core rules of Problem Ledger Ingestion and Zero-Omission Deep Remediation SHALL be codified as Axiom 64 in `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test cases, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Consistency
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors (`GEMINI.md`, `pstack-openspec`, `ai-harness-openspec`) SHALL exhibit identical sub-invariants for Axiom 64.

### Requirement: Markdown Specification Atomic Structuring Protocol
When defining guidelines, audit checklists, or operational workflows in Markdown documents, the system SHALL enforce an atomic structuring standard.
Key constraints, invariants, and validation rules SHALL be assigned canonical, immutable identifiers formatted as `[SPEC-RULE-xx]` or `[AUDIT-CHECK-xx]`.
Each structured specification entry SHALL explicitly state:
1. Canonical Rule Identifier
2. Target Scope and Preconditions
3. Observable Contract (RFC 2119 SHALL/SHALL NOT)
4. Empirical Verification Command or Assertion

Unstructured natural language prose paragraphs describing critical business logic or constraints without atomic rule identifiers are FORBIDDEN in core workflow specifications.

#### Scenario: Rejection of Vague Prose Specifications
- **GIVEN** a workflow specification defining data sanitization rules
- **WHEN** the rules are authored as unstructured narrative paragraphs without rule identifiers
- **THEN** the specification linter SHALL flag the document as non-compliant
- **AND** require structured conversion to discrete `[SPEC-RULE-xx]` items.

---

### Requirement: Agent Lifecycle Completion Hook Gate
The system SHALL provide a completion guard mechanism (Stop Hook) intercepting an agent's completion signal or task closeout command.
Before releasing execution control or marking a workflow step complete, the Stop Hook SHALL execute a deterministic compliance inspection against the target specification's atomic rule set.
If any atomic rule lacks an empirical `[Measured] Exit Code 0` test execution proof or exhibits unverified assertions, the Stop Hook SHALL reject completion with Exit Code 1 (`WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER`).
The rejection payload SHALL feed the exact missing rule identifiers back to the agent, mandating continued execution until zero omissions remain.

#### Scenario: Completion Interception on Unverified Rule
- **GIVEN** an active workflow with rules `[SPEC-RULE-01]` and `[SPEC-RULE-02]`
- **WHEN** an agent claims task completion while `[SPEC-RULE-02]` lacks test verification
- **THEN** the completion guard SHALL reject the finish signal with Exit Code 1
- **AND** return `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER: [SPEC-RULE-02] unverified`.

---

### Requirement: Two-Strike AST Machine Escalation Mandate
The system SHALL enforce a strict machine escalation mandate for natural language rules.
If an agent fails to adhere to, or omits, a specific rule defined in Markdown documentation twice within a project's lifecycle, the rule SHALL NOT remain solely in natural language.
The system SHALL mandate the codification of an automated AST rule, linter script, or deterministic test asserting the constraint with real Exit Code 1 blocking authority.
Merging changes or closing the change lifecycle without the escalated machine asset is strictly FORBIDDEN.

#### Scenario: Mandatory Escalation After Two Breaches
- **GIVEN** a Markdown guideline stating that direct access to raw sockets is prohibited
- **WHEN** an agent violates this rule for the second time in human review or audit
- **THEN** the system SHALL mandate the creation of an AST check (e.g. `ast-grep` or ESLint rule)
- **AND** reject the pull request until the machine rule is committed.

---

### Requirement: Workflow Step Single-Focus Statechart Standard
During workflow and program execution, the agent SHALL model atomic checklist rules as a sequential statechart.
Each atomic rule SHALL transition strictly across states: `Pending [ ]` -> `Active [-]` -> `Verified [x]`.
Only one rule MAY occupy the `Active [-]` state at any given moment.
The agent SHALL NOT advance to the subsequent rule until the active rule achieves empirical Exit Code 0 verification.
Skipping or batch-checking multiple unverified rules is strictly prohibited.

#### Scenario: Strict Sequential Task Transition
- **GIVEN** a list of three sequential workflow verification steps
- **WHEN** step 1 is actively running under the `[-]` focus lock
- **THEN** steps 2 and 3 SHALL remain in `Pending [ ]`
- **AND** step 1 SHALL NOT transition to `[x]` without measured test proof.

---

### Requirement: Automated L2 Workflow Specification Compliance Guard
The system SHALL provide a standalone static guard script (`scripts/check-workflow-spec-compliance.mjs`) registered in `package.json` as `guard:workflow-spec`.
The guard SHALL parse active workflow specifications and Gate 1 dossiers, extract all canonical rule identifiers, and verify that:
1. Each rule identifier is covered by an automated test assertion.
2. The final checkoff report provides an exact 1:1 match with measured exit codes.
If any rule is omitted or unverified, the script SHALL terminate with Exit Code 1 and print `WORKFLOW_SPEC_OMISSION_CIRCUIT_BREAKER`.

#### Scenario: Zero-Omission Guard Verification
- **GIVEN** an audit spec with 3 rules where rule 3 lacks an automated assertion
- **WHEN** `npm run guard:workflow-spec` is executed
- **THEN** the script SHALL exit with code 1
- **AND** print the exact identifier of the unverified rule.

---

### Requirement: Axiom 65 Constitutional Legislation and Domain Neutrality
The rules of Markdown Specification Deterministic Enforcement and Completion Hook Governance SHALL be codified as Axiom 65 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 65.

### Requirement: Invocation Task Classification and Called Program Read-Only Lock
When an engineering task involves calling, running, executing, or invoking an existing program, tool, service, pipeline, or CLI to produce business output, the system SHALL classify the task as an Invocation-Only Task in Step 0.
For any task classified as Invocation-Only, the source code, internal modules, shared libraries, and core engines of the called program SHALL be placed under an immutable read-only lock (`CALLED_PROGRAM_READONLY_LOCK`).
The system tool barrier SHALL intercept and reject any write, edit, or delete operations directed at the called program's source files with a fatal violation: `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`.

#### Scenario: Rejection of Called Program Modification
- **GIVEN** a task assigned to invoke an export CLI to generate a report
- **WHEN** the agent attempts to modify the export CLI's source code to bypass a parameter check
- **THEN** the system SHALL reject the tool call with `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`
- **AND** require the agent to adjust the caller parameters instead.

---

### Requirement: Anti-Expediency Mutation and Caller Adaptation Mandate
During an invocation task, when errors, exceptions, or timeouts occur, the agent's problem-solving scope SHALL be strictly confined to the Caller Plane.
Acceptable caller-plane interventions include:
1. Sanitizing, validating, and formatting input data files
2. Adjusting invocation arguments, configuration flags, or environment variables
3. Authoring or refining caller-side adapter scripts
The agent is strictly FORBIDDEN from performing task-expediency hacking inside the called program (such as commenting out assertions, widening tolerance thresholds, hardcoding return values, or altering default behaviors).

#### Scenario: Caller Data Sanitization Enforcement
- **GIVEN** an invocation task where the target engine rejects a non-standard date format
- **WHEN** the agent diagnoses the issue
- **THEN** the agent SHALL reformat the date in the input dataset or caller script
- **AND** the agent SHALL NOT modify the date parsing logic inside the engine.

---

### Requirement: Upstream Defect Isolation and Escalation Protocol
If an invocation failure is proven by forensic diagnosis to be caused by a genuine defect or bug within the called program itself (rather than caller data or invocation arguments), the agent SHALL NOT attempt to patch the program in the active invocation task.
The agent SHALL:
1. Log an immutable forensic incident: `[Incident: Upstream Engine Defect]` containing the reproduction command, call stack, and root cause diagnosis.
2. Maintain the called program in its read-only state.
3. Pause execution and escalate to the human user for authorization.
Fixing the upstream defect SHALL require an independent, dedicated Bug-Fix change lifecycle under Ps-openspec complete with multi-scenario regression testing.

#### Scenario: Upstream Bug Incident Escalation
- **GIVEN** a legitimate crash bug in a shared PDF generation library during an invocation task
- **WHEN** the agent confirms the bug resides in the shared library
- **THEN** the agent SHALL record an incident report and halt at an escalation breakpoint
- **AND** the agent SHALL NOT alter the library in the current task.

---

### Requirement: Gate 2 Caller Scope Physical Fence
In Step 2 of an invocation task, the proposed scope in the Gate 2 submission SHALL enforce a physical fence.
The writable paths declared in Gate 2 SHALL be 100% limited to caller files (caller scripts, input datasets, task configuration files, output destinations).
Any inclusion of the called program's source code, core engine, or shared dependencies within the writable scope SHALL trigger an immediate rejection: `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED`.

#### Scenario: Gate 2 Scope Rejection
- **GIVEN** an invocation task proposal
- **WHEN** the agent includes `src/core/engine.ts` in the proposed writable files list
- **THEN** Gate 2 validation SHALL fail with `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED`
- **AND** prevent transition to Step 3.

---

### Requirement: Automated L2 Invocation Purity Guard
The system SHALL provide a standalone static guard script (`scripts/check-invocation-purity.mjs`) registered in `package.json` as `guard:invocation-purity`.
The guard SHALL inspect the active Git diff and task metadata. If the task is designated as invocation-only, the guard SHALL verify that:
1. Zero changes exist within protected engine and shared program directories.
2. All modifications are strictly confined to caller scripts and data files.
If any prohibited modification is detected, the script SHALL exit with status 1 and emit `CALLED_PROGRAM_TAMPERING_DETECTED`.

#### Scenario: Invocation Purity Guard Verification
- **GIVEN** an invocation task with an accidental modification to a core utility
- **WHEN** `npm run guard:invocation-purity` is executed
- **THEN** the command SHALL exit with code 1
- **AND** print `CALLED_PROGRAM_TAMPERING_DETECTED: Prohibited modification in engine directory`.

---

### Requirement: Axiom 66 Constitutional Legislation and Domain Neutrality
The rules of Called Program Immutability and Invocation Purity SHALL be codified as Axiom 66 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 66.

### Requirement: Problem-Type Task Boundary Definition and Taxonomy Disambiguation
When an engineering task is ingested in Step 0, the system SHALL evaluate the task against the standardized Problem Task Input Signature.
Input signatures that mandate Problem-Type Task classification include:
1. Error logs, stack traces, exceptions, timeouts, or crash dumps
2. Failing test assertions, regression reports, or broken system invariants
3. External defect lists, issue tickets, bug reports, audit discrepancy findings, or review annotations
4. Explicit user instructions requesting repair, rectification, or debugging of pre-existing functionality
The system SHALL apply a deterministic four-way disambiguation taxonomy:
- **Problem-Type Task**: Remediation of faults, bugs, or non-compliances in existing logic
- **Feature-Type Task**: Introduction of novel business capabilities, endpoints, or data models
- **Invocation-Type Task**: Execution of pre-existing tools with caller-only scope and immutable engine
- **Explore-Type Task**: Read-only behavioral or topological analysis without production edits
Any task containing one or more defect signatures SHALL be classified as a Problem-Type Task (or a composite task containing a problem sub-phase). Evading problem ledger ingestion by re-labeling defect repairs as feature adjustments SHALL be strictly FORBIDDEN.

#### Scenario: Deterministic Classification of Bug Report
- **GIVEN** a task prompt containing an error trace and a request to fix a calculation mismatch
- **WHEN** the agent performs Step 0 ingestion
- **THEN** the system SHALL classify the task as a Problem-Type Task
- **AND** require the generation of a Master Problem Ledger before proceeding.

---

### Requirement: Master Problem Ledger Ingestion and Fact Anchoring Preservation
When a task is classified as a Problem-Type Task, the agent SHALL slice the input into discrete, atomic problem items designated as `[ISSUE-01]` through `[ISSUE-K]`.
The count of ledger items $N_{\text{Ledger}}$ SHALL satisfy the mathematical invariance $N_{\text{Ledger}} \equiv K$.
For every `[ISSUE-xx]`, the agent SHALL capture:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Current code anchor (`file:///path#Lxx-Lyy`)
3. Initial failure reproduction command or empirical witness
4. Causal role (`[Root Source]` or `[Consumer Sink]`)
5. Independent acceptance criteria
Merging, dropping, or generalizing issues into unsegmented paragraphs SHALL trigger an immediate blocker: `PROBLEM_INGESTION_COMPRESSION_BLOCKED`.

#### Scenario: Zero-Compression Problem Ledger Slice
- **GIVEN** an external audit finding listing 4 specific security discrepancies
- **WHEN** the agent authors the Gate 1 dossier
- **THEN** the dossier SHALL contain exactly 4 discrete items: `[ISSUE-01]` through `[ISSUE-04]`
- **AND** each item SHALL retain its independent witness and acceptance criteria.

---

### Requirement: Post-Execution 1:1 Problem-to-Result Reconciliation Audit
Prior to Step 5 task closeout and delivery, the agent SHALL conduct a mandatory 1:1 Post-Execution Reconciliation Audit.
The final delivery dossier SHALL include a complete `1:1 Problem-to-Result Reconciliation Matrix` mapping every `[ISSUE-xx]` from Step 0 to its verified resolution.
For each issue, the reconciliation table SHALL specify:
1. Canonical Issue Identifier (`[ISSUE-xx]`)
2. Exact source code modification line anchors (`file:///path#Lxx-Lyy`)
3. Root-cause remediation explanation
4. Verified outcome status (`[x] RESOLVED`)
Omitting any issue from the reconciliation table SHALL trigger a fatal closeout failure: `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

#### Scenario: Post-Execution Reconciliation Validation
- **GIVEN** a task with 3 ingested issues `[ISSUE-01]` through `[ISSUE-03]`
- **WHEN** the agent compiles the Step 5 delivery report
- **THEN** the report SHALL include a 3-row reconciliation matrix matching each issue to its code line anchor
- **AND** a report listing only 2 rows SHALL be rejected with `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

---

### Requirement: Empirical Fact-Checking and False-Resolution Circuit Breaker
Every issue recorded in the reconciliation table SHALL undergo empirical fact-checking backed by verifiable proof.
Acceptable fact-checking evidence includes:
1. Terminal test execution command producing Exit Code 0 (`[Measured] Exit Code 0`)
2. Red-to-green witness showing failure on original code and success on remediated code
3. Mutation verification demonstrating that the fix resists boundary attacks
Superficial symptom-masking at consumer sinks (`SINK_PATCHING_BLOCKED`) or unsubstantiated claims of completion SHALL be treated as fact-checking failures.
If any issue fails empirical fact-checking or lacks measured proof, the system completion hook SHALL exit with status 1 and trigger: `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`.

#### Scenario: Interception of Unsubstantiated Completion Claim
- **GIVEN** an agent claiming `[ISSUE-02]` is fixed without providing a terminal exit code 0 log
- **WHEN** the completion hook evaluates the deliverable
- **THEN** the system SHALL reject completion with `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`
- **AND** force the agent back into Step 3 single-focus execution until empirical proof is measured.

---

### Requirement: Automated L2 Problem Reconciliation and Clearance Guard Standard
The system SHALL provide a static guard script (`scripts/check-issue-clearance.mjs`) registered as `npm run guard:issue-clearance`.
The guard SHALL:
1. Parse the Step 0 Gate 1 dossier and extract all $K$ canonical `[ISSUE-xx]` identifiers.
2. Verify that automated test files exist containing dedicated test assertions for each `[ISSUE-xx]`.
3. Verify that the final delivery report or test log contains 1:1 reconciliation entries for each `[ISSUE-xx]`.
If the count of verified issues $N_{\text{verified}} < K$, the guard SHALL exit with code 1 and emit `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`.

#### Scenario: Automated Guard Clearance Verification
- **GIVEN** a project with a Gate 1 dossier defining `[ISSUE-01]` and `[ISSUE-02]`
- **WHEN** `npm run guard:issue-clearance` is executed
- **THEN** the guard SHALL verify both issues in test assertions and reconciliation tables
- **AND** exit with code 0 only when all $K$ issues are fully accounted for.

---

### Requirement: Axiom 64 Evolution Constitutional Legislation and Domain Neutrality
The rules of Problem Task Boundary Definition, Master Problem Ledger Ingestion, and Post-Execution Fact-Checking Reconciliation SHALL be codified as Axiom 64 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Cross-Mirror Constitutional Parity
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 64.

### Requirement: Cross-Device Portability and Host Decoupling Standard
When engineering, modifying, or refactoring applications, web interfaces, scripts, or agent workflows, the system SHALL decouple all operational logic from host-specific environmental artifacts.
The system SHALL NOT hardcode single-machine absolute paths (such as `C:\Users\...` or machine-specific home folders), machine-bound hostnames, or fixed network port bindings in source code or committed configurations.
All filesystem resolution SHALL be performed dynamically at system boundaries (`principle-boundary-discipline`) via relative paths rooted at application run roots (`process.cwd()`, standard project roots) or well-defined portable environment variables (`DATA_DIR`, `APPDATA`, `XDG_DATA_HOME`).
If a hardcoded single-machine absolute path or host-bound identifier is detected in production source assets, the system SHALL block execution and raise `HARDCODED_HOST_ENVIRONMENT_BLOCKED`.

#### Scenario: Cross-Machine Dynamic Path Resolution
- **GIVEN** an application component requiring local state persistence
- **WHEN** the component determines its storage directory
- **THEN** it SHALL resolve paths relative to the runtime configuration or portable environment variable
- **AND** it SHALL NOT reference any static user home or developer-specific local directory.

---

### Requirement: Database Migration Resilience and Auto-Bootstrap Standard
When an application connects to or initializes embedded, file-based (such as SQLite), or networked database storage, the system SHALL ensure end-to-end migration resilience and automated cold-boot self-healing.
The database initialization routine SHALL:
1. Recursively probe and auto-create target database parent directories if they do not exist.
2. Auto-create database files and execute base schema setup idempotently (`principle-make-operations-idempotent`).
3. Execute ordered, declarative, versioned migration scripts tracking applied versions in a metadata table.
4. Tolerate migration across devices where an older database schema is mounted into a newer application version by upgrading incrementally without data loss.
Direct unmanaged access to raw database files without dynamic directory auto-creation and migration management SHALL trigger `DATABASE_UNMANAGED_BOOTSTRAP_BLOCKED`.

#### Scenario: Cold-Boot Auto-Bootstrap on New Machine
- **GIVEN** a newly deployed application running in an empty environment where the database directory is absent
- **WHEN** the application starts up
- **THEN** it SHALL recursively create the storage directory, initialize tables, and execute migrations with Exit Code 0
- **AND** subsequent restarts SHALL execute idempotently without errors.

---

### Requirement: User Data and Default Data Orthogonal Segregation Standard
Software systems that manage configuration presets, initial templates, dictionary standards, and user-generated content SHALL enforce strict two-tier orthogonal segregation:
1. **Read-Only System Default Layer**: Shipped templates, default presets, built-in catalogs, and system rules SHALL reside in an immutable/read-only distribution layer. Application upgrades SHALL replace this layer in full without impacting user state.
2. **Mutable User Overlay Layer**: User records, custom configurations, domain instances, and local overrides SHALL be segregated into a dedicated user data storage volume or isolated database tables/key namespaces (`principle-separate-before-serializing-shared-state`).
Application updates SHALL NEVER clobber or alter user-created records.
User reset or purge operations SHALL NEVER corrupt or delete the shipped system default baseline.
Commingling user records and system presets in a single unsegregated mutable container SHALL trigger `STATE_SEGREGATION_VIOLATION_BLOCKED`.

#### Scenario: Software Upgrade Preserving User Data
- **GIVEN** an existing installation containing customized user records and default templates
- **WHEN** the software is upgraded to a newer release with updated default templates
- **THEN** the system default layer SHALL be updated cleanly
- **AND** all existing user data and customizations SHALL remain intact without modification.

#### Scenario: User State Reset Preserving System Defaults
- **GIVEN** a user initiating a full reset of their personal application data
- **WHEN** the reset operation executes
- **THEN** the system SHALL purge only the mutable user data overlay
- **AND** the read-only default presets and baseline templates SHALL remain fully functional.

---

### Requirement: Portable Data Export, Backup, and Restore Standard
Systems storing persistent user state SHALL provide structured, portable data export and restore capabilities.
The export payload SHALL:
1. Consist of standardized formats (such as clean JSON, SQL dump, or portable archive bundles).
2. Contain strictly the mutable user dataset and configuration overlays.
3. Exclude all machine-specific absolute filepaths, local process identifiers, and host credentials.
During restore operations on a target machine, the system SHALL validate data integrity, verify schema compatibility, and reconstitute application state seamlessly.

#### Scenario: Portable Export and Target Import Verification
- **GIVEN** an active user dataset on machine A
- **WHEN** an export is generated and transferred to a completely distinct machine B
- **THEN** machine B SHALL successfully import the dataset and restore full business functionality
- **AND** the exported artifact SHALL contain zero absolute host path references.

---

### Requirement: Automated L2 Universal Portability Guard Standard
The system SHALL provide an automated static and structural analysis guard script (`scripts/check-universal-portability.mjs`), registered as `npm run guard:portability` in `package.json`.
The guard SHALL:
1. Scan project source files, scripts, workflows, and configurations for hardcoded absolute drive roots (e.g., `C:\Users\`, `/home/`) and machine-bound patterns.
2. Verify that database connection handlers incorporate auto-bootstrap directory creation and migration resilience.
3. Validate that default presets and mutable user data reside in segregated directories or distinct namespaces.
If any portability or segregation violation is detected, the guard SHALL exit with code 1 and emit `HARDCODED_HOST_ENVIRONMENT_BLOCKED` or `STATE_SEGREGATION_VIOLATION_BLOCKED`.

#### Scenario: Automated Portability Guard Enforcement
- **GIVEN** a project codebase
- **WHEN** `npm run guard:portability` is executed
- **THEN** it SHALL exit with code 0 if all portability standards are satisfied
- **AND** it SHALL exit with code 1 upon mutation testing where a hardcoded absolute path is injected.

---

### Requirement: Axiom 67 Universal Portability and Data Segregation Constitutional Legislation
The rules of Cross-Device Portability, Database Migration Resilience, and User/Default Data Orthogonal Segregation SHALL be codified as Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Constitutional Parity Across Three Mirrors
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 67.

### Requirement: Mechanical Audit Tool Generic Standard
When software components, web applications, scripts, or workflows undergo verification prior to release, the system SHALL execute a Mechanical Audit tool.
The Mechanical Audit tool SHALL:
1. Rely exclusively on deterministic automated scripts, compiler checks, static analysis linters, and test suites.
2. Forbid model-based subjective reasoning, probabilistic inference, or natural language rationalizations in the audit verdict.
3. Enforce zero compiler/linter warnings and zero errors (`--max-warnings=0`).
4. Evaluate pass/fail criteria strictly based on binary process exit codes (`Exit Code 0` for success, non-zero for failure).
5. Verify invariant preservation, structural file parity, and the absolute absence of hardcoded single-machine host environment paths.
If any deterministic check produces a non-zero exit code or warning, the Mechanical Audit tool SHALL immediately reject the deliverable and emit `MECHANICAL_AUDIT_BLOCKER`.

#### Scenario: Deterministic Static Check Enforcement
- **GIVEN** a modified codebase undergoing verification
- **WHEN** the mechanical audit tool executes static linting and tests
- **THEN** it SHALL emit `MECHANICAL_AUDIT_BLOCKER` if any rule violation or non-zero exit code occurs
- **AND** it SHALL completely block entry into the subsequent Agent audit phase until all mechanical checks are clean.

---

### Requirement: Agent Proactive Intervention Audit Tool Standard
When a software deliverable satisfies the Mechanical Audit entry baseline, the system SHALL invoke the Agent Proactive Intervention Audit tool.
The Agent Proactive Intervention Audit tool SHALL enforce active, cognitive verification and prohibit passive acceptance:
1. **Proactive Inspection**: The agent SHALL proactively inspect underlying physical source code lines to audit causality, data flows, and state machine integrity.
2. **Proactive Dynamic Testing**: The agent SHALL actively formulate and execute exploratory, edge-case, and boundary test probes against the running system rather than relying exclusively on pre-existing unit tests.
3. **Proactive Runtime Observation**: The agent SHALL proactively inspect runtime process logs, telemetry outputs, and exception traces to observe whether state transitions occur legitimately.
4. **Proactive Diff Review**: The agent SHALL proactively review all modified lines across the changeset to detect unauthorized regressions, invariant erosion, or code clutter.
5. **Proactive Falsification**: The agent SHALL actively seek edge cases that falsify the implementation, attempting boundary attacks to expose hidden brittle assumptions.
If the agent detects logical non-compliance or fails to provide active empirical inspection anchors (`file:///path#Lxx-Lyy`), the system SHALL reject the deliverable with `AGENT_SEMANTIC_AUDIT_REJECTED`.

#### Scenario: Active Boundary Testing by Agent
- **GIVEN** an implementation that passed all pre-existing static unit tests
- **WHEN** the Agent Proactive Intervention Audit tool executes
- **THEN** the agent SHALL actively craft and execute at least one novel boundary or adversarial input probe
- **AND** verify that the system handles the probe robustly without crashing or corrupting state.

---

### Requirement: Dual-Key Sequential Orchestration Contract
The system SHALL orchestrate verification through a strictly sequential two-key gate pipeline:
1. **Key 1 (Mechanical Entry Baseline / Necessary Condition)**: Mechanical Audit MUST execute first. If Mechanical Audit fails, the pipeline SHALL halt immediately with an exit status of 1; invoking the Agent audit under failing mechanical conditions is strictly FORBIDDEN.
2. **Key 2 (Agent Cognitive Falsification / Sufficiency Condition)**: Only upon measured Exit Code 0 across all mechanical checks SHALL the Agent Proactive Intervention Audit tool be invoked.
Both Key 1 and Key 2 must produce clean verification proofs before changes may be submitted for final human review.
Attempting to bypass Key 1 or Key 2 SHALL trigger `DUAL_KEY_AUDIT_BYPASS_BLOCKED`.

#### Scenario: Halting at Failed Mechanical Gate
- **GIVEN** an implementation with a minor linter warning
- **WHEN** the audit pipeline runs
- **THEN** Key 1 SHALL reject the deliverable immediately
- **AND** Key 2 (Agent audit) SHALL NOT be dispatched until Key 1 is completely resolved.

---

### Requirement: False-Pass Detection and Dynamic Falsification Standard
The Agent Proactive Intervention Audit tool SHALL actively inspect and test for false passes (trivial assertion fraud or hardcoded conditional shortcuts).
The agent SHALL:
1. Examine code modifications to verify that tests are not passing due to hardcoded return branches (e.g. `if (input === 'expected') return result;`).
2. Verify that test assertions are substantive, non-trivial, and assert meaningful state changes rather than empty truthy assertions (`assert.ok(true)`).
3. Actively inject mutation variations or unexpected inputs to prove that negative inputs properly trigger error handling.
Detecting any hardcoded shortcut or trivial assertion fraud SHALL trigger `FALSE_PASS_FRAUD_DETECTED`.

#### Scenario: Interception of Hardcoded Shortcut
- **GIVEN** an implementation that satisfies a test fixture via a hardcoded input check
- **WHEN** the agent performs proactive inspection and dynamic testing
- **THEN** the agent SHALL identify the shortcut
- **AND** reject the deliverable with `FALSE_PASS_FRAUD_DETECTED`.

---

### Requirement: Pure Universal Software Engineering Abstraction Standard
All specifications, rules, test cases, and documentation defining Mechanical Audit and Agent Proactive Intervention Audit SHALL maintain 100% universal software engineering abstraction.
The terminology SHALL be strictly restricted to generic software concepts:
- Systems, components, interfaces, modules, and functions
- Inputs, outputs, data flows, payloads, and state transitions
- Static rules, compilers, linters, exit codes, and assertions
- Dynamic probes, execution environments, processes, and telemetry
Zero domain-scenario or business-specific vocabulary SHALL be permitted.
Any detection of domain-scenario pollution SHALL trigger `DOMAIN_SCENARIO_POLLUTION_BLOCKED`.

#### Scenario: Domain Neutrality Verification
- **GIVEN** the dual audit tooling specifications
- **WHEN** static neutrality scanning is performed
- **THEN** all scenario-specific terms SHALL count as 0 hits
- **AND** the guard SHALL exit with code 0.

---

### Requirement: Axiom 68 Dual Audit Tooling Constitutional Legislation
The dual audit framework SHALL be codified as Axiom 68 (`DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 65).
The `worker.md` constitution SHALL be updated to instruct all worker agents to execute proactive inspection and dynamic testing during verification.
Automated regression tests SHALL verify constitutional parity across all three mirrors.

#### Scenario: Cross-Mirror Parity Verification
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite executes
- **THEN** all three mirrors SHALL contain identical sub-invariant tokens for Axiom 68.

### Requirement: Proactive Requirement Brainstorming and Anticipation Protocol
When an engineering task is ingested in Step 0, the system SHALL preserve the explicit user requirements verbatim with a SHA-256 fact fingerprint.
Concurrently, the agent SHALL proactively perform architectural extrapolation to anticipate companion, defensive, and downstream requirements (the A, B -> C, D, E extrapolation).
The Step 0 Gate 1 dossier SHALL feature a dedicated `Proactive Requirement Brainstorming Matrix` evaluating:
1. Runtime safety and boundary defense
2. Data migration, host portability, and storage resilience
3. Evolvability, rollback safety, and backward compatibility
The brainstormed companion proposals SHALL be explicitly designated as suggestions (`[Brainstormed Proposal]`) and awaiting explicit human confirmation.
Failing to include the proactive brainstorming matrix in the Gate 1 dossier SHALL trigger `PROACTIVE_BRAINSTORMING_OMISSION_BLOCKED`.

#### Scenario: Proactive Brainstorming Extrapolation
- **GIVEN** a user request specifying core features A and B
- **WHEN** the agent authors the Gate 1 dossier
- **THEN** it SHALL output the verbatim prompt and a dedicated table proposing companion items C, D, and E
- **AND** it SHALL pause to await human confirmation of which items to incorporate.

---

### Requirement: Gate 2 Brainstorming Ingestion and Legislation Gate
In Step 2 (OpenSpec authoring), the system SHALL ingest only the explicitly confirmed user requirements and user-approved brainstormed proposals.
The count and scope of requirements in `proposal.md` and `specs/` SHALL strictly match the user-confirmed set.
Unapproved brainstormed suggestions SHALL NOT be implemented or smuggled into the change scope.
Smuggling unconfirmed brainstormed proposals into production code SHALL trigger `UNAUTHORIZED_PROPOSAL_MUTATION_BLOCKED`.

#### Scenario: Exact Ingestion of Approved Requirements
- **GIVEN** a task where the user confirmed explicit items A and B, and approved proposal C while rejecting D
- **WHEN** Gate 2 specifications are compiled
- **THEN** the specifications SHALL define requirements exclusively for A, B, and C
- **AND** item D SHALL be excluded from the scope.

---

### Requirement: Universal Cross-Thread and Model Bootstrap Mandate
Every conversation thread, newly spawned session, or alternate model (including Google Gemini, OpenAI GPT, Anthropic Claude, and DeepSeek) operating within the environment SHALL unconditionally inherit and execute the Ps-openspec governance framework.
The system SHALL front-load a mandatory cold-boot directive within the first 50 lines of the global `GEMINI.md` constitution (`MANDATORY_BOOTSTRAP_PROTOCOL`).
Upon receiving any engineering task, the model SHALL immediately initialize Step 0 (Spec-Kit Ingestion & Gate 1) before performing any file edits or code synthesis.
Attempting to modify code or answer with conversational hand-waving without completing Gate 1 and Gate 2 SHALL trigger `GOVERNANCE_BOOTSTRAP_VIOLATION_BLOCKED`.

#### Scenario: Cross-Model Cold-Boot Enforcement
- **GIVEN** a new session initialized with an alternate model
- **WHEN** the user delivers an engineering request
- **THEN** the model SHALL immediately output the Step 0 Gate 1 dossier
- **AND** halt for human authorization before editing code.

---

### Requirement: Anti-Truncation Front-Loaded Architecture and Workspace Sync Standard
To prevent loss of governance rules caused by host-level prompt truncation (when files exceed 24 KB), the system SHALL maintain the core Ps-openspec constitution, dual-gate SOP, and cold-boot directives within the first 20 KB safe zone of `GEMINI.md`.
The synchronization utility (`scripts/sync-to-global.mjs`) SHALL:
1. Sync `GEMINI.md` and `worker.md` to global configuration paths.
2. Ensure active workspace roots contain directory pointers or rule anchors (`.agents/rules/` or local `GEMINI.md`) ensuring 100% inheritance.
If the critical bootstrap directive falls outside the first 20 KB safe zone, static checks SHALL raise `TRUNCATION_HAZARD_BLOCKED`.

#### Scenario: Safe Zone Boundary Verification
- **GIVEN** the global `GEMINI.md` file
- **WHEN** static analysis measures the byte offset of the mandatory bootstrap protocol
- **THEN** the offset SHALL be less than 20,480 bytes (20 KB)
- **AND** verification SHALL pass with Exit Code 0.

---

### Requirement: Automated L2 Global Governance and Brainstorming Guard Standard
The system SHALL provide an automated static analysis test suite (`tests/proactive-brainstorming-governance.test.mjs`).
The suite SHALL mechanically verify:
1. Gate 1 dossiers contain the dedicated proactive brainstorming matrix.
2. Global `GEMINI.md` and `worker.md` contain the front-loaded bootstrap protocol within the safe zone.
3. Unapproved proposals are blocked from silent code modification.
If any check fails, the test suite SHALL exit with code 1 and emit `GLOBAL_GOVERNANCE_INTEGRITY_FAILED`.

#### Scenario: Automated Guard Execution
- **GIVEN** the repository test suite
- **WHEN** `node tests/proactive-brainstorming-governance.test.mjs` is executed
- **THEN** all assertions SHALL pass with Exit Code 0.

---

### Requirement: Axiom 69 Proactive Brainstorming and Cross-Thread Governance Legislation
The rules of Proactive Requirement Brainstorming, Gate 2 Ingestion Filtering, Universal Cross-Thread Bootstrap, and Anti-Truncation Front-Loading SHALL be codified as Axiom 69 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 66).
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Constitutional Parity Across Three Mirrors
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 69.

### Requirement: Mandatory Project Architecture & Maintenance Graph (REQ-1)
Every software project governed by Ps-openspec SHALL construct and maintain a structured, machine-readable **Project Architecture & Maintenance Graph** (`PROJECT_ARCHITECTURE_GRAPH_MANDATE`) containing explicit module boundaries, ownership, dependency edges, entry points, and active maintenance items.

#### Scenario: Missing Project Graph blocks business code mutation
- **WHEN** an agent initiates maintenance or feature modification in a repository lacking a valid Project Architecture & Maintenance Graph
- **THEN** the governance gate SHALL reject direct business code edits with `PROJECT_GRAPH_MISSING_BLOCKED` and require constructing or bootstrapping the Graph first.

### Requirement: Graph-Guided Diagnosis & Blast Radius Tracing (REQ-2)
Inspired by `@poteto` Pstack `how` and `blast-radius` skills, during Step 1 grounding and defect diagnosis, the agent SHALL query the Project Graph to pinpoint the Origin Producer module and trace multi-hop downstream dependencies before proposing any changes (`GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL`).

#### Scenario: Symptom-level blind edit without Graph localization is rejected
- **WHEN** an agent proposes modifying a module during Gate 2 without citing its Graph node ID, ownership boundary, and downstream blast-radius trace
- **THEN** the Gate 2 specification audit SHALL reject the proposal with `UNLOCATED_MODULE_MUTATION_BLOCKED`.

### Requirement: Repeated-Error-Mutation Hotspot Circuit Breaker (REQ-3)
Inspired by `@poteto` `principle-fix-root-causes`, `principle-encode-lessons-in-structure`, and `architect Phase E`, the Project Graph SHALL track erroneous mutation counts and regression incidents per module/location (`REPEATED_HOTSPOT_MUTATION_CIRCUIT_BREAKER`).

#### Scenario: Two or more erroneous mutations at the same location trigger hotspot lock
- **WHEN** a module or code location accumulates $\ge 2$ erroneous modifications or recurring bug fixes
- **THEN** the Graph SHALL transition that node to `hotspot_locked`, trigger `REPEATED_HOTSPOT_MUTATION_BLOCKED` against further surface patches, and mandate root-cause penetration plus structural encoding (L1 type constraint, L2 lint/test guard, or boundary redesign) before unlocking.

### Requirement: Maintenance Ledger & Graph Lifecycle Synchronization (REQ-4)
Upon completing any feature addition, defect remediation, or architectural refactor, the agent SHALL synchronize module boundaries, dependency edges, and maintenance ledger states in the Project Graph prior to OpenSpec archival (`GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL`).

#### Scenario: Stale Graph blocks change archival
- **WHEN** a change introduces or removes tracked modules without updating the Project Graph
- **THEN** the archival verification gate SHALL fail with `STALE_PROJECT_GRAPH_BLOCKED` until Graph synchronization is verified.

### Requirement: Axiom 70 Constitutional Codification & Pure Universal Abstraction (REQ-5)
The Project Architecture & Maintenance Graph governance system SHALL be codified as **Axiom 70** (`PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 67), strictly adhering to 100% pure universal software engineering abstractions (`AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Domain-specific terms or mirror drift fail parity check
- **WHEN** any of the three constitutional mirrors omits Axiom 70 sub-invariants or embeds single-domain terminology
- **THEN** the automated parity test suite SHALL fail with Exit Code 1.

### Requirement: Automated L2 Anti-Staleness Graph Guard & Cold-Start Bootstrap & Risk Tiering (PROP-C, PROP-D, PROP-E)
The repository SHALL provide a deterministic Layer 2 static guard (`scripts/check-project-graph.mjs`, registered as `npm run guard:graph`) to validate Graph schema completeness, anti-staleness against real repository modules, risk-tier escalation (`critical_load_bearing`, `hotspot_locked`, `standard`), and cold-start bootstrap capability (`AUTOMATED_L2_PROJECT_GRAPH_GUARD_STANDARD`, `COLD_START_GRAPH_BOOTSTRAP_STANDARD`, `MODULE_RISK_TIERING_&_ESCALATED_REVIEW_GATE`).

#### Scenario: L2 guard catches unmitigated hotspot or missing path
- **WHEN** `npm run guard:graph` runs against a Graph containing a non-existent module path or an unmitigated `hotspot_locked` node without a structural guard reference
- **THEN** the guard script SHALL exit with Exit Code 1 and report the exact violation token.

### Requirement: Multi-Turn Cumulative Requirement Ledger (REQ-1, PROP-D)
Across multi-turn sessions, the agent SHALL maintain a monotonically versioned **Cumulative Requirement Ledger** (`CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL`) where every requirement carries an explicit lifecycle status (`ACTIVE`, `MODIFIED`, `ADDED`, `SUPERSEDED`). Historical requirements SHALL remain permanently active unless explicitly retired via `[SUPERSEDES REQ-xx]` (`EXPLICIT_SUPERSESSION_&_CONFLICT_DETECTION_STANDARD`).

#### Scenario: Silent drop of historical requirement during multi-turn update is blocked
- **WHEN** a subsequent turn adds or modifies requirements without preserving all un-superseded prior requirements
- **THEN** the ledger continuity check SHALL fail with `REQUIREMENT_CONSERVATION_VIOLATION_BLOCKED`.

### Requirement: Mandatory Atomic Micro-Decomposition (REQ-2)
When ingesting compound user inputs containing multiple defects, sub-locations, or constraints, the agent SHALL decompose them into single-verifiable-behavior atomic entries (`ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD`) and SHALL NOT bundle distinct behaviors into coarse aggregate rows.

#### Scenario: Lossy aggregation of compound defects is rejected
- **WHEN** a Gate 1 or ledger entry bundles multiple independent verifiable behaviors under a single coarse summary without atomic sub-IDs
- **THEN** Gate 1 / Gate 2 validation SHALL reject the entry with `LOSSY_REQUIREMENT_AGGREGATION_BLOCKED`.

### Requirement: Mandatory Re-Gating on Scope Drift (REQ-3)
Whenever requirements are added, refined, or altered after initial Gate 1 confirmation, the agent SHALL halt implementation and execute **Re-Gating** (`SCOPE_DRIFT_RE_GATING_MANDATE`) by presenting the merged Cumulative Ledger Delta for explicit user confirmation before modifying code.

#### Scenario: Modifying code after unconfirmed scope drift is blocked
- **WHEN** a user introduces supplementary requirements mid-session and the agent attempts code edits without presenting an updated cumulative ledger
- **THEN** the governance protocol SHALL block execution with `RE_GATING_REQUIRED_BLOCKED`.

### Requirement: End-to-End Cumulative Checkoff & Graph-Coupled Regression (REQ-4, PROP-E)
Before Step 5 final delivery, the agent SHALL verify every `ACTIVE` atomic entry in the Cumulative Ledger against the final build/output artifact (`END_TO_END_CUMULATIVE_CHECKOFF_STANDARD`), and whenever multi-turn edits touch a previously modified Project Graph module, SHALL re-run all earlier assertions mapped to that module (`GRAPH_COUPLED_MULTI_TURN_REGRESSION_STANDARD`).

#### Scenario: Mid-execution overwrite leaves earlier active requirement unverified
- **WHEN** an active atomic requirement from an earlier turn lacks `[Measured]` verification against the final artifact or is regressed by a later edit to the same Graph module
- **THEN** final checkoff SHALL fail with `CUMULATIVE_CHECKOFF_DEFICIT_BLOCKED`.

### Requirement: Automated L2 Ledger Continuity Guard & Axiom 71 Parity (PROP-C)
The repository SHALL provide a deterministic L2 guard (`scripts/check-ledger-continuity.mjs`, registered as `npm run guard:ledger-continuity`) validating cumulative ledger conservation, atomic decomposition, and `activeCount === verifiedCount` (`AUTOMATED_L2_LEDGER_CONTINUITY_GUARD_STANDARD`), and SHALL codify Axiom 71 (`CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 68) using 100% pure universal software engineering abstractions (`AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 guard catches unverified active requirement or mirror drift
- **WHEN** `npm run guard:ledger-continuity` runs against a ledger with unverified `ACTIVE` entries or when any constitutional mirror omits Axiom 71 tokens
- **THEN** the guard or test suite SHALL exit with Exit Code 1.

### Requirement: Upstream `pstack v0.15.48` Mirror Sync & Windows Compatibility (REQ-1, REQ-4)
The local upstream mirror SHALL be synchronized to `pstack v0.15.48` (`UPSTREAM_PSTACK_V01548_MIRROR_SYNC`), incorporating `skills/reframe/SKILL.md`, Windows native `/statechart` `\r\n` compatibility (`WINDOWS_STATECHART_&_MODEL_ROUTING_PARITY`), and updated model routing metadata.

#### Scenario: Upstream mirror version and `/reframe` skill presence check
- **WHEN** `scripts/check-pstack-sync.mjs` inspects the local upstream mirror
- **THEN** `plugin.json` SHALL report version `0.15.48` (or newer) and `skills/reframe/SKILL.md` SHALL exist on disk.

### Requirement: Step 0 `/reframe` Disambiguation & Ambiguity Threshold Gate (REQ-2, PROP-C, PROP-E)
During Step 0 Gate 1, when an operator's description is ambiguous, colloquial, or could refer to multiple distinct engineering problems (`REFRAME_AMBIGUITY_THRESHOLD_GATE`), the agent SHALL invoke the `/reframe` protocol (`REFRAME_STEP0_DISAMBIGUATION_PROTOCOL`) to list 2–3 candidate problem definitions with distinguishing signs, teach impact-ranked expert terms, surface neighboring-domain analogies, highlight unmentioned concerns, and rewrite the requirement precisely. Precise technical specifications SHALL bypass `/reframe` verbosity. All external citations or URLs in `/reframe` outputs MUST be verified; unverified citations SHALL be blocked (`UNVERIFIED_CITATION_BLOCKED`, `ZERO_FABRICATED_CITATION_STANDARD`).

#### Scenario: Precise technical input bypasses verbose reframing while ambiguous input triggers disambiguation
- **WHEN** `evaluateReframeTrigger(input)` evaluates a multi-meaning vague request vs. a precise file-and-stacktrace request
- **THEN** the vague request SHALL trigger `REFRAME_REQUIRED` while the precise request SHALL proceed directly to standard RTM ingestion (`DIRECT_RTM_INGESTION`).

### Requirement: Global Route Map Companion Registration (REQ-3)
The `/reframe` skill SHALL be registered in `docs/pstack-openspec-route-map.json` under `companionSkills` (`REFRAME_COMPANION_ROUTE_REGISTRATION`) while preserving the 23-playbook `routes.length === 23` invariant, and SHALL be indexed in `skills/pstack-openspec/references/playbooks-catalog.md`.

#### Scenario: Route map registers `/reframe` without breaking 23-playbook invariant
- **WHEN** `scripts/tests/gemini-adapter.test.mjs` validates `docs/pstack-openspec-route-map.json`
- **THEN** `routes.length` SHALL equal 23 and `companionSkills` SHALL contain a valid `reframe` entry with `geminiCapability` and `geminiModelTier`.

### Requirement: Upstream Sync Inspector & Axiom 72 Codification (REQ-5, PROP-D)
The repository SHALL provide `scripts/check-pstack-sync.mjs` (`UPSTREAM_PSTACK_SYNC_INSPECTOR_STANDARD`, registered as `npm run guard:pstack-sync`) to verify local upstream mirror integrity and optionally compare against remote `cursor/plugins/pstack`, and SHALL codify **Axiom 72** (`PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 69) using pure universal software engineering abstractions (`AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Axiom 72 mirror drift or missing `/reframe` guard fails with Exit Code 1
- **WHEN** any constitutional mirror omits Axiom 72 tokens or `guard:pstack-sync` detects a missing `/reframe` skill in the local mirror
- **THEN** the verification suite SHALL exit with Exit Code 1.

### Requirement: UI Craft Floor & Anti-Plainness Standard (REQ-1, PROP-C, PROP-D)
The UI engineering workflow SHALL follow the `Shape -> Distill -> Polish` execution order (`UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER`), calibrate density by surface mode (`operate`, `read`, `persuade` under `UI_THREE_MODE_DENSITY_BUDGET_STANDARD`), and enforce `impeccable` craft-floor invariants (`UI_CRAFT_FLOOR_&_ANTI_PLAINNESS_STANDARD`) including browser surface polish (custom scrollbars, selection tint, focus rings, `tabular-nums`), directional shadow depth, and strict bans on nested cards, gradient text, and identical lazy card grids.

#### Scenario: Surface craft discipline replaces plain default templates
- **WHEN** an agent designs or refactors a user interface
- **THEN** `skills/ui-ux-design-engineering/SKILL.md` SHALL prescribe intentional typography scale, surface-mode calibration, and browser surface polish rather than plain default scaffolds.

### Requirement: `distill` Purification & Zero-Clutter Protocol (REQ-2)
Every UI deliverable SHALL undergo a mandatory `distill` pass (`UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL`) prohibiting eyebrow/kicker labels above headings, redundant explanatory prose paragraphs inside operational components, excessive decorative badges, and non-informational `01/02/03` section markers.

#### Scenario: Redundant explanatory labels and prose clutter are stripped
- **WHEN** operational UI markup contains decorative eyebrow kickers or multi-sentence explanatory prose inside interactive cards
- **THEN** the `distill` protocol SHALL require stripping them so every remaining element justifies its place.

### Requirement: Automated L2 `guard:ui-slop` Static Guard (REQ-3, PROP-E)
The repository SHALL provide a deterministic Layer 2 static guard (`scripts/check-ui-slop.mjs`, registered as `npm run guard:ui-slop`) scanning frontend component files (`.tsx`, `.jsx`, `.vue`, `.svelte`, `.html`, `.css`) across frameworks (`AUTOMATED_L2_UI_SLOP_GUARD_STANDARD`, `CROSS_FRAMEWORK_UI_DIAGNOSTIC_STANDARD`) to detect and block UI slop violations with Exit Code 1:
- `UI_SLOP_NESTED_CARD_BLOCKED`
- `UI_SLOP_EXCESSIVE_BADGES_BLOCKED`
- `UI_SLOP_EYEBROW_CLUTTER_BLOCKED`
- `UI_SLOP_VERBOSE_PROSE_BLOCKED`
- `UI_SLOP_PURPLE_GLOW_CLICHE_BLOCKED`

#### Scenario: Negative UI slop specimens fail guard with Exit Code 1 while clean specimens pass
- **WHEN** `checkUiContent` inspects UI markup containing nested cards, excessive badge density, eyebrow kickers, verbose explanatory prose, or purple-glow AI clichés
- **THEN** it SHALL fail with Exit Code 1 and emit the exact violation code; clean minimal UI markup SHALL pass with Exit Code 0.

### Requirement: Axiom 73 Constitutional Codification & Parity (REQ-4)
The UI craft, `distill` purification, and `guard:ui-slop` governance system SHALL be codified as **Axiom 73** (`UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 70) using 100% pure universal software engineering abstractions (`AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Three-mirror parity check passes with Exit Code 0
- **WHEN** `tests/ui-craft-distill-guard.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all three constitutional mirrors SHALL contain identical Axiom 73 tokens and exit with Exit Code 0.

### Requirement: Blind Auditor Physical Isolation Mandate (REQ-1)
Implementing agents SHALL NOT certify their own semantic audit (`BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE`). Semantic verification SHALL be executed by an isolated blind auditor (`executorId !== auditorId`) whose input is restricted to original requirements and final output artifact paths, excluding the implementer's explanatory summary.

#### Scenario: Self-audit by implementing agent is blocked
- **WHEN** an audit record lists the same `executorId` and `auditorId`
- **THEN** the L2 blind audit guard SHALL fail with `SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED`.

### Requirement: Real-Artifact Witness & Structured Trail Standard (REQ-2, PROP-D)
Semantic audit approvals SHALL NOT rely solely on proxy signals such as process exit codes or log summaries (`REAL_ARTIFACT_WITNESS_MANDATE`). Every audited requirement SHALL record a structured real-artifact witness entry (`STRUCTURED_REAL_ARTIFACT_TRAIL_STANDARD`) containing `requirementId`, `artifactPath`, `observedSlice` directly extracted from the final output, and `verdict`.

#### Scenario: Proxy-only audit claim without real-artifact slice is blocked
- **WHEN** an audit record omits `observedSlice` or relies solely on `"Exit Code 0"` as evidence
- **THEN** the L2 blind audit guard SHALL fail with `PROXY_ONLY_AUDIT_REJECTED`.

### Requirement: Adversarial Falsification & Anti-Proxy Mechanical Escalation (REQ-3, PROP-E)
Blind auditors SHALL record at least one active adversarial probe (`ADVERSARIAL_FALSIFICATION_&_ACCOUNTABILITY_PROTOCOL`). Whenever blind inspection detects a defect in the real artifact despite green mechanical checks, the system SHALL flag `MECHANICAL_BLIND_SPOT_DETECTED` and require upgrading the mechanical audit suite before closure (`ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL`).

#### Scenario: Green mechanical audit with real-artifact defect triggers escalation
- **WHEN** `mechanicalPassed === true` and blind inspection records a defect (`verdict === 'FAIL'`) without a corresponding mechanical regression upgrade reference
- **THEN** the escalation check SHALL fail with `MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED`.

### Requirement: Automated L2 Blind Audit Guard & Axiom 74 Parity (REQ-4, PROP-C)
The repository SHALL provide `scripts/check-blind-audit.mjs` (`AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD`, registered as `npm run guard:blind-audit`) and codify **Axiom 74** (`BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 71) using pure universal software engineering abstractions (`AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 guard and three-mirror parity pass with Exit Code 0
- **WHEN** `npm run guard:blind-audit` and `tests/blind-auditor-real-witness.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.

### Requirement: Dual-Gate Zero-Simplification & Atomic Problem Conservation (REQ-1, REQ-2, PROP-C)
In any Problem-Type Task, every reported issue SHALL be logged atomically (`[ISSUE-01]..[ISSUE-K]`) (`STRICT_ATOMIC_PROBLEM_LOGGING_MANDATE`), and transitioning from Gate 1 to Gate 2 SHALL preserve 100% of issue IDs and core constraint fidelity without truncation, ellipsis condensation, or silent deletion (`DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION`, `ISSUE_SEMANTIC_FIDELITY_PRESERVATION_GUARD`).

#### Scenario: Gate 2 simplifies or drops a Gate 1 issue
- **WHEN** `verifyZeroSimplificationBetweenGates` detects missing issue IDs, ellipsis truncation (`...`/`等`), or severe semantic shrinkage between Gate 1 and Gate 2
- **THEN** the guard SHALL fail with `ISSUE_GATE_SIMPLIFICATION_BLOCKED`.

### Requirement: Active Non-Mechanical Problem Verification (REQ-3)
After remediation, agents SHALL NOT rely solely on mechanical audit pass signals (`Exit Code 0`, linter pass, or self-authored unit tests) to close an issue; each `[ISSUE-xx]` SHALL carry an active real-output verification observation (`ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION`) confirming the defect is eliminated in the actual deliverable.

#### Scenario: Issue closure relying solely on mechanical exit code is blocked
- **WHEN** `verifyActiveNonMechanicalAndAntiRecurrence` inspects an issue entry whose verification contains only mechanical exit-code claims without `activeObservation`
- **THEN** the guard SHALL fail with `ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED`.

### Requirement: Root-Cause Anti-Recurrence Immunity & Pre-Fix Recall (REQ-4, PROP-D, PROP-E)
Before fixing a target module, the agent SHALL query `.harness/project-graph.json` for prior hotspots and guards (`GRAPH_COUPLED_PRE_FIX_RECALL_STANDARD`). Each resolved `[ISSUE-xx]` SHALL bind a concrete structural anti-recurrence defense classified under `L1_TYPE`, `L2_GUARD`, `GRAPH_HOTSPOT`, or `ALL_SITES_SWEEP` (`ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL`, `FOUR_TIER_ANTI_RECURRENCE_TAXONOMY`), rejecting vague prose promises.

#### Scenario: Missing or prose-only anti-recurrence defense blocks issue closure
- **WHEN** a resolved issue lacks a structural anti-recurrence category or uses non-binding prose
- **THEN** the guard SHALL fail with `ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED`.

### Requirement: Axiom 75 Constitutional Codification & GitHub-First Benchmarking Mandate (REQ-5)
The enhanced problem-task governance protocol SHALL be codified as **Axiom 75** (`PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 72) using pure universal software engineering abstractions (`AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`). Furthermore, any optimization or evolution of the Ps-openspec governance system SHALL first benchmark leading GitHub open-source agent engineering repositories (`GITHUB_FIRST_BENCHMARKING_MANDATE`) prior to Step 2 legislation.

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `tests/problem-task-anti-recurrence.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.

### Requirement: Structured Enterprise Lifecycle Modeling & Swimlane Grid Compiler (REQ-1, PROP-C, PROP-D, PROP-E)
When constructing dense business process or enterprise R&D lifecycle models for Draw.io MCP, agents SHALL model Stages, Swimlanes, Decision Gates, Loopbacks, and Deliverable Artifacts in structured IR (`ENTERPRISE_LIFECYCLE_STRUCTURED_MODELING`) and compile coordinates deterministically (`DETERMINISTIC_SWIMLANE_GRID_COMPILER`) with CJK/Latin text-fit sizing (`TEXT_FIT_MARGIN_ANTI_CLIPPING_RULE`) and optional L0/L1 multi-page `<diagram>` projection (`MULTI_PAGE_L0_L1_DIAGRAM_PROJECTION`).

#### Scenario: Compiler outputs non-overlapping multi-page Draw.io XML
- **WHEN** `compileBusinessLifecycleToDrawioXml` compiles a multi-lane, multi-stage lifecycle model with L1 subpages
- **THEN** the resulting XML SHALL contain valid `<mxfile>` and `<diagram>` elements and pass `validateDrawioXml` with 0 overlaps and 0 dangling edges.

### Requirement: Upgraded Draw.io Business Modeling Skill (`skills/drawio-mcp/SKILL.md`) (REQ-2)
The repository SHALL maintain `skills/drawio-mcp/SKILL.md` (`DRAWIO_SWIMLANE_&_GATE_STYLE_STANDARD`) specifying `mxGraphModel` swimlane styles, Stage-Gate diamond/artifact styles, `routing="libavoid"`, and `set_page` multi-page editing workflows.

#### Scenario: Skill file documents swimlanes, Stage-Gate styles, and guard command
- **WHEN** `tests/drawio-business-modeling.test.mjs` inspects `skills/drawio-mcp/SKILL.md`
- **THEN** it SHALL verify swimlane, Stage-Gate, `libavoid`, and `guard:drawio-model` guidance.

### Requirement: Diagram-as-Test L2 Draw.io XML Guard (REQ-3)
The repository SHALL provide `scripts/check-drawio-model.mjs` (`AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD`, registered as `npm run guard:drawio-model`) to detect overlapping sibling nodes (`DRAWIO_NODE_OVERLAP_BLOCKED`), dangling edges (`DRAWIO_DANGLING_EDGE_BLOCKED`), and invalid XML structure (`DRAWIO_INVALID_XML_BLOCKED`).

#### Scenario: Overlapping nodes or dangling edges fail guard with Exit Code 1
- **WHEN** `validateDrawioXml` inspects XML containing two overlapping sibling boxes or an edge referencing a missing `target` ID
- **THEN** it SHALL fail with `DRAWIO_NODE_OVERLAP_BLOCKED` or `DRAWIO_DANGLING_EDGE_BLOCKED`.

### Requirement: Axiom 76 Constitutional Codification & Parity (REQ-4)
The Draw.io business lifecycle modeling standard and Diagram-as-Test guard SHALL be codified as **Axiom 76** (`DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 73) using pure universal software engineering abstractions (`AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `tests/drawio-business-modeling.test.mjs` and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.

### Requirement: Human-Authorized Multi-Agent Spawning & Single-Instance-Per-Role Cap (REQ-1, PROP-C)
Agents and coordinators SHALL NOT spawn multiple concurrent subagents or initiate a Swarm without explicit human authorization (`HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE`), and SHALL enforce a strict single-instance-per-role cap (`SINGLE_INSTANCE_PER_ROLE_CAP`) superseding `Fresh Subagents by Default` in Axiom 30 and unconditional multi-worker dispatch in Axiom 61.

#### Scenario: Unauthorized multi-agent spawn or duplicate role instance is blocked
- **WHEN** `evaluateAgentLifecycleAction` evaluates a `spawn` or `swarm_add` action requesting multiple concurrent agents without `humanAuthorized: true`, or targeting a role already held by an active/idle agent
- **THEN** it SHALL fail with `UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED` or `DUPLICATE_ROLE_INSTANCE_BLOCKED`.

### Requirement: Role-Pinned Persistent Agent Reuse & Focused Handoff (REQ-2, PROP-D)
Prior to delegating any task, the coordinator SHALL inspect existing subagents/Swarm members and reuse any existing agent matching the required `role` via `send_message` with focused task boundaries and file anchors (`ROLE_PINNED_PERSISTENT_REUSE_MANDATE`, `FOCUSED_REUSE_CHECKPOINT_HYGIENE`).

#### Scenario: Existing role-matched agent is reused instead of spawning a new one
- **WHEN** an active or idle agent already holds the target `role` and a new task for that `role` arrives
- **THEN** the lifecycle evaluator SHALL select `REUSE_EXISTING_AGENT` via `send_message` and block redundant spawning.

### Requirement: Human-Authorized Agent Termination Lock (REQ-3)
Agents SHALL NOT call `kill` or `kill_all` on any subagent or Swarm worker without explicit human authorization (`HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK`). Idle agents SHALL remain parked for future reuse.

#### Scenario: Unprompted kill/kill_all action is blocked
- **WHEN** `evaluateAgentLifecycleAction` evaluates a `kill` or `kill_all` action with `humanAuthorized !== true`
- **THEN** it SHALL fail with `UNAUTHORIZED_AGENT_TERMINATION_BLOCKED`.

### Requirement: Automated L2 Agent Lifecycle Guard & Axiom 77 Parity (REQ-4, PROP-E)
The repository SHALL provide `scripts/check-agent-lifecycle.mjs` (`AUTOMATED_L2_AGENT_LIFECYCLE_GUARD_STANDARD`, registered as `npm run guard:agent-lifecycle`) and codify **Axiom 77** (`ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 74) using pure universal software engineering abstractions (`AXIOM_77_PARITY_&_SUPERSESSION_STANDARD`).

#### Scenario: L2 tests and three-mirror parity pass with Exit Code 0
- **WHEN** `npm run guard:agent-lifecycle`, `tests/controlled-agent-lifecycle.test.mjs`, and `scripts/tests/gemini-adapter.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.

### Requirement: Problem-Class Abstraction & Analogous Pattern Sweep (REQ-1, REQ-2)
When addressing any defect or feature change, all agents SHALL abstract the concrete symptom into a general **Problem Class** (`PROBLEM_CLASS_ABSTRACTION_MANDATE`) and execute an analogous sibling pattern sweep across `.harness/project-graph.json` (`ANALOGOUS_PATTERN_SWEEP_MANDATE`) so the entire defect class is eradicated rather than patched per instance.

#### Scenario: Remediation record missing problem-class abstraction or sweep list is blocked
- **WHEN** `validateGeneralizationEvidence` inspects a remediation record lacking `problemClass` or `analogousSitesChecked`
- **THEN** it SHALL fail with `PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED`.

### Requirement: Anti-Special-Casing & Table-Driven Refactor Trigger (REQ-3, PROP-E)
Generic execution modules SHALL NOT embed instance-specific literal branches (e.g., `if (id === 'case_1')`, `if (file.includes('foo'))`) or accumulated special-case branching (`ANTI_SPECIAL_CASING_GENERALIZATION_STANDARD`, `TABLE_DRIVEN_REFACTOR_TRIGGER_THRESHOLD`). Variations SHALL be externalized into declarative lookup tables or parameterized abstractions.

#### Scenario: Instance-specific special-casing in generic code triggers Exit Code 1
- **WHEN** `scanCodeForSpecialCasing` detects hardcoded literal special-case branches targeting specific case IDs or filenames in generic source code
- **THEN** it SHALL fail with `SPECIAL_CASE_OVERFITTING_BLOCKED`.

### Requirement: Property-Based Variant Quota, L2 Guard & Axiom 78 Parity (REQ-4, PROP-C, PROP-D)
Every non-trivial remediation SHALL verify at least 2 orthogonal variant inputs beyond the original failure (`PROPERTY_BASED_VARIANT_QUOTA_STANDARD`). The repository SHALL provide `scripts/check-anti-hardcoding.mjs` (`AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD`, registered as `npm run guard:anti-hardcoding`) and codify **Axiom 78** (`UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 75) (`AXIOM_78_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Insufficient variant quota or mirror drift fails with Exit Code 1
- **WHEN** a remediation supplies fewer than 2 orthogonal variants or any constitutional mirror omits Axiom 78 tokens
- **THEN** the guard or test suite SHALL exit with Exit Code 1.

### Requirement: Poteto 4-Tier Structural Escalation & Lesson Encoding (REQ-01, PROP-B)
When resolving recurring defects or operator corrections, agents SHALL follow the poteto `/correct` 4-tier escalation hierarchy (`POTETO_CORRECT_FOUR_TIER_ESCALATION_ROUTE`: L1 Architecture > L2 Types/Lint/CI > L3 Behavioral Tests > L4 Rules/Docs) and encode any repeated lesson into executable structure (`ENCODE_LESSONS_IN_STRUCTURE_MANDATE`). When two or more fixes sharing a premise fail, agents SHALL halt and falsify the premise before attempting another fix (`CONSECUTIVE_FAILURE_PREMISE_ATTACK_TRIGGER`).

#### Scenario: Consecutive failed fixes without premise falsification are blocked
- **WHEN** `validateProblemBrainstormRecord` inspects a remediation record with `consecutiveFailures >= 2` and missing `premiseFalsified`
- **THEN** it SHALL fail with `BRAINSTORM_LAYER_SKIPPED_BLOCKED`.

### Requirement: Mandatory 5-Dimension Pre-Remediation Brainstorming Layer (REQ-02, PROP-A)
Before proposing or implementing any fix for an occurred defect, audit finding, or execution failure, agents SHALL execute the 5-Dimension Systemic Problem-Handling Brainstorm (`PRE_REMEDIATION_FIVE_DIM_BRAINSTORM_GATE`), explicitly auditing whether a semantic or judgment-sensitive workflow stage was delegated to an unattended deterministic script without an Agent Cognitive Gate (`UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED`).

#### Scenario: Unattended deterministic pipeline on semantic stage or skipped brainstorm is blocked
- **WHEN** a problem-handling record omits any required brainstorm dimension or leaves an unattended mechanical semantic pipeline unaddressed
- **THEN** `validateProblemBrainstormRecord` SHALL fail with `BRAINSTORM_LAYER_SKIPPED_BLOCKED` or `UNATTENDED_MECHANICAL_SEMANTIC_PIPELINE_BLOCKED`.

### Requirement: Tier Selection Rationale, Historical Counterexample Proof & Axiom 79 Parity (REQ-03, PROP-C)
Every structural remediation choosing a defense tier lower than L1 SHALL state why higher tiers were insufficient (`LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED`), prove the new check fails on a real historical failure sample (`HISTORICAL_FAILURE_COUNTEREXAMPLE_PROOF_MANDATE`), and maintain identical Axiom 79 (`SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM`) codification across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 76) (`AXIOM_79_PARITY_&_BRAINSTORM_ENFORCEMENT_STANDARD`).

#### Scenario: Unjustified tier downgrade or unproven historical counterexample fails with Exit Code 1
- **WHEN** `validateProblemBrainstormRecord` detects `selectedTier !== 'L1'` without `higherTierRejectionReason`, or `historicalCounterexampleProven !== true`, or missing mirror tokens
- **THEN** it SHALL fail with `LOWER_TIER_DOWNGRADE_UNJUSTIFIED_BLOCKED` or `HISTORICAL_COUNTEREXAMPLE_UNPROVEN_BLOCKED`.

### Requirement: Complete Global Sync Coverage for Skills and L2 Guards (REQ-01, PROP-A)
`scripts/sync-to-global.mjs` SHALL synchronize all 10 managed skill directories under `skills/` and all L2 static guard scripts under `scripts/` using a declarative table-driven manifest (`GLOBAL_SYNC_COMPLETE_SKILL_AND_GUARD_PARITY`), exiting with code 0 when global configuration is fully aligned.

#### Scenario: Running global sync updates all missing skills and guard scripts cleanly
- **WHEN** `node scripts/sync-to-global.mjs` executes
- **THEN** it SHALL synchronize all 10 skills and all L2 guard scripts without touching protected `.codex` paths and exit with Exit Code 0.

### Requirement: Repository Entry Documentation Alignment & Neutrality (REQ-02, PROP-B, PROP-C)
`README.md` SHALL accurately document the current 15-guard L2 verification matrix, 10-skill ecosystem, `sync-to-global.mjs` workflow, and active maintenance branch (`release/ps-openspec-v2.00`), while passing `npm run guard:neutrality` and `npm run guard:unslop` with 0 violations (`REPOSITORY_ENTRY_DOCS_ALIGNMENT_AND_NEUTRALITY`).

#### Scenario: Updated README passes neutrality and unslop static guards
- **WHEN** `npm run guard:neutrality` and `npm run guard:unslop` run after updating `README.md`
- **THEN** both guards SHALL report 0 violations and exit with Exit Code 0.

### Requirement: Maintenance Full Guard & Remote Push Gate (REQ-03)
Before archiving and pushing to `origin/release/ps-openspec-v2.00`, all 15 `guard:*` scripts and test suites SHALL pass with Exit Code 0 (`MAINTENANCE_FULL_GUARD_AND_REMOTE_SYNC_GATE`).

#### Scenario: All guards and tests pass prior to remote push
- **WHEN** the full verification suite runs after final edits
- **THEN** every guard and test suite SHALL exit with Exit Code 0.

### Requirement: Pstack-openspec Identity & Remote Alignment (REQ-01)
The repository identity and git `origin` remote SHALL align with `SnowLove0303/Pstack-openspec` (`PSTACK_OPENSPEC_IDENTITY_AND_REMOTE_ALIGNMENT`), positioning the repository as the Agent Execution Strategy Layer of the OrbitStack engineering system.

#### Scenario: Git origin remote points to SnowLove0303/Pstack-openspec.git
- **WHEN** `git remote get-url origin` is inspected
- **THEN** it SHALL return `https://github.com/SnowLove0303/Pstack-openspec.git`.

### Requirement: Architectural README Standard & Neutrality (REQ-02, PROP-B, PROP-C)
`README.md` SHALL document the `Pstack-openspec` Agent Execution Strategy Layer architecture, OrbitStack 5-layer trust pyramid, Step 0–Step 5 dual-gate SOP with Mermaid topology, 5-dim problem-handling brainstorm, 10-skill catalog, and L2 guard matrix while passing `npm run guard:neutrality`, `npm run guard:unslop`, and `npm run guard:portability` (`PSTACK_OPENSPEC_ARCHITECTURAL_README_STANDARD`).

#### Scenario: Rewritten README passes neutrality and unslop static guards
- **WHEN** `npm run guard:neutrality` and `npm run guard:unslop` execute on the updated `README.md`
- **THEN** both guards SHALL report 0 violations and exit with Exit Code 0.

### Requirement: Automated L2 Secret & Privacy Guard and Sanitization (REQ-03, PROP-A)
The repository SHALL include `.gitignore` exclusions for credential/token/cookie/key files, sanitize personal host username paths in active skill documentation (`skills/tavily-search/SKILL.md`, `skills/xmind-cloud-mcp/SKILL.md`), and enforce `scripts/check-secret-privacy.mjs` (`npm run guard:privacy`, `AUTOMATED_L2_SECRET_AND_PRIVACY_GUARD_STANDARD`) to block API keys, tokens, cookies, and private keys.

#### Scenario: Secret/cookie pattern triggers Exit Code 1 in guard:privacy
- **WHEN** `scanTextForSecrets` inspects text containing an API key, token, cookie header, or private key block
- **THEN** it SHALL fail with `SECRET_OR_PRIVACY_LEAK_BLOCKED`.

### Requirement: Problem Ledger Incremental Merge Without Replacement (REQ-01)
For both task-generated and user-provided problem ledgers, any user supplement or clarification SHALL be merged incrementally (`PROBLEM_LEDGER_INCREMENTAL_MERGE_MANDATE`), preserving every existing item ID and preventing replacement or silent deletion (`PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED`).

#### Scenario: Dropping prior ledger items during an update is blocked
- **WHEN** `validateProblemLedgerRuling` compares an updated ledger against a prior ledger `[1, 2, 3, 4]` and detects any missing prior item ID
- **THEN** it SHALL fail with `PROBLEM_LEDGER_REPLACEMENT_DROP_BLOCKED`.

### Requirement: Partial-Reply Counter-Questioning & Per-Item Final Ruling Gate (REQ-02, PROP-A)
When a user supplements or explains only a subset of a multi-item problem ledger (e.g., item `2` out of `[1, 2, 3, 4]`), the agent SHALL NOT close or execute only that subset; it SHALL interactively clarify disposition when an explanation lacks a concrete action (`DISPOSITION_CLARIFICATION_REQUIRED_BLOCKED`) and counter-question the user on all remaining `pending_ruling` items (`1, 3, 4`) until 100% of items hold explicit final rulings (`PARTIAL_REPLY_COUNTER_QUESTIONING_GATE`, `UNRULING_LEDGER_ITEMS_PENDING_BLOCKED`).

#### Scenario: Partial ruling on item 2 while items 1, 3, 4 remain pending is blocked
- **WHEN** `validateProblemLedgerRuling` inspects a 4-item ledger where only item `2` has a final ruling and `1, 3, 4` remain `pending_ruling`
- **THEN** it SHALL fail with `UNRULING_LEDGER_ITEMS_PENDING_BLOCKED` and list `[1, 3, 4]` for counter-questioning.

### Requirement: Automated L2 Guard & Axiom 80 Constitutional Parity (REQ-03, PROP-B, PROP-C)
The repository SHALL provide `scripts/check-problem-ledger-ruling.mjs` (`npm run guard:problem-ruling`) and codify **Axiom 80** (`PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 77), plus `worker.md` Section 1p (`AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD`).

#### Scenario: Missing Axiom 80 mirror token fails with Exit Code 1
- **WHEN** `npm run guard:problem-ruling` detects any missing Axiom 80 token across the constitutional mirrors or `worker.md`
- **THEN** it SHALL exit with Exit Code 1.
