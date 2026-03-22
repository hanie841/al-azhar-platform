import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LibraryItemDetail } from '@/components/library/LibraryItemDetail';
import { fetchLibraryItem } from '@/lib/api-fetchers';
import { JsonLd, buildBookJsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const item = await fetchLibraryItem(locale, slug);
    return {
      title: item.title,
      description: item.abstract
        ? item.abstract.slice(0, 160)
        : item.description
          ? item.description.slice(0, 160)
          : locale === 'ar'
            ? `${item.title} - المكتبة الرقمية لجامعة الأزهر`
            : `${item.title} - Al-Azhar University Digital Library`,
      openGraph: {
        title: item.title,
        description: (item.abstract || item.description)?.slice(0, 160) ?? undefined,
        type: 'website',
        url: `${SITE_URL}/${locale}/library/${slug}`,
        ...((item.cover_image_url || item.cover_image)
          ? { images: [{ url: (item.cover_image_url || item.cover_image) as string }] }
          : {}),
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'المكتبة الرقمية' : 'Digital Library',
    };
  }
}

export default async function LibraryItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let item;
  try {
    item = await fetchLibraryItem(locale, slug);
  } catch {
    notFound();
  }

  if (!item) notFound();

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd data={buildBookJsonLd(item, locale)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'المكتبة الرقمية' : 'Library', url: `${SITE_URL}/${locale}/library` },
          { name: item.title, url: `${SITE_URL}/${locale}/library/${slug}` },
        ])}
      />
      <LibraryItemDetail item={item} />
    </>
  );
}
