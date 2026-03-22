import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HospitalDetail } from '@/components/university/HospitalDetail';
import { fetchOrgUnit } from '@/lib/api-fetchers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const hospital = await fetchOrgUnit(locale, slug);
    return {
      title: hospital.name,
      description: hospital.description
        ? hospital.description.slice(0, 160)
        : locale === 'ar'
          ? `${hospital.name} - جامعة الأزهر`
          : `${hospital.name} - Al-Azhar University`,
    };
  } catch {
    return {
      title: locale === 'ar' ? 'مستشفى' : 'Hospital',
    };
  }
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let hospital;
  try {
    hospital = await fetchOrgUnit(locale, slug);
  } catch {
    notFound();
  }

  if (!hospital) notFound();

  return <HospitalDetail hospital={hospital} />;
}
