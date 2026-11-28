import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /两阶双轨通用深度审计体系/, 'GEMINI.md must contain Two-Step Dual-Scope section');
  assert.match(globalRules, /Two-Step Dual-Scope Deep Audit Axiom/, 'GEMINI.md must contain Axiom 24');
  assert.match(globalRules, /Step 1 优先运行/, 'GEMINI.md must declare Step 1 mechanical audit');
  assert.match(globalRules, /Step 2 对照 Specs 核销/, 'GEMINI.md must declare Step 2 cognitive audit');
  assert.match(globalRules, /Step 2 对照 Specs 核销/, 'GEMINI.md must declare dual-scope specification governance');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /用户规范全量通读与任务后主动认知审计公理/, 'GEMINI.md must contain Axiom 28');
  assert.match(globalRules, /Mandatory User-Specification Ingestion & Active Post-Task Agent Audit Axiom/, 'GEMINI.md must contain English title');
  assert.match(globalRules, /用户规范与方案全量通读公理/, 'GEMINI.md must declare full ingestion axiom');
  assert.match(globalRules, /双阶结合与主动找茬公理/, 'GEMINI.md must declare active bug hunting axiom');
  assert.match(globalRules, /1:1 双向核销清算表/, 'GEMINI.md Step 5 must mandate bidirectional checkoff');
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

test('gemini adapter enforces mutation anti-fraud, negative proof, and on-demand interrogation', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Mutation anti-fraud & negative proof deep audit gate/, 'must declare mutation gate');
  assert.match(content, /TRIVIAL_ASSERTION_FRAUD/, 'must declare trivial assertion fraud');
  assert.match(content, /On-Demand Independent Interrogation & Dynamic Tiering/, 'must use on-demand interrogation');
  assert.match(content, /Two-Strike Machine Escalation/, 'must enforce two-strike machine escalation');
});

test('gemini adapter enforces role boundaries, existing agent reuse, and Pstack-aligned delegation', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Role boundaries, existing agent reuse & Pstack-aligned delegation/, 'must declare role boundaries & reuse');
  assert.match(content, /Existing Subagent & Swarm Reuse First/, 'must prioritize existing subagent/swarm reuse');
  assert.match(content, /L2 Machine Gates First/, 'must prioritize zero-token L2 machine gates');
  assert.match(content, /Four-in-One Lossless Handoff Capsule/, 'must retain lossless handoff capsule');
  assert.doesNotMatch(content, /MASTER_AD_HOC_CODING_BLOCKED/, 'must not ban main agent from routine coding');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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

test('gemini adapter enforces cognitive triad evolution and role-scoped dispatch', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Cognitive triad evolution & kitchen-brigade scheduling gate/, 'must declare cognitive triad gate');
  assert.match(content, /Role-Scoped Dispatch Protocol/, 'must declare role-scoped dispatch');
  assert.doesNotMatch(content, /ORCHESTRATOR_DIRECT_DIRTY_WRITE_BLOCKED/, 'must not enforce orchestrator dirty write block');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
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


test('gemini adapter enforces master-subagent role boundaries and compact GEMINI.md skeleton', () => {
  const content = readFileSync(geminiAdapterPath, 'utf8');
  assert.match(content, /Master-subagent role boundaries & full-specification handoff/, 'must declare role boundaries');
  const skeleton = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  assert.ok(Buffer.byteLength(skeleton, 'utf8') < 32 * 1024, 'GEMINI.md skeleton must stay under 32KB to prevent truncation and quota bloat');
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

test('gemini adapter enforces statutory dual-gate entry precondition and anti-premature execution gate', () => {
  // 1. Verify GEMINI.md Axiom 44
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /44\.\s*\*\*双门禁绝对前置/, 'GEMINI.md must contain Axiom 44 number');
  assert.match(globalRules, /双门禁绝对前置、首轮只读停机与反擅自执行公理/, 'GEMINI.md must contain Axiom 44 title');
  assert.match(globalRules, /STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM/, 'GEMINI.md must contain English identifier');
  assert.match(globalRules, /PREMATURE_EXECUTION_BLOCKED/, 'GEMINI.md must specify PREMATURE_EXECUTION_BLOCKED');
  assert.match(globalRules, /AUTONOMY_SPATIOTEMPORAL_SCOPE_DISAMBIGUATION/, 'GEMINI.md must specify autonomy spatiotemporal scope disambiguation');
  assert.match(globalRules, /COMPREHENSION_BEFORE_EXECUTION_AXIOM/, 'GEMINI.md must specify comprehension before execution');
  assert.match(globalRules, /UNVERIFIED_INTENT_EXECUTION_BLOCKED/, 'GEMINI.md must specify UNVERIFIED_INTENT_EXECUTION_BLOCKED');
  assert.match(globalRules, /DUAL_GATE_ENTRY_PRECONDITION_GATE/, 'GEMINI.md must specify dual-gate entry precondition gate');
  assert.match(globalRules, /UNIVERSAL_DUAL_GATE_STANDARD/, 'GEMINI.md must specify domain neutrality standard');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 46
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM/, 'pstack-openspec must define Axiom 46');
  assert.match(pstackSkill, /PREMATURE_EXECUTION_BLOCKED/, 'pstack-openspec must specify PREMATURE_EXECUTION_BLOCKED');
  assert.match(pstackSkill, /AUTONOMY_SPATIOTEMPORAL_SCOPE_DISAMBIGUATION/, 'pstack-openspec must specify autonomy scope disambiguation');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 41
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /STATUTORY_DUAL_GATE_ENTRY_PRECONDITION_AXIOM/, 'ai-harness-openspec must define Axiom 41');
  assert.match(aiHarnessSkill, /PREMATURE_EXECUTION_BLOCKED/, 'ai-harness-openspec must specify PREMATURE_EXECUTION_BLOCKED');

  // 4. Verify orbitstack-gemini/SKILL.md
  const geminiSkillPath = path.join(repoRoot, 'orbitstack-gemini/SKILL.md');
  const geminiSkill = readFileSync(geminiSkillPath, 'utf8');
  assert.match(geminiSkill, /PREMATURE_EXECUTION_BLOCKED/, 'orbitstack-gemini must specify PREMATURE_EXECUTION_BLOCKED');
  assert.match(geminiSkill, /Ps-openspec dual-gate entry preconditions/, 'orbitstack-gemini must specify dual-gate preconditions');

  // 5. Verify docs/pstack-openspec-route-map.json
  const routeMapPath = path.join(repoRoot, 'docs/pstack-openspec-route-map.json');
  const routeMap = JSON.parse(readFileSync(routeMapPath, 'utf8'));
  assert.match(routeMap.authorityPolicy, /dual-gate entry preconditions/, 'route map authority policy must declare dual-gate preconditions');
  const bugFixRoute = routeMap.routes.find(r => r.id === 'bug-fix');
  assert.ok(bugFixRoute, 'bug-fix route must exist');
  assert.match(bugFixRoute.gate, /Dual-gate entry precondition/, 'bug-fix route gate must enforce dual-gate precondition');
});

test('gemini adapter enforces project dual blacklist-whitelist audit system and dual-specimen sanity gate', () => {
  // 1. Verify GEMINI.md Axiom 45
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /45\.\s*\*\*项目级黑白名单双轨法定权威与双向标本自证公理/, 'GEMINI.md must contain Axiom 45 heading');
  assert.match(globalRules, /PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM/, 'GEMINI.md must specify PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM');
  assert.match(globalRules, /DUAL_BLACK_WHITE_REGISTRY_ARCHITECTURE/, 'GEMINI.md must specify DUAL_BLACK_WHITE_REGISTRY_ARCHITECTURE');
  assert.match(globalRules, /WHITELIST_SUPREME_IMMUNITY_AXIOM/, 'GEMINI.md must specify WHITELIST_SUPREME_IMMUNITY_AXIOM');
  assert.match(globalRules, /FALSE_POSITIVE_OVERHAUL_BLOCKED/, 'GEMINI.md must specify FALSE_POSITIVE_OVERHAUL_BLOCKED');
  assert.match(globalRules, /BLACKLIST_MANDATORY_INTERCEPTION_AXIOM/, 'GEMINI.md must specify BLACKLIST_MANDATORY_INTERCEPTION_AXIOM');
  assert.match(globalRules, /AUDIT_LEAKAGE_DETECTED/, 'GEMINI.md must specify AUDIT_LEAKAGE_DETECTED');
  assert.match(globalRules, /DUAL_SPECIMEN_SANITY_GATE/, 'GEMINI.md must specify DUAL_SPECIMEN_SANITY_GATE');
  assert.match(globalRules, /UNVERIFIED_RULE_MUTATION_BLOCKED/, 'GEMINI.md must specify UNVERIFIED_RULE_MUTATION_BLOCKED');
  assert.match(globalRules, /UNIVERSAL_AUDIT_ACCURACY_STANDARD/, 'GEMINI.md must specify domain neutrality standard');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 47
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /47\.\s*\*\*项目级黑白名单双轨法定权威与双向标本自证公理/, 'pstack-openspec must define Axiom 47');
  assert.match(pstackSkill, /PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM/, 'pstack-openspec must specify PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM');
  assert.match(pstackSkill, /WHITELIST_SUPREME_IMMUNITY_AXIOM/, 'pstack-openspec must specify WHITELIST_SUPREME_IMMUNITY_AXIOM');
  assert.match(pstackSkill, /FALSE_POSITIVE_OVERHAUL_BLOCKED/, 'pstack-openspec must specify FALSE_POSITIVE_OVERHAUL_BLOCKED');
  assert.match(pstackSkill, /BLACKLIST_MANDATORY_INTERCEPTION_AXIOM/, 'pstack-openspec must specify BLACKLIST_MANDATORY_INTERCEPTION_AXIOM');
  assert.match(pstackSkill, /AUDIT_LEAKAGE_DETECTED/, 'pstack-openspec must specify AUDIT_LEAKAGE_DETECTED');
  assert.match(pstackSkill, /DUAL_SPECIMEN_SANITY_GATE/, 'pstack-openspec must specify DUAL_SPECIMEN_SANITY_GATE');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 42
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /42\.\s*\*\*项目级黑白名单双轨法定权威与双向标本自证公理/, 'ai-harness-openspec must define Axiom 42');
  assert.match(aiHarnessSkill, /PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM/, 'ai-harness-openspec must specify PROJECT_DUAL_BLACK_WHITE_REGISTRY_AXIOM');
  assert.match(aiHarnessSkill, /WHITELIST_SUPREME_IMMUNITY_AXIOM/, 'ai-harness-openspec must specify WHITELIST_SUPREME_IMMUNITY_AXIOM');
  assert.match(aiHarnessSkill, /FALSE_POSITIVE_OVERHAUL_BLOCKED/, 'ai-harness-openspec must specify FALSE_POSITIVE_OVERHAUL_BLOCKED');
  assert.match(aiHarnessSkill, /BLACKLIST_MANDATORY_INTERCEPTION_AXIOM/, 'ai-harness-openspec must specify BLACKLIST_MANDATORY_INTERCEPTION_AXIOM');
  assert.match(aiHarnessSkill, /DUAL_SPECIMEN_SANITY_GATE/, 'ai-harness-openspec must specify DUAL_SPECIMEN_SANITY_GATE');
});


test('gemini adapter enforces system core mutation dual-gate governance and generality preservation gate', () => {
  // 1. Verify GEMINI.md Axiom 46
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /46\.\s*\*\*系统根本功能修改双门禁专项审批与系统通用性神圣不可牺牲公理/, 'GEMINI.md must contain Axiom 46 heading');
  assert.match(globalRules, /SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM/, 'GEMINI.md must specify SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM');
  assert.match(globalRules, /SYSTEM_MUTATION_CLASSIFICATION_AXIOM/, 'GEMINI.md must specify SYSTEM_MUTATION_CLASSIFICATION_AXIOM');
  assert.match(globalRules, /SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE/, 'GEMINI.md must specify SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE');
  assert.match(globalRules, /GENERALITY_PRESERVATION_AXIOM/, 'GEMINI.md must specify GENERALITY_PRESERVATION_AXIOM');
  assert.match(globalRules, /SCENARIO_SYSTEM_MUTATION_BLOCKED/, 'GEMINI.md must specify SCENARIO_SYSTEM_MUTATION_BLOCKED');
  assert.match(globalRules, /MECHANISM_POLICY_ORTHOGONAL_DECOUPLING/, 'GEMINI.md must specify MECHANISM_POLICY_ORTHOGONAL_DECOUPLING');
  assert.match(globalRules, /UNIVERSAL_SYSTEM_INTEGRITY_STANDARD/, 'GEMINI.md must specify UNIVERSAL_SYSTEM_INTEGRITY_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 48
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /48\.\s*\*\*系统根本功能修改双门禁专项审批与系统通用性神圣不可牺牲公理/, 'pstack-openspec must define Axiom 48');
  assert.match(pstackSkill, /SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM/, 'pstack-openspec must specify SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM');
  assert.match(pstackSkill, /SYSTEM_MUTATION_CLASSIFICATION_AXIOM/, 'pstack-openspec must specify SYSTEM_MUTATION_CLASSIFICATION_AXIOM');
  assert.match(pstackSkill, /SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE/, 'pstack-openspec must specify SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE');
  assert.match(pstackSkill, /GENERALITY_PRESERVATION_AXIOM/, 'pstack-openspec must specify GENERALITY_PRESERVATION_AXIOM');
  assert.match(pstackSkill, /SCENARIO_SYSTEM_MUTATION_BLOCKED/, 'pstack-openspec must specify SCENARIO_SYSTEM_MUTATION_BLOCKED');
  assert.match(pstackSkill, /MECHANISM_POLICY_ORTHOGONAL_DECOUPLING/, 'pstack-openspec must specify MECHANISM_POLICY_ORTHOGONAL_DECOUPLING');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 43
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /43\.\s*\*\*系统根本功能修改双门禁专项审批与系统通用性神圣不可牺牲公理/, 'ai-harness-openspec must define Axiom 43');
  assert.match(aiHarnessSkill, /SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM/, 'ai-harness-openspec must specify SYSTEM_CORE_MUTATION_GOVERNANCE_&_GENERALITY_PRESERVATION_AXIOM');
  assert.match(aiHarnessSkill, /SYSTEM_MUTATION_CLASSIFICATION_AXIOM/, 'ai-harness-openspec must specify SYSTEM_MUTATION_CLASSIFICATION_AXIOM');
  assert.match(aiHarnessSkill, /SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE/, 'ai-harness-openspec must specify SYSTEM_CORE_MUTATION_SPECIAL_APPROVAL_GATE');
  assert.match(aiHarnessSkill, /GENERALITY_PRESERVATION_AXIOM/, 'ai-harness-openspec must specify GENERALITY_PRESERVATION_AXIOM');
  assert.match(aiHarnessSkill, /SCENARIO_SYSTEM_MUTATION_BLOCKED/, 'ai-harness-openspec must specify SCENARIO_SYSTEM_MUTATION_BLOCKED');
  assert.match(aiHarnessSkill, /MECHANISM_POLICY_ORTHOGONAL_DECOUPLING/, 'ai-harness-openspec must specify MECHANISM_POLICY_ORTHOGONAL_DECOUPLING');
});


test('gemini adapter enforces lead agent recurrence prevention governance and anti-apology gate', () => {
  // 1. Verify GEMINI.md Axiom 47
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /47\.\s*\*\*主智能体工程统领责任与避免重蹈覆辙高于道歉公理/, 'GEMINI.md must contain Axiom 47 heading');
  assert.match(globalRules, /LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM/, 'GEMINI.md must specify LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM');
  assert.match(globalRules, /LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE/, 'GEMINI.md must specify LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE');
  assert.match(globalRules, /LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM/, 'GEMINI.md must specify LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM');
  assert.match(globalRules, /SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE/, 'GEMINI.md must specify SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE');
  assert.match(globalRules, /PREVENT_RECURRENCE_MECHANICAL_ESCALATION/, 'GEMINI.md must specify PREVENT_RECURRENCE_MECHANICAL_ESCALATION');
  assert.match(globalRules, /UNIVERSAL_LEAD_GOVERNANCE_STANDARD/, 'GEMINI.md must specify UNIVERSAL_LEAD_GOVERNANCE_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 49
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /49\.\s*\*\*主智能体工程统领责任与避免重蹈覆辙高于道歉公理/, 'pstack-openspec must define Axiom 49');
  assert.match(pstackSkill, /LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM/, 'pstack-openspec must specify LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM');
  assert.match(pstackSkill, /LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE/, 'pstack-openspec must specify LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE');
  assert.match(pstackSkill, /LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM/, 'pstack-openspec must specify LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM');
  assert.match(pstackSkill, /SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE/, 'pstack-openspec must specify SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE');
  assert.match(pstackSkill, /PREVENT_RECURRENCE_MECHANICAL_ESCALATION/, 'pstack-openspec must specify PREVENT_RECURRENCE_MECHANICAL_ESCALATION');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 44
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /44\.\s*\*\*主智能体工程统领责任与避免重蹈覆辙高于道歉公理/, 'ai-harness-openspec must define Axiom 44');
  assert.match(aiHarnessSkill, /LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM/, 'ai-harness-openspec must specify LEAD_AGENT_RECURRENCE_PREVENTION_OVER_APOLOGY_AXIOM');
  assert.match(aiHarnessSkill, /LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE/, 'ai-harness-openspec must specify LEAD_AGENT_SYSTEMIC_GOVERNANCE_ROLE');
  assert.match(aiHarnessSkill, /LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM/, 'ai-harness-openspec must specify LEAD_ERROR_SWARM_INEVITABLE_RECURRENCE_AXIOM');
  assert.match(aiHarnessSkill, /SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE/, 'ai-harness-openspec must specify SUPERFICIAL_APOLOGY_ZERO_TOLERANCE_GATE');
  assert.match(aiHarnessSkill, /PREVENT_RECURRENCE_MECHANICAL_ESCALATION/, 'ai-harness-openspec must specify PREVENT_RECURRENCE_MECHANICAL_ESCALATION');
});


test('gemini adapter enforces human-decreed specification supremacy, domain-agnostic purity, and anti-common-sense arrogance gate', () => {
  // 1. Verify GEMINI.md Axiom 48
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /48\.\s*\*\*用户明示规约最高法定豁免与治理体系纯通用抽象公理/, 'GEMINI.md must contain Axiom 48 heading');
  assert.match(globalRules, /HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM/, 'GEMINI.md must specify HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM');
  assert.match(globalRules, /ANTI_COMMON_SENSE_ARROGANCE_BLOCKED/, 'GEMINI.md must specify ANTI_COMMON_SENSE_ARROGANCE_BLOCKED');
  assert.match(globalRules, /GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM/, 'GEMINI.md must specify GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM');
  assert.match(globalRules, /SCENARIO_ANCHORING_LINT_BLOCKED/, 'GEMINI.md must specify SCENARIO_ANCHORING_LINT_BLOCKED');
  assert.match(globalRules, /REAL_DEFECT_ATTENTION_PRIORITY_GATE/, 'GEMINI.md must specify REAL_DEFECT_ATTENTION_PRIORITY_GATE');
  assert.match(globalRules, /UNIVERSAL_BEHAVIORAL_GOVERNANCE_STANDARD/, 'GEMINI.md must specify UNIVERSAL_BEHAVIORAL_GOVERNANCE_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 50
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /50\.\s*\*\*用户明示规约最高法定豁免与治理体系纯通用抽象公理/, 'pstack-openspec must define Axiom 50');
  assert.match(pstackSkill, /HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM/, 'pstack-openspec must specify HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM');
  assert.match(pstackSkill, /ANTI_COMMON_SENSE_ARROGANCE_BLOCKED/, 'pstack-openspec must specify ANTI_COMMON_SENSE_ARROGANCE_BLOCKED');
  assert.match(pstackSkill, /GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM/, 'pstack-openspec must specify GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM');
  assert.match(pstackSkill, /REAL_DEFECT_ATTENTION_PRIORITY_GATE/, 'pstack-openspec must specify REAL_DEFECT_ATTENTION_PRIORITY_GATE');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 45
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /45\.\s*\*\*用户明示规约最高法定豁免与治理体系纯通用抽象公理/, 'ai-harness-openspec must define Axiom 45');
  assert.match(aiHarnessSkill, /HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM/, 'ai-harness-openspec must specify HUMAN_DECREED_SPECIFICATION_SUPREMACY_AXIOM');
  assert.match(aiHarnessSkill, /ANTI_COMMON_SENSE_ARROGANCE_BLOCKED/, 'ai-harness-openspec must specify ANTI_COMMON_SENSE_ARROGANCE_BLOCKED');
  assert.match(aiHarnessSkill, /GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM/, 'ai-harness-openspec must specify GOVERNANCE_SYSTEM_DOMAIN_AGNOSTIC_PURITY_AXIOM');
  assert.match(aiHarnessSkill, /REAL_DEFECT_ATTENTION_PRIORITY_GATE/, 'ai-harness-openspec must specify REAL_DEFECT_ATTENTION_PRIORITY_GATE');
});


test('gemini adapter enforces Gate 1 Markdown materialization, zero goal loss, and layered degradation circuit breaker', () => {
  // 1. Verify GEMINI.md Axiom 49
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /49\.\s*\*\*第一门禁实体化与双门禁全链路目标零损耗传递公理/, 'GEMINI.md must contain Axiom 49 heading');
  assert.match(globalRules, /GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM/, 'GEMINI.md must specify GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM');
  assert.match(globalRules, /GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL/, 'GEMINI.md must specify GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL');
  assert.match(globalRules, /GATE1_ASSET_MISSING/, 'GEMINI.md must specify GATE1_ASSET_MISSING');
  assert.match(globalRules, /RAW_INSTRUCTION_VERBATIM_MIRROR_AXIOM/, 'GEMINI.md must specify RAW_INSTRUCTION_VERBATIM_MIRROR_AXIOM');
  assert.match(globalRules, /GATE1_DEEP_FORENSIC_FEEDBACK_CONTRACT/, 'GEMINI.md must specify GATE1_DEEP_FORENSIC_FEEDBACK_CONTRACT');
  assert.match(globalRules, /GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE/, 'GEMINI.md must specify GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE');
  assert.match(globalRules, /EXECUTION_PHASE_GOAL_INVARIANCE_LOCK/, 'GEMINI.md must specify EXECUTION_PHASE_GOAL_INVARIANCE_LOCK');
  assert.match(globalRules, /GOAL_DEGRADATION_DETECTED/, 'GEMINI.md must specify GOAL_DEGRADATION_DETECTED');
  assert.match(globalRules, /GATE1_GOAL_OMISSION_BLOCKED/, 'GEMINI.md must specify GATE1_GOAL_OMISSION_BLOCKED');
  assert.match(globalRules, /UNIVERSAL_GOAL_PRESERVATION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_GOAL_PRESERVATION_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 51
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /51\.\s*\*\*第一门禁实体化与双门禁全链路目标零损耗传递公理/, 'pstack-openspec must define Axiom 51');
  assert.match(pstackSkill, /GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM/, 'pstack-openspec must specify GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM');
  assert.match(pstackSkill, /GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL/, 'pstack-openspec must specify GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL');
  assert.match(pstackSkill, /GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE/, 'pstack-openspec must specify GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE');
  assert.match(pstackSkill, /EXECUTION_PHASE_GOAL_INVARIANCE_LOCK/, 'pstack-openspec must specify EXECUTION_PHASE_GOAL_INVARIANCE_LOCK');
  assert.match(pstackSkill, /GOAL_DEGRADATION_DETECTED/, 'pstack-openspec must specify GOAL_DEGRADATION_DETECTED');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 46
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /46\.\s*\*\*第一门禁实体化与双门禁全链路目标零损耗传递公理/, 'ai-harness-openspec must define Axiom 46');
  assert.match(aiHarnessSkill, /GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM/, 'ai-harness-openspec must specify GATE1_MATERIALIZATION_&_END_TO_END_GOAL_PRESERVATION_AXIOM');
  assert.match(aiHarnessSkill, /GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL/, 'ai-harness-openspec must specify GATE1_MARKDOWN_MATERIALIZATION_PROTOCOL');
  assert.match(aiHarnessSkill, /GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE/, 'ai-harness-openspec must specify GATE2_OPENSPEC_ZERO_GOAL_LOSS_INHERITANCE');
  assert.match(aiHarnessSkill, /EXECUTION_PHASE_GOAL_INVARIANCE_LOCK/, 'ai-harness-openspec must specify EXECUTION_PHASE_GOAL_INVARIANCE_LOCK');
  assert.match(aiHarnessSkill, /GOAL_DEGRADATION_DETECTED/, 'ai-harness-openspec must specify GOAL_DEGRADATION_DETECTED');
});


test('gemini adapter enforces universal Ps-openspec coverage, zero-bypass blocking, and mandatory physical gate assets', () => {
  // 1. Verify GEMINI.md Axiom 50
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /50\.\s*\*\*Antigravity 全局全生命周期法定覆盖与零绕过公理/, 'GEMINI.md must contain Axiom 50 heading');
  assert.match(globalRules, /ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM/, 'GEMINI.md must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM');
  assert.match(globalRules, /ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL/, 'GEMINI.md must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL');
  assert.match(globalRules, /BYPASS_PS_OPENSPEC_BLOCKED/, 'GEMINI.md must specify BYPASS_PS_OPENSPEC_BLOCKED');
  assert.match(globalRules, /PHYSICAL_GATE_ASSET_MANDATORY_INGESTION/, 'GEMINI.md must specify PHYSICAL_GATE_ASSET_MANDATORY_INGESTION');
  assert.match(globalRules, /GLOBAL_CONSTITUTIONAL_SUPREME_STATUS/, 'GEMINI.md must specify GLOBAL_CONSTITUTIONAL_SUPREME_STATUS');
  assert.match(globalRules, /UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD/, 'GEMINI.md must specify UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 52
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /52\.\s*\*\*Antigravity 全局全生命周期法定覆盖与零绕过公理/, 'pstack-openspec must define Axiom 52');
  assert.match(pstackSkill, /ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM/, 'pstack-openspec must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM');
  assert.match(pstackSkill, /ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL/, 'pstack-openspec must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL');
  assert.match(pstackSkill, /BYPASS_PS_OPENSPEC_BLOCKED/, 'pstack-openspec must specify BYPASS_PS_OPENSPEC_BLOCKED');
  assert.match(pstackSkill, /PHYSICAL_GATE_ASSET_MANDATORY_INGESTION/, 'pstack-openspec must specify PHYSICAL_GATE_ASSET_MANDATORY_INGESTION');
  assert.match(pstackSkill, /GLOBAL_CONSTITUTIONAL_SUPREME_STATUS/, 'pstack-openspec must specify GLOBAL_CONSTITUTIONAL_SUPREME_STATUS');
  assert.match(pstackSkill, /UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD/, 'pstack-openspec must specify UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 47
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /47\.\s*\*\*Antigravity 全局全生命周期法定覆盖与零绕过公理/, 'ai-harness-openspec must define Axiom 47');
  assert.match(aiHarnessSkill, /ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM/, 'ai-harness-openspec must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_AXIOM');
  assert.match(aiHarnessSkill, /ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL/, 'ai-harness-openspec must specify ANTIGRAVITY_UNIVERSAL_COVERAGE_PROTOCOL');
  assert.match(aiHarnessSkill, /BYPASS_PS_OPENSPEC_BLOCKED/, 'ai-harness-openspec must specify BYPASS_PS_OPENSPEC_BLOCKED');
  assert.match(aiHarnessSkill, /PHYSICAL_GATE_ASSET_MANDATORY_INGESTION/, 'ai-harness-openspec must specify PHYSICAL_GATE_ASSET_MANDATORY_INGESTION');
  assert.match(aiHarnessSkill, /GLOBAL_CONSTITUTIONAL_SUPREME_STATUS/, 'ai-harness-openspec must specify GLOBAL_CONSTITUTIONAL_SUPREME_STATUS');
  assert.match(aiHarnessSkill, /UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD/, 'ai-harness-openspec must specify UNIVERSAL_GLOBAL_ENFORCEMENT_STANDARD');
});


test('gemini adapter enforces project-canonical OpenSpec Gate 1 dossier directory invariant and blocking gate', () => {
  // 1. Verify GEMINI.md Axiom 51
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /51\.\s*\*\*项目级 OpenSpec 第一门禁专属物理目录规范公理/, 'GEMINI.md must contain Axiom 51 heading');
  assert.match(globalRules, /PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM/, 'GEMINI.md must specify PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM');
  assert.match(globalRules, /PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION/, 'GEMINI.md must specify PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION');
  assert.match(globalRules, /GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT/, 'GEMINI.md must specify GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT');
  assert.match(globalRules, /GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED/, 'GEMINI.md must specify GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED');
  assert.match(globalRules, /GATE1_TO_OPENSPEC_PROJECT_INHERITANCE/, 'GEMINI.md must specify GATE1_TO_OPENSPEC_PROJECT_INHERITANCE');
  assert.match(globalRules, /UNIVERSAL_GATE1_DIRECTORY_STANDARD/, 'GEMINI.md must specify UNIVERSAL_GATE1_DIRECTORY_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 53
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /53\.\s*\*\*项目级 OpenSpec 第一门禁专属物理目录规范公理/, 'pstack-openspec must define Axiom 53');
  assert.match(pstackSkill, /PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM/, 'pstack-openspec must specify PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM');
  assert.match(pstackSkill, /PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION/, 'pstack-openspec must specify PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION');
  assert.match(pstackSkill, /GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT/, 'pstack-openspec must specify GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT');
  assert.match(pstackSkill, /GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED/, 'pstack-openspec must specify GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED');
  assert.match(pstackSkill, /GATE1_TO_OPENSPEC_PROJECT_INHERITANCE/, 'pstack-openspec must specify GATE1_TO_OPENSPEC_PROJECT_INHERITANCE');
  assert.match(pstackSkill, /UNIVERSAL_GATE1_DIRECTORY_STANDARD/, 'pstack-openspec must specify UNIVERSAL_GATE1_DIRECTORY_STANDARD');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 48
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /48\.\s*\*\*项目级 OpenSpec 第一门禁专属物理目录规范公理/, 'ai-harness-openspec must define Axiom 48');
  assert.match(aiHarnessSkill, /PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM/, 'ai-harness-openspec must specify PROJECT_CANONICAL_GATE1_DIRECTORY_AXIOM');
  assert.match(aiHarnessSkill, /PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION/, 'ai-harness-openspec must specify PROJECT_OPENSPEC_GATE1_DIRECTORY_SPECIFICATION');
  assert.match(aiHarnessSkill, /GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT/, 'ai-harness-openspec must specify GATE1_DOSSIER_PROJECT_STORAGE_CONTRACT');
  assert.match(aiHarnessSkill, /GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED/, 'ai-harness-openspec must specify GATE1_PROJECT_DIRECTORY_MISSING_BLOCKED');
  assert.match(aiHarnessSkill, /GATE1_TO_OPENSPEC_PROJECT_INHERITANCE/, 'ai-harness-openspec must specify GATE1_TO_OPENSPEC_PROJECT_INHERITANCE');
  assert.match(aiHarnessSkill, /UNIVERSAL_GATE1_DIRECTORY_STANDARD/, 'ai-harness-openspec must specify UNIVERSAL_GATE1_DIRECTORY_STANDARD');

  // 4. Verify physical directory exists in repo root
  const gate1Dir = path.join(repoRoot, 'openspec/gate1-dossiers');
  assert.ok(existsSync(gate1Dir), 'openspec/gate1-dossiers directory must exist');
});


test('gemini adapter enforces tri-phase global task execution strategy, triage rules, and anti-narrowing blocking mechanisms', () => {
  // 1. Verify GEMINI.md Axiom 52
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /52\.\s*\*\*全局任务执行三阶闭环与底层修改分流公理/, 'GEMINI.md must contain Axiom 52 heading');
  assert.match(globalRules, /TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM/, 'GEMINI.md must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM');
  assert.match(globalRules, /TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY/, 'GEMINI.md must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY');
  assert.match(globalRules, /UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL/, 'GEMINI.md must specify UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL');
  assert.match(globalRules, /SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM/, 'GEMINI.md must specify SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM');
  assert.match(globalRules, /ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED/, 'GEMINI.md must specify ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED');
  assert.match(globalRules, /UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD/, 'GEMINI.md must specify UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 54
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /54\.\s*\*\*全局任务执行三阶闭环与底层修改分流公理/, 'pstack-openspec must define Axiom 54');
  assert.match(pstackSkill, /TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM/, 'pstack-openspec must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM');
  assert.match(pstackSkill, /TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY/, 'pstack-openspec must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY');
  assert.match(pstackSkill, /UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL/, 'pstack-openspec must specify UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL');
  assert.match(pstackSkill, /SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM/, 'pstack-openspec must specify SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM');
  assert.match(pstackSkill, /ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED/, 'pstack-openspec must specify ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED');
  assert.match(pstackSkill, /UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD/, 'pstack-openspec must specify UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 49
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /49\.\s*\*\*全局任务执行三阶闭环与底层修改分流公理/, 'ai-harness-openspec must define Axiom 49');
  assert.match(aiHarnessSkill, /TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM/, 'ai-harness-openspec must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_AXIOM');
  assert.match(aiHarnessSkill, /TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY/, 'ai-harness-openspec must specify TRI_PHASE_GLOBAL_TASK_EXECUTION_STRATEGY');
  assert.match(aiHarnessSkill, /UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL/, 'ai-harness-openspec must specify UNIVERSAL_ABSTRACTION_&_CROSS_SCENARIO_IMMUNITY_PROTOCOL');
  assert.match(aiHarnessSkill, /SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM/, 'ai-harness-openspec must specify SYSTEM_MUTATION_VS_SCENARIO_POLICY_TRIAGE_AXIOM');
  assert.match(aiHarnessSkill, /ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED/, 'ai-harness-openspec must specify ANTI_SCENARIO_SYSTEM_NARROWING_BLOCKED');
  assert.match(aiHarnessSkill, /UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD/, 'ai-harness-openspec must specify UNIVERSAL_TASK_STRATEGY_GOVERNANCE_STANDARD');
});

test('gemini adapter enforces pipeline core generality, multi-scenario collaborative regression, and anti-hardcoding blocking mechanisms', () => {
  // 1. Verify GEMINI.md Axiom 53
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /53\.\s*\*\*流水线任务程序底层通用型保全与反单一任务硬编码公理/, 'GEMINI.md must contain Axiom 53 heading');
  assert.match(globalRules, /PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM/, 'GEMINI.md must specify PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM');
  assert.match(globalRules, /PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM/, 'GEMINI.md must specify PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM');
  assert.match(globalRules, /ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM/, 'GEMINI.md must specify ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM');
  assert.match(globalRules, /SINGLE_TASK_HARDCODING_BLOCKED/, 'GEMINI.md must specify SINGLE_TASK_HARDCODING_BLOCKED');
  assert.match(globalRules, /MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE/, 'GEMINI.md must specify MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE');
  assert.match(globalRules, /TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM/, 'GEMINI.md must specify TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM');
  assert.match(globalRules, /UNIVERSAL_PIPELINE_GENERALITY_STANDARD/, 'GEMINI.md must specify UNIVERSAL_PIPELINE_GENERALITY_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 55
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /55\.\s*\*\*流水线任务程序底层通用型保全与反单一任务硬编码公理/, 'pstack-openspec must define Axiom 55');
  assert.match(pstackSkill, /PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM/, 'pstack-openspec must specify PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM');
  assert.match(pstackSkill, /PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM/, 'pstack-openspec must specify PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM');
  assert.match(pstackSkill, /ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM/, 'pstack-openspec must specify ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM');
  assert.match(pstackSkill, /SINGLE_TASK_HARDCODING_BLOCKED/, 'pstack-openspec must specify SINGLE_TASK_HARDCODING_BLOCKED');
  assert.match(pstackSkill, /MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE/, 'pstack-openspec must specify MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE');
  assert.match(pstackSkill, /TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM/, 'pstack-openspec must specify TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM');
  assert.match(pstackSkill, /UNIVERSAL_PIPELINE_GENERALITY_STANDARD/, 'pstack-openspec must specify UNIVERSAL_PIPELINE_GENERALITY_STANDARD');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 50
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /50\.\s*\*\*流水线任务程序底层通用型保全与反单一任务硬编码公理/, 'ai-harness-openspec must define Axiom 50');
  assert.match(aiHarnessSkill, /PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM/, 'ai-harness-openspec must specify PIPELINE_CORE_GENERALITY_&_ANTI_SINGLE_TASK_HARDCODING_AXIOM');
  assert.match(aiHarnessSkill, /PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM/, 'ai-harness-openspec must specify PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM');
  assert.match(aiHarnessSkill, /ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM/, 'ai-harness-openspec must specify ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM');
  assert.match(aiHarnessSkill, /SINGLE_TASK_HARDCODING_BLOCKED/, 'ai-harness-openspec must specify SINGLE_TASK_HARDCODING_BLOCKED');
  assert.match(aiHarnessSkill, /MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE/, 'ai-harness-openspec must specify MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE');
  assert.match(aiHarnessSkill, /TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM/, 'ai-harness-openspec must specify TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM');
  assert.match(aiHarnessSkill, /UNIVERSAL_PIPELINE_GENERALITY_STANDARD/, 'ai-harness-openspec must specify UNIVERSAL_PIPELINE_GENERALITY_STANDARD');

  // 4. Verify openspec/specs/orbitstack-pstack-routing/spec.md delta requirements
  const specContentPath = path.join(repoRoot, 'openspec/specs/orbitstack-pstack-routing/spec.md');
  const specContent = readFileSync(specContentPath, 'utf8');
  assert.match(specContent, /PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM/, 'spec.md must specify PIPELINE_CORE_GENERALITY_&_MULTI_SCENARIO_INVARIANCE_AXIOM');
  assert.match(specContent, /ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM/, 'spec.md must specify ZERO_SCENARIO_POLLUTION_IN_SYSTEM_CORE_&_DOCS_AXIOM');
  assert.match(specContent, /SINGLE_TASK_HARDCODING_BLOCKED/, 'spec.md must specify SINGLE_TASK_HARDCODING_BLOCKED');
  assert.match(specContent, /MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE/, 'spec.md must specify MULTI_SCENARIO_COLLABORATIVE_REGRESSION_GATE');
  assert.match(specContent, /TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM/, 'spec.md must specify TASK_FACT_PARAMETERIZATION_&_ENGINE_DECOUPLING_AXIOM');
});

test('gemini adapter enforces concrete issue priority, dual-scope decoupling, and phased systemic consolidation gate', () => {
  // 1. Verify GEMINI.md Axiom 54
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /54\.\s*\*\*具体问题靶向优先闭环与系统底层双阶固化公理/, 'GEMINI.md must contain Axiom 54 heading');
  assert.match(globalRules, /CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM/, 'GEMINI.md must specify CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM');
  assert.match(globalRules, /GATE1_DUAL_SCOPE_DECOUPLING_RULE/, 'GEMINI.md must specify GATE1_DUAL_SCOPE_DECOUPLING_RULE');
  assert.match(globalRules, /PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK/, 'GEMINI.md must specify PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK');
  assert.match(globalRules, /SYSTEM_CORE_READONLY_LOCK/, 'GEMINI.md must specify SYSTEM_CORE_READONLY_LOCK');
  assert.match(globalRules, /HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE/, 'GEMINI.md must specify HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE');
  assert.match(globalRules, /PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET/, 'GEMINI.md must specify PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET');
  assert.match(globalRules, /UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD/, 'GEMINI.md must specify UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD');

  // 2. Verify skills/pstack-openspec/SKILL.md Axiom 56
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /56\.\s*\*\*具体问题靶向优先闭环与系统底层双阶固化公理/, 'pstack-openspec must define Axiom 56');
  assert.match(pstackSkill, /CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM/, 'pstack-openspec must specify CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM');
  assert.match(pstackSkill, /GATE1_DUAL_SCOPE_DECOUPLING_RULE/, 'pstack-openspec must specify GATE1_DUAL_SCOPE_DECOUPLING_RULE');
  assert.match(pstackSkill, /PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK/, 'pstack-openspec must specify PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK');
  assert.match(pstackSkill, /SYSTEM_CORE_READONLY_LOCK/, 'pstack-openspec must specify SYSTEM_CORE_READONLY_LOCK');
  assert.match(pstackSkill, /HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE/, 'pstack-openspec must specify HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE');
  assert.match(pstackSkill, /PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET/, 'pstack-openspec must specify PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET');
  assert.match(pstackSkill, /UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD/, 'pstack-openspec must specify UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD');

  // 3. Verify skills/ai-harness-openspec/SKILL.md Axiom 51
  const aiHarnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');
  const aiHarnessSkill = readFileSync(aiHarnessSkillPath, 'utf8');
  assert.match(aiHarnessSkill, /51\.\s*\*\*具体问题靶向优先闭环与系统底层双阶固化公理/, 'ai-harness-openspec must define Axiom 51');
  assert.match(aiHarnessSkill, /CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM/, 'ai-harness-openspec must specify CONCRETE_ISSUE_FIRST_&_PHASED_SYSTEMIC_CONSOLIDATION_AXIOM');
  assert.match(aiHarnessSkill, /GATE1_DUAL_SCOPE_DECOUPLING_RULE/, 'ai-harness-openspec must specify GATE1_DUAL_SCOPE_DECOUPLING_RULE');
  assert.match(aiHarnessSkill, /PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK/, 'ai-harness-openspec must specify PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK');
  assert.match(aiHarnessSkill, /SYSTEM_CORE_READONLY_LOCK/, 'ai-harness-openspec must specify SYSTEM_CORE_READONLY_LOCK');
  assert.match(aiHarnessSkill, /HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE/, 'ai-harness-openspec must specify HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE');
  assert.match(aiHarnessSkill, /PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET/, 'ai-harness-openspec must specify PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET');
  assert.match(aiHarnessSkill, /UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD/, 'ai-harness-openspec must specify UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD');

  // 4. Verify openspec/specs/orbitstack-pstack-routing/spec.md delta requirements
  const specContentPath = path.join(repoRoot, 'openspec/specs/orbitstack-pstack-routing/spec.md');
  const specContent = readFileSync(specContentPath, 'utf8');
  assert.match(specContent, /GATE1_DUAL_SCOPE_DECOUPLING_RULE/, 'spec.md must specify GATE1_DUAL_SCOPE_DECOUPLING_RULE');
  assert.match(specContent, /PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK/, 'spec.md must specify PHASE1_TARGETED_RESOLUTION_&_CORE_IMMUNITY_LOCK');
  assert.match(specContent, /SYSTEM_CORE_READONLY_LOCK/, 'spec.md must specify SYSTEM_CORE_READONLY_LOCK');
  assert.match(specContent, /HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE/, 'spec.md must specify HUMAN_STAGE_CONFIRMATION_COLLABORATIVE_GATE');
  assert.match(specContent, /PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET/, 'spec.md must specify PHASE2_GROUND_TRUTH_SYSTEMIC_CONSOLIDATION_&_REGRESSION_NET');
  assert.match(specContent, /UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD/, 'spec.md must specify UNIVERSAL_CONCRETE_FIRST_CONSOLIDATION_STANDARD');
});

test('gemini adapter enforces REA action skill governance, MCP server registration, and constitutional indexing', () => {
  // 1. Verify GEMINI.md Section 3.1 Index
  const globalRulesPath = path.join(repoRoot, 'GEMINI.md');
  const globalRules = readFileSync(globalRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');
  assert.match(globalRules, /REA 逆向工程与闭源还原技能/, 'GEMINI.md must index REA skill');
  assert.match(globalRules, /skills\/rea-reverse-engineering\/SKILL\.md/, 'GEMINI.md must link to REA skill path');

  // 2. Verify skills/pstack-openspec/SKILL.md Section 4.1 Index
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const pstackSkill = readFileSync(pstackSkillPath, 'utf8');
  assert.match(pstackSkill, /REA 逆向工程与闭源还原技能/, 'pstack-openspec must index REA skill');
  assert.match(pstackSkill, /skills\/rea-reverse-engineering\/SKILL\.md/, 'pstack-openspec must link to REA skill path');

  // 3. Verify skills/rea-reverse-engineering/SKILL.md content & invariants
  const reaSkillPath = path.join(repoRoot, 'skills/rea-reverse-engineering/SKILL.md');
  assert.ok(existsSync(reaSkillPath), 'REA skill must exist');
  const reaSkill = readFileSync(reaSkillPath, 'utf8');
  assert.match(reaSkill, /name:\s*rea-reverse-engineering/, 'REA skill must have name: rea-reverse-engineering');
  assert.match(reaSkill, /Evidence/, 'REA skill must specify Evidence');
  assert.match(reaSkill, /analyze/, 'REA skill must document analyze tool');
  assert.match(reaSkill, /decompile/, 'REA skill must document decompile tool');

  // 4. Verify mcp_config.json rea server args when rea MCP is configured on host
  const mcpConfigPath = path.join(homedir(), '.gemini/config/mcp_config.json');
  if (existsSync(mcpConfigPath)) {
    const mcpConfig = JSON.parse(readFileSync(mcpConfigPath, 'utf8'));
    if (mcpConfig.mcpServers?.rea) {
      assert.ok(mcpConfig.mcpServers.rea.args?.includes('--mcp'), 'rea server args must include --mcp');
    }
  }

  // 5. Verify openspec/specs/orbitstack-pstack-routing/spec.md delta requirements
  const specContentPath = path.join(repoRoot, 'openspec/specs/orbitstack-pstack-routing/spec.md');
  const specContent = readFileSync(specContentPath, 'utf8');
  assert.match(specContent, /Requirement: REA Reverse Engineering MCP Server Integration/, 'spec.md must include REA MCP integration requirement');
  assert.match(specContent, /Requirement: REA Action Skill Governance Standard/, 'spec.md must include REA action skill requirement');
  assert.match(specContent, /Requirement: Action Skill Layer Constitutional Indexing for Reverse Engineering/, 'spec.md must include REA indexing requirement');
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

test('gemini adapter enforces problem iceberg probe, 5-whys penetration, and systemic hardening (Axiom 59)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM/, 'GEMINI.md must contain Axiom 59 identifier');
  assert.match(geminiRules, /EXPLICIT_ISSUE_ICEBERG_PROBE_RULE/, 'GEMINI.md must enforce iceberg probe rule');
  assert.match(geminiRules, /DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL/, 'GEMINI.md must enforce 5-Whys causal progression');
  assert.match(geminiRules, /HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL/, 'GEMINI.md must enforce horizontal sibling sweep');
  assert.match(geminiRules, /SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE/, 'GEMINI.md must enforce single-point failure hardening gate');
  assert.match(geminiRules, /UNIVERSAL_ICEBERG_PROBE_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PROBLEM_ICEBERG_PROBE_&_PANORAMIC_SYSTEMIC_PENETRATION_AXIOM/, 'ai-harness-openspec must contain Axiom 59 identifier');
  assert.match(harnessRules, /EXPLICIT_ISSUE_ICEBERG_PROBE_RULE/, 'ai-harness-openspec must enforce iceberg probe rule');
  assert.match(harnessRules, /DEPTH_BEYOND_SURFACE_5WHYS_PROTOCOL/, 'ai-harness-openspec must enforce 5-Whys causal progression');
  assert.match(harnessRules, /HORIZONTAL_EXHAUSTIVE_SIBLING_SWEEP_PROTOCOL/, 'ai-harness-openspec must enforce sibling sweep');
  assert.match(harnessRules, /SINGLE_FAILURE_SYSTEMIC_HARDENING_GATE/, 'ai-harness-openspec must enforce hardening gate');
  assert.match(harnessRules, /UNIVERSAL_ICEBERG_PROBE_STANDARD/, 'ai-harness-openspec must enforce universal standard');
});

test('gemini adapter enforces user-centric behavioral emulation and interaction reproduction gate (Axiom 60)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM/, 'GEMINI.md must contain Axiom 60 identifier');
  assert.match(geminiRules, /USER_OBSERVATIONAL_VANTAGE_RULE/, 'GEMINI.md must enforce user observational vantage rule');
  assert.match(geminiRules, /BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL/, 'GEMINI.md must enforce behavioral emulation reproduction first protocol');
  assert.match(geminiRules, /HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD/, 'GEMINI.md must enforce headless in-memory zero-intrusion standard');
  assert.match(geminiRules, /MULTI_TIERED_COEXISTENT_VERIFICATION_GATE/, 'GEMINI.md must enforce multi-tiered coexistent verification gate');
  assert.match(geminiRules, /UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /USER_CENTRIC_BEHAVIORAL_EMULATION_&_INTERACTION_REPRODUCTION_GATE_AXIOM/, 'ai-harness-openspec must contain Axiom 60 identifier');
  assert.match(harnessRules, /USER_OBSERVATIONAL_VANTAGE_RULE/, 'ai-harness-openspec must enforce user observational vantage rule');
  assert.match(harnessRules, /BEHAVIORAL_EMULATION_REPRODUCTION_FIRST_PROTOCOL/, 'ai-harness-openspec must enforce reproduction first protocol');
  assert.match(harnessRules, /HEADLESS_IN_MEMORY_ZERO_INTRUSION_STANDARD/, 'ai-harness-openspec must enforce headless zero-intrusion standard');
  assert.match(harnessRules, /MULTI_TIERED_COEXISTENT_VERIFICATION_GATE/, 'ai-harness-openspec must enforce multi-tiered verification gate');
  assert.match(harnessRules, /UNIVERSAL_BEHAVIORAL_EMULATION_STANDARD/, 'ai-harness-openspec must enforce universal standard');
});

test('gemini adapter enforces autonomous swarm and subagent proactive dispatch governance (Axiom 61)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM/, 'GEMINI.md must contain Axiom 61 identifier');
  assert.match(geminiRules, /PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT/, 'GEMINI.md must enforce proactive autonomous delegation invariant');
  assert.match(geminiRules, /DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL/, 'GEMINI.md must enforce dual-engine deterministic dispatch routing protocol');
  assert.match(geminiRules, /ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD/, 'GEMINI.md must enforce zero-friction default dispatch standard');
  assert.match(geminiRules, /MANDATORY_DELEGATION_TICKETING_INVARIANT/, 'GEMINI.md must enforce mandatory delegation ticketing invariant');
  assert.match(geminiRules, /ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE/, 'GEMINI.md must enforce anti-monolithic pre-execution hook gate');
  assert.match(geminiRules, /UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM/, 'ai-harness-openspec must contain Axiom 61 identifier');
  assert.match(harnessRules, /PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT/, 'ai-harness-openspec must enforce proactive autonomous delegation invariant');
  assert.match(harnessRules, /DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL/, 'ai-harness-openspec must enforce dual-engine routing protocol');
  assert.match(harnessRules, /ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD/, 'ai-harness-openspec must enforce zero-friction default dispatch standard');
  assert.match(harnessRules, /MANDATORY_DELEGATION_TICKETING_INVARIANT/, 'ai-harness-openspec must enforce mandatory delegation ticketing invariant');
  assert.match(harnessRules, /ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE/, 'ai-harness-openspec must enforce anti-monolithic pre-execution hook gate');
  assert.match(harnessRules, /UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD/, 'ai-harness-openspec must enforce universal standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /AUTONOMOUS_SWARM_&_SUBAGENT_PROACTIVE_DISPATCH_AXIOM/, 'pstack-openspec must contain Axiom 61 identifier');
  assert.match(pstackRules, /PROACTIVE_AUTONOMOUS_DELEGATION_INVARIANT/, 'pstack-openspec must enforce proactive autonomous delegation invariant');
  assert.match(pstackRules, /DUAL_ENGINE_DETERMINISTIC_DISPATCH_ROUTING_PROTOCOL/, 'pstack-openspec must enforce dual-engine routing protocol');
  assert.match(pstackRules, /ZERO_FRICTION_DEFAULT_DISPATCH_STANDARD/, 'pstack-openspec must enforce zero-friction default dispatch standard');
  assert.match(pstackRules, /MANDATORY_DELEGATION_TICKETING_INVARIANT/, 'pstack-openspec must enforce mandatory delegation ticketing invariant');
  assert.match(pstackRules, /ANTI_MONOLITHIC_PRE_EXECUTION_HOOK_GATE/, 'pstack-openspec must enforce anti-monolithic pre-execution hook gate');
  assert.match(pstackRules, /UNIVERSAL_AUTONOMOUS_DISPATCH_STANDARD/, 'pstack-openspec must enforce universal standard');
});

test('gemini adapter enforces mature app reverse engineering and deep deconstruction governance (Axiom 62)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM/, 'GEMINI.md must contain Axiom 62 identifier');
  assert.match(geminiRules, /DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD/, 'GEMINI.md must enforce dual-track deconstruction engine standard');
  assert.match(geminiRules, /DOCUMENT_APP_DECONSTRUCTION_BENCHMARK/, 'GEMINI.md must enforce document app deconstruction benchmark');
  assert.match(geminiRules, /ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT/, 'GEMINI.md must enforce action skill reverse deconstruction invariant');
  assert.match(geminiRules, /CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE/, 'GEMINI.md must enforce clean-room specification and evidence gate');
  assert.match(geminiRules, /UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM/, 'ai-harness-openspec must contain Axiom 62 identifier');
  assert.match(harnessRules, /DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD/, 'ai-harness-openspec must enforce dual-track deconstruction engine standard');
  assert.match(harnessRules, /DOCUMENT_APP_DECONSTRUCTION_BENCHMARK/, 'ai-harness-openspec must enforce document app deconstruction benchmark');
  assert.match(harnessRules, /ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT/, 'ai-harness-openspec must enforce action skill invariant');
  assert.match(harnessRules, /CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE/, 'ai-harness-openspec must enforce clean-room specification and evidence gate');
  assert.match(harnessRules, /UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD/, 'ai-harness-openspec must enforce universal standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /MATURE_APP_REVERSE_ENGINEERING_&_DECONSTRUCTION_AXIOM/, 'pstack-openspec must contain Axiom 62 identifier');
  assert.match(pstackRules, /DUAL_TRACK_DECONSTRUCTION_ENGINE_STANDARD/, 'pstack-openspec must enforce dual-track engine standard');
  assert.match(pstackRules, /DOCUMENT_APP_DECONSTRUCTION_BENCHMARK/, 'pstack-openspec must enforce document app deconstruction benchmark');
  assert.match(pstackRules, /ACTION_SKILL_REVERSE_DECONSTRUCTION_INVARIANT/, 'pstack-openspec must enforce action skill invariant');
  assert.match(pstackRules, /CLEAN_ROOM_SPECIFICATION_&_EVIDENCE_GATE/, 'pstack-openspec must enforce clean-room specification and evidence gate');
  assert.match(pstackRules, /UNIVERSAL_REVERSE_DECONSTRUCTION_STANDARD/, 'pstack-openspec must enforce universal standard');
});

test('gemini adapter enforces pstack evolution deep fusion and subagent autonomous rigor (Axiom 63)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM/, 'GEMINI.md must contain Axiom 63 identifier');
  assert.match(geminiRules, /STANDALONE_WORKER_CONSTITUTION_STANDARD/, 'GEMINI.md must enforce standalone worker constitution standard');
  assert.match(geminiRules, /MECHANICAL_L2_UNSLOP_ASSERTION_GATE/, 'GEMINI.md must enforce mechanical L2 unslop assertion gate');
  assert.match(geminiRules, /FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL/, 'GEMINI.md must enforce formal statechart shortest path protocol');
  assert.match(geminiRules, /ALL_SITES_DEFECT_REMEDIATION_MANDATE/, 'GEMINI.md must enforce all-sites defect remediation mandate');
  assert.match(geminiRules, /UNIVERSAL_PSTACK_FUSION_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM/, 'ai-harness-openspec must contain Axiom 63 identifier');
  assert.match(harnessRules, /STANDALONE_WORKER_CONSTITUTION_STANDARD/, 'ai-harness-openspec must enforce standalone worker constitution standard');
  assert.match(harnessRules, /MECHANICAL_L2_UNSLOP_ASSERTION_GATE/, 'ai-harness-openspec must enforce mechanical L2 unslop assertion gate');
  assert.match(harnessRules, /FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL/, 'ai-harness-openspec must enforce formal statechart shortest path protocol');
  assert.match(harnessRules, /ALL_SITES_DEFECT_REMEDIATION_MANDATE/, 'ai-harness-openspec must enforce all-sites defect remediation mandate');
  assert.match(harnessRules, /UNIVERSAL_PSTACK_FUSION_STANDARD/, 'ai-harness-openspec must enforce universal standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PSTACK_EVOLUTION_FUSION_&_SUBAGENT_AUTONOMOUS_RIGOR_AXIOM/, 'pstack-openspec must contain Axiom 63 identifier');
  assert.match(pstackRules, /STANDALONE_WORKER_CONSTITUTION_STANDARD/, 'pstack-openspec must enforce standalone worker constitution standard');
  assert.match(pstackRules, /MECHANICAL_L2_UNSLOP_ASSERTION_GATE/, 'pstack-openspec must enforce mechanical L2 unslop assertion gate');
  assert.match(pstackRules, /FORMAL_STATECHART_SHORTEST_PATH_PROTOCOL/, 'pstack-openspec must enforce formal statechart shortest path protocol');
  assert.match(pstackRules, /ALL_SITES_DEFECT_REMEDIATION_MANDATE/, 'pstack-openspec must enforce all-sites defect remediation mandate');
  assert.match(pstackRules, /UNIVERSAL_PSTACK_FUSION_STANDARD/, 'pstack-openspec must enforce universal standard');
});

test('gemini adapter enforces problem ledger ingestion and zero-omission deep remediation (Axiom 64)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM/, 'GEMINI.md must contain Axiom 64 identifier');
  assert.match(geminiRules, /PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL/, 'GEMINI.md must enforce problem task boundary classification protocol');
  assert.match(geminiRules, /MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL/, 'GEMINI.md must enforce master problem ledger ingestion protocol');
  assert.match(geminiRules, /ISSUE_TO_TASK_BIJECTIVE_INVARIANT/, 'GEMINI.md must enforce issue to task bijective invariant');
  assert.match(geminiRules, /FOUR_TIER_DEEP_REMEDIATION_LADDER/, 'GEMINI.md must enforce four tier deep remediation ladder');
  assert.match(geminiRules, /SINGLE_ISSUE_FOCUS_LOCK_STANDARD/, 'GEMINI.md must enforce single issue focus lock standard');
  assert.match(geminiRules, /POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL/, 'GEMINI.md must enforce post execution problem reconciliation audit protocol');
  assert.match(geminiRules, /ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER/, 'GEMINI.md must enforce zero omission problem circuit breaker');
  assert.match(geminiRules, /PROBLEM_RECONCILIATION_DEFICIT_BLOCKED/, 'GEMINI.md must enforce reconciliation deficit blocker');
  assert.match(geminiRules, /PROBLEM_RECONCILIATION_OMISSION_BLOCKED/, 'GEMINI.md must enforce reconciliation omission blocker');
  assert.match(geminiRules, /UNIVERSAL_PROBLEM_REMEDIATION_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM/, 'ai-harness-openspec must contain Axiom 64 identifier');
  assert.match(harnessRules, /PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL/, 'ai-harness-openspec must enforce problem task boundary classification protocol');
  assert.match(harnessRules, /MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL/, 'ai-harness-openspec must enforce master problem ledger ingestion protocol');
  assert.match(harnessRules, /ISSUE_TO_TASK_BIJECTIVE_INVARIANT/, 'ai-harness-openspec must enforce issue to task bijective invariant');
  assert.match(harnessRules, /FOUR_TIER_DEEP_REMEDIATION_LADDER/, 'ai-harness-openspec must enforce four tier deep remediation ladder');
  assert.match(harnessRules, /SINGLE_ISSUE_FOCUS_LOCK_STANDARD/, 'ai-harness-openspec must enforce single issue focus lock standard');
  assert.match(harnessRules, /POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL/, 'ai-harness-openspec must enforce post execution problem reconciliation audit protocol');
  assert.match(harnessRules, /ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER/, 'ai-harness-openspec must enforce zero omission problem circuit breaker');
  assert.match(harnessRules, /PROBLEM_RECONCILIATION_DEFICIT_BLOCKED/, 'ai-harness-openspec must enforce reconciliation deficit blocker');
  assert.match(harnessRules, /PROBLEM_RECONCILIATION_OMISSION_BLOCKED/, 'ai-harness-openspec must enforce reconciliation omission blocker');
  assert.match(harnessRules, /UNIVERSAL_PROBLEM_REMEDIATION_STANDARD/, 'ai-harness-openspec must enforce universal standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PROBLEM_LEDGER_INGESTION_&_ZERO_OMISSION_DEEP_REMEDIATION_AXIOM/, 'pstack-openspec must contain Axiom 64 identifier');
  assert.match(pstackRules, /PROBLEM_TASK_BOUNDARY_CLASSIFICATION_PROTOCOL/, 'pstack-openspec must enforce problem task boundary classification protocol');
  assert.match(pstackRules, /MASTER_PROBLEM_LEDGER_INGESTION_PROTOCOL/, 'pstack-openspec must enforce master problem ledger ingestion protocol');
  assert.match(pstackRules, /ISSUE_TO_TASK_BIJECTIVE_INVARIANT/, 'pstack-openspec must enforce issue to task bijective invariant');
  assert.match(pstackRules, /FOUR_TIER_DEEP_REMEDIATION_LADDER/, 'pstack-openspec must enforce four tier deep remediation ladder');
  assert.match(pstackRules, /SINGLE_ISSUE_FOCUS_LOCK_STANDARD/, 'pstack-openspec must enforce single issue focus lock standard');
  assert.match(pstackRules, /POST_EXECUTION_PROBLEM_RECONCILIATION_AUDIT_PROTOCOL/, 'pstack-openspec must enforce post execution problem reconciliation audit protocol');
  assert.match(pstackRules, /ZERO_OMISSION_PROBLEM_CIRCUIT_BREAKER/, 'pstack-openspec must enforce zero omission problem circuit breaker');
  assert.match(pstackRules, /PROBLEM_RECONCILIATION_DEFICIT_BLOCKED/, 'pstack-openspec must enforce reconciliation deficit blocker');
  assert.match(pstackRules, /PROBLEM_RECONCILIATION_OMISSION_BLOCKED/, 'pstack-openspec must enforce reconciliation omission blocker');
  assert.match(pstackRules, /UNIVERSAL_PROBLEM_REMEDIATION_STANDARD/, 'pstack-openspec must enforce universal standard');
});

test('gemini adapter enforces markdown spec deterministic enforcement and completion hook governance (Axiom 65)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM/, 'GEMINI.md must contain Axiom 65 identifier');
  assert.match(geminiRules, /MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL/, 'GEMINI.md must enforce markdown spec atomic structuring protocol');
  assert.match(geminiRules, /AGENT_LIFECYCLE_COMPLETION_HOOK_GATE/, 'GEMINI.md must enforce agent lifecycle completion hook gate');
  assert.match(geminiRules, /TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE/, 'GEMINI.md must enforce two strike ast machine escalation mandate');
  assert.match(geminiRules, /WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD/, 'GEMINI.md must enforce workflow step single focus statechart standard');
  assert.match(geminiRules, /WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD/, 'GEMINI.md must enforce workflow spec compliance guard standard');
  assert.match(geminiRules, /UNIVERSAL_SPEC_ENFORCEMENT_STANDARD/, 'GEMINI.md must enforce universal domain-neutral standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM/, 'ai-harness-openspec must contain Axiom 65 identifier');
  assert.match(harnessRules, /MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL/, 'ai-harness-openspec must enforce markdown spec atomic structuring protocol');
  assert.match(harnessRules, /AGENT_LIFECYCLE_COMPLETION_HOOK_GATE/, 'ai-harness-openspec must enforce agent lifecycle completion hook gate');
  assert.match(harnessRules, /TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE/, 'ai-harness-openspec must enforce two strike ast machine escalation mandate');
  assert.match(harnessRules, /WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD/, 'ai-harness-openspec must enforce workflow step single focus statechart standard');
  assert.match(harnessRules, /WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD/, 'ai-harness-openspec must enforce workflow spec compliance guard standard');
  assert.match(harnessRules, /UNIVERSAL_SPEC_ENFORCEMENT_STANDARD/, 'ai-harness-openspec must enforce universal standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /MARKDOWN_SPEC_DETERMINISTIC_ENFORCEMENT_&_COMPLETION_HOOK_AXIOM/, 'pstack-openspec must contain Axiom 65 identifier');
  assert.match(pstackRules, /MARKDOWN_SPEC_ATOMIC_STRUCTURING_PROTOCOL/, 'pstack-openspec must enforce markdown spec atomic structuring protocol');
  assert.match(pstackRules, /AGENT_LIFECYCLE_COMPLETION_HOOK_GATE/, 'pstack-openspec must enforce agent lifecycle completion hook gate');
  assert.match(pstackRules, /TWO_STRIKE_AST_MACHINE_ESCALATION_MANDATE/, 'pstack-openspec must enforce two strike ast machine escalation mandate');
  assert.match(pstackRules, /WORKFLOW_STEP_SINGLE_FOCUS_STATECHART_STANDARD/, 'pstack-openspec must enforce workflow step single focus statechart standard');
  assert.match(pstackRules, /WORKFLOW_SPEC_COMPLIANCE_GUARD_STANDARD/, 'pstack-openspec must enforce workflow spec compliance guard standard');
  assert.match(pstackRules, /UNIVERSAL_SPEC_ENFORCEMENT_STANDARD/, 'pstack-openspec must enforce universal standard');
});

test('gemini adapter enforces called program immutability and invocation purity governance (Axiom 66)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM/, 'GEMINI.md must contain Axiom 66 identifier');
  assert.match(geminiRules, /INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK/, 'GEMINI.md must enforce invocation task classification and readonly lock');
  assert.match(geminiRules, /ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE/, 'GEMINI.md must enforce anti-expediency mutation mandate');
  assert.match(geminiRules, /UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL/, 'GEMINI.md must enforce upstream defect isolation protocol');
  assert.match(geminiRules, /GATE2_CALLER_SCOPE_PHYSICAL_FENCE/, 'GEMINI.md must enforce gate2 caller scope physical fence');
  assert.match(geminiRules, /INVOCATION_PURITY_GUARD_STANDARD/, 'GEMINI.md must enforce invocation purity guard standard');
  assert.match(geminiRules, /UNIVERSAL_INVOCATION_PURITY_STANDARD/, 'GEMINI.md must enforce universal invocation purity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM/, 'ai-harness-openspec must contain Axiom 66 identifier');
  assert.match(harnessRules, /INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK/, 'ai-harness-openspec must enforce invocation task classification and readonly lock');
  assert.match(harnessRules, /ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE/, 'ai-harness-openspec must enforce anti-expediency mutation mandate');
  assert.match(harnessRules, /UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL/, 'ai-harness-openspec must enforce upstream defect isolation protocol');
  assert.match(harnessRules, /GATE2_CALLER_SCOPE_PHYSICAL_FENCE/, 'ai-harness-openspec must enforce gate2 caller scope physical fence');
  assert.match(harnessRules, /INVOCATION_PURITY_GUARD_STANDARD/, 'ai-harness-openspec must enforce invocation purity guard standard');
  assert.match(harnessRules, /UNIVERSAL_INVOCATION_PURITY_STANDARD/, 'ai-harness-openspec must enforce universal invocation purity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /CALLED_PROGRAM_IMMUTABILITY_&_INVOCATION_PURITY_AXIOM/, 'pstack-openspec must contain Axiom 66 identifier');
  assert.match(pstackRules, /INVOCATION_TASK_CLASSIFICATION_&_CALLED_PROGRAM_READONLY_LOCK/, 'pstack-openspec must enforce invocation task classification and readonly lock');
  assert.match(pstackRules, /ANTI_EXPEDIENCY_MUTATION_&_CALLER_ADAPTATION_MANDATE/, 'pstack-openspec must enforce anti-expediency mutation mandate');
  assert.match(pstackRules, /UPSTREAM_DEFECT_ISOLATION_&_ESCALATION_PROTOCOL/, 'pstack-openspec must enforce upstream defect isolation protocol');
  assert.match(pstackRules, /GATE2_CALLER_SCOPE_PHYSICAL_FENCE/, 'pstack-openspec must enforce gate2 caller scope physical fence');
  assert.match(pstackRules, /INVOCATION_PURITY_GUARD_STANDARD/, 'pstack-openspec must enforce invocation purity guard standard');
  assert.match(pstackRules, /UNIVERSAL_INVOCATION_PURITY_STANDARD/, 'pstack-openspec must enforce universal invocation purity standard');
});

test('gemini adapter enforces universal portability, database migration resilience, and data segregation (Axiom 67)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM/, 'GEMINI.md must contain Axiom 67 identifier');
  assert.match(geminiRules, /CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD/, 'GEMINI.md must enforce cross-device portability standard');
  assert.match(geminiRules, /DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD/, 'GEMINI.md must enforce database migration resilience standard');
  assert.match(geminiRules, /USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD/, 'GEMINI.md must enforce user/default data orthogonal segregation');
  assert.match(geminiRules, /PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD/, 'GEMINI.md must enforce portable data export and restore standard');
  assert.match(geminiRules, /UNIVERSAL_PORTABILITY_GUARD_STANDARD/, 'GEMINI.md must enforce universal portability guard standard');
  assert.match(geminiRules, /UNIVERSAL_PORTABILITY_LEGISLATION_PARITY_STANDARD/, 'GEMINI.md must enforce universal portability legislation parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM/, 'ai-harness-openspec must contain Axiom 67 identifier');
  assert.match(harnessRules, /CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD/, 'ai-harness-openspec must enforce cross-device portability standard');
  assert.match(harnessRules, /DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD/, 'ai-harness-openspec must enforce database migration resilience standard');
  assert.match(harnessRules, /USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD/, 'ai-harness-openspec must enforce user/default data orthogonal segregation');
  assert.match(harnessRules, /PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD/, 'ai-harness-openspec must enforce portable data export and restore standard');
  assert.match(harnessRules, /UNIVERSAL_PORTABILITY_GUARD_STANDARD/, 'ai-harness-openspec must enforce universal portability guard standard');
  assert.match(harnessRules, /UNIVERSAL_PORTABILITY_LEGISLATION_PARITY_STANDARD/, 'ai-harness-openspec must enforce universal portability legislation parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /UNIVERSAL_PORTABILITY_DATA_SEPARATION_&_MIGRATION_RESILIENCE_AXIOM/, 'pstack-openspec must contain Axiom 67 identifier');
  assert.match(pstackRules, /CROSS_DEVICE_PORTABILITY_&_HOST_DECOUPLING_STANDARD/, 'pstack-openspec must enforce cross-device portability standard');
  assert.match(pstackRules, /DATABASE_MIGRATION_RESILIENCE_&_AUTO_BOOTSTRAP_STANDARD/, 'pstack-openspec must enforce database migration resilience standard');
  assert.match(pstackRules, /USER_DATA_&_DEFAULT_DATA_ORTHOGONAL_SEGREGATION_STANDARD/, 'pstack-openspec must enforce user/default data orthogonal segregation');
  assert.match(pstackRules, /PORTABLE_DATA_EXPORT_BACKUP_&_RESTORE_STANDARD/, 'pstack-openspec must enforce portable data export and restore standard');
  assert.match(pstackRules, /UNIVERSAL_PORTABILITY_GUARD_STANDARD/, 'pstack-openspec must enforce universal portability guard standard');
  assert.match(pstackRules, /UNIVERSAL_PORTABILITY_LEGISLATION_PARITY_STANDARD/, 'pstack-openspec must enforce universal portability legislation parity standard');
});

test('gemini adapter enforces dual audit tooling: mechanical audit and agent proactive intervention (Axiom 68)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM/, 'GEMINI.md must contain Axiom 68 identifier');
  assert.match(geminiRules, /MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD/, 'GEMINI.md must enforce mechanical audit tool standard');
  assert.match(geminiRules, /AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD/, 'GEMINI.md must enforce agent proactive intervention audit standard');
  assert.match(geminiRules, /DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT/, 'GEMINI.md must enforce dual-key sequential orchestration contract');
  assert.match(geminiRules, /FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD/, 'GEMINI.md must enforce false-pass detection standard');
  assert.match(geminiRules, /PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce pure universal software engineering abstraction standard');
  assert.match(geminiRules, /DUAL_AUDIT_TOOLING_PARITY_STANDARD/, 'GEMINI.md must enforce dual audit tooling parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM/, 'ai-harness-openspec must contain Axiom 68 identifier');
  assert.match(harnessRules, /MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD/, 'ai-harness-openspec must enforce mechanical audit tool standard');
  assert.match(harnessRules, /AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD/, 'ai-harness-openspec must enforce agent proactive intervention audit standard');
  assert.match(harnessRules, /DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT/, 'ai-harness-openspec must enforce dual-key sequential orchestration contract');
  assert.match(harnessRules, /FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD/, 'ai-harness-openspec must enforce false-pass detection standard');
  assert.match(harnessRules, /PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce pure universal software engineering abstraction standard');
  assert.match(harnessRules, /DUAL_AUDIT_TOOLING_PARITY_STANDARD/, 'ai-harness-openspec must enforce dual audit tooling parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /DUAL_AUDIT_TOOLING_MECHANICAL_&_AGENT_PROACTIVE_INTERVENTION_AXIOM/, 'pstack-openspec must contain Axiom 68 identifier');
  assert.match(pstackRules, /MECHANICAL_AUDIT_TOOL_GENERIC_STANDARD/, 'pstack-openspec must enforce mechanical audit tool standard');
  assert.match(pstackRules, /AGENT_PROACTIVE_INTERVENTION_AUDIT_TOOL_STANDARD/, 'pstack-openspec must enforce agent proactive intervention audit standard');
  assert.match(pstackRules, /DUAL_KEY_SEQUENTIAL_ORCHESTRATION_CONTRACT/, 'pstack-openspec must enforce dual-key sequential orchestration contract');
  assert.match(pstackRules, /FALSE_PASS_DETECTION_&_DYNAMIC_FALSIFICATION_STANDARD/, 'pstack-openspec must enforce false-pass detection standard');
  assert.match(pstackRules, /PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce pure universal software engineering abstraction standard');
  assert.match(pstackRules, /DUAL_AUDIT_TOOLING_PARITY_STANDARD/, 'pstack-openspec must enforce dual audit tooling parity standard');
});

test('gemini adapter enforces proactive requirement brainstorming and cross-thread governance (Axiom 69)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_UNIVERSAL_CROSS_THREAD_GOVERNANCE_AXIOM/, 'GEMINI.md must contain Axiom 69 identifier');
  assert.match(geminiRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL/, 'GEMINI.md must enforce proactive requirement brainstorming protocol');
  assert.match(geminiRules, /GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE/, 'GEMINI.md must enforce gate2 brainstorming ingestion gate');
  assert.match(geminiRules, /UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE/, 'GEMINI.md must enforce universal cross-thread and model bootstrap mandate');
  assert.match(geminiRules, /ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD/, 'GEMINI.md must enforce anti-truncation modular architecture standard');
  assert.match(geminiRules, /AXIOM_69_PARITY_STANDARD/, 'GEMINI.md must enforce axiom 69 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_UNIVERSAL_CROSS_THREAD_GOVERNANCE_AXIOM/, 'ai-harness-openspec must contain Axiom 69 identifier');
  assert.match(harnessRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL/, 'ai-harness-openspec must enforce proactive requirement brainstorming protocol');
  assert.match(harnessRules, /GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE/, 'ai-harness-openspec must enforce gate2 brainstorming ingestion gate');
  assert.match(harnessRules, /UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE/, 'ai-harness-openspec must enforce universal cross-thread and model bootstrap mandate');
  assert.match(harnessRules, /ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD/, 'ai-harness-openspec must enforce anti-truncation modular architecture standard');
  assert.match(harnessRules, /AXIOM_69_PARITY_STANDARD/, 'ai-harness-openspec must enforce axiom 69 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_UNIVERSAL_CROSS_THREAD_GOVERNANCE_AXIOM/, 'pstack-openspec must contain Axiom 69 identifier');
  assert.match(pstackRules, /PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL/, 'pstack-openspec must enforce proactive requirement brainstorming protocol');
  assert.match(pstackRules, /GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE/, 'pstack-openspec must enforce gate2 brainstorming ingestion gate');
  assert.match(pstackRules, /UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE/, 'pstack-openspec must enforce universal cross-thread and model bootstrap mandate');
  assert.match(pstackRules, /ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD/, 'pstack-openspec must enforce anti-truncation modular architecture standard');
  assert.match(pstackRules, /AXIOM_69_PARITY_STANDARD/, 'pstack-openspec must enforce axiom 69 parity standard');
});

test('gemini adapter enforces project architecture graph and anti-repeated-mutation governance (Axiom 70)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM/, 'GEMINI.md must contain Axiom 70 identifier');
  assert.match(geminiRules, /PROJECT_ARCHITECTURE_GRAPH_MANDATE/, 'GEMINI.md must enforce project architecture graph mandate');
  assert.match(geminiRules, /GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL/, 'GEMINI.md must enforce graph-guided diagnosis and blast radius protocol');
  assert.match(geminiRules, /REPEATED_HOTSPOT_MUTATION_CIRCUIT_BREAKER/, 'GEMINI.md must enforce repeated hotspot mutation circuit breaker');
  assert.match(geminiRules, /GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL/, 'GEMINI.md must enforce graph maintenance ledger and sync protocol');
  assert.match(geminiRules, /AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 70 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM/, 'ai-harness-openspec must contain Axiom 70 identifier');
  assert.match(harnessRules, /PROJECT_ARCHITECTURE_GRAPH_MANDATE/, 'ai-harness-openspec must enforce project architecture graph mandate');
  assert.match(harnessRules, /GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL/, 'ai-harness-openspec must enforce graph-guided diagnosis and blast radius protocol');
  assert.match(harnessRules, /REPEATED_HOTSPOT_MUTATION_CIRCUIT_BREAKER/, 'ai-harness-openspec must enforce repeated hotspot mutation circuit breaker');
  assert.match(harnessRules, /GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL/, 'ai-harness-openspec must enforce graph maintenance ledger and sync protocol');
  assert.match(harnessRules, /AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 70 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PROJECT_ARCHITECTURE_GRAPH_&_ANTI_REPEATED_MUTATION_AXIOM/, 'pstack-openspec must contain Axiom 70 identifier');
  assert.match(pstackRules, /PROJECT_ARCHITECTURE_GRAPH_MANDATE/, 'pstack-openspec must enforce project architecture graph mandate');
  assert.match(pstackRules, /GRAPH_GUIDED_DIAGNOSIS_&_BLAST_RADIUS_PROTOCOL/, 'pstack-openspec must enforce graph-guided diagnosis and blast radius protocol');
  assert.match(pstackRules, /REPEATED_HOTSPOT_MUTATION_CIRCUIT_BREAKER/, 'pstack-openspec must enforce repeated hotspot mutation circuit breaker');
  assert.match(pstackRules, /GRAPH_MAINTENANCE_LEDGER_&_SYNC_PROTOCOL/, 'pstack-openspec must enforce graph maintenance ledger and sync protocol');
  assert.match(pstackRules, /AXIOM_70_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 70 parity standard');
});

test('gemini adapter enforces cumulative requirement ledger and re-gating protocol (Axiom 71)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM/, 'GEMINI.md must contain Axiom 71 identifier');
  assert.match(geminiRules, /CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL/, 'GEMINI.md must enforce cumulative requirement ledger protocol');
  assert.match(geminiRules, /ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD/, 'GEMINI.md must enforce atomic requirement decomposition standard');
  assert.match(geminiRules, /SCOPE_DRIFT_RE_GATING_MANDATE/, 'GEMINI.md must enforce scope drift re-gating mandate');
  assert.match(geminiRules, /END_TO_END_CUMULATIVE_CHECKOFF_STANDARD/, 'GEMINI.md must enforce end-to-end cumulative checkoff standard');
  assert.match(geminiRules, /AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 71 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM/, 'ai-harness-openspec must contain Axiom 71 identifier');
  assert.match(harnessRules, /CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL/, 'ai-harness-openspec must enforce cumulative requirement ledger protocol');
  assert.match(harnessRules, /ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD/, 'ai-harness-openspec must enforce atomic requirement decomposition standard');
  assert.match(harnessRules, /SCOPE_DRIFT_RE_GATING_MANDATE/, 'ai-harness-openspec must enforce scope drift re-gating mandate');
  assert.match(harnessRules, /END_TO_END_CUMULATIVE_CHECKOFF_STANDARD/, 'ai-harness-openspec must enforce end-to-end cumulative checkoff standard');
  assert.match(harnessRules, /AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 71 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /CUMULATIVE_REQUIREMENT_LEDGER_&_RE_GATING_AXIOM/, 'pstack-openspec must contain Axiom 71 identifier');
  assert.match(pstackRules, /CUMULATIVE_REQUIREMENT_LEDGER_PROTOCOL/, 'pstack-openspec must enforce cumulative requirement ledger protocol');
  assert.match(pstackRules, /ATOMIC_REQUIREMENT_DECOMPOSITION_STANDARD/, 'pstack-openspec must enforce atomic requirement decomposition standard');
  assert.match(pstackRules, /SCOPE_DRIFT_RE_GATING_MANDATE/, 'pstack-openspec must enforce scope drift re-gating mandate');
  assert.match(pstackRules, /END_TO_END_CUMULATIVE_CHECKOFF_STANDARD/, 'pstack-openspec must enforce end-to-end cumulative checkoff standard');
  assert.match(pstackRules, /AXIOM_71_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 71 parity standard');
});

test('gemini adapter enforces pstack v0.15.48 parity and /reframe disambiguation protocol (Axiom 72)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM/, 'GEMINI.md must contain Axiom 72 identifier');
  assert.match(geminiRules, /REFRAME_STEP0_DISAMBIGUATION_PROTOCOL/, 'GEMINI.md must enforce reframe step0 disambiguation protocol');
  assert.match(geminiRules, /REFRAME_AMBIGUITY_THRESHOLD_GATE/, 'GEMINI.md must enforce reframe ambiguity threshold gate');
  assert.match(geminiRules, /ZERO_FABRICATED_CITATION_STANDARD/, 'GEMINI.md must enforce zero fabricated citation standard');
  assert.match(geminiRules, /AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 72 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM/, 'ai-harness-openspec must contain Axiom 72 identifier');
  assert.match(harnessRules, /REFRAME_STEP0_DISAMBIGUATION_PROTOCOL/, 'ai-harness-openspec must enforce reframe step0 disambiguation protocol');
  assert.match(harnessRules, /REFRAME_AMBIGUITY_THRESHOLD_GATE/, 'ai-harness-openspec must enforce reframe ambiguity threshold gate');
  assert.match(harnessRules, /ZERO_FABRICATED_CITATION_STANDARD/, 'ai-harness-openspec must enforce zero fabricated citation standard');
  assert.match(harnessRules, /AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 72 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PSTACK_REFRAME_DISAMBIGUATION_&_UPSTREAM_PARITY_AXIOM/, 'pstack-openspec must contain Axiom 72 identifier');
  assert.match(pstackRules, /REFRAME_STEP0_DISAMBIGUATION_PROTOCOL/, 'pstack-openspec must enforce reframe step0 disambiguation protocol');
  assert.match(pstackRules, /REFRAME_AMBIGUITY_THRESHOLD_GATE/, 'pstack-openspec must enforce reframe ambiguity threshold gate');
  assert.match(pstackRules, /ZERO_FABRICATED_CITATION_STANDARD/, 'pstack-openspec must enforce zero fabricated citation standard');
  assert.match(pstackRules, /AXIOM_72_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 72 parity standard');
});

test('gemini adapter enforces UI craft elevation, distill purification, and guard:ui-slop (Axiom 73)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM/, 'GEMINI.md must contain Axiom 73 identifier');
  assert.match(geminiRules, /UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER/, 'GEMINI.md must enforce Shape -> Distill -> Polish execution order');
  assert.match(geminiRules, /UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL/, 'GEMINI.md must enforce distill purification protocol');
  assert.match(geminiRules, /AUTOMATED_L2_UI_SLOP_GUARD_STANDARD/, 'GEMINI.md must enforce automated L2 UI slop guard standard');
  assert.match(geminiRules, /AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 73 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM/, 'ai-harness-openspec must contain Axiom 73 identifier');
  assert.match(harnessRules, /UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER/, 'ai-harness-openspec must enforce Shape -> Distill -> Polish execution order');
  assert.match(harnessRules, /UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL/, 'ai-harness-openspec must enforce distill purification protocol');
  assert.match(harnessRules, /AUTOMATED_L2_UI_SLOP_GUARD_STANDARD/, 'ai-harness-openspec must enforce automated L2 UI slop guard standard');
  assert.match(harnessRules, /AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 73 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /UI_CRAFT_DISTILL_&_AUTOMATED_SLOP_GUARD_AXIOM/, 'pstack-openspec must contain Axiom 73 identifier');
  assert.match(pstackRules, /UI_SHAPE_DISTILL_POLISH_EXECUTION_ORDER/, 'pstack-openspec must enforce Shape -> Distill -> Polish execution order');
  assert.match(pstackRules, /UI_DISTILL_PURIFICATION_&_ZERO_CLUTTER_PROTOCOL/, 'pstack-openspec must enforce distill purification protocol');
  assert.match(pstackRules, /AUTOMATED_L2_UI_SLOP_GUARD_STANDARD/, 'pstack-openspec must enforce automated L2 UI slop guard standard');
  assert.match(pstackRules, /AXIOM_73_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 73 parity standard');
});

test('gemini adapter enforces blind auditor isolation and real-artifact witness mandate (Axiom 74)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM/, 'GEMINI.md must contain Axiom 74 identifier');
  assert.match(geminiRules, /BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE/, 'GEMINI.md must enforce blind auditor physical isolation');
  assert.match(geminiRules, /REAL_ARTIFACT_WITNESS_MANDATE/, 'GEMINI.md must enforce real-artifact witness mandate');
  assert.match(geminiRules, /ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL/, 'GEMINI.md must enforce anti-proxy mechanical escalation');
  assert.match(geminiRules, /AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 74 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM/, 'ai-harness-openspec must contain Axiom 74 identifier');
  assert.match(harnessRules, /BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE/, 'ai-harness-openspec must enforce blind auditor physical isolation');
  assert.match(harnessRules, /REAL_ARTIFACT_WITNESS_MANDATE/, 'ai-harness-openspec must enforce real-artifact witness mandate');
  assert.match(harnessRules, /ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL/, 'ai-harness-openspec must enforce anti-proxy mechanical escalation');
  assert.match(harnessRules, /AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 74 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /BLIND_AUDITOR_ISOLATION_&_REAL_ARTIFACT_WITNESS_AXIOM/, 'pstack-openspec must contain Axiom 74 identifier');
  assert.match(pstackRules, /BLIND_AUDITOR_PHYSICAL_ISOLATION_MANDATE/, 'pstack-openspec must enforce blind auditor physical isolation');
  assert.match(pstackRules, /REAL_ARTIFACT_WITNESS_MANDATE/, 'pstack-openspec must enforce real-artifact witness mandate');
  assert.match(pstackRules, /ANTI_PROXY_MECHANICAL_ESCALATION_PROTOCOL/, 'pstack-openspec must enforce anti-proxy mechanical escalation');
  assert.match(pstackRules, /AXIOM_74_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 74 parity standard');
});

test('gemini adapter enforces problem-task zero-simplification, active verification, anti-recurrence, and GitHub-first mandate (Axiom 75)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM/, 'GEMINI.md must contain Axiom 75 identifier');
  assert.match(geminiRules, /DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION/, 'GEMINI.md must enforce dual-gate zero-simplification');
  assert.match(geminiRules, /ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION/, 'GEMINI.md must enforce active non-mechanical problem verification');
  assert.match(geminiRules, /ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL/, 'GEMINI.md must enforce root-cause anti-recurrence immunity');
  assert.match(geminiRules, /GITHUB_FIRST_BENCHMARKING_MANDATE/, 'GEMINI.md must enforce GitHub-first benchmarking mandate');
  assert.match(geminiRules, /AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 75 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM/, 'ai-harness-openspec must contain Axiom 75 identifier');
  assert.match(harnessRules, /DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION/, 'ai-harness-openspec must enforce dual-gate zero-simplification');
  assert.match(harnessRules, /ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION/, 'ai-harness-openspec must enforce active non-mechanical problem verification');
  assert.match(harnessRules, /ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL/, 'ai-harness-openspec must enforce root-cause anti-recurrence immunity');
  assert.match(harnessRules, /GITHUB_FIRST_BENCHMARKING_MANDATE/, 'ai-harness-openspec must enforce GitHub-first benchmarking mandate');
  assert.match(harnessRules, /AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 75 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /PROBLEM_TASK_ZERO_SIMPLIFICATION_ACTIVE_VERIFY_&_ANTI_RECURRENCE_AXIOM/, 'pstack-openspec must contain Axiom 75 identifier');
  assert.match(pstackRules, /DUAL_GATE_ZERO_SIMPLIFICATION_CONSERVATION/, 'pstack-openspec must enforce dual-gate zero-simplification');
  assert.match(pstackRules, /ACTIVE_NON_MECHANICAL_PROBLEM_VERIFICATION/, 'pstack-openspec must enforce active non-mechanical problem verification');
  assert.match(pstackRules, /ROOT_CAUSE_ANTI_RECURRENCE_IMMUNITY_PROTOCOL/, 'pstack-openspec must enforce root-cause anti-recurrence immunity');
  assert.match(pstackRules, /GITHUB_FIRST_BENCHMARKING_MANDATE/, 'pstack-openspec must enforce GitHub-first benchmarking mandate');
  assert.match(pstackRules, /AXIOM_75_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 75 parity standard');
});

test('gemini adapter enforces enterprise lifecycle Draw.io modeling and Diagram-as-Test guard (Axiom 76)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM/, 'GEMINI.md must contain Axiom 76 identifier');
  assert.match(geminiRules, /DETERMINISTIC_SWIMLANE_GRID_COMPILER/, 'GEMINI.md must enforce deterministic swimlane grid compiler');
  assert.match(geminiRules, /AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD/, 'GEMINI.md must enforce automated L2 Draw.io model guard');
  assert.match(geminiRules, /AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'GEMINI.md must enforce axiom 76 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM/, 'ai-harness-openspec must contain Axiom 76 identifier');
  assert.match(harnessRules, /DETERMINISTIC_SWIMLANE_GRID_COMPILER/, 'ai-harness-openspec must enforce deterministic swimlane grid compiler');
  assert.match(harnessRules, /AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD/, 'ai-harness-openspec must enforce automated L2 Draw.io model guard');
  assert.match(harnessRules, /AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'ai-harness-openspec must enforce axiom 76 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM/, 'pstack-openspec must contain Axiom 76 identifier');
  assert.match(pstackRules, /DETERMINISTIC_SWIMLANE_GRID_COMPILER/, 'pstack-openspec must enforce deterministic swimlane grid compiler');
  assert.match(pstackRules, /AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD/, 'pstack-openspec must enforce automated L2 Draw.io model guard');
  assert.match(pstackRules, /AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce axiom 76 parity standard');
});

test('gemini adapter enforces anti-sprawl, role-pinned persistent reuse, and termination lock (Axiom 77)', () => {
  const geminiRulesPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiRulesPath), 'GEMINI.md must exist');
  const geminiRules = readFileSync(geminiRulesPath, 'utf8') + '\n' + readFileSync(path.join(repoRoot, 'skills/pstack-openspec/references/operating-invariants-full.md'), 'utf8');

  assert.match(geminiRules, /ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM/, 'GEMINI.md must contain Axiom 77 identifier');
  assert.match(geminiRules, /HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE/, 'GEMINI.md must enforce human-authorized multi-agent spawn gate');
  assert.match(geminiRules, /ROLE_PINNED_PERSISTENT_REUSE_MANDATE/, 'GEMINI.md must enforce role-pinned persistent reuse');
  assert.match(geminiRules, /HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK/, 'GEMINI.md must enforce human-authorized termination lock');
  assert.match(geminiRules, /AXIOM_77_PARITY_&_SUPERSESSION_STANDARD/, 'GEMINI.md must enforce axiom 77 parity standard');

  const harnessSkillPath = path.join(repoRoot, 'skills', 'ai-harness-openspec', 'SKILL.md');
  assert.ok(existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
  const harnessRules = readFileSync(harnessSkillPath, 'utf8');

  assert.match(harnessRules, /ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM/, 'ai-harness-openspec must contain Axiom 77 identifier');
  assert.match(harnessRules, /HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE/, 'ai-harness-openspec must enforce human-authorized multi-agent spawn gate');
  assert.match(harnessRules, /ROLE_PINNED_PERSISTENT_REUSE_MANDATE/, 'ai-harness-openspec must enforce role-pinned persistent reuse');
  assert.match(harnessRules, /HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK/, 'ai-harness-openspec must enforce human-authorized termination lock');
  assert.match(harnessRules, /AXIOM_77_PARITY_&_SUPERSESSION_STANDARD/, 'ai-harness-openspec must enforce axiom 77 parity standard');

  const pstackSkillPath = path.join(repoRoot, 'skills', 'pstack-openspec', 'SKILL.md');
  assert.ok(existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
  const pstackRules = readFileSync(pstackSkillPath, 'utf8');

  assert.match(pstackRules, /ANTI_SPRAWL_ROLE_PINNED_REUSE_&_LIFECYCLE_LOCK_AXIOM/, 'pstack-openspec must contain Axiom 77 identifier');
  assert.match(pstackRules, /HUMAN_AUTHORIZED_MULTI_AGENT_SPAWN_GATE/, 'pstack-openspec must enforce human-authorized multi-agent spawn gate');
  assert.match(pstackRules, /ROLE_PINNED_PERSISTENT_REUSE_MANDATE/, 'pstack-openspec must enforce role-pinned persistent reuse');
  assert.match(pstackRules, /HUMAN_AUTHORIZED_AGENT_TERMINATION_LOCK/, 'pstack-openspec must enforce human-authorized termination lock');
  assert.match(pstackRules, /AXIOM_77_PARITY_&_SUPERSESSION_STANDARD/, 'pstack-openspec must enforce axiom 77 parity standard');
  assert.match(pstackRules, /UNIVERSAL_PROBLEM_CLASS_GENERALIZATION_AXIOM/, 'pstack-openspec must enforce Axiom 78 problem-class generalization');
  assert.match(pstackRules, /AXIOM_78_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD/, 'pstack-openspec must enforce Axiom 78 parity standard');
  assert.match(pstackRules, /SYSTEMIC_PROBLEM_BRAINSTORM_&_STRUCTURAL_PREVENTION_AXIOM/, 'pstack-openspec must enforce Axiom 79 systemic problem brainstorm');
  assert.match(pstackRules, /AXIOM_79_PARITY_&_BRAINSTORM_ENFORCEMENT_STANDARD/, 'pstack-openspec must enforce Axiom 79 parity standard');
  assert.match(pstackRules, /PROBLEM_LEDGER_INCREMENTAL_MERGE_&_RULING_GATE_AXIOM/, 'pstack-openspec must enforce Axiom 80 problem ledger ruling gate');
  assert.match(pstackRules, /AXIOM_80_PARITY_&_PROBLEM_RULING_STANDARD/, 'pstack-openspec must enforce Axiom 80 parity standard');
  assert.match(pstackRules, /POST_TASK_MANDATORY_ISSUE_DISCLOSURE_&_JUDGMENT_AXIOM/, 'pstack-openspec must enforce Axiom 81 post-task issue disclosure');
  assert.match(pstackRules, /AXIOM_81_PARITY_&_DISCLOSURE_STANDARD/, 'pstack-openspec must enforce Axiom 81 parity standard');
  assert.match(pstackRules, /STRICT_HUMAN_SPAWN_APPROVAL_PRIORITY_REUSE_&_ROLE_DISPATCH_AXIOM/, 'pstack-openspec must enforce Axiom 82 strict spawn approval and role dispatch');
  assert.match(pstackRules, /AXIOM_82_PARITY_&_LIFECYCLE_GUARD_STANDARD/, 'pstack-openspec must enforce Axiom 82 parity standard');
});
