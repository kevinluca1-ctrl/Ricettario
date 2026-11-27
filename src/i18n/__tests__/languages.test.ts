import {
  detectLanguage,
  isLanguagePreference,
  LANGUAGE_PREFERENCES,
  resolveLanguage,
} from '../languages';

describe('detectLanguage', () => {
  it.each([
    [['de-DE'], 'de'],
    [['de-AT', 'en-US'], 'de'],
    [['it-IT'], 'it'],
    [['it-CH'], 'it'],
    [['en-GB'], 'en'],
    [['EN_us'], 'en'],
    [['fr-FR', 'it-IT'], 'it'],
    [['fr-FR', 'es-ES'], 'en'],
    [[], 'en'],
  ] as const)('%j -> %s', (tags, expected) => {
    expect(detectLanguage(tags)).toBe(expected);
  });
});

describe('resolveLanguage', () => {
  it('follows the device when preference is system', () => {
    expect(resolveLanguage('system', ['it-IT'])).toBe('it');
  });

  it('uses the explicit choice regardless of device', () => {
    expect(resolveLanguage('de', ['it-IT'])).toBe('de');
    expect(resolveLanguage('en', ['de-DE'])).toBe('en');
  });
});

describe('isLanguagePreference', () => {
  it('accepts every offered option', () => {
    for (const option of LANGUAGE_PREFERENCES) expect(isLanguagePreference(option)).toBe(true);
  });

  it.each([null, undefined, '', 'fr', 'DE', 42])('rejects %p', (value) => {
    expect(isLanguagePreference(value)).toBe(false);
  });
});
