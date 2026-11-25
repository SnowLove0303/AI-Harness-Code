## ADDED Requirements

### Requirement: Problem-Class Abstraction & Analogous Pattern Sweep (REQ-1, REQ-2)
When addressing any defect or feature change, all agents SHALL abstract the concrete symptom into a general **Problem Class** (`PROBLEM_CLASS_ABSTRACTION_MANDATE`) and execute an analogous sibling pattern sweep across `.harness/project-graph.json` (`ANALOGOUS_PATTERN_SWEEP_MANDATE`) so the entire defect class is eradicated rather than patched per instance.

#### Scenario: Remediation record missing problem-class abstraction or sweep list is blocked
- **WHEN** `validateGeneralizationEvidence` inspects a remediation record lacking `problemClass` or `analogousSitesChecked`
- **THEN** it SHALL fail with `PROBLEM_CLASS_ABSTRACTION_MISSING_BLOCKED`.

### Requirement: Anti-Special-Casing & Table-Driven Refactor Trigger (REQ-3, PROP-E)
Generic execution modules SHALL NOT embed instance-specific literal branches (e.g., `if (id === 'case_1')`, `if (file.includes('foo'))`) or accumulated special-case branching (`ANTI_SPECIAL_CASING_GENERALIZATION_STANDARD`, `TABLE_DRIVEN_REFACTOR_TRIGGER_THRESHOLD`). Variations SHALL be externalized into declarative lookup tables or parameterized abstractions.

#### Scenario: Instance-specific special-casing in generic code triggers Exit Code 1
- **WHEN** `scanCodeForSpecialCasing` detects hardcoded literal special-case branches targeting specific case IDs or filenames in generic source code
- **THEN** it SHALL fail with `SPECIAL_CASE_OVERFITTING_BLOCKED`.

### Requirement: Property-Based Variant Quota, L2 Guard & Axiom 78 Parity (REQ-4, PROP-C, PROP-D)
Every non-trivial remediation SHALL verify at least 2 orthogonal variant inputs beyond the original failure (`PROPERTY_BASED_VARIANT_QUOTA_STANDARD`). The repository SHALL provide `scripts/check-anti-hardcoding.mjs` (`AUTOMATED_L2_ANTI_HARDCODING_GUARD_STANDARD`, registered as `npm run guard:anti-hardcoding`) and codify **Axiom 78** (`UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 75) (`AXIOM_78_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: Insufficient variant quota or mirror drift fails with Exit Code 1
- **WHEN** a remediation supplies fewer than 2 orthogonal variants or any constitutional mirror omits Axiom 78 tokens
- **THEN** the guard or test suite SHALL exit with Exit Code 1.
