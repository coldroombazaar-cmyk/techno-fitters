/**
 * Input validation and sanitization for lead submissions.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_LENGTH = 10;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

function sanitize(input: string): string {
  return String(input)
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
}

export interface LeadValidationResult {
  valid: boolean;
  errors: string[];
  data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    leadType: string;
  };
}

export function validateLead(body: Record<string, unknown>): LeadValidationResult {
  const errors: string[] = [];
  const rawName = body.name ?? '';
  const rawEmail = body.email ?? '';
  const rawPhone = body.phone ?? '';
  const rawMessage = body.message ?? '';
  const rawLeadType = body.leadType ?? 'quote';

  const name = sanitize(String(rawName));
  const email = sanitize(String(rawEmail).toLowerCase());
  const phone = sanitize(String(rawPhone).replace(/\s/g, ''));
  const message = sanitize(String(rawMessage).slice(0, MAX_MESSAGE_LENGTH));
  const leadType = ['quote', 'consultation', 'consultant'].includes(String(rawLeadType))
    ? String(rawLeadType)
    : 'quote';

  if (!name || name.length < 2) {
    errors.push('Name is required (min 2 characters)');
  }

  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Invalid email format');
  }

  if (!phone) {
    errors.push('Phone is required');
  } else if (phone.length < PHONE_MIN_LENGTH || !/^[0-9+()-]+$/.test(phone)) {
    errors.push('Phone must be at least 10 digits');
  }

  if (!message || message.length < 5) {
    errors.push('Message is required (min 5 characters)');
  }

  return {
    valid: errors.length === 0,
    errors,
    data: { name, email, phone, message, leadType },
  };
}
