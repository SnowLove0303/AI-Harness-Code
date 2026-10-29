import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HANDOFF_MARKER = '<!-- pstack-handoff:';
const REQUIRED_METADATA = [
  'taskId',
  'playbook',
  'playbookSteps',
  'supportingSkillPaths',
  'writePaths',
  'readOnlyPaths',
  'instructionPaths',
  'invariantActions',
  'priorVerified',
  'nonGoals',
  'acceptance',
];

function requiredText(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value;
}

function stringArray(value, name, {allowEmpty = true} = {}) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) {
    throw new Error(`${name} must be ${allowEmpty ? 'an' : 'a non-empty'} array`);
  }
  for (const item of value) requiredText(item, `${name} item`);
  return value;
}

function normalizeProjectPath(value) {
  requiredText(value, 'path');
  const normalized = value.replaceAll('\\', '/').replace(/^\.\//, '');
  if (normalized.startsWith('/') || /^[A-Za-z]:/.test(normalized)) {
    throw new Error(`Unsafe absolute path: ${value}`);
  }
  const parts = normalized.split('/').filter(Boolean);
  if (parts.some((part) => part === '.' || part === '..')) {
    throw new Error(`Unsafe relative path: ${value}`);
  }
  return parts.join('/');
}

function matchesPathScope(candidate, scope) {
  const normalized = normalizeProjectPath(scope);
  const prefix = normalized.endsWith('/**') ? normalized.slice(0, -3).replace(/\/$/, '') : normalized.replace(/\/$/, '');
  return candidate === prefix || candidate.startsWith(`${prefix}/`);
}

function validateMetadata(metadata, expectedTaskId) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    throw new Error('handoff metadata must be an object');
  }
  for (const key of REQUIRED_METADATA) {
    if (!(key in metadata)) throw new Error(`handoff metadata is missing ${key}`);
  }
  requiredText(metadata.taskId, 'taskId');
  if (expectedTaskId && metadata.taskId !== expectedTaskId) {
    throw new Error(`handoff metadata task ID ${metadata.taskId} does not match ${expectedTaskId}`);
  }
  requiredText(metadata.playbook, 'playbook');
  stringArray(metadata.playbookSteps, 'playbookSteps', {allowEmpty: false});
  stringArray(metadata.supportingSkillPaths, 'supportingSkillPaths');
  stringArray(metadata.writePaths, 'writePaths');
  stringArray(metadata.readOnlyPaths, 'readOnlyPaths');
  stringArray(metadata.instructionPaths, 'instructionPaths', {allowEmpty: false});
  if (!Array.isArray(metadata.invariantActions)) throw new Error('invariantActions must be an array');
  const invariantIds = new Set();
  for (const invariant of metadata.invariantActions) {
    requiredText(invariant.id, 'invariantActions.id');
    if (!/^INV-[A-Z0-9-]+$/.test(invariant.id)) throw new Error(`Invalid protected invariant ID: ${invariant.id}`);
    if (invariantIds.has(invariant.id)) throw new Error(`Duplicate protected invariant action: ${invariant.id}`);
    invariantIds.add(invariant.id);
    if (!['preserve','supersede'].includes(invariant.action)) throw new Error(`Invalid invariant action for ${invariant.id}`);
    stringArray(invariant.checks, `invariantActions[${invariant.id}].checks`, {allowEmpty: false});
  }
  stringArray(metadata.priorVerified, 'priorVerified');
  stringArray(metadata.nonGoals, 'nonGoals');
  stringArray(metadata.acceptance, 'acceptance', {allowEmpty: false});
  for (const value of [...metadata.writePaths, ...metadata.readOnlyPaths, ...metadata.instructionPaths, ...metadata.supportingSkillPaths]) normalizeProjectPath(value);
  const readOnlySet = metadata.readOnlyPaths.map(normalizeProjectPath);
  for (const instructionPath of metadata.instructionPaths.map(normalizeProjectPath)) {
    if (!readOnlySet.some((readOnlyPath) => matchesPathScope(instructionPath, readOnlyPath))) {
      throw new Error(`Instruction file must also be read-only: ${instructionPath}`);
    }
  }
  const overlap = metadata.writePaths.filter((writePath) => metadata.readOnlyPaths.includes(writePath));
  if (overlap.length) throw new Error(`Paths cannot be both writable and read-only: ${overlap.join(', ')}`);
  return metadata;
}

function sections(markdown) {
  const result = new Map();
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  let heading = null;
  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      heading = match[1].toLowerCase();
      result.set(heading, []);
    } else if (heading) {
      result.get(heading).push(line);
    }
  }
  return result;
}

export function extractUserIntent(proposal) {
  const content = sections(proposal);
  const originalLines = content.get('original user request');
  const directiveLines = content.get('append directives');
  if (!originalLines || !directiveLines) {
    throw new Error('proposal.md must contain Original user request and Append directives sections');
  }
  const quotedLines = originalLines
    .filter((line) => line.startsWith('>'))
    .map((line) => line.replace(/^> ?/, ''));
  while (quotedLines.length && quotedLines[0] === '') quotedLines.shift();
  while (quotedLines.length && quotedLines.at(-1) === '') quotedLines.pop();
  const originalRequest = quotedLines.join('\n');
  const appendDirectives = directiveLines
    .filter((line) => /^-\s+/.test(line))
    .map((line) => line.replace(/^-\s+/, ''));
  if (!originalRequest) throw new Error('Original user request section is empty');
  return {originalRequest, appendDirectives};
}

export function parseTaskMetadata(tasks, taskId) {
  requiredText(taskId, 'taskId');
  const normalized = tasks.replaceAll('\r\n', '\n');
  const taskPattern = new RegExp(`^- \\[([ xX])\\] ${escapeRegExp(taskId)}\\s+`, 'm');
  if (!taskPattern.test(normalized)) throw new Error(`OpenSpec task ${taskId} was not found`);

  const comments = [...normalized.matchAll(/<!--\s*pstack-handoff:\s*(\{[^]*?\})\s*-->/g)];
  for (const comment of comments) {
    let metadata;
    try {
      metadata = JSON.parse(comment[1]);
    } catch (error) {
      throw new Error(`Invalid handoff metadata JSON: ${error.message}`);
    }
    if (metadata.taskId === taskId) return validateMetadata(metadata, taskId);
  }
  throw new Error(`OpenSpec task ${taskId} has no pstack-handoff metadata block`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

function digest(value) {
  return createHash('sha256').update(JSON.stringify(canonicalize(value)), 'utf8').digest('hex');
}

export function createHandoffCapsule({changeId, taskId, originalRequest, appendDirectives, branch, baseCommit, workingTreeStatus = '', workingTreeDigest = '', routeInfo, instructionFiles, metadata}) {
  requiredText(changeId, 'changeId');
  requiredText(taskId, 'taskId');
  requiredText(originalRequest, 'originalRequest');
  requiredText(branch, 'branch');
  requiredText(baseCommit, 'baseCommit');
  if (!routeInfo || typeof routeInfo !== 'object') throw new Error('routeInfo is required');
  requiredText(routeInfo.pstackRoot, 'routeInfo.pstackRoot');
  requiredText(routeInfo.source, 'routeInfo.source');
  requiredText(routeInfo.codex, 'routeInfo.codex');
  requiredText(routeInfo.verify, 'routeInfo.verify');
  requiredText(routeInfo.supportingSkills, 'routeInfo.supportingSkills');
  if (routeInfo.taskSource !== 'OpenSpec tasks.md') throw new Error('routeInfo.taskSource must be OpenSpec tasks.md');
  if (!Array.isArray(instructionFiles) || instructionFiles.length === 0) throw new Error('instructionFiles must be a non-empty array');
  for (const file of instructionFiles) {
    requiredText(file.path, 'instructionFiles.path');
    if (!/^[a-f0-9]{64}$/i.test(file.sha256)) throw new Error(`Invalid instruction hash for ${file.path}`);
  }
  const instructionPathSet = new Set(instructionFiles.map((file) => normalizeProjectPath(file.path)));
  const requiredInstructionPaths = [
    ...metadata.instructionPaths,
    routeInfo.source,
    ...metadata.supportingSkillPaths.map((skillPath) => path.posix.join(routeInfo.pstackRoot, skillPath.replaceAll('\\', '/'))),
  ].map(normalizeProjectPath);
  for (const sourcePath of requiredInstructionPaths) {
    if (!instructionPathSet.has(sourcePath)) throw new Error(`Capsule omits a required instruction file: ${sourcePath}`);
  }
  const readOnlySet = new Set(metadata.readOnlyPaths.map(normalizeProjectPath));
  for (const sourcePath of requiredInstructionPaths) {
    if (![...readOnlySet].some((readOnlyPath) => matchesPathScope(sourcePath, readOnlyPath))) {
      throw new Error(`Instruction file is outside the read-only scope: ${sourcePath}`);
    }
  }
  if (typeof workingTreeStatus !== 'string' || typeof workingTreeDigest !== 'string') {
    throw new Error('workingTreeStatus and workingTreeDigest must be strings');
  }
  stringArray(appendDirectives, 'appendDirectives');
  validateMetadata(metadata, taskId);
  const capsule = {
    schemaVersion: 1,
    source: {openSpecChange: changeId, taskId},
    intent: {originalRequest, appendDirectives},
    execution: {
      playbook: metadata.playbook,
      pstackRoot: routeInfo.pstackRoot,
      playbookSource: routeInfo.source,
      playbookSteps: metadata.playbookSteps,
      supportingSkillPaths: metadata.supportingSkillPaths,
      taskSource: routeInfo.taskSource,
      supportingSkills: routeInfo.supportingSkills,
      codexCapability: routeInfo.codex,
      ...(routeInfo.geminiCapability ? {geminiCapability: routeInfo.geminiCapability} : {}),
      ...(routeInfo.geminiModelTier ? {geminiModelTier: routeInfo.geminiModelTier} : {}),
      verificationRequirement: routeInfo.verify,
      instructionFiles,
      branch,
      baseCommit,
      workingTreeStatus,
      workingTreeDigest,
      writePaths: metadata.writePaths.map(normalizeProjectPath),
      readOnlyPaths: metadata.readOnlyPaths.map(normalizeProjectPath),
      protectedInvariantIds: metadata.invariantActions.map((invariant) => invariant.id),
      invariantActions: metadata.invariantActions,
      priorVerified: metadata.priorVerified,
      nonGoals: metadata.nonGoals,
      acceptance: metadata.acceptance,
    },
  };
  capsule.capsuleDigest = digest(capsule);
  return capsule;
}

export function assertCapsuleValid(capsule) {
  if (!capsule || typeof capsule !== 'object' || capsule.schemaVersion !== 1) {
    throw new Error('Unsupported or invalid capsule schema');
  }
  const suppliedDigest = requiredText(capsule.capsuleDigest, 'capsuleDigest');
  const unsigned = {...capsule};
  delete unsigned.capsuleDigest;
  if (digest(unsigned) !== suppliedDigest) throw new Error('Capsule digest does not match its contents');
  requiredText(capsule.source?.openSpecChange, 'source.openSpecChange');
  requiredText(capsule.source?.taskId, 'source.taskId');
  requiredText(capsule.intent?.originalRequest, 'intent.originalRequest');
  stringArray(capsule.intent?.appendDirectives, 'intent.appendDirectives');
  validateMetadata({
    taskId: capsule.source.taskId,
    playbook: capsule.execution?.playbook,
    playbookSteps: capsule.execution?.playbookSteps,
    supportingSkillPaths: capsule.execution?.supportingSkillPaths,
    writePaths: capsule.execution?.writePaths,
    readOnlyPaths: capsule.execution?.readOnlyPaths,
    instructionPaths: capsule.execution?.instructionFiles?.map((file) => file.path),
    invariantActions: capsule.execution?.invariantActions,
    priorVerified: capsule.execution?.priorVerified,
    nonGoals: capsule.execution?.nonGoals,
    acceptance: capsule.execution?.acceptance,
  }, capsule.source.taskId);
  for (const field of ['pstackRoot','playbookSource','taskSource','supportingSkills','codexCapability','verificationRequirement']) {
    requiredText(capsule.execution?.[field], `execution.${field}`);
  }
  if (capsule.execution.taskSource !== 'OpenSpec tasks.md') throw new Error('Capsule task source is not OpenSpec tasks.md');
  if (!Array.isArray(capsule.execution.instructionFiles) || capsule.execution.instructionFiles.length === 0) {
    throw new Error('Capsule instruction file hashes are missing');
  }
  const instructionPathSet = new Set(capsule.execution.instructionFiles.map((file) => normalizeProjectPath(file.path)));
  const requiredInstructionPaths = [
    capsule.execution.playbookSource,
    ...capsule.execution.instructionFiles.map((file) => file.path),
    ...capsule.execution.supportingSkillPaths.map((skillPath) => path.posix.join(capsule.execution.pstackRoot, skillPath.replaceAll('\\', '/'))),
  ].map(normalizeProjectPath);
  for (const sourcePath of requiredInstructionPaths) {
    if (!instructionPathSet.has(sourcePath)) throw new Error(`Capsule omits a required instruction file: ${sourcePath}`);
  }
  for (const file of capsule.execution.instructionFiles) {
    requiredText(file.path, 'execution.instructionFiles.path');
    if (!/^[a-f0-9]{64}$/i.test(file.sha256)) throw new Error(`Invalid instruction hash for ${file.path}`);
  }
  requiredText(capsule.execution?.branch, 'execution.branch');
  requiredText(capsule.execution?.baseCommit, 'execution.baseCommit');
  if (typeof capsule.execution?.workingTreeStatus !== 'string' || typeof capsule.execution?.workingTreeDigest !== 'string') {
    throw new Error('Capsule working-tree state is missing');
  }
  return true;
}

export function verifyHandoffAcknowledgement(capsule, acknowledgement) {
  assertCapsuleValid(capsule);
  if (acknowledgement?.taskId !== capsule.source.taskId) throw new Error('Acknowledgement task ID mismatch');
  if (acknowledgement?.capsuleDigest !== capsule.capsuleDigest) throw new Error('Acknowledgement digest mismatch');
  return true;
}

export function assertChangedPathsAllowed(changedPaths, writePaths, readOnlyPaths = []) {
  stringArray(changedPaths, 'changedPaths');
  stringArray(writePaths, 'writePaths');
  if (changedPaths.length === 0) return true;
  if (writePaths.length === 0) throw new Error('No writable paths were declared for changed files');
  const allowed = writePaths.map(normalizeProjectPath);
  const readOnly = stringArray(readOnlyPaths, 'readOnlyPaths').map(normalizeProjectPath);
  for (const changedPath of changedPaths.map(normalizeProjectPath)) {
    if (readOnly.some((readOnlyPath) => matchesPathScope(changedPath, readOnlyPath))) {
      throw new Error(`Changed path is in a read-only scope: ${changedPath}`);
    }
    const permitted = allowed.some((writePath) => matchesPathScope(changedPath, writePath));
    if (!permitted) throw new Error(`Changed path is outside the writable scope: ${changedPath}`);
  }
  return true;
}

export function getInstructionSnapshots(root, instructionPaths) {
  const rootPath = realpathSync(root);
  return instructionPaths.map((filePath) => {
    const relativePath = normalizeProjectPath(filePath);
    const absolutePath = realpathSync(path.join(rootPath, relativePath));
    if (!absolutePath.startsWith(`${rootPath}${path.sep}`)) throw new Error(`Instruction file escapes project root: ${relativePath}`);
    return {
      path: relativePath,
      sha256: createHash('sha256').update(readFileSync(absolutePath)).digest('hex'),
    };
  });
}

export function verifyInstructionSnapshots(root, instructionFiles) {
  const current = getInstructionSnapshots(root, instructionFiles.map((file) => file.path));
  const expected = new Map(instructionFiles.map((file) => [file.path, file.sha256]));
  for (const file of current) {
    if (expected.get(file.path) !== file.sha256) throw new Error(`Instruction file changed after capsule creation: ${file.path}`);
  }
  return true;
}

function gitValue(root, ...args) {
  return execFileSync('git', args, {cwd: root, encoding: 'utf8'}).trim();
}

function currentWorkingTreeState(root) {
  const status = gitValue(root, 'status', '--porcelain=v1', '--untracked-files=all');
  const trackedDiff = execFileSync('git', ['diff', '--binary', 'HEAD', '--'], {cwd: root, encoding: null});
  const untrackedOutput = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], {cwd: root, encoding: null});
  const untrackedPaths = untrackedOutput.toString('utf8').split('\0').filter(Boolean).sort();
  const untracked = untrackedPaths.map((relativePath) => ({
    path: relativePath.replaceAll('\\', '/'),
    sha256: createHash('sha256').update(readFileSync(path.join(root, relativePath))).digest('hex'),
  }));
  const trackedDiffDigest = createHash('sha256').update(trackedDiff).digest('hex');
  return {
    status,
    digest: digest({status, trackedDiffDigest, untracked}),
  };
}

export function generateHandoffFromOpenSpec(root, changeId, taskId) {
  requiredText(root, 'root');
  const rootPath = realpathSync(root);
  const layouts = [
    {pstackRoot: path.join(rootPath, 'bundle', 'pstack-upstream'), routeMap: path.join(rootPath, 'docs', 'pstack-openspec-route-map.json')},
    {pstackRoot: path.join(rootPath, '.orbitstack', 'pstack-upstream'), routeMap: path.join(rootPath, '.orbitstack', 'pstack-openspec-route-map.json')},
  ];
  const layout = layouts.find((candidate) => existsSync(path.join(candidate.pstackRoot, 'skills', 'poteto-mode', 'SKILL.md')) && existsSync(candidate.routeMap));
  if (!layout) throw new Error('Cannot find the pinned PStack source and route registry in this project root');
  const changeDir = path.join(root, 'openspec', 'changes', changeId);
  const proposal = readFileSync(path.join(changeDir, 'proposal.md'), 'utf8');
  const taskContent = readFileSync(path.join(changeDir, 'tasks.md'), 'utf8');
  const intent = extractUserIntent(proposal);
  const metadata = parseTaskMetadata(taskContent, taskId);
  const routeMap = JSON.parse(readFileSync(layout.routeMap, 'utf8'));
  const routeInfo = routeMap.routes.find((route) => route.id === metadata.playbook)
    ?? routeMap.fallbackSkills?.find((skill) => skill.id === metadata.playbook);
  if (!routeInfo) {
    throw new Error(`PStack playbook ${metadata.playbook} is not present in the OpenSpec route registry`);
  }
  if (!routeInfo.taskSource || !routeInfo.supportingSkills || !routeInfo.codex || !routeInfo.verify) {
    throw new Error(`Route metadata for ${metadata.playbook} is incomplete`);
  }
  const branch = gitValue(root, 'branch', '--show-current');
  const baseCommit = gitValue(root, 'rev-parse', 'HEAD');
  const workingTree = currentWorkingTreeState(root);
  const pstackRelativeRoot = path.relative(rootPath, layout.pstackRoot).replaceAll('\\', '/');
  const playbookSource = path.posix.join(pstackRelativeRoot, routeInfo.source.replaceAll('\\', '/'));
  const resolvedRouteInfo = {...routeInfo, pstackRoot: pstackRelativeRoot, source: playbookSource};
  const userInstructionPaths = ['AGENTS.md','Agent.md'].filter((candidate) => existsSync(path.join(rootPath, candidate)));
  const adapterCandidates = [
    'orbitstack-codex/SKILL.md',
    '.agents/skills/orbitstack-pstack-openspec/SKILL.md',
    '.claude/skills/orbitstack-pstack-openspec/SKILL.md',
    '.gemini/skills/orbitstack-pstack-openspec/SKILL.md',
    '.cursor/skills/orbitstack-pstack-openspec/SKILL.md',
  ];
  const adapterPath = adapterCandidates.find((candidate) => existsSync(path.join(rootPath, candidate)));
  if (!adapterPath) throw new Error('No installed PStack/OpenSpec Codex adapter was found in this project');
  const changeRelativeRoot = path.relative(rootPath, changeDir).replaceAll('\\', '/');
  const changeInstructionPaths = ['proposal.md','specs/orbitstack-pstack-routing/spec.md','design.md','tasks.md']
    .map((file) => path.posix.join(changeRelativeRoot, file))
    .filter((candidate) => existsSync(path.join(rootPath, candidate)));
  const instructionPaths = [...new Set([
    ...userInstructionPaths,
    adapterPath,
    layout.routeMap.replace(`${rootPath}${path.sep}`, '').replaceAll('\\', '/'),
    path.posix.join(pstackRelativeRoot, 'skills/poteto-mode/SKILL.md'),
    resolvedRouteInfo.source,
    ...metadata.supportingSkillPaths.map((skillPath) => path.posix.join(pstackRelativeRoot, skillPath.replaceAll('\\', '/'))),
    ...changeInstructionPaths,
    ...metadata.instructionPaths,
  ])];
  const instructionFiles = getInstructionSnapshots(root, instructionPaths);
  const capsuleMetadata = {
    ...metadata,
    instructionPaths,
    readOnlyPaths: [...new Set([...metadata.readOnlyPaths, ...instructionPaths])],
  };
  return createHandoffCapsule({changeId, taskId, ...intent, branch: branch || 'detached', baseCommit, workingTreeStatus: workingTree.status, workingTreeDigest: workingTree.digest, routeInfo:resolvedRouteInfo, instructionFiles, metadata:capsuleMetadata});
}

function argumentValue(args, name) {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
}

function argumentValues(args, name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) values.push(args[index + 1]);
  }
  return values;
}

function runCli(args) {
  const [command] = args;
  if (command === 'generate') {
    const root = path.resolve(argumentValue(args, '--root') ?? process.cwd());
    const changeId = argumentValue(args, '--change');
    const taskId = argumentValue(args, '--task');
    if (!changeId || !taskId) throw new Error('Usage: pstack-handoff.mjs generate --change <id> --task <id> [--root <path>]');
    process.stdout.write(`${JSON.stringify(generateHandoffFromOpenSpec(root, changeId, taskId), null, 2)}\n`);
    return;
  }
  if (command === 'validate') {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => {
      const capsule = JSON.parse(chunks.join(''));
      assertCapsuleValid(capsule);
      const rootArg = argumentValue(args, '--root');
      if (rootArg) verifyInstructionSnapshots(path.resolve(rootArg), capsule.execution.instructionFiles);
      process.stdout.write(`VALID ${capsule.source.openSpecChange}#${capsule.source.taskId} ${capsule.capsuleDigest}\n`);
    });
    return;
  }
  if (command === 'verify-return') {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => {
      const capsule = JSON.parse(chunks.join(''));
      assertCapsuleValid(capsule);
      verifyHandoffAcknowledgement(capsule, {
        taskId: argumentValue(args, '--ack-task'),
        capsuleDigest: argumentValue(args, '--ack-digest'),
      });
      const changedPaths = argumentValues(args, '--changed-path');
      assertChangedPathsAllowed(changedPaths, capsule.execution.writePaths, capsule.execution.readOnlyPaths);
      const rootArg = argumentValue(args, '--root');
      if (rootArg) verifyInstructionSnapshots(path.resolve(rootArg), capsule.execution.instructionFiles);
      process.stdout.write(`VERIFIED ${capsule.source.openSpecChange}#${capsule.source.taskId} ${changedPaths.length} changed paths\n`);
    });
    return;
  }
  throw new Error('Usage: pstack-handoff.mjs <generate|validate|verify-return> ...');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
