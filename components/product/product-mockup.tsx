"use client";

import { useState } from "react";
import { Layers, Radar, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const SCREENS = [
  {
    id: "extraction",
    label: "Extraction",
    icon: Layers,
    path: "app.deeptrace.ai/verify/8841/extraction",
    rows: [
      { field: "Entities detected", value: "3 people, 1 location, 1 event" },
      { field: "Audio transcript", value: '"...emergency measures announced at the border..."' },
      { field: "Visual scene", value: "Outdoor daylight, crowd of ~40, no uniforms present" },
      { field: "Language", value: "Romanian (auto-detected, 98.2% confidence)" },
    ],
  },
  {
    id: "cross-reference",
    label: "Cross-Reference",
    icon: Radar,
    path: "app.deeptrace.ai/verify/8841/sources",
    rows: [
      { field: "Sources queried", value: "412 indexed publications, 6 government feeds" },
      { field: "Earliest match", value: "reuters.com — 2024-11-03T09:14:00Z" },
      { field: "Corroborating sources", value: "4 of 4 independent outlets align" },
      { field: "Contradicting sources", value: "0 found" },
    ],
  },
  {
    id: "report",
    label: "Verdict Report",
    icon: FileCheck,
    path: "app.deeptrace.ai/verify/8841/report",
    rows: [
      { field: "Verdict", value: "Context Mismatch Detected — 87%" },
      { field: "Deepfake probability", value: "2% (below threshold)" },
      { field: "Citation trail", value: "4 sources, exportable as PDF / JSON" },
      { field: "Reviewed by", value: "Automated — flagged for human sign-off" },
    ],
  },
];

export function ProductMockup() {
  const [active, setActive] = useState(SCREENS[0].id);
  const screen = SCREENS.find((s) => s.id === active) ?? SCREENS[0];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        <span className="truncate rounded bg-white px-2.5 py-1 font-mono text-[11px] text-slate-500 dark:bg-slate-900 dark:text-slate-500">
          {screen.path}
        </span>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {SCREENS.map((s) => {
          const Icon = s.icon;
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
                selected
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.label}
            </button>
          );
        })}
      </div>

      <dl className="divide-y divide-slate-200 dark:divide-slate-800">
        {screen.rows.map((row) => (
          <div key={row.field} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="font-mono text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
              {row.field}
            </dt>
            <dd className="text-sm text-slate-700 dark:text-slate-300">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
