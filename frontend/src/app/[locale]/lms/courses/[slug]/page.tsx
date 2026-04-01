import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LmsCoursePage } from '@/components/lms/LmsCoursePage';
import { JsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المقرر الإلكتروني' : 'Online Course',
    description: isAr
      ? 'عرض محتوى المقرر الإلكتروني'
      : 'View online course content',
  };
}

export default async function LmsCourseRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'نظام إدارة التعلم' : 'LMS', url: `${SITE_URL}/${locale}/lms` },
          { name: isAr ? 'المقرر' : 'Course', url: `${SITE_URL}/${locale}/lms/courses/${slug}` },
        ])}
      />
      <LmsCoursePage slug={slug} />
    </>
  );
}
