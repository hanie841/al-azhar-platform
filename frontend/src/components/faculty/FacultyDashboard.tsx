'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchFacultyDashboard, fetchMyFacultyProfile } from '@/lib/api-fetchers';
import type { FacultyDashboard, FacultyProfile } from '@/lib/types';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
  AlertTriangle,
  Briefcase,
  CalendarDays,
} from 'lucide-react';

const DAYS_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_AR: Record<string, string> = {
  Sunday: 'الأحد',
  Monday: 'الاثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس',
  Friday: 'الجمعة',
  Saturday: 'السبت',
};

export function FacultyDashboardPage() {
  const t = useTranslations('faculty');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [dashboard, setDashboard] = useState<FacultyDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in to access the faculty portal');
      setLoading(false);
      return;
    }

    Promise.all([
      fetchMyFacultyProfile(token, locale).catch(() => null),
      fetchFacultyDashboard(token, locale).catch(() => null),
    ]).then(([prof, dash]) => {
      setProfile(prof);
      setDashboard(dash);
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

  if (error) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <p className="text-lg text-sand-600 dark:text-sand-400">{error}</p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block px-6 py-2 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-all"
          >
            {isRtl ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: isRtl ? 'إجمالي الطلاب' : 'Total Students',
      value: dashboard?.total_students ?? 0,
      icon: Users,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      label: isRtl ? 'المقررات النشطة' : 'Active Courses',
      value: dashboard?.current_courses?.length ?? 0,
      icon: BookOpen,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
    {
      label: isRtl ? 'تسليمات معلقة' : 'Pending Submissions',
      value: dashboard?.pending_submissions ?? 0,
      icon: ClipboardCheck,
      color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    },
    {
      label: isRtl ? 'تصحيح معلق' : 'Pending Grading',
      value: dashboard?.pending_exam_grading ?? 0,
      icon: GraduationCap,
      color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    },
  ];

  const quickLinks = [
    {
      label: isRtl ? 'مقرراتي' : 'My Courses',
      href: '/faculty/courses',
      icon: BookOpen,
      desc: isRtl ? 'عرض وإدارة المقررات' : 'View and manage courses',
    },
    {
      label: isRtl ? 'طلبات الإجازة' : 'Leave Requests',
      href: '/faculty/leaves',
      icon: CalendarDays,
      desc: isRtl ? 'إدارة طلبات الإجازة' : 'Manage leave requests',
    },
    {
      label: isRtl ? 'الملف الشخصي' : 'My Profile',
      href: '/faculty/profile',
      icon: Briefcase,
      desc: isRtl ? 'تعديل معلوماتك' : 'Edit your information',
    },
  ];

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
            className="flex items-center gap-4"
          >
            {profile?.photo ? (
              <img
                src={profile.photo}
                alt={profile.user?.name || ''}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold-400"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-700/30 flex items-center justify-center border-2 border-gold-400">
                <GraduationCap className="w-8 h-8 text-gold-400" />
              </div>
            )}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isRtl ? 'مرحبا،' : 'Welcome,'}{' '}
                {profile?.user?.name || (isRtl ? 'عضو هيئة التدريس' : 'Faculty Member')}
              </h1>
              <p className="text-sand-400 text-sm mt-1">
                {profile?.title && <span>{profile.title}</span>}
                {profile?.academic_rank && (
                  <span className="ms-2 text-gold-400">{profile.academic_rank}</span>
                )}
                {profile?.department && (
                  <span className="ms-2">- {profile.department.name}</span>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-10 relative z-20 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-navy-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                  {isRtl ? 'مقررات الفصل الحالي' : 'Current Semester Courses'}
                </h2>
                <Link
                  href="/faculty/courses"
                  className="text-sm text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  {isRtl ? 'عرض الكل' : 'View All'}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {dashboard?.current_courses && dashboard.current_courses.length > 0 ? (
                <div className="space-y-3">
                  {dashboard.current_courses.map((section) => (
                    <Link
                      key={section.id}
                      href={`/faculty/courses/${section.id}/students`}
                      className="block p-4 rounded-xl bg-sand-50 dark:bg-navy-900 hover:bg-sand-100 dark:hover:bg-navy-700 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-navy-900 dark:text-white text-sm">
                            {section.course?.name || `${isRtl ? 'مقرر' : 'Course'} #${section.course_id}`}
                          </h3>
                          <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
                            {section.course?.code && (
                              <span className="font-mono">{section.course.code}</span>
                            )}
                            {section.section_number && (
                              <span className="ms-2">
                                {isRtl ? 'شعبة' : 'Section'} {section.section_number}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="text-sm font-medium text-navy-900 dark:text-white">
                            {section.enrolled}/{section.capacity}
                          </p>
                          <p className="text-xs text-sand-400">
                            {isRtl ? 'طالب' : 'students'}
                          </p>
                        </div>
                      </div>
                      {section.schedule && section.schedule.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {section.schedule.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                            >
                              {isRtl ? DAYS_AR[s.day] || s.day : s.day} {s.start}-{s.end}
                              {s.room && ` (${s.room})`}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <BookOpen className="w-12 h-12 mx-auto text-sand-300 dark:text-navy-600 mb-3" />
                  <p className="text-sm text-sand-500 dark:text-sand-400">
                    {isRtl ? 'لا توجد مقررات في الفصل الحالي' : 'No courses this semester'}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Weekly Schedule */}
            {dashboard?.schedule && dashboard.schedule.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6 mt-8"
              >
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white flex items-center gap-2 mb-5">
                  <Calendar className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                  {isRtl ? 'الجدول الأسبوعي' : 'Weekly Schedule'}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-sand-200 dark:border-navy-700">
                        <th className="text-start py-2 px-3 text-sand-500 dark:text-sand-400 font-medium">
                          {isRtl ? 'اليوم' : 'Day'}
                        </th>
                        <th className="text-start py-2 px-3 text-sand-500 dark:text-sand-400 font-medium">
                          {isRtl ? 'الوقت' : 'Time'}
                        </th>
                        <th className="text-start py-2 px-3 text-sand-500 dark:text-sand-400 font-medium">
                          {isRtl ? 'المقرر' : 'Course'}
                        </th>
                        <th className="text-start py-2 px-3 text-sand-500 dark:text-sand-400 font-medium">
                          {isRtl ? 'القاعة' : 'Room'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.schedule
                        .sort((a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day))
                        .map((slot, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-sand-100 dark:border-navy-700/50 last:border-0"
                          >
                            <td className="py-3 px-3 font-medium text-navy-900 dark:text-white">
                              {isRtl ? DAYS_AR[slot.day] || slot.day : slot.day}
                            </td>
                            <td className="py-3 px-3 text-sand-600 dark:text-sand-300">
                              <Clock className="w-3.5 h-3.5 inline-block me-1 text-sand-400" />
                              {slot.start} - {slot.end}
                            </td>
                            <td className="py-3 px-3 text-navy-900 dark:text-white">
                              {slot.course}
                            </td>
                            <td className="py-3 px-3 text-sand-500 dark:text-sand-400">
                              {slot.room}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4">
                {isRtl ? 'روابط سريعة' : 'Quick Links'}
              </h2>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-sand-50 dark:bg-navy-900 hover:bg-sand-100 dark:hover:bg-navy-700 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-all">
                      <link.icon className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 dark:text-white">
                        {link.label}
                      </p>
                      <p className="text-xs text-sand-500 dark:text-sand-400 truncate">
                        {link.desc}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-sand-400 group-hover:text-primary-700 transition-all ${
                        isRtl ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Profile Summary */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
              >
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4">
                  {isRtl ? 'ملخص الملف' : 'Profile Summary'}
                </h2>
                <div className="space-y-3 text-sm">
                  {profile.specialization && (
                    <div>
                      <span className="text-sand-500 dark:text-sand-400">
                        {isRtl ? 'التخصص:' : 'Specialization:'}
                      </span>
                      <p className="text-navy-900 dark:text-white font-medium">
                        {profile.specialization}
                      </p>
                    </div>
                  )}
                  {profile.office_location && (
                    <div>
                      <span className="text-sand-500 dark:text-sand-400">
                        {isRtl ? 'المكتب:' : 'Office:'}
                      </span>
                      <p className="text-navy-900 dark:text-white">{profile.office_location}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sand-500 dark:text-sand-400">
                      {isRtl ? 'المنشورات:' : 'Publications:'}
                    </span>
                    <p className="text-navy-900 dark:text-white font-medium">
                      {profile.publications_count}
                    </p>
                  </div>
                </div>
                <Link
                  href="/faculty/profile"
                  className="mt-4 block text-center py-2 text-sm text-primary-700 dark:text-primary-400 hover:underline"
                >
                  {isRtl ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
