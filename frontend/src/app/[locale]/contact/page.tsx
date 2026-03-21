import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactPageClient } from '@/components/contact/ContactPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'اتصل بنا' : 'Contact Us',
    description: isAr
      ? 'تواصل مع جامعة الأزهر - معلومات الاتصال ونموذج التواصل.'
      : 'Get in touch with Al-Azhar University - contact information and inquiry form.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageClient />;
}
