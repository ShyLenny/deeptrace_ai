export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-grid dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {body && (
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
