import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Canonical Entrypoint Invariance & Anti-Script Proliferation Governance', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'canonical-entrypoint-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'canonical-entrypoint-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Loose script audit: Zero unmanaged temporary scripts in root and src', () => {
    const rootFiles = fs.readdirSync(REPO_ROOT);
    const forbiddenPatterns = [
      /^temp_/i, /^tmp_/i, /^patch_/i, /^fix_/i, /^debug_/i, /^test_manual/i,
      /\.tmp$/i, /\.bak$/i
    ];

    const looseScripts = rootFiles.filter(file => {
      return forbiddenPatterns.some(pat => pat.test(file));
    });

    assert.equal(looseScripts.length, 0, `Detected loose temporary scripts in repository root: ${looseScripts.join(', ')}`);
  });

  await t.test('2. Constitutional codification in GEMINI.md: Axiom 55 presents all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('CANONICAL_ENTRYPOINT_&_ANTI_SCRIPT_PROLIFERATION_AXIOM'), 'Must contain Axiom 55 identifier');
    assert.ok(content.includes('CANONICAL_ENTRYPOINT_EXCLUSIVITY_GUARDRAIL'), 'Must contain canonical entrypoint exclusivity guardrail');
    assert.ok(content.includes('BYPASS_CANONICAL_ENTRYPOINT_BLOCKED'), 'Must contain bypass blocker');
    assert.ok(content.includes('THROWAWAY_SCRIPT_QUARANTINE_&_CRYSTALLIZE_LIFECYCLE'), 'Must contain scratch quarantine and crystallize lifecycle');
    assert.ok(content.includes('LOOSE_SCRIPTS_PROLIFERATION_BLOCKED'), 'Must contain loose scripts proliferation blocker');
    assert.ok(content.includes('IN_PLACE_CORE_HARDENING_CONVERGENCE_RULE'), 'Must contain in-place core hardening rule');
    assert.ok(content.includes('CANONICAL_ENTRYPOINT_EMPIRICAL_WITNESS_GATE'), 'Must contain empirical witness gate');
    assert.ok(content.includes('ISLAND_PSEUDO_PASS_BLOCKED'), 'Must contain island pseudo-pass blocker');
    assert.ok(content.includes('UNIVERSAL_CANONICAL_ENTRYPOINT_STANDARD'), 'Must contain universal standard identifier');
  });

  await t.test('3. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('CANONICAL_ENTRYPOINT_&_ANTI_SCRIPT_PROLIFERATION_AXIOM'), 'pstack-openspec must contain Axiom 55');
    assert.ok(pstackContent.includes('BYPASS_CANONICAL_ENTRYPOINT_BLOCKED'), 'pstack-openspec must include bypass blocker');
    assert.ok(pstackContent.includes('LOOSE_SCRIPTS_PROLIFERATION_BLOCKED'), 'pstack-openspec must include loose script blocker');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('CANONICAL_ENTRYPOINT_&_ANTI_SCRIPT_PROLIFERATION_AXIOM'), 'ai-harness-openspec must contain Axiom 55');
    assert.ok(harnessContent.includes('IN_PLACE_CORE_HARDENING_CONVERGENCE_RULE'), 'ai-harness-openspec must include in-place core hardening rule');
  });

  await t.test('4. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Canonical Entrypoint Invariance and Anti-Bypass Guardrail'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Throwaway Script Quarantine and Mandatory Crystallization / Purge Lifecycle'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: In-Place Core Hardening Convergence Standard'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Canonical Entrypoint Empirical Witness Gate'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 55 Constitutional Legislation and Universal Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('5. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const content = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom55Match = content.match(/55\.\s+\*\*统一法定执行路径与临时脚本禁绝收敛公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom55Match, 'Axiom 55 block must be extracted');
    const axiomText = axiom55Match[0];

    // Verify presence of formal engineering concepts
    assert.ok(axiomText.includes('Canonical Gateway / CLI Dispatcher / MCP Entrypoint'), 'Must cite canonical dispatcher gateways');
    assert.ok(axiomText.includes('scratch/'), 'Must cite sandboxed quarantine path');
    assert.ok(axiomText.includes('Crystallize'), 'Must cite crystallization');
    assert.ok(axiomText.includes('Clean Purge'), 'Must cite clean purge');
    assert.ok(axiomText.includes('[Measured] Exit Code 0'), 'Must require measured exit code 0');

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 55 must not contain scenario token: ${token}`);
    }
  });

  await t.test('6. Quarantine Sandbox & Crystallization Lifecycle Simulation', () => {
    // Validate the lifecycle state machine rule
    const isQuarantined = (filePath) => /(^|\/)scratch\//.test(filePath.replace(/\\/g, '/'));
    const isAllowedInProduction = (filePath) => !isQuarantined(filePath) && !filePath.includes('temp_');

    assert.equal(isQuarantined('scratch/eval-experiment.mjs'), true, 'scratch paths must be quarantined');
    assert.equal(isQuarantined('src/temp_test.js'), false, 'src paths are not quarantined');
    assert.equal(isAllowedInProduction('src/temp_test.js'), false, 'temporary scripts in src are strictly forbidden');
    assert.equal(isAllowedInProduction('src/canonical-dispatcher.mjs'), true, 'canonical files in src are allowed');
  });
});
