import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SocialWallPage } from '@/components/social/SocialWallPage';
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
    title: isAr ? 'وسائل التواصل الاجتماعي' : 'Social Media',
    description: isAr
      ? 'تابع جامعة الأزهر عبر منصات التواصل الاجتماعي'
      : 'Follow Al-Azhar University across social media platforms',
  };
}

export default async function Social({
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
          { name: isAr ? 'وسائل التواصل الاجتماعي' : 'Social Media', url: `${SITE_URL}/${locale}/social` },
        ])}
      />
      <SocialWallPage />
    </>
  );
}
