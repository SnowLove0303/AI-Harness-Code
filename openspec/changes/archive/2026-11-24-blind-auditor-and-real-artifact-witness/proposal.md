# Change Proposal: Blind Auditor Isolation, Real-Artifact Witness & Anti-Proxy Escalation (Axiom 74)

## Why
Agents frequently treat auditing as a formality by relying exclusively on self-authored mechanical checks (exit codes, unit test stubs, or self-reported logs) without inspecting the real final output artifact against original user requirements. Referencing `@poteto` Pstack principles (`principle-prove-it-works`, `show-me-your-work`, and `interrogate`), this change enforces **blind auditor physical isolation**, **real-artifact witness slicing**, and **bidirectional mechanical audit escalation** whenever a blind audit catches a defect missed by green mechanical checks.

## What Changes
1. **REQ-1 (Blind Auditor Physical Isolation)**: Prohibit implementing agents from certifying their own semantic audit; require dispatching an isolated fresh-context (or cross-model) blind auditor restricted to original requirements + final artifact paths.
2. **REQ-2 (Real-Artifact Witness Mandate)**: Reject proxy-only approvals (`Exit Code 0` or summary claims); require concrete read values, coordinates, or output slices directly observed from the final deliverable per requirement.
3. **REQ-3 (Adversarial Falsification & Accountability)**: Mandate active adversarial falsification probes and immediate defect escalation if real-artifact behavior diverges from mechanical check results.
4. **REQ-4 (Axiom 74 Three-Mirror Codification)**: Codify Axiom 74 (`BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 71) using pure universal software engineering abstractions.
5. **PROP-C (L2 Blind Audit Guard)**: Create `scripts/check-blind-audit.mjs` (`npm run guard:blind-audit`) to deterministically validate audit trail records (`executorId !== auditorId`, non-empty `realArtifactSlice`, and `adversarialProbe`).
6. **PROP-D (Structured Real-Artifact Witness Trail)**: Support structured audit trail entries (`requirementId`, `artifactPath`, `observedSlice`, `verdict`).
7. **PROP-E (Anti-Proxy Bidirectional Escalation)**: Require updating mechanical assertions whenever blind auditing uncovers a defect that passed mechanical checks (`MECHANICAL_BLIND_SPOT_DETECTED`).

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Blind Auditor Physical Isolation | `BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE` |
| REQ-2 | Real-Artifact Witness Slicing | `REAL_ARTIFACT_WITNESS_MANDATE` |
| REQ-3 | Adversarial Falsification & Accountability | `ADVERSARIAL_FALSIFICATION_&_ACCOUNTABILITY_PROTOCOL` |
| REQ-4 | Axiom 74 Three-Mirror Codification | `AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Automated L2 `guard:blind-audit` | `AUTOMATED_L2_BLIND_AUDIT_GUARD_STANDARD` |
| PROP-D | Structured Witness Trail | `STRUCTURED_REAL_ARTIFACT_TRAIL_STANDARD` |
| PROP-E | Anti-Proxy Mechanical Escalation | `ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL` |
