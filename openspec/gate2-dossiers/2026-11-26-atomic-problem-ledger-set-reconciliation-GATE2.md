# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `atomic-problem-ledger-set-reconciliation`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-atomic-problem-ledger-set-reconciliation-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[L2 Guard]` `scripts/check-problem-ledger-ruling.mjs` — 增补原子拆条禁打包、源集物理集合差值核销与逐原子豁免理由校验。
2. `[Constitution & Docs]` `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`（第 77 项）、`worker.md`（Section 1p）、`README.md` — 同步增补 Axiom 80 零漏斗集合差值防线。
3. `[Verification]` `tests/problem-ledger-ruling.test.mjs` — 新增复合打包吞并、多轮聚焦蒸发、无理由整包豁免等历史漏斗反证用例。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改其他 16 项 `guard:*` 脚本与 `bundle/pstack-upstream/`；
- 绝不在通用规范、守卫或测试中引入任何特定业务场景术语。
