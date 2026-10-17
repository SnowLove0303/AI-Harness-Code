# Design

## Context

塑造本方案的事实（均已核对）：

**包与发布物**

- `@hujiale2609/ai-harness` 已发布 `1.0.0 → 1.2.2`，latest = `1.2.2`。
- 官方 tarball（`npm pack @hujiale2609/ai-harness@1.2.2`）41,231 B，**82 个文件**：`dist` 72 / `schemas` 4 / `templates` 4 / `.agents` 1 / `package.json` 1；**无 README、无 LICENSE**。
- `package.json` 的 `bin` 声明三个别名（`AIharness` / `aiharness` / `ai-harness`）。JSON 键区分大小写，文件合法；PowerShell 的 `ConvertFrom-Json`（大小写不敏感）会误报重复键。
- `dist/` 为编译产物；18 个 `*.js.map` **均无 `sourcesContent`**，无法还原 TypeScript 源码。
- 全局安装目录含 `node_modules/` 依赖树 —— 那是 `npm i -g` 的产物，**不属于包内容**。

**模板与校验机制**

- `templates/default/AGENTS.md`（7,893 B）的六个 H2 章节，**每个章节的内容全部位于 `<!-- harness:placeholder -->` 块内**，块内为"用途/包含内容/格式示例/约束"四段指导文本。
- `schemas/agents.yaml` 要求六章节严格顺序、非空、且 `placeholder_forbidden` —— **占位符必须被作者删除**。因此块内文本是**一次性的**，不会留存于生成的文档中。
- `dist/core/schema/validator.js` 额外支持 `required_subsections`、`rules.{section_order, placeholder_forbidden, required_patterns, forbidden_patterns, minimum_meaningful_content, conditional_subsections, references}`。
- `dist/core/initialize.js` 逐字复制模板；**目标文件已存在则 `skipped`**，因此模板改动只对**将来新初始化**的根生效。

**与本机现状的差异**

- 本机 `~/.dsh/AGENTS.md`（9,042 B）已含「人工验收归口」「人工验收闭环」等纪律，模板中**没有**；但模板的占位符示例里**已有**「差分作用域验证 / 最小因果集与保留现状 / 根因闭环与真实契约验证 / 符号事实锚定」以及「UI 真实核验原则（前端 UI 改动由人工在真实浏览器完成核验）」。
- 本机文本混有**机器专属内容**（全局规格仓库名与绝对路径、`$DSH_HOME` 等），不可进入通用包。

**仓库**

- `https://github.com/SnowLove0303/AI-Harness-Code` 原为空仓库（0 提交）。现承载：`packages/ai-harness/`（82 个官方文件 + 维护 README）、根级 `package.json`（private）、`pnpm-workspace.yaml`、`.changeset/`、`openspec/`、`.gitattributes`（`* -text`）。bootstrap 提交 `631fe85` 已推送 `main`。
- `npm whoami` → `ENEEDAUTH`：本机未登录 npm。

## Goals / Non-Goals

**Goals:**

- 把四条通用纪律**持久地**内置进 `templates/default/AGENTS.md`，使任意设备 `init` 出的 `AGENTS.md` 开箱即带，且删掉占位符后仍通过 `validate`。
- 规则文本**不含任何机器、项目、产品专有内容**，可直接被任意仓库采用。
- 以 Changesets 闭合版本与变更记录链路，`CHANGELOG.md` 随包分发。
- 保持已发布包的完整性与字节保真可复核。

**Non-Goals:**

- 不改动 CLI 行为（无上游源码）。
- 不新增 Schema 硬门禁（维护者决定只写模板）。
- 不回填已初始化的根（`init` 只增不改）。
- 不发布到 npm（待维护者登录）。
- 不修 `bin` 大小写重复别名（保持已发布契约）。

## Decisions

### D1 规则写入模板的占位符之外

契约要求占位符必须被作者删除，故块内文本一次性。四条纪律写在每个章节的 `<!-- harness:placeholder -->` 块**之外**，并在前面加一行普通注释（`<!-- 通用…（随模板分发，填写占位符时请保留） -->`）标明"通用、请保留"。普通注释不影响校验（校验只匹配 `harness:placeholder`）。

替代方案：(a) 只写进占位符示例 —— 作者一填就没了，不构成"固化"；(b) 同时加 `rules.required_patterns` —— 被维护者排除（只写模板）。

### D2 把已有示例文本提升为持久内容

「工程不变量」四项（差分作用域验证、最小因果集与保留现状、根因闭环与真实契约验证、符号事实锚定）与「UI 真实核验原则」**模板里本就有**，但只在占位符示例中。本变更将它们改写成占位符之外的持久条目 —— 既避免重复造词，又让它们真正留存。占位符内的示例保留不动（对作者仍有指导价值）。

### D3 一律去专有名词

规则文本不出现：本机绝对路径、全局规格仓库名、`$DSH_HOME` 之类工具专有变量、任何产品/项目名。凡涉及"全局规格仓库"的表述，改为"项目内 `openspec/` 优先"这一通用形式。取舍：本机 `.dsh/AGENTS.md` 中带专有名词的条目**不被搬入**。

### D4 版本按 minor 递增

模板内容变更会改变所有新初始化根的行为，属面向使用者的功能增强 → `1.2.2 → 1.3.0`。

### D5 Changesets 置于仓库根

仓库为 monorepo（`packages/*`），`.changeset/` 与版本脚本置于根级；包级 `package.json` 移除 `build`（无源码可编译）并保留发布所需字段。

### D6 保持 `bin` 三别名

虽有大小写重复的观感问题，但删除别名会破坏既有使用者的命令名 → 保持现状，仅在维护 README 中说明该现象。

### D7 校验方式：模拟作者填写后的文档

模板改动是否可用，以"删掉占位符后的生成文档"为判据：把模板复制为临时 `AGENTS.md`、移除占位符块，再执行 `ai-harness validate` 并断言 `valid: true`。这直接验证"作者填完后仍合规"。

## Risks / Trade-offs

- [仅靠模板、无 Schema 门禁] → 作者日后可删除这些条目且不被拦截。缓解：变更记录 + README 说明；升级路径为 `rules.required_patterns`。
- [占位符之外的通用内容可能被作者误删] → 以注释显式标注"通用、请保留"。
- [模板改动不回填已有根] → 已有根需手工同步；根治需给 CLI 加 `update` 命令（依赖上游源码）。
- [中文编码被破坏] → 模板为 UTF-8；编辑与写入统一使用无 BOM 的 UTF-8，并在改动后校验中文关键字存在。
- [被误认为与具体产品耦合] → 改动后对包目录做专有名词扫描（MSDS 等），结果须为零命中。

## Migration Plan

模板与 CHANGELOG 改动提交后，需 `npm login` → `pnpm release` 才能让新设备受益。回滚为 revert 对应提交。

## Open Questions

- 是否在后续版本把「全局环境改动需先行确认」等本机纪律也通用化纳入模板（本次未纳入，避免超出已确认范围）。
