# @hujiale2609/ai-harness

## 1.3.1

### Patch Changes

- 随包分发的文档改为使用者视角并清除主机耦合信息
  
  - `README.md` 重写为面向使用者的说明：包的能力、四份受管文档、命令、校验模型、模板内置纪律与安装方式
  - 移除随包文档中的宿主配置路径、会话状态与仓库维护细节；维护与分发说明归位到仓库根文档
  - 包内模板 / Schema / 技能内容未变，与 1.3.0 逐字节一致
  - 新增随包文档中立性静态守卫 `scripts/check-packaged-docs-neutrality.mjs`

## 1.3.0

### Minor Changes

- AGENTS.md 模板内置通用执行纪律（位于占位符之外，作者填写后仍保留）
  
  - Operating Invariants 新增：规格落点先行、只读任务同样受规格约束、规格高于代码、差分作用域验证、最小因果集与保留现状、根因闭环与真实契约验证、符号事实锚定、变更可追溯与原子化、人工验收归口
  - Task Routing 新增：功能验收与 UI 界面调整，以人工判定结论为权威来源
  - Completion Criteria 新增：人工验收闭环，人工结论到达前该项保持未勾选
  - Ask for Human Judgment When 新增：涉及 UI 界面调整或功能验收的最终判定
  - 内容不含任何机器、项目或产品专有信息
