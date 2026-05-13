import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { AppShowcaseSection } from "@/components/sections/AppShowcaseSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { MacOSBadge } from "@/components/sections/MacOSBadge";
import { PricingSection } from "@/components/sections/PricingSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <HeroSection />
      <SocialProofBar />
      <AppShowcaseSection />
      <StatsBar />
      <HowItWorksSection />
      <FeaturesSection />
      <MacOSBadge />
      <PricingSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
}
