# Tasks: generality-classification-and-source-mutation-boundary

- [x] 1. 在 `skills/pstack-openspec/references/operating-invariants-full.md` 的 Axiom 84 中补全问题四分类（Class A–D）、系统内容六元分类、源码修改红绿灯边界、合法不变量白名单及与 Axiom 27/34/35/78 的交叉索引。
- [x] 2. 在 `skills/pstack-openspec/SKILL.md` 的 Gate 2 立法规范中补充“三元分账表（Engine Primitives / Pluggable Schema / Sample Fixtures）”与“零核心源码改动异构盲测”验收要求。
- [x] 3. 在 `worker.md` 中精炼同步问题分类与源码修改红绿灯执行约束（确保通过 `guard:unslop` 与 `guard:neutrality`）。
- [x] 4. 增强 `scripts/check-anti-hardcoding.mjs`（新增静态字面量清单/映射表内嵌检测与可选目录扫描支持，保持现有 API 100% 向后兼容），并在 `tests/problem-class-generalization.test.mjs` 补充正反例测试。
- [x] 5. 运行全套 L2 守卫（`guard:anti-hardcoding`、`guard:single-entry-hub`、`guard:unslop`、`guard:neutrality`、`guard:privacy`）及单元测试，验证 `GEMINI.md` 0 字节增量。
- [x] 6. 执行 `scripts/sync-to-global.ps1` 同步至全局 `~/.gemini/`，提交并推送至远程仓库 `origin/release/ps-openspec-v3.00`。
