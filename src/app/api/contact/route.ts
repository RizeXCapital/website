import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const FOUNDERS = [
  "Faizan.Arif@rizexcapital.com",
  "Ghulam.Shah@rizexcapital.com",
  "Navid.Rahman@rizexcapital.com",
];

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

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

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
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${phone ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ""}
        ${practice ? `<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Practice</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${practice}</td></tr>` : ""}
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${message}</td>
        </tr>
      </table>
      <br>
      <p style="color: #666; font-size: 12px;">Sent from rizexcapital.com contact form</p>
    `;

    await transporter.sendMail({
      from: `"RizeX Capital" <${process.env.SMTP_USER}>`,
      to: FOUNDERS.join(", "),
      replyTo: email,
      subject: `Contact Form: ${name}${practice ? ` — ${practice}` : ""}`,
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
