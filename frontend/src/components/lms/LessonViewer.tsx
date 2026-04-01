'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { fetchLmsLesson, markLessonComplete } from '@/lib/api-fetchers';
import type { LmsLesson } from '@/lib/types';
import {
  Video,
  FileText,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export function LessonViewer({ lessonId }: { lessonId: number }) {
  const t = useTranslations('lessonViewer');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';
  const { token } = useAuth();

  const [lesson, setLesson] = useState<LmsLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchLmsLesson(locale, lessonId)
      .then((data) => {
        if (!cancelled) {
          setLesson(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [locale, lessonId]);

  const handleMarkComplete = useCallback(async () => {
    if (!token || completing || completed) return;
    setCompleting(true);
    try {
      await markLessonComplete(token, lessonId);
      setCompleted(true);
    } catch {
      // silently fail
    } finally {
      setCompleting(false);
    }
  }, [token, lessonId, completing, completed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-sand-200 dark:bg-navy-700 rounded" />
            <div className="h-96 bg-sand-200 dark:bg-navy-700 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <p className="text-sand-500 text-lg">
          {locale === 'ar' ? 'الدرس غير موجود' : 'Lesson not found'}
        </p>
      </div>
    );
  }

  const contentTypeIcon = () => {
    switch (lesson.content_type) {
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'document': return <FileText className="w-5 h-5 text-amber-500" />;
      case 'external': return <ExternalLink className="w-5 h-5 text-purple-500" />;
      default: return <BookOpen className="w-5 h-5 text-teal-500" />;
    }
  };

  const contentTypeLabel = () => {
    switch (lesson.content_type) {
      case 'video': return t('video');
      case 'document': return t('document');
      case 'external': return t('external');
      default: return t('text');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Nav */}
      <div className="bg-white dark:bg-navy-800 border-b border-sand-200 dark:border-navy-700 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href={`/${locale}/lms`}
            className="text-sm text-sand-600 dark:text-sand-400 hover:text-primary-700 dark:hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            {t('backToCourse')}
          </Link>

          <div className="flex items-center gap-3">
            {/* Prev / Next navigation */}
            <button
              disabled
              className="p-2 rounded-lg text-sand-400 dark:text-sand-500 bg-sand-100 dark:bg-navy-700 disabled:opacity-40"
              title={t('previousLesson')}
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              disabled
              className="p-2 rounded-lg text-sand-400 dark:text-sand-500 bg-sand-100 dark:bg-navy-700 disabled:opacity-40"
              title={t('nextLesson')}
            >
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Lesson Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-sand-500 dark:text-sand-400 mb-2">
            {contentTypeIcon()}
            <span>{contentTypeLabel()}</span>
            {lesson.duration_minutes && (
              <>
                <span className="text-sand-300 dark:text-sand-600">|</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{lesson.duration_minutes} {t('minutes')}</span>
              </>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-sand-100">
            {lesson.title}
          </h1>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 overflow-hidden mb-6"
        >
          {/* Video Content */}
          {lesson.content_type === 'video' && lesson.video_url && (
            <div className="aspect-video bg-black">
              <iframe
                src={lesson.video_url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          )}

          {/* Text / HTML Content */}
          {(lesson.content_type === 'text' || lesson.content_type === 'html') && lesson.content && (
            <div
              className="p-6 sm:p-8 prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-primary-700 dark:prose-a:text-primary-400"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          )}

          {/* Document */}
          {lesson.content_type === 'document' && lesson.file_path && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center py-12 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto text-sand-400 dark:text-sand-500 mb-4" />
                  <a
                    href={lesson.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-2.5 rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {locale === 'ar' ? 'فتح المستند' : 'Open Document'}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* External Link */}
          {lesson.content_type === 'external' && lesson.external_url && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center py-12 bg-sand-50 dark:bg-navy-900 rounded-lg">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                  <a
                    href={lesson.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-2.5 rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('openExternal')}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Fallback: plain content */}
          {!['video', 'text', 'html', 'document', 'external'].includes(lesson.content_type) && lesson.content && (
            <div className="p-6 sm:p-8">
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {lesson.content}
              </div>
            </div>
          )}
        </motion.div>

        {/* Mark Complete Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={handleMarkComplete}
            disabled={completed || completing}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
              completed
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
                : 'bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                {t('completed')}
              </>
            ) : completing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('markComplete')}
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                {t('markComplete')}
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
