import AsyncStorage from '@react-native-async-storage/async-storage';

import { applyLanguagePreference, i18next, initI18n, loadLanguagePreference } from '..';
import { SETTING_KEYS } from '@/lib/storage';

beforeEach(async () => {
  await AsyncStorage.clear();
});

it('defaults to system (device is mocked as de-DE)', async () => {
  const preference = await loadLanguagePreference();
  expect(preference).toBe('system');
  expect(await initI18n(preference)).toBe('de');
  expect(i18next.t('settings.title')).toBe('Einstellungen');
});

it('ignores garbage in storage', async () => {
  await AsyncStorage.setItem(SETTING_KEYS.uiLanguage, 'klingon');
  expect(await loadLanguagePreference()).toBe('system');
});

it('persists a choice and restores it on the next start', async () => {
  await initI18n('system');
  expect(await applyLanguagePreference('it')).toBe('it');
  expect(i18next.t('settings.title')).toBe('Impostazioni');

  // Simulated restart: read the stored preference again.
  const restored = await loadLanguagePreference();
  expect(restored).toBe('it');
  expect(await initI18n(restored)).toBe('it');
});

it('switching back to system follows the device again', async () => {
  await applyLanguagePreference('en');
  expect(await applyLanguagePreference('system')).toBe('de');
  expect(await AsyncStorage.getItem(SETTING_KEYS.uiLanguage)).toBe('system');
});
