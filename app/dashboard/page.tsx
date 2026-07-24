import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Dashboard Demo — DeepTrace AI",
  description: "A live preview of the DeepTrace verification workspace — click a history row to inspect a real verdict.",
};

export default function DashboardDemoPage() {
  return (
    <main>
      <PageHero
        eyebrow="Dashboard Demo"
        title="Your team's verification workspace"
        body="This is a live preview using sample data — click any row in Recent Verifications to inspect its evidence timeline, sources, and deepfake score."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <DashboardPreview />
        </div>
      </section>

      <CtaBand
        eyebrow="Bring your own data"
        title="Connect the API and this becomes your real dashboard."
        body="Every verification your team runs — via the API, dashboard, or moderation integration — lands here automatically."
        primary={{ label: "Get Started Free", href: "/pricing" }}
        secondary={{ label: "Read API Docs", href: "/developers" }}
      />
    </main>
  );
}
