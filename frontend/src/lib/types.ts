// Auth types

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// API response types matching Laravel backend

export interface LibraryItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  abstract: string | null;
  type: string;
  authors: string[] | null;
  publisher: string | null;
  publication_year: number | null;
  edition: string | null;
  isbn: string | null;
  issn: string | null;
  doi: string | null;
  language: string;
  subjects: string[] | null;
  faculty: Faculty | null;
  department: Department | null;
  era: string | null;
  page_count: number | null;
  access_level: string;
  file_path: string | null;
  cover_image: string | null;
  cover_image_url?: string | null;
  has_pdf?: boolean;
  pdf_url?: string | null;
  manuscript_images: string[] | null;
  views_count: number;
  downloads_count: number;
  published_at: string | null;
  created_at: string;
}

export interface LibraryCollection {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  items_count?: number;
  items?: LibraryItem[];
}

export interface Faculty {
  id: number;
  slug: string;
  type?: string;
  category?: string;
  name: string;
  description: string | null;
  dean_message: string | null;
  featured_image: string | null;
  established_year?: number;
  departments_count: number;
  programs_count?: number;
  created_at: string;
}

export interface Department {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

export interface AcademicProgram {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  degree_level: string;
  duration: string | null;
  credit_hours: number | null;
  requirements: string | null;
  career_prospects: string | null;
  faculty: Faculty | null;
  department: Department | null;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: NewsCategory | null;
  views_count: number;
  published_at: string | null;
  created_at: string;
}

export interface NewsCategory {
  id: number;
  slug: string;
  name: string;
}

export interface TimelineEra {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  start_year: number;
  end_year: number | null;
  order: number;
  events: TimelineEvent[];
  created_at: string;
}

export interface TimelineEvent {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  year: number | null;
  image: string | null;
  order: number;
  created_at: string;
}

export interface Person {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string | null;
  photo: string | null;
  era: string | null;
  is_historical: boolean;
  is_current_leadership: boolean;
  order: number;
  created_at: string;
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  featured_image: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
}

export interface SearchResultGroup {
  type: 'library' | 'news' | 'faculties' | 'people' | 'events';
  label: string;
  items: (LibraryItem | NewsArticle | Faculty | Person | Event)[];
}

export interface SearchResults {
  data: SearchResultGroup[];
}

export interface OrgUnit {
  id: number;
  slug: string;
  type: string;
  name: string;
  description: string | null;
  order: number;
  head?: Person | null;
  children?: OrgUnit[];
  created_at: string;
}

export interface ResearchPublication {
  id: number;
  slug: string;
  title: string;
  abstract: string | null;
  authors: string[] | null;
  journal_name: string | null;
  publication_date: string | null;
  doi: string | null;
  citation_count: number;
  research_area: string | null;
  publication_type: string | null;
  pdf_url: string | null;
  external_url: string | null;
  faculty_id: number | null;
  faculty?: { id: number; slug: string; name: string };
  is_featured: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface ListResponse<T> {
  data: T[];
}
