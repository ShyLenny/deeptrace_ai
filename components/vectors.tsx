import { MapPin, Languages, ScanFace } from "lucide-react";

const VECTORS = [
  {
    code: "VEC.01",
    icon: MapPin,
    title: "Cheapfakes & Context Hijacking",
    pattern: "Real image + false event, location, or date",
    example:
      "A stadium celebration photo from 2019 Madrid is recirculated captioned as “riots breaking out tonight” in an unrelated city.",
    detects: "Geolocation, EXIF timestamps, and shadow-angle analysis against the claimed narrative.",
  },
  {
    code: "VEC.02",
    icon: Languages,
    title: "Audio & Translation Distortion",
    pattern: "Clipped voice notes & manipulated translation summaries",
    example:
      "A 41-second voice note is cut mid-sentence and paired with a caption inventing an official statement never made.",
    detects: "Waveform splice points, dialect-aware transcription, and translation-to-source consistency.",
  },
  {
    code: "VEC.03",
    icon: ScanFace,
    title: "Synthetic / Generated Visuals",
    pattern: "AI-generated imagery presented as photographic evidence",
    example:
      "A fabricated image of an event that never occurred is shared as an eyewitness photograph.",
    detects: "Generative artifact fingerprinting and diffusion-model prompt reconstruction.",
  },
];

export function Vectors() {
  return (
    <section id="vectors" className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Vector Benchmarks
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Misinformation vectors addressed
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {VECTORS.map((vector) => {
            const Icon = vector.icon;
            return (
              <article
                key={vector.code}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-slate-500 dark:text-slate-500" strokeWidth={1.75} />
                  <span className="font-mono text-[10px] tracking-wide text-slate-400 dark:text-slate-600">
                    {vector.code}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {vector.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                  {vector.pattern}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {vector.example}
                </p>

                <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
                    DeepTrace detects
                  </p>
                  <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300">{vector.detects}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
