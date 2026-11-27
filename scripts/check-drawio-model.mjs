import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDrawioGeometry } from './drawio-toolkit.mjs';

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Computes CJK/Latin-aware node width to prevent label clipping inside Draw.io shapes.
 */
export function calculateTextFitWidth(label, minWidth = 140) {
  const text = String(label || '');
  let width = 32; // horizontal padding
  for (const ch of text) {
    width += ch.charCodeAt(0) > 255 ? 14 : 8;
  }
  return Math.max(minWidth, Math.min(360, width));
}

function buildDiagramPageXml(pageSpec, pageIndex) {
  const pageName = escapeXml(pageSpec.name || `Page-${pageIndex + 1}`);
  const stages = Array.isArray(pageSpec.stages) ? pageSpec.stages : [];
  const lanes = Array.isArray(pageSpec.lanes) ? pageSpec.lanes : [];
  const nodes = Array.isArray(pageSpec.nodes) ? pageSpec.nodes : [];
  const edges = Array.isArray(pageSpec.edges) ? pageSpec.edges : [];

  const laneHeaderWidth = 150;
  const colWidth = 240;
  const rowHeight = 140;
  const stageHeaderHeight = 44;
  const totalWidth = laneHeaderWidth + Math.max(1, stages.length) * colWidth;

  const stageIndexMap = new Map(stages.map((s, idx) => [s.id, idx]));
  const laneIndexMap = new Map(lanes.map((l, idx) => [l.id, idx]));

  const cells = [];
  cells.push('<mxCell id="0"/>');
  cells.push('<mxCell id="1" parent="0"/>');

  // Stage column headers
  stages.forEach((stage, sIdx) => {
    const x = laneHeaderWidth + sIdx * colWidth;
    cells.push(
      `<mxCell id="stage_${escapeXml(stage.id)}" value="${escapeXml(stage.name)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0f172a;fontColor=#ffffff;fontStyle=1;strokeColor=#0f172a;" vertex="1" parent="1"><mxGeometry x="${x}" y="0" width="${colWidth}" height="${stageHeaderHeight}" as="geometry"/></mxCell>`
    );
  });

  // Swimlane containers
  lanes.forEach((lane, lIdx) => {
    const y = stageHeaderHeight + lIdx * rowHeight;
    cells.push(
      `<mxCell id="lane_${escapeXml(lane.id)}" value="${escapeXml(lane.name)}" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;startSize=${laneHeaderWidth};fillColor=#f8fafc;strokeColor=#cbd5e1;fontStyle=1;" vertex="1" parent="1"><mxGeometry x="0" y="${y}" width="${totalWidth}" height="${rowHeight}" as="geometry"/></mxCell>`
    );
  });

  // Track slot occupancy per (stage, lane) to stack cleanly without overlap
  const slotCounts = new Map();
  const validNodeIds = new Set();

  for (const node of nodes) {
    const sIdx = stageIndexMap.get(node.stageId) ?? 0;
    const lIdx = laneIndexMap.get(node.laneId) ?? 0;
    const slotKey = `${sIdx}:${lIdx}`;
    const countInSlot = slotCounts.get(slotKey) || 0;
    slotCounts.set(slotKey, countInSlot + 1);

    const nodeW = calculateTextFitWidth(node.label, node.kind === 'gate' ? 110 : 140);
    const nodeH = node.kind === 'gate' ? 64 : 52;
    const localX = laneHeaderWidth + sIdx * colWidth + Math.floor((colWidth - nodeW) / 2);
    const localY = 16 + countInSlot * 62;
    const parentId = lanes.length > 0 ? `lane_${escapeXml(lanes[lIdx].id)}` : '1';

    let style = 'rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;fontColor=#0f172a;';
    if (node.kind === 'gate') {
      style = 'rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;fontStyle=1;';
    } else if (node.kind === 'artifact') {
      style = 'shape=document;whiteSpace=wrap;html=1;boundedLbl=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontColor=#14532d;';
    }

    const safeId = escapeXml(node.id);
    validNodeIds.add(node.id);
    cells.push(
      `<mxCell id="${safeId}" value="${escapeXml(node.label)}" style="${style}" vertex="1" parent="${parentId}"><mxGeometry x="${localX}" y="${localY}" width="${nodeW}" height="${nodeH}" as="geometry"/></mxCell>`
    );
  }

  // Edges (flow + dashed loopback)
  edges.forEach((edge, eIdx) => {
    const isLoopback = edge.kind === 'loopback';
    const edgeStyle = isLoopback
      ? 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;strokeColor=#dc2626;fontColor=#dc2626;'
      : 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;';
    cells.push(
      `<mxCell id="edge_${pageIndex}_${eIdx}" value="${escapeXml(edge.label || '')}" style="${edgeStyle}" edge="1" parent="1" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );
  });

  return `<diagram id="page_${pageIndex}" name="${pageName}"><mxGraphModel dx="1420" dy="820" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${totalWidth + 100}" pageHeight="${stageHeaderHeight + Math.max(1, lanes.length) * rowHeight + 100}"><root>${cells.join('')}</root></mxGraphModel></diagram>`;
}

/**
 * Compiles a structured business lifecycle JSON model into deterministic, non-overlapping
 * multi-page Draw.io XML (L0 overview + optional L1 detail pages).
 */
export function compileBusinessLifecycleToDrawioXml(model) {
  const pages = [
    {
      name: model.title || 'L0-Enterprise-Lifecycle',
      stages: model.stages || [],
      lanes: model.lanes || [],
      nodes: model.nodes || [],
      edges: model.edges || [],
    },
    ...(Array.isArray(model.subpages) ? model.subpages : []),
  ];

  const diagramsXml = pages.map((p, idx) => buildDiagramPageXml(p, idx)).join('');
  return `<mxfile host="app.diagrams.net">${diagramsXml}</mxfile>`;
}

function parseAttributes(attrStr) {
  const attrs = {};
  const re = /(\w+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(attrStr)) !== null) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function boxesOverlap(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

/**
 * Diagram-as-Test L2 Validator:
 * Validates Draw.io XML structure, detects sibling node bounding-box overlaps,
 * and blocks dangling edges referencing non-existent cell IDs.
 */
export function validateDrawioXml(xmlContent, filePath = 'diagram.drawio') {
  const violations = [];
  const xml = String(xmlContent || '').trim();

  if (!xml.includes('<mxGraphModel') || !xml.includes('<root>')) {
    violations.push({
      code: 'DRAWIO_INVALID_XML_BLOCKED',
      file: filePath,
      message: 'Missing required <mxGraphModel> or <root> element.',
    });
    return { valid: false, pageCount: 0, violations };
  }

  const diagramBlocks = xml.match(/<diagram\b[\s\S]*?<\/diagram>/g) || [xml];

  diagramBlocks.forEach((block, pageIdx) => {
    const cellIds = new Set(['0', '1']);
    const verticesByParent = new Map();
    const edges = [];

    const cellRe = /<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g;
    let m;
    while ((m = cellRe.exec(block)) !== null) {
      const attrs = parseAttributes(m[1]);
      const inner = m[2] || '';
      if (attrs.id) {
        cellIds.add(attrs.id);
      }

      if (attrs.vertex === '1') {
        const geomMatch = inner.match(/<mxGeometry\b([^>]*?)\/?>/);
        if (geomMatch) {
          const g = parseAttributes(geomMatch[1]);
          const box = {
            id: attrs.id,
            x: Number(g.x || 0),
            y: Number(g.y || 0),
            width: Number(g.width || 0),
            height: Number(g.height || 0),
          };
          const parentId = attrs.parent || '1';
          if (!verticesByParent.has(parentId)) {
            verticesByParent.set(parentId, []);
          }
          verticesByParent.get(parentId).push(box);
        }
      }

      if (attrs.edge === '1') {
        edges.push({
          id: attrs.id,
          source: attrs.source,
          target: attrs.target,
        });
      }
    }

    // Check sibling overlap per parent container
    for (const [parentId, boxes] of verticesByParent.entries()) {
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          if (boxesOverlap(boxes[i], boxes[j])) {
            violations.push({
              code: 'DRAWIO_NODE_OVERLAP_BLOCKED',
              file: filePath,
              message: `Page ${pageIdx + 1} parent '${parentId}': nodes '${boxes[i].id}' and '${boxes[j].id}' overlap.`,
            });
          }
        }
      }
    }

    // Check dangling edges
    for (const edge of edges) {
      if ((edge.source && !cellIds.has(edge.source)) || (edge.target && !cellIds.has(edge.target))) {
        violations.push({
          code: 'DRAWIO_DANGLING_EDGE_BLOCKED',
          file: filePath,
          message: `Page ${pageIdx + 1}: edge '${edge.id}' references missing source='${edge.source}' or target='${edge.target}'.`,
        });
      }
    }
  });

  const geom = validateDrawioGeometry(xmlContent);
  for (const err of geom.errors) {
    if (err.code === 'EDGE_CROSSES_NODE_BLOCKED' || err.code === 'DUPLICATE_CELL_ID_BLOCKED') {
      violations.push({
        code: err.code,
        file: filePath,
        message: err.message,
      });
    }
  }

  return {
    valid: violations.length === 0,
    pageCount: diagramBlocks.length,
    violations,
  };
}

function findDrawioFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  const ignore = new Set(['.git', 'node_modules', 'dist', 'bundle']);
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignore.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findDrawioFiles(full, acc);
    } else if (entry.name.endsWith('.drawio')) {
      acc.push(full);
    }
  }
  return acc;
}

function runCli() {
  const repoRoot = process.cwd();
  const files = findDrawioFiles(repoRoot);
  const allViolations = [];

  for (const f of files) {
    const content = readFileSync(f, 'utf8');
    const res = validateDrawioXml(content, path.relative(repoRoot, f));
    allViolations.push(...res.violations);
  }

  console.log('=== Automated L2 Draw.io Model Guard (AUTOMATED_L2_DRAWIO_MODEL_GUARD_STANDARD) ===');
  if (allViolations.length > 0) {
    for (const v of allViolations) {
      console.error(`[FAIL] ${v.code} (${v.file}): ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Scanned ${files.length} .drawio file(s), 0 geometric/topological violations detected.`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
