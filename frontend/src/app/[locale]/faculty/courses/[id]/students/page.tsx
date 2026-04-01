import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CourseStudentsPage } from '@/components/faculty/CourseStudentsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'طلاب المقرر' : 'Course Students',
    description: isAr
      ? 'عرض قائمة الطلاب المسجلين في المقرر.'
      : 'View the list of students enrolled in this course.',
  };
}

export default async function CourseStudentsRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <CourseStudentsPage sectionId={parseInt(id, 10)} />;
}
