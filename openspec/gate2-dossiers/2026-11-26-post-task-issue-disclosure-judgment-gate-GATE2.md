# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `post-task-issue-disclosure-judgment-gate`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-post-task-issue-disclosure-judgment-gate-GATE1.md`

## 1. 法定双清单

### 1.1 拟变范围清单 (Proposed Mutation Scope)
1. `[L2 Guard]` `scripts/check-problem-ledger-ruling.mjs` — 新增 `validatePostTaskIssueDisclosure`（拦截过程遇错静默吞没 `SILENT_INCIDENT_SUPPRESSION_BLOCKED` 与未请用户判断 `USER_JUDGMENT_INVITATION_MISSING_BLOCKED`）及 Axiom 81 三镜像同构校验。
2. `[Constitution & Docs]` `GEMINI.md`、`skills/pstack-openspec/SKILL.md`、`skills/ai-harness-openspec/SKILL.md`（第 78 项）、`worker.md`（Section 1q）、`README.md` — 同构固化 **Axiom 81**。
3. `[Verification]` `tests/problem-ledger-ruling.test.mjs`、`scripts/tests/gemini-adapter.test.mjs` — 新增正负向单元测试与三镜像回归断言。

### 1.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改其他 16 项 `guard:*` 脚本与 `bundle/pstack-upstream/`；
- 绝不在通用规范、守卫或测试中引入任何特定业务场景术语。
