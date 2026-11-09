import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ScrollReveal from '../common/ScrollReveal';
import { Search, MessageSquare, CalendarCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      icon: Search,
      title: t('home.howItWorks.step1Title'),
      description: t('home.howItWorks.step1Desc'),
    },
    {
      step: "02",
      icon: MessageSquare,
      title: t('home.howItWorks.step2Title'),
      description: t('home.howItWorks.step2Desc'),
    },
    {
      step: "03",
      icon: CalendarCheck,
      title: t('home.howItWorks.step3Title'),
      description: t('home.howItWorks.step3Desc'),
    },
    {
      step: "04",
      icon: MapPin,
      title: t('home.howItWorks.step4Title'),
      description: t('home.howItWorks.step4Desc'),
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up">
          <SectionHeading
            badge={t('home.howItWorks.badge')}
            title={t('home.howItWorks.title')}
            subtitle={t('home.howItWorks.subtitle')}
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                <div className="bg-ivory-50/60 p-6 sm:p-7 rounded-3xl border border-slate-200 relative flex flex-col justify-between group hover:border-forest-500 hover:bg-white card-hover-effect h-full">
                  {/* Step Number Watermark */}
                  <span className="font-extrabold text-4xl sm:text-5xl text-slate-200 group-hover:text-forest-100 transition-colors absolute top-4 right-5 select-none font-serif">
                    {item.step}
                  </span>

                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-5 border border-forest-100 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2 font-serif">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
