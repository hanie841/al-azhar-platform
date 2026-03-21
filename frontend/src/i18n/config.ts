export const locales = ['ar', 'en', 'fr', 'zh', 'ru', 'es', 'ur'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français',
  zh: '中文',
  ru: 'Русский',
  es: 'Español',
  ur: 'اردو',
};

export const rtlLocales: Locale[] = ['ar', 'ur'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
