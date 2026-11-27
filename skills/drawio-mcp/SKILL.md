---
name: drawio-mcp
description: >-
  Draw.io (Diagrams.net) 三合一融合绘图工具层与 MCP 协同指南（融合 DayuanJiang/next-ai-draw-io 37.2k ⭐ +
  Agents365-ai/drawio-skill 10.9k ⭐ + lgazo/drawio-mcp-server 1.5k ⭐ + @drawio/mcp）。
  提供确定性业务流程图/跨职能泳道间隙绕行编译器 (scripts/drawio-toolkit.mjs)、细粒度节点/连线增量编辑原语、
  L2 几何碰撞/穿框/断线评分守卫 (guard:drawio-model) 与双通道 MCP 渲染闭环。
  触发词：drawio/画图/流程图/泳道图/研发周期/业务模型/Stage-Gate/IPD/BPMN/架构图
---

# Draw.io (Diagrams.net) 三合一融合工具层与 MCP 绘图指南

> **核心定位**：深度融合 **`DayuanJiang/next-ai-draw-io` (37.2k ⭐)** 的间隙正交绕行与视觉自检规则、**`Agents365-ai/drawio-skill` (10.9k ⭐)** 的 Diagram IR 建模与几何评分校验、以及 **`lgazo/drawio-mcp-server` (1.5k ⭐)** 的细粒度节点/连线增量编辑原语，彻底终结“大模型手算 XML 坐标导致重叠、穿框、断线”的顽疾。

---

## 一、 统一工具层核心能力 (`scripts/drawio-toolkit.mjs`)

绘制任何业务流程图或跨职能泳道图时，**优先调用 `scripts/drawio-toolkit.mjs` 生成与校验 XML**，禁止盲写裸坐标：

1. **确定性间隙绕行编译器 (`buildFlowchartOrSwimlaneXml(ir)`)**：
   - 输入结构化 JSON（`type: 'flowchart' | 'swimlane'`、`direction: 'TB' | 'LR'`、`lanes`、`nodes`、`edges`）；
   - 自动完成拓扑分层、中英文自适应字宽（`fitLabelWidth`）、泳道容器嵌套（`parent="lane_xxx"`）、反向回环旁路与跨层连线的**行列间隙分轨正交路由**（`<Array as="points">`），确保连线永不穿过中间节点、平行边不重叠。
2. **细粒度增量编辑原语 (`mutateDrawioXml(xml, ops)`)**：
   - 支持按 ID 执行 `add-node`、`add-edge`、`update-cell`（改标签/样式）、`delete-cell`（自动级联清理关联断边），局部微调时绝不破坏整图既有布局。
3. **L2 几何碰撞与拓扑评分门禁 (`validateDrawioGeometry(xml)` / `npm run guard:drawio-model`)**：
   - 输出 `0–100` 质量评分，机械拦截：
     - `DUPLICATE_CELL_ID_BLOCKED`（重复 ID）
     - `VERTEX_OVERLAP_DETECTED` / `DRAWIO_NODE_OVERLAP_BLOCKED`（节点矩形重叠）
     - `DANGLING_EDGE_TARGET_BLOCKED` / `DRAWIO_DANGLING_EDGE_BLOCKED`（悬空连线）
     - `EDGE_CROSSES_NODE_BLOCKED`（正交连线穿过中间节点）

---

## 二、 CLI 命令行速查

```bash
# 1. 从结构化 IR JSON 编译生成零碰撞 .drawio 文件（内置几何校验，不通过直接退出码 1）
node scripts/drawio-toolkit.mjs build process.json output.drawio

# 2. 对已有 .drawio 文件执行 L2 几何评分校验
node scripts/drawio-toolkit.mjs validate output.drawio

# 3. 运行全仓 Draw.io L2 静态守卫
npm run guard:drawio-model
```

---

## 三、 双通道 MCP 协同与视觉自检闭环

1. **渲染通道**：将 `drawio-toolkit.mjs` 产出的已校验 XML 送入 `@drawio/mcp`（`open_drawio_xml`）或 `drawio-cloud`（`create_diagram`）；简单线性流程亦可使用 `open_drawio_mermaid`。
2. **连线与视觉铁律（源自 `next-ai-draw-io` + `drawio-skill`）**：
   - 双向连接使用对向侧面（`exitX=1/entryX=0` 与 `exitX=0/entryX=1`），绝不在矩形角点连线；
   - 复杂图生成后若配合截图检查，**视觉自动精修最多 2 轮封顶**，优先用几何校验替代盲目重写。
