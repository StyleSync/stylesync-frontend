export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'uk-UA'],
} as const;

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
export const dictionaries = {
  en: () =>
    import('@/modules/internationalization/dictionaries/en.json').then(
      (module) => module.default
    ),
  'uk-UA': () =>
    import('@/modules/internationalization/dictionaries/uk-UA.json').then(
      (module) => module.default
    ),
};
