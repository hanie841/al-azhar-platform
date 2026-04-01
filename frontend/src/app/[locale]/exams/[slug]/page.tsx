import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExamDetailPage } from '@/components/exams/ExamDetailPage';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'تفاصيل الامتحان' : 'Exam Details',
    description: isAr
      ? 'عرض تفاصيل الامتحان والبدء في التقديم.'
      : 'View exam details and start your attempt.',
  };
}

export default async function ExamDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <ExamDetailPage slug={slug} />;
}
