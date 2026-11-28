# Proposal: Generality Classification & Source Mutation Boundary

## 背景与动机
当前 `Ps-openspec` 已经在多个公理（Axiom 27、34、35、78、84）及 L2 脚本（`scripts/check-anti-hardcoding.mjs`）中禁止“面向特定场景硬编码”，但在实际执行中仍存在三个结构性缺口：
1. **缺少基于通用性、灵活性、可插拔性的问题分类与系统内容分类**：Agent 遇到新需求或新模板时，缺少一套前置决策树来判断“该问题属于引擎原语缺失、边界适配、还是可插拔 Schema 配置”。
2. **缺少“允许改源码 vs 禁止改源码”的显式红绿灯边界**：一方面 Agent 容易为了单一模板去改核心源码；另一方面若无明确边界，也可能出现“把协议标准常量也过度抽象成外部配置”的过度设计。
3. **Gate 2 设计立法缺少三元分账与“零源码修改盲测”机制，L2 守卫对静态字典/映射表内嵌缺乏检测能力**。

## 目标
1. 建立**问题分类矩阵**（基于通用性、灵活性、可插拔性：Class A/B/C/D）与**系统代码/内容六元分类**。
2. 明确**源码修改红绿灯决策边界**（哪些情况允许修改源码、哪些情况严格禁止修改源码）。
3. 在 Gate 2（`design.md` 立法阶段）引入**三元分账表（Engine Primitives / Pluggable Schema / Sample Fixtures）**与**零源码修改异构盲测**要求，并将分散的通用性公理在 `operating-invariants-full.md` 中做清晰归口（保持 `GEMINI.md` 0 字节增量）。
4. 增强 `scripts/check-anti-hardcoding.mjs` 对静态业务映射表/字面量清单的启发式检测与自定义扫描路径支持，并补充单元测试与 L2 验证。

## 影响范围
- `skills/pstack-openspec/references/operating-invariants-full.md`
- `skills/pstack-openspec/SKILL.md`
- `worker.md`
- `scripts/check-anti-hardcoding.mjs`
- `tests/problem-class-generalization.test.mjs`
- 保持现状承诺：`GEMINI.md` 严格保持 0 字节增量；现有 74 项 hub/sync 测试与所有 L2 守卫保持 100% 通过。
