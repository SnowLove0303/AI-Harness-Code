# Proposal: Problem Task Taxonomy Boundary Definition and Post-Execution Fact-Checking Reconciliation Governance

## Why
Under Ps-openspec, Axiom 64 established the Master Problem Ledger (`[ISSUE-xx]`), 1:1 task bijectivity, four-tier deep remediation, and single-issue focus locks. However, two systemic vulnerabilities persist:
1. **Taxonomy & Boundary Ambiguity**: Agents lack explicit criteria and disambiguation heuristics to identify whether an incoming task is a Problem-Type Task (as opposed to Feature Development, Invocation, or Architecture Exploration), allowing agents to evade problem-ledger discipline when handling mixed or implicit bug reports.
2. **Post-Execution Verification Deficit**: Agents often close tasks with generic summary statements ("all issues fixed") without conducting a mandatory 1:1 post-execution reconciliation audit against the master problem ledger, leading to superficial symptom-masking or silent omissions of edge issues.

To permanently eliminate these defects, this change evolves Axiom 64 by codifying a deterministic Problem-Type Task Taxonomy & Boundary Classification Protocol and mandating a Post-Execution 1:1 Problem-to-Result Reconciliation and Empirical Fact-Checking Audit with a mechanical circuit breaker.

## What Changes
1. **Problem-Type Task Taxonomy & Boundary Classification Protocol (`PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL`)**:
   - Establish explicit input signatures (error logs, stack traces, failing tests, audit discrepancy findings, issue tickets, regression reports).
   - Enforce deterministic four-way classification (Problem Task vs. Feature Task vs. Invocation Task vs. Explore Task).
   - Require explicit task classification freezing in Step 0; any task containing defect/remediation elements is mandatorily classified as a Problem Task.
2. **Post-Execution Problem-to-Result Reconciliation Audit Protocol (`POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL`)**:
   - Mandate that Step 5 final delivery must produce a 1:1 dual reconciliation matrix matching all $K$ items in the Master Problem Ledger (`[ISSUE-01]` ~ `[ISSUE-K]`).
   - For every issue, explicitly link physical code modification anchors (`file:///path#Lxx-Lyy`) and root-cause solutions.
3. **Empirical Fact-Checking & False-Resolution Circuit Breaker (`EMPIRICAL_FACT_CHECKING_&_FALSE_RESOLUTION_CIRCUIT_BREAKER` / `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`)**:
   - Every issue in the reconciliation table must provide empirical proof (`[Measured]` Exit Code 0, red-to-green test witness, mutation robustness).
   - Ban consumer-sink superficial masking (`SINK_PATCHING_BLOCKED`).
   - If any issue lacks empirical proof or remains unresolved, trigger a fatal circuit breaker: `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`.
4. **Automated L2 Problem Reconciliation & Clearance Guard (`scripts/check-issue-clearance.mjs`)**:
   - Upgrade `scripts/check-issue-clearance.mjs` (registered as `npm run guard:issue-clearance`) to parse Gate 1 dossiers for $K$ issues and verify that both test suites and final reconciliation reports exhibit 1:1 mathematical equality ($N_{\text{audit}} \equiv K$), blocking with `PROBLEM_RECONCILIATION_OMISSION_BLOCKED` on omissions.
5. **Axiom 64 Evolution Codification across Three Mirrors**:
   - Synchronize the evolved Axiom 64 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 61) with 100% universal software engineering abstraction.
6. **Automated L2 Test Suite**:
   - Expand `tests/problem-ledger-deep-remediation.test.mjs` and adapter regressions in `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求简述 | 详细契约与验收判据 |
| :--- | :--- | :--- |
| **REQ-1** | 问题型任务确定性界定与多分类消歧规程 | 确立输入特征库与四分类消歧模型，Step 0 强制定性，命中缺陷特征者强制进入总账本切片流程。 |
| **REQ-2** | 《问题清单总账本》全量无损切片与指纹锚定继承 | 继承 Axiom 64，对 $K$ 项问题切片为 `[ISSUE-01]` ~ `[ISSUE-K]`，冻结五要素，项数绝对守恒。 |
| **REQ-3** | 任务完成结果与问题清单 1:1 双向对照审计规程 | Step 5 交付前强制出具 1:1 对照清算表，逐项锚定物理改动区间（`file:///path#Lxx-Lyy`），少一项直接否决。 |
| **REQ-4** | 经验实测凭据事实核查与伪解决硬拦截断路器 | 每一项对照核销必须具备 `[Measured]` 真实退出码 0 与红转绿凭据，伪解决触发 `PROBLEM_RECONCILIATION_DEFICIT_BLOCKED` 阻断。 |
| **REQ-5** | 自动化 L2 问题对照审计与事实核查守卫升级 | 升级 `scripts/check-issue-clearance.mjs` 具备对账与核查双重校验，少于 $K$ 项抛出 `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`。 |
| **REQ-6** | 最高宪法公理 64 升级立法与三镜像同构固化 | 固化升级条款至三镜像，保持 100% 纯通用工程抽象与测试全绿。 |
