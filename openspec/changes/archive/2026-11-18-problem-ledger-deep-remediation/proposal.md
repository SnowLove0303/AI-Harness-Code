# Proposal: Problem Ledger Ingestion and Zero-Omission Deep Remediation Governance

## Why
When an agent is requested to resolve defects from an audit problem Markdown document, it frequently suffers from superficial symptom patching (adding fallback checks at consumer sinks) and silent problem leakage (resolving only issues 1 and 2 while dropping 3 and 4). To ensure all confirmed issues are deeply and demonstrably resolved, the Ps-openspec system requires a dedicated problem ledger ingestion protocol, strict issue-to-task bijectivity, a four-tier deep remediation ladder, and a mechanical zero-omission circuit breaker.

## What Changes
1. **Axiom 64 Legislation**: Codify `PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM` across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Master Problem Ledger Ingestion Protocol (`MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL`)**: Atomize issues from external problem documents into discrete `[ISSUE-01]` ~ `[ISSUE-K]` entries in Gate 1.
3. **Issue-to-Task Bijective Invariant (`ISSUE_TO_TASK_BIJECTIVE_INVARIANT`)**: Mandate 1:1 mapping between issues and atomic task blocks in `tasks.md`, banning bundled tasks (`BUNDLED_ISSUE_TASK_FORBIDDEN`).
4. **Four-Tier Deep Remediation Ladder (`FOUR_TIER_DEEP_REMEDIATION_LADDER`)**: Enforce Red Witness (Tier 1) -> Origin Tracing (Tier 2) -> Structural Immunity (Tier 3) -> All-Sites Sweep (Tier 4).
5. **Single-Issue Focus Lock Standard (`SINGLE_ISSUE_FOCUS_LOCK_STANDARD`)**: Enforce sequential issue execution under single-focus lock `[-]` to prevent attention decay.
6. **Zero-Omission Problem Circuit Breaker (`ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER`)**: Implement `scripts/check-issue-clearance.mjs` registered as `guard:issue-clearance` exiting 1 on missing proofs.
7. **Automated L2 Test Suite**: Implement `tests/problem-ledger-deep-remediation.test.mjs` and adapter regressions.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求简述 | 详细契约与验收判据 |
| :--- | :--- | :--- |
| **REQ-1** | 问题型任务判定与《问题清单总账本》全量切片规程 | Step 0 自动将外部问题文档切片为 `[ISSUE-01]` ~ `[ISSUE-K]` 独立条目，保持 $N_{\text{Ledger}} \equiv K$ 守恒。 |
| **REQ-2** | 问题与原子任务 1:1 双射法定公理与严禁任务打包门禁 | `tasks.md` 强制一题一任务块，严禁多 Issue 打包合并（`BUNDLED_ISSUE_TASK_FORBIDDEN`）。 |
| **REQ-3** | 四阶深度根治阶梯规程 | 每个 Issue 必须经历：见证红灯 ➔ 源头根治 ➔ 结构免疫 ➔ 全景同源清算，严禁消费端兜底。 |
| **REQ-4** | 单问题串行专注锁与子智能体派发规程 | 单任务专注锁 `[-]` 按单 Issue 严格串行加锁解锁，防注意力衰减与提前满足。 |
| **REQ-5** | 零遗漏机械清算断路器与终审绝对守恒门禁 | `scripts/check-issue-clearance.mjs` 机械核验实测证据数，少一项直接 Exit Code 1 阻断。 |
| **REQ-6** | 最高宪法公理 64 立法与全镜像同构固化 | 固化 Axiom 64 至三镜像，保持 100% 纯通用工程抽象与同构。 |
