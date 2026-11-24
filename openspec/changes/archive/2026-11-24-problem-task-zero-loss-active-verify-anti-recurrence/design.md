# Technical Design: Problem-Task Zero-Simplification, Active Verification & Anti-Recurrence (Axiom 75)

## 1. Extension to `scripts/check-issue-clearance.mjs`
Without breaking any existing exported functions (`isProblemTask`, `extractIssueIds`, `extractReconciliationEntries`, `runClearanceGuard`), add:
1. `verifyZeroSimplificationBetweenGates(gate1Issues, gate2Issues)`:
   - Checks 1:1 ID conservation (`gate1Issues` IDs all present in `gate2Issues`).
   - Checks anti-simplification fidelity: rejects ellipsis condensation (`...`, `…`, `等类似`, `若干`) and rejects descriptions shrunk below 40% of Gate 1 character length (`ISSUE_GATE_SIMPLIFICATION_BLOCKED`).
2. `verifyActiveNonMechanicalAndAntiRecurrence(entries)`:
   - Validates each resolved `[ISSUE-xx]` has a non-proxy `activeObservation` directly confirming the real artifact (`ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED`).
   - Validates each resolved `[ISSUE-xx]` specifies `antiRecurrenceDefense` with `tier` in `['L1_TYPE', 'L2_GUARD', 'GRAPH_HOTSPOT', 'ALL_SITES_SWEEP']` and a concrete `targetRef` (`ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED`).

## 2. Pre-Fix Project Graph Recall
Links Problem-Type Tasks to `.harness/project-graph.json`: before modifying code for an issue, query the target module's `errorMutationCount`, `riskTier`, and `structuralGuards`.
