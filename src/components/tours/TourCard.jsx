import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function TourCard({ tour }) {
  const { t, getLocalized, formatPrice, language } = useLanguage();
  if (!tour) return null;

  const title = getLocalized(tour, 'title') || tour.title;
  const overview = getLocalized(tour, 'overview') || tour.overview;
  const destination = getLocalized(tour, 'destination') || tour.destination;
  const duration = getLocalized(tour, 'duration') || tour.duration;
  const category = getLocalized(tour, 'category') || tour.category;
  const difficulty = getLocalized(tour, 'difficulty') || tour.difficulty;

  const translatedCategory = t(`tours.categories.${tour.category}`) || category;
  const translatedDifficulty = t(`tours.difficultyLevels.${tour.difficulty}`) || difficulty;

  const optimizedCover = getOptimizedImageUrl(tour.coverImage, { width: 600, quality: 75 });

  return (
    <article className="group bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200/80 shadow-xs card-hover-effect">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={optimizedCover}
          alt={title}
          loading="lazy"
          decoding="async"
          width="600"
          height="375"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=70';
          }}
        />
        
        {/* Subtle dark gradient overlay at top/bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-black/20" />

        {/* Category & Featured Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-navy-900 border border-slate-200 shadow-xs">
            {translatedCategory}
          </span>
          {tour.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500 text-white flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" />
              {t('common.featured')}
            </span>
          )}
        </div>

        {/* Destination pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-semibold text-white bg-navy-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="truncate max-w-[180px]">{destination}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Duration & Metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              {duration}
            </span>
            {tour.difficulty && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{translatedDifficulty}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-navy-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-3">
            <Link to={`/services/${tour.slug}`}>
              {title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {overview}
          </p>
        </div>

        {/* Card Footer: Price & Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              {language === 'am' ? 'የዋጋ ሁኔታ' : 'Pricing'}
            </div>
            <div className="text-base font-extrabold text-teal-600">
              {tour.priceValue ? formatPrice(tour.priceValue, '$') : (language === 'am' ? 'በጥያቄ መሰረት' : 'Upon Inquiry')}
              {tour.priceValue ? (
                <span className="text-xs font-normal text-slate-500 ml-1">/ {t('common.perPerson')}</span>
              ) : null}
            </div>
          </div>

          <Button
            to={`/services/${tour.slug}`}
            variant="tealOutline"
            size="sm"
            className="group/btn"
          >
            <span>{t('common.viewDetails')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </article>
  );
}
