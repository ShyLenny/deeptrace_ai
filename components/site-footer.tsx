import { Github, Twitter, Linkedin } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/nav";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 font-mono text-sm font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-300 text-[10px] font-semibold dark:border-slate-700">
                DT
              </span>
              <span className="text-slate-900 dark:text-slate-100">DeepTrace AI</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Multimodal verification infrastructure for newsrooms, platforms, and governments.
              Originally built for the Open Innovation Track, powered by Gemma 4.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 dark:border-slate-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                DeepTrace AI Engine: Operational
              </span>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
                {group}
              </p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © 2026 DeepTrace AI. Released under the MIT License. Verdicts are advisory, not
            adjudicative.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-slate-100"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
