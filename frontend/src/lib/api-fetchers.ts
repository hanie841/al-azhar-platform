import { api } from './api';
import type {
  LibraryItem,
  Faculty,
  NewsArticle,
  TimelineEra,
  Person,
  Event,
  LibraryCollection,
  PaginatedResponse,
  ListResponse,
} from './types';

// Helper: fetch with locale header
function localeHeaders(locale: string): HeadersInit {
  return { 'Accept-Language': locale };
}

// --- Library ---

export async function fetchLibraryItems(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<LibraryItem>> {
  return api<PaginatedResponse<LibraryItem>>('/library', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchLibraryItem(locale: string, slug: string): Promise<LibraryItem> {
  const res = await api<{ data: LibraryItem }>(`/library/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchLibraryCollections(locale: string): Promise<LibraryCollection[]> {
  const res = await api<ListResponse<LibraryCollection>>('/library/collections', {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Faculties ---

export async function fetchFaculties(locale: string): Promise<Faculty[]> {
  const res = await api<PaginatedResponse<Faculty>>('/faculties', {
    headers: localeHeaders(locale),
    params: { per_page: 100 },
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchFaculty(locale: string, slug: string): Promise<Faculty> {
  const res = await api<{ data: Faculty }>(`/faculties/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- News ---

export async function fetchNews(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<NewsArticle>> {
  return api<PaginatedResponse<NewsArticle>>('/news', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchNewsArticle(locale: string, slug: string): Promise<NewsArticle> {
  const res = await api<{ data: NewsArticle }>(`/news/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Timeline ---

export async function fetchTimeline(locale: string): Promise<TimelineEra[]> {
  const res = await api<ListResponse<TimelineEra>>('/timeline', {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

// --- People ---

export async function fetchPeople(locale: string): Promise<Person[]> {
  const res = await api<ListResponse<Person>>('/people', {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

// --- Events ---

export async function fetchEvents(locale: string): Promise<Event[]> {
  const res = await api<PaginatedResponse<Event>>('/events', {
    headers: localeHeaders(locale),
    params: { per_page: 50 },
    next: { revalidate: 60 },
  } as any);
  return res.data;
}
