"use client";

import { useState } from "react";
import {
  ImageIcon,
  AudioLines,
  Link2,
  CheckCircle2,
  TriangleAlert,
  Globe,
  Cpu,
  Clock,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "image" | "audio" | "url";
type Zone = "authentic" | "mismatch" | "manipulated";

type Sample = {
  id: string;
  tab: TabId;
  sampleLabel: string;
  mediaCaption: string;
  mediaSub: string;
  verdict: { label: string; score: number; zone: Zone };
  claims: { field: string; extracted: string; claimed: string; status: "match" | "mismatch" }[];
  sources: { domain: string; trust: number; date: string; aligned: boolean }[];
  telemetry: { latency: string; mode: string };
};

const TABS: { id: TabId; label: string; icon: typeof ImageIcon }[] = [
  { id: "image", label: "Upload Image", icon: ImageIcon },
  { id: "audio", label: "Audio Note / Clip", icon: AudioLines },
  { id: "url", label: "Paste URL / Social Post", icon: Link2 },
];

const SAMPLES: Sample[] = [
  {
    id: "event",
    tab: "image",
    sampleLabel: "Load Sample: Out-of-Context Event",
    mediaCaption: "IMG_04421.jpg",
    mediaSub: "Crowd gathering · night · flares · stadium exterior",
    verdict: { label: "Context Mismatch Detected", score: 87, zone: "mismatch" },
    claims: [
      { field: "Location", extracted: "Estadio Metropolitano, Madrid (geolocated)", claimed: "“Riots erupt in Bucharest tonight”", status: "mismatch" },
      { field: "Date", extracted: "March 2019 (EXIF + shadow analysis)", claimed: "“Happening right now”", status: "mismatch" },
      { field: "Visual subject", extracted: "Football supporters, flare celebration", claimed: "Civil unrest / riot police clash", status: "mismatch" },
      { field: "Image integrity", extracted: "No pixel-level manipulation found", claimed: "—", status: "match" },
    ],
    sources: [
      { domain: "reuters.com", trust: 96, date: "2019-03-09", aligned: true },
      { domain: "marca.com", trust: 88, date: "2019-03-09", aligned: true },
      { domain: "gettyimages.com", trust: 91, date: "2019-03-09", aligned: true },
      { domain: "unverified-x-post.com", trust: 12, date: "2026-07-21", aligned: false },
    ],
    telemetry: { latency: "340ms", mode: "Local multimodal edge inference" },
  },
  {
    id: "audio",
    tab: "audio",
    sampleLabel: "Load Sample: Manipulated Audio Translation",
    mediaCaption: "voice_note_0032.wav",
    mediaSub: "0:41 clip · single speaker · non-English source",
    verdict: { label: "Translation Fabrication Detected", score: 92, zone: "manipulated" },
    claims: [
      { field: "Source audio", extracted: "Speaker discusses local market prices", claimed: "“Official declares emergency measures”", status: "mismatch" },
      { field: "Translation", extracted: "Direct transcription, verified dialect model", claimed: "Caption fabricates unrelated statement", status: "mismatch" },
      { field: "Clip boundary", extracted: "Mid-sentence cut, waveform splice at 0:38", claimed: "Presented as complete statement", status: "mismatch" },
      { field: "Voice consistency", extracted: "Single continuous speaker, no synthesis artifacts", claimed: "—", status: "match" },
    ],
    sources: [
      { domain: "apnews.com", trust: 95, date: "2026-07-18", aligned: true },
      { domain: "un.org", trust: 98, date: "2026-07-19", aligned: true },
      { domain: "regional-news.gov", trust: 84, date: "2026-07-18", aligned: true },
      { domain: "viral-clip-repost.net", trust: 9, date: "2026-07-22", aligned: false },
    ],
    telemetry: { latency: "410ms", mode: "Local multimodal edge inference" },
  },
];

const ZONE_STYLES: Record<Zone, { text: string; bg: string; ring: string; dot: string }> = {
  authentic: {
    text: "text-emerald-600 dark:text-emerald-500",
    bg: "bg-emerald-600 dark:bg-emerald-500",
    ring: "ring-emerald-600/20 dark:ring-emerald-500/30",
    dot: "bg-emerald-600 dark:bg-emerald-500",
  },
  mismatch: {
    text: "text-amber-600 dark:text-amber-500",
    bg: "bg-amber-600 dark:bg-amber-500",
    ring: "ring-amber-600/20 dark:ring-amber-500/30",
    dot: "bg-amber-600 dark:bg-amber-500",
  },
  manipulated: {
    text: "text-rose-600 dark:text-rose-500",
    bg: "bg-rose-600 dark:bg-rose-500",
    ring: "ring-rose-600/20 dark:ring-rose-500/30",
    dot: "bg-rose-600 dark:bg-rose-500",
  },
};

export function VerificationSandbox() {
  const [activeSample, setActiveSample] = useState<Sample>(SAMPLES[0]);
  const [activeTab, setActiveTab] = useState<TabId>(SAMPLES[0].tab);

  const zoneStyle = ZONE_STYLES[activeSample.verdict.zone];

  function loadSample(sample: Sample) {
    setActiveSample(sample);
    setActiveTab(sample.tab);
  }

  return (
    <div
      id="sandbox"
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Verification input type" className="flex flex-wrap gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  selected
                    ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSample(sample)}
              className={cn(
                "rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors",
                activeSample.id === sample.id
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-slate-300"
              )}
            >
              {sample.sampleLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr]">
        {/* Media preview */}
        <div className="border-b border-slate-200 p-4 dark:border-slate-800 lg:border-b-0 lg:border-r">
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-950">
            {activeTab === "audio" ? (
              <AudioLines className="h-8 w-8 text-slate-400 dark:text-slate-600" />
            ) : activeTab === "url" ? (
              <Link2 className="h-8 w-8 text-slate-400 dark:text-slate-600" />
            ) : (
              <ImageIcon className="h-8 w-8 text-slate-400 dark:text-slate-600" />
            )}
            <div>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300">{activeSample.mediaCaption}</p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500">{activeSample.mediaSub}</p>
            </div>
          </div>

          <dl className="mt-4 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-500">Latency</dt>
              <dd className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Clock className="h-3 w-3" />
                {activeSample.telemetry.latency}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-500">Inference</dt>
              <dd className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Cpu className="h-3 w-3" />
                Gemma 4 · edge
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-500">Status</dt>
              <dd className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                <Radio className="h-3 w-3 animate-blink" />
                Live
              </dd>
            </div>
          </dl>
        </div>

        {/* Results */}
        <div className="p-4 sm:p-6">
          {/* Confidence meter */}
          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <span className={cn("text-sm font-semibold", zoneStyle.text)}>{activeSample.verdict.label}</span>
              <span className={cn("font-mono text-2xl font-semibold tabular", zoneStyle.text)}>
                {activeSample.verdict.score}%
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 opacity-90">
              <div
                className="absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full bg-slate-900 shadow-[0_0_0_2px_white] dark:bg-white dark:shadow-[0_0_0_2px_theme(colors.slate.950)]"
                style={{ left: `calc(${activeSample.verdict.score}% - 2px)` }}
                aria-hidden
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
              <span>Authentic</span>
              <span>Context Mismatch</span>
              <span>Manipulated</span>
            </div>
          </div>

          {/* Claim breakdown */}
          <div className="mb-6">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Claim Breakdown — Extracted vs. Claimed
            </h3>
            <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950">
                    <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Field</th>
                    <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Extracted (media)</th>
                    <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Claimed (caption)</th>
                    <th scope="col" className="w-8 px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {activeSample.claims.map((claim) => (
                    <tr key={claim.field} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300">{claim.field}</td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{claim.extracted}</td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{claim.claimed}</td>
                      <td className="px-3 py-2">
                        {claim.status === "match" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" aria-label="Consistent" />
                        ) : (
                          <TriangleAlert className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" aria-label="Mismatch" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sources */}
          <div>
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Cited Web Sources
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {activeSample.sources.map((source) => (
                <div
                  key={source.domain}
                  className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-600" />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[11px] text-slate-700 dark:text-slate-300">{source.domain}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-600">{source.date}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium",
                      source.trust >= 70
                        ? "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-600/10 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    )}
                  >
                    {source.trust}/100
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
