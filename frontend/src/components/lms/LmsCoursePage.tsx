'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchLmsCourse, fetchLmsModules, fetchLmsAssignments } from '@/lib/api-fetchers';
import type { LmsCourse, LmsModule, LmsAssignment } from '@/lib/types';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  Bell,
  Play,
  FileText,
  ExternalLink,
  Video,
  Calendar,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

type TabKey = 'modules' | 'assignments' | 'discussions' | 'announcements';

export function LmsCoursePage({ slug }: { slug: string }) {
  const t = useTranslations('lmsCourse');
  const tl = useTranslations('lms');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'ur';

  const [course, setCourse] = useState<LmsCourse | null>(null);
  const [modules, setModules] = useState<LmsModule[]>([]);
  const [assignments, setAssignments] = useState<LmsAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('modules');
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchLmsCourse(locale, slug)
      .then(async (courseData) => {
        if (cancelled) return;
        setCourse(courseData);

        const [modulesRes, assignmentsRes] = await Promise.allSettled([
          fetchLmsModules(locale, courseData.id),
          fetchLmsAssignments(locale, courseData.id),
        ]);

        if (!cancelled) {
          if (modulesRes.status === 'fulfilled') setModules(modulesRes.value);
          if (assignmentsRes.status === 'fulfilled') setAssignments(assignmentsRes.value);
          // Auto-expand first module
          if (modulesRes.status === 'fulfilled' && modulesRes.value.length > 0) {
            setExpandedModules(new Set([modulesRes.value[0].id]));
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [locale, slug]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const expandAll = () => setExpandedModules(new Set(modules.map((m) => m.id)));
  const collapseAll = () => setExpandedModules(new Set());

  const getLessonIcon = (contentType: string) => {
    switch (contentType) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'document': return <FileText className="w-4 h-4 text-amber-500" />;
      case 'external': return <ExternalLink className="w-4 h-4 text-purple-500" />;
      default: return <BookOpen className="w-4 h-4 text-teal-500" />;
    }
  };

  const tabs: { key: TabKey; icon: typeof BookOpen; label: string }[] = [
    { key: 'modules', icon: BookOpen, label: tl('modules') },
    { key: 'assignments', icon: ClipboardList, label: tl('assignments') },
    { key: 'discussions', icon: MessageSquare, label: tl('discussions') },
    { key: 'announcements', icon: Bell, label: tl('announcements') },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
        <div className="bg-navy-900 h-48 animate-pulse" />
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white dark:bg-navy-800 rounded-xl animate-pulse border border-sand-200 dark:border-navy-700" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-navy-900 flex items-center justify-center">
        <p className="text-sand-500 text-lg">
          {locale === 'ar' ? 'المقرر غير موجود' : 'Course not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Course Header */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        {course.cover_image && (
          <div className="absolute inset-0">
            <img src={course.cover_image} alt="" className="w-full h-full object-cover opacity-20" />
          </div>
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link
            href={`/${locale}/lms`}
            className="text-sand-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
            {locale === 'ar' ? 'العودة للمقررات' : 'Back to Courses'}
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3"
          >
            {course.title}
          </motion.h1>
          {course.description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sand-400 max-w-3xl"
            >
              {course.description}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mt-4 text-sm text-sand-500"
          >
            <span>{modules.length} {tl('modules')}</span>
            <span>{modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} {locale === 'ar' ? 'دروس' : 'lessons'}</span>
            <span>{assignments.length} {tl('assignments')}</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-primary-700 text-white'
                  : 'text-sand-600 dark:text-sand-400 hover:bg-sand-50 dark:hover:bg-navy-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100">{t('modulesList')}</h2>
              <div className="flex gap-2">
                <button onClick={expandAll} className="text-xs text-primary-700 dark:text-primary-400 hover:underline">
                  {t('expandAll')}
                </button>
                <span className="text-sand-300 dark:text-sand-600">|</span>
                <button onClick={collapseAll} className="text-xs text-primary-700 dark:text-primary-400 hover:underline">
                  {t('collapseAll')}
                </button>
              </div>
            </div>

            {modules.length > 0 ? (
              <div className="space-y-3">
                {modules.map((mod, idx) => (
                  <div
                    key={mod.id}
                    className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between p-4 text-start hover:bg-sand-50 dark:hover:bg-navy-750 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-sand-100 text-sm">{mod.title}</h3>
                          {mod.description && (
                            <p className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">{mod.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-sand-400">{mod.lessons?.length || 0} {t('lessons')}</span>
                        <ChevronDown className={`w-4 h-4 text-sand-400 transition-transform ${expandedModules.has(mod.id) ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedModules.has(mod.id) && mod.lessons && mod.lessons.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-sand-100 dark:border-navy-700">
                            {mod.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={`/${locale}/lms/lessons/${lesson.id}`}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-sand-50 dark:hover:bg-navy-750 transition-colors border-b border-sand-50 dark:border-navy-700 last:border-b-0"
                              >
                                {getLessonIcon(lesson.content_type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800 dark:text-sand-200 truncate">{lesson.title}</p>
                                  {lesson.duration_minutes && (
                                    <p className="text-xs text-sand-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.duration_minutes} {locale === 'ar' ? 'دقائق' : 'min'}
                                    </p>
                                  )}
                                </div>
                                <ChevronRight className={`w-4 h-4 text-sand-300 dark:text-sand-600 ${isRtl ? 'rotate-180' : ''}`} />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto text-sand-300 dark:text-sand-600 mb-3" />
                <p className="text-sand-500 dark:text-sand-400">{t('noModules')}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4">{t('assignmentsList')}</h2>
            {assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-700 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-sand-100 text-sm">{assignment.title}</h3>
                        {assignment.description && (
                          <p className="text-xs text-sand-500 dark:text-sand-400 mt-1 line-clamp-2">{assignment.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-sand-400">
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {t('maxScore')}: {assignment.max_score}
                          </span>
                          <span>{t('type')}: {assignment.assignment_type}</span>
                          {assignment.allow_late && (
                            <span className="text-amber-500">{t('allowLate')}</span>
                          )}
                        </div>
                      </div>
                      {assignment.due_date && (
                        <div className="flex-shrink-0 text-end">
                          <p className="text-xs text-sand-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tl('dueDate')}
                          </p>
                          <p className="text-xs font-medium text-gray-700 dark:text-sand-300">
                            {new Date(assignment.due_date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 mx-auto text-sand-300 dark:text-sand-600 mb-3" />
                <p className="text-sand-500 dark:text-sand-400">{t('noAssignments')}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4">{t('discussionsList')}</h2>
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-sand-300 dark:text-sand-600 mb-3" />
              <p className="text-sand-500 dark:text-sand-400">{t('noDiscussions')}</p>
            </div>
          </motion.div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-sand-100 mb-4">{tl('announcements')}</h2>
            <div className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto text-sand-300 dark:text-sand-600 mb-3" />
              <p className="text-sand-500 dark:text-sand-400">{tl('noAnnouncements')}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
