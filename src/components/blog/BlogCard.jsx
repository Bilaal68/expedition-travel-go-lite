import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function BlogCard({ post, featured = false }) {
  const { t, getLocalized, formatDate, language } = useLanguage();
  if (!post) return null;

  const title = getLocalized(post, 'title') || post.title;
  const excerpt = getLocalized(post, 'excerpt') || post.excerpt;
  const category = getLocalized(post, 'category') || post.category;
  const coverImage = post.image || post.coverImage;
  const optimizedImage = getOptimizedImageUrl(coverImage, { width: featured ? 800 : 600, quality: 75 });

  if (featured) {
    return (
      <article className="group bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200/80 card-hover-effect">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 min-h-[300px]">
          <img
            src={optimizedImage}
            alt={title}
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=70';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500 text-white shadow-sm">
              {t('blog.featuredBadge')}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="text-teal-600 font-bold uppercase tracking-wider">
                {category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 group-hover:text-teal-600 transition-colors mb-4 leading-tight">
              <Link to={`/blog/${post.slug}`}>
                {title}
              </Link>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {language === 'am' ? 'አዘጋጅ፡' : 'By'}{' '}
              <span className="text-forest-900 font-semibold">{post.author || 'Expedition Travel Editorial'}</span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 group-hover:text-teal-700 transition-colors"
            >
              <span>{t('common.readArticle')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200/80 shadow-xs card-hover-effect">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={optimizedImage}
          alt={title}
          loading="lazy"
          decoding="async"
          width="600"
          height="375"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=70';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-navy-900 shadow-xs">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-teal-600" />
              {formatDate(post.date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-600" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-2.5">
            <Link to={`/blog/${post.slug}`}>
              {title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {post.author || 'Expedition Travel'}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold text-teal-600 group-hover:text-teal-700 inline-flex items-center gap-1 transition-colors"
          >
            <span>{t('common.readMore')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
