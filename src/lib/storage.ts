import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Small key/value store for settings. Failures never crash the app:
 * reads fall back to null, writes are best effort.
 */
export async function readSetting(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function writeSetting(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // Ignored on purpose: the in-memory value still applies for this session.
  }
}

export const SETTING_KEYS = {
  uiLanguage: 'settings.uiLanguage',
} as const;
