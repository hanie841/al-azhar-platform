import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ResearchPublicationDetail } from '@/components/research/ResearchPublicationDetail';
import { fetchResearchPublication } from '@/lib/api-fetchers';
import { JsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const pub = await fetchResearchPublication(locale, slug);
    return {
      title: pub.title,
      description: pub.abstract
        ? pub.abstract.slice(0, 160)
        : locale === 'ar'
          ? `${pub.title} - البحث العلمي - جامعة الأزهر`
          : `${pub.title} - Research - Al-Azhar University`,
      openGraph: {
        title: pub.title,
        description: pub.abstract?.slice(0, 160) ?? undefined,
        type: 'article',
        url: `${SITE_URL}/${locale}/research/${slug}`,
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'البحث العلمي' : 'Research',
    };
  }
}

export default async function ResearchPublicationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let publication;
  try {
    publication = await fetchResearchPublication(locale, slug);
  } catch {
    notFound();
  }

  if (!publication) notFound();

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: publication.title,
          abstract: publication.abstract || undefined,
          author: publication.authors?.map((a) => ({ '@type': 'Person', name: a })) || undefined,
          datePublished: publication.publication_date || undefined,
          isPartOf: publication.journal_name
            ? { '@type': 'Periodical', name: publication.journal_name }
            : undefined,
          url: `${SITE_URL}/${locale}/research/${slug}`,
          publisher: {
            '@type': 'Organization',
            name: isAr ? 'جامعة الأزهر' : 'Al-Azhar University',
          },
        }}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'البحث العلمي' : 'Research', url: `${SITE_URL}/${locale}/research` },
          { name: publication.title, url: `${SITE_URL}/${locale}/research/${slug}` },
        ])}
      />
      <ResearchPublicationDetail publication={publication} />
    </>
  );
}
