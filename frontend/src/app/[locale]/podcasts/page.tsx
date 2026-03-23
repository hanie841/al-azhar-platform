import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PodcastsPage } from '@/components/podcasts/PodcastsPage';
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
    title: isAr ? 'البودكاست' : 'Podcasts',
    description: isAr
      ? 'استمع إلى علماء الأزهر وأصوات الحرم الجامعي'
      : 'Listen to Al-Azhar scholars and campus voices',
  };
}

export default async function Podcasts({
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
          { name: isAr ? 'البودكاست' : 'Podcasts', url: `${SITE_URL}/${locale}/podcasts` },
        ])}
      />
      <PodcastsPage />
    </>
  );
}
