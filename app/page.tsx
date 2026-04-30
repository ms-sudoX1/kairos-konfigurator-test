import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { ConfiguratorSection } from "@/components/sections/configurator-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Trust } from "@/components/sections/trust";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { Travel } from "@/components/sections/travel";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <ConfiguratorSection />
        <HowItWorks />
        <Trust />
        <PricingComparison />
        <Travel />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
