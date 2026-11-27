---
name: drawio-mcp
description: >-
  Draw.io (Diagrams.net) 三合一融合绘图工具层与 MCP 协同统一技能包（融合 DayuanJiang/next-ai-draw-io 37.2k ⭐ +
  Agents365-ai/drawio-skill 10.9k ⭐ + lgazo/drawio-mcp-server 1.5k ⭐ + @drawio/mcp）。
  自包含确定性业务流程图/跨职能泳道间隙绕行编译器 (scripts/drawio-toolkit.mjs)、标准 IR 模板 (examples/*.ir.json)、
  细粒度节点/连线增量编辑原语、L2 几何碰撞/穿框/断线评分守卫与双通道 MCP 渲染闭环。
  触发词：drawio/画图/流程图/泳道图/研发周期/业务模型/Stage-Gate/IPD/BPMN/架构图
---

# Draw.io (Diagrams.net) 统一自包含绘图技能包 (`drawio-mcp`)

> **核心原则**：严禁大模型手算 XML 坐标或盲写裸 `<mxCell>` 坐标。所有流程图与跨职能泳道图必须先构造结构化 **Diagram IR JSON**，再通过本技能包内置的确定性编译器生成零重叠、行列间隙正交绕行的 `.drawio` XML，通过 L2 几何评分门禁（100 分 / Exit Code `0`）后，再送入 Draw.io MCP 渲染交付。

---

## 一、 技能包内自包含资产结构

无论当前处于哪个工作区，均可直接调用本技能包目录（`C:\Users\Administrator\.gemini\config\skills\drawio-mcp\`）内的资产：

- **`SKILL.md`**：本统一操作手册
- **`scripts/drawio-toolkit.mjs`**：确定性布局编译器、增量编辑原语与 L2 几何校验器（跨工作区零依赖）
- **`examples/flowchart.ir.json`**：标准业务流程图（带判断菱形与驳回环路）IR 模板
- **`examples/swimlane.ir.json`**：跨职能泳道图（多角色泳道 + 跨道正交连线）IR 模板

---

## 二、 标准执行闭环（4 步 SOP）

### Step 1：构造结构化 Diagram IR JSON
根据用户业务需求编写 `process.ir.json`（可参考 `examples/flowchart.ir.json` 或 `examples/swimlane.ir.json`）：

```json
{
  "title": "图表标题",
  "direction": "TB",
  "lanes": [
    { "id": "role_a", "label": "角色 A（仅泳道图需要，普通流程图可省略）" }
  ],
  "nodes": [
    { "id": "n1", "label": "节点名称", "lane": "role_a", "kind": "start" }
  ],
  "edges": [
    { "id": "e1", "from": "n1", "to": "n2", "label": "流转条件（可选）" }
  ]
}
```

- **`direction`**：`"TB"`（自上而下，默认）或 `"LR"`（自左向右）。
- **`kind` 可选值**：
  - `"start"`（绿色圆角椭圆）
  - `"end"`（红色圆角椭圆）
  - `"process"`（蓝色描边圆角矩形，默认）
  - `"decision"`（黄色判断菱形）
  - `"datastore"`（紫色圆柱体数据存储）
  - `"document"`（绿色文档形状）

### Step 2：调用技能包内置编译器生成并校验 `.drawio`
使用技能包自带的 `scripts/drawio-toolkit.mjs`（支持 `build` 内置几何校验，不通过直接返回非零退出码）：

```bash
# 1. 编译 IR JSON -> 零碰撞 .drawio 文件（自动执行 validateDrawioGeometry）
node "C:/Users/Administrator/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs" build process.ir.json output.drawio

# 2. 对已有 .drawio 文件单独执行 L2 几何评分校验
node "C:/Users/Administrator/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs" validate output.drawio
```

若当前位于 `AI-Harness-Code` 仓库且需检验仓内 `.drawio` 文件，同时运行：
```bash
npm run guard:drawio-model
```

**L2 几何门禁阻断码（必须全部为 0 违规）**：
- `DUPLICATE_CELL_ID_BLOCKED`（重复 Cell ID）
- `VERTEX_OVERLAP_DETECTED` / `DRAWIO_NODE_OVERLAP_BLOCKED`（节点矩形重叠）
- `DANGLING_EDGE_TARGET_BLOCKED` / `DRAWIO_DANGLING_EDGE_BLOCKED`（悬空连线）
- `EDGE_CROSSES_NODE_BLOCKED`（正交连线穿过中间节点）

### Step 3：局部增量微调（禁止推倒重算）
当只需增删改少量节点/连线时，使用 `mutateDrawioXml(xml, ops)` 原语（支持 `add-node`、`add-edge`、`update-cell`、`delete-cell` 自动级联删边），绝不手改或破坏整图既有布局。

### Step 4：双通道 MCP 渲染交付
几何校验通过（Exit Code `0`）后，读取生成的 `output.drawio` XML 内容并送入 MCP 渲染：
1. **本地/桌面优先（`drawio` MCP）**：调用 `open_drawio_xml` 传入已校验的 XML；极简纯线性草图亦可使用 `open_drawio_mermaid`。
2. **云端协同备选（`drawio-cloud` MCP）**：当需要云端图床或在线链接时，调用 `create_diagram`（或 `create_semantic_diagram`）。
3. **连线与视觉铁律**：
   - 双向连接走对向侧面（`exitX=1/entryX=0` 与 `exitX=0/entryX=1`），不在矩形角点连线；
   - 若配合截图视觉自检精修，**最多 2 轮封顶**，优先修改 IR 重新编译。

---

## 三、 任务收尾汇报清单（Axiom 81）
任务完成时，必须向用户汇报：
1. 产出的 `.drawio` 文件路径与 IR JSON 路径；
2. `validate` 几何评分（应为 `100`）与退出码 `0` 实测结果；
3. MCP 渲染通道调用结果（`open_drawio_xml` / `create_diagram`）；
4. 执行过程中遇到的任何报错、绕过或摩擦（即使已在过程中解决），并显式请用户判断。
