import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const tableName = 'Waitlist'
  const { name, email, number } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from(tableName)
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: 'Email is already in the waitlist' }, { status: 400 })
    }

    const { data, error } = await supabase.from(tableName).insert([{ name, email, number }])

    if (error) {
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
