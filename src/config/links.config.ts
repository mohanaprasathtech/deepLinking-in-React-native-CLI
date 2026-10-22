import { colors } from '../theme/colors';
import type { LinkItem } from '../types/link.types';

/**
 * Every link the home screen shows lives here, so adding a fourth button
 * means adding one object — no UI changes needed.
 */
export const DEEP_LINKS: LinkItem[] = [
  {
    id: 'amazon-product',
    label: 'Open Amazon Product',
    description: 'Opens in the Amazon app (or browser if not installed)',
    url: 'https://amzn.in/d/04klmfqB',
    openMode: 'external',
    accentColor: colors.amazon,
  },
  {
    id: 'flipkart-product',
    label: 'Open Flipkart Product',
    description: 'Opens in the Flipkart app (or browser if not installed)',
    url: 'https://dl.flipkart.com/s/BtFCGPuuuN',
    openMode: 'external',
    accentColor: colors.flipkart,
  },
  {
    id: 'youtube-video',
    label: 'Preview YouTube Video',
    description: 'Plays here in a floating mini player you can drag around',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    openMode: 'inAppPreview',
    accentColor: colors.youtube,
  },
];
