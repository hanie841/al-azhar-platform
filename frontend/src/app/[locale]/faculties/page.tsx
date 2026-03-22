import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FacultyGrid } from '@/components/university/FacultyGrid';
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
    title: isAr ? 'الكليات والمعاهد' : 'Faculties & Institutes',
    description: isAr
      ? 'تعرف على كليات ومعاهد جامعة الأزهر والبرامج الأكاديمية المتاحة.'
      : 'Discover Al-Azhar University faculties, institutes, and available academic programs.',
  };
}

export default async function FacultiesPage({
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
          { name: isAr ? 'الكليات والمعاهد' : 'Faculties & Institutes', url: `${SITE_URL}/${locale}/faculties` },
        ])}
      />
      <FacultyGrid />
    </>
  );
}
