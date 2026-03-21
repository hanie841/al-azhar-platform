import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LibraryPage } from '@/components/library/LibraryPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المكتبة الرقمية' : 'Digital Library',
    description: isAr
      ? 'استكشف المكتبة الرقمية لجامعة الأزهر - كتب ومخطوطات ومراجع علمية.'
      : 'Explore the Al-Azhar University digital library - books, manuscripts, and scholarly references.',
  };
}

export default async function LibraryRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LibraryPage />;
}
