import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FOUNDERS = [
  "Faizan.Arif@rizexcapital.com",
  "Ghulam.Shah@rizexcapital.com",
  "Navid.Rahman@rizexcapital.com",
];

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PRACTICE = 200;

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
    const { name, email, practice, company_url } = body;

    // Honeypot
    if (company_url) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (
      String(name).length > MAX_NAME ||
      String(email).length > MAX_EMAIL ||
      (practice && String(practice).length > MAX_PRACTICE)
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum allowed length." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safePractice = practice ? escapeHtml(String(practice)) : "";
    const replyToEmail = stripCRLF(String(email));
    const subjectName = stripCRLF(String(name));

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
      <h2>New Checklist Lead</h2>
      <p>Someone downloaded the Medical Practice Billing Audit Checklist.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
        </tr>
        ${safePractice ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Practice</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${safePractice}</td></tr>` : ""}
      </table>
      <br>
      <p style="color: #666; font-size: 12px;">Via rizexcapital.com/sovereign-rcm/billing-audit-checklist</p>
    `;

    await transporter.sendMail({
      from: `"Sovereign RCM" <${process.env.SMTP_USER}>`,
      to: FOUNDERS.join(", "),
      replyTo: replyToEmail,
      subject: `Checklist Lead: ${subjectName}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checklist lead error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
