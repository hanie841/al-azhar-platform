import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { NewsPage } from '@/components/news/NewsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'آخر الأخبار' : 'Latest News',
    description: isAr
      ? 'آخر الأخبار والمستجدات من جامعة الأزهر.'
      : 'The latest news and updates from Al-Azhar University.',
  };
}

export default async function NewsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsPage />;
}
