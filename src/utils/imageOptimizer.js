/**
 * Image optimization utility for low-bandwidth and mobile connections.
 * Optimizes image URLs (Unsplash, CDN) with explicit dimensions, format, and quality parameters.
 */

export const FALLBACK_IMAGE = '/images/lalibela.jpg';

/**
 * Optimizes an image URL for the requested display size and quality.
 * @param {string} url - Original image URL
 * @param {object} options - { width, height, quality, fit }
 * @returns {string} - Optimized URL
 */
export function getOptimizedImageUrl(url, { width = 800, height, quality = 75, fit = 'crop' } = {}) {
  if (!url || typeof url !== 'string') {
    return FALLBACK_IMAGE;
  }

  // Handle Unsplash images
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', fit);
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(quality));
      if (height) {
        parsed.searchParams.set('h', String(height));
      }
      return parsed.toString();
    } catch (_) {
      return url;
    }
  }

  // Handle Supabase Storage transformation if supported, or return as-is
  return url;
}

/**
 * Generate a responsive srcSet string for Unsplash images
 */
export function getResponsiveSrcSet(url, widths = [480, 768, 1200], quality = 75) {
  if (!url || !url.includes('images.unsplash.com')) {
    return undefined;
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(url, { width: w, quality })} ${w}w`)
    .join(', ');
}
