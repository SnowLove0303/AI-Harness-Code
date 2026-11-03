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

### 3. 智能 Subagent 复用判定决策树 (Reuse vs. Fresh Decision Tree)

主 Agent 派发任务前，必须调用 `manage_subagents(Action='list')` 探查当前活跃的 Subagent 列表：
- **状态延续性复用 (`send_message`)**：唯独当后续工作严格属于当前子智能体正在执行的未完结同一任务断点、或者子智能体持有未落盘且不可轻易迁移的瞬态开发环境（如挂载中的 Git 工作分支、正在运行的本地常驻测试服务/进程）时，方可通过 `send_message` 消息队列直接复用该 Subagent；
- **干净独立全新默认原则 (`Fresh Subagents by Default` via `invoke_subagent`)**：凡属新任务、重构任务、排错转向、或前序失败重试，一律强制启动干净的全新 Subagent（`Workspace='branch'`），严禁在被海量错误日志污染的长上下文中击鼓传花。

---

## 三、 四位一体无损任务交接胶囊标准规范 (Four-in-One Handoff Capsule)

主 Agent 派发任务时，严禁用随口大白话口水化压缩，必须 100% 封装四位一体不可精简交付胶囊：

### 1. 四位一体胶囊架构构成 (The Four Elements)
1. **`ps-openspec` 架构契约**：挂载 OpenSpec 增量提案、RFC 2119 规范、单任务专注锁（`[-] lock`）条目及真实 Exit Code 0 验收命令；
2. **`skill` 执行方法论**：显式注入执行该任务所必须绑定的方法论技能（如 `pstack-openspec`、`unslop`、`tdd` 等）；
3. **`上下文 (Context)` 物理围栏**：物理封闭的可读写文件白名单、严禁触碰的只读承重墙与 `@ANTIGRAVITY_INVARIANT_LOCK` 封印代码块、基准 Commit SHA 及冻结的事实指纹；
4. **`提示词 (Prompt)` 聚焦指令**：单一职责清晰指令，显式声明 **非目标 (Non-Goals)**，严禁越权发散。

### 2. 标准交付 Prompt 模板 (Handoff Capsule Format)

```markdown
# 🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]
> **法定执行轨道**：本任务受 OrbitStack (ps-openspec) 轨道工程体系严格管辖。
> 接收方 Agent 必须无条件遵循：① 读取承重墙与代码封印；② 动工前落实双清单；③ 单步施工并出厂净化 (/unslop)；④ 回传必须附带 [Measured] 真实退出码 0。严禁脱离 ps-openspec 自由散漫编码！

# 🎯 任务目标: [精确的单一职责描述，一句话概括]

## 一、 ps-openspec 规格契约
- **关联 OpenSpec 变更**: [Change ID]
- **对应 tasks.md 条目**: `- [-] 任务描述` (单焦点执行锁)
- **RFC 2119 规范块**: [必须满足的 SHALL / WHEN / THEN 条款]
- **强制真实退出码 0 验证命令**: [npm test / npm run lint]

## 二、 绑定方法论技能 (Skills)
- 核心执行技能: `pstack-openspec`
- 出厂代码去噪: `unslop`
- 测试驱动开发: `tdd`

## 三、 物理上下文围栏 (Context Boundaries)
- **✅ 唯独允许修改的文件白名单**:
  - `src/foo/bar.ts`
  - `tests/foo/bar.test.ts`
- **🛑 严格只读承重墙与封印**:
  - 严禁触碰任何带有 `// @ANTIGRAVITY_INVARIANT_LOCK` 标记的源码块；
  - 既有业务回退分支与特殊校验皆为法定事实，严禁擅自否定或删除；
  - 周边未授权模块严格遵循 **最小因果集 (Leave-as-is)**。
- **基准快照**: Commit SHA: `abc1234`, 分支: `feature/xxx`

## 四、 聚焦提示词与非目标 (Prompt & Non-Goals)
- **核心执行指令**: [清晰、无歧义的执行步骤]
- **🛑 非目标声明 (Non-Goals)**:
  - 绝对禁止改动未授权的文件；
  - 绝对禁止引入新的未经审批的第三方依赖；
  - 绝对禁止直接修改主系统工作树或执行自主合流。
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
│                 │ 6. 终审通过 ➔ 主协调统一合流 (Verifier-Only Merge Authority)
└─────────────────┘
```

### 2. 裁执物理隔离与系统改动权限封锁 (Verifier-Only Merge Authority)
- **执行端沙箱隔离**：执行 Subagent 必须在 `Workspace='branch'` 中启动，物理隔离主系统工作树，从底层机制上杜绝执行端直接篡改主系统；
- **裁决端唯一合流权**：系统合流与最终主干代码落盘权限严格归属于主协调/审计 Agent，必须在双阶段机械审计与敌手反向挑刺全绿后，方可完成代码合流。

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
