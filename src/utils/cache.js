/**
 * Lightweight in-memory cache and request deduplicator for client-side data fetching.
 * Designed for mobile and slow connections to eliminate duplicate Supabase requests.
 */

class DataCache {
  constructor(defaultTtlMs = 5 * 60 * 1000) {
    this.cache = new Map();
    this.inFlight = new Map();
    this.defaultTtl = defaultTtlMs;
  }

  /**
   * Get cached data if valid, otherwise undefined
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.data;
  }

  /**
   * Set cache entry with custom or default TTL
   */
  set(key, data, ttlMs = this.defaultTtl) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs,
    });
    return data;
  }

  /**
   * Fetch with cache and deduplication of in-flight promises.
   * If a request is already running for this key, all callers share the same promise.
   */
  async fetch(key, fetchFn, ttlMs = this.defaultTtl) {
    const cached = this.get(key);
    if (cached !== undefined) {
      return cached;
    }

    if (this.inFlight.has(key)) {
      return this.inFlight.get(key);
    }

    const promise = (async () => {
      try {
        const data = await fetchFn();
        this.set(key, data, ttlMs);
        return data;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, promise);
    return promise;
  }

  /**
   * Invalidate a specific key or keys matching a prefix/regex
   */
  invalidate(pattern) {
    if (!pattern) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (typeof pattern === 'string' && key.startsWith(pattern)) {
        this.cache.delete(key);
      } else if (pattern instanceof RegExp && pattern.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

export const dataCache = new DataCache(4 * 60 * 1000); // 4 minutes TTL

/**
 * Wraps a promise with a timeout to prevent requests from hanging forever on flaky mobile networks
 */
export async function withTimeout(promise, timeoutMs = 8000, fallbackValue = null) {
  let timer;
  const timeoutPromise = new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve(fallbackValue);
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer);
    return result;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}
