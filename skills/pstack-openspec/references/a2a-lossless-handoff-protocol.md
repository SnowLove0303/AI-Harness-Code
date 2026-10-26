# A2A 无损任务指令交接协议 (Lossless Agent-to-Agent Handoff & Consolidated Capsule Protocol)

> **最高法则 (Lauren Tan @poteto & OrbitStack)**：
> **"Never Summarize and Pray. Pass Consolidated Scope, Boundaries, and Pointers."**
> （绝不采用“简述一番并祈祷它做对”的传统大白话交接；必须遵循 Poteto 原生工程公理，以全量合并简报 Consolidated Brief、物理封闭边界与真实可验证退出码作为法定任务胶囊。）

---

## 一、 为什么跨 Agent 交接会严重失真（The Seam Problem / 接缝危机）？

在多 Agent 协同（Multi-Agent System）或跨线程任务分发中，最普遍也是最致命的破产模式是：
1. **过度精简陷阱 (Summarization Loss)**：用户与 Agent A 经过深度探讨梳理出的核心边界与业务决策，被 Agent A “随口一句话总结”传递给 Agent B。Agent B 丢失前置讨论细节，产生盲目发挥；
2. **上下文污染与 Lost-in-the-Middle**：若直接无脑倾倒几万字的历史会话记录，Agent B 会被无关思考日志和失败报错噪声淹没，无法抓取关键技术决策；
3. **权责边界模糊**：Agent B 不清楚哪些属于“不能动的前人代码”，导致顺手把系统既有的特殊回退分支删除；
4. **中断链污染 (Interrupt-Chain Drift)**：在一个已经积累了多轮报错的会话中持续追问子 Agent，导致上下文窗口漂移。

**OrbitStack 权威解法**：**Poteto 原生公理（Fresh Subagents by Default + Consolidated Scope） + 物理胶囊化（Capsule-Based Delivery） + 工件指针（Artifact Pointers） + 零信任复测（Zero-Trust Audit）**。

---

## 二、 Poteto 优先：A2A 全量合并任务交付胶囊 (A2A Consolidated Handoff Capsule)

无论通过 Antigravity 的 `invoke_subagent` 工具，还是跨会话、跨线程（Session/Thread）向目标 Agent 分发任务，其指令必须严格采用以下结构化 Markdown 契约，**严禁使用口语散文**：

```markdown
# 📦 【A2A 任务交付胶囊 / Poteto Consolidated Handoff Capsule】

## 1. 任务元信息 (Task Metadata)
- **发起方 (Source Orchestrator)**: [Primary Agent / Orchestrator]
- **接收方 (Target Subagent)**: [Target Subagent Role: e.g., Fresh Implementer / Auditor]
- **关联规格提案 (OpenSpec Anchors)**: `openspec/changes/<change-name>/proposal.md`
- **对应任务原子项 (Task Item)**: `tasks.md` 中的 `Task [X.Y]`
- **执行模式 (Mode)**: `Fresh Subagent` (隔离环境，默认干净上下文)

## 2. 全量合并意图与背景 (Consolidated Brief - 无损保真)
- **原始核心诉求 (Original Brief)**:
  [详细阐述用户最初的根本诉求，严禁过度精简，保留完整语境]
- **多轮追加与澄清指令 (Append Directives)**:
  [记录用户在多轮探讨中追加的所有补充约束、技术选型裁决与澄清结论]
- **前置 Agent 产出与分支状态 (Prior Work & Git State)**:
  - 工作分支 / Patch / Commit: [分支名或 Commit SHA]
  - 既有进度与排错避坑记录: [前置 Agent 已验证有效/无效的结论]
- **非目标声明 (Non-Goals - 明确不做的事)**:
  [列举绝对禁止越界的范围与不应顺手改动的事项]

## 3. 物理封闭作用域 (Closed File Scope & Boundaries)
- **✅ 唯独允许修改的文件清单**:
  - `path/to/target1.ts` (函数: `foo()`)
  - `path/to/target2.ts` (类型: `BarType`)
- **🛑 绝对只读豁免区域 (Strictly Read-Only)**:
  - 凡代码中包含 `// @ANTIGRAVITY_INVARIANT_LOCK` 标记的区域享有最高只读豁免，严禁触碰；
  - 专属领域引擎唯一路由公理：严禁绕开官方受控流水线直接修改底层业务生成物；
  - 周边未列出的模块一律遵循 **最小因果集 (Leave-as-is)**，严禁顺手重构！

## 4. 既有逻辑与特殊兼容承诺 (Preserved Invariants)
- **前人特殊逻辑说明**: [列明当前文件里哪些看似冗余但属于人工确认的业务特殊校验/回退逻辑]
- **既有功能不可否定公理**: 严禁以大模型通用代码洁癖为名删除既有回退分支或特殊逻辑。

## 5. 出厂净化与自测验收命令 (Acceptance Invariants)
- **出厂去噪 (/unslop)**: 必须剔除废话口水注释、过度抽象套娃与 `any` 逃避；
- **真实终端验收命令 (必须真实退出码 0)**:
  - 编译与类型检查: `npm run typecheck`
  - 单元与集成测试: `npm test path/to/test.ts`
  - 静态代码检查: `npm run lint`

## 6. 回传成果报表与证据分级契约 (Return Payload & Evidence Labeling)
- 接收方执行完毕后，回传高密度精炼报告（1,000~2,000 tokens 内，充当上下文屏蔽盾），必须包含：
  1. `git diff --stat` 实际修改文件清单；
  2. 真实测试命令的完整执行日志输出，附带法定三级证据标签：
     - `[Measured / 实测]`: 真实 CLI / CDP 退出码 0 与日志断言；
     - `[Inferred / 推演]`: 从类型系统与调用拓扑严格推断的结论；
     - `[Guess / 猜想]`: 待证实的猜想（严禁作为交付依据）；
  3. 遇到的任何技术阻塞点与环境异常（Blockers）。
```

---

## 三、 主 Agent 零信任交叉验收标准流 (Zero-Trust Acceptance SOP)

发起方 Agent 在接收到接收方（Subagent）的完成汇报后，**绝不直接向用户宣称完成**，必须严格执行三步零信任审计：

```text
       ┌────────────────────────┐
       │ Subagent 汇报: 已完成  │ (附带 [Measured] 证据)
       └───────────┬────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ 检查 1: 物理越界核查 (Scope Audit)   │ ➔ 运行 git diff --name-only
│ 是否篡改了胶囊约定之外的未授权文件？ │    发现越界文件 ➔ 立即拒绝并要求回滚！
└──────────────────┬───────────────────┘
                   │ 范围干净
                   ▼
┌──────────────────────────────────────┐
│ 检查 2: 亲自复测验证 (Zero-Trust Run)│ ➔ 在主会话环境亲自运行验收命令
│ 真实退出码是否为 0？日志是否全绿？   │    若红灯报错 ➔ 立即判定为未完成！
└──────────────────┬───────────────────┘
                   │ 验证全绿
                   ▼
┌──────────────────────────────────────┐
│ 检查 3: 净化审计与打勾归口           │ ➔ 检查是否含有 AI Slop 垃圾注释
│ 触觉检阅 (VS Code Diff) 呈报用户终审 │ ➔ 才能在 OpenSpec tasks.md 打勾！
└──────────────────────────────────────┘
```

---

## 四、 跨线程持久化任务看板 (Inter-Thread Blackboard via Coop)

在跨越会话、跨越上下文窗口的长程协作中，依托底层共享总线（如 `coop` 工具集中的 `board_post` / `board_update` / `brain_write`）：
1. **任务卡片唯一标识**：以 `Task-ID` 锚定状态；
2. **状态机原子流转**：`PROPOSED` ➔ `CONFIRMED` ➔ `IN_PROGRESS` ➔ `VERIFIED` ➔ `CLOSED`；
3. **禁止口头修改**：任何变更需求必须以更新胶囊工件的形式发生，确保跨线程指令绝对无损保真。
