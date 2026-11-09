import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from '../../utils/motion';
import { companyInfo } from '../../data/navigation';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function CTASection() {
  const primaryPhone = companyInfo.phones[0];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Frame with whileInView */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-center shadow-2xl bg-[#0D1B12] border border-[#1F3D28]"
        >
          {/* Panoramic Ethiopian Landscape Background with subtle zoom effect */}
          <img
            src="/images/hero-1.jpg"
            alt="Expedition Travel Landscape"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1] transition-transform duration-1000 ease-out hover:scale-105"
            loading="lazy"
          />

          {/* Dark Forest Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B12]/95 via-[#152B1C]/80 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-left space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#E8DCC4] bg-white/10 border border-white/20">
              <span>EXPEDITION INQUIRIES & CORPORATE DESK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
              Ready to Coordinate Your Expedition?
            </h2>

            <p className="text-[#E8DCC4]/90 text-sm sm:text-base leading-relaxed">
              Connect with <strong>Hana Lema</strong> and the Expedition Travel – Go Lite desk for Guzo ticketing, transit corridor operations, or corporate B2B travel management.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="bg-[#E8DCC4] hover:bg-white active:bg-[#D8C9AA] text-[#1F3D28] font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 shadow-xl transition-all duration-200 hover:shadow-2xl group"
                >
                  <span>Submit Travel Inquiry</span>
                  <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={getWhatsAppUrl(primaryPhone.raw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/25 text-[#E8DCC4] hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center gap-2 backdrop-blur-md transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 text-[#8B5CF6]" />
                  <span>WhatsApp Hana Lema</span>
                </a>
              </motion.div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
