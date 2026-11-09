import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Compass, MessageCircle } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Button from '../components/common/Button';
import LoadingState from '../components/common/LoadingState';
import BlogCard from '../components/blog/BlogCard';
import { blogService } from '../services/blogService';
import { companyInfo } from '../data/navigation';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export default function BlogPost() {
  const { slug } = useParams();
  const { language, t, getLocalized, formatDate } = useLanguage();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    blogService.getPostBySlug(slug).then((data) => {
      if (mounted) {
        setPost(data);
        setLoading(false);
        if (data) {
          blogService.getRecentPosts(data.slug, 3).then((rel) => {
            if (mounted) setRelatedPosts(rel);
          });
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const postTitle = post ? getLocalized(post, 'title') : '';
  const postExcerpt = post ? getLocalized(post, 'excerpt') : '';
  const postAuthor = post ? (getLocalized(post, 'author') || t('blog.writtenBy')) : '';
  const postCategory = post ? (getLocalized(post, 'category') || post.category) : '';
  const postContent = (post?.translations?.[language]?.content) || post?.content || [];

  useEffect(() => {
    if (post) {
      document.title = `${postTitle} | Expedition Travel – Go Lite`;
    } else if (!loading) {
      document.title = `${t('blog.articleNotFound')} | Expedition Travel – Go Lite`;
    }
  }, [post, postTitle, loading, t]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        text: postExcerpt,
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
        <LoadingState message={t('blog.loadingArticle')} height="h-96" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-32 text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-navy-900 mb-3">{t('blog.articleNotFound')}</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {t('blog.articleNotFoundDesc')}
        </p>
        <Button to="/blog" variant="primary" icon={ArrowLeft}>
          {t('blog.backToBlog')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <PageHero
        badge={postCategory}
        title={postTitle}
        breadcrumbs={[
          { label: t('nav.blog'), to: "/blog" },
          { label: postTitle }
        ]}
        image={post.image}
      />

      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Article Metadata bar */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 mb-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-navy-900 font-semibold">
                <User className="w-4 h-4 text-teal-600" />
                {postAuthor}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-navy-900 hover:border-teal-500 transition-colors shadow-2xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 text-teal-600" />
              <span>{copied ? t('blog.linkCopied') : t('blog.shareArticle')}</span>
            </button>
          </div>

          {/* Lead Excerpt */}
          <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/70 border-l-4 border-teal-500 mb-10 text-base sm:text-lg text-navy-900 font-medium italic leading-relaxed">
            "{postExcerpt}"
          </div>

          {/* Main Article Body */}
          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
            {postContent?.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-navy-900 pt-6 mb-2">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Call to Action Box */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <Compass className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-2">
              {t('blog.inspiredTitle')}
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
              {t('blog.inspiredDesc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button to="/services" variant="primary" size="md">
                {t('blog.browseTourPackages')}
              </Button>
              <a
                href={getWhatsAppUrl(primaryPhone.raw, `Hello Hana Lema, I read your article "${postTitle}" on Expedition Travel – Go Lite and would like to inquire.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t('blog.chatWhatsApp')}</span>
              </a>
            </div>
          </div>

          {/* Navigation Back */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('blog.backToBlog')}</span>
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-8">
                {t('blog.moreTravelGuides')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <BlogCard key={rel.id} post={rel} />
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </div>
  );
}
