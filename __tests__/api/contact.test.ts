import { NextRequest } from "next/server";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";

// Mock nodemailer before importing the route
const mockSendMail = vi.fn().mockResolvedValue({ messageId: "test-id" });
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockSendMail,
    })),
  },
}));

import { POST } from "@/app/api/contact/route";

// Helper: build a NextRequest with JSON body and optional IP
function makeRequest(
  body: Record<string, unknown> | string,
  ip = `test-${Math.random()}` // unique IP per call to avoid rate limiter
): NextRequest {
  const isString = typeof body === "string";
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: isString ? body : JSON.stringify(body),
    headers: {
      "x-forwarded-for": ip,
      "content-type": "application/json",
    },
  });
}

const validBody = {
  name: "Dr. Smith",
  email: "smith@example.com",
  message: "I need billing help",
};

beforeAll(() => {
  process.env.SMTP_USER = "test@test.com";
  process.env.SMTP_PASS = "test-pass";
});

beforeEach(() => {
  mockSendMail.mockClear();
});

describe("POST /api/contact", () => {
  // Test 1: Happy path
  it("sends email and returns success for valid submission", async () => {
    const res = await POST(makeRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledOnce();

    const call = mockSendMail.mock.calls[0][0];
    expect(call.to).toContain("Faizan.Arif@rizexcapital.com");
    expect(call.replyTo).toBe("smith@example.com");
    expect(call.subject).toContain("Dr. Smith");
    expect(call.from).toContain("test@test.com");
  });

  // Test 2: Missing required fields
  it("returns 400 when required fields are missing", async () => {
    const res = await POST(makeRequest({}));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Name, email, and message are required.");
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  // Test 3: Invalid email format
  it("returns 400 for invalid email format", async () => {
    const res = await POST(
      makeRequest({ ...validBody, email: "not-an-email" })
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Please provide a valid email address.");
  });

  // Test 4: Field length exceeded
  it("returns 400 when field exceeds max length", async () => {
    const res = await POST(
      makeRequest({ ...validBody, name: "A".repeat(51) })
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toContain("exceed the maximum allowed length");
  });

  // Test 5: Honeypot triggered
  it("returns fake success without sending email when honeypot is filled", async () => {
    const res = await POST(
      makeRequest({ ...validBody, company_url: "http://spam.com" })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  // Test 10: Optional fields omitted
  it("succeeds when phone and practice are omitted", async () => {
    const res = await POST(makeRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    const html = mockSendMail.mock.calls[0][0].html as string;
    expect(html).not.toContain("Phone");
    expect(html).not.toContain("Practice");
  });

  // Test 11: Malformed JSON body
  it("returns 500 for malformed JSON body", async () => {
    const res = await POST(makeRequest("not valid json {{{"));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toContain("Failed to send message");
  });

  // Test 7: CRLF injection prevention
  // Note: spec targets email field, but the email regex rejects CRLF with a 400 before
  // stripCRLF runs. Testing name field instead — this is the real attack vector since
  // name flows into the Subject header via stripCRLF(String(name)).
  it("strips CRLF from name used in email subject header", async () => {
    const res = await POST(
      makeRequest({
        ...validBody,
        email: "legit@example.com",
        name: "Evil\r\nBcc: hacker@evil.com",
      })
    );

    expect(res.status).toBe(200);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).not.toMatch(/[\r\n]/);
    expect(call.replyTo).not.toMatch(/[\r\n]/);
  });

  // Test 8: HTML escaping (XSS)
  it("escapes HTML in message body to prevent XSS", async () => {
    const res = await POST(
      makeRequest({
        ...validBody,
        message: '<script>alert("xss")</script>',
      })
    );

    expect(res.status).toBe(200);
    const html = mockSendMail.mock.calls[0][0].html as string;
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  // Test 9: SMTP failure
  it("returns 500 when sendMail throws", async () => {
    mockSendMail.mockRejectedValueOnce(new Error("SMTP connection failed"));

    const res = await POST(makeRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Failed to send message. Please try again.");
  });
});

describe("POST /api/contact - rate limiting", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  // Test 6: Rate limiting
  it("returns 429 on 6th request from same IP", async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "test" });
    vi.doMock("nodemailer", () => ({
      default: {
        createTransport: vi.fn(() => ({ sendMail })),
      },
    }));
    const { POST: handler } = await import("@/app/api/contact/route");

    const ip = "rate-limit-test-ip";
    const body = {
      name: "Test",
      email: "test@example.com",
      message: "Hello",
    };

    // First 5 should succeed
    for (let i = 0; i < 5; i++) {
      const res = await handler(makeRequest(body, ip));
      expect(res.status).toBe(200);
    }

    // 6th should be rate limited
    const res = await handler(makeRequest(body, ip));
    expect(res.status).toBe(429);

    const json = await res.json();
    expect(json.error).toContain("Too many submissions");
    expect(res.headers.get("Retry-After")).toBe("3600");
  });

  // Test 12: Honeypot does not bypass rate limiter
  it("honeypot requests still count toward rate limit", async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "test" });
    vi.doMock("nodemailer", () => ({
      default: {
        createTransport: vi.fn(() => ({ sendMail })),
      },
    }));
    const { POST: handler } = await import("@/app/api/contact/route");

    const ip = "honeypot-rate-test-ip";
    const body = {
      name: "Bot",
      email: "bot@spam.com",
      message: "spam",
      company_url: "http://spam.com",
    };

    // Send 5 honeypot requests (all should return fake success)
    for (let i = 0; i < 5; i++) {
      const res = await handler(makeRequest(body, ip));
      expect(res.status).toBe(200);
    }

    // 6th should be rate limited even though honeypot is filled
    const res = await handler(makeRequest(body, ip));
    expect(res.status).toBe(429);
  });
});
