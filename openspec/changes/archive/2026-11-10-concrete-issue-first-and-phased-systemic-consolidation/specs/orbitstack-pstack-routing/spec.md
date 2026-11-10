# orbitstack-pstack-routing

## ADDED Requirements

### Requirement: Gate 1 and Gate 2 Dual-Scope Decoupling
The system SHALL mandate that Gate 1 (Intent Ingestion) and Gate 2 (Spec Legislation) explicitly distinguish between concrete issue instances and systemic low-level modifications (`GATE1_DUAL_SCOPE_DECOUPLING_RULE`). Gate 1 dossiers MUST define concrete issues under `[Concrete Issue]` with explicit reproduction procedures, failure manifestations, and targeted acceptance metrics, while categorizing any proposed system core or documentation adjustments strictly as unverified hypotheses (`[Inferred Hypothesis]`). The system SHALL NOT substitute systemic refactoring in place of resolving the concrete reported issue.

#### Scenario: Ingesting a user issue report in Gate 1
- **WHEN** a user reports a specific defect or unexpected behavior in an application scenario
- **THEN** Gate 1 SHALL register the concrete issue with dedicated reproduction and acceptance criteria
- **AND** any inferred systemic causes SHALL be marked as unverified hypotheses that cannot replace the concrete fix.

### Requirement: Phase 1 Targeted Concrete Resolution and Core Immunity Lock
The system SHALL mandate that tasks addressing concrete issues enforce a two-phase execution lifecycle (`PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK`). Phase 1 MUST prioritize targeted resolution of the concrete issue within minimal blast radius. During Phase 1, shared system core engines, generic frameworks, and meta-governance documentation SHALL remain locked under `SYSTEM_CORE_READONLY_LOCK`. The agent MUST produce empirical verification (`[Measured] Exit Code 0`) demonstrating that the concrete issue is resolved before proposing any core modifications.

#### Scenario: Executing Phase 1 concrete issue fix
- **WHEN** the agent implements the fix for the reported concrete issue
- **THEN** the single-focus execution lock SHALL apply only to target issue resolution within localized boundaries
- **AND** the system core engines SHALL remain untouched and immutable until measured proof is produced.

### Requirement: Human Stage Confirmation Collaborative Gate
The system SHALL establish an explicit human collaborative gate between Phase 1 and Phase 2 (`HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE`). Upon successfully verifying the concrete issue resolution with real exit code 0, the agent MUST present a stage resolution summary to the user. The agent SHALL NOT proceed to modify underlying system engines or shared meta-documentation without explicit human authorization confirming the concrete fix.

#### Scenario: Transitioning from Phase 1 to Phase 2
- **WHEN** Phase 1 completes with verified exit code 0 on the concrete issue reproduction test
- **THEN** the agent SHALL pause execution and report the empirical fix evidence to the user
- **AND** Phase 2 systemic consolidation SHALL activate only after the user explicitly approves the transition.

### Requirement: Phase 2 Ground-Truth-Driven Systemic Consolidation and Regression Net
The system SHALL mandate that Phase 2 systemic modifications derive strictly from empirical facts established during Phase 1 resolution rather than ungrounded cognitive hypotheses (`PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET`). Phase 2 core changes MUST undergo the Multi-Scenario Collaborative Regression Gate across the target task and at least two distinct golden reference specimens. If any reference specimen experiences degradation, the system SHALL execute immediate atomic rollback to the Phase 1 state.

#### Scenario: Consolidating systemic invariants in Phase 2
- **WHEN** the user confirms the concrete fix and authorizes Phase 2 systemic consolidation
- **THEN** the agent SHALL formulate generic architecture, lint, or type invariants grounded in the measured fix facts
- **AND** concurrent regression testing SHALL verify all reference specimens, aborting on any failure.

### Requirement: Universal Concrete-First Consolidation Standard
The system SHALL enforce that all rules, blockers, and invariants governing concrete issue priority and phased consolidation use 100% pure software engineering terminology (`UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD`). The specification SHALL remain domain-neutral, scenario-agnostic, and validated by automated test suites.

#### Scenario: Validating concrete-first consolidation specifications
- **WHEN** static analysis parses concrete-first and phased consolidation rules
- **THEN** the specification SHALL contain only formal software engineering concepts
- **AND** static analysis SHALL verify zero domain-specific token leakage.
