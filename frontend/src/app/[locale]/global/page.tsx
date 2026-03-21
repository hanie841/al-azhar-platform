import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { GlobalPageClient } from '@/components/university/GlobalPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الأزهر عالمياً' : 'Al-Azhar Worldwide',
    description: isAr
      ? 'الحضور العالمي لجامعة الأزهر وشراكاتها الدولية.'
      : 'The global presence and international partnerships of Al-Azhar University.',
  };
}

export default async function GlobalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GlobalPageClient />;
}
