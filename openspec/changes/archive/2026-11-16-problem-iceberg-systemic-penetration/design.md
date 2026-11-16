# Design: Problem Iceberg Probe & Panoramic Systemic Penetration

## Decision
A user-reported defect is treated as a high-signal probe of a failure pattern, not proof that every similar-looking behavior is defective. Investigation is mandatory in two directions: causal depth and structural breadth. Remediation remains bounded by explicit authorization and the task's blast radius.

## Investigation protocol
1. **Fingerprint the observed failure**: record the user's cited symptom, observed evidence, affected behavior, and known constraints without rewriting the report as a narrower issue.
2. **Vertical causal analysis**: ask why at least five times where evidence permits, tracing symptom → immediate behavior → contributing logic/contract gap → failed process/gate → governing invariant gap. If evidence runs out, mark the unanswered link as unknown rather than inventing a cause.
3. **Horizontal sibling sweep**: search for the same failure signature across related modules, lifecycle phases (Step 0–5), and mirrored governance assets. Record inspected surfaces, search strategy, matches, and non-matches.
4. **Classify findings**: (a) confirmed homologous and within approved scope; (b) plausible but unconfirmed; (c) confirmed but outside approved scope. Fix only (a); preserve evidence and ask for authorization for (c); explicitly label (b) as unresolved.
5. **Systemic defense**: select the narrowest durable defense that blocks the generalized failure class: architecture/type invariant (L1), machine-enforced assertion/test/lint (L2), or constitutional contract (L3). Add defense evidence to the verification plan.
6. **Close with evidence**: report the causal chain, sibling inventory, remediations, unresolved/out-of-scope findings, and measured verification results. Do not claim panoramic completeness beyond inspected surfaces.

## Scope boundary and compatibility
This protocol extends Axiom 54's targeted-first/systemic-second consolidation: preserve the concrete report as the anchor, then expand analysis based on its failure fingerprint. A broad search is required; broad edits are not automatically authorized. User-approved behavior, invariant-lock blocks, and unrelated modules remain unchanged unless explicitly authorized. Where the sibling set exceeds the approved blast radius, inventory and escalate rather than silently expanding the change.

## Action skills
- `pstack-openspec`: dual-gate lifecycle, causal analysis, durable defense escalation.
- `ai-harness-openspec`: governed asset synchronization and validation practices.

## Validation design
Tests should assert the general protocol and its scope boundaries, including that an unverified resemblance is not automatically treated as a defect and out-of-scope siblings are reported rather than modified. Use repository-supported strict validation and test commands; record actual exit codes. No test may pass merely because a named example token appears in the source.
