import { Github, ExternalLink } from "lucide-react";

const DATASETS = [
  { label: "Reuters Graphics Archive", href: "#" },
  { label: "AP News Verification Index", href: "#" },
  { label: "UN OCHA Situation Reports", href: "#" },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
              DeepTrace AI // Gemma 4
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Built for the Open Innovation Track. MIT licensed, open source, and submitted as a
              hackathon prototype — not a production verification authority.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              <Github className="h-3.5 w-3.5" />
              github.com/deeptrace-ai
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Dataset References
            </p>
            <ul className="mt-3 space-y-2">
              {DATASETS.map((dataset) => (
                <li key={dataset.label}>
                  <a
                    href={dataset.href}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {dataset.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
              System Status
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                DeepTrace AI Engine: Operational
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DeepTrace AI. Released under the MIT License.</p>
          <p>Hackathon prototype — verdicts are advisory, not adjudicative.</p>
        </div>
      </div>
    </footer>
  );
}
