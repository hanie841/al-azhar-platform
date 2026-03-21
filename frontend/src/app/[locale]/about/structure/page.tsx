import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { OrgChart } from '@/components/university/OrgChart';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الهيكل التنظيمي' : 'Organizational Structure',
    description: isAr
      ? 'الهيكل التنظيمي والإداري لجامعة الأزهر.'
      : 'The organizational and administrative structure of Al-Azhar University.',
  };
}

export default async function StructurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OrgChart />;
}
