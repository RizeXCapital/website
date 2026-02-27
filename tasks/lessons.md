# RizeX Capital — Lessons Learned

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
