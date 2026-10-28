# Ps-openspec V2.00 (OrbitStack PStack + OpenSpec Engineering System)

> **Throughput Comes From Trust (吞吐量源于信任体系)**  
> 本仓库是 **Ps-openspec V2.00** 完整开发体系的权威来源，包含 Lauren Tan 官方完整 PStack、Codex/OpenSpec 融合适配和既有 AI-Harness 基座。
> 现已完整封装为跨平台、跨 Harness 的通用分发包，原生支持 **Antigravity、Claude Code、Cursor、OpenCode、Aider** 等各类智能体工程环境开箱即用。

---

## 📦 核心资产与分发目录

| 路径 | 角色与说明 |
|:--|:--|
| **[`Agent.md`](Agent.md)** / **[`AGENTS.md`](AGENTS.md)** | **跨 Harness 最高通用智能体宪法**（包含五层防御金字塔、Step 0-5 闭环 SOP、14 大核心法定公理） |
| **[`bundle/orbitstack-ps-openspec/`](bundle/orbitstack-ps-openspec/)** | **【完整独立分发包】** 包含全套 `Agent.md`、`ps-openspec` 核心技能与 16 份法定协议，供其他 Harness 极速整体引入 |
| **[`bundle/pstack-upstream/`](bundle/pstack-upstream/)** | Lauren Tan 官方 PStack 完整上游镜像，固定提交见 [`pstack-upstream.lock.json`](bundle/pstack-upstream.lock.json)，上游文件保持原样 |
| **[`orbitstack-codex/`](orbitstack-codex/)** | Codex 融合入口：PStack 负责 playbook 路由与执行方法，OpenSpec 负责唯一持久变更生命周期 |
| **[`docs/pstack-openspec-routing-audit.md`](docs/pstack-openspec-routing-audit.md)** | 初级任务路由审计矩阵及结构/运行时验收状态 |
| **`scripts/install-to-harness.ps1`** | Windows PowerShell 一键极速部署器，支持将体系秒级注入任意目标项目 |
| **`scripts/install-to-harness.sh`** | Linux / macOS / Bash 一键极速部署器 |
| **`skills/pstack-openspec/`** | OrbitStack 核心主控技能，内含 `references/` 下 16 份工业级参考协议与指南 |
| `skills/spec-driven-workflow/` | 规格驱动工作流规范技能 |
| `skills/ai-harness-openspec/` | AI-Harness 与 OpenSpec 底座规范技能 |
| `skills/tavily-search/` | 官方 Tavily AI 检索与防撞墙技能（主备双 Key 容灾规范） |
| `skills/xmind-cloud-mcp/` | 官方 Xmind 云端 MCP 深度协同指南与持久化客户端脚本 |
| `packages/ai-harness/` | npm 包 `@hujiale2609/ai-harness`（补丁层维护形态） |
| `openspec/` | 本仓库的 OpenSpec 规格根 |

---

## 🚀 给其他 Harness 的极速接入指南 (Quickstart)

若要将完整的 `ps-openspec` 体系与 `Agent.md` 注入到另一个项目或新的 Harness 环境中：

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
# 生成输出: dist/Ps-openspec-V2.00.zip (即拷即用)
```

### 3. 按不同 Harness 平台手动接入
- **Claude Code / OpenCode / Codex**：将 `Agent.md` 放入项目根目录（或命名为 `AGENTS.md`），将 `skills/pstack-openspec` 放入 `.claude/skills/` 或 `.agents/skills/`；
- **Cursor / Windsurf**：将 `Agent.md` 作为项目根目录的规则基座，在 `.cursor/rules/` 中引用；
- **全新设备 Antigravity**：将 `Agent.md` 复制为 `~/.gemini/config/GEMINI.md`，将技能复制到 `~/.gemini/config/skills/` 即可全局生效。

---

## 🏛️ 十四大核心法定公理 (Core Axioms in Agent.md)

1. **规格高于代码公理**：系统行为以 specs 规格定义为法定准则，严禁先改代码再补写规格。
2. **既有逻辑与业务规范不可否定公理 (防自以为是重构禁令)**：既有业务逻辑为法定事实，严禁凭通用洁癖擅自删除回退分支。
3. **代码级防篡改封印标记机制**：`@ANTIGRAVITY_INVARIANT_LOCK` 标记块享有最高只读豁免权。
4. **正向行动化表述准则**：严禁“粉色大象”负向禁令，一律使用确定性封闭作用域与正向准入规则。
5. **最小因果集与保留现状 (Leave-as-is)**：改动严格收敛在当前任务链路，无关历史坏味道保持现状。
6. **差分作用域验证与真实契约验证**：任务打勾必须以测试命令终端真实退出码 0 与实测日志为充要依据。
7. **双重人工授权与验收归口**：Step 0 对抗澄清确认门禁 + Step 2 动工前双清单授权门禁 + 交付后人工终审验收。
8. **问题与解法沉淀 (CHANGELOG 闭环)**：每次任务交付必须在 CHANGELOG 中沉淀根因与解法。
9. **专用领域工具链与专属引擎唯一路由公理**：在专属工作台项目中，严禁私写脚本绕开官方流水线直接篡改底层业务文件。
10. **防线下沉自迭代公理**：纠错两遍即立项为 Lint，禁止同类错误重复依靠人眼盯防两次。
11. **全网智能搜索先行与撞墙求助公理**：遇新任务/未知依赖优先搜索；排错连续失败 2 次强制停止盲试，调用智能搜索查外部解法。
12. **Poteto 委派双公理与 A2A 无损任务交接公理**：Fresh Subagents by Default + Consolidated Scope（全量合并简报）+ 上下文屏蔽盾 + 三级证据分级标签 (`[Measured]` / `[Inferred]` / `[Guess]`)。
13. **跨线程任务发布法定绑定 ps-openspec 公理 (跨线程绝对入轨铁律)**：任何线程只要跨线程派工，首行必须强制声明并注入 `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`，脱轨一票否决。
14. **用户反馈质疑与否定第一时间根因归因与递归自改进强制公理**：受到用户批评/质疑第一时间停机，启动 5-Whys 深度剖析，制定系统性杜绝复发方案并递归反哺规则库（以真实会话 `7f4d4b46-78e6-435a-aa29-f0d6ec194caa` 为永久警示）。

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
