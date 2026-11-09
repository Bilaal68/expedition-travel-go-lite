import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ServicesStrip from '../components/home/ServicesStrip';
import TrustIntro from '../components/home/TrustIntro';
import FeaturedTours from '../components/home/FeaturedTours';
import PopularDestinations from '../components/home/PopularDestinations';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AirlinePartners from '../components/home/AirlinePartners';
import CTASection from '../components/home/CTASection';

export default function Home() {
  useEffect(() => {
    document.title = "Expedition Travel – Go Lite | Distinctive Ethiopian Expeditions & Logistics";
  }, []);

  return (
    <div className="flex flex-col bg-[#F8F6F0]">
      {/* 1. Hero: Cinematic full-bleed with transparent navigation overlay */}
      <Hero />

      {/* 2. Services Strip: Quick access to the 4 core pillars */}
      <ServicesStrip />

      {/* 3. About: Company credentials, ETAA license MOT/ETA/2024/042, Hana Lema */}
      <TrustIntro />

      {/* 4. Core Services: 4 distinctive service presentations */}
      <FeaturedTours />

      {/* 5. Destinations: Immersive illustrative discovery */}
      <PopularDestinations />

      {/* 6. Why Choose Us: Institutional rigor, regional knowledge, corporate workflows */}
      <WhyChooseUs />

      {/* 7. Airlines & Connectivity: Addis Ababa global connectivity marquee */}
      <AirlinePartners />

      {/* 8. CTA Banner: Inquire directly with Hana Lema */}
      <CTASection />
    </div>
  );
}
