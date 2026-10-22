export const colors = {
  // Base
  screenBackground: '#0A0C10',
  surface: '#13171F',
  surfaceRaised: 'rgba(255, 255, 255, 0.045)',
  surfaceBorder: 'rgba(255, 255, 255, 0.08)',
  surfaceBorderStrong: 'rgba(255, 255, 255, 0.16)',
  overlay: 'rgba(0, 0, 0, 0.9)',

  // Text
  textPrimary: '#F7F9FC',
  textSecondary: '#99A3B7',
  textMuted: '#687082',

  // Brand accents for the three cards.
  amazon: '#FF9900',
  flipkart: '#2874F0',
  youtube: '#FF0033',

  // Small accent used by the "live" dot in the header pill.
  accent: '#3DDC97',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 26,
  pill: 999,
} as const;
