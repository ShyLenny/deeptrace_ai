import { Hero } from "@/components/home/hero";
import { SupportedMedia } from "@/components/home/supported-media";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBand } from "@/components/marketing/cta-band";

export default function Home() {
  return (
    <main>
      <Hero />
      <SupportedMedia />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaBand
        eyebrow="Get started"
        title="Verify your first piece of media in under a minute."
        body="No credit card required. Run the sandbox, connect the API, or talk to our team about a pilot."
        primary={{ label: "Launch Live Verification", href: "/dashboard" }}
        secondary={{ label: "Talk to Sales", href: "/contact" }}
      />
    </main>
  );
}
