import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Live Sandbox", href: "#sandbox" },
  { label: "Multimodal Engine", href: "#features" },
  { label: "Vector Benchmarks", href: "#vectors" },
  { label: "Documentation", href: "#architecture" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/85 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-300 text-[10px] font-semibold dark:border-slate-700">
            DT
          </span>
          <span className="text-slate-900 dark:text-slate-100">DeepTrace AI</span>
          <span className="text-slate-400 dark:text-slate-600">// Gemma 4</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100 sm:flex"
          >
            <Github className="h-3.5 w-3.5" />
            Repository
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
