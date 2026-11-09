import React, { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import BlogCard from '../components/blog/BlogCard';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ScrollReveal from '../components/common/ScrollReveal';
import { blogService } from '../services/blogService';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${t('blog.pageTitle')} | Expedition Travel – Go Lite`;
    
    blogService.getCategories().then((cats) => {
      setCategories(cats);
    });

    blogService.getFeaturedPost().then((post) => {
      setFeaturedPost(post);
    });
  }, [t]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    blogService.getBlogPosts({
      category: activeCategory,
      search: search
    }).then((data) => {
      if (mounted) {
        setPosts(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [activeCategory, search]);

  return (
    <div className="flex flex-col bg-white">
      <PageHero
        badge={t('blog.badge')}
        title={t('blog.pageTitle')}
        subtitle={t('blog.pageSubtitle')}
        breadcrumbs={[{ label: t('nav.blog') }]}
        image="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-12 md:py-16 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Article (When viewing All and no search) */}
          {activeCategory === 'All' && !search && featuredPost && (
            <ScrollReveal direction="up" className="mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block mb-3">
                {t('blog.mustRead')}
              </span>
              <BlogCard post={featuredPost} featured={true} />
            </ScrollReveal>
          )}

          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 mb-10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap btn-interactive ${
                    activeCategory === cat
                      ? 'bg-teal-500 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-600 hover:text-navy-900 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? t('blog.allCategories') : cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

          </div>

          {/* Posts Grid */}
          {loading ? (
            <LoadingState asCards={true} cardsCount={6} />
          ) : posts.length === 0 ? (
            <EmptyState
              title={t('blog.emptyTitle')}
              description={t('blog.emptyDesc')}
              onReset={() => {
                setSearch('');
                setActiveCategory('All');
              }}
              resetText={t('tours.resetFilters')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <ScrollReveal key={post.id} direction="up" delay={idx * 60}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
