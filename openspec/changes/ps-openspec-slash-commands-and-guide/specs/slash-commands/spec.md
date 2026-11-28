# Specification: Ps-openspec Slash Commands & Guide

## ADDED Requirements

### Requirement: 标准化 `/` 斜杠指令集（按需加载、零常驻冗余）
系统 SHALL 在 `workflows/` 目录下提供 7 个符合 Antigravity Workflow Markdown 规范的斜杠指令文件（带 YAML `description` 前置元数据），覆盖研发闭环与正交审计：
- `ps-gate1.md`（`/ps-gate1`）
- `ps-explore.md`（`/ps-explore`）
- `ps-gate2.md`（`/ps-gate2`）
- `ps-apply.md`（`/ps-apply`）
- `ortho-audit.md`（`/ortho-audit`）
- `ps-verify.md`（`/ps-verify`）
- `ps-guide.md`（`/ps-guide`）

#### Scenario: 用户输入 `/ortho-audit` 触发正交与硬编码审计
- **WHEN** 用户在 Antigravity 输入框触发 `/ortho-audit`
- **THEN** 系统 SHALL 加载 `workflows/ortho-audit.md` 剧本，自动衔接 `~/.gemini/ps-hub/skills/ortho-audit/SKILL.md` 与 `check-anti-hardcoding.mjs --git-diff` 执行六步审计。

### Requirement: 全局插件自动同步与指南文档
- `scripts/sync-to-global.mjs` SHALL 将 `workflows/*.md` 与轻量 `plugin.json` 同步部署至 `<targetRoot>/config/plugins/ps-openspec/`，使 Antigravity 全局可发现 `/` 指令。
- 系统 SHALL 提供 `docs/SLASH_COMMANDS_GUIDE.md` 说明各指令触发场景、前置条件与输出产物，且 `GEMINI.md` MUST 保持 0 字节增量。

#### Scenario: 全局同步幂等部署插件与指令
- **WHEN** 运行 `scripts/sync-to-global.ps1` 或 `scripts/tests/sync-to-global.test.mjs`
- **THEN** 目标目录 `<targetRoot>/config/plugins/ps-openspec/plugin.json` 与全部 7 个 `workflows/*.md` SHALL 幂等生成，且第二次运行操作数为 0。
