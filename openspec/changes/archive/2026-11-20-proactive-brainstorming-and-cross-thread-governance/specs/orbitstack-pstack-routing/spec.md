# orbitstack-pstack-routing: Delta Specification for Proactive Requirement Brainstorming and Universal Cross-Thread Ps-openspec Governance

This delta specification defines statutory requirements for proactive requirement brainstorming in dual-gate workflows, unmissable cross-thread cold-boot governance, and front-loaded anti-truncation architecture under Ps-openspec.

## Added Requirements

### Requirement: Proactive Requirement Brainstorming and Anticipation Protocol
When an engineering task is ingested in Step 0, the system SHALL preserve the explicit user requirements verbatim with a SHA-256 fact fingerprint.
Concurrently, the agent SHALL proactively perform architectural extrapolation to anticipate companion, defensive, and downstream requirements (the A, B -> C, D, E extrapolation).
The Step 0 Gate 1 dossier SHALL feature a dedicated `Proactive Requirement Brainstorming Matrix` evaluating:
1. Runtime safety and boundary defense
2. Data migration, host portability, and storage resilience
3. Evolvability, rollback safety, and backward compatibility
The brainstormed companion proposals SHALL be explicitly designated as suggestions (`[Brainstormed Proposal]`) and awaiting explicit human confirmation.
Failing to include the proactive brainstorming matrix in the Gate 1 dossier SHALL trigger `PROACTIVE_BRAINSTORMING_OMISSION_BLOCKED`.

#### Scenario: Proactive Brainstorming Extrapolation
- **GIVEN** a user request specifying core features A and B
- **WHEN** the agent authors the Gate 1 dossier
- **THEN** it SHALL output the verbatim prompt and a dedicated table proposing companion items C, D, and E
- **AND** it SHALL pause to await human confirmation of which items to incorporate.

---

### Requirement: Gate 2 Brainstorming Ingestion and Legislation Gate
In Step 2 (OpenSpec authoring), the system SHALL ingest only the explicitly confirmed user requirements and user-approved brainstormed proposals.
The count and scope of requirements in `proposal.md` and `specs/` SHALL strictly match the user-confirmed set.
Unapproved brainstormed suggestions SHALL NOT be implemented or smuggled into the change scope.
Smuggling unconfirmed brainstormed proposals into production code SHALL trigger `UNAUTHORIZED_PROPOSAL_MUTATION_BLOCKED`.

#### Scenario: Exact Ingestion of Approved Requirements
- **GIVEN** a task where the user confirmed explicit items A and B, and approved proposal C while rejecting D
- **WHEN** Gate 2 specifications are compiled
- **THEN** the specifications SHALL define requirements exclusively for A, B, and C
- **AND** item D SHALL be excluded from the scope.

---

### Requirement: Universal Cross-Thread and Model Bootstrap Mandate
Every conversation thread, newly spawned session, or alternate model (including Google Gemini, OpenAI GPT, Anthropic Claude, and DeepSeek) operating within the environment SHALL unconditionally inherit and execute the Ps-openspec governance framework.
The system SHALL front-load a mandatory cold-boot directive within the first 50 lines of the global `GEMINI.md` constitution (`MANDATORY_BOOTSTRAP_PROTOCOL`).
Upon receiving any engineering task, the model SHALL immediately initialize Step 0 (Spec-Kit Ingestion & Gate 1) before performing any file edits or code synthesis.
Attempting to modify code or answer with conversational hand-waving without completing Gate 1 and Gate 2 SHALL trigger `GOVERNANCE_BOOTSTRAP_VIOLATION_BLOCKED`.

#### Scenario: Cross-Model Cold-Boot Enforcement
- **GIVEN** a new session initialized with an alternate model
- **WHEN** the user delivers an engineering request
- **THEN** the model SHALL immediately output the Step 0 Gate 1 dossier
- **AND** halt for human authorization before editing code.

---

### Requirement: Anti-Truncation Front-Loaded Architecture and Workspace Sync Standard
To prevent loss of governance rules caused by host-level prompt truncation (when files exceed 24 KB), the system SHALL maintain the core Ps-openspec constitution, dual-gate SOP, and cold-boot directives within the first 20 KB safe zone of `GEMINI.md`.
The synchronization utility (`scripts/sync-to-global.mjs`) SHALL:
1. Sync `GEMINI.md` and `worker.md` to global configuration paths.
2. Ensure active workspace roots contain directory pointers or rule anchors (`.agents/rules/` or local `GEMINI.md`) ensuring 100% inheritance.
If the critical bootstrap directive falls outside the first 20 KB safe zone, static checks SHALL raise `TRUNCATION_HAZARD_BLOCKED`.

#### Scenario: Safe Zone Boundary Verification
- **GIVEN** the global `GEMINI.md` file
- **WHEN** static analysis measures the byte offset of the mandatory bootstrap protocol
- **THEN** the offset SHALL be less than 20,480 bytes (20 KB)
- **AND** verification SHALL pass with Exit Code 0.

---

### Requirement: Automated L2 Global Governance and Brainstorming Guard Standard
The system SHALL provide an automated static analysis test suite (`tests/proactive-brainstorming-governance.test.mjs`).
The suite SHALL mechanically verify:
1. Gate 1 dossiers contain the dedicated proactive brainstorming matrix.
2. Global `GEMINI.md` and `worker.md` contain the front-loaded bootstrap protocol within the safe zone.
3. Unapproved proposals are blocked from silent code modification.
If any check fails, the test suite SHALL exit with code 1 and emit `GLOBAL_GOVERNANCE_INTEGRITY_FAILED`.

#### Scenario: Automated Guard Execution
- **GIVEN** the repository test suite
- **WHEN** `node tests/proactive-brainstorming-governance.test.mjs` is executed
- **THEN** all assertions SHALL pass with Exit Code 0.

---

### Requirement: Axiom 69 Proactive Brainstorming and Cross-Thread Governance Legislation
The rules of Proactive Requirement Brainstorming, Gate 2 Ingestion Filtering, Universal Cross-Thread Bootstrap, and Anti-Truncation Front-Loading SHALL be codified as Axiom 69 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 66).
All codified rules, scripts, test suites, and documentation SHALL maintain 100% universal software engineering abstraction with zero domain-scenario token leakage.

#### Scenario: Constitutional Parity Across Three Mirrors
- **GIVEN** the living specification files and global configurations
- **WHEN** the regression test suite is executed
- **THEN** all three mirrors SHALL exhibit identical sub-invariants for Axiom 69.
