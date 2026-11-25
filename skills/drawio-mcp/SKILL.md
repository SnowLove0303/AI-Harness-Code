---
name: drawio-mcp
description: >-
  Draw.io (Diagrams.net) 官方 MCP 绘图与企业级业务模型建模技能（融合 Agents365-ai/drawio-skill 10.9k+ Stars）。
  支持通过 @drawio/mcp 与 drawio-cloud 生成、校验并在线打开企业研发周期模型（IPD/Stage-Gate）、跨职能泳道图（Swimlanes）、
  BPMN 2.0 业务流程、多页 L0/L1 分层架构图，内置确定性泳道网格编译器与 Diagram-as-Test L2 几何拓扑守卫 (guard:drawio-model)。
  触发词：drawio/画图/流程图/泳道图/研发周期/业务模型/Stage-Gate/IPD/BPMN/架构图
---

# Draw.io (Diagrams.net) 企业级业务模型与 MCP 协同绘图指南

> **核心定位**：融合 **`Agents365-ai/drawio-skill` (10.9k+ ⭐)** 与 **`jgraph/drawio-mcp` (5.8k+ ⭐)**，彻底解决大模型直接手算坐标绘制多细节企业研发周期模型图时的“节点重叠、连线穿模、文字截断、细节拥挤”四大顽疾。

---

## 一、 企业研发周期与密集业务模型五要素建模规范

绘制任何细节密集的企业研发周期或端到端业务流程模型时，必须先建立结构化中间表示（Diagram IR），严禁盲写零散 XML 绝对坐标：

1. **横向阶段轴（Stages / Phases）**：如 `立项 -> 需求 -> 架构 -> 研发 -> 测试 -> 试产 -> 发布 -> 运维/退市`。
2. **纵向职能泳道（Cross-Functional Swimlanes）**：如 `决策委员会 (IRB/IPMT)`、`产品经理 (PM)`、`架构师`、`研发工程`、`QA 审计`、`运维交付`。所有节点必须挂靠在对应泳道父容器（`parent="lane_xxx"`）内。
3. **门径决策网关（Stage-Gate Diamonds）**：阶段准出评审使用菱形（`rhombus`），标注明确 Gate 编号与准入条件。
4. **交付物节点（Deliverable Artifacts）**：输入/输出关键文档使用文档形状（`shape=document`），清晰标注产物名称。
5. **反馈打回闭环（Loopbacks）**：评审不通过或缺陷退回使用红色虚线正交回环（`dashed=1;edgeStyle=orthogonalEdgeStyle`），并在渲染时传参 `routing="libavoid"` 自动避障走线。

---

## 二、 确定性坐标编译与 L0/L1 多页分层策略

1. **优先使用确定性泳道网格编译器 (`scripts/check-drawio-model.mjs`)**：
   - 当节点数 $\ge 8$ 或存在多泳道交叉时，使用 `compileBusinessLifecycleToDrawioXml(model)` 将结构化 JSON 编译为标准 Draw.io XML，自动完成：
     - **中英文混排字宽自适应**（中文 14px/字，ASCII 8px/字 + 32px 留白，杜绝文字截断）；
     - **同格多节点垂直防重叠错位**；
     - **L0 全景总图 + L1 阶段明细多页 `<diagram>` 投影**（细节过多时自动拆页，配合 `list_pages` / `set_page` 增量编辑）。
2. **Diagram-as-Test L2 机械质量门禁 (`npm run guard:drawio-model`)**：
   - 调用 `open_drawio_xml` 打开或保存 `.drawio` 文件前，必须通过 `validateDrawioXml` 机械检验：
     - `DRAWIO_INVALID_XML_BLOCKED`（结构缺失）
     - `DRAWIO_NODE_OVERLAP_BLOCKED`（同层节点边界框重叠）
     - `DRAWIO_DANGLING_EDGE_BLOCKED`（连线引用不存在的节点 ID）

---

## 三、 官方 MCP 核心工具调用规程

| 工具名 | 适用场景 | 最佳实践参数 |
| :--- | :--- | :--- |
| `open_drawio_xml` | **复杂业务模型/泳道图/多页图** | 传入经 `validateDrawioXml` 校验后的 XML，**必须设置 `routing="libavoid"`** 自动正交避障走线 |
| `open_drawio_mermaid` | 简单线性流程/时序/状态图 | 简单图可使用，密集泳道业务模型禁止仅靠 Mermaid 敷衍 |
| `search_shapes` | 检索官方专业图标与 BPMN 形状 | 检索 `"bpmn"`, `"swimlane"`, `"aws"`, `"k8s"` 精确 `style` |
| `list_pages` / `get_page` / `set_page` | 多页 `.drawio` 增量修改 | 大型企业研发周期图按 L0 总图 + L1 各阶段子图分页增量维护 |
| `open_drawio_csv` | 组织架构/依赖矩阵转图 | 表格型数据一键生成拓扑 |

---

## 四、 隐私与私有化支持
- 图表数据通过 URL Hash 纯前端传递至 `app.diagrams.net` 打开，不经过第三方持久化存储；支持通过 `DRAWIO_BASE_URL` 切换内网私有化 Draw.io 实例。
