import type { Metadata } from "next";
import { Target, Telescope, ShieldAlert, ScanSearch, Users } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeader } from "@/components/marketing/section-header";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "About — DeepTrace AI",
  description: "Why DeepTrace AI exists, and why trust in media is worth building infrastructure for.",
};

const WHY_TRUST = [
  {
    icon: ShieldAlert,
    title: "The gap is context, not pixels",
    body: "Most viral misinformation uses real, unaltered media — the manipulation is in the caption. Detection tools built only for deepfakes miss the majority of cases.",
  },
  {
    icon: ScanSearch,
    title: "A verdict without evidence isn't trustworthy",
    body: "A confidence score alone asks for blind faith in a model. We show the sources and the extracted claims behind every number.",
  },
  {
    icon: Users,
    title: "The people who need this can't wait",
    body: "Editors, moderators, and civic responders make calls in minutes, not days. Verification has to run at the speed of a newsroom, not a research paper.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Built because 'looks real' stopped being good enough"
        body="DeepTrace AI started as an entry in an open innovation track focused on multimodal AI. It became something teams wanted to actually use."
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="Our story" title="From a hackathon prototype to daily infrastructure" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            <p>
              We built the first version of DeepTrace in a single weekend, trying to answer a
              narrow question: could a multimodal model tell the difference between a real photo
              paired with a false story, and one paired with a true one — without any
              intermediate transcription or captioning step to lose context along the way?
            </p>
            <p>
              Gemma 4&apos;s native multimodal reasoning made that possible. But the more we
              tested it against real viral claims, the clearer it became that detection alone
              wasn&apos;t the hard part — showing our work was. A percentage with no citation is
              just another thing to distrust.
            </p>
            <p>
              So the product became a full engine: claim extraction, live source
              cross-referencing, and an audit trail built to be read by a person, not just a
              machine. What started as a hackathon submission is now built to run in newsroom and
              platform moderation pipelines.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Give anyone who has to decide whether media is real a fast, evidence-backed answer
                — not just a black-box score.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <Telescope className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                A web where verification is a routine step before publishing or sharing — as
                normal as a spell-check, and just as fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader eyebrow="Why trust matters" title="What we've learned building this" />
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {WHY_TRUST.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
                  <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Join us"
        title="We're a small team — reach out directly."
        body="Whether it's a partnership, a pilot, or a question about the research, we read every message."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the Blog", href: "/blog" }}
      />
    </main>
  );
}
