---
name: app-reverse-deconstruction
description: "基于双轨逆向工程 (Dual-Track Reverse Engineering) 与现代软件深度解构工业级实践。提供从动态黑盒行为追踪 (CDP/DOM/Event Cascade/Network) 到静态白盒架构建模 (AST/Block Schema/Transaction/CRDT)、文档类应用五层基准深度解构、标准 Clean-Room 净室规格书 (DECONSTRUCT_SPEC.md) 编制，到 REA MCP 工具链绑定与 Evidence 证据链核销的全链路工程技能。触发词：app-reverse-deconstruction/应用逆向/深度解构/动态追踪/block-schema/选区解构/事务状态机/净室规格书/deconstruct-spec/clean-room"
---

# 🧬 成熟应用逆向工程与深度解构工程规范 (Application Reverse Engineering & Deep Deconstruction Standard)

> **法定地位与方法论依据**：本规范为 Ps-openspec 动作技能层法定标准技能，严格执行 **公理 62 (`MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM`)**。
> 杜绝任何浅层表面截图抄袭或脆弱 CSS 拼凑；通过动态黑盒行为追踪（CDP / DOM 变异 / 事件级联 / 网络协议）与静态白盒架构建模（AST / Block Schema / 事务状态机 / CRDT 协同），输出 100% 独立于专有源码的净室设计规格书（`DECONSTRUCT_SPEC.md`）与防篡改证据链图谱（Evidence Graph）。

---

## 🎯 一、 架构总览与工具手脚层 (Architecture & Tooling Layer)

成熟应用凝聚了数年打磨的状态转移与边界防御经验。本技能提供双轨解构引擎，彻底打通动态追踪与静态建模：

```text
┌────────────────────────────────────────────────────────────────────────┐
│             【Dual-Track Reverse Deconstruction Architecture】           │
│                                                                        │
│   🔍 Track A: 动态黑盒行为追踪 (Dynamic Black-Box Behavioral Tracing)     │
│      • CDP / 无障碍语义树 (Accessibility Tree) / DOM Mutation Observers │
│      • 用户完整事件级联追踪：按键触发 -> 焦点转移 -> 选区形变 -> 渲染更新   │
│      • 网络与通信协议荷载增量拦截 (HAR / WebSocket Payload Deltas)      │
│                                                                        │
│   🔬 Track B: 静态白盒架构建模 (Static White-Box Architectural Modeling)  │
│      • 抽象语法树 (AST) 模式还原：块节点拓扑、属性规约、分数索引          │
│      • 事务转移状态机 (Transaction Statecharts)：步骤、对冲逆向操作、快照  │
│      • 协同与持久化基元：CRDT / Yjs 数据模型映射与离线序列化协议          │
│                                                                        │
│   📋 交付门禁: 净室规格书与不可变证据链 (Clean-Room Spec & Evidence)    │
│      • 净室规格书 (`DECONSTRUCT_SPEC.md`)：功能契约与专有源码物理隔离   │
│      • 不可变证据链图谱 (`evidence.json`)：防篡改实测哈希对账凭据       │
└────────────────────────────────────────────────────────────────────────┘
```

### 核心 MCP 与工具链映射表
| 工具 / 引擎 | 调用归属 | 功能规约与应用场景 |
| :--- | :--- | :--- |
| `analyze-javascript-application` | REA MCP | 静态解构目标 Electron / Web 前端应用架构、打包结构与依赖拓扑 |
| `recover-javascript-sources` | REA MCP | 从混淆打包 bundle 中还原高可读性模块源码与 AST 结构 |
| `search` / `trace` / `xrefs` | REA MCP | 跨引用追踪关键业务数据流、事件派发中心与状态机转移分支 |
| `evidence-export` | REA MCP | 导出确定性、不可篡改的规范化 Evidence JSON 证据链 |
| `invoke_subagent(browser)` | 拟态浏览器 | 自动化 CDP 交互拟态、无障碍语义树探测与事件级联抓取 |
| `DOM MutationObserver` | 运行时探针 | 监听 DOM 树在复杂选区变动、拖拽手柄与富文本编辑时的精确形变 |

---

## 📐 二、 文档应用五层深度解构基准 (Document Application Five-Tier Benchmark)

针对富文本编辑器、协同白板、块级（Block-based）笔记等复杂文档类软件，必须全要素覆盖以下五层架构：

### 1. Tier 1: 块级模式与层级 (Block Hierarchy & Node Schema)
- **节点模式定义 (Node Schema)**：全量列举所有块类型（段落、各级标题、清单、代码块、引用、表格、嵌入白板/音视频等）。
- **属性规约 (Attributes Contract)**：提取每个块的核心属性集（`id`, `type`, `props`, `children`, `collapsed`, `style`）。
- **层级拓扑与分数索引 (Fractional Indexing)**：建模块之间的父子嵌套约束、兄弟顺序关系及分数索引算法（如 LexoRank），支持 $O(1)$ 复杂度的任意位置插拔与拖拽重排。

### 2. Tier 2: 选区与光标状态机 (Selection & Caret State Machine)
- **选区范围建模 (Selection / Range Model)**：建模光标焦点（Anchor & Focus）、折叠状态（Collapsed）、行内偏移量（Inline Offset）。
- **跨块级多选 (Cross-Block Selection)**：解构多块连续选中、矩形跨列选择、非相邻块选取的边界表示。
- **边界穿越与光标移动规则 (Boundary Traversal)**：
  - 左边界向前穿越：从当前块首字符退格 (Backspace) 合并入上一块的规则；
  - 右边界向后穿越：从当前块尾字符按 Delete 合并下一块的规则；
  - 上下按键穿透：视觉行（Visual Line）与逻辑行之间的光标映射。

### 3. Tier 3: 事务与不可变步骤引擎 (Transaction & Immutable Step Engine)
- **不可变步骤序列 (Step Pipeline)**：将文档修改拆解为最小原子操作（如 `ReplaceStep`, `AddNodeStep`, `RemoveNodeStep`, `SetAttributeStep`）。
- **逆向操作对冲 (Undo/Redo Inverses)**：每个原子步骤必须显式伴随对应的逆向步骤（Inverse Step），保障历史记录栈的无损回滚。
- **文档状态机不变量 (Document Invariants)**：定义合法文档树的校验契约（例如根节点必须非空、表格行必须列数一致），非法变更在步骤执行前直接阻断。

### 4. Tier 4: 交互指令与快捷表面 (Command & Interaction Surface)
- **斜杠 `/` 唤起菜单注册表 (Slash Menu Registry)**：解构过滤算法、菜单项分组、键盘上下导航与回车选中的状态流。
- **行内 Markdown 快速转换 (Inline Markdown Rules)**：
  - `# ` 转换为一级标题；
  - `- ` 或 `* ` 转换为无序列表；
  - `> ` 转换为引用块；
  - ` ``` ` 转换为代码块。
- **快捷键与浮动工具栏 (Shortcuts & Floating Toolbars)**：解构全局按键监听器、选区触发的浮动气泡（Bubble Menu）的精确定位与层叠上下文（z-index）。

### 5. Tier 5: 协同与持久化协议 (Collaboration & Persistence Protocol)
- **CRDT / Yjs 状态同步模型**：解构文档状态映射至 `Y.Doc`、`Y.Map`、`Y.Array` 的拓扑结构。
- **离线持久化与索引缓存**：解构 IndexedDB / SQLite 的二进制快照保存与增量 Update 序列化协议。
- **多端并发冲突解决 (Conflict Resolution)**：解构并发编辑同一字符、并发调整块顺序、并发删除同一节点的最终一致性收敛逻辑。

---

## 🚀 三、 四阶标准作业规程 (Four-Phase SOP)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: 动态黑盒行为追踪 (Dynamic Behavioral Tracing)                 │
│ 1. 启动目标应用运行时或通过浏览器拟态加载界面                           │
│ 2. 部署 CDP / 事件监听探针，记录目标交互全量事件级联                  │
│ 3. 截获 DOM 变异树更新与网络协议荷载，形成行为基线数据                │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ 动态行为数据就绪
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 2: 静态白盒架构建模 (Static Architectural Modeling)              │
│ 1. 调用 REA MCP 工具 (analyze-javascript-application / recover) 还原AST│
│ 2. 提取数据模型、状态机拓扑与事件分发中枢                              │
│ 3. 按照五层基准（Block/Selection/Transaction/Command/Collab）建立模型   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ 白盒与黑盒双轨交叉印证
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 3: 净室规格书编制 (Clean-Room Specification Authoring)           │
│ 1. 编写 DECONSTRUCT_SPEC.md 净室设计规格书                             │
│ 2. 严格剥离专有代码，仅保留通用数据结构、接口契约与状态转移图          │
│ 3. 制定 100% 独立可实现的工程重写接口与测试用例                        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ 规格书完成
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 4: 不可变证据链核销与门禁对账 (Evidence & Gate Verification)     │
│ 1. 调用 evidence-export 生成防篡改 evidence.json 图谱                  │
│ 2. 对账动态实测行为与静态规格的一致性，出具 Exit Code 0 凭证           │
│ 3. 呈报双清单与对账结果，等待用户确认后合流                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 四、 交付资产规范与标准模板

### 1. 净室规格书标准模版 (`DECONSTRUCT_SPEC.md`)
```markdown
# Clean-Room Engineering Specification: [Application / Subsystem Name]

## 1. System Abstract & Scope
- **Target Application**: [Application Name & Version]
- **Deconstruction Scope**: [In-scope subsystems and components]
- **Clean-Room Boundary**: 100% decoupled from proprietary source code; provides functional contracts only.

## 2. Structural Schema & Data Model (Tier 1 & Tier 5)
- **Node Schema Specification**:
  - `NodeTypes`: Block catalog and allowable children.
  - `Attributes`: Required and optional node properties.
  - `Ordering`: Fractional indexing algorithm and bounds.
- **Persistence & Synchronization Protocol**:
  - Wire format and delta update representation.

## 3. Interaction & State Machine Contracts (Tier 2, Tier 3 & Tier 4)
- **Selection Statechart**: Selection ranges, cross-block anchors, boundary conditions.
- **Transaction Pipeline**:
  - `Step` contracts and validation invariants.
  - `InverseStep` undo/redo pairing.
- **Command Registry**: Trigger characters, input cascades, shortcut maps.

## 4. Test Matrix & Acceptance Criteria
- Mechanical unit test cases for state transitions.
- Multi-user concurrency edge cases and convergence assertions.
```

### 2. 不可变证据链规范 (`evidence.json`)
```json
{
  "system": "app-reverse-deconstruction",
  "version": "1.0.0",
  "target": "example-app",
  "evidenceGraph": {
    "dynamicTraceHash": "sha256:...",
    "staticModelHash": "sha256:...",
    "deconstructSpecHash": "sha256:...",
    "verifiedAt": "2026-11-17T00:00:00Z",
    "measuredExitCode": 0
  }
}
```

---

## 🛡️ 五、 纯通用工程抽象硬门禁 (Domain Neutrality Invariant)

本规范所包含的全部词汇、架构图、SOP 阶段与模板严格（SHALL）遵守纯软件工程与计算机科学标准术语（如 Reverse Engineering, Clean-Room Design, AST, Statechart, Selection, Transaction, CRDT, Evidence Graph 等）。严禁包含任何特定客户、业务领域或孤立情境专用词，违者系统静态审计直接阻断。
