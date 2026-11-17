# Change Proposal: Mature Application Reverse Engineering & Deep Deconstruction System Governance

## Why
When developing complex modern software applications (such as collaborative block-based document editors, rich canvas suites, or full-stack productivity platforms), software engineering teams and AI agents frequently reinvent the wheel, overlook critical edge cases in interaction states, or fail to architect resilient data structures. Mature production applications already represent years of battle-tested edge case handling, event cascade tuning, and state machine design.

However, existing agent tooling either limits itself to flat UI screenshot copying (which misses underlying data models, selection states, and transaction flows) or fragmented static source inspection. A holistic, industrial-grade **Reverse Engineering & Deep Deconstruction System** is required—one that bridges black-box behavioral inspection (dynamic DOM, event cascades, network protocols) with white-box architectural models (AST block trees, Transaction step engines, CRDT collaboration layers) and delivers standardized clean-room design specifications (`DECONSTRUCT_SPEC.md`).

This change formally introduces **Axiom 62: Mature Application Reverse Engineering & Deep Deconstruction Axiom (`MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM`)** and establishes the `app-reverse-deconstruction` action skill within the Ps-openspec action layer (`skills/`), fully integrated with REA MCP tools and clean-room engineering workflows.

## Action Skill Match Declaration
依据公理 57（`ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM`），本变更在 Step 0 / Step 1 阶段对执行层技能库进行前置扫描与深度匹配：
- **匹配结果**：
  - `rea-reverse-engineering` (`skills/rea-reverse-engineering/SKILL.md`)：提供底层二进制反编译、Electron/JS 源码还原、ASAR 解包与 Evidence 证据链支持。
  - `ui-ux-design-engineering` (`skills/ui-ux-design-engineering/SKILL.md`)：提供前端交互规范、Design Tokens 体系与微交互人体工程学。
  - `pstack-openspec` (`skills/pstack-openspec/SKILL.md`)：统领五层信任金字塔、双门禁与不可变证据链闭环。

## What Changes
1. **Constitutional Axiom 62 Legislation**: Formally legislate Axiom 62 (`MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM`) across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Dual-Track Deconstruction Engine Standard**: Mandate a dual-track deconstruction methodology combining dynamic black-box behavioral tracing (event cascades, DOM mutation trees, network protocol deltas) with static white-box architectural modeling (AST block schemas, transaction statecharts, CRDT data models) (`DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD`).
3. **Complex Document Application Deconstruction Benchmark**: Formally codify the deconstruction benchmark for document applications, mandating complete extraction of: Block Spec hierarchy, Selection/Range models, Transaction/Step statecharts, Slash menu/shortcut registries, and collaboration delta protocols (`DOCUMENT_APP_DECONSTRUCTION_BENCHMARK`).
4. **Action Skill Layer Crystallization (`skills/app-reverse-deconstruction/SKILL.md`)**: Package the complete reverse deconstruction methodology into a standalone, standardized Ps-openspec action skill with SOP and MCP mapping.
5. **Clean-Room Specification & Immutable Evidence Gate**: Enforce that all deconstruction workflows output standardized `DECONSTRUCT_SPEC.md` and tamper-evident Evidence graphs prior to clean-room implementation (`CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE`).
6. **Automated L2 Test Suite & Mirror Alignment**: Implement `tests/mature-app-reverse-deconstruction-system.test.mjs` verifying all invariants, accompanied by regression assertions in `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| Req ID | User Requirement & Scenario | Specification Requirement | Verification Target |
| :--- | :--- | :--- | :--- |
| **REQ-01** | Dual-track deconstruction combining black-box behavior with white-box architecture | Dual-Track Deconstruction Engine Standard | `tests/mature-app-reverse-deconstruction-system.test.mjs` (Test 1 & 4) |
| **REQ-02** | Deep deconstruction of mature document applications (blocks, transactions, shortcuts) | Document Application Deconstruction Benchmark | `tests/mature-app-reverse-deconstruction-system.test.mjs` (Test 2 & 5) |
| **REQ-03** | Seamlessly integrate into Ps-openspec action skill layer for on-demand Agent invocation | Action Skill Layer Crystallization (`app-reverse-deconstruction`) | `tests/mature-app-reverse-deconstruction-system.test.mjs` (Test 3 & 6) |
| **REQ-04** | Output standardized Clean-Room specification and immutable evidence chain | Clean-Room Specification & Immutable Evidence Gate | `tests/mature-app-reverse-deconstruction-system.test.mjs` (Test 4 & 7) |
| **REQ-05** | Constitutional codification & domain neutrality (Axiom 62) | Axiom 62 Constitutional Legislation and Domain Neutrality | `tests/mature-app-reverse-deconstruction-system.test.mjs` (Test 1, 2, 8, 9) |
