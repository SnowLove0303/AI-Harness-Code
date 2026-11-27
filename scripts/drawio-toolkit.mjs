import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function fitLabelWidth(label, minWidth = 130) {
  const text = String(label || '');
  let width = 36;
  for (const ch of text) {
    width += ch.charCodeAt(0) > 255 ? 14 : 8;
  }
  return Math.max(minWidth, Math.min(340, width));
}

const NODE_STYLE_MAP = new Map([
  ['start', 'ellipse;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;fontColor=#14532d;fontStyle=1;'],
  ['end', 'ellipse;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#dc2626;fontColor=#7f1d1d;fontStyle=1;'],
  ['decision', 'rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#d97706;fontColor=#92400e;fontStyle=1;'],
  ['datastore', 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=12;fillColor=#ede9fe;strokeColor=#7c3aed;fontColor=#4c1d95;'],
  ['document', 'shape=document;whiteSpace=wrap;html=1;boundedLbl=1;fillColor=#f0fdf4;strokeColor=#16a34a;fontColor=#14532d;'],
  ['process', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;fontColor=#0f172a;'],
]);

function assignTopologicalLayers(nodes, edges) {
  const inDegree = new Map(nodes.map((n) => [n.id, 0]));
  const adj = new Map(nodes.map((n) => [n.id, []]));
  for (const e of edges) {
    if (adj.has(e.from) && inDegree.has(e.to) && e.from !== e.to) {
      adj.get(e.from).push(e.to);
      inDegree.set(e.to, inDegree.get(e.to) + 1);
    }
  }
  const layer = new Map();
  const queue = [];
  for (const n of nodes) {
    if ((inDegree.get(n.id) || 0) === 0) {
      queue.push(n.id);
      layer.set(n.id, 0);
    }
  }
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    const uLayer = layer.get(u) || 0;
    for (const v of adj.get(u) || []) {
      layer.set(v, Math.max(layer.get(v) || 0, uLayer + 1));
      inDegree.set(v, inDegree.get(v) - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }
  let fallback = 0;
  for (const n of nodes) {
    if (!layer.has(n.id)) layer.set(n.id, fallback++);
  }
  return layer;
}

/**
 * Compiles a Diagram IR (flowchart or cross-functional swimlane) into collision-free,
 * gap-routed orthogonal Draw.io <mxfile> XML (fusing next-ai-draw-io + drawio-skill).
 */
export function buildFlowchartOrSwimlaneXml(ir) {
  const title = escapeXml(ir?.title || 'Business Process');
  const direction = ir?.direction === 'LR' ? 'LR' : 'TB';
  const lanes = Array.isArray(ir?.lanes) ? ir.lanes : [];
  const nodes = Array.isArray(ir?.nodes) ? ir.nodes : [];
  const edges = Array.isArray(ir?.edges) ? ir.edges : [];
  const isSwimlane = lanes.length > 0;

  const layers = assignTopologicalLayers(nodes, edges);
  const laneOrder = new Map(lanes.map((l, i) => [l.id, i]));

  const colW = 220;
  const rowH = 120;
  const laneHeader = 44;
  const padX = 40;
  const padY = 40;

  const slotCounts = new Map();
  const nodeBoxes = new Map();
  const cells = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  const maxLayer = Math.max(0, ...Array.from(layers.values()));
  const laneSizes = new Map();
  for (const n of nodes) {
    const lIdx = isSwimlane ? (laneOrder.get(n.lane) ?? 0) : 0;
    const lay = layers.get(n.id) ?? 0;
    const key = `${lIdx}:${lay}`;
    slotCounts.set(key, (slotCounts.get(key) || 0) + 1);
    laneSizes.set(lIdx, Math.max(laneSizes.get(lIdx) || 1, slotCounts.get(key)));
  }

  // Emit swimlane containers if present
  const laneOffsets = new Map();
  if (isSwimlane) {
    let cursor = padX;
    lanes.forEach((lane, lIdx) => {
      const subCols = laneSizes.get(lIdx) || 1;
      const laneW = Math.max(colW, subCols * colW);
      const laneH = laneHeader + (maxLayer + 1) * rowH + 30;
      const x = direction === 'TB' ? cursor : padX;
      const y = direction === 'TB' ? padY : cursor;
      const w = direction === 'TB' ? laneW : laneH;
      const h = direction === 'TB' ? laneH : laneW;
      laneOffsets.set(lane.id, { x, y, w, h });
      cells.push(
        `<mxCell id="lane_${escapeXml(lane.id)}" value="${escapeXml(lane.label || lane.id)}" style="swimlane;whiteSpace=wrap;html=1;startSize=${laneHeader};fillColor=#f8fafc;strokeColor=#cbd5e1;fontStyle=1;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
      );
      cursor += (direction === 'TB' ? w : h) + 20;
    });
  }

  const slotUsed = new Map();
  for (const n of nodes) {
    const lIdx = isSwimlane ? (laneOrder.get(n.lane) ?? 0) : 0;
    const lay = layers.get(n.id) ?? 0;
    const key = `${lIdx}:${lay}`;
    const idxInSlot = slotUsed.get(key) || 0;
    slotUsed.set(key, idxInSlot + 1);

    const w = fitLabelWidth(n.label, n.kind === 'decision' ? 120 : 140);
    const h = n.kind === 'decision' ? 66 : 52;
    const parentId = isSwimlane && n.lane && laneOffsets.has(n.lane) ? `lane_${escapeXml(n.lane)}` : '1';

    let localX;
    let localY;
    if (isSwimlane && parentId !== '1') {
      localX = direction === 'TB'
        ? idxInSlot * colW + Math.floor((colW - w) / 2)
        : laneHeader + lay * colW + Math.floor((colW - w) / 2);
      localY = direction === 'TB'
        ? laneHeader + 24 + lay * rowH
        : idxInSlot * rowH + Math.floor((rowH - h) / 2);
    } else {
      localX = direction === 'TB'
        ? padX + idxInSlot * colW + Math.floor((colW - w) / 2)
        : padX + lay * colW + Math.floor((colW - w) / 2);
      localY = direction === 'TB'
        ? padY + lay * rowH
        : padY + idxInSlot * rowH;
    }

    const parentBox = isSwimlane && n.lane && laneOffsets.has(n.lane)
      ? laneOffsets.get(n.lane)
      : { x: 0, y: 0 };
    nodeBoxes.set(n.id, {
      id: n.id,
      x: parentBox.x + localX,
      y: parentBox.y + localY,
      width: w,
      height: h,
      layer: lay,
    });

    const style = NODE_STYLE_MAP.get(n.kind || 'process') || NODE_STYLE_MAP.get('process');
    cells.push(
      `<mxCell id="${escapeXml(n.id)}" value="${escapeXml(n.label)}" style="${style}" vertex="1" parent="${parentId}"><mxGeometry x="${localX}" y="${localY}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  }

  // Gap-routed orthogonal edges with distinct track offsets
  const pairSeen = new Map();
  edges.forEach((e, idx) => {
    const src = nodeBoxes.get(e.from);
    const tgt = nodeBoxes.get(e.to);
    const edgeId = escapeXml(e.id || `edge_${idx + 1}`);
    if (!src || !tgt) {
      cells.push(
        `<mxCell id="${edgeId}" value="${escapeXml(e.label || '')}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="${escapeXml(e.from)}" target="${escapeXml(e.to)}"><mxGeometry relative="1" as="geometry"/></mxCell>`
      );
      return;
    }

    const pairKey = [e.from, e.to].sort().join('::');
    const pairIdx = pairSeen.get(pairKey) || 0;
    pairSeen.set(pairKey, pairIdx + 1);
    const isBackward = tgt.layer <= src.layer;
    const trackOffset = (pairIdx % 3) * 16 + (isBackward ? 28 : 0);

    let exitX = 0.5;
    let exitY = 1;
    let entryX = 0.5;
    let entryY = 0;
    const points = [];

    if (direction === 'LR') {
      exitX = isBackward ? 0.5 : 1;
      exitY = isBackward ? 0 : 0.5;
      entryX = isBackward ? 0.5 : 0;
      entryY = isBackward ? 0 : 0.5;
      if (isBackward) {
        const laneY = Math.min(src.y, tgt.y) - 24 - trackOffset;
        points.push({ x: src.x + src.width / 2, y: laneY }, { x: tgt.x + tgt.width / 2, y: laneY });
      } else if (Math.abs(src.y - tgt.y) > 4 || src.layer + 1 < tgt.layer) {
        const midX = src.x + src.width + 24 + trackOffset;
        points.push({ x: midX, y: src.y + src.height / 2 }, { x: midX, y: tgt.y + tgt.height / 2 });
      }
    } else if (isBackward) {
      exitX = 1;
      exitY = 0.5;
      entryX = 1;
      entryY = 0.5;
      const bypassX = Math.max(src.x + src.width, tgt.x + tgt.width) + 28 + trackOffset;
      points.push({ x: bypassX, y: src.y + src.height / 2 }, { x: bypassX, y: tgt.y + tgt.height / 2 });
    } else if (Math.abs(src.x - tgt.x) > 4 || src.layer + 1 < tgt.layer) {
      const midY = src.y + src.height + 24 + (pairIdx % 3) * 12;
      points.push({ x: src.x + src.width / 2, y: midY }, { x: tgt.x + tgt.width / 2, y: midY });
    }

    const style = `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;`;
    const pointsXml = points.length > 0
      ? `<Array as="points">${points.map((p) => `<mxPoint x="${Math.round(p.x)}" y="${Math.round(p.y)}"/>`).join('')}</Array>`
      : '';
    cells.push(
      `<mxCell id="${edgeId}" value="${escapeXml(e.label || '')}" style="${style}" edge="1" parent="1" source="${escapeXml(e.from)}" target="${escapeXml(e.to)}"><mxGeometry relative="1" as="geometry">${pointsXml}</mxGeometry></mxCell>`
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="app.diagrams.net">\n  <diagram id="page-1" name="${title}">\n    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200">\n      <root>\n        ${cells.join('\n        ')}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`;
}

const MUTATION_HANDLERS = new Map([
  ['add-node', (out, op) => {
    const style = NODE_STYLE_MAP.get(op.kind || 'process') || NODE_STYLE_MAP.get('process');
    const w = op.width || fitLabelWidth(op.label);
    const h = op.height || 52;
    const cell = `<mxCell id="${escapeXml(op.id)}" value="${escapeXml(op.label)}" style="${style}" vertex="1" parent="${escapeXml(op.parent || '1')}"><mxGeometry x="${op.x ?? 40}" y="${op.y ?? 40}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
    return out.replace('</root>', `  ${cell}\n      </root>`);
  }],
  ['add-edge', (out, op) => {
    const cell = `<mxCell id="${escapeXml(op.id)}" value="${escapeXml(op.label || '')}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="${escapeXml(op.source)}" target="${escapeXml(op.target)}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
    return out.replace('</root>', `  ${cell}\n      </root>`);
  }],
  ['delete-cell', (out, op) => {
    const escId = String(op.id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let next = out.replace(new RegExp(`\\s*<mxCell\\b[^>]*\\bid="${escId}"[^>]*>(?:[\\s\\S]*?<\\/mxCell>)?`, 'g'), '');
    next = next.replace(new RegExp(`\\s*<mxCell\\b[^>]*\\b(?:source|target)="${escId}"[^>]*>(?:[\\s\\S]*?<\\/mxCell>)?`, 'g'), '');
    return next;
  }],
  ['update-cell', (out, op) => {
    const escId = String(op.id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let next = out;
    if (op.label !== undefined) {
      next = next.replace(new RegExp(`(<mxCell\\b[^>]*\\bid="${escId}"[^>]*\\bvalue=")[^"]*(")`), `$1${escapeXml(op.label)}$2`);
    }
    if (op.style !== undefined) {
      next = next.replace(new RegExp(`(<mxCell\\b[^>]*\\bid="${escId}"[^>]*\\bstyle=")[^"]*(")`), `$1${escapeXml(op.style)}$2`);
    }
    return next;
  }],
]);

/**
 * Fine-grained incremental cell/edge mutation primitives (inspired by drawio-mcp-server & next-ai-draw-io).
 */
export function mutateDrawioXml(xml, ops = []) {
  let out = String(xml || '');
  for (const op of ops) {
    const handler = MUTATION_HANDLERS.get(op.op);
    if (handler) out = handler(out, op);
  }
  return out;
}

function parseAttrs(str) {
  const attrs = {};
  const re = /([a-zA-Z0-9_:-]+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(str)) !== null) attrs[m[1]] = m[2];
  return attrs;
}

function segIntersectsBox(p1, p2, box) {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);
  return maxX > box.x + 2 && minX < box.x + box.width - 2 && maxY > box.y + 2 && minY < box.y + box.height - 2;
}

/**
 * Deterministic L2 geometric & topological validator (score 0-100).
 */
export function validateDrawioGeometry(xml) {
  const errors = [];
  const warnings = [];
  const cellIds = new Set();
  const absBoxes = new Map();
  const edges = [];

  const cellRe = /<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g;
  const rawCells = [];
  let m;
  while ((m = cellRe.exec(String(xml || ''))) !== null) {
    const attrs = parseAttrs(m[1]);
    rawCells.push({ attrs, inner: m[2] || '' });
    if (attrs.id) {
      if (cellIds.has(attrs.id)) {
        errors.push({ code: 'DUPLICATE_CELL_ID_BLOCKED', id: attrs.id, message: `Duplicate mxCell id '${attrs.id}'.` });
      }
      cellIds.add(attrs.id);
    }
  }

  for (const { attrs, inner } of rawCells) {
    if (attrs.vertex === '1') {
      const gm = inner.match(/<mxGeometry\b([^>]*?)\/?>/);
      if (gm) {
        const g = parseAttrs(gm[1]);
        absBoxes.set(attrs.id, {
          id: attrs.id,
          parent: attrs.parent || '1',
          isSwimlane: (attrs.style || '').includes('swimlane'),
          x: Number(g.x || 0),
          y: Number(g.y || 0),
          width: Number(g.width || 0),
          height: Number(g.height || 0),
        });
      }
    } else if (attrs.edge === '1') {
      const pts = [];
      const ptRe = /<mxPoint\b([^>]*?)\/?>/g;
      let pm;
      while ((pm = ptRe.exec(inner)) !== null) {
        const pa = parseAttrs(pm[1]);
        if (pa.x !== undefined && pa.y !== undefined) {
          pts.push({ x: Number(pa.x), y: Number(pa.y) });
        }
      }
      edges.push({ id: attrs.id, source: attrs.source, target: attrs.target, points: pts });
    }
  }

  // Resolve parent container offsets for absolute coordinates
  const resolved = new Map();
  for (const [id, b] of absBoxes.entries()) {
    let ax = b.x;
    let ay = b.y;
    let p = b.parent;
    const guard = new Set([id]);
    while (p && p !== '1' && p !== '0' && absBoxes.has(p) && !guard.has(p)) {
      guard.add(p);
      const pb = absBoxes.get(p);
      ax += pb.x;
      ay += pb.y;
      p = pb.parent;
    }
    resolved.set(id, { ...b, x: ax, y: ay });
  }

  const shapeList = Array.from(resolved.values()).filter((b) => !b.isSwimlane);
  for (let i = 0; i < shapeList.length; i++) {
    for (let j = i + 1; j < shapeList.length; j++) {
      const a = shapeList[i];
      const b = shapeList[j];
      if (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) {
        errors.push({ code: 'VERTEX_OVERLAP_DETECTED', message: `Shapes '${a.id}' and '${b.id}' overlap.` });
      }
    }
  }

  for (const edge of edges) {
    if ((edge.source && !cellIds.has(edge.source)) || (edge.target && !cellIds.has(edge.target))) {
      errors.push({ code: 'DANGLING_EDGE_TARGET_BLOCKED', id: edge.id, message: `Edge '${edge.id}' references missing source/target.` });
      continue;
    }
    if (edge.points.length >= 2) {
      for (let i = 0; i < edge.points.length - 1; i++) {
        for (const box of shapeList) {
          if (box.id === edge.source || box.id === edge.target) continue;
          if (segIntersectsBox(edge.points[i], edge.points[i + 1], box)) {
            errors.push({ code: 'EDGE_CROSSES_NODE_BLOCKED', id: edge.id, message: `Edge '${edge.id}' crosses intermediate shape '${box.id}'.` });
          }
        }
      }
    }
  }

  const score = Math.max(0, 100 - errors.length * 25 - warnings.length * 5);
  return { valid: errors.length === 0, score, errors, warnings };
}

const CLI_HANDLERS = new Map([
  ['build', (raw, outPath) => {
    const xml = buildFlowchartOrSwimlaneXml(JSON.parse(raw));
    const check = validateDrawioGeometry(xml);
    if (!check.valid) {
      console.error(JSON.stringify(check, null, 2));
      return 1;
    }
    if (outPath) writeFileSync(outPath, xml, 'utf8');
    else process.stdout.write(xml);
    return 0;
  }],
  ['validate', (raw) => {
    const check = validateDrawioGeometry(raw);
    console.log(JSON.stringify(check, null, 2));
    return check.valid ? 0 : 1;
  }],
]);

function runCli() {
  const [cmd, inputPath, outPath] = process.argv.slice(2);
  const handler = CLI_HANDLERS.get(cmd);
  if (!handler || !inputPath || !existsSync(inputPath)) {
    console.error('Usage: node scripts/drawio-toolkit.mjs <build|validate> <input.(json|drawio)> [output.drawio]');
    process.exit(1);
  }
  const raw = readFileSync(inputPath, 'utf8');
  process.exit(handler(raw, outPath));
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runCli();
