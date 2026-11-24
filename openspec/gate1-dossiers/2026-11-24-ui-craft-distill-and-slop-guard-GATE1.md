# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## Ps-openspec 工业级 UI 审美升维、极简提纯 (`distill`) 与 `guard:ui-slop` 机械守卫体系 (Axiom 73)

- **立案时间**: 2026-11-24T10:42:00+08:00
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **融合基准**: `pbakaus/impeccable` (115k+ ⭐) + `nextlevelbuilder/ui-ux-pro-max-skill` (153k+ ⭐) + `vercel-labs/agent-skills` (34k+ ⭐)

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

```text
1. 目前关于Ps-openspec 的工具体系里的UI 工具，还是不够给力，核心是无法解决 页面朴素、无用说明/标签等过多的问题，不够精简等，你要不去github看看有没有更强大的？
2. (针对选型建议的授权): 你来判断，选最好的
```

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **升级 UI/UX 技能引擎：融合 `impeccable` (`distill` + `craft-floor`) 与 `ui-ux-pro-max` 审美规则** | **GIVEN** 智能体执行前端页面或桌面 UI 设计与编码；<br>**WHEN** 加载 UI 设计技能时；<br>**THEN** 系统 SHALL 强制激活一套结构化可执行的设计词汇与质量底线（涵盖排版尺度、表面深度与阴影质感、交互全态、`tabular-nums` 等原生表面细节打磨，彻底告别素颜白板默认感）。 | 1. UI 技能显式吸收 `impeccable` (`craft-floor` / `distill` / `bolder` / `polish`) 与 `ui-ux-pro-max` 核心规则；<br>2. 明确禁止单调等大卡片网格、卡片嵌套、渐变字、装饰性毛玻璃及无意义装饰序号。 |
| **REQ-2** | **“极简提纯 (`distill`)”与无用说明/标签硬剔除标准** | **GIVEN** 智能体生成或重构 UI 组件代码；<br>**WHEN** 进行界面信息架构设计与代码落地时；<br>**THEN** 系统 SHALL 严格执行信息减法原则：禁止在标题上方堆砌冗余眉标/Eyebrow 标签、禁止在可自明控件旁附带废话解释段、禁止过度使用 Badge/Tag 徽章及无意义辅助副标题，确保“每个元素必须证明其存在价值”。 | 1. 明确建立针对 Eyebrow 眉标、冗余解释段与 Badge 滥用的负向禁令与预算上限；<br>2. 交付前必须经历专门一轮视觉降噪与文案提纯审查（`distill` pass）。 |
| **REQ-3** | **自动化 L2 前端 UI Slop 机械静态守卫 (`guard:ui-slop`)** | **GIVEN** 任何前端代码（HTML/JSX/TSX/CSS/Vue/Svelte）提交或验收；<br>**WHEN** 执行机械审计门禁时；<br>**THEN** 系统 SHALL 运行独立的 Layer 2 静态分析脚本，机械扫描并拦截典型 UI 垃圾模式（如卡片内再套卡片、过多连续装饰徽章、无 `hover/focus-visible` 交互死态、硬编码紫黑发光渐变模板、冗长辅助解释文案块），命中红线直接返回 Exit Code 1 阻断。 | 1. 具备可独立执行的确定性前端 UI Slop 静态守卫脚本与 `npm run guard:ui-slop` 入口；<br>2. 反例标本（含冗余标签/解释/素颜套娃卡片）稳定触发 Exit Code 1；<br>3. 精简高质感标本通过校验返回 Exit Code 0。 |
| **REQ-4** | **Axiom 73 三镜像宪法立法与纯通用工程抽象** | **GIVEN** 需将该 UI 审美升维与去冗机械守卫固化为 Ps-openspec 全局准则；<br>**WHEN** 立法纳入核心宪法时；<br>**THEN** 系统 SHALL 将其确立为 **Axiom 73** 同构写入核心宪法三镜像与 Worker 执行规程，保持 100% 纯通用软件工程抽象（零特定业务情境词汇），并配备 L2 测试套件取得 Exit Code 0。 | 1. 三份宪法镜像中 Axiom 73 语义 100% 同构；<br>2. 全部专项测试与全仓回归测试退出码均为 0。 |

---

### 2. 本次任务专属：《前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)》

| 提案编号 | 推演伴生诉求 (Anticipated Requirement) | 衍生技术背景与因果分析 | 建议处理方式 |
| :--- | :--- | :--- | :--- |
| **PROP-C** | **UI 场景模式三分法（Operate / Read / Persuade）自适应预算** | 参考 `impeccable` 的 `mode-operate`、`mode-read`、`mode-persuade`：业务操作台（Operate）需要高信息密度与极简控件，阅读页（Read）需要 65-75ch 行宽与舒适呼吸感，落地展示页（Persuade）需要强视觉张力。不同模式不能用一套死板阈值。 | **建议纳入**：在设计技能与守卫规则中区分页面模式，避免一刀切误伤高密度专业工作台或展示页。 |
| **PROP-D** | **“先结构提纯，再视觉抛光”双阶段强制执行锁** | 如果在代码里直接边写边删容易顾此失彼。先确认核心用户目标与交互骨架，砍掉多余标签，再统一调优字阶、对比度与微交互。 | **建议纳入**：在 `tasks.md` / Worker UI 执行流程中确立 `Shape -> Distill -> Polish` 三阶单焦点顺序。 |
| **PROP-E** | **可配置的组件级标签/说明文案密度阈值** | 不同前端项目（如 React/Vue/原生 HTML）语法不同，静态守卫需要通过可配置规则精准统计单组件内的 Badge 数量与辅助说明段落数，防止误报。 | **建议纳入**：静态守卫支持按文件/组件粒度做通用 AST/模式扫描，并提供清晰的修复建议输出。 |

---

## 板块三：法定门禁物理隔离禁令确认

> 🛑 **【门禁 1 物理禁令】**：本备忘录纯粹确认“做什么与验收标准”，未修改任何业务代码或宪法文件；现等待您确认 `REQ-1 ~ REQ-4` 及 `PROP-C / D / E` 后进入 Step 2 OpenSpec 规格立法。
