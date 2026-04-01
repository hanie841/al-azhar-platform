'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';
import { fetchExam, fetchMyExamAttempts, startExam } from '@/lib/api-fetchers';
import type { Exam, ExamAttempt } from '@/lib/types';
import {
  ClipboardList,
  Clock,
  Award,
  Calendar,
  AlertTriangle,
  PlayCircle,
  BarChart3,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  Shuffle,
  RotateCcw,
} from 'lucide-react';

interface ExamDetailPageProps {
  slug: string;
}

export function ExamDetailPage({ slug }: ExamDetailPageProps) {
  const t = useTranslations('exams');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const router = useRouter();

  const [exam, setExam] = useState<Exam | null>(null);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchExam(locale, slug)
      .then((data) => {
        if (!cancelled) {
          setExam(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(isRtl ? 'لم يتم العثور على الامتحان' : 'Exam not found');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [locale, slug, isRtl]);

  useEffect(() => {
    if (!exam) return;
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    fetchMyExamAttempts(token, locale, exam.id)
      .then((data) => setAttempts(data))
      .catch(() => setAttempts([]));
  }, [exam, locale]);

  const handleStartExam = async () => {
    if (!exam) return;
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول أولا' : 'Please log in first');
      return;
    }
    setStarting(true);
    try {
      const attempt = await startExam(token, exam.id);
      router.push(`/exams/attempt/${attempt.id}`);
    } catch {
      setError(isRtl ? 'لا يمكن بدء الامتحان' : 'Cannot start exam');
      setStarting(false);
    }
  };

  const canStart = () => {
    if (!exam) return false;
    const now = new Date();
    if (exam.starts_at && new Date(exam.starts_at) > now) return false;
    if (exam.ends_at && new Date(exam.ends_at) < now) return false;
    if (exam.max_attempts > 0 && attempts.length >= exam.max_attempts) return false;
    const inProgress = attempts.find((a) => a.status === 'in_progress');
    if (inProgress) return false;
    return exam.is_published;
  };

  const inProgressAttempt = attempts.find((a) => a.status === 'in_progress');

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <p className="text-lg text-sand-600 dark:text-sand-400">{error}</p>
        </div>
      </div>
    );
  }

  const status = (() => {
    const now = new Date();
    if (exam.starts_at && new Date(exam.starts_at) > now) return 'upcoming';
    if (exam.ends_at && new Date(exam.ends_at) < now) return 'completed';
    return 'active';
  })();

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => router.push('/exams')}
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-6 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة للامتحانات' : 'Back to Exams'}
            </button>

            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-14 h-14 rounded-xl bg-primary-700/20 items-center justify-center flex-shrink-0">
                <ClipboardList className="w-7 h-7 text-gold-400" />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {exam.title}
                </h1>
                {exam.description && (
                  <p className="text-sand-400 text-base max-w-2xl">{exam.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
            >
              <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4">
                {isRtl ? 'تفاصيل الامتحان' : 'Exam Details'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'النوع' : 'Type'}
                    </p>
                    <p className="text-sm font-medium text-navy-900 dark:text-white capitalize">
                      {exam.exam_type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'المدة' : 'Duration'}
                    </p>
                    <p className="text-sm font-medium text-navy-900 dark:text-white">
                      {exam.duration_minutes} {isRtl ? 'دقيقة' : 'minutes'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-50 dark:bg-gold-900/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'الدرجة الكلية' : 'Total Marks'}
                    </p>
                    <p className="text-sm font-medium text-navy-900 dark:text-white">
                      {exam.total_marks}
                    </p>
                  </div>
                </div>

                {exam.pass_marks !== null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs text-sand-500 dark:text-sand-400">
                        {isRtl ? 'درجة النجاح' : 'Pass Marks'}
                      </p>
                      <p className="text-sm font-medium text-navy-900 dark:text-white">
                        {exam.pass_marks}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-sand-500 dark:text-sand-400">
                      {isRtl ? 'المحاولات المسموحة' : 'Max Attempts'}
                    </p>
                    <p className="text-sm font-medium text-navy-900 dark:text-white">
                      {exam.max_attempts > 0 ? exam.max_attempts : isRtl ? 'غير محدود' : 'Unlimited'}
                    </p>
                  </div>
                </div>

                {exam.shuffle_questions && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
                      <Shuffle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-sand-500 dark:text-sand-400">
                        {isRtl ? 'خلط الأسئلة' : 'Shuffle'}
                      </p>
                      <p className="text-sm font-medium text-navy-900 dark:text-white">
                        {isRtl ? 'نعم' : 'Yes'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Schedule Card */}
            {(exam.starts_at || exam.ends_at) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
              >
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                  {isRtl ? 'الجدول الزمني' : 'Schedule'}
                </h2>
                <div className="space-y-3">
                  {exam.starts_at && (
                    <div className="flex items-center justify-between py-2 border-b border-sand-100 dark:border-navy-700">
                      <span className="text-sm text-sand-500 dark:text-sand-400">
                        {isRtl ? 'يبدأ في' : 'Starts at'}
                      </span>
                      <span className="text-sm font-medium text-navy-900 dark:text-white">
                        {new Date(exam.starts_at).toLocaleString(locale, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  )}
                  {exam.ends_at && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-sand-500 dark:text-sand-400">
                        {isRtl ? 'ينتهي في' : 'Ends at'}
                      </span>
                      <span className="text-sm font-medium text-navy-900 dark:text-white">
                        {new Date(exam.ends_at).toLocaleString(locale, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* My Attempts */}
            {attempts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6"
              >
                <h2 className="font-semibold text-lg text-navy-900 dark:text-white mb-4">
                  {isRtl ? 'محاولاتي' : 'My Attempts'}
                </h2>
                <div className="space-y-3">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between py-3 border-b border-sand-100 dark:border-navy-700 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {attempt.is_passed === true ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : attempt.is_passed === false ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-navy-900 dark:text-white">
                            {isRtl ? 'المحاولة' : 'Attempt'} #{attempt.attempt_number}
                          </p>
                          <p className="text-xs text-sand-500 dark:text-sand-400">
                            {new Date(attempt.started_at).toLocaleString(locale, {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        {attempt.total_score !== null ? (
                          <>
                            <p className="text-sm font-bold text-navy-900 dark:text-white">
                              {attempt.total_score}/{exam.total_marks}
                            </p>
                            <p className="text-xs text-sand-500 dark:text-sand-400">
                              {attempt.percentage?.toFixed(1)}%
                            </p>
                          </>
                        ) : (
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            {attempt.status === 'in_progress'
                              ? isRtl
                                ? 'جارٍ'
                                : 'In Progress'
                              : isRtl
                                ? 'قيد المراجعة'
                                : 'Pending'}
                          </span>
                        )}
                      </div>
                      {attempt.status === 'completed' && (
                        <button
                          onClick={() => router.push(`/exams/results/${attempt.id}`)}
                          className="text-xs text-primary-700 dark:text-primary-400 hover:underline ms-3"
                        >
                          {isRtl ? 'عرض النتيجة' : 'View Results'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Start Exam */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                    status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : status === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}
                >
                  {status === 'active'
                    ? isRtl
                      ? 'متاح الآن'
                      : 'Available Now'
                    : status === 'upcoming'
                      ? isRtl
                        ? 'قادم'
                        : 'Upcoming'
                      : isRtl
                        ? 'انتهى'
                        : 'Ended'}
                </div>
                <p className="text-3xl font-bold text-navy-900 dark:text-white">
                  {exam.duration_minutes}
                  <span className="text-base font-normal text-sand-500 ms-1">
                    {isRtl ? 'دقيقة' : 'min'}
                  </span>
                </p>
              </div>

              {/* Attempts info */}
              <div className="mb-6 p-3 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sand-500 dark:text-sand-400">
                    {isRtl ? 'المحاولات المستخدمة' : 'Attempts Used'}
                  </span>
                  <span className="font-medium text-navy-900 dark:text-white">
                    {attempts.length}
                    {exam.max_attempts > 0 ? `/${exam.max_attempts}` : ''}
                  </span>
                </div>
              </div>

              {inProgressAttempt ? (
                <button
                  onClick={() => router.push(`/exams/attempt/${inProgressAttempt.id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  <PlayCircle className="w-5 h-5" />
                  {isRtl ? 'استمرار المحاولة' : 'Continue Attempt'}
                </button>
              ) : canStart() ? (
                <button
                  onClick={handleStartExam}
                  disabled={starting}
                  className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
                >
                  {starting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PlayCircle className="w-5 h-5" />
                  )}
                  {starting
                    ? isRtl
                      ? 'جاري البدء...'
                      : 'Starting...'
                    : isRtl
                      ? 'بدء الامتحان'
                      : 'Start Exam'}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-gray-300 dark:bg-navy-600 text-gray-500 dark:text-sand-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed"
                >
                  {isRtl ? 'غير متاح' : 'Not Available'}
                </button>
              )}

              {error && (
                <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
              )}

              {/* Instructions */}
              <div className="mt-6 pt-6 border-t border-sand-100 dark:border-navy-700">
                <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">
                  {isRtl ? 'تعليمات' : 'Instructions'}
                </h3>
                <ul className="space-y-2 text-xs text-sand-500 dark:text-sand-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 dark:text-primary-400 mt-0.5">&#8226;</span>
                    {isRtl
                      ? 'تأكد من اتصالك بالإنترنت بشكل مستقر'
                      : 'Ensure stable internet connection'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 dark:text-primary-400 mt-0.5">&#8226;</span>
                    {isRtl
                      ? 'يتم حفظ الإجابات تلقائيا'
                      : 'Answers are auto-saved'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 dark:text-primary-400 mt-0.5">&#8226;</span>
                    {isRtl
                      ? 'لا يمكن العودة بعد تسليم الامتحان'
                      : 'Cannot go back after submission'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 dark:text-primary-400 mt-0.5">&#8226;</span>
                    {isRtl
                      ? 'يتم إرسال الامتحان تلقائيا عند انتهاء الوقت'
                      : 'Auto-submitted when time runs out'}
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
