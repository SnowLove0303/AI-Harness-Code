---
description: "Ps-openspec Step 3 单步施工：[-] 单焦点锁、VS Code Diff 检阅与零警告绿灯验证"
---

执行 `Ps-openspec` **Step 3【单步施工与 VS Code Diff】**：

1. **单焦点锁**：严格按 `tasks.md` 顺序一次仅推进一个 `[-]` 原子任务；禁止跨步抢跑或暗改未授权文件。
2. **程序与数据正交**：遵守 Class A–D 与源码修改红绿灯边界，禁止在通用引擎中内嵌用户实例数据、实体清单或静态映射表。
3. **触觉检阅与零警告门禁**：修改优先使用 `review_diff_in_vscode` / `code --diff`；运行对应测试与 `--max-warnings=0` 检查，真实退出码 0 方可标记 `[x]`。
4. **高频存档**：每个独立闭环节点跑通后及时 Commit。
