import { CustomCursor } from "@/components/cursor/CustomCursor";
import { TopNav }       from "@/components/nav/TopNav";
import { Hero }         from "@/components/sections/Hero";
import { Problem }      from "@/components/sections/Problem";
import { HowItWorks }   from "@/components/sections/HowItWorks";
import { FeaturesGrid } from "@/components/blocks/FeaturesGrid";
import { AppPreview }   from "@/components/sections/AppPreview";
import { ClosingCTA }   from "@/components/sections/ClosingCTA";
import { SiteFooter }   from "@/components/blocks/SiteFooter";

export default function Home() {
  return (
    <div style={{ background: "#050810", minHeight: "100vh" }}>
      <TopNav />
      <CustomCursor />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <section id="features">
          <FeaturesGrid />
        </section>
        <AppPreview />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
