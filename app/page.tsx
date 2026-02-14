import { ContactSection } from "@/components/landing/contact";
import { CoreProductsSection } from "@/components/landing/core-products";
import Ecosystemarchitecture from "@/components/landing/Ecosystem";
import { EcosystemArchitectureSection } from "@/components/landing/ecosystem-architecture";
import { FAQSection } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero";
import { SecureByDesignSection } from "@/components/landing/secure-by-design";
import { SecuritySection } from "@/components/landing/security";
import { WhyGrowmaxSection } from "@/components/landing/why-growmax";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <CoreProductsSection />
      <SecuritySection />
      <EcosystemArchitectureSection />
      <FeaturesSection />
      <Ecosystemarchitecture />
      <WhyGrowmaxSection />
      <SecureByDesignSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
