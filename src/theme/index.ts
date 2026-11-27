import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { palette } from './tokens';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.terracotta,
    onPrimary: palette.white,
    primaryContainer: '#F6DCD3',
    onPrimaryContainer: '#3D1408',
    secondary: palette.olive,
    onSecondary: palette.white,
    secondaryContainer: '#E3E8CF',
    onSecondaryContainer: '#1D230A',
    background: palette.grey50,
    onBackground: palette.grey900,
    surface: palette.white,
    onSurface: palette.grey900,
    surfaceVariant: palette.grey100,
    onSurfaceVariant: palette.grey700,
    outline: palette.grey300,
    outlineVariant: palette.grey200,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.terracottaLight,
    onPrimary: '#5A1B0B',
    primaryContainer: '#7E3320',
    onPrimaryContainer: '#FFDBD0',
    secondary: palette.oliveLight,
    onSecondary: '#2A3212',
    secondaryContainer: '#424C22',
    onSecondaryContainer: '#E3E8CF',
    background: palette.grey950,
    onBackground: palette.grey100,
    surface: palette.grey900,
    onSurface: palette.grey100,
    surfaceVariant: palette.grey800,
    onSurfaceVariant: palette.grey300,
    outline: palette.grey500,
    outlineVariant: palette.grey700,
  },
};

export { palette, radius, spacing } from './tokens';
