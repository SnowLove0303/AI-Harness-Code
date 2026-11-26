# Step 2 规格立法与双清单施工图纸（门禁 2 / Gate 2）

- **OpenSpec 变更代号**: `pstack-openspec-readme-privacy-audit`
- **对应门禁 1**: `openspec/gate1-dossiers/2026-11-26-pstack-openspec-readme-privacy-audit-GATE1.md`

## 1. 隐私摸底排查结论（Step 1 实测）
- 已对仓库 **1,061 个已跟踪文件**执行密钥/Token/Cookie/私钥扫描：**0 处真实密钥或 Cookie 泄露**（`tavily_runner.py` 与 `xmind_cloud_client.js` 均在运行时读取用户主目录 `~/.gemini/config/credentials/`）。
- 发现两项需加固项：① `.gitignore` 缺少 `.env*` / `*credentials*` / `*token*.json` / `*cookie*` / `*.pem` / `*.key` 忽略规则；② `skills/tavily-search/SKILL.md` 与 `skills/xmind-cloud-mcp/SKILL.md` 存在 `C:\Users\Administrator` 个人用户名路径字面量，需脱敏为 `~/.gemini/...`。

## 2. 法定双清单

### 2.1 拟变范围清单 (Proposed Mutation Scope)
1. `[Git Config]` 本地 `origin` 远端地址更新为 `https://github.com/SnowLove0303/Pstack-openspec.git`。
2. `[Security / Privacy]` `.gitignore`（增补敏感凭证忽略规则）、`skills/tavily-search/SKILL.md`、`skills/xmind-cloud-mcp/SKILL.md`（个人用户名路径脱敏）。
3. `[L2 Guard & Graph]` `scripts/check-secret-privacy.mjs`（新增 `npm run guard:privacy`）、`package.json`、`.harness/project-graph.json`、`tests/secret-privacy-guard.test.mjs`。
4. `[Entry Docs]` `README.md` — 围绕 `Pstack-openspec`（OrbitStack 轨道工程 · Agent 执行策略层）全面重写架构、理念、Mermaid 拓扑、技能生态与 L2 守卫矩阵。

### 2.2 保持现状承诺清单 (Unchanged Invariants Commitment)
- 绝不修改 `packages/ai-harness/` 随包分发产物与文档；
- 绝不修改 `C:\Users\Administrator\.gemini\pstack-upstream\` 只读上游镜像；
- 绝不改写历史已归档 `openspec/changes/archive/` 记录。
