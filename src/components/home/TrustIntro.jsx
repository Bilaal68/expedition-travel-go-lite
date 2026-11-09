import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from '../../utils/motion';
import { companyInfo } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

export default function TrustIntro() {
  const { t } = useLanguage();

  const credentialBullets = [
    { label: "Association Membership", val: "Ethiopian Travel Agents Association (ETAA)" },
    { label: "Trade License Number", val: "MOT/ETA/2024/042" },
    { label: "Primary Contact", val: "Hana Lema" },
    { label: "Direct Coordination", val: "Addis Ababa Central Operations Desk" },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#F8F6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Narrative with whileInView */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Monospace Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4]/60 border border-[#D8C9AA]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>ABOUT EXPEDITION TRAVEL – GO LITE</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-extrabold text-[#1F3D28] leading-[1.14] tracking-tight">
              Travel Coordination Grounded in Authenticity & Precision
            </h2>

            {/* Paragraphs - Concise & Engaging */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong>Expedition Travel – Go Lite</strong> is an accredited Ethiopian travel agency based in Addis Ababa, operating under ETAA membership and Trade License <strong>MOT/ETA/2024/042</strong>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Led by <strong>Hana Lema</strong>, we deliver certified ticketing pipelines, structured corridor logistics, and responsive support. Every flight, vehicle, and itinerary is directly verified for seamless travel across Ethiopia.
            </p>

            {/* Verified Credentials Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DCC4] shadow-xs space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase text-[#8B5CF6] tracking-wider mb-2">
                Verified Credentials Overview
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {credentialBullets.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F3D28] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[11px] font-mono">{c.label}</span>
                      <strong className="text-[#1F3D28] font-semibold">{c.val}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-2 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/about"
                  className="bg-[#1F3D28] hover:bg-[#152B1C] active:bg-[#0D1B12] text-[#E8DCC4] hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg group"
                >
                  <span>Read Full About & Credentials</span>
                  <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            </div>

          </motion.div>

          {/* Right Visual Image & Composition */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative p-3 sm:p-4 rounded-3xl bg-[#E8DCC4]/50 border border-[#D8C9AA]">
              
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-xl group">
                <img
                  src="/images/hero-3.jpg"
                  alt="Highland Escarpment Expedition in Ethiopia"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/hero-1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B12]/80 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8DCC4] block">
                      Regional Corridor Operations
                    </span>
                    <strong className="text-sm font-serif font-bold text-white block">
                      Ethiopian Highland & Valley Transits
                    </strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-[#1F3D28]/90 border border-white/20 text-xs font-mono text-[#E8DCC4]">
                    Addis Ababa Base
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
