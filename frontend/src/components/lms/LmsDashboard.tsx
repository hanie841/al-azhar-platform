'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { fetchLmsCourses } from '@/lib/api-fetchers';
import type { LmsCourse } from '@/lib/types';
import {
  BookOpen,
  GraduationCap,
  Bell,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  User,
  Image,
} from 'lucide-react';
import Link from 'next/link';

export function LmsDashboard() {
  const t = useTranslations('lms');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();

  const [courses, setCourses] = useState<LmsCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchLmsCourses(locale, { per_page: 50 })
      .then((res) => {
        if (!cancelled) setCourses(res.data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [locale]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="animate-pulse text-sand-500 text-lg">
          {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {t('title')}
            </h1>
            <p className="text-sand-400 text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* My Courses Grid */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-sand-100 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-700 dark:text-primary-400" />
              {t('myCourses')}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-white dark:bg-navy-800 rounded-xl h-56 border border-sand-200 dark:border-navy-700" />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {courses.map((course, i) => {
                  const moduleCount = course.modules?.length || 0;
                  const lessonCount = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;

                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/${locale}/lms/courses/${course.slug}`}
                        className="block bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 overflow-hidden hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
                      >
                        {/* Cover Image or Placeholder */}
                        <div className="h-36 bg-gradient-to-br from-primary-700 to-teal-600 relative overflow-hidden">
                          {course.cover_image ? (
                            <img
                              src={course.cover_image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Image className="w-12 h-12 text-white/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-3 start-4 end-4">
                            <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-primary-200 transition-colors">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        <div className="p-4">
                          {course.description && (
                            <p className="text-xs text-sand-500 dark:text-sand-400 line-clamp-2 mb-3">
                              {course.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs text-sand-400 dark:text-sand-500">
                            <span>{moduleCount} {t('modules')}</span>
                            <span className="flex items-center gap-1 text-primary-700 dark:text-primary-400 font-medium group-hover:underline">
                              {t('viewCourse')}
                              <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 mb-10">
                <BookOpen className="w-16 h-16 mx-auto text-sand-300 dark:text-sand-600 mb-4" />
                <p className="text-sand-500 dark:text-sand-400 text-lg">{t('noCourses')}</p>
              </div>
            )}
          </motion.div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Announcements */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                {t('recentAnnouncements')}
              </h3>
              <p className="text-sm text-sand-500 dark:text-sand-400 text-center py-6">
                {t('noAnnouncements')}
              </p>
            </motion.div>

            {/* Upcoming Assignments */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-red-500" />
                {t('upcomingAssignments')}
              </h3>
              <p className="text-sm text-sand-500 dark:text-sand-400 text-center py-6">
                {t('noAssignments')}
              </p>
            </motion.div>

            {/* Recent Discussions */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                {t('recentDiscussions')}
              </h3>
              <p className="text-sm text-sand-500 dark:text-sand-400 text-center py-6">
                {t('noDiscussions')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
