import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeader } from "@/components/marketing/section-header";
import { ModalityDetection } from "@/components/deepfake/modality-detection";
import { CapabilitiesGrid } from "@/components/deepfake/capabilities-grid";
import { AccuracyStats } from "@/components/deepfake/accuracy-stats";
import { ResponsibleAiNotice } from "@/components/marketing/responsible-ai-notice";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Deepfake Detection — DeepTrace AI",
  description: "How DeepTrace detects image, audio, and video deepfakes, with accuracy metrics and known limitations.",
};

export default function DeepfakeDetectionPage() {
  return (
    <main>
      <PageHero
        eyebrow="Deepfake Detection"
        title="Synthetic media, caught at the pixel and waveform level"
        body="DeepTrace doesn't just classify — it points to the specific artifact that gave a fake away, so a reviewer can see the evidence, not just trust a score."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="How detection works"
            title="A dedicated forensic pass for every modality"
          />
          <ModalityDetection />
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="Detection capabilities" title="What the engine checks for" />
          <CapabilitiesGrid />
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="Accuracy metrics"
            title="Benchmarked, not just claimed"
            body="Figures below are from internal benchmark sets and will vary on real-world traffic. We publish methodology on request."
          />
          <AccuracyStats />

          <ResponsibleAiNotice
            points={[
              "No detector is infallible — high-quality synthetic media can evade detection, and heavily compressed authentic media can trigger false positives.",
              "Scores are decision support, not adjudication. High-stakes verdicts (legal, editorial, moderation) should include human review.",
              "Detection models are retrained regularly as generation techniques evolve; a clean score reflects current model knowledge, not a permanent guarantee.",
              "DeepTrace does not store submitted media longer than needed to return a verdict, unless retention is explicitly enabled for audit purposes.",
            ]}
          />
        </div>
      </section>

      <CtaBand
        eyebrow="See it catch a fake"
        title="Run a sample manipulated clip through the sandbox."
        body="Load one of the pre-built samples and see the artifact-level evidence behind the verdict."
        primary={{ label: "Try the Sandbox", href: "/#sandbox" }}
        secondary={{ label: "View Context Verification", href: "/context-verification" }}
      />
    </main>
  );
}
