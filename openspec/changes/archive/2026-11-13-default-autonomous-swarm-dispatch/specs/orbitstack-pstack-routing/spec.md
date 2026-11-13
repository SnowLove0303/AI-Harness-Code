# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

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
