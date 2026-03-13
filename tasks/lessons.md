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

---

### 4. Security headers that assume HTTPS will break local dev
**Date:** 2026-03-13
**Context:** Added `upgrade-insecure-requests` to the CSP header in `next.config.ts`. The build passed clean, but the site was completely broken on `http://localhost:3000`. The browser obeyed the directive, tried to load every resource (scripts, styles, fonts, images) over HTTPS, which doesn't exist locally, and rendered a blank page.
**Root cause:** `upgrade-insecure-requests` tells browsers to rewrite all `http://` URLs to `https://` before fetching. On Vercel (production), everything is HTTPS so this is free security. On localhost, it's catastrophic.
**Rule:** Any CSP directive or security header that assumes TLS must be gated behind `process.env.NODE_ENV === "production"`. This includes:
- `upgrade-insecure-requests` (CSP)
- `block-all-mixed-content` (CSP, deprecated but same issue)
- `Strict-Transport-Security` (HSTS) — already present, harmless on localhost since browsers ignore HSTS for localhost, but same principle applies

**The pattern to follow:**
```ts
...(process.env.NODE_ENV === "production"
  ? ["upgrade-insecure-requests"]
  : []),
```

**Why the build didn't catch it:** `npm run build` compiles and generates pages server-side. CSP is a response header; it only affects browser behavior at runtime. The build has no way to know that a header will break client-side resource loading. This is a class of bug that static analysis can never catch.

**Checklist for future security header changes:**
- After modifying headers in `next.config.ts`, always test in the browser (not just curl/build)
- If the header references HTTPS, TLS, or mixed content, gate it behind production
- Test both `npm run dev` (local) and `npm run build && npm start` (production-like)

---

### 5. Logo assets need transparent backgrounds and `unoptimized` in Next.js Image
**Date:** 2026-03-13
**Context:** The light-mode logo (`srcm1w.png`) had the chrome bottom-left face too bright on white backgrounds. Fix required: a new asset with transparent background, trimming dark logo padding to match, and adding `unoptimized` to every `<Image>` component rendering a logo.
**Root cause chain:**
1. The original asset had an opaque/near-white background baked in, making the chrome emblem wash out on white surfaces
2. The replacement asset (`srcm1wfix.png`) used transparent background (RGBA PNG), which solved the contrast issue
3. But Next.js Image optimization re-encodes PNGs and can strip or alter alpha channels, so `unoptimized` was required to preserve transparency
4. The new assets had different pixel dimensions (1513x357 → 1258x342 for light, 1495x348 → 1244x334 for dark), requiring width/height updates on every `<Image>` component
5. The padding/trim changed between old and new assets, so positioning offsets needed recalibrating (Footer: `-ml-8` → `-ml-3`)

**Rules:**
1. **Logo PNGs must have transparent backgrounds** — never bake in a white/colored background. The same logo appears on white (nav), dark navy (footer), and colored (OG image) surfaces.
2. **Always add `unoptimized` to `<Image>` components for logos** — Next.js image optimization re-encodes PNGs and can destroy alpha transparency. This applies to any RGBA PNG, not just logos.
3. **After swapping an image asset, update all dimensions** — check every `<Image>` component that references the logo. The `width` and `height` props must match the new file's actual pixel dimensions or the aspect ratio will be wrong.
4. **After swapping an asset, recalibrate positioning** — negative margins (`-ml-8`), padding, and alignment offsets are calibrated to the old asset's whitespace/trim. New assets with different trim will be misaligned.
5. **Logo paths are centralized in `src/lib/brand.ts`** — this made the swap a one-line change for the path itself, but dimensions and `unoptimized` still had to be updated per-component.

**Checklist for future logo/image asset swaps:**
- Verify the new asset has a transparent background (open in an image editor, check for alpha)
- Get exact pixel dimensions of the new file and update all `<Image>` width/height props
- Ensure `unoptimized` is on every `<Image>` that renders the logo
- Check positioning offsets (negative margins, padding) against the new asset's whitespace
- Test on both light and dark backgrounds
- Kill dev server + `rm -rf .next` before testing (see Lesson: cache busting)
