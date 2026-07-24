import { PageHero } from "@/components/marketing/page-hero";

type Section = { heading: string; paragraphs: string[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} body={`Last updated ${updated}`} />
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-2xl space-y-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{section.heading}</h2>
              <div className="mt-2 space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
