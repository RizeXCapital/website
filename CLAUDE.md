# RizeX Capital — Claude Code Rules

> "Where Alignment Becomes Power"

This file governs how Claude Code operates within the RizeX Capital project. Every decision, every line of code, every task should reflect our founding principles: alignment before action, discipline before expansion, integrity in every commit.

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- Alignment before action: confirm direction before writing code

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project context
- Discipline before expansion: get the foundation right before moving on

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness
- Integrity is non-negotiable — in every decision, in every commit

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it
- Strategy before speed: measured growth outperforms reactive movement

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Git & Version Control

- **Small incremental commits**: Each commit should represent one logical change (e.g., "Add founder photos", "Update hero copy", "Fix mobile nav")
- **Never bundle unrelated changes**: If you edited the homepage and the contact page for different reasons, those are two commits
- **Commit before pushing**: Accumulate small, well-described commits locally, then push as a batch
- **No commits without user approval**: Always ask before committing. Never auto-commit
- **No co-author lines**: Keep commit messages clean — no attribution tags
- **Commit message format**: Imperative mood, concise subject line, optional body for context
- **Always run `npm run build`** before committing to verify no errors

---

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Alignment Before Action**: Every partnership begins with shared values. Confirm direction before building.
- **Discipline Over Speed**: We scale what is structured, not reactive. Build it right the first time.
- **Build for Decades**: We build for the long term — systems that outlive any single project.
- **Integrity Non-Negotiable**: Integrity is non-negotiable — in every decision, in every line of code.

---

## Brand & Design System

### Colors
- **Navy** (primary): `#1A1A1A` — backgrounds, headlines, nav (near-black)
- **Coral** (CTA + accent): `#C8102E` — all CTA buttons, links, highlights (crimson red); hover: `#A80D26`
- **Steel** (secondary accent): `#607D8B` — dividers, subtle borders, section accents; light: `#78909C`, dark: `#455A64`
- **Ice** (surface): `#F7F7F8` — page backgrounds, card surfaces
- **Charcoal** (body text): `#3A3A3A` — paragraphs; light variant: `#5A5A5A`
- **Teal** (now gray): `#C9C9C9` — decorative only, used as a light gray tone (NOT a blue-teal)

### Typography
- **Headlines**: Space Grotesk (Bold) — self-hosted via `next/font`
- **Body**: Inter (Regular + Medium) — self-hosted via `next/font`
- **Code/Technical**: JetBrains Mono — self-hosted via `next/font`

### Layout Rules
- Max content width: 1200px (`max-w-7xl`), centered
- Section padding: `py-16` desktop, `py-10` mobile
- Section spacing: consistent 64px between sections
- Cards: white bg, subtle shadow (`shadow-sm`), `rounded-xl`, `p-6`
- CTA buttons: `bg-coral text-white rounded-lg px-8 py-4 font-semibold`
- Mobile: single column, larger touch targets, sticky CTA footer bar
- Images: always use `next/image` with descriptive alt text
- Tailwind utility classes only — no separate CSS files

### CTA Strategy (LOCKED)
- **Primary CTA**: Contact form — never a calendar/scheduling link
- **General pages**: "Get in Touch"
- **Sovereign RCM pages**: "Request a Billing Analysis"
- **Contact form fields**: Name (req), Email (req), Phone (opt), Practice Name (opt), Message (req)
- **Submission**: Email notification to all 3 founders simultaneously
- **Thank You page**: Confirms submission, shows 2-3 related blog posts
- **Placement**: Hero section + bottom of every page + sticky mobile footer
- **Future**: Calendly may be added alongside (not replacing) the form later

### Pricing Display (LOCKED)
- **Never show actual dollar amounts** on the website
- Pricing page shows SR-1 / SR-2 / SR-3 feature comparison and provider counts
- Each tier card has a "Contact for Pricing" button → routes to contact form
- Bottom CTA: "Request a Custom Quote"

---

## Site Architecture

### Navigation Structure
```
Logo (home link)
├── Sovereign RCM (dropdown)
│   ├── Overview
│   ├── How It Works
│   ├── Pricing
│   ├── Security
│   ├── Pilot Program
│   └── FAQ
├── About
├── Blog
├── Contact (coral button)
```

### Component Library
Reusable components in `src/components/`:
```
<Navigation />      → Nav with logo, links, mobile hamburger, coral Contact button
<Footer />          → Links, copyright, founders, contact info
<ComingSoon />      → Stub page template for pages not yet built
<Hero />            → Full-width, headline, subhead, CTA button
<ContactForm />     → Standard form with validation
<ServiceCard />     → Icon, title, description, link arrow
<ComparisonTable /> → Feature comparison grid
<FounderBio />      → Photo, name, role, credentials, narrative
<PillarCard />      → Number, title, description
<BlogPreview />     → Title, date, excerpt, read-more link
<CTASection />      → Coral background, headline, embedded ContactForm
<BreadcrumbNav />   → Auto-generated from URL path
<TestimonialCard /> → Quote, attribution, practice info
<PackageTier />     → Tier name, provider count, features, "Contact for Pricing" button
```

---

## Product Knowledge — Sovereign RCM

### The Problem (Triple Leak)
1. **Cost leak**: Outsourced billing charges ~5% of collections (MGMA benchmark)
2. **Revenue leak**: Physician undercoding costs $30K+/year per provider (AAFP)
3. **Security leak**: Cloud billing = PHI exposure risk (Change Healthcare attack hit 50% of U.S. claims)

### The Solution
On-premise, air-gapped AI appliance. PHI never leaves the building.
Multi-agent pipeline: Chart Reader → Procedure Specialist → Payer Logic Bot → Denial Analyst.
Drafts compliant 837P claims from clinical notes.

### Packages
- **SR-1**: 1-3 providers (solo/small practices)
- **SR-2**: 4-10 providers (group practices)
- **SR-3**: 11-25 providers (multi-specialty groups)
- Payment structure: 50% deposit, 40% installation, 10% acceptance

### Beachhead Specialties
1. Emergency Medicine (Faizan's domain authority)
2. Orthopedics (procedure-heavy, modifier-intensive)
3. Cardiology (complex E/M + procedures)
4. Pain Management (high documentation burden)
5. Dermatology (high volume, undercoding risk)
6. Multi-specialty groups (SR-2/SR-3 fit)
- **DENTAL EXCLUDED** — uses CDT codes + 837D (different system)

### Competitive Positioning
- vs. outsourced billing: Fixed CapEx, no % of collections, PHI stays on-premise
- vs. cloud SaaS: Air-gapped, no subscription, owned not rented, offline inference
- Category of one: No Princeton AI company targets small medical practices

### 90-Day Pilot
- Shadow mode alongside existing billing
- Proves: clean-claim rate, denial rate delta, days-in-A/R, undercoding recapture
- Exit criteria: ≥95% clean-claim rate, ≥30% coder touch time reduction

---

## Content Rules

- Blog posts are Markdown files in `/content/blog/` with YAML frontmatter
- Required frontmatter: title, date, author, category, excerpt, slug, keywords
- Categories: sovereign-rcm, ai-insights, practice-management, company-news
- Homepage auto-pulls 3 most recent posts
- Blog listing page has category filter
- RSS feed auto-generated
- Every blog post ends with a CTA linking to contact or pilot program

---

## Hard Rules (NEVER violate)

- Never use `localStorage` or `sessionStorage`
- Never show actual prices ($29.5K, $69K, $149K) on the website
- Never use Google Fonts CDN — fonts are self-hosted via `next/font`
- Never create separate CSS files — Tailwind utility classes only
- Never add a scheduling/calendar widget unless explicitly told to
- Never use stock phrases: "cutting-edge", "leverage", "revolutionize", "game-changing"
- Never hardcode content that should come from a data file or component prop
- Never build a page without SEO metadata (title, description, OG tags, canonical)
- Never skip mobile responsiveness testing
- Never commit without running `npm run build` to verify no errors

---

## Project Context

- **Company**: RizeX Capital — disciplined collective, hub-and-spoke model
- **Flagship Product**: Sovereign RCM (ClinicBlackBox) — on-premise AI billing appliance
- **Tech Stack**: Next.js (React) + Tailwind CSS + Vercel + Claude Code
- **Domain**: rizexcapital.com
- **Blog**: Markdown files in `/content/blog/` — hybrid system, CMS later
- **Reference**: See `RizeX_Strategy_v1.1_Final.pdf` for all confirmed decisions
