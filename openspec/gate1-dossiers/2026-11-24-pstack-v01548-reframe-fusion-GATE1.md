# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 同步升级 pstack v0.15.48 并融合 `/reframe` 需求术语升维机制至 Ps-openspec 体系 (Axiom 72)

- **立案时间**: 2026-11-24T09:22:00+08:00
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **上游基准版本**: `cursor/plugins/pstack` `v0.15.36` -> `v0.15.48`

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

```text
1. 看下poteto有什么新的东西
2. (确认引入 pstack v0.15.48 与 /reframe 融合提案): 执行
```

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **同步上游原生镜像至 `pstack v0.15.48`** | **GIVEN** 本地 `pstack` 上游镜像停留在 `v0.15.36`，远端已发布至 `v0.15.48`；<br>**WHEN** 执行上游同步与对齐时；<br>**THEN** 系统 SHALL 拉取并同步最新上游技能与修复资产（含 `/reframe`、`statechart` Windows `\r\n` 修复及最新路由配置），确保本地上游镜像版本与 `0.15.48` 一致。 | 1. 本地 `pstack-upstream` 版本号更新为 `0.15.48`；<br>2. 新增 `/reframe` 技能完整落盘；<br>3. 上游核心变更清单可追溯核验。 |
| **REQ-2** | **融合 `/reframe` 机制至 Step 0 需求升维与歧义消解** | **GIVEN** 用户在 Step 0 给出模糊、口语化或可能指向多个工程问题的需求描述；<br>**WHEN** 智能体执行 Gate 1 需求对齐与前瞻性头脑风暴时；<br>**THEN** 系统 SHALL 融合 `/reframe` 范式：（1）先列出 2–3 个可能对应的问题定义及其工程名称与区分标志；（2）提供高影响度的专家术语映射与邻近领域架构借鉴；（3）点出隐含遗漏关切点；（4）用精准工程术语重述需求供用户确认，与 Axiom 69（A, B -> C, D, E）深度咬合。 | 1. 模糊需求在 Gate 1 必触发歧义消解与术语升维模块；<br>2. 与既有 1:1 RTM 及 `PROP-C/D/E` 无缝共存；<br>3. 严禁虚构未核验的外部论文或链接引用。 |
| **REQ-3** | **全局路由表与能力目录注册 `/reframe`** | **GIVEN** 全局路由表与技能索引管辖所有可用 Playbooks 与 Skills；<br>**WHEN** 接入 `/reframe` 技能时；<br>**THEN** 系统 SHALL 将 `/reframe` 正式纳入全局路由映射与标准能力目录，明确其适用触发场景、算力分级建议及在 OpenSpec 生命周期中的落点（Step 0 / Explore）。 | 1. 路由表包含 `/reframe` 合法路由条目与算力等级；<br>2. 全局技能索引与路由完整性测试全部通过。 |
| **REQ-4** | **Windows 原生 `/statechart` 兼容与模型路由对齐** | **GIVEN** 本体系主要运行于 Windows 环境且上游刚修复了原生 Windows `/statechart` 与 TLC `\r\n` 换行兼容问题；<br>**WHEN** 吸收上游 `0.15.48` 更新时；<br>**THEN** 系统 SHALL 同步吸收 Windows `/statechart` 兼容性修复与最新模型路由更新，保证跨平台行为一致。 | 1. `statechart` 相关资产与上游 `0.15.48` 保持同步；<br>2. 原生 Windows 路径与 `\r\n` 换行处理无异常。 |
| **REQ-5** | **Axiom 72 三镜像宪法立法与纯通用抽象验证** | **GIVEN** 需将 `/reframe` 需求升维与上游同步治理固化为全局准则；<br>**WHEN** 执行宪法固化时；<br>**THEN** 系统 SHALL 将其作为 **Axiom 72** 同构写入核心宪法三镜像，保持 100% 纯通用软件工程抽象，并配备自动化 L2 测试套件取得 Exit Code 0。 | 1. 三份宪法镜像中 Axiom 72 语义 100% 同构；<br>2. 全仓守卫与回归测试套件退出码均为 0。 |

---

### 2. 本次任务专属：《前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)》

| 提案编号 | 推演伴生诉求 (Anticipated Requirement) | 衍生技术背景与因果分析 | 建议处理方式 |
| :--- | :--- | :--- | :--- |
| **PROP-C** | **`/reframe` 模糊度阈值门控（防清晰指令过度说教）** | 当用户给出极其精确的工程指令（如具体文件、具体报错堆栈、精确公式）时，强行输出 8–12 个基础术语科普会严重拖慢节奏、制造噪音。 | **建议纳入**：设定“按需触发阈值”——清晰精确指令直接按原意立案；仅当描述存在多义性、口语化抽象或跨领域映射需求时才展开完整 `/reframe` 术语升维。 |
| **PROP-D** | **上游 `pstack` 版本差异只读巡检脚本** | 每次手工去 GitHub 对比 `pstack` 有没有新 commit 效率较低，容易遗漏上游最新演进。 | **建议纳入**：提供一个轻量的只读检查脚本或 CLI 参数，可一键比对本地与远端 `pstack` 版本及新增技能列表。 |
| **PROP-E** | **`/reframe` 反虚构引用与实证锚定铁律** | 上游 `/reframe` 明确要求“Open every link and confirm it uses the term that way. Cut any citation you can't confirm.”，防止大模型在解释术语时编造论文和假链接。 | **建议纳入**：在 Axiom 72 中将“无实测核验严禁引用外部 URL/论文”列为硬阻断规则。 |

---

## 板块三：法定门禁物理隔离禁令确认

> 🛑 **【门禁 1 物理禁令】**：本备忘录纯粹确认“做什么与验收标准”，未修改任何业务代码或宪法文件；现等待您确认 `REQ-1 ~ REQ-5` 及 `PROP-C / PROP-D / PROP-E` 的取舍意见。
