'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { fetchMsisGrades, fetchSemesters } from '@/lib/api-fetchers';
import type { MsisGrade, Semester } from '@/lib/types';
import {
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  User,
} from 'lucide-react';
import Link from 'next/link';

export function GradesPage() {
  const t = useTranslations('gradesPage');
  const ts = useTranslations('student');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();

  const [grades, setGrades] = useState<MsisGrade[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.allSettled([
      fetchMsisGrades(token, locale, { per_page: 200 }),
      fetchSemesters(locale),
    ]).then((results) => {
      if (cancelled) return;
      if (results[0].status === 'fulfilled') setGrades(results[0].value.data);
      if (results[1].status === 'fulfilled') setSemesters(results[1].value);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [token, isAuthenticated, locale]);

  const filtered = useMemo(() => {
    if (selectedSemester === 'all') return grades;
    return grades.filter((g) => g.semester_id === parseInt(selectedSemester));
  }, [grades, selectedSemester]);

  const publishedGrades = filtered.filter((g) => g.is_published);

  const semesterGpa = publishedGrades.length > 0
    ? publishedGrades.reduce((sum, g) => sum + (g.grade_points || 0) * g.credit_hours, 0) /
      publishedGrades.reduce((sum, g) => sum + g.credit_hours, 0)
    : null;

  const allPublished = grades.filter((g) => g.is_published);
  const cumulativeGpa = allPublished.length > 0
    ? allPublished.reduce((sum, g) => sum + (g.grade_points || 0) * g.credit_hours, 0) /
      allPublished.reduce((sum, g) => sum + g.credit_hours, 0)
    : null;

  const totalCredits = allPublished.reduce((sum, g) => sum + g.credit_hours, 0);
  const passedCredits = allPublished.filter((g) => g.is_pass).reduce((sum, g) => sum + g.credit_hours, 0);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="animate-pulse text-sand-500 dark:text-sand-400 text-lg">{ts('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-sand-400 dark:text-sand-500 mb-4" />
          <p className="text-sand-600 dark:text-sand-400 text-lg">
            {locale === 'ar' ? 'يرجى تسجيل الدخول' : 'Please log in'}
          </p>
          <Link
            href={`/${locale}/auth/login`}
            className="mt-4 inline-block bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors"
          >
            {locale === 'ar' ? 'تسجيل الدخول' : 'Log In'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sand-400 text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* GPA Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <TrendingUp className="w-6 h-6 text-primary-700 dark:text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-sand-100">
              {cumulativeGpa !== null ? cumulativeGpa.toFixed(2) : '--'}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{ts('cgpa')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <Award className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-sand-100">
              {semesterGpa !== null ? semesterGpa.toFixed(2) : '--'}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{ts('semesterGpa')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <BookOpen className="w-6 h-6 text-teal-500 dark:text-teal-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-sand-100">{totalCredits}</p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{ts('totalHours')}</p>
          </div>
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-sand-100">{passedCredits}</p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{ts('earnedHours')}</p>
          </div>
        </motion.div>

        {/* Semester Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-lg bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-gray-900 dark:text-sand-100 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('allSemesters')}</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} {s.is_current ? (locale === 'ar' ? '(حالي)' : '(Current)') : ''}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Grades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 overflow-hidden"
        >
          {loading ? (
            <div className="animate-pulse p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-sand-100 dark:bg-navy-700 rounded" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sand-50 dark:bg-navy-900 border-b border-sand-200 dark:border-navy-700">
                    <th className="text-start px-4 py-3 font-semibold text-gray-700 dark:text-sand-300">{ts('courseName')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('midterm')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('final')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('coursework')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('total')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{t('letterGrade')}</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700 dark:text-sand-300">{ts('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((grade, i) => (
                    <tr
                      key={grade.id}
                      className={`border-b border-sand-100 dark:border-navy-700 ${
                        i % 2 === 0 ? 'bg-white dark:bg-navy-800' : 'bg-sand-50/50 dark:bg-navy-850'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-sand-100">
                          {grade.course_section?.course?.name || `Course ${grade.course_section_id}`}
                        </p>
                        <p className="text-xs text-sand-400">
                          {grade.course_section?.course?.code} ({grade.credit_hours} {ts('creditHours')})
                        </p>
                      </td>
                      <td className="text-center px-3 py-3 text-gray-700 dark:text-sand-300">
                        {grade.midterm_score !== null ? grade.midterm_score : '--'}
                      </td>
                      <td className="text-center px-3 py-3 text-gray-700 dark:text-sand-300">
                        {grade.final_score !== null ? grade.final_score : '--'}
                      </td>
                      <td className="text-center px-3 py-3 text-gray-700 dark:text-sand-300">
                        {grade.coursework_score !== null ? grade.coursework_score : '--'}
                      </td>
                      <td className="text-center px-3 py-3 font-semibold text-gray-900 dark:text-sand-100">
                        {grade.total_score !== null ? grade.total_score : '--'}
                      </td>
                      <td className="text-center px-3 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          grade.is_pass
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : grade.is_pass === false
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-sand-100 text-sand-600 dark:bg-navy-700 dark:text-sand-400'
                        }`}>
                          {grade.letter_grade || '--'}
                        </span>
                      </td>
                      <td className="text-center px-3 py-3">
                        {grade.is_published ? (
                          grade.is_pass ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          ) : grade.is_pass === false ? (
                            <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <Clock className="w-5 h-5 text-sand-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs text-sand-400">{t('unpublished')}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-16 h-16 mx-auto text-sand-300 dark:text-sand-600 mb-4" />
              <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noGrades')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
