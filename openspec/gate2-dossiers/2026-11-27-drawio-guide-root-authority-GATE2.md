# Gate 2: OpenSpec 规格立法与双清单施工图纸 (`drawio-guide-root-authority`)

## 1. 法定双清单 (Dual-List Authorization)

### A. 拟变范围清单 (Proposed Mutation Scope)
1. `skills/drawio-mcp/USER_HARD_RULES_GUIDE.md` `[New Root Authority]`：正式回流仓库并修正内部 `DRW-06` 冲突，确立为 Draw.io 体系最高根文件。
2. `skills/drawio-mcp/SKILL.md`、`GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md` `[Root-Read Mandate]`：前置强制门禁，任何 Agent 使用 Draw.io 体系必须先读取 `USER_HARD_RULES_GUIDE.md`。
3. `scripts/drawio-toolkit.mjs` `[Root Source / L2 Guard]`：统一内置 `DRW-01`~`DRW-08`（黑白单色、画布上限 `3200x1300`、中点端口、`replace-page`、LR 垂直居中、单干线直角分化）。
4. `tests/drawio-toolkit.test.mjs` `[Verification]`：新增根文件强制引用及 `DRW-01`~`DRW-08` 单元测试。

### B. 保持现状承诺清单 (Preservation Commitments)
- 保持 `Axiom 77`~`Axiom 82` 全部条款与 L2 守卫逻辑不变。
- 保持既有 `examples/*.ir.json` 与其他无关技能不变。
