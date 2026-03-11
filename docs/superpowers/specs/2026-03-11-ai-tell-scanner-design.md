# AI Tell Scanner — Design Spec
**Date:** 2026-03-11
**Status:** Approved

---

## Overview

Two complementary tools that scan the RizeX Capital website for AI-generated content signals.

- **Tool A** (`scripts/scan-ai-tells.js`) — deterministic pattern matching, zero dependencies, fast
- **Tool B** (`scripts/audit-ai-semantic.js`) — Claude API semantic analysis, deep audit

Run A before every commit. Run B before publishing a blog post.

---

## Scope

All three content types are scanned:

| Type | Files |
|------|-------|
| Blog posts | `content/blog/*.md` (full body + frontmatter) |
| Page copy | `src/app/**/*.tsx` (string literals + JSX text nodes extracted via regex) |
| Frontmatter | `title`, `excerpt`, `keywords` fields |

---

## Tool A — `scripts/scan-ai-tells.js`

### Detection Rules

| Severity | Signal | Rule |
|----------|--------|------|
| HIGH | Em dash overuse | >5 `—` per file (human tolerance max is 5; auto-fix is more aggressive — keeps only first 2 to create clear margin) |
| HIGH | Parallel bold subpoints | 3+ consecutive `**X**: ...` lines |
| HIGH | Uniform list items | Bulleted/numbered list where all items share same grammatical opener |
| HIGH | Banned phrases | `cutting-edge`, `leverage`, `revolutionize`, `game-changing` |
| MED | Formulaic transitions | `"Here is where"`, `"The result is"`, `"The bottom line:"`, `"The classic example:"` |
| MED | Contraction avoidance | `"it is"` density >5 per doc |
| MED | Thesis-statement opener | First paragraph ends with "In this post, we'll cover X, Y, and Z" shape |
| MED | Uniform paragraph length | 5+ consecutive paragraphs within 20% of same word count |
| LOW | Trailing spaces | Any line ending with `\s+` |
| LOW | Non-ASCII punctuation | Smart quotes, en dashes, Unicode ellipsis `…` |
| LOW | Symmetric Oxford comma | 100% consistency across 5+ list instances |

### Output Format

```
=== AI Tell Scanner — RizeX Capital ===

📄 content/blog/2026-02-26-how-ai-is-changing-medical-billing.md
  [HIGH] Line 47:  Em dash overuse — 8 found (max: 5)
  [HIGH] Lines 23–27: Parallel bold subpoints — 4 consecutive "**X**: ..." patterns
  [MED]  Line 12:  Formulaic opener — "Here is where..."
  [LOW]  Line 89:  Trailing space

📄 src/app/page.tsx
  [MED]  Line 142: Banned phrase — "cutting-edge"

──────────────────────────────────────
Total: 5 issues across 2 files
  HIGH: 2  MED: 2  LOW: 1
```

Exit code `1` if any HIGH issues are found (allows future pre-commit hook integration).

### Auto-fix (`--fix` flag)

Runs automatically without confirmation prompts.

| Issue | Fix Applied |
|-------|-------------|
| Em dash (mid-sentence ` — `) | → `, ` (comma) |
| Em dash (before new sentence) | → `. ` (period) |
| Em dash (ambiguous) | → ` - ` (spaced hyphen) |
| Keeps first 2 em dashes per file | Fixes all beyond the 2nd |
| Trailing spaces | Stripped |
| Smart quotes `" " ' '` | → straight quotes `" '` |
| Unicode ellipsis `…` | → `...` |
| En dashes used as em dashes | → apply em dash strategy |
| Banned phrases | Lookup replacement: `cutting-edge` → `precise`, `leverage` → `use`, `revolutionize` → `change`, `game-changing` → `significant` |

Items **not** auto-fixed (require human judgment):
- Parallel bold subpoints (needs prose rewrite)
- Uniform list items (needs restructuring)
- Contraction avoidance (context-dependent)
- Uniform paragraph length (needs content change)

### npm Scripts

```json
"audit:ai"     : "node scripts/scan-ai-tells.js",
"audit:ai:fix" : "node scripts/scan-ai-tells.js --fix"
```

---

## Tool B — `scripts/audit-ai-semantic.js`

### What It Catches

| Signal | Description |
|--------|-------------|
| Suspiciously balanced arguments | Equal weight given to opposing sides — a human would lead with their view |
| Generic specificity | Stats cited without personal context |
| No personal anecdote or friction | Author never admits uncertainty or shares a specific failure |
| Overly smooth transitions | Every paragraph flows perfectly — no abrupt human shifts |
| Hedging language clusters | `may`, `might`, `could`, `it's worth noting` density |
| Author voice mismatch | Writing doesn't match the author's known register |

### Author Profiles

Loaded automatically from frontmatter `author` field:

| Author | Voice Profile | Max Hedge Count |
|--------|--------------|-----------------|
| Faizan G. Arif, MD | `clinical-em` — street-level clinical, patient-impact first | 3 |
| Ghulam Shah | `data-ml` — technical, metric-heavy, systems thinking | 4 |
| Navid M. Rahman, PE | `coo-ops` — operations-focused, COO perspective, process and systems thinking | 4 |

### Invocation

```bash
node scripts/audit-ai-semantic.js <filepath>
node scripts/audit-ai-semantic.js content/blog/2026-03-10-change-healthcare-attack.md
```

### Output Format

```
=== Semantic AI Audit — Faizan G. Arif, MD ===
File: content/blog/2026-03-10-change-healthcare-attack.md

[SEMANTIC] Para 3: Suspiciously balanced — presents vendor risk and practice risk with
           identical weight. A physician would lead with patient impact, not vendor blame.

[VOICE]    Para 6: Missing clinical register. "Healthcare organizations face challenges"
           reads like a consultant, not an EM doc. Expected: street-level specificity.

[HEDGE]    Para 8: Hedge cluster — "may", "could", "might" appear 4 times in 3 sentences.

Summary: 3 semantic flags. Recommend manual rewrite of paras 3 and 6 before publishing.
```

### Auto-fix (`--fix` flag)

Shows a diff of the proposed Claude rewrite and asks for confirmation before writing to file. **Unlike Tool A, Tool B requires confirmation** — a Claude-generated rewrite could itself contain AI tells, so human review is mandatory before any change is written.

### Dependencies

- `@anthropic-ai/sdk` (added to `devDependencies`)
- `ANTHROPIC_API_KEY` environment variable

### npm Scripts

```json
"audit:ai:deep"     : "node scripts/audit-ai-semantic.js",
"audit:ai:deep:fix" : "node scripts/audit-ai-semantic.js --fix"
```

---

## Shared Library

```
scripts/
  scan-ai-tells.js        ← Tool A runner
  audit-ai-semantic.js    ← Tool B runner
  lib/
    extract-text.js       ← extracts prose from .md and .tsx files
    rules.js              ← HIGH/MED/LOW rule definitions + author profiles
```

`extract-text.js` handles:
- `.md`: strips frontmatter (between `---` fences), returns body text with line numbers preserved
- `.tsx`: extracts string literals and JSX text content via regex (no AST — zero dependencies)
- Frontmatter fields: returns `title`, `excerpt`, `keywords` as scannable text with source labels

---

## What Is Not Included

- No GUI — terminal only
- No CI integration (can be added later using Tool A's exit code)
- No Calendly or scheduling integration
- No auto-fix for issues requiring prose judgment
