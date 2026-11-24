# Technical Design: Blind Auditor Isolation & Real-Artifact Witness (Axiom 74)

## 1. `@poteto` Pstack Grounding
- **`principle-prove-it-works`**: Direct inspection of final output values instead of trusting proxy logs or exit codes.
- **`show-me-your-work`**: Structured audit trail (`requirementId`, `artifactPath`, `observedSlice`, `verdict`) plus cross-model / isolated reviewer separation.
- **`interrogate`**: Adversarial falsification run against the real artifact to disprove compliance before acceptance.

## 2. Deterministic L2 Blind Audit Guard (`scripts/check-blind-audit.mjs`)
Exports `validateBlindAuditTrail(trail)`:
1. **`SELF_AUDIT_ISOLATION_VIOLATION_BLOCKED`**: Rejects if `trail.executorId === trail.auditorId` or either is empty.
2. **`PROXY_ONLY_AUDIT_REJECTED`**: Rejects if any witness entry lacks `artifactPath` or `observedSlice`, or if `observedSlice` is merely a proxy phrase (`"Exit Code 0"`, `"tests pass"`, `"looks good"`).
3. **`ADVERSARIAL_PROBE_MISSING_BLOCKED`**: Rejects if `trail.adversarialProbes` is missing or empty.
4. **`MECHANICAL_BLIND_SPOT_UNMITIGATED_BLOCKED`**: Rejects if `trail.mechanicalPassed === true` and any entry has `verdict === 'FAIL'` without `mechanicalEscalationGuard` recorded.
5. **Repository Baseline**: Validates `.harness/blind-audit-trail.json` if present (or passes cleanly on idle repositories).
