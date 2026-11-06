# orbitstack-pstack-routing

## ADDED Requirements

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
