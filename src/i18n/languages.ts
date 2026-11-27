/**
 * Supported UI languages. Adding a language later means adding its locale
 * folder, one entry here and one resource entry in `resources.ts`.
 */
export const SUPPORTED_LANGUAGES = ['de', 'en', 'it'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** What the user picked in settings. `system` follows the device language. */
export type LanguagePreference = 'system' | Language;

export const LANGUAGE_PREFERENCES: readonly LanguagePreference[] = [
  'system',
  ...SUPPORTED_LANGUAGES,
];

export const FALLBACK_LANGUAGE: Language = 'en';

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function isLanguagePreference(value: unknown): value is LanguagePreference {
  return value === 'system' || isLanguage(value);
}

/**
 * Pick the first device language we support, matching on the language code
 * only ("de-AT" -> "de"). Falls back to English.
 */
export function detectLanguage(deviceLanguageTags: readonly string[]): Language {
  for (const tag of deviceLanguageTags) {
    const code = tag.toLowerCase().split(/[-_]/)[0];
    if (isLanguage(code)) return code;
  }
  return FALLBACK_LANGUAGE;
}

/** Turn the stored preference into the language that is actually shown. */
export function resolveLanguage(
  preference: LanguagePreference,
  deviceLanguageTags: readonly string[],
): Language {
  return preference === 'system' ? detectLanguage(deviceLanguageTags) : preference;
}
