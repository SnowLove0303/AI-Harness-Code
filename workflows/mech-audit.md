---
description: "MechAudit（纯机械审计）：0-Token 确定性脚本扫描变动文件硬编码、静态字典与既有 L2 守卫门禁"
---

执行 **MechAudit（纯机械脚本审计模式）**：

1. **变动文件硬编码扫描**：运行 `node ~/.gemini/ps-hub/scripts/check-anti-hardcoding.mjs --git-diff`（若指定目录则加 `--target <dir>`）。
2. **全套 L2 守卫检查**：若当前仓库配置了 `npm run guard:*`（如 `guard:anti-hardcoding`、`guard:blind-audit`、`guard:single-entry-hub`、`guard:unslop`、`guard:privacy`）或 ESLint / Semgrep / dependency-cruiser，依次执行。
3. **客观汇报**：仅输出真实命令、扫描文件数、命中行号/违规码与退出码（`0` 或 `1`）；如遇红灯直接拦截，如需语义深审请继续执行 `/ortho-audit`。
