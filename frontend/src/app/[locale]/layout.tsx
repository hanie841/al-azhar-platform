import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtl, type Locale } from '@/i18n/config';
import { amiri, notoKufiArabic, inter, playfairDisplay } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: {
      template: isAr ? '%s | جامعة الأزهر' : '%s | Al-Azhar University',
      default: isAr
        ? 'جامعة الأزهر - ألف عام من الريادة'
        : 'Al-Azhar University - A Thousand Years of Leadership',
    },
    description: isAr
      ? 'المنصة الرقمية الرسمية لجامعة الأزهر، أقدم جامعة في العالم تمنح درجات علمية.'
      : 'The official digital platform of Al-Azhar University, the oldest degree-granting university in the world.',
    openGraph: {
      type: 'website',
      siteName: isAr ? 'جامعة الأزهر' : 'Al-Azhar University',
      title: isAr
        ? 'جامعة الأزهر - ألف عام من الريادة'
        : 'Al-Azhar University - A Thousand Years of Leadership',
      description: isAr
        ? 'المنصة الرقمية الرسمية لجامعة الأزهر، أقدم جامعة في العالم تمنح درجات علمية.'
        : 'The official digital platform of Al-Azhar University, the oldest degree-granting university in the world.',
      locale: isAr ? 'ar_EG' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr
        ? 'جامعة الأزهر - ألف عام من الريادة'
        : 'Al-Azhar University - A Thousand Years of Leadership',
      description: isAr
        ? 'المنصة الرقمية الرسمية لجامعة الأزهر، أقدم جامعة في العالم تمنح درجات علمية.'
        : 'The official digital platform of Al-Azhar University, the oldest degree-granting university in the world.',
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  const rtl = isRtl(locale as Locale);

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'}>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${amiri.variable} ${notoKufiArabic.variable} antialiased bg-sand-50 text-gray-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale as Locale} />
          <main className="min-h-screen">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
