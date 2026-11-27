# Gate 2: OpenSpec 规格立法与双清单施工图纸 (`multi-agent-spawn-approval-and-role-dispatch`)

## 1. 法定双清单 (Dual-List Authorization)

### A. 拟变范围清单 (Proposed Mutation Scope)
1. `scripts/check-agent-lifecycle.mjs` `[Root Source / L2 Guard]`：升级 `evaluateAgentLifecycleAction` 强制执行全线程单/多智能体开设需用户批准、同职能优先复用、`roleTag`+`roleDetail` 必填、按职能派单校验及三镜像+`worker.md` 齐套检查。
2. `GEMINI.md` (`82.`)、`skills/pstack-openspec/SKILL.md` (`82.`)、`skills/ai-harness-openspec/SKILL.md` (`79.`)、`worker.md` (`1r`)、`README.md` `[Constitutional Mirrors]`：立法写入 Axiom 82（融合 poteto 多 Agent 架构思路）。
3. `tests/agent-lifecycle-governance.test.mjs` & `scripts/tests/gemini-adapter.test.mjs` `[Verification]`：新增 Axiom 82 单元测试与回归校验。

### B. 保持现状承诺清单 (Preservation Commitments)
- 保持既有 `Axiom 77`~`Axiom 81` 全部条款与 L2 守卫逻辑完整无损。
- 保持 `drawio-toolkit.mjs` 与其他业务模块不作无关修改。
