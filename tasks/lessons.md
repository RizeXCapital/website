# Sovereign RCM — Lessons Learned

> Every correction is a pattern. Capture it. Never repeat it.

---

## Lessons

### 1. Blog posts must include visual diagrams
**Date:** 2026-02-26
**Context:** First blog post was published text-only. Had to go back and add branded SVG diagrams + image CSS after the fact.
**Rule:** Every blog post should include at least 2 branded SVG diagrams to break up long-form content and improve engagement. Plan these during the writing phase, not as an afterthought.
**Checklist for new blog posts:**
- Identify 2+ natural diagram insertion points while outlining the post
- Create branded SVGs using project colors (navy #1B2A4A, coral #E8614D, teal #2E86AB, ice #F0F6FA)
- Place diagrams after intro paragraphs of key sections, before the deep detail
- Use descriptive alt text on all images
- SVGs go in `public/blog/`, referenced via standard markdown `![alt](/blog/filename.svg)`
- Verify images render on mobile (responsive via `.blog-content img` CSS already in place)

### 2. Blog content must not read like AI-generated text
**Date:** 2026-02-28
**Context:** User received feedback that the blog was "AI slop." Extensive rewrite required to remove AI writing signals.
**Rule:** All blog content must be written in a natural human voice. Before publishing any blog post, audit for and eliminate the following AI tells:

**Structural signals:**
- Perfectly parallel bold subpoints (e.g., 4 consecutive `**Bold phrase.** Explanation` blocks). Mix it up: some bolded, some not, some starting with "And" or other natural connectors.
- Uniform numbered lists where every item follows `**Label**: Sentence. Sentence.` — convert to prose paragraphs ("First,...", "Second,...") or vary the structure.
- Uniform bullet lists where every item follows the same grammatical template. Convert to flowing prose or vary the format.
- Every paragraph being roughly the same length. Real writing has short punchy paragraphs mixed with longer ones.

**Punctuation signals:**
- Em dash (—) overuse. Humans use maybe 3-5 per article. AI uses 15-20+. Replace most with commas, periods, parentheses, or restructure the sentence.
- Double-hyphen dash ( -- ). AI frequently types ` -- ` as a long-dash substitute. Real writers never do this. Replace with a comma (mid-sentence) or period (before a capital). Auto-fixed by scanner.
- Colon introductions as a crutch ("The bottom line:", "The alternative:", "The classic example:"). Rewrite as natural sentences.
- Perfectly consistent Oxford comma usage. Humans are inconsistent.

**Phrasing signals:**
- Formulaic transitions: "Here is where...", "The result is...", "Then there is..."
- Dramatic/preachy: "The insidious thing about...", "a genuine path forward", "not optional — it is a prerequisite"
- Thesis-statement openers: "The billing challenges facing small practices are structural, not cyclical"
- Stiff corporate closings: "we would welcome the conversation"
- Overly formal when casual works: "it is" instead of "it's" throughout
- Every section following the same rhythm: statement, evidence, elaboration

**Whitespace/encoding signals:**
- Trailing spaces on lines
- Smart quotes (curly), en dashes, or Unicode ellipses — use straight quotes, hyphens, and "..."
- Lines starting or ending with `-` outside of YAML frontmatter

**Checklist before publishing:**
- Read aloud — does it sound like a person talking, or a report?
- Count em dashes — if more than 5, cut them
- Check bold subpoint sections — are they all identical in structure? Break them up.
- Check lists — could they be prose instead? Are they too uniform?
- Grep for trailing spaces, smart quotes, em dash count
- Grep for stacked compound adjectives (two hyphenated words in a row, e.g. `x-specific, y-specific`)
- Grep for `-specific`, `-focused`, `-driven`, `-based`, `-level`, `-related` as compound modifiers
- Does the author's personality come through? (Ghulam = data/ML background, Faizan = EM physician, Navid M. Rahman PE = COO/ops)

---

### 3. Over-hyphenation is a distinct AI signature
**Date:** 2026-03-11
**Context:** Audit found `specialty-specific, size-specific numbers`, `highest-impact thing AI does`, `specialty-specific coding patterns`, and `highest-volume emergency departments` across blog posts and TSX pages. All replaced with plain human phrasing.
**Rule:** AI over-hyphenates. It compresses meaning into compound adjectives because it optimizes for information density. Humans reach for noun phrases instead. The difference is subtle but detectable.

**The core problem — compression vs. readability:**
AI writes: `specialty-specific, size-specific numbers`
Human writes: `actual numbers from practices your size and specialty`
AI writes: `highest-impact thing AI does`
Human writes: `where AI makes the biggest difference`
AI writes: `highest-volume emergency departments`
Human writes: `busiest emergency departments`

**Patterns to catch and fix:**

1. **Stacked compound adjectives** — two or more hyphenated modifiers in a row
   - `specialty-specific, size-specific` → `practices your size and specialty`
   - `data-driven, outcome-focused` → rewrite as a sentence
   - Any time you see `x-something, y-something` before a noun: rewrite as a phrase

2. **Superlative compounds** — `highest-X`, `lowest-X`, `most-X` as hyphenated modifiers
   - `highest-impact` → `biggest`, `most significant`, `most important`
   - `highest-volume` → `busiest`, `most active`
   - `lowest-cost` → `cheapest`, `least expensive`
   - Exception: `high-volume` is a real industry term in clinical settings (e.g., "high-volume ED") — fine to use sparingly

3. **The `-specific` suffix** — overused by AI to signal precision
   - `specialty-specific` → `for your specialty`, `tailored to your specialty`
   - `size-specific` → `for practices your size`
   - `practice-specific` → `for your practice`
   - KEEP: `payer-specific` — this is genuine medical billing industry vocabulary

4. **Unnecessary `-based`, `-driven`, `-focused`, `-level`, `-related` modifiers**
   - `outcome-based approach` → `approach focused on outcomes` or just `what works`
   - `data-driven decision` → `decision backed by data`
   - `claim-level analysis` → `analysis of each claim`
   - `billing-related issues` → `billing issues`
   - These are not always wrong, but they cluster in AI writing. One is fine; three in a paragraph is a flag.

5. **The compression test** — ask: is the hyphenated form trying to pack more meaning than a simple word?
   - If yes: expand it to a phrase or use a simpler word
   - If the hyphenated form is an established compound (on-premise, air-gapped, clean-claim, third-party, multi-agent, payer-specific): keep it

**Approved compound terms (always hyphenated, never flag these):**
`on-premise`, `air-gapped`, `clean-claim`, `third-party`, `multi-agent`, `multi-factor`, `multi-provider`, `pre-submission`, `post-acute`, `non-redundant`, `internet-facing`, `zero-day`, `month-end`, `modifier-intensive`, `payer-specific`, `decision-making`, `write-off`, `real-time` (in tech contexts)

**The broader principle:**
AI optimizes for information density. Humans optimize for conversational flow. When you see a cluster of hyphenated compound adjectives, it means the writing was compressed rather than composed. The fix is almost always a noun phrase or a simpler word.
