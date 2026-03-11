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
    id: 'double-hyphen-dash',
    severity: 'HIGH',
    description: 'Double-hyphen dash (" -- ")',
    lineCheck: (lines) => {
      const issues = [];
      for (let i = 0; i < lines.length; i++) {
        const t = lines[i];
        // Skip horizontal rules / YAML frontmatter separators and HTML/JSX comments
        if (/^-{3,}/.test(t.trim()) || /(<!--|-->)/.test(t)) continue;
        if (/ -- /.test(t)) {
          issues.push({ lineStart: i + 1, message: 'Double-hyphen dash (" -- ") — AI punctuation signal; replace with comma or period' });
        }
      }
      return issues;
    },
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

// Double-hyphen dash replacement strategy
// " -- Word" (capital) → ". Word"  |  " -- word" → ", word"
function fixDoubleDash(line) {
  return line
    .replace(/ -- ([A-Z])/g, '. $1')
    .replace(/ -- /g, ', ');
}

module.exports = { RULES, AUTHORS, EM_DASH_KEEP, fixEmDash, fixDoubleDash };
