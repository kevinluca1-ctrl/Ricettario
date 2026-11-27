import { createInstance } from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';

import { readSetting, SETTING_KEYS, writeSetting } from '@/lib/storage';
import {
  FALLBACK_LANGUAGE,
  isLanguagePreference,
  resolveLanguage,
  type Language,
  type LanguagePreference,
} from './languages';
import { DEFAULT_NAMESPACE, NAMESPACES, resources } from './resources';

/** The app's single i18next instance (also registered for react-i18next hooks). */
export const i18next = createInstance();

export function deviceLanguageTags(): string[] {
  return getLocales().map((locale) => locale.languageTag);
}

export async function loadLanguagePreference(): Promise<LanguagePreference> {
  const stored = await readSetting(SETTING_KEYS.uiLanguage);
  return isLanguagePreference(stored) ? stored : 'system';
}

export async function initI18n(preference: LanguagePreference): Promise<Language> {
  const language = resolveLanguage(preference, deviceLanguageTags());
  if (!i18next.isInitialized) {
    await i18next.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: FALLBACK_LANGUAGE,
      ns: [...NAMESPACES],
      defaultNS: DEFAULT_NAMESPACE,
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  } else {
    await i18next.changeLanguage(language);
  }
  return language;
}

export async function applyLanguagePreference(preference: LanguagePreference): Promise<Language> {
  const language = resolveLanguage(preference, deviceLanguageTags());
  await i18next.changeLanguage(language);
  await writeSetting(SETTING_KEYS.uiLanguage, preference);
  return language;
}

export * from './languages';
