import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';
import itCommon from './locales/it/common.json';
import type { Language } from './languages';

export const NAMESPACES = ['common'] as const;
export const DEFAULT_NAMESPACE = 'common';

export const resources = {
  de: { common: deCommon },
  en: { common: enCommon },
  it: { common: itCommon },
} as const satisfies Record<Language, Record<(typeof NAMESPACES)[number], unknown>>;
