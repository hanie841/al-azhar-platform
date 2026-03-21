import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LeadershipPage } from '@/components/university/LeadershipPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'قيادات الجامعة' : 'University Leadership',
    description: isAr
      ? 'تعرف على قيادات جامعة الأزهر ومسؤولي الإدارة العليا.'
      : 'Meet the leadership and senior administration of Al-Azhar University.',
  };
}

export default async function LeadershipRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LeadershipPage />;
}
