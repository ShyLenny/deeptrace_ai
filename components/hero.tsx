import { ArrowRight, GitBranch } from "lucide-react";
import { VerificationSandbox } from "@/components/verification-sandbox";

export function Hero() {
  return (
    <section id="top" className="relative border-b border-slate-200 bg-grid dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Open Innovation Track // Powered by Gemma 4 Multimodal
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
            Expose context hijacking &amp; audio manipulation in real time.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Authentic media paired with fabricated viral claims is the #1 vector for modern
            misinformation. DeepTrace AI extracts multimodal claims, cross-references trusted web
            datasets, and outputs source truth in seconds.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#sandbox"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Launch Live Verification
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
            >
              <GitBranch className="h-4 w-4" />
              View Open Source Architecture
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl animate-fade-up">
          <VerificationSandbox />
        </div>
      </div>
    </section>
  );
}
