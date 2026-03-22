import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PersonDetail } from '@/components/university/PersonDetail';
import { fetchPerson } from '@/lib/api-fetchers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const person = await fetchPerson(locale, slug);
    return {
      title: person.name,
      description: person.bio
        ? person.bio.slice(0, 160)
        : locale === 'ar'
          ? `${person.name} - جامعة الأزهر`
          : `${person.name} - Al-Azhar University`,
      openGraph: {
        title: person.name,
        description: person.bio?.slice(0, 160) ?? undefined,
        ...(person.photo ? { images: [{ url: person.photo }] } : {}),
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'شخصية' : 'Person',
    };
  }
}

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let person;
  try {
    person = await fetchPerson(locale, slug);
  } catch {
    notFound();
  }

  if (!person) notFound();

  return <PersonDetail person={person} />;
}
