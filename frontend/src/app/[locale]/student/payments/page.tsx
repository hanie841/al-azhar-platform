import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PaymentsPage } from '@/components/student/PaymentsPage';
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
    title: isAr ? 'المدفوعات' : 'Payments',
    description: isAr
      ? 'عرض وإدارة الرسوم والمدفوعات الدراسية'
      : 'View and manage your tuition fees and payments',
  };
}

export default async function PaymentsRoute({
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
          { name: isAr ? 'بوابة الطالب' : 'Student Portal', url: `${SITE_URL}/${locale}/student` },
          { name: isAr ? 'المدفوعات' : 'Payments', url: `${SITE_URL}/${locale}/student/payments` },
        ])}
      />
      <PaymentsPage />
    </>
  );
}
