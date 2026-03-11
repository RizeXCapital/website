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
