import ModularColdRoomScroll from '@/components/ModularColdRoomScroll';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUs';
import ProcessSection from '@/components/sections/ProcessSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import BrandsSection from '@/components/sections/BrandsSection';
import ContactSection from '@/components/sections/ContactSection';
import CTAStrip from '@/components/sections/CTAStrip';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Scrollytelling */}
      <ModularColdRoomScroll />

      {/* Main Content Sections */}
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <IndustriesSection />
      <BrandsSection />
      <ContactSection />
      <CTAStrip />
    </div>
  );
}
