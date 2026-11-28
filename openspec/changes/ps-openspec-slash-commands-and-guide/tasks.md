# Tasks: ps-openspec-slash-commands-and-guide

- [x] 1. 创建 `workflows/` 下的 7 个斜杠指令文件（`ps-gate1.md`、`ps-explore.md`、`ps-gate2.md`、`ps-apply.md`、`ortho-audit.md`、`ps-verify.md`、`ps-guide.md`）。
- [x] 2. 编写《Ps-openspec 斜杠指令指南》（`docs/SLASH_COMMANDS_GUIDE.md`）并在 `docs/toolbox-index.json` 关联。
- [x] 3. 更新 `scripts/sync-to-global.mjs`，将 `workflows/*.md` 与轻量 `plugin.json` 同步到 `<targetRoot>/config/plugins/ps-openspec/`，并在 `scripts/tests/sync-to-global.test.mjs` 补充验证断言。
- [x] 4. 运行全套 L2 守卫（含 `guard:single-entry-hub`、`guard:anti-hardcoding --git-diff`、`guard:unslop`、`guard:neutrality`、`guard:privacy`）及单元测试。
- [x] 5. 执行 `scripts/sync-to-global.ps1` 部署至本机 `~/.gemini/config/plugins/ps-openspec/`，提交并推送至 `origin/release/ps-openspec-v3.00`。
