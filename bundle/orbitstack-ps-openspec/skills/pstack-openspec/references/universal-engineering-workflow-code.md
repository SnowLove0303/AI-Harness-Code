# Pstack-OpenSpec 通用工程与工作流审计规范 (Universal Engineering & Workflow Verification Code)

> **法定地位**：本规范为 Pstack-OpenSpec (OrbitStack) 体系面向一切软件工程与 Agent 协同研发的最高法则。彻底终结“弱类型发散编码”、“伪绿灯测试欺骗”、“主干高耦合污染”与“多 Agent 虚假交付”等普遍工程顽疾。

---

## 核心工程哲学 (Lauren Tan / @poteto)

> **“The bottleneck in AI engineering isn't generating code; it is VERIFICATION.”**  
> **“Never accept proxy metrics. Prove it works on the real artifact with zero unintended mutations.”**  
> 软件工程的质量防线必须构建在**类型系统、测试有效性、架构开闭原则与工作流裁执分离**四大物理支柱之上，严禁依赖大模型的通用“自觉”或散文式口头约定。

```text
┌────────────────────────────────────────────────────────────────────────┐
│              【Pstack-OpenSpec 四维通用工程与工作流治理支柱】          │
├────────────────────────────────────────────────────────────────────────┤
│ 支柱 1: 编程与类型工程 (Coding & Types) ── 非法状态在编译期不可表达      │
│ 支柱 2: 测试与质量工程 (Testing & QA) ── 变异测试检验与脆弱断言机防      │
│ 支柱 3: 架构与设计模式 (Architecture) ── 策略开闭隔离与纯函数单向流      │
│ 支柱 4: Agent 协同工作流 (Agentic Workflows) ── 裁执分离与零信任交接   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 一、支柱 1：编程与类型工程规范 (Coding & Type Systems)

### 1.1 非法状态在类型层不可表达 (Make Illegal States Unrepresentable)
- **禁令**：严禁在核心业务流转中滥用 `any`、`Record<string, unknown>` 或无字段约束的松散字典；
- **法定规程**：
  1. 必须使用**严格可辨识联合（Discriminated Unions）**显式建模状态机：
     ```typescript
     // 错误示范：松散字段，容易导致逻辑遗漏
     interface ProcessResult { mode: string; data?: any; exemption?: string; }

     // 法定规范：状态与专有字段强绑定，漏写字段编译期直接报错
     type WorkState =
       | { mode: 'STANDARD'; payload: StandardPayload }
       | { mode: 'COMPOSITE_EXEMPTION'; payload: ExemptionPayload; exemptionClause: string };
     ```
  2. 编译器是第一道承重墙。凡是状态分支漏处理或字段缺失，必须在类型检查阶段直接编译报错，严禁拖延至运行时。

### 1.2 快速失败与禁止静默降级 (Fail-Fast over Silent Fallback)
- **禁令**：严禁编写无脑 `try { ... } catch (e) { return defaultValue; }` 吞噬异常的代码；严禁使用 `|| ''` 将关键的未解析状态强行抹平为空串；
- **法定规程**：遇到未预期的非法状态、不合规输入或解析断裂，必须**立即抛出致命异常（Crash Early / Throw Fatal Error）**，立刻阻断流程，严禁让脏数据流入下游。

### 1.3 确定性 AST 遍历代替发散正则 (Deterministic AST over Greedy RegEx)
- **禁令**：在处理具备结构特征的文本、标记语言或代码时，严禁使用脆弱、贪婪的正则表达式进行跨行截取；
- **法定规程**：必须使用词法分析器（Tokenizer）、抽象语法树（AST）遍历器或确定性状态机，从算法本质上杜绝“正则越界抓取周边垃圾字段”的编码事故。

---

## 二、支柱 2：测试与质量工程规范 (Testing & Quality Engineering)

### 2.1 变异测试与测试有效性自审 (Mutation Testing Mindset)
- **禁令**：严禁只覆盖正常路径（Happy Path）的“伪绿灯测试”；
- **法定规程**：
  1. 评判一个测试是否合法的硬指标是：**当故意删除函数内部的核心实现逻辑，测试是否会立刻报红？**
  2. 凡是“核心逻辑被掏空、关键数据被截断，测试依然返回 Exit Code 0”的测试，一律定义为**垃圾测试（Toxic Test）**，代码审查中直接一票否决打回。

### 2.2 彻底废除弱断言，强制全结构与纯净度断言 (Deep Structural Assertions)
- **禁令**：严禁在测试中仅仅使用 `toBeDefined()`、`not.toBeNull()` 或单向包含 `toContain()` 作为验收依据；
- **法定规程**：
  1. **完整性断言（Completeness）**：必须对数据结构进行快照级（Exact Snapshot）或深度递归字段比对，确保期望的数据 100% 存在；
  2. **反向纯净度断言（Purity Assertion）**：必须断言**未声明的非法字段数恒为 0**。任何由于副作用或污染泄露而注入的多余数据，必须直接触发测试红灯。

### 2.3 负向攻击测试强制配比 (Negative & Edge Test Mandate)
- **法定规程**：功能模块的单元测试中，正向功能用例与异常攻击/边界容错用例的比例不得低于 `1:1`。必须显式覆盖非法输入拦截、边界截断溢出与类型不匹配断言。

---

## 三、支柱 3：软件架构与设计模式规范 (Architecture & Design Patterns)

### 3.1 严格策略模式与开闭原则 (Strategy Pattern & Open-Closed Principle)
- **禁令**：严禁为了迎合某个特例需求，在通用的核心公共调度函数（如 `process()`, `render()`, `dispatch()`）内部不断硬塞 `if (specialCase) { ... } else { ... }`；
- **法定规程**：
  1. 核心调度主干对修改关闭，仅维护抽象生命周期流转；
  2. 具体的业务行为全部抽象为独立的**策略类（Strategy Classes）**或**独立分支处理器（Sub-handlers）**；
  3. **物理隔离原则**：面对新型特例，只能通过新建策略来扩展，严禁修改既有策略的代码文件。从架构拓扑上物理阻断“修复新特例破坏旧功能（治新复旧）”的风险。

### 3.2 不可变数据流与纯函数契约 (Immutability & Pure Functions)
- **禁令**：核心处理链路中，严禁对外部传入的状态对象或配置进行原地篡改（In-place Mutation）；
- **法定规程**：核心函数必须设计为纯函数（Pure Functions）。每个处理阶段接收不可变输入，计算并返回全新的不可变状态对象，彻底消除“上游处理将脏数据挂在公共对象上，被下游意外污染产出”的状态泄露隐患。

---

## 四、支柱 4：Agent 协同工作流与审查 SOP (Agentic Workflows & Review SOP)

### 4.1 裁执分离公理 (Separation of Implementor & Verifier)
- **禁令**：严禁施工 Agent 既负责编写功能代码，又负责编写验收该功能的测试断言；
- **法定规程**：
  1. **测试权威归属于主控或红队**：验收测试必须根据需求规格在施工前预先生成，并对施工 Agent 设为只读；
  2. **施工者不得动测试**：施工 Agent 提交的 PR / Commit 中，**凡是包含降低、弱化、删除或修改验收测试的行为，CI 流水线直接阻断并废黜该交付**；
  3. 施工 Agent 只能通过修改业务实现代码使得独立验收测试转绿。

### 4.2 变更影响半径审计 (Blast Radius Verification & Leave-as-is)
- **禁令**：严禁在修改目标代码时顺手重构无关代码、调整周边缩进或删除未关联注释；
- **法定规程**：
  1. 动工前必须显式划定本次变更的《因果影响圈》（涉及的文件路径与核心函数）；
  2. Code Review 必须自动审计 `git diff`：**凡是出现因果影响圈之外的文件变动，哪怕只有 1 行，直接打回重做**，坚决贯彻最小因果集 (Leave-as-is)。

### 4.3 零信任交接胶囊 (Zero-Trust Handoff Capsule)
- **法定规程**：
  子 Agent 向主控环境汇报交付时，必须封装标准【任务胶囊】，包含不可篡改的三大物理凭证：
  1. **终端执行凭据**：真实的命令日志、真实退出码为 `0`；
  2. **物理差分凭据**：变动文件的 `git diff --stat`；
  3. **独立红队复测报告**：主控 Agent 必须以零信任红队视角在主环境中亲自重新运行验收套件，验证全绿后方可推进流水线。
