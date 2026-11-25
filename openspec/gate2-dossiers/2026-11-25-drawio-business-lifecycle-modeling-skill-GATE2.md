# 【门禁 2：Ps-openspec 规格立法与双清单施工图纸 (Gate 2 Dossier)】
## 融合 `Agents365-ai/drawio-skill` 的企业研发周期与业务模型 Draw.io 专业绘图体系 (Axiom 76)

- **立案时间**: 2026-11-25T10:33:00+08:00
- **变更标识符**: `drawio-business-lifecycle-modeling-skill`
- **OpenSpec 验证状态**: `npx openspec validate drawio-business-lifecycle-modeling-skill --strict` -> **VALID (Exit Code 0)**

---

## 一、 规格与设计资产索引

- 变更提案：[proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/drawio-business-lifecycle-modeling-skill/proposal.md)
- 增量规格：[specs/orbitstack-pstack-routing/spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/drawio-business-lifecycle-modeling-skill/specs/orbitstack-pstack-routing/spec.md)
- 技术设计：[design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/drawio-business-lifecycle-modeling-skill/design.md)
- 任务清单：[tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/drawio-business-lifecycle-modeling-skill/tasks.md)

---

## 二、 法定双清单自证 (Statutory Dual Checklists)

### 1. 拟变范围清单 (Proposed Scope & Causal Roles)

| 目标文件 | 因果角色 | 变更内容与原因 |
| :--- | :--- | :--- |
| `scripts/check-drawio-model.mjs` | `[Root Source]` | 新建企业生命周期泳道网格编译器（`compileBusinessLifecycleToDrawioXml`）与 Diagram-as-Test XML 校验守卫（检测节点重叠、悬空连线、结构缺失）。 |
| `skills/drawio-mcp/SKILL.md` | `[Root Source]` | 纳入并全面升级 Draw.io 绘图技能：新增跨职能泳道、Stage-Gate 门径、L0/L1 多页分页、字宽防截断及 `libavoid` 正交避障规程。 |
| `package.json` | `[State Transition]` | 注册 `guard:drawio-model` 命令。 |
| `.harness/project-graph.json` | `[State Transition]` | 登记新增守卫与技能到 Project Graph。 |
| `GEMINI.md` | `[Root Source]` | 立法写入 **Axiom 76**（`DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM`）。 |
| `skills/pstack-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Axiom 76**。 |
| `skills/ai-harness-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Invariant 73**（对齐 Axiom 76）。 |
| `worker.md` | `[State Transition]` | 增补 `Section 1l` 企业研发周期模型 Draw.io 建模与 Diagram-as-Test 纪律。 |
| `tests/drawio-business-modeling.test.mjs` | `[Verifier]` | 新建 L2 测试套件，验证泳道网格编译、多页投影、重叠/悬空边阻断与三镜像同构。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Verifier]` | 增补 Axiom 76 回归断言。 |

### 2. 保持现状承诺清单 (Leave-As-Is Commitment)

- **既有公理 1–75 绝对豁免**：严格保留 `GEMINI.md` 中既有公理 1–75 及首屏 `MANDATORY_BOOTSTRAP_PROTOCOL`；
- **既有守卫与测试用例**：不破坏任何既有 `guard:*` 守卫逻辑，保持 100% 纯通用软件工程抽象。

---

> 🛑 **【门禁 2 物理禁令】**：尚未修改任何源码或宪法文件，现严格停机等待您的授权批准（如“批准动工/执行”）。
