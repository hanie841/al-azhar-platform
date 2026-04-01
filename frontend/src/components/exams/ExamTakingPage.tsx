'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';
import { fetchExamAttempt, saveExamAnswer, submitExam } from '@/lib/api-fetchers';
import type { ExamAttempt, ExamAnswer, Question } from '@/lib/types';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  Send,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';

interface ExamTakingPageProps {
  attemptId: number;
}

interface QuestionWithMeta {
  exam_question_id: number;
  question: Question;
  order: number;
}

export function ExamTakingPage({ attemptId }: ExamTakingPageProps) {
  const t = useTranslations('exams');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const router = useRouter();

  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<QuestionWithMeta[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load attempt data
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
        // Build questions list from answers
        if (data.answers && data.answers.length > 0) {
          const qs: QuestionWithMeta[] = data.answers
            .filter((a: ExamAnswer) => a.question)
            .map((a: ExamAnswer, idx: number) => ({
              exam_question_id: a.exam_question_id,
              question: a.question!,
              order: idx + 1,
            }));
          setQuestions(qs);
          // Restore saved answers
          const saved: Record<number, any> = {};
          data.answers.forEach((a: ExamAnswer) => {
            if (a.answer_content !== null && a.answer_content !== undefined) {
              saved[a.question_id] = a.answer_content;
            }
          });
          setAnswers(saved);
        }
        // Calculate time left
        if (data.exam && data.started_at) {
          const elapsed = Math.floor(
            (Date.now() - new Date(data.started_at).getTime()) / 1000
          );
          const remaining = data.exam.duration_minutes * 60 - elapsed;
          setTimeLeft(Math.max(0, remaining));
        }
        setLoading(false);
      })
      .catch(() => {
        setError(isRtl ? 'لم يتم العثور على المحاولة' : 'Attempt not found');
        setLoading(false);
      });
  }, [attemptId, isRtl]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || loading) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, timeLeft > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeWarning = timeLeft > 0 && timeLeft <= 300; // 5 minutes

  // Auto-save answer
  const doAutoSave = useCallback(
    (questionId: number, examQuestionId: number, content: any) => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
      autoSaveRef.current = setTimeout(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;
        saveExamAnswer(token, attemptId, {
          exam_question_id: examQuestionId,
          question_id: questionId,
          answer_content: content,
        }).catch(() => {
          // Silent fail - answer is kept locally
        });
      }, 800);
    },
    [attemptId]
  );

  const handleAnswerChange = (questionId: number, examQuestionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    doAutoSave(questionId, examQuestionId, value);
  };

  const toggleFlag = (questionId: number) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const handleSubmit = async (auto = false) => {
    if (submitting) return;
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    setSubmitting(true);
    setShowSubmitModal(false);
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      const result = await submitExam(token, attemptId);
      router.push(`/exams/results/${result.id}`);
    } catch {
      setError(isRtl ? 'فشل في تسليم الامتحان' : 'Failed to submit exam');
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex];
  const answeredCount = questions.filter((q) => answers[q.question.id] !== undefined).length;
  const unansweredCount = questions.length - answeredCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sand-500 dark:text-sand-400">
            {isRtl ? 'جاري تحميل الامتحان...' : 'Loading exam...'}
          </p>
        </div>
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

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Timer Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-navy-800 border-b border-sand-200 dark:border-navy-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base font-semibold text-navy-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
              {attempt.exam?.title || (isRtl ? 'الامتحان' : 'Exam')}
            </h1>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-all ${
              isTimeWarning
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                : 'bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
            }`}
          >
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden px-3 py-2 text-sm bg-sand-100 dark:bg-navy-700 rounded-lg text-sand-600 dark:text-sand-400"
            >
              {currentIndex + 1}/{questions.length}
            </button>

            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={submitting}
              className="flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 px-4 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isRtl ? 'تسليم الامتحان' : 'Submit'}
              </span>
            </button>
          </div>
        </div>

        {/* Time warning bar */}
        {isTimeWarning && (
          <div className="bg-red-500 text-white text-center py-1 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 inline-block me-1" />
            {isRtl
              ? `تحذير: بقي أقل من ${Math.ceil(timeLeft / 60)} دقيقة!`
              : `Warning: Less than ${Math.ceil(timeLeft / 60)} minutes remaining!`}
          </div>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Question Navigation Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 start-0 z-40 w-64 bg-white dark:bg-navy-800 border-e border-sand-200 dark:border-navy-700 transform transition-transform lg:transform-none ${
            sidebarOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'
          } lg:translate-x-0 pt-[60px] lg:pt-0`}
        >
          {/* Mobile close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-2 end-2 p-1 text-sand-400 hover:text-sand-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4">
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">
              {isRtl ? 'الأسئلة' : 'Questions'}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.question.id] !== undefined;
                const isFlagged = flagged.has(q.question.id);
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.question.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSidebarOpen(false);
                    }}
                    className={`relative w-full aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'bg-primary-700 text-white ring-2 ring-primary-400'
                        : isAnswered
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-sand-100 text-sand-600 dark:bg-navy-700 dark:text-sand-400'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <Flag className="absolute -top-1 -end-1 w-3 h-3 text-orange-500 fill-orange-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-1.5 text-xs text-sand-500 dark:text-sand-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30" />
                {isRtl ? 'تمت الإجابة' : 'Answered'} ({answeredCount})
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-sand-100 dark:bg-navy-700" />
                {isRtl ? 'لم تتم الإجابة' : 'Unanswered'} ({unansweredCount})
              </div>
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-orange-500 fill-orange-500" />
                {isRtl ? 'مُعلَّم' : 'Flagged'} ({flagged.size})
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Question Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentQ ? (
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ.question.id}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-sand-500 dark:text-sand-400">
                        {isRtl ? 'السؤال' : 'Question'} {currentIndex + 1}{' '}
                        {isRtl ? 'من' : 'of'} {questions.length}
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sand-100 dark:bg-navy-700 text-sand-600 dark:text-sand-400 capitalize">
                          {currentQ.question.question_type.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-sand-400">
                          {currentQ.question.points} {isRtl ? 'درجة' : 'pts'}
                        </span>
                        {currentQ.question.difficulty && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              currentQ.question.difficulty === 'easy'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : currentQ.question.difficulty === 'hard'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {currentQ.question.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFlag(currentQ.question.id)}
                      className={`p-2 rounded-lg transition-all ${
                        flagged.has(currentQ.question.id)
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-sand-100 text-sand-400 dark:bg-navy-700 hover:text-orange-500'
                      }`}
                    >
                      <Flag
                        className={`w-5 h-5 ${flagged.has(currentQ.question.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6 mb-6">
                    <div
                      className="prose dark:prose-invert max-w-none text-navy-900 dark:text-white"
                      dangerouslySetInnerHTML={{ __html: currentQ.question.content }}
                    />
                  </div>

                  {/* Answer Area */}
                  <div className="bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 p-6">
                    <AnswerInput
                      question={currentQ.question}
                      examQuestionId={currentQ.exam_question_id}
                      value={answers[currentQ.question.id]}
                      onChange={(val) =>
                        handleAnswerChange(
                          currentQ.question.id,
                          currentQ.exam_question_id,
                          val
                        )
                      }
                      isRtl={isRtl}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-sand-600 dark:text-sand-400 hover:border-primary-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      {isRtl ? 'السابق' : 'Previous'}
                    </button>

                    <span className="text-sm text-sand-500 dark:text-sand-400">
                      {currentIndex + 1} / {questions.length}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
                      }
                      disabled={currentIndex === questions.length - 1}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 text-sand-600 dark:text-sand-400 hover:border-primary-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isRtl ? 'التالي' : 'Next'}
                      <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sand-500">{isRtl ? 'لا توجد أسئلة' : 'No questions'}</p>
            </div>
          )}
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                  {isRtl ? 'تأكيد التسليم' : 'Confirm Submission'}
                </h3>
                <p className="text-sm text-sand-600 dark:text-sand-400">
                  {isRtl
                    ? 'هل أنت متأكد من تسليم الامتحان؟ لن تتمكن من تعديل إجاباتك بعد التسليم.'
                    : 'Are you sure you want to submit? You cannot change your answers after submission.'}
                </p>
              </div>

              {unansweredCount > 0 && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4 inline-block me-1" />
                  {isRtl
                    ? `لديك ${unansweredCount} سؤال بدون إجابة`
                    : `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? 's' : ''}`}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-sand-100 dark:bg-navy-700 text-sand-600 dark:text-sand-400 hover:bg-sand-200 transition-all"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-primary-700 text-white hover:bg-primary-800 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {isRtl ? 'تسليم' : 'Submit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Answer Input Component =====

interface AnswerInputProps {
  question: Question;
  examQuestionId: number;
  value: any;
  onChange: (value: any) => void;
  isRtl: boolean;
}

function AnswerInput({ question, examQuestionId, value, onChange, isRtl }: AnswerInputProps) {
  const type = question.question_type;

  // MCQ - Radio buttons
  if (type === 'mcq' || type === 'multiple_choice') {
    const options = question.options || [];
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
          {isRtl ? 'اختر إجابة واحدة:' : 'Select one answer:'}
        </p>
        {options.map((opt: any, idx: number) => {
          const optValue = typeof opt === 'string' ? opt : opt.value || opt.text || opt;
          const optLabel = typeof opt === 'string' ? opt : opt.label || opt.text || opt.value || String(opt);
          const isSelected = value === optValue;
          return (
            <label
              key={idx}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600'
                  : 'border-sand-200 dark:border-navy-700 hover:border-sand-300 dark:hover:border-navy-600'
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={optValue}
                checked={isSelected}
                onChange={() => onChange(optValue)}
                className="w-4 h-4 text-primary-700 focus:ring-primary-500"
              />
              <span className="text-sm text-navy-900 dark:text-white">{optLabel}</span>
            </label>
          );
        })}
      </div>
    );
  }

  // True/False
  if (type === 'true_false') {
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
          {isRtl ? 'اختر:' : 'Select:'}
        </p>
        {[
          { val: 'true', label: isRtl ? 'صح' : 'True' },
          { val: 'false', label: isRtl ? 'خطأ' : 'False' },
        ].map((opt) => (
          <label
            key={opt.val}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value === opt.val
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600'
                : 'border-sand-200 dark:border-navy-700 hover:border-sand-300 dark:hover:border-navy-600'
            }`}
          >
            <input
              type="radio"
              name={`q-${question.id}`}
              value={opt.val}
              checked={value === opt.val}
              onChange={() => onChange(opt.val)}
              className="w-4 h-4 text-primary-700 focus:ring-primary-500"
            />
            <span className="text-sm text-navy-900 dark:text-white font-medium">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    );
  }

  // Essay
  if (type === 'essay') {
    return (
      <div>
        <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
          {isRtl ? 'اكتب إجابتك:' : 'Write your answer:'}
        </p>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder={isRtl ? 'اكتب إجابتك هنا...' : 'Type your answer here...'}
          className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-y text-sm"
          dir={isRtl ? 'rtl' : 'ltr'}
        />
        <p className="text-xs text-sand-400 mt-1">
          {(value || '').length} {isRtl ? 'حرف' : 'characters'}
        </p>
      </div>
    );
  }

  // Short answer
  if (type === 'short_answer') {
    return (
      <div>
        <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
          {isRtl ? 'اكتب إجابتك:' : 'Type your answer:'}
        </p>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isRtl ? 'إجابتك...' : 'Your answer...'}
          className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
          dir={isRtl ? 'rtl' : 'ltr'}
        />
      </div>
    );
  }

  // Fill in the blank
  if (type === 'fill_in_blank' || type === 'fill_blank') {
    const blanks = (question.content.match(/_+/g) || ['___']).length;
    const vals: string[] = Array.isArray(value) ? value : Array(blanks).fill('');
    return (
      <div>
        <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-3">
          {isRtl ? 'أكمل الفراغات:' : 'Fill in the blanks:'}
        </p>
        <div className="space-y-3">
          {Array.from({ length: blanks }, (_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm text-sand-500 dark:text-sand-400 font-medium w-6">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={vals[idx] || ''}
                onChange={(e) => {
                  const next = [...vals];
                  next[idx] = e.target.value;
                  onChange(next);
                }}
                placeholder={isRtl ? `الفراغ ${idx + 1}` : `Blank ${idx + 1}`}
                className="flex-1 rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                dir={isRtl ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default fallback - text
  return (
    <div>
      <p className="text-sm font-medium text-sand-500 dark:text-sand-400 mb-2">
        {isRtl ? 'إجابتك:' : 'Your answer:'}
      </p>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-sand-200 dark:border-navy-700 bg-sand-50 dark:bg-navy-900 text-navy-900 dark:text-white p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-y text-sm"
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </div>
  );
}
