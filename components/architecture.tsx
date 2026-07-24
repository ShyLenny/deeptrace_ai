import { Layers, Cpu, Radar, FileCheck, ArrowRight, ArrowDown } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Layers,
    title: "Multimodal Input",
    body: "Image, audio, or social post URL ingested as raw signal — no OCR or ASR preprocessing.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Gemma 4 Edge Inference",
    body: "Native pixel + waveform reasoning extracts claims, entities, and metadata locally.",
  },
  {
    step: "03",
    icon: Radar,
    title: "Real-Time Web RAG",
    body: "Extracted claims cross-referenced live against journalistic and government sources.",
  },
  {
    step: "04",
    icon: FileCheck,
    title: "Forensic Audit Report",
    body: "Confidence score, claim breakdown, and citation trail returned in seconds.",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Documentation
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Gemma 4 technical architecture
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-stretch lg:flex-row lg:items-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.step} className="flex flex-1 flex-col items-center lg:flex-row">
                <div className="w-full rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-600">
                      STEP {step.step}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.body}
                  </p>
                </div>

                {!isLast && (
                  <div className="flex shrink-0 items-center justify-center py-2 text-slate-300 dark:text-slate-700 lg:px-3 lg:py-0">
                    <ArrowDown className="h-4 w-4 lg:hidden" />
                    <ArrowRight className="hidden h-4 w-4 lg:block" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
