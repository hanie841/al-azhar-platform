'use client';

import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('accessibility');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary-700 focus:text-white focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rtl:focus:left-auto rtl:focus:right-4"
    >
      {t('skipToContent')}
    </a>
  );
}
