---
description: "OrthoAudit：六步代码正交与通用性硬编码审计（--git-diff 机械预筛 + 语义三问 + 异构探针 + 审计表）"
---

执行 **OrthoAudit（代码正交与通用性审计引擎）**：

1. 先按需读取 `~/.gemini/ps-hub/skills/ortho-audit/SKILL.md` 获取完整执行剧本。
2. **变动定界**：拉取当前任务或指定范围的全量变动文件（`git status --porcelain` / `git diff --name-only`），贴标六元层级（`[Engine Core]` / `[ACL]` / `[Pluggable Schema]` / `[Protocol Invariant]` / `[Fixture/Test]` / `[User Data]`）。
3. **机械预筛**：运行 `node ~/.gemini/ps-hub/scripts/check-anti-hardcoding.mjs --git-diff`（或指定 `--target`）及项目 AST/依赖守卫。
4. **语义三问**：逐个读取 `[Engine Core]` 与 `[ACL]` 变动行区间，执行 Q1 剥离测试、Q2 Class A–D 归类、Q3 跨层依赖与 Category 4 协议白名单复核。
5. **异构探针 & 裁决表**：对通用解析/拓扑/转换改动验证“核心源码 `git diff == 0` 仅换 Schema 跑通异构变体”；严禁输出空洞 `LGTM`，必须按《变动文件逐项审计表》逐文件输出严重度与 `PASS`/`BLOCK` 裁决。
