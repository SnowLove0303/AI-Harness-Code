# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `problem-handling-brainstorm-correct`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-problem-handling-brainstorm-correct-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[State Transition / L2 Guard]` `scripts/check-problem-brainstorm.mjs` — 新增 L2 问题处理头脑风暴与防线选型静态守卫。
2. `[Registry]` `package.json` — 注册 `guard:problem-brainstorm` 脚本。
3. `[Architecture Graph]` `.harness/project-graph.json` — 在 `mod-guards-and-sync` 中登记 `scripts/check-problem-brainstorm.mjs`。
4. `[Root Source / Constitution]` `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`（第 76 项）、`worker.md`（Section 1o）— 同构固化公理 79（`SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM`）。
5. `[Verification]` `tests/problem-handling-brainstorm.test.mjs`、`scripts/tests/gemini-adapter.test.mjs` — 新增正负向单元测试与三镜像同构回归断言。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改 `C:\Users\Administrator\.gemini\pstack-upstream\` 只读上游镜像；
- 绝不修改 Axiom 1–78 既有公理逻辑与已有的 14 项 `guard:*` 守卫行为；
- 绝不在通用规范或测试中引入任何特定业务场景硬编码术语。
