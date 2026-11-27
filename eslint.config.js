// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const i18next = require('eslint-plugin-i18next');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*', 'web-build/*', '.expo/*', 'node_modules/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // No hardcoded UI strings: every visible text goes through t().
    files: ['app/**/*.tsx', 'src/**/*.tsx'],
    ignores: ['**/*.test.tsx', '**/__tests__/**'],
    plugins: { i18next },
    rules: {
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            exclude: ['testID', 'name', 'icon', 'value', 'mode', 'variant', 'style', 'key', 'href'],
          },
        },
      ],
    },
  },
]);
