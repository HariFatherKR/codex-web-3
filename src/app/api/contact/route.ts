import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, inquiryType, message, source } = body ?? {};

  if (!email || !message) {
    return NextResponse.json({ error: 'email and message are required' }, { status: 400 });
  }

  const client = getClient();

  if (!client) {
    console.warn('Supabase env not configured. Message captured locally.');
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await client.from('inquiries').insert({
    name: name ?? null,
    email,
    inquiry_type: inquiryType ?? 'lecture',
    message,
    source: source ?? 'bio'
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed to store inquiry' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
