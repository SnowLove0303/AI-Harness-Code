## ADDED Requirements

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
