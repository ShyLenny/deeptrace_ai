"use client";

import { useState } from "react";
import { ChevronDown, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export function SiteHeader() {
  const { userDetails, signOut } = useAuth();
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/85 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-300 text-[10px] font-semibold dark:border-slate-700">
            DT
          </span>
          <span className="text-slate-900 dark:text-slate-100">DeepTrace AI</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) =>
            item.menu ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setProductOpen(true)}
                onMouseLeave={() => setProductOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  aria-expanded={productOpen}
                  onClick={() => setProductOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {productOpen && (
                  <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                      {item.menu.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-md px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{sub.label}</p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">{sub.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          {userDetails ? (
            <div className="flex items-center gap-3 border-r border-slate-200 pr-3 dark:border-slate-800">
              {userDetails.avatarUrl ? (
                <img
                  src={userDetails.avatarUrl}
                  alt={userDetails.fullName || "User Avatar"}
                  className="h-8 w-8 rounded-full border border-slate-300 object-cover dark:border-slate-700"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                  <UserIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
              )}
              <div className="hidden text-left lg:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {userDetails.fullName}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {userDetails.email}
                </p>
              </div>
              <button
                type="button"
                onClick={signOut}
                title="Sign out"
                className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-red-900/50 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="hidden text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 sm:inline-flex"
            >
              Sign In
            </a>
          )}
          <a
            href="/dashboard"
            className="hidden items-center rounded-md bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:inline-flex"
          >
            Get Started
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-slate-50 transition-[max-height] duration-300 dark:border-slate-800 dark:bg-slate-950 md:hidden",
          mobileOpen ? "max-h-[32rem]" : "max-h-0 border-t-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3">
          {PRIMARY_NAV.map((item) => (
            <div key={item.href}>
              <a
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm font-medium text-slate-800 dark:text-slate-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
              {item.menu && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-slate-200 pl-3 dark:border-slate-800">
                  {item.menu.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      className="block rounded-md px-2 py-1.5 text-sm text-slate-500 dark:text-slate-500"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-2 flex gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
            <a
              href="/sign-in"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              Sign In
            </a>
            <a
              href="/dashboard"
              className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-center text-sm font-medium text-slate-50 dark:bg-slate-100 dark:text-slate-900"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
