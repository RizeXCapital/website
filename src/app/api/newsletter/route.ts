import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FOUNDERS = [
  "Faizan.Arif@rizexcapital.com",
  "Ghulam.Shah@rizexcapital.com",
  "Navid.Rahman@rizexcapital.com",
];

const MAX_EMAIL = 254;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripCRLF(str: string): string {
  return str.replace(/[\r\n]/g, "");
}

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

let lastGc = 0;
function gcSubmissions() {
  const now = Date.now();
  if (now - lastGc < 10 * 60 * 1000) return;
  lastGc = now;
  const hour = 60 * 60 * 1000;
  for (const [ip, times] of submissions) {
    const recent = times.filter((t) => now - t < hour);
    if (recent.length === 0) submissions.delete(ip);
    else submissions.set(ip, recent);
  }
}

export async function POST(req: NextRequest) {
  try {
    gcSubmissions();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    const body = await req.json();
    const { email, website_url } = body;

    // Honeypot
    if (website_url) {
      return NextResponse.json({ success: true });
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (String(email).length > MAX_EMAIL) {
      return NextResponse.json(
        { error: "Email exceeds the maximum allowed length." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@\r\n]+@[^\s@\r\n]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const safeEmail = escapeHtml(String(email));
    const replyToEmail = stripCRLF(String(email));

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
      <h2>New Newsletter Signup</h2>
      <p>Someone subscribed to blog updates.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
        </tr>
      </table>
      <br>
      <p style="color: #666; font-size: 12px;">Via rizexcapital.com/blog newsletter signup</p>
    `;

    await transporter.sendMail({
      from: `"Sovereign RCM" <${process.env.SMTP_USER}>`,
      to: FOUNDERS.join(", "),
      replyTo: replyToEmail,
      subject: `Newsletter Signup: ${replyToEmail}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
