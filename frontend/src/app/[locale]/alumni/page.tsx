import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AlumniPage } from '@/components/alumni/AlumniPage';
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
    title: isAr ? 'خريجون بارزون' : 'Notable Alumni',
    description: isAr
      ? 'تعرف على أبرز خريجي جامعة الأزهر الذين أثروا العالم على مدى أكثر من ألف عام.'
      : 'Discover the notable alumni of Al-Azhar University who have shaped the world for over a millennium.',
  };
}

export default async function AlumniRoute({
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
          { name: isAr ? 'خريجون بارزون' : 'Notable Alumni', url: `${SITE_URL}/${locale}/alumni` },
        ])}
      />
      <AlumniPage />
    </>
  );
}
