import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  MAX_GEMINI_MD_BYTES,
  checkGeminiMdSize,
  checkSingleEntryHub,
  checkToolboxIndex,
} from '../scripts/check-single-entry-hub.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const tempDirs = [];

function createTempRepo() {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'single-entry-hub-test-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    rmSync(dir, { recursive: true, force: true });
  }
});

test('checkGeminiMdSize passes at and below 16KB and blocks above 16KB', () => {
  const tmp = createTempRepo();
  const geminiPath = path.join(tmp, 'GEMINI.md');

  writeFileSync(geminiPath, 'a'.repeat(MAX_GEMINI_MD_BYTES), 'utf8');
  const exactRes = checkGeminiMdSize(geminiPath);
  assert.equal(exactRes.valid, true);
  assert.equal(exactRes.size, MAX_GEMINI_MD_BYTES);

  writeFileSync(geminiPath, 'a'.repeat(MAX_GEMINI_MD_BYTES + 1), 'utf8');
  const overRes = checkGeminiMdSize(geminiPath);
  assert.equal(overRes.valid, false);
  assert.equal(overRes.violations.length, 1);
  assert.equal(overRes.violations[0].code, 'GEMINI_MD_SIZE_EXCEEDED');
});

test('checkGeminiMdSize reports GEMINI_MD_MISSING when file does not exist', () => {
  const tmp = createTempRepo();
  const res = checkGeminiMdSize(path.join(tmp, 'GEMINI.md'));
  assert.equal(res.valid, false);
  assert.equal(res.violations[0].code, 'GEMINI_MD_MISSING');
});

test('checkToolboxIndex passes when all skill and l2Guard paths exist', () => {
  const tmp = createTempRepo();
  mkdirSync(path.join(tmp, 'docs'), { recursive: true });
  mkdirSync(path.join(tmp, 'skills', 'demo-skill', 'references'), { recursive: true });
  mkdirSync(path.join(tmp, 'scripts'), { recursive: true });

  writeFileSync(path.join(tmp, 'skills', 'demo-skill', 'SKILL.md'), '# Demo', 'utf8');
  writeFileSync(path.join(tmp, 'skills', 'demo-skill', 'references', 'ref.md'), '# Ref', 'utf8');
  writeFileSync(path.join(tmp, 'scripts', 'check-demo.mjs'), '// ok', 'utf8');

  const indexPath = path.join(tmp, 'docs', 'toolbox-index.json');
  writeFileSync(
    indexPath,
    JSON.stringify({
      version: '1.0.0',
      skills: [
        {
          id: 'demo-skill',
          path: '~/.gemini/ps-hub/skills/demo-skill/SKILL.md',
          references: '~/.gemini/ps-hub/skills/demo-skill/references/ref.md',
          script: '~/.gemini/ps-hub/scripts/check-demo.mjs',
        },
      ],
      l2Guards: {
        demo: '~/.gemini/ps-hub/scripts/check-demo.mjs',
      },
    }),
    'utf8',
  );

  const res = checkToolboxIndex(indexPath, tmp);
  assert.equal(res.valid, true);
  assert.equal(res.checkedCount, 4);
  assert.equal(res.violations.length, 0);
});

test('checkToolboxIndex detects missing skill and l2Guard paths', () => {
  const tmp = createTempRepo();
  mkdirSync(path.join(tmp, 'docs'), { recursive: true });
  const indexPath = path.join(tmp, 'docs', 'toolbox-index.json');

  writeFileSync(
    indexPath,
    JSON.stringify({
      version: '1.0.0',
      skills: [
        {
          id: 'broken-skill',
          path: '~/.gemini/ps-hub/skills/missing/SKILL.md',
        },
      ],
      l2Guards: {
        missingGuard: '~/.gemini/ps-hub/scripts/missing-guard.mjs',
      },
    }),
    'utf8',
  );

  const res = checkToolboxIndex(indexPath, tmp);
  assert.equal(res.valid, false);
  assert.equal(res.violations.length, 2);
  assert.ok(res.violations.every((v) => v.code === 'TOOLBOX_PATH_NOT_FOUND'));
});

test('checkToolboxIndex detects invalid JSON', () => {
  const tmp = createTempRepo();
  mkdirSync(path.join(tmp, 'docs'), { recursive: true });
  const indexPath = path.join(tmp, 'docs', 'toolbox-index.json');
  writeFileSync(indexPath, '{ invalid json', 'utf8');

  const res = checkToolboxIndex(indexPath, tmp);
  assert.equal(res.valid, false);
  assert.equal(res.violations[0].code, 'TOOLBOX_INDEX_INVALID_JSON');
});

test('checkSingleEntryHub passes on actual repository GEMINI.md and docs/toolbox-index.json', () => {
  const res = checkSingleEntryHub({ repoRoot });
  assert.equal(res.valid, true, JSON.stringify(res.violations, null, 2));
  assert.ok(res.gemini.size > 0 && res.gemini.size <= MAX_GEMINI_MD_BYTES);
  assert.ok(res.toolbox.checkedCount > 0);
});
