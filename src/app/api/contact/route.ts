import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { CONTACT_EMAIL } from '@/lib/config';

// Rate limiting: track recent submissions by IP (in-memory, resets on serverless cold start)
const submissions = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, type, subject, message } = body;

    // Basic validation
    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Subject and message are required.' },
        { status: 400 }
      );
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message is too short.' },
        { status: 400 }
      );
    }

    // Honeypot / simple rate limit (1 submission per IP per 60s)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const lastSubmit = submissions.get(ip) || 0;
    if (Date.now() - lastSubmit < 60_000) {
      return NextResponse.json(
        { error: 'Please wait before sending another message.' },
        { status: 429 }
      );
    }
    submissions.set(ip, Date.now());

    // Check credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Contact form: GMAIL_USER or GMAIL_APP_PASSWORD not set');
      return NextResponse.json(
        { error: 'Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const typeLabels: Record<string, string> = {
      general: 'General Inquiry',
      bug: 'Bug Report',
      content: 'Content Error',
      suggestion: 'Suggestion',
      feature: 'Feature Request',
    };
    const typeLabel = typeLabels[type] || type || 'General';
    const senderInfo = name ? `${name}${email ? ` <${email}>` : ''}` : email || 'Anonymous';

    await transporter.sendMail({
      from: `"OpenSacred Contact Form" <${process.env.GMAIL_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email || undefined,
      subject: `[OpenSacred] ${typeLabel}: ${subject}`,
      text: [
        `Type: ${typeLabel}`,
        `From: ${senderInfo}`,
        `Subject: ${subject}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#b08439;border-bottom:2px solid #b08439;padding-bottom:8px">
            OpenSacred — New Message
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr>
              <td style="padding:6px 12px;background:#f9f5ec;font-weight:bold;width:100px">Type</td>
              <td style="padding:6px 12px;background:#f9f5ec">${typeLabel}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-weight:bold">From</td>
              <td style="padding:6px 12px">${senderInfo}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;background:#f9f5ec;font-weight:bold">Subject</td>
              <td style="padding:6px 12px;background:#f9f5ec">${subject}</td>
            </tr>
          </table>
          <div style="background:#fafafa;border-left:4px solid #b08439;padding:16px;border-radius:4px">
            <p style="margin:0;white-space:pre-wrap;font-size:15px;color:#333">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
          </div>
          ${email ? `<p style="margin-top:16px;color:#888;font-size:12px">Reply-To: ${email}</p>` : ''}
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
