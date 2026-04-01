import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EnrollmentPage } from '@/components/student/EnrollmentPage';
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
    title: isAr ? 'تسجيل المقررات' : 'Course Enrollment',
    description: isAr
      ? 'سجل في مقررات الفصل الدراسي الحالي'
      : 'Register for courses in the current semester',
  };
}

export default async function EnrollmentRoute({
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
          { name: isAr ? 'تسجيل المقررات' : 'Enrollment', url: `${SITE_URL}/${locale}/student/enrollment` },
        ])}
      />
      <EnrollmentPage />
    </>
  );
}
