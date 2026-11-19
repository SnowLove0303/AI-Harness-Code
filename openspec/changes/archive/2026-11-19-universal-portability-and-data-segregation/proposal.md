# Proposal: Universal Portability, Database Migration Resilience, and User/Default Data Orthogonal Segregation Governance

## Why
In system, web application, script, and workflow development, AI agents and developers frequently suffer from **Host-Centric Myopia and State Entanglement**:
1. **Hardcoded Host Dependencies**: Source files and configs frequently hardcode local machine paths (such as `C:\Users\Administrator\...` or specific user homes), fixed network ports, or single-machine assumptions, causing instant breakage when code runs on another machine, OS, or user account.
2. **Fragile Database Bootstrapping & Migrations**: Database initialization frequently assumes pre-existing parent directories and files, lacking dynamic path resolution, automatic directory creation, and declarative versioned idempotent migrations. When transferred to a new machine or environment, cold-boot failures and schema mismatches cause fatal outages.
3. **User Data & System Default Data Entanglement**: System defaults (shipped presets, initial templates, dictionary entries, standard workflows) and mutable runtime user data (user records, custom presets, overrides, logs) are commingled in the same physical tables, files, or state trees. Consequently, updating default templates clobbers user data, while user reset operations inadvertently corrupt system defaults.

To permanently eradicate these vulnerabilities, this change synthesizes industry-standard portable architectures (Twelve-Factor App, Local-First Architecture) and Lauren Tan (@poteto) core principles (`principle-boundary-discipline`, `principle-separate-before-serializing-shared-state`, `principle-make-operations-idempotent`) into Ps-openspec by codifying Axiom 67 (`UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM`).

## What Changes
1. **Cross-Device Portability & Host Decoupling Standard (`CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD`)**:
   - Strict ban on hardcoded machine-specific absolute paths (`C:\Users\...`, `/home/...`).
   - Dynamic boundary resolution using relative paths and environment-aware standards (`process.cwd()`, `DATA_DIR`, `APPDATA`, `XDG_DATA_HOME`).
2. **Database Migration Resilience & Auto-Bootstrap Standard (`DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD`)**:
   - Automatic parent directory creation and cold-boot schema initialization.
   - Declarative, ordered, versioned migrations with idempotent execution (`principle-make-operations-idempotent`).
   - Resilient schema upgrades preserving historical user data during cross-machine transfers.
3. **User Data & Default Data Orthogonal Segregation Standard (`USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD`)**:
   - Two-tier orthogonal separation: immutable/read-only system default baseline layer vs. mutable user overlay layer (`principle-separate-before-serializing-shared-state`).
   - Upgrades replace the default layer without overwriting user state; user resets purge only user layers without damaging system presets.
4. **Portable Data Export, Backup & Restore Standard (`PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD`)**:
   - Standardized structured export formats (clean JSON, SQL dump) containing zero machine-specific path tokens.
   - Cross-device lossless restore with schema compatibility and integrity checks.
5. **Automated L2 Portability & Decoupling Guard (`scripts/check-universal-portability.mjs`)**:
   - Mechanical static linter registered as `npm run guard:portability` in `package.json`.
   - Scans codebases, scripts, workflows, and configs for hardcoded host paths, raw unmanaged database connections, and state commingling anti-patterns.
6. **Axiom 67 Constitutional Legislation across Three Mirrors**:
   - Codify Axiom 67 across `GEMINI.md`, `skills/pstack-openspec/SKILL.md`, and `skills/ai-harness-openspec/SKILL.md` (item 64) with 100% universal software engineering abstraction.
7. **Automated L2 Test Suite**:
   - Authored `tests/universal-portability.test.mjs` and expanded regression test assertions in `scripts/tests/gemini-adapter.test.mjs`.

## Spec-Kit 1:1 Requirement Traceability Matrix (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **跨设备多环境通用性与宿主环境解耦规程**<br>(`CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD`) | **GIVEN** 程序、Web 应用或工作流在任一开发机中编写或重构；<br>**WHEN** 代码在其他设备、不同操作系统或不同用户账号下运行时；<br>**THEN** 系统 SHALL 100% 采用相对路径或标准化环境变量解析（如 `process.cwd()`、`DATA_DIR`、`APPDATA`、`XDG_DATA_HOME`）；严禁在源码或配置文件中硬编码单机物理绝对路径（如个人用户名目录、固定本地磁盘符）；确保跨机部署零摩擦就绪。 | 1. 源码与配置中单机物理绝对路径命中数为 0；<br>2. 路径解析统一收敛至系统边界配置模块；<br>3. 在全新设备空目录下冷启动能够自适应运行。 |
| **REQ-2** | **数据库迁移韧性与自愈初始化规程**<br>(`DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD`) | **GIVEN** 系统启动时连接或初始化数据库（SQLite、嵌入式或关系型存储）；<br>**WHEN** 宿主环境为全新部署、迁移后设备或存储目录尚未创建时；<br>**THEN** 系统 SHALL 自动执行幂等自愈初始化（Auto-Bootstrap）：自动递归创建数据目录、自动探测数据库文件、按序执行声明式版本化迁移（Versioned Migrations）；即使从旧机迁入旧版本数据库，亦能平滑自动升级且不丢失既有数据。 | 1. 数据库存储路径动态可配且支持相对路径；<br>2. 首次启动在空目录下自动创建目录与表结构，退出码 0；<br>3. 迁移执行具备幂等性，重复执行零报错。 |
| **REQ-3** | **用户数据与默认系统数据/预设物理正交隔离规程**<br>(`USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD`) | **GIVEN** 软件系统定义了业务预设、初始模板、系统字典与用户运行数据；<br>**WHEN** 系统处理读写、存储、更新或重置操作时；<br>**THEN** 系统 SHALL 实施严格的两层正交物理隔离：<br>① **只读基线层 (Default/System Data)**：随代码包发布的默认数据与模板享有只读保护，版本更新整包替换；<br>② **用户可变层 (Mutable User Data)**：用户输入、业务记录与自定义覆盖层独立存储于专属用户数据区；<br>系统更新时 100% 不破坏用户数据，用户重置时 100% 不破坏系统预设底座。 | 1. 默认数据与用户数据物理存储或键空间物理正交；<br>2. 模拟系统升级（替换默认文件）后用户记录 100% 完好；<br>3. 模拟重置用户数据后默认模板与系统状态不受影响。 |
| **REQ-4** | **跨设备数据便携导出、备份与无损迁移规程**<br>(`PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD`) | **GIVEN** 用户需要将当前程序迁移至另一台计算机或备份当前实例；<br>**WHEN** 触发数据导出、备份或跨机导入流程时；<br>**THEN** 系统 SHALL 提供结构化便携格式（如规范 JSON、SQL dump 或独立数据归档包），仅导出纯粹的用户可变数据，剔除单机环境专属元数据与默认只读数据；在新设备上导入时能无缝恢复全部业务状态。 | 1. 导出产物中 0 包含单机物理路径与机器特定标识；<br>2. 导出文件可在全新异构设备上 100% 还原业务数据；<br>3. 导出/导入流程具备数据完整性校验。 |
| **REQ-5** | **自动化 L2 通用性与环境解耦静态守卫工具链**<br>(`AUTOMATED_L2_PORTABILITY_GUARD_STANDARD`) | **GIVEN** 系统构建、CI 流水线或执行 `npm run guard:portability` 时；<br>**WHEN** 静态守卫脚本扫描全工程源码、工作流与配置资产时；<br>**THEN** 守卫脚本 SHALL 机械检测是否存在单机硬编码绝对路径、裸数据库存储连接及数据混淆反模式；若发现违规直接输出 Exit Code 1 阻断发布并抛出 `HARDCODED_HOST_ENVIRONMENT_BLOCKED` 错误；变异注入绝对路径时稳定红灯。 | 1. 新增 `scripts/check-universal-portability.mjs` 守卫；<br>2. 在 `package.json` 注册 `guard:portability` 命令；<br>3. 静态扫描与变异测试杀伤力双向实测 Exit Code 0。 |
| **REQ-6** | **最高宪法公理 67 立法与三镜像同构固化**<br>(`AXIOM_67_UNIVERSAL_PORTABILITY_CONSTITUTIONAL_LEGISLATION`) | **GIVEN** 完成上述通用性与数据隔离标准规程制定；<br>**WHEN** 固化至系统核心宪法与规约时；<br>**THEN** 智能体 SHALL 将跨设备通用性、数据库自愈迁移韧性与数据正交隔离作为 Axiom 67，同步写入 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md`，保持 100% 纯通用工程抽象与测试全绿。 | 1. 三份宪法镜像中 Axiom 67 语义 100% 同构；<br>2. 100% 采用纯通用软件工程语言，零业务情境词汇泄漏；<br>3. `gemini-adapter.test.mjs` 增补对应断言并测试全绿。 |
