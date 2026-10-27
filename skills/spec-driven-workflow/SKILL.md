---
name: spec-driven-workflow
description: 全局 AI-Harness 与 OpenSpec 工业级 Vibe Coding 规格驱动融合工作流标准作业规程（SOP）。在任何项目执行任务、编码、修改、排错或架构重构时激活，确保遵循规格落点先行、正向表述准则、既有功能不可否定公理、代码级防篡改封印、openspec explore 纯思考探索、执行前双清单确认门禁、最小因果集、真实凭据打钩、VS Code Diff 检阅、专属引擎唯一路由、问题与解法沉淀（CHANGELOG 闭环）及人工验收归口。
---

# AI-Harness & OpenSpec 工业级 Vibe Coding 规格驱动工作流 SOP

本规程作为 Antigravity 跨线程、跨任务的权威操作指导手册，将 **Hujiale 的 AI-Harness（底座契约）**、**OpenSpec Explore（灵感漫游与思考伙伴）** 与 **OpenSpec（需求演进与执行门禁）** 深度咬合，构建高松弛度与高工程严谨性兼备的 Vibe Coding 体系。

---

## 核心公理与纪律矩阵 (Operating Invariants)

1. **规格高于代码**：系统行为以 specs 规格定义为法定准则。发生冲突时修复代码使之对齐规格；若需修改系统预期行为，先在规格层立项变更。
2. **既有逻辑与业务规范不可否定公理 (Functionality & Spec Preservation Axiom - 防自以为是重构禁令)**：
   - 系统中既有的业务逻辑、特殊校验、回退分支、定制格式与交互流程，皆为人工确认的法定事实；
   - 严禁 Agent 凭借大模型预训练常识或通用洁癖，以“代码不合理”、“逻辑冗余”、“过度设计”、“不符合常见写法”、“解耦优化”等主观理由，自以为是地删除、篡改、弱化或否定程序原有的功能逻辑；
   - 若确实需要调整既有业务逻辑，必须在 OpenSpec Proposal 中显式说明调整动机，并在获得用户明文指令后方可执行。
3. **代码级防篡改封印标记机制 (Code Invariant Locks)**：
   - 支持在关键代码上方挂载源码级封印标记：
     - `// @ANTIGRAVITY_INVARIANT_LOCK_START: <保护原因与需求背景>`
     - `// @ANTIGRAVITY_INVARIANT_LOCK_END`
   - 凡包含该标记的代码块享有最高只读豁免权，严禁任何优化任务在未获得明确指令的情况下改动。
4. **正向行动化表述准则**：警惕 Transformer 模型的“粉色大象”注意力陷阱。一律使用明确的准入动作、封闭作用域（Closed Scope）与确定性规则。
5. **最小因果集与保留现状 (Leave-as-is)**：改动严格收敛在当前任务直接关联的文件与逻辑中；周边无关的历史警告、格式差异保留现状，交由独立专项变更处理。
6. **差分作用域验证与真实凭据**：验证严格局限于本次 `git diff` 影响链路；任务打钩必须以退出码为 0、真实运行日志与单元测试全绿为充要条件，严禁虚假打钩。
7. **VS Code 协同检阅**：任何文件变更必须通过 `review_diff_in_vscode` MCP 工具拉起原生双栏比对，交由用户把控并确认。
8. **双重人工授权与验收归口 (Human Authority & Gates)**：
   - **执行前授权门禁**：执行任务前务必先经 OpenSpec 梳理“双清单”（拟变更范围 + 保持现状承诺清单）向用户确认，获得用户明确确认指令后方可动工执行；
   - **交付后验收归口**：功能验收与 UI 界面调整以人工操作为权威终审。AI 负责准备复现步骤、改动前后对照材料与待核验清单，人工结论到达前保持未勾选。
9. **问题与解法沉淀 (CHANGELOG 闭环)**：每次改进、排错与攻坚中遇到的核心问题（根因、阻塞点）与解决办法，必须如实记录，并在任务交付时配合 `CHANGELOG.md` 同步沉淀。
10. **专用领域工具链与专属引擎唯一路由公理 (Exclusive Domain Engine Routing Axiom)**：
    - 在拥有专属处理工作台、领域引擎或受控流水线的项目中，一切业务产出物的生成、装配、修改、翻译与派生，必须严格且唯一通过项目官方提供的受控流水线执行；
    - 严禁任何 Agent 避重就轻手写 ad-hoc 脚本直接读写篡改底层业务文件（如 DOCX、PDF 等），脱离专属引擎的产出物一律视为非法并一票否决。
11. **跨线程任务发布法定绑定 ps-openspec 公理 (Mandatory ps-openspec Binding Axiom - 跨线程绝对入轨铁律)**：
    - 任何线程只要向跨线程或子 Agent 派发任务，指令首行必须强制声明并注入 `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`，强制接收方必须读取 `pstack-openspec` 技能入轨执行（严格落实 Step 0-5 闭环、双清单确认门禁、源码级封印保护、出厂去噪与退出码 0 实测证据）；接收方脱轨交付直接一票否决。
12. **用户反馈质疑与否定第一时间根因归因与递归自改进强制公理 (Feedback-Driven Root-Cause & Recursive Self-Improvement Axiom)**：
    - 任务执行后，凡用户对产出提出质疑、否定、不满意、遗漏指责或指出旧疾复发，必须无条件第一时间停机，启动 5-Whys 深度根因穿透（排查感知漏洞、规格漏洞、盲目审计漏洞、修新坏旧）；制定系统性杜绝复发方案，并**递归反哺更新 ps-openspec 与 GEMINI.md 规则库**，推送 Git 同步记忆。以真实会话 `7f4d4b46-78e6-435a-aa29-f0d6ec194caa` 为法定警示与参照（严禁盲目审计、不提醒就看不出、排版标点违章与旧疾复发）。

---

## 工业级 Vibe Coding 五阶段标准作业流 (The 5-Phase SOP)

### Phase 0：底座感知与边界锚定 (AI-Harness Anchor)
1. 任务启动前读取 `AGENTS.md`、`ARCHITECTURE.md`，执行：
   ```bash
   ai-harness status
   ai-harness validate
   ```
2. 识别代码库中的 `@ANTIGRAVITY_INVARIANT_LOCK` 封印块与专用引擎唯一路由，摸清承重墙。

### Phase 1：灵感漫游与思考对齐 (OpenSpec Explore)
1. 当需求模糊、遇到疑难排错或需要探讨方案架构时，激活 `openspec-explore` 模式。
2. **核心铁律：只思考、不实现（Explore mode is for thinking, not implementing）**。
3. 自由探索代码库、运行只读命令、绘制 ASCII / Mermaid 拓扑图、分析权衡与边缘特例。严禁在此阶段编写业务代码。

### Phase 2：规格立法与双清单门禁 (OpenSpec Propose & Human Gate)
1. 方案成熟后，建立 `openspec/changes/<change-name>/`：
   - `proposal.md`：澄清 Why、What Changes、Capabilities 与 Impact。
   - `specs/<capability>/spec.md`：增量规格契约。
   - `design.md`：技术设计方案与边界权衡。
   - `tasks.md`：细粒度原子化任务清单。
2. **强制前置双清单门禁**：向用户呈报：
   - **清单 1（拟变更范围）**：受影响文件/函数、`tasks.md` 任务与验证命令；
   - **清单 2（保持现状承诺清单）**：承诺**绝不碰、绝不删、绝不否定的既有逻辑与特殊规范**。
3. **严格等待用户明确确认回复（如“执行”、“确认”、“同意”等）后方可动工**；确认前保持只读。

### Phase 3：单步施工与触觉检阅 (OpenSpec Apply & VS Code Diff)
1. 严格按照 `tasks.md` 单任务单步推进，严禁越界修改无关模块。
2. 每次写入/修改代码文件，必须调用 `vscode-review` MCP 的 `review_diff_in_vscode` 提交用户在 VS Code 原生 Diff Editor 中微调把控。
3. 运行差分范围内的测试或编译命令，获取真实绿灯证据后再勾选 `tasks.md`。

### Phase 4：规格归档与经验永续 (OpenSpec Archive & CHANGELOG)
1. 全量校验：
   ```bash
   openspec validate --all --strict
   ```
2. 归档规格：
   ```bash
   openspec archive -y <change-name>
   ```
3. 知识沉淀：在 `CHANGELOG.md` 中闭环记录“遇到问题与解法”；若拓扑改变，同步更新 `ARCHITECTURE.md`。
4. 提请用户进行最终人工验收并交付。
