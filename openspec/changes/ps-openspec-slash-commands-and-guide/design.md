# Design: Ps-openspec Slash Commands & Guide

## 1. 目录与部署拓扑
```text
Pstack-openspec/
├── workflows/
│   ├── ps-gate1.md
│   ├── ps-explore.md
│   ├── ps-gate2.md
│   ├── ps-apply.md
│   ├── ortho-audit.md
│   ├── ps-verify.md
│   └── ps-guide.md
└── docs/
    └── SLASH_COMMANDS_GUIDE.md

同步目标 (sync-to-global.mjs):
~/.gemini/config/plugins/ps-openspec/
├── plugin.json          (自动生成的极简插件清单)
└── workflows/*.md       (7 个斜杠指令)
```

## 2. 轻量化设计原则
1. **指令剧本瘦身**：每个 `workflows/<cmd>.md` 控制在 20–45 行以内，只写清该阶段的硬约束、禁令与需要按需读取的 `~/.gemini/ps-hub/` 技能/脚本路径，避免重复抄写 84 条公理。
2. **安全隔离**：`workflows/` 仅通过 `sync-to-global.mjs` 部署到 `~/.gemini/config/plugins/ps-openspec/`，不向 `GEMINI.md` 写入任何字节。
3. **测试与守卫**：扩展 `scripts/tests/sync-to-global.test.mjs` 验证 `plugin.json` 与 `workflows/ortho-audit.md` 同步及幂等性；全量通过 `guard:single-entry-hub`、`guard:anti-hardcoding --git-diff`、`guard:unslop`、`guard:neutrality`、`guard:privacy`。
