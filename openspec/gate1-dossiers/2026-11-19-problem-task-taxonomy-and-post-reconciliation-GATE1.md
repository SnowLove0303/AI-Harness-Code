# 【需求零损耗全量立案与意图对账备忘录 (Gate 1 Dossier)】
## 问题型任务界定标准与完工后对照审计事实核查机制优化 (Axiom 64 Evolution)

- **立案时间**: 2026-11-19T14:41:00+08:00
- **需求事实指纹 (Fact Fingerprint)**: `4655633e3c64989c07227cf10802ed0b11ef89a241006ed4ce46b74ef0cff6ae`
- **生命周期阶段**: Step 0: Spec-Kit Ingestion & Gate 1 Statutory Confirmation
- **关联总纲与宪法**: Ps-openspec (Lauren Tan 信任金字塔) / Axiom 64 (`PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM`)

---

## 板块一：管理者的任务说明原文 (Raw User Prompt Verbatim Mirror)

> 遵循 `RAW_INSTRUCTION_VERBATIM_MIRROR_AXIOM`，100% 逐字保留管理者指令全文，严禁任何形式的摘要、裁剪或语义稀释：

```text
还记得我们昨天 讨论的那个  如果是问题型任务的情况下 的Agent行为限制吗，我认为应该优化一下，首先，需要对 问题型任务做界定，让Agent能够分辨是否是问题型任务，然后，除了门禁当时让你补的清单外，我希望执行完任务后，对任务完成结果与问题清单做对照审计和事实核查，确保所有问题得到解决
```

- **字符数**: 147 字符
- **SHA-256 校验码**: `4655633e3c64989c07227cf10802ed0b11ef89a241006ed4ce46b74ef0cff6ae`

---

## 板块二：第一门禁法医级意图对账与功能契约 (Gate 1 Deep Forensic Feedback Contract)

### 1. 核心诉求法医级根因与背景穿透 (Problem Statement & Deep Intent Analysis)

在现行 Ps-openspec 轨道工程体系中，昨日确立的 **Axiom 64（问题清单全量账本化与零遗漏深度根治公理）** 成功建立了外部问题切片（`[ISSUE-xx]`）、1:1 任务双射、四阶深度根治阶梯（红灯见证 -> 源头根治 -> 结构免疫 -> 全景兄弟排查）与单问题串行专注锁（`[-] lock`）。然而，在实际长程运转与多场景落地过程中，暴露出两大关键治理漏洞：

1. **“问题型任务”界定模糊，智能体缺乏自感知判别能力（Taxonomy Ambiguity）**：
   - 现行规范仅以一句话提及“当任务诉求指向外部缺陷文档、审计清单或问题报告时”，缺乏明确的输入特征库、判别边界与多分类消歧准则；
   - 智能体在面对“修个小Bug顺便加点功能”、“运行报错请看一下”、“审查发现以下不一致”等混合型或隐式报障诉求时，极易因缺乏判别标准而退化为普通特性开发模式，导致 Axiom 64 账本化机制被静默绕过；
2. **“执行完毕后”缺乏强制性的终审对照审计与事实核查（Post-Execution Verification Gap）**：
   - 虽然门禁 2（开工前）强制要求了拟变双清单，且施工过程要求单测通过，但在任务完工交付（Step 5）阶段，智能体往往仅出具笼统的总结报告，容易出现“声称全都修好了，实际部分边缘问题未核销、未做物理对照、缺少真实终端实测证据”的形式主义假通；
   - 必须建立严格的**完工后 1:1 双向对照审计与事实核查（Post-Execution Problem Reconciliation & Fact-Checking Audit）**，将任务最终交付结果与 Step 0 确立的初始问题账本进行严丝合缝的逐项对账核销，确保每一个问题都有据可查、实测全绿、彻底根除。

---

### 2. Spec-Kit 1:1 需求物理对账矩阵 (RTM)

| 需求编号 | 需求名称与核心契约 | 场景故事 (GIVEN / WHEN / THEN) | 独立验收标准与判据 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **REQ-1** | **问题型任务确定性界定与多分类消歧规程**<br>(`PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL`) | **GIVEN** 智能体接收到用户输入的任何工程或运维任务指令；<br>**WHEN** 智能体在 Step 0 进行任务准入分析时；<br>**THEN** 智能体 SHALL 依据标准化特征库（报错堆栈、异常行为、失败测试、外部缺陷单、Issue 列表、Audit Findings、报障工单等）与四分类消歧模型（问题修复 vs 新功能开发 vs 只读调用 vs 纯调研探索）进行任务定性；凡命中缺陷特征者强制判定为问题型任务（或复合型任务中的问题子任务），强制激活总账本切片，严禁逃避公理 64 管控。 | 1. 确立严谨的输入特征判定指标与多分类消歧矩阵；<br>2. 任务定性结论在 Step 0 备忘录中显式冻结；<br>3. 命中缺陷特征未定性为问题型任务者直接一票否决。 |
| **REQ-2** | **《问题清单总账本》全量无损切片与指纹锚定继承**<br>(`MASTER_PROBLEM_LEDGER_PRESERVATION_CONTRACT`) | **GIVEN** 任务已被判定为问题型任务且输入包含 $K$ 项待修缮问题；<br>**WHEN** 智能体建立问题清单总账本时；<br>**THEN** 智能体 SHALL 继承 Axiom 64 规则，将每一项问题切片为规范标识 `[ISSUE-01]` ~ `[ISSUE-K]`，完整冻结五要素（标识、现状代码锚点、复现报错、因果角色、独立验收指标），项数 $N_{\text{Ledger}} \equiv K$ 绝对守恒。 | 1. 账本项数与用户输入问题数 1:1 绝对守恒；<br>2. 每一项完整具备五要素定义；<br>3. 严禁压缩、合并或模糊打包，少于 $K$ 项触发阻断。 |
| **REQ-3** | **任务完成结果与问题清单 1:1 双向对照审计规程**<br>(`POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL`) | **GIVEN** 智能体已完成代码施工与单元测试，准备推进至 Step 5 终审交付；<br>**WHEN** 智能体编制最终交付总结与成果物时；<br>**THEN** 智能体 SHALL 强制调出 Step 0 冻结的《问题清单总账本》，编制《1:1 任务结果与问题账本双向对照清算表》，对全部 $K$ 项问题进行逐项逐条精准对账，显式列出修改生效文件与行号区间（`file:///path#Lxx-Lyy`）及针对性根治方案。 | 1. 终审交付报告必须包含 1:1 双向对照审计清算矩阵；<br>2. 清算表行数必须严格等于 $K$ 项，少一项一票否决；<br>3. 严禁使用“所有问题均已解决”等模糊泛化陈述。 |
| **REQ-4** | **经验实测凭据事实核查与伪解决硬拦截断路器**<br>(`EMPIRICAL_FACT_CHECKING_&_FALSE_RESOLUTION_CIRCUIT_BREAKER`) | **GIVEN** 智能体已完成 1:1 双向对照审计清算表；<br>**WHEN** 校验每一项问题的完成真实性与有效性时；<br>**THEN** 智能体 SHALL 逐条执行事实核查（Fact-Checking），每一项必须出具真实环境实测见证（`[Measured]` 终端退出码 0、复现命令红转绿证据、变异杀伤力测试），证明已彻底源头根治且无副作用；若存在任一项缺少实测证据或仍处于未解决状态，断路器直接输出 Exit Code 1 阻断任务完工与归档（`PROBLEM_RECONCILIATION_DEFICIT_BLOCKED`）。 | 1. 每一项对照记录必须具备真实退出码 0 凭证与红转绿证明；<br>2. 消费端局部掩盖（`SINK_PATCHING_BLOCKED`）判定为事实核查失败；<br>3. 任何核查未通过直接熔断，严禁静默放行或提前退出。 |
| **REQ-5** | **自动化 L2 问题对照审计与事实核查守卫升级**<br>(`AUTOMATED_L2_PROBLEM_RECONCILIATION_GUARD_STANDARD`) | **GIVEN** 系统构建与 CI/CD 流程或执行 `npm run guard:issue-clearance` 时；<br>**WHEN** 静态守卫脚本扫描当前工作区生命周期资产时；<br>**THEN** 守卫脚本 SHALL 自动提取 Gate 1 备忘录中的 $K$ 项 `[ISSUE-xx]`，静态核验不仅测试套件中具备专属断言，且交付报告中 100% 具备 1:1 对照审计清算表与 `[Measured]` 实测指纹；若有效对照项数 $N_{\text{audit}} < K$ 或缺失实测凭证，脚本输出 Exit Code 1 阻断发布并抛出 `PROBLEM_RECONCILIATION_OMISSION_BLOCKED`。 | 1. `scripts/check-issue-clearance.mjs` 具备对照审计与事实核查双重校验能力；<br>2. 变异测试故意删除任一对照断言或实测记录时稳定红灯；<br>3. 真实退出码 0 作为 CI 通行充要条件。 |
| **REQ-6** | **最高宪法公理 64 升级立法与三镜像同构固化**<br>(`AXIOM_64_EVOLUTION_LEGISLATION_&_DOMAIN_NEUTRALITY`) | **GIVEN** 完成上述标准规程制定；<br>**WHEN** 固化至系统核心宪法与规约时；<br>**THEN** 智能体 SHALL 将问题型任务界定与完工后对照审计事实核查规程作为 Axiom 64 的升级法定条款，同步写入 `GEMINI.md`、`skills/pstack-openspec/SKILL.md` 与 `skills/ai-harness-openspec/SKILL.md`，保持 100% 领域中立与纯通用工程抽象。 | 1. 三份宪法镜像中 Axiom 64 内容严格保持语义同构；<br>2. 100% 采用纯通用软件工程语言，零业务情境词汇泄漏；<br>3. `gemini-adapter.test.mjs` 增补对应断言并测试全绿。 |

---

## 板块三：法定门禁物理隔离禁令确认 (Gate 1 Physical Fence Affirmation)

> 🛑 **【门禁 1 物理禁令自查与遵守承诺】**：
> 1. 本备忘录纯粹 100% 聚焦于确认“做什么与验收标准 (What & Acceptance Criteria)”，彻底锁定管理者的真实需求与意图边界；
> 2. **本备忘录绝对未夹带任何具体代码实现方案、技术框架选型讨论或拟变文件路径清单**；
> 3. 所有技术架构设计、拟变双清单编制、状态机转移建模与原子任务编排，均严格被封印至用户批准 Gate 1 之后的 **Step 2 (OpenSpec 规格立法)** 阶段。
