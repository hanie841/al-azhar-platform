import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EventsPageClient } from '@/components/events/EventsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الفعاليات' : 'Events',
    description: isAr
      ? 'الفعاليات والأنشطة القادمة في جامعة الأزهر.'
      : 'Upcoming events and activities at Al-Azhar University.',
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EventsPageClient />;
}
