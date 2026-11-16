# orbitstack-pstack-routing Delta Specification

## ADDED Requirements

### Requirement: Explicit Issue as Tip of Iceberg Axiom
The system SHALL mandate that whenever a user points out a specific defect, anomaly, or execution failure, the system SHALL treat the cited issue as an explicit sentinel probe representing a broader category of submerged vulnerabilities (`EXPLICIT_ISSUE_ICEBERG_PROBE_RULE`). Agents SHALL NOT evaluate user feedback as an isolated local exception. The system SHALL automatically assume that the underlying failure mode possesses deeper structural causality and potential sibling instances across the codebase.

#### Scenario: User provides feedback on a specific defect
- **WHEN** the user identifies a specific error, misbehavior, or omission
- **THEN** the system SHALL classify the finding as an explicit Iceberg Probe
- **AND** the system SHALL NOT restrict analysis to the cited symptom alone.

#### Scenario: Evaluating defect scope
- **WHEN** an agent assesses the blast radius and remediation scope of a reported issue
- **THEN** it SHALL mandate both vertical depth penetration and horizontal breadth sweeps
- **AND** it SHALL reject superficial, single-point workarounds.

---

### Requirement: Vertical Depth 5-Whys Penetration Protocol
The system SHALL mandate that when processing any identified defect, the agent MUST execute a formal 5-Whys root cause penetration protocol (`DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL`). The penetration SHALL trace from the immediate runtime symptom through logic omissions, type and assertion blind spots, planning and gate failures, up to constitutional architecture gaps. The agent SHALL NOT finalize remediation proposals without documenting this complete causal chain.

#### Scenario: Agent traces failure causality
- **WHEN** an agent investigates an identified defect
- **THEN** it SHALL formulate the 5-Whys causal progression
- **AND** it SHALL identify the systemic design weakness that permitted the defect to materialize.

#### Scenario: Formulating architectural remediation
- **WHEN** the 5-Whys penetration reveals a structural invariant gap
- **THEN** the remediation plan SHALL target the root constitutional layer
- **AND** the agent SHALL NOT rely on localized conditionals or symptom suppression.

---

### Requirement: Horizontal Exhaustive Sibling Sweep Protocol
The system SHALL mandate that upon identifying a defect pattern, the agent MUST perform an exhaustive horizontal sweep across all homologous modules, lifecycle steps (Step 0 through Step 5), and companion specification mirrors (`HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL`). The agent SHALL assemble an explicit sibling inventory and remediate all discovered co-occurring or homologous vulnerabilities within the same change cycle.

#### Scenario: Scanning for homologous vulnerabilities
- **WHEN** a defect pattern is extracted from an identified issue
- **THEN** the system SHALL scan all structurally similar components, lifecycle gates, and specification documents
- **AND** it SHALL catalog all matching sibling vulnerabilities.

#### Scenario: Resolving sibling vulnerabilities
- **WHEN** sibling instances of a defect pattern are identified
- **THEN** the task plan SHALL incorporate fixes for all cataloged instances
- **AND** the agent SHALL verify remediation across all affected modules before closure.

---

### Requirement: Single-Point Failure Triggers Systemic Hardening Gate
The system SHALL enforce a mandatory systemic hardening gate requiring that every resolved failure mode descend into permanent, machine-enforced defenses (`SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE`). Remediation SHALL NOT be deemed complete solely by resolving the immediate symptom; the agent MUST establish Layer 1 architectural constraints, Layer 2 automated linter assertions (with measured exit code 0), or Layer 3 constitutional invariants, supported by generalized regression suites.

#### Scenario: Finalizing defect remediation
- **WHEN** implementation of a defect fix is completed
- **THEN** the system SHALL verify that a corresponding automated L2 test or static assertion is introduced
- **AND** the gate SHALL block completion if systemic invariant defenses are absent.

#### Scenario: Preventing regression across defect categories
- **WHEN** automated test suites run during regression verification
- **THEN** the suite SHALL execute both positive defense tests and negative mutation anti-fraud checks
- **AND** any recurrence of the defect pattern SHALL trigger a hard build block.

---

### Requirement: Axiom 59 Constitutional Legislation and Domain Neutrality
The system SHALL formally codify Axiom 59 (`PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM`) in the repository-owned `GEMINI.md` and `skills/ai-harness-openspec/SKILL.md`, and SHALL assess any separately maintained global or upstream mirrors as discovered homologous surfaces without modifying them absent explicit authorization. The rule SHALL use domain-neutral, scenario-agnostic software engineering terminology (`UNIVERSAL_ICEBERG_PROBE_STANDARD`). Automated Layer 2 regression assertions SHALL mechanically enforce the repository-owned invariants and report any unaddressed mirror drift.

#### Scenario: Auditing constitutional conformance and domain neutrality
- **WHEN** static analysis parses Axiom 59 and its associated penetration rules
- **THEN** the specification SHALL contain only formal software engineering, causal analysis, and systemic auditing terms
- **AND** static analysis SHALL verify zero scenario-token leakage and 100% architectural neutrality.
