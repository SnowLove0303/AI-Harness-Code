import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

test('L2 Suite: Action Skill Proactive Discovery & Mandatory Adoption Governance', async (t) => {
  const geminiMdPath = path.join(REPO_ROOT, 'GEMINI.md');
  const pstackSkillPath = path.join(REPO_ROOT, 'skills', 'pstack-openspec', 'SKILL.md');
  const harnessSkillPath = path.join(REPO_ROOT, 'skills', 'ai-harness-openspec', 'SKILL.md');
  const changeSpecPath = fs.existsSync(path.join(REPO_ROOT, 'openspec', 'changes', 'action-skill-discovery-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md'))
    ? path.join(REPO_ROOT, 'openspec', 'changes', 'action-skill-discovery-governance', 'specs', 'orbitstack-pstack-routing', 'spec.md')
    : path.join(REPO_ROOT, 'openspec', 'specs', 'orbitstack-pstack-routing', 'spec.md');

  await t.test('1. Constitutional codification in GEMINI.md: Axiom 57 presents all required invariants', () => {
    assert.ok(fs.existsSync(geminiMdPath), 'GEMINI.md must exist');
    const content = fs.readFileSync(geminiMdPath, 'utf8');

    assert.ok(content.includes('ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM'), 'Must contain Axiom 57 identifier');
    assert.ok(content.includes('TASK_TIME_ACTION_SKILL_SCAN_PROTOCOL'), 'Must contain task-time scan protocol');
    assert.ok(content.includes('ACTION_SKILL_DISCOVERY_RULE'), 'Must contain action skill discovery rule');
    assert.ok(content.includes('STATUTORY_SKILL_MATCH_DECLARATION_BLOCK'), 'Must contain statutory skill match declaration block');
    assert.ok(content.includes('EXPLICIT_SKILL_MATCH_DECLARATION_RULE'), 'Must contain explicit skill match declaration rule');
    assert.ok(content.includes('MANDATORY_ACTION_SKILL_ADOPTION_GATE'), 'Must contain mandatory action skill adoption gate');
    assert.ok(content.includes('SKILL_BYPASS_BLOCKED'), 'Must contain skill bypass blocked rule');
    assert.ok(content.includes('SWARM_BRIEF_SKILL_INHERITANCE_PROTOCOL'), 'Must contain swarm brief skill inheritance protocol');
    assert.ok(content.includes('SWARM_BRIEF_SKILL_INHERITANCE_RULE'), 'Must contain swarm brief skill inheritance rule');
    assert.ok(content.includes('UNIVERSAL_SKILL_DISCOVERY_STANDARD'), 'Must contain universal skill discovery standard');
  });

  await t.test('2. Living Spec codification in pstack-openspec & ai-harness-openspec', () => {
    assert.ok(fs.existsSync(pstackSkillPath), 'pstack-openspec SKILL.md must exist');
    const pstackContent = fs.readFileSync(pstackSkillPath, 'utf8');
    assert.ok(pstackContent.includes('ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM'), 'pstack-openspec must contain Axiom 57');
    assert.ok(pstackContent.includes('TASK_TIME_ACTION_SKILL_SCAN_PROTOCOL'), 'pstack-openspec must include scan protocol');
    assert.ok(pstackContent.includes('STATUTORY_SKILL_MATCH_DECLARATION_BLOCK'), 'pstack-openspec must include declaration block');
    assert.ok(pstackContent.includes('MANDATORY_ACTION_SKILL_ADOPTION_GATE'), 'pstack-openspec must include adoption gate');
    assert.ok(pstackContent.includes('SKILL_BYPASS_BLOCKED'), 'pstack-openspec must include bypass blocked');
    assert.ok(pstackContent.includes('SWARM_BRIEF_SKILL_INHERITANCE_PROTOCOL'), 'pstack-openspec must include brief inheritance');
    assert.ok(pstackContent.includes('UNIVERSAL_SKILL_DISCOVERY_STANDARD'), 'pstack-openspec must include universal standard');

    assert.ok(fs.existsSync(harnessSkillPath), 'ai-harness-openspec SKILL.md must exist');
    const harnessContent = fs.readFileSync(harnessSkillPath, 'utf8');
    assert.ok(harnessContent.includes('ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM'), 'ai-harness-openspec must contain Axiom 57');
    assert.ok(harnessContent.includes('TASK_TIME_ACTION_SKILL_SCAN_PROTOCOL'), 'ai-harness-openspec must include scan protocol');
    assert.ok(harnessContent.includes('MANDATORY_ACTION_SKILL_ADOPTION_GATE'), 'ai-harness-openspec must include adoption gate');
  });

  await t.test('3. OpenSpec delta spec verification', () => {
    assert.ok(fs.existsSync(changeSpecPath), 'Delta spec.md must exist');
    const specContent = fs.readFileSync(changeSpecPath, 'utf8');

    assert.ok(specContent.includes('Requirement: Task-Time Action Skill Discovery and Semantic Matching Axiom'), 'Must contain Req 1');
    assert.ok(specContent.includes('Requirement: Explicit Skill Match Declaration in Gate 1 and Gate 2'), 'Must contain Req 2');
    assert.ok(specContent.includes('Requirement: Mandatory Active Adoption and Constraint Injection Gate'), 'Must contain Req 3');
    assert.ok(specContent.includes('Requirement: Swarm Worker Brief Skill Inheritance'), 'Must contain Req 4');
    assert.ok(specContent.includes('Requirement: Axiom 57 Constitutional Legislation and Universal Domain Neutrality'), 'Must contain Req 5');
  });

  await t.test('4. Semantic Matching Engine Simulation against Section 3.1 Action Skills', () => {
    const actionSkillRegistry = [
      {
        id: 'desktop-exe-development',
        path: 'skills/desktop-exe-development/SKILL.md',
        triggers: ['exe开发', '桌面应用', 'tauri', 'windows exe', '打包exe', 'desktop app', 'exe打包', 'gui开发', '桌面软件']
      },
      {
        id: 'ui-ux-design-engineering',
        path: 'skills/ui-ux-design-engineering/SKILL.md',
        triggers: ['ui设计', 'ux设计', '前端设计', '界面设计', '页面排版', 'frontend design', '设计规范', '设计系统', '配色方案', '组件库设计']
      },
      {
        id: 'rea-reverse-engineering',
        path: 'skills/rea-reverse-engineering/SKILL.md',
        triggers: ['rea', '逆向工程', '反编译', '反汇编', '逆向分析', '二进制分析', '脱壳', 'apk逆向', 'electron逆向', 'asar解包', 'reverse engineering']
      }
    ];

    const matchActionSkill = (query) => {
      const q = query.toLowerCase();
      for (const skill of actionSkillRegistry) {
        if (skill.triggers.some(trigger => q.includes(trigger.toLowerCase()))) {
          return skill.id;
        }
      }
      return '[None - Standard Engineering Playbook]';
    };

    assert.equal(matchActionSkill('我要开发一个 Windows 桌面应用，打包exe'), 'desktop-exe-development');
    assert.equal(matchActionSkill('使用 REA 对第三方二进制反编译进行逆向分析'), 'rea-reverse-engineering');
    assert.equal(matchActionSkill('重构前端页面排版，建立符合设计规范的配色方案与 ui设计'), 'ui-ux-design-engineering');
    assert.equal(matchActionSkill('纯数学矩阵连乘单元测试与算法优化'), '[None - Standard Engineering Playbook]');
  });

  await t.test('5. Domain Neutrality & Anti-Scenario Token Leakage Audit', () => {
    const content = fs.readFileSync(geminiMdPath, 'utf8');
    const axiom57Match = content.match(/57\.\s+\*\*执行层技能主动感知匹配与强制应用公理[\s\S]*?(?=### 3\.1|\n\n\d+\.)/);
    assert.ok(axiom57Match, 'Axiom 57 block must be extracted');
    const axiomText = axiom57Match[0];

    // Verify formal engineering terms
    assert.ok(axiomText.includes('ACTION_SKILL_PROACTIVE_DISCOVERY_&_MANDATORY_ADOPTION_AXIOM'), 'Must cite Axiom 57 identifier');
    assert.ok(axiomText.includes('TASK_TIME_ACTION_SKILL_SCAN_PROTOCOL'), 'Must cite task-time scan protocol');
    assert.ok(axiomText.includes('MANDATORY_ACTION_SKILL_ADOPTION_GATE'), 'Must cite adoption gate');
    assert.ok(axiomText.includes('SKILL_BYPASS_BLOCKED'), 'Must cite bypass blocked rule');

    // Verify absence of proprietary business tokens
    const forbiddenScenarioTokens = ['guangzhi', 'guocai', 'yingde', 'msds', 'tds', 'reach', 'rohs', 'chemical'];
    for (const token of forbiddenScenarioTokens) {
      assert.ok(!axiomText.toLowerCase().includes(token), `Axiom 57 must not contain scenario token: ${token}`);
    }
  });

  await t.test('6. Swarm Dispatch Brief Schema and Directive Contract Verification', () => {
    const validateBriefDirective = (brief, matchedSkill) => {
      if (matchedSkill && matchedSkill !== '[None - Standard Engineering Playbook]') {
        const expectedTag = `🚨 [MANDATORY ACTION SKILL: ${matchedSkill}]`;
        return brief.includes(expectedTag);
      }
      return true;
    };

    const briefWithSkill = '@worker-1 Apply Task 3.1. 🚨 [MANDATORY ACTION SKILL: desktop-exe-development] Execute under Tauri v2 SOP.';
    const briefWithoutSkill = '@worker-1 Apply Task 3.1. Execute under standard engineering playbook.';

    assert.equal(validateBriefDirective(briefWithSkill, 'desktop-exe-development'), true);
    assert.equal(validateBriefDirective(briefWithoutSkill, 'desktop-exe-development'), false);
    assert.equal(validateBriefDirective(briefWithoutSkill, '[None - Standard Engineering Playbook]'), true);
  });
});
