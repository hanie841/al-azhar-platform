import { SITE_URL, SITE_NAME_AR, SITE_NAME_EN } from './constants';
import type { NewsArticle, LibraryItem, Person, Event } from './types';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function buildOrganizationJsonLd(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    alternateName: isAr ? SITE_NAME_EN : SITE_NAME_AR,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/favicon.svg`,
    foundingDate: '0970',
    description: isAr
      ? 'أقدم جامعة في العالم تمنح درجات علمية، تأسست عام 970 م في القاهرة، مصر'
      : 'The oldest degree-granting university in the world, founded in 970 CE in Cairo, Egypt',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Al-Azhar Street, Al-Darb Al-Ahmar',
      addressLocality: isAr ? 'القاهرة' : 'Cairo',
      addressCountry: isAr ? 'مصر' : 'Egypt',
    },
    sameAs: [
      'https://ar.wikipedia.org/wiki/جامعة_الأزهر',
      'https://en.wikipedia.org/wiki/Al-Azhar_University',
      'https://azhar.edu.eg',
    ],
  };
}

export function buildWebSiteJsonLd(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    url: `${SITE_URL}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/library?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(article: NewsArticle, locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || undefined,
    image: article.featured_image || undefined,
    datePublished: article.published_at || article.created_at,
    dateModified: article.created_at,
    url: `${SITE_URL}/${locale}/news/${article.slug}`,
    author: {
      '@type': 'Organization',
      name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    },
    publisher: {
      '@type': 'Organization',
      name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
  };
}

export function buildBookJsonLd(item: LibraryItem, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: item.title,
    description: item.description || undefined,
    image: item.cover_image_url || item.cover_image || undefined,
    author: item.authors?.map((a) => ({ '@type': 'Person', name: a })) || undefined,
    isbn: item.isbn || undefined,
    publisher: item.publisher || undefined,
    datePublished: item.publication_year ? String(item.publication_year) : undefined,
    inLanguage: item.language,
    numberOfPages: item.page_count || undefined,
    url: `${SITE_URL}/${locale}/library/${item.slug}`,
  };
}

export function buildEventJsonLd(event: Event, locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || undefined,
    startDate: event.starts_at,
    endDate: event.ends_at || undefined,
    location: event.location
      ? { '@type': 'Place', name: event.location }
      : undefined,
    image: event.featured_image || undefined,
    organizer: {
      '@type': 'Organization',
      name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    },
    url: `${SITE_URL}/${locale}/events`,
  };
}

export function buildPersonJsonLd(person: Person, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title || undefined,
    description: person.bio || undefined,
    image: person.photo || undefined,
    url: `${SITE_URL}/${locale}/people/${person.slug}`,
    affiliation: {
      '@type': 'EducationalOrganization',
      name: locale === 'ar' ? SITE_NAME_AR : SITE_NAME_EN,
    },
  };
}

export function buildHospitalJsonLd(
  hospital: { name: string; slug: string; description: string | null },
  locale: string
) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: hospital.name,
    description: hospital.description || undefined,
    url: `${SITE_URL}/${locale}/hospitals/${hospital.slug}`,
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: isAr ? 'القاهرة' : 'Cairo',
      addressCountry: isAr ? 'مصر' : 'Egypt',
    },
  };
}
