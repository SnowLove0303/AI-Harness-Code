# orbitstack-pstack-routing

## ADDED Requirements

### Requirement: Project Dual Blacklist-Whitelist Registry and False Positive Shield
The system SHALL mandate that each project audit system maintain an explicit dual registry comprising an authoritative Whitelist and a strict Blacklist. The Whitelist SHALL codify human-confirmed legitimate business structures, intentional exceptions, and golden master exemplars. Any code pattern or deliverable structure matching the Whitelist SHALL possess absolute immunity (`WHITELIST_SUPREME_IMMUNITY_AXIOM`) from defect classification. Any agent attempting to overhaul or refactor code based on an audit false-positive SHALL be blocked (`FALSE_POSITIVE_OVERHAUL_BLOCKED`).

#### Scenario: Agent audits a human-approved special pattern or syntax
- **WHEN** an audit rule encounters code or structure registered in the project Whitelist
- **THEN** the audit evaluation SHALL yield an immediate PASS verdict with immunity
- **AND** the agent SHALL NOT report a defect or propose speculative refactoring against that pattern.

### Requirement: Anti-False Negative Blacklist Enforcement and Leakage Blocker
The system SHALL mandate that all historical defect patterns, prohibited exogenous fabrications, and recurring regressions be codified into the project Blacklist (`BLACKLIST_MANDATORY_INTERCEPTION_AXIOM`). Blacklist patterns SHALL execute as deterministic AST, regex, or value-topology hard blockers with non-zero exit codes. Any release or delivery containing unflagged Blacklist patterns SHALL trigger an audit leakage breach (`AUDIT_LEAKAGE_DETECTED`).

#### Scenario: Agent encounters known defect pattern or exogenous hallucination
- **WHEN** code or deliverable structure matches any active entry in the project Blacklist
- **THEN** the audit engine SHALL trigger an unconditional FAIL verdict with exit code 1
- **AND** the agent SHALL NOT mark tasks complete until the offending pattern is completely eliminated.

### Requirement: Dual-Specimen Sanity Gate for Audit Rule Mutation
The system SHALL require that any addition, modification, or escalation of audit rules pass the Dual-Specimen Sanity Gate (`DUAL_SPECIMEN_SANITY_GATE`). The proposed rule MUST achieve zero false positives (100% pass) against the project's positive golden specimen suite, and zero false negatives (100% fail) against the project's negative fault mutant suite.

#### Scenario: Proposing a new or revised audit rule
- **WHEN** an agent proposes a new audit rule or updates an existing invariant
- **THEN** it SHALL execute the rule against both the positive specimen set and the negative mutant set
- **AND** if the rule fails either specimen suite, it SHALL be rejected (`UNVERIFIED_RULE_MUTATION_BLOCKED`).
