# Ps-openspec (PStack-first + OpenSpec)

> **Throughput Comes From Trust (吞吐量源于信任体系)**  
> 本仓库以 Lauren Tan 官方 PStack 为主要执行体系，以 OpenSpec 保存唯一持久任务状态，并保留两项 OrbitStack 扩展：无损跨 Agent 交接，以及历史修复和优化的影响审计。
> 发行包提供 Windows、Linux 和 macOS 安装器，并配置 Codex、Gemini CLI、Claude Code 或 Cursor 的 OpenSpec skills。

---

## 📦 核心资产与分发目录

| 路径 | 角色与说明 |
|:--|:--|
| **[`Agent.md`](Agent.md)** / **[`AGENTS.md`](AGENTS.md)** | PStack-first 入口规则、OpenSpec 根定位、无损 handoff 和历史行为保护 |
| **[`bundle/orbitstack-ps-openspec/`](bundle/orbitstack-ps-openspec/)** | 兼容安装包与两项 OrbitStack 扩展参考。PStack 上游仍是执行流程的权威来源 |
| **[`bundle/pstack-upstream/`](bundle/pstack-upstream/)** | Lauren Tan 官方 PStack 完整上游镜像，固定提交见 [`pstack-upstream.lock.json`](bundle/pstack-upstream.lock.json)，上游文件保持原样 |
| **[`orbitstack-codex/`](orbitstack-codex/)** | Codex 适配入口：PStack 负责 playbook 路由和执行；OpenSpec 负责唯一持久变更生命周期 |
| **[`docs/ps-openspec-system.md`](docs/ps-openspec-system.md)** | Ps-openspec 整体架构、权责边界、任务流转、handoff、历史行为保护、安装与验证说明 |
| **[`docs/pstack-openspec-routing-audit.md`](docs/pstack-openspec-routing-audit.md)** / **[`docs/pstack-openspec-route-evaluation.md`](docs/pstack-openspec-route-evaluation.md)** | 23 个 PStack playbook 的结构审计与行为路由评测证据 |
| **[`docs/pstack-openspec-route-map.json`](docs/pstack-openspec-route-map.json)** | 23 路映射：上游来源、OpenSpec task source、PStack skill resolver、Codex 能力和验证证据 |
| **`scripts/install-to-harness.ps1`** | Windows PowerShell 一键极速部署器，支持将体系秒级注入任意目标项目 |
| **`scripts/install-to-harness.sh`** | Linux / macOS / Bash 一键极速部署器 |
| **[`skills/pstack-openspec/SKILL.md`](skills/pstack-openspec/SKILL.md)** | PStack/OpenSpec 兼容入口，只连接执行流程和两项缺口扩展 |
| `skills/tavily-search/` | 官方 Tavily AI 检索与防撞墙技能（主备双 Key 容灾规范） |
| `skills/xmind-cloud-mcp/` | 官方 Xmind 云端 MCP 深度协同指南与持久化客户端脚本 |
| `packages/ai-harness/` | npm 包 `@hujiale2609/ai-harness`（补丁层维护形态） |
| `openspec/` | 本仓库的 OpenSpec 规格根 |

---

## PStack-first 安装

安装器会预检 OpenSpec CLI 和 Node.js，按所选 Harness 初始化 OpenSpec 技能，再安装完整 PStack 和适配入口。

### 1. 一键命令行安装 (推荐)
```powershell
# 在克隆的 AI-Harness-Code 根目录执行：
.\scripts\install-to-harness.ps1 -TargetDir "D:\MyOtherProject"

# 或指定部署到的技能类型 (agents / gemini / claude / cursor / all)：
.\scripts\install-to-harness.ps1 -TargetDir "D:\MyOtherProject" -SkillLocation all
```

Linux / macOS:
```bash
./scripts/install-to-harness.sh /path/to/my-other-project
```

### 2. 打包为 Release Zip 归档资产
在根目录下运行：
```powershell
pnpm pack:bundle
# 生成输出：`dist/Ps-openspec-V2.00.zip`
```

### 手动初始化 Codex OpenSpec

在目标项目根运行 `openspec init --tools codex`，再运行 `openspec context --json` 并确认返回根路径。Codex 使用 OpenSpec 安装到 `.agents/skills/` 的技能。

---

## 执行模型

- **PStack 主流程**：`poteto-mode` 选择上游 playbook，按 playbook 和触发的 leaf skill 执行。宿主不支持的功能明确降级或标记不可用。
- **OpenSpec 唯一任务记录**：任务意图在 proposal，行为在 specs，工作步骤和状态在同一 `tasks.md`，证据随任务记录，完成后校验并归档。
- **无损 handoff**：保留原始用户请求、追加指令、OpenSpec 任务 ID、PStack 步骤、Git 状态、读写范围、历史保护项和验收证据。
- **历史行为审计**：OpenSpec 保存保护理由和回归证据。Code Review Graph 发现代码影响关系，测试证明行为。Graph 作为派生视图，不建立第二套任务或需求状态。

---

## 维护方式与历史说明

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
