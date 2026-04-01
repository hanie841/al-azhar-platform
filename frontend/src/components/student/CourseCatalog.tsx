'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { fetchMsisCourses, fetchFaculties } from '@/lib/api-fetchers';
import type { MsisCourse, Faculty } from '@/lib/types';
import {
  Search,
  BookOpen,
  Clock,
  FlaskConical,
  Filter,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export function CourseCatalog() {
  const t = useTranslations('courses');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [courses, setCourses] = useState<MsisCourse[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.allSettled([
      fetchMsisCourses(locale, { per_page: 200 }),
      fetchFaculties(locale),
    ]).then((results) => {
      if (cancelled) return;
      if (results[0].status === 'fulfilled') setCourses(results[0].value.data);
      if (results[1].status === 'fulfilled') setFaculties(results[1].value);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [locale]);

  const courseTypes = useMemo(() => {
    const types = new Set(courses.map((c) => c.course_type).filter(Boolean));
    return Array.from(types);
  }, [courses]);

  const levels = useMemo(() => {
    const lvls = new Set(courses.map((c) => c.academic_level).filter(Boolean) as string[]);
    return Array.from(lvls);
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = !search ||
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase());
      const matchesFaculty = selectedFaculty === 'all' ||
        course.faculty?.id === parseInt(selectedFaculty);
      const matchesType = selectedType === 'all' || course.course_type === selectedType;
      const matchesLevel = selectedLevel === 'all' || course.academic_level === selectedLevel;
      return matchesSearch && matchesFaculty && matchesType && matchesLevel;
    });
  }, [search, selectedFaculty, selectedType, selectedLevel, courses]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
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
            className="text-sand-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} w-5 h-5 text-sand-400`} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-sand-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Filters Toggle for Mobile */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 dark:text-sand-300 bg-white dark:bg-navy-800 px-4 py-2 rounded-lg border border-sand-200 dark:border-navy-700"
        >
          <Filter className="w-4 h-4" />
          {locale === 'ar' ? 'تصفية' : 'Filters'}
          <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Filters */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 ${filtersOpen ? 'block' : 'hidden lg:grid'}`}>
          <select
            value={selectedFaculty}
            onChange={(e) => { setSelectedFaculty(e.target.value); setPage(1); }}
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-gray-900 dark:text-sand-100 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('allFaculties')}</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setPage(1); }}
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-gray-900 dark:text-sand-100 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('allTypes')}</option>
            {courseTypes.map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => { setSelectedLevel(e.target.value); setPage(1); }}
            className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-gray-900 dark:text-sand-100 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('allLevels')}</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <p className="text-sm text-sand-600 dark:text-sand-400 mb-6">
          {filtered.length} {t('resultsCount')}
        </p>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-navy-800 rounded-xl h-48 border border-sand-200 dark:border-navy-700" />
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-5 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {course.code}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    course.course_type === 'required'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : course.course_type === 'elective'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-sand-100 text-sand-600 dark:bg-navy-700 dark:text-sand-400'
                  }`}>
                    {course.course_type}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-sand-100 mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {course.name}
                </h3>

                {course.description && (
                  <p className="text-xs text-sand-500 dark:text-sand-400 mb-3 line-clamp-2">
                    {course.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-sand-500 dark:text-sand-400 mt-auto pt-3 border-t border-sand-100 dark:border-navy-700">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {course.credit_hours} {t('creditHours')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.lecture_hours}h {t('lectureHours')}
                  </span>
                  {course.lab_hours > 0 && (
                    <span className="flex items-center gap-1">
                      <FlaskConical className="w-3.5 h-3.5" />
                      {course.lab_hours}h {t('labHours')}
                    </span>
                  )}
                </div>

                {(course.faculty || course.department) && (
                  <div className="mt-2 text-xs text-sand-400 dark:text-sand-500">
                    {course.faculty?.name}{course.department ? ` / ${course.department.name}` : ''}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-sand-300 dark:text-sand-600 mb-4" />
            <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noCourses')}</p>
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
