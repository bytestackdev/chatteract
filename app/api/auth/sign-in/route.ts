import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?status=error&message=Please fill in all fields', request.url));
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log(error.message);
    return NextResponse.redirect(new URL(`/login?status=error&message=${error.message}`, request.url));
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
