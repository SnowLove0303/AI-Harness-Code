# Proposal

## Why

`@hujiale2609/ai-harness` 是"仓库级 AI 开发规范基座"：它的 `templates/default/*` 会被 `init` **逐字复制**到每一台设备的 harness 根，`schemas/*` 是 `validate` 的判定契约，`.agents/skills/` 随包分发。也就是说——**包里的规则 = 所有设备的行为基线**。

但现状有两个缺口：

1. **关键纪律只存在于本机，没有进包**
   本机 `~/.dsh/AGENTS.md`（9,042 B）已包含「人工验收归口」「人工验收闭环」等规则，而包的模板 `templates/default/AGENTS.md`（7,893 B）**完全没有**这些条目。结果是：换设备、换项目重新 `init`，这些纪律就丢了；能力只活在单机上。用户明确要求把这些规则固化进包。

2. **没有变更记录，发布无据可查**
   仓库已声明 `@changesets/cli` 与 `changeset / version-packages / release` 脚本，说明上游本来就打算用 Changesets；但已发布的 `package.json` 的 `files` 白名单**不含 `CHANGELOG.md`**，装包的人无从得知 `1.2.2 → 下一版` 改了什么。

此外，**上游源码仓库本机不可得**：npm 上发布的是编译产物，18 个 `*.js.map` 均无 `sourcesContent`，无法还原 TypeScript 源码。因此本次维护必须建立在一个**可持续、可复现**的载体上，而不是改本机全局安装副本。

## What Changes

1. **建立补丁层维护仓库**（`F:\Skill\ai-harness`，已完成）
   逐字节复制已发布 `@hujiale2609/ai-harness@1.2.2` 的 `templates/`、`schemas/`、`.agents/`、`dist/`（SHA256 全等校验 81/81），并把 `package.json` 改造为补丁层形态：`devDependencies` 仅保留 Changesets，`release` 去掉无法执行的 `build`，`files` 补入 `CHANGELOG.md` 与 `README.md`。`.gitattributes` 设为 `* -text` 以关闭行尾转换、保证 vendored 资产字节保真。

2. **把人工验收规则写入模板**（本次核心）
   在 `templates/default/AGENTS.md` 的四个章节内置规则，使任意设备 `init` 出的 `AGENTS.md` 开箱即带该纪律，且 `ai-harness validate` 直接 `valid: true`：
   - `Operating Invariants`：人工验收归口
   - `Task Routing`：功能验收与 UI 界面调整
   - `Completion Criteria`：人工验收闭环
   - `Ask for Human Judgment When`：UI/验收取向的介入触发条件
   规则文本写在 `<!-- harness:placeholder -->` 块**之外**，以保证作者填写占位符时不会把它一并删掉。

3. **闭合变更记录链路**
   以 Changesets 维护变更：每项改动写一条 `.changeset/*.md`，`version-packages` 更新版本并生成根 `CHANGELOG.md`，`CHANGELOG.md` 随包分发。本次首版变更记录即为本 change。

4. **产出可安装、可验证的包**
   以 `npm pack` 产出 `.tgz` 并本地安装验证；同时给出与官方发布物的 SHA256 比对方法，确保 vendored 资产未漂移。
   **发布到 npm 不在本次范围内**：本机 `npm whoami` → `ENEEDAUTH`，凭据须由维护者本人提供。

## Capabilities

### New Capabilities

- `harness-package-maintenance`: 约束 ai-harness 维护仓库的模板纪律、变更记录与补丁层维护边界。

## Impact

- 仓库：`F:\Skill\ai-harness`（新建，bootstrap 已提交 `6318252`）
- 文件：`templates/default/AGENTS.md`（内置规则）、`CHANGELOG.md`（新增）、`.changeset/*.md`（新增）、`package.json`（版本递增）
- 使用者：任意执行 `ai-harness init` 的新 harness 根将自带人工验收纪律
- 不在范围：CLI 行为变更（需上游源码）、Schema 硬门禁（本次按维护者决定仅写模板）、npm 发布（待维护者登录）
