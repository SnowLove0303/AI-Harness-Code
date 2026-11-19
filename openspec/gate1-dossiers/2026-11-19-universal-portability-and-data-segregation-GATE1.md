# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 跨设备多用户通用性、数据库迁移韧性与用户/默认数据正交隔离体系 (Axiom 67)

- **立案时间**: 2026-11-19T16:48:00+08:00
- **需求事实指纹 (Fact Fingerprint)**: `2ece54c4f95c0606be89feebaa0b70e6e0a8f94a85ff0f839fbf526b9f0170e3`
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **关联总纲与宪法**: Ps-openspec (Lauren Tan 信任金字塔 & 边界纪律) / Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`)

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

> 遵循 `RAW_INSTRUCTION_VERBATIM_MIRROR_AXIOM`，100% 逐字保留管理者指令全文，严禁任何形式的摘要、裁剪或语义稀释：

```text
关于系统也好，网页也好以及工作流也好，所有开发、源码改动等都要充分考虑到 通用性问题，比如可能其他设备或用户也会使用这个程序，以及需要充分考虑数据库的问题，一个是没弄好的话，设备迁移可能会导致数据库或相关功能无法使用，另一个是要区分用户数据和默认数据等等，这些开发需要考虑的问题，我希望你去github找个关于通用性开发相关的工具、思想或skill等等，要充分考虑到开发需要注意的所有问题，也可以看看poteto有没有对应说法等等，要融入Ps-openspec 的体系中
```

- **字符数**: 208 字符
- **SHA-256 校验码**: `2ece54c4f95c0606be89feebaa0b70e6e0a8f94a85ff0f839fbf526b9f0170e3`

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. 核心诉求法医级根因与背景穿透 (Problem Statement & Deep Intent Analysis)

在日常软件工程、Web 应用、脚本与 Agent 工作流开发中，开发者与智能体极易滋生**单机偏狭与数据混淆（Host-Centric Myopia & State Entanglement）**的严重系统坏味道：
1. **单机环境硬编码（Hardcoded Host Dependencies）**：在源码或配置中直接写死当前开发机的物理绝对路径（如硬编码 `C:\Users\Administrator\...` 或特定用户名路径）、固定端口或专属机器假设，导致代码迁移至其他设备、其他操作系统（Windows/Linux/macOS）或其他用户时直接暴毙；
2. **数据库冷启动与迁移脆弱（Fragile Database Bootstrapping）**：数据库存储路径缺乏动态环境解析，父级目录未做自愈创建，表结构缺乏声明式版本化迁移与幂等初始化；导致新设备部署或数据迁移后，因路径失效、表缺失或版本不兼容引发不可用；
3. **用户数据与默认系统数据混淆缠绕（User Data & Default Data Entanglement）**：将随系统分发的默认数据（系统预设、初始模板、内置字典、标准规则、初始化 Seed）与用户在运行时生成/编辑的可变数据（用户业务实例、个性化配置、历史日志、自定义模板）存放在同一个表、同一份文件或同一层结构中。其致命后果是：
   - 系统版本迭代升级或更新默认模板时，极易覆盖或冲掉用户已录入的数据；
   - 用户试图重置或备份数据时，无法纯净导出用户自身资产，或重置操作误杀底层系统默认底座。

为彻底根治上述顽疾，必须融合业界高星通用架构设计模式（Twelve-Factor App、Portable Architecture、Local-First 架构）与 Lauren Tan（@poteto）核心工程准则（`principle-boundary-discipline`、`principle-separate-before-serializing-shared-state`、`principle-make-operations-idempotent`），将**通用便携性、数据库自愈迁移韧性与默认/用户数据正交隔离**固化为 Ps-openspec 的最高法定公理 67。

---

### 2. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **跨设备多环境通用性与宿主环境解耦规程**<br>(`CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD`) | **GIVEN** 程序、Web 应用或工作流在任一开发机中编写或重构；<br>**WHEN** 代码在其他设备、不同操作系统或不同用户账号下运行时；<br>**THEN** 系统 SHALL 100% 采用相对路径或标准化环境变量解析（如 `process.cwd()`、`DATA_DIR`、`APPDATA`、`XDG_DATA_HOME`）；严禁在源码或配置文件中硬编码单机物理绝对路径（如个人用户名目录、固定本地磁盘符）；确保跨机部署零摩擦就绪。 | 1. 源码与配置中单机物理绝对路径命中数为 0；<br>2. 路径解析统一收敛至系统边界配置模块；<br>3. 在全新设备空目录下冷启动能够自适应运行。 |
| **REQ-2** | **数据库迁移韧性与自愈初始化规程**<br>(`DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD`) | **GIVEN** 系统启动时连接或初始化数据库（SQLite、嵌入式或关系型存储）；<br>**WHEN** 宿主环境为全新部署、迁移后设备或存储目录尚未创建时；<br>**THEN** 系统 SHALL 自动执行幂等自愈初始化（Auto-Bootstrap）：自动递归创建数据目录、自动探测数据库文件、按序执行声明式版本化迁移（Versioned Migrations）；即使从旧机迁入旧版本数据库，亦能平滑自动升级且不丢失既有数据。 | 1. 数据库存储路径动态可配且支持相对路径；<br>2. 首次启动在空目录下自动创建目录与表结构，退出码 0；<br>3. 迁移执行具备幂等性，重复执行零报错。 |
| **REQ-3** | **用户数据与默认系统数据/预设物理正交隔离规程**<br>(`USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD`) | **GIVEN** 软件系统定义了业务预设、初始模板、系统字典与用户运行数据；<br>**WHEN** 系统处理读写、存储、更新或重置操作时；<br>**THEN** 系统 SHALL 实施严格的两层正交物理隔离：<br>① **只读基线层 (Default/System Data)**：随代码包发布的默认数据与模板享有只读保护，版本更新整包替换；<br>② **用户可变层 (Mutable User Data)**：用户输入、业务记录与自定义覆盖层独立存储于专属用户数据区；<br>系统更新时 100% 不破坏用户数据，用户重置时 100% 不破坏系统预设底座。 | 1. 默认数据与用户数据物理存储或键空间物理正交；<br>2. 模拟系统升级（替换默认文件）后用户记录 100% 完好；<br>3. 模拟重置用户数据后默认模板与系统状态不受影响。 |
| **REQ-4** | **跨设备数据便携导出、备份与无损迁移规程**<br>(`PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD`) | **GIVEN** 用户需要将当前程序迁移至另一台计算机或备份当前实例；<br>**WHEN** 触发数据导出、备份或跨机导入流程时；<br>**THEN** 系统 SHALL 提供结构化便携格式（如规范 JSON、SQL dump 或独立数据归档包），仅导出纯粹的用户可变数据，剔除单机环境专属元数据与默认只读数据；在新设备上导入时能无缝恢复全部业务状态。 | 1. 导出产物中 0 包含单机物理路径与机器特定标识；<br>2. 导出文件可在全新异构设备上 100% 还原业务数据；<br>3. 导出/导入流程具备数据完整性校验。 |
| **REQ-5** | **自动化 L2 通用性与环境解耦静态守卫工具链**<br>(`AUTOMATED_L2_PORTABILITY_GUARD_STANDARD`) | **GIVEN** 系统构建、CI 流水线或执行 `npm run guard:portability` 时；<br>**WHEN** 静态守卫脚本扫描全工程源码、工作流与配置资产时；<br>**THEN** 守卫脚本 SHALL 机械检测是否存在单机硬编码绝对路径、裸数据库存储连接及数据混淆反模式；若发现违规直接输出 Exit Code 1 阻断发布并抛出 `HARDCODED_HOST_ENVIRONMENT_BLOCKED` 错误；变异注入绝对路径时稳定红灯。 | 1. 新增 `scripts/check-universal-portability.mjs` 守卫；<br>2. 在 `package.json` 注册 `guard:portability` 命令；<br>3. 静态扫描与变异测试杀伤力双向实测 Exit Code 0。 |
| **REQ-6** | **最高宪法公理 67 立法与三镜像同构固化**<br>(`AXIOM_67_UNIVERSAL_PORTABILITY_CONSTITUTIONAL_LEGISLATION`) | **GIVEN** 完成上述通用性与数据隔离标准规程制定；<br>**WHEN** 固化至系统核心宪法与规约时；<br>**THEN** 智能体 SHALL 将跨设备通用性、数据库自愈迁移韧性与数据正交隔离作为 Axiom 67，同步写入 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md`，保持 100% 纯通用工程抽象与测试全绿。 | 1. 三份宪法镜像中 Axiom 67 语义 100% 同构；<br>2. 100% 采用纯通用软件工程语言，零业务情境词汇泄漏；<br>3. `gemini-adapter.test.mjs` 增补对应断言并测试全绿。 |

---

## 板块三：法定门禁物理隔离禁令确认 (Gate 1 Physical Fence Affirmation)

> 🛑 **【门禁 1 物理禁令自查与遵守承诺】**：
> 1. 本备忘录纯粹 100% 聚焦于确认“做什么与验收标准 (What & Acceptance Criteria)”，彻底锁定管理者的真实需求与意图边界；
> 2. **本备忘录绝对未夹带任何具体代码实现方案、技术框架选型讨论或拟变文件路径清单**；
> 3. 所有技术架构设计、拟变双清单编制、状态机转移建模与原子任务编排，均严格被封印至用户批准 Gate 1 之后的 **Step 2 (OpenSpec 规格立法)** 阶段。
