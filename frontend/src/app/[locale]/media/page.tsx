import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { MediaCenterPage } from '@/components/media/MediaCenterPage';
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
    title: isAr ? 'المركز الإعلامي' : 'Media Center',
    description: isAr
      ? 'البث المباشر والفيديوهات والصور من جامعة الأزهر'
      : 'Live streams, videos, and photos from Al-Azhar University',
  };
}

export default async function Media({
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
          { name: isAr ? 'المركز الإعلامي' : 'Media Center', url: `${SITE_URL}/${locale}/media` },
        ])}
      />
      <MediaCenterPage />
    </>
  );
}
