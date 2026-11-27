---
name: drawio-mcp
description: >-
  Draw.io (Diagrams.net) 三合一融合绘图工具层与 MCP 协同统一技能包。
  最高法定根文件为 USER_HARD_RULES_GUIDE.md（任何 Agent 使用本体系前必须先完整读取）。
  提供确定性业务流程图/跨职能泳道间隙绕行编译器 (scripts/drawio-toolkit.mjs)、标准 IR 模板 (examples/*.ir.json)、
  细粒度节点/连线增量编辑原语、DRW-01~DRW-08 L2 机械守卫与本地原地落盘闭环。
  触发词：drawio/画图/流程图/泳道图/研发周期/业务模型/Stage-Gate/IPD/BPMN/架构图
---

# Draw.io (Diagrams.net) 统一自包含绘图技能包 (`drawio-mcp`)

> 🚨 **【最高法定根文件准入门禁 (`MANDATORY_ROOT_GUIDE_READ_GATE`)】**：
> **`USER_HARD_RULES_GUIDE.md` 是整个 Draw.io 绘图体系的最高法定根文件（Root Authority）。任何 Agent 在使用本技能包或调用 `drawio-toolkit.mjs` 之前，必须首先完整读取 `C:\Users\Administrator\.gemini\config\skills\drawio-mcp\USER_HARD_RULES_GUIDE.md`（或仓库 `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md`），严格遵守 `DRW-01` ~ `DRW-08` 全部条款！**

> **核心原则**：严禁大模型手算 XML 坐标或盲写裸 `<mxCell>` 坐标。所有流程图与跨职能泳道图必须先构造结构化 **Diagram IR JSON**，再通过本技能包内置的确定性编译器生成符合 `DRW-01`~`DRW-08` 的 `.drawio` XML，通过 L2 几何评分门禁（100 分 / Exit Code `0`）后，直接本地原地落盘交付。

---

## 一、 技能包内自包含资产结构

无论当前处于哪个工作区，均可直接调用本技能包目录（`C:\Users\Administrator\.gemini\config\skills\drawio-mcp\`）内的资产：

- **`USER_HARD_RULES_GUIDE.md`**：**【最高法定根文件】用户硬性要求执行指南（含 `DRW-01`~`DRW-08` 及变更台账，任何 Agent 使用前必读）**
- **`SKILL.md`**：本统一操作手册
- **`scripts/drawio-toolkit.mjs`**：确定性布局编译器、增量编辑原语与 L2 几何校验器（跨工作区零依赖，已内置 `DRW-01`~`DRW-08` 守卫）
- **`examples/flowchart.ir.json`**：标准业务流程图（带判断菱形与驳回环路）IR 模板
- **`examples/swimlane.ir.json`**：跨职能泳道图（多角色泳道 + 跨道正交连线）IR 模板

---

## 二、 标准执行闭环（4 步 SOP）

### Step 0：强制先读根文件
首先读取 **`USER_HARD_RULES_GUIDE.md`** 全文，确认 `DRW-01`（黑白单色）、`DRW-02`（画布上限 `3200×1300`）、`DRW-03`（对象/线条选型）、`DRW-04`（零穿框）、`DRW-05`（中点 `0.5` 锚定）、`DRW-06`（禁外部浏览器/原地落盘）、`DRW-07`（LR 垂直居中）、`DRW-08`（单口出线直角分化）。

### Step 1：构造结构化 Diagram IR JSON
根据用户业务需求编写 `process.ir.json`（可参考 `examples/flowchart.ir.json` 或 `examples/swimlane.ir.json`）：

```json
{
  "title": "图表标题",
  "direction": "LR",
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

- **`direction`**：`"TB"`（自上而下）或 `"LR"`（自左向右，自动居中对称）。
- **`kind` 可选值（统一黑白朴素工业风，遵循 `DRW-01` & `DRW-03`）**：
  - `"start"`（白底黑框椭圆，流程唯一起点）
  - `"end"`（白底加粗黑框椭圆，流程最终终点）
  - `"process"`（白底深灰框圆角矩形，原子业务活动，默认）
  - `"sub"`（白底黑框双竖线子流程，复合子流程）
  - `"decision"`（白底黑框菱形，条件分支/阶段门禁）
  - `"datastore"`（白底灰框圆柱体，持久化台账/数据库）
  - `"document"`（白底灰框波浪底文档，结构化单据/报告）

### Step 2：调用技能包内置编译器生成并校验 `.drawio`
```bash
# 1. 编译 IR JSON -> 零碰撞 .drawio 文件（自动执行 validateDrawioGeometry）
node "C:/Users/Administrator/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs" build process.ir.json output.drawio

# 2. 对已有 .drawio 文件单独执行 L2 几何评分校验
node "C:/Users/Administrator/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs" validate output.drawio

# 3. 多页工作簿原地替换指定页签（DRW-06）
node "C:/Users/Administrator/.gemini/config/skills/drawio-mcp/scripts/drawio-toolkit.mjs" replace-page master.drawio page_id single_page.drawio
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
- `NON_MONOCHROME_STYLE_BLOCKED`（违反 `DRW-01` 黑白单色白名单）
- `CANVAS_SIZE_EXCEEDED_BLOCKED`（违反 `DRW-02` 画布上限 `3200×1300`）
- `NON_MIDPOINT_PORT_DETECTED`（违反 `DRW-05` 中点 `0.5` 对齐）
- `NON_VERTICALLY_CENTERED_LR`（违反 `DRW-07` LR 垂直居中）

### Step 3：局部增量微调（禁止推倒重算）
当只需增删改少量节点/连线时，使用 `mutateDrawioXml(xml, ops)` 原语（支持 `add-node`、`add-edge`、`update-cell`、`delete-cell` 自动级联删边），绝不手改或破坏整图既有布局。

### Step 4：本地原地落盘交付（禁用外部浏览器 `DRW-06`）
几何校验通过（Exit Code `0`）后，直接落盘至目标 `.drawio` 文件，**严禁拉起外部浏览器**：
1. **单页/多页原地落盘（默认强制）**：单页直接 `build` 输出至目标文件；多页工作簿使用 `replace-page <master.drawio> <pageId> <singlePage.drawio>` 原地替换指定页签，保持其余页签无损。
2. **本地预览**：如需打开查看，仅通过 `vscode-review:open_in_vscode` 在 VS Code 本地打开目标 `.drawio` 文件；除非用户明确要求云端链接，否则不调用浏览器弹窗工具。

---

## 三、 任务收尾汇报清单（Axiom 81）
任务完成时，必须向用户汇报：
1. 产出的 `.drawio` 文件路径与 IR JSON 路径；
2. `validate` 几何评分（应为 `100`）与退出码 `0` 实测结果；
3. 本地原地落盘 / `replace-page` 交付结果；
4. 执行过程中遇到的任何报错、绕过或摩擦（即使已在过程中解决），并显式请用户判断。
