import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
	const { email, password, displayName } = await request.json();

	if (!email || !password || !displayName) {
		return NextResponse.redirect(new URL("/sign-up?status=error&message=Please fill in all fields", request.url));
	}

	const supabase = createClient();
	const origin = new URL(request.url).origin;

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/api/auth/callback`,
			data: {
				displayName,
			},
		},
	});

	if (error) {
		console.log(error.message);
		return NextResponse.redirect(new URL(`/sign-up?status=error&message=${error.message}`, request.url));
	}

	return NextResponse.redirect(new URL('/sign-up?status=success&message=Check email to continue sign in process', request.url));
}
