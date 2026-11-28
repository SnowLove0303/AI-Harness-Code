# Ps-openspec 斜杠指令指南 (Slash Commands Guide)

> 在 Antigravity 对话框中输入 `/` 即可直接唤起以下按需指令。**平时 0 常驻上下文开销**，仅在触发时加载对应剧本。

---

## 一、全套指令速查表

| 斜杠指令 | 对应阶段 | 核心职责 | 关键约束 / 产出 |
| :--- | :--- | :--- | :--- |
| **`/ps-gate1`** | Step 0（门禁 1） | 1:1 需求全量立案（RTM）与问题清单原子切片 | 严禁讨论实现与拟变文件，停等确认 |
| **`/ps-explore`** | Step 1（探查） | 只读底座感知、匹配 Playbook 与因果溯源 | 纯只读，溯源至 `[Root Source]` |
| **`/ps-gate2`** | Step 2（门禁 2） | OpenSpec 立法、三元分账与双清单授权 | `design.md` 划分 Engine/Schema/Fixture，获批前禁改业务码 |
| **`/ps-apply`** | Step 3（施工） | `[-]` 单焦点施工 + VS Code Diff 检阅 | 遵守 Class A–D 边界与 `--max-warnings=0` |
| **`/ortho-audit`** | 专项正交审计 | **OrthoAudit** 六步代码正交与硬编码审计 | `--git-diff` 预筛 + 语义三问 + 异构探针 + 逐文件审计表 |
| **`/ps-verify`** | Step 4–5（终审） | 两阶双轨终审、1:1 核销清算与归档 | `[Measured]` 退码 0 + `openspec validate --all --strict` |
| **`/ps-guide`** | 帮助导航 | 快速展示全部 `/` 指令与场景选型 | 即时速查 |

---

## 二、标准组合用法

1. **完整复杂任务**：`/ps-gate1` → `/ps-explore` → `/ps-gate2` → `/ps-apply` → `/ortho-audit` → `/ps-verify`
2. **仅做代码硬编码与通用性审计**：直接输入 **`/ortho-audit`**，可附带目标仓库路径、分支或 Commit 范围。
3. **快速查看指令**：随时输入 **`/ps-guide`**。

---

## 三、本机安装与同步路径

运行 `scripts/sync-to-global.ps1` 后，指令插件会自动部署至：
- `~/.gemini/config/plugins/ps-openspec/plugin.json`
- `~/.gemini/config/plugins/ps-openspec/workflows/*.md`
