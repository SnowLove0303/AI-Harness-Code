# Specification: Generality Classification, System Content Taxonomy & Source Mutation Boundary

## ADDED Requirements

### Requirement: 问题分类矩阵（基于通用性、灵活性与可插拔性）
系统规范 SHALL 将工程问题按通用性、灵活性与可插拔性划分为四类，并强制绑定唯一合法求解平面：
- **Class A（实例/样本特异型）**：特定模板、特定实体名、单条样本异常。SHALL NOT 修改核心引擎源码，必须在外部 Schema/配置或测试夹具中解决。
- **Class B（策略/规则可变型）**：字段映射、校验规则、权重阈值、业务开关。SHALL NOT 硬编码分支，必须通过可插拔 Schema 或策略插件注入。
- **Class C（边界异构清洗型）**：非标输入格式、命名差异、外部脏噪。SHALL 在边界防腐层（ACL）归一化，严禁穿透至核心引擎。
- **Class D（通用机制缺失型）**：现有抽象原语无法表达一类同构拓扑，或通用算法/状态机本身存在缺陷。MAY 修改核心引擎源码，但必须满足零业务词、参数化、向后兼容及跨场景零方差。

#### Scenario: 遇到新企业模板时正确归类为 Class A/B
- **WHEN** 用户提供新的业务模板并要求构建通用识别或转换工具
- **THEN** Agent MUST 将模板字段、实体名称与结构清单归类为 Class A/B，仅通过外部 Pluggable Schema 注入，禁止内嵌至核心引擎源码。

### Requirement: 系统代码与内容六元分类
系统资产 SHALL 按职责划分为六类物理隔离层级：
1. **通用引擎原语层（Engine Primitives）**
2. **边界防腐层（Anti-Corruption Layer, ACL）**
3. **可插拔 Schema 与策略层（Pluggable Schema & Policies）**
4. **协议与标准不变量（Protocol & Standard Invariants，合法常量白名单）**
5. **测试与样本夹具（Sample Fixtures）**
6. **运行时用户/业务实例数据（Runtime User/Instance Data）**

#### Scenario: 区分协议不变量与业务实例数据
- **WHEN** 源码中需要定义标准 HTTP 状态码或 CLI 自身标志
- **THEN** 该内容 SHALL 归类为 Category 4（协议与标准不变量），允许在源码中显式枚举而不被误判为硬编码违规。

### Requirement: 源码修改红绿灯决策边界
系统 MUST 明确界定源码修改红绿灯边界：
- **允许修改源码（Green-Light）**：SHALL 仅限于 Class D 核心机制原语升级或缺陷根治、Category 4 协议/标准不变量补充与类型契约强化、以及为消除既有硬编码而抽象出的可插拔扩展点（Extension Point）。
- **禁止修改源码（Red-Light）**：SHALL 禁止 Class A 单实例/单模板特判适配、Class B 可由外部 Schema/配置解决的差异、`Invocation-Only` 任务中篡改被调用程序内部逻辑、消费末端（Sink）掩盖上游非法状态、以及在引擎源码内嵌实例数据、实体清单或静态映射表。

#### Scenario: 拦截仅针对单一输入样本的引擎源码修改
- **WHEN** Agent 企图为了适配某个特定输入文件而在通用引擎中新增字面量判断或静态映射表
- **THEN** 系统 MUST 依据 Red-Light 规则阻断核心源码修改，并引导至外部 Schema 或 ACL 适配层。

### Requirement: Gate 2 三元分账、零源码改动盲测与 L2 守卫增强
- 在 `SKILL.md` Gate 2 立法阶段，涉及数据解析/转换/拓扑构建的任务 SHALL 明确区分 Engine Primitives、Pluggable Schema 与 Sample Fixtures，并要求通过“零核心源码改动（`git diff == 0`）替换 Schema 跑通异构变体”验证。
- `scripts/check-anti-hardcoding.mjs` SHALL 在保留原有特判拦截的同时，增加对源码中大规模静态字面量清单/映射表的启发式检测能力，并通过单元测试验证向后兼容与拦截有效性。

#### Scenario: L2 守卫检出源码内嵌大规模静态映射表
- **WHEN** 运行 `check-anti-hardcoding.mjs` 扫描包含大规模静态业务字符串清单或字典的源码模块
- **THEN** 守卫 SHALL 输出结构化违规或告警标识，同时保持既有 `scanCodeForSpecialCasing` 与 `validateGeneralizationEvidence` 测试用例 100% 通过。
