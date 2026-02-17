
import ModularColdRoomScroll from '@/components/ModularColdRoomScroll';
import AboutCompanySection from '@/components/sections/AboutCompanySection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUs';
import ProcessSection from '@/components/sections/ProcessSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import BrandsSection from '@/components/sections/BrandsSection';
import ContactSection from '@/components/sections/ContactSection';
import CTAStrip from '@/components/sections/CTAStrip';

export default function Home() {
  return (
    <div className="flex flex-col bg-[#0D0B1A]">
      {/* Hero Section with Scrollytelling */}
      <ModularColdRoomScroll />

      {/* Main Content Sections */}
      <AboutCompanySection />
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
