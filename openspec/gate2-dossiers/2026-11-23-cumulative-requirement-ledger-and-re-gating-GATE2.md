# 【门禁 2：Ps-openspec 规格立法与双清单施工图纸 (Gate 2 Dossier)】
## 多轮交互动态滚动需求合账、原子拆解与变更重过门禁体系 (Axiom 71)

- **立案时间**: 2026-11-23T16:45:30+08:00
- **变更标识符**: `cumulative-requirement-ledger-and-re-gating`
- **事实指纹**: `3183c871f5eb6f91353a28bb57ac6e6654daa785907a3445ee3550540f781f6c`
- **OpenSpec 验证状态**: `npx openspec validate cumulative-requirement-ledger-and-re-gating --strict` -> **VALID (Exit Code 0)**

---

## 一、 规格与设计资产索引

- 变更提案：[proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/cumulative-requirement-ledger-and-re-gating/proposal.md)
- 增量规格：[specs/orbitstack-pstack-routing/spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/cumulative-requirement-ledger-and-re-gating/specs/orbitstack-pstack-routing/spec.md)
- 技术设计：[design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/cumulative-requirement-ledger-and-re-gating/design.md)
- 任务清单：[tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/cumulative-requirement-ledger-and-re-gating/tasks.md)

---

## 二、 法定双清单自证 (Statutory Dual Checklists)

### 1. 拟变范围清单 (Proposed Scope & Causal Roles)

| 目标文件 | 因果角色 | 变更内容与原因 |
| :--- | :--- | :--- |
| `scripts/check-ledger-continuity.mjs` | `[Root Source]` | 新建 L2 累计需求账本守卫（支持多轮版本守恒校验、`activeCount === verifiedCount` 校验、Re-Gating 检查及 Graph 联动多轮回归检测）。 |
| `.harness/requirement-ledger.json` | `[Root Source]` | 为本变更建立标准机器可读累计需求账本（Dogfooding）。 |
| `.harness/project-graph.json` | `[State Transition]` | 依 Axiom 70 同步登记新增脚本与测试模块到 `mod-guards-and-sync` 与 `mod-verification-suites`。 |
| `package.json` | `[State Transition]` | 注册 `guard:ledger-continuity` 脚本命令。 |
| `GEMINI.md` | `[Root Source]` | 立法写入 **Axiom 71**（`CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM`）。 |
| `skills/pstack-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Axiom 71**。 |
| `skills/ai-harness-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Invariant 68**（对齐 Axiom 71）。 |
| `worker.md` | `[State Transition]` | 增补 `Section 1g` 多轮累计账本与防覆盖回归执行规程。 |
| `tests/cumulative-requirement-ledger.test.mjs` | `[Verifier]` | 新建自动化 L2 测试套件，验证增量合并守恒、禁止粗粒度压缩、Re-Gating 阻断、Graph 联动回归及三镜像同构。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Verifier]` | 增补 Axiom 71 回归断言。 |

### 2. 保持现状承诺清单 (Leave-As-Is Commitment)

- **既有公理 1–70 绝对豁免**：严格保留 `GEMINI.md` 中既有公理 1–70 以及首屏 `MANDATORY_BOOTSTRAP_PROTOCOL`；
- **既有守卫脚本与测试套件**：不修改既有 `guard:*` 脚本与既有测试用例逻辑；
- **纯通用工程抽象**：100% 采用通用软件工程概念，绝不夹带任何特定业务领域词汇。

---

> 🛑 **【门禁 2 物理禁令】**：尚未动笔修改任何源码或宪法文件，现严格停机等待您的授权批准（如“批准动工/执行”）。
