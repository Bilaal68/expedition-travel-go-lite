import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function DestinationCard({ destination }) {
  const { t, getLocalized } = useLanguage();
  if (!destination) return null;

  const destName = getLocalized(destination, 'name') || destination.name;
  const destSubtitle = getLocalized(destination, 'subtitle') || destination.subtitle;
  const destDescription = getLocalized(destination, 'description') || destination.description;
  const destRegion = getLocalized(destination, 'region') || destination.region;

  const rawImage = destination.image || destination.coverImage;
  const optimizedImage = getOptimizedImageUrl(rawImage, { width: 800, quality: 80 });

  return (
    <Link
      to="/destinations"
      className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] block bg-navy-950 border border-slate-200/80 shadow-sm card-hover-effect"
    >
      {/* Background Image */}
      <img
        src={optimizedImage}
        alt={destName}
        loading="lazy"
        decoding="async"
        width="800"
        height="1000"
        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/lalibela.jpg';
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
      <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/15 transition-colors duration-300" />

      {/* Region tag */}
      <div className="absolute top-4 left-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-navy-900 shadow-sm flex items-center gap-1">
          <MapPin className="w-3 h-3 text-forest-700" />
          <span>{destRegion}</span>
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
        {destSubtitle && (
          <div className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-1.5">
            {destSubtitle}
          </div>
        )}
        <h3 className="text-2xl font-bold text-white group-hover:text-gold-200 transition-colors mb-2 font-serif">
          {destName}
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 mb-3 leading-relaxed">
          {destDescription}
        </p>

        <div className="flex items-center justify-between text-xs font-semibold text-gold-400 pt-2.5 border-t border-white/20">
          <span>{destination.category || t('destinations.badge')}</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
            <span>{t('home.destinations.exploreBtn')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
