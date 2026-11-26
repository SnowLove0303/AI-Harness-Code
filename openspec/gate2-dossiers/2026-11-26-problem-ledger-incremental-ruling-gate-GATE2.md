# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `problem-ledger-incremental-ruling-gate`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-problem-ledger-incremental-ruling-gate-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[L2 Guard]` `scripts/check-problem-ledger-ruling.mjs` — 新增问题清单增量合并与未裁定条目反问门禁守卫（`npm run guard:problem-ruling`）。
2. `[Registry & Graph]` `package.json`、`.harness/project-graph.json` — 注册 `guard:problem-ruling`。
3. `[Root Source / Constitution]` `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`（第 77 项）、`worker.md`（Section 1p）— 同构固化 **Axiom 80**。
4. `[Verification]` `tests/problem-ledger-ruling.test.mjs`、`scripts/tests/gemini-adapter.test.mjs` — 新增“1,2,3,4 仅答 2 号反问 1,3,4”历史反证测试与三镜像回归断言。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改既有 `scripts/check-ledger-continuity.mjs` 与 `scripts/check-issue-clearance.mjs` 逻辑；
- 绝不修改 `C:\Users\Administrator\.gemini\pstack-upstream\` 只读上游镜像；
- 绝不在通用规范、守卫或测试中引入任何特定业务场景术语。
