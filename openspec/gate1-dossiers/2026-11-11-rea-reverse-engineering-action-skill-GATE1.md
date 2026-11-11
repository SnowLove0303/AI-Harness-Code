# Ps-openspec 门禁 1 (Gate 1) 需求全量物理对账备忘录

## 0. 元数据与事实指纹存证 (Metadata & Fact Fingerprint)
- **立案时间 (Timestamp)**: 2026-11-11T09:12:00+08:00
- **工作区 (Workspace)**: `D:\APP\AI app\Antigravity\AI-Harness-Code`
- **治理体系 (System)**: OrbitStack (Ps-openspec 轨道工程体系)
- **法定门禁阶段 (Gate Phase)**: Step 0 门禁 1 (Spec-Kit Ingestion & Intent Confirmation Gate)
- **需求指纹 (SHA-256 Fact Fingerprint)**: `5b26242e59ccc394d8f22d9d590e81c6bcd10bad45c05fbce7d1f387841944e0`

---

## 1. 用户原始需求逐字存证 (Raw User Prompt 100% Verbatim)
```text
装REA，还记得我们给Ps-openspec预留的那个工具手脚层吗
```

---

## 2. 需求背景与“工具手脚层 (Action Skill Layer)”架构对应 (Context & Architecture Mapping)

### 2.1 什么是 REA 与当前技术定位
- **项目名称**：REA (Reverse Engineer Anything) / `morluto/rea` / `rea-agents`
- **技术本质**：面向 AI Coding Agent（Claude Code, Cursor, Antigravity 等）的次世代逆向工程中枢，原生支持 **MCP (Model Context Protocol)** 协议；
- **底层能力**：提供 50+ 项标准逆向工程原子工具，覆盖本地二进制反编译（联动 Ghidra/Hopper/IDA/Rizin/Cutter）、JavaScript/Electron 客户端还原、Android APK 逆向分析、Web 资源嗅探与控制流/调用图恢复。

### 2.2 对应 Ps-openspec 最高总纲的“工具手脚层”定位
在全系统的法定宪章 `GEMINI.md` 与 `skills/pstack-openspec/SKILL.md` 中，已严格设立：
> **3. 基于 Graph 的方法论技能关联拓扑与布控治理网 -> 1. 执行方法论下沉至原子技能操作层 (Action Skill Layer)**：
> 诸如工作流开发方法论（造手脚 ACI / MCP、SOP 状态机执行、探索结晶为工作流）、UI/UX 设计方法论（`desktop-exe-development`, `ui-ux-design-engineering`）等，统一下沉至原子技能操作层（`skills/<methodology>/SKILL.md`），并通过 `### 3.1 核心方法论原子技能库索引 (Action Skill Layer Index)` 统一索引与布控。

因此，安装 REA 并接入 Ps-openspec 的法定落点非常明确：
1. **安装底座 (Engine Runtime)**：全局安装/配置 `rea-agents` CLI 与 MCP 运行时，确保可执行通道畅通；
2. **打通 MCP 手脚通道 (MCP Server Configuration)**：在系统 `mcp_config.json` 中注册 REA MCP Server，让 Agent 获得随时调用的 50+ 个逆向原子工具；
3. **沉淀规范化原子操作技能 (Action Skill Creation)**：在 `skills/rea-reverse-engineering/SKILL.md` 编制工业级 SOP 操作指南；
4. **挂载宪章级索引与回归保障 (Governance Index & Sanity Testing)**：在 `GEMINI.md` 索引库正式登记，并通过自动化测试集验证。

---

## 3. 1:1 需求物理对账矩阵 (Requirement Traceability Matrix - RTM)

| 需求 ID | 用户法定原始意图 | 场景故事 (User Story) | 详细功能契约 (Detailed Functional Contract) | 独立验收指标 (Acceptance Criteria) |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | 安装部署 REA 逆向工程 CLI 工具底座 | 作为逆向工程师与 Agent，我需要本机具备 REA 完整的 CLI 运行环境，以便随时执行逆向分析命令。 | 全局安装并验证 `rea-agents`（npm 官方发行版 6.8.0+），确保 `rea` / `rea-agents` 在 PowerShell 与 Node 环境中可正确调用，`rea doctor` 或 `--version` 退出码为 0。 | 1. 终端执行 `rea --version` 成功输出版本号；<br>2. 进程退出码为 `0`；<br>3. 无环境破坏或冲突。 |
| **REQ-02** | 将 REA 注册为系统级 MCP 服务器（开箱即用 MCP 工具手脚） | 作为 Agent，我需要通过 MCP 协议直接调用 REA 的反编译、JS 还原、调用流追踪等原子工具。 | 在 `C:\Users\Administrator\.gemini\antigravity\mcp_config.json` 及相关配置中增补 `rea` MCP 服务配置（参数为 `rea --mcp` 或 `npx rea-agents --mcp`），提供完整的原子逆向工具接口。 | 1. `mcp_config.json` 正确解析且包含 `rea` 配置；<br>2. REA MCP 服务能够正常初始化握手；<br>3. 包含二进制分析与应用还原核心接口。 |
| **REQ-03** | 在 Ps-openspec 工具手脚层沉淀 REA 逆向原子技能 | 作为架构师与研发人员，我需要一份标准的工业级 SKILL.md，指导 Agent 规范、安全地使用 REA 展开逆向。 | 在 `skills/rea-reverse-engineering/SKILL.md` 建立原子操作技能，明确涵盖：二进制静态反编译、Electron/JS 资源还原、Android APK 提取、Evidence 证据链驱动与最小爆炸半径约束。 | 1. 生成标准的 `skills/rea-reverse-engineering/SKILL.md`；<br>2. 包含 YAML 前言、详细 SOP 流程与避坑指南；<br>3. 同步分发至全局 `~/.gemini/config/skills/`。 |
| **REQ-04** | 在 Ps-openspec 最高宪章中挂载 Action Skill 索引 | 作为系统总管，我要求所有原子操作技能必须在总宪章中受控索引，杜绝野游脚本与无据技能。 | 在 `GEMINI.md` 与 `skills/pstack-openspec/SKILL.md` 的 `### 3.1 核心方法论原子技能库索引` 中正式登记 `rea-reverse-engineering` 技能，并同步更新活文档规范。 | 1. `GEMINI.md` 第 3.1 节包含 REA 逆向工程原子技能条目；<br>2. 活文档 `orbitstack-pstack-routing` 同步增补契约；<br>3. 链接与路径物理有效。 |
| **REQ-05** | 自动化测试矩阵与全网同步打包闭环 | 作为质量负责人，安装与接入工作必须具备严谨的自动化测试验证，确保零退化与可追溯发布。 | 在 `scripts/tests/gemini-adapter.test.mjs` 中添加新测试（Test 47），验证 REA 技能元数据、MCP 配置与宪章索引；执行完整测试套件与 `package-bundle.ps1`。 | 1. 自动化测试套件全绿（退出码 0）；<br>2. Release 包成功打包并就地同步；<br>3. 保持现有 54 项公理与 46 个测试 100% 现状。 |

---

## 4. 🛑 门禁 1 物理禁令合规自查 (Gate 1 Compliance Verification)
- [x] **纯粹聚焦“做什么与验收标准” (What & Acceptance Only)**：完全聚焦于 REA 安装范围、MCP 接入规范与 Ps-openspec 工具手脚层集成标准；
- [x] **零具体实现代码泄露 (Zero Implementation Details)**：未编写任何代码文件，未修改现有配置文件；
- [x] **零拟变文件清单 (Zero File Diff Lists)**：未列出任何拟变文件的行号或差异比对；
- [x] **事实指纹不可篡改核销**：用户原始指令 100% 逐字保留，SHA-256 指纹已固化；
- [x] **等待用户授权**：在此严格停机等待用户确认回复，获得批准后方可开启 OpenSpec 编制（Gate 2）。
