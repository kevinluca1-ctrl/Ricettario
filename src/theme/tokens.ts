/**
 * Design tokens. Light grey base with a terracotta accent.
 * All colours used in the app should come from here (via the Paper theme).
 */
export const palette = {
  terracotta: '#A8472E',
  terracottaLight: '#E8A48F',
  olive: '#5F6B3A',
  oliveLight: '#B9C48F',
  grey50: '#F7F7F7',
  grey100: '#EEEEEE',
  grey200: '#E0E0E0',
  grey300: '#C7C7C7',
  grey500: '#8A8A8A',
  grey700: '#4A4A4A',
  grey800: '#2B2B2B',
  grey900: '#1C1C1C',
  grey950: '#121212',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;
