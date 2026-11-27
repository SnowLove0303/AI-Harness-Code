# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `drawio-tri-repo-fusion-tooling`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-27-drawio-tri-repo-fusion-tooling-GATE1.md`

## 1. Step 1 三库核心能力拆解结论
1. **`next-ai-draw-io` (37.2k ⭐)**：吸收其 `grid-route` 间隙正交绕行算法（边永不穿框、平行边分轨不重叠）、双边反向锚点规则及视觉自检闭环；
2. **`drawio-skill` (10.9k ⭐)**：吸收其统一 Diagram IR 声明式建模与结构化几何评分校验（重叠/断线/穿框检查，视觉修复最多两轮封顶）；
3. **`drawio-mcp-server` (1.5k ⭐)**：吸收其细粒度节点/连线/父容器增量编辑原语（按 ID 局部增删改，保留已有布局）。

## 2. 法定双清单

### 2.1 拟变范围清单 (Proposed Mutation Scope)
1. `[Tooling Engine]` `scripts/drawio-toolkit.mjs` — 新增统一 Draw.io 编译器、增量编辑器与几何校验器（含 CLI）。
2. `[L2 Guard]` `scripts/check-drawio-model.mjs` — 复用 `validateDrawioGeometry` 强化 `.drawio` 文件几何碰撞与拓扑校验。
3. `[Skill & Graph & Sync]` `skills/drawio-mcp/SKILL.md`、`.harness/project-graph.json`、`scripts/sync-to-global.mjs`、`README.md`。
4. `[Verification]` `tests/drawio-toolkit.test.mjs` — 新增流程图/泳道生成、增量编辑与碰撞/断线/穿框拦截测试。

### 2.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不将第三方克隆目录合入主仓库；
- 绝不修改其他 16 项 `guard:*` 脚本与 `GEMINI.md` 既有公理。
