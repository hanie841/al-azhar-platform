import { api } from './api';
import type {
  User,
  AuthResponse,
  RegisterData,
  LibraryItem,
  Faculty,
  NewsArticle,
  TimelineEra,
  Person,
  Event,
  LibraryCollection,
  PaginatedResponse,
  ListResponse,
  SearchResults,
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

// --- Search ---

export async function searchAll(
  locale: string,
  query: string,
  type?: string
): Promise<SearchResults> {
  const params: Record<string, string> = { q: query };
  if (type) {
    params.type = type;
  }
  return api<SearchResults>('/search', {
    headers: localeHeaders(locale),
    params,
  });
}

// --- Auth ---

const AUTH_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1') + '/auth';

async function authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${AUTH_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`) as Error & {
      errors?: Record<string, string[]>;
    };
    error.errors = data.errors;
    throw error;
  }

  return data as T;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  return authFetch<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  return authFetch<AuthResponse>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logoutUser(token: string): Promise<void> {
  await authFetch<{ message: string }>('/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchCurrentUser(token: string): Promise<User> {
  const res = await authFetch<{ user: User }>('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.user;
}
