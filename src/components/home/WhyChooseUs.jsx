import React from 'react';
import { ShieldCheck, Plane, Compass, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from '../../utils/motion';
import { companyInfo } from '../../data/navigation';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "ETAA Accredited & Licensed Desk",
      description: "Operating under Trade License MOT/ETA/2024/042 with certified Ethiopian Travel Agents Association accreditation.",
    },
    {
      icon: Plane,
      title: "Certified Guzo Aviation Ticketing",
      description: "Domestic and international flight issuance, seat allocations, and rapid assistance for itinerary alterations.",
    },
    {
      icon: Compass,
      title: "Structured Transit Corridor Logistics",
      description: "Coordinated transit corridors featuring safety-inspected vehicles, experienced drivers, and checkpoint monitoring.",
    },
    {
      icon: Building2,
      title: "Dedicated B2B Enterprise Accounts",
      description: "Structured corporate accounts with centralized billing, simplified expense reporting, and priority support.",
    },
  ];

  const operationalDisciplines = [
    "Direct personal communication with Hana Lema",
    "Verified booking vouchers & official Guzo ticketing records",
    "Tailored corporate travel policies and consolidated invoicing",
    "Vetted hotel networks and regional multilingual tour guides"
  ];

  return (
    <section className="py-20 md:py-28 bg-[#1F3D28] text-white relative overflow-hidden border-t border-[#2A5237]">
      {/* Decorative subtle background geometry */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-white" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Value Proposition with whileInView */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#E8DCC4] bg-white/10 border border-white/20">
              <span>WHY EXPEDITION TRAVEL – GO LITE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white leading-tight">
              Service Quality, Institutional Rigor, Regional Depth
            </h2>

            <p className="text-[#E8DCC4]/90 text-sm sm:text-base leading-relaxed">
              We specialize in verified bookings, transparent corporate workflows, and dedicated local coordination. Whether issuing urgent flight adjustments or coordinating cross-country corridors, our Addis Ababa desk is directly accountable.
            </p>

            <div className="pt-2 space-y-3">
              {operationalDisciplines.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#E8DCC4] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center gap-4 text-xs font-mono text-[#E8DCC4]/70">
              <div>
                <span className="block text-white font-bold">ETAA Member</span>
                <span>Accredited Travel Agency</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <span className="block text-white font-bold">{companyInfo.tradeLicense}</span>
                <span>Active Ethiopian Trade License</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Feature Grid with Staggered Entrance */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -5 }}
                  className="bg-[#152B1C] p-6 sm:p-7 rounded-3xl border border-white/15 shadow-xl hover:border-[#8B5CF6] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1F3D28] text-[#8B5CF6] flex items-center justify-center mb-5 border border-white/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8DCC4]/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
