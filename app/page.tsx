import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Vectors } from "@/components/vectors";
import { Architecture } from "@/components/architecture";
import { SiteFooter } from "@/components/site-footer";

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
