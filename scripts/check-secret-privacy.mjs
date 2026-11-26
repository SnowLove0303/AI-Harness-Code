import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SECRET_RULES = [
  { name: 'TavilyKey', re: /tvly-[a-zA-Z0-9_-]{10,}/ },
  { name: 'OpenAIKey', re: /sk-[a-zA-Z0-9]{20,}/ },
  { name: 'GitHubToken', re: /gh[pousr]_[a-zA-Z0-9]{20,}/ },
  { name: 'GoogleAPIKey', re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: 'SlackToken', re: /xox[baprs]-[a-zA-Z0-9-]+/ },
  { name: 'PrivateKeyBlock', re: /-----BEGIN [A-Z ]+PRIVATE KEY-----/ },
  { name: 'BearerTokenLiteral', re: /Bearer\s+[a-zA-Z0-9\-_.]{20,}/ },
  { name: 'CookieHeaderLiteral', re: /(?:Cookie|Set-Cookie)\s*[:=]\s*[^\r\n]{15,}/i },
];

const BINARY_EXT_RE = /\.(png|jpg|jpeg|gif|zip|tgz|woff2?|ico|pdf)$/i;

/**
 * Scans text for leaked API keys, tokens, cookies, or private keys.
 */
export function scanTextForSecrets(text, filePath = 'unknown') {
  const violations = [];
  const lines = String(text || '').split(/\r?\n/);

  lines.forEach((line, idx) => {
    for (const rule of SECRET_RULES) {
      if (rule.re.test(line)) {
        violations.push({
          code: 'SECRET_OR_PRIVACY_LEAK_BLOCKED',
          rule: rule.name,
          file: filePath,
          line: idx + 1,
          message: `Detected ${rule.name} pattern in ${filePath}:${idx + 1}. Remove credentials or move to ~/.gemini/config/credentials/.`,
        });
      }
    }
  });

  return {
    valid: violations.length === 0,
    violations,
  };
}

function runCli() {
  const repoRoot = process.cwd();
  const trackedFiles = execSync('git ls-files', { cwd: repoRoot, encoding: 'utf8' })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  const allViolations = [];
  let scanned = 0;

  for (const relPath of trackedFiles) {
    if (
      BINARY_EXT_RE.test(relPath) ||
      relPath === 'scripts/check-secret-privacy.mjs' ||
      relPath === 'tests/secret-privacy-guard.test.mjs'
    ) {
      continue;
    }
    const absPath = path.join(repoRoot, relPath);
    if (!existsSync(absPath)) continue;
    scanned++;
    const res = scanTextForSecrets(readFileSync(absPath, 'utf8'), relPath);
    allViolations.push(...res.violations);
  }

  console.log('=== Automated L2 Secret & Privacy Guard (AUTOMATED_L2_SECRET_AND_PRIVACY_GUARD_STANDARD) ===');
  if (allViolations.length > 0) {
    for (const v of allViolations) {
      console.error(`[FAIL] ${v.code} (${v.file}:${v.line}): ${v.message}`);
    }
    process.exit(1);
  }

  console.log(`[PASS] Scanned ${scanned} tracked file(s), 0 secret/cookie/token leaks detected.`);
  process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}
