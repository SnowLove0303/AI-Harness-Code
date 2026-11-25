# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 融合 `Agents365-ai/drawio-skill` 的企业研发周期与业务模型 Draw.io 专业绘图体系 (Axiom 76)

- **立案时间**: 2026-11-25T10:32:00+08:00
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **GitHub 标杆借鉴**: `Agents365-ai/drawio-skill` (10,927 ⭐) + `jgraph/drawio-mcp` (5,895 ⭐)

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

```text
1. 去github看看有没有专门画业务模型的技能，我需要使用Agent 使用Draw.io MCP 绘制企业研发周期模型图，细节特别多，但Agent好像不太熟练，你知道我所说的企业周期模型图是什么概念吗
2. (针对推荐融合 Agents365-ai/drawio-skill 与 Draw.io MCP 方案的确认): 执行
```

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **企业研发周期与业务模型结构化建模规范（对标 `Agents365-ai/drawio-skill`）** | **GIVEN** 智能体受命使用 Draw.io MCP 绘制细节密集的企业研发周期模型图（如 IPD / Stage-Gate / 跨部门泳道 / BPMN 流程）；<br>**WHEN** 智能体规划图表结构时；<br>**THEN** 系统 SHALL 强制先构建结构化业务模型中间表示（涵盖横向阶段 Stages、纵向职能泳道 Swimlanes、门径决策网关 Gate Diamonds、反馈打回闭环 Loopbacks 及输入输出交付物 Artifacts），再映射为确定性网格坐标的 Draw.io XML。 | 1. 明确建立企业研发周期（阶段 + 泳道 + 门径 + 交付物 + 回环）五要素建模规范；<br>2. 严禁脱离泳道坐标系直接盲写零散绝对坐标；<br>3. 显式支持超多细节时的“L0 全景图 + L1 阶段子图”多页拆分。 |
| **REQ-2** | **Draw.io MCP 专业绘图技能升级（泳道网格 + BPMN 语义 + `libavoid` 避障）** | **GIVEN** 现有 Draw.io 绘图技能仅覆盖基础接口调用，缺少业务模型布局与细节排版规则；<br>**WHEN** 智能体调用 Draw.io MCP 绘制复杂业务模型图时；<br>**THEN** 系统 SHALL 提供完整的 `mxGraphModel` 泳道容器样式、Stage-Gate 菱形/文档/并行网关样式、字宽留白估算（防截断）及正交避障走线调用规程（`routing="libavoid"` / `set_page`）。 | 1. 技能覆盖跨职能泳道、Stage-Gate 门径、BPMN 网关与交付物标注的精确标准样式；<br>2. 明确“分步增量/多页编辑”与正交防穿线路由规则。 |
| **REQ-3** | **“Diagram-as-Test” Draw.io XML 机械质量守卫（防重叠、防穿模、防孤岛）** | **GIVEN** 大模型手写复杂 XML 极易出现节点坐标重叠、泳道越界、文本溢出或悬空孤儿连线；<br>**WHEN** 将生成的 Draw.io XML 提交给 Draw.io MCP 渲染前；<br>**THEN** 系统 SHALL 运行自动化 L2 静态几何校验守卫，机械检测并拦截：同层节点边界框重叠（Overlap）、未连接孤儿节点/悬空边、缺失泳道父子归属以及 XML 结构残缺，违规返回 Exit Code 1 阻断。 | 1. 具备可独立执行的 Draw.io XML 几何与拓扑校验守卫；<br>2. 重叠节点或悬空连线反例稳定触发 Exit Code 1；<br>3. 合法多泳道研发周期模型 XML 通过校验返回 Exit Code 0。 |
| **REQ-4** | **Axiom 76 三镜像宪法立法与纯通用工程抽象** | **GIVEN** 需将该业务模型绘图规范与 Diagram-as-Test 质量门禁固化为 Ps-openspec 全局能力；<br>**WHEN** 立法纳入核心宪法时；<br>**THEN** 系统 SHALL 将其确立为 **Axiom 76** 同构写入三份宪法镜像与 Worker 规程，保持 100% 纯通用软件工程抽象（零特定企业私有名词），并配备 L2 测试套件取得 Exit Code 0。 | 1. 三份宪法镜像中 Axiom 76 语义 100% 同构；<br>2. 全仓守卫与回归测试套件退出码均为 0。 |

---

### 2. 本次任务专属：《前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)》

| 提案编号 | 推演伴生诉求 | 衍生技术背景与工程价值 | 建议处理方式 |
| :--- | :--- | :--- | :--- |
| **PROP-C** | **企业研发周期“模型生成器”辅助原语（Swimlane Grid Compiler）** | 让大模型直接手算 30+ 个跨泳道节点的 `(x, y, width, height)` 坐标极易算错导致重叠。如果提供一个纯通用的“阶段×泳道 JSON $\rightarrow$ 标准 Draw.io XML 编译器”辅助函数，Agent 只需输出干净的业务 JSON，坐标由确定性算法精确排版！ | **建议纳入**：在 L2 工具中提供确定性的 `compileBusinessLifecycleToDrawioXml` 辅助能力，彻底消灭大模型心算坐标翻车。 |
| **PROP-D** | **多页分层联动规范（L0 全景总览页 + L1 阶段明细页）** | 企业研发周期细节极多时，把所有子步骤全塞进一张画布必然密密麻麻看不清。利用 Draw.io 的多页 `<diagram>` 机制（配合 `list_pages`/`set_page`），实现“第 1 页看全周期端到端主干，后续页拆解各阶段明细”。 | **建议纳入**：在技能规范与 XML 校验中原生支持多 `<diagram>` 页面校验。 |
| **PROP-E** | **字宽自适应与防截断留白规则（Text Fit Margin）** | 中文+英文混排节点容易出现文字撑破矩形框或被截断的问题。 | **建议纳入**：确立文本长度与节点最小宽高的确定性计算公式，并在几何校验中提示文本过长溢出风险。 |

---

## 板块三：法定门禁物理隔离禁令确认

> 🛑 **【门禁 1 物理禁令】**：本备忘录纯粹确认“做什么与验收标准”，未修改任何业务代码或宪法文件；现等待您确认 `REQ-1 ~ REQ-4` 及 `PROP-C / D / E` 后进入 Step 2 OpenSpec 规格立法。
