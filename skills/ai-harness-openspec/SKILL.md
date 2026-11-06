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
│   📜 Phase 2: Ps-openspec 规格立法与【门禁 2】(OpenSpec Propose & Gate 2)│
│      └─> 编写 OpenSpec 四大件与双清单图纸，【门禁 2 停等授权】            │
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
   - 详细展开每一项诉求的场景范围、功能断言与验收标准，呈报《需求全量追溯备忘录（详细版，严禁精简）》（绝对禁止在此阶段夹带拟变文件清单或代码方案）并停等用户明确确认回复（【门禁 1】）；
2. **查验基座宪法与承重墙**：
   - 检查并读取项目中的 `AGENTS.md`、`ARCHITECTURE.md`，运行 `npx ai-harness status` 确认契约状态；
   - **① 专属引擎唯一路由**：排查是否有专用工作台或受控流水线（凡有专用引擎管线必须严格走官方受控 API / 流水线脚本，严禁私写一次性脚本直改受控目标资产）；
   - **② 源码级防篡改封印**：扫描代码中是否存在 `// @ANTIGRAVITY_INVARIANT_LOCK` 封印注解（享有最高只读豁免，严禁擅动）；
   - **③ 既有逻辑不可否定公理**：既有业务逻辑为法定事实，严禁凭大模型通用洁癖自以为是地删除或重构；
3. **分流至合法阶段**：
   - 需求模糊/复杂排错 -> 进入 **Phase 1: OpenSpec Explore** 只读思考；
   - 方案明确需动工 -> 进入 **Phase 2: OpenSpec Propose** 正式编写 Ps-openspec 体系下的 OpenSpec 规格并呈报双清单图纸（【门禁 2】）。

---

## 🛠️ 三、 六阶段作业规程详细 SOP

### Step 0: Spec-Kit 需求零损耗全量立案与【门禁 1】(Spec-Kit Ingestion & Gate 1)
- **目标**：彻底终结“需求逐级蒸发”与“口水化压缩”，纯粹 100% 确认“做什么与验收标准 (What & Acceptance)”。
- **执行规程**：
  1. 提取用户原始所有编号诉求（如 1、2、3、4），建立 1:1 需求追溯矩阵（RTM），严格保持数量对齐 $N_{\text{raw}} \equiv N_{\text{RTM}}$；
  2. 用户规范与方案全量通读：若用户提供了正确做法、参考标本或审计方案，动工前必须 100% 逐字全量通读并建立基准，严禁凭模型常识脑补或漏读；
  3. 针对每个原子需求按 Spec-Kit 三要素结构化展开：明确业务场景与边界、详尽功能断言、可量化验证指标；
  4. **🛑 门禁 1 绝对物理绝缘禁令**：门禁 1 的唯一目的是纯粹确认需求（What），**绝对禁止在门禁 1 呈报中夹带具体技术实现细节、拟变文件清单或代码落点规划**；
  5. **🚨 门禁 1 详细备忘录呈报**：在对话中呈报《需求全量追溯备忘录（详细版，严禁精简）》，并**严格停等用户明确确认回复（如“理解正确/确认/执行”）后方可获得开启 OpenSpec 编制的通行证**。

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
  - 逆向数据流穿透与状态合法性二分判定：异常排查必须逆向穿透至 Origin Producer，严禁在消费端 (Sink) 局部防御性掩盖；
  - 通用底层机制与业务策略边界隔离：识别底层通用工具与引擎资产，严禁将调用端业务策略反向污染至通用机制；
  - 思维可视化：绘制 ASCII 或 Mermaid 架构图/时序图；
  - 严禁行为：绝对禁止新建或修改任何业务代码文件；
  - 准出标准：当与用户对齐思路、确定技术路径后，指引用户进入 Phase 2。

### Phase 2: Ps-openspec 规格立法与【门禁 2】(OpenSpec Propose & Gate 2 Specification Authorization)
- **核心法定宗旨**：门禁 2 的唯一目的是**正式编写并呈报 Ps-openspec 体系下的 OpenSpec 增量规格与施工设计（How）**。绝对禁止在 OpenSpec 获批前动笔写任何业务代码！绝对禁止以口水聊天代替严谨规格资产！
- **产出四大法定工件**：在 `openspec/changes/<change-name>/` 下正式生成：
  - `proposal.md`：变更背景、收益与 1:1 RTM 需求映射；
  - `specs/`：针对每个 REQ-xx 展开 RFC 2119 严密契约与 Gherkin 行为契约；
  - `design.md`：技术架构、接口定义与因果拓扑设计；
  - `tasks.md`：细粒度原子化任务清单，条目绑定具体实测验证命令与单焦点专注锁。
- **🛑 强制前置门禁 2（Human Authorization Gate 2）**：
  Agent 必须在对话框中向用户呈报完整的【Ps-openspec OpenSpec 规格立法与双清单施工提案】：
  ```markdown
  ### 架构处理思路 (Architecture & Processing Approach)
  - 核心处理流程拓扑与技术选型说明；

  ### 一、拟变更范围清单 (Proposed Scope)
  - 受影响文件：`path/to/file1.js`, `path/to/file2.js`
  - 拟新增/修改函数：`funcA()`, `funcB()`
  - 拟变清单因果位置自证：显式标注 [Root Source] / [State Transition] / [Consumer Sink] 因果角色（仅修 Sink 直接触发 SINK_PATCHING_BLOCKED 阻断）
  - 通用性自证硬门禁：改动若涉及通用底层程序，必须自证具备通用参数化抽象（单任务特判硬编码直接触发 TASK_SPECIFIC_POLLUTION_BLOCKED 阻断）
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
     - **变异反欺诈验证前置**：在核心条件分支与保护门禁上执行故意变异注入（如条件取反、短路核心断言），测试套件必须红灯杀伤；若变异状态下测试依然全绿，直接判定为弱断言欺诈（`TRIVIAL_ASSERTION_FRAUD`），任务严格锁死在 `[-]`，严禁解锁；
  2. 源码修改优先调用 `vscode-review` MCP 的 `review_diff_in_vscode`，拉起 VS Code 原生两栏 Diff 视图，由用户直观审查微调；
  3. **编译与 Lint 零容忍硬阻断 (Hard Blocker)**：任务打勾 `- [x]` 的充要条件必须同时包含功能测试通过与编译/Lint 静态检查（`--max-warnings=0` 真实退出码 0）；反逃避禁令绝对生效，严禁添加 `// @ts-ignore`、`/* eslint-disable */` 或 `as any` 强行绕过，红灯时任务严格锁死在 `[-]`；
  4. **通用深度审计施工防线 (Deep Audit Verification Matrix)**：
     - **验证平面只读隔离**：测试集代码不在 Agent 可写范围之内，严禁私改断言或公差，擅改考卷触发 `VERIFIER_TAMPERING_DETECTED` 熔断并原子回滚；
     - **变异元审计 (Mutation Sanity)**：测试套件必须具备变异杀伤力，注入反例变异体时测试必须红灯；若仍报退出码 0 判定为弱断言欺诈，任务锁死；
     - **负向测试配比底线**：测试集包含 $\ge 30\%$ 负向与异常边界用例，显式断言抛出受控错误；
  5. 涉及 UI 调整与功能验收以人工操作为权威终审，人工确认前保持未勾选；
  6. **施工期摩擦动态存证**：单步任务凡触发测试报错、环境断裂或经历排错重试，必须实时记录 `[Incident: Friction/Bug]` 存证，严禁静默掩盖调试痕迹。
  7. **智能自动编组与四位一体任务交接**：
     - **默认自动派发**：主协调 Agent 统筹全局与把关终审，禁止直接编写或修改业务代码；具体施工执行必须自动编组委派给执行 Subagent；
     - **智能探查复用判定决策树 (`manage_subagents`)**：派发前必须调用 `manage_subagents(Action='list')` 探查活跃状态：若属于同一未完结断点或持有未落盘瞬态开发环境，通过 `send_message` 复用；若为独立新任务、重构、排错转向或重试，默认派发全新干净的 Subagent (`invoke_subagent`, `Workspace='branch'`)；
     - **四位一体任务交接胶囊**：派发必须封装 `ps-openspec + skill + 上下文 (Context) + 提示词 (Prompt)` 全量合并胶囊，严禁随口大白话压缩；
     - **主动完成报告与响应式唤醒**：Subagent 施工完毕主动回传包含 `[Measured]` 退出码 0 日志与变异测试杀伤记录的完成报告，主 Agent 响应式唤醒开启两阶双轨审计；
     - **裁执物理隔离与合流权归属**：执行 Subagent 运行在独立 branch 工作区，禁止直改主系统与自主合流；系统改动与合流权严格归属于主协调审计 Agent；

### Phase 4: 两阶双轨深度审计与经验永续 (Two-Step Deep Audit & Archive)
- **目标**：彻底消除对单一机械 exit 0 的盲信与走过场伪审计，实现语义契约闭环合流。
- **执行规程**：
  1. **第一步：机械确定性审计硬门禁 (Step 1: Mechanical Deterministic Audit)**：
     - 验证平面隔离，严禁篡改测试断言；
     - 变异元杀伤力 (Mutation Sanity) 验证通过，严禁弱断言欺诈；
     - 编译与 Lint 零警告 (`--max-warnings=0`)，测试套件真实退出码 0 [Measured]；
  2. **第二步：智能体语义规范审计 (Step 2: Agent Cognitive & Specification Audit)**：
     - **裁执物理隔离与主动找茬**：派发全新独立 Subagent（`Model='pro'`, `Workspace='branch'`）加载 `/interrogate` 敌手剧本执裁；机械 Exit Code 0 仅为底座，Agent 必须以敌手身份主动寻找代码漏洞与未覆盖边界，严禁消极放行；
     - **逆向举证门禁与非平凡任务缺陷指标 (Negative Proof Gate & Mandatory Adversarial Quota)**：严禁 0 缺陷消极放行；对非平凡工程任务，审计报告宣称“0 缺陷 / 0 问题”直接触发 `ZERO_FINDING_SUSPICION` 熔断并驳回；审计 Agent 必须提供至少 1~2 项边界反例攻击记录或 1 项变异杀伤力见证；
     - **双轨规范核销矩阵**：严格对账【全局规范 (宏观承重墙/不变量)】与【局部规范 (模块RFC 2119契约)】，出具 $N_{\text{Global}} + M_{\text{Local}}$ 项数绝对守恒的物理行号锚定与主动证伪报告；
     - **纠错两遍立项硬门禁 (Two-Strike Machine Escalation)**：凡人类 Review 纠正两次的问题，严禁停留在 Prompt 散文说教，必须机械化下沉为带真实退出码 1 的 AST / Lint 规则或测试用例；
  3. **1:1 需求双向回溯对账 (Bidirectional Checkoff)**：将交付物与 Step 0 立案的 1:1 RTM（REQ-01...N）逐条对账；
  4. **人机双钥匙终审准出**：机械全绿 (钥匙 1) + 规范审计全绿 (钥匙 2) 齐备后，拉起 `review_diff_in_vscode` 由人类工程师终审；
  5. **终审强制挂载复盘提案**：交付总结必须三位一体（1:1 需求核销 + 过程摩擦复盘 + 防线下沉提案），单列《执行期遇到问题与阻力清单》与《避免复发的长效防线下沉改进方案》，并附带可一键授权执行的加固动作；
  6. 运行严格规格校验与归档：
     ```bash
     npx openspec validate --all --strict
     npx openspec archive -y <change-name>
     ```
  7. **知识沉淀（CHANGELOG 闭环）**：在交付总结与 `CHANGELOG.md` 中沉淀根因与防御加固措施。

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
      ① **【门禁 1 (需求全量确认门禁)】**：提取需求后呈报《需求全量追溯备忘录（详细版，严禁精简）》，纯粹聚焦需求与验收指标对齐（绝对禁止夹带技术实现方案与拟变文件清单），必须严格停等用户确认后，方可获得开启 OpenSpec 编制的通行证；
      ② **【门禁 2 (Ps-openspec OpenSpec 规格立法门禁)】**：动工编码前，必须正式编写并呈报 Ps-openspec 体系下的 OpenSpec 增量规格资产（`proposal.md`, `specs/`, `design.md`, `tasks.md`）与法定双清单（拟变范围清单因果自证 + 保持现状承诺清单），严禁以口水聊天代替严谨规格资产，必须严格停等用户明确确认授权（“批准动工/执行/同意”）后，方可动工写代码；
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

20. **智能体执行层元归因与 Ps-openspec 体系化根治公理 (Agent-Execution-First Meta-Problem Framing & Ps-openspec Resolution Axiom - 防就事论事与个案思维铁律)**：
    - **严禁个案思维**：排查问题严禁就事论事，必须穿透至 Agent 执行层的认知偏离与行为模式；
    - **执行失效映射**：深度剖析贪婪特化、死代码遮蔽、弱断言欺诈与宏观比率蒙蔽等 Agent 典型执行缺陷；
    - **Ps-openspec 体系化阻断**：全生命周期注入事实指纹、双清单、变异审计、红队审讯与双钥匙门禁，以系统机制防范 Agent 执行恶习。
---

21. **两阶双轨深度审计公理 (Two-Step Dual-Scope Deep Audit Axiom - 机械审计与智能体认知审计双阶治理铁律)**：
    - **机械审计与认知审计分阶解耦**：机械审计为第一步硬门禁（验证平面隔离、真实退出码 0、变异杀伤力），智能体规范审计为第二步语义把控（独立全新 Auditor Subagent 执行对抗式证伪），严禁单一依赖机械 exit 0，严禁自施工自审；
    - **全局规范与局部规范双轨核销**：必须严格将项目级全局规范（宏观承重墙与不变量）与模块级局部规范（微观契约与状态边界）拓扑分流，出具项数绝对守恒（$N_{\text{Global}} + M_{\text{Local}}$）的微观物理对账清算表；
    - **对抗式反向证伪与物理锚定**：每一项规范审计必须包含代码绝对行号区间锚点与证伪攻击记录，严禁口水化伪对账；
    - **人机双钥匙准出充要条件**：机械全绿（钥匙 1）+ 智能体规范核销全绿（钥匙 2）= 触发 VS Code 原生 Diff 人类终审（准出充要条件）。
---

22. **执行摩擦动态存证与防线下沉复盘公理 (Execution Friction Journaling & Defense Escalation Retro Axiom - 防短视修复与静默吞没铁律)**：
    - **施工期摩擦不可篡改动态存证**：单任务执行期间（`[-] lock`），凡经历测试红灯重试、环境异常、未预期依赖断裂或脆弱断言，必须在工作记忆或任务日志中实时生成 `[Incident]` 存证，严禁静默吞没调试痕迹与系统摩擦；
    - **交付期终审强制挂载复盘提案**：任务终审交付报告必须三位一体（1:1 需求核销 + 执行摩擦复盘 + 防线下沉提案），单列《执行期遭遇问题与阻力清单》与《避免复发的长效防线下沉改进方案》；
    - **四阶防御下沉闭环推进**：针对捕获的每一个摩擦点，必须顺着 Lauren Tan 信任金字塔提出可落地的下沉方案（L1 类型状态机、L2 静态 AST/Lint 拦截、L3 封闭宪法、L4 变异反例测试），严禁“只解当前、不防后续”的短视创可贴修复；
    - **可执行加固动作一键授权**：必须输出明确的后续加固待办动作，经用户一键授权即可原地执行资产固化，使代码库获得永久免疫力。
---

23. **状态合法性因果溯源与反症状修补公理 (State Legitimacy & Anti-Symptom-Masking Axiom - 反脚痛医脚铁律)**：
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

24. **通用程序防篡改与机制策略物理隔离公理 (Generic Asset Anti-Tampering & Mechanism-Policy Separation Axiom - 反单任务污染通用资产铁律)**：
    - **机制与策略物理隔离公理 (Separation of Mechanism & Policy)**：通用程序/底层引擎（Generic Engine / Tool Asset）为系统共享基础设施，只提供通用执行机制；单次任务的业务特化逻辑属于策略，必须由外部调用端或适配器承载，绝对禁止将策略逻辑反向注入通用程序内部；
    - **通用能力演进与单任务特化二分判定 (General Evolution vs. Task Specialization)**：
      - **调用端适配优先（Caller Adaptation First）**：凡属单次输入特异性、业务特定字段或数据格式非标问题，一律在调用端做前置适配/清洗，通用程序代码享有最高只读豁免，严禁就地涂鸦篡改；
      - **通用演进四严律（Four Laws of General Evolution）**：凡属通用程序核心功能不足需升级，必须严格遵循四严律：① 零单任务特异标识与特判硬编码；② 抽象参数化与策略注入；③ 历史调用方 100% 零退化与向后兼容；④ 广义化多参数与变异测试见证；
    - **门禁 2 通用性自证与硬阻断 (TASK_SPECIFIC_POLLUTION_BLOCKED)**：
      在动工前呈报的【门禁 2 拟变范围清单】中，凡涉及通用底层程序的改动，Agent 必须显式完成“通用性自证”。若检测到试图通过局部特判硬编码来迁就当前单步任务，门禁直接触发 `TASK_SPECIFIC_POLLUTION_BLOCKED` 阻断，一票否决；
    - **基座承重墙契约不可弱化禁令**：严禁 Agent 为使当前任务通过而擅自删改通用程序的校验逻辑、降低防御公差或注释异常阻断；
    - **广义化泛化检验为充要条件**：对通用程序的任何改动，必须通过多场景参数化测试与变异测试，证明其在广义域内有效且保持历史调用方 100% 零退化回归。
---

25. **用户规范全量通读与任务后主动认知审计公理 (Mandatory User-Specification Ingestion & Active Post-Task Agent Audit Axiom - 严禁漏读与主动找茬铁律)**：
    - **用户规范与方案全量通读公理 (Zero-Omission Ingestion of User Standards)**：无论主智能体还是派发的子智能体（Subagent），凡用户在交互指令、参考文档或提示词中提供了正确做法、官方规范、参考标本或审计方案，动工前必须 100% 逐字全量阅读并建立不可篡改的对账基准；绝对严禁凭大模型通用常识脑补、绝对严禁粗粒度略读或截断遗漏；
    - **双阶结合与主动找茬公理 (Two-Step Audit with Active Bug Hunting)**：
      - 机械审计（编译、类型、静态检查、自动化测试）真实 Exit Code 0 仅作为准入的**第一步底座（必要条件）**；
      - 任务交付前，Agent 必须强制执行**第二步认知审计（充要条件）**：Agent 必须彻底摆脱消极打勾心智，以独立敌手身份**“主动去挑刺、主动去找问题”**（穷尽状态机死锁、极限边界变异注入、负向空间缺失审计、未捕获异常与资源泄漏推演）；
      - 任何未经历 Agent 主动找茬证伪攻击、仅凭机械 Exit Code 0 交付的成果一律视为“未完成审计”并一票否决；
    - **跨智能体全量穿透约束 (Universal Agent Enforcement)**：该公理对全系统所有智能体（主智能体、后台子智能体、跨线程智能体）具备绝对穿透效力；跨线程交接胶囊强制注入用户规范基准与任务后主动审计检查项。
---

26. **变异反欺诈与逆向举证深度审计硬门禁公理 (Mutation Anti-Fraud & Negative Proof Deep Audit Axiom - 反形式主义自审与假通铁律)**：
    - **变异元注入反欺诈门禁 (Mutation Sanity Gate & TRIVIAL_ASSERTION_FRAUD)**：
      任何测试套件与自动化验证流程必须具备真实的变异杀伤力。系统在准出前自动或受控注入反例变异体（如反转条件表达式、短路核心断言、替换关键返回值）；若测试套件与审计流程在变异体侵入状态下依然输出 Exit Code 0 或绿灯判定，系统直接判定为弱断言欺诈（`TRIVIAL_ASSERTION_FRAUD`），任务执行锁（`[-] lock`）坚决锁死，一票否决；
    - **逆向举证与强制找茬配额门禁 (Negative Proof Gate & Mandatory Adversarial Quota)**：
      彻底终结“0 缺陷消极放行”的形式主义假审计。在任何非平凡（Non-Trivial）任务的交付前，审计 Agent 必须强制出具至少 1~2 项主动构造的证伪反例攻击记录（包含具体的执行命令、非预期崩溃/异常表现、以及系统边界防御见证）。凡未出具对抗性证伪反例、仅凭口水化“无问题”宣称的审计报告，直接视为无效并驳回；
    - **裁执物理死锁与 Pro 算力敌手审讯 (Fresh Pro Auditor Enforcement)**：
      施工 Agent 仅拥有代码编写权，被底层系统在物理上剥夺任务自审打勾与终审准出权；终审必须派发全新的独立子智能体（`Model='pro'`, `Workspace='branch'`），加载 `/interrogate` 敌手剧本，以推翻施工假设、攻击极端边界为唯一目标执行敌手审讯；
    - **用户规范两碰立项机器化下沉公理 (Two-Strike Machine Escalation Axiom)**：
      严禁将人类指出过的错误长期停留在 Prompt 劝诫层面。凡用户在交互或审阅中指出达到两次的同类执行偏差或审计漏洞，必须在该会话或变更生命周期内，强制将其转化为具体的、具备真实 Exit 1 阻断力的机器机检资产（AST/Lint 规则、预提交钩子或参数化变异测试用例）。
27. **智能体自动编组与四位一体任务交接公理 (Autonomous Subagent Swarm & Four-in-One Handoff Axiom - 默认自动派发与裁执物理隔离铁律)**：
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

28. **通用工程防伪执行与拓扑零退化公理 (Universal Engineering Anti-Phantom & Structural Fidelity Axiom - 六大通用工程法定铁律)**：
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

29. **人机协同纠错后规范与审计门禁主动自增补公理 (Autonomous Spec & Audit Gate Co-Evolution Axiom - 严禁止步于就地修补铁律)**：
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

30. **既有法定规范保护、反审计倒置与宪法修改神圣排他权公理 (Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Axiom - 规范高于审计与反特洛伊木马式改宪铁律)**：
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

31. **通用程序纯粹性、反情境污染与三层机制策略隔离公理 (Universal Program Purity, Anti-Scenario-Pollution & Three-Tier Mechanism-Policy Isolation Axiom - 严禁聚焦单一情境改核心通用代码)**：
    - **三层机制策略物理隔离架构公理 (Three-Tier Physical Isolation Architecture)**：
      全系统代码库必须严格划分为物理隔离的三层拓扑结构：
      ① **纯粹通用机制引擎层 (Universal Mechanism Engine)**：仅接受正规化通用参数，处理纯数学几何变换、通用 AST 解析与无状态状态机跃迁；引擎核心严禁出现任何特定业务情境词汇、特定调用端命名或非参数化硬编码；
      ② **边界规范防腐层 (Anti-Corruption Ingestion Layer - ACL)**：在输入网关与任务摄入边界，全面消化异构情境的数据杂质与格式脏噪，100% 归一化清洗映射为通用引擎认可的标准数据拓扑，严禁让脏输入直接穿透底层；
      ③ **外部声明式策略配置 (Declarative Policies & Extension Injection)**：情境特异性（如特定场景的选项、度量权重、规则开闭）必须以纯声明式策略配置或遵循通用接口的策略插件形式注入；面对新情境，100% 仅新增或调整外部策略配置，通用机制引擎代码改动量严格为 0；
    - **单情境代码污染机器硬阻断门禁 (`SCENARIO_POLLUTION_BLOCKED`)**：
      通用底层程序与核心管线受到源码级 AST 监视与静态分析硬阻断。任何在底层通用核心中出现针对特定案例的特判插桩（如 `if (case === 'X')`、`if (filename.includes('xxx'))`）、特定常量分支或硬编码特例，静态分析与认知审计立即判定为严重抽象泄漏，抛出 `SCENARIO_POLLUTION_BLOCKED` 致命熔断并一票否决；
    - **反局部掩盖与修 Sink 熔断门禁 (`SINK_POLLUTION_BLOCKED`)**：
      严禁在消费端（Consumer Sink）、渲染末端或底层宿主函数中对非法状态做局部防御性兜底掩盖；异常与脏状态必须严格逆向穿透溯源至数据源头生产者（Producer）或边界防腐层；凡发现试图在通用 Sink 局部通过增加特判分支掩盖错误的，系统底层直接触发 `SINK_POLLUTION_BLOCKED` 致命熔断并强制回退；
    - **跨情境正交回归矩阵与跨场景零方差定律 (Cross-Scenario Orthogonal Regression Matrix & Zero-Variance Invariance)**：
      涉及通用底层程序的修改，验证套件必须包含至少 2~3 组正交、极端或互斥的跨情境合法标本矩阵；严格执行跨场景零方差定律：为当前情境优化的底层通用程序，在输入其他正交场景数据时，既有输出必须具有严格的零退化与确定性（$\text{Var}_{\text{cross}} \equiv 0$）；若改动引发了非相关情境的微小行为漂移，判定为全局通用性破坏，单任务专注锁（`[-] lock`）坚决锁死；
    - **通用性泛化数学自证硬门禁 (Generality Invariant Self-Proof & TASK_SPECIFIC_POLLUTION_BLOCKED)**：
      在动工前呈报双清单时，拟变文件必须显式标注其因果角色；凡改动涉及通用机制核心，开发者与 Agent 必须出具“通用性泛化自证”：证明新增加的原语与参数具备通用正交性，适用于同构的所有输入拓扑；未能完成通用性自证或存在单任务特化污染嫌疑的，直接触发 `TASK_SPECIFIC_POLLUTION_BLOCKED` 阻断。

32. **纯粹通用工程抽象与反具体情境锚定强制性总纲公理 (Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Axiom - 全系统禁止以局部情境污染全局总纲铁律)**：
    - **反具体情境锚定最高宪制总纲 (Absolute Anti-Scenario-Anchoring Mandatory Standard)**：
      全系统的所有规则、公理、架构设计与审查门禁，**必须（SHALL）100% 采用纯粹的计算机科学（Computer Science）、软件工程（Software Engineering）、状态机理论（Statechart Theory）与形式化验证抽象**；严禁 Agent 在理解规则、规划方案、编写代码、制定测试与审计门禁时锚定任何单一具体项目的业务情境（如特定文件格式、特定业务领域、特定文档排版）；凡在全系统总纲、通用技能或核心框架中夹带具体情境名词或以偏概全的特例逻辑，静态检查与审计流程直接触发 `SCENARIO_ANCHORING_POLLUTION` 致命阻断并一票否决；
    - **状态容器白板态与纯净初始化公理 (Clean-Slate Zero-State Invariant & UNCLEANED_CONTAINER_POLLUTION)**：
      任何具备状态承载能力的对象池、缓冲区（Buffer）、执行上下文（Context）与数据装配容器，在进入映射与组装流水线前，必须在状态机层通过洁净重置（Clean-Slate Wipe）证明其处于确定性初始零态（Zero State）；严禁未完成白板清零的容器句柄流入下游数据组装逻辑；违者底层管线直接抛出 `UNCLEANED_CONTAINER_POLLUTION` 致命异常；
    - **最小特权作用域保护与粗粒度豁免禁令 (Anti-Coarse-Grained-Exemption & BROAD_SCOPE_EXEMPTION_BLOCKED)**：
      豁免与保护必须严格遵循最小特权原则（Principle of Least Privilege）。严禁在模块、章节、容器等粗粒度范围使用免清空、免检查、免测试的宏观豁免（Blanket Exemption）；任何合法保护必须精准下沉到离散的叶子标识符（Atomic Leaf Identifier）；非保护范围强制执行全量管线检验，违者直接触发 `BROAD_SCOPE_EXEMPTION_BLOCKED` 阻断；
    - **全封闭双极状态断言闭包公理 (Closed Bipolar Invariant Assertion & ASYMMETRIC_POSITIVE_BIAS)**：
      单向正向存在性断言直接判定为非对称单向偏误欺诈（`ASYMMETRIC_POSITIVE_BIAS`）并一票否决；关键状态验证必须构建双极闭包断言：【正向契约（断言预期核心事实精确存在）+ 逆向排他门禁（断言已知非法状态、未初始化脏残留严格为 0）】；
    - **零防御性数据拟造公理 (Zero-Synthetic-Fallback & PHANTOM_DEFAULT_FRAUD)**：
      缺失必须显式建模，严禁合成无源事实。数据缺失必须在类型和状态层保持显式空态（`Option::None` / `null` / `Empty`）或立即快速失败（Fail-Fast）；通用转换管线中绝对禁止硬编码合成任何具有业务倾向性的假数据，违者直接触发 `PHANTOM_DEFAULT_FRAUD` 致命熔断；
    - **容器致密紧凑性与同构投影零方差公理 (Container Compactness & Homomorphic Invariance)**：
      数据集合填充完毕后必须包含紧凑化收敛（Pruning/Compacting），物理消除未消费的悬空槽位；由同一源数据生成的多种衍生投影，其核心拓扑几何方差必须严格为 0（$\text{Var}_{\text{topology}} \equiv 0$），杜绝同构断裂；
    - **验证平面裁执隔离与波普尔敌手证伪公理 (Popperian Adversarial Verification & META_AUDIT_FAILURE)**：
      审查者在物理上必须与施工者隔离，以推翻实现为唯一合法目的；严禁将 Exit Code 0 作为合格凭据，终审必须强制出具变异反例杀伤见证；若向产出物注入变异脏数据而测试套件依然返回 0，直接判定该测试套件自身失效（`META_AUDIT_FAILURE`），任务执行锁（`[-] lock`）坚决锁死。

33. **人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉公理 (Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Axiom - 严禁口水敷衍与虚假不长记性铁律)**：
    - **人机纠偏状态机与两碰立项硬阻断引擎 (Human-Correction Incident State Machine & Two-Strike Hard Escalation Gate - CORRECTION_INCIDENT_ESCALATION)**：
      全流程建立人机交互纠偏计数器（`correction_incident_counter`）。凡人类提出质量或规范质问、纠正与驳斥，在执行摩擦日志中登记 `[Correction Incident]` 且计数器递增；当计数器 $\ge 2$ 时，强制触发 `CORRECTION_INCIDENT_ESCALATION`，自动向 `tasks.md` 首位注入不可跳过的原子阻断任务：`[-] Task: 固化机器级 AST/Lint/变异门禁并实测 Exit 1 阻断`；未完成机器阻断任务并出具 Exit 1 阻断凭据前，任务专注锁（`[-] lock`）坚决死锁；
    - **交付拦截断路器与反空头支票硬门禁 (Pre-Commit Delivery Interceptor & Anti-Free-Apology Gate - NO_LINT_DELIVERY_BLOCKED)**：
      Pre-Commit、Merge 与交付前机械扫描 Git Staged Diff。若任务存在人类纠偏记录（$\ge 1$），暂存区必须包含新增或修改的自动化检查脚本（AST 规则、Lint 规则或变异断言代码）；缺少自动化机器拦截资产直接触发 `NO_LINT_DELIVERY_BLOCKED` 阻断并原子回滚；
    - **反廉价口水道歉与三要素工程事实响应契约 (Anti-Superficial-Apology Protocol - ANTI_SUPERFICIAL_APOLOGY_PROTOCOL & SUPERFICIAL_APOLOGY_REJECTED)**：
      严禁输出廉价口水化道歉文本（如“非常抱歉”、“我深刻反省”、“下次一定注意”），违者直接触发 `SUPERFICIAL_APOLOGY_REJECTED`；第一响应必须严格且仅输出三项工程事实：① 失效模式形式化定义 (Failure Mode Specification)；② 机器杠杆落地方案 (Proposed Machine Lever)；③ 反向证伪杀伤凭证 (Falsification Proof，实测 Exit 1)；
    - **沉淀规则永久水库与蜂群冷启动继承机制 (Permanent Lint Reservoir & Swarm Cold-Start Invariance - PERMANENT_LINT_RESERVOIR)**：
      沉淀规则严禁作为单次会话的临时脚本，必须持久化固化至项目常态化门禁水库（`scripts/lint/`、`package.json` 或 pre-commit hooks）；子智能体在冷启动（Step 1）必须全量继承执行。
    - **Lint 抽象纯粹性与反具体情境污染规程 (Lint Domain-Neutrality Standard - LINT_DOMAIN_NEUTRALITY_STANDARD & SCENARIO_ANCHORING_LINT_BLOCKED)**：
      所有沉淀的 AST 规则与 Lint 门禁，必须 100% 作用于代码语法树节点与通用状态机理论；严禁在 Lint 规则中硬编码业务专有名词或特定场景文本，违者触发 `SCENARIO_ANCHORING_LINT_BLOCKED` 阻断；

34. **通用工装结晶与反一次性修补公理 (Generic Tooling Crystallization & Anti-One-Off-Scripting Axiom - Poteto 杠杆工具与结构化沉淀铁律)**：
    - **上游原生准则深度咬合**：深度结合 `principle-build-the-lever`（构建可复核杠杆工具）与 `principle-encode-lessons-in-structure`（将教训编码进结构工具与门禁，文字指令只是表象）；
    - **从一次性脚本到通用工装的结晶跃迁机制 (GENERIC_TOOLING_CRYSTALLIZATION)**：一次性临时脚本（Scratch）仅限 Phase 1 (Explore) 探索期作为探针使用；施工期与交付期严禁交付带硬编码参数的临时脚本，必须结晶跃迁为参数化通用工具（Generic Tooling），归入 `scripts/tools/` 或标准 CLI；
    - **反一次性脚本与修补陷阱硬门禁 (ONE_OFF_SCRIPT_TRAP_BLOCKED)**：交付仅包含写死特例参数的一次性脚本、未提供参数化抽象者，系统直接触发 `ONE_OFF_SCRIPT_TRAP_BLOCKED` 阻断并原子回滚；
    - **通用工装三大物理契约**：① 参数化输入契约（`PARAMETERIZED_INVARIANCE`）；② 确定性机器接口契约（`DETERMINISTIC_LEVER_CONTRACT`，标准退出码 0/1）；③ 自验证黄金契约（自带单元测试或变异测试）；
    - **双轮驱动赋能目标 (DUAL_PURPOSE_LEVERAGE)**：结晶产出的通用工具必须明确赋能目标：① 主动免疫规避（接入 CI/Pre-commit/Lint 根绝复发）；② 缩短排障耗时（参数化 CLI 将排障修复压缩至秒级）。

---

35. **项目唯一权威审计体系与审计拓扑图（Audit Graph）无损交接公理 (Project-Canonical Single Audit System & Audit Graph Handoff Axiom - 严禁割裂分散与图谱对账铁律)**：
    - **单项目唯一权威审计体系公理 (PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM & DUPLICATE_AUDIT_SYSTEM_BLOCKED)**：任何受管项目有且仅有一套权威审计体系基座；严禁建立平行、割裂的第二套私有审计规则，违者触发 `DUPLICATE_AUDIT_SYSTEM_BLOCKED` 阻断并强制合流；
    - **审计拓扑图因果网络治理公理 (AUDIT_GRAPH_TOPOLOGY_ENGINE & UNANCHORED_AUDIT_ISLAND_BLOCKED)**：审计体系以 Audit Graph（DAG）形式显式维护规范、不变量、源码锚点、实测证据与用户指导五维节点及其有向依赖边，孤岛审计节点触发 `UNANCHORED_AUDIT_ISLAND_BLOCKED` 阻断；
    - **基于用户指导与 Ps-openspec 咬合的动态演进自迭代公理 (HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION)**：人类架构师指导为最高驱动源，即刻写入 `HumanGuidance` 节点，指导两次自动下沉固化为 L1 状态机、L2 AST/Lint 规则或 L3 规范条款；
    - **跨 Agent 无损交接与真理平面核销公理 (LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE & AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED)**：跨 Agent 派发与交接胶囊强制绑定 Audit Graph 拓扑快照；接手 Agent 零认知漂移对齐，任务打勾以实测退出码 0（[Measured] Evidence）为充要凭证；
    - **纯通用工程抽象与反业务情境锚定硬门禁 (UNIVERSAL_AUDIT_ABSTRACTION_STANDARD)**：100% 采用图论（DAG）、状态机理论、RFC 2119 规范与标准退出码通用工程语言，严禁业务专有名词污染。

---

36. **认知反思对账三阶跃迁与后厨旅团工单调度公理 (Cognitive Triad Evolution & Kitchen-Brigade Scheduling Axiom - Poteto 记忆反刍与工单解耦铁律)**：
    - **认知金库三阶自进化状态机 (COGNITIVE_TRIAD_EVOLUTION_ENGINE & UNREFLECTED_DELIVERY_BLOCKED)**：交付或纠偏后强制 `/reflect` 沉淀教训；冷启动或跨任务时 `/ruminate` 历史反刍；积累后 `/meditate` 对账剪枝并升阶规则。严禁未反思沉淀的代码交付；
    - **后厨旅团工单调度与裁执物理隔离公理 (KITCHEN_BRIGADE_ORDER_PROTOCOL & ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED)**：主协调 Agent 负责 `Mise en place` 状态就绪与 `orders-next` 工单发布；严禁主协调 Agent 跳过工单直写业务代码；子 Agent 必须在隔离工作区（Branch/Worktree）单焦点施工；
    - **扇出探索与多模型敌手找茬评测公理 (FANOUT_EXPLORATION_CRITIQUE_RUBRIC & TRIVIAL_SELF_AUDIT_FRAUD)**：Phase 1 支持 2~4 路并行扇出探索；终审必须挂载基于准则的敌手多角度找茬攻击，杜绝弱断言形式主义自审；
    - **Audit Graph 与本地 Markdown 记忆双向互通契约 (AUDIT_GRAPH_OBSIDIAN_INTEROP)**：记忆金库与 Audit Graph 保持标准 Markdown 结构，人类可在 Obsidian 中直接检视与审计；
    - **纯通用工程抽象与反业务情境锚定硬门禁 (UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD)**：100% 采用状态机、DAG 拓扑、RFC 2119 与标准进程退出码抽象，零具体场景词汇。

---

37. **任务终审强制审计抽象提案与人机确认门禁公理 (Mandatory Audit System Escalation Proposal & Human Confirmation Gate Axiom - 严禁止步于局部修补与未经确认直改铁律)**：
    - **全员强制问题逆向审计因果抽象 (MANDATORY_AUDIT_ESCALATION_ABSTRACTION & NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED)**：任何 Agent（主协调者、派发子 Agent 编组、跨会话接手者）在排查、修复或实现任何问题/功能时，绝不可止步于编写功能修复代码；必须强制执行逆向因果穿透（“为何现行审计体系未能在生命周期更早阶段有效拦截或即时暴露该失效模式？”），并抽象出旨在补充或优化该项目唯一权威审计体系（公理三十八）的结构化提案契约；缺乏该提案的交付一律触发 `NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED` 物理熔断；
    - **审计抽象提案四要素法定契约 (AUDIT_ESCALATION_PROPOSAL_CONTRACT)**：提案必须且仅包含四大法定工程要素：① 失效模式规格（Failure Mode Specification）；② 建议新增/调整的审计图谱不变量（Proposed Audit Graph Invariants，含 DAG 节点与因果连边）；③ 建议配套落地的机器级杠杆门禁（Proposed Machine Lever，含 AST/Lint 规则或变异测试断言）；④ 机器级实测阻断与放行凭据（Measured Verification Evidence，实测 Exit 1 与 Exit 0 对账）；
    - **人类架构师终审确认前置硬门禁 (HUMAN_AUDIT_CONFIRMATION_GATE & UNAUTHORIZED_AUDIT_MUTATION_BLOCKED)**：抽象出的审计体系优化提案必须在交付时显式向用户呈报，清晰交代审计盲区根因与拟演进方案，严格等待人类用户明确确认；未经人类授权擅自直改、污染或增补项目审计体系与 Audit Graph 基座的行为，一律触发 `UNAUTHORIZED_AUDIT_MUTATION_BLOCKED` 阻断并原子回滚；
    - **审计提案全生命周期归档与单调版本化公理 (AUDIT_PROPOSAL_LIFECYCLE_VERSIONING)**：用户确认通过的提案原子合流至项目唯一权威审计体系基座（`.orbitstack/audit/` 或 `audit-graph.json`）并单调自增版本号，形成持久化跨 Agent 免疫屏障；
    - **纯通用工程抽象与反业务情境锚定硬门禁 (UNIVERSAL_AUDIT_ESCALATION_STANDARD)**：100% 采用图论（DAG）、状态机理论、AST、RFC 2119 规范与标准退出码通用工程语言，严禁业务专有名词污染。

---

38. **生产驱动的主动系统演进与反情境蒙蔽公理 (Production-Driven Proactive System Evolution & Anti-Scenario-Myopia Axiom - 严禁被业务情境持续蒙蔽铁律)**：
    - **全员反情境近视与业务脱敏元抽象规程 (ANTI_SCENARIO_MYOPIA_AXIOM & SCENARIO_MYOPIA_BLOCKED)**：全系统任何 Agent 在接收与排查任何业务问题时，绝对禁止被具体业务名词与局部样本持续蒙蔽；必须强制执行元抽象过滤，升维为数据流拓扑、状态机合法性、类型承重墙与边界解析契约模型；严禁将业务情境特判代码包装为伪修复（违者触发 `SCENARIO_MYOPIA_BLOCKED` 阻断）；
    - **生产与排错摩擦演化燃料双层节拍规程 (PRODUCTION_FRICTION_AS_EVOLUTION_FUEL & DUAL_TIER_EVOLUTION_RHYTHM)**：开发排错中的重试与报错（`[Incident: Friction/Bug]`）是系统架构活体应力测试；执行双层演进节拍：单任务必带“微系统反思”（缺失触发 `NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED`），同类摩擦复现 $\ge 2$ 次强制升级为项目级《重大系统架构演化 RFC》；
    - **向上穿透两层逆向架构审讯与法定建议契约 (TWO_LEVELS_UP_SYSTEMIC_INTERROGATION & PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT)**：强制执行 Level 0（局部止血）、Level 1（机制参数化）、Level 2（架构根治）三层审讯；终审交付物必须附带包含系统短板、演化蓝图、ROI与人类决策接口的结构化建议书；
    - **Audit Graph 资产化持久化与跨 Agent 继承规程 (AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE & CROSS_AGENT_EVOLUTION_INHERITANCE)**：系统演化建议必须作为 `SystemEvolutionProposal` 节点原子持久化至项目唯一权威 Audit Graph 中，通过状态机受控流转，并在跨 Agent 交接中无损继承，彻底消灭认知漂移；
    - **人类架构师最高裁决门禁与纯通用工程抽象 (HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE, UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED & UNIVERSAL_SYSTEM_EVOLUTION_STANDARD)**：系统级改进严禁 Agent 擅自越权大改（违者触发 `UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED` 阻断）；获得人类明确批准后方可纳入下一阶段 OpenSpec 增量生命周期；全套规范 100% 采用通用工程语言，严禁掺杂业务场景词汇。

---


39. **子 Agent 全生命周期工单完备性与物理诊断物料法定公理 (Subagent Full-Lifecycle Job Ticket & Diagnostic Completeness Axiom - 严禁概述意念派发与懒惰呵斥铁律)**：
    - **反浅层概述派发公理与自包含工单六要素规程 (ANTI_SHALLOW_DISPATCH_AXIOM, SHALLOW_OVERVIEW_DISPATCH_BLOCKED & MANDATORY_JOB_TICKET_COMPLETENESS)**：主 Agent 派发子 Agent 任务绝对禁止仅发送概述、粗略方向或模糊指令；派发指令必须自包含且物理闭环，严格包含：① 工单元数据与唯一 ID；② 单一原子目标；③ 逐字 1:1 RTM 需求条文与 RFC 2119 契约；④ 物理文件绝对/相对路径与行号区间；⑤ 排除边界与非目标；⑥ 确定性退出码 0 验证命令行。缺失直接触发 `SHALLOW_OVERVIEW_DISPATCH_BLOCKED` 阻断；
    - **返工排错六维物理诊断闭环规程 (REWORK_DIAGNOSTIC_CLOSURE_AXIOM & LAZY_REBUKE_DISPATCH_BLOCKED)**：主 Agent 让子 Agent 解决具体问题或返工时，绝对禁止泛化呵斥（“修复某bug”、“改得不对”）；必须强制携带六维物理物料：① 原始未截断 stderr/stdout 与非零退出码；② 单行独立 CLI 复现命令；③ 期望 vs 观测双极对照表；④ 引发异常代码切片与行列坐标；⑤ 因果假设树与系统不变量；⑥ 允许修改范围白名单。缺失直接触发 `LAZY_REBUKE_DISPATCH_BLOCKED` 阻断；
    - **四大生命周期工单法定原型规程 (FOUR_LIFECYCLE_TICKET_ARCHETYPES & JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED)**：工单严格划分为：① `PROBE_EXPLORE_TICKET`（只读探查，禁改代码）；② `CONSTRUCTION_TICKET`（单焦点锁 `[-]` lock，退出码 0 验证）；③ `INCIDENT_TRIAGE_TICKET`（六维物料，根因穿透）；④ `VERIFICATION_REJECTION_TICKET`（Diff 对账与未通断言）。混杂或违背触发 `JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED` 熔断；
    - **子 Agent 法定拒单权与实测证伪权规程 (SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL, TASK_DISPATCH_REJECTED & SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT)**：子 Agent 遇缺失要素工单必须行使法定拒单权回传 `TASK_DISPATCH_REJECTED`；享有依据实测退出码推翻主 Agent 虚假推测的法定实测证伪权，严禁主 Agent 强行压制；
    - **纯通用工程抽象与反业务情境硬门禁 (UNIVERSAL_DISPATCH_STANDARD)**：工单与诊断规范 100% 采用进程管道、退出码、代码切片、DAG 拓扑通用语言，严禁单一业务场景词汇污染。

---


40. **主子 Agent 统筹规划与执行施工物理边界及全量资料法定交接公理 (Master-Subagent Governance-Execution Boundary & Full-Specification Handoff Axiom - 裁执物理隔离与全量交接铁律)**：
    - **主 Agent 全局系统把握与 Ps-openspec 全量规格制定规程 (MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE & MASTER_AD_HOC_CODING_BLOCKED)**：主 Agent 必须全面把握项目全局上下文、系统规则与既有架构承重墙；围绕 Ps-openspec 体系完整编制四大增量资产与双清单；主 Agent 严禁在统筹模式下绕过 SubAgent 直接编写业务代码（违者系统判定为 `MASTER_AD_HOC_CODING_BLOCKED` 阻断）；
    - **执行施工层面物理归口 SubAgent 施工平面规程 (SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE & SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED)**：具体代码落笔、文件修改与单步测试物理归口 SubAgent 施工平面；SubAgent 必须在单焦点锁 `[-]` lock 约束下专职攻坚，以 Exit 0 为充要条件；严禁越权改写主规格或白名单外发散修改（违者触发 `SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED` 阻断）；
    - **主向子无损移交完备规格资料法定交接协议 (MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL & SHALLOW_SPEC_HANDOFF_BLOCKED)**：主 Agent 向 SubAgent 派发任务时，必须将自身编写的详尽资料与全量 OpenSpec 规格信息 100% 无损交付（含 RFC 2119 规格、架构不变量、目标文件行号坐标 `file:///path#Lxx-Lyy`、Exit 0 自证命令与排除边界）；缺失直接触发 `SHALLOW_SPEC_HANDOFF_BLOCKED` 阻断；
    - **裁执与筹执物理隔离双向硬门禁规程 (GOVERNANCE_EXECUTION_SEPARATION_GATE)**：主 Agent 专职“立法、规划、统筹、裁决、全局核销”，SubAgent 专职“接单、单焦点施工、实测自证、原子回传”；Step 3 施工必须派发 SubAgent 承接，确保审执绝对分离；
    - **纯通用工程抽象与反业务情境硬门禁 (UNIVERSAL_BOUNDARY_HANDOFF_STANDARD)**：规约 100% 采用分布式多智能体、分层架构、状态机与标准退出码通用语言，严禁单一业务场景词汇污染。

---

41. **双门禁绝对前置、首轮只读停机与反擅自执行公理 (Statutory Dual-Gate Entry Precondition & Anti-Premature Execution Axiom - STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM - 严禁未经确认与未充分理解需求擅自开工铁律)**：
    - **首轮只读绝对停机与需求零损耗立案规程 (INITIAL_TURN_READ_ONLY_DIRECTIVE & PREMATURE_EXECUTION_BLOCKED)**：全系统任何 Agent 在接收到用户新任务、缺陷报告、重构指示或变更诉求的第一轮次（Turn 1），**必须严格停机在 Step 0 门禁 1**；首轮除只读探索、日志调取与指纹比对外，**绝对禁止调用任何改写文件、创建代码、修改配置或触发生产流水线的工具**（违者系统判定为 `PREMATURE_EXECUTION_BLOCKED` 阻断并一票否决）；必须 100% 逐字留存用户输入，建立 1:1 需求物理对账矩阵（RTM），输出详尽的《需求全量对账备忘录》，并在文末挂载明确的门禁 1 驻留声明，停止调用工具，严格等待用户确认回复；
    - **PStack 自主权时空边界严格收敛规程 (AUTONOMY_SPATIOTEMPORAL_SCOPE_DISAMBIGUATION)**：严格限定 PStack 执行自主权（Autonomy）的时空生效域：PStack Autonomy 仅在 **Step 3（单步施工阶段）且持有单任务专注锁 `[-]` 及在已获批双清单爆炸半径内** 享有闭环排错、编译与自测权限；**在 Step 0（任务入口立案）与 Step 2（规格立法动工）阶段，Autonomy 权限为绝对 0**；严禁借口“PStack autonomy”或“排查探索”在任务入口处逃逸跳步，严禁先斩后奏；
    - **先充分理解需求后动工准则与意图模糊熔断规程 (COMPREHENSION_BEFORE_EXECUTION_AXIOM & UNVERIFIED_INTENT_EXECUTION_BLOCKED)**：严惩“未充分理解需求就擅自开工”与“自以为是盲目推测”：Agent 必须在《需求全量对账备忘录》中向用户展现对核心痛点、场景边界与验收指标的穿透性理解；若对用户指令、专有名词、业务背景存在任何疑点，必须显式列出待确认事项并询问，严禁凭大模型通用概率盲目猜测并直接付诸代码；凡未经用户确认擅自假设并执行者，直接判定为 `UNVERIFIED_INTENT_EXECUTION_BLOCKED` 违规并要求立即回滚；
    - **双门禁双钥匙物理合流门禁规程 (DUAL_GATE_ENTRY_PRECONDITION_GATE)**：全系统流水线推进严格受制于双门禁两把物理钥匙：① 钥匙 1（需求准入之钥）：Step 0《需求全量对账备忘录》获用户明文确认（“执行/确认”），解锁 Step 1/Step 2 规格草拟权限；② 钥匙 2（动工准入之钥）：Step 2 OpenSpec 增量规格与双清单获用户明文授权（“批准动工/执行/同意”），解锁 Step 3 施工写代码权限；缺少任何一把钥匙的代码修改或提交，一律判定为非法越权，禁止合流；
    - **纯通用工程抽象与反业务情境硬门禁 (UNIVERSAL_DUAL_GATE_STANDARD)**：规约 100% 采用状态机前置条件、双阶段事务锁、RFC 2119 规范与标准退出码通用语言，严禁单一业务场景词汇污染。

---

42. **项目级黑白名单双轨法定权威与双向标本自证公理 (Project-Canonical Dual Black-White Registry & Dual-Specimen Sanity Axiom - PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM - 严禁误伤正确做法与严禁违章缺漏铁律)**：
    - **项目级双向权威注册表物理规程 (DUAL_BLACK_WHITE_REGISTRY_ARCHITECTURE)**：全系统每个受管项目必须在其唯一权威审计体系（公理四十/Audit Graph）中维护显式、可机器求值的【白名单（Whitelist）】与【黑名单（Blacklist）】知识库；严禁依赖主观推测；白名单专职收录人工确认特殊结构、既有合法逻辑与官方黄金标本，黑名单专职收录历史踩坑缺陷、违规外生虚增与排版反模式；
    - **反假阳性（误判）白名单最高豁免权规程 (WHITELIST_SUPREME_IMMUNITY_AXIOM & FALSE_POSITIVE_OVERHAUL_BLOCKED)**：彻底杜绝“明明正确的做法却被审计归纳为错误”的恶疾：凡命中项目白名单特征的代码或产出物结构，享有最高法定只读与合规豁免权；通用检查规则在白名单面前自动静默降级；严禁将白名单内写法归纳为“代码坏味道”或“违章”；凡因审计误判擅自对正常代码展开破坏性重构者，直接判定为 `FALSE_POSITIVE_OVERHAUL_BLOCKED` 阻断并强制回滚；
    - **反假阴性（漏网）黑名单穿透与必杀硬阻断规程 (BLACKLIST_MANDATORY_INTERCEPTION_AXIOM & AUDIT_LEAKAGE_DETECTED)**：彻底杜绝“错误做法与历史违章审计缺漏”的放行漏洞：凡项目发生过的缺陷与踩坑事实，必须 100% 物理固化为黑名单反模式特征；黑名单必须转化为 AST、正则或值拓扑层面的机器级硬断言；黑名单具备最高一票否决权（Exit 1）；凡黑名单反模式未被检出而逃逸至交付环节，直接判定为 `AUDIT_LEAKAGE_DETECTED` 质量事故并启动逆向问责；
    - **审计规则双向标本自证准入硬门禁规程 (DUAL_SPECIMEN_SANITY_GATE & UNVERIFIED_RULE_MUTATION_BLOCKED)**：全系统任何新增或修改的审计规则、Lint 规则或检查脚本，必须通过双向标本测试靶场检验：① 正向合法标本集（Positive Golden Specimens）必须 100% 给出 PASS 绿灯（Zero False-Positives，0 误报）；② 负向故障变异标本集（Negative Fault Mutants）必须 100% 给出 FAIL 红灯（Zero False-Negatives，0 漏报）；缺失双向标本自证凭据的规则一律判定为 `UNVERIFIED_RULE_MUTATION_BLOCKED` 并严禁合流；
    - **纯通用工程抽象与反业务情境硬门禁 (UNIVERSAL_AUDIT_ACCURACY_STANDARD)**：双轨黑白名单与双向标本门禁规约 100% 采用集合论、AST、谓词逻辑、标本测试集与标准退出码通用语言，严禁单一业务场景词汇污染。

---

43. **系统根本功能修改双门禁专项审批与系统通用性神圣不可牺牲公理 (System Core Mutation Dual-Gate Statutory Approval & Generality Preservation Axiom - SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM - 严禁情境化篡改系统与严禁牺牲通用性铁律)**：
    - **系统根本功能与外围非核心两阶物理分级范畴规程 (SYSTEM_MUTATION_CLASSIFICATION_AXIOM)**：全系统任何 Agent 在规划与施工阶段，必须对拟变范围实施两阶物理正交定性：① 一阶：系统根本功能（System Core Mutation），涉及核心驱动引擎、生命周期管线、全局路由协议、核心状态机不变量、跨项目适配基底及底层通用代码；② 二阶：外围非核心与规则层（Peripheral Non-Core），涉及文档（`.md`）、项目特有单测集、项目级黑白名单知识库规则、局部应用配置；动工前呈报的【双清单】必须显式标注每个变更资产的所属层级，凡触碰一阶资产者强制进入核心审批轨；
    - **系统根本功能修改强制双门禁专项呈报与重点说明规程 (SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE)**：任何涉及一阶系统根本功能的变更，必须在双门禁流程中专项呈报：① Step 0 门禁 1：《需求全量对账备忘录》中必须单列【系统核心机制拟变专项说明】，重点阐述为何外围层无法解决、拟变对全系统的潜在影响及替代方案权衡；② Step 2 门禁 2：OpenSpec Proposal 与 Design 中必须出具《系统泛用性保全自证凭据》，明确证明本次改动为纯参数化、正交扩展机制，绝非情境补丁，并严格等待用户明文专项批示授权后方可动笔写代码；
    - **系统通用性神圣不可牺牲与严禁情境化篡改硬门禁 (GENERALITY_PRESERVATION_AXIOM & SCENARIO_SYSTEM_MUTATION_BLOCKED)**：全系统底座以高度泛用性与通用平台能力为立身之本，通用性神圣不可侵犯：① 严禁情境单一化，严禁因单一业务情境、特定项目排版、个别客户格式需求或偶发审计误判擅自篡改、弱化、剪裁系统核心机制；② 严禁特判硬编码，严禁在系统核心引擎中注入带有具体业务项目名称、特定文档类型标识或单一情境假特判的特化逻辑；凡因具体业务情境或审计假阳性导致系统核心被篡改而牺牲通用性者，系统静态检查直接判定为 `SCENARIO_SYSTEM_MUTATION_BLOCKED` 致命阻断并强制原子回滚；
    - **底层通用机制与上层业务策略严格正交解耦规程 (MECHANISM_POLICY_ORTHOGONAL_DECOUPLING)**：系统核心只提供纯粹、参数化、可配置的底层通用机制（Mechanism），具体业务策略与格式规则（Policy）必须严格封闭在调用宿主、项目配置或项目黑白名单中；因审计误判引发的问题，必须通过维护项目级白名单/黑名单解决（公理四十二），严禁倒逼修改系统核心通用引擎；
    - **纯通用工程抽象与反业务情境硬门禁 (UNIVERSAL_SYSTEM_INTEGRITY_STANDARD)**：规约 100% 采用操作系统设计哲学（Mechanism vs. Policy）、状态机不变量、正交架构、参数化契约与编译器门禁通用语言，严禁单一业务场景词汇污染。

---

## 📚 附录与配套参考

- 双清单标准汇报模版：[`references/double-checklist-template.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/double-checklist-template.md)
- 工业级 Vibe Coding 实操指南：[`references/vibe-coding-sop-guide.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/vibe-coding-sop-guide.md)
- 核心不变量速查卡：[`references/invariants-cheat-sheet.md`](file:///C:/Users/Administrator/.gemini/config/skills/ai-harness-openspec/references/invariants-cheat-sheet.md)
