import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LessonViewer } from '@/components/lms/LessonViewer';
import { JsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'عرض الدرس' : 'Lesson Viewer',
    description: isAr
      ? 'عرض محتوى الدرس'
      : 'View lesson content',
  };
}

export default async function LessonRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'نظام إدارة التعلم' : 'LMS', url: `${SITE_URL}/${locale}/lms` },
          { name: isAr ? 'الدرس' : 'Lesson', url: `${SITE_URL}/${locale}/lms/lessons/${id}` },
        ])}
      />
      <LessonViewer lessonId={parseInt(id, 10)} />
    </>
  );
}
