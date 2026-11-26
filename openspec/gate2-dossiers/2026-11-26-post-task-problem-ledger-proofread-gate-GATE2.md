# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `post-task-problem-ledger-proofread-gate`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-post-task-problem-ledger-proofread-gate-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[L2 Guard]` `scripts/check-problem-ledger-ruling.mjs` — 新增 `validatePostTaskLedgerProofread` 与 `POST_TASK_UNRESOLVED_SOURCE_ISSUES_BLOCKED` 终局校对阻断。
2. `[Constitution & Docs]` `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`、`worker.md`、`README.md` — 同步增补任务后终局校对门禁条文。
3. `[Verification]` `tests/problem-ledger-ruling.test.mjs` — 新增任务后校对正负向单元测试。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改其他 16 项 `guard:*` 脚本与 `bundle/pstack-upstream/`；
- 绝不在通用规范、守卫或测试中引入任何特定业务场景术语。
