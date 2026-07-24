"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export const dynamic = "force-dynamic";

function LoginContent() {
  const { signInWithGoogle, error: authError, loading } = useAuth();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setErrorMessage(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setIsSigningIn(false);
    }
  }, [authError]);

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err: any) {
      setIsSigningIn(false);
      setErrorMessage(err.message || "Failed to initiate Google login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-slate-100">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 font-mono text-base font-bold text-cyan-400 shadow-inner">
            DT
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
            Welcome to DeepTrace AI
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access real-time multimodal verification dashboard
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="rounded-lg border border-red-500/30 bg-red-950/40 p-4 text-sm text-red-400 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn || loading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm font-medium text-slate-100 shadow-md transition-all duration-200 hover:border-slate-500 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningIn ? (
              <svg
                className="h-5 w-5 animate-spin text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{isSigningIn ? "Connecting to Google..." : "Continue with Google"}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-4 text-center text-xs text-slate-500">
          Secured with Supabase Auth & Google OAuth
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginContent />
    </Suspense>
  );
}
