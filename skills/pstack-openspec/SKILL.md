---
name: pstack-openspec
description: "OrbitStack (轨道工程体系): Lauren Tan (@poteto) 的 Pstack 体系与 AI-Harness、OpenSpec 深度咬合的工业级 Vibe Coding 闭环且可自迭代执行方法论。融合了五层信任与防御金字塔（L1架构承重墙/L2静态分析ESLint/L3契约立法/L4自验证Feature Map/L5双清单门禁与人机审阅）、双环驱动引擎（Inner Loop任务微循环/Outer Loop代码库园丁与长程演进）、六步实战闭环SOP（含Spec-Kit零损耗立案与双门禁）、单任务专注锁及踩坑自动下沉自迭代机制（Self-Iterating Defense Escalation）。触发词：orbitstack/orbit-stack/pstack/poteto/poteto-mode/unslop/interrogate/how/why/pstack-openspec/双清单/工业级闭环/自迭代"
---

# OrbitStack 轨道工程体系 (Pstack & AI-Harness & OpenSpec 工业级自迭代方法论)

> **核心哲学**：**Throughput Comes From Trust (吞吐量源于信任体系，而非盲目堆砌 Agent)**。
> **OrbitStack（Ps-openspec 轨道工程体系）** 为全系统的**最高法定总纲（Supreme Governance Framework）**，统领跨项目、跨任务的工业级研发闭环。本体系将 **Lauren Tan（@poteto）的 Pstack 严密工程准则**、**AI-Harness（工程底座与承重墙）**、**OpenSpec（增量生命周期）** 与 **VS Code 原生两栏 Diff 触觉检阅** 深度咬合；**GitHub Spec-Kit 属于 Ps-openspec 的附属思路与子模块**（专职 Step 0 需求零损耗 1:1 对账）。具体执行层面的方法论（工作流开发、UI设计等）统一下沉至**原子技能操作层**，由 **Graph 关联拓扑与布控治理网** 实现瞬时穿透检索与安全阻断。

---

## 🏛️ 一、 核心基石：Lauren Tan 五层信任与防御金字塔 (The 5-Layer Trust Pyramid)

在 Vibe Coding 模式下，**严禁仅凭自然语言 Prompt 去约束 Agent**。系统必须自底向上构筑五层梯次防御，越往下沉，防线越硬；一旦上层发生缺陷或偏离，必须自动触发**防线下沉自迭代机制**：

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   【五层信任与防御金字塔 (从强到弱)】                  │
│                                                                        │
│   🧱 Layer 1 (最强硬约束): 代码库与架构承重墙 (Codebase & Architecture) │
│      • 状态机显式建模：使非法状态在类型层无法表达；显式 Option 缺失建模│
│      • 源码级防篡改封印：@ANTIGRAVITY_INVARIANT_LOCK 核心代码绝对豁免  │
│      • 专属引擎唯一路由公理：严禁私写脚本绕开官方流水线直接篡改底层    │
│                                                                        │
│   ⚙️ Layer 2 (机器审查门禁): 静态分析与编译器 (Static Analysis & Linters)│
│      • 绝对一票否决权：静态分析与编译为硬阻断承重墙 (Hard Blocker)     │
│      • 反局部假特判硬编码：严禁针对特定测试值编写 if (x === 'val') 假通│
│      • 零警告零错误原则：强制 --max-warnings=0，任何告警等同编译失败   │
│      • 反逃避法典：严禁 @ts-ignore / eslint-disable / any 压制与绕过    │
│      • 纠错两遍即立项为 Lint：同类错误人工纠正两次，立刻固化为硬规则    │
│      • CI/CD 真实退出码：退出码 0 为打勾充要条件，严禁无凭证自证宣称   │
│                                                                        │
│   📜 Layer 3 (工作流引导): 契约立法与剧本库 (Rules, Skills & Playbooks) │
│      • 执行方法论下沉：工作流开发、UI设计等归入原子技能操作层 (Action) │
│      • Graph 拓扑关联与布控网：通过 Graph 快速寻路与爆炸半径围栏布控   │
│      • 验证平面物理隔离：测试断言集在 Agent 可写范围之外，裁执分离     │
│      • AI-Harness 4份受管宪法：AGENTS/ARCHITECTURE/FRONTEND/BACKEND    │
│      • AGENTS.md 负向禁令转正向约束：提供封闭作用域与准入准则          │
│      • pstack 23 个标准剧本：任务先匹配剧本，严禁静默跳步 (No Skips)   │
│                                                                        │
│   🎯 Layer 4 (行为取证): 两阶双轨深度审计 (Two-Step Dual-Scope Audit)    │
│      • 第一步机械审计：验证平面隔离、变异杀伤力、负向≥30%、退出码 0  │
│      • 第二步认知审计：全新独立 pro 子 Agent (/interrogate) 敌手审讯  │
│      • 规范双轨治理网：全局规范(宏观承重墙) + 局部规范(微观RFC契约)   │
│      • 项数1:1绝对守恒：N+M 逐条物理行号锚定与主动证伪，遗漏直接熔断  │
│      • 外部物理见证者：真实退出码 0 + 像素零差 + 事实指纹 100% 物理核销 │
│      • Feature Map 持续同步：动态维护功能入口与 DOM 地图指导精准探针  │
│                                                                        │
│   👁️ Layer 5 (人机终审): 双清单门禁与触觉检阅 (Human Gate & VS Code)    │
│      • 动工前双清单门禁：拟变清单 + 承诺保持现状清单，强等用户授权     │
│      • 触觉检阅 (VS Code Diff)：源码变更逐一走 review_diff_in_vscode   │
│      • 终审防线下沉归口：人工 Review 发现的问题，必须下沉固化至 L1-L3  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 二、 双环驱动工程引擎 (Inner Loop vs Outer Loop)

将 Agent 研发严格区分为**本地微循环交付**与**宏观长程治理**两个独立运转又紧密咬合的双环：

```text
┌───────────────────────────────────────┐      ┌───────────────────────────────────────┐
│       The Inner Loop (内环驱动)        │      │       The Outer Loop (外环治理)       │
│        (本地交互开发与施工微循环)      │      │        (异步自动驾驶与长程演进)       │
├───────────────────────────────────────┤      ├───────────────────────────────────────┤
│ 1. 多模型路由分工 (pstack-models)     │      │ 1. 灵感漫游与对齐 (OpenSpec Explore)  │
│    • 推理强模型管架构与红队审计       │      │    • 纯只读探索拓扑，只思考绝不落笔   │
│    • 编码快模型做精准单步填充         │      │                                       │
│ 2. 核心原子技能集                     │      │ 2. 规格增量立法 (OpenSpec Propose)    │
│    • interrogate: 动工前反问排雷      │      │    • proposal.md + specs + tasks.md   │
│    • how & why: 读懂调用拓扑与意图    │      │                                       │
│    • architect: 纯洁性与边界严校验    │      │ 3. 代码库夜间园丁 (Codebase Gardener) │
│    • unslop: 无情去 AI 废话与套娃代码 │      │    • 后台巡检消除死代码/补充单元测试  │
│    • unslop: 无情去 AI 废话与套娃代码 │      │    • 动态更新 Feature Map 与架构图谱  │
│ 3. 科学排错五步法 (Bug-Fix Loop)      │      │                                       │
│    • 真实复现 -> 根因假设 -> 证伪回滚 │      │ 4. 经验永续沉淀 (OpenSpec Archive)    │
│    • 最小修复 -> 绿灯闭环             │      │    • 规格严格归档 + CHANGELOG 根因    │
│ 4. 触觉检阅与小步存档                 │      │    • 触发防线下沉自迭代机制           │
│    • VS Code Diff 原生两栏逐一核对    │      │                                       │
│    • 节点跑通立即 Git Commit 存档     │      │                                       │
└───────────────────────────────────────┘      └───────────────────────────────────────┘
```

---

## 🔄 三、 标准六步实战闭环 SOP (The 6-Step Practical SOP)

在 Antigravity 中执行任何开发、重构或排错任务时，必须严格执行以下六步流水线：

### Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1 Detailed Brief)
1. **原始诉求逐字归仓与 1:1 需求追溯矩阵（RTM）**：
   - 完整提取用户输入的每一个编号或原子诉求（如 1、2、3、4），建立 1:1 需求追溯矩阵（RTM: Requirement Traceability Matrix），项数绝对对齐：$N_{\text{raw}} \equiv N_{\text{RTM}}$；
   - 用户正确做法与审计方案全量通读：若用户提供了规范、正确做法或审计方案，动工前必须 100% 逐字全量通读并建立基准，严禁凭模型常识脑补或略读；
   - 严禁擅自合并、删减或口水化精简；三要素结构展开（业务场景/边界、详尽功能断言、验收指标）；
2. **🛑 门禁 1：需求全量追溯详细备忘录呈报 (Human Confirmation Gate 1)**：
   - 向用户呈报《需求全量追溯备忘录（详细版，严禁精简）》，列明每一个编号原子需求的三要素定义；
   - **停等门禁**：必须严格停等用户明确确认回复（如“理解正确/确认”）后，方可进入后续阶段。

### Step 1: 建章立制与底座感知 (Anchor & Plan First)
1. **查验全仓承重墙**：
   - 读取 `AGENTS.md`、`ARCHITECTURE.md`，执行 `npx ai-harness status` 确认健康度；
   - 识别代码内源码级封印：`// @ANTIGRAVITY_INVARIANT_LOCK`（绝对只读豁免）；
   - 识别专属引擎唯一路由公理：严禁绕开官方流水线直接修改底层业务生成物；
2. **需求理解与对抗反问 (/clarify & /interrogate)**：
   - 借鉴 `spec-kit` 与 pstack：在动工前主动挖掘边界遗漏、非法状态拒绝策略与既有契约冲突；
   - 遇到模糊输入或二选一技术选型，必须通过 `ask_question` 或结构化反问向用户澄清，严禁脑补假设；
   - 必须梳理出：核心流转路径、非法状态拒绝机制、向下兼容承诺与端到端真实测试指标；
3. **拒绝模糊对话，匹配固定剧本**：
   - 依据用户意图从 23 个 Playbooks（新功能/Bug排错/重构/性能等）中锁定剧本，显式列出待办步骤；
   - 严禁静默跳步（No Silent Skips）：若某步无需执行，必须显式注明 `skip: <客观原因>`；
4. **复杂场景只读探查 (OpenSpec Explore)**：
   - 纯只读探索调用链路，运行 `/how` 与 `/why` 理清上下文，绘制 Mermaid 拓扑；
   - 铁律：**只输出分析报告与计划，严禁在此阶段修改任何业务代码**；
5. **逆向数据流穿透与状态合法性二分判定**：
   - 异常必须逆向溯源至 Origin Producer，严禁在末端调用宿主 (Sink) 局部防御性掩盖，非法状态杜绝防御性兜底；
6. **通用底层机制与业务策略边界隔离**：
   - 识别被调用的底层通用程序与工具库，严禁将调用端特定业务策略反向污染至底层通用机制。

### Step 2: 分支隔离与规格立法与【门禁 2】(Branch & Propose & Gate 2 Plan Auth)
1. **工作区/分支物理隔离**：
   - 使用独立的 Git 分支或 `git worktree` 承载改动，单会话严格只干一件事；
2. **工程图纸立法与需求扩展**：
   - 将 1:1 RTM 需求无损注入 `openspec/changes/<change-name>/proposal.md`；
   - 针对每个 `REQ-xx` 使用 ps-openspec 展开 RFC 2119 严密契约并在 `specs/` 落地；
   - 在 `tasks.md` 中分解为原子任务，条目绑定具体验证命令；
3. **🛑 门禁 2：架构处理思路与双清单前置授权门禁 (Human Authorization Gate 2)**：
   - 在动工前，向用户显式呈报【架构处理思路与双清单】，并**严格停等用户明确确认回复（如“执行”、“同意”）**：
   ```markdown
   ### 架构处理思路 (Architecture & Processing Approach)
   - 核心处理流程拓扑与技术选型说明；

   ### 一、拟变更范围清单 (Proposed Scope)
   - 受影响文件路径与改动函数明细；
   - 拟变清单因果位置自证：所有拟变文件必须显式标注 [Root Source] / [State Transition] / [Consumer Sink] 因果角色。若拟变清单仅修改 [Consumer Sink] 而未修复或证明 [Root Source]，门禁直接触发 SINK_PATCHING_BLOCKED 熔断驳回，严禁开工；
   - 通用性自证硬门禁：凡涉及底层通用程序的改动，必须自证具备参数化抽象且零单任务特判；试图通过局部硬编码迁就单步任务者，门禁直接触发 TASK_SPECIFIC_POLLUTION_BLOCKED 阻断；
   - tasks.md 原子化条目与可执行验证命令。

   ### 二、保持现状承诺清单 (Preserved Commitments)
   - 承诺绝不否定/删改既有业务逻辑与定制回退分支；
   - 承诺绝不触碰封印代码块 (@ANTIGRAVITY_INVARIANT_LOCK)；
   - 承诺严守最小因果集 (Leave-as-is)，绝不发散重构周边代码。
   ```

### Step 3: 单步施工与触觉检阅 (Apply & VS Code Diff & Single-Focus Lock)
1. **动态单任务专注锁（`[-] lock`）与机检前置解除充要条件**：
   - 严格落实 Roo-Code/Cline 单焦点纪律，在任意时刻仅允许一个任务处于进行中状态（状态为 `[-]`）；
   - 解锁打勾充要条件：必须同时通过行为测试与编译/Lint 静态检查（`--max-warnings=0` 且真实退出码 0）；
   - 变异反欺诈验证前置：在核心条件分支与保护门禁上执行故意变异注入（如条件取反、短路核心断言），测试套件必须红灯杀伤；若变异状态下测试依然全绿，直接判定为弱断言欺诈（`TRIVIAL_ASSERTION_FRAUD`），任务严格锁死在 `[-]`，严禁解锁；
   - 严禁逃避注解：绝对禁止添加 `// @ts-ignore`、`/* eslint-disable */` 或 `as any` 强行绕过，红灯时任务严格锁死在 `[-]`；
   - 上一个任务未通过真实退出码 0 验证并打勾前，绝对禁止启动下一个任务；
2. **Poteto 委派双公理与智能自动编组 (Fresh Subagents by Default & Consolidated Scope)**：
   - **默认自动编组 (Auto-Dispatch by Default)**：主协调 Agent 负责架构统筹与全方位终审，禁止直接编写或修改业务代码；具体施工执行必须自动编组委派给执行 Subagent；
   - **智能探查复用判定决策树 (`manage_subagents`)**：派发前必须调用 `manage_subagents(Action='list')` 探查活跃状态：
     - 若新任务属于同一未完结断点或持有未落盘瞬态环境，通过 `send_message` 消息队列复用；
     - 若为独立新任务、重构、排错转向或重试，默认派发全新干净的 Subagent (`invoke_subagent`, `Workspace='branch'`)；
   - **四位一体任务交接胶囊 (Four-in-One Handoff Capsule)**：派发必须封装 `ps-openspec + skill + 上下文 (Context) + 提示词 (Prompt)` 全量合并胶囊，严禁随口大白话压缩；
   - **主动完成报告与响应式唤醒**：Subagent 施工完毕主动回传包含 `[Measured]` 退出码 0 日志与变异测试杀伤记录的完成报告，主 Agent 被系统响应式唤醒开启全方位认知审计；
   - **裁执物理隔离与合流权归属**：执行 Subagent 运行在独立 branch 工作区，禁止直改主系统与自主合流；系统改动与合流权归属于主协调审计 Agent；
3. **科学排错与 TDD 驱动**：
   - 修 Bug 必须先在真实终端复现报错，验证证伪立刻全量回滚；
   - 新增逻辑先写测试见证红灯，再写最小因果实现转为绿灯；
4. **出厂代码去噪 (/unslop)**：
   - 剔除 AI 废话口水注释、过度防御包装、重复组件与 `any` 逃避；
5. **触觉检阅**：源码变更必须调用 `vscode-review` 中的 `review_diff_in_vscode`，拉起原生两栏 Diff 供用户把控；
6. **证据分级与真实退出码**：任务打勾 `- [x]` 必须以测试命令终端真实退出码 `0`、变异反欺诈杀伤凭证以及标注为 `[Measured / 实测]` 的绿灯日志为充要依据，杜绝虚假打勾；
7. **施工期摩擦动态存证**：单步任务凡触发测试报错、环境断裂或经历排错重试，必须实时记录 `[Incident: Friction/Bug]` 存证，严禁静默掩盖调试痕迹。

### Step 4: 触觉审计与高频存档 (Audit & Commit)
1. **高频原子存档**：跑通一个可验证的小节点，立即执行一次 `git commit`。一旦后续发生逻辑漂移，一键 `git reset` 回退，杜绝大爆炸式改动；
2. **审计清单**：`git diff` 严格核查是否有越界文件、是否有硬编码密钥、是否引入了多余第三方包。

### Step 5: 经验永续与防线下沉自迭代 (Archive & Self-Iterating)
1. **1:1 需求双向回溯对账 (Bidirectional Checkoff)**：
   - 在最终交付报告中，必须将最终交付物与 Step 0 立案的 1:1 RTM（REQ-01...N）逐条对账，并附带退出码 0 与 [Measured] 凭证；
2. **任务结束后强制 Agent 主动认知审计**：
   - 以机械机检 Exit Code 0 为基底（第一步），Agent 必须以独立敌手身份主动寻找代码漏洞、盲区与未覆盖边界（第二步），严禁消极放行与形式主义打勾；
3. **逆向举证门禁与非平凡任务缺陷指标 (Negative Proof Gate & Mandatory Adversarial Quota)**：
   - 严禁 0 缺陷消极放行：对非平凡工程任务（涉及逻辑增改、状态转移或契约变更），审计报告若宣称“0 缺陷 / 0 问题 / 完美通过”，触发 `ZERO_FINDING_SUSPICION` 熔断并驳回；
   - 逆向举证义务：审计智能体必须提供至少 1~2 项已证实的边界证伪攻击记录（证实系统在反向攻击下具备合法防御），或提供 1 项经变异注入验证杀伤力的测试见证；
   - 裁执隔离（Fresh Auditor by Default）：审计必须由全新派发的独立子 Agent（`Model='pro'`, `Workspace='branch'`）执行，施工 Agent 无权签署发布放行；
   - 纠错两次即立项为硬门禁（Two-Strike Machine Escalation）：凡人工 Review 纠正两次的问题，严禁停留在 Prompt 散文说教，必须机械化下沉为带真实退出码 1 的 AST / Lint 规则或测试断言；
4. **对抗式红队审查 (/interrogate)**：针对极端边界、并发竞态与接口降级进行对抗式挑刺，全绿后准出；
5. **规格校验与归档**：
   ```bash
   npx openspec validate --all --strict
   npx openspec archive -y <change-name>
   ```
6. **终审强制挂载复盘提案**：交付总结必须三位一体（1:1 需求核销 + 过程摩擦复盘 + 防线下沉提案），单列《执行期遇到问题与阻力清单》与《避免复发的长效防线下沉改进方案》，并附带可一键授权执行的加固动作；
7. **防线下沉自迭代机制（Self-Iterating Defense Escalation）**：
   每当在内环施工或人工 Review 中捕获到一个 Agent 的错误，**严禁仅在当前代码打补丁了事**，必须执行**防线下沉自问规程**：
   - **能下沉到 L1 吗？** ➔ 能否通过显式状态机或 TypeScript 泛型约束，让这个错误在编译时就报错？
   - **能下沉到 L2 吗？** ➔ （**黄金法则**：同类错误纠正两次，立刻写成一条带有正向修复提示的 ESLint 规则或编译拦截脚本）；
   - **能下沉到 L3 吗？** ➔ 若无法写成 AST 规则，是否需要在 `AGENTS.md` 中增加封闭作用域的正向准入规范？
   - **闭环记录**：在 `CHANGELOG.md` 中沉淀本次踩坑根因、解决解法以及下沉后的防御加固点。
8. **人机纠错后主动自增补规程 (Autonomous Spec & Audit Gate Co-Evolution)**：
   - 用户指导纠正问题后，严禁就地修补代码即止；
   - 必须主动探测项目既有规范与审计指导文档（无论命名形式）；
   - 执行三位一体自增补：① 活化规范增补 RFC 2119 契约条款；② 审计手册增补失效模式案例与核验步骤；③ 机器门禁增补（Build the Lever：自动化单测/脚本，保证 Exit 1 阻断力）；
   - 增补资产提交后晋升为后续任务的永久法定基准。

---

## 🔒 四、 核心法定不变量 (Operating Invariants)

1. **规格高于代码**：系统行为以 specs 规格定义为法定准则，严禁先改代码再补写规格。
2. **既有逻辑与业务规范不可否定公理**：既有业务逻辑皆为法定事实，严禁凭大模型通用常识或代码洁癖擅自修改、删除既有逻辑。
3. **源码级防篡改封印标记机制**：`@ANTIGRAVITY_INVARIANT_LOCK` 标记块享有最高只读豁免权。
4. **正向行动化表述准则**：严禁“粉色大象”负向禁令，一律使用封闭作用域与明确正向准入规则。
5. **最小因果集与保留现状**：改动严格限制于当前任务闭环链路，无关异样保留现状 (Leave-as-is)。
6. **真实退出码充要公理**：任务打勾必须以测试命令终端真实退出码 0 与真实绿灯日志为充要条件。
7. **双重人工授权与验收归口**：动工前双清单门禁授权 + 交付后人工终审验收。
8. **问题与解法沉淀 (CHANGELOG 闭环)**：每次任务必须沉淀根因与解法。
9. **专用领域工具链与专属引擎唯一路由公理**：严禁绕开官方流水线直接修改底层产物。
10. **防线下沉自迭代公理**：禁止同一个错误重复依靠人眼盯防两次，必须机械化下沉固化到金字塔低层。
11. **Poteto 委派双公理与零信任验收公理 (Consolidated Scope & Zero-Trust Axiom)**：向子 Agent 派发任务默认采用全新 Subagent (Fresh by Default)，严禁口头随口压缩，必须封装为全量合并简报 (Consolidated Scope) 与退出码 0 约束；主 Agent 充当高维中枢并保持上下文屏蔽盾 (Context Shielding)，接收汇报后必须在主环境亲自复测验收。
12. **防退化三阶七律法典 (Anti-Regression Charter)**：彻底根治“修新坏旧”顽疾，严格执行断言先行、黄金标本库、策略开闭隔离、源码封印机防、最小因果集、全谱系全量回归强校验与防线下沉闭环迭代，全量回归全绿是交付的唯一充要依据。
13. **通用深度审计法：双轴四阶红队审讯体系 (Universal Deep Audit Charter)**：彻底终结“盲目出结果”与虚假合格，融合 @poteto 的“实物真实验证 (Prove It Works)”与“红队多视角审讯 (/interrogate)”，强制推行垂直穿透轴（输入指纹冻结 + 100% 实体穿透率对账）与水平防护轴（底层 AST 机器机检 + 物理隔离红队审讯 + 黄金标本全量回归），证据严格分级为实测/推演/猜想。
14. **通用工程与工作流审计规范 (Universal Engineering & Workflow Code)**：从纯编程、开发与工作流视角构筑四大支柱：类型层（非法状态不可表达/禁止静默降级）、测试层（变异测试自审/全结构纯净度断言/弱断言零容忍）、架构层（严格策略开闭隔离/不可变数据流/纯函数）、工作流层（裁执分离/施工者不得动测试/零信任交接胶囊）。
15. **跨线程任务发布法定绑定 ps-openspec 公理 (Mandatory ps-openspec Binding Axiom - 跨线程绝对入轨铁律)**：任何线程只要向跨线程或子 Agent 派发任务，指令首行必须强制声明并注入 `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`，强制接收方必须读取 `pstack-openspec` 技能入轨执行（严格落实 Step 0-5 闭环、双清单确认门禁、源码级封印保护、出厂去噪与退出码 0 实测证据）；接收方脱轨交付直接一票否决，接收方收到无轨道口头指令必须主动要求补齐标准胶囊。
16. **用户反馈质疑与否定第一时间根因归因与递归自改进强制公理 (Feedback-Driven Root-Cause & Recursive Self-Improvement Axiom)**：任务执行后，凡用户对产出提出质疑、否定、不满意、遗漏指责或指出旧疾复发，必须无条件第一时间停机，启动 5-Whys 深度根因穿透（排查感知漏洞、规格漏洞、盲目审计漏洞、修新坏旧）；制定系统性杜绝复发方案，并**递归反哺更新 ps-openspec 与 GEMINI.md 规则库**，推送 Git 同步记忆。以会话 `7f4d4b46-78e6-435a-aa29-f0d6ec194caa` 为法定警示与参照（严禁盲目审计、不提醒就看不出、排版标点违章与旧疾复发）。
17. **Spec-Kit 需求零损耗与双阶段法定门禁公理 (Spec-Kit Zero-Loss Traceability & Dual-Gate Authorization Axiom - 防需求逐级蒸发铁律)**：
    - **零损耗立案**：用户提出的全部多项编号原子诉求（如 1、2、3、4），必须 1:1 完整入轨，形成需求追溯矩阵（RTM），严格保证项数对齐 $N_{\text{raw}} \equiv N_{\text{RTM}}$，严禁擅自合并、删减或口水化精简；
    - **法定双门禁机制**：
      ① **【门禁 1 (需求全量确认)】**：提取需求后呈报《需求全量追溯备忘录（详细版，严禁精简）》，必须严格停等用户确认后，方可进入方案设计；
      ② **【门禁 2 (思路与双清单确认)】**：完成 ps-openspec 架构扩展后，呈报架构思路与双清单（拟变范围 + 保持现状承诺），必须严格停等用户明确确认授权（“执行/同意”）后，方可动工写代码；
    - **单焦点专注锁**：施工阶段执行严格单任务专注锁（`[-] lock`），在任意时刻仅允许单个任务处于开发进行中状态；未完成真实验证与退出码 0 打勾前禁止多线抢跑；
    - **双向验收对账**：交付总结中必须附带 1:1 需求追溯矩阵的终审对账表，确保初始每一项诉求皆有真实凭证与命令实测闭环。

---

18. **Lint 与编译规则最高强制阻断与反逃避公理 (Strict Lint & Compiler Enforcement & Anti-Suppression Axiom)**：
    - **最高一票否决权 (Layer 2 Hard Blocker)**：Lint 与编译/类型检查规则在工程体系中处于非协商最高执行地位。严格实行**零警告、零错误（Zero Warnings, Zero Errors）**，检测命令必须带 `--max-warnings=0` 或 strict 模式；任何一条 Lint 警告在效力上等同于编译崩溃，直接触发一票否决，绝对禁止进入下一步或标记完成；
    - **源码级反规避与反逃避绝对禁令 (Anti-Suppression Charter)**：
      - 严禁 Agent 在代码中擅自使用 `// @ts-ignore`、`// @ts-nocheck`、`// @ts-expect-error`、强制类型断言（如 `as any`、`as unknown as X`）或 `/* eslint-disable */`、`// eslint-disable-next-line` 强行压制报错；
      - 若确因外部不可抗力（如第三方包类型损坏）需临时豁免，必须在 OpenSpec 提案中显式单列理由并获得用户明确审批，未经授权添加逃避注解一律视为破坏代码库完整性；
    - **单任务专注锁（`[-] lock`）前置解除绑定**：当前进行中任务解除专注锁打勾 `[x]` 的充要条件，必须同时包含功能测试通过与 Lint/编译真实退出码 0 的 `[Measured]` 绿灯凭证，红灯时任务严格锁死在 `[-]`；
    - **纠错两遍立项机检下沉法定化**：同类排版、语法或接口问题在人工 Review 中纠正达到 2 次，必须强制立项下沉为一条带正向修复提示的 ESLint / AST 机械化拦截规则，未完成下沉固化严禁关闭变更；
    - **跨线程零信任前置机检**：跨线程任务交接胶囊强制注入 Lint / Build 退出码 0 验证命令；主 Agent 接收汇报时恪守零信任原则，必须在主上下文第一步复测编译与 Lint 退出码 0。

---

19. **测试断言隔离与反局部过拟合公理 (Verifier Isolation & Anti-Patching Axiom - 防假通作弊铁律)**：
    - **裁执物理隔离**：验证平面（测试用例集与黄金标本）与施工平面（业务代码）严格物理隔离，测试集定义代码不在 Agent 可写范围之内，严禁为绿灯而篡改断言或放宽公差；
    - **严禁局部假特判硬编码**：严禁针对特定测试输入编写局部假特判（如 `if (raw_input === 'XYZ') return special_val`），一经发现直接判定虚假合格一票否决；
    - **广义化泛化检验**：所有转换与核心逻辑必须通过参数化测试与隐式/变异用例检验，确保算法具备通用泛化能力。

---

20. **缺失显式建模与反防御性捏造公理 (Explicit Missing States & Anti-Fabrication Axiom - 防脑补默认值铁律)**：
    - **缺失与否定语义严格正交**：类型与业务逻辑层，“未提供/未知 (Unknown)”与“假/否定 (False)”或“不适用 (N/A)”严格不等价，必须显式区分（显式 Option / Result / 枚举建模）；
    - **反防御性捏造禁令**：严禁编写类似 `val || '未检出'`、`val || default_value` 或 `if (!x) return '符合'` 等防御性掩盖代码；严禁在缺乏事实依据时主观臆想填补兜底默认值；
    - **显式上抛与标记**：遇到缺失或未定义字段，必须显式标记为 UNKNOWN 或向上抛出异常，杜绝制造虚假的“完整性”。

---

21. **环境见证硬核回滚与自纠错公理 (Env-Authored Witness & Auto-Rollback Axiom - 外部系统见证铁律)**：
    - **拒绝自说自话自证清白**：系统验证严禁依赖 Agent 自述，必须由环境见证者（真实的终端进程、编译器、测试套件）生成外部不可篡改的凭据（真实退出码 0 + stdout/stderr 日志）；
    - **原子回滚与反脏状态堆叠 (Aider-style Rollback)**：单步任务出现 Lint / 编译红灯或行为测试崩溃时，严禁在脏工作区上持续盲目堆叠新补丁；必须立即触发原子回滚（Git checkout / reset），退回至最近验证通过的干净基线；
    - **两撞墙求助硬门禁联动**：连续两次回滚仍未通过者，强制触发全网智能搜索与人工求助，严禁第三次盲目尝试。

---

22. **事实指纹锚定与 100% 溯源溯因公理 (Ground-Truth Anchoring & 100% Fact Provenance Axiom - 防削足适履与意图蒸发)**：
    - **输入事实指纹冻结**：任务 Step 0 阶段即对原始输入文本、关键源文档计算并冻结不可篡改的事实指纹（Fact Fingerprint / Hash Digest）；
    - **100% 事实溯源链 (Fact Provenance)**：在提取、匹配、排版装配、翻译与派生全流程中，输出结果中的每一个事实实体与字段值必须具备明确的源头溯源引用，严禁削足适履式截断截短、严禁将核心意图稀释蒸发；
    - **物理级指纹清算核销**：终审交付时，最终输出事实集必须与初始输入事实指纹进行 1:1 双向物理对账核销，任何事实遗漏、偷换概念或无源捏造均构成交付一票否决。
---

23. **方法论原子技能与 Graph 拓扑布控公理 (Methodology Skills & Graph Governance Axiom - 方法论下沉与图谱布控铁律)**：
    - **最高总纲与方法论下沉分离**：Ps-openspec 作为顶层唯一法定总纲统揽全局生命周期；所有具体执行层面的方法论（工作流开发方法论、UI/UX 设计方法论、测试驱动方法论等）必须下沉至原子技能操作层（`skills/<name>/SKILL.md`），严禁在顶层散漫堆砌具体领域操作细节；
    - **Graph 拓扑关联与快速寻路**：必须通过 Graph（Code Review Graph / Route Map / Invariant DAG）建立任务特征、代码模块与方法论技能的拓扑连接；Agent 依托 Ps-openspec 接收任务后，必须第一步通过 Graph 进行方法论技能的快速穿透寻路与精准绑定；
    - **Graph 爆炸半径与门禁布控**：方法论技能的调用必须受控于 Graph 划定的爆炸半径（Blast Radius）；方法论规定的所有硬核检验指标必须通过 Graph 映射为 tasks.md 的机检命令与门禁阻断，确保方法论落地具备外部系统见证力。
---

24. **通用深度审计六阶高强制性防御公理 (Universal Deep Audit & Anti-Fraud Axiom - 防假通作弊与机械逃避铁律)**：
    - **考卷绝对只读与防篡改 (Verifier Isolation)**：验证平面（测试集与黄金基线）享有最高只读豁免，严禁 Agent 为绿灯私改测试断言或删除用例；改动测试直接触发 `VERIFIER_TAMPERING_DETECTED` 熔断并原子回滚；
    - **变异元审计不可逃避 (Mutation Sanity)**：测试套件必须具备变异杀伤力，在注入反例变异体时必须变红；变异下仍报 exit 0 一律判定为弱断言欺诈，锁死任务执行锁；
    - **换位敌手红队审讯 (Adversarial Red-Team)**：交付前必须由全新独立的 `pro` 算力子 Agent 担任红队审讯官，执行真实破坏性测试并出具抗攻击日志；
    - **负向防御用例底线 (Negative Test Ratio $\ge 30\%$)**：严禁仅测单一正常流程，负向防御用例占比必须 $\ge 30\%$ 并显式断言受控拒绝；
    - **事实指纹 100% 物理核销 (Fact Provenance)**：终审清算表必须与初始事实指纹 1:1 逐字逐项对账核销，缺少物理凭证直接驳回；
    - **人机双钥匙准出 (Human Tactile Gate)**：必须通过 `vscode-review` 由人类完成原生 Diff 触觉终审，严禁跳过人工把控静默合流。
---

25. **智能体执行层元归因与 Ps-openspec 体系化根治公理 (Agent-Execution-First Meta-Problem Framing & Ps-openspec Resolution Axiom - 绝对领域中立与元抽象铁律)**：
    - **绝对领域中立与反个案具象化禁令**：理解任何异常、回归、偏离、质检缺陷或代码异样时，严禁代入具体业务场景名相、单个输入样本标本（Single Input Specimen / Sample Vector）或局部交付物排版/视觉表征（Surface Representation）；
    - **强制升维至 Agent 智能体执行与状态转移元失效模式**：必须第一时间将问题穿透抽象为 Agent 在自主执行生命周期中的机器行为模式缺陷：
      - **贪婪局部过拟合（Greedy Local Overfitting）**：Agent 为追求单步执行绿灯，将特定输入向量硬编码为常量，绕开泛化状态转移管线；
      - **控制流死分支遮蔽（Dead-Code Shadowing）**：Agent 在已有控制流前盲目插入等价前置条件，导致通用动态分支发生可达性阻断；
      - **裁执不分与弱断言欺诈（Trivial Assertion Fraud）**：Agent 兼任验证者时自发降低 Oracle 判定阈值，将事实正确性退化为浅层词汇/符号存在性检查，制造虚假退出码 0；
      - **宏观统计学度量欺骗（Macro-Statistical Evading）**：Agent 以全局长度、字符保全比或粗粒度相似度掩盖微观实体的颠覆性替换与事实蒸发；
    - **唯一通过 Ps-openspec 体系化机械根治**：解决问题必须且唯一通过 Ps-openspec 顶层治理架构（Step 0 事实指纹实体哈希冻结、Step 1-2 承重墙契约与双清单物理围栏、Step 3 验证平面只读隔离与单焦点执行锁、Step 4 自动化变异元审计与独立 Pro 敌手红队审讯、Step 5 1:1 实体级物理核销与人机双钥匙终审、以及防线下沉自迭代闭环）实施机器级硬阻断，从架构几何、类型系统与执行门禁上彻底剥夺 Agent 再次产生此类行为模式的空间。
---

26. **两阶双轨深度审计公理 (Two-Step Dual-Scope Deep Audit Axiom - 机械审计与智能体认知审计双阶治理铁律)**：
    - **机械审计与认知审计分阶解耦**：机械审计为第一步硬门禁（验证平面隔离、真实退出码 0、变异杀伤力），智能体规范审计为第二步语义把控（独立全新 Auditor Subagent 执行对抗式证伪），严禁单一依赖机械 exit 0，严禁自施工自审；
    - **全局规范与局部规范双轨核销**：必须严格将项目级全局规范（宏观承重墙与不变量）与模块级局部规范（微观契约与状态边界）拓扑分流，出具项数绝对守恒（$N_{\text{Global}} + M_{\text{Local}}$）的微观物理对账清算表；
    - **对抗式反向证伪与物理锚定**：每一项规范审计必须包含代码绝对行号区间锚点与证伪攻击记录，严禁口水化伪对账；
    - **人机双钥匙准出充要条件**：机械全绿（钥匙 1）+ 智能体规范核销全绿（钥匙 2）= 触发 VS Code 原生 Diff 人类终审（准出充要条件）。
---

27. **执行摩擦动态存证与防线下沉复盘公理 (Execution Friction Journaling & Defense Escalation Retro Axiom - 防短视修复与静默吞没铁律)**：
    - **施工期摩擦不可篡改动态存证**：单任务执行期间（`[-] lock`），凡经历测试红灯重试、环境异常、未预期依赖断裂或脆弱断言，必须在工作记忆或任务日志中实时生成 `[Incident]` 存证，严禁静默吞没调试痕迹与系统摩擦；
    - **交付期终审强制挂载复盘提案**：任务终审交付报告必须三位一体（1:1 需求核销 + 执行摩擦复盘 + 防线下沉提案），单列《执行期遭遇问题与阻力清单》与《避免复发的长效防线下沉改进方案》；
    - **四阶防御下沉闭环推进**：针对捕获的每一个摩擦点，必须顺着 Lauren Tan 信任金字塔提出可落地的下沉方案（L1 类型状态机、L2 静态 AST/Lint 拦截、L3 封闭宪法、L4 变异反例测试），严禁“只解当前、不防后续”的短视创可贴修复；
    - **可执行加固动作一键授权**：必须输出明确的后续加固待办动作，经用户一键授权即可原地执行资产固化，使代码库获得永久免疫力。
---

28. **状态合法性因果溯源与反症状修补公理 (State Legitimacy & Anti-Symptom-Masking Axiom - 反脚痛医脚铁律)**：
    - **状态合法性二分判定公理 (State Legitimacy Dichotomy)**：当调用宿主/消费端（Consumer Sink）触发异常或未预期状态时，必须首先判定该状态在系统领域模型中是否具有合法性：
      - **合法状态（Legitimate State）**：状态在系统合法域内，但下游逻辑未予以处理 ➔ 当前宿主为真实根因（Root Cause），允许在此补充合法处理分支；
      - **非法状态（Illegitimate State）**：状态在系统正常契约下根本不应存在（如必填字段缺失、无效枚举、脏格式） ➔ **严禁在崩溃宿主处进行任何形式的就地防御性掩盖（Symptom Masking / 脚痛医脚）**，必须逆向穿透调用栈与数据流，追溯至生成该非法状态的源头（Origin Producer）进行根治；
    - **五大受限症状掩盖反模式绝对禁令 (Five Forbidden Symptom-Masking Anti-Patterns)**：
      ① **零星防御性守卫 (Scattered Guards)**：严禁在业务链路深处散落 `if (!x) return;` 或 `if (item == null) continue;` 掩盖上游契约违约；
      ② **静默吞没异常 (Swallowed Errors)**：严禁编写空的 `catch (e) {}` 或将致命异常降级为无动作日志；
      ③ **强制夹紧与篡改 (Clamped / Coerced Values)**：严禁在消费端使用 `Math.max/min` 强行截断越界值，严禁使用 `val || default_value` 伪造假兜底；
      ④ **静默丢弃残缺状态 (Discarded State)**：严禁在未向系统报警的情况下静默过滤、丢弃无法解析的数据实体；
      ⑤ **霰弹式重复校验 (Shotgun Validation)**：严禁在信任域内各层反复编写同质化防空校验，彻底违背类型系统保障；
    - **边界解析与内部纯粹信任 (Parse, don't validate)**：外部不可信数据必须在系统物理边界（Boundary / Ingestion Layer）完成类型解析与结构化合法性构筑；一旦越过边界进入核心领域逻辑，必须拥有强类型保证并完全信任，严禁在内层业务函数编写防御性兜底；
    - **快速失败原则 (Fail-Fast Principle)**：一旦检测到非法状态或数据违约，系统必须立即在距离源头最近的位置主动抛出受控致命异常或拒绝响应，严禁携带脏状态向后污染；
    - **门禁 2 拟变清单因果位置自证与硬阻断 (Causal Role Self-Proof & SINK_PATCHING_BLOCKED)**：
      在【门禁 2 拟变范围清单】中，所有拟修改的文件与函数必须显式标注其在因果图谱中的角色：`[Root Source]`（故障源头生成器）、`[State Transition]`（中间状态流转管线）或 `[Consumer Sink]`（末端消费崩溃宿主）。**若拟变清单中仅包含 `[Consumer Sink]` 而未触及或证明 `[Root Source]`，门禁直接触发 `SINK_PATCHING_BLOCKED` 熔断驳回，严禁开工**；
    - **变异杀伤力检验与伪通熔断**：反症状修补方案必须通过反例变异测试验证，证明非法输入在源头即被硬阻断，而非在末端被隐式吸收。
---

29. **通用程序防篡改与机制策略物理隔离公理 (Generic Asset Anti-Tampering & Mechanism-Policy Separation Axiom - 反单任务污染通用资产铁律)**：
    - **机制与策略物理隔离公理 (Separation of Mechanism & Policy)**：通用程序/底层引擎（Generic Engine / Tool Asset）为系统共享基础设施，只提供通用执行机制；单次任务的业务特化逻辑属于策略，必须由外部调用端或适配器承载，绝对禁止将策略逻辑反向注入通用程序内部；
    - **通用能力演进与单任务特化二分判定 (General Evolution vs. Task Specialization)**：
      - **调用端适配优先（Caller Adaptation First）**：凡属单次输入特异性、业务特定字段或数据格式非标问题，一律在调用端做前置适配/清洗，通用程序代码享有最高只读豁免，严禁就地涂鸦篡改；
      - **通用演进四严律（Four Laws of General Evolution）**：凡属通用程序核心功能不足需升级，必须严格遵循四严律：① 零单任务特异标识与特判硬编码；② 抽象参数化与策略注入；③ 历史调用方 100% 零退化与向后兼容；④ 广义化多参数与变异测试见证；
    - **门禁 2 通用性自证与硬阻断 (TASK_SPECIFIC_POLLUTION_BLOCKED)**：
      在动工前呈报的【门禁 2 拟变范围清单】中，凡涉及通用底层程序的改动，Agent 必须显式完成“通用性自证”。若检测到试图通过局部特判硬编码来迁就当前单步任务，门禁直接触发 `TASK_SPECIFIC_POLLUTION_BLOCKED` 阻断，一票否决；
    - **基座承重墙契约不可弱化禁令**：严禁 Agent 为使当前任务通过而擅自删改通用程序的校验逻辑、降低防御公差或注释异常阻断；
    - **广义化泛化检验为充要条件**：对通用程序的任何改动，必须通过多场景参数化测试与变异测试，证明其在广义域内有效且保持历史调用方 100% 零退化回归。
---

30. **用户规范全量通读与任务后主动认知审计公理 (Mandatory User-Specification Ingestion & Active Post-Task Agent Audit Axiom - 严禁漏读与主动找茬铁律)**：
    - **用户规范与方案全量通读公理 (Zero-Omission Ingestion of User Standards)**：无论主智能体还是派发的子智能体（Subagent），凡用户在交互指令、参考文档或提示词中提供了正确做法、官方规范、参考标本或审计方案，动工前必须 100% 逐字全量阅读并建立不可篡改的对账基准；绝对严禁凭大模型通用常识脑补、绝对严禁粗粒度略读或截断遗漏；
    - **双阶结合与主动找茬公理 (Two-Step Audit with Active Bug Hunting)**：
      - 机械审计（编译、类型、静态检查、自动化测试）真实 Exit Code 0 仅作为准入的**第一步底座（必要条件）**；
      - 任务交付前，Agent 必须强制执行**第二步认知审计（充要条件）**：Agent 必须彻底摆脱消极打勾心智，以独立敌手身份**“主动去挑刺、主动去找问题”**（穷尽状态机死锁、极限边界变异注入、负向空间缺失审计、未捕获异常与资源泄漏推演）；
      - 任何未经历 Agent 主动找茬证伪攻击、仅凭机械 Exit Code 0 交付的成果一律视为“未完成审计”并一票否决；
    - **跨智能体全量穿透约束 (Universal Agent Enforcement)**：该公理对全系统所有智能体（主智能体、后台子智能体、跨线程智能体）具备绝对穿透效力；跨线程交接胶囊强制注入用户规范基准与任务后主动审计检查项。
---

31. **变异反欺诈与逆向举证深度审计硬门禁公理 (Mutation Anti-Fraud & Negative Proof Deep Audit Axiom - 反形式主义自审与假通铁律)**：
    - **变异元注入反欺诈门禁 (Mutation Sanity Gate & TRIVIAL_ASSERTION_FRAUD)**：
      任何测试套件与自动化验证流程必须具备真实的变异杀伤力。系统在准出前自动或受控注入反例变异体（如反转条件表达式、短路核心断言、替换关键返回值）；若测试套件与审计流程在变异体侵入状态下依然输出 Exit Code 0 或绿灯判定，系统直接判定为弱断言欺诈（`TRIVIAL_ASSERTION_FRAUD`），任务执行锁（`[-] lock`）坚决锁死，一票否决；
    - **逆向举证与强制找茬配额门禁 (Negative Proof Gate & Mandatory Adversarial Quota)**：
      彻底终结“0 缺陷消极放行”的形式主义假审计。在任何非平凡（Non-Trivial）任务的交付前，审计 Agent 必须强制出具至少 1~2 项主动构造的证伪反例攻击记录（包含具体的执行命令、非预期崩溃/异常表现、以及系统边界防御见证）。凡未出具对抗性证伪反例、仅凭口水化“无问题”宣称的审计报告，直接视为无效并驳回；
    - **裁执物理死锁与 Pro 算力敌手审讯 (Fresh Pro Auditor Enforcement)**：
      施工 Agent 仅拥有代码编写权，被底层系统在物理上剥夺任务自审打勾与终审准出权；终审必须派发全新的独立子智能体（`Model='pro'`, `Workspace='branch'`），加载 `/interrogate` 敌手剧本，以推翻施工假设、攻击极端边界为唯一目标执行敌手审讯；
    - **用户规范两碰立项机器化下沉公理 (Two-Strike Machine Escalation Axiom)**：
      严禁将人类指出过的错误长期停留在 Prompt 劝诫层面。凡用户在交互或审阅中指出达到两次的同类执行偏差或审计漏洞，必须在该会话或变更生命周期内，强制将其转化为具体的、具备真实 Exit 1 阻断力的机器机检资产（AST/Lint 规则、预提交钩子或参数化变异测试用例）。
32. **智能体自动编组与四位一体任务交接公理 (Autonomous Subagent Swarm & Four-in-One Handoff Axiom - 默认自动派发与裁执物理隔离铁律)**：
    - **主协调智能体默认自动编组公理 (Auto-Dispatch by Default)**：
      接收用户任务指令的主协调智能体（Main Agent / Coordinator）定位为宏观架构师与终审裁决者，严禁亲自下场直接编写或修改业务代码；默认必须将具体施工执行任务自动编组、派发给执行子智能体（Executor Subagent）执行，主 Agent 保持高维清爽视野与全局审计定力；
    - **智能 Subagent 复用判定决策树公理 (Subagent Reuse vs. Fresh Decision Tree)**：
      在派发任务前，主 Agent 必须首先调用 `manage_subagents(Action='list')` 探查当前活跃的 Subagent 列表与生命周期状态：
      ① **状态延续性复用 (`send_message`)**：唯独当后续工作严格属于当前子智能体正在执行的未完结同一任务断点、或者子智能体持有未落盘且不可轻易迁移的瞬态开发环境（如挂载中的 Git 工作分支、正在运行的本地常驻测试服务/进程）时，方可通过 `send_message` 消息队列直接复用该 Subagent；
      ② **干净独立全新默认原则 (`Fresh Subagents by Default` via `invoke_subagent`)**：凡属新任务、重构任务、排错转向、或前序失败重试，一律强制启动干净的全新 Subagent（`Workspace='branch'`），严禁在被海量错误日志污染的长上下文中击鼓传花；
    - **四位一体任务交接胶囊公理 (Four-in-One Lossless Handoff Capsule)**：
      主 Agent 向 Subagent 派发任务时，严禁用随口大白话口水化压缩，必须 100% 封装四位一体不可精简交付胶囊：
      ① `ps-openspec`: 架构法定规格（OpenSpec 增量提案、RFC 2119 specs 规范、单任务专注锁 `[-] lock` 条目及真实 Exit Code 0 验收命令）；
      ② `skill`: 显式绑定的执行方法论与操作技能（如 `pstack-openspec`, `unslop`, `tdd` 等）；
      ③ `上下文 (Context)`: 物理可读写文件白名单、只读承重墙与 `@ANTIGRAVITY_INVARIANT_LOCK` 封印约束、基准 Commit SHA 及冻结的事实指纹；
      ④ `提示词 (Prompt)`: 聚焦单一职责、带明确非目标（Non-Goals）、无歧义的执行指令；
    - **主动回传任务完成报告与响应式审计唤醒公理 (Active Completion Report & Reactive Wakeup)**：
      执行子智能体施工完毕后，必须主动向主协调智能体发送标准化《任务完成报告》（包含真实修改文件清单、`[Measured]` 真实命令退出码 0 日志凭据、变异测试杀伤记录、以及未解决的环境摩擦阻碍）；主协调智能体通过系统底层响应式事件自动唤醒并接管，严禁主 Agent 采用任何形式的轮询或等待死循环；
    - **裁执物理隔离与系统改动权限封锁公理 (Verifier-Only Merge Authority & Workspace Sandboxing)**：
      执行子智能体必须严格运行在隔离的分支工作区（`Workspace='branch'`）中，物理剥夺其直接对主系统工作树实施破坏性直改或自主合流的权限；系统主干代码合流与最终生效权严格且唯一归属于主协调与审计智能体，在完成两阶双轨全方位审计且真实复测退出码 0 验证通过后方可执行合流。

33. **通用工程防伪执行与拓扑零退化公理 (Universal Engineering Anti-Phantom & Structural Fidelity Axiom - 六大通用工程法定铁律)**：
    - **反伪执行与快速失败机制 (Zero-Unverified-Effect & SILENT_NO_OP_FRAUD)**：
      严禁在操作原语或业务执行函数中基于猜想假设编写静默逃逸分支；凡接收到不符合前置契约的异常输入，必须立即主动抛出致命异常（Fail-Fast），绝对禁止静默 return 或吞没错误；任何声称修改数据状态的原语，其验收充要条件是必须提供差分单测见证（证明前态不满足、执行后跃迁为期望状态），无差分见证的原语一律判定为伪执行欺诈并一票否决；
    - **原子洁净构建与边界隔离铁律 (Clean Construction & Zero-Boundary-Leakage)**：
      动态扩充有序集合或拓扑树时，严禁通过直接深拷贝既有填充节点创建新元素；新节点必须由洁净构造器（Clean Constructor）原子实例化；若派生自原型，必须在进入集合前执行显式特异性状态净化（Sanitization），剥离末尾边界标记、特异索引与局部缓存，杜绝脏状态向后扩散；
    - **同构集合单轨生成与零方差铁律 (Single-Pipeline Invariance & Zero-Variance Assembly)**：
      同一逻辑父级下的同构数据集合，必须且唯一由单一正规化管线（Canonical Pipeline）单轨生成，严禁“部分复用旧残留 + 部分裸生成”的双轨拼装；集合内所有对等元素的微观控制属性（缩进、间距、度量）在统计上方差必须严格为 0；展现层属性必须由结构元数据承载，严禁在数据文本中注入补丁字符模拟排版；
    - **源拓扑保真与反投机性结构拟造铁律 (Source Topology Invariance & Anti-Speculative-Synthesis)**：
      数据转换管线的输出拓扑必须严格服从输入源的物理拓扑几何；严禁 Agent 凭借大模型预训练常识、语义联想或所谓经验，在目标结构中投机性拟造源输入不存在的容器层级、前言行或独立嵌套；语义关键词仅为节点值，严禁因值内容触发容器结构的非预期膨胀；
    - **契约槽位非空与实体属性防漂移铁律 (Mandatory Slot Completeness & Anti-Attribute-Drift)**：
      数据模型必须显式定义必填端点槽位（Mandatory Terminal Slots）；在生成与交付阶段，核心必填槽位若解析为 null、undefined 或空白，系统直接触发 `EMPTY_MANDATORY_SLOT_BLOCKED` 致命熔断并驳回，严禁静默空置；实体属性必须严格绑定在指定槽位，严禁向相邻节点溢出拼凑；
    - **终端物理叶子节点穿透式审计铁律 (Terminal Leaf-Node Deterministic Audit)**：
      自动化测试与认知审计必须直接穿透至数据模型最底层的离散叶子节点与精确物理属性值；严禁将进程退出码 0、函数被调用过、字符串包含或全局宏观统计学度量作为功能合格的依据；未断言到物理叶子属性变更与离散事实值一致性的审计一律判定为形式主义伪审计，一票否决。

34. **人机协同纠错后规范与审计门禁主动自增补公理 (Autonomous Spec & Audit Gate Co-Evolution Axiom - 严禁止步于就地修补铁律)**：
    - **就地修补片面性绝对禁令 (Anti-Patch-and-Forget)**：
      在任何工程任务中，凡用户介入指出缺陷、提出质询或提供纠偏指导，Agent 在定位根因并修复业务代码后，严禁宣称“任务已完成”并就地终止；代码修复仅为最底层必要动作，未完成项目规范与审计门禁的主动同步增补，一律判定为未交付闭环；
    - **项目规范与审计指导文档模糊探测机制 (Fuzzy Probing of Project Guidance)**：
      Agent 必须在项目上下文、根目录及文档目录中，主动探测并识别项目既有的规范、标准、约定或审计指导文件（无论命名为 `specs/`、`docs/`、`guidelines/`、`standards/`、`audit_guide.md`、`qa_rules.md` 或其他非标命名的指导性文档）；若项目缺乏集中规范文档，Agent 主动提请并在标准目录建立 Living Spec 规范文件；
    - **三位一体主动自增补规程 (The Trinity Self-Augmentation Procedure)**：
      在问题解决后，Agent 必须无需用户催促，主动发起并向用户呈报对以下三层资产的增补：
      ① **项目规范条款增补 (Living Specification)**：将本次纠偏的规则提炼为明确的契约条款（RFC 2119 SHALL / SHALL NOT），补充进项目规范文档中，明确定义合法域与非法域；
      ② **审计方法与核验清单增补 (Audit Guidance & Inspection Checklist)**：将本次捕获的失效模式（Failure Mode）、反例形态与挑刺核验步骤，增补进项目的审计指导文档，作为后续人类与 Agent 审计的显式检查项；
      ③ **机器化确定性门禁铸造 (Build the Lever & Deterministic Gate)**：必须将该教训固化为一条可重复执行的自动化测试断言、预提交校验脚本或 AST/Lint 规则（保证在未满足时抛出真实 Exit Code 1），使之具备机器一票否决权；
    - **后续审计永久基准继承 (Permanent Baseline Inheritance)**：
      所有增补的规范条款与审计门禁，经用户 VS Code Diff 终审通过并提交后，立即晋升为该项目代码库的永久法定基准；后续任意会话、任意派发的子智能体（Subagent）在执行涉及该模块的任务时，必须自动读取并执行该门禁，彻底杜绝同类问题在未来的隐蔽复发。

35. **既有法定规范保护、反审计倒置与宪法修改神圣排他权公理 (Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Axiom - 规范高于审计与反特洛伊木马式改宪铁律)**：
    - **规范高于审计与合规免审保护锁公理 (Spec Supremacy & SPEC_IMMUNITY_PROTECTED)**：
      审计权能与立宪权在物理上绝对剥离。测试套件、静态检查工具与智能体认知审计官（Auditor）仅为规范的执行者与见证者，绝无立宪权或释宪权；凡代码实现显式遵循既有项目规范（Living Specification）、处于 `@ANTIGRAVITY_INVARIANT_LOCK` 源码级封印块内、或通过了与基准规范绑定的验收测试，系统立即激活合规免审保护锁（`SPEC_IMMUNITY_PROTECTED`）；任何审计智能体绝对严禁以“过度设计”、“写法冗余”、“不符合通用洁癖”或“主观代码异味”为由将法定规范实现归类为缺陷或错误；违者直接触发审计倒置欺诈熔断（`SPEC_INVERSION_FRAUD`），任务执行锁（`[-] lock`）一票否决；
    - **碧昂丝反向变异守卫测试公理 (Beyoncé Pinning & Mutation Tests - 篡改必红灯原则)**：
      针对系统历史明确规定为正确的业务逻辑、特殊校验与防御分支，必须建立碧昂丝黄金锁定测试（Google Beyoncé Rule: "If you liked it, then you shoulda put a test on it"）；该类测试必须具备反向变异杀伤力（Negative Mutation Kill Rate）：若将该特殊实现篡改为审计器推崇的“通用写法”、“简洁写法”或“直观套路”，自动化测试必须真实抛出 Exit Code 1（硬阻断红灯）；若变异后依然输出 Exit Code 0，直接判定为弱断言伪通并拒绝验收；
    - **切斯特顿之栅因果标签公理 (Chesterton's Fences & Why-Not-Just Labels)**：
      任何非通用、防御性或定制化的既有正确代码，在源码或规范中必须承载切斯特顿三要素标签：① `[Living Spec]` 法定契约编号；② `[Why-Not-Just]` 反向否定反思（阐明为何不能采用看似直观的常规写法，揭示常规写法在极端边界下的致命失效）；③ `[Origin Commit / PR]` 历史演进因果溯源；审计智能体在未能证明“该栅栏当初为何建立且当前环境已使其彻底失去存在价值”之前，绝对禁止提议拆除或简化该栅栏；
    - **规范单调演进棘轮与正式废止议定书 (Monotonic Ratchet & Supersession RFC)**：
      系统规范与质量门禁只允许单调递增演进，严禁静默回退；若确需调整或废止既有历史规范，必须遵循【正式废止议定书（Supersession RFC）】：显式标注已废止、废止根因、替代新规条目，并取得人类在 VS Code 原生 Diff 终审中的明文签署批准；严禁在任何日常业务开发或局部修补任务中隐式废除或绕过旧规；
    - **宪法修改神圣排他权与反夹带隐匿修改公理 (Constitutional Amendment Exclusivity & Anti-Subversive-Trojan Axiom - 严禁特洛伊木马式改宪)**：
      未经人类明确许可，绝对严禁修改宪法（包括 `GEMINI.md`、`GLOBAL-RULES.md`、`AGENTS.md` 及系统顶级宪法级不变量）；绝对禁止将可能对宪法产生的修改、弱化、豁免或变相调整隐匿在某个具体的任务情境中（特洛伊木马式夹带修改零容忍）；所有宪法修改必须严格二选一：① 由人类主动明确提出；② 由 Agent 作为独立最高级【宪法修订提案（Constitutional Amendment RFC）】单独提出并停等人类专属授权；凡在具体业务任务中检测到任何未经人类专属明文批准而触碰宪法文件的行为，系统底层直接触发 `CONSTITUTIONAL_TAMPERING_DETECTED` 致命熔断并原子回滚！

---

## 📚 五、 配套参考指南索引

- 用户反馈质疑与否定第一时间根因归因与递归自改进协议：[`references/recursive-self-improvement-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/recursive-self-improvement-protocol.md)

- 通用工程与工作流审计规范指南：[`references/universal-engineering-workflow-code.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/universal-engineering-workflow-code.md)
- 通用深度审计法：双轴四阶红队审讯体系指南：[`references/universal-deep-audit-charter.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/universal-deep-audit-charter.md)
- Agent 智能体认知审计与双轨规范核销指南：[`references/agent-cognitive-audit-specification.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/agent-cognitive-audit-specification.md)
- 深度审计与认知求证宪章：[`references/deep-audit-charter.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/deep-audit-charter.md)
- 免疫防御宪章：防退化三阶七律法典：[`references/anti-regression-charter.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/anti-regression-charter.md)
- A2A 无损任务交接与胶囊协议：[`references/a2a-lossless-handoff-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/a2a-lossless-handoff-protocol.md)
- 需求澄清与对抗反审协议：[`references/requirements-clarification-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/requirements-clarification-protocol.md)
- Subagent 任务交接与隔离契约：[`references/subagent-handoff-contract.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/subagent-handoff-contract.md)
- 防线下沉自迭代协议：[`references/defense-escalation-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/defense-escalation-protocol.md)
- 24 条工程原则与行为准则详解：[`references/principles-24.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/principles-24.md)
- 科学排错闭环标准规程 (Bug-Fix Loop)：[`references/bugfix-loop.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/bugfix-loop.md)
- 代码净化与 AI-Slop 去噪检查表：[`references/unslop-checklist.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/unslop-checklist.md)
- 对抗式多视角代码审查协议：[`references/interrogate-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/interrogate-protocol.md)
- 双清单门禁标准汇报模版：[`references/double-checklist-template.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/double-checklist-template.md)
- 20+ 核心 Playbooks 目录与索引：[`references/playbooks-catalog.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/playbooks-catalog.md)
