"use client";

import { useState } from "react";
import { Newspaper, Landmark, Siren, MessagesSquare, Building2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    id: "news",
    icon: Newspaper,
    label: "News Organizations",
    headline: "Verify before you publish, not after you retract.",
    body: "Newsrooms are the first line of defense against viral misinformation, and the first to be blamed when a fake slips through. DeepTrace gives reporters a citable verdict on user-submitted footage in the time it takes to write a headline.",
    bullets: [
      "Pre-publication screening for UGC and wire submissions",
      "Exportable citation trails for editorial sign-off",
      "Bulk verification for breaking-news photo desks",
    ],
  },
  {
    id: "government",
    icon: Landmark,
    label: "Governments",
    headline: "Respond to fabricated claims with evidence, not denial.",
    body: "Public agencies need to distinguish coordinated disinformation from genuine citizen reports quickly, especially during elections and emergencies, without over-censoring legitimate speech.",
    bullets: [
      "Election-cycle monitoring for recycled or relocated footage",
      "Emergency-response verification of citizen-submitted media",
      "Audit-ready reports for public communications teams",
    ],
  },
  {
    id: "law-enforcement",
    icon: Siren,
    label: "Law Enforcement",
    headline: "Establish provenance before evidence reaches a case file.",
    body: "Digital evidence is only useful if its origin can withstand scrutiny. DeepTrace flags manipulation and context mismatches early, before they compromise an investigation.",
    bullets: [
      "Provenance and manipulation checks on submitted digital evidence",
      "Chain-of-custody-friendly audit exports",
      "Deepfake screening for impersonation and fraud cases",
    ],
  },
  {
    id: "platforms",
    icon: MessagesSquare,
    label: "Social Media Platforms",
    headline: "Pre-screen the queue before it reaches a human moderator.",
    body: "Moderation teams are drowning in volume. Routing uploads through the API before human review cuts down what actually needs a person's attention.",
    bullets: [
      "API-first integration into existing moderation pipelines",
      "Batch scoring for high-volume upload queues",
      "Configurable confidence thresholds per policy tier",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    label: "Enterprises",
    headline: "Protect your brand from synthetic impersonation.",
    body: "Executive deepfakes and fabricated statements are an emerging fraud vector. Enterprises use DeepTrace to verify suspicious video and audio before it reaches a wire transfer approval or a press desk.",
    bullets: [
      "Executive impersonation & synthetic voice detection",
      "Brand-mention monitoring for fabricated statements",
      "SSO-ready deployment for security teams",
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Educational Institutions",
    headline: "Teach media literacy with a real verification tool, not a lecture.",
    body: "Universities and civic-education programs use the sandbox to show students what a manipulated claim actually looks like under forensic analysis.",
    bullets: [
      "Classroom-ready sandbox with guided sample cases",
      "Research API access for media literacy programs",
      "Discounted academic licensing",
    ],
  },
];

export function SolutionsExplorer() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const solution = SOLUTIONS.find((s) => s.id === active) ?? SOLUTIONS[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <div role="tablist" aria-label="Solutions by audience" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {SOLUTIONS.map((s) => {
          const Icon = s.icon;
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-md border px-3.5 py-2.5 text-left text-sm font-medium transition-colors lg:w-full",
                selected
                  ? "border-slate-900 bg-slate-900 text-slate-50 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-100"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h3 className="text-balance font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
          {solution.headline}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          {solution.body}
        </p>
        <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-6 dark:border-slate-800">
          {solution.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
