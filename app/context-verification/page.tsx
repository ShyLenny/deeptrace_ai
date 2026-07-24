import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeader } from "@/components/marketing/section-header";
import { PipelineSteps } from "@/components/context/pipeline-steps";
import { VectorCards } from "@/components/context/vector-cards";
import { ResponsibleAiNotice } from "@/components/marketing/responsible-ai-notice";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Context Verification — DeepTrace AI",
  description: "How DeepTrace extracts claims, matches evidence, scores confidence, and verifies sources.",
};

export default function ContextVerificationPage() {
  return (
    <main>
      <PageHero
        eyebrow="Context Verification"
        title="Real media, false story — this is how we catch it"
        body="Most misinformation doesn't use fake pixels. It pairs authentic media with a fabricated claim about where, when, or what it shows. Context verification is built specifically to catch that gap."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="How it works"
            title="Four stages, fully inspectable"
            body="Nothing about the verdict is a black box — every stage below produces an artifact you can read."
          />
          <PipelineSteps />
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="Common patterns"
            title="The vectors context verification is built for"
          />
          <VectorCards />

          <ResponsibleAiNotice
            title="Limitations"
            points={[
              "Evidence matching depends on the claim having been covered by an indexed source — breaking news with no prior coverage may return a low-confidence, not a false, result.",
              "Confidence scores reflect source agreement, not legal or editorial certainty. Always route high-stakes verdicts through human review.",
              "Satire, opinion, and clearly-labeled fiction are out of scope — the engine verifies factual claims, not framing or tone.",
            ]}
          />
        </div>
      </section>

      <CtaBand
        eyebrow="Try it live"
        title="Load a real out-of-context example in the sandbox."
        body="See the full claim breakdown and cited sources behind an 87% context-mismatch verdict."
        primary={{ label: "Try the Sandbox", href: "/#sandbox" }}
        secondary={{ label: "View Deepfake Detection", href: "/deepfake-detection" }}
      />
    </main>
  );
}
