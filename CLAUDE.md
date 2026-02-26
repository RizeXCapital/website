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

## Project Context

- **Company**: RizeX Capital — disciplined collective, hub-and-spoke model
- **Flagship Product**: Sovereign RCM (ClinicBlackBox) — on-premise AI billing appliance
- **Tech Stack**: Next.js (React) + Tailwind CSS + Vercel + Claude Code
- **Domain**: rizexcapital.com
- **Blog**: Markdown files in `/content/blog/` — hybrid system, CMS later
- **Reference**: See `RizeX_Strategy_v1.1_Final.pdf` for all confirmed decisions
