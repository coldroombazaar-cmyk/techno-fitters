/**
 * Send lead notification email via Gmail SMTP.
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('EMAIL_USER or EMAIL_PASS not set. Emails will not be sent.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  return transporter;
}

const SUBJECT_MAP: Record<string, string> = {
  quote: 'New Get Quote Lead',
  consultation: 'New Consultation Request',
  consultant: 'New Consultant Inquiry',
};

export interface LeadEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  leadType: string;
}

function buildHtmlEmail(data: LeadEmailData): string {
  const subject = SUBJECT_MAP[data.leadType] ?? 'New Lead';
  const date = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
  h2 { color: #0F7C3E; margin-bottom: 20px; }
  .field { margin-bottom: 12px; }
  .label { font-weight: 600; color: #555; }
  .value { margin-top: 4px; padding: 8px; background: #f5f5f5; border-radius: 6px; }
  hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
</style></head>
<body>
  <h2>${escapeHtml(subject)}</h2>
  <div class="field"><span class="label">Lead Type:</span><div class="value">${escapeHtml(data.leadType)}</div></div>
  <div class="field"><span class="label">Name:</span><div class="value">${escapeHtml(data.name)}</div></div>
  <div class="field"><span class="label">Email:</span><div class="value">${escapeHtml(data.email)}</div></div>
  <div class="field"><span class="label">Phone:</span><div class="value">${escapeHtml(data.phone)}</div></div>
  <div class="field"><span class="label">Message:</span><div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div></div>
  <hr>
  <p class="field"><span class="label">Submitted:</span> ${escapeHtml(date)}</p>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

export async function sendLeadEmail(data: LeadEmailData): Promise<{ success: boolean; error?: string }> {
  const transport = getTransporter();
  if (!transport) {
    return { success: false, error: 'Email service not configured' };
  }

  const subject = SUBJECT_MAP[data.leadType] ?? 'New Lead';
  const to = 'coldroombazaar@gmail.com';
  const from = process.env.EMAIL_USER ?? to;

  try {
    await transport.sendMail({
      from: `TechnoFitters Lead <${from}>`,
      to,
      subject,
      html: buildHtmlEmail(data),
      replyTo: data.email,
    });
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Lead email send error:', msg);
    return { success: false, error: 'Email service temporarily unavailable' };
  }
}
