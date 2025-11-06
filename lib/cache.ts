/**
 * Caching Utilities for FTC API Data
 *
 * Implements smart caching with time-based revalidation:
 * - Once per day normally
 * - Every 30 minutes on Fridays and Sundays (CST)
 * - Every 5 minutes on Saturdays (CST)
 */

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    expiresAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, CacheEntry<any>>();

/**
 * Get the cache TTL (time to live) in milliseconds based on current day/time
 * All times are in CST (UTC-6)
 */
export function getCacheTTL(): number {
    const now = new Date();

    // Convert to CST (UTC-6)
    const cstOffset = -6 * 60; // CST offset in minutes
    const localOffset = now.getTimezoneOffset(); // local offset in minutes
    const cstTime = new Date(
        now.getTime() + (localOffset + cstOffset) * 60 * 1000
    );

    const dayOfWeek = cstTime.getDay(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek === 6) {
        // Saturday: 5 minutes
        return 5 * 60 * 1000;
    } else if (dayOfWeek === 0 || dayOfWeek === 5) {
        // Sunday (0) or Friday (5): 30 minutes
        return 30 * 60 * 1000;
    } else {
        // Other days: 24 hours
        return 24 * 60 * 60 * 1000;
    }
}

/**
 * Get data from cache if valid, otherwise return null
 */
export function getFromCache<T>(key: string): T | null {
    const entry = cache.get(key);

    if (!entry) {
        return null;
    }

    const now = Date.now();

    if (now > entry.expiresAt) {
        // Cache expired
        cache.delete(key);
        return null;
    }

    return entry.data;
}

/**
 * Store data in cache with automatic expiration
 */
export function setInCache<T>(key: string, data: T): void {
    const now = Date.now();
    const ttl = getCacheTTL();

    cache.set(key, {
        data,
        timestamp: now,
        expiresAt: now + ttl,
    });
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
    cache.clear();
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
    const now = Date.now();
    const entries = Array.from(cache.entries()).map(([key, entry]) => ({
        key,
        age: now - entry.timestamp,
        expiresIn: entry.expiresAt - now,
    }));

    return {
        size: cache.size,
        entries,
    };
}
