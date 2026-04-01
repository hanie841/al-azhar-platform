import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CourseCatalog } from '@/components/student/CourseCatalog';
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
    title: isAr ? 'دليل المقررات' : 'Course Catalog',
    description: isAr
      ? 'تصفح المقررات المتاحة في جامعة الأزهر'
      : 'Browse available courses at Al-Azhar University',
  };
}

export default async function CoursesRoute({
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
          { name: isAr ? 'دليل المقررات' : 'Course Catalog', url: `${SITE_URL}/${locale}/student/courses` },
        ])}
      />
      <CourseCatalog />
    </>
  );
}
