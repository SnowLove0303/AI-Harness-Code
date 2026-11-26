import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scanTextForSecrets } from '../scripts/check-secret-privacy.mjs';

test('scanTextForSecrets blocks API keys, tokens, cookies, and private keys', () => {
  const dirty = [
    'const k1 = "tvly-1234567890abcdef";',
    'const k2 = "ghp_1234567890abcdefghij123456";',
    'const hdr = "Cookie: session_id=abcdef1234567890xyz";',
    '-----BEGIN RSA PRIVATE KEY-----',
  ].join('\n');

  const res = scanTextForSecrets(dirty, 'dirty.txt');
  assert.equal(res.valid, false);
  assert.equal(res.violations.length, 4);
  assert.ok(res.violations.every((v) => v.code === 'SECRET_OR_PRIVACY_LEAK_BLOCKED'));
});

test('scanTextForSecrets passes clean portable credential references', () => {
  const clean = [
    'const credPath = path.join(os.homedir(), ".gemini/config/credentials/tavily_credentials.json");',
    'const auth = "Bearer <TOKEN>";',
  ].join('\n');

  const res = scanTextForSecrets(clean, 'clean.txt');
  assert.equal(res.valid, true);
  assert.equal(res.violations.length, 0);
});
