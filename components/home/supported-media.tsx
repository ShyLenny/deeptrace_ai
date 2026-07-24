import { ImageIcon, AudioLines, Video, FileText } from "lucide-react";

const MEDIA = [
  {
    icon: ImageIcon,
    title: "Image",
    body: "Geolocation, EXIF timestamps, and generative-artifact fingerprinting on photos and screenshots.",
  },
  {
    icon: AudioLines,
    title: "Audio",
    body: "Waveform splice detection and dialect-aware transcription for voice notes and broadcast clips.",
  },
  {
    icon: Video,
    title: "Video",
    body: "Frame-level deepfake detection, lip-sync consistency, and scene-recycling checks.",
  },
  {
    icon: FileText,
    title: "Text",
    body: "Claim extraction and source cross-referencing for articles, captions, and social posts.",
  },
];

export function SupportedMedia() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Supported media
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            One engine, every format your team receives
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MEDIA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-600/10 dark:bg-indigo-400/10">
                  <Icon className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
