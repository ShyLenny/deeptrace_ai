import { Newspaper, ShieldCheck, MessagesSquare, Building2 } from "lucide-react";

const USE_CASES = [
  {
    icon: Newspaper,
    title: "Newsroom fact-checking",
    body: "Verify user-submitted footage and viral clips before they run, with a citation trail editors can defend.",
  },
  {
    icon: MessagesSquare,
    title: "Platform content moderation",
    body: "Route flagged uploads through the API to pre-screen deepfakes and out-of-context claims before human review.",
  },
  {
    icon: ShieldCheck,
    title: "Civic & election integrity",
    body: "Detect recycled protest footage and fabricated official statements during high-risk news cycles.",
  },
  {
    icon: Building2,
    title: "Enterprise brand protection",
    body: "Catch synthetic executive video and audio used in impersonation or investor-fraud attempts.",
  },
];

export function UseCases() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {USE_CASES.map((useCase) => {
        const Icon = useCase.icon;
        return (
          <div
            key={useCase.title}
            className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-indigo-600/10 dark:bg-indigo-400/10">
              <Icon className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{useCase.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {useCase.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
