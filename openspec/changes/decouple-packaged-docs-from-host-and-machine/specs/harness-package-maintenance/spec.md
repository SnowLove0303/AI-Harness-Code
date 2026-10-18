# Spec Delta

## ADDED Requirements

### Requirement: 随包分发文档的工具与机器中立性

纳入 `files` 白名单、随包分发的文档（`README.md`、`CHANGELOG.md`）SHALL 只描述该包自身的能力与用法。其中 MUST NOT 出现：宿主工具专有内容（专有环境变量名、宿主配置路径、宿主产品名）、本机绝对路径、会话或环境瞬时状态（例如某台机器的登录状态），以及具体业务产品名。本仓库的维护模型与分发方式 SHALL 记录在仓库根文档中，不随包分发。

#### Scenario: 随包产物内的文档零宿主耦合
- **WHEN** 检查打包产物中的 `README.md` 与 `CHANGELOG.md`
- **THEN** 对宿主专有词、本机绝对路径与会话状态的扫描 MUST 零命中

#### Scenario: 使用者视角与维护者视角分离
- **WHEN** 阅读随包分发的 `README.md`
- **THEN** 其内容 MUST 面向使用者描述包的能力与用法；本仓库的维护与分发说明 MUST 位于仓库根文档

#### Scenario: 宿主中立
- **WHEN** 使用者在任意读取 `AGENTS.md` 的 agent 工具中采用本包
- **THEN** 包内内容 MUST NOT 依赖特定宿主工具或其私有约定

#### Scenario: 随包资产不被波及
- **WHEN** 执行本文档解耦变更
- **THEN** `templates/`、`schemas/`、`.agents/` 的内容 MUST 保持不变（逐字节一致）

## MODIFIED Requirements

### Requirement: 补丁层维护边界与可验证性

本仓库 SHALL 明确补丁层维护边界：`dist/` 为来自上游发布物的 vendored 编译产物，本仓库的变更 MUST 限于 `templates/`、`schemas/`、`.agents/`、仓库元数据与守卫脚本；需要改动 CLI 行为时 MUST 先接入上游源码仓库。vendored 资产 SHALL 可被逐字节复核。

#### Scenario: vendored 资产可逐字节复核
- **WHEN** 需要确认模板、Schema、技能与 `dist/` 是否与上游发布物一致
- **THEN** MUST 能以 SHA256 与 `npm pack @hujiale2609/ai-harness@<version>` 的产物逐文件比对，并给出比对结论

#### Scenario: 变更范围落在补丁层内
- **WHEN** 提交面向使用者的改动
- **THEN** 改动文件 MUST 落在 `templates/`、`schemas/`、`.agents/`、`CHANGELOG.md`、`.changeset/`、`package.json`、`README.md`、`scripts/` 或 `openspec/` 之内
