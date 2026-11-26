# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `ps-openspec-maintenance-global-sync`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-ps-openspec-maintenance-global-sync-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[Sync Engine]` `scripts/sync-to-global.mjs` — 收口为表驱动同步清单，补齐全部 10 个 `skills/*` 技能与全部 L2 `check-*.mjs` 守卫脚本的全局同步。
2. `[Entry Docs]` `README.md` — 同步更新核心资产目录、15 项 `guard:*` 守卫矩阵、10 大技能生态、全局同步命令与 `release/ps-openspec-v2.00` 维护说明。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改 `packages/ai-harness/` 随包分发产物与文档（保持 `guard:neutrality` 0 命中）；
- 绝不修改 `C:\Users\Administrator\.gemini\pstack-upstream\` 只读上游镜像；
- 绝不触碰受保护的 `.codex` 路径。
