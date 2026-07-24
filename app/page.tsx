import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Vectors } from "@/components/vectors";
import { Architecture } from "@/components/architecture";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Vectors />
        <Architecture />
      </main>
      <SiteFooter />
    </>
  );
}
