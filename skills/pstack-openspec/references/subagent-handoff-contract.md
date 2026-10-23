# Subagent 任务交接与隔离契约 (Subagent Handoff & Isolation Contract)

> **核心思想**：避免“多 Agent 协作中的断层与失忆（The Seam Problem）”。
> 主 Agent 向子 Agent（Subagent）分发任务时，**严禁使用口语化大白话下发**，必须封装为**带上下文封印、带边界约束、带验收退出码的标准任务胶囊（Task Capsule）**。

---

## 一、 多 Agent 协同的经典失败模式

1. **信息孤岛**：子 Agent 不清楚主会话中的架构约定与约束，擅自引入新的工具库或破坏封印代码；
2. **无限发散**：子 Agent 以为拥有全仓权限，顺手“重构”了不相关的模块；
3. **虚假完成**：子 Agent 汇报“已实现并测试”，但主 Agent 接收后发现测试实际上没跑或者跑崩了。

---

## 二、 标准任务交付胶囊 (Task Handoff Capsule)

主 Agent 调用 `invoke_subagent` 时，其 `Prompt` 必须严格包含以下 5 大核心要素：

```markdown
# 任务目标: [精确的单一职责描述，一句话概括]

## 1. 业务上下文与前置状态 (Context & State)
- 关联的 OpenSpec 变更目录: openspec/changes/<change-name>/
- 目标文件范围: [明确列出允许修改的文件路径，严禁碰其他文件]
- 既有承重墙: 读取并遵循 AGENTS.md / ARCHITECTURE.md 中的约束
- 源码级封印: 代码块中带有 @ANTIGRAVITY_INVARIANT_LOCK 的区域绝对只读

## 2. 详细规格要求 (Requirements & Specs)
- 输入参数规范与格式定义
- 核心流转逻辑与边界处理
- 非目标声明 (Non-Goals): 明确指出绝对不要做的事情

## 3. 行为准则与技术纪律 (Discipline)
- 严禁擅自否定原有的定制业务逻辑与回退分支
- 执行 /unslop 代码净化，删除口水注释与无意义防御套娃代码
- 保持周边代码现状 (Leave-as-is)，杜绝顺手优化

## 4. 强制验收命令 (Acceptance Commands)
- 编译/类型检查: npm run typecheck (必须返回退出码 0)
- 单测/端到端: npm test <target_test_file> (必须全绿通过)
- 语法静态分析: npm run lint (必须退出码 0)

## 5. 汇报回传契约 (Return Payload)
- 修改的文件清单 (File List)
- 真实执行命令与终端日志证据 (带 Measured 标签)
- 发现的问题与阻碍 (Blockers & Root Cause)
```

---

## 三、 子 Agent 隔离与成果验收工作流 (Subagent Acceptance Workflow)

```text
┌─────────────────┐
│  Primary Agent  │ (持有全局认知与 OpenSpec 规格)
└────────┬────────┘
         │ 1. 组装【标准任务交付胶囊】(目标 + 边界 + 封印 + 验证命令)
         ▼
┌─────────────────┐
│    Subagent     │ (物理分支 / 独立会话隔离执行)
│   (Execution)   │ 2. 单步施工 ➔ TDD 转绿 ➔ /unslop 净化 ➔ 真实测试
└────────┬────────┘
         │ 3. 回传成果报表 (真实退出码 0 + 证据日志 + 修改文件清单)
         ▼
┌─────────────────┐
│  Primary Agent  │ 4. 交叉审计 (Cross-Audit):
│ (Cross-Auditor) │    • 核对 git diff 是否越界出圈？
│                 │    • 在主会话亲自复测验收命令，杜绝欺瞒！
│                 │ 5. 验收通过 ➔ 打勾 tasks.md ➔ VS Code Diff 呈报用户
└─────────────────┘
```

---

## 四、 跨 Agent 状态通信纪律

1. **唯一事实来源（Single Source of Truth）**：
   子 Agent 之间的交接不得依赖口头传话，必须以 `openspec/changes/<change-name>/` 下的 `specs/` 和 `tasks.md` 为唯一法定状态机。
2. **不信任原则（Zero Trust Verification）**：
   主 Agent 在接收子 Agent 的“已完成”汇报后，**必须亲自在主会话中重新运行一遍验证命令**，确认真实退出码为 `0` 后方可向用户汇报。
