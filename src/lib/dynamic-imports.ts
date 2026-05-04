/**
 * Dynamic Import Manager
 *
 * Centralized module for lazy-loading heavy dependencies.
 * This reduces initial bundle size by loading libraries only when needed.
 */

export type DependencyName = "framer-motion" | "gsap" | "lenis";

// Cache for import promises to prevent duplicate network requests
const importCache = new Map<DependencyName, Promise<any>>();

/**
 * Lazy load Framer Motion for animated components
 * @returns Promise resolving to Framer Motion module
 */
export async function loadFramerMotion(): Promise<
  typeof import("framer-motion")
> {
  const cacheKey: DependencyName = "framer-motion";

  if (!importCache.has(cacheKey)) {
    importCache.set(
      cacheKey,
      import(/* webpackChunkName: "framer-motion" */ "framer-motion"),
    );
  }

  return importCache.get(cacheKey)!;
}

/**
 * Lazy load GSAP for complex animations
 * @returns Promise resolving to GSAP module
 */
export async function loadGSAP(): Promise<typeof import("gsap")> {
  const cacheKey: DependencyName = "gsap";

  if (!importCache.has(cacheKey)) {
    importCache.set(cacheKey, import(/* webpackChunkName: "gsap" */ "gsap"));
  }

  return importCache.get(cacheKey)!;
}

/**
 * Lazy load Lenis for smooth scrolling
 * @returns Promise resolving to Lenis module
 */
export async function loadLenis(): Promise<typeof import("lenis")> {
  const cacheKey: DependencyName = "lenis";

  if (!importCache.has(cacheKey)) {
    importCache.set(cacheKey, import(/* webpackChunkName: "lenis" */ "lenis"));
  }

  return importCache.get(cacheKey)!;
}

/**
 * Preload a dependency without blocking
 * Initiates the module fetch but doesn't wait for it
 * @param dependency - Name of the dependency to preload
 */
export function preload(dependency: DependencyName): void {
  switch (dependency) {
    case "framer-motion":
      loadFramerMotion().catch(console.error);
      break;
    case "gsap":
      loadGSAP().catch(console.error);
      break;
    case "lenis":
      loadLenis().catch(console.error);
      break;
  }
}

/**
 * Clear the import cache (useful for testing)
 */
export function clearCache(): void {
  importCache.clear();
}
