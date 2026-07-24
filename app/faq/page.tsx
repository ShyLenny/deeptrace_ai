import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "FAQ — DeepTrace AI",
  description: "Answers on privacy, data security, AI accuracy, supported formats, and enterprise integration.",
};

const SECTIONS = [
  {
    title: "Privacy",
    items: [
      {
        question: "Do you store the media I submit?",
        answer:
          "By default, submitted media is retained only as long as needed to return a verdict, then deleted. Enterprise plans can enable extended retention for audit purposes, scoped per workspace.",
      },
      {
        question: "Is my data used to train your models?",
        answer:
          "No. Submitted media and verification results are not used for model training unless you explicitly opt in through an enterprise data-sharing agreement.",
      },
    ],
  },
  {
    title: "Data security",
    items: [
      {
        question: "How is data encrypted?",
        answer:
          "All data is encrypted in transit via TLS 1.2+ and at rest with AES-256. API keys are hashed and never stored or transmitted in plaintext after creation.",
      },
      {
        question: "Do you support single sign-on?",
        answer: "SSO (SAML and OIDC) is available on Enterprise plans, along with audit logging and role-based access control.",
      },
    ],
  },
  {
    title: "AI accuracy",
    items: [
      {
        question: "How accurate is DeepTrace?",
        answer:
          "Benchmark figures are published on the Deepfake Detection page and updated as models are retrained. Accuracy varies by media quality and modality — treat every score as decision support, not a final ruling.",
      },
      {
        question: "Can DeepTrace be wrong?",
        answer:
          "Yes. No detector is infallible, and both false positives and false negatives are possible. High-stakes decisions should include human review of the evidence DeepTrace surfaces.",
      },
    ],
  },
  {
    title: "Supported file formats",
    items: [
      {
        question: "What image formats are supported?",
        answer: "JPEG, PNG, WebP, and HEIC, up to 25 MB per file.",
      },
      {
        question: "What audio and video formats are supported?",
        answer: "MP3, WAV, and M4A for audio; MP4 and MOV for video, up to 500 MB per file on Pro and Enterprise plans.",
      },
    ],
  },
  {
    title: "Enterprise integration",
    items: [
      {
        question: "Can DeepTrace run on our own infrastructure?",
        answer: "Yes — Enterprise plans support dedicated cloud or on-premise deployment for teams with strict data-residency requirements.",
      },
      {
        question: "Do you offer a service-level agreement?",
        answer: "Enterprise plans include custom uptime and response-time SLAs, backed by a dedicated support engineer.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Common questions, answered directly"
      />

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {SECTIONS.map((section) => (
            <FaqAccordion key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Still have questions?"
        title="Send us a message directly."
        body="We read every message and reply within one business day."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
