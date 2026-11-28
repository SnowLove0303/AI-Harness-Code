---
description: "Ps-openspec Step 4–5 终审归档：两阶双轨审计、1:1 双向核销清算、问题清单逐项确认与 openspec 归档"
---

执行 `Ps-openspec` **Step 4–5【两阶双轨终审与核销归档】**：

1. **Step 1 机械审计**：运行 `~/.gemini/ps-hub/scripts/check-*.mjs` 相关 L2 守卫（含 `check-anti-hardcoding.mjs --git-diff`、`check-blind-audit.mjs`）及全量测试，必须全部退出码 0。
2. **Step 2 认知核销**：对照 OpenSpec `specs/` 执行 1:1 双向核销清算，给出 `[Measured]` 实测证据；高争议或跨模块任务按需触发 `/interrogate`。
3. **问题任务终局确认**：若为问题类任务，附带《问题清单逐项审计对照确认表》并跑通 `check-issue-clearance.mjs` / `check-problem-ledger-ruling.mjs`，显式提请用户逐项确认。
4. **归档与下沉**：运行 `openspec validate --all --strict`，将高频纠偏下沉为 L1/L2 守卫或按需 Skill。
