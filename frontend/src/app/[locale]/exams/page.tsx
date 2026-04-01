import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExamsListPage } from '@/components/exams/ExamsListPage';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الامتحانات الإلكترونية' : 'E-Exams',
    description: isAr
      ? 'استعرض الامتحانات الإلكترونية المتاحة في جامعة الأزهر.'
      : 'Browse available electronic exams at Al-Azhar University.',
  };
}

export default async function ExamsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExamsListPage />;
}
