# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

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

---

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

---

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

---

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

---

### Requirement: Axiom 56 Constitutional Legislation and Universal Domain Neutrality
The system SHALL formally codify Axiom 56 (`LEAD_AGENT_ORCHESTRATION_&_SWARM_EXECUTION_DECOUPLING_AXIOM`) across all engineering constitutions (`GEMINI.md`, `skills/pstack-openspec/SKILL.md`, `skills/ai-harness-openspec/SKILL.md`) using 100% domain-neutral software engineering and distributed multi-agent system terminology (`UNIVERSAL_SWARM_DECOUPLING_STANDARD`). Automated Layer 2 linters and test suites SHALL mechanically verify these invariants.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis audits Axiom 56 and its associated rules
- **THEN** the specification SHALL contain only formal software engineering, distributed systems, and agent orchestration terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.
