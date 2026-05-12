import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppShowcaseSection } from "@/components/sections/AppShowcaseSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <HeroSection />
      <AppShowcaseSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
}
