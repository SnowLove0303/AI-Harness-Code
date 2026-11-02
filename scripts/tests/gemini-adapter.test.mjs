import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { createHandoffCapsule } from '../pstack-handoff.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const routeMapPath = path.join(repoRoot, 'docs/pstack-openspec-route-map.json');
const geminiAdapterPath = path.join(repoRoot, 'orbitstack-gemini/SKILL.md');

test('all 23 playbooks and fallback have valid geminiCapability and geminiModelTier', () => {
  assert.ok(existsSync(routeMapPath), 'route map file must exist');
  const routeMap = JSON.parse(readFileSync(routeMapPath, 'utf8'));

  assert.equal(routeMap.routes.length, 23, 'must contain exactly 23 playbooks');
  const validTiers = new Set(['flash_lite', 'flash', 'pro']);

  for (const route of routeMap.routes) {
    assert.ok(route.geminiCapability && route.geminiCapability.trim().length > 0, `Route ${route.id} missing geminiCapability`);
    assert.ok(validTiers.has(route.geminiModelTier), `Route ${route.id} has invalid geminiModelTier: ${route.geminiModelTier}`);
  }

  assert.equal(routeMap.fallbackSkills.length, 1, 'must contain 1 fallback');
  const fallback = routeMap.fallbackSkills[0];
  assert.ok(fallback.geminiCapability && fallback.geminiCapability.trim().length > 0, 'Fallback missing geminiCapability');
  assert.equal(fallback.geminiModelTier, 'pro', 'Fallback figure-it-out must use pro tier');
});

test('gemini adapter enforces PStack-first rules, native subagents, and model tiers', () => {
  assert.ok(existsSync(geminiAdapterPath), 'Gemini adapter file must exist');
  const content = readFileSync(geminiAdapterPath, 'utf8');

  assert.match(content, /^name:\s*orbitstack-pstack-openspec/m, 'must declare correct skill name');
  assert.match(content, /PStack controls task execution/, 'must declare PStack task control');
  assert.match(content, /poteto-mode/, 'must route through poteto-mode');
  assert.match(content, /invoke_subagent/, 'must reference native invoke_subagent');
  assert.match(content, /flash_lite/, 'must reference flash_lite tier');
  assert.match(content, /brain/, 'must reference brain artifacts for context shielding');
  assert.match(content, /vscode-review/, 'must prioritize vscode-review MCP');
});

test('gemini adapter enforces Spec-Kit zero-loss ingestion and dual-gate workflow', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Spec-Kit zero-loss ingestion & dual-gate workflow/, 'must declare Spec-Kit dual-gate workflow');
  assert.match(content, /Requirement Traceability Matrix/, 'must reference RTM');
  assert.match(content, /Gate 1 \(Detailed Brief\)/, 'must define Gate 1');
  assert.match(content, /Gate 2 \(Plan & Dual-Checklist\)/, 'must define Gate 2');
  assert.match(content, /`?\[-\]`?\s*lock/, 'must enforce single-focus lock');
});


test('gemini adapter enforces strict lint and compiler zero-tolerance enforcement', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Strict Lint and compiler hard blocker/, 'must declare Strict Lint and compiler hard blocker');
  assert.match(content, /Hard Blocker/, 'must enforce hard blocker');
  assert.match(content, /Zero Warnings, Zero Errors/, 'must enforce zero warnings zero errors');
  assert.match(content, /--max-warnings=0/, 'must specify max-warnings=0');
  assert.match(content, /Anti-Suppression/, 'must enforce anti-suppression');
  assert.match(content, /@ts-ignore/, 'must forbid @ts-ignore');
  assert.match(content, /eslint-disable/, 'must forbid eslint-disable');
});

test('gemini adapter enforces verifier isolation, env-witness, and ground-truth anchoring', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Advanced defensive matrix/, 'must declare Advanced defensive matrix');
  assert.match(content, /Verifier Isolation & Anti-Patching/, 'must enforce verifier isolation');
  assert.match(content, /Explicit Missing States & Anti-Fabrication/, 'must enforce explicit missing states');
  assert.match(content, /Env-Authored Witness & Auto-Rollback/, 'must enforce env-authored witness');
  assert.match(content, /Ground-Truth Anchoring & 100% Fact Provenance/, 'must enforce ground truth anchoring');
  assert.match(content, /Axiom 17/, 'must cite Axiom 17');
  assert.match(content, /Axiom 18/, 'must cite Axiom 18');
  assert.match(content, /Axiom 19/, 'must cite Axiom 19');
  assert.match(content, /Axiom 20/, 'must cite Axiom 20');

  // Verify that GEMINI.md also reflects Axioms 17-20
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(globalRulesPath), 'GEMINI.md must exist');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /Verifier Isolation & Anti-Patching Axiom/, 'GEMINI.md must contain Axiom 17');
  assert.match(globalRules, /Explicit Missing States & Anti-Fabrication Axiom/, 'GEMINI.md must contain Axiom 18');
  assert.match(globalRules, /Env-Authored Witness & Auto-Rollback Axiom/, 'GEMINI.md must contain Axiom 19');
  assert.match(globalRules, /Ground-Truth Anchoring & 100% Fact Provenance Axiom/, 'GEMINI.md must contain Axiom 20');
});

test('gemini adapter enforces ps-openspec supreme priority and graph methodology governance', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /supreme governance framework/i, 'must declare ps-openspec as supreme governance framework');
  assert.match(content, /subordinate to Ps-openspec/i, 'must declare spec-kit as subordinate to ps-openspec');
  assert.match(content, /Execution methodology skills & Graph-driven governance/, 'must document methodology skills & graph governance');
  assert.match(content, /Action Skill Layer for Methodologies/, 'must specify action skill layer for methodologies');
  assert.match(content, /Graph-Driven Association & Rapid Discovery/, 'must specify graph-driven association');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /最高法定总纲/, 'GEMINI.md must declare ps-openspec as highest master governance');
  assert.match(globalRules, /附属思路与子模块/, 'GEMINI.md must declare spec-kit as subordinate');
  assert.match(globalRules, /基于 Graph 的方法论技能关联拓扑与布控治理网/, 'GEMINI.md must define Graph methodology governance');
  assert.match(globalRules, /Methodology Skills & Graph Governance Axiom/, 'GEMINI.md must contain Axiom 21');
});

test('gemini adapter enforces deep audit high-enforceability verification matrix', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /deep audit enforcement \(High-enforceability verification matrix\)/i, 'must document deep audit enforcement');
  assert.match(content, /Verifier Isolation & Anti-Tampering/, 'must enforce verifier isolation');
  assert.match(content, /VERIFIER_TAMPERING_DETECTED/, 'must trigger VERIFIER_TAMPERING_DETECTED on unapproved edits');
  assert.match(content, /Mutation Sanity & Anti-Trivial Assertions/, 'must enforce mutation sanity');
  assert.match(content, /Adversarial Red-Team Interrogation/, 'must enforce red-team subagent');
  assert.match(content, /Mandatory Negative Test Ratio/, 'must require at least 30% negative tests');
  assert.match(content, /100% Fact Provenance Checkoff/, 'must enforce 100% fact provenance checkoff');
  assert.match(content, /Human Tactile Gate via VS Code/, 'must enforce human tactile gate via VS Code');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /通用深度审计体系与六大高强制性防线/, 'GEMINI.md must contain Deep Audit section');
  assert.match(globalRules, /Universal Deep Audit & Anti-Fraud Axiom/, 'GEMINI.md must contain Axiom 22');
  assert.match(globalRules, /VERIFIER_TAMPERING_DETECTED/, 'GEMINI.md must declare tamper detection');
  assert.match(globalRules, /TRIVIAL_ASSERTION_FRAUD/, 'GEMINI.md must declare trivial assertion fraud blocker');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /通用深度审计六阶高强制性防御公理/, 'pstack-openspec must contain Axiom 24');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /通用深度审计六阶高强制性防御公理/, 'ai-harness-openspec must contain Invariant 19');
});

test('gemini adapter enforces agent-execution-first meta-problem framing and ps-openspec resolution', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Agent-execution-first meta-problem framing \(Ps-openspec resolution\)/, 'must document meta-problem framing');
  assert.match(content, /Abstract Beyond Isolated Cases/, 'must require abstracting beyond isolated cases');
  assert.match(content, /greedy local overfitting/, 'must identify greedy local overfitting');
  assert.match(content, /Direct Resolution via Ps-openspec Governance/, 'must require direct resolution via Ps-openspec');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /智能体执行层元归因与 Ps-openspec 体系化根治公理/, 'GEMINI.md must contain Axiom 23');
  assert.match(globalRules, /绝对领域中立与反个案具象化禁令/, 'GEMINI.md must enforce domain neutrality');
  assert.match(globalRules, /强制升维至 Agent 智能体执行与状态转移元失效模式/, 'GEMINI.md must mandate meta-framing');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be strictly domain-neutral and free of concrete case residues');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /智能体执行层元归因与 Ps-openspec 体系化根治公理/, 'pstack-openspec must contain Axiom 25');
  assert.match(pstackSkill, /绝对领域中立与反个案具象化禁令/, 'pstack-openspec must enforce domain neutrality');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be strictly domain-neutral and free of concrete case residues');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /智能体执行层元归因与 Ps-openspec 体系化根治公理/, 'ai-harness-openspec must contain Invariant 20');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be strictly domain-neutral');
});

test('gemini adapter enforces two-step dual-scope deep audit architecture', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Two-step dual-scope deep audit enforcement/, 'must document two-step dual-scope deep audit');
  assert.match(content, /Step 1: Mechanical Deterministic Audit/, 'must specify Step 1 mechanical audit');
  assert.match(content, /Step 2: Agent Cognitive & Specification Audit/, 'must specify Step 2 cognitive audit');
  assert.match(content, /Dual-Scope Specification Governance/, 'must specify dual-scope specification governance');
  assert.match(content, /Global Specs: Cross-cutting invariants/, 'must define global specs');
  assert.match(content, /Local Specs: Module-specific behavioral contracts/, 'must define local specs');
  assert.match(content, /SPEC_OMISSION_DETECTED/, 'must enforce zero-omission circuit breaker');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /两阶双轨通用深度审计体系/, 'GEMINI.md must contain Two-Step Dual-Scope section');
  assert.match(globalRules, /Two-Step Dual-Scope Deep Audit Axiom/, 'GEMINI.md must contain Axiom 24');
  assert.match(globalRules, /第一步：机械确定性审计/, 'GEMINI.md must declare Step 1 mechanical audit');
  assert.match(globalRules, /第二步：智能体语义规范审计/, 'GEMINI.md must declare Step 2 cognitive audit');
  assert.match(globalRules, /规范双轨治理网/, 'GEMINI.md must declare dual-scope specification governance');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /两阶双轨深度审计公理/, 'pstack-openspec must contain Axiom 26');
  assert.match(pstackSkill, /两阶双轨深度审计 \(Two-Step Dual-Scope Audit\)/, 'pstack-openspec L4 diagram must be updated');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /两阶双轨深度审计公理/, 'ai-harness-openspec must contain Invariant 21');
  assert.match(aiHarnessSkill, /Phase 4: 两阶双轨深度审计与经验永续/, 'ai-harness-openspec Phase 4 must be updated');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');
});

test('gemini adapter specifies OpenSpec Explore mode tooling and specification dependencies', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /OpenSpec Explore mode tooling/, 'must document Explore mode tooling');
  assert.match(content, /openspec context --json/, 'must use openspec context --json');
  assert.match(content, /openspec instructions/, 'must use openspec instructions');
  assert.match(content, /Specification dependencies:/, 'must declare specification dependencies');
});

test('living spec parses INV-GEMINI-ROUTE-MAPPING invariant correctly', () => {
  const specPath = path.join(repoRoot, 'openspec/specs/orbitstack-pstack-routing/spec.md');
  assert.ok(existsSync(specPath), 'routing spec must exist');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /Invariant ID:\*{0,2}\s*`INV-GEMINI-ROUTE-MAPPING`/, 'must contain Gemini route invariant');
  assert.match(specContent, /Scenario: Gemini OpenSpec Explore phase tooling/, 'must contain explore tooling scenario');
});

test('tier mapping aligns with task complexity and reasoning budget', () => {
  const routeMap = JSON.parse(readFileSync(routeMapPath, 'utf8'));
  const routesById = Object.fromEntries(routeMap.routes.map(r => [r.id, r]));

  // Low latency / exploration routes
  assert.equal(routesById['investigation'].geminiModelTier, 'flash_lite');
  assert.equal(routesById['runtime-forensics'].geminiModelTier, 'flash_lite');
  assert.equal(routesById['trace-forensics'].geminiModelTier, 'flash_lite');
  assert.equal(routesById['worktree-cleanup'].geminiModelTier, 'flash_lite');
  assert.equal(routesById['pause-safely'].geminiModelTier, 'flash_lite');

  // Daily coding / TDD / feature routes
  assert.equal(routesById['feature'].geminiModelTier, 'flash');
  assert.equal(routesById['bug-fix'].geminiModelTier, 'flash');
  assert.equal(routesById['refactoring'].geminiModelTier, 'flash');
  assert.equal(routesById['prototype'].geminiModelTier, 'flash');

  // Deep reasoning / judging / architecture routes
  assert.equal(routesById['eval'].geminiModelTier, 'pro');
  assert.equal(routesById['orchestrate'].geminiModelTier, 'pro');
  assert.equal(routesById['shipping'].geminiModelTier, 'pro');
  assert.equal(routesById['hillclimb'].geminiModelTier, 'pro');
});

test('handoff capsule creation incorporates Gemini route metadata deterministically', () => {
  const sampleRouteInfo = {
    pstackRoot: 'bundle/pstack-upstream',
    source: 'bundle/pstack-upstream/skills/poteto-mode/playbooks/feature.md',
    codex: 'isolated worktrees and background bash tasks',
    geminiCapability: 'native branch subagent and brain artifacts',
    geminiModelTier: 'flash',
    verify: 'tests pass and behavior matches design',
    supportingSkills: 'resolve-from-pinned-playbook-and-poteto-mode-triggers',
    taskSource: 'OpenSpec tasks.md',
  };

  const sampleMetadata = {
    taskId: '1.1',
    playbook: 'feature',
    playbookSteps: ['Plan before implementing', 'Write tests first', 'Verify in terminal'],
    supportingSkillPaths: ['skills/principle-prove-it-works/SKILL.md'],
    writePaths: ['docs/ps-openspec-gemini-system.md'],
    readOnlyPaths: ['bundle/pstack-upstream/**', 'orbitstack-gemini/**', 'docs/**'],
    instructionPaths: ['docs/ps-openspec-gemini-system.md'],
    invariantActions: [],
    priorVerified: ['pre-requisites checked'],
    nonGoals: ['no unneeded refactors'],
    acceptance: ['feature test green'],
  };

  const instructionFiles = [
    { path: 'docs/ps-openspec-gemini-system.md', sha256: 'a'.repeat(64) },
    { path: 'bundle/pstack-upstream/skills/poteto-mode/playbooks/feature.md', sha256: 'b'.repeat(64) },
    { path: 'bundle/pstack-upstream/skills/principle-prove-it-works/SKILL.md', sha256: 'c'.repeat(64) },
  ];

  const capsule = createHandoffCapsule({
    changeId: 'gemini-harness-adapter',
    taskId: '1.1',
    originalRequest: 'Implement native Gemini adapter',
    appendDirectives: ['Preserve PStack priority'],
    branch: 'release/ps-openspec-v2.00',
    baseCommit: 'd000000000000000000000000000000000000000',
    workingTreeStatus: '',
    workingTreeDigest: 'e'.repeat(64),
    routeInfo: sampleRouteInfo,
    instructionFiles,
    metadata: sampleMetadata,
  });

  assert.ok(capsule.capsuleDigest, 'capsule must have a cryptographic digest');
  assert.equal(capsule.execution.geminiCapability, 'native branch subagent and brain artifacts');
  assert.equal(capsule.execution.geminiModelTier, 'flash');
  assert.equal(capsule.execution.taskSource, 'OpenSpec tasks.md');
});

test('powershell installer deploys orbitstack-gemini adapter and writes GEMINI.md pointer', () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'gemini-installer-test-'));
  const installScript = path.join(repoRoot, 'scripts/install-to-harness.ps1');

  try {
    const result = spawnSync('powershell.exe', [
      '-NoProfile',
      '-ExecutionPolicy', 'Bypass',
      '-Command', `& '${installScript}' -SkillLocation gemini -TargetDir '${tempDir}'`
    ], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, `Installer failed: ${result.stderr || result.stdout}`);

    const installedAdapter = path.join(tempDir, '.gemini/skills/orbitstack-pstack-openspec/SKILL.md');
    assert.ok(existsSync(installedAdapter), 'orbitstack-gemini must be installed to .gemini/skills');

    const adapterContent = readFileSync(installedAdapter, 'utf8');
    assert.match(adapterContent, /invoke_subagent/, 'installed adapter must be orbitstack-gemini');

    const geminiRules = path.join(tempDir, 'GEMINI.md');
    assert.ok(existsSync(geminiRules), 'GEMINI.md rules pointer must be created');
    const rulesContent = readFileSync(geminiRules, 'utf8');
    assert.match(rulesContent, /\.gemini\/skills\/orbitstack-pstack-openspec\/SKILL\.md/, 'rules must point to gemini skill location');

    const pstackMirror = path.join(tempDir, '.orbitstack/pstack-upstream/skills/poteto-mode/SKILL.md');
    assert.ok(existsSync(pstackMirror), 'pstack upstream mirror must be present');
  } finally {
    try {
      rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore temp cleanup error
    }
  }
});
