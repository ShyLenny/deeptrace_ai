import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { SolutionsExplorer } from "@/components/solutions/solutions-explorer";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Solutions — DeepTrace AI",
  description: "How newsrooms, governments, law enforcement, platforms, enterprises, and educators use DeepTrace AI.",
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Built for whoever has to answer 'is this real?' first"
        body="Every audience below needs the same underlying verification — but a different workflow around it. Pick yours."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SolutionsExplorer />
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure where you fit?"
        title="Talk to our team about your specific workflow."
        body="We work with teams at every scale, from a single fact-checking desk to platform-wide moderation pipelines."
        primary={{ label: "Request a Demo", href: "/contact" }}
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </main>
  );
}
