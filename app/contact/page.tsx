import type { Metadata } from "next";
import { Building2, CalendarClock, LifeBuoy } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact — DeepTrace AI",
  description: "Reach the DeepTrace AI team for general inquiries, enterprise pilots, demos, or support.",
};

const CHANNELS = [
  {
    icon: Building2,
    title: "Enterprise inquiries",
    body: "Pilots, custom deployments, and SLAs.",
    contact: "enterprise@deeptrace.ai",
  },
  {
    icon: CalendarClock,
    title: "Request a demo",
    body: "A 30-minute walkthrough with your own sample media.",
    contact: "demo@deeptrace.ai",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    body: "API issues, billing, and account questions.",
    contact: "support@deeptrace.ai",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team building this"
        body="For anything not covered below, the form reaches us directly — we reply within one business day."
      />

      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <ContactForm />
            </div>

            <div className="space-y-4">
              {CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.title} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <Icon className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                    <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{channel.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{channel.body}</p>
                    <p className="mt-2 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">{channel.contact}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
