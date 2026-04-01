import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExamTakingPage } from '@/components/exams/ExamTakingPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'تقديم الامتحان' : 'Take Exam',
    description: isAr ? 'صفحة تقديم الامتحان الإلكتروني.' : 'Electronic exam taking page.',
  };
}

export default async function ExamAttemptRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ExamTakingPage attemptId={parseInt(id, 10)} />;
}
