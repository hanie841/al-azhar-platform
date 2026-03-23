'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, BookOpen, FileText, GraduationCap, Newspaper, Quote, ChevronDown } from 'lucide-react';
import { fetchResearchPublications } from '@/lib/api-fetchers';
import type { ResearchPublication } from '@/lib/types';
import { ResearchCard } from './ResearchCard';

const ITEMS_PER_PAGE = 12;

const PUBLICATION_TYPES = [
  { key: 'all', value: 'all' },
  { key: 'journalArticle', value: 'journal_article' },
  { key: 'conferencePaper', value: 'conference_paper' },
  { key: 'book', value: 'book' },
  { key: 'thesis', value: 'thesis' },
  { key: 'report', value: 'report' },
] as const;

const RESEARCH_AREAS = [
  'Islamic Studies',
  'Science',
  'Medicine',
  'Engineering',
  'Humanities',
  'Law',
  'Education',
  'Agriculture',
] as const;

const AREA_TRANSLATION_KEYS: Record<string, string> = {
  'Islamic Studies': 'islamicStudies',
  Science: 'science',
  Medicine: 'medicine',
  Engineering: 'engineering',
  Humanities: 'humanities',
  Law: 'law',
  Education: 'education',
  Agriculture: 'agriculture',
};

// Mock data for development fallback
function generateMockPublications(): ResearchPublication[] {
  const titles = [
    'The Role of Islamic Jurisprudence in Modern Legal Systems',
    'Advances in Molecular Biology: A Comprehensive Review',
    'Cardiovascular Disease Prevention in the Middle East',
    'Sustainable Engineering Practices in Developing Nations',
    'The Influence of Al-Azhar on Global Islamic Thought',
    'Machine Learning Applications in Arabic NLP',
    'Traditional Medicine and Modern Pharmacology',
    'Agricultural Innovation in Arid Regions',
    'Historical Analysis of Islamic Education Methods',
    'Renewable Energy Solutions for Egypt',
    'Comparative Study of Islamic Legal Schools',
    'Biomedical Engineering: New Frontiers',
  ];
  const areas = [...RESEARCH_AREAS];
  const types = ['journal_article', 'conference_paper', 'book', 'thesis', 'report'];
  const journals = ['Journal of Islamic Studies', 'Nature Middle East', 'Lancet Regional Health', 'IEEE Transactions', 'Al-Azhar Journal of Sciences', null];
  const authorNames = ['Dr. Ahmed Hassan', 'Prof. Fatima El-Sayed', 'Dr. Mohamed Ali', 'Prof. Sarah Ibrahim', 'Dr. Omar Khaled', 'Prof. Aisha Rahman'];

  return titles.map((title, i) => ({
    id: i + 1,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title,
    abstract: `This research explores ${title.toLowerCase()}. The study provides comprehensive analysis and findings that contribute to the advancement of knowledge in this field. Through rigorous methodology and extensive review, we present novel insights and practical implications for future research.`,
    authors: authorNames.slice(0, 2 + (i % 3)),
    journal_name: journals[i % journals.length],
    publication_date: `202${3 + (i % 3)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
    doi: i % 3 !== 2 ? `10.1234/azhar.${2023 + i}.${1000 + i}` : null,
    citation_count: Math.floor(Math.random() * 150) + 5,
    research_area: areas[i % areas.length],
    publication_type: types[i % types.length],
    pdf_url: i % 2 === 0 ? `/files/research-${i + 1}.pdf` : null,
    external_url: i % 3 === 0 ? `https://doi.org/10.1234/azhar.${2023 + i}.${1000 + i}` : null,
    faculty_id: (i % 5) + 1,
    faculty: { id: (i % 5) + 1, slug: `faculty-${(i % 5) + 1}`, name: `Faculty ${(i % 5) + 1}` },
    is_featured: i < 3,
    created_at: `202${3 + (i % 3)}-${String((i % 12) + 1).padStart(2, '0')}-01T00:00:00Z`,
  }));
}

export function ResearchPortalPage() {
  const t = useTranslations('research');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [publications, setPublications] = useState<ResearchPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [page, setPage] = useState(1);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchResearchPublications(locale, { per_page: 100 })
      .then((res) => {
        if (!cancelled) {
          setPublications(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPublications(generateMockPublications());
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [locale]);

  const featured = useMemo(() => publications.filter((p) => p.is_featured), [publications]);

  const filtered = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        !search ||
        pub.title.toLowerCase().includes(search.toLowerCase()) ||
        (pub.authors?.join(' ') || '').toLowerCase().includes(search.toLowerCase()) ||
        (pub.journal_name || '').toLowerCase().includes(search.toLowerCase());

      const matchesType = selectedType === 'all' || pub.publication_type === selectedType;
      const matchesArea = selectedArea === 'all' || pub.research_area === selectedArea;

      return matchesSearch && matchesType && matchesArea;
    });
  }, [search, selectedType, selectedArea, publications]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Stats
  const totalCitations = useMemo(() => publications.reduce((sum, p) => sum + p.citation_count, 0), [publications]);
  const uniqueAreas = useMemo(() => new Set(publications.map((p) => p.research_area).filter(Boolean)).size, [publications]);

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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center gap-8 sm:gap-16 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-400">{publications.length}</div>
              <div className="text-xs sm:text-sm text-sand-400">{t('totalPublications')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-400">{uniqueAreas}</div>
              <div className="text-xs sm:text-sm text-sand-400">{t('researchAreas')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-400">{totalCitations.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-sand-400">{t('totalCitations')}</div>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t('searchPlaceholder')}
                className="w-full ps-12 pe-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-sand-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Featured Section */}
        {featured.length > 0 && !search && selectedType === 'all' && selectedArea === 'all' && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-6">
              {t('featured')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ResearchCard publication={pub} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          {/* Type tabs */}
          <div className="flex flex-wrap gap-2">
            {PUBLICATION_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => { setSelectedType(type.value); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === type.value
                    ? 'bg-primary-700 text-white'
                    : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300'
                }`}
              >
                {t(type.key)}
              </button>
            ))}
          </div>

          {/* Area dropdown */}
          <div className="relative ms-auto">
            <button
              onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300 transition-all"
            >
              {t('researchArea')}: {selectedArea === 'all' ? t('allAreas') : t(AREA_TRANSLATION_KEYS[selectedArea] ?? 'allAreas')}
              <ChevronDown className={`w-4 h-4 transition-transform ${areaDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {areaDropdownOpen && (
              <div className="absolute top-full mt-1 end-0 w-56 bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 rounded-lg shadow-lg z-20 py-1">
                <button
                  onClick={() => { setSelectedArea('all'); setAreaDropdownOpen(false); setPage(1); }}
                  className={`w-full text-start px-4 py-2 text-sm hover:bg-sand-50 dark:hover:bg-navy-700 transition-colors ${
                    selectedArea === 'all' ? 'text-primary-700 dark:text-primary-400 font-bold' : 'text-sand-600 dark:text-sand-400'
                  }`}
                >
                  {t('allAreas')}
                </button>
                {RESEARCH_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => { setSelectedArea(area); setAreaDropdownOpen(false); setPage(1); }}
                    className={`w-full text-start px-4 py-2 text-sm hover:bg-sand-50 dark:hover:bg-navy-700 transition-colors ${
                      selectedArea === area ? 'text-primary-700 dark:text-primary-400 font-bold' : 'text-sand-600 dark:text-sand-400'
                    }`}
                  >
                    {t(AREA_TRANSLATION_KEYS[area])}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-sand-600 dark:text-sand-400">
            {filtered.length} {t('totalPublications')}
          </p>
        </div>

        {/* Publication grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sand-500 dark:text-sand-400 text-lg">...</p>
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((pub, i) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ResearchCard publication={pub} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto text-sand-300 dark:text-navy-600 mb-4" />
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
  );
}
