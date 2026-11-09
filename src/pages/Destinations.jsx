import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import Button from '../components/common/Button';
import LoadingState from '../components/common/LoadingState';
import { tourService } from '../services/tourService';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Sparkles, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

export default function Destinations() {
  const { t, getLocalized, language } = useLanguage();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = `${t('destinations.pageTitle')} | Expedition Travel – Go Lite`;
    let mounted = true;
    tourService.getDestinations().then((data) => {
      if (mounted) {
        setDestinations(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [t]);

  const categories = [
    { id: 'All', label: t('destinations.filterAll') },
    { id: 'Historical Heritage', label: t('destinations.categoryHistorical') },
    { id: 'Nature & Scenery', label: t('destinations.categoryNature') },
    { id: 'Culture & Living Heritage', label: t('destinations.categoryCulture') },
    { id: 'Geological Wonders', label: t('destinations.categoryGeological') },
  ];

  const filteredDestinations = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category?.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="flex flex-col bg-white">
      {/* Page Hero */}
      <PageHero
        badge={t('destinations.badge')}
        title={t('destinations.pageTitle')}
        subtitle={t('destinations.pageSubtitle')}
        breadcrumbs={[{ label: t('nav.destinations') }]}
        image="https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Filter Tabs */}
      <section className="py-8 bg-ivory-50 border-b border-slate-200/80 sticky top-[72px] z-30 backdrop-blur-md bg-ivory-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'bg-white text-navy-900 border border-slate-200 hover:border-forest-500 hover:text-forest-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Editorial Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState asCards={true} cardsCount={6} />
          ) : (
            <div className="space-y-16 lg:space-y-24">
              {filteredDestinations.map((dest, idx) => {
                const isEven = idx % 2 === 0;
                const destName = getLocalized(dest, 'name');
                const destSubtitle = getLocalized(dest, 'subtitle');
                const destDescription = getLocalized(dest, 'description');
                const rawHighlights = dest.translations?.[language]?.highlights || dest.highlights || [];

                return (
                  <ScrollReveal key={dest.id} direction={isEven ? 'left' : 'right'}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-ivory-50/50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
                      {/* Image Column */}
                      <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md group">
                          <img
                            src={dest.image}
                            alt={destName}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-900/85 text-gold-400 backdrop-blur-xs border border-white/10">
                              {dest.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                        <div className="flex items-center gap-2 text-forest-700 font-medium text-xs sm:text-sm">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{dest.region}</span>
                        </div>

                        <div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight font-serif">
                            {destName}
                          </h2>
                          {destSubtitle && (
                            <p className="text-forest-700 font-semibold text-sm sm:text-base mt-1">
                              {destSubtitle}
                            </p>
                          )}
                        </div>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {destDescription}
                        </p>

                        {/* Highlights list */}
                        {rawHighlights && rawHighlights.length > 0 && (
                          <div className="pt-2">
                            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                              {t('destinations.highlightsLabel')}
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-navy-900/90 font-medium">
                              {rawHighlights.map((hl, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <Link
                            to={`/contact?subject=${encodeURIComponent(`Inquiry: Visit to ${dest.name}`)}`}
                            className="bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 shadow-xs transition-all duration-200"
                          >
                            <span>{t('destinations.viewTours')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            to="/services"
                            className="text-navy-900 font-semibold text-sm px-4 py-2 rounded-full border border-slate-300 hover:border-forest-600 hover:text-forest-700 transition-colors"
                          >
                            {t('tours.pageTitle')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-gold-400 border border-white/10">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('home.hero.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            {t('home.cta.heading')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('home.cta.supportingText')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gold-600 hover:bg-gold-700 text-navy-950 font-bold px-8 py-3 rounded-full text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t('common.planYourTrip')}
            </Link>
            <Link
              to="/services"
              className="border border-white/30 hover:border-white text-white font-semibold px-7 py-3 rounded-full text-sm sm:text-base transition-colors"
            >
              {t('common.exploreTours')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
