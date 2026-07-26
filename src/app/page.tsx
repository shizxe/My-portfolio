import HeroSection from "@/components/hero/HeroSection";
import BeginningSection from "@/components/sections/BeginningSection";
import InventorySection from "@/components/sections/InventorySection";
import QuestsSection from "@/components/sections/QuestsSection";
import JourneySection from "@/components/sections/JourneySection";
import { ChapterLearning } from "@/components/sections/ChapterLearning";
import PortalSection, { Footer } from "@/components/sections/PortalSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BeginningSection />
      <InventorySection />
      <ChapterLearning />
      <QuestsSection />
      <JourneySection />
      <PortalSection />
      <Footer />
    </>
  );
}
