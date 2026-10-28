import {readdirSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

import {parseTaskMetadata} from './pstack-handoff.mjs';

function requiredText(value, name) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${name} must be non-empty`);
  return value.trim();
}

function markdownFiles(directory) {
  let files = [];
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files = files.concat(markdownFiles(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) files.push(fullPath);
  }
  return files;
}

function requirementBlocks(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const blocks = [];
  let current = null;
  for (const line of lines) {
    if (/^### Requirement: /.test(line)) {
      if (current) blocks.push(current);
      current = {heading: line.replace(/^### Requirement: /, '').trim(), lines: [line]};
      continue;
    }
    if (current && /^## /.test(line)) {
      blocks.push(current);
      current = null;
    }
    if (current) current.lines.push(line);
  }
  if (current) blocks.push(current);
  return blocks;
}

function field(block, name) {
  const prefix = `**${name}:**`;
  const line = block.lines.find((item) => item.startsWith(prefix));
  return line ? line.slice(prefix.length).trim() : '';
}

function backtickValues(value) {
  return [...value.matchAll(/`([^`]+)`/g)].map((match) => match[1].trim()).filter(Boolean);
}

export function parseProtectedInvariants(markdown, sourcePath) {
  const records = [];
  for (const block of requirementBlocks(markdown)) {
    const id = backtickValues(field(block, 'Invariant ID'))[0];
    if (!id) continue;
    if (!/^INV-[A-Z0-9-]+$/.test(id)) throw new Error(`Invalid invariant ID ${id} in ${sourcePath}`);
    const origin = field(block, 'Origin');
    const behavior = field(block, 'Expected behavior');
    const anchors = backtickValues(field(block, 'Code anchors')).map((anchor) => {
      const separator = anchor.indexOf('#');
      if (separator < 1 || separator === anchor.length - 1) throw new Error(`Invalid code anchor ${anchor} in ${sourcePath}`);
      return {path: anchor.slice(0, separator).replaceAll('\\', '/'), symbol: anchor.slice(separator + 1)};
    });
    const checks = backtickValues(field(block, 'Regression checks'));
    if (!origin || !behavior || anchors.length === 0 || checks.length === 0) {
      throw new Error(`Invariant ${id} lacks Origin, Expected behavior, Code anchors, or Regression checks in ${sourcePath}`);
    }
    records.push({id, requirement: block.heading, origin, behavior, anchors, checks, sourcePath});
  }
  return records;
}

function normalizedPath(filePath) {
  const normalized = requiredText(filePath, 'changed path').replaceAll('\\', '/').replace(/^\.\//, '');
  if (normalized.startsWith('/') || /^[A-Za-z]:/.test(normalized) || normalized.split('/').some((part) => part === '..')) {
    throw new Error(`Unsafe changed path: ${filePath}`);
  }
  return normalized;
}

function pathTouchesAnchor(changedPath, anchorPath) {
  const changed = normalizedPath(changedPath);
  const anchor = normalizedPath(anchorPath);
  return changed === anchor || changed.startsWith(`${anchor.replace(/\/$/, '')}/`);
}

export function auditProtectedChanges({invariants, metadata, changedPaths, activeSpecText = ''}) {
  if (!Array.isArray(changedPaths)) throw new Error('changedPaths must be an array');
  const ids = new Set();
  for (const invariant of invariants) {
    if (ids.has(invariant.id)) throw new Error(`Duplicate invariant ID: ${invariant.id}`);
    ids.add(invariant.id);
  }
  const actions = new Map((metadata.invariantActions ?? []).map((action) => [action.id, action]));
  const affected = invariants.filter((invariant) => invariant.anchors.some((anchor) => changedPaths.some((changed) => pathTouchesAnchor(changed, anchor.path))));
  const report = [];
  for (const invariant of affected) {
    const action = actions.get(invariant.id);
    if (!action) throw new Error(`Affected invariant ${invariant.id} has no preserve or supersede action in OpenSpec task metadata`);
    if (!['preserve','supersede'].includes(action.action)) throw new Error(`Invalid action for ${invariant.id}: ${action.action}`);
    const checks = action.checks ?? [];
    if (!Array.isArray(checks) || checks.length === 0) throw new Error(`Affected invariant ${invariant.id} has no recorded verification command`);
    if (action.action === 'preserve') {
      const missingChecks = invariant.checks.filter((check) => !checks.includes(check));
      if (missingChecks.length) throw new Error(`Invariant ${invariant.id} preservation omits required checks: ${missingChecks.join(', ')}`);
    } else {
      const declaration = new RegExp(`^\\*\\*Supersedes:\\*\\*\\s*\\x60?${invariant.id}\\x60?\\s*$`, 'im');
      const replacement = requirementBlocks(activeSpecText).find((block) => declaration.test(block.lines.join('\n')));
      if (!replacement) throw new Error(`Superseding invariant ${invariant.id} has no explicit OpenSpec replacement requirement`);
      if (!field(replacement, 'Expected behavior')) throw new Error(`Replacement requirement for ${invariant.id} has no expected behavior`);
      const replacementChecks = backtickValues(field(replacement, 'Regression checks'));
      const missingChecks = checks.filter((check) => !replacementChecks.includes(check));
      if (missingChecks.length) throw new Error(`Replacement requirement for ${invariant.id} does not record replacement checks: ${missingChecks.join(', ')}`);
    }
    report.push({id: invariant.id, action: action.action, anchors: invariant.anchors, checks});
  }
  return {affected: report};
}

function collectFiles(root, changeId) {
  const paths = [];
  const mainSpecs = path.join(root, 'openspec', 'specs');
  if (readdirSync(mainSpecs).length) paths.push(...markdownFiles(mainSpecs));
  if (changeId) {
    const deltaSpecs = path.join(root, 'openspec', 'changes', changeId, 'specs');
    try { paths.push(...markdownFiles(deltaSpecs)); } catch {}
  }
  return paths;
}

export function mergeProtectedInvariants(mainRecords, deltaRecords) {
  const records = new Map();
  for (const record of mainRecords) {
    if (records.has(record.id)) throw new Error(`Duplicate invariant ID in main specs: ${record.id}`);
    records.set(record.id, record);
  }
  const deltaIds = new Set();
  for (const record of deltaRecords) {
    if (deltaIds.has(record.id)) throw new Error(`Duplicate invariant ID in active delta specs: ${record.id}`);
    deltaIds.add(record.id);
    records.set(record.id, record);
  }
  return [...records.values()];
}

function argValue(args, name) {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
}

function argValues(args, name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) values.push(args[index + 1]);
  }
  return values;
}

function run(args) {
  const root = path.resolve(argValue(args, '--root') ?? process.cwd());
  const changeId = requiredText(argValue(args, '--change'), 'change');
  const taskId = requiredText(argValue(args, '--task'), 'task');
  const changedPaths = argValues(args, '--changed-path');
  const mainFiles = readdirSync(path.join(root, 'openspec', 'specs')).length ? markdownFiles(path.join(root, 'openspec', 'specs')) : [];
  const deltaFiles = markdownFiles(path.join(root, 'openspec', 'changes', changeId, 'specs'));
  const readRecords = (files) => files.flatMap((filePath) => parseProtectedInvariants(readFileSync(filePath, 'utf8'), path.relative(root, filePath).replaceAll('\\', '/')));
  const invariants = mergeProtectedInvariants(readRecords(mainFiles), readRecords(deltaFiles));
  const activeChangeRoot = path.join(root, 'openspec', 'changes', changeId);
  const tasksPath = path.join(activeChangeRoot, 'tasks.md');
  const metadata = parseTaskMetadata(readFileSync(tasksPath, 'utf8'), taskId);
  const activeSpecText = deltaFiles
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .join('\n');
  const report = auditProtectedChanges({invariants, metadata, changedPaths, activeSpecText});
  process.stdout.write(report.affected.length
    ? `${JSON.stringify(report, null, 2)}\n`
    : 'No protected invariant anchors intersect the supplied changed paths.\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    run(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
