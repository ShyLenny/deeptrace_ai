import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tkyvacjolkcbkxoytqml.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRreXZhY2pvbGtjYmt4b3l0cW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzMwOTksImV4cCI6MjEwMDQ0OTA5OX0.6rf4MXvgImJA9Roa06GEFHAOoq4VWlaTs74M5iYAqTw";

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  // Check if any Supabase auth cookie is present before making network call
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.startsWith("sb-") || c.name.includes("auth-token")
  );

  let user = null;

  if (hasAuthCookie) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    try {
      // Race getUser with a 3-second timeout fallback
      const result = await Promise.race([
        supabase.auth.getUser(),
        new Promise<{ data: { user: null }; error: any }>((resolve) =>
          setTimeout(() => resolve({ data: { user: null }, error: new Error("Auth timeout") }), 3000)
        ),
      ]);
      user = result.data?.user ?? null;
    } catch (e) {
      console.error("Middleware getUser exception:", e);
      user = null;
    }
  }

  if (user && isLoginPage) {
    // Authenticated users trying to access /login redirect to main page /
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

