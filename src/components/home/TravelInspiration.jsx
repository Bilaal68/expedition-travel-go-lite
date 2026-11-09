import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BlogCard from '../blog/BlogCard';
import Button from '../common/Button';
import LoadingState from '../common/LoadingState';
import { blogService } from '../../services/blogService';
import { useLanguage } from '../../context/LanguageContext';

import ScrollReveal from '../common/ScrollReveal';

export default function TravelInspiration() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;
    blogService.getRecentPosts(null, 3).then((data) => {
      if (mounted) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 md:py-24 bg-slate-50/70 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeading
              badge={t('home.travelInspiration.badge')}
              title={t('home.travelInspiration.title')}
              subtitle={t('home.travelInspiration.subtitle')}
              align="left"
              className="max-w-2xl"
            />

            <Button
              to="/blog"
              variant="tealOutline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="self-start md:self-end shrink-0"
            >
              {t('home.travelInspiration.viewAllBtn')}
            </Button>
          </div>
        </ScrollReveal>

        {loading ? (
          <LoadingState asCards={true} cardsCount={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <ScrollReveal key={post.id} direction="up" delay={idx * 80}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
