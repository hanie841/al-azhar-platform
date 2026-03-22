import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HospitalDetail } from '@/components/university/HospitalDetail';
import { fetchOrgUnit } from '@/lib/api-fetchers';
import { JsonLd, buildHospitalJsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

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
      openGraph: {
        title: hospital.name,
        description: hospital.description?.slice(0, 160) ?? undefined,
        url: `${SITE_URL}/${locale}/hospitals/${slug}`,
      },
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

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd data={buildHospitalJsonLd(hospital, locale)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'المستشفيات' : 'Hospitals', url: `${SITE_URL}/${locale}/hospitals` },
          { name: hospital.name, url: `${SITE_URL}/${locale}/hospitals/${slug}` },
        ])}
      />
      <HospitalDetail hospital={hospital} />
    </>
  );
}
