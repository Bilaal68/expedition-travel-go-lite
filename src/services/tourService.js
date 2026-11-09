import { tours as localTours } from '../data/tours';
import { destinations as localDestinations } from '../data/destinations';
import { adminService } from './adminService';
import { isSupabaseConfigured } from '../lib/supabase';
import { dataCache, withTimeout } from '../utils/cache';

/**
 * Service layer for Tours.
 * Reads from cache/Supabase when configured, otherwise falls back gracefully to local data.
 * Caches responses in memory to optimize for slow and unstable mobile connections.
 */
export const tourService = {
  /**
   * Internal helper to fetch all active tours with caching and timeout
   */
  async _getAllRawTours() {
    return dataCache.fetch('tours:all', async () => {
      try {
        if (isSupabaseConfigured()) {
          const fetchPromise = adminService.getTours();
          const liveTours = await withTimeout(fetchPromise, 8000, null);
          if (liveTours && liveTours.length > 0) {
            return liveTours;
          }
        }
      } catch (err) {
        console.warn('Falling back to local tour data due to network:', err);
      }
      return localTours;
    }, 4 * 60 * 1000);
  },

  /**
   * Fetch all tours with optional search and filters
   */
  async getTours({ search = '', category = 'All', destination = 'All', sortBy = 'default' } = {}) {
    const rawTours = await this._getAllRawTours();
    let filtered = [...rawTours];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (t) => t.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (destination && destination !== 'All') {
      filtered = filtered.filter(
        (t) => t.destination?.toLowerCase() === destination.toLowerCase()
      );
    }

    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.title?.toLowerCase().includes(query) ||
          t.destination?.toLowerCase().includes(query) ||
          t.overview?.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (Number(a.priceValue) || 0) - (Number(b.priceValue) || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (Number(b.priceValue) || 0) - (Number(a.priceValue) || 0));
    }

    return filtered;
  },

  /**
   * Fetch featured tours for homepage
   */
  async getFeaturedTours(limit = 3) {
    const rawTours = await this._getAllRawTours();
    const featured = rawTours.filter((t) => t.featured).slice(0, limit);
    return featured.length > 0 ? featured : rawTours.slice(0, limit);
  },

  /**
   * Fetch a single tour by slug
   */
  async getTourBySlug(slug) {
    const rawTours = await this._getAllRawTours();
    const tour = rawTours.find((t) => t.slug === slug);
    return tour || null;
  },

  /**
   * Fetch related tours
   */
  async getRelatedTours(currentSlug, category, limit = 3) {
    const rawTours = await this._getAllRawTours();
    return rawTours
      .filter((t) => t.slug !== currentSlug)
      .sort((a, b) => {
        if (a.category === category && b.category !== category) return -1;
        if (a.category !== category && b.category === category) return 1;
        return 0;
      })
      .slice(0, limit);
  },

  /**
   * Get distinct categories
   */
  async getCategories() {
    const rawTours = await this._getAllRawTours();
    const set = new Set(rawTours.map((t) => t.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  },

  /**
   * Get all destinations with caching and timeout
   */
  async getDestinations() {
    return dataCache.fetch('destinations:all', async () => {
      try {
        if (isSupabaseConfigured()) {
          const fetchPromise = adminService.getDestinations();
          const liveDest = await withTimeout(fetchPromise, 8000, null);
          if (liveDest && liveDest.length > 0) {
            return liveDest;
          }
        }
      } catch (err) {
        console.warn('Falling back to local destinations due to network:', err);
      }
      return localDestinations;
    }, 5 * 60 * 1000);
  }
};
