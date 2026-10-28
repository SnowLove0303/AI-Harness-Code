# Lauren Tan (@poteto) Pstack 体系全景解析 (Architecture & Philosophy)

## 1. 核心工程哲学与基石公理 (Core Philosophy & Invariants)
### 1.1 吞吐量源于信任体系 (Throughput Comes From Trust)
- 核心颠覆认知：真正的生产力来自对 Agent 行为确定性的信任，而非盲目堆砌 Agent 数量
- 信任必须由机器硬门禁兜底：人不在场时，系统依然受类型系统、状态机与 AST 严格管辖
- 自由度与防线成正比：底层防线越硬越机械化，顶层 Agent 自动驾驶的吞吐量就越高

### 1.2 将教训编码为机器结构而非散文 (Encode Lessons in Structure, Not Memory)
- 纯文本提示词的局限：极易被模型在长上下文中遗忘，依赖模型的“自觉遵守”
- 结构化机制的绝对强制性：ESLint、AST 检查、TypeScript 类型约束无需模型配合强制生效
- 黄金两遍法则 (The 2-Time Rule)：同一错误人工纠正两次，立刻写成 Lint/编译规则并删除文本指令
- 负面标本案例机制：若必须保留文本规则，必须附带真实翻车的典型 Failure Mode 代码标本

### 1.3 默认全新子智能体与全量合并简报 (Fresh Subagents & Consolidated Scope)
- 废止脏上下文断链追问：严禁在携带几十轮失败报错的旧会话中反复追问（避免上下文中毒）
- 默认全新原则 (Fresh by Default)：每次排错转向、子任务委派，默认启动独立的全新 Subagent
- 全量合并简报 (Consolidated Scope)：必须打包原始意图 + 追加澄清 + 前置状态 + 封闭边界 + 退出码0
- 上下文屏蔽盾 (Context Shielding)：子 Agent 吸收海量调试输出，仅向主中枢回传 1-2k tokens 高密度报告

### 1.4 凭证高于声称 (Proof Over Claims: Evidence Labeling)
- 剥夺文字自嗨资格：严禁 Agent 凭借自然语言宣称“已搞定”，文字自嗨零可信度
- 三级证据强制标注：
  - [Measured / 实测]：真实 CLI / CDP 退出码 0 与日志断言证据
  - [Inferred / 推演]：从静态类型系统严密推导的结论
  - [Guess / 猜想]：待证实的猜想，严禁作为任务打勾依据

### 1.5 严禁静默跳步 (No Silent Skips)
- 剧本阶梯确定性：所有步骤必须按顺序核对
- 跳过必须显式声明：若某步确实无需执行，必须显式注明 `skip: <客观技术原因>`，绝不静默略过

### 1.6 加法之前先做减法 (Subtract Before You Add)
- 反对过度设计：修复问题或重构时，优先考虑消除多余状态、删除冗余抽象
- 代码越少，系统越透明：Bug 滋生的土壤随着复杂度的剥离而消亡

---

## 2. 24 条核心工程原则矩阵 (The 24 Engineering Principles)
### 2.1 认知与设计原则 (Cognition & Design)
- Foundational Thinking (底层思考，第一性原理建立基石逻辑)
- Model the Domain (领域显式建模，让非法状态在类型层不可表达)
- Redesign from First Principles (质疑既有假定，从基础事实自底向上推演)
- Exhaust the Design Space (穷尽设计空间，动工前横向对比多方案权衡)
- Experience First (交互体验与调用方人体工程学优先)
- Minimize Reader Load (降低代码与文档读者的认知负荷，消除口水)

### 2.2 架构与边界原则 (Architecture & Boundaries)
- Boundary Discipline (严格边界隔离，清晰划分模块所有权与只读圈)
- Type System Discipline (类型系统硬纪律，严禁 any 与静默类型断言)
- Separate Before Serializing (数据持久化或跨线程前先解耦内部状态)
- Subtract Before You Add (减法优先，以最小代码因果集达成目标)
- Guard the Context Window (严密守护上下文窗口，防止长文本注意力漂移)
- Build the Lever (将高频手工操作沉淀为自动化杠杆工具与脚本)

### 2.3 排错与实证原则 (Debugging & Evidence)
- Fix Root Causes (修复根本原因，追问 5 次 Why，坚决唾弃局部空值创可贴)
- Reproduce First (实物复现先行，在真实表面先见证红灯报错)
- Sequence Verifiable Units (拆解为独立可验证的原子单元，步步为营)
- Prove It Works (用端到端真实测试证据证明其正常工作)
- Unslop Every Output (无情出厂净化，剥离 AI 套娃、多余防御与假大空)
- Never Block on the Human (设计非关键路径优雅降级，不无谓挂起等待人类)

---

## 3. 结构化执行剧本库 (The Playbook Ecosystem)
### 3.1 研发交付类剧本 (Delivery Playbooks)
- feature (新功能研发)：领域建模 -> 契约立法 -> 红灯测试先行 -> 最小因果实现 -> 绿灯归口
- bugfix (科学排错闭环)：真实复现 -> 因果链假设 -> 证伪全量回滚 -> 根因修复 -> 全谱系回归
- refactor (无痛重构)：锁定既有逻辑不可否定 -> 建立变异测试 -> 结构简化 -> 保持行为不变
- migration (破坏性演进)：先迁移全部调用方 -> 双轨并行验证 -> 彻底废弃删除老接口
- performance (性能攻坚)：实测基线测量 -> 瓶颈火炬图剖析 -> 最小算法优化 -> 真实比对加速比

### 3.2 探查与认知类剧本 (Exploration Playbooks)
- how (链路探查)：梳理复杂调用链、数据进出流向与状态跃迁图
- why (历史意图)：检索 Git 演进记录与 PR 动机，揭示看似反常代码背后的真实业务妥协
- figure-it-out (黑盒攻坚)：面对未知第三方库或未公开协议，通过动态探针与最小原型攻坚
- teach (费曼输出)：将复杂的工程架构转化为低认知负荷的极简教学大纲

### 3.3 审计与质量类剧本 (Quality & Audit Playbooks)
- unslop (出厂代码去噪)：机械化扫描并清除 AI 废话注释、过度包装类与占位符
- interrogate (对抗红队审讯)：扮演敌对架构师，对 Diff 代码进行极限并发、边界与破坏性挑刺
- show-me-your-work (凭证审查)：严格查验真实执行日志、退出码 0 与测试覆盖率真实性

---

## 4. Multi-Agent 协同引擎 (Swarm & Arena Architecture)
### 4.1 Swarm 并行扇出聚合流 (Fan-Out & Aggregation)
- Phase 1 Frame：定义清晰的退出断言 (Done Predicate) 与物理文件作用域分区
- Phase 2 Fan-Out：并行派发多个轻量 Fresh Subagents，互不干扰独立施工
- Phase 3 Shielding：子 Agent 充当吸收盾，长日志在子环境沉淀，向主控汇报精炼事实
- Phase 4 Aggregate：主中枢收集 [Measured] 证据，进行去重、依赖拓扑合并与冲突裁决

### 4.2 Arena 多模型竞技对抗流 (Competitive Arena)
- 疑难架构分叉：面对高争议技术选型，启动方案 A (模型 A) 与方案 B (模型 B) 并行开发
- 独立盲测审讯：Auditor Agent 在无先验偏见的隔离环境中运行基准压测与对抗测试
- 客观量化决胜：以退出码、内存占用、吞吐量指标决定胜出分支，淘汰劣质方案

---

## 5. 模型分工与推理预算分层 (pstack-models)
### 5.1 角色与模型解耦 (Role-to-Model Mapping)
- 思考与审讯角色 (Reasoning Heavy)：分配给逻辑推理强模型，主导架构设计、红队挑刺与裁决
- 施工与填充角色 (Fast Codex)：分配给高速代码模型，在严格受限的单一函数内做精准代码填充

### 5.2 推理预算与死循环熔断 (Reasoning Budget & Circuit Breaker)
- 步骤与 Token 预算：为每个子任务设定硬性步数上限与 Token 消耗限额
- 连续失败撞墙熔断：同一问题排错连续失败 2 次，禁止第 3 次猜测尝试，强制触发外部检索或求助

---

## 6. 自我改进与系统性演进 (Compounding Self-Improvement)
### 6.1 根因深挖七步法 (Root Cause Investigation)
- 严禁局部创可贴空值防御 (No superficial guards)
- 严禁长篇大论注释为烂架构辩解 (No paragraph-long workarounds)
- 发现一处全仓搜索排查同类模式 (Check for systemic patterns)

### 6.2 错误下沉防线阶梯 (Defense Escalation Ladder)
- 人工纠错 2 次的问题：强制写成 ESLint 规则或 AST 编译器拦截
- 业务关键流程缺陷：沉淀为状态机显式建模（非法状态类型层不可表达）
- 历史踩坑全量入库：沉淀为永久 Verifiable Units（黄金回归测试套件），杜绝修新坏旧
