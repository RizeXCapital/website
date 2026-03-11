# AI Tell Scanner Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two CLI tools that scan all website content for AI-generated writing signals and auto-fix what can be fixed mechanically.

**Architecture:** Tool A is a zero-dependency Node.js script using regex-based rule matching against extracted prose from `.md` and `.tsx` files. Tool B calls the Anthropic SDK to perform semantic analysis with author-voice awareness. Both share a small `scripts/lib/` layer for text extraction and rule definitions.

**Tech Stack:** Node.js (built-in only for Tool A), `@anthropic-ai/sdk` (Tool B only), no test framework (scripts are verified by running them against the actual blog files).

---

## Chunk 1: Shared Library

### Task 1: `scripts/lib/rules.js` — rule definitions and author profiles

**Files:**
- Create: `scripts/lib/rules.js`

- [ ] **Step 1: Create `scripts/lib/rules.js`**

```js
// scripts/lib/rules.js
// All HIGH/MED/LOW detection rules for Tool A, plus author profiles for Tool B.

const RULES = [
  // HIGH
  {
    id: 'em-dash-overuse',
    severity: 'HIGH',
    description: 'Em dash overuse',
    // No check/lineCheck — handled via dedicated block in scanner to avoid double-reporting
  },
  {
    id: 'parallel-bold-subpoints',
    severity: 'HIGH',
    description: 'Parallel bold subpoints',
    lineCheck: (lines) => {
      const issues = [];
      let run = 0;
      let runStart = 0;
      for (let i = 0; i < lines.length; i++) {
        if (/^\*\*[^*]+\*\*[:\s]/.test(lines[i].trim())) {
          if (run === 0) runStart = i;
          run++;
          if (run >= 3) {
            issues.push({
              lineStart: runStart + 1,
              lineEnd: i + 1,
              message: `Parallel bold subpoints — ${run} consecutive "**X**: ..." patterns`,
            });
          }
        } else {
          run = 0;
        }
      }
      return issues;
    },
  },
  {
    id: 'uniform-list-items',
    severity: 'HIGH',
    description: 'Uniform list items',
    lineCheck: (lines) => {
      const issues = [];
      let listStart = -1;
      let listItems = [];
      for (let i = 0; i < lines.length; i++) {
        const match = lines[i].trim().match(/^[-*\d+\.]\s+(\w+)/);
        if (match) {
          if (listStart === -1) listStart = i;
          listItems.push({ line: i, firstWord: match[1].toLowerCase() });
        } else {
          if (listItems.length >= 4) {
            const openers = listItems.map((x) => x.firstWord);
            const unique = new Set(openers);
            if (unique.size === 1) {
              issues.push({
                lineStart: listStart + 1,
                lineEnd: i,
                message: `Uniform list items — all ${listItems.length} items begin with "${openers[0]}"`,
              });
            }
          }
          listStart = -1;
          listItems = [];
        }
      }
      return issues;
    },
  },
  {
    id: 'banned-phrases',
    severity: 'HIGH',
    description: 'Banned phrases',
    phrases: [
      { pattern: /cutting[- ]edge/gi, fix: 'precise' },
      { pattern: /\bleverag(e|ing|ed)\b/gi, fix: 'use' },
      { pattern: /revolutioniz(e|ing|ed)/gi, fix: 'change' },
      { pattern: /game[- ]changing/gi, fix: 'significant' },
    ],
  },
  // MED
  {
    id: 'formulaic-transitions',
    severity: 'MED',
    description: 'Formulaic transitions',
    phrases: [
      { pattern: /Here is where/g },
      { pattern: /The result is/g },
      { pattern: /The bottom line:/g },
      { pattern: /The classic example:/g },
    ],
  },
  {
    id: 'contraction-avoidance',
    severity: 'MED',
    description: 'Contraction avoidance ("it is" density)',
    check: (text) => {
      const matches = text.match(/\bit is\b/gi) || [];
      return matches.length > 5
        ? [`"it is" appears ${matches.length} times (consider contractions)`]
        : [];
    },
  },
  {
    id: 'thesis-opener',
    severity: 'MED',
    description: 'Thesis-statement opener',
    lineCheck: (lines) => {
      const issues = [];
      for (let i = 0; i < Math.min(lines.length, 10); i++) {
        if (/[Ii]n this (post|article|piece),?\s+we('ll|'ll| will) cover/i.test(lines[i])) {
          issues.push({ lineStart: i + 1, message: 'Thesis-statement opener detected' });
        }
      }
      return issues;
    },
  },
  {
    id: 'uniform-paragraph-length',
    severity: 'MED',
    description: 'Uniform paragraph length',
    check: (text) => {
      const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 30);
      if (paragraphs.length < 5) return [];
      const wordCounts = paragraphs.map((p) => p.split(/\s+/).length);
      let runCount = 0;
      for (let i = 1; i < wordCounts.length; i++) {
        const avg = (wordCounts[i - 1] + wordCounts[i]) / 2;
        const diff = Math.abs(wordCounts[i] - wordCounts[i - 1]) / avg;
        if (diff < 0.2) {
          runCount++;
          if (runCount >= 4) {
            return [`5+ consecutive paragraphs within 20% of same word count`];
          }
        } else {
          runCount = 0;
        }
      }
      return [];
    },
  },
  // LOW
  {
    id: 'trailing-spaces',
    severity: 'LOW',
    description: 'Trailing spaces',
    lineCheck: (lines) => {
      return lines
        .map((line, i) => (/ +$/.test(line) ? { lineStart: i + 1, message: 'Trailing space' } : null))
        .filter(Boolean);
    },
    fix: (line) => line.replace(/ +$/, ''),
  },
  {
    id: 'non-ascii-punctuation',
    severity: 'LOW',
    description: 'Non-ASCII punctuation',
    lineCheck: (lines) => {
      const issues = [];
      for (let i = 0; i < lines.length; i++) {
        if (/[\u2018\u2019\u201C\u201D\u2026\u2013]/.test(lines[i])) {
          issues.push({ lineStart: i + 1, message: 'Non-ASCII punctuation (smart quotes, en dash, or ellipsis)' });
        }
      }
      return issues;
    },
    // fix: applied directly in scanner with context-aware en-dash strategy
  },
  {
    id: 'symmetric-oxford-comma',
    severity: 'LOW',
    description: 'Symmetric Oxford comma (100% consistent — humans vary)',
    check: (text) => {
      const withOxford = (text.match(/, and /g) || []).length;
      const withoutOxford = (text.match(/[^,] and /g) || []).length;
      const total = withOxford + withoutOxford;
      if (total >= 5 && withOxford === total) {
        return [`Oxford comma used in 100% of ${total} list instances — humans vary`];
      }
      return [];
    },
  },
];

const AUTHORS = {
  'Faizan G. Arif, MD': {
    voice: 'clinical-em',
    description: 'EM physician — street-level clinical, patient-impact first, concrete and direct',
    hedgeMax: 3,
  },
  'Ghulam Shah': {
    voice: 'data-ml',
    description: 'AI/ML engineer — technical, metric-heavy, systems thinking, precise',
    hedgeMax: 4,
  },
  'Navid M. Rahman, PE': {
    voice: 'coo-ops',
    description: 'COO — operations-focused, process and systems thinking, business outcomes',
    hedgeMax: 4,
  },
};

// Em dash auto-fix: keep first N, replace the rest
const EM_DASH_KEEP = 2;

// Em dash replacement strategy
function fixEmDash(line, prevLine, nextLine) {
  // Mid-sentence: word — word → word, word
  // Before capital / start of new sentence → ". "
  // Fallback → " - "
  return line.replace(/ \u2014 /g, (match, offset, str) => {
    const after = str.slice(offset + match.length);
    if (/^[A-Z]/.test(after.trim())) return '. ';
    return ', ';
  }).replace(/\u2014/g, ' - '); // fallback for any remaining
}

module.exports = { RULES, AUTHORS, EM_DASH_KEEP, fixEmDash };
```

- [ ] **Step 2: Verify the file parses without errors**

```bash
node -e "const r = require('./scripts/lib/rules.js'); console.log('Rules:', r.RULES.length, '| Authors:', Object.keys(r.AUTHORS).length)"
```

Expected output: `Rules: 11 | Authors: 3`

- [ ] **Step 3: Commit**

```bash
git add scripts/lib/rules.js
git commit -m "Add AI tell scanner rule definitions and author profiles"
```

---

### Task 2: `scripts/lib/extract-text.js` — prose extractor for .md and .tsx

**Files:**
- Create: `scripts/lib/extract-text.js`

- [ ] **Step 1: Create `scripts/lib/extract-text.js`**

```js
// scripts/lib/extract-text.js
// Extracts scannable prose from .md and .tsx files.
// Returns { body: string, lines: string[], frontmatter: object }

const fs = require('fs');
const path = require('path');

/**
 * Extract text from a .md file.
 * Returns full body (frontmatter stripped) and frontmatter fields separately.
 */
function extractFromMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    return { body: raw, lines: raw.split('\n'), frontmatter: {} };
  }

  const fmRaw = fmMatch[1];
  const body = fmMatch[2];

  // Parse frontmatter: handles simple key: value and YAML inline lists (keywords: [a, b, c])
  const frontmatter = {};
  for (const line of fmRaw.split('\n')) {
    // Inline list: keywords: [billing, ai, rcm]
    const listMatch = line.match(/^(\w+):\s*\[([^\]]*)\]/);
    if (listMatch) {
      frontmatter[listMatch[1]] = listMatch[2].split(',').map((s) => s.trim()).join(' ');
      continue;
    }
    // Simple scalar: title: "Some Title" or date: 2026-03-01
    const m = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (m) frontmatter[m[1]] = m[2];
  }

  // Build scannable frontmatter text with source labels (title, excerpt, keywords)
  const fmScannable = [
    frontmatter.title ? `[frontmatter:title] ${frontmatter.title}` : '',
    frontmatter.excerpt ? `[frontmatter:excerpt] ${frontmatter.excerpt}` : '',
    frontmatter.keywords ? `[frontmatter:keywords] ${frontmatter.keywords}` : '',
  ].filter(Boolean).join('\n');

  const fullBody = fmScannable ? `${fmScannable}\n${body}` : body;

  return { body: fullBody, lines: fullBody.split('\n'), frontmatter };
}

/**
 * Extract text strings from a .tsx / .ts file via regex.
 * Captures: JSX text nodes, string literals in JSX attributes, template literals.
 * No AST — zero dependencies.
 */
function extractFromTsx(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  // Collect text: JSX text nodes (between tags), string literals (double/single quoted)
  const segments = [];

  // JSX text nodes: content between > and < that isn't pure whitespace
  const jsxText = raw.match(/>([^<>{}`]+)</g) || [];
  for (const match of jsxText) {
    const text = match.slice(1, -1).trim();
    if (text.length > 3) segments.push(text);
  }

  // String literals assigned to common text props (className excluded)
  const strLiterals = raw.match(/(?:title|description|heading|text|label|placeholder|alt|excerpt|content)=["'`]([^"'`]{10,})["'`]/g) || [];
  for (const match of strLiterals) {
    const text = match.replace(/^[^=]+=["'`]/, '').replace(/["'`]$/, '').trim();
    if (text.length > 3) segments.push(text);
  }

  const body = segments.join('\n');
  return { body, lines: body.split('\n'), frontmatter: {} };
}

/**
 * Main entry point. Auto-detects file type.
 */
function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.md') return extractFromMarkdown(filePath);
  if (ext === '.tsx' || ext === '.ts') return extractFromTsx(filePath);
  throw new Error(`Unsupported file type: ${ext}`);
}

module.exports = { extractText };
```

- [ ] **Step 2: Verify against a real blog post**

```bash
node -e "
const { extractText } = require('./scripts/lib/extract-text.js');
const r = extractText('content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md');
console.log('Lines:', r.lines.length);
console.log('Author:', r.frontmatter.author);
console.log('First 100 chars:', r.body.slice(0, 100));
"
```

Expected: prints line count, author name, and first 100 chars of body text.

- [ ] **Step 3: Verify against a TSX file**

```bash
node -e "
const { extractText } = require('./scripts/lib/extract-text.js');
const r = extractText('src/app/page.tsx');
console.log('Segments extracted:', r.lines.length);
console.log('Sample:', r.lines.slice(0, 3));
"
```

Expected: prints extracted text segments from the homepage.

- [ ] **Step 4: Commit**

```bash
git add scripts/lib/extract-text.js
git commit -m "Add prose extractor for .md and .tsx files"
```

---

## Chunk 2: Tool A — Deterministic Scanner

### Task 3: `scripts/scan-ai-tells.js` — main scanner

**Files:**
- Create: `scripts/scan-ai-tells.js`
- Modify: `package.json` (add npm scripts)

- [ ] **Step 1: Create `scripts/scan-ai-tells.js`**

```js
#!/usr/bin/env node
// scripts/scan-ai-tells.js
// Tool A: Deterministic AI-tell scanner. Zero dependencies.
// Usage: node scripts/scan-ai-tells.js [--fix]

const fs = require('fs');
const path = require('path');
const { RULES, EM_DASH_KEEP, fixEmDash } = require('./lib/rules.js');
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
        fs.writeFileSync(filePath, fmMatch[1] + fixed.join('\n'));
      } else {
        fs.writeFileSync(filePath, fixed.join('\n'));
      }
    } else {
      // For TSX: we extracted segments, but we need to fix the original file directly
      // Apply punctuation + banned phrase fixes to raw TSX
      let rawFixed = rawFile
        .replace(/ +$/gm, '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2026/g, '...')
        .replace(/ \u2013 ([A-Z])/g, '. $1')
        .replace(/ \u2013 /g, ', ')
        .replace(/\u2013/g, ' - ');
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
```

- [ ] **Step 2: Run the scanner against all content**

```bash
node scripts/scan-ai-tells.js
```

Expected: Lists any AI tells found in blog posts and TSX files, with severity labels. Exit code 0 if no HIGH issues, 1 if HIGH issues found.

- [ ] **Step 3: Run with `--fix` on a copy to verify it doesn't corrupt files**

```bash
cp content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md /tmp/test-blog.md
node scripts/scan-ai-tells.js --fix
# verify the blog file is still valid markdown
node -e "const fs = require('fs'); const txt = fs.readFileSync('content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md','utf8'); console.log('Lines:', txt.split('\n').length, '| Starts with ---:', txt.startsWith('---'))"
# restore
cp /tmp/test-blog.md content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md
```

Expected: file still starts with `---`, line count unchanged or fewer (trailing spaces removed).

```bash
# Also verify mechanical fixes were actually applied (no smart quotes or ellipsis remain)
node -e "
const fs = require('fs');
const txt = fs.readFileSync('content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md','utf8');
const hasSmartQuotes = /[\u2018\u2019\u201C\u201D]/.test(txt);
const hasEllipsis = /\u2026/.test(txt);
console.log('Smart quotes remaining:', hasSmartQuotes);
console.log('Unicode ellipsis remaining:', hasEllipsis);
if (hasSmartQuotes || hasEllipsis) throw new Error('Fix did not apply cleanly');
console.log('Fix verified clean.');
"
# restore from backup
cp /tmp/test-blog.md content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md
```

- [ ] **Step 4: Add Tool A npm scripts to `package.json`**

Open `package.json` and add to the `"scripts"` block (Tool B scripts added in Task 4):

```json
"audit:ai":     "node scripts/scan-ai-tells.js",
"audit:ai:fix": "node scripts/scan-ai-tells.js --fix"
```

- [ ] **Step 5: Verify npm script works**

```bash
npm run audit:ai
```

Expected: same output as running the script directly.

- [ ] **Step 6: Commit**

```bash
git add scripts/scan-ai-tells.js package.json
git commit -m "Add Tool A: deterministic AI-tell scanner with auto-fix"
```

---

## Chunk 3: Tool B — Semantic Auditor

### Task 4: `scripts/audit-ai-semantic.js` — Claude-powered semantic audit

**Files:**
- Create: `scripts/audit-ai-semantic.js`

**Prerequisites:** `ANTHROPIC_API_KEY` must be set in the environment (or `.env.local`). Install the SDK first:

```bash
npm install --save-dev @anthropic-ai/sdk
```

- [ ] **Step 1: Create `scripts/audit-ai-semantic.js`**

```js
#!/usr/bin/env node
// scripts/audit-ai-semantic.js
// Tool B: Semantic AI-tell auditor using Claude API.
// Usage: node scripts/audit-ai-semantic.js <filepath> [--fix]

const fs = require('fs');
const path = require('path');
const { AUTHORS } = require('./lib/rules.js');
const { extractText } = require('./lib/extract-text.js');

const FIX_MODE = process.argv.includes('--fix');
const filePath = process.argv.find((a) => !a.startsWith('-') && a !== process.argv[0] && a !== process.argv[1]);

if (!filePath) {
  console.error('Usage: node scripts/audit-ai-semantic.js <filepath> [--fix]');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

async function main() {
  const { Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const { body, frontmatter } = extractText(filePath);
  const authorName = frontmatter.author || 'Unknown';
  const authorProfile = AUTHORS[authorName];

  const voiceContext = authorProfile
    ? `Author: ${authorName}\nVoice profile: ${authorProfile.description}\nMax acceptable hedge count: ${authorProfile.hedgeMax}`
    : `Author: ${authorName}\nVoice profile: Unknown — check for generic AI register only`;

  const auditPrompt = `You are an expert editor who identifies AI-generated writing patterns. Audit the following content for these specific signals:

1. SEMANTIC — Suspiciously balanced arguments (equal weight to both sides when a human would lead with their view)
2. SEMANTIC — Generic specificity (stats cited without personal context or lived experience)
3. FRICTION — No personal anecdote or admission of uncertainty/failure anywhere in the piece
4. FLOW — Overly smooth transitions (every paragraph flows perfectly; no abrupt human shifts)
5. HEDGE — Hedging language cluster (high density of "may", "might", "could", "it's worth noting")
6. VOICE — Author voice mismatch (writing doesn't match the author's known register)

${voiceContext}

For each flag: identify the paragraph number, the signal type (SEMANTIC/FRICTION/FLOW/HEDGE/VOICE), and a one-sentence explanation of why it feels AI-generated. Reference the actual text.

If a section is clean, say so. Be specific and direct — do not hedge your own feedback.

End with: "Summary: N flags. [Recommend action or 'Looks clean.']"

---

CONTENT TO AUDIT:

${body}`;

  console.log(`\n=== Semantic AI Audit — ${authorName} ===`);
  console.log(`File: ${filePath}\n`);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: auditPrompt }],
  });

  const auditResult = response.content[0].text;
  console.log(auditResult);

  if (FIX_MODE) {
    console.log('\n--- Auto-fix mode: proposing rewrites ---\n');

    const fixPrompt = `You flagged several issues in the content above. Now rewrite ONLY the flagged paragraphs to sound like a human wrote them in the author's voice.

${voiceContext}

Rules:
- Keep the same information and factual claims
- Match the author's voice — do NOT make it sound generic
- Vary sentence length — mix short punchy sentences with longer ones
- Add friction: admit uncertainty, reference a specific real scenario, or show a personal perspective
- Max ${authorProfile?.hedgeMax || 4} hedge words total in your rewrites
- Do NOT start sentences with "I" in every paragraph
- Do NOT use em dashes more than 2 times total

Return ONLY the rewritten paragraphs, labeled "Para N (rewrite):" before each one.`;

    const fixResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: auditPrompt },
        { role: 'assistant', content: auditResult },
        { role: 'user', content: fixPrompt },
      ],
    });

    const rewrites = fixResponse.content[0].text;
    console.log(rewrites);
    console.log('\n─────────────────────────────────────────');
    console.log('Apply these rewrites to the file? [y/N] ');

    process.stdout.write('> ');
    const answer = await new Promise((resolve) => {
      process.stdin.once('data', (d) => resolve(d.toString().trim().toLowerCase()));
    });

    if (answer === 'y' || answer === 'yes') {
      // Write rewrites into file — append as a comment block for manual application
      const timestamp = new Date().toISOString().slice(0, 10);
      const appendBlock = `\n\n<!-- AI AUDIT REWRITES (${timestamp}) — apply manually:\n\n${rewrites}\n-->\n`;
      fs.appendFileSync(filePath, appendBlock);
      console.log(`\nRewrites appended to ${filePath} as a comment block. Apply manually and remove the comment.`);
    } else {
      console.log('No changes written.');
    }
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
```

- [ ] **Step 2: Run against a blog post (requires `ANTHROPIC_API_KEY`)**

```bash
node scripts/audit-ai-semantic.js content/blog/2026-03-10-change-healthcare-attack-what-it-means-for-your-practice.md
```

Expected: Semantic audit printed with author name "Navid M. Rahman, PE", flags or clean assessment, summary line.

- [ ] **Step 3: Verify `--fix` mode shows diff and prompts before writing**

```bash
node scripts/audit-ai-semantic.js content/blog/2026-03-10-change-healthcare-attack-what-it-means-for-your-practice.md --fix
```

Expected: audit output, then rewrite proposals, then `[y/N]` prompt. Answer `N` — verify no file change.

```bash
git diff content/blog/2026-03-10-change-healthcare-attack-what-it-means-for-your-practice.md
```

Expected: no diff (nothing written on `N`).

- [ ] **Step 4: Add Tool B npm scripts to `package.json`**

Add to the `"scripts"` block:

```json
"audit:ai:deep":     "node scripts/audit-ai-semantic.js",
"audit:ai:deep:fix": "node scripts/audit-ai-semantic.js --fix"
```

- [ ] **Step 5: Commit**

```bash
git add scripts/audit-ai-semantic.js package.json
git commit -m "Add Tool B: semantic AI-tell auditor with Claude API"
```

---

## Chunk 4: Verification & Documentation

### Task 5: End-to-end smoke test

- [ ] **Step 1: Run full suite on all blog posts**

```bash
npm run audit:ai
```

Expected: scan completes, issues listed with severity, exit code reflects HIGH count.

- [ ] **Step 2: Run `--fix` and verify build still passes**

```bash
npm run audit:ai:fix
npm run build
```

Expected: `npm run build` exits with code 0 — no Next.js errors introduced by auto-fix.

- [ ] **Step 3: Run Tool B on each blog post**

```bash
node scripts/audit-ai-semantic.js content/blog/2026-02-26-how-ai-is-changing-medical-billing.md
node scripts/audit-ai-semantic.js content/blog/2026-03-01-how-much-revenue-losing-to-claim-denials.md
node scripts/audit-ai-semantic.js content/blog/2026-03-10-change-healthcare-attack-what-it-means-for-your-practice.md
```

Expected: each post gets an audit with author-matched voice profile.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "Verify AI tell scanner end-to-end across all blog posts"
```

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `npm run audit:ai` | Scan everything, report issues |
| `npm run audit:ai:fix` | Scan + auto-fix all mechanical issues |
| `npm run audit:ai:deep <file>` | Deep semantic audit of one file |
| `npm run audit:ai:deep:fix <file>` | Semantic audit + propose rewrites with confirm |

**Run before every commit:** `npm run audit:ai`
**Run before publishing a post:** `npm run audit:ai:deep <filepath>`
