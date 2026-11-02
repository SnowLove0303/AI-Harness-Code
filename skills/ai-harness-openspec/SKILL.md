---
name: ai-harness-openspec
description: "Hujiale AI-Harness 与 OpenSpec 工业级 Vibe Coding 全流程闭环技能。覆盖从 Step 0 Spec-Kit 需求零损耗全量立案与【门禁 1】（1:1 RTM 详细备忘录）、Phase 0 底座感知与承重墙锁定、Phase 1 OpenSpec Explore 纯思考只读漫游、Phase 2 OpenSpec Propose 规格立法与【门禁 2】（处理思路+双清单门禁）、Phase 3 单任务专注锁 ([-] lock) 与 VS Code 原生 Diff 检阅、到 Phase 4 1:1 双向验收归档与 CHANGELOG 知识沉淀全流程。触发词：hujiale/ai-harness/ai harness/openspec/openspec explore/opsx/vibe coding/双清单/双清单门禁/规格驱动/代码封印/承重墙"
---

# Hujiale AI-Harness & OpenSpec 工业级 Vibe Coding 全流程闭环技能

本技能以 **Ps-openspec（OrbitStack 轨道工程体系）** 为全系统的**最高法定总纲（Supreme Governance Framework）**，深度咬合 **AI-Harness（工程承重墙）**、**OpenSpec（增量生命周期）** 与 **VS Code 原生 Diff 检阅**；**Spec-Kit 属于 Ps-openspec 的附属思路与子模块**（专职 Step 0 需求 1:1 零损耗摄入）。具体执行层面的方法论（工作流开发、UI设计等）下沉至**原子技能操作层**，由 **Graph 关联拓扑与布控治理网** 实现瞬时穿透检索与安全阻断。

---

## 🧭 一、 核心架构与认知模型

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        【工业级 Vibe Coding 飞轮】                     │
│                                                                        │
│   📋 Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】                   │
│      └─> 提取 1:1 需求追溯矩阵 (RTM)，详细备忘录呈报，【门禁 1 停等确认】│
│                                │                                       │
│                                ▼                                       │
│   🧱 Phase 0: 底座感知与边界锚定 (AI-Harness)                            │
│      └─> 查验 AGENTS.md / ARCHITECTURE.md，摸清三道承重墙，绝不踩雷        │
│                                │                                       │
│                                ▼                                       │
│   💭 Phase 1: 灵感漫游与思考对齐 (OpenSpec Explore)                     │
│      └─> 纯直觉探讨、只读探索、对齐认知、画拓扑图，【铁律：只思考不落笔】  │
│                                │                                       │
│                                ▼                                       │
│   📜 Phase 2: 规格立法扩展与【门禁 2】(OpenSpec Propose & Gate 2)        │
│      └─> 生成 specs/tasks，呈报【架构思路+双清单】，【门禁 2 停等授权】   │
│                                │                                       │
│                                ▼                                       │
│   🛠️ Phase 3: 单步施工与触觉检阅 (OpenSpec Apply & Single-Focus Lock)   │
│      └─> 动态专注锁 ([-] lock)，VS Code 两栏 Diff 把控，真实退出码 0 打勾│
│                                │                                       │
│                                ▼                                       │
│   🔒 Phase 4: 规格归档与经验永续 (OpenSpec Archive & CHANGELOG)          │
│      └─> 1:1 需求双向回溯对账，严格校验归档，闭环沉淀根因与解法至 CHANGELOG│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚨 二、 Agent 接收任务后的第一动作铁律

当 Agent 接收到任何任务时，**绝对禁止直接动手编写代码或修改文件，绝对禁止凭主观理解对用户需求随意压缩或删减**！必须严格执行：

1. **Spec-Kit 零损耗需求立案 (Count Parity)**：
   - 将用户原始所有编号与原子诉求（如 1、2、3、4）全量提取入轨，建立 1:1 需求追溯矩阵（RTM），项数绝对对齐：$N_{\text{raw}} \equiv N_{\text{RTM}}$；
   - 详细展开每一项诉求的场景范围、功能断言与验收标准，呈报《需求全量追溯备忘录（详细版，严禁精简）》并停等用户明确确认回复（【门禁 1】）；
2. **查验基座宪法与承重墙**：
   - 检查并读取项目中的 `AGENTS.md`、`ARCHITECTURE.md`，运行 `npx ai-harness status` 确认契约状态；
   - **① 专属引擎唯一路由**：排查是否有专用工作台或受控流水线（如 MSDS 任务必须走 MSDS Studio API / `run_pipeline.mjs`，严禁私写脚本直改 DOCX/PDF 文档）；
   - **② 源码级防篡改封印**：扫描代码中是否存在 `// @ANTIGRAVITY_INVARIANT_LOCK` 封印注解（享有最高只读豁免，严禁擅动）；
   - **③ 既有逻辑不可否定公理**：既有业务逻辑为法定事实，严禁凭大模型通用洁癖自以为是地删除或重构；
3. **分流至合法阶段**：
   - 需求模糊/复杂排错 -> 进入 **Phase 1: OpenSpec Explore** 只读思考；
   - 方案明确需动工 -> 进入 **Phase 2: OpenSpec Propose** 呈报架构处理思路与双清单（【门禁 2】）。

---

## 🛠️ 三、 六阶段作业规程详细 SOP

### Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1)
- **目标**：彻底终结“需求逐级蒸发”与“口水化压缩”，实现 1:1 需求立案。
- **执行规程**：
  1. 提取用户原始所有编号诉求（如 1、2、3、4），建立 1:1 需求追溯矩阵（RTM），严格保持数量对齐 $N_{\text{raw}} \equiv N_{\text{RTM}}$；
  2. 针对每个原子需求按 Spec-Kit 三要素结构化展开：明确业务场景与边界、详尽功能断言、可量化验证指标；
  3. **🛑 门禁 1 详细备忘录呈报**：在对话中呈报《需求全量追溯备忘录（详细版，严禁精简）》，并**严格停等用户明确确认回复（如“理解正确/确认”）后方可入轨**。

### Phase 0: 底座感知与边界锚定 (AI-Harness Anchor)
- **目标**：摸清房间承重墙与禁改红线。
- **命令**：
  ```bash
  npx ai-harness status
  npx ai-harness validate
  ```
- **输出**：在思考区明确当前技术选型、架构边界与人工介入条件。

### Phase 1: 灵感漫游与思考对齐 (OpenSpec Explore)
- **触发**：用户要求头脑风暴、需求模糊、疑难排错或探讨技术方案。
- **核心铁律**：**Explore mode is for thinking, not implementing（只思考，不实现）**。
- **行为规范**：
  - 只读探索：读取源码、排查测试、追踪调用链、跑只读分析命令；
  - 思维可视化：绘制 ASCII 或 Mermaid 架构图/时序图；
  - 严禁行为：绝对禁止新建或修改任何业务代码文件；
  - 准出标准：当与用户对齐思路、确定技术路径后，指引用户进入 Phase 2。

### Phase 2: 规格立法扩展与【门禁 2】(OpenSpec Propose & Gate 2 Authorization)
- **触发**：方案成熟，准备立项实施。
- **产出工件**：在 `openspec/changes/<change-name>/` 下生成：
  - `proposal.md`：变更背景、收益与 1:1 RTM 需求映射；
  - `specs/`：针对每个 REQ-xx 展开 RFC 2119 严密契约与 Gherkin 行为契约；
  - `design.md`：技术架构、接口定义与拓扑设计；
  - `tasks.md`：细粒度原子化任务清单，条目绑定具体验证命令。
- **🛑 强制前置门禁 2（Human Authorization Gate 2）**：
  Agent 必须在对话框中向用户呈报【架构处理思路与双清单】：
  ```markdown
  ### 架构处理思路 (Architecture & Processing Approach)
  - 核心处理流程拓扑与技术选型说明；

  ### 一、拟变更范围清单 (Proposed Scope)
  - 受影响文件：`path/to/file1.js`, `path/to/file2.js`
  - 拟新增/修改函数：`funcA()`, `funcB()`
  - 细粒度任务与验证凭据：[tasks.md 对应任务条目及验证命令]

  ### 二、保持现状承诺清单 (Preserved Functionality Commitments)
  - 承诺绝不修改/删除既有业务逻辑 A；
  - 承诺绝不触碰封印代码块 (@ANTIGRAVITY_INVARIANT_LOCK)；
  - 承诺绝不破坏既有测试与核心门禁。
  ```
- **停等指令**：**严格等待用户明确回复确认指令（如“执行”、“确认”、“同意”）后方可启动编码；未获确认前保持只读。**

### Phase 3: 单步施工与触觉检阅 (OpenSpec Apply & Single-Focus Lock)
- **目标**：精准、稳健、可控地将图纸转化为高质量代码。
- **执行规则**：
  1. **动态单任务专注锁（`[-] lock`）**：严格落实 Roo-Code/Cline 单焦点纪律，在任意时刻仅允许一个任务处于进行中状态（状态为 `[-]`）；上一个任务未绿灯打勾前严禁启动下一任务；
  2. 源码修改优先调用 `vscode-review` MCP 的 `review_diff_in_vscode`，拉起 VS Code 原生两栏 Diff 视图，由用户直观审查微调；
  3. **编译与 Lint 零容忍硬阻断 (Hard Blocker)**：任务打勾 `- [x]` 的充要条件必须同时包含功能测试通过与编译/Lint 静态检查（`--max-warnings=0` 真实退出码 0）；反逃避禁令绝对生效，严禁添加 `// @ts-ignore`、`/* eslint-disable */` 或 `as any` 强行绕过，红灯时任务严格锁死在 `[-]`；
  4. **通用深度审计施工防线 (Deep Audit Verification Matrix)**：
     - **验证平面只读隔离**：测试集代码不在 Agent 可写范围之内，严禁私改断言或公差，擅改考卷触发 `VERIFIER_TAMPERING_DETECTED` 熔断并原子回滚；
     - **变异元审计 (Mutation Sanity)**：测试套件必须具备变异杀伤力，注入反例变异体时测试必须红灯；若仍报退出码 0 判定为弱断言作弊，任务锁死；
     - **负向测试配比底线**：测试集包含 $\ge 30\%$ 负向与异常边界用例，显式断言抛出受控错误；
  4. 涉及 UI 调整与功能验收以人工操作为权威终审，人工确认前保持未勾选。

### Phase 4: 规格归档与经验永续 (OpenSpec Archive & CHANGELOG)
- **目标**：规格合流，经验固化，防止未来复发。
- **执行规程**：
  1. **1:1 需求双向回溯对账 (Bidirectional Checkoff)**：在最终交付报告中，必须将最终交付物与 Step 0 立案的 1:1 RTM（REQ-01...N）逐条对账，并附带退出码 0 与 [Measured] 凭证；
  2. **全新独立红队敌手审讯 (/interrogate)**：严禁在当前脏上下文中自我审判，强制派发全新独立 Subagent（`Model='pro'`, `Workspace='branch'`）执行破坏性渗透测试并出具抗攻击报告；
  3. **人机双钥匙准出机制**：机器测试退出码 0 为钥匙 1，人类在 VS Code 原生两栏 Diff 触觉检阅（`review_diff_in_vscode`）为钥匙 2；双钥匙齐备方可准出；
  2. 运行严格规格校验：
     ```bash
     npx openspec validate --all --strict
     ```
  3. 归档规格变更：
     ```bash
     npx openspec archive -y <change-name>
     ```
  4. 若涉及系统拓扑调整，同步更新 `ARCHITECTURE.md` 并执行 `npx ai-harness validate`；
  5. **知识沉淀（CHANGELOG 闭环）**：在交付总结与 `CHANGELOG.md` 中必须单列“遇到问题与解法”，详述根因与防范措施。

---

## 🔒 四、 核心操作纪律 (Operating Invariants)

1. **规格高于代码**：系统行为以 specs 规格定义为法定准则，严禁先改代码再补写规格。
2. **既有逻辑与业务规范不可否定公理**：既有业务逻辑皆为法定事实，严禁凭通用洁癖擅自重构或否定。
3. **源码级防篡改封印标记机制**：`@ANTIGRAVITY_INVARIANT_LOCK` 标记块享有最高只读豁免权。
4. **正向行动化表述准则**：避免“粉色大象”负向禁令，一律使用封闭作用域与明确正向规则。
5. **最小因果集与保留现状**：改动严格限制于当前任务直接链路，无关异样保留现状。
6. **差分作用域验证与真实凭据**：验证严格局限于本次 `git diff` 范围，凭码 0 打勾。
7. **双重人工授权与验收归口**：动工前授权门禁 + 交付后验收归口。
8. **问题与解法沉淀 (CHANGELOG 闭环)**：每次踩坑必须记录根因与解法。
9. **专用领域工具链与专属引擎唯一路由公理**：严禁绕开专属工作台直改产出物。
10. **跨线程任务发布法定绑定 ps-openspec 公理 (Mandatory ps-openspec Binding Axiom - 跨线程绝对入轨铁律)**：任何线程只要向跨线程或子 Agent 派发任务，指令首行必须强制声明并注入 `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`，强制接收方必须读取 `pstack-openspec` 技能入轨执行（严格落实 Step 0-5 闭环、双清单确认门禁、源码级封印保护、出厂去噪与退出码 0 实测证据）；接收方脱轨交付直接一票否决。
11. **用户反馈质疑与否定第一时间根因归因与递归自改进强制公理 (Feedback-Driven Root-Cause & Recursive Self-Improvement Axiom)**：任务执行后，凡用户对产出提出质疑、否定、不满意、遗漏指责或指出旧疾复发，必须无条件第一时间停机，启动 5-Whys 深度根因穿透（排查感知漏洞、规格漏洞、盲目审计漏洞、修新坏旧）；制定系统性杜绝复发方案，并**递归反哺更新 ps-openspec 与 GEMINI.md 规则库**，推送 Git 同步记忆。以真实会话 `7f4d4b46-78e6-435a-aa29-f0d6ec194caa` 为法定警示与参照（严禁盲目审计、不提醒就看不出、排版标点违章与旧疾复发）。
12. **Spec-Kit 需求零损耗与双阶段法定门禁公理 (Spec-Kit Zero-Loss Traceability & Dual-Gate Authorization Axiom - 防需求逐级蒸发铁律)**：
    - **零损耗立案**：用户提出的全部多项编号原子诉求（如 1、2、3、4），必须 1:1 完整入轨，形成需求追溯矩阵（RTM），严格保证项数对齐 $N_{\text{raw}} \equiv N_{\text{RTM}}$，严禁擅自合并、删减或口水化精简；
    - **法定双门禁机制**：
      ① **【门禁 1 (需求全量确认)】**：提取需求后呈报《需求全量追溯备忘录（详细版，严禁精简）》，必须严格停等用户确认后，方可进入方案设计；
      ② **【门禁 2 (思路与双清单确认)】**：完成 ps-openspec 架构扩展后，呈报架构思路与双清单（拟变范围 + 保持现状承诺），必须严格停等用户明确确认授权（“执行/同意”）后，方可动工写代码；
    - **单焦点专注锁**：施工阶段执行严格单任务专注锁（`[-] lock`），在任意时刻仅允许单个任务处于开发进行中状态；未完成真实验证与退出码 0 打勾前禁止多线抢跑；
    - **双向验收对账**：交付总结中必须附带 1:1 需求追溯矩阵的终审对账表，确保初始每一项诉求皆有真实凭证与命令实测闭环。

---

13. **Lint 与编译规则最高强制阻断与反逃避公理 (Strict Lint & Compiler Enforcement & Anti-Suppression Axiom)**：
    - **最高一票否决权 (Layer 2 Hard Blocker)**：Lint 与编译/类型检查规则在工程体系中处于非协商最高执行地位。严格实行**零警告、零错误（Zero Warnings, Zero Errors）**，检测命令必须带 `--max-warnings=0` 或 strict 模式；任何一条 Lint 警告在效力上等同于编译崩溃，直接触发一票否决，绝对禁止进入下一步或标记完成；
    - **源码级反规避与反逃避绝对禁令 (Anti-Suppression Charter)**：
      - 严禁 Agent 在代码中擅自使用 `// @ts-ignore`、`// @ts-nocheck`、`// @ts-expect-error`、强制类型断言（如 `as any`、`as unknown as X`）或 `/* eslint-disable */`、`// eslint-disable-next-line` 强行压制报错；
      - 若确因外部不可抗力（如第三方包类型损坏）需临时豁免，必须在 OpenSpec 提案中显式单列理由并获得用户明确审批，未经授权添加逃避注解一律视为破坏代码库完整性；
    - **单任务专注锁（`[-] lock`）前置解除绑定**：当前进行中任务解除专注锁打勾 `[x]` 的充要条件，必须同时包含功能测试通过与 Lint/编译真实退出码 0 的 `[Measured]` 绿灯凭证，红灯时任务严格锁死在 `[-]`；
    - **纠错两遍立项机检下沉法定化**：同类排版、语法或接口问题在人工 Review 中纠正达到 2 次，必须强制立项下沉为一条带正向修复提示的 ESLint / AST 机械化拦截规则，未完成下沉固化严禁关闭变更；
    - **跨线程零信任前置机检**：跨线程任务交接胶囊强制注入 Lint / Build 退出码 0 验证命令；主 Agent 接收汇报时恪守零信任原则，必须在主上下文第一步复测编译与 Lint 退出码 0。

---

14. **测试断言隔离与反局部过拟合公理 (Verifier Isolation & Anti-Patching Axiom - 防假通作弊铁律)**：
    - **裁执物理隔离**：验证平面（测试用例集与黄金标本）与施工平面（业务代码）严格物理隔离，测试集定义代码不在 Agent 可写范围之内，严禁为了让测试变绿而篡改断言、放宽公差或删减用例；
    - **严禁局部假特判硬编码**：严禁针对特定测试输入编写局部假特判（例如 `if (raw_input === '特殊样本') return 预期解`），一经发现直接判定虚假合格一票否决；
    - **广义化泛化检验**：所有转换与核心逻辑必须通过参数化测试与隐式/变异用例检验，确保算法具备通用泛化能力。

---

15. **缺失显式建模与反防御性捏造公理 (Explicit Missing States & Anti-Fabrication Axiom - 防脑补默认值铁律)**：
    - **缺失与否定语义严格正交**：类型与业务逻辑层，“未提供/未知 (Unknown)”与“假/否定 (False)”或“不适用 (N/A)”严格不等价，必须显式区分（显式 Option / Result / 枚举建模）；
    - **反防御性捏造禁令**：严禁编写类似 `val || '未检出'`、`val || default_value` 或 `if (!x) return '符合'` 等防御性掩盖代码；严禁在缺乏事实依据时主观臆想填补兜底默认值；
    - **显式上抛与标记**：遇到缺失或未定义字段，必须显式标记为 UNKNOWN 或向上抛出异常，杜绝制造虚假的“完整性”。

---

16. **环境见证硬核回滚与自纠错公理 (Env-Authored Witness & Auto-Rollback Axiom - 外部系统见证铁律)**：
    - **拒绝自说自话自证清白**：系统验证严禁依赖 Agent 自述，必须由环境见证者（真实的终端进程、编译器、测试套件）生成外部不可篡改的凭据（真实退出码 0 + stdout/stderr 日志）；
    - **原子回滚与反脏状态堆叠 (Aider-style Rollback)**：单步任务出现 Lint / 编译红灯或行为测试崩溃时，严禁在脏工作区上持续盲目堆叠新补丁；必须立即触发原子回滚（Git checkout / reset），退回至最近验证通过的干净基线；
    - **两撞墙求助硬门禁联动**：连续两次回滚仍未通过者，强制触发全网智能搜索与人工求助，严禁第三次盲目尝试。

---

17. **事实指纹锚定与 100% 溯源溯因公理 (Ground-Truth Anchoring & 100% Fact Provenance Axiom - 防削足适履与意图蒸发)**：
    - **输入事实指纹冻结**：任务 Step 0 阶段即对原始输入文本、关键源文档计算并冻结不可篡改的事实指纹（Fact Fingerprint / Hash Digest）；
    - **100% 事实溯源链 (Fact Provenance)**：在提取、匹配、排版装配、翻译与派生全流程中，输出结果中的每一个事实实体与字段值必须具备明确的源头溯源引用，严禁削足适履式截断截短、严禁将核心意图稀释蒸发；
    - **物理级指纹清算核销**：终审交付时，最终输出事实集必须与初始输入事实指纹进行 1:1 双向物理对账核销，任何事实遗漏、偷换概念或无源捏造均构成交付一票否决。
---

18. **方法论原子技能与 Graph 拓扑布控公理 (Methodology Skills & Graph Governance Axiom - 方法论下沉与图谱布控铁律)**：
    - **最高总纲与方法论下沉分离**：Ps-openspec 作为顶层唯一法定总纲统揽全局生命周期；所有具体执行层面的方法论（工作流开发方法论、UI/UX 设计方法论等）统一下沉至原子技能操作层（`skills/<name>/SKILL.md`）；
    - **Graph 拓扑关联与快速寻路**：必须通过 Graph 建立任务特征与方法论技能的拓扑连接，实现快速穿透寻路与精准绑定；
    - **Graph 爆炸半径与门禁布控**：方法论技能的调用必须受控于 Graph 划定的爆炸半径，硬核检验指标必须映射为 tasks.md 的机检命令与门禁阻断。
---

19. **通用深度审计六阶高强制性防御公理 (Universal Deep Audit & Anti-Fraud Axiom - 防假通作弊与机械逃避铁律)**：
    - **考卷绝对只读与防篡改 (Verifier Isolation)**：验证平面（测试集与黄金基线）享有最高只读豁免，严禁 Agent 为绿灯私改测试断言或删除用例；改动测试直接触发 `VERIFIER_TAMPERING_DETECTED` 熔断并原子回滚；
    - **变异元审计不可逃避 (Mutation Sanity)**：测试套件必须具备变异杀伤力，在注入反例变异体时必须变红；变异下仍报 exit 0 一律判定为弱断言欺诈，锁死任务执行锁；
    - **换位敌手红队审讯 (Adversarial Red-Team)**：交付前必须由全新独立的 `pro` 算力子 Agent 担任红队审讯官，执行真实破坏性测试并出具抗攻击日志；
    - **负向防御用例底线 (Negative Test Ratio $\ge 30\%$)**：严禁仅测单一正常流程，负向防御用例占比必须 $\ge 30\%$ 并显式断言受控拒绝；
    - **事实指纹 100% 物理核销 (Fact Provenance)**：终审清算表必须与初始事实指纹 1:1 逐字逐项对账核销，缺少物理凭证直接驳回；
    - **人机双钥匙准出 (Human Tactile Gate)**：必须通过 `vscode-review` 由人类完成原生 Diff 触觉终审，严禁跳过人工把控静默合流。
---

## 📚 附录与配套参考

- 双清单标准汇报模版：[`references/double-checklist-template.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/double-checklist-template.md)
- 工业级 Vibe Coding 实操指南：[`references/vibe-coding-sop-guide.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/vibe-coding-sop-guide.md)
- 核心不变量速查卡：[`references/invariants-cheat-sheet.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/invariants-cheat-sheet.md)
