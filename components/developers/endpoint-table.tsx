import { cn } from "@/lib/utils";

const ENDPOINTS = [
  { method: "POST", path: "/v1/verify", body: "Submit an image, audio, video, or URL for verification" },
  { method: "GET", path: "/v1/verify/{id}", body: "Retrieve a verification report by ID" },
  { method: "POST", path: "/v1/verify/batch", body: "Submit up to 500 items for asynchronous batch scoring" },
  { method: "GET", path: "/v1/verify/{id}/audit", body: "Retrieve the exportable citation trail as JSON or PDF" },
  { method: "GET", path: "/v1/usage", body: "Retrieve current billing period usage and rate-limit status" },
];

const METHOD_STYLES: Record<string, string> = {
  POST: "bg-indigo-600/10 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400",
  GET: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
};

export function EndpointTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-950">
            <th scope="col" className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Method
            </th>
            <th scope="col" className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Endpoint
            </th>
            <th scope="col" className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {ENDPOINTS.map((endpoint) => (
            <tr key={endpoint.path} className="border-t border-slate-200 dark:border-slate-800">
              <td className="px-4 py-3">
                <span className={cn("rounded px-1.5 py-0.5 font-mono text-[11px] font-medium", METHOD_STYLES[endpoint.method])}>
                  {endpoint.method}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-200">{endpoint.path}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{endpoint.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
