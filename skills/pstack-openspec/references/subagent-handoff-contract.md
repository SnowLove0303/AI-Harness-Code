# Poteto 原生首要规范：Subagent 任务交接与隔离契约 (Poteto Consolidated Subagent Contract)

> **最高设计原则 (Lauren Tan @poteto)**：
> **"Fresh subagents by default with consolidated scope."**
> （默认使用干净的全新 Subagent，严禁在污染上下文中反复 interrupt-chain；派发时必须传入完整合并范围，严禁口头随意精简！）
> **"Throughput comes from trust. Context shielding keeps orchestrator clean."**
> （吞吐量源于信任体系；主 Agent 通过子 Agent 构筑上下文屏蔽盾，吸收噪音与重度上下文，回传高密度证据。）

---

## 一、 为什么跨 Agent 交接会发生接缝断层 (The Seam Problem)？

在多 Agent 协同或子 Agent 派发中，最致命的破产模式：
1. **口语化随口精简 (Summarization Loss)**：主 Agent 经过与用户多轮深入对齐的细节，在派发给子 Agent 时被一句话大白话粗暴概括，导致子 Agent 凭空猜测；
2. **长程对话污染与上下文遗忘 (Interrupt-Chain Pollution)**：对同一个子 Agent 反复进行 follow-up 与中断追问，导致子 Agent 的 context window 充斥失败历史与混淆状态；
3. **权责边界越界 (Scope Creep)**：子 Agent 以为拥有全项目读写权限，擅自重构不相关文件，破坏既有回退逻辑或封印代码块；
4. **证据缺失与虚假打勾 (Blind Assertion)**：子 Agent 汇报“已搞定”，但未提供真实 CLI 退出码 0 与日志证据。

---

## 二、 Poteto 首要公理：Fresh Subagents + Consolidated Scope

为了解决上述问题，OrbitStack 强制采纳 Lauren Tan 原生工程法则：

```text
┌────────────────────────────────────────────────────────────────────────┐
│                       Poteto 委派双公理 (Delegation Axioms)             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. 默认全新原则 (Fresh Subagents by Default):                          │
│    • 每次重试、排错转向、或并行的子任务，默认派发独立的全新 Subagent； │
│    • 严禁让携带大量错误历史的“脏 Subagent”继续处理不相关的子任务；    │
│    • 上下文屏蔽盾 (Context Shielding)：子 Agent 吸收大篇幅代码、测试   │
│      与网页抓取输出，主 Agent 保持高维清爽，只接收 1,000-2,000 tokens  │
│      的高密度结构化汇报。                                              │
├────────────────────────────────────────────────────────────────────────┤
│ 2. 全量合并范围 (Consolidated Scope):                                  │
│    • 派发给 Subagent 的简报严禁随意压缩，必须包含【全量合并简报】：    │
│      ① 原始业务意图与核心规格 (Original Brief)                          │
│      ② 用户与主 Agent 所有的追加指令与纠正澄清 (Append Directives)      │
│      ③ 前置 Agent 的产出总结与工作分支/Commit SHA (Prior Work)         │
│      ④ 明确且物理封闭的读写边界 (Read/Write Boundaries)                 │
│      ⑤ 必须验证的退出码 0 命令 (Acceptance Commands)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 三、 Poteto Consolidated Brief 标准模板 (任务交付胶囊)

主 Agent 调用 `invoke_subagent` 或分发任务时，`Prompt` 必须首行声明轨道管辖，并采用以下标准结构：

```markdown
# 🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]
> **法定执行轨道**：本任务受 OrbitStack (ps-openspec) 轨道工程体系严格管辖。
> 接收方 Agent 必须无条件遵循：① 读取承重墙与代码封印；② 动工前落实双清单；③ 单步施工并出厂净化 (/unslop)；④ 回传必须附带 [Measured] 真实退出码 0。严禁脱离 ps-openspec 自由散漫编码！

# 🎯 任务目标: [精确的单一职责描述，一句话概括]

## 1. 全量意图与合并背景 (Consolidated Brief)
- **原始核心诉求 (Original Brief)**:
  [详细记录用户最初的业务目标，不丢弃原始语境]
- **追加与演进指令 (Append Directives)**:
  [记录用户在多轮对话中补充的所有特殊要求、纠偏指令与澄清结果]
- **前置 Agent 产出与状态 (Prior Agent & Branch State)**:
  - 工作分支 / Commit: [分支名或 Commit SHA]
  - 已完成节点与现状: [前人已做好的部分与经验沉淀]

## 2. 物理封闭作用域 (Closed Scope & Invariant Locks)
- **✅ 唯独允许修改的文件清单**:
  - `src/foo/bar.ts`
  - `tests/foo/bar.test.ts`
- **🛑 严格只读与承重墙约束**:
  - 严禁触碰任何带有 `// @ANTIGRAVITY_INVARIANT_LOCK` 标记的源码块；
  - 既有业务回退分支与特殊校验皆为法定事实，严禁擅自否定或删除；
  - 周边未授权模块严格遵循 **最小因果集 (Leave-as-is)**。

## 3. 非目标声明 (Non-Goals)
- 明确指出本次任务绝对禁止做的事项（如：严禁引入新的依赖库、严禁改动数据库 Schema、严禁顺手重构无关代码）。

## 4. 强制验收命令 (Acceptance Commands - 必须真实退出码 0)
- 类型检查: `npm run typecheck`
- 单元测试: `npm test path/to/target.test.ts`
- 代码规范: `npm run lint`

## 5. 汇报契约与证据分级 (Evidence-Based Return Payload)
- Subagent 汇报必须遵循以下证据标签：
  - `[Measured / 实测]`: 必须附带 CLI / CDP 实际运行日志与退出码 0；
  - `[Inferred / 推演]`: 基于代码类型与链路推导出的结论；
  - `[Guess / 猜想]`: 待证实的猜想（严禁作为交付依据）。
- 提交内容：修改文件清单 + 测量证据日志 + 未解决的阻碍 (Blockers)。
```

---

## 四、 主 Agent 零信任验收工作流 (Zero-Trust Verification SOP)

```text
┌─────────────────┐
│ Primary Agent   │ (持有全局 OpenSpec 规格与架构控制)
└────────┬────────┘
         │ 1. 组装【Poteto Consolidated Brief】全量合并简报
         ▼
┌─────────────────┐
│ Fresh Subagent  │ (全新干净独立执行空间，继承工程准则)
│ (Context Shield)│ 2. 单步施工 ➔ TDD 绿灯 ➔ /unslop 净化 ➔ 真实测试
└────────┬────────┘
         │ 3. 回传结构化报告 (带 [Measured] 真实退出码 0 与日志，控制在 1-2k tokens)
         ▼
┌─────────────────┐
│ Primary Agent   │ 4. 零信任复测 (Zero-Trust Verification):
│ (Zero-Trust)    │    • 检查 git diff 是否存在未授权文件越界？
│                 │    • 在主环境中亲自执行验收命令，核实退出码 0！
│                 │ 5. 验收通过 ➔ tasks.md 打勾 ➔ VS Code Diff 呈报用户
└─────────────────┘
```

---

## 五、 Swarm（群体协作）与 Arena（交叉裁决）拓展模式

借鉴 `@poteto` 的 `swarm` 与 `arena` 机制，在处理大规模或高争议任务时：
1. **Swarm 扇出与聚合 (Fan-out & Aggregate)**：
   - **Frame**：定义退出断言（Done Predicate）与任务分区（Partitioning）；
   - **Fan-out**：并行拉起多个 Fresh Subagent，各自在受限的只读/读写作用域中并行施工；
   - **Aggregate**：主 Agent 作为汇聚中心，收集所有 Subagent 的 [Measured] 证据，剔除冲突并统一合流。
2. **Arena 对抗交叉盲测 (Competitive Arena)**：
   - 面对高难度算法或复杂排错，可启动两个 Subagent 分别使用不同解法（策略 A vs 策略 B）；
   - 引入独立的 Auditor Agent 进行交叉红队审讯，由真实测试命令的通过率与性能决定胜出分支。
