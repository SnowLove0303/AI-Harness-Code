# Design: Generality Classification & Source Mutation Boundary

## 1. 架构分层与红绿灯决策流
```text
输入变更/问题
   ├─▶ [Class A: 单实例/单模板差异] ──▶ 🔴 禁止改源码（改外部 Schema / Sample Fixture）
   ├─▶ [Class B: 策略/映射/规则差异] ──▶ 🔴 禁止改引擎源码（改 Pluggable Schema / Strategy）
   ├─▶ [Class C: 外部格式脏噪/异构]   ──▶ 🟡 仅允许改边界防腐层 (ACL)，核心引擎只读
   └─▶ [Class D: 通用原语/机制缺失]   ──▶ 🟢 允许改引擎源码（须满足四严律 + 零源码改动异构盲测）
```

## 2. 白名单边界（防过度抽象）
以下内容属于 **Category 4（协议与标准不变量）**，允许在源码中显式枚举，不触发硬编码违规：
- 国际/行业标准协议码（如 HTTP 状态码、MIME 类型、文件格式魔数）
- 语言/运行时内置枚举与 CLI 工具自身命令选项
- 纯数学/物理常数与通用 AST 节点类型名

## 3. 各文件落点设计
1. **`skills/pstack-openspec/references/operating-invariants-full.md`**：
   - 在 Axiom 84 下扩充并固化**问题四分类（Class A–D）**、**系统内容六元分类**、**源码修改红绿灯边界**与**合法不变量白名单**，并显式索引 Axiom 27/34/35/78，形成统一的“通用性与可插拔治理参考”。
2. **`skills/pstack-openspec/SKILL.md`**：
   - 在 Step 2（Gate 2 立法）补充【三元分账表（Engine Primitives / Pluggable Schema / Sample Fixtures）】与【零核心源码改动异构盲测】提示，确保规划期即完成职责切分。
3. **`worker.md`**：
   - 精简补充 1–2 条执行级约束：遵循问题四分类与源码修改红绿灯边界（Class A/B 禁改引擎源码，协议不变量可枚举）。
4. **`scripts/check-anti-hardcoding.mjs` & `tests/problem-class-generalization.test.mjs`**：
   - 保持 `scanCodeForSpecialCasing` 与 `validateGeneralizationEvidence` 原有签名与规则 100% 兼容。
   - 新增 `STATIC_MAPPING_BLOAT_WARN` / 检测能力（或可配置阈值检测源码中内嵌大规模静态业务字符串清单/字典），并支持 CLI 传入自定义目标目录/文件。
   - 更新 `tests/problem-class-generalization.test.mjs` 覆盖新规则与正反例。
