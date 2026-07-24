const TESTIMONIALS = [
  {
    quote:
      "We used to spend forty minutes chasing down the original source of a viral clip. DeepTrace gets us a cited answer before the segment producer finishes their coffee.",
    name: "Verification Lead",
    role: "Regional broadcast newsroom",
  },
  {
    quote:
      "The audit trail is what sold our legal team. Every score comes with sources we can put in front of a judge, not just a black-box percentage.",
    name: "Director of Trust & Safety",
    role: "Civic technology nonprofit",
  },
  {
    quote:
      "Our moderation queue dropped by a third once we started routing flagged uploads through the API before human review.",
    name: "Head of Platform Integrity",
    role: "Mid-size social platform",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Trusted by
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Teams who can&apos;t afford to be wrong
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <blockquote className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.name}</p>
                <p className="font-mono text-[11px] text-slate-500 dark:text-slate-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
