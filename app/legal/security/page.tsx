import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Security — DeepTrace AI" };

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Security"
      updated="July 1, 2026"
      sections={[
        {
          heading: "Encryption",
          paragraphs: [
            "Data is encrypted in transit using TLS 1.2 or higher, and at rest using AES-256. API keys are hashed and cannot be retrieved in plaintext after creation.",
          ],
        },
        {
          heading: "Access control",
          paragraphs: [
            "Enterprise workspaces support SSO (SAML and OIDC), role-based access control, and full audit logging of API and dashboard activity.",
          ],
        },
        {
          heading: "Infrastructure",
          paragraphs: [
            "The service runs on isolated cloud infrastructure with automated backups and monitored uptime. Enterprise plans support dedicated or on-premise deployment.",
          ],
        },
        {
          heading: "Reporting a vulnerability",
          paragraphs: [
            "If you believe you've found a security issue, email security@deeptrace.ai. We aim to acknowledge reports within 48 hours.",
          ],
        },
      ]}
    />
  );
}
