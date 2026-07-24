import { Fingerprint, MapPinned, Radar, FileSearch } from "lucide-react";

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Native Multimodal Claim Extraction",
    body: "Gemma 4 processes pixels and raw audio directly — no intermediate speech-to-text or captioning wrapper to introduce translation drift or dropped context.",
  },
  {
    icon: MapPinned,
    title: "Temporal & Geographic Verification",
    body: "Cross-references historical visual metadata, EXIF, and shadow geometry against the claimed date and location to detect recycled or relocated media.",
  },
  {
    icon: Radar,
    title: "Real-Time Web RAG Cross-Analysis",
    body: "Indexes verified journalistic and government databases live, surfacing the earliest matching publication and its original context.",
  },
  {
    icon: FileSearch,
    title: "Plain-Language Forensic Audit Trails",
    body: "Every verdict ships with an exportable, transparent citation trail — built for newsroom fact-checkers and civic response teams, not just engineers.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Platform
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Everything a trust &amp; safety team needs, in one verdict
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white p-6 dark:bg-slate-900">
                <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
