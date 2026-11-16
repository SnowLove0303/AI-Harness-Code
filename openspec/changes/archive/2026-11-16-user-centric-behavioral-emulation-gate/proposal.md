# Change Proposal: User-Centric Behavioral Emulation & Interaction Reproduction Gate Governance

## Why
In current multi-agent and software development paradigms, Agents suffer from a critical cognitive blind spot: treating "syntactic and code-level logic validity" as equivalent to "functional correctness in real human-agent interaction." 

When a user reports that a UI feature, button, or workflow fails or produces unexpected behavior, Agents habitually evaluate the issue purely through static source inspection (e.g., verifying `onClick` handlers, state declarations, or mock unit tests). Consequently, Agents declare that "the code logic is flawless" while the actual interactive experience remains broken due to unhandled pointer occlusion, disabled component states, asynchronous race conditions, or DOM rendering disconnects.

Furthermore, traditional end-to-end browser testing can be intrusive and disrupt the user's desktop workflow. Therefore, a headless, low-friction, in-memory behavioral emulation gate is required. This gate must not replace existing unit tests, linters, or compiler checks, but rather serve as an indispensable, parallel hard blocker.

This change formally introduces **Axiom 60: User-Centric Behavioral Emulation & Interaction Reproduction Gate Axiom (`USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM`)** to guarantee that interactive defects are reproduced via user behavioral emulation prior to implementation, verified against human-observable outcomes, and enforced via multi-tiered verification gates.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），本变更在 Step 0 / Step 1 阶段对执行层技能库进行前置扫描与深度匹配：
- **匹配结果**：
  - `pstack-openspec` (`C:\Users\Administrator\.gemini\config\skills\pstack-openspec\SKILL.md`)：统领五层信任金字塔、双门禁与测试见证者规程。
  - `ai-harness-openspec` (`C:\Users\Administrator\.gemini\config\skills\ai-harness-openspec\SKILL.md`)：统领全流程工业级 Vibe Coding 闭环与承重墙锁定。
  - `ui-ux-design-engineering` (`C:\Users\Administrator\.gemini\config\skills\ui-ux-design-engineering\SKILL.md`)：提供前端交互人体工程学、WCAG 可达性与 Anti-AI-Slop 界面工程硬防线。

## What Changes
1. **Constitutional Axiom 60 Legislation**: Formally legislate Axiom 60 (`USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM`) across `GEMINI.md` and `skills/ai-harness-openspec/SKILL.md`.
2. **User-Centric Behavioral Paradigm Rule**: Mandate that user-visible interaction defects are evaluated from the user's observational and behavioral vantage point rather than internal code implementation details (`USER_OBSERVATIONAL_VANTAGE_RULE`).
3. **Behavioral Emulation Pre-Repair Reproduction Protocol**: Require that prior to modifying business code for an interactive defect, the Agent must formulate a minimal headless behavioral emulation reproducing the failure (`BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL`).
4. **Headless In-Memory Low-Friction Execution Standard**: Ensure interaction emulation runs headlessly in memory (using AST query inspection and event cascade simulation) in milliseconds without visual disruption (`HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD`).
5. **Parallel Multi-Tiered Verification Gate Invariant**: Enforce that behavioral emulation acts as an additive, non-substitutive hard gate alongside existing compiler, linter, and unit test checkpoints (`MULTI_TIERED_COEXISTENT_VERIFICATION_GATE`).
6. **Automated L2 Test Suite**: Implement `tests/user-centric-behavioral-emulation-gate.test.mjs` verifying the new invariants and zero scenario-token leakage.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | Evaluate issues from user interaction perspective | Requirement: User-Centric Behavioral Paradigm Axiom | `tests/user-centric-behavioral-emulation-gate.test.mjs` (Test 1 & 4) |
| **REQ-02** | Mandatory interaction reproduction prior to code modification | Requirement: Behavioral Emulation Pre-Repair Reproduction Protocol | `tests/user-centric-behavioral-emulation-gate.test.mjs` (Test 2 & 5) |
| **REQ-03** | Low friction, headless/static, zero disruption to user workflow | Requirement: Headless In-Memory Zero-Intrusion Standard | `tests/user-centric-behavioral-emulation-gate.test.mjs` (Test 3) |
| **REQ-04** | Additive mandatory gate rather than sole/exclusive checkpoint | Requirement: Parallel Multi-Tiered Verification Gate Invariant | `tests/user-centric-behavioral-emulation-gate.test.mjs` (Test 4 & 6) |
| **REQ-05** | Constitutional codification & domain neutrality (Axiom 60) | Requirement: Axiom 60 Constitutional Legislation and Domain Neutrality | `tests/user-centric-behavioral-emulation-gate.test.mjs` (Test 1, 2, 7, 8) |
