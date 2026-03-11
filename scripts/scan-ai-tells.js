#!/usr/bin/env node
// scripts/scan-ai-tells.js
// Tool A: Deterministic AI-tell scanner. Zero dependencies.
// Usage: node scripts/scan-ai-tells.js [--fix]

const fs = require('fs');
const path = require('path');
const { RULES, EM_DASH_KEEP, fixEmDash, fixDoubleDash } = require('./lib/rules.js');
const { extractText } = require('./lib/extract-text.js');

const FIX_MODE = process.argv.includes('--fix');

// Glob files to scan
function collectFiles(dir, exts) {
  const results = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', '.git'].includes(entry.name)) walk(full);
      } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

const ROOT = process.cwd();
const files = [
  ...collectFiles(path.join(ROOT, 'content'), ['.md']),
  ...collectFiles(path.join(ROOT, 'src/app'), ['.tsx', '.ts']),
];

let totalIssues = 0;
let highCount = 0;
let medCount = 0;
let lowCount = 0;

console.log('\n=== AI Tell Scanner — RizeX Capital ===\n');

for (const filePath of files) {
  const relPath = path.relative(ROOT, filePath);
  let { body, lines } = extractText(filePath);
  const fileIssues = [];

  // --- Em dash overuse (file-level) ---
  const emDashPositions = [];
  for (let i = 0; i < lines.length; i++) {
    const count = (lines[i].match(/\u2014/g) || []).length;
    for (let j = 0; j < count; j++) emDashPositions.push(i + 1);
  }
  if (emDashPositions.length > 5) {
    fileIssues.push({
      severity: 'HIGH',
      lineStart: emDashPositions[0],
      message: `Em dash overuse — ${emDashPositions.length} found (max: 5; auto-fix keeps first ${EM_DASH_KEEP})`,
    });
  }

  // --- Line-based rules ---
  for (const rule of RULES) {
    if (rule.lineCheck) {
      const hits = rule.lineCheck(lines);
      for (const hit of hits) {
        fileIssues.push({ severity: rule.severity, ...hit });
      }
    }
  }

  // --- Full-text rules ---
  for (const rule of RULES) {
    if (rule.check) {
      const messages = rule.check(body);
      for (const msg of messages) {
        fileIssues.push({ severity: rule.severity, message: msg });
      }
    }
  }

  // --- Phrase rules ---
  for (const rule of RULES) {
    if (rule.phrases) {
      for (const phrase of rule.phrases) {
        for (let i = 0; i < lines.length; i++) {
          if (phrase.pattern.test(lines[i])) {
            phrase.pattern.lastIndex = 0;
            fileIssues.push({
              severity: rule.severity,
              lineStart: i + 1,
              message: `${rule.description} — "${lines[i].trim().slice(0, 60)}"`,
            });
          }
          phrase.pattern.lastIndex = 0;
        }
      }
    }
  }

  if (fileIssues.length === 0) continue;

  console.log(`📄 ${relPath}`);
  for (const issue of fileIssues) {
    const loc = issue.lineStart
      ? issue.lineEnd && issue.lineEnd !== issue.lineStart
        ? `Lines ${issue.lineStart}–${issue.lineEnd}`
        : `Line ${issue.lineStart}`
      : '';
    const pad = issue.severity === 'HIGH' ? '[HIGH]' : issue.severity === 'MED' ? '[MED] ' : '[LOW] ';
    console.log(`  ${pad} ${loc ? loc + ': ' : ''}${issue.message}`);
    totalIssues++;
    if (issue.severity === 'HIGH') highCount++;
    else if (issue.severity === 'MED') medCount++;
    else lowCount++;
  }
  console.log();

  // --- Auto-fix ---
  if (FIX_MODE) {
    let fixed = [...lines];

    // Fix trailing spaces
    fixed = fixed.map((l) => l.replace(/ +$/, ''));

    // Fix non-ASCII punctuation (en dashes get em-dash strategy: mid-sentence → comma, before capital → period)
    fixed = fixed.map((l) =>
      l
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2026/g, '...')
        .replace(/ \u2013 ([A-Z])/g, '. $1')   // en dash before capital → period
        .replace(/ \u2013 /g, ', ')              // en dash mid-sentence → comma
        .replace(/\u2013/g, ' - ')               // fallback
    );

    // Fix double-hyphen dashes: " -- " → comma or period
    fixed = fixed.map((line) => {
      if (!/ -- /.test(line) || /^-{3,}/.test(line.trim()) || /(<!--|-->)/.test(line)) return line;
      return fixDoubleDash(line);
    });

    // Fix em dashes: keep first EM_DASH_KEEP, replace rest with context-aware logic
    let emDashSeen = 0;
    fixed = fixed.map((line) => {
      if (!line.includes('\u2014')) return line;
      // First pass: context-aware replacement using actual line content
      let result = line.replace(/ \u2014 /g, (match, offset, str) => {
        emDashSeen++;
        if (emDashSeen <= EM_DASH_KEEP) return match; // keep as-is
        const after = str.slice(offset + match.length);
        if (/^[A-Z]/.test(after.trim())) return '. ';
        return ', ';
      });
      // Second pass: fallback for any bare em dashes not surrounded by spaces
      result = result.replace(/\u2014/g, (match) => {
        emDashSeen++;
        if (emDashSeen <= EM_DASH_KEEP) return match;
        return ' - ';
      });
      return result;
    });

    // Fix banned phrases
    const bannedRule = RULES.find((r) => r.id === 'banned-phrases');
    for (const phrase of bannedRule.phrases) {
      fixed = fixed.map((line) => line.replace(phrase.pattern, phrase.fix));
      phrase.pattern.lastIndex = 0;
    }

    // Reconstruct file content
    const rawFile = fs.readFileSync(filePath, 'utf8');
    if (path.extname(filePath) === '.md') {
      const fmMatch = rawFile.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
      if (fmMatch) {
        // extractText prepends frontmatter label lines to `lines` for scanning.
        // Recover only the body portion of `fixed` by counting from the end.
        const rawBodyLineCount = fmMatch[2].split('\n').length;
        const fixedBody = fixed.slice(fixed.length - rawBodyLineCount);
        fs.writeFileSync(filePath, fmMatch[1] + fixedBody.join('\n'));
      } else {
        fs.writeFileSync(filePath, fixed.join('\n'));
      }
    } else {
      // For TSX: we extracted segments, but we need to fix the original file directly
      // Apply punctuation + banned phrase fixes to raw TSX
      let emDashSeenTsx = 0;
      let rawFixed = rawFile
        .replace(/ +$/gm, '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2026/g, '...')
        // Fix double-hyphen dashes in prose (CSS vars like --color have no surrounding spaces)
        .replace(/ -- ([A-Z])/g, '. $1')
        .replace(/ -- /g, ', ')
        .replace(/ \u2013 ([A-Z])/g, '. $1')
        .replace(/ \u2013 /g, ', ')
        .replace(/\u2013/g, ' - ')
        .replace(/ \u2014 /g, (match, offset, str) => {
          emDashSeenTsx++;
          if (emDashSeenTsx <= EM_DASH_KEEP) return match;
          const after = str.slice(offset + match.length);
          return /^[A-Z]/.test(after.trim()) ? '. ' : ', ';
        })
        .replace(/\u2014/g, (match) => {
          emDashSeenTsx++;
          return emDashSeenTsx <= EM_DASH_KEEP ? match : ' - ';
        });
      for (const phrase of bannedRule.phrases) {
        rawFixed = rawFixed.replace(phrase.pattern, phrase.fix);
        phrase.pattern.lastIndex = 0;
      }
      fs.writeFileSync(filePath, rawFixed);
    }

    console.log(`  ✓ Auto-fixed: ${relPath}\n`);
  }
}

console.log('──────────────────────────────────────');
console.log(`Total: ${totalIssues} issue${totalIssues !== 1 ? 's' : ''} across scanned files`);
console.log(`  HIGH: ${highCount}  MED: ${medCount}  LOW: ${lowCount}`);
if (FIX_MODE) console.log('Auto-fix applied to all mechanical issues.');
console.log();

process.exit(highCount > 0 ? 1 : 0);
