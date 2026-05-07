import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { TrustStripe } from "@/components/sections/trust-stripe";
import { PatientWall } from "@/components/sections/patient-wall";
import { ConfiguratorSection } from "@/components/sections/configurator-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ClinicTour } from "@/components/sections/clinic-tour";
import { Trust } from "@/components/sections/trust";
import { GoogleReviewsSection } from "@/components/sections/google-reviews";
import { PatientVideos } from "@/components/sections/patient-videos";
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
        <TrustStripe />
        <PatientWall />
        <HowItWorks />
        <ClinicTour />
        <ConfiguratorSection />
        <Trust />
        <GoogleReviewsSection />
        <PatientVideos />
        <PricingComparison />
        <Travel />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
