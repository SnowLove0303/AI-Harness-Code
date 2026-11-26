# Step 0 需求全量对账备忘录（门禁 1 / Gate 1）

- **任务代号**: `pstack-openspec-readme-deep-manual`
- **立案时间**: `2026-11-26T10:30:30+08:00`
- **适用体系**: `OrbitStack (Pstack-openspec)` — Step 0 Spec-Kit 需求零损耗立案协议

## 1. 原始用户输入（100% 逐字留存 / Fact Fingerprint）
> 感觉仓库的Readme写的不够详细啊，不够完整说明我整个Pstack-openspec体系

## 2. 1:1 需求物理对账矩阵 (RTM)

### REQ-01：深度阐述 `Pstack-openspec` 在 OrbitStack 轨道工程中的定位、设计哲学与三层融合架构
- **场景故事**：外部工程师或新接入的 Agent 打开 `SnowLove0303/Pstack-openspec` 时，现有 `README.md` 过于简略，无法完整传达为什么需要 `Pstack-openspec`、它如何作为 OrbitStack 轨道工程的 **Agent 执行策略层**，以及它如何将 `PStack`、`OpenSpec` 与 `AI-Harness` 深度融合。
- **详细功能契约**：
  - 在 `README.md` 中完整讲透：
    1. 体系解决的核心工程痛点（上下文漂移、虚假完成宣称、头痛医头单点硬编码、无监督机械直出、静默丢弃需求、多智能体蔓延失控）；
    2. OrbitStack 分层定位与 `PStack`（执行剧本与原则内核）+ `OpenSpec`（唯一持久状态账本）+ `AI-Harness`（工程承重墙与 L2 自动化守卫）的三位一体咬合关系。
- **独立验收指标**：
  - `README.md` 清晰完整地呈现设计背景、OrbitStack 分层定位与三核融合架构。

### REQ-02：完整展开核心治理体系（五层金字塔、双门禁 SOP、两阶双轨审计与 Axioms 1–80 精华）
- **场景故事**：读者需要通过 `README.md` 系统性掌握 `Pstack-openspec` 的完整运转机制，而不仅是看到几个名词。
- **详细功能契约**：
  - 在 `README.md` 中详尽展开：
    1. **Lauren Tan 五层信任防御金字塔（L1–L5）** 逐层机制；
    2. **Step 0–Step 5 六步双阶段实战闭环 SOP**（含门禁 1 Spec-Kit 1:1 RTM、Step 1 只读 Explore、门禁 2 OpenSpec 四大资产与双清单、Step 3 `[-]` 单焦点执行锁与 VS Code 原生 Diff 检阅、Step 4 高频原子提交、Step 5 1:1 双向核销与盲审归档）；
    3. **两阶双轨深度审计体系**（第一步机械确定性审计 + 变异反欺诈；第二步 Fresh Blind Auditor 语义证伪）；
    4. **核心演进公理全景分类导览（覆盖至 Axiom 80）**：含问题类泛化与反特指硬编码（Axiom 78）、五维问题头脑风暴与 `/correct` 四级防线升级（Axiom 79）、问题清单增量合并与未裁定条目主动反问（Axiom 80）、智能体防蔓延与角色复用锁（Axiom 77）、源码防篡改封印 `@ANTIGRAVITY_INVARIANT_LOCK`、项目架构依赖图与累计需求台账。
- **独立验收指标**：
  - 上述四大核心治理支柱均在 `README.md` 中有结构化、详尽、无遗漏的体系化说明。

### REQ-03：完整展开 10 大受管技能生态、23 剧本路由、17 项 L2 守卫矩阵与全场景操作手册
- **场景故事**：使用和维护本仓库的开发者需要一份可直接查表落地的完整操作手册，覆盖所有技能、守卫、安装脚本、全局同步与安全合规校验。
- **详细功能契约**：
  - 详尽列出并解释 **10 大受管技能** 的定位与触发场景、**23 个 PStack Playbook** 路由机制、**17 项 `npm run guard:*` 自动化 L2 静态守卫** 的检验逻辑与命令、以及从零安装、一键全局应用（`sync-to-global.mjs`）、跨项目注入与发布包维护的完整步骤；
  - 扩写后的 `README.md` 必须继续 100% 通过 `guard:neutrality`、`guard:unslop`、`guard:privacy` 与全部 17 项守卫校验。
- **独立验收指标**：
  - 全部 10 项技能、17 项守卫与全部操作流程在 `README.md` 中完整准确，且全量 L2 守卫退出码为 0。

## 3. 前瞻性扩展提案清单（供确认）
- **提案 A（双 Mermaid 架构与闭环流程图）**：在 `README.md` 中嵌入两张高信息密度 Mermaid 图（① 系统分层与五层信任金字塔拓扑；② Step 0–Step 5 双门禁 + 问题处理头脑风暴 + 盲审闭环流转图）。
- **提案 B（反模式 vs. Pstack-openspec 防线对照表）**：增设“常见 AI 编程失效模式 vs. Pstack-openspec 机械化防线”对照表，直观体现每项机制的工程价值。
- **提案 C（全量守卫与 `SnowLove0303/Pstack-openspec` 同步推送）**：完成后运行全量 17 项守卫与 5 套测试套件，确认 0 违规后归档并推送至远程仓库。
