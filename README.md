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

## 分发方式

本仓库是包的唯一事实来源，版本以 tag 标记（当前 `v1.3.0`）。安装：

```powershell
npm i -g .\packages\ai-harness          # 从本地检出
# 或先打包再拷到目标机器：
cd packages\ai-harness; npm pack; npm i -g .\hujiale2609-ai-harness-1.3.0.tgz
```

发布到 npm 属可选动作，需维护者登录后执行（见 `packages/ai-harness/README.md`）。

## 版本与发布

```bash
pnpm install
pnpm changeset            # 记录一条面向使用者的变更
pnpm version-packages     # 递增版本并生成 CHANGELOG.md
pnpm release              # 发布（需先 npm login）
```

---

## 交接与维护

### 这是什么

`@hujiale2609/ai-harness` 是"仓库级 AI 开发规范基座"：`templates/default/*` 会被 `ai-harness init` **逐字复制**到目标仓库，`schemas/*` 是 `ai-harness validate` 的判定契约，`.agents/skills/` 随包分发。**包里的规则 = 所有设备的执行基线**。

### 为什么用补丁层维护

上游 TypeScript 源码不在本仓库；npm 发布的是编译产物，18 个 `*.js.map` **均无 `sourcesContent`**，无法由产物还原源码。因此本仓库：

| 内容 | 角色 | 能否修改 |
|:--|:--|:--|
| `templates/` | `init` 复制到目标根的四份受管文档模板 | ✅ |
| `schemas/` | `validate` 的四份 Schema 契约 | ✅ |
| `.agents/` | 随包分发的技能（`manage-docs`） | ✅ |
| `dist/` | vendored 编译产物（72 文件，字节保真） | ❌ |

**当前可发布"模板 / Schema / 技能"层面的变更，不能修改 CLI 行为** —— 那需要先把上游源码接进来。

### 1.3.0 做了什么

在 `templates/default/AGENTS.md` 的**四个章节的占位符之外**内置通用纪律。

关键在于模板机制：模板每节内容**全部位于 `<!-- harness:placeholder -->` 内**，而 Schema 要求 `placeholder_forbidden`（作者必须删掉占位符）→ 块内文本是**一次性的**。所以纪律只有写在块外才能持久留存。

| 章节 | 新增内容 |
|:--|:--|
| Operating Invariants | 规格落点先行、只读任务同样受规格约束、规格高于代码、差分作用域验证、最小因果集与保留现状、根因闭环与真实契约验证、符号事实锚定、变更可追溯与原子化、**人工验收归口** |
| Task Routing | 功能验收与 UI 界面调整（权威来源＝人工判定结论） |
| Completion Criteria | 人工验收闭环（人工结论到达前保持未勾选） |
| Ask for Human Judgment When | UI 界面调整或功能验收的最终判定 |

模板 7,893 B → **10,544 B**；内容经专有名词扫描（业务产品名 / 主机路径 / 工具专有变量等）**零命中**，保持通用。

### 当时的验证证据

| 验证 | 结果 |
|:--|:--|
| 模拟作者填写（删全部占位符 + 给 Project/Commands 补内容） | `ai-harness validate` → **valid: true，errors: 0**；新增内容的四节均通过 `non-empty` |
| 打包核对 | `hujiale2609-ai-harness-1.3.0.tgz` = **84 文件 = 官方 82 + CHANGELOG.md + README.md**，缺失 0 |
| 与官方 1.2.2 的字节差异 | 仅 `package.json`（有意改造）与 `templates/default/AGENTS.md`（本次改动） |
| 新根初始化实测 | 临时目录 `init` 生成的 `AGENTS.md` 自带全部新纪律 |
| 规格校验 | `openspec validate --all --strict` → 1 passed / 0 failed |

### 已知边界（重要）

1. **模板是唯一强制手段**：未配置 `schemas/*.yaml` 的 `rules.required_patterns`，因此**删掉某条纪律不会被校验拦住**。已实测：删掉「人工验收归口」后 `validate` 仍通过。若要硬门禁，需在 Schema 层加 `required_patterns`。
2. **`init` 只增不改**：目标文件已存在即 `skipped`。所以模板改动**只对将来新初始化的根生效**；已有根需手工同步，或给 CLI 增加 `update` 命令（需上游源码；且模板含待填占位符，自动覆盖有冲掉用户内容的风险）。
3. **私有仓库**：无法用 GitHub Release 资产做一行安装（私有资产的 URL 需鉴权，npm 不会带 Authorization）。分发方式见上文「分发方式」。
4. **改动范围约束**：见 `openspec/specs/harness-package-maintenance/spec.md` 的要求「补丁层维护边界与可验证性」。

### 日常维护步骤

```powershell
cd <仓库根>
# 1) 改模板 / Schema / 技能（纯文本，无需编译）
# 2) 记录变更
pnpm changeset                     # 选 minor / patch 并写明对使用者的影响
pnpm version-packages              # 递增版本 + 写 packages/ai-harness/CHANGELOG.md
# 3) 打包并安装到当前机器
cd packages\ai-harness; npm pack; npm i -g .\hujiale2609-ai-harness-<版本>.tgz
# 4) 提交
cd ..\..; git add -A; git commit; git push
```

### 为什么没有发布到 npm

自用即可。npm 公开包的唯一价值是"陌生设备一行装"，而本仓库是私有的、分发靠 clone 或 tgz，因此不需要把纪律放上公网。将来若确实需要 `npm i -g @hujiale2609/ai-harness`，`npm login` + `pnpm release` 即可 —— 版本号、CHANGELOG、Changesets 配置都已就绪。