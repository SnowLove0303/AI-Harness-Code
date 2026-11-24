## ADDED Requirements

### Requirement: Blind Auditor Physical Isolation Mandate (REQ-1)
Implementing agents SHALL NOT certify their own semantic audit (`BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE`). Semantic verification SHALL be executed by an isolated blind auditor (`executorId !== auditorId`) whose input is restricted to original requirements and final output artifact paths, excluding the implementer's explanatory summary.

#### Scenario: Self-audit by implementing agent is blocked
- **WHEN** an audit record lists the same `executorId` and `auditorId`
- **THEN** the L2 blind audit guard SHALL fail with `SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED`.

### Requirement: Real-Artifact Witness & Structured Trail Standard (REQ-2, PROP-D)
Semantic audit approvals SHALL NOT rely solely on proxy signals such as process exit codes or log summaries (`REAL_ARTIFACT_WITNESS_MANDATE`). Every audited requirement SHALL record a structured real-artifact witness entry (`STRUCTURED_REAL_ARTIFACT_TRAIL_STANDARD`) containing `requirementId`, `artifactPath`, `observedSlice` directly extracted from the final output, and `verdict`.

#### Scenario: Proxy-only audit claim without real-artifact slice is blocked
- **WHEN** an audit record omits `observedSlice` or relies solely on `"Exit Code 0"` as evidence
- **THEN** the L2 blind audit guard SHALL fail with `PROXY_ONLY_AUDIT_REJECTED`.

### Requirement: Adversarial Falsification & Anti-Proxy Mechanical Escalation (REQ-3, PROP-E)
Blind auditors SHALL record at least one active adversarial probe (`ADVERSARIAL_FALSIFICATION_&_ACCOUNTABILITY_PROTOCOL`). Whenever blind inspection detects a defect in the real artifact despite green mechanical checks, the system SHALL flag `MECHANICAL_BLIND_SPOT_DETECTED` and require upgrading the mechanical audit suite before closure (`ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL`).

#### Scenario: Green mechanical audit with real-artifact defect triggers escalation
- **WHEN** `mechanicalPassed === true` and blind inspection records a defect (`verdict === 'FAIL'`) without a corresponding mechanical regression upgrade reference
- **THEN** the escalation check SHALL fail with `MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED`.

### Requirement: Automated L2 Blind Audit Guard & Axiom 74 Parity (REQ-4, PROP-C)
The repository SHALL provide `scripts/check-blind-audit.mjs` (`AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD`, registered as `npm run guard:blind-audit`) and codify **Axiom 74** (`BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 71) using pure universal software engineering abstractions (`AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD`).

#### Scenario: L2 guard and three-mirror parity pass with Exit Code 0
- **WHEN** `npm run guard:blind-audit` and `tests/blind-auditor-real-witness.test.mjs` execute
- **THEN** all checks SHALL pass with Exit Code 0.
