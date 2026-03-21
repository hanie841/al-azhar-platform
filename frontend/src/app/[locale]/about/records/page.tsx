import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { RecordsPageClient } from '@/components/university/RecordsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الأرقام القياسية' : 'World Records',
    description: isAr
      ? 'الأرقام القياسية والإنجازات العالمية لجامعة الأزهر.'
      : 'World records and global achievements of Al-Azhar University.',
  };
}

export default async function RecordsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RecordsPageClient />;
}
