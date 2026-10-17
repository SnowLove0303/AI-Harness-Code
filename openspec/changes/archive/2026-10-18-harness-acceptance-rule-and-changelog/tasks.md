# Tasks

## 1. 载体与完整性（已完成）

- [x] 1.1 建立 `AI-Harness-Code` 仓库的 monorepo 骨架，把包纳入 `packages/ai-harness/`；验证：bootstrap 提交 `631fe85` 存在且已推送 `main`
- [x] 1.2 逐字节核对包内容与官方发布物一致；验证：官方 tarball（`npm pack @hujiale2609/ai-harness@1.2.2`）**82 个文件全部在仓库内**，字节差异仅 `package.json`（有意改造）
- [x] 1.3 改造包 `package.json` 为补丁层形态（devDeps 仅 changesets、release 去 build、files 增加 CHANGELOG.md 与 README.md、补 repository）；验证：`pnpm install` 成功、版本应用正常
- [x] 1.4 确认通用性：对包目录扫描 MSDS / 产品 / 本机专属字样；验证：**零命中**

## 2. 模板纪律固化

- [x] 2.1 在 `Operating Invariants` 章节占位符之外加入通用操作纪律（规格落点先行、只读任务同样受规格约束、规格高于代码、差分作用域验证、最小因果集与保留现状、根因闭环与真实契约验证、符号事实锚定、变更可追溯与原子化、人工验收归口）；验证：块位于第 50 行，且在占位符之外
- [x] 2.2 在 `Task Routing` 章节占位符之外加入「功能验收与 UI 界面调整」路由；验证：块位于第 100 行，且在占位符之外
- [x] 2.3 在 `Completion Criteria` 章节占位符之外加入「人工验收闭环」；验证：块位于第 162 行，且在占位符之外
- [x] 2.4 在 `Ask for Human Judgment When` 章节占位符之外加入「UI 界面调整或功能验收的最终判定」；验证：块位于第 197 行，且在占位符之外
- [x] 2.5 专有名词净化；验证：`MSDS` / `冠志` / `dsh-global` / `DSH_HOME` / `C:\Users` / `F:\` / `覆写` / `PEA-` / `PU-30` 关键词扫描**零命中**
- [x] 2.6 中文编码保真；验证：`人工验收归口`、`规格落点先行`、`符号事实锚定`、`变更可追溯与原子化`、`人工验收闭环` 五个关键字均可在改动后的模板中正确读出

## 3. 模板可用性验证

- [x] 3.1 模拟作者填写：删除全部 `harness:placeholder` 块，并给 `Project` / `Commands` 两节补最小项目内容；验证：占位符剩余 0、六个 H2 章节保留
- [x] 3.2 对模拟文档执行校验，断言 `valid: true`；验证：`ai-harness validate --json` 返回 `"valid": true`、`errors` 为 0，且新增内容的四节均通过 `non-empty` 判定
- [x] 3.3 记录强制边界（负向验证）：模板是唯一强制手段（未配置 `rules.required_patterns`），删除「人工验收归口」整条后校验**仍然通过**；验证：实测 `valid=true`，该结果作为 design「仅靠模板、无硬门禁」风险项的证据

## 4. 变更记录与打包

- [x] 4.1 新建 `.changeset/harness-acceptance-rule.md`（`@hujiale2609/ai-harness: minor`）并写明对使用者的影响；验证：Changesets v3.0.3 成功应用该记录
- [x] 4.2 应用版本：`pnpm install` → `pnpm version-packages`；验证：包版本 `1.2.2 → 1.3.0`，`packages/ai-harness/CHANGELOG.md` 生成且含 `1.3.0` 条目，`.changeset/*.md` 已被消费
- [x] 4.3 打包并断言 `CHANGELOG.md` 随包分发；验证：`hujiale2609-ai-harness-1.3.0.tgz` 共 **84 个文件 = 官方 82 + CHANGELOG.md + README.md**，缺失 0，模板新纪律已包含在内
- [x] 4.4 提交并推送：提交信息与 change 名称对应，仅含本次相关改动；验证：`git push` 成功且工作区干净

## 5. 收尾

- [x] 5.1 维护 README 记录本次变更与版本策略；验证：README 含变更记录章节并指向 `CHANGELOG.md`
- [x] 5.2 归档本 change 并同步主规格；验证：`openspec archive harness-acceptance-rule-and-changelog -y` 成功且 `openspec validate` 通过
