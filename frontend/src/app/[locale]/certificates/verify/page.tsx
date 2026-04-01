import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CertificateVerify } from '@/components/certificates/CertificateVerify';
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
    title: isAr ? 'التحقق من الشهادة' : 'Certificate Verification',
    description: isAr
      ? 'تحقق من صحة شهادة صادرة عن جامعة الأزهر'
      : 'Verify the authenticity of a certificate issued by Al-Azhar University',
  };
}

export default async function CertificateVerifyRoute({
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
          { name: isAr ? 'التحقق من الشهادة' : 'Certificate Verification', url: `${SITE_URL}/${locale}/certificates/verify` },
        ])}
      />
      <CertificateVerify />
    </>
  );
}
