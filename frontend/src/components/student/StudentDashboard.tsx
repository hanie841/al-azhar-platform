'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
  fetchMsisEnrollments,
  fetchMsisGrades,
  fetchMsisPayments,
  fetchSemesters,
} from '@/lib/api-fetchers';
import type { MsisEnrollment, MsisGrade, MsisPayment, Semester } from '@/lib/types';
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  CreditCard,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Award,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';

export function StudentDashboard() {
  const t = useTranslations('student');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();

  const [enrollments, setEnrollments] = useState<MsisEnrollment[]>([]);
  const [grades, setGrades] = useState<MsisGrade[]>([]);
  const [payments, setPayments] = useState<MsisPayment[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.allSettled([
      fetchMsisEnrollments(token, locale, { status: 'active' }),
      fetchMsisGrades(token, locale, { per_page: 10 }),
      fetchMsisPayments(token, locale, { per_page: 10 }),
      fetchSemesters(locale),
    ]).then((results) => {
      if (cancelled) return;
      if (results[0].status === 'fulfilled') setEnrollments(results[0].value.data);
      if (results[1].status === 'fulfilled') setGrades(results[1].value.data);
      if (results[2].status === 'fulfilled') setPayments(results[2].value.data);
      if (results[3].status === 'fulfilled') setSemesters(results[3].value);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [token, isAuthenticated, locale]);

  const currentSemester = semesters.find((s) => s.is_current);

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const totalOwed = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const publishedGrades = grades.filter((g) => g.is_published);
  const avgGpa = publishedGrades.length > 0
    ? publishedGrades.reduce((sum, g) => sum + (g.grade_points || 0), 0) / publishedGrades.length
    : null;

  const quickLinks = [
    { href: `/${locale}/student/enrollment`, icon: ClipboardList, label: t('registration'), color: 'bg-teal-500' },
    { href: `/${locale}/student/grades`, icon: Award, label: t('grades'), color: 'bg-amber-500' },
    { href: `/${locale}/student/courses`, icon: BookOpen, label: t('transcript'), color: 'bg-blue-500' },
    { href: `/${locale}/student/payments`, icon: CreditCard, label: t('payments'), color: 'bg-purple-500' },
  ];

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
        <div className="animate-pulse text-sand-500 dark:text-sand-400 text-lg">{t('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-sand-400 dark:text-sand-500 mb-4" />
          <p className="text-sand-600 dark:text-sand-400 text-lg">
            {locale === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى بوابة الطالب' : 'Please log in to access the student portal'}
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
      {/* Hero Header */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {t('welcome')}, {user?.name || ''}
              </h1>
              <p className="text-sand-400 mt-1">{t('subtitle')}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white dark:bg-navy-800 rounded-xl p-4 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-lg"
              >
                <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center mb-3`}>
                  <link.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-sand-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                  {link.label}
                </p>
                <ChevronRight className={`w-4 h-4 text-sand-400 mt-1 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            ))}
          </motion.div>

          {/* Academic Status Card */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-700 dark:text-primary-400" />
              {t('academicStatus')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                  {avgGpa !== null ? avgGpa.toFixed(2) : '--'}
                </p>
                <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('cgpa')}</p>
              </div>
              <div className="text-center p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {enrollments.length}
                </p>
                <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('currentEnrollments')}</p>
              </div>
              <div className="text-center p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {enrollments.reduce((sum, e) => sum + (e.course_section?.course?.credit_hours || 0), 0)}
                </p>
                <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('creditHours')}</p>
              </div>
              <div className="text-center p-4 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {currentSemester?.name || '--'}
                </p>
                <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{t('currentSemester')}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Enrollments */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {t('currentEnrollments')}
              </h2>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-sand-100 dark:bg-navy-700 rounded-lg" />
                  ))}
                </div>
              ) : enrollments.length > 0 ? (
                <div className="space-y-3">
                  {enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="p-3 bg-sand-50 dark:bg-navy-900 rounded-lg border border-sand-100 dark:border-navy-700"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-sand-100 text-sm">
                            {enrollment.course_section?.course?.name || `Course ${enrollment.course_section_id}`}
                          </p>
                          <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
                            {enrollment.course_section?.course?.code} - {t('section')} {enrollment.course_section?.section_number}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                          {t('enrolled')}
                        </span>
                      </div>
                      {enrollment.course_section?.room && (
                        <p className="text-xs text-sand-400 dark:text-sand-500 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {enrollment.course_section.building && `${enrollment.course_section.building} - `}
                          {enrollment.course_section.room}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sand-500 dark:text-sand-400 text-sm text-center py-8">
                  {t('noEnrollments')}
                </p>
              )}
            </motion.div>

            {/* Recent Grades */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {t('recentGrades')}
              </h2>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-sand-100 dark:bg-navy-700 rounded-lg" />
                  ))}
                </div>
              ) : publishedGrades.length > 0 ? (
                <div className="space-y-3">
                  {publishedGrades.slice(0, 5).map((grade) => (
                    <div
                      key={grade.id}
                      className="flex items-center justify-between p-3 bg-sand-50 dark:bg-navy-900 rounded-lg border border-sand-100 dark:border-navy-700"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-sand-100 text-sm">
                          {grade.course_section?.course?.name || `Course ${grade.course_section_id}`}
                        </p>
                        <p className="text-xs text-sand-500 dark:text-sand-400">
                          {grade.total_score !== null ? `${grade.total_score}%` : '--'}
                        </p>
                      </div>
                      <div className="text-end">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          grade.is_pass
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : grade.is_pass === false
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-sand-100 text-sand-600 dark:bg-navy-700 dark:text-sand-400'
                        }`}>
                          {grade.letter_grade || '--'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sand-500 dark:text-sand-400 text-sm text-center py-8">
                  {t('noGrades')}
                </p>
              )}
              {publishedGrades.length > 5 && (
                <Link
                  href={`/${locale}/student/grades`}
                  className="mt-4 block text-center text-sm text-primary-700 dark:text-primary-400 hover:underline"
                >
                  {locale === 'ar' ? 'عرض الكل' : 'View All'}
                </Link>
              )}
            </motion.div>

            {/* Payment Status */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                {t('paymentStatus')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-sand-100">
                    {payments.filter((p) => p.status === 'paid').length}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                    {locale === 'ar' ? 'مدفوع' : 'Paid'}
                  </p>
                </div>
                <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {pendingPayments.length}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                    {locale === 'ar' ? 'قيد الانتظار' : 'Pending'}
                  </p>
                </div>
                <div className="p-4 bg-sand-50 dark:bg-navy-900 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {totalOwed > 0 ? `$${totalOwed.toLocaleString()}` : '$0'}
                  </p>
                  <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
                    {locale === 'ar' ? 'الرصيد المستحق' : 'Balance Due'}
                  </p>
                </div>
              </div>
              <Link
                href={`/${locale}/student/payments`}
                className="mt-4 block text-center text-sm text-primary-700 dark:text-primary-400 hover:underline"
              >
                {locale === 'ar' ? 'إدارة المدفوعات' : 'Manage Payments'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
