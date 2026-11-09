import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, MapPin, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from '../../utils/motion';
import { useLanguage } from '../../context/LanguageContext';
import { companyInfo } from '../../data/navigation';

const heroSlides = [
  {
    id: 'simien-ridges',
    image: '/images/hero-1.jpg',
    tag: 'Transit Corridor',
    location: 'Simien Highland Ridges',
    subtitle: 'UNESCO Natural Reserve • Northern Corridor',
    alt: 'Highland ridges and escarpments in Simien Mountains, Ethiopia',
  },
  {
    id: 'danakil-basin',
    image: '/images/hero-2.jpg',
    tag: 'Geological Route',
    location: 'Lake Karum & Danakil Basin',
    subtitle: 'Geothermal Corridor • Eastern Afar Route',
    alt: 'Golden light across Lake Karum and Danakil Depression',
  },
  {
    id: 'escarpment-vista',
    image: '/images/hero-3.jpg',
    tag: 'Cultural Heritage',
    location: 'Great Rift Escarpment',
    subtitle: 'Highland Corridors • Expedition Logistics',
    alt: 'Expansive Ethiopian highland valleys and dramatic skies',
  },
];

export default function Hero() {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isReduced = useReducedMotion();

  // Auto-advance hero slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeScenery = heroSlides[currentSlide];

  // Headline words for staggered word reveal
  const headlinePart1 = ["Cinematic", "Horizons."];
  const headlinePart2 = ["Refined", "Expeditions."];

  return (
    <section className="relative w-full overflow-hidden bg-[#0D1B12] min-h-[660px] sm:min-h-[740px] lg:min-h-[840px] flex items-center pt-28 pb-16">
      
      {/* Background Slides with Cinematic Crossfade and subtle scale transition */}
      <div className="absolute inset-0 z-0 bg-[#0D1B12] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <motion.img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-[center_35%] filter brightness-[0.85] contrast-[1.05]"
              initial={{ scale: 1.08 }}
              animate={{ scale: idx === currentSlide ? 1.0 : 1.08 }}
              transition={{ duration: 8, ease: 'ease-out' }}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/hero-1.jpg';
              }}
            />
          </div>
        ))}

        {/* Cinematic Vignettes: Dark Forest base keeping typography razor sharp */}
        <div className="absolute inset-0 cinematic-gradient-left" />
        <div className="absolute inset-0 cinematic-gradient-bottom" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Main Editorial Hero Column */}
          <div className="lg:col-span-8 text-left space-y-6">

            {/* Micro Badge with Entrance Animation */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#1F3D28]/90 text-[#E8DCC4] border border-white/20 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>ETAA MEMBER</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-mono">{companyInfo.tradeLicense}</span>
            </motion.div>

            {/* Staggered Cinematic Headline Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-serif font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
              <span className="inline-block overflow-hidden mr-2">
                {headlinePart1.map((word, wIdx) => (
                  <motion.span
                    key={wIdx}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + wIdx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block mt-1 text-[#E8DCC4] font-serif font-normal italic overflow-hidden">
                {headlinePart2.map((word, wIdx) => (
                  <motion.span
                    key={wIdx}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.45 + wIdx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle with Fade & Gentle Slide */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-[#E8DCC4]/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal"
            >
              <strong>Expedition Travel – Go Lite</strong> coordinates certified Guzo flight ticketing, transit corridor tour operations, enterprise B2B logistics, and vetted hospitality across Ethiopia.
            </motion.p>

            {/* Action CTA Buttons with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Primary Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="bg-[#E8DCC4] hover:bg-white active:bg-[#D8C9AA] text-[#1F3D28] font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-4 rounded-full inline-flex items-center gap-2.5 shadow-xl transition-all duration-200 hover:shadow-2xl group"
                >
                  <span>{t('home.hero.primaryCta') || 'Start an Inquiry'}</span>
                  <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/services"
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/25 hover:border-white/50 text-[#E8DCC4] hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-4 rounded-full inline-flex items-center gap-2 backdrop-blur-md transition-all duration-200"
                >
                  <span>Our 4 Service Pillars</span>
                  <ChevronRight className="w-4 h-4 text-[#8B5CF6]" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Slide Navigation Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-6 flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === currentSlide
                        ? 'w-8 bg-[#8B5CF6]'
                        : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Slide ${idx + 1}: ${slide.location}`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-[#E8DCC4]/60">
                0{currentSlide + 1} / 0{heroSlides.length}
              </span>
            </motion.div>

          </div>

          {/* Right Floating Dossier Card with Entrance Animation */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-[#152B1C]/85 backdrop-blur-md border border-white/15 text-[#E8DCC4] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono text-[#8B5CF6] uppercase tracking-wider">Agency Dossier</span>
                <span className="text-[11px] font-mono text-white/70">ETHIOPIA DESK</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#E8DCC4]/60 font-mono">Company</span>
                  <span className="font-semibold text-white">Expedition Travel – Go Lite</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#E8DCC4]/60 font-mono">Primary Contact</span>
                  <span className="font-semibold text-white">{companyInfo.primaryContact}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#E8DCC4]/60 font-mono">Association</span>
                  <span className="font-semibold text-white">ETAA Accredited</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#E8DCC4]/60 font-mono">Trade License</span>
                  <span className="font-mono text-[#8B5CF6] font-bold">{companyInfo.tradeLicense}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#E8DCC4]/60 font-mono">Active Corridor</span>
                  <span className="font-semibold text-white">{activeScenery.location}</span>
                </div>
              </div>

              <Link
                to="/about"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-between transition-colors group"
              >
                <span>Read Agency Credentials</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Active Landmark Badge (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="hidden sm:flex absolute bottom-8 right-8 z-10 bg-[#0D1B12]/85 backdrop-blur-md text-[#E8DCC4] px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl items-center gap-3"
      >
        <div className="w-8 h-8 rounded-xl bg-[#1F3D28] text-[#8B5CF6] flex items-center justify-center shrink-0 border border-white/10">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold leading-tight text-white">
            {activeScenery.location}
          </p>
          <p className="text-[10px] text-[#E8DCC4]/70 font-mono leading-tight">
            {activeScenery.subtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
