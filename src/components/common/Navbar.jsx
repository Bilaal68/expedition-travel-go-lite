import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, ArrowRight, Check, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from '../../utils/motion';
import { companyInfo } from '../../data/navigation';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const location = useLocation();
  const langDropdownRef = useRef(null);
  const isHomePage = location.pathname === '/';
  const isReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsLangDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryPhone = companyInfo.phones[0];

  const navLinks = [
    { name: t('nav.home') || 'Home', path: '/' },
    { name: t('nav.about') || 'About', path: '/about' },
    { name: t('nav.services') || 'Services', path: '/services' },
    { name: t('nav.destinations') || 'Destinations', path: '/destinations' },
    { name: t('nav.contact') || 'Contact', path: '/contact' },
  ];

  const transparentHeader = isHomePage && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparentHeader
            ? 'bg-gradient-to-b from-[#0D1B12]/90 via-[#0D1B12]/45 to-transparent py-4 sm:py-5 border-b border-white/10'
            : 'bg-[#1F3D28]/95 backdrop-blur-md py-3 sm:py-3.5 shadow-xl border-b border-[#2A5237]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Primary Logo: Official Expedition Travel – Go Lite */}
            <Link
              to="/"
              className="flex items-center group focus:outline-none shrink-0"
              aria-label="Expedition Travel – Go Lite Home"
            >
              <img
                src="/logo-white-trimmed.png"
                alt="Expedition Travel – Go Lite"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main Navigation">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `relative py-1 text-xs sm:text-[13px] tracking-wider uppercase font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'text-white'
                        : 'text-[#E8DCC4]/85 hover:text-white hover:-translate-y-0.5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive ? (
                        <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-[#8B5CF6] rounded-full shadow-xs shadow-purple-500/50" />
                      ) : (
                        <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#E8DCC4] rounded-full transition-all duration-300 group-hover:w-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Items */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              
              {/* ETAA Trust Micro-Pill */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-[#E8DCC4] tracking-wide">
                <ShieldCheck className="w-3 h-3 text-[#8B5CF6]" />
                <span>ETAA MOT/ETA/2024/042</span>
              </div>

              {/* Language Selector */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#E8DCC4] hover:text-white transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/10 cursor-pointer"
                  aria-label="Select language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E8DCC4]/80" />
                  <span className="uppercase tracking-wider text-[11px]">
                    {language.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-[#E8DCC4]/60 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-44 bg-[#152B1C] rounded-2xl shadow-2xl border border-white/15 py-2 z-50 origin-top-right text-xs"
                  >
                    <div className="px-3 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-[#E8DCC4]/50 border-b border-white/10 mb-1">
                      {t('nav.selectLanguage') || 'Language'}
                    </div>
                    {supportedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer ${
                          language === lang.code ? 'font-bold text-[#8B5CF6] bg-white/5' : 'text-[#E8DCC4]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span className="text-xs font-medium">{lang.nativeName}</span>
                        </div>
                        {language === lang.code && <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Inquiry CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="bg-[#E8DCC4] hover:bg-[#F3EDE0] active:bg-[#D8C9AA] text-[#1F3D28] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg group"
                >
                  <span>{t('nav.planYourTrip') || 'Inquire Now'}</span>
                  <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Actions: Phone & Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={`tel:${primaryPhone.raw}`}
                className="p-2 rounded-xl bg-white/10 text-[#E8DCC4] hover:text-white"
                aria-label="Call Direct Desk"
              >
                <Phone className="w-4 h-4" />
              </a>

              <Link
                to="/contact"
                className="bg-[#E8DCC4] text-[#1F3D28] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-xs"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3 h-3 text-[#8B5CF6]" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer transition-colors"
                aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
              >
                {isMobileOpen ? <X className="w-6 h-6 text-[#E8DCC4]" /> : <Menu className="w-6 h-6 text-[#E8DCC4]" />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer with Staggered Entrance */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#152B1C] text-[#E8DCC4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-white/10"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <img
                  src="/logo-white-trimmed.png"
                  alt="Expedition Travel – Go Lite"
                  className="h-10 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 text-[#E8DCC4] hover:text-white rounded-lg cursor-pointer transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Credentials Card */}
              <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B5CF6] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Licensed Travel Agency</span>
                </div>
                <p className="text-white font-medium">ETAA Member • Trade License MOT/ETA/2024/042</p>
                <p className="text-[#E8DCC4]/70">Contact: Hana Lema</p>
              </div>

              {/* Mobile Language Switcher */}
              <div className="mb-5 p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#E8DCC4]/70 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{t('nav.selectLanguage') || 'Language'}</span>
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        language === lang.code
                          ? 'bg-[#8B5CF6] text-white shadow-xs font-bold'
                          : 'bg-white/10 text-[#E8DCC4] hover:bg-white/20'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Links with Stagger */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + idx * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white font-bold border-l-4 border-[#8B5CF6]'
                            : 'text-[#E8DCC4]/80 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                
                {/* Admin Portal Link */}
                <Link
                  to="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#E8DCC4]/50 hover:text-white hover:bg-white/5 mt-2 block"
                >
                  Admin Portal →
                </Link>
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 rounded-full bg-[#E8DCC4] text-[#1F3D28] font-bold text-xs uppercase tracking-wider text-center block shadow-md hover:bg-white transition-colors"
              >
                {t('nav.planYourTrip') || 'Inquire Now'}
              </Link>

              <a
                href={getWhatsAppUrl(primaryPhone.raw)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
              >
                <span>Direct WhatsApp: {primaryPhone.display}</span>
              </a>

              <div className="text-[11px] text-[#E8DCC4]/60 text-center flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-[#8B5CF6]" />
                <span>{companyInfo.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
