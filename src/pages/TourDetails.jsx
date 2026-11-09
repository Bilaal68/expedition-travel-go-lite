import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, MapPin, Users, Activity, Check, X as XIcon, 
  Share2, ArrowLeft, MessageCircle, ChevronDown, 
  Sparkles 
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Button from '../components/common/Button';
import LoadingState from '../components/common/LoadingState';
import TourCard from '../components/tours/TourCard';
import BookingInquiryForm from '../components/tours/BookingInquiryForm';
import { tourService } from '../services/tourService';
import { companyInfo } from '../data/navigation';
import { getWhatsAppUrl, buildTourWhatsAppMessage } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export default function TourDetails() {
  const { slug } = useParams();
  const { language, t, getLocalized } = useLanguage();
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    tourService.getTourBySlug(slug).then((data) => {
      if (mounted) {
        setTour(data);
        setLoading(false);
        if (data) {
          setSelectedGalleryImg(data.coverImage);
          // Fetch related
          tourService.getRelatedTours(data.slug, data.category, 3).then((rel) => {
            if (mounted) setRelatedTours(rel);
          });
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const title = tour ? getLocalized(tour, 'title') : '';
  const overview = tour ? getLocalized(tour, 'overview') : '';
  const duration = tour ? getLocalized(tour, 'duration') : '';
  const destination = tour ? getLocalized(tour, 'destination') : '';
  const groupSize = tour ? (getLocalized(tour, 'groupSize') || t('tours.defaultGroupSize')) : '';
  const rawDifficulty = tour ? (getLocalized(tour, 'difficulty') || 'Moderate') : 'Moderate';
  const difficulty = t(`tours.difficultyLevels.${rawDifficulty}`) || rawDifficulty;
  const category = tour ? (t(`tours.categories.${tour.category}`) || tour.category) : '';

  const highlights = (tour?.translations?.[language]?.highlights) || tour?.highlights || [];
  const inclusions = (tour?.translations?.[language]?.inclusions) || tour?.inclusions || [];
  const exclusions = (tour?.translations?.[language]?.exclusions) || tour?.exclusions || [];
  const itinerary = (tour?.translations?.[language]?.itinerary) || tour?.itinerary || [];

  useEffect(() => {
    if (tour) {
      document.title = `${title} | Expedition Travel – Go Lite`;
    } else if (!loading) {
      document.title = `${t('tours.tourNotFoundTitle')} | Expedition Travel – Go Lite`;
    }
  }, [tour, title, loading, t]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: overview,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const primaryPhone = companyInfo.phones[0];

  if (loading) {
    return (
      <div className="py-32 max-w-7xl mx-auto px-4">
        <LoadingState message={t('tours.loadingTourDetails')} height="h-96" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="py-32 text-center max-w-2xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-6 border border-teal-200">
          <MapPin className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-navy-900 mb-3">{t('tours.tourNotFoundTitle')}</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {t('tours.tourNotFoundDesc')}
        </p>
        <Button to="/services" variant="primary" icon={ArrowLeft}>
          {t('tours.backToAllTours')}
        </Button>
      </div>
    );
  }

  const allImages = [tour.coverImage, ...(tour.gallery || [])].filter(Boolean);

  return (
    <div className="flex flex-col bg-white">
      {/* Dynamic Page Hero */}
      <PageHero
        badge={category}
        title={title}
        subtitle={`${duration} • ${destination}`}
        breadcrumbs={[
          { label: t('nav.services'), to: "/services" },
          { label: title }
        ]}
        image={tour.coverImage}
      />

      {/* Main Tour Details Content Area */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Facts Ribbon */}
          <div className="bg-slate-50 rounded-3xl p-5 sm:p-7 border border-slate-200/80 mb-12 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">{t('tours.durationLabel')}</div>
                <div className="font-bold text-navy-900">{duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">{t('tours.destinationLabel')}</div>
                <div className="font-bold text-navy-900 truncate max-w-[140px]">{destination}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">{t('tours.groupSizeLabel')}</div>
                <div className="font-bold text-navy-900">{groupSize}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">{t('tours.difficultyLabel')}</div>
                <div className="font-bold text-navy-900">{difficulty}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Left 8 Cols: Tour Information */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Photo Showcase & Gallery */}
              <div>
                <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200/80 mb-4 shadow-md">
                  <img
                    src={selectedGalleryImg || tour.coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedGalleryImg(img)}
                        className={`w-20 h-14 sm:w-24 sm:h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                          selectedGalleryImg === img
                            ? 'border-teal-500 scale-95 shadow-sm'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-4">
                  {t('tours.overview')}
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {overview}
                </p>

                {/* Key Highlights */}
                {highlights.length > 0 && (
                  <div className="mt-6 p-7 rounded-3xl bg-teal-50/70 border border-teal-200">
                    <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 fill-current text-teal-600" />
                      {t('tours.journeyHighlights')}
                    </h3>
                    <ul className="space-y-3 text-sm text-navy-900 font-medium">
                      {highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Day-by-Day Itinerary */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
                      {t('tours.dailySchedule')}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                      {t('tours.itinerary')}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {t('tours.daysTotal', { count: itinerary.length })}
                  </span>
                </div>

                <div className="space-y-4">
                  {itinerary.map((item) => {
                    const isExpanded = activeDay === item.day;
                    return (
                      <div
                        key={item.day}
                        className={`rounded-2xl border transition-all ${
                          isExpanded
                            ? 'bg-white border-teal-500 shadow-sm'
                            : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveDay(isExpanded ? null : item.day)}
                          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                              isExpanded
                                ? 'bg-teal-500 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              D{item.day}
                            </span>
                            <div>
                              <div className="text-xs text-slate-500 font-semibold">{t('tours.day', { day: item.day })}</div>
                              <div className="text-base sm:text-lg font-bold text-navy-900">
                                {item.title}
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${
                              isExpanded ? 'rotate-180 text-teal-600' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fade-in-down">
                            {item.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Inclusions */}
                <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                  <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    {t('tours.inclusions')}
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                  <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <XIcon className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    {t('tours.exclusions')}
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Share & Consultation Bar */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-white border border-slate-200 text-navy-900 hover:border-teal-500 transition-colors shadow-2xs"
                  >
                    <Share2 className="w-4 h-4 text-teal-600" />
                    <span>{copied ? t('tours.linkCopied') : t('tours.shareItinerary')}</span>
                  </button>
                  <span className="text-xs text-slate-500">
                    {t('tours.shareWithCompanions')}
                  </span>
                </div>

                <Link
                  to="/services"
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('tours.browseMoreTours')}</span>
                </Link>
              </div>

            </div>

            {/* Right 4 Cols: Booking Form & Direct Assistance Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Sticky container */}
              <div className="sticky top-24 space-y-6">
                
                {/* Booking Inquiry Form */}
                <BookingInquiryForm
                  tourTitle={title}
                  tourSlug={tour.slug}
                />

                {/* Direct Assistance Card */}
                <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200/80 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">
                    {t('tours.preferDirectMessaging')}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t('tours.directMessagingDesc')}
                  </p>
                  <a
                    href={getWhatsAppUrl(
                      primaryPhone.raw,
                      buildTourWhatsAppMessage(title)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t('tours.chatAboutTour')}</span>
                  </a>

                  <div className="pt-2 text-xs text-slate-500">
                    {t('tours.orCallOffice')} <strong className="text-navy-900 font-mono">{primaryPhone.display}</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Related Tours Section */}
          {relatedTours.length > 0 && (
            <div className="mt-20 pt-16 border-t border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
                    {t('tours.moreAdventures')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                    {t('tours.relatedItineraries')}
                  </h2>
                </div>
                <Link
                  to="/services"
                  className="text-sm font-bold text-teal-600 hover:text-teal-700 hidden sm:inline"
                >
                  {t('tours.viewAllTours')}
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTours.map((item) => (
                  <TourCard key={item.id} tour={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
