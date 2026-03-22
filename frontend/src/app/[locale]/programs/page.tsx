import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProgramsPage } from '@/components/programs/ProgramsPage';
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
    title: isAr ? 'البرامج الأكاديمية' : 'Academic Programs',
    description: isAr
      ? 'اكتشف البرامج الدراسية المتاحة في جامعة الأزهر'
      : 'Discover the academic programs available at Al-Azhar University',
  };
}

export default async function Programs({
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
          { name: isAr ? 'البرامج الأكاديمية' : 'Academic Programs', url: `${SITE_URL}/${locale}/programs` },
        ])}
      />
      <ProgramsPage />
    </>
  );
}
