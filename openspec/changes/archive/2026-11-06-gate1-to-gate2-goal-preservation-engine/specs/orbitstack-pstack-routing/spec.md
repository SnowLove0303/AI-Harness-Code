# orbitstack-pstack-routing

## ADDED Requirements

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
