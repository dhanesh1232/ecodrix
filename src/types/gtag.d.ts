/**
 * Global type augmentations for ECODrIx.
 *
 * Declares the `window.gtag` function injected by the GA4 script so that
 * TypeScript-aware analytics components can call it without errors.
 * Spec: https://developers.google.com/tag-platform/gtagjs/reference
 */

type GtagCommand = "config" | "event" | "js" | "set" | "get" | "consent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagParams = Record<string, any>;

declare global {
  interface Window {
    dataLayer: GtagParams[];
    gtag: (
      command: GtagCommand,
      target: string | Date,
      params?: GtagParams,
    ) => void;
  }
}

export {};
