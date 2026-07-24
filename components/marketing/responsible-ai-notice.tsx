import { TriangleAlert } from "lucide-react";

export function ResponsibleAiNotice({
  title = "Limitations & responsible use",
  points,
}: {
  title?: string;
  points: string[];
}) {
  return (
    <div className="mt-10 rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
      <div className="flex items-center gap-2">
        <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-400">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {points.map((point) => (
          <li key={point} className="text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/80">
            · {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
