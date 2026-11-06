# orbitstack-pstack-routing

## ADDED Requirements

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
