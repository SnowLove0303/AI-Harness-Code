# OpenSpec & Pstack 标准双清单门禁汇报模版
## Dual-List Human Gate Standard Template

依据工程法定纪律，在执行任何正式编码、重构或文件修改之前，Agent 必须生成标准【双清单】并向用户呈报，严格停等用户明确回复（如“执行”、“确认”、“同意”）后方可动工。

---

## 📋 双清单呈报规范格式

```markdown
## 🛑【规格立法与执行前双清单门禁 (Phase 2 Gate)】

当前任务已完成 Phase 1 探查探索，规格图纸已在 `openspec/changes/<change-name>/` 下就绪。在正式动工前，特向您呈报工程双清单：

---

### 一、 拟变更范围清单 (Proposed Scope)

| 序号 | 受影响文件路径 | 拟新增/修改的关键函数/逻辑 | 对应 tasks.md 任务条目 | 验证命令与客观凭证 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `src/api/auth.ts` | `verifyToken()` 增加时钟容差判定 | Task 1.1: 修复时钟抖动判定 | `npm test test/auth.test.ts` (真实退出码 0) |
| 2 | `test/auth.test.ts` | 增加过期边界单测 | Task 1.2: 补全红绿测试用例 | `npm test test/auth.test.ts` (真实退出码 0) |

- **改动性质**：[Bug修复 / 功能迭代 / 架构重构 / 性能优化]
- **涉及 Playbook**：[Pstack: Bug-Fix Loop / Feature Building / Refactor]
- **VS Code 检阅规划**：施工完毕后，将通过 `review_diff_in_vscode` 逐一提交双栏比对。

---

### 二、 保持现状承诺清单 (Preserved Functionality Commitments)

- [x] **绝对保留既有业务逻辑**：承诺绝不修改或删除既有业务逻辑与特殊回退分支（Functionality Preservation Axiom）；
- [x] **绝不触碰封印代码**：承诺扫描并豁免包含 `// @ANTIGRAVITY_INVARIANT_LOCK` 的代码块；
- [x] **恪守专属引擎唯一路由**：承诺绝不绕开专用流水线擅自编写外围脚本直接篡改受控业务文件；
- [x] **绝不破坏既有测试基线**：承诺本次改动后全量既有测试继续保持 100% 绿灯；
- [x] **严守最小因果集 (Leave-as-is)**：承诺绝不顺手修改与本次任务无关的文件或代码坏味道。

---

> ✋ **授权等待**：请审阅上述清单。确认无误请回复 **“执行”** 或 **“同意”**，我将立即进入 Phase 3 单步施工。
```
