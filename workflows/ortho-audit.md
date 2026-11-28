---
description: "OrthoAudit（纯 Agent 介入审计）：不依赖脚本，由 Agent 直接读取变动文件与 git diff 执行正交与硬编码语义审计"
---

执行 **OrthoAudit（纯 Agent 认知介入审计模式，严禁偷懒用静态脚本替代人工语义审阅）**：

1. 按需读取 `~/.gemini/ps-hub/skills/ortho-audit/SKILL.md` 获取完整六元分类与 Class A–D 标尺。
2. **变动定界**：拉取当前任务或指定范围的全量变动文件（`git status --porcelain` / `git diff --name-only`），贴标六元层级（`[Engine Core]` / `[ACL]` / `[Pluggable Schema]` / `[Protocol Invariant]` / `[Fixture/Test]` / `[User Data]`）。
3. **逐文件语义三问**：Agent 亲自读取 `[Engine Core]` 与 `[ACL]` 变动行区间，执行 Q1 剥离测试（删掉参考模板是否还成立）、Q2 Class A–D 归类、Q3 跨层依赖与 Category 4 白名单复核。
4. **异构探针 & 裁决表**：对通用解析/拓扑/转换改动给出“核心源码 `git diff == 0` 仅换 Schema 跑通异构变体”的探针验证；严禁输出空洞 `LGTM`，必须输出《变动文件逐项审计表》与 `PASS`/`BLOCK` 裁决。
