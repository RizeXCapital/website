# Blog Writing Playbook — RizeX Capital

> The goal: every post sounds like the author wrote it at their desk, not like a language model produced it on command.

This is the definitive reference for writing, editing, and publishing blog content. Read it before starting any post. Use the audit checklist at the bottom before publishing.

---

## Authors and Voices

Each author has a distinct voice. Match it.

**Ghulam (data/ML background)**
Precise but not robotic. He explains complex systems in plain terms. Uses analogies from data engineering. Comfortable with numbers and benchmarks. Occasionally drops into "here's what I actually saw" mode. Skeptical of vague claims — he wants to know what the model was trained on and how it generalizes.

**Faizan (EM physician)**
Writes from the bedside outward. Uses clinical shorthand naturally (Level 5, 837P, RCM) without explaining every term. His tone is direct, slightly impatient with jargon, and grounded in what a Tuesday in the ED actually feels like. He talks about the denial problem the way someone who has lost sleep over appeals talks about it.

**Navid M. Rahman PE (COO/ops)**
Systems thinker. Talks about infrastructure, load paths, failure modes. Comfortable with engineering metaphors. His Change Healthcare piece uses terms like "non-redundant critical node" naturally because that's how he actually thinks about it. Less personal than Faizan, more structural.

---

## Structural AI Tells

### Parallel bold subpoints
AI loves this structure:
> **Bold phrase.** Two sentences of explanation.
> **Another bold phrase.** Two sentences of explanation.
> **A third bold phrase.** Two sentences of explanation.

When every item in a section follows the exact same template, it reads as generated. Fix: bold some, not others. Let some items run into each other as prose. Vary sentence count.

### Uniform lists
Every bullet following the same grammatical template is a flag. Fix: convert to prose ("First... then... and finally...") or vary the structure so items don't feel like they were produced by a template.

### Same-length paragraphs
Real writing has rhythm. Short punchy paragraphs. Then a longer one that builds an argument. Then another short one that lands it. AI paragraphs all run 3-4 sentences. Mix it up deliberately.

### Section-level predictability
Every section following statement → evidence → elaboration is a tell. Real writing loops back, jumps ahead, makes asides, contradicts itself then corrects.

---

## Punctuation AI Tells

### Em dash (zero tolerance in body copy)
Em dashes (—) are the most reliable AI signal. AI uses 15-20 per article. Real writers use 3-5, max. For this site: **zero in body copy.** Replace with:
- Comma (mid-sentence elaboration)
- Semicolon (two related independent clauses)
- Period (start a new sentence)
- Colon (before a list or direct explanation)
- Parentheses (true aside)

Page titles and section headers use a colon for subtitle separation: "Title: Subtitle."

### Double-hyphen dash ( -- )
AI types ` -- ` as a long-dash substitute. Real writers never do this. Replace the same way as em dashes above. The scanner catches these automatically.

### Colon as a structural crutch
AI constantly uses colons to introduce drama:
> "The bottom line: X."
> "The alternative: Y."
> "The result: Z."

One or two per article is fine. More than that and it becomes a rhythm tell. Rewrite as natural sentences.

### Smart quotes and unicode punctuation
Use straight quotes, ASCII hyphens, and `...` for ellipses. Smart quotes (curly), en dashes, and unicode ellipses are encoding tells that the scanner also catches.

---

## Phrasing AI Tells

### Formulaic transitions
- "Here is where..."
- "The result is..."
- "Then there is..."
- "Worth noting is..."
- "This is where things get interesting..."

These all sound like a tour guide. Real writing transitions don't announce themselves.

### Preachy / dramatic openers
- "The insidious thing about..."
- "This is not optional — it is a prerequisite"
- "A genuine path forward"
- "The reality is stark"
- "Make no mistake"

These read as rhetorical performance, not argument.

### Thesis-statement openers
Starting a section or article with a formal thesis statement ("The billing challenges facing small practices are structural, not cyclical") sounds like an essay, not a column. Real writers open with a scene, a number, a question, or a short declarative.

### Overly formal contractions
AI often writes "it is" and "they are" throughout when a human would write "it's" and "they're." Inconsistency is fine — humans are inconsistent. Uniform formality throughout is a tell.

### Stock phrases (banned)
Never use: "cutting-edge," "leverage" (as a verb), "revolutionize," "game-changing," "robust," "seamlessly," "holistic approach," "mission-critical," "best-in-class" (unless quoting a benchmark), "deep dive," "unpack."

---

## Hyphenation AI Tells

This is subtler but just as real. AI over-hyphenates because it compresses meaning into compound adjectives. Humans reach for noun phrases.

### Stacked compound adjectives
Two or more hyphenated modifiers in a row is always a flag:
- `specialty-specific, size-specific numbers` → `actual numbers from practices your size and specialty`
- `data-driven, outcome-focused approach` → rewrite as a sentence

### Superlative compounds
- `highest-impact` → `biggest`, `most significant`
- `highest-volume` → `busiest`, `most active`
- `lowest-cost` → `cheapest`, `least expensive`
- Exception: `high-volume` is a real clinical term — fine to use sparingly

### The `-specific` suffix
AI uses this to signal precision. Humans just say what they mean:
- `specialty-specific` → `for your specialty`
- `size-specific` → `for practices your size`
- KEEP: `payer-specific` — this is genuine medical billing vocabulary

### Unnecessary compound modifiers
- `-based`, `-driven`, `-focused`, `-level`, `-related` as modifiers often signal AI writing
- `outcome-based` → `focused on outcomes`
- `claim-level` → `per-claim` or `for each claim`
- `billing-related` → `billing`
- One or two per article is fine. A cluster is a flag.

### Approved compound terms — never flag these
`on-premise`, `air-gapped`, `clean-claim`, `third-party`, `multi-agent`, `multi-factor`, `multi-provider`, `pre-submission`, `post-acute`, `non-redundant`, `internet-facing`, `zero-day`, `month-end`, `modifier-intensive`, `payer-specific`, `decision-making`, `write-off`, `real-time`

---

## Structural Checklist

Every blog post must include:

- [ ] At least 2 branded SVG diagrams (plan them during outlining, not after)
- [ ] Descriptive alt text on every image
- [ ] Author attribution matching one of the three founders
- [ ] A closing CTA paragraph linking to `/contact` or `/sovereign-rcm/pilot-program`
- [ ] SEO frontmatter: `title`, `date`, `author`, `category`, `excerpt`, `slug`, `keywords`
- [ ] Category from: `sovereign-rcm`, `ai-insights`, `practice-management`, `company-news`

---

## Pre-Publish Audit Checklist

Run through this before marking any post ready:

**Voice**
- [ ] Read aloud — does it sound like a person, or a report?
- [ ] Does the author's background come through naturally?
- [ ] Are there any preachy or dramatic sentences that could be cut?

**Structure**
- [ ] Do any sections have 3+ consecutive identical-format bullet points? If yes, convert some to prose.
- [ ] Do any sections have 3+ consecutive bold subpoints with the same structure? Break them up.
- [ ] Does paragraph length vary? Are there some short punchy ones?

**Punctuation**
- [ ] Em dash count: zero in body copy. None allowed.
- [ ] Double-hyphen ( -- ): none.
- [ ] Colon-as-drama constructions: more than 3 in the article is too many.
- [ ] Trailing spaces: none (scanner catches these).
- [ ] Smart/curly quotes: none (scanner catches these).

**Hyphenation**
- [ ] Any stacked compound adjectives (`x-specific, y-specific`)? Rewrite.
- [ ] Any `highest-X` or `lowest-X` superlative compounds? Replace with a plain adjective.
- [ ] More than 2 uses of `-specific`, `-focused`, `-driven`, `-based`, `-level` as modifiers? Thin them out.
- [ ] Any new compound terms not on the approved list? Ask: does a simpler word or phrase work?

**Phrasing**
- [ ] Any banned stock phrases (cutting-edge, leverage, revolutionize, etc.)?
- [ ] Any formulaic transitions (Here is where, The result is, etc.)?
- [ ] Any thesis-statement openers?

**Technical**
- [ ] Frontmatter complete and valid?
- [ ] Images in `public/blog/`, referenced correctly in markdown?
- [ ] CTA at the end of the post?
- [ ] `npm run build` passes?
