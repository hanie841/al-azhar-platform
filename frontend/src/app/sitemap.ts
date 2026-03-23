import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import {
  fetchNews,
  fetchLibraryItems,
  fetchFaculties,
  fetchPeople,
  fetchResearchPublications,
} from '@/lib/api-fetchers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://azhar.swlt.ae';

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '',
    '/about/history',
    '/about/leadership',
    '/about/structure',
    '/about/records',
    '/news',
    '/library',
    '/faculties',
    '/events',
    '/timeline',
    '/contact',
    '/global',
    '/research',
    '/media',
    '/elearning',
    '/programs',
    '/admissions',
    '/alumni',
    '/campus',
    '/virtual-tour',
    '/student-life',
    '/statistics',
    '/social',
    '/podcasts',
    '/gallery',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}/ar${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
    alternates: buildAlternates(path),
  }));

  // Fetch dynamic content slugs
  const [newsRes, libraryRes, faculties, people, researchRes] = await Promise.all([
    fetchNews('ar', { per_page: 1000 }).catch(() => ({ data: [] })),
    fetchLibraryItems('ar', { per_page: 1000 }).catch(() => ({ data: [] })),
    fetchFaculties('ar').catch(() => []),
    fetchPeople('ar').catch(() => []),
    fetchResearchPublications('ar', { per_page: 1000 }).catch(() => ({ data: [] })),
  ]);

  const newsEntries: MetadataRoute.Sitemap = newsRes.data.map((a) => ({
    url: `${SITE_URL}/ar/news/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(a.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: buildAlternates(`/news/${a.slug}`),
  }));

  const libraryEntries: MetadataRoute.Sitemap = libraryRes.data.map((i) => ({
    url: `${SITE_URL}/ar/library/${i.slug}`,
    lastModified: new Date(i.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: buildAlternates(`/library/${i.slug}`),
  }));

  const facultyEntries: MetadataRoute.Sitemap = faculties.map((f) => ({
    url: `${SITE_URL}/ar/faculties/${f.slug}`,
    lastModified: new Date(f.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: buildAlternates(`/faculties/${f.slug}`),
  }));

  const peopleEntries: MetadataRoute.Sitemap = people.map((p) => ({
    url: `${SITE_URL}/ar/people/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.5,
    alternates: buildAlternates(`/people/${p.slug}`),
  }));

  const researchEntries: MetadataRoute.Sitemap = researchRes.data.map((r) => ({
    url: `${SITE_URL}/ar/research/${r.slug}`,
    lastModified: r.publication_date ? new Date(r.publication_date) : new Date(r.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: buildAlternates(`/research/${r.slug}`),
  }));

  return [
    ...staticEntries,
    ...newsEntries,
    ...libraryEntries,
    ...facultyEntries,
    ...peopleEntries,
    ...researchEntries,
  ];
}
