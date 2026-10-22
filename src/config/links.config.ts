import { colors } from '../theme/colors';
import type { LinkItem } from '../types/link.types';

/**
 * Every link the home screen shows lives here, so adding a fourth card
 * means adding one object — no UI changes needed.
 */
export const DEEP_LINKS: LinkItem[] = [
  {
    id: 'amazon-product',
    label: 'Amazon Product',
    description: 'Jumps into the Amazon app',
    url: 'https://amzn.in/d/04klmfqB',
    openMode: 'external',
    accentColor: colors.amazon,
    icon: 'a',
    category: 'Shopping',
  },
  {
    id: 'flipkart-product',
    label: 'Flipkart Product',
    description: 'Jumps into the Flipkart app',
    url: 'https://dl.flipkart.com/s/BtFCGPuuuN',
    openMode: 'external',
    accentColor: colors.flipkart,
    icon: 'F',
    category: 'Shopping',
  },
  {
    id: 'youtube-video',
    label: 'YouTube Video',
    description: 'Plays here in a floating mini player',
    // NOTE: the video owner must allow embedding. A video with embedding
    // turned off shows "Error 150/101" inside the player instead of playing.
    url: 'https://www.youtube.com/watch?v=7wtfhZwyrcc',
    openMode: 'inAppPreview',
    accentColor: colors.youtube,
    icon: '▶',
    category: 'Watch',
  },
];
