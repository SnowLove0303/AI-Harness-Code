# Spec Delta

## ADDED Requirements

### Requirement: 受管文档模板内置人工验收归口纪律

ai-harness 的受管文档模板（`templates/default/AGENTS.md`）SHALL 在四个章节内置"功能验收与 UI 界面调整由人工判定"的纪律，使任意设备执行 `init` 后生成的 `AGENTS.md` 开箱即具备该约束：

1. `Operating Invariants` 章节 SHALL 含一条「人工验收归口」不变量：AI 负责把该类事项推进到可判定状态（复现步骤、改动前后对照材料、验证命令、待核验清单）并如实记录人工结论，人工结论到达前对应任务保持未勾选。
2. `Task Routing` 章节 SHALL 含一条「功能验收与 UI 界面调整」路由，其权威来源为人工判定结论。
3. `Completion Criteria` 章节 SHALL 含一条「人工验收闭环」准出标准：以人工确认结论作为该项准出依据。
4. `Ask for Human Judgment When` 章节 SHALL 含一条覆盖 UI 视觉、交互与验收取向的介入触发条件。

该规则文本 SHALL 位于模板的 `<!-- harness:placeholder -->` 块之外（以保证作者填写占位符时不致删除），SHALL 以正向行动化表述书写（定义允许的标准动作与确定性状态流转），文件编码 SHALL 为 UTF-8。

#### Scenario: 新初始化的根开箱具备人工验收纪律
- **WHEN** 在任意目录执行 `ai-harness init`
- **THEN** 生成的 `AGENTS.md` MUST 在四个章节分别包含上述规则，且对该文件执行 `ai-harness validate --json` MUST 返回 `valid: true` 且无 error 级发现

#### Scenario: 规则文本不随占位符填写而丢失
- **WHEN** 作者按模板指引替换 `<!-- harness:placeholder -->` 块内容
- **THEN** 该纪律条目 MUST 仍保留在文档中，MUST NOT 位于被替换的占位符块内部

#### Scenario: 模板编码与表述符合约束
- **WHEN** 检查 `templates/default/AGENTS.md`
- **THEN** 其编码 MUST 为 UTF-8，且人工验收相关条目 MUST 采用正向动作与封闭作用域表述

### Requirement: 以 Changesets 维护变更记录并随包分发

本仓库 SHALL 以 Changesets 作为版本与变更记录的唯一来源：每项面向使用者的改动 SHALL 附一条 `.changeset/*.md` 记录；发布前 SHALL 执行版本应用，使 `package.json` 版本递增且根 `CHANGELOG.md` 被写入；`CHANGELOG.md` SHALL 位于 `package.json` 的 `files` 白名单内，随包分发。

#### Scenario: 发布前存在变更记录且已应用
- **WHEN** 准备发布新版本
- **THEN** 仓库内 MUST 存在至少一条 `.changeset/*.md`，执行版本应用后 `package.json` 的 `version` MUST 递增且 `CHANGELOG.md` MUST 含该版本条目

#### Scenario: CHANGELOG 随包分发
- **WHEN** 执行打包（`npm pack`）或发布
- **THEN** 产物 MUST 包含 `CHANGELOG.md`

#### Scenario: 版本语义与改动性质一致
- **WHEN** 变更属于模板、Schema 或技能的内容变更
- **THEN** 版本 MUST 按 minor 递增；仅排版或文案修正 MAY 按 patch 递增

### Requirement: 补丁层维护边界与可验证性

本仓库 SHALL 明确补丁层维护边界：`dist/` 为来自上游发布物的 vendored 编译产物，本仓库的变更 MUST 限于 `templates/`、`schemas/`、`.agents/` 与仓库元数据；需要改动 CLI 行为时 MUST 先接入上游源码仓库。vendored 资产 SHALL 可被逐字节复核。

#### Scenario: vendored 资产可逐字节复核
- **WHEN** 需要确认模板、Schema、技能与 `dist/` 是否与上游发布物一致
- **THEN** MUST 能以 SHA256 与 `npm pack @hujiale2609/ai-harness@<version>` 的产物逐文件比对，并给出比对结论

#### Scenario: 变更范围落在补丁层内
- **WHEN** 提交面向使用者的改动
- **THEN** 改动文件 MUST 落在 `templates/`、`schemas/`、`.agents/`、`CHANGELOG.md`、`.changeset/`、`package.json`、`README.md` 或 `openspec/` 之内
