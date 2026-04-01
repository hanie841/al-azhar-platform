'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { fetchCourseStudents } from '@/lib/api-fetchers';
import {
  Users,
  Search,
  ChevronLeft,
  AlertTriangle,
  Download,
  UserCircle,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';

interface CourseStudentsPageProps {
  sectionId: number;
}

interface StudentRecord {
  id: number;
  student_id_number: string;
  name: string;
  email?: string;
  photo?: string | null;
  attendance_present?: number;
  attendance_absent?: number;
  attendance_late?: number;
  current_grade?: string | null;
  total_score?: number | null;
}

export function CourseStudentsPage({ sectionId }: CourseStudentsPageProps) {
  const t = useTranslations('faculty');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in');
      setLoading(false);
      return;
    }
    fetchCourseStudents(token, locale, sectionId)
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
      });
  }, [locale, sectionId, isRtl]);

  const filtered = useMemo(() => {
    if (!search) return students;
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.student_id_number.toLowerCase().includes(q) ||
        (s.email && s.email.toLowerCase().includes(q))
    );
  }, [students, search]);

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
              href="/faculty/courses"
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-4 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة للمقررات' : 'Back to Courses'}
            </Link>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-gold-400" />
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isRtl ? 'طلاب المقرر' : 'Course Students'}
              </h1>
            </div>
            <p className="text-sand-400 mt-2">
              {students.length} {isRtl ? 'طالب مسجل' : 'enrolled students'}
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

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-sand-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRtl ? 'ابحث عن طالب...' : 'Search students...'}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 rounded-xl text-sand-600 dark:text-sand-400 hover:border-primary-300 transition-all">
            <Download className="w-4 h-4" />
            {isRtl ? 'تصدير' : 'Export'}
          </button>
        </div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900">
                  <th className="text-start py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    {isRtl ? 'الطالب' : 'Student'}
                  </th>
                  <th className="text-start py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    {isRtl ? 'الرقم الجامعي' : 'Student ID'}
                  </th>
                  <th className="text-center py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 inline-block text-green-500" />
                  </th>
                  <th className="text-center py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    <XCircle className="w-4 h-4 inline-block text-red-500" />
                  </th>
                  <th className="text-center py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    <Clock className="w-4 h-4 inline-block text-yellow-500" />
                  </th>
                  <th className="text-start py-3 px-4 text-sand-500 dark:text-sand-400 font-medium">
                    {isRtl ? 'الدرجة' : 'Grade'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-sand-100 dark:border-navy-700/50 last:border-0 hover:bg-sand-50 dark:hover:bg-navy-900/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {student.photo ? (
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <UserCircle className="w-8 h-8 text-sand-300 dark:text-navy-600" />
                          )}
                          <div>
                            <p className="font-medium text-navy-900 dark:text-white">
                              {student.name}
                            </p>
                            {student.email && (
                              <p className="text-xs text-sand-400 dark:text-sand-500">
                                {student.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sand-600 dark:text-sand-300 text-xs">
                        {student.student_id_number}
                      </td>
                      <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">
                        {student.attendance_present ?? '-'}
                      </td>
                      <td className="py-3 px-4 text-center text-red-600 dark:text-red-400 font-medium">
                        {student.attendance_absent ?? '-'}
                      </td>
                      <td className="py-3 px-4 text-center text-yellow-600 dark:text-yellow-400 font-medium">
                        {student.attendance_late ?? '-'}
                      </td>
                      <td className="py-3 px-4">
                        {student.current_grade ? (
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                              ['A+', 'A', 'A-'].includes(student.current_grade)
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : ['B+', 'B', 'B-'].includes(student.current_grade)
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  : ['C+', 'C', 'C-'].includes(student.current_grade)
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}
                          >
                            {student.current_grade}
                          </span>
                        ) : student.total_score !== null && student.total_score !== undefined ? (
                          <span className="text-sm text-navy-900 dark:text-white font-medium">
                            {student.total_score}
                          </span>
                        ) : (
                          <span className="text-xs text-sand-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <Users className="w-12 h-12 mx-auto text-sand-300 dark:text-navy-600 mb-3" />
                      <p className="text-sm text-sand-500 dark:text-sand-400">
                        {search
                          ? isRtl
                            ? 'لا توجد نتائج'
                            : 'No results found'
                          : isRtl
                            ? 'لا يوجد طلاب مسجلون'
                            : 'No students enrolled'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
