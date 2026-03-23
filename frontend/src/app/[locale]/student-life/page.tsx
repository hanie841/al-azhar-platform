import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StudentLifePage } from '@/components/student-life/StudentLifePage';
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
    title: isAr ? 'الحياة الطلابية' : 'Student Life',
    description: isAr
      ? 'اكتشف الحياة الطلابية النابضة بالحيوية في جامعة الأزهر'
      : 'Discover the vibrant campus community at Al-Azhar University',
  };
}

export default async function StudentLife({
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
          { name: isAr ? 'الحياة الطلابية' : 'Student Life', url: `${SITE_URL}/${locale}/student-life` },
        ])}
      />
      <StudentLifePage />
    </>
  );
}
