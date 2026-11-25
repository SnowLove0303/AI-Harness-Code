# 【门禁 2：Ps-openspec 规格立法与双清单施工图纸 (Gate 2 Dossier)】
## 反智能体蔓延、专职角色持久复用与启停人工授权门禁体系 (Axiom 77)

- **立案时间**: 2026-11-25T10:51:30+08:00
- **变更标识符**: `controlled-agent-sprawl-reuse-lifecycle`
- **OpenSpec 验证状态**: `npx openspec validate controlled-agent-sprawl-reuse-lifecycle --strict` -> **VALID (Exit Code 0)**

---

## 一、 规格与设计资产索引

- 变更提案：[proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/controlled-agent-sprawl-reuse-lifecycle/proposal.md)
- 增量规格：[specs/orbitstack-pstack-routing/spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/controlled-agent-sprawl-reuse-lifecycle/specs/orbitstack-pstack-routing/spec.md)
- 技术设计：[design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/controlled-agent-sprawl-reuse-lifecycle/design.md)
- 任务清单：[tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/controlled-agent-sprawl-reuse-lifecycle/tasks.md)

---

## 二、 法定双清单自证 (Statutory Dual Checklists)

### 1. 拟变范围清单 (Proposed Scope & Causal Roles)

| 目标文件 | 因果角色 | 变更内容与原因 |
| :--- | :--- | :--- |
| `scripts/check-agent-lifecycle.mjs` | `[Root Source]` | 新建 L2 智能体启停与复用策略守卫（拦截未经允许并发多开 `UNAUTHORIZED_MULTI_AGENT_SPAWN_BLOCKED`、同角色重复拉起 `DUPLICATE_ROLE_INSTANCE_BLOCKED`、未经允许关闭 `UNAUTHORIZED_AGENT_TERMINATION_BLOCKED`）。 |
| `package.json` | `[State Transition]` | 注册 `guard:agent-lifecycle` 命令。 |
| `.harness/project-graph.json` | `[State Transition]` | 登记新增守卫与测试模块到 Project Graph。 |
| `GEMINI.md` | `[Root Source]` | 在 Axiom 30/61 冲突条款标注 `[SUPERSEDED BY AXIOM 77]`，并立法写入 **Axiom 77**。 |
| `skills/pstack-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Axiom 77**。 |
| `skills/ai-harness-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Invariant 74**（对齐 Axiom 77）。 |
| `worker.md` | `[State Transition]` | 增补 `Section 1m` 反蔓延、专职角色复用与禁止擅自关闭纪律。 |
| `tests/controlled-agent-lifecycle.test.mjs` | `[Verifier]` | 新建 L2 测试套件，验证多开阻断、同角色复用、禁止擅自 kill、聚焦交接与三镜像同构。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Verifier]` | 增补 Axiom 77 回归断言。 |

### 2. 保持现状承诺清单 (Leave-As-Is Commitment)

- 保留既有公理 1–76 的既有核心语义（仅在 Axiom 30/61 冲突处显式标注由 Axiom 77 接管）；
- 保持既有所有 `guard:*` 守卫与既有测试用例逻辑原封不动。

---

> 🛑 **【门禁 2 物理禁令】**：尚未修改任何源码或宪法文件，现严格停机等待您的授权批准（如“批准动工/执行”）。
