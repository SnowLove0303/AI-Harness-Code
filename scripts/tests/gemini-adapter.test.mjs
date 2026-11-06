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
  assert.match(content, /Gate 1 \((Requirement Confirmation|Detailed Brief)/, 'must define Gate 1');
  assert.match(content, /Gate 2 \((OpenSpec Specification & Dual-Checklist|Plan & Dual-Checklist)/, 'must define Gate 2');
  assert.match(content, /`?\[-\]`?\s*lock/, 'must enforce single-focus lock');

  // Verify GEMINI.md dual gate statutory definitions
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /门禁 1：需求全量确认门禁/, 'GEMINI.md must define Gate 1 statutory name');
  assert.match(globalRules, /门禁 1 绝对物理绝缘禁令/, 'GEMINI.md must enforce Gate 1 insulation');
  assert.match(globalRules, /门禁 2：Ps-openspec 规格立法门禁/, 'GEMINI.md must define Gate 2 statutory name');
  assert.match(globalRules, /门禁 2 核心法定宗旨/, 'GEMINI.md must define Gate 2 statutory purpose');
  assert.match(globalRules, /门禁 2 施工硬阻断禁令/, 'GEMINI.md must enforce Gate 2 construction block');
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

test('gemini adapter enforces autonomous subagent swarm and four-in-one handoff gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Autonomous subagent swarm & four-in-one handoff gate/, 'must document autonomous subagent swarm gate');
  assert.match(content, /Auto-Dispatch by Default & Coordinator Bar/, 'must specify auto-dispatch by default');
  assert.match(content, /Subagent Reuse vs\. Fresh Decision Tree/, 'must specify reuse vs fresh decision tree');
  assert.match(content, /manage_subagents/, 'must specify manage_subagents inspection');
  assert.match(content, /Four-in-One Lossless Handoff Capsule/, 'must specify four-in-one capsule');
  assert.match(content, /Active Completion Report & Reactive Wakeup/, 'must specify active completion report');
  assert.match(content, /Verifier-Only Merge Authority & Workspace Sandboxing/, 'must specify verifier-only merge authority');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /智能体自动编组与四位一体任务交接公理/, 'GEMINI.md must contain Axiom 30');
  assert.match(globalRules, /Autonomous Subagent Swarm & Four-in-One Handoff Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /manage_subagents/, 'GEMINI.md must specify manage_subagents inspection');
  assert.match(globalRules, /四位一体任务交接胶囊/, 'GEMINI.md must specify four-in-one capsule');
  assert.match(globalRules, /裁执物理隔离与系统改动权限封锁公理/, 'GEMINI.md must specify verifier-only merge authority');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /智能体自动编组与四位一体任务交接公理/, 'pstack-openspec must contain Axiom 32');
  assert.match(pstackSkill, /manage_subagents/, 'pstack-openspec must specify manage_subagents inspection');
  assert.match(pstackSkill, /四位一体任务交接胶囊/, 'pstack-openspec must specify four-in-one capsule');
  assert.match(pstackSkill, /裁执物理隔离与合流权归属/, 'pstack-openspec must specify verifier-only merge authority');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /智能体自动编组与四位一体任务交接公理/, 'ai-harness-openspec must contain Invariant 27');
  assert.match(aiHarnessSkill, /manage_subagents/, 'ai-harness-openspec must specify manage_subagents inspection');
  assert.match(aiHarnessSkill, /四位一体任务交接胶囊/, 'ai-harness-openspec must specify four-in-one capsule');
  assert.match(aiHarnessSkill, /裁执物理隔离与合流权归属/, 'ai-harness-openspec must specify verifier-only merge authority');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /18\. Autonomous Subagent Swarm & Four-in-One Handoff Engine/, 'docs must document Section 18');
  assert.match(docsContent, /Verifier-Only Merge Authority & Workspace Sandboxing/, 'docs must document Verifier-Only Merge Authority');

  // Verify references/subagent-handoff-contract.md
  const contractPath = path.join(repoRoot, 'skills/pstack-openspec/references/subagent-handoff-contract.md');
  const contractContent = readFileSync(contractPath, 'utf8');
  assert.match(contractContent, /四位一体无损任务交接胶囊标准规范/, 'contract must document four-in-one capsule');
  assert.match(contractContent, /manage_subagents/, 'contract must specify manage_subagents');
  assert.match(contractContent, /Verifier-Only Merge Authority/, 'contract must specify verifier-only merge authority');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /八、 智能体自动编组、四位一体任务交接胶囊与裁执物理隔离体系/, 'audit spec must document Section 8');
  assert.match(specContent, /manage_subagents/, 'audit spec must specify manage_subagents');
});

test('gemini adapter enforces universal engineering anti-phantom and structural fidelity gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Universal engineering anti-phantom & structural fidelity gate/, 'must document universal engineering gate');
  assert.match(content, /Zero-Unverified-Effect/, 'must specify zero unverified effect');
  assert.match(content, /SILENT_NO_OP_FRAUD/, 'must specify SILENT_NO_OP_FRAUD');
  assert.match(content, /Clean Construction & Zero-Boundary-Leakage/, 'must specify clean construction');
  assert.match(content, /Single-Pipeline Invariance & Zero-Variance Assembly/, 'must specify single pipeline invariance');
  assert.match(content, /Source Topology Invariance & Anti-Speculative-Synthesis/, 'must specify source topology invariance');
  assert.match(content, /EMPTY_MANDATORY_SLOT_BLOCKED/, 'must specify EMPTY_MANDATORY_SLOT_BLOCKED');
  assert.match(content, /Terminal Leaf-Node Deterministic Audit/, 'must specify terminal leaf-node audit');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /通用工程防伪执行与拓扑零退化公理/, 'GEMINI.md must contain Axiom 31');
  assert.match(globalRules, /Universal Engineering Anti-Phantom & Structural Fidelity Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /SILENT_NO_OP_FRAUD/, 'GEMINI.md must specify SILENT_NO_OP_FRAUD');
  assert.match(globalRules, /EMPTY_MANDATORY_SLOT_BLOCKED/, 'GEMINI.md must specify EMPTY_MANDATORY_SLOT_BLOCKED');
  assert.match(globalRules, /Terminal Leaf-Node Deterministic Audit/, 'GEMINI.md must specify leaf-node audit');
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must be domain-neutral');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /通用工程防伪执行与拓扑零退化公理/, 'pstack-openspec must contain Axiom 33');
  assert.match(pstackSkill, /SILENT_NO_OP_FRAUD/, 'pstack-openspec must specify SILENT_NO_OP_FRAUD');
  assert.match(pstackSkill, /EMPTY_MANDATORY_SLOT_BLOCKED/, 'pstack-openspec must specify EMPTY_MANDATORY_SLOT_BLOCKED');
  assert.doesNotMatch(pstackSkill, /单个产品型号|特定文本排版|OS-9547/, 'pstack-openspec must be domain-neutral');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /通用工程防伪执行与拓扑零退化公理/, 'ai-harness-openspec must contain Invariant 28');
  assert.match(aiHarnessSkill, /SILENT_NO_OP_FRAUD/, 'ai-harness-openspec must specify SILENT_NO_OP_FRAUD');
  assert.match(aiHarnessSkill, /EMPTY_MANDATORY_SLOT_BLOCKED/, 'ai-harness-openspec must specify EMPTY_MANDATORY_SLOT_BLOCKED');
  assert.doesNotMatch(aiHarnessSkill, /单个产品型号|特定文本排版|OS-9547/, 'ai-harness-openspec must be domain-neutral');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /19\. Universal Engineering Anti-Phantom & Structural Fidelity Engine/, 'docs must document Section 19');
  assert.match(docsContent, /SILENT_NO_OP_FRAUD/, 'docs must document SILENT_NO_OP_FRAUD');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /九、 终端物理叶子节点穿透式审计与六大通用工程铁律/, 'audit spec must document Section 9');
  assert.match(specContent, /SILENT_NO_OP_FRAUD/, 'audit spec must specify SILENT_NO_OP_FRAUD');
  assert.match(specContent, /EMPTY_MANDATORY_SLOT_BLOCKED/, 'audit spec must specify EMPTY_MANDATORY_SLOT_BLOCKED');
});

test('gemini adapter enforces autonomous spec and audit gate co-evolution gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Autonomous spec & audit gate co-evolution gate/, 'must document autonomous spec and audit gate co-evolution gate');
  assert.match(content, /Anti-Patch-and-Forget/, 'must specify anti-patch-and-forget invariant');
  assert.match(content, /Fuzzy Probing of Project Guidance/, 'must specify fuzzy probing of project guidance');
  assert.match(content, /The Trinity Self-Augmentation Procedure/, 'must specify trinity self-augmentation procedure');
  assert.match(content, /Living Specification/, 'must specify living specification augmentation');
  assert.match(content, /Audit Guidance/, 'must specify audit guidance enrichment');
  assert.match(content, /Deterministic Gate/, 'must specify deterministic gate construction');
  assert.match(content, /Permanent Baseline Inheritance/, 'must specify permanent baseline inheritance');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /人机协同纠错后规范与审计门禁主动自增补公理/, 'GEMINI.md must contain Axiom 32');
  assert.match(globalRules, /Autonomous Spec & Audit Gate Co-Evolution Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /Anti-Patch-and-Forget/, 'GEMINI.md must specify anti-patch-and-forget');
  assert.match(globalRules, /Fuzzy Probing of Project Guidance/, 'GEMINI.md must specify fuzzy probing');
  assert.match(globalRules, /The Trinity Self-Augmentation Procedure/, 'GEMINI.md must specify trinity augmentation');
  assert.match(globalRules, /Permanent Baseline Inheritance/, 'GEMINI.md must specify permanent baseline inheritance');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /人机协同纠错后规范与审计门禁主动自增补公理/, 'pstack skill must contain Axiom 34');
  assert.match(pstackSkill, /Autonomous Spec & Audit Gate Co-Evolution Axiom/, 'pstack skill must contain English title');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /人机协同纠错后规范与审计门禁主动自增补公理/, 'ai-harness skill must contain Invariant 29');
  assert.match(aiHarnessSkill, /Autonomous Spec & Audit Gate Co-Evolution Axiom/, 'ai-harness skill must contain English title');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /Autonomous Spec & Audit Gate Co-Evolution Engine/, 'docs must document Section 20');
  assert.match(docsContent, /Anti-Patch-and-Forget/, 'docs must specify anti-patch-and-forget');
  assert.match(docsContent, /The Trinity Self-Augmentation Procedure/, 'docs must specify trinity augmentation');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十、 人机协同纠错后规范与审计门禁主动自增补规程/, 'audit spec must document Section 10');
  assert.match(specContent, /Autonomous Spec & Audit Gate Co-Evolution Standard/, 'audit spec must contain Section 10 English title');
  assert.match(specContent, /Anti-Patch-and-Forget/, 'audit spec must specify anti-patch-and-forget');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十、 人机协同纠错后规范与审计门禁主动自增补规程/, 'ref audit spec must document Section 10');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces spec supremacy, invariant immunity, and constitutional amendment exclusivity gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Spec supremacy, invariant immunity & constitutional amendment exclusivity gate/, 'must document spec supremacy and constitutional gate');
  assert.match(content, /SPEC_IMMUNITY_PROTECTED/, 'must specify SPEC_IMMUNITY_PROTECTED');
  assert.match(content, /SPEC_INVERSION_FRAUD/, 'must specify SPEC_INVERSION_FRAUD');
  assert.match(content, /Beyoncé Pinning & Mutation Tests/, 'must specify Beyoncé pinning tests');
  assert.match(content, /Chesterton's Fences & Why-Not-Just Labels/, 'must specify Chesterton fences');
  assert.match(content, /Monotonic Ratchet & Supersession RFC/, 'must specify Supersession RFC');
  assert.match(content, /Constitutional Amendment Exclusivity & Anti-Subversive-Trojan Axiom/, 'must specify Constitutional Amendment Exclusivity');
  assert.match(content, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /既有法定规范保护、反审计倒置与宪法修改神圣排他权公理/, 'GEMINI.md must contain Axiom 33');
  assert.match(globalRules, /Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /SPEC_IMMUNITY_PROTECTED/, 'GEMINI.md must specify SPEC_IMMUNITY_PROTECTED');
  assert.match(globalRules, /SPEC_INVERSION_FRAUD/, 'GEMINI.md must specify SPEC_INVERSION_FRAUD');
  assert.match(globalRules, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'GEMINI.md must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /既有法定规范保护、反审计倒置与宪法修改神圣排他权公理/, 'pstack skill must contain Axiom 35');
  assert.match(pstackSkill, /Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Axiom/, 'pstack skill must contain English title');
  assert.match(pstackSkill, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'pstack skill must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /既有法定规范保护、反审计倒置与宪法修改神圣排他权公理/, 'ai-harness skill must contain Invariant 30');
  assert.match(aiHarnessSkill, /Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Axiom/, 'ai-harness skill must contain English title');
  assert.match(aiHarnessSkill, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'ai-harness skill must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /Spec Supremacy & Constitutional Inviolability Engine/, 'docs must document Section 21');
  assert.match(docsContent, /SPEC_IMMUNITY_PROTECTED/, 'docs must specify SPEC_IMMUNITY_PROTECTED');
  assert.match(docsContent, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'docs must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十一、 既有法定规范保护、反审计倒置与宪法修改排他权规程/, 'audit spec must document Section 11');
  assert.match(specContent, /Spec Supremacy, Invariant Immunity & Constitutional Amendment Exclusivity Standard/, 'audit spec must contain Section 11 English title');
  assert.match(specContent, /SPEC_INVERSION_FRAUD/, 'audit spec must specify SPEC_INVERSION_FRAUD');
  assert.match(specContent, /CONSTITUTIONAL_TAMPERING_DETECTED/, 'audit spec must specify CONSTITUTIONAL_TAMPERING_DETECTED');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十一、 既有法定规范保护、反审计倒置与宪法修改排他权规程/, 'ref audit spec must document Section 11');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces universal program purity, anti-scenario-pollution, and cross-scenario invariance gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Universal program purity, anti-scenario-pollution & cross-scenario invariance gate/, 'must document universal purity gate');
  assert.match(content, /SCENARIO_POLLUTION_BLOCKED/, 'must specify SCENARIO_POLLUTION_BLOCKED');
  assert.match(content, /SINK_POLLUTION_BLOCKED/, 'must specify SINK_POLLUTION_BLOCKED');
  assert.match(content, /Three-Tier Physical Isolation/, 'must specify Three-Tier Physical Isolation');
  assert.match(content, /Universal Mechanism Engine/, 'must specify Universal Mechanism Engine');
  assert.match(content, /Anti-Corruption Ingestion Layer/, 'must specify Anti-Corruption Ingestion Layer');
  assert.match(content, /Declarative Policies/, 'must specify Declarative Policies');
  assert.match(content, /Cross-Scenario Orthogonal Regression Matrix/, 'must specify Cross-Scenario Orthogonal Regression Matrix');
  assert.match(content, /Zero-Variance Invariance Across Scenarios/, 'must specify cross-scenario zero-variance');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /通用程序纯粹性、反情境污染与三层机制策略隔离公理/, 'GEMINI.md must contain Axiom 34');
  assert.match(globalRules, /Universal Program Purity, Anti-Scenario-Pollution & Three-Tier Mechanism-Policy Isolation Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /SCENARIO_POLLUTION_BLOCKED/, 'GEMINI.md must specify SCENARIO_POLLUTION_BLOCKED');
  assert.match(globalRules, /SINK_POLLUTION_BLOCKED/, 'GEMINI.md must specify SINK_POLLUTION_BLOCKED');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /通用程序纯粹性、反情境污染与三层机制策略隔离公理/, 'pstack skill must contain Axiom 36');
  assert.match(pstackSkill, /Universal Program Purity, Anti-Scenario-Pollution & Three-Tier Mechanism-Policy Isolation Axiom/, 'pstack skill must contain English title');
  assert.match(pstackSkill, /SCENARIO_POLLUTION_BLOCKED/, 'pstack skill must specify SCENARIO_POLLUTION_BLOCKED');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /通用程序纯粹性、反情境污染与三层机制策略隔离公理/, 'ai-harness skill must contain Invariant 31');
  assert.match(aiHarnessSkill, /Universal Program Purity, Anti-Scenario-Pollution & Three-Tier Mechanism-Policy Isolation Axiom/, 'ai-harness skill must contain English title');
  assert.match(aiHarnessSkill, /SCENARIO_POLLUTION_BLOCKED/, 'ai-harness skill must specify SCENARIO_POLLUTION_BLOCKED');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /Universal Program Purity & Cross-Scenario Invariance Engine/, 'docs must document Section 22');
  assert.match(docsContent, /SCENARIO_POLLUTION_BLOCKED/, 'docs must specify SCENARIO_POLLUTION_BLOCKED');
  assert.match(docsContent, /Three-Tier Physical Isolation/, 'docs must specify Three-Tier Physical Isolation');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十二、 通用程序纯粹性、反情境污染与跨场景零方差审计规程/, 'audit spec must document Section 12');
  assert.match(specContent, /Universal Program Purity & Cross-Scenario Invariance Standard/, 'audit spec must contain Section 12 English title');
  assert.match(specContent, /SCENARIO_POLLUTION_BLOCKED/, 'audit spec must specify SCENARIO_POLLUTION_BLOCKED');
  assert.match(specContent, /SINK_POLLUTION_BLOCKED/, 'audit spec must specify SINK_POLLUTION_BLOCKED');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十二、 通用程序纯粹性、反情境污染与跨场景零方差审计规程/, 'ref audit spec must document Section 12');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces pure universal engineering abstraction and anti-scenario-anchoring gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Pure universal engineering abstraction & anti-scenario-anchoring gate/, 'must document universal abstraction gate');
  assert.match(content, /SCENARIO_ANCHORING_POLLUTION/, 'must specify SCENARIO_ANCHORING_POLLUTION');
  assert.match(content, /UNCLEANED_CONTAINER_POLLUTION/, 'must specify UNCLEANED_CONTAINER_POLLUTION');
  assert.match(content, /BROAD_SCOPE_EXEMPTION_BLOCKED/, 'must specify BROAD_SCOPE_EXEMPTION_BLOCKED');
  assert.match(content, /ASYMMETRIC_POSITIVE_BIAS/, 'must specify ASYMMETRIC_POSITIVE_BIAS');
  assert.match(content, /PHANTOM_DEFAULT_FRAUD/, 'must specify PHANTOM_DEFAULT_FRAUD');
  assert.match(content, /META_AUDIT_FAILURE/, 'must specify META_AUDIT_FAILURE');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /纯粹通用工程抽象与反具体情境锚定强制性总纲公理/, 'GEMINI.md must contain Axiom 35');
  assert.match(globalRules, /Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /SCENARIO_ANCHORING_POLLUTION/, 'GEMINI.md must specify SCENARIO_ANCHORING_POLLUTION');
  assert.match(globalRules, /UNCLEANED_CONTAINER_POLLUTION/, 'GEMINI.md must specify UNCLEANED_CONTAINER_POLLUTION');
  assert.match(globalRules, /BROAD_SCOPE_EXEMPTION_BLOCKED/, 'GEMINI.md must specify BROAD_SCOPE_EXEMPTION_BLOCKED');
  assert.match(globalRules, /ASYMMETRIC_POSITIVE_BIAS/, 'GEMINI.md must specify ASYMMETRIC_POSITIVE_BIAS');
  assert.match(globalRules, /PHANTOM_DEFAULT_FRAUD/, 'GEMINI.md must specify PHANTOM_DEFAULT_FRAUD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /纯粹通用工程抽象与反具体情境锚定强制性总纲公理/, 'pstack skill must contain Axiom 37');
  assert.match(pstackSkill, /Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Axiom/, 'pstack skill must contain English title');
  assert.match(pstackSkill, /SCENARIO_ANCHORING_POLLUTION/, 'pstack skill must specify SCENARIO_ANCHORING_POLLUTION');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /纯粹通用工程抽象与反具体情境锚定强制性总纲公理/, 'ai-harness skill must contain Invariant 32');
  assert.match(aiHarnessSkill, /Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Axiom/, 'ai-harness skill must contain English title');
  assert.match(aiHarnessSkill, /SCENARIO_ANCHORING_POLLUTION/, 'ai-harness skill must specify SCENARIO_ANCHORING_POLLUTION');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /Pure Universal Engineering Abstraction & Anti-Scenario-Anchoring Engine/, 'docs must document Section 23');
  assert.match(docsContent, /SCENARIO_ANCHORING_POLLUTION/, 'docs must specify SCENARIO_ANCHORING_POLLUTION');
  assert.match(docsContent, /UNCLEANED_CONTAINER_POLLUTION/, 'docs must specify UNCLEANED_CONTAINER_POLLUTION');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十三、 纯粹通用工程抽象、反具体情境锚定与六大通用元病理审计规程/, 'audit spec must document Section 13');
  assert.match(specContent, /Pure Universal Engineering Abstraction Standard/, 'audit spec must contain Section 13 English title');
  assert.match(specContent, /ASYMMETRIC_POSITIVE_BIAS/, 'audit spec must specify ASYMMETRIC_POSITIVE_BIAS');
  assert.match(specContent, /META_AUDIT_FAILURE/, 'audit spec must specify META_AUDIT_FAILURE');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十三、 纯粹通用工程抽象、反具体情境锚定与六大通用元病理审计规程/, 'ref audit spec must document Section 13');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces mandatory lint escalation engine and anti-superficial-apology gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Mandatory lint-escalation engine & anti-superficial-apology gate/, 'must document mandatory lint gate');
  assert.match(content, /CORRECTION_INCIDENT_ESCALATION/, 'must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(content, /NO_LINT_DELIVERY_BLOCKED/, 'must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(content, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(content, /SUPERFICIAL_APOLOGY_REJECTED/, 'must specify SUPERFICIAL_APOLOGY_REJECTED');
  assert.match(content, /PERMANENT_LINT_RESERVOIR/, 'must specify PERMANENT_LINT_RESERVOIR');
  assert.match(content, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(content, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉公理/, 'GEMINI.md must contain Axiom 36');
  assert.match(globalRules, /Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /CORRECTION_INCIDENT_ESCALATION/, 'GEMINI.md must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(globalRules, /NO_LINT_DELIVERY_BLOCKED/, 'GEMINI.md must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(globalRules, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'GEMINI.md must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(globalRules, /SUPERFICIAL_APOLOGY_REJECTED/, 'GEMINI.md must specify SUPERFICIAL_APOLOGY_REJECTED');
  assert.match(globalRules, /PERMANENT_LINT_RESERVOIR/, 'GEMINI.md must specify PERMANENT_LINT_RESERVOIR');
  assert.match(globalRules, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'GEMINI.md must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(globalRules, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'GEMINI.md must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉公理/, 'pstack skill must contain Axiom 38');
  assert.match(pstackSkill, /Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Axiom/, 'pstack skill must contain English title');
  assert.match(pstackSkill, /CORRECTION_INCIDENT_ESCALATION/, 'pstack skill must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(pstackSkill, /NO_LINT_DELIVERY_BLOCKED/, 'pstack skill must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(pstackSkill, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'pstack skill must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(pstackSkill, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'pstack skill must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(pstackSkill, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'pstack skill must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉公理/, 'ai-harness skill must contain Invariant 33');
  assert.match(aiHarnessSkill, /Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Axiom/, 'ai-harness skill must contain English title');
  assert.match(aiHarnessSkill, /CORRECTION_INCIDENT_ESCALATION/, 'ai-harness skill must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(aiHarnessSkill, /NO_LINT_DELIVERY_BLOCKED/, 'ai-harness skill must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(aiHarnessSkill, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'ai-harness skill must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(aiHarnessSkill, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'ai-harness skill must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(aiHarnessSkill, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'ai-harness skill must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /24\. Mandatory Lint-Escalation Engine & Anti-Superficial-Apology Engine/, 'docs must document Section 24');
  assert.match(docsContent, /CORRECTION_INCIDENT_ESCALATION/, 'docs must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(docsContent, /NO_LINT_DELIVERY_BLOCKED/, 'docs must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(docsContent, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'docs must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(docsContent, /SUPERFICIAL_APOLOGY_REJECTED/, 'docs must specify SUPERFICIAL_APOLOGY_REJECTED');
  assert.match(docsContent, /PERMANENT_LINT_RESERVOIR/, 'docs must specify PERMANENT_LINT_RESERVOIR');
  assert.match(docsContent, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'docs must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(docsContent, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'docs must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十四、 人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉规程/, 'audit spec must document Section 14');
  assert.match(specContent, /Mandatory Lint-Escalation & Anti-Superficial-Apology Protocol/, 'audit spec must contain Section 14 English title');
  assert.match(specContent, /CORRECTION_INCIDENT_ESCALATION/, 'audit spec must specify CORRECTION_INCIDENT_ESCALATION');
  assert.match(specContent, /NO_LINT_DELIVERY_BLOCKED/, 'audit spec must specify NO_LINT_DELIVERY_BLOCKED');
  assert.match(specContent, /ANTI_SUPERFICIAL_APOLOGY_PROTOCOL/, 'audit spec must specify ANTI_SUPERFICIAL_APOLOGY_PROTOCOL');
  assert.match(specContent, /SUPERFICIAL_APOLOGY_REJECTED/, 'audit spec must specify SUPERFICIAL_APOLOGY_REJECTED');
  assert.match(specContent, /PERMANENT_LINT_RESERVOIR/, 'audit spec must specify PERMANENT_LINT_RESERVOIR');
  assert.match(specContent, /LINT_DOMAIN_NEUTRALITY_STANDARD/, 'audit spec must specify LINT_DOMAIN_NEUTRALITY_STANDARD');
  assert.match(specContent, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'audit spec must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十四、 人机纠偏强制沉淀 Lint 物理断路器与反廉价道歉规程/, 'ref audit spec must document Section 14');
  assert.match(refSpecContent, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'ref audit spec must specify SCENARIO_ANCHORING_LINT_BLOCKED');

  // Verify active governance scenario neutrality (Zero MSDS / SDS / TDS in active governance)
  assert.doesNotMatch(globalRules, /\b(MSDS|SDS|TDS)\b/i, 'GEMINI.md must have 0 MSDS/SDS/TDS mentions');
  assert.doesNotMatch(aiHarnessSkill, /\b(MSDS|SDS|TDS)\b/i, 'ai-harness skill must have 0 MSDS/SDS/TDS mentions');
  const defenseRef = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/defense-escalation-protocol.md'), 'utf8');
  assert.doesNotMatch(defenseRef, /\b(MSDS|SDS|TDS)\b/i, 'defense protocol must have 0 MSDS/SDS/TDS mentions');
  const recursiveRef = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/recursive-self-improvement-protocol.md'), 'utf8');
  assert.doesNotMatch(recursiveRef, /\b(MSDS|SDS|TDS)\b/i, 'recursive protocol must have 0 MSDS/SDS/TDS mentions');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces generic tooling crystallization and anti-one-off-scripting gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Generic tooling crystallization & anti-one-off-scripting gate/, 'must document generic tooling gate');
  assert.match(content, /GENERIC_TOOLING_CRYSTALLIZATION/, 'must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(content, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(content, /DUAL_PURPOSE_LEVERAGE/, 'must specify DUAL_PURPOSE_LEVERAGE');
  assert.match(content, /PARAMETERIZED_INVARIANCE/, 'must specify PARAMETERIZED_INVARIANCE');
  assert.match(content, /DETERMINISTIC_LEVER_CONTRACT/, 'must specify DETERMINISTIC_LEVER_CONTRACT');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /通用工装结晶与反一次性修补公理/, 'GEMINI.md must contain Axiom 37');
  assert.match(globalRules, /Generic Tooling Crystallization & Anti-One-Off-Scripting Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /GENERIC_TOOLING_CRYSTALLIZATION/, 'GEMINI.md must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(globalRules, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'GEMINI.md must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(globalRules, /DUAL_PURPOSE_LEVERAGE/, 'GEMINI.md must specify DUAL_PURPOSE_LEVERAGE');
  assert.match(globalRules, /PARAMETERIZED_INVARIANCE/, 'GEMINI.md must specify PARAMETERIZED_INVARIANCE');
  assert.match(globalRules, /DETERMINISTIC_LEVER_CONTRACT/, 'GEMINI.md must specify DETERMINISTIC_LEVER_CONTRACT');
  assert.match(globalRules, /principle-build-the-lever/, 'GEMINI.md must bind principle-build-the-lever');
  assert.match(globalRules, /principle-encode-lessons-in-structure/, 'GEMINI.md must bind principle-encode-lessons-in-structure');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /通用工装结晶与反一次性修补公理/, 'pstack skill must contain Axiom 39');
  assert.match(pstackSkill, /Generic Tooling Crystallization & Anti-One-Off-Scripting Axiom/, 'pstack skill must contain English title');
  assert.match(pstackSkill, /GENERIC_TOOLING_CRYSTALLIZATION/, 'pstack skill must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(pstackSkill, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'pstack skill must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(pstackSkill, /DUAL_PURPOSE_LEVERAGE/, 'pstack skill must specify DUAL_PURPOSE_LEVERAGE');
  assert.match(pstackSkill, /principle-build-the-lever/, 'pstack skill must bind principle-build-the-lever');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /通用工装结晶与反一次性修补公理/, 'ai-harness skill must contain Invariant 34');
  assert.match(aiHarnessSkill, /Generic Tooling Crystallization & Anti-One-Off-Scripting Axiom/, 'ai-harness skill must contain English title');
  assert.match(aiHarnessSkill, /GENERIC_TOOLING_CRYSTALLIZATION/, 'ai-harness skill must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(aiHarnessSkill, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'ai-harness skill must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(aiHarnessSkill, /DUAL_PURPOSE_LEVERAGE/, 'ai-harness skill must specify DUAL_PURPOSE_LEVERAGE');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /25\. Generic Tooling Crystallization & Anti-One-Off-Scripting Engine/, 'docs must document Section 25');
  assert.match(docsContent, /GENERIC_TOOLING_CRYSTALLIZATION/, 'docs must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(docsContent, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'docs must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(docsContent, /DUAL_PURPOSE_LEVERAGE/, 'docs must specify DUAL_PURPOSE_LEVERAGE');
  assert.match(docsContent, /PARAMETERIZED_INVARIANCE/, 'docs must specify PARAMETERIZED_INVARIANCE');
  assert.match(docsContent, /DETERMINISTIC_LEVER_CONTRACT/, 'docs must specify DETERMINISTIC_LEVER_CONTRACT');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十五、 通用工装结晶与反一次性修补审计规程/, 'audit spec must document Section 15');
  assert.match(specContent, /Generic Tooling Crystallization & Anti-One-Off-Scripting Protocol/, 'audit spec must contain Section 15 English title');
  assert.match(specContent, /GENERIC_TOOLING_CRYSTALLIZATION/, 'audit spec must specify GENERIC_TOOLING_CRYSTALLIZATION');
  assert.match(specContent, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'audit spec must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');
  assert.match(specContent, /DUAL_PURPOSE_LEVERAGE/, 'audit spec must specify DUAL_PURPOSE_LEVERAGE');
  assert.match(specContent, /PARAMETERIZED_INVARIANCE/, 'audit spec must specify PARAMETERIZED_INVARIANCE');
  assert.match(specContent, /DETERMINISTIC_LEVER_CONTRACT/, 'audit spec must specify DETERMINISTIC_LEVER_CONTRACT');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十五、 通用工装结晶与反一次性修补审计规程/, 'ref audit spec must document Section 15');
  assert.match(refSpecContent, /ONE_OFF_SCRIPT_TRAP_BLOCKED/, 'ref audit spec must specify ONE_OFF_SCRIPT_TRAP_BLOCKED');

  // Verify domain neutrality
  assert.doesNotMatch(globalRules, /单个产品型号|特定文本排版|OS-9547/, 'GEMINI.md must remain strictly domain-neutral');
});

test('gemini adapter enforces project-canonical single audit system and audit graph handoff gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Project-canonical single audit system & Audit Graph handoff gate/, 'must document single audit gate');
  assert.match(content, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(content, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(content, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(content, /UNANCHORED_AUDIT_ISLAND_BLOCKED/, 'must specify UNANCHORED_AUDIT_ISLAND_BLOCKED');
  assert.match(content, /HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION/, 'must specify HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION');
  assert.match(content, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');
  assert.match(content, /AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED/, 'must specify AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED');
  assert.match(content, /UNIVERSAL_AUDIT_ABSTRACTION_STANDARD/, 'must specify UNIVERSAL_AUDIT_ABSTRACTION_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /项目唯一权威审计体系与审计拓扑图（Audit Graph）无损交接公理/, 'GEMINI.md must contain Axiom 38');
  assert.match(globalRules, /Project-Canonical Single Audit System & Audit Graph Handoff Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'GEMINI.md must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(globalRules, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'GEMINI.md must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(globalRules, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'GEMINI.md must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(globalRules, /UNANCHORED_AUDIT_ISLAND_BLOCKED/, 'GEMINI.md must specify UNANCHORED_AUDIT_ISLAND_BLOCKED');
  assert.match(globalRules, /HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION/, 'GEMINI.md must specify HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION');
  assert.match(globalRules, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'GEMINI.md must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');
  assert.match(globalRules, /AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED/, 'GEMINI.md must specify AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED');
  assert.match(globalRules, /UNIVERSAL_AUDIT_ABSTRACTION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_AUDIT_ABSTRACTION_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /项目唯一权威审计体系与审计拓扑图（Audit Graph）无损交接公理/, 'pstack skill must contain Axiom 40');
  assert.match(pstackSkill, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'pstack skill must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(pstackSkill, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'pstack skill must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(pstackSkill, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'pstack skill must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(pstackSkill, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'pstack skill must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /项目唯一权威审计体系与审计拓扑图（Audit Graph）无损交接公理/, 'ai-harness skill must contain Invariant 35');
  assert.match(aiHarnessSkill, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'ai-harness skill must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(aiHarnessSkill, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'ai-harness skill must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(aiHarnessSkill, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'ai-harness skill must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(aiHarnessSkill, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'ai-harness skill must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /26. Project-Canonical Single Audit System & Audit Graph Handoff Engine/, 'docs must document Section 26');
  assert.match(docsContent, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'docs must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(docsContent, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'docs must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(docsContent, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'docs must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(docsContent, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'docs must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十六、 项目唯一权威审计体系与审计拓扑图/, 'audit spec must document Section 16');
  assert.match(specContent, /Project-Canonical Single Audit System & Audit Graph Handoff Protocol/, 'audit spec must contain Section 16 English title');
  assert.match(specContent, /PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM/, 'audit spec must specify PROJECT_CANONICAL_AUDIT_SYSTEM_AXIOM');
  assert.match(specContent, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'audit spec must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
  assert.match(specContent, /AUDIT_GRAPH_TOPOLOGY_ENGINE/, 'audit spec must specify AUDIT_GRAPH_TOPOLOGY_ENGINE');
  assert.match(specContent, /UNANCHORED_AUDIT_ISLAND_BLOCKED/, 'audit spec must specify UNANCHORED_AUDIT_ISLAND_BLOCKED');
  assert.match(specContent, /HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION/, 'audit spec must specify HUMAN_GUIDANCE_CONTINUOUS_EVOLUTION');
  assert.match(specContent, /LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE/, 'audit spec must specify LOSSLESS_AGENT_HANDOFF_AUDIT_BASELINE');
  assert.match(specContent, /AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED/, 'audit spec must specify AUDIT_STATE_COGNITIVE_DRIFT_BLOCKED');
  assert.match(specContent, /UNIVERSAL_AUDIT_ABSTRACTION_STANDARD/, 'audit spec must specify UNIVERSAL_AUDIT_ABSTRACTION_STANDARD');

  // Verify references copy
  const refSpecPath = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent = readFileSync(refSpecPath, 'utf8');
  assert.match(refSpecContent, /十六、 项目唯一权威审计体系与审计拓扑图/, 'ref audit spec must document Section 16');
  assert.match(refSpecContent, /DUPLICATE_AUDIT_SYSTEM_BLOCKED/, 'ref audit spec must specify DUPLICATE_AUDIT_SYSTEM_BLOCKED');
});

test('gemini adapter enforces cognitive triad evolution and kitchen-brigade scheduling gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Cognitive triad evolution & kitchen-brigade scheduling gate/, 'must document cognitive triad gate');
  assert.match(content, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(content, /UNREFLECTED_DELIVERY_BLOCKED/, 'must specify UNREFLECTED_DELIVERY_BLOCKED');
  assert.match(content, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');
  assert.match(content, /ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED/, 'must specify ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED');
  assert.match(content, /FANOUT_EXPLORATION_CRITIQUE_RUBRIC/, 'must specify FANOUT_EXPLORATION_CRITIQUE_RUBRIC');
  assert.match(content, /TRIVIAL_SELF_AUDIT_FRAUD/, 'must specify TRIVIAL_SELF_AUDIT_FRAUD');
  assert.match(content, /UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD/, 'must specify UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /认知反思对账三阶跃迁与后厨旅团工单调度公理/, 'GEMINI.md must contain Axiom 39');
  assert.match(globalRules, /Cognitive Triad Evolution & Kitchen-Brigade Scheduling Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'GEMINI.md must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(globalRules, /UNREFLECTED_DELIVERY_BLOCKED/, 'GEMINI.md must specify UNREFLECTED_DELIVERY_BLOCKED');
  assert.match(globalRules, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'GEMINI.md must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');
  assert.match(globalRules, /ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED/, 'GEMINI.md must specify ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED');
  assert.match(globalRules, /FANOUT_EXPLORATION_CRITIQUE_RUBRIC/, 'GEMINI.md must specify FANOUT_EXPLORATION_CRITIQUE_RUBRIC');
  assert.match(globalRules, /TRIVIAL_SELF_AUDIT_FRAUD/, 'GEMINI.md must specify TRIVIAL_SELF_AUDIT_FRAUD');
  assert.match(globalRules, /AUDIT_GRAPH_OBSIDIAN_INTEROP/, 'GEMINI.md must specify AUDIT_GRAPH_OBSIDIAN_INTEROP');
  assert.match(globalRules, /UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /认知反思对账三阶跃迁与后厨旅团工单调度公理/, 'pstack skill must contain Axiom 41');
  assert.match(pstackSkill, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'pstack skill must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(pstackSkill, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'pstack skill must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /认知反思对账三阶跃迁与后厨旅团工单调度公理/, 'ai-harness skill must contain Invariant 36');
  assert.match(aiHarnessSkill, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'ai-harness skill must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(aiHarnessSkill, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'ai-harness skill must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /27. Cognitive Triad Evolution & Kitchen-Brigade Scheduling Engine/, 'docs must document Section 27');
  assert.match(docsContent, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'docs must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(docsContent, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'docs must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十七、 认知反思对账三阶跃迁与后厨旅团工单调度审计规程/, 'audit spec must document Section 17');
  assert.match(specContent, /Cognitive Triad Evolution & Kitchen-Brigade Scheduling Protocol/, 'audit spec must contain Section 17 English title');
  assert.match(specContent, /COGNITIVE_TRIAD_EVOLUTION_ENGINE/, 'audit spec must specify COGNITIVE_TRIAD_EVOLUTION_ENGINE');
  assert.match(specContent, /UNREFLECTED_DELIVERY_BLOCKED/, 'audit spec must specify UNREFLECTED_DELIVERY_BLOCKED');
  assert.match(specContent, /KITCHEN_BRIGADE_ORDER_PROTOCOL/, 'audit spec must specify KITCHEN_BRIGADE_ORDER_PROTOCOL');
  assert.match(specContent, /ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED/, 'audit spec must specify ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED');
  assert.match(specContent, /FANOUT_EXPLORATION_CRITIQUE_RUBRIC/, 'audit spec must specify FANOUT_EXPLORATION_CRITIQUE_RUBRIC');
  assert.match(specContent, /TRIVIAL_SELF_AUDIT_FRAUD/, 'audit spec must specify TRIVIAL_SELF_AUDIT_FRAUD');
  assert.match(specContent, /AUDIT_GRAPH_OBSIDIAN_INTEROP/, 'audit spec must specify AUDIT_GRAPH_OBSIDIAN_INTEROP');
  assert.match(specContent, /UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD/, 'audit spec must specify UNIVERSAL_COGNITIVE_ABSTRACTION_STANDARD');

  // Verify references copies
  const refSpecPath1 = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent1 = readFileSync(refSpecPath1, 'utf8');
  assert.match(refSpecContent1, /十七、 认知反思对账三阶跃迁与后厨旅团工单调度审计规程/, 'ref audit spec 1 must document Section 17');
  assert.match(refSpecContent1, /UNREFLECTED_DELIVERY_BLOCKED/, 'ref audit spec 1 must specify UNREFLECTED_DELIVERY_BLOCKED');

  const refSpecPath2 = path.join(repoRoot, 'orbitstack-gemini/references/agent-cognitive-audit-specification.md');
  const refSpecContent2 = readFileSync(refSpecPath2, 'utf8');
  assert.match(refSpecContent2, /十七、 认知反思对账三阶跃迁与后厨旅团工单调度审计规程/, 'ref audit spec 2 must document Section 17');
  assert.match(refSpecContent2, /ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED/, 'ref audit spec 2 must specify ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED');
});

test('gemini adapter enforces mandatory audit escalation proposal and human confirmation gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Mandatory audit escalation proposal & human confirmation gate/, 'must document mandatory audit escalation gate');
  assert.match(content, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(content, /NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED/, 'must specify NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED');
  assert.match(content, /AUDIT_ESCALATION_PROPOSAL_CONTRACT/, 'must specify AUDIT_ESCALATION_PROPOSAL_CONTRACT');
  assert.match(content, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'must specify HUMAN_AUDIT_CONFIRMATION_GATE');
  assert.match(content, /UNAUTHORIZED_AUDIT_MUTATION_BLOCKED/, 'must specify UNAUTHORIZED_AUDIT_MUTATION_BLOCKED');
  assert.match(content, /AUDIT_PROPOSAL_LIFECYCLE_VERSIONING/, 'must specify AUDIT_PROPOSAL_LIFECYCLE_VERSIONING');
  assert.match(content, /UNIVERSAL_AUDIT_ESCALATION_STANDARD/, 'must specify UNIVERSAL_AUDIT_ESCALATION_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /任务终审强制审计抽象提案与人机确认门禁公理/, 'GEMINI.md must contain Axiom 40');
  assert.match(globalRules, /Mandatory Audit System Escalation Proposal & Human Confirmation Gate Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'GEMINI.md must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(globalRules, /NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED/, 'GEMINI.md must specify NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED');
  assert.match(globalRules, /AUDIT_ESCALATION_PROPOSAL_CONTRACT/, 'GEMINI.md must specify AUDIT_ESCALATION_PROPOSAL_CONTRACT');
  assert.match(globalRules, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'GEMINI.md must specify HUMAN_AUDIT_CONFIRMATION_GATE');
  assert.match(globalRules, /UNAUTHORIZED_AUDIT_MUTATION_BLOCKED/, 'GEMINI.md must specify UNAUTHORIZED_AUDIT_MUTATION_BLOCKED');
  assert.match(globalRules, /AUDIT_PROPOSAL_LIFECYCLE_VERSIONING/, 'GEMINI.md must specify AUDIT_PROPOSAL_LIFECYCLE_VERSIONING');
  assert.match(globalRules, /UNIVERSAL_AUDIT_ESCALATION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_AUDIT_ESCALATION_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /任务终审强制审计抽象提案与人机确认门禁公理/, 'pstack skill must contain Axiom 42');
  assert.match(pstackSkill, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'pstack skill must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(pstackSkill, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'pstack skill must specify HUMAN_AUDIT_CONFIRMATION_GATE');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /任务终审强制审计抽象提案与人机确认门禁公理/, 'ai-harness skill must contain Invariant 37');
  assert.match(aiHarnessSkill, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'ai-harness skill must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(aiHarnessSkill, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'ai-harness skill must specify HUMAN_AUDIT_CONFIRMATION_GATE');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /28. Mandatory Audit System Escalation Proposal & Human Confirmation Gate Engine/, 'docs must document Section 28');
  assert.match(docsContent, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'docs must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(docsContent, /NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED/, 'docs must specify NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED');
  assert.match(docsContent, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'docs must specify HUMAN_AUDIT_CONFIRMATION_GATE');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十八、 任务终审强制审计抽象提案与人机确认门禁审计规程/, 'audit spec must document Section 18');
  assert.match(specContent, /Mandatory Audit System Escalation Proposal & Human Confirmation Gate Protocol/, 'audit spec must contain Section 18 English title');
  assert.match(specContent, /MANDATORY_AUDIT_ESCALATION_ABSTRACTION/, 'audit spec must specify MANDATORY_AUDIT_ESCALATION_ABSTRACTION');
  assert.match(specContent, /NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED/, 'audit spec must specify NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED');
  assert.match(specContent, /AUDIT_ESCALATION_PROPOSAL_CONTRACT/, 'audit spec must specify AUDIT_ESCALATION_PROPOSAL_CONTRACT');
  assert.match(specContent, /HUMAN_AUDIT_CONFIRMATION_GATE/, 'audit spec must specify HUMAN_AUDIT_CONFIRMATION_GATE');
  assert.match(specContent, /UNAUTHORIZED_AUDIT_MUTATION_BLOCKED/, 'audit spec must specify UNAUTHORIZED_AUDIT_MUTATION_BLOCKED');
  assert.match(specContent, /AUDIT_PROPOSAL_LIFECYCLE_VERSIONING/, 'audit spec must specify AUDIT_PROPOSAL_LIFECYCLE_VERSIONING');
  assert.match(specContent, /UNIVERSAL_AUDIT_ESCALATION_STANDARD/, 'audit spec must specify UNIVERSAL_AUDIT_ESCALATION_STANDARD');

  // Verify references copies
  const refSpecPath1 = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent1 = readFileSync(refSpecPath1, 'utf8');
  assert.match(refSpecContent1, /十八、 任务终审强制审计抽象提案与人机确认门禁审计规程/, 'ref audit spec 1 must document Section 18');
  assert.match(refSpecContent1, /NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED/, 'ref audit spec 1 must specify NO_AUDIT_PROPOSAL_DELIVERY_BLOCKED');

  const refSpecPath2 = path.join(repoRoot, 'orbitstack-gemini/references/agent-cognitive-audit-specification.md');
  const refSpecContent2 = readFileSync(refSpecPath2, 'utf8');
  assert.match(refSpecContent2, /十八、 任务终审强制审计抽象提案与人机确认门禁审计规程/, 'ref audit spec 2 must document Section 18');
  assert.match(refSpecContent2, /UNAUTHORIZED_AUDIT_MUTATION_BLOCKED/, 'ref audit spec 2 must specify UNAUTHORIZED_AUDIT_MUTATION_BLOCKED');
});

test('gemini adapter enforces production-driven proactive system evolution and anti-scenario myopia gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Production-driven proactive system evolution & anti-scenario myopia gate/, 'must document system evolution gate');
  assert.match(content, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(content, /SCENARIO_MYOPIA_BLOCKED/, 'must specify SCENARIO_MYOPIA_BLOCKED');
  assert.match(content, /PRODUCTION_FRICTION_AS_EVOLUTION_FUEL/, 'must specify PRODUCTION_FRICTION_AS_EVOLUTION_FUEL');
  assert.match(content, /DUAL_TIER_EVOLUTION_RHYTHM/, 'must specify DUAL_TIER_EVOLUTION_RHYTHM');
  assert.match(content, /NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED/, 'must specify NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED');
  assert.match(content, /TWO_LEVELS_UP_SYSTEMIC_INTERROGATION/, 'must specify TWO_LEVELS_UP_SYSTEMIC_INTERROGATION');
  assert.match(content, /PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT/, 'must specify PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT');
  assert.match(content, /AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE/, 'must specify AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE');
  assert.match(content, /CROSS_AGENT_EVOLUTION_INHERITANCE/, 'must specify CROSS_AGENT_EVOLUTION_INHERITANCE');
  assert.match(content, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');
  assert.match(content, /UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED/, 'must specify UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED');
  assert.match(content, /UNIVERSAL_SYSTEM_EVOLUTION_STANDARD/, 'must specify UNIVERSAL_SYSTEM_EVOLUTION_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /生产驱动的主动系统演进与反情境蒙蔽公理/, 'GEMINI.md must contain Axiom 41');
  assert.match(globalRules, /Production-Driven Proactive System Evolution & Anti-Scenario-Myopia Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'GEMINI.md must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(globalRules, /SCENARIO_MYOPIA_BLOCKED/, 'GEMINI.md must specify SCENARIO_MYOPIA_BLOCKED');
  assert.match(globalRules, /PRODUCTION_FRICTION_AS_EVOLUTION_FUEL/, 'GEMINI.md must specify PRODUCTION_FRICTION_AS_EVOLUTION_FUEL');
  assert.match(globalRules, /DUAL_TIER_EVOLUTION_RHYTHM/, 'GEMINI.md must specify DUAL_TIER_EVOLUTION_RHYTHM');
  assert.match(globalRules, /NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED/, 'GEMINI.md must specify NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED');
  assert.match(globalRules, /TWO_LEVELS_UP_SYSTEMIC_INTERROGATION/, 'GEMINI.md must specify TWO_LEVELS_UP_SYSTEMIC_INTERROGATION');
  assert.match(globalRules, /PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT/, 'GEMINI.md must specify PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT');
  assert.match(globalRules, /AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE/, 'GEMINI.md must specify AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE');
  assert.match(globalRules, /CROSS_AGENT_EVOLUTION_INHERITANCE/, 'GEMINI.md must specify CROSS_AGENT_EVOLUTION_INHERITANCE');
  assert.match(globalRules, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'GEMINI.md must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');
  assert.match(globalRules, /UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED/, 'GEMINI.md must specify UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED');
  assert.match(globalRules, /UNIVERSAL_SYSTEM_EVOLUTION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_SYSTEM_EVOLUTION_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /生产驱动的主动系统演进与反情境蒙蔽公理/, 'pstack skill must contain Axiom 43');
  assert.match(pstackSkill, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'pstack skill must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(pstackSkill, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'pstack skill must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /生产驱动的主动系统演进与反情境蒙蔽公理/, 'ai-harness skill must contain Invariant 38');
  assert.match(aiHarnessSkill, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'ai-harness skill must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(aiHarnessSkill, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'ai-harness skill must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /29. Production-Driven Proactive System Evolution & Anti-Scenario-Myopia Engine/, 'docs must document Section 29');
  assert.match(docsContent, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'docs must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(docsContent, /SCENARIO_MYOPIA_BLOCKED/, 'docs must specify SCENARIO_MYOPIA_BLOCKED');
  assert.match(docsContent, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'docs must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /十九、 生产驱动的主动系统演进与反情境蒙蔽审计规程/, 'audit spec must document Section 19');
  assert.match(specContent, /Production-Driven Proactive System Evolution & Anti-Scenario-Myopia Protocol/, 'audit spec must contain Section 19 English title');
  assert.match(specContent, /ANTI_SCENARIO_MYOPIA_AXIOM/, 'audit spec must specify ANTI_SCENARIO_MYOPIA_AXIOM');
  assert.match(specContent, /SCENARIO_MYOPIA_BLOCKED/, 'audit spec must specify SCENARIO_MYOPIA_BLOCKED');
  assert.match(specContent, /PRODUCTION_FRICTION_AS_EVOLUTION_FUEL/, 'audit spec must specify PRODUCTION_FRICTION_AS_EVOLUTION_FUEL');
  assert.match(specContent, /DUAL_TIER_EVOLUTION_RHYTHM/, 'audit spec must specify DUAL_TIER_EVOLUTION_RHYTHM');
  assert.match(specContent, /NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED/, 'audit spec must specify NO_SYSTEMIC_INSIGHT_DELIVERY_BLOCKED');
  assert.match(specContent, /TWO_LEVELS_UP_SYSTEMIC_INTERROGATION/, 'audit spec must specify TWO_LEVELS_UP_SYSTEMIC_INTERROGATION');
  assert.match(specContent, /PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT/, 'audit spec must specify PROACTIVE_SYSTEMIC_IMPROVEMENT_CONTRACT');
  assert.match(specContent, /AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE/, 'audit spec must specify AUDIT_GRAPH_SYSTEM_EVOLUTION_NODE');
  assert.match(specContent, /CROSS_AGENT_EVOLUTION_INHERITANCE/, 'audit spec must specify CROSS_AGENT_EVOLUTION_INHERITANCE');
  assert.match(specContent, /HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE/, 'audit spec must specify HUMAN_SYSTEM_EVOLUTION_CONFIRMATION_GATE');
  assert.match(specContent, /UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED/, 'audit spec must specify UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED');
  assert.match(specContent, /UNIVERSAL_SYSTEM_EVOLUTION_STANDARD/, 'audit spec must specify UNIVERSAL_SYSTEM_EVOLUTION_STANDARD');

  // Verify references copies
  const refSpecPath1 = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent1 = readFileSync(refSpecPath1, 'utf8');
  assert.match(refSpecContent1, /十九、 生产驱动的主动系统演进与反情境蒙蔽审计规程/, 'ref audit spec 1 must document Section 19');
  assert.match(refSpecContent1, /SCENARIO_MYOPIA_BLOCKED/, 'ref audit spec 1 must specify SCENARIO_MYOPIA_BLOCKED');

  const refSpecPath2 = path.join(repoRoot, 'orbitstack-gemini/references/agent-cognitive-audit-specification.md');
  const refSpecContent2 = readFileSync(refSpecPath2, 'utf8');
  assert.match(refSpecContent2, /十九、 生产驱动的主动系统演进与反情境蒙蔽审计规程/, 'ref audit spec 2 must document Section 19');
  assert.match(refSpecContent2, /UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED/, 'ref audit spec 2 must specify UNAUTHORIZED_SYSTEM_MUTATION_BLOCKED');
});


test('gemini adapter enforces subagent full-lifecycle job ticket and diagnostic completeness gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Subagent full-lifecycle job ticket & diagnostic completeness gate/, 'must document subagent dispatch gate');
  assert.match(content, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(content, /SHALLOW_OVERVIEW_DISPATCH_BLOCKED/, 'must specify SHALLOW_OVERVIEW_DISPATCH_BLOCKED');
  assert.match(content, /MANDATORY_JOB_TICKET_COMPLETENESS/, 'must specify MANDATORY_JOB_TICKET_COMPLETENESS');
  assert.match(content, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');
  assert.match(content, /LAZY_REBUKE_DISPATCH_BLOCKED/, 'must specify LAZY_REBUKE_DISPATCH_BLOCKED');
  assert.match(content, /FOUR_LIFECYCLE_TICKET_ARCHETYPES/, 'must specify FOUR_LIFECYCLE_TICKET_ARCHETYPES');
  assert.match(content, /JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED/, 'must specify JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED');
  assert.match(content, /SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL/, 'must specify SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL');
  assert.match(content, /TASK_DISPATCH_REJECTED/, 'must specify TASK_DISPATCH_REJECTED');
  assert.match(content, /SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT/, 'must specify SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT');
  assert.match(content, /UNIVERSAL_DISPATCH_STANDARD/, 'must specify UNIVERSAL_DISPATCH_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /子 Agent 全生命周期工单完备性与物理诊断物料法定公理/, 'GEMINI.md must contain Axiom 42');
  assert.match(globalRules, /Subagent Full-Lifecycle Job Ticket & Diagnostic Completeness Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'GEMINI.md must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(globalRules, /SHALLOW_OVERVIEW_DISPATCH_BLOCKED/, 'GEMINI.md must specify SHALLOW_OVERVIEW_DISPATCH_BLOCKED');
  assert.match(globalRules, /MANDATORY_JOB_TICKET_COMPLETENESS/, 'GEMINI.md must specify MANDATORY_JOB_TICKET_COMPLETENESS');
  assert.match(globalRules, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'GEMINI.md must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');
  assert.match(globalRules, /LAZY_REBUKE_DISPATCH_BLOCKED/, 'GEMINI.md must specify LAZY_REBUKE_DISPATCH_BLOCKED');
  assert.match(globalRules, /FOUR_LIFECYCLE_TICKET_ARCHETYPES/, 'GEMINI.md must specify FOUR_LIFECYCLE_TICKET_ARCHETYPES');
  assert.match(globalRules, /JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED/, 'GEMINI.md must specify JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED');
  assert.match(globalRules, /SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL/, 'GEMINI.md must specify SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL');
  assert.match(globalRules, /TASK_DISPATCH_REJECTED/, 'GEMINI.md must specify TASK_DISPATCH_REJECTED');
  assert.match(globalRules, /SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT/, 'GEMINI.md must specify SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT');
  assert.match(globalRules, /UNIVERSAL_DISPATCH_STANDARD/, 'GEMINI.md must specify UNIVERSAL_DISPATCH_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /子 Agent 全生命周期工单完备性与物理诊断物料法定公理/, 'pstack skill must contain Axiom 44');
  assert.match(pstackSkill, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'pstack skill must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(pstackSkill, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'pstack skill must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /子 Agent 全生命周期工单完备性与物理诊断物料法定公理/, 'ai-harness skill must contain Invariant 39');
  assert.match(aiHarnessSkill, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'ai-harness skill must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(aiHarnessSkill, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'ai-harness skill must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /30. Subagent Full-Lifecycle Job Ticket & Diagnostic Completeness Engine/, 'docs must document Section 30');
  assert.match(docsContent, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'docs must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(docsContent, /SHALLOW_OVERVIEW_DISPATCH_BLOCKED/, 'docs must specify SHALLOW_OVERVIEW_DISPATCH_BLOCKED');
  assert.match(docsContent, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'docs must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /二十、 子 Agent 全生命周期工单完备性与物理诊断物料审计规程/, 'audit spec must document Section 20');
  assert.match(specContent, /Subagent Full-Lifecycle Job Ticket & Diagnostic Completeness Protocol/, 'audit spec must contain Section 20 English title');
  assert.match(specContent, /ANTI_SHALLOW_DISPATCH_AXIOM/, 'audit spec must specify ANTI_SHALLOW_DISPATCH_AXIOM');
  assert.match(specContent, /SHALLOW_OVERVIEW_DISPATCH_BLOCKED/, 'audit spec must specify SHALLOW_OVERVIEW_DISPATCH_BLOCKED');
  assert.match(specContent, /MANDATORY_JOB_TICKET_COMPLETENESS/, 'audit spec must specify MANDATORY_JOB_TICKET_COMPLETENESS');
  assert.match(specContent, /REWORK_DIAGNOSTIC_CLOSURE_AXIOM/, 'audit spec must specify REWORK_DIAGNOSTIC_CLOSURE_AXIOM');
  assert.match(specContent, /LAZY_REBUKE_DISPATCH_BLOCKED/, 'audit spec must specify LAZY_REBUKE_DISPATCH_BLOCKED');
  assert.match(specContent, /FOUR_LIFECYCLE_TICKET_ARCHETYPES/, 'audit spec must specify FOUR_LIFECYCLE_TICKET_ARCHETYPES');
  assert.match(specContent, /JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED/, 'audit spec must specify JOB_TICKET_ARCHETYPE_VIOLATION_BLOCKED');
  assert.match(specContent, /SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL/, 'audit spec must specify SUBAGENT_PUSHBACK_&_REFUSAL_PROTOCOL');
  assert.match(specContent, /TASK_DISPATCH_REJECTED/, 'audit spec must specify TASK_DISPATCH_REJECTED');
  assert.match(specContent, /SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT/, 'audit spec must specify SUBAGENT_EMPIRICAL_FALSIFICATION_RIGHT');
  assert.match(specContent, /UNIVERSAL_DISPATCH_STANDARD/, 'audit spec must specify UNIVERSAL_DISPATCH_STANDARD');

  // Verify references copies
  const refSpecPath1 = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent1 = readFileSync(refSpecPath1, 'utf8');
  assert.match(refSpecContent1, /二十、 子 Agent 全生命周期工单完备性与物理诊断物料审计规程/, 'ref audit spec 1 must document Section 20');
  assert.match(refSpecContent1, /SHALLOW_OVERVIEW_DISPATCH_BLOCKED/, 'ref audit spec 1 must specify SHALLOW_OVERVIEW_DISPATCH_BLOCKED');

  const refSpecPath2 = path.join(repoRoot, 'orbitstack-gemini/references/agent-cognitive-audit-specification.md');
  const refSpecContent2 = readFileSync(refSpecPath2, 'utf8');
  assert.match(refSpecContent2, /二十、 子 Agent 全生命周期工单完备性与物理诊断物料审计规程/, 'ref audit spec 2 must document Section 20');
  assert.match(refSpecContent2, /LAZY_REBUKE_DISPATCH_BLOCKED/, 'ref audit spec 2 must specify LAZY_REBUKE_DISPATCH_BLOCKED');
});


test('gemini adapter enforces master-subagent governance-execution boundary and full-specification handoff gate', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Master-subagent governance-execution boundary & full-specification handoff gate/, 'must document boundary gate');
  assert.match(content, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(content, /MASTER_AD_HOC_CODING_BLOCKED/, 'must specify MASTER_AD_HOC_CODING_BLOCKED');
  assert.match(content, /SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE/, 'must specify SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE');
  assert.match(content, /SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED/, 'must specify SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED');
  assert.match(content, /MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL/, 'must specify MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL');
  assert.match(content, /SHALLOW_SPEC_HANDOFF_BLOCKED/, 'must specify SHALLOW_SPEC_HANDOFF_BLOCKED');
  assert.match(content, /GOVERNANCE_EXECUTION_SEPARATION_GATE/, 'must specify GOVERNANCE_EXECUTION_SEPARATION_GATE');
  assert.match(content, /UNIVERSAL_BOUNDARY_HANDOFF_STANDARD/, 'must specify UNIVERSAL_BOUNDARY_HANDOFF_STANDARD');

  // Verify GEMINI.md global rules
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8');
  assert.match(globalRules, /主子 Agent 统筹规划与执行施工物理边界及全量资料法定交接公理/, 'GEMINI.md must contain Axiom 43');
  assert.match(globalRules, /Master-Subagent Governance-Execution Boundary & Full-Specification Handoff Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'GEMINI.md must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(globalRules, /MASTER_AD_HOC_CODING_BLOCKED/, 'GEMINI.md must specify MASTER_AD_HOC_CODING_BLOCKED');
  assert.match(globalRules, /SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE/, 'GEMINI.md must specify SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE');
  assert.match(globalRules, /SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED/, 'GEMINI.md must specify SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED');
  assert.match(globalRules, /MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL/, 'GEMINI.md must specify MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL');
  assert.match(globalRules, /SHALLOW_SPEC_HANDOFF_BLOCKED/, 'GEMINI.md must specify SHALLOW_SPEC_HANDOFF_BLOCKED');
  assert.match(globalRules, /GOVERNANCE_EXECUTION_SEPARATION_GATE/, 'GEMINI.md must specify GOVERNANCE_EXECUTION_SEPARATION_GATE');
  assert.match(globalRules, /UNIVERSAL_BOUNDARY_HANDOFF_STANDARD/, 'GEMINI.md must specify UNIVERSAL_BOUNDARY_HANDOFF_STANDARD');

  // Verify skills/pstack-openspec/SKILL.md
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /主子 Agent 统筹规划与执行施工物理边界及全量资料法定交接公理/, 'pstack skill must contain Axiom 45');
  assert.match(pstackSkill, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'pstack skill must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(pstackSkill, /GOVERNANCE_EXECUTION_SEPARATION_GATE/, 'pstack skill must specify GOVERNANCE_EXECUTION_SEPARATION_GATE');

  // Verify skills/ai-harness-openspec/SKILL.md
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /主子 Agent 统筹规划与执行施工物理边界及全量资料法定交接公理/, 'ai-harness skill must contain Invariant 40');
  assert.match(aiHarnessSkill, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'ai-harness skill must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(aiHarnessSkill, /GOVERNANCE_EXECUTION_SEPARATION_GATE/, 'ai-harness skill must specify GOVERNANCE_EXECUTION_SEPARATION_GATE');

  // Verify docs/ps-openspec-gemini-system.md
  const docsPath = path.join(repoRoot, 'docs/ps-openspec-gemini-system.md');
  const docsContent = readFileSync(docsPath, 'utf8');
  assert.match(docsContent, /31. Master-Subagent Governance-Execution Boundary & Full-Specification Handoff Engine/, 'docs must document Section 31');
  assert.match(docsContent, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'docs must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(docsContent, /MASTER_AD_HOC_CODING_BLOCKED/, 'docs must specify MASTER_AD_HOC_CODING_BLOCKED');
  assert.match(docsContent, /SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED/, 'docs must specify SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED');

  // Verify docs/agent-cognitive-audit-specification.md
  const specPath = path.join(repoRoot, 'docs/agent-cognitive-audit-specification.md');
  const specContent = readFileSync(specPath, 'utf8');
  assert.match(specContent, /二十一、 主子 Agent 统筹规划与执行施工物理边界及全量资料交接审计规程/, 'audit spec must document Section 21');
  assert.match(specContent, /Master-Subagent Governance-Execution Boundary & Full-Specification Handoff Protocol/, 'audit spec must contain Section 21 English title');
  assert.match(specContent, /MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE/, 'audit spec must specify MASTER_AGENT_GOVERNANCE_&_SYSTEMIC_HOLD_DIRECTIVE');
  assert.match(specContent, /MASTER_AD_HOC_CODING_BLOCKED/, 'audit spec must specify MASTER_AD_HOC_CODING_BLOCKED');
  assert.match(specContent, /SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE/, 'audit spec must specify SUBAGENT_PHYSICAL_EXECUTION_DOMAIN_DIRECTIVE');
  assert.match(specContent, /SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED/, 'audit spec must specify SUBAGENT_OUT_OF_BOUNDS_MUTATION_BLOCKED');
  assert.match(specContent, /MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL/, 'audit spec must specify MANDATORY_FULL_SPECIFICATION_HANDOFF_PROTOCOL');
  assert.match(specContent, /SHALLOW_SPEC_HANDOFF_BLOCKED/, 'audit spec must specify SHALLOW_SPEC_HANDOFF_BLOCKED');
  assert.match(specContent, /GOVERNANCE_EXECUTION_SEPARATION_GATE/, 'audit spec must specify GOVERNANCE_EXECUTION_SEPARATION_GATE');
  assert.match(specContent, /UNIVERSAL_BOUNDARY_HANDOFF_STANDARD/, 'audit spec must specify UNIVERSAL_BOUNDARY_HANDOFF_STANDARD');

  // Verify references copies
  const refSpecPath1 = path.join(repoRoot, 'skills/pstack-openspec/references/agent-cognitive-audit-specification.md');
  const refSpecContent1 = readFileSync(refSpecPath1, 'utf8');
  assert.match(refSpecContent1, /二十一、 主子 Agent 统筹规划与执行施工物理边界及全量资料交接审计规程/, 'ref audit spec 1 must document Section 21');
  assert.match(refSpecContent1, /MASTER_AD_HOC_CODING_BLOCKED/, 'ref audit spec 1 must specify MASTER_AD_HOC_CODING_BLOCKED');

  const refSpecPath2 = path.join(repoRoot, 'orbitstack-gemini/references/agent-cognitive-audit-specification.md');
  const refSpecContent2 = readFileSync(refSpecPath2, 'utf8');
  assert.match(refSpecContent2, /二十一、 主子 Agent 统筹规划与执行施工物理边界及全量资料交接审计规程/, 'ref audit spec 2 must document Section 21');
  assert.match(refSpecContent2, /SHALLOW_SPEC_HANDOFF_BLOCKED/, 'ref audit spec 2 must specify SHALLOW_SPEC_HANDOFF_BLOCKED');
});


test('gemini adapter validates high-star action skills desktop-exe-development and ui-ux-design-engineering', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Action skill layer and methodology catalog/, 'must document action skill catalog');
  assert.match(content, /desktop-exe-development/, 'must register desktop-exe-development');
  assert.match(content, /ui-ux-design-engineering/, 'must register ui-ux-design-engineering');

  // Verify skills/desktop-exe-development/SKILL.md exists and is valid
  const desktopExeSkillPath = path.join(repoRoot, 'skills/desktop-exe-development/SKILL.md');
  assert(existsSync(desktopExeSkillPath), 'skills/desktop-exe-development/SKILL.md must exist');
  const desktopExeContent = readFileSync(desktopExeSkillPath, 'utf8');
  assert.match(desktopExeContent, /name: desktop-exe-development/, 'must define correct name');
  assert.match(desktopExeContent, /85,000\+\s*⭐/, 'must document 85k+ stars');
  assert.match(desktopExeContent, /tauri\.conf\.json/, 'must document tauri config');
  assert.match(desktopExeContent, /NSIS/, 'must document NSIS bundling');

  // Verify skills/ui-ux-design-engineering/SKILL.md exists and is valid
  const uiUxSkillPath = path.join(repoRoot, 'skills/ui-ux-design-engineering/SKILL.md');
  assert(existsSync(uiUxSkillPath), 'skills/ui-ux-design-engineering/SKILL.md must exist');
  const uiUxContent = readFileSync(uiUxSkillPath, 'utf8');
  assert.match(uiUxContent, /name: ui-ux-design-engineering/, 'must define correct name');
  assert.match(uiUxContent, /10,000\+\s*⭐/, 'must document 10k+ stars');
  assert.match(uiUxContent, /Design Tokens/, 'must document Design Tokens');
  assert.match(uiUxContent, /Anti-AI-Slop/, 'must document Anti-AI-Slop');
  assert.match(uiUxContent, /WCAG 2\.2 AA/, 'must document WCAG 2.2 AA');

  // Verify sync-to-global includes new skills
  const syncMjsPath = path.join(repoRoot, 'scripts/sync-to-global.mjs');
  const syncMjsContent = readFileSync(syncMjsPath, 'utf8');
  assert.match(syncMjsContent, /desktop-exe-development/, 'sync-to-global must sync desktop-exe-development');
  assert.match(syncMjsContent, /ui-ux-design-engineering/, 'sync-to-global must sync ui-ux-design-engineering');
});

test('gemini adapter enforces UI Radical Text Economy invariant and microcopy minimalism gate', () => {
  const uiUxSkillPath = path.join(repoRoot, 'skills/ui-ux-design-engineering/SKILL.md');
  assert(existsSync(uiUxSkillPath), 'skills/ui-ux-design-engineering/SKILL.md must exist');
  const uiUxContent = readFileSync(uiUxSkillPath, 'utf8');

  // Verify Radical Text Economy Axiom
  assert.match(uiUxContent, /RADICAL_TEXT_ECONOMY_AXIOM/, 'must define RADICAL_TEXT_ECONOMY_AXIOM');
  assert.match(uiUxContent, /少字原则与极致微文案法定防线/, 'must define Radical Text Economy section');
  assert.match(uiUxContent, /宁可不写字，也要避免产生过多的文本说明影响视觉/, 'must embody the verbatim axiom');

  // Verify Visual Affordance First
  assert.match(uiUxContent, /视觉自明性优先准则/, 'must define Visual Affordance First');
  assert.match(uiUxContent, /文字拐杖/, 'must forbid textual crutches');

  // Verify Microcopy Minimalism & Operational Card Zero-Prose Rule
  assert.match(uiUxContent, /极简微文案硬性指标/, 'must define microcopy limits');
  assert.match(uiUxContent, /1~3\s*个汉字或英文单词/, 'must bound action labels to 1-3 words');
  assert.match(uiUxContent, /业务卡片零废话公理/, 'must define Zero-Prose in Operational Cards');
  assert.match(uiUxContent, /严禁默认嵌入说明性正文段落/, 'must forbid boilerplate descriptive paragraphs in cards');

  // Verify Anti-Textual-AI-Slop Gate
  assert.match(uiUxContent, /文本说明泛滥与卡片解释堆砌/, 'must ban explanatory bloat in Anti-AI-Slop');
  assert.match(uiUxContent, /AI_SLOP_PROSE_VIOLATION/, 'must define AI_SLOP_PROSE_VIOLATION rejection gate');
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
