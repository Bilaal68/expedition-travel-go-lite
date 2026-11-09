import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import TourCard from '../components/tours/TourCard';
import TourFilters from '../components/tours/TourFilters';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ScrollReveal from '../components/common/ScrollReveal';
import { tourService } from '../services/tourService';
import { useLanguage } from '../context/LanguageContext';

export default function Tours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialDestination = searchParams.get('destination') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [destination, setDestination] = useState(initialDestination);
  const [sortBy, setSortBy] = useState('default');

  const [tours, setTours] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t, language } = useLanguage();

  // Sync state if search params change externally
  useEffect(() => {
    const paramCat = searchParams.get('category');
    const paramDest = searchParams.get('destination');
    const paramSearch = searchParams.get('search');

    if (paramCat) setCategory(paramCat);
    if (paramDest) setDestination(paramDest);
    if (paramSearch !== null) setSearch(paramSearch);
  }, [searchParams]);

  useEffect(() => {
    document.title = `${t('tours.pageTitle')} | Expedition Travel – Go Lite`;

    Promise.all([
      tourService.getCategories(),
      tourService.getDestinations()
    ]).then(([cats, dests]) => {
      setCategories(cats);
      setDestinations(dests);
    });
  }, [t]);

  // Fetch filtered tours
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    tourService.getTours({
      search,
      category,
      destination,
      sortBy
    }).then((data) => {
      if (mounted) {
        setTours(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [search, category, destination, sortBy]);

  const handleReset = () => {
    setSearch('');
    setCategory('All');
    setDestination('All');
    setSortBy('default');
    setSearchParams(language !== 'en' ? { lang: language } : {});
  };

  return (
    <div className="flex flex-col">
      <PageHero
        badge={t('home.featuredTours.badge')}
        title={t('tours.pageTitle')}
        subtitle={t('tours.pageSubtitle')}
        breadcrumbs={[{ label: t('nav.services') }]}
        image="https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-12 md:py-16 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters Bar */}
          <TourFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            destination={destination}
            setDestination={setDestination}
            destinations={destinations}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleReset}
            totalResults={tours.length}
          />

          {/* Tours Grid or Empty State */}
          {loading ? (
            <LoadingState asCards={true} cardsCount={6} />
          ) : tours.length === 0 ? (
            <EmptyState
              title={t('tours.emptyTitle')}
              description={t('tours.emptyDesc')}
              actionLabel={t('tours.resetFilters')}
              onAction={handleReset}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour, idx) => (
                <ScrollReveal key={tour.id} direction="up" delay={idx * 60}>
                  <TourCard tour={tour} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Consultation Banner */}
          <ScrollReveal direction="up" delay={100}>
            <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left card-hover-effect">
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-1">
                  {language === 'om' ? 'Imala Addaa Karoorsuu Barbaadduu?' : language === 'am' ? 'የግል ወይም ልዩ ጉዞ ማቀድ ይፈልጋሉ?' : 'Need a Tailor-Made Private Route?'}
                </h3>
                <p className="text-sm text-slate-600 max-w-xl">
                  {language === 'om' ? 'Garee keenya Finfinnee Boolee Daandii Afriikaa qunnamuudhaan sagantaa imalaa dhuunfaa keessanii mijeeffadhaa.' : language === 'am' ? 'የአዲስ አበባ ቦሌ አፍሪካ ጎዳና ቢሮአችንን በማነጋገር እንደ እርስዎ ፍላጎት የተዘጋጀ ልዩ የጉዞ ዕቅድ ማውጣት ይችላሉ።' : 'Contact our Addis Ababa office on Africa Avenue directly. We arrange planned tours, hotel bookings, flight tickets, and customized itineraries across Ethiopia.'}
                </p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm shadow-sm btn-interactive whitespace-nowrap"
              >
                {t('nav.inquireNow')}
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
