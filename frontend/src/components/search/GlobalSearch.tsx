'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Search, X, Loader2, BookOpen, Newspaper, GraduationCap, Users, CalendarDays } from 'lucide-react';
import { searchAll } from '@/lib/api-fetchers';
import type { SearchResultGroup } from '@/lib/types';

interface GlobalSearchProps {
  onClose: () => void;
}

const typeIcons: Record<string, React.ElementType> = {
  library: BookOpen,
  news: Newspaper,
  faculties: GraduationCap,
  people: Users,
  events: CalendarDays,
};

const typeRoutes: Record<string, string> = {
  library: '/library',
  news: '/news',
  faculties: '/faculties',
  people: '/about/leadership',
  events: '/events',
};

function getItemSlug(item: Record<string, unknown>): string {
  return (item.slug as string) || String(item.id);
}

function getItemTitle(item: Record<string, unknown>): string {
  return (item.title as string) || (item.name as string) || '';
}

function getItemSubtitle(item: Record<string, unknown>, type: string): string | null {
  switch (type) {
    case 'library':
      return (item.type as string) || null;
    case 'news':
      return (item.excerpt as string) || null;
    case 'faculties':
      return (item.description as string) || null;
    case 'people':
      return (item.title as string) || null;
    case 'events':
      return (item.location as string) || null;
    default:
      return null;
  }
}

function getItemHref(type: string, slug: string): string {
  const base = typeRoutes[type] || '/';
  if (type === 'people') {
    return `${base}`;
  }
  return `${base}/${slug}`;
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        setSearched(false);
        return;
      }

      setLoading(true);
      try {
        const res = await searchAll(locale, searchQuery);
        setResults(res.data);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, performSearch]);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          className="w-full ps-12 pe-12 py-3 bg-white border border-sand-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
          aria-label={t('search')}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setSearched(false);
              inputRef.current?.focus();
            }}
            className="absolute end-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {(loading || searched) && (
        <div className="mt-2 bg-white rounded-xl shadow-xl border border-sand-200 max-h-[70vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </div>
          )}

          {!loading &&
            results.map((group) => {
              const Icon = typeIcons[group.type] || Search;
              return (
                <div key={group.type} className="border-b border-sand-100 last:border-b-0">
                  <div className="px-4 py-2 bg-sand-50 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary-600" />
                    <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                      {group.label}
                    </span>
                  </div>
                  <ul>
                    {group.items.map((item) => {
                      const record = item as unknown as Record<string, unknown>;
                      const slug = getItemSlug(record);
                      const title = getItemTitle(record);
                      const subtitle = getItemSubtitle(record, group.type);
                      const href = getItemHref(group.type, slug);

                      return (
                        <li key={`${group.type}-${record.id}`}>
                          <Link
                            href={href as '/'}
                            onClick={onClose}
                            className="block px-4 py-3 hover:bg-primary-50 transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {title}
                            </div>
                            {subtitle && (
                              <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {subtitle}
                              </div>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
