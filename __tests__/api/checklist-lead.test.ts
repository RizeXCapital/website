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

import { POST } from "@/app/api/checklist-lead/route";

function makeRequest(
  body: Record<string, unknown>,
  ip = `test-${Math.random()}`
): NextRequest {
  return new NextRequest("http://localhost/api/checklist-lead", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "x-forwarded-for": ip,
      "content-type": "application/json",
    },
  });
}

const validBody = {
  name: "Dr. Jones",
  email: "jones@example.com",
};

beforeAll(() => {
  process.env.SMTP_USER = "test@test.com";
  process.env.SMTP_PASS = "test-pass";
});

beforeEach(() => {
  mockSendMail.mockClear();
});

describe("POST /api/checklist-lead", () => {
  // Test 1: Happy path
  it("sends checklist lead email and returns success", async () => {
    const res = await POST(makeRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledOnce();

    const call = mockSendMail.mock.calls[0][0];
    expect(call.subject).toContain("Checklist Lead");
    expect(call.replyTo).toBe("jones@example.com");
  });

  // Test 2: Missing required fields
  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Name and email are required.");
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  // Test 3: Invalid email
  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "bad" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Please provide a valid email address.");
  });

  // Test 4: Honeypot
  it("returns fake success without sending email when honeypot is filled", async () => {
    const res = await POST(
      makeRequest({ ...validBody, company_url: "http://spam.com" })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  // Test 6: SMTP failure
  it("returns 500 when sendMail throws", async () => {
    mockSendMail.mockRejectedValueOnce(new Error("SMTP down"));

    const res = await POST(makeRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Failed to process request. Please try again.");
  });
});

// Test 5: Rate limiting (isolated module)
describe("POST /api/checklist-lead - rate limiting", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns 429 on 6th request from same IP", async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "test" });
    vi.doMock("nodemailer", () => ({
      default: {
        createTransport: vi.fn(() => ({ sendMail })),
      },
    }));
    const { POST: handler } = await import("@/app/api/checklist-lead/route");

    const ip = "checklist-rate-limit-ip";

    for (let i = 0; i < 5; i++) {
      const res = await handler(makeRequest(validBody, ip));
      expect(res.status).toBe(200);
    }

    const res = await handler(makeRequest(validBody, ip));
    expect(res.status).toBe(429);

    const json = await res.json();
    expect(json.error).toContain("Too many submissions");
    expect(res.headers.get("Retry-After")).toBe("3600");
  });
});
