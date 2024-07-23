// middleware.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const path = requestUrl.pathname;

  // Create Supabase client
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is not logged in and trying to access a protected route
  if (!user && path.startsWith("/dashboard")) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and trying to access login or sign-up pages
  if (user && (path === "/login" || path === "/sign-up")) {
    // Redirect to the dashboard or homepage
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow access if none of the above conditions are met
  return NextResponse.next();
}

// Specify which paths should use this middleware
export const config = {
  matcher: ["/login", "/sign-up", "/dashboard/:path*"], // Apply middleware to the specified paths
};
