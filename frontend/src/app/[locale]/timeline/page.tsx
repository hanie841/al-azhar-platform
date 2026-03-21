import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { TimelinePage } from '@/components/timeline/TimelinePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الأزهر عبر العصور' : 'Al-Azhar Through the Ages',
    description: isAr
      ? 'رحلة عبر تاريخ جامعة الأزهر منذ تأسيسها عام 970 ميلادياً.'
      : 'A journey through the history of Al-Azhar University since its founding in 970 AD.',
  };
}

export default async function TimelineRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TimelinePage />;
}
