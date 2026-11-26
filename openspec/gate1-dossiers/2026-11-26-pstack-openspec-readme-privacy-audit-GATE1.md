# Step 0 需求全量对账备忘录（门禁 1 / Gate 1）

- **任务代号**: `pstack-openspec-readme-privacy-audit`
- **立案时间**: `2026-11-26T10:05:30+08:00`
- **适用体系**: `OrbitStack (Pstack-openspec)` — Step 0 Spec-Kit 需求零损耗立案协议

## 1. 原始用户输入（100% 逐字留存 / Fact Fingerprint）
> 本仓库已正式改名 Pstack-openspec，隶属轨道工程的Agent执行策略层；围绕Pstack-openspec 的详细架构、思路、说明等改一下SnowLove0303/Pstack-openspec 的仓库readme，另外检查仓库是否有属于我个人的数据信息，防止token/cookie/个人信息等泄露

## 2. 1:1 需求物理对账矩阵 (RTM)

### REQ-01：仓库更名与 `Pstack-openspec` 定位对齐
- **场景故事**：仓库已正式更名为 `SnowLove0303/Pstack-openspec`，作为 OrbitStack（轨道工程体系）的 **Agent 执行策略层**，需要使本地仓库配置与对外标识与新名称及新定位保持一致。
- **详细功能契约**：
  - 将仓库的正式名称与定位统一为 **Pstack-openspec（OrbitStack 轨道工程体系 · Agent 执行策略层）**；
  - 对齐仓库远端地址至 `https://github.com/SnowLove0303/Pstack-openspec.git`。
- **独立验收指标**：
  - 仓库远端地址指向 `SnowLove0303/Pstack-openspec.git`，且入口文档中的仓库名称与定位表述准确一致。

### REQ-02：围绕 `Pstack-openspec` 架构与思路全面重构仓库 `README.md`
- **场景故事**：外部协作者、维护者及新接入的 Agent 需要通过仓库首页 `README.md` 全面理解 `Pstack-openspec` 作为“轨道工程 Agent 执行策略层”的设计哲学、核心架构、闭环工作流与能力清单。
- **详细功能契约**：
  - 围绕 `Pstack-openspec` 全面重写/升级仓库根目录 `README.md`，系统阐述：
    1. **核心定位与设计哲学**（OrbitStack 轨道工程中的执行策略层定位、`Pstack-first` + `OpenSpec` 唯一持久状态 + `AI-Harness` 工程承重墙）；
    2. **详细架构与闭环机制**（五层信任防御金字塔、Step 0–Step 5 双阶段双门禁 SOP、问题处理五维头脑风暴与四级防线升级路由、智能体防蔓延与复用锁、L2 自动化守卫矩阵）；
    3. **核心目录结构、10 大受管技能生态、15 项 `guard:*` 静态守卫矩阵**；
    4. **部署安装、全局同步与维护发布说明**。
- **独立验收指标**：
  - 新版 `README.md` 结构清晰、逻辑完整、准确反映 `Pstack-openspec` 全部最新架构与能力，且通过中立性、去冗余及可移植性等全部 L2 静态守卫检查（Exit Code 0）。

### REQ-03：全仓个人数据、Token / Cookie / 密钥与隐私安全排查及清理
- **场景故事**：仓库已托管在 GitHub 上，必须确保没有任何属于用户个人的敏感凭证或隐私数据被提交到仓库中，杜绝 Token、Cookie、密钥或个人主机路径泄露风险。
- **详细功能契约**：
  - 对仓库全部已跟踪文件执行全面扫描与人工复核，重点排查：
    1. **密钥与认证凭证**：API Key、Token、Cookie、OAuth 凭证、私钥、账号密码等；
    2. **个人隐私与主机耦合信息**：本地个人盘符路径、操作系统用户名路径、个人邮箱/手机号/私有会话标识等；
    3. **`.gitignore` 防护规则**：确认敏感文件类型均已被忽略。
  - 若发现任何个人数据、Token/Cookie 残留或非必要的个人主机路径硬编码，立即予以清理、脱敏或改为环境变量/占位符，并出具完整的审计排查报告。
- **独立验收指标**：
  - 出具覆盖全仓已跟踪文件的隐私与密钥排查结论；任何发现的敏感数据或个人路径泄露隐患均已清零修复，且复扫结果为 0 风险。

## 3. 前瞻性扩展提案清单（供确认）
- **提案 A（自动化 L2 密钥与个人隐私防泄露守卫）**：将本次隐私与密钥扫描规则固化为可重复执行的 L2 自动化守卫（遵循结构化固化原则），防止未来提交误带入 Token、Cookie 或个人绝对路径。
- **提案 B（`README.md` 架构拓扑图可视化）**：在 `README.md` 中嵌入 Mermaid 架构/双门禁闭环拓扑图，直观展示 OrbitStack 轨道工程与 `Pstack-openspec` 执行策略层的协同关系。
- **提案 C（随包文档中立性零退化保护）**：同步校验全部随包文档与根文档，确保 `guard:neutrality`、`guard:unslop` 与 `guard:portability` 零告警通过。
