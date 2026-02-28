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
- Does the author's personality come through? (Ghulam = data/ML background, Faizan = EM physician, Mudassir = finance/ops)
