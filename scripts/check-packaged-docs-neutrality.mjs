#!/usr/bin/env node
/**
 * 随包分发文档的中立性守卫。
 *
 * 背景：曾出现"随包分发的 README 里写进了维护者所在机器的宿主配置路径与会话状态"。
 * 该问题人工复核漏过，故以静态扫描断言守住。
 *
 * 判定对象：package.json 的 files 白名单中随包分发的文档（README.md、CHANGELOG.md）。
 * 判定口径：命中任一类关键词即失败，并打印文件与行号。
 *
 * 用法：node scripts/check-packaged-docs-neutrality.mjs
 * 退出码：0 = 零命中；1 = 存在命中或读取失败。
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkgDir = join(repoRoot, 'packages', 'ai-harness');

/** 随包分发的文档（与 package.json 的 files 白名单一致）。 */
const SHIPPED_DOCS = ['README.md', 'CHANGELOG.md'];

/** 判定口径：宿主专有词、宿主配置路径、本机绝对路径、会话状态、业务产品名。 */
const RULES = [
  { name: '宿主专有词', re: /\bDSH\b|DeepSeek|deepseek/ },
  { name: '宿主配置路径', re: /\.dsh\b|DSH_HOME/ },
  { name: '本机绝对路径', re: /[A-Za-z]:[\\/]|~\/\./ },
  { name: '会话或环境瞬时状态', re: /ENEEDAUTH|npm whoami/ },
  { name: '业务产品名', re: /\bMSDS\b|冠志/ },
];

let failures = 0;
let scanned = 0;

for (const rel of SHIPPED_DOCS) {
  const file = join(pkgDir, rel);
  if (!existsSync(file)) {
    console.error(`✗ 缺失随包文档：${rel}`);
    failures += 1;
    continue;
  }
  scanned += 1;
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  let hits = 0;
  lines.forEach((line, index) => {
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        hits += 1;
        console.error(`✗ ${rel}:${index + 1} [${rule.name}] ${line.trim().slice(0, 120)}`);
      }
    }
  });
  console.log(`${hits === 0 ? '✓' : '✗'} ${rel} — ${hits} 处命中`);
  failures += hits;
}

console.log(`\n扫描 ${scanned} 份随包文档，命中 ${failures} 处`);
if (failures > 0) {
  console.error('随包文档中立性守卫未通过：随包分发的文档中不得出现宿主 / 本机 / 产品专有内容。');
  process.exit(1);
}
console.log('随包文档中立性守卫通过');