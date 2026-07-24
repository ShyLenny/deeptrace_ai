import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeader } from "@/components/marketing/section-header";
import { ProductMockup } from "@/components/product/product-mockup";
import { UseCases } from "@/components/product/use-cases";
import { HowItWorks } from "@/components/home/how-it-works";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Product — DeepTrace AI",
  description: "How the DeepTrace verification engine extracts, cross-references, and scores multimodal claims.",
};

export default function ProductPage() {
  return (
    <main>
      <PageHero
        eyebrow="Product"
        title="One engine. Every claim, every format."
        body="DeepTrace AI is a verification engine, not a single model. It extracts claims natively from pixels and audio, checks them against a live index of trusted sources, and returns a scored, citable verdict — the same workflow a forensic analyst would run, in seconds instead of hours."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="The verification engine"
                title="A pipeline, not a single classifier"
              />
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Most detection tools stop at a single number. DeepTrace exposes every stage of the
                reasoning: what was extracted from the media itself, what the caption or headline
                claims, and what independently published sources say actually happened. Each
                stage is inspectable — click through the tabs to see what a live verification
                looks like.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Because Gemma 4 reasons over raw pixels and waveforms directly, there&apos;s no
                intermediate OCR or speech-to-text step to lose context in — the model sees what a
                human reviewer would see.
              </p>
            </div>
            <ProductMockup />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            eyebrow="Supported use cases"
            title="Built around how verification teams actually work"
          />
          <UseCases />
        </div>
      </section>

      <HowItWorks />

      <CtaBand
        eyebrow="See it on your own media"
        title="Run a verification on your next uncertain upload."
        body="Try the sandbox with sample media, or connect the API to your existing moderation pipeline."
        primary={{ label: "Try the Sandbox", href: "/#sandbox" }}
        secondary={{ label: "Read API Docs", href: "/developers" }}
      />
    </main>
  );
}
