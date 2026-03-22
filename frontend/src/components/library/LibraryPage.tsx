'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchLibraryItems } from '@/lib/api-fetchers';
import type { LibraryItem } from '@/lib/types';
import { mockLibraryItems } from '@/lib/mock-data';
import { SearchBar } from './SearchBar';
import { FilterSidebar } from './FilterSidebar';
import { BookCard } from './BookCard';

const ITEMS_PER_PAGE = 8;

export function LibraryPage() {
  const t = useTranslations('library');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLibraryItems(locale, { per_page: 100 })
      .then((res) => {
        if (!cancelled) {
          setItems(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to mock data mapped to API shape
          const mapped: LibraryItem[] = mockLibraryItems.map((m) => ({
            id: m.id,
            slug: m.slug,
            title: isAr ? m.title_ar : m.title_en,
            subtitle: null,
            description: isAr ? m.description_ar : m.description_en,
            abstract: null,
            type: m.type,
            authors: [isAr ? m.author_ar : m.author_en],
            publisher: null,
            publication_year: m.year,
            edition: null,
            isbn: null,
            issn: null,
            doi: null,
            language: m.language,
            subjects: null,
            faculty: null,
            department: null,
            era: null,
            page_count: m.pages,
            access_level: m.access_level,
            file_path: null,
            cover_image: null,
            manuscript_images: null,
            views_count: m.views,
            downloads_count: m.downloads,
            published_at: null,
            created_at: '',
          }));
          setItems(mapped);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale, isAr]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.authors?.join(' ') || '').toLowerCase().includes(search.toLowerCase());

      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesLang = selectedLanguage === 'all' || item.language === selectedLanguage;

      return matchesSearch && matchesType && matchesLang;
    });
  }, [search, selectedType, selectedLanguage, items]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 dark:text-sand-500 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              placeholder={t('searchPlaceholder')}
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              selectedType={selectedType}
              onTypeChange={(type) => {
                setSelectedType(type);
                setPage(1);
              }}
              selectedLanguage={selectedLanguage}
              onLanguageChange={(lang) => {
                setSelectedLanguage(lang);
                setPage(1);
              }}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-sand-600 dark:text-sand-400">
                {filtered.length} {t('resultsCount')}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-sand-500 dark:text-sand-400 text-lg">...</p>
              </div>
            ) : paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <BookCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noResults')}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      p === page
                        ? 'bg-primary-700 text-white'
                        : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
