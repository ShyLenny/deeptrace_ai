"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface UserDetails {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createClient();

  const extractUserDetails = (u: User | null): UserDetails | null => {
    if (!u) return null;
    return {
      id: u.id,
      email: u.email,
      fullName: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "User",
      avatarUrl: u.user_metadata?.avatar_url || u.user_metadata?.picture || "",
    };
  };

  useEffect(() => {
    let mounted = true;

    // Safety timeout to prevent infinite loading state
    const timeoutId = setTimeout(() => {
      if (mounted && loading) {
        setLoading(false);
      }
    }, 3000);

    // Get initial session
    supabase.auth
      .getSession()
      .then((res: any) => {
        if (mounted) {
          if (res.error) {
            setError(res.error.message);
          }
          const currentSession = res.data?.session ?? null;
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (mounted) {
          console.error("Session retrieval error:", err);
          setError(err?.message || "Failed to retrieve session");
          setLoading(false);
        }
      });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const redirectUrl = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Failed to initiate Google sign-in. Please try again.");
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      console.error("Sign out error:", err);
      setError(err.message || "Failed to sign out. Please try again.");
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    session,
    userDetails: extractUserDetails(user),
    loading,
    error,
    signInWithGoogle,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
