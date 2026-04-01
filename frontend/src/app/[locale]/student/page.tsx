import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { JsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'بوابة الطالب' : 'Student Portal',
    description: isAr
      ? 'بوابة الطالب - إدارة المسيرة الأكاديمية في جامعة الأزهر'
      : 'Student Portal - Manage your academic journey at Al-Azhar University',
  };
}

export default async function StudentRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'بوابة الطالب' : 'Student Portal', url: `${SITE_URL}/${locale}/student` },
        ])}
      />
      <StudentDashboard />
    </>
  );
}
