'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BookOpen, FileText, GraduationCap, Newspaper, Quote } from 'lucide-react';
import type { ResearchPublication } from '@/lib/types';

const areaColors: Record<string, string> = {
  'Islamic Studies': '#c9a84c',
  Science: '#0d4f4f',
  Medicine: '#c44569',
  Engineering: '#155a5a',
  Humanities: '#8b6914',
  Law: '#6c3483',
  Education: '#1a6b6b',
  Agriculture: '#2e7d32',
};

const typeIcons: Record<string, typeof BookOpen> = {
  journal_article: Newspaper,
  conference_paper: FileText,
  book: BookOpen,
  thesis: GraduationCap,
  report: FileText,
};

export function ResearchCard({ publication }: { publication: ResearchPublication }) {
  const t = useTranslations('research');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const areaColor = areaColors[publication.research_area ?? ''] ?? '#1a6b6b';
  const TypeIcon = typeIcons[publication.publication_type ?? ''] ?? FileText;

  const authorsDisplay = publication.authors
    ? publication.authors.length > 3
      ? `${publication.authors.slice(0, 3).join(', ')} +${publication.authors.length - 3}`
      : publication.authors.join(', ')
    : '';

  const formattedDate = publication.publication_date
    ? new Date(publication.publication_date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/research/${publication.slug}` as any}
        className="group block bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-navy-900/50 hover:shadow-lg dark:hover:shadow-navy-900/50 transition-all duration-300 border border-sand-100 dark:border-navy-700 h-full"
      >
        {/* Header area */}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: areaColor }}
        />

        <div className="p-5">
          {/* Type & Area badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-sand-100 dark:bg-navy-700 text-sand-700 dark:text-sand-300">
              <TypeIcon className="w-3 h-3" />
              {publication.publication_type
                ? t(publication.publication_type === 'journal_article' ? 'journalArticle'
                    : publication.publication_type === 'conference_paper' ? 'conferencePaper'
                    : publication.publication_type === 'book' ? 'book'
                    : publication.publication_type === 'thesis' ? 'thesis'
                    : 'report')
                : ''}
            </span>
            {publication.research_area && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: areaColor }}
              >
                {publication.research_area}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-primary-900 dark:text-primary-200 line-clamp-2 mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors leading-snug">
            {publication.title}
          </h3>

          {/* Authors */}
          {authorsDisplay && (
            <p className="text-xs text-sand-500 dark:text-sand-400 mb-2 line-clamp-1">
              {authorsDisplay}
            </p>
          )}

          {/* Journal & Date */}
          <div className="flex items-center gap-2 text-xs text-sand-400 dark:text-sand-500 mb-3">
            {publication.journal_name && (
              <span className="truncate max-w-[60%]">{publication.journal_name}</span>
            )}
            {publication.journal_name && formattedDate && (
              <span className="text-sand-300 dark:text-navy-600">|</span>
            )}
            {formattedDate && <span>{formattedDate}</span>}
          </div>

          {/* Footer: Citations & DOI */}
          <div className="flex items-center justify-between pt-3 border-t border-sand-100 dark:border-navy-700">
            <span className="flex items-center gap-1 text-xs text-sand-500 dark:text-sand-400">
              <Quote className="w-3 h-3" />
              {publication.citation_count.toLocaleString()} {t('citations')}
            </span>
            {publication.doi && (
              <span className="text-xs text-primary-600 dark:text-primary-400 truncate max-w-[120px]">
                DOI
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
