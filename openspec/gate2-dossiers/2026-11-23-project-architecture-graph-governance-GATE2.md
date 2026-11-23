# 【门禁 2：Ps-openspec 规格立法与双清单施工图纸 (Gate 2 Dossier)】
## 项目级架构与维护 Graph 体系及防重复错误改动治理 (Axiom 70)

- **立案时间**: 2026-11-23T15:52:00+08:00
- **变更标识符**: `project-architecture-graph-governance`
- **事实指纹**: `53323fb479f80d36375a765aea515a3ad7f26389cf33cbad202408a1973c9032`
- **OpenSpec 验证状态**: `npx openspec validate project-architecture-graph-governance --strict` -> **VALID (Exit Code 0)**

---

## 一、 规格与设计资产索引

- 变更提案：[proposal.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/project-architecture-graph-governance/proposal.md)
- 增量规格：[specs/orbitstack-pstack-routing/spec.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/project-architecture-graph-governance/specs/orbitstack-pstack-routing/spec.md)
- 技术设计：[design.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/project-architecture-graph-governance/design.md)
- 任务清单：[tasks.md](file:///D:/APP/AI%20app/Antigravity/AI-Harness-Code/openspec/changes/project-architecture-graph-governance/tasks.md)

---

## 二、 法定双清单自证 (Statutory Dual Checklists)

### 1. 拟变范围清单 (Proposed Scope & Causal Roles)

| 目标文件 | 因果角色 | 变更内容与原因 |
| :--- | :--- | :--- |
| `.harness/project-graph.json` | `[Root Source]` | 为本仓库构建首个标准项目架构与维护 Graph（含模块边界、依赖边、风险分级、维护事项及结构化守卫映射）。 |
| `scripts/check-project-graph.mjs` | `[Root Source]` | 新建 L2 确定性静态守卫与冷启动初始化脚本（支持 Schema 校验、路径防腐烂校验、热点熔断校验及 `--init` 建图向导）。 |
| `package.json` | `[State Transition]` | 注册 `guard:graph` 脚本命令 (`node scripts/check-project-graph.mjs`)。 |
| `GEMINI.md` | `[Root Source]` | 立法写入 **Axiom 70**（`PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM`）及首屏索引锚点（严禁挤占超过 20 KB 安全区）。 |
| `skills/pstack-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Axiom 70**。 |
| `skills/ai-harness-openspec/SKILL.md` | `[State Transition]` | 三镜像同构同步 **Invariant 67**（对齐 Axiom 70）。 |
| `worker.md` | `[State Transition]` | 补充基于 Graph 定位问题模块、计算爆炸半径与热点熔断的执行规程。 |
| `tests/project-architecture-graph.test.mjs` | `[Verifier]` | 新建自动化 L2 测试套件，验证 Graph Schema、防腐烂、热点熔断、爆炸半径追踪与三镜像同构。 |
| `scripts/tests/gemini-adapter.test.mjs` | `[Verifier]` | 增补 Axiom 70 回归断言。 |

### 2. 保持现状承诺清单 (Leave-As-Is Commitment)

- **既有公理 1–69 绝对豁免**：严格保留 `GEMINI.md` 中既有公理 1–69 以及首屏 `MANDATORY_BOOTSTRAP_PROTOCOL` 的原有语义与结构；
- **既有守卫脚本与测试套件**：不修改 `check-neutrality`、`check-unslop-purity`、`check-workflow-spec-compliance`、`check-invocation-purity`、`check-issue-clearance`、`check-universal-portability` 及既有测试用例；
- **上游原生镜像**：`C:\Users\Administrator\.gemini\pstack-upstream\` 保持 100% 绝对只读；
- **纯通用工程抽象**：不向任何全局资产注入特定业务情境或产品词汇。

---

## 三、 停机等待授权

> 🛑 **【门禁 2 物理禁令】**：以上 OpenSpec 规格与双清单施工图纸尚未动笔修改任何业务代码或宪法文件，现严格停机等待您的明确批准（如“批准动工/执行”）。
