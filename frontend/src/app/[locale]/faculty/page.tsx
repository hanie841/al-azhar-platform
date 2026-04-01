import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FacultyDashboardPage } from '@/components/faculty/FacultyDashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'بوابة عضو هيئة التدريس' : 'Faculty Portal',
    description: isAr
      ? 'لوحة تحكم عضو هيئة التدريس في جامعة الأزهر.'
      : 'Al-Azhar University faculty member dashboard.',
  };
}

export default async function FacultyRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FacultyDashboardPage />;
}
