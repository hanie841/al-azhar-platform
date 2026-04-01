'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchExams } from '@/lib/api-fetchers';
import type { Exam } from '@/lib/types';
import {
  ClipboardList,
  Clock,
  Award,
  Calendar,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const EXAM_TYPE_COLORS: Record<string, string> = {
  midterm: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  final: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  quiz: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  practice: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  assignment: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
};

function getExamStatus(exam: Exam): 'upcoming' | 'active' | 'completed' {
  const now = new Date();
  if (exam.starts_at && new Date(exam.starts_at) > now) return 'upcoming';
  if (exam.ends_at && new Date(exam.ends_at) < now) return 'completed';
  return 'active';
}

const STATUS_STYLES: Record<string, string> = {
  upcoming: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

export function ExamsListPage() {
  const t = useTranslations('exams');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchExams(locale, { per_page: 100 })
      .then((res) => {
        if (!cancelled) {
          setExams(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setExams([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const filtered = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        !search || exam.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === 'all' || exam.exam_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [search, selectedType, exams]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const examTypes = ['all', 'midterm', 'final', 'quiz', 'practice'];

  const typeLabels: Record<string, string> = {
    all: isRtl ? 'الكل' : 'All',
    midterm: isRtl ? 'نصف الفصل' : 'Midterm',
    final: isRtl ? 'نهائي' : 'Final',
    quiz: isRtl ? 'اختبار قصير' : 'Quiz',
    practice: isRtl ? 'تدريبي' : 'Practice',
  };

  const statusLabels: Record<string, string> = {
    upcoming: isRtl ? 'قادم' : 'Upcoming',
    active: isRtl ? 'متاح' : 'Active',
    completed: isRtl ? 'منتهي' : 'Completed',
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <ClipboardList className="w-10 h-10 text-gold-400" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t('title', { defaultValue: isRtl ? 'الامتحانات الإلكترونية' : 'E-Exams' })}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 dark:text-sand-500 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle', {
              defaultValue: isRtl
                ? 'استعرض وقدّم الامتحانات الإلكترونية'
                : 'Browse and take electronic exams',
            })}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-sand-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={t('searchPlaceholder', {
                  defaultValue: isRtl ? 'ابحث عن امتحان...' : 'Search exams...',
                })}
                className="w-full ps-12 pe-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-5 h-5 text-sand-500 mt-1.5" />
          {examTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-primary-700 text-white'
                  : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:border-primary-300'
              }`}
            >
              {typeLabels[type] || type}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-sand-600 dark:text-sand-400">
            {filtered.length} {isRtl ? 'امتحان' : 'exams'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((exam, i) => {
              const status = getExamStatus(exam);
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/exams/${exam.slug}`}>
                    <div className="group bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            EXAM_TYPE_COLORS[exam.exam_type] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {typeLabels[exam.exam_type] || exam.exam_type}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[status]}`}
                        >
                          {statusLabels[status]}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg text-navy-900 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {exam.title}
                      </h3>

                      {exam.description && (
                        <p className="text-sm text-sand-600 dark:text-sand-400 mb-4 line-clamp-2">
                          {exam.description}
                        </p>
                      )}

                      <div className="mt-auto space-y-2">
                        {/* Duration & Marks */}
                        <div className="flex items-center gap-4 text-sm text-sand-500 dark:text-sand-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.duration_minutes} {isRtl ? 'دقيقة' : 'min'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {exam.total_marks} {isRtl ? 'درجة' : 'marks'}
                          </span>
                        </div>

                        {/* Dates */}
                        {exam.starts_at && (
                          <div className="flex items-center gap-1 text-xs text-sand-400 dark:text-sand-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(exam.starts_at).toLocaleDateString(locale, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {exam.ends_at && (
                              <>
                                <span className="mx-1">-</span>
                                <span>
                                  {new Date(exam.ends_at).toLocaleDateString(locale, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Questions count */}
                        {exam.questions_count !== undefined && (
                          <p className="text-xs text-sand-400 dark:text-sand-500">
                            {exam.questions_count} {isRtl ? 'سؤال' : 'questions'}
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t border-sand-100 dark:border-navy-700 flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700 dark:text-primary-400 group-hover:text-primary-800">
                          {isRtl ? 'عرض التفاصيل' : 'View Details'}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 text-primary-700 dark:text-primary-400 transition-transform group-hover:translate-x-1 ${
                            isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <ClipboardList className="w-16 h-16 mx-auto text-sand-300 dark:text-navy-600 mb-4" />
            <p className="text-sand-500 dark:text-sand-400 text-lg">
              {isRtl ? 'لا توجد امتحانات متاحة' : 'No exams available'}
            </p>
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
