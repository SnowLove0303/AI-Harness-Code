import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  calculateTextFitWidth,
  compileBusinessLifecycleToDrawioXml,
  validateDrawioXml,
} from '../scripts/check-drawio-model.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

test('1. Swimlane grid compiler produces valid non-overlapping multi-page L0/L1 Draw.io XML', () => {
  const model = {
    title: 'Enterprise-R&D-Lifecycle',
    stages: [
      { id: 's1', name: '1. Concept & Intake' },
      { id: 's2', name: '2. Architecture & Design' },
      { id: 's3', name: '3. Build & Verify' },
    ],
    lanes: [
      { id: 'pm', name: 'Product Governance' },
      { id: 'eng', name: 'Engineering & QA' },
    ],
    nodes: [
      { id: 'n1', stageId: 's1', laneId: 'pm', label: '需求立案', kind: 'task' },
      { id: 'n2', stageId: 's1', laneId: 'pm', label: 'Gate 1 评审', kind: 'gate' },
      { id: 'n3', stageId: 's2', laneId: 'eng', label: '架构规格书', kind: 'artifact' },
      { id: 'n4', stageId: 's3', laneId: 'eng', label: '实现与回归', kind: 'task' },
    ],
    edges: [
      { source: 'n1', target: 'n2', label: 'submit', kind: 'flow' },
      { source: 'n2', target: 'n3', label: 'pass', kind: 'flow' },
      { source: 'n3', target: 'n4', kind: 'flow' },
      { source: 'n4', target: 'n2', label: 'rework', kind: 'loopback' },
    ],
    subpages: [
      {
        name: 'L1-Verify-Detail',
        stages: [{ id: 'v1', name: 'Mechanical & Blind Audit' }],
        lanes: [{ id: 'qa', name: 'Isolated Auditor' }],
        nodes: [{ id: 'v_n1', stageId: 'v1', laneId: 'qa', label: 'Real-Artifact Check', kind: 'task' }],
        edges: [],
      },
    ],
  };

  const xml = compileBusinessLifecycleToDrawioXml(model);
  assert.match(xml, /<mxfile\b/);
  assert.match(xml, /swimlane/);
  assert.match(xml, /rhombus/);
  assert.match(xml, /shape=document/);

  const validation = validateDrawioXml(xml, 'lifecycle.drawio');
  assert.equal(validation.valid, true, `Validation errors: ${JSON.stringify(validation.violations)}`);
  assert.equal(validation.pageCount, 2, 'Must generate both L0 and L1 <diagram> pages');
});

test('2. Diagram-as-Test validator blocks overlapping sibling nodes (DRAWIO_NODE_OVERLAP_BLOCKED)', () => {
  const overlappingXml = `
    <mxfile><diagram id="p1" name="Overlap"><mxGraphModel><root>
      <mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="a" value="Node A" vertex="1" parent="1"><mxGeometry x="100" y="100" width="120" height="50" as="geometry"/></mxCell>
      <mxCell id="b" value="Node B" vertex="1" parent="1"><mxGeometry x="150" y="120" width="120" height="50" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>
  `;
  const res = validateDrawioXml(overlappingXml);
  assert.equal(res.valid, false);
  assert.ok(res.violations.some((v) => v.code === 'DRAWIO_NODE_OVERLAP_BLOCKED'));
});

test('3. Diagram-as-Test validator blocks dangling edges and invalid XML', () => {
  const danglingXml = `
    <mxfile><diagram id="p1" name="Dangling"><mxGraphModel><root>
      <mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="a" value="Node A" vertex="1" parent="1"><mxGeometry x="10" y="10" width="100" height="40" as="geometry"/></mxCell>
      <mxCell id="e1" edge="1" parent="1" source="a" target="missing_node"><mxGeometry relative="1" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>
  `;
  const resDangling = validateDrawioXml(danglingXml);
  assert.equal(resDangling.valid, false);
  assert.ok(resDangling.violations.some((v) => v.code === 'DRAWIO_DANGLING_EDGE_BLOCKED'));

  const invalidXml = '<svg><rect /></svg>';
  const resInvalid = validateDrawioXml(invalidXml);
  assert.equal(resInvalid.valid, false);
  assert.ok(resInvalid.violations.some((v) => v.code === 'DRAWIO_INVALID_XML_BLOCKED'));
});

test('4. CJK/Latin text-fit margin prevents clipping for dense labels', () => {
  const shortW = calculateTextFitWidth('OK', 100);
  const cjkLongW = calculateTextFitWidth('企业级多阶段门径审批与反馈闭环', 120);
  assert.ok(shortW >= 100);
  assert.ok(cjkLongW > 200, `Expected wide box for CJK label, got ${cjkLongW}`);
});

test('5. Upgraded drawio-mcp skill and Axiom 76 parity across all three mirrors', () => {
  const skillPath = path.join(repoRoot, 'skills/drawio-mcp/SKILL.md');
  assert.ok(existsSync(skillPath), 'skills/drawio-mcp/SKILL.md must exist');
  const skillContent = readFileSync(skillPath, 'utf8');
  assert.match(skillContent, /Agents365-ai\/drawio-skill/);
  assert.match(skillContent, /libavoid/);
  assert.match(skillContent, /guard:drawio-model/);

  const geminiContent = readFileSync(path.join(repoRoot, 'GEMINI.md'), 'utf8');
  const pstackContent = readFileSync(path.join(repoRoot, 'skills/pstack-openspec/SKILL.md'), 'utf8');
  const harnessContent = readFileSync(path.join(repoRoot, 'skills/ai-harness-openspec/SKILL.md'), 'utf8');

  const requiredTokens = [
    'DRAWIO_BUSINESS_LIFECYCLE_&_DIAGRAM_AS_TEST_AXIOM',
    'ENTERPRISE_LIFECYCLE_STRUCTURED_MODELING',
    'DETERMINISTIC_SWIMLANE_GRID_COMPILER',
    'MULTI_PAGE_L0_L1_DIAGRAM_PROJECTION',
    'TEXT_FIT_MARGIN_ANTI_CLIPPING_RULE',
    'DRAWIO_SWIMLANE_&_GATE_STYLE_STANDARD',
    'AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD',
    'AXIOM_76_PARITY_&_UNIVERSAL_ABSTRACTION_STANDARD',
    'DRAWIO_NODE_OVERLAP_BLOCKED',
    'DRAWIO_DANGLING_EDGE_BLOCKED',
    'DRAWIO_INVALID_XML_BLOCKED',
  ];

  for (const token of requiredTokens) {
    assert.ok(geminiContent.includes(token), `GEMINI.md missing ${token}`);
    assert.ok(pstackContent.includes(token), `skills/pstack-openspec/SKILL.md missing ${token}`);
    assert.ok(harnessContent.includes(token), `skills/ai-harness-openspec/SKILL.md missing ${token}`);
  }
});
