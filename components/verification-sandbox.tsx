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
  Loader2,
  Save,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { isFirebaseConfigured } from "@/lib/firebase";
import { saveAuditReport } from "@/lib/firebase/db";
import { uploadVerificationMedia } from "@/lib/firebase/storage";
import { formatBytes, isVideo } from "@/lib/media";
import { UploadDropzone, type SelectedMedia } from "@/components/upload-dropzone";
import type { Citation, NewAuditReport, Verdict } from "@/lib/types/firebase";

type TabId = "upload" | "audio" | "url";
type Zone = "authentic" | "mismatch" | "manipulated";
type SaveState = "idle" | "saving" | "saved" | "error" | "signed-out";

type Claim = { field: string; extracted: string; claimed: string; status: "match" | "mismatch" };
type Source = { domain: string; trust: number; date: string };

type Result = {
  origin: "sample" | "live";
  mediaCaption: string;
  mediaSub: string;
  verdict: { label: string; score: number; zone: Zone };
  deepfakeProbability?: number;
  summary?: string;
  claims: Claim[];
  sources: Source[];
  telemetry: { latency: string; model: string };
  audit?: NewAuditReport;
};

const TABS: { id: TabId; label: string; icon: typeof ImageIcon }[] = [
  { id: "upload", label: "Upload Photo / Video", icon: ImageIcon },
  { id: "audio", label: "Audio Note / Clip", icon: AudioLines },
  { id: "url", label: "Paste URL / Social Post", icon: Link2 },
];

const VERDICT_META: Record<Verdict, { zone: Zone; label: string }> = {
  AUTHENTIC: { zone: "authentic", label: "No Manipulation Detected" },
  CONTEXT_MISMATCH: { zone: "mismatch", label: "Context Mismatch Detected" },
  SUSPECTED_MANIPULATION: { zone: "manipulated", label: "Suspected Manipulation" },
};

const SAMPLES: (Result & { id: string; sampleLabel: string })[] = [
  {
    id: "event",
    sampleLabel: "Load Sample: Out-of-Context Event",
    origin: "sample",
    mediaCaption: "IMG_04421.jpg",
    mediaSub: "Crowd gathering · night · flares · stadium exterior",
    verdict: { label: "Context Mismatch Detected", score: 87, zone: "mismatch" },
    deepfakeProbability: 4,
    claims: [
      { field: "Location", extracted: "Estadio Metropolitano, Madrid (geolocated)", claimed: "“Riots erupt in Bucharest tonight”", status: "mismatch" },
      { field: "Date", extracted: "March 2019 (EXIF + shadow analysis)", claimed: "“Happening right now”", status: "mismatch" },
      { field: "Visual subject", extracted: "Football supporters, flare celebration", claimed: "Civil unrest / riot police clash", status: "mismatch" },
      { field: "Image integrity", extracted: "No pixel-level manipulation found", claimed: "—", status: "match" },
    ],
    sources: [
      { domain: "reuters.com", trust: 96, date: "2019-03-09" },
      { domain: "marca.com", trust: 88, date: "2019-03-09" },
      { domain: "gettyimages.com", trust: 91, date: "2019-03-09" },
      { domain: "unverified-x-post.com", trust: 12, date: "2026-07-21" },
    ],
    telemetry: { latency: "340ms", model: "Gemma 4 · edge" },
  },
  {
    id: "audio",
    sampleLabel: "Load Sample: Manipulated Audio Translation",
    origin: "sample",
    mediaCaption: "voice_note_0032.wav",
    mediaSub: "0:41 clip · single speaker · non-English source",
    verdict: { label: "Translation Fabrication Detected", score: 92, zone: "manipulated" },
    deepfakeProbability: 71,
    claims: [
      { field: "Source audio", extracted: "Speaker discusses local market prices", claimed: "“Official declares emergency measures”", status: "mismatch" },
      { field: "Translation", extracted: "Direct transcription, verified dialect model", claimed: "Caption fabricates unrelated statement", status: "mismatch" },
      { field: "Clip boundary", extracted: "Mid-sentence cut, waveform splice at 0:38", claimed: "Presented as complete statement", status: "mismatch" },
      { field: "Voice consistency", extracted: "Single continuous speaker, no synthesis artifacts", claimed: "—", status: "match" },
    ],
    sources: [
      { domain: "apnews.com", trust: 95, date: "2026-07-18" },
      { domain: "un.org", trust: 98, date: "2026-07-19" },
      { domain: "regional-news.gov", trust: 84, date: "2026-07-18" },
      { domain: "viral-clip-repost.net", trust: 9, date: "2026-07-22" },
    ],
    telemetry: { latency: "410ms", model: "Gemma 4 · edge" },
  },
];

const ZONE_STYLES: Record<Zone, { text: string; bar: string }> = {
  authentic: { text: "text-emerald-600 dark:text-emerald-500", bar: "bg-emerald-600 dark:bg-emerald-500" },
  mismatch: { text: "text-amber-600 dark:text-amber-500", bar: "bg-amber-600 dark:bg-amber-500" },
  manipulated: { text: "text-rose-600 dark:text-rose-500", bar: "bg-rose-600 dark:bg-rose-500" },
};

export function VerificationSandbox() {
  const { userDetails } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("upload");
  const [result, setResult] = useState<Result | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const [media, setMedia] = useState<SelectedMedia | null>(null);
  const [claimedContext, setClaimedContext] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  /** Persists a completed report; failures surface in the UI but never block the verdict. */
  async function persistAudit(audit: NewAuditReport, file?: File) {
    if (!isFirebaseConfigured) {
      setSaveState("idle");
      return;
    }
    if (!userDetails) {
      setSaveState("signed-out");
      return;
    }

    setSaveState("saving");
    try {
      let mediaUrl = audit.mediaUrl;
      if (file) {
        mediaUrl = await uploadVerificationMedia(file, userDetails.id);
      }
      await saveAuditReport(userDetails.id, { ...audit, mediaUrl });
      setSaveState("saved");
    } catch (err) {
      console.error("Failed to save audit report:", err);
      setSaveState("error");
    }
  }

  function loadSample(sample: (typeof SAMPLES)[number]) {
    setActiveSampleId(sample.id);
    setAnalysisError(null);
    setResult(sample);
    void persistAudit({
      claimText: sample.claims.map((c) => `${c.field}: ${c.claimed}`).join(" | "),
      mediaUrl: sample.mediaCaption,
      verdict:
        sample.verdict.zone === "authentic"
          ? "AUTHENTIC"
          : sample.verdict.zone === "mismatch"
            ? "CONTEXT_MISMATCH"
            : "SUSPECTED_MANIPULATION",
      confidenceScore: sample.verdict.score,
      summary: `${sample.verdict.label} — ${sample.mediaSub}`,
      citations: sample.sources.map((s) => ({
        source_name: s.domain,
        url: `https://${s.domain}`,
        trust_score: s.trust,
      })),
    });
  }

  async function runVerification() {
    if (!media || analyzing) return;

    setAnalyzing(true);
    setAnalysisError(null);
    setActiveSampleId(null);
    setSaveState("idle");

    try {
      const body = new FormData();
      body.append("media", media.file);
      body.append("claimedContext", claimedContext);

      const response = await fetch("/api/verify", { method: "POST", body });
      const payload = await response.json();

      if (!response.ok) {
        setAnalysisError(payload?.error ?? "Verification failed. Try again.");
        setResult(null);
        return;
      }

      const meta = VERDICT_META[payload.verdict as Verdict] ?? VERDICT_META.CONTEXT_MISMATCH;
      const citations: Citation[] = payload.citations ?? [];

      const live: Result = {
        origin: "live",
        mediaCaption: media.file.name,
        mediaSub: payload.mediaDescription ?? `${formatBytes(media.file.size)} · ${media.file.type}`,
        verdict: { label: meta.label, score: payload.confidenceScore ?? 0, zone: meta.zone },
        deepfakeProbability: payload.deepfakeProbability,
        summary: payload.summary,
        claims: payload.claims ?? [],
        sources: citations.map((c) => ({
          domain: c.source_name,
          trust: c.trust_score,
          date: "cited by model",
        })),
        telemetry: {
          latency: payload.latencyMs ? `${payload.latencyMs}ms` : "—",
          model: payload.model ?? "Gemini",
        },
      };

      setResult(live);

      void persistAudit(
        {
          claimText: claimedContext || "(no claim supplied)",
          verdict: payload.verdict as Verdict,
          confidenceScore: payload.confidenceScore ?? 0,
          summary: payload.summary ?? "",
          citations,
        },
        media.file
      );
    } catch (err) {
      console.error("Verification request failed:", err);
      setAnalysisError("Couldn't reach the verification service. Check your connection and try again.");
      setResult(null);
    } finally {
      setAnalyzing(false);
    }
  }

  const zoneStyle = result ? ZONE_STYLES[result.verdict.zone] : null;

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
                activeSampleId === sample.id
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-slate-300"
              )}
            >
              {sample.sampleLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr]">
        {/* Input panel */}
        <div className="border-b border-slate-200 p-4 dark:border-slate-800 lg:border-b-0 lg:border-r">
          {activeTab === "upload" ? (
            <>
              <UploadDropzone
                selected={media}
                disabled={analyzing}
                onSelect={(next) => {
                  setMedia(next);
                  setAnalysisError(null);
                }}
                onClear={() => {
                  setMedia(null);
                  setAnalysisError(null);
                }}
              />

              <div className="mt-3">
                <label
                  htmlFor="claimed-context"
                  className="block text-[11px] font-medium text-slate-700 dark:text-slate-300"
                >
                  What is this media claimed to show?{" "}
                  <span className="font-normal text-slate-400 dark:text-slate-600">(optional)</span>
                </label>
                <textarea
                  id="claimed-context"
                  rows={2}
                  value={claimedContext}
                  onChange={(e) => setClaimedContext(e.target.value)}
                  disabled={analyzing}
                  placeholder="e.g. Protest in Paris last night"
                  className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <p className="mt-1 text-[10px] leading-relaxed text-slate-400 dark:text-slate-600">
                  Adding the claim lets DeepTrace check the media against it, not just for
                  manipulation.
                </p>
              </div>

              <button
                type="button"
                onClick={runVerification}
                disabled={!media || analyzing}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-slate-50 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <ScanSearch className="h-3.5 w-3.5" />
                    Run Verification
                  </>
                )}
              </button>

              {analysisError && (
                <p className="mt-2 flex items-start gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-2 text-[11px] leading-relaxed text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                  <TriangleAlert className="mt-0.5 h-3 w-3 shrink-0" />
                  {analysisError}
                </p>
              )}
            </>
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-950">
              {activeTab === "audio" ? (
                <AudioLines className="h-8 w-8 text-slate-400 dark:text-slate-600" />
              ) : (
                <Link2 className="h-8 w-8 text-slate-400 dark:text-slate-600" />
              )}
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {activeTab === "audio" ? "Audio verification" : "URL verification"}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-500">
                  Not available yet. Load a sample to see how it reports, or upload a photo or
                  video to run a live check.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-[11px] text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
              >
                Switch to upload
              </button>
            </div>
          )}

          {result && (
            <dl className="mt-4 space-y-2 border-t border-slate-200 pt-4 font-mono text-[11px] dark:border-slate-800">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-500">Latency</dt>
                <dd className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <Clock className="h-3 w-3" />
                  {result.telemetry.latency}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-500">Model</dt>
                <dd className="flex items-center gap-1 truncate text-slate-700 dark:text-slate-300">
                  <Cpu className="h-3 w-3 shrink-0" />
                  {result.telemetry.model}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-500">Source</dt>
                <dd
                  className={cn(
                    "flex items-center gap-1",
                    result.origin === "live"
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-slate-500 dark:text-slate-500"
                  )}
                >
                  <Radio className={cn("h-3 w-3", result.origin === "live" && "animate-blink")} />
                  {result.origin === "live" ? "Live analysis" : "Sample data"}
                </dd>
              </div>
              {saveState !== "idle" && (
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-500">History</dt>
                  <dd>
                    {saveState === "saving" && (
                      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Saving
                      </span>
                    )}
                    {saveState === "saved" && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                        <Save className="h-3 w-3" />
                        Saved
                      </span>
                    )}
                    {saveState === "signed-out" && (
                      <a
                        href="/login"
                        className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
                      >
                        Sign in to save
                      </a>
                    )}
                    {saveState === "error" && (
                      <span className="flex items-center gap-1 text-rose-600 dark:text-rose-500">
                        <TriangleAlert className="h-3 w-3" />
                        Not saved
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {/* Results panel */}
        <div className="p-4 sm:p-6">
          {!result ? (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-3 text-center">
              <ScanSearch className="h-8 w-8 text-slate-300 dark:text-slate-700" strokeWidth={1.5} />
              <div className="max-w-xs">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  No verification yet
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-500">
                  Upload a photo or video and run a verification, or load one of the samples to
                  see a completed forensic report.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Confidence meter */}
              <div className="mb-6">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <span className={cn("text-sm font-semibold", zoneStyle!.text)}>
                    {result.verdict.label}
                  </span>
                  <span className={cn("font-mono text-2xl font-semibold tabular", zoneStyle!.text)}>
                    {result.verdict.score}%
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 opacity-90">
                  <div
                    className="absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full bg-slate-900 shadow-[0_0_0_2px_white] dark:bg-white dark:shadow-[0_0_0_2px_theme(colors.slate.950)]"
                    style={{ left: `calc(${result.verdict.score}% - 2px)` }}
                    aria-hidden
                  />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
                  <span>Authentic</span>
                  <span>Context Mismatch</span>
                  <span>Manipulated</span>
                </div>
              </div>

              {result.summary && (
                <p className="mb-6 rounded-md border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  {result.summary}
                </p>
              )}

              {typeof result.deepfakeProbability === "number" && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                    <span>Deepfake probability</span>
                    <span className="font-mono tabular text-slate-700 dark:text-slate-300">
                      {result.deepfakeProbability}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={cn("h-full rounded-full", zoneStyle!.bar)}
                      style={{ width: `${result.deepfakeProbability}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Claim breakdown */}
              {result.claims.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
                    Claim Breakdown — Extracted vs. Claimed
                  </h3>
                  <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-800">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950">
                          <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Field</th>
                          <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Extracted (media)</th>
                          <th scope="col" className="px-3 py-2 font-medium text-slate-500 dark:text-slate-500">Claimed</th>
                          <th scope="col" className="w-8 px-3 py-2" />
                        </tr>
                      </thead>
                      <tbody>
                        {result.claims.map((claim, i) => (
                          <tr key={`${claim.field}-${i}`} className="border-t border-slate-200 dark:border-slate-800">
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
              )}

              {/* Sources */}
              <div>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  Cited Web Sources
                </h3>
                {result.sources.length === 0 ? (
                  <p className="rounded-md border border-slate-200 px-3 py-2.5 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-500">
                    No external sources cited. This verdict comes from analysis of the media
                    itself — cross-referencing against live web sources is not enabled on this
                    request.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {result.sources.map((source) => (
                      <div
                        key={source.domain}
                        className="flex items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-800"
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
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
