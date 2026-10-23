---
name: xmind-cloud-mcp
description: >-
  Xmind 云端思维导图官方 MCP (Model Context Protocol) 深度操作指南与自动化工具库。
  支持对 Xmind 云端文档 (app.xmind.com) 进行纯云端无损读取 (xmind_read_mindmap)、
  增量大纲编辑 (xmind_edit_mindmap)、云端发布推送 (xmind_show_mindmap) 以及主题属性修饰。
  严格遵循云端就地更新规范，免建本地 .xmind 文件，并内置 OAuth 凭证复用、本地 HTTP/TLS 代理打通、
  SSE 流式分块解码及 <!--t:nodeId--> 锚点保护闭环机制。
---

# Xmind 云端 MCP (Xmind Cloud MCP) 架构与实战全景指南

> **适用场景**：用户提供 Xmind 云端分享链接（如 `https://app.xmind.com/share/<fileId>`）或要求在线直接编辑、补全云端导图，**严禁新建本地 `.xmind` 文件**的场景。

---

## 1. 架构原理与运行拓扑

Xmind 官方云端 MCP 运行在 `https://app.xmind.com/api/mcp`，采用标准 **JSON-RPC 2.0 over SSE (Server-Sent Events)** 协议，并受 OAuth 2.0 PKCE 鉴权保护。

### 1.1 核心调用链路

```text
┌─────────────────┐       HTTP CONNECT       ┌─────────────────┐       TLS / HTTPS POST      ┌─────────────────────┐
│  Agent / Node   ├─────────────────────────►│ 127.0.0.1:7890   ├────────────────────────────►│ app.xmind.com/api/mcp │
│  (JSON-RPC 2.0) │                          │ (Local Proxy)   │  Authorization: Bearer <T>  │ (Official MCP Server)│
└─────────────────┘                          └─────────────────┘  Accept: text/event-stream  └─────────────────────┘
```

### 1.2 关键凭证存储位置

为确保跨线程、跨任务持久复用，无需重复向用户发起浏览器扫码授权：
- **凭据路径**：`C:\Users\Administrator\.gemini\config\credentials\xmind_mcp_token.json`
- **数据结构**：
  ```json
  {
    "access_token": "ey...",
    "refresh_token": "...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "openid mcp:connect"
  }
  ```

---

## 2. 工具库与执行环境

本技能已全局沉淀可直接执行的 Node.js 客户端驱动：
**路径**：[`C:\Users\Administrator\.gemini\config\skills\xmind-cloud-mcp\xmind_cloud_client.js`](file:///C:/Users/Administrator/.gemini/config/skills/xmind-cloud-mcp/xmind_cloud_client.js)

### 2.1 命令行直接调用

```bash
# 1. 读取云端导图完整大纲 (包含已分配的节点 ID 锚点)
node "C:\Users\Administrator\.gemini\config\skills\xmind-cloud-mcp\xmind_cloud_client.js" read <fileId>

# 2. 推送并使最新编辑对云端用户即时可见 (极为重要，修改后必须调用)
node "C:\Users\Administrator\.gemini\config\skills\xmind-cloud-mcp\xmind_cloud_client.js" show <fileId>

# 3. 调用指定工具
node "C:\Users\Administrator\.gemini\config\skills\xmind-cloud-mcp\xmind_cloud_client.js" <tool_name> <fileId> '<json_arguments>'
```

### 2.2 代码内集成调用

```javascript
const { callTool } = require('C:\\Users\\Administrator\\.gemini\\config\\skills\\xmind-cloud-mcp\\xmind_cloud_client.js');

async function updateCloudMap(fileId, newMarkdown) {
  // 1. 提交新大纲
  const editResult = await callTool('xmind_edit_mindmap', { fileId, markdown: newMarkdown });
  console.log('Edit result:', editResult);

  // 2. 必须触发 show 使其在云端渲染生效
  const showResult = await callTool('xmind_show_mindmap', { fileId });
  console.log('Show result:', showResult);
}
```

---

## 3. 踩坑复盘与法定避坑纪律 (Gotchas & Invariants)

在前期对接与实操中，我们验证并解决了以下 6 大关键技术瓶颈。任何后续 Agent 必须无条件遵守以下防雷规范：

### ① 必须传递 `Accept: application/json, text/event-stream` 请求头
- **坑因**：直接发起标准 JSON POST 请求时，Xmind 网关会直接拒绝并返回 `HTTP 406 Not Acceptable`。
- **正解**：请求头必须显式声明：
  ```http
  Accept: application/json, text/event-stream
  Content-Type: application/json
  Authorization: Bearer <access_token>
  ```

### ② 严格处理 HTTP 1.1 Chunked Transfer Encoding 与 SSE 响应
- **坑因**：云端服务端通过分块传输返回 `Transfer-Encoding: chunked`，并在流中以 `event: message\ndata: {...}` 推送响应。若直接用 `JSON.parse` 解析原始 body，会因为十六进制分块长度（如 `eef\r\n`、`0\r\n\r\n`）导致报语法错误。
- **正解**：必须先经由 `unchunk()` 去除分块包头，再截取 `data: ` 之后的 JSON 负载。

### ③ 编辑前必须剔除只读概览脚手架 (`<!-- ===== read-only overview ===== -->`)
- **坑因**：使用 `xmind_read_mindmap` 读取大纲时，尾部会附带一段格式如下的只读概况注释：
  ```markdown
  <!-- ===== read-only overview (not part of the editable outline) ===== -->
  <!-- summaries (edit via xmind_add_summary / id-based tools) -->
  - summary "前端请求，后端处理返回" on ...
  ```
  如果将该尾部原样送回 `xmind_edit_mindmap`，服务端会将其判定为非法 Markdown 语法并报错拒绝更新。
- **正解**：提交编辑前，使用 `indexOf('<!-- ===== read-only overview')` 截断，只保留上方有效的大纲主体。

### ④ 既有节点必须严格保留 `<!--t:UUID-->` 锚点
- **坑因**：Xmind 云端依据行尾的 `<!--t:08b0855f-...-->` 追踪节点身份。如果 Agent 擅自删除了既有节点的 `<!--t:...-->` 标记，云端会将其视为“删除原节点并新建全新节点”，导致原有的节点样式、连线（Relationship）、概要（Summary）以及子分支全部丢失或错位。
- **正解**：
  - 读取既有大纲后，对不需要修改的节点，保持整行（包括尾部 `<!--t:...-->`）绝对一字不改；
  - 仅对新增的下级子节点使用普通 Markdown 标题语法（如 `### 子节点`，无需手动伪造 UUID），服务端在接收后会自动分配并持久化新的 `<!--t:...-->`。

### ⑤ 编辑完毕后必须显式调用 `xmind_show_mindmap`
- **坑因**：执行 `xmind_edit_mindmap` 成功后，服务端仅暂存了草稿变更（状态提示：`Mindmap updated successfully. The user cannot see this map yet — call xmind_show_mindmap once you are done making changes.`）。此时用户在网页前端刷新是**完全看不到任何变化的**！
- **正解**：编辑完成后，必须立刻紧接着调用一次 `xmind_show_mindmap({ fileId })`，触发云端版本快照发布，用户刷新页面即可秒级看到最新内容。

### ⑥ 分享链接 `fileId` 权威核对公理
- **坑因**：用户可能会在工作空间中存在多个同名或副本导图（例如历史生成的 `61pmZSaH` 与当前打开的 `UQEfdGWt`）。如果 Agent 仅凭导图标题进行模糊搜索，极易修改到旧副本上，导致用户在当前分享链接中看不到变动。
- **正解**：以用户指令中明确提供的 `https://app.xmind.com/share/<fileId>` 提取出的 `fileId` 为唯一法定目标文件，严禁脱离该 ID 自行猜测或随意切换文件。

---

## 4. 云端常用工具参数清单

| 工具名 (`name`) | 关键参数 (`arguments`) | 说明 |
|---|---|---|
| `xmind_read_mindmap` | `{ "fileId": string }` | 读取云端导图完整大纲结构与节点锚点 |
| `xmind_edit_mindmap` | `{ "fileId": string, "markdown": string }` | 以 Markdown 全量/增量大纲替换更新导图 |
| `xmind_show_mindmap` | `{ "fileId": string }` | 发布草稿，使最新修改在 Web 视图正式可见 |
| `xmind_get_user_info`| `{}` | 获取当前授权用户的个人信息与团队空间 |
| `xmind_add_topic`    | `{ "fileId": string, "parentTopicId": string, "title": string }` | 在指定节点下单个增补子节点 |
| `xmind_add_summary`  | `{ "fileId": string, "parentTopicId": string, "range": string, "title": string }` | 为指定范围的子节点添加概要说明 |
| `xmind_add_relationship` | `{ "fileId": string, "startTopicId": string, "endTopicId": string, "title": string }` | 在两个节点之间创建关联箭头连接线 |

---

## 5. 凭证失效应急恢复 SOP (OAuth Flow)

若后续遇到 `401 Unauthorized` 或 Token 过期，按以下标准步骤重新换取 Token：

1. **执行 OAuth 初始化**：
   运行客户端发起 Dynamic Client Registration，获取 `client_id` 并生成 PKCE `code_verifier` 和 `code_challenge`；
2. **引导用户浏览器授权**：
   拼接授权 URL：
   `https://app.xmind.com/oauth/authorize?client_id=<ID>&redirect_uri=http://localhost:8080/callback&response_type=code&scope=openid%20mcp:connect&code_challenge=<HASH>&code_challenge_method=S256`
   引导用户在浏览器中点击“允许/授权”；
3. **换取并写入持久化 Token**：
   用回传的 `code` 调取 `https://app.xmind.com/oauth/token` 接口换取凭证，保存至 `C:\Users\Administrator\.gemini\config\credentials\xmind_mcp_token.json`。
