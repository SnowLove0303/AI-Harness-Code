# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

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
