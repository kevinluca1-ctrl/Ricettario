import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';

import SettingsScreen from '../../app/settings';
import { initI18n } from '@/i18n';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { SETTING_KEYS } from '@/lib/storage';
import { lightTheme } from '@/theme';

it('switches the UI language and persists the choice', async () => {
  await AsyncStorage.clear();
  const language = await initI18n('system');

  await render(
    <LanguageProvider initialPreference="system" initialLanguage={language}>
      <PaperProvider theme={lightTheme}>
        <SettingsScreen />
      </PaperProvider>
    </LanguageProvider>,
  );

  expect(screen.getByText('Sprache')).toBeTruthy();
  expect(screen.getByText('Systemsprache (Deutsch)')).toBeTruthy();

  await fireEvent.press(screen.getByTestId('language-it'));

  expect(screen.getByText('Lingua')).toBeTruthy();
  expect(await AsyncStorage.getItem(SETTING_KEYS.uiLanguage)).toBe('it');
});
