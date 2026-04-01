'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchMyCourses } from '@/lib/api-fetchers';
import type { CourseSection } from '@/lib/types';
import {
  BookOpen,
  Users,
  Clock,
  ChevronLeft,
  GraduationCap,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

const DAYS_AR: Record<string, string> = {
  Sunday: 'الأحد', Monday: 'الاثنين', Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء', Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت',
};

export function FacultyCoursesPage() {
  const t = useTranslations('faculty');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [courses, setCourses] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in');
      setLoading(false);
      return;
    }
    fetchMyCourses(token, locale)
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setLoading(false);
      });
  }, [locale, isRtl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/faculty"
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-4 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
            </Link>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-gold-400" />
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isRtl ? 'مقرراتي' : 'My Courses'}
              </h1>
            </div>
            <p className="text-sand-400 mt-2">
              {isRtl ? 'عرض وإدارة المقررات الدراسية المسندة إليك' : 'View and manage your assigned courses'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-sm text-red-700 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 inline-block me-1" />
            {error}
          </div>
        )}

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Header */}
                <div className="p-5 border-b border-sand-100 dark:border-navy-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                        {section.course?.name || `${isRtl ? 'مقرر' : 'Course'} #${section.course_id}`}
                      </h3>
                      {section.course?.code && (
                        <p className="text-xs font-mono text-sand-500 dark:text-sand-400 mt-0.5">
                          {section.course.code}
                        </p>
                      )}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium">
                      {isRtl ? 'شعبة' : 'Sec'} {section.section_number}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  {/* Enrollment */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-sand-600 dark:text-sand-400">
                      <Users className="w-4 h-4" />
                      {isRtl ? 'المسجلون' : 'Enrolled'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-sand-100 dark:bg-navy-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{
                            width: `${Math.min((section.enrolled / section.capacity) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-navy-900 dark:text-white">
                        {section.enrolled}/{section.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Semester */}
                  <div className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400">
                    <GraduationCap className="w-4 h-4" />
                    {section.semester} {section.year}
                  </div>

                  {/* Schedule */}
                  {section.schedule && section.schedule.length > 0 && (
                    <div className="space-y-1">
                      {section.schedule.map((s, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-sand-500 dark:text-sand-400"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">
                            {isRtl ? DAYS_AR[s.day] || s.day : s.day}
                          </span>
                          <span>
                            {s.start}-{s.end}
                          </span>
                          {s.room && (
                            <span className="text-sand-400 dark:text-sand-500">
                              ({s.room})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex flex-wrap gap-2">
                  <Link
                    href={`/faculty/courses/${section.id}/students`}
                    className="flex-1 text-center py-2 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all"
                  >
                    <Users className="w-3.5 h-3.5 inline-block me-1" />
                    {isRtl ? 'الطلاب' : 'Students'}
                  </Link>
                  <Link
                    href={`/lms/courses/${section.id}`}
                    className="flex-1 text-center py-2 text-xs font-medium bg-sand-50 dark:bg-navy-900 text-sand-600 dark:text-sand-400 rounded-lg hover:bg-sand-100 dark:hover:bg-navy-700 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 inline-block me-1" />
                    {isRtl ? 'المقرر الإلكتروني' : 'LMS'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-sand-300 dark:text-navy-600 mb-4" />
            <p className="text-lg text-sand-500 dark:text-sand-400">
              {isRtl ? 'لا توجد مقررات مسندة إليك حاليا' : 'No courses assigned to you currently'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
