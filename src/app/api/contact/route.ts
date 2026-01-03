import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const { name, email, inquiryType, message, source } = body as {
    name?: string;
    email?: string;
    inquiryType?: string;
    message?: string;
    source?: string;
  };

  if (!email || !message || !inquiryType) {
    return NextResponse.json({ error: 'email, inquiryType, message는 필수입니다.' }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Supabase가 구성되어 있지 않습니다. env를 확인해주세요.' },
      { status: 500 }
    );
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/inquiries`;
  const payload = {
    name: name ?? null,
    email,
    inquiry_type: inquiryType,
    message,
    source: source ?? 'public'
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Supabase error' }));
    return NextResponse.json({ error: error.message ?? 'Supabase 저장 실패' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
