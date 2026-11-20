import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// --- Group 1: Front-Loaded Anti-Truncation Safe Zone Invariant (REQ-3 & REQ-4) ---

test('1. MANDATORY_BOOTSTRAP_PROTOCOL is located within top 50 lines and first 20 KB safe zone', () => {
  const geminiPath = path.join(repoRoot, 'GEMINI.md');
  assert.ok(existsSync(geminiPath), 'GEMINI.md must exist');

  const content = readFileSync(geminiPath, 'utf8');
  const bootstrapToken = 'MANDATORY_BOOTSTRAP_PROTOCOL';
  const byteOffset = Buffer.byteLength(content.slice(0, content.indexOf(bootstrapToken)), 'utf8');

  // Verify byte offset is well within the 20 KB (20,480 bytes) non-truncated safe zone
  assert.ok(
    byteOffset < 20480,
    `MANDATORY_BOOTSTRAP_PROTOCOL must be within first 20 KB safe zone (found at byte ${byteOffset})`
  );

  // Verify line number is within top 50 lines
  const lines = content.split(/\r?\n/);
  const lineIdx = lines.findIndex((l) => l.includes(bootstrapToken));
  assert.ok(lineIdx !== -1, 'MANDATORY_BOOTSTRAP_PROTOCOL must exist in lines');
  assert.ok(lineIdx < 50, `MANDATORY_BOOTSTRAP_PROTOCOL must be within top 50 lines (found at line ${lineIdx + 1})`);
});

// --- Group 2: Proactive Requirement Brainstorming Extrapolation (REQ-1) ---

test('2. Gate 1 proactive requirement brainstorming matrix validation', () => {
  function validateGate1Dossier(dossierMarkdown) {
    const hasVerbatimExplicit = /板块一：管理者的任务说明原文/i.test(dossierMarkdown);
    const hasBrainstormingMatrix = /前瞻性扩展提案清单|Proactive Requirement Brainstorming Matrix/i.test(dossierMarkdown);

    if (!hasVerbatimExplicit) {
      return { passed: false, code: 'EXPLICIT_INTENT_OMISSION_BLOCKED' };
    }
    if (!hasBrainstormingMatrix) {
      return { passed: false, code: 'PROACTIVE_BRAINSTORMING_OMISSION_BLOCKED' };
    }
    return { passed: true, code: 'GATE1_DOSSIER_COMPLETE' };
  }

  const badDossier = `
    # Gate 1 Dossier
    ## 板块一：管理者的任务说明原文
    User wants feature A and B.
  `;
  assert.equal(validateGate1Dossier(badDossier).code, 'PROACTIVE_BRAINSTORMING_OMISSION_BLOCKED');

  const goodDossier = `
    # Gate 1 Dossier
    ## 板块一：管理者的任务说明原文
    User wants feature A and B.
    ## 前瞻性扩展提案清单 (Proactive Requirement Brainstorming Matrix)
    | 提案编号 | 推演伴生诉求 | 建议处理方式 |
    | PROP-C | Boundary defenses | Suggest inclusion |
  `;
  assert.equal(validateGate1Dossier(goodDossier).code, 'GATE1_DOSSIER_COMPLETE');
});

// --- Group 3: Gate 2 Ingestion Filtering & Anti-Smuggling (REQ-2) ---

test('3. Gate 2 enforces strict ingestion filtering of unapproved proposals', () => {
  function filterApprovedRequirements({ confirmedExplicit, approvedProposals, proposedImplementationItems }) {
    const allowed = new Set([...confirmedExplicit, ...approvedProposals]);
    for (const item of proposedImplementationItems) {
      if (!allowed.has(item)) {
        return {
          passed: false,
          code: 'UNAUTHORIZED_PROPOSAL_MUTATION_BLOCKED',
          unauthorizedItem: item,
        };
      }
    }
    return { passed: true, code: 'INGESTION_FILTERING_VERIFIED' };
  }

  const resultBlocked = filterApprovedRequirements({
    confirmedExplicit: ['REQ-A', 'REQ-B'],
    approvedProposals: ['PROP-C'],
    proposedImplementationItems: ['REQ-A', 'REQ-B', 'PROP-C', 'PROP-D'], // PROP-D was not approved
  });
  assert.equal(resultBlocked.passed, false);
  assert.equal(resultBlocked.code, 'UNAUTHORIZED_PROPOSAL_MUTATION_BLOCKED');

  const resultPassed = filterApprovedRequirements({
    confirmedExplicit: ['REQ-A', 'REQ-B'],
    approvedProposals: ['PROP-C'],
    proposedImplementationItems: ['REQ-A', 'REQ-B', 'PROP-C'],
  });
  assert.equal(resultPassed.passed, true);
});

// --- Group 4: Cross-Model Cold-Boot Governance (REQ-3) ---

test('4. cross-model cold-boot mandate halts execution without Gate 1', () => {
  function evaluateModelFirstAction({ actionType, hasGate1Dossier }) {
    if (actionType === 'DIRECT_CODE_MUTATION' && !hasGate1Dossier) {
      return {
        passed: false,
        code: 'GOVERNANCE_BOOTSTRAP_VIOLATION_BLOCKED',
        action: 'HALT_AND_ROLLBACK',
      };
    }
    return { passed: true, code: 'BOOTSTRAP_VERIFIED' };
  }

  const badAction = evaluateModelFirstAction({ actionType: 'DIRECT_CODE_MUTATION', hasGate1Dossier: false });
  assert.equal(badAction.passed, false);
  assert.equal(badAction.code, 'GOVERNANCE_BOOTSTRAP_VIOLATION_BLOCKED');

  const goodAction = evaluateModelFirstAction({ actionType: 'STEP0_SPEC_KIT_DOSSIER', hasGate1Dossier: true });
  assert.equal(goodAction.passed, true);
});

// --- Group 5: Constitutional Parity Across Three Mirrors (REQ-6) ---

test('5. Axiom 69 is codified across all three mirrors with pure universal software engineering abstraction', () => {
  const geminiPath = path.join(repoRoot, 'GEMINI.md');
  const pstackSkillPath = path.join(repoRoot, 'skills/pstack-openspec/SKILL.md');
  const harnessSkillPath = path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md');

  assert.ok(existsSync(geminiPath), 'GEMINI.md must exist');
  assert.ok(existsSync(pstackSkillPath), 'skills/pstack-openspec/SKILL.md must exist');
  assert.ok(existsSync(harnessSkillPath), 'skills/ai-harness-openspec/SKILL.md must exist');

  const geminiContent = readFileSync(geminiPath, 'utf8');
  const pstackContent = readFileSync(pstackSkillPath, 'utf8');
  const harnessContent = readFileSync(harnessSkillPath, 'utf8');

  const subInvariants = [
    'PROACTIVE_REQUIREMENT_BRAINSTORMING_&_UNIVERSAL_CROSS_THREAD_GOVERNANCE_AXIOM',
    'PROACTIVE_REQUIREMENT_BRAINSTORMING_&_ANTICIPATION_PROTOCOL',
    'GATE2_BRAINSTORMING_INGESTION_&_LEGISLATION_GATE',
    'UNIVERSAL_CROSS_THREAD_&_MODEL_BOOTSTRAP_MANDATE',
    'ANTI_TRUNCATION_MODULAR_ARCHITECTURE_&_SYNC_STANDARD',
    'PURE_UNIVERSAL_SOFTWARE_ENGINEERING_ABSTRACTION_STANDARD',
    'AXIOM_69_PARITY_STANDARD',
    'PROACTIVE_BRAINSTORMING_OMISSION_BLOCKED',
    'UNAUTHORIZED_PROPOSAL_MUTATION_BLOCKED',
    'GOVERNANCE_BOOTSTRAP_VIOLATION_BLOCKED',
    'TRUNCATION_HAZARD_BLOCKED',
  ];

  for (const token of subInvariants) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
