import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PhotoGalleryPage } from '@/components/gallery/PhotoGalleryPage';
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
    title: isAr ? 'معرض الصور' : 'Photo Gallery',
    description: isAr
      ? 'استكشف جامعة الأزهر من خلال الصور'
      : 'Explore Al-Azhar University through images',
  };
}

export default async function Gallery({
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
          { name: isAr ? 'معرض الصور' : 'Photo Gallery', url: `${SITE_URL}/${locale}/gallery` },
        ])}
      />
      <PhotoGalleryPage />
    </>
  );
}
