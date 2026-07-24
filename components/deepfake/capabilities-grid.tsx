import { CheckCircle2 } from "lucide-react";

const CAPABILITIES = [
  "Face-swap & identity substitution detection",
  "Voice cloning & synthetic speech detection",
  "Lip-sync and audio-visual mismatch detection",
  "Diffusion-model prompt reconstruction",
  "Frame interpolation & temporal artifact analysis",
  "Recycled / relocated media detection",
  "Compression & re-encoding history analysis",
  "Batch screening via API for moderation queues",
];

export function CapabilitiesGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {CAPABILITIES.map((capability) => (
        <div key={capability} className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{capability}</span>
        </div>
      ))}
    </div>
  );
}
