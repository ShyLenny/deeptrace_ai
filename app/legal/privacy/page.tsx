import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy Policy — DeepTrace AI" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 1, 2026"
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "We collect account information you provide (name, email, organization), media you submit for verification, and usage data such as API request counts and timestamps.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "Submitted media is used solely to generate a verification result and is not used to train models unless you opt in through an enterprise data-sharing agreement. Usage data is used for billing, rate limiting, and service reliability.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "Media is deleted after a verdict is returned by default. Enterprise workspaces may enable extended retention for audit purposes; retained data is deletable on request.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may request access to, correction of, or deletion of your account data at any time by contacting privacy@deeptrace.ai.",
          ],
        },
      ]}
    />
  );
}
