# OrbitStack 通用深度审计法：双轴四阶红队审讯体系指南 (Universal Deep Audit Charter)

> **法定地位**：本宪章为 OrbitStack (Pstack-OpenSpec) 体系应对“AI 盲目执行、浅层虚假合格与治新复旧顽疾”的最高法定审计准则。深度融合了 **Lauren Tan (@poteto)** 的“实物真实验证 (Prove It Works)”与“红队多视角审讯 (/interrogate)”思想，以及工业级“事实守恒穿透对账”与“底层 AST 几何机检”工程实践。

---

## 核心哲学与痛点共识

### 1. 行业共识 (Lauren Tan)
> **“The bottleneck in AI coding isn't generating code; it is VERIFICATION.”（AI 编程的真正瓶颈从来不是‘生成代码’，而是‘验证与审计’。）**  
> **“Never accept proxy metrics. Prove it works on the real artifact.”（绝不接受代理指标，必须在真实产出物上证明其有效。）**

### 2. 传统审计三大死穴
1. **单维状态码欺骗 (Proxy Metric Fallacy)**：程序退出码为 0 或返回 200，只能证明程序没崩溃，无法证明业务事实未被黑盒吞噬；
2. **宏观视觉欺骗 (Superficial Rendering Bias)**：页面或文档表面生成了，但底层 AST、几何对齐、边框比例已经暗中错位塌陷；
3. **自审确认偏误 (Self-Auditing Fallacy)**：写代码的 Agent 既当运动员又当裁判员，倾向于在汇报中粉饰太平。

---

## 体系拓扑：双轴四阶红队审讯法 (Dual-Axis, 4-Stage Audit)

```text
┌────────────────────────────────────────────────────────────────────────┐
│               【通用深度审计法 (Universal Deep Audit) 架构】           │
├────────────────────────────────────────────────────────────────────────┤
│ 轴一：垂直穿透轴 (Vertical Penetration: 跨层防丢失)                    │
│   • 阶段 1: 输入契约冻结与实体指纹 (Input Invariance & Entity Freeze)    │
│   • 阶段 2: 实体穿透率机器对账 (Fact Penetration Reconciliation)       │
├────────────────────────────────────────────────────────────────────────┤
│ 轴二：水平防护轴 (Horizontal Boundaries: 跨版本防退化)                 │
│   • 阶段 3: 底层 AST / DOM 机器几何机检 (Structural AST Linting)       │
│   • 阶段 4: /interrogate 物理独立红队审讯 (Adversarial Multi-Model)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 一、阶段 1：输入契约冻结与实体指纹 (Input Invariance & Entity Freeze)

在任务动工前的只读阶段（Explore / Plan），必须对源输入进行独立的事实锁定：

1. **输入事实只读提取 (Read-Only Entity Extraction)**：
   - 任何输入（JSON 配置、数据源、业务模板、需求指令）进入业务管道前，必须先经由独立的、无副作用的只读解析器；
   - 提取出不可协商的**法定实体集合 $\mathcal{E}_{in}$**：
     - **业务规程与操作要点**（具体的安全措施、操作步骤、重试逻辑）；
     - **法定边界与阈值参数**（数值区间、浓度限值、合法跃迁条件）；
     - **特殊豁免与退回声明**（例外条款、降级兜底方案、特殊物理危害警示）。
2. **输入指纹冻结 (Entity Ledger Locking)**：
   - 提炼出的 $\mathcal{E}_{in}$ 固化至审计账本（如 `.audit/input_entities.json`）；
   - **宪法铁律**：后续任何业务代码无论如何重构、优化，**绝对无权改写该账本**，它是衡量最终交付物保真度的“最高尺子”。

---

## 二、阶段 2：实体穿透率机器对账 (Fact Penetration Reconciliation)

彻底终结“把源头内容静默截断、粗暴替换为无/默认值/TODO”的黑盒现象：

1. **自动化实体交叉对账机制**：
   - 交付物生成后，审计脚本穿透至产出物的底层文本树、DOM 或结构化数据；
   - 对冻结账本中的每一个实体 $e \in \mathcal{E}_{in}$ 执行双向存在性核验；
   - 计算**实体穿透率（Entity Penetration Rate）**：
     $$\text{Penetration Rate} = \frac{\text{产出物中被成功对账的实体数}}{|\mathcal{E}_{in}|} \times 100\%$$
2. **100% 穿透率一票否决门禁 (The 100% Penetration Gate)**：
   - **充要放行标准**：**穿透率必须恒等于 100%**；
   - 只要有任意一个关键事实、警示词或规程丢失，流水线立即阻断熔断；
   - 审计报告必须精确高亮：`[MISSING ENTITY]: 原文中第 X 条规程在交付物中蒸发，丢失率 1/N`。

---

## 三、阶段 3：底层 AST / DOM 机器几何机检 (Structural AST Linting)

在真实最终产出物上证明其有效，拒绝人眼宏观抽检：

1. **几何与语法不变量机检（Structural Invariant Linting）**：
   - 废除肉眼抽检，由审计脚本直接解析产出物（HTML / XML / AST / CSS Tree）；
   - **机器硬性遍历扫描**：
     - **对齐属性遍历**：所有数据值节点对齐属性必须严格等于规范（如 `w:jc="left"`），非规范对齐节点数 $N_{violation} \equiv 0$；
     - **缩进坐标遍历**：悬挂缩进坐标必须精确对齐规范数值（如 420/565 dxa），严禁任何破坏版面的未授权制表符；
     - **网格宽度守恒**：多列合并收敛时，跨列宽度与跨列标记必须守恒，悬空未清理的属性（如悬空 `vMerge`）必须为 0；
     - **字形字重分离**：标签加粗与正文常规体二元分离，严禁样式污染。
2. **零容忍退出码**：只要扫描到任何一个节点破坏了不变量，测试退出码强制设为 `1`。

---

## 四、阶段 4：`/interrogate` 物理独立红队审讯 (Adversarial Multi-Model)

彻底终结“既当运动员又当裁判员”的自欺欺人假绿灯：

1. **角色物理隔离与零信任交接**：
   - **施工 Agent（蓝队）**：只负责施工，交付候选解；
   - **主 Agent / 审讯 Agent（红队）**：完全独立，**恪守零信任原则，默认假设施工 Agent 存在偷懒、截断、发散修改与破坏旧逻辑的嫌疑**。
2. **红队审讯的三项对抗性拷问（The 3 Interrogation Inquiries）**：
   - **拷问 1（查事实吞噬）**：运行实体穿透脚本，核实源输入的所有苛刻条件在输出中是否 100% 存在；
   - **拷问 2（查因果越界）**：审查 `git diff`，核查改动是否收敛在最小因果集内；是否借机修改了周边未授权代码（严守 Leave-as-is）；
   - **拷问 3（查治新复旧）**：强制在全量黄金标本矩阵（Golden Corpus）上完整跑一遍，**必须亲眼看到全部历史标本真实退出码为 0**。
3. **证据分级法典 (Evidence Tiering Rubric)**：
   - **`实测 (Measured)`**：唯一有效的放行凭据（终端完整日志、AST 0 异常计数、穿透率 100% 凭证）；
   - **`推演 (Inferred)` / `猜想 (Guess)`**：严禁作为放行依据，出现即一票否决。

---

## 五、通用审计评分卡标准模板 (The Universal Audit Scorecard)

```text
================================================================================
                    【OrbitStack 工业级深度审计评分卡】
================================================================================
任务标识: [Task ID / Change Name]
审计时间: [ISO 8601 Timestamp]
执行法官: [Independent Audit Inspector]

1. [轴一/阶段2] 语义事实守恒审计 (Fact Penetration)
   • 核心事实条目数: 14 | 成功穿透数: 14 | 丢失条目: 0
   • 状态: [PASS] 穿透率 100.0% (Evidence: Measured via keyword tree)

2. [轴二/阶段3] 底层结构与 AST 几何审计 (Structural Geometry)
   • 对齐属性断言: 异常节点数 = 0 [PASS]
   • 缩进坐标断言: 100% 精确对齐 [PASS]
   • 制表位断言: 非法制表符 = 0 [PASS]
   • 字体字重分离: 非法加粗节点 = 0 [PASS]
   • 状态: [PASS] 几何零畸变 (Evidence: Measured via XML AST scan)

3. [轴二/阶段4] 因果边界与防退化全量回归 (Blast Radius & Regression)
   • 最小因果集: 0 越界修改文件 / 0 顺带格式化污染 [VERIFIED]
   • 黄金标本矩阵: N/N 全部绿灯通过 (Exit code: 0) [PASS]
   • 状态: [PASS] 全谱系回归无退化 (Evidence: Measured)

--------------------------------------------------------------------------------
综合终审判定: [PASSED] 具备工业级合规与法律事实完整性，准予放行交付。
================================================================================
```
