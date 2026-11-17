# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

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
