---
description: "Ps-openspec Step 2 门禁 2：OpenSpec 规格立法、三元分账（Engine/Schema/Fixture）与双清单授权"
---

执行 `Ps-openspec` **Step 2【门禁 2：OpenSpec 规格立法门禁】**：

1. **编制四大 OpenSpec 资产**：在 `openspec/changes/<change-name>/` 下生成 `proposal.md`、`specs/`、`design.md`、`tasks.md` 并运行 `openspec validate <change-name> --strict`。
2. **三元分账与问题四分类（Axiom 84）**：涉及数据解析、转换或拓扑构建时，在 `design.md` 显式区分 `Engine Primitives` / `Pluggable Schema` / `Sample Fixtures`，按 Class A–D 判定源码修改红绿灯边界，并约定“核心源码 `git diff == 0` 替换 Schema 跑通异构变体”的盲测验收。
3. **双清单与原子任务**：呈报【拟变范围清单（含因果角色）】与【保持现状承诺清单】；问题任务须为每个 `[ISSUE-xx]` 建独立原子块（禁打包）。
4. **施工硬阻断**：获用户明确批准前严禁修改业务代码。
