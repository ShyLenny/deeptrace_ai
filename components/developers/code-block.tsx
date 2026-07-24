export function CodeBlock({ label, code }: { label?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      {label && (
        <div className="border-b border-slate-800 px-4 py-2 font-mono text-[11px] text-slate-500">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-slate-300">{code}</code>
      </pre>
    </div>
  );
}
