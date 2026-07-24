import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/";

  if (error || errorDescription) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", errorDescription || error || "Authentication failed");
    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { error: exchangeError } = await Promise.race([
        supabase.auth.exchangeCodeForSession(code),
        new Promise<{ error: any }>((resolve) =>
          setTimeout(() => resolve({ error: new Error("Code exchange timeout") }), 5000)
        ),
      ]);

      if (!exchangeError) {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      } else {
        const loginUrl = new URL("/login", origin);
        loginUrl.searchParams.set("error", exchangeError.message || "Failed to exchange authorization code");
        return NextResponse.redirect(loginUrl);
      }
    } catch (err: any) {
      console.error("Auth callback error:", err);
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("error", err.message || "Authentication process failed");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.redirect(new URL("/login?error=Invalid auth callback state", origin));
}
