import { NextRequest, NextResponse } from 'next/server';
import { validateLead } from '@/lib/leadValidation';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendLeadEmail } from '@/lib/sendLeadEmail';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limit: 5 per 15 min per IP
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many submissions. Please try again in 15 minutes.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }

  const validation = validateLead(body);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, message: validation.errors[0] ?? 'All fields are required' },
      { status: 400 }
    );
  }

  const emailResult = await sendLeadEmail(validation.data);
  if (!emailResult.success) {
    return NextResponse.json(
      { success: false, message: emailResult.error ?? 'Email service temporarily unavailable' },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true, message: 'Thank you! We will contact you soon.' });
}
