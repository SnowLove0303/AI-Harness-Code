---
name: rea-reverse-engineering
description: "基于 REA (Reverse Engineer Anything, GitHub 现象级逆向神器) 官方规范与现代软件逆向工程工业级实践。提供从本地原生二进制 (Ghidra/Hopper/IDA/Rizin) 反编译、JavaScript/Electron 应用 (.asar) 源码还原、Android APK 静态逆向与资产提取、Web 资源嗅探，到 Evidence 事实证据链沉淀与最小爆炸半径审计的全链路工程技能。触发词：rea/逆向工程/反编译/反汇编/逆向分析/二进制分析/脱壳/apk逆向/electron逆向/asar解包/reverse engineering/decompile"
---

# 🕵️ REA 逆向工程与闭源程序还原工程规范 (Reverse Engineer Anything Standard)

> **技术血统与前沿背书**：本规范深度集成 GitHub 爆款次世代开源逆向工程套件 **REA (Reverse Engineer Anything / `rea-agents`)** 与 **Model Context Protocol (MCP)** 原生架构。为 AI 智能体在缺少原始源码的场景下，提供工业级二进制反汇编、反编译、调用链分析、应用图谱恢复与 Evidence 事实凭据自证的标准作业流程（SOP）。

---

## 🎯 一、 核心架构与工具手脚层全景 (Architecture & Tooling Layer)

REA 彻底打破了传统逆向工具割裂、人工繁琐查表的痛点，通过标准 MCP 协议直接为 AI Agent 赋予超过 200 项原子逆向操作能力：

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        AI 智能体 / Ps-openspec 编排                     │
│               (Claude Code / Cursor / Antigravity / Gemini)            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ 标准 MCP Stdio 管道 (rea --mcp)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    REA 中枢引擎 (rea-agents Core)                       │
│    Canonical Evidence Graph / Token Bounded Inspection / Static AST    │
└────────┬──────────────────┬──────────────────┬─────────────────┬───────┘
         │                  │                  │                 │
┌────────▼────────┐┌────────▼────────┐┌────────▼──────┐┌─────────▼──────┐
│  原生二进制分析   ││ JavaScript/    ││  Android APK ││ Web 资源与会话   │
│ (Native Binary) ││ Electron 还原   ││    逆向分析    ││ (Web & Traffic) │
│ Ghidra / Rizin  ││ ASAR / AST /    ││ Apktool /     ││ HAR / CDP /     │
│ Hopper / IDA    ││ SourceMap       ││ Class Search  ││ WebMCP          │
└─────────────────┘└─────────────────┘└───────────────┘└────────────────┘
```

### 核心高频 MCP 原子工具对照表
| 工具名称 | 功能说明 | 典型调用场景 |
| :--- | :--- | :--- |
| `analyze` | 获取目标程序/文件的宏观概览与架构指纹 | 逆向初探，确定文件格式、架构与依赖项 |
| `decompile` | 将选定地址或函数反编译为高级伪代码 | 读取函数具体实现逻辑与算法 |
| `function` | 深度分析单个函数的输入输出、栈帧与局部变量 | 核心加密函数或关键校验点精准审计 |
| `xrefs` | 查找特定地址或字符串的有界交叉引用 | 寻找敏感字符串或 API 的被调用源头 |
| `search` | 在反编译库中检索所有字符串或过程符号 | 查找密钥常量、硬编码 URL、鉴权错误提示 |
| `trace` | 跨引用追踪字面量特性与数据流传播路径 | 数据流追踪，逆向加解密调用链路 |
| `analyze-javascript-application` | 静态重构本地 Electron 或 JS 打包应用 | Electron 逆向、`.asar` 还原源码树 |
| `recover-javascript-sources` | 从打包/混淆脚本中还原高可读性模块 | Webpack / Vite 混淆包还原 |
| `decode-android-resources` | 解包 APK 的 AndroidManifest.xml 与字符串资源 | 安卓权限审查、活动入口与隐式 Intent 逆向 |
| `search-android-classes` | 检索 APK 中所有已声明类与方法签名 | 快速定位安卓核心业务包与混淆类 |
| `evidence-export` | 导出确定性、不可篡改的规范化 Evidence JSON | 生成 Layer 4 真实环境证据与对账核销凭据 |

---

## 🚀 二、 四大标准实战 SOP (Standard Operating Procedures)

### SOP-A：本地原生二进制 (PE/ELF/Mach-O) 静态逆向流程
1. **阶段 1：底座感知与格式指纹 (`analyze`)**
   - 提取文件 PE/ELF 标头、位数、编译目标（MSVC/GCC/Clang）、导入表及加壳特征；
   - 确认符号导出表与动态链接库列表。
2. **阶段 2：敏感锚点检索 (`search` & `xrefs`)**
   - 检索关键特征词（如 `license`, `token`, `aes`, `verify`, `error`）；
   - 对命中地址执行 `xrefs`，逆向穿透定位调用该字符串的判断指令块。
3. **阶段 3：靶向反编译与控制流图恢复 (`decompile` & `function`)**
   - 对核心逻辑块执行反编译，提取 C 伪代码；
   - 重点关注循环边界、位运算与寄存器传参契约。
4. **阶段 4：实测凭据导出 (`evidence-export`)**
   - 导出结构化分析数据，将关键函数伪代码与偏移地址固定为不可篡改的 Evidence JSON。

### SOP-B：Electron 客户端与前端打包应用逆向流程
1. **阶段 1：ASAR 资源穿透 (`analyze-javascript-application`)**
   - 自动识别 Electron 应用的 `app.asar` 或 resources 目录；
   - 静态重构应用的模块依赖图谱（Application Graph）。
2. **阶段 2：源码还原与 AST 去混淆 (`recover-javascript-sources`)**
   - 针对 Webpack/Rollup 打包产物，自动切割独立模块；
   - 基于 AST 语义分析重命名无意义短变量（如 `a`, `b`, `c`），恢复高可读性代码。
3. **阶段 3：IPC 通道与原生桥接逆向**
   - 追踪 `ipcRenderer.invoke` / `ipcMain.handle` 通信通道；
   - 梳理前后端 IPC 通信协议载荷，定位原生 C++/Rust 节点模块。

### SOP-C：Android APK 静态逆向与资产提取流程
1. **阶段 1：清单与资源解包 (`decode-android-resources`)**
   - 使用内置/外置解包链还原 `AndroidManifest.xml`；
   - 提取权限声明、四大组件（Activity, Service, Receiver, Provider）清单。
2. **阶段 2：类与符号检索 (`search-android-classes`)**
   - 搜索与核心业务相关的包名与核心类；
   - 筛选混淆边界，识别第三方 SDK（如 OkHttp, Retrofit）与自定义 Native 库（`*.so`）。
3. **阶段 3：调用链追踪与安全边界分析 (`trace-android-references`)**
   - 追踪敏感 API 调用路径（如网络请求、本地加密存储、设备指纹获取）；
   - 输出完整的类调用链路图。

### SOP-D：API 协议嗅探与流量还原流程
1. **阶段 1：页面与网络脚本嗅探 (`analyze-web-bundle`)**
   - 捕获目标站点的动态 bundle 脚本与网络请求契约；
   - 提取接口端点 URL、请求 Header 模板与参数结构。
2. **阶段 2：签名与加密算法定位**
   - 搜索参数组装（如 `sign`, `nonce`, `timestamp`）的代码位置；
   - 反向追踪 MD5/HMAC/SHA256 等摘要算法的调用入口，提取加盐 Salt 常量。

---

## 🛡️ 三、 Ps-openspec 门禁治理咬合铁律

在遵循 OrbitStack (Ps-openspec) 体系时，Agent 使用 REA 必须严格遵循以下承重墙铁律：

1. **Layer 4 真实证据凭证公理 (Evidence-Backed Witness Axiom)**：
   - 严禁脑补推演控制流！任何“该程序包含某算法”或“通信协议如下”的陈述，必须附带由 REA 实测导出的地址偏移、伪代码片段或 Evidence JSON 事实指纹（`[Measured] Evidence`）；
2. **最小因果集与最小爆炸半径 (Minimal Blast Radius)**：
   - 逆向分析必须紧扣用户目标（Targeted Query），禁止在大规模目标程序中全量递归反编译（避免 Token 溢出与无意义耗时）；
3. **靶向止血与两阶分离联动**：
   - 当任务目标为“定位具体 Bug / 协议异常”时，优先使用 REA 精准复现故障点，出具退出码 0 的修复凭证后，再在 Phase 2 进行通用性规则沉淀。

---

## 🔧 四、 环境排错与健康诊断指南

当 REA 运行异常或提示依赖缺失时，执行以下排查流程：
1. **运行健康自检**：
   ```bash
   rea doctor
   ```
2. **查看配置与 MCP 状态**：
   - 确保 `mcp_config.json` 中已正确配置 `rea` 服务；
   - 确保全局 `rea.cmd` / `rea.mjs` 可在 Node 22+ 环境下正常执行；
3. **原生反编译器按需外挂**：
   - **Ghidra 支持**：解压 Ghidra 12.x 后设置环境变量 `GHIDRA_INSTALL_DIR` 即可自动激活高级原生反编译引擎；
   - **Electron / JS / Web 支持**：纯 Node 原生驱动，开箱即用，无需额外本地反编译器。
