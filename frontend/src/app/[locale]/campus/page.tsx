import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CampusMapPage } from '@/components/campus/CampusMapPage';
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
    title: isAr ? 'خريطة الحرم الجامعي' : 'Campus Map',
    description: isAr
      ? 'استكشف حرم جامعة الأزهر التاريخي - المباني والمرافق والكليات'
      : 'Explore Al-Azhar University\'s historic campus - buildings, facilities, and faculties',
  };
}

export default async function Campus({
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
          { name: isAr ? 'خريطة الحرم الجامعي' : 'Campus Map', url: `${SITE_URL}/${locale}/campus` },
        ])}
      />
      <CampusMapPage />
    </>
  );
}
