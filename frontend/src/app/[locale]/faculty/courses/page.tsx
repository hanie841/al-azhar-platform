import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FacultyCoursesPage } from '@/components/faculty/FacultyCoursesPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'مقرراتي' : 'My Courses',
    description: isAr
      ? 'عرض المقررات الدراسية المسندة إليك.'
      : 'View your assigned courses and sections.',
  };
}

export default async function FacultyCoursesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FacultyCoursesPage />;
}
