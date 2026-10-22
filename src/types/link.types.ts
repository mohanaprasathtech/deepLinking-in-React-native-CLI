/**
 * Shared types for the deep-linking feature.
 */

/**
 * How a link should be handled when the user taps its button.
 *
 * - `external`: hand the URL to the OS. The OS (or the browser) decides
 *   which installed app can handle it — this is what opens Amazon / Flipkart.
 * - `inAppPreview`: keep the user inside our app and play the video in a
 *   small floating window (WhatsApp-style picture-in-picture preview).
 */
export type LinkOpenMode = 'external' | 'inAppPreview';

export interface LinkItem {
  /** Stable id, also used as the React list key. */
  id: string;
  /** Text shown on the button. */
  label: string;
  /** Short helper line shown under the label. */
  description: string;
  /** The actual deep link / URL. */
  url: string;
  /** Decides whether we leave the app or show the floating preview. */
  openMode: LinkOpenMode;
  /** Button background colour. */
  accentColor: string;
}

/** Result of trying to open a link outside the app. */
export interface OpenLinkResult {
  success: boolean;
  /** Human readable reason, only present when `success` is false. */
  message?: string;
}
