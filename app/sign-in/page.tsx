import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — DeepTrace AI",
};

export default function SignInPage() {
  return (
    <main className="bg-grid">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <a href="/" className="flex items-center gap-2 font-mono text-sm font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-300 text-[10px] font-semibold dark:border-slate-700">
              DT
            </span>
            <span className="text-slate-900 dark:text-slate-100">DeepTrace AI</span>
          </a>

          <h1 className="mt-6 text-lg font-semibold text-slate-900 dark:text-slate-100">Sign in to your workspace</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
            New here?{" "}
            <a href="/dashboard" className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400">
              Get started free
            </a>
            .
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="you@newsroom.org"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="••••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[11px] text-slate-400 dark:text-slate-600">
            This is a demo interface — no account is created.
          </p>
        </div>
      </div>
    </main>
  );
}
