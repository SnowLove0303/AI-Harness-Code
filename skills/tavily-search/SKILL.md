---
name: tavily-search
description: "基于官方 Tavily AI 搜索引擎的 LLM 原生全网高精度检索与内容抓取技能。集成主备双密钥容灾轮询（主 Key + 备用 Key），提供面向 Agent 的语义搜索、精准问答提炼与网页深度内容萃取。在探索新任务、调查未知第三方库、排查诡异环境报错及多次试错撞墙时强制激活。触发词：tavily/tavily-search/联网搜索/查资料/搜索最新信息/四处撞墙检索"
---

# Tavily 全网智能搜索与精准萃取技能 (Tavily Search Skill)

> **核心定位**：专为 AI Coding Agent 设计的 LLM 优化型全网搜索引擎与内容提取器。
> 解决大模型预训练知识截止、未知开源库用法、最新 API 变动以及**“排错四处撞墙、闭门造车”**的困境。

---

## 一、 快速调用指令

本技能已全局配置自动容灾轮询机制（优先调用主 Key，遇到频控或额度耗尽自动秒级无缝切换至备用 Key）：

### 1. 终端命令行调用
```bash
# 标准检索（返回语义解答 + 相关网页摘要）
C:\Users\Administrator\AppData\Local\Programs\Python\Python312\python.exe "C:\Users\Administrator\.gemini\config\skills\tavily-search\tavily_runner.py" search "检索内容"

# 深度高级检索（抓取更多源与深度分析）
C:\Users\Administrator\AppData\Local\Programs\Python\Python312\python.exe "C:\Users\Administrator\.gemini\config\skills\tavily-search\tavily_runner.py" search "检索内容" --depth advanced --max-results 5

# 精准 URL 内容抓取（清洗掉 HTML，保留纯净 Markdown 正文）
C:\Users\Administrator\AppData\Local\Programs\Python\Python312\python.exe "C:\Users\Administrator\.gemini\config\skills\tavily-search\tavily_runner.py" extract "https://example.com/docs"
```

### 2. 内部原生工具联动
在 Antigravity 中，系统内置工具 `search_web` 也可直接发起 Web 检索，二者相辅相成。当需要更聚焦的开发者技术文档、GitHub 解决方案及完整正文抽取时，优先调用 `tavily_runner.py`。

---

## 二、 凭据与安全保管

- **配置文件**：`C:\Users\Administrator\.gemini\config\credentials\tavily_credentials.json`
- **安全铁律**：**严禁将真实的 API Key 写入代码仓库或公开发布文档！** 实际凭证已脱敏并隔离存储在本地配置目录中。
- **容灾机制**：
  - 本地凭据文件包含 `primary_api_key` 与 `backup_api_key`；
  - 脚本内置主备切换异常捕获，单 Key 失败自动秒级无缝切换，不阻断任务。

---

## 三、 强制启用情景规范（特别是 Agent 四处撞墙时）

在日常执行中，Agent 极易陷入“闭门造车、过度自信、连续撞墙”的死循环。在以下四大情境下，**必须强制停下本地修改，优先使用搜索技能查找解法**：

### 🛑 场景 1：排错连续失败 2 次（四处撞墙门禁 - Wall-Hitting Threshold）
- **现象**：针对同一编译报错、测试红灯、环境变量异常或依赖冲突，Agent 连续尝试了 2 次修复均未解决（例如反复改 import、反复尝试不同语法或修补补丁）。
- **强制规则**：**禁止进行第 3 次盲目猜测和尝试！**
- **必须执行**：立即提取终端**最精确的原始报错信息（去除项目私有路径）**，结合涉及的库名版本，通过 Tavily 发起精准检索，查看官方 Issue、StackOverflow、GitHub PR 中的真实根因与权威解决路径。

### 🌐 场景 2：面对新任务、陌生第三方库或前沿开源框架
- **现象**：任务涉及未曾接触的开源库（如特定 MCP 协议、新兴 CLI 工具、小众 Python/Node 包）或前沿架构模式（如 Lauren Tan 的 pstack 最新剧本）。
- **强制规则**：**严禁凭大模型通用常识脑补 API 参数和调用规范！**
- **必须执行**：在编写代码或配置前，先检索该库的官方 README、最新发布说明（Release Notes）或 API 规范，确认真实导出的函数签名。

### ⚠️ 场景 3：遇到静默失败或未记录的诡异行为（Black-Box Failures）
- **现象**：命令返回状态码非 0 但无任何有效日志输出；或者调用成功但产物没有任何变化（如 Xmind 云端无响应、代理握手被断开等）。
- **必须执行**：检索该工具的底层协议缺陷、常见踩坑记录（Gotchas）或社区讨论，而不是在本地反复重试。

### 🔄 场景 4：代码重构与最佳实践对齐
- **现象**：需要重构复杂架构（如状态机建模、异步队列、AST Lint 规则编写）。
- **必须执行**：检索业界知名工程师（如 poteto/Kent C. Dodds 等）的开源模式作为参考基线，避免低水平重复造轮子。
