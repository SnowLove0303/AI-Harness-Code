# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

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
