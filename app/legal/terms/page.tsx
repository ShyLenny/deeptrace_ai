import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Terms of Service — DeepTrace AI" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="July 1, 2026"
      sections={[
        {
          heading: "Use of the service",
          paragraphs: [
            "DeepTrace AI provides automated media verification. You may use the service for lawful purposes only, and must not submit media you do not have the right to analyze under applicable law.",
          ],
        },
        {
          heading: "No adjudicative guarantee",
          paragraphs: [
            "Verdicts and confidence scores are decision support, not a legal or factual determination. DeepTrace AI is not liable for decisions made solely on the basis of a verification result without independent review.",
          ],
        },
        {
          heading: "Plans and billing",
          paragraphs: [
            "Paid plans are billed monthly or annually as selected at signup. Usage beyond plan limits may be billed at the applicable overage rate or throttled, depending on plan tier.",
          ],
        },
        {
          heading: "Termination",
          paragraphs: [
            "You may cancel at any time from your account settings. We may suspend accounts that violate these terms or applicable law.",
          ],
        },
      ]}
    />
  );
}
