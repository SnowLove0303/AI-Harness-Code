# Proposal: Called Program Immutability and Invocation Purity Governance

## Why
When agents are tasked with executing workflows or calling existing programs, pipelines, CLIs, or services, they frequently suffer from a severe regression hazard: upon encountering runtime errors or friction, agents modify the underlying program's functional code rather than adjusting invocation arguments or caller datasets. This task-expediency hacking compromises shared system infrastructure. To guarantee architectural integrity, Ps-openspec requires strict binary classification of invocation tasks, mandatory read-only locks on called engines, caller-plane rectification mandates, and automated invocation purity guards.

## What Changes
1. **Axiom 66 Legislation**: Codify `CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM` across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md`.
2. **Invocation Task Classification & Engine Read-Only Lock (`INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK`)**: Enforce read-only locks on underlying programs during invocation tasks.
3. **Anti-Expediency Mutation & Caller Adaptation Mandate (`ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE`)**: Restrict debugging and rectification strictly to caller datasets and invocation arguments.
4. **Upstream Defect Isolation & Escalation Protocol (`UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL`)**: Mandate forensic incident logging and pause for genuine upstream engine defects.
5. **Gate 2 Caller Scope Physical Fence (`GATE2_CALLER_SCOPE_PHYSICAL_FENCE`)**: Ban called program files from Gate 2 writable scopes.
6. **Automated L2 Invocation Purity Guard (`scripts/check-invocation-purity.mjs`)**: Provide mechanical clearance scanner registered as `npm run guard:invocation-purity`.
7. **Automated L2 Test Suite**: Implement `tests/called-program-immutability.test.mjs` and adapter regressions.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求简述 | 详细契约与验收判据 |
| :--- | :--- | :--- |
| **REQ-1** | 调用型任务二分判定与被调用程序只读锁硬阻断规程 | 纯调用任务下被调用程序强制只读，写操作触发 `UNAUTHORIZED_ENGINE_TAMPERING_BLOCKED`。 |
| **REQ-2** | 严禁为单次任务权宜篡改底座与消费端适配优先公理 | 错误排查严格收敛于调用端平面，严禁在被调用程序内为单次任务做特判硬编码或防御性降级。 |
| **REQ-3** | 底层真缺陷隔离与双轨工单停等升级规程 | 程序真 Bug 记录 `[Incident: Upstream Engine Defect]` 存证停等，严禁调用任务内私改代码。 |
| **REQ-4** | 门禁 2 拟变范围白名单与调用端物理围栏硬拦截 | 调用型任务可写路径严禁包含引擎/被调用文件，违者触发 `ENGINE_FILE_IN_CALLER_SCOPE_BLOCKED` 阻断。 |
| **REQ-5** | 自动化 L2 调用纯净度守卫工具链 | `scripts/check-invocation-purity.mjs` 静态守卫命令，违规 Exit Code 1 阻断。 |
| **REQ-6** | 最高宪法公理 66 立法与三镜像同构固化 | 固化 Axiom 66 至三镜像，保持 100% 纯通用工程抽象与同构。 |
