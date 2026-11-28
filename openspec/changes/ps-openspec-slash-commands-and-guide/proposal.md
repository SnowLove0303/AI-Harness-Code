# Proposal: Ps-openspec Slash Commands & Command Guide (`ps-openspec-slash-commands-and-guide`)

## 背景与动机
当前 `Ps-openspec` 已具备完整的双门禁 SOP、18 项 L2 守卫、`OrthoAudit` 正交审计体系与按需技能库，但尚缺乏面向 Antigravity `/` 菜单的标准化斜杠指令集与配套指令指南。每次使用需人工口述长段提示词，触发效率低且容易遗漏步骤。

## 目标
1. 在 `Pstack-openspec` 仓库中构建首批 7 个标准化 `/` 斜杠指令（`workflows/*.md`）：
   - `/ps-gate1`（Step 0 需求 1:1 立案与问题清单切片）
   - `/ps-explore`（Step 1 只读探查与剧本锚定）
   - `/ps-gate2`（Step 2 OpenSpec 立法与三元分账）
   - `/ps-apply`（Step 3 单焦点施工与 VS Code Diff）
   - `/ortho-audit`（OrthoAudit 六步代码正交与硬编码审计）
   - `/ps-verify`（Step 4–5 两阶双轨终审与核销归档）
   - `/ps-guide`（指令速查与场景路由指南）
2. 编写《Ps-openspec 斜杠指令指南》（`docs/SLASH_COMMANDS_GUIDE.md`）。
3. 扩展 `scripts/sync-to-global.mjs`，将其以轻量插件形态（`~/.gemini/config/plugins/ps-openspec/`：`plugin.json` + `workflows/*.md`）自动同步至本机 Antigravity 全局配置，确保输入 `/` 即可唤起。
4. 严格保持 `GEMINI.md` 0 字节增量（所有指令按需触发，0 常驻上下文开销）。

## 影响范围
- 新增：`workflows/*.md`（7 个指令剧本）、`docs/SLASH_COMMANDS_GUIDE.md`
- 修改：`scripts/sync-to-global.mjs`、`scripts/tests/sync-to-global.test.mjs`、`docs/toolbox-index.json`
- 保持现状：`GEMINI.md` 严格 0 字节增量；所有既有 L2 守卫与单元测试 100% 通过。
