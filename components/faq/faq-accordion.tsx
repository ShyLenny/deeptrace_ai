import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900 marker:content-none dark:text-slate-100">
              {item.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 dark:text-slate-600" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
