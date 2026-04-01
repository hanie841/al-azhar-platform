import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FacultyProfilePage } from '@/components/faculty/FacultyProfilePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الملف الشخصي' : 'My Profile',
    description: isAr
      ? 'عرض وتعديل الملف الشخصي لعضو هيئة التدريس.'
      : 'View and edit your faculty profile.',
  };
}

export default async function FacultyProfileRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FacultyProfilePage />;
}
