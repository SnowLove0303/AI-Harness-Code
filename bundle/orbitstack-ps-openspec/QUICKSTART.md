# Ps-openspec V2.00 其他 Harness 极速接入指南 (QUICKSTART)

> 本指南用于指导如何在**其他 AI-Harness、不同项目或新环境**中快速装配并应用全套 OrbitStack (`ps-openspec`) 体系。

开始每项任务时，先在目标项目根运行 `openspec context --json` 并核对返回路径。若未初始化，在目标根执行 `openspec init` 后复核；若根不一致，切换到正确项目根并排查 CLI 工作目录/配置来源，不能跳过 OpenSpec。

---

## 🚀 方式一：一键自动安装 (推荐)

无论是新项目还是已有项目，在项目根目录下运行一键安装脚本：

### Windows (PowerShell)
```powershell
# 从克隆的 AI-Harness-Code 仓库中执行：
.\scripts\install-to-harness.ps1 -TargetDir "D:\MyOtherProject"

# 或者在目标项目目录中直接指定安装包路径执行：
powershell -ExecutionPolicy Bypass -File "path\to\Ps-openspec\scripts\install-to-harness.ps1"
```

### Linux / macOS (Bash)
```bash
# 从克隆的 AI-Harness-Code 仓库中执行：
./scripts/install.sh /path/to/my-other-project
```

**自动安装器会为你完成**：
1. 将 `Agent.md` 与 `AGENTS.md` 拷贝到目标项目根目录（供各 Harness 自动识别）；
2. 将 `pstack-openspec`、`ai-harness-openspec`、`spec-driven-workflow` 技能部署到项目的 `.agents/skills/`、`.gemini/skills/` 或 `.claude/skills/`；
3. 输出接入完成校验报告。

---

## 🛠️ 方式二：手动接入方案 (按 Harness 平台分类)

### 1. Claude Code / OpenCode / Codex 接入
- **放置宪法**：将包内的 `Agent.md` 复制到项目根目录下，并命名为 `AGENTS.md`（或者直接使用 `Agent.md`）；
- **配置技能**：将 `skills/pstack-openspec/` 拷贝到目标项目的 `.claude/skills/` 或 `.agents/skills/`；
- **启动生效**：在任务开始时，提示词开头注明：
  `🚨 [MANDATORY EXECUTION STANDARD: ps-openspec (OrbitStack)]`，Agent 将自动阅读并遵循轨道工程体系。

### 2. Cursor / Windsurf 接入
- **放置规则**：将 `Agent.md` 复制到项目根目录的 `.cursorrules`，或直接在项目根目录下保留 `Agent.md`，并在 `.cursor/rules/orbitstack.mdc` 中添加指向它的引用；
- **配置参考协议**：将 `skills/pstack-openspec/references/` 保留在项目中，在提示词中直接引用。

### 3. Antigravity (全新设备或独立工作区)
- **全局生效**：将 `Agent.md` 拷贝并重命名为：
  `C:\Users\<用户名>\.gemini\config\GEMINI.md`
- **技能生效**：将 `skills/pstack-openspec` 拷贝到：
  `C:\Users\<用户名>\.gemini\config\skills\pstack-openspec`
- 即可在所有会话中自动全局生效。

### 4. 搭配 `@hujiale2609/ai-harness` CLI 使用
在目标仓库中执行：
```bash
npx ai-harness init
```
然后将本包的 `Agent.md` 替换目标仓库生成的 `AGENTS.md`，即可享受完整的 14 大核心法定公理与防御金字塔约束。

---

## 🔒 核心公理速查

| 序号 | 核心公理 | 关键作用 |
| :---: | :--- | :--- |
| **0** | **Step 0 需求澄清确认门禁** | 动工前四维对抗澄清，用户确认理解后方可入轨 |
| **2** | **既有逻辑不可否定公理** | 严禁凭通用洁癖擅自删除既有回退逻辑 |
| **3** | **代码级防篡改封印** | `@ANTIGRAVITY_INVARIANT_LOCK` 代码块绝对只读豁免 |
| **7** | **双清单门禁** | 动工前强制向用户呈报【拟变范围 + 保持现状承诺】等待授权 |
| **11**| **全网搜索先行与撞墙求助** | 连续排错失败 2 次强制停止盲试，调用智能搜索查外部解法 |
| **12**| **Poteto 委派双公理** | Fresh Subagents by Default + Consolidated Scope + Evidence Labeling |
| **13**| **跨线程必绑入轨铁律** | 跨线程派工首行强制注入 `ps-openspec` 约束，脱轨一票否决 |
| **14**| **用户质疑第一时间根因归因与递归自改进** | 受到批评第一时间停机 5-Whys 剖析，反哺进化规则库（以 7f4d4b46 案例为鉴） |
