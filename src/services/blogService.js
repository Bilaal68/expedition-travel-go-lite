import { blogPosts as localBlogPosts } from '../data/blogPosts';
import { adminService } from './adminService';
import { isSupabaseConfigured } from '../lib/supabase';
import { dataCache, withTimeout } from '../utils/cache';

/**
 * Service layer for Blog Articles.
 * Reads from Supabase table 'blog_posts' when configured, with caching & timeouts for mobile networks.
 */
export const blogService = {
  async _getAllRawPosts() {
    return dataCache.fetch('blog:all', async () => {
      try {
        if (isSupabaseConfigured()) {
          const fetchPromise = adminService.getBlogPosts();
          const livePosts = await withTimeout(fetchPromise, 8000, null);
          if (livePosts && livePosts.length > 0) {
            return livePosts;
          }
        }
      } catch (err) {
        console.warn('Falling back to local blog data due to network:', err);
      }
      return localBlogPosts;
    }, 4 * 60 * 1000);
  },

  /**
   * Get all blog posts with optional category filtering
   */
  async getBlogPosts({ category = 'All', search = '' } = {}) {
    const raw = await this._getAllRawPosts();
    let filtered = [...raw];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.excerpt?.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  /**
   * Get the primary featured post (e.g. latest or highlighted)
   */
  async getFeaturedPost() {
    const raw = await this._getAllRawPosts();
    return raw[0] || null;
  },

  /**
   * Get post by slug
   */
  async getPostBySlug(slug) {
    const raw = await this._getAllRawPosts();
    return raw.find((p) => p.slug === slug) || null;
  },

  /**
   * Get recent posts excluding the current one
   */
  async getRecentPosts(currentSlug = null, limit = 3) {
    const raw = await this._getAllRawPosts();
    return raw
      .filter((p) => p.slug !== currentSlug)
      .slice(0, limit);
  },

  /**
   * Get unique blog categories
   */
  async getCategories() {
    const raw = await this._getAllRawPosts();
    const set = new Set(raw.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }
};
