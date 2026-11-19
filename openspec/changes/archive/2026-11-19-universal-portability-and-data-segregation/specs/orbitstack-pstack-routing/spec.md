# orbitstack-pstack-routing: Delta Specification for Universal Portability, Database Migration Resilience, and User/Default Data Orthogonal Segregation Governance

This delta specification defines statutory requirements for cross-device portability, resilient database auto-bootstrapping and migrations, and orthogonal segregation of immutable system defaults from mutable user data under Ps-openspec.

## Added Requirements

### Requirement: Cross-Device Portability and Host Decoupling Standard
When engineering, modifying, or refactoring applications, web interfaces, scripts, or agent workflows, the system SHALL decouple all operational logic from host-specific environmental artifacts.
The system SHALL NOT hardcode single-machine absolute paths (such as `C:\Users\...` or machine-specific home folders), machine-bound hostnames, or fixed network port bindings in source code or committed configurations.
All filesystem resolution SHALL be performed dynamically at system boundaries (`principle-boundary-discipline`) via relative paths rooted at application run roots (`process.cwd()`, standard project roots) or well-defined portable environment variables (`DATA_DIR`, `APPDATA`, `XDG_DATA_HOME`).
If a hardcoded single-machine absolute path or host-bound identifier is detected in production source assets, the system SHALL block execution and raise `HARDCODED_HOST_ENVIRONMENT_BLOCKED`.

#### Scenario: Cross-Machine Dynamic Path Resolution
- **GIVEN** an application component requiring local state persistence
- **WHEN** the component determines its storage directory
- **THEN** it SHALL resolve paths relative to the runtime configuration or portable environment variable
- **AND** it SHALL NOT reference any static user home or developer-specific local directory.

---

### Requirement: Database Migration Resilience and Auto-Bootstrap Standard
When an application connects to or initializes embedded, file-based (such as SQLite), or networked database storage, the system SHALL ensure end-to-end migration resilience and automated cold-boot self-healing.
The database initialization routine SHALL:
1. Recursively probe and auto-create target database parent directories if they do not exist.
2. Auto-create database files and execute base schema setup idempotently (`principle-make-operations-idempotent`).
3. Execute ordered, declarative, versioned migration scripts tracking applied versions in a metadata table.
4. Tolerate migration across devices where an older database schema is mounted into a newer application version by upgrading incrementally without data loss.
Direct unmanaged access to raw database files without dynamic directory auto-creation and migration management SHALL trigger `DATABASE_UNMANAGED_BOOTSTRAP_BLOCKED`.

#### Scenario: Cold-Boot Auto-Bootstrap on New Machine
- **GIVEN** a newly deployed application running in an empty environment where the database directory is absent
- **WHEN** the application starts up
- **THEN** it SHALL recursively create the storage directory, initialize tables, and execute migrations with Exit Code 0
- **AND** subsequent restarts SHALL execute idempotently without errors.

---

### Requirement: User Data and Default Data Orthogonal Segregation Standard
Software systems that manage configuration presets, initial templates, dictionary standards, and user-generated content SHALL enforce strict two-tier orthogonal segregation:
1. **Read-Only System Default Layer**: Shipped templates, default presets, built-in catalogs, and system rules SHALL reside in an immutable/read-only distribution layer. Application upgrades SHALL replace this layer in full without impacting user state.
2. **Mutable User Overlay Layer**: User records, custom configurations, domain instances, and local overrides SHALL be segregated into a dedicated user data storage volume or isolated database tables/key namespaces (`principle-separate-before-serializing-shared-state`).
Application updates SHALL NEVER clobber or alter user-created records.
User reset or purge operations SHALL NEVER corrupt or delete the shipped system default baseline.
Commingling user records and system presets in a single unsegregated mutable container SHALL trigger `STATE_SEGREGATION_VIOLATION_BLOCKED`.

#### Scenario: Software Upgrade Preserving User Data
- **GIVEN** an existing installation containing customized user records and default templates
- **WHEN** the software is upgraded to a newer release with updated default templates
- **THEN** the system default layer SHALL be updated cleanly
- **AND** all existing user data and customizations SHALL remain intact without modification.

#### Scenario: User State Reset Preserving System Defaults
- **GIVEN** a user initiating a full reset of their personal application data
- **WHEN** the reset operation executes
- **THEN** the system SHALL purge only the mutable user data overlay
- **AND** the read-only default presets and baseline templates SHALL remain fully functional.

---

### Requirement: Portable Data Export, Backup, and Restore Standard
Systems storing persistent user state SHALL provide structured, portable data export and restore capabilities.
The export payload SHALL:
1. Consist of standardized formats (such as clean JSON, SQL dump, or portable archive bundles).
2. Contain strictly the mutable user dataset and configuration overlays.
3. Exclude all machine-specific absolute filepaths, local process identifiers, and host credentials.
During restore operations on a target machine, the system SHALL validate data integrity, verify schema compatibility, and reconstitute application state seamlessly.

#### Scenario: Portable Export and Target Import Verification
- **GIVEN** an active user dataset on machine A
- **WHEN** an export is generated and transferred to a completely distinct machine B
- **THEN** machine B SHALL successfully import the dataset and restore full business functionality
- **AND** the exported artifact SHALL contain zero absolute host path references.

---

### Requirement: Automated L2 Universal Portability Guard Standard
The system SHALL provide an automated static and structural analysis guard script (`scripts/check-universal-portability.mjs`), registered as `npm run guard:portability` in `package.json`.
The guard SHALL:
1. Scan project source files, scripts, workflows, and configurations for hardcoded absolute drive roots (e.g., `C:\Users\`, `/home/`) and machine-bound patterns.
2. Verify that database connection handlers incorporate auto-bootstrap directory creation and migration resilience.
3. Validate that default presets and mutable user data reside in segregated directories or distinct namespaces.
If any portability or segregation violation is detected, the guard SHALL exit with code 1 and emit `HARDCODED_HOST_ENVIRONMENT_BLOCKED` or `STATE_SEGREGATION_VIOLATION_BLOCKED`.

#### Scenario: Automated Portability Guard Enforcement
- **GIVEN** a project codebase
- **WHEN** `npm run guard:portability` is executed
- **THEN** it SHALL exit with code 0 if all portability standards are satisfied
- **AND** it SHALL exit with code 1 upon mutation testing where a hardcoded absolute path is injected.

---

### Requirement: Axiom 67 Universal Portability and Data Segregation Constitutional Legislation
The rules of Cross-Device Portability, Database Migration Resilience, and User/Default Data Orthogonal Segregation SHALL be codified as Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Constitutional Parity Across Three Mirrors
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 67.
