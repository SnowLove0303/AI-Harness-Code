import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildFlowchartOrSwimlaneXml,
  mutateDrawioXml,
  validateDrawioGeometry,
} from '../scripts/drawio-toolkit.mjs';
import { validateDrawioXml } from '../scripts/check-drawio-model.mjs';

test('buildFlowchartOrSwimlaneXml generates zero-overlap, gap-routed swimlane business process XML', () => {
  const xml = buildFlowchartOrSwimlaneXml({
    title: 'Order Approval Swimlane',
    direction: 'TB',
    lanes: [
      { id: 'pm', label: 'Product' },
      { id: 'eng', label: 'Engineering' },
      { id: 'qa', label: 'QA Audit' },
    ],
    nodes: [
      { id: 'n1', label: 'Submit Spec', lane: 'pm', kind: 'start' },
      { id: 'n2', label: 'Implement Feature', lane: 'eng', kind: 'process' },
      { id: 'n3', label: 'Gate Passed?', lane: 'qa', kind: 'decision' },
      { id: 'n4', label: 'Release', lane: 'eng', kind: 'end' },
    ],
    edges: [
      { id: 'e1', from: 'n1', to: 'n2', label: 'approve' },
      { id: 'e2', from: 'n2', to: 'n3', label: 'verify' },
      { id: 'e3', from: 'n3', to: 'n2', label: 'reject' },
      { id: 'e4', from: 'n3', to: 'n4', label: 'pass' },
    ],
  });

  const geom = validateDrawioGeometry(xml);
  assert.equal(geom.valid, true);
  assert.equal(geom.score, 100);
  assert.equal(geom.errors.length, 0);

  const guardRes = validateDrawioXml(xml, 'swimlane.drawio');
  assert.equal(guardRes.valid, true);
});

test('mutateDrawioXml supports fine-grained add, update, and cascade delete without rewriting layout', () => {
  const baseXml = buildFlowchartOrSwimlaneXml({
    title: 'Linear Flow',
    nodes: [
      { id: 'a', label: 'Step A', kind: 'start' },
      { id: 'b', label: 'Step B', kind: 'process' },
    ],
    edges: [{ id: 'e1', from: 'a', to: 'b' }],
  });

  const updated = mutateDrawioXml(baseXml, [
    { op: 'add-node', id: 'c', label: 'Step C', kind: 'end', x: 40, y: 280 },
    { op: 'add-edge', id: 'e2', source: 'b', target: 'c', label: 'next' },
    { op: 'update-cell', id: 'b', label: 'Step B Revised' },
  ]);
  assert.ok(updated.includes('Step B Revised'));
  assert.ok(updated.includes('id="c"'));
  assert.equal(validateDrawioGeometry(updated).valid, true);

  const deleted = mutateDrawioXml(updated, [{ op: 'delete-cell', id: 'b' }]);
  assert.ok(!deleted.includes('id="b"'));
  assert.ok(!deleted.includes('id="e1"'));
  assert.ok(!deleted.includes('id="e2"'));
  assert.equal(validateDrawioGeometry(deleted).valid, true);
});

test('validateDrawioGeometry detects overlaps, dangling edges, and edge-through-node crossings', () => {
  const badXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile><diagram id="p1" name="Bad"><mxGraphModel><root>
  <mxCell id="0"/><mxCell id="1" parent="0"/>
  <mxCell id="n1" value="A" style="rounded=1;" vertex="1" parent="1"><mxGeometry x="40" y="40" width="120" height="60" as="geometry"/></mxCell>
  <mxCell id="n2" value="B" style="rounded=1;" vertex="1" parent="1"><mxGeometry x="80" y="60" width="120" height="60" as="geometry"/></mxCell>
  <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;" edge="1" parent="1" source="n1" target="missing_node">
    <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="100" y="20"/><mxPoint x="100" y="150"/></Array></mxGeometry>
  </mxCell>
  <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;" edge="1" parent="1" source="n1" target="n1">
    <mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="140" y="20"/><mxPoint x="140" y="150"/></Array></mxGeometry>
  </mxCell>
</root></mxGraphModel></diagram></mxfile>`;

  const geom = validateDrawioGeometry(badXml);
  assert.equal(geom.valid, false);
  assert.ok(geom.errors.some((e) => e.code === 'VERTEX_OVERLAP_DETECTED'));
  assert.ok(geom.errors.some((e) => e.code === 'DANGLING_EDGE_TARGET_BLOCKED'));
  assert.ok(geom.errors.some((e) => e.code === 'EDGE_CROSSES_NODE_BLOCKED'));

  const guardRes = validateDrawioXml(badXml, 'bad.drawio');
  assert.equal(guardRes.valid, false);
  assert.ok(guardRes.violations.some((v) => v.code === 'EDGE_CROSSES_NODE_BLOCKED'));
});
