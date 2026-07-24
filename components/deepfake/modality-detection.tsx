import { ImageIcon, AudioLines, Video } from "lucide-react";

const MODALITIES = [
  {
    icon: ImageIcon,
    title: "Image",
    body: "Detects generative-model fingerprints, inconsistent lighting and reflections, and compression artifacts inconsistent with the claimed camera source.",
    signals: ["Diffusion/GAN artifact fingerprinting", "Lighting & shadow consistency", "Sensor noise pattern analysis"],
  },
  {
    icon: AudioLines,
    title: "Audio",
    body: "Identifies voice-cloning artifacts in pitch and formant patterns, and flags splice points where clips have been cut and recombined.",
    signals: ["Voice cloning artifact detection", "Waveform splice-point analysis", "Prosody & breathing pattern checks"],
  },
  {
    icon: Video,
    title: "Video",
    body: "Combines frame-level image checks with temporal consistency — lip-sync alignment, blink rate, and motion coherence across frames.",
    signals: ["Lip-sync & viseme alignment", "Frame interpolation artifacts", "Face-swap boundary detection"],
  },
];

export function ModalityDetection() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {MODALITIES.map((modality) => {
        const Icon = modality.icon;
        return (
          <article
            key={modality.title}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {modality.title} deepfake detection
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {modality.body}
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-4 dark:border-slate-800">
              {modality.signals.map((signal) => (
                <li key={signal} className="font-mono text-[11px] text-slate-500 dark:text-slate-500">
                  · {signal}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
