---
name: ortho-audit
description: "OrthoAudit（代码正交与通用性审计引擎）：融合 differential-review、requesting/receiving-code-review 与 AST/依赖图确定性预筛，围绕程序与数据正交、问题 Class A–D 分类、六元资产分层、源码修改红绿灯与零源码改动异构探针，对任务变动文件执行全面硬编码与边界审计。"
---

# OrthoAudit · 代码正交与通用性审计体系 (Execution Playbook)

> **适用场景**：任何代码审查、盲审（Blind Audit）、PR 增量审计或“防止用户数据/具体模板在通用源码中成为硬编码”的任务。

---

## 一、开源对标与能力融合来源

- **`trailofbits/skills`（`differential-review` / `review-walkthrough`）**：按 `git diff` 风险分层、追踪爆炸半径（Blast Radius）、强制输出结构化核验报告。
- **`obra/superpowers`（`requesting-code-review` / `receiving-code-review`）**：独立审查交接、严重度分级（`Critical / Important / Minor`）、被审方反盲从技术反核。
- **`semgrep/mcp` / `ast-grep` / `dependency-cruiser` / `reviewdog`**：AST 语义扫描、跨层依赖方向硬阻断、Diff 增量过滤。

---

## 二、审计前置标尺：六元资产分类 × 问题四分类 × 红绿灯

### 1. 系统代码与内容六元分类
1. **`[Engine Core]` 通用引擎原语层**：纯算法、状态机、元模型、拓扑原语（**0 业务词、0 实例数据、0 外部格式假设**）。
2. **`[ACL]` 边界防腐层**：输入清洗、脏格式兼容、异构字段归一化适配器。
3. **`[Pluggable Schema]` 可插拔 Schema 与策略层**：随模板/场景变化的字段映射、校验规则、阈值权重配置。
4. **`[Protocol Invariant]` 协议与标准不变量（合法常量白名单）**：标准协议状态码、文件魔数、数学常数、CLI 自身参数（**允许源码枚举，防过度抽象**）。
5. **`[Fixture/Test]` 测试与样本夹具**：参考模板与测试用例（与源码物理隔离）。
6. **`[User Data]` 运行时用户/业务实例数据**：生产输入、企业预设与私有资产。

### 2. 问题四分类（Class A–D）与源码修改红绿灯

| 问题分类 | 典型特征 | 唯一合法求解平面 | 通用引擎源码修改裁决 |
| :--- | :--- | :--- | :--- |
| **Class A（实例/样本特异型）** | 单一模板字段、特定实体名、单条样本异常 | `[Pluggable Schema]` / `[Fixture/Test]` | 🔴 **红灯禁止** |
| **Class B（策略/规则可变型）** | 映射字典、校验清单、阈值权重、业务开关 | `[Pluggable Schema]` / 策略插件 | 🔴 **红灯禁止** |
| **Class C（边界异构清洗型）** | 非标格式兼容、历史错位结构、脏噪过滤 | `[ACL]` 边界防腐层 | 🔴 **禁改 Core** / 🟡 仅允许改 ACL |
| **Class D（通用机制缺失型）** | 现有原语无法表达同类新拓扑，或核心状态机/算法缺陷 | `[Engine Core]` | 🟢 **绿灯允许**（零业务词+参数化+跨场景零方差） |

---

## 三、六步标准审计执行流

### Step 0：交接与裁执物理隔离
- 审计 Agent 禁止由施工 Agent 兼任。
- 仅向审计 Agent 提供 **① 原始需求/Specs 契约**、**② 变动文件与 `git diff`**、**③ 仓库读取权限**；屏蔽施工者的诱导性自我总结。

### Step 1：变动全量盘点与风险分层
1. 执行 `git status --porcelain` 与 `git diff --name-only`，拉取任务过程中产生的**全部变动文件**（100% 覆盖）。
2. 贴标分层：
   - **P0 高危靶区**：`[Engine Core]`（逐行深审）；
   - **P1 边界靶区**：`[ACL]`、`[Interface]`（检查是否越权写核心逻辑或漏校验）；
   - **P2 隔离区**：`[Pluggable Schema]`、`[Fixture/Test]`（确认未被引擎反向引用）。

### Step 2：确定性机械预筛
1. 运行 `node ~/.gemini/ps-hub/scripts/check-anti-hardcoding.mjs --git-diff`（若项目接入 `semgrep` / `ast-grep` / `dependency-cruiser` 一并执行）。
2. **铁律**：机械全绿仅是入场券，**不等于审计通过**。

### Step 3：逐文件语义穿透精审（针对 P0 / P1 变动行区间）
逐个读取变动行区间，依次完成**通用性三问**：
1. **Q1 剥离测试（De-Fixture Test）**：如果把本次参考的用户模板/样本从世界上删掉，这段代码里的字段名、实体词、固定清单、正则或映射字典还成立吗？不成立 ➔ **Critical 阻断**。
2. **Q2 归类裁决（Class A–D）**：属于 Class A/B 却写进 `[Engine Core]` ➔ **Critical 阻断**，指明迁往 `[Pluggable Schema]` 或 `[ACL]`。
3. **Q3 依赖泄漏、假兜底与白名单复核**：检查跨层 `import`、`val || '业务默认值'`；若命中 **Category ④ 协议/标准不变量**，标注 `Whitelisted (Category 4)` 豁免。

### Step 4：去先验样本异构证伪探针（Zero-Source-Diff Probe）
针对解析、转换、拓扑构建等通用能力改动，构造或验证至少 **1 组结构异构的脱敏变体**（改字段名、换层级、增删列）：
- **通过判据**：`[Engine Core]` 源码 `git diff == 0` 前提下，仅替换外部 Schema 或输入即可跑通。

### Step 5：结构化裁决与双向反核闭环
1. **严禁空洞放行**：禁止仅输出“LGTM / 无问题”，必须输出《变动文件逐项审计表》，按 `Critical / Important / Minor` 分级并绑定精确 `file:line` 锚点与整改迁移路径。
2. **反盲从复核**：施工 Agent 收到意见后须对照源码与测试事实逐条核验，禁止盲从道歉；若发现机械脚本漏检的新型硬编码模式，下沉补充 L2 规则或测试用例。

---

## 四、开箱即用模板

### 模板 A：审计 Agent 派单指令
```markdown
你现在担任独立的代码通用性审计员（Blind Code Auditor），禁止修改任何业务源码。
请严格按照 `OrthoAudit`（`ortho-audit`）六步执行流对本次任务的全部变动文件执行审计：
1. 拉取全量变动文件（git status / git diff --name-only），贴标六元层级；
2. 运行 check-anti-hardcoding.mjs --git-diff（及项目 AST/依赖守卫）做机械预筛；
3. 对 [Engine Core] 与 [ACL] 变动行区间逐文件执行 Q1 剥离测试、Q2 Class A–D 归类、Q3 跨层依赖与 Category 4 白名单复核；
4. 对通用解析/拓扑/转换改动给出“核心源码 git diff == 0 仅换 Schema 跑通异构输入”的探针验证；
5. 严禁只写“无问题/LGTM”，必须输出《变动文件逐项审计表》、严重度分级与明确迁移建议。
```

### 模板 B：审计报告强制输出表
```markdown
### 1. 机械预筛结果
- 命令与退出码：`<command> -> Exit Code <0|1>`

### 2. 变动文件逐项审计表
| 变动文件 | 六元层级 | 问题分类 (A-D) | Q1 剥离测试 | Q2/Q3 边界与依赖 | 严重度 | 裁决 (`PASS`/`BLOCK`) & 迁移建议 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |

### 3. 去先验样本异构探针记录
- 构造变体与命令：...
- 核心引擎源码 `git diff` 是否为 0：`YES / NO`

### 4. 最终准出裁决：`APPROVED` / `REJECTED`
```
