import { Quote, Search, Gauge, Landmark } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Quote,
    title: "Claim Extraction",
    body: "Gemma 4 reads the media and its caption together, isolating discrete, checkable claims — who, what, where, and when.",
  },
  {
    step: "02",
    icon: Search,
    title: "Evidence Matching",
    body: "Each claim is matched against a live index of journalistic and government sources, ranked by publication trust and recency.",
  },
  {
    step: "03",
    icon: Gauge,
    title: "Confidence Scoring",
    body: "Agreement and contradiction across sources are weighted into a single score, placed on the authentic-to-manipulated scale.",
  },
  {
    step: "04",
    icon: Landmark,
    title: "Source Verification",
    body: "Every source behind the score is surfaced with its domain trust rating and matching publish date, not hidden behind the number.",
  },
];

export function PipelineSteps() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step) => {
        const Icon = step.icon;
        return (
          <div
            key={step.step}
            className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-600">
                STEP {step.step}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{step.body}</p>
          </div>
        );
      })}
    </div>
  );
}
