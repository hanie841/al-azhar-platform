import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProgramDetail } from '@/components/programs/ProgramDetail';
import { fetchProgram } from '@/lib/api-fetchers';
import { JsonLd, buildBreadcrumbJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const program = await fetchProgram(locale, slug);
    return {
      title: program.name,
      description: program.description
        ? program.description.slice(0, 160)
        : locale === 'ar'
          ? `برنامج ${program.name} - جامعة الأزهر`
          : `${program.name} - Al-Azhar University`,
      openGraph: {
        title: program.name,
        description: program.description?.slice(0, 160) ?? undefined,
        url: `${SITE_URL}/${locale}/programs/${slug}`,
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'برنامج أكاديمي' : 'Academic Program',
    };
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let program;
  try {
    program = await fetchProgram(locale, slug);
  } catch {
    notFound();
  }

  if (!program) notFound();

  const isAr = locale === 'ar';

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isAr ? 'البرامج الأكاديمية' : 'Academic Programs', url: `${SITE_URL}/${locale}/programs` },
          { name: program.name, url: `${SITE_URL}/${locale}/programs/${slug}` },
        ])}
      />
      <ProgramDetail program={program} />
    </>
  );
}
