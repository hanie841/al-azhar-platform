'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';
import { fetchExamAttempt } from '@/lib/api-fetchers';
import type { ExamAttempt, ExamAnswer } from '@/lib/types';
import {
  Trophy,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  BarChart3,
  Target,
  Award,
  MessageSquare,
} from 'lucide-react';

interface ExamResultsPageProps {
  attemptId: number;
}

export function ExamResultsPage({ attemptId }: ExamResultsPageProps) {
  const t = useTranslations('exams');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const router = useRouter();

  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError(isRtl ? 'يرجى تسجيل الدخول' : 'Please log in');
      setLoading(false);
      return;
    }
    fetchExamAttempt(token, attemptId)
      .then((data) => {
        setAttempt(data);
        setLoading(false);
      })
      .catch(() => {
        setError(isRtl ? 'لم يتم العثور على النتيجة' : 'Result not found');
        setLoading(false);
      });
  }, [attemptId, isRtl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <p className="text-lg text-sand-600 dark:text-sand-400">{error}</p>
        </div>
      </div>
    );
  }

  const isPassed = attempt.is_passed === true;
  const percentage = attempt.percentage ?? 0;
  const totalScore = attempt.total_score ?? 0;
  const totalMarks = attempt.exam?.total_marks ?? 0;
  const timeSpent = attempt.time_spent_seconds ?? 0;

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  // Score ring color
  const scoreColor =
    percentage >= 80
      ? 'text-green-500'
      : percentage >= 60
        ? 'text-yellow-500'
        : 'text-red-500';

  const correctCount =
    attempt.answers?.filter((a) => a.is_correct === true).length ?? 0;
  const totalQuestions = attempt.answers?.length ?? 0;

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div
        className={`relative overflow-hidden ${isPassed ? 'bg-green-900' : 'bg-navy-900'}`}
      >
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => {
                if (attempt.exam) router.push(`/exams/${attempt.exam.slug}`);
                else router.push('/exams');
              }}
              className="flex items-center gap-1 text-sand-400 hover:text-white mb-6 transition-colors text-sm"
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              {isRtl ? 'العودة' : 'Back'}
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                className="inline-block mb-4"
              >
                {isPassed ? (
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-green-400" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-400" />
                  </div>
                )}
              </motion.div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {isPassed
                  ? isRtl
                    ? 'مبروك! نجحت في الامتحان'
                    : 'Congratulations! You Passed'
                  : isRtl
                    ? 'لم تجتز الامتحان'
                    : 'You Did Not Pass'}
              </h1>
              <p className="text-sand-400">
                {attempt.exam?.title || (isRtl ? 'الامتحان' : 'Exam')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 -mt-12 relative z-20">
          {/* Total Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5 text-center shadow-sm"
          >
            <Award className={`w-8 h-8 mx-auto mb-2 ${scoreColor}`} />
            <p className={`text-3xl font-bold ${scoreColor}`}>{totalScore}</p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
              {isRtl ? 'من' : 'out of'} {totalMarks}
            </p>
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5 text-center shadow-sm"
          >
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-3xl font-bold text-navy-900 dark:text-white">
              {percentage.toFixed(1)}%
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
              {isRtl ? 'النسبة المئوية' : 'Percentage'}
            </p>
          </motion.div>

          {/* Correct Answers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5 text-center shadow-sm"
          >
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-3xl font-bold text-navy-900 dark:text-white">
              {correctCount}/{totalQuestions}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
              {isRtl ? 'إجابات صحيحة' : 'Correct'}
            </p>
          </motion.div>

          {/* Time Spent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-5 text-center shadow-sm"
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-navy-900 dark:text-white">
              {formatDuration(timeSpent)}
            </p>
            <p className="text-xs text-sand-500 dark:text-sand-400 mt-1">
              {isRtl ? 'الوقت المستغرق' : 'Time Spent'}
            </p>
          </motion.div>
        </div>

        {/* Score Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6 mb-8"
        >
          <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">
            {isRtl ? 'تقدم النتيجة' : 'Score Progress'}
          </h3>
          <div className="w-full h-4 bg-sand-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isPassed ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
          <div className="flex justify-between text-xs text-sand-500 dark:text-sand-400 mt-2">
            <span>0%</span>
            {attempt.exam?.pass_marks !== null && attempt.exam?.pass_marks !== undefined && (
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                {isRtl ? 'النجاح:' : 'Pass:'}{' '}
                {((attempt.exam.pass_marks / totalMarks) * 100).toFixed(0)}%
              </span>
            )}
            <span>100%</span>
          </div>
        </motion.div>

        {/* Per-question Results */}
        {attempt.answers && attempt.answers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-navy-900 dark:text-white mb-4">
              {isRtl ? 'تفاصيل الأسئلة' : 'Question Details'}
            </h2>

            {attempt.answers.map((answer: ExamAnswer, idx: number) => (
              <div
                key={answer.id}
                className={`bg-white dark:bg-navy-800 rounded-2xl border p-5 ${
                  answer.is_correct === true
                    ? 'border-green-200 dark:border-green-900/50'
                    : answer.is_correct === false
                      ? 'border-red-200 dark:border-red-900/50'
                      : 'border-sand-200 dark:border-navy-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-sand-500 dark:text-sand-400">
                      {isRtl ? 'السؤال' : 'Q'}{idx + 1}
                    </span>
                    {answer.is_correct === true ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : answer.is_correct === false ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                    {answer.question?.question_type && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sand-100 dark:bg-navy-700 text-sand-500 dark:text-sand-400 capitalize">
                        {answer.question.question_type.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <div className="text-end">
                    <span className={`text-sm font-bold ${
                      answer.is_correct === true
                        ? 'text-green-600'
                        : answer.is_correct === false
                          ? 'text-red-600'
                          : 'text-yellow-600'
                    }`}>
                      {answer.final_score ?? '-'}/{answer.question?.points ?? '-'}
                    </span>
                  </div>
                </div>

                {/* Question content */}
                {answer.question && (
                  <div
                    className="text-sm text-navy-900 dark:text-white mb-3 prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: answer.question.content }}
                  />
                )}

                {/* Student answer */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-sand-500 dark:text-sand-400 font-medium min-w-[100px]">
                      {isRtl ? 'إجابتك:' : 'Your answer:'}
                    </span>
                    <span
                      className={`${
                        answer.is_correct === true
                          ? 'text-green-700 dark:text-green-400'
                          : answer.is_correct === false
                            ? 'text-red-700 dark:text-red-400'
                            : 'text-navy-900 dark:text-white'
                      }`}
                    >
                      {answer.answer_content !== null && answer.answer_content !== undefined
                        ? typeof answer.answer_content === 'object'
                          ? JSON.stringify(answer.answer_content)
                          : String(answer.answer_content)
                        : isRtl
                          ? 'لم يتم الإجابة'
                          : 'No answer'}
                    </span>
                  </div>

                  {/* Correct answer (for objective questions) */}
                  {answer.question?.correct_answer !== null &&
                    answer.question?.correct_answer !== undefined &&
                    answer.is_correct === false && (
                      <div className="flex items-start gap-2">
                        <span className="text-sand-500 dark:text-sand-400 font-medium min-w-[100px]">
                          {isRtl ? 'الإجابة الصحيحة:' : 'Correct:'}
                        </span>
                        <span className="text-green-700 dark:text-green-400">
                          {typeof answer.question.correct_answer === 'object'
                            ? JSON.stringify(answer.question.correct_answer)
                            : String(answer.question.correct_answer)}
                        </span>
                      </div>
                    )}
                </div>

                {/* Feedback */}
                {answer.feedback && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {answer.feedback}
                    </p>
                  </div>
                )}

                {/* Explanation */}
                {answer.question?.explanation && (
                  <div className="mt-3 p-3 bg-sand-50 dark:bg-navy-900 rounded-lg">
                    <p className="text-xs font-medium text-sand-500 dark:text-sand-400 mb-1">
                      {isRtl ? 'التوضيح:' : 'Explanation:'}
                    </p>
                    <p className="text-sm text-sand-600 dark:text-sand-300">
                      {answer.question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
