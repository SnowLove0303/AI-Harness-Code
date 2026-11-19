# 【Ps-openspec 规格立法与双清单门禁备忘录 (Gate 2 Dossier)】
## 跨设备多用户通用性、数据库迁移韧性与用户/默认数据正交隔离体系 (Axiom 67)

- **立法时间**: 2026-11-19T16:54:00+08:00
- **变更代号 (Change Slug)**: `universal-portability-and-data-segregation`
- **生命周期阶段**: Step 2: Ps-openspec Specification Authoring & Gate 2 Statutory Authorization
- **法定公理编号**: Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`)
- **OpenSpec 校验状态**: `npx openspec validate universal-portability-and-data-segregation --strict` (VALID / EXIT CODE 0)

---

## 板块一：OpenSpec 增量规格资产法定全景 (OpenSpec Living Assets)

### 1. 提案说明 (`proposal.md`)
- 位于 [proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/universal-portability-and-data-segregation/proposal.md)。
- 彻底穿透单机偏狭硬编码（`C:\Users\...`）、数据库冷启动崩溃与用户/默认数据混淆覆盖三大工程痛点。
- 确立 1:1 Spec-Kit RTM（REQ-1 至 REQ-6），数量严格守恒，无任何损耗。

### 2. 契约增量 (`specs/orbitstack-pstack-routing/spec.md`)
- 位于 [spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/universal-portability-and-data-segregation/specs/orbitstack-pstack-routing/spec.md)。
- 增补 6 大 RFC 2119 行为契约：
  1. `Requirement: Cross-Device Portability and Host Decoupling Standard` (阻断 `HARDCODED_HOST_ENVIRONMENT_BLOCKED`)
  2. `Requirement: Database Migration Resilience and Auto-Bootstrap Standard` (阻断 `DATABASE_UNMANAGED_BOOTSTRAP_BLOCKED`)
  3. `Requirement: User Data and Default Data Orthogonal Segregation Standard` (阻断 `STATE_SEGREGATION_VIOLATION_BLOCKED`)
  4. `Requirement: Portable Data Export, Backup, and Restore Standard` (阻断 `PORTABLE_EXPORT_CONTAMINATION_BLOCKED`)
  5. `Requirement: Automated L2 Universal Portability Guard Standard` (`scripts/check-universal-portability.mjs` / `npm run guard:portability`)
  6. `Requirement: Axiom 67 Universal Portability and Data Segregation Constitutional Legislation` (三镜像同构固化与纯通用软件抽象)

### 3. 架构设计 (`design.md`)
- 位于 [design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/universal-portability-and-data-segregation/design.md)。
- 深度融合 Lauren Tan 核心设计原则：
  - `principle-boundary-discipline`: 路径与环境在系统绝对物理边界解析；
  - `principle-separate-before-serializing-shared-state`: 默认数据（只读基准层）与用户数据（可变覆盖层）物理正交；
  - `principle-make-operations-idempotent`: 数据库父目录递归自愈创建、DDL 声明式执行与迁移版本跟踪全流程幂等。

### 4. 任务编排 (`tasks.md`)
- 位于 [tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/universal-portability-and-data-segregation/tasks.md)。
- 严格遵循 `[-]` 单焦点执行锁，逐项推进、全绿实测推进。

---

## 板块二：法定双清单因果自证 (Statutory Dual Checklists)

### 清单一：拟变范围清单 (Proposed Modification Scope Checklist)

| 变更目标文件 | 因果角色 | 拟变动核心逻辑说明 |
| :--- | :--- | :--- |
| `GEMINI.md` | `[Root Source]` | 增补 Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`)，确立跨设备便携性、数据库自愈迁移与用户/默认数据正交隔离法定准则。 |
| `skills/pstack-openspec/SKILL.md` | `[Root Source]` | 同步固化 Axiom 67，保持与总纲 100% 语义同构。 |
| `skills/ai-harness-openspec/SKILL.md` | `[Root Source]` | 在承重墙体系增补第 64 项：Axiom 67 通用便携性与数据隔离公理。 |
| `worker.md` | `[State Transition]` | 注入通用便携性、数据库冷启动自愈与正交数据隔离行为约束，指导 Agent 日常编码。 |
| `scripts/check-universal-portability.mjs` | `[L2 Guard Engine]` | 新建静态守卫脚本：扫描单机物理绝对路径、裸数据库存储连接与数据混淆反模式；提供变异杀伤力测试。 |
| `package.json` | `[Configuration Hook]` | 注册 `"guard:portability": "node scripts/check-universal-portability.mjs"` 机械守卫。 |
| `tests/universal-portability.test.mjs` | `[Verification Test]` | 新建 L2 自动化测试套件：验证路径解耦、数据库自愈冷启动、正交隔离与守卫阻断退出码。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Regression Test]` | 扩充测试用例：断言 Axiom 67 在三份宪法镜像中 100% 存在且语义一致。 |
| `scripts/sync-to-global.mjs` | `[Sync Infrastructure]` | 将 `check-universal-portability.mjs` 纳入全局同步分发清单。 |

### 清单二：保持现状承诺清单 (Preserved Invariants & Invariant Locks)

| 保护目标对象 | 保护原因与现存状态 | 承诺执行动作 |
| :--- | :--- | :--- |
| `Axiom 01 ~ 66` 全体既有公理 | 已经过严格验证与发布的既有法定宪法底座。 | **100% 保持现状**，严禁篡改、重排或弱化任何既有公理条目。 |
| `@ANTIGRAVITY_INVARIANT_LOCK` 封印代码块 | 核心防篡改保护块。 | **100% 绝对只读豁免**，未经指令严禁触碰。 |
| 现有 5 项守卫工具链 (`guard:neutrality`, `guard:unslop`, `guard:workflow-spec`, `guard:invocation-purity`, `guard:issue-clearance`) | 已交付的机械确定性门禁。 | **100% 保持稳定运行**，本轮变更不得引发任何既有守卫报警。 |
| `openspec/changes/archive/` 历史归档 | 历史变更事实指纹。 | **只读锁定**，绝不修改历史归档内容。 |

---

## 板块三：Step 3 施工路线图与单焦点执行锁 (Single-Focus Lock Roadmap)

在获得用户批准后，系统将严格以单任务专注锁 `[-]` 推进以下原子步骤：

1. `[-] Task 1`: 在 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md` 固化 Axiom 67；
2. `[-] Task 2`: 编写 `scripts/check-universal-portability.mjs` 并注册 `guard:portability` 到 `package.json`；
3. `[-] Task 3`: 更新 `worker.md` 规范与 `scripts/sync-to-global.mjs`；
4. `[-] Task 4`: 编写 `tests/universal-portability.test.mjs` 与扩充 `scripts/tests/gemini-adapter.test.mjs` 断言；
5. `[-] Task 5`: 执行 VS Code 原生差异检阅 (`code --reuse-window --diff`)；
6. `[-] Task 6`: 运行全量 6 重静态守卫与 3 组自动化测试，确保 100% 退出码 0；
7. `[-] Task 7`: 合流归档并出具 Step 5 1:1 RTM 物理核销清算表。

---

## 板块四：法定门禁物理禁令与等待指令确认 (Gate 2 Human Authorization)

> 🛑 **【门禁 2 物理禁令自查与遵守承诺】**：
> 1. 当前所有 OpenSpec 增量规格文件已编译完成并通过 `npx openspec validate --strict` 校验；
> 2. **本智能体尚未修改、创建任何生产业务代码、工具脚本或宪法文件**；
> 3. 严格等待管理者发出明确确认指令（如“批准动工”、“执行”或“同意”）后，方可启动 Step 3 施工。
