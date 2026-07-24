const STATS = [
  { value: "96.1%", label: "Image deepfake detection accuracy", note: "Internal benchmark, n=12,400" },
  { value: "91.4%", label: "Voice-clone detection accuracy", note: "Internal benchmark, n=6,800" },
  { value: "88.7%", label: "Video face-swap detection accuracy", note: "Internal benchmark, n=4,100" },
  { value: "2.3%", label: "False positive rate, authentic media", note: "Held-out validation set" },
];

export function AccuracyStats() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-white p-6 dark:bg-slate-900">
          <p className="font-mono text-3xl font-semibold tabular text-slate-900 dark:text-slate-100">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{stat.label}</p>
          <p className="mt-1 font-mono text-[10px] text-slate-400 dark:text-slate-600">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}
