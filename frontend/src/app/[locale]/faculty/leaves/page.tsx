import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LeaveRequestsPage } from '@/components/faculty/LeaveRequestsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'طلبات الإجازة' : 'Leave Requests',
    description: isAr
      ? 'إدارة طلبات الإجازة الخاصة بك.'
      : 'Manage your leave requests.',
  };
}

export default async function LeavesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LeaveRequestsPage />;
}
