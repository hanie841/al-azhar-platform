import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AdmissionsPage } from '@/components/programs/AdmissionsPage';
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
    title: isAr ? 'القبول والتسجيل' : 'Admissions',
    description: isAr
      ? 'انضم إلى أعرق جامعة إسلامية في العالم - معلومات القبول والتسجيل'
      : 'Join the world\'s most prestigious Islamic university - admissions information',
  };
}

export default async function Admissions({
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
          { name: isAr ? 'القبول والتسجيل' : 'Admissions', url: `${SITE_URL}/${locale}/admissions` },
        ])}
      />
      <AdmissionsPage />
    </>
  );
}
