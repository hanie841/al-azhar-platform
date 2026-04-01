import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExamResultsPage } from '@/components/exams/ExamResultsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'نتائج الامتحان' : 'Exam Results',
    description: isAr ? 'عرض نتائج وتفاصيل الامتحان.' : 'View exam results and details.',
  };
}

export default async function ExamResultsRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ExamResultsPage attemptId={parseInt(id, 10)} />;
}
