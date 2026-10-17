# AI-Harness-Code

AI Harness 的代码仓库。

## 目录

| 路径 | 说明 |
|:--|:--|
| `packages/ai-harness/` | npm 包 `@hujiale2609/ai-harness`（补丁层维护形态） |
| `openspec/` | 本仓库的规格根（capabilities 与 changes） |
| `.changeset/` | Changesets 配置与待发布变更记录 |

## 维护方式

`packages/ai-harness/` 通过**补丁层**方式维护：`templates/`、`schemas/`、`.agents/` 为可直接修改的纯文本资产；`dist/` 为来自上游发布物的 vendored 编译产物（上游 TypeScript 源码尚未接入本仓库，18 个 sourcemap 均无 `sourcesContent`，无法由产物还原）。因此当前**可以发布模板/Schema/技能层面的变更，尚不能修改 CLI 行为**。

详见 [`packages/ai-harness/README.md`](packages/ai-harness/README.md)。

## 版本与发布

```bash
pnpm install
pnpm changeset            # 记录一条面向使用者的变更
pnpm version-packages     # 递增版本并生成 CHANGELOG.md
pnpm release              # 发布（需先 npm login）
```