import { SUPPORTED_LANGUAGES } from '../languages';
import { NAMESPACES, resources } from '../resources';

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value === null || typeof value !== 'object') return [];
  return Object.values(value).flatMap(leaves);
}

describe.each(NAMESPACES)('namespace "%s"', (ns) => {
  const reference = flattenKeys(resources.en[ns]).sort();

  it.each(SUPPORTED_LANGUAGES)('%s has exactly the same keys as en', (lang) => {
    expect(flattenKeys(resources[lang][ns]).sort()).toEqual(reference);
  });

  const EM_DASH = String.fromCharCode(0x2014);

  it.each(SUPPORTED_LANGUAGES)('%s has no empty strings and no em dashes', (lang) => {
    for (const text of leaves(resources[lang][ns])) {
      expect(text.trim()).not.toBe('');
      expect(text).not.toContain(EM_DASH);
    }
  });
});
