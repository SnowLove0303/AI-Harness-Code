# Pstack 核心 Playbooks 目录与路由索引
## Pstack Playbooks & Execution Catalog

Lauren Tan（@poteto）在 Pstack 中将常见的软件工程任务提炼为 20 余个结构化的**剧本（Playbooks）**。当通过 `/poteto-mode` 唤醒 Agent 时，系统将根据用户意图自动识别并挂载对应的 Playbook。

---

## 🧭 一、 任务分类与 Playbook 映射矩阵

| 任务类型 | 核心 Playbook | 典型应用场景 | 强制遵守的关键原则 |
| :--- | :--- | :--- | :--- |
| **元编排与协作** | `orchestrate` | 复杂大任务的目标拆解与子模块分发 | Guard the Context Window, Sequence Work |
| | `session-pickup` | 断点续传，读取前序未完的上下文与草稿 | Leave-as-is, Minimize Reader Load |
| | `arena` | 多模型/多思路竞相实现，选出最佳方案 | Foundational Thinking, Experience First |
| | `swarm` | 多个子 Agent 并行推进互不干扰的独立模块 | Separate Before Serializing, Boundaries |
| **缺陷排查与修复** | `bugfix` | 任何疑难杂症、线上缺陷、逻辑报错 | **Reproduce First, Fix Root Causes, Roll Back** |
| **新功能研发** | `feature` | 全新模块、API 或 UI 功能开发 | **Model the Domain, Red Light Before Green** |
| **代码重构与演进** | `refactor` | 清理技术债、优化结构、消除代码坏味道 | **Subtract Before You Add, Preserve Functionality** |
| | `migration` | 破坏性升级、大版本迁移、接口废弃 | **Migrate Callers Then Delete Legacy APIs** |
| | `performance` | 耗时优化、高并发锁竞争、内存治理 | **Prove It Works, Foundational Thinking** |
| **探查与架构对齐** | `how` | 梳理陌生的复杂调用链与数据流向 | Boundary Discipline, Minimize Reader Load |
| | `why` | 调查代码设计背后的历史意图与权衡 | Model the Domain, Encode Lessons |
| | `figure-it-out` | 攻坚未知的第三方库、未公开 API 或协议 | Foundational Thinking, Guard Context |
| | `teach` | 向人类开发者讲透底层实现与关键原理 | Minimize Reader Load, Experience First |
| **质量审查与交付** | `unslop` | 清洗大模型常见的垃圾代码与废话注释 | **Unslop Every Output, Laziness Protocol** |
| | `interrogate` | 充当对抗式红队架构师进行全方位代码挑刺 | **Boundary Discipline, Type System Discipline** |
| | `show-me-your-work` | 严格审计执行记录与验证命令真实退出码 | **Prove It Works (Evidence Over Assertion)** |

---

## ⚡ 二、 /poteto-mode 自动化路由工作流

当用户输入 `/poteto-mode <目标与验收标准>` 时，系统遵循以下确定性调度规则：

1. **意图诊断 (Intent Analysis)**：
   - 是否包含现有报错或预期不符？ $\rightarrow$ 挂载 `bugfix` Playbook。
   - 是否需要改动架构或新增功能？ $\rightarrow$ 挂载 `feature` 或 `refactor` Playbook。
   - 是否需求模糊或仅需要技术方案？ $\rightarrow$ 分流至 Phase 1 挂载 `how` / `why` / `orchestrate`。
2. **加载工程纪律 (Load Principles)**：
   - 提取与该任务高度关联的 3~5 条 Pstack 核心原则，并在思考区中显式声明：“*本任务将严格受 [Reproduce First] 与 [Subtract Before You Add] 原则约束*”。
3. **驱动 OpenSpec 执行**：
   - 调度 OpenSpec 生成规范的变更目录与双清单；
   - 施工后自动串联 `/unslop` 与 `/interrogate` 进行终审。
