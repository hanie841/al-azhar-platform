import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FacultyDetail } from '@/components/university/FacultyDetail';
import { fetchFaculty } from '@/lib/api-fetchers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const faculty = await fetchFaculty(locale, slug);
    return {
      title: faculty.name,
      description: faculty.description
        ? faculty.description.slice(0, 160)
        : locale === 'ar'
          ? `كلية ${faculty.name} - جامعة الأزهر`
          : `${faculty.name} - Al-Azhar University`,
      openGraph: {
        title: faculty.name,
        description: faculty.description?.slice(0, 160) ?? undefined,
        ...(faculty.featured_image ? { images: [{ url: faculty.featured_image }] } : {}),
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'كلية' : 'Faculty',
    };
  }
}

export default async function FacultyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let faculty;
  try {
    faculty = await fetchFaculty(locale, slug);
  } catch {
    notFound();
  }

  if (!faculty) notFound();

  return <FacultyDetail faculty={faculty} />;
}
