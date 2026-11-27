import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { applyLanguagePreference, type Language, type LanguagePreference } from './index';

type LanguageContextValue = {
  preference: LanguagePreference;
  language: Language;
  setPreference: (preference: LanguagePreference) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type Props = {
  initialPreference: LanguagePreference;
  initialLanguage: Language;
  children: ReactNode;
};

export function LanguageProvider({ initialPreference, initialLanguage, children }: Props) {
  const [preference, setPreferenceState] = useState(initialPreference);
  const [language, setLanguage] = useState(initialLanguage);

  const setPreference = useCallback(async (next: LanguagePreference) => {
    setPreferenceState(next);
    setLanguage(await applyLanguagePreference(next));
  }, []);

  const value = useMemo(
    () => ({ preference, language, setPreference }),
    [preference, language, setPreference],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
