import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function TourFilters({
  search,
  setSearch,
  category,
  setCategory,
  categories = [],
  destination,
  setDestination,
  destinations = [],
  sortBy,
  setSortBy,
  onReset,
  totalResults
}) {
  const { t, getLocalized, language } = useLanguage();
  const hasActiveFilters = search || (category && category !== 'All') || (destination && destination !== 'All') || sortBy !== 'default';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 mb-8 shadow-sm">
      {/* Search Bar & Primary Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('tours.searchPlaceholder')}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-10 py-3 text-sm text-navy-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 p-1 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Destination Dropdown */}
        <div className="w-full md:w-56 shrink-0">
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            aria-label={t('tours.allDestinations')}
            className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer transition-colors"
          >
            <option value="All">{t('tours.allDestinations')}</option>
            {destinations.map((d) => {
              const destName = getLocalized(d, 'name') || d.name;
              return (
                <option key={d.id || d.name} value={d.name}>
                  {destName}
                </option>
              );
            })}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-52 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label={t('tours.sortBy')}
            className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer transition-colors"
          >
            <option value="default">{t('tours.sortDefault')}</option>
            <option value="price-low">{t('tours.sortPriceLow')}</option>
            <option value="price-high">{t('tours.sortPriceHigh')}</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Filter Reset Row */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
            {t('common.filter')}:
          </span>
          {categories.map((cat) => {
            const catLabel = cat === 'All' ? t('tours.allCategories') : (t(`tours.categories.${cat}`) || cat);
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-teal-500 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:text-navy-900 hover:bg-slate-200'
                }`}
              >
                {catLabel}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
          <span className="text-slate-500">
            {language === 'am' ? (
              <>የተገኙ ውጤቶች፡ <strong className="text-navy-900">{totalResults}</strong></>
            ) : (
              <>Showing: <strong className="text-navy-900">{totalResults} services</strong></>
            )}
          </span>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('tours.resetFilters')}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
