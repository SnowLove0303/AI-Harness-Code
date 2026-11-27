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

// DRW-01: Unified monochrome industrial palette whitelist
export const MONOCHROME_COLOR_WHITELIST = new Set([
  '#ffffff',
  '#f8f8f8',
  '#f5f5f5',
  '#000000',
  '#333333',
  '#666666',
  'none',
]);

export const CANVAS_MAX_WIDTH = 3200;
export const CANVAS_MAX_HEIGHT = 1300;

const NODE_STYLE_MAP = new Map([
  ['start', 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#000000;fontColor=#000000;fontStyle=1;strokeWidth=1.2;'],
  ['end', 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#000000;fontColor=#000000;fontStyle=1;strokeWidth=2;'],
  ['decision', 'rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#000000;fontColor=#000000;fontStyle=1;strokeWidth=1.2;'],
  ['sub', 'shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;fillColor=#FFFFFF;strokeColor=#000000;fontColor=#000000;strokeWidth=1.2;'],
  ['datastore', 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=12;fillColor=#FFFFFF;strokeColor=#333333;fontColor=#000000;strokeWidth=1.2;'],
  ['document', 'shape=document;whiteSpace=wrap;html=1;boundedLbl=1;fillColor=#FFFFFF;strokeColor=#333333;fontColor=#000000;strokeWidth=1.2;'],
  ['process', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#333333;fontColor=#000000;strokeWidth=1.2;'],
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
 * gap-routed orthogonal Draw.io <mxfile> XML enforcing DRW-01 through DRW-08.
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
  const colW = 230;
  const rowH = 120;
  const laneHeader = 44;
  const padX = 40;
  const padY = 40;

  const slotCounts = new Map();
  const nodeBoxes = new Map();
  const maxLayer = Math.max(0, ...Array.from(layers.values()));
  const laneSizes = new Map();
  for (const n of nodes) {
    const lIdx = isSwimlane ? (laneOrder.get(n.lane) ?? 0) : 0;
    const lay = layers.get(n.id) ?? 0;
    const key = `${lIdx}:${lay}`;
    slotCounts.set(key, (slotCounts.get(key) || 0) + 1);
    laneSizes.set(lIdx, Math.max(laneSizes.get(lIdx) || 1, slotCounts.get(key)));
  }

  const laneCells = [];
  const laneOffsets = new Map();
  let totalSpanY = padY;
  let totalSpanX = padX;

  if (isSwimlane) {
    let cursor = padX;
    lanes.forEach((lane, lIdx) => {
      const subCols = laneSizes.get(lIdx) || 1;
      const laneCross = Math.max(direction === 'LR' ? rowH : colW, subCols * (direction === 'LR' ? rowH : colW));
      const laneAlong = laneHeader + (maxLayer + 1) * (direction === 'LR' ? colW : rowH) + 30;
      const x = direction === 'TB' ? cursor : padX;
      const y = direction === 'TB' ? padY : cursor;
      const w = direction === 'TB' ? laneCross : laneAlong;
      const h = direction === 'TB' ? laneAlong : laneCross;
      laneOffsets.set(lane.id, { x, y, w, h });
      laneCells.push({
        id: `lane_${escapeXml(lane.id)}`,
        label: escapeXml(lane.label || lane.id),
        x,
        y,
        w,
        h,
      });
      cursor += (direction === 'TB' ? w : h) + 20;
      totalSpanX = Math.max(totalSpanX, x + w);
      totalSpanY = Math.max(totalSpanY, y + h);
    });
  }

  const slotUsed = new Map();
  const rawNodes = [];
  for (const n of nodes) {
    const lIdx = isSwimlane ? (laneOrder.get(n.lane) ?? 0) : 0;
    const lay = layers.get(n.id) ?? 0;
    const key = `${lIdx}:${lay}`;
    const idxInSlot = slotUsed.get(key) || 0;
    const totalInSlot = slotCounts.get(key) || 1;
    slotUsed.set(key, idxInSlot + 1);

    const w = fitLabelWidth(n.label, n.kind === 'decision' ? 120 : 140);
    const h = n.kind === 'decision' ? 66 : 52;
    const parentId = isSwimlane && n.lane && laneOffsets.has(n.lane) ? `lane_${escapeXml(n.lane)}` : '1';

    let localX;
    let localY;
    if (isSwimlane && parentId !== '1') {
      const laneBox = laneOffsets.get(n.lane);
      localX = direction === 'TB'
        ? idxInSlot * colW + Math.floor((colW - w) / 2)
        : laneHeader + lay * colW + Math.floor((colW - w) / 2);
      if (direction === 'TB') {
        localY = laneHeader + 24 + lay * rowH;
      } else {
        // DRW-07: Center slot group vertically within lane height
        const groupH = totalInSlot * rowH;
        const startY = Math.floor((laneBox.h - groupH) / 2);
        localY = startY + idxInSlot * rowH + Math.floor((rowH - h) / 2);
      }
    } else {
      localX = direction === 'TB'
        ? padX + idxInSlot * colW + Math.floor((colW - w) / 2)
        : padX + lay * colW + Math.floor((colW - w) / 2);
      if (direction === 'TB') {
        localY = padY + lay * rowH;
      } else {
        // DRW-07: Symmetric vertical centering per layer
        const maxSlot = Math.max(1, ...Array.from(slotCounts.values()));
        const maxH = maxSlot * rowH;
        const groupH = totalInSlot * rowH;
        const startY = padY + Math.floor((maxH - groupH) / 2);
        localY = startY + idxInSlot * rowH + Math.floor((rowH - h) / 2);
      }
    }

    const parentBox = isSwimlane && n.lane && laneOffsets.has(n.lane)
      ? laneOffsets.get(n.lane)
      : { x: 0, y: 0 };
    const absX = parentBox.x + localX;
    const absY = parentBox.y + localY;
    totalSpanX = Math.max(totalSpanX, absX + w);
    totalSpanY = Math.max(totalSpanY, absY + h);

    rawNodes.push({ n, parentId, localX, localY, absX, absY, w, h, lay });
  }

  const pageWidth = Math.min(CANVAS_MAX_WIDTH, Math.max(1200, totalSpanX + padX));
  const pageHeight = Math.min(CANVAS_MAX_HEIGHT, Math.max(600, totalSpanY + padY));

  // DRW-07: For LR diagrams, shift top-level Y so content vertical center aligns with pageHeight / 2
  let shiftY = 0;
  if (direction === 'LR' && rawNodes.length > 0) {
    const minContentY = isSwimlane
      ? Math.min(...laneCells.map((l) => l.y))
      : Math.min(...rawNodes.map((r) => r.absY));
    const maxContentY = isSwimlane
      ? Math.max(...laneCells.map((l) => l.y + l.h))
      : Math.max(...rawNodes.map((r) => r.absY + r.h));
    const contentCy = (minContentY + maxContentY) / 2;
    shiftY = Math.round(pageHeight / 2 - contentCy);
  }

  const cells = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];
  for (const l of laneCells) {
    const ly = l.y + shiftY;
    cells.push(
      `<mxCell id="${l.id}" value="${l.label}" style="swimlane;horizontal=${direction === 'LR' ? 0 : 1};whiteSpace=wrap;html=1;startSize=${laneHeader};fillColor=#F8F8F8;strokeColor=#333333;fontColor=#000000;fontStyle=1;" vertex="1" parent="1"><mxGeometry x="${l.x}" y="${ly}" width="${l.w}" height="${l.h}" as="geometry"/></mxCell>`
    );
  }

  for (const r of rawNodes) {
    const finalLocalY = r.parentId === '1' ? r.localY + shiftY : r.localY;
    const finalAbsY = r.absY + shiftY;
    nodeBoxes.set(r.n.id, {
      id: r.n.id,
      x: r.absX,
      y: finalAbsY,
      width: r.w,
      height: r.h,
      layer: r.lay,
    });
    const style = NODE_STYLE_MAP.get(r.n.kind || 'process') || NODE_STYLE_MAP.get('process');
    cells.push(
      `<mxCell id="${escapeXml(r.n.id)}" value="${escapeXml(r.n.label)}" style="${style}" vertex="1" parent="${r.parentId}"><mxGeometry x="${r.localX}" y="${finalLocalY}" width="${r.w}" height="${r.h}" as="geometry"/></mxCell>`
    );
  }

  // DRW-08: Precompute shared trunkX / trunkY for multi-branch forward fan-out from same source
  const forwardFanOut = new Map();
  for (const e of edges) {
    const src = nodeBoxes.get(e.from);
    const tgt = nodeBoxes.get(e.to);
    if (!src || !tgt || tgt.layer <= src.layer) continue;
    if (!forwardFanOut.has(e.from)) forwardFanOut.set(e.from, []);
    forwardFanOut.get(e.from).push(e);
  }

  // Gap-routed orthogonal edges with distinct track offsets & DRW-05 midpoint anchors
  const pairSeen = new Map();
  edges.forEach((e, idx) => {
    const src = nodeBoxes.get(e.from);
    const tgt = nodeBoxes.get(e.to);
    const edgeId = escapeXml(e.id || `edge_${idx + 1}`);
    if (!src || !tgt) {
      cells.push(
        `<mxCell id="${edgeId}" value="${escapeXml(e.label || '')}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#000000;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="${escapeXml(e.from)}" target="${escapeXml(e.to)}"><mxGeometry relative="1" as="geometry"/></mxCell>`
      );
      return;
    }

    const pairKey = [e.from, e.to].sort().join('::');
    const pairIdx = pairSeen.get(pairKey) || 0;
    pairSeen.set(pairKey, pairIdx + 1);
    const isBackward = tgt.layer <= src.layer;
    const trackOffset = (pairIdx % 3) * 18 + (isBackward ? 28 : 0);

    let exitX = 0.5;
    let exitY = 1;
    let entryX = 0.5;
    let entryY = 0;
    const points = [];
    const hasMultiBranch = (forwardFanOut.get(e.from) || []).length > 1;

    if (direction === 'LR') {
      exitX = isBackward ? 0.5 : 1;
      exitY = isBackward ? 0 : 0.5;
      entryX = isBackward ? 0.5 : 0;
      entryY = isBackward ? 0 : 0.5;
      if (isBackward) {
        const laneY = Math.min(src.y, tgt.y) - 24 - trackOffset;
        points.push({ x: src.x + src.width / 2, y: laneY }, { x: tgt.x + tgt.width / 2, y: laneY });
      } else if (hasMultiBranch || Math.abs((src.y + src.height / 2) - (tgt.y + tgt.height / 2)) > 4 || src.layer + 1 < tgt.layer) {
        // DRW-08: Shared trunkX stem for 90-degree branching
        const trunkX = src.x + src.width + 24 + (hasMultiBranch ? 0 : trackOffset);
        points.push({ x: trunkX, y: src.y + src.height / 2 }, { x: trunkX, y: tgt.y + tgt.height / 2 });
      }
    } else if (isBackward) {
      exitX = 1;
      exitY = 0.5;
      entryX = 1;
      entryY = 0.5;
      const bypassX = Math.max(src.x + src.width, tgt.x + tgt.width) + 28 + trackOffset;
      points.push({ x: bypassX, y: src.y + src.height / 2 }, { x: bypassX, y: tgt.y + tgt.height / 2 });
    } else if (hasMultiBranch || Math.abs((src.x + src.width / 2) - (tgt.x + tgt.width / 2)) > 4 || src.layer + 1 < tgt.layer) {
      const trunkY = src.y + src.height + 24 + (hasMultiBranch ? 0 : (pairIdx % 3) * 18);
      points.push({ x: src.x + src.width / 2, y: trunkY }, { x: tgt.x + tgt.width / 2, y: trunkY });
    }

    const edgeColor = isBackward ? '#333333' : '#000000';
    const dashed = isBackward ? 'dashed=1;' : '';
    const style = `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;${dashed}strokeColor=${edgeColor};fontColor=#000000;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;`;
    const pointsXml = points.length > 0
      ? `<Array as="points">${points.map((p) => `<mxPoint x="${Math.round(p.x)}" y="${Math.round(p.y)}"/>`).join('')}</Array>`
      : '';
    cells.push(
      `<mxCell id="${edgeId}" value="${escapeXml(e.label || '')}" style="${style}" edge="1" parent="1" source="${escapeXml(e.from)}" target="${escapeXml(e.to)}"><mxGeometry relative="1" as="geometry">${pointsXml}</mxGeometry></mxCell>`
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="app.diagrams.net">\n  <diagram id="page-1" name="${title}">\n    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageWidth}" pageHeight="${pageHeight}">\n      <root>\n        ${cells.join('\n        ')}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`;
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
    const cell = `<mxCell id="${escapeXml(op.id)}" value="${escapeXml(op.label || '')}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="${escapeXml(op.source)}" target="${escapeXml(op.target)}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
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

/**
 * DRW-06: Replaces a specific <diagram id="pageId">'s <mxGraphModel> in-place inside a multi-page workbook.
 */
export function replacePageInMasterXml(masterXml, pageId, singlePageXml) {
  const modelMatch = String(singlePageXml || '').match(/<mxGraphModel[\s\S]*?<\/mxGraphModel>/);
  if (!modelMatch) {
    throw new Error('REPLACE_PAGE_SOURCE_INVALID: No <mxGraphModel> found in singlePageXml.');
  }
  const escPageId = String(pageId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const diagramRe = new RegExp(`(<diagram\\b[^>]*\\bid="${escPageId}"[^>]*>)[\\s\\S]*?(<\\/diagram>)`);
  if (!diagramRe.test(String(masterXml || ''))) {
    throw new Error(`REPLACE_PAGE_TARGET_NOT_FOUND: Diagram id '${pageId}' not found in masterXml.`);
  }
  return String(masterXml).replace(diagramRe, `$1\n    ${modelMatch[0]}\n  $2`);
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

function isMidpointPort(xVal, yVal) {
  if (xVal === undefined && yVal === undefined) return true;
  const x = xVal === undefined ? 0.5 : Number(xVal);
  const y = yVal === undefined ? 0.5 : Number(yVal);
  const onEdgeMidX = x === 0.5 && (y === 0 || y === 1);
  const onEdgeMidY = y === 0.5 && (x === 0 || x === 1);
  return onEdgeMidX || onEdgeMidY;
}

/**
 * Deterministic L2 geometric & topological validator (score 0-100) enforcing DRW-01 through DRW-08.
 */
export function validateDrawioGeometry(xml) {
  const errors = [];
  const warnings = [];
  const cellIds = new Set();
  const absBoxes = new Map();
  const edges = [];
  const rawXml = String(xml || '');

  // DRW-02: Canvas size ceiling check
  const gmMatch = rawXml.match(/<mxGraphModel\b([^>]*)>/);
  const gmAttrs = gmMatch ? parseAttrs(gmMatch[1]) : {};
  const pageWidth = Number(gmAttrs.pageWidth || 0);
  const pageHeight = Number(gmAttrs.pageHeight || 0);
  if (pageWidth > CANVAS_MAX_WIDTH || pageHeight > CANVAS_MAX_HEIGHT) {
    errors.push({
      code: 'CANVAS_SIZE_EXCEEDED_BLOCKED',
      message: `Canvas size ${pageWidth}x${pageHeight} exceeds hard ceiling ${CANVAS_MAX_WIDTH}x${CANVAS_MAX_HEIGHT}.`,
    });
  }

  const cellRe = /<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g;
  const rawCells = [];
  let m;
  while ((m = cellRe.exec(rawXml)) !== null) {
    const attrs = parseAttrs(m[1]);
    rawCells.push({ attrs, inner: m[2] || '' });
    if (attrs.id) {
      if (cellIds.has(attrs.id)) {
        errors.push({ code: 'DUPLICATE_CELL_ID_BLOCKED', id: attrs.id, message: `Duplicate mxCell id '${attrs.id}'.` });
      }
      cellIds.add(attrs.id);
    }

    // DRW-01: Monochrome color whitelist check
    const style = String(attrs.style || '');
    const colorMatches = style.matchAll(/(?:fillColor|strokeColor|fontColor)=(#[0-9a-fA-F]{3,8})/g);
    for (const cm of colorMatches) {
      if (!MONOCHROME_COLOR_WHITELIST.has(cm[1].toLowerCase())) {
        errors.push({
          code: 'NON_MONOCHROME_STYLE_BLOCKED',
          id: attrs.id,
          message: `Cell '${attrs.id}' uses non-monochrome color '${cm[1]}'.`,
        });
      }
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
          isHorizontalSwimlane: (attrs.style || '').includes('horizontal=0'),
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
      const stylePairs = Object.fromEntries(
        String(attrs.style || '')
          .split(';')
          .filter((s) => s.includes('='))
          .map((s) => s.split('='))
      );
      if (
        !isMidpointPort(stylePairs.exitX, stylePairs.exitY) ||
        !isMidpointPort(stylePairs.entryX, stylePairs.entryY)
      ) {
        errors.push({
          code: 'NON_MIDPOINT_PORT_DETECTED',
          id: attrs.id,
          message: `Edge '${attrs.id}' must anchor on 0.5 edge midpoints.`,
        });
      }
      edges.push({ id: attrs.id, source: attrs.source, target: attrs.target, points: pts });
    }
  }

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

  const allBoxes = Array.from(resolved.values());
  const shapeList = allBoxes.filter((b) => !b.isSwimlane);
  for (let i = 0; i < shapeList.length; i++) {
    for (let j = i + 1; j < shapeList.length; j++) {
      const a = shapeList[i];
      const b = shapeList[j];
      if (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) {
        errors.push({ code: 'VERTEX_OVERLAP_DETECTED', message: `Shapes '${a.id}' and '${b.id}' overlap.` });
      }
    }
  }

  // DRW-07: Check LR vertical centering around pageHeight / 2 when horizontal swimlanes are present
  const hasHorizontalSwimlane = allBoxes.some((b) => b.isHorizontalSwimlane);
  if (hasHorizontalSwimlane && pageHeight > 0 && allBoxes.length > 0) {
    const minY = Math.min(...allBoxes.map((b) => b.y));
    const maxY = Math.max(...allBoxes.map((b) => b.y + b.height));
    const contentCy = (minY + maxY) / 2;
    if (Math.abs(contentCy - pageHeight / 2) > 20) {
      errors.push({
        code: 'NON_VERTICALLY_CENTERED_LR',
        message: `LR diagram vertical center (${contentCy}) deviates >20px from pageHeight/2 (${pageHeight / 2}).`,
      });
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
  ['replace-page', (masterRaw, arg2, arg3) => {
    if (!arg2 || !arg3 || !existsSync(arg3)) {
      console.error('Usage: node scripts/drawio-toolkit.mjs replace-page <master.drawio> <pageId> <singlePage.drawio>');
      return 1;
    }
    const singleXml = readFileSync(arg3, 'utf8');
    const updated = replacePageInMasterXml(masterRaw, arg2, singleXml);
    writeFileSync(process.argv[3], updated, 'utf8');
    return 0;
  }],
]);

function runCli() {
  const [cmd, inputPath, arg2, arg3] = process.argv.slice(2);
  const handler = CLI_HANDLERS.get(cmd);
  if (!handler || !inputPath || !existsSync(inputPath)) {
    console.error('Usage: node scripts/drawio-toolkit.mjs <build|validate|replace-page> <input.(json|drawio)> [output.drawio|pageId] [singlePage.drawio]');
    process.exit(1);
  }
  const raw = readFileSync(inputPath, 'utf8');
  process.exit(handler(raw, arg2, arg3));
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runCli();
