# Change Proposal: Problem-Task Zero-Simplification Dual-Gate, Active Non-Mechanical Verification & Anti-Recurrence Immunity (Axiom 75)

## Why
While Axiom 64 introduced Problem Ledgers (`[ISSUE-01]..[ISSUE-K]`), three operational gaps remain in problem-remediation tasks: (1) agents can simplify, condense, or silently drop issue details when transitioning across Gate 1 and Gate 2; (2) post-fix verification still allows agents to over-rely on self-authored mechanical audits instead of actively inspecting the real final output; and (3) fixes often lack structural anti-recurrence safeguards to prevent the same problem from returning in subsequent edits. Strengthening `scripts/check-issue-clearance.mjs` and codifying **Axiom 75** closes all three gaps with pure universal software engineering abstractions.

## What Changes
1. **REQ-1 (Strict Atomic Problem Logging)**: Every reported defect/issue must be logged atomically (`[ISSUE-01]..[ISSUE-K]`) with original text, anchor, and acceptance criteria.
2. **REQ-2 (Zero-Simplification & Zero-Omission Dual-Gate Conservation)**: Enforce strict 1:1 conservation and anti-simplification fidelity between Gate 1 issue entries and Gate 2 proposal/task items (`ISSUE_GATE_SIMPLIFICATION_BLOCKED`).
3. **REQ-3 (Mandatory Active Non-Mechanical Problem Verification)**: Prohibit closing any `[ISSUE-xx]` solely on mechanical audit pass; require active direct observation of the final real output (`ISSUE_ACTIVE_VERIFICATION_MISSING_BLOCKED`).
4. **REQ-4 (Root-Cause Anti-Recurrence Immunity)**: Require evaluating future recurrence risk and binding each resolved issue to a structural anti-recurrence defense (`L1_TYPE`, `L2_GUARD`, `GRAPH_HOTSPOT`, or `ALL_SITES_SWEEP`) (`ISSUE_ANTI_RECURRENCE_MISSING_BLOCKED`).
5. **REQ-5 (Axiom 75 Three-Mirror Codification & GitHub-First Benchmarking Mandate)**: Codify Axiom 75 (`PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM`) identically across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (Invariant 72), AND enforce `GITHUB_FIRST_BENCHMARKING_MANDATE` requiring any future Ps-openspec system optimization to benchmark top GitHub open-source agent engineering practices (e.g., OpenHands anti-oscillation, SWE-agent reproduction, `@poteto` Pstack) before Step 2 legislation.
6. **PROP-C (Semantic Fidelity Check)**: Detect ellipsis truncation or severe length/keyword shrinkage between Gate 1 and Gate 2 issue definitions.
7. **PROP-D (Four-Tier Structural Defense Classification & Anti-Oscillation Full Suite)**: Enforce structured defense taxonomy (`L1`, `L2`, `Graph`, `All-Sites`) and full-suite regression against OpenHands-style oscillation traps.
8. **PROP-E (Graph-Coupled Recall Before Fix)**: Require checking `.harness/project-graph.json` historical hotspots/guards on target modules prior to remediation.

## 1:1 Spec-Kit RTM Traceability Matrix
| RTM ID | Requirement Summary | Specification Requirement |
| :--- | :--- | :--- |
| REQ-1 | Strict Atomic Problem Logging | `STRICT_ATOMIC_PROBLEM_LOGGING_MANDATE` |
| REQ-2 | Zero-Simplification Dual-Gate Conservation | `DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION` |
| REQ-3 | Mandatory Active Non-Mechanical Verification | `ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION` |
| REQ-4 | Root-Cause Anti-Recurrence Immunity | `ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL` |
| REQ-5 | Axiom 75 Three-Mirror Codification | `AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD` |
| PROP-C | Semantic Fidelity Anti-Shrinkage Check | `ISSUE_SEMANTIC_FIDELITY_PRESERVATION_GUARD` |
| PROP-D | Four-Tier Structural Defense Taxonomy | `FOUR_TIER_ANTI_RECURRENCE_TAXONOMY` |
| PROP-E | Graph-Coupled Pre-Fix Hotspot Recall | `GRAPH_COUPLED_PRE_FIX_RECALL_STANDARD` |
