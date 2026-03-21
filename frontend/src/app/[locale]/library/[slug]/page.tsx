import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LibraryItemDetail } from '@/components/library/LibraryItemDetail';
import { fetchLibraryItem } from '@/lib/api-fetchers';

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

  return <LibraryItemDetail item={item} />;
}
