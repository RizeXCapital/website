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
