# @hujiale2609/ai-harness — 维护说明（补丁层）

本目录是 npm 包 `@hujiale2609/ai-harness` 在 [AI-Harness-Code](../../) 仓库中的维护位置。

## 为什么是"补丁层"

上游 TypeScript 源码尚未接入本仓库，而 npm 上发布的是**编译产物**：

- `dist/*.js` 为编译结果；18 个 `*.js.map` **均未内嵌 `sourcesContent`**，无法由产物还原源码。
- 但承载规则的资产全是**纯文本**：`templates/`、`schemas/`、`.agents/`。改它们**不需要重新编译**。

| 内容 | 角色 | 能否修改 |
|:--|:--|:--|
| `templates/` | `init` 逐字复制到目标根的四份受管文档模板 | ✅ 直接改 |
| `schemas/` | `ai-harness validate` 的四份 Schema 契约 | ✅ 直接改 |
| `.agents/` | 随包分发的技能（`manage-docs`） | ✅ 直接改 |
| `dist/` | **vendored 编译产物**，原样保留 | ❌ 不改 |

**边界**：本目录可发布"模板 / Schema / 技能"层面的变更，尚不能修改 CLI 行为。要改 CLI，须先把上游源码接入本仓库。

## 命令（在仓库根执行）

```bash
pnpm install
pnpm changeset            # 记录一条面向使用者的变更
pnpm version-packages     # 递增版本并写入 CHANGELOG.md
pnpm pack                 # 产出 .tgz（也可在包目录内 npm pack）
pnpm release              # 发布到 npm（需先 npm login）
```

## 分发方式

本仓库是唯一事实来源；`1.3.0` 随仓库发布，标记为 tag `v1.3.0`。

- **从本地检出安装（当前可用）**：在仓库根执行 `npm i -g .\packages\ai-harness`；或先 `cd packages\ai-harness; npm pack`，把产出的 `.tgz` 拷到目标机器执行 `npm i -g <tgz>`。
- **从远端克隆安装**：`git clone https://github.com/SnowLove0303/AI-Harness-Code.git`，再按上一条安装。
- **发布到 npm（可选，尚未执行）**：需要维护者完成 `npm login`（本机当前 `npm whoami` → `ENEEDAUTH`）并具备作用域 `@hujiale2609` 的发布权限，随后 `pnpm release`；发布后才可使用 `npm i -g @hujiale2609/ai-harness` 一句话安装。

## 变更记录

面向使用者的变更以 Changesets 记录，版本条目写入 [`CHANGELOG.md`](CHANGELOG.md) 并随包分发。已知版本：

- `1.3.0` — `templates/default/AGENTS.md` 内置通用执行纪律（规格落点先行、工程不变量、变更可追溯与原子化、人工验收归口）；内容位于占位符之外，作者填写占位符后仍然保留。
- `1.2.2` — 本仓库的复制基线。
## 两条容易踩的机制

1. **`init` 只增不改**：`dist/core/initialize.js` 在目标文件已存在时直接 `skipped`。模板改动**只对将来新初始化的根生效**；已有根（例如 `~/.dsh`）需手工同步，或给 CLI 增加 `update` 命令（需上游源码）。
2. **编码**：模板与技能文件含中文，均为 **UTF-8**。编辑必须保持 UTF-8，否则中文字面量会被破坏。

## 溯源

`templates/`、`schemas/`、`.agents/`、`dist/` 逐字节复制自已发布的 `@hujiale2609/ai-harness@1.2.2`，迁移后经 SHA256 全等校验（81/81）。

- 查看发布物：`npm view @hujiale2609/ai-harness@1.2.2 --json`
- 取回官方产物：`npm pack @hujiale2609/ai-harness@1.2.2`