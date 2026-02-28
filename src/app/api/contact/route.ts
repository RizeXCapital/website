import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FOUNDERS = [
  "Faizan.Arif@rizexcapital.com",
  "Ghulam.Shah@rizexcapital.com",
  "Navid.Rahman@rizexcapital.com",
];

// Input length limits
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_PRACTICE = 200;
const MAX_MESSAGE = 5000;

// Escape HTML special characters to prevent XSS in email body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip CRLF to prevent email header injection
function stripCRLF(str: string): string {
  return str.replace(/[\r\n]/g, "");
}

// Simple in-memory rate limiter: max 5 submissions per IP per hour
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  const recent = (submissions.get(ip) || []).filter((t) => now - t < hour);
  if (recent.length >= 5) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, practice, message, company_url } = body;

    // Honeypot check
    if (company_url) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Enforce input length limits
    if (
      String(name).length > MAX_NAME ||
      String(email).length > MAX_EMAIL ||
      (phone && String(phone).length > MAX_PHONE) ||
      (practice && String(practice).length > MAX_PRACTICE) ||
      String(message).length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum allowed length." },
        { status: 400 }
      );
    }

    // Email format validation — reject CRLF to prevent header injection
    const emailRegex = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize all inputs for HTML email body
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safePhone = phone ? escapeHtml(String(phone)) : "";
    const safePractice = practice ? escapeHtml(String(practice)) : "";
    const safeMessage = escapeHtml(String(message));

    // Sanitize values used in email headers (strip CRLF)
    const replyToEmail = stripCRLF(String(email));
    const subjectName = stripCRLF(String(name));
    const subjectPractice = practice ? stripCRLF(String(practice)) : "";

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
        </tr>
        ${safePhone ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safePhone}</td></tr>` : ""}
        ${safePractice ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Practice</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safePractice}</td></tr>` : ""}
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeMessage}</td>
        </tr>
      </table>
      <br>
      <p style="color: #666; font-size: 12px;">Sent from rizexcapital.com contact form</p>
    `;

    await transporter.sendMail({
      from: `"Sovereign RCM" <${process.env.SMTP_USER}>`,
      to: FOUNDERS.join(", "),
      replyTo: replyToEmail,
      subject: `Contact Form: ${subjectName}${subjectPractice ? ` — ${subjectPractice}` : ""}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
