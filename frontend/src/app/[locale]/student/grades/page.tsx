import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { GradesPage } from '@/components/student/GradesPage';
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
    title: isAr ? 'درجاتي' : 'My Grades',
    description: isAr
      ? 'عرض الأداء الأكاديمي والدرجات'
      : 'View your academic performance and grades',
  };
}

export default async function GradesRoute({
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
          { name: isAr ? 'درجاتي' : 'My Grades', url: `${SITE_URL}/${locale}/student/grades` },
        ])}
      />
      <GradesPage />
    </>
  );
}
