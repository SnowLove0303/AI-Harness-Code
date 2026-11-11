# orbitstack-pstack-routing

## ADDED Requirements

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
