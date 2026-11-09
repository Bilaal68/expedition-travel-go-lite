import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export const airlinePartners = [
  {
    id: 'ethiopian-airlines',
    name: 'Ethiopian Airlines',
    logo: '/images/airlines/ethiopian-airlines.svg',
  },
  {
    id: 'turkish-airlines',
    name: 'Turkish Airlines',
    logo: '/images/airlines/turkish-airlines.svg',
  },
  {
    id: 'emirates',
    name: 'Emirates',
    logo: '/images/airlines/emirates.svg',
  },
  {
    id: 'qatar-airways',
    name: 'Qatar Airways',
    logo: '/images/airlines/qatar-airways.svg',
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa Airlines',
    logo: '/images/airlines/lufthansa.svg',
  },
  {
    id: 'saudia',
    name: 'Saudi Arabian Airlines',
    logo: '/images/airlines/saudia.svg',
  },
  {
    id: 'egyptair',
    name: 'EgyptAir',
    logo: '/images/airlines/egyptair.svg',
  },
  {
    id: 'gulf-air',
    name: 'Gulf Air',
    logo: '/images/airlines/gulf-air.svg',
  },
  {
    id: 'south-african-airways',
    name: 'South African Airways',
    logo: '/images/airlines/south-african-airways.svg',
  },
];

export default function AirlinePartners() {
  const { language } = useLanguage();
  const rotatingPartners = [...airlinePartners, ...airlinePartners];

  return (
    <section className="w-full bg-white py-10 sm:py-12 border-b border-[#E8DCC4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#1F3D28] bg-[#E8DCC4]/50 border border-[#D8C9AA] mb-2">
          <ShieldCheck className="w-3 h-3 text-[#8B5CF6]" />
          <span>GUZO CERTIFIED TICKETING NETWORK</span>
        </div>
        <p className="text-xs sm:text-sm font-serif font-bold text-[#1F3D28]">
          Connecting Addis Ababa Bole (ADD) to Domestic &amp; Global Networks
        </p>
      </div>

      {/* Infinite Slow Rotating Logo Marquee */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Vignette Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Marquee Track with Slow Motion (Pause on Hover) */}
        <div className="animate-marquee-slow flex items-center gap-6 sm:gap-8 px-4">
          {rotatingPartners.map((airline, idx) => (
            <div
              key={`${airline.id}-${idx}`}
              className="h-16 sm:h-20 w-44 sm:w-52 shrink-0 px-5 py-3 rounded-2xl bg-[#F8F6F0] border border-[#E8DCC4] shadow-2xs hover:shadow-md hover:border-[#1F3D28] transition-all duration-300 flex items-center justify-center select-none group/item"
              title={airline.name}
            >
              <img
                src={airline.logo}
                alt={airline.name}
                className="max-h-10 sm:max-h-12 w-auto max-w-[85%] object-contain filter grayscale group-hover/item:grayscale-0 group-hover/item:scale-105 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
