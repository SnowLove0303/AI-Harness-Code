# Proposal

## Why

反馈：`1.3.0` 里"有关宿主的内容很多"，而这是一个应当**通用**的包。

经逐文件扫描定位（证据见 `design.md` 的 Context）：

- **随包分发的核心资产是干净的**：`templates/`、`schemas/`、`.agents/` 对宿主专有词、本机路径、产品名的扫描**零命中**。
- **问题出在文档，其中一份还随包分发**：
  - `packages/ai-harness/README.md`（在 `files` 白名单内，会随包装到任何机器）：出现宿主专有路径 `~/.dsh`；出现**会话瞬时状态**（"本机当前 `npm whoami` → `ENEEDAUTH`"）；整篇是**维护者视角**（补丁层、vendored `dist`、仓库分发方式），而非使用者视角。
  - 仓库根 `README.md`：硬编码本机绝对路径 `cd F:\Skill\AI-Harness-Code`；出现具体业务产品名。
- 宿主全局配置（`~/.dsh/AGENTS.md`）中浓度很高的宿主内容**不在包内**。这不作为免责理由，但它不是本次要改的对象。

**根因**：把"维护者说明"与"使用者 README"混成一份，并把作业过程（某台机器的登录状态、本机路径）写进了会分发的文件。

## What Changes

1. **`packages/ai-harness/README.md` 重写为使用者视角的通用 README**：包的能力、四份受管文档、命令用法、校验模型、模板内置纪律与其机制、安装方式与兼容性。全篇不含宿主专有变量与配置路径、本机绝对路径、会话状态、具体业务产品名，也不含本仓库的维护细节。
2. **维护与分发说明只留仓库根 `README.md`**：本机绝对路径改为中性表述；移除无必要的产品名与宿主路径。
3. **新增规格要求**「随包分发文档的工具与机器中立性」，并可由静态扫描断言守卫。
4. **版本 patch → `1.3.1`**（仅文档内容变更，无行为变更）并写入 CHANGELOG。

## Capabilities

### Modified Capabilities

- `harness-package-maintenance`: 新增「随包分发文档的工具与机器中立性」要求；既有 3 条要求不变。

## Impact

- 文件：`packages/ai-harness/README.md`（重写）、`README.md`（清洗）、`packages/ai-harness/package.json`（版本）、`packages/ai-harness/CHANGELOG.md`
- 使用者：装包后读到的 README 只描述能力与用法，不再残留维护者所在机器的信息
- 不在范围：`openspec/changes/archive/**` 的历史变更记录（作为当时的客观证据保留）；随包资产 `templates/`、`schemas/`、`.agents/` 的实质内容（已零命中）
