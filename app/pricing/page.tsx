import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Pricing — DeepTrace AI",
  description: "Free, Pro, and Enterprise plans for DeepTrace AI verification.",
};

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Plans that scale from a sandbox to a moderation queue"
        body="All plans include the full detection engine. Higher tiers add volume, modalities, and integration support."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <PricingTiers />
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500">
            Have questions about limits or data handling? See the{" "}
            <a href="/faq" className="text-indigo-600 underline underline-offset-2 dark:text-indigo-400">
              pricing FAQ
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Still deciding?"
        title="Run a few verifications on the free tier first."
        body="No credit card required. Upgrade whenever your volume outgrows it."
        primary={{ label: "Get Started Free", href: "/dashboard" }}
        secondary={{ label: "Talk to Sales", href: "/contact" }}
      />
    </main>
  );
}
