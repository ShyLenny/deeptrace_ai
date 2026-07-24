import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
        {title}
      </h2>
      {body && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          {body}
        </p>
      )}
    </div>
  );
}
