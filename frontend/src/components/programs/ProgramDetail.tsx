'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Clock, BookOpen, GraduationCap, Building, ClipboardList, Briefcase } from 'lucide-react';
import type { AcademicProgram } from '@/lib/types';

const degreeBadgeConfig: Record<string, { color: string; bg: string }> = {
  bachelor: { color: 'text-primary-700 dark:text-primary-300', bg: 'bg-primary-100 dark:bg-primary-900/40' },
  master: { color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-100 dark:bg-accent-900/40' },
  doctorate: { color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  diploma: { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/40' },
};

export function ProgramDetail({ program }: { program: AcademicProgram }) {
  const locale = useLocale();
  const t = useTranslations('programs');
  const isAr = locale === 'ar';
  const config = degreeBadgeConfig[program.degree_level] || degreeBadgeConfig.bachelor;

  const degreeLabelMap: Record<string, string> = {
    bachelor: t('filterBachelor'),
    master: t('filterMaster'),
    doctorate: t('filterDoctorate'),
    diploma: t('filterDiploma'),
  };

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t('backToPrograms')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
              {degreeLabelMap[program.degree_level] || program.degree_level}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {program.name}
          </motion.h1>

          {program.faculty && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <Building className="w-4 h-4" />
              <span>{program.faculty.name}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {program.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200 mb-4">
                  {t('aboutProgram')}
                </h2>
                <p className="text-sand-700 dark:text-sand-400 leading-relaxed whitespace-pre-line">
                  {program.description}
                </p>
              </motion.div>
            )}

            {/* Requirements */}
            {program.requirements && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ClipboardList className="w-6 h-6 text-accent-600" />
                  <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200">
                    {t('requirements')}
                  </h2>
                </div>
                <p className="text-sand-700 dark:text-sand-400 leading-relaxed whitespace-pre-line">
                  {program.requirements}
                </p>
              </motion.div>
            )}

            {/* Career Prospects */}
            {program.career_prospects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-sm dark:shadow-navy-900/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-accent-600" />
                  <h2 className="font-serif text-2xl font-bold text-primary-900 dark:text-primary-200">
                    {t('careerProspects')}
                  </h2>
                </div>
                <p className="text-sand-700 dark:text-sand-400 leading-relaxed whitespace-pre-line">
                  {program.career_prospects}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50"
            >
              <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-4">
                {isAr ? 'معلومات البرنامج' : 'Program Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                  <GraduationCap className="w-5 h-5 text-accent-600 flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-sand-400 dark:text-sand-500">{t('degreeLevel')}</span>
                    <span className="font-medium text-sand-700 dark:text-sand-300">
                      {degreeLabelMap[program.degree_level] || program.degree_level}
                    </span>
                  </div>
                </div>
                {program.duration && (
                  <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                    <Clock className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <div>
                      <span className="block text-xs text-sand-400 dark:text-sand-500">{t('duration')}</span>
                      <span className="font-medium text-sand-700 dark:text-sand-300">{program.duration}</span>
                    </div>
                  </div>
                )}
                {program.credit_hours && (
                  <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                    <BookOpen className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <div>
                      <span className="block text-xs text-sand-400 dark:text-sand-500">{t('creditHours')}</span>
                      <span className="font-medium text-sand-700 dark:text-sand-300">{program.credit_hours}</span>
                    </div>
                  </div>
                )}
                {program.faculty && (
                  <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
                    <Building className="w-5 h-5 text-accent-600 flex-shrink-0" />
                    <div>
                      <span className="block text-xs text-sand-400 dark:text-sand-500">{t('faculty')}</span>
                      <Link
                        href={`/faculties/${program.faculty.slug}` as any}
                        className="font-medium text-primary-700 dark:text-primary-300 hover:underline"
                      >
                        {program.faculty.name}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Apply CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary-700 text-white rounded-2xl p-6"
            >
              <h3 className="font-serif text-lg font-bold mb-2">
                {t('admissions')}
              </h3>
              <p className="text-primary-100 text-sm mb-4">
                {t('admissionsSubtitle')}
              </p>
              <Link
                href="/admissions"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors"
              >
                {t('applyNow')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
