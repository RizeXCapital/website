# Testing Design Spec

## Overview

Add a unit testing framework to the RizeX Capital website to protect the lead capture pipeline and blog system. Uses Vitest for unit tests. Playwright E2E deferred to CI (ARM64 local environment incompatibility).

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Unit framework | Vitest | Native ESM support, works with remark/rehype/gray-matter ESM packages, same API as Jest |
| E2E framework | Playwright (CI only) | ARM64 Linux (NVIDIA Spark) may not run Chromium reliably; defer to GitHub Actions x86_64 |
| Nodemailer mocking | Mock `createTransport` | Tests validate input handling/security; real SMTP requires Office 365 creds |
| Test location | `__tests__/` at project root | Avoids Next.js interpreting test files as routes |
| Component tests | Not included | Low value for content site; blog lib and API routes are the critical paths |

## Stack

- `vitest` — test runner
- No additional test dependencies required; nodemailer mocked via `vi.mock()`

## File Structure

```
__tests__/
├── api/
│   ├── contact.test.ts
│   └── checklist-lead.test.ts
└── lib/
    └── blog.test.ts
vitest.config.ts
```

## npm Scripts

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

## Test Cases

### API: Contact Form (`__tests__/api/contact.test.ts`)

Tests the POST handler in `src/app/api/contact/route.ts`.

**Mocking strategy:** Mock `nodemailer.createTransport` to return `{ sendMail: vi.fn() }`. Build `NextRequest` objects from a helper:

```ts
function makeRequest(body: Record<string, unknown>, ip = '127.0.0.1') {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'x-forwarded-for': ip, 'content-type': 'application/json' },
  })
}
```

**Environment setup:** Set `process.env.SMTP_USER = 'test@test.com'` and `process.env.SMTP_PASS = 'test'` in `beforeAll` so the `from` field in `sendMail` resolves to a real value instead of `undefined`.

| # | Test | Input | Expected |
|---|------|-------|----------|
| 1 | Happy path | Valid name, email, message | `sendMail` called with correct to/from/replyTo/subject/html, returns `{ success: true }` |
| 2 | Missing required fields | Empty body | 400, "Name, email, and message are required" |
| 3 | Invalid email format | `email: "not-an-email"` | 400, "Please provide a valid email address" |
| 4 | Field length exceeded | name > 50 chars | 400, "exceed the maximum allowed length" |
| 5 | Honeypot triggered | `company_url: "http://spam.com"` | Returns `{ success: true }` without calling `sendMail` |
| 6 | Rate limiting | 6 requests from same IP | 5th succeeds, 6th returns 429 with `Retry-After: 3600` |
| 7 | CRLF injection prevention | `email: "test@x.com\r\nBcc: evil@x.com"` | `replyTo` in `sendMail` call has no `\r\n` |
| 8 | HTML escaping (XSS) | `message: "<script>alert('xss')</script>"` | Email body contains `&lt;script&gt;`, not raw tags |
| 9 | SMTP failure | `sendMail` rejects | 500, "Failed to send message" |
| 10 | Optional fields omitted | No phone or practice | Succeeds, email body omits those rows |
| 11 | Malformed JSON body | Invalid JSON string | 500 (caught by outer try/catch) |
| 12 | Honeypot does not bypass rate limiter | 6 requests with `company_url` filled | 6th returns 429 (rate limit checked before honeypot) |

**Rate limiter isolation:** The `submissions` Map and `lastGc` are unexported module-level state. Use `vi.resetModules()` + dynamic `import()` to get a fresh module instance for rate-limiting tests. The nodemailer mock must be set up before each fresh import:

```ts
// For rate limit tests specifically:
beforeEach(() => {
  vi.resetModules()
})

it('returns 429 on 6th request', async () => {
  vi.doMock('nodemailer', () => ({ default: { createTransport: () => ({ sendMail: vi.fn() }) } }))
  const { POST } = await import('@/app/api/contact/route')
  // send 6 requests...
})
```

For non-rate-limit tests, a single module import with a fresh `sendMail` spy per test is sufficient since they don't interact with the rate limiter state (each uses a unique IP or the honeypot bypasses it).

### API: Checklist Lead (`__tests__/api/checklist-lead.test.ts`)

Tests the POST handler in `src/app/api/checklist-lead/route.ts`.

Same mocking strategy as contact form, including rate limiter isolation via `vi.resetModules()` for rate limit tests.

| # | Test | Input | Expected |
|---|------|-------|----------|
| 1 | Happy path | Valid name, email | `sendMail` called with "Checklist Lead" subject, returns `{ success: true }` |
| 2 | Missing required fields | No name | 400, "Name and email are required" |
| 3 | Invalid email | `email: "bad"` | 400, "Please provide a valid email address" |
| 4 | Honeypot | `company_url` filled | Fake success, `sendMail` not called |
| 5 | Rate limiting | 6 requests from same IP | 429 on 6th |
| 6 | SMTP failure | `sendMail` rejects | 500, "Failed to process request" |

### Lib: Blog (`__tests__/lib/blog.test.ts`)

Tests functions in `src/lib/blog.ts`. Uses the real markdown files in `content/blog/` (3 posts exist).

| # | Test | Function | Expected |
|---|------|----------|----------|
| 1 | Returns all posts sorted by date desc | `getAllPosts()` | Array length 3, first post is most recent |
| 2 | Each post has required fields | `getAllPosts()` | Every post has slug, title, date, author, category, excerpt, readingTime |
| 3 | Returns undefined for missing slug | `getPostBySlug("nonexistent")` | `undefined` |
| 4 | Returns post with HTML content | `getPostBySlug(<real-slug>)` | Post object with `content` string containing HTML |
| 5 | Filters by category | `getPostsByCategory("sovereign-rcm")` | Only posts with that category |
| 6 | Respects count parameter | `getRecentPosts(1)` | Array length 1 |
| 7 | Related posts fills from other categories | `getRelatedPosts(slug, category, 5)` | Returns 2 posts (3 total minus current; requests 5 but only 2 available), includes posts from other categories |
| 8 | Reading time is positive integer | `getAllPosts()` | Every post has `readingTime >= 1` |

## Vitest Configuration

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

**Key points:**
- `environment: 'node'` — API routes and blog lib are server-side code
- Path alias `@/` matches the project's `tsconfig.json` paths
- `globals: true` — `describe`, `it`, `expect` available without imports

## What Is NOT In Scope

- Component rendering tests (low ROI for content site)
- Visual regression testing
- Blog content quality tests (handled by existing `audit:ai` scripts)
- Playwright E2E (deferred to CI environment)
- Coverage thresholds (can be added later once baseline is established)

## Future Additions

- Playwright E2E in GitHub Actions for contact form submission flow
- Coverage thresholds once baseline is measured
- Component tests if interactive components are added
