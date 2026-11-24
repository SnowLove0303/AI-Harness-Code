# 【门禁 2：Ps-openspec 规格立法与双清单施工图纸 (Gate 2 Dossier)】
## 同步升级 `pstack v0.15.48` 并融合 `/reframe` 需求升维机制 (Axiom 72)

- **立案时间**: 2026-11-24T09:28:00+08:00
- **变更标识符**: `pstack-v01548-reframe-fusion`
- **OpenSpec 验证状态**: `npx openspec validate pstack-v01548-reframe-fusion --strict` -> **VALID (Exit Code 0)**

---

## 一、 规格与设计资产索引

- 变更提案：[proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/pstack-v01548-reframe-fusion/proposal.md)
- 增量规格：[specs/orbitstack-pstack-routing/spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/pstack-v01548-reframe-fusion/specs/orbitstack-pstack-routing/spec.md)
- 技术设计：[design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/pstack-v01548-reframe-fusion/design.md)
- 任务清单：[tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/pstack-v01548-reframe-fusion/tasks.md)

---

## 二、 法定双清单自证 (Statutory Dual Checklists)

### 1. 拟变范围清单 (Proposed Scope & Causal Roles)

| 目标文件 | 因果角色 | 变更内容与原因 |
| :--- | :--- | :--- |
| `C:\Users\Administrator\.gemini\pstack-upstream\` | `[Root Source]` | 同步上游 `v0.15.48`（更新 `plugin.json`、新增 `skills/reframe/SKILL.md`、同步 `skills/statechart/` Windows `\r\n` 修复）。 |
| `scripts/check-pstack-sync.mjs` | `[Root Source]` | 新建上游版本同步巡检、`/reframe` 模糊阈值判定器（`evaluateReframeTrigger`）及反虚构引用核验器（`validateCitations`）。 |
| `docs/pstack-openspec-route-map.json` | `[State Transition]` | 在 `companionSkills` 注册 `/reframe` 路由（保持 `routes.length === 23` 既有承重墙不变量）。 |
| `skills/pstack-openspec/references/playbooks-catalog.md` | `[State Transition]` | 登记 `/reframe` 伴生能力索引。 |
| `.harness/project-graph.json` | `[State Transition]` | 依 Axiom 70 登记新增脚本与测试模块。 |
| `package.json` | `[State Transition]` | 注册 `guard:pstack-sync` 命令。 |
| `GEMINI.md` | `[Root Source]` | 立法写入 **Axiom 72**（`PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM`）。 |
| `skills/pstack-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Axiom 72**。 |
| `skills/ai-harness-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Invariant 69**（对齐 Axiom 72）。 |
| `worker.md` | `[State Transition]` | 增补 `Section 1h` `/reframe` 按需升维与反虚构引用执行纪律。 |
| `tests/pstack-reframe-fusion.test.mjs` | `[Verifier]` | 新建 L2 自动化测试套件，验证上游版本、`evaluateReframeTrigger`、`validateCitations`、路由注册及 Axiom 72 三镜像同构。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Verifier]` | 增补 Axiom 72 回归断言。 |

### 2. 保持现状承诺清单 (Leave-As-Is Commitment)

- **23 Playbooks 路由数量不变量**：`docs/pstack-openspec-route-map.json` 中 `routes` 数组严格保持 23 项；
- **既有公理 1–71 绝对豁免**：严格保留 `GEMINI.md` 中既有公理 1–71 及首屏 `MANDATORY_BOOTSTRAP_PROTOCOL`；
- **既有守卫与测试用例**：不破坏任何既有 `guard:*` 守卫逻辑，保持 100% 纯通用软件工程抽象。

---

> 🛑 **【门禁 2 物理禁令】**：尚未修改任何代码或宪法文件，现严格停机等待您的授权批准（如“批准动工/执行”）。
