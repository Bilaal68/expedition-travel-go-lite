import React, { useState, useRef, useEffect } from 'react';
import { Menu, ExternalLink, LogOut, Globe, ChevronDown, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminHeader({ onOpenSidebar }) {
  const { user, signOut } = useAuth();
  const { language, setLanguage, languages = [], supportedLanguages = [], t } = useLanguage();
  const availableLanguages = languages.length > 0 ? languages : supportedLanguages;
  const location = useLocation();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const routeTitleKeys = {
    '/admin': 'admin.dashboard',
    '/admin/tours': 'admin.tours',
    '/admin/destinations': 'admin.destinations',
    '/admin/blog': 'admin.blog',
    '/admin/inquiries': 'admin.inquiries',
    '/admin/settings': 'admin.settings',
  };

  const titleKey = routeTitleKeys[location.pathname];
  const currentTitle = titleKey ? t(titleKey) : t('admin.portalTitle');
  const activeLang = availableLanguages.find((l) => l.code === language) || availableLanguages[0] || { code: 'en', nativeName: 'English', flag: '🇬🇧' };

  return (
    <header className="h-20 bg-white border-b border-navy-100 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Title & Breadcrumb */}
        <div>
          <h1 className="text-lg sm:text-xl font-heading font-extrabold text-navy-950">
            {currentTitle}
          </h1>
          <p className="text-xs text-navy-500 hidden sm:block">
            {t('common.tagline')} &bull; {t('admin.managementPortal')}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-navy-700 bg-navy-50 hover:bg-teal-50 hover:text-teal-700 border border-navy-100 transition-colors cursor-pointer"
            aria-label="Change language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" aria-hidden="true" />
            <span className="font-bold">{activeLang.flag}</span>
            <span className="hidden md:inline">{activeLang.nativeName}</span>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-navy-100 py-1.5 z-50 animate-scale-in origin-top-right">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                {t('nav.selectLanguage') || 'Select Language'}
              </div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-teal-50 transition-colors ${
                    language === lang.code ? 'text-teal-700 font-bold bg-teal-50/50' : 'text-slate-700 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Site Shortcut */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-navy-700 hover:text-teal-600 bg-navy-50 hover:bg-teal-50/60 rounded-xl transition-colors border border-navy-100"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('admin.liveSite')}</span>
        </Link>

        {/* Sign out */}
        <button
          onClick={() => signOut()}
          className="p-2 text-navy-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title={t('admin.logout')}
          aria-label={t('admin.logout')}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
