# Change Proposal: Problem Iceberg Probe & Panoramic Systemic Penetration Governance

## Why
In engineering management and multi-agent systems, agents frequently fall into the trap of "localized whack-a-mole" or applying superficial bandages: when the user points out a specific failure or defect, the agent naively assumes the issue is an isolated incident restricted to the single cited location.

As articulated in the Iceberg Principle: when a user points out a single specific issue, it signifies that the problem is far deeper than the surface manifestation and extends far beyond that single location. The cited defect is an explicit alarm probe revealing broader architectural blind spots and unhandled systemic failure categories.

This change formally introduces Axiom 59: Problem Iceberg Probe & Panoramic Systemic Penetration Axiom (`PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM`) to mandate vertical 5-Whys depth penetration and horizontal sibling sweeps across the system whenever a specific issue is identified.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），本变更匹配并采用以下执行技能：
- **`pstack-openspec`** — `C:\Users\Administrator\.gemini\config\skills\pstack-openspec\SKILL.md`；适用于双门禁、5-Whys 根因分析、系统性防线下沉与 OpenSpec 生命周期治理。
- **`ai-harness-openspec`** — `C:\Users\Administrator\.gemini\config\skills\ai-harness-openspec\SKILL.md`；补充 AI-Harness/OpenSpec 资产与门禁落地要求。

## What Changes
1. **Constitutional Axiom 59 Legislation**: Formally legislate Axiom 59 in the repository-owned `GEMINI.md` and `skills/ai-harness-openspec/SKILL.md`. The `pstack-openspec` skill is installed in global configuration and is not a repository-owned target; record it as a discovered synchronization boundary, without editing global configuration or inventing a repo mirror.
2. **Explicit Issue as Tip of Iceberg Rule**: Treat any user-cited defect as a probe of a broader failure mode.
3. **Vertical Depth 5-Whys Penetration Protocol**: Require causal tracing from symptom to structural root cause, with unknown evidence links explicitly identified.
4. **Horizontal Sibling Sweep Protocol**: Search modules, lifecycle stages, and governance mirrors, inventory findings, and remediate confirmed in-scope siblings; report out-of-scope findings for separate authorization.
5. **Systemic Hardening Gate**: Encode resolved failure patterns in durable architecture constraints, automated assertions/tests, or constitutional invariants, consistent with Axiom 54's targeted-first phase gate.
6. **Automated L2 Test Suite**: Add generalized regression assertions to the existing `scripts/tests/gemini-adapter.test.mjs`, covering the repo-owned invariants, scope boundary, and discovered mirror boundary.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | A specifically reported issue is a signal, not an isolated exception | Explicit Issue as Tip of Iceberg Axiom | regression tests for probe classification and scope analysis |
| **REQ-02** | The cause may be deeper than the cited symptom | Vertical Depth 5-Whys Penetration Protocol | tests for documented causal chain and structural root |
| **REQ-03** | The issue may exist beyond the cited location | Horizontal Sibling Sweep Protocol | tests for sibling inventory and bounded remediation |
| **REQ-04** | The failure category should be prevented from recurring | Systemic Hardening Gate | tests/assertions for durable defense |
| **REQ-05** | Generalize the rule constitutionally without scenario-specific leakage | Axiom 59 and Domain Neutrality | tests for mirror consistency and neutral terminology |
