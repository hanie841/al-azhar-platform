import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LibraryPage } from '@/components/library/LibraryPage';
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

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'المكتبة الرقمية' : 'Library', url: `${SITE_URL}/${locale}/library` },
        ])}
      />
      <LibraryPage />
    </>
  );
}
