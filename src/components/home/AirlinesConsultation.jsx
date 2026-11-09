import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';

const airlinesList = [
  { name: "Ethiopian Airlines", hub: "Addis Ababa (ADD)", tag: "National Carrier" },
  { name: "Turkish Airlines", hub: "Istanbul (IST)", tag: "Global Route" },
  { name: "Emirates", hub: "Dubai (DXB)", tag: "Middle East & Beyond" },
  { name: "Qatar Airways", hub: "Doha (DOH)", tag: "Global Transit" },
  { name: "Lufthansa", hub: "Frankfurt (FRA)", tag: "European Connections" },
  { name: "Saudia", hub: "Jeddah / Riyadh", tag: "Regional Network" },
  { name: "EgyptAir", hub: "Cairo (CAI)", tag: "North Africa & Middle East" },
  { name: "Gulf Air", hub: "Bahrain (BAH)", tag: "Gulf Region" },
  { name: "South African Airways", hub: "Johannesburg (JNB)", tag: "Southern Africa" },
];

export default function AirlinesConsultation() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-50 text-forest-800 border border-forest-200 mb-3">
            <Plane className="w-3.5 h-3.5 text-forest-700" />
            <span>{t('home.airlinesSection.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight font-serif">
            {t('home.airlinesSection.title')}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            {t('home.airlinesSection.subtitle')}
          </p>
        </ScrollReveal>

        {/* Factual Carriers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {airlinesList.map((airline, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="bg-ivory-50/60 p-4 rounded-2xl border border-slate-200 hover:border-forest-400 hover:bg-white transition-all duration-200 shadow-2xs group flex flex-col justify-between h-full">
                <div>
                  <div className="text-[11px] font-bold text-forest-700 uppercase tracking-wider mb-1">
                    {airline.tag}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-navy-900 group-hover:text-forest-800 transition-colors">
                    {airline.name}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Hub: {airline.hub}</span>
                  <Plane className="w-3 h-3 text-slate-400 group-hover:text-forest-600 transition-colors" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Informative Disclaimer & CTA */}
        <ScrollReveal direction="up" delay={200} className="mt-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{t('home.airlinesSection.disclaimer')}</span>
          </div>

          <div>
            <Link
              to="/services/flight-ticket-reservations"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-sm transition-all hover:-translate-y-0.5"
            >
              <span>{t('home.airlinesSection.consultBtn')}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
