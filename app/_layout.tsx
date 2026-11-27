import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { initI18n, loadLanguagePreference, type Language, type LanguagePreference } from '@/i18n';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { darkTheme, lightTheme } from '@/theme';

// A reload or deep link to /settings still gets Home underneath it (back arrow works).
export const unstable_settings = { initialRouteName: 'index' };

type Boot = { preference: LanguagePreference; language: Language };

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [boot, setBoot] = useState<Boot | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const preference = await loadLanguagePreference();
      const language = await initI18n(preference);
      if (active) setBoot({ preference, language });
    })();
    return () => {
      active = false;
    };
  }, []);

  // Render nothing until the language is known, so text never flashes in the wrong language.
  if (!boot) return null;

  return (
    <LanguageProvider initialPreference={boot.preference} initialLanguage={boot.language}>
      <PaperProvider theme={theme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <AppStack />
      </PaperProvider>
    </LanguageProvider>
  );
}

function AppStack() {
  const { t } = useTranslation();
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: t('app.name') }} />
      <Stack.Screen name="settings" options={{ title: t('settings.title') }} />
    </Stack>
  );
}
