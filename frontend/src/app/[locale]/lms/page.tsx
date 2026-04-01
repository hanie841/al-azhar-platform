import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LmsDashboard } from '@/components/lms/LmsDashboard';
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
    title: isAr ? 'نظام إدارة التعلم' : 'Learning Management System',
    description: isAr
      ? 'الوصول إلى مقرراتك والمواد التعليمية عبر الإنترنت'
      : 'Access your online courses and learning materials',
  };
}

export default async function LmsRoute({
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
          { name: isAr ? 'نظام إدارة التعلم' : 'LMS', url: `${SITE_URL}/${locale}/lms` },
        ])}
      />
      <LmsDashboard />
    </>
  );
}
