import type { Metadata } from "next";
import { BookOpen, KeyRound, Webhook, Gauge } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeader } from "@/components/marketing/section-header";
import { CodeBlock } from "@/components/developers/code-block";
import { EndpointTable } from "@/components/developers/endpoint-table";
import { SdkCards } from "@/components/developers/sdk-cards";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "API & Developers — DeepTrace AI",
  description: "Integrate DeepTrace verification into your own moderation or editorial pipeline.",
};

const DOC_SECTIONS = [
  { icon: BookOpen, title: "Getting Started", body: "Create a project, generate a key, run your first request." },
  { icon: KeyRound, title: "Authentication", body: "Bearer tokens, key rotation, and scoped permissions." },
  { icon: Webhook, title: "Webhooks", body: "Receive async verdicts for batch and long-running jobs." },
  { icon: Gauge, title: "Rate Limits", body: "Per-tier limits, retry guidance, and usage headers." },
];

export default function DevelopersPage() {
  return (
    <main>
      <PageHero
        eyebrow="API & Developers"
        title="Verification as an API call"
        body="The same engine behind the dashboard, available as a REST API. Submit media, get a scored, cited verdict back — synchronously or via webhook."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="API overview" title="One endpoint to submit, one to retrieve" />
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Submit an image, audio clip, video, or social post URL to <code className="font-mono text-xs">/v1/verify</code>.
                Synchronous requests return a verdict in-line for most media; larger files return a job
                ID and deliver the result via webhook.
              </p>
              <CodeBlock
                label="Request"
                code={`curl -X POST https://api.deeptrace.ai/v1/verify \\
  -H "Authorization: Bearer $DEEPTRACE_API_KEY" \\
  -F "media=@clip.mp4" \\
  -F "claimed_context=Filmed at tonight's rally"`}
              />
            </div>
            <div className="lg:mt-9">
              <CodeBlock
                label="Response · 200 OK"
                code={`{
  "id": "vrf_8f2c1a",
  "verdict": "context_mismatch",
  "confidence": 87,
  "claims": [
    { "field": "location", "status": "mismatch" },
    { "field": "date", "status": "mismatch" }
  ],
  "sources": [
    { "domain": "reuters.com", "trust": 96 }
  ],
  "latency_ms": 340
}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="Authentication"
            title="Bearer tokens, scoped per project"
            body="Every request is authenticated with an API key generated in your dashboard. Keys are scoped to a project and can be rotated without downtime."
          />
          <CodeBlock
            label="Authorization header"
            code={`Authorization: Bearer dt_live_51H8x...`}
          />
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="Example endpoints" title="The core surface area" />
          <EndpointTable />
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="SDKs" title="Official client libraries" />
          <SdkCards />
        </div>
      </section>

      <section id="documentation" className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="Documentation" title="What's covered in the full docs" />
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
            {DOC_SECTIONS.map((doc) => {
              const Icon = doc.icon;
              return (
                <div key={doc.title} className="bg-white p-5 dark:bg-slate-900">
                  <Icon className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{doc.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{doc.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready to integrate?"
        title="Generate an API key and make your first request."
        body="Free tier includes 100 verifications a month — no credit card required."
        primary={{ label: "Get an API Key", href: "/dashboard" }}
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </main>
  );
}
