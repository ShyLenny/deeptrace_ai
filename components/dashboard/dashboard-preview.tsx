"use client";

import { useState } from "react";
import {
  LayoutGrid,
  ShieldCheck,
  History,
  KeyRound,
  Settings,
  Search,
  ImageIcon,
  AudioLines,
  Video,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: ShieldCheck, label: "Verifications" },
  { icon: History, label: "History" },
  { icon: KeyRound, label: "API Keys" },
  { icon: Settings, label: "Settings" },
];

const STATS = [
  { label: "Verifications this month", value: "4,812" },
  { label: "Average confidence", value: "91.2%" },
  { label: "Flagged as manipulated", value: "6.4%" },
];

const HISTORY = [
  {
    id: "vrf_8f2c1a",
    type: "video",
    name: "rally_clip_0417.mp4",
    verdict: "Context Mismatch",
    score: 87,
    zone: "mismatch",
    deepfake: 4,
    date: "2026-07-24 · 14:02",
    timeline: [
      { time: "14:02:01", label: "Media received, 41.2 MB" },
      { time: "14:02:02", label: "Claim extraction complete — 3 entities, 1 location" },
      { time: "14:02:03", label: "4 sources queried, 4 responded" },
      { time: "14:02:04", label: "Verdict computed — context mismatch, 87%" },
    ],
    sources: [
      { domain: "reuters.com", trust: 96 },
      { domain: "apnews.com", trust: 95 },
    ],
  },
  {
    id: "vrf_2b91cd",
    type: "image",
    name: "protest_photo_22.jpg",
    verdict: "Authentic",
    score: 8,
    zone: "authentic",
    deepfake: 2,
    date: "2026-07-24 · 11:47",
    timeline: [
      { time: "11:47:01", label: "Media received, 3.1 MB" },
      { time: "11:47:02", label: "Geolocation & EXIF cross-check complete" },
      { time: "11:47:02", label: "2 sources queried, 2 responded" },
      { time: "11:47:03", label: "Verdict computed — authentic, 8% mismatch risk" },
    ],
    sources: [{ domain: "afp.com", trust: 93 }],
  },
  {
    id: "vrf_a04e77",
    type: "audio",
    name: "voice_note_0032.wav",
    verdict: "Translation Fabrication",
    score: 92,
    zone: "manipulated",
    deepfake: 71,
    date: "2026-07-23 · 19:12",
    timeline: [
      { time: "19:12:01", label: "Media received, 1.8 MB" },
      { time: "19:12:02", label: "Waveform splice detected at 0:38" },
      { time: "19:12:03", label: "Dialect-aware transcription complete" },
      { time: "19:12:04", label: "Verdict computed — fabrication, 92%" },
    ],
    sources: [
      { domain: "un.org", trust: 98 },
      { domain: "apnews.com", trust: 95 },
    ],
  },
  {
    id: "vrf_c519f0",
    type: "text",
    name: "Submitted URL — x.com/…",
    verdict: "Authentic",
    score: 14,
    zone: "authentic",
    deepfake: 0,
    date: "2026-07-23 · 09:05",
    timeline: [
      { time: "09:05:01", label: "URL fetched and parsed" },
      { time: "09:05:02", label: "Claim extraction complete — 2 claims" },
      { time: "09:05:03", label: "3 sources queried, 3 responded" },
      { time: "09:05:03", label: "Verdict computed — authentic, 14% mismatch risk" },
    ],
    sources: [{ domain: "bbc.com", trust: 94 }],
  },
];

const TYPE_ICON = { video: Video, image: ImageIcon, audio: AudioLines, text: FileText } as const;

const ZONE_STYLES: Record<string, string> = {
  authentic: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  mismatch: "bg-amber-600/10 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  manipulated: "bg-rose-600/10 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const ZONE_BAR: Record<string, string> = {
  authentic: "bg-emerald-600 dark:bg-emerald-500",
  mismatch: "bg-amber-600 dark:bg-amber-500",
  manipulated: "bg-rose-600 dark:bg-rose-500",
};

export function DashboardPreview() {
  const [selectedId, setSelectedId] = useState(HISTORY[0].id);
  const selected = HISTORY.find((h) => h.id === selectedId) ?? HISTORY[0];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <div className="border-b border-slate-200 p-4 dark:border-slate-800 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 px-2 font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
            <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-slate-300 text-[9px] dark:border-slate-700">
              DT
            </span>
            Workspace
          </div>
          <nav className="mt-4 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {SIDEBAR.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
                    item.active
                      ? "bg-slate-100 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "text-slate-500 dark:text-slate-500"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              );
            })}
          </nav>
        </div>

        {/* Main */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Overview</p>
            <div className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-slate-400 dark:border-slate-800 dark:text-slate-600">
              <Search className="h-3.5 w-3.5" />
              <span className="font-mono text-[11px]">Search verifications</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3 dark:bg-slate-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white p-4 dark:bg-slate-900">
                <p className="font-mono text-xl font-semibold tabular text-slate-900 dark:text-slate-100">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Detail */}
            <div className="border-t border-slate-200 p-5 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-500">{selected.id}</p>
                  <p className="mt-0.5 text-sm font-medium text-slate-900 dark:text-slate-100">{selected.name}</p>
                </div>
                <span className={cn("rounded px-2 py-1 font-mono text-[11px] font-medium", ZONE_STYLES[selected.zone])}>
                  {selected.verdict} · {selected.score}%
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                  <span>Deepfake probability</span>
                  <span className="font-mono tabular text-slate-700 dark:text-slate-300">{selected.deepfake}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={cn("h-full rounded-full", ZONE_BAR[selected.zone])}
                    style={{ width: `${selected.deepfake}%` }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
                  Evidence timeline
                </p>
                <ul className="mt-3 space-y-3 border-l border-slate-200 pl-4 dark:border-slate-800">
                  {selected.timeline.map((event) => (
                    <li key={event.time} className="relative text-sm">
                      <span className="absolute -left-[19px] top-1.5 h-2 w-2 rounded-full border-2 border-white bg-slate-300 dark:border-slate-900 dark:bg-slate-700" />
                      <span className="font-mono text-[11px] text-slate-400 dark:text-slate-600">{event.time}</span>
                      <p className="text-slate-700 dark:text-slate-300">{event.label}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
                  Source citations
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.sources.map((source) => (
                    <span
                      key={source.domain}
                      className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:text-slate-400"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-500" />
                      {source.domain}
                      <span className="text-slate-400 dark:text-slate-600">{source.trust}/100</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* History list */}
            <div className="border-t border-slate-200 dark:border-slate-800 lg:border-l">
              <p className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
                Recent verifications
              </p>
              <ul>
                {HISTORY.map((item) => {
                  const Icon = TYPE_ICON[item.type as keyof typeof TYPE_ICON];
                  const selectedRow = item.id === selectedId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                          "flex w-full items-start gap-3 border-t border-slate-200 px-5 py-3 text-left dark:border-slate-800",
                          selectedRow ? "bg-slate-50 dark:bg-slate-800/50" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                        )}
                      >
                        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-600" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">{item.name}</p>
                          <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-slate-400 dark:text-slate-600">
                            <Clock className="h-2.5 w-2.5" />
                            {item.date}
                          </p>
                        </div>
                        <span className={cn("shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium", ZONE_STYLES[item.zone])}>
                          {item.score}%
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
