'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFaculties } from '@/lib/api-fetchers';
import type { Faculty } from '@/lib/types';
import { FacultyCard } from './FacultyCard';
import { SearchBar } from '@/components/library/SearchBar';
import {
  BookOpen,
  Languages,
  Users,
  FlaskConical,
  Heart,
  HeartPulse,
  Cpu,
  Leaf,
  Microscope,
  GraduationCap,
  Handshake,
  Globe,
  Eye,
  LayoutGrid,
} from 'lucide-react';

interface CategoryConfig {
  key: string;
  translationKey: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'sharia', translationKey: 'categorySharia', icon: BookOpen, color: 'text-emerald-700 dark:text-emerald-400', borderColor: 'border-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { key: 'language', translationKey: 'categoryLanguage', icon: Languages, color: 'text-blue-700 dark:text-blue-400', borderColor: 'border-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { key: 'humanities', translationKey: 'categoryHumanities', icon: Users, color: 'text-purple-700 dark:text-purple-400', borderColor: 'border-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  { key: 'science', translationKey: 'categoryScience', icon: FlaskConical, color: 'text-cyan-700 dark:text-cyan-400', borderColor: 'border-cyan-500', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { key: 'women', translationKey: 'categoryWomen', icon: Heart, color: 'text-pink-700 dark:text-pink-400', borderColor: 'border-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
  { key: 'medical_center', translationKey: 'categoryHospitals', icon: HeartPulse, color: 'text-rose-700 dark:text-rose-400', borderColor: 'border-rose-500', bgColor: 'bg-rose-50 dark:bg-rose-900/20' },
  { key: 'engineering_center', translationKey: 'categoryEngineeringResearch', icon: Cpu, color: 'text-orange-700 dark:text-orange-400', borderColor: 'border-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
  { key: 'environmental_center', translationKey: 'categoryEnvironmentalResearch', icon: Leaf, color: 'text-green-700 dark:text-green-400', borderColor: 'border-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  { key: 'research_center', translationKey: 'categorySpecializedResearch', icon: Microscope, color: 'text-indigo-700 dark:text-indigo-400', borderColor: 'border-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { key: 'educational_center', translationKey: 'categoryEducational', icon: GraduationCap, color: 'text-amber-700 dark:text-amber-400', borderColor: 'border-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  { key: 'service_center', translationKey: 'categoryService', icon: Handshake, color: 'text-teal-700 dark:text-teal-400', borderColor: 'border-teal-500', bgColor: 'bg-teal-50 dark:bg-teal-900/20' },
  { key: 'international', translationKey: 'categoryInternational', icon: Globe, color: 'text-sky-700 dark:text-sky-400', borderColor: 'border-sky-500', bgColor: 'bg-sky-50 dark:bg-sky-900/20' },
  { key: 'ibsar', translationKey: 'categoryIbsar', icon: Eye, color: 'text-violet-700 dark:text-violet-400', borderColor: 'border-violet-500', bgColor: 'bg-violet-50 dark:bg-violet-900/20' },
];

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.key, c]));

export function FacultyGrid() {
  const t = useTranslations('faculties');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchFaculties(locale)
      .then((data) => {
        if (!cancelled) {
          setFaculties(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFaculties([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Filter by search
  const searchFiltered = useMemo(() => {
    if (!search) return faculties;
    const q = search.toLowerCase();
    return faculties.filter((f) => f.name.toLowerCase().includes(q));
  }, [search, faculties]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, Faculty[]>();
    for (const f of searchFiltered) {
      const cat = f.category || 'uncategorized';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(f);
    }
    return map;
  }, [searchFiltered]);

  // Count per category (from all faculties, ignoring search for tab counts)
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const f of faculties) {
      const cat = f.category || 'uncategorized';
      counts.set(cat, (counts.get(cat) || 0) + 1);
    }
    return counts;
  }, [faculties]);

  // Only show categories that have faculties
  const activeCategories = useMemo(() => {
    return CATEGORIES.filter((c) => categoryCounts.has(c.key));
  }, [categoryCounts]);

  // Filtered faculties for a specific category view
  const categoryFiltered = useMemo(() => {
    if (selectedCategory === 'all') return searchFiltered;
    return searchFiltered.filter((f) => f.category === selectedCategory);
  }, [selectedCategory, searchFiltered]);

  // Ordered categories that have results (for "All" view)
  const visibleSections = useMemo(() => {
    return CATEGORIES.filter((c) => grouped.has(c.key));
  }, [grouped]);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
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
            className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <SearchBar value={search} onChange={setSearch} placeholder={t('searchPlaceholder')} />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category tabs — horizontal scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8"
        >
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          >
            {/* All tab */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-primary-700 text-white shadow-md shadow-primary-700/25'
                  : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t('categoryAll')}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedCategory === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-sand-100 dark:bg-navy-700 text-sand-500 dark:text-sand-400'
                }`}
              >
                {faculties.length}
              </span>
            </button>

            {activeCategories.map((cat) => {
              const Icon = cat.icon;
              const count = categoryCounts.get(cat.key) || 0;
              const isActive = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-md shadow-primary-700/25'
                      : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(cat.translationKey)}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-sand-100 dark:bg-navy-700 text-sand-500 dark:text-sand-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {selectedCategory === 'all' ? (
              /* Grouped view — all categories as sections */
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {visibleSections.map((cat, sectionIdx) => {
                  const Icon = cat.icon;
                  const items = grouped.get(cat.key) || [];

                  return (
                    <motion.section
                      key={cat.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: sectionIdx * 0.08 }}
                    >
                      {/* Section heading */}
                      <div
                        className={`flex items-center gap-3 mb-6 ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} ${cat.borderColor}`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${cat.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${cat.color}`} />
                        </div>
                        <div>
                          <h2 className="font-serif text-xl font-bold text-primary-900 dark:text-primary-100">
                            {t(cat.translationKey)}
                          </h2>
                          <p className="text-sm text-sand-500 dark:text-sand-400">
                            {items.length} {items.length === 1 ? (isAr ? 'عنصر' : 'item') : (isAr ? 'عناصر' : 'items')}
                          </p>
                        </div>
                      </div>

                      {/* Cards grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((faculty, i) => (
                          <motion.div
                            key={faculty.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                          >
                            <FacultyCard faculty={faculty} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  );
                })}

                {/* Uncategorized faculties, if any */}
                {grouped.has('uncategorized') && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: visibleSections.length * 0.08 }}
                  >
                    <div
                      className={`flex items-center gap-3 mb-6 ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-sand-400`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-sand-100 dark:bg-navy-700 flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-sand-500 dark:text-sand-400" />
                      </div>
                      <h2 className="font-serif text-xl font-bold text-primary-900 dark:text-primary-100">
                        {isAr ? 'أخرى' : 'Other'}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {grouped.get('uncategorized')!.map((faculty, i) => (
                        <motion.div
                          key={faculty.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                        >
                          <FacultyCard faculty={faculty} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            ) : (
              /* Single category view */
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category heading */}
                {CATEGORY_MAP.has(selectedCategory) && (() => {
                  const cat = CATEGORY_MAP.get(selectedCategory)!;
                  const Icon = cat.icon;
                  return (
                    <div
                      className={`flex items-center gap-3 mb-8 ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} ${cat.borderColor}`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${cat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${cat.color}`} />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold text-primary-900 dark:text-primary-100">
                          {t(cat.translationKey)}
                        </h2>
                        <p className="text-sm text-sand-500 dark:text-sand-400">
                          {categoryFiltered.length} {categoryFiltered.length === 1 ? (isAr ? 'عنصر' : 'item') : (isAr ? 'عناصر' : 'items')}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryFiltered.map((faculty, i) => (
                    <motion.div
                      key={faculty.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <FacultyCard faculty={faculty} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* No results */}
        {!loading && searchFiltered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sand-500 dark:text-sand-400 text-lg">
              {isAr ? 'لم يتم العثور على نتائج' : 'No results found'}
            </p>
          </motion.div>
        )}

        {!loading && searchFiltered.length > 0 && selectedCategory !== 'all' && categoryFiltered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sand-500 dark:text-sand-400 text-lg">
              {isAr ? 'لا توجد نتائج في هذا التصنيف' : 'No results in this category'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
