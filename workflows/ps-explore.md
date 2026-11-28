---
description: "Ps-openspec Step 1 底座感知：纯只读探查调用链、匹配 Playbook 路由并溯源至 Origin Producer"
---

执行 `Ps-openspec` **Step 1【底座感知 (Explore)】**：

1. **纯只读探查**：只读检索目标模块、调用拓扑与 `.harness/project-graph.json`（若存在），**严禁修改任何业务代码**。
2. **剧本锚定**：查询 `~/.gemini/pstack-openspec-route-map.json` 匹配对应 Playbook。
3. **因果溯源**：按合法/非法状态二分法逆向穿透至 `[Root Source]`（Origin Producer），禁止将末端 `[Consumer Sink]` 当成根因。
4. **输出**：只输出拓扑分析、剧本路径与关键风险点。
