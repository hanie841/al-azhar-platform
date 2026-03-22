import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ELearningPage } from '@/components/elearning/ELearningPage';
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
    title: isAr ? 'التعلم الإلكتروني' : 'E-Learning Portal',
    description: isAr
      ? 'تعلم من علماء الأزهر أينما كنت - دورات مجانية في العلوم الإسلامية واللغة العربية'
      : 'Learn from Al-Azhar scholars anywhere in the world - Free courses in Islamic sciences and Arabic language',
  };
}

export default async function ELearning({
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
          { name: isAr ? 'التعلم الإلكتروني' : 'E-Learning', url: `${SITE_URL}/${locale}/elearning` },
        ])}
      />
      <ELearningPage />
    </>
  );
}
