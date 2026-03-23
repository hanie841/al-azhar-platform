import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { VirtualTourPage } from '@/components/tour/VirtualTourPage';
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
    title: isAr ? 'جولة افتراضية في الحرم الجامعي' : 'Virtual Campus Tour',
    description: isAr
      ? 'استكشف جامعة الأزهر من أي مكان في العالم من خلال جولة افتراضية شاملة'
      : 'Experience Al-Azhar University from anywhere in the world through an immersive virtual tour',
  };
}

export default async function VirtualTour({
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
          { name: isAr ? 'جولة افتراضية' : 'Virtual Tour', url: `${SITE_URL}/${locale}/virtual-tour` },
        ])}
      />
      <VirtualTourPage />
    </>
  );
}
