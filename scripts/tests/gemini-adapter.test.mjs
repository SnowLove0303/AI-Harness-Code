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

test('gemini adapter enforces execution friction journaling and defense escalation retro', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Execution friction journaling & defense escalation retro/, 'must document friction journaling & retro');
  assert.match(content, /In-Execution Friction Journaling/, 'must specify in-execution friction journaling');
  assert.match(content, /\[Incident: Friction\/Bug\]/, 'must record Incident tags');
  assert.match(content, /Mandatory Post-Task Retro Dossier/, 'must require post-task retro dossier');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /执行摩擦动态存证与防线下沉复盘公理/, 'GEMINI.md must contain Axiom 25');
  assert.match(globalRules, /施工期摩擦不可篡改动态存证/, 'GEMINI.md must mandate friction journaling');
  assert.match(globalRules, /交付期终审强制挂载复盘提案/, 'GEMINI.md must mandate retro dossier');
  assert.match(globalRules, /四阶防御下沉闭环推进/, 'GEMINI.md must mandate 4-layer escalation');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /执行摩擦动态存证与防线下沉复盘公理/, 'pstack-openspec must contain Axiom 27');
  assert.match(pstackSkill, /施工期摩擦动态存证/, 'pstack-openspec Step 3 must require incident logging');
  assert.match(pstackSkill, /终审强制挂载复盘提案/, 'pstack-openspec Step 5 must require retro dossier');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /执行摩擦动态存证与防线下沉复盘公理/, 'ai-harness-openspec must contain Invariant 22');
  assert.match(aiHarnessSkill, /施工期摩擦动态存证/, 'ai-harness-openspec Phase 3 must require incident logging');
  assert.match(aiHarnessSkill, /终审强制挂载复盘提案/, 'ai-harness-openspec Phase 4 must require retro dossier');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');
});

test('gemini adapter enforces state legitimacy and anti-symptom-masking', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /State legitimacy & anti-symptom-masking/, 'must document state legitimacy & anti-symptom-masking');
  assert.match(content, /State Legitimacy Dichotomy/, 'must specify State Legitimacy Dichotomy');
  assert.match(content, /Five Forbidden Masking Anti-Patterns/, 'must specify Five Forbidden Masking Anti-Patterns');
  assert.match(content, /Parse, don't validate/, 'must specify boundary parsing');
  assert.match(content, /Fail-Fast & Non-Masking/, 'must specify fail-fast');
  assert.match(content, /SINK_PATCHING_BLOCKED/, 'must enforce Gate 2 causal role self-proof');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /状态合法性因果溯源与反症状修补公理/, 'GEMINI.md must contain Axiom 26');
  assert.match(globalRules, /State Legitimacy & Anti-Symptom-Masking Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /状态合法性二分判定公理/, 'GEMINI.md must declare dichotomy');
  assert.match(globalRules, /五大受限症状掩盖反模式绝对禁令/, 'GEMINI.md must declare forbidden anti-patterns');
  assert.match(globalRules, /SINK_PATCHING_BLOCKED/, 'GEMINI.md must enforce Gate 2 SINK_PATCHING_BLOCKED');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /状态合法性因果溯源与反症状修补公理/, 'pstack-openspec must contain Axiom 28');
  assert.match(pstackSkill, /逆向数据流穿透与状态合法性二分判定/, 'pstack-openspec Step 1 must require reverse dataflow traversal');
  assert.match(pstackSkill, /SINK_PATCHING_BLOCKED/, 'pstack-openspec Step 2 must require causal role self-proof');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /状态合法性因果溯源与反症状修补公理/, 'ai-harness-openspec must contain Invariant 23');
  assert.match(aiHarnessSkill, /逆向数据流穿透与状态合法性二分判定/, 'ai-harness-openspec Phase 1 must require reverse dataflow traversal');
  assert.match(aiHarnessSkill, /SINK_PATCHING_BLOCKED/, 'ai-harness-openspec Phase 2 must require causal role self-proof');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /14. State Legitimacy & Anti-Symptom-Masking Engine/, 'docs must document Section 14');
  assert.match(docsContent, /SINK_PATCHING_BLOCKED/, 'docs must document SINK_PATCHING_BLOCKED');
});

test('gemini adapter enforces generic asset anti-tampering and mechanism-policy separation', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Generic asset anti-tampering & mechanism-policy separation/, 'must document generic asset anti-tampering');
  assert.match(content, /Mechanism vs. Policy Physical Separation/, 'must specify mechanism vs policy');
  assert.match(content, /Caller-Side Adaptation First/, 'must specify caller adaptation first');
  assert.match(content, /Four Laws of General Evolution/, 'must specify four laws of general evolution');
  assert.match(content, /TASK_SPECIFIC_POLLUTION_BLOCKED/, 'must enforce Gate 2 TASK_SPECIFIC_POLLUTION_BLOCKED');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /通用程序防篡改与机制策略物理隔离公理/, 'GEMINI.md must contain Axiom 27');
  assert.match(globalRules, /Generic Asset Anti-Tampering & Mechanism-Policy Separation Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /调用端适配优先/, 'GEMINI.md must mandate caller adaptation first');
  assert.match(globalRules, /通用演进四严律/, 'GEMINI.md must mandate four laws of evolution');
  assert.match(globalRules, /TASK_SPECIFIC_POLLUTION_BLOCKED/, 'GEMINI.md must enforce Gate 2 TASK_SPECIFIC_POLLUTION_BLOCKED');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /通用程序防篡改与机制策略物理隔离公理/, 'pstack-openspec must contain Axiom 29');
  assert.match(pstackSkill, /通用底层机制与业务策略边界隔离/, 'pstack-openspec Step 1 must require mechanism-policy boundary perception');
  assert.match(pstackSkill, /TASK_SPECIFIC_POLLUTION_BLOCKED/, 'pstack-openspec Step 2 must require generality self-proof');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /通用程序防篡改与机制策略物理隔离公理/, 'ai-harness-openspec must contain Invariant 24');
  assert.match(aiHarnessSkill, /通用底层机制与业务策略边界隔离/, 'ai-harness-openspec Phase 1 must require mechanism-policy boundary perception');
  assert.match(aiHarnessSkill, /TASK_SPECIFIC_POLLUTION_BLOCKED/, 'ai-harness-openspec Phase 2 must require generality self-proof');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /15. Generic Asset Anti-Tampering & Mechanism-Policy Separation Engine/, 'docs must document Section 15');
  assert.match(docsContent, /TASK_SPECIFIC_POLLUTION_BLOCKED/, 'docs must document TASK_SPECIFIC_POLLUTION_BLOCKED');
});

test('gemini adapter enforces mandatory user-specification ingestion and active post-task agent audit', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Mandatory user-specification ingestion & active post-task agent audit/, 'must document user-specification ingestion');
  assert.match(content, /Full-Text User Standards Ingestion/, 'must specify full-text ingestion');
  assert.match(content, /Two-Step Audit with Active Bug Hunting/, 'must specify active bug hunting');
  assert.match(content, /Universal Cross-Agent Propagation/, 'must specify universal cross-agent propagation');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /用户规范全量通读与任务后主动认知审计公理/, 'GEMINI.md must contain Axiom 28');
  assert.match(globalRules, /Mandatory User-Specification Ingestion & Active Post-Task Agent Audit Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /用户规范与方案全量通读公理/, 'GEMINI.md must declare full ingestion axiom');
  assert.match(globalRules, /双阶结合与主动找茬公理/, 'GEMINI.md must declare active bug hunting axiom');
  assert.match(globalRules, /主动挑刺寻找漏洞与未覆盖边界/, 'GEMINI.md Step 5 must mandate active hunting');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /用户规范全量通读与任务后主动认知审计公理/, 'pstack-openspec must contain Axiom 30');
  assert.match(pstackSkill, /用户正确做法与审计方案全量通读/, 'pstack-openspec Step 0 must require full ingestion');
  assert.match(pstackSkill, /任务结束后强制 Agent 主动认知审计/, 'pstack-openspec Step 5 must require active audit');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /用户规范全量通读与任务后主动认知审计公理/, 'ai-harness-openspec must contain Invariant 25');
  assert.match(aiHarnessSkill, /用户规范与方案全量通读/, 'ai-harness-openspec Step 0 must require full ingestion');
  assert.match(aiHarnessSkill, /裁执物理隔离与主动找茬/, 'ai-harness-openspec Phase 4 must require active bug hunting');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /16. Mandatory User-Specification Ingestion & Active Agent Audit Engine/, 'docs must document Section 16');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /强制前置全量通读与任务后主动找茬铁律/, 'audit spec must document Section 6');
});

test('gemini adapter enforces mutation anti-fraud and negative proof deep audit gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Mutation anti-fraud & negative proof deep audit gate/, 'must document mutation anti-fraud gate');
  assert.match(content, /TRIVIAL_ASSERTION_FRAUD/, 'must document TRIVIAL_ASSERTION_FRAUD');
  assert.match(content, /Negative Proof Gate & Mandatory Adversarial Quota/, 'must document negative proof gate');
  assert.match(content, /Fresh Pro Auditor Enforcement/, 'must document fresh pro auditor enforcement');
  assert.match(content, /Two-Strike Machine Escalation/, 'must document two-strike escalation');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /变异反欺诈与逆向举证深度审计硬门禁公理/, 'GEMINI.md must contain Axiom 29');
  assert.match(globalRules, /Mutation Anti-Fraud & Negative Proof Deep Audit Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /TRIVIAL_ASSERTION_FRAUD/, 'GEMINI.md must specify TRIVIAL_ASSERTION_FRAUD');
  assert.match(globalRules, /ZERO_FINDING_SUSPICION/, 'GEMINI.md Step 5 must specify ZERO_FINDING_SUSPICION');
  assert.match(globalRules, /Two-Strike Machine Escalation/, 'GEMINI.md must specify Two-Strike Escalation');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /变异反欺诈与逆向举证深度审计硬门禁公理/, 'pstack-openspec must contain Axiom 31');
  assert.match(pstackSkill, /变异反欺诈验证前置/, 'pstack-openspec Step 3 must require mutation verification');
  assert.match(pstackSkill, /TRIVIAL_ASSERTION_FRAUD/, 'pstack-openspec must specify TRIVIAL_ASSERTION_FRAUD');
  assert.match(pstackSkill, /ZERO_FINDING_SUSPICION/, 'pstack-openspec Step 5 must specify ZERO_FINDING_SUSPICION');
  assert.match(pstackSkill, /Two-Strike Machine Escalation/, 'pstack-openspec must specify Two-Strike Escalation');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /变异反欺诈与逆向举证深度审计硬门禁公理/, 'ai-harness-openspec must contain Invariant 26');
  assert.match(aiHarnessSkill, /变异反欺诈验证前置/, 'ai-harness-openspec Phase 3 must require mutation verification');
  assert.match(aiHarnessSkill, /TRIVIAL_ASSERTION_FRAUD/, 'ai-harness-openspec must specify TRIVIAL_ASSERTION_FRAUD');
  assert.match(aiHarnessSkill, /ZERO_FINDING_SUSPICION/, 'ai-harness-openspec Phase 4 must specify ZERO_FINDING_SUSPICION');
  assert.match(aiHarnessSkill, /Two-Strike Machine Escalation/, 'ai-harness-openspec must specify Two-Strike Escalation');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /17. Mutation Anti-Fraud & Negative Proof Deep Audit Engine/, 'docs must document Section 17');
  assert.match(docsContent, /TRIVIAL_ASSERTION_FRAUD/, 'docs must document TRIVIAL_ASSERTION_FRAUD');
  assert.match(docsContent, /Negative Proof Gate & Mandatory Adversarial Quota/, 'docs must document Negative Proof Gate');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /七、 变异反欺诈与逆向举证硬门禁机制/, 'audit spec must document Section 7');
  assert.match(specContent, /TRIVIAL_ASSERTION_FRAUD/, 'audit spec must document TRIVIAL_ASSERTION_FRAUD');
  assert.match(specContent, /ZERO_FINDING_SUSPICION/, 'audit spec must document ZERO_FINDING_SUSPICION');
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
