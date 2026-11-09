import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass, Building2, MapPin, ArrowRight, Check } from 'lucide-react';
import { motion } from '../../utils/motion';
import { fourServices } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

export default function FeaturedTours() {
  const { t } = useLanguage();

  const iconMap = {
    "guzo-certified-ticketing": Plane,
    "corridor-tour-operations": Compass,
    "b2b-corporate-travel-logistics": Building2,
    "local-hospitality-curation": MapPin,
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-[#E8DCC4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header with whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4]/60 border border-[#D8C9AA] mb-3">
              <span>CORE SERVICE PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F3D28] tracking-tight">
              Four Pillars of Travel Logistics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every arrangement is executed with institutional diligence, verified partners, and prompt human communication from our Addis Ababa desk.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F3D28] hover:text-[#8B5CF6] transition-colors group self-start md:self-end"
          >
            <span>View All Service Pillars</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#8B5CF6]" />
          </Link>
        </motion.div>

        {/* 4 Large Editorial Service Cards with Staggered Entrance & Interactive Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {fourServices.map((svc, idx) => {
            const Icon = iconMap[svc.id] || Compass;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between rounded-3xl bg-[#F8F6F0] border border-[#E8DCC4] overflow-hidden hover:border-[#1F3D28] hover:shadow-2xl transition-all duration-300"
              >
                {/* Visual Top Banner with Smooth Zoom */}
                <div className="relative h-60 sm:h-68 overflow-hidden bg-[#1F3D28]">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.85]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero-1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D28] via-[#1F3D28]/40 to-transparent" />
                  
                  {/* Floating Number Tag */}
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#0D1B12]/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-[#E8DCC4]">
                    PILLAR {svc.number}
                  </div>

                  {/* Icon Badge with micro scale on hover */}
                  <div className="absolute bottom-5 left-5 w-12 h-12 rounded-2xl bg-[#E8DCC4] text-[#1F3D28] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B5CF6] font-bold block mb-1">
                      {svc.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D28] group-hover:text-[#152B1C] transition-colors mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {svc.shortDesc}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-2 border-t border-[#E8DCC4]/70">
                      {svc.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="pt-4 border-t border-[#E8DCC4] flex items-center justify-between">
                    <Link
                      to={`/services/${svc.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#1F3D28] group-hover:text-[#8B5CF6] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Capability Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to={`/contact?subject=${encodeURIComponent(svc.title)}`}
                      className="px-4 py-2 rounded-full bg-[#1F3D28] hover:bg-[#152B1C] active:scale-95 text-[#E8DCC4] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
