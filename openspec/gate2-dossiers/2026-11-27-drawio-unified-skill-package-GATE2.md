# Gate 2: OpenSpec 规格立法与双清单施工图纸 (`drawio-unified-skill-package`)

## 1. OpenSpec 规格资产
- `openspec/changes/drawio-unified-skill-package/proposal.md`
- `openspec/changes/drawio-unified-skill-package/specs/drawio-unified-skill/spec.md`
- `openspec/changes/drawio-unified-skill-package/design.md`
- `openspec/changes/drawio-unified-skill-package/tasks.md`

## 2. 法定双清单 (Dual-List Authorization)

### A. 拟变范围清单 (Proposed Mutation Scope)
1. `skills/drawio-mcp/SKILL.md` `[Doc/Skill Entry]`：升级为自包含统一技能手册（含完整 IR Schema、CLI、MCP 渲染闭环与 Axiom 81 清单）。
2. `skills/drawio-mcp/examples/flowchart.ir.json` & `swimlane.ir.json` `[New Templates]`：新增标准流程图与跨职能泳道图可运行 IR 模板。
3. `scripts/sync-to-global.mjs` `[Root Source Sync]`：增加将 `scripts/drawio-toolkit.mjs` 同步至 `config/skills/drawio-mcp/scripts/drawio-toolkit.mjs` 的映射（保持仓库单一权威源，零代码重复）。
4. `tests/drawio-toolkit.test.mjs` `[Verification]`：新增对技能包内 `examples/*.ir.json` 的编译与几何校验回归测试。

### B. 保持现状承诺清单 (Preservation Commitments)
- 保持 `scripts/drawio-toolkit.mjs` 核心布局算法与几何校验逻辑不变。
- 保持 `GEMINI.md`、`worker.md`、`pstack-openspec`、`ai-harness-openspec`、`README.md` 及其他无关技能不变。
- 保持既有 17 项 `guard:*` 守卫与全部现有测试通过。
