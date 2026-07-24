import { ArrowRight } from "lucide-react";

type CtaLink = { label: string; href: string };

export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="bg-slate-900 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wide text-slate-400">{eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base">
          {body}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            {primary.label}
            <ArrowRight className="h-4 w-4" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
