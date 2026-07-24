const SDKS = [
  { name: "Python", install: "pip install deeptrace" },
  { name: "Node.js", install: "npm install @deeptrace/sdk" },
  { name: "cURL", install: "curl https://api.deeptrace.ai/v1/verify" },
];

export function SdkCards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {SDKS.map((sdk) => (
        <div key={sdk.name} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{sdk.name}</p>
          <p className="mt-2 overflow-x-auto whitespace-nowrap rounded bg-slate-100 px-2.5 py-1.5 font-mono text-[11px] text-slate-700 dark:bg-slate-950 dark:text-slate-300">
            {sdk.install}
          </p>
        </div>
      ))}
    </div>
  );
}
