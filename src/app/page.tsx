import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PortalSequence } from "@/components/intro/PortalSequence";
import { FeaturesGrid } from "@/components/blocks/FeaturesGrid";
import { WaitlistCTA } from "@/components/blocks/WaitlistCTA";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { StickyNav } from "@/components/blocks/StickyNav";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <StickyNav />
      <CustomCursor />
      <PortalSequence />
      <FeaturesGrid />
      <WaitlistCTA />
      <SiteFooter />
    </div>
  );
}
