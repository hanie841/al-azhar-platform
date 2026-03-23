import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ResearchPortalPage } from '@/components/research/ResearchPortalPage';
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
    title: isAr ? 'البحث العلمي والنشر' : 'Research & Publications',
    description: isAr
      ? 'استكشف الأبحاث والمنشورات العلمية الرائدة من جامعة الأزهر.'
      : 'Explore groundbreaking research and publications from Al-Azhar University scholars.',
  };
}

export default async function ResearchRoute({
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
          { name: isAr ? 'البحث العلمي' : 'Research', url: `${SITE_URL}/${locale}/research` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: isAr ? 'البحث العلمي والنشر - جامعة الأزهر' : 'Research & Publications - Al-Azhar University',
          description: isAr
            ? 'استكشف الأبحاث والمنشورات العلمية الرائدة من جامعة الأزهر'
            : 'Explore groundbreaking research and publications from Al-Azhar University scholars',
          url: `${SITE_URL}/${locale}/research`,
          isPartOf: {
            '@type': 'WebSite',
            name: isAr ? 'جامعة الأزهر' : 'Al-Azhar University',
            url: SITE_URL,
          },
        }}
      />
      <ResearchPortalPage />
    </>
  );
}
