'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, BookOpen } from 'lucide-react';
import type { AcademicProgram } from '@/lib/types';

const degreeBadgeConfig: Record<string, { color: string; bg: string }> = {
  bachelor: { color: 'text-primary-700 dark:text-primary-300', bg: 'bg-primary-100 dark:bg-primary-900/40' },
  master: { color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-100 dark:bg-accent-900/40' },
  doctorate: { color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  diploma: { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/40' },
};

export function ProgramCard({ program }: { program: AcademicProgram }) {
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
    <Link
      href={`/programs/${program.slug}` as any}
      className="group block bg-white dark:bg-navy-800 rounded-2xl p-6 border border-sand-100 dark:border-navy-700 hover:shadow-lg dark:hover:shadow-navy-900/50 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="space-y-3">
        {/* Degree badge */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
            {degreeLabelMap[program.degree_level] || program.degree_level}
          </span>
        </div>

        {/* Program name */}
        <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
          {program.name}
        </h3>

        {/* Faculty name */}
        {program.faculty && (
          <p className="text-xs text-sand-500 dark:text-sand-400">
            {program.faculty.name}
          </p>
        )}

        {/* Description */}
        {program.description && (
          <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-2">
            {program.description}
          </p>
        )}

        {/* Duration & Credit Hours */}
        <div className="flex items-center gap-4 pt-2 text-xs text-sand-500 dark:text-sand-400">
          {program.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {program.duration}
            </span>
          )}
          {program.credit_hours && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {program.credit_hours} {t('creditHours')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
