import 'i18next';
import type enCommon from './locales/en/common.json';

// English is the reference locale: t() keys are type-checked against it.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof enCommon;
    };
  }
}
