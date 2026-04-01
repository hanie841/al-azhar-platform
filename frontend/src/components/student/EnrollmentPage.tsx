'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
  fetchMsisEnrollments,
  fetchMsisCourseSections,
  dropEnrollment,
  enrollInSection,
  fetchSemesters,
} from '@/lib/api-fetchers';
import type { MsisEnrollment, MsisCourseSection, Semester } from '@/lib/types';
import {
  ClipboardList,
  Plus,
  Trash2,
  Clock,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  User,
  GraduationCap,
  Search,
} from 'lucide-react';
import Link from 'next/link';

const MIN_CREDITS = 12;
const MAX_CREDITS = 21;

export function EnrollmentPage() {
  const t = useTranslations('enrollment');
  const ts = useTranslations('student');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();

  const [enrollments, setEnrollments] = useState<MsisEnrollment[]>([]);
  const [availableSections, setAvailableSections] = useState<MsisCourseSection[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentSemester = semesters.find((s) => s.is_current);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [enrollRes, sectionsRes, semRes] = await Promise.allSettled([
        fetchMsisEnrollments(token, locale, { status: 'active' }),
        fetchMsisCourseSections(locale, { per_page: 200 }),
        fetchSemesters(locale),
      ]);
      if (enrollRes.status === 'fulfilled') setEnrollments(enrollRes.value.data);
      if (sectionsRes.status === 'fulfilled') setAvailableSections(sectionsRes.value.data);
      if (semRes.status === 'fulfilled') setSemesters(semRes.value);
    } finally {
      setLoading(false);
    }
  }, [token, locale]);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setLoading(false);
      return;
    }
    loadData();
  }, [token, isAuthenticated, loadData]);

  const enrolledCredits = useMemo(() => {
    return enrollments.reduce((sum, e) => sum + (e.course_section?.course?.credit_hours || 0), 0);
  }, [enrollments]);

  const enrolledSectionIds = useMemo(() => {
    return new Set(enrollments.map((e) => e.course_section_id));
  }, [enrollments]);

  const filteredSections = useMemo(() => {
    return availableSections.filter((s) => {
      if (enrolledSectionIds.has(s.id)) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (s.course?.name || '').toLowerCase().includes(q) ||
        (s.course?.code || '').toLowerCase().includes(q)
      );
    });
  }, [availableSections, enrolledSectionIds, search]);

  const handleDrop = async (enrollmentId: number) => {
    if (!token || !confirm(t('confirmDrop'))) return;
    setActionLoading(enrollmentId);
    setMessage(null);
    try {
      await dropEnrollment(token, enrollmentId);
      setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
      setMessage({ type: 'success', text: t('dropSuccess') });
    } catch {
      setMessage({ type: 'error', text: t('error') });
    } finally {
      setActionLoading(null);
    }
  };

  const handleEnroll = async (sectionId: number) => {
    if (!token) return;
    setActionLoading(sectionId);
    setMessage(null);
    try {
      const enrollment = await enrollInSection(token, sectionId);
      setEnrollments((prev) => [...prev, enrollment]);
      setMessage({ type: 'success', text: t('enrollSuccess') });
    } catch {
      setMessage({ type: 'error', text: t('error') });
    } finally {
      setActionLoading(null);
    }
  };

  // Simple schedule conflict detection
  const hasConflict = (section: MsisCourseSection): boolean => {
    if (!Array.isArray(section.schedule) || section.schedule.length === 0) return false;
    for (const enrollment of enrollments) {
      if (!Array.isArray(enrollment.course_section?.schedule)) continue;
      for (const es of enrollment.course_section!.schedule) {
        for (const ss of section.schedule) {
          if (es.day === ss.day) {
            const esStart = es.start || '';
            const esEnd = es.end || '';
            const ssStart = ss.start || '';
            const ssEnd = ss.end || '';
            if (esStart < ssEnd && ssStart < esEnd) return true;
          }
        }
      }
    }
    return false;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="animate-pulse text-sand-500 text-lg">{ts('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-sand-400 mb-4" />
          <p className="text-sand-600 dark:text-sand-400 text-lg">
            {locale === 'ar' ? 'يرجى تسجيل الدخول' : 'Please log in'}
          </p>
          <Link href={`/${locale}/auth/login`} className="mt-4 inline-block bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors">
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
        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credit Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-5 mb-8"
        >
          <h2 className="text-sm font-semibold text-gray-700 dark:text-sand-300 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            {t('creditCounter')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-sand-100 dark:bg-navy-900 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  enrolledCredits > MAX_CREDITS
                    ? 'bg-red-500'
                    : enrolledCredits >= MIN_CREDITS
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min((enrolledCredits / MAX_CREDITS) * 100, 100)}%` }}
              />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-sand-100">{enrolledCredits}</span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-sand-500 dark:text-sand-400">
            <span>{t('minimum')}: {MIN_CREDITS}</span>
            <span>{t('enrolled')}: {enrolledCredits}</span>
            <span>{t('maximum')}: {MAX_CREDITS}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary-700 dark:text-primary-400" />
              {t('currentEnrollments')} ({enrollments.length})
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse h-20 bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700" />
                ))}
              </div>
            ) : enrollments.length > 0 ? (
              <div className="space-y-3">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-sand-100 text-sm">
                          {enrollment.course_section?.course?.name || `Course`}
                        </p>
                        <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
                          {enrollment.course_section?.course?.code} - {ts('section')} {enrollment.course_section?.section_number}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-sand-400">
                          {enrollment.course_section?.room && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {enrollment.course_section.building && `${enrollment.course_section.building} `}
                              {enrollment.course_section.room}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            {enrollment.course_section?.course?.credit_hours || 0} {ts('creditHours')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDrop(enrollment.id)}
                        disabled={actionLoading === enrollment.id}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        title={t('drop')}
                      >
                        {actionLoading === enrollment.id ? (
                          <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-8 text-center">
                <ClipboardList className="w-12 h-12 mx-auto text-sand-300 dark:text-sand-600 mb-3" />
                <p className="text-sand-500 dark:text-sand-400 text-sm">{ts('noEnrollments')}</p>
              </div>
            )}
          </motion.div>

          {/* Available Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary-700 dark:text-primary-400" />
              {t('availableSections')}
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} w-4 h-4 text-sand-400`} />
              <input
                type="text"
                placeholder={locale === 'ar' ? 'ابحث عن مقرر...' : 'Search courses...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-lg bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-sm text-gray-900 dark:text-sand-100 placeholder-sand-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              />
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse h-24 bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700" />
                ))}
              </div>
            ) : filteredSections.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredSections.map((section) => {
                  const conflict = hasConflict(section);
                  const isFull = section.enrolled_count >= section.capacity;
                  const canEnroll = !conflict && !isFull;

                  return (
                    <div
                      key={section.id}
                      className={`bg-white dark:bg-navy-800 rounded-xl border p-4 transition-all ${
                        conflict
                          ? 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10'
                          : isFull
                          ? 'border-red-200 dark:border-red-800 opacity-60'
                          : 'border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-sand-100 text-sm">
                            {section.course?.name || `Section`}
                          </p>
                          <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
                            {section.course?.code} - {ts('section')} {section.section_number}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-sand-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {section.enrolled_count}/{section.capacity}
                            </span>
                            {section.room && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {section.building && `${section.building} `}{section.room}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" />
                              {section.course?.credit_hours || 0}h
                            </span>
                          </div>
                          {conflict && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {t('scheduleConflict')}
                            </p>
                          )}
                          {isFull && (
                            <p className="text-xs text-red-500 mt-2">{t('full')}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleEnroll(section.id)}
                          disabled={!canEnroll || actionLoading === section.id}
                          className="flex-shrink-0 px-3 py-1.5 bg-primary-700 text-white text-xs font-medium rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {actionLoading === section.id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            t('enroll')
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-8 text-center">
                <p className="text-sand-500 dark:text-sand-400 text-sm">{t('noSections')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
