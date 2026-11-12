import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const reaSkillPath = path.join(repoRoot, 'skills/rea-reverse-engineering/SKILL.md');
const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
const specPath = path.join(repoRoot, 'openspec/specs/orbitstack-pstack-routing/spec.md');
const globalSkillPath = 'C:/Users/Administrator/.gemini/config/skills/rea-reverse-engineering/SKILL.md';
const mcpConfigPath = 'C:/Users/Administrator/.gemini/config/mcp_config.json';

const readReaSkill = () => readFileSync(reaSkillPath, 'utf8');

// --- Group 1: Skill Existence & YAML Frontmatter (Tests 1 - 3) ---

test('1. skills/rea-reverse-engineering/SKILL.md exists and is non-empty', () => {
  assert.ok(existsSync(reaSkillPath), 'SKILL.md must exist in skills/rea-reverse-engineering/');
  const content = readReaSkill();
  assert.ok(content.length > 500, 'SKILL.md must be substantial and detailed');
});

test('2. Skill frontmatter contains valid name identifier', () => {
  const content = readReaSkill();
  assert.match(content, /^---\s*\nname:\s*rea-reverse-engineering/m, 'Must declare name: rea-reverse-engineering');
});

test('3. Skill frontmatter contains trigger keywords for reverse engineering', () => {
  const content = readReaSkill();
  assert.match(content, /触发词：.*rea.*逆向工程.*反编译.*反汇编.*apk逆向.*electron逆向.*asar解包/s, 'Must contain all primary Chinese & English triggers');
});

// --- Group 2: Section 1 Architecture & Tooling Overview (Tests 4 - 9) ---

test('4. Section 1 defines REA architecture & tooling layer overview', () => {
  const content = readReaSkill();
  assert.match(content, /## 🎯 一、 核心架构与工具手脚层全景/m, 'Must have Section 1 heading');
  assert.match(content, /AI 智能体 \/ Ps-openspec 编排/, 'Must illustrate Ps-openspec orchestrating REA');
});

test('5. Section 1 defines standard MCP Stdio pipeline integration (rea --mcp)', () => {
  const content = readReaSkill();
  assert.match(content, /标准 MCP Stdio 管道 \(rea --mcp\)/, 'Must specify rea --mcp stdio pipeline');
});

test('6. Section 1 specifies Native Binary analysis domain (PE/ELF/Mach-O)', () => {
  const content = readReaSkill();
  assert.match(content, /原生二进制分析/, 'Must specify native binary analysis');
  assert.match(content, /Native Binary/, 'Must specify Native Binary label');
  assert.match(content, /Ghidra \/ Rizin/, 'Must support Ghidra/Rizin');
});

test('7. Section 1 specifies JavaScript/Electron application recovery domain', () => {
  const content = readReaSkill();
  assert.match(content, /Electron 还原/, 'Must specify Electron recovery');
  assert.match(content, /ASAR \/ AST/, 'Must specify ASAR and AST');
});

test('8. Section 1 specifies Android APK static reverse engineering domain', () => {
  const content = readReaSkill();
  assert.match(content, /Android APK/, 'Must specify Android APK domain');
  assert.match(content, /Apktool/, 'Must specify Apktool');
});

test('9. Section 1 specifies Web & Traffic sniffing domain', () => {
  const content = readReaSkill();
  assert.match(content, /Web 资源与会话/, 'Must specify Web and session resources');
  assert.match(content, /HAR \/ CDP/, 'Must specify HAR and CDP');
});

// --- Group 3: MCP Tool Mapping Table (Tests 10 - 20) ---

test('10. MCP tool mapping table defines analyze tool', () => {
  const content = readReaSkill();
  assert.match(content, /`analyze`\s*\|\s*获取目标程序\/文件的宏观概览与架构指纹/, 'Must map analyze tool');
});

test('11. MCP tool mapping table defines decompile tool', () => {
  const content = readReaSkill();
  assert.match(content, /`decompile`\s*\|\s*将选定地址或函数反编译为高级伪代码/, 'Must map decompile tool');
});

test('12. MCP tool mapping table defines function tool', () => {
  const content = readReaSkill();
  assert.match(content, /`function`\s*\|\s*深度分析单个函数的输入输出、栈帧与局部变量/, 'Must map function tool');
});

test('13. MCP tool mapping table defines xrefs tool', () => {
  const content = readReaSkill();
  assert.match(content, /`xrefs`\s*\|\s*查找特定地址或字符串的有界交叉引用/, 'Must map xrefs tool');
});

test('14. MCP tool mapping table defines search tool', () => {
  const content = readReaSkill();
  assert.match(content, /`search`\s*\|\s*在反编译库中检索所有字符串或过程符号/, 'Must map search tool');
});

test('15. MCP tool mapping table defines trace tool', () => {
  const content = readReaSkill();
  assert.match(content, /`trace`\s*\|\s*跨引用追踪字面量特性与数据流传播路径/, 'Must map trace tool');
});

test('16. MCP tool mapping table defines analyze-javascript-application tool', () => {
  const content = readReaSkill();
  assert.match(content, /`analyze-javascript-application`\s*\|\s*静态重构本地 Electron 或 JS 打包应用/, 'Must map analyze-javascript-application tool');
});

test('17. MCP tool mapping table defines recover-javascript-sources tool', () => {
  const content = readReaSkill();
  assert.match(content, /`recover-javascript-sources`\s*\|\s*从打包\/混淆脚本中还原高可读性模块/, 'Must map recover-javascript-sources tool');
});

test('18. MCP tool mapping table defines decode-android-resources tool', () => {
  const content = readReaSkill();
  assert.match(content, /`decode-android-resources`\s*\|\s*解包 APK 的 AndroidManifest\.xml 与字符串资源/, 'Must map decode-android-resources tool');
});

test('19. MCP tool mapping table defines search-android-classes tool', () => {
  const content = readReaSkill();
  assert.match(content, /`search-android-classes`\s*\|\s*检索 APK 中所有已声明类与方法签名/, 'Must map search-android-classes tool');
});

test('20. MCP tool mapping table defines evidence-export tool', () => {
  const content = readReaSkill();
  assert.match(content, /`evidence-export`\s*\|\s*导出确定性、不可篡改的规范化 Evidence JSON/, 'Must map evidence-export tool');
});

// --- Group 4: Standard Operating Procedures (SOPs) (Tests 21 - 36) ---

test('21. Section 2 defines SOP-A for local native binary static reverse engineering', () => {
  const content = readReaSkill();
  assert.match(content, /### SOP-A：本地原生二进制 \(PE\/ELF\/Mach-O\) 静态逆向流程/, 'Must define SOP-A heading');
});

test('22. SOP-A Phase 1 specifies format fingerprint and imports analysis (analyze)', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 1：底座感知与格式指纹 \(`analyze`\)/, 'SOP-A Phase 1 must specify analyze');
});

test('23. SOP-A Phase 2 specifies sensitive anchor search & xrefs tracing', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 2：敏感锚点检索 \(`search` & `xrefs`\)/, 'SOP-A Phase 2 must specify search and xrefs');
});

test('24. SOP-A Phase 3 specifies targeted decompilation & pseudocode recovery', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 3：靶向反编译与控制流图恢复 \(`decompile` & `function`\)/, 'SOP-A Phase 3 must specify decompile and function');
});

test('25. SOP-A Phase 4 specifies deterministic evidence JSON export', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 4：实测凭据导出 \(`evidence-export`\)/, 'SOP-A Phase 4 must specify evidence-export');
});

test('26. Section 2 defines SOP-B for Electron & frontend packaged applications', () => {
  const content = readReaSkill();
  assert.match(content, /### SOP-B：Electron 客户端与前端打包应用逆向流程/, 'Must define SOP-B heading');
});

test('27. SOP-B Phase 1 specifies ASAR unpacking & dependency graph reconstruction', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 1：ASAR 资源穿透 \(`analyze-javascript-application`\)/, 'SOP-B Phase 1 must specify analyze-javascript-application');
});

test('28. SOP-B Phase 2 specifies AST de-obfuscation and source module recovery', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 2：源码还原与 AST 去混淆 \(`recover-javascript-sources`\)/, 'SOP-B Phase 2 must specify recover-javascript-sources');
});

test('29. SOP-B Phase 3 specifies IPC channel & native bridge analysis', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 3：IPC 通道与原生桥接逆向/, 'SOP-B Phase 3 must specify IPC bridge analysis');
});

test('30. Section 2 defines SOP-C for Android APK static reverse engineering', () => {
  const content = readReaSkill();
  assert.match(content, /### SOP-C：Android APK 静态逆向与资产提取流程/, 'Must define SOP-C heading');
});

test('31. SOP-C Phase 1 specifies manifest and resource string decoding', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 1：清单与资源解包 \(`decode-android-resources`\)/, 'SOP-C Phase 1 must specify decode-android-resources');
});

test('32. SOP-C Phase 2 specifies class/symbol search and obfuscation boundary detection', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 2：类与符号检索 \(`search-android-classes`\)/, 'SOP-C Phase 2 must specify search-android-classes');
});

test('33. SOP-C Phase 3 specifies call chain tracing & security boundary analysis', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 3：调用链追踪与安全边界分析 \(`trace-android-references`\)/, 'SOP-C Phase 3 must specify trace-android-references');
});

test('34. Section 2 defines SOP-D for API protocol sniffing and traffic recovery', () => {
  const content = readReaSkill();
  assert.match(content, /### SOP-D：API 协议嗅探与流量还原流程/, 'Must define SOP-D heading');
});

test('35. SOP-D Phase 1 specifies bundle analysis and network request contract extraction', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 1：页面与网络脚本嗅探 \(`analyze-web-bundle`\)/, 'SOP-D Phase 1 must specify analyze-web-bundle');
});

test('36. SOP-D Phase 2 specifies signature algorithm and salt parameter localization', () => {
  const content = readReaSkill();
  assert.match(content, /阶段 2：签名与加密算法定位/, 'SOP-D Phase 2 must specify signature localization');
});

// --- Group 5: Ps-openspec Gate Governance & Invariants (Tests 37 - 40) ---

test('37. Section 3 defines Ps-openspec Gate Governance integration', () => {
  const content = readReaSkill();
  assert.match(content, /## 🛡️ 三、 Ps-openspec 门禁治理咬合铁律/, 'Must define Section 3 heading');
});

test('38. Invariant 1 codifies Layer 4 Evidence-Backed Witness Axiom ([Measured] proofs)', () => {
  const content = readReaSkill();
  assert.match(content, /1\.\s*\*\*Layer 4 真实证据凭证公理 \(Evidence-Backed Witness Axiom\)\*\*/, 'Must codify Invariant 1');
  assert.match(content, /严禁脑补推演控制流/, 'Must forbid hallucinated control flow');
  assert.match(content, /\[Measured\] Evidence/, 'Must mandate [Measured] Evidence');
});

test('39. Invariant 2 codifies Minimal Blast Radius & Targeted Query boundaries', () => {
  const content = readReaSkill();
  assert.match(content, /2\.\s*\*\*最小因果集与最小爆炸半径 \(Minimal Blast Radius\)\*\*/, 'Must codify Invariant 2');
  assert.match(content, /禁止在大规模目标程序中全量递归反编译/, 'Must restrict unbounded recursion');
});

test('40. Invariant 3 codifies Targeted Hemostasis & Two-Step Decoupling', () => {
  const content = readReaSkill();
  assert.match(content, /3\.\s*\*\*靶向止血与两阶分离联动\*\*/, 'Must codify Invariant 3');
  assert.match(content, /出具退出码 0 的修复凭证后，再在 Phase 2 进行通用性规则沉淀/, 'Must mandate two-phase workflow');
});

// --- Group 6: Diagnostics, Environment & Indexing (Tests 41 - 49) ---

test('41. Section 4 defines environment health diagnostics via rea doctor', () => {
  const content = readReaSkill();
  assert.match(content, /## 🔧 四、 环境排错与健康诊断指南/, 'Must define Section 4 heading');
  assert.match(content, /rea doctor/, 'Must document rea doctor command');
});

test('42. Section 4 specifies Node 22+ requirement and MCP stdio configuration', () => {
  const content = readReaSkill();
  assert.match(content, /Node 22\+/, 'Must specify Node 22+ requirement');
  assert.match(content, /mcp_config\.json/, 'Must reference mcp_config.json');
});

test('43. Section 4 specifies external decompiler binding via GHIDRA_INSTALL_DIR', () => {
  const content = readReaSkill();
  assert.match(content, /GHIDRA_INSTALL_DIR/, 'Must document GHIDRA_INSTALL_DIR variable');
});

test('44. GEMINI.md Section 3.1 correctly indexes rea-reverse-engineering action skill', () => {
  assert.ok(existsSync(globalRulesPath), 'GEMINI.md must exist');
  const rules = readFileSync(globalRulesPath, 'utf8');
  assert.match(rules, /REA 逆向工程与闭源还原技能/, 'GEMINI.md must describe REA skill');
  assert.match(rules, /skills\/rea-reverse-engineering\/SKILL\.md/, 'GEMINI.md must link to REA skill path');
});

test('45. skills/pstack-openspec/SKILL.md Section 3.1 indexes rea-reverse-engineering', () => {
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstack = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstack, /REA 逆向工程与闭源还原技能/, 'pstack skill must describe REA skill');
  assert.match(pstack, /skills\/rea-reverse-engineering\/SKILL\.md/, 'pstack skill must link to REA skill path');
});

test('46. Global mcp_config.json registers rea server with --mcp argument', () => {
  assert.ok(existsSync(mcpConfigPath), 'mcp_config.json must exist');
  const mcpConfig = JSON.parse(readFileSync(mcpConfigPath, 'utf8'));
  assert.ok(mcpConfig.mcpServers?.rea, 'rea server must be declared in mcpServers');
  assert.ok(mcpConfig.mcpServers.rea.args?.includes('--mcp'), 'rea server args must include --mcp');
});

test('47. openspec/specs/orbitstack-pstack-routing/spec.md codifies REA requirements', () => {
  assert.ok(existsSync(specPath), 'spec.md must exist');
  const spec = readFileSync(specPath, 'utf8');
  assert.match(spec, /Requirement: REA Reverse Engineering MCP Server Integration/, 'spec must have REA MCP requirement');
  assert.match(spec, /Requirement: REA Action Skill Governance Standard/, 'spec must have REA Action Skill requirement');
  assert.match(spec, /Requirement: Action Skill Layer Constitutional Indexing for Reverse Engineering/, 'spec must have REA indexing requirement');
  assert.match(spec, /Requirement: Evidence-Backed Invariant Validation for Reverse Engineering/, 'spec must have REA evidence requirement');
});

test('48. Global config copy ~/.gemini/config/skills/rea-reverse-engineering/SKILL.md is synchronized', () => {
  assert.ok(existsSync(globalSkillPath), 'Global skill copy must exist');
  const repoContent = readReaSkill();
  const globalContent = readFileSync(globalSkillPath, 'utf8');
  assert.equal(globalContent, repoContent, 'Global skill copy must be byte-for-byte identical to repo copy');
});

test('49. REA CLI executable is accessible via PATH and rea --version exits with code 0', () => {
  const result = spawnSync('cmd.exe', ['/c', 'rea --version'], { encoding: 'utf8' });
  assert.equal(result.status, 0, `rea --version must exit with code 0: ${result.stderr}`);
  assert.match(result.stdout, /\d+\.\d+\.\d+/, 'rea --version must output semantic version');
});
