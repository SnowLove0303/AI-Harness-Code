---
name: pstack-openspec
description: "OrbitStack (轨道工程体系): Lauren Tan (@poteto) 的 Pstack 体系与 AI-Harness、OpenSpec 深度咬合的工业级 Vibe Coding 闭环且可自迭代执行方法论。融合了五层信任与防御金字塔（L1架构承重墙/L2静态分析ESLint/L3契约立法/L4自验证Feature Map/L5双清单门禁与人机审阅）、双环驱动引擎（Inner Loop任务微循环/Outer Loop代码库园丁与长程演进）、六步实战闭环SOP（含Spec-Kit零损耗立案与双门禁）、单任务专注锁及踩坑自动下沉自迭代机制（Self-Iterating Defense Escalation）。触发词：orbitstack/orbit-stack/pstack/poteto/poteto-mode/unslop/interrogate/how/why/pstack-openspec/双清单/工业级闭环/自迭代"
---

# OrbitStack 轨道工程体系 (Pstack & AI-Harness & OpenSpec 工业级自迭代方法论)

> **核心哲学**：**Throughput Comes From Trust (吞吐量源于信任体系，而非盲目堆砌 Agent)**。
> **OrbitStack（轨道工程体系）** 将 **Lauren Tan（@poteto）的 Pstack 严密工程准则**、**Hujiale 的 AI-Harness（工程底座与承重墙）**、**OpenSpec（增量立法与规格生命周期）** 以及 **VS Code 原生两栏 Diff 触觉检阅** 深度咬合，构成跨项目、跨任务、具备**自我进化（Self-Iterating）**能力的工业级 Vibe Coding 闭环研发方法论。如同现代航天器进入精确预定轨道，多 Agent 在受控轨道上高通量运行而绝不相撞。

---

## 🏛️ 一、 核心基石：Lauren Tan 五层信任与防御金字塔 (The 5-Layer Trust Pyramid)

在 Vibe Coding 模式下，**严禁仅凭自然语言 Prompt 去约束 Agent**。系统必须自底向上构筑五层梯次防御，越往下沉，防线越硬；一旦上层发生缺陷或偏离，必须自动触发**防线下沉自迭代机制**：

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   【五层信任与防御金字塔 (从强到弱)】                  │
│                                                                        │
│   🧱 Layer 1 (最强硬约束): 代码库与架构承重墙 (Codebase & Architecture) │
│      • 状态机显式建模：使非法状态与非法调用在语法/类型层根本无法表达  │
│      • 源码级防篡改封印：@ANTIGRAVITY_INVARIANT_LOCK 核心代码绝对豁免  │
│      • 专属引擎唯一路由公理：严禁私写脚本绕开官方流水线直接篡改底层    │
│                                                                        │
│   ⚙️ Layer 2 (机器审查门禁): 静态分析与编译器 (Static Analysis & Linters)│
│      • 绝对一票否决权：静态分析与编译为硬阻断承重墙 (Hard Blocker)     │
│      • 零警告零错误原则：强制 --max-warnings=0，任何告警等同编译失败   │
│      • 反逃避法典：严禁 @ts-ignore / eslint-disable / any 压制与绕过    │
│      • 纠错两遍即立项为 Lint：同类错误人工纠正两次，立刻固化为硬规则    │
│      • CI/CD 真实退出码：退出码 0 为打勾充要条件，严禁无凭证自证宣称   │
│                                                                        │
│   📜 Layer 3 (工作流引导): 契约立法与剧本库 (Rules, Skills & Playbooks) │
│      • AI-Harness 4份受管宪法：AGENTS/ARCHITECTURE/FRONTEND/BACKEND    │
│      • AGENTS.md 负向禁令转正向约束：提供封闭作用域与准入准则          │
│      • pstack 23 个标准剧本：任务先匹配剧本，严禁静默跳步 (No Skips)   │
│                                                                        │
│   🎯 Layer 4 (行为取证): 自验证与特征地图 (Verification & Feature Map) │
│      • 拒绝盲目汇报：运行无头浏览器(CDP)、CLI 或自动化脚本自测界面     │
│      • 证据分级标注：严格标明 实测(Measured) / 推演(Inferred) / 猜想  │
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
│ 3. 科学排错五步法 (Bug-Fix Loop)      │      │    • 动态更新 Feature Map 与架构图谱  │
│    • 真实复现 -> 根因假设 -> 证伪回滚 │      │                                       │
│    • 最小修复 -> 绿灯闭环             │      │ 4. 经验永续沉淀 (OpenSpec Archive)    │
│ 4. 触觉检阅与小步存档                 │      │    • 规格严格归档 + CHANGELOG 根因    │
│    • VS Code Diff 原生两栏逐一核对    │      │    • 触发防线下沉自迭代机制           │
│    • 节点跑通立即 Git Commit 存档     │      │                                       │
└───────────────────────────────────────┘      └───────────────────────────────────────┘
```

---

## 🔄 三、 标准六步实战闭环 SOP (The 6-Step Practical SOP)

在 Antigravity 中执行任何开发、重构或排错任务时，必须严格执行以下六步流水线：

### Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1 Detailed Brief)
1. **原始诉求逐字归仓与 1:1 需求追溯矩阵（RTM）**：
   - 完整提取用户输入的每一个编号或原子诉求（如 1、2、3、4），建立 1:1 需求追溯矩阵（RTM: Requirement Traceability Matrix），项数绝对对齐：$N_{\text{raw}} \equiv N_{\text{RTM}}$；
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
   - 铁律：**只输出分析报告与计划，严禁在此阶段修改任何业务代码**。

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
   - 严禁逃避注解：绝对禁止添加 `// @ts-ignore`、`/* eslint-disable */` 或 `as any` 强行绕过，红灯时任务严格锁死在 `[-]`；
   - 上一个任务未通过真实退出码 0 验证并打勾前，绝对禁止启动下一个任务；
2. **Poteto 委派双公理 (Fresh Subagents by Default & Consolidated Scope)**：
   - **默认全新原则 (Fresh Subagents by Default)**：每次重试、排错转向或拆解的子任务，默认派发独立的全新 Subagent，严禁在带有失败污染历史的脏上下文中断链追问；
   - **上下文屏蔽盾 (Context Shielding)**：子 Agent 作为“吸收盾”承担长篇读写、测试报错与网页抓取输出；主 Agent 保持高维清爽，只接收 1,000~2,000 tokens 内的高密度成果报表；
   - **全量合并范围 (Consolidated Scope)**：派发给子 Agent 的指令严禁大白话随口概括，必须封装为包含“原始完整意图 + 所有多轮追加澄清 + 前置分支/Patch状态 + 物理封闭文件圈 + 退出码0命令”的【全量合并任务胶囊】；
   - **主 Agent 恪守零信任原则**：接收子 Agent 汇报后，必须在主会话亲自复测退出码 0，严查 `git diff` 越界范围；
3. **科学排错与 TDD 驱动**：
   - 修 Bug 必须先在真实终端复现报错，验证证伪立刻全量回滚；
   - 新增逻辑先写测试见证红灯，再写最小因果实现转为绿灯；
4. **出厂代码去噪 (/unslop)**：
   - 剔除 AI 废话口水注释、过度防御包装、重复组件与 `any` 逃避；
5. **触觉检阅**：源码变更必须调用 `vscode-review` 中的 `review_diff_in_vscode`，拉起原生两栏 Diff 供用户把控；
6. **证据分级与真实退出码**：任务打勾 `- [x]` 必须以测试命令终端真实退出码 `0` 与标注为 `[Measured / 实测]` 的绿灯日志为充要依据，杜绝虚假打勾。

### Step 4: 触觉审计与高频存档 (Audit & Commit)
1. **高频原子存档**：跑通一个可验证的小节点，立即执行一次 `git commit`。一旦后续发生逻辑漂移，一键 `git reset` 回退，杜绝大爆炸式改动；
2. **审计清单**：`git diff` 严格核查是否有越界文件、是否有硬编码密钥、是否引入了多余第三方包。

### Step 5: 经验永续与防线下沉自迭代 (Archive & Self-Iterating)
1. **1:1 需求双向回溯对账 (Bidirectional Checkoff)**：
   - 在最终交付报告中，必须将最终交付物与 Step 0 立案的 1:1 RTM（REQ-01...N）逐条对账，并附带退出码 0 与 [Measured] 凭证；
2. **对抗式红队审查 (/interrogate)**：针对极端边界、并发竞态与接口降级进行对抗式挑刺，全绿后准出；
3. **规格校验与归档**：
   ```bash
   npx openspec validate --all --strict
   npx openspec archive -y <change-name>
   ```
4. **防线下沉自迭代机制（Self-Iterating Defense Escalation）**：
   每当在内环施工或人工 Review 中捕获到一个 Agent 的错误，**严禁仅在当前代码打补丁了事**，必须执行**防线下沉自问规程**：
   - **能下沉到 L1 吗？** ➔ 能否通过显式状态机或 TypeScript 泛型约束，让这个错误在编译时就报错？
   - **能下沉到 L2 吗？** ➔ （**黄金法则**：同类错误纠正两次，立刻写成一条带有正向修复提示的 ESLint 规则或编译拦截脚本）；
   - **能下沉到 L3 吗？** ➔ 若无法写成 AST 规则，是否需要在 `AGENTS.md` 中增加封闭作用域的正向准入规范？
   - **闭环记录**：在 `CHANGELOG.md` 中沉淀本次踩坑根因、解决解法以及下沉后的防御加固点。

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

## 📚 五、 配套参考指南索引

- 用户反馈质疑与否定第一时间根因归因与递归自改进协议：[`references/recursive-self-improvement-protocol.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/recursive-self-improvement-protocol.md)

- 通用工程与工作流审计规范指南：[`references/universal-engineering-workflow-code.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/universal-engineering-workflow-code.md)
- 通用深度审计法：双轴四阶红队审讯体系指南：[`references/universal-deep-audit-charter.md`](file:///C:/Users/Administrator/.gemini/config/skills/pstack-openspec/references/universal-deep-audit-charter.md)
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
