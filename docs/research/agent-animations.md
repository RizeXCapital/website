# Agent Animation Research

Compiled 2026-03-14. Full research on creative, modern, and playful ways to animate AI agents on the Sovereign RCM website.

## 1. Agent Entrance Animations

### A. Boot Sequence (Recommended for How It Works)
Each agent card starts as a dark terminal box with a blinking cursor. Scrolls into view, typewriter types the agent name, status line appears ("Initializing Chart Reader..."), progress bar fills, card transforms into full form. Agents boot in sequence. Ties into on-premise appliance narrative.

**Feasibility**: High. Framer Motion `whileInView`, `AnimatePresence` for state swap, `staggerChildren` for timing. Typewriter via `react-type-animation` or simple interval.

### B. Reporting-for-Duty Roll Call
Agents slide in from left one at a time, stop with overshoot and bounce-back (spring physics). Status badge appears: "ONLINE" with green pulse. Denial Analyst arrives last, faster and more aggressive.

**Feasibility**: High. Spring transitions with per-agent `stiffness` and `damping`.

### C. Assembly Line Snap-Together
Agent cards start scattered, partially transparent. On scroll, fly into pipeline positions and snap together like puzzle pieces. Connecting lines draw between them after assembly.

**Feasibility**: Medium. Layout animations for repositioning. Scattered positions with random offsets.

### D. Conveyor Belt
Horizontal conveyor shows a document entering from left. At each agent's station, that agent pops up, processes the document (glow effect), document continues rightward.

**Feasibility**: Medium. `useScroll` + `useTransform` for scroll-linked horizontal movement.

### E. Teleport / Beam-In
Vertical light beam appears, expands into rectangle, fills with agent content, light fades. Different beam tints per agent within brand palette.

**Feasibility**: Medium. `clipPath` animations in Framer Motion.

---

## 2. Per-Agent Personality Through Motion

### Chart Reader: Methodical and Steady
- Entrance: Smooth, deliberate slide-in. No bounce. `{ stiffness: 100, damping: 20 }` (critically damped)
- Idle: Slow scanning line animation top-to-bottom, as if reading a document
- Character: The careful one. Slowest animations in the pipeline

### Procedure Specialist: Precise and Confident
- Entrance: Snaps into position quickly. `{ stiffness: 300, damping: 25 }` (fast, minimal wobble)
- Idle: SVG checkmark draws itself via `pathLength`. Periodic "stamp" micro-animation
- Character: Knows what it's doing. Fast, accurate, final

### Payer Logic Bot: Mechanical and Systematic
- Entrance: Two distinct moves (horizontal then vertical) with pause between, like a robot
- Idle: Rotating gears or pulsing connection dots. Periodic loading bars fill and reset
- Character: The rules engine. Moves like a machine

### Denial Analyst: Sharp and Aggressive
- Entrance: Fastest of all four. `{ stiffness: 500, damping: 15 }` (high velocity, aggressive bounce)
- Idle: Radar-sweep animation. Random red border flash, as if it just caught something
- Character: The guard dog. Arrives fast, stays alert, constant vigilance

**Feasibility**: All high. Native Framer Motion spring physics. Each agent gets its own variant object.

---

## 3. Modern Web Animation Trends (2025-2026)

- **Scroll-driven storytelling**: Pipeline becomes a scroll narrative (Apple/Stripe style). Framer Motion `useScroll` + `useTransform`.
- **Staggered directional card reveals**: Left column from left, right column from right. Builds on existing `StaggerContainer`.
- **Kinetic typography**: Headlines animate word-by-word. "Clean Claims" arrives last with coral color shift.
- **Micro-interaction feedback loops**: Agent cards respond to hover with "working" animation. Pipeline connections pulse on hover.
- **Morphing transitions**: Document icon morphs into code block, into claim form, into checkmark. SVG path morphing via Framer Motion + Flubber.js.
- **Parallax depth layers**: "Data layer" (flowing dots) behind agent cards moves slower on scroll.

---

## 4. Playful Touches (Professional)

### Hover Reactions (200-300ms each)
- Chart Reader: magnifying glass enlargement effect
- Procedure Specialist: tiny checkmark appears and disappears
- Payer Logic Bot: small gear icons rotate around card border
- Denial Analyst: shield icon briefly flashes

### Pipeline Running Loading State
Triggered by "Watch it work" button. All agents show activity simultaneously for 2-3 seconds, then "CLAIM READY" badge appears with scale-up and checkmark draw.

### Data Packet Hand-Off
Small glowing dot travels along connecting line from one agent to the next. Next agent activates when packet arrives.

### Idle Easter Egg (30+ seconds without scroll)
- Chart Reader scanning line slows down (waiting)
- Procedure Specialist checkmark taps impatiently
- Denial Analyst radar speeds up briefly (restless)

### 404 Page
Denial Analyst appears: "This claim has been denied" or "Page not found. The Denial Analyst flagged this one before you got here."

### Cursor-Following Agent Eyes
Small icon "eyes" (two dots) subtly track cursor position. `useMotionValue` + mouse position transform.

---

## 5. Reference Examples

- **Linear.app**: Scroll-driven product demos. Animations teach, don't decorate.
- **Stripe.com**: Code blocks type themselves, API responses populate in real-time.
- **Vercel.com**: Build pipeline with step-by-step progress, status indicators, connecting lines.
- **Slack**: Defined motion vocabulary. Playful, not silly. Spring physics for personality.
- **n8n.io / Make.com**: Workflow canvas with visible data flow between nodes.

---

## 6. Recommended Build Order

1. Per-agent spring personalities (1-3 hours, highest impact-to-effort)
2. Boot sequence entrance (4-6 hours)
3. Agent hover reactions (1-2 hours)
4. Data packet hand-off along pipeline (3-4 hours)
5. Scroll-driven pipeline storytelling (4-8 hours)
6. Evidence Trail live generation (Stripe-inspired, 3-4 hours)
7. Idle state easter eggs (1-2 hours)

All buildable with Framer Motion. No external animation libraries needed except optionally `react-type-animation` (3KB) for typewriter and `Flubber.js` (8KB) for SVG morphing.
