import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StatisticsDashboard } from '@/components/stats/StatisticsDashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الأزهر بالأرقام' : 'Al-Azhar in Numbers',
    description: isAr
      ? 'أكثر من ألف عام من التميز في التعليم - إحصائيات ومعالم جامعة الأزهر'
      : 'Over a millennium of excellence in education - Al-Azhar University statistics and milestones',
  };
}

export default async function StatisticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StatisticsDashboard />;
}
